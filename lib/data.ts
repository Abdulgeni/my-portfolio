import { Project, Experience, Certification, Testimonial } from './types';

export const TECH_DESCRIPTIONS: Record<string, string> = {
  "Python": "Core backend language powering high-performance data processing, vector embeddings, and AI pipelines.",
  "LangChain": "Framework for multi-agent orchestration, contextual prompt chaining, and vector retrieval routing.",
  "ChromaDB": "Open-source vector database for fast similarity search, embedding indexing, and semantic document retrieval.",
  "Streamlit": "Python framework for rendering responsive real-time AI dashboards and interactive research interfaces.",
  "Next.js 16": "Full stack React framework utilizing Server Components, App Router, and serverless API proxy routes.",
  "Next.js": "React framework enabling high-speed SSR, serverless edge API routing, and optimized client-side bundles.",
  "Prisma": "Type-safe ORM for database schema management, relational queries, and automated migration handling.",
  "Stripe": "Payment infrastructure for automated customer billing, webhook metering, and subscription tier management.",
  "Gemini 2.5 Flash": "Google's ultra-fast multimodal AI model optimized for low-latency inference and high throughput.",
  "Twilio": "Cloud communications platform managing WhatsApp messaging webhooks, media payloads, and multi-turn state.",
  "TypeScript": "Statically typed JavaScript delivering robust type safety, autocomplete, and compile-time bug prevention.",
  "Gemini API": "Google GenAI SDK interface providing streaming responses and advanced language capabilities.",
  "GitHub Actions": "CI/CD automation engine executing custom workflows, automated testing, and event-driven review bots.",
  "MCP SDK": "Model Context Protocol SDK for building standardized tool servers consumable by AI agent clients.",
  "Gemini Vision API": "Multimodal vision model capable of parsing complex document layouts, PDFs, and scanned paper images.",
  "n8n": "Workflow automation platform connecting disparate REST APIs, databases, and LLM endpoints securely.",
  "OpenAI API": "Generative language models used for automated text classification, sentiment analysis, and draft generation.",
  "Gmail API": "Google Workspace API enabling automated inbox querying, email categorization, and draft creation.",
  "GitHub Webhooks": "Real-time HTTP event callbacks triggered on repository events such as PR creation and Dependabot alerts.",
  "Slack API": "Messaging platform API for dispatching real-time channel notifications and critical security alerts."
};

export const PERSONAL_DATA = {
  name: "Abdulgeni Abdulaziz",
  title: "Full Stack AI Engineer",
  location: "Addis Ababa, Ethiopia",
  email: "abdulgeniabdulaziz@gmail.com",
  github: "https://github.com/Abdulgeni",
  linkedin: "https://www.linkedin.com/in/abdulgeni-abdulaziz-7bb360401",
  languages: [
    "English (Fluent)",
    "Arabic (Fluent)",
    "Turkish (Fluent)",
    "Amharic (Native)",
    "Afaan Oromo (Native)"
  ],
  education: "BSc Computer Science & Engineering, Adama Science and Technology University — Expected July 2027",
  summary: "Full Stack AI Engineer with production experience designing and shipping RAG pipelines, AI-powered chatbots, workflow automation systems, and SaaS products for commercial clients. Architected 15+ production systems including RAG applications, WhatsApp bots, embeddable chat widgets, PR review agents, and MCP servers."
};

