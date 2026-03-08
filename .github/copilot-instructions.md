# Portfolio — Edda Ósk Óskarsdóttir

Personal portfolio site for a digital designer. Bilingual (EN + DA) static site deployed to GitHub Pages at `eddaosk.dk`.

## Tech Stack

- **HTML5** — Multi-page: `index.html`, `about.html`, `projects.html`, `print.html` (+ DA mirrors in `da/`)
- **Bootstrap 5.3** — Grid, navbar, utilities (CSS via CDN, JS bundle via CDN)
- **SCSS** → CSS — Source in `scss/`, compiled output in `css/`
- **Vanilla JS** — `js/main.js`: AOS init, navbar scroll, footer year, carousel counters, hobby grid shuffle + lightbox
- **AOS 2.3.1** — Scroll animations (via CDN)
- **Font:** Outfit (300/400/500/600) via Google Fonts — used for body, headings, and accent
- **Icons:** Font Awesome 6

## Build & Dev

```bash
npm install              # Install sass, bootstrap, live-server
npm run sass             # Watch SCSS → CSS (must run before pushing)
npm start                # live-server on localhost:8080
```

One-off compile: `npx sass --load-path=node_modules --silence-deprecation=import --silence-deprecation=global-builtin scss/main.scss css/main.css`

SCSS must be compiled locally — there is no CI build step. Always commit both `.scss` and compiled `.css` files.

## Design Tokens

SCSS variables in `scss/main.scss`:

| Token | Value | Usage |
|-------|-------|-------|
| `$color-primary` | `#1a2e50` | Navy — headings, active states |
| `$color-accent` | `#c9943a` | Gold — hovers, accents, CTAs |
| `$color-subheading` | `#3d5a7c` | Muted blue — subtitles |
| `$color-background` | `#faf8f5` | Warm off-white body background |
| `$color-text` | `#2a2a2a` | Dark gray body text |
| `$color-footer-bg` | `#f2ece3` | Warm beige footer |
| `$color-border` | `#e5e0d8` | Subtle warm border |
| `$color-muted` | `#8a8a8a` | De-emphasized text |

CSS custom properties: `--font-body`, `--font-accent`, `--font-heading` (all Outfit).

## Conventions

- **Class names:** kebab-case (`.project-row`, `.tool-logo`, `.intro-description`)
- **SCSS organization:** Section comment blocks (`/* ====== Section */`), `&` nesting for pseudo-classes
- **Responsive:** Mobile-first using Bootstrap breakpoint mixins (`@include media-breakpoint-down()`)
- **Additional responsive rules** live in `css/responsive.css` (plain CSS, not SCSS-compiled)
- **Images:** Use `loading="lazy"` attributes; project images and tool logos in `img/`
- **Typography scaling:** Use `clamp()` for fluid font sizes

## Pitfalls

- `print.html`, `scss/print.scss`, `css/print.css`, and `js/print.js` are reserved but **empty** — don't assume they contain code
- `scripts/` directory is **empty**
- The navbar toggler depends on Bootstrap's JS bundle from CDN — don't remove that script tag
- `css/responsive.css` is hand-written CSS (not generated from SCSS) — edit it directly
