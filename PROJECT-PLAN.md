# Skybridge — Project Plan

## Overview

Skybridge is a post-booking accessibility management PWA built for the Deloitte Ways of Work bootcamp. The product addresses a key pain point for elderly and accessibility-needing travelers: the inability to view, add, or modify accessibility accommodations from the airline mobile app after booking.

**How Might We:** How might we give elderly mobile users full visibility and control over their accessibility accommodations — without calling support?

---

## Development process — mandatory steps for every change

Every feature, fix, or UX improvement must follow this process before any code is written or committed. No exceptions.

### Step 1 — Write or update the user story

Before making any change, open [USER-STORIES.md](USER-STORIES.md) and either:
- Add a new story under the relevant slice heading, or
- Update an existing story if the change modifies acceptance criteria

Each story must follow the standard format:
```
### US-[slice].[number] — [Short title]

> As a [user], I want [action], so that [benefit].

**Acceptance criteria:**
- Given [context], when [action], then [outcome]
- [additional criteria as needed]
```

### Step 2 — Confirm the story is aligned to a slice

Every story must belong to a named slice in the roadmap table in this file. If the change is a standalone fix or enhancement, assign it to the nearest relevant slice or create a new named slice row.

### Step 3 — Update the slice roadmap table

If a new slice is introduced, add a row to the Slice roadmap table in this file with:
- Slice name
- Capability description
- CSAT / NPS targets (if known) or TBD
- Status (Planned / In progress / Built)

### Step 4 — Implement the change

Only after Steps 1–3 are documented:
- Write the code
- Run tests (`npm test`)
- Commit with a message that references the user story number: `feat: US-1.2 — add wheelchair to gate selection`

### Step 5 — Mark the story as done

After the change is deployed:
- Update the slice's Status to **Built** in the roadmap table
- If CSAT / NPS data becomes available, fill in the metrics

---

### Quick checklist

```
[ ] User story written or updated in USER-STORIES.md
[ ] Story belongs to a named slice
[ ] Slice roadmap table updated (new slice or status change)
[ ] Code written and tests passing
[ ] Commit message references the US number
[ ] Status marked Built after deploy
```

---

## Live links

| Resource | URL |
|---|---|
| Live app | https://skybridge-ae.vercel.app |
| Install page | https://skybridge-ae.vercel.app/install |
| Email preview | https://skybridge-ae.vercel.app/email-preview |
| GitHub repo | https://github.com/swagatjena1412/wow-skybridge |
| Vercel project | https://vercel.com/swjena-deloittes-projects/skybridge-ae |

---

## Target segment

**Elderly or Accessibility-Needing Travelers**

**Persona: Margaret, 72 — The Cautious Planner**
- Retired school teacher, travels 3–4x/year to visit grandchildren
- Uses a rollator walker, occasionally needs a wheelchair at the airport
- Booked her flight on the website with help from her daughter
- Now on her phone, wants to confirm her wheelchair request is in the system
- Low digital confidence; needs large text, clear labels, minimal steps, reassuring feedback

---

## Business drivers

| Driver | Goal |
|---|---|
| Self-service completion rate | Increase top travel task completion (book / manage / check-in / disruption) |
| Support contact rate | Reduce calls, chats, emails per trip/booking |
| Digital CSAT | Improve satisfaction scores for key digital tasks |
| Brand value | Attract new customers through superior mobile experience |

---

## Slice roadmap

See [USER-STORIES.md](USER-STORIES.md) for full user stories and acceptance criteria per slice.

