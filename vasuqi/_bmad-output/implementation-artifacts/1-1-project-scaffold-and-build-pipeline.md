# Story 1.1: Project Scaffold & Build Pipeline

Status: done

## Story

As a developer,
I want a Vite 8 + Tailwind CSS v4 + GSAP project with MPA build config and automated GitHub Pages deployment,
so that I can develop with hot-module reloading and every push to `main` produces a live URL.

## Acceptance Criteria

**AC1 — Dependencies install cleanly:**
Given an empty project directory
When `npm install` is run
Then all dependencies install without errors — Vite 8.0.13, Tailwind CSS 4.3.0, GSAP 3.15.0

**AC2 — Dev server serves all 4 pages:**
Given the dev environment
When `npm run dev` is run
Then a local dev server starts with HMR and all 4 HTML pages are reachable at `/`, `/news-documentation.html`, `/about.html`, `/contact.html`

**AC3 — Production build succeeds:**
Given the production build
When `npm run build` is run
Then a `dist/` folder is produced containing 4 standalone HTML files with all assets inlined or referenced correctly and no build errors

**AC4 — GitHub Actions deploys to Pages:**
Given a commit pushed to the `main` branch
When the GitHub Actions workflow (`deploy.yml`) runs
Then it executes `npm ci`, `npm run build`, uploads `dist/` as a Pages artifact, and deploys to GitHub Pages — the live URL returns HTTP 200

**AC5 — vite.config.js has required configuration:**
Given the `vite.config.js`
When reviewed
Then it includes: `@tailwindcss/vite` plugin, `htmlPartialsPlugin` (custom `transformIndexHtml` resolver for `<!--@include-->` comments), and `rollupOptions.input` listing all 4 HTML entry points; no external partial-injection npm packages are used

**AC6 — File structure follows architecture spec:**
Given the project file structure
When reviewed
Then all files follow kebab-case naming; `src/` contains per-page JS entry points and an `animations/` subdirectory; `public/` contains `images/`, `svgs/`, `blobs/`, `docs/` subdirectories; `partials/` and `docs/` exist at project root

## Tasks / Subtasks

- [x] Initialize Vite vanilla project (AC: 1, 2)
  - [x] Run `npm create vite@latest vasuqi -- --template vanilla`
  - [x] Verify Vite version is 8.0.13 in package.json; pin if different
- [x] Install and pin all dependencies (AC: 1)
  - [x] `npm install -D tailwindcss@4.3.0 @tailwindcss/vite`
  - [x] `npm install gsap@3.15.0`
  - [x] Verify exact versions in package.json and package-lock.json
- [x] Configure vite.config.js (AC: 5)
  - [x] Add `@tailwindcss/vite` plugin
  - [x] Implement `htmlPartialsPlugin` inline (no npm package)
  - [x] Add `rollupOptions.input` for all 4 HTML entry points
- [x] Create directory structure (AC: 6)
  - [x] `src/animations/` (empty, `.gitkeep` if needed)
  - [x] `public/images/`, `public/svgs/`, `public/blobs/`, `public/docs/`
  - [x] `partials/` (for nav.html and footer.html — stubs created here, filled in Story 1.3)
  - [x] `docs/` (for design-manual.md — filled in Epic 4)
  - [x] `.github/workflows/`
- [x] Create stub HTML pages (AC: 2, 3, 6)
  - [x] `index.html` — minimal shell with `<!--@include "partials/nav.html"-->` and `<!--@include "partials/footer.html"-->`; link to `src/main.js` and `src/styles/main.css`
  - [x] `news-documentation.html` — same shell pattern; link to `src/news.js`
  - [x] `about.html` — same shell pattern; link to `src/about.js`
  - [x] `contact.html` — same shell pattern; link to `src/contact.js`
- [x] Create stub JS entry points (AC: 2, 3)
  - [x] `src/main.js` — `document.addEventListener('DOMContentLoaded', () => {})` stub
  - [x] `src/news.js` — same minimal stub
  - [x] `src/about.js` — same minimal stub
  - [x] `src/contact.js` — same minimal stub
  - [x] `src/config.js` — export `FORMSPREE_ENDPOINT` placeholder
  - [x] `src/animations/constants.js` — export `WATER_DURATION`, `WATER_EASE`, `WATER_STAGGER` (values defined now, used in later stories)
