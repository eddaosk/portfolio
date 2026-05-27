# Story 1.3: Shared Navigation & Footer

Status: done

## Story

As a visitor,
I want a consistent pill-shaped glassmorphism navigation bar and branded footer across all four pages,
so that I can reach any site destination from wherever I am and the site feels like a single coherent product.

## Acceptance Criteria

**AC1 — Nav glassmorphism appearance:**
Given `partials/nav.html`
When rendered on any page
Then the nav bar is pill-shaped (fully rounded ends / stadium shape) with a glassmorphism background (`backdrop-filter` blur + `-webkit-backdrop-filter` blur for Safari, `--blue-primary` border, `--ice-near` background tint) and floats above page content

**AC2 — Nav content exactly:**
Given the nav bar
When inspected
Then it contains exactly: "News & Documentation" text link on the left (in `--blue-primary`), the circular water icon + "vāsuqi" wordmark centered (macron over ā, links to `index.html`), "About us" text link on the right (in `--blue-primary`), and a filled blue pill "Contact" CTA button linking to `contact.html` — no "Home" text link exists

**AC3 — Contact CTA button:**
Given the Contact CTA button in the nav
When inspected
Then it uses `--blue-primary` background and `--white-brand` text, is pill-shaped, and is the only primary CTA element on any page

**AC4 — Build-time partial inclusion:**
Given any of the 4 HTML pages
When the page loads
Then the nav partial is resolved at build time via `<!--@include "partials/nav.html"-->` — the nav HTML is present in the initial page payload (not injected by JS)

**AC5 — Footer content:**
Given `partials/footer.html`
When rendered
Then it shows About and Product navigation columns with relevant links, plus social media icons as inline SVG; the footer is consistent across all 4 pages

**AC6 — Keyboard focus rings:**
Given any interactive element in the nav (links, CTA button)
When navigated to via keyboard Tab
Then a visible focus ring in `--blue-primary` is displayed (UX-DR11)

**AC7 — Mobile usability:**
Given a viewport of 320px width
When the nav renders
Then it remains usable and does not overflow or break layout on mobile

## Tasks / Subtasks

- [x] Add `glass-blur` component class to `src/styles/main.css` (AC: 1)
  - [x] Add `-webkit-backdrop-filter: blur(12px)` and `backdrop-filter: blur(12px)` via `@layer components`
- [x] Implement `partials/nav.html` (AC: 1, 2, 3, 4, 6, 7)
  - [x] Pill-shaped fixed `<header>` + `<nav>` with glassmorphism (glass-blur class + bg-ice-near/75 + border-blue-primary)
  - [x] Left col: "News & Documentations" link in `--blue-primary`, hidden on mobile (md:inline-flex)
  - [x] Center: inline SVG water icon + "vāsuqi" wordmark linking to index.html
  - [x] Right col: "About us" text link + "Contact" filled blue pill CTA linking to contact.html
  - [x] Focus-visible rings in `--blue-primary` on all interactive elements
- [x] Implement `partials/footer.html` (AC: 4, 5)
  - [x] Blueprint material language: `--navy-deep` background, `--white-brand` / `--ice-near` text
  - [x] "About" column: About Us, News & Documentation, Contact links
  - [x] "Product" column: How It Works, Technology links (landing page anchors)
  - [x] Social media icons: LinkedIn + X as inline SVG with accessible labels
  - [x] Copyright line: Vasuqi ApS
- [x] Verify build passes and partials resolve correctly (AC: 4)
  - [x] `npm run build` produces no errors
  - [x] `dist/index.html` contains the nav HTML (partial resolved)

## Dev Notes

### Scope

**This story ONLY touches:**
- `src/styles/main.css` — add `@layer components` block for `.glass-blur`
- `partials/nav.html` — replace stub with full nav implementation
- `partials/footer.html` — replace stub with full footer implementation

**This story does NOT touch:**
- `design-tokens.css` — no new tokens added; existing tokens are sufficient
- HTML page files — the `<!--@include-->` wiring already exists from Story 1.1
- JS entry points — no JS for nav/footer; focus states use CSS only
- Active page states — handled in Story 1.4 (per-page HTML edits)

### Nav Layout Pattern

Three-column CSS grid: `grid-cols-[1fr_auto_1fr]` keeps the logo truly centered at all widths.

Left (1fr): "News & Documentations" link — hidden below `md` breakpoint (768px).
Center (auto): water icon + wordmark.
Right (1fr): "About us" + "Contact" CTA — always visible, right-aligned.

