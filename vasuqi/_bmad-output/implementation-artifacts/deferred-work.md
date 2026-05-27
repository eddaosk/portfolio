# Deferred Work

## Deferred from: code review of 1-1-project-scaffold-and-build-pipeline (2026-05-21)

- @rolldown/binding-darwin-arm64 CI risk — verify on first push to main; if Actions build fails on Linux, move the binding to optionalDependencies.
- No lint/typecheck CI step — no linter configured in project yet; add in a later story when tooling is decided.
- htmlPartialsPlugin: no recursive include support — single-pass replace is sufficient for current stubs; revisit in Story 1.3 if partials need sub-includes.
- No `engines` field in package.json — low priority; local Node 22 vs CI Node 20 divergence is worth noting if unexpected behavior arises.

## Deferred from: code review of 1-2-design-token-system (2026-05-21)

- `'Syne Variable'` declared in tokens but no Google Fonts loading in any HTML page — explicitly Story 1.4 scope per Dev Notes. If Story 1.4 loads `Syne` (non-variable) instead of `Syne Variable`, the variable-weight axis (`--text-h1-weight: 743`) will silently collapse to the nearest static weight.

## Deferred from: code review of 1-3-shared-navigation-and-footer (2026-05-22)

- Footer anchor IDs `#how-it-works`, `#where-vasuqi-fits`, `#the-gap` not present in index.html — awaits Epic 2 section implementation; IDs must exactly match these strings when sections are added.
- `bg-ice-near/75` degrades to fully opaque (non-blurred) on browsers without `color-mix` support (Safari ≤15.3, Chrome <111) — documented acceptable degradation in story Dev Notes.
- Safari `backdrop-filter` stacking context risk — blur silently lost if Epic 2 adds ancestor element with `overflow:hidden`, `will-change:transform`, or explicit `transform`.
- Vite partial-rebuild CI gap — changes to partials/nav.html or partials/footer.html without touching a parent HTML file won't trigger a dist rebuild; relevant when CI automates builds.
- Missing skip-navigation link and `id="main-content"` on `<main>` — WCAG 2.4.1 Level A gap; a skip link in nav.html pointing to `#main-content` would address this.
- `.glass-blur` has no `@supports (backdrop-filter)` guard — browsers without support show translucent but unblurred nav surface; acceptable per story Dev Notes.
- Social link URLs hardcoded to LinkedIn `/company/vasuqi` and X `/vasuqi` — will 404 silently if accounts are not created; verify before launch.
- `<header>` banner landmark unlabelled — no collision now, but if Epic 2 adds another `<header>` element on any page, two unlabelled `banner` landmarks will conflict for screen reader users.

## Deferred from: code review of 1-3-shared-navigation-and-footer patch pass (2026-05-22)

- Fixed nav height and body padding hardcoded independently — `scroll-padding-top: 5rem` and `body { padding-top: 5rem }` are separate literals; a CSS custom property (`--nav-height`) would eliminate manual sync risk if nav height is ever adjusted.
- Footer `h3` column headers create a temporary heading gap — no `h1`/`h2` exists on page shells yet; heading hierarchy will be correct once Epic 2 adds page content with proper `h1`/`h2`.
- `scroll-padding-top` in `@layer base` — speculative Safari 15 scroll-restoration edge case with fixed-position headers; low likelihood, safe to monitor.

## Deferred from: code review of 1-4-four-page-shells-with-seo-and-ai-instruction-files (2026-05-22)

- Syne weight 743 in design tokens vs. Google Fonts variable range — resolved by review: `Syne:wght@300..900` variable range supports weight 743 ✓; Manrope weight 200 unavailable (only 400, 500, 600 in Google Fonts) — captions will fallback to Manrope 400 until explicit caption CSS rules added in Epic 2.

## Deferred from: code review of 2-1-hero-section-and-page-layout (2026-05-23)

