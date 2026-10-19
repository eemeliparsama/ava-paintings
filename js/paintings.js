/*
  ============================================================
  PAINTINGS — edit this list to update the gallery.
  ============================================================

  To add a painting:
    1. Put the photo in the "images" folder (JPG works best,
       around 2000px on the long side is plenty).
    2. Copy one of the blocks below, paste it at the top of
       the list, and fill in the details.

  Fields:
    image     – file path, e.g. "images/sunset-lake.jpg"
    title     – painting name (English)
    titleFi   – painting name in Finnish
    year      – year it was finished
    size      – e.g. "50 × 70 cm"
    medium    – e.g. "Acrylic on canvas"
    mediumFi  – e.g. "Akryyli kankaalle"
    status    – "available", "sold", "commission", or "" (no label)
                (the All / Available / Sold / Commissioned buttons filter on this)
    price     – optional, e.g. "350 €" (leave "" to hide)
    description   – optional, a sentence or two about the piece
    descriptionFi – the same in Finnish
    highlight – true to let it appear on the front page. One of the
                highlighted paintings is picked at random on each visit.
                Leave it out otherwise.

  Any Finnish field left out or "" falls back to the English one.
  The first painting in the list is shown first on the site.
*/

// Details from @artbyavalaitila posts (titles, sizes, years, status).
// Titles are English in both languages, as on her Instagram.
const PAINTINGS = [
  {
    image: "images/pink-house.jpg",
    highlight: true,
    title: "Soft Distance",
    titleFi: "",
    year: 2026,
    size: "60 × 80 cm",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "commission",
    price: "",
    description: "",
    descriptionFi: "",
  },
  {
    image: "images/blue-boat.jpg",
    title: "The Quiet Crossing",
    titleFi: "",
    year: 2026,
    size: "80 × 100 cm",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "commission",
    price: "",
    description: "",
    descriptionFi: "",
  },
  {
    image: "images/ballroom.jpg",
    highlight: true,
    title: "The Lost Bride",
    titleFi: "",
    year: 2026,
    size: "80 × 100 cm",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "available",
    price: "",
    description: "",
    descriptionFi: "",
  },
  {
    image: "images/fairies.jpg",
    title: "Fairy Dust",
    titleFi: "",
    year: 2026,
    size: "100 × 120 cm",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "available",
    price: "",
    description: "",
    descriptionFi: "",
  },
  {
    image: "images/red-portrait.jpg",
    highlight: true,
    title: "The Weight of Red",
    titleFi: "",
    year: 2025,
    size: "80 × 100 cm",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "sold",
    price: "",
    description: "",
    descriptionFi: "",
  },
  {
    image: "images/frog-cocktail.jpg",
    highlight: true,
    title: "A toast to the absurd",
    titleFi: "",
    year: 2024,
    size: "40 × 50 cm",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "available",
    price: "",
    description: "",
    descriptionFi: "",
  },
  {
    image: "images/rainy-street.jpg",
    title: "Autumn Rain",
    titleFi: "",
    year: 2022,
    size: "50 × 70 cm",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "sold",
    price: "",
    description: "",
    descriptionFi: "",
  },
  {
    image: "images/harbour-village.jpg",
    title: "Saltwater Daydream",
    titleFi: "",
    year: 2022,
    size: "50 × 60 cm",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "available",
    price: "",
    description: "",
    descriptionFi: "",
  },
  {
    image: "images/two-boats.jpg",
    title: "Resting Tide",
    titleFi: "",
    year: 2022,
    size: "",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "sold",
    price: "",
    description: "",
    descriptionFi: "",
  },
  {
    image: "images/colourful-portrait.jpg",
    highlight: true,
    title: "Prism Of Sorrow",
    titleFi: "",
    year: "",
    size: "",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "sold",
    price: "",
    description: "",
    descriptionFi: "",
  },
  {
    image: "images/green-abstract.jpg",
    title: "Earthly Echo",
    titleFi: "",
    year: "",
    size: "",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "sold",
    price: "",
    description: "",
    descriptionFi: "",
  },
];
