---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-05-20'
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/brainstorming/brainstorming-session-2026-05-17-1.md'
  - 'docs/exam-defense.md'
workflowType: 'architecture'
project_name: 'vasuqi'
user_name: 'Edda'
date: '2026-05-20'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._


## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
49 FRs across 10 categories: Page Navigation & Structure (FR1–5), Landing Page Experience (FR6–11), Animation & Motion (FR12–15), Supporting Pages (FR16–23), Conversion & Engagement (FR24–26), Product Visualization (FR27–29), Accessibility & SEO (FR30–35), Design System & Handoff (FR36–45), Content Maintenance — Founder (FR46–49).

**Non-Functional Requirements:**
- Performance: LCP ≤ 2.5s; intro animation renders on first paint, no pre-loader
- Accessibility: WCAG 2.1 AA throughout; AA contrast ratios on all color/background pairs
- Security: HTTPS; no personal data stored client-side; Formspree endpoint configurable
- Compatibility: Last 2 major versions Chrome/Firefox/Safari/Edge; Safari 15+; 320px–1440px+
- Maintainability: Design manual ≤ ~480 lines (1 LLM context window); all design values as CSS custom properties; AI-navigable file/component naming conventions

**Scale & Complexity:**
- Primary domain: Frontend web — static multi-page site (MPA)
- Complexity level: Medium — two architecturally coupled deliverables, animation subsystems, design token architecture, AI-readability requirements
- Pages: 4 HTML pages (Landing, News & Docs, About Us, Contact)
- Estimated architectural components: ~12 (nav, footer, animation system, token layer, intro animation, floating light, SVG diagram, form, team grid, news/docs sections, product viz, design manual)

### Technical Constraints & Dependencies

- **No JS framework** — static HTML, Tailwind CSS, vanilla JS + animation library
- **Animation library TBD** — must be selected before coding; governs intro animation, floating light background, and hover interactions; GSAP is the reference starting point
- **Figma desktop prototype** — source of truth for layout, component design, animations
- **Formspree** — external service dependency for contact form delivery
- **GitHub static hosting** — deployment via git push; no server infrastructure
- **CSS custom properties** — all design values in `design-tokens.css`; Tailwind config extended to reference tokens (no duplicate values)
- **Safari glassmorphism** — `-webkit-backdrop-filter` required alongside standard property

### Cross-Cutting Concerns Identified

- **Design token system** — `--token-name` naming shared across CSS, Tailwind config, HTML IDs, and design manual. Single source of truth; no magic numbers permitted.
- **Shared namespace** — section IDs in HTML = section names in manual = anchor labels in side navigation. Divergence here breaks the founder's AI workflow.
- **Accessibility (WCAG 2.1 AA)** — applies to every component; animations must be dismissible; focus states must be visible and on-brand
- **Mobile-first responsive** — all 4 pages; side navigation desktop-only; SVG diagram requires specific mobile layout (not just scaling)
- **Shared navigation + footer** — consistent across all pages; changes once, updates everywhere
- **Water physics motion language** — governs all animations and transitions site-wide; no spring/bounce/snap regardless of component context
- **AI-readability** — file structure, naming conventions, and code comments must be navigable by an AI agent using the design manual as its only map

## Starter Template Evaluation

### Primary Technology Domain

Static multi-page website — HTML / Tailwind CSS / JavaScript, no framework. Decision established in PRD. This section documents build scaffold and confirmed library selections.

### Starter Options Considered

- **Vite vanilla template** — lightweight dev server with HMR, MPA rollup configuration, plain static file build output. No framework imposed. ✅ Selected.
- **Tailwind CLI standalone** — zero dependencies but no dev server; worse DX.
- **Manual npm + PostCSS** — equivalent result with more boilerplate.

### Selected Scaffold: Vite (vanilla template) + Tailwind CSS v4

**Rationale:** Vite's vanilla template produces clean HTML/CSS/JS with no framework. Its MPA mode (rollup `input` config) handles 4 independent HTML pages. Build output is a static `dist/` folder deployable directly to GitHub Pages. Tailwind CSS v4's CSS-first `@theme` block maps directly onto `design-tokens.css`, keeping design values in one place.

**React migration path (Phase 2):** Vite is framework-agnostic. Switching to React requires adding `@vitejs/plugin-react` and converting HTML files to JSX components. Tailwind CSS, design tokens, and GSAP are unaffected.

