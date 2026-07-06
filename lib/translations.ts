export interface ServiceTranslation {
  title: string;
  description: string;
  stat: string;
}

export interface ProjectTranslation {
  title: string;
  description: string;
  category: string;
}

export interface ExperienceTranslation {
  role: string;
  company: string;
  type: string;
  period: string;
  highlights: string[];
}

export interface EducationTranslation {
  degree: string;
  institution: string;
  location: string;
  period: string;
  coursework: string[];
}

export interface CertificationTranslation {
  name: string;
  issuer: string;
}

export interface TranslationDict {
  nav: {
    home: string;
    services: string;
    projects: string;
    skills: string;
    experience: string;
    education: string;
    contact: string;
  };
  personal: {
    name: string;
    title: string;
    subtitle: string;
    location: string;
    summary: string;
  };
  services: ServiceTranslation[];
  projects: {
    business: ProjectTranslation[];
    rag: ProjectTranslation[];
  };
  experience: ExperienceTranslation[];
  education: EducationTranslation;
  certifications: CertificationTranslation[];
  languages: string[];
  ui: {
    printCv: string;
    hotkeys: string;
    darkSys: string;
    lightSys: string;
    availableHire: string;
    recruiterUtility: string;
    systemControls: string;
    systemDesign: string;
    languagesSystems: string;
    
    servicesHeaderLabel: string;
    servicesHeaderTitle: string;
    skillsHeaderLabel: string;
    skillsHeaderTitle: string;
    experienceHeaderLabel: string;
    experienceHeaderTitle: string;
    educationHeaderLabel: string;
    educationHeaderTitle: string;
    contactHeaderLabel: string;
    contactHeaderTitle: string;
    
    degreeAndMajor: string;
    relevantCoursework: string;
    professionalCertifications: string;
    
    letsBuildSomething: string;
    contactDescription: string;
    emailLabel: string;
    phoneLabel: string;
    githubLabel: string;
    linkedinLabel: string;
    
    nameLabel: string;
    emailFormLabel: string;
    messageLabel: string;
    inputIdentifier: string;
    inputRoutingAddress: string;
    inputTextMemorandum: string;
    sendMessage: string;
    transmitting: string;
    messageTransmitted: string;
    allFieldsRequired: string;
    
    viewProjects: string;
    contactMe: string;
    readingTime: string;
    shareProject: string;
    copied: string;
    allCategories: string;
    
    terminalStatus: string;
    terminalName: string;
    terminalLocation: string;
    terminalStatusVal: string;
    terminalOpenTo: string;
    terminalLanguages: string;
    terminalGithubStats: string;
    terminalRepos: string;
    terminalWeeklyCommits: string;
    terminalStackPrimary: string;
    
    chatTitle: string;
    chatWelcome1: string;
    chatWelcome2: string;
    chatPlaceholder: string;
    chatComputing: string;
    chatTooltip: string;
    
    copyright: string;
    credits: string;
  };
}