- No `.webm` source for hero video — `.mp4`-only documented; add `.webm` when asset is produced for Safari performance optimization.
- Blueprint PNG absent from hero — `public/images/blueprints/blueprint-bg-hero.png` does not exist; HTML structure ready; asset needed to complete AC4.
- Nav CSS active-state selectors brittle — `nav a[href="..."]` exact-string selectors couple to filenames; if any page is renamed the active state silently breaks; consider data-attribute approach.
- `SPEED = 1` makes `playbackRate = 1` a no-op — forward playback rate is browser default; constant only meaningful in the reverse delta calculation; no functional impact at current value.
- Logo `loading="lazy"` — logos at bottom of `min-h-svh` hero (pushed by `flex-1`); within viewport on most devices; revisit if 320px testing confirms they scroll below fold.
- Video 404 no visible fallback content — no fallback inside `<video>` tag; blank hero if `hero-video.mp4` is missing; add styled `<div>` fallback inside `<video>`.
- `DOMContentLoaded` after video removed from DOM — impossible in static HTML; no DOM manipulation removes `#hero video`; safe to ignore.
- Fixed nav scroll-padding hides headings within 5rem of viewport top — architectural limitation of `scroll-padding-top: 5rem` on `<html>` in `@layer base`; will need refinement once Epic 2 adds section content with in-page fragment links; consider documenting scroll-padding value as a shared constant.
- Missing base heading styles — no `<h1>`, `<h2>`, `<h3>` CSS rules to apply design tokens (font, size, weight); intentional deferral for page-shell phase; Epic 2 scope.
- No SEO canonical links — best practice for multi-version content; can be added in Epic 2 when site architecture stabilizes.

## Deferred from: code review of 2-2-intro-animation (2026-05-23)

- `aria-hidden="true"` on empty future-content sections — added to `#the-gap`, `#where-vasuqi-fits`, `#what-its-built-to-change`, `#how-it-works`; must be removed in Stories 2.4/2.5 when content is added; risk of silent inaccessibility.
- Module-level loop vars + bfcache — `waveLoop1` etc. at module scope per spec; bfcache restore with stale refs possible but mitigated by sessionStorage early-return.
- `?replay` URL parameter undocumented — clears sessionStorage; dev convenience not in spec; could replay unexpectedly from campaign links with arbitrary query params.
- iOS Safari `body overflow:hidden` bypass — `document.body.style.overflow = 'hidden'` does not reliably prevent viewport scroll on WKWebView; overlay covers content visually regardless.
- SVG `feTurbulence` `<animate>` not killed by dismiss — declarative animation runs during playback and cannot be stopped by GSAP kill(); display:none after dismiss mitigates; low-end device performance concern only.

## Deferred from: code review of 2-2-intro-animation adversarial pass (2026-05-23)

- Out-of-scope video reverse-playback removed — Story 2.1's `ended`+`rAF` pingpong loop removed from `main.js` and replaced with `loop` HTML attribute; old code had a `requestAnimationFrame(rafId)` bug so it was already broken; simple loop is correct but the change is outside 2.2 scope.
- Null-guard early exit leaves blank dismissible overlay — if DOM elements (`introText`, clip rects, mask wedge) are missing, section stays `display:grid` as blank gradient; user can dismiss via click but sessionStorage is then set (animation flagged as seen despite never playing); theoretical in static HTML.
- Section `opacity:0` not reset on `?replay` re-run — GSAP writes inline `opacity:0` after animation; `?replay` without page reload sees invisible section because `initIntroAnimation()` never resets `section` opacity to 1; chained to `?replay` deferral.
- `buildWedge` full-circle arc hairline gap on Safari ≤14 — relative arc fallback has known WebKit mask rendering glitch producing a hairline seam; below current browser target baseline.
- `poster="/images/hero-poster.jpg"` root-relative may 404 at `/vasuqi/` subpath — consistent with existing `/images/` project pattern; verify Vite base config handles it before launch.
- No focus trap or `aria-live` during blocking overlay — screen reader users get no indication overlay is active; address in Story 2.6 (accessibility).
- `body.style.overflow = ''` restore assumes no prior inline overflow — silently clears overflow set by other scripts; low risk on single-JS-file page.

## Deferred from: code review of 2-3-floating-light-background (2026-05-23)