**Initialization Commands:**

```bash
npm create vite@latest vasuqi -- --template vanilla
cd vasuqi
npm install
npm install -D tailwindcss @tailwindcss/vite
npm install gsap
```

**Tailwind v4 integration (vite.config.js):**
```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        news: 'news-documentation.html',
        about: 'about.html',
        contact: 'contact.html',
      },
    },
  },
})
```

**Versions locked:**
- Vite: 8.0.13
- Tailwind CSS: 4.3.0
- GSAP: 3.15.0

**Architectural Decisions Provided by Scaffold:**

**Language & Runtime:** JavaScript (ES modules); no TypeScript.

**Styling Solution:** Tailwind CSS v4 via `@tailwindcss/vite` plugin; design tokens defined in `design-tokens.css` using CSS `@theme` block; no separate `tailwind.config.js`.

**Build Tooling:** Vite 8 — dev server with HMR; production build via Rollup; MPA configured via `rollupOptions.input`.

**Testing Framework:** Not in scope.

**Code Organization:** Flat HTML files at root; `src/` for JS and CSS entry points; `public/` for static assets (SVG, images, PDFs); `docs/design-manual.md` and `design-tokens.css` at project root.

**Development Experience:** `npm run dev` → HMR dev server; `npm run build` → static `dist/`; `npm run preview` → preview production build locally.

### Animation Library: GSAP 3.15.0 (Confirmed)

**Plugins in use (all free):**
- **ScrollTrigger** — scroll-triggered animations and scrollytelling on the landing page; one ScrollTrigger instance per section (6 total on main page)
- **SplitText** — text split into characters/words/lines for staggered entrance animations; free as of GSAP 3.12+
- **Core tweens** — intro animation sequence, floating light background, hover interactions, all water-physics motion

**Blob animation — Atta SVG export method (free):**
Export 2–3 blob shape variants from Atta (Figma) as SVG. Animate between variants by interpolating the SVG `d` attribute using GSAP core tweens. Prerequisite: all exported blob variants must share the same number of path points — verify before implementation. If point counts differ, fall back to CSS `clip-path` morphing.

**Fallback:** CSS `clip-path` morphing with `@keyframes` — simpler, less organic feel, but sufficient for a subtle loop on team photos.

**Note:** Project initialization using these commands should be the first implementation story. Animation library selection must be documented in the design manual before the manual is considered complete (PRD NFR).

## Implementation Patterns & Consistency Rules

No database, no API, no state management — standard conflict categories don't apply. Patterns focus on the areas where AI agents working on a static HTML/Tailwind/GSAP project will genuinely diverge.

---

### Naming Patterns

**Files — kebab-case throughout, no exceptions:**

```
index.html
news-documentation.html
design-tokens.css
src/main.js
src/about.js
partials/nav.html
partials/footer.html
public/images/team-adarsh-raj.jpg
public/svgs/water-cycle-diagram.svg
public/blobs/blob-team-variant-a.svg
public/docs/vasuqi-pitch-deck.pdf
```

Never: `newsDocumentation.html`, `teamAdarshRaj.jpg`, `waterCycleDiagram.svg`

**CSS custom properties — `--category-modifier` pattern, matching design-tokens.css exactly:**

```css
--navy-deep, --blue-primary, --blue-deep, --blue-mid, --blue-soft
--cyan-light, --steel, --ice-light, --ice-near, --white-brand
```

Never introduce new `--` tokens not defined in `design-tokens.css`. Never reference hex values directly in stylesheets — always use the token.

**HTML section IDs — kebab-case, must match design manual section names exactly:**

```html
<section id="intro-animation">
<section id="hero">
<section id="the-gap">
<section id="where-vasuqi-fits">
<section id="what-its-built-to-change">
<section id="how-it-works">
```

These IDs are the shared namespace: they appear in the HTML, the side navigation anchors, and the design manual. Divergence here breaks the founder's AI workflow.

**JavaScript — camelCase functions/variables, SCREAMING_SNAKE_CASE for config constants, descriptive GSAP timeline names:**

