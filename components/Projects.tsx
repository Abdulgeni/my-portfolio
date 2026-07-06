"use client";

import React, { useState } from 'react';
import { PROJECTS } from '../lib/data';
import { Project } from '../lib/types';
import { Clock, Share2, Check } from 'lucide-react';
import GitHubStats from './GitHubStats';
import { useLanguage } from '../context/LanguageContext';

function calculateReadingTime(text: string): string {
  const wpm = 200; // Words Per Minute
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = words / wpm;
  const seconds = Math.ceil(minutes * 60);
  if (seconds < 60) {
    return `${seconds}s`;
  }
  return `${Math.ceil(minutes)}m`;
}

export type ProjectCategory = 'All' | 'AI Engineering' | 'Full Stack' | 'Workflow Automation';

export default function Projects() {
  const { dict, isRtl, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleShare = async (e: React.MouseEvent, project: Project, index: number) => {
    e.stopPropagation();
    const shareUrl = project.live || project.github || window.location.href;
    const shareTitle = `${project.title} | ${isRtl ? 'عبد الغني' : 'Abdulgeni'}`;
    const shareText = `Check out this project: ${project.title} - ${project.description}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          return;
        }
        console.error('Error sharing:', err);
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Merge static metadata from PROJECTS with dynamic translations from dict.projects
  const allProjects = [
    ...PROJECTS.business.map((p, i) => ({
      ...p,
      title: dict.projects.business[i]?.title || p.title,
      description: dict.projects.business[i]?.description || p.description,
    })),
    ...PROJECTS.rag.map((p, i) => ({
      ...p,
      title: dict.projects.rag[i]?.title || p.title,
      description: dict.projects.rag[i]?.description || p.description,
    }))
  ];

  const filteredProjects = activeCategory === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'All', label: t('ui.allCategories') },
    { id: 'AI Engineering', label: isRtl ? 'هندسة الذكاء الاصطناعي' : 'AI ENGINEERING' },
    { id: 'Full Stack', label: isRtl ? 'تطوير متكامل' : 'FULL STACK' },
    { id: 'Workflow Automation', label: isRtl ? 'أتمتة سير العمل' : 'WORKFLOW AUTOMATION' },
  ];

  return (
    <section id="projects" className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="font-mono mb-6 md:mb-0">
            <span className="text-[10px] text-text-3 font-semibold tracking-widest uppercase">
              [ {isRtl ? '02 / الأنظمة المشحونة' : '02 / SHIPPED SYSTEMS'} ]
            </span>
            <h2 className="text-[20px] font-bold font-space text-text-1 mt-2 tracking-tight uppercase">
              {isRtl ? 'مستودعات برمجية جاهزة للإنتاج' : 'PRODUCTION-GRADE REPOSITORIES'}
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] select-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 font-semibold border transition-all duration-150 rounded-xl cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-accent border-accent text-bg'
                    : 'border-border text-text-3 hover:text-text-2 hover:border-border-2'
                }`}
              >
                {cat.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => {
            const projectNum = `~/00${index + 1}`;
            return (
              <div
                key={index}
                onClick={() => {
                  if (project.live) {
                    window.open(project.live, '_blank');
                  } else if (project.github) {
                    window.open(project.github, '_blank');
                  }
                }}
                className="group border border-border bg-surface p-6 flex flex-col justify-between h-[250px] rounded-2xl cursor-pointer select-none bento-card shadow-sm"
              >
                {/* Card Header Row */}
                <div className="flex items-center justify-between font-mono mb-4">
                  <div className={`flex items-center ${isRtl ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                    <span className="text-[9px] text-text-3 font-semibold tracking-wider">
                      {projectNum}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-[9px] text-text-3 border border-border bg-surface-2 px-2 py-0.5 rounded-lg select-none ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <Clock size={10} className="text-accent" />
                      <span>{calculateReadingTime(project.description)} {isRtl ? 'قراءة' : 'READ'}</span>
                    </span>
                  </div>
                  
                  <div className={`flex items-center ${isRtl ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                    {/* Share Button with Web Share & Clipboard Copy fallback */}
                    <button
                      onClick={(e) => handleShare(e, project, index)}
                      className="p-1 border border-transparent hover:border-border hover:bg-surface-2 rounded-lg text-text-3 hover:text-accent transition-all duration-150 cursor-pointer relative group/share outline-none"
                      title={t('ui.shareProject')}
                      aria-label={`Share ${project.title}`}
                    >
                      {copiedIndex === index ? (
                        <Check size={12} className="text-emerald-500" />
                      ) : (
                        <Share2 size={12} />
                      )}
                      
                      {/* Copy confirmation tooltip */}
                      {copiedIndex === index && (
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 bg-text-1 text-bg text-[8px] font-bold rounded shadow-lg whitespace-nowrap font-mono z-50">
                          {t('ui.copied')}
                        </span>
                      )}
                    </button>

                    {/* GitHub link icon */}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-text-3 hover:text-accent transition-colors"
                        title="View GitHub Repository"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="flex-1">
                  <h3 className={`font-space font-semibold text-[15px] text-text-1 mb-2 group-hover:text-accent transition-colors duration-100 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {project.title}
                  </h3>
                  <p className={`font-sans text-[13px] text-text-2 leading-relaxed line-clamp-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags and Bottom Link */}
                <div className={`mt-4 pt-3 border-t border-border/40 flex items-center justify-between flex-wrap gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center flex-wrap gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="font-mono text-[9px] text-text-2 border border-border px-2.5 py-0.5 rounded-lg bg-surface-2"
                      >
                        [ {tech} ]
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="font-mono text-[9px] text-text-3 border border-transparent px-1 py-0.5">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {project.live && (
                    <span className="font-mono text-[10px] text-accent font-semibold flex items-center hover:underline whitespace-nowrap">
                      {isRtl ? '↗ عرض حي' : '↗ LIVE DEMO'}
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic GitHub Stats Component */}
        <GitHubStats />
      </div>
    </section>
  );
}
