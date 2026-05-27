# Epic 5 — Visual Fidelity Gap Audit
# Sessions: 2026-05-24 (desktop), 2026-05-25 (mobile)
# Method: Section-by-section Figma review with Edda

This document captures every gap between the Figma prototype ("rigtig landingpage")
and the coded website, discovered during the section-by-section audit.
It will be converted into Epic 5 stories after the full audit is complete.

---

## HERO SECTION

### NAV-1: Wrong logo in navbar
- **Gap:** Nav uses hand-coded inline SVG paths (snake body paths only)
- **Fix:** Replace with `<img src="/svgs/vasuqi-logo-navbar.svg">` (file exists)

### NAV-2: Nav border must be a linear gradient stroke
- **Gap:** Coded as flat `border-ice-near` (1px solid)
- **Figma spec:**
  - Stroke type: Linear gradient
  - Stops: `#E8F2FF` 0% → `#A1A1A1` 50% → `#E8F2FF` 100%
  - Position: Inside, Weight: 3px
  - Appearance effect: Glass
- **Fix:** Use CSS `border-image` linear gradient or a pseudo-element overlay with gradient border; ensure `-webkit-` prefix for Safari

### NAV-3: Nav background opacity
- **Gap:** Coded at 80% opacity (`bg-white-brand/80`)
- **Figma spec:** Fill `#FAFCFF` at **79%** opacity
- **Fix:** Minor — adjust to 79% (`/[0.79]`)

### NAV-4: Nav corner radius
- **Gap:** Using `rounded-full` (Tailwind pill shorthand)
- **Figma spec:** Corner radius **56px**
- **Fix:** Use `rounded-[56px]` — verify this matches the visual pill shape at current nav height

### NAV-5: Nav spacing — uneven distribution
- **Gap:** Current layout crowds "About us" and "Contact" to the right; perceived uneven spacing
- **Figma spec:** Items evenly/spacedly distributed across nav width
- **Fix:** Review grid column approach; consider `justify-between` or explicit `justify-evenly` on nav flex container

### HERO-1: Video blend mode wrong
- **Gap:** Video uses `mix-blend-screen`
- **Figma spec:** Blend mode is **Color Burn**
- **Fix:** Change to `mix-blend-color-burn` on the `<video>` element

### HERO-2: Missing logo labels ("Backed by")
- **Gap:** No visible text labels under the institutional logos
- **Figma spec:** Each logo has a label underneath
  - DTU logo → **"DTU Sustain"**
  - Innofounder (IFD) logo → **"Innofounder"**
  - BII logo → **"Bio Innovation Institute"**
- **Fix:** Add `<p>` label below each `<img>` in the backed-by block

### HERO-3: Mobile — backed by logos need carousel + labels
- **Gap:** Mobile shows logos as a static flex row, no carousel, no labels
- **Figma spec:** Horizontally scrollable carousel on mobile, with logo name labels
- **Fix:** Wrap in scroll-snap carousel container on mobile; add same labels as desktop

### FLOATINGLIGHT-1: Beam positions completely wrong
- **Gap:** 3 beams positioned at 12%, 55%, 80% — scattered across center of page
- **Figma spec:** Beams only at **left edge** and **right edge** of the viewport
- Component dimensions in Figma: 1456 × 7652px (spans full page scroll height)

### FLOATINGLIGHT-2: Beam gradients wrong
- **Gap:** Beams use single-color gradients with tokens (`--blue-soft`, `--blue-mid`, `--cyan-light`)
- **Figma spec:** Two gradient variants, top→bottom, with **exact hex values**:
  - **Gradient A (blue):** `#0044FF` (0%) → `#749BFF` (50%) → `#E8F2FF` (100%)
  - **Gradient B (cyan):** `#00E5FF` (0%) → `#D6F8FF` (50%) → `#E8F2FF` (100%)
- **Fix:** Rebuild beams using these gradients; alternate A/B across left and right groups

### FLOATINGLIGHT-3: Mobile beam layout
- **Gap:** Same 3 beams render on mobile at the same positions as desktop
- **Figma spec:** Mobile ("MOBIL LYS") also shows beams only at left and right edges, scaled to mobile viewport
- **Fix:** Responsive positioning — beams stay on edges at all breakpoints

### SIDENAV-1: Side nav dot color wrong
- **Gap:** Currently rendered in a darker or default color
- **Figma spec:**
  - Fill: `#A8C5FF`
  - Stroke: `#A8C5FF`, weight 1, Inside
- **Fix:** Update side nav dot CSS to use `#A8C5FF` — this is `--blue-soft` in the token palette

---

## GLOBAL — SCROLL ANIMATION FAST-SCROLL GUARD

### ANIM-1: Scroll-triggered animations must fire even when scrolling fast
- **Gap:** Current GSAP ScrollTrigger animations (chart lines, section fade-ins, etc.) may not fire if the user scrolls past the trigger point before the ScrollTrigger registers — leaving content invisible or mid-animation on arrival.
- **Spec decision (Edda):** The water-physics fade-in approach is intentional and correct. The guard is specifically about ensuring content is never left invisible for a fast-scrolling user.
- **Fix:**
  1. Set `start: "top 85%"` (or earlier) on all scroll-triggered animations so they fire before the element reaches the viewport center — giving fast scrollers a head start
  2. For any element with `opacity: 0` as its initial state, add a `ScrollTrigger` `onEnter` that also checks `isInViewport` at page load / `ScrollTrigger.refresh()` — play to completion immediately if already in or above viewport
  3. For the chart line draw-in (GAP-5) and other content-critical animations: use `immediateRender: false` + `invalidateOnRefresh: true` so fast-scroll doesn't leave content in the initial (invisible) state
  4. Never use `toggleClass` as the sole visibility mechanism for text content — always pair with a fallback that makes content visible after the animation duration, regardless of whether the trigger fired

---

## GLOBAL — GRID SYSTEM (for reference in all section layouts)

- **Mobile:** 4-column grid, margin 16px, gutter 16px
- **Desktop:** 12-column grid, gutter 20px
- Use this when implementing section padding, content width constraints, and multi-column layouts in Epic 5.

---

## GLOBAL — MISSING DESIGN TOKEN

### TOKEN-1: "picture description" text style missing from design-tokens.css
- **Gap:** No CSS token exists for this style
- **Figma spec:**
  - Font: Manrope
  - Weight: ExtraLight (200)
  - Size: 20px
  - Line height: Auto
  - Letter spacing: 0%
- **Fix:** Add `--text-picture-desc-size`, `--text-picture-desc-weight` tokens to `design-tokens.css` and a utility class (e.g. `.text-picture-desc`)
- **Used in:** "pronounced VAH-su-kee" label, glass panel body text in The Gap section, and potentially other sections

---

## THE GAP SECTION

### GAP-1: Section heading text completely wrong
- **Gap:** Current h2 reads "The Last 5%"
- **Figma spec:** h1 — "The last fraction is the hardest"
- **Fix:** Change element to `<h1>` (or styled heading), update copy

### GAP-2: Missing subheading
- **Gap:** No h2 exists below the heading
- **Figma spec:** h2 — "The last 5% of COD can consume more than 60% of a treatment plant's OPEX."
- **Fix:** Add as h2 below the h1

### GAP-3: Missing pronunciation label
- **Gap:** No "pronounced VAH-su-kee" text on page
- **Figma spec:** Small caption above the h1, centered, styled as "picture description" (Manrope ExtraLight 20px)
- **Fix:** Add above the heading

