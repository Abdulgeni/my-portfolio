'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '@/lib/data';
import { Terminal, GitCommit, Briefcase, Calendar } from 'lucide-react';
import { staggerContainer, revealItem, revealItemLeft } from '@/lib/animations';

export default function ExperienceLog() {
  return (
    <motion.section
      id="experience"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10"
    >
      {/* Section Title */}
      <motion.div variants={revealItem} className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-[#67E8F9] font-bold tracking-wider uppercase mb-2 glow-text-ice">
          <Terminal className="w-4 h-4 text-[#67E8F9]" />
          <span>PRODUCTION TRACK RECORD</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-space font-bold text-[#EEF2F7]">
          {"// Engineering Log"}
        </h2>
      </motion.div>

      {/* Git Commit Style Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#67E8F9]/40 space-y-12 ml-2 sm:ml-4">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={idx}
            variants={revealItemLeft}
            className="relative group"
          >
            {/* Glowing Commit Node Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#060810] border-2 border-[#67E8F9] flex items-center justify-center shadow-[0_0_12px_#67E8F9] group-hover:border-[#A5F3FC] group-hover:shadow-[0_0_15px_#A5F3FC] transition-all duration-300">
              <span className="w-2 h-2 rounded-full bg-[#67E8F9] group-hover:bg-[#A5F3FC] transition-colors" />
            </div>

            {/* Role Entry Terminal Card */}
            <div className="rounded-2xl bg-[#0C1018] border border-white/5 hover:border-[#67E8F9]/70 p-6 sm:p-8 shadow-[0_0_20px_rgba(103,232,249,0.1)] transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#141B26]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="w-4 h-4 text-[#67E8F9]" />
                    <h3 className="text-xl font-space font-bold text-[#EEF2F7]">
                      {exp.role}
                    </h3>
                  </div>
                  <div className="text-sm font-mono text-[#A5F3FC] font-semibold">
                    {exp.company} · <span className="text-[#8B96A8]">{exp.type}</span>
                  </div>
                </div>

                {/* Date Badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold text-[#67E8F9] bg-[#67E8F9]/10 border border-[#67E8F9]/30 w-fit">
                  <Calendar className="w-3.5 h-3.5" />
                  {exp.period}
                </span>
              </div>

              {/* Terminal Log Bullet Points */}
              <div className="space-y-3 font-mono text-sm">
                {exp.highlights.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3 text-[#8B96A8] leading-relaxed">
                    <span className="text-[#67E8F9] font-black shrink-0">&gt;</span>
                    <span className="text-xs sm:text-sm text-[#EEF2F7]/90">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
