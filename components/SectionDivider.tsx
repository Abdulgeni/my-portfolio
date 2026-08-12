'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  label?: string;
}

export default function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex items-center justify-center pointer-events-none">
      {/* Container line with Framer Motion reveal */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-px flex items-center justify-center bg-gradient-to-r from-transparent via-[var(--signal-ice-dim,rgba(103,232,249,0.15))] to-transparent"
      >
        {/* Subtle animated glowing pulse travelling along the gradient line */}
        <motion.div
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute h-[2px] w-32 bg-gradient-to-r from-transparent via-[var(--signal-ice,#67E8F9)] to-transparent blur-[1px]"
        />

        {/* Central visual accent node */}
        <div className="absolute flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#060810] border border-[var(--signal-ice-dim,rgba(103,232,249,0.2))] text-[10px] font-mono text-[#8B96A8] shadow-[0_0_12px_var(--signal-ice-dim,rgba(103,232,249,0.1))]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal-ice,#67E8F9)] animate-pulse" />
          {label && <span className="tracking-widest uppercase text-[9px] text-[var(--signal-ice,#67E8F9)]/70">{label}</span>}
        </div>
      </motion.div>
    </div>
  );
}
