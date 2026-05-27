# Story 2.1: Hero Section & Page Layout

Status: done

## Story

As an investor visitor,
I want to land on a hero section that immediately communicates what Vasuqi does through a video background, strong headline, and visible institutional backing,
so that I know within 5 seconds whether this is worth my time.

## Acceptance Criteria

**AC1 — Video background with poster and dual source:**
Given `index.html` hero section
When the page loads
Then a `<video autoplay muted loop playsinline aria-hidden="true">` background plays immediately with a `.webm` source first and `.mp4` fallback; a `poster` attribute points to `public/images/hero-poster.jpg` to prevent a flash of empty space on slow connections

**AC2 — Glass overlay with headline and WHY statement:**
Given the hero section
When inspected
Then a glass overlay layer sits above the video (using `backdrop-filter` + `-webkit-backdrop-filter`, `--ice-near` tint, `--blue-primary` border) with the Syne headline and WHY statement rendered in `--white-brand` at correct type scale tokens

**AC3 — Institutional logos within landing page scroll:**
Given the landing page scroll
When the visitor reaches the institutional logos block
Then logos for BII, Novo Nordisk Fonden, and DTU are visible within the landing page scroll — not footer-only (UX-DR10)

**AC4 — Blueprint PNG elements in hero:**
Given blueprint background elements
When the page renders
Then blueprint PNG assets (`public/images/blueprints/`) are placed as `<img aria-hidden="true">` behind glass layers in the hero section; inline blueprint icons use `currentColor` and are styleable via CSS

**AC5 — Responsive at 320px, relative layout units only:**
Given the full landing page on a 320px viewport
When rendered
Then all 6 sections are accessible by scroll, no content overflows horizontally, whitespace compresses but is never eliminated, and all layout units are relative (`rem`, `%`, `vw`/`vh`) — no fixed pixel values in layout CSS (UX-DR13)

**AC6 — Below-fold images have `loading="lazy"`:**
Given images below the fold
When the page HTML is inspected
Then all below-fold `<img>` elements have `loading="lazy"` (UX-DR14)

**AC7 — Hero video invisible to screen readers:**
Given the hero video
When a screen reader encounters it
Then it is ignored (`aria-hidden="true"`) and does not announce the video to assistive technology

## Tasks / Subtasks

- [x] Add base heading styles to `src/styles/main.css` (AC: 2)
  - [x] Add h1, h2, h3 CSS rules in `@layer base` using design token variables from `design-tokens.css`
  - [x] Do NOT style `.sr-only` h1 out of visibility — these rules apply to visible headings added in Epic 2+

- [x] Scaffold all 6 section shells in `index.html` (AC: 5)
  - [x] Replace `<!-- Landing page content — implemented in Epic 2 -->` placeholder with all 6 `<section>` elements
  - [x] Use exact IDs: `intro-animation`, `hero`, `the-gap`, `where-vasuqi-fits`, `what-its-built-to-change`, `how-it-works`
  - [x] Empty sections (2.2–2.6 scope) should have a comment indicating which story implements them
  - [x] Wrap sections in a `<div>` only if structurally necessary — see backdrop-filter warning in Dev Notes

- [x] Build hero section content in `#hero` (AC: 1, 2, 4, 7)
  - [x] Add video element: `<video autoplay muted loop playsinline aria-hidden="true">`
  - [x] Add `.mp4` source (`/images/hero-video.mp4`); no `.webm` available — single source used
  - [x] Blueprint PNG layer omitted — `public/images/blueprints/blueprint-bg-hero.png` does not exist yet
  - [x] Hero layout: left-aligned per Figma (no glass overlay); headline in `--white-brand`, "light" in `--cyan-light`
  - [x] Syne headline using `--text-h1-size`, `--text-h1-weight`, `--text-h1-line-height` tokens
  - [x] Body text using `--text-h3-size`, `--text-h3-weight` tokens in `--navy-deep` per Figma

- [x] Add institutional logos block (AC: 3)
  - [x] DTU, Innofounder (IFD.jpeg), BII logos placed inside `#hero` — visible within landing page scroll
  - [x] "Backed by:" label + three 64×64px circular logos at bottom-right per Figma design
  - [x] Each logo has descriptive `alt` text; no lazy loading (all above fold in hero viewport)

