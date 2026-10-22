// Shared by every page: index.html (front page), gallery.html (all paintings),
// about.html and contact.html. The header, menu, footer and painting view are
// built here once, so they only need changing in one place.

const PAGE = document.body.dataset.page || "home"; // "home", "gallery", "about" or "contact"

// ---- Header, menu, footer and painting view ----

const NAV = [
  ["./", "navHome", "home"],
  ["gallery.html", "navGallery", "gallery"],
  ["about.html", "navAbout", "about"],
  ["contact.html", "navContact", "contact"],
];

document.body.insertAdjacentHTML("afterbegin", `
  <header class="site-header">
    <a class="wordmark" href="./" data-page="./">Ava</a>
    <div class="header-right">
      <!-- Desktop: every page in the top row. Phones use the menu button instead. -->
      <nav class="header-nav" aria-label="Site">
        ${NAV.map(([href, key, page]) => `<a href="${href}" data-page="${href}" data-i18n="${key}"${page === PAGE ? ' aria-current="page"' : ""}></a>`).join("")}
      </nav>
      <div class="lang-switch" role="group" aria-label="Language" data-i18n-aria-label="languageLabel">
        <button type="button" data-lang="en" lang="en" aria-pressed="true">EN</button>
        <button type="button" data-lang="fi" lang="fi" aria-pressed="false">FI</button>
      </div>
      <button type="button" class="menu-button" id="menu-open" aria-haspopup="dialog" aria-controls="site-menu" aria-label="Menu" data-i18n-aria-label="menuOpen">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
      </button>
    </div>
  </header>
  <dialog class="site-menu" id="site-menu" aria-label="Menu" data-i18n-aria-label="menuOpen">
    <div class="menu-bar">
      <a class="wordmark" href="./" data-page="./">Ava</a>
      <button type="button" class="chip" id="menu-close"><span data-i18n="close">Close</span> <span aria-hidden="true">×</span></button>
    </div>
    <nav class="menu-links" aria-label="Site">
      ${NAV.map(([href, key, page]) => `<a href="${href}" data-page="${href}" data-i18n="${key}"${page === PAGE ? ' aria-current="page"' : ""}></a>`).join("")}
    </nav>
    <p class="menu-foot"><a data-instagram target="_blank" rel="noopener">Instagram →</a></p>
  </dialog>`);

document.body.insertAdjacentHTML("beforeend", `
  <footer class="site-footer">
    <p class="legal">© <span id="year"></span> Ava · <span data-i18n="footer"></span></p>
    <a class="footer-ig" data-instagram target="_blank" rel="noopener">Instagram</a>
  </footer>

  <!-- Painting view: the painting on its mount, a wall label beside it, and a strip of all paintings -->
  <dialog class="lightbox" id="lightbox" aria-label="Painting details" data-i18n-aria-label="lightboxLabel">
    <div class="lb-bar">
      <span class="lb-count" id="lb-count" aria-live="polite"></span>
      <div class="lb-bar-actions">
        <button type="button" class="chip lb-bar-step" data-step="-1" aria-label="Previous painting" data-i18n-aria-label="previous"><span aria-hidden="true">←</span></button>
        <button type="button" class="chip lb-bar-step" data-step="1" aria-label="Next painting" data-i18n-aria-label="next"><span aria-hidden="true">→</span></button>
        <button type="button" class="chip lb-close" id="lb-close"><span data-i18n="close">Close</span> <span aria-hidden="true">×</span></button>
      </div>
    </div>
    <div class="lb-stage">
      <figure class="lb-figure">
        <div class="lb-mount mount"><img id="lb-img" alt=""></div>
      </figure>
      <div class="lb-label">
        <p class="badge" id="lb-status"></p>
        <h3 class="lb-title" id="lb-title"></h3>
        <dl class="lb-facts">
          <div id="lb-medium-row"><dt data-i18n="factMedium">Medium</dt><dd id="lb-medium"></dd></div>
          <div id="lb-size-row"><dt data-i18n="factSize">Size</dt><dd id="lb-size"></dd></div>
          <div id="lb-year-row"><dt data-i18n="factYear">Year</dt><dd id="lb-year"></dd></div>
        </dl>
        <p class="lb-desc" id="lb-desc"></p>
        <a class="lb-ask" id="lb-ask" href="#"></a>
        <button type="button" class="lb-copy copy-email"><span data-i18n="copyEmailLong" aria-live="polite"></span></button>
        <div class="lb-steps">
          <button type="button" class="chip" id="lb-prev" aria-label="Previous painting" data-i18n-aria-label="previous"><span aria-hidden="true">←</span> <span data-i18n="prevShort">Previous</span></button>
          <button type="button" class="chip" id="lb-next" aria-label="Next painting" data-i18n-aria-label="next"><span data-i18n="nextShort">Next</span> <span aria-hidden="true">→</span></button>
        </div>
      </div>
    </div>
    <nav class="lb-strip" id="lb-strip" aria-label="All paintings" data-i18n-aria-label="stripLabel"></nav>
  </dialog>`);

