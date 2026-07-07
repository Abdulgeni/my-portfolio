<div align="center">

# Abdulgeni Abdulaziz — Portfolio

### Full Stack AI Engineer · RAG Systems · Workflow Automation

A schematic-inspired personal portfolio built with Next.js — live GitHub telemetry, RAG/agent project catalog, and a signal-routing hero diagram, all wired into one system.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)](#license)

[Live Site](https://abdulgeni-abdulaziz.vercel.app) · [Report a bug](https://github.com/Abdulgeni/my-portfolio/issues) · [Contact](mailto:abdulgeniabdulaziz@gmail.com)

</div>

---

## Overview

This repository is the source for my personal engineering portfolio. Rather than a generic template, the design treats the site itself as a piece of technical documentation — sections are numbered like schematic sheets, the hero renders an animated signal-routing diagram of my own workflow, and a live console panel pulls real GitHub telemetry instead of static numbers.

**Highlights:**

- 🛰️ **Live GitHub telemetry** — real repo count, star totals, weekly commit activity, and contribution streak, fetched server-side and cached
- 🧩 **Data-driven content** — profile, skills, experience, and projects can sync from a `portfolio-data.json` file on GitHub without a redeploy
- 🌐 **Bilingual support** — English / Arabic with full RTL layout handling
- 🎛️ **Filterable project catalog** — toggle between client/production systems and AI agent engineering work
- 📬 **Working contact form** — posts to an API route (or falls back to `mailto:`)
- ⚡ Fully responsive, keyboard-accessible, and built for Lighthouse performance

---

## Tech Stack

| Layer            | Technology                              |
| ----------------- | ---------------------------------------- |
| Framework          | Next.js 16 (App Router)                  |
| Language           | TypeScript                               |
| Styling            | Tailwind CSS                             |
| Icons              | lucide-react                             |
| Hosting            | Vercel                                   |
| Data source        | GitHub REST API + `portfolio-data.json`  |

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, pnpm, or yarn

### Installation

```bash
git clone https://github.com/Abdulgeni/my-portfolio.git
cd my-portfolio
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
# GitHub Personal Access Token — required for live stats.
# No scopes needed: only public data is read (repos, stars, public events).
# Without this, requests are capped at 60/hour per IP and the API silently
# falls back to placeholder numbers.
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

# Optional: recipient address for the contact form API route
CONTACT_EMAIL=abdulgeniabdulaziz@gmail.com
```

> Generate a token at **GitHub → Settings → Developer settings → Personal access tokens**. Leave every scope unchecked (classic token) or select "Public repositories (read-only)" (fine-grained token) — no elevated permissions are required.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm start
```

---

## Project Structure

```
.
├── app/
│   ├── page.tsx                 # Main portfolio page
│   ├── api/
│   │   ├── github/route.ts      # Live GitHub telemetry endpoint
│   │   └── contact/route.ts     # Contact form handler
│   └── context/
│       └── LanguageContext.tsx  # EN / AR + RTL toggle
├── components/
│   └── GitHubStats.tsx          # Realtime repository telemetry panel
├── public/
├── .env.local                   # Local environment variables (not committed)
└── README.md
```

---

## Live GitHub Telemetry

The `/api/github` route fetches real data on each request (cached for 1 hour):

| Metric               | Source                                              |
| --------------------- | ---------------------------------------------------- |
| Public repositories   | `GET /users/{username}`                              |
| Total stars           | `GET /users/{username}/repos` (summed)                |
| Weekly commits         | `GET /users/{username}/events/public` (last 7 days)   |
| Contribution streak   | Derived from consecutive active days in public events |

> Note: `events/public` only returns the most recent ~90 days / 300 events, so very long streaks may be undercounted — this is a GitHub REST API limitation, not a bug in this project.

---

## Deployment

The site is deployed on [Vercel](https://vercel.com/). To deploy your own copy:

1. Fork or clone this repository
2. Import it into Vercel
3. Add `GITHUB_TOKEN` (and any other required variables) under **Project Settings → Environment Variables**
4. Deploy — Vercel will build and serve it automatically on every push to `main`

---

## Content Sync

Profile details, skills, experience, and project data can optionally be served from a `portfolio-data.json` file hosted on GitHub, so content updates don't require a redeploy. If that file is unreachable, the site falls back to the bundled defaults automatically — the page never breaks due to a missing or malformed sync file.

---

## Roadmap

- [ ] Add contribution calendar heatmap visualization
- [ ] Add blog/notes section
- [ ] Add automated Lighthouse CI checks on PRs
- [ ] Add dark/light theme toggle

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

**Abdulgeni Abdulaziz**
Full Stack AI Engineer · RAG Systems · Workflow Automation
📍 Addis Ababa, Ethiopia

- Email: [abdulgeniabdulaziz@gmail.com](mailto:abdulgeniabdulaziz@gmail.com)
- GitHub: [@Abdulgeni](https://github.com/Abdulgeni)
- LinkedIn: [abdulgeni-abdulaziz](https://www.linkedin.com/in/abdulgeni-abdulaziz-7bb360401)
- Portfolio: [abdulgeni-abdulaziz.vercel.app](https://abdulgeni-abdulaziz.vercel.app)

<div align="center">

⭐ If this project was useful as a reference, consider starring the repo.

</div>
