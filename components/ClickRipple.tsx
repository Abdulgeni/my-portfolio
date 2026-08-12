'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function ClickRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't spawn ripples if clicking on inputs/textareas to avoid distraction
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return;
      }

      const id = Date.now() + Math.random();
      const x = e.clientX;
      const y = e.clientY;

      setRipples((prev) => [...prev.slice(-10), { id, x, y }]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleAnimationComplete = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            onAnimationComplete={() => handleAnimationComplete(ripple.id)}
            style={{
              left: ripple.x - 40,
              top: ripple.y - 40,
              width: 80,
              height: 80,
            }}
            className="absolute rounded-full border border-[var(--signal-ice,#67E8F9)] bg-[var(--signal-ice-dim,rgba(103,232,249,0.15))] shadow-[0_0_20px_var(--signal-ice-dim,rgba(103,232,249,0.25))]"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
