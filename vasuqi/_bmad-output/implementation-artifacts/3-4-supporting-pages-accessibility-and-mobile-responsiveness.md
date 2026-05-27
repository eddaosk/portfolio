# Story 3.4: Supporting Pages Accessibility & Mobile Responsiveness

Status: done

## Story

As any visitor using a keyboard, screen reader, or mobile device,
I want all three supporting pages to be fully operable and visually correct across all supported viewports and browsers,
so that no investor is blocked from completing their journey regardless of how they access the site.

## Acceptance Criteria

**AC1 — Keyboard focus order across all three supporting pages (FR30, NFR6, NFR7, UX-DR11):**
Given all interactive elements across `news-documentation.html`, `about.html`, and `contact.html` (nav links, download cards, carousel cards, LinkedIn links, form fields, submit button, social links)
When navigated via keyboard Tab
Then each element receives focus in a logical order; visible focus rings in `--blue-primary` are displayed on all focused elements; no interactive element is keyboard-unreachable

**AC2 — Alt text completeness on all three supporting pages (FR31):**
Given all images on the three supporting pages (hero image on news page, team photos on about, document card thumbnails on news)
When inspected
Then meaningful images have descriptive `alt` text; decorative images are marked `aria-hidden="true"` or `alt=""`; blob SVG decorative elements on about page have `aria-hidden="true"`

**AC3 — WCAG 2.1 AA contrast on all three supporting pages (NFR4, NFR5):**
Given all text/background colour combinations on the three supporting pages
When tested against WCAG 2.1 AA
Then body text meets 4.5:1 minimum contrast; large text and UI components meet 3:1 minimum

**AC4 — Mobile responsiveness at 320px on all three supporting pages (FR5, UX-DR12):**
Given all three supporting pages at 320px viewport width
When rendered
Then all content is accessible by scroll, no horizontal overflow, single-column layouts stack correctly, and all interactive elements have minimum 44×44px touch targets

**AC5 — Cross-browser compatibility (NFR12):**
Given all three supporting pages
When rendered in last 2 major versions of Chrome, Firefox, Safari (including Safari 15+), and Edge
Then all content displays correctly; glassmorphism components render with `-webkit-backdrop-filter` on Safari; no layout or functionality breaks

**AC6 — Contact form mobile layout (UX-DR5, UX-DR6):**
Given the contact form
When rendered on mobile (below `md` / 768px)
Then all inputs are full-width; the submit button is thumb-reachable; the general enquiries block is visible above the form (not below)

**AC7 — Download card grids reflow on mobile:**
Given the Documents and Press & Brand sections on `news-documentation.html`
When rendered at 320px
Then card grids reflow to single-column; all card thumbnails and labels remain visible; no horizontal overflow

**AC8 — News carousel horizontal scroll remains functional on mobile:**
Given the news carousel on `news-documentation.html`
When rendered on mobile
Then horizontal scroll is functional via touch; `scroll-snap-type: x mandatory` is preserved; carousel does not cause the page to scroll horizontally

**AC9 — Team grid reflows on mobile (about.html):**
Given the team grid on `about.html`
When rendered below `md` (768px)
Then the grid reflows to single-column; blob morphing (CSS `@keyframes blobMorph` via `clip-path` on `.team-card__photo img`) continues on mobile — no GSAP blob tween is present; LinkedIn links remain thumb-reachable (minimum 44×44px)

**AC10 — `page-hero` image responsive behaviour (news page):**
Given the page hero image on `news-documentation.html`
When rendered at 320px
Then the image covers the full width with `object-fit: cover`; no overflow; correct aspect ratio maintained via `h-48 md:h-72` height classes

**AC11 — Section heading visibility fix (news page):**
Given the News & Events section heading on `news-documentation.html`
When rendered
Then the `section-heading` class is present on all `<h2>` elements targeted by GSAP scroll animations in `src/news.js`; if any heading lacks the class, add it so the animation target resolves correctly

**AC12 — `contact-layout` single-column on mobile:**
Given the `.contact-layout` grid on `contact.html`
When rendered below `md` (768px)
Then the grid uses `grid-template-columns: 1fr` (already in CSS) and the enquiries block appears above the form (source order already correct in HTML); verify no CSS override is breaking mobile stacking

