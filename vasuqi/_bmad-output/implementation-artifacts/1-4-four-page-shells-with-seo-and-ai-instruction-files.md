# Story 1.4: Four-Page Shells with SEO & AI Instruction Files

Status: done

## Story

As a search engine crawler and site visitor,
I want all four pages to have correct semantic structure, unique metadata, and Open Graph tags — and as the founder, I want AI instruction files pre-loaded so any AI coding tool I use already has project context,
so that the site is discoverable, renders correctly across platforms, and the AI-assisted workflow is set up from day one.

## Acceptance Criteria

**AC1 — Unique SEO metadata and Open Graph tags per page:**
Given each of the 4 HTML pages (`index.html`, `news-documentation.html`, `about.html`, `contact.html`)
When the page `<head>` is inspected
Then each has a unique `<title>` tag, a unique `<meta name="description">`, and Open Graph tags (`og:title`, `og:description`, `og:image`) specific to that page (FR33, FR34)

**AC2 — Content available without JavaScript:**
Given each HTML page
When rendered with JavaScript disabled
Then all primary content (headings, navigation, footer) is present in the HTML — no critical content depends on JS execution (FR35)

**AC3 — Semantic structure: landmarks + single h1 + heading hierarchy:**
Given each HTML page
When reviewed for semantic structure
Then it contains `<nav>`, `<main>`, `<footer>` landmark elements (resolved via partials); exactly one `<h1>` per page; heading hierarchy descends logically (`h1` → `h2` → `h3`)

**AC4 — JS entry points, CSS link, and Google Fonts in `<head>`:**
Given each HTML page
When reviewed for JS wiring
Then a per-page JS entry point is referenced (`src/main.js`, `src/news.js`, `src/about.js`, `src/contact.js`) and `src/styles/main.css` is linked in `<head>`; Google Fonts (`Syne` variable weight + `Manrope`) are loaded via `<link rel="preconnect">` + `<link>` in `<head>`

**AC5 — Static active nav state per page:**
Given each of the 4 HTML pages
When the nav partial is included
Then the nav link corresponding to the current page is visually distinguished from the others; this is set statically per page via a class on `<body>`, not via JavaScript (UX-DR3)

**AC6 — `src/config.js` exports `FORMSPREE_ENDPOINT`:**
Given `src/config.js`
When reviewed
Then it exports `FORMSPREE_ENDPOINT` as a named constant with a clearly labelled placeholder value; no other file contains a hardcoded Formspree URL

**AC7 — AI instruction files present and correct:**
Given `CLAUDE.md` at project root
When reviewed
Then it instructs Claude Code to: (1) read `docs/design-manual.md` in full before any task, (2) reference `design-tokens.css` for all colour/spacing/type values, and (3) apply the North Star Rule; identical intent is present in `.cursorrules` and `.github/copilot-instructions.md` in tool-appropriate format

**AC8 — HTTPS automatic via GitHub Pages:**
Given the GitHub Actions workflow (`.github/workflows/deploy.yml`)
When the deployment runs
Then the site is served over HTTPS automatically — no additional configuration required (NFR9)

## Tasks / Subtasks

- [x] Add Google Fonts `<link>` tags to all 4 HTML pages (AC: 4)
  - [x] Add `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` in each `<head>`
  - [x] Add combined Fonts link with variable Syne and Manrope
  - [x] **CRITICAL**: Use `Syne:wght@300..900` (variable range) — NOT `Syne:wght@400;600` — to support `--text-h1-weight: 743` from design-tokens.css

- [x] Add unique SEO metadata to all 4 HTML pages (AC: 1)
  - [x] Unique `<title>` per page (see Dev Notes for exact values)
  - [x] Unique `<meta name="description">` per page
  - [x] Open Graph tags per page: `og:title`, `og:description`, `og:image`, `og:type`, `og:url`

- [x] Add semantic structure to all 4 HTML pages (AC: 2, 3)
  - [x] Add `id="main-content"` to `<main>` on each page (fixes deferred WCAG 2.4.1 gap from Story 1.3 review)
  - [x] Add one `<h1>` per page inside `<main>` (see Dev Notes for approach per page)

