'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#67E8F9] z-[100] origin-left shadow-[0_0_12px_#67E8F9,0_0_20px_rgba(103,232,249,0.8)] pointer-events-none"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
