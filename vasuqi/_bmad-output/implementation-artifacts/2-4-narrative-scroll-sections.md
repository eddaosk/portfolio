# Story 2.4: Narrative Scroll Sections — The Gap, Where Vasuqi Fits, What It's Built to Change

Status: done

## Story

As an investor scrolling the landing page,
I want the three middle narrative sections to animate in as I scroll and make a clear, credible argument for Vasuqi's market position,
so that by the time I reach "How It Works" I am already convinced the problem is real.

## Acceptance Criteria

**AC1 — ScrollTrigger entrance animations (FR13):**
Given the landing page with `#the-gap`, `#where-vasuqi-fits`, and `#what-its-built-to-change` sections
When the visitor scrolls each section into view
Then section elements animate in via GSAP ScrollTrigger using `WATER_EASE`, `WATER_DURATION.default`, and `WATER_STAGGER` from `src/animations/constants.js`; each section has its own named ScrollTrigger instance

**AC2 — Once-only animations:**
Given each ScrollTrigger instance
When reviewed
Then `once: true` is set — animations play once on scroll-into-view and do not reverse on scroll-out

**AC3 — Water cycle SVG on desktop (FR10, UX-DR8):**
Given the `#where-vasuqi-fits` section on a desktop viewport (`lg`+)
When rendered
Then `public/svgs/reactor-bluebrint-where-it-fits.svg` is displayed as an `<img>` element with descriptive `alt` text, showing where Vasuqi's system slots into the treatment process

**AC4 — Water cycle SVG mobile layout (UX-DR8):**
Given the same section on a viewport below `md` (768px)
When rendered
Then the SVG diagram switches to a mobile-specific layout — not a scaled-down version of the desktop layout; the diagram remains legible at 320px width

**AC5 — Exact section IDs (shared namespace):**
Given all three sections
When reviewed for HTML section IDs
Then they use exactly `id="the-gap"`, `id="where-vasuqi-fits"`, `id="what-its-built-to-change"` — these already exist as empty shells in `index.html`; the story fills in the content

**AC6 — scroll.js module (architecture rule):**
Given all scroll animation modules
When reviewed
Then they are contained in `src/animations/scroll.js`, exported as `initScrollAnimations()`, and imported by `src/main.js` — no animation logic is inline in HTML or `main.js`

**AC7 — Remove aria-hidden from sections:**
Given `index.html`
When the story 2.4 content is implemented
Then `aria-hidden="true"` is removed from `#the-gap`, `#where-vasuqi-fits`, and `#what-its-built-to-change` — the deferred work log explicitly requires this (see Dev Notes)

**AC8 — Z-index ordering:**
Given the three sections and the floating light background
When rendered
Then section content uses `relative z-10` or higher so it sits above the floating light (`z-[1]`) and is fully readable

## Tasks / Subtasks

- [x] Create `src/animations/scroll.js` with `initScrollAnimations()` (AC: 1, 2, 6)
  - [x] Import `gsap` from `'gsap'`
  - [x] Import `ScrollTrigger` from `'gsap/ScrollTrigger'`
  - [x] Register: `gsap.registerPlugin(ScrollTrigger)`
  - [x] Import `WATER_EASE`, `WATER_DURATION`, `WATER_STAGGER` from `'./constants.js'`
  - [x] Export `initScrollAnimations()` function
  - [x] Implement `animateSection(trigger, elements)` helper that creates a `gsap.from()` with `y: 40, opacity: 0, duration: WATER_DURATION.default, ease: WATER_EASE, stagger: WATER_STAGGER` and `scrollTrigger: { trigger, start: 'top 75%', once: true }`
  - [x] Call `animateSection` for each of the three sections targeting `.section-heading` and `.section-body` elements

- [x] Update `src/main.js` to import and call `initScrollAnimations()` (AC: 6)
  - [x] Add `import { initScrollAnimations } from './animations/scroll.js'`
  - [x] Call `initScrollAnimations()` inside `DOMContentLoaded` after `initFloatingLight()`

- [x] Fill in `#the-gap` section in `index.html` (AC: 5, 7, 8)
  - [x] Remove `aria-hidden="true"` from the section element
  - [x] Add `class="relative py-[var(--space-section-y)] px-6 md:px-[3.125rem]"` (or equivalent)
  - [x] Add inner container `max-w-[var(--max-content-width)] mx-auto`
  - [x] Add `<h2 class="section-heading font-display ...">` — heading text: "The Last 5%" (matches Dev Notes copy guidance)
  - [x] Add `<p class="section-body font-body ...">` — body copy covering the EPR problem, pharmaceutical residues, regulatory urgency
  - [x] Use only `var(--token)` colour references; `z-10` or `relative z-10` on content container