At 320px: left col is empty (link hidden), center logo + right links remain. Layout does not overflow.

### Glassmorphism Implementation

`backdrop-filter` is not in Tailwind v4 with a webkit prefix, so a component class is required:

```css
@layer components {
  .glass-blur {
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
  }
}
```

Background tint: `bg-ice-near/75` — Tailwind v4 generates `color-mix(in oklch, ...)` which requires Safari 16.2+. Supported by "last 2 major versions" of Safari (17, 18). Safari 15 fallback degrades gracefully to semi-transparent (blur still visible).

### Water Icon

Inline SVG from the prototype logo — all three paths use CSS custom property fills:
- `fill="var(--blue-soft)"` — lightest water layer
- `fill="var(--blue-mid)"` — mid water layer
- `fill="var(--blue-primary)"` — snake body (main shape)

No hex values in SVG `fill` attributes — CSS variables resolve correctly for inline SVG.

### Focus Rings

Use `focus-visible:ring-2 focus-visible:ring-blue-primary` throughout. `:focus-visible` correctly shows rings on keyboard navigation only (not on mouse click). For the Contact CTA with blue background, add `focus-visible:ring-offset-2` so the ring is visible against the button.

### Blueprint Material Language (Footer)

Blueprint = structured, technical, precise. Dark background (`--navy-deep`), light text (`--white-brand`, `--ice-near`), clean grid layout. No blur, no border glow — solid and grounded.

### Deferred Note from Story 1.1

Story 1.1 deferred work noted: "htmlPartialsPlugin: no recursive include support — single-pass replace is sufficient for current stubs; revisit in Story 1.3 if partials need sub-includes." Conclusion: nav and footer partials are self-contained; no sub-includes needed. Single-pass replace is sufficient.

### Learnings from Prior Stories

- All font family references use token names: `font-display` (Syne) and `font-body` (Manrope) — Google Fonts not yet loaded (Story 1.4), fallback `sans-serif` applies
- Tailwind utilities via `@theme`: `bg-navy-deep`, `text-white-brand`, `bg-blue-primary`, `text-blue-primary`, `border-blue-primary` all available
- `base: process.env.BASE_URL || '/'` in vite.config.js — relative paths in partials (`/index.html`, `/contact.html`) resolve correctly for both local dev and GitHub Pages

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

- `bg-ice-near/75` uses Tailwind v4 `color-mix()` for opacity — degrades gracefully in Safari 15 (blur still visible). Supported in Safari 16.2+, which covers "last 2 major versions" (17, 18).
- SVG `fill="var(--blue-primary)"` syntax works for inline SVG in HTML — CSS variables resolve correctly. Zero hex values in partials verified by grep.
- Build produces 9.67 kB per HTML page (gzip 3.34 kB) — nav + footer add minimal weight.

### Completion Notes List

- AC1 ✅ — pill-shaped fixed nav with `glass-blur` class (webkit + standard backdrop-filter) + `bg-ice-near/75` + `border-blue-primary`
- AC2 ✅ — exact content: "News & Documentations" left (md+ only), water icon + "vāsuqi" wordmark centered, "About us" right, "Contact" CTA — no "Home" link
- AC3 ✅ — Contact button: `bg-blue-primary`, `text-white-brand`, `rounded-full` — only primary CTA in the nav
- AC4 ✅ — all 4 HTML pages use `<!--@include "partials/nav.html"-->` and `<!--@include "partials/footer.html"-->` — verified in built dist/
- AC5 ✅ — footer: "About" column (About Us, News & Documentation, Contact) + "Product" column (How It Works, The Technology, The Problem) + LinkedIn + X inline SVG icons
- AC6 ✅ — `focus-visible:ring-2 focus-visible:ring-blue-primary` on all interactive elements; Contact CTA has `ring-offset-2` for blue-on-blue visibility
- AC7 ✅ — three-column CSS grid (`grid-cols-[1fr_auto_1fr]`): at 320px, left link is hidden (md:inline-flex), center logo + right links remain, no overflow
- Build ✅ — `npm run build` succeeds; 4 HTML pages + assets; nav and footer resolved in all 4 pages

### File List

- `src/styles/main.css` (MODIFIED — added `.glass-blur` component class via `@layer components`)
- `partials/nav.html` (MODIFIED — full glassmorphism pill nav implementation)
- `partials/footer.html` (MODIFIED — Blueprint two-column footer with inline SVG social icons)

### Review Findings

