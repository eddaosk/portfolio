# Story 5.7: Contact Page Fidelity

Status: done

## Story

As a prospective partner or investor completing the contact form,
I want the Contact page to present the correct three-zone layout with a founders photo panel, accurate contact details, a Google Maps embed, and minimal underline-only form fields,
so that reaching out to Vāsuqi feels effortless and the page communicates professional credibility.

## Acceptance Criteria

**AC1 — Mythology section removed from contact.html (CONTACT-MYTH-1):**
Given `contact.html`
When rendered
Then the `<section id="section-mythology">` block and all associated CSS (`.section-mythology`, `.mythology-body`) are removed; the mythology content belongs on the About Us page only

**AC2 — Full page layout is a three-zone composition (CONTACT-LAYOUT-1):**
Given `contact.html`
When rendered on desktop
Then the page uses a three-zone layout:
- Left zone (0–539px): founders photo panel, flush to left edge, `border-bottom-right-radius: 90px`, 838px tall
- Center zone: "Contact" h1 → general inquiries block → address block → LinkedIn badge, stacked vertically
- Right zone: invitation subtext at top, then form fields
Page background remains `--white-brand` (`#FAFCFF`)
On mobile: photo panel collapses or reduces; center and right zones stack vertically

**AC3 — Founders photo panel present (CONTACT-PHOTO-1):**
Given the left zone of the contact page
When rendered
Then a photo panel (`width: 539px`, `height: 838px`, `overflow: hidden`, `border-bottom-right-radius: 90px`) contains the founders photo; a dark `background-color: var(--navy-deep)` sits behind the `<img>` to produce a dark-corner effect at the upper-left where the photo doesn't fill the edge
Photo file: same founders photo used in News page hero — confirm filename before implementing

**AC4 — "Contact" h1 is present (CONTACT-HEADING-1):**
Given `contact.html` after removing the mythology section
When rendered
Then `<h1>Contact</h1>` appears at the top of the center zone, styled as `--text-h1` (Syne ExtraBold 55px), `--navy-deep`

**AC5 — Invitation text in right zone (CONTACT-SUBHEADING-1):**
Given the form (right) zone
When rendered
Then `<p>If you are an investor, researcher, operator, or simply curious about what we are building, reach out.</p>` appears at the top of the form column, Manrope Medium 16px, `--navy-deep`, max-width ~280px

**AC6 — Info section labels use Syne SemiBold 20px (CONTACT-INFO-STYLE-1):**
Given the general inquiries and connect-with-us labels
When rendered
Then "General inquiries", "Adresse", and "Connect with us" are rendered as `<p>` or `<span>` elements (not `<h2>`), Syne SemiBold 20px, `--steel`; content below each label is Manrope Medium 16px, `--navy-deep`

**AC7 — Correct contact details displayed (CONTACT-INFO-CONTENT-1):**
Given the general inquiries block
When rendered
Then email displays as `ara@vasuqi.eu` with `href="mailto:ara@vasuqi.eu"`, and phone displays as `+4553555514` with `href="tel:+4553555514"`; placeholder values are removed

**AC8 — Address block present (CONTACT-INFO-CONTENT-2):**
Given `contact.html`
When rendered
Then an address block appears below the general inquiries section: "Adresse" label (Syne SemiBold 20px, `--steel`), and "Ole Maaløes Vej 3 / 2200 Copenhagen, Denmark" (Manrope Medium 16px, `--navy-deep`)

**AC9 — Google Maps embed below address (CONTACT-MAP-1):**
Given the address block
When rendered
Then a responsive Google Maps `<iframe>` embed appears directly below the address, `width: 100%`, `height: ~220px`, `loading="lazy"`, `border: none`, for the address "Ole Maaløes Vej 3, 2200 Copenhagen, Denmark"

**AC10 — LinkedIn is a single icon badge, X removed, correct URL (CONTACT-SOCIAL-1):**
Given the "Connect with us" block
When rendered
Then a single LinkedIn SVG icon badge (~28px square) links to `https://www.linkedin.com/company/vasuqi/posts/` with `target="_blank" rel="noopener noreferrer"`; the X/Twitter link is removed entirely

**AC11 — Form card wrapper removed (CONTACT-FORM-STYLE-1):**
Given the contact form
When rendered
Then the form `div` has no `background`, no `border`, and no `border-radius`; fields sit directly on the `--white-brand` page background

