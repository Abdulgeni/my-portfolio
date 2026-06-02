'use client';

import React, { useState } from 'react';

// ==========================================
// 1. INLINE SVG ICONS (Native, fast, and secure)
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
// 2. STRUCTURAL DATA & TYPINGS
// ==========================================
interface Project {
  title: string;
  technologies: string[];
  description: string;
  githubUrl: string;
  liveUrl?: string;
  category: 'AI & RAG' | 'Automation' | 'Web & API';
}

const PROJECTS: Project[] = [
  {
    title: 'DocuQuery — RAG Document Analysis',
    technologies: ['Python', 'RAG', 'Streamlit', 'ChromaDB', 'Sentence Transformers'],
    description: 'Upload any PDF and ask questions. Built with Retrieval-Augmented Generation using Sentence Transformers for embeddings and ChromaDB for vector storage. 100% free, no API keys needed.',
    githubUrl: 'https://github.com/Abdulgeni/docuquery',
    liveUrl: 'https://docuquery.streamlit.app',
    category: 'AI & RAG'
  },
  {
    title: 'Multi-Document RAG',
    technologies: ['Python', 'RAG', 'Streamlit', 'Vector Databases'],
    description: 'Query multiple PDFs simultaneously. Upload any number of documents and search across all of them at once. Features source attribution showing which document each result came from.',
    githubUrl: 'https://github.com/Abdulgeni/multidoc-rag',
    liveUrl: 'https://multidoc-rag.streamlit.app',
    category: 'AI & RAG'
  },
  {
    title: 'Agentic RAG — AI Agent with Tool Calling',
    technologies: ['Python', 'RAG', 'AI Agents', 'Tool Calling', 'Streamlit'],
    description: 'An AI agent that searches documents, evaluates if results are sufficient, refines queries when needed, and explains its reasoning step by step. Demonstrates autonomous decision-making in RAG pipelines.',
    githubUrl: 'https://github.com/Abdulgeni/agentic-rag',
    liveUrl: 'https://agentic-rag.streamlit.app',
    category: 'AI & RAG'
  },
  {
    title: 'Real-Time AI Assistant',
    technologies: ['Python', 'RAG', 'Real-Time APIs', 'Streaming', 'Streamlit'],
    description: 'Live data retrieval meets RAG. Fetches real-time information from external APIs and answers questions instantly with streaming response simulation.',
    githubUrl: 'https://github.com/Abdulgeni/realtime-rag',
    liveUrl: 'https://realtime-rag.streamlit.app',
    category: 'AI & RAG'
  },
  {
    title: 'Multimodal RAG — Text + Images',
    technologies: ['Python', 'CLIP Model', 'RAG', 'Multimodal Embeddings'],
    description: 'Upload PDFs and images together. One search across all content types. Uses the CLIP model for multimodal embeddings.',
    githubUrl: 'https://github.com/Abdulgeni/multimodal-rag',
    liveUrl: 'https://multimodal-rag.streamlit.app',
    category: 'AI & RAG'
  },
  {
    title: 'GraphRAG — Knowledge Graph + RAG',
    technologies: ['Python', 'Knowledge Graph', 'RAG', 'Entity Extraction'],
    description: 'Smarter retrieval using entity relationships. Extracts people, organizations, technologies, and concepts, then builds a knowledge graph to find connected information beyond text similarity.',
    githubUrl: 'https://github.com/Abdulgeni/graphrag',
    liveUrl: 'https://graphrag.streamlit.app',
    category: 'AI & RAG'
  },
  {
    title: 'IBM Guided RAG with LangChain',
    technologies: ['Python', 'LangChain', 'ChromaDB', 'Grounding Validation'],
    description: 'Production-grade RAG following IBM enterprise architecture. Features intelligent chunking with overlap, metadata tracking, ChromaDB vector storage, and response grounding validation.',
    githubUrl: 'https://github.com/Abdulgeni/ibm-rag',
    liveUrl: 'https://ibm-rag.streamlit.app',
    category: 'AI & RAG'
  },
  {
    title: 'LangChain RAG Agent with Memory',
    technologies: ['Python', 'LangChain', 'AI Agents', 'Conversation Memory'],
    description: 'Production-ready RAG agent with document search tools, entity extraction, conversation memory, and chain-of-thought reasoning following LangChain agent architecture patterns.',
    githubUrl: 'https://github.com/Abdulgeni/langchain-agent',
    liveUrl: 'https://langchain-agent.streamlit.app',
    category: 'AI & RAG'
  },
  {
    title: 'Document Analysis with LLM Patterns',
    technologies: ['Python', 'LLM Patterns', 'PDF Parsing', 'Structure Analysis'],
    description: 'Extract text, analyze document structure, identify key entities, generate summaries, and prepare Q&A pairs from PDFs. Built following LLM document processing patterns.',
    githubUrl: 'https://github.com/Abdulgeni/document-analysis',
    liveUrl: 'https://document-analysis.streamlit.app',
    category: 'AI & RAG'
  },
  {
    title: 'DocuDigest — AI Document Summarizer',
    technologies: ['Python', 'OpenAI GPT', 'Streamlit', 'Summarization'],
    description: 'AI-powered document summarizer using OpenAI GPT models. Paste any text and get an instant bullet-point summary. Features adjustable creativity settings and downloadable results.',
    githubUrl: 'https://github.com/Abdulgeni/docusumm',
    liveUrl: 'https://docusumm.streamlit.app',
    category: 'AI & RAG'
  },
  {
    title: 'VulnAlert Bot — Security Monitoring',
    technologies: ['n8n Automation', 'GitHub Webhooks', 'Slack API', 'Security'],
    description: 'Real-time security monitoring bot that detects vulnerability-related issues in GitHub repositories and instantly alerts teams via Slack. Built with n8n workflow automation, GitHub Webhooks, and Slack API.',
    githubUrl: 'https://github.com/Abdulgeni/vulnalert-bot',
    category: 'Automation'
  },
  {
    title: 'JS Summary API — REST API',
    technologies: ['Node.js', 'Express', 'REST API', 'JavaScript'],
    description: 'RESTful API built with Node.js and Express for text summarization. Features health check endpoint and compression ratio calculation. Demonstrates JavaScript backend development skills.',
    githubUrl: 'https://github.com/Abdulgeni/js-summary-api',
    category: 'Web & API'
  },
  {
    title: 'Personal Developer Portfolio',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    description: 'A high-performance, server-side rendered portfolio website featuring structured responsive designs, dynamic custom elements, and highly automated CI/CD deployment.',
    githubUrl: 'https://github.com/Abdulgeni/portfolio',
    category: 'Web & API'
  }
];

