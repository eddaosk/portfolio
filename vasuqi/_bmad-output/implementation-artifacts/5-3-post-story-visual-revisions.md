# Post-Story Visual Revisions — Story 5.3 Sections

**Date:** 2026-05-27
**Sections affected:** `#where-vasuqi-fits`, `#what-its-built-to-change`
**Status:** Complete

These changes were made after Story 5.3 reached review status. They are not bug fixes against the ACs — they are intentional design simplifications driven by Figma-exported assets becoming available and visual inspection of the built output.

---

## 1. Where Vāsuqi Fits — SVG diagram swap

**What changed:**
The complex 3-part card structure (6 process-flow icons in `.wvfit-process-row`, reactor blueprint `.wvfit-reactor`, 4 outcome columns `.wvfit-outcomes`) was replaced with a single `<picture>` element serving two Figma-exported SVGs.

**HTML:** `index.html` — `#where-vasuqi-fits` section replaced entirely.

New structure inside `.wvfit-card`:
- `<p class="wvfit-subheading">` — moved inside the card (was outside)
- `<div class="wvfit-diagram">` containing `<picture>`:
  - `<source media="(min-width: 768px)" srcset="/svgs/thefit.svg">` — desktop
  - `<img src="/svgs/thefitmobile.svg">` — mobile fallback
- `<p class="wvfit-card-caption">` — unchanged content
- `<p class="wvfit-tagline">` — unchanged, below card

**Why `<picture>` not `<img>` with CSS:** Browser loads only the matching source. CSS `display:none` would download both files.

**CSS removed** (`src/styles/main.css`): `.wvfit-card-inner-mobile`, `.wvfit-process-row`, `.wvfit-process-item`, `.wvfit-process-item--vasuqi .wvfit-process-icon`, `.wvfit-process-icon`, `.wvfit-process-label`, `.wvfit-reactor`, `.wvfit-reactor-img`, `.wvfit-outcomes`, `.wvfit-outcome-item`, `.wvfit-outcome-icon`, `.wvfit-outcome-label`, `.wvfit-outcome-desc`

**CSS added:** `.wvfit-diagram` (flex centering wrapper), `.wvfit-diagram-img` (`max-width: 500px` mobile / `900px` desktop)

**CSS kept:** `.wvfit-subheading`, `.wvfit-card`, `.wvfit-card-caption`, `.wvfit-tagline`, mobile overrides for card border-radius and tagline size

**Design manual updated** (`docs/design-manual.md`):
- Task Guide 4: `<picture>` responsive SVG pattern documented
- Living Components: `.wvfit-card` row added

---

## 2. What Vāsuqi Is Built To Change — blob card simplification

### 2a. Text overlay layers removed

**What changed:** The three-layer stacking system (text behind PNG at z-index 1, PNG at z-index 2, text over PNG at z-index 3) was removed. Text is baked into the PNG images — the HTML text layers were redundant.

**HTML removed per card:** `.benefit-blob-new__stack` wrapper, `.benefit-blob-new__text-under`, `.benefit-blob-new__text-over`

**HTML kept per card:** `.benefit-blob-new__arch` SVG, `.benefit-blob-new__blob-wrap` + `<img>`

**CSS removed:** `.benefit-blob-new__stack`, `.benefit-blob-new__text-under`, `.benefit-blob-new__text-over`

**CSS updated:** `.benefit-blob-new__blob-wrap` changed from `position: absolute; inset: 0` (child of stack) to `position: relative; width: 420px; height: 420px; max-width: 100%` (standalone sizing context). Drop-shadow promoted here from the now-deleted stack.

### 2b. Rectangular inset shadow removed

**What changed:** `.benefit-blob-new__blob-wrap::after` was creating a visible rectangular picture-frame shadow because `box-shadow: inset` follows the wrapper's rectangular geometry, not the PNG blob's silhouette.

**CSS removed:** entire `.benefit-blob-new__blob-wrap::after` rule

### 2c. Drop-shadow softened

**What changed:** Two compounded drop-shadows (including an asymmetric `−16px 12px` offset creating a dark smudge lower-left) replaced with a single centred, low-opacity shadow.

| Before | After |
|--------|-------|
| `drop-shadow(0 4px 4px rgba(0,0,0,0.25))` + `drop-shadow(-16px 12px 30px rgba(0,0,0,0.58))` | `drop-shadow(0 6px 16px rgba(0,0,0,0.12))` |

### 2d. Grid gap tightened

**What changed:** Grid gap reduced to bring blobs into a compact cluster matching Figma reference.

| | Mobile | Desktop |
|---|---|---|
| Before | `3rem 4rem` | `3rem 4rem` |
| After | `0.5rem 1rem` | `1.5rem 2rem` |

Desktop stagger offsets adjusted:
- `--02`: `translateY(4rem)` → `translateY(2rem)`
- `--03`: `translateY(-1.5rem)` → `translateY(-3rem)`
- `--04`: `translateY(2.5rem)` → `translateY(-1rem)`

