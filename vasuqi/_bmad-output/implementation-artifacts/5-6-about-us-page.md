# Story 5.6: About Us Page Fidelity

Status: done

## Story

As an investor reviewing the founding team,
I want the About Us page to render with the correct background layers, Syne-styled mythology copy, asymmetric team card layout, animated water blob portraits, and accurate bios and LinkedIn links,
so that the team section communicates depth, authenticity, and scientific credibility.

## Acceptance Criteria

**AC1 — Page background is ice-near in the "Why" area (ABOUT-BG-1):**
Given `about.html`
When rendered
Then `background: var(--ice-near)` (`#E8F2FF`) is applied to `body.page-about` in `src/styles/main.css`; the team section uses `--white-brand` background (see AC3)
**CRITICAL:** The correct token is `--ice-near` (`#E8F2FF`) — NOT `--blue-light` (which does not exist in `design-tokens.css`). Follow the exact pattern from `body.page-news { background: var(--ice-near); }` already in `main.css`.

**AC2 — Hero gradient overlay behind "Why vāsuqi?" (ABOUT-BG-2):**
Given the "Why vāsuqi?" section area
When rendered
Then a full-width `div.about-hero-gradient` (832px tall) sits over the intro section with: `background: linear-gradient(to bottom, rgba(92,107,133,0.20) 1%, rgba(232,250,255,0.20) 56%, rgba(250,252,255,0.20) 100%)`, `box-shadow: 0 -2px 7.7px 0 rgba(10,31,68,1)`, `pointer-events: none`, `z-index: 0`, `position: absolute`, `inset: 0 0 auto 0`, inside `#section-why` which must have `position: relative`

**AC3 — Team section has white-brand background (ABOUT-BG-3):**
Given the team section area (from approximately 832px down)
When rendered
Then the team section wrapper has `background: var(--white-brand)` (`#FAFCFF`), overriding the `--ice-near` base background set on `body.page-about`

**AC4 — Snake logo watermark behind "Why" text (ABOUT-BG-4):**
Given the "Why vāsuqi?" section
When rendered
Then a large (~616×606px) Vāsuqi snake/logo SVG watermark is positioned absolutely centered behind the heading and body text: `pointer-events: none`, `aria-hidden="true"`, `z-index: 0`, low opacity (~0.06–0.10); the heading and body text sit above it at a higher z-index

**AC5 — "Why vāsuqi?" heading is blue-deep (ABOUT-WHY-1):**
Given the "Why vāsuqi?" heading
When rendered
Then the h1 is `color: var(--blue-deep)` (`#0033CC`), Syne ExtraBold (weight ~743), 55px, line-height 1.06
**CRITICAL token fix:** The gap audit wrote `#0033CC` and labelled it `--blue-primary` — but in `design-tokens.css`, `--blue-primary: #0044FF` and `--blue-deep: #0033CC`. The correct token for `#0033CC` is `var(--blue-deep)`. The base `h1` style in `main.css` already sets `var(--text-h1-size)` (55px) and `var(--text-h1-weight)` (743) via `@layer base` — so only the color override `color: var(--blue-deep)` needs to be added.

**AC6 — "Why vāsuqi?" body text uses Syne SemiBold 24px with correct copy (ABOUT-WHY-2):**
Given the "Why vāsuqi?" body text
When rendered
Then the font is Syne SemiBold 24px, `--navy-deep`; the copy is exactly three paragraphs:
1. "The name comes from a Hindu myth. Vāsuki is the great serpent who let himself be wound around a mountain and pulled back and forth between gods and demons to churn the cosmic ocean. It took a long time. Poison came out first. The nectar of immortality came much later."
2. "We liked that. A toxic thing, worked on for long enough, eventually turns into something you can drink."
3. "That's more or less what our technology does. The pollutants conventional treatment gives up on, we keep going at, until the water is actually clean."
The "Meet the people building it." sentence is removed. Existing 2-paragraph Manrope body text is replaced entirely.

