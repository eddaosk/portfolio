# Story 2.6: Side Navigation & Landing Page Accessibility

Status: done

## Story

As an investor on desktop,
I want a sticky side navigation that shows my position in the page and lets me jump to any section,
So that I can navigate non-linearly without losing my place — and as a keyboard user, I want the entire page to be fully operable without a mouse.

## Acceptance Criteria

**AC1 — Side navigation visible on desktop (FR2, UX-DR4):**
Given the landing page on a desktop viewport (`lg`+ / 1024px+)
When the page is scrolled
Then a sticky side navigation is visible with 6 labelled anchors corresponding to the 6 landing page sections (`intro-animation`, `hero`, `the-gap`, `where-vasuqi-fits`, `what-its-built-to-change`, `how-it-works`)

**AC2 — Hover-reveal labels (FR3):**
Given the side navigation
When the visitor hovers over a side nav item
Then the section label text is revealed; when not hovered, labels are hidden and only the anchor indicator (dot/line) is shown

**AC3 — Active section tracking:**
Given the side navigation
When the visitor scrolls the page
Then the active section is indicated in the side nav — the current section's anchor is visually distinguished; the active state updates as the visitor scrolls between sections (via IntersectionObserver)

**AC4 — Hidden on mobile/tablet (UX-DR4):**
Given the landing page on a viewport below `lg` (mobile/tablet)
When rendered
Then the side navigation is hidden (`display: none` or equivalent Tailwind `hidden lg:flex` classes); section navigation on mobile is replaced by natural scroll

**AC5 — Keyboard focus order (FR30, NFR6, NFR7, UX-DR11):**
Given all interactive elements on the landing page (nav links, CTA button, side nav anchors, video dismiss)
When navigated via keyboard Tab
Then each element receives focus in a logical order; visible focus rings in `--blue-primary` are displayed on all focused elements

**AC6 — Alt text completeness (FR31):**
Given all images on the landing page including the SVG diagram, blueprint illustrations, and product visualization
When inspected
Then meaningful images have descriptive `alt` text; purely decorative images (`aria-hidden="true"` or `alt=""`) are correctly marked

**AC7 — WCAG 2.1 AA contrast (NFR4, NFR5):**
Given all text/background colour combinations on the landing page
When tested against WCAG 2.1 AA contrast ratios
Then body text meets 4.5:1 minimum; large text and UI components meet 3:1 minimum

**AC8 — Mobile responsiveness 320px–1440px+ (NFR12, NFR13):**
Given the landing page on viewports from 320px to 1440px+
When rendered in the last 2 major versions of Chrome, Firefox, Safari (including Safari 15+), and Edge
Then all content is accessible, no layout breaks, and glassmorphism renders correctly with `-webkit-backdrop-filter` on Safari

**AC9 — LCP performance (NFR2):**
Given the LCP (Largest Contentful Paint) for the landing page
When measured on a standard connection
Then LCP is ≤ 2.5 seconds

**AC10 — `vizGlow` box-shadow transition fix (deferred from 2-5 review):**
Given the product visualization on desktop hover
When the cursor leaves the element
Then the box-shadow fades out smoothly rather than snapping to zero — achieved by adding `box-shadow` to the `.product-viz` transition declaration

## Tasks / Subtasks

- [x] Create `src/animations/side-nav.js` — side navigation module (AC: 1, 2, 3, 4)
  - [x] Export `initSideNav()` function
  - [x] Build HTML for the 6-anchor side nav element inside the function; inject into `<main>` before any section
  - [x] Position: `fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3`
  - [x] Each anchor: `<a href="#section-id" class="side-nav__anchor" data-section="section-id">` containing a dot indicator + a `<span class="side-nav__label">Label Text</span>`
  - [x] Section mapping (shared namespace — must exactly match HTML IDs):
    - `intro-animation` → "Intro"
    - `hero` → "Hero"
    - `the-gap` → "The Last 5%"
    - `where-vasuqi-fits` → "Where Vasuqi Fits"
    - `what-its-built-to-change` → "What It's Built to Change"
    - `how-it-works` → "How It Works"
  - [x] Use `IntersectionObserver` with `rootMargin: '-20% 0px -60% 0px'` to update active section as user scrolls; add/remove `.side-nav__anchor--active` class
  - [x] Add `aria-label="Page sections"` on the `<nav>` wrapper; add `aria-current="location"` on the active anchor (updated via JS)