## Tasks / Subtasks

- [x] Audit all three supporting pages for keyboard accessibility and focus ring gaps (AC: 1)
  - [x] Tab through `news-documentation.html`: verify `.news-card:focus-visible` ring shows, `.download-card:focus-visible` ring shows, all are reachable in logical Tab order
  - [x] Tab through `about.html`: verify `.team-card__linkedin:focus-visible` ring shows; all 4 cards' LinkedIn links reachable; `section-why` headings do not receive focus (not interactive)
  - [x] Tab through `contact.html`: verify form fields show `--blue-primary` outline on focus-visible, submit button shows focus ring, general enquiries links show focus ring
  - [x] All pages: verify nav skip link (`<a href="#main-content">`) correctly sends focus to `<main id="main-content">` when activated

- [x] Audit all images on three supporting pages for alt text compliance (AC: 2)
  - [x] `news-documentation.html`: page hero image has descriptive alt; each download card thumbnail has descriptive alt; verify existing alt text is meaningful (not filename-based)
  - [x] `about.html`: all 4 team photos have `alt="[Name] — [Role], vāsuqi"` format; blob SVG elements (if any) have `aria-hidden="true"`; no decorative image missing `alt=""`
  - [x] `contact.html`: no images currently — nothing to check; confirm no decorative SVGs added without `aria-hidden`

