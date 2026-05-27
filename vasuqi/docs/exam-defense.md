# Vasuqi — Exam Defense & Process Document

**Student:** Edda Óskarsdóttir
**Project:** Vasuqi ApS — Coded website + AI-agent design manual
**Exam type:** Oral examination with presentation and submitted process documentation
**Date:** 2026-05-19

---

## How to Use This Document

This document serves two purposes simultaneously:

1. **Oral exam preparation** — Scan the "Talking Points" boxes before your presentation. Each section has the compressed argument you need to be able to speak aloud. The full text underneath is for when you need to go deeper.

2. **Process documentation artefact** — This is a structured record of every significant design decision made during the project, with rationale. It can be submitted as part of your process folder.

Each major decision follows the **three-layer argument structure**: design theory or principle → connection to the brand's material language system → evidence from research, testing, or precedent. One layer is a preference. Three layers is a decision.

---

## Project Overview (1-minute version for the examiner)

Vasuqi ApS is a Danish DTU spinout developing visible-light photocatalytic water purification systems — technology capable of handling the final 5% of water contamination that conventional infrastructure cannot clean. They are pre-prototype and investor-seeking.

The brief was to design and code a marketing website for the company. The deliverable became two coupled artefacts:

1. A **coded marketing website** (HTML / Tailwind CSS / JavaScript) implementing an existing Figma prototype — primary audience: potential investors.
2. An **AI-agent design manual** (`docs/design-manual.md`, ~480 lines) paired with a CSS token file — primary audience: the founder working with AI coding tools post-handoff.

The coupling is the core design argument: the manual documents the rules the code implements, the code is structured to be maintainable through the manual, and both share a namespace. Neither artefact is complete without the other.

---

## Section 1: The Two-Deliverable System

### Why two artefacts, not one?

**Talking points:**
- The website solves the immediate problem. The manual solves the next problem: the founder will use AI tools to maintain and extend the site, and without design guidance those tools will drift the brand.
- Damage prevention and creation enablement — same document, both functions.
- The manual is not documentation of the website. It is a design system that the website implements.

**Full argument:**

The original brief was a website. The design manual emerged from a second-order problem analysis: what happens to this website after handoff?

The founder is non-designer, technical but not a front-end developer, and will work primarily with AI coding assistants. Without authoritative design guidance, AI tools default to generic web patterns — dark mode, rounded card components, off-palette gradients, oversized navigation. Each individual change might be small. Cumulatively, they erase a brand that was specifically built to generate investor trust through visual precision.

The manual's dual function: **damage prevention** (stopping AI from breaking the brand) and **creation enablement** (allowing AI to extend the brand coherently). The same document serves both, but its structure reflects both audiences: command-style rules for the AI, plain-language context for the founder.

### The shared namespace

Component names, CSS token identifiers, and section IDs are consistent across both artefacts. `--blue-primary` in the manual refers to the same value as `--blue-primary` in `design-tokens.css`. "The Gap" section in the manual corresponds to the same anchor ID in the HTML. The AI can navigate from a manual rule to its implementation without translation — and without introducing naming discrepancies between documentation and code.

---

## Section 2: Brand Philosophy & The Material Language System

### The three (four) material languages

**Talking points:**
- Most design systems document components. This one documents the reasoning layer above components.
- Water / Glass / Blueprint are not just aesthetics — they are the product's story told through materials.
- Light was added as a fourth language: it governs luminous and ambient elements, is behaviorally governed by Water physics, and is visually expressed through Glass. Water and Light are treated as interrelated systems.
- An AI given only component rules pattern-matches. An AI given a reasoning layer can derive decisions for situations it was never shown.

**Full argument:**

**Water** — Fluid, clean, organic. The brand's core material: white space, smooth motion, absence of clutter. Every design decision that creates calm, purity, or clarity traces back to water as concept. Shape language: circles and fluid organic forms for mission-critical content.

**Glass** — Transparency, blur, iridescence, frosted luxury. The material language for UI containers (cards, section backgrounds, overlays, navigation). Four qualities: see-through (transparency doctrine), iridescent (light through water), frosted (soft, not harsh), polished (precision hardware, not budget industrial). This is not "glassmorphism" as a trend — it is a mapped relationship between the brand's values and a specific set of visual properties.

