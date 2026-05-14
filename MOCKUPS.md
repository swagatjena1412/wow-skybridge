# Skybridge — Screen Mockups (Accessibility Slice)

**Platform:** PWA · Mobile (375px) · 6 screens

---

## Screen Flow

```
My Trips → Booking Detail → Manage Accessibility → Review Changes → Confirmation
                                  ↑ (back)              ↑ (back)
```

---

## Screen 1 — My Trips (Entry Point)

```
┌─────────────────────────────────────┐
│  9:41                    Skybridge  │  ← status bar
├─────────────────────────────────────┤
│  My Trips                           │  ← nav bar
├─────────────────────────────────────┤
│                                     │
│  Upcoming                           │  ← section label (secondary)
│                                     │
│  ┌─────────────────────────────┐   │
│  │ SK 2847 · Mon Jun 15  ✓ OK  │   │  ← CardHeader + Confirmed pill
│  ├─────────────────────────────┤   │
│  │  08:45          11:20       │   │
│  │  YYZ Toronto  → YVR Vanc.  │   │
│  │                             │   │
│  │  ─────────────────────────  │   │
│  │  [ 2 accessibility options ]│   │  ← info pill
│  │                             │   │
│  │  [ View Booking ]           │   │  ← primary CTA
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Key design notes:**
- Accessibility options count is immediately visible as a badge — Margaret can see at a glance something is set up
- "View Booking" is the only CTA — no clutter
- Confirmed pill reassures the user the booking is solid

---

## Screen 2 — Booking Detail (with Accessibility Section)

```
┌─────────────────────────────────────┐
│  9:41                    Skybridge  │
├─────────────────────────────────────┤
│  ← Back    Booking Details          │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │ SK 2847             ✓ OK    │   │
│  ├─────────────────────────────┤   │
│  │  08:45          11:20       │   │
│  │  YYZ Toronto  → YVR Vanc.  │   │
│  │  Mon, June 15, 2026         │   │
│  │  Ref: SKYB-4821             │   │
│  │  Margaret Thompson · 14A    │   │
│  └─────────────────────────────┘   │
│                                     │
│  ╔═════════════════════════════╗   │
│  ║ Accessibility Options  [2]  ║   │  ← blue border, prominent placement
│  ╠═════════════════════════════╣   │  ← filled section header
│  ║  ✓  Wheelchair to gate      ║   │
│  ║  ✓  Special meal: diabetic  ║   │
│  ║  ─────────────────────────  ║   │
│  ║  [ Manage Accessibility ]   ║   │  ← primary CTA in blue border
│  ╚═════════════════════════════╝   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Passenger details           │   │
│  ├─────────────────────────────┤   │
│  │  Margaret Thompson          │   │
│  │  Economy · Seat 14A         │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Key design notes:**
- Accessibility section has a **blue accent border** so it stands out immediately — Margaret doesn't have to search for it
- Section is positioned ABOVE passenger details (prioritized placement, US-001 AC)
- Options listed in plain language, checkmarks for each
- "Manage Accessibility" is the primary CTA — one tap to enter the management flow

---

## Screen 3 — Manage Accessibility

```
┌─────────────────────────────────────┐
│  9:41                    Skybridge  │
├─────────────────────────────────────┤
│  ← Back    Manage Accessibility     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │ ℹ Select the options that   │   │  ← info callout
│  │   apply. Saved on confirm.  │   │
│  └─────────────────────────────┘   │
│                                     │
│  MOBILITY                           │  ← category label (uppercase, secondary)
│  ┌─────────────────────────────┐   │
│  │ ☑  Wheelchair to gate       │   │  ← checked, blue border (already selected)
│  │    Assistance from check-in │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ ☐  Wheelchair on aircraft   │   │  ← unchecked
│  │    Aisle wheelchair to seat │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ ☐  Priority boarding        │   │
│  │    Board before general brd │   │
│  └─────────────────────────────┘   │
│  ─────────────────────────────────  │
│  HEARING & VISION                   │
│  ┌─────────────────────────────┐   │
│  │ ☐  Visual impairment asst.  │   │
│  │    Escort + audio guidance  │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ ☐  Sign language assist.    │  ⚠ │  ← advance notice warning pill
│  │    Agent at check-in + gate │   │
│  └─────────────────────────────┘   │
│                                     │
│  MEDICAL                            │
│  ... (scrollable)                   │
│                                     │
│  DIETARY                            │
│  ┌─────────────────────────────┐   │
│  │ ☑  Special meal: diabetic   │   │  ← checked
│  │    Low-sugar meal option    │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤  ← sticky footer
│  [ Review 1 change ]   [ Cancel ]   │  ← updates live as options change
└─────────────────────────────────────┘
```