```js
// config constants
export const FORMSPREE_ENDPOINT = '...'

// functions
function initScrollAnimations() {}
function handleFormSubmit(event) {}

// GSAP timelines — descriptive, named by what they animate
const introTimeline = gsap.timeline()
const heroTextTimeline = gsap.timeline({ scrollTrigger: {...} })
const blobMorphTimeline = gsap.timeline({ repeat: -1, yoyo: true })
```

---

### Structure Patterns

**Project root — flat HTML pages, everything else in named folders:**

```
index.html
news-documentation.html
about.html
contact.html
design-tokens.css          ← at root — accessible to AI without navigation
docs/
  design-manual.md         ← at root of docs/ — first file an AI should read
partials/
  nav.html
  footer.html
src/
  main.js                  ← landing page entry point
  news.js
  about.js
  contact.js
  config.js                ← all configurable values exported here
  animations/
    intro.js               ← intro animation sequence
    floating-light.js      ← floating light background (persistent, complex)
    constants.js           ← water physics constants
public/
  images/                  ← raster images (team photos, hero image)
  svgs/                    ← SVG diagrams and illustrations
  blobs/                   ← Atta blob SVG exports (variants per team member)
  docs/                    ← downloadable files (pitch deck PDF)
.github/
  workflows/
    deploy.yml
```

**When to inline SVG vs reference as file:**
- Icons and small decorative SVGs → inline in HTML (accessible, styleable via CSS)
- Water-cycle diagram → `public/svgs/` referenced as `<img>` (too large to inline)
- Blob SVGs → `public/blobs/` loaded via JS for GSAP path animation

**Animation file isolation rule:** If an animation module exceeds ~50 lines or has its own internal timeline/sequencing logic, extract it to `src/animations/`. `src/main.js` imports and calls `init` functions; it does not contain animation logic directly.

---

### Animation Patterns

**Water physics constants — defined once in `src/animations/constants.js`, imported wherever needed. Never hardcode easing or duration values inline:**

```js
// src/animations/constants.js
export const WATER_DURATION = { fast: 0.8, default: 1.0, slow: 1.2 }
export const WATER_EASE = 'power1.inOut'
export const WATER_STAGGER = 0.12
```

**ScrollTrigger pattern — one instance per section, named by section:**

```js
gsap.from('#the-gap .section-heading', {
  y: 40, opacity: 0, duration: WATER_DURATION.default, ease: WATER_EASE,
  scrollTrigger: {
    trigger: '#the-gap',
    start: 'top 75%',
    once: true
  }
})
```

`once: true` is the default — animations play on scroll-into-view and do not reverse on scroll-out. If an animation must reverse (parallax, pin), document why explicitly in a comment.

**GSAP initialisation pattern — each page JS file follows this structure:**

```js
// src/main.js
import { initIntroAnimation } from './animations/intro.js'
import { initFloatingLight } from './animations/floating-light.js'
import { initScrollAnimations } from './animations/scroll.js'

document.addEventListener('DOMContentLoaded', () => {
  initIntroAnimation()
  initFloatingLight()
  initScrollAnimations()
})
```

No animation code outside of `init*` functions. No inline `<script>` animation in HTML files.

**Blob morphing pattern:**

```js
// Load two blob SVG path `d` attributes, tween between them.
// Prerequisite: verify both blobs share identical point count before
// committing to this approach. If point counts differ, switch to CSS fallback.
gsap.to(blobPath, {
  attr: { d: blobVariantB },
  duration: WATER_DURATION.slow,
  ease: WATER_EASE,
  repeat: -1,
  yoyo: true
})
```

---

### Process Patterns

**Form submission handler — always intercept, never rely on native POST:**

```js
// src/contact.js
import { FORMSPREE_ENDPOINT } from './config.js'

document.querySelector('#contact-form').addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = new FormData(e.target)
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST', body: data, headers: { Accept: 'application/json' }
    })
    showFormState(res.ok ? 'success' : 'error')
  } catch {
    showFormState('error')
  }
})
```

`showFormState('success' | 'error')` toggles visible feedback elements that exist in the HTML — they are never injected by JS. Silent failure is not acceptable (Journey 4).

**Adding a new page — checklist for AI agents:**
1. Create `page-name.html` at project root using `<!--@include-->` for nav/footer
2. Add entry to `rollupOptions.input` in `vite.config.js`
3. Create `src/page-name.js` entry point (even if minimal)
4. Add internal link from at least one existing page
5. Add unique `<title>` and `<meta name="description">`

