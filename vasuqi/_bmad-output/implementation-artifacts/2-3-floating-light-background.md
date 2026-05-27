# Story 2.3: Floating Light Background

Status: done

## Story

As an investor scrolling the landing page,
I want a persistent ambient light animation in the background,
so that the brand's Light material language is expressed continuously and the page feels alive without distracting from the content.

## Acceptance Criteria

**AC1 — Visible and continuous (FR11, FR15):**
Given `index.html` after the intro animation completes
When the visitor scrolls through any section
Then the floating light background element (glowing blue vertical light beams) is visible and animating continuously; it does not pause or reset on scroll

**AC2 — Module structure:**
Given `src/animations/floating-light.js`
When reviewed
Then it exports an `initFloatingLight()` function; animation uses GSAP core tweens with `WATER_EASE`, `WATER_DURATION.slow`, and looping (`repeat: -1`); no duration or easing values are hardcoded inline

**AC3 — Accessible (aria):**
Given the floating light element
When inspected in the DOM
Then it has `aria-hidden="true"` — it is invisible to screen readers and does not interfere with keyboard navigation

**AC4 — Non-blocking (FR15):**
Given the floating light animation running
When the visitor interacts with navigation, clicks links, or fills a form
Then the animation continues uninterrupted — it does not block any page interaction (`pointer-events: none`)

**AC5 — Correct z-index layering:**
Given the floating light element and page content
When rendered together
Then the light element sits behind content layers (correct `z-index`) and does not obscure any readable text or interactive element

## Tasks / Subtasks

- [x] Add `#floating-light` container to `index.html` (AC: 1, 3, 4, 5)
  - [x] Place immediately after `<main id="main-content">` opening tag, before the intro animation section
  - [x] Apply `aria-hidden="true"` and class `fixed inset-0 z-[1] pointer-events-none overflow-hidden`
  - [x] Add 3 `.fl-beam` child divs: `.fl-beam--1`, `.fl-beam--2`, `.fl-beam--3`

- [x] Add CSS for floating light to `src/styles/main.css` `@layer components` (AC: 1, 5)
  - [x] `.fl-beam` base styles: `position: absolute; border-radius: 50%`
  - [x] `.fl-beam--1`: left ~12%, tall narrow ellipse, `--blue-soft` → `--blue-primary` vertical gradient, `filter: blur(55px)`, `opacity: 0.28`
  - [x] `.fl-beam--2`: left ~55%, slightly wider, `--blue-mid` → `--blue-soft` gradient, `filter: blur(70px)`, `opacity: 0.22`
  - [x] `.fl-beam--3`: left ~80%, narrowest, `--cyan-light` → `--blue-soft` gradient, `filter: blur(48px)`, `opacity: 0.16`
  - [x] All gradient token colours use `var(--token)` — no hex values

- [x] Create `src/animations/floating-light.js` (AC: 2, 4)
  - [x] Import `gsap` from `'gsap'`
  - [x] Import `WATER_EASE`, `WATER_DURATION`, `WATER_STAGGER` from `'./constants.js'`
  - [x] Export `initFloatingLight()`: early-return if `#floating-light` not found
  - [x] `querySelectorAll('.fl-beam')` and animate each beam independently
  - [x] Each beam: `gsap.to(beam, { y: '-=35', opacity: '+=0.08', duration: WATER_DURATION.slow + i * 0.4, ease: WATER_EASE, repeat: -1, yoyo: true, delay: i * WATER_STAGGER * 4 })`
  - [x] No hardcoded duration or easing values — all from constants.js

- [x] Update `src/main.js` (AC: 1)
  - [x] Add `import { initFloatingLight } from './animations/floating-light.js'`
  - [x] Call `initFloatingLight()` after `initIntroAnimation()` inside `DOMContentLoaded`

## Dev Notes

### Light Material Language — Visual Design

The floating light uses the **Light** material language: electric blue vertical glow columns that suggest luminescence filtering through water. These are not hard shapes — they are soft, over-blurred ellipses that become indistinct beams of ambient light.

Three beams at different horizontal positions (left ~12%, ~55%, ~80%) create an asymmetric, natural composition that avoids feeling symmetric or artificial. They animate at different rhythms (using WATER_STAGGER offsets) so they never feel in lockstep.

**Beam appearance:** vertical ellipses with `border-radius: 50%` (making them oval), `filter: blur()` averaging 55px which completely dissolves the hard ellipse edge into a soft glow. A vertical `linear-gradient` from transparent at top/bottom to branded blue in the middle makes them read as column-shaped light rather than circular blobs.

