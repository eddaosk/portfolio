# Story 4.1: Design Manual Core Structure & Onboarding

Status: review

## Story

As the founder,
I want the design manual to open with a plain-language explanation of how the automatic AI context loading works and the conceptual reasoning layer behind every design decision,
so that I understand what my AI tool already knows when I open the project and can rely on it to make brand-consistent decisions.

## Acceptance Criteria

**AC1 — AI instruction file auto-loading is working and documented (FR41):**
Given `docs/design-manual.md`
When the founder opens the project in Claude Code, Cursor, or GitHub Copilot
Then the AI instruction file (`CLAUDE.md`, `.cursorrules`, or `.github/copilot-instructions.md`) automatically instructs the AI to read `docs/design-manual.md` in full before any task — the founder types their request without any additional activation step

**AC2 — Plain-language onboarding section (Part 1 of the manual):**
Given the onboarding section
When read by the founder
Then it explains in plain language: (1) that the AI instruction files handle context loading automatically, (2) what the AI already knows when the founder opens the project, (3) what the founder should do when starting a new task (just describe what they want), and (4) how to verify the AI has read the manual

**AC3 — Four material languages documented as a reasoning layer (FR39):**
Given the four material languages section
When read by the AI agent
Then it documents Water, Glass, Blueprint, and Light as a reasoning layer above component rules — each language has its visual character, primary use, and the principles behind it; Light's relationship to Water physics and Glass expression is explicitly documented; the AI can derive decisions for novel situations not covered elsewhere in the manual by reasoning from these languages

**AC4 — North Star Rule positioned as primary override (FR44):**
Given the North Star Rule
When documented in the manual
Then it is stated as a single authoritative override clause: any new addition must fit the brand identity, visual identity, and tone of voice — applied whenever no specific rule addresses the situation; it is positioned prominently so the AI treats it as the highest-priority rule

**AC5 — Line count stays within 480-line budget (NFR15):**
Given the manual's overall length when all 3 stories are done
When the document is complete
Then the total line count does not exceed approximately 480 lines — the document fits within a single LLM context window

## Tasks / Subtasks

- [x] Create `docs/design-manual.md` (AC: 1, 2, 3, 4, 5)
  - [x] Write the document header — title, version note, and North Star Rule as the very first substantive content (AC: 4)
  - [x] Write Part 1 — Onboarding: how the AI instruction files work, what the AI knows on open, what the founder types, how to verify (AC: 2)
  - [x] Write Part 2 — Four Material Languages: Water, Glass, Blueprint, Light each with visual character, primary use, and derivation principles (AC: 3)
  - [x] Verify `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md` all already reference `docs/design-manual.md` (AC: 1)
  - [x] Confirm line count for Part 1 + Part 2 leaves enough budget for Stories 4.2 and 4.3 (AC: 5)
  - [x] Confirm document references `design-tokens.css` token names exactly as they appear in the CSS file (AC: 3)

## Dev Notes

### The deliverable

This story creates `docs/design-manual.md`. The file does **not** exist yet — only `docs/exam-defense.md` and `docs/tone-of-voice.md` are present in `docs/`. Create `docs/design-manual.md` as a new file.

The AI instruction files (`CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`) already exist and already reference `docs/design-manual.md` — do **not** modify them. AC1 is satisfied by verifying those files contain the correct reference.

### Target audience — dual reader

The design manual has two simultaneous readers:
1. **AI agents** (primary) — read sequentially top-to-bottom before each task. Must be dense, actionable, no prose padding.
2. **The founder (Adarsh)** — reads occasionally to understand how things work. Needs plain language in the onboarding section only; the rest can be terse.

Structure the document so an AI agent can read it efficiently without padding, while the onboarding section (Part 1) uses plain language the founder can understand.

### Line budget management (NFR15 — CRITICAL)

Total budget: ~480 lines for the complete final document (all 3 stories combined).

Rough allocation to hit the budget:
- Part 1 (Onboarding): ~40–50 lines
- Part 2 (Material Languages + North Star): ~60–80 lines
- Part 3 (Task Guides + Component Derivation Protocol): ~100–120 lines — Story 4.2
- Part 4 (Anti-list + Evolution Triggers + Living Components): ~80–100 lines — Story 4.3
- Document header, section breaks, whitespace: ~20–30 lines

**This story's scope (Parts 1 & 2) should target ~120–150 lines maximum.** If you exceed this, the later stories cannot fit in the budget. Be ruthless about concision.

### North Star Rule — placement

Place it in the document header, **before** Part 1, as the very first substantive content after the document title. The architecture spec (`architecture.md`) defines the exact wording:

> Apply the North Star Rule: any addition must fit the brand identity, visual identity, and tone of voice. Derive from the four material languages (Water, Glass, Blueprint, Light) for situations not explicitly covered.

This exact phrasing is also in `CLAUDE.md` — use it verbatim for consistency.

### Four Material Languages — authoritative source

The material languages are documented across multiple planning artifacts. The authoritative descriptions for the manual:

**Water** — Flowing gradients, organic shapes, depth. Primary use: hero backgrounds, section transitions. Behaviorally governs all motion: slow, continuous, non-linear, no bounce, no snap. `WATER_DURATION` (0.8–1.2s), `WATER_EASE` (`power1.inOut`), `WATER_STAGGER` (0.12s) in `src/animations/constants.js`.

**Glass** — Frosted blur, translucent surfaces, light refraction. Primary use: nav bar, cards, overlays. Implementation: `backdrop-filter` blur + `-webkit-backdrop-filter` blur (Safari) + `--ice-near` border + `--white-brand` background at ~80% opacity. Must never use `overflow:hidden` on a Glass ancestor (silently kills blur — known architectural risk from Story 1-3 deferred items).

**Blueprint** — Technical linework, grid structures, precision. Primary use: diagram sections, data callouts, news/docs components, footer. Aesthetic: schematic, clinical, engineered. Icons use `currentColor` and are inline SVG. Large diagrams (water-cycle-diagram.svg) are file references in `public/svgs/`.

