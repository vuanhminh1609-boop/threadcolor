const MIN_STOPS = 2;
const MAX_STOPS = 7;

const state = {
  palettes: [],
  hashPalette: null
};

const el = {
  grid: document.getElementById("paletteGrid"),
  empty: document.getElementById("paletteEmpty")
};

function normalizeHex(input) {
  if (!input) return null;
  let value = String(input).trim();
  if (!value) return null;
  if (!value.startsWith("#")) value = `#${value}`;
  value = value.toLowerCase();
  return /^#[0-9a-f]{6}$/.test(value) ? value : null;
}

function gradientCss(stops) {
  const total = stops.length;
  if (total <= 1) return stops[0] || "#000000";
  const parts = stops.map((hex, idx) => {
    const pct = Math.round((idx / (total - 1)) * 100);
    return `${hex} ${pct}%`;
  });
  return `linear-gradient(90deg, ${parts.join(", ")})`;
}

function tokensFor(stops) {
  return stops
    .map((hex, idx) => `  --mau-${String(idx + 1).padStart(2, "0")}: ${hex};`)
    .join("\n");
}

function exportText(palette) {
  const name = palette.ten || "Bảng phối màu";
  const stops = palette.stops || [];
  return `/* ${name} */\nHex: ${stops.join(", ")}\n\n:root {\n${tokensFor(stops)}\n}\n`;
}

function showToast(message) {
  let toast = document.getElementById("paletteToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "paletteToast";
    toast.className = "tc-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1400);
}

async function copyText(text) {
  if (!text) return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (_err) {
    // fallback below
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    return true;
  } catch (_err) {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

function renderPaletteCard(palette) {
  const card = document.createElement("div");
  card.className = "tc-card p-4 flex flex-col gap-3";

  const header = document.createElement("div");
  header.className = "flex items-start justify-between gap-3";

  const meta = document.createElement("div");
  const title = document.createElement("p");
  title.className = "text-sm font-semibold";
  title.textContent = palette.ten || "Bảng phối màu";
  const tags = document.createElement("p");
  tags.className = "tc-muted text-xs mt-1";
  tags.textContent = (palette.tags || []).join(" · ");
  meta.appendChild(title);
  meta.appendChild(tags);

  const actions = document.createElement("div");
  actions.className = "flex flex-wrap gap-2";

  const exportBtn = document.createElement("button");
  exportBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  exportBtn.type = "button";
  exportBtn.textContent = "Xuất";
  exportBtn.addEventListener("click", async () => {
    const ok = await copyText(exportText(palette));
    showToast(ok ? "Đã sao chép bảng phối." : "Không thể sao chép.");
  });

  const bridgeBtn = document.createElement("button");
  bridgeBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  bridgeBtn.type = "button";
  bridgeBtn.textContent = "Biến thành dải";
  bridgeBtn.addEventListener("click", () => {
    const stops = (palette.stops || []).join(",");
    window.location.href = `gradient.html#g=${encodeURIComponent(stops)}`;
  });

  actions.appendChild(exportBtn);
  actions.appendChild(bridgeBtn);

  header.appendChild(meta);
  header.appendChild(actions);

  const swatchRow = document.createElement("div");
  swatchRow.className = "tc-swatch-row";

  (palette.stops || []).forEach((hex) => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className = "tc-swatch";
    swatch.style.background = hex;
    swatch.textContent = hex.toUpperCase();
    swatch.addEventListener("click", async () => {
      const ok = await copyText(hex.toUpperCase());
      showToast(ok ? `Đã sao chép ${hex.toUpperCase()}` : "Không thể sao chép.");
    });
    swatchRow.appendChild(swatch);
  });

  const strip = document.createElement("div");
  strip.className = "tc-strip";
  strip.style.background = gradientCss(palette.stops || []);

  card.appendChild(header);
  card.appendChild(swatchRow);
  card.appendChild(strip);

  return card;
}

function renderPalettes() {
  if (!el.grid || !el.empty) return;
  el.grid.innerHTML = "";
  const list = [...state.palettes];
  if (state.hashPalette) {
    list.unshift(state.hashPalette);
  }
  if (!list.length) {
    el.empty.classList.remove("hidden");
    return;
  }
  el.empty.classList.add("hidden");
  list.forEach((palette) => {
    el.grid.appendChild(renderPaletteCard(palette));
  });
}

function getHashStops(key) {
  const hash = (window.location.hash || "").replace("#", "");
  if (!hash) return null;
  const params = new URLSearchParams(hash);
  const raw = params.get(key);
  if (!raw) return null;
  const stops = raw.split(",").map((s) => normalizeHex(s)).filter(Boolean);
  if (stops.length >= MIN_STOPS && stops.length <= MAX_STOPS) {
    return stops;
  }
  return null;
}

function handleBackwardCompatibility() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const hashStops = getHashStops("g");
  if (mode === "gradient" || hashStops) {
    const stops = hashStops ? hashStops.join(",") : "";
    const target = stops ? `gradient.html#g=${encodeURIComponent(stops)}` : "gradient.html";
    window.location.replace(target);
    return true;
  }
  return false;
}

async function loadPalettes() {
  try {
    const res = await fetch("../data/palettes.json", { cache: "no-store" });
    const data = await res.json();
    state.palettes = Array.isArray(data) ? data : [];
  } catch (_err) {
    state.palettes = [];
  }
  renderPalettes();
}

function init() {
  if (handleBackwardCompatibility()) return;
  const stops = getHashStops("p");
  if (stops) {
    state.hashPalette = {
      id: "hash-palette",
      ten: "Palette từ dải chuyển màu",
      tags: ["từ hash"],
      stops
    };
  }
  loadPalettes();
}

init();
