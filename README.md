<<<<<<< HEAD
# Abdulgeni Abdulaziz — Portfolio (Next.js)

This is your bilingual (EN/AR, with RTL) portfolio, converted from the original Vite + Express build into Next.js 15 (App Router, TypeScript). All the original features are preserved: theme toggle, keyboard shortcuts, back-to-top, animated section separators, live GitHub telemetry, the Gemini-powered chat assistant, and the print-friendly résumé stylesheet.

## Run locally

```bash
npm install
cp .env.local.example .env.local   # then fill in real keys
npm run dev
```

Open http://localhost:3000

## Environment variables

- `GEMINI_API_KEY` — powers the portfolio chat assistant (`/api/chat`).
- `RESEND_API_KEY` — powers the contact form (`/api/contact`).
- `CONTACT_TO_EMAIL` — optional override for where contact form submissions are sent (defaults to Abdulgeni's email in `lib/data.ts`).

## What changed in this conversion

**Framework**
- Vite + Express + React 19 → Next.js 15 App Router + React 18.
- `server.ts`'s three routes became `app/api/github/route.ts`, `app/api/chat/route.ts`, `app/api/contact/route.ts`.
- `App.tsx`'s JSX split across `app/layout.tsx` (nav, chat widget, back-to-top, keyboard shortcuts — anything present on every page), `components/PageShell.tsx` (scroll progress bar + RTL-aware content offset), and `app/page.tsx` (the actual section list).
- `react-helmet-async` still drives the bilingual `<title>`/meta tags client-side (via `components/SiteMeta.tsx`), same as before; static fallback metadata is also set via Next's `generateMetadata`/`export const metadata` for SSR.
- `motion/react` imports switched to `framer-motion` (same API, matches the originally-specified tech stack).

**Bugs fixed**
1. **Services section showed an empty header.** `Services.tsx` was reading `t('ui.servicesSubtitle')` / `t('ui.servicesTitle')` — neither key exists in `translations.ts` (the real keys are `servicesHeaderLabel` / `servicesHeaderTitle`), so both rendered as empty strings.
2. **Duplicated section numbers.** `Experience.tsx`, `Education.tsx`, and `Contact.tsx` each hardcoded a prefix like `[ 04 / {t('ui.experienceHeaderLabel')} ]`, but the translation string itself already includes `"04 / ENGINEERING LOG"` — so the page showed `"04 / 04 / ENGINEERING LOG"`. Removed the hardcoded prefixes.
3. **Chat assistant was broken.** `server.ts` called `model: "gemini-3.5-flash"`, which isn't a real Gemini model name — every chat request would fail. Changed to `gemini-2.5-flash`.
4. **Contact form didn't send anything.** The old `/api/contact` route only did `console.log(...)` and always returned `{ success: true }` — the "MESSAGE TRANSMITTED" confirmation was cosmetic. It now actually sends the message via Resend, and returns a real error if that fails.
5. **GitHub contribution-streak calculation never advanced past "today."** The loop's early-continue skipped decrementing the date it was checking, so it re-checked today's date twice and always bailed out instead of walking backward through previous days. Fixed the date decrement so it correctly walks the last 15 days.

## Deploy

Push to GitHub, import into Vercel, set the environment variables above in the Vercel dashboard, deploy.
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 310d1b85f6650eb9992b428c73310bfb174ef3f6
