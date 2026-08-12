'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/data';
import { useLanguage } from '@/lib/LanguageContext';
import {
  MessageSquareQuote,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  CheckCircle2,
  TrendingUp,
  Pause,
  Play,
  Terminal,
  Cpu,
  Building2
} from 'lucide-react';
import { staggerContainer, revealItem } from '@/lib/animations';

export default function ClientFeedback() {
  const { t, dir } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<number>(1); // 1 for next, -1 for prev
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsCount = TESTIMONIALS.length;

  // Handle slide rotation
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonialsCount);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonialsCount) % testimonialsCount);
  };

  const handleSelect = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-slide effect (6 seconds interval)
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonialsCount);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, testimonialsCount]);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  // Motion variants for smooth subtle fade transitions
  const fadeVariants: Variants = {
    initial: (dirNum: number) => ({
      opacity: 0,
      x: dirNum > 0 ? 20 : -20,
      scale: 0.98,
      filter: 'blur(4px)',
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.45,
        ease: 'easeOut',
      },
    },
    exit: (dirNum: number) => ({
      opacity: 0,
      x: dirNum > 0 ? -20 : 20,
      scale: 0.98,
      filter: 'blur(4px)',
      transition: {
        duration: 0.35,
        ease: 'easeIn',
      },
    }),
  };

  return (
    <motion.section
      id="testimonials"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10"
    >
      {/* Section Tag & Title */}
      <motion.div variants={revealItem} className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-[#67E8F9] font-bold tracking-wider uppercase mb-2 glow-text-ice">
          <MessageSquareQuote className="w-4 h-4 text-[#67E8F9]" />
          <span>{t('testimonials.tag', 'CLIENT FEEDBACK')}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-space font-bold text-[#EEF2F7]">
              {`// ${t('testimonials.title', 'Testimonials & System Impact')}`}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#8B96A8] max-w-2xl">
              {t(
                'testimonials.subtitle',
                'Direct feedback from engineering leaders and product teams who deployed these AI and full-stack solutions.'
              )}
            </p>
          </div>

          {/* Autoplay / Pause Control Indicator */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141B26] border border-white/10 hover:border-[#67E8F9]/50 text-xs font-mono text-[#8B96A8] hover:text-[#67E8F9] transition-all cursor-pointer shadow-sm"
              title={isPaused ? 'Resume Auto-slide' : 'Pause Auto-slide'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#67E8F9]" />
                  <span>PLAY CAROUSEL</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#34D399]" />
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#34D399] animate-ping" />
                    LIVE AUTO-ROTATING
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Testimonial Glacial Card */}
      <motion.div
        variants={revealItem}
        className="relative rounded-3xl bg-[#0C1018] border border-white/10 hover:border-[#67E8F9]/40 p-6 sm:p-10 md:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Ambient Ice Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#67E8F9]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#34D399]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Progress Bar Header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
          {!isPaused && (
            <motion.div
              key={currentIndex}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 6, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-[#67E8F9] via-[#38BDF8] to-[#34D399]"
            />
          )}
        </div>

        {/* Top Decorative Header inside Card */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[#141B26]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#141B26] border border-[#67E8F9]/30 flex items-center justify-center text-[#67E8F9] shadow-[0_0_15px_rgba(103,232,249,0.15)]">
              <Quote className="w-5 h-5 text-[#67E8F9]" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#67E8F9] font-bold uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5" />
                <span>{currentTestimonial.projectTitle}</span>
              </div>
              <span className="text-[11px] font-mono text-[#8B96A8]">
                CASE STUDY FEEDBACK #{currentIndex + 1} OF {testimonialsCount}
              </span>
            </div>
          </div>

          {/* Impact Metric Badge & Rating Stars */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Metric Callout */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#34D399]/10 border border-[#34D399]/30 text-xs font-mono text-[#34D399] font-bold">
              <TrendingUp className="w-3.5 h-3.5 text-[#34D399]" />
              <span>{currentTestimonial.impactMetric}</span>
            </div>

            {/* 5-Star Rating */}
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#141B26] border border-white/10">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" />
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Transition Area */}
        <div className="min-h-[220px] sm:min-h-[190px] flex flex-col justify-between">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentTestimonial.id}
              custom={direction}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              {/* Quote Body */}
              <p className="text-lg sm:text-xl md:text-2xl font-space font-medium text-[#EEF2F7] leading-relaxed italic">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </p>

              {/* Author Info Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                  {/* Avatar graphic / initial badge */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#141B26] to-[#0C1018] border border-[#67E8F9]/40 flex items-center justify-center font-space font-bold text-lg text-[#67E8F9] shadow-[0_0_15px_rgba(103,232,249,0.15)] shrink-0">
                    {currentTestimonial.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>

                  {/* Name and Role */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-space font-bold text-base text-[#EEF2F7]">
                        {currentTestimonial.author}
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#67E8F9]/10 border border-[#67E8F9]/30 text-[10px] font-mono font-bold text-[#67E8F9]">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        {t('testimonials.verified_client', 'VERIFIED CLIENT')}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[#8B96A8] flex items-center gap-1.5 mt-0.5">
                      <span>{currentTestimonial.role}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-[#67E8F9]/80 flex items-center gap-1">
                        <Building2 className="w-3 h-3 inline" />
                        {currentTestimonial.company}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Project Chip */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141B26] border border-white/10 text-xs font-mono text-[#8B96A8]">
                  <Cpu className="w-3.5 h-3.5 text-[#67E8F9]" />
                  <span>{currentTestimonial.projectTitle}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Footer */}
        <div className="mt-8 pt-6 border-t border-[#141B26] flex flex-wrap items-center justify-between gap-4">
          {/* Dot Pagination */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((tItem, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={tItem.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-8 bg-[#67E8F9] shadow-[0_0_10px_#67E8F9]'
                      : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Navigation Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={dir === 'rtl' ? handleNext : handlePrev}
              className="p-2.5 rounded-xl bg-[#141B26] border border-white/10 hover:border-[#67E8F9]/50 text-[#EEF2F7] hover:text-[#67E8F9] hover:bg-[#67E8F9]/10 transition-all cursor-pointer shadow-md active:scale-95"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>

            <span className="text-xs font-mono text-[#8B96A8] px-2">
              0{currentIndex + 1} / 0{testimonialsCount}
            </span>

            <button
              type="button"
              onClick={dir === 'rtl' ? handlePrev : handleNext}
              className="p-2.5 rounded-xl bg-[#141B26] border border-white/10 hover:border-[#67E8F9]/50 text-[#EEF2F7] hover:text-[#67E8F9] hover:bg-[#67E8F9]/10 transition-all cursor-pointer shadow-md active:scale-95"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Selection Cards Grid */}
      <motion.div variants={revealItem} className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TESTIMONIALS.map((item, idx) => {
          const isSelected = idx === currentIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`p-4 rounded-2xl text-left ltr:text-left rtl:text-right border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#141B26] border-[#67E8F9] shadow-[0_0_20px_rgba(103,232,249,0.15)]'
                  : 'bg-[#0C1018]/80 border-white/5 hover:border-white/20 hover:bg-[#0C1018]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`text-xs font-space font-bold ${
                      isSelected ? 'text-[#67E8F9]' : 'text-[#EEF2F7]'
                    }`}
                  >
                    {item.author}
                  </span>
                  <span className="text-[10px] font-mono text-[#34D399] font-semibold px-1.5 py-0.5 rounded bg-[#34D399]/10">
                    {item.impactMetric.split(' ')[0]}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[#8B96A8] line-clamp-1 mb-2">
                  {item.company} • {item.projectTitle}
                </p>
              </div>

              <div
                className={`text-[10px] font-mono tracking-wider uppercase font-bold flex items-center justify-between ${
                  isSelected ? 'text-[#67E8F9]' : 'text-[#8B96A8]/60'
                }`}
              >
                <span>TESTIMONIAL 0{idx + 1}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#67E8F9] animate-pulse" />}
              </div>
            </button>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
