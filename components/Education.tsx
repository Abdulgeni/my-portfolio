"use client";

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Education() {
  const { dict, isRtl, t } = useLanguage();

  return (
    <section id="education" className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-12 font-mono">
          <span className="text-[10px] text-text-3 font-semibold tracking-widest uppercase">
            [ {t('ui.educationHeaderLabel') || '05 / CREDENTIALS'} ]
          </span>
          <h2 className="text-[20px] font-bold font-space text-text-1 mt-2 tracking-tight uppercase">
            {t('ui.educationHeaderTitle') || 'EDUCATION & CERTIFICATIONS'}
          </h2>
        </div>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Education (5 cols) */}
          <div className="md:col-span-5">
            <div className={`border border-border bg-surface p-6 flex flex-col space-y-4 rounded-2xl select-none bento-card shadow-sm ${
              isRtl ? 'border-r-4 border-r-accent border-l-0' : 'border-l-4 border-l-accent border-r-0'
            }`}>
              <div className="flex flex-col space-y-1">
                <span className={`font-mono text-[9px] text-text-3 uppercase font-semibold ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t('ui.degreeAndMajor')}
                </span>
                <h3 className={`font-space font-semibold text-[16px] text-text-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {dict.education.degree}
                </h3>
              </div>

              <div className="flex flex-col space-y-[2px]">
                <div className={`font-mono text-[11px] text-accent font-semibold uppercase ${isRtl ? 'text-right' : 'text-left'}`}>
                  {dict.education.institution}
                </div>
                <div className={`font-mono text-[10px] text-text-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {dict.education.location}
                </div>
              </div>

              {/* Period Badge */}
              <div className={`${isRtl ? 'self-end' : 'self-start'} font-mono text-[10px] text-accent border border-accent/20 px-3 py-1 bg-accent/5 font-semibold rounded-lg`}>
                [ {dict.education.period} ]
              </div>

              {/* Separator */}
              <div className="border-b border-[#1A1A1A] w-full"></div>

              {/* Coursework */}
              <div className="flex flex-col space-y-2">
                <span className={`font-mono text-[9px] text-text-3 uppercase font-semibold ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t('ui.relevantCoursework')}
                </span>
                <div className={`flex flex-wrap gap-2 pt-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  {dict.education.coursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[9px] text-text-2 border border-border px-2 py-1 bg-surface-2 rounded-lg"
                    >
                      [ {course} ]
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Certifications (7 cols) */}
          <div className="md:col-span-7 flex flex-col">
            <div className="border border-border bg-surface p-6 rounded-2xl flex flex-col bento-card shadow-sm">
              <div className={`font-mono text-[9px] text-text-3 uppercase font-semibold mb-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                {t('ui.professionalCertifications')}
              </div>
              <div className="flex flex-col select-none">
                {dict.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className={`group flex items-center justify-between py-3 border-b border-[#1A1A1A] last:border-b-0 ${isRtl ? 'flex-row-reverse' : ''}`}
                  >
                    <span className="font-sans text-[13px] text-text-1 group-hover:text-accent transition-colors duration-100 font-medium font-space">
                      {cert.name}
                    </span>
                    <span className={`font-mono text-[10px] text-text-3 shrink-0 font-medium ${isRtl ? 'mr-4 ml-0' : 'ml-4 mr-0'}`}>
                      {cert.issuer}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Languages Row */}
        <div className="mt-12 select-none border-t border-border/40 pt-6">
          <div className={`flex flex-wrap items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span className="font-mono text-[9px] text-text-3 uppercase font-semibold">
              {t('ui.languagesSystems')}:
            </span>
            {dict.languages.map((lang, idx) => (
              <span
                key={idx}
                className="font-mono text-[10px] text-text-2 border border-border px-3 py-1 bg-surface rounded-lg"
              >
                [ {lang} ]
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
