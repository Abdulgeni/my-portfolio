import { Project, Experience, Certification, Service } from './types';

export const PERSONAL_INFO = {
  name: "ABDULGENI ABDULAZIZ",
  title: "Full Stack AI Engineer",
  subtitle: "RAG Systems · Workflow Automation · Next.js",
  location: "Addis Ababa, Ethiopia",
  phone: "+251 910 963 110",
  email: "abdulgeniabdulaziz@gmail.com",
  portfolioUrl: "https://abdulgeni-abdulaziz.vercel.app",
  githubUrl: "https://github.com/Abdulgeni",
  githubUsername: "Abdulgeni",
  linkedinUrl: "https://www.linkedin.com/in/abdulgeni-abdulaziz-7bb360401",
  summary: `Full Stack AI Engineer with production experience designing and shipping RAG pipelines, AI-powered chatbots, workflow automation systems, and SaaS products for commercial clients. Architected 15+ production systems including RAG applications, WhatsApp bots, embeddable chat widgets, PR review agents, and MCP servers. Owns the full engineering lifecycle — system design, backend APIs, frontend interfaces, and deployment. Applies secure coding practices and OWASP Top 10 principles throughout every system delivered. Fluent in English, Arabic, and Turkish.`
};

export const SERVICES: Service[] = [
  {
    title: "AI Automation & RAG Systems",
    description: "End-to-end RAG pipelines, autonomous AI agents, LangChain-powered applications, and intelligent document processing systems using OpenAI and Gemini APIs.",
    stat: "9 RAG apps shipped"
  },
  {
    title: "Full-Stack SaaS Engineering",
    description: "Complete multi-tenant SaaS products from database schema to production deployment — authentication, Stripe billing, REST APIs, and React/Next.js interfaces.",
    stat: "15+ systems delivered"
  },
  {
    title: "Workflow Automation",
    description: "Business process automation using n8n, Zapier, and GitHub Actions — connecting APIs, eliminating manual work, and building event-driven pipelines that run without human intervention.",
    stat: "15+ hrs/week saved per client"
  }
];

export const SKILLS = {
  AI_RAG: [
    "OpenAI API", "Gemini API", "LangChain", "RAG", "ChromaDB",
    "Sentence Transformers", "Hugging Face", "CLIP", "Prompt Engineering",
    "MCP SDK"
  ],
  AUTOMATION: [
    "n8n", "Zapier", "GitHub Actions", "Slack API", "REST APIs",
    "Webhooks", "Airtable", "ClickUp", "Buffer API"
  ],
  FRONTEND: [
    "React", "Next.js", "TypeScript", "Tailwind CSS", "Figma"
  ],
  BACKEND: [
    "Node.js", "Express", "Python", "PostgreSQL", "Prisma",
    "Docker", "Vercel"
  ],
  SECURITY: [
    "OWASP Top 10", "Secure Coding", "Vulnerability Assessment",
    "Network Security"
  ],
  LANGUAGES: [
    "Python", "TypeScript", "JavaScript ES6+", "SQL",
    "Bash", "C++", "Rust"
  ],
  DEV_TOOLS: [
    "Git", "GitHub", "VS Code", "Postman", "Linux CLI"
  ]
};

