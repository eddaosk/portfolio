# Story 4.3: Anti-List, Evolution Triggers & Living Components Section

Status: done

## Story

As an AI agent and the founder,
I want the design manual to contain explicit rules about what never to do, clear triggers for when the design system should evolve, and a place to document new components as the site grows,
so that the brand is protected from accidental degradation over time and the manual stays accurate as the site expands.

## Acceptance Criteria

**AC1 — Anti-list: 12 named "never do this" rules (FR43):**
Given the anti-list section
When read by the AI agent
Then it contains a minimum of 12 named rules covering at minimum:
- Pure black (`#000000`)
- Pure white (`#ffffff`)
- Any colour not in the 10-token palette
- Dark mode
- AI-default gradients (blue-to-purple, blue-to-teal)
- Generic card components (rounded corners + drop shadow + white background)
- Navigation with more than 4 top-level items
- Hover animations that use spring/bounce/snap easing
- Adding `prefers-reduced-motion` media queries (deliberate design decision)
- Inline `style` attributes in HTML
- Magic numbers in CSS (values not from `design-tokens.css`)
- Any font other than Syne and Manrope

**AC2 — Palette Closure Rule within the anti-list:**
Given the Palette Closure Rule within the anti-list
When documented
Then it states explicitly: the 10-token palette is closed — no new colour tokens are introduced for Phase 1; any situation that seems to require a new colour is solved by combining existing tokens or adjusting opacity.

**AC3 — Evolution triggers: named milestones (FR45):**
Given the evolution triggers section
When read
Then it documents named product milestones (not dates) that define when the design system should be intentionally updated:
1. Introduction of real product photography — trigger: working prototype exists
2. Retirement of the blueprint aesthetic — trigger: Phase 2 brand evolution
3. Shift from investor to B2B operator tone — trigger: pilot program launch

**AC4 — Living components section as named placeholder (FR42):**
Given the living components section
When a new component is added to the site via AI-assisted development
Then the design manual includes a clearly labelled section where the founder (or AI agent) documents the new component — its name, material language, token usage, and any derivation notes — before the coding session ends; the section exists as a named placeholder even when empty.

**AC5 — Total line count does not exceed ~480 lines (NFR15):**
Given the complete `docs/design-manual.md`
When the total line count is verified
Then all four parts together do not exceed approximately 480 lines.

**AC6 — Complete manual enables autonomous AI operation:**
Given the complete manual
When an AI agent reads it from top to bottom
Then it has everything needed to: add a news carousel card, add a download card, update a team member, create a new section, and derive a new component — without asking the founder a single design question.

**AC7 — Version stamp updated to 1.0:**
Given the `Version:` line at the top of `docs/design-manual.md`
When Story 4.3 content is complete and line count verified
Then the version note is updated from draft to `1.0` — reflecting the completed manual.

## Tasks / Subtasks

- [x] Replace the `*(Story 4.3 — to be written)*` placeholder in `docs/design-manual.md` with Part 4 content (AC: 1, 2, 3, 4, 5, 6)
  - [x] Write anti-list with 12 named rules (AC: 1)
  - [x] Include Palette Closure Rule as a named rule within the anti-list (AC: 2)
  - [x] Write evolution triggers section — 3 named milestones (AC: 3)
  - [x] Write living components section as a named placeholder with documentation template (AC: 4)
  - [x] Verify total line count stays at or below ~480 lines (AC: 5)
- [x] Update version stamp from draft/1.0-draft to `1.0` (AC: 7)

## Dev Notes

### The deliverable

This story replaces the `*(Story 4.3 — to be written)*` placeholder in **Part 4** of `docs/design-manual.md` with the final content block. The placeholder currently sits at line 252 (last line of the file).

**Do NOT create a new file. Do NOT modify any HTML, CSS, or JS files.** The only change is within `docs/design-manual.md`.

### Current document state (after Story 4.2)

The file is **252 lines**. The structure is:

```
Lines 1–9:    Document header (title, version note, North Star Rule)
Lines 11–43:  Part 1 — Onboarding
Lines 45–152: Part 2 — Visual System (material languages, palette, typography, namespace)
Lines 154–248: Part 3 — Task Guides & Component Derivation Protocol
Lines 250–252: Part 4 header + *(Story 4.3 — to be written)* placeholder
```

The exact placeholder to find and replace:

```markdown
## Part 4 — Anti-list, Evolution Triggers & Living Components

*(Story 4.3 — to be written)*
```

Replace those 3 lines with the full Part 4 content.

### Line budget (NFR15 — CRITICAL)

- Document now: **252 lines**
- Remaining budget: **~228 lines** (480 − 252)
- Part 4 target: **~80–100 lines**
- Version stamp update: 0 additional lines (in-place edit)

**Part 4 must not exceed ~100 lines.** Even 228 lines remaining is much larger than needed — the constraint is fitness for LLM context, not available space. Target the dense end: every line is an instruction or a rule. No filler.