### GAP-4: Body text is wrong — replace entirely
- **Gap:** Current body text discusses EU directive, groundwater contamination — does not match Figma
- **Figma spec:** Body text lives inside the glass panel (see GAP-7), not as free-standing paragraphs
- **Fix:** Remove current body paragraphs from this section

### GAP-5: Missing animated chart lines
- **Gap:** No lines exist in the coded section
- **Figma spec:** Two SVG curves that animate/materialize on scroll:
  - Line 1 (blue, `--blue-primary`): rises left-to-right — represents treatment cost rising
  - Line 2 (cyan, `--cyan-light`): falls left-to-right — represents residual COD falling
  - They cross forming an X shape
  - Animation: lines draw in (stroke-dashoffset or opacity) when section enters viewport
- **Fix:** Implement as SVG `<path>` elements with GSAP ScrollTrigger draw-on animation

### GAP-6: Missing chart legend labels
- **Gap:** No legend exists
- **Figma spec:** Two labels below the chart lines, styled as **"picture description"** (Manrope ExtraLight 20px):
  - Cyan color swatch + "Treatment cost rises sharply chasing the final fraction."
  - Blue color swatch + "Residual COD falls as treatment intensifies."
- **Fix:** Add below the SVG chart using `.text-picture-desc` utility class

### GAP-7: Missing glass text panel (overlaid on chart)
- **Gap:** No glass panel exists
- **Figma spec:**
  - Fill: `#D9D9D9` at 20% opacity
  - Corner radius: 88px
  - Effects: Glass + Drop Shadow
  - Body text uses **regular body text style** (brødtekst — Manrope 16px):
    - "Industrial wastewater is cleaned in stages. Biology, membranes, and thermal processes remove the bulk of the load."
    - "What remains is the residual fraction. Small in volume, disproportionate in cost."
  - Panel floats on top of the chart lines, appears after lines animate in
- **Fix:** Implement as glassmorphism card with GSAP fade-in, triggered after line animation

### GAP-8: Missing "THIS IS WHAT VĀSUQI IS BUILT FOR." banner
- **Gap:** No banner exists at the bottom of this section
- **Figma spec:**
  - Wide pill/capsule shape
  - Centered text: "THIS IS WHAT VĀSUQI IS BUILT FOR." — uppercase, Syne, navy-deep
  - Animated light beam sweeps through the pill, cycling through the color palette
  - No border preferred (avoid if possible)
- **Fix:** Implement as a pill container with CSS `@keyframes` light sweep animation

## THE TARGETS ARE SET SECTION
*(This is a standalone section between The Gap and Where Vāsuqi Fits — not the "Where Vāsuqi Fits" section. The coded site does not yet have this section; content is currently mis-assigned to the "where-vasuqi-fits" id.)*

### FITS-1: Entire section content replaced — heading, body, and layout are all wrong
- **Gap:** Current code has h2 "Where Vasuqi Fits" + reactor description + SVG blueprint diagram (desktop) / numbered step list (mobile). None of this exists in the Figma.
- **Figma:** h3 "The targets are set" + 3 EU regulation paragraphs + organic blob background
- **Correct copy (verbatim):**
  - **h3:** The targets are set
  - **p1:** In 2024, the EU revised its Urban Wastewater Treatment Directive — the first major update in over thirty years.
  - **p2:** 80% removal of micropollutants from major plants. Interim targets from 2033. Full quaternary treatment by 2045. Under the polluter-pays principle, pharmaceutical and cosmetics companies cover 80% of the cost.
  - **p3:** Regulation, timeline, and funding are now in place. Vāsuqi is built for this moment — without the energy demand or chemical load of conventional upgrades.
- **Fix:** Remove current section contents entirely. Replace with the h3 heading and three paragraphs above. Remove the `reactor-bluebrint-where-it-fits.svg` reference and step list.

### FITS-2: Missing organic blob background — radial gradient glow
- **Gap:** Section sits on a plain background; no blob exists in the code
- **Figma spec:**
  - Blob is ~20 overlapping organic shapes at 20% opacity with radial gradient fills, producing a soft white-to-blue oval glow
  - Radial gradient: `#C2C5FD` (0%, transparent) → `#C5C8FD` (51%, 10%) → `#E8F2FF` (100%, 100%)
  - Total visual bounding box: approximately **838 × 1011px**
- **Agreed simplification:** Exact 20-layer implementation is not required. Use 3–5 overlapping CSS `div` elements with the same radial gradient, varied in `border-radius`, `transform: rotate()`, and slight offset — achieving the same soft organic-oval glow effect at a fraction of the complexity.
- **Fix:** Absolutely-positioned blob container behind text, with a few gradient layers using the stops above.

### FITS-3: Missing organic squiggly stroke outline (desktop)
- **Gap:** No stroke or outline around the content area
- **Figma spec:** Blue organic squiggly closed-path stroke that frames the blob content — separate SVG path, not a border-radius shape. Stroke color appears to be `--blue-primary` or `--blue-mid`.
- **Fix:** Export the organic path from Figma as an SVG and overlay it as an absolutely-positioned element around the blob.

### FITS-4: Mobile — vāsuqi wordmark blob dropped; use pronunciation label only
- **Decision:** The Figma mobile opening blob (vāsuqi Syne 64pt + linear-gradient blob) is **not implemented**.
- **Fix:** On mobile, show only the "pronounced VAH-su-kee" label styled as `.text-picture-desc` (Manrope ExtraLight 20px — TOKEN-1). No blob, no wordmark, no Syne 64pt display text.
- **TOKEN-2 (Syne Bold 64pt):** Dropped — no longer needed since FITS-4 blob is skipped.

## WHERE VĀSUQI FITS SECTION

### WVFIT-1: Missing subheading below h2
- **Gap:** No subheading exists below "Where Vāsuqi Fits"
- **Figma spec:** "Designed for lower OPEX. Fewer steps. Cleaner water." — sits directly below the h2, left-aligned, styled as a lead/subheading
- **Fix:** Add as a `<p>` or `<h3>` below the section h2

### WVFIT-2: Body text wrong — wrong copy, wrong location
- **Gap:** Current body paragraph (about photocatalytic reactor) sits at top of section, outside any card
- **Figma spec:** The body copy lives inside the glass card as a caption at the bottom: "Upstream treatment removes most of the burden. Vāsuqi is designed to sit at the downstream end, where residual organics still drive polishing, disposal, and complexity."
- **Fix:** Remove current body paragraph. Add the correct caption text inside the glass card (see WVFIT-3).

### WVFIT-3: Missing glass card wrapper
- **Gap:** The reactor SVG is a bare `<img>` with no card around it; no glassmorphism, no shadow
- **Figma spec — desktop:**
  - Fill: `#D9D9D9` at 20% opacity
  - Corner radius: **88px**
  - Effects: **Glass** + **Drop shadow** (X: 0, Y: 4, Blur: 4, Spread: 0, Color: `#000000` at 25%)
  - Dimensions: 1022 × 756px
- **Figma spec — mobile:**
  - Fill: `#D9D9D9` at 20% opacity
  - Corner radius: **0**
  - Effects: **Inner shadow** + **Glass** (no drop shadow on mobile)
  - Dimensions: 402 × 1044px
- **Fix:** Wrap all card content (icons, reactor SVG, caption) in a glass card `div`. Use `backdrop-filter: blur()` for glass; `box-shadow: 0 4px 4px rgba(0,0,0,0.25)` for desktop drop shadow. Mobile: corner-radius 0, switch to inner shadow.

