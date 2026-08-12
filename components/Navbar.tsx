'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Bot, Menu, X, Cpu, Layers, Briefcase, Mail, Github, Activity, Sun, Moon, MessageSquareQuote } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import { useLanguage } from '@/lib/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const NAV_ITEMS = [
  { id: 'hero', label: '// Home', icon: Terminal },
  { id: 'ai-assistant', label: '// AI Assistant', icon: Bot, color: '#67E8F9' },
  { id: 'architecture', label: '// Architecture', icon: Layers, color: '#67E8F9' },
  { id: 'system-health', label: '// Health', icon: Activity, color: '#4ADE80' },
  { id: 'systems', label: '// Systems', icon: Cpu, color: '#A5F3FC' },
  { id: 'github-stats', label: '// Stats', icon: Github, color: '#67E8F9' },
  { id: 'experience', label: '// Log', icon: Briefcase, color: '#67E8F9' },
  { id: 'testimonials', label: '// Feedback', icon: MessageSquareQuote, color: '#67E8F9' },
  { id: 'contact', label: '[ Contact ]', icon: Mail, color: '#EEF2F7', isButton: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section Intersection logic
      const sectionIds = ['hero', 'ai-assistant', 'architecture', 'system-health', 'systems', 'github-stats', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060810]/90 backdrop-blur-md border-b border-[#141B26] py-3 shadow-[0_4px_25px_rgba(0,0,0,0.85)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Brand */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 group focus:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg border border-[#67E8F9] bg-[#0C1018] shadow-[0_0_12px_rgba(103,232,249,0.3)] flex items-center justify-center text-[#67E8F9] group-hover:scale-105 group-hover:border-[#A5F3FC] transition-transform">
            <Terminal className="w-4 h-4 text-[#67E8F9]" />
          </div>
          <div className="text-left font-mono text-xs">
            <span className="font-bold text-[#EEF2F7] tracking-wider group-hover:text-[#A5F3FC] transition-colors">
              ABDULGENI
            </span>
          </div>
        </button>

        {/* Desktop Nav Links with Dynamic Indicator Bar */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0C1018]/90 p-1.5 rounded-full border border-white/10 backdrop-blur-md font-mono text-xs relative">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            if (item.isButton) {
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[#060810] font-bold bg-gradient-to-r from-[#67E8F9] to-[#A5F3FC] hover:from-[#38BDF8] hover:to-[#67E8F9] transition-all shadow-[0_0_15px_rgba(103,232,249,0.4)] hover:shadow-[0_0_22px_rgba(103,232,249,0.6)]"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
                  isActive ? 'text-[#EEF2F7] font-semibold' : 'text-[#8B96A8] hover:text-[#EEF2F7]'
                }`}
              >
                {/* Active Indicator Highlight Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-[#141B26] border border-[#67E8F9]/50 rounded-full shadow-[0_0_12px_rgba(103,232,249,0.3)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{ color: isActive ? item.color || '#67E8F9' : undefined }}
                  />
                  <span>{item.label}</span>
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Group: Language Switcher, Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Language Switcher Dropdown */}
          <LanguageSwitcher />

          {/* Day/Night Theme Switcher Button (Small Icon Only) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0C1018]/90 border border-[#67E8F9]/40 text-[#EEF2F7] hover:border-[#67E8F9] hover:bg-[#141B26] transition-all shadow-[0_0_15px_rgba(103,232,249,0.15)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#67E8F9]"
            title={`Switch to ${theme === 'dark' ? 'Day Theme' : 'Night Theme'} (Shortcut: T)`}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.div
                  key="dark"
                  initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-4 h-4 text-[#EAB308] animate-spin-slow" />
                </motion.div>
              ) : (
                <motion.div
                  key="light"
                  initial={{ rotate: 90, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-4 h-4 text-[#0284C7]" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-[#0C1018]/90 border border-[#67E8F9]/30 text-[#8B96A8] hover:text-[#EEF2F7] hover:border-[#67E8F9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#67E8F9] shadow-[0_0_12px_rgba(103,232,249,0.2)] transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5 text-[#67E8F9]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5 text-[#67E8F9]" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation with Glacial Theme & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[65px] bg-[#060810]/80 backdrop-blur-sm z-40 md:hidden"
              aria-hidden="true"
            />

            {/* Mobile Navigation Panel */}
            <motion.div
              id="mobile-navigation-menu"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="relative z-50 md:hidden bg-[#0C1018]/95 backdrop-blur-xl border-b border-[#67E8F9]/20 px-4 sm:px-6 py-5 font-mono text-xs shadow-[0_10px_30px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#8B96A8] uppercase tracking-wider pb-3 mb-3 border-b border-[#141B26]">
                <span className="flex items-center gap-1.5 text-[#67E8F9] font-bold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{'// Navigation Kernel'}</span>
                </span>
                
                {/* Mobile Drawer Theme Quick Switcher */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#141B26] border border-[#67E8F9]/40 text-[#EEF2F7] cursor-pointer"
                  aria-label="Toggle theme"
                  title="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-[#EAB308]" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#0284C7]" />
                  )}
                </button>
              </div>

              <nav className="flex flex-col space-y-2 max-h-[calc(100vh-160px)] overflow-y-auto overscroll-contain pr-1" aria-label="Mobile Navigation">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;

                  if (item.isButton) {
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className="w-full mt-3 min-h-[44px] py-3 px-4 rounded-xl bg-gradient-to-r from-[#67E8F9] to-[#A5F3FC] text-[#060810] font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(103,232,249,0.4)] hover:shadow-[0_0_25px_rgba(103,232,249,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#67E8F9] transition-all cursor-pointer text-xs"
                      >
                        <Icon className="w-4 h-4" />
                        <span>[ Contact Abdulgeni ]</span>
                      </button>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`w-full min-h-[44px] text-left py-2.5 px-3.5 rounded-xl flex items-center justify-between transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#67E8F9] ${
                        isActive
                          ? 'bg-[#141B26] border border-[#67E8F9]/50 text-[#EEF2F7] font-semibold shadow-[0_0_12px_rgba(103,232,249,0.2)]'
                          : 'text-[#8B96A8] hover:text-[#EEF2F7] hover:bg-[#141B26]/50'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 shrink-0" style={{ color: item.color || '#67E8F9' }} />
                        <span>{item.label}</span>
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#67E8F9] shadow-[0_0_8px_#67E8F9]" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
