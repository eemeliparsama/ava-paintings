const gallery = document.getElementById("gallery");
const filtersEl = document.getElementById("filters");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbTitle = document.getElementById("lb-title");
const lbMeta = document.getElementById("lb-meta");
const lbDesc = document.getElementById("lb-desc");
const lbStatus = document.getElementById("lb-status");

const STATUS_KEY = { available: "statusAvailable", sold: "statusSold", commission: "statusCommission" };
const LANGS = Object.keys(TRANSLATIONS);

let lang = "en";
let visible = PAINTINGS;
let current = 0;
let activeFilter = "all"; // "all" or a painting status: "available" / "sold" / "commission"

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

function filterPaintings() {
  visible = activeFilter === "all" ? PAINTINGS : PAINTINGS.filter((p) => p.status === activeFilter);
}

// All / Available / Sold / Commissions. A status button only appears if some painting has that status.
function renderFilters() {
  const options = [["all", t("filterAll")], ["available", t("filterAvailable")], ["sold", t("filterSold")], ["commission", t("filterCommission")]]
    .filter(([key]) => key === "all" || PAINTINGS.some((p) => p.status === key));
  if (options.length < 2) { filtersEl.innerHTML = ""; return; }

  filtersEl.innerHTML = options
    .map(([key, label]) => `<button type="button" aria-pressed="${key === activeFilter}" data-filter="${escapeHtml(key)}">${escapeHtml(label)}</button>`)
    .join("");
}

filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  activeFilter = btn.dataset.filter;
  filtersEl.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b === btn));
  filterPaintings();
  renderGallery();
});

const MIN_COL_WIDTH = 300;
const COL_GAP = 28;

function columnCount() {
  return Math.max(1, Math.min(3, Math.floor((gallery.clientWidth + COL_GAP) / (MIN_COL_WIDTH + COL_GAP))));
}

let renderedCols = 0;

function cardHtml(p, i) {
  return `
    <button type="button" class="card" data-index="${i}" style="animation-delay:${Math.min(i, 8) * 60}ms">
      <div class="frame"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(field(p, "title"))}" loading="lazy"></div>
      <div class="info">
        <div>
          <h3>${escapeHtml(field(p, "title"))}</h3>
          <div class="meta">${escapeHtml([p.size, p.year].filter(Boolean).join(" · "))}</div>
        </div>
        ${p.status ? `<span class="badge ${escapeHtml(p.status)}">${escapeHtml(statusLabel(p.status))}</span>` : ""}
      </div>
    </button>`;
}

// Deal paintings left-to-right into columns so the first row holds
// paintings 1, 2, 3 in order.
function renderGallery() {
  renderedCols = columnCount();
  const cols = Array.from({ length: renderedCols }, () => []);
  visible.forEach((p, i) => cols[i % renderedCols].push(cardHtml(p, i)));
  gallery.innerHTML = cols.map((c) => `<div class="col">${c.join("")}</div>`).join("");
}

window.addEventListener("resize", () => {
  if (columnCount() !== renderedCols) renderGallery();
});

function show(i) {
  current = (i + visible.length) % visible.length;
  const p = visible[current];
  lbImg.src = p.image;
  lbImg.alt = field(p, "title");
  lbTitle.textContent = field(p, "title");
  lbMeta.textContent = [field(p, "medium"), p.size, p.year].filter(Boolean).join("\n");
  lbDesc.textContent = field(p, "description");
  lbStatus.textContent =
    p.status === "available" && p.price ? `${statusLabel(p.status)} — ${p.price}` : statusLabel(p.status);
}

gallery.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  show(Number(card.dataset.index));
  lightbox.showModal();
});

document.getElementById("lb-close").addEventListener("click", () => lightbox.close());
document.getElementById("lb-prev").addEventListener("click", () => show(current - 1));
document.getElementById("lb-next").addEventListener("click", () => show(current + 1));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); });
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

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 10), { passive: true });

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

function setLanguage(next, remember) {
  lang = LANGS.includes(next) ? next : "en";
  document.documentElement.lang = lang;
  document.title = t("pageTitle");
  document.querySelector('meta[name="description"]').content = t("pageDescription");

  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => { el.alt = t(el.dataset.i18nAlt); });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAriaLabel)); });
  document.querySelectorAll(".lang-switch button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));

  renderFilters();
  renderGallery();
  if (lightbox.open) show(current);

  if (remember) {
    try { localStorage.setItem("lang", lang); } catch {}
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
  }
}

document.querySelector(".lang-switch").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-lang]");
  if (btn && btn.dataset.lang !== lang) setLanguage(btn.dataset.lang, true);
});

setLanguage(initialLang(), false);
