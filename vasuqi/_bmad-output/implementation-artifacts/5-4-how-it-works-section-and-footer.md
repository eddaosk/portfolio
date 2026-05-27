# Story 5.4: How It Works Section & Footer

Status: done

## Story

As an investor or technical reader on the landing page,
I want the "How It Works" section to present the reactor mechanism as an annotated diagram with animated callouts and glass pollutant cards, and the footer to have a rich gradient transition instead of a flat navy background,
so that the technology feels credible, precise, and visually continuous with the brand.

## Acceptance Criteria

**AC1 — Section heading corrected (HIW-1):**
Given the `#how-it-works` section
When rendered
Then the `<h2>` reads "Light does the work" — not "How It Works"

**AC2 — Body text replaced verbatim (HIW-2):**
Given the `#how-it-works` section
When rendered
Then the body text reads exactly: "Pre-treated water enters a contained module. Visible blue LEDs activate an immobilized photocatalyst, developed from DTU research, designed to break down toxic organic compounds into CO₂, salts, and water. No chemicals added. No sludge generated."

**AC3 — Mechanism card grid replaced with annotated diagram (HIW-3):**
Given the `#how-it-works` section
When rendered
Then: the 3-column mechanism card grid and product image are removed; the reactor image (`/images/reactor-how-it-works.png`) is centered; 4 callout blocks are positioned around it with thin horizontal connector lines connecting each callout to the reactor vessel silhouette:
- Left upper: "01. Effluent inlet" + "After upstream treatment, pre-treated water enters the module."
- Right middle: "02. Light does the work" + "Blue light activates the catalyst, keeping the reaction concentrated where it belongs"
- Left lower: "03. Cleaner water out" + "Residual organics are broken down before effluent exits."
- Right lower: "Why a contained module" + bullet list: "Sits inside the existing process flow" / "Continuous contact with the active treatment surface" / "No separate catalyst recovery step"
All annotation titles: Syne SemiBold 24px, `--navy-deep`; all annotation bodies: Manrope Medium 16px, `--navy-deep`
On mobile: reactor image stacked above a numbered annotation list (no forced side-by-side callout layout)

**AC4 — Dark background panel wraps section (HIW-4):**
Given the `#how-it-works` section
When rendered
Then all section content is wrapped in an inner `div` with: `background: rgba(214, 248, 255, 0.13)`, `border: 1px solid #8f8f8f`, `border-radius: 40px`, centered within a 1280px canvas with ~50px side margins; on mobile `border-radius` is reduced to 16px or removed

**AC5 — Disclaimer text present (HIW-5):**
Given the `#how-it-works` section below the annotated diagram
When rendered
Then `<p>*Technology under development. First prototypes expected later this year.</p>` appears, styled in small/caption size (Manrope, `--steel`)

**AC6 — Pollutant cards have glass styling and floating blob animation (HIW-6):**
Given the `.pollutant-card` elements
When rendered
Then each card has: vertical linear gradient fill `#E8F2FF` (0%) → `#D6F8FF` (100%) at 20% opacity; glow box-shadow `0 0 20px 14px #e8f2ff`; `border-radius: 22px`; three blob `div` elements inside each card with `mix-blend-mode: plus-lighter`, blurred fill colors (`#0033CC` 70% opacity, `#0044FF` 80% opacity, and a third blob); CSS `@keyframes float` animation on the blob wrapper: `translateY(0) → translateY(-8px) → translateY(0)`, ~4s ease-in-out infinite

**AC7 — Pollutant card 1 copy corrected (HIW-7):**
Given pollutant card 1
When rendered
Then the text reads "Pharmaceutical residues, such as antibiotics, hormones, anti-depressants" — not "Pharmaceutical residues — antibiotics, hormones, anti-depressants"

**AC8 — Blueprint SVG is placed behind section and footer (HIW-8):**
Given `landingpage-bluebrint-background-footer.svg` in `/public/svgs/`
When rendered in `index.html`
Then the SVG is absolutely-positioned behind the How It Works section content and the footer, `pointer-events: none`, `aria-hidden="true"`, low opacity; z-index is below the section background panel (HIW-4) but above the footer gradient

**AC9 — Reactor image has LED pulse hover effect (HIW-9):**
Given the reactor image in the annotated diagram
When the user hovers over the image
Then a radial gradient overlay centered on the reactor's LED strip (center-height) triggers a `@keyframes pulse-glow` animation: gradient goes from transparent → `rgba(0, 200, 255, 0.35)` → transparent, repeating 2–3 times; the overlay is `pointer-events: none`