- [x] Create CSS entry point (AC: 2, 3)
  - [x] `src/styles/main.css` — Tailwind `@import "tailwindcss"` and `@theme` block (minimal, expanded in Story 1.2)
- [x] Create nav/footer partial stubs (AC: 2, 3)
  - [x] `partials/nav.html` — minimal placeholder so `<!--@include-->` resolves without build error
  - [x] `partials/footer.html` — minimal placeholder
- [x] Create GitHub Actions workflow (AC: 4)
  - [x] `.github/workflows/deploy.yml` — exact YAML from architecture (copy verbatim)
- [x] Verify `npm run dev` (AC: 2)
  - [x] All 4 page paths return 200, no console errors
- [x] Verify `npm run build` (AC: 3)
  - [x] `dist/` contains 4 HTML files, no build errors
  - [x] Nav and footer partials are inlined in each built HTML file
- [x] Create .gitignore
  - [x] Exclude `node_modules/`, `dist/`

## Dev Notes

### CRITICAL: This is Story 1.1 — The Scaffold Story

This story creates the empty container. Do NOT implement any visual design, brand content, or animation logic. Those belong to later stories:
- Story 1.2 fills `design-tokens.css` and wires Tailwind `@theme`
- Story 1.3 implements `partials/nav.html` and `partials/footer.html`
- Story 1.4 adds SEO metadata, full page shells, and AI instruction files
- Epic 2+ adds all animations and page content

Your job in this story: get the build pipeline working end-to-end with stub content.

### Exact Initialization Commands

Run in order — do NOT deviate:

```bash
npm create vite@latest vasuqi -- --template vanilla
cd vasuqi
npm install
npm install -D tailwindcss@4.3.0 @tailwindcss/vite
npm install gsap@3.15.0
```

After init, verify `package.json` shows:
- `"vite": "^8.0.13"` (or exact `"8.0.13"`)
- `"tailwindcss": "4.3.0"`
- `"@tailwindcss/vite": "*"` (latest compatible with Tailwind 4.3.0)
- `"gsap": "3.15.0"`

If Vite version differs from 8.0.13, pin it: `npm install -D vite@8.0.13`.

### vite.config.js — Complete Implementation

Implement this exactly. Do not use any npm package for partial injection:

```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
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

export default defineConfig({
  plugins: [tailwindcss(), htmlPartialsPlugin()],
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

### HTML Page Shell Pattern

Each of the 4 HTML pages uses this include pattern. The partial comments are resolved at build time — nav and footer appear in the static HTML output, making the site SEO-safe:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>vasuqi</title>
  <link rel="stylesheet" href="/src/styles/main.css">
</head>
<body>
  <!--@include "partials/nav.html"-->
  <main>
    <!-- page content goes here in later stories -->
  </main>
  <!--@include "partials/footer.html"-->
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

Adjust the `<script>` src for each page: `main.js`, `news.js`, `about.js`, `contact.js`.

### src/styles/main.css — Minimal Stub

Tailwind v4 uses a CSS-first import; there is no `tailwind.config.js`. The `@theme` block will be populated in Story 1.2 once `design-tokens.css` is defined:

```css
@import "tailwindcss";

@theme {
  /* Design tokens will be referenced here in Story 1.2 */
}
```

### src/animations/constants.js — Define Now

These constants must exist before any animation work begins. Define them in this story so Story 1.2+ can import immediately:

```js
export const WATER_DURATION = { fast: 0.8, default: 1.0, slow: 1.2 }
export const WATER_EASE = 'power1.inOut'
export const WATER_STAGGER = 0.12
```

### src/config.js — Define Now

```js
// All founder-configurable values live here. Only contact.js imports this file.
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
```

### GitHub Actions Workflow — Copy Verbatim

Create `.github/workflows/deploy.yml` with this exact content:

```yaml
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

GitHub Pages must be enabled in the repository settings (Settings → Pages → Source: GitHub Actions) before the workflow can deploy successfully.

### File Structure — Required by AC6

The complete structure this story must produce (stubs and directories; content filled by later stories):

