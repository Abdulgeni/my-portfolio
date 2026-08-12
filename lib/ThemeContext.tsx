'use client';

import React, { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeDOM(newTheme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (newTheme === 'light') {
    root.classList.add('light');
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  } else {
    root.classList.add('dark');
    root.classList.remove('light');
    root.setAttribute('data-theme', 'dark');
  }
}

const subscribe = () => () => {};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'dark';
    }
  });

  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    applyThemeDOM(theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyThemeDOM(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', nextTheme);
      applyThemeDOM(nextTheme);
      return nextTheme;
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  }, []);

  // Keyboard shortcut listener ('T' key to quick toggle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key?.toLowerCase() === 't' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName) &&
        !e.metaKey &&
        !e.ctrlKey
      ) {
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}

      {/* Floating Theme Switch Toast Notification */}
      {isClient && showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-bounce">
          <div className="px-4 py-2 rounded-full bg-[#0C1018] light:bg-white text-[#EEF2F7] light:text-[#0F172A] border border-[#67E8F9]/50 shadow-[0_0_25px_rgba(103,232,249,0.4)] font-mono text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#67E8F9] animate-ping" />
            <span>
              {theme === 'light' ? 'Day Protocol Initialized (Glacial Light)' : 'Night Protocol Initialized (Abyssal Dark)'}
            </span>
          </div>
        </div>
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