**AC12 — Form inputs use underline-only styling (CONTACT-FORM-STYLE-2):**
Given each form input and textarea
When rendered
Then inputs have `border-bottom: 1px solid var(--navy-deep)` only — no top, left, or right borders; no `border-radius`; `background: var(--white-brand)` (`#FAFCFF`); placeholder text is Manrope Medium 16px, `var(--steel)` (`#5C6B85` — this is the correct palette token; do NOT use `#494949` which is not in design-tokens.css); `<label>` elements are visually hidden (`.sr-only`) with `placeholder` providing the visible hint

**AC13 — Form has 5 rows with the correct fields (CONTACT-FORM-FIELDS-1):**
Given the contact form
When rendered
Then the form contains exactly:
- Row 1: Name * (required, full width text input)
- Row 2: Email address * (required, full width email input)
- Row 3: Company name + Job title (optional, two inputs side-by-side on desktop, stacked on mobile)
- Row 4: Phone number (optional, full width tel input)
- Row 5: Message (optional, textarea)
The previous 3-field form (Name, Email, Message) is replaced

**AC14 — Mobile photo is full-width hero at top, not a left column (MOB-CONTACT-LAYOUT-1):**
Given `contact.html` on mobile viewport
When rendered
Then the founders photo spans full viewport width at the top of the page (no `border-bottom-right-radius`, full bleed); the three-zone desktop layout collapses to a single column: photo → Contact h1 + invitation text → form → general inquiries → address → map → LinkedIn

**AC15 — Form appears before general inquiries on mobile (MOB-CONTACT-LAYOUT-2):**
Given `contact.html` on mobile viewport
When rendered
Then the form section is visually first (below the photo), followed by the general inquiries / address / LinkedIn block below; achieve this via CSS `order` on the mobile layout rather than reordering HTML source (to preserve semantic/accessibility source order)

**AC16 — Submit button uses Syne font, correct style (CONTACT-SUBMIT-1):**
Given the submit button
When rendered
Then the button uses `font-family: var(--font-syne)`, `font-size: 20px`, `font-weight: 500`; `background: var(--blue-primary)` (`#0044FF`); `border-radius: 30px`; text label is "Send message" (not "Submit"); button is right-aligned on desktop; color is white

## Tasks / Subtasks

- [x] Remove mythology section (AC: 1)
  - [x] Delete `<section id="section-mythology">` and all child HTML from `contact.html`
  - [x] Delete `.section-mythology` and `.mythology-body` CSS rules from `src/styles/main.css`

- [x] Restructure page layout to three zones (AC: 2)
  - [x] Replace `.contact-layout` two-column grid with a three-zone flex/grid layout
  - [x] Desktop: `display: grid; grid-template-columns: 539px 1fr 1fr` (or similar)
  - [x] Mobile: `display: block` — zones stack vertically

- [x] Add founders photo panel (AC: 3)
  - [x] Add left zone `div.contact-photo-panel`: `width: 539px`, `height: 838px`, `overflow: hidden`, `border-bottom-right-radius: 90px`, `background: var(--navy-deep)`
  - [x] Inside: `<img>` of founders photo, `object-fit: cover`, `width: 100%`, `height: 100%`
  - [x] Confirm founders photo filename from News page hero implementation (Story 5.5)
  - [x] On mobile: hide or reduce panel height

- [x] Add "Contact" h1 (AC: 4)
  - [x] Add `<h1 class="contact-heading">Contact</h1>` at the top of the center zone
  - [x] Style as `--text-h1` token (Syne ExtraBold 55px), `color: var(--navy-deep)`

- [x] Add invitation text (AC: 5)
  - [x] Add `<p>If you are an investor, researcher, operator, or simply curious about what we are building, reach out.</p>` at the top of the form (right) zone
  - [x] Style: Manrope Medium 16px, `--navy-deep`, `max-width: 280px`

- [x] Fix info section labels (AC: 6)
  - [x] Change `<h2>General Enquiries</h2>` → `<p class="contact-info-label">General inquiries</p>`
  - [x] Add `<p class="contact-info-label">Adresse</p>` and `<p class="contact-info-label">Connect with us</p>`
  - [x] CSS for `.contact-info-label`: `font-family: var(--font-syne)`, `font-size: 20px`, `font-weight: 600`, `color: var(--steel)`

