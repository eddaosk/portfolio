# Vasuqi Design Manual

**Version:** 1.0 — Living document. Updated as the product evolves.

> **North Star Rule:** Any addition must fit the brand identity, visual identity, and tone of voice.
> Derive from the four material languages (Water, Glass, Blueprint, Light) for situations not explicitly covered.
> This rule is the highest-priority override. When no specific rule applies, apply this one.

---

## Part 1 — Onboarding: How to Work With This Manual

### What the AI already knows when you open this project

`CLAUDE.md` tells the AI to read this manual in full before every task. The same instruction is in `.cursorrules` (Cursor) and `.github/copilot-instructions.md` (GitHub Copilot). The instruction runs automatically. You do not need to paste anything or activate anything.

When you open the project, the AI already knows:
- Every brand colour, with its token name
- The four material languages and how to apply them
- The typography scale and spacing system
- The Glass, Blueprint, Water, and Light material language rules

### What you do

Describe what you want. That is the entire workflow.

> "Add a testimonial card to the about page."
> "Write a LinkedIn post about our DTU partnership."
> "Create a new section between 'the-gap' and 'where-vasuqi-fits'."

The AI reads the context, follows the rules, and responds accordingly.

### How to verify the AI has read the manual

Ask: **"What is Vasuqi's brand blue?"**

