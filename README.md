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