### WVFIT-4: Missing process flow icons inside the card
- **Gap:** No icons exist in any version of the code (mobile step list has text only)
- **Figma spec — two rows of icons + labels inside the card:**
  - **Top row (conventional treatment stages, 6 icons):**
    - Upstream processes → `upstream-icon.svg`
    - Primary treatment → `1-treatment-icon.svg`
    - Secondary treatment → `2-treatment-icon.svg`
    - Tertiary treatment (UF+RO) → `teritary-icon.svg`
    - Evaporator → `evaporator-icon.svg`
    - Disposal → `disposal-icon.svg`
  - **Outcome columns (below the flow line):**
    - "Reuse, instead of waste" + "Cleaner water recovered back into the plant." → `nature-icon.svg` (recycling)
    - "Cleaner discharge" + "Polishing where residuals stand between the plant and compliance." → icon TBC (check Figma for file name)
    - "Less to haul away" + "Lower logistics and handling burden at the tail-end." → `truck-icon.svg`
    - "Less pressure on expensive equipment" + "Load taken off the steps where OPEX escalates fastest." → icon TBC (check Figma)
- **Fix:** Implement two-row icon layout inside the glass card. All icon SVGs already exist in `/public/svgs/` — confirm the two outcome icon filenames directly in Figma.

### WVFIT-5: Mobile layout wrong — icons beside vertical reactor, not a step list
- **Gap:** Mobile shows a numbered step list; no icons, no reactor SVG
- **Figma spec:** Mobile rotates the layout — reactor blueprint runs **vertically** on the right; icons and labels are stacked **beside it on the left** (effectively a 90°-rotated composition compared to desktop)
- **Fix:** Implement mobile-specific layout (hidden on `md:`) with the vertical reactor SVG alongside the icon/label stack. Glass card on mobile uses inner shadow, corner-radius 0 (see WVFIT-3).

### WVFIT-6: Missing "Don't replace what works." tagline
- **Gap:** Text "Don't replace what works. Finish what conventional treatment can't." does not exist anywhere in the code
- **Figma spec:** Standalone statement below the glass card, outside it
  - **Desktop:** Large/prominent — treat as a display-level statement
  - **Mobile:** Same copy but normal body size (not oversized — Edda confirmed)
- **Fix:** Add below the card container. On desktop use a large heading style; on mobile use body/section-body styling.

## WHAT VĀSUQI IS BUILT TO CHANGE SECTION

### WVBTC-1: Heading copy and capitalization wrong
- **Gap:** Current h2 reads "What It's Built to Change"
- **Figma spec:** "What Vāsuqi is built to change:" — sentence case, includes ā macron, ends with a colon
- **Fix:** Update heading copy exactly as above

### WVBTC-2: Two body paragraphs must be removed
- **Gap:** Two paragraphs about the photocatalytic platform and investor backing sit below the heading
- **Figma spec:** No free-standing body text — only the 4 blob cards follow the heading
- **Fix:** Remove both `<p>` elements entirely

### WVBTC-3: Wrong file references — use PNG blobs, not SVG icons
- **Gap:** Code references `recovery.svg`, `compliance.svg`, `disposal.svg`, `opex.svg` as `<img>` icons inside the card. These are the wrong files and the wrong approach.
- **Correct files (PNGs with glass effect baked in, transparent background):**
  - `/images/recovery-blob.png`
  - `/images/compliance-blob.png`
  - `/images/disposal-blob.png`
  - `/images/opex-blob.png`
- **Fix:** Replace all icon `<img>` src references with the PNG paths above. The PNG IS the card shape — not an icon inside a card — see WVBTC-4 for the layering structure.

### WVBTC-4: Blob rendering approach is wrong — needs three-layer text/blob/text stacking
- **Gap:** Current structure is a flat `div.benefit-blob > div.benefit-blob__inner` with icon + number + label + text. No layering.
- **Figma technique:** Each card is a three-layer stack:
  1. **Layer 1 (bottom):** body text — visible at the blob edges as a subtle "bleed-through" shadow effect
  2. **Layer 2 (middle):** blob SVG with glass effect + shadows — sits over the text
  3. **Layer 3 (top):** same body text repeated — fully readable, centered inside the blob
- The "arched label" (e.g. "01 RECOVERY") sits above the blob, outside the stack
- **Fix:** Restructure each card as a `position: relative` container with absolutely-positioned layers. Duplicate the text at z-index 1 and z-index 3; blob SVG/mask at z-index 2.

### WVBTC-5: Missing glass effect on blobs
- **Gap:** Current `.benefit-blob` has no glass treatment
- **Figma spec (per blob):**
  - Fill: `#E8F2FF` at **0% opacity** (transparent — glass effect provides the visual)
  - **Glass:** Light angle −45°, intensity 80%, Refraction 100, Depth 57, Dispersion 100, Frost 0, Splay 100
  - **Drop shadow 1:** X 0, Y 4, Blur 4, Spread 0, `#000000` 25%
  - **Drop shadow 2:** X −16, Y 12, Blur 30, Spread 0, `#000000` 58%
  - **Inner shadow 1:** X −3, Y 5, Blur 15, Spread 0, `#000000` 40%
  - **Inner shadow 2:** X 0, Y 4, Blur 4, Spread 0, `#000000` 40%
- **CSS approximation (Figma Glass has no CSS equivalent):**
  - Use SVG blob as a `clip-path` source; apply `backdrop-filter: blur(8px) saturate(1.1)` + `background: rgba(232, 242, 255, 0.08)` to the clipped element
  - Outer shadows: `filter: drop-shadow(0 4px 4px rgba(0,0,0,0.25)) drop-shadow(-16px 12px 30px rgba(0,0,0,0.58))` on the blob wrapper
  - Inner shadows: pseudo-element with `inset box-shadow` clipped to same shape, or SVG `feFlood`/`feComposite` filter
- **Decision: Export as PNG with transparent background from Figma.** Rationale: the Figma Glass parameters (refraction, dispersion, splay, depth) + two inner shadows on an organic shape have no reliable CSS equivalent. PNG preserves exact fidelity. Export just the blob layer (not the section background) so transparency is clean. Scale with `width: 100%`; export a mobile-size set if the desktop PNG looks soft at small viewport widths.

### WVBTC-6: Arched label text above each blob
- **Gap:** Current code has a flat `<p class="benefit-blob__number">01</p>` + `<p class="benefit-blob__label">Recovery</p>` — no arching, no combined display
- **Figma spec:** Combined label "01 RECOVERY" (number + name, all caps) rendered in **blue (`--blue-primary`)**, small size, **curved along the top arc** of the blob
- **Implementation:** SVG `<text>` on a `<textPath>` following the blob's top arc, or positioned CSS text with slight arc approximation using `transform`
- **Fix:** Replace number/label elements with a single arched text element per blob

### WVBTC-7: Text color inside blobs must be blue-primary, not navy-deep
- **Gap:** Current body text inside cards is navy-deep
- **Figma spec:** All text inside the blob (both layers) is `--blue-primary`
- **Fix:** Update `.benefit-blob__body` (and the duplicate top-layer text) to `color: var(--blue-primary)`

### WVBTC-8: Desktop layout is regular grid — should be staggered
- **Gap:** Current layout uses `grid-cols-1 sm:grid-cols-2 gap-8` — uniform 2-column grid
- **Figma spec:** Blobs are staggered — 01 top-left, 02 top-right (offset vertically), 03 center-left (lower), 04 right (lower offset). Not a rigid grid; blobs overlap/offset for an organic composition.
- **Mobile:** Stacked vertically in order (01→02→03→04), left-aligned labels
- **Fix:** Use `position: absolute` or CSS grid with row/column offsets to replicate the stagger; or use a wrapper with negative margins and transforms per blob.