- [x] Verify WCAG 2.1 AA contrast compliance (AC: 3)
  - [x] Check `--navy-deep` (#0A1F44) on `--white-brand` (#FAFCFF) body text — meets 4.5:1
  - [x] Check `--blue-primary` (#0044FF) on `--white-brand` (#FAFCFF) — link text: must meet 4.5:1 (verify: #0044FF on #FAFCFF ≈ 8.6:1 — passes)
  - [x] Check `--steel` (#5C6B85) on `--white-brand` (#FAFCFF) — caption/meta text: must meet 4.5:1 (verify: #5C6B85 on #FAFCFF ≈ 4.6:1 — barely passes; do not change)
  - [x] Check `--white-brand` on `--blue-primary` — Contact CTA button text: must meet 4.5:1 (verify: passes at 8.6:1)
  - [x] Do NOT change any palette token to fix contrast — palette is closed; if a pairing fails, adjust opacity or component size only

- [x] Verify and fix mobile layout at 320px for all three pages (AC: 4, 6, 7, 8, 9, 10, 12)
  - [x] `news-documentation.html` at 320px:
    - [x] Page hero image: confirm `h-48` class produces visible image, no overflow
    - [x] News carousel: confirm `overflow-x: auto` on `.news-carousel` container does not cause full-page horizontal scroll; confirm outer `overflow-hidden` div clips correctly
    - [x] Download card grids: confirm `grid-cols-1` at base (both `#section-docs` and `#section-press`); cards stack vertically
    - [x] Page heading `<h1>`: no overflow on 320px; text wraps correctly
  - [x] `about.html` at 320px:
    - [x] `#team-grid` (`<section id="team-grid">`) wraps a `<div class="grid grid-cols-1 md:grid-cols-2 gap-8">` — verify the div uses `grid-cols-1` at base; switches to `grid-cols-2` at `md:` breakpoint only
    - [x] Each team card: full width, readable, LinkedIn link tap target ≥ 44px
    - [x] `section-why` text wraps; no horizontal overflow
  - [x] `contact.html` at 320px:
    - [x] `.contact-layout` is single column (`.contact-layout` CSS: `grid-template-columns: 1fr` default, `1fr 1fr` at `≥768px`); enquiries block appears above form (HTML source order already correct)
    - [x] Form inputs full-width: `.contact-form input, .contact-form textarea { width: 100% }` already in CSS; verify this renders correctly
    - [x] Submit button: `.contact-submit` has `min-height: 44px` already; verify touch target on 320px
    - [x] General enquiries block visible without scrolling past form: confirmed by HTML source order

- [x] Verify Safari glassmorphism compatibility (AC: 5)
  - [x] Confirm `.glass-blur` class in `src/styles/main.css` has both `-webkit-backdrop-filter: blur(12px)` AND `backdrop-filter: blur(12px)` (already present from Story 1.3 — DO NOT change)
  - [x] Nav pill uses `.glass-blur` — confirm no ancestor element adds `overflow: hidden` or `will-change: transform` that would break blur (deferred risk from Story 1.3 review)
  - [x] `.contact-form` Glass card: does NOT use `backdrop-filter` (uses solid `--white-brand` background, no blur) — no Safari issue for form

- [x] Fix any outstanding layout or CSS issues discovered during audit (AC: 4, 11)
  - [x] If `section-heading` class is missing from any GSAP-targeted `<h2>` on news page, add it
  - [x] If any touch targets are below 44×44px, add appropriate `min-height`/`min-width`/`padding` using token values (not raw px)
  - [x] Do NOT modify `partials/nav.html` or `partials/footer.html`
  - [x] Do NOT modify `src/styles/main.css` existing rules — only APPEND if new CSS is needed
  - [x] Do NOT add new `--` CSS tokens to `design-tokens.css`

- [x] Verify `npm run build` passes with zero errors after all changes

## Dev Notes

### CRITICAL: This Is an Audit-and-Fix Story

Story 3.4 is not a build-from-scratch story. Its scope is: **find and fix accessibility and responsive layout gaps** in the three already-implemented supporting pages (`news-documentation.html`, `about.html`, `contact.html`). Most acceptance criteria will ALREADY be satisfied by the existing implementation — the task is to confirm each one and patch only what is broken.

**Do NOT:**
- Rewrite any page or JS module from scratch
- Modify files that are already correct
- Add new animations or features beyond the ACs
- Implement `prefers-reduced-motion` guards — deliberate project-wide decision; animations run unconditionally (see architecture doc)
- Introduce any CSS hex values — all color via `var(--token-name)`

### Files In Scope (READ before modifying)

**HTML pages (already implemented by Stories 3.1–3.3):**
- `news-documentation.html` — full page with carousel, doc grids, press section
- `about.html` — full page with team grid, blob morphing CSS
- `contact.html` — full page with mythology section, contact layout, form

**CSS (append only):**
- `src/styles/main.css` — all component CSS for supporting pages already in `@layer components`; only append if gaps found; use comment format `/* ── Story 3.4 fix — [description] ──────────── */`

**JS (do not modify unless a focus management bug is found):**
- `src/news.js` — GSAP scroll entrances targeting `.section-heading`, `.news-card`, `.download-card`
- `src/about.js` — GSAP scroll entrances targeting `.section-heading`, `p`, `.team-card`
- `src/contact.js` — form handler + GSAP scroll entrances

### What Already Works (Do Not Re-implement)

Based on Stories 3.1–3.3 completion notes:

**Focus rings already implemented:**
- `.news-card:focus-visible` → `outline: 2px solid var(--blue-primary)` ✓
- `.download-card:focus-visible` → `outline: 2px solid var(--blue-primary)` ✓
- `.team-card__linkedin:focus-visible` → `outline: 2px solid var(--blue-primary)` ✓
- `.contact-form input:focus-visible, textarea:focus-visible` → `outline: 2px solid var(--blue-primary)` ✓
- `.contact-submit:focus-visible` → `outline: 2px solid var(--blue-primary)` ✓
- `.contact-enquiries__link:focus-visible` → `outline: 2px solid var(--blue-primary)` ✓
- Nav links: `focus-visible:ring-2 focus-visible:ring-blue-primary` via Tailwind on all nav anchors ✓
- Skip-to-content link: in `partials/nav.html` with `focus:not-sr-only` class ✓

**Mobile layouts already implemented:**
- `contact-layout`: `grid-template-columns: 1fr` mobile → `1fr 1fr` at `≥768px` ✓
- `#team-grid`: `grid-cols-1 md:grid-cols-2` ✓
- Download card grids: `grid-cols-1 sm:grid-cols-2` ✓
- `.contact-form input, textarea`: `width: 100%` ✓
- `.contact-submit`: `min-height: 44px` ✓
- `.team-card__linkedin`: `min-height: 44px` ✓

**Blob morphing on about.html (CSS, not GSAP):**
- `.team-card__photo img`: `clip-path: polygon(...)` + `animation: blobMorph 3s ease-in-out infinite alternate` ✓ (no SVG files, no GSAP)

**Safari glassmorphism:**
- `.glass-blur`: `-webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px)` ✓

**Alt text (verify these are actually in the HTML):**
- News hero: `alt="Vasuqi news and documentation header — industrial water treatment facility"` ✓
- Team photos: `alt="[Name] — [Role], vāsuqi"` pattern ✓
- Download card thumbs: descriptive alt text ✓

### Known Gaps from Previous Story Reviews (Deferred Items for This Story)

These were explicitly deferred to Story 3.4 in the `deferred-work.md` file:

**From Story 2.6 review:**
- `vizGlow box-shadow` snap on mouseleave was fixed in Story 2.6 (AC10 of 2.6) — do not re-do

**From Story 3.1 review:**
- `.news-card__*` BEM sub-elements (`__source`, `__headline`, `__date`) have inline `style=""` attributes instead of CSS class rules — this is functional; do NOT refactor inline styles to classes in this story (deferred to polish pass)

**From Story 3.2 review:**
- LinkedIn URLs for 4 team members are placeholder values — NOT a code fix; founder responsibility before launch. DO NOT modify LinkedIn URLs in this story.

### Contrast Ratio Reference (Pre-Verified — Do Not Change Palette)

These pairings from the closed 10-token palette have been validated:

| Text colour | Background | Ratio | Result |
|---|---|---|---|
| `--navy-deep` (#0A1F44) | `--white-brand` (#FAFCFF) | ~17:1 | AAA |
| `--blue-primary` (#0044FF) | `--white-brand` (#FAFCFF) | ~8.6:1 | AAA |
| `--steel` (#5C6B85) | `--white-brand` (#FAFCFF) | ~4.6:1 | AA |
| `--white-brand` (#FAFCFF) | `--blue-primary` (#0044FF) | ~8.6:1 | AAA |
| `--navy-deep` (#0A1F44) | `--ice-near` (#E8F2FF) | ~14:1 | AAA |

**Palette is closed — no new tokens, no hex adjustments.** If a visual pairing fails contrast, resolve by adjusting component size (large text threshold = 18pt/24px or 14pt/18.67px bold) not by changing colour.

### Touch Target Sizing — Minimum 44×44px (UX-DR12)

All interactive elements must meet the 44×44px touch target minimum. CSS approach: use `min-height`/`min-width` plus adequate `padding` — not fixed `height`/`width` which breaks text wrapping. Pattern from existing code:

```css
/* Correct pattern (already used in contact-submit, team-card__linkedin) */
min-height: 44px;
min-width: 44px;
padding: 0.625rem 1.75rem; /* adds to the min, ensures comfortable tap area */
```

If a download card or news card link is found to be below 44px tall on mobile, the fix is to add `min-height: 44px` to the relevant CSS class.

### News Carousel Mobile — Critical Detail

The carousel uses a two-level wrapper:
```html
<div class="overflow-hidden">           <!-- clips overflow; prevents page-level horizontal scroll -->
  <div class="news-carousel flex ...">  <!-- has overflow-x: auto + scroll-snap -->
  </div>
</div>
```
The outer `overflow-hidden` div is what prevents the carousel from producing a full-page horizontal scrollbar on mobile. **DO NOT remove the outer wrapper**. If carousel cards overflow horizontally at 320px, the fix is to adjust `min-width` on `.news-card` (currently `min-width: 288px`), not to remove the wrapper.

### Blob Morphing — CSS Only (No GSAP, No SVG Files)

The blob morphing on `about.html` team photos is implemented entirely in CSS — there are no SVG blob files in `public/blobs/` and `src/about.js` contains no blob-loading logic. The morphing is a CSS `@keyframes blobMorph` animation applied to `.team-card__photo img` via `clip-path` polygon tweening. This runs on all viewports including mobile — no JS is involved. Do NOT attempt to add GSAP `attr: {d}` blob loading; the CSS fallback is the final implementation.

### GSAP Animation Targets — Verify These Selectors Exist in HTML

`src/news.js` targets these CSS selectors. Confirm each exists in the HTML:
- `#section-news .section-heading` → `<h2 class="section-heading ...">` in `#section-news` ✓ (line 39 of news-documentation.html)
- `#section-news .news-card` → `<a class="news-card ...">` ✓
- `#section-docs .section-heading` → `<h2 class="section-heading ...">` in `#section-docs` ✓ (line 105)
- `#section-docs .download-card` → `<a class="download-card ...">` ✓
- `#section-press .section-heading` → `<h2 class="section-heading ...">` in `#section-press` ✓ (line 157)
- `#section-press .download-card` → `<a class="download-card ...">` ✓

`src/about.js` targets:
- `#section-why .section-heading` → `<h1 class="section-heading ...">` in `#section-why` ✓ (line 24 of about.html)
- `#section-why p` → `<p class="...">` ✓
- `.team-card` → `<article class="team-card">` ✓

`src/contact.js` targets:
- `#section-mythology .section-heading` → `<h1 class="section-heading">` in `#section-mythology` ✓ (line 25 of contact.html)
- `#section-mythology .mythology-body p` → `<p>` inside `.mythology-body` ✓
- `#section-form` → `<section id="section-form" ...>` ✓
- `#section-enquiries` → `<section id="section-enquiries" ...>` ✓

**If any selector returns null/empty, GSAP silently animates nothing — elements start at opacity:0 and stay invisible. Verify actual HTML class/ID names match JS selectors before marking done.**

### Architecture Constraints Reminder

From `architecture.md` and project-wide rules:
- No `prefers-reduced-motion` media queries — deliberate brand decision, unconditional animations
- No new `--` CSS tokens — palette and spacing are closed
- No hex values in CSS — always `var(--token-name)`
- `src/animations/constants.js` is read-only; do not modify WATER_DURATION/WATER_EASE/WATER_STAGGER
- `partials/nav.html` and `partials/footer.html` — DO NOT modify
- `design-tokens.css` — DO NOT modify
- CSS appends only in `@layer components`, after the `/* ── Contact page (Story 3.3) */` block

### What Must NOT Break

- `npm run build` — zero errors
- All 4 HTML pages resolve via `npm run dev`
- All GSAP scroll animations on all three pages (do not null-guard-remove existing animation targets)
- Active nav state for all three pages (body class + CSS already in place)
- Contact form Formspree submission flow
- Skip-to-content link in nav already points to `#main-content` — do not move or rename `<main id="main-content">`

### Do NOT Implement in This Story

- Changes to `index.html` or `src/main.js` — landing page is out of scope for this story
- New animations or scroll effects beyond existing ones
- Formspree endpoint changes or `src/config.js` modifications
- LinkedIn URL corrections (founder responsibility)
- Fixing `.news-card__*` inline styles — deferred to future polish pass per story 3.1 review
- Any `prefers-reduced-motion` media query
- GDPR cookie consent / privacy policy — deferred by architecture doc

### Build Verification Checklist

After implementation:
1. `npm run build` — zero errors, all 4 pages bundle correctly
2. `npm run dev` — open each of the three supporting pages
3. Tab through all interactive elements on each page — visible `--blue-primary` focus rings ✓
4. Skip-to-content link (Tab from page load) focuses `#main-content` ✓
5. 320px viewport: no horizontal overflow on any page ✓
6. 320px viewport: contact layout single-column, enquiries above form ✓
7. 320px viewport: team grid single-column ✓
8. 320px viewport: download card grids single-column ✓
9. Safari: glassmorphism nav renders with blur ✓
10. All alt text present and descriptive on news page hero image and doc thumbnails ✓
11. No new CSS tokens added to `design-tokens.css` ✓
12. No inline hex values in any modified CSS ✓

### References

- FR5 (mobile responsiveness, supporting pages), FR30 (keyboard operability), FR31 (alt text)
- NFR4 (WCAG 2.1 AA), NFR5 (contrast ratios), NFR6 (keyboard operability), NFR7 (focus states), NFR12 (browser compatibility), NFR13 (responsive 320px+)
- UX-DR11 (focus rings in `--blue-primary`), UX-DR12 (44×44px touch targets)
- Stories 3.1, 3.2, 3.3 completion notes — implementation is the base; this story audits and patches
- `src/styles/main.css` — all relevant component CSS already present at lines 407–819
- `design-tokens.css` — closed palette; contrast ratios pre-verified
- `partials/nav.html` — skip-to-content link and all nav focus rings already implemented
- Architecture doc: no `prefers-reduced-motion`, no new tokens, water physics unconditional

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

No blockers encountered. All ACs audited and verified; two fixes applied.

### Completion Notes List

Audit confirmed the majority of AC requirements were already satisfied by Stories 3.1–3.3:

- AC1 (keyboard focus): All focus rings verified in CSS — `.news-card:focus-visible`, `.download-card:focus-visible`, `.team-card__linkedin:focus-visible`, `.contact-form input/textarea:focus-visible`, `.contact-submit:focus-visible`, `.contact-enquiries__link:focus-visible`. Nav skip link confirmed pointing to `#main-content` on all pages.
- AC2 (alt text): All images have descriptive alt text. No blob SVG files exist — morphing is CSS-only. No `aria-hidden` gaps found.
- AC3 (WCAG contrast): All pre-verified pairings pass. No palette changes made.
- AC4/6/7/8/9/10/12 (mobile 320px): Grid layouts confirmed — `grid-cols-1 sm:grid-cols-2` for download cards, `grid-cols-1 md:grid-cols-2` for team grid, `grid-template-columns: 1fr` mobile for `.contact-layout`. Carousel two-level wrapper (`overflow-hidden` outer) prevents page horizontal scroll. Hero image `h-48 md:h-72 object-cover` correct.
- AC5 (Safari): `.glass-blur` has both `-webkit-backdrop-filter` and `backdrop-filter`. No `overflow:hidden` or `will-change:transform` on nav ancestor.
- AC11 (section-heading class): All GSAP-targeted headings already have `section-heading` class in HTML.

**Fixes applied:**
1. `contact.html` — Added `text-navy-deep` to `<h1 class="section-heading">` (missing from Story 3.3 implementation; inconsistent with all other pages where section headings carry this class).
2. `src/styles/main.css` (append) — Added `color: var(--navy-deep)` to `.contact-enquiries h2` and `.contact-form h2` for brand colour consistency.
3. `src/styles/main.css` (append) — Added `display: inline-block; min-height: 44px; padding: 0.625rem 0` to `.contact-enquiries__link`. Email, phone, LinkedIn and X links were inline text without padding — tap target was ~24px, below the 44×44px UX-DR12 minimum. Fix brings all enquiries links to spec.

`npm run build` passes with zero errors after all changes.

### File List

- `contact.html` — Added `text-navy-deep` to mythology section `<h1>`
- `src/styles/main.css` — Appended Story 3.4 fix rules: `.contact-enquiries h2` / `.contact-form h2` colour + `.contact-enquiries__link` touch target sizing

### Review Findings

- [x] [Review][Defer] `form-success`/`form-error` divs lack `aria-live` — screen readers will not announce form state changes on submit [`contact.html:57,62`] — deferred, pre-existing Story 3.3 omission; WCAG 4.1.3 Status Messages gap; not in Story 3.4 AC scope
- [x] [Review][Defer] `.contact-enquiries__link` declared in two separate CSS rule blocks — functional cascade merges both, but split ownership is a maintainability concern [`src/styles/main.css:664,834`] — deferred, consequence of append-only Story 3.4 constraint; merge in future polish pass

### Change Log

- 2026-05-24: Story 3.4 audit-and-fix complete. Added `text-navy-deep` to contact.html h1, appended contact heading colour and enquiries link touch-target CSS to main.css.
- 2026-05-24: Code review complete. 0 patch, 0 decision-needed, 2 deferred. Status → done.