- [x] Update contact details (AC: 7)
  - [x] Replace `hello@vasuqi.com` with `ara@vasuqi.eu` (update both `href` and display text)
  - [x] Replace `+45 00 00 00 00` with `+4553555514` (update both `href` and display text)

- [x] Add address block (AC: 8)
  - [x] Add address section below general inquiries: "Adresse" label + "Ole Maaløes Vej 3 / 2200 Copenhagen, Denmark"

- [x] Add Google Maps embed (AC: 9)
  - [x] Add responsive `<iframe>` embed below address block
  - [x] Use Google Maps embed URL for "Ole Maaløes Vej 3, 2200 Copenhagen" — generate a standard static embed URL
  - [x] `width: 100%`, `height: 220px`, `loading="lazy"`, `border: 0`, wrap in `<div style="width:100%">` for responsive containment

- [x] Fix LinkedIn badge and remove X (AC: 10)
  - [x] Delete X/Twitter link from "Connect with us" section
  - [x] Replace LinkedIn text link with `<a href="https://www.linkedin.com/company/vasuqi/posts/" target="_blank" rel="noopener noreferrer">` wrapping a LinkedIn SVG icon (~28×28px)

- [x] Remove form card wrapper (AC: 11)
  - [x] Remove `background`, `border`, `border-radius` from `.contact-form` CSS rule

- [x] Apply underline-only input styling (AC: 12)
  - [x] Update input/textarea CSS: remove all borders except `border-bottom: 1px solid var(--navy-deep)`, remove `border-radius`, set `background: var(--white-brand)`, `outline: none`
  - [x] Add `::placeholder` rule: `color: var(--steel)`, `font-family: var(--font-manrope)`, `font-size: 16px`, `font-weight: 500`
  - [x] Move existing label text to `placeholder` attributes; add `.sr-only` class to `<label>` elements

- [x] Update form fields (AC: 13)
  - [x] Replace 3-field form with 5-row form as specified
  - [x] Row 3 (Company + Job title): `display: flex; gap: 1rem` on desktop; `display: block` on mobile
  - [x] Required fields: `Name` and `Email address` have `required` attribute and asterisk indicator

- [x] Implement mobile layout overrides (AC: 14, 15)
  - [x] On mobile, make photo panel `width: 100%`, `height: auto` (~350px), `border-bottom-right-radius: 0`; the three-zone grid becomes `display: block` (single column)
  - [x] Use CSS `order` to put the form column visually first and the info column second at mobile breakpoints (keep HTML source order: info before form)
  - [x] Verify the full mobile column order: photo → Contact h1 + invitation text → form → general inquiries → address → map → LinkedIn

- [x] Fix submit button (AC: 16)
  - [x] Update `.contact-submit`: `font-family: var(--font-syne)`, `font-size: 20px`, `font-weight: 500`, `background: var(--blue-primary)`, `border-radius: 30px`, `color: #ffffff`, `text-align: right` (right-aligned via flex justify-end on form)
  - [x] Verify button label reads "Send message"

- [x] Fix footer gradient seam (same as ABOUT-FOOTER-1 and ND-FOOTER-1)
  - [x] Add `body.page-contact footer { background: linear-gradient(to bottom, #FAFCFF 0%, #C3D4F7 15%, #748DCC 56%, #0033CC 89%, #0A1F44 100%) !important; }` to `src/styles/main.css` in the Contact page CSS block — the page background is `--white-brand`, so start at `#FAFCFF`; `!important` is **required** because `partials/footer.html` uses an inline `style` attribute that would otherwise override it (same pattern as `body.page-news footer` and `body.page-about footer` already in `main.css`)

- [x] Update `src/contact.js` scroll animations and form validation (AC13)
  - [x] Remove the two GSAP scroll animations that target `#section-mythology` (lines 47–72 in current `contact.js`) — the mythology section is deleted by AC1
  - [x] Update the form validation required-field array from `['firstname', 'email', 'message']` to `['name', 'email']` to match the new 5-row form (only Name and Email are required per AC13)
  - [x] Update the `form-error` fallback email in the HTML from `hello@vasuqi.com` to `ara@vasuqi.eu` to match AC7
  - [x] Add scroll entrance animation for the new three-zone layout zones (`.contact-photo-panel`, the center zone, the right/form zone) — use existing pattern: `gsap.from(..., { y: 20, opacity: 0, scrollTrigger: { once: true } })`

