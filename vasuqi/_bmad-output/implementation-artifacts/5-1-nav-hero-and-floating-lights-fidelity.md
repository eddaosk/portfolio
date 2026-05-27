# Story 5.1: Nav, Hero & Floating Lights Fidelity

Status: done

## Story

As an investor landing on the Vasuqi website,
I want the navigation bar, hero section, and floating light beams to match the Figma prototype exactly,
so that the first impression is polished and brand-authentic from the first pixel.

## Acceptance Criteria

**AC1 — Correct logo in navbar (NAV-1):**
Given the navigation bar
When the page loads
Then the logo is rendered via `<img src="/svgs/vasuqi-logo-navbar.svg">` — not inline SVG path elements

**AC2 — Nav border is a linear gradient stroke (NAV-2):**
Given the navigation bar
When inspected
Then the nav border is a 3px linear gradient: `#E8F2FF` 0% → `#A1A1A1` 50% → `#E8F2FF` 100%, applied via CSS `border-image` or a pseudo-element overlay; `-webkit-` prefixed properties are present for Safari

**AC3 — Nav background opacity is 79% (NAV-3):**
Given the navigation bar
When inspected
Then the fill is `#FAFCFF` at exactly 79% opacity (not 80%)

**AC4 — Nav corner radius is 56px (NAV-4):**
Given the navigation bar
When inspected
Then `border-radius: 56px` is applied — not `border-radius: 9999px` / `rounded-full`

**AC5 — Nav items are evenly distributed (NAV-5):**
Given the navigation bar
When rendered at desktop viewport
Then nav items are evenly distributed across the full nav width with no crowding of "About us" and "Contact" to the right; `justify-between` or `justify-evenly` is applied to the nav flex container

**AC6 — Hero video blend mode is Color Burn (HERO-1):**
Given the hero section
When inspected
Then the `<video>` element has `mix-blend-mode: color-burn` — not `mix-blend-mode: screen`

**AC7 — Backed-by logos have labels (HERO-2):**
Given the backed-by block in the hero
When rendered
Then each logo has a text label directly below it: DTU logo → "DTU Sustain", Innofounder logo → "Innofounder", BII logo → "Bio Innovation Institute"

**AC8 — Mobile backed-by block is a scroll-snap carousel with labels (HERO-3):**
Given the backed-by block on a mobile viewport
When rendered
Then logos are displayed in a horizontally scrollable scroll-snap carousel (`scroll-snap-type: x mandatory`); each logo has the same text labels as desktop; the static flex row is replaced

**AC9 — Floating light beams are left-edge and right-edge only (FLOATINGLIGHT-1):**
Given the floating light component
When rendered
Then beams are positioned only at the left and right edges of the viewport — not scattered at 12%, 55%, 80% across the center of the page

**AC10 — Floating light beams use the correct two-gradient specification (FLOATINGLIGHT-2):**
Given the floating light beams
When inspected
Then beams alternate between Gradient A (blue: `#0044FF` 0% → `#749BFF` 50% → `#E8F2FF` 100%) and Gradient B (cyan: `#00E5FF` 0% → `#D6F8FF` 50% → `#E8F2FF` 100%); single-color token-based gradients are removed

**AC11 — Mobile beam layout is edge-only (FLOATINGLIGHT-3):**
Given the floating light component on mobile
When rendered
Then beams remain at left and right viewport edges at all breakpoints — not at the same scattered desktop positions

**AC12 — Side nav dot uses correct color (SIDENAV-1):**
Given the side navigation
When rendered
Then side nav dots have fill `#A8C5FF` and stroke `#A8C5FF` weight 1 — matching `--blue-soft`

**AC13 — picture-desc design token exists (TOKEN-1):**
Given `design-tokens.css`
When inspected
Then tokens `--text-picture-desc-size: 20px`, `--text-picture-desc-weight: 200` are present; a utility class `.text-picture-desc` applying Manrope ExtraLight 20px auto line-height exists in `main.css`

## Tasks / Subtasks

- [x] Add `.text-picture-desc` token and utility class (AC: 13) — ALREADY DONE
  - [x] `--text-picture-desc-size: 1.25rem` and `--text-picture-desc-weight: 200` exist in `design-tokens.css` lines 41–42
  - [x] `.text-picture-desc` utility class exists in `main.css` lines 56–61 (`font-family: var(--font-manrope)`, correct size/weight, `line-height: auto`)

- [x] Fix nav logo (AC: 1) — ALREADY DONE
  - [x] `partials/nav.html` already uses `<img src="/svgs/vasuqi-logo-navbar.svg" alt="Vāsuqi" width="116" height="36">` (no inline SVG paths)