- Relative `+=` values (`y: '-=35'`, `opacity: '+=0.08'`) risk accumulation drift on re-init — only affects HMR dev reloads on static site; spec-specified values.
- `position: fixed` inside `<main>` — ancestor transform/filter breaks fixed positioning; shared architectural pattern with Story 2.2 intro overlay.
- Beam widths (`4vw–6vw`) degrade on narrow/portrait mobile viewports — blur radius exceeds element width, effect becomes near-invisible; Story 2.6 covers mobile responsiveness.
- No cleanup/teardown for infinite `repeat: -1` tweens — no `gsap.killTweensOf` or return handle; irrelevant for static site but would need addressing in a SPA context.

## Deferred from: code review of 2-4-narrative-scroll-sections (2026-05-23)

- `prefers-reduced-motion` not guarded in `scroll.js` — entrance animations in `initScrollAnimations()` run unconditionally; motion-sensitive users see all three section animations regardless of OS setting; consistent project deferral to Story 2.6 accessibility scope [`src/animations/scroll.js:32-36`].
- GSAP animates `.section-steps` when `display:none` on desktop — `#where-vasuqi-fits .section-steps` is `block md:hidden`; `gsap.from()` targets the hidden element at desktop viewports; harmless (display:none overrides opacity) but creates an unnecessary tween [`src/animations/scroll.js:34`].

## Deferred from: code review of 2-5-how-it-works-section-and-product-visualization (2026-05-23)

- `--water-ease` CSS custom property undefined — `transition: transform 0.6s var(--water-ease, ease-in-out)` in `.product-viz` references a token not defined in `design-tokens.css` or `main.css`; fallback `ease-in-out` fires correctly; spec-prescribed pattern [`src/styles/main.css:309`].
- `vizGlow` animation `forwards` fill: `box-shadow` snaps off on `mouseleave` — final frame box-shadow persists until cursor exits, then snaps to zero because `box-shadow` is not in the `transition` declaration; spec-prescribed code pattern; minor UX rough edge; consider adding `box-shadow` to the `transition` in Story 2.6 [`src/styles/main.css:313-318`].
- `will-change: transform, opacity` on `.fl-beam` added in Story 2.5 diff — valid performance hint touching Story 2.3 CSS block; no functional impact [`src/styles/main.css:226`].
- `prefers-reduced-motion` not guarded for `@keyframes vizGlow` and `@keyframes ambientLight` — CSS animations run unconditionally; consistent project-wide deferral to Story 2.6 accessibility scope.

## Deferred from: code review of 2-6-side-navigation-and-landing-page-accessibility (2026-05-24)

- Observer/anchor NodeList built from detached nav if `main#main-content` is absent from DOM — `?.prepend(nav)` silently skips injection but `nav.querySelectorAll` still returns 6 anchors on the detached nav; IntersectionObserver fires and toggles classes on DOM-detached elements with no visible effect; harmless on static site [`src/animations/side-nav.js:27-49`].

## Deferred from: code review of 3-1-news-and-documentation-page (2026-05-24)

- `.news-card__*` BEM sub-elements (`__source`, `__headline`, `__date`) have no CSS class rules — styling is via inline `style=""` attributes and Tailwind utilities; functional but inconsistent with the CSS component approach used for the parent `.news-card` rule; defer to a future polish pass [`news-documentation.html`].
- No null-guard before `gsap.from()` calls in `news.js` — if GSAP fails to load, animated elements remain at `opacity:0` and become invisible; consistent with pre-existing project pattern across all animation files; defer [`src/news.js`].

## Deferred from: code review of 3-2-about-us-page (2026-05-24)

- ~~LinkedIn profile URLs for all 4 team members are placeholder/guessed values — founder must verify correct profile URLs before launch (`about.html` lines 61, 90, 119, 148).~~ **Resolved in Story 5.6** — confirmed URLs from gap audit: Adarsh `/in/radiantraj/`, Jörg `/in/jorg-vogel/`, Peter `/in/peter-holme-jensen-ba63b9/`, Angela `/in/wenjing-angela-zhang-a8457515/`.

## Deferred from: code review of 3-4-supporting-pages-accessibility-and-mobile-responsiveness (2026-05-24)