- [x] Fill in `#where-vasuqi-fits` section in `index.html` (AC: 3, 4, 5, 7, 8)
  - [x] Remove `aria-hidden="true"` from the section element
  - [x] Add section heading `<h2 class="section-heading ...">Where Vasuqi Fits</h2>`
  - [x] Add `<img src="/svgs/reactor-bluebrint-where-it-fits.svg" alt="Water treatment cycle diagram showing where Vasuqi's photocatalytic reactor slots in after conventional treatment stages" class="... hidden md:block" loading="lazy">`
  - [x] Add mobile-specific layout below `md`: numbered step list of treatment cycle stages visible only at mobile (`class="block md:hidden"`)
  - [x] Ensure desktop `<img>` is full-width at `lg`, constrained with `max-w-full`

- [x] Fill in `#what-its-built-to-change` section in `index.html` (AC: 5, 7, 8)
  - [x] Remove `aria-hidden="true"` from the section element
  - [x] Add section heading `<h2 class="section-heading ...">What It's Built to Change</h2>`
  - [x] Add body copy covering the regulatory urgency (EPR 2028 deadline, EU Directive 2024/3019), market opportunity, and Vasuqi's positioning
  - [x] Maintain `relative z-10` on content containers

## Dev Notes

### Critical Deferred Work — Must Action in This Story

The code review of 2-2-intro-animation deferred this with explicit instruction:
> "`aria-hidden="true"` on empty future-content sections — added to `#the-gap`, `#where-vasuqi-fits`, `#what-its-built-to-change`, `#how-it-works`; must be removed in Stories 2.4/2.5 when content is added; risk of silent inaccessibility."

**This story MUST remove `aria-hidden="true"` from the three 2.4 sections.** Story 2.5 handles `#how-it-works`.

### Content Copy Guidance

Section headings and body copy must follow the golden circle (WHY → HOW → WHAT) and these tone rules:
- No hedging language ("might", "could", "potentially")
- No generic cleantech phrases ("sustainable", "green", "eco-friendly")
- Confident, precise, investor-facing
- Problem stated before solution

**The Gap:** Opens with the problem — the last 5–10% of industrial wastewater that conventional treatment cannot touch. Pharmaceutical APIs, dyes, recalcitrant organics. The regulatory urgency: EU EPR Directive 2024/3019, 2028 compliance deadline. €36B market exposure. 50% of monitored groundwater boreholes in Europe showing contamination.

**Where Vasuqi Fits:** After the diagram, a brief label explaining that Vasuqi's photocatalytic reactor is a plug-in polishing stage that follows conventional treatment — it finishes the job without chemistry or compromise.

**What It's Built to Change:** Vasuqi's positioning — first clean answer to the last 5% problem. Built on DTU research. Hardware-as-a-Service ARR model. Institutional backing (BII, Innofounder, DTU) de-risks the bet.

### SVG Asset — Confirmed Available

The water treatment cycle diagram is at `public/svgs/reactor-bluebrint-where-it-fits.svg` (already present in the repository — confirmed by `ls /public/svgs/`). The architecture spec called for `public/svgs/water-cycle-diagram.svg` as the filename, but the actual asset uses the current filename. Reference it as `/svgs/reactor-bluebrint-where-it-fits.svg` in the `<img src>`.

**Important:** This SVG stays as an `<img>` referenced file (not inlined) per the architecture asset strategy:
> "Water-cycle diagram → `public/svgs/` referenced as `<img>` (too large to inline)"

### GSAP ScrollTrigger — Correct Import Pattern

This project uses GSAP 3.15.0. ScrollTrigger is a plugin that must be **explicitly registered**:

```js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
```

Do NOT import from `'gsap/dist/ScrollTrigger'` — use `'gsap/ScrollTrigger'` (Vite resolves correctly).

### Architecture: scroll.js Pattern

Per the architecture document, the exact pattern for ScrollTrigger instances:

```js
gsap.from('#the-gap .section-heading', {
  y: 40, opacity: 0, duration: WATER_DURATION.default, ease: WATER_EASE,
  scrollTrigger: {
    trigger: '#the-gap',
    start: 'top 75%',
    once: true
  }
})
```

- `once: true` is **mandatory** — animations play on scroll-into-view and do not reverse on scroll-out
- `start: 'top 75%'` — section top hits 75% down the viewport; fires naturally without aggressive scroll
- `y: 40` — 40px downward offset, fades in upward; Water material language entrance
- Do NOT use `parallax`, `pin`, `scrub`, or `reverse` — these contradict water physics

### main.js — Current State