**Blueprint** — Line-drawn, technical precision, unrealised potential. The material language for representational elements: icons, technical diagrams, product illustrations. Always outline, never filled. The conceptual argument: a blueprint is a drawing of something being built. Filling the icons would claim certainty that the product, pre-prototype, does not yet have.

**Light** — Luminous, ambient, technology-forward. Governs glowing elements: the LED highlight colour (`#00E5FF`), the floating background animation, hover expansion effects on the product visualization. Behaviorally, Light follows Water physics — slow, continuous, non-linear. Visually, it expresses through Glass — transparent, not solid.

**Why this matters for AI:** Most design systems give an AI a catalogue it can match against. This system gives an AI a conceptual test it can apply to novel situations: *Which material language does this belong to? What does that language require?* The system is generative, not just referential.

### The Phase 1 / Investor Stage declaration

**Talking points:**
- The Blueprint aesthetic is intentionally stage-appropriate. Line-drawn icons represent unrealised potential — a product in blueprint phase.
- The design system explicitly documents when this visual identity should change (evolution triggers), not just what it currently is.
- A design system that documents its own lifecycle is more honest and more durable than one that presents itself as permanent.

**Full argument:**

The current identity is explicitly labelled `Design System v1.0 — Investor Phase (pre-prototype)`. Blueprint icons (line-drawn, never filled) are not a stylistic preference — they are a truthful representation of where the product sits. Filling those icons would claim the certainty of a shipped product the company does not yet have.

Evolution triggers are documented by product milestone, not date: real product photography replaces blueprint renders when a working prototype exists. The blueprint aesthetic is retired when there is something to photograph. The tone shifts from investor to B2B operator when pilot programs launch. The design system documents what it becomes, not just what it is.

---

## Section 3: Colour System Decisions

### The 10-colour palette

**Talking points:**
- The palette is the technology made visible. Every colour has a source.
- `#0A1F44` is the depth of unclean water. `#00E5FF` is the LED light. The narrative is embedded.
- The palette is closed — no colours outside these 10 are ever introduced. This is a hard constraint, not a preference.

**Full argument:**

| Token | Hex | Role | Origin |
|---|---|---|---|
| `--navy-deep` | `#0A1F44` | Primary dark background, hero, footer | Depth of unclean water |
| `--blue-primary` | `#0044FF` | Main accent — buttons, active states, logo | Core brand blue |
| `--blue-deep` | `#0033CC` | Secondary accent — hover states, depth | Depth variation |
| `--blue-mid` | `#6A93FF` | Mid-tone — glass layers, secondary UI | Mid-water tones |
| `--blue-soft` | `#A8C5FF` | Light accent — gradient mid-stops, hover tints | Near-surface water |
| `--cyan-light` | `#00E5FF` | Technology highlight — LED glow effect only | The photocatalytic LED |
| `--steel` | `#5C6B85` | Neutral — body text on light, secondary labels | Industrial precision |
| `--ice-light` | `#D6F8FF` | Light section backgrounds | Near-pure water |
| `--ice-near` | `#E8F2FF` | Near-white sections | Surface water |
| `--white-brand` | `#FAFCFF` | Brand "white" — never pure white | Pure water (not clinical white) |

The Palette Closure Rule: if a new use case seems to require a colour outside these ten, that is a signal to redesign the component, not to expand the palette. The palette does not grow.

### No pure black. No pure white. Ever.

**Talking points:**
- `#000000` is industrial harshness. `#FFFFFF` is clinical in the wrong direction.
- The brand's darkest value is `#0A1F44`. The lightest is `#FAFCFF`.
- This is the rule an AI will break first. It is the most important rule in the anti-list.

**Full argument:**

Pure black reads as industrial, harsh, and generic. Pure white reads as clinical in a way that disconnects from the water/glass material language. The brand's "white" (`#FAFCFF`) has the faintest blue cast — it reads as very slightly water-tinted, not as blank white paper.