- [x] Implement static active nav state (AC: 5)
  - [x] Add `class="page-home"`, `class="page-news"`, `class="page-about"`, `class="page-contact"` to `<body>` in the respective HTML files
  - [x] Add CSS rules in `src/styles/main.css` `@layer components` block targeting the active nav link for each page class

- [x] Create `CLAUDE.md` at project root (AC: 7)
  - [x] Use exact content specified in Dev Notes (from architecture.md)

- [x] Create `.cursorrules` at project root (AC: 7)
  - [x] Same intent as `CLAUDE.md` in Cursor ruleset format

- [x] Create `.github/copilot-instructions.md` (AC: 7)
  - [x] Same intent as `CLAUDE.md` in Copilot markdown format

- [x] Verify `src/config.js` and `deploy.yml` (AC: 6, 8)
  - [x] Confirm `src/config.js` exports `FORMSPREE_ENDPOINT` with placeholder — already correct, no edit needed
  - [x] Confirm `.github/workflows/deploy.yml` exists — already correct, no edit needed

## Review Findings

### Patch (Actionable)

- [x] [Review][Patch] OG image path hardcoded without existence check [index.html:13, about.html:13, contact.html:13, news-documentation.html:13]
  - All 4 pages use `/images/vasuqilogo.png` in og:image meta pointing to logo in public/images
  - **Fixed:** Updated to `/images/vasuqilogo.png` for all social previews

- [x] [Review][Patch] og:url pointing to wrong domain [index.html:9, about.html:9, contact.html:9, news-documentation.html:9]
  - Site domain is eddaosk.dk/vasuqi, not vasuqi.com
  - **Fixed:** Updated og:url to `https://eddaosk.dk/vasuqi/`, `https://eddaosk.dk/vasuqi/about.html`, etc.

