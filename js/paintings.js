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
    status    – "available", "sold", or "commission"
                (the All / Available / Sold buttons filter on this)
    price     – optional, e.g. "350 €" (leave "" to hide)
    description   – optional, a sentence or two about the piece
    descriptionFi – the same in Finnish

  Any Finnish field left out or "" falls back to the English one.
  The first painting in the list is shown first on the site.
*/

const PAINTINGS = [
  {
    image: "images/placeholder-1.svg",
    title: "Harbour at Dusk",
    titleFi: "Satama hämärässä",
    year: 2026,
    size: "50 × 60 cm",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "available",
    price: "420 €",
    description: "Warm evening light breaking over the water, painted in loose layered strokes.",
    descriptionFi: "Lämmin iltavalo veden yllä, maalattu väljin, kerroksellisin vedoin.",
  },
  {
    image: "images/placeholder-2.svg",
    title: "Blue Hour",
    titleFi: "Sininen hetki",
    year: 2026,
    size: "70 × 56 cm",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "sold",
    price: "",
    description: "",
    descriptionFi: "",
  },
  {
    image: "images/placeholder-3.svg",
    title: "Peony Study",
    titleFi: "Pionitutkielma",
    year: 2025,
    size: "40 × 40 cm",
    medium: "Acrylic on board",
    mediumFi: "Akryyli levylle",
    status: "available",
    price: "260 €",
    description: "A soft, close-up study of petals in early summer.",
    descriptionFi: "Pehmeä lähikuva terälehdistä alkukesällä.",
  },
  {
    image: "images/placeholder-4.svg",
    title: "Late Summer Field",
    titleFi: "Loppukesän pelto",
    year: 2025,
    size: "50 × 70 cm",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "available",
    price: "450 €",
    description: "",
    descriptionFi: "",
  },
  {
    image: "images/placeholder-5.svg",
    title: "Forest Edge",
    titleFi: "Metsänreuna",
    year: 2025,
    size: "80 × 60 cm",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "commission",
    price: "",
    description: "Commissioned piece — a favourite walking path in autumn.",
    descriptionFi: "Tilaustyö – rakas kävelypolku syksyllä.",
  },
  {
    image: "images/placeholder-6.svg",
    title: "Terracotta",
    titleFi: "Terrakotta",
    year: 2025,
    size: "40 × 50 cm",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "available",
    price: "300 €",
    description: "",
    descriptionFi: "",
  },
  {
    image: "images/placeholder-7.svg",
    title: "Rosé",
    titleFi: "Rosé",
    year: 2024,
    size: "50 × 50 cm",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "sold",
    price: "",
    description: "",
    descriptionFi: "",
  },
  {
    image: "images/placeholder-8.svg",
    title: "Undertow",
    titleFi: "Pohjavirta",
    year: 2024,
    size: "60 × 80 cm",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "available",
    price: "480 €",
    description: "Pouring and palette-knife work in deep teal and coral.",
    descriptionFi: "Kaatotekniikkaa ja palettiveitsityötä syvän sinivihreän ja korallin sävyissä.",
  },
  {
    image: "images/placeholder-9.svg",
    title: "Quiet Morning",
    titleFi: "Hiljainen aamu",
    year: 2024,
    size: "70 × 50 cm",
    medium: "Acrylic on canvas",
    mediumFi: "Akryyli kankaalle",
    status: "available",
    price: "380 €",
    description: "",
    descriptionFi: "",
  },
];
