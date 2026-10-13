const gallery = document.getElementById("gallery");
const filtersEl = document.getElementById("filters");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbTitle = document.getElementById("lb-title");
const lbMeta = document.getElementById("lb-meta");
const lbDesc = document.getElementById("lb-desc");
const lbStatus = document.getElementById("lb-status");

const STATUS_LABEL = { available: "Available", sold: "Sold", commission: "Commission" };

let visible = PAINTINGS;
let current = 0;

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderFilters() {
  const series = [...new Set(PAINTINGS.map((p) => p.series).filter(Boolean))];
  const options = ["All", ...series];
  if (PAINTINGS.some((p) => p.status === "available")) options.push("Available");
  if (options.length <= 2) return;

  filtersEl.innerHTML = options
    .map((o, i) => `<button type="button" aria-pressed="${i === 0}" data-filter="${escapeHtml(o)}">${escapeHtml(o)}</button>`)
    .join("");

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    filtersEl.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b === btn));
    const f = btn.dataset.filter;
    visible =
      f === "All" ? PAINTINGS :
      f === "Available" ? PAINTINGS.filter((p) => p.status === "available") :
      PAINTINGS.filter((p) => p.series === f);
    renderGallery();
  });
}

function renderGallery() {
  gallery.innerHTML = visible
    .map((p, i) => `
      <button type="button" class="card" data-index="${i}" style="animation-delay:${Math.min(i, 8) * 60}ms">
        <div class="frame"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy"></div>
        <div class="info">
          <div>
            <h3>${escapeHtml(p.title)}</h3>
            <div class="meta">${escapeHtml([p.size, p.year].filter(Boolean).join(" · "))}</div>
          </div>
          ${p.status ? `<span class="badge ${escapeHtml(p.status)}">${STATUS_LABEL[p.status] ?? escapeHtml(p.status)}</span>` : ""}
        </div>
      </button>`)
    .join("");
}

function show(i) {
  current = (i + visible.length) % visible.length;
  const p = visible[current];
  lbImg.src = p.image;
  lbImg.alt = p.title;
  lbTitle.textContent = p.title;
  lbMeta.textContent = [p.medium, p.size, p.year].filter(Boolean).join("\n");
  lbDesc.textContent = p.description || "";
  lbStatus.textContent =
    p.status === "available" ? `Available${p.price ? " — " + p.price : ""}` :
    STATUS_LABEL[p.status] ?? "";
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

renderFilters();
renderGallery();
