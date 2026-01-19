const STORAGE_KEY = "tc_palettes_saved";
const MIN_STOPS = 2;
const MAX_STOPS = 7;

const state = {
  palettes: [],
  saved: [],
  currentStops: ["#ff6b6b", "#ffd93d", "#6ee7b7"],
  currentName: ""
};

const el = {
  tabs: document.querySelectorAll("[data-tab]"),
  panels: document.querySelectorAll("[data-tab-panel]"),
  exploreGrid: document.getElementById("paletteExploreGrid"),
  exploreEmpty: document.getElementById("paletteExploreEmpty"),
  savedGrid: document.getElementById("paletteSavedGrid"),
  savedEmpty: document.getElementById("paletteSavedEmpty"),
  nameInput: document.getElementById("paletteName"),
  stopsWrap: document.getElementById("paletteStops"),
  preview: document.getElementById("palettePreview"),
  hexList: document.getElementById("paletteHexList"),
  btnAdd: document.getElementById("paletteAdd"),
  btnRandom: document.getElementById("paletteRandom"),
  btnExport: document.getElementById("paletteExport"),
  btnSave: document.getElementById("paletteSave"),
  btnLink: document.getElementById("paletteLink")
};

function normalizeHex(input) {
  if (!input) return null;
  let value = String(input).trim();
  if (!value) return null;
  if (!value.startsWith("#")) value = `#${value}`;
  value = value.toLowerCase();
  return /^#[0-9a-f]{6}$/.test(value) ? value : null;
}

function randomHex() {
  const n = Math.floor(Math.random() * 0xffffff);
  return `#${n.toString(16).padStart(6, "0")}`;
}

function gradientFor(stops) {
  return `linear-gradient(90deg, ${stops.join(", ")})`;
}

function tokensFor(stops) {
  return stops
    .map((hex, idx) => `  --mau-${String(idx + 1).padStart(2, "0")}: ${hex};`)
    .join("\n");
}

function exportText(palette) {
  const name = palette.ten || "Dải màu";
  const stops = palette.stops || [];
  return `/* ${name} */\n${gradientFor(stops)}\n\nHex: ${stops.join(
    ", "
  )}\n\n:root {\n${tokensFor(stops)}\n}\n`;
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
  }, 1600);
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

function setActiveTab(tab) {
  el.tabs.forEach((btn) => {
    const active = btn.dataset.tab === tab;
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
  el.panels.forEach((panel) => {
    panel.hidden = panel.dataset.tabPanel !== tab;
  });
}

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch (_err) {
    return [];
  }
}

function persistSaved() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.saved));
}

