'use client';

import React, { Component, ReactNode, useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ChevronUp, ChevronDown, Cpu, Activity, Zap, Radio, Gauge } from 'lucide-react';

function isWebGLAvailable() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class NeuralErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("WebGL Neural Background fallback active:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <StaticGradientFallback />;
    }
    return this.props.children;
  }
}

function StaticGradientFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#060810] via-[#0C1018] to-[#141B26] opacity-90 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#67E8F9]/15 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
    </div>
  );
}

interface NodeData {
  baseX: number;
  baseY: number;
  baseZ: number;
  x: number;
  y: number;
  z: number;
  repelX: number;
  repelY: number;
  layer: number; // 0: Input, 1: Hidden 1, 2: Hidden 2, 3: Output, 4: Context
  activation: number; // 0.0 - 1.0 glow intensity
  phase: number;
  color: THREE.Color;
}

interface PulseData {
  startNode: number;
  endNode: number;
  progress: number;
  speed: number;
  active: boolean;
  color: THREE.Color;
  size: number;
}

class NeuralArchitectureSystem {
  nodes: NodeData[];
  synapses: [number, number][]; // pairs of connected node indices
  linePositions: Float32Array;
  lineColors: Float32Array;
  lineGeometry: THREE.BufferGeometry;

  maxPulses: number;
  pulses: PulseData[];

  nodeDummy: THREE.Object3D;
  pulseDummy: THREE.Object3D;

  iceBaseColor: THREE.Color;
  iceMidColor: THREE.Color;
  iceBrightColor: THREE.Color;
  icePulseColor: THREE.Color;

  time: number;