## HOW IT WORKS SECTION

### HIW-1: Section heading wrong
- **Gap:** Code `<h2>` reads "How It Works"
- **Figma spec:** "Light does the work"
- **Fix:** Change `<h2>` content to "Light does the work"

### HIW-2: Body text wrong — replace entirely
- **Gap:** Code: "Light activates a catalytic surface inside Vasuqi's reactor. The reaction destroys pharmaceutical APIs, industrial dyes, and persistent organics — the compounds that make up the last 5% conventional treatment cannot remove. No added chemicals. No secondary waste. A plug-in polishing stage that finishes the job."
- **Figma spec (verbatim):** "Pre-treated water enters a contained module. Visible blue LEDs activate an immobilized photocatalyst, developed from DTU research, designed to break down toxic organic compounds into CO₂, salts, and water. No chemicals added. No sludge generated."
- **Fix:** Replace body text verbatim

### HIW-3: Layout completely wrong — annotated diagram, not card grid
- **Gap:** Code has a 3-column mechanism card grid (01 Light Activation / 02 Molecular Destruction / 03 Clean Discharge) + separate product image below. None of this exists in Figma.
- **Figma spec:** Reactor photo centered, with 4 annotation callouts connected by thin dark navy connector lines:
  - **Left, upper:** "01. Effluent inlet" — "After upstream treatment, pre-treated water enters the module."
  - **Right, middle:** "02. Light does the work" — "Blue light activates the catalyst, keeping the reaction concentrated where it belongs"
  - **Left, lower:** "03. Cleaner water out" — "Residual organics are broken down before effluent exits."
  - **Right, lower:** "Why a contained module" — bullet list: "Sits inside the existing process flow" / "Continuous contact with the active treatment surface" / "No separate catalyst recovery step"
  - All annotation titles: Syne SemiBold 24px, navy-deep
  - All annotation bodies: Manrope Medium 16px, navy-deep
  - Connector lines: thin horizontal lines (dark navy, ~1px) from each callout text edge horizontally to the reactor vessel silhouette
- **Mobile approach (Edda confirmed):** Collapse diagram to reactor image stacked above a numbered annotation list. User is OK departing from the Figma mobile layout for better responsiveness — do not force the side-by-side callout layout at small viewports, and reduce card sizes if they feel oversized.
- **Fix:** Remove 3-card grid. Re-implement as a positioned diagram layout: reactor image centered (`/images/reactor-how-it-works.png`), 4 absolutely-positioned callout blocks, thin `<hr>`/border connector lines (or SVG overlay). Mobile: image above, numbered list below.

### HIW-4: Missing dark section background panel
- **Gap:** The `#how-it-works` section has no background card — just default page background with padding
- **Figma spec:**
  - A rounded rectangle wraps the entire section (heading through "We aim to break down…" tagline + pollutant cards)
  - Background: `rgba(214, 248, 255, 0.13)` — `--cyan-light` at ~13% opacity
  - Border: `1px solid #8f8f8f`
  - Border radius: `40px`
  - Dimensions: 1180px wide, centered in 1280px canvas (50px side margins)
- **Fix:** Wrap all section content in an inner `div` with these styles; on mobile consider `border-radius: 16px` or remove border-radius entirely

### HIW-5: Missing disclaimer text
- **Gap:** Code has no disclaimer
- **Figma spec:** "*Technology under development. First prototypes expected later this year." — small text, left-aligned, below the reactor diagram (outside the pollutant card block)
- **Fix:** Add as a `<p>` in small/caption size (Manrope, steel color) below the annotated diagram, before the pollutant cards

### HIW-6: Pollutant card glass styling wrong — includes animation
- **Gap:** Current `.pollutant-card` = `background: var(--white-brand)` + `border: 1px solid var(--ice-near)` — plain white card, no glow, no animation
- **Figma spec ("Card design - glass" component, 828:352):**
  - **Card fill:** vertical linear gradient `#E8F2FF` (0%) → `#D6F8FF` (100%)` at 20% opacity
  - **Effects:** "Glass" effect layer + Drop shadow: X 0, Y 0, Blur 20, Spread 14, Color `#E8F2FF` 100%
  - **Corner radius:** `22px`
  - **Three internal blob shapes** layered inside the card, all with `mix-blend-mode: plus-lighter`:
    - **Blob A** (~263×186px, large cloud/mushroom shape): fill `#0033CC` 100%, layer opacity **70%**, `mix-blend-mode: plus-lighter`, Layer blur: Uniform **30px**
    - **Blob B** (~219×124px, flattened oval): fill `#0044FF` at **80% fill opacity**, layer opacity **80%**, `mix-blend-mode: plus-lighter`, Layer blur: Uniform **50px**
    - **Blob C** (third shape, smaller — check Figma for exact size/fill): `mix-blend-mode: plus-lighter`, similar blur treatment
  - **Animation:** Figma has two component variants — static and animated. The animated variant bobs the blobs vertically (subtle up/down float cycle). Implement as a CSS `@keyframes` looping translateY animation on the blob wrapper, no user trigger needed.
- **Implementation approach:**
  1. Update `.pollutant-card`: gradient fill, glow box-shadow (`0 0 20px 14px #e8f2ff`), border-radius 22px
  2. Add `.pollutant-card__blobs` wrapper inside each card (absolutely positioned, `pointer-events: none`, `overflow: hidden`)
  3. Three blob `div` elements using `border-radius`, correct fill colors, and `mix-blend-mode: plus-lighter` — or export the three Union SVGs from Figma
  4. CSS `@keyframes float` on the blob wrapper: `translateY(0) → translateY(-8px) → translateY(0)`, ~4s ease-in-out infinite

### HIW-7: Pollutant card body text — minor copy difference
- **Gap:** Code card 1: "Pharmaceutical residues — antibiotics, hormones, anti-depressants"
- **Figma spec:** "Pharmaceutical residues, such as antibiotics, hormones, anti-depressants"
- **Fix:** Update copy to match Figma verbatim

### HIW-8: Missing blueprint background SVG
- **Gap:** `landingpage-bluebrint-background-footer.svg` exists in `/public/svgs/` but is not referenced anywhere in `index.html` or the footer partial
- **Figma spec:** The blueprint SVG sits as a decorative background layer that starts at approximately the How It Works section and continues into / blends with the footer gradient. It provides the grid/technical drawing texture visible behind the lower half of the page.
- **Fix:** Add as an absolutely-positioned `<img>` (or inline SVG) behind the How It Works section content and footer, low opacity. Set `pointer-events: none`, `aria-hidden="true"`. Coordinate z-index with the section background panel (HIW-4) so the blueprint is below the `rgba(214,248,255,0.13)` card but above the footer gradient.

### HIW-9: Missing reactor image hover pulse effect
- **Gap:** Reactor image (`/images/reactor-how-it-works.png`) has no hover interaction
- **Figma spec:** When hovering over the reactor prototype image, the light strip in the center pulses/brightens — simulating the LED glow intensifying
- **Fix:** Position a radial gradient overlay element centered vertically on the reactor's LED strip (approximately center-height of the image). On `.hiw-diagram-image:hover` or a JS `mouseenter` event, trigger a CSS `@keyframes pulse-glow` animation: radial gradient goes from transparent → `rgba(0, 200, 255, 0.35)` → transparent, repeating 2–3 times. The overlay must be `pointer-events: none` so it doesn't block the image itself.

## FOOTER