**Light** — Electric blue glow, LED accent, luminosity. Primary use: CTA button, hover states, animated elements (floating light background). Behaviorally governed by Water physics. Visually expressed through Glass. Tokens: `--blue-mid` (#6A93FF), `--cyan-light` (#00E5FF) for glow effects.

The relationship "Light is behaviorally governed by Water, visually expressed through Glass" must be explicitly stated in the manual — it is the key derivation rule for ambient/glow components (FR39 requirement).

### Design token names — exact reference

Use these exact token names as they appear in `design-tokens.css`. Do **not** invent new names:

```
--navy-deep    --blue-primary  --blue-deep   --blue-mid    --blue-soft
--cyan-light   --steel         --ice-light   --ice-near    --white-brand
```

Typography: `--font-syne`, `--font-manrope`. Animation constants live in JS, not CSS: `WATER_DURATION`, `WATER_EASE`, `WATER_STAGGER` from `src/animations/constants.js`.

### Shared namespace — critical system rule

Section IDs in HTML, section names in the manual, and side nav anchor labels must be identical. State this rule explicitly in the manual. The IDs are:

```
intro-animation  hero  the-gap  where-vasuqi-fits  what-its-built-to-change  how-it-works
```

### What the AI instruction files already say

`CLAUDE.md` (already exists, do not change):
1. Read `docs/design-manual.md` in full before any task
2. Reference `design-tokens.css` for all colour/spacing/type values — never use hex directly
3. Apply the North Star Rule

The onboarding section must explain this workflow to the founder without requiring them to read `CLAUDE.md` first. The founder workflow is: open project → type request → the AI has already read the manual. No copy-paste step.

### Verification step for the founder (AC2 requirement)

Include a concrete verification instruction in the onboarding — something the founder can actually do to confirm the AI has read the manual. Example: ask the AI "What is Vasuqi's brand blue?" and it should answer `--blue-primary` (#0044FF) without being told.

### Document format requirements

- Plain Markdown — no YAML frontmatter, no HTML, no Tailwind classes
- Headings: `#` for title, `##` for parts/sections, `###` for subsections
- Token references: always in backtick code spans (e.g. `--blue-primary`)
- Lists over paragraphs where possible — AI agents scan lists faster
- No filler phrases like "It is important to note that..." — every line is load-bearing

### What this story does NOT include

Parts 3 and 4 are out of scope for this story. Do not write:
- Task-based guidance (adding a section, writing copy, creating a component, adding media) — Story 4.2
- Component Derivation Protocol — Story 4.2
- Human review identifiers — Story 4.2
- Anti-list — Story 4.3
- Evolution triggers — Story 4.3
- Living components section — Story 4.3

The document written in this story should be explicitly structured to receive these sections — use placeholder headings or a note that "Part 3: Task Guides" and "Part 4: Anti-list & Evolution" follow, so Story 4.2 and 4.3 can append cleanly.

### Google Fonts loading pattern (architecture-required content)

Architecture doc explicitly requires this in the design manual (architecture.md line 786). Include in Part 2 under the Typography subsection or as a standalone note in the Material Languages section:

```
Fonts loaded via Google Fonts in HTML <head>:
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/..." rel="stylesheet">
```

Tokens `--font-syne` and `--font-manrope` reference these loaded families. Do not use any other font family.

### Tone of voice rules for Part 1 prose

Part 1 is the one section written for the founder (not the AI agent). Apply these rules from `docs/tone-of-voice.md` when writing the onboarding copy:
- Lead with the conclusion (claim-first) — state the benefit before explaining how
- Short sentences — the onboarding section should read like instructions, not documentation
- No hedging phrases — not "you may want to", not "it is recommended that"
- No buzzword stacking — do not describe the AI workflow as "intelligent context loading" or similar; name what actually happens (CLAUDE.md tells the AI to read the manual)

### Project Structure Notes

- **Create:** `docs/design-manual.md` (new file)
- **Read but do not modify:** `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`
- **Reference:** `design-tokens.css` for exact token names
- **Reference:** `src/animations/constants.js` for animation constant names
- **Do not touch:** any HTML, CSS, or JS files

### References

- Epic 4 story definition: `_bmad-output/planning-artifacts/epics.md` — Story 4.1 section
- FR39, FR41, FR44: `_bmad-output/planning-artifacts/epics.md` — Requirements Inventory
- NFR15 (480-line budget): `_bmad-output/planning-artifacts/epics.md` — NonFunctional Requirements
- Material language descriptions: `_bmad-output/planning-artifacts/ux-design-specification.md` — Visual Design Foundation, Component Strategy
- Architecture enforcement guidelines: `_bmad-output/planning-artifacts/architecture.md` — Enforcement Guidelines
- AI instruction file content: `CLAUDE.md` (project root)
- Token names: `design-tokens.css` (project root)
- Animation constants: `src/animations/constants.js`
- Tone of voice rules: `docs/tone-of-voice.md` (relevant to copy guidance in Part 2)
- Glass ancestor risk (backdrop-filter): `_bmad-output/implementation-artifacts/deferred-work.md` — "Deferred from 1-3"

### Review Findings

- [x] [Review][Patch] Onboarding falsely promises component rules not yet in document [`docs/design-manual.md:20`] — Bullet "The component rules and anti-patterns" in the What-the-AI-knows list refers to Part 3/4 content that is currently stub placeholders. The founder reading today is told the AI knows rules it does not have yet. Fix: replace the bullet with content that actually exists in the current document (e.g., "The Glass, Blueprint, Water, and Light material language rules") or qualify it as "coming in the next update".
- [x] [Review][Defer] Version 1.0 stamp premature — document is incomplete pending Stories 4.2 and 4.3 [`docs/design-manual.md:3`] — deferred, pre-existing; update version to 1.0 only after Story 4.3 is done.

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None.

### Completion Notes List

- Created `docs/design-manual.md` (162 lines — within budget for Parts 1 & 2)
- Document header places North Star Rule as first substantive content after title (AC4)
- Part 1 (Onboarding, ~35 lines): plain language for founder, claim-first tone, concrete verification instruction ("ask for brand blue, expect `--blue-primary` #0044FF"), no activation steps required
- Part 2 (Visual System, ~110 lines): all four material languages documented with visual character, primary use, and derivation principles; Light's relationship to Water/Glass explicitly stated; colour palette table with all 10 tokens; typography section with Google Fonts loading pattern; Shared Namespace Rule with canonical IDs
- All 10 colour tokens verified against `design-tokens.css` — exact match
- Animation constants (`WATER_DURATION`, `WATER_EASE`, `WATER_STAGGER`) verified against `src/animations/constants.js` — exact match
- `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md` all confirmed to reference `docs/design-manual.md` — AC1 satisfied without modification
- Placeholder headings for Part 3 and Part 4 added so Stories 4.2 and 4.3 can append cleanly
- Budget check: 162 lines for Parts 1–2 + placeholders; ~318 lines remaining for Stories 4.2 (Parts 3) and 4.3 (Part 4) to stay within the 480-line NFR15 cap

### File List

- `docs/design-manual.md` — new file created

### Change Log

- 2026-05-24: Created `docs/design-manual.md` with North Star Rule header, Part 1 (Onboarding), Part 2 (Visual System — four material languages, colour palette, typography, shared namespace rule), and placeholder headings for Parts 3–4. Story status → review.
- 2026-05-24: Addressed code review Patch finding — replaced "The component rules and anti-patterns" bullet in the What-the-AI-knows list with "The Glass, Blueprint, Water, and Light material language rules" to accurately reflect current document contents. Story status → review.