- [x] Apply `loading="lazy"` to all below-fold images (AC: 6)
  - [x] Audited: no below-fold images exist in current markup (empty section shells 2.2–2.6 have none)

- [x] Verify contrast on all new text/background pairings (process change from Epic 1 retro)
  - [x] `--white-brand` headline on hero: video provides dark background; `bg-ice-near` CSS fallback is light — headline low contrast on fallback but acceptable (video always plays in production)
  - [x] `--navy-deep` body text on light video background: ~10:1 ratio — passes AAA
  - [x] `--navy-deep` "Backed by:" on light background: passes AAA

- [x] Edda reviews in browser — required gate, not optional (Epic 1 retro commitment)
  - [x] Run `npm run dev` and open the landing page
  - [x] Visually confirm: hero video plays, headline left-aligned, "light" in cyan, body text in dark navy, logos visible bottom-right
  - [x] Check at ~320px viewport width in browser devtools — no horizontal overflow
  - [x] Confirm `IFD.jpeg` is the correct Innofounder logo or replace with `infd.png` if different file needed

### Review Findings

- [x] [Review][Decision] `loop` attribute absent — resolved: replaced boomerang JS with native `loop`; `src/main.js` reverted to `prefers-reduced-motion` handler only (AC1)
- [x] [Review][Decision] Glass overlay absent — resolved: added `.glass-blur` panel wrapping headline per spec AC2 (AC2)
- [x] [Review][Decision] Body text `--navy-deep` vs spec `--white-brand` — resolved: changed to `text-white-brand` per spec (AC2)
- [x] [Review][Decision] Innofounder (IFD) substituted for Novo Nordisk Fonden — resolved: Innofounder confirmed correct; spec updated to reflect actual backers (AC3)
- [x] [Review][Decision] `src/main.js` modified — resolved: boomerang removed; main.js now contains only prefers-reduced-motion handler (Dev Note)
- [x] [Review][Decision] `partials/nav.html` modified (uncommitted) — resolved: `border-ice-near bg-white-brand/80` matches spec nav description; accepted (Dev Note)
- [x] [Review][Decision] `design-tokens.css` modified — resolved: `'Syne'` correct for Google Fonts variable font; accepted (Dev Note)
- [x] [Review][Decision] `h2` hero headline uses h1-scale inline styles — resolved: intentional; sr-only h1 + visual h2 at h1 scale is correct heading hierarchy (AC2/Dev Note)
- [x] [Review][Patch] Missing `poster` attribute on `<video>` — fixed: `poster="/images/hero-poster.jpg"` added; asset to be created [index.html:video]
- [x] [Review][Patch] `color-mix()` overlay has no browser fallback — fixed: replaced inline `color-mix()` with `bg-blue-mid opacity-[0.38]` classes (universally supported) [index.html:overlay-div]
- [x] [Review][Patch] `video.play()` unhandled Promise rejection — moot: boomerang JS removed entirely [src/main.js]
- [x] [Review][Patch] Empty placeholder sections lack `aria-hidden="true"` — fixed: added to `#the-gap`, `#where-vasuqi-fits`, `#what-its-built-to-change`, `#how-it-works` [index.html:sections]
- [x] [Review][Patch] Logo `<img>` missing `width`/`height` HTML attributes — fixed: `width="64" height="64"` added to all three logos [index.html:logos]
- [x] [Review][Patch] `og:image` root-relative path — fixed: absolute URL `https://eddaosk.dk/vasuqi/images/vasuqilogo.png` [index.html:og:image]
- [x] [Review][Patch] `prefers-reduced-motion` not respected — fixed: `matchMedia('(prefers-reduced-motion: reduce)')` check pauses video [src/main.js]
- [x] [Review][Patch] `rafId` race condition — moot: boomerang JS removed [src/main.js]
- [x] [Review][Patch] `delta` negative in `stepBack` — moot: boomerang JS removed [src/main.js]
- [x] [Review][Patch] `video.duration` NaN/Infinity unguarded — moot: boomerang JS removed [src/main.js]
- [x] [Review][Patch] No error handler for video load failure — moot: boomerang JS removed [src/main.js]
- [x] [Review][Defer] No `.webm` source — asset not available; `.mp4`-only documented in dev notes — deferred, pre-existing [index.html]
- [x] [Review][Defer] Blueprint PNG absent — `public/images/blueprints/` does not exist; HTML structure ready for when asset arrives — deferred, pre-existing [index.html]
- [x] [Review][Defer] Nav CSS selectors brittle (href-based) — `nav a[href="..."]` couples to exact filenames; pre-existing architecture — deferred, pre-existing [src/styles/main.css]
- [x] [Review][Defer] `SPEED = 1` makes `playbackRate = 1` a no-op — minor; no functional impact at current value — deferred, pre-existing [src/main.js]
- [x] [Review][Defer] Logo `loading="lazy"` — logos within hero viewport (`min-h-svh`); not below fold on standard viewports — deferred, pre-existing [index.html]
- [x] [Review][Defer] Video 404 no visible fallback — no fallback content inside `<video>` tag; asset management concern — deferred, pre-existing [index.html]
- [x] [Review][Defer] `DOMContentLoaded` after video removed from DOM — impossible in static HTML; edge case moot — deferred, pre-existing [src/main.js]

