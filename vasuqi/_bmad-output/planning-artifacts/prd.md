---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain-skipped', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
releaseMode: single-release
inputDocuments:
  - '_bmad-output/brainstorming/brainstorming-session-2026-05-17-1.md'
workflowType: 'prd'
briefCount: 0
researchCount: 0
brainstormingCount: 1
projectDocsCount: 0
classification:
  projectType: web_app
  domain: general
  complexity: medium
  projectContext: greenfield
  techStack: 'HTML/Tailwind CSS/CSS/JavaScript'
  deliverables: ['coded-marketing-website', 'design-manual']
  primaryAudiences:
    website: investors
    manual: founder-with-ai-agents
vision:
  corePurpose: 'Brand as proof of concept — visual precision stands in for the prototype that does not yet exist'
  primaryConversion: 'Contact form fill or pitch deck download'
  trustSignal: 'Site must not look AI-generated; visual quality IS the credibility signal'
  manualPurpose: 'Both damage prevention and creation enablement — same document serves both'
  figmaPrototype: 'Desktop-complete with all elements and animations; mobile to be derived from design system rules'
  examContext: 'Novel deliverable, no preset rubric — PRD must be self-justifying'
---

# Product Requirements Document - Vasuqi

**Author:** Edda
**Date:** 2026-05-18

## Executive Summary

Vasuqi ApS is a Danish clean-tech startup (DTU spinout) developing visible-light photocatalytic water purification systems — technology capable of replacing chemical treatment in the final 5% of water that conventional infrastructure cannot clean. The company is currently pre-prototype, investor-seeking, and operating as a sole-founder entity.

This project delivers two interdependent artifacts as a single system:

1. **Coded marketing website** — implementing the existing Figma desktop prototype in HTML / Tailwind CSS / CSS / JavaScript. Target conversion actions: contact form submission and pitch deck download. Primary users: potential investors evaluating fundability.

2. **AI-agent design manual** — an authoritative ~480-line specification (`docs/design-manual.md`) paired with a CSS token file (`design-tokens.css`). Primary users: the founder working with AI coding agents to maintain and extend the site post-handoff.

The two deliverables are architecturally coupled: the manual documents the rules the code implements, and the code is structured to be maintainable through the manual. Component names, token systems, and section patterns are shared across both artifacts.

### What Makes This Special

At pre-prototype stage, Vasuqi has no working product to demonstrate. The website's job is to generate the investor trust that a physical demo would normally provide. Visual precision — correct brand execution, no AI-generated appearance, no generic patterns — is the credibility signal. A site that looks carelessly assembled tells investors the technology probably is too.

The design manual solves a second-order problem: the same AI tools that could erode the brand's trustworthiness are the founder's primary development tool going forward. The manual makes AI-assisted development brand-safe — preventing the damage that would undermine the site's core purpose, while equipping the AI to extend the site coherently within the established design system.

The core design system is built on four material languages (Water, Glass, Blueprint, Light) that function as a reasoning layer above component-level rules. This allows an AI agent to handle novel situations not explicitly covered in the manual by deriving decisions from the conceptual framework rather than defaulting to generic web conventions.

## Project Classification

- **Project Type:** Web application (marketing landing page + design system)
- **Domain:** Clean-tech / marketing (software complexity: general)
- **Complexity:** Medium — two coupled deliverables, design system specification, post-handoff maintainability requirements
- **Project Context:** Greenfield — brand identity and Figma prototype exist; no prior codebase
- **Tech Stack:** HTML / Tailwind CSS / CSS / JavaScript
- **Design Reference:** Figma prototype (desktop-complete with all elements and animations; mobile derived from design system rules)
- **Phase:** Investor-facing (Phase 1 of a defined evolution)

## Success Criteria

### User Success

