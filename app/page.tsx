'use client';

import React, { useState, useEffect } from 'react';

// ==========================================
// 1. INLINE SVG ICONS (Ensures Turbopack compatibility)
// ==========================================
const GithubIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const MailIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MapPinIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CodeIcon = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />
  </svg>
);

const ExternalLinkIcon = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" x2="21" y1="14" y2="3" />
  </svg>
);

const SendIcon = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" x2="11" y1="2" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CheckCircleIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const AlertCircleIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

const MenuIcon = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

// ==========================================
// 2. DATA SCHEMAS
// ==========================================
interface Project {
  title: string;
  technologies: string[];
  description: string;
  githubUrl: string;
  liveUrl?: string;
  category: 'Business Tools' | 'AI / RAG Engineering';
}

interface SkillGroup {
  category: string;
  list: string[];
}

interface JobExperience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    location: string;
    phone: string;
    email: string;
    portfolioUrl: string;
    githubUrl: string;
    linkedinUrl: string;
    twitterUrl: string;
    summary: string;
  };
  skills: SkillGroup[];
  experience: JobExperience[];
  projects: Project[];
  education: {
    degree: string;
    institution: string;
    period: string;
    coursework: string;
  };
  certifications: Array<{ name: string; issuer: string }>;
  languages: string[];
}

