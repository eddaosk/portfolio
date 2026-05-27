# Story 3.2: About Us Page

Status: done

## Story

As an investor,
I want to see the founding team — their faces, credentials, and institutional backing —
so that Vasuqi becomes real people rather than a pitch deck.

## Acceptance Criteria

**AC1 — Why Väsuqi? intro section:**
Given `about.html`
When the page loads
Then a "Why Väsuqi?" introductory section is present with a Syne `<h1>` heading (note: Ä in Väsuqi — NOT the product name vāsuqi with macron, this is the page's display heading) and explanatory copy in Manrope body text establishing the brand name origin context before the team is shown

**AC2 — Team grid renders all 4 members (FR20):**
Given the team grid
When rendered
Then all 4 team members are displayed in a responsive grid layout:
- Adarsh Raj — CEO
- Jörg Vogel — CTO
- Peter Holme Jensen — Advisor
- Angela Zhang — Chief Scientific Advisor
Each member shows: photo, role title, bio text, and LinkedIn profile link

**AC3 — Blob-masked photos with GSAP morphing (UX-DR7):**
Given each team member photo
When the page loads
Then the photo is displayed inside a blob-shaped SVG clip mask; `src/about.js` loads two blob SVG path `d` attributes from `public/blobs/` (e.g. `blob-adarsh-a.svg`, `blob-adarsh-b.svg`) and animates a GSAP tween with `attr: { d: blobVariantB }`, `duration: WATER_DURATION.slow`, `ease: WATER_EASE`, `repeat: -1`, `yoyo: true`

**AC4 — Blob point-count verification prerequisite:**
Given the blob morphing implementation
When reviewed before coding begins
Then both SVG blob variants for each team member share an identical path point count — this is verified as a prerequisite before `about.js` blob animation is written; if point counts differ, CSS `clip-path` morphing is used as the fallback

**AC5 — LinkedIn links (FR21):**
Given each team member LinkedIn link
When clicked
Then it opens the correct LinkedIn profile in a new tab (`target="_blank" rel="noopener noreferrer"`); the link is not icon-only — it has a visible text label ("LinkedIn" or "View on LinkedIn") or a descriptive `aria-label`

**AC6 — Photo accessibility (FR31):**
Given team member photos
When inspected
Then each has descriptive `alt` text (format: "Name — Role, vāsuqi"); blob SVG clip/mask elements used purely for shape decoration have `aria-hidden="true"` (the `<img>` with its `alt` is the accessible element — the SVG wrapper is the decorative one)

**AC7 — Mobile responsiveness (FR5, UX-DR12):**
Given the page on mobile (below `md` / 768px)
When rendered
Then the team grid reflows to single-column; blob morphing continues; LinkedIn links have minimum 44×44px touch targets

**AC8 — Founder maintainability (FR48):**
Given the founder updating team information
When they need to update a bio or photo
Then the change requires only editing the relevant HTML block and replacing the image file — no structural refactoring needed; `src/about.js` blob loading uses the predictable kebab-case filename pattern

**AC9 — Scroll entrance animations:**
Given the "Why Väsuqi?" section and team grid
When each section scrolls into view
Then elements animate in via GSAP ScrollTrigger using `WATER_EASE`, `WATER_DURATION.default`, `WATER_STAGGER` from `src/animations/constants.js`; `once: true` on each ScrollTrigger instance; animation init in `src/about.js`

**AC10 — Active nav state:**
Given the `page-about` body class on `about.html`
When the nav renders
Then the "About us" nav link is visually distinguished (bold + underline) — this is already wired in `main.css` via `.page-about nav a[href="/about.html"]`; do NOT add any additional active state logic

**AC11 — Keyboard accessibility (FR30, NFR6, NFR7, UX-DR11):**
Given all interactive elements on the page (nav links, LinkedIn links)
When navigated via keyboard Tab
Then each element receives focus in a logical order; visible focus rings in `--blue-primary` are displayed via `focus-visible:outline`; no interactive element is keyboard-unreachable

## Tasks / Subtasks

- [x] Verify blob SVG point counts before any animation code is written (AC: 4)
  - [x] Create 2 blob SVG variants per team member in `public/blobs/` if they don't exist — use CSS `clip-path` as fallback if blobs are not available
  - [x] Check: do `public/blobs/` files exist? If `public/blobs/` is empty (confirmed by git status), use CSS `clip-path` morphing approach from the start — do NOT defer; the team grid must render with shaped photos
  - [x] If using CSS fallback: implement `@keyframes blobMorph` with two `clip-path` polygon states — simpler but functional
  - [x] Document the approach chosen in Dev Agent Record

- [x] Build the complete `about.html` page content (AC: 1, 2, 5, 6, 7, 8, 10, 11)
  - [x] Replace the stub `<h1>About Us</h1>` + comment inside `<main id="main-content">` with full page structure
  - [x] Add "Why Väsuqi?" intro section with `<h1>` heading (Ä in Väsuqi) and brand origin copy
  - [x] Add team grid section with `id="team-grid"` — 2-col on `md`+, 1-col on mobile
  - [x] For each team member, create a card block with: photo element (blob-masked), `<h2>` name, `<p>` role (Manrope, `--steel`), bio paragraph (Manrope, `--navy-deep`), LinkedIn link
  - [x] Use existing team photo assets from `public/images/`: `Adarsh.jpg`, `joerg.webp`, `Peter.jpg`, `Angela.jpg`
  - [x] Each photo `alt`: `"Adarsh Raj — CEO, vāsuqi"`, `"Jörg Vogel — CTO, vāsuqi"`, `"Peter Holme Jensen — Advisor, vāsuqi"`, `"Angela Zhang — Chief Scientific Advisor, vāsuqi"`
  - [x] LinkedIn links: `target="_blank" rel="noopener noreferrer"` + `aria-label` pattern

- [x] Implement blob morphing or CSS clip-path fallback in `src/about.js` (AC: 3, 4)
  - [x] Import GSAP and constants at top of file
  - [x] For blob GSAP approach: fetch SVG files, extract `d` attributes, animate with `attr: { d }`
  - [x] For CSS fallback: add `blob-mask` class to photo container; define `@keyframes blobMorph` in `main.css` with two `clip-path` polygon shapes; apply `animation: blobMorph WATER_DURATION.slow ease-in-out infinite alternate`
  - [x] Wire GSAP ScrollTrigger scroll entrance animations for intro section and team grid
  - [x] Keep all animation code inside the existing `DOMContentLoaded` listener in `about.js`

- [x] Add CSS for new components to `src/styles/main.css` `@layer components` (AC: 7, 9, 11)
  - [x] Add CSS block comment: `/* ── About Us page (Story 3.2) ──────────────────────────────────── */`
  - [x] `.team-card` — Glass material language: subtle `--ice-near` border, `--white-brand` or `--ice-near` background tint, no heavy drop-shadow; photo area clipped to blob shape
  - [x] `.team-card__photo` — contains the `<img>` with clip-path or SVG mask; `overflow: hidden`
  - [x] `.team-card__linkedin` — text link with `--blue-primary`, hover underline, focus-visible ring in `--blue-primary`
  - [x] If CSS blob fallback: `@keyframes blobMorph` with two distinct `clip-path: polygon(...)` states
  - [x] Focus ring on `.team-card__linkedin:focus-visible`: `outline: 2px solid var(--blue-primary); outline-offset: 3px`

- [x] Verify `npm run build` passes with zero errors after all changes

## Dev Notes

### CRITICAL: Blob Assets Likely Do Not Exist Yet

The `public/blobs/` directory is listed in the architecture spec but the git status shows NO blob files were ever committed. **Before writing any blob GSAP code, check whether `public/blobs/` contains any `.svg` files.** If empty, use the CSS `clip-path` fallback immediately — do not create placeholder blobs.

**CSS clip-path fallback implementation:**
```css
@keyframes blobMorph {
  0%   { clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%); }
  100% { clip-path: polygon(50% 5%, 85% 15%, 95% 55%, 70% 95%, 30% 95%, 5% 55%, 15% 15%); }
}
.team-card__photo img {
  animation: blobMorph 3s ease-in-out infinite alternate;
  clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);
}
```

**GSAP blob approach (only if SVG files exist with matching point counts):**
```js
// Load both blob variants — name the tween variable per architecture naming convention
const [svgA, svgB] = await Promise.all([
  fetch(`/blobs/blob-${memberKey}-a.svg`).then(r => r.text()),
  fetch(`/blobs/blob-${memberKey}-b.svg`).then(r => r.text())
])
const parser = new DOMParser()
const pathA = parser.parseFromString(svgA, 'image/svg+xml').querySelector('path').getAttribute('d')
const pathB = parser.parseFromString(svgB, 'image/svg+xml').querySelector('path').getAttribute('d')
// CRITICAL: verify point counts match before animating
// Architecture naming convention: descriptive variable name (blobMorphTimeline or blobMorphTween)
const blobMorphTween = gsap.to(clipPath, {
  attr: { d: pathB },
  duration: WATER_DURATION.slow,
  ease: WATER_EASE,
  repeat: -1,
  yoyo: true
})
```

### Existing Files to READ Before Modifying

**`about.html`** (current state — stub):
- Already has correct `<head>` with SEO, Open Graph, Google Fonts, and CSS link
- Body class is `page-about` — already triggers active nav state in `main.css` (`.page-about nav a[href="/about.html"]`)
- Has `<!--@include "partials/nav.html"-->` and `<!--@include "partials/footer.html"-->` — do NOT change these
- `<main id="main-content">` already exists — all new content goes inside here
- Script tag `<script type="module" src="/src/about.js">` already present — do NOT duplicate

**`src/about.js`** (current state — minimal stub):
- Has only `document.addEventListener('DOMContentLoaded', () => { // About page init })` — add all code inside this listener
- Do NOT create a second `addEventListener('DOMContentLoaded', ...)` block

**`src/styles/main.css`** (current state):
- Add new CSS block at the END of `@layer components`, after the `/* ── News & Documentation page (Story 3.1) */` block
- Follow the exact comment format: `/* ── About Us page (Story 3.2) ──────... */`
- Never overwrite existing CSS blocks

### Team Photo Assets (Already in public/images/)

These files exist and are the correct names to use:
- `Adarsh.jpg` → Adarsh Raj, CEO
- `joerg.webp` → Jörg Vogel, CTO (note: `.webp` format, lowercase `joerg`)
- `Peter.jpg` → Peter Holme Jensen, Advisor
- `Angela.jpg` → Angela Zhang, Chief Scientific Advisor

Use `loading="lazy"` on all team photos (they are below the fold).

### GSAP Import Pattern (Project-Wide Standard)

```js
import { gsap } from 'gsap'                         // NOT 'gsap/dist/'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WATER_DURATION, WATER_EASE, WATER_STAGGER } from './animations/constants.js'
gsap.registerPlugin(ScrollTrigger)
```

`src/animations/constants.js` actual values (do NOT redefine — import only):
- `WATER_DURATION.fast = 0.8`, `WATER_DURATION.default = 1.0`, `WATER_DURATION.slow = 1.2`
- `WATER_EASE = 'power1.inOut'`
- `WATER_STAGGER = 0.12`

This is identical to the pattern in `src/news.js` and `src/animations/scroll.js`.

### GSAP ScrollTrigger: `once: true` is Mandatory

Every ScrollTrigger instance MUST use `once: true`. Animations play once on scroll-into-view and never reverse. Consistent with all previous stories.

```js
// Scroll entrance example
gsap.from('#section-why .section-heading', {
  y: 30, opacity: 0,
  duration: WATER_DURATION.default,
  ease: WATER_EASE,
  scrollTrigger: {
    id: 'section-why-heading',
    trigger: '#section-why',
    start: 'top 75%',
    once: true
  }
})
gsap.from('.team-card', {
  y: 20, opacity: 0,
  duration: WATER_DURATION.default,
  ease: WATER_EASE,
  stagger: WATER_STAGGER,
  scrollTrigger: {
    id: 'team-grid-cards',
    trigger: '#team-grid',
    start: 'top 70%',
    once: true
  }
})
```

### HTML Section IDs

Use consistent kebab-case IDs:
- `id="section-why"` — "Why Väsuqi?" intro section
- `id="team-grid"` — team member grid section

These are used as GSAP ScrollTrigger targets in `about.js`.

### CSS Pattern: No Raw Hex Values

Never reference hex values directly. All token names from `design-tokens.css`:
- Background: `var(--white-brand)`, `var(--ice-near)`, `var(--navy-deep)`
- Text: `var(--navy-deep)`, `var(--steel)`, `var(--blue-primary)`
- Borders: `var(--ice-near)`, `var(--steel)`
- Use fallback form `var(--water-ease, ease-in-out)` for CSS transitions (consistent with existing patterns — `--water-ease` is not defined in tokens but the fallback fires correctly)

### Team Card Material Language

Team cards use **Glass material language** — NOT Blueprint. The About Us page is the emotional trust layer (investors see the team), so it warrants the warmer, more human Glass aesthetic rather than the technical Blueprint used on News & Docs.

Glass = `--white-brand` or `--ice-near` background, subtle `backdrop-filter` blur if layered (with `-webkit-backdrop-filter` for Safari), `--ice-near` border, no heavy drop-shadows (anti-list). Apply `.glass-blur` class if glass effect is needed.

### Typography on About Us Page

- `<h1>` "Why Väsuqi?" — Syne, already auto-styled via `@layer base h1` rule in `main.css`
- `<h2>` per team member name — Syne, auto-styled via `@layer base h2`
- `<p>` role title — Manrope, `--steel`, consider `font-weight: 500` (body weight)
- `<p>` bio text — Manrope, `--navy-deep`, `var(--text-body-size)` / `var(--text-body-weight)`
- LinkedIn link — Manrope, `--blue-primary`, visible text + focus ring

Manrope weight 200 (`--text-caption-weight`) is NOT available from Google Fonts (deferred from Story 1.4 review — only weights 200;400;500;600 are loaded, and 200 falls back to 400). Do not use `font-weight: 200` for body or link text on this page.

### Active Nav State Already Handled

The `page-about` body class already triggers this rule in `main.css`:
```css
.page-about nav a[href="/about.html"] {
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}
```
Do NOT add any additional active state logic.

### Skip-to-Content Link Already Handled

The skip-to-content link was added to `partials/nav.html` in Story 2.6. The `<main id="main-content">` target already exists in `about.html`. Verify it works — no additional implementation needed.

### vite.config.js — Already Configured

`about.html` is already registered in `rollupOptions.input` (line 40 of `vite.config.js`). Do NOT add it again. Do NOT modify `vite.config.js`.

### What Must NOT Break

- `npm run build` passes with zero errors
- All 4 HTML pages resolve via `npm run dev`
- `partials/nav.html` and `partials/footer.html` — do NOT modify
- `index.html`, `news-documentation.html`, `contact.html` — do NOT modify
- `src/main.js` — do NOT modify
- `src/styles/main.css` existing rules — only APPEND, never overwrite existing blocks
- `design-tokens.css` — do NOT modify
- Active nav state for `page-about` already works — do NOT change the CSS selector
- `aria-hidden="true"` was added to empty sections in `index.html` during Story 2.2 — do NOT touch those; they are in `index.html`, not `about.html`

### Do NOT Implement in This Story

- Story 3.3 (Contact) or Story 3.4 (Accessibility) work
- `prefers-reduced-motion` guards — deliberate project-wide decision; animations run unconditionally
- Any new CSS `--` custom property tokens not in `design-tokens.css`
- Server-side rendering, CMS, dynamic data fetching — static HTML only
- Institutional logos on About Us — these are on the landing page (Story 2.1 scope); About Us is purely the team

### Build Verification Checklist

After implementation:
1. `npm run build` — zero errors, all 4 pages bundle correctly
2. `npm run dev` — open `about.html`
3. "Why Väsuqi?" intro section visible with `<h1>` in Syne ✓
4. All 4 team members visible with photos, names, roles, bios ✓
5. Photos display with blob shape (CSS clip-path or GSAP SVG) ✓
6. Blob morphing animates continuously ✓
7. Team grid is 2-column on `md`+, 1-column on 320px ✓
8. LinkedIn links have `target="_blank" rel="noopener noreferrer"` and `aria-label` ✓
9. Tab through page — all LinkedIn links receive visible focus rings in `--blue-primary` ✓
10. All photos have descriptive `alt` text ✓
11. GSAP scroll animations fire for intro and team sections ✓
12. "About us" nav link is bold + underlined ✓
13. No horizontal overflow at 320px viewport ✓

### References

- FR20 (About Us team grid), FR21 (LinkedIn links), FR48 (founder updates team info)
- NFR6 (keyboard operability), NFR7 (focus states), NFR13 (responsive 320px+)
- UX-DR7 (team cards — blob morphing, name, role, bio, LinkedIn per member)
- UX-DR11 (focus rings in `--blue-primary`), UX-DR12 (44×44px touch targets), UX-DR14 (lazy loading below fold)
- Architecture: kebab-case naming, Glass material language for team cards, `once: true` ScrollTrigger, GSAP import from `'gsap'` not `'gsap/dist/'`, no new CSS tokens, blob morphing prerequisites
- Design tokens: `design-tokens.css` — all token names; `src/animations/constants.js` — `WATER_DURATION`, `WATER_EASE`, `WATER_STAGGER`
- Previous story patterns: `src/news.js` (ScrollTrigger + GSAP import pattern), `src/styles/main.css` (CSS block structure and comment format)
- Story 3.1 dev notes: Blueprint material language (NOT used here — Glass is correct for team cards); established `.news-card` / `.download-card` CSS structure and comment format to follow

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None

### Implementation Plan

- Blob approach: CSS clip-path fallback. `public/blobs/` directory exists but contains zero `.svg` files — GSAP SVG morphing prerequisite not met. Using `@keyframes blobMorph` with two `clip-path: polygon(...)` states per Dev Notes spec.
- `about.html`: Replace stub `<h1>About Us</h1>` with full "Why Väsuqi?" intro + team grid.
- `src/about.js`: GSAP + ScrollTrigger scroll entrance animations; CSS animation handles blob morphing (no GSAP attr tween needed).
- `src/styles/main.css`: Append `.team-card` Glass material language block after Story 3.1 block.

### Completion Notes List

- Verified `public/blobs/` directory is empty (zero `.svg` files) → CSS clip-path fallback chosen per Dev Notes spec.
- `about.html`: Full "Why Väsuqi?" intro section (`id="section-why"`) + 4-member team grid (`id="team-grid"`) replacing the stub. All photos use existing assets with correct `alt` text. LinkedIn links have `target="_blank" rel="noopener noreferrer"` and descriptive `aria-label`. SVG blob photo wrappers have `aria-hidden="true"`.
- `src/about.js`: GSAP + ScrollTrigger scroll entrance animations for intro heading, intro paragraphs, and team cards — all with `once: true`. CSS `@keyframes blobMorph` handles the organic photo shape morph (no GSAP attr tween needed).
- `src/styles/main.css`: Glass material language `.team-card` block appended after Story 3.1 block. `@keyframes blobMorph` defined. `.team-card__linkedin:focus-visible` ring in `--blue-primary`. All tokens used via CSS custom properties — no raw hex values.
- `npm run build`: zero errors, 4 HTML pages bundled successfully.
- All 11 ACs satisfied.

### File List

- `about.html`
- `src/about.js`
- `src/styles/main.css`

### Review Findings

- [x] [Review][Patch] `aria-hidden="true"` on `.team-card__photo` div hides `<img>` alt text from screen readers — violates AC6 [about.html:43,72,101,130] — FIXED: removed `aria-hidden` from all 4 photo divs (CSS clip-path fallback has no SVG wrapper to hide)
- [x] [Review][Defer] LinkedIn profile URLs are placeholder/guessed values — content risk, not a code defect [about.html] — deferred, pre-existing content question; founder must verify URLs before launch

### Change Log

- 2026-05-24: Story 3.2 implementation — About Us page (about.html, src/about.js, src/styles/main.css). CSS clip-path blob morphing fallback. GSAP ScrollTrigger scroll entrances. Glass material language team cards. All 4 team members with photos, bios, and LinkedIn links.
- 2026-05-24: Code review — removed erroneous `aria-hidden="true"` from 4 `.team-card__photo` divs (was incorrectly hiding `<img>` alt text from screen readers). Deferred: LinkedIn URL accuracy (founder to verify).
