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
| `--navy-deep` | #0A1F44 | Darkest surface — section fills and overlays only. Never the page or body background. |
| `--blue-primary` | #0044FF | Brand blue, primary CTA |
| `--blue-deep` | #0033CC | Pressed/active state |
| `--blue-mid` | #6A93FF | Soft glow, secondary accent |
| `--blue-soft` | #A8C5FF | Subtle highlights |
| `--cyan-light` | #00E5FF | Hard glow, Light language accents |
| `--steel` | #5C6B85 | Body text, secondary labels |
| `--ice-light` | #D6F8FF | Light surface tints |
| `--ice-near` | #E8F2FF | Glass borders, card backgrounds |
| `--white-brand` | #FAFCFF | Primary text, Glass surfaces |

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

Type scale tokens (in `design-tokens.css`):
- `--text-h1-size` / `--text-h1-weight` / `--text-h1-line-height`
- `--text-h2-size` / `--text-h2-weight` / `--text-h2-line-height`
- `--text-h3-size` / `--text-h3-weight` / `--text-h3-line-height`
- `--text-body-size` / `--text-body-weight` / `--text-body-line-height`
- `--text-caption-size` / `--text-caption-weight` / `--text-caption-line-height`

---

### Shared Namespace Rule

Section IDs in HTML, section names in this manual, and side nav anchor labels must be identical strings. The canonical IDs are:

```
intro-animation  hero  the-gap  where-vasuqi-fits  what-its-built-to-change  how-it-works
```

Never rename an ID without updating all three references simultaneously.

---

## Part 3 — Task Guides & Component Derivation Protocol

### Task Guide 1: Adding a New Section

1. Choose a material language before writing HTML — it determines tokens, borders, and motion.
2. Add the section `id` in kebab-case. If it appears on the landing page, register it in the shared namespace (Part 2) and in the side nav anchors simultaneously.
3. Use only `design-tokens.css` spacing tokens for layout. No magic pixel values. All units relative (`rem`, `%`, `vw`/`vh`).
4. Mobile-first: base styles target 320px. Use Tailwind `md:`, `lg:`, `xl:` prefixes to layer up.
5. Wire scroll entrance with GSAP: import `WATER_EASE`, `WATER_DURATION`, `WATER_STAGGER` from `src/animations/constants.js`. Use `WATER_DURATION.default` for the duration value. Set `once: true` on all ScrollTrigger instances.
6. Blueprint sections: inline SVGs use `currentColor`; large diagrams are file references in `public/svgs/`.
7. Glass sections: include `-webkit-backdrop-filter` alongside `backdrop-filter`. Never apply `overflow: hidden` to a Glass ancestor.

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

Animation library: **GSAP 3.15.0**. Plugins in use: **ScrollTrigger** (scroll-triggered entrances), **SplitText** (character/word/line split entrances). Blob morphing: GSAP `attr: { d }` tween between two SVG path variants with identical point counts; fallback is CSS `clip-path` morphing if point counts differ.

### Task Guide 4: Adding Media

- Images: `.jpg` for photos, `.png` for assets with transparency, `.svg` for diagrams and icons.
- Every image requires an `alt` attribute. Decorative images: `alt=""` or `aria-hidden="true"`.
- Below-fold images: `loading="lazy"` required.
- File placement:
  - Raster images → `public/images/` (hero, team photos, docs thumbnails)
  - Blueprint PNG backgrounds → `public/images/blueprints/`
  - Document thumbnails → `public/images/docs/`
  - SVG diagrams → `public/svgs/`
  - Blob SVGs → `public/blobs/`
  - Downloadable files → `public/docs/`
- HTML reference pattern: `src="/images/..."` (Vite base-relative path).
- Responsive SVG diagrams (different artwork per breakpoint): use `<picture>` — `<source media="(min-width: 768px)" srcset="/svgs/desktop.svg">` with `<img src="/svgs/mobile.svg">` as fallback. This ensures only one file loads per viewport. Do not use CSS `display:none` to hide one variant — both would download.
- Video: `<video autoplay muted loop playsinline aria-hidden="true">` — `.webm` source first, `.mp4` fallback; always include a `poster` attribute.

---

### Task Guide 5: Adding a New Page

Every page on the Vasuqi site shares the same shell. None of the items below are optional.

