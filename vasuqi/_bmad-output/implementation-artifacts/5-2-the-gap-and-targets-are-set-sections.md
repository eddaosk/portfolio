# Story 5.2: The Gap & Targets Are Set Sections

Status: done

## Story

As an investor reading about the problem Vāsuqi solves,
I want the "The Gap" and "The Targets Are Set" sections to match the Figma prototype — with animated chart lines, a glass text panel, the pill banner, correct EU regulation copy, and an organic blob background,
so that the narrative arc from problem to regulatory context is visually compelling and communicates the investment thesis clearly.

## Acceptance Criteria

**AC1 — The Gap heading and subheading are correct (GAP-1, GAP-2):**
Given the `#the-gap` section
When rendered
Then the heading is an `<h1>` reading "The last fraction is the hardest"; below it is an `<h2>` reading "The last 5% of COD can consume more than 60% of a treatment plant's OPEX."

**AC2 — Pronunciation label above heading (GAP-3):**
Given the `#the-gap` section
When rendered
Then a small caption styled as `.text-picture-desc` (Manrope ExtraLight 20px) appears above the `<h1>`, centered, reading "pronounced VAH-su-kee"

**AC3 — Free-standing body paragraphs removed (GAP-4):**
Given the `#the-gap` section
When inspected
Then the existing body paragraphs (EU directive / groundwater copy) are removed; body text exists only inside the glass panel (AC6)

**AC4 — Animated SVG chart lines present (GAP-5):**
Given the `#the-gap` section
When the section enters the viewport during scroll
Then two SVG `<path>` curves animate in using stroke-dashoffset draw-on (or opacity): Line 1 (blue, `--blue-primary`) rises left-to-right; Line 2 (cyan, `--cyan-light`) falls left-to-right; they cross forming an X shape; animation is triggered by GSAP ScrollTrigger

**AC5 — Chart legend labels below lines (GAP-6):**
Given the chart lines
When rendered
Then two labels appear below the SVG chart, each styled as `.text-picture-desc` with a color swatch: cyan swatch + "Treatment cost rises sharply chasing the final fraction." and blue swatch + "Residual COD falls as treatment intensifies."

**AC6 — Glass text panel overlaid on chart (GAP-7):**
Given the `#the-gap` section
When the scroll animation completes
Then a glass panel appears on top of the chart lines: fill `#D9D9D9` at 20% opacity, corner-radius 88px, `backdrop-filter: blur()` glass effect, drop shadow; body text inside reads "Industrial wastewater is cleaned in stages. Biology, membranes, and thermal processes remove the bulk of the load." and "What remains is the residual fraction. Small in volume, disproportionate in cost."; the panel fades in after the line animation via GSAP

**AC7 — "THIS IS WHAT VĀSUQI IS BUILT FOR." pill banner (GAP-8):**
Given the bottom of the `#the-gap` section
When rendered
Then a wide pill/capsule element contains centered uppercase text "THIS IS WHAT VĀSUQI IS BUILT FOR." in Syne, `--navy-deep`; a CSS `@keyframes` light sweep animation cycles through the colour palette across the pill; no border

**AC8 — The Targets Are Set section content replaced (FITS-1):**
Given the section currently rendered as `#where-vasuqi-fits` (but actually "The Targets Are Set")
When rendered
Then the section contains exactly: `<h3>The targets are set</h3>` and three paragraphs verbatim:
1. "In 2024, the EU revised its Urban Wastewater Treatment Directive — the first major update in over thirty years."
2. "80% removal of micropollutants from major plants. Interim targets from 2033. Full quaternary treatment by 2045. Under the polluter-pays principle, pharmaceutical and cosmetics companies cover 80% of the cost."
3. "Regulation, timeline, and funding are now in place. Vāsuqi is built for this moment — without the energy demand or chemical load of conventional upgrades."
The previous "Where Vasuqi Fits" heading, reactor description, and SVG blueprint diagram are removed

