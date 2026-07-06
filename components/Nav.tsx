"use client";

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Printer, Keyboard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Nav() {
  const { language, toggleLanguage, isRtl, dict, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Same hydration-safety fix as LanguageContext: start deterministic ("dark",
  // matching what the server renders), then sync the real saved preference
  // in an effect after mount instead of during the initializer.
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setTheme('light');
    }
  }, []);

  const navItems = [
    { label: dict.nav.home, id: 'home' },
    { label: dict.nav.services, id: 'services' },
    { label: dict.nav.projects, id: 'projects' },
    { label: dict.nav.skills, id: 'skills' },
    { label: dict.nav.experience, id: 'experience' },
    { label: dict.nav.education, id: 'education' },
    { label: dict.nav.contact, id: 'contact' },
  ];

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [language]); // Re-register on language change since labels change but IDs stay same

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <nav
        id="nav-desktop"
        className={`hidden md:flex flex-col justify-between fixed top-0 ${
          isRtl ? 'right-0 border-l border-r-0 left-auto' : 'left-0 border-r border-l-0 right-auto'
        } w-[180px] h-screen bg-bg border-border z-40 p-5 select-none font-mono overflow-y-auto overscroll-contain gap-4`}
      >
        {/* Top: Logo */}
        <div className="flex flex-col shrink-0">
          <button 
            onClick={() => handleScrollTo('home')} 
            className={`text-left ${isRtl ? 'text-right' : 'text-left'} group cursor-pointer focus:outline-none`}
          >
            <span className="text-[14px] font-bold tracking-tight text-text-1 group-hover:text-accent transition-colors">
              {isRtl ? 'ع.ديف' : 'A.dev'}
            </span>
            <span className="block text-[9px] text-text-3 font-semibold tracking-wider uppercase">
              {isRtl ? 'عبدالغني' : 'ABDULGENI'}
            </span>
          </button>
        </div>

        {/* Middle: Links */}
        <div className="flex flex-col space-y-3 shrink-0">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`text-[10px] font-medium tracking-wider py-0.5 border-y-0 transition-all cursor-pointer focus:outline-none ${
                  isRtl 
                    ? `text-right pr-2 pl-0 border-r-2 border-l-0 ${isActive ? 'border-accent text-accent' : 'border-transparent text-text-3 hover:text-text-2'}` 
                    : `text-left pl-2 pr-0 border-l-2 border-r-0 ${isActive ? 'border-accent text-accent' : 'border-transparent text-text-3 hover:text-text-2'}`
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Bottom: Status, Theme, Lang & Socials */}
        <div className="flex flex-col space-y-3 shrink-0">
          {/* Print CV Button */}
          <div className="flex flex-col space-y-1">
            <span className="text-[8px] text-text-3 font-bold uppercase tracking-wider">[ {t('ui.recruiterUtility')} ]</span>
            <button
              onClick={() => window.print()}
              className={`flex items-center justify-between gap-2 border border-border bg-surface hover:border-accent hover:text-accent px-2.5 py-1.5 rounded-lg text-[9px] text-text-2 transition-all cursor-pointer font-semibold uppercase tracking-normal w-full max-w-full overflow-hidden ${isRtl ? 'text-right' : 'text-left'} outline-none group`}
              title="Print clean PDF Resume/Portfolio"
            >
              <span className={`truncate min-w-0 flex-1 ${isRtl ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} transition-transform duration-150`}>
                {t('ui.printCv')}
              </span>
              <span className="text-accent group-hover:scale-110 transition-transform duration-150 shrink-0">
                <Printer size={11} />
              </span>
            </button>
          </div>

          {/* Keyboard Shortcuts Button */}
          <div className="flex flex-col space-y-1">
            <span className="text-[8px] text-text-3 font-bold uppercase tracking-wider">[ {t('ui.systemControls')} ]</span>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-shortcuts-help'))}
              className={`flex items-center justify-between gap-2 border border-border bg-surface hover:border-accent hover:text-accent px-2.5 py-1.5 rounded-lg text-[9px] text-text-2 transition-all cursor-pointer font-semibold uppercase tracking-normal w-full max-w-full overflow-hidden ${isRtl ? 'text-right' : 'text-left'} outline-none group`}
              title="Keyboard Shortcuts Menu (?)"
            >
              <span className={`truncate min-w-0 flex-1 ${isRtl ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} transition-transform duration-150`}>
                {t('ui.hotkeys')}
              </span>
              <span className="text-accent group-hover:scale-110 transition-transform duration-150 shrink-0">
                <Keyboard size={11} />
              </span>
            </button>
          </div>

          {/* Language Switcher Button */}
          <div className="flex flex-col space-y-1">
            <span className="text-[8px] text-text-3 font-bold uppercase tracking-wider">
              [ {language === 'en' ? 'SYSTEM_LANG' : 'لغة_النظام'} ]
            </span>
            <button
              onClick={toggleLanguage}
              className={`flex items-center justify-between gap-2 border border-border bg-surface hover:border-accent hover:text-accent px-2.5 py-1.5 rounded-lg text-[9px] text-text-2 transition-all cursor-pointer font-semibold uppercase tracking-normal w-full max-w-full overflow-hidden ${isRtl ? 'text-right' : 'text-left'} outline-none group`}
              title="Toggle language"
            >
              <span className={`truncate min-w-0 flex-1 ${isRtl ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} transition-transform duration-150`}>
                {language === 'en' ? 'ENGLISH_SYS' : 'العربية_SYS'}
              </span>
              <span className="text-accent font-mono text-[9px] font-bold shrink-0">
                {language === 'en' ? 'EN' : 'AR'}
              </span>
            </button>
          </div>

          {/* Theme Switcher Button */}
          <div className="flex flex-col space-y-1">
            <span className="text-[8px] text-text-3 font-bold uppercase tracking-wider">[ {t('ui.systemDesign')} ]</span>
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-between gap-2 border border-border bg-surface hover:border-accent hover:text-accent px-2.5 py-1.5 rounded-lg text-[9px] text-text-2 transition-all cursor-pointer font-semibold uppercase tracking-normal w-full max-w-full overflow-hidden ${isRtl ? 'text-right' : 'text-left'} outline-none group`}
            >
              <span className={`truncate min-w-0 flex-1 ${isRtl ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} transition-transform duration-150`}>
                {theme === 'dark' ? t('ui.darkSys') : t('ui.lightSys')}
              </span>
              <span className="text-accent shrink-0">
                {theme === 'dark' ? <Sun size={11} className="animate-pulse" /> : <Moon size={11} />}
              </span>
            </button>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[8px] text-text-2 tracking-wide font-semibold uppercase">{t('ui.availableHire')}</span>
          </div>

          {/* Socials */}
          <div className="flex items-center space-x-3">
            <a 
              href="https://github.com/Abdulgeni" 
              target="_blank" 
              rel="noreferrer" 
              className="text-text-3 hover:text-accent transition-colors"
              title="GitHub"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/abdulgeni-abdulaziz-7bb360401" 
              target="_blank" 
              rel="noreferrer" 
              className="text-text-3 hover:text-accent transition-colors"
              title="LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* MOBILE TOP BAR */}
      <nav id="nav-mobile" className="md:hidden flex items-center justify-between fixed top-0 left-0 w-full h-12 bg-bg border-b border-border z-40 px-4 font-mono select-none">
        <button 
          onClick={() => handleScrollTo('home')} 
          className="flex items-center space-x-1 cursor-pointer focus:outline-none"
        >
          <span className="text-[14px] font-bold text-text-1">{isRtl ? 'ع.ديف' : 'A.dev'}</span>
        </button>

        <div className="flex items-center space-x-2">
          {/* Mobile Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 border border-border bg-surface text-text-2 hover:text-accent rounded-xl focus:outline-none cursor-pointer flex items-center justify-center text-[9px] font-bold tracking-tight transition-all duration-150 h-7 w-8"
            aria-label="Toggle language"
            title="Switch Language"
          >
            {language === 'en' ? 'AR' : 'EN'}
          </button>

          {/* Mobile Keyboard Shortcuts */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-shortcuts-help'))}
            className="p-1.5 border border-border bg-surface text-text-2 hover:text-accent rounded-xl focus:outline-none cursor-pointer flex items-center justify-center h-7 w-7 transition-all duration-150"
            aria-label="Toggle system keyboard shortcuts console"
            title="Keyboard Shortcuts Menu (?)"
          >
            <Keyboard size={12} className="text-accent" />
          </button>

          {/* Mobile Print Button */}
          <button
            onClick={() => window.print()}
            className="p-1.5 border border-border bg-surface text-text-2 hover:text-accent rounded-xl focus:outline-none cursor-pointer flex items-center justify-center h-7 w-7 transition-all duration-150"
            aria-label="Print portfolio resume"
            title="Print Portfolio"
          >
            <Printer size={12} className="text-accent" />
          </button>

          {/* Mobile Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-1.5 border border-border bg-surface text-text-2 hover:text-accent rounded-xl focus:outline-none cursor-pointer flex items-center justify-center h-7 w-7 transition-all duration-150"
            aria-label="Toggle system style theme"
          >
            {theme === 'dark' ? <Sun size={12} className="text-amber-500" /> : <Moon size={12} className="text-indigo-500" />}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col justify-center items-end space-y-1 w-6 h-6 focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span className={`h-[1px] bg-text-1 transition-all duration-200 ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-1' : 'w-6'}`}></span>
            <span className={`h-[1px] bg-text-1 transition-all duration-200 ${mobileMenuOpen ? 'w-0 opacity-0' : 'w-4'}`}></span>
            <span className={`h-[1px] bg-text-1 transition-all duration-200 ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-1' : 'w-5'}`}></span>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-12 left-0 w-full bg-bg border-b border-border flex flex-col p-4 space-y-3 z-40">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`text-[11px] font-medium tracking-wider py-1 pl-3 transition-all ${
                    isRtl 
                      ? `text-right pr-3 pl-0 border-r-2 border-l-0 ${isActive ? 'border-accent text-accent' : 'border-transparent text-text-3'}` 
                      : `text-left pl-3 pr-0 border-l-2 border-r-0 ${isActive ? 'border-accent text-accent' : 'border-transparent text-text-3'}`
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
}