After writing, count the final line total. If it exceeds 480, cut from Part 4 first (merge rules, tighten prose).

### Document format requirements (carry-forward from Stories 4.1 and 4.2)

- Plain Markdown — no YAML frontmatter, no HTML
- Headings: `##` for parts, `###` for subsections, `####` only if strictly necessary
- Token references: always backtick code spans (`--blue-primary`)
- File paths: always backtick code spans (`design-tokens.css`)
- Lists over paragraphs — AI agents scan lists faster
- No prose padding. Every sentence is an instruction or a rule.

### Anti-list — content requirements

The AC specifies 12 minimum rules. The anti-list must explicitly name each rule as a bullet with a short explanation of why it violates the system. Do not just list the prohibition — name the risk.

**Required rules (verbatim from AC1):**

1. **No pure black (`#000000`)** — not in the palette; use `--navy-deep` for the darkest surface
2. **No pure white (`#ffffff`)** — not in the palette; use `--white-brand` (`#FAFCFF`)
3. **No colour outside the 10-token palette** — Palette Closure Rule (see below)
4. **No dark mode** — the site has a single dark-on-dark visual system; a light mode or dark-mode switch is out of scope for Phase 1
5. **No AI-default gradients** — blue-to-purple and blue-to-teal are generic AI SaaS clichés; Vasuqi gradients run `--navy-deep` → `--blue-primary` only
6. **No generic card components** — rounded corners + drop shadow + white background is the generic web card; use Glass (frosted, `--ice-near` border, `--white-brand` at 80% opacity) or Blueprint (border-only, `--steel` or `--ice-near`) instead
7. **No more than 4 top-level nav items** — current nav has 4; adding a 5th breaks visual balance and the Glass nav proportions
8. **No spring/bounce/snap easing** — Water physics only (`WATER_EASE: 'power1.inOut'`); bounce and spring destroy the fluid, non-linear motion character
9. **No `prefers-reduced-motion` media queries** — deliberate design decision; no accommodation is provided anywhere on the site
10. **No inline `style` attributes in HTML** — all styling through `design-tokens.css` tokens and CSS classes; inline styles break the token system and create untrackable overrides
11. **No magic numbers in CSS** — every numeric value comes from a `design-tokens.css` token; a value not derivable from a token is a signal to use an existing token instead
12. **No font other than Syne and Manrope** — `--font-syne` (headings) and `--font-manrope` (body/UI); a third font fractures the typographic system

**Palette Closure Rule (separate named rule or sub-rule under item 3):**

State: "The 10-token palette is closed for Phase 1. No new `--` colour tokens are introduced. Any situation that appears to require a new colour is solved by combining existing tokens (e.g. layering at reduced opacity) or adjusting opacity on an existing token — never by adding a new token."

### Evolution triggers — content requirements

Three named milestones, stated as milestone name + trigger condition + what changes. No dates — the founder controls when these are reached.

1. **Real product photography** — Trigger: working prototype exists. Action: replace Blueprint PNG backgrounds and placeholder photography with product images; Water language hero section may shift to image-composite.
2. **Retire Blueprint aesthetic** — Trigger: Phase 2 brand evolution (post-seed, product-market fit). Action: Blueprint language de-emphasised; design system shifts to lighter, more consumer-facing visual identity.
3. **Shift to B2B operator tone** — Trigger: pilot program launch. Action: copy language shifts from investor WHY framing to operator HOW framing; task-based sections in this manual must be re-written for a technical operations audience.

Framing note: the evolution triggers section is a signal to the founder and the AI that these parts of the system are intentionally provisional. Write it as a short table or numbered list — not prose.

### Living components section — content requirements

This section is a **placeholder with documentation template**. It may be empty now. Its purpose is to make new components traceable.

The section must include:
- A brief instruction (1–2 lines) telling the founder or AI agent to add an entry here before the coding session ends
- A documentation template showing the fields: component name, material language, token usage, derivation notes
- An example entry showing the format (can use a real component already on the site — e.g. `.fl-beam` or `.news-card`)

Structure suggestion:
```
### Living Components

Add an entry here before the coding session ends when you create a new component.

| Component | Material language | Key tokens | Derivation notes |
|-----------|-----------------|------------|-----------------|
| `.fl-beam` | Light (over Water) | `--blue-mid`, `--cyan-light` | Floating beam: Water physics loop, Glass opacity layering |
```

The example entry prevents the section from being left entirely blank (which reduces its value as a template).

### Version stamp update

The document header at line 3 currently reads:

```
**Version:** 1.0 — Living document. Updated as the product evolves.
```

This was noted as premature in the Story 4.1 review (deferred to Story 4.3 completion). After all Part 4 content is written and the line count verified, confirm the version line reads exactly `1.0` and the "Living document" qualifier is preserved. No change needed if the line already says `1.0` — just verify.