// Email and Instagram links everywhere come from js/site.js
document.querySelectorAll("a[data-email]").forEach((a) => {
  a.href = `mailto:${SITE.email}`;
  if (a.hasAttribute("data-email-text")) a.textContent = SITE.email;
});
document.querySelectorAll("a[data-instagram]").forEach((a) => {
  a.href = SITE.instagram;
  // "@artbyavalaitila", taken from the end of the Instagram link
  if (a.hasAttribute("data-instagram-text")) a.textContent = "@" + SITE.instagram.replace(/\/+$/, "").split("/").pop();
});

const siteMenu = document.getElementById("site-menu");
document.getElementById("menu-open").addEventListener("click", () => siteMenu.showModal());
document.getElementById("menu-close").addEventListener("click", () => siteMenu.close());
siteMenu.addEventListener("click", (e) => { if (e.target === siteMenu) siteMenu.close(); });
// The menu is for phones; close it if the window grows to desktop width
matchMedia("(min-width: 760px)").addEventListener("change", (e) => { if (e.matches && siteMenu.open) siteMenu.close(); });

const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbTitle = document.getElementById("lb-title");
const lbCount = document.getElementById("lb-count");
const lbStrip = document.getElementById("lb-strip");
const lbFacts = {
  medium: [document.getElementById("lb-medium-row"), document.getElementById("lb-medium")],
  size: [document.getElementById("lb-size-row"), document.getElementById("lb-size")],
  year: [document.getElementById("lb-year-row"), document.getElementById("lb-year")],
};
const lbDesc = document.getElementById("lb-desc");
const lbStatus = document.getElementById("lb-status");
const lbAsk = document.getElementById("lb-ask");

const EMAIL = SITE.email;
// Front page: one of the paintings marked `highlight: true` in js/paintings.js,
// a different one on each visit
const HIGHLIGHTS = PAINTINGS.filter((p) => p.highlight);
const HOME_PAINTING = HIGHLIGHTS.length ? HIGHLIGHTS[Math.floor(Math.random() * HIGHLIGHTS.length)] : PAINTINGS[0];

const STATUS_KEY = { available: "statusAvailable", sold: "statusSold", commission: "statusCommission" };
const LANGS = Object.keys(TRANSLATIONS);

let lang = "en";
let lbList = PAINTINGS; // the paintings the painting view steps through
let current = 0;

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Site text in the current language, falling back to English.
function t(key) {
  return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? "";
}

// A painting field in the current language, e.g. field(p, "title") reads titleFi in Finnish.
function field(p, name) {
  return (lang === "fi" && p[name + "Fi"]) || p[name] || "";
}

function statusLabel(status) {
  return STATUS_KEY[status] ? t(STATUS_KEY[status]) : status || "";
}

// "Available · 350 €" when a price is set, otherwise just the status.
function statusText(p) {
  const label = statusLabel(p.status);
  return p.status === "available" && p.price ? `${label} · ${p.price}` : label;
}

// "2026 · 60 × 80 cm"
function metaLine(p) {
  return [p.year, p.size].filter(Boolean).join(" · ");
}

function badgeHtml(p) {
  return p.status ? `<span class="badge ${escapeHtml(p.status)}">${escapeHtml(statusText(p))}</span>` : "";
}

// ---- Front page: one painting beside the statement ----

const homeImg = document.getElementById("home-img");