### FOOTER-1: Footer background is flat navy — should be a multi-layer gradient
- **Gap:** Footer partial uses `bg-navy-deep` (flat `#0A1F44` background). No gradient exists.
- **Figma spec:** The footer section has a complex multi-layer linear gradient (three stacked fill layers) that transitions from the light page background into deep navy. Stops captured from Figma color picker screenshots:
  - **Layer 1 (darkening blue base):** `#1D45A8` at 5% opacity (top) stepping up through 15%, 25%, 35%, 45%, 55%, 65%, 75%, 85%, 95% opacity → `#002D9C` at 100% (bottom)
  - **Layer 2 (the key transition):** `#FAFCFF` 2% → `#748DCC` 51% → `#0033CC` 89% → `#0033CC` 97–99% → `#0A1F44` 100%
  - **Layer 3:** Near-identical stops to Layer 2 — `#FAFCFF` 2% → `#748DCC` 51% → `#0033CC` at multiples through 100%
  - **Overall effect:** Soft blue-white at the top of the footer area fading down into solid deep navy (`#0A1F44`) at the very bottom — a "sinking into deep water" transition
- **CSS approach:** Use a single `linear-gradient` approximation that captures the key visual — light `#FAFCFF` or `#E8F2FF` at top → `#0033CC` mid → `#0A1F44` at bottom — rather than replicating all 3 layers with exact opacity stops. The exact stop percentages can be tuned visually.
- **Fix:** Replace `bg-navy-deep` class on `<footer>` with a `background: linear-gradient(...)` using the values above; ensure the blueprint SVG (HIW-8) blends seamlessly into this gradient.

### FOOTER-2: Footer text content is acceptable — no gaps
- **Note:** The footer's text content (nav columns, social icons, wordmark, copyright) was reviewed against the Figma. The Figma footer shows placeholder ("VOREM IPSUM") content only — actual link labels and layout in code are the production spec and should be kept as-is.

## NEWS & DOCUMENTATION PAGE
*(Figma node 360:304 — audited 2026-05-24)*

### ND-HERO-1: Hero layout — layered photo composition, not a banner
- **Gap:** Code uses a full-width `<img src="/images/news-header.jpeg">` banner. Figma is a two-layer composition:
  - **Layer 1 (full 1280×838px):** Founders photo at 20% + 60% opacity with Figma Glass effect (Light −45°, 80%, Refraction 80, Depth 20, Frost 4). This creates a subtle frosted/blurred treatment across the whole hero — most visible on the left where the text lives.
  - **Layer 2 (752×704px, right-aligned):** Same founders photo at 100% opacity, NO glass effect — this makes the faces area visually sharp/crisp on top of the blurred base.
  - Result: left side has soft frosted glass feel (text area), right side has sharp portrait (faces).
- **Photo file:** The founders photo is the same image used on the Contact page — export from Figma or confirm filename.
- **CSS approach:** Full-width hero `position: relative`; base `<img>` at ~80% opacity with `filter: blur(2px) saturate(1.05)` as the frosted layer; second `<img>` absolutely positioned covering the right ~60% of the hero (no filter) for the sharp portrait layer.
- **Fix:** Replace the `<section class="page-hero">` banner entirely with this layered composition. Text (h1 + subheading) sits on the left in absolute/relative position on top of the frosted layer.

### ND-HERO-2: Missing subheading in hero
- **Gap:** No subheading text exists below the h1 in the coded hero.
- **Figma spec:** "Read about vāsuqi in the news and on LinkedIn or download documents and logos." — Syne SemiBold 24px, `#0a1f44`, ~382px wide, below the h1.
- **Fix:** Add `<p>` below the h1 inside the hero text block.

### ND-BG-1: Page background should be `--blue-light`, not white
- **Gap:** Code renders on default white. Figma: `background: #E8F2FF` (`--blue-light`) across the entire page.
- **Fix:** Add `background: var(--blue-light)` to `.page-news` or `body.page-news`.

### ND-BG-2: Missing `news-blueprint-background.svg` behind content
- **Gap:** The SVG `/public/svgs/news-blueprint-background.svg` exists but is not referenced in `news-documentation.html`.
- **Figma spec:** Decorative blueprint SVG sits as an absolutely-positioned background layer behind the News & Events and Documents sections (not the hero).
- **Fix:** Add as `<img src="/svgs/news-blueprint-background.svg" aria-hidden="true">` (or inline SVG), `position: absolute`, low opacity, `pointer-events: none`, `z-index: 0`. Content sections sit above it at `z-index: 1`.

### ND-SECTIONS-1: Section heading style — Syne ExtraBold 35px
- **Gap:** Code uses `<h2 class="section-heading">` — check current token size. Figma spec is Syne ExtraBold 35px, `#000000` (black, not navy-deep).
- **Fix:** Verify `--text-h2` token matches 35px ExtraBold. If not, add a `--text-section-title` token or apply an inline override. Color must be `var(--black)` / `#000000`, not `--navy-deep`.

### ND-NEWS-1: News & Events — replace placeholder text with scroll-snap carousel
- **Gap:** Coded section has static `.news-card` items. Figma spec (designer note) calls for a horizontally scrollable carousel of LinkedIn/news posts that drive traffic offsite.
- **Decision:** Build within the design system — no Figma spec exists for the carousel itself. Use glass card treatment (same as doc cards) with horizontal scroll-snap.
- **Cards (3 total):**
  1. **Source:** LinkedIn | **Headline:** "vāsuqi: first WaterTech startup in Venture Lab" | **URL:** https://www.linkedin.com/posts/vasuqi_vasuqi-first-watertech-startup-in-venture-activity-7437933204549959682-qleH | **Logo:** `/images/linkedin-logo.png`
  2. **Source:** CT Watch | **Headline:** "Startup med Aquaporin-direktør bliver del af innovationshus" | **Date:** 10 March 2026 | **URL:** https://ctwatch.dk/nyheder/vand/article19095911.ece
  3. **Source:** Bio Innovation Institute | **Headline:** "Venture Lab — vāsuqi" | **URL:** https://bii.dk/programs/venture-lab/
- **Card structure:** Source name/logo top, headline, date (if available), "Read more →" link. `target="_blank" rel="noopener noreferrer"` on all.
- **Layout:** Horizontal scroll-snap container, cards `flex-shrink-0`, `overflow-x: auto`, `scroll-snap-type: x mandatory`.

### ND-DOCS-1: Document cards — glass card wrapper with gradient fill
- **Gap:** Code has separate `.download-card` items in a 2-col grid. Figma: each section (Documents, Press & Brand) wraps its items inside a single glass card container.
- **Figma spec (glass card):**
  - Fill: linear gradient `#E8F2FF` (0%) → `#D6F8FF` (100%) at **20% opacity**
  - Corner radius: `22px`
  - Effects: Glass + Drop shadow (`0 0 20px 14px #E8F2FF`)
  - Width: ~980px, centered
- **Document thumbnails:** Only two real photos exist — use both for all four placeholders:
  - `/images/brochure.jpg` → Pitch Deck + Product Brochure
  - `/images/logokit.jpeg` → PR Document + Logo Kit
- **Card structure:** Photo thumbnail sits inside the glass card (not below it). Label in Syne SemiBold 24px `--blue-primary` sits below the thumbnail, centered.
- **Fix:** Replace `.download-card` grid with two glass card `div`s (one per section). Each card contains a 2-col thumbnail+label layout inside.

### ND-FOOTER-1: Footer gradient has visible seam with page background
- **Gap:** The `#E8F2FF` page background meets the footer gradient at a hard visible edge.
- **Figma spec (footer gradient for this page):** Linear gradient stops: `#C3D4F7` at 15% → `#748DCC` at 56% (98% opacity) → `#0033CC` at 100%.
- **Fix:** Start the footer gradient at `#E8F2FF` (or `#C3D4F7` at 0%) so it blends seamlessly with the page background. Adjust the existing `FOOTER-1` gradient implementation to account for the blue-light page backgrounds on subpages.

