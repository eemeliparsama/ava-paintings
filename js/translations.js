/*
  ============================================================
  SITE TEXT — English and Finnish.
  ============================================================

  Edit the text here, not in index.html: this file decides what the
  page shows in each language. Keep the keys (left side) the same in
  both languages and only change the text in quotes.

  Painting titles and descriptions are in js/paintings.js.
*/

const TRANSLATIONS = {
  en: {
    pageTitle: "Ava · Acrylic paintings",
    pageDescription: "Original acrylic paintings by Ava. See what's available, or ask about a commission.",

    pageTitleGallery: "Paintings · Ava",
    pageDescriptionGallery: "Every painting by Ava: what's for sale, what has sold and commissioned work.",
    pageTitleAbout: "About · Ava",
    pageDescriptionAbout: "About Ava, a painter who works mostly in acrylics.",
    pageTitleContact: "Contact · Ava",
    pageDescriptionContact: "Ask Ava about a painting or a commission.",

    // Menu
    menuOpen: "Menu",
    navHome: "Home",
    navGallery: "Paintings",
    navAbout: "About",
    navContact: "Contact",

    heroTitle: "Bright colour and thick, <span class=\"accent\">textured</span> paint.",
    heroLede: "Original acrylic paintings on canvas. Some are for sale, and I take commissions.",

    viewPaintings: "View the paintings",

    workTitle: "Work",
    filterAll: "All",
    filterAvailable: "Available",
    filterSold: "Sold",
    filterCommission: "Commissioned",
    filterLabel: "Filter paintings",
    // {n} is replaced with the number of paintings shown
    countOne: "{n} painting",
    countMany: "{n} paintings",

    statusAvailable: "Available",
    statusSold: "Sold",
    statusCommission: "Commissioned",

    aboutTitle: "About",
    aboutP1: "Hi, I'm Ava. I paint mostly with acrylics. I like strong colours and thick layers of paint, and how a painting looks different in the morning than in the evening.",
    aboutP2: "A lot of my paintings start from something real, like a place or a face, and get more abstract as I go.",
    aboutDetailAlt: "Close-up of the painting Earthly Echo by Ava: layered strokes of green, cream and pink paint.",
    aboutDetailCaption: "Detail · Earthly Echo",
    aboutNamesLabel: "The paintings",
    aboutEndTitle: "Want a painting of your own?",

    contactTitle: "Get in touch",
    copyEmailLong: "or copy the email address",
    copied: "Copied",
    contactText: "Want one of these paintings, or something made just for you? Send me a message.",
    formFirstName: "First name",
    formLastName: "Last name",
    formEmail: "Email",
    formEmailHint: "you@example.com",
    formMessage: "Message",
    formMessageHint: "Which painting you're interested in, or what you'd like painted: the size, the colours, where it will hang.",
    formTopic: "What's it about?",
    topicForSale: "A painting for sale",
    topicCommission: "A commission",
    topicOther: "Something else",
    formSend: "Send message",
    formFillIn: "Please fill in this field.",
    formEmailCheck: "Please check the email address.",
    formSendNote: "This opens your email app with the message ready to send.",
    copy: "Copy",
    mailSubject: "Message from your website",
    mailName: "Name",
    mailTopic: "About",
    panelStatement: "Every painting is one of a kind.",

    footer: "Please ask before using the paintings or photos.",

    lightboxLabel: "Painting details",
    close: "Close",
    previous: "Previous painting",
    next: "Next painting",
    prevShort: "Previous",
    nextShort: "Next",
    factMedium: "Medium",
    factSize: "Size",
    factYear: "Year",
    stripLabel: "All paintings",
    // Email link in the painting view. {title} is replaced with the painting's name.
    askThis: "Ask about this painting",
    askSimilar: "Ask about a similar painting",
    askSubject: "Painting: {title}",
    askBodyThis: "Hi Ava,\n\nI'm interested in {title}.\n\n",
    askBodySimilar: "Hi Ava,\n\nI saw {title} and would love something similar.\n\n",
    languageLabel: "Language",
  },

  fi: {
    pageTitle: "Ava · Akryylimaalauksia",
    pageDescription: "Avan alkuperäisiä akryylimaalauksia. Katso, mitä on myynnissä, tai kysy tilaustyöstä.",

    pageTitleGallery: "Maalaukset · Ava",
    pageDescriptionGallery: "Kaikki Avan maalaukset: myynnissä olevat, myydyt ja tilaustyöt.",
    pageTitleAbout: "Minusta · Ava",
    pageDescriptionAbout: "Tietoa Avasta, joka maalaa enimmäkseen akryyleillä.",
    pageTitleContact: "Yhteystiedot · Ava",
    pageDescriptionContact: "Kysy Avalta maalauksesta tai tilaustyöstä.",

    menuOpen: "Valikko",
    navHome: "Etusivu",
    navGallery: "Maalaukset",
    navAbout: "Minusta",
    navContact: "Yhteystiedot",

    heroTitle: "Kirkkaita värejä ja paksua, <span class=\"accent\">kerroksellista</span> maalia.",
    heroLede: "Alkuperäisiä akryylimaalauksia kankaalle. Osa on myynnissä, ja teen myös tilaustöitä.",

    viewPaintings: "Katso maalaukset",

    workTitle: "Teokset",
    filterAll: "Kaikki",
    filterAvailable: "Myynnissä",
    filterSold: "Myydyt",
    filterCommission: "Tilaustyöt",
    filterLabel: "Suodata teoksia",
    countOne: "{n} maalaus",
    countMany: "{n} maalausta",

    statusAvailable: "Myynnissä",
    statusSold: "Myyty",
    statusCommission: "Tilaustyö",

    aboutTitle: "Minusta",
    aboutP1: "Moi, olen Ava. Maalaan enimmäkseen akryyleillä. Tykkään vahvoista väreistä ja paksuista maalikerroksista, ja siitä, että maalaus näyttää aamulla erilaiselta kuin illalla.",
    aboutP2: "Moni maalaukseni lähtee liikkeelle jostain todellisesta, kuten paikasta tai kasvoista, ja muuttuu abstraktimmaksi matkan varrella.",
    aboutDetailAlt: "Lähikuva Avan maalauksesta Earthly Echo: kerroksittaisia vihreitä, kermanvaaleita ja vaaleanpunaisia siveltimenvetoja.",
    aboutDetailCaption: "Yksityiskohta · Earthly Echo",
    aboutNamesLabel: "Maalaukset",
    aboutEndTitle: "Haluaisitko oman maalauksen?",

    contactTitle: "Ota yhteyttä",
    copyEmailLong: "tai kopioi sähköpostiosoite",
    copied: "Kopioitu",
    contactText: "Haluaisitko jonkin näistä maalauksista tai teoksen juuri sinulle? Laita viestiä.",
    formFirstName: "Etunimi",
    formLastName: "Sukunimi",
    formEmail: "Sähköposti",
    formEmailHint: "nimi@esimerkki.fi",
    formMessage: "Viesti",
    formMessageHint: "Mistä maalauksesta olet kiinnostunut, tai mitä haluaisit maalattavan: koko, värit ja mihin se tulee.",
    formTopic: "Mitä asia koskee?",
    topicForSale: "Myynnissä oleva maalaus",
    topicCommission: "Tilaustyö",
    topicOther: "Jokin muu",
    formSend: "Lähetä viesti",
    formFillIn: "Täytä tämä kenttä.",
    formEmailCheck: "Tarkista sähköpostiosoite.",
    formSendNote: "Tämä avaa sähköpostiohjelmasi, ja viesti on valmiina lähetettäväksi.",
    copy: "Kopioi",
    mailSubject: "Viesti verkkosivuiltasi",
    mailName: "Nimi",
    mailTopic: "Aihe",
    panelStatement: "Jokainen maalaus on ainutlaatuinen.",

    footer: "Kysythän luvan ennen kuin käytät maalauksia tai kuvia.",

    lightboxLabel: "Teoksen tiedot",
    close: "Sulje",
    previous: "Edellinen teos",
    next: "Seuraava teos",
    prevShort: "Edellinen",
    nextShort: "Seuraava",
    factMedium: "Tekniikka",
    factSize: "Koko",
    factYear: "Vuosi",
    stripLabel: "Kaikki teokset",
    askThis: "Kysy tästä maalauksesta",
    askSimilar: "Kysy samanlaista teosta",
    askSubject: "Maalaus: {title}",
    askBodyThis: "Hei Ava,\n\nolen kiinnostunut maalauksesta {title}.\n\n",
    askBodySimilar: "Hei Ava,\n\nnäin maalauksesi {title} ja haluaisin jotain samanlaista.\n\n",
    languageLabel: "Kieli",
  },
};
