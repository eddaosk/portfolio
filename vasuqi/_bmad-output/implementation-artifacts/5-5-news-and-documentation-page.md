# Story 5.5: News & Documentation Page Fidelity

Status: done

## Story

As a journalist or investor on the News & Documentation page,
I want the hero to present a layered founder photo with a frosted glass treatment, news articles in a scroll-snap carousel, and document cards wrapped in glass containers — all on a blue-light background,
so that the page reads as a polished press and media resource consistent with the brand.

## Acceptance Criteria

**AC1 — Hero is a layered frosted photo composition, not a banner (ND-HERO-1):**
Given the `news-documentation.html` hero section
When rendered
Then the section is replaced with a two-layer composition:
- Layer 1: founders photo at ~80% opacity with `filter: blur(2px) saturate(1.05)` covering the full hero width
- Layer 2: same founders photo at 100% opacity (no filter), absolutely positioned covering the right ~60% of the hero
The h1 and subheading text sit on the left, above the frosted layer
The previous full-width `<img>` banner is removed

**AC2 — Hero subheading added (ND-HERO-2):**
Given the news page hero
When rendered
Then a `<p>` subheading reads: "Read about vāsuqi in the news and on LinkedIn or download documents and logos." — Syne SemiBold 24px, `#0a1f44`, below the h1

**AC3 — Page background is blue-light (ND-BG-1):**
Given `news-documentation.html`
When rendered
Then `background: var(--ice-near)` (`#E8F2FF`) is applied to `body.page-news` in `src/styles/main.css` — the token `--ice-near` is the correct name for `#E8F2FF` in `design-tokens.css`; there is no `--blue-light` token and one must NOT be created

**AC4 — Blueprint SVG sits behind content sections (ND-BG-2):**
Given `news-documentation.html`
When rendered
Then `/public/svgs/news-blueprint-background.svg` is absolutely positioned as a background layer behind the News & Events and Documents sections (not the hero), `aria-hidden="true"`, `pointer-events: none`, `z-index: 0`; content sections are at `z-index: 1`

**AC5 — Section headings use correct style (ND-SECTIONS-1):**
Given section headings on `news-documentation.html`
When rendered
Then headings use Syne ExtraBold 35px, color `#000000` (black — not `--navy-deep`)
The current `--text-h2` token is 24px (Syne SemiBold) — it does NOT match 35px ExtraBold. Add a new token to `design-tokens.css`:
```
--text-section-title-size:   2.1875rem;  /* 35px */
--text-section-title-weight: 800;
```
Then add a utility class in `src/styles/main.css`:
```
.section-title-nd {
  font-family: var(--font-syne);
  font-size: var(--text-section-title-size);
  font-weight: var(--text-section-title-weight);
  color: #000000;
}
```
Apply `.section-title-nd` to the h2 elements on `news-documentation.html` only — do NOT change the global `h2` rule or `--text-h2` token as it is used elsewhere

**AC6 — News & Events is a scroll-snap carousel with 3 real cards (ND-NEWS-1):**
Given the News & Events section
When rendered
Then a horizontal scroll-snap carousel (`overflow-x: auto`, `scroll-snap-type: x mandatory`) contains exactly 3 cards (replacing the current 4 placeholder cards):
1. LinkedIn card: source "LinkedIn", headline "vāsuqi: first WaterTech startup in Venture Lab", LinkedIn logo `/images/linkedin-logo.png`, link `https://www.linkedin.com/posts/vasuqi_vasuqi-first-watertech-startup-in-venture-activity-7437933204549959682-qleH`, `target="_blank" rel="noopener noreferrer"`
2. CT Watch card: source "CT Watch", headline "Startup med Aquaporin-direktør bliver del af innovationshus", date "10 March 2026", link `https://ctwatch.dk/nyheder/vand/article19095911.ece`, `target="_blank" rel="noopener noreferrer"`
3. BII card: source "Bio Innovation Institute", headline "Venture Lab — vāsuqi", link `https://bii.dk/programs/venture-lab/`, `target="_blank" rel="noopener noreferrer"`
Each card: `flex-shrink: 0`, `scroll-snap-align: start`, glass card treatment (see AC7); "Read more →" link at bottom
NOTE: the existing CSS in `src/styles/main.css` at the `.news-carousel` block already sets `scroll-snap-type: x mandatory` — do not duplicate this in HTML. The `.news-card` CSS already sets `scroll-snap-align: start` and `flex-shrink: 0`. Only the HTML content and glass card styling need to change.

**AC7 — News cards use glass card treatment (ND-NEWS-1):**
Given each news card in the carousel
When rendered
Then each card has the glass card style: `background: linear-gradient(to bottom, rgba(232,242,255,0.20) 0%, rgba(214,248,255,0.20) 100%)`, `border-radius: 22px`, `box-shadow: 0 0 20px 14px #e8f2ff`

