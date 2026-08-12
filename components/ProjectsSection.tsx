'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, TECH_DESCRIPTIONS } from '@/lib/data';
import { Project } from '@/lib/types';
import { ExternalLink, Github, ChevronDown, ChevronUp, Cpu, CheckCircle2, AlertTriangle, Lightbulb, Rocket, Search, X, Filter, Info } from 'lucide-react';
import { staggerContainer, revealItem, bentoGridStagger, bentoCardReveal } from '@/lib/animations';
import SkillCloudWidget from '@/components/SkillCloudWidget';
import ProjectPhaseTimeline from '@/components/ProjectPhaseTimeline';

type FilterType = 'ALL' | 'AI / RAG' | 'FULL STACK' | 'SYSTEMS & AUTOMATION';

const FILTER_TABS: { id: FilterType; label: string }[] = [
  { id: 'ALL', label: 'ALL' },
  { id: 'AI / RAG', label: 'AI / RAG' },
  { id: 'FULL STACK', label: 'FULL STACK' },
  { id: 'SYSTEMS & AUTOMATION', label: 'SYSTEMS & AUTOMATION' },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>('agentic-rag');
  const [hoveredTech, setHoveredTech] = useState<{ projectId: string; tech: string } | null>(null);

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = activeFilter === 'ALL' || project.category === activeFilter;
    const matchesTech = !selectedTech || project.stack.includes(selectedTech);
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      project.title.toLowerCase().includes(query) ||
      project.shortDescription.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query) ||
      project.stack.some((tech) => tech.toLowerCase().includes(query));

    return matchesCategory && matchesTech && matchesSearch;
  });

  const handleSelectTech = (tech: string | null) => {
    setSelectedTech(tech);
    const matching = PROJECTS.filter(
      (p) =>
        (!tech || p.stack.includes(tech)) &&
        (activeFilter === 'ALL' || p.category === activeFilter)
    );
    if (matching.length > 0) {
      setExpandedId(matching[0].id);
    }
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setSearchQuery(''); // Reset search query when switching category tabs so full category list displays

    // Find projects matching the newly selected category
    const categoryProjects = PROJECTS.filter(
      (p) => filter === 'ALL' || p.category === filter
    );

    // Auto-expand the first project of the new category
    if (categoryProjects.length > 0) {
      setExpandedId(categoryProjects[0].id);
    } else {
      setExpandedId(null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const resetFilters = () => {
    setActiveFilter('ALL');
    setSearchQuery('');
    setExpandedId('agentic-rag');
  };

  return (
    <motion.section
      id="systems"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10"
    >
      {/* Section Header & Search/Filter Controls */}
      <motion.div variants={revealItem} className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#67E8F9] font-bold tracking-wider uppercase mb-2 glow-text-ice">
            <Cpu className="w-4 h-4 text-[#67E8F9]" />
            <span>PROVEN COMMERCIAL RESULTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-space font-bold text-[#EEF2F7]">
            {"// Deployed Systems"}
          </h2>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Keyword / Tech Stack Search Box */}
          <div className="relative min-w-[220px] sm:w-64">
            <Search className="w-4 h-4 text-[#8B96A8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, title..."
              className="w-full bg-[#0C1018] border border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs font-mono text-[#EEF2F7] placeholder-[#8B96A8]/60 focus:outline-none focus:border-[#67E8F9] focus:ring-1 focus:ring-[#67E8F9] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#8B96A8] hover:text-[#EEF2F7]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#0C1018] border border-white/10 w-fit shadow-inner">
            {FILTER_TABS.map((tab) => {
              const count =
                tab.id === 'ALL'
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.category === tab.id).length;

              const isActive = activeFilter === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleFilterChange(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#67E8F9] to-[#A5F3FC] text-[#060810] shadow-[0_0_15px_rgba(103,232,249,0.4)] border border-[#67E8F9]'
                      : 'text-[#8B96A8] hover:text-[#EEF2F7] hover:bg-[#141B26] border border-transparent'
                  }`}
                >
                  <span>[{tab.label}]</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                      isActive
                        ? 'bg-[#060810] text-[#67E8F9]'
                        : 'bg-white/5 text-[#8B96A8]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* 3D Interactive Skill Cloud Widget */}
      <motion.div variants={revealItem} className="mb-8">
        <SkillCloudWidget selectedTech={selectedTech} onSelectTech={handleSelectTech} />
      </motion.div>

      {/* Filter Stats Indicator */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#8B96A8] mb-6 px-1 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#67E8F9]" />
          <span>
            SHOWING <strong className="text-[#EEF2F7]">{filteredProjects.length}</strong> OF {PROJECTS.length} COMMERCIAL SYSTEMS
          </span>
          {activeFilter !== 'ALL' && (
            <span className="px-2 py-0.5 rounded bg-[#67E8F9]/10 text-[#67E8F9] border border-[#67E8F9]/20 font-bold">
              CATEGORY: {activeFilter}
            </span>
          )}
          {selectedTech && (
            <span className="px-2 py-0.5 rounded bg-[#67E8F9]/15 text-[#67E8F9] border border-[#67E8F9]/40 font-bold flex items-center gap-1.5">
              TECH: {selectedTech}
              <button
                type="button"
                onClick={() => setSelectedTech(null)}
                className="hover:text-white"
                title="Clear tech filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>

        {(activeFilter !== 'ALL' || searchQuery || selectedTech) && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs text-[#67E8F9] hover:underline flex items-center gap-1 font-mono cursor-pointer"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Projects Grid Container (flex column with gap-6) */}
      <motion.div
        variants={bentoGridStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="flex flex-col gap-6 min-h-[200px]"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => {
              const isExpanded = expandedId === project.id;
              const isSecurityOrPR = project.id === 'vulnalert' || project.id === 'pr-review-bot';

              return (
                <motion.div
                  key={project.id}
                  variants={bentoCardReveal}
                  custom={index}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.2 } }}
                  className={`rounded-2xl bg-[#0C1018] border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? isSecurityOrPR
                        ? 'border-[#EF4444] shadow-[0_0_30px_rgba(239,68,68,0.22)] bg-[#0C1018]'
                        : 'border-[#67E8F9] shadow-[0_0_30px_rgba(103,232,249,0.22)] bg-[#0C1018]'
                      : 'border-white/5 hover:border-[#67E8F9]/60 hover:shadow-[0_0_20px_rgba(103,232,249,0.15)]'
                  }`}
                >
                  {/* Collapsed Header Bar */}
                  <div
                    onClick={() => toggleExpand(project.id)}
                    className="p-6 sm:p-8 cursor-pointer select-none flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    {/* Left Title & Description */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
                          isSecurityOrPR
                            ? 'text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                            : 'text-[#67E8F9] bg-[#67E8F9]/10 border border-[#67E8F9]/30'
                        }`}>
                          {isSecurityOrPR ? `CRITICAL SYSTEM · ${project.category}` : project.category}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-space font-bold text-[#EEF2F7]">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-[#8B96A8] text-sm leading-relaxed mb-4 max-w-2xl">
                        {project.shortDescription}
                      </p>

                      {/* Tech Badges & Interactive Full Technology Descriptions */}
                      <div className="relative mt-2">
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech, idx) => {
                            const isHovered =
                              hoveredTech?.projectId === project.id && hoveredTech?.tech === tech;

                            return (
                              <button
                                key={idx}
                                type="button"
                                onMouseEnter={() => setHoveredTech({ projectId: project.id, tech })}
                                onMouseLeave={() => setHoveredTech(null)}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setHoveredTech((prev) =>
                                    prev?.projectId === project.id && prev?.tech === tech
                                      ? null
                                      : { projectId: project.id, tech }
                                  );
                                }}
                                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                                  isHovered
                                    ? 'text-[#67E8F9] bg-[#67E8F9]/15 border border-[#67E8F9]/60 shadow-[0_0_12px_rgba(103,232,249,0.35)] scale-105'
                                    : 'text-[#8B96A8] bg-[#141B26] border border-white/5 hover:text-[#EEF2F7] hover:border-white/20'
                                }`}
                              >
                                {tech}
                              </button>
                            );
                          })}
                        </div>

                        {/* Smooth Framer Motion Opacity Transition for Technology Description */}
                        <AnimatePresence mode="wait">
                          {hoveredTech?.projectId === project.id && (
                            <motion.div
                              key={hoveredTech.tech}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 4 }}
                              transition={{ duration: 0.22, ease: 'easeOut' }}
                              className="mt-3 p-3 rounded-xl bg-[#060810] border border-[#67E8F9]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-xs font-mono text-[#EEF2F7] flex items-start gap-2.5 z-20"
                            >
                              <span className="p-1 rounded bg-[#67E8F9]/10 text-[#67E8F9] shrink-0 mt-0.5 border border-[#67E8F9]/20">
                                <Info className="w-3.5 h-3.5" />
                              </span>
                              <div>
                                <span className="font-bold text-[#67E8F9] mr-2">
                                  [{hoveredTech.tech}]
                                </span>
                                <span className="text-[#8B96A8] leading-relaxed">
                                  {TECH_DESCRIPTIONS[hoveredTech.tech] ||
                                    'Core technological component powering this architecture.'}
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Right Metrics & Expand Toggle */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between lg:justify-end gap-6 shrink-0 border-t lg:border-t-0 border-[#141B26] pt-4 lg:pt-0">
                      {/* Glowing Metrics */}
                      <div className="flex items-center gap-6">
                        <div className="text-left">
                          <div className="text-lg sm:text-xl font-mono font-bold text-[#A5F3FC] glow-text-ice">
                            {project.metricPrimary}
                          </div>
                          <div className="text-[11px] font-mono text-[#4A5262] uppercase">
                            PRIMARY METRIC
                          </div>
                        </div>

                        <div className="hidden sm:block text-left border-l border-[#141B26] pl-6">
                          <div className="text-sm font-mono font-semibold text-[#67E8F9]">
                            {project.metricSecondary}
                          </div>
                          <div className="text-[11px] font-mono text-[#4A5262] uppercase">
                            EFFICIENCY GAIN
                          </div>
                        </div>
                      </div>

                      {/* Expand Button */}
                      <button
                        className="p-2 rounded-xl bg-[#141B26] border border-white/5 text-[#8B96A8] hover:text-[#A5F3FC] hover:border-[#A5F3FC]/50 transition-colors"
                        aria-label="Expand case study"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Case Study Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-[#141B26] bg-[#060810] p-6 sm:p-8"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          {/* Problem */}
                          <div className="p-5 rounded-xl bg-[#0C1018] border border-white/5">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#EF4444] font-bold uppercase mb-2">
                              <AlertTriangle className="w-4 h-4" />
                              <span>1. The Problem</span>
                            </div>
                            <p className="text-xs text-[#8B96A8] leading-relaxed">
                              {project.problem}
                            </p>
                          </div>

                          {/* Approach */}
                          <div className="p-5 rounded-xl bg-[#0C1018] border border-white/5">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#67E8F9] font-bold uppercase mb-2">
                              <Lightbulb className="w-4 h-4" />
                              <span>2. The Architecture</span>
                            </div>
                            <p className="text-xs text-[#8B96A8] leading-relaxed">
                              {project.approach}
                            </p>
                          </div>

                          {/* Result */}
                          <div className="p-5 rounded-xl bg-[#0C1018] border border-[#A5F3FC]/30">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#A5F3FC] font-bold uppercase mb-2">
                              <Rocket className="w-4 h-4" />
                              <span>3. Measured Impact</span>
                            </div>
                            <p className="text-xs text-[#8B96A8] leading-relaxed">
                              {project.result}
                            </p>
                          </div>
                        </div>

                        {/* Dynamic Glacial Development Phase Timeline */}
                        <ProjectPhaseTimeline
                          phases={project.developmentPhases}
                          isSecurityOrPR={isSecurityOrPR}
                        />

                        {/* External Action Links */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#141B26]">
                          <div className="flex items-center gap-2 text-xs font-mono text-[#4A5262]">
                            <CheckCircle2 className="w-4 h-4 text-[#A5F3FC]" />
                            <span>Status: Deployed &amp; Verified</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-[#EEF2F7] bg-[#141B26] border border-white/5 hover:border-[#67E8F9] transition-colors"
                            >
                              <Github className="w-4 h-4 text-[#67E8F9]" />
                              <span>GitHub Source</span>
                            </a>

                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold text-[#060810] bg-[#67E8F9] hover:bg-[#38BDF8] transition-colors shadow-[0_0_15px_rgba(103,232,249,0.3)]"
                              >
                                <span>Live Application</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-12 text-center rounded-2xl bg-[#0C1018] border border-white/5 flex flex-col items-center justify-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#141B26] flex items-center justify-center text-[#67E8F9]">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-space font-bold text-[#EEF2F7]">
                  No systems found matching &quot;{searchQuery || activeFilter}&quot;
                </h3>
                <p className="text-xs font-mono text-[#8B96A8]">
                  Try clearing your search query or selecting a different category filter.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="mt-2 px-4 py-2 rounded-xl text-xs font-mono font-bold text-[#060810] bg-[#67E8F9] hover:bg-[#A5F3FC] transition-colors"
              >
                Reset All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}