- [x] Fix nav border gradient (AC: 2) — ALREADY DONE
  - [x] `.nav-gradient-border::before` pseudo-element with gradient mask technique already in `main.css` lines 80–96; `-webkit-mask-composite: destination-out` present for Safari

- [x] Fix nav opacity and corner radius (AC: 3, 4) — ALREADY DONE
  - [x] Nav background is `rgba(250, 252, 255, 0.79)` in `main.css` line 77
  - [x] `border-radius: 56px` applied in `main.css` lines 76 and 84

- [x] Fix nav item distribution (AC: 5)
  - [x] The nav right cell flex container changed from `justify-end` to `justify-between` in `partials/nav.html`. The 3-column `1fr_auto_1fr` grid ensures equal-width wings; `justify-between` on the right flex cell spreads "About us" and "Contact" across the right column, removing the crowding. Grid structure preserved — no conversion to flex.

- [x] Fix hero video blend mode (AC: 6)
  - [x] In `index.html`, `<video>` class changed from `mix-blend-screen` to `mix-blend-color-burn`. The unrelated `.intro__iridescent { mix-blend-mode: screen }` in `main.css` was not touched.

- [x] Add backed-by labels (AC: 7)
  - [x] Each logo `<img>` in the desktop backed-by block now has a `<p class="text-picture-desc text-white-brand">` label below it: "DTU Sustain", "Innofounder", "Bio Innovation Institute"
  - [x] Labels styled using `.text-picture-desc` (Manrope 200 / 1.25rem) with `text-white-brand` colour token

- [x] Add mobile carousel for backed-by block (AC: 8)
  - [x] Desktop layout uses `hidden md:flex items-end gap-6` with per-logo flex columns
  - [x] Mobile carousel `.backed-by-carousel` uses `scroll-snap-type: x mandatory`, `overflow-x: auto`, `md:hidden`; each logo item has `scroll-snap-align: start` via Tailwind `snap-start` class; labels present matching desktop text
  - [x] `.backed-by-carousel` CSS rule added to `main.css` with `flex-shrink: 0` on children via `> *` selector

- [x] Rebuild floating light beam positions (AC: 9, 11)
  - [x] HTML restructured from 3 beams (`.fl-beam--1/2/3`) to 4 beams: `.fl-beam--left-a`, `.fl-beam--left-b`, `.fl-beam--right-a`, `.fl-beam--right-b`
  - [x] Left beams use `left: -2%` / `left: 0%`; right beams use `right: -2%` / `right: 0%` — edge-only at all breakpoints (no media query needed — `right` property is inherently responsive)
  - [x] GSAP `floating-light.js` uses `.fl-beam` base class selector — no JS changes required

- [x] Rebuild floating light beam gradients (AC: 10)
  - [x] `.fl-beam--left-a` and `.fl-beam--right-a` use Gradient A: `#0044FF 0%, #749BFF 50%, #E8F2FF 100%`
  - [x] `.fl-beam--left-b` and `.fl-beam--right-b` use Gradient B: `#00E5FF 0%, #D6F8FF 50%, #E8F2FF 100%`
  - [x] Old token-based gradients (`var(--blue-soft)`, `var(--blue-primary)`, `var(--blue-mid)`, `var(--cyan-light)`) removed from beam rules

- [x] Fix side nav dot color (AC: 12)
  - [x] `.side-nav__dot` `background-color` changed from `var(--steel)` to `var(--blue-soft)`
  - [x] `box-shadow: 0 0 0 1px var(--blue-soft)` added for 1px stroke spec
  - [x] `.side-nav__anchor--active .side-nav__dot` `background-color` changed from `var(--blue-primary)` to `var(--blue-soft)`; same `box-shadow` applied

## Dev Notes

- Nav border gradient: CSS `border-image` with a linear gradient requires `border-image-slice: 1` and loses `border-radius`. The recommended approach is a `::before` pseudo-element with `content: ''`, `position: absolute`, `inset: 0`, `border-radius: inherit`, `padding: 3px`, `background: linear-gradient(...)`, `mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`, `mask-composite: exclude` — this is the standard "gradient border with border-radius" technique. Test in Safari with `-webkit-mask-composite: destination-out`.
- `Manrope ExtraLight (200)` is not available in the Google Fonts subset currently loaded. The `.text-picture-desc` class will visually fall back to Manrope 400. This is an accepted limitation (see deferred-work: Story 1-4).
- All colour values must be referenced from `design-tokens.css` tokens where a matching token exists. Use hex directly only for the gradient border stops (NAV-2) and the beam gradients (FLOATINGLIGHT-2) since these exact hex sequences are not currently in the token file. Do not add new tokens for these — they are one-off gradient definitions.
- GSAP tweens in `src/animations/floating-light.js` only animate `y` and `opacity` — they do NOT set `left` positions. Beam horizontal positions are CSS-only. No GSAP changes were needed for the repositioning.

