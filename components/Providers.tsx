"use client";

import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/context/LanguageContext";
import SiteMeta from "./SiteMeta";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <SiteMeta />
        {children}
      </LanguageProvider>
    </HelmetProvider>
  );
}
