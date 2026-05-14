# Skybridge

> Travel with confidence — manage your accessibility needs

A post-booking accessibility management PWA for elderly travelers. Built for the Ways of Work bootcamp.

[![CI](https://github.com/swagatjena1412/wow-skybridge/actions/workflows/ci.yml/badge.svg)](https://github.com/swagatjena1412/wow-skybridge/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/swagatjena1412/wow-skybridge/branch/main/graph/badge.svg)](https://codecov.io/gh/swagatjena1412/wow-skybridge)

## Live demo

**https://skybridge-ae.vercel.app**

## Tech stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** + shadcn/ui
- **PWA** with service worker, installable on iOS & Android
- **WCAG 2.2 compliant** — 48dp touch targets, focus-visible, plain language

## Quality & security

| Concern | Tool | Workflow |
|---|---|---|
| All quality gates | Single workflow with parallel jobs | `.github/workflows/ci.yml` |

The workflow runs five jobs in parallel:

- **`Lint, Test & Coverage`** — Vitest + Codecov + npm audit (BLOCKING — deploy waits on this)
- **`CodeQL Security Scan`** — runs in parallel, reports independently, never blocks deploy
- **`Semgrep Security Scan`** — runs in parallel, reports independently, never blocks deploy
- **`Lighthouse Audit (WCAG 2.2 AA)`** — runs in parallel, reports independently, never blocks deploy
- **`Deploy to Vercel`** — production on `main`, preview on PRs. Only runs after `Lint, Test & Coverage` succeeds.

Triggered on: `push` to main, every PR, and a weekly Monday 03:21 UTC cron (so security scans stay fresh even when nothing was pushed).

## Local development

```bash
npm install
npm run dev          # Start dev server at http://localhost:3000
npm test             # Run tests once
npm run test:watch   # Watch mode
npm run test:coverage # With coverage report
npm run lint         # ESLint
```

## Email feature (3-day reminder)

Pre-trip email triggers 3 days before travel, surfacing the new accessibility self-service feature.

- Live preview: `/email-preview` — see the email and send a sample
- Install page: `/install` — platform-aware PWA install flow
- API: `POST /api/send-email` — sends via Gmail SMTP

Requires `GMAIL_USER` and `GMAIL_APP_PASSWORD` env vars in Vercel.

See [`PLAN.md`](./PLAN.md) for the full design, persona, and user stories.