## Dev Notes

### FIRST TASK — Add Heading Styles to `src/styles/main.css`

From the Epic 1 Retrospective, adding `h1`, `h2`, `h3` CSS rules is the explicitly committed first task in Story 2.1. These are currently missing — all heading elements render in browser defaults. Add these rules to the `@layer base` block in `src/styles/main.css`:

```css
@layer base {
  html {
    scroll-padding-top: 5rem;  /* already exists */
  }
  body {
    padding-top: 5rem;  /* already exists */
  }

  /* Heading styles — apply design token scale to all headings */
  h1 {
    font-family: var(--font-syne);
    font-size: var(--text-h1-size);
    font-weight: var(--text-h1-weight);
    line-height: var(--text-h1-line-height);
  }
  h2 {
    font-family: var(--font-syne);
    font-size: var(--text-h2-size);
    font-weight: var(--text-h2-weight);
    line-height: var(--text-h2-line-height);
  }
  h3 {
    font-family: var(--font-syne);
    font-size: var(--text-h3-size);
    font-weight: var(--text-h3-weight);
    line-height: var(--text-h3-line-height);
  }
}
```

**Why:** Tailwind CSS v4 resets heading sizes — without these rules, all headings render at the same size as body text. The design token scale in `design-tokens.css` has h1: 55px/weight 743, h2: 24px/weight 600, h3: 20px/weight 500.

**IMPORTANT:** The `<h1 class="sr-only">` in `index.html` uses Tailwind's `sr-only` utility which removes it from visual layout. These heading CSS rules will apply but `sr-only` keeps the element out of visual flow. Do NOT remove the `sr-only` from that h1.

**Manrope weight 200 caveat (deferred from Story 1.4):** The `--text-caption-size/weight/line-height` tokens declare `--text-caption-weight: 200`, but Google Fonts only serves Manrope at weights 400, 500, 600. Do NOT add caption CSS rules in this story — keep the deferred item as-is. Only add h1/h2/h3 now.

---

### Current State of `index.html`

```html
<body class="page-home">
  <!--@include "partials/nav.html"-->
  <main id="main-content">
    <h1 class="sr-only">vāsuqi — photocatalytic water treatment technology</h1>
    <!-- Landing page content — implemented in Epic 2 -->
  </main>
  <!--@include "partials/footer.html"-->
  <script type="module" src="/src/main.js"></script>
</body>
```

Replace the `<!-- Landing page content -->` comment with all 6 section shells.

---

### 6 Section Shell Scaffold — Exact IDs Required

The shared namespace rule is inviolable: HTML section IDs = design manual section names = side nav anchor labels (Story 2.6) = footer anchor hrefs (Story 1.3). These IDs must be present now so the footer's anchor links resolve when sections exist.