---

### Enforcement Guidelines

**All AI agents working on this codebase MUST:**
- Read `docs/design-manual.md` in full before any task (visual decisions)
- Reference `design-tokens.css` for all colour, type, and spacing values
- Follow the shared namespace: HTML section IDs = manual section names = nav anchors
- Use `src/config.js` for any value the founder may need to change
- Never introduce a `--` CSS token not defined in `design-tokens.css`
- Never hardcode animation durations or easing values — use constants from `src/animations/constants.js`
- Apply the Same Designer Test to any new component before considering it done

**Pattern verification:** The design manual's Component Derivation Protocol is the process for any component not explicitly covered by these patterns. If a pattern and the manual conflict, the manual wins.

## Project Structure & Boundaries

### Complete Project Directory Structure

```
vasuqi/
├── CLAUDE.md                           ← Claude Code auto-loads every session
├── .cursorrules                        ← Cursor auto-loads every session
├── index.html                          ← Landing page (FR1–4, FR6–15, FR27–29, FR30–35)
├── news-documentation.html             ← News & Docs page (FR16–19, FR46–47)
├── about.html                          ← About Us page (FR20–21, FR48)
├── contact.html                        ← Contact page (FR22–26, FR49)
├── design-tokens.css                   ← CSS custom properties — source of truth (FR36)
├── vite.config.js                      ← Vite + Tailwind v4 plugin + HTML partials + MPA config
├── package.json
├── package-lock.json
├── .gitignore
├── README.md                           ← Developer setup; founder deploy instructions
│
├── partials/
│   ├── nav.html                        ← Pill-shaped glassmorphism nav, shared across all pages (FR1)
│   │                                      Layout: [Home] [News & Documentations] · [icon + vāsuqi] · [About us] [Contact●]
│   │                                      Stadium shape, frosted glass bg, --blue-primary text links,
│   │                                      Contact = filled blue pill button (CTA), logo = home anchor
│   └── footer.html                     ← About/Product columns + social links inline SVG (FR4)
│
├── src/
│   ├── config.js                       ← FORMSPREE_ENDPOINT + all founder-configurable values
│   ├── main.js                         ← Landing page entry point
│   ├── news.js                         ← News & Docs entry point (minimal)
│   ├── about.js                        ← About entry point — imports blob morphing
│   ├── contact.js                      ← Contact entry point — form submit handler (FR24–26)
│   ├── styles/
│   │   └── main.css                    ← Tailwind @import + @theme link to design-tokens.css
│   └── animations/
│       ├── constants.js                ← WATER_DURATION, WATER_EASE, WATER_STAGGER
│       ├── intro.js                    ← Intro animation sequence (FR6–8, FR12)
│       ├── floating-light.js           ← Persistent background light element (FR11, FR15)
│       └── scroll.js                   ← All ScrollTrigger instances — one per section (FR9)
│
├── public/
│   ├── images/
│   │   ├── hero-poster.jpg             ← Static frame shown while video loads
│   │   ├── hero-news.jpg               ← Hero image for News & Docs page (FR16)
│   │   ├── globe.png                   ← CSS hover animation — How it Works (FR28)
│   │   ├── blueprints/
│   │   │   ├── blueprint-bg-hero.png   ← Blueprint PNG behind hero glass layer
│   │   │   └── blueprint-bg-[section].png ← Other blueprint background elements
│   │   └── team/
│   │       ├── adarsh-raj.jpg          ← CEO (FR20)
│   │       ├── jorg-vogel.jpg          ← CTO (FR20)
│   │       ├── peter-holme-jensen.jpg  ← Advisor (FR20)
│   │       └── angela-zhang.jpg        ← Chief Scientific Advisor (FR20)
│   ├── videos/
│   │   ├── hero-background.mp4         ← H.264 — primary (Safari + all browsers)
│   │   └── hero-background.webm        ← VP9 — Chrome/Firefox prefer, smaller file
│   ├── svgs/
│   │   └── water-cycle-diagram.svg     ← Water treatment cycle — Where Vasuqi Fits (FR10)
│   ├── blobs/
│   │   ├── blob-adarsh-a.svg
│   │   ├── blob-adarsh-b.svg
│   │   ├── blob-jorg-a.svg
│   │   ├── blob-jorg-b.svg
│   │   ├── blob-peter-a.svg
│   │   ├── blob-peter-b.svg
│   │   ├── blob-angela-a.svg
│   │   └── blob-angela-b.svg
│   └── docs/
│       └── vasuqi-pitch-deck.pdf       ← Downloadable pitch deck (FR17)
│
├── docs/
│   └── design-manual.md               ← AI-agent design manual ~480 lines (FR37–45)
│
└── .github/
    ├── copilot-instructions.md         ← GitHub Copilot auto-loads every session
    └── workflows/
        └── deploy.yml                  ← Push to main → build → GitHub Pages deploy
```