function renderHome() {
  if (!homeImg) return;
  const p = HOME_PAINTING;
  homeImg.src = p.image;
  // First time only: slide the painting in from the right once its picture has loaded.
  // On a very slow connection (over 3 s) it just appears in place instead, without sliding.
  const figure = homeImg.closest(".home-painting.is-waiting");
  if (figure) {
    let settled = false;
    const finish = (how) => {
      if (settled) return;
      settled = true;
      if (how === "slide") figure.classList.replace("is-waiting", "is-sliding");
      else figure.classList.remove("is-waiting");
    };
    homeImg.decode().then(() => finish("slide"), () => finish("appear"));
    setTimeout(() => finish("appear"), 3000);
  }
  homeImg.alt = field(p, "title");
  document.getElementById("home-title").textContent = field(p, "title");
  // "Acrylic on canvas, 80 × 100 cm, 2026"
  document.getElementById("home-meta").textContent = [field(p, "medium"), p.size, p.year].filter(Boolean).join(", ");
  const status = document.getElementById("home-status");
  status.className = `badge ${p.status || ""}`;
  status.textContent = statusText(p);
  status.hidden = !p.status;
}

document.getElementById("home-open")?.addEventListener("click", () => {
  openLightbox(PAINTINGS, PAINTINGS.indexOf(HOME_PAINTING));
});

// ---- Contact page: the form and the painting beside it ----
const contactPanel = document.querySelector(".contact-panel");
const PANEL_PAINTING = contactPanel && PAINTINGS.find((p) => p.image === contactPanel.dataset.paintingImage);

function renderContact() {
  if (!PANEL_PAINTING) return;
  document.getElementById("panel-title").textContent = field(PANEL_PAINTING, "title");
  document.getElementById("panel-meta").textContent = [field(PANEL_PAINTING, "medium"), PANEL_PAINTING.size].filter(Boolean).join(", ");
}

// The site has no server, so the form writes the email and hands it to the visitor's email app
const contactForm = document.getElementById("contact-form");
// Warnings in the site's language (the browser's own would follow the browser's language),
// and a name or message of only spaces doesn't count as filled in
const requiredFields = contactForm ? [contactForm.first, contactForm.email, contactForm.message] : [];
requiredFields.forEach((field) => field.addEventListener("input", () => field.setCustomValidity("")));

function checkContactForm() {
  requiredFields.forEach((field) => {
    field.setCustomValidity("");
    if (!field.value.trim()) field.setCustomValidity(t("formFillIn"));
    else if (field.validity.typeMismatch) field.setCustomValidity(t("formEmailCheck"));
  });
  return contactForm.reportValidity();
}

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!checkContactForm()) return;
  const data = new FormData(contactForm);
  const name = [data.get("first"), data.get("last")].map((v) => String(v).trim()).filter(Boolean).join(" ");
  const topics = data.getAll("topic").map((key) => t(key));
  const lines = [
    String(data.get("message")).trim(),
    "",
    "—",
    `${t("mailName")}: ${name}`,
    `${t("formEmail")}: ${String(data.get("email")).trim()}`,
  ];
  if (topics.length) lines.push(`${t("mailTopic")}: ${topics.join(", ")}`);
  const subject = topics.length ? `${t("mailSubject")}: ${topics.join(", ")}` : t("mailSubject");
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
});

// ---- About page: drifting paintings, painting names and the scroll animations ----
const aboutDrift = document.getElementById("about-drift");
const aboutNames = document.getElementById("about-names");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const clamp01 = (n) => Math.min(1, Math.max(0, n));

// Rows of 5, 3 and 1 paintings; the single one is the first highlight
const DRIFT_BIG = PAINTINGS.find((p) => p.highlight) || PAINTINGS[0];
const DRIFT_REST = PAINTINGS.filter((p) => p !== DRIFT_BIG);
const DRIFT_ROWS = [DRIFT_REST.slice(0, 5), DRIFT_REST.slice(5, 8), [DRIFT_BIG]];
const DRIFT_SPEED = [0.08, 0.2, 0.16]; // how far each row lags behind the page as it scrolls (the big one less than the row above, so it never catches up)

// The drifting paintings are only fetched when the dark room is near the screen,
// so the page opens with just the big picture at the top (much lighter on phones)
let driftLoaded = false;
function loadDrift() {
  driftLoaded = true;
  aboutDrift.querySelectorAll("img[data-src]").forEach((img) => { img.src = img.dataset.src; img.removeAttribute("data-src"); });
}
if (aboutDrift) {
  const near = new IntersectionObserver((entries) => {
    if (entries.some((en) => en.isIntersecting)) { loadDrift(); near.disconnect(); }
  }, { rootMargin: "300px 0px" }); // start fetching when the room is 300px below the screen
  near.observe(aboutDrift);
}