const FALLBACK_DATA: PortfolioData = {
  personalInfo: {
    name: "Abdulgeni Abdulaziz",
    title: "Full Stack AI Engineer · RAG Systems · Workflow Automation · Next.js",
    location: "Addis Ababa, Ethiopia",
    phone: "+251 910 963 110",
    email: "abdulgeniabdulaziz@gmail.com",
    portfolioUrl: "https://abdulgeni-abdulaziz.vercel.app",
    githubUrl: "https://github.com/Abdulgeni",
    linkedinUrl: "https://www.linkedin.com/in/abdulgeni-abdulaziz-7bb360401",
    twitterUrl: "https://twitter.com/@____Secw",
    summary: "Full Stack AI Engineer with production experience designing and shipping RAG pipelines, AI-powered chatbots, workflow automation systems, and SaaS products for commercial clients. Architected 15+ production systems including RAG applications, WhatsApp bots, embeddable chat widgets, and email automation pipelines. Owns the full engineering lifecycle — system design, backend APIs, frontend interfaces, and deployment. Applies secure coding practices and OWASP Top 10 principles throughout every system delivered. Fluent in English, Arabic, and Turkish."
  },
  skills: [
    {
      category: "AI / RAG Engineering",
      list: ["OpenAI API", "Gemini API", "LangChain", "RAG", "ChromaDB", "Sentence Transformers", "Hugging Face", "CLIP", "Prompt Engineering"]
    },
    {
      category: "Workflow Automation",
      list: ["n8n", "Zapier", "GitHub Actions", "Slack API", "REST APIs", "Webhooks", "Airtable", "ClickUp", "Buffer API"]
    },
    {
      category: "Frontend Architecture",
      list: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma", "Responsive Web Design"]
    },
    {
      category: "Backend Systems",
      list: ["Node.js", "Express", "Python", "PostgreSQL", "Prisma", "Docker (basics)", "Vercel"]
    },
    {
      category: "Auth, Payments & Security",
      list: ["NextAuth.js", "Stripe", "OWASP Top 10", "Secure Coding Practices", "Vulnerability Assessment", "Network Security Fundamentals"]
    },
    {
      category: "Programming Languages",
      list: ["Python", "JavaScript (ES6+)", "TypeScript", "SQL", "HTML5", "CSS3", "Bash", "C++", "Rust"]
    },
    {
      category: "Dev Tools",
      list: ["Git", "GitHub", "VS Code", "Postman", "Linux CLI"]
    }
  ],
  experience: [
    {
      role: "AI Systems Engineer",
      company: "Independent Engineering · Remote",
      period: "2024 – Present",
      highlights: [
        "Architected 15+ production AI systems including RAG pipelines, WhatsApp customer support bots, and embeddable chat widgets using LangChain, ChromaDB, and OpenAI API.",
        "Built an AI WhatsApp support bot handling customer queries 24/7 using RAG-powered knowledge base retrieval — deployable for any business within hours.",
        "Engineered an embeddable AI chatbot widget added to any website via a single script tag, powered by Gemini API with streaming responses and customizable branding.",
        "Designed and shipped VulnAlert Bot — an event-driven GitHub security monitor delivering Slack alerts within 5 seconds of a suspicious commit, protecting 3+ active repositories.",
        "Implemented n8n and Zapier automation workflows including AI email classification and auto-reply systems, eliminating 15+ hours/week of manual operations per client."
      ]
    },
    {
      role: "Full Stack Software Engineer",
      company: "Self-Employed (Remote)",
      period: "2024 – Present",
      highlights: [
        "Engineered 15+ production web applications end-to-end — from system design through deployment — using React, Next.js, Node.js, and Python across SaaS, e-commerce, and automation verticals.",
        "Built a full SaaS platform with user authentication, Stripe subscription billing, and an AI feature — complete multi-tenant product from database schema to production deployment.",
        "Developed an AI invoice and document data extractor using Gemini 2.5 Flash Vision API, outputting structured data to CSV and Airtable automatically from any uploaded PDF.",
        "Built an AI social media automation tool generating platform-specific posts for Instagram, LinkedIn, and Twitter from a single topic, scheduled and published via Buffer API.",
        "Integrated third-party APIs (Airtable, Slack, Stripe, ClickUp, GitHub) into client applications, enabling real-time cross-platform synchronisation and eliminating manual handoffs."
      ]
    }
  ],
  projects: [
    {
      title: "SaaS AI Platform",
      technologies: ["Next.js 16", "TypeScript", "PostgreSQL (Neon)", "Prisma", "NextAuth.js", "Stripe", "Gemini 2.5 Flash", "Vercel"],
      description: "Full multi-tenant SaaS with Google/email authentication via NextAuth.js, Stripe subscription billing with webhook handlers, and an AI-powered feature built on Gemini 2.5 Flash. Production-grade stack: Prisma ORM with type-safe queries, Neon serverless PostgreSQL, protected routes enforcing subscription status, and CI/CD via Vercel — zero fixed infrastructure cost.",
      githubUrl: "https://github.com/Abdulgeni/ai-saas",
      category: "Business Tools"
    },
    {
      title: "AI WhatsApp Customer Support Bot",
      technologies: ["Python", "LangChain", "Twilio", "ChromaDB", "OpenAI API"],
      description: "24/7 customer support bot deployable on WhatsApp — answers queries using a RAG knowledge base built from business FAQs and product documentation. Handles multi-turn conversation with per-user memory, escalates to a human agent when confidence is low, and logs all interactions for review.",
      githubUrl: "https://github.com/Abdulgeni/support-bot",
      category: "Business Tools"
    },
    {
      title: "Embeddable AI Chatbot Widget",
      technologies: ["Next.js", "TypeScript", "LangChain", "ChromaDB", "Gemini API", "Vercel"],
      description: "RAG-powered chat widget embeddable on any website — answers visitor questions using a customizable knowledge base with sub-second retrieval via ChromaDB and LangChain. Built with Next.js API routes and TypeScript for type-safe, production-grade code; customizable bot name, colors, and greeting via configuration — zero external dependencies for the host site.",
      githubUrl: "https://github.com/Abdulgeni/chat-widget",
      category: "Business Tools"
    },
    {
      title: "AI Email Automation System",
      technologies: ["n8n", "OpenAI API", "Gmail API", "Webhooks"],
      description: "Reads incoming emails, classifies intent (support, sales, complaint, inquiry) using GPT-3.5, generates a tailored draft reply, and notifies the team via Slack — fully automated. Saves businesses 2–3 hours/day of manual email handling; workflow exported as importable n8n JSON for rapid client deployment.",
      githubUrl: "https://github.com/Abdulgeni/email-automation",
      category: "Business Tools"
    },
    {
      title: "AI Invoice & Document Data Extractor",
      technologies: ["Next.js", "TypeScript", "Gemini 2.5 Flash Vision API", "Tailwind CSS", "Vercel"],
      description: "Uploads any invoice or document — extracts vendor, amount, date, and line items as structured data in under 2 seconds using Gemini 2.5 Flash Vision API. Exports to CSV automatically from any uploaded PDF.",
      githubUrl: "https://github.com/Abdulgeni/invoice-extractor",
      category: "Business Tools"
    },
    {
      title: "AI Social Media Content Automation",
      technologies: ["n8n", "Gemini 2.0 Flash API", "Buffer API", "Webhooks", "REST APIs"],
      description: "Generates platform-optimised posts for Instagram, LinkedIn, and Twitter from a single topic and auto-schedules them via Buffer API. Fully automated from idea to published post with zero manual steps.",
      githubUrl: "https://github.com/Abdulgeni/social-automation",
      category: "Business Tools"
    },
    {
      title: "Agentic RAG — AI Agent with Tool Calling",
      technologies: ["Python", "LangChain", "ChromaDB", "Streamlit"],
      description: "Autonomous AI agent that evaluates search quality, refines queries iteratively, and surfaces chain-of-thought reasoning — built on production LangChain agent architecture patterns. Reduces manual search iterations by 80%+ compared to naive retrieval; sub-500ms query performance across all document types.",
      githubUrl: "https://github.com/Abdulgeni/agentic-rag",
      liveUrl: "https://agentic-rag.streamlit.app",
      category: "AI / RAG Engineering"
    },
    {
      title: "VulnAlert Bot — Security Monitoring",
      technologies: ["n8n", "Python", "GitHub Webhooks", "Slack API"],
      description: "Event-driven automation engine monitoring GitHub repositories for security-related keywords in real time — zero missed detections in production. Delivers formatted Slack alerts within 5 seconds of a suspicious code push; protects 3+ active client repositories.",
      githubUrl: "https://github.com/Abdulgeni/vulnalert",
      category: "AI / RAG Engineering"
    },
    {
      title: "Multi-Document RAG",
      technologies: ["Python", "Sentence Transformers", "ChromaDB"],
      description: "Simultaneous search across multiple PDFs with per-result source attribution. Extended with CLIP embeddings for combined text and image retrieval.",
      githubUrl: "https://github.com/Abdulgeni/multidoc-rag",
      liveUrl: "https://multidoc-rag.streamlit.app",
      category: "AI / RAG Engineering"
    },
    {
      title: "Multimodal RAG — Text + Images",
      technologies: ["Python", "CLIP", "ChromaDB"],
      description: "Unified search pipeline across PDFs and images using CLIP model embeddings for true multimodal retrieval.",
      githubUrl: "https://github.com/Abdulgeni/multimodal-rag",
      liveUrl: "https://multimodal-rag.streamlit.app",
      category: "AI / RAG Engineering"
    },
    {
      title: "Developer Portfolio",
      technologies: ["Next.js", "React", "Tailwind CSS", "Vercel", "Figma"],
      description: "Server-side rendered portfolio with clean design, performance optimizations, and layout structures to target high Lighthouse audit metrics.",
      githubUrl: "https://github.com/Abdulgeni/my-portfolio",
      liveUrl: "https://abdulgeni-abdulaziz.vercel.app",
      category: "AI / RAG Engineering"
    },
    {
      title: "JS Summary API",
      technologies: ["Node.js", "Express", "JavaScript"],
      description: "RESTful text summarization API with health check endpoint and compression ratio calculation. Demonstrates clean JavaScript routing logic.",
      githubUrl: "https://github.com/Abdulgeni/js-summary-api",
      category: "AI / RAG Engineering"
    }
  ],
  education: {
    degree: "BSc Computer Science & Engineering",
    institution: "Adama Science and Technology University (ASTU), Adama, Ethiopia",
    period: "Expected July 2027",
    coursework: "Data Structures & Algorithms, Database Systems, Web Development, Machine Learning, Operating Systems, Computer Networks, OOP, Cybersecurity Fundamentals"
  },
  certifications: [
    {
      name: "Generative AI Fundamentals (8 Badges)",
      issuer: "Google Cloud Skills Boost"
    },
    {
      name: "Intro to Machine Learning",
      issuer: "Kaggle"
    },
    {
      name: "Python",
      issuer: "Kaggle"
    },
    {
      name: "Pandas",
      issuer: "Kaggle"
    },
    {
      name: "Intro to AI Ethics",
      issuer: "Kaggle"
    },
    {
      name: "Machine Learning with Python (300h)",
      issuer: "freeCodeCamp"
    },
    {
      name: "JavaScript Algorithms & Data Structures",
      issuer: "freeCodeCamp"
    },
    {
      name: "Front End Development Libraries",
      issuer: "freeCodeCamp"
    }
  ],
  languages: [
    "English (Fluent)",
    "Arabic (Fluent)",
    "Turkish (Fluent)",
    "Amharic (Native)",
    "Afaan Oromo (Native)"
  ]
};