**Investor visitor:**
- Moves through the full narrative arc (problem → regulatory context → where Vasuqi fits → what it replaces → how it works) without dropping off before reaching a conversion point
- Completes contact form submission or downloads the pitch deck PDF
- Intro animation begins immediately on first page load, runs for approximately 3–5 seconds, communicates the core value proposition, is dismissible on any click, and does not replay within the same browser session
- Leaves with a sense of technical credibility and brand trustworthiness, despite no physical prototype existing

**Founder (post-handoff):**
- Can brief an AI agent to add or modify content without ever consulting a designer
- Any new content produced through AI-assisted development is visually brand-consistent on the first attempt — it reads as made by the same designer as the original site
- Can independently configure and access contact form submissions via Formspree; no designer or developer dependency for setup
- Can add new items to the News & Documentation page with AI assistance while the layout and visual identity are preserved

### Business Success

- Live URL ready for exam submission; deployed via GitHub
- Pitch deck PDF downloadable from the News & Documentation page
- Site operates as a credible investor asset: visual quality signals precision and intentionality rather than speed-to-market compromise

### Technical Success

- Cross-browser compatible: last 2 major versions of Chrome, Firefox, Safari, Edge; Safari 15+ for older iOS. No IE11.
- Mobile-first responsive across all common device sizes; included in MVP
- Intro animation renders on first paint; runs 3–5 seconds; skippable; session-aware
- WCAG 2.1 AA compliant throughout; semantic HTML; keyboard navigation; alt text on all assets
- SEO metadata on all pages; crawlable without JavaScript
- SVG water treatment diagram implemented as static SVG per Figma design
- All design values available as CSS custom properties in `design-tokens.css`

See Non-Functional Requirements for measurable specifications.

### Measurable Outcomes

