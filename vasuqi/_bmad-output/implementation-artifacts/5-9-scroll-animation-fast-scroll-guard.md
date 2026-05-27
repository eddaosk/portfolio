# Story 5.9: Scroll Animation Fast-Scroll Guard

Status: ready-for-dev

## Story

As a visitor who scrolls quickly through the landing page,
I want all animated sections to be fully visible when I arrive at them — even if I scroll past the trigger point before the animation fires,
so that no content is ever left invisible or in a broken mid-animation state.

## Acceptance Criteria

**AC1 — All `animateSection()` triggers fire at `top 85%` (ANIM-1 ①):**
Given any animated section on the landing page
When the user scrolls the page at any speed
Then each ScrollTrigger fires when the top of the trigger element reaches 85% from the top of the viewport — not 75%; `start: 'top 85%'` is set in `animateSection()` in `src/animations/scroll.js`

**AC2 — Animated elements are never left invisible on fast-scroll (ANIM-1 ②):**
Given any element targeted by `animateSection()`
When the user scrolls past its trigger point before ScrollTrigger registers the entry
Then the element is fully visible (opacity 1, natural position) — not stuck at the GSAP from-state `{opacity: 0, y: 40}`; this is achieved via `immediateRender: false` on every `gsap.from()` call in `animateSection()`

**AC3 — `ScrollTrigger.refresh()` is called on page `load` (ANIM-1 ②):**
Given a page where layout settles after DOMContentLoaded (fonts, images, lazy-loaded assets)
When the `load` event fires
Then `ScrollTrigger.refresh()` is called once to recalculate all trigger positions and immediately play any animation whose trigger is already in or above the viewport

**AC4 — Content-critical animations added in Epic 5 use `invalidateOnRefresh: true` (ANIM-1 ③):**
Given any new scroll-triggered animation added in Stories 5.2–5.4 that uses `stroke-dashoffset` or a numeric from-value that depends on the element's rendered size (e.g., chart lines, path draw-on)
When `ScrollTrigger.refresh()` is called (e.g., on resize or orientation change)
Then the animation recalculates its from-values rather than persisting stale inline styles; these animations include `invalidateOnRefresh: true` in their ScrollTrigger config

**AC5 — No `toggleClass` is used as the sole visibility mechanism (ANIM-1 ④):**
Given all scroll-triggered animations across `scroll.js` and any new animations in Epic 5
When audited
Then no element relies exclusively on a CSS class toggle for visibility; every animation that starts from `opacity: 0` either uses `immediateRender: false` (AC2) or has an explicit fallback that makes content visible after the animation duration

## Tasks / Subtasks

- [ ] Update `animateSection()` in `src/animations/scroll.js` (AC: 1, 2)
  - [ ] Change `start: 'top 75%'` → `start: 'top 85%'` in the ScrollTrigger config inside `animateSection()`
  - [ ] Add `immediateRender: false` to the `gsap.from()` options object (same level as `y`, `opacity`, `duration`)
  - [ ] Verify both changes apply to all 4 `animateSection()` calls in `initScrollAnimations()`

- [ ] Add `ScrollTrigger.refresh()` on page load (AC: 3)
  - [ ] In `src/main.js`, inside the `DOMContentLoaded` handler, add:
    ```js
    window.addEventListener('load', () => ScrollTrigger.refresh())
    ```
  - [ ] Place this after all `init*()` calls so all triggers are registered before refresh runs

- [ ] Audit new Epic 5 animations for content-critical compliance (AC: 4, 5)
  - [ ] After Stories 5.2–5.4 are implemented, review any new `gsap.from()` / `gsap.fromTo()` / `gsap.to()` calls that use `stroke-dashoffset` or dimension-dependent from-values
  - [ ] Add `invalidateOnRefresh: true` to their ScrollTrigger config if not already present
  - [ ] Confirm no `toggleClass` is used as sole visibility control in newly added animations

## Dev Notes

### Core change — what and why

Current `animateSection()` uses `gsap.from()` with `immediateRender: true` (GSAP default). This means: on page load, all target elements are **immediately set to `{y:40, opacity:0}`** in the DOM, before any ScrollTrigger fires. If a user fast-scrolls past a section before the ScrollTrigger RAF tick processes the entry, the element is stuck at `opacity:0` and the animation never plays — rendering content invisible.

Fixes:
1. `immediateRender: false` — GSAP does not apply the "from" state until the trigger fires. Elements remain at their natural visible state until ScrollTrigger says "now animate". A fast-scroller who blasts past a trigger will see the element at full opacity (because GSAP never hid it).
2. `start: 'top 85%'` — fires earlier in the scroll, giving fast scrollers more runway before they reach the section center.
3. `ScrollTrigger.refresh()` on `load` — recalculates trigger positions after fonts and images have settled layout, and immediately plays any animation whose trigger is already in the viewport (e.g., a section visible on a tall monitor).

### `immediateRender: false` — subtle behaviour note

With `immediateRender: false`, the element is visible at its natural state before the trigger fires. On a large monitor or when the page loads mid-scroll, an element in the initial viewport will briefly be at `opacity:1, y:0` before the tween sets it to `opacity:0` and animates it in. The `start: 'top 85%'` guard minimises this window — the trigger fires while the element's top is still near the bottom of the viewport, so the transition from natural state → from-state → final state happens quickly and is unlikely to be perceptible in practice. This is an acceptable trade-off to prevent invisible content.

### Content-critical animations (Story 5.2 — GAP-5 chart lines)

Story 5.2 adds a stroke-dashoffset draw-on animation for the SVG chart lines. The `dashoffset` from-value depends on `path.getTotalLength()`, which is computed at runtime from the rendered path. On `ScrollTrigger.refresh()` (triggered by resize or orientation change), a stale `dashoffset` value would render the path partially drawn or invisible.

For this and any similar size-dependent animation, use:
```js
invalidateOnRefresh: true,
immediateRender: false,
```
in the ScrollTrigger config. `invalidateOnRefresh: true` causes GSAP to clear the inline styles and re-run `vars` on each refresh, so `getTotalLength()` is re-evaluated.

Story 5.9 is best run **after** Stories 5.2–5.4 so the audit step (AC4) can verify all new animations at once. If Story 5.9 is run first, the Story 5.2 implementer must add `invalidateOnRefresh: true` to the chart line animation independently — this requirement is already noted in the gap audit (ANIM-1 ③).

### Files touched

- `src/animations/scroll.js` — `animateSection()` change (AC1, AC2)
- `src/main.js` — add `window.addEventListener('load', ...)` (AC3)
- Any new animation files from Stories 5.2–5.4 if they need AC4 patching

### GSAP version

GSAP 3.15.0 — `immediateRender` and `invalidateOnRefresh` have been stable since GSAP 3.0. No version-specific concerns.

### Project Structure Notes

- Scroll animations: `src/animations/scroll.js` — `animateSection()` function
- Animation constants: `src/animations/constants.js` — `WATER_EASE`, `WATER_DURATION`, `WATER_STAGGER` (no changes needed here)
- Main entry: `src/main.js` — add `load` listener after `initScrollAnimations()` call
- New Epic 5 animations will live in `src/animations/scroll.js` (extensions to `initScrollAnimations()`) or inline in `src/main.js` for page-specific animations

### References

- Gap audit code: ANIM-1
- Source: `_bmad-output/planning-artifacts/epic5-gap-audit.md`
- Story dependency: Ideally run after Stories 5.2–5.4 are complete so the AC4 audit can cover all new animations

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