**Token colours used:**
- `--blue-soft` (#A8C5FF) — secondary glow colour
- `--blue-primary` (#0044FF) — core beam colour
- `--blue-mid` (#6A93FF) — middle beam colour
- `--cyan-light` (#00E5FF) — accent beam colour

**Opacity range:** 0.16–0.28 — low enough to never distract from content, high enough to register as an intentional design element.

### Z-Index Architecture

The landing page z-index stack from lowest to highest:
- `body` background (`--ice-near`): root
- Non-positioned block elements (sections without position): step 3 in stacking
- `#floating-light` (`position: fixed; z-index: 1`): step 7 (positive z-index)
- Hero content div (`relative z-10`): step 7, z-10 > z-1
- Nav bar (`position: fixed; z-50` approx): high
- Intro animation (`z-[9999]`): highest

With `z-index: 1` on the floating light:
- It paints ABOVE the hero video/overlay (which are `position: absolute; z-index: auto`, step 6)
- It paints BELOW the hero content div (`z-10`)
- The semi-transparent beam gradients (opacity 0.16–0.28) add ambient luminance on top of the video without covering it
- Future sections (2.4, 2.5) should ensure text/interactive content uses `relative z-10` or higher

### GSAP Animation Pattern

The beams oscillate using `yoyo: true` + `repeat: -1` (infinite loop):
- Y axis: `-35px` upward drift and return — simulates floating, water-physics gentle rise
- Opacity: `+=0.08` and return — simulates light pulsing/breathing
- Duration per beam: `WATER_DURATION.slow` (1.2s) + stagger offset per beam — ensures beams never sync
- Ease: `WATER_EASE` (`power1.inOut`) — smooth water-physics motion

No GSAP plugins required — only GSAP core tweens.

### What Must NOT Break

- `npm run build` passes with zero errors
- All 4 HTML pages resolve via `npm run dev`
- Intro animation (`z-[9999]`) still covers floating light correctly
- Nav bar still overlays all content
- Hero text content (`z-10`) remains readable above the floating light
- No `prefers-reduced-motion` media query — architecture decision
- `src/animations/constants.js` unchanged

### Do NOT Add in This Story

- `src/animations/scroll.js` — Story 2.4
- GSAP ScrollTrigger or SplitText imports
- Content in `#the-gap`, `#where-vasuqi-fits`, `#what-its-built-to-change`, `#how-it-works`
- Side navigation — Story 2.6

---

### References

- FR11, FR15: Persistent, non-blocking background animation
- UX-DR15: Floating light background — persistent ambient animated element; `aria-hidden="true"`
- Animation constants: `src/animations/constants.js`
- Z-index layering: See Story 2.1 Dev Notes + Story 2.2 Dev Notes (intro at z-[9999])
- Light material language: `_bmad-output/planning-artifacts/ux-design-specification.md` — Component Strategy table
- No prefers-reduced-motion: architecture decision (epics.md NFR4 note)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None

### Completion Notes List

- Created `src/animations/floating-light.js` exporting `initFloatingLight()`; animates 3 `.fl-beam` elements with GSAP `repeat: -1, yoyo: true` using `WATER_EASE`, `WATER_DURATION.slow`, and `WATER_STAGGER` from constants.js — no hardcoded values
- Added `#floating-light` div to `index.html` with `aria-hidden="true"`, `pointer-events: none`, `position: fixed`, `z-index: 1`, `overflow: hidden` — sits above z-auto positioned content but below z-10 hero text
- Three beams: left-beam (blue-primary core, blur 55px, opacity 0.28), centre-beam (blue-mid, blur 70px, opacity 0.22, widest), right-beam (cyan-light accent, blur 48px, opacity 0.16) — all colours use `var(--token)` tokens
- `initFloatingLight()` called from `src/main.js` after `initIntroAnimation()` in DOMContentLoaded
- Playwright verification confirmed: aria-hidden, pointer-events, z-index all correct; GSAP running (beam opacity at 0.35 mid-animation); hero h2 visible and readable above beams; intro animation unaffected; `npm run build` passes (17 modules)

### File List

- `index.html` — added `#floating-light` container with 3 `.fl-beam` child divs after `<main>` opening
- `src/animations/floating-light.js` — new file; exports `initFloatingLight()`
- `src/main.js` — added import and call for `initFloatingLight()`
- `src/styles/main.css` — added `.fl-beam`, `.fl-beam--1`, `.fl-beam--2`, `.fl-beam--3` rules in `@layer components`
- `_bmad-output/implementation-artifacts/2-3-floating-light-background.md` — story file created and tracked
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — updated `2-3-floating-light-background` to `review`

### Change Log

- 2026-05-23: Implemented Story 2.3 — created floating light background; `src/animations/floating-light.js`, updated `index.html`, `src/main.js`, `src/styles/main.css`

### Review Findings

- [x] [Review][Patch] No `will-change` on blur-animated beams — add `will-change: transform, opacity` to `.fl-beam` base rule [`src/styles/main.css:223`]

- [x] [Review][Defer] Relative `+=` values risk drift on re-init — `y: '-=35'`, `opacity: '+=0.08'` drift on HMR re-init; spec-specified values, static site, no re-init in production [`src/animations/floating-light.js:12-13`] — deferred, pre-existing
- [x] [Review][Defer] `position: fixed` inside `<main>` — ancestor transform/filter will silently break fixed positioning; shared architectural pattern with intro animation [`index.html:24`] — deferred, pre-existing
- [x] [Review][Defer] Beam widths degrade on narrow mobile viewports — `4vw–6vw` with `filter: blur(48–70px)` collapses beams to near-invisible on portrait mobile; Story 2.6 covers mobile [`src/styles/main.css:229`] — deferred, pre-existing
- [x] [Review][Defer] No cleanup/teardown for infinite tweens — `repeat: -1` with no kill path or double-init guard; irrelevant for static site, no SPA context [`src/animations/floating-light.js:12`] — deferred, pre-existing
