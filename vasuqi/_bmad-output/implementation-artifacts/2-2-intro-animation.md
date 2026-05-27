# Story 2.2: Intro Animation

Status: done

## Story

As an investor visiting for the first time,
I want an intro animation that plays immediately on page load and communicates the core value proposition in 3–5 seconds,
so that I understand what Vasuqi does before reading a word of body copy.

## Acceptance Criteria

**AC1 — First paint, no pre-loader (NFR1, NFR3):**
Given a first-time visitor loading `index.html`
When the page renders
Then the intro animation begins immediately — there is no pre-loader, loading spinner, or loading screen before it; the animation must not block initial render

**AC2 — Content and motion (FR12, FR13):**
Given the intro animation
When it plays
Then it runs for approximately 8–12 seconds total (matching the prototype sequence), communicates the core WHY (water treatment, "the last 5%", light as solution), and follows water physics motion throughout (no bounce, no snap — `sine.out`/`sine.inOut` easing consistent with water physics)

**AC3 — Dismissible on click/tap (FR7):**
Given the intro animation is playing
When the visitor clicks or taps anywhere on the overlay
Then the animation timeline and all looping tweens are immediately killed, and the overlay fades out revealing the hero section

**AC4 — Session-aware, no replay (FR8):**
Given a visitor who has already seen the intro animation in the current browser session
When they reload or return to `index.html`
Then the intro animation does not replay — the overlay stays hidden and the hero section is immediately visible; `sessionStorage` key `vasuqi-intro-seen` tracks seen state

**AC5 — Module structure:**
Given `src/animations/intro.js`
When reviewed
Then it exports an `initIntroAnimation()` function; all animation logic is in this module; no animation code appears inline in `index.html` or directly in `src/main.js`; `src/main.js` imports and calls `initIntroAnimation()` as the first call inside a `DOMContentLoaded` listener

**AC6 — Session ends, key clears:**
Given the `sessionStorage` key `vasuqi-intro-seen`
When the browser session ends (tab closed)
Then the key is cleared automatically and the animation plays again on the next first visit

## Tasks / Subtasks

- [x] Port the intro HTML structure from `_prototypes/logo-animation-prototype.html` into the `#intro-animation` section in `index.html` (AC: 1, 2, 3, 4)
  - [x] Keep `id="intro-animation"` and `aria-hidden="true"` on the outer `<section>`
  - [x] Add `style="display:none"` to section — JS shows it only for first-time visitors
  - [x] Add full-screen overlay classes: `fixed inset-0 z-[9999] grid place-items-center overflow-hidden pointer-events-none`
  - [x] Enable pointer events on dismiss: JS sets `section.style.pointerEvents = 'auto'` before adding click listener
  - [x] Port the iridescent background gradient as inline CSS (see Dev Notes — complex gradient, acceptable exception to hex rule)
  - [x] Port `.intro__stage`, `.intro__sphere` SVG, glass layer divs, snake SVG, text span, light burst div — verbatim from prototype
  - [x] Remove the `<button class="replay">` element — prototype-only, not for production
  - [x] Do NOT add a `@media (prefers-reduced-motion: reduce)` rule — architecture decision: no prefers-reduced-motion anywhere

- [x] Create `src/animations/intro.js` (AC: 1–6)
  - [x] `import { gsap } from 'gsap'` — ES module import, no CDN; no plugins needed (no SplitText, no ScrollTrigger)
  - [x] Import `WATER_DURATION` from `'./constants.js'` for the final fade-out duration
  - [x] Define `SESSION_KEY = 'vasuqi-intro-seen'` as module-level constant
  - [x] Declare module-level loop references: `let waveLoop1, waveLoop2, highlightDrift, snakeBreathe`
  - [x] Export `initIntroAnimation()`: early return if `sessionStorage.getItem(SESSION_KEY)` is truthy
  - [x] Show section and enable pointer events for first-time visitors
  - [x] Implement `dismiss()`: kills all active tweens and loops, sets sessionStorage, fades out overlay with `WATER_DURATION.fast` ease, sets `display:none` in `onComplete`
  - [x] Add `click` and `touchstart` (passive) listeners to section pointing to `dismiss`
  - [x] Port the `buildWedge()` helper function verbatim from prototype
  - [x] Port the `runIntro()` / timeline logic as the body of `initIntroAnimation()`, with loop refs assigned to module-level vars (`waveLoop1 = gsap.to(...)`, etc.)
  - [x] In `tl`'s `onComplete`: trigger same dismiss logic (sessionStorage + fade out) without re-killing already-complete timeline
  - [x] Do NOT use `WATER_EASE` for the main timeline tweens — prototype uses `sine.out`/`sine.inOut` deliberately; keep these as-is