```js
// src/main.js (current)
import { initIntroAnimation } from './animations/intro.js'
import { initFloatingLight } from './animations/floating-light.js'

document.addEventListener('DOMContentLoaded', () => {
  initIntroAnimation()
  initFloatingLight()
  // video prefers-reduced-motion pause block also present
})
```

Add `initScrollAnimations` import and call. Complete final `src/main.js` must be:
```js
import { initIntroAnimation } from './animations/intro.js'
import { initFloatingLight } from './animations/floating-light.js'
import { initScrollAnimations } from './animations/scroll.js'

document.addEventListener('DOMContentLoaded', () => {
  initIntroAnimation()
  initFloatingLight()
  initScrollAnimations()

  const video = document.querySelector('#hero video')
  if (video && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.pause()
    video.removeAttribute('autoplay')
  }
})
```

Do NOT remove the video `prefers-reduced-motion` block — it was added in a prior story and must be preserved.

### Z-Index Architecture (Story 2.3 Note)

From the Story 2.3 dev notes, the z-index stack:
- `#floating-light` (`position: fixed; z-index: 1`) — sits above hero video but below content
- Hero content div (`relative z-10`) — established pattern
- Future sections (2.4, 2.5) should ensure text/interactive content uses `relative z-10` or higher

**Wrap each section's inner content container in `<div class="relative z-10">` or apply `relative z-10` to the section itself.** Do not apply z-index to the `<section>` element itself if it doesn't need a stacking context — prefer applying it to the content wrapper.

### Mobile SVG Layout — Implementation Approach

The spec requires a "mobile-specific layout — not a scaled-down version of the desktop layout" at below `md` (768px). Since a full separate SVG is not available, implement a text-based alternative for mobile:

- On desktop (`md:block hidden`): show the `<img>` SVG diagram
- On mobile (`block md:hidden`): show a numbered/labelled step list describing the treatment cycle:
  1. Intake / screening
  2. Primary treatment (settling)
  3. Biological treatment
  4. Tertiary / conventional chemical treatment
  5. **Vasuqi polishing reactor** — destroys what remains
  6. Discharge

Use Blueprint material language styling (clean linework aesthetic, `--steel` and `--blue-primary`, Manrope body font, tight spacing). This reads clearly at 320px and is more legible than a scaled-down SVG.

### Section Structure — HTML Pattern

Each section follows this skeleton:
```html
<section id="the-gap" class="relative py-[var(--space-section-y)] px-6 md:px-[3.125rem]">
  <div class="relative z-10 max-w-[var(--max-content-width)] mx-auto">
    <h2 class="section-heading font-display text-navy-deep"
        style="font-size: var(--text-h2-size); font-weight: var(--text-h2-weight); line-height: var(--text-h2-line-height);">
      Section Title
    </h2>
    <p class="section-body font-body text-navy-deep mt-6"
       style="font-size: var(--text-body-size); font-weight: var(--text-body-weight); line-height: var(--text-body-line-height);">
      Body copy.
    </p>
  </div>
</section>
```

Apply CSS tokens via inline `style` attribute for type scale (consistent with hero pattern in Story 2.1) or via `h2`/`p` global rules already defined in `src/styles/main.css @layer base`. The `@layer base` already has `h2` styles — prefer the semantic elements over inline style duplication.

**Typography already covered in @layer base (main.css):**
- `h2`: `font-family: var(--font-syne); font-size: var(--text-h2-size); font-weight: var(--text-h2-weight); line-height: var(--text-h2-line-height)`
- `h3`: similar
- Body: inherits `font-family: var(--font-manrope)` from `body`

So `<h2>` tags inside sections will automatically get the correct font/size — no inline style needed.

### DO NOT Implement in This Story

- `#how-it-works` section content — Story 2.5
- `src/animations/scroll.js` triggers for `#how-it-works` — Story 2.5 adds its own ScrollTrigger
- Side navigation — Story 2.6
- Product visualization / globe.png — Story 2.5
- GSAP SplitText on narrative text — architecture does not require it for these sections; SplitText is spec'd for the intro animation only
- Hover interactions beyond what Tailwind provides — this story is scroll-based entrance only

### What Must NOT Break