**AC7 — Team section has heading, subheading, and intro paragraph (ABOUT-TEAM-1):**
Given the `#team-grid` section
When rendered on desktop
Then the left column of the top tier contains: h2 "The team" (Syne ExtraBold 55px, `--navy-deep`), subheading "Built by operators, not observers." (Syne SemiBold 24px, `--navy-deep`), intro paragraph "Vasuqi is founder-led and built by people who understand industrial water, technology development, and what it takes to turn a deep-tech concept into engineered reality." (Syne Regular 32px, black, width ~646px)
Adarsh's card sits in the right column of the top tier at the same vertical level

**AC8 — Team card layout is asymmetric two-tier (ABOUT-TEAM-2):**
Given the team grid
When rendered on desktop
Then the layout is: top tier = text block (left ~50%) + Adarsh card (right ~50%); bottom tier = 3 equal cards in a row (Jörg / Peter / Angela)
On mobile: 4 cards stacked vertically (Adarsh → Jörg → Peter → Angela)

**AC9 — Team card photos have grayscale treatment and animated water blobs (ABOUT-CARD-1):**
Given each team member card
When rendered
Then: each `<img>` portrait has `filter: grayscale(1) contrast(1.1)`; a `.team-card__blob` wrapper (position absolute, pointer-events none, overflow hidden, z-index 0) contains 3–4 blob `div` elements with organic `border-radius` (e.g. `60% 40% 70% 30% / 50% 60% 40% 70%`), fill `--blue-soft` or `--blue-light` at low opacity, `filter: blur(30px)`, staggered `@keyframes float-blob` animation (4–6s ease-in-out infinite, varied delay per blob); no solid white box artifact appears around any card

**AC10 — Team card text styles match spec (ABOUT-CARD-2):**
Given each team card
When rendered
Then: role label (e.g. "CEO") is Syne SemiBold 24px, `#FAFCFF` (`var(--white-brand)`), `mix-blend-mode: difference`; name (e.g. "Adarsh Raj") is Syne Bold 40px, `var(--blue-primary)` (`#0044FF`); bio is Syne Regular 24px, black (`#000000` — not `--navy-deep`)
**Note:** Name uses `var(--blue-primary)` (`#0044FF`) — this is different from the h1 heading which uses `var(--blue-deep)` (`#0033CC`). These are intentionally different tokens.

**AC11 — Team card bios are the correct short Figma bios (ABOUT-CARD-3):**
Given each team card
When rendered
Then the bio copy is exactly:
- Adarsh Raj: "Leads Vāsuqi at the intersection of industrial water strategy, company building, and deep-tech execution."
- Jörg Vogel: "Leads technology strategy and development, translating water innovation into engineered systems."
- Peter Holme Jensen: "Leads technology strategy and development, translating water innovation into engineered systems."
- Angela Zhang: "Guides the scientific direction of Vāsuqi with expertise in visible-light photocatalysis and water treatment research."

**AC12 — LinkedIn treatment is icon badge at top-right of card, correct URLs (ABOUT-CARD-4):**
Given each team card
When rendered
Then a small LinkedIn SVG icon badge (~26×26px) is positioned `top-right` of the card container as an `<a>` wrapping the icon; the "View on LinkedIn" text link is removed; URLs are:
- Adarsh Raj: `https://www.linkedin.com/in/radiantraj/`
- Jörg Vogel: `https://www.linkedin.com/in/jorg-vogel/`
- Peter Holme Jensen: `https://www.linkedin.com/in/peter-holme-jensen-ba63b9/`
- Angela Zhang: `https://www.linkedin.com/in/wenjing-angela-zhang-a8457515/`

**AC13 — Footer gradient blends with white-brand team section (ABOUT-FOOTER-1):**
Given the `<footer>` on `about.html`
When rendered
Then the footer gradient starts at `#FAFCFF` or `#C3D4F7` at 0% — no hard visible seam against the white-brand team section background; same pattern as ND-FOOTER-1
**Implementation:** The `<footer>` in `partials/footer.html` has an **inline `style` attribute** with the default gradient. To override it, add `body.page-about footer { background: linear-gradient(to bottom, #FAFCFF 0%, #C3D4F7 15%, #748DCC 56%, #0033CC 89%, #0A1F44 100%) !important; }` — the `!important` is **required** to beat the inline style. This is the exact same pattern used for `body.page-news footer` already in `main.css` at line ~970.

## Tasks / Subtasks

