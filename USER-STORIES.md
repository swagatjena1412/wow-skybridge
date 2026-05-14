# Skybridge — User Stories by Slice

> Target segment: Elderly or Accessibility-Needing Travelers
> Persona: Margaret, 72 — The Cautious Planner
> Story format: As a [user], I want [action], so that [benefit].
> Acceptance criteria format: Given / When / Then.

---

## Baseline — Original app (no self-service)

**Context:** Accessibility accommodations can only be requested by phone or on the website. No mobile self-service exists.

| Metric | Value |
|---|---|
| CSAT | 1.4 |
| NPS | 2.2 |
| Call volume | 504 calls/day (wheelchair-related) |

---

## Initial Prototype — Multi-option self-service

**Scope:** View and edit all accessibility request types in one screen. Scope proved too wide for a single slice and resulted in mediocre usability scores.

| Metric | Value |
|---|---|
| CSAT | 2.8 |
| NPS | 3.2 |

---

## Slice 1 — View and edit wheelchair requests

**Scope:** Thin slice. Wheelchair to gate + Wheelchair on aircraft only.

| Metric | Value |
|---|---|
| CSAT | 3.7 |
| NPS | 3.3 |
| Post-launch call volume | TBC |

### US-1.1 — View current wheelchair accommodations

> As an elderly traveler, I want to see at a glance whether a wheelchair has been arranged for my trip, so that I can confirm my needs are met without calling support.

**Acceptance criteria:**
- Given I open my booking, a dedicated "Accessibility Options" section is visible above the fold on the booking detail screen
- The section lists "Wheelchair to gate" and/or "Wheelchair on aircraft" if selected, using plain-language labels
- If neither is selected the section shows "No accessibility options added" with a prompt to add
- Text meets WCAG 2.2 AA — minimum 16px body, 4.5:1 contrast ratio

### US-1.2 — Request wheelchair to gate

> As an elderly traveler, I want to request a wheelchair from check-in to my departure gate from my phone, so that I do not have to call support.

**Acceptance criteria:**
- Given I tap "Manage Accessibility", "Wheelchair to gate" appears as a selectable option
- Tapping the row toggles selection on (checkmark visible, teal border applied)
- Tapping "Review changes" shows a before/after summary before saving
- After confirming, the booking detail screen reflects the new selection immediately

### US-1.3 — Request wheelchair on aircraft

> As an elderly traveler, I want to request an aisle wheelchair to reach my seat on the aircraft, so that I can board without physical difficulty.

**Acceptance criteria:**
- "Wheelchair on aircraft" is a separate, independently selectable option on the Manage screen
- Description clearly states coverage applies to both boarding and deboarding
- Can be selected independently of or alongside "Wheelchair to gate"
- Both options appear on the confirmation receipt if both are selected

### US-1.4 — Remove a wheelchair request

> As a traveler, I want to remove a previously added wheelchair request if my needs have changed, so that airport resources are not reserved unnecessarily.

**Acceptance criteria:**
- Given a wheelchair option is currently selected, I can deselect it on the Manage screen
- The Review screen shows it under "Removing" with strikethrough text
- After confirming, the booking detail no longer lists the removed option

---

## Slice 2 — Add guided assistance option

**Scope:** Extend the Manage screen with "Guided assistance" under a new "Personal Assistance" category.

### US-2.1 — Request guided assistance

> As a traveler with a visual impairment, I want to request a Skybridge agent to escort me through security and to the gate, so that I can navigate the airport independently without relying on companions.

**Acceptance criteria:**
- Given I open Manage Accessibility, "Guided assistance" appears under a "Personal Assistance" category heading
- Description reads: "An agent will accompany you through security, the airport, and to your gate"
- Option is selectable, saveable, and visible on the booking detail and confirmation screens
- No advance-notice badge is shown (no early booking requirement)

---

## Slice 3 — Separate personal assistance category

**Scope:** Restructure the Manage screen into needs-based category groups.

**Combined metrics (Slices 2 & 3):**

| Metric | Value |
|---|---|
| CSAT | 6.3 |
| NPS | 5 |

### US-3.1 — Browse options by category

> As an elderly traveler, I want accessibility options grouped by type of need, so that I can quickly find the right option without scanning an undifferentiated list.

**Acceptance criteria:**
- Given I open Manage Accessibility, options are grouped under labelled category headings
- Current categories: "Mobility & Wheelchair" and "Personal Assistance"
- Category headings are visually distinct (uppercase, teal accent, bold)
- Adding a new option to a new category in the data file automatically creates the heading — no UI code change required

---

## Between slices — Terminology clarification

**Scope:** Non-feature update. Label and description copy improved based on user research feedback.

### US-BT.1 — Clear boarding and deboarding language

> As a traveler, I want wheelchair option descriptions to clearly state that assistance covers both boarding and deboarding, so that I am not surprised at my destination.