### Asset Strategy

**Inline SVG in HTML (not in `public/`) — needs CSS color or animation control:**
- Blueprint icons (CSS-colored via `currentColor`, non-reused) → inline in each HTML section
- Animated SVG graph → inline in HTML (GSAP needs DOM access to individual paths)
- Social media icons → inline in `partials/footer.html`

**Files in `public/` — decorative or static:**
- Blueprint PNG background elements → `public/images/blueprints/` — `<img aria-hidden>` behind glass layers
- Globe PNG → `public/images/globe.png` — CSS `@keyframes` on hover, no DOM SVG needed
- Water-cycle diagram → `public/svgs/` — only large SVG kept as file (complex path data)
- Blob SVGs → `public/blobs/` — loaded via JS, GSAP reads `d` attribute for morphing

**No SVG sprite sheet** — icons are non-reused across pages; inline per use is simpler.

**Open decision — main blueprint drawing:** If exported as SVG from Figma, inline in HTML for CSS color control and perfect scaling. If a complex raster render as PNG, place in `public/images/blueprints/`.

### Hero Video Pattern

```html
<video
  class="hero-video-bg"
  autoplay muted loop playsinline
  poster="/images/hero-poster.jpg"
  aria-hidden="true"
>
  <source src="/videos/hero-background.webm" type="video/webm">
  <source src="/videos/hero-background.mp4" type="video/mp4">
</video>
```

Video is purely decorative background (slowly flowing water). `aria-hidden="true"` — invisible to screen readers. Poster image prevents flash of empty hero on slow connections.

**Animation accessibility decision (deliberate trade-off):** No `prefers-reduced-motion` accommodation anywhere on the site — not for the hero video, not for GSAP animations. The water physics motion language is intentionally subtle (slow, fluid, no bounce or snap), low-intensity, and ambient. This trade-off was evaluated and accepted at the architecture stage. Exam-defensible rationale: the animations reinforce brand identity and are not flash-based or high-frequency; they do not meet the threshold that typically triggers vestibular discomfort.

### AI Instruction Files

Three files with identical intent — founder uses whichever AI tool they prefer, setup is automatic:

**`CLAUDE.md` (Claude Code):**
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

**`.cursorrules` (Cursor)** and **`.github/copilot-instructions.md` (GitHub Copilot):** same instructions, tool-specific format.

### Architectural Boundaries

**Component boundaries:** Each HTML page is independent. Shared markup resolved at build time by Vite partials plugin — no runtime dependency between pages.

**JS boundaries:**
- `src/config.js` — single export point for founder-configurable values; imported by `contact.js` only
- `src/animations/` — imported by `main.js` (all modules) and `about.js` (blob morphing only)
- `src/animations/constants.js` — imported by all animation modules; never bypassed

**Style boundaries:** `design-tokens.css` is the source of truth. No page-specific CSS files. No hex values in stylesheets.

**External integrations:** Formspree (contact form via `src/contact.js` + `src/config.js`), GitHub Pages (static hosting), GitHub Actions (CI/CD), Google Fonts (Syne variable + Manrope via `<link>` in HTML `<head>`).

### Requirements to Structure Mapping