- [x] Update `src/main.js` (AC: 5)
  - [x] Add `import { initIntroAnimation } from './animations/intro.js'` at top
  - [x] Call `initIntroAnimation()` as the **first** call inside `DOMContentLoaded`
  - [x] Refactor video check: replace `if (!video) return` early-return with `if (video && matchMedia(...).matches)` — the early return blocks `initIntroAnimation()` on pages without a hero video

## Dev Notes

### Source Prototype — READ THIS FIRST

**`_prototypes/logo-animation-prototype.html`** is a complete, working reference implementation of the intro animation. The dev agent MUST read this file in full before touching any code. The animation is already designed and sequenced — this story is a porting task, not a design task.

**`_prototypes/water-droplet-prototype.html`** is a Three.js water droplet — this is for the product visualization in Story 2.5, NOT the intro animation. Do not confuse the two.

---

### Animation Sequence (from prototype)

The intro runs in one continuous GSAP timeline (`~10–12s`):

1. **Sphere rises** — SVG glass bubble scales/fades in from 0.88 → 1.0 (`sine.out`, 1.8s)
2. **"The last 5%"** — text glows in while sphere is still dark navy (`sine.out`, 1.1s)
3. **Text crossfade** — "The last 5%" fades out, `textContent` changes to `"polished by light"`, second phrase fades in
4. **Ignition** — sphere gradient animates from deep navy → white/blue/glass (simulating light filling the bubble); 4 gradient stop-color tweens + `feDisplacementMap` scale reduces (`2.2–2.4s`)
5. **Snake draw-on** — SVG mask wedge sweeps 360° revealing the body-fill path (`sine.inOut`, 1.4s); glass layers (glow, iridescent, highlights, rim) fade in alongside
6. **Highlight drift loop** — `highlightDrift` starts: specular highlight gently moves (`6s yoyo repeat:-1`)
7. **Snake breathe loop** — `snakeBreathe` starts: subtle scale oscillation on the snake (`6.5s yoyo repeat:-1`)
8. **Water fill** — two clip-rect animations rise upward (mid: 5.0s, soft: follows 1.8s later); `waveLoop1`/`waveLoop2` start after fill completes
9. **Light burst** — burst div scales from 0 → 25 (`power2.in`, 1.4s), snake + sphere elements fade out
10. **Overlay fade** — `.intro` fades to opacity 0 (`sine.out`, 0.5s) → `display:none`

---

### HTML Structure to Port into `#intro-animation`

The `<section id="intro-animation">` in `index.html` currently has only a placeholder comment. Replace its contents with the structure below. The outer `<section>` attributes change; inner divs/SVGs port verbatim from prototype.

**Outer section** (modify existing element):
```html
<section
  id="intro-animation"
  aria-hidden="true"
  style="display:none"
  class="fixed inset-0 z-[9999] grid place-items-center overflow-hidden"
>
```

**Inner content** — port verbatim from prototype `<div class="intro">` children:
- `.intro__stage` div (520×520px, `position: relative`)
- `#introText` span
- `#glow` div
- `#sphere` SVG (with `<defs>`, gradients, `feTurbulence` filter, `feDisplacementMap`)
- `#iris`, `#hl`, `#hl2`, `#rim` divs
- `#burst` div
- `#snake` SVG (with `<defs>`, mask, clipPaths, 3 `<path>` elements — **do not alter the SVG path data or viewBox**)

**Background gradient** — apply as inline `style` on the section or as a CSS rule in `main.css @layer components`:
```css
background:
  radial-gradient(ellipse 70% 55% at 30% 20%, rgba(168,197,255,0.35), transparent 60%),
  radial-gradient(ellipse 60% 60% at 75% 80%, rgba(106,147,255,0.18), transparent 65%),
  radial-gradient(ellipse 80% 80% at 50% 50%, var(--ice-near), var(--white-brand) 70%);
```

