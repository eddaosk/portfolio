# Story 3.1: News & Documentation Page

Status: done

## Story

As an investor,
I want to browse recent news about Vasuqi and download key documents in one place,
so that I can quickly assess traction and access the pitch deck without hunting for it.

## Acceptance Criteria

**AC1 — Page hero and heading (FR16):**
Given `news-documentation.html`
When the page loads
Then a hero image (`public/images/news-header.jpeg`) is displayed at the top with descriptive `alt` text; the page `<h1>` is "News & Documentations" rendered in Syne at the `--text-h1-size` / `--text-h1-weight` scale (already applied via `@layer base h1` rule in `main.css`)

**AC2 — News & events carousel (FR18, UX-DR18):**
Given the News & events section
When rendered
Then it displays a horizontally scrollable row of manually maintained news cards; horizontal scroll is implemented with CSS `overflow-x: auto` and `scroll-snap-type: x mandatory` on the container, `scroll-snap-align: start` on each card — no JavaScript carousel library is used

**AC3 — News card structure (FR18, UX-DR18):**
Given each news card in the carousel
When inspected
Then it shows: publication/source name, article headline, date, and an external link; the entire card is an `<a href="..." target="_blank" rel="noopener">` wrapping the card content; all clicks link off-site

**AC4 — Documents section (FR17, FR50, UX-DR17):**
Given the Documents section
When rendered
Then it displays a 2-column grid of download cards containing: Pitch Deck (thumbnail `pitch-deck-thumb.jpg`, links to `public/docs/vasuqi-pitch-deck.pdf`) and Product Brochure (thumbnail `product-brochure-thumb.jpg`, links to `public/docs/vasuqi-product-brochure.pdf`); at mobile (below `sm` 640px) the grid reflows to single-column

**AC5 — Press & Brand section (FR51, FR52, UX-DR17):**
Given the Press & Brand section
When rendered
Then it displays a 2-column grid of download cards containing: PR Document (thumbnail `pr-document-thumb.jpg`, links to `public/docs/vasuqi-pr-document.pdf`) and Logo Kit (thumbnail `logo-kit-thumb.jpg`, links to `public/docs/vasuqi-logo-kit.zip`); at mobile the grid reflows to single-column

**AC6 — Download card accessibility and behaviour (FR31, UX-DR17):**
Given all download cards
When inspected
Then each thumbnail image has descriptive `alt` text; card label text uses `--blue-primary` and `--font-manrope` at `--text-body-size`; download links include the `download` attribute for PDFs and ZIPs

**AC7 — Founder maintainability (FR46, FR47):**
Given the page structure
When the founder uses an AI agent to add a new news card or download card
Then the pattern is structurally consistent: adding a news card = inserting a card block inside the carousel container; adding a download card = inserting a card block inside the correct grid — no structural changes needed; static HTML pattern with no JS generation

**AC8 — Mobile responsiveness (FR5, UX-DR12):**
Given the page on a 320px viewport
When rendered
Then the carousel scrolls horizontally without breaking layout; download card grids stack to single-column; all interactive elements (card links) have minimum 44×44px touch targets; no horizontal overflow on the page

**AC9 — Keyboard accessibility (FR30, NFR6, NFR7, UX-DR11):**
Given all interactive elements on the page (nav links, carousel cards, download cards)
When navigated via keyboard Tab
Then each element receives focus in a logical order; visible focus rings in `--blue-primary` are displayed via `focus-visible:outline`; no interactive element is keyboard-unreachable

**AC10 — Alt text and ARIA (FR31):**
Given all images on the page (hero image, document card thumbnails)
When inspected
Then all images have descriptive `alt` text; no decorative images are missing alt or aria-hidden; news card links have `aria-label` if the visible text is insufficient

**AC11 — Scroll entrance animations:**
Given the three page sections (News & events, Documents, Press & Brand)
When each section scrolls into view
Then section headings and card grids animate in via GSAP ScrollTrigger using `WATER_EASE`, `WATER_DURATION.default`, `WATER_STAGGER` from `src/animations/constants.js`; `once: true` on each ScrollTrigger; animation init in `src/news.js`

## Tasks / Subtasks