- `npm run build` passes with zero errors
- All 4 HTML pages resolve via `npm run dev`
- Intro animation (`z-[9999]`) still covers all content
- Floating light (`z-[1]`) still sits behind section content
- Nav bar still overlays all content
- Hero section unchanged
- `aria-hidden="true"` remains on `#how-it-works` and `#intro-animation` (only 2.4's three sections are cleared)
- `src/animations/constants.js` unchanged

### Previous Story Patterns (2.3)

From `floating-light.js`:
- Import pattern: `import { gsap } from 'gsap'`
- Constants import: `import { WATER_EASE, WATER_DURATION, WATER_STAGGER } from './constants.js'`
- Early-return guard: `if (!element) return`

Maintain these conventions in `scroll.js`.

### Build Verification

After implementation, verify:
1. `npm run build` completes with 0 errors
2. `npm run dev` — scroll to each of the three sections and confirm they animate in from `y: 40, opacity: 0`
3. Confirm `once: true` works — scroll up and back down, animations do NOT replay
4. Check `#where-vasuqi-fits` at 375px width — mobile layout (step list) should appear, desktop SVG should be hidden

---

### References

- FR10 (water cycle SVG), FR13 (water physics), FR9 (6 narrative sections)
- UX-DR8: water cycle diagram mobile vs desktop layout
- Architecture: `src/animations/scroll.js` file, ScrollTrigger pattern, `once: true` default
- Architecture: Section IDs shared namespace table
- Architecture: Animation file isolation rule (>50 lines → `src/animations/`)
- Deferred work: `aria-hidden` removal requirement from 2-2 code review
- Deferred work: Z-index note from Story 2.3 "Future sections should ensure content uses `relative z-10` or higher"
- Story 2.3 dev notes: Z-index stack (`#floating-light` at z-1, hero content at z-10)
- `public/svgs/reactor-bluebrint-where-it-fits.svg` — confirmed in repository

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None

### Completion Notes List

- Created `src/animations/scroll.js` with `initScrollAnimations()` and `animateSection()` helper following exact GSAP ScrollTrigger pattern from Dev Notes: `y: 40, opacity: 0, duration: WATER_DURATION.default, ease: WATER_EASE, stagger: WATER_STAGGER`, `start: 'top 75%'`, `once: true`
- Updated `src/main.js` to import and call `initScrollAnimations()` after `initFloatingLight()`; video prefers-reduced-motion block preserved
- Filled `#the-gap` section: removed `aria-hidden`, added full investor-facing copy covering pharmaceutical residues, EPR Directive 2024/3019, €36B market, 2028 deadline; `relative z-10` on inner container
- Filled `#where-vasuqi-fits` section: removed `aria-hidden`, added heading + description copy, desktop SVG diagram (`hidden md:block`, `loading="lazy"`), mobile step list (`block md:hidden`) with 6-stage treatment cycle using Blueprint styling — Blueprint language (steel/blue-primary colours, Manrope font, readable at 320px)
- Filled `#what-its-built-to-change` section: removed `aria-hidden`, added heading + copy covering DTU research, HaaS ARR model, institutional backing (BII, Innofounder, DTU), EPR compliance urgency
- `aria-hidden="true"` correctly preserved on `#how-it-works` (Story 2.5), `#intro-animation`, `#floating-light`, hero video, hero overlay
- Build: `npm run build` passes with 0 errors; 20 modules transformed

### File List

- src/animations/scroll.js (new)
- src/main.js (modified)
- index.html (modified)

### Review Findings

- [x] [Review][Patch] Named ScrollTrigger instances missing — AC1 requires each section to have its own named ScrollTrigger instance; added `id: trigger.replace(/^#/, '') + '-trigger'` to each `scrollTrigger` config so instances are retrievable via `ScrollTrigger.getById()` [`src/animations/scroll.js:24`]

- [x] [Review][Defer] `prefers-reduced-motion` not guarded in `scroll.js` — entrance animations run unconditionally for motion-sensitive users; consistent with project deferral of motion accessibility to Story 2.6 [`src/animations/scroll.js:32-36`] — deferred, Story 2.6 scope
- [x] [Review][Defer] GSAP animates `.section-steps` when it is `display:none` on desktop — `#where-vasuqi-fits .section-steps` is `block md:hidden`; GSAP runs `opacity:0→1` on the hidden element; harmless (display:none element is invisible regardless), but unnecessary [`src/animations/scroll.js:34`] — deferred, pre-existing mobile/desktop layout refinement

### Change Log

- 2026-05-23: Story 2.4 — Created scroll.js with GSAP ScrollTrigger once-only entrance animations for three narrative sections; filled in full content for #the-gap, #where-vasuqi-fits, #what-its-built-to-change; removed aria-hidden from all three sections per deferred work requirement from 2-2 code review; added mobile step-list alternative for water cycle SVG diagram
- 2026-05-24: Post-audit fix — added 4 benefit elements to `#what-its-built-to-change`: Water + Light material language blob-shaped cards using `recovery.svg`, `compliance.svg`, `disposal.svg`, `opex.svg`; iridescent `conic-gradient` shimmer border via CSS; content matches Figma (Recovery, Compliance, Disposal, OPEX); scroll.js updated to animate `.benefit-blob` on section entrance; UX spec updated to add Benefit elements component entry
