'use client';

import React from 'react';
import { PERSONAL_DATA } from '@/lib/data';
import { Terminal, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import NewsletterSubscribe from '@/components/NewsletterSubscribe';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#141B26] bg-[#060810] py-12 px-4 sm:px-6 lg:px-8 relative z-10 font-mono text-xs text-[#8B96A8]">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Subscription Component */}
        <NewsletterSubscribe />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
          {/* Left Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md border border-[#67E8F9] shadow-[0_0_8px_rgba(103,232,249,0.3)] shrink-0 bg-[#0C1018] flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-[#67E8F9]" />
              </div>
              <span className="text-[#EEF2F7] font-black tracking-wide">ABDULGENI ABDULAZIZ</span>
            </div>
            <span className="hidden sm:inline text-[#4A5262]">|</span>
            <span className="text-[#8B96A8]">Full Stack AI Engineer · Addis Ababa</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0C1018] border border-white/5 text-[#8B96A8] hover:text-[#67E8F9] hover:border-[#67E8F9]/50 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0C1018] border border-white/5 text-[#8B96A8] hover:text-[#67E8F9] hover:border-[#67E8F9]/50 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_DATA.email}`}
              className="p-2 rounded-lg bg-[#0C1018] border border-white/5 text-[#8B96A8] hover:text-[#67E8F9] hover:border-[#67E8F9]/50 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#141B26] border border-[#67E8F9]/40 text-[#67E8F9] hover:text-[#060810] hover:bg-[#67E8F9] transition-all ml-2 shadow-[0_0_10px_rgba(103,232,249,0.2)]"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#141B26] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#4A5262] gap-2">
        <div>
          © {new Date().getFullYear()} Abdulgeni Abdulaziz. All systems operational.
        </div>
        <div className="flex items-center gap-3">
          <span>LATENCY: 14ms</span>
          <span>·</span>
          <span>STATUS: 100% HEALTH</span>
        </div>
      </div>
    </footer>
  );
}