**AC8 — Document sections wrapped in glass card containers (ND-DOCS-1):**
Given the Documents and Press & Brand sections
When rendered
Then each section's items are wrapped in a single glass card container: `background: linear-gradient(to bottom, rgba(232,242,255,0.20) 0%, rgba(214,248,255,0.20) 100%)`, `border-radius: 22px`, `box-shadow: 0 0 20px 14px #e8f2ff`, width ~980px centered
Inside each glass card, items are in a 2-column layout: photo thumbnail left, label right (Syne SemiBold 24px, `--blue-primary`)
Thumbnails — use these exact paths (files confirmed to exist in the filesystem):
- `/images/brochure.jpg` for Pitch Deck and Product Brochure
- `/images/logokit.jpeg` for PR Document and Logo Kit
The current HTML uses `/images/docs/pitch-deck-thumb.jpg` etc. — those files do NOT exist; replace all four `<img src="/images/docs/...">` references with the two confirmed files above
The existing `.download-card` CSS blocks must be replaced or supplemented with the new glass card container CSS — do not attempt to shoehorn the new design into the old `.download-card` structure

**AC9 — Desktop layout is made responsive — no separate mobile rebuild (MOB-NEWS-LAYOUT-1):**
Given `news-documentation.html` at mobile viewport widths
When rendered
Then: the hero founders photo is full-width with heading and subtext overlaid or stacked below; the news carousel remains a horizontal scroll-snap container at all widths (cards remain card-sized, user swipes); document glass cards reflow to a single-column layout on mobile; no structural rebuild is required — responsive CSS on existing desktop components is sufficient

**AC10 — Footer gradient blends with blue-light page background (ND-FOOTER-1):**
Given the `<footer>` on `news-documentation.html`
When rendered
Then the footer gradient starts at `#E8F2FF` or `#C3D4F7` at 0% — no hard visible seam between the page background and footer top; gradient continues through `#748DCC` 56% → `#0033CC` 100%
IMPORTANT: The footer partial (`partials/footer.html`) uses an inline `style` attribute — `style="background: linear-gradient(to bottom, var(--white-brand) 0%, #748DCC 40%, var(--blue-deep) 75%, var(--navy-deep) 100%)"`. This inline style overrides any class-level CSS. The correct approach is to add a page-specific CSS override in `src/styles/main.css`:
```css
body.page-news footer {
  background: linear-gradient(to bottom, #E8F2FF 0%, #C3D4F7 15%, #748DCC 56%, #0033CC 89%, #0A1F44 100%) !important;
}
```
Do NOT modify `partials/footer.html` as it is shared across all pages.

## Tasks / Subtasks

- [x] Rebuild hero as layered photo composition (AC: 1)
  - [x] Wrap hero in `position: relative` container with defined height
  - [x] Layer 1: `<img class="hero-photo-base">` covering full width, `opacity: 0.80`, `filter: blur(2px) saturate(1.05)`
  - [x] Layer 2: `<img class="hero-photo-sharp">` `position: absolute`, right-aligned, covering right ~60%, `width: 60%`, `object-fit: cover`, no filter
  - [x] Text block (`<h1>` + subheading): `position: absolute`, left column, above both photo layers
  - [x] Confirm founders photo filename from the Contact page implementation (same file)

- [x] Add hero subheading (AC: 2)
  - [x] Add `<p>` below h1: "Read about vāsuqi in the news and on LinkedIn or download documents and logos." styled Syne SemiBold 24px, `#0a1f44` (`--navy-deep`)

- [x] Add blue-light page background (AC: 3)
  - [x] Add `background: var(--ice-near)` to `body.page-news` rule in `src/styles/main.css` (use `--ice-near`, NOT `--blue-light` — `--blue-light` does not exist as a token)

- [x] Add blueprint SVG background (AC: 4)
  - [x] Add `<img src="/svgs/news-blueprint-background.svg" aria-hidden="true" class="news-blueprint-bg">` before the news content sections
  - [x] CSS: `position: absolute`, behind News & Events and Documents sections, `z-index: 0`, `opacity: 0.12` (or similar), `pointer-events: none`, `width: 100%`

- [x] Add section heading style token (AC: 5)
  - [x] `--text-h2` is confirmed as 24px Syne SemiBold — it does NOT match the 35px ExtraBold spec
  - [x] Add to `design-tokens.css`: `--text-section-title-size: 2.1875rem` and `--text-section-title-weight: 800`
  - [x] Add `.section-title-nd` utility class in `src/styles/main.css` with font-family Syne, the new size/weight, color `#000000`
  - [x] Apply `.section-title-nd` to h2 elements on `news-documentation.html` only — do NOT change global h2 styles

