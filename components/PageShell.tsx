"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function PageShell({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isRtl } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-accent z-[9999] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-bar"
      />

      <main
        className={`${isRtl ? "md:pr-[180px] md:pl-0" : "md:pl-[180px] md:pr-0"} pt-12 md:pt-0 min-h-screen flex flex-col justify-between`}
      >
        {children}
      </main>
    </>
  );
}