Grid `max-width: 900px` added; `margin: 0 auto` to centre.

### 2e. Blob size increased

**What changed:** Blobs scaled up significantly to match Figma visual weight.

| | Desktop | Mobile |
|---|---|---|
| Blob wrapper | `280×280px` → `420×420px` | `320×320px` |
| Arch SVG | `220×60px` → `320×80px` | `240×65px` |
| Arch text | `0.6875rem` → `0.875rem` | (inherits) |

---

## 3. Heading level corrections — 2026-05-27

Multiple headings across `index.html` were promoted to correct semantic levels. These are visual-hierarchy decisions, not AC corrections.

| Section | Element | Before | After |
|---|---|---|---|
| `#targets-are-set` | "The targets are set" | `h3.section-heading` | `h1.section-heading` |
| `#where-vasuqi-fits` | "Where Vāsuqi Fits" | `h2.section-heading` | `h1.section-heading` |
| `#where-vasuqi-fits` | "Don't replace what works…" | `p.wvfit-tagline` | `h2` (no class, `text-center`) |
| `#what-its-built-to-change` | "What Vāsuqi is built to change:" | `h2.section-heading` | `h1.section-heading` |
| `#how-it-works` | "Light does the work" | `h2.section-heading` | `h1.section-heading` |
| `#how-it-works` | "We aim to break down…" | `p` (inline style) | `h2` with `text-white-brand` |

**"Don't replace what works…" additional changes:** `<br>` removed (one line), `text-center` added, `wvfit-tagline` class removed (style was incompatible with `h2` base styles).

**"The targets are set" additional changes:** Content wrapper gained `text-center`.

---

## 4. Targets Are Set — background SVG swap + overlay removal — 2026-05-27

**What changed:**

- Background SVG swapped: `targets-blob-background.svg` → `targets-blob.svg`
- CSS blob overlays (`.targets-blobs`, `.targets-blob`, `.targets-blob--1/2/3/4`) removed from CSS and HTML
- Squiggly outline SVG (`targets-squiggly-outline.svg`) and its CSS rule removed from HTML
- `overflow-hidden` removed from `<section id="targets-are-set">` (was clipping the SVG)

**CSS: `.targets-blob-bg` replaced:**

| Property | Before | After |
|---|---|---|
| position | `absolute; inset: 0` | `absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)` |
| sizing | `width: 100%; height: 100%; object-fit: cover` | `width: 100%; height: auto` |
| opacity | `0.6` | `0.8` |

**Why:** The old `object-fit: cover` + `inset: 0` caused the SVG to crop at viewport edges. Centering with translate and `height: auto` lets the SVG scale naturally within the section without clipping.

---

## 5. The Gap — chart lines replaced with Figma SVGs — 2026-05-27

**What changed:**

The inline SVG `<path>` elements were replaced with `<img>` tags pointing to Figma-exported SVGs:
- `treatment-cost-line.svg` — neon cyan line (renders first, bottom layer)
- `residual-COD-line.svg` — dark blue line (renders second, top layer)

**Why the technique changed:** The new SVGs use a mask+fill approach (not stroked paths), so `stroke-dashoffset` draw-on animation is not possible. Replaced with a clip-path reveal.

**HTML:** Inline `<svg>` with two `<path class="gap-line">` elements replaced by a wrapper `<div style="aspect-ratio: 3/1; min-height: 200px;">` containing two `<img class="gap-line-img">` absolutely positioned to fill.

**CSS removed:** `.gap-chart-svg`, `.gap-line` rules (now unused).

**`gap-animation.js` updated:**

| | Before | After |
|---|---|---|
| Selector | `.gap-line` (SVG paths) | `.gap-line-img` (img elements) |
| Initial state | `strokeDasharray/strokeDashoffset = path length` | `clipPath: 'inset(0 100% 0 0)'` |
| Animation | `strokeDashoffset → 0` | `clipPath → 'inset(0 0% 0 0)'` (left → right reveal) |
| Duration | `1.2s` | `1.4s` |
| Ease | `power1.inOut` | `power2.inOut` |

---

## 6. The Gap — glass panel restyled — 2026-05-27

**What changed:**

| Property | Before | After |
|---|---|---|
| Position (desktop) | `right: 0; transform: translateY(-50%)` | `left: 50%; transform: translate(-50%, -50%)` (centered) |
| Width (desktop) | `max-width: 380px` | `width: 70%; max-width: 700px` |
| Padding (base) | `2rem 2.5rem` | `3.5rem 3rem` |
| Padding (desktop override) | — | `5rem 5rem` |
| Background opacity | `rgba(217,217,217,0.20)` | `rgba(217,217,217,0.12)` |

**Text container added inside panel:** `<div style="max-width: 36ch; margin: 0 auto;">` wraps both paragraphs so text stays compact inside the wider panel.