---

## ABOUT US PAGE
*(audited 2026-05-24 — Figma node 348:304)*

---

### ABOUT-BG-1: Page background wrong — should be blue-light
- **Gap:** `body.page-about` renders on default white
- **Figma spec:** Full page base background is `#E8F2FF` (`--blue-light`)
- **Fix:** Add `background: var(--blue-light)` to `.page-about` or `body.page-about`

### ABOUT-BG-2: "Why vāsuqi?" area missing hero gradient + drop shadow
- **Gap:** No gradient or shadow exists over the intro section
- **Figma spec:** A 832px-tall gradient div (W: 1280px) sits over the top of the page:
  - Fill: `linear-gradient(to bottom, #5C6B85 1%, #E8FAFF 56%, #FAFCFF 100%)` at **20% opacity**
  - Drop shadow: X 0, Y −2, Blur 7.7, Spread 0, Color `#0A1F44` 100%
  - Covers from the navbar to the bottom of the "Why vāsuqi?" copy
- **Fix:** Add a full-width div with this gradient and `box-shadow: 0 -2px 7.7px 0 rgba(10,31,68,1)` behind the "Why" section; `pointer-events: none`, `z-index: 0`

### ABOUT-BG-3: "The team" area should be near-white, not blue-light
- **Gap:** If ABOUT-BG-1 is applied, the entire page is blue-light — but the team section should sit on `#FAFCFF` (`--white-brand`)
- **Figma spec:** From approximately `top: 832px` down through the footer entry, the background is a solid `#FAFCFF` block (~1159px tall)
- **Fix:** Wrap the team section in a div with `background: var(--white-brand)`; or use a layered pseudo-element so the blue-light base shows in the hero area only

### ABOUT-BG-4: Missing snake/logo watermark behind "Why vāsuqi?" text
- **Gap:** No decorative background element behind the intro text
- **Figma spec:** The vāsuqi snake logo renders as a large (~616×606px) ghosted watermark (node `1296:386`, `data-name="Vector"`) centered behind the "Why vāsuqi?" heading and body text — the snake outline provides a soft circular orb glow effect
- **Fix:** Export the snake/logo SVG watermark from Figma. Position as `position: absolute`, centered horizontally, `top: ~171px`, `pointer-events: none`, `aria-hidden="true"`, `z-index: 0`, low opacity

---

### ABOUT-WHY-1: Heading color wrong
- **Gap:** Code has `text-navy-deep` on the h1
- **Figma spec:** `#0033CC` (`--blue-primary`), Syne ExtraBold (weight ~743), 55px, line-height 1.06
- **Fix:** Apply `color: var(--blue-primary)`; ensure font is Syne ExtraBold 55px (same as `--text-h1` style if already defined, else add)

### ABOUT-WHY-2: Body text — wrong font family AND wrong copy
- **Gap:** Code uses `text-body` class (Manrope 16px) with 2 paragraphs; content differs from Figma
- **Figma spec:** Syne SemiBold 24px, `#0A1F44` (navy-deep), 3 paragraphs verbatim:
  1. "The name comes from a Hindu myth. Vāsuki is the great serpent who let himself be wound around a mountain and pulled back and forth between gods and demons to churn the cosmic ocean. It took a long time. Poison came out first. The nectar of immortality came much later."
  2. "We liked that. A toxic thing, worked on for long enough, eventually turns into something you can drink."
  3. "That's more or less what our technology does. The pollutants conventional treatment gives up on, we keep going at, until the water is actually clean."
- **Fix:** Replace body copy with the 3 paragraphs above. Change font to Syne SemiBold 24px (a distinct style from the standard `brødtekst` Manrope body). Remove the "Meet the people building it." sentence that currently closes the section.

---

### ABOUT-TEAM-1: Missing "The team" heading, subheading, and intro paragraph
- **Gap:** The `#team-grid` section has no heading, subheading, or intro — jumps directly to the card grid
- **Figma spec:**
  - h2: "The team" — Syne ExtraBold 55px, `#0A1F44`, left-aligned at ~`left: 47px`
  - Subheading: "Built by operators, not observers." — Syne SemiBold 24px, `#0A1F44`
  - Intro paragraph: "Vasuqi is founder-led and built by people who understand industrial water, technology development, and what it takes to turn a deep-tech concept into engineered reality." — Syne Regular 32px, black, width ~646px
- **Note:** In the Figma layout, this text block occupies the LEFT column of the top tier, while Adarsh's card sits to the RIGHT at the same vertical level
- **Fix:** Add heading + subheading + intro paragraph inside `#team-grid`. On desktop, the text occupies the left ~50% and Adarsh's card the right ~50%.

### ABOUT-TEAM-2: Team card layout completely wrong — should be asymmetric, not a 2×2 grid
- **Gap:** Code: `grid grid-cols-1 md:grid-cols-2 gap-8` — uniform 2-column grid, all 4 cards equal
- **Figma spec:** Two-tier asymmetric layout:
  - **Top tier (desktop):** Left half = section text (ABOUT-TEAM-1); Right half = Adarsh (CEO) solo, larger card
  - **Bottom tier:** Three equal cards in a row — Jörg (CTO) / Peter (Advisor) / Angela (Chief Scientific Advisor)
- **Mobile:** Stack all 4 cards vertically in order (Adarsh → Jörg → Peter → Angela)
- **Fix:** Replace single `grid-cols-2` with a two-section layout: `grid-cols-2` top tier (text + Adarsh), then `grid-cols-3` bottom row for the three smaller cards

### ABOUT-CARD-1: Team card photo treatment — CSS animated water blob, not Figma blend layers
- **Gap:** Code: plain `<img>` with no visual treatment or animation
- **Figma spec:** Each card has:
  1. An animated "Blob" component (5 rotating bubble shapes, `blur: 50px`, ~305px) that floats behind the portrait — creates a liquid/water-in-motion effect
  2. Color-dodge/color-burn + screen blend mode layers that create a high-contrast B&W portrait treatment
- **Do NOT replicate the Figma blend-mode layers** — the rectangular `color-dodge`/`color-burn` divs produce an unwanted solid white box around each person that is an artifact of the Figma animation system, not a design intent. Edda confirmed: the background behind each card should remain the section background color throughout (no white boxes).
- **CSS approach:**
  1. **Photo:** Apply `filter: grayscale(1) contrast(1.1)` to the `<img>` to approximate the B&W portrait look
  2. **Water blob:** 3–4 absolutely-positioned divs with `border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%` (organic shape), soft fill (`--blue-soft` or `--blue-light` at low opacity), `filter: blur(30px)`, and a `@keyframes float-blob` animation that gently translates/rotates each blob on a staggered loop (4–6s, ease-in-out infinite) — creates the liquid water-in-motion feel without white-box artifacts
- **Fix:** Add `.team-card__blob` wrapper (absolutely positioned, `pointer-events: none`, `overflow: hidden`, `z-index: 0`) with 3–4 animated blob divs behind each photo. Apply grayscale filter to photos.

### ABOUT-CARD-2: Team card text styling wrong — role, name, bio
- **Gap:** Code uses generic `team-card__name`, `team-card__role`, `team-card__bio` classes with no Figma-matching type specs
- **Figma spec:**
  - **Role label** (e.g., "CEO", "CTO", "ADVISOR", "CHIEF SCIENTIFIC ADVISOR"): Syne SemiBold 24px, `#FAFCFF`, **`mix-blend-mode: difference`** — renders inverted against the photo for contrast
  - **Name** (e.g., "Adarsh Raj"): Syne Bold 40px, `#0044FF` (`--blue-primary`)
  - **Bio**: Syne Regular 24px, black