- [x] [Review][Patch] Footer link contrast ratio marginal [partials/footer.html, lines 15–53]
  - Footer links were `text-ice-near` (#E8F2FF) on `bg-navy-deep` (#0A1F44) = ~4.2:1 contrast
  - WCAG AA requires 4.5:1 for normal text
  - **Fixed:** Changed all footer link colors from `text-ice-near` to `text-white-brand` (~7:1 contrast) ✓

### Deferred (Pre-existing, not caused by this change)

- [x] [Review][Defer] Syne weight 743 in design tokens vs. Google Fonts variable range — resolved: `Syne:wght@300..900` supports weight 743 ✓, pre-existing token system (Story 1.2)
- [x] [Review][Defer] Manrope weight 200 unavailable in Google Fonts — pre-existing token/font loading issue (Story 1.2), captions will use Manrope 400 fallback until caption CSS rules added (Epic 2)
- [x] [Review][Defer] Fixed nav scroll-padding hides headings near viewport top — architectural limitation; will be addressed when section content added (Epic 2)
- [x] [Review][Defer] Missing base heading styles (h1, h2, h3 CSS rules) — Epic 2 scope, intentional deferral for page-shell phase
- [x] [Review][Defer] No SEO canonical links — best practice for multi-version content; can be added in Epic 2

## Dev Notes

### Scope — What This Story Touches

**MODIFY:**
- `index.html` — add `<head>` metadata, Google Fonts, `id="main-content"` on `<main>`, `<h1>`, `<body class="page-home">`
- `news-documentation.html` — same pattern + active link CSS class
- `about.html` — same pattern + active link CSS class
- `contact.html` — same pattern + active link CSS class
- `src/styles/main.css` — add active nav state CSS rules in `@layer components`

**CREATE:**
- `CLAUDE.md` (project root)
- `.cursorrules` (project root)
- `.github/copilot-instructions.md`

**DO NOT TOUCH:**
- `partials/nav.html` — shared partial, active state is driven by body class + CSS, not nav markup
- `partials/footer.html` — no changes needed
- `design-tokens.css` — no new tokens
- `vite.config.js` — already wires all 4 HTML entry points correctly
- Any JS entry points — no JS logic in this story
- `src/config.js` — already correct, verify only
- `.github/workflows/deploy.yml` — already correct, verify only

**DO NOT ADD:**
- Real page content (hero, sections, team grid, form, etc.) — that is Epic 2 and Epic 3 scope
- Any new CSS custom property tokens
- Any JS functionality

### Current State of HTML Pages

All 4 pages currently have this structure (from Story 1.1):
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>vasuqi</title>                          ← generic, needs unique title
  <link rel="stylesheet" href="/src/styles/main.css">
                                                  ← missing: Google Fonts, meta description, OG tags
</head>
<body>                                            ← missing: page-class for active nav state
  <!--@include "partials/nav.html"-->
  <main>                                          ← missing: id="main-content", h1
    <!-- [page] content — implemented in Epic 2/3 -->
  </main>
  <!--@include "partials/footer.html"-->
  <script type="module" src="/src/[page].js"></script>
</body>
</html>
```

### SEO Metadata — Exact Values Per Page

**index.html:**
```html
<title>vāsuqi — Water, Polished with Light</title>
<meta name="description" content="A photocatalytic water treatment system that eliminates the final toxicity barrier — without chemistry, without compromise.">
<meta property="og:title" content="vāsuqi — Water, Polished with Light">
<meta property="og:description" content="A photocatalytic water treatment system that eliminates the final toxicity barrier — without chemistry, without compromise.">
<meta property="og:image" content="/images/og-image.jpg">
<meta property="og:type" content="website">
<meta property="og:url" content="https://vasuqi.com/">
```

**news-documentation.html:**
```html
<title>News &amp; Documentation | vāsuqi</title>
<meta name="description" content="Latest news, press coverage, and downloadable documents from vāsuqi.">
<meta property="og:title" content="News &amp; Documentation | vāsuqi">
<meta property="og:description" content="Latest news, press coverage, and downloadable documents from vāsuqi.">
<meta property="og:image" content="/images/og-image.jpg">
<meta property="og:type" content="website">
<meta property="og:url" content="https://vasuqi.com/news-documentation.html">
```

**about.html:**
```html
<title>About Us | vāsuqi</title>
<meta name="description" content="Meet the founding team behind vāsuqi — engineers, scientists, and advisors committed to solving water toxicity.">
<meta property="og:title" content="About Us | vāsuqi">
<meta property="og:description" content="Meet the founding team behind vāsuqi — engineers, scientists, and advisors committed to solving water toxicity.">
<meta property="og:image" content="/images/og-image.jpg">
<meta property="og:type" content="website">
<meta property="og:url" content="https://vasuqi.com/about.html">
```

**contact.html:**
```html
<title>Contact | vāsuqi</title>
<meta name="description" content="Contact the vāsuqi team for investor inquiries, partnership opportunities, and general enquiries.">
<meta property="og:title" content="Contact | vāsuqi">
<meta property="og:description" content="Contact the vāsuqi team for investor inquiries, partnership opportunities, and general enquiries.">
<meta property="og:image" content="/images/og-image.jpg">
<meta property="og:type" content="website">
<meta property="og:url" content="https://vasuqi.com/contact.html">
```

**OG image note:** `/images/og-image.jpg` is a placeholder path. The founder will supply the actual file. The path must be present in HTML now — the missing file causes no build error (it will 404 only if crawled before the image exists).

### Google Fonts — CRITICAL Syne Variable Warning

**Correct pattern for all 4 pages:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Syne:wght@300..900&display=swap" rel="stylesheet">
```

**Why `Syne:wght@300..900` (not specific weights):**
`design-tokens.css` declares `--font-syne: 'Syne Variable'` and `--text-h1-weight: 743`. The weight 743 is only available on the variable font axis. If you load `Syne:wght@400;600;700` (static weights), the browser resolves `font-weight: 743` to `700` silently — the design intent is lost. The `..` range syntax (`300..900`) tells Google Fonts to serve the variable weight file. This was flagged as a critical risk in the deferred-work log from Story 1.2.

**Fonts to load:**
- `Syne:wght@300..900` — display/heading font (variable, supports 743 weight axis)
- `Manrope:wght@400;500;600` — body text (static weights 400, 500, 600 are sufficient)

### h1 Per Page — Approach

**index.html (landing page):**
```html
<h1 class="sr-only">vāsuqi — photocatalytic water treatment technology</h1>
```
Use `sr-only` (Tailwind built-in utility). Epic 2's hero section will be the visually dominant heading; this `sr-only` h1 provides the semantic/SEO anchor without affecting the visual design. Epic 2 does NOT need to add another h1 — this one counts.

**news-documentation.html, about.html, contact.html (supporting pages):**
Add a simple visible placeholder h1 inside `<main>`. Epic 3 stories will build out these pages and WILL replace/refine this content. Keep it minimal:
```html
<main id="main-content">
  <h1>News &amp; Documentation</h1>
  <!-- News & Documentation page content — implemented in Epic 3 -->
</main>
```

### Active Nav State — CSS Approach

Nav link structure (from `partials/nav.html` — do not modify this file):
- Left: `<a href="/news-documentation.html">News &amp; Documentation</a>` (hidden below `md`)
- Center: `<a href="/index.html">` (logo/wordmark — home anchor, no text label to style)
- Right: `<a href="/about.html">About us</a>` and `<a href="/contact.html">Contact</a>` (CTA button)

**Body class per page:**
```html
<!-- index.html --> <body class="page-home">
<!-- news-documentation.html --> <body class="page-news">
<!-- about.html --> <body class="page-about">
<!-- contact.html --> <body class="page-contact">
```

**CSS rules to add in `src/styles/main.css` inside the existing `@layer components` block:**
```css
/* Active nav state — driven by static body class, not JavaScript */
.page-news nav a[href="/news-documentation.html"],
.page-about nav a[href="/about.html"] {
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.page-contact nav a[href="/contact.html"] {
  /* Contact is a filled blue CTA button — use ring/outline to indicate active */
  outline: 2px solid var(--white-brand);
  outline-offset: 2px;
}
/* page-home: logo is the home anchor; no text nav link to mark active */
```

**Why this approach:** The nav is a shared partial resolved at build time — we cannot parameterize the include without rewriting the plugin. Body class + CSS attribute selector achieves "applied directly in the HTML, set statically, not via JavaScript" per AC5 and UX-DR3. The selector targets `nav a[href="..."]` specifically so no other links are affected.

### `id="main-content"` on `<main>`

Add `id="main-content"` to every `<main>` element. This was deferred from Story 1.3's code review (WCAG 2.4.1 — skip navigation target). Future Epic work may add a skip link in `partials/nav.html` pointing to `#main-content`.

### AI Instruction Files — Exact Content

**`CLAUDE.md` (project root):**
```markdown
# Vasuqi — Claude Code Project Instructions

Before starting any task in this project:
1. Read `docs/design-manual.md` in full — authoritative source for all visual,
   typographic, motion, and component decisions. Overrides your defaults.
2. Reference `design-tokens.css` for all colour, spacing, and type values.
   Never use hex values directly in CSS — always use the custom property.

Apply the North Star Rule: any addition must fit the brand identity, visual
identity, and tone of voice. Derive from the four material languages
(Water, Glass, Blueprint, Light) for situations not explicitly covered.
```

**`.cursorrules` (project root):**
Cursor reads `.cursorrules` as a plain-text ruleset. Same content as CLAUDE.md but without the markdown heading:
```
Before starting any task in this Vasuqi project:
1. Read `docs/design-manual.md` in full — authoritative source for all visual,
   typographic, motion, and component decisions. Overrides your defaults.
2. Reference `design-tokens.css` for all colour, spacing, and type values.
   Never use hex values directly in CSS — always use the custom property.

Apply the North Star Rule: any addition must fit the brand identity, visual
identity, and tone of voice. Derive from the four material languages
(Water, Glass, Blueprint, Light) for situations not explicitly covered.
```

**`.github/copilot-instructions.md`:**
GitHub Copilot reads this as markdown from `.github/` directory:
```markdown
# Vasuqi — GitHub Copilot Instructions

Before starting any task in this project:
1. Read `docs/design-manual.md` in full — authoritative source for all visual,
   typographic, motion, and component decisions. Overrides your defaults.
2. Reference `design-tokens.css` for all colour, spacing, and type values.
   Never use hex values directly in CSS — always use the custom property.

Apply the North Star Rule: any addition must fit the brand identity, visual
identity, and tone of voice. Derive from the four material languages
(Water, Glass, Blueprint, Light) for situations not explicitly covered.
```

### Key Learnings from Prior Stories

- **Font tokens already wired**: `src/styles/main.css` maps `--font-display: var(--font-syne)` and `--font-body: var(--font-manrope)`. Google Fonts must match these token names — Syne and Manrope. After Story 1.4 loads the fonts, Tailwind utilities `font-display` and `font-body` will resolve correctly.
- **Tailwind utilities available**: `bg-navy-deep`, `text-white-brand`, `bg-blue-primary`, `text-blue-primary`, `border-blue-primary`, `font-display`, `font-body` — all work via `@theme` in `main.css`.
- **`@layer components` already exists** in `main.css` (has `.glass-blur`). Add the active nav CSS **inside the existing block**, do not create a second `@layer components`.
- **Nav links use `/absolute-paths`** (e.g., `href="/news-documentation.html"`) — CSS selector must match this exactly with leading slash.
- **`sr-only` is a built-in Tailwind utility** — no custom CSS needed for the landing page's visually-hidden h1.
- **`.github/` directory exists** (`workflows/deploy.yml` is already there) — `copilot-instructions.md` goes in `.github/` directly, not in `.github/workflows/`.

### Verification Checklist

After implementation, confirm:
- `npm run build` passes with zero errors
- Each page's `<head>` contains: unique `<title>`, `<meta name="description">`, 4 OG tags, 3 Google Fonts links
- Grep: `grep -r '#' index.html news-documentation.html about.html contact.html` returns no hex values in meta content
- `cat src/styles/main.css` contains active nav CSS rules
- `ls CLAUDE.md .cursorrules .github/copilot-instructions.md` — all 3 exist
- Built `dist/index.html` has the Google Fonts `<link>` tags (confirms Vite doesn't strip them)

### Project Structure Notes

No new directories created. All files at expected locations per architecture.md:
- `CLAUDE.md` → project root ✓
- `.cursorrules` → project root ✓
- `.github/copilot-instructions.md` → `.github/` (directory already exists) ✓

### References

- SEO + OG requirements: [epics.md — Story 1.4 Acceptance Criteria (FR33, FR34, FR35)]
- AI instruction file content: [architecture.md — AI Instruction Files section]
- Font variable weight risk: [deferred-work.md — Deferred from code review of 1-2-design-token-system]
- Font token names (`--font-syne`, `--font-manrope`): [design-tokens.css]
- Nav HTML structure: [partials/nav.html — current file, do not modify]
- main.css current state: [src/styles/main.css — `@layer components` block already exists]
- Active nav + body class pattern: [architecture.md — Implementation Patterns, Naming Patterns]
- Skip navigation deferred gap: [deferred-work.md — Deferred from code review of 1-3]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

No blockers. Build passed with zero errors. Node.js version warning present (22.11 vs required 22.12+) but build completes successfully.

### Completion Notes List

- Added 3-line Google Fonts block (`preconnect` × 2 + combined Syne variable + Manrope link) to all 4 pages; used `Syne:wght@300..900` variable range to preserve `--text-h1-weight: 743` axis
- Added unique `<title>`, `<meta name="description">`, and 5 OG tags per page as specified in Dev Notes
- Added `id="main-content"` to every `<main>`; resolves deferred WCAG 2.4.1 skip-nav gap from Story 1.3 review
- Added `<h1 class="sr-only">` on index (visually hidden, Epic 2 hero takes visual precedence); visible `<h1>` placeholder on 3 supporting pages
- Added `class="page-home/news/about/contact"` to each `<body>`; added active nav CSS in existing `@layer components` block in main.css
- Created `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md` with identical North Star Rule content in tool-appropriate format
- Verified `src/config.js` exports `FORMSPREE_ENDPOINT` (placeholder, correct); `.github/workflows/deploy.yml` exists (HTTPS via GitHub Pages, correct)
- `npm run build` passes: 10 output files, zero errors

### File List

- index.html
- news-documentation.html
- about.html
- contact.html
- src/styles/main.css
- CLAUDE.md
- .cursorrules
- .github/copilot-instructions.md

### Change Log

- 2026-05-22: Story 1.4 implemented — added Google Fonts (variable Syne + Manrope), unique SEO metadata + OG tags, semantic structure (id="main-content", h1 per page), static active nav state (body class + CSS), AI instruction files (CLAUDE.md, .cursorrules, copilot-instructions.md)