**Acceptance criteria:**
- "Wheelchair on aircraft" description updated to reference both boarding and deboarding explicitly
- "Wheelchair to gate" description remains focused on ground-side airport navigation
- Labels reviewed and approved by accessibility subject-matter expert before release

---

## Slice 4 — Confirmation page: A/B test

**Mechanism:** Option C — localStorage random assignment. On first app launch, a 50/50 coin flip assigns `skybridge-variant: "a" | "b"` to localStorage. The same user always sees the same variant across sessions. Variant is tagged on all CSAT/NPS measurement events.

**Flavor A:** No confirmation page — save redirects straight back to Booking Detail.
**Flavor B:** Confirmation page retained, but redesigned to clearly show what was *added* vs what was already saved — replacing the misleading "NEW" badge with an "Added" pill and a delta summary.

### US-4.1 — Flavor A: Save without a confirmation page

> As an elderly traveler, I want my accessibility selections saved immediately and see the result on my booking straight away, so that I don't have to navigate through an extra screen.

**Acceptance criteria:**
- Given I am on Flavor A, when I tap "Review changes" and then "Confirm & Save" on the Review screen, I am redirected directly to Booking Detail (not /confirmation)
- The Accessibility section on Booking Detail immediately reflects the updated selections
- A non-intrusive success banner ("Saved") appears briefly at the top of the booking detail screen and auto-dismisses after 2 seconds
- The banner is announced to screen readers via `aria-live="polite"`

### US-4.2 — Flavor B: Redesigned confirmation showing what changed

> As an elderly traveler, I want the confirmation screen to clearly show me which options I just added (vs what was already there), so that I am not confused by labels that look like new product features.

**Acceptance criteria:**
- Given I am on Flavor B, after confirming I land on the existing /confirmation route
- Each option is shown in one of two states:
  - **"Added this session"** — teal "Added" pill, green-tinted row
  - **"Previously saved"** — plain checkmark, no pill
- A delta summary line at the top reads: "X option(s) added" — no use of the word "NEW"
- "Done" returns to My Trips

### US-4.3 — Variant assignment and measurement

**Acceptance criteria:**
- On first app launch (no localStorage key present) the variant is assigned randomly with 50/50 probability
- Assignment is stored to `localStorage` key `skybridge-variant` and used for all subsequent sessions
- The active variant is readable anywhere in the app via a `useVariant()` hook
- Every CSAT/NPS event (post-save) is tagged with `variant: "a"` or `variant: "b"` so results can be split in analysis

---

## Future slice — Static accessibility information + additional options

**Scope:** Two parallel additions for the next iteration: static airport resource information and an expanded set of accessibility accommodation options beyond wheelchair and guided assistance.

**Metrics target:** CSAT and NPS to be measured post-launch.

### US-F.1 — Access airport accessibility resource information

> As an elderly traveler, I want to find clear information about where and how to access accessibility services at the airport, so that I know exactly what to do when I arrive.

**Acceptance criteria:**
- An informational section is reachable from the booking detail or post-confirmation screen
- Content covers: location of accessible services desk, recommended arrival time, who to contact
- Content is static — no dynamic API call required to display
- Available offline once the PWA has been installed and cached
- Text meets WCAG 2.2 AA (16px minimum, 4.5:1 contrast)

### US-F.2 — Static information does not interrupt the booking flow

> As a traveler, I want airport information available when I seek it out, not inserted into the main accommodation flow, so that the core task stays fast.

**Acceptance criteria:**
- Informational content is behind a secondary link or tab — not inline on the Manage or Confirmation screens
- "Done" on confirmation returns directly to My Trips, not to the info page

### US-F.3 — Additional accessibility options available

> As a traveler with a need not currently covered, I want additional accessibility accommodation types to be available on the Manage screen, so that I can request all the support I need in one place.

**Acceptance criteria:**
- Additional options are introduced in new or existing categories as informed by user research
- Each new option has a plain-language label and description following the existing format
- Options are added via the data file (`lib/data.ts`) with no UI code changes required
- WCAG 2.2 compliance is maintained for any new interactive elements

---

## Backlog (future slices)

| Priority | Story | Rationale |
|---|---|---|
| High | 24h pre-flight notification reminding user of their accommodations | Reduce airport confusion and missed check-in steps |
| Medium | Companion / family member can co-manage accommodations | Caregiver use case observed in elderly user research |
| Low | Integration with live Passenger Service System (PSS) | Replace mock data with real bookings from airline backend |

---

## Metrics summary

| Slice | Key capability | CSAT | NPS |
|---|---|---|---|
| Baseline | Phone-only | 1.4 | 2.2 |
| Initial prototype | All options, broad scope | 2.8 | 3.2 |
| Slice 1 | Wheelchair to gate + on aircraft | 3.7 | 3.3 |
| Slices 2 & 3 | Guided assistance + category grouping | 6.3 | 5 |
| Slice 4 | Confirmation page A/B test | TBD | TBD |
| Future slice | Static airport info + additional options | TBD | TBD |