// ==========================================
// 3. MAIN COMPONENT (High-End Masterpiece)
// ==========================================
export default function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [projectGroup, setProjectGroup] = useState<'Business Tools' | 'AI / RAG Engineering'>('Business Tools');
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(FALLBACK_DATA);
  const [isSyncing, setIsSyncing] = useState(true);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    async function fetchLatestContent() {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/Abdulgeni/my-portfolio/main/portfolio-data.json'
        );
        if (!response.ok) throw new Error('Data file not found on GitHub yet');

        const liveData = await response.json();
        setPortfolioData(liveData);
      } catch (err) {
        console.warn('Fallback to native structural constants.', err);
        setPortfolioData(FALLBACK_DATA);
      } finally {
        setIsSyncing(false);
      }
    }

    fetchLatestContent();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus('success');
        setFormMessage(data.message || 'Thank you! Your message was received.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
        setFormMessage(data.error || 'Please check your inputs and try again.');
      }
    } catch (err) {
      setFormStatus('error');
      setFormMessage('An unexpected communication error occurred. Please try again.');
    }
  };

  const { personalInfo, skills, experience, projects, education, certifications, languages } = portfolioData;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      
      {/* 1. Cinematic Grid Overlay Pattern */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 2. Soft Background Color Orbs */}
      <div className="absolute top-0 left-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none animate-pulse duration-[10s]" />
      <div className="absolute top-[800px] right-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-indigo-500/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-40 left-10 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      {/* Sticky Blurred Glass Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-900 bg-slate-950/70 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="text-xl font-bold tracking-tight text-white group">
            Abdulgeni<span className="text-indigo-400 group-hover:text-indigo-300 transition-colors">.</span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden items-center space-x-8 text-sm font-medium text-slate-400 md:flex">
            <a href="#about" className="transition-all hover:text-indigo-400">About</a>
            <a href="#skills" className="transition-all hover:text-indigo-400">Skills</a>
            <a href="#experience" className="transition-all hover:text-indigo-400">Experience</a>
            <a href="#projects" className="transition-all hover:text-indigo-400">Projects</a>
            <a href="#education-certs" className="transition-all hover:text-indigo-400">Education</a>
            <a href="#contact" className="transition-all hover:text-indigo-400">Contact</a>
          </nav>

          {/* Mobile Menu Icon */}
          <button 
            className="text-slate-400 hover:text-white md:hidden p-1 rounded-lg hover:bg-slate-900/40"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <nav className="border-b border-slate-900 bg-slate-950 px-6 py-4 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-4 text-sm font-medium text-slate-400">
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-400">About</a>
              <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-400">Skills</a>
              <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-400">Experience</a>
              <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-400">Projects</a>
              <a href="#education-certs" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-400">Education</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-400">Contact</a>
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-36 relative z-10">

        {/* Hero Area */}
        <section className="flex flex-col-reverse items-center justify-between gap-12 pt-8 md:flex-row md:pt-16">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[11px] font-medium text-indigo-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span>{isSyncing ? 'Synchronizing from GitHub...' : 'Live GitHub Content Engine Connected'}</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-indigo-200 sm:text-6xl lg:text-7xl">
                {personalInfo.name}
              </h1>
              <p className="text-lg font-medium text-indigo-400/90 sm:text-xl leading-relaxed">
                {personalInfo.title}
              </p>
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
              I design and ship production-grade RAG pipelines, secure WhatsApp agents, embeddable client widgets, and SaaS frameworks. Certified in Cybersecurity (CC) by ISC², ensuring all applications are built safe and robust by design.
            </p>

            {/* Quick Contact Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-400 md:justify-start">
              <span className="flex items-center gap-1.5 rounded-lg bg-slate-900/30 border border-slate-900/80 px-3 py-1.5">
                <MapPinIcon className="h-4 w-4 text-indigo-400" /> {personalInfo.location}
              </span>
              <span className="flex items-center gap-1.5 rounded-lg bg-slate-900/30 border border-slate-900/80 px-3 py-1.5">
                <PhoneIcon className="h-4 w-4 text-indigo-400" /> {personalInfo.phone}
              </span>
              <span className="flex items-center gap-1.5 rounded-lg bg-slate-900/30 border border-slate-900/80 px-3 py-1.5">
                <MailIcon className="h-4 w-4 text-indigo-400" /> {personalInfo.email}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 md:justify-start">
              <a href="#projects" className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-95">
                Explore Project Catalog
              </a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900/40 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white active:scale-95">
                Contact Me
              </a>
            </div>
          </div>

          {/* Interactive Graphical Avatar Space */}
          <div className="flex items-center justify-center">
            <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-slate-800/80 bg-gradient-to-br from-slate-950 to-indigo-900/30 p-1.5 sm:h-60 sm:w-60 group">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full bg-indigo-500/5 blur-md group-hover:bg-indigo-500/15 transition-all duration-500" />
              <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950/90 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:10px_10px]" />
                <CodeIcon className="h-16 w-16 text-indigo-400 group-hover:scale-110 group-hover:text-indigo-300 transition-all duration-500 relative z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Professional Summary Section */}
        <section id="about" className="scroll-mt-24 space-y-6">
          <div className="border-t border-slate-900 pt-16">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Professional Summary</h2>
            <div className="mt-6 p-8 rounded-2xl border border-slate-900/80 bg-slate-900/10 backdrop-blur-sm relative overflow-hidden group hover:border-slate-800 transition-all">
              <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/[0.03] rounded-full blur-2xl group-hover:bg-indigo-500/5 transition-all" />
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base max-w-4xl relative z-10">
                {personalInfo.summary}
              </p>
            </div>
          </div>
        </section>

        {/* Bento Grid Technical Skills Section */}
        <section id="skills" className="scroll-mt-24 space-y-8">
          <div className="border-t border-slate-900 pt-16">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Technical Spectrum</h2>
            <p className="mt-1 text-sm text-slate-400">Languages, frameworks, and utility platforms structured in an automated design matrix.</p>
            
            {/* Bento Grid Layout */}
            <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-3">
              {skills.map((skillBlock, idx) => {
                // Determine Bento grid sizing to create beautiful structural hierarchy
                const isLarge = idx === 0 || idx === 1 || idx === 3 || idx === 5;
                const colSpanClass = isLarge ? 'md:col-span-2' : 'md:col-span-1';
                
                return (
                  <div 
                    key={idx} 
                    className={`rounded-2xl border border-slate-900 bg-slate-900/20 p-6 space-y-4 hover:border-slate-800/80 hover:bg-slate-900/40 hover:shadow-2xl hover:shadow-indigo-500/[0.01] transition-all duration-300 ${colSpanClass}`}
                  >
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400/90">{skillBlock.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillBlock.list.map((skill) => (
                        <span 
                          key={skill} 
                          className="rounded-md bg-slate-950/70 border border-slate-900 px-2.5 py-1 text-xs text-slate-300 font-mono hover:border-indigo-500/40 hover:text-white transition-all cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section id="experience" className="scroll-mt-24 space-y-8">
          <div className="border-t border-slate-900 pt-16">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Professional Engineering History</h2>
            <div className="mt-12 space-y-8 relative before:absolute before:inset-0 before:left-3 before:h-full before:w-px before:bg-slate-900">
              {experience.map((job, idx) => (
                <div key={idx} className="relative pl-8 group">
                  {/* Timeline Glowing Node */}
                  <div className="absolute left-1 top-2.5 h-4 w-4 rounded-full border border-indigo-500 bg-slate-950 flex items-center justify-center transition-all group-hover:border-indigo-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                  </div>
                  
                  {/* Frosted Glass Experience Card */}
                  <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/10 backdrop-blur-sm space-y-4 group-hover:border-slate-800 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{job.role}</h3>
                      <span className="inline-block rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-[11px] font-mono text-indigo-300 self-start sm:self-center">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-400">{job.company}</p>
                    
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-400 leading-relaxed pl-1 list-none">
                      {job.highlights.map((highlight, index) => (
                        <li key={index} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-800 group-hover:before:bg-indigo-500/40 before:transition-colors">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section id="projects" className="scroll-mt-24 space-y-8">
          <div className="border-t border-slate-900 pt-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Shipped Systems</h2>
                <p className="mt-1 text-sm text-slate-400">
                  {isSyncing ? 'Syncing repository matrix...' : 'Updates pulled live from portfolio-data.json on GitHub.'}
                </p>
              </div>

              {/* Segment Toggle Filter */}
              <div className="flex border border-slate-900 rounded-lg p-1 bg-slate-950/80 self-start">
                {(['Business Tools', 'AI / RAG Engineering'] as const).map((group) => (
                  <button
                    key={group}
                    onClick={() => setProjectGroup(group)}
                    className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                      projectGroup === group
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/10'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>

            {/* Shipped Systems Grid */}
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.filter(p => p.category === projectGroup).map((project, idx) => (
                <div 
                  key={idx}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-900 bg-slate-950/20 p-6 transition-all duration-300 hover:border-slate-800/80 hover:bg-slate-900/10 hover:shadow-xl hover:shadow-indigo-500/[0.01]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-400">{project.category}</span>
                      <div className="flex items-center space-x-3">
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-slate-500 hover:text-white transition-colors"
                          aria-label="GitHub Repository"
                        >
                          <GithubIcon className="h-5 w-5" />
                        </a>
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-slate-500 hover:text-indigo-400 transition-colors"
                            aria-label="Live Demo Link"
                          >
                            <ExternalLinkIcon className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-4 group-hover:text-slate-300 transition-colors">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span key={tech} className="rounded bg-slate-900/60 border border-slate-800/40 px-2.5 py-0.5 text-[10px] font-mono text-slate-400">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-900 pt-4 text-xs font-semibold">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 group-hover:underline"
                      >
                        Source Code <ExternalLinkIcon className="h-3 w-3" />
                      </a>
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          View Live Deployment
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education, Certifications & Languages Grid */}
        <section id="education-certs" className="scroll-mt-24 space-y-8">
          <div className="border-t border-slate-900 pt-16 grid gap-12 md:grid-cols-2">
            
            {/* Left Column: Education & Languages */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight text-white">Education</h2>
              <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-6 space-y-4">
                <span className="inline-block rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-mono text-indigo-300">
                  {education.period}
                </span>
                <h3 className="text-lg font-bold text-white">{education.degree}</h3>
                <p className="text-sm text-slate-400">{education.institution}</p>
                
                <div className="border-t border-slate-900 pt-4 space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block">Coursework spectrum</span>
                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    {education.coursework}
                  </p>
                </div>
              </div>

              {/* International Languages block */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <span key={lang} className="rounded-md bg-slate-900/60 border border-slate-800 px-3 py-1.5 text-xs font-mono font-medium text-slate-300">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Certifications */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight text-white">Certifications</h2>
              <div className="space-y-3">
                {certifications.map((cert, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between rounded-xl border border-slate-900 bg-slate-900/10 px-4 py-3.5 text-sm hover:border-slate-800 transition-colors"
                  >
                    <span className="font-medium text-slate-300">{cert.name}</span>
                    <span className="text-xs font-mono text-slate-500">{cert.issuer}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="scroll-mt-24 space-y-8">
          <div className="border-t border-slate-900 pt-16">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Get In Touch</h2>
            <p className="mt-2 text-sm text-slate-400">
              Let's discuss pipeline development, custom n8n configurations, or full stack opportunities.
            </p>

            <div className="mt-8 grid gap-12 md:grid-cols-5">
              
              {/* Sidebar Contacts */}
              <div className="md:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400">Communication Matrix</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    I typically respond within 24 business hours to incoming projects or pipeline design discussions.
                  </p>
                </div>

                <div className="space-y-4 font-medium text-sm text-slate-300">
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center space-x-3 rounded-xl border border-slate-900/80 bg-slate-900/20 px-4 py-3 hover:border-indigo-500/40 hover:bg-slate-900/40 transition-all">
                    <MailIcon className="h-5 w-5 text-indigo-400" />
                    <span>{personalInfo.email}</span>
                  </a>
                  <a href={`tel:${personalInfo.phone}`} className="flex items-center space-x-3 rounded-xl border border-slate-900/80 bg-slate-900/20 px-4 py-3 hover:border-indigo-500/40 hover:bg-slate-900/40 transition-all">
                    <PhoneIcon className="h-5 w-5" />
                    <span>{personalInfo.phone}</span>
                  </a>
                  <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 rounded-xl border border-slate-900/80 bg-slate-900/20 px-4 py-3 hover:border-indigo-500/40 hover:bg-slate-900/40 transition-all">
                    <GithubIcon className="h-5 w-5" />
                    <span>{personalInfo.githubUrl.replace('https://', '')}</span>
                  </a>
                  <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 rounded-xl border border-slate-900/80 bg-slate-900/20 px-4 py-3 hover:border-indigo-500/40 hover:bg-slate-900/40 transition-all">
                    <LinkedinIcon className="h-5 w-5" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </div>

              {/* Form Element */}
              <form onSubmit={handleContactSubmit} className="md:col-span-3 space-y-4 rounded-2xl border border-slate-900 bg-slate-900/25 p-6 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/[0.02] rounded-full blur-3xl pointer-events-none" />
                
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none transition-all"
                    placeholder="Describe your project requirements or work details..."
                  />
                </div>

                {/* Status Banners */}
                {formStatus === 'success' && (
                  <div className="flex items-center space-x-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-sm text-emerald-400 animate-in fade-in duration-200">
                    <CheckCircleIcon className="h-5 w-5" />
                    <span>{formMessage}</span>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="flex items-center space-x-2 rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 text-sm text-rose-400 animate-in fade-in duration-200">
                    <AlertCircleIcon className="h-5 w-5" />
                    <span>{formMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="inline-flex w-full items-center justify-center space-x-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none disabled:bg-indigo-600/50 active:scale-[0.98]"
                >
                  {formStatus === 'submitting' ? (
                    <span>Processing Submission...</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Send Message</span>
                      <SendIcon className="h-4 w-4" />
                    </div>
                  )}
                </button>
              </form>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-32 border-t border-slate-900 bg-slate-950/90 py-10 relative">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="https://github.com/Abdulgeni" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/abdulgeni-abdulaziz-7bb360401" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">LinkedIn</a>
            <a href="https://twitter.com/@____Secw" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}