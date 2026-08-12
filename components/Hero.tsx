'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowDown, Bot, Terminal, Code2, Cpu, Sparkles } from 'lucide-react';
import { PERSONAL_DATA } from '@/lib/data';
import { useLanguage } from '@/lib/LanguageContext';
import { staggerContainer, revealItem, revealScale } from '@/lib/animations';

// Dynamic import with SSR disabled for WebGL canvas
const NeuralBackground = dynamic(() => import('./NeuralBackground'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0A0806] via-[#12100C] to-[#1C1812] opacity-90 pointer-events-none" />
  ),
});

const TYPING_LINES = [
  "> Full Stack AI Engineer",
  "> Building RAG pipelines that ship to production",
  "> Fluent in English · Arabic · Turkish",
  "> 15+ systems deployed since 2024"
];

const TICKER_ITEMS = [
  "LANGCHAIN", "RAG PIPELINES", "NEXT.JS 15", "PYTHON", "GEMINI API", 
  "N8N AUTOMATION", "POSTGRESQL", "MCP SERVERS", "TYPESCRIPT", "CHROMADB", "TWILIO API"
];

export default function Hero() {
  const { t } = useLanguage();
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Realistic terminal typing animation effect
  useEffect(() => {
    const fullLine = TYPING_LINES[currentLineIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < fullLine.length) {
        // Variable typing speed (30ms - 80ms)
        const speed = Math.floor(Math.random() * 50) + 30;
        timeout = setTimeout(() => {
          setCurrentText(fullLine.substring(0, currentText.length + 1));
        }, speed);
      } else {
        // Pause at the end of typing before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    } else {
      if (currentText.length > 2) {
        // Deleting speed (20ms - 40ms)
        timeout = setTimeout(() => {
          setCurrentText(fullLine.substring(0, currentText.length - 1));
        }, 25);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setCurrentLineIndex((prev) => (prev + 1) % TYPING_LINES.length);
        }, 10);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentLineIndex]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#060810] pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      {/* WebGL Neural background */}
      <NeuralBackground />

      {/* Hero Content Layer */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 flex flex-col justify-center"
      >
        {/* Top Eyebrow Status - Signal Pulse Red for SYSTEM ONLINE */}
        <motion.div
          variants={revealItem}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/30 backdrop-blur-md w-fit mb-8 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EF4444]" />
          </span>
          <span className="font-mono text-xs text-[#EF4444] tracking-wider font-bold uppercase glow-text-pulse-red">
            ◉ SYSTEM ONLINE · ADDIS ABABA (UTC+3)
          </span>
        </motion.div>

        {/* AI Kernel Emblem Badge */}
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8 mb-6">
          <motion.div
            variants={revealScale}
            className="relative group shrink-0"
          >
            {/* Glowing signal rings */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#67E8F9]/40 via-[#A5F3FC]/30 to-[#67E8F9]/40 opacity-70 blur-md group-hover:opacity-100 transition duration-500 group-hover:scale-105" />
            
            <div className="relative w-[120px] h-[120px] rounded-2xl bg-[#0C1018] border border-[#67E8F9]/50 shadow-[0_0_30px_rgba(103,232,249,0.3)] flex flex-col items-center justify-center p-3 overflow-hidden group-hover:border-[#67E8F9] transition-all">
              {/* Background Cyber Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#67E8F9_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />
              
              {/* Animated Central Node */}
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div className="p-2.5 rounded-xl bg-[#141B26] border border-[#67E8F9]/40 text-[#67E8F9] shadow-[0_0_15px_rgba(103,232,249,0.4)] group-hover:scale-110 transition-transform">
                  <Terminal className="w-8 h-8 text-[#67E8F9]" />
                </div>
                <div className="flex items-center gap-1 font-mono text-[10px] text-[#A5F3FC] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                  <span>KERNEL v2.6</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Name & Title */}
          <div className="flex-1">
            <motion.h1
              variants={revealItem}
              className="font-space font-bold text-4xl sm:text-5xl lg:text-6xl text-[#EEF2F7] tracking-tight leading-[1.1] mb-4"
            >
              Abdulgeni Abdulaziz
            </motion.h1>

            {/* Live Terminal Typing Effect with Signal Ice Cursor Block */}
            <motion.div
              variants={revealItem}
              className="font-mono text-base sm:text-lg lg:text-xl text-[#67E8F9] min-h-[32px] flex items-center font-bold glow-text-ice mb-4"
            >
              <span>{currentText}</span>
              <span className="inline-block w-2.5 h-5 bg-[#67E8F9] ml-1.5 animate-cursor-blink shadow-[0_0_10px_#67E8F9]" />
            </motion.div>

            {/* Value Statement */}
            <motion.p
              variants={revealItem}
              className="text-[#8B96A8] text-base leading-relaxed max-w-xl"
            >
              {t('hero.subtext', 'Architecting autonomous RAG pipelines, AI agents, workflow automations, and production SaaS applications for commercial clients worldwide.')}
            </motion.p>
          </div>
        </div>

        {/* Action CTAs */}
        <motion.div
          variants={revealItem}
          className="flex flex-wrap items-center gap-4 mt-4"
        >
          {/* Primary CTA with Signal Ice Gradient Highlight */}
          <button
            onClick={() => scrollToSection('systems')}
            className="group relative inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-mono text-sm font-bold text-[#060810] bg-gradient-to-r from-[#67E8F9] via-[#86EFAC] to-[#A5F3FC] hover:brightness-110 transition-all duration-300 shadow-[0_0_25px_rgba(103,232,249,0.4)] hover:shadow-[0_0_35px_rgba(165,243,252,0.7)] active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#060810]" />
              [ {t('hero.view_projects', 'Explore Systems')} ]
            </span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => scrollToSection('ai-assistant')}
            className="group relative inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-mono text-sm font-semibold text-[#EF4444] bg-[#0C1018]/90 border border-[#EF4444]/50 hover:border-[#EF4444] transition-all duration-300 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#EF4444] animate-pulse" />
              [ {t('ai.title', 'Talk to my AI')} ]
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Infinite Horizontal Stock Ticker Marquee Strip */}
      <div className="relative z-10 w-full overflow-hidden border-t border-b border-[#141B26] bg-[#0C1018]/70 backdrop-blur-md py-2.5 mt-8">
        <div className="flex items-center space-x-8 animate-[marquee_25s_linear_infinite] whitespace-nowrap text-xs font-mono text-[#67E8F9]/70 tracking-widest uppercase">
          {Array.from({ length: 3 }).map((_, i) => (
            <React.Fragment key={i}>
              {TICKER_ITEMS.map((item, idx) => (
                <span key={idx} className="flex items-center gap-3">
                  <span className="text-[#A5F3FC] font-bold">◆</span>
                  <span>{item}</span>
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