**Key design notes:**
- Categories clearly separated with uppercase labels and dividers
- Selected options have blue border + filled background — visually distinct at a glance
- Advance notice badge on options that require early requesting (SC info)
- Sticky footer CTA updates live: "Review 1 change", "Review 3 changes", "No changes"
- Tap anywhere on the row (not just the checkbox) to select — large touch target
- Back button goes to Booking, not losing changes (changes persist in pending state)

---

## Screen 4 — Review Changes

```
┌─────────────────────────────────────┐
│  9:41                    Skybridge  │
├─────────────────────────────────────┤
│  ← Back    Review Changes           │
├─────────────────────────────────────┤
│                                     │
│  Please review your changes         │
│  before saving.                     │
│                                     │
│  ADDING                             │
│  ┌─────────────────────────────┐   │
│  ║ Priority boarding           │   │  ← blue left border
│  │ Board before general brd   │   │
│  └─────────────────────────────┘   │
│                                     │
│  REMOVING                           │
│  ┌─────────────────────────────┐   │
│  │ ~~Special meal: diabetic~~  │   │  ← strikethrough, grey
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ℹ You will receive an email │   │  ← info callout
│  │   confirmation once saved.  │   │
│  └─────────────────────────────┘   │
│                                     │
│  [ Confirm & Save ]  [ Edit ]       │
│                                     │
└─────────────────────────────────────┘
```

**Key design notes:**
- User sees exactly what will change before committing — no surprises
- Adding = blue left accent, Removing = strikethrough grey
- Email confirmation reassurance addresses Margaret's anxiety before she even saves
- "Edit" goes back to Manage screen, preserving all pending selections
- Confirmation dialog NOT used here (that's for individual removes in US-003) — review screen replaces it for batch saves

---

## Screen 5 — Confirmation (Success)

```
┌─────────────────────────────────────┐
│  9:41                    Skybridge  │
├─────────────────────────────────────┤
│                                     │
│             ┌─────┐                 │
│             │  ✓  │                 │  ← large circle, blue accent
│             └─────┘                 │
│                                     │
│    Your accessibility needs         │
│    are confirmed                    │  ← H2, centred
│                                     │
│    Your requests have been saved.   │
│    Our team has been notified.      │  ← secondary, smaller
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Accommodations on your booking     │
│  ┌─────────────────────────────┐   │
│  │ ✓  Wheelchair to gate       │   │
│  │    Assistance from check-in │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ ✓  Priority boarding        │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ What to expect at airport   │   │  ← card
│  ├─────────────────────────────┤   │
│  │ • Arrive 30 min earlier     │   │
│  │ • Check in at accessible    │   │
│  │   services desk             │   │
│  │ • Agent meets you at gate   │   │
│  └─────────────────────────────┘   │
│                                     │
│  [ Done ]  [ Email me a copy ]      │
│                                     │
└─────────────────────────────────────┘
```

**Key design notes:**
- Full screen success state — not a toast, not a banner. Margaret gets full acknowledgement (US-005 AC)
- All accommodations listed again as a receipt — she can screenshot this
- "What to expect" removes post-booking anxiety: tells her exactly what to do at the airport
- "Email me a copy" lets her share with family or keep in her inbox
- "Done" returns to My Trips — closes the loop cleanly

---

## WCAG 2.2 Annotations (applies to all screens)

| Element | Requirement | Implementation |
|---|---|---|
| All interactive rows | SC 2.5.8: min 24×24px target | Rows are min 48dp, full-width tap |
| All focused elements | SC 2.4.11: Focus visible | 2px blue outline on all interactive elements |
| Category labels | SC 1.4.3: 4.5:1 contrast | Secondary text token meets ratio |
| Selected option borders | SC 1.4.11: 3:1 UI contrast | Accent blue vs background |
| Checkbox state | SC 1.3.1: Info not colour-only | Checkmark symbol + border + fill |
| Error states | SC 3.3.1: Error identification | Plain language with fix instructions |
| Screen transitions | SC 2.3.3: Animation from interaction | `prefers-reduced-motion` disables transitions |
| All icons | SC 1.1.1: Non-text content | aria-label on all icon-only elements |

---

## Colour Usage (Tailwind tokens)

| Use | Token | Notes |
|---|---|---|
| Primary CTA | `bg-blue-600` | "Manage Accessibility", "Confirm & Save" |
| Selected option border | `border-blue-500` | Active accessibility option |
| Confirmed status | `text-green-600` | Flight confirmed, accommodations saved |
| Advance notice | `bg-amber-50 text-amber-700` | Warning pill on options needing lead time |
| Removed item | `text-gray-400 line-through` | Strikethrough on review screen |
| Success icon | `border-blue-500 text-blue-600` | Confirmation circle |