  constructor() {
    this.time = 0;
    this.iceBaseColor = new THREE.Color('#38BDF8');      // Cold Ice Dim (#38BDF8)
    this.iceMidColor = new THREE.Color('#67E8F9');       // Signal Ice (#67E8F9)
    this.iceBrightColor = new THREE.Color('#A5F3FC');    // Signal Ice Bright (#A5F3FC)
    this.icePulseColor = new THREE.Color('#A5F3FC');     // Bright Synapse Peak (#A5F3FC)

    this.nodes = [];
    this.synapses = [];

    // Define Layer Architecture X Coordinates with Glacial Core Cyan-to-Ice Gradient
    const layerConfigs = [
      { layer: 0, count: 6, x: -6.5, color: this.iceBaseColor, spreadY: 4.5 },
      { layer: 1, count: 10, x: -2.2, color: this.iceMidColor, spreadY: 5.5 },
      { layer: 2, count: 10, x: 2.2, color: this.iceMidColor, spreadY: 5.5 },
      { layer: 3, count: 5, x: 6.5, color: this.iceBrightColor, spreadY: 4.0 },
    ];

    layerConfigs.forEach((cfg) => {
      for (let i = 0; i < cfg.count; i++) {
        const stepY = cfg.spreadY / (cfg.count - 1 || 1);
        const y = -cfg.spreadY / 2 + i * stepY;
        const z = (Math.random() - 0.5) * 2.5;

        this.nodes.push({
          baseX: cfg.x,
          baseY: y,
          baseZ: z,
          x: cfg.x,
          y: y,
          z: z,
          repelX: 0,
          repelY: 0,
          layer: cfg.layer,
          activation: 0,
          phase: Math.random() * Math.PI * 2,
          color: cfg.color,
        });
      }
    });

    // Add extra ambient deep background nodes for neural context depth
    for (let b = 0; b < 15; b++) {
      const bx = (Math.random() - 0.5) * 16;
      const by = (Math.random() - 0.5) * 10;
      const bz = -2 - Math.random() * 4;
      this.nodes.push({
        baseX: bx,
        baseY: by,
        baseZ: bz,
        x: bx,
        y: by,
        z: bz,
        repelX: 0,
        repelY: 0,
        layer: 4,
        activation: 0,
        phase: Math.random() * Math.PI * 2,
        color: this.iceBaseColor,
      });
    }

    // Build Forward & Inter-Layer Synapses
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n1 = this.nodes[i];
        const n2 = this.nodes[j];

        // Connect adjacent layer neurons
        if (Math.abs(n1.layer - n2.layer) === 1 && n1.layer < 4 && n2.layer < 4) {
          const dist = Math.hypot(n1.baseX - n2.baseX, n1.baseY - n2.baseY, n1.baseZ - n2.baseZ);
          if (dist < 6.5) {
            this.synapses.push([i, j]);
          }
        }
        // Connect background context nodes if close
        else if ((n1.layer === 4 || n2.layer === 4) && Math.abs(n1.layer - n2.layer) <= 2) {
          const dist = Math.hypot(n1.baseX - n2.baseX, n1.baseY - n2.baseY, n1.baseZ - n2.baseZ);
          if (dist < 4.0 && Math.random() > 0.4) {
            this.synapses.push([i, j]);
          }
        }
      }
    }

    // Setup Line Geometry
    const maxLines = this.synapses.length;
    this.linePositions = new Float32Array(maxLines * 6);
    this.lineColors = new Float32Array(maxLines * 6);

    this.lineGeometry = new THREE.BufferGeometry();
    this.lineGeometry.setAttribute('position', new THREE.BufferAttribute(this.linePositions, 3));
    this.lineGeometry.setAttribute('color', new THREE.BufferAttribute(this.lineColors, 3));

    // Initialize Pulse System for Neural Data Stream
    this.maxPulses = 40;
    this.pulses = [];
    this.nodeDummy = new THREE.Object3D();
    this.pulseDummy = new THREE.Object3D();

    for (let p = 0; p < this.maxPulses; p++) {
      this.pulses.push({
        startNode: 0,
        endNode: 0,
        progress: 0,
        speed: 0.02,
        active: false,
        color: this.iceBrightColor,
        size: 0.1,
      });
    }
  }

  triggerPulseFromNode(startIdx: number) {
    const startNode = this.nodes[startIdx];
    // Find outbound synapses
    const outbound = this.synapses.filter(([i, j]) => {
      const targetIdx = i === startIdx ? j : i;
      return this.nodes[targetIdx].layer > startNode.layer;
    });

    if (outbound.length === 0) return;

    const chosenSynapse = outbound[Math.floor(Math.random() * outbound.length)];
    const endIdx = chosenSynapse[0] === startIdx ? chosenSynapse[1] : chosenSynapse[0];

    const inactivePulse = this.pulses.find((p) => !p.active);
    if (inactivePulse) {
      inactivePulse.startNode = startIdx;
      inactivePulse.endNode = endIdx;
      inactivePulse.progress = 0;
      inactivePulse.speed = 0.025 + Math.random() * 0.02;
      inactivePulse.active = true;
      inactivePulse.color = this.iceBrightColor; // Bright signal ice firing pulse
      inactivePulse.size = 0.12;

      startNode.activation = 1.0;
    }
  }

  update(
    nodeMesh: THREE.InstancedMesh,
    pulseMesh: THREE.InstancedMesh,
    mouseX: number,
    mouseY: number
  ) {
    this.time += 0.016;

    const repelRadius = 3.2; // Distance radius for particle repulsion
    const maxRepelDist = 0.95; // Maximum repulsion displacement

    // 1. Update Node Floating positions, Mouse Repulsion & Activations
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];

      // Calculate mouse displacement relative to node base position
      const dx = node.baseX - mouseX;
      const dy = node.baseY - mouseY;
      const distToMouse = Math.sqrt(dx * dx + dy * dy);

      let targetRepelX = 0;
      let targetRepelY = 0;

      if (distToMouse < repelRadius && distToMouse > 0.001) {
        const force = Math.pow(1 - distToMouse / repelRadius, 1.4);
        targetRepelX = (dx / distToMouse) * force * maxRepelDist;
        targetRepelY = (dy / distToMouse) * force * maxRepelDist;

        // Mouse proximity activates neural firing
        if (distToMouse < 2.2 && node.layer === 0 && Math.random() < 0.12) {
          this.triggerPulseFromNode(i);
        }
      }

      // Smooth fluid spring lerp to repulsion target
      node.repelX += (targetRepelX - node.repelX) * 0.1;
      node.repelY += (targetRepelY - node.repelY) * 0.1;

      // Subtle float wave motion combined with mouse repulsion
      node.x = node.baseX + Math.sin(this.time * 1.5 + node.phase) * 0.12 + node.repelX;
      node.y = node.baseY + Math.cos(this.time * 1.2 + node.phase) * 0.15 + node.repelY;
      node.z = node.baseZ + Math.sin(this.time * 0.8 + node.phase) * 0.1;

      // Decay activation glow
      if (node.activation > 0) {
        node.activation = Math.max(0, node.activation - 0.03);
      }

      // Proximity glow intensity
      const mouseProximityGlow = distToMouse < repelRadius ? Math.pow(1 - distToMouse / repelRadius, 2) : 0;

      // Update Node Instanced Mesh Transform & Color Intensity
      const baseScale = node.layer === 4 ? 0.05 : 0.09;
      const scale = baseScale + node.activation * 0.08 + mouseProximityGlow * 0.04;

      this.nodeDummy.position.set(node.x, node.y, node.z);
      this.nodeDummy.scale.setScalar(scale);
      this.nodeDummy.updateMatrix();

      nodeMesh.setMatrixAt(i, this.nodeDummy.matrix);

      // Interpolate color towards ice bright highlight when active or near mouse
      const activeIntensity = Math.max(node.activation * 0.9, mouseProximityGlow * 0.85);
      const activeColor = node.color.clone().lerp(this.iceBrightColor, activeIntensity);
      nodeMesh.setColorAt(i, activeColor);
    }

    nodeMesh.instanceMatrix.needsUpdate = true;
    if (nodeMesh.instanceColor) nodeMesh.instanceColor.needsUpdate = true;

    // 2. Periodic Random Forward Feed Trigger
    if (Math.random() < 0.15) {
      const inputLayerIndices = this.nodes
        .map((n, idx) => (n.layer === 0 ? idx : -1))
        .filter((idx) => idx !== -1);

      if (inputLayerIndices.length > 0) {
        const randomInput = inputLayerIndices[Math.floor(Math.random() * inputLayerIndices.length)];
        this.triggerPulseFromNode(randomInput);
      }
    }

    // 3. Update Line Synapse Geometry & Mouse Proximity Glow
    const lineGlowRadius = 3.5;

    for (let s = 0; s < this.synapses.length; s++) {
      const [i, j] = this.synapses[s];
      const n1 = this.nodes[i];
      const n2 = this.nodes[j];

      this.linePositions[s * 6] = n1.x;
      this.linePositions[s * 6 + 1] = n1.y;
      this.linePositions[s * 6 + 2] = n1.z;

      this.linePositions[s * 6 + 3] = n2.x;
      this.linePositions[s * 6 + 4] = n2.y;
      this.linePositions[s * 6 + 5] = n2.z;

      // Calculate distance from mouse to the line segment projection
      const lineDx = n2.x - n1.x;
      const lineDy = n2.y - n1.y;
      const lenSq = lineDx * lineDx + lineDy * lineDy;
      let t = lenSq > 0 ? ((mouseX - n1.x) * lineDx + (mouseY - n1.y) * lineDy) / lenSq : 0;
      t = Math.max(0, Math.min(1, t));

      const projX = n1.x + t * lineDx;
      const projY = n1.y + t * lineDy;
      const distToLine = Math.sqrt((mouseX - projX) * (mouseX - projX) + (mouseY - projY) * (mouseY - projY));

      let lineMouseGlow = 0;
      if (distToLine < lineGlowRadius) {
        lineMouseGlow = Math.pow(1 - distToLine / lineGlowRadius, 1.8);
      }

      const avgActivation = (n1.activation + n2.activation) / 2;
      const alpha = Math.min(0.85, 0.08 + avgActivation * 0.35 + lineMouseGlow * 0.6);

      // Lerp connection line colors towards bright ice cyan when near cursor
      const color1 = n1.color.clone().lerp(this.iceBrightColor, lineMouseGlow * 0.85);
      const color2 = n2.color.clone().lerp(this.iceBrightColor, lineMouseGlow * 0.85);

      this.lineColors[s * 6] = color1.r * alpha;
      this.lineColors[s * 6 + 1] = color1.g * alpha;
      this.lineColors[s * 6 + 2] = color1.b * alpha;

      this.lineColors[s * 6 + 3] = color2.r * alpha;
      this.lineColors[s * 6 + 4] = color2.g * alpha;
      this.lineColors[s * 6 + 5] = color2.b * alpha;
    }

    const posAttr = this.lineGeometry.attributes.position;
    const colAttr = this.lineGeometry.attributes.color;
    if (posAttr && colAttr) {
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
    }

    // 4. Update Neural Data Pulses (Flashes briefly to signal-ice-bright at peak)
    for (let p = 0; p < this.maxPulses; p++) {
      const pulse = this.pulses[p];

      if (!pulse.active) {
        this.pulseDummy.position.set(0, -999, 0);
        this.pulseDummy.scale.setScalar(0);
        this.pulseDummy.updateMatrix();
        pulseMesh.setMatrixAt(p, this.pulseDummy.matrix);
        continue;
      }

      pulse.progress += pulse.speed;

      const nStart = this.nodes[pulse.startNode];
      const nEnd = this.nodes[pulse.endNode];

      if (pulse.progress >= 1.0) {
        pulse.active = false;
        nEnd.activation = 1.0; // Trigger target neuron activation glow

        // Propagate forward pulse to next layer
        if (nEnd.layer < 3 && Math.random() < 0.8) {
          this.triggerPulseFromNode(pulse.endNode);
        }

        this.pulseDummy.position.set(0, -999, 0);
        this.pulseDummy.scale.setScalar(0);
        this.pulseDummy.updateMatrix();
        pulseMesh.setMatrixAt(p, this.pulseDummy.matrix);
        continue;
      }

      // Interpolate pulse location along synapse
      const px = nStart.x + (nEnd.x - nStart.x) * pulse.progress;
      const py = nStart.y + (nEnd.y - nStart.y) * pulse.progress;
      const pz = nStart.z + (nEnd.z - nStart.z) * pulse.progress;

      const pulseScale = Math.sin(pulse.progress * Math.PI) * pulse.size;

      // Color flashes to signal-ice-bright at peak (progress=0.5), then fades back to signal-ice
      const peakIntensity = Math.sin(pulse.progress * Math.PI);
      const currentColor = this.iceMidColor.clone().lerp(this.iceBrightColor, peakIntensity);

      this.pulseDummy.position.set(px, py, pz);
      this.pulseDummy.scale.setScalar(pulseScale);
      this.pulseDummy.updateMatrix();

      pulseMesh.setMatrixAt(p, this.pulseDummy.matrix);
      pulseMesh.setColorAt(p, currentColor);
    }

    pulseMesh.instanceMatrix.needsUpdate = true;
    if (pulseMesh.instanceColor) pulseMesh.instanceColor.needsUpdate = true;
  }
}

