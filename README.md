# DomDesign — Portfolio of Dominic Daniel

A minimal, editorial portfolio site built in plain HTML, CSS, and vanilla JavaScript.
No framework, no build step, no CMS. Ready to deploy to GitHub Pages as-is.

---

## 1 · File structure

```
domdesign/
├── index.html            ← single-page portfolio
├── style.css             ← Swiss / editorial monochrome styles
├── script.js             ← mobile nav + smooth scrolling (vanilla JS)
├── README.md             ← this file
└── assets/
    └── images/
        ├── favicon.svg
        ├── profile/
        │   ├── dominic-daniel.jpg     ← optional profile photo
        │   └── og-card.jpg            ← social share preview
        └── projects/
            ├── school-project-1.jpg
            ├── branding-1.jpg
            ├── pmu-evacuation-1.jpg
            ├── print-layout-1.jpg
            ├── freelance-1.jpg
            └── lost-project-1.jpg
```

Image filenames in `assets/images/projects/` are already wired into `index.html`.
Drop your real artwork in with those exact filenames and the page will display them.

---

## 2 · Before you publish — replace these placeholders

Search the project for these and replace them with the real values:

| Placeholder                          | Where                          | Replace with                       |
| ------------------------------------ | ------------------------------ | ---------------------------------- |
| `your-email@example.com`             | `index.html` — contact section | Your actual email                  |
| LinkedIn `href="#"`                  | `index.html` — contact links   | Your LinkedIn profile URL          |
| Behance `href="#"`                   | `index.html` — contact links   | Your Behance profile URL           |
| GitHub `href="#"`                    | `index.html` — contact links   | Your GitHub profile URL            |
| `https://domdesign.ca`               | `index.html` — Open Graph URL  | Your live site URL                 |
| Project `.jpg` files                 | `assets/images/projects/`      | Your final project artwork         |

---

## 3 · Local preview

Open `index.html` directly in a browser — that works for a quick check.

For a more accurate local server (recommended, especially for the Google Fonts request):

```bash
# Python 3
python3 -m http.server 8080
# then visit http://localhost:8080
```

---

## 4 · Deploying to GitHub Pages

### Option A — Project site (`username.github.io/repo-name`)

1. **Create a repository** on GitHub (e.g. `domdesign`).
2. **Push your files** to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — portfolio"
   git branch -M main
   git remote add origin https://github.com/USERNAME/domdesign.git
   git push -u origin main
   ```
3. On GitHub → **Settings → Pages**.
4. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main** · Folder: **/(root)**
   - Click **Save**.
5. Wait ~30–60 seconds. Your site goes live at:
   `https://USERNAME.github.io/domdesign/`

### Option B — User site (`username.github.io`)

Same process, but name the repository exactly `USERNAME.github.io`.
The site will live at `https://USERNAME.github.io/`.

### Option C — Custom domain (`domdesign.ca`)

1. In **Settings → Pages → Custom domain**, enter `domdesign.ca`.
2. At your domain registrar, set DNS records:
   - **A records** pointing your apex domain to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME record** for `www` pointing to `USERNAME.github.io`.
3. Tick **Enforce HTTPS** once the certificate is issued (allow a few minutes).
4. GitHub will automatically commit a `CNAME` file to your repo — leave it.

---

## 5 · Updating the site

Any change is a normal git push:

```bash
git add .
git commit -m "Update copy / swap project images"
git push
```

GitHub Pages rebuilds automatically. Allow ~30 seconds for the new version to appear.

---

## 6 · Notes on the design

- **Typography:** Archivo (Swiss-influenced grotesque) + JetBrains Mono (technical labels).
  Both load from Google Fonts — no licensing concerns.
- **Color:** Strict monochrome — near-black on white, with one warm off-white surface
  used to highlight the honest case-studies block. No accent color by design.
- **Layout:** Mobile-first. Grid expands at `640px`, `768px`, `1024px`, `1200px`.
- **Accessibility:** Skip link, visible keyboard focus, semantic landmarks (`header`,
  `main`, `section`, `footer`), ARIA on the mobile nav, `prefers-reduced-motion` respected.
- **Performance:** No frameworks. Two Google Fonts requests with `preconnect`.
  Images lazy-loaded. Total payload before images is well under 50 KB.

---

## 7 · License & credit

Designed and developed by **Dominic Daniel** — DomDesign © 2026.
