# Skybridge — Accessibility Management Slice: Artifacts & Plan

## Deployment

| | |
|---|---|
| **Live demo URL** | https://skybridge-ae.vercel.app |
| **Repository** | https://github.com/Deloitte-US/pxe-bootcamp-skybridge |
| **Hosting** | Vercel (auto-deploys on `git push` to `main`) |
| **Install on phone** | Open URL in mobile browser → "Add to Home Screen" |



---

## Brand Identity

**Product:** Sky Bridge AeroEase
**Taglines:** "Travel with confidence" · "Easy journey, start to finish" · "From doorstep to destination"

| Token | Light mode | Dark mode | Usage |
|---|---|---|---|
| Primary navy | `#1B3252` | `#1B3252` | Buttons, nav bar, header |
| Teal accent | `#2A7A8A` | `#3AA8B5` | Links, borders, selected states, icons |
| Teal tint (bg) | `#EAF5F7` | `#1A3040` | Selected option background, callouts |
| Cream text | `#E8D5B8` | `#E8D5B8` | Text on navy backgrounds |
| Body text | `#141414F0` | `#E4E4E4EB` | Standard text (OS token) |
| Background | `#FCFCFC` | `#181818` | App background (OS token) |

**Brand pillars (feature values to surface in UI copy):**
- Comfort clarity — users always know their status
- Guided assistance — help is visible at every step
- Accessible booking — full self-service without calling support
- Airport wayfinding — confidence from doorstep to gate

**Logo mark:** Circle with diagonal slash (aviation compass / accessibility symbol) — use in nav header.

---

## Problem Statement

Elderly and accessibility-needing travelers can book flights on the website and request accessibility accommodations there, but the mobile app provides **no way to view, modify, or add accessibility accommodations** after booking. This forces users to call support, increasing contact rate and reducing digital CSAT.

**How Might We (HMW):** How might we give elderly mobile users full visibility and control over their accessibility accommodations — without calling support?

---

## Business Drivers

| Driver | Goal |
|--------|------|
| Self-service completion rate | Increase top travel task completion (book / manage / check-in / disruption) |
| Support contact rate | Reduce calls, chats, and emails per trip/booking |
| Digital CSAT | Improve satisfaction scores for key digital tasks |
| Brand value | Attract new customers through superior mobile experience |

---

## Target Segment

**Elderly or Accessibility-Needing Travelers**

---

## Scope of This Slice

- **Entry point:** User has already completed a booking
- **Out of scope:** Initial booking flow, payment, seat selection (non-accessibility)
- **In scope:**
  - View booking with accessibility accommodations clearly surfaced
  - See all currently selected accessibility options
  - Modify existing selections
  - Add new accessibility options

---

## Persona

**Margaret, 72 — The Cautious Planner**

- Retired school teacher; travels 3–4x/year to visit grandchildren
- Uses a rollator walker; occasionally needs a wheelchair at the airport
- Booked her flight on the website with help from her daughter
- Now on her phone, wants to confirm her wheelchair request is in the system and add a meal preference
- Low digital confidence; gets anxious if she can't find confirmation
- Needs: large text, clear labels, minimal steps, reassuring feedback

---

## User Journey (This Slice)

```
[Booking Confirmed] → Open App → My Trips
        ↓
  View Booking Details
        ↓
  Accessibility Section (what's selected)
        ↓
  Tap "Manage Accessibility"
        ↓
  View full list of options (selected + available)
        ↓
  Toggle / Add options → Confirm
        ↓
  Success confirmation (summary of what's saved)
```

---

## User Stories

### Epic: Accessibility Accommodation Management (Post-Booking)

---

**US-001 — View Accessibility Summary in Booking**

> As an elderly traveler, I want to see my accessibility accommodations clearly on my booking summary, so that I can quickly confirm my needs are captured without searching.

**Acceptance Criteria:**
- Given I open a booking, then I see a dedicated "Accessibility" section within the booking detail screen
- The section lists each selected accommodation with a plain-language label (e.g. "Wheelchair to gate", "Special meal: diabetic")
- If no accommodations are selected, the section shows "No accessibility options added" with a prompt to add
- Section is visible without scrolling past a fold (prioritized placement)
- Text meets WCAG AA minimum (16px+ body, high contrast)

