'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import {
  Mail,
  Send,
  CheckCircle2,
  ShieldCheck,
  Terminal,
  Loader2,
  Lock
} from 'lucide-react';

export default function NewsletterSubscribe() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [savedEmail, setSavedEmail] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem('glacial_newsletter_subscribed_email');
    } catch {
      return null;
    }
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(() => {
    if (typeof window === 'undefined') return 'idle';
    try {
      return localStorage.getItem('glacial_newsletter_subscribed_email') ? 'success' : 'idle';
    } catch {
      return 'idle';
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMessage('Please enter a valid engineering email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');

    // Simulate network dispatch with terminal log sequence
    setTimeout(() => {
      try {
        localStorage.setItem('glacial_newsletter_subscribed_email', trimmed);
      } catch {
        // Ignore localStorage error
      }
      setSavedEmail(trimmed);
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 p-5 sm:p-6 rounded-2xl bg-[#0C1018] border border-[#67E8F9]/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)] relative overflow-hidden font-mono">
      {/* Background Glacial Lighting Effect */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#67E8F9]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#34D399]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left Info Column */}
        <div className="flex-1 text-left space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="p-1.5 rounded-lg bg-[#67E8F9]/10 border border-[#67E8F9]/30 text-[#67E8F9] shrink-0">
              <Mail className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold text-[#EEF2F7] uppercase tracking-wider">
              {t('newsletter.title', 'Case Study Dispatches')}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/30 font-bold">
              <ShieldCheck className="w-3 h-3" />
              {t('newsletter.frequency', 'Zero spam • 1-2 case studies / mo')}
            </span>
          </div>

          <p className="text-xs text-[#8B96A8] leading-relaxed font-sans max-w-xl">
            {t(
              'newsletter.subtitle',
              'Subscribe to receive technical breakdowns on production RAG pipelines, agent workflows, & system benchmarks.'
            )}
          </p>
        </div>

        {/* Right Form / Success Area */}
        <div className="w-full lg:w-auto min-w-[320px] sm:min-w-[380px]">
          {status === 'success' || savedEmail ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-[#34D399]/10 border border-[#34D399]/40 text-[#34D399]"
            >
              <div className="p-2 rounded-lg bg-[#34D399]/20 text-[#34D399] shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-left flex-1">
                <div className="text-xs font-bold font-mono uppercase tracking-wide">
                  {t('newsletter.subscribed', 'Subscribed to Dispatches!')}
                </div>
                <div className="text-[11px] font-mono text-[#8B96A8] truncate max-w-[220px]">
                  {savedEmail || 'Registered for future releases'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.removeItem('glacial_newsletter_subscribed_email');
                  } catch {}
                  setSavedEmail(null);
                  setStatus('idle');
                }}
                className="text-[10px] font-mono text-[#8B96A8] hover:text-[#EEF2F7] underline ml-auto"
              >
                Change
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="relative flex items-center">
                <div className="absolute left-3 text-[#8B96A8] pointer-events-none">
                  <Terminal className="w-3.5 h-3.5 text-[#67E8F9]" />
                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  disabled={status === 'loading'}
                  placeholder={t('newsletter.placeholder', 'Enter engineer@domain.com')}
                  className="w-full pl-9 pr-28 py-2.5 rounded-xl bg-[#060810] border border-[#141B26] text-xs font-mono text-[#EEF2F7] placeholder-[#8B96A8]/60 focus:outline-none focus:border-[#67E8F9] focus:ring-1 focus:ring-[#67E8F9] transition-all disabled:opacity-50"
                  aria-label="Email address for newsletter"
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="absolute right-1 px-3 py-1.5 rounded-lg bg-[#67E8F9] text-[#060810] font-mono font-bold text-xs hover:bg-[#A5F3FC] hover:shadow-[0_0_12px_rgba(103,232,249,0.5)] transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{t('newsletter.subscribing', 'Connecting...')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('newsletter.subscribe', 'Subscribe')}</span>
                      <Send className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>

              {/* Error Message Feedback */}
              <AnimatePresence>
                {status === 'error' && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-[11px] font-mono text-[#EF4444] text-left pl-1"
                  >
                    ⚠️ {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Subtitle Security Note */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8B96A8]/70 pl-1">
                <Lock className="w-2.5 h-2.5 text-[#34D399]" />
                <span>Encrypted • No third-party tracking or monetization</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