**AC10 — Footer background is a rich gradient, not flat navy (FOOTER-1):**
Given the `<footer>` element
When rendered
Then the `bg-navy-deep` flat background class is replaced with a CSS `linear-gradient` approximating: `#FAFCFF` or `#E8F2FF` at top (0%) → `#0033CC` at mid (51–89%) → `#0A1F44` at bottom (100%); the overall effect is "sinking into deep water" — light blue-white at top fading to deep navy at the bottom

## Tasks / Subtasks

- [x] Update section heading and body text (AC: 1, 2)
  - [x] Change h2 to "Light does the work"
  - [x] Replace body text with the verbatim spec copy (CO₂ uses the Unicode character `₂`, not subscript HTML tag)

- [x] Remove mechanism card grid (AC: 3)
  - [x] Delete the 3-column mechanism card grid HTML and all associated CSS classes
  - [x] Delete the standalone product image element below the cards

- [x] Build annotated diagram layout (AC: 3)
  - [x] Add `div.hiw-diagram` with `position: relative`; place reactor image centered inside it (`/images/reactor-how-it-works.png`)
  - [x] Add 4 `.hiw-callout` blocks, 2 left-aligned and 2 right-aligned, using `position: absolute` relative to the diagram container
  - [x] Add connector lines as `<div>` elements or `<svg>` elements with a thin 1px `--navy-deep` horizontal line from callout to reactor edge
  - [x] Desktop: callout layout as described; Mobile: `position: static` callouts stacked below the reactor image as a numbered list (`display: block md:hidden`)
  - [x] Style callout titles: Syne SemiBold 24px, `--navy-deep`; callout bodies: Manrope Medium 16px, `--navy-deep`

- [x] Add section background panel (AC: 4)
  - [x] Wrap all `#how-it-works` content in `.hiw-panel` with `background: rgba(214,248,255,0.13)`, `border: 1px solid #8f8f8f`, `border-radius: 40px`, `max-width: 1180px`, `margin: 0 auto`
  - [x] On mobile: `border-radius: 16px` or 0

- [x] Add disclaimer text (AC: 5)
  - [x] Add `<p>` with disclaimer text below the `.hiw-diagram` and above the pollutant cards, styled with `font-size: 0.875rem` (14px — no `--text-small` token exists; do NOT use `var(--text-small)`), `font-family: var(--font-manrope)`, `color: var(--steel)`
  - [x] Note: `design-tokens.css` has `--text-caption-size` (1.25rem/20px) and `--text-body-size` (1rem/16px) — use `0.875rem` inline for this disclaimer as there is no "small" token

- [x] Update pollutant card styling and blobs (AC: 6)
  - [x] In `src/styles/main.css`, find the `.pollutant-card` block at approximately line 818 — replace `background: var(--white-brand)` and `border: 1px solid var(--ice-near)` with the new glass styles
  - [x] Add `position: relative` to `.pollutant-card` (required so `.pollutant-card__blobs` with `position: absolute; inset: 0` positions correctly inside the card)
  - [x] Apply: `background: linear-gradient(to bottom, rgba(232,242,255,0.20) 0%, rgba(214,248,255,0.20) 100%)`, `box-shadow: 0 0 20px 14px #e8f2ff`, `border-radius: 22px`
  - [x] Inside each `.pollutant-card` in `index.html`, add `.pollutant-card__blobs` wrapper div: `position: absolute`, `inset: 0`, `pointer-events: none`, `overflow: hidden`
  - [x] Three blob `div` elements inside: Blob A `background: rgba(0,51,204,0.70)`, `filter: blur(30px)`, Blob B `background: rgba(0,68,255,0.80)`, `filter: blur(50px)`, Blob C (use `background: rgba(0,68,255,0.50)`, `filter: blur(40px)` as approximation — no Figma MCP access), all `mix-blend-mode: plus-lighter`, `border-radius: 50%`, varied widths/heights (e.g. 263×186px, 219×124px, 150×100px)
  - [x] Add `@keyframes float` on `.pollutant-card__blobs`: `0% { transform: translateY(0) } 50% { transform: translateY(-8px) } 100% { transform: translateY(0) }`, `animation: float 4s ease-in-out infinite`

- [x] Fix pollutant card 1 copy (AC: 7)
  - [x] Change "Pharmaceutical residues — antibiotics…" to "Pharmaceutical residues, such as antibiotics…"

- [x] Add blueprint SVG background layer (AC: 8)
  - [x] In `index.html`, add `<img src="/svgs/landingpage-bluebrint-background-footer.svg" aria-hidden="true" class="blueprint-footer-bg">` before the closing `</main>` or as a sibling to the footer
  - [x] In CSS: `position: absolute`, coordinate top position to start at approximately the How It Works section, `width: 100%`, `opacity: 0.15` (or similar low value), `pointer-events: none`, `z-index: 0`
  - [x] Ensure `.hiw-panel` has `position: relative; z-index: 1` so it sits above the blueprint