---

**US-002 — View All Available Accessibility Options**

> As a traveler with accessibility needs, I want to browse all available accessibility accommodations the airline offers, so that I know what I can request.

**Acceptance Criteria:**
- Given I tap "Manage Accessibility", I see a categorized list of all available options
- Categories: Mobility, Hearing & Vision, Medical, Dietary, Other
- Each option shows: name, short description, and whether it requires advance notice
- Currently selected options are visually distinct (checked / highlighted)
- Options unavailable for my flight/route are shown greyed out with a reason (e.g. "Not available on this route")

---

**US-003 — Modify Existing Accessibility Accommodations**

> As a traveler with accessibility needs, I want to remove or change an accessibility option I previously selected, so that I can keep my accommodations accurate if my needs change.

**Acceptance Criteria:**
- Given I am on the manage accessibility screen, I can deselect an existing accommodation
- A confirmation dialog appears before removing ("Are you sure you want to remove Wheelchair to gate?")
- After confirming, the option is removed and the booking summary reflects the change
- User receives in-app confirmation ("Wheelchair to gate has been removed from your booking")
- Change is reflected immediately in the booking view (optimistic update with error rollback)

---

**US-004 — Add New Accessibility Accommodations**

> As an elderly traveler, I want to add accessibility options to my existing booking from my phone, so that I don't have to call customer support.

**Acceptance Criteria:**
- Given I am on the manage accessibility screen, I can select any available option not already chosen
- Some options may require additional input (e.g. "Medical oxygen" → prompt for flow rate / documentation note)
- I can add multiple options in one session before saving
- Tapping "Save Changes" shows a summary of all pending changes before confirming
- After saving, booking summary is updated with all new selections
- An email/push confirmation is sent summarizing the accommodations on file

---

**US-005 — Confirmation & Peace of Mind**

> As an elderly traveler, I want clear confirmation that my accessibility requests have been saved, so that I feel confident my needs will be met at the airport.

**Acceptance Criteria:**
- After saving, a full-screen success state is shown (not just a toast) listing all accommodations now on file
- A "What to expect" section explains next steps (e.g. "Arrive 30 min early, check in at accessible services desk")
- User can share/email the accessibility summary to themselves or a family member
- A reminder notification is offered: "Remind me 48h before my flight"

---

## Screen Inventory

| Screen | Stories | Description |
|--------|---------|-------------|
| My Trips | — | Entry point; list of upcoming trips |
| Booking Detail | US-001 | Includes dedicated Accessibility section |
| Manage Accessibility | US-002, US-003, US-004 | Categorized list of all available options |
| Option Detail (modal) | US-004 | Extra input for options requiring detail (e.g. oxygen) |
| Review Changes | US-004 | Summary of pending changes before saving |
| Confirmation | US-005 | Full-screen success state with accommodations list |

---

## Key Design Principles for This Slice

- **Large tap targets** — minimum 48×48dp, generous padding
- **Plain language** — no jargon; labels like "Wheelchair to gate" not "PWD assistance code"
- **Progressive disclosure** — show the most common options first; "More options" expands the rest
- **Reassurance at every step** — confirmations, summaries, and "what happens next" copy
- **Undo-friendly** — removing an option always asks for confirmation
- **WCAG AA compliance** — 16px+ body text, 4.5:1 contrast ratio minimum
- **Light and dark mode** — full design coverage for both; the app respects `prefers-color-scheme` from the OS and must meet WCAG 2.2 contrast ratios in both modes

### Light / Dark Mode Design Tokens

| Token | Light | Dark |
|---|---|---|
| Background (editor) | `#FCFCFC` | `#181818` |
| Background (chrome/nav) | `#F8F8F8` | `#141414` |
| Primary text | `#141414F0` | `#E4E4E4EB` |
| Secondary text | `#141414BD` | `#E4E4E48D` |
| Accent (interactive) | `#3685BF` | `#599CE7` |
| Stroke (borders) | `#14141433` | `#E4E4E433` |
| Fill (selected bg) | `#14141424` | `#E4E4E41E` |

