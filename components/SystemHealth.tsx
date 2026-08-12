'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Server,
  Zap,
  ShieldCheck,
  RefreshCw,
  Cpu,
  HardDrive,
  Globe,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  BarChart2,
  Terminal,
  Database,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { staggerContainer, revealScale, revealItem } from '@/lib/animations';

interface SystemNode {
  id: string;
  name: string;
  category: string;
  status: 'operational' | 'degraded' | 'maintenance';
  latency: number; // in ms
  uptime: string;
  load: number; // percentage
  throughput: string;
  region: string;
  description: string;
}

const INITIAL_NODES: SystemNode[] = [
  {
    id: 'node-rag',
    name: 'RAG Vector Search Cluster',
    category: 'Embedding & ChromaDB',
    status: 'operational',
    latency: 12,
    uptime: '99.99%',
    load: 28,
    throughput: '24.2k vec/min',
    region: 'us-east-1',
    description: 'High-dimensional embedding retrieval & similarity matching engine.'
  },
  {
    id: 'node-gemini',
    name: 'Gemini 2.5 LLM Gateway',
    category: 'AI Inference Proxy',
    status: 'operational',
    latency: 22,
    uptime: '99.95%',
    load: 42,
    throughput: '1,420 RPS',
    region: 'global-edge',
    description: 'Streaming token proxy with OWASP prompt-injection guardrails.'
  },
  {
    id: 'node-n8n',
    name: 'n8n Workflow Engine',
    category: 'Automation Pipelines',
    status: 'operational',
    latency: 8,
    uptime: '100.0%',
    load: 18,
    throughput: '58 Active Workflows',
    region: 'eu-west-1',
    description: 'Event-driven webhooks, GitHub Actions, and asynchronous execution queues.'
  },
  {
    id: 'node-edge',
    name: 'Cloudflare Edge CDN',
    category: 'App Router & Cache',
    status: 'operational',
    latency: 5,
    uptime: '99.99%',
    load: 15,
    throughput: '12.8 MB/s',
    region: 'edge-anycast',
    description: 'Low-latency static asset distribution and Edge API route handler.'
  }
];

interface RegionalPing {
  region: string;
  location: string;
  latency: number;
  status: 'optimal' | 'good' | 'fair';
}

const INITIAL_REGIONS: RegionalPing[] = [
  { region: 'us-east-1', location: 'N. Virginia, USA', latency: 11, status: 'optimal' },
  { region: 'eu-west-1', location: 'London, UK', latency: 17, status: 'optimal' },
  { region: 'ap-northeast-1', location: 'Tokyo, Japan', latency: 42, status: 'good' },
  { region: 'sa-east-1', location: 'São Paulo, Brazil', latency: 54, status: 'good' },
];

