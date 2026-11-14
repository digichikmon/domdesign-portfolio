# Case study template

A reusable starting point for a branding case study, based on the
Velmora page (`en/velmora-project.html`, `fr/velmora-project.html`).

| File | Copy to |
|---|---|
| `case-study-en.html` | `en/{{SLUG}}-project.html` |
| `case-study-fr.html` | `fr/{{SLUG}}-project.html` |

The template pages carry `noindex`, so search engines skip them. Links and
image paths are written for the `en/` and `fr/` folders, so pages opened
directly from `templates/` show broken navigation. That's expected.

## Sections

1. Overview & my role
2. Design brief
3. Concept (three principles)
4. Logo & wordmark boards
5. Colour palette (6 swatches + proportion bar)
6. Typography (3 type cards)
7. Website design (homepage + optional product page mockups)
8. Social media templates (3 posts) + 5 guidelines
9. What this case demonstrates
10. Closing call to action

Delete any section that doesn't fit, then renumber the rest.

## Brand colours

Every visual reads its colours from variables set on `<main>`:

| Variable | Role | Velmora |
|---|---|---|
| `--vm-oxblood` | primary dark (hero panels, accents) | `#431F24` |
| `--vm-ivory` | paper / light background | `#F5ECDC` |
| `--vm-gold` | accent, used sparingly | `#A9874F` |
| `--vm-ink` | text, darkest surface | `#1E1A17` |
| `--vm-stone` | muted captions, rules | `#8A7F72` |
| `--vm-bone` | secondary light panel | `#E7DCC8` |
| `--vm-accent-light` | accent on dark backgrounds | `#D9BF8F` |

Optional: `--vm-line`, `--vm-frame`, `--vm-frame-bar` and `--vm-frame-dot`
control hairlines and the browser-mockup chrome.

Also type the hex values into the swatches in section 05, since those show
the colours as content.

## Images

Put images in `images/{{SLUG}}/`. The template expects:

- `hero.jpg`: main editorial image. It's used at the top of the page, in the homepage mockup and in the reveal post.
- `product.jpg`: product-page mockup image.
- `detail.jpg`: close-up for the round detail post.

Each mockup photo is set inline (`style="background-image:url(…)"`), so you
can point it at any file. Say so in the caption if an image is AI-generated.

## Publishing checklist

- [ ] Copy both templates into `en/` and `fr/`, and replace every `{{PLACEHOLDER}}`.
- [ ] Delete the `noindex` line and the "TEMPLATE" comments.
- [ ] Check the EN ↔ FR language-switch links (header and footer).
- [ ] Brief: paraphrase it. No client names or NDA details.
- [ ] Add a card to `en/projects.html` and `fr/projects.html` (snippet below).
- [ ] Add a card to the Work grid in `en/index.html` and `fr/index.html` (snippet below), with the next project number.
- [ ] Optional: link it from `services.html` captions and the For Employers page.
- [ ] If `style.css` changed, bump `?v=` on the stylesheet link in **every** HTML page,
      so visitors don't keep a stale cached copy.
- [ ] Check desktop and phone widths: no sideways scrolling, swatches visible.

### Projects page card

```html
<a class="portfolio-item" data-category="branding" href="{{SLUG}}-project.html">
  <div class="portfolio-item-img">
    <img src="../images/{{SLUG}}/hero.jpg" alt="" loading="lazy" />
  </div>
  <div class="portfolio-item-meta">
    <h3>{{BRAND}} — {{CATEGORY}}</h3>
    <p class="portfolio-item-tag">Concept case study · Identity · Web · Social</p>
  </div>
</a>
```

### Homepage Work card

```html
<!-- Project NN — {{BRAND}} -->
<article class="project-card js-reveal" id="project-{{SLUG}}">
  <div class="project-carousel" aria-label="{{BRAND}} project image">
    <div class="carousel-track">
      <div class="carousel-slide"><img src="../images/{{SLUG}}/hero.jpg" alt="{{ALT}}" loading="lazy" /></div>
    </div>
  </div>
  <div class="project-meta">
    <span class="project-no">NN</span>
    <h3 class="project-title"><a href="{{SLUG}}-project.html">{{BRAND}} — {{CATEGORY}}</a></h3>
    <p class="project-tag">Concept case study · Identity · Web · Social · {{YEAR}}</p>
  </div>
</article>
```