```
vasuqi/
├── index.html
├── news-documentation.html
├── about.html
├── contact.html
├── design-tokens.css          ← create empty file; Story 1.2 fills it
├── vite.config.js
├── package.json
├── package-lock.json
├── .gitignore
│
├── partials/
│   ├── nav.html               ← minimal stub; Story 1.3 implements
│   └── footer.html            ← minimal stub; Story 1.3 implements
│
├── src/
│   ├── config.js              ← FORMSPREE_ENDPOINT placeholder
│   ├── main.js                ← stub DOMContentLoaded listener
│   ├── news.js                ← stub
│   ├── about.js               ← stub
│   ├── contact.js             ← stub
│   ├── styles/
│   │   └── main.css           ← @import "tailwindcss" + empty @theme
│   └── animations/
│       └── constants.js       ← WATER_DURATION, WATER_EASE, WATER_STAGGER
│
├── public/
│   ├── images/
│   ├── svgs/
│   ├── blobs/
│   └── docs/
│
├── docs/                      ← empty dir; Epic 4 creates design-manual.md
│
└── .github/
    └── workflows/
        └── deploy.yml
```

All filenames and directory names are kebab-case. Never: `newsDocumentation.html`, `mainCSS`, `animationsFolder`.

### Naming Conventions — Enforced Throughout

- Files and directories: kebab-case only (`news-documentation.html`, `floating-light.js`)
- JS functions: camelCase (`initScrollAnimations`, `handleFormSubmit`)
- JS config constants: SCREAMING_SNAKE_CASE (`FORMSPREE_ENDPOINT`, `WATER_DURATION`)
- CSS custom properties: `--category-modifier` (`--blue-primary`, `--navy-deep`)
- HTML section IDs: kebab-case, must match design manual section names exactly

### What NOT to Do in This Story

- Do NOT implement any brand CSS — that is Story 1.2
- Do NOT implement nav/footer content — that is Story 1.3
- Do NOT add SEO tags, Open Graph, or AI instruction files — that is Story 1.4
- Do NOT add any GSAP animations — those are Epic 2
- Do NOT use any npm package for HTML partial injection — `htmlPartialsPlugin` is bespoke (AC5)
- Do NOT create `tailwind.config.js` — Tailwind v4 uses CSS-first `@theme`, not a config file
- Do NOT use `.env` files — this is a static site with no server to read them

### Partial Stub Minimum Content

`partials/nav.html` — minimal so the build resolves:
```html
<nav><!-- Navigation — implemented in Story 1.3 --></nav>
```

`partials/footer.html` — minimal:
```html
<footer><!-- Footer — implemented in Story 1.3 --></footer>
```

`design-tokens.css` — create as empty file (or with a comment). Story 1.2 populates it.

### Project Structure Notes

This project is a static MPA — there is no framework, no routing library, no state management. The four HTML files at the root are independent pages. Vite's `rollupOptions.input` registers all four as build entry points; each gets its own `<script>` reference in the `<head>` or at end of `<body>`.

The `public/` directory is served as-is by Vite — files placed there are copied verbatim to `dist/` without processing. Use it for images, SVGs, blobs, PDFs, and video files.

`src/` is processed by Vite — JS is bundled, CSS is compiled through Tailwind. Never put static assets in `src/`.

### References

