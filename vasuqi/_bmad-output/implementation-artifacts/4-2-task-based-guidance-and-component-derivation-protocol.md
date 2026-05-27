# Story 4.2: Task-Based Guidance & Component Derivation Protocol

Status: done

## Story

As an AI agent working on the Vasuqi project,
I want task-based instructions that tell me exactly what to do when adding a section, writing copy, creating a component, or adding media — and a derivation protocol for situations not explicitly covered,
so that I produce brand-consistent output on the first attempt without asking the founder for design decisions.

## Acceptance Criteria

**AC1 — Four named task guides (FR37):**
Given the task-based guidance section (Part 3 of the manual)
When read by the AI agent
Then it contains four named task guides, each as a concise checklist or rule set:
- **Adding a new section** — structure, spacing, which material language to use, how to wire the section ID to the shared namespace
- **Writing copy** — tone of voice rules, what to avoid (hedging, vague claims, generic cleantech language), the golden circle order (WHY → HOW → WHAT)
- **Creating a new component** — which token values to apply, how to pick a material language, the Same Designer test
- **Adding media** — image formats, alt text requirements, where files go in `public/`, how to reference assets in HTML

**AC2 — Component Derivation Protocol as 5-step IF/THEN chain (FR38):**
Given the Component Derivation Protocol
When read by the AI agent
Then it presents a 5-step IF/THEN chain:
1. Identify the material language
2. Determine if structural / decorative / interactive
3. Apply that language's visual properties from `design-tokens.css`
4. Apply water physics motion if animated
5. Apply the Same Designer test
The AI derives a solution consistent with the existing system rather than defaulting to a generic web pattern.

**AC3 — Human review identifiers section (FR40):**
Given the elements requiring human review section
When read by the AI agent
Then it explicitly lists categories of changes that must not be made autonomously — including: introducing new colour tokens, changing the palette, modifying the shared namespace (section IDs), altering the navigation structure, and any change affecting the design manual itself.

**AC4 — Same Designer test produces brand-continuous components (NFR17):**
Given a new component produced via the Component Derivation Protocol
When the Same Designer test is applied
Then the component reads as continuous with the original site — it uses only tokens from `design-tokens.css`, follows the correct material language, and would not be identifiable as an addition by a different designer.

**AC5 — Animation stack explicitly named:**
Given the JS animation library stack
When documented in this section
Then GSAP 3.15.0 and its plugins (ScrollTrigger, SplitText), the water physics constants (`WATER_DURATION`, `WATER_EASE`, `WATER_STAGGER`), and the blob morphing approach are explicitly named — an AI agent knows which library and constants to use for any animation task without guessing.

**AC6 — Line count stays within 480-line budget (NFR15):**
Given the complete `docs/design-manual.md` when all three stories are done
When the total line count is verified
Then all four parts together do not exceed approximately 480 lines.

## Tasks / Subtasks

- [x] Append Part 3 to `docs/design-manual.md` (AC: 1, 2, 3, 4, 5, 6)
  - [x] Write task guide: Adding a new section — material language selection, spacing, section ID wiring to shared namespace (AC: 1)
  - [x] Write task guide: Writing copy — tone rules, anti-patterns, golden circle order WHY → HOW → WHAT (AC: 1)
  - [x] Write task guide: Creating a new component — token selection, material language choice, Same Designer test (AC: 1, 4)
  - [x] Write task guide: Adding media — formats, alt text, `public/` paths, HTML reference pattern (AC: 1)
  - [x] Write Component Derivation Protocol — 5-step IF/THEN chain (AC: 2)
  - [x] Name GSAP 3.15.0 + ScrollTrigger + SplitText + water physics constants + blob morphing explicitly (AC: 5)
  - [x] Write Human Review Identifiers section — list autonomous-action prohibitions (AC: 3)
  - [x] Verify line count for Part 3 leaves sufficient budget for Story 4.3 (AC: 6)
  - [x] Replace the `*(Story 4.2 — to be written)*` placeholder in `docs/design-manual.md` with the actual content (AC: 1)

