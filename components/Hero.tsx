"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const phrasesEn = [
  "RAG Systems Architect",
  "Workflow Automation Expert",
  "Full Stack AI Engineer",
  "Building AI at the edge of what's possible"
];

const phrasesAr = [
  "مهندس أنظمة RAG",
  "خبير أتمتة سير العمل",
  "مهندس ذكاء اصطناعي متكامل",
  "بناء ذكاء اصطناعي يفوق التوقعات"
];

export default function Hero() {
  const { language, dict, isRtl, t } = useLanguage();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedPhrase, setTypedPhrase] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [githubStats, setGithubStats] = useState({ repos: 15, weeklyCommits: 24 });
  const [consoleProgress, setConsoleProgress] = useState(0);

  const phrases = isRtl ? phrasesAr : phrasesEn;
  const fullName = dict.personal.name;

  // 1. Live GitHub stats fetch with automatic retries
  useEffect(() => {
    let active = true;
    let retries = 3;
    const delayMs = 2000;

    const loadStats = () => {
      fetch('/api/github')
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          if (!active) return;
          if (data && typeof data.repos === 'number') {
            setGithubStats({ repos: data.repos, weeklyCommits: data.weeklyCommits });
          }
        })
        .catch((err) => {
          if (!active) return;
          if (retries > 0) {
            retries--;
            setTimeout(loadStats, delayMs);
          } else {
            console.error('Error fetching live github data:', err);
          }
        });
    };

    loadStats();

    return () => {
      active = false;
    };
  }, []);

  // 2. Name reveal: the animation is now a pure CSS clip-path wipe (see
  // .name-reveal-ltr / .name-reveal-rtl in globals.css), keyed by `language`
  // below so it replays cleanly on language switch. No JS string-building
  // here anymore — that was breaking Arabic letter shaping mid-animation.

  // 3. Subtitle Cycling Phrase Typewriter
  useEffect(() => {
    const currentText = phrases[phraseIndex] || '';
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      // Deleting mode
      timer = setTimeout(() => {
        setTypedPhrase((prev) => prev.slice(0, -1));
      }, 30); // 30ms per char delete
    } else {
      // Typing mode
      timer = setTimeout(() => {
        setTypedPhrase((prev) => currentText.slice(0, prev.length + 1));
      }, 60); // 60ms per char type
    }

    // Logic for transition states
    if (!isDeleting && typedPhrase === currentText) {
      // Pause when fully typed
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000); // Pause for 2s
    } else if (isDeleting && typedPhrase === '') {
      // Switch phrase when fully deleted
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      // Small pause before typing next
      timer = setTimeout(() => {}, 300);
    }

    return () => clearTimeout(timer);
  }, [typedPhrase, isDeleting, phraseIndex, language]);

  // Reset phrase index on language change to prevent out of bounds or desync
  useEffect(() => {
    setPhraseIndex(0);
    setTypedPhrase('');
    setIsDeleting(false);
  }, [language]);

  // 4. Console Line-by-Line Typewriter progress
  useEffect(() => {
    setConsoleProgress(0);
    const interval = setInterval(() => {
      setConsoleProgress((prev) => {
        if (prev < 14) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 80); // 80ms between lines

    return () => clearInterval(interval);
  }, [language]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Terminal Lines
  const terminalLines = [
    { text: isRtl ? "$ حالة_النظام.الحالية()" : "$ system.status()", color: "text-text-3" },
    { text: "", color: "" },
    { text: `> ${t('ui.terminalName')}: '${dict.personal.name}'`, color: "text-text-2" },
    { text: `> ${t('ui.terminalLocation')}: '${dict.personal.location}'`, color: "text-text-2" },
    { text: `> status: '${t('ui.terminalStatusVal')}'`, color: "text-emerald-400 font-semibold" },
    { text: isRtl ? "> متاح_لـ: ['عن بعد', 'عقود', 'بالساعة']" : "> open_to: ['remote', 'contract', 'hourly']", color: "text-text-2" },
    { text: "> languages: ['EN', 'AR', 'TR', 'AM', 'OM']", color: "text-text-2" },
    { text: "", color: "" },
    { text: isRtl ? "$ إحصاءات_جيت_هاب()" : "$ github.stats()", color: "text-text-3" },
    { text: `> repos: [${githubStats.repos}]`, color: "text-text-2" },
    { text: `> this_week: [${githubStats.weeklyCommits} commits]`, color: "text-text-2" },
    { text: "", color: "" },
    { text: isRtl ? "$ اللغات_الأساسية()" : "$ stack.primary()", color: "text-text-3" },
    { text: "> ['Python', 'TypeScript', 'LangChain']", color: "text-accent" },
  ];

  return (
    <section id="home" className="pt-20 md:pt-0 min-h-screen flex items-center bg-bg relative">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left Column (60%) */}
        <div className="md:col-span-7 flex flex-col space-y-6">
          <div className="text-[10px] font-mono tracking-[0.2em] text-text-3 font-semibold uppercase">
            [ {isRtl ? 'مهندس ذكاء اصطناعي متكامل' : 'FULL STACK AI ENGINEER'} ]
          </div>
          
          <h1
            key={language}
            className={`text-[36px] md:text-[56px] font-bold font-space text-text-1 tracking-tight leading-none select-none ${
              isRtl ? "name-reveal-rtl" : "name-reveal-ltr"
            }`}
          >
            {fullName}
          </h1>

          <div className="h-[30px] flex items-center font-mono text-[16px] md:text-[18px] text-accent select-none font-semibold">
            <span>{typedPhrase}</span>
            <span className="text-accent cursor-blink">|</span>
          </div>

          <p className="font-sans text-[14px] text-text-2 leading-relaxed max-w-[520px]">
            {dict.personal.summary}
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-4 border border-border bg-surface rounded-2xl p-4 select-none gap-2 shadow-sm">
            <div className={`flex flex-col ${isRtl ? 'pl-2' : 'pr-2'}`}>
              <span className="font-space font-bold text-[24px] md:text-[28px] text-text-1">15+</span>
              <span className="font-mono text-[9px] text-text-3 font-semibold tracking-wider uppercase">
                {isRtl ? 'أنظمة تم شحنها' : 'SYSTEMS SHIPPED'}
              </span>
            </div>
            <div className={`flex flex-col border-border ${isRtl ? 'border-r pr-4 pl-2' : 'border-l pl-4 pr-2'}`}>
              <span className="font-space font-bold text-[24px] md:text-[28px] text-text-1">9</span>
              <span className="font-mono text-[9px] text-text-3 font-semibold tracking-wider uppercase">
                {isRtl ? 'تطبيقات RAG' : 'RAG APPS'}
              </span>
            </div>
            <div className={`flex flex-col border-border ${isRtl ? 'border-r pr-4 pl-2' : 'border-l pl-4 pr-2'}`}>
              <span className="font-space font-bold text-[24px] md:text-[28px] text-text-1">5</span>
              <span className="font-mono text-[9px] text-text-3 font-semibold tracking-wider uppercase">
                {isRtl ? 'لغات متقنة' : 'LANGUAGES'}
              </span>
            </div>
            <div className={`flex flex-col border-border ${isRtl ? 'border-r pr-4 pl-2' : 'border-l pl-4 pr-2'}`}>
              <span className="font-space font-bold text-[24px] md:text-[28px] text-text-1">2024</span>
              <span className="font-mono text-[9px] text-text-3 font-semibold tracking-wider uppercase">
                {isRtl ? 'منذ عام' : 'SINCE'}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4 pt-2 font-mono">
            <button
              onClick={() => handleScrollTo('projects')}
              className="px-6 py-[10px] text-[11px] font-semibold border border-accent text-accent hover:bg-accent hover:text-bg transition-all duration-150 rounded-xl cursor-pointer"
            >
              [ {t('ui.viewProjects')} ]
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="px-6 py-[10px] text-[11px] font-semibold border border-border text-text-2 hover:border-text-2 hover:text-text-1 transition-all duration-150 rounded-xl cursor-pointer"
            >
              [ {t('ui.contactMe')} ]
            </button>
          </div>
        </div>

        {/* Right Column (40%) */}
        <div className="md:col-span-5 flex flex-col justify-center">
          <div className="border border-border bg-surface p-4 pb-5 rounded-2xl font-mono text-[12px] h-[365px] overflow-hidden select-none relative shadow-xl bento-card">
            {/* Terminal Head Bar */}
            <div className={`absolute top-3 ${isRtl ? 'left-4' : 'right-4'} text-[9px] text-text-3 uppercase tracking-wider font-semibold`}>
              system_diagnostics.log
            </div>
            
            <div className="flex flex-col space-y-[4px] pt-6">
              {terminalLines.slice(0, consoleProgress).map((line, idx) => (
                <div key={idx} className={`leading-normal ${line.color}`}>
                  {line.text === "" ? "\u00A0" : line.text}
                </div>
              ))}
              {consoleProgress < 14 && (
                <div className="text-accent cursor-blink font-semibold">_</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