This decision is defensible on three levels: (1) colour theory — absolute values read as neutral and brand-absent; (2) material language — both Water and Glass have inherent tonal warmth, even at their lightest; (3) brand differentiation — pure-black-and-white is the default of generic web design and of AI tools' training data. Banning both forces every implementation toward brand-specific choices.

### `#00E5FF` Cyan is LED-only

**Talking points:**
- The brightest colour in the palette is the most restricted.
- It means: this is where the light comes from. Used elsewhere, it loses its meaning.
- This is the rule an AI will most aggressively misuse — it looks like a great general highlight colour. It isn't.

**Full argument:**

The cyan is the colour of the photocatalytic LED — the actual mechanism by which Vasuqi's technology works. Using it as a general accent or hover state would devalue it. It is reserved exclusively for light-source moments: the LED glow effect, technology-specific highlights in the product visualization, the floating light background animation. Its restriction is its meaning.

---

## Section 4: Typography Decisions

### Syne + Manrope — the pairing logic

**Talking points:**
- Syne carries the Blueprint/innovation language. Manrope carries the Water/calm language.
- The pairing maps onto the brand's core tension: bold technology communicated with calm clarity.
- The fonts are not chosen for aesthetics. They are chosen because they are extensions of the material system.

**Full argument:**

**Syne** (headings only): Geometric, avant-garde, slightly technical. Variable font — weight axis allows fine-grained control that static font subsets cannot provide. Carries the Blueprint material language: precise, technical, constructed.

**Manrope** (body, UI, captions, navigation, labels, CTAs): Clean, calm, highly readable. Carries the Water material language: smooth, unpretentious, accessible.

The rule is absolute: Syne never appears in body text. Manrope never appears in primary headings. If an AI "harmonises" the typography by using Manrope everywhere, it erases the brand's typographic voice. If it uses Syne for body text, it makes the site unreadable.

### The variable font weight: 743

**Talking points:**
- H1 is `font-weight: 743`. This value only exists on a variable font axis.
- Installing "Syne Bold" (weight 700) gives you a visibly different result. The difference is noticeable.
- This is a silent mistake — the page renders, it just looks slightly wrong. Documentation must name it explicitly.

**Full argument:**

H1 uses a weight of 743 — between SemiBold (600) and Bold (700) on Syne's variable axis. Static font subsets only exist at named weights. A developer or AI tool loading "Syne SemiBold" gets 600; "Syne Bold" gets 700. Neither is 743. The implementation must load the variable font file and set `font-weight: 743` in CSS.

This detail appears in the design manual and in `design-tokens.css`. It is the kind of implementation detail that design documentation typically omits — and that produces visibly incorrect results when omitted.

### The counter-intuitive caption rule: 20pt ExtraLight

**Talking points:**
- Captions in this system are 20pt ExtraLight — physically larger than body text (16pt) but much lighter in weight.
- They feel ghostly, atmospheric, large but weightless.
- This is the rule an AI will "correct" away immediately. Every design training says captions should be small. Here they are large and feather-light.

**Full argument:**

The caption style (Manrope ExtraLight 200, 20pt) connects to the Glass material language: present but transparent, large but not heavy. The visual weight (ExtraLight 200) creates the ghostly, atmospheric quality. The physical size (larger than body) creates presence without competition.

The design decision is defensible: hierarchy is created by contrast between size and weight, not by size alone. A large, light caption and a smaller, medium-weight body create more visual interest than a small caption at the bottom of an image.

This is specifically flagged in the design manual as the rule most likely to be "corrected" by an AI. The manual documents not just the rule but why the AI's instinct is wrong in this context.

---

## Section 5: Motion & Animation Decisions

### Water physics as motion language

**Talking points:**
- All animations are governed by how water moves: slow, continuous, non-linear, never sudden.
- "Water physics" is a conceptual test, not a technical specification: does this feel like water moving? If not, reject it.
- This excludes spring physics, bounce effects, snap transitions, and flash transitions by definition.

**Full argument:**