## Dev Notes

### The deliverable

This story appends **Part 3** to the existing `docs/design-manual.md`. The file already exists (162 lines as of Story 4.1 completion). The placeholder `## Part 3 — Task Guides & Component Derivation Protocol\n\n*(Story 4.2 — to be written)*` at line 154–156 must be replaced with the actual Part 3 content.

**Do NOT create a new file. Do NOT modify any HTML, CSS, or JS files.** The only change is within `docs/design-manual.md`.

### Line budget (NFR15 — CRITICAL)

Total budget: ~480 lines for the complete final document.

- Parts 1 + 2 already written: **162 lines**
- Part 3 (this story — Task Guides + Protocol): **target ~100–120 lines**
- Part 4 (Story 4.3 — Anti-list + Evolution + Living Components): **target ~80–100 lines**
- Remaining header/whitespace budget: ~20 lines

**Part 3 must not exceed ~120 lines.** If you exceed this, Story 4.3 cannot fit. Count lines before finalising.

Practical writing rule: use lists over paragraphs; every line must be load-bearing (no filler phrases like "It is important to note that…" or "You may want to…").

### Document format requirements

- Plain Markdown — no YAML frontmatter, no HTML
- Headings: `##` for parts, `###` for task guide names, `####` for subsections only if necessary
- Token references: always backtick code spans (`--blue-primary`)
- File paths: always backtick code spans (`public/images/`, `src/animations/constants.js`)
- Lists over paragraphs — AI agents scan lists faster
- No prose padding. Every sentence is an instruction or a rule.

### Four task guides — content requirements

**Task Guide 1: Adding a new section**

Rules the guide must cover:
- Choose a material language before writing HTML — it determines which tokens, borders, and motion apply
- Section `id` must follow kebab-case and be added to the shared namespace in the design manual and side nav anchors if it appears on the landing page
- Spacing: use `design-tokens.css` spacing tokens — no magic pixel values in layout CSS; all units relative (`rem`, `%`, `vw`/`vh`)
- Mobile-first: base styles target 320px; Tailwind `md:`, `lg:`, `xl:` prefixes layer in progressively
- Wire GSAP scroll entrance using `WATER_EASE`, `WATER_DURATION.default`, `WATER_STAGGER` from `src/animations/constants.js`; `once: true` on all ScrollTrigger instances
- Blueprint sections: inline SVGs use `currentColor`; large diagrams are file references in `public/svgs/`
- Glass sections: include `-webkit-backdrop-filter` alongside `backdrop-filter`; never add `overflow: hidden` to a Glass ancestor

**Task Guide 2: Writing copy**

Rules the guide must cover (source: `docs/tone-of-voice.md`):
- Lead with WHY, then HOW, then WHAT — golden circle order is the content structure rule
- Claim-first: short claim first, evidence after
- Short sentences; no hedging phrases ("you may want to", "it is recommended that", "potentially")
- No buzzword stacking ("leveraging cutting-edge sustainable deep-tech solutions…")
- No competitor comparisons — claim the gap, don't name rivals
- Anti-hype: list what is absent, not what is added ("No chemicals. No sludge. Just light.")
- Frame forward — solution, not problem
- The regulatory anchor is always available: targets are set by EU law, the market must move

**Task Guide 3: Creating a new component**

Rules the guide must cover:
- Run the Component Derivation Protocol (see below) before writing any code
- Apply tokens only from `design-tokens.css` — never introduce a new `--` token, never use hex directly
- For Glass components: `backdrop-filter` + `-webkit-backdrop-filter` + `--ice-near` border + `--white-brand` at ~80% opacity; never `overflow: hidden` on a Glass ancestor
- For Light components: apply Water physics motion first (`WATER_DURATION`, `WATER_EASE`), then Glass rendering
- For Blueprint components: inline SVG with `currentColor`; grid or linework structure
- Animated components: import `WATER_DURATION`, `WATER_EASE`, `WATER_STAGGER` from `src/animations/constants.js` — never hardcode these values
- Same Designer test: before committing, ask — would a brand-new visitor notice this component was added later? If yes, revise.