**Required shell elements:**

1. Copy the `<head>` block from `index.html`. Update only `<title>`, `<meta name="description">`, and the OG tags. Do not remove or add any other `<head>` element.
2. Set the body background to `var(--ice-near)` — this is the site-wide page background token. It is already applied globally in `main.css`; do not override it.
3. Add a unique body class in the format `page-[pagename]` (e.g. `page-about`). The nav active state is driven by this static body class — not JavaScript. Without it, the nav active indicator will be wrong.
4. Place the nav bar immediately after `<body>`, copied verbatim from `index.html`. Do not add, remove, or relabel any nav item.
5. Place the footer immediately before `</body>`, copied verbatim from `index.html`.
6. Include the `<div id="floating-light">` block (copied from `index.html`) if the page has any above-fold content.

**What changes per page:** `<title>`, `<meta name="description">`, OG tags, the `page-[pagename]` body class, and everything inside `<main>`.

**What never changes:** the `<head>` structure and linked resources, the nav bar, the footer, and the body background token.

**New page checklist:**
- [ ] `<head>` copied from `index.html`; only title and meta tags updated
- [ ] Body class set: `page-[pagename]`
- [ ] Body background is `var(--ice-near)` — confirm `main.css` is not overridden
- [ ] Nav bar included and unmodified
- [ ] Footer included and unmodified
- [ ] No `--navy-deep` used as a section or surface background
- [ ] All new sections follow Task Guide 1 (material language, tokens, GSAP)

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
- Blueprint: `--steel` or `--ice-near` border; `--white-brand` text on `--navy-deep`; `currentColor` SVG.
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
- Change the navigation structure (link count, link labels, CTA position).
- Alter `design-tokens.css` — add, rename, or remove any token.
- Modify this design manual (`docs/design-manual.md`) — the manual is the authority; do not self-modify.
- Add a new font family. Only `--font-syne` and `--font-manrope` are in the system.
- Remove or alter the North Star Rule.
- Add `prefers-reduced-motion` media queries. This is a deliberate design decision; no accommodation is provided anywhere on the site.
- Remove the nav bar or footer from any page, or publish a new page without both present and unmodified.

---

## Part 4 — Anti-list, Evolution Triggers & Living Components

### Anti-list

Never do any of the following. Each item names the violation and the risk.

1. **No pure black (`#000000`)** — not in the palette. Use `--navy-deep` (#0A1F44) for the darkest surface.
2. **No pure white (`#ffffff`)** — not in the palette. Use `--white-brand` (#FAFCFF).
3. **No colour outside the 10-token palette** — Palette Closure Rule: see below.
4. **No dark mode** — the site has one visual system; a light/dark toggle is out of scope for Phase 1.
5. **No AI-default gradients** — blue-to-purple and blue-to-teal are generic AI SaaS clichés. Vasuqi gradients run `--navy-deep` → `--blue-primary` only.
6. **No generic card components** — rounded corners + drop shadow + white background is the generic web card. Use Glass (frosted, `--ice-near` border, `--white-brand` at ~80% opacity) or Blueprint (border-only, `--steel` or `--ice-near`) instead.
7. **No more than 4 top-level nav items** — the current nav has 4. A 5th item breaks visual balance and Glass nav proportions.
8. **No spring, bounce, or snap easing** — Water physics only (`WATER_EASE: 'power1.inOut'`). Bounce and spring destroy the fluid, non-linear motion character.
9. **No `prefers-reduced-motion` media queries** — deliberate design decision. No motion accommodation is provided anywhere on the site.
10. **No inline `style` attributes in HTML** — all styling through `design-tokens.css` tokens and CSS classes. Inline styles create untrackable overrides.
11. **No magic numbers in CSS** — every numeric value must be derivable from a `design-tokens.css` token. A value not mappable to a token is a signal to use an existing token instead.
12. **No font other than Syne and Manrope** — `--font-syne` (headings) and `--font-manrope` (body/UI). A third font fractures the typographic system.
13. **No `--navy-deep` as page or body background** — `--navy-deep` is a section fill and overlay token only. The site-wide body background is `--ice-near`. Using `--navy-deep` on the body creates an unsanctioned dark mode and violates the no-dark-mode rule.

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

If this table is empty when an AI agent reads it, the agent must prompt the founder to add a row before closing the session.
