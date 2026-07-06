"use client";

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { isRtl, t } = useLanguage();

  return (
    <footer className="border-t border-border bg-bg py-8 font-mono select-none">
      <div className={`max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
        
        {/* Left copyright */}
        <div className={`text-[9px] text-text-3 font-semibold tracking-wider uppercase text-center ${isRtl ? 'md:text-right' : 'md:text-left'}`}>
          © 2026 {isRtl ? 'عبدالغني عبدالعزيز.' : 'ABDULGENI ABDULAZIZ.'} {t('ui.copyright')}
        </div>

        {/* Center credits */}
        <div className="text-[9px] text-text-3 font-semibold tracking-wider uppercase text-center">
          {t('ui.credits')}
        </div>

        {/* Right socials */}
        <div className={`flex items-center ${isRtl ? 'space-x-reverse space-x-5' : 'space-x-5'}`}>
          <a
            href="https://github.com/Abdulgeni"
            target="_blank"
            rel="noreferrer"
            className="text-text-3 hover:text-accent transition-colors"
            title="GitHub"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/abdulgeni-abdulaziz-7bb360401"
            target="_blank"
            rel="noreferrer"
            className="text-text-3 hover:text-accent transition-colors"
            title="LinkedIn"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>

      </div>
    </footer>
  );
}