- [x] Add CSS for side nav in `src/styles/main.css` `@layer components` (AC: 1, 2, 3, 4, 5)
  - [x] `.side-nav__label`: `opacity: 0; transform: translateX(8px); transition: opacity 0.3s ease, transform 0.3s ease; white-space: nowrap; position: absolute; right: calc(100% + 0.75rem);` — label floats to the left of the dot
  - [x] `.side-nav__anchor:hover .side-nav__label, .side-nav__anchor:focus-visible .side-nav__label`: `opacity: 1; transform: translateX(0)` — reveal on hover OR keyboard focus
  - [x] Dot indicator: 8px×8px circle in `--steel`; active state `--blue-primary`, scale up slightly
  - [x] `.side-nav__anchor--active` dot: `background-color: var(--blue-primary); transform: scale(1.3)`
  - [x] Focus ring on `.side-nav__anchor`: `focus-visible:outline` using `outline: 2px solid var(--blue-primary)`
  - [x] Label typography: Manrope, `--text-body-size`, `--steel` default, `--blue-primary` on active/hover

- [x] Wire `initSideNav()` into `src/main.js` (AC: 1)
  - [x] Import and call inside existing `DOMContentLoaded` listener, after `initScrollAnimations()`
  - [x] Do NOT change any other init calls

- [x] Fix `vizGlow` box-shadow snap in `src/styles/main.css` (AC: 10 — deferred from 2-5 review)
  - [x] Add `box-shadow` to the `.product-viz` transition: `transition: transform 0.6s var(--water-ease, ease-in-out), box-shadow 0.6s ease-out`

- [x] Add keyboard dismiss + `aria-live` to intro animation overlay in `src/animations/intro.js` (AC: 5 — deferred from 2-2 review)
  - [x] Add `keydown` listener for `Escape` key that calls `dismiss()` — same function used by click/touchstart; remove listener in `dismiss()` alongside the existing cleanup
  - [x] Add an `aria-live="polite"` region injected as sibling of `#intro-animation` in JS (before `#main-content`) — announces "Intro animation playing. Press Escape or click anywhere to skip." — removed in `fadeOut()`
  - [x] Note: `#intro-animation` still carries `aria-hidden="true"`; live region is injected outside that subtree directly into `<body>` before `#main-content`

- [x] Verify and fix `alt` text / ARIA on existing landing page elements (AC: 6)
  - [x] Confirm `public/images/DTU.jpg`, `IFD.jpeg`, `BII.png` logos have descriptive alt text ✓ (already done in 2-1)
  - [x] Confirm `reactor-how-it-works.png` has descriptive alt ✓ (already done in 2-5)
  - [x] Confirm `reactor-bluebrint-where-it-fits.svg` has descriptive alt ✓ (already done in 2-4)
  - [x] Confirm `#floating-light`, hero `<video>`, hero overlay `<div>` all have `aria-hidden="true"` ✓
  - [x] Confirm `#intro-animation` section has `aria-hidden="true"` (overlay, not real content) ✓
  - [x] Added skip-to-content link at top of `partials/nav.html` — WCAG 2.4.1 gap from 1-3 resolved

- [x] Verify cross-browser layout 320px–1440px+ (AC: 8)
  - [x] At 320px: no horizontal overflow; all 6 sections accessible by scroll; side nav hidden (via `hidden lg:flex`)
  - [x] At 1024px+: side nav visible and functional
  - [x] Safari: `-webkit-backdrop-filter` already set in `.glass-blur` ✓

- [x] Verify `npm run build` produces zero errors after all changes

## Dev Notes

### New File: `src/animations/side-nav.js`

This is a new file following the established animation module isolation rule (each animation concern gets its own file under `src/animations/`). The pattern from `intro.js` and `floating-light.js` applies: export one `init*()` function, no inline code.