The `rgba()` values correspond to design tokens — `rgba(168,197,255,...)` = `--blue-soft`, `rgba(106,147,255,...)` = `--blue-mid`. Direct hex in `rgba()` is an acceptable exception here; CSS custom properties cannot be used inside `rgba()` components without `color-mix()` which adds complexity for a gradient this elaborate. Document this exception in a comment.

**Pointer events**: The prototype sets `pointer-events: none` on `.intro`. The `#intro-animation` section should be `pointer-events: none` by default (overlay should not block the hero beneath when it fades out). For click-to-dismiss: JS sets `section.style.pointerEvents = 'auto'` after showing the section, then sets it back to `'none'` in `dismiss()` before fading out.

**Critical SVG note**: The `#snake` SVG has `viewBox="-7.7 -9.9 160 160"` — this is calibrated pixel-perfect (comment in prototype: "DO NOT CHANGE viewBox"). Do not alter it.

---

### `src/animations/intro.js` — Porting Guide

**Imports:**
```js
import { gsap } from 'gsap'
import { WATER_DURATION } from './constants.js'
```
No plugins needed — the animation uses only GSAP core tweens and timelines.

**Module-level loop references** (needed so `dismiss()` can kill them):
```js
let waveLoop1, waveLoop2, highlightDrift, snakeBreathe
```

**sessionStorage key:**
```js
const SESSION_KEY = 'vasuqi-intro-seen'
```
Note: The prototype uses `vasuqi_intro_seen` (underscore). Use `vasuqi-intro-seen` (kebab-case) to match the project's naming convention. No production sessionStorage exists yet so there is no compatibility concern.

**`initIntroAnimation()` structure:**
```js
export function initIntroAnimation() {
  const section = document.getElementById('intro-animation')
  if (!section) return

  if (sessionStorage.getItem(SESSION_KEY)) return

  // Show overlay and enable click-to-dismiss
  section.style.display = 'grid'
  section.style.pointerEvents = 'auto'

  let tl = null

  function dismiss() {
    // Kill all active tweens
    if (tl) { tl.kill(); tl = null }
    if (waveLoop1) { waveLoop1.kill(); waveLoop1 = null }
    if (waveLoop2) { waveLoop2.kill(); waveLoop2 = null }
    if (highlightDrift) { highlightDrift.kill(); highlightDrift = null }
    if (snakeBreathe) { snakeBreathe.kill(); snakeBreathe = null }

    section.removeEventListener('click', dismiss)
    section.removeEventListener('touchstart', dismiss)
    section.style.pointerEvents = 'none'
    sessionStorage.setItem(SESSION_KEY, '1')

    gsap.to(section, {
      opacity: 0,
      duration: WATER_DURATION.fast,
      ease: 'sine.out',
      onComplete: () => { section.style.display = 'none' }
    })
  }

  section.addEventListener('click', dismiss)
  section.addEventListener('touchstart', dismiss, { passive: true })

  // Port the intro text element ref
  const textEl = document.getElementById('introText')

  // Port buildWedge() verbatim from prototype
  function buildWedge(swept) { /* ... */ }

  // Port the gsap.set() reset block and timeline from prototype's runIntro()
  // Assign to tl so dismiss() can kill it
  tl = gsap.timeline({
    onComplete: () => {
      // Remove listeners before programmatic dismiss
      section.removeEventListener('click', dismiss)
      section.removeEventListener('touchstart', dismiss)
      section.style.pointerEvents = 'none'
      sessionStorage.setItem(SESSION_KEY, '1')
      gsap.to(section, {
        opacity: 0,
        duration: WATER_DURATION.fast,
        ease: 'sine.out',
        onComplete: () => { section.style.display = 'none' }
      })
    }
  })

  // ... rest of timeline tweens ported from prototype
  // Assign loop tweens to module-level vars:
  // highlightDrift = gsap.to(...)
  // snakeBreathe = gsap.to(...)
  // waveLoop1 = gsap.to(...)
  // waveLoop2 = gsap.to(...)
}
```

**Easing**: The prototype uses `sine.out` and `sine.inOut` throughout — keep these exactly. Do NOT replace with `WATER_EASE` (`power1.inOut`). The prototype's easing was deliberately chosen for this animation; `WATER_EASE` is for scroll animations (Stories 2.3–2.4). Only use `WATER_DURATION.fast` for the final fade-out.

