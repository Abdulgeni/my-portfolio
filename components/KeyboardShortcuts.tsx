"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, HelpCircle, X, Terminal, Navigation, MessageSquare, CornerDownLeft } from 'lucide-react';

interface ShortcutItem {
  key: string;
  description: string;
  category: 'Navigation' | 'Interaction' | 'General';
}

const SHORTCUTS: ShortcutItem[] = [
  { key: '1', description: 'Go to Home section', category: 'Navigation' },
  { key: '2', description: 'Go to Services section', category: 'Navigation' },
  { key: '3', description: 'Go to Projects section', category: 'Navigation' },
  { key: '4', description: 'Go to Skills section', category: 'Navigation' },
  { key: '5', description: 'Go to Experience section', category: 'Navigation' },
  { key: '6', description: 'Go to Education section', category: 'Navigation' },
  { key: '7', description: 'Go to Contact section', category: 'Navigation' },
  { key: '/', description: 'Open chatbot and focus input', category: 'Interaction' },
  { key: 'Esc', description: 'Close chat, overlays, or blur focus', category: 'General' },
  { key: '?', description: 'Toggle this keyboard shortcuts menu', category: 'General' },
];

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      // Esc always works to close modals and chat, or blur active inputs
      if (e.key === 'Escape') {
        window.dispatchEvent(new CustomEvent('close-chat'));
        setIsOpen(false);
        if (isTyping) {
          (target as HTMLInputElement).blur();
        }
        return;
      }

      if (isTyping) return;

      // '/' opens chatbot and focuses
      if (e.key === '/') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-chat'));
        return;
      }

      // '?' toggles shortcut menu
      if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // '1' to '7' scrolls to sections
      if (e.key >= '1' && e.key <= '7') {
        const sections = ['home', 'services', 'projects', 'skills', 'experience', 'education', 'contact'];
        const sectionId = sections[parseInt(e.key, 10) - 1];
        if (sectionId) {
          e.preventDefault();
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            
            // Focus heading for screen reader context (Accessibility)
            const heading = element.querySelector('h1, h2');
            if (heading) {
              (heading as HTMLElement).focus();
            } else {
              element.focus();
            }
          }
        }
      }
    };

    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleClose = () => setIsOpen(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-shortcuts-help', handleToggle);
    window.addEventListener('close-shortcuts-help', handleClose);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-shortcuts-help', handleToggle);
      window.removeEventListener('close-shortcuts-help', handleClose);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-surface border border-border rounded-2xl shadow-2xl p-6 select-none"
              role="dialog"
              aria-modal="true"
              aria-labelledby="shortcuts-title"
            >
              {/* Decorative Corner Indicators */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent/40" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent/40" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent/40" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent/40" />

              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border font-mono mb-4">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-accent" />
                  <h2 id="shortcuts-title" className="text-[12px] font-bold text-text-1 uppercase tracking-wider">
                    [ SYSTEM_HOTKEYS_CONSOLE ]
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-text-3 hover:text-accent font-bold transition-colors cursor-pointer outline-none focus:ring-1 focus:ring-accent rounded-md p-0.5"
                  aria-label="Close shortcuts help modal"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Description */}
              <p className="text-text-2 text-[11px] mb-6 font-mono border-l-2 border-accent pl-3 py-1 bg-surface-2/60">
                Enhance your efficiency. Navigation and assistant interactions can be triggered seamlessly via physical keyboard keys.
              </p>

              {/* Categorized Shortcuts */}
              <div className="space-y-4">
                {(['Navigation', 'Interaction', 'General'] as const).map((category) => (
                  <div key={category}>
                    <h3 className="text-[9px] text-text-3 font-bold uppercase tracking-widest font-mono mb-2 flex items-center gap-1.5">
                      {category === 'Navigation' && <Navigation size={10} className="text-accent" />}
                      {category === 'Interaction' && <MessageSquare size={10} className="text-emerald-500" />}
                      {category === 'General' && <Keyboard size={10} className="text-amber-500" />}
                      <span>{category}</span>
                    </h3>

                    <div className="space-y-2">
                      {SHORTCUTS.filter((s) => s.category === category).map((shortcut) => (
                        <div
                          key={shortcut.key}
                          className="flex items-center justify-between py-1.5 px-2 bg-surface-2/40 border border-border/40 hover:border-border rounded-xl transition-all font-mono"
                        >
                          <span className="text-[11px] text-text-2">{shortcut.description}</span>
                          <span className="inline-flex items-center justify-center min-w-6 px-1.5 py-0.5 border border-border bg-surface-2 rounded text-[10px] text-accent font-bold shadow-sm">
                            {shortcut.key}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-border flex justify-between items-center text-[9px] text-text-3 font-mono">
                <span>V2.5.0-SYSTEM</span>
                <span className="flex items-center gap-1">
                  <span>PRESS</span>
                  <kbd className="px-1 border border-border rounded bg-surface-2 font-bold text-accent">ESC</kbd>
                  <span>TO DISMISS</span>
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