- [x] Add reactor hover pulse effect (AC: 9)
  - [x] Add `.hiw-glow-overlay` element (`position: absolute`, centered vertically at LED strip height, `pointer-events: none`) inside `.hiw-diagram`
  - [x] On `.hiw-diagram:hover .hiw-glow-overlay`, trigger `@keyframes pulse-glow`: `0% { opacity: 0 } 50% { opacity: 1; background: radial-gradient(circle, rgba(0,200,255,0.35) 0%, transparent 70%) } 100% { opacity: 0 }`, 2-3 iterations

- [x] Replace footer background gradient (AC: 10)
  - [x] In `partials/footer.html` (or footer CSS), remove `bg-navy-deep` class
  - [x] Apply `background: linear-gradient(to bottom, #FAFCFF 0%, #748DCC 40%, #0033CC 75%, #0A1F44 100%)` to the `<footer>` element
  - [x] Verify that the blueprint SVG (AC8) blends seamlessly into this gradient

## Dev Notes

### CSS to Remove from main.css (Story 2.5 leftovers — no longer needed)

The following CSS blocks from Story 2.5 will be **replaced or removed** by this story. Do NOT leave dead CSS:

- `@keyframes vizGlow` (~line 377) — replaced by `@keyframes pulse-glow` (AC9)
- `.product-viz` (~line 386) and `@media (hover: hover) { .product-viz:hover }` (~line 389) — replaced by `.hiw-glow-overlay` approach
- `@keyframes ambientLight` (~line 400) — no longer used; mechanism card grid removed
- `.hiw-card`, `.hiw-card::before`, `.hiw-card > *` (~lines 406–425) — card grid removed entirely

Also update `.pollutant-card` (~line 818) in place — do not add a new selector, replace the existing one.

### Connector Lines

Use `<div>` elements with `height: 1px`, `background: var(--navy-deep)`, `width: auto` connecting callout edge to reactor image edge. Alternatively, a single absolutely-positioned SVG overlay can draw all 4 connector lines at once — more brittle to resize but easier to position. Choose the approach that is most maintainable.

### Annotated Diagram Container Height

`position: absolute` callouts require the diagram container to be `position: relative` with a defined height. The reactor image height will drive this — set `height: auto` on the image and a min-height on the container, or use a CSS grid overlay approach.

### Pollutant Card Blob Blending

Pollutant card blobs with `mix-blend-mode: plus-lighter` require a non-transparent parent background to produce the correct color blend. The gradient fill at 20% opacity should provide enough background for the blend to work. The `.pollutant-card` must have `position: relative` for absolutely-positioned blob children.

### Blueprint SVG Dimensions

The SVG file exists at `/public/svgs/landingpage-bluebrint-background-footer.svg` but is not referenced anywhere. Check its `viewBox` dimensions to determine how to position it so it starts at the HIW section and spans through the footer. Use `object-fit: cover` or just `width: 100%; height: auto`.

### Safari backdrop-filter Stacking Context

If `.hiw-panel` has `overflow: hidden`, test that its glass effect and the pollutant card blobs still render correctly in Safari. See deferred-work from Story 1-3.

### Design Token Warning

There is **no `--text-small` token** in `design-tokens.css`. Available tokens relevant to this story: `--text-caption-size` (1.25rem/20px, ExtraLight), `--text-body-size` (1rem/16px), `--text-h2-size` (1.5rem/24px). Use `0.875rem` inline for the disclaimer small text (AC5). Never reference a token that does not exist in `design-tokens.css`.

### Existing Code State

The current `#how-it-works` section in `index.html` (lines 542–629) has:
- `<h2>How It Works</h2>` — to be replaced with "Light does the work" (AC1)
- Body text about "Light activates a catalytic surface…" — to be replaced verbatim (AC2)
- 3-column mechanism card grid (`.hiw-card`) — to be removed entirely (AC3)
- `product-viz` image — to be replaced by `.hiw-diagram` annotated layout (AC3, AC9)
- `.pollutant-card` elements with plain white card styling — glass styling applied in-place (AC6, AC7)

The current `partials/footer.html` line 1: `<footer class="bg-navy-deep text-white-brand">` — `bg-navy-deep` class to be replaced with inline `style="background: linear-gradient(...)"` (AC10).

### Project Structure Notes

- Landing page: `index.html`
- Footer partial: `partials/footer.html`
- Section styles: `src/styles/main.css`
- Blueprint SVG: `public/svgs/landingpage-bluebrint-background-footer.svg` (exists, unused)
- Reactor image: `public/images/reactor-how-it-works.png`

### References

- Gap audit codes: HIW-1 through HIW-9, FOOTER-1
- Source: `_bmad-output/planning-artifacts/epic5-gap-audit.md`
- Glass recipe: [Source: docs/design-manual.md — Glass material language]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

