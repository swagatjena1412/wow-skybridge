# Skybridge

> Travel with confidence — manage your accessibility needs

A post-booking accessibility management PWA for elderly travelers. Built for the Ways of Work bootcamp.

**Live:** https://skybridge-ae.vercel.app

[![CI](https://github.com/swagatjena1412/wow-skybridge/actions/workflows/ci.yml/badge.svg)](https://github.com/swagatjena1412/wow-skybridge/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/swagatjena1412/wow-skybridge/branch/main/graph/badge.svg)](https://codecov.io/gh/swagatjena1412/wow-skybridge)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swagatjena1412_wow-skybridge&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=swagatjena1412_wow-skybridge)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=swagatjena1412_wow-skybridge&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=swagatjena1412_wow-skybridge)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=swagatjena1412_wow-skybridge&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=swagatjena1412_wow-skybridge)

## Live URLs

| Page | URL |
|---|---|
| **App (live)** | https://skybridge-ae.vercel.app |
| **PWA install page** | https://skybridge-ae.vercel.app/install |
| **Email preview / send** | https://skybridge-ae.vercel.app/email-preview |

## Code quality dashboard

**https://sonarcloud.io/project/overview?id=swagatjena1412_wow-skybridge**

Single source of truth for code quality, maintainability, security, and coverage. Updated automatically on every push to `main`.

## Reports

| Report | Where |
|---|---|
| **CI runs** (lint, test, deploy, scans) | [Actions tab](https://github.com/swagatjena1412/wow-skybridge/actions/workflows/ci.yml) |
| **Code scanning alerts** (CodeQL + Semgrep) | [Security → Code scanning](https://github.com/swagatjena1412/wow-skybridge/security/code-scanning) |
| **Dependency vulnerabilities** | [Security → Dependabot](https://github.com/swagatjena1412/wow-skybridge/security/dependabot) |
| **Test coverage dashboard** | [codecov.io](https://codecov.io/gh/swagatjena1412/wow-skybridge) |
| **SonarCloud quality dashboard** | [sonarcloud.io/project/overview](https://sonarcloud.io/project/overview?id=swagatjena1412_wow-skybridge) — quality gate, bugs, code smells, security hotspots, coverage, duplications |
| **Lighthouse / WCAG reports** | Per-run artifacts in the [latest CI run](https://github.com/swagatjena1412/wow-skybridge/actions/workflows/ci.yml) → "Lighthouse Audit" job → Artifacts (or the `storage.googleapis.com` URLs printed in the logs) |
| **Vercel deployments** | https://vercel.com/swjena-deloittes-projects/skybridge-ae |
| **User stories (live tracker)** | [GitHub Issues](https://github.com/swagatjena1412/wow-skybridge/issues?q=is%3Aissue+label%3Auser-story) — every story as a tracked issue with slice + status labels |
| **Roadmap board** | [Skybridge Roadmap project](https://github.com/users/swagatjena1412/projects/1) — kanban / table / timeline grouped by Slice |
| **Project plan** | [PROJECT-PLAN.md](./PROJECT-PLAN.md) |
| **User stories (canonical doc)** | [USER-STORIES.md](./USER-STORIES.md) |
| **Screen mockups** | [MOCKUPS.md](./MOCKUPS.md) |

## Tech stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** + shadcn/ui
- **PWA** with service worker, installable on iOS & Android
- **WCAG 2.2 compliant** — 48dp touch targets, focus-visible, plain language

## Quality & security

| Concern | Tool | Workflow |
|---|---|---|
| All quality gates | Single workflow with parallel jobs | `.github/workflows/ci.yml` |

The workflow runs six jobs in parallel:

- **`Lint, Test & Coverage`** — Vitest + Codecov + npm audit (BLOCKING — deploy waits on this)
- **`CodeQL Security Scan`** — runs in parallel, reports independently, never blocks deploy
- **`Semgrep Security Scan`** — runs in parallel, reports independently, never blocks deploy
- **`Lighthouse Audit (WCAG 2.2 AA)`** — runs in parallel, reports independently, never blocks deploy
- **`SonarCloud Quality Scan`** — runs after lint-and-test (uses its coverage), reports to [SonarCloud](https://sonarcloud.io/project/overview?id=swagatjena1412_wow-skybridge), never blocks deploy
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
