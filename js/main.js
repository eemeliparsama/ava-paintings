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
document.querySelectorAll("a[data-instagram]").forEach((a) => { a.href = SITE.instagram; });

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
    <button type="button" class="card" data-index="${i}" style="animation-delay:${Math.min(i, 8) * 60}ms">
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
  clearTimeout(enterTimer);
  gallery.classList.toggle("is-entering", animate);
  gallery.innerHTML = cols.map((c) => `<div class="col">${c.join("")}</div>`).join("");
  if (animate) enterTimer = setTimeout(() => gallery.classList.remove("is-entering"), 1000);
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
  const h = decodeURIComponent(location.hash.slice(1));
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
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAriaLabel)); });
  document.querySelectorAll(".lang-switch button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));
  updatePageLinks();

  renderHome();
  renderFilters();
  renderCount();
  renderGallery(firstRender);
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
