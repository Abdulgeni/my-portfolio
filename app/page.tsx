"use client";

import React, { useEffect, useRef, useState } from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionSeparator from "@/components/SectionSeparator";

// Scroll animation trigger wrapper
function FadeInSection({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Trigger once
          }
        });
      },
      { threshold: 0.05 } // Trigger when at least 5% of the section is visible
    );

    const current = domRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-300 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <div className="flex-grow">
        {/* Hero does its own typing animations on mount, so we do not wrap in scroll observer */}
        <Hero />

        <SectionSeparator idNum={1} labelEn="SYS_LINK_HERO_SRV" labelAr="اتصال_البداية_الخدمات" />

        <FadeInSection>
          <Services />
        </FadeInSection>

        <SectionSeparator idNum={2} labelEn="SYS_LINK_SRV_PROJ" labelAr="اتصال_الخدمات_المشاريع" />

        <FadeInSection>
          <Projects />
        </FadeInSection>

        <SectionSeparator idNum={3} labelEn="SYS_LINK_PROJ_SKL" labelAr="اتصال_المشاريع_المهارات" />

        <FadeInSection>
          <Skills />
        </FadeInSection>

        <SectionSeparator idNum={4} labelEn="SYS_LINK_SKL_EXP" labelAr="اتصال_المهارات_الخبرة" />

        <FadeInSection>
          <Experience />
        </FadeInSection>

        <SectionSeparator idNum={5} labelEn="SYS_LINK_EXP_EDU" labelAr="اتصال_الخبرة_التعليم" />

        <FadeInSection>
          <Education />
        </FadeInSection>

        <SectionSeparator idNum={6} labelEn="SYS_LINK_EDU_CON" labelAr="اتصال_التعليم_التواصل" />

        <FadeInSection>
          <Contact />
        </FadeInSection>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