The correct answer is `--blue-primary` (#0044FF). If the AI gives that answer without being told, the manual loaded correctly.

### The one rule you own

The North Star Rule at the top of this document is yours to enforce. When something looks wrong — too bright, too playful, off-brand — name it and ask the AI to fix it. The rule gives you the authority to reject anything that does not fit.

---

## Part 2 — Visual System

### Four Material Languages

These are not component rules. They are a reasoning layer. When a situation is not explicitly covered elsewhere in this manual, derive the answer by asking which material language governs it.

#### Water

**Character:** Flowing gradients, organic shapes, depth.
**Primary use:** Hero backgrounds, section transitions, all motion.
**Governs all animation:** Slow, continuous, non-linear. No bounce. No snap. No sudden cuts.

Animation constants (in `src/animations/constants.js`):
- `WATER_DURATION` — `{ fast: 0.8, default: 1.0, slow: 1.2 }` seconds
- `WATER_EASE` — `'power1.inOut'`
- `WATER_STAGGER` — `0.12` seconds

Colours: `--navy-deep` to `--blue-primary` gradients for hero depth.

#### Glass

**Character:** Frosted blur, translucent surfaces, light refraction.
**Primary use:** Nav bar, cards, overlays.

The site navigation bar is a sticky Glass element — it stays fixed at the top of the viewport as the user scrolls and is always visible on every page. It is never hidden, collapsed, or removed.

Implementation:
- `backdrop-filter: blur(Xpx)` + `-webkit-backdrop-filter: blur(Xpx)` (Safari required)
- Background: `--white-brand` at ~80% opacity
- Border: `--ice-near`

**Critical rule:** Never apply `overflow: hidden` to a Glass ancestor element. It silently kills `backdrop-filter` blur in all browsers. This is the most common Glass failure mode.

#### Blueprint

**Character:** Technical linework, grid structures, precision.
**Primary use:** Diagram sections, data callouts, news/docs components, footer.
**Aesthetic:** Schematic, clinical, engineered.

Icons: inline SVG using `currentColor`. Large diagrams (e.g. `water-cycle-diagram.svg`) are file references in `public/svgs/`.

#### Light

**Character:** Electric blue glow, LED accent, luminosity.
**Primary use:** CTA button, hover states, animated floating-light background.

**Key derivation rule:** Light is behaviorally governed by Water, visually expressed through Glass.

- Light animations follow Water physics (`WATER_DURATION`, `WATER_EASE`)
- Light surfaces use Glass blur and opacity layering
- When designing any ambient or glow component, apply Water motion rules first, then Glass rendering rules

Tokens: `--blue-mid` (#6A93FF) for soft glow, `--cyan-light` (#00E5FF) for hard glow accents.

---

### Colour Palette

All ten tokens in `design-tokens.css`:

| Token | Hex | Role |
|---|---|---|
| `--navy-deep` | #0A1F44 | Primary text and gradient colour stop only. Never used as a solid `background-color` — not on page, section, card, or overlay. It may appear as a colour stop inside a CSS gradient overlay (see Anti-list item 5). |
| `--blue-primary` | #0044FF | Brand blue, primary CTA |
| `--blue-deep` | #0033CC | Pressed/active state |
| `--blue-mid` | #6A93FF | Soft glow, secondary accent |
| `--blue-soft` | #A8C5FF | Subtle highlights |
| `--cyan-light` | #00E5FF | Hard glow, Light language accents |
| `--steel` | #5C6B85 | Body text, secondary labels |
| `--ice-light` | #D6F8FF | Light surface tints |
| `--ice-near` | #E8F2FF | Glass borders, card backgrounds |
| `--white-brand` | #FAFCFF | Glass surfaces; text on coloured or dark elements (e.g. CTA button label) |

**Rule:** Never use hex values directly in CSS. Always use the token name via `var(--token-name)`.

---

### Typography

Two families, loaded via Google Fonts in the HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400..800&family=Manrope:wght@200..800&display=swap" rel="stylesheet">
```

Tokens: `--font-syne` (headings, display), `--font-manrope` (body, UI).
Do not use any other font family.

Type scale tokens (in `design-tokens.css`) — apply directly to the matching heading level:

| Element | Size token | Weight token | Line-height token |
|---------|-----------|--------------|-------------------|
| `h1` | `--text-h1-size` | `--text-h1-weight` | `--text-h1-line-height` |
| `h2` | `--text-h2-size` | `--text-h2-weight` | `--text-h2-line-height` |
| `h3` | `--text-h3-size` | `--text-h3-weight` | `--text-h3-line-height` |
| body / `p` | `--text-body-size` | `--text-body-weight` | `--text-body-line-height` |
| captions / labels | `--text-caption-size` | `--text-caption-weight` | `--text-caption-line-height` |

Spacing tokens (in `design-tokens.css`):

| Token | Value | Use |
|-------|-------|-----|
| `--space-section-y` | 6rem (96px) | Vertical padding on every section |
| `--space-component` | 2rem (32px) | Internal padding inside cards and components |
| `--space-gap-sm` | 1rem (16px) | Small gaps between elements |
| `--space-gap-md` | 2rem (32px) | Medium gaps |
| `--space-gap-lg` | 3rem (48px) | Large gaps |

Never use pixel or rem values not derived from one of these tokens.

---

### Shared Namespace Rule

Section IDs in HTML, section names in this manual, and side nav anchor labels must be identical strings. The canonical IDs are:

```
intro-animation  hero  the-gap  targets-are-set  where-vasuqi-fits  what-its-built-to-change  how-it-works
```

Never rename an ID without updating all three references simultaneously.

---

## Part 3 — Task Guides & Component Derivation Protocol

### Task Guide 1: Adding a New Section

1. Choose a material language before writing HTML — it determines tokens, borders, and motion.
2. Add the section `id` in kebab-case. If it appears on `index.html`, register it in the shared namespace (Part 2) and add a side nav anchor entry simultaneously — the side nav is index-only.
3. Use only `design-tokens.css` spacing tokens for layout. No magic pixel values. All units relative (`rem`, `%`, `vw`/`vh`).
4. Mobile-first: base styles target 320px. Use Tailwind `md:`, `lg:`, `xl:` prefixes to layer up.
5. Wire scroll entrance with GSAP: import `WATER_EASE`, `WATER_DURATION`, `WATER_STAGGER` from `src/animations/constants.js`. Use `WATER_DURATION.default` for the duration value. Set `once: true` on all ScrollTrigger instances.
6. Blueprint sections: inline SVGs use `currentColor`; large diagrams are file references in `public/svgs/`.
7. Glass sections: include `-webkit-backdrop-filter` alongside `backdrop-filter`. Never apply `overflow: hidden` to a Glass ancestor.

**Adding a section to `index.html` specifically:**

The section heading must be `h1` (not `h2`) — on the long-scroll index, each section reads as a standalone page. See heading hierarchy in Task Guide 5.

If the founder has not specified where in the page order the section should go: ask, and include a suggestion. Base the suggestion on narrative flow — the page follows WHY → HOW → WHAT order. A section that explains a problem or context belongs early; a section that explains the mechanism belongs mid-page; a section that describes the product outcome belongs late. State your reasoning when you suggest a position.

### Task Guide 2: Writing Copy

Follow the golden circle order: **WHY → HOW → WHAT**. Lead with the reason, then the mechanism, then the product.

Rules:
- Claim-first: short claim first, evidence after.
- Short sentences. No hedging phrases (`you may want to`, `it is recommended that`, `potentially`).
- No buzzword stacking (`leveraging cutting-edge sustainable deep-tech solutions…`).
- No competitor comparisons — claim the gap, do not name rivals.
- Anti-hype: list what is absent, not what is added (`No chemicals. No sludge. Just light.`).
- Frame forward — solution, not problem.
- The regulatory anchor is always available: targets are set by EU law, the market must move.

Tone check: does it sound like something a confident engineer would say? If it sounds like a press release, rewrite it.

### Task Guide 3: Creating a New Component

1. Run the Component Derivation Protocol (below) before writing any code.
2. Apply tokens only from `design-tokens.css` — never introduce a new `--` token, never use hex directly.
3. Glass components: `backdrop-filter` + `-webkit-backdrop-filter` + `--ice-near` border + `--white-brand` at ~80% opacity. Never `overflow: hidden` on a Glass ancestor.
4. Light components: apply Water physics motion first (`WATER_DURATION`, `WATER_EASE`), then Glass rendering.
5. Blueprint components: inline SVG with `currentColor`; grid or linework structure.
6. Animated components: import `WATER_DURATION`, `WATER_EASE`, `WATER_STAGGER` from `src/animations/constants.js`. Never hardcode these values.
7. Same Designer test: before committing, ask — would a first-time visitor notice this component was added later? If yes, revise.

Animation library: **GSAP 3.15.0**. Plugins in use: **ScrollTrigger** (scroll-triggered entrances), **SplitText** (character/word/line split entrances). Blob morphing: GSAP `attr: { d }` tween between two SVG path variants with identical point counts; fallback is CSS `clip-path` morphing if point counts differ. SVG reveal animations: when SVGs use a mask+fill approach (not stroked paths), `stroke-dashoffset` draw-on is not possible — use a clip-path reveal instead (`clipPath: 'inset(0 100% 0 0)'` → `'inset(0 0% 0 0)'`). See `.gap-line-img` in `src/animations/gap-animation.js`.

### Task Guide 4: Adding Media

- Images: `.jpg` for photos, `.png` for assets with transparency, `.svg` for diagrams and icons.
- Every image requires an `alt` attribute. Decorative images: `alt=""` or `aria-hidden="true"`.
- Below-fold images: `loading="lazy"` required.
- File placement:
  - Raster images and video → `public/images/` (hero-video.mp4, team photos, docs thumbnails)
  - Document thumbnails → `public/images/docs/`
  - All SVGs (icons, diagrams, blobs, backgrounds) → `public/svgs/`
  - Downloadable files → `public/docs/`
- HTML reference pattern: `src="/images/..."` (Vite base-relative path).
- Responsive SVG diagrams (different artwork per breakpoint): use `<picture>` — `<source media="(min-width: 768px)" srcset="/svgs/desktop.svg">` with `<img src="/svgs/mobile.svg">` as fallback. This ensures only one file loads per viewport. Do not use CSS `display:none` to hide one variant — both would download.
- Video: `<video autoplay muted loop playsinline aria-hidden="true">` — `.webm` source first, `.mp4` fallback; always include a `poster` attribute.

---

### Task Guide 5: Adding a New Page

Every page on the Vasuqi site shares the same shell. None of the items below are optional.

**Required shell elements:**

1. Copy the `<head>` block from `index.html`. Update only `<title>`, `<meta name="description">`, and the OG tags. Do not remove or add any other `<head>` element.
2. The body background is `var(--ice-near)` — already applied globally by `main.css`. Do not override it in any page-specific CSS.
3. Add a unique body class in the format `page-[pagename]` (e.g. `page-about`). The nav active state is driven by this static body class — not JavaScript. Without it, the nav active indicator will be wrong.
4. Add `<!--@include "partials/nav.html"-->` immediately after `<body>` — the build system injects the shared nav automatically. To add the new page to the nav, edit `partials/nav.html`: add its link to the left column, keeping About Us and Contact in the right column and the logo centered (see Anti-list item 7).
5. Add `<!--@include "partials/footer.html"-->` immediately before `</body>`.
6. Include the `<div id="floating-light">` block (copied from `index.html`) if the page has any above-fold content. This is a fixed full-viewport overlay containing four animated `.fl-beam` elements — two on the left, two on the right — that produce the ambient glow visible at the edges of the page. It has `aria-hidden="true"` and `pointer-events-none`; it is purely decorative.

**Hero section — ask before building:**

The hero of every secondary page is content-specific. Before writing any hero HTML, ask the founder:
1. What is the primary visual? (background image, video, plain surface, or illustration)
2. Is there a subtitle or supporting line under the `h1`?

Do not infer or default the hero layout. Wait for answers before proceeding. Do not add a CTA to the hero — the sticky nav Contact button is the only CTA on the site.

**Heading hierarchy:**

Two different conventions apply depending on page type:

- **`index.html` (long-scroll):** Include one sr-only `h1` (SEO page title, hidden from sight). Each visible section heading — The Gap, Targets Are Set, etc. — is also `h1` because each section reads as a standalone page in the scroll flow.
- **All secondary pages:** One visible `h1` for the page title or hero heading. `h2` for each major section within the page. `h3` for sub-sections within those. Context governs depth — if three sections together explain one topic (e.g. three aspects of the technology), all three get `h2`; sub-topics within them get `h3`. Do not skip levels.

**Section backgrounds on secondary pages:**

All section backgrounds use a near-white token — either `--white-brand` or `--ice-near`. No section on a secondary page uses a dark or coloured background.

- Blueprint sections: `--white-brand` or `--ice-near` surface; any large Blueprint SVG background element is placed at ~2% opacity (decorative, barely visible).
- Glass sections: `--ice-near` surface; Glass cards sit on top with `backdrop-filter` blur as normal.
- Water sections: `--ice-near` surface; gradients and organic shapes are layered on top, not used as the section background itself.

**What changes per page:** `<title>`, `<meta name="description">`, OG tags, the `page-[pagename]` body class, and everything inside `<main>`.

**What never changes per page:** the `<head>` structure and linked resources, the nav partial reference, the footer partial reference, and the body background token. The shared nav (`partials/nav.html`) itself is updated when a new page is added, but it must change identically for all pages simultaneously.

**New page checklist:**

HTML & shell:
- [ ] `<head>` copied from `index.html`; only title, meta description, and OG tags updated
- [ ] OG image: use the same default OG image already set in `index.html` unless the founder provides a page-specific one
- [ ] Body class set: `page-[pagename]` (kebab-case, e.g. `page-technology`)
- [ ] Body background is `var(--ice-near)` — confirm `main.css` is not overridden
- [ ] Nav partial included: `<!--@include "partials/nav.html"-->`
- [ ] New page link added to `partials/nav.html` left column; About Us and Contact untouched
- [ ] Footer partial included: `<!--@include "partials/footer.html"-->`
- [ ] `<div id="floating-light">` included if the page has above-fold content
- [ ] Side nav: add one if the page has more than 3 content sections (hero does not count); use `--cyan-light` dot styling (see Living Components); omit otherwise

Architecture — required for every new page:
- [ ] Create `src/page-name.js` entry point (kebab-case filename matching the HTML file). Structure: one `DOMContentLoaded` listener that calls `init*` functions only — no animation logic directly in the entry point
- [ ] Add the page to `rollupOptions.input` in `vite.config.js`
- [ ] Add an internal link to the new page from at least one existing page
- [ ] Any animation module longer than ~50 lines or with its own timeline → extract to `src/animations/page-name-animation.js`; import and call its `init*` function from the entry point

Design:
- [ ] Hero: ask the founder before building (see Hero section above)
- [ ] No `--navy-deep` used as any background
- [ ] All sections follow Task Guide 1 (material language, tokens, GSAP)
- [ ] All section backgrounds use `--white-brand` or `--ice-near`; Blueprint SVG backgrounds at ~2% opacity

---

### Task Guide 6: Adding a News Article

News articles live in the carousel on `news-documentation.html`. Add each new article as the last slide inside `<div class="nd-carousel__track">`.

**Two card variants — use the correct one:**

*LinkedIn post:*
```html
<div class="nd-carousel__slide">
  <a href="URL" target="_blank" rel="noopener noreferrer" class="news-card"
     aria-label="LinkedIn — Headline text">
    <div class="news-card__img-wrap">
      <img src="images/filename.jpg" alt="" class="news-card__img" loading="eager" aria-hidden="true">
    </div>
    <div class="news-card__body">
      <img src="images/linkedin-logo.png" alt="LinkedIn" class="news-card__source-logo">
      <p class="news-card__headline">Headline text</p>
      <time class="news-card__date" datetime="YYYY-MM-DD">DD Month YYYY</time>
      <span class="news-card__read-more" aria-hidden="true">Read more →</span>
    </div>
  </a>
</div>
```

*External article (press, industry, research):*
```html
<div class="nd-carousel__slide">
  <a href="URL" target="_blank" rel="noopener noreferrer" class="news-card"
     aria-label="Source Name — Headline text">
    <div class="news-card__img-wrap">
      <img src="images/filename.jpg" alt="" class="news-card__img" loading="eager" aria-hidden="true">
    </div>
    <div class="news-card__body">
      <p class="news-card__source">Source Name</p>
      <p class="news-card__headline">Headline text</p>
      <time class="news-card__date" datetime="YYYY-MM-DD">DD Month YYYY</time>
      <span class="news-card__read-more" aria-hidden="true">Read more →</span>
    </div>
  </a>
</div>
```

**Rules:**
- `aria-label`: `"Source — Headline"` format; keep under 80 characters.
- `datetime` attribute: ISO format `YYYY-MM-DD`. Display text: `DD Month YYYY` (e.g. `15 April 2026`).
- Date unknown: omit the `<time>` element entirely. Never leave `datetime` empty.
- Card image: any relevant image placed in `public/images/`. If none available, reuse an existing news image from the same folder.
- `loading="eager"` — carousel slides may be above the fold.
- Card images are decorative: `alt=""` and `aria-hidden="true"` on the `<img>`.

---

### Task Guide 7: Adding a Team Member

Team members live in `about.html` inside `<div class="team-top-tier">` or the advisor grid below it. Copy an existing `<article class="team-card">` block and update only the values listed below.

**What to update:**
- `href` on the LinkedIn badge anchor — the member's LinkedIn profile URL
- `src` on the photo `<img>` — path to the new photo in `public/images/`
- `alt` on the photo `<img>` — format: `"Full Name — Role, vāsuqi"`
- `team-card__role` — job title or role (e.g. `Advisor`, `CTO`)
- `team-card__name` — full name
- `team-card__bio` — one or two sentences; follow Task Guide 2 tone

**Photo treatment:**
- Place the photo file in `public/images/`. Any format is accepted (`.jpg`, `.webp`, `.png`).
- Do not convert to black and white manually — CSS applies `filter: grayscale(1) contrast(1.1)` automatically.
- The container crops to a 4:5 ratio from the top (`object-position: center top`). Portrait orientation works best; ensure the face is in the upper half of the image.
- Use `width="400"` on the `<img>` element.

**Do not remove the blob elements:**
The three `<div class="team-card__blob-el">` divs inside `.team-card__blob` are required — they drive the animated background on hover. Removing them breaks the animation silently.

---

### Component Derivation Protocol

Run all 5 steps in order before writing component code.

**Step 1 — Identify the material language.**
Is this ambient or motion? → Water. Structural overlay or card? → Glass. Technical, data, or diagram? → Blueprint. Glow, CTA, accent, or hover? → Light. (One primary language; Light overlays Water physics.)

**Step 2 — Determine component function.**
Structural (layout shell, section wrapper) vs. Decorative (background element, icon) vs. Interactive (button, link, card, form field).

**Step 3 — Apply that language's visual properties from `design-tokens.css`.**
- Water: `--navy-deep` → `--blue-primary` gradient range; organic shape; no borders.
- Glass: `--white-brand` @80% opacity background; `--ice-near` border; `backdrop-filter` blur.
- Blueprint: `--steel` or `--ice-near` border; `--navy-deep` or `--steel` text on `--white-brand`/`--ice-near` surface; `currentColor` SVG.
- Light: `--blue-mid` soft glow; `--cyan-light` hard glow; no background fill needed.

**Step 4 — Apply water physics motion if animated.**
Use `WATER_DURATION`, `WATER_EASE`, `WATER_STAGGER` from `src/animations/constants.js`. No bounce, no snap, no spring. `once: true` on ScrollTrigger. `repeat: -1, yoyo: true` for loops.

**Step 5 — Apply the Same Designer test.**
Would a first-time visitor identify this as added later by a different designer? If yes — revise token choice, material language, or motion before committing.

---

### Human Review Identifiers

An AI agent must **never** do any of the following without explicit founder instruction:

- Introduce a new CSS colour token. The 10-token palette is closed for Phase 1.
- Use a hex value directly in CSS or an inline style.
- Modify any of the six shared namespace section IDs (`intro-animation`, `hero`, `the-gap`, `where-vasuqi-fits`, `what-its-built-to-change`, `how-it-works`).
- Alter the 3-column nav grid structure: logo must stay centered, Contact CTA must stay rightmost, About Us must stay adjacent to the CTA. New page links may be added to the left column following the column-balance rule (Anti-list item 7), by editing `partials/nav.html`.
- Alter `design-tokens.css` — add, rename, or remove any token.
- Modify this design manual (`docs/design-manual.md`) — the manual is the authority; do not self-modify.
- Add a new font family. Only `--font-syne` and `--font-manrope` are in the system.
- Remove or alter the North Star Rule.
- Add `prefers-reduced-motion` media queries for GSAP animations. GSAP runs unconditionally; the hero `<video>` pause on reduced-motion is the only permitted exception and is already in place.
- Remove the nav bar or footer from any page, or publish a new page without both present and unmodified.

---

## Part 4 — Anti-list, Evolution Triggers & Living Components

### Anti-list

Never do any of the following. Each item names the violation and the risk.

1. **No pure black (`#000000`)** — not in the palette. Use `--navy-deep` (#0A1F44) for the darkest text. There is no sanctioned "darkest surface" — all surfaces stay light.
2. **No pure white (`#ffffff`)** — not in the palette. Use `--white-brand` (#FAFCFF).
3. **No colour outside the 10-token palette** — Palette Closure Rule: see below.
4. **No dark mode** — the site has one visual system; a light/dark toggle is out of scope for Phase 1.
5. **No AI-default gradients** — blue-to-purple and blue-to-teal are generic AI SaaS clichés. The only permitted gradient is `--navy-deep` → `--blue-primary`, used as an overlay on the hero (not as a solid `background-color`). `--navy-deep` may appear as a gradient colour stop but never as a flat background fill.
6. **No generic card components** — rounded corners + drop shadow + white background is the generic web card. Use Glass (frosted, `--ice-near` border, `--white-brand` at ~80% opacity) or Blueprint (border-only, `--steel` or `--ice-near`) instead.
7. **Keep left and right nav columns balanced** — the nav is a 3-column CSS grid: secondary links (left), logo (center, fixed), About Us + Contact CTA (right, fixed). New pages are added to the left column. Use judgment to keep both sides visually balanced; do not overload one side.
8. **No spring, bounce, or snap easing** — Water physics only (`WATER_EASE: 'power1.inOut'`). Bounce and spring destroy the fluid, non-linear motion character.
9. **No `prefers-reduced-motion` queries for GSAP animations** — GSAP animations run unconditionally. The hero `<video>` is the sole exception: it is paused when `prefers-reduced-motion: reduce` is set. Do not suppress GSAP anywhere, and do not add new motion queries.
10. **No inline `style` attributes in HTML** — all styling through `design-tokens.css` tokens and CSS classes. Inline styles create untrackable overrides.
11. **No magic numbers in CSS** — every numeric value must be derivable from a `design-tokens.css` token. A value not mappable to a token is a signal to use an existing token instead.
12. **No font other than Syne and Manrope** — `--font-syne` (headings) and `--font-manrope` (body/UI). A third font fractures the typographic system.
13. **No in-page CTAs** — the only call to action on the site is the Contact button in the sticky navigation bar. Do not add CTA buttons, "Get in touch" links, or contact prompts inside any page content. The nav is always visible; a second CTA is redundant and dilutes the brand.
14. **No `--navy-deep` as any background** — `--navy-deep` is a text colour exclusively. All section, card, overlay, and page backgrounds use light tokens (`--white-brand`, `--ice-near`, or transparent). The hero section appears dark because of the background video — its CSS background is still `--ice-near`. Using `--navy-deep` as a background creates an unsanctioned dark mode.

#### Palette Closure Rule

The 10-token palette is closed for Phase 1. No new `--` colour tokens are introduced. Any situation that appears to require a new colour is solved by combining existing tokens (e.g. layering at reduced opacity) or adjusting opacity on an existing token — never by adding a new token.

---

### Evolution Triggers

Named product milestones — not dates — that signal an intentional design system update. The founder decides when each milestone is reached.

| # | Milestone | Trigger condition | What changes |
|---|-----------|-------------------|--------------|
| 1 | **Real product photography** | Working prototype exists | Replace Blueprint PNG backgrounds and placeholder imagery with product photos; Water hero section may shift to image-composite. |
| 2 | **Retire Blueprint aesthetic** | Phase 2 brand evolution (post-seed, product-market fit) | Blueprint language de-emphasised; system shifts toward lighter, more consumer-facing visual identity. |
| 3 | **Shift to B2B operator tone** | Pilot program launch | Copy shifts from investor WHY framing to operator HOW framing; task-based sections in this manual must be rewritten for a technical operations audience. |

Until a trigger condition is met, these parts of the system are intentionally provisional. Do not evolve them ahead of schedule.

---

### Living Components

Add an entry to this table before the coding session ends when you create a new component. Include: component class or ID, material language, key tokens used, and a one-line derivation note.

| Component | Material language | Key tokens | Derivation notes |
|-----------|------------------|------------|-----------------|
| `.fl-beam` | Light (over Water) | `--blue-mid`, `--cyan-light` | Floating beam: Water physics loop (`WATER_EASE`, `WATER_DURATION.slow`), Glass opacity layering |
| `.news-card` | Blueprint | `--steel`, `--ice-near`, `--white-brand` | Blueprint card: border-only structure, no shadow, `--ice-near` rule line |
| `.wvfit-card` | Glass | `--ice-near`, `--white-brand` | Glass card: `rgba(217,217,217,0.20)` bg, `backdrop-filter:blur(8px)`, `border-radius:88px`. NEVER add `overflow:hidden` — breaks backdrop-filter. On mobile (<768px): border-radius collapses to 0, inset shadow replaces drop-shadow. Contains `.wvfit-diagram` (`<picture>` responsive SVG swap: desktop ≥768px loads `thefit.svg`, mobile loads `thefitmobile.svg`). |
| `.benefit-blob-new__blob-wrap` | Glass | `--white-brand` | Standalone 420×420px sizing context (`position: relative; width: 420px; height: 420px; max-width: 100%`); `drop-shadow(0 6px 16px rgba(0,0,0,0.12))` on the PNG blob. NEVER add `overflow: hidden` — the silhouette drop-shadow requires unclipped rendering. |
| `.about-serpent` | Water | — | Decorative right-side accent SVG (`vasuqilogo.svg`); `position: absolute; top: 40px; right: -60px; width: 520px; opacity: 0.28`. Parent `#section-why` has `overflow: hidden` to clip the overflowing right edge at the viewport boundary. |
| `.side-nav__dot` | Light | `--cyan-light` | 8×8px circle; inactive: `background-color: var(--cyan-light)` + 2-layer soft glow (`box-shadow: 0 0 0 1px, 0 0 6px 1px` at 50% and 25% opacity via `color-mix`). Active: scale 1.3×, 4-layer strong glow (`0 0 0 1px`, `0 0 10px 3px` at 70%, `0 0 22px 6px` at 35%, `0 0 40px 10px` at 15%). Always `--cyan-light`; never revert to `--blue-soft`. Same style on every page that has a side nav. |

If this table is empty when an AI agent reads it, the agent must prompt the founder to add a row before closing the session.
