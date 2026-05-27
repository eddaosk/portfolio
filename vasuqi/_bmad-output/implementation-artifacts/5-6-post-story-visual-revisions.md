# Post-Story Visual Revisions — Story 5.6 About Us Page

**Date:** 2026-05-27
**Sections affected:** `#section-why`, `.about-team-section`
**Files changed:** `about.html`, `src/styles/main.css`
**Status:** Complete

These changes were made after Story 5.6 reached done status. They are intentional design refinements driven by visual inspection and Figma comparison — not bug fixes against the original ACs.

---

## 1. LinkedIn badge — swap inline SVG for branded asset

**What changed:**
Each of the four team cards had an inline `<svg>` with a plain monochrome LinkedIn `in` icon (26×26px, `fill="currentColor"`). Replaced all four with `<img src="/svgs/linkedinAbout.svg">` — the branded gradient badge (blue background, inner glow, white `in` logo) that was already in the project.

**HTML:** `about.html` — all four `.team-card__linkedin-badge` anchor elements.

**CSS (`.team-card__linkedin-badge`):**

| Property | Before | After |
|---|---|---|
| `width` / `height` | `26px` | `47px` (matches SVG's natural size) |
| `top` / `right` offset | `1rem` | `0.5rem` (prevents drop-shadow clipping at card edge) |
| `color` | `var(--white-brand)` | kept (no longer used for fill, harmless) |

**Why:** `linkedinAbout.svg` is the Figma-designed badge. The inline SVG was a plain fallback from the original story implementation.

---

## 2. Hero section heading text

**What changed:**
Heading text changed from `Why vāsuqi?` to `Behind the name vāsuqi`.

**HTML:** `about.html` line 38 — `<h1>` content.

**Why:** Matches the Figma frame label and better describes the section's content (mythological origin story, not a product pitch).

---

## 3. Hero section — watermark replaced with serpent illustration

**What changed:**
The original watermark was `vasuqilogo.svg` rendered as a large centered circle (616×606px, `opacity: 0.07`) using an inline `<img>` tag — it appeared as a faint circular blob frame behind the heading text. Replaced with `<img src="/svgs/vasuqilogo.svg" class="about-serpent">` positioned to the right side of the section.

**CSS (`.about-serpent`):**

| Property | Value |
|---|---|
| `position` | `absolute` |
| `top` | `40px` |
| `right` | `-60px` |
| `width` / `height` | `520px` |
| `opacity` | `0.28` |

**Why:** The circular watermark created a visible "frame" effect. The Figma design shows the serpent/logo as a right-aligned accent graphic, not a centred watermark. Repositioning and increasing opacity makes it read as a decorative illustration rather than a background wash.

---

## 4. Hero section — "box" artefact removed (full-width section fix)

**Problem:**
`#section-why` had `max-w-4xl mx-auto px-6 pt-20 pb-16` on the `<section>` element itself. The `.about-hero-gradient` (position absolute, inset 0) was therefore constrained to that 896px rectangle, which painted visibly against the full-width `--ice-near` page background — creating a visible box outline.

**Fix:**
- Removed layout classes (`max-w-4xl mx-auto px-6 pt-20 pb-16`) from the `<section>` element
- Added an inner `<div class="max-w-4xl mx-auto px-6 pt-44 pb-28">` to contain the heading and body text
- Added `overflow: hidden` to `#section-why` so the serpent (with `right: -60px`) clips cleanly at the viewport edge
- Section is now full-width; gradient covers the entire viewport width

**CSS (`.about-hero-gradient`):**

| Property | Before | After |
|---|---|---|
| `height` | `832px` (fixed) | removed — uses `inset: 0` |
| `box-shadow` | `0 -2px 7.7px 0 rgba(10,31,68,1)` (hard edge line) | removed |
| gradient opacity | `rgba(92,107,133,0.20)` at top | softened to `0.15` at top, fades to `transparent` |

---

## 5. Hero body text — size reduced from h2 to h3

**What changed:**
The three narrative paragraphs inside `.about-why-body` were styled at h2 scale (Syne 24px / 600 SemiBold). Reduced to h3 scale.

**CSS (`.about-why-body p`):**

| Property | Before | After |
|---|---|---|
| `font-size` | `var(--text-h2-size)` (24px) | `var(--text-h3-size)` (20px) |
| `font-weight` | `var(--text-h2-weight)` (600) | `var(--text-h3-weight)` (500) |

---

## 6. Team section — heading hierarchy applied

**What changed:**
The three text elements in `.team-section-text` now follow the full h1 → h2 → h3 scale. Only the intro paragraph needed a CSS change; the first two were already at the correct token sizes.

| Element | Class | Before | After |
|---|---|---|---|
| "The team" | `.team-section-heading` | Syne 55px / 743 (h1 scale) | unchanged |
| "Built by operators…" | `.team-section-subheading` | Syne 24px / 600 (h2 scale) | unchanged |
| Founder-led paragraph | `.team-section-intro` | Syne 32px / 400 Regular | Syne 20px / 500 Medium (h3 scale) |

---

## 7. Team grid layout — Adarsh card sized to match bottom tier

**Problem:**
The top tier used `grid-template-columns: 1fr 1fr` on desktop, giving Adarsh ~50% of the container width. The bottom tier used `repeat(3, 1fr)`, giving each of the three cards ~33%. Adarsh's card was noticeably larger.

**Fix:**
Changed top-tier desktop grid from `1fr 1fr` to `2fr 1fr`.

| | Adarsh | Jörg / Peter / Angela |
|---|---|---|
| Before | ~50% (1fr of 2) | ~33% (1fr of 3) |
| After | ~33% (1fr of 3 equivalent) | ~33% (1fr of 3) |

**CSS:**
```css
/* before */
.team-top-tier { grid-template-columns: 1fr 1fr; }
/* after */
.team-top-tier { grid-template-columns: 2fr 1fr; }
```

---

## 8. Team card — role label redesigned

**What changed:**
`.team-card__role` (CEO, CTO, Advisor, Chief Scientific Advisor) was styled as Syne SemiBold 24px in white with `mix-blend-mode: difference` — rendered unpredictably depending on underlying card colour.

**CSS:**

| Property | Before | After |
|---|---|---|
| `font-size` | `var(--text-h2-size)` (24px) | `0.8125rem` (13px) |
| `font-weight` | `600` | `600` |
| `color` | `var(--white-brand)` | `var(--steel)` |
| `mix-blend-mode` | `difference` | removed |
| `text-transform` | — | `uppercase` |
| `letter-spacing` | — | `0.1em` |

---

## 9. Team card — name and bio scaled down

To fit the narrower uniform card width (see §7), name and bio were reduced.

**CSS (`.team-card__name`):**

| Property | Before | After |
|---|---|---|
| `font-size` | `2.5rem` (40px) | `var(--text-h2-size)` (24px) |

**CSS (`.team-card__bio`):**

| Property | Before | After |
|---|---|---|
| `font-family` | `var(--font-syne)` | `var(--font-manrope)` |
| `font-size` | `var(--text-h2-size)` (24px) | `0.875rem` (14px) |
| `font-weight` | `400` | `500` |

**CSS (`.team-card__body`):** padding reduced from `1.5rem` to `1rem`.

---

## 10. Team card — hover border removed

**What changed:**
`.team-card:hover` applied `border-color: var(--blue-primary)` with a `0.3s` transition. Removed — only the `translateY(-2px)` lift remains.

**CSS:**
- Removed `border-color: var(--blue-primary)` from `.team-card:hover`
- Removed `border-color 0.3s ease` from `.team-card` transition

---

## 11. Team card — photo aspect ratio (iterated, reverted)

**Intermediate state (reverted):**
`aspect-ratio` on `.team-card__photo` was temporarily changed from `1/1` to `4/3` to make cards more compact. This caused the hex clip-path animation (`blobMorph`) to cut into face areas — the shorter container pushed faces closer to the aggressive top clipping points of the polygon.

**Final state:** Reverted to `aspect-ratio: 1/1`. The square container gives the polygon shape sufficient vertical room to frame faces correctly throughout the animation cycle.

---

## Post-session revisions — 2026-05-27 (hero section refinement)

The following changes were made in a second pass after visual comparison against the Figma at full viewport width.

---

### 12. Hero gradient — solid token colours replacing rgba overlays

**What changed:**

| Property | Before | After |
|---|---|---|
| Colour stops | `rgba(92,107,133,0.15) 0%` → `rgba(232,250,255,0.10) 60%` → `transparent 100%` | `var(--steel) 1%` → `var(--ice-near) 28%` → `var(--white-brand) 100%` |

**Why the midpoint moved from 56% → 28%:** The original stop made the dark steel persist across more than half the section height. Moving it to 28% ensures the gradient transitions to light within the top quarter, so the bulk of the section reads as pale ice — matching the Figma tone.

---

### 13. Body top-padding override — about page full-bleed hero fix

**What changed:** Added `padding-top: 0` to `body.page-about`.

**Why:** The global `body { padding-top: 5rem }` pushes content below the fixed nav on all pages. The about page hero is designed to extend behind the nav (gradient from viewport top `y: 0`). Overriding to `0` lets `#section-why` start at the viewport top; the content div's own `pt-*` class handles nav clearance for the text.

---

### 14. Serpent logo — full rework

#### Position

| | Before | After |
|---|---|---|
| Horizontal | `right: -60px` | `left: 50%; transform: translateX(-50%)` |
| Vertical | `top: 40px` | `top: -60px` |

**Why `top: -60px`:** The SVG drawing (serpent paths) occupies only the middle band of the 160×160 viewBox (approximately y=31–112). At 1082px rendered height, this band lands at px 210–758 within the element. With `top: -60px`, the section's visible window (0–780px) maps to element positions 60–840px, fully capturing the serpent circle and placing its bottom edge close to the section boundary.

`bottom` positioning was tested but discarded: `bottom` requires a definite containing-block height to resolve. With `min-height` (non-definite), browsers placed the element incorrectly. With `height` (definite), `bottom` resolved but still exposed only the empty lower band of the SVG rather than the drawing. `top: -60px` directly maps the drawing area into the visible window regardless of height strategy.

#### Opacity

Reduced `0.28` → `0.08` to match Figma spec (8%).

#### Size

| | Before | After |
|---|---|---|
| Width | `520px` | `1100px` |
| Height | `520px` | `1082px` |

Scaled proportionally from the Figma spec (w: 616, h: 606). Increased beyond Figma values at user request to make the serpent fill the section height visually.

#### z-index

| Layer | z-index |
|---|---|
| `.about-hero-gradient` | `0` |
| `.about-serpent` | `1` |
| `.about-why-heading` | `2` |
| `.about-why-body` | `2` |

The gradient is fully opaque (solid token colours). The serpent must sit above it (`z-index: 1`) to be visible at 8% opacity.

---

### 15. Section height — `min-height` replaced with `height`

| Property | Before | After |
|---|---|---|
| `min-height` | various iterated values | removed |
| `height` | — | `780px` |

**Why `height` not `min-height`:** CSS `bottom` positioning resolves against the containing block's definite height. `min-height` does not reliably establish a definite height for absolutely positioned children. Switching to `height` makes the containing block definite and keeps `overflow: hidden` from allowing the 1100px-wide logo to cause horizontal scroll.

---

### 16. Content div padding

| | Class | px |
|---|---|---|
| Top | `pt-52` | 208px |
| Bottom | `pb-28` | 112px |

Top padding provides nav clearance (80px fixed nav) plus visual breathing room above the heading. Equal padding was iterated but abandoned — the asymmetry is intentional: more space above the heading, less below the text before the team section.

---

### 17. Heading forced line break

Added `<br>` after "Behind the" to enforce the two-line split at all viewport widths:

```
Behind the
name vāsuqi
```

---

### 18. Body text — max-width removed

Removed `max-width: 42rem` from `.about-why-body`. Paragraphs now fill the full `max-w-4xl` (896px) container, matching the wide-layout reading column visible in Figma at desktop breakpoints.

---

### 19. Team section separator shadow

Added to `.about-team-section`:

```css
box-shadow: inset 0 8px 24px -8px rgba(92, 107, 133, 0.18);
```

**Why inset on the team section, not `box-shadow` on `#section-why`:** `overflow: hidden` on `#section-why` clips the element's own box-shadow. Applying an inset shadow to the adjacent element achieves the same visual result — a soft top shadow implying the hero section casts depth onto the team section below it.

---

## Post-session revisions — 2026-05-27 (team section layout and card refinements)

---

### 20. Team section container — expanded to full content width

**What changed:** `#team-grid` section container class changed from `max-w-4xl` (56rem / 896px) to `max-w-[var(--max-content-width)]` (80rem / 1280px).

**Why:** The team section was constrained to a narrower reading column than the rest of the page. Expanding to the full content width lets the card grid span all 12 columns consistently with index page sections.

---

### 21. Horizontal padding — matched to index page

**What changed:** Both the hero content div and `#team-grid` now use `px-6 md:px-[3.125rem]` (24px mobile, 50px desktop), matching every section on `index.html`.

**Before:** `px-6` only (no responsive step-up).

---

### 22. Team grid — unified column tracks for alignment

**Problem:** Top tier used `2fr 1fr` (one gap) and bottom tier used `repeat(3, 1fr)` (two gaps). Because `1fr` resolves against different total gap amounts in each tier, Adarsh's card was wider than the three bottom cards and their right edges did not align.

**Fix:** Top tier changed to `repeat(3, 1fr)` with `.team-section-text` spanning `grid-column: 1 / 3`. Both tiers now use identical column tracks and the same `gap`, so `1fr` resolves to the exact same pixel width in both rows.

| | Before | After |
|---|---|---|
| Top tier columns | `2fr 1fr` | `repeat(3, 1fr)` |
| Text block span | implicit single column | `grid-column: 1 / 3` |
| Adarsh card width | `(W − 1 gap) / 3` | `(W − 2 gaps) / 3` (matches bottom cards) |

---

### 23. Team section text — bottom-aligned to card

**What changed:**
- `.team-section-text`: `justify-content` changed from `center` → `flex-end`
- `.team-top-tier`: `align-items` changed from `start` → `stretch`

**Why:** The heading, subheading, and intro paragraph should sit flush at the bottom of the left cell, so the last line of intro text aligns with the bottom of Adarsh's card — grounding the two columns visually.

---

### 24. Intro paragraph — 6-column width constraint

**What changed:** `max-width: 75%` added to `.team-section-intro`.

**Why:** The text block spans 8 of 12 columns. Constraining the intro paragraph to 75% of that cell (= 6 of 12 columns) prevents the text from sprawling to the full left-column width.

---

### 25. Grid gap increased

**What changed:** `gap` on both `.team-top-tier` and `.team-bottom-tier` increased from `2rem` → `3rem`. `margin-bottom` on `.team-top-tier` also `2rem` → `3rem`.

**Why:** At the expanded 1280px container width, 2rem gutters felt too tight between cards. 3rem provides more breathing room.

---

### 26. Team section top padding

**What changed:** `pt-16` (4rem) added to `#team-grid` in HTML.

**Why:** Without top padding, Adarsh's card started flush against the inset shadow line at the top of `.about-team-section`, leaving no visual margin between the section boundary and the card.

---

### 27. Photo shape — polygon blobMorph replaced with ellipse morphing

**What changed:** The photo mask changed from a CSS `clip-path: polygon(…)` animation (`blobMorph`) applied to the `<img>` element, to a `border-radius` animation (`ellipseMorph`) applied to the `.team-card__photo` container.

**CSS (`.team-card__photo`):**

| Property | Before | After |
|---|---|---|
| `width` | `100%` | `42%` |
| `aspect-ratio` | `1 / 1` | `4 / 5` |
| `margin` | none | `1.75rem auto 0` |
| `border-radius` | none | `50% 50% 50% 50% / 55% 55% 45% 45%` (base ellipse) |
| `animation` | none on container | `ellipseMorph 7s ease-in-out infinite` |

**CSS (`.team-card__photo img`):**
- Removed `clip-path: polygon(…)`
- Removed `animation: blobMorph`

**`@keyframes ellipseMorph`:**
```css
0%   { border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; }
25%  { border-radius: 42% 58% 60% 40% / 45% 65% 35% 55%; }
50%  { border-radius: 58% 42% 40% 60% / 65% 38% 62% 38%; }
75%  { border-radius: 44% 56% 58% 42% / 38% 62% 42% 58%; }
100% { border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; }
```

**Why:** The polygon shape read as a hexagonal/heptagonal hard mask — not congruent with the water material language. An ellipse that slowly morphs through organic border-radius variations reads as liquid and alive without the angular polygon transitions. Duration set to 7s for a slow, water-like pace.

---

### 28. Card max-width and alignment

**What changed:** At desktop (`min-width: 768px`), all `.team-card` elements are capped at `max-width: 300px` and centred within their grid columns (`margin: 0 auto`). Two exceptions:

- `.team-bottom-tier .team-card:first-child`: `margin-left: 0` — left-aligns Jörg's card to match the left edge of the text block above.
- `.team-top-tier .team-card`: `padding-top: 2rem` — adds internal top space on Adarsh's card.

**Why:** Without a max-width the cards stretched to fill the full `1fr` column (~360px at 1280px viewport), making photos and text too large. 300px gives each card a more compact, considered proportion with visible gutter space around it. Left-aligning Jörg's card creates a clear vertical alignment between the intro text edge and the first bottom card.

---

### 29. Card body padding and bio font size

**What changed:**

| Property | Before | After |
|---|---|---|
| `.team-card__body` padding | `1rem` | `1.25rem 1.5rem 1.5rem` |
| `.team-card__body` gap | `0.375rem` | `0.5rem` |
| `.team-card__bio` font-size | `0.875rem` (14px) | `var(--text-body-size)` (16px) |

**Why:** At 300px card width and 42% photo size, the text area has more room. Increasing padding and bio size makes the role/name/bio block more readable — 14px was too small to read comfortably at this card scale.

---

## Post-session revisions — 2026-05-27 (index page — gap section + targets section)

---

### 30. Gap section glass panel — font size increased

**Files:** `index.html`, `src/styles/main.css`

**What changed:** Both paragraphs inside `.gap-glass-panel` changed from `--text-body-size` (16px) to `--text-caption-size` (20px). Line-height token updated to match: `--text-caption-line-height` (1.4).

| Property | Before | After |
|---|---|---|
| `font-size` | `var(--text-body-size)` (16px) | `var(--text-caption-size)` (20px) |
| `line-height` | `var(--text-body-line-height)` | `var(--text-caption-line-height)` |

---

### 31. Gap section glass panel — text column width increased

**Files:** `index.html`

**What changed:** Inner `<div>` constraining the glass panel paragraphs changed from `max-width: 36ch` to `max-width: 52ch`.

**Why:** After the font size increase the 36ch measure wrapped text very aggressively. 52ch gives a comfortable reading line at 20px.

---

### 32. Gap section — pill banner replaced with cone CTA row

**Files:** `index.html`, `src/styles/main.css`

**What changed:** The pill banner (gradient background, pill border-radius, sweep animation) was removed and replaced with two horizontal cone SVGs flanking the CTA text.

**Old markup:** `.gap-pill-banner` — `border-radius: 9999px`, gradient background, `gap-pill-sweep` animation.

**New markup:** `.gap-cta-row` — no background, no border-radius. Contains two inline SVG cones (`.gap-cone--left`, `.gap-cone--right`) and a centered text element `.gap-cta-text`.

**Cone geometry:**
- Left cone: `<polygon points="0,30 200,0 200,60">` — point at left edge, widens toward text
- Right cone: `<polygon points="200,30 0,0 0,60">` — point at right edge, widens toward text
- `preserveAspectRatio="none"` — SVGs stretch to fill flex space, scaling with viewport width

**Gradient:** `#0044FF` (75% opacity) at the thin outer point → `#FAFCFF` (85% opacity) at the wide inner end.

**Pulse animation:** `<animateTransform type="translate">` on each cone's ellipse — operates in SVG user units so it scales correctly regardless of rendered width. Left pulse travels `0 0 → 248 0`; right pulse travels `0 0 → -248 0`. Duration: 2.6s, easing: cubic-bezier(0.42, 0, 0.58, 1). Separate `<animate>` on opacity fades the pulse in/out. Both animations loop indefinitely.

**Reduced motion:** `.gap-cone-pulse { display: none }` under `prefers-reduced-motion: reduce`.

**CSS removed:** `@keyframes gap-pill-sweep`, `.gap-pill-beam`, `.gap-pulse-spot`, `.gap-pulse-overlay` rules.

---

### 33. Gap CTA row — top margin increased

**Files:** `index.html`

**What changed:** `.gap-cta-row` margin-top changed from `mt-12` (3rem) to `mt-24` (6rem).

**Why:** More breathing room between the chart legend and the CTA text after the banner-to-cone redesign.

---

### 34. Targets section — heading split into two lines

**Files:** `index.html`

**What changed:** `<h1>` text changed from `The targets are set` (single line) to `The targets<br>are set` (forced two-line break).

---

### 35. Targets section — body text constrained to 6 columns

**Files:** `index.html`

**What changed:** The three body paragraphs are now wrapped in `<div class="mx-auto mt-6 w-full md:w-1/2">`. On desktop (≥768px) the text spans 6 of 12 columns, centered within the section. On mobile it is full-width.

---

### 36. Targets blob SVG — size reduced then adjusted

**Files:** `src/styles/main.css`

**What changed:** `.targets-blob-bg` `width` iterated from `100%` → `70%` → `80%` (final).

---

### 37. Targets section — vertical padding increased

**Files:** `index.html`

**What changed:** Section `py` iterated from `py-[var(--space-section-y)]` (6rem) → `py-[9rem]` → `py-[11rem]` (final, 176px top and bottom).

**Why:** The larger blob and the two-line heading needed more vertical breathing room to avoid the section feeling compressed.

---

## Post-session revisions — 2026-05-27 (index page — How It Works section)

**Files:** `index.html`, `src/styles/main.css`, `src/animations/scroll.js`

---

### 38. HIW panel — glass blur applied

**What changed:** Added `backdrop-filter: blur(8px) saturate(1.1)` (+ `-webkit-` prefix) to `.hiw-panel`.

**Why:** The panel had a semi-transparent background but no blur, so it read as a flat tinted box. Adding blur makes it consistent with the glass material language used by the gap section panel above it.

---

### 39. Reactor image — size reduced

**CSS (`.hiw-diagram__reactor`):**

| Property | Before | After |
|---|---|---|
| `max-width` | `360px` | `280px` |

---

### 40. Reactor image — pulled upward

**CSS (`.hiw-diagram__image-wrap`):**

Added `transform: translateY(-3rem)` to lift the reactor PNG upward within its grid span.

---

### 41. Left callout alignment — right → left

**CSS (`.hiw-callout--left`):**

| Property | Before | After |
|---|---|---|
| `align-items` | `flex-end` | `flex-start` |
| `text-align` | `right` | `left` |

**Why:** All four callouts are now uniformly left-aligned, consistent with standard annotated diagram conventions and easier to read.

---

### 42. Callout headings — forced single line

**CSS (`.hiw-callout__title`):**

Added `white-space: nowrap` so all four headings (01. Effluent inlet, 02. Light does the work, 03. Cleaner water out, Why a contained module) always render on one line.

---

### 43. Callout vertical positioning — iterated to final values

**01. Effluent inlet** (`.hiw-callout--upper`):

| Property | Before | After |
|---|---|---|
| `margin-top` | `2rem` | `3rem` |

**03. Cleaner water out** (`.hiw-callout--lower`):

| Property | Before | After |
|---|---|---|
| `margin-bottom` | `2rem` | `4rem` |
| `margin-left` | — | `4rem` |

`margin-bottom` increase pulls it higher in row 3 (callout is `align-self: end`). `margin-left` shifts it rightward toward the reactor.

**Why a contained module** (`.hiw-callout--right.hiw-callout--lower`):

| Property | Before | After |
|---|---|---|
| `align-self` | `end` (inherited) | `end` |
| `margin-bottom` | `2rem` (inherited) | `-6rem` |
| `margin-left` | — | `4rem` |

Negative `margin-bottom` pushes it below the row 3 boundary. `margin-left` shifts it rightward from the column edge. Position was iterated through grid-row: 4 (too far), flush bottom (too high), and several negative margin values before settling on `-6rem` / `4rem`.

---

### 44. Connector lines — complete rework

**Previous state:** A single `position: absolute; top: 2rem; width: 40px` element on each callout. Positioned above the heading text via `order: -1`. Too short and visually disconnected from headings.

**New approach:**

The connector is now an in-flow flex item sitting between the title and body text, guaranteed to render directly under the heading regardless of padding.

**Flex order:**

| Element | `order` |
|---|---|
| `.hiw-callout__title` | `-1` (first) |
| `.hiw-callout__connector` | `0` (default — between title and body) |
| `.hiw-callout__body` / `.hiw-callout__list` | `1` (last) |

**Sizing per callout:**

| Callout | Rule | Direction | Width |
|---|---|---|---|
| 01. Effluent inlet | `.hiw-callout--left` | rightward to reactor left edge | `420px` |
| 03. Cleaner water out | `.hiw-callout--left.hiw-callout--lower` | rightward, stops just past text end | `320px` |
| 02. Light does the work | `.hiw-callout--right` | `margin-left: -140px` leftward to reactor midpoint | `calc(140px + 2rem)` |
| Why a contained module | `.hiw-callout--right.hiw-callout--lower` | `margin-left: -2rem` short leftward reach | `4rem` |

For right callouts, negative `margin-left` pulls the line leftward past the callout boundary toward the reactor. `width` covers the leftward reach plus `2rem` back under the heading text so the right end is visually anchored to the heading start.

**GSAP draw animation** added in `src/animations/scroll.js`:

- Left connectors: `scaleX: 0 → 1`, `transformOrigin: 'left'` — draws rightward from text toward reactor
- Right connectors: `scaleX: 0 → 1`, `transformOrigin: 'right'` — draws leftward from text toward reactor
- Trigger: `#how-it-works`, `start: 'top 75%'`, `once: true`
- Duration / ease: `WATER_DURATION.default` / `WATER_EASE` (consistent with page scroll animations)

**CSS also added:** `position: relative` on `.hiw-callout` (retained from earlier absolute-positioning iteration, harmless now).