**Task Guide 4: Adding media**

Rules the guide must cover:
- Images: `.jpg` for photos, `.png` for assets with transparency, `.svg` for diagrams and icons
- All images: `alt` attribute required; decorative images use `alt=""` or `aria-hidden="true"`
- Below-fold images: `loading="lazy"` attribute required
- File placement:
  - Raster images → `public/images/` (team photos, hero, docs thumbnails)
  - Blueprint PNG backgrounds → `public/images/blueprints/`
  - Document thumbnail images → `public/images/docs/`
  - SVG diagrams → `public/svgs/`
  - Blob SVGs → `public/blobs/`
  - Downloadable files → `public/docs/`
- HTML reference pattern: `src="/images/..."` (Vite base-relative path)
- Video: `<video autoplay muted loop playsinline aria-hidden="true">` with `.webm` source first, `.mp4` fallback; always include `poster` attribute

### Component Derivation Protocol — 5-step chain

This is a mandatory decision framework. An AI agent must run all 5 steps in order before writing component code.

Step 1 — **Identify the material language:**
Ask: is this ambient/motion? → Water. Structural/overlay/card? → Glass. Technical/data/diagram? → Blueprint. Glow/CTA/accent/hover? → Light. (One primary language; Light overlays Water physics.)

Step 2 — **Determine component function:**
Structural (layout shell, section wrapper) vs. Decorative (background element, icon) vs. Interactive (button, link, card, form field).

Step 3 — **Apply that language's visual properties from `design-tokens.css`:**
- Water: `--navy-deep` → `--blue-primary` gradient range; organic shape; no borders
- Glass: `--white-brand` @80% opacity background; `--ice-near` border; `backdrop-filter` blur
- Blueprint: `--steel` or `--ice-near` border; `--white-brand` text on `--navy-deep`; `currentColor` SVG
- Light: `--blue-mid` soft glow; `--cyan-light` hard glow; no background fill needed

Step 4 — **Apply water physics motion if animated:**
`WATER_DURATION`, `WATER_EASE`, `WATER_STAGGER` from `src/animations/constants.js`. No bounce, no snap, no spring. `once: true` on ScrollTrigger. `repeat: -1, yoyo: true` for loops.

Step 5 — **Apply the Same Designer test:**
Would a first-time visitor identify this as added later by a different designer? If yes — revise token choice, material language, or motion before committing.

### Human Review Identifiers — content requirements

The section must list what an AI agent must NEVER do without explicit founder instruction:

- Introduce a new CSS colour token (the 10-token palette is closed for Phase 1)
- Use a hex value directly in any CSS or inline style
- Modify any of the six shared namespace section IDs (`intro-animation`, `hero`, `the-gap`, `where-vasuqi-fits`, `what-its-built-to-change`, `how-it-works`)
- Change the navigation structure (link count, link labels, CTA position)
- Alter `design-tokens.css` (add, rename, or remove any token)
- Modify the design manual itself (`docs/design-manual.md`) — the manual is the authority; do not self-modify
- Add a new font family (only `--font-syne` and `--font-manrope` are in the system)
- Remove or alter the North Star Rule
- Add `prefers-reduced-motion` media queries (deliberate design decision — no accommodation anywhere on the site)

### Animation library stack — what to name explicitly

The task guides must name these so an AI agent never guesses:
- **Library:** GSAP 3.15.0
- **Plugins:** ScrollTrigger (scroll-triggered entrances), SplitText (text character/word/line split entrances)
- **Constants file:** `src/animations/constants.js` — `WATER_DURATION`, `WATER_EASE`, `WATER_STAGGER`
- **Blob morphing:** GSAP `attr: { d }` tween between two SVG path variants with identical point counts; fallback is CSS `clip-path` morphing if point counts differ

### What this story does NOT include

Parts 4 is out of scope. Do not write:
- Anti-list (12 rules) — Story 4.3
- Evolution triggers — Story 4.3
- Living Components section — Story 4.3