```js
export function initSideNav() {
  const sections = [
    { id: 'intro-animation', label: 'Intro' },
    { id: 'hero',            label: 'Hero' },
    { id: 'the-gap',         label: 'The Last 5%' },
    { id: 'where-vasuqi-fits',        label: 'Where Vasuqi Fits' },
    { id: 'what-its-built-to-change', label: "What It's Built to Change" },
    { id: 'how-it-works',    label: 'How It Works' },
  ]

  // Build nav element
  const nav = document.createElement('nav')
  nav.setAttribute('aria-label', 'Page sections')
  nav.className = 'fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3'

  sections.forEach(({ id, label }) => {
    const a = document.createElement('a')
    a.href = `#${id}`
    a.className = 'side-nav__anchor'
    a.dataset.section = id
    a.setAttribute('aria-label', label)
    a.innerHTML = `<span class="side-nav__dot" aria-hidden="true"></span><span class="side-nav__label">${label}</span>`
    nav.appendChild(a)
  })

  document.querySelector('main#main-content')?.prepend(nav)

  // IntersectionObserver for active section tracking
  const anchors = nav.querySelectorAll('.side-nav__anchor')

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anchors.forEach(a => {
          const isActive = a.dataset.section === entry.target.id
          a.classList.toggle('side-nav__anchor--active', isActive)
          a.setAttribute('aria-current', isActive ? 'location' : 'false')
        })
      }
    })
  }, { threshold: 0.4 })

  sections.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
}
```

**Notes on the pattern:**
- `IntersectionObserver` with `threshold: 0.4` means the active state fires when 40% of the section is in viewport. This is appropriate for tall sections. If sections are very tall (taller than viewport), use `rootMargin` instead.
- For very tall sections (e.g. `#hero`, `#how-it-works`) that exceed viewport height, a `rootMargin: '-20% 0px -60% 0px'` strategy can be more reliable. Consider: `{ rootMargin: '-20% 0px -60% 0px', threshold: 0 }` as an alternative if the 0.4 threshold doesn't fire correctly on tall sections.
- The `#intro-animation` section is `display:none` on load and fixed-position — the observer will not fire for it. This is correct: the Intro entry in the side nav will simply never become active on first load. Only activate it if using `?replay`.

### CSS Pattern: Side Nav

Add to `@layer components` in `main.css` after the existing `/* ── How It Works section */` block:

```css
/* ── Side navigation (Story 2.6) ─────────────────────────────────────────── */

.side-nav__anchor {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  border-radius: 0.25rem;
  text-decoration: none;
  outline: none;
}

.side-nav__anchor:focus-visible {
  ring-width: 2px; /* use Tailwind focus-visible:ring-2 focus-visible:ring-[var(--blue-primary)] in HTML, or: */
  outline: 2px solid var(--blue-primary);
  outline-offset: 3px;
  border-radius: 0.25rem;
}

.side-nav__dot {
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--steel);
  transition: background-color 0.3s ease, transform 0.3s ease;
  flex-shrink: 0;
}

.side-nav__anchor--active .side-nav__dot {
  background-color: var(--blue-primary);
  transform: scale(1.3);
}

.side-nav__label {
  position: absolute;
  right: calc(100% + 0.75rem);
  white-space: nowrap;
  font-family: var(--font-manrope);
  font-size: var(--text-body-size);
  font-weight: 500;
  color: var(--steel);
  opacity: 0;
  transform: translateX(8px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

.side-nav__anchor--active .side-nav__label {
  color: var(--blue-primary);
}

.side-nav__anchor:hover .side-nav__label,
.side-nav__anchor:focus-visible .side-nav__label {
  opacity: 1;
  transform: translateX(0);
}
```

**Note:** The label reveals on both `:hover` AND `:focus-visible` — this ensures keyboard users also see the label (AC5 / UX-DR11). This is the correct pattern; `:focus` alone would show labels on mouse click which is undesirable.

### Wiring into `src/main.js`

Add ONE import and ONE call. Do not change any other line:

```js
import { initSideNav } from './animations/side-nav.js'
// ...existing imports unchanged...

document.addEventListener('DOMContentLoaded', () => {
  initIntroAnimation()
  initFloatingLight()
  initScrollAnimations()
  initSideNav()                 // ← add this line only
  // ...existing video code unchanged...
})
```

### Z-Index Architecture

The side nav uses `z-40` — below the fixed nav header (`z-50`) and the intro animation overlay (`z-[9999]`), but above all section content (`z-10`) and the floating light (`z-[1]`). This is correct: the side nav must always be visible during normal scrolling but should be behind the intro overlay on first load.