export default function SystemHealth() {
  const [nodes, setNodes] = useState<SystemNode[]>(INITIAL_NODES);
  const [regions, setRegions] = useState<RegionalPing[]>(INITIAL_REGIONS);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('all');
  const [isLivePolling, setIsLivePolling] = useState<boolean>(true);
  const [isStressTesting, setIsStressTesting] = useState<boolean>(false);
  const [isPingingRegions, setIsPingingRegions] = useState<boolean>(false);
  const [latencyHistory, setLatencyHistory] = useState<number[]>([
    16, 18, 15, 14, 19, 21, 16, 15, 17, 14, 18, 16, 15, 19, 17, 16, 18, 15, 16, 17
  ]);
  const [uptimeSeconds, setUptimeSeconds] = useState<number>(12345678);

  // Live polling effect for simulated real-time telemetry
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isLivePolling) {
      interval = setInterval(() => {
        // Increment uptime counter
        setUptimeSeconds((prev) => prev + 1);

        // Generate next ping latency value
        const baseLatency = isStressTesting ? 45 : 16;
        const jitter = (Math.random() - 0.5) * (isStressTesting ? 25 : 6);
        const nextPing = Math.max(4, Math.round(baseLatency + jitter));

        // Update latency sparkline history
        setLatencyHistory((prev) => [...prev.slice(1), nextPing]);

        // Slightly fluctuate node latencies
        setNodes((prevNodes) =>
          prevNodes.map((node) => {
            const nodeJitter = Math.floor((Math.random() - 0.5) * (isStressTesting ? 14 : 4));
            const newLatency = Math.max(3, node.latency + nodeJitter);
            const newLoad = Math.min(98, Math.max(10, node.load + Math.floor((Math.random() - 0.5) * 6)));
            return { ...node, latency: newLatency, load: newLoad };
          })
        );
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLivePolling, isStressTesting]);

  // Handle stress test trigger
  const triggerStressTest = () => {
    setIsStressTesting(true);
    setTimeout(() => {
      setIsStressTesting(false);
    }, 8000);
  };

  // Handle manual regional re-ping
  const rePingRegions = () => {
    setIsPingingRegions(true);
    setTimeout(() => {
      setRegions((prev) =>
        prev.map((r) => ({
          ...r,
          latency: Math.max(8, r.latency + Math.floor((Math.random() - 0.5) * 8))
        }))
      );
      setIsPingingRegions(false);
    }, 800);
  };

  // Format uptime into days, hours, minutes, seconds
  const formatUptime = (totalSeconds: number) => {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds.toString().padStart(2, '0')}s`;
  };

  // Calculate current average latency
  const currentAvgLatency = Math.round(
    latencyHistory.reduce((acc, curr) => acc + curr, 0) / latencyHistory.length
  );

  // SVG Chart Dimensions
  const chartHeight = 80;
  const chartWidth = 300;
  const maxLatency = Math.max(...latencyHistory, 50);
  const minLatency = Math.min(...latencyHistory, 2);

  // Compute SVG Path points for latency history line
  const points = latencyHistory
    .map((val, index) => {
      const x = (index / (latencyHistory.length - 1)) * chartWidth;
      const normalizedY = (val - minLatency) / (maxLatency - minLatency || 1);
      const y = chartHeight - normalizedY * (chartHeight - 16) - 8;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const areaPoints = `0,${chartHeight} ${points} ${chartWidth},${chartHeight}`;

  return (
    <motion.section
      id="system-health"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#67E8F9]/15"
    >
      {/* Section Eyebrow Header */}
      <motion.div variants={revealItem} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C1018] border border-[#67E8F9]/40 shadow-[0_0_15px_rgba(103,232,249,0.25)] mb-4">
          <Activity className="w-4 h-4 text-[#67E8F9] animate-pulse" />
          <span className="font-mono text-xs font-semibold text-[#A5F3FC] tracking-wider uppercase">
            Live Telemetry &amp; System Health
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-space font-bold text-[#EEF2F7] tracking-tight">
          Kernel Infrastructure Monitor
        </h2>
        <p className="mt-4 text-[#8B96A8] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Real-time node status, latency benchmarks, and operational metrics powering my full-stack &amp; AI architectures.
        </p>
      </motion.div>

      {/* Main Health Card Dashboard */}
      <motion.div
        variants={revealScale}
        className="rounded-2xl bg-[#0C1018] border border-[#67E8F9]/30 shadow-[0_0_35px_rgba(103,232,249,0.12)] p-6 lg:p-8 space-y-8"
      >
        {/* Top Control Bar & Global Status */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-white/10">
          {/* Status Indicator */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className={`w-4 h-4 rounded-full ${
                  isStressTesting ? 'bg-[#EAB308]' : 'bg-[#4ADE80]'
                } shadow-[0_0_12px_rgba(74,222,128,0.8)]`}
              />
              <div
                className={`absolute -inset-1 rounded-full ${
                  isStressTesting ? 'bg-[#EAB308]' : 'bg-[#4ADE80]'
                } opacity-40 animate-ping`}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-space font-bold text-lg text-[#EEF2F7]">
                  {isStressTesting ? 'SIMULATED TRAFFIC STRESS TEST' : 'ALL SYSTEMS OPERATIONAL'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/30 font-semibold">
                  99.98% UPTIME
                </span>
              </div>
              <p className="text-xs font-mono text-[#8B96A8] mt-0.5">
                Cluster ID: <span className="text-[#A5F3FC]">kernel-prod-eu-01</span> • Continuous Ping Active
              </p>
            </div>
          </div>

          {/* Action Buttons & Polling Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsLivePolling(!isLivePolling)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                isLivePolling
                  ? 'bg-[#141B26] border-[#67E8F9]/40 text-[#67E8F9] hover:bg-[#67E8F9]/10'
                  : 'bg-[#060810] border-white/10 text-[#8B96A8] hover:text-[#EEF2F7]'
              }`}
            >
              {isLivePolling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isLivePolling ? 'Live Sync Active' : 'Sync Paused'}</span>
            </button>

            <button
              onClick={triggerStressTest}
              disabled={isStressTesting}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                isStressTesting
                  ? 'bg-[#EAB308]/20 border-[#EAB308] text-[#EAB308] cursor-not-allowed'
                  : 'bg-[#141B26] border-[#67E8F9]/30 text-[#A5F3FC] hover:border-[#67E8F9] hover:text-[#EEF2F7]'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${isStressTesting ? 'animate-bounce text-[#EAB308]' : 'text-[#67E8F9]'}`} />
              <span>{isStressTesting ? 'Testing Load...' : 'Simulate Load Test'}</span>
            </button>
          </div>
        </div>

        {/* Core Telemetry Key Metrics (4-Card Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1: Avg Latency */}
          <div className="p-4 rounded-xl bg-[#060810] border border-[#67E8F9]/20 flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-[#67E8F9]/50 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-[#8B96A8]">
              <span className="flex items-center gap-1.5 text-[#A5F3FC]">
                <Radio className="w-3.5 h-3.5 text-[#67E8F9] animate-pulse" />
                API Latency
              </span>
              <span className="text-[#4ADE80] font-semibold">Live</span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-space font-bold text-[#EEF2F7]">{currentAvgLatency}</span>
                <span className="text-xs font-mono text-[#67E8F9]">ms avg</span>
              </div>
              <p className="text-[11px] text-[#8B96A8] mt-1">95th Percentile: 24ms</p>
            </div>
            <div className="w-full bg-[#141B26] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#67E8F9] h-full transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, (currentAvgLatency / 50) * 100)}%` }}
              />
            </div>
          </div>

          {/* Metric 2: Uptime Counter */}
          <div className="p-4 rounded-xl bg-[#060810] border border-[#67E8F9]/20 flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-[#67E8F9]/50 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-[#8B96A8]">
              <span className="flex items-center gap-1.5 text-[#A5F3FC]">
                <Server className="w-3.5 h-3.5 text-[#67E8F9]" />
                Cluster Uptime
              </span>
              <span className="text-[#4ADE80] font-semibold">100%</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-mono font-bold text-[#EEF2F7] tracking-tight">
                {formatUptime(uptimeSeconds)}
              </span>
              <p className="text-[11px] text-[#8B96A8] mt-1">Zero Unplanned Downtime</p>
            </div>
            <div className="w-full bg-[#141B26] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#4ADE80] h-full w-full rounded-full" />
            </div>
          </div>

          {/* Metric 3: Active Throughput */}
          <div className="p-4 rounded-xl bg-[#060810] border border-[#67E8F9]/20 flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-[#67E8F9]/50 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-[#8B96A8]">
              <span className="flex items-center gap-1.5 text-[#A5F3FC]">
                <Activity className="w-3.5 h-3.5 text-[#67E8F9]" />
                Global Throughput
              </span>
              <span className="text-[#67E8F9]">Edge Proxy</span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-space font-bold text-[#EEF2F7]">
                  {isStressTesting ? '4,850' : '1,840'}
                </span>
                <span className="text-xs font-mono text-[#67E8F9]">req/s</span>
              </div>
              <p className="text-[11px] text-[#8B96A8] mt-1">Peak: 5,200 RPS</p>
            </div>
            <div className="w-full bg-[#141B26] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#67E8F9] h-full transition-all duration-500 rounded-full"
                style={{ width: isStressTesting ? '90%' : '38%' }}
              />
            </div>
          </div>

          {/* Metric 4: Security Shield Status */}
          <div className="p-4 rounded-xl bg-[#060810] border border-[#67E8F9]/20 flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-[#67E8F9]/50 transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-[#8B96A8]">
              <span className="flex items-center gap-1.5 text-[#A5F3FC]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#67E8F9]" />
                OWASP Guardrails
              </span>
              <span className="text-[#4ADE80]">Protected</span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-space font-bold text-[#EEF2F7]">0</span>
                <span className="text-xs font-mono text-[#4ADE80]">Threats Active</span>
              </div>
              <p className="text-[11px] text-[#8B96A8] mt-1">1,490 Attacks Blocked</p>
            </div>
            <div className="w-full bg-[#141B26] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#4ADE80] h-full w-full rounded-full" />
            </div>
          </div>
        </div>

        {/* Real-time Latency Sparkline Chart + Regional Latency Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          {/* Live Latency Telemetry Chart (2 Cols) */}
          <div className="lg:col-span-2 rounded-xl bg-[#060810] border border-white/10 p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-base font-space font-bold text-[#EEF2F7] flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-[#67E8F9]" />
                  Real-time Ping Telemetry (ms)
                </h3>
                <p className="text-xs text-[#8B96A8] font-mono">Live 20-tick sliding window response time</p>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="flex items-center gap-1 text-[#67E8F9]">
                  <span className="w-2 h-2 rounded-full bg-[#67E8F9]" />
                  Ping
                </span>
                <span className="text-[#8B96A8]">Min: {minLatency}ms</span>
                <span className="text-[#8B96A8]">Max: {maxLatency}ms</span>
              </div>
            </div>

            {/* SVG Sparkline Canvas */}
            <div className="relative w-full h-36 pt-2">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Background Grid Lines */}
                <line x1="0" y1="0" x2={chartWidth} y2="0" stroke="rgba(255,255,255,0.06)" strokeDasharray="2,2" />
                <line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="rgba(255,255,255,0.06)" strokeDasharray="2,2" />
                <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="rgba(255,255,255,0.06)" />

                {/* Filled Area */}
                <polygon points={areaPoints} fill="url(#latencyGradient)" />

                {/* Sparkline Path */}
                <polyline
                  fill="none"
                  stroke="#67E8F9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                />

                {/* Pulse dot on latest ping point */}
                {latencyHistory.length > 0 && (() => {
                  const lastIndex = latencyHistory.length - 1;
                  const lastVal = latencyHistory[lastIndex];
                  const cx = (lastIndex / (latencyHistory.length - 1)) * chartWidth;
                  const normalizedY = (lastVal - minLatency) / (maxLatency - minLatency || 1);
                  const cy = chartHeight - normalizedY * (chartHeight - 16) - 8;
                  return (
                    <g key="last-point">
                      <circle cx={cx} cy={cy} r="4" fill="#A5F3FC" stroke="#67E8F9" strokeWidth="2" />
                      <circle cx={cx} cy={cy} r="8" fill="#67E8F9" opacity="0.4" className="animate-ping" />
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#8B96A8] pt-2 border-t border-white/5">
              <span>20 Ticks Ago</span>
              <span>10 Ticks Ago</span>
              <span className="text-[#67E8F9] font-semibold">Latest: {latencyHistory[latencyHistory.length - 1]}ms</span>
            </div>
          </div>

          {/* Regional Edge Latencies (1 Col) */}
          <div className="rounded-xl bg-[#060810] border border-white/10 p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-space font-bold text-[#EEF2F7] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#67E8F9]" />
                Regional Nodes
              </h3>
              <button
                onClick={rePingRegions}
                disabled={isPingingRegions}
                className="p-1.5 rounded-lg bg-[#141B26] text-[#67E8F9] border border-[#67E8F9]/30 hover:bg-[#67E8F9]/10 transition-colors focus:outline-none"
                aria-label="Re-ping Regional Nodes"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isPingingRegions ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="space-y-2.5">
              {regions.map((reg) => (
                <div
                  key={reg.region}
                  className="p-2.5 rounded-lg bg-[#141B26] border border-white/5 flex items-center justify-between text-xs font-mono"
                >
                  <div>
                    <div className="font-semibold text-[#EEF2F7]">{reg.location}</div>
                    <div className="text-[10px] text-[#8B96A8]">{reg.region}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#060810] text-[#A5F3FC] border border-[#67E8F9]/30 font-bold">
                      {reg.latency}ms
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[11px] font-mono text-[#8B96A8] pt-2 border-t border-white/5 flex items-center justify-between">
              <span>Routing Protocol:</span>
              <span className="text-[#A5F3FC]">Cloudflare Anycast</span>
            </div>
          </div>
        </div>

        {/* System Node Details Grid */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-space font-bold text-[#EEF2F7] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#67E8F9]" />
              Active Subsystem Clusters
            </h3>
            <span className="text-xs font-mono text-[#8B96A8]">4/4 Nodes Healthy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nodes.map((node) => (
              <div
                key={node.id}
                className="p-4 rounded-xl bg-[#060810] border border-white/10 hover:border-[#67E8F9]/50 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                      <h4 className="font-space font-bold text-[#EEF2F7] text-sm">{node.name}</h4>
                    </div>
                    <p className="text-xs font-mono text-[#8B96A8] mt-0.5">{node.category}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#67E8F9]/10 text-[#67E8F9] border border-[#67E8F9]/30 font-semibold">
                    {node.latency}ms
                  </span>
                </div>

                <p className="text-xs text-[#8B96A8] leading-relaxed">{node.description}</p>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 font-mono text-[11px]">
                  <div>
                    <span className="text-[#8B96A8] block text-[10px]">Uptime</span>
                    <span className="text-[#4ADE80] font-semibold">{node.uptime}</span>
                  </div>
                  <div>
                    <span className="text-[#8B96A8] block text-[10px]">Node Load</span>
                    <span className="text-[#A5F3FC]">{node.load}%</span>
                  </div>
                  <div>
                    <span className="text-[#8B96A8] block text-[10px]">Throughput</span>
                    <span className="text-[#EEF2F7] truncate block">{node.throughput}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