- All 4 pages delivered: main landing page, News & Documentation, About Us, Contact
- Shared footer across all pages: About / Product columns + social links
- Main landing page: 6 sections (intro animation, hero, the gap, where Vasuqi fits + SVG diagram, what it's built to change, how it works) + sticky side navigation + top nav with Contact CTA
- News & Documentation page: News section + Documentation section with all category placeholders; pitch deck PDF download included
- About Us page: "Why Väsuqi?" intro + team grid (CEO, CTO, Advisor, Chief Scientific Advisor) with photo, role, bio, LinkedIn per member
- Contact page: 5-field form (Name*, Email*, Company name / Job title, Phone, Message) + general enquiries block (email, phone, address, Google Maps embed) + LinkedIn social link
- Design manual: ~480 lines, task-based, fits one LLM context window
- Design tokens: all palette values, type scale, spacing as CSS custom properties
- Live deployment URL

## Product Scope

### MVP — Minimum Viable Product

- **Main landing page** — full scroll with top nav (Contact CTA) + sticky side jump-link navigation (hover-reveal, 6 anchors): intro animation, hero, the gap, where Vasuqi fits (SVG water-cycle diagram), what it's built to change, how it works
- **News & Documentation page** — hero image, News section (announcements, press), Documentation section (all categories as placeholders including pitch deck PDF download); structured for AI-assisted content addition
- **About Us page** — "Why Väsuqi?" section + team grid: CEO Adarsh Raj, CTO Jörg Vogel, Advisor Peter Holme Jensen, Chief Scientific Advisor Angela Zhang — photo, role, bio, LinkedIn
- **Contact page** — 5-field contact form (Formspree integration) + general enquiries block (email, phone, address, Google Maps embed)
- **Shared footer** — About / Product columns + social links; consistent across all pages
- **Mobile-first responsive implementation** — all pages
- **Full accessibility implementation** — semantic HTML, keyboard nav, alt text, ARIA labels
- **SEO / metadata** — all pages
- **Design manual** (`docs/design-manual.md`, ~480 lines)
- **Design tokens** (`design-tokens.css`, CSS custom properties)
- **Live deployment via GitHub**

### Growth Features (Post-MVP)

- Real product photography replacing blueprint renders (trigger: working prototype exists)
- B2B operator-facing copy layer — separate audience tone when pilot programs launch
- Populated News & Documentation content (articles, case studies, videos, webinars)
- Data visualisation graphs (COD reduction / cost charts) — flagged for mobile-specific redesign, not simple scaling
- Restricted file access control for trademark/copyright guidelines
- GDPR compliance: cookie consent banner and privacy policy page (handoff note to founder — site collects personal data via contact form; Vasuqi is a Danish company)

### Vision (Future)

- Phase 2 brand evolution: blueprint aesthetic retired, identity updated to reflect a shipped product
- Full design system update: fixed elements preserved, flexible elements updated for operator and enterprise audiences

## User Journeys

### Journey 1: The Investment Director — First Visit (Primary, Happy Path)

**Persona:** Marie, Investment Director at a European climate tech fund. She evaluates 20+ decks a week. She's been burned by deep-tech vaporware before and has a sharp filter for "precision vs performance."

**Opening scene:** She receives a warm intro email from a mutual contact: *"DTU spinout, water polishing, EU compliance angle — worth five minutes."* She clicks the link from her laptop between meetings.

**Rising action:** The intro animation plays immediately — three seconds, no waiting. She watches it rather than clicking away: it tells her what the product does without her opening a file. She lands on the hero. The visual language is immediately different from the usual VC-pitch dark-mode template: clean, light, precise. She keeps scrolling. The Gap section hits the regulatory argument before she even asks the question — EU targets, cost data, the specific industrial problem conventional systems leave unsolved. She's not reading marketing copy; she's reading an argument. She uses the side navigation to jump directly to "How It Works" — the technology description is direct and specific, no hedging. She goes back up and checks the team: operators and researchers, not just academics. The site has never asked her to trust it; it has simply been trustworthy.

**Climax:** She opens the News & Documentation page. The pitch deck is right there — one click, PDF downloaded. She's already drafting the forwarding email to her partner.

**Resolution:** She sends the link to two colleagues with a single line: *"Credible team, real regulatory pressure, no fluff."* Contact form submitted two days later.

**Capabilities revealed:** Intro animation (first-paint, session-aware, skippable) · Narrative scroll structure · Side jump navigation · Team page credibility · Pitch deck PDF download · SEO/discoverability for warm referral traffic

---

### Journey 2: The Time-Pressured Angel — Quick Scan (Primary, Edge Case)

**Persona:** Kasper, Danish angel investor with an industrial background. He already knows the water treatment space. He doesn't need the narrative — he needs the team and the technology, fast. He's on his phone.

**Opening scene:** He sees the link shared in a LinkedIn post. He clicks it at the airport. The animation starts — he taps it away immediately. Lands on the hero.

**Rising action:** He goes straight to the side navigation. Jumps to "How It Works." The technology section is dense but legible on mobile — the blueprint diagram is clear, not a squashed desktop component. He scrolls to "Where Vasuqi Fits" — the SVG diagram tells him exactly where in his mental model of water treatment this product lives. He doesn't need the about page; he knows enough. He opens the contact form. It asks for company name and job title — he knows this is a qualified form, not a newsletter signup. He fills it in and submits.

**Climax:** The form goes through. He closes the browser and catches his flight.

**Resolution:** He gets a response from Adarsh within 24 hours. The site made a qualified impression in under two minutes on a phone screen.

**Capabilities revealed:** Mobile-first responsive layout · SVG diagram legibility at small sizes · Side navigation as fast-path for non-linear users · Contact form with qualified fields · Form service delivery to founder's inbox

---

### Journey 3: The Founder + AI Agent — Adding a Press Mention (Secondary, Post-Handoff)

**Persona:** Adarsh, Vasuqi CEO. Non-designer, technical but not a front-end developer. Working alone. A Danish sustainability publication just mentioned Vasuqi — he wants it on the site today.

**Opening scene:** He opens his AI coding assistant. Before writing a single instruction, he pastes the contents of `docs/design-manual.md` as context. This is the activation step the manual's first section explains in three steps.

**Rising action:** He asks: *"Add an 'In the medias' entry to the News & Documentation page for this article: [title, publication, URL]."* The AI reads the manual. It knows: news items are listed under the News section, links use `--blue-primary` on hover, font is Manrope Medium 16pt, no generic card component, no new colours introduced. It produces the HTML addition. Adarsh previews it — it looks like it was always part of the page. He pushes to GitHub. The site deploys.

**Climax:** He checks the live URL. The new entry sits in the list as if the original designer placed it.

**Resolution:** He closes his laptop. He didn't call a designer. He didn't break anything. The brand is intact.

**Capabilities revealed:** Design manual as AI context document · News & Documentation page structured for AI-assisted additions · Consistent typography tokens and link styles · GitHub-based deployment workflow · "Same designer" test as quality bar

---

### Journey 4: The Investment Director — Form Submission Failure (Primary, Error Recovery)

**Persona:** Marie, returning to the site two days after her initial visit. She read the pitch deck, she's interested, and she's ready to make contact. She's at her office desk — behind a corporate firewall that intermittently blocks third-party form POST requests.

**Opening scene:** She navigates directly to the Contact page. She's been here before — she trusts the site. She fills in the required fields (name, email) and clicks Submit.

**Rising action:** The button activates. The form appears to process. No confirmation appears. She waits. She tries again — same result. No error message, no success message, just silence. Her corporate network has silently dropped the Formspree POST. She doesn't know what failed — only that something did. She reads the page carefully, looking for another way through.

**Climax:** Directly below the form, the general enquiries block is visible without scrolling: email address, phone number, LinkedIn. She copies the email address, opens her mail client, and writes a two-line message. It takes thirty seconds.

**Resolution:** She reaches Adarsh directly. The lead is not lost. The form's failure became a test of the Contact page's full architecture — and the page held because it offered a redundant channel immediately visible, no hunting required. The form failure cost the site nothing.

**Capabilities revealed:** General enquiries block as visible, redundant contact channel on the Contact page · Contact page layout keeps alternative channels in view without scrolling · Contact form must provide visible feedback on both success and failure states — silent failure is not acceptable

---

### Journey Requirements Summary

| Capability | Revealed by |
|---|---|
| Intro animation — first-paint, session-aware, skippable | Journey 1, 2 |
| Mobile-first responsive layout on all pages | Journey 2 |
| Side jump navigation — hover-reveal, 6 anchors | Journey 1, 2 |
| SVG water-cycle diagram — legible at all sizes | Journey 2 |
| Pitch deck PDF download on News & Documentation | Journey 1 |
| Contact form — 5 fields (Name*, Email* required; Company/Job title, Phone, Message optional), Formspree integration | Journey 2 |
| Contact form — visible success and failure feedback states | Journey 4 |
| General enquiries block — redundant contact channel, visible without scrolling | Journey 4 |
| SEO / metadata — discoverable via warm referral and direct search | Journey 1 |
| Team page — credibility signals (photos, roles, bios, LinkedIn) | Journey 1 |
| Design manual — activatable as AI context, plain-language first section | Journey 3 |
| News & Documentation — structured for AI-assisted content addition | Journey 3 |
| Design tokens — AI can apply correct values without parsing prose | Journey 3 |

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. AI-Agent-Optimized Design Documentation**

Standard design systems are structured for human designers navigating a reference library. This manual is structured for an LLM reading sequentially before a task — task-based organization (what to do when adding a section, when writing copy, when creating a component), command-style rules without prose padding, and explicit length constraints (~480 lines) that fit within a single context window. The document is not a supplement to an AI's general web design knowledge — it explicitly declares itself authoritative and overrides defaults.

**2. Reasoning Layer Above Components — The Four Material Languages**

Most design systems define components and tokens. This system defines a conceptual layer above them: four material languages (Water, Glass, Blueprint, Light) that provide the reasoning behind every visual and motion decision. An AI given this layer can handle novel situations not covered in the manual by deriving decisions from the conceptual framework rather than defaulting to internet conventions. The innovation is teaching the AI *why*, not just *what* — so it can judge new cases rather than pattern-match from examples.

**3. Shared Namespace Across Code and Documentation**

The manual and codebase share a namespace: component names, CSS token identifiers, and section IDs are consistent across both artifacts. The manual doesn't describe the code from the outside — it's structurally coupled to it. A reference in the manual to `--blue-primary` maps directly to a CSS custom property in `design-tokens.css`. A section named "The Gap" in the manual corresponds to the same ID in the HTML. This coupling means the AI can navigate from a rule to its implementation without translation.

**4. Component Derivation Protocol**

Rather than a closed catalogue of components, the system includes an explicit derivation method: a five-step IF/THEN chain for building components that don't yet exist. An AI that encounters an unsupported situation doesn't default to generic web patterns — it derives a solution that could have come from the same designer. This turns a static reference document into a generative system.

### Market Context & Competitive Landscape

Existing tools occupy two separate positions: design systems (Figma, Storybook, Style Dictionary) built for human designers, and AI coding assistants (Cursor, GitHub Copilot, Claude Code) that operate without brand awareness. This manual occupies the gap between them — a design system that speaks to AI agents as its primary audience. No standard tooling exists for this use case; the approach is constructed from first principles.

### Validation Approach

The primary validation test is qualitative but explicit: **the "Same Designer" test** — does new AI-generated content read as continuous with the original, or does it read as an addition? This test is applied holistically, not as a checklist. Secondary validation: the Component Derivation Protocol produces a component that passes the test on first attempt without manual correction.

### Risk Mitigation

| Risk | Mitigation |
|---|---|
| Manual becomes stale as site grows | Living Manual Protocol: every new component documented before session ends |
| AI skims rather than reads the full manual | Length constraint (~480 lines) fits one context window; Part 2 Quick Reference enables fast scan for Build Mode |
| Founder doesn't know how to activate the manual | Founder Onboarding section (plain language, 3-step activation guide) is Part 1 of the document |
| AI introduces colours or patterns outside the system | Anti-list (12 named rules) and Palette Closure Rule are hard constraints in the manual |

## Web App Specific Requirements

### Project-Type Overview

Static multi-page website (MPA) — 4 HTML pages, no client-side routing framework, no server-side rendering. Built with HTML, Tailwind CSS, and JavaScript with animation libraries. Hosted as a static site via GitHub. All dynamic behaviour (contact form, session-aware animation, floating light elements) is handled through JS and third-party services, not application state.

### Browser Matrix

| Browser | Support Target |
|---|---|
| Chrome | Last 2 major versions |
| Firefox | Last 2 major versions |
| Safari | Last 2 major versions + Safari 15+ (older iOS) |
| Edge | Last 2 major versions |
| IE11 | Not supported |

### Responsive Design

- **Approach:** Mobile-first — base styles target mobile, enhanced progressively for larger viewports
- **Breakpoints:** Standard Tailwind breakpoints (sm / md / lg / xl) unless design system dictates custom values
- **Whitespace floor:** The calm/clean feeling of the brand must be preserved at all screen sizes — whitespace compresses but is never eliminated
- **SVG diagram:** Water treatment cycle diagram must be legible at mobile sizes; may require layout adjustment, not just scaling
- **Side navigation:** Desktop-only component — hidden on mobile, replaced by top anchor navigation
- **Data visualisations (future):** Flagged for mobile-specific redesign, not scaling

### Performance Targets

- **Intro animation:** Renders on first paint — no pre-loader. Animation asset must be lightweight enough to begin immediately on a standard connection.
- **Core Web Vitals:** LCP (Largest Contentful Paint) ≤ 2.5s on a standard connection — aligns with Google's "good" threshold and benefits SEO
- **General:** Performance is not a primary concern for this project phase; no specific bundle size or time-to-interactive targets beyond the above

### SEO Strategy

- Unique `<title>` and `<meta name="description">` on each of the 4 pages
- Open Graph tags (`og:title`, `og:description`, `og:image`) on all pages
- Semantic heading hierarchy (`h1` → `h2` → `h3`) — one `h1` per page
- Crawlable internal link structure across all pages
- `alt` text on all images and meaningful SVGs
- No JavaScript-dependent content critical for SEO (static HTML renders the full page)

### Accessibility Level

- **Target:** WCAG 2.1 AA
- Semantic HTML throughout (`nav`, `main`, `section`, `article`, `header`, `footer`)
- Keyboard navigation on all interactive elements (navigation, form, CTAs, side nav)
- Focus indicators visible and on-brand
- `alt` text on all images; decorative images marked `aria-hidden`
- Form fields: `<label>` elements associated with all inputs
- ARIA roles/labels where semantic HTML alone is insufficient

### Implementation Considerations

- **JavaScript libraries:** Animation libraries required — library selection deferred to build phase, determined from Figma source and animation requirements before coding begins. Existing `logo-animation.html` test file uses GSAP as a reference starting point.
- **Floating light component:** Persistent animated background element (glowing blue vertical light beams, per Figma design) — Light material language expression on the landing page. Implemented via JS animation library; counts as a designed asset and must not be approximated or substituted.
- **Session-aware animation** — uses `sessionStorage` to suppress replay on reload
- **Contact form** — HTML form posting to Formspree endpoint; endpoint URL stored as a configurable value (easy for founder to swap service)
- **Design tokens** — CSS custom properties defined in `design-tokens.css`, imported globally; Tailwind config extended to reference token values where possible, avoiding duplication
- **File structure** — consistent, predictable naming so AI agents can navigate the codebase without a map

## Functional Requirements

### Page Navigation & Structure

- **FR1:** The top navigation bar includes standard navigation links and a prominently styled Contact CTA button linking to the Contact page
- **FR2:** Visitors can jump to any of the 6 landing page sections via a sticky side navigation
- **FR3:** Visitors can reveal section labels by hovering over the side navigation items
- **FR4:** All pages display a consistent footer with navigation columns and social links
- **FR5:** Visitors can access all site content and functionality on mobile and tablet devices

### Landing Page Experience

- **FR6:** Visitors are presented with an intro animation when first loading the landing page
- **FR7:** Visitors can dismiss the intro animation by clicking or tapping at any point during playback
- **FR8:** Returning visitors within the same browser session are taken directly to the hero section without the animation replaying
- **FR9:** Visitors can scroll through 6 narrative sections in sequence: intro animation, hero, the gap, where Vasuqi fits, what it's built to change, how it works
- **FR10:** Visitors can view the water treatment cycle SVG diagram showing where Vasuqi sits in the treatment process
- **FR11:** Visitors experience a persistent animated background light element throughout the landing page

### Animation & Motion

- **FR12:** The intro animation communicates the core value proposition and completes within approximately 3–5 seconds
- **FR13:** All page animations follow water-physics motion principles (slow, continuous, non-linear, no sudden movements)
- **FR14:** Interactive elements provide hover-state feedback
- **FR15:** The background animation runs continuously without interrupting page interaction or navigation

### Supporting Pages

- **FR16:** Visitors can access a News & Documentation page listing news items and documentation categories
- **FR17:** Visitors can download the pitch deck PDF from the News & Documentation page
- **FR18:** Visitors can view news items under structured categories (company announcements, press, media coverage)
- **FR19:** Visitors can view documentation under structured categories (case studies, guidelines, manuals, brochures, data sheets, marketing packs, videos, webinars)
- **FR20:** Visitors can access an About Us page presenting the founding team with roles, bios, and professional profiles
- **FR21:** Visitors can follow external profile links for each team member from the About Us page
- **FR22:** Visitors can access a Contact page with both a contact form and general enquiry information
- **FR23:** ~~Visitors can read a brand mythology section on the Contact page~~ — REMOVED. The mythology / origin-of-name content belongs on the About Us page ("Why vāsuqi?" section), not the Contact page. This requirement was mis-assigned at authoring time.

### Conversion & Engagement

- **FR24:** Visitors can submit a contact enquiry via a form with 5 fields: Name (required), Email address (required), Company name + Job title (optional, side-by-side on one row), Phone number (optional), Message (optional). The original 7-field spec is overridden — fewer fields reduce friction for time-pressured investors.
- **FR25:** Contact form submissions are delivered to a configurable third-party form service accessible by the founder
- **FR26:** Visitors can view general enquiry contact information on the Contact page (email, phone, address, social links)

### Product Visualization

- **FR27:** Visitors can view a rendered product visualization in the "How it Works" section — distinct from the blueprint SVG line-art style used for icons
- **FR28:** The product visualization responds to hover with a light expansion effect (CSS animation)
- **FR29:** Cards in the "How it Works" section display ambient light motion behind them, following Light material language physics

### Accessibility & SEO

- **FR30:** All interactive elements are operable by keyboard without a mouse
- **FR31:** All images and meaningful SVGs have descriptive alternative text
- **FR32:** All form fields are associated with visible labels
- **FR33:** All pages have unique titles and descriptions for search engines
- **FR34:** All pages have social sharing metadata (Open Graph)
- **FR35:** All page content is available to search engine crawlers without JavaScript execution

### Design System & Handoff

- **FR36:** Developers and AI agents can access all colour values, typography scale, and spacing as CSS custom properties in a dedicated tokens file
- **FR37:** The design manual provides task-based guidance covering: adding a new section, writing copy, creating a new component, and adding media
- **FR38:** The design manual provides a decision protocol for deriving new components not covered by existing patterns
- **FR39:** The design manual documents four material languages (Water, Glass, Blueprint, Light) as the conceptual reasoning layer for all visual and motion decisions — Light governs luminous and ambient elements, is behaviorally governed by Water physics, and is visually expressed through Glass; Water and Light are treated as interrelated systems
- **FR40:** The design manual identifies elements that require human review rather than AI derivation
- **FR41:** The founder can activate the design manual as AI context using a plain-language onboarding section with step-by-step instructions
- **FR42:** New components created through AI-assisted development can be documented in a living section of the design manual
- **FR43:** The design manual includes a dedicated anti-list section containing at minimum 12 explicit "never do this" rules — covering colour palette violations (pure black, pure white, out-of-palette colours), dark mode, AI-default gradients, generic card components, navigation over-structuring, and motion patterns that conflict with water physics
- **FR44:** The design manual declares a North Star Rule as the primary override clause — a single authoritative statement that any new addition must fit the brand identity, visual identity, and tone of voice — applied whenever no specific rule addresses the situation
- **FR45:** The design manual documents evolution triggers: named product milestones (not dates) defining when the design system should be intentionally updated — including introduction of real product photography (trigger: working prototype exists), retirement of the blueprint aesthetic, and shift from investor to B2B operator tone (trigger: pilot program launch)

### Content Maintenance (Founder)

- **FR46:** The founder can add news items to the News & Documentation page while preserving the existing layout and visual identity
- **FR47:** The founder can add documentation entries to existing categories while preserving the existing layout
- **FR48:** The founder can update team information on the About Us page
- **FR49:** The founder can reconfigure the contact form service endpoint without modifying core page structure

## Non-Functional Requirements

### Performance

- Intro animation renders on first paint — no pre-loader or loading screen before animation begins
- Largest Contentful Paint (LCP) ≤ 2.5 seconds on a standard connection (Google "good" threshold)
- All animation assets must be lightweight enough not to block initial page render

### Accessibility

- WCAG 2.1 AA compliance across all pages
- All colour/background combinations meet AA contrast ratios (minimum 4.5:1 for body text, 3:1 for large text and UI components)
- All interactive elements reachable and operable via keyboard
- Focus states visible and styled on-brand
- No time-limited interactions that cannot be extended or dismissed

### Security

- Site served over HTTPS
- No personal data stored client-side or server-side by the codebase — contact form data handled entirely by the third-party form service
- No sensitive credentials hardcoded in source files — form service endpoint configurable via a clearly labelled variable

### Compatibility

- Last 2 major versions of Chrome, Firefox, Safari, and Edge
- Safari 15+ for older iOS device coverage
- All viewport widths from 320px (small mobile) to 1440px+ (wide desktop)
- Full functionality without browser plugins or extensions

### Maintainability

- Design manual fits within a single LLM context window (~480 lines maximum)
- All design values (colours, type scale, spacing) expressed as CSS custom properties — no magic numbers in stylesheets
- New components derived via the Component Derivation Protocol must pass the "Same Designer" test on first AI-assisted attempt
- File and component naming follows consistent, predictable conventions navigable by an AI agent without a separate map
- JS animation library selection documented in the design manual before the manual is considered complete

## Project Scoping

### Strategy & Philosophy

**Approach:** Single release — complete website and design manual delivered together as one exam submission. No phased delivery; all MVP scope ships as a unit.

**Delivery context:** Solo student project (Edda) using AI coding tools. Exam deadline is the hard constraint.

**Priorities within the release:**
1. Core landing page with all 6 sections — the primary investor-facing deliverable
2. Design manual + design tokens — the handoff deliverable
3. Supporting pages (News & Documentation, About Us, Contact)
4. Mobile-first responsive implementation across all pages

### Complete Feature Set

**Core User Journeys Supported:**
- Journey 1: Investment Director — full narrative scroll, pitch deck download
- Journey 2: Time-pressured Angel — side navigation fast-path, mobile contact form
- Journey 3: Founder + AI Agent — design manual activation, AI-assisted content addition

**Must-Have Capabilities:**
- Intro animation (JS animation library TBD at build phase, first-paint, session-aware, skippable)
- Floating light background component (Light material language, JS animation library TBD)
- Full landing page: 6 sections + sticky side navigation + top nav with Contact CTA
- SVG water treatment cycle diagram (from Figma assets)
- Product visualization with light hover effect in "How it Works"
- News & Documentation page with pitch deck PDF download
- About Us page: team grid, 4 members
- Contact page: 5-field form + Formspree integration + general enquiries block
- Shared footer across all pages
- Mobile-first responsive implementation
- WCAG AA accessibility throughout
- SEO / metadata on all pages
- Design manual (`docs/design-manual.md`, ~480 lines) including anti-list, North Star Rule, evolution triggers
- Design tokens (`design-tokens.css`)
- Live deployment via GitHub

**Nice-to-Have (ship if time allows, not blocking):**
- Entrance animation sequence (text builds → resolution line → logo animates in) — adds polish but does not affect core investor experience if simplified
- Hover micro-interactions beyond core states — desirable but secondary to structural completion

### Risk Mitigation Strategy

**Technical Risks:**

| Risk | Likelihood | Mitigation |
|---|---|---|
| Animation library selection (intro, floating light, hover interactions) | Medium | Library selection deferred to build phase — determined from Figma source and animation requirements before coding begins |
| SVG diagram mobile layout | Medium | Treat as a flagged component — design a specific mobile layout before coding, not after |
| Glassmorphism cross-browser consistency (especially Safari blur) | Medium | Test in Safari early; use `-webkit-backdrop-filter` alongside standard property |
| Animation library choices affecting design manual accuracy | Low | Finalise library stack before writing manual sections that reference implementation |

**Resource Risks:**

Single deliverer with a fixed deadline — if scope is under pressure, the nice-to-have micro-interactions are the first thing to cut. The core investor experience and the design manual are non-negotiable for the submission.
