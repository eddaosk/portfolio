---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
---

# vasuqi - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for vasuqi, decomposing the requirements from the PRD, UX Design Specification, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: The navigation bar displays: [News & Documentations] on the left · [circular water icon + vāsuqi wordmark] centered · [About us] [Contact filled pill button] on the right — no "Home" text link (logo serves as home anchor)
FR2: Visitors can jump to any of the 6 landing page sections via a sticky side navigation
FR3: Visitors can reveal section labels by hovering over the side navigation items
FR4: All pages display a consistent footer with navigation columns and social links
FR5: Visitors can access all site content and functionality on mobile and tablet devices
FR6: Visitors are presented with an intro animation when first loading the landing page
FR7: Visitors can dismiss the intro animation by clicking or tapping at any point during playback
FR8: Returning visitors within the same browser session are taken directly to the hero section without the animation replaying
FR9: Visitors can scroll through 6 narrative sections in sequence: intro animation, hero, the gap, where Vasuqi fits, what it's built to change, how it works
FR10: Visitors can view the water treatment cycle SVG diagram showing where Vasuqi sits in the treatment process
FR11: Visitors experience a persistent animated background light element throughout the landing page
FR12: The intro animation communicates the core value proposition and completes within approximately 3–5 seconds
FR13: All page animations follow water-physics motion principles (slow, continuous, non-linear, no sudden movements)
FR14: Interactive elements provide hover-state feedback
FR15: The background animation runs continuously without interrupting page interaction or navigation
FR16: Visitors can access a News & Documentation page comprising three sections: News & events (carousel), Documents (download cards), and Press & Brand (download cards)
FR17: Visitors can download the pitch deck PDF via a card component in the Documents section — card displays a mockup thumbnail image and a "Pitch Deck" label
FR18: Visitors can browse a horizontally scrollable carousel of manually maintained news cards in the News & events section — each card shows publication name, headline, date, and links externally to LinkedIn/social media/newspaper articles; all clicks drive traffic off-site
FR19: Visitors can download documents via card components in two sections: Documents (Pitch Deck, Product Brochure) and Press & Brand (PR Document, Logo Kit) — each card shows a mockup thumbnail image and a label
FR20: Visitors can access an About Us page presenting the founding team with roles, bios, and professional profiles
FR21: Visitors can follow external profile links for each team member from the About Us page
FR22: Visitors can access a Contact page with both a contact form and general enquiry information
FR23: Visitors can read a brand mythology section on the Contact page explaining the origin of the name Vasuqi and its connection to Vasuki, the Hindu serpent king
FR24: Visitors can submit a contact enquiry via a form collecting: first name, email, and message — no more than necessary (Figma shows 7 fields; spec overrides to 3 for low-friction conversion)
FR25: Contact form submissions are delivered to a configurable third-party form service accessible by the founder
FR26: Visitors can view general enquiry contact information on the Contact page (email, phone, address, social links)
FR27: Visitors can view a rendered product visualization in the "How it Works" section — distinct from the blueprint SVG line-art style used for icons
FR28: The product visualization responds to hover with a light expansion effect (CSS animation)
FR29: Cards in the "How it Works" section display ambient light motion behind them, following Light material language physics
FR30: All interactive elements are operable by keyboard without a mouse
FR31: All images and meaningful SVGs have descriptive alternative text
FR32: All form fields are associated with visible labels
FR33: All pages have unique titles and descriptions for search engines
FR34: All pages have social sharing metadata (Open Graph)
FR35: All page content is available to search engine crawlers without JavaScript execution
FR36: Developers and AI agents can access all colour values, typography scale, and spacing as CSS custom properties in a dedicated tokens file
FR37: The design manual provides task-based guidance covering: adding a new section, writing copy, creating a new component, and adding media
FR38: The design manual provides a decision protocol for deriving new components not covered by existing patterns
FR39: The design manual documents four material languages (Water, Glass, Blueprint, Light) as the conceptual reasoning layer for all visual and motion decisions
FR40: The design manual identifies elements that require human review rather than AI derivation
FR41: The design manual includes a plain-language onboarding section explaining to the founder that the AI instruction files (CLAUDE.md, .cursorrules, copilot-instructions.md) automatically load the manual at the start of every session — the founder opens the project, types their request, and the AI already has full brand context; no manual copy-paste step is required
FR42: New components created through AI-assisted development can be documented in a living section of the design manual
FR43: The design manual includes a dedicated anti-list section containing at minimum 12 explicit "never do this" rules
FR44: The design manual declares a North Star Rule as the primary override clause
FR45: The design manual documents evolution triggers: named product milestones defining when the design system should be intentionally updated
FR46: The founder can add new news carousel cards to the News & events section (publication name, headline, date, external URL) while preserving the carousel layout and visual identity — achievable via AI-assisted workflow using the design manual
FR47: The founder can add new download cards to the Documents or Press & Brand sections (thumbnail image, label, file URL) while preserving the card grid layout
FR48: The founder can update team information on the About Us page
FR49: The founder can reconfigure the contact form service endpoint without modifying core page structure
FR50: Visitors can download the product brochure PDF via a card component in the Documents section — card displays a mockup thumbnail image and a "Product Brochure" label
FR51: Visitors can download the PR document via a card component in the Press & Brand section — card displays a mockup thumbnail image and a "PR Document" label
FR52: Visitors can download the logo kit via a card component in the Press & Brand section — card displays a mockup thumbnail image and a "Logo Kit" label

### NonFunctional Requirements

NFR1 (Performance): Intro animation renders on first paint — no pre-loader or loading screen before animation begins
NFR2 (Performance): Largest Contentful Paint (LCP) ≤ 2.5 seconds on a standard connection (Google "good" threshold)
NFR3 (Performance): All animation assets must be lightweight enough not to block initial page render
NFR4 (Accessibility): WCAG 2.1 AA compliance across all pages — with one deliberate exception: continuous motion elements (hero video background, floating light background) do not implement pause/stop/hide controls (WCAG 2.2.2 Level A). This is a documented brand trade-off; water physics motion is low-intensity, ambient, and non-flash-based. The intro animation is skippable (FR7) and suppressed on return (FR8), mitigating the most significant accessibility concern. Exam-defensible rationale documented in architecture.
NFR5 (Accessibility): All colour/background combinations meet AA contrast ratios (minimum 4.5:1 for body text, 3:1 for large text and UI components)
NFR6 (Accessibility): All interactive elements reachable and operable via keyboard
NFR7 (Accessibility): Focus states visible and styled on-brand
NFR8 (Accessibility): No time-limited interactions that cannot be extended or dismissed
NFR9 (Security): Site served over HTTPS
NFR10 (Security): No personal data stored client-side or server-side by the codebase
NFR11 (Security): No sensitive credentials hardcoded in source files — form service endpoint configurable via a clearly labelled variable
NFR12 (Compatibility): Last 2 major versions of Chrome, Firefox, Safari, and Edge; Safari 15+ for older iOS
NFR13 (Compatibility): All viewport widths from 320px to 1440px+
NFR14 (Compatibility): Full functionality without browser plugins or extensions
NFR15 (Maintainability): Design manual fits within a single LLM context window (~480 lines maximum)
NFR16 (Maintainability): All design values expressed as CSS custom properties — no magic numbers in stylesheets
NFR17 (Maintainability): New components derived via the Component Derivation Protocol must pass the "Same Designer" test on first AI-assisted attempt
NFR18 (Maintainability): File and component naming follows consistent, predictable conventions navigable by an AI agent without a separate map

