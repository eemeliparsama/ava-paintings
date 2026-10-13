# Ava — painting portfolio

A simple static website: no build step, no database. Just HTML, CSS and JavaScript.

## Adding a painting

1. Photograph the painting in even daylight, straight on, and crop to the canvas edges.
2. Save it into `images/` as a JPG, about 2000px on the long side (keeps the site fast).
3. Open `js/paintings.js`, copy an existing block, paste it at the top of the list and fill in the details.

The filter buttons (Coastlines, Botanicals…) come automatically from the `series` field.

## Other things to edit

- **Name, About text, email, Instagram**: `index.html`
- **About photo**: replace `images/placeholder-6.svg` in `index.html` with a real photo
- **Colours & fonts**: the variables at the top of `css/style.css`

When the real paintings are in, delete the `images/placeholder-*.svg` files.

## Previewing locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Putting it online (free)

- **Netlify Drop**: drag this whole folder onto https://app.netlify.com/drop.
- **GitHub Pages**: push the folder to a GitHub repo and enable Pages in its settings.

Either one can use a custom domain (e.g. `avapaints.com`, about 10–15 €/year).