### Project Structure Notes

- Nav partial: `partials/nav.html`
- Floating light CSS/JS: `src/animations/floating-light.js`, `src/styles/main.css` (`.fl-beam` rules)
- Side nav: `src/animations/side-nav.js`, `src/styles/main.css` (`.side-nav__dot`)
- Design tokens: `design-tokens.css`
- Backed-by block: `index.html` — desktop `hidden md:flex` row + mobile `.backed-by-carousel`
- Hero video: `index.html` — `mix-blend-color-burn` Tailwind class

### References

- Gap audit codes: NAV-1, NAV-2, NAV-3, NAV-4, NAV-5, HERO-1, HERO-2, HERO-3, FLOATINGLIGHT-1, FLOATINGLIGHT-2, FLOATINGLIGHT-3, SIDENAV-1, TOKEN-1
- Source: `_bmad-output/planning-artifacts/epic5-gap-audit.md`
- Gradient border technique: [Source: docs/design-manual.md — Glass material language]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None — all changes implemented cleanly with zero build errors.

### Completion Notes List

- AC1–4, AC13: Pre-implemented; verified correct in source.
- AC5 (NAV-5): Right cell of nav grid changed from `justify-end` to `justify-between` to spread "About us" and "Contact" across the right column. Grid structure (`grid-cols-[1fr_auto_1fr]`) preserved.
- AC6 (HERO-1): `mix-blend-screen` → `mix-blend-color-burn` on `<video>` in `index.html`. `.intro__iridescent` rule in `main.css` untouched.
- AC7 (HERO-2): Each logo in desktop backed-by block now has `<p class="text-picture-desc text-white-brand">` label below it.
- AC8 (HERO-3): Desktop uses `hidden md:flex items-end gap-6`; mobile uses `.backed-by-carousel` (`scroll-snap-type: x mandatory`, `overflow-x: auto`, `md:hidden`) with `snap-start` on each item. CSS for `.backed-by-carousel` added to `main.css`.
- AC9+11 (FLOATINGLIGHT-1/3): HTML restructured to 4 beams: left-a, left-b (left edge), right-a, right-b (right edge). CSS uses `left: -2%/0%` and `right: -2%/0%` — edge-only at all breakpoints by design. Old `.fl-beam--1/2/3` rules removed.
- AC10 (FLOATINGLIGHT-2): Gradient A (`#0044FF → #749BFF → #E8F2FF`) on left-a/right-a; Gradient B (`#00E5FF → #D6F8FF → #E8F2FF`) on left-b/right-b. Token-based gradients removed.
- AC12 (SIDENAV-1): `.side-nav__dot` and active state both updated to `var(--blue-soft)` with `box-shadow: 0 0 0 1px var(--blue-soft)` for stroke.
- Build: `npm run build` passes with zero errors or warnings.

### File List

- `partials/nav.html` — AC5: right cell flex container `justify-end` → `justify-between`
- `index.html` — AC6: `mix-blend-screen` → `mix-blend-color-burn` on video; AC7/8: backed-by block restructured with labels and mobile carousel; AC9: floating beam HTML restructured from 3 to 4 beams with edge-only class names
- `src/styles/main.css` — AC8: `.backed-by-carousel` CSS added; AC9/10/11: beam CSS rebuilt (`.fl-beam--left-a/b`, `.fl-beam--right-a/b`) with Gradient A/B; AC12: `.side-nav__dot` and active state updated to `var(--blue-soft)` with box-shadow stroke

### Review Findings

- [x] [Review][Patch] `line-height: auto` is invalid CSS — changed to `normal` [src/styles/main.css, .text-picture-desc] — fixed
- [x] [Review][Patch] `scroll-snap-align: start` set twice — CSS `> *` rule and Tailwind `snap-start` both applied; removed redundant CSS declaration [src/styles/main.css, .backed-by-carousel > *] — fixed

## Change Log

- 2026-05-25: Story 5.1 implemented — fixed nav distribution (AC5), hero video blend mode (AC6), added backed-by labels and mobile carousel (AC7/8), rebuilt floating beams to edge-only positions with two-gradient spec (AC9/10/11), fixed side nav dot color (AC12). All pre-existing ACs (1–4, 13) verified. Build clean.
- 2026-05-25: Code review complete — 2 patches applied: `line-height: auto` → `normal` in `.text-picture-desc`; removed redundant `scroll-snap-align` from `.backed-by-carousel > *` CSS rule (kept Tailwind `snap-start` on HTML items). Story marked done.