| Element | z-index | Notes |
|---|---|---|
| `#intro-animation` | `z-[9999]` | Topmost, unchanged |
| Header `<header>` | `z-50` | Fixed nav, unchanged |
| Side nav `<nav>` | `z-40` | New — below header, above content |
| Section content | `z-10` | `relative z-10` on inner containers |
| `#floating-light` | `z-[1]` | Background layer |

### `vizGlow` Fix (AC10 — Deferred from Story 2-5 Review)

The deferred-work.md entry reads:
> "`vizGlow` with `forwards` fill: `box-shadow` snaps off on `mouseleave` instead of fading [...] consider adding `box-shadow` to the `transition` in Story 2.6"

Current (in `main.css`):
```css
.product-viz {
  display: block;
  border-radius: 0.5rem;
  transition: transform 0.6s var(--water-ease, ease-in-out);
}
```

Fix — add `box-shadow` to the transition:
```css
.product-viz {
  display: block;
  border-radius: 0.5rem;
  transition: transform 0.6s var(--water-ease, ease-in-out), box-shadow 0.6s ease-out;
}
```

This allows the box-shadow to fade out gracefully on `mouseleave` instead of snapping to zero. The `forwards` fill on `vizGlow` still applies during hover; on hover-exit, the transition property handles the fade.

### Skip-to-Content Link (WCAG 2.4.1 — Deferred from 1-3)

The 1-3 deferred-work entry flagged: "Missing skip-navigation link and `id="main-content"` on `<main>` — WCAG 2.4.1 Level A gap".

The `<main id="main-content">` already exists in `index.html` (line 20). The skip link is missing from `partials/nav.html`.

Add at the top of `partials/nav.html` (before the `<header>`):

```html
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:rounded-full focus:bg-blue-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white-brand"
>
  Skip to content
</a>
```

This link is visually hidden until focused via keyboard (Tab key), then appears as a styled pill consistent with the nav CTA. `z-[10000]` ensures it sits above the intro animation overlay.

### Shared Namespace — Section IDs (Critical)

The architecture enforces: HTML section IDs = side nav anchor labels = design manual section names. These IDs are locked and must not change:

| Section ID | Side nav label |
|---|---|
| `intro-animation` | "Intro" |
| `hero` | "Hero" |
| `the-gap` | "The Last 5%" |
| `where-vasuqi-fits` | "Where Vasuqi Fits" |
| `what-its-built-to-change` | "What It's Built to Change" |
| `how-it-works` | "How It Works" |

All 6 IDs already exist in `index.html` — do NOT add new sections or rename existing ones.

### WCAG 2.1 AA Contrast — Already Validated

The palette was validated for AA compliance in project setup (per memory note "Accessibility approach — palette is validated"). The dev agent does NOT need to recheck every combination — only flag any new colour pairs introduced in this story (side nav dot `--steel` on `--ice-near` background, `--blue-primary` active dot).

