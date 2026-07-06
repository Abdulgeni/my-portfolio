"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BackToTop() {
  const { isRtl, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling more than 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    // Run once on mount in case they are already scrolled
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`fixed bottom-6 ${
            isRtl 
              ? 'right-6 md:right-[204px]' 
              : 'left-6 md:left-[204px]'
          } z-50`}
        >
          <button
            onClick={scrollToTop}
            className="w-12 h-12 flex flex-col items-center justify-center bg-bg border border-accent hover:border-accent-dim text-accent transition-all duration-100 focus:outline-none cursor-pointer rounded-2xl select-none shadow-lg hover:shadow-accent/10 font-mono group"
            title={isRtl ? 'الرجوع للأعلى' : 'Back to Top'}
            aria-label={isRtl ? 'الرجوع للأعلى' : 'Back to Top'}
          >
            <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform duration-150" />
            <span className="text-[8px] font-bold mt-0.5 tracking-tight uppercase">
              {isRtl ? 'فوق' : 'UP'}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