- `form-success`/`form-error` divs lack `aria-live` or `role="alert"` — screen readers will not announce form state changes on submit; WCAG 4.1.3 Status Messages gap; was in Story 3.3 scope and missed; add `aria-live="polite"` to `#form-success` and `aria-live="assertive"` to `#form-error` in a future accessibility pass [`contact.html:57,62`].
- `.contact-enquiries__link` rule is split across two CSS blocks — Story 3.3 original at line 664 covers typography/colour/transition; Story 3.4 append at line 834 adds display/min-height/padding; functional (cascade merges both) but should be consolidated into a single rule in a future CSS refactor [`src/styles/main.css:664,834`].

## Deferred from: code review of 4-1-design-manual-core-structure-and-onboarding (2026-05-24)

- Version 1.0 stamp premature — `docs/design-manual.md` line 3 declares `Version: 1.0` but document is incomplete pending Stories 4.2 and 4.3; update version to 1.0 only after Story 4.3 is done.

## Deferred from: code review of 4-2-task-based-guidance-and-component-derivation-protocol (2026-05-24)

- Human Review Identifiers does not prohibit AI agent modification of the instruction loader files (`CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`) — these files point agents to the design manual; if modified, agents lose auto-load of brand context; not in Story 4.2 spec scope; consider adding to Human Review Identifiers in a future manual revision.

## Deferred from: code review of 4-3-anti-list-evolution-triggers-and-living-components-section (2026-05-24)

- Version 1.0 stamp deferred item (from 4-1 review) is now resolved — Story 4.3 is complete and `docs/design-manual.md` line 3 correctly reads `Version: 1.0 — Living document. Updated as the product evolves.`; the original deferred-work entry (above, under 4-1) can be considered closed. No further action needed.

## Deferred from: code review of 5-3-where-vasuqi-fits-and-built-to-change-sections (2026-05-25)

- Bare hex values in FL beam CSS gradients (`#0044FF`, `#749BFF`, `#E8F2FF`, `#00E5FF`, `#D6F8FF`) in `.fl-beam--*` rules — carried in from Story 5.1 work included in this diff; use design tokens in a future CSS token alignment pass [`src/styles/main.css fl-beam rules`].
- Bare hex in `.nav-gradient-border::before` gradient (`#E8F2FF`, `#A1A1A1`) — Story 5.1 NAV work; replace with tokens (`--ice-near`, `--steel`) in future pass [`src/styles/main.css ~line 647`].
- Heading order regression `h3` (targets-are-set) → `h2` (where-vasuqi-fits) — accessibility WCAG 1.3.1 violation; pre-existing from Story 5.2 spec mandate; address in a dedicated accessibility audit pass.
- Duplicate placeholder icons (`nature-icon.svg` × 2, `truck-icon.svg` × 2) cause visual confusion — 3 TBC filenames need Figma confirmation (6th top-row icon, Cleaner discharge outcome, Less pressure outcome) before final handoff [`index.html wvfit-outcomes section`].

## Deferred from: code review of 5-4-how-it-works-section-and-footer (2026-05-25)

- Connector lines (`.hiw-callout__connector`) are 40px accent divs inside flex-column callouts — they appear as a short horizontal line above callout text, not spanning visually from callout edge to reactor silhouette as AC3 describes. Acceptable approximation given pure-CSS layout constraints; a true spanning connector would require SVG overlay or negative-margin techniques. Revisit if visual fidelity is a priority [`src/styles/main.css:501`].
- Footer gradient uses `#748DCC` (mid-blue at 40%) — this color has no design-token equivalent in the palette. It is a transition stop needed for the "sinking into water" effect. Add as `--blue-slate` or similar to `design-tokens.css` in a future token alignment pass if the footer gradient color is confirmed by the designer [`partials/footer.html:1`].

## Deferred from: code review of 5-5-news-and-documentation-page (2026-05-27)

- h1 text reads "News & Documentations" (plural) — pre-existing typo in `news-documentation.html` line 41; the `<title>` tag is correct (singular "News & Documentation"); not introduced by Story 5.5; fix in a future copy/proofreading pass.

## Deferred from: code review of 5-7-contact-page (2026-05-27)

- LinkedIn SVG icon `fill="#0044FF"` in `contact.html` line 68 — hardcoded hex instead of a CSS custom property; SVG fill attributes on inline SVG cannot reference CSS custom properties directly (would require `currentColor` pattern plus CSS); consistent pre-existing pattern in project; replace with `currentColor` + CSS color rule in a future design-system token alignment pass.