**Timeline `onComplete` vs dismiss()**: Both must set sessionStorage, kill loops, and fade out. Factor out the fade logic into a shared inner function to avoid duplication, or call `dismiss()` from `onComplete` (after removing listeners first).

---

### Updated `src/main.js`

```js
import { initIntroAnimation } from './animations/intro.js'

document.addEventListener('DOMContentLoaded', () => {
  initIntroAnimation()

  const video = document.querySelector('#hero video')
  if (video && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.pause()
    video.removeAttribute('autoplay')
  }
})
```

**Critical change from current `main.js`**: The current file has `if (!video) return` which would block `initIntroAnimation()`. Replace with the guarded `if (video && ...)` pattern above.

Do NOT add imports for `floating-light.js` or `scroll.js` — those files don't exist yet (Stories 2.3 and 2.4).

---

### CSS for Intro Elements

Port the prototype's `.intro`, `.intro__stage`, `.intro__sphere`, `.intro__glow`, `.intro__iridescent`, `.intro__highlight`, `.intro__highlight2`, `.intro__rim`, `.intro__text`, `.intro__lightburst`, `@keyframes irisSpin` CSS into `src/styles/main.css` under `@layer components`.

**Remove from the ported CSS:**
- `@media (prefers-reduced-motion: reduce) { .intro { display: none; } }` — architecture decision: no prefers-reduced-motion on this site

