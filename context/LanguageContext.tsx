"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, TranslationDict } from "../lib/translations";

type Language = "en" | "ar";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: <K extends keyof TranslationDict["ui"]>(key: `ui.${K}`) => string;
  isRtl: boolean;
  dict: TranslationDict;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // NOTE: this must start as a fixed, deterministic value ("en") rather than
  // reading localStorage during the initializer. The server has no
  // `window`/localStorage, so it always renders "en". If the client's first
  // render read a saved "ar" preference here, that first render would
  // disagree with the server-rendered HTML — a hydration mismatch — which
  // React either warns about or resolves by discarding/re-rendering the
  // whole tree, causing a visible flash or console errors. Reading the
  // saved preference in an effect (after mount, after hydration is done)
  // avoids that entirely.
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved === "ar" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const isRtl = language === "ar";

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", language);
    }
  }, [language, isRtl]);

  const dict = translations[language];

  // Simple nested translation helper
  const t = <K extends keyof TranslationDict["ui"]>(key: `ui.${K}`): string => {
    const parts = key.split(".");
    if (parts.length === 2 && parts[0] === "ui") {
      const uiKey = parts[1] as keyof TranslationDict["ui"];
      return dict.ui[uiKey] || translations.en.ui[uiKey] || "";
    }
    return "";
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, isRtl, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