- [x] Build the complete `news-documentation.html` page content (AC: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
  - [x] Replace the stub `<h1>News & Documentation</h1>` + comment with full page structure inside `<main id="main-content">`
  - [x] Add hero image block at top of main:
    ```html
    <section class="page-hero relative overflow-hidden" aria-label="Page header">
      <img
        src="/images/news-header.jpeg"
        alt="Vasuqi news and documentation header — industrial water treatment facility"
        class="w-full h-48 md:h-72 object-cover"
        loading="eager"
      >
    </section>
    ```
  - [x] Add `<h1>` immediately after hero (outside the section, inside main):
    ```html
    <div class="mx-auto max-w-[var(--max-content-width)] px-6 pt-12 pb-4">
      <h1 class="text-navy-deep">News &amp; Documentations</h1>
    </div>
    ```
  - [x] Build the News & events section with horizontal carousel (AC2, AC3)
  - [x] Build the Documents section with 2-column card grid (AC4)
  - [x] Build the Press & Brand section with 2-column card grid (AC5)
  - [x] Ensure all images have descriptive `alt` text (AC10)
  - [x] Ensure all card links have `target="_blank" rel="noopener"` on news cards and `download` attribute on doc cards (AC6)

- [x] Implement the news & events carousel (AC: 2, 3, 8, 9)
  - [x] Container: `<div role="region" aria-label="News and events" class="flex gap-6 overflow-x-auto scroll-smooth pb-4" style="scroll-snap-type: x mandatory;">`
  - [x] Each card: `<a href="[external-url]" target="_blank" rel="noopener" class="news-card flex-shrink-0 w-72 ..." style="scroll-snap-align: start;" aria-label="[Publication] — [Headline]">`
  - [x] Card inner structure: publication name (`--steel`, Manrope, small), headline (`--navy-deep`, Syne h3-weight), date (`--steel`, Manrope caption)
  - [x] Add at minimum 3 placeholder news cards with realistic content (founder will replace with real articles)
  - [x] Ensure cards have `min-height: 44px` and `min-width: touch-target` compliant sizes (UX-DR12)
  - [x] Add `-webkit-overflow-scrolling: touch` style (or equivalent Tailwind) for smooth iOS scroll

- [x] Implement the download card component and two grids (AC: 4, 5, 6, 7, 8)
  - [x] Download card HTML pattern (reuse exactly between Documents and Press & Brand):
    ```html
    <a
      href="/docs/vasuqi-pitch-deck.pdf"
      download
      class="download-card group block ..."
      aria-label="Download Pitch Deck PDF"
    >
      <div class="download-card__thumb overflow-hidden rounded-t-lg">
        <img
          src="/images/docs/pitch-deck-thumb.jpg"
          alt="Pitch Deck document preview"
          class="w-full object-cover"
          loading="lazy"
        >
      </div>
      <div class="download-card__label px-4 py-3">
        <span class="font-body font-medium text-blue-primary">Pitch Deck</span>
      </div>
    </a>
    ```
  - [x] Grid wrapper: `<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">`
  - [x] Create placeholder thumbnail images in `public/images/docs/` — use existing `brochure.jpg` as a placeholder source for both Documents thumbnails, `logokit.jpeg` for Press & Brand until real assets are available; document this clearly in a `<!-- TODO: replace -->` HTML comment
  - [x] Document card files stored in `public/docs/` — create placeholder empty PDFs or note: `<!-- TODO: place vasuqi-pitch-deck.pdf in public/docs/ before launch -->`

- [x] Add CSS for new components to `src/styles/main.css` `@layer components` (AC: 2, 6, 9)
  - [x] `.news-card` — Blueprint material language: `--ice-near` or `--white-brand` background, `--ice-near` border, subtle border-radius, Blueprint precision aesthetic; no generic rounded-corner drop-shadow white card (that's in the anti-list)
  - [x] `.download-card` — Blueprint + Light material language: glass-adjacent card with subtle border in `--ice-near`, `--blue-primary` hover accent on the label; hover state follows water physics (`transition: transform 0.6s var(--water-ease, ease-in-out)`)
  - [x] `.download-card:hover` or `.download-card:focus-visible` — slight lift (`transform: translateY(-2px)`) consistent with water physics; focus ring `outline: 2px solid var(--blue-primary); outline-offset: 3px`
  - [x] `.news-card:focus-visible` — focus ring `outline: 2px solid var(--blue-primary); outline-offset: 3px`
  - [x] Carousel scrollbar: `scrollbar-width: thin; scrollbar-color: var(--steel) var(--ice-near)` on carousel container (Firefox); `-webkit-scrollbar` styles for WebKit
  - [x] Add CSS block comment: `/* ── News & Documentation page (Story 3.1) ──────────────────────── */`

- [x] Wire GSAP scroll animations into `src/news.js` (AC: 11)
  - [x] Import GSAP, ScrollTrigger, and constants:
    ```js
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'
    import { WATER_DURATION, WATER_EASE, WATER_STAGGER } from './animations/constants.js'
    gsap.registerPlugin(ScrollTrigger)
    ```
  - [x] Each section `<h2>` element MUST carry the class `section-heading` — this is the CSS selector used by the GSAP targets below; without it the animation silently selects nothing
  - [x] Animate section headings and card grids on scroll with `once: true` per section (add `id:` to each ScrollTrigger matching the pattern in `scroll.js`):
    ```js
    // News & events section entrance
    gsap.from('#section-news .section-heading', { y: 30, opacity: 0, duration: WATER_DURATION.default, ease: WATER_EASE, scrollTrigger: { id: 'section-news-heading', trigger: '#section-news', start: 'top 75%', once: true } })
    gsap.from('#section-news .news-card', { y: 20, opacity: 0, duration: WATER_DURATION.default, ease: WATER_EASE, stagger: WATER_STAGGER, scrollTrigger: { id: 'section-news-cards', trigger: '#section-news', start: 'top 70%', once: true } })
    // Documents section entrance
    gsap.from('#section-docs .section-heading', { y: 30, opacity: 0, duration: WATER_DURATION.default, ease: WATER_EASE, scrollTrigger: { id: 'section-docs-heading', trigger: '#section-docs', start: 'top 75%', once: true } })
    gsap.from('#section-docs .download-card', { y: 20, opacity: 0, duration: WATER_DURATION.default, ease: WATER_EASE, stagger: WATER_STAGGER, scrollTrigger: { id: 'section-docs-cards', trigger: '#section-docs', start: 'top 70%', once: true } })
    // Press & Brand section entrance
    gsap.from('#section-press .section-heading', { y: 30, opacity: 0, duration: WATER_DURATION.default, ease: WATER_EASE, scrollTrigger: { id: 'section-press-heading', trigger: '#section-press', start: 'top 75%', once: true } })
    gsap.from('#section-press .download-card', { y: 20, opacity: 0, duration: WATER_DURATION.default, ease: WATER_EASE, stagger: WATER_STAGGER, scrollTrigger: { id: 'section-press-cards', trigger: '#section-press', start: 'top 70%', once: true } })
    ```
  - [x] Keep all animation code inside the `DOMContentLoaded` listener already in `news.js`

- [x] Create placeholder asset directories and document expected files (AC: 4, 5)
  - [x] Ensure `public/images/docs/` directory is documented as expected location (create a `.gitkeep` if not present or add placeholder images)
  - [x] Ensure `public/docs/` directory exists (already present per architecture) — confirm `vasuqi-pitch-deck.pdf` placeholder

- [x] Verify `npm run build` passes with zero errors after all changes

## Dev Notes

### CRITICAL: Blueprint Material Language for All Cards

Both the news carousel cards and the download cards use **Blueprint material language** — not generic web cards. Blueprint means: technical linework aesthetic, precision, `--ice-near` or `--white-brand` background, `--steel` secondary text, `--blue-primary` as accent only on labels/CTAs. The architecture anti-list explicitly bans: "generic card components (rounded corners + drop shadow + white background)" — this is the exact pattern to avoid. Apply Blueprint material language: subtle border in `--ice-near`, precise corners (small radius), no heavy drop shadows.

### Existing Files to READ Before Modifying

**`news-documentation.html`** (current state — stub):
- Already has correct `<head>` with SEO, Open Graph, Google Fonts, and CSS link
- Body class is `page-news` — this triggers the active nav state in `main.css` (`body.page-news nav a[href="/news-documentation.html"]`)
- Has `<!--@include "partials/nav.html"-->` and `<!--@include "partials/footer.html"-->` — do NOT change these
- `<main id="main-content">` already exists — all new content goes inside here
- Script tag `<script type="module" src="/src/news.js">` already present — do NOT duplicate

**`src/news.js`** (current state — minimal stub):
- Has an empty `DOMContentLoaded` listener — add GSAP imports and animation code inside it
- Do NOT create a second `addEventListener('DOMContentLoaded', ...)` — add inside the existing one

**`src/styles/main.css`** (current state):
- Add new CSS block for Story 3.1 components at the END of `@layer components`, after the `/* ── Side navigation (Story 2.6) */` block
- Follow the exact comment format pattern from previous stories

### Existing Assets Available

Check these existing files in `public/images/` — some can serve as thumbnails:
- `brochure.jpg` — exists, usable as `pitch-deck-thumb.jpg` and `product-brochure-thumb.jpg` placeholder
- `logokit.jpeg` — exists, usable as `logo-kit-thumb.jpg` placeholder
- `news-header.jpeg` — exists, use as the page hero image
- `public/docs/` directory exists but may be empty — place PDF placeholder files or comment clearly in HTML

For `public/images/docs/` — this directory likely does not exist yet. Copy or symlink existing images as placeholders:
- `pitch-deck-thumb.jpg` → copy from `brochure.jpg`
- `product-brochure-thumb.jpg` → copy from `brochure.jpg`
- `pr-document-thumb.jpg` → copy from `brochure.jpg`
- `logo-kit-thumb.jpg` → copy from `logokit.jpeg`

Use Bash `cp` to create the directory and copy placeholders.

### Section ID Naming

Use these section IDs consistently (kebab-case, shared-namespace rule):
- `id="section-news"` — News & events carousel section
- `id="section-docs"` — Documents download grid section
- `id="section-press"` — Press & Brand download grid section

These IDs are used by the GSAP ScrollTrigger triggers in `news.js`.

### CSS Pattern: No Raw Hex Values

The established pattern allows `rgba()` with raw values ONLY when CSS custom properties cannot be used inside `rgba()` components. For this story, use token names directly:
- Background: `var(--ice-near)`, `var(--white-brand)`, `var(--navy-deep)`
- Text: `var(--navy-deep)`, `var(--steel)`, `var(--blue-primary)`
- Borders: `var(--ice-near)`, `var(--steel)` (opacity via Tailwind `border-steel/30` if needed)

Never introduce new `--` CSS tokens not defined in `design-tokens.css`.

### GSAP Import Pattern (Established in Previous Stories)

```js
import { gsap } from 'gsap'                         // NOT 'gsap/dist/'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WATER_DURATION, WATER_EASE, WATER_STAGGER } from './animations/constants.js'
gsap.registerPlugin(ScrollTrigger)
```

This is the exact pattern from `src/animations/scroll.js` — replicate verbatim.

### GSAP ScrollTrigger: `once: true` is Mandatory

Every ScrollTrigger instance on this page MUST use `once: true`. This is the project-wide default. Animations play on scroll-into-view and do not reverse. See `src/animations/scroll.js` for working examples.

### `--water-ease` CSS Custom Property

The CSS `var(--water-ease, ease-in-out)` pattern is used in `.product-viz` in `main.css` — `--water-ease` is NOT defined in `design-tokens.css` (this is a known deferred item). Use the fallback form `var(--water-ease, ease-in-out)` for any CSS transitions in this story to be consistent with the established pattern.

### Download Card: `download` Attribute

The `download` attribute on `<a>` tags instructs the browser to download the linked file rather than navigate to it. Use it on PDF and ZIP links:
```html
<a href="/docs/vasuqi-pitch-deck.pdf" download aria-label="Download Pitch Deck PDF">
```
For external URLs (news cards), do NOT use `download` — those link externally.

### News Carousel: Placeholder Content

Add 3–4 placeholder news cards with realistic structure so the founder can see the pattern clearly:
```html
<!-- TODO: Replace with real news articles. Add new cards by copying this block. -->
<a href="https://example.com" target="_blank" rel="noopener"
   class="news-card ..."
   aria-label="LinkedIn — Vasuqi closes pre-seed round — 1 May 2026">
  <p class="news-card__source">LinkedIn</p>
  <p class="news-card__headline">Vasuqi closes pre-seed round with BII backing</p>
  <time class="news-card__date" datetime="2026-05-01">1 May 2026</time>
</a>
```

### `public/docs/` Directory

The architecture specifies files in `public/docs/`:
- `vasuqi-pitch-deck.pdf`
- `vasuqi-product-brochure.pdf`
- `vasuqi-pr-document.pdf`
- `vasuqi-logo-kit.zip`

These files are the founder's real assets and may not exist yet. Use placeholder approach:
1. Create the `public/docs/` directory (already exists per `ls` output)
2. Check what's actually in it — if empty, add an HTML comment in the download card: `<!-- Download link: /docs/vasuqi-pitch-deck.pdf — place PDF in public/docs/ before launch -->`
3. The `href` attribute should still point to the correct path even if the file doesn't exist yet — the browser will show a 404 gracefully

### Tailwind Active Nav State Already Handled

The `page-news` body class triggers this rule already in `main.css`:
```css
.page-news nav a[href="/news-documentation.html"] {
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}
```
The active nav state for the News page is already working — do NOT add any additional active state logic.

### Skip-to-Content Link Already Handled

The skip-to-content link was added to `partials/nav.html` in Story 2.6. The `<main id="main-content">` target already exists in `news-documentation.html`. This AC is already met — verify it works on the News page too.

### Mobile: Carousel Horizontal Scroll

CSS `overflow-x: auto` makes the carousel scrollable horizontally on mobile. The Tailwind class `scrollbar-thin` (or raw CSS) can style the scrollbar. On iOS, add `-webkit-overflow-scrolling: touch` (or `overflow-y: auto` with Safari-compatible scroll behaviour). The carousel must NOT overflow the page horizontally — contain it with a wrapper that has `overflow: hidden` on the outer section, with the inner carousel element having `overflow-x: auto`.

### What Must NOT Break

- `npm run build` passes with zero errors
- All 4 HTML pages resolve via `npm run dev`
- `partials/nav.html` and `partials/footer.html` — do NOT modify
- `index.html`, `about.html`, `contact.html` — do NOT modify
- `src/main.js` — do NOT modify
- `src/styles/main.css` existing rules — only append, never overwrite existing blocks
- `design-tokens.css` — do NOT modify
- Active nav state for `page-news` already works — do NOT change the CSS selector

### Do NOT Implement in This Story

- Story 3.2 (About Us) or Story 3.3 (Contact) work
- `prefers-reduced-motion` guards — deliberate project-wide decision; animations run unconditionally
- JavaScript-driven carousel (no swipe JS, no carousel library — CSS scroll only)
- Server-side rendering, dynamic data fetching, or CMS integration — static HTML only
- Any new CSS `--` custom property tokens not in `design-tokens.css`

### Build Verification Checklist

After implementation:
1. `npm run build` — zero errors, all 4 pages bundle correctly
2. `npm run dev` — open `news-documentation.html`
3. Page hero image visible at top ✓
4. `<h1>News & Documentations</h1>` renders in Syne heading style ✓
5. News carousel scrolls horizontally on mobile (320px) ✓
6. Carousel cards show publication, headline, date ✓
7. Each carousel card opens external link in new tab ✓
8. Documents grid shows 2 cards at `sm`+, 1 column at 320px ✓
9. Press & Brand grid same behaviour ✓
10. Download card links include `download` attribute on PDF/ZIP ✓
11. Tab through page — all cards receive visible focus rings in `--blue-primary` ✓
12. All images have descriptive `alt` text ✓
13. GSAP scroll animations fire for each section (check console for errors) ✓
14. Active nav state — "News & Documentations" nav link is bold + underlined ✓

### References

- FR16 (News & Docs page), FR17 (Pitch Deck), FR18 (carousel), FR19 (Documents + Press & Brand), FR46 (founder adds news cards), FR47 (founder adds doc cards), FR50 (Product Brochure), FR51 (PR Document), FR52 (Logo Kit)
- NFR6 (keyboard operability), NFR7 (focus states), NFR13 (responsive 320px+)
- UX-DR12 (44×44px touch targets), UX-DR14 (lazy loading), UX-DR17 (download card), UX-DR18 (news carousel)
- Architecture: kebab-case naming, Blueprint material language for cards, `once: true` ScrollTrigger, GSAP import from `'gsap'` not `'gsap/dist/'`, no new CSS tokens
- Design tokens: `design-tokens.css` — all token names; `src/animations/constants.js` — `WATER_DURATION`, `WATER_EASE`, `WATER_STAGGER`
- Previous story patterns: `src/animations/scroll.js` (ScrollTrigger pattern), `src/styles/main.css` (CSS block structure and comment format)
- Memory: Blueprint material language anti-patterns; carousel is pure CSS (no JS library)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None

### Completion Notes List

- Built complete `news-documentation.html` with hero section, h1, and three content sections (News & events, Documents, Press & Brand).
- News carousel uses pure-CSS `scroll-snap-type: x mandatory` / `scroll-snap-align: start` — no JS carousel library. 4 placeholder cards with realistic content included. Outer section clips overflow; inner div scrolls.
- Download cards use consistent pattern across both grids (Documents + Press & Brand). `download` attribute on all PDF/ZIP hrefs. `target="_blank" rel="noopener"` on all news card external links.
- Placeholder thumbnails created in `public/images/docs/` by copying existing assets (`brochure.jpg` × 3, `logokit.jpeg` × 1). All `<!-- TODO: replace -->` comments added inline.
- CSS added to `@layer components` in `main.css` after `/* ── Side navigation (Story 2.6) */` block. Blueprint material language: `--white-brand` background, `--ice-near` border, `border-radius: 0.25rem` (news-card) / `0.5rem` (download-card), no drop shadows. Water physics hover transition `0.6s var(--water-ease, ease-in-out)`. Firefox and WebKit scrollbar styling on `.news-carousel`.
- `src/news.js` fully implemented: GSAP + ScrollTrigger imports, 6 animation calls (heading + cards per section), all with `once: true`. All inside the existing `DOMContentLoaded` listener.
- `npm run build` passes with zero errors. All 4 pages bundle correctly. ScrollTrigger bundled (112.90 kB gzip: 44.40 kB).
- All 11 ACs satisfied. All tasks checked.

### File List

- `news-documentation.html` (modified)
- `src/news.js` (modified)
- `src/styles/main.css` (modified)
- `public/images/docs/pitch-deck-thumb.jpg` (created)
- `public/images/docs/product-brochure-thumb.jpg` (created)
- `public/images/docs/pr-document-thumb.jpg` (created)
- `public/images/docs/logo-kit-thumb.jpg` (created)

### Review Findings

- [x] [Review][Patch] `logo-kit-thumb.jpg` was 33.9 MB (copied from `logokit.jpeg` ZIP archive image) — replaced with `brochure.jpg` copy (178 KB) [`public/images/docs/logo-kit-thumb.jpg`] — fixed
- [x] [Review][Patch] External news card links used `rel="noopener"` without `noreferrer` — all 4 links updated to `rel="noopener noreferrer"` [`news-documentation.html:54,67,80,93`] — fixed
- [x] [Review][Patch] `scroll-snap-align: start` was inline style on each card rather than a CSS class rule — moved to `.news-card { scroll-snap-align: start; }` in `main.css`; inline attributes removed from HTML [`src/styles/main.css`, `news-documentation.html`] — fixed
- [x] [Review][Patch] CSS comment on `.news-carousel` said "Firefox scrollbar styling" but the block also sets `scroll-snap-type` and `-webkit-overflow-scrolling` — comment updated to accurate description [`src/styles/main.css:409`] — fixed
- [x] [Review][Defer] `.news-card__*` BEM sub-elements (`__source`, `__headline`, `__date`) have no CSS rules — rely on inline `style=""` + utility classes; functional but inconsistent with CSS component approach; defer to future polish [`news-documentation.html`] — deferred, pre-existing pattern choice
- [x] [Review][Defer] No null-guard before `gsap.from()` calls in `news.js` — consistent with pre-existing project pattern in other animation files; defer [`src/news.js`] — deferred, pre-existing

### Change Log

- 2026-05-24: Story 3.1 implemented — News & Documentation page built with hero, CSS carousel, two download grids, Blueprint material language card components, GSAP ScrollTrigger scroll animations, and placeholder thumbnail assets.
- 2026-05-24: Code review complete — 4 patches applied (logo-kit-thumb size, rel=noopener+noreferrer, scroll-snap-align moved to CSS, CSS comment fix); 2 items deferred.