function renderAbout() {
  if (!aboutDrift) return;
  aboutDrift.innerHTML = DRIFT_ROWS.map((row, r) => `
    <div class="drift-row drift-row-${row.length}" data-speed="${DRIFT_SPEED[r]}">
      ${row.map((p) => `
        <button type="button" class="drift-item" data-index="${PAINTINGS.indexOf(p)}" aria-label="${escapeHtml(field(p, "title"))}">
          <span class="drift-frame"><img ${driftLoaded ? "src" : "data-src"}="${escapeHtml(p.image)}" alt=""></span>
        </button>`).join("")}
    </div>`).join("");
  aboutNames.innerHTML = PAINTINGS.map((p, i) =>
    `<li><button type="button" class="name-line" data-index="${i}">${escapeHtml(field(p, "title"))}</button></li>`).join("");
  updateAbout();
}

[aboutDrift, aboutNames].forEach((el) => el?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-index]");
  if (btn) openLightbox(PAINTINGS, Number(btn.dataset.index));
}));

// Scroll animations: the opening picture grows to full width (--p 0 → 1),
// the rows of paintings drift, the closing card shrinks into the page (--p 0 → 1)
const aboutGrow = document.querySelector("[data-grow]");
const aboutShrink = document.querySelector("[data-shrink]");

function updateAbout() {
  if (!aboutGrow) return;
  const vh = innerHeight;
  if (reducedMotion.matches) {
    aboutGrow.style.setProperty("--p", 1);
    aboutShrink.style.setProperty("--p", 0.5);
    aboutDrift.querySelectorAll(".drift-row").forEach((row) => { row.style.transform = ""; });
    aboutDrift.querySelectorAll(".drift-item").forEach((item) => { item.style.transform = ""; item.style.opacity = ""; });
    return;
  }
  aboutGrow.style.setProperty("--p", clamp01(scrollY / (vh * 0.45)).toFixed(3));
  aboutShrink.style.setProperty("--p", clamp01(1 - aboutShrink.getBoundingClientRect().top / vh).toFixed(3));
  const box = aboutDrift.getBoundingClientRect();
  const fromCentre = box.top + box.height / 2 - vh / 2;
  aboutDrift.querySelectorAll(".drift-row").forEach((row) => {
    row.style.transform = `translate3d(0, ${(fromCentre * Number(row.dataset.speed)).toFixed(1)}px, 0)`;
    // Drop: the paintings are let down on their strings as the row comes up the screen,
    // one a little after another. The first row comes from above the room, out of sight;
    // the rows below drop a shorter way and fade in, so they never pass over the row above.
    const rowTop = box.top + row.offsetTop;
    const items = [...row.children];
    const first = row === row.parentElement.firstElementChild;
    // The lower rows are fully down and bright once their top is about 72% of the way down the screen
    const reach = clamp01((vh * 0.98 - rowTop) / (vh * (first ? 0.5 : 0.26)));
    const stagger = items.length > 1 ? 0.3 : 0;
    items.forEach((item, i) => {
      const own = clamp01((reach - (stagger * i) / (items.length - 1 || 1)) / (1 - stagger));
      const eased = 1 - (1 - own) ** 3;
      const lift = first ? row.offsetTop + item.offsetTop + item.offsetHeight + 60 : Math.min(160, vh * 0.18);
      item.style.transform = eased >= 1 ? "" : `translate3d(0, ${(-(1 - eased) * lift).toFixed(1)}px, 0)`;
      item.style.opacity = first || eased >= 1 ? "" : (own ** 1.5).toFixed(3);
    });
  });
}

