# Ava — painting portfolio

A simple static website: no build step, no database. Just HTML, CSS and JavaScript.

## Adding a painting

1. Photograph the painting in even daylight, straight on, and crop to the canvas edges.
2. Save it into `images/` as a JPG, about 2000px on the long side (keeps the site fast).
3. Open `js/paintings.js`, copy an existing block, paste it at the top of the list and fill in the details.

The All / Available / Sold / Commissions buttons filter on each painting's `status`.
Each painting also has Finnish fields (`titleFi`, `descriptionFi`, …); if one is
left empty the English text is shown instead.

## English / Finnish

The site has an EN / FI switch in the header. All page text (headings, About,
Contact, button labels) for both languages lives in `js/translations.js`, so edit
the text there rather than in `index.html`.

Visitors get the language their browser prefers, and the site remembers their
choice. Links can force a language: `…/ava-paintings/?lang=fi`.

## Other things to edit

- **Page text in both languages**: `js/translations.js`
- **Email, Instagram**: `index.html`
- **About photo**: replace `images/placeholder-6.svg` in `index.html` with a real photo
- **Colours & fonts**: the variables at the top of `css/style.css`

When the real paintings are in, delete the `images/placeholder-*.svg` files.

## Previewing locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Live site

**https://eemeliparsama.github.io/ava-paintings/** (hosted free on GitHub Pages
from https://github.com/eemeliparsama/ava-paintings).

Any change saved to the `main` branch goes live automatically in about a minute.

### Updating from the browser (any device, nothing to install)
1. Open https://github.com/eemeliparsama/ava-paintings
2. New photo: open the `images` folder → **Add file → Upload files** → **Commit changes**.
3. Painting details: open `js/paintings.js` → pencil icon → edit → **Commit changes**.

### Updating from this computer
Edit the files, then:

```bash
git add -A && git commit -m "Add new paintings" && git push
```

A custom domain (e.g. `avapaints.com`, about 10–15 €/year) can be added under
the repo's **Settings → Pages**.