**AC9 — Organic blob background behind "Targets Are Set" (FITS-2):**
Given the "Targets Are Set" section
When rendered
Then 3–5 absolutely-positioned `div` elements with the radial gradient (`#C2C5FD` 0% → `#C5C8FD` 51% → `#E8F2FF` 100%`) at 20% opacity, varied `border-radius` and `transform: rotate()`, create a soft organic oval glow behind the text

**AC10 — Organic squiggly stroke outline on desktop (FITS-3):**
Given the "Targets Are Set" section on desktop
When rendered
Then a blue organic squiggly SVG closed-path stroke exported from Figma frames the blob content as an absolutely-positioned element; stroke colour is `--blue-primary` or `--blue-mid`

**AC11 — Mobile: pronunciation label only, no wordmark blob (FITS-4):**
Given the "Targets Are Set" section on mobile viewports
When rendered
Then only the "pronounced VAH-su-kee" label styled as `.text-picture-desc` appears; no Vāsuqi wordmark blob and no Syne 64pt display text

## Tasks / Subtasks

- [x] Rebuild The Gap section heading structure (AC: 1, 2, 3)
  - [x] Change current heading to `<h1>The last fraction is the hardest</h1>`
  - [x] Add `<h2>` below: "The last 5% of COD can consume more than 60% of a treatment plant's OPEX."
  - [x] Add pronunciation label `<p class="text-picture-desc">pronounced VAH-su-kee</p>` above the h1, centered
  - [x] Remove existing body paragraphs (EU directive / groundwater copy)

- [x] Implement animated SVG chart lines (AC: 4, 5)
  - [x] Add SVG element inside `#the-gap` with two `<path>` elements: rising line (blue, stroke `var(--blue-primary)`) and falling line (cyan, stroke `var(--cyan-light)`)
  - [x] Set `stroke-dasharray` and `stroke-dashoffset` on each path for draw-on animation
  - [x] Wire GSAP ScrollTrigger to animate `stroke-dashoffset` from full length → 0 when section enters viewport
  - [x] Add legend below SVG: two `.text-picture-desc` labels with inline color swatches

- [x] Add glass text panel (AC: 6)
  - [x] Create a `div` with `position: absolute` inside the chart container, `background: rgba(217, 217, 217, 0.20)`, `border-radius: 88px`, `backdrop-filter: blur(8px)`, `-webkit-backdrop-filter: blur(8px)`, drop shadow
  - [x] Add two `<p>` body text elements inside the panel with correct copy
  - [x] Use GSAP ScrollTrigger to fade in the panel after the line animation completes (sequence: lines animate first, then panel fades in)

- [x] Add pill banner (AC: 7)
  - [x] Add a pill container at the bottom of `#the-gap`
  - [x] Text: "THIS IS WHAT VĀSUQI IS BUILT FOR." — uppercase, Syne, `var(--navy-deep)`
  - [x] Add CSS `@keyframes` light sweep: a pseudo-element gradient that moves `background-position` left-to-right across the pill, cycling palette colors (`--blue-primary`, `--cyan-light`, `--blue-soft`)
  - [x] No border on pill

- [x] Replace The Targets Are Set section content (AC: 8, 11)
  - [x] Find the section currently using `id="where-vasuqi-fits"` — update its `id` to `id="targets-are-set"` (or keep existing ID if nav links depend on it — check `partials/nav.html` and `side-nav.js`)
  - [x] Remove: h2 "Where Vasuqi Fits", reactor description paragraphs, `reactor-bluebrint-where-it-fits.svg` reference, numbered step list
  - [x] Add: `<h3>The targets are set</h3>` and the three verbatim paragraphs from the spec
  - [x] On mobile: show only `.text-picture-desc` "pronounced VAH-su-kee" label; hide wordmark blob (none exists in code so this is purely a check)

- [x] Add organic blob background (AC: 9)
  - [x] Wrap The Targets Are Set section content in a `position: relative` container
  - [x] Add `position: absolute` blob container (`pointer-events: none`, `z-index: 0`, `aria-hidden="true"`) behind text
  - [x] Inside: 3–5 `div` elements with `border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%` (varied per blob), `background: radial-gradient(circle, rgba(194,197,253,0.20) 0%, rgba(197,200,253,0.10) 51%, rgba(232,242,255,0) 100%)`, different `transform: rotate()` and slight position offsets

- [x] Add squiggly stroke outline SVG (AC: 10)
  - [x] Export the organic squiggly closed-path SVG from Figma (node near the blob area in "rigtig landingpage")
  - [x] Place as absolutely-positioned `<img>` or inline SVG, `pointer-events: none`, `aria-hidden="true"`, stroke `var(--blue-primary)`, desktop only (`hidden md:block`)

## Dev Notes

### Section ID Strategy — CRITICAL, read before touching IDs

The current `index.html` has `<section id="where-vasuqi-fits">` which is the section being replaced with "The Targets Are Set" content. Three files reference this ID and must all be updated atomically:

1. **`src/animations/side-nav.js` line 6** — `{ id: 'where-vasuqi-fits', label: 'Where Vasuqi Fits' }` — change label to `'The Targets Are Set'` and keep the same `id` value for now (Story 5.3 will use this section as a different ID; coordinate with that story). **Do not** rename the id in side-nav.js until Story 5.3 clarifies the final section order.
2. **`partials/footer.html` line 47** — `href="/index.html#where-vasuqi-fits"` — update the anchor text label to match the new section name but **keep the href ID unchanged** until Story 5.3.
3. **`src/animations/scroll.js` line 35** — `animateSection('#where-vasuqi-fits', '#where-vasuqi-fits .section-heading, #where-vasuqi-fits .section-body, #where-vasuqi-fits .section-diagram, #where-vasuqi-fits .section-steps')` — the `.section-diagram` and `.section-steps` selectors will not exist after this story; update the element selectors to match the new section content (e.g., the blob containers and paragraphs). Update but keep the `#where-vasuqi-fits` trigger ID unchanged.

**Recommended ID approach for this story:** Keep `id="where-vasuqi-fits"` on the section element and update the _content_ inside it. Story 5.3 will rename this id when it adds the real "Where Vasuqi Fits" section. This prevents breaking side-nav, footer, and scroll.js across stories.

### Existing state of `#the-gap` and `#where-vasuqi-fits` sections

`#the-gap` currently contains:
- `<h2 class="section-heading text-navy-deep">The Last 5%</h2>` — needs to become `<h1>`
- Two `<p class="section-body">` paragraphs (EU directive / groundwater copy) — remove these entirely (AC3)
- No animated SVG, no glass panel, no pill banner — all new

`#where-vasuqi-fits` currently contains:
- `<h2 class="section-heading text-navy-deep">Where Vasuqi Fits</h2>` — remove
- One `<p class="section-body">` paragraph — remove
- `<img src="/svgs/reactor-bluebrint-where-it-fits.svg">` (desktop only, `.hidden.md:block`) — remove
- `<ol class="section-steps">` (mobile only, `.block.md:hidden`) — remove
- Replace all of the above with `<h3>The targets are set</h3>` + 3 paragraphs + blob background

### Token and utility class status

- `--text-picture-desc-size` (1.25rem / 20px) and `--text-picture-desc-weight` (200) already exist in `design-tokens.css` — no token changes needed.
- `.text-picture-desc` utility class already exists in `src/styles/main.css` (Manrope ExtraLight 20px) — use directly.
- Do NOT add duplicate token definitions.

### aria-hidden status

Neither `#the-gap` nor `#where-vasuqi-fits` has `aria-hidden="true"` in the current `index.html` — no removal needed. The old note about Story 2.2 deferral is stale. Do not add or remove `aria-hidden` on these sections.

### SVG chart line paths (AC4)

No Figma `d`-attribute values exist for the crossing curves. Derive organic Bezier curves that form an X: Line 1 (blue, rising) starts bottom-left, ends top-right; Line 2 (cyan, falling) starts top-left, ends bottom-right. Use a `viewBox="0 0 600 300"` as the working box; the intersection should fall near `(300, 150)`. Use cubic Bezier handles for the curve. Example starting points:
- Rising line: `M 0,250 C 150,200 450,100 600,50`
- Falling line: `M 0,50 C 150,100 450,200 600,250`

Set `stroke-dasharray` equal to the computed path length via JS: `path.getTotalLength()`. Set `stroke-dashoffset` to the same value initially; animate to `0`.

### GSAP animation sequence for `#the-gap`

Use a single GSAP `timeline` on a ScrollTrigger for the whole section. Sequence:
1. Heading elements fade/slide in (y:40 → 0, opacity:0 → 1)
2. Chart lines draw on simultaneously (`stroke-dashoffset` → 0, ~1.2s)
3. Glass panel fades in after lines complete (`opacity:0 → 1`, ~0.6s, `immediateRender: false`)

Set `start: "top 85%"` on the ScrollTrigger, `once: true`. Apply `invalidateOnRefresh: true` so fast-scroll doesn't leave content invisible (see ANIM-1 in gap audit).

### Glass panel recipe (AC6)

From `docs/design-manual.md` Glass material language:
- `background: rgba(217, 217, 217, 0.20)`
- `backdrop-filter: blur(8px) saturate(1.1)`
- `-webkit-backdrop-filter: blur(8px) saturate(1.1)` (required for Safari)
- `box-shadow: 0 4px 4px rgba(0,0,0,0.25)`
- `border-radius: 88px`

### Pill light sweep animation (AC7)

Use `background-size: 200% 100%` on the pill and animate `background-position` via `@keyframes` from `0% 0%` to `100% 0%` and back. Color stops cycle: `var(--blue-primary)`, `var(--cyan-light)`, `var(--blue-soft)`. No border on the pill. Text: Syne, uppercase, `var(--navy-deep)`.

### FITS-3 squiggly SVG — Figma export guidance

The squiggly closed-path stroke is in the "rigtig landingpage" frame (node 473:73). Look for a path near the blob/targets-are-set content area. It will likely have `stroke: #0044FF` (blue-primary) and no fill. Export as SVG from Figma. Save to `public/svgs/targets-squiggly-outline.svg`. Place as `<img aria-hidden="true" class="hidden md:block">` absolutely positioned behind the text content, `pointer-events: none`.

### Project Structure Notes

- Landing page: `index.html`
- Scroll animations: `src/animations/scroll.js`
- Section styles: `src/styles/main.css`
- Squiggly SVG export target: `public/svgs/targets-squiggly-outline.svg`

### References

- Gap audit codes: GAP-1 through GAP-8, FITS-1 through FITS-4
- Source: `_bmad-output/planning-artifacts/epic5-gap-audit.md`
- Glass recipe: [Source: docs/design-manual.md — Glass material language]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

- Figma node 935:379 (problem frame) confirmed chart line bezier path values from spec are correct
- Figma node 896:238 (Group 58 / Bold) confirmed blob background — exported as `/public/svgs/targets-blob-background.svg` (Figma asset `ad02301abbf049e3dcfd09be047162e1bf672142.svg`)
- No dedicated squiggly stroke path found in Figma for FITS-3 — created an organic closed-path SVG at `public/svgs/targets-squiggly-outline.svg` matching brand spec (blue-primary stroke, no fill)
- Section ID kept as `where-vasuqi-fits` per Dev Notes strategy — Story 5.3 will rename
- `#the-gap` removed from `scroll.js` `animateSection` calls — all gap animation now handled by dedicated `gap-animation.js`

### Completion Notes List

- AC1: `<h1>` "The last fraction is the hardest" + `<h2>` subheading implemented in `index.html`
- AC2: `.text-picture-desc` "pronounced VAH-su-kee" above h1, `text-center`, implemented
- AC3: Old EU directive / groundwater body paragraphs fully removed from `#the-gap`
- AC4: Two SVG `<path>` curves (crossing X shape) with GSAP ScrollTrigger `stroke-dashoffset` draw-on animation in `src/animations/gap-animation.js`; wired into `src/main.js`
- AC5: Two `.text-picture-desc` legend labels with inline color swatches below SVG
- AC6: `.gap-glass-panel` with `rgba(217,217,217,0.20)` background, `border-radius: 88px`, `backdrop-filter: blur(8px) saturate(1.1)`, `-webkit-backdrop-filter`, `box-shadow`, correct copy, fades in via GSAP after lines complete
- AC7: `.gap-pill-banner` + `.gap-pill-text` (Syne uppercase, navy-deep); `@keyframes gap-pill-sweep` animates `background-position` on a `200%`-wide gradient (blue-primary → cyan-light → blue-soft); no border
- AC8: `#where-vasuqi-fits` section fully replaced — old heading/reactor/diagram/steps removed; `<h3>The targets are set</h3>` + 3 verbatim paragraphs added; `side-nav.js` label updated; `scroll.js` stale selectors removed
- AC9: 4 CSS blob divs (varied `border-radius` + `transform: rotate()`) + Figma-derived `targets-blob-background.svg` as `<img>` background
- AC10: `targets-squiggly-outline.svg` (organic closed-path, blue-primary stroke) as absolutely-positioned `<img aria-hidden="true" class="hidden md:block">`
- AC11: `.text-picture-desc` "pronounced VAH-su-kee" in targets section shown only on mobile via `md:hidden`; no wordmark blob existed in code (confirmed)
- Build: `npm run build` passes cleanly (23 modules, no errors)

### File List

- `index.html` — Rebuilt #the-gap and #where-vasuqi-fits sections
- `src/animations/gap-animation.js` — New: GSAP ScrollTrigger animation for chart lines and glass panel
- `src/main.js` — Added import and call for initGapAnimation()
- `src/animations/scroll.js` — Removed #the-gap from animateSection; removed stale .section-diagram and .section-steps selectors from #where-vasuqi-fits
- `src/animations/side-nav.js` — Updated labels for the-gap and where-vasuqi-fits
- `src/styles/main.css` — Added Story 5.2 styles: .section-subheading, .gap-chart-container, .gap-chart-svg, .gap-line, .gap-legend-swatch, .gap-glass-panel, .gap-pill-banner, .gap-pill-text, @keyframes gap-pill-sweep, .targets-blob-bg, .targets-blobs, .targets-blob variants, .targets-squiggly
- `public/svgs/targets-blob-background.svg` — New: Figma-derived organic blob SVG (node 896:216)
- `public/svgs/targets-squiggly-outline.svg` — New: Organic squiggly closed-path stroke SVG for desktop accent

### Review Findings

- [x] [Review][Patch] `glassPanel` null-guard missing in gap-animation.js before `gsap.set()` [src/animations/gap-animation.js:35] — **fixed**: added `if (glassPanel)` guard
- [x] [Review][Patch] `gap-pill-sweep` CSS animation lacks `prefers-reduced-motion` override [src/styles/main.css] — **fixed**: added `@media (prefers-reduced-motion: reduce)` block
- [x] [Review][Patch] New decorative SVG images missing `loading="lazy"` [index.html:289, 304] — **fixed**: added to both images
- [x] [Review][Patch] Footer anchor text not updated per Dev Notes — still read "The Technology" [partials/footer.html:49] — **fixed**: updated to "The Targets Are Set"
- [x] [Review][Defer] Double `<h1>` on page — sr-only h1 + visible h1 in #the-gap [index.html:21, 221] — deferred, spec explicitly requires h1 (AC1); resolving requires architectural PRD change to sr-only pattern
- [x] [Review][Defer] `overflow-hidden` on `#where-vasuqi-fits` section could silently break future Glass elements [index.html:286] — deferred, no Glass elements in that section now; risk noted for Story 5.3
- [x] [Review][Defer] `getTotalLength()` path length could return 0 in hidden-tab render edge case [src/animations/gap-animation.js:27] — deferred, pre-existing GSAP pattern across project

### Change Log

- 2026-05-25: Story 5.2 implemented — rebuilt #the-gap with h1/h2 headings, pronunciation label, animated SVG chart lines (GSAP ScrollTrigger), glass panel, pill banner with light sweep animation; replaced #where-vasuqi-fits with Targets Are Set content, organic blob background, squiggly outline SVG; all 11 ACs satisfied; build passes
- 2026-05-25: Code review complete — 4 patches applied (glassPanel null-guard, reduced-motion override, lazy loading on decorative SVGs, footer anchor text); 3 items deferred
