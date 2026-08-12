'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATIONS, PERSONAL_DATA } from '@/lib/data';
import { Award, GraduationCap, Send, Mail, Github, Linkedin, CheckCircle2, AlertCircle, Sparkles, MapPin, Globe, Terminal } from 'lucide-react';
import { staggerContainer, revealItem, revealScale } from '@/lib/animations';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: 'success',
          message: 'TRANSMISSION SENT SUCCESSFULLY. Abdulgeni will reply to your inbox shortly.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.error || 'Failed to transmit message');
      }
    } catch (err: unknown) {
      console.error(err);
      setStatus({
        type: 'error',
        message: 'TRANSMISSION ERROR. Please email abdulgeniabdulaziz@gmail.com directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10 space-y-20"
    >
      {/* Credentials Grid: Certifications & Education */}
      <motion.div variants={staggerContainer}>
        <motion.div variants={revealItem}>
          <div className="flex items-center gap-2 text-xs font-mono text-[#67E8F9] font-bold tracking-wider uppercase mb-2 glow-text-ice">
            <Award className="w-4 h-4 text-[#67E8F9]" />
            <span>VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-space font-bold text-[#EEF2F7] mb-8">
            {"// Certifications & Education"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Certifications Compact Glowing Grid (Span 2) */}
          <motion.div variants={revealScale} className="lg:col-span-2 rounded-2xl bg-[#0C1018] border border-white/5 p-6 sm:p-8">
            <h3 className="text-lg font-space font-bold text-[#EEF2F7] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#67E8F9]" />
              Industry Certifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#141B26] border border-white/5 hover:border-[#67E8F9]/50 transition-colors flex items-start gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-[#67E8F9] mt-1.5 shrink-0 glow-text-ice" />
                  <div>
                    <div className="text-xs font-mono font-bold text-[#EEF2F7]">
                      {cert.title}
                    </div>
                    <div className="text-[11px] font-mono text-[#8B96A8]">
                      {cert.issuer} {cert.badgeCount ? `(${cert.badgeCount} Badges)` : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education & Language Card (Span 1) */}
          <motion.div variants={revealScale} className="rounded-2xl bg-[#0C1018] border border-white/5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-space font-bold text-[#EEF2F7] mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#67E8F9]" />
                Formal Education
              </h3>

              <div className="p-4 rounded-xl bg-[#141B26] border border-white/5 mb-6">
                <div className="text-sm font-space font-bold text-[#EEF2F7]">
                  BSc Computer Science &amp; Engineering
                </div>
                <div className="text-xs font-mono text-[#67E8F9] font-bold mt-1">
                  Adama Science and Technology University
                </div>
                <div className="text-[11px] font-mono text-[#4A5262] mt-1">
                  Expected July 2027
                </div>
              </div>
            </div>

            {/* Language Badges */}
            <div>
              <div className="text-xs font-mono text-[#4A5262] uppercase mb-2">GLOBAL FLUENCY</div>
              <div className="flex flex-wrap gap-1.5">
                {PERSONAL_DATA.languages.map((lang, idx) => (
                  <span key={idx} className="px-2 py-1 rounded text-[11px] font-mono text-[#A5F3FC] bg-[#141B26] border border-[#A5F3FC]/30">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Terminal Contact Form & Engineer Card */}
      <motion.div variants={staggerContainer}>
        <motion.div variants={revealItem}>
          <div className="flex items-center gap-2 text-xs font-mono text-[#67E8F9] font-bold tracking-wider uppercase mb-2 glow-text-ice">
            <Mail className="w-4 h-4 text-[#67E8F9]" />
            <span>INITIATE CONNECTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-space font-bold text-[#EEF2F7] mb-8">
            {"// Contact & Availability"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: About the Engineer + Social Links */}
          <motion.div variants={revealScale} className="lg:col-span-5 rounded-2xl bg-[#0C1018] border border-[#67E8F9]/40 p-6 sm:p-8 shadow-[0_0_20px_rgba(103,232,249,0.12)] space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-[#141B26] border border-[#67E8F9]/50 shadow-[0_0_18px_rgba(103,232,249,0.3)] shrink-0 flex items-center justify-center text-[#67E8F9]">
                <Terminal className="w-8 h-8 text-[#67E8F9]" />
              </div>
              <div>
                <h3 className="text-xl font-space font-bold text-[#EEF2F7]">
                  {PERSONAL_DATA.name}
                </h3>
                <p className="text-xs font-mono text-[#67E8F9] font-bold">{PERSONAL_DATA.title}</p>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#8B96A8] mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#67E8F9]" />
                  <span>{PERSONAL_DATA.location}</span>
                </div>
              </div>
            </div>

            {/* Availability Badge - Reserved Signal Pulse Red */}
            <div className="p-3.5 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/40 flex items-center gap-3">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EF4444]" />
              </span>
              <span className="font-mono text-xs text-[#EF4444] font-black tracking-wide">
                ◉ AVAILABLE — Remote Contract Work &amp; AI Engineering Roles
              </span>
            </div>

            <p className="text-sm text-[#8B96A8] leading-relaxed">
              Open for commercial AI projects, RAG architecture consultations, agent workflow automations, or full-stack software development.
            </p>

            {/* Direct Links */}
            <div className="space-y-3 pt-2 font-mono text-xs">
              <a
                href={`mailto:${PERSONAL_DATA.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#141B26] border border-white/5 text-[#EEF2F7] hover:border-[#67E8F9] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#67E8F9]" />
                <span>{PERSONAL_DATA.email}</span>
              </a>

              <a
                href={PERSONAL_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#141B26] border border-white/5 text-[#EEF2F7] hover:border-[#67E8F9] transition-colors"
              >
                <Github className="w-4 h-4 text-[#67E8F9]" />
                <span>github.com/Abdulgeni</span>
              </a>

              <a
                href={PERSONAL_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#141B26] border border-white/5 text-[#EEF2F7] hover:border-[#67E8F9] transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#67E8F9]" />
                <span>linkedin.com/in/abdulgeni-abdulaziz</span>
              </a>
            </div>
          </motion.div>

          {/* Right: Terminal Styled Form */}
          <motion.div variants={revealScale} className="lg:col-span-7 rounded-2xl bg-[#0C1018] border border-[#67E8F9]/40 p-6 sm:p-8 shadow-[0_0_25px_rgba(103,232,249,0.15)] relative">
            <div className="flex items-center gap-2 mb-6 text-xs font-mono text-[#67E8F9] pb-3 border-b border-[#141B26] font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#67E8F9] shadow-[0_0_8px_#67E8F9]" />
              <span>TERMINAL TRANSMISSION PROTOCOL // INPUT_STREAM</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 font-mono text-sm">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-mono text-[#8B96A8] mb-1.5">
                  NAME_
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Alex Vance"
                  className="w-full bg-[#141B26] border border-white/5 focus:border-[#67E8F9] rounded-xl p-3.5 text-[#EEF2F7] placeholder-[#4A5262] focus:outline-none focus:ring-1 focus:ring-[#67E8F9] transition-colors"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-mono text-[#8B96A8] mb-1.5">
                  EMAIL_
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@ai-lab.org"
                  className="w-full bg-[#141B26] border border-white/5 focus:border-[#67E8F9] rounded-xl p-3.5 text-[#EEF2F7] placeholder-[#4A5262] focus:outline-none focus:ring-1 focus:ring-[#67E8F9] transition-colors"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-mono text-[#8B96A8] mb-1.5">
                  MESSAGE_
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your RAG architecture, automation requirements, or project scope..."
                  className="w-full bg-[#141B26] border border-white/5 focus:border-[#67E8F9] rounded-xl p-3.5 text-[#EEF2F7] placeholder-[#4A5262] focus:outline-none focus:ring-1 focus:ring-[#67E8F9] transition-colors"
                />
              </div>

              {/* Status Message */}
              {status && (
                <div
                  className={`p-4 rounded-xl text-xs font-mono flex items-center gap-2 ${
                    status.type === 'success'
                      ? 'bg-[#67E8F9]/10 border border-[#67E8F9]/30 text-[#67E8F9]'
                      : 'bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444]'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-mono text-sm font-bold text-[#060810] bg-gradient-to-r from-[#67E8F9] to-[#A5F3FC] hover:brightness-110 transition-all duration-300 shadow-[0_0_20px_rgba(103,232,249,0.4)] hover:shadow-[0_0_30px_rgba(103,232,249,0.7)] disabled:bg-[#141B26] disabled:text-[#4A5262]"
              >
                <span>{isSubmitting ? '[ TRANSMITTING... ]' : '[ TRANSMIT ]'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