export const PROJECTS = {
  business: [
    {
      title: "SaaS AI Platform",
      tech: ["Next.js 16", "TypeScript", "PostgreSQL (Neon)", "Prisma", "NextAuth.js", "Stripe", "Gemini 2.5 Flash", "Vercel"],
      description: "Full multi-tenant SaaS with Google/email authentication via NextAuth.js, Stripe subscription billing with webhook handlers, and an AI-powered feature built on Gemini 2.5 Flash. Prisma ORM with type-safe queries, Neon serverless PostgreSQL, protected routes enforcing subscription status.",
      github: "https://github.com/Abdulgeni/ai-saas",
      category: "Full Stack"
    },
    {
      title: "AI WhatsApp Customer Support Bot",
      tech: ["Python", "LangChain", "Twilio", "ChromaDB", "OpenAI API"],
      description: "24/7 customer support bot deployable on WhatsApp using RAG-powered knowledge base retrieval. Handles multi-turn conversation with per-user memory and human escalation.",
      github: "https://github.com/Abdulgeni/support-bot",
      category: "AI Engineering"
    },
    {
      title: "Embeddable AI Chatbot Widget",
      tech: ["Next.js", "TypeScript", "LangChain", "ChromaDB", "Gemini API"],
      description: "RAG-powered chat widget embeddable on any website via a single script tag. Zero external dependencies for the host site. Customizable bot name, colors, and greeting.",
      github: "https://github.com/Abdulgeni/chat-widget",
      category: "AI Engineering"
    },
    {
      title: "AI Email Automation System",
      tech: ["n8n", "OpenAI API", "Gmail API", "Webhooks"],
      description: "Classifies incoming emails by intent, generates tailored draft replies, and notifies the team via Slack. Saves 2-3 hours/day of manual email handling.",
      github: "https://github.com/Abdulgeni/email-automation",
      category: "Workflow Automation"
    },
    {
      title: "AI Invoice & Document Extractor",
      tech: ["Next.js", "TypeScript", "Gemini 2.5 Flash Vision API", "Vercel"],
      description: "Extracts vendor, amount, date, and line items from any invoice in under 2 seconds using Gemini Vision API. Exports to CSV automatically.",
      github: "https://github.com/Abdulgeni/invoice-extractor",
      category: "Full Stack"
    },
    {
      title: "AI Social Media Automation",
      tech: ["n8n", "Gemini 2.0 Flash API", "Buffer API", "Webhooks"],
      description: "Generates platform-optimised posts for Instagram, LinkedIn, and Twitter from a single topic and auto-schedules via Buffer API. Fully automated from idea to published post.",
      github: "https://github.com/Abdulgeni/social-automation",
      category: "Workflow Automation"
    },
    {
      title: "Agentic PR Review Bot",
      tech: ["Python", "Gemini 2.5 Flash", "GitHub Actions", "Slack API"],
      description: "Automatically reviews GitHub pull requests for bugs, security issues, and edge cases. Posts structured review comments directly on the PR with Slack notifications.",
      github: "https://github.com/Abdulgeni/pr-review-bot",
      category: "Workflow Automation"
    },
    {
      title: "Invoice Extractor MCP Server",
      tech: ["Python", "MCP SDK", "Gemini Vision API"],
      description: "Production MCP server exposing AI invoice extraction as a callable tool for Claude Desktop and any MCP-compatible client.",
      github: "https://github.com/Abdulgeni/invoice-extractor-mcp",
      category: "AI Engineering"
    }
  ] as Project[],
  rag: [
    {
      title: "Agentic RAG — AI Agent with Tool Calling",
      tech: ["Python", "LangChain", "ChromaDB", "Streamlit"],
      description: "Autonomous AI agent that evaluates search quality, refines queries iteratively, and surfaces chain-of-thought reasoning. Reduces manual search iterations by 80%+.",
      github: "https://github.com/Abdulgeni/agentic-rag",
      live: "https://agentic-rag.streamlit.app",
      category: "AI Engineering"
    },
    {
      title: "VulnAlert Bot — Security Monitoring",
      tech: ["n8n", "Python", "GitHub Webhooks", "Slack API"],
      description: "Event-driven GitHub security monitor delivering Slack alerts within 5 seconds of suspicious commits. Zero missed detections in production.",
      github: "https://github.com/Abdulgeni/vulnalert",
      category: "Workflow Automation"
    },
    {
      title: "Multi-Document RAG",
      tech: ["Python", "Sentence Transformers", "ChromaDB"],
      description: "Simultaneous search across multiple PDFs with per-result source attribution and CLIP multimodal support.",
      github: "https://github.com/Abdulgeni/multidoc-rag",
      live: "https://multidoc-rag.streamlit.app",
      category: "AI Engineering"
    },
    {
      title: "Multimodal RAG — Text + Images",
      tech: ["Python", "CLIP", "ChromaDB"],
      description: "Unified search pipeline across PDFs and images using CLIP model embeddings for true multimodal retrieval.",
      github: "https://github.com/Abdulgeni/multimodal-rag",
      live: "https://multimodal-rag.streamlit.app",
      category: "AI Engineering"
    }
  ] as Project[]
};