- [x] Add `aria-live` / `role="alert"` to form feedback elements (resolves deferred-work item from Story 3-4)
  - [x] Add `role="alert"` to `#form-error` div in `contact.html`
  - [x] Add `aria-live="polite"` to `#form-success` div in `contact.html`

## Dev Notes

- The Google Maps embed URL: use the standard Google Maps embed format `https://www.google.com/maps/embed?pb=...` for Ole Maaløes Vej 3, 2200 Copenhagen N. Generate this by searching for the address in Google Maps, clicking Share → Embed a map, and copying the `src` value from the iframe snippet. Do not hardcode a guessed URL.
- Three-zone layout: the left photo panel is `539px` wide at desktop. Consider using a `display: grid; grid-template-columns: 539px auto auto` layout with a max-width constraint on the full page, rather than absolute positioning, so the center and right zones flex naturally.
- Form field SR accessibility: the `aria-live` regions for form success/error messages (deferred from Story 3-4) should be addressed in this story — add `role="alert"` to `#form-error` and `aria-live="polite"` to `#form-success` while touching the form HTML (resolves the deferred-work item from Story 3-4 code review).
- Underline input `focus` state: add `outline: none` and a focus indicator on the `border-bottom` (e.g. `border-bottom-color: var(--blue-primary)` or `border-bottom-width: 2px` on `:focus`) so keyboard users have a visible focus state. This is required for WCAG 2.4.7.
- **Founders photo filename confirmed:** `/images/contact-header.jpeg` — this is the same file used in Story 5.5 News page hero (`news-documentation.html` layers 1 & 2 both reference `src="/images/contact-header.jpeg"`). Use this path directly; no Figma lookup needed.

- **Token correction for placeholder text:** The gap audit specifies `#494949` for placeholder text inside form inputs. This hex value does NOT exist in `design-tokens.css`. Use `var(--steel)` (`#5C6B85`) instead — it is the closest on-palette token. Never hardcode `#494949`.

- **`contact.js` must be updated — existing selectors will break:** The current `src/contact.js` has scroll animations targeting `#section-mythology` (removed by AC1), and form validation checking `['firstname', 'email', 'message']` (replaced by new 5-row form). Both will silently fail or validate wrong fields after the HTML changes. See Tasks above for the required fixes.

- **Current `contact.html` state (MUST READ before modifying):**
  - Has `<section id="section-mythology">` with mythology copy — DELETE entirely (AC1)
  - Uses `<div class="contact-layout">` two-column grid — REPLACE with three-zone layout (AC2)
  - `<section id="section-enquiries">` has `<h2>General Enquiries</h2>`, placeholder email/phone — UPDATE (ACs 6, 7)
  - `<section id="section-form" class="contact-form">` has full-border card + 3-field form — RESTRUCTURE (ACs 11, 12, 13)
  - `<button class="contact-submit">Send message</button>` label is already correct — only font/style needs updating (AC16)
  - `#form-success` and `#form-error` feedback divs exist and are used by `contact.js` — update error email text and add `aria-live` attrs (do NOT change the JS `showFormState` logic, only the field validation array)

- **Current Contact CSS block in `src/styles/main.css` (line ~1489):** The `/* ── Contact page (Story 3.3) */` block defines `.section-mythology`, `.mythology-body`, `.contact-layout`, `.contact-enquiries`, `.contact-form`, `.contact-submit`, `.form-feedback`. Add all Story 5.7 new styles **within this existing block** — do NOT create a duplicate `/* ── Contact page (Story 5.7) */` header. Remove the `.section-mythology` and `.mythology-body` CSS rules after deleting the HTML section.

- **Footer gradient pattern — follow established convention:** `body.page-news footer` (line ~970 of `main.css`) and `body.page-about footer` (line ~1188) both use `!important` gradient overrides. Follow the same pattern for `body.page-contact footer`.

### Project Structure Notes

- Page: `contact.html` (already exists — modify in place)
- Styles: `src/styles/main.css` — append to existing `/* ── Contact page (Story 3.3) */` block; do NOT create a new block header; also remove `.section-mythology` and `.mythology-body` rules
- Animation JS: `src/contact.js` — update scroll animation selectors and form validation array (see Tasks)
- Do NOT modify: `partials/nav.html`, `partials/footer.html`, `design-tokens.css`, `vite.config.js`, other page HTML files
- Deferred-work items resolved: Story 3-4 `aria-live` gaps for form state messages (`contact.html` lines 57, 62)

