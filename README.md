# Skybridge

> Travel with confidence — manage your accessibility needs

A post-booking accessibility management PWA for elderly travelers. Built for the Ways of Work bootcamp.

[![Deploy](https://github.com/swagatjena1412/wow-skybridge/actions/workflows/deploy.yml/badge.svg)](https://github.com/swagatjena1412/wow-skybridge/actions/workflows/deploy.yml)
[![Test & Coverage](https://github.com/swagatjena1412/wow-skybridge/actions/workflows/test.yml/badge.svg)](https://github.com/swagatjena1412/wow-skybridge/actions/workflows/test.yml)
[![CodeQL](https://github.com/swagatjena1412/wow-skybridge/actions/workflows/codeql.yml/badge.svg)](https://github.com/swagatjena1412/wow-skybridge/actions/workflows/codeql.yml)
[![Semgrep](https://github.com/swagatjena1412/wow-skybridge/actions/workflows/semgrep.yml/badge.svg)](https://github.com/swagatjena1412/wow-skybridge/actions/workflows/semgrep.yml)
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
| Tests | Vitest + Testing Library | `.github/workflows/test.yml` |
| Coverage | @vitest/coverage-v8 + Codecov | `.github/workflows/test.yml` |
| SAST | CodeQL + Semgrep | `.github/workflows/codeql.yml`, `semgrep.yml` |
| Dependencies | Dependabot + npm audit | GitHub native + `test.yml` |
| Deploy | Vercel via GitHub Actions | `.github/workflows/deploy.yml` |

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