| Slice | Capability | CSAT | NPS | Status |
|---|---|---|---|---|
| Baseline | Phone-only, no self-service | 1.4 | 2.2 | Reference |
| Initial prototype | All options, broad scope — too wide, mediocre usability | 2.8 | 3.2 | Reference |
| Slice 1 | Wheelchair to gate + on aircraft — view & edit. Call volume: 504/day pre-launch | 3.7 | 3.3 | Built |
| Slice 2 | Add guided assistance option (for visually impaired) | — | — | Built |
| Slice 3 | Separate personal assistance category. Boarding + deboarding terminology added in between slices | 6.3 (2&3) | 5 (2&3) | Built |
| Slice 4 | Direct save → confirmation page (intermediate Review screen removed) | TBD | TBD | Built |
| Future | Static accessibility info + additional accommodation options | TBD | TBD | Planned |
| Slice # | Further iterations TBD based on data | TBD | TBD | Future |

---

## User journey (thin slice scope)

```
[Booking confirmed] → Open Skybridge app → My Trips
         ↓
   View Booking Details
         ↓
   Accessibility Section (what's selected, X/Y count)
         ↓
   Tap "Manage Accessibility"
         ↓
   Select / deselect options by category
         ↓
   Review changes (before/after diff)
         ↓
   Confirm & Save
         ↓
   Confirmation screen (receipt + Done)
```

---

## Screen inventory

| Screen | Route | User stories |
|---|---|---|
| My Trips | `/` | US-1.1 |
| Booking Detail | `/booking` | US-1.1, US-1.2, US-1.3 |
| Manage Accessibility | `/manage` | US-1.2, US-1.3, US-1.4, US-2.1, US-3.1 |
| Review & Confirm | `/review` | US-1.2, US-1.3, US-1.4 |
| Confirmation | `/confirmation` | US-4.1 |
| Install guide | `/install` | — (channel, not feature) |
| Email preview | `/email-preview` | — (demo tooling) |

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| PWA | Service worker, manifest, installable on iOS & Android |
| State | React context + localStorage (persists selections across sessions) |
| Email | Nodemailer (Gmail SMTP) — 3-day pre-trip reminder |
| Hosting | Vercel |
| CI/CD | GitHub Actions → Vercel deploy |

---

## WCAG 2.2 compliance approach

| Layer | Responsibility |
|---|---|
| App (code) | 4.5:1 contrast, 48dp touch targets, focus-visible, ARIA, plain language, no colour-only information |
| OS (device) | Font size (rem units scale), dark mode (prefers-color-scheme), reduce motion, pinch-to-zoom (maximumScale 5) |
| Testing | vitest-axe component assertions + Lighthouse CI full-page audit (>= 0.95 a11y score) |

---

## Design principles

- **Large tap targets** — minimum 48dp, generous padding
- **Plain language** — "Wheelchair to gate" not "PWD assistance code"
- **Progressive disclosure** — most common options first; categories separate concerns
- **Reassurance at every step** — confirmations, summaries, "what happens next"
- **Undo-friendly** — removing an option shows a review step before saving
- **Light and dark mode** — follows OS setting; in-app toggle available

---

## Quality gates

| Concern | Tool | Notes |
|---|---|---|
| Tests | Vitest + Testing Library | 93 tests across 15 files |
| Coverage | @vitest/coverage-v8 + Codecov | 99% line coverage |
| SAST | CodeQL + Semgrep | Weekly + per-PR (currently disabled for rapid iteration) |
| WCAG | vitest-axe + Lighthouse CI | Currently disabled for rapid iteration |
| Dependencies | Dependabot + npm audit | Always on |

---

## Out of scope (this slice)

- Initial booking flow and payment
- Seat selection
- Real-time chat / agent escalation
- Airport wayfinding / accessibility maps
- Companion / caregiver co-management
- Live PSS (Passenger Service System) integration

---

## Reports

| Report | Location |
|---|---|
| CI / deploy runs | [GitHub Actions](https://github.com/swagatjena1412/wow-skybridge/actions) |
| Security alerts | [GitHub Security tab](https://github.com/swagatjena1412/wow-skybridge/security/code-scanning) |
| Coverage dashboard | [Codecov](https://codecov.io/gh/swagatjena1412/wow-skybridge) |
| User stories | [USER-STORIES.md](USER-STORIES.md) |
| Screen wireframes | [MOCKUPS.md](MOCKUPS.md) |