export const EXPERIENCE: Experience[] = [
  {
    role: "AI Systems Engineer",
    company: "Independent Engineering",
    type: "Remote · Freelance",
    period: "2024 – Present",
    highlights: [
      "Architected 15+ production AI systems including RAG pipelines, WhatsApp customer support bots, and embeddable chat widgets using LangChain, ChromaDB, and OpenAI/Gemini API",
      "Built an AI WhatsApp support bot handling customer queries 24/7 using RAG-powered knowledge base retrieval — deployable for any business within hours",
      "Engineered an embeddable AI chatbot widget added to any website via a single script tag, powered by OpenAI API with streaming responses and customizable branding",
      "Designed and shipped VulnAlert Bot — an event-driven GitHub security monitor delivering Slack alerts within 5 seconds of a suspicious commit, protecting 3+ active repositories",
      "Implemented n8n and Zapier automation workflows including AI email classification and auto-reply systems, eliminating 15+ hours/week of manual operations per client"
    ]
  },
  {
    role: "Full Stack Software Engineer",
    company: "Self-Employed",
    type: "Remote · Freelance",
    period: "2024 – Present",
    highlights: [
      "Engineered 15+ production web applications end-to-end — from system design through deployment — using React, Next.js, Node.js, and Python across SaaS, e-commerce, and automation verticals",
      "Built a full SaaS platform with user authentication, Stripe subscription billing, and an AI feature — complete multi-tenant product from database schema to production deployment",
      "Developed an AI invoice and document data extractor using OpenAI Vision API, outputting structured data to CSV and Airtable automatically from any uploaded PDF",
      "Built an AI social media automation tool generating platform-specific posts for Instagram, LinkedIn, and Twitter from a single topic, scheduled and published via API",
      "Integrated third-party APIs (Airtable, Slack, Stripe, ClickUp, GitHub) into client applications, enabling real-time cross-platform synchronisation and eliminating manual handoffs",
      "Built an Agentic PR Review Bot using Gemini 2.5 Flash and GitHub Actions — automatically reviews pull requests, analyzes diffs for bugs, security issues, and edge cases, and posts structured review comments directly on the PR with Slack notifications"
    ]
  }
];

export const EDUCATION = {
  degree: "BSc Computer Science & Engineering",
  institution: "Adama Science and Technology University (ASTU)",
  location: "Adama, Ethiopia",
  period: "Expected July 2027",
  coursework: [
    "Data Structures & Algorithms", "Database Systems", "Web Development",
    "Machine Learning", "Operating Systems", "Computer Networks",
    "OOP", "Cybersecurity Fundamentals"
  ]
};

export const CERTIFICATIONS = [
  { name: "Generative AI Fundamentals (8 Badges)", issuer: "Google Cloud" },
  { name: "Intro to Machine Learning", issuer: "Kaggle" },
  { name: "Python", issuer: "Kaggle" },
  { name: "Pandas", issuer: "Kaggle" },
  { name: "Intro to AI Ethics", issuer: "Kaggle" },
  { name: "Machine Learning with Python (300h)", issuer: "freeCodeCamp" },
  { name: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp" },
  { name: "Front End Development Libraries", issuer: "freeCodeCamp" }
];

export const LANGUAGES = [
  "English (Fluent)",
  "Arabic (Fluent)",
  "Turkish (Fluent)",
  "Amharic (Native)",
  "Afaan Oromo (Native)"
];
