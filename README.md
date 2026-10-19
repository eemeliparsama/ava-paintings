# Ava — painting portfolio

A simple static website: no build step, no database. Just HTML, CSS and JavaScript.

## Adding a painting

1. Photograph the painting in even daylight, straight on, and crop to the canvas edges.
2. Save it into `images/` as a JPG, about 2000px on the long side (keeps the site fast).
3. Open `js/paintings.js`, copy an existing block, paste it at the top of the list and fill in the details.

The All / Available / Sold / Commissioned buttons filter on each painting's `status`.
The site has four pages, laid out after Julia Ulrich's artist site:

- **Front page** (`index.html`): the headline and one painting beside it. The painting is
  picked at random from those marked `highlight: true` in `js/paintings.js`, so it changes
  between visits.
- **Paintings** (`gallery.html`): every painting, with the filters.
- **About** (`about.html`) and **Contact** (`contact.html`).

The header, menu, footer and painting view are added to every page by `js/main.js`,
so they only need changing in one place.
If a painting has a `price`, it shows next to "Available" (e.g. "Available · 350 €").
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
- **Email, Instagram**: `js/site.js`
- **About picture**: currently a close-up of *Earthly Echo* (`images/green-abstract.jpg`).
  To use a studio photo instead, change the `<img>` in `about.html` and the
  `aboutDetailAlt` / `aboutDetailCaption` texts in `js/translations.js`
- **Colours, fonts & spacing**: `css/tokens.css`
- **Link to one painting**: open it on the site and copy the address, e.g. `…/ava-paintings/gallery.html#the-lost-bride`.
  The link comes from the painting's English title, so changing a title changes its link.
- **Link preview picture** (WhatsApp, Messenger…): `images/share.jpg`, about 1200 × 630 px

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