### Exact placeholder to replace in docs/design-manual.md

Find this block (lines 154–156):
```
## Part 3 — Task Guides & Component Derivation Protocol

*(Story 4.2 — to be written)*
```

Replace it with the full Part 3 content. The `## Part 4 — Anti-list, Evolution Triggers & Living Components` heading and its `*(Story 4.3 — to be written)*` placeholder remain unchanged — Story 4.3 will replace those.

### Project Structure Notes

- **Modify:** `docs/design-manual.md` — replace Part 3 placeholder with real content
- **Do not touch:** any HTML, CSS, JS, or configuration files
- File naming: document uses Markdown; no new files required

### References

- Epic 4 story 4.2 definition: `_bmad-output/planning-artifacts/epics.md` — Story 4.2 section
- FR37, FR38, FR40, NFR15, NFR17: `_bmad-output/planning-artifacts/epics.md` — Requirements Inventory
- Previous story output (Part 1 + Part 2 structure): `docs/design-manual.md`
- Story 4.1 dev notes (line budget allocation, document format rules): `_bmad-output/implementation-artifacts/4-1-design-manual-core-structure-and-onboarding.md`
- Tone of voice rules: `docs/tone-of-voice.md`
- Architecture enforcement guidelines: `_bmad-output/planning-artifacts/architecture.md` — Implementation Patterns & Consistency Rules, AI Agent Guidelines
- Animation patterns (GSAP, ScrollTrigger, blob morphing): `_bmad-output/planning-artifacts/architecture.md` — Animation Patterns, Animation Library sections
- Token names (exact): `design-tokens.css`
- Animation constants (exact): `src/animations/constants.js`
- Deferred work note on version stamp: `_bmad-output/implementation-artifacts/deferred-work.md` — "Version 1.0 stamp premature" — do not change the version line; it stays draft until Story 4.3 is done

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None.

### Completion Notes List

- Replaced the `*(Story 4.2 — to be written)*` placeholder in `docs/design-manual.md` with full Part 3 content.
- Part 3 spans lines 154–249 = 96 lines — within the 100–120 line budget.
- Total document is now 252 lines, leaving ample budget (~228 lines) for Story 4.3 (target 80–100 lines) well within the 480-line ceiling.
- All four task guides written as concise checklists/rule sets covering the required specifics per AC1 and Dev Notes.
- Component Derivation Protocol written as a 5-step IF/THEN chain per AC2.
- Human Review Identifiers section lists all 9 autonomous-action prohibitions per AC3.
- Same Designer test embedded in Task Guide 3 (step 7) and Protocol Step 5 per AC4.
- GSAP 3.15.0, ScrollTrigger, SplitText, water physics constants, and blob morphing explicitly named in Task Guide 3 per AC5.
- No HTML, CSS, or JS files were modified. Only `docs/design-manual.md` was changed.

### File List

- `docs/design-manual.md`

## Review Findings

- [x] [Review][Patch] `WATER_DURATION.default` is not valid ES import syntax in Task Guide 1 Step 5 [`docs/design-manual.md:162`] — fixed: import is now `WATER_DURATION` (the object); usage note clarifies `.default` is accessed at call time.
- [x] [Review][Defer] Version `1.0` stamp premature [`docs/design-manual.md:3`] — deferred, pre-existing (tracked in deferred-work.md from Story 4.1 review).
- [x] [Review][Defer] Human Review Identifiers omits AI instruction loader files (`CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`) — deferred, pre-existing; not in Story 4.2 spec scope; logged in deferred-work.md.

## Change Log

- 2026-05-24 — Implemented Part 3 (Task Guides & Component Derivation Protocol) in `docs/design-manual.md`: four task guides, 5-step Component Derivation Protocol, Human Review Identifiers section. Part 3 = 96 lines; total document = 252 lines.
- 2026-05-24 — Code review patch: corrected `WATER_DURATION.default` → `WATER_DURATION` import reference in Task Guide 1 Step 5 [`docs/design-manual.md:162`].