Animation duration range: 800ms–1200ms for entrance effects. Easing: gentle ease-in-out. Background motion: continuous and nearly imperceptible. The animation language is defined by what it excludes as much as what it includes: no bouncing, no spring physics, no snap, no flash. These are incompatible with the Water material language regardless of context.

The conceptual test replaces a technical checklist: if a proposed animation cannot be described as something water does, it does not belong in this system.

### The intro animation sequence

**Talking points:**
- The sequence is the brand argument: problem (text builds) → resolution line → identity (logo animates in).
- The animation IS the value proposition. It is not decorative.
- Session-aware: plays once per browser session, not on every page load.

**Full argument:**

The planned sequence: text builds first ("The last 5%... is the hardest") → resolution line ("Water, polished by light") → logo animates in. This order is not aesthetic — it is the brand's argumentative logic made temporal. Problem first, solution second, identity last. Any future entrance animation must follow this logic, not just produce a visually interesting effect.

Session-awareness (`sessionStorage`) ensures the animation communicates on first visit without penalising returning visitors. It is dismissible on any click or tap — respecting the time-pressured investor persona who has seen the site before.

---

## Section 6: Design Manual Architecture (The Core Innovation)

### What makes this novel

**Talking points:**
- Design systems are built for human designers. AI coding tools operate without brand awareness. This manual occupies the gap.
- The gap is not served by any existing tool: Figma, Storybook, Style Dictionary (human-reader-first) vs. Cursor, Copilot, Claude Code (brand-blind).
- The innovation is teaching the AI *why*, not just *what* — so it can judge new cases, not just pattern-match from examples.

**Full argument:**

Existing tools occupy two positions: design systems (built for human designers navigating a reference library) and AI coding assistants (operating without brand awareness). The design manual for Vasuqi occupies the gap between them — a design system that treats AI agents as its primary reader.

No standard tooling exists for this use case. The approach was constructed from first principles, informed by a structured brainstorming session that produced 59 distinct ideas across four ideation phases.

### Task-based organization (not category-based)

**Talking points:**
- AI agents ask "what should I do here?" not "what category does this fall under?"
- The manual is organized around tasks, not components: *When adding a new section. When writing new copy. When creating a new component. When adding media.*
- This structural choice is a design decision. The manual's organization determines whether its rules get used.

**Full argument:**

Traditional design documentation organizes by component type (buttons, cards, navigation). An AI reading this to answer "how do I add a press mention to the news section?" must cross-reference multiple sections.

This manual organizes by decision: the AI reads the relevant "When adding..." section, finds the applicable rules, and proceeds. The task-based structure reduces friction to zero — the AI gets to the answer in one section, not five.

### Length constraint: ~480 lines

**Talking points:**
- A manual that fits in a single LLM context window is always fully read. One that doesn't is skimmed.
- Length is a design decision. Comprehensive and concise are not opposites — they require editing discipline.
- Every rule in the manual must earn its place. Rules that don't meet that bar are cut.

**Full argument:**

LLM context windows have practical limits. A design manual that exceeds them gets truncated — meaning the rules at the end are never applied. The ~480 line constraint ensures the AI receives the complete manual as context before beginning a task.

This constraint also disciplines the writing: every rule must be stated once, clearly, without padding. Redundancy is more expensive in this format than in human documentation because every line costs context tokens.

### The Component Derivation Protocol

**Talking points:**
- A closed catalogue of components leaves the AI stranded when a new situation arises.
- The protocol gives the AI a derivation method, not just a reference library.
- Five steps: Which material language? Closest existing component? Container type? Icon style? Colour rules?

**Full argument:**

The five-step IF/THEN derivation protocol turns the manual from a static reference into a generative system. When the founder asks the AI to create a component that doesn't exist in the design system, the AI doesn't default to generic web patterns — it derives a solution using the three (four) material languages as the reasoning layer. The result should pass the Same Designer Test: does this look like it was made by the same designer as the rest of the site?

This protocol is what makes the design system durable beyond the initial handoff. New components can be derived without a designer present.

### The Same Designer Test

**Talking points:**
- Holistic consistency check, not a checklist.
- The question is not "does this follow the rules?" but "does this feel continuous?"
- A component can follow every documented rule and still feel like an addition rather than an extension. This test catches what rules miss.