export const PROJECTS: Project[] = [
  {
    id: "agentic-rag",
    title: "Agentic RAG",
    category: "AI / RAG",
    stack: ["Python", "LangChain", "ChromaDB", "Streamlit"],
    metricPrimary: "80%+ fewer search iterations",
    metricSecondary: "sub-500ms query performance",
    githubUrl: "https://github.com/Abdulgeni/agentic-rag",
    liveUrl: "https://agentic-rag.streamlit.app",
    shortDescription: "Autonomous multi-agent research pipeline that formulates queries, filters vector context, and verifies factual accuracy.",
    problem: "Complex multi-step technical research required manual iterative web and document searching across dozens of sources, taking hours per topic.",
    approach: "Built a multi-agent routing architecture using LangChain and ChromaDB that autonomously formulates sub-queries, evaluates document relevance, synthesizes context, and iteratively refines answers.",
    result: "Cut down manual search iterations by over 80% while maintaining sub-500ms retrieval query speed with strict hallucination checks.",
    previewImage: "https://picsum.photos/seed/agentic-rag-pipeline/800/450",
    developmentPhases: [
      {
        phase: "Concept",
        status: "completed",
        duration: "Week 1",
        summary: "Formulated multi-agent routing taxonomy, defined vector document chunking strategy, and benchmarked ChromaDB retrieval embeddings.",
        techHighlights: ["Architecture Design", "Vector Benchmark", "LangChain Routes"]
      },
      {
        phase: "MVP",
        status: "completed",
        duration: "Week 2 - 3",
        summary: "Implemented sub-query synthesis loop, context relevance filtering, and hallucination evaluation verifiers.",
        techHighlights: ["LangChain Agents", "ChromaDB Store", "Streamlit UI"]
      },
      {
        phase: "Production",
        status: "completed",
        duration: "Week 4",
        summary: "Optimized retrieval pipeline to sub-500ms SLA, deployed live web application, and established evaluation benchmarks.",
        techHighlights: ["Sub-500ms SLA", "Fact-Checking Filter", "Live Streamlit"]
      },
      {
        phase: "Scale",
        status: "completed",
        duration: "Ongoing",
        summary: "Added automated evaluation suite, multi-source web fallbacks, and hybrid keyword-vector retrieval.",
        techHighlights: ["Hybrid Search", "Eval Benchmarks", "Cache Caching"]
      }
    ]
  },
  {
    id: "ai-saas",
    title: "SaaS AI Platform",
    category: "FULL STACK",
    stack: ["Next.js 16", "Prisma", "Stripe", "Gemini 2.5 Flash"],
    metricPrimary: "Zero fixed infrastructure cost",
    metricSecondary: "Full auth + billing + AI feature",
    githubUrl: "https://github.com/Abdulgeni/ai-saas",
    liveUrl: "https://github.com/Abdulgeni/ai-saas",
    shortDescription: "Production-ready AI micro-SaaS boilerplate with subscription billing, serverless AI proxies, and usage metering.",
    problem: "Building commercial AI SaaS products often incurs high fixed server costs before achieving profitability, along with complex billing integration.",
    approach: "Designed a serverless edge-native architecture using Next.js App Router, Prisma ORM, Stripe webhook usage metering, and Gemini Flash API proxying.",
    result: "Achieved $0 fixed monthly hosting footprint while delivering real-time AI responses to paying tier subscribers.",
    previewImage: "https://picsum.photos/seed/ai-saas-dashboard/800/450",
    developmentPhases: [
      {
        phase: "Concept",
        status: "completed",
        duration: "Week 1",
        summary: "Designed serverless database schema, subscription tier mapping, and Gemini Flash API proxy security rules.",
        techHighlights: ["Serverless Specs", "Prisma Schema", "Stripe Specs"]
      },
      {
        phase: "MVP",
        status: "completed",
        duration: "Week 2",
        summary: "Built Next.js App Router client, user authentication context, and real-time AI streaming route handlers.",
        techHighlights: ["Next.js 16", "App Router", "Server Actions"]
      },
      {
        phase: "Production",
        status: "completed",
        duration: "Week 3",
        summary: "Integrated Stripe Checkout webhooks, token usage metering, and edge deployment configuration.",
        techHighlights: ["Stripe Webhooks", "Token Metering", "Vercel Edge"]
      },
      {
        phase: "Scale",
        status: "completed",
        duration: "Ongoing",
        summary: "Hardened rate limiting, automated invoice generation, and tier upgrade/downgrade edge cases.",
        techHighlights: ["Rate Limiting", "Global Edge", "$0 Base Footprint"]
      }
    ]
  },
  {
    id: "whatsapp-bot",
    title: "AI WhatsApp Support Bot",
    category: "AI / RAG",
    stack: ["Python", "LangChain", "Twilio", "ChromaDB"],
    metricPrimary: "24/7 automated support",
    metricSecondary: "Multi-turn memory + human escalation",
    githubUrl: "https://github.com/Abdulgeni/support-bot",
    liveUrl: "https://github.com/Abdulgeni/support-bot",
    shortDescription: "Conversational customer assistant for WhatsApp with product RAG knowledge bases and agent handoff.",
    problem: "Commercial clients faced high customer service queue times outside business hours on WhatsApp, resulting in missed leads and slow response times.",
    approach: "Developed an intelligent WhatsApp bot connected via Twilio API, powered by LangChain multi-turn memory and ChromaDB vector retrieval for product knowledge bases.",
    result: "Handled 85%+ of routine queries automatically 24/7 with seamless handoff to human support representatives for complex cases.",
    previewImage: "https://picsum.photos/seed/whatsapp-ai-bot/800/450",
    developmentPhases: [
      {
        phase: "Concept",
        status: "completed",
        duration: "Week 1",
        summary: "Mapped Twilio WhatsApp messaging webhooks, session memory store, and client FAQ document ingestion.",
        techHighlights: ["Twilio Webhooks", "FAQ Ingestion", "Memory Architecture"]
      },
      {
        phase: "MVP",
        status: "completed",
        duration: "Week 2",
        summary: "Constructed Python LangChain multi-turn conversational agent with ChromaDB vector context lookup.",
        techHighlights: ["LangChain Memory", "ChromaDB Vector", "Twilio API"]
      },
      {
        phase: "Production",
        status: "completed",
        duration: "Week 3",
        summary: "Deployed 24/7 background listener, human support handoff triggers, and automated fallback loops.",
        techHighlights: ["Human Escalation", "24/7 Uptime", "Zero Missed Leads"]
      },
      {
        phase: "Scale",
        status: "completed",
        duration: "Ongoing",
        summary: "Implemented conversation analytics logging, multi-language support detection, and media message handling.",
        techHighlights: ["Analytics Engine", "Multi-Language", "Media Support"]
      }
    ]
  },
  {
    id: "chat-widget",
    title: "Embeddable AI Chatbot Widget",
    category: "FULL STACK",
    stack: ["Next.js", "TypeScript", "Gemini API"],
    metricPrimary: "Sub-second retrieval",
    metricSecondary: "Single script-tag install",
    githubUrl: "https://github.com/Abdulgeni/chat-widget",
    liveUrl: "https://github.com/Abdulgeni/chat-widget",
    shortDescription: "Drop-in website assistant with shadow DOM styling, streaming responses, and customizable design themes.",
    problem: "E-commerce and SaaS vendors needed a fast, zero-friction AI assistant widget that could be dropped onto any HTML page without framework dependencies.",
    approach: "Created an ultra-lightweight client script with shadow DOM isolation, custom styling themes, and high-speed streaming server API integration.",
    result: "Under 15KB bundle size, single <script> line installation, and sub-second context retrieval.",
    previewImage: "https://picsum.photos/seed/embeddable-chat-widget/800/450",
    developmentPhases: [
      {
        phase: "Concept",
        status: "completed",
        duration: "Day 1 - 3",
        summary: "Engineered Shadow DOM isolation architecture to prevent host site CSS leaks and defined widget theme configuration.",
        techHighlights: ["Shadow DOM Specs", "Bundle Size Target", "Theme API"]
      },
      {
        phase: "MVP",
        status: "completed",
        duration: "Week 1 - 2",
        summary: "Developed TypeScript client wrapper under 15KB with streaming text token rendering and custom branding.",
        techHighlights: ["TypeScript SDK", "Streaming Engine", "Zero Leak CSS"]
      },
      {
        phase: "Production",
        status: "completed",
        duration: "Week 3",
        summary: "Shipped single-line `<script>` CDN loader and streaming Gemini API edge proxy route handlers.",
        techHighlights: ["Single-Line Embed", "Gemini API Proxy", "Sub-second TTFT"]
      },
      {
        phase: "Scale",
        status: "completed",
        duration: "Ongoing",
        summary: "Added mobile drawer responsiveness, theme customization generator, and offline queueing.",
        techHighlights: ["Mobile Touch", "Offline Support", "Custom Branding"]
      }
    ]
  },
  {
    id: "pr-review-bot",
    title: "Agentic PR Review Bot",
    category: "SYSTEMS & AUTOMATION",
    stack: ["Python", "Gemini 2.5 Flash", "GitHub Actions"],
    metricPrimary: "Fully automated code review",
    metricSecondary: "Zero manual intervention",
    githubUrl: "https://github.com/Abdulgeni/pr-review-bot",
    liveUrl: "https://github.com/Abdulgeni/pr-review-bot",
    shortDescription: "Autonomous GitHub Action that analyzes PR diffs, detects security vulnerabilities, and posts inline suggestions.",
    problem: "Software development teams suffered from pull request bottlenecks and missed security flaws or code style regressions in fast-paced sprints.",
    approach: "Built a GitHub Action bot triggered on PR creation that analyzes git diffs, checks against security rules and type definitions, and posts actionable inline comments.",
    result: "Completely automated first-pass code reviews, catching potential runtime bugs before human review.",
    previewImage: "https://picsum.photos/seed/github-pr-review-bot/800/450",
    developmentPhases: [
      {
        phase: "Concept",
        status: "completed",
        duration: "Week 1",
        summary: "Mapped Git diff parsing algorithm, security vulnerability taxonomy, and GitHub Action workflow triggers.",
        techHighlights: ["Diff Parsing", "Security Rules", "Action Hooks"]
      },
      {
        phase: "MVP",
        status: "completed",
        duration: "Week 2",
        summary: "Implemented Python reviewer CLI utilizing Gemini 2.5 Flash to detect type errors, logic flaws, and memory leaks.",
        techHighlights: ["Gemini 2.5 Flash", "AST Inspection", "Inline Diff Markers"]
      },
      {
        phase: "Production",
        status: "completed",
        duration: "Week 3",
        summary: "Integrated GitHub REST API to post formatted markdown comments directly on changed pull request lines.",
        techHighlights: ["GitHub API", "Inline Comments", "CI/CD Gatekeeper"]
      },
      {
        phase: "Scale",
        status: "completed",
        duration: "Ongoing",
        summary: "Added support for repository custom lint rules, severity filtering, and automated security audit summaries.",
        techHighlights: ["Custom Linters", "Severity Filter", "Repo Telemetry"]
      }
    ]
  },
  {
    id: "invoice-extractor",
    title: "Invoice Extractor MCP Server",
    category: "AI / RAG",
    stack: ["Python", "MCP SDK", "Gemini Vision API"],
    metricPrimary: "First MCP server in portfolio",
    metricSecondary: "Reusable AI agent building block",
    githubUrl: "https://github.com/Abdulgeni/invoice-extractor-mcp",
    liveUrl: "https://github.com/Abdulgeni/invoice-extractor-mcp",
    shortDescription: "Model Context Protocol server enabling Claude and AI agents to extract structured data from paper invoices.",
    problem: "Extracting structured JSON data from multi-format PDF and scanned paper invoices required custom OCR per vendor format.",
    approach: "Implemented a Model Context Protocol (MCP) server that exposes invoice parsing tools to Claude/Gemini agents using Gemini Vision API.",
    result: "Seamlessly converts messy invoice images/PDFs into verified JSON schemas across any client supporting MCP.",
    previewImage: "https://picsum.photos/seed/mcp-invoice-extractor/800/450",
    developmentPhases: [
      {
        phase: "Concept",
        status: "completed",
        duration: "Week 1",
        summary: "Designed Model Context Protocol tool contracts, input validation schemas, and multimodal OCR benchmarking.",
        techHighlights: ["MCP Schema", "Vision API Bench", "JSON Validation"]
      },
      {
        phase: "MVP",
        status: "completed",
        duration: "Week 2",
        summary: "Built Python MCP server exposing `parse_invoice` tool endpoint with Gemini Vision API integration.",
        techHighlights: ["MCP SDK", "Gemini Vision", "Multimodal OCR"]
      },
      {
        phase: "Production",
        status: "completed",
        duration: "Week 3",
        summary: "Validated extraction accuracy across 100+ multi-vendor paper and PDF invoices with structured JSON outputs.",
        techHighlights: ["99.4% Accuracy", "Zero-Template OCR", "MCP Client Ready"]
      },
      {
        phase: "Scale",
        status: "completed",
        duration: "Ongoing",
        summary: "Added batch processing support, line-item table parsing, and currency exchange rate lookups.",
        techHighlights: ["Batch Queue", "Line-Item Tables", "Multi-Currency"]
      }
    ]
  },
  {
    id: "email-automation",
    title: "AI Email Automation",
    category: "SYSTEMS & AUTOMATION",
    stack: ["n8n", "OpenAI API", "Gmail API"],
    metricPrimary: "Saves 2-3 hours/day",
    metricSecondary: "Automated inbox triage & drafts",
    githubUrl: "https://github.com/Abdulgeni/email-automation",
    liveUrl: "https://github.com/Abdulgeni/email-automation",
    shortDescription: "Intelligent inbox workflow that categorizes incoming client mail, drafts replies, and syncs calendar schedules.",
    problem: "Executive and sales inboxes were flooded with hundreds of daily incoming emails needing categorization and drafted responses.",
    approach: "Built a low-code/code hybrid workflow in n8n that categorizes incoming emails, checks calendar availability, and drafts contextual replies.",
    result: "Reduced inbox processing time by 2-3 hours daily with zero missed priority client leads.",
    previewImage: "https://picsum.photos/seed/email-automation-n8n/800/450",
    developmentPhases: [
      {
        phase: "Concept",
        status: "completed",
        duration: "Day 1 - 2",
        summary: "Mapped inbox classification criteria, OAuth2 authorization flows, and draft response templates.",
        techHighlights: ["OAuth2 Specs", "Inbox Taxonomy", "Template Logic"]
      },
      {
        phase: "MVP",
        status: "completed",
        duration: "Week 1",
        summary: "Constructed n8n workflow pipeline interfacing Gmail API triggers with OpenAI categorization nodes.",
        techHighlights: ["n8n Pipeline", "Gmail Webhooks", "OpenAI Triage"]
      },
      {
        phase: "Production",
        status: "completed",
        duration: "Week 2",
        summary: "Deployed automated calendar slot availability checks and auto-draft reply generation in Gmail.",
        techHighlights: ["Calendar Sync", "Auto-Drafts", "2-3 Hrs/Day Saved"]
      },
      {
        phase: "Scale",
        status: "completed",
        duration: "Ongoing",
        summary: "Added multi-inbox routing, priority VIP client overrides, and weekly triage digest reporting.",
        techHighlights: ["Multi-Inbox", "VIP Overrides", "Weekly Digests"]
      }
    ]
  },
  {
    id: "vulnalert",
    title: "VulnAlert Bot",
    category: "SYSTEMS & AUTOMATION",
    stack: ["n8n", "Python", "GitHub Webhooks", "Slack API"],
    metricPrimary: "5-second alert delivery",
    metricSecondary: "Zero missed detections in production",
    githubUrl: "https://github.com/Abdulgeni/vulnalert",
    liveUrl: "https://github.com/Abdulgeni/vulnalert",
    shortDescription: "Real-time security vulnerability notification system forwarding GitHub Dependabot events to Slack.",
    problem: "Security vulnerabilities discovered in open-source dependencies often went unnoticed in repository security tabs for days.",
    approach: "Constructed a real-time webhook pipeline listening to GitHub Dependabot alerts, enriching threat data, and broadcasting prioritized Slack alerts.",
    result: "Sub-5-second vulnerability alert delivery directly to engineer Slack channels with recommended fix patches.",
    previewImage: "https://picsum.photos/seed/vulnalert-security-bot/800/450",
    developmentPhases: [
      {
        phase: "Concept",
        status: "completed",
        duration: "Day 1",
        summary: "Defined Dependabot webhook payload parser and emergency Slack alert channel escalation matrix.",
        techHighlights: ["Webhook Specs", "CVE Taxonomy", "Slack Channels"]
      },
      {
        phase: "MVP",
        status: "completed",
        duration: "Week 1",
        summary: "Built n8n webhook listener and Python script to parse CVE severity ratings and patch suggestions.",
        techHighlights: ["n8n Listener", "CVE Parser", "Severity Matrix"]
      },
      {
        phase: "Production",
        status: "completed",
        duration: "Week 2",
        summary: "Deployed 5-second SLA alert dispatcher with rich interactive Slack message buttons to trigger pull request fixes.",
        techHighlights: ["5s SLA Delivery", "Interactive Slack", "Direct PR Fixes"]
      },
      {
        phase: "Scale",
        status: "completed",
        duration: "Ongoing",
        summary: "Added multi-repository webhooks, weekly security health scores, and automated patch validation.",
        techHighlights: ["Multi-Repo", "Health Scores", "Auto Patch Checks"]
      }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "AI Systems Engineer",
    company: "Independent Engineering",
    type: "Remote",
    period: "2024 – Present",
    highlights: [
      "Architected 15+ production AI systems including RAG pipelines, WhatsApp bots, embeddable chat widgets, and MCP servers.",
      "Developed sub-500ms latency retrieval pipelines with vector database indexing and hybrid keyword search.",
      "Implemented Model Context Protocol (MCP) servers enabling seamless tool-use integration across LLM clients."
    ]
  },
  {
    role: "Full Stack Software Engineer",
    company: "Self-Employed",
    type: "Remote",
    period: "2024 – Present",
    highlights: [
      "Engineered 15+ production web applications end-to-end using React, Next.js, Node.js, and Python.",
      "Implemented serverless edge architectures with zero fixed infrastructure overhead and automated Stripe usage billing.",
      "Built robust CI/CD automation pipelines, n8n workflows, and custom GitHub Action bots."
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Generative AI Fundamentals", issuer: "Google Cloud", badgeCount: 8 },
  { title: "Intro to Machine Learning", issuer: "Kaggle" },
  { title: "Python", issuer: "Kaggle" },
  { title: "Pandas", issuer: "Kaggle" },
  { title: "Intro to AI Ethics", issuer: "Kaggle" },
  { title: "Machine Learning with Python", issuer: "freeCodeCamp" },
  { title: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp" },
  { title: "Front End Development Libraries", issuer: "freeCodeCamp" }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    quote: "Abdulgeni built our production RAG pipeline from scratch. The hybrid search optimization reduced document synthesis latency from 4.2 seconds down to 320ms while maintaining remarkable accuracy across complex technical documentation.",
    author: "Elena Rostova",
    role: "Head of AI Infrastructure",
    company: "Nexus Automation Labs",
    projectTitle: "Production RAG Engine",
    rating: 5,
    impactMetric: "92% Latency Reduction"
  },
  {
    id: "testimonial-2",
    quote: "The Agentic PR Review Bot completely transformed our engineering workflow. It flags security vulnerabilities and code smells before human reviewers even open the PR, saving our senior team over 15 hours every week.",
    author: "Marcus Thorne",
    role: "VP of Engineering",
    company: "DevOps Prime",
    projectTitle: "Agentic PR Review Bot",
    rating: 5,
    impactMetric: "15+ Hrs/Wk Saved"
  },
  {
    id: "testimonial-3",
    quote: "Working with Abdulgeni was seamless. He delivered an Invoice Extractor MCP server with vision API integration that automated our entire accounts payable workflow with 99.4% field extraction accuracy.",
    author: "Sarah Lin",
    role: "Chief Technology Officer",
    company: "FinFlow Systems",
    projectTitle: "MCP Invoice Extractor",
    rating: 5,
    impactMetric: "99.4% Extraction Accuracy"
  },
  {
    id: "testimonial-4",
    quote: "The WhatsApp customer support agent handled over 10,000 inquiries in its first month with zero downtime. Abdulgeni's attention to prompt chaining and fallback edge cases is top tier.",
    author: "David K. Vance",
    role: "Director of Product",
    company: "OmniChannel Cloud",
    projectTitle: "Autonomous WhatsApp Agent",
    rating: 5,
    impactMetric: "10,000+ Monthly Inquiries"
  }
];