- `--steel` (#5C6B85) on `--ice-near` (#E8F2FF): contrast ~4.6:1 ✓ AA for body text
- `--blue-primary` (#0044FF) on `--ice-near` (#E8F2FF): contrast ~8.6:1 ✓ AA

### Mobile Responsiveness Verification

The `hidden lg:flex` class on the side nav handles AC4 automatically via Tailwind. The dev agent must verify:
- At 320px: horizontal scroll must be 0; all section content visible
- At 768px (md): SVG diagram switches to mobile step list (already implemented in 2-4 ✓)
- At 1024px+ (lg): side nav appears

Check existing beam widths on mobile (`fl-beam--1: 5vw`, `fl-beam--2: 6vw`, `fl-beam--3: 4vw`) — these collapse on narrow mobile viewports per 2-3 deferred work. This is an accepted degradation; the floating light effect simply becomes near-invisible on mobile. Do not change beam CSS in this story.

### Intro Animation: Keyboard Dismiss + Screen Reader Announcement (Deferred from 2-2)

Deferred-work entry: "No focus trap or `aria-live` during blocking overlay — screen reader users get no indication overlay is active; address in Story 2.6."

Two changes to `src/animations/intro.js` — inside `initIntroAnimation()`, after the existing `click` and `touchstart` listeners are registered:

**1. Escape key dismiss:**

```js
function onKeyDown(e) {
  if (e.key === 'Escape') dismiss()
}
document.addEventListener('keydown', onKeyDown)
```

In the existing `dismiss()` function, add cleanup alongside the existing `removeEventListener` calls:

```js
document.removeEventListener('keydown', onKeyDown)
```

**2. `aria-live` screen reader announcement:**

Because `#intro-animation` already carries `aria-hidden="true"` (the SVG content should not be read), the live region must be **outside** that element. Inject it as a sibling of `#intro-animation` in JS:

```js
const liveRegion = document.createElement('div')
liveRegion.setAttribute('role', 'status')
liveRegion.setAttribute('aria-live', 'polite')
liveRegion.className = 'sr-only'
liveRegion.textContent = 'Intro animation playing. Press Escape or click anywhere to skip.'
document.body.insertBefore(liveRegion, document.getElementById('main-content'))
```

In `fadeOut()`, after setting `section.style.display = 'none'`:

```js
liveRegion.remove()
```

**Do NOT** add `role="dialog"` or `aria-modal` — those would require a full focus trap which is out of scope. The `aria-live` polite announcement is sufficient for screen readers to understand the overlay is temporary. The `aria-hidden="true"` on `#intro-animation` already prevents the SVG animation content from being read aloud.

### What Must NOT Break

- `npm run build` passes with zero errors
- All 4 HTML pages resolve via `npm run dev`
- Intro animation (`z-[9999]`) still covers all content on first load
- `#floating-light` (`z-[1]`) still behind section content
- Nav bar (`z-50`) still above side nav
- `src/animations/scroll.js` — all 4 `animateSection()` calls — unchanged
- `src/animations/constants.js` — unchanged
- `src/animations/floating-light.js` — unchanged
- All existing `aria-hidden="true"` attributes on decorative elements preserved
- Hero section `<video>` loop unchanged
- `src/animations/intro.js` animation timeline — unchanged; only the dismiss listeners and live region are added

### Do NOT Implement in This Story

- `prefers-reduced-motion` guard for scroll animations — this is the project-wide deliberate decision; the architecture explicitly states "All animations run unconditionally — no `prefers-reduced-motion` checks"
- Three.js, GSAP MorphSVG, or any new JS library — no new dependencies
- Side nav on mobile — spec says desktop only; mobile equivalent "in development"
- Any changes to the 3 other HTML pages (about.html, contact.html, news-documentation.html)
- Story 3.x work (supporting pages accessibility — separate epic)

### Build Verification Checklist

After implementation:
1. `npm run build` — zero errors, all modules bundle correctly
2. `npm run dev` — open index.html at 1280px width
3. Side nav dots visible on right edge, labels hidden
4. Hover a dot → label slides in from right ✓
5. Scroll through sections → active dot turns blue-primary ✓
6. Keyboard: Tab through page — side nav anchors receive visible focus rings ✓
7. Keyboard: focus-visible on side nav anchor → label reveals ✓
8. At 768px width → side nav hidden ✓
9. Skip link: Tab from address bar → skip link appears, press Enter → focus jumps to `#main-content` ✓
10. Hover `reactor-how-it-works.png`, move mouse away → box-shadow fades smoothly (no snap) ✓
11. Intro overlay (first visit, clear sessionStorage): press Escape → overlay dismisses ✓
12. Intro overlay (with screen reader / VoiceOver): live region announces "Intro animation playing. Press Escape or click anywhere to skip." ✓

### Previous Story Patterns (From Stories 2.1–2.5 — Confirmed Good)

- GSAP imports: `import { gsap } from 'gsap'` (NOT `'gsap/dist/'`)
- Module isolation: one export per `src/animations/*.js` file; no animation code in `main.js` directly
- Section content wrappers use `relative z-10` to sit above floating light
- CSS custom properties: never use hex directly in stylesheets; use `var(--token-name)` — only exception is `rgba()` components
- Tailwind `lg:` prefix for all desktop-only show/hide logic (e.g. `hidden lg:flex`)
- The `src/main.js` `DOMContentLoaded` listener already wraps all init calls — append to it, do not create a second listener

### References

- FR2 (side nav 6 anchors), FR3 (hover-reveal labels), FR30 (keyboard operability), FR31 (alt text), FR5 (mobile responsiveness)
- NFR4 (WCAG 2.1 AA motion exception), NFR5 (contrast ratios), NFR6 (keyboard operability), NFR7 (focus states), NFR12 (browser compatibility), NFR13 (responsive 320px+), NFR2 (LCP ≤ 2.5s)
- UX-DR4 (side nav desktop only), UX-DR11 (focus rings in `--blue-primary`), UX-DR12 (44×44px touch targets), UX-DR13 (relative units), UX-DR14 (lazy loading)
- Architecture: `z-40` for side nav in stacking context; `IntersectionObserver` for scroll tracking; `lg:` Tailwind prefix for side nav visibility
- Deferred work: `vizGlow` box-shadow snap (from 2-5 review); skip-navigation link (from 1-3 review); intro overlay keyboard dismiss + aria-live (from 2-2 review)
- Memory: palette is validated for AA; animation trade-off is deliberate and exam-defensible

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None

### Completion Notes List

- Created `src/animations/side-nav.js` — exports `initSideNav()`, builds 6-anchor nav dynamically, injects into `<main#main-content>`, uses IntersectionObserver with `rootMargin: '-20% 0px -60% 0px'` for reliable active-section tracking on tall sections; skips `#intro-animation` from observer (display:none on load). All 6 section IDs match HTML exactly.
- Added complete side nav CSS to `@layer components` in `main.css`: dot indicator (8px `--steel`), active state (`--blue-primary`, scale 1.3), label reveal on `:hover` and `:focus-visible`, focus ring via `outline: 2px solid var(--blue-primary)`. All tokens from design-tokens.css, no raw hex.
- Wired `initSideNav()` import and call into `src/main.js` DOMContentLoaded listener — only two lines added, all existing init calls unchanged.
- Fixed `vizGlow` box-shadow snap (deferred from 2-5 review): added `box-shadow 0.6s ease-out` to `.product-viz` transition declaration.
- Added Escape key dismiss to `src/animations/intro.js`: `onKeyDown` handler registered on `document`, cleaned up in `dismiss()` alongside click/touchstart cleanup.
- Added `aria-live="polite"` region injected before `#main-content` in `initIntroAnimation()`, removed in `fadeOut()`. Outside the `aria-hidden="true"` subtree of `#intro-animation` — screen readers will announce "Intro animation playing. Press Escape or click anywhere to skip."
- All existing alt text confirmed correct (DTU, IFD, BII logos; SVG diagram; reactor PNG); all decorative elements confirmed `aria-hidden="true"`.
- Added skip-to-content link to `partials/nav.html` (before `<header>`) — resolves WCAG 2.4.1 gap deferred from story 1-3.
- `npm run build` passes with zero errors (21 modules transformed, all 4 HTML pages output correctly).

### File List

- `src/animations/side-nav.js` (NEW)
- `src/animations/intro.js` (UPDATE — Escape key dismiss + aria-live region; deferred from 2-2)
- `src/main.js` (UPDATE — import and call initSideNav)
- `src/styles/main.css` (UPDATE — side nav CSS block + vizGlow transition fix)
- `partials/nav.html` (UPDATE — skip-to-content link)

### Review Findings

- [x] [Review][Patch] `tl.onComplete` leaks keydown listener and orphans liveRegion [`src/animations/intro.js:103-112`] — When the intro animation plays to natural completion, `tl.onComplete` sets `display:none` directly without calling `dismiss()` or `fadeOut()`. It therefore never calls `document.removeEventListener('keydown', onKeyDown)` (listener leaks for the rest of the page session) and never calls `liveRegion.remove()` (sr-only element stays in the DOM indefinitely). Fixed: added `document.removeEventListener('keydown', onKeyDown)` and `liveRegion.remove()` to the `tl.onComplete` handler.

### Change Log

- 2026-05-23: Story 2.6 created — ready for dev
- 2026-05-24: Story 2.6 implemented — side nav, keyboard accessibility, aria-live, skip link, vizGlow fix; status → review
- 2026-05-24: Code review — 1 patch found and fixed (keydown/liveRegion leak in tl.onComplete); status → done
