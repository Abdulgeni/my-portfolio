"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface SectionSeparatorProps {
  idNum: number;
  labelEn: string;
  labelAr: string;
}

export default function SectionSeparator({ idNum, labelEn, labelAr }: SectionSeparatorProps) {
  const { isRtl } = useLanguage();

  return (
    <div className="relative w-full h-16 flex items-center justify-center overflow-hidden select-none">
      {/* Decorative Grid-aligned '+' Markers at the outer bounds on desktop */}
      <div className="absolute left-6 md:left-12 font-mono text-[10px] text-border-2/40 pointer-events-none hidden sm:block">
        +
      </div>
      <div className="absolute right-6 md:right-12 font-mono text-[10px] text-border-2/40 pointer-events-none hidden sm:block">
        +
      </div>

      {/* Background Line Track */}
      <div className="absolute inset-x-6 md:inset-x-12 h-[1px] bg-border/40" />

      {/* Animated drawing line (drawing from center out when in view) */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="absolute inset-x-6 md:inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-border-2/80 to-transparent origin-center"
      />

      {/* Traveling light beam / signal pulse */}
      <motion.div
        initial={{ x: isRtl ? '100%' : '-100%' }}
        whileInView={{ x: isRtl ? '-100%' : '100%' }}
        viewport={{ once: false }}
        transition={{
          duration: 3,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 5,
        }}
        className="absolute w-40 h-[1.5px] bg-gradient-to-r from-transparent via-accent to-transparent pointer-events-none"
      />

      {/* Central Terminal Link Pill */}
      <motion.div
        initial={{ opacity: 0, y: 5, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="relative z-10 bg-bg border border-border px-4 py-1.5 rounded-full flex items-center gap-2 font-mono text-[9px] font-medium text-text-3 shadow-sm hover:border-accent/40 transition-colors duration-150"
      >
        {/* Blinking signal dot */}
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
        </span>

        {/* Separator localized text label */}
        <span className="tracking-widest uppercase">
          {isRtl ? labelAr : labelEn} [ 0x0{idNum} ]
        </span>
      </motion.div>
    </div>
  );
}