- [x] Set up page background zones (AC: 1, 3)
  - [x] Add `body.page-about { background: var(--ice-near); }` in `src/styles/main.css` — follow existing `body.page-news` pattern; `--ice-near` is the correct token for `#E8F2FF`; `--blue-light` does NOT exist
  - [x] Wrap the team section in a div with `background: var(--white-brand)` to override the `--ice-near` base

- [x] Add hero gradient overlay (AC: 2)
  - [x] Add a `div.about-hero-gradient` inside the "Why vāsuqi?" section with the specified gradient and shadow, `position: absolute`, `inset: 0 0 auto 0`, `height: 832px`, `pointer-events: none`

- [x] Export and add snake watermark (AC: 4)
  - [x] Export the snake/logo watermark SVG from Figma (node `1296:386` in "rigtig landingpage" — may be in the About page frame instead; check both)
  - [x] Place as `<img src="/svgs/vasuqilogo.svg" aria-hidden="true" class="about-watermark">` inside the "Why" section
  - [x] CSS: `position: absolute`, centered, `top: ~171px`, `z-index: 0`, `opacity: 0.07`, `width: 616px`, `height: 606px`

- [x] Fix "Why vāsuqi?" heading (AC: 5)
  - [x] Change heading color to `var(--blue-deep)` (`#0033CC`) — NOT `var(--blue-primary)` which is `#0044FF`
  - [x] Font size/weight already set by `@layer base h1` (55px, weight 743, line-height 1.06) — only the color override is needed

- [x] Replace "Why vāsuqi?" body text (AC: 6)
  - [x] Delete existing 2-paragraph Manrope body text and "Meet the people building it." sentence
  - [x] Add 3 `<p>` elements with verbatim Syne mythology copy
  - [x] Apply `font-family: var(--font-syne)`, `font-size: 24px`, `font-weight: 600`, `color: var(--navy-deep)`

- [x] Add team section heading block (AC: 7)
  - [x] Inside `#team-grid`, add heading block before the cards: h2 "The team", p "Built by operators, not observers.", p "Vasuqi is founder-led…" with correct type styles
  - [x] On desktop, this block occupies the left column of the top tier (CSS grid or flex layout)

- [x] Rebuild team card layout (AC: 8)
  - [x] Replace `grid-cols-1 md:grid-cols-2 gap-8` with a two-section layout
  - [x] Top tier desktop: `grid-cols-2` — text block + Adarsh card
  - [x] Bottom tier desktop: `grid-cols-3` — Jörg / Peter / Angela
  - [x] Mobile: `grid-cols-1` stacking all in order

- [x] Add animated water blob treatment to team cards (AC: 9)
  - [x] Apply `filter: grayscale(1) contrast(1.1)` to all `<img>` portrait elements
  - [x] Add `.team-card__blob` wrapper inside each card (position absolute, overflow hidden, z-index 0, pointer-events none)
  - [x] Inside each wrapper: 3–4 blob divs with organic border-radius, `background: var(--blue-soft)` at 20–30% opacity or `var(--blue-light)` at low opacity, `filter: blur(30px)`
  - [x] Add `@keyframes float-blob` CSS animation: gentle translateY + slight rotate, 4–6s ease-in-out infinite; stagger `animation-delay` per blob (0s, 1.2s, 2.4s)
  - [x] Ensure blob container does not produce a white box — use transparent-background fills only, not `--white-brand` or `#ffffff`

- [x] Fix team card text styles and bios (AC: 10, 11)
  - [x] Role: Syne SemiBold 24px, `var(--white-brand)` (`#FAFCFF`), `mix-blend-mode: difference`
  - [x] Name: Syne Bold 40px, `var(--blue-primary)` (`#0044FF`) — this IS correct for the name
  - [x] Bio: Syne Regular 24px, `color: black` (`#000000`) — not `var(--navy-deep)`
  - [x] Replace all 4 bio paragraphs with verbatim spec copy

- [x] Fix LinkedIn treatment and URLs (AC: 12)
  - [x] Remove "View on LinkedIn" text link (currently `.team-card__linkedin` in `.team-card__body`)
  - [x] Add `<a href="..." class="team-card__linkedin-badge" ...>` wrapping a LinkedIn SVG icon (~26×26px), positioned `absolute; top: 1rem; right: 1rem` inside the `.team-card` wrapper (not inside `.team-card__body`)
  - [x] Reuse the LinkedIn SVG path from `partials/footer.html` (inline SVG, `viewBox="0 0 24 24"`, `fill="currentColor"`, `aria-hidden="true"` on the svg, `aria-label` on the `<a>`)
  - [x] Use the 4 confirmed LinkedIn URLs from the spec (current code has wrong slugs)