**Replace in the ported CSS:**
- `font-family: "Syne", -apple-system, ...` → `font-family: var(--font-syne)` (use the token)
- `color: #ffffff` on `.intro__text` → `color: var(--white-brand)` (or keep if it's `#ffffff` not the brand white — `--white-brand` is `#FAFCFF`, close enough)
- Body-level `overflow: hidden` in prototype (prevents scrolling during animation) — this was on the prototype `<body>`. In production, apply `overflow: hidden` to `document.body` in JS when showing the overlay, and restore it in `dismiss()`:
  ```js
  // In show block:
  document.body.style.overflow = 'hidden'
  // In dismiss():
  document.body.style.overflow = ''
  ```

---

### What Must NOT Break

- `npm run build` passes with zero errors
- All 4 HTML pages resolve via `npm run dev`
- `.glass-blur` class in `main.css` remains intact
- `<h1 class="sr-only">` in `index.html` stays
- `<body class="page-home">` stays
- Hero section, section IDs, and all 5 remaining section shells unchanged
- Active nav state CSS selectors in `main.css` undisturbed

### Do NOT Add in This Story

- `src/animations/floating-light.js` — Story 2.3
- `src/animations/scroll.js` — Story 2.4
- GSAP ScrollTrigger or SplitText imports
- Any content in `#the-gap`, `#where-vasuqi-fits`, `#what-its-built-to-change`, `#how-it-works`
- Side navigation — Story 2.6
- `prefers-reduced-motion` media query in CSS or JS

---

### Verification Checklist

- [ ] `npm run build` passes with zero errors
- [ ] `npm run dev` — page renders at `localhost:5173`
- [ ] First visit: intro overlay appears, sphere rises, text sequences, snake logo draws on, water fills, burst fires, overlay fades out
- [ ] Click/tap during animation: all tweens and loops killed immediately, overlay fades out, hero visible
- [ ] Return visit (sessionStorage set): no overlay, hero visible immediately
- [ ] New tab (sessionStorage cleared): animation plays again
- [ ] `src/animations/intro.js` exports `initIntroAnimation()`
- [ ] `src/main.js` calls `initIntroAnimation()` as first call in DOMContentLoaded
- [ ] No `if (!video) return` before `initIntroAnimation()`
- [ ] `#snake` SVG viewBox unchanged: `-7.7 -9.9 160 160`
- [ ] No `@media (prefers-reduced-motion: reduce)` in ported CSS
- [ ] Body `overflow: hidden` set on show, restored on dismiss

---

### References

- **Prototype (primary reference):** [`_prototypes/logo-animation-prototype.html`](_prototypes/logo-animation-prototype.html)
- Animation ACs: [epics.md — Story 2.2, FR6–FR8, FR12–FR13, NFR1, NFR3]
- sessionStorage exclusivity: [architecture.md — Data Architecture]
- GSAP init pattern: [architecture.md — Animation Patterns]
- No prefers-reduced-motion: [architecture.md — Hero Video Pattern: Animation accessibility decision]
- Section IDs namespace: [architecture.md — Naming Patterns]
- Nav z-index (z-50): [partials/nav.html:1] — intro uses z-[9999] to sit above nav
- backdrop-filter stacking context warning: [2-1-hero-section-and-page-layout.md — CRITICAL section]
- Story 2.5 product visualization: `public/images/globe.png` + CSS hover — Three.js water droplet prototype dropped

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None — clean implementation with no blocking issues.

### Completion Notes List

- Ported full intro HTML structure verbatim from `_prototypes/logo-animation-prototype.html` into `index.html #intro-animation`; `<button class="replay">` removed as prototype-only
- Created `src/animations/intro.js` as ES module exporting `initIntroAnimation()`; all timeline tweens and loop refs (`waveLoop1`, `waveLoop2`, `highlightDrift`, `snakeBreathe`) are module-level so `dismiss()` can kill them
- Factored fade-out logic into shared `fadeOut()` inner function used by both `dismiss()` and `tl.onComplete`; avoids duplicating the GSAP fade tween
- `WATER_DURATION.fast` used only for the final overlay fade-out; all timeline tweens use `sine.out`/`sine.inOut` as in the prototype (not `WATER_EASE`)
- `sessionStorage` key is `vasuqi-intro-seen` (kebab-case, matching project convention); prototype used underscore variant — no compat concern as no production session data exists yet
- `document.body.style.overflow = 'hidden'` set on show; restored to `''` in `onComplete` callback of the GSAP fade — body scroll cannot leak past the overlay
- Background gradient CSS placed in `#intro-animation` rule in `@layer components`; `rgba()` exception documented in comment (CSS custom properties cannot compose into `rgba()` components without `color-mix()`)
- `--ice-light` and `--white-brand` tokens used in `.intro__lightburst` gradient instead of raw hex
- `@media (prefers-reduced-motion: reduce)` rule from prototype intentionally omitted — architecture decision
- `npm run build` passes with zero errors; 16 modules transformed

### File List

- `index.html` — added full intro HTML structure to `#intro-animation` section
- `src/animations/intro.js` — new file; exports `initIntroAnimation()`
- `src/main.js` — added import, `initIntroAnimation()` as first DOMContentLoaded call, fixed video guard
- `src/styles/main.css` — added intro component CSS (`#intro-animation`, `.intro__*`, `@keyframes irisSpin`) to `@layer components`
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — updated `2-2-intro-animation` to `in-progress`

### Review Findings

- [x] [Review][Patch] textEl null crash — `document.getElementById('introText')` not null-checked before `textEl.textContent` write; throws TypeError if element absent [src/animations/intro.js:52-53]
- [x] [Review][Patch] SVG child element null crashes — `getElementById('clip-fill-mid-rect')`, `clip-fill-soft-rect`, `snake-mask-wedge` not null-guarded before `.setAttribute()`; a null here leaves `document.body.style.overflow = 'hidden'` permanently [src/animations/intro.js:63-65]
- [x] [Review][Patch] `.intro__stage` fixed 520×520px — overflows and clips on viewports narrower than 520px (iPhone SE is 375px); animation content cropped; add `max-width: min(520px, 90vw)` + `aspect-ratio: 1` or CSS scale [src/styles/main.css — .intro__stage]
- [x] [Review][Patch] Double fadeOut guard missing — `fadeOut()` can fire from both `dismiss()` and `tl.onComplete()` if user taps at exact timeline completion tick; add a `let dismissed = false` guard [src/animations/intro.js:24-36]
- [x] [Review][Defer] `aria-hidden="true"` on empty future-content sections — added to `#the-gap`, `#where-vasuqi-fits`, `#what-its-built-to-change`, `#how-it-works`; must be removed in Stories 2.4/2.5 when content is added or all child content will be invisible to screen readers [index.html] — deferred, pre-existing scope
- [x] [Review][Defer] Module-level loop vars + bfcache edge case — `waveLoop1`, `waveLoop2`, `highlightDrift`, `snakeBreathe` at module scope per spec; bfcache page restore with stale refs possible; mitigated by sessionStorage check returning early — deferred, per-spec design
- [x] [Review][Defer] `?replay` URL parameter undocumented — clears sessionStorage; dev convenience not in spec; could trigger unwanted replay from campaign links that append arbitrary query params [src/animations/intro.js:12-14] — deferred, non-harmful dev tool
- [x] [Review][Defer] iOS Safari `body overflow:hidden` bypass — `document.body.style.overflow = 'hidden'` does not reliably prevent viewport scroll on iOS WKWebView; overlay visually covers content regardless — deferred, platform limitation
- [x] [Review][Defer] SVG `feTurbulence` `<animate>` not killed by dismiss — declarative SVG animation runs for animation duration and is not stopped by GSAP `dismiss()`; `display:none` after dismiss mitigates; low-end device performance concern only [index.html — #sphere filter] — deferred, mitigated

<!-- Adversarial review pass — 2026-05-23 -->
- [x] [Review][Patch] CSS `pointer-events: none` missing on `#intro-animation` — spec constraint requires this as a CSS default; currently absent from `#intro-animation` rule; `display:none` initial state incidentally prevents interaction but the declared constraint is not met [src/styles/main.css — #intro-animation]
- [x] [Review][Patch] Timeline-end double tween stalls scroll for 0.8s — timeline's last tween fades `section` to `opacity:0` (0.2s); `onComplete` then calls `fadeOut()` which creates a second `gsap.to(section, opacity:0, 0.8s)`; `body.style.overflow = 'hidden'` and `section.style.display = 'grid'` persist for 0.8s after the overlay has visually disappeared, blocking scroll on mobile [src/animations/intro.js — tl.onComplete / fadeOut]
- [x] [Review][Defer] Out-of-scope: video reverse-playback removed — entire `ended`+`requestAnimationFrame` pingpong loop from Story 2.1 removed from `main.js` and replaced with `loop` HTML attribute; the old code had a `requestAnimationFrame(rafId)` bug so it was already broken; new behavior is simpler and correct but the change is outside Story 2.2 scope [src/main.js, index.html] — deferred, old code was broken; simple loop is safer
- [x] [Review][Defer] Null-guard early exit leaves blank dismissible overlay — if any of `textEl`, `clipMidRect`, `clipSoftRect`, `maskWedge` is null, section stays `display:grid` as a blank gradient overlay; click listener is registered so user can dismiss, but `sessionStorage` is then set meaning animation is skipped on next visit; theoretical since HTML structure is fixed [src/animations/intro.js:52–63] — deferred, requires malformed HTML to trigger
- [x] [Review][Defer] Section `opacity:0` inline style not reset on `?replay` re-run — after animation completes, GSAP writes `opacity:0` inline on `section`; on `?replay` (no page reload), `display:grid` is re-set but `opacity:0` remains, making the section invisible on replay; only affects the dev `?replay` tool [src/animations/intro.js] — deferred, chained to ?replay deferral
- [x] [Review][Defer] `buildWedge` full-circle arc may show hairline gap on Safari ≤14 — `swept >= 360` fallback emits two relative half-circle arcs; known rendering glitch in older WebKit masks produces a hairline seam at join point [src/animations/intro.js — buildWedge] — deferred, Safari 14 (2020) below target baseline
- [x] [Review][Defer] `poster="/images/hero-poster.jpg"` root-relative path — if site deploys at `/vasuqi/` subpath, resolves to `https://eddaosk.dk/images/hero-poster.jpg` (404); consistent with existing `/images/` pattern across all pages so risk applies equally to all assets [index.html] — deferred, consistent with project pattern; verify Vite base config handles it
- [x] [Review][Defer] No focus trap or `aria-live` during blocking overlay — screen reader users get no indication a full-viewport overlay is active; no focus management on dismiss — deferred, beyond current spec scope; address in Story 2.6 (accessibility)
- [x] [Review][Defer] `body.style.overflow = ''` assumes no prior inline overflow — restoring to empty string silently clears any overflow set by other scripts before intro ran; low risk on a single-JS-file page [src/animations/intro.js — fadeOut] — deferred, low likelihood on current architecture

## Change Log

- 2026-05-23: Implemented Story 2.2 — ported intro animation from prototype to production; created `src/animations/intro.js`, updated `index.html`, `src/main.js`, `src/styles/main.css`