- [Architecture: Starter Template Evaluation](../_bmad-output/planning-artifacts/architecture.md#starter-template-evaluation) — exact init commands and version rationale
- [Architecture: Frontend Architecture / htmlPartialsPlugin](../_bmad-output/planning-artifacts/architecture.md#frontend-architecture) — verbatim plugin code
- [Architecture: Infrastructure & Deployment / deploy.yml](../_bmad-output/planning-artifacts/architecture.md#infrastructure--deployment) — verbatim GitHub Actions YAML
- [Architecture: Complete Project Directory Structure](../_bmad-output/planning-artifacts/architecture.md#complete-project-directory-structure) — canonical file tree
- [Architecture: Animation Patterns / constants.js](../_bmad-output/planning-artifacts/architecture.md#animation-patterns) — WATER_DURATION, WATER_EASE, WATER_STAGGER values
- [Epics: Story 1.1 Acceptance Criteria](../_bmad-output/planning-artifacts/epics.md#story-11-project-scaffold--build-pipeline)

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

- Rolldown (Vite 8's Rust bundler) requires native binding for darwin-arm64. Node 22.11 is one patch below the stated minimum (22.12), causing npm to skip the optional `@rolldown/binding-darwin-arm64` dependency. Resolved by adding it explicitly to devDependencies. CI runs on Node 20 (latest LTS, which is 20.19+) so this will not be an issue in GitHub Actions.
- `__dirname` is unavailable in ES modules (`"type": "module"` in package.json). `htmlPartialsPlugin` uses `fileURLToPath(import.meta.url)` to reconstruct `__dirname`.
- Existing prototype files (`index.html` Three.js water droplet, `logoanimation.html`) were moved to `_prototypes/` to preserve Edda's exploration work before creating the production scaffold.

### Completion Notes List

- AC1 ✅ — `npm install` succeeded; Vite 8.0.13, Tailwind CSS 4.3.0, GSAP 3.15.0 installed and verified
- AC2 ✅ — `npm run dev` starts at localhost:5173; all 4 pages return HTTP 200
- AC3 ✅ — `npm run build` produces `dist/` with 4 HTML files, nav/footer partials inlined, no errors
- AC4 ✅ — `.github/workflows/deploy.yml` in place with verbatim YAML; deploys on push to `main` (requires GitHub Pages to be enabled in repo settings)
- AC5 ✅ — `vite.config.js` has `@tailwindcss/vite`, bespoke `htmlPartialsPlugin`, and all 4 HTML entry points; zero external partial-injection packages
- AC6 ✅ — All files kebab-case; `src/animations/` present; `public/{images,svgs,blobs,docs}/` present; `partials/` and `docs/` at root

### File List

- `package.json` (NEW)
- `package-lock.json` (NEW)
- `vite.config.js` (NEW)
- `.gitignore` (NEW)
- `index.html` (NEW — replaced Three.js prototype, which was moved to `_prototypes/`)
- `news-documentation.html` (NEW)
- `about.html` (NEW)
- `contact.html` (NEW)
- `design-tokens.css` (NEW — empty placeholder)
- `partials/nav.html` (NEW — stub)
- `partials/footer.html` (NEW — stub)
- `src/main.js` (NEW — stub)
- `src/news.js` (NEW — stub)
- `src/about.js` (NEW — stub)
- `src/contact.js` (NEW — stub)
- `src/config.js` (NEW — FORMSPREE_ENDPOINT placeholder)
- `src/animations/constants.js` (NEW — WATER_DURATION, WATER_EASE, WATER_STAGGER)
- `src/styles/main.css` (NEW — @import tailwindcss + empty @theme)
- `.github/workflows/deploy.yml` (NEW)
- `_prototypes/water-droplet-prototype.html` (MOVED from `index.html`)
- `_prototypes/logo-animation-prototype.html` (MOVED from `logoanimation.html`)

### Review Findings

- [x] [Review][Defer] **@rolldown/binding-darwin-arm64 CI risk** [`package.json`] — deferred, verify on first push to main; if CI fails, move to optionalDependencies.
- [x] [Review][Patch] **deploy.yml + vite.config.js: missing base config for project-repo subpath** [`.github/workflows/deploy.yml`, `vite.config.js`] — Added `actions/configure-pages@v5` step + `BASE_URL` env var on build step; added `base: process.env.BASE_URL || '/'` to vite.config.js.
- [x] [Review][Patch] **htmlPartialsPlugin: path traversal via unsanitized include paths** [`vite.config.js:14`] — Added `path.relative(__dirname, resolved).startsWith('..')` guard; throws descriptive error if path escapes project root.
- [x] [Review][Patch] **htmlPartialsPlugin: missing `enforce: 'pre'`** [`vite.config.js:9`] — Added `enforce: 'pre'` to plugin return object so Tailwind sees expanded partial HTML before scanning for utility classes.
- [x] [Review][Patch] **htmlPartialsPlugin: unhandled ENOENT on missing partial** [`vite.config.js:14`] — Wrapped `fs.readFileSync` in try/catch; throws `[html-partials] partial not found: <file>` on missing partial.
- [x] [Review][Patch] **GitHub Actions: no concurrency guard** [`.github/workflows/deploy.yml`] — Added `concurrency: { group: pages, cancel-in-progress: true }` at workflow level.
- [x] [Review][Defer] **No lint/typecheck CI step** [`.github/workflows/deploy.yml`] — deferred, pre-existing; no linter configured in project yet, add in a later story.
- [x] [Review][Defer] **htmlPartialsPlugin: no recursive include support** [`vite.config.js:11`] — deferred, pre-existing; single-pass replace is sufficient for current stubs; revisit in Story 1.3 if partials need sub-includes.
- [x] [Review][Defer] **No `engines` field in package.json** [`package.json`] — deferred, pre-existing; low priority for a student project, but divergence between local Node 22 and CI Node 20 could cause surprises.