- [x] Fix footer gradient seam (AC: 13)
  - [x] Add: `body.page-about footer { background: linear-gradient(to bottom, #FAFCFF 0%, #C3D4F7 15%, #748DCC 56%, #0033CC 89%, #0A1F44 100%) !important; }` — `!important` is required because `partials/footer.html` uses an inline `style` attribute; place this rule after the `body.page-about { background: var(--ice-near); }` rule
  - [x] Update the deferred-work note about placeholder LinkedIn URLs (Story 3-2) as resolved

## Dev Notes

### CRITICAL: Token Name Corrections

The gap audit document has two token labelling errors. Always use the actual `design-tokens.css` values:

| Gap audit says | Correct token | Hex value |
|---|---|---|
| `--blue-light` (doesn't exist) | `var(--ice-near)` | `#E8F2FF` |
| `--blue-primary` for `#0033CC` | `var(--blue-deep)` | `#0033CC` |
| `--blue-primary` for `#0044FF` | `var(--blue-primary)` | `#0044FF` ✓ |

Use `var(--blue-deep)` for the h1 heading color. Use `var(--ice-near)` for the page background. Use `var(--blue-primary)` for team card names (this one is correct in the gap audit).

### Current State of `about.html` — MUST READ Before Modifying

The file at `about.html` (157 lines) already has:
- `body.page-about` class — triggers existing active nav CSS
- `#section-why` with `<h1>` "Why Väsuqi?" (wrong copy, wrong font, no color override)
- `#team-grid` with `.grid.grid-cols-1.md:grid-cols-2` — uniform 2-column grid (must become asymmetric 2-tier)
- All 4 team cards with `.team-card__photo`, `.team-card__body`, `.team-card__name`, `.team-card__role`, `.team-card__bio`, `.team-card__linkedin`
- Correct photo filenames: `Adarsh.jpg`, `joerg.webp`, `Peter.jpg`, `Angela.jpg`
- LinkedIn links present but with **wrong URL slugs** and **wrong text** ("View on LinkedIn" → must become icon badge)
- Bios are long marketing bios (must be replaced with short Figma bios)
- No blob wrapper, no grayscale filter, no watermark, no hero gradient, no page background

### Current State of `src/styles/main.css` — About Us Section

The existing `/* ── About Us page (Story 3.2) */` block at line ~1179 already defines:
- `@keyframes blobMorph` — CSS clip-path morphing (keep this for photo shape, but story 5.6 ALSO needs the new `float-blob` animation for the decorative blob background elements)
- `.team-card`, `.team-card:hover`, `.team-card__photo`, `.team-card__photo img` with `animation: blobMorph`
- `.team-card__name` with `color: var(--navy-deep)` — **must update to `var(--blue-primary)` for names**
- `.team-card__role` with `font-family: var(--font-manrope)` — **must update to Syne SemiBold 24px, `var(--white-brand)`, `mix-blend-mode: difference`**
- `.team-card__bio` with `font-family: var(--font-manrope)` — **must update to Syne Regular 24px, black**
- `.team-card__linkedin` as text link — **must update/replace with `.team-card__linkedin-badge` absolute-positioned icon**

Add ALL new Story 5.6 styles **within the existing About Us block** (don't create a duplicate `/* ── About Us page (Story 5.6) */` block — append to the Story 3.2 block or note clearly).

### `#section-why` Must Have `position: relative`

The hero gradient overlay (AC2) uses `position: absolute` inside `#section-why`. Add `position: relative` to `#section-why` so the absolute-positioned overlay is contained.

### The Snake Watermark SVG

Look in Figma under the About page frame (`348:304`) for the large ghost watermark behind the "Why vāsuqi?" text (node `1296:386`). Save exported SVG to `public/svgs/vasuqi-snake-watermark.svg`. If Figma MCP cannot locate it, use a placeholder and flag in completion notes.

### LinkedIn Icon Badge — Reuse Footer SVG

The footer (`partials/footer.html`) already has an inline LinkedIn SVG at `viewBox="0 0 24 24"`. Copy the exact `<svg>` and `<path d="...">` from there — do NOT create a new external SVG file. The badge `<a>` wraps the SVG, positioned `absolute; top: 1rem; right: 1rem` on the `.team-card` (not inside `.team-card__body`). The `.team-card` already has `overflow: hidden; position: relative` (from Story 3.2 CSS). Keep `aria-label="View [Name] on LinkedIn (opens in new tab)"` on the `<a>` and `aria-hidden="true"` on the `<svg>`.

### `mix-blend-mode: difference` on Role Label

Role text must be `color: var(--white-brand)` (`#FAFCFF`) with `mix-blend-mode: difference`. This inverts the light color against dark areas for contrast. The card background is light glass (`--white-brand`) — test that it reads well against the photo area.

### Water Blob Animation — Two Separate Animations

This story introduces two distinct animation types on the card:
1. **Photo shape** — existing `@keyframes blobMorph` with `clip-path: polygon(...)` on `.team-card__photo img` — KEEP as-is
2. **Background blobs** — NEW `@keyframes float-blob` with `translateY` + `rotate` on `.team-card__blob div` elements — ADD this

The `.team-card__blob` wrapper needs: `position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0`. The `.team-card` already has `position: relative` and `overflow: hidden`. Blob divs: `background: var(--blue-soft)` at ~25% opacity or `var(--ice-near)` at low opacity; `filter: blur(30px)`.

### GSAP Scroll Animations in `src/about.js`

`src/about.js` already has GSAP ScrollTrigger animations for `#section-why .section-heading` and `.team-card` (from Story 3.2). After the HTML restructure:
- The heading in `#section-why` becomes `#section-why h1` — verify the selector still targets it
- The new `.team-section-text` heading block and Adarsh card are in the top tier — add entrance animation for `.team-section-text` elements
- All ScrollTrigger instances must use `once: true` — do NOT remove existing `once: true`

### CSS `--text-h2-size` = 24px

The `--text-h2-size` token is 24px (`1.5rem`) at `font-weight: 600` (SemiBold). Use `var(--text-h2-size)` and `var(--text-h2-weight)` for the team section subheading "Built by operators, not observers." and for the "Why vāsuqi?" body text (both are 24px SemiBold). The team intro paragraph is 32px — there is no 32px token; use `font-size: 2rem` directly.

### Page Background CSS Pattern

Follow the existing `body.page-news` pattern:
```css
body.page-about {
  background: var(--ice-near);
}
body.page-about footer {
  background: linear-gradient(to bottom, #FAFCFF 0%, #C3D4F7 15%, #748DCC 56%, #0033CC 89%, #0A1F44 100%) !important;
}
```
The `!important` on the footer rule is mandatory — `partials/footer.html` has an inline `style` attribute that would otherwise override it.

### `mix-blend-mode: difference` Note

The role label in the original Story 3-2 CSS was `font-family: var(--font-manrope); color: var(--steel)`. This entire rule must be replaced — Syne SemiBold 24px, `var(--white-brand)`, `mix-blend-mode: difference`.

### `deferred-work.md` Update

Check `/Users/edda/source/vasuqi/_bmad-output/implementation-artifacts/deferred-work.md` and mark the Story 3-2 LinkedIn URL placeholder item as resolved.

- Deferred-work item from Story 3-2: "LinkedIn profile URLs for all 4 team members are placeholder/guessed values — founder must verify correct profile URLs before launch." This story resolves that item with the confirmed URLs from the gap audit.

### Project Structure Notes

- Page: `about.html` (already exists — modify in place)
- Styles: `src/styles/main.css` — append to the existing `/* ── About Us page (Story 3.2) */` block; do NOT create a new block header
- Animation JS: `src/about.js` — add `.team-section-text` scroll entrance; verify existing selectors still match after HTML restructure
- Snake watermark SVG: export to `public/svgs/vasuqi-snake-watermark.svg`
- LinkedIn icon SVG: inline from `partials/footer.html` — do NOT add new file to `public/svgs/`
- Do NOT modify: `partials/nav.html`, `partials/footer.html`, `design-tokens.css`, `vite.config.js`, other page HTML files

### References

- Gap audit codes: ABOUT-BG-1 through ABOUT-BG-4, ABOUT-WHY-1, ABOUT-WHY-2, ABOUT-TEAM-1, ABOUT-TEAM-2, ABOUT-CARD-1 through ABOUT-CARD-4, ABOUT-FOOTER-1
- Source: `_bmad-output/planning-artifacts/epic5-gap-audit.md`
- Deferred item resolved: Story 3-2 LinkedIn URL placeholder

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References
- Figma node `1296:386` (snake watermark) returned an empty SVG group (`<g opacity="0.08"></g>`) — no path data available. Used `vasuqilogo.svg` as a placeholder watermark per Dev Notes fallback instruction. Flag for designer to export the correct asset when available.

### Completion Notes List
- AC1: `body.page-about { background: var(--ice-near); }` added to About Us CSS block — correct token used (not `--blue-light`)
- AC2: `div.about-hero-gradient` with 832px height, specified gradient, box-shadow, `position:absolute`, `pointer-events:none` added inside `#section-why`; `#section-why` given `position:relative`
- AC3: `div.about-team-section` wrapper with `background: var(--white-brand)` wraps entire team section
- AC4: Snake watermark rendered via `vasuqilogo.svg` placeholder (Figma node was empty); `opacity:0.07`, 616×606px, centered absolute above content
- AC5: `.about-why-heading` adds `color: var(--blue-deep)` — correct `#0033CC` token; font size/weight from `@layer base` h1 unchanged
- AC6: Old 2-paragraph Manrope body + "Meet the people" sentence replaced; 3 verbatim mythology paragraphs in `.about-why-body` with Syne SemiBold 24px `--navy-deep`
- AC7: `.team-section-text` block with h2 "The team" (Syne 55px ExtraBold), subheading (Syne 24px SemiBold), intro paragraph (Syne 32px Regular, black) added as left column of top tier
- AC8: Two-tier layout — `.team-top-tier` (grid 1→2col at md) + `.team-bottom-tier` (grid 1→3col at md); mobile stacks all 4 cards vertically
- AC9: `filter: grayscale(1) contrast(1.1)` on all card `<img>`; `.team-card__blob` wrapper with 3 blob divs per card using `var(--blue-soft)` + `var(--ice-near)`, `filter:blur(30px)`, `@keyframes float-blob` (4–6s, staggered 0s/1.2s/2.4s delays); no solid background colors used
- AC10: Role = Syne SemiBold 24px `var(--white-brand)` `mix-blend-mode:difference`; Name = Syne Bold 40px `var(--blue-primary)` (#0044FF); Bio = Syne Regular 24px `#000000`
- AC11: All 4 verbatim short bios from spec applied correctly
- AC12: "View on LinkedIn" text links removed; `.team-card__linkedin-badge` icon badges (26×26px) positioned `absolute top:1rem right:1rem` on each card; LinkedIn SVG path reused from `partials/footer.html`; all 4 confirmed URLs applied
- AC13: `body.page-about footer` with `!important` gradient starting at `#FAFCFF 0%` — seam eliminated; deferred-work item from Story 3-2 marked resolved
- `src/about.js`: Updated selector from `.section-heading` to `h1` for heading animation; added `.team-section-text > *` staggered entrance animation with `once:true`

### File List
- about.html
- src/styles/main.css
- src/about.js
- _bmad-output/implementation-artifacts/deferred-work.md

## Tasks / Subtasks — Review Findings

### Review Findings

- [x] [Review][Patch] `team-card__blob-el--3` missing explicit background declaration [`src/styles/main.css` — `.team-card__blob-el--3`] — applied: added `background: var(--blue-soft)` to match sibling blob elements and remove implicit inheritance dependency

## Change Log
- 2026-05-27: Story 5.6 implemented — About Us page full visual fidelity pass: page backgrounds, hero gradient overlay, watermark, mythology copy, asymmetric team grid layout, animated water blob portraits, updated card typography, icon-only LinkedIn badges with correct URLs, footer gradient fix
- 2026-05-27: Code review complete — 0 decision-needed, 1 patch applied (blob-el--3 explicit background), 0 deferred, 3 dismissed