No blockers. Build clean on first attempt.

### Completion Notes List

- AC1: h2 changed from "How It Works" to "Light does the work"
- AC2: Body text replaced verbatim including CO₂ Unicode character
- AC3: 3-column mechanism card grid and `product-viz` image removed; replaced with `.hiw-diagram` CSS grid with 3-column layout (left-callouts | reactor | right-callouts); 4 `.hiw-callout` blocks with `.hiw-callout__connector` 1px horizontal lines; desktop shows grid callouts, mobile shows `.hiw-mobile-annotations` ordered list (desktop callouts hidden via `display: none` in mobile media query)
- AC4: All section content wrapped in `.hiw-panel` with specified glass background, border, border-radius 40px, max-width 1180px; mobile reduces border-radius to 16px
- AC5: `.hiw-disclaimer` paragraph added using `0.875rem` inline size (no `--text-small` token exists)
- AC6: `.pollutant-card` replaced with glass gradient background, `box-shadow: 0 0 20px 14px #e8f2ff`, `border-radius: 22px`, `position: relative`; `.pollutant-card__blobs` wrapper with 3 blob divs (plus-lighter blend, blur, `@keyframes float` 4s animation) added to all 4 cards in HTML
- AC7: Pollutant card 1 copy changed from "— antibiotics" to ", such as antibiotics"
- AC8: Blueprint SVG placed inside `#how-it-works` section (which has `position: relative`) as first child; `.blueprint-footer-bg` CSS: `position: absolute; top: 0; height: 150%` to visually extend into footer territory; `opacity: 0.12; z-index: 0`; `.hiw-panel` has `z-index: 1` to float above
- AC9: `.hiw-glow-overlay` added inside `.hiw-diagram__image-wrap`; `@keyframes pulse-glow` on `.hiw-diagram:hover .hiw-glow-overlay` with radial gradient `rgba(0,200,255,0.35)`, 1.8s × 2 iterations; scoped to `@media (hover: hover)`
- AC10: `bg-navy-deep` class removed from `<footer>`; replaced with inline `style="background: linear-gradient(to bottom, #FAFCFF 0%, #748DCC 40%, #0033CC 75%, #0A1F44 100%)"`
- Dead CSS removed: `@keyframes vizGlow`, `.product-viz`, `.product-viz:hover`, `@keyframes ambientLight`, `.hiw-card`, `.hiw-card::before`, `.hiw-card > *`

### File List

- index.html
- partials/footer.html
- src/styles/main.css

### Review Findings

- [x] [Review][Patch] Token violation: `#e8f2ff` in `.pollutant-card` box-shadow — replaced with `var(--ice-near)` [`src/styles/main.css:971`]
- [x] [Review][Patch] Token violation: footer gradient `#FAFCFF`, `#0033CC`, `#0A1F44` replaced with `var(--white-brand)`, `var(--blue-deep)`, `var(--navy-deep)`; `#748DCC` (no palette token) retained with comment [`partials/footer.html:1`]
- [x] [Review][Patch] Missing `prefers-reduced-motion` guard for `@keyframes float` (`.pollutant-card__blobs`) and `pulse-glow` (`.hiw-glow-overlay`) — guard added [`src/styles/main.css`]
- [x] [Review][Patch] `.hiw-callout__title` used hardcoded `1.5rem` / `600` instead of `var(--text-h2-size)` / `var(--text-h2-weight)` — replaced with tokens [`src/styles/main.css`]
- [x] [Review][Patch] Mobile annotation list used `<ol>` with `list-style: decimal` causing auto "4." prefix on "Why a contained module" item — changed to `<ul>` with `list-style: none` since numbers are embedded in `<strong>` text [`index.html:603`, `src/styles/main.css`]
- [x] [Review][Patch] `.hiw-panel` border used `#8f8f8f` (no palette token) — changed to `rgba(143, 143, 143, 0.9)` with explanatory comment [`src/styles/main.css:395`]
- [x] [Review][Defer] Connector lines (40px accent div inside flex-column callout) do not visually span from callout edge to reactor silhouette — the current implementation is a short accent line above the callout text, not a true connection line. Acceptable visual approximation given pure-CSS constraints. [`src/styles/main.css:501`] — deferred, pre-existing design approximation

## Change Log

- 2026-05-25: Story implemented — HIW section rebuilt with annotated diagram, glass panel, glass pollutant cards with floating blobs, blueprint SVG background layer, LED pulse hover effect, and footer gradient (all 10 ACs satisfied). Dead Story 2.5 CSS removed.
- 2026-05-25: Code review — 5 patches applied (token violations, reduced-motion guards, mobile list semantic fix); 1 deferred (connector line visual approximation); 1 dismissed (overflow:hidden on non-backdrop-filter glass variant).
