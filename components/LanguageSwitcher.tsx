'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, LANGUAGES, Language } from '@/lib/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage, currentLanguageInfo } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-50">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-[#0C1018]/90 border border-[#67E8F9]/40 text-xs font-mono text-[#EEF2F7] hover:border-[#67E8F9] hover:bg-[#141B26] transition-all cursor-pointer shadow-[0_0_15px_rgba(103,232,249,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#67E8F9]"
        aria-label="Select Language"
      >
        <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#141B26]">
          <Globe className="w-3.5 h-3.5 text-[#67E8F9]" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 border border-[#0C1018]" />
        </span>
        <span className="font-semibold">{currentLanguageInfo.code.toUpperCase()}</span>
        <ChevronDown className={`w-3 h-3 text-[#8B96A8] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 ltr:right-0 rtl:left-0 rtl:right-auto mt-2 w-44 rounded-2xl bg-[#0C1018] border border-white/15 p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden z-50"
          >
            <div className="px-2.5 py-1.5 text-[10px] font-mono font-bold text-[#8B96A8] uppercase tracking-wider border-b border-white/10 mb-1">
              Select Language
            </div>

            <div className="flex flex-col gap-0.5">
              {LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;

                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code as Language);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all w-full text-left ltr:text-left rtl:text-right cursor-pointer ${
                      isSelected
                        ? 'bg-[#67E8F9]/15 text-[#67E8F9] font-bold border border-[#67E8F9]/30'
                        : 'text-[#EEF2F7] hover:bg-white/5 hover:text-[#67E8F9]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{lang.flag}</span>
                      <div className="flex flex-col">
                        <span>{lang.nativeName}</span>
                        <span className="text-[10px] text-[#8B96A8] font-normal">{lang.name}</span>
                      </div>
                    </div>

                    {isSelected && <Check className="w-3.5 h-3.5 text-[#67E8F9] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}