- [x] [Review][Patch] Remove `lang="sa"` from wordmark `<span>` in nav and footer — screen readers switch to Sanskrit engine; English voice is correct for brand name [partials/nav.html, partials/footer.html]
- [x] [Review][Patch] Footer column headers `<h2>` → `<h3>` — footer utility labels should not compete with page section headings [partials/footer.html:12,42]
- [x] [Review][Patch] Fixed nav has no scroll-padding-top or content offset — nav is `fixed` (~70px tall) with no compensating `scroll-padding-top` on `:root` or `padding-top` on body; page content will be hidden under the nav bar when Epic 2 adds real content. [src/styles/main.css]
- [x] [Review][Patch] Contrast fail — footer section headings `text-white-brand/60` yields ~3.5:1 on `bg-navy-deep`, below WCAG AA 4.5:1 for small text [partials/footer.html:12,42]
- [x] [Review][Patch] Contrast fail — copyright wordmark `text-white-brand/40` and copyright line `text-white-brand/30` are below 3:1 on `bg-navy-deep` [partials/footer.html:91,93]
- [x] [Review][Patch] Focus rings on dark footer background missing `ring-offset` — footer links have `focus-visible:ring-2 focus-visible:ring-blue-primary` but no `ring-offset-*`; ring bleeds into `bg-navy-deep` [partials/footer.html]
- [x] [Review][Patch] Nav label "News & Documentations" → should be "News & Documentation" — inconsistent with footer label and filename `/news-documentation.html` [partials/nav.html:12]
- [x] [Review][Patch] Missing newline at end of file [partials/nav.html:63, partials/footer.html:103]
- [x] [Review][Patch] `aria-label="Main navigation"` includes redundant role word; ARIA best practice: `aria-label="Main"` [partials/nav.html:3]
- [x] [Review][Defer] Footer anchor IDs `#how-it-works`, `#where-vasuqi-fits`, `#the-gap` not present in index.html — awaits Epic 2 section implementation — deferred, pre-existing
- [x] [Review][Defer] `bg-ice-near/75` degrades to fully opaque on browsers without `color-mix` support (Safari ≤15.3, Chrome <111) — documented acceptable in Dev Notes — deferred, pre-existing
- [x] [Review][Defer] Safari `backdrop-filter` stacking context risk — blur silently lost if Epic 2 ancestor has `overflow:hidden` or `transform` — deferred, pre-existing
- [x] [Review][Defer] Vite partial-rebuild CI gap — partial changes without touching parent HTML won't trigger rebuild — deferred, pre-existing
- [x] [Review][Defer] Missing skip-navigation link / `id="main-content"` on `<main>` — WCAG 2.4.1 Level A gap — deferred, pre-existing
- [x] [Review][Defer] `.glass-blur` no `@supports (backdrop-filter)` guard — shows translucent but non-blurred surface on unsupported browsers — deferred, pre-existing
- [x] [Review][Defer] Social link URLs hardcoded to `/company/vasuqi` and `/vasuqi` handles — silent 404 if accounts don't exist — deferred, pre-existing
- [x] [Review][Defer] `<header>` banner landmark collision risk — if Epic 2 adds another `<header>`, two unlabelled `banner` landmarks conflict — deferred, pre-existing

<!-- Pass 2 (patch re-review 2026-05-22) -->
- [x] [Review][Decision] AC2 spec text diverges from implementation — spec AC2 still says `"News & Documentations"` but the implementation was corrected to `"News & Documentation"` (singular, matches footer and `/news-documentation.html`); spec should be updated to reflect the fix or explicitly note the deviation — resolved: AC2 updated to singular
- [x] [Review][Defer] Fixed nav height and body padding hardcoded independently — `scroll-padding-top: 5rem` and `body { padding-top: 5rem }` are separate literals; a CSS custom property would eliminate manual sync risk if nav height changes [src/styles/main.css] — deferred, pre-existing
- [x] [Review][Defer] Footer `h3` column headers create temporary heading gap in current page shells — correct hierarchy once Epic 2 adds `h1`/`h2` content; shells have no heading above `h3` right now [partials/footer.html] — deferred, pre-existing
- [x] [Review][Defer] `scroll-padding-top` in `@layer base` — speculative Safari 15 scroll-restoration edge case with fixed-position headers; monitor as Safari usage evolves [src/styles/main.css] — deferred, pre-existing

### Change Log

- Story created from epics.md (2026-05-22) — status backlog → in-progress
- Implementation complete (2026-05-22) — status in-progress → review