if (aboutGrow) {
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; updateAbout(); });
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  reducedMotion.addEventListener("change", updateAbout);

  // Text fades up as it comes into view
  document.documentElement.classList.add("has-reveal");
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
  }), { rootMargin: "0px 0px -12% 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

// Hovering a painting name slides that painting in from the other side of the page,
// level with the name. Each new name gets its own picture: the old one slides back out
// while the new one comes in, even on the same side (mouse only).
if (aboutNames && matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const section = aboutNames.closest(".about-names");
  let shown = null;
  const slideOut = (el) => {
    el.classList.remove("is-on");
    setTimeout(() => el.remove(), 700);
  };
  aboutNames.addEventListener("pointerover", (e) => {
    const btn = e.target.closest(".name-line");
    if (!btn || shown?.dataset.index === btn.dataset.index) return;
    const name = btn.getBoundingClientRect();
    const box = section.getBoundingClientRect();
    // A name on the left half brings the painting in from the right, and the other way round
    const fromRight = name.left + name.width / 2 <= box.left + box.width / 2;
    if (shown) slideOut(shown);
    const el = document.createElement("div");
    el.className = `name-slide name-slide-${fromRight ? "right" : "left"}`;
    el.dataset.index = btn.dataset.index;
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `<img src="${escapeHtml(PAINTINGS[btn.dataset.index].image)}" alt="">`;
    el.style.top = `${name.top - box.top + name.height / 2}px`;
    section.append(el);
    void el.offsetHeight; // start from off-screen, then slide
    el.classList.add("is-on");
    shown = el;
  });
  aboutNames.addEventListener("pointerout", (e) => {
    if (shown && !e.relatedTarget?.closest?.(".name-line")) { slideOut(shown); shown = null; }
  });
}

// ---- Gallery page: every painting, with filters ----

const gallery = document.getElementById("gallery");
const filtersEl = document.getElementById("filters");
const countEl = document.getElementById("work-count");
let visible = PAINTINGS;
let activeFilter = "all"; // "all" or a painting status: "available" / "sold" / "commission"

function filterPaintings() {
  visible = activeFilter === "all" ? PAINTINGS : PAINTINGS.filter((p) => p.status === activeFilter);
}

// All / Available / Sold / Commissioned. A status button only appears if some painting has that status.
function renderFilters() {
  if (!filtersEl) return;
  const options = [["all", t("filterAll")], ["available", t("filterAvailable")], ["sold", t("filterSold")], ["commission", t("filterCommission")]]
    .filter(([key]) => key === "all" || PAINTINGS.some((p) => p.status === key));
  if (options.length < 2) { filtersEl.innerHTML = ""; return; }

  filtersEl.innerHTML = options
    .map(([key, label]) => `<button type="button" aria-pressed="${key === activeFilter}" data-filter="${escapeHtml(key)}">${escapeHtml(label)}</button>`)
    .join("");
}

filtersEl?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  activeFilter = btn.dataset.filter;
  filtersEl.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b === btn));
  filterPaintings();
  renderCount();
  renderGallery(true);
});

// "11 paintings · 2022–2026", counted from the paintings currently shown.
function renderCount() {
  if (!countEl) return;
  const n = visible.length;
  const years = visible.map((p) => Number(p.year)).filter(Boolean);
  const min = Math.min(...years), max = Math.max(...years);
  const range = years.length ? (min === max ? ` · ${min}` : ` · ${min}–${max}`) : "";
  countEl.textContent = t(n === 1 ? "countOne" : "countMany").replace("{n}", n) + range;
}

const MIN_COL_WIDTH = 300;

function columnCount() {
  const gap = parseFloat(getComputedStyle(gallery).columnGap) || 0;
  // At most two columns, as on Julia Ulrich's painting pages
  return Math.max(1, Math.min(2, Math.floor((gallery.clientWidth + gap) / (MIN_COL_WIDTH + gap))));
}

let renderedCols = 0;

function cardHtml(p, i) {
  return `
    <button type="button" class="card" data-index="${i}" style="--i:${Math.min(i, 8)}">
      <div class="frame mount"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(field(p, "title"))}" ${i < 3 ? 'loading="eager"' : 'loading="lazy"'}${i === 0 ? ' fetchpriority="high"' : ""}></div>
      <div class="label">
        <div class="label-top">
          <h3 class="label-title">${escapeHtml(field(p, "title"))}</h3>
          ${badgeHtml(p)}
        </div>
        <span class="label-meta">${escapeHtml(metaLine(p))}</span>
      </div>
    </button>`;
}

// Deal paintings left-to-right into columns so the first row holds
// paintings 1 and 2 in order. `animate` fades the cards in: only on first
// load and when a filter changes, not on language switch or resize.
let enterTimer;
function renderGallery(animate = false) {
  if (!gallery) return;
  renderedCols = columnCount();
  const cols = Array.from({ length: renderedCols }, () => []);
  visible.forEach((p, i) => cols[i % renderedCols].push(cardHtml(p, i)));
  // "rise" (page just opened): the slow rise, like the About title; true (filter changed): a quick fade
  const enterClass = animate === "rise" ? "is-rising" : "is-entering";
  clearTimeout(enterTimer);
  gallery.classList.remove("is-rising", "is-entering");
  if (animate) gallery.classList.add(enterClass);
  gallery.innerHTML = cols.map((c) => `<div class="col">${c.join("")}</div>`).join("");
  if (animate) enterTimer = setTimeout(() => gallery.classList.remove(enterClass), animate === "rise" ? 2600 : 1000);
}