**Contrast check:** Accent blue (`#3685BF` on white, `#599CE7` on `#181818`) both clear WCAG AA 4.5:1 for text. Primary text clears 4.5:1 on both background values.

**Implementation:** Tailwind `dark:` variant classes throughout; `prefers-color-scheme: dark` media query on the PWA; no in-app toggle required (OS setting drives it).

---

## Platform Decision: PWA

**Chosen approach: Progressive Web App (Next.js)**

Stakeholders can download and use the app via a link in their email — no App Store, no TestFlight, no device registration required.

| Requirement | How PWA Meets It |
|---|---|
| Stakeholder downloads & uses | "Add to Home Screen" from browser — app icon on phone |
| Email notification → app | Link in email opens PWA directly; deep links to booking |
| WCAG 2.2 compliance | Web-native tooling (axe, Lighthouse, Radix UI) — easiest to audit |
| Works iOS + Android | Single codebase, one URL |
| Instant updates | No re-download; push a fix minutes before a demo |
| No App Store account needed | Hosted on Vercel |

**Why not native / App Clip / Expo Go:**
- TestFlight requires Apple developer account + days of review
- App Clips require a parent native app — weeks of setup
- Expo Go requires stakeholders to install Expo Go first — breaks the demo story

---

## Tech Stack

```
Next.js 14 (App Router)   → framework, routing, server components
Tailwind CSS              → styling, responsive mobile-first layout
Radix UI / shadcn/ui      → accessible component primitives (WCAG 2.2 built-in)
Firebase Auth             → email/Google sign-in
Firebase Firestore        → booking + accommodation data (mock seed data)
Resend                    → transactional email with deep link to booking
Vercel                    → hosting, instant preview deploys
next-pwa                  → service worker, offline support, installability
```

---

## Email → App Flow

```
Booking confirmed (mock trigger)
        ↓
Resend sends email: "Your booking is ready — manage your accessibility needs"
        ↓
CTA button: "View My Booking" → https://skybridge.vercel.app/booking/[id]
        ↓
Mobile browser opens → PWA loads (full screen, no browser chrome)
        ↓
Banner: "Add to your home screen for the best experience"
        ↓
App icon on home screen — feels native
```

---

## WCAG 2.2 Compliance Approach

WCAG compliance is split across two layers:

### Layer 1 — Built Into the App (Code)

These are the developer's responsibility and must be coded correctly regardless of device settings:

- **Contrast** — 4.5:1 for text (SC 1.4.3), 3:1 for UI components (SC 1.4.11) — enforced via Tailwind design tokens
- **Touch targets** — minimum 24×24px per SC 2.5.8 (new in 2.2); we use 48×48dp in practice
- **Focus visible** — all interactive elements have a visible focus indicator (SC 2.4.11, new in 2.2)
- **No colour-only information** — selected accommodations use checkmark + colour, never colour alone
- **ARIA roles and live regions** — screen reader announces "Wheelchair to gate added to your booking"
- **Plain language labels** — "Wheelchair to gate" not internal codes
- **Confirmation dialogs** — before destructive actions (SC 3.3.4)
- **Skip-to-content link** — for keyboard and assistive tech navigation
- **Error messages** — explain what went wrong and how to fix it (SC 3.3.1, 3.3.3)

### Layer 2 — Respected From Device Settings (OS-level)

The app honours what users have already configured in their phone's accessibility settings. No custom in-app toggles needed:

| Device Setting | App Response |
|---|---|
| Large Text / Font Size | `rem` units throughout — scales automatically |
| High Contrast (iOS) | `@media (prefers-contrast: more)` — higher contrast theme served |
| Reduce Motion | `@media (prefers-reduced-motion: reduce)` — animations disabled |
| Dark Mode | `@media (prefers-color-scheme: dark)` — accessible dark palette |
| VoiceOver / TalkBack | Radix UI ARIA structure makes content readable automatically |
| Display Zoom | Responsive layout reflows gracefully |

**No custom in-app accessibility settings panel** — the OS handles this better, and building one creates a maintenance burden.

---

## Out of Scope (Future Slices)

- Requesting accommodations during initial booking
- Real-time chat/agent escalation from the accessibility screen
- Airport wayfinding / accessibility maps
- Companion/caregiver co-management of booking
