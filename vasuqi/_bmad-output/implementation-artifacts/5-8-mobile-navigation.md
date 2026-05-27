# Story 5.8: Mobile Navigation

Status: ready-for-dev

## Story

As a visitor on a mobile device,
I want a hamburger nav that opens a full-screen overlay with large navigation links, and no side-nav dots cluttering the viewport,
so that the site is navigable and visually clean on touch devices.

## Acceptance Criteria

**AC1 — Mobile nav closed state: hamburger + centered logo + Contact pill (MOB-NAV-1):**
Given the navbar at mobile viewport widths (below `md` breakpoint)
When rendered in its closed state
Then: all nav text links are hidden; a `☰` icon (~24px, `--blue-primary`) appears on the left; the vāsuqi logo + wordmark is centered; the "Contact" filled blue pill appears on the right; the nav container shape (pill, glass, gradient border) is unchanged from desktop

**AC2 — Hamburger click opens full-screen overlay (MOB-NAV-2):**
Given the mobile navbar
When the user taps `☰`
Then a full-screen overlay appears with: `background: var(--navy-deep)`; the `☰` icon is replaced by a `✕` close icon at the same left position; three nav links in large Syne white text, left-aligned, vertically stacked: "News & docs", "About us", "Contact us"; no sub-items, icons, or dividers; the overlay animates in using water-physics easing (fade or slide from top)

**AC3 — Overlay closes on ✕, backdrop tap, or Escape (MOB-NAV-2):**
Given the mobile nav overlay is open
When the user taps `✕`, taps outside the nav links, or presses Escape
Then the overlay closes and the hamburger icon is restored

**AC4 — Focus is trapped inside the overlay when open (MOB-NAV-2):**
Given the mobile nav overlay is open
When the user tabs through the page
Then focus cycles only within the overlay's interactive elements (close button + 3 nav links); focus returns to the hamburger button when the overlay closes

**AC5 — Side nav dots are hidden on mobile (MOB-SIDENAV-1):**
Given the side navigation on any page
When rendered below the `md` breakpoint
Then the side nav container has `display: none` (or equivalent); no dots appear overlapping page content on mobile

## Tasks / Subtasks

- [ ] Add mobile closed-state nav styles (AC: 1)
  - [ ] In `partials/nav.html`, wrap existing text nav links in a container with `hidden md:flex` (or CSS `display: none` below `md`)
  - [ ] Add hamburger button: `<button class="nav-hamburger" aria-label="Open navigation" aria-expanded="false">☰</button>` — visible only on mobile (`flex md:hidden`)
  - [ ] Verify logo is centered and Contact pill is visible on mobile

- [ ] Build full-screen overlay panel (AC: 2)
  - [ ] Add `<div class="nav-overlay" aria-hidden="true" role="dialog" aria-label="Navigation">` as a sibling to the nav bar (inside `<header>`)
  - [ ] CSS: `position: fixed`, `inset: 0`, `background: var(--navy-deep)`, `z-index: 200`, `display: flex; flex-direction: column; justify-content: center; padding: 2rem`; hidden by default (`opacity: 0; pointer-events: none; visibility: hidden`)
  - [ ] Three `<a>` links inside: "News & docs" (`href="news-documentation.html"`), "About us" (`href="about.html"`), "Contact us" (`href="contact.html"`) — Syne, large white text, left-aligned
  - [ ] `✕` close button inside overlay: `position: absolute; top: [nav bar height]; left: [hamburger position]` so it visually replaces `☰`

- [ ] Implement toggle JS (AC: 2, 3)
  - [ ] In `src/main.js` (or a dedicated `src/mobile-nav.js`): add click handler on hamburger → set overlay to visible, `aria-expanded="true"` on button, `aria-hidden="false"` on overlay, animate in (GSAP `fromTo` opacity 0→1 with `--water-ease` or CSS transition)
  - [ ] Close handler on `✕` button, overlay backdrop click, and `keydown` Escape → reverse animation, restore aria states

- [ ] Implement focus trap (AC: 4)
  - [ ] When overlay opens, capture focus to first focusable element inside overlay
  - [ ] On `keydown Tab`, cycle focus within overlay only (close button + 3 links)
  - [ ] On close, return focus to the hamburger button

- [ ] Hide side nav on mobile (AC: 5)
  - [ ] In `src/styles/main.css`, add to the `.side-nav` rule (or its container): `@media (max-width: [md breakpoint - 1px]) { display: none; }`
  - [ ] Alternatively use a Tailwind class: wrap side nav container with `hidden md:block`

## Dev Notes

- The overlay's `✕` button must be at the same visual position as the `☰` hamburger so the nav bar appears stable — position it with the same left offset as the hamburger. The simplest approach: keep the hamburger button in the nav bar and change its `innerHTML` between `☰` and `✕` via JS, updating `aria-label` accordingly.
- Animation: use GSAP with `ease: 'power2.inOut'` (the project's `--water-ease` approximation) for `opacity` and optionally `y: -20 → 0` for a subtle slide-in. Duration ~0.3s. If GSAP is not available in the nav context, a CSS `transition: opacity 0.3s ease` is an acceptable fallback.
- The overlay needs `role="dialog"` and `aria-modal="true"` for screen readers to treat it as a modal. This pairs with the focus trap (AC4).
- Nav link copy: "News & docs", "About us", "Contact us" — note "Contact us" (not "Contact") in the overlay. The pill in the closed nav still reads "Contact".
- The side nav JS (`src/animations/side-nav.js`) sets up an IntersectionObserver and attaches dots. Hiding via CSS `display: none` is sufficient — the JS will still run but the invisible element causes no visible or functional issue on mobile. No need to conditionally skip the JS init.
- MOB-LANDING-1 (full mobile landing page section-by-section audit) is a pending audit status note — not yet implemented as a story. Known mobile gaps for the landing page are already captured in Stories 5.1–5.4 inline (HERO-3, FLOATINGLIGHT-3, FITS-4, WVFIT-5, WVBTC-8, HIW-3, HIW-4). No further action for this story.

### Project Structure Notes

- Nav partial: `partials/nav.html`
- Side nav: `src/animations/side-nav.js`, `src/styles/main.css` (`.side-nav` rules)
- Main JS: `src/main.js` (or new `src/mobile-nav.js`)
- Applies to: all pages that include `partials/nav.html`

### References

- Gap audit codes: MOB-NAV-1, MOB-NAV-2, MOB-SIDENAV-1
- Source: `_bmad-output/planning-artifacts/epic5-gap-audit.md`
- Note: MOB-LANDING-1 is a pending audit note — no story created; known items already in Stories 5.1–5.4

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