window.addEventListener("resize", () => {
  if (gallery && columnCount() !== renderedCols) renderGallery();
});

gallery?.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (card) openLightbox(visible, Number(card.dataset.index));
});

// ---- Painting view ----

function show(i) {
  current = (i + lbList.length) % lbList.length;
  const p = lbList[current];
  const title = field(p, "title");

  // Fade the new painting in once it has loaded
  lbImg.classList.remove("is-loaded");
  lbImg.onload = () => lbImg.classList.add("is-loaded");
  lbImg.src = p.image;
  if (lbImg.complete && lbImg.naturalWidth) lbImg.classList.add("is-loaded");
  lbImg.alt = title;

  lbTitle.textContent = title;
  setPaintingLink(p);
  lbCount.textContent = `${current + 1} / ${lbList.length}`;
  const facts = { medium: field(p, "medium"), size: p.size, year: p.year };
  for (const [key, [row, cell]] of Object.entries(lbFacts)) {
    cell.textContent = facts[key] || "";
    row.hidden = !facts[key];
  }
  lbDesc.textContent = field(p, "description");
  lbDesc.hidden = !lbDesc.textContent;
  lbStatus.textContent = statusText(p);
  lbStatus.className = `badge ${p.status || ""}`;
  lbStatus.hidden = !p.status;

  lbStrip.querySelectorAll("button").forEach((b, n) => {
    const on = n === current;
    b.toggleAttribute("aria-current", on);
    // Scroll only the strip sideways, never the page
    if (on) lbStrip.scrollTo({ left: b.offsetLeft - (lbStrip.clientWidth - b.offsetWidth) / 2 });
  });

  // For sale: ask about this one. Sold or a commission: ask for something similar.
  const forSale = p.status === "available";
  const fill = (key) => t(key).replace("{title}", title);
  lbAsk.textContent = t(forSale ? "askThis" : "askSimilar");
  lbAsk.href = `mailto:${EMAIL}?subject=${encodeURIComponent(fill("askSubject"))}&body=${encodeURIComponent(fill(forSale ? "askBodyThis" : "askBodySimilar"))}`;
}

// Thumbnails of every painting in the current list, to jump between them
function renderStrip() {
  lbStrip.innerHTML = lbList
    .map((p, n) => `<button type="button" data-n="${n}" aria-label="${escapeHtml(field(p, "title"))}"><img src="${escapeHtml(p.image)}" alt="" loading="lazy"></button>`)
    .join("");
}

lbStrip.addEventListener("click", (e) => {
  const b = e.target.closest("button[data-n]");
  if (b) show(Number(b.dataset.n));
});

// ---- Painting links ----
// Each painting has its own link, e.g. …/gallery.html#the-lost-bride, made from
// its English title. Opening a painting adds one step to the browser history, so the
// phone's back button closes the painting instead of leaving the site.