export const translations: Record<'en' | 'ar', TranslationDict> = {
  en: {
    nav: {
      home: 'HOME',
      services: 'SERVICES',
      projects: 'PROJECTS',
      skills: 'SKILLS',
      experience: 'EXPERIENCE',
      education: 'EDUCATION',
      contact: 'CONTACT',
    },
    personal: {
      name: "ABDULGENI ABDULAZIZ",
      title: "Full Stack AI Engineer",
      subtitle: "RAG Systems · Workflow Automation · Next.js",
      location: "Addis Ababa, Ethiopia",
      summary: "Full Stack AI Engineer with production experience designing and shipping RAG pipelines, AI-powered chatbots, workflow automation systems, and SaaS products for commercial clients. Architected 15+ production systems including RAG applications, WhatsApp bots, embeddable chat widgets, PR review agents, and MCP servers. Owns the full engineering lifecycle — system design, backend APIs, frontend interfaces, and deployment. Applies secure coding practices and OWASP Top 10 principles throughout every system delivered. Fluent in English, Arabic, and Turkish."
    },
    services: [
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
    ],
    projects: {
      business: [
        {
          title: "SaaS AI Platform",
          description: "Full multi-tenant SaaS with Google/email authentication via NextAuth.js, Stripe subscription billing with webhook handlers, and an AI-powered feature built on Gemini 2.5 Flash. Prisma ORM with type-safe queries, Neon serverless PostgreSQL, protected routes enforcing subscription status.",
          category: "Full Stack"
        },
        {
          title: "AI WhatsApp Customer Support Bot",
          description: "24/7 customer support bot deployable on WhatsApp using RAG-powered knowledge base retrieval. Handles multi-turn conversation with per-user memory and human escalation.",
          category: "AI Engineering"
        },
        {
          title: "Embeddable AI Chatbot Widget",
          description: "RAG-powered chat widget embeddable on any website via a single script tag. Zero external dependencies for the host site. Customizable bot name, colors, and greeting.",
          category: "AI Engineering"
        },
        {
          title: "AI Email Automation System",
          description: "Classifies incoming emails by intent, generates tailored draft replies, and notifies the team via Slack. Saves 2-3 hours/day of manual email handling.",
          category: "Workflow Automation"
        },
        {
          title: "AI Invoice & Document Extractor",
          description: "Extracts vendor, amount, date, and line items from any invoice in under 2 seconds using Gemini Vision API. Exports to CSV automatically.",
          category: "Full Stack"
        },
        {
          title: "AI Social Media Automation",
          description: "Generates platform-optimised posts for Instagram, LinkedIn, and Twitter from a single topic and auto-schedules via Buffer API. Fully automated from idea to published post.",
          category: "Workflow Automation"
        },
        {
          title: "Agentic PR Review Bot",
          description: "Automatically reviews GitHub pull requests for bugs, security issues, and edge cases. Posts structured review comments directly on the PR with Slack notifications.",
          category: "Workflow Automation"
        },
        {
          title: "Invoice Extractor MCP Server",
          description: "Production MCP server exposing AI invoice extraction as a callable tool for Claude Desktop and any MCP-compatible client.",
          category: "AI Engineering"
        }
      ],
      rag: [
        {
          title: "Agentic RAG — AI Agent with Tool Calling",
          description: "Autonomous AI agent that evaluates search quality, refines queries iteratively, and surfaces chain-of-thought reasoning. Reduces manual search iterations by 80%+.",
          category: "AI Engineering"
        },
        {
          title: "VulnAlert Bot — Security Monitoring",
          description: "Event-driven GitHub security monitor delivering Slack alerts within 5 seconds of suspicious commits. Zero missed detections in production.",
          category: "Workflow Automation"
        },
        {
          title: "Multi-Document RAG",
          description: "Simultaneous search across multiple PDFs with per-result source attribution and CLIP multimodal support.",
          category: "AI Engineering"
        },
        {
          title: "Multimodal RAG — Text + Images",
          description: "Unified search pipeline across PDFs and images using CLIP model embeddings for true multimodal retrieval.",
          category: "AI Engineering"
        }
      ]
    },
    experience: [
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
    ],
    education: {
      degree: "BSc Computer Science & Engineering",
      institution: "Adama Science and Technology University (ASTU)",
      location: "Adama, Ethiopia",
      period: "Expected July 2027",
      coursework: [
        "Data Structures & Algorithms", "Database Systems", "Web Development",
        "Machine Learning", "Operating Systems", "Computer Networks",
        "OOP", "Cybersecurity Fundamentals"
      ]
    },
    certifications: [
      { name: "Generative AI Fundamentals (8 Badges)", issuer: "Google Cloud" },
      { name: "Intro to Machine Learning", issuer: "Kaggle" },
      { name: "Python", issuer: "Kaggle" },
      { name: "Pandas", issuer: "Kaggle" },
      { name: "Intro to AI Ethics", issuer: "Kaggle" },
      { name: "Machine Learning with Python (300h)", issuer: "freeCodeCamp" },
      { name: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp" },
      { name: "Front End Development Libraries", issuer: "freeCodeCamp" }
    ],
    languages: [
      "English (Fluent)",
      "Arabic (Fluent)",
      "Turkish (Fluent)",
      "Amharic (Native)",
      "Afaan Oromo (Native)"
    ],
    ui: {
      printCv: "PRINT_CV",
      hotkeys: "HOTKEYS_CONSOLE",
      darkSys: "DARK_SYS",
      lightSys: "LIGHT_SYS",
      availableHire: "AVAILABLE FOR HIRE",
      recruiterUtility: "RECRUITER UTILITY",
      systemControls: "SYSTEM CONTROLS",
      systemDesign: "SYSTEM DESIGN",
      languagesSystems: "LANGUAGES SYSTEMS",
      
      servicesHeaderLabel: "01 / WHAT I BUILD",
      servicesHeaderTitle: "CORE SERVICES & CAPABILITIES",
      skillsHeaderLabel: "03 / TECHNICAL MATRIX",
      skillsHeaderTitle: "ENGINEERING STACK",
      experienceHeaderLabel: "04 / ENGINEERING LOG",
      experienceHeaderTitle: "WORK EXPERIENCE HISTORY",
      educationHeaderLabel: "05 / CREDENTIALS",
      educationHeaderTitle: "EDUCATION & CERTIFICATIONS",
      contactHeaderLabel: "06 / INITIALIZE CONTACT",
      contactHeaderTitle: "ESTABLISH COMMUNICATION",
      
      degreeAndMajor: "Degree & Major",
      relevantCoursework: "Relevant Coursework",
      professionalCertifications: "Professional Certifications",
      
      letsBuildSomething: "LET'S BUILD SOMETHING.",
      contactDescription: "Open to contract engagements, remote workflow engineering architectures, SaaS system integrations, or customized RAG agent installations. Connect directly.",
      emailLabel: "EMAIL",
      phoneLabel: "PHONE",
      githubLabel: "GITHUB",
      linkedinLabel: "LINKEDIN",
      
      nameLabel: "NAME_",
      emailFormLabel: "EMAIL_",
      messageLabel: "MESSAGE_",
      inputIdentifier: "INPUT IDENTIFIER",
      inputRoutingAddress: "INPUT ROUTING ADDRESS",
      inputTextMemorandum: "INPUT TEXT MEMORANDUM",
      sendMessage: "SEND MESSAGE",
      transmitting: "TRANSMITTING...",
      messageTransmitted: "MESSAGE TRANSMITTED",
      allFieldsRequired: "ALL FIELDS ARE REQUIRED",
      
      viewProjects: "VIEW PROJECTS",
      contactMe: "CONTACT ME",
      readingTime: "min read",
      shareProject: "Share project link",
      copied: "COPIED!",
      allCategories: "All",
      
      terminalStatus: "system.status()",
      terminalName: "name",
      terminalLocation: "location",
      terminalStatusVal: "available",
      terminalOpenTo: "open_to",
      terminalLanguages: "languages",
      terminalGithubStats: "github.stats()",
      terminalRepos: "repos",
      terminalWeeklyCommits: "this_week",
      terminalStackPrimary: "stack.primary()",
      
      chatTitle: "PORTFOLIO ASSISTANT",
      chatWelcome1: "system initialized.",
      chatWelcome2: "ask me anything about Abdulgeni's skills, projects, or experience.",
      chatPlaceholder: "Type your query...",
      chatComputing: "computing response",
      chatTooltip: "ASK ABOUT ABDULGENI",
      
      copyright: "ALL SYSTEMS OPERATIONAL.",
      credits: "BUILT WITH NEXT.JS · DEPLOYED ON VERCEL"
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      services: 'الخدمات',
      projects: 'المشاريع',
      skills: 'المهارات',
      experience: 'الخبرة',
      education: 'التعليم',
      contact: 'الاتصال',
    },
    personal: {
      name: "عبدالغني عبدالعزيز",
      title: "مهندس ذكاء اصطناعي ومطور ويب متكامل",
      subtitle: "أنظمة RAG · أتمتة سير العمل · Next.js",
      location: "أديس أبابا، إثيوبيا",
      summary: "مهندس ذكاء اصطناعي ومطور ويب متكامل ذو خبرة عملية في تصميم وإطلاق قنوات RAG، وروبوتات الدردشة المدعومة بالذكاء الاصطناعي، وأنظمة أتمتة سير العمل، ومنتجات SaaS للعملاء التجاريين. قام بهندسة أكثر من 15 نظاماً قيد الإنتاج، بما في ذلك تطبيقات RAG، وروبوتات واتساب، وواجهات دردشة قابلة للتضمين، ووكلاء مراجعة أكواد البرمجة (PR)، وخوادم MCP. يقود دورة التطوير البرمجي الكاملة — تصميم الأنظمة، واجهات برمجة التطبيقات (APIs)، وواجهات المستخدم، والنشر. يطبق ممارسات البرمجة الآمنة ومبادئ OWASP العشرة في جميع الأنظمة التي يسلمها. يتحدث الإنجليزية والعربية والتركية بطلاقة."
    },
    services: [
      {
        title: "أنظمة RAG وأتمتة الذكاء الاصطناعي",
        description: "قنوات RAG متكاملة، ووكلاء ذكاء اصطناعي مستقلون، وتطبيقات مدعومة بـ LangChain، وأنظمة معالجة مستندات ذكية باستخدام واجهات برمجة OpenAI و Gemini.",
        stat: "تم تسليم 9 تطبيقات RAG"
      },
      {
        title: "هندسة برمجيات SaaS متكاملة",
        description: "منتجات SaaS كاملة متعددة المستأجرين من تصميم قواعد البيانات إلى النشر الفعلي — المصادقة، والفوترة عبر Stripe، وواجهات برمجة تطبيقات REST، وواجهات React/Next.js.",
        stat: "أكثر من 15 نظاماً تم تسليمه"
      },
      {
        title: "أتمتة سير العمل",
        description: "أتمتة العمليات التجارية باستخدام n8n و Zapier و GitHub Actions — ربط واجهات برمجة التطبيقات، وإلغاء العمل اليدوي، وبناء مسارات قائمة على الأحداث تعمل بدون تدخل بشري.",
        stat: "توفير أكثر من 15 ساعة أسبوعياً لكل عميل"
      }
    ],
    projects: {
      business: [
        {
          title: "منصة SaaS للذكاء الاصطناعي",
          description: "منصة SaaS كاملة متعددة المستأجرين مع مصادقة Google/البريد الإلكتروني عبر NextAuth.js، وفوترة الاشتراكات عبر Stripe مع معالجة الـ Webhooks، وميزة مدعومة بالذكاء الاصطناعي مبنية على Gemini 2.5 Flash. استخدام Prisma ORM للاستعلامات الآمنة، وقواعد بيانات Neon Serverless PostgreSQL، وحماية المسارات لفرض حالة الاشتراك.",
          category: "تطوير متكامل"
        },
        {
          title: "روبوت دعم العملاء للواتساب بالذكاء الاصطناعي",
          description: "روبوت دعم عملاء يعمل على مدار الساعة طوال أيام الأسبوع وقابل للنشر على واتساب باستخدام استرجاع المعرفة المدعوم بقنوات RAG. يتعامل مع محادثات متعددة الأدوار مع ذاكرة لكل مستخدم وتصعيد للموظفين البشريين.",
          category: "هندسة ذكاء اصطناعي"
        },
        {
          title: "أداة دردشة ذكاء اصطناعي قابلة للتضمين",
          description: "أداة دردشة مدعومة بقنوات RAG قابلة للتضمين في أي موقع ويب عبر وسم نصي واحد. بدون أي تبعيات خارجية للموقع المستضيف. تخصيص اسم الروبوت، والألوان، ورسالة الترحيب.",
          category: "هندسة ذكاء اصطناعي"
        },
        {
          title: "نظام أتمتة البريد الإلكتروني بالذكاء الاصطناعي",
          description: "يصنف رسائل البريد الإلكتروني الواردة حسب النية، ويولد مسودات ردود مخصصة، وينبه الفريق عبر Slack. يوفر 2-3 ساعات يومياً من معالجة البريد الإلكتروني يدوياً.",
          category: "أتمتة سير العمل"
        },
        {
          title: "مستخرج الفواتير والمستندات بالذكاء الاصطناعي",
          description: "يستخرج المورد، والمبلغ، والتاريخ، وبنود الفواتير من أي فاتورة في أقل من ثانيتين باستخدام واجهة برمجة تطبيقات Gemini Vision. يصدر البيانات تلقائياً إلى CSV.",
          category: "تطوير متكامل"
        },
        {
          title: "أتمتة وسائل التواصل الاجتماعي بالذكاء الاصطناعي",
          description: "يولد منشورات مخصصة لمنصات إنستغرام، ولينكد إن، وتويتر من موضوع واحد ويجدولها تلقائياً عبر واجهة برمجة تطبيقات Buffer. أتمتة كاملة من الفكرة إلى النشر الفعلي.",
          category: "أتمتة سير العمل"
        },
        {
          title: "روبوت مراجعة كود البرمجة المستقل (PR)",
          description: "يراجع تلقائياً طلبات سحب الأكواد (Pull Requests) على GitHub للبحث عن الأخطاء والمشاكل الأمنية والحالات الاستثنائية. ينشر تعليقات مراجعة مهيكلة مباشرة على طلب السحب مع إرسال إشعارات على Slack.",
          category: "أتمتة سير العمل"
        },
        {
          title: "خادم MCP لمستخرج الفواتير",
          description: "خادم مخصص لـ Model Context Protocol (MCP) يعرض أداة استخراج الفواتير بالذكاء الاصطناعي كأداة قابلة للاستدعاء لتطبيق Claude Desktop وأي عميل متوافق مع بروتوكول MCP.",
          category: "هندسة ذكاء اصطناعي"
        }
      ],
      rag: [
        {
          title: "وكيل RAG ذو قدرة على استدعاء الأدوات",
          description: "وكيل ذكاء اصطناعي مستقل يقيم جودة البحث، ويحسن الاستعلامات بشكل متكرر، ويظهر تفكير سلسلة الأفكار (Chain-of-thought). يقلل من عمليات البحث اليدوية بنسبة تزيد عن 80%.",
          category: "هندسة ذكاء اصطناعي"
        },
        {
          title: "بوت VulnAlert لمراقبة الأمن الرقمي",
          description: "نظام مراقبة أمان أحداث GitHub يسلم تنبيهات Slack في غضون 5 ثوانٍ من الالتزامات (commits) المشبوهة. صفر أخطاء غير مكتشفة في بيئة الإنتاج.",
          category: "أتمتة سير العمل"
        },
        {
          title: "نظام RAG متعدد المستندات",
          description: "بحث متزامن عبر ملفات PDF متعددة مع إسناد مصدر دقيق لكل نتيجة ودعم CLIP متعدد الوسائط.",
          category: "هندسة ذكاء اصطناعي"
        },
        {
          title: "نظام RAG متعدد الوسائط — نصوص وصور",
          description: "قناة بحث موحدة عبر مستندات PDF والصور باستخدام تضمينات نموذج CLIP للاسترجاع متعدد الوسائط الحقيقي.",
          category: "هندسة ذكاء اصطناعي"
        }
      ]
    },
    experience: [
      {
        role: "مهندس أنظمة ذكاء اصطناعي",
        company: "هندسة مستقلة",
        type: "عن بعد · عمل حر",
        period: "2024 – الحاضر",
        highlights: [
          "صممت وهندست أكثر من 15 نظام ذكاء اصطناعي قيد التشغيل بما في ذلك قنوات RAG وروبوتات دعم عملاء واتساب وأدوات دردشة قابلة للتضمين باستخدام LangChain و ChromaDB وواجهات OpenAI/Gemini.",
          "بنيت روبوت دعم عملاء يعمل على مدار الساعة على واتساب باستخدام قنوات استرجاع المعرفة (RAG) — قابل للنشر لأي عمل تجاري في غضون ساعات.",
          "طورت أداة دردشة ذكاء اصطناعي قابلة للتضمين في أي موقع عبر وسم برمجى فردي، مدعومة بـ OpenAI مع استجابات متدفقة وإمكانية تخصيص الهوية البصرية.",
          "صممت وأطلقت بوت VulnAlert — مراقب أمان أحداث GitHub الذي يسلم تنبيهات Slack خلال 5 ثوانٍ من أي التزام مشبوه، مما يحمي أكثر من 3 مستودعات نشطة.",
          "نفذت مهام سير عمل مؤتمتة عبر n8n و Zapier تشمل تصنيف البريد الإلكتروني بالذكاء الاصطناعي والرد التلقائي، مما ألغى أكثر من 15 ساعة عمل يدوي أسبوعياً لكل عميل."
        ]
      },
      {
        role: "مطور ويب متكامل",
        company: "عمل خاص",
        type: "عن بعد · عمل حر",
        period: "2024 – الحاضر",
        highlights: [
          "طورت وهندست أكثر من 15 تطبيق ويب متكامل بشكل كامل — من تصميم النظام إلى النشر — باستخدام React و Next.js و Node.js و Python عبر مجالات الـ SaaS والتجارة الإلكترونية والأتمتة.",
          "بنيت منصة SaaS كاملة مع مصادقة المستخدمين ونظام فوترة اشتراكات Stripe وميزات الذكاء الاصطناعي — منتج متكامل متعدد المستأجرين من تصميم الجداول لقواعد البيانات إلى النشر.",
          "طورت أداة استخراج فواتير ومستندات بالذكاء الاصطناعي باستخدام واجهة برمجة تطبيق الرؤية لـ OpenAI، وتصدير البيانات المهيكلة إلى CSV وتلقائياً لـ Airtable.",
          "بنيت أداة أتمتة وسائل التواصل الاجتماعي لتوليد منشورات لمنصات إنستغرام ولينكد إن وتويتر بناء على موضوع واحد، وجدولتها ونشرها تلقائياً عبر واجهة برمجة تطبيق.",
          "دمجت واجهات برمجة تطبيقات خارجية (Airtable و Slack و Stripe و ClickUp و GitHub) في تطبيقات العملاء، مما مكن المزامنة الفورية عبر المنصات وإلغاء التناقل اليدوي.",
          "صممت روبوت مراجعة أكواد برمجية مستقل (PR review bot) باستخدام Gemini 2.5 Flash و GitHub Actions — يحلل التغييرات للبحث عن الثغرات والحالات الاستثنائية وينشر تعليقات مراجعة مهيكلة مع إشعارات Slack."
        ]
      }
    ],
    education: {
      degree: "بكالوريوس العلوم في علوم وهندسة الكمبيوتر",
      institution: "جامعة أداما للعلوم والتكنولوجيا (ASTU)",
      location: "أداما، إثيوبيا",
      period: "المتوقع في يوليو 2027",
      coursework: [
        "بني البيانات والخوارزميات", "نظم قواعد البيانات", "تطوير الويب",
        "تعلم الآلة", "أنظمة التشغيل", "شبكات الكمبيوتر",
        "البرمجة كائنية التوجه (OOP)", "أساسيات الأمن السيبراني"
      ]
    },
    certifications: [
      { name: "أساسيات الذكاء الاصطناعي التوليدي (8 شارات)", issuer: "جوجل كلاود" },
      { name: "مقدمة في تعلم الآلة", issuer: "كاجل" },
      { name: "بايثون", issuer: "كاجل" },
      { name: "بانداز", issuer: "كاجل" },
      { name: "مقدمة في أخلاقيات الذكاء الاصطناعي", issuer: "كاجل" },
      { name: "تعلم الآلة باستخدام بايثون (300 ساعة)", issuer: "فري كود كامب" },
      { name: "خوارزميات جافا سكريبت وبنى البيانات", issuer: "فري كود كامب" },
      { name: "مكتبات تطوير واجهات المستخدم", issuer: "فري كود كامب" }
    ],
    languages: [
      "الإنجليزية (طلاقة)",
      "العربية (طلاقة)",
      "التركية (طلاقة)",
      "الأمهرية (لغة أم)",
      "الأورومية (لغة أم)"
    ],
    ui: {
      printCv: "طباعة_السيرة",
      hotkeys: "لوحة_المفاتيح",
      darkSys: "النظام_الداكن",
      lightSys: "النظام_المضيء",
      availableHire: "متاح للتوظيف والتعاقد",
      recruiterUtility: "أداة التوظيف",
      systemControls: "أدوات النظام",
      systemDesign: "تصميم النظام",
      languagesSystems: "أنظمة اللغات المتقنة",
      
      servicesHeaderLabel: "01 / ما أقوم ببنائه",
      servicesHeaderTitle: "الخدمات الأساسية والقدرات",
      skillsHeaderLabel: "03 / المصفوفة التقنية",
      skillsHeaderTitle: "المهارات الهندسية",
      experienceHeaderLabel: "04 / السجل الهندسي",
      experienceHeaderTitle: "تاريخ خبرات العمل",
      educationHeaderLabel: "05 / المؤهلات والشهادات",
      educationHeaderTitle: "التعليم والشهادات المهنية",
      contactHeaderLabel: "06 / بدء الاتصال",
      contactHeaderTitle: "إنشاء اتصال مباشر",
      
      degreeAndMajor: "الدرجة والتخصص",
      relevantCoursework: "المواد الدراسية ذات الصلة",
      professionalCertifications: "الشهادات المهنية والمعتمدة",
      
      letsBuildSomething: "لنقم ببناء شيء ما.",
      contactDescription: "متاح لعقود العمل، وهندسة سير العمل عن بعد، وتكامل أنظمة SaaS، أو إطلاق وكلاء RAG مخصصين. تواصل مباشرة.",
      emailLabel: "البريد الالكتروني",
      phoneLabel: "الهاتف",
      githubLabel: "جيت هاب",
      linkedinLabel: "لينكد إن",
      
      nameLabel: "الاسم_",
      emailFormLabel: "البريد الإلكتروني_",
      messageLabel: "الرسالة_",
      inputIdentifier: "أدخل معرف الاسم",
      inputRoutingAddress: "أدخل عنوان التوجيه الرقمي",
      inputTextMemorandum: "أدخل نص المذكرة",
      sendMessage: "إرسال الرسالة",
      transmitting: "جاري الإرسال...",
      messageTransmitted: "تم إرسال الرسالة بنجاح",
      allFieldsRequired: "جميع الحقول مطلوبة",
      
      viewProjects: "استعراض المشاريع",
      contactMe: "اتصل بي",
      readingTime: "دقائق قراءة",
      shareProject: "مشاركة رابط المشروع",
      copied: "تم النسخ!",
      allCategories: "الكل",
      
      terminalStatus: "system.status()",
      terminalName: "الاسم",
      terminalLocation: "الموقع",
      terminalStatusVal: "متاح",
      terminalOpenTo: "متاح_لـ",
      terminalLanguages: "اللغات",
      terminalGithubStats: "github.stats()",
      terminalRepos: "المستودعات",
      terminalWeeklyCommits: "هذا_الأسبوع",
      terminalStackPrimary: "stack.primary()",
      
      chatTitle: "مساعد السيرة الذاتية",
      chatWelcome1: "تم بدء النظام بنجاح.",
      chatWelcome2: "اسألني أي شيء عن مهارات عبدالغني ومشاريعه وخبراته.",
      chatPlaceholder: "اكتب سؤالك هنا...",
      chatComputing: "جاري حساب الرد",
      chatTooltip: "اسأل المساعد الذكي عن عبدالغني",
      
      copyright: "جميع الأنظمة تعمل بكفاءة.",
      credits: "صنع باستخدام NEXT.JS · تم النشر على VERCEL"
    }
  }
};