interface TimelineItem {
  period: string;
  role: string;
  institution: string;
  description: string;
}

const EXPERIENCE: TimelineItem[] = [
  {
    period: 'Present',
    role: 'Computer Science & Engineering Student',
    institution: 'University Program',
    description: 'Focusing on algorithmic foundations, systems engineering, database structures, and practical applications of generative AI systems.'
  },
  {
    period: '2023 - Present',
    role: 'Freelance Full-Stack Developer & AI Automation Specialist',
    institution: 'Self-employed',
    description: 'Designing automation workflows with n8n, implementing generative AI APIs, and constructing responsive Next.js frontend architectures.'
  }
];

// ==========================================
// 3. MAIN PORTFOLIO COMPONENT
// ==========================================
export default function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  const categories = ['All', 'AI & RAG', 'Automation', 'Web & API'];

  const filteredProjects = selectedFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === selectedFilter);

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
        setFormMessage(data.message || 'Your message was sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
        setFormMessage(data.error || 'Please check your inputs and try again.');
      }
    } catch (err) {
      setFormStatus('error');
      setFormMessage('Something went wrong. Please verify your connection.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Sticky Blurred Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="text-xl font-bold tracking-tight text-white">
            Abdulgeni<span className="text-indigo-400">.</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 text-sm font-medium text-slate-400 md:flex">
            <a href="#about" className="transition-colors hover:text-indigo-400">About</a>
            <a href="#projects" className="transition-colors hover:text-indigo-400">Projects</a>
            <a href="#experience" className="transition-colors hover:text-indigo-400">Experience</a>
            <a href="#contact" className="transition-colors hover:text-indigo-400">Contact</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="text-slate-400 hover:text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <nav className="border-b border-slate-800 bg-slate-950 px-6 py-4 md:hidden">
            <div className="flex flex-col space-y-4 text-sm font-medium text-slate-400">
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="transition-colors hover:text-indigo-400"
              >
                About
              </a>
              <a 
                href="#projects" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="transition-colors hover:text-indigo-400"
              >
                Projects
              </a>
              <a 
                href="#experience" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="transition-colors hover:text-indigo-400"
              >
                Experience
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="transition-colors hover:text-indigo-400"
              >
                Contact
              </a>
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-28">

        {/* Hero Section */}
        <section className="flex flex-col-reverse items-center justify-between gap-12 pt-8 md:flex-row md:pt-16">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
              <span>Open to Freelance & Internships</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Abdulgeni Abdulaziz Jemal
            </h1>
            <p className="text-lg text-slate-400 sm:text-xl font-medium">
              Computer Science & Engineering Student, Full-Stack Developer & AI Automation Engineer
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
              I build web architectures using React, Next.js, and Python. I interface with AI architectures to parse complex document datasets, and build custom workspaces with tools like n8n to eliminate repetitive workflows.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
              >
                View Work
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/50 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Profile Placeholder Icon */}
          <div className="flex items-center justify-center">
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-slate-800 bg-gradient-to-br from-slate-900 to-indigo-950/40 p-1 sm:h-56 sm:w-56">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950">
                <CodeIcon className="h-16 w-16 text-indigo-500/80" />
              </div>
            </div>
          </div>
        </section>

        {/* About & Skills Section */}
        <section id="about" className="scroll-mt-24 space-y-8">
          <div className="border-t border-slate-900 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">About Me</h2>
            <div className="mt-6 grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4 text-slate-400 leading-relaxed text-sm sm:text-base">
                <p>
                  I'm a Computer Science & Engineering student with a builder's mindset and an obsession with making things work. My world sits at the intersection of full-stack development, artificial intelligence, and automation.
                </p>
                <p>
                  I build complete web applications using React, Next.js, and Python. I train AI models to summarize documents and extract insights. I design automated workflows with n8n that connect tools and eliminate repetitive work. And I do it all with a security-first approach, because working software isn't enough—it has to be safe.
                </p>
                <p>
                  Every project in my portfolio started as a real problem I wanted to solve. From an AI document summarizer to a GitHub security alert bot, I believe the best way to learn is to build, deploy, and iterate.
                </p>
              </div>

              {/* Core Skills block */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400">Core Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'JavaScript', 'React', 'Next.js', 'Node.js', 'AI/ML', 'RAG Systems', 'Vector Databases', 'n8n Automation', 'REST APIs', 'Git', 'Cybersecurity'].map((skill) => (
                    <span 
                      key={skill} 
                      className="rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-300 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section id="projects" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col justify-between gap-4 border-t border-slate-900 pt-12 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Selected Projects</h2>
              <p className="mt-1 text-sm text-slate-400">A demonstration of solutions across RAG systems, web platforms, and automated workflows.</p>
            </div>

            {/* Interactive Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                    selectedFilter === cat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'border border-slate-800 bg-slate-900/30 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div 
                key={project.title} 
                className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/20 p-6 transition-all duration-300 hover:border-slate-700/80 hover:bg-slate-900/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-indigo-400">
                      {project.category}
                    </span>
                    <div className="flex items-center space-x-3">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-slate-500 hover:text-slate-300 transition-colors"
                        aria-label={`${project.title} github link`}
                      >
                        <GithubIcon className="h-5 w-5" />
                      </a>
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-slate-500 hover:text-indigo-400 transition-colors"
                          aria-label={`${project.title} live demo`}
                        >
                          <ExternalLinkIcon className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 line-clamp-4 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="rounded bg-slate-900/80 border border-slate-800/80 px-2 py-0.5 text-xs text-slate-400 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors gap-1"
                    >
                      Explore Codebase <ExternalLinkIcon className="h-3 w-3" />
                    </a>
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Timeline Section */}
        <section id="experience" className="scroll-mt-24 space-y-8">
          <div className="border-t border-slate-900 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Professional Timeline</h2>
            <div className="mt-8 space-y-8 relative before:absolute before:inset-0 before:left-4 before:h-full before:w-px before:bg-slate-800">
              {EXPERIENCE.map((exp, idx) => (
                <div key={idx} className="relative pl-10 group">
                  {/* Timeline dot */}
                  <div className="absolute left-1.5 top-1.5 h-5 w-5 rounded-full border border-indigo-500/50 bg-slate-950 flex items-center justify-center transition-all group-hover:border-indigo-400">
                    <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                    <span className="text-xs font-mono font-semibold text-indigo-400">{exp.period}</span>
                    <span className="text-xs text-slate-500">{exp.institution}</span>
                  </div>
                  <h3 className="mt-1 text-lg font-semibold text-white">{exp.role}</h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-2xl">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="scroll-mt-24 space-y-8">
          <div className="border-t border-slate-900 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Get In Touch</h2>
            <p className="mt-2 text-sm text-slate-400">
              Have an opening, a freelance inquiry, or want to discuss automation/security developments? Send me a message below.
            </p>

            <div className="mt-8 grid gap-12 md:grid-cols-5">
              
              {/* Sidebar Contacts */}
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400">Contact Details</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    I aim to reply to all inquiries within 24 to 48 business hours. Feel free to connect across any of these platforms.
                  </p>
                </div>

                <div className="space-y-3 font-medium text-sm text-slate-300">
                  <a href="mailto:abdulgeniabdulaziz@gmail.com" className="flex items-center space-x-3 hover:text-indigo-400 transition-colors">
                    <MailIcon className="h-5 w-5" />
                    <span>abdulgeniabdulaziz@gmail.com</span>
                  </a>
                  <a href="https://github.com/Abdulgeni" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-indigo-400 transition-colors">
                    <GithubIcon className="h-5 w-5" />
                    <span>github.com/Abdulgeni</span>
                  </a>
                  <a href="https://www.linkedin.com/in/abdulgeni-abdulaziz-0141073b7" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-indigo-400 transition-colors">
                    <LinkedinIcon className="h-5 w-5" />
                    <span>LinkedIn Profile</span>
                  </a>
                  <a href="https://twitter.com/@____Secw" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-indigo-400 transition-colors">
                    <TwitterIcon className="h-5 w-5" />
                    <span>@____Secw</span>
                  </a>
                </div>
              </div>

              {/* Form Element */}
              <form onSubmit={handleContactSubmit} className="md:col-span-3 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900/30 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900/30 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900/30 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                    placeholder="Describe your project, timeline, or query..."
                  />
                </div>

                {/* Status Banners */}
                {formStatus === 'success' && (
                  <div className="flex items-center space-x-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-sm text-emerald-400">
                    <CheckCircleIcon className="h-5 w-5" />
                    <span>{formMessage}</span>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="flex items-center space-x-2 rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 text-sm text-rose-400">
                    <AlertCircleIcon className="h-5 w-5" />
                    <span>{formMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="inline-flex w-full items-center justify-center space-x-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none disabled:bg-indigo-600/50"
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

      {/* Simple Footer */}
      <footer className="mt-24 border-t border-slate-950 bg-slate-900/20 py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Abdulgeni Abdulaziz Jemal. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="https://github.com/Abdulgeni" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/abdulgeni-abdulaziz-0141073b7" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">LinkedIn</a>
            <a href="https://twitter.com/@____Secw" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}