### The Living Manual Protocol

**Talking points:**
- Every new component documented before the session ends. Five fields: Name, Material Language, Use Case, Key Decisions, Code Reference.
- Low friction is a feature of the template itself. If documenting takes 2 minutes it happens; 20 minutes it doesn't.
- Institutional memory across sessions, founders, and AI agents.

### The Three-Layer Argument Structure

Every rule in the design manual can be defended on three levels:
1. A design principle or theory
2. One of the four material languages
3. Research, testing, or precedent

One layer is a preference. Two layers is a rationale. Three layers is a decision. This structure makes the manual exam-proof (every rule is arguable) and more persuasive to the founder (he follows rules he understands).

---

## Section 7: Counter-Intuitive Decisions

These are the decisions most likely to be questioned in an oral exam. Each one goes against a default assumption. Knowing why is the defense.

### "No dark mode. Ever."

Dark mode is the default of deep-tech branding. AI tools default to it. Vasuqi is the counter-argument: the brand is light, clean, water, purity. Dark mode would contradict the conceptual logic of the product. The rule is stated in the manual as: *"We chose light because our product makes things light. Dark mode would be a lie."*

### Captions larger than body text

20pt ExtraLight captions appear larger than 16pt Medium body text but feel weightless. The counter-intuition: hierarchy comes from the contrast between size and weight, not from size alone. The Glass material language (large but transparent, present but not heavy) justifies the choice.

### The gradient goes dark-to-light (always, never reversed)

The hero is `#0A1F44` — deep navy, the depth of unclean water. The page brightens as you scroll, physically moving toward solution. The gradient is a spatial argument, not decoration: this is not just a colour transition, it is the product's value proposition expressed as a scroll.

### The palette is closed

Ten colours. No additions, ever. If a component requires a colour that doesn't exist in the palette, the component needs redesigning, not the palette. Palette drift is invisible until it's severe — naming it as a hard constraint prevents it.

### Syne for headings only (absolute rule)

Using Syne for body text is not an aesthetic misstep — it is a readability failure. Using Manrope for primary headings erases the brand's typographic voice. The rule is absolute because partial compliance produces a different failure mode than non-compliance.

---

## Section 8: Technical Decisions

### HTML / Tailwind CSS / JavaScript (no framework)

**Why:** The site is a static marketing page. Server-side rendering, client-side routing, and component frameworks add complexity without adding capability. A static site is more maintainable by a non-developer founder using AI tools — there are no build pipelines to break, no state management to understand.

**Why Tailwind:** Utility-first CSS is more legible to AI coding agents than custom CSS files. The Tailwind config can be extended to reference CSS custom property tokens, creating a single source of truth between utility classes and design system values.

**Why CSS custom properties for tokens:** All design values (colours, type scale, spacing) live in `design-tokens.css`. No magic numbers appear in stylesheets. When the founder asks an AI to "use the primary blue," the AI references `--blue-primary` and the correct value is guaranteed — regardless of which AI tool, which session, or how long after the original handoff.

### Animation library: deferred to build phase

The JS animation library (GSAP is a reference starting point from the logo animation prototype) is deliberately not specified in the PRD. The library choice should be made from the Figma source — understanding exactly what the animation requires — before writing a line of code. Locking a library in the requirements before understanding the animation's full scope would either over-constrain the build phase or require a PRD amendment.

The design manual requires the library decision to be documented before the manual is considered complete.

### GitHub deployment (static hosting)

**Why:** Zero infrastructure for the founder to manage. Git-based deployment means any code change pushed to the repository is automatically reflected on the live site. The founder's workflow: edit → push → live. No server management, no deployment pipeline, no hosting fees at this scale.

### Formspree for contact form

**Why:** A Danish company collecting personal data via a contact form needs that data delivered to the founder without the codebase storing it. Formspree handles delivery, spam filtering, and storage externally. The endpoint URL is stored as a configurable variable — the founder can swap services without modifying page structure.

---

## Section 9: Process Decisions