function slug(p) {
  return String(p.title || p.image).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function paintingFromHash() {
  let h = "";
  try { h = decodeURIComponent(location.hash.slice(1)); } catch { return undefined; } // a broken link: just show the page
  return h ? PAINTINGS.find((p) => slug(p) === h) : undefined;
}

function urlWithHash(hash) {
  const url = new URL(location.href);
  url.hash = hash;
  return url;
}

let pushedHistory = false; // did opening the painting add a history step?
let closingFromHistory = false;

function setPaintingLink(p) {
  if (!lightbox.open) return;
  const url = urlWithHash(slug(p));
  if (!pushedHistory) {
    history.pushState({ painting: true }, "", url);
    pushedHistory = true;
  } else {
    // Stepping between paintings replaces the link, so back still closes the view
    history.replaceState(history.state, "", url);
  }
}

lightbox.addEventListener("close", () => {
  if (closingFromHistory) { closingFromHistory = false; return; }
  if (pushedHistory) history.back();
  else history.replaceState(null, "", urlWithHash(""));
  pushedHistory = false;
});

window.addEventListener("popstate", () => {
  // Keep the address on the language the visitor picked, even on an older history step
  const url = new URL(location.href);
  if (url.searchParams.has("lang") && url.searchParams.get("lang") !== lang) {
    url.searchParams.set("lang", lang);
    history.replaceState(history.state, "", url);
  }
  const p = paintingFromHash();
  if (p && !lightbox.open) openLightbox(PAINTINGS, PAINTINGS.indexOf(p), "history");
  else if (!p && lightbox.open) {
    pushedHistory = false;
    closingFromHistory = true;
    lightbox.close();
  }
});

// source: "click" (from the page), "link" (page opened with a painting link)
// or "history" (back/forward landed on a painting)
function openLightbox(list, i, source = "click") {
  lbList = list;
  renderStrip();
  if (source === "history" && history.state?.painting) {
    pushedHistory = true; // we're on the step added earlier, so back closes it
  } else {
    if (source !== "click") history.replaceState(null, "", urlWithHash("")); // page underneath
    pushedHistory = false; // show() adds the painting step
  }
  lightbox.showModal();
  lightbox.scrollTop = 0;
  show(i);
}

document.getElementById("lb-close").addEventListener("click", () => lightbox.close());
document.getElementById("lb-prev").addEventListener("click", () => show(current - 1));
document.getElementById("lb-next").addEventListener("click", () => show(current + 1));
document.querySelectorAll(".lb-bar-step").forEach((b) => b.addEventListener("click", () => show(current + Number(b.dataset.step))));

// Clicking the empty wall around the painting closes the view
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.matches(".lb-stage, .lb-figure")) lightbox.close();
});
lightbox.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});

// Swipe between paintings on phones
let touchX = null;
lightbox.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  touchX = null;
});

// ---- Copy email ----
// Copies the address and says "Copied" for a moment, in place

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch {}
  const area = Object.assign(document.createElement("textarea"), { value: text });
  area.style.position = "fixed"; area.style.opacity = "0";
  (lightbox.open ? lightbox : document.body).append(area);
  area.select();
  const ok = document.execCommand("copy");
  area.remove();
  return ok;
}

document.querySelectorAll(".copy-email").forEach((btn) => {
  const label = btn.querySelector("[data-i18n]");
  let timer;
  btn.addEventListener("click", async () => {
    if (!(await copyText(EMAIL))) return;
    clearTimeout(timer);
    btn.classList.add("is-copied");
    label.textContent = t("copied");
    timer = setTimeout(() => { btn.classList.remove("is-copied"); label.textContent = t(label.dataset.i18n); }, 2000);
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// ---- Language ----

function initialLang() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (LANGS.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem("lang");
    if (LANGS.includes(saved)) return saved;
  } catch {}
  // The visitor's most preferred language that the site has.
  for (const l of navigator.languages || [navigator.language]) {
    const base = String(l).slice(0, 2).toLowerCase();
    if (LANGS.includes(base)) return base;
  }
  return "en";
}

// Links between the two pages keep the chosen language, e.g. gallery.html?lang=fi
function updatePageLinks() {
  document.querySelectorAll("a[data-page]").forEach((a) => {
    a.href = `${a.dataset.page}?lang=${lang}${a.dataset.hash ? "#" + a.dataset.hash : ""}`;
  });
}

let firstRender = true;

function setLanguage(next, remember) {
  lang = LANGS.includes(next) ? next : "en";
  document.documentElement.lang = lang;
  const suffix = { gallery: "Gallery", about: "About", contact: "Contact" }[PAGE] || "";
  const titleKey = "pageTitle" + suffix;
  const descKey = "pageDescription" + suffix;
  document.title = t(titleKey);
  document.querySelector('meta[name="description"]').content = t(descKey);

  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => { el.alt = t(el.dataset.i18nAlt); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAriaLabel)); });
  document.querySelectorAll(".lang-switch button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));
  updatePageLinks();

  renderHome();
  renderContact();
  renderAbout();
  renderFilters();
  renderCount();
  renderGallery(firstRender ? "rise" : false);
  firstRender = false;
  if (lightbox.open) { renderStrip(); show(current); }

  if (remember) {
    try { localStorage.setItem("lang", lang); } catch {}
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(history.state, "", url);
  }
}

document.querySelector(".lang-switch").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-lang]");
  if (btn && btn.dataset.lang !== lang) setLanguage(btn.dataset.lang, true);
});

setLanguage(initialLang(), false);

// Opened from a painting link: show that painting straight away
const linked = paintingFromHash();
if (linked) openLightbox(PAINTINGS, PAINTINGS.indexOf(linked), "link");
