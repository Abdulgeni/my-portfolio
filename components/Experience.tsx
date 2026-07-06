"use client";

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Experience() {
  const { dict, isRtl, t } = useLanguage();

  return (
    <section id="experience" className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-12 font-mono">
          <span className="text-[10px] text-text-3 font-semibold tracking-widest uppercase">
            [ {t('ui.experienceHeaderLabel') || '04 / ENGINEERING LOG'} ]
          </span>
          <h2 className="text-[20px] font-bold font-space text-text-1 mt-2 tracking-tight uppercase">
            {t('ui.experienceHeaderTitle') || 'WORK EXPERIENCE HISTORY'}
          </h2>
        </div>

        {/* Experience Log Entries */}
        <div className="flex flex-col space-y-5">
          {dict.experience.map((entry, index) => (
            <div
              key={index}
              className={`border border-border bg-surface p-6 flex flex-col space-y-4 rounded-2xl select-none bento-card shadow-sm ${
                isRtl ? 'border-r-4 border-r-accent border-l-0' : 'border-l-4 border-l-accent border-r-0'
              }`}
            >
              {/* Top Row: Role and Period */}
              <div className={`flex flex-col md:flex-row md:items-center justify-between gap-1 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
                <h3 className={`font-space font-semibold text-[16px] text-text-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {entry.role}
                </h3>
                <span className="font-mono text-[10px] text-text-3 font-medium">
                  {entry.period}
                </span>
              </div>

              {/* Second Row: Company and Location/Type */}
              <div className={`font-mono text-[10px] text-accent uppercase tracking-wider font-semibold ${isRtl ? 'text-right' : 'text-left'}`}>
                {entry.company} &nbsp;·&nbsp; {entry.type}
              </div>

              {/* Separator Line */}
              <div className="border-b border-[#1A1A1A] w-full"></div>

              {/* Highlights */}
              <div className="flex flex-col space-y-3 pt-1">
                {entry.highlights.map((bullet, idx) => (
                  <div key={idx} className={`flex items-start ${isRtl ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    <span className="font-mono text-[11px] text-accent font-semibold select-none pt-[2px]">
                      &gt;
                    </span>
                    <p className={`font-sans text-[13px] text-text-2 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