### Brainstorming first (59 ideas, 4 phases)

The design manual structure was developed through a structured brainstorming session before any requirements were written. Four phases: What If Scenarios → Six Thinking Hats → First Principles Thinking → Solution Matrix. The session generated 59 distinct ideas and converged on a two-file deliverable structure and a task-based organization.

This sequence mattered: starting from requirements would have produced a standard design system. Starting from brainstorming produced a novel one.

### Single-release delivery

No phased delivery. The website and design manual are coupled artefacts — one is not useful without the other. Delivering the website without the manual would leave the founder without the tools to maintain it. Delivering the manual without the website would be documentation of nothing. Both ship together as a single exam submission.

### Design manual as exam deliverable

A coded website is a standard exam deliverable. A coded website plus an AI-agent design manual is not. The PRD is explicitly self-justifying — it documents why this combination of deliverables is coherent, what problem each solves, and why neither works without the other. The rubric for a novel deliverable must be argued, not assumed.

---

## Section 10: Exam Talking Points (Quick Reference)

Use these as mental anchors during the presentation. Each one is a compressed argument you can expand from the sections above.

**On the two-deliverable system:**
> "The website solves the immediate problem. The manual solves the next problem — what happens when the founder uses AI tools to maintain the site without me."

**On the material languages:**
> "Most design systems document components. This one documents the reasoning layer above components — so the AI can derive decisions it was never shown, not just copy examples it was given."

**On the blueprint aesthetic:**
> "Line-drawn icons are not a stylistic choice. They represent unrealised potential — a product in blueprint phase. Filling them would claim certainty we don't have yet."

**On no dark mode:**
> "Dark mode would be a lie. The brand is light because the product makes things light."

**On the variable font weight 743:**
> "H1 is weight 743. That value only exists on a variable font axis. Installing 'Syne Bold' gives you 700 — it's visibly different and it's a silent mistake. Documentation has to name it explicitly."

**On captions being 20pt:**
> "Hierarchy isn't just size — it's the contrast between size and weight. The caption is large but feather-light. It's present but transparent. That's the Glass material language."

**On the gradient direction:**
> "The gradient goes dark to light as you scroll. It's not a colour transition — it's the product's value proposition. The hero is the problem. The page bottom is the solution."

**On the manual length constraint:**
> "A manual that fits in a single LLM context window is always fully read. One that doesn't is skimmed. Length is a design decision."

**On the closed palette:**
> "Ten colours. If a new component needs a colour that isn't there, the component needs redesigning. Palette drift is invisible until it's catastrophic."

**On the anti-list:**
> "The most dangerous outcome is a page that looks professionally competent but brand-neutral — a page that could belong to any deep-tech company. The anti-list names the specific failure states the AI must avoid."

**On the innovation claim:**
> "Design systems are built for human designers. AI coding tools are brand-blind. No existing tool occupies the gap. This manual was built from first principles to fill it."

**On the Same Designer Test:**
> "Rules catch specific violations. The Same Designer Test catches everything else — the holistic feeling of continuity that you can see but can't always name."

---

## Appendix: Key Specifications for Quick Reference

| Item | Value |
|---|---|
| Typography — H1 | Syne, weight 743 (variable), 55pt, 106% line height |
| Typography — H2 | Syne SemiBold 600, 24pt |
| Typography — H3 | Syne Medium 500, 20pt |
| Typography — Body | Manrope Medium 500, 16pt |
| Typography — Caption | Manrope ExtraLight 200, 20pt |
| Dark background | `#0A1F44` |
| Primary accent | `#0044FF` |
| LED highlight (restricted) | `#00E5FF` |
| Brand white | `#FAFCFF` |
| Animation duration | 800ms–1200ms |
| Design manual length | ~480 lines |
| Design tokens file | ~60 lines CSS custom properties |
| Pages delivered | 4 (Landing, News & Docs, About Us, Contact) |
| Landing page sections | 6 |
| Functional requirements | 49 |
| Material languages | 4 (Water, Glass, Blueprint, Light) |
| Anti-list rules | 12 minimum |
| Brainstorming ideas generated | 59 |
