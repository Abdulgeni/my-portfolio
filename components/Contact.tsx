"use client";

import React, { useState } from 'react';
import { PERSONAL_INFO } from '../lib/data';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { isRtl, t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError(t('ui.allFieldsRequired') || 'ALL FIELDS ARE REQUIRED');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await res.json();
        setError(data.error || 'TRANSMISSION FAILURE');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setError('NETWORK OFFLINE');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-bg">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-12 font-mono">
          <span className="text-[10px] text-text-3 font-semibold tracking-widest uppercase">
            [ {t('ui.contactHeaderLabel') || '06 / INITIALIZE CONTACT'} ]
          </span>
          <h2 className="text-[20px] font-bold font-space text-text-1 mt-2 tracking-tight uppercase">
            {t('ui.contactHeaderTitle') || 'ESTABLISH COMMUNICATION'}
          </h2>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact details (5 cols) */}
          <div className="md:col-span-5 flex flex-col space-y-6 select-none">
            <h3 className={`font-space font-bold text-[24px] md:text-[28px] text-text-1 tracking-tight leading-snug ${isRtl ? 'text-right' : 'text-left'}`}>
              {t('ui.letsBuildSomething')}
            </h3>
            <p className={`font-sans text-[14px] text-text-2 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
              {t('ui.contactDescription')}
            </p>

            {/* Stacked contact items */}
            <div className="flex flex-col space-y-4 pt-4 font-mono text-[11px]">
              
              <div className={`flex items-center group ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className={`text-text-3 font-semibold tracking-wide w-[90px] uppercase shrink-0 ${isRtl ? 'text-right' : 'text-left'}`}>
                  [ {t('ui.emailLabel')} ]
                </span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-text-2 group-hover:text-text-1 hover:text-accent transition-colors duration-100"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              <div className={`flex items-center group ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className={`text-text-3 font-semibold tracking-wide w-[90px] uppercase shrink-0 ${isRtl ? 'text-right' : 'text-left'}`}>
                  [ {t('ui.phoneLabel')} ]
                </span>
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, '')}`}
                  className="text-text-2 group-hover:text-text-1 hover:text-accent transition-colors duration-100"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>

              <div className={`flex items-center group ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className={`text-text-3 font-semibold tracking-wide w-[90px] uppercase shrink-0 ${isRtl ? 'text-right' : 'text-left'}`}>
                  [ {t('ui.githubLabel')} ]
                </span>
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-text-2 group-hover:text-text-1 hover:text-accent transition-colors duration-100"
                >
                  github.com/{PERSONAL_INFO.githubUsername}
                </a>
              </div>

              <div className={`flex items-center group ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className={`text-text-3 font-semibold tracking-wide w-[90px] uppercase shrink-0 ${isRtl ? 'text-right' : 'text-left'}`}>
                  [ {t('ui.linkedinLabel')} ]
                </span>
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-text-2 group-hover:text-text-1 hover:text-accent transition-colors duration-100"
                >
                  abdulgeni-abdulaziz
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Contact form (7 cols) */}
          <div className="md:col-span-7 bg-surface border border-border p-6 md:p-8 rounded-2xl bento-card shadow-sm">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
              
              {/* Name Field */}
              <div className="flex flex-col space-y-1 font-mono">
                <label htmlFor="name" className={`text-[9px] text-text-3 font-semibold uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t('ui.nameLabel')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={submitting || success}
                  className={`w-full border border-border bg-slate-900/50 p-[12px] text-text-1 text-[12px] rounded-xl focus:outline-none focus:border-accent transition-colors duration-150 ${isRtl ? 'text-right' : 'text-left'}`}
                  placeholder={t('ui.inputIdentifier')}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col space-y-1 font-mono">
                <label htmlFor="email" className={`text-[9px] text-text-3 font-semibold uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t('ui.emailFormLabel')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={submitting || success}
                  className={`w-full border border-border bg-slate-900/50 p-[12px] text-text-1 text-[12px] rounded-xl focus:outline-none focus:border-accent transition-colors duration-150 ${isRtl ? 'text-right' : 'text-left'}`}
                  placeholder={t('ui.inputRoutingAddress')}
                  required
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col space-y-1 font-mono">
                <label htmlFor="message" className={`text-[9px] text-text-3 font-semibold uppercase tracking-wider ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t('ui.messageLabel')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={submitting || success}
                  rows={4}
                  className={`w-full border border-border bg-slate-900/50 p-[12px] text-text-1 text-[12px] rounded-xl focus:outline-none focus:border-accent transition-colors duration-150 resize-none ${isRtl ? 'text-right' : 'text-left'}`}
                  placeholder={t('ui.inputTextMemorandum')}
                  required
                ></textarea>
              </div>

              {/* Status / Error Displays */}
              {error && (
                <div className={`font-mono text-[10px] text-accent font-semibold uppercase ${isRtl ? 'text-right' : 'text-left'}`}>
                  [ ! {isRtl ? 'خطأ' : 'ERROR'}: {error} ]
                </div>
              )}

              {/* Submit Button or Transmitted status */}
              <div className="pt-2 font-mono">
                {success ? (
                  <div className="w-full text-center py-[10px] text-[11px] font-semibold border border-emerald-500 text-emerald-400 bg-emerald-500/5 select-none uppercase tracking-wider rounded-xl">
                    [ ✓ {t('ui.messageTransmitted')} ]
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-[10px] text-[11px] font-semibold border border-accent text-accent bg-transparent hover:bg-accent hover:text-bg transition-all duration-150 rounded-xl cursor-pointer uppercase tracking-wider outline-none"
                  >
                    {submitting ? `[  ${t('ui.transmitting')}  ]` : `[  ${t('ui.sendMessage')}  ]`}
                  </button>
                )}
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
