# Abdulgeni Abdulaziz — Portfolio

<div align="center">

**Full Stack AI Engineer** · RAG Systems · Workflow Automation · Next.js

[Live Site](https://abdulgeni-abdulaziz.vercel.app) · [GitHub](https://github.com/Abdulgeni) · [LinkedIn](https://www.linkedin.com/in/abdulgeni-abdulaziz-7bb360401)

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)
![Gemini](https://img.shields.io/badge/Gemini-2.5%20Flash-8e75f2?logo=googlegemini)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

</div>

---

## Overview

A bilingual (English / Arabic, full RTL support), AI-powered developer portfolio — built with Next.js 15's App Router and TypeScript. It's not a static résumé page: it ships live GitHub telemetry, a RAG-style chat assistant that can actually answer questions about my work, and a real working contact form.

## ✨ Features

- 🌐 **Bilingual, RTL-aware** — full English/Arabic translation layer with automatic layout mirroring, not just text swapping
- 🤖 **AI portfolio assistant** — a Gemini-powered chat widget that answers questions about my skills, projects, and experience using my actual data as context
- 📊 **Live GitHub telemetry** — real-time public repo count, star count, weekly commits, and contribution streak, pulled straight from the GitHub API
- 📬 **Working contact form** — sends real email via Resend, not a fake "message sent" toast
- 🎨 **Light / dark theme toggle**
- ⌨️ **Keyboard shortcuts** — press `?` to see them
- 🖨️ **Print-friendly résumé view** — a dedicated print stylesheet turns the page into a clean PDF
- 📈 **Scroll progress bar**, animated section transitions, and a back-to-top control
- ⚡ Fully typed, strict TypeScript throughout

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| AI | Google Gemini (`@google/genai`) |
| Email | Resend |
| Deployment | Vercel |

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+
- npm

### Installation

```bash
npm install
cp .env.local.example .env.local   # then fill in your real keys
npm run dev
```

Visit **http://localhost:3000**

### Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | Yes, for the chat assistant | Get one free at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| `RESEND_API_KEY` | Yes, for the contact form | Get one free at [resend.com](https://resend.com) |
| `CONTACT_TO_EMAIL` | Optional | Where contact form submissions are delivered (defaults to my email) |
| `CONTACT_FROM_EMAIL` | Optional | Custom sender once you verify a domain in Resend; defaults to Resend's sandbox sender |
| `GITHUB_TOKEN` | Optional | Raises the GitHub API rate limit from 60/hr to 5,000/hr |

```bash
GEMINI_API_KEY=your_key_here
RESEND_API_KEY=your_key_here
CONTACT_TO_EMAIL=abdulgeniabdulaziz@gmail.com
CONTACT_FROM_EMAIL=
GITHUB_TOKEN=
```

## 📁 Project Structure

```
app/
├── layout.tsx              # Root layout — fonts, providers, nav, chat widget
├── page.tsx                # Section list with scroll-triggered fade-ins
├── globals.css             # Theme tokens, print stylesheet, animations
└── api/
    ├── github/route.ts     # Live GitHub telemetry
    ├── chat/route.ts       # Gemini-powered portfolio assistant
    └── contact/route.ts    # Resend email delivery

components/                 # Hero, Nav, Projects, Skills, Experience,
                             # Education, Contact, ChatWidget, etc.
context/
└── LanguageContext.tsx      # EN/AR translation + RTL state

lib/
├── data.ts                 # Portfolio content (source of truth)
├── translations.ts         # EN/AR translation dictionary
└── types.ts                 # Shared TypeScript interfaces
```

## 🔌 API Routes

| Route | Description |
|---|---|
| `GET /api/github` | Fetches live repo count, stars, weekly commits, and streak from the GitHub API (cached hourly) |
| `POST /api/chat` | Sends a message to Gemini with the full portfolio dataset as context |
| `POST /api/contact` | Validates and sends a contact form submission via Resend |

## 📦 Deployment

1. Push this repo to GitHub
2. Import it into [Vercel](https://vercel.com)
3. Add the environment variables above in **Project Settings → Environment Variables**
4. Deploy

## 📄 License

MIT — feel free to fork this and adapt it for your own portfolio.

---

<div align="center">
Built by <strong>Abdulgeni Abdulaziz</strong> · <a href="mailto:abdulgeniabdulaziz@gmail.com">abdulgeniabdulaziz@gmail.com</a>
</div>
