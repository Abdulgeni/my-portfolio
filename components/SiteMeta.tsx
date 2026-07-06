"use client";

import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";

export default function SiteMeta() {
  const { isRtl } = useLanguage();

  return (
    <Helmet>
      <title>
        {isRtl
          ? "عبد الغني | مهندس ذكاء اصطناعي ومطور ويب متكامل"
          : "Abdulgeni | AI Engineer & Full Stack Developer"}
      </title>
      <meta
        name="description"
        content={
          isRtl
            ? "مهندس ذكاء اصطناعي ومطور ويب متكامل متخصص في تطبيقات نماذج اللغة الكبيرة قيد الإنتاج، وقنوات RAG، والوكلاء الأذكياء، وحلول SaaS القابلة للتوسع."
            : "AI & Full Stack Engineer specializing in production-grade LLM applications, retrieval-augmented generation (RAG) pipelines, intelligent agents, and scalable SaaS solutions."
        }
      />
      <meta
        name="keywords"
        content={
          isRtl
            ? "عبد الغني, مهندس ذكاء اصطناعي, مطور ويب, RAG, LLM, LangChain, React, TypeScript, Python, أتمتة سير العمل, Next.js"
            : "Abdulgeni, AI Engineer, Full Stack Developer, RAG, LLM, LangChain, React, TypeScript, Python, Workflow Automation, Next.js, Developer Portfolio"
        }
      />
      <meta name="theme-color" content="#4f46e5" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={typeof window !== "undefined" ? window.location.href : "https://github.com/Abdulgeni"}
      />
      <meta
        property="og:title"
        content={
          isRtl
            ? "عبد الغني | ملف الأعمال الهندسي للذكاء الاصطناعي والويب المتكامل"
            : "Abdulgeni | AI &amp; Full Stack Engineering Portfolio"
        }
      />
      <meta
        property="og:description"
        content={
          isRtl
            ? "استكشف أدوات الذكاء الاصطناعي المصممة خصيصاً، وأنظمة RAG متعددة المستندات، وأتمتة سير العمل، ومنصات SaaS المتكاملة التي بناها عبد الغني."
            : "Explore custom-engineered AI tools, multi-document RAG systems, workflow automation, and full-stack SaaS platforms built by Abdulgeni."
        }
      />
      <meta property="og:image" content="/images/og_share_banner_1783308513698.jpg" />
      <meta
        property="og:site_name"
        content={isRtl ? "ملف أعمال عبد الغني" : "Abdulgeni Portfolio"}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={
          isRtl
            ? "عبد الغني | ملف الأعمال الهندسي للذكاء الاصطناعي والويب المتكامل"
            : "Abdulgeni | AI &amp; Full Stack Engineering Portfolio"
        }
      />
      <meta
        name="twitter:description"
        content={
          isRtl
            ? "استكشف أدوات الذكاء الاصطناعي المصممة خصيصاً، وأنظمة RAG متعددة المستندات، وأتمتة سير العمل، ومنصات SaaS المتكاملة التي بناها عبد الغني."
            : "Explore custom-engineered AI tools, multi-document RAG systems, workflow automation, and full-stack SaaS platforms built by Abdulgeni."
        }
      />
      <meta name="twitter:image" content="/images/og_share_banner_1783308513698.jpg" />
    </Helmet>
  );
}
