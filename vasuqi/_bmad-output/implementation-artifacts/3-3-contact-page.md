# Story 3.3: Contact Page

Status: done

## Story

As an investor ready to make contact,
I want a form that collects my details and gives me clear confirmation it worked — and an immediately visible alternative if it doesn't,
so that I can always reach Vasuqi regardless of network or firewall conditions.

## Acceptance Criteria

**AC1 — Brand mythology section (FR23):**
Given `contact.html`
When the page loads
Then a brand mythology section is present before the form, explaining the origin of the name Vasuqi and its connection to Vasuki, the Hindu serpent king who churned the cosmic ocean — rendered in Syne `<h1>` heading and Manrope body copy at correct token scales

**AC2 — Contact form: 3 fields, labelled (FR24, FR32):**
Given the contact form
When inspected
Then it contains exactly 3 fields: first name (`type="text"`), email (`type="email"`), and message (`<textarea>`); each field has an associated `<label>` element with a matching `for`/`id` pair; all fields have the `required` attribute; there are NO additional fields (no last name, phone, company, job title — Figma's 7-field form is intentionally overridden by spec)

**AC3 — Formspree submission via JS intercept (FR25):**
Given the contact form
When the visitor submits it
Then `src/contact.js` intercepts the submit event (`e.preventDefault()`), POSTs to `FORMSPREE_ENDPOINT` imported from `src/config.js` using `fetch` with `{ Accept: 'application/json' }` header, and calls `showFormState('success')` or `showFormState('error')` based on the response — native HTML POST is never used

**AC4 — Success state: pre-existing HTML element (FR25, UX-DR6):**
Given a successful form submission (Formspree returns 2xx)
When `showFormState('success')` is called
Then a pre-existing success message element (already in the HTML, NOT JS-injected) becomes visible; the message is human in tone and confirms the submission; the form fields are NOT cleared (submitted data preserved for user reference)

**AC5 — Error state: pre-existing HTML element with direct alternative (FR25, UX-DR6):**
Given a failed form submission (network error or non-2xx response)
When `showFormState('error')` is called
Then a pre-existing error message element (already in the HTML, NOT JS-injected) becomes visible; the message is clear and non-alarming; it directs the visitor to the general enquiries contact information (email) as an alternative; silent failure is not acceptable

**AC6 — Submit-only validation (UX-DR5):**
Given the visitor filling in fields
When they blur out of a field without completing it
Then NO inline validation fires; validation occurs on submit only; browser native `required`-field validation is acceptable

**AC7 — General enquiries block visible without scrolling (FR26, UX-DR6):**
Given the general enquiries block (email address, phone number, social links)
When the contact page renders at any viewport width
Then the block is positioned so a visitor whose form submission fails sees an alternative immediately — it must not require scrolling past the form to find it; on mobile the block appears above or alongside the form

**AC8 — Formspree endpoint isolation (FR49, NFR11):**
Given `src/config.js`
When the founder needs to swap the Formspree endpoint
Then changing `FORMSPREE_ENDPOINT` in `src/config.js` is the ONLY required change — no modification to `contact.html` or `src/contact.js` logic is needed

**AC9 — No client-side data storage (NFR10):**
Given the contact form
When inspected
Then no form data is stored in `localStorage`, `sessionStorage`, cookies, or any other client-side mechanism — data flows directly to Formspree and is not retained by the site

**AC10 — Active nav state:**
Given the `page-contact` body class on `contact.html`
When the nav renders
Then the Contact button in the nav receives an active indicator — already wired in `main.css` via `.page-contact nav a[href="/contact.html"]` outline rule; do NOT add any additional active state logic

**AC11 — Keyboard accessibility (FR30, NFR6, NFR7, UX-DR11):**
Given all interactive elements on the page (nav links, form fields, submit button, general enquiries links)
When navigated via keyboard Tab
Then each element receives focus in logical order; visible focus rings in `--blue-primary` are displayed via `focus-visible:outline`; no interactive element is keyboard-unreachable; form field focus is clearly visible on-brand

**AC12 — Scroll entrance animations:**
Given the brand mythology section, contact form section, and general enquiries section
When each scrolls into view
Then elements animate in via GSAP ScrollTrigger using `WATER_EASE`, `WATER_DURATION.default`, `WATER_STAGGER` from `src/animations/constants.js`; `once: true` on each ScrollTrigger instance; animation init inside the existing `DOMContentLoaded` listener in `src/contact.js`

## Tasks / Subtasks

- [x] Build complete `contact.html` page content (AC: 1, 2, 4, 5, 7, 9, 10, 11)
  - [x] Replace stub `<h1>Contact</h1>` + comment inside `<main id="main-content">` with full page structure
  - [x] Add brand mythology section with `id="section-mythology"`: `<h1>` in Syne + Manrope body paragraphs explaining Vasuki origin story
  - [x] Add general enquiries block `id="section-enquiries"` containing: email address, phone number, and social links (positioned to be visible alongside/above the form — not below it)
  - [x] Add contact form section with `id="section-form"`: `<form id="contact-form">` containing exactly 3 fields (first name, email, message) with `<label>` + `<input>`/`<textarea>` pairs and `required` attribute
  - [x] Add success message element `id="form-success"` — pre-existing in HTML, hidden by default (`hidden` attribute or `display: none` via class), shown by `showFormState('success')`
  - [x] Add error message element `id="form-error"` — pre-existing in HTML, hidden by default, shown by `showFormState('error')`; error message text must include a direct email address as fallback alternative
  - [x] Submit button: minimum 44×44px touch target, `--blue-primary` background, `--white-brand` text, pill shape (consistent with Contact CTA nav button)

- [x] Implement `src/contact.js` form handler and scroll animations (AC: 3, 4, 5, 6, 8, 12)
  - [x] Import `FORMSPREE_ENDPOINT` from `'./config.js'`
  - [x] Import GSAP, ScrollTrigger, and animation constants
  - [x] Inside existing `DOMContentLoaded` listener: wire `#contact-form` submit event listener
  - [x] Implement `showFormState(state)` function: hides both `#form-success` and `#form-error`, then shows the matching one by removing `hidden` or toggling a visibility class
  - [x] Implement `handleFormSubmit(e)`: `e.preventDefault()`, build `FormData`, `fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })`, call `showFormState` on result; wrap in try/catch for network errors
  - [x] Wire GSAP ScrollTrigger scroll entrance animations for mythology section, form section, and enquiries block (all with `once: true`)
  - [x] Do NOT create a second `DOMContentLoaded` listener — add all code inside the one already in `contact.js`

- [x] Add CSS for contact page components to `src/styles/main.css` `@layer components` (AC: 7, 11)
  - [x] Add CSS block comment: `/* ── Contact page (Story 3.3) ──────────────────────────────────── */`
  - [x] `.contact-layout` — two-column grid wrapper: `display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl);` on desktop (≥768px); single column on mobile with enquiries block first (use `order: -1` on `.contact-enquiries` or HTML source order); wraps `#section-form` and `#section-enquiries`
  - [x] `.contact-enquiries` — enquiries block: `--navy-deep` text, Manrope body copy; links (`href="mailto:"`, `href="tel:"`) styled with `--blue-primary` and `focus-visible` outline; NOT a Glass card — plain section, no background panel
  - [x] `.contact-form` — Glass material language: subtle border `--ice-near`, background `--white-brand`, no heavy drop-shadow
  - [x] `.contact-form label` — Manrope, `--navy-deep`, correct spacing
  - [x] `.contact-form input, .contact-form textarea` — full-width on mobile, `--ice-near` border, `--navy-deep` text, focus-visible ring in `--blue-primary`
  - [x] `.contact-submit` — pill shape, `--blue-primary` background, `--white-brand` text, min 44×44px, water physics hover transition
  - [x] `.form-feedback` — shared base class for success/error elements
  - [x] `.form-feedback--success` — `--blue-primary` or `--cyan-light` accent
  - [x] `.form-feedback--error` — `--steel` accent (NOT red — palette is closed; no hex values outside the 10-token palette)
  - [x] Focus rings: `input:focus-visible, textarea:focus-visible { outline: 2px solid var(--blue-primary); outline-offset: 2px; }`
  - [x] Append AFTER the `/* ── About Us page (Story 3.2) */` block — NEVER overwrite existing blocks

- [x] Verify `npm run build` passes with zero errors after all changes

## Dev Notes

### CRITICAL: Existing Files to READ Before Modifying

**`contact.html`** (current stub state):
- Has correct `<head>` with SEO, Open Graph, Google Fonts, and CSS link — DO NOT MODIFY `<head>`
- Body class is `page-contact` — already triggers active Contact nav state in `main.css` (`.page-contact nav a[href="/contact.html"]`) — DO NOT change the body class
- Has `<!--@include "partials/nav.html"-->` and `<!--@include "partials/footer.html"-->` — DO NOT change these
- `<main id="main-content">` already exists — all new content goes inside here
- Script tag `<script type="module" src="/src/contact.js">` already present — DO NOT duplicate

**`src/contact.js`** (current stub state):
- Has only `document.addEventListener('DOMContentLoaded', () => { /* comment */ })`
- Add ALL form handler code and GSAP init INSIDE this existing listener
- Do NOT create a second `addEventListener('DOMContentLoaded', ...)` block

**`src/config.js`** (exists, correct):
- Already exports `export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'`
- DO NOT modify — the placeholder value is intentional for the founder to fill in
- Import pattern in `contact.js`: `import { FORMSPREE_ENDPOINT } from './config.js'`

**`src/styles/main.css`** (current state):
- Append new CSS block at END of `@layer components`, after the `/* ── About Us page (Story 3.2) */` block
- Exact comment format to follow: `/* ── Contact page (Story 3.3) ──────────────────────────────────── */`
- NEVER overwrite existing CSS blocks — only APPEND

### Form Submission Handler Pattern (Architecture Spec)

This is the exact pattern from the architecture doc — do not deviate:

```js
import { FORMSPREE_ENDPOINT } from './config.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WATER_DURATION, WATER_EASE, WATER_STAGGER } from './animations/constants.js'
gsap.registerPlugin(ScrollTrigger)

function showFormState(state) {
  document.getElementById('form-success').hidden = true
  document.getElementById('form-error').hidden = true
  if (state === 'success') {
    document.getElementById('form-success').hidden = false
  } else {
    document.getElementById('form-error').hidden = false
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form')
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const data = new FormData(e.target)
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        })
        showFormState(res.ok ? 'success' : 'error')
      } catch {
        showFormState('error')
      }
    })
  }

  // Scroll entrance animations
  gsap.from('#section-mythology .section-heading', { ... })
  // etc.
})
```

### Pre-Existing Feedback Element Pattern (Non-Negotiable)

Both feedback elements MUST exist in the HTML from the start — they are toggled by JS, never injected:

```html
<!-- Success message — hidden by default -->
<div id="form-success" hidden class="form-feedback form-feedback--success">
  <p>Your message has been sent. We'll be in touch soon.</p>
</div>

<!-- Error message — hidden by default; must include direct email alternative -->
<div id="form-error" hidden class="form-feedback form-feedback--error">
  <p>Something went wrong. Please try again, or reach us directly at
    <a href="mailto:hello@vasuqi.com">hello@vasuqi.com</a>.</p>
</div>
```

The `hidden` HTML attribute (`display: none` by default) is the toggle mechanism. `showFormState` sets `element.hidden = true/false`. Do NOT use `visibility: hidden` or CSS classes alone — the `hidden` attribute is the semantic approach.

### Form Field Specification

```html
<form id="contact-form" novalidate>
  <div class="contact-form__field">
    <label for="contact-firstname">First name</label>
    <input type="text" id="contact-firstname" name="firstname" required autocomplete="given-name">
  </div>
  <div class="contact-form__field">
    <label for="contact-email">Email address</label>
    <input type="email" id="contact-email" name="email" required autocomplete="email">
  </div>
  <div class="contact-form__field">
    <label for="contact-message">Message</label>
    <textarea id="contact-message" name="message" required rows="5"></textarea>
  </div>
  <button type="submit" class="contact-submit">Send message</button>
</form>
```

Use `novalidate` on the form to suppress browser default validation UI — the `required` attributes remain valid for semantic purposes, and the JS handler provides explicit feedback. This gives full control over the error state display (AC6, UX-DR5).

**Note on validation approach:** The `novalidate` attribute prevents browser default validation popups. The `required` attributes stay for semantics/accessibility. JS submit handler validates after `e.preventDefault()` and calls `showFormState('error')` if fields are empty. This is the correct low-friction approach per UX-DR5.

### GSAP Import Pattern (Project-Wide Standard)

```js
import { gsap } from 'gsap'                         // NOT 'gsap/dist/'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WATER_DURATION, WATER_EASE, WATER_STAGGER } from './animations/constants.js'
gsap.registerPlugin(ScrollTrigger)
```

Constants actual values (do NOT redefine — import only):
- `WATER_DURATION.fast = 0.8`, `WATER_DURATION.default = 1.0`, `WATER_DURATION.slow = 1.2`
- `WATER_EASE = 'power1.inOut'`
- `WATER_STAGGER = 0.12`

### GSAP ScrollTrigger: `once: true` is Mandatory

Every ScrollTrigger instance MUST use `once: true`. Consistent with all previous stories.

```js
gsap.from('#section-mythology .section-heading', {
  y: 30, opacity: 0,
  duration: WATER_DURATION.default,
  ease: WATER_EASE,
  scrollTrigger: {
    id: 'section-mythology-heading',
    trigger: '#section-mythology',
    start: 'top 75%',
    once: true
  }
})
gsap.from('#section-form', {
  y: 20, opacity: 0,
  duration: WATER_DURATION.default,
  ease: WATER_EASE,
  scrollTrigger: {
    id: 'section-form-enter',
    trigger: '#section-form',
    start: 'top 75%',
    once: true
  }
})
```

### HTML Section IDs (Contact Page)

Use consistent kebab-case IDs for GSAP ScrollTrigger targets:
- `id="section-mythology"` — brand mythology / name origin section
- `id="section-form"` — contact form section
- `id="section-enquiries"` — general enquiries block
- `id="contact-form"` — the `<form>` element itself (targeted by JS)
- `id="form-success"` — success feedback element (targeted by JS)
- `id="form-error"` — error feedback element (targeted by JS)

### Material Language: Contact Page Uses Glass

The contact form and mythology section use **Glass material language** — the same as nav, About Us team cards, and overlays. Glass = `--white-brand` or `--ice-near` background, subtle `backdrop-filter` blur if layered (with `-webkit-backdrop-filter` for Safari), `--ice-near` border, no heavy drop-shadows.

Do NOT use Blueprint (technical linework, grid aesthetic) for the contact form — Blueprint is for News & Docs page (download cards, carousel). Contact is the emotional final step in the investor journey; Glass is the correct register.

### Typography on Contact Page

- `<h1>` brand mythology heading — Syne, auto-styled via `@layer base h1` in `main.css`
- `<h2>` section headings ("Get in touch", "General Enquiries") — Syne, auto-styled via `@layer base h2`
- Body copy — Manrope, `--navy-deep`, `var(--text-body-size)` / `var(--text-body-weight)`
- Labels — Manrope, `--navy-deep`, slightly heavier weight (500) for readability on form
- Submit button — Manrope, `--white-brand`, consistent with Contact CTA nav button
- Do NOT use `font-weight: 200` — only weights 200;400;500;600 are loaded, and 200 falls back to 400 at render

### Active Nav State Already Handled

The `page-contact` body class already triggers this rule in `main.css`:
```css
.page-contact nav a[href="/contact.html"] {
  outline: 2px solid var(--white-brand);
  outline-offset: 2px;
}
```
(Contact is a filled blue CTA button in the nav — outline is the active indicator, not underline.)
Do NOT add any additional active state logic.

### Palette Closure — No Red for Error State

The 10-token palette is closed. There is no red token. The error state MUST use existing tokens:
- Use `--steel` (`#5C6B85`) for the error message border/accent — reads as "warning" without red
- Use `--navy-deep` for error text — high contrast, calm
- Do NOT add any `--error-red` or similar token to `design-tokens.css`
- Do NOT use inline `color: red` or `color: #ff0000` in any file

### CSS Pattern: No Raw Hex Values

Never reference hex values directly. All token names from `design-tokens.css`:
- Background: `var(--white-brand)`, `var(--ice-near)`
- Text: `var(--navy-deep)`, `var(--steel)`, `var(--blue-primary)`
- Borders: `var(--ice-near)`, `var(--steel)`, `var(--blue-primary)` (on focus/hover)
- Use fallback form `var(--water-ease, ease-in-out)` for CSS transitions

### General Enquiries Block Positioning (AC7)

The layout MUST ensure the general enquiries block (email, phone, social) is visible to a visitor who just saw a failed form submission. This means on desktop: a two-column layout with form on the left and enquiries block on the right. On mobile: enquiries block ABOVE the form section, or immediately after the mythology section but before the form.

Never place the general enquiries block below the form — on narrow viewports, a visitor who sees an error message must not need to scroll down further to find the alternative.

**HTML structure for the two-column zone:**

```html
<div class="contact-layout">
  <section id="section-enquiries" class="contact-enquiries">
    <h2>General Enquiries</h2>
    <p><a href="mailto:hello@vasuqi.com">hello@vasuqi.com</a></p>
    <p><a href="tel:+4500000000">+45 00 00 00 00</a></p>
    <!-- Social links matching footer pattern -->
    <a href="https://www.linkedin.com/company/vasuqi" target="_blank" rel="noopener noreferrer" aria-label="Vasuqi on LinkedIn">LinkedIn</a>
    <a href="https://x.com/vasuqi" target="_blank" rel="noopener noreferrer" aria-label="Vasuqi on X">X</a>
  </section>
  <section id="section-form">
    <!-- form and feedback elements here -->
  </section>
</div>
```

**Contact data to use (use placeholders where real values are unknown):**
- Email: `hello@vasuqi.com` — also used in `#form-error` fallback link (confirmed in story AC5 pattern)
- Phone: `+45 00 00 00 00` — placeholder; founder replaces with real number
- LinkedIn: `https://www.linkedin.com/company/vasuqi` (matches footer.html)
- X: `https://x.com/vasuqi` (matches footer.html)
- Social link icons: use visible text labels ("LinkedIn", "X") — NOT icon-only, for accessibility

### Skip-to-Content Already Handled

The skip-to-content link was added to `partials/nav.html` in Story 2.6. The `<main id="main-content">` target already exists in `contact.html`. No additional implementation needed.

### vite.config.js Already Configured

`contact.html` is already registered in `rollupOptions.input`. DO NOT modify `vite.config.js`.

### sessionStorage — Only One Use in the Project

The only `sessionStorage` use in this project is the intro animation replay suppression key in `src/animations/intro.js`. The contact form MUST NOT use `sessionStorage` for any purpose (NFR10 — no client-side data retention of personal data).

### Brand Mythology Copy

The mythology section explains the origin of the Vasuqi name. The Hindu serpent Vasuki churned the cosmic ocean (Samudra Manthan) — toxins were drawn out and purified. This mirrors Vasuqi's technology: extracting the last 5% of contaminants that conventional treatment misses. The copy should:
- Open with the `<h1>` in Syne — a phrase like "The name Vasuqi" or "vāsuqi — where the name begins"
- Body paragraphs in Manrope: explain Vasuki, the cosmic churning, the parallel to water purification
- Keep it to 2–3 paragraphs — credible depth, not a mythology lecture

### What Must NOT Break

- `npm run build` passes with zero errors
- All 4 HTML pages resolve via `npm run dev`
- `partials/nav.html` and `partials/footer.html` — DO NOT modify
- `index.html`, `news-documentation.html`, `about.html` — DO NOT modify
- `src/main.js`, `src/news.js`, `src/about.js` — DO NOT modify
- `src/styles/main.css` existing rules — only APPEND, never overwrite existing blocks
- `design-tokens.css` — DO NOT modify (no new tokens)
- `src/config.js` — DO NOT modify (FORMSPREE_ENDPOINT placeholder stays as-is)
- Active nav state for `page-contact` already works — DO NOT change the CSS selector

### Do NOT Implement in This Story

- Story 3.4 (Accessibility sweep) work — that story runs a cross-page accessibility audit
- `prefers-reduced-motion` guards — deliberate project-wide decision; animations run unconditionally
- Any new `--` CSS custom property tokens not in `design-tokens.css`
- Server-side validation, CMS, or dynamic data — static HTML only
- reCAPTCHA or spam protection — Formspree's built-in spam filter is sufficient at this stage
- Map embeds or additional contact UI beyond what ACs specify

### Build Verification Checklist

After implementation:
1. `npm run build` — zero errors, all 4 pages bundle correctly
2. `npm run dev` — open `contact.html`
3. Brand mythology section visible with `<h1>` in Syne ✓
4. Contact form has exactly 3 fields (first name, email, message) with labels ✓
5. General enquiries block visible (not hidden below form) ✓
6. Submit form → check network tab → POST to Formspree endpoint ✓
7. `showFormState('success')` — success element becomes visible ✓
8. `showFormState('error')` — error element shows with email alternative ✓
9. Form fields retain data after submission (not cleared) ✓
10. Tab through page — all interactive elements receive visible focus rings in `--blue-primary` ✓
11. GSAP scroll animations fire for mythology, form, and enquiries sections ✓
12. "Contact" nav button shows active outline indicator ✓
13. No horizontal overflow at 320px viewport ✓
14. No `sessionStorage` or `localStorage` writes in `contact.js` ✓

### References

- FR22 (Contact page), FR23 (brand mythology section), FR24 (3-field contact form), FR25 (Formspree integration), FR26 (general enquiries block), FR49 (endpoint configurable via `src/config.js`)
- NFR10 (no client-side personal data storage), NFR11 (no hardcoded credentials)
- UX-DR5 (submit-only validation, no inline blur validation), UX-DR6 (explicit success + error states; error must show direct email alternative; general enquiries visible without scrolling past form)
- NFR6 (keyboard operability), NFR7 (focus states), NFR13 (responsive 320px+)
- UX-DR11 (focus rings in `--blue-primary`), UX-DR12 (44×44px touch targets), UX-DR14 (lazy loading below fold)
- Architecture: `src/config.js` for `FORMSPREE_ENDPOINT`, Glass material language for contact form, `once: true` ScrollTrigger, GSAP import from `'gsap'` not `'gsap/dist/'`, no new CSS tokens, no `sessionStorage` except intro animation
- Design tokens: `design-tokens.css` — all token names; `src/animations/constants.js` — `WATER_DURATION`, `WATER_EASE`, `WATER_STAGGER`
- Previous story patterns: `src/about.js` (ScrollTrigger + GSAP import pattern, DOMContentLoaded structure), `src/styles/main.css` (CSS block structure and comment format after Story 3.2 block)
- Story 3.2 review finding: active nav state driven by body class + CSS, not JS — same pattern applies here for `page-contact`

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None — clean implementation with no errors.

### Completion Notes List

- Replaced `contact.html` stub with full page structure: brand mythology section (AC1), two-column `contact-layout` wrapper, general enquiries block with email/phone/social (AC7), contact form with exactly 3 fields + labels + required attributes + novalidate (AC2, AC6), pre-existing `#form-success` and `#form-error` elements using the `hidden` HTML attribute (AC4, AC5).
- `src/contact.js` fully implemented: `showFormState()` toggles `hidden` attribute on feedback elements, async submit handler with `e.preventDefault()`, `FormData`, `fetch(FORMSPREE_ENDPOINT, { headers: { Accept: 'application/json' } })`, try/catch for network errors (AC3, AC5, AC8). GSAP ScrollTrigger animations added for mythology heading, mythology body paragraphs, form section, and enquiries block — all with `once: true` (AC12). All code inside the single existing `DOMContentLoaded` listener.
- CSS appended at end of `@layer components` block after the `/* ── About Us page (Story 3.2) */` section: `.contact-layout` responsive grid (single column mobile, two-column ≥768px), `.contact-enquiries` plain section (no Glass card), `.contact-form` Glass material language (white-brand bg, ice-near border), `.contact-form label/input/textarea` with focus-visible rings in `--blue-primary`, `.contact-submit` pill button min 44×44px with water-ease hover transition, `.form-feedback--success` (cyan-light accent), `.form-feedback--error` (steel accent — no red, palette is closed). Zero hex values.
- `npm run build` passes with zero errors, all 4 pages bundled correctly.
- Active nav state for Contact page handled entirely by existing CSS rule `.page-contact nav a[href="/contact.html"]` — no additional JS needed (AC10).
- No `sessionStorage`, `localStorage`, or cookie writes in `contact.js` (AC9).

### File List

- contact.html
- src/contact.js
- src/styles/main.css

### Review Findings

- [x] [Review][Patch] Undefined CSS space tokens — `--space-xl`, `--space-m`, `--space-s`, `--space-l` referenced in 13 declarations but never defined; replaced with defined tokens (`--space-section-y`, `--space-gap-md`, `--space-gap-sm`, `--space-gap-lg`, `--space-component`) from `design-tokens.css` [`src/styles/main.css:599–777`] — **fixed**
- [x] [Review][Patch] Missing required-field validation before Formspree POST — `novalidate` suppresses browser validation but JS handler submitted empty form; added trim-check for `firstname`, `email`, `message` fields before `fetch()` call, calls `showFormState('error')` on empty [`src/contact.js:24`] — **fixed**

## Change Log

- 2026-05-24: Implemented Story 3.3 — Contact Page. Added brand mythology section, general enquiries block, 3-field contact form with Formspree integration via fetch, pre-existing success/error feedback elements, Glass material CSS, GSAP ScrollTrigger scroll entrance animations, keyboard accessibility focus rings. Build passes with zero errors.
