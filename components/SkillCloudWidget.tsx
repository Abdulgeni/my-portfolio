'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TECH_DESCRIPTIONS, PROJECTS } from '@/lib/data';
import { Cpu, Sparkles, Filter, X, RotateCcw, Info, Layers, Check } from 'lucide-react';

interface SkillCloudWidgetProps {
  selectedTech: string | null;
  onSelectTech: (tech: string | null) => void;
}

interface Tag3D {
  name: string;
  count: number;
  x: number;
  y: number;
  z: number;
  screenX: number;
  screenY: number;
  scale: number;
  opacity: number;
}

export default function SkillCloudWidget({ selectedTech, onSelectTech }: SkillCloudWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0.003, y: 0.004 });

  // Gather unique skill technologies and their occurrence count across all projects
  const skillList = useMemo(() => {
    const counts: Record<string, number> = {};
    PROJECTS.forEach((p) => {
      p.stack.forEach((tech) => {
        counts[tech] = (counts[tech] || 0) + 1;
      });
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, []);

  // Compute initial 3D positions on Fibonacci sphere
  const tagsRef = useRef<Tag3D[]>([]);

  useEffect(() => {
    const numTags = skillList.length;
    const radius = 170; // Sphere radius in px
    const samples = numTags;
    const phiAngle = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    tagsRef.current = skillList.map((skill, i) => {
      const y = 1 - (i / (samples - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phiAngle * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      return {
        name: skill.name,
        count: skill.count,
        x: x * radius,
        y: y * radius,
        z: z * radius,
        screenX: 0,
        screenY: 0,
        scale: 1,
        opacity: 1,
      };
    });
  }, [skillList]);

  // Animation frame loop for 3D sphere rotation
  const [tagTransforms, setTagTransforms] = useState<
    { name: string; count: number; screenX: number; screenY: number; scale: number; opacity: number; zIndex: number }[]
  >([]);

  const updatePositions = useCallback(() => {
    const rx = rotationVelocity.current.x;
    const ry = rotationVelocity.current.y;

    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);

    const perspective = 400;

    const updated = tagsRef.current.map((tag) => {
      // Rotate around Y axis
      const x1 = tag.x * cosY - tag.z * sinY;
      const z1 = tag.x * sinY + tag.z * cosY;

      // Rotate around X axis
      const y2 = tag.y * cosX - z1 * sinX;
      const z2 = tag.y * sinX + z1 * cosX;

      tag.x = x1;
      tag.y = y2;
      tag.z = z2;

      // Perspective scale calculation
      const scale = perspective / (perspective - z2);
      const opacity = Math.min(1, Math.max(0.18, (z2 + 180) / 360));
      const zIndex = Math.round((z2 + 200) * 10);

      return {
        name: tag.name,
        count: tag.count,
        screenX: x1 * (scale * 0.85),
        screenY: y2 * (scale * 0.85),
        scale: Math.max(0.65, Math.min(1.35, scale * 0.9)),
        opacity: opacity,
        zIndex: zIndex,
      };
    });

    setTagTransforms(updated);
  }, []);

  useEffect(() => {
    let animId: number;

    const render = () => {
      if (isRotating && !isDragging) {
        // Slow natural rotation drift
        rotationVelocity.current.x *= 0.98;
        rotationVelocity.current.y *= 0.98;
        if (Math.abs(rotationVelocity.current.x) < 0.002) rotationVelocity.current.x = 0.002;
        if (Math.abs(rotationVelocity.current.y) < 0.003) rotationVelocity.current.y = 0.003;
      } else if (!isDragging) {
        rotationVelocity.current.x *= 0.92;
        rotationVelocity.current.y *= 0.92;
      }

      updatePositions();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRotating, isDragging, updatePositions]);

  // Handle pointer drag rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) {
      // Gentle mouse tilt when hovering
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mousePos.current = {
          x: (e.clientX - centerX) / rect.width,
          y: (e.clientY - centerY) / rect.height,
        };
        rotationVelocity.current = {
          x: mousePos.current.y * 0.008,
          y: mousePos.current.x * 0.008,
        };
      }
      return;
    }

    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;

    rotationVelocity.current = {
      x: -deltaY * 0.004,
      y: deltaX * 0.004,
    };

    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Find info for hovered skill tag
  const hoveredInfo = useMemo(() => {
    if (!hoveredTech) return null;
    const desc = TECH_DESCRIPTIONS[hoveredTech] || 'Core technology component integrated across systems.';
    const matchingProjects = PROJECTS.filter((p) => p.stack.includes(hoveredTech));
    return {
      tech: hoveredTech,
      description: desc,
      projectCount: matchingProjects.length,
      projects: matchingProjects,
    };
  }, [hoveredTech]);

  return (
    <div className="w-full bg-[#0C1018]/90 border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      {/* Background ambient glow effect */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#67E8F9]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#A5F3FC]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar with widget controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#67E8F9] font-bold tracking-wider uppercase mb-1 glow-text-ice">
            <Sparkles className="w-4 h-4 text-[#67E8F9]" />
            <span>INTERACTIVE STACK VISUALIZER</span>
          </div>
          <h3 className="text-xl font-space font-bold text-[#EEF2F7] flex items-center gap-2">
            3D Skill Matrix
            <span className="text-xs font-mono font-normal text-[#8B96A8] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
              {skillList.length} Technologies
            </span>
          </h3>
        </div>

        {/* Controls & Active Filter Status */}
        <div className="flex items-center gap-2 flex-wrap">
          {selectedTech ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#67E8F9]/15 border border-[#67E8F9]/60 text-xs font-mono text-[#67E8F9] shadow-[0_0_15px_rgba(103,232,249,0.3)]"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filter: <strong className="text-[#EEF2F7]">{selectedTech}</strong></span>
              <button
                type="button"
                onClick={() => onSelectTech(null)}
                className="ml-1 p-0.5 rounded hover:bg-[#67E8F9]/30 text-[#67E8F9] hover:text-white transition-colors"
                title="Clear tech filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ) : (
            <span className="text-xs font-mono text-[#8B96A8] hidden sm:inline-block">
              Click any node to filter projects
            </span>
          )}

          <button
            type="button"
            onClick={() => setIsRotating((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 border transition-all ${
              isRotating
                ? 'bg-[#141B26] text-[#EEF2F7] border-white/20 hover:border-[#67E8F9]/50'
                : 'bg-[#67E8F9]/10 text-[#67E8F9] border-[#67E8F9]/40'
            }`}
            title={isRotating ? 'Pause Orbit' : 'Resume Orbit'}
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin-slow' : ''}`} />
            <span>{isRotating ? 'Auto Orbit' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Skill Cloud Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* 3D Interactive Tag Sphere Container */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="lg:col-span-8 h-[320px] sm:h-[380px] w-full relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none rounded-xl bg-[#060810]/60 border border-white/5 overflow-hidden"
        >
          {/* Subtle central radial compass design element */}
          <div className="absolute w-48 h-48 rounded-full border border-dashed border-[#67E8F9]/15 animate-spin-slow pointer-events-none" />
          <div className="absolute w-72 h-72 rounded-full border border-white/5 pointer-events-none" />

          {/* 3D Tag Sphere Nodes */}
          <div className="relative w-full h-full flex items-center justify-center">
            {tagTransforms.map((tag) => {
              const isSelected = selectedTech === tag.name;
              const isHovered = hoveredTech === tag.name;

              return (
                <button
                  key={tag.name}
                  type="button"
                  onMouseEnter={() => setHoveredTech(tag.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedTech === tag.name) {
                      onSelectTech(null);
                    } else {
                      onSelectTech(tag.name);
                    }
                  }}
                  style={{
                    transform: `translate3d(${tag.screenX}px, ${tag.screenY}px, 0px) scale(${tag.scale})`,
                    opacity: tag.opacity,
                    zIndex: tag.zIndex,
                  }}
                  className={`absolute px-3 py-1.5 rounded-xl font-mono text-xs transition-colors duration-150 flex items-center gap-1.5 border whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#67E8F9] text-[#060810] font-bold border-[#67E8F9] shadow-[0_0_20px_rgba(103,232,249,0.8)] scale-110'
                      : isHovered
                      ? 'bg-[#141B26] text-[#67E8F9] border-[#67E8F9] shadow-[0_0_14px_rgba(103,232,249,0.4)]'
                      : 'bg-[#141B26]/90 text-[#EEF2F7] border-white/10 hover:border-[#67E8F9]/60 hover:text-[#67E8F9]'
                  }`}
                >
                  <span>{tag.name}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                      isSelected
                        ? 'bg-[#060810]/30 text-[#060810]'
                        : 'bg-white/10 text-[#8B96A8]'
                    }`}
                  >
                    {tag.count}
                  </span>
                  {isSelected && <Check className="w-3 h-3 text-[#060810]" />}
                </button>
              );
            })}
          </div>

          {/* Instruction overlay note */}
          <div className="absolute bottom-3 left-4 text-[11px] font-mono text-[#8B96A8]/70 flex items-center gap-1.5 pointer-events-none">
            <Layers className="w-3.5 h-3.5 text-[#67E8F9]/60" />
            <span>Drag to rotate sphere • Click node to filter projects</span>
          </div>
        </div>

        {/* Technology Insight & Project Match Panel */}
        <div className="lg:col-span-4 h-full flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {hoveredInfo ? (
              <motion.div
                key={hoveredInfo.tech}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl bg-[#141B26] border border-[#67E8F9]/40 shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex flex-col gap-3 h-full"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-[#67E8F9]/10 text-[#67E8F9] border border-[#67E8F9]/30">
                      <Cpu className="w-4 h-4" />
                    </span>
                    <span className="font-space font-bold text-base text-[#EEF2F7]">
                      {hoveredInfo.tech}
                    </span>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#67E8F9]/15 text-[#67E8F9] border border-[#67E8F9]/30 font-semibold">
                    {hoveredInfo.projectCount} {hoveredInfo.projectCount === 1 ? 'Project' : 'Projects'}
                  </span>
                </div>

                <p className="text-xs font-mono text-[#8B96A8] leading-relaxed">
                  {hoveredInfo.description}
                </p>

                <div className="mt-auto pt-3 border-t border-white/5">
                  <div className="text-[11px] font-mono text-[#8B96A8] uppercase tracking-wider mb-2">
                    Matching Architectures:
                  </div>
                  <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto pr-1">
                    {hoveredInfo.projects.map((p) => (
                      <div
                        key={p.id}
                        className="text-xs font-mono text-[#EEF2F7] flex items-center justify-between p-2 rounded-lg bg-[#060810]/70 border border-white/5"
                      >
                        <span className="truncate pr-2 font-medium">{p.title}</span>
                        <span className="text-[10px] text-[#67E8F9] shrink-0">{p.category}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectTech(hoveredInfo.tech)}
                  className={`mt-2 w-full py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    selectedTech === hoveredInfo.tech
                      ? 'bg-[#67E8F9] text-[#060810] shadow-[0_0_15px_rgba(103,232,249,0.5)]'
                      : 'bg-[#67E8F9]/10 text-[#67E8F9] border border-[#67E8F9]/40 hover:bg-[#67E8F9]/20'
                  }`}
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>
                    {selectedTech === hoveredInfo.tech ? 'Currently Filtering' : `Filter Projects by ${hoveredInfo.tech}`}
                  </span>
                </button>
              </motion.div>
            ) : selectedTech ? (
              <motion.div
                key="active-selection"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl bg-[#141B26] border border-[#67E8F9]/40 shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#67E8F9] font-bold uppercase tracking-wider mb-2">
                    <Filter className="w-4 h-4" />
                    <span>Active Technology Filter</span>
                  </div>
                  <h4 className="text-xl font-space font-bold text-[#EEF2F7] mb-2">
                    {selectedTech}
                  </h4>
                  <p className="text-xs font-mono text-[#8B96A8] leading-relaxed mb-4">
                    {TECH_DESCRIPTIONS[selectedTech] || 'Core technology powering deployed commercial systems.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectTech(null)}
                  className="w-full py-2 px-3 rounded-xl font-mono text-xs font-bold bg-white/5 border border-white/10 text-[#EEF2F7] hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-3.5 h-3.5 text-[#67E8F9]" />
                  <span>Reset Technology Filter</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="empty-hover"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl bg-[#141B26]/60 border border-white/5 flex flex-col items-center justify-center text-center h-full gap-3 min-h-[220px]"
              >
                <div className="p-3 rounded-2xl bg-[#67E8F9]/10 text-[#67E8F9] border border-[#67E8F9]/20">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-space font-bold text-[#EEF2F7] mb-1">
                    Explore Technology Nodes
                  </h4>
                  <p className="text-xs font-mono text-[#8B96A8] leading-relaxed max-w-xs">
                    Hover over any 3D node to view technology specs and matching system architectures, or click to isolate projects.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