- [x] Update news carousel content with 3 real cards (AC: 6, 7)
  - [x] The carousel container structure (`div.news-carousel` with CSS scroll-snap) already exists — do NOT rebuild it; only replace the card HTML content
  - [x] Remove all 4 existing placeholder `<a class="news-card">` elements
  - [x] Add 3 new `.news-card` items:
    - Card 1: `<img src="/images/linkedin-logo.png">` source logo, headline "vāsuqi: first WaterTech startup in Venture Lab", href `https://www.linkedin.com/posts/vasuqi_vasuqi-first-watertech-startup-in-venture-activity-7437933204549959682-qleH`
    - Card 2: source text "CT Watch", headline "Startup med Aquaporin-direktør bliver del af innovationshus", date "10 March 2026", href `https://ctwatch.dk/nyheder/vand/article19095911.ece`
    - Card 3: source text "Bio Innovation Institute", headline "Venture Lab — vāsuqi", href `https://bii.dk/programs/venture-lab/`
  - [x] All cards: `target="_blank" rel="noopener noreferrer"`, "Read more →" link at bottom
  - [x] Update `.news-card` CSS to glass card styles: gradient background `linear-gradient(to bottom, rgba(232,242,255,0.20) 0%, rgba(214,248,255,0.20) 100%)`, `border-radius: 22px`, `box-shadow: 0 0 20px 14px #e8f2ff` — replace the current `background-color: var(--white-brand); border: 1px solid var(--ice-near)` styling

- [x] Wrap document items in glass card containers (AC: 8)
  - [x] Replace the two `div.grid` elements (in Documents and Press & Brand sections) with two glass card `div` containers
  - [x] Inside each glass card: 2-column grid/flex with thumbnail on left, label on right
  - [x] Use CONFIRMED thumbnail paths (files exist at these locations):
    - `/images/brochure.jpg` — for Pitch Deck AND Product Brochure
    - `/images/logokit.jpeg` — for PR Document AND Logo Kit
  - [x] The current `src/images/docs/` thumbnail references (pitch-deck-thumb.jpg, etc.) do NOT exist — replace all four `<img src="/images/docs/...">` references
  - [x] Labels: Syne SemiBold 24px, `var(--blue-primary)`
  - [x] Glass card CSS: `background: linear-gradient(to bottom, rgba(232,242,255,0.20) 0%, rgba(214,248,255,0.20) 100%)`, `border-radius: 22px`, `box-shadow: 0 0 20px 14px #e8f2ff`, `max-width: 980px`, `margin: 0 auto`

- [x] Make layout responsive (AC: 9)
  - [x] Hero: on mobile, hero photo is full-width; heading and subtext either overlay it or stack below — whichever requires less restructuring given the layered photo implementation
  - [x] News carousel: already scroll-snap; verify cards are usably sized at 320px (min-width ~280px per card); no changes to carousel structure needed
  - [x] Document glass cards: add responsive column collapse — `grid-cols-1` on mobile (currently 2-col); `width: 100%` on glass card containers

- [x] Fix footer gradient seam (AC: 10)
  - [x] The footer partial (`partials/footer.html`) has an inline `style` attribute — any class-level CSS is overridden by it
  - [x] Add `!important` override in `src/styles/main.css`:
    ```css
    body.page-news footer {
      background: linear-gradient(to bottom, #E8F2FF 0%, #C3D4F7 15%, #748DCC 56%, #0033CC 89%, #0A1F44 100%) !important;
    }
    ```
  - [x] Do NOT modify `partials/footer.html` — it is shared across all pages

### Review Findings

- [x] [Review][Patch] Nested `<a>` inside `<a>` on all 3 news cards — invalid HTML5 interactive content model [news-documentation.html:85,107,128] — fixed: inner `<a>` replaced with `<span aria-hidden="true">`
- [x] [Review][Patch] `intro.js` line 16 missing 2-space indentation on `if (sessionStorage...)` guard [src/animations/intro.js:16] — fixed: indentation restored
- [x] [Review][Defer] h1 text reads "News & Documentations" (plural) — pre-existing typo carried over from old markup; `<title>` is correct (singular); not introduced by this story [news-documentation.html:41] — deferred, pre-existing

## Dev Notes