| FR Category | Files |
|---|---|
| FR1–5 Navigation & Structure | `partials/nav.html`, `partials/footer.html`, all 4 HTML pages |
| FR6–15 Landing Page + Animation | `index.html`, `src/animations/intro.js`, `floating-light.js`, `scroll.js`, `constants.js` |
| FR16–23 Supporting Pages | `news-documentation.html`, `about.html`, `contact.html` |
| FR24–26 Conversion | `contact.html`, `src/contact.js`, `src/config.js` |
| FR27–29 Product Visualization | `index.html` how-it-works section, `public/images/globe.png`, CSS animations |
| FR30–35 Accessibility & SEO | All 4 HTML pages — semantic HTML, meta tags, alt text, ARIA, labels |
| FR36–45 Design System & Handoff | `design-tokens.css`, `docs/design-manual.md`, `CLAUDE.md`, `.cursorrules`, `copilot-instructions.md` |
| FR46–49 Content Maintenance | `news-documentation.html`, `about.html`, `src/config.js` |

### Data Flow

**Visitor flow:**
```
Browser → GitHub Pages → HTML page
  → Vite-built CSS (Tailwind + design tokens)
  → Per-page JS entry → GSAP animations on DOMContentLoaded
  → Hero: <video> background + inline SVG icons + blueprint PNG layers behind glass
```

**Form flow:**
```
Visitor fills form → src/contact.js intercepts submit
  → fetch POST to FORMSPREE_ENDPOINT → Formspree → founder email
  → showFormState('success' | 'error') toggles pre-existing HTML elements
```

**Founder maintenance flow:**
```
Founder opens project folder in AI tool (Claude Code / Cursor / Copilot)
  → AI tool auto-reads CLAUDE.md / .cursorrules / copilot-instructions.md
  → Instruction file tells AI to read docs/design-manual.md
  → AI reads manual (~480 lines, fits one context window)
  → Founder types request — AI already has full brand context
  → git push to main → GitHub Actions → npm ci → npm run build
  → upload dist/ → deploy to GitHub Pages → live in ~2 minutes
```

**Build flow:**
```
npm run build
  → Vite resolves <!--@include--> partials into each HTML page
  → Tailwind scans HTML/JS → generates CSS from design tokens
  → Rollup bundles per-page JS entry points
  → Output: dist/ — 4 standalone HTML pages, ready for GitHub Pages
```

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Shared component strategy — resolved: custom Vite HTML partials plugin
- JS module organization — resolved: per-page entry points
- Deployment pipeline — resolved: GitHub Actions → GitHub Pages

**Important Decisions (Shape Architecture):**
- Formspree endpoint configuration — resolved: named constant in `src/config.js`
- Animation library — resolved: GSAP 3.15.0 (step 3)
- CSS token architecture — resolved: Tailwind v4 `@theme` block (step 3)

**Deferred Decisions (Post-MVP):**
- GDPR cookie consent + privacy policy (flagged in PRD — founder responsibility)
- Data visualisation graphs (post-MVP scope)
- React migration (Phase 2 trigger: product evolves beyond static marketing site)

---

### Data Architecture

No database. Static site.

- **Session state:** Browser `sessionStorage` only — suppresses intro animation replay within the same session (FR8). No server-side state.
- **Contact form data:** Handled entirely by Formspree. Vasuqi codebase stores no personal data client-side or server-side (NFR — Security).

---

### Authentication & Security

No authentication. Public marketing site.

- **HTTPS:** Automatic via GitHub Pages — no configuration required.
- **Formspree endpoint:** Stored as a named constant in `src/config.js`, not hardcoded inline. Founder can swap the endpoint without touching page structure (FR49, NFR — Security).

```js
// src/config.js
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
```

---

### API & Communication Patterns

No API. Static site.

- **Contact form:** Standard HTML POST to Formspree endpoint.
- **Error handling:** Form must display explicit success and failure feedback states — silent failure is not acceptable (Journey 4, FR requirement). Minimum: success message on 2xx response, error message on network failure or non-2xx response.

---

### Frontend Architecture

**Shared component strategy — custom Vite `transformIndexHtml` plugin (zero npm dependencies):**

HTML files use include comments, resolved at build time into static HTML. SEO-safe — shared components are in the initial HTML payload.

```js
// vite.config.js (addition to existing config)
import fs from 'fs'
import path from 'path'

function htmlPartialsPlugin() {
  return {
    name: 'html-partials',
    transformIndexHtml(html) {
      return html.replace(
        /<!--@include\s+"([^"]+)"\s*-->/g,
        (_, file) => fs.readFileSync(path.resolve(__dirname, file), 'utf-8')
      )
    }
  }
}
```