### References

- Gap audit codes: CONTACT-MYTH-1, CONTACT-LAYOUT-1, CONTACT-PHOTO-1, CONTACT-HEADING-1, CONTACT-SUBHEADING-1, CONTACT-INFO-STYLE-1, CONTACT-INFO-CONTENT-1, CONTACT-INFO-CONTENT-2, CONTACT-MAP-1, CONTACT-SOCIAL-1, CONTACT-FORM-STYLE-1, CONTACT-FORM-STYLE-2, CONTACT-FORM-FIELDS-1, CONTACT-SUBMIT-1, MOB-CONTACT-LAYOUT-1, MOB-CONTACT-LAYOUT-2
- Source: `_bmad-output/planning-artifacts/epic5-gap-audit.md`
- Deferred item resolved: Story 3-4 `aria-live` for form-success/form-error
- Note from gap audit: the same footer gradient fix (ABOUT-FOOTER-1 note) also applies to Contact page

### Review Findings

- [x] [Review][Patch] Mobile order bug — form zone renders above photo panel on mobile (AC14 violation): `.contact-form-zone { order: -1 }` with no explicit order on photo panel meant the form appeared before the photo in the mobile single-column grid. Fixed by setting explicit `order: 1` on `.contact-photo-panel`, `order: 2` on `.contact-form-zone`, `order: 3` on `.contact-info-zone` [`src/styles/main.css:1512, 1535`]
- [x] [Review][Patch] Google Maps embed URL is a fabricated/guessed placeholder — repeating `9f9f9f9f` place ID pattern is not a real Google Maps place ID; dev note explicitly prohibited guessed URLs. Replaced with a query-based embed URL `maps.google.com/maps?q=...&output=embed` which resolves correctly without a hardcoded place ID [`contact.html:51`]
- [x] [Review][Patch] `.contact-submit` uses `color: #ffffff` — bare hex violates CLAUDE.md rule "Never use hex values directly in CSS — always use the custom property". Fixed to `color: var(--white-brand)` [`src/styles/main.css:1733`]
- [x] [Review][Patch] `WATER_STAGGER` imported but never used in `contact.js` — dead import after mythology animations were removed. Removed from import statement [`src/contact.js:4`]
- [x] [Review][Defer] LinkedIn SVG `fill="#0044FF"` is a hardcoded hex value [`contact.html:68`] — deferred, pre-existing; SVG fill attributes cannot reference CSS custom properties without `currentColor`; consistent pattern in project

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None — implementation proceeded cleanly.

### Completion Notes List

- Rewrote `contact.html` in full: removed mythology section (AC1), added three-zone grid layout with `.contact-three-zone` (AC2), founders photo panel at `539×838px` with `border-bottom-right-radius: 90px` on desktop / full-width `350px` on mobile (AC3), `<h1 class="contact-heading">Contact</h1>` (AC4), invitation paragraph (AC5), three `.contact-info-label` elements with Syne SemiBold 20px `--steel` styling (AC6), correct `ara@vasuqi.eu` and `+4553555514` (AC7), address block (AC8), Google Maps iframe embed (AC9), LinkedIn SVG icon badge with correct URL and X removed (AC10), 5-row form with `.sr-only` labels and placeholder-driven UX (AC12, AC13), `aria-live="polite"` and `role="alert"` on feedback divs (deferred Story 3-4 item), submit button "Send message" right-aligned (AC16).
- Updated `src/styles/main.css`: deleted `.section-mythology` and `.mythology-body` rules, removed old `.contact-layout` two-column grid and old form card styling; added full new contact block with three-zone grid, underline-only input styling (`border-bottom: 1px solid var(--navy-deep)` only, no other borders, `background: var(--white-brand)`), `::placeholder` at `var(--steel)`, focus state `border-bottom-color: var(--blue-primary)` for WCAG 2.4.7, `.contact-submit` with `font-family: var(--font-syne)`, `border-radius: 30px`, `background: var(--blue-primary)`, footer gradient override `body.page-contact footer` with `!important`. Added `.sr-only` global utility class.
- Updated `src/contact.js`: removed two mythology scroll animations, updated required-fields array from `['firstname', 'email', 'message']` to `['name', 'email']`, added three zone entrance animations targeting `.contact-photo-panel`, `.contact-info-zone`, `.contact-form-zone`.

### File List

- contact.html
- src/styles/main.css
- src/contact.js