function ensureUniqueById(list) {
  const seen = new Set();
  return list.filter((item) => {
    if (!item?.id || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function addToSaved(palette) {
  if (!palette?.id) return;
  const exists = state.saved.find((p) => p.id === palette.id);
  if (exists) {
    showToast("Dải màu đã có trong bộ sưu tập.");
    return;
  }
  state.saved.unshift({ ...palette, savedAt: new Date().toISOString(), favorite: false });
  state.saved = ensureUniqueById(state.saved);
  persistSaved();
  renderSaved();
  showToast("Đã lưu vào bộ sưu tập.");
}

function toggleFavorite(id) {
  const item = state.saved.find((p) => p.id === id);
  if (!item) return;
  item.favorite = !item.favorite;
  persistSaved();
  renderSaved();
}

function removeSaved(id) {
  state.saved = state.saved.filter((p) => p.id !== id);
  persistSaved();
  renderSaved();
}

function renderStops() {
  if (!el.stopsWrap) return;
  el.stopsWrap.innerHTML = "";
  state.currentStops.forEach((hex, index) => {
    const row = document.createElement("div");
    row.className = "flex items-center gap-3";

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = hex;
    colorInput.className = "tc-color-input";
    colorInput.addEventListener("input", () => {
      state.currentStops[index] = colorInput.value;
      renderPreview();
    });

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = hex;
    textInput.className = "tc-input flex-1";
    textInput.placeholder = "#ffffff";
    textInput.addEventListener("input", () => {
      const normalized = normalizeHex(textInput.value);
      if (normalized) {
        state.currentStops[index] = normalized;
        colorInput.value = normalized;
        renderPreview();
      }
    });

    row.appendChild(colorInput);
    row.appendChild(textInput);

    if (state.currentStops.length > MIN_STOPS) {
      const removeBtn = document.createElement("button");
      removeBtn.className = "tc-btn tc-chip px-3 py-2 text-sm";
      removeBtn.type = "button";
      removeBtn.textContent = "Xóa";
      removeBtn.addEventListener("click", () => {
        state.currentStops.splice(index, 1);
        renderStops();
        renderPreview();
      });
      row.appendChild(removeBtn);
    }

    el.stopsWrap.appendChild(row);
  });
}

function renderPreview() {
  if (el.preview) {
    el.preview.style.background = gradientFor(state.currentStops);
  }
  if (el.hexList) {
    el.hexList.textContent = state.currentStops.join(", ");
  }
}

function renderExplore() {
  if (!el.exploreGrid || !el.exploreEmpty) return;
  el.exploreGrid.innerHTML = "";
  if (!state.palettes.length) {
    el.exploreEmpty.classList.remove("hidden");
    return;
  }
  el.exploreEmpty.classList.add("hidden");
  state.palettes.forEach((palette) => {
    const card = document.createElement("div");
    card.className = "tc-card p-4 flex flex-col gap-3";

    const header = document.createElement("div");
    header.className = "flex items-start justify-between gap-3";

    const meta = document.createElement("div");
    const title = document.createElement("p");
    title.className = "text-sm font-semibold";
    title.textContent = palette.ten || "Dải màu";
    const tags = document.createElement("p");
    tags.className = "tc-muted text-xs mt-1";
    tags.textContent = (palette.tags || []).join(" · ");
    meta.appendChild(title);
    meta.appendChild(tags);

    const saveBtn = document.createElement("button");
    saveBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    saveBtn.type = "button";
    saveBtn.textContent = "Lưu";
    saveBtn.addEventListener("click", () => addToSaved(palette));

    header.appendChild(meta);
    header.appendChild(saveBtn);

    const preview = document.createElement("div");
    preview.className = "tc-gradient";
    preview.style.background = gradientFor(palette.stops);

    const swatches = document.createElement("div");
    swatches.className = "flex flex-wrap gap-2";
    palette.stops.forEach((hex) => {
      const chip = document.createElement("span");
      chip.className = "inline-flex items-center gap-2 text-xs tc-muted";
      const dot = document.createElement("span");
      dot.className = "w-4 h-4 rounded-full border";
      dot.style.background = hex;
      chip.appendChild(dot);
      const label = document.createElement("span");
      label.textContent = hex;
      chip.appendChild(label);
      swatches.appendChild(chip);
    });

    const actions = document.createElement("div");
    actions.className = "flex flex-wrap gap-2";

    const remixBtn = document.createElement("button");
    remixBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    remixBtn.type = "button";
    remixBtn.textContent = "Remix";
    remixBtn.addEventListener("click", () => {
      state.currentStops = [...palette.stops];
      state.currentName = `Remix · ${palette.ten || "Dải màu"}`;
      if (el.nameInput) el.nameInput.value = state.currentName;
      renderStops();
      renderPreview();
      setActiveTab("create");
    });

    const exportBtn = document.createElement("button");
    exportBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    exportBtn.type = "button";
    exportBtn.textContent = "Xuất";
    exportBtn.addEventListener("click", async () => {
      const ok = await copyText(exportText(palette));
      showToast(ok ? "Đã sao chép xuất." : "Không thể sao chép.");
    });

    actions.appendChild(remixBtn);
    actions.appendChild(exportBtn);

    card.appendChild(header);
    card.appendChild(preview);
    card.appendChild(swatches);
    card.appendChild(actions);

    el.exploreGrid.appendChild(card);
  });
}

function renderSaved() {
  if (!el.savedGrid || !el.savedEmpty) return;
  el.savedGrid.innerHTML = "";
  if (!state.saved.length) {
    el.savedEmpty.classList.remove("hidden");
    return;
  }
  el.savedEmpty.classList.add("hidden");
  const items = [...state.saved].sort((a, b) => {
    if (a.favorite === b.favorite) return 0;
    return a.favorite ? -1 : 1;
  });
  items.forEach((palette) => {
    const card = document.createElement("div");
    card.className = "tc-card p-4 flex flex-col gap-3";

    const header = document.createElement("div");
    header.className = "flex items-start justify-between gap-3";

    const meta = document.createElement("div");
    const title = document.createElement("p");
    title.className = "text-sm font-semibold";
    title.textContent = palette.ten || "Dải màu";
    const tags = document.createElement("p");
    tags.className = "tc-muted text-xs mt-1";
    tags.textContent = (palette.tags || []).join(" · ");
    meta.appendChild(title);
    meta.appendChild(tags);

    const favBtn = document.createElement("button");
    favBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    favBtn.type = "button";
    favBtn.textContent = palette.favorite ? "★ Ghim" : "☆ Ghim";
    favBtn.addEventListener("click", () => toggleFavorite(palette.id));

    header.appendChild(meta);
    header.appendChild(favBtn);

    const preview = document.createElement("div");
    preview.className = "tc-gradient";
    preview.style.background = gradientFor(palette.stops);

    const actions = document.createElement("div");
    actions.className = "flex flex-wrap gap-2";

    const exportBtn = document.createElement("button");
    exportBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    exportBtn.type = "button";
    exportBtn.textContent = "Xuất";
    exportBtn.addEventListener("click", async () => {
      const ok = await copyText(exportText(palette));
      showToast(ok ? "Đã sao chép xuất." : "Không thể sao chép.");
    });

    const removeBtn = document.createElement("button");
    removeBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    removeBtn.type = "button";
    removeBtn.textContent = "Xóa";
    removeBtn.addEventListener("click", () => removeSaved(palette.id));

    actions.appendChild(exportBtn);
    actions.appendChild(removeBtn);

    card.appendChild(header);
    card.appendChild(preview);
    card.appendChild(actions);

    el.savedGrid.appendChild(card);
  });
}

function applyStopsFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("stops");
  if (!raw) return;
  const stops = raw.split(",").map((s) => normalizeHex(s)).filter(Boolean);
  if (stops.length >= MIN_STOPS && stops.length <= MAX_STOPS) {
    state.currentStops = stops;
    renderStops();
    renderPreview();
  }
}

async function loadPalettes() {
  try {
    const res = await fetch("../data/palettes.json", { cache: "no-store" });
    const data = await res.json();
    state.palettes = Array.isArray(data) ? data : [];
  } catch (_err) {
    state.palettes = [];
  }
  renderExplore();
}

function initEvents() {
  el.tabs.forEach((btn) => {
    btn.addEventListener("click", () => setActiveTab(btn.dataset.tab));
  });
  document.querySelectorAll("[data-empty-action=\"create\"]").forEach((btn) => {
    btn.addEventListener("click", () => setActiveTab("create"));
  });

  el.btnAdd?.addEventListener("click", () => {
    if (state.currentStops.length >= MAX_STOPS) return;
    state.currentStops.push(randomHex());
    renderStops();
    renderPreview();
  });
  el.btnRandom?.addEventListener("click", () => {
    state.currentStops = Array.from({ length: state.currentStops.length }, () => randomHex());
    renderStops();
    renderPreview();
  });
  el.nameInput?.addEventListener("input", () => {
    state.currentName = el.nameInput.value.trim();
  });
  el.btnExport?.addEventListener("click", async () => {
    const payload = {
      id: `local-${Date.now()}`,
      ten: state.currentName || "Dải màu mới",
      tags: ["tự tạo"],
      stops: state.currentStops
    };
    const ok = await copyText(exportText(payload));
    showToast(ok ? "Đã sao chép xuất." : "Không thể sao chép.");
  });
  el.btnSave?.addEventListener("click", () => {
    const palette = {
      id: `local-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      ten: state.currentName || "Dải màu mới",
      tags: ["tự tạo"],
      stops: [...state.currentStops]
    };
    addToSaved(palette);
  });
  el.btnLink?.addEventListener("click", async () => {
    const stops = state.currentStops.join(",");
    const url = `${window.location.origin}${window.location.pathname}?stops=${encodeURIComponent(stops)}`;
    const ok = await copyText(url);
    showToast(ok ? "Đã sao chép Palette Link." : "Không thể sao chép.");
  });
}

function init() {
  state.saved = loadSaved();
  if (el.nameInput) el.nameInput.value = state.currentName;
  renderStops();
  renderPreview();
  renderSaved();
  loadPalettes();
  applyStopsFromQuery();
  initEvents();
}

init();
