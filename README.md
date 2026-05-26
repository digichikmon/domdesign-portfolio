# DomDesign — Studio of Dominic Daniel

**[domdesign.ca](https://domdesign.ca)** — A premium editorial portfolio for a graphic design studio. Built in plain HTML, CSS, and vanilla JavaScript with GSAP animations and Lenis smooth scrolling. No framework, no build step, no CMS. Deployed via GitHub Pages.

---

## 1 · Site structure

Five pages, one shared design system.

```
domdesign-portfolio/
├── index.html                ← Home — hero, about, experience, work, skills, contact
├── projects.html             ← Full portfolio grid with category filter
├── services.html             ← Service offerings (Branding, Print, Technical, Web)
├── client-experience.html    ← Process steps + HoneyBook client portal info
├── contact.html              ← Contact info + project brief panel
├── style.css                 ← Complete design system
├── script.js                 ← GSAP + Lenis + carousels + nav + portfolio filter
├── CNAME                     ← Custom domain: domdesign.ca
├── favicon.svg               ← DD monogram SVG favicon
└── images/                   ← All project and portfolio images (25 files)
```

---

## 2 · Design system

### Colors

| Token         | Value     | Usage                           |
| ------------- | --------- | ------------------------------- |
| `--c-ink`     | `#0C0C0C` | Primary text, borders, buttons  |
| `--c-paper`   | `#FAFAFA` | Page background                 |
| `--c-surface` | `#EBEBEB` | Card backgrounds, meta blocks   |
| `--c-muted`   | `#787878` | Secondary text, labels          |
| `--c-stone`   | `#A89B8C` | Accent, italic headlines, hover |

### Typography

| Token          | Family             | Usage                        |
| -------------- | ------------------ | ---------------------------- |
| `--ff-display` | Cormorant Garamond | Headlines, section titles    |
| `--ff-body`    | Barlow             | Body text, paragraphs        |
| `--ff-label`   | Barlow Condensed   | Labels, tags, nav, buttons   |
| `--ff-mono`    | JetBrains Mono     | Metadata, numbers, dates     |

All fonts loaded from Google Fonts — no licensing concerns.

### JavaScript libraries (CDN)

| Library       | Version | Purpose                              |
| ------------- | ------- | ------------------------------------ |
| GSAP          | 3.12.5  | Scroll-triggered reveal animations   |
| ScrollTrigger | 3.12.5  | Viewport detection for GSAP          |
| Lenis         | 1.0.42  | Smooth wheel scrolling               |
| Font Awesome  | 6.5.1   | Contact section icons                |

---

## 3 · Key features

- **Multi-page architecture** — 5 pages with consistent header, nav, and footer
- **GSAP scroll reveals** — `.js-reveal` (fade up) and `.js-stagger` (staggered children) on all sections
- **Lenis smooth scroll** — synchronized with GSAP ticker for frame-perfect smoothness
- **Project carousels** — 6 carousels on the home page with prev/next buttons, dot indicators, and touch swipe
- **Portfolio filter** — client-side category filtering on `projects.html` (All / Branding / Graphic Design / Technical / Web)
- **Active nav state** — current page highlighted automatically based on URL
- **Mobile nav** — full-screen overlay menu on small screens with ARIA state management
- **HoneyBook integration** — client experience and contact pages link to the HoneyBook client portal for proposals, contracts, and invoices
- **Responsive** — mobile-first grid, breakpoints at 480 px, 768 px, 1024 px, 1280 px
- **Accessible** — skip link, semantic landmarks, ARIA on nav toggle, `prefers-reduced-motion` respected

---

## 4 · Local preview

Open any `.html` file directly in a browser for a quick check, or run a local server for accurate font loading:

```bash
# Python 3
python3 -m http.server 8080
# then visit http://localhost:8080
```

---

## 5 · Updating the site

### Editing content

| Page                       | What to edit                                         |
| -------------------------- | ---------------------------------------------------- |
| `index.html`               | Hero copy, about text, timeline, carousels, skills   |
| `projects.html`            | `.portfolio-item` blocks, `data-category` attributes |
| `services.html`            | `.service-item` blocks                               |
| `client-experience.html`   | `.process-step` blocks, HoneyBook callout text       |
| `contact.html`             | Email address, social links, HoneyBook URL           |

### Adding a new project image

1. Drop the image file into the `images/` folder.
2. In `index.html`, add a `<div class="carousel-slide">` inside the matching project's `.carousel-track`.
3. Add a matching `<button class="carousel-dot"></button>` to the `.carousel-indicators` block.
4. In `projects.html`, add a `.portfolio-item` element with the correct `data-category`.

### Committing and deploying

```bash
git add .
git commit -m "Describe what changed"
git push
```

GitHub Pages rebuilds automatically from `main`. Allow ~30–60 seconds.

---

## 6 · GitHub Pages + custom domain

The site is already live at [domdesign.ca](https://domdesign.ca) via the `CNAME` file.

To set up from scratch on a new repository:

1. Push all files to the `main` branch.
2. Go to **Settings → Pages → Deploy from branch → main / (root)**.
3. In **Settings → Pages → Custom domain**, enter `domdesign.ca`.
4. At your domain registrar, set these DNS A records:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
5. Tick **Enforce HTTPS** once the certificate is issued (allow a few minutes).

---

## 7 · Animation classes

Add these classes to any HTML element to trigger GSAP scroll animations:

| Class        | Effect                                           |
| ------------ | ------------------------------------------------ |
| `.js-reveal` | Fade in + slide up when element enters viewport  |
| `.js-stagger`| Each direct child fades in with a stagger delay  |

Both are disabled when `prefers-reduced-motion: reduce` is active in the OS.

---

## 8 · License & credit

Designed and developed by **Dominic Daniel** — DomDesign © 2026.