- **Fix:** Update all three to match. The role uses `mix-blend-mode: difference` so it reads on both light and dark backgrounds without a separate background.

### ABOUT-CARD-3: Bio copy wrong — replace all four
- **Gap:** Code has long marketing bios; Figma has short, direct 1-sentence bios
- **Figma spec (verbatim, with Figma typos corrected):**
  - **Adarsh Raj (CEO):** "Leads Vāsuqi at the intersection of industrial water strategy, company building, and deep-tech execution."
  - **Jörg Vogel (CTO):** "Leads technology strategy and development, translating water innovation into engineered systems."
  - **Peter Holme Jensen (Advisor):** "Leads technology strategy and development, translating water innovation into engineered systems."
  - **Angela Zhang (Chief Scientific Advisor):** "Guides the scientific direction of Vāsuqi with expertise in visible-light photocatalysis and water treatment research."
- **Note:** Figma contains typos ("depelopment", "enginered") in Jörg and Peter's bios — use the corrected spellings above in code.
- **Fix:** Replace all four `team-card__bio` paragraphs verbatim.

### ABOUT-CARD-4: LinkedIn treatment — icon badge, not text link; use Figma URLs (confirmed correct)
- **Gap:** Code: `"View on LinkedIn"` text link styled as a button; Figma: small LinkedIn icon badge (~26×26px) positioned at top-right of each card's photo area
- **Fix:** Replace text link with `<a>` wrapping a small LinkedIn SVG icon, positioned `top-right` of the card container
- **Confirmed correct URLs (use these, not the code's current slugs):**
  - Adarsh Raj: `https://www.linkedin.com/in/radiantraj/`
  - Jörg Vogel: `https://www.linkedin.com/in/jorg-vogel/`
  - Peter Holme Jensen: `https://www.linkedin.com/in/peter-holme-jensen-ba63b9/`
  - Angela Zhang: `https://www.linkedin.com/in/wenjing-angela-zhang-a8457515/`

### ABOUT-FOOTER-1: Footer gradient — same seam issue as News page (and Contact page)
- **Gap:** The `#FAFCFF` team section background meets the footer gradient at a hard edge — same pattern as ND-FOOTER-1
- **Fix:** Apply the same footer gradient fix as ND-FOOTER-1: start gradient at `#FAFCFF` or `#C3D4F7` at 0% so it blends with the near-white team section background
- **Note:** Edda confirmed the same footer gradient fix applies to the Contact page as well — the footer gradient implementation should be consistent across all subpages (News, About, Contact)

## CONTACT PAGE
*(audited 2026-05-25 — Figma node 455:861)*

---

### CONTACT-MYTH-1: Remove mythology section — belongs on About Us, not Contact
- **Gap:** `contact.html` contains a full mythology section ("vāsuqi — where the name begins") — this content does not appear in the Figma Contact frame at all
- **Decision:** Remove entirely from Contact. The mythology content belongs on About Us (ABOUT-WHY-2 captures the correct copy). The spec item FR23 is incorrect — mythology was mis-assigned to Contact.
- **Fix:** Delete the `<section id="section-mythology">` block from `contact.html` and all associated CSS (`.section-mythology`, `.mythology-body`)

### CONTACT-LAYOUT-1: Full page layout wrong — three-zone composition, not a two-column grid
- **Gap:** Code has mythology section + `.contact-layout` two-column grid. Figma is a distinct three-zone layout:
  - **Left zone (0–539px):** Founders photo panel, flush to left edge, `border-bottom-right-radius: 90px`, 838px tall
  - **Center zone (left: ~602px):** "Contact" h1 → General inquiries block → Address block → LinkedIn badge, stacked vertically
  - **Right zone (left: ~951px):** Invitation subtext at top, then form fields
- **Page background:** `#FAFCFF` (`--white-brand`) — correct already
- **Fix:** Restructure `contact.html` into this three-zone composition. On mobile: photo collapses or reduces in height; center and right zones stack vertically.

### CONTACT-PHOTO-1: Founders photo panel missing
- **Gap:** No photo panel exists in code
- **Figma spec:** Left-edge panel (`width: 539px`, `height: 838px`, `overflow: hidden`, `border-bottom-right-radius: 90px`) with the founders photo. A dark background layer is visible behind the photo at the upper-left, creating a moody diagonal split-light effect (top-left corner is near-black, transitions to the lit photo).
- **Photo file:** Same founders photo used in the News page hero — confirm filename from that implementation
- **Fix:** Absolutely-positioned photo panel at `left: 0`, `top: 0`, with dark `background-color: var(--navy-deep)` behind the `<img>` to produce the dark-corner effect when the photo doesn't fill the full panel edge

### CONTACT-HEADING-1: "Contact" h1 missing
- **Gap:** After CONTACT-MYTH-1 removal, no h1 will exist on the page
- **Figma spec:** "Contact" — Syne ExtraBold 55px (`--text-h1` token style), `#0A1F44`, top of the center info zone
- **Fix:** Add `<h1 class="contact-heading">Contact</h1>` at the top of the center zone

### CONTACT-SUBHEADING-1: Missing invitation text
- **Gap:** No invitation paragraph exists in code
- **Figma spec:** "If you are an investor, researcher, operator, or simply curious about what we are building, reach out." — Manrope Medium 16px, `#0A1F44`, positioned at top of the right (form) zone, max-width ~280px
- **Fix:** Add as `<p>` at the top of the form column

### CONTACT-INFO-STYLE-1: Info section labels use wrong font + wrong element
- **Gap:** Code uses `<h2>General Enquiries</h2>` as a heading and `.contact-enquiries__label` (Manrope 16px, steel)
- **Figma spec:** All three info labels ("General inquiries", "Adresse", "Connect with us") — Syne SemiBold 20px, `#5C6B85` (steel). These are label/caption elements, not headings.
- **Fix:** Replace `<h2>` with a `<p class="contact-info-label">` or `<span>` styled Syne SemiBold 20px, `--steel`. Content below each label stays Manrope Medium 16px, `--navy-deep`.

### CONTACT-INFO-CONTENT-1: Wrong contact details
- **Gap:** Code has placeholder `hello@vasuqi.com` / `+45 00 00 00 00`
- **Figma spec:** `ara@vasuqi.eu` / `+4553555514`
- **Fix:** Update `href` and display text for both email and phone

### CONTACT-INFO-CONTENT-2: Address section missing
- **Gap:** No address block exists in code
- **Figma spec:** "Adresse" label (Syne SemiBold 20px, steel) + "Ole Maaløes Vej 3 / 2200 Copenhagen, Denmark" (Manrope Medium 16px, navy-deep)
- **Fix:** Add address block below general inquiries section

### CONTACT-MAP-1: Google Maps embed below address
- **Gap:** No map exists
- **Spec decision (Edda):** Add a Google Maps embed directly below the address block (Ole Maaløes Vej 3, 2200 Copenhagen)
- **Fix:** Responsive `<iframe>` embed, `width: 100%`, `height: ~220px`, `loading="lazy"`, `border: none`. Wrap in a container with slight top margin.

### CONTACT-SOCIAL-1: LinkedIn treatment wrong — text links vs icon badge; wrong URL; X must be removed
- **Gap:** Code has text links "LinkedIn" + "X". Figma has a single LinkedIn icon badge (~28×27px). X/Twitter is not in Figma.
- **Edda's confirmed URL:** `https://www.linkedin.com/company/vasuqi/posts/`
- **Fix:** Replace text links with a LinkedIn SVG icon badge (~28px square) linking to the URL above. Remove X link entirely.

### CONTACT-FORM-STYLE-1: Form card wrapper must be removed
- **Gap:** Code wraps the form in a glassmorphism card (`background: --white-brand`, `border: 1px solid --ice-near`, `border-radius: 0.75rem`). Figma: no card — form fields sit directly on the page background.
- **Fix:** Remove `background`, `border`, and `border-radius` from `.contact-form`

### CONTACT-FORM-STYLE-2: Input styling wrong — needs underline-only fields
- **Gap:** Code inputs use full-border (`border: 1px solid --ice-near`), `border-radius: 0.375rem`, padding with label above
- **Figma spec:** Bottom-border only — `border-bottom: 1px solid #0A1F44`; no top/side borders; no `border-radius`; background `#FAFCFF`. Placeholder text inside (Manrope Medium 16px, `#494949` — `--steel`).
- **Fix:** Replace full-border inputs with underline-only styling. Keep `<label>` in HTML for accessibility with `.sr-only` visually hidden; use `placeholder` for the visible hint.

### CONTACT-FORM-FIELDS-1: Form field set updated — 5 rows, 2 mandatory
- **Gap:** Current code: 3 fields (Name, Email, Message). Figma has 7 (overridden by spec). New spec decision (Edda):
  - **Row 1:** Name * (required, full width)
  - **Row 2:** Email address * (required, full width)
  - **Row 3:** Company name + Job title (optional, two inputs side-by-side on one row; stack on mobile)
  - **Row 4:** Phone number (optional, full width)
  - **Row 5:** Message (optional, textarea)
- **Fix:** Update form HTML and CSS to match. Row 3 uses a two-column flex/grid row on desktop (`width: ~50%` each), single-column on mobile.

### CONTACT-SUBMIT-1: Submit button uses wrong font
- **Gap:** Code uses Manrope for the button. Label "Send message" is already preferred over Figma's "Submit".
- **Figma spec:** Syne Medium 20px, white, `#0044FF` background, `border-radius: 30px`, ~132px wide, right-aligned
- **Decision:** Keep label "Send message" (better UX copy than Figma's "Submit")
- **Fix:** Update `.contact-submit` to use `font-family: var(--font-syne)`, `font-size: 20px`, `font-weight: 500`. Ensure right-aligned on desktop.

---

## MOBILE — ALL PAGES
*(audited 2026-05-25 — Figma nodes: 1113:640 landing, 1312:4471 news & docs, 1312:4633 contact, 1334:349 about us)*

---

## MOBILE — GLOBAL: NAV

### MOB-NAV-1: Mobile navbar — hamburger icon only (no "Menu" text), logo centered, Contact pill right
- **Gap:** Current code likely scales the desktop pill nav to mobile. Figma mobile shows a distinct layout.
- **Figma spec (closed state):** `☰` icon only (three lines — no text label) on the left · vāsuqi circular logo + wordmark centered · "Contact" filled blue pill on the right — same pill nav container as desktop but with hamburger replacing the text links
- **Fix:** At mobile breakpoint, hide all nav text links. Show only: hamburger icon (`☰`, ~24px, `--blue-primary`) on the left, logo centered, Contact pill on the right.

### MOB-NAV-2: Mobile nav open state — full overlay
- **Figma spec (open state — confirmed via Edda screenshot):**
  - Full-screen dark navy overlay (approximately `--navy-deep` background)
  - `✕` close icon replaces `☰` on the left (same position in the nav bar)
  - Three navigation links in large white Syne text, left-aligned, vertically stacked:
    - "News & docs"
    - "About us"
    - "Contact us"
  - No sub-items, no icons, no dividers
- **Fix:** Implement as an absolutely/fixed-positioned overlay panel, toggled by JS on hamburger click. Animate in (fade or slide from top) following water-physics easing. Trap focus when open; close on ✕ click, overlay click, or Escape key.

---

## MOBILE — GLOBAL: SIDE NAV

### MOB-SIDENAV-1: Side nav dots — hide entirely on mobile
- **Decision:** Side navigation dots are desktop-only. On mobile:
  1. The "hover to reveal label" interaction does not exist on touch devices
  2. Six tap targets on a 402px screen overlapping content edges fails WCAG minimum touch target size
  3. PRD §Responsive Design already declares side nav as desktop-only
- **Fix:** Add `display: none` (or `visibility: hidden`) on the side nav container below the desktop breakpoint. No replacement element needed — mobile users navigate by scrolling; hamburger menu covers inter-page navigation.

---

## MOBILE — CONTACT PAGE

### MOB-CONTACT-LAYOUT-1: Mobile photo is full-width hero at top, not a left column
- **Gap:** Desktop contact has a left-column photo panel. On mobile this doesn't translate — there is no side-by-side layout.
- **Figma mobile spec:** Founders photo spans the full width of the viewport at the top of the page (~402×350px or similar), like a hero image. No border-radius treatment — full bleed.
- **Fix:** On mobile (`max-width: md`), the photo panel becomes a full-width `<img>` or background-image block at the top. The three-zone desktop layout collapses to a single column: photo → Contact h1 + subtext → form → general inquiries → address → map → LinkedIn.

### MOB-CONTACT-LAYOUT-2: Form comes before general inquiries on mobile
- **Gap:** Current code has enquiries block first in source order (for mobile accessibility), then form. Figma mobile shows form first, enquiries below.
- **Decision:** Follow Figma mobile layout — form first, general inquiries / address / LinkedIn below. The investor's primary action (fill the form) should be the first thing they see after the photo.
- **Fix:** Reorder HTML source so form section appears before enquiries block, or use CSS `order` to visually reorder at the mobile breakpoint.

---

## MOBILE — NEWS & DOCUMENTATION PAGE

### MOB-NEWS-LAYOUT-1: Make desktop layout responsive — no separate mobile design
- **Decision (Edda):** Do not implement a separate mobile layout for News & Documentation. Take the desktop design and make it responsive:
  - Hero: founders photo full-width, heading and subtext overlay or stack below
  - News & Events: same horizontal scroll-snap carousel as desktop (cards remain card-sized, user swipes)
  - Documents: same glass card wrapper treatment as desktop, cards reflow to single column
  - Press & Brand: same as Documents
- **Fix:** Apply responsive CSS to existing desktop components — no structural rebuild. Carousel stays horizontal scroll-snap at all widths; document cards stack to 1-column on mobile.

---

## MOBILE — LANDING PAGE

### MOB-LANDING-1: Section-by-section mobile audit still needed
- **Status:** Mobile landing page frame (1113:640, 402×13761px) not yet audited section by section. Known mobile-specific gaps already captured inline in desktop entries:
  - HERO-3: backed-by logos carousel on mobile
  - FLOATINGLIGHT-3: beam layout at mobile edges
  - FITS-4: vāsuqi wordmark blob dropped on mobile (pronunciation label only)
  - WVFIT-5: mobile reactor layout (vertical, icons beside)
  - WVBTC-8: blob stagger collapses to vertical stack
  - HIW-3: diagram collapses to image + numbered list
  - HIW-4: section panel border-radius reduces on mobile
- **Action:** Zoom into individual mobile landing sections during next session if additional gaps are found beyond what's listed above.

---

## Implementation plan (post-audit)
1. Convert each gap above into a story in Epic 5
2. Group by page/component for efficient implementation
3. Stories will reference this document for exact Figma values