interface TrailParticleData {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  size: number;
}

class CursorTrailSystem {
  maxParticles: number;
  particles: TrailParticleData[];
  dummy: THREE.Object3D;
  lastMouseX: number;
  lastMouseY: number;
  nextSpawnIndex: number;

  constructor(count = 45) {
    this.maxParticles = count;
    this.particles = [];
    this.dummy = new THREE.Object3D();
    this.lastMouseX = -999;
    this.lastMouseY = -999;
    this.nextSpawnIndex = 0;

    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: 0,
        y: -999,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        life: 0,
        maxLife: 1,
        size: 0.08,
      });
    }
  }

  update(trailMesh: THREE.InstancedMesh, mouseX: number, mouseY: number) {
    const mouseMoved =
      Math.abs(mouseX - this.lastMouseX) > 0.01 || Math.abs(mouseY - this.lastMouseY) > 0.01;

    if (mouseMoved && this.lastMouseX !== -999) {
      const dist = Math.hypot(mouseX - this.lastMouseX, mouseY - this.lastMouseY);
      const spawnCount = Math.min(3, Math.max(1, Math.ceil(dist * 2.5)));

      for (let s = 0; s < spawnCount; s++) {
        const p = this.particles[this.nextSpawnIndex];
        this.nextSpawnIndex = (this.nextSpawnIndex + 1) % this.maxParticles;

        p.x = mouseX + (Math.random() - 0.5) * 0.18;
        p.y = mouseY + (Math.random() - 0.5) * 0.18;
        p.z = (Math.random() - 0.5) * 0.4;
        p.vx = (Math.random() - 0.5) * 0.025;
        p.vy = (Math.random() - 0.5) * 0.025;
        p.vz = (Math.random() - 0.5) * 0.02;
        p.life = 1.0;
        p.maxLife = 0.5 + Math.random() * 0.4;
        p.size = 0.08 + Math.random() * 0.06;
      }
    }

    this.lastMouseX = mouseX;
    this.lastMouseY = mouseY;

    for (let i = 0; i < this.maxParticles; i++) {
      const p = this.particles[i];

      if (p.life <= 0) {
        this.dummy.position.set(0, -999, 0);
        this.dummy.scale.setScalar(0);
        this.dummy.updateMatrix();
        trailMesh.setMatrixAt(i, this.dummy.matrix);
        continue;
      }

      p.life -= 0.028 / p.maxLife;
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      const currentScale = Math.max(0, p.life * p.size);

      this.dummy.position.set(p.x, p.y, p.z);
      this.dummy.scale.setScalar(currentScale);
      this.dummy.updateMatrix();

      trailMesh.setMatrixAt(i, this.dummy.matrix);
    }

    trailMesh.instanceMatrix.needsUpdate = true;
  }
}