- The founders photo: the confirmed filename is `/images/contact-header.jpeg` — this is the only candidate in `public/images/` that matches (the Figma founders photo). Do not invent other filenames. Story 5.7 will use the same file for the Contact page photo panel.
- Scroll-snap carousel: add `::-webkit-scrollbar { display: none }` on the carousel container for a cleaner look on macOS. Keep keyboard-navigable by ensuring cards are focusable or wrapping each in an `<a>`.
- Glass card gradient at 20% opacity: `linear-gradient(to bottom, rgba(232,242,255,0.20) 0%, rgba(214,248,255,0.20) 100%)` — the alpha is part of the rgba function, not a separate opacity property. This preserves the glass transparency without affecting child element opacity.
- The LinkedIn post URL, CT Watch URL, and BII URL are captured in the gap audit — use those exact URLs. All external links must have `target="_blank" rel="noopener noreferrer"`.
- CT Watch URL in the audit references an article that may have a paywall — link to it regardless; the page will render and the user can decide to access it.

### Current HTML State (what exists before your changes)

The current `news-documentation.html` has:
- A simple `<section class="page-hero">` with a single `<img src="/images/news-header.jpeg">` banner — replace entirely with layered photo composition
- A standalone `<div class="mx-auto max-w-...">` with the `<h1>` outside the hero — keep and update
- Four placeholder `<a class="news-card">` elements with fake data — remove all four, replace with 3 real cards
- Two `<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">` containers for docs — replace with glass card containers
- `<img src="/images/docs/pitch-deck-thumb.jpg">` etc. — files DO NOT EXIST, replace with `brochure.jpg` / `logokit.jpeg`
- No blueprint SVG, no page-background color, no hero subheading

### Project Structure Notes

- Page: `news-documentation.html`
- Page-specific JS: `src/news.js`
- Styles: `src/styles/main.css`
- Blueprint SVG: `public/svgs/news-blueprint-background.svg` (exists, unused)
- Document thumbnails: `public/images/brochure.jpg`, `public/images/logokit.jpeg`
- LinkedIn logo: `public/images/linkedin-logo.png`

### References

- Gap audit codes: ND-HERO-1, ND-HERO-2, ND-BG-1, ND-BG-2, ND-SECTIONS-1, ND-NEWS-1, ND-DOCS-1, ND-FOOTER-1, MOB-NEWS-LAYOUT-1
- Source: `_bmad-output/planning-artifacts/epic5-gap-audit.md`

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

No blocking issues encountered. All image files confirmed to exist before HTML was written.

### Completion Notes List

- AC1: Hero rebuilt as `.nd-hero` with two stacked `<img>` elements — base at 80% opacity + blur/saturate, sharp right-60% absolutely positioned. Uses `/images/contact-header.jpeg` (confirmed existing file).
- AC2: `.nd-hero__subheading` paragraph added below h1, Syne SemiBold 24px, `--navy-deep` color.
- AC3: `body.page-news { background: var(--ice-near) }` added to `src/styles/main.css`.
- AC4: `<img class="news-blueprint-bg">` inserted inside `.nd-content-sections` wrapper with `z-index: 0`, `opacity: 0.12`, `pointer-events: none`, `aria-hidden="true"`.
- AC5: `--text-section-title-size: 2.1875rem` and `--text-section-title-weight: 800` added to `design-tokens.css`. `.section-title-nd` utility class added to CSS. Applied to all 3 `<h2>` on news page only.
- AC6/7: All 4 placeholder cards removed. 3 real cards added with correct URLs, headlines, sources, dates. `.news-card` CSS updated to glass gradient + 22px radius + box-shadow.
- AC8: Two `div.grid` blocks replaced with `.nd-glass-card` containers each holding `.nd-doc-grid` (2-col). Confirmed `brochure.jpg` / `logokit.jpeg` used. Broken `/images/docs/` paths removed.
- AC9: Mobile `@media (max-width: 47.9375rem)` overrides added: hero stacks (base photo full-width, sharp layer hidden), `.nd-doc-grid` collapses to 1-col, `.nd-glass-card` goes full-width, news cards min-width 280px.
- AC10: `body.page-news footer { background: ... !important }` added — overrides inline style on footer partial without modifying the shared partial.

### File List

- `news-documentation.html` — full rebuild: layered hero, 3 real news cards, glass doc containers, blueprint SVG
- `src/styles/main.css` — new CSS: page-news background, nd-hero, nd-glass-card, nd-doc-item, section-title-nd, news-blueprint-bg, footer override, mobile overrides; news-card updated to glass style
- `design-tokens.css` — added `--text-section-title-size` and `--text-section-title-weight`

## Change Log

- 2026-05-27: Full implementation of Story 5.5 — rebuilt news-documentation.html with layered hero, 3 real news cards (glass style), blueprint SVG background, glass document containers, section-title-nd tokens, ice-near page background, footer gradient fix, and full mobile responsiveness. Status: review.
- 2026-05-27: Code review complete. 2 patches applied (nested anchors → spans in news cards; intro.js indentation). 1 deferred (pre-existing h1 typo "Documentations"). Status: done.