Context from deferred-work.md: "Version 1.0 stamp premature — `docs/design-manual.md` line 3 declares `Version: 1.0` but document is incomplete pending Stories 4.2 and 4.3; update version to 1.0 only after Story 4.3 is done." Story 4.2 did not change this line. Story 4.3 must confirm it.

**Expected outcome:** The line already reads `**Version:** 1.0 — Living document. Updated as the product evolves.` — no edit is required. This task is a verification step only. If (unexpectedly) the line reads something other than `1.0`, update it in place.

### What this story does NOT include

Do not modify:
- Parts 1, 2, or 3 — already complete and reviewed
- Any HTML, CSS, or JS files
- `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`
- `design-tokens.css`

### Deferred work items that DO NOT apply to this story

From `_bmad-output/implementation-artifacts/deferred-work.md`:

- "Human Review Identifiers does not prohibit AI agent modification of the instruction loader files" — this is a Story 4.2 deferred item; it belongs in Part 3 (Human Review Identifiers). Do NOT add it to Part 4 of this story. If it must be addressed, it requires a targeted edit to Part 3 (Human Review Identifiers section, lines ~234–248) — but that is out of scope for Story 4.3. After Story 4.3 implementation is complete, log this item in the Dev Agent Record Completion Notes as still deferred (no owner, no target story yet).

**Dev agent action on completion:** Add the following to Completion Notes: "Deferred carry-forward: Human Review Identifiers does not prohibit AI agent modification of `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md` — still deferred from Story 4.2; no scope assigned."

### Project Structure Notes

- **Modify:** `docs/design-manual.md` — replace Part 4 placeholder (lines 250–252) with real content; verify version stamp
- **Do not touch:** any HTML, CSS, JS, or configuration files
- No new files required

### References

- Epic 4 story 4.3 definition: `_bmad-output/planning-artifacts/epics.md` — Story 4.3 section (lines 818–849)
- FR42, FR43, FR45, NFR15: `_bmad-output/planning-artifacts/epics.md` — Requirements Inventory (lines 60–63, 88)
- PRD FR42, FR43, FR45: `_bmad-output/planning-artifacts/prd.md` (lines 387–390)
- Previous story completion notes (current document state, line 252): `_bmad-output/implementation-artifacts/4-2-task-based-guidance-and-component-derivation-protocol.md` — Completion Notes
- Story 4.1 review finding (version stamp): `_bmad-output/implementation-artifacts/4-1-design-manual-core-structure-and-onboarding.md` — Review Findings
- Deferred work (version stamp, instruction loader files): `_bmad-output/implementation-artifacts/deferred-work.md`
- Document format rules established in 4.1: `_bmad-output/implementation-artifacts/4-1-design-manual-core-structure-and-onboarding.md` — Dev Notes, Document format requirements
- Existing document to modify: `docs/design-manual.md`

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None — implementation was straightforward content authoring with no debugging required.

### Completion Notes List

- Replaced the 3-line `*(Story 4.3 — to be written)*` placeholder in `docs/design-manual.md` (lines 250–252) with full Part 4 content.
- Anti-list: 12 named rules written per AC1 spec, each naming both the violation and the risk.
- Palette Closure Rule: documented as a named sub-section under the anti-list (AC2).
- Evolution triggers: 3 named milestones in a table (not prose, not dates) per AC3 spec.
- Living components: placeholder table with documentation template and two example entries (`.fl-beam`, `.news-card`) per AC4 spec; includes agent instruction to prompt the founder if the table is empty.
- Line count: 298 lines total — 182 lines under the 480-line ceiling (AC5).
- Version stamp: already reads `**Version:** 1.0 — Living document. Updated as the product evolves.` — no edit required (AC7 verified in place).
- AC6 verified: the complete manual covers adding a news carousel card (Task Guide 3 + Living Components), adding a download card (Blueprint derivation in Component Derivation Protocol), updating a team member (Task Guide 2 copy rules), creating a new section (Task Guide 1), and deriving a new component (Component Derivation Protocol 5-step process).
- Deferred carry-forward: Human Review Identifiers does not prohibit AI agent modification of `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md` — still deferred from Story 4.2; no scope assigned.

### File List

- `docs/design-manual.md`

### Review Findings

- [x] [Review][Defer] Deferred-work entry for version stamp (from 4-1 review) is now resolved — `_bmad-output/implementation-artifacts/deferred-work.md` — pre-existing, not a spec violation for this story; clean-up of the deferred-work file is a manual pass outside story scope.

## Change Log

- 2026-05-24: Replaced Part 4 placeholder with anti-list (12 rules + Palette Closure Rule), evolution triggers (3 milestones table), and living components placeholder table with 2 example entries. Total doc: 298 lines. Version stamp confirmed at 1.0.
- 2026-05-24: Code review complete — clean review. 0 decision-needed, 0 patch, 1 defer (pre-existing deferred-work entry for resolved version stamp), 4 dismissed as noise. Status set to done.
