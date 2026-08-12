'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DevelopmentPhase } from '@/lib/types';
import {
  Lightbulb,
  Code2,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  GitCommit,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Terminal
} from 'lucide-react';

interface ProjectPhaseTimelineProps {
  phases?: DevelopmentPhase[];
  isSecurityOrPR?: boolean;
}

const PHASE_ICONS = {
  Concept: Lightbulb,
  MVP: Code2,
  Production: Rocket,
  Scale: ShieldCheck,
};

export default function ProjectPhaseTimeline({
  phases,
  isSecurityOrPR = false,
}: ProjectPhaseTimelineProps) {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(2); // Default to Production phase (Index 2) or last completed

  if (!phases || phases.length === 0) return null;

  const currentPhase = phases[activePhaseIndex] || phases[0];

  const primaryAccent = isSecurityOrPR ? '#EF4444' : '#67E8F9';
  const glowShadow = isSecurityOrPR
    ? 'rgba(239,68,68,0.25)'
    : 'rgba(103,232,249,0.25)';

  return (
    <div className="mt-8 pt-6 border-t border-[#141B26]">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#141B26] border border-white/10 text-[#67E8F9]">
            <GitCommit className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#EEF2F7] tracking-wide uppercase">
                {"// Development Lifecycle Timeline"}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                GLACIAL VERIFIED
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#8B96A8]">
              Interactive milestone progression from architecture concept to production scale
            </p>
          </div>
        </div>

        {/* Phase Quick Switcher Controls */}
        <div className="flex items-center gap-1 bg-[#0C1018] border border-white/10 rounded-xl p-1">
          <button
            type="button"
            onClick={() => setActivePhaseIndex((prev) => Math.max(0, prev - 1))}
            disabled={activePhaseIndex === 0}
            className="p-1.5 rounded-lg text-[#8B96A8] hover:text-[#EEF2F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Previous Phase"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono text-[#67E8F9] px-2 font-bold">
            {activePhaseIndex + 1} / {phases.length}
          </span>
          <button
            type="button"
            onClick={() =>
              setActivePhaseIndex((prev) => Math.min(phases.length - 1, prev + 1))
            }
            disabled={activePhaseIndex === phases.length - 1}
            className="p-1.5 rounded-lg text-[#8B96A8] hover:text-[#EEF2F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Next Phase"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Glacial Stepper Bar */}
      <div className="relative mb-8 px-2 sm:px-4">
        {/* Background Connector Line */}
        <div className="absolute left-6 right-6 top-5 h-0.5 bg-[#141B26] z-0 hidden sm:block" />

        {/* Active Progress Connector Line */}
        <motion.div
          className="absolute left-6 top-5 h-0.5 z-0 hidden sm:block bg-gradient-to-r from-[#67E8F9] via-[#38BDF8] to-[#34D399]"
          initial={false}
          animate={{
            width: `calc(${
              (activePhaseIndex / (phases.length - 1)) * 100
            }% - 12px)`,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />

        {/* Phase Nodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 relative z-10">
          {phases.map((item, idx) => {
            const IconComponent = PHASE_ICONS[item.phase] || Terminal;
            const isActive = activePhaseIndex === idx;
            const isPassed = idx <= activePhaseIndex;

            return (
              <button
                key={item.phase}
                type="button"
                onClick={() => setActivePhaseIndex(idx)}
                className={`flex flex-col items-center p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                  isActive
                    ? 'bg-[#060810] border-[#67E8F9] shadow-[0_0_20px_rgba(103,232,249,0.25)] ring-1 ring-[#67E8F9]/50'
                    : isPassed
                    ? 'bg-[#0C1018] border-[#67E8F9]/30 hover:border-[#67E8F9]/60'
                    : 'bg-[#0C1018]/60 border-white/5 opacity-70 hover:opacity-100'
                }`}
              >
                {/* Top Subtle Glow bar for active */}
                {isActive && (
                  <motion.div
                    layoutId="activeGlowBar"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#67E8F9] to-[#A5F3FC]"
                  />
                )}

                {/* Step Node Circle Icon */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 mb-2 ${
                    isActive
                      ? 'bg-[#67E8F9] text-[#060810] shadow-[0_0_12px_rgba(103,232,249,0.5)] scale-110'
                      : isPassed
                      ? 'bg-[#141B26] text-[#67E8F9] border border-[#67E8F9]/30'
                      : 'bg-[#141B26] text-[#8B96A8] border border-white/5'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Phase Number & Title */}
                <span
                  className={`text-[10px] font-mono font-bold tracking-wider uppercase ${
                    isActive
                      ? 'text-[#67E8F9]'
                      : isPassed
                      ? 'text-[#A5F3FC]'
                      : 'text-[#8B96A8]'
                  }`}
                >
                  0{idx + 1}. {item.phase}
                </span>

                {/* Duration Badge */}
                {item.duration && (
                  <span className="text-[9px] font-mono text-[#8B96A8]/80 mt-0.5 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {item.duration}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Phase Specification Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhase.phase}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="p-5 rounded-2xl bg-[#0C1018] border border-[#67E8F9]/20 shadow-[0_4px_25px_rgba(0,0,0,0.4)] relative overflow-hidden"
        >
          {/* Top Background Glacial Highlight */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#67E8F9]/5 rounded-full blur-2xl pointer-events-none" />

          {/* Phase Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-[#141B26]">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-[#67E8F9]/10 text-[#67E8F9] border border-[#67E8F9]/30">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-space font-bold text-[#EEF2F7] flex items-center gap-2">
                  <span>Phase {activePhaseIndex + 1}: {currentPhase.phase} Stage</span>
                  <span className="text-xs font-mono font-normal text-[#8B96A8]">
                    ({currentPhase.duration || 'Milestone Completed'})
                  </span>
                </h4>
              </div>
            </div>

            {/* Status Indicator Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#34D399]/10 border border-[#34D399]/30 text-[#34D399] text-xs font-mono font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="uppercase">{currentPhase.status}</span>
            </div>
          </div>

          {/* Summary Text */}
          <p className="text-xs text-[#EEF2F7]/90 leading-relaxed font-mono mb-4">
            {currentPhase.summary}
          </p>

          {/* Key Deliverables / Tech Highlights Tags */}
          {currentPhase.techHighlights && currentPhase.techHighlights.length > 0 && (
            <div>
              <div className="text-[10px] font-mono text-[#8B96A8] uppercase tracking-wider mb-2">
                {"// Phase Deliverables & Milestones:"}
              </div>
              <div className="flex flex-wrap gap-2">
                {currentPhase.techHighlights.map((highlight, hIdx) => (
                  <span
                    key={hIdx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#141B26] border border-[#67E8F9]/20 text-[11px] font-mono text-[#A5F3FC]"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#67E8F9]" />
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