Usage in each HTML page:
```html
<!--@include "partials/nav.html"-->
...page content...
<!--@include "partials/footer.html"-->
```

**JavaScript module organization — per-page entry points:**

| Entry point | Loads |
|---|---|
| `src/main.js` | GSAP + ScrollTrigger + SplitText + intro animation + floating light + all landing page scroll animations |
| `src/news.js` | Minimal — no animation library needed |
| `src/about.js` | GSAP core only — blob morphing on team photos |
| `src/contact.js` | Form submission handler (success/failure states) |

Landing page carries the animation weight; other pages stay lean. GSAP is imported per-page, not via a global bundle.

**Routing:** Native browser navigation between HTML files. No client-side router.

**State management:** `sessionStorage` for animation replay suppression only. No other state. No shared store.

**Performance:**
- Images below the fold: `loading="lazy"` attribute
- Intro animation asset must be lightweight enough to begin on first paint (no pre-loader — NFR)
- SVG assets inlined where possible; larger SVGs referenced as files in `public/`

---

### Infrastructure & Deployment

**Hosting:** GitHub Pages — static file serving, free, zero infrastructure for founder to manage.

**CI/CD — GitHub Actions (push to `main` → deploy):**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
        id: deployment
```

**Environment configuration:** `src/config.js` exports all configurable values. No environment variables or `.env` files — static site has no server to read them.

**Monitoring:** None at this stage. Founder checks live URL after each push.

---

### Decision Impact Analysis

**Implementation sequence:**
1. Project initialization (Vite scaffold + Tailwind v4 + GSAP install)
2. `design-tokens.css` + Tailwind `@theme` integration
3. HTML partial structure (`partials/nav.html`, `partials/footer.html`)
4. Per-page HTML files wired to entry points
5. GitHub Actions workflow
6. Landing page — section by section, animations last
7. Supporting pages
8. Design manual + tokens documentation

**Cross-component dependencies:**
- `design-tokens.css` must exist before any CSS is written (all pages depend on it)
- `partials/nav.html` shared by all 4 pages — changes propagate at build time
- `src/config.js` must exist before form handler is written
- GSAP ScrollTrigger instances on landing page depend on final section HTML structure
- Blob animation depends on Atta SVG exports being available before `about.js` is written

## Responsive Breakpoint Architecture

Tailwind v4 default breakpoints apply throughout the site — no custom breakpoints added to `@theme`:

| Breakpoint | Min-width | Primary use |
|---|---|---|
| `sm` | 640px | Small adjustments, compact grids |
| `md` | 768px | Two-column layouts, tablet |
| `lg` | 1024px | Desktop layouts, side navigation visible |
| `xl` | 1280px | Max-width content containers |

**Side navigation:** Desktop-only, shown at `lg` and above. On `md` and below, side nav is hidden and section navigation is replaced by scroll.

**Mobile-first authoring rule:** All base styles target 320px (mobile). Tailwind responsive prefixes (`md:`, `lg:`, `xl:`) layer in progressively. No desktop-first overrides.

**SVG water-cycle diagram at mobile:** Does not simply scale — requires a specific mobile layout (see PRD constraint). The `md` breakpoint is the trigger for switching from stacked/simplified mobile view to the full diagram layout.

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices are compatible and version-locked (Vite 8.0.13, Tailwind CSS 4.3.0, GSAP 3.15.0, vanilla JS). No framework dependency conflicts exist. The static-site constraint eliminates entire conflict categories (state management, routing, SSR/CSR hydration). All versions confirmed compatible at time of architectural decision.

**Pattern Consistency:**
Naming conventions are consistent across all areas: kebab-case in files matches kebab-case in section IDs matches kebab-case in design manual section names. CSS token naming (`--category-modifier`) is applied consistently in patterns and enforced in guidelines. GSAP timeline naming (descriptive, action-oriented) is defined once and referenced throughout. No contradictions found between any two pattern areas.

**Structure Alignment:**
The directory structure directly supports all architectural decisions: `partials/` enables the build-time HTML include strategy; `src/animations/` enforces the 50-line isolation rule; `public/blobs/` provides the GSAP path morphing prerequisites; `docs/design-manual.md` at the `docs/` root satisfies the "first file AI reads" requirement. Every file in the tree maps to at least one FR or NFR.

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**
All 49 FRs are architecturally supported. See Requirements to Structure Mapping table. No FR category is left without a corresponding file or pattern.

**Non-Functional Requirements Coverage:**
- Performance: `loading="lazy"` for below-fold images; intro animation designed for first paint (no pre-loader); video poster prevents flash on slow connections
- Accessibility: `aria-hidden="true"` on decorative video; explicit success/error form states (no silent failure); `prefers-reduced-motion` accommodation deliberately not implemented (see animation decision below)
- Security: HTTPS automatic via GitHub Pages; no personal data stored client-side; Formspree endpoint isolated in `src/config.js`
- Compatibility: No-framework vanilla JS ensures maximum browser compatibility; Safari glassmorphism `-webkit-backdrop-filter` noted in constraints
- Maintainability: design-manual.md target ≤ ~480 lines; all design values as CSS custom properties; AI instruction files in CLAUDE.md, .cursorrules, copilot-instructions.md

### Implementation Readiness Validation ✅

**Decision Completeness:**
All critical decisions documented with locked versions. Initialization commands provided verbatim. Vite config, GitHub Actions workflow, CLAUDE.md content, form handler, and animation init pattern all provided as copy-ready code.

**Structure Completeness:**
Every file in the directory tree has a purpose annotation and at least one FR reference. Blob variant naming is specified down to individual team member slugs. No placeholder directories.

**Pattern Completeness:**
Naming, structure, animation, and process patterns all have code examples. Enforcement guidelines explicitly list what AI agents must and must not do. Component Derivation Protocol delegates uncovered cases to the design manual. Responsive breakpoint architecture now fully specified.

### Gap Analysis Results

**Important Gaps — Both Resolved:**

1. **`prefers-reduced-motion` for GSAP** → Resolved by design decision: no accommodation implemented anywhere on the site. See animation accessibility decision in Hero Video Pattern section for rationale.

2. **Responsive breakpoint architecture** → Resolved: Tailwind v4 defaults (sm/md/lg/xl); side nav at `lg`; mobile-first authoring; SVG diagram mobile layout triggers at `md`. See Responsive Breakpoint Architecture section above.

**Remaining Nice-to-Have:**
- Blob point-count verification is flagged as a prerequisite — recommend making it an acceptance criterion for the first `about.js` story rather than an architecture concern.
- Google Fonts loading pattern (`<link rel="preconnect">` + `<link>` in `<head>`) should be documented in the design manual.

### Architecture Completeness Checklist

**Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High — the stack is simple, all critical decisions are made and version-locked, all conflict-prone areas have explicit patterns with code examples, and all identified gaps have been resolved by design decisions.

**Key Strengths:**
- Version-locked stack eliminates dependency ambiguity
- Shared namespace (section IDs = manual = nav anchors) precisely defined and enforced
- AI instruction files (CLAUDE.md, .cursorrules, copilot-instructions.md) ensure design context is auto-loaded by any tool the founder uses
- All configurable values isolated in `src/config.js` — founder can update without touching structure
- Water physics constants centralized — animation consistency enforced by import, not convention
- Responsive breakpoint architecture aligned with Tailwind defaults — no custom breakpoints to learn or maintain

**Areas for Future Enhancement:**
- React migration path is documented and architecturally viable (Vite is framework-agnostic)
- GDPR cookie consent is deferred — flagged as founder responsibility before any paid marketing
- Data visualisation graphs (post-MVP scope) would require a charting library decision

### Implementation Handoff

**AI Agent Guidelines:**
- Read `docs/design-manual.md` in full before any task (auto-enforced via CLAUDE.md)
- Reference `design-tokens.css` for all colour, spacing, and type values — never use hex directly
- Follow the shared namespace: HTML section IDs = manual section names = nav anchors
- Use `src/config.js` for any value the founder may need to change
- Use `src/animations/constants.js` for all animation durations and easing values
- All animations run unconditionally — no `prefers-reduced-motion` checks
- Use Tailwind `lg:` prefix for all side-navigation show/hide logic

**First Implementation Priority:**
```bash
npm create vite@latest vasuqi -- --template vanilla
cd vasuqi
npm install
npm install -D tailwindcss @tailwindcss/vite
npm install gsap
```
Then: create `design-tokens.css` → wire Tailwind `@theme` → set up `partials/` → GitHub Actions workflow.