### Additional Requirements

- Starter template: Vite 8.0.13 (vanilla template) + Tailwind CSS v4 (4.3.0) + GSAP 3.15.0 — scaffold must be initialized as the first implementation story
- Custom Vite `transformIndexHtml` plugin (`htmlPartialsPlugin`) for build-time nav/footer partial injection — zero npm dependencies beyond Vite
- GSAP plugins in use: ScrollTrigger (scroll-triggered animations), SplitText (text entrance animations), GSAP core tweens (intro, floating light, hover)
- Blob morphing: Export 2 blob SVG variants per team member from Atta/Figma; verify identical point counts before implementing GSAP `attr: {d}` tween; fall back to CSS `clip-path` morphing if point counts differ
- Safari glassmorphism: `-webkit-backdrop-filter` required alongside standard `backdrop-filter` on all glass components
- Animation accessibility decision: No `prefers-reduced-motion` accommodation anywhere on the site — deliberate, exam-defensible design decision; water physics motion is low-intensity and ambient
- GitHub Actions CI/CD pipeline: Push to `main` → `npm ci` → `npm run build` → deploy `dist/` to GitHub Pages
- `src/animations/constants.js` must export `WATER_DURATION`, `WATER_EASE`, `WATER_STAGGER` — all animation modules import from here; no inline hardcoded values
- File naming: kebab-case throughout — files, directories, section IDs, CSS token names
- Shared namespace: HTML section IDs (`intro-animation`, `hero`, `the-gap`, `where-vasuqi-fits`, `what-its-built-to-change`, `how-it-works`) must exactly match design manual section names and side nav anchor labels
- `src/config.js` exports all founder-configurable values (`FORMSPREE_ENDPOINT`) — imported by `contact.js` only
- AI instruction files: `CLAUDE.md` (Claude Code), `.cursorrules` (Cursor), `.github/copilot-instructions.md` (GitHub Copilot) — identical content, tool-specific format; must be created as part of handoff deliverable
- `design-tokens.css` must exist before any CSS is written; Tailwind `@theme` block references token values — no duplicate hex values
- Hero video: `<video autoplay muted loop playsinline>` with `poster` attribute + two `<source>` elements (`.webm` first, `.mp4` fallback); `aria-hidden="true"`
- Form submission handler: JS intercepts submit, POSTs to Formspree, calls `showFormState('success' | 'error')` which toggles pre-existing HTML elements — never injects elements; silent failure is not acceptable
- `sessionStorage` used exclusively for intro animation replay suppression (FR8) — no other client-side state
- Download card thumbnail images stored in `public/images/docs/` — one mockup preview per downloadable file (pitch-deck-thumb.jpg, product-brochure-thumb.jpg, pr-document-thumb.jpg, logo-kit-thumb.jpg)
- Downloadable files (PDFs, logo kit) stored in `public/docs/` — `public/docs/vasuqi-pitch-deck.pdf`, `public/docs/vasuqi-product-brochure.pdf`, `public/docs/vasuqi-pr-document.pdf`, `public/docs/vasuqi-logo-kit.zip`
- News carousel cards are static HTML — no JS carousel library; horizontal scroll via CSS `overflow-x: auto` + `scroll-snap-type`; no autoplay

### UX Design Requirements