function FpsTracker({ onUpdate }: { onUpdate: (fps: number, frameTime: number) => void }) {
  const frameCount = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    lastTime.current = typeof performance !== 'undefined' ? performance.now() : Date.now();
  }, []);

  useFrame(() => {
    if (lastTime.current === 0) {
      lastTime.current = typeof performance !== 'undefined' ? performance.now() : Date.now();
      return;
    }

    frameCount.current += 1;
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const delta = now - lastTime.current;

    if (delta >= 400) {
      const fps = Math.min(60, Math.round((frameCount.current * 1000) / delta));
      const frameTime = +(delta / frameCount.current).toFixed(1);
      onUpdate(fps, frameTime);
      frameCount.current = 0;
      lastTime.current = now;
    }
  });

  return null;
}

function NeuralMesh({ onFpsUpdate }: { onFpsUpdate?: (fps: number, frameTime: number) => void }) {
  const nodeMeshRef = useRef<THREE.InstancedMesh>(null);
  const pulseMeshRef = useRef<THREE.InstancedMesh>(null);
  const trailMeshRef = useRef<THREE.InstancedMesh>(null);
  const linesMeshRef = useRef<THREE.LineSegments>(null);
  const { mouse, viewport } = useThree();

  const system = useMemo(() => new NeuralArchitectureSystem(), []);
  const cursorTrail = useMemo(() => new CursorTrailSystem(), []);
  const mouseNormRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseNormRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNormRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame(() => {
    if (!nodeMeshRef.current || !linesMeshRef.current || !pulseMeshRef.current) return;

    // Combine R3F pointer and window pointer for reliable coordinates
    const normX = mouse.x !== 0 ? mouse.x : mouseNormRef.current.x;
    const normY = mouse.y !== 0 ? mouse.y : mouseNormRef.current.y;

    const mouseX = (normX * viewport.width) / 2;
    const mouseY = (normY * viewport.height) / 2;

    system.update(nodeMeshRef.current, pulseMeshRef.current, mouseX, mouseY);

    if (trailMeshRef.current) {
      cursorTrail.update(trailMeshRef.current, mouseX, mouseY);
    }
  });

  return (
    <group>
      {onFpsUpdate && <FpsTracker onUpdate={onFpsUpdate} />}
      {/* Neural Architecture Neurons (signal-ice low opacity 0.2) */}
      <instancedMesh ref={nodeMeshRef} args={[undefined, undefined, system.nodes.length]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial transparent opacity={0.22} />
      </instancedMesh>

      {/* Signal Data Pulses */}
      <instancedMesh ref={pulseMeshRef} args={[undefined, undefined, system.maxPulses]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial transparent opacity={0.85} />
      </instancedMesh>

      {/* Cursor Particle Trail Effect (signal-ice color #67E8F9 at 0.4 opacity) */}
      <instancedMesh ref={trailMeshRef} args={[undefined, undefined, cursorTrail.maxParticles]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#67E8F9" transparent opacity={0.4} depthWrite={false} />
      </instancedMesh>

      {/* Synaptic Wireframe Links (Slightly dimmer than nodes) */}
      <lineSegments ref={linesMeshRef} geometry={system.lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.12} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function NeuralBackground() {
  const [canRenderWebGL, setCanRenderWebGL] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(60);
  const [frameTime, setFrameTime] = useState<number>(16.6);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handle = requestAnimationFrame(() => {
        const available = isWebGLAvailable();
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setCanRenderWebGL(available && !reducedMotion);
      });
      return () => cancelAnimationFrame(handle);
    }
  }, []);

  if (!canRenderWebGL) {
    return <StaticGradientFallback />;
  }

  return (
    <NeuralErrorBoundary>
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 8.5], fov: 55 }}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <NeuralMesh onFpsUpdate={(f, t) => { setFps(f); setFrameTime(t); }} />
        </Canvas>

        {/* Ambient Void Background Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-transparent to-[#060810]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#060810_85%)] pointer-events-none" />

        {/* Lightweight WebGL Performance Monitor Overlay */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 pointer-events-auto">
          <div className="rounded-xl bg-[#0C1018]/90 border border-[#67E8F9]/40 backdrop-blur-md shadow-[0_0_20px_rgba(103,232,249,0.2)] p-2.5 sm:p-3 font-mono text-xs text-[#EEF2F7] transition-all">
            {/* Compact Bar / Header */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]" />
                </span>
                <span className="font-bold text-[#A5F3FC]">WebGL GPU</span>
              </div>

              <div className="h-3 w-px bg-white/20" />

              <div className="flex items-center gap-1.5">
                <span className={`font-bold ${fps >= 50 ? 'text-[#4ADE80]' : fps >= 30 ? 'text-[#67E8F9]' : 'text-[#EAB308]'}`}>
                  {fps} FPS
                </span>
                <span className="text-[10px] text-[#8B96A8]">({frameTime}ms)</span>
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded bg-[#141B26] hover:bg-[#67E8F9]/20 text-[#67E8F9] border border-[#67E8F9]/30 transition-colors focus:outline-none cursor-pointer ml-1"
                aria-label="Toggle WebGL Performance Diagnostics"
                title={isExpanded ? 'Collapse Diagnostics' : 'Expand Diagnostics'}
              >
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Expanded Detailed Diagnostics */}
            {isExpanded && (
              <div className="mt-3 pt-3 border-t border-white/10 space-y-2 text-[11px] min-w-[210px]">
                <div className="text-[10px] uppercase font-bold text-[#67E8F9] tracking-wider mb-1 flex items-center justify-between">
                  <span>Engine Telemetry</span>
                  <span className="text-[#4ADE80]">Active</span>
                </div>

                <div className="flex justify-between items-center text-[#8B96A8]">
                  <span>Frame Target:</span>
                  <span className="text-[#EEF2F7] font-semibold">60 FPS (16.6ms)</span>
                </div>

                <div className="flex justify-between items-center text-[#8B96A8]">
                  <span>Instanced Neurons:</span>
                  <span className="text-[#A5F3FC]">64 Nodes</span>
                </div>

                <div className="flex justify-between items-center text-[#8B96A8]">
                  <span>Synaptic Links:</span>
                  <span className="text-[#A5F3FC]">~180 Lines</span>
                </div>

                <div className="flex justify-between items-center text-[#8B96A8]">
                  <span>Signal Packets:</span>
                  <span className="text-[#A5F3FC]">12 Live Pulses</span>
                </div>

                <div className="flex justify-between items-center text-[#8B96A8]">
                  <span>Renderer API:</span>
                  <span className="text-[#67E8F9]">R3F / WebGL 2.0</span>
                </div>

                <div className="w-full bg-[#141B26] h-1 rounded-full overflow-hidden mt-1.5">
                  <div
                    className="bg-[#67E8F9] h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (fps / 60) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </NeuralErrorBoundary>
  );
}
