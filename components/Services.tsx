"use client";

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Services() {
  const { dict, isRtl, t } = useLanguage();

  return (
    <section id="services" className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-12 font-mono">
          <span className="text-[10px] text-text-3 font-semibold tracking-widest uppercase">
            [ {t('ui.servicesHeaderLabel') || '01 / WHAT I BUILD'} ]
          </span>
          <h2 className="text-[20px] font-bold font-space text-text-1 mt-2 tracking-tight uppercase">
            {t('ui.servicesHeaderTitle') || 'CORE SERVICES & CAPABILITIES'}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.services.map((service, index) => {
            const num = String(index + 1).padStart(2, '0');
            return (
              <div
                key={index}
                className="group border border-border bg-surface p-7 flex flex-col justify-between h-[280px] rounded-2xl relative select-none bento-card shadow-sm"
              >
                {/* Background Large Number */}
                <div className={`absolute top-4 ${isRtl ? 'right-6' : 'left-6'} font-mono text-[48px] font-bold text-slate-800/20 leading-none group-hover:text-indigo-500/10 transition-colors duration-200`}>
                  {num}
                </div>

                {/* Content */}
                <div className="relative z-10 pt-12">
                  <h3 className={`font-space font-semibold text-[16px] text-text-1 mb-3 group-hover:text-accent transition-colors ${isRtl ? 'text-right' : 'text-left'}`}>
                    {service.title}
                  </h3>
                  <p className={`font-sans text-[13px] text-text-2 leading-[1.7] ${isRtl ? 'text-right' : 'text-left'}`}>
                    {service.description}
                  </p>
                </div>

                {/* Bottom Badge */}
                <div className={`relative z-10 mt-6 ${isRtl ? 'self-end' : 'self-start'} font-mono text-[10px] text-accent border border-accent/20 px-3 py-1 uppercase tracking-wider font-semibold bg-accent/5 rounded-lg`}>
                  [ {service.stat} ]
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
