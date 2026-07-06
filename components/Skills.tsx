"use client";

import React from 'react';
import { SKILLS } from '../lib/data';
import { useLanguage } from '../context/LanguageContext';

export default function Skills() {
  const { isRtl, t } = useLanguage();

  return (
    <section id="skills" className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-12 font-mono">
          <span className="text-[10px] text-text-3 font-semibold tracking-widest uppercase">
            [ {t('ui.skillsHeaderLabel') || '03 / TECHNICAL MATRIX'} ]
          </span>
          <h2 className="text-[20px] font-bold font-space text-text-1 mt-2 tracking-tight uppercase">
            {t('ui.skillsHeaderTitle') || 'ENGINEERING STACK'}
          </h2>
        </div>

        {/* Code-Style Import Block */}
        <div className={`border border-border bg-surface p-5 md:p-6 rounded-2xl font-mono text-[12px] md:text-[13px] leading-relaxed mb-12 select-none overflow-x-auto bento-card shadow-sm ${isRtl ? 'text-right' : 'text-left'}`}>
          <div>
            <span className="text-accent font-semibold">import</span> <span className="text-text-2">{`{`}</span>{' '}
            <span className="text-text-1 font-medium">OpenAI_API, Gemini_API, LangChain, RAG, ChromaDB</span>{' '}
            <span className="text-text-2">{`}`}</span> <span className="text-accent font-semibold">from</span>{' '}
            <span className="text-slate-500">'ai-engineering'</span><span className="text-text-3">;</span>
          </div>
          <div className="mt-2">
            <span className="text-accent font-semibold">import</span> <span className="text-text-2">{`{`}</span>{' '}
            <span className="text-text-1 font-medium">n8n, Zapier, GitHub_Actions, Slack_API</span>{' '}
            <span className="text-text-2">{`}`}</span> <span className="text-accent font-semibold">from</span>{' '}
            <span className="text-slate-500">'automation'</span><span className="text-text-3">;</span>
          </div>
          <div className="mt-2">
            <span className="text-accent font-semibold">import</span> <span className="text-text-2">{`{`}</span>{' '}
            <span className="text-text-1 font-medium">React, NextJS, TypeScript, TailwindCSS</span>{' '}
            <span className="text-text-2">{`}`}</span> <span className="text-accent font-semibold">from</span>{' '}
            <span className="text-slate-500">'frontend'</span><span className="text-text-3">;</span>
          </div>
          <div className="mt-2">
            <span className="text-accent font-semibold">import</span> <span className="text-text-2">{`{`}</span>{' '}
            <span className="text-text-1 font-medium">NodeJS, Python, PostgreSQL, Prisma, Docker, Vercel</span>{' '}
            <span className="text-text-2">{`}`}</span> <span className="text-accent font-semibold">from</span>{' '}
            <span className="text-slate-500">'backend'</span><span className="text-text-3">;</span>
          </div>
        </div>

        {/* Category Rows */}
        <div className="border-t border-border/40 select-none">
          {Object.entries(SKILLS).map(([key, list]) => {
            // Map keys to human-readable names
            const displayNames: Record<string, string> = isRtl ? {
              AI_RAG: 'قنوات الذكاء الاصطناعي و RAG',
              AUTOMATION: 'أتمتة سير العمل',
              FRONTEND: 'تطوير الواجهات الأمامية',
              BACKEND: 'الواجهات الخلفية وقواعد البيانات',
              SECURITY: 'الأمان والبرمجة الآمنة',
              LANGUAGES: 'اللغات الأساسية',
              DEV_TOOLS: 'العمليات السحابية والأدوات',
            } : {
              AI_RAG: 'AI & RAG PIPELINES',
              AUTOMATION: 'WORKFLOW AUTOMATION',
              FRONTEND: 'FRONTEND DEVELOPMENT',
              BACKEND: 'BACKEND & DATABASE',
              SECURITY: 'SECURITY & SECURE CODING',
              LANGUAGES: 'CORE LANGUAGES',
              DEV_TOOLS: 'DEV OPS & TOOLING',
            };

            const categoryName = displayNames[key] || key.replace('_', ' ');

            return (
              <div
                key={key}
                className={`flex flex-col md:flex-row items-start py-6 border-b border-[#1A1A1A] gap-4 ${isRtl ? 'md:flex-row' : ''}`}
              >
                {/* Category Name (180px fixed width on desktop) */}
                <div className={`font-mono text-[9px] text-text-3 font-semibold tracking-wider uppercase w-full md:w-[180px] shrink-0 pt-1 ${isRtl ? 'text-right md:pl-4' : 'text-left md:pr-4'}`}>
                  {categoryName}
                </div>

                {/* Skills Flex Row */}
                <div className={`flex flex-wrap gap-2 ${isRtl ? 'justify-start' : 'justify-start'}`}>
                  {list.map((skill, index) => (
                    <span
                      key={index}
                      className="font-mono text-[10px] text-text-2 border border-border px-3 py-[4px] bg-surface hover:border-accent hover:text-accent hover:bg-accent-dim hover:scale-105 transition-all duration-200 rounded-lg cursor-default select-none inline-block transform"
                    >
                      [ {skill} ]
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