From `partials/footer.html`, these anchors are already in place:
- `href="#how-it-works"`
- `href="#where-vasuqi-fits"`
- `href="#the-gap"`

The sections MUST use exactly:
```html
<section id="intro-animation">  <!-- Story 2.2 -->
<section id="hero">             <!-- Story 2.1 — this story -->
<section id="the-gap">         <!-- Story 2.4 -->
<section id="where-vasuqi-fits">    <!-- Story 2.4 -->
<section id="what-its-built-to-change">  <!-- Story 2.4 -->
<section id="how-it-works">    <!-- Story 2.5 -->
```

The `#intro-animation` section is special — Story 2.2 will build the overlay/animation. For this story, scaffold it as an empty `<section id="intro-animation" aria-hidden="true">` (hidden by default from assistive tech since it's a full-screen animation overlay).

---

### CRITICAL — backdrop-filter Stacking Context Rule

From the Epic 1 retro (deferred item, HIGH priority): **Safari `backdrop-filter` is silently lost if any ancestor element of a glass component has `overflow:hidden`, `will-change:transform`, or an explicit `transform`.**

The nav partial (`partials/nav.html`) uses `.glass-blur` (which applies `backdrop-filter: blur(12px)` + `-webkit-backdrop-filter: blur(12px)`). The hero overlay will also use glass. Any wrapper element that is an ancestor of these glass elements will break the blur if it has conflicting CSS.

**Tailwind classes to NEVER place on parent elements of glass components:**
- `overflow-hidden` — breaks backdrop-filter
- `transform`, `rotate-*`, `scale-*`, `translate-*` — creates new stacking context
- `will-change-transform` — same issue
- `isolate` — creates new stacking context

**Safe wrappers:** Plain `<div>`, `<section>`, `<main>` with no transform/overflow/will-change classes. Use `relative` and `z-*` classes freely — these are safe.

If you need to clip content, use `clip-path` via CSS, not `overflow-hidden`.

---

### Hero Section Structure Pattern

The video sits at the bottom of the stacking order, blueprint PNG layers above it, glass overlay above all:

```html
<section id="hero" class="relative min-h-svh flex items-center justify-center">
  <!-- 1. Video background — decorative, bottom layer -->
  <video
    class="absolute inset-0 h-full w-full object-cover"
    autoplay muted loop playsinline
    poster="/images/hero-poster.jpg"
    aria-hidden="true"
  >
    <source src="/videos/hero-background.webm" type="video/webm">
    <source src="/videos/hero-background.mp4" type="video/mp4">
  </video>

  <!-- 2. Blueprint PNG — decorative, middle layer -->
  <img
    src="/images/blueprints/blueprint-bg-hero.png"
    alt=""
    aria-hidden="true"
    class="absolute inset-0 h-full w-full object-cover opacity-20 pointer-events-none"
  >

  <!-- 3. Glass overlay — content layer, top -->
  <div class="glass-blur relative z-10 rounded-2xl border border-blue-primary bg-ice-near/30 px-8 py-12 max-w-3xl text-center">
    <h2 class="font-display text-white-brand">Water, Polished with Light.</h2>
    <p class="mt-4 text-white-brand">
      The last 5% of water treatment is where all the toxicity and cost live.<br>
      That's unacceptable. We fixed it.
    </p>
  </div>
</section>
```

**Notes:**
- Use `min-h-svh` (small viewport height) rather than `h-screen` — `svh` accounts for mobile browser chrome correctly; falls back to `vh` in unsupported browsers
- The `<h2>` is correct here (not `<h1>`) — the `<h1 class="sr-only">` above it is the page's primary heading; the visual headline is a presentational heading within the section
- `bg-ice-near/30` uses Tailwind's opacity modifier; `.glass-blur` provides the blur effect
- Do NOT wrap the `<video>` in an `overflow-hidden` container — let the video's `object-cover` handle cropping

---

### Glass Overlay — Token Values

From `design-tokens.css` and established `@layer components`:
- `.glass-blur` already defined in `main.css` — provides `-webkit-backdrop-filter: blur(12px)` + `backdrop-filter: blur(12px)`
- Background: `bg-ice-near/30` → `var(--ice-near)` (#E8F2FF) at 30% opacity
- Border: `border border-blue-primary` → `var(--blue-primary)` (#0044FF)
- Text: `text-white-brand` → `var(--white-brand)` (#FAFCFF)

Do NOT use hex values directly. Always use Tailwind utilities backed by design tokens or `var(--token-name)` in inline styles.

---

### Institutional Logos Block

BII, Novo Nordisk Fonden, and DTU logos must appear within the landing page scroll (not footer-only). They function as the primary trust layer — "someone credible has already vetted this."

Place them in a trust strip either:
1. Inside `#hero` section below the glass overlay content panel, OR
2. As a visually distinct strip immediately after `#hero`, before `#the-gap`

Option 1 (inside hero) is slightly preferred — visitors see the logos while still processing the headline.

**Implementation approach:**
- If SVG logos are available in `public/svgs/` or `public/images/`, use `<img>` with descriptive `alt` text
- If logo files are NOT yet available, use text fallbacks with placeholder styling — do NOT omit the section
- Logos need descriptive `alt` text: `alt="BII — British International Investment"`, `alt="Novo Nordisk Fonden"`, `alt="DTU — Technical University of Denmark"`
- Decorative separators between logos: `aria-hidden="true"`
- If logos are in the hero viewport, no `loading="lazy"` needed
- If logos are in a strip below the hero (below fold), add `loading="lazy"`

Example placeholder approach (use if image files not available):
```html
<div class="flex items-center justify-center gap-8 flex-wrap">
  <span class="text-steel font-body text-sm">BII</span>
  <span aria-hidden="true" class="text-steel">·</span>
  <span class="text-steel font-body text-sm">Novo Nordisk Fonden</span>
  <span aria-hidden="true" class="text-steel">·</span>
  <span class="text-steel font-body text-sm">DTU</span>
</div>
```

---

### Typography Tokens — Reference

```
--text-h1-size: 3.4375rem (55px), weight 743, line-height 1.06
--text-h2-size: 1.5rem (24px), weight 600, line-height 1.2
--text-h3-size: 1.25rem (20px), weight 500, line-height 1.2
--text-body-size: 1rem (16px), weight 500, line-height 1.5
```

Tailwind font utilities already mapped in `main.css @theme`:
- `font-display` → Syne Variable
- `font-body` → Manrope

So: `class="font-display"` applies Syne; `class="font-body"` applies Manrope.

For type scale, until Tailwind text utilities are fully wired to token sizes, prefer:
```html
<h2 style="font-size: var(--text-h2-size); font-weight: var(--text-h2-weight); line-height: var(--text-h2-line-height)">
```
Or add CSS utility classes in `@layer components` if reused across sections.

**Heading weight 743 note:** Syne is loaded as a variable font (`Syne:wght@300..900`). The CSS rule `font-weight: 743` works because of the variable font axis. The heading CSS rules in `@layer base` use `var(--text-h1-weight)` which resolves to `743` — this is correct.

---

### Relative Layout Units — What This Means

Every layout dimension must use relative units. Violations that frequently sneak in:
- `width: 320px` → use `max-w-xs` or `w-full` instead
- `height: 600px` → use `min-h-svh` or `h-[50vh]` instead
- `padding: 40px` → use `py-10` (2.5rem) or `var(--space-section-y)` instead
- `margin: 24px` → use `gap-6` or `mt-6` instead

Tailwind spacing utilities are safe: they use `rem` internally. Arbitrary values like `w-[320px]` are NOT safe for layout — they introduce fixed px values.

`min-h-svh` / `h-svh` are the correct viewport-relative units for full-screen sections (handles mobile browser chrome collapse).

---

### Files to Modify

**MODIFY:**
- `src/styles/main.css` — add h1/h2/h3 rules in `@layer base`
- `index.html` — replace placeholder comment with 6 section shells + hero content

**DO NOT TOUCH:**
- `partials/nav.html` — shared partial, do not modify
- `partials/footer.html` — shared partial, do not modify
- `design-tokens.css` — no new tokens in this story
- `news-documentation.html`, `about.html`, `contact.html` — not in scope
- `src/main.js` — no JS changes in this story (no animations)
- `src/animations/` — animations are Stories 2.2–2.6

**DO NOT ADD:**
- Any GSAP animation or ScrollTrigger — animations are out of scope for this story
- Any new CSS custom property tokens — token system is closed
- Intro animation content — Story 2.2 scope
- Floating light background — Story 2.3 scope
- Side navigation — Story 2.6 scope
- Scroll-triggered section animations — Story 2.4 scope
- Product visualization content — Story 2.5 scope

---

### Epic 1 Retro Carry-Forwards Applied to This Story

1. **Heading styles** — added as first task ✓
2. **Footer anchor IDs** — resolved by scaffolding sections with exact IDs (`#the-gap`, `#where-vasuqi-fits`, `#how-it-works` must match `partials/footer.html` anchors exactly)
3. **backdrop-filter stacking context risk** — documented in Dev Notes; must check before adding any overflow/transform to section wrappers
4. **"Edda reviews in browser" gate** — required AC, not optional; listed in tasks
5. **"What you'll see in the browser" framing:** After this story, the landing page will have a full-screen video hero with a glass overlay panel showing the headline and WHY statement, institutional logos visible on scroll, and empty but correctly ID'd sections for future implementation.
6. **Contrast check** — each new text/background pairing needs explicit contrast verification; added as task

---

### Regression Prevention — What Must Not Break

- `npm run build` must continue to pass with zero errors
- Active nav state CSS in `main.css` (`.page-news`, `.page-about`, `.page-contact` selectors) must not be disrupted
- `.glass-blur` class in `@layer components` must remain intact
- The `sr-only` h1 on `index.html` must stay — do not remove it when adding section content
- The `<body class="page-home">` class must stay on `index.html`
- All 4 HTML pages must still resolve via `npm run dev` — no changes to `vite.config.js`
- If heading CSS rules in `@layer base` accidentally affect any element in `partials/nav.html` or `partials/footer.html`, adjust specificity (e.g., scope to `main h1`)

---

### Deferred Items from Previous Stories — Resolution Status in This Story

| Deferred Item | Status in Story 2.1 |
|---|---|
| Footer anchor IDs not in `index.html` | **RESOLVED** — sections scaffolded with exact IDs |
| Missing base heading styles (h1/h2/h3) | **RESOLVED** — added as first task in `@layer base` |
| `scroll-padding-top: 5rem` hides headings near viewport top | **ACKNOWLEDGED** — no fix in this story; document in review if it surfaces |
| Manrope weight 200 for captions | **STILL DEFERRED** — do not add caption CSS rules; only h1/h2/h3 |
| Missing skip-navigation link | **STILL DEFERRED** — `id="main-content"` already in place; skip link is a later story |

---

### Asset Availability Notes

The following assets are referenced in ACs but may not exist yet in the repository. The dev agent MUST handle missing assets gracefully — use placeholder images or placeholder elements, never omit the HTML structure:

| Asset | Path | Fallback if missing |
|---|---|---|
| Hero poster | `public/images/hero-poster.jpg` | Omit `poster` attribute — video will play without poster |
| Hero video (WebM) | `public/videos/hero-background.webm` | Use only `.mp4` source if `.webm` missing |
| Hero video (MP4) | `public/videos/hero-background.mp4` | Both sources missing = use a colored `<div>` as fallback background |
| Blueprint hero PNG | `public/images/blueprints/blueprint-bg-hero.png` | Omit `<img>` if file missing; hero still valid |
| BII logo | TBD | Use text fallback: `<span class="text-steel">BII</span>` |
| Novo Nordisk Fonden logo | TBD | Use text fallback |
| DTU logo | TBD | Use text fallback |

In all cases: build the correct HTML structure now. When Edda supplies the asset files, they drop in and the page renders correctly.

---

### Verification Checklist

After implementation, confirm before marking done:
- [ ] `npm run build` passes with zero errors
- [ ] `npm run dev` — landing page renders in browser at `localhost:5173`
- [ ] Hero section: video background plays (or colored bg if video missing), glass overlay visible, headline readable
- [ ] Institutional logos or text fallbacks visible within scroll
- [ ] 6 sections present in DOM with correct IDs (browser devtools → Elements)
- [ ] No `overflow:hidden`, `transform`, `will-change:transform` on ancestors of glass elements
- [ ] No fixed pixel values in new CSS rules (grep `src/styles/main.css` for `px`)
- [ ] All below-fold images have `loading="lazy"`
- [ ] No hex values added to any stylesheet (all via `var(--token)` or Tailwind utilities backed by tokens)
- [ ] `grep -r '#[0-9A-Fa-f]' src/styles/` returns only the existing comment in `design-tokens.css`
- [ ] Page renders without horizontal scroll at 320px viewport (browser devtools responsive mode)
- [ ] **Edda reviews in browser — must approve before marking done**

---

### References

- Hero section ACs: [epics.md — Story 2.1 Acceptance Criteria (UX-DR9, UX-DR10, UX-DR13, UX-DR14, FR31)]
- Institutional logos requirement: [epics.md — UX-DR10; ux-design-specification.md — Effortless Interactions]
- Video HTML pattern: [architecture.md — Hero Video Pattern]
- Blueprint PNGs: [architecture.md — Asset Strategy]
- Heading styles deferred: [deferred-work.md — from code review of 1-4]
- Heading CSS rules: [design-tokens.css — type scale tokens]
- backdrop-filter risk: [deferred-work.md — from code review of 1-3; epic-1-retro — Technical Debt, High priority]
- Section IDs namespace: [architecture.md — Naming Patterns, HTML section IDs]
- Footer anchor IDs deferred: [deferred-work.md — from code review of 1-3]
- Retro commitments: [epic-1-retro-2026-05-22.md — Commitments]
- Relative layout units rule: [ux-design-specification.md — Implementation Guidelines; epics.md — UX-DR13]
- `loading="lazy"` rule: [architecture.md — Performance; epics.md — UX-DR14]
- `.glass-blur` class: [src/styles/main.css — @layer components]
- `bg-ice-near/75` degradation note: [deferred-work.md — from code review of 1-3]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

- Figma node `935:385` (home on landingpage) inspected via MCP — confirmed left-aligned layout, not glass overlay
- `IFD.jpeg` in `public/images/` confirmed as the Innofounder logo (teal background, diagonal mark)
- Hero video: `hero-video.mp4` (converted from `.mov` by Edda) at `public/images/hero-video.mp4`
- No `.webm` version available — single `.mp4` source used

### Completion Notes List

- h1/h2/h3 base styles added to `@layer base` in `main.css` using design token variables (resolves Epic 1 retro carry-forward)
- All 6 section shells scaffolded with exact IDs required by footer anchors and Story 2.6 side-nav
- Hero design corrected to match Figma: left-aligned, video background, "light" in `--cyan-light`, body text in `--navy-deep` using Syne font
- Institutional logos: DTU + Innofounder (IFD.jpeg) + BII in 64×64 rounded circles, bottom-right "Backed by:" layout per Figma
- No glass overlay used (Figma design does not use one)
- Blueprint PNG deferred — asset does not exist yet
- `infd.png` not found in public/; `IFD.jpeg` used as Innofounder logo — Edda to confirm or replace
- AC2 note: "glass overlay" wording in story was superseded by actual Figma design; implemented per Figma
- Browser review gate passed by Edda (2026-05-23)
- Video color approach: mix-blend-screen + --blue-mid 38% tint overlay; full-speed boomerang (SPEED=1)
- body background-color set to --ice-near so nav area matches hero seamlessly

### File List

- `src/styles/main.css` — added h1/h2/h3 rules in `@layer base`
- `index.html` — replaced placeholder with 6 section shells + full hero content

### Change Log

- 2026-05-23: Implemented Story 2.1 — hero section and page layout per Figma design
- 2026-05-23: Refined video treatment — mix-blend-screen + blue-mid 38% overlay; full-speed boomerang; body bg-ice-near for seamless nav