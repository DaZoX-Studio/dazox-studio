# DaZoX Studio — Official Website

Premium static website for **DaZoX Studio** — AI automation, Python engineering,
OCR & document digitization, chatbots, and modern websites.

Built with plain **HTML5 + CSS3 + Vanilla JavaScript**. No frameworks, no build
step, no dependencies.

## Project structure

```
DaZoX-Studio/
├── index.html          # Single-page site
├── style.css           # All styles (variables, layout, components, animations, responsive)
├── app.js              # All scripts (nav, loader, typing, particles, scroll, cursor, animations, form)
├── assets/
│   ├── images/         # (placeholder — add project imagery here)
│   ├── icons/          # (placeholder — inline SVG icons live in markup)
│   └── logo/
│       └── logo.svg
├── favicon.ico
├── robots.txt
├── sitemap.xml
└── README.md
```

## Run locally

Just open `index.html` in a browser — no server required.

Or serve it with any static server, e.g.:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy

### GitHub Pages
1. Push this folder to a repo (e.g. `dazox-studio.github.io` or any repo).
2. In **Settings → Pages**, set the source to the `main` branch, root folder.
3. Your site will be live at `https://<user>.github.io/<repo>/`.

### Netlify / Vercel / Cloudflare Pages
Drag the folder into the dashboard or connect the repo. No build command needed;
publish directory is the project root.

## Design system

- Palette: deep navy (`#0F172A`) with blue → cyan gradient (`#3B82F6 → #06B6D4`).
- Typography: **Outfit** (headings), **Plus Jakarta Sans** (body) via Google Fonts.
- Motion: reveal-on-scroll, magnetic buttons, animated blobs, particle field,
  custom cursor, typing hero, marquee. Fully respects `prefers-reduced-motion`.

## Accessibility & SEO

- Semantic landmarks, skip link, ARIA labels, `prefers-reduced-motion` support.
- OpenGraph, Twitter, and JSON-LD Organization metadata.
- `robots.txt` + `sitemap.xml` included.

## License

© DaZoX Studio. All rights reserved.