UX-DR1: Nav bar is pill-shaped (stadium shape), glassmorphism — `backdrop-filter` blur + `--ice-near` border + `--white-brand` background at ~80% opacity — persistent across all 4 pages; exact layout: [News & Documentations] · [circular water icon + vāsuqi wordmark] · [About us] [Contact filled pill button] — no "Home" text link; logo is the home anchor
UX-DR2: Contact button in nav is the only primary CTA — filled blue pill, `--blue-primary` background, `--white-brand` text; appears once globally; never duplicated as a page-level button
UX-DR3: Active page state in nav — current page indicated via distinct text link style; logo (center) links to top of index.html
UX-DR4: Side navigation (desktop only, `lg`+) — shows 6 section anchors for landing page, hover-reveals section labels, updates to reflect current section on scroll; hidden on mobile and tablet
UX-DR5: Contact form validation on submit only — no inline validation on blur; required fields: first name, email, message (3 fields only — Figma's 7-field form is intentionally overridden by spec); full-width inputs on mobile, thumb-reachable submit button
UX-DR6: Contact form explicit feedback states — success message and error message each implemented as pre-existing HTML elements (not JS-injected) that toggle visibility; error state must offer direct email alternative visible without scrolling
UX-DR7: Team cards on About Us — blob morphing photo (GSAP `attr: {d}` tween between two SVG variants), name, role, bio text, LinkedIn link per team member; 4 members: Adarsh Raj (CEO), Jörg Vogel (CTO), Peter Holme Jensen (Advisor), Angela Zhang (Chief Scientific Advisor)
UX-DR8: Water cycle diagram (Where Vasuqi Fits section) — separate mobile layout at `md` breakpoint, not scaled-down desktop version; must be legible at 320px
UX-DR9: Hero section — `<video>` background (flowing water, purely decorative, `aria-hidden="true"`) + left-aligned Syne headline in `--white-brand` + WHY statement in `--navy-deep`; no glass panel around text; poster image prevents flash on slow connections
UX-DR10: Institutional logos — BII, Innofounder, DTU — visible within the landing page scroll (not footer-only); serve as primary trust layer
UX-DR11: Focus states — visible, on-brand focus rings in `--blue-primary` on all interactive elements (nav links, CTA, form fields, side nav anchors, team LinkedIn links)
UX-DR12: Touch targets — minimum 44×44px on all interactive elements
UX-DR13: All layout units relative (rem, %, vw/vh) — no fixed pixel values in layout CSS
UX-DR14: Images below the fold — `loading="lazy"` attribute
UX-DR15: Floating light background — persistent ambient animated element on landing page; GSAP; runs continuously without interrupting scroll or navigation; `aria-hidden="true"`
UX-DR16: Intro animation — runs on first paint (no pre-loader); session-aware (suppressed on return via sessionStorage); skippable on any click/tap; communicates WHY in 3–5 seconds; plays once per browser session only
UX-DR17: Download card component (Blueprint + Light material language) — used in Documents and Press & Brand sections; each card has: a mockup thumbnail image (document preview), a text label below (`--blue-primary`, Manrope), and a download/link action on click; cards arranged in a 2-column grid; new cards addable by founder via AI-assisted workflow; image slots in `public/images/docs/`
UX-DR18: News & events carousel — horizontally scrollable row of manually maintained cards; each card shows: publication name, headline, date; card links externally (`target="_blank" rel="noopener"`); Blueprint material language styling consistent with the rest of the News & Docs page; new cards addable by founder via AI-assisted workflow

### FR Coverage Map

FR1: Epic 1 — nav bar structure (updated layout: no Home link; [News & Docs] · [logo] · [About us] [Contact])
FR2: Epic 2 — side navigation with 6 section anchors
FR3: Epic 2 — hover-reveal section labels on side nav
FR4: Epic 1 — footer structure in `partials/footer.html`
FR5: Epic 2 (landing) + Epic 3 (supporting pages) — mobile/tablet responsiveness
FR6: Epic 2 — intro animation
FR7: Epic 2 — dismissible on click/tap
FR8: Epic 2 — session-aware via `sessionStorage`
FR9: Epic 2 — 6 narrative sections in scroll sequence
FR10: Epic 2 — water cycle SVG diagram
FR11: Epic 2 — floating light background
FR12: Epic 2 — 3–5s animation duration
FR13: Epic 2 — water physics easing on all animations
FR14: Epic 2 — hover states on interactive elements
FR15: Epic 2 — floating light non-blocking
FR16: Epic 3 — News & Documentation page (3 sections: News & events, Documents, Press & Brand)
FR17: Epic 3 — Pitch Deck download card with mockup thumbnail
FR18: Epic 3 — News & events carousel (manually maintained, external links)
FR19: Epic 3 — Documents + Press & Brand download card sections
FR20: Epic 3 — About Us team grid
FR21: Epic 3 — team member LinkedIn links
FR22: Epic 3 — Contact page
FR23: Epic 3 — brand mythology section on Contact
FR24: Epic 3 — 7-field contact form
FR25: Epic 3 — Formspree integration
FR26: Epic 3 — general enquiries block
FR27: Epic 2 — product visualization, How it Works
FR28: Epic 2 — hover light expansion on product viz
FR29: Epic 2 — ambient light cards, How it Works
FR30: Epic 2 (landing) + Epic 3 (supporting pages) — keyboard operability
FR31: Epic 2 (landing) + Epic 3 (supporting pages) — alt text on images/SVGs
FR32: Epic 3 — form field labels
FR33: Epic 1 — unique `<title>` + `<meta description>` on all pages
FR34: Epic 1 — Open Graph tags on all pages
FR35: Epic 1 — crawlable content without JS
FR36: Epic 1 — `design-tokens.css` CSS custom properties
FR37: Epic 4 — task-based guidance in design manual
FR38: Epic 4 — Component Derivation Protocol
FR39: Epic 4 — four material languages documentation
FR40: Epic 4 — human-review identifiers in manual
FR41: Epic 4 — onboarding section explaining automatic AI context loading via instruction files
FR42: Epic 4 — living components section
FR43: Epic 4 — anti-list (12 rules)
FR44: Epic 4 — North Star Rule
FR45: Epic 4 — evolution triggers
FR46: Epic 3 — founder adds news carousel cards via AI-assisted workflow
FR47: Epic 3 — founder adds download cards (Documents / Press & Brand) via AI-assisted workflow
FR48: Epic 3 — founder updates team info on About Us
FR49: Epic 3 — Formspree endpoint reconfigurable via `src/config.js`
FR50: Epic 3 — Product Brochure download card with mockup thumbnail
FR51: Epic 3 — PR Document download card with mockup thumbnail
FR52: Epic 3 — Logo Kit download card with mockup thumbnail

## Epic List

### Epic 1: Project Foundation & Live Infrastructure
The founder has a deployable project scaffold. Design tokens are the source of truth for all visual values. Shared nav and footer work across all four pages. A push to `main` deploys a live URL on GitHub Pages. All pages have correct SEO metadata and are crawlable without JavaScript.
**FRs covered:** FR1, FR4, FR33, FR34, FR35, FR36

### Epic 2: Investor Landing Page Experience
Investors experience the full narrative scroll — intro animation through all 6 sections. Side navigation, floating light background, water cycle SVG diagram, product visualization, and water physics animations are working. The primary investor journeys (Journey 1 and Journey 2) are completable end-to-end. Full mobile responsiveness and accessibility on the landing page.
**FRs covered:** FR2, FR3, FR5 (landing), FR6–FR15, FR27–FR31 (landing page)

### Epic 3: Complete Investor Journey — Supporting Pages
Investors can reach all four site destinations: browse the news carousel and download documents (pitch deck, product brochure, PR document, logo kit); view the team with institutional backing; submit a contact enquiry with visible feedback or use the general enquiries fallback. Founder can maintain content on all supporting pages via AI-assisted workflow.
**FRs covered:** FR16–FR26, FR30–FR32 (supporting pages), FR46–FR52

### Epic 4: Design Manual & Founder Handoff
The founder can paste the design manual into any AI coding tool and immediately get brand-consistent output. The manual covers task-based guidance (adding a section, writing copy, creating a component, adding media), Component Derivation Protocol, four material languages, anti-list (12 rules), North Star Rule, and evolution triggers.
**FRs covered:** FR37–FR45

---

## Epic 1: Project Foundation & Live Infrastructure

The founder has a deployable project scaffold. Design tokens are the source of truth for all visual values. Shared nav and footer work across all four pages. A push to `main` deploys a live URL on GitHub Pages.

### Story 1.1: Project Scaffold & Build Pipeline

As a developer,
I want a Vite 8 + Tailwind CSS v4 + GSAP project with MPA build config and automated GitHub Pages deployment,
So that I can develop with hot-module reloading and every push to `main` produces a live URL.

**Acceptance Criteria:**

**Given** an empty project directory
**When** `npm install` is run
**Then** all dependencies install without errors (Vite 8.0.13, Tailwind CSS 4.3.0, GSAP 3.15.0)

**Given** the dev environment
**When** `npm run dev` is run
**Then** a local dev server starts with HMR and all 4 HTML pages are reachable at their expected paths (`/`, `/news-documentation.html`, `/about.html`, `/contact.html`)

**Given** the production build
**When** `npm run build` is run
**Then** a `dist/` folder is produced containing 4 standalone HTML files with all assets inlined or referenced correctly and no build errors

**Given** a commit pushed to the `main` branch
**When** the GitHub Actions workflow (`deploy.yml`) runs
**Then** it executes `npm ci`, `npm run build`, uploads `dist/` as a Pages artifact, and deploys to GitHub Pages — the live URL returns HTTP 200

**Given** the `vite.config.js`
**When** reviewed
**Then** it includes: `@tailwindcss/vite` plugin, `htmlPartialsPlugin` (custom `transformIndexHtml` resolver for `<!--@include-->` comments), and `rollupOptions.input` listing all 4 HTML entry points; no external partial-injection npm packages are used

**Given** the project file structure
**When** reviewed
**Then** all files follow kebab-case naming; `src/` contains per-page JS entry points and `animations/` subdirectory; `public/` contains `images/`, `svgs/`, `blobs/`, `docs/` subdirectories; `partials/` and `docs/` exist at project root

---

### Story 1.2: Design Token System

As a developer and AI agent,
I want all design values defined as CSS custom properties in `design-tokens.css` with water physics animation constants in `src/animations/constants.js`,
So that any contributor applies correct brand values without using raw hex codes or hardcoded animation values.

**Acceptance Criteria:**

**Given** `design-tokens.css` at project root
**When** reviewed
**Then** it defines all 10 colour tokens as CSS custom properties: `--navy-deep` (#0A0F1E), `--blue-primary` (#2D5BE3), `--blue-deep` (#1A3BA3), `--blue-mid` (#4A7AFF), `--blue-soft` (#7BA3FF), `--cyan-light` (#A8E8FF), `--steel` (#6B7FA3), `--ice-light` (#E8F0FF), `--ice-near` (#F0F5FF), `--white-brand` (#FAFCFF)

**Given** `design-tokens.css`
**When** reviewed
**Then** it defines typography tokens: Syne (variable weight) for display/headings, Manrope for body — font family names, full type scale (sizes and weights), and line heights as CSS custom properties

**Given** `design-tokens.css`
**When** reviewed
**Then** it defines spacing tokens aligned with Tailwind's 4px base unit; no magic pixel values appear in any stylesheet

**Given** `src/styles/main.css`
**When** reviewed
**Then** it imports `design-tokens.css` via Tailwind's `@theme` block, extending the utility layer to reference token values directly — no duplicate hex values exist in any CSS file

**Given** `src/animations/constants.js`
**When** reviewed
**Then** it exports `WATER_DURATION` (`{ fast: 0.8, default: 1.0, slow: 1.2 }`), `WATER_EASE` (`'power1.inOut'`), and `WATER_STAGGER` (`0.12`) — no animation module in the codebase hardcodes these values inline

**Given** any stylesheet in the project
**When** searched for raw hex values (e.g. `#2D5BE3`)
**Then** none are found — all colour references use `var(--token-name)`

---

### Story 1.3: Shared Navigation & Footer

As a visitor,
I want a consistent pill-shaped glassmorphism navigation bar and branded footer across all four pages,
So that I can reach any site destination from wherever I am and the site feels like a single coherent product.

**Acceptance Criteria:**

**Given** `partials/nav.html`
**When** rendered on any page
**Then** the nav bar is pill-shaped (fully rounded ends / stadium shape) with a glassmorphism background (`backdrop-filter` blur + `-webkit-backdrop-filter` blur for Safari, `--blue-primary` border, `--ice-near` background tint) and floats above page content

**Given** the nav bar
**When** inspected
**Then** it contains exactly: "News & Documentations" text link on the left (in `--blue-primary`), the circular water icon + "vāsuqi" wordmark centered (macron over ā, links to `index.html`), "About us" text link on the right (in `--blue-primary`), and a filled blue pill "Contact" CTA button linking to `contact.html` — no "Home" text link exists

**Given** the Contact CTA button in the nav
**When** inspected
**Then** it uses `--blue-primary` background and `--white-brand` text, is pill-shaped, and is the only primary CTA element on any page

**Given** any of the 4 HTML pages
**When** the page loads
**Then** the nav partial is resolved at build time via `<!--@include "partials/nav.html"-->` — the nav HTML is present in the initial page payload (not injected by JS)

**Given** `partials/footer.html`
**When** rendered
**Then** it shows About and Product navigation columns with relevant links, plus social media icons as inline SVG; the footer is consistent across all 4 pages

**Given** any interactive element in the nav (links, CTA button)
**When** navigated to via keyboard Tab
**Then** a visible focus ring in `--blue-primary` is displayed (UX-DR11)

**Given** a viewport of 320px width
**When** the nav renders
**Then** it remains usable and does not overflow or break layout on mobile

---

### Story 1.4: Four-Page Shells with SEO & AI Instruction Files

As a search engine crawler and site visitor,
I want all four pages to have correct semantic structure, unique metadata, and Open Graph tags — and as the founder, I want AI instruction files pre-loaded so any AI coding tool I use already has project context,
So that the site is discoverable, renders correctly across platforms, and the AI-assisted workflow is set up from day one.

**Acceptance Criteria:**

**Given** each of the 4 HTML pages (`index.html`, `news-documentation.html`, `about.html`, `contact.html`)
**When** the page `<head>` is inspected
**Then** each has a unique `<title>` tag, a unique `<meta name="description">`, and Open Graph tags (`og:title`, `og:description`, `og:image`) specific to that page (FR33, FR34)

**Given** each HTML page
**When** rendered with JavaScript disabled
**Then** all primary content (headings, navigation, footer) is present in the HTML — no critical content depends on JS execution (FR35)

**Given** each HTML page
**When** reviewed for semantic structure
**Then** it contains `<nav>`, `<main>`, `<footer>` landmark elements; exactly one `<h1>` per page; heading hierarchy descends logically (`h1` → `h2` → `h3`)

**Given** each HTML page
**When** reviewed for JS wiring
**Then** a per-page JS entry point is referenced (`src/main.js`, `src/news.js`, `src/about.js`, `src/contact.js`) and `src/styles/main.css` is linked in `<head>`; Google Fonts (`Syne` variable + `Manrope`) are loaded via `<link rel="preconnect">` + `<link>` in `<head>`

**Given** each of the 4 HTML pages
**When** the nav partial is included
**Then** the nav link corresponding to the current page has an active state class applied directly in the HTML — the current page's nav link is visually distinguished from the others; this is set statically per page, not via JavaScript (UX-DR3)

**Given** `src/config.js`
**When** reviewed
**Then** it exports `FORMSPREE_ENDPOINT` as a named constant with a clearly labelled placeholder value; no other file contains a hardcoded Formspree URL

**Given** `CLAUDE.md` at project root
**When** reviewed
**Then** it instructs Claude Code to: (1) read `docs/design-manual.md` in full before any task, (2) reference `design-tokens.css` for all colour/spacing/type values, and (3) apply the North Star Rule; identical intent is present in `.cursorrules` and `.github/copilot-instructions.md` in tool-appropriate format

**Given** the GitHub Actions workflow (`.github/workflows/deploy.yml`)
**When** HTTPS is enforced
**Then** the GitHub Pages deployment is served over HTTPS automatically — no additional configuration required (NFR9)

---

## Epic 2: Investor Landing Page Experience

Investors experience the full narrative scroll — intro animation through all 6 sections. Side navigation, floating light background, water cycle SVG diagram, product visualization, and water physics animations are working. The primary investor journeys are completable end-to-end.

### Story 2.1: Hero Section & Page Layout

As an investor visitor,
I want to land on a hero section that immediately communicates what Vasuqi does through a video background, strong headline, and visible institutional backing,
So that I know within 5 seconds whether this is worth my time.

**Acceptance Criteria:**

**Given** `index.html` hero section
**When** the page loads
**Then** a `<video autoplay muted loop playsinline aria-hidden="true">` background plays immediately with a `.webm` source first and `.mp4` fallback; a `poster` attribute points to `public/images/hero-poster.jpg` to prevent a flash of empty space on slow connections

**Given** the hero section
**When** inspected
**Then** the Syne headline is rendered in `--white-brand` and the WHY statement in `--navy-deep` at correct type scale tokens, floating directly on the video background with no glass panel or border enclosing the text

**Given** the landing page scroll
**When** the visitor reaches the institutional logos block
**Then** logos for BII, Innofounder, and DTU are visible within the landing page scroll — not footer-only (UX-DR10)

**Given** blueprint background elements
**When** the page renders
**Then** blueprint PNG assets (`public/images/blueprints/`) are placed as `<img aria-hidden="true">` behind glass layers in the appropriate sections; inline blueprint icons use `currentColor` and are styleable via CSS

**Given** the full landing page on a 320px viewport
**When** rendered
**Then** all 6 sections are accessible by scroll, no content overflows horizontally, whitespace compresses but is never eliminated, and all layout units are relative (`rem`, `%`, `vw`/`vh`) — no fixed pixel values in layout CSS (UX-DR13)

**Given** images below the fold
**When** the page HTML is inspected
**Then** all below-fold `<img>` elements have `loading="lazy"` (UX-DR14)

**Given** the hero video
**When** a screen reader encounters it
**Then** it is ignored (`aria-hidden="true"`) and does not announce the video to assistive technology

---

### Story 2.2: Intro Animation

As an investor visiting for the first time,
I want an intro animation that plays immediately on page load and communicates the core value proposition in 3–5 seconds,
So that I understand what Vasuqi does before reading a word of body copy.

**Acceptance Criteria:**

**Given** a first-time visitor loading `index.html`
**When** the page renders
**Then** the intro animation begins on first paint with no pre-loader or loading screen — the animation asset is lightweight enough not to block initial render (NFR1, NFR3)

**Given** the intro animation
**When** it plays
**Then** it runs for approximately 3–5 seconds, communicates the core WHY (water treatment, the last 5%, light as solution), uses GSAP SplitText for text entrance with `WATER_EASE` and `WATER_DURATION` constants from `src/animations/constants.js`, and follows water physics motion throughout (no bounce, no snap) (FR12, FR13)

**Given** the intro animation is playing
**When** the visitor clicks or taps anywhere
**Then** the animation is immediately dismissed and the hero section is shown (FR7)

**Given** a visitor who has already seen the intro animation in the current browser session
**When** they reload or return to `index.html`
**Then** the intro animation does not replay — the hero section is shown immediately; `sessionStorage` is used to track the seen state (FR8)

**Given** `src/animations/intro.js`
**When** reviewed
**Then** it exports an `initIntroAnimation()` function; all animation logic is contained within this module; no animation code appears inline in `index.html` or directly in `src/main.js`; `src/main.js` calls `initIntroAnimation()` inside a `DOMContentLoaded` listener

**Given** the `sessionStorage` key used for animation suppression
**When** the browser session ends (tab closed)
**Then** the key is cleared and the animation plays again on the next first visit

---

### Story 2.3: Floating Light Background

As an investor scrolling the landing page,
I want a persistent ambient light animation in the background,
So that the brand's Light material language is expressed continuously and the page feels alive without distracting from the content.

**Acceptance Criteria:**

**Given** `index.html` after the intro animation completes
**When** the visitor scrolls through any section
**Then** the floating light background element (glowing blue vertical light beams) is visible and animating continuously; it does not pause or reset on scroll (FR11, FR15)

**Given** `src/animations/floating-light.js`
**When** reviewed
**Then** it exports an `initFloatingLight()` function; animation uses GSAP core tweens with `WATER_EASE`, `WATER_DURATION.slow`, and looping (`repeat: -1`); no duration or easing values are hardcoded inline

**Given** the floating light element
**When** inspected in the DOM
**Then** it has `aria-hidden="true"` — it is invisible to screen readers and does not interfere with keyboard navigation

**Given** the floating light animation running
**When** the visitor interacts with navigation, clicks links, or fills a form
**Then** the animation continues uninterrupted — it does not block any page interaction (FR15)

**Given** the floating light element and page content
**When** rendered together
**Then** the light element sits behind content layers (correct `z-index`) and does not obscure any readable text or interactive element

---

### Story 2.4: Narrative Scroll Sections — The Gap, Where Vasuqi Fits, What It's Built to Change

As an investor scrolling the landing page,
I want the three middle narrative sections to animate in as I scroll and make a clear, credible argument for Vasuqi's market position,
So that by the time I reach "How It Works" I am already convinced the problem is real.

**Acceptance Criteria:**

**Given** the landing page with "The Gap", "Where Vasuqi Fits", and "What It's Built to Change" sections
**When** the visitor scrolls each section into view
**Then** section elements animate in via GSAP ScrollTrigger using `WATER_EASE`, `WATER_DURATION.default`, and `WATER_STAGGER` from `src/animations/constants.js`; each section has its own ScrollTrigger instance named by section (FR13)

**Given** each ScrollTrigger instance
**When** reviewed
**Then** `once: true` is set — animations play once on scroll-into-view and do not reverse on scroll-out

**Given** the `#where-vasuqi-fits` section on a desktop viewport (`lg`+)
**When** rendered
**Then** the water treatment cycle SVG diagram (`public/svgs/water-cycle-diagram.svg`) is displayed at full layout showing where Vasuqi's system slots into the treatment process (FR10)

**Given** the same section on a viewport below `md` (768px)
**When** rendered
**Then** the SVG diagram switches to a mobile-specific layout — not a scaled-down version of the desktop layout; the diagram remains legible at 320px width (UX-DR8)

**Given** all three sections
**When** reviewed for HTML section IDs
**Then** they use exactly `id="the-gap"`, `id="where-vasuqi-fits"`, `id="what-its-built-to-change"` — matching the design manual section names and the side nav anchors exactly (shared namespace rule)

**Given** all scroll animation modules
**When** reviewed
**Then** they are contained in `src/animations/scroll.js`, exported as `initScrollAnimations()`, and imported by `src/main.js` — no animation logic is inline in HTML

---

### Story 2.5: How It Works Section & Product Visualization

As an investor reaching the final landing page section,
I want to see the product visualized with an ambient light effect and understand the core mechanism in plain language,
So that I leave with a clear mental model of what Vasuqi's technology actually does.

**Acceptance Criteria:**

**Given** the `#how-it-works` section
**When** rendered
**Then** the product visualization (`public/images/globe.png`) is displayed with descriptive `alt` text; it is visually distinct from the blueprint SVG line-art used for icons (FR27, FR31)

**Given** the product visualization image
**When** the visitor hovers over it on desktop
**Then** a CSS `@keyframes` light expansion effect plays — using `--blue-mid` or `--blue-primary` glow; no GSAP required for this interaction (FR28)

**Given** the "How it Works" cards
**When** rendered
**Then** they display ambient light motion behind them following Light material language physics — slow, continuous, non-linear; implemented via GSAP or CSS animation consistent with water physics constants (FR29)

**Given** the section on mobile (below `lg`)
**When** rendered
**Then** hover effects are not triggered by touch — the card and visualization remain usable without hover states; touch targets are at minimum 44×44px (UX-DR12)

**Given** the section scroll entrance
**When** the visitor scrolls `#how-it-works` into view
**Then** elements animate in via ScrollTrigger with `once: true`, water physics easing, consistent with all other section animations (FR13)

**Given** the `index.html` landing page
**When** all 6 sections are present (`intro-animation`, `hero`, `the-gap`, `where-vasuqi-fits`, `what-its-built-to-change`, `how-it-works`)
**Then** a visitor can scroll through them in sequence forming a complete narrative arc (FR9)

---

### Story 2.6: Side Navigation & Landing Page Accessibility

As an investor on desktop,
I want a sticky side navigation that shows my position in the page and lets me jump to any section,
So that I can navigate non-linearly without losing my place — and as a keyboard user, I want the entire page to be fully operable without a mouse.

**Acceptance Criteria:**

**Given** the landing page on a desktop viewport (`lg`+ / 1024px+)
**When** the page is scrolled
**Then** a sticky side navigation is visible with 6 labelled anchors corresponding to the 6 landing page sections (`intro-animation`, `hero`, `the-gap`, `where-vasuqi-fits`, `what-its-built-to-change`, `how-it-works`) (FR2)

**Given** the side navigation
**When** the visitor hovers over a side nav item
**Then** the section label text is revealed; when not hovered, labels are hidden and only the anchor indicator is shown (FR3)

**Given** the side navigation
**When** the visitor scrolls the page
**Then** the active section is indicated in the side nav — the current section's anchor is visually distinguished; the active state updates as the visitor scrolls between sections

**Given** the landing page on a viewport below `lg` (mobile/tablet)
**When** rendered
**Then** the side navigation is hidden (`display: none` or equivalent Tailwind `lg:` prefix); section navigation on mobile is replaced by natural scroll (UX-DR4)

**Given** all interactive elements on the landing page (nav links, CTA button, side nav anchors, video dismiss)
**When** navigated via keyboard Tab
**Then** each element receives focus in a logical order; visible focus rings in `--blue-primary` are displayed on all focused elements (FR30, NFR6, NFR7, UX-DR11)

**Given** all images on the landing page including the SVG diagram, blueprint illustrations, and product visualization
**When** inspected
**Then** meaningful images have descriptive `alt` text; purely decorative images (`aria-hidden="true"` or `alt=""`) are correctly marked (FR31)

**Given** all text/background colour combinations on the landing page
**When** tested against WCAG 2.1 AA contrast ratios
**Then** body text meets 4.5:1 minimum; large text and UI components meet 3:1 minimum (NFR4, NFR5)

**Given** the landing page on viewports from 320px to 1440px+
**When** rendered in the last 2 major versions of Chrome, Firefox, Safari (including Safari 15+), and Edge
**Then** all content is accessible, no layout breaks, and glassmorphism renders correctly with `-webkit-backdrop-filter` on Safari (NFR12, NFR13)

**Given** the LCP (Largest Contentful Paint) for the landing page
**When** measured on a standard connection
**Then** LCP is ≤ 2.5 seconds (NFR2)

---

## Epic 3: Complete Investor Journey — Supporting Pages

Investors can reach all four site destinations: browse the news carousel and download documents; view the team with institutional backing; submit a contact enquiry with visible feedback or use the general enquiries fallback. Founder can maintain content on all supporting pages via AI-assisted workflow.

### Story 3.1: News & Documentation Page

As an investor,
I want to browse recent news about Vasuqi and download key documents in one place,
So that I can quickly assess traction and access the pitch deck without hunting for it.

**Acceptance Criteria:**

**Given** `news-documentation.html`
**When** the page loads
**Then** a hero image (`public/images/hero-news.jpg`) is displayed at the top with descriptive `alt` text; the page title is "News & Documentations" rendered in Syne at the correct heading scale

**Given** the News & events section
**When** rendered
**Then** it displays a horizontally scrollable carousel of manually maintained news cards; horizontal scroll is implemented with CSS `overflow-x: auto` and `scroll-snap-type: x mandatory` — no JavaScript carousel library is used (UX-DR18)

**Given** each news card in the carousel
**When** inspected
**Then** it shows: publication/source name, article headline, date, and an external link; clicking the card opens the linked article in a new tab (`target="_blank" rel="noopener"`); all clicks drive traffic off-site (FR18)

**Given** the Documents section
**When** rendered
**Then** it displays a 2-column grid of download cards; each card shows a mockup thumbnail image from `public/images/docs/` and a label below; the grid contains: Pitch Deck (`pitch-deck-thumb.jpg`, links to `public/docs/vasuqi-pitch-deck.pdf`) and Product Brochure (`product-brochure-thumb.jpg`, links to `public/docs/vasuqi-product-brochure.pdf`) (FR17, FR50, UX-DR17)

**Given** the Press & Brand section
**When** rendered
**Then** it displays a 2-column grid of download cards: PR Document (`pr-document-thumb.jpg`, links to `public/docs/vasuqi-pr-document.pdf`) and Logo Kit (`logo-kit-thumb.jpg`, links to `public/docs/vasuqi-logo-kit.zip`) (FR51, FR52, UX-DR17)

**Given** all download cards
**When** inspected
**Then** each thumbnail image has descriptive `alt` text; download links use the `download` attribute where appropriate; card label text uses `--blue-primary` and Manrope at correct token scale

**Given** the page structure
**When** reviewed by the founder with an AI agent
**Then** adding a new news card requires only inserting a new card HTML block within the carousel container; adding a new download card requires inserting a card block within the correct section grid — no structural changes needed; the pattern is documented consistently enough to be reproducible via AI-assisted workflow (FR46, FR47)

**Given** the page on a 320px viewport
**When** rendered
**Then** the carousel scrolls horizontally without breaking layout; download card grids reflow to single-column on mobile; all content is accessible

---

### Story 3.2: About Us Page

As an investor,
I want to see the founding team — their faces, credentials, and institutional backing — so that Vasuqi becomes real people rather than a pitch deck.

**Acceptance Criteria:**

**Given** `about.html`
**When** the page loads
**Then** a "Why Väsuqi?" introductory section is present with a Syne heading (note: Ä in Väsuqi) and explanatory copy establishing the brand name origin context before the team is shown

**Given** the team grid
**When** rendered
**Then** it displays all 4 team members in a grid layout: Adarsh Raj (CEO), Jörg Vogel (CTO), Peter Holme Jensen (Advisor), Angela Zhang (Chief Scientific Advisor) — each with photo, role title, bio text, and LinkedIn profile link (FR20, FR21)

**Given** each team member photo
**When** the page loads
**Then** the photo is displayed inside a blob-shaped mask; `src/about.js` loads two blob SVG variants from `public/blobs/` (e.g. `blob-adarsh-a.svg`, `blob-adarsh-b.svg`) and uses a GSAP `attr: { d }` tween to morph between variants continuously using `WATER_DURATION.slow`, `WATER_EASE`, `repeat: -1`, `yoyo: true` (UX-DR7)

**Given** the blob morphing implementation
**When** reviewed before coding begins
**Then** both SVG blob variants for each team member share an identical path point count — this is verified as an acceptance criterion before `about.js` blob animation is written; if point counts differ, CSS `clip-path` morphing is used as fallback

**Given** each team member LinkedIn link
**When** clicked
**Then** it opens the correct LinkedIn profile in a new tab (`target="_blank" rel="noopener"`); the link has a visible label (not icon-only) or a descriptive `aria-label` (FR21)

**Given** team member photos
**When** inspected
**Then** each has descriptive `alt` text (name + role); blob SVG decorative elements have `aria-hidden="true"`

**Given** the page on mobile (below `md`)
**When** rendered
**Then** the team grid reflows to single-column; blob morphing continues; LinkedIn links remain thumb-reachable (minimum 44×44px touch target) (UX-DR12)

**Given** the founder maintaining team information
**When** they need to update a bio or photo
**Then** the change requires only editing the relevant HTML block and replacing the image file — no structural refactoring needed; `src/about.js` blob loading uses the predictable kebab-case filename pattern (FR48)

---

### Story 3.3: Contact Page

As an investor ready to make contact,
I want a form that collects my details and gives me clear confirmation it worked — and an immediately visible alternative if it doesn't,
So that I can always reach Vasuqi regardless of network or firewall conditions.

**Acceptance Criteria:**

**Given** `contact.html`
**When** the page loads
**Then** a brand mythology section is present before the form, explaining the origin of the name Vasuqi and its connection to Vasuki, the Hindu serpent king who churned the cosmic ocean — rendered in Syne heading + Manrope body at correct token scales (FR23)

**Given** the contact form
**When** inspected
**Then** it contains exactly 3 labelled fields: first name, email, and message; each field has an associated `<label>` element; all fields are required (FR24, FR32)

**Given** the contact form
**When** the visitor submits it
**Then** JavaScript intercepts the submit event (`e.preventDefault()`), POSTs to `FORMSPREE_ENDPOINT` from `src/config.js` using `fetch` with `Accept: application/json` header, and calls `showFormState()` based on the response — never relies on native HTML form POST (FR25)

**Given** a successful form submission (Formspree returns 2xx)
**When** `showFormState('success')` is called
**Then** a pre-existing success message element in the HTML becomes visible — it is not JS-injected; the message is human in tone and confirms the submission; the form fields are not cleared (preserving the submitted data in case the user needs to reference it)

**Given** a failed form submission (network error or non-2xx response)
**When** `showFormState('error')` is called
**Then** a pre-existing error message element in the HTML becomes visible — it is not JS-injected; the message is clear and non-alarming; it directs the visitor to the general enquiries contact information as an alternative (FR25, UX-DR6)

**Given** validation behaviour
**When** the visitor fills in fields
**Then** no inline validation fires on blur — validation occurs on submit only; browser native required-field validation is acceptable (UX-DR5)

**Given** the general enquiries block
**When** the contact page renders at any viewport width
**Then** the block (containing email address, phone number, and social links) is visible without scrolling past the form — it is positioned so a visitor whose form submission fails sees an alternative immediately (FR26, UX-DR6)

**Given** `src/config.js`
**When** the founder needs to swap the Formspree endpoint
**Then** changing `FORMSPREE_ENDPOINT` in `src/config.js` is the only required change — no modification to `contact.html` or `src/contact.js` logic is needed (FR49, NFR11)

**Given** the contact form and general enquiries block
**When** no personal data is examined in the codebase
**Then** no form data is stored client-side (no localStorage, no sessionStorage, no cookies) — data flows directly to Formspree and is not retained by the site (NFR10)

---

### Story 3.4: Supporting Pages Accessibility & Mobile Responsiveness

As any visitor using a keyboard, screen reader, or mobile device,
I want all three supporting pages to be fully operable and visually correct across all supported viewports and browsers,
So that no investor is blocked from completing their journey regardless of how they access the site.

**Acceptance Criteria:**

**Given** all interactive elements across `news-documentation.html`, `about.html`, and `contact.html` (nav links, download cards, carousel cards, LinkedIn links, form fields, submit button)
**When** navigated via keyboard Tab
**Then** each element receives focus in a logical order; visible focus rings in `--blue-primary` are displayed on all focused elements; no interactive element is keyboard-unreachable (FR30, NFR6, UX-DR11)

**Given** all images on the three supporting pages (hero image, team photos, document card thumbnails)
**When** inspected
**Then** meaningful images have descriptive `alt` text; decorative images are marked `aria-hidden="true"` or `alt=""` (FR31)

**Given** all text/background colour combinations on the three supporting pages
**When** tested against WCAG 2.1 AA
**Then** body text meets 4.5:1 minimum contrast; large text and UI components meet 3:1 minimum (NFR4, NFR5)

**Given** all three supporting pages at 320px viewport width
**When** rendered
**Then** all content is accessible by scroll, no horizontal overflow, single-column layouts stack correctly, and all interactive elements have minimum 44×44px touch targets (FR5, UX-DR12)

**Given** all three supporting pages
**When** rendered in last 2 major versions of Chrome, Firefox, Safari (including Safari 15+), and Edge
**Then** all content displays correctly; glassmorphism components render with `-webkit-backdrop-filter` on Safari; no layout or functionality breaks (NFR12)

**Given** the contact form
**When** rendered on mobile
**Then** all inputs are full-width; the submit button is thumb-reachable; the general enquiries block is visible without scrolling past the form (UX-DR5, UX-DR6)

---

## Epic 4: Design Manual & Founder Handoff

The founder opens the project in any AI coding tool and the AI already has full brand context — no manual steps required. The design manual provides task-based guidance, Component Derivation Protocol, four material languages, anti-list, North Star Rule, and evolution triggers.

### Story 4.1: Design Manual Core Structure & Onboarding

As the founder,
I want the design manual to open with a plain-language explanation of how the automatic AI context loading works and the conceptual reasoning layer behind every design decision,
So that I understand what my AI tool already knows when I open the project and can rely on it to make brand-consistent decisions.

**Acceptance Criteria:**

**Given** `docs/design-manual.md`
**When** the founder opens the project in Claude Code, Cursor, or GitHub Copilot
**Then** the AI instruction file (`CLAUDE.md`, `.cursorrules`, or `.github/copilot-instructions.md`) automatically instructs the AI to read `docs/design-manual.md` in full before any task — the founder types their request without any additional activation step (FR41)

**Given** the onboarding section (Part 1 of the manual)
**When** read by the founder
**Then** it explains in plain language: (1) that the AI instruction files handle context loading automatically, (2) what the AI already knows when the founder opens the project, (3) what the founder should do when starting a new task (just describe what they want), and (4) how to verify the AI has read the manual

**Given** the four material languages section
**When** read by the AI agent
**Then** it documents Water, Glass, Blueprint, and Light as a reasoning layer above component rules — each language has its visual character, primary use, and the principles behind it; Light's relationship to Water physics and Glass expression is explicitly documented; the AI can derive decisions for novel situations not covered elsewhere in the manual by reasoning from these languages (FR39)

**Given** the North Star Rule
**When** documented in the manual
**Then** it is stated as a single authoritative override clause: any new addition must fit the brand identity, visual identity, and tone of voice — applied whenever no specific rule addresses the situation; it is positioned prominently so the AI treats it as the highest-priority rule (FR44)

**Given** the manual's overall length
**When** the document is complete (all 3 stories done)
**Then** the total line count does not exceed approximately 480 lines — the document fits within a single LLM context window (NFR15)

---

### Story 4.2: Task-Based Guidance & Component Derivation Protocol

As an AI agent working on the Vasuqi project,
I want task-based instructions that tell me exactly what to do when adding a section, writing copy, creating a component, or adding media — and a derivation protocol for situations not explicitly covered,
So that I produce brand-consistent output on the first attempt without asking the founder for design decisions.

**Acceptance Criteria:**

**Given** the task-based guidance section (Part 2 of the manual)
**When** read by the AI agent
**Then** it contains four named task guides, each as a concise checklist or rule set:
- **Adding a new section** — structure, spacing, which material language to use, how to wire the section ID to the shared namespace
- **Writing copy** — tone of voice rules, what to avoid (hedging, vague claims, generic cleantech language), the golden circle order (WHY → HOW → WHAT)
- **Creating a new component** — which token values to apply, how to pick a material language, the Same Designer test
- **Adding media** — image formats, alt text requirements, where files go in `public/`, how to reference assets in HTML (FR37)

**Given** the Component Derivation Protocol
**When** read by the AI agent
**Then** it presents a 5-step IF/THEN chain: (1) identify the material language, (2) determine if structural/decorative/interactive, (3) apply that language's visual properties from `design-tokens.css`, (4) apply water physics motion if animated, (5) apply the Same Designer test — the AI derives a solution consistent with the existing system rather than defaulting to a generic web pattern (FR38)

**Given** the elements requiring human review section
**When** read by the AI agent
**Then** it explicitly lists categories of changes that must not be made autonomously — including: introducing new colour tokens, changing the palette, modifying the shared namespace (section IDs), altering the navigation structure, and any change affecting the design manual itself (FR40)

**Given** a new component produced via the Component Derivation Protocol
**When** the Same Designer test is applied
**Then** the component reads as continuous with the original site — it uses only tokens from `design-tokens.css`, follows the correct material language, and would not be identifiable as an addition by a different designer (NFR17)

**Given** the JS animation library stack
**When** documented in this section
**Then** GSAP 3.15.0 and its plugins (ScrollTrigger, SplitText), the water physics constants (`WATER_DURATION`, `WATER_EASE`, `WATER_STAGGER`), and the blob morphing approach are explicitly named — an AI agent knows which library and constants to use for any animation task without guessing

---

### Story 4.3: Anti-List, Evolution Triggers & Living Components Section

As an AI agent and the founder,
I want the design manual to contain explicit rules about what never to do, clear triggers for when the design system should evolve, and a place to document new components as the site grows,
So that the brand is protected from accidental degradation over time and the manual stays accurate as the site expands.

**Acceptance Criteria:**

**Given** the anti-list section
**When** read by the AI agent
**Then** it contains a minimum of 12 named "never do this" rules covering at minimum: pure black (`#000000`), pure white (`#ffffff`), any colour not in the 10-token palette, dark mode, AI-default gradients (blue-to-purple, blue-to-teal), generic card components (rounded corners + drop shadow + white background), navigation with more than 4 top-level items, hover animations that use spring/bounce/snap easing, adding `prefers-reduced-motion` media queries (deliberate design decision), inline `style` attributes in HTML, magic numbers in CSS (values not from `design-tokens.css`), and any font other than Syne and Manrope (FR43)

**Given** the Palette Closure Rule within the anti-list
**When** documented
**Then** it states explicitly: the 10-token palette is closed — no new colour tokens are introduced for Phase 1; any situation that seems to require a new colour is solved by combining existing tokens or adjusting opacity

**Given** the evolution triggers section
**When** read
**Then** it documents named product milestones (not dates) that define when the design system should be intentionally updated, including: (1) introduction of real product photography — trigger: working prototype exists; (2) retirement of the blueprint aesthetic — trigger: Phase 2 brand evolution; (3) shift from investor to B2B operator tone — trigger: pilot program launch (FR45)

**Given** the living components section
**When** a new component is added to the site via AI-assisted development
**Then** the design manual includes a clearly labelled section where the founder (or AI agent) documents the new component — its name, material language, token usage, and any derivation notes — before the coding session ends; the section exists as a named placeholder even when empty (FR42)

**Given** the complete `docs/design-manual.md`
**When** the total line count is verified
**Then** all four parts (onboarding, material languages + North Star, task guides + derivation protocol, anti-list + evolution triggers + living components) together do not exceed approximately 480 lines (NFR15)

**Given** the complete manual
**When** an AI agent reads it from top to bottom
**Then** it has everything needed to: add a news carousel card, add a download card, update a team member, create a new section, and derive a new component — without asking the founder a single design question
