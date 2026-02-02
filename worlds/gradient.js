import { composeHandoff } from "../scripts/handoff.js";

const MIN_STOPS = 2;
const MAX_STOPS = 7;
const ASSET_STORAGE_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const FEED_STORAGE_KEY = "tc_community_feed";
const HANDOFF_FROM = "gradient";

const state = {
  stops: [
    { hex: "#ff6b6b", pos: 0 },
    { hex: "#ffd93d", pos: 50 },
    { hex: "#6ee7b7", pos: 100 }
  ],
  angle: 90,
  type: "linear",
  samples: []
};

const el = {
  preview: document.getElementById("gradientPreview"),
  angleRange: document.getElementById("gradientAngle"),
  angleInput: document.getElementById("gradientAngleInput"),
  angleValue: document.getElementById("gradientAngleValue"),
  resetAngle: document.getElementById("gradientResetAngle"),
  typeSelect: document.getElementById("gradientType"),
  stopsWrap: document.getElementById("gradientStops"),
  addStop: document.getElementById("gradientAdd"),
  randomStop: document.getElementById("gradientRandom"),
  exportBtn: document.getElementById("gradientExport"),
  toPalette: document.getElementById("gradientToPalette"),
  samplesWrap: document.getElementById("gradientSamples"),
  saveLibrary: document.getElementById("gradientSaveLibrary"),
  useLibrary: document.getElementById("gradientUseLibrary"),
  share: document.getElementById("gradientShare"),
  exportSvg: document.getElementById("gradientExportSvg"),
  exportToken: document.getElementById("gradientExportToken"),
  importInput: document.getElementById("gradientImportInput"),
  importBtn: document.getElementById("gradientImportBtn")
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

function clampNumber(value, min, max) {
  const num = Number(value);
  if (Number.isNaN(num)) return min;
  return Math.max(min, Math.min(max, num));
}

function hexToRgb(hex) {
  const cleaned = normalizeHex(hex);
  if (!cleaned) return null;
  const raw = cleaned.replace("#", "");
  return {
    r: parseInt(raw.slice(0, 2), 16),
    g: parseInt(raw.slice(2, 4), 16),
    b: parseInt(raw.slice(4, 6), 16)
  };
}

function migrateStops(rawStops) {
  if (!Array.isArray(rawStops)) return [];
  const cleaned = rawStops
    .map((item) => {
      if (typeof item === "string") {
        const hex = normalizeHex(item);
        return hex ? { hex } : null;
      }
      if (item && typeof item === "object") {
        const hex = normalizeHex(item.hex || item.color);
        if (!hex) return null;
        const pos = Number(item.pos);
        return {
          hex,
          pos: Number.isFinite(pos) ? clampNumber(pos, 0, 100) : undefined,
          alpha: Number.isFinite(item.alpha) ? item.alpha : undefined
        };
      }
      return null;
    })
    .filter(Boolean);
  const total = cleaned.length;
  return cleaned.map((stop, idx) => ({
    ...stop,
    pos: Number.isFinite(stop.pos)
      ? stop.pos
      : Math.round((idx / Math.max(1, total - 1)) * 100)
  }));
}

function buildGradientStops(stops) {
  const list = migrateStops(stops);
  if (!list.length) return "#000 0%";
  if (list.length === 1) return `${list[0].hex} 0%`;
  return list
    .map((stop) => {
      const color = stop.alpha != null && stop.alpha < 1
        ? (() => {
            const rgb = hexToRgb(stop.hex);
            if (!rgb) return stop.hex;
            return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${stop.alpha})`;
          })()
        : stop.hex;
      return `${color} ${clampNumber(stop.pos, 0, 100)}%`;
    })
    .join(", ");
}

function gradientCss(stops = state.stops, angle = state.angle, type = state.type) {
  const payload = buildGradientStops(stops);
  if (type === "radial") {
    return `radial-gradient(circle at center, ${payload})`;
  }
  if (type === "conic") {
    return `conic-gradient(from ${angle}deg, ${payload})`;
  }
  return `linear-gradient(${angle}deg, ${payload})`;
}

function tokensFor(stops) {
  return migrateStops(stops)
    .map((stop, idx) => `  --mau-${String(idx + 1).padStart(2, "0")}: ${stop.hex};`)
    .join("\n");
}

function exportText() {
  const hexList = migrateStops(state.stops).map((stop) => stop.hex).join(", ");
  return `/* Dải chuyển màu */\n${gradientCss()}\n\nHex: ${hexList}\n\n:root {\n${tokensFor(state.stops)}\n}\n`;
}

function exportTokenString() {
  return gradientCss();
}

function exportSvg() {
  const stops = migrateStops(state.stops);
  if (!stops.length) return "";
  const stopMarkup = stops
    .map((stop) => {
      const offset = `${clampNumber(stop.pos, 0, 100)}%`;
      const opacity = stop.alpha != null && stop.alpha < 1 ? ` stop-opacity="${stop.alpha}"` : "";
      return `      <stop offset="${offset}" stop-color="${stop.hex}"${opacity} />`;
    })
    .join("\n");

  let gradientDef = "";
  if (state.type === "radial") {
    gradientDef = `<radialGradient id="g" cx="50%" cy="50%" r="60%">\n${stopMarkup}\n    </radialGradient>`;
  } else if (state.type === "conic") {
    gradientDef = `<!-- Conic chưa hỗ trợ trong SVG, dùng linear fallback -->\n    <linearGradient id="g" gradientTransform="rotate(${state.angle} 0.5 0.5)">\n${stopMarkup}\n    </linearGradient>`;
  } else {
    gradientDef = `<linearGradient id="g" gradientTransform="rotate(${state.angle} 0.5 0.5)">\n${stopMarkup}\n    </linearGradient>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180">\n  <defs>\n    ${gradientDef}\n  </defs>\n  <rect width="100%" height="100%" fill="url(#g)" />\n</svg>\n`;
}

function splitGradientArgs(input) {
  const parts = [];
  let buf = "";
  let depth = 0;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === "(") depth += 1;
    if (ch === ")") depth = Math.max(0, depth - 1);
    if (ch === "," && depth === 0) {
      parts.push(buf.trim());
      buf = "";
      continue;
    }
    buf += ch;
  }
  if (buf.trim()) parts.push(buf.trim());
  return parts;
}

function parseColorToken(token) {
  const cleaned = token.trim();
  const hexMatch = cleaned.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/);
  if (hexMatch) {
    const raw = hexMatch[1];
    const hex = raw.length === 3
      ? `#${raw[0]}${raw[0]}${raw[1]}${raw[1]}${raw[2]}${raw[2]}`
      : `#${raw}`;
    return { hex: normalizeHex(hex), alpha: null, length: hexMatch[0].length };
  }
  const rgbMatch = cleaned.match(/^rgba?\(([^)]+)\)/i);
  if (rgbMatch) {
    const parts = rgbMatch[1].split(",").map((v) => v.trim());
    if (parts.length < 3) return null;
    const toChannel = (value) => {
      if (value.endsWith("%")) {
        return clampNumber(parseFloat(value) * 2.55, 0, 255);
      }
      return clampNumber(parseFloat(value), 0, 255);
    };
    const r = toChannel(parts[0]);
    const g = toChannel(parts[1]);
    const b = toChannel(parts[2]);
    const alpha = parts[3] != null ? clampNumber(parseFloat(parts[3]), 0, 1) : null;
    const hex = `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
    return { hex: normalizeHex(hex), alpha, length: rgbMatch[0].length };
  }
  return null;
}

function parseLinearGradient(text) {
  const match = text.match(/linear-gradient\s*\((.+)\)\s*$/i);
  if (!match) return null;
  const args = splitGradientArgs(match[1]);
  if (args.length < 2) return null;
  let angle = 90;
  let startIndex = 0;
  const first = args[0];
  if (/deg/i.test(first)) {
    angle = clampNumber(parseFloat(first), 0, 360);
    startIndex = 1;
  } else if (/^to\s+/i.test(first)) {
    const map = {
      "to right": 90,
      "to left": 270,
      "to bottom": 180,
      "to top": 0,
      "to bottom right": 135,
      "to bottom left": 225,
      "to top right": 45,
      "to top left": 315
    };
    angle = map[first.trim().toLowerCase()] ?? 90;
    startIndex = 1;
  }
  const stops = args.slice(startIndex).map((token) => {
    const colorInfo = parseColorToken(token);
    if (!colorInfo || !colorInfo.hex) return null;
    const rest = token.slice(colorInfo.length).trim();
    const posMatch = rest.match(/(-?\d+(?:\.\d+)?)%/);
    const pos = posMatch ? clampNumber(posMatch[1], 0, 100) : undefined;
    return { hex: colorInfo.hex, pos, alpha: colorInfo.alpha };
  }).filter(Boolean);
  if (stops.length < MIN_STOPS) return null;
  return {
    type: "linear",
    angle,
    stops: migrateStops(stops)
  };
}

function applyImportedGradient(raw) {
  const parsed = parseLinearGradient(raw);
  if (!parsed) {
    showToast("Chưa hỗ trợ định dạng này. Hãy dùng linear-gradient có %.");
    return;
  }
  state.type = parsed.type;
  state.angle = parsed.angle;
  state.stops = parsed.stops;
  if (el.typeSelect) el.typeSelect.value = state.type;
  renderStops();
  schedulePreview();
  applyAngle(state.angle);
  showToast("Đã nhập gradient từ CSS.");
}
function showToast(message) {
  let toast = document.getElementById("gradientToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "gradientToast";
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

function addAssetToLibrary(asset) {
  try {
    const raw = localStorage.getItem(ASSET_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const next = Array.isArray(list) ? list : [];
    next.unshift(asset);
    localStorage.setItem(ASSET_STORAGE_KEY, JSON.stringify(next));
    return true;
  } catch (_err) {
    return false;
  }
}

function getCurrentProject() {
  try {
    return localStorage.getItem(PROJECT_STORAGE_KEY) || "";
  } catch (_err) {
    return "";
  }
}

function buildGradientAsset() {
  const now = new Date().toISOString();
  return {
    id: `asset_${Date.now()}`,
    type: "gradient",
    name: "Dải chuyển màu nhanh",
    tags: ["gradient"],
    payload: { gradientParams: { stops: migrateStops(state.stops), angle: state.angle, type: state.type } },
    createdAt: now,
    updatedAt: now,
    sourceWorld: HANDOFF_FROM,
    project: getCurrentProject()
  };
}

function isLoggedIn() {
  const auth = window.tcAuth || null;
  if (typeof auth?.isLoggedIn === "function") return auth.isLoggedIn();
  return false;
}

function publishToFeed(asset) {
  if (!asset) return false;
  if (!isLoggedIn()) {
    showToast("Cần đăng nhập để chia sẻ.");
    return false;
  }
  try {
    const raw = localStorage.getItem(FEED_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const next = Array.isArray(list) ? list : [];
    next.unshift({
      id: `post_${Date.now()}`,
      asset,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem(FEED_STORAGE_KEY, JSON.stringify(next));
    showToast("Đã chia sẻ lên feed.");
    return true;
  } catch (_err) {
    showToast("Không thể chia sẻ.");
    return false;
  }
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

let previewRaf = 0;
function schedulePreview() {
  if (previewRaf) return;
  previewRaf = window.requestAnimationFrame(() => {
    previewRaf = 0;
    renderPreview();
  });
}

function renderPreview() {
  if (el.preview) {
    el.preview.style.background = gradientCss();
  }
  if (el.angleValue) {
    el.angleValue.textContent = `${state.angle}°`;
  }
}

function renderStops() {
  if (!el.stopsWrap) return;
  el.stopsWrap.innerHTML = "";
  state.stops = migrateStops(state.stops);
  state.stops.forEach((stop, index) => {
    const row = document.createElement("div");
    row.className = "flex flex-wrap items-center gap-3";

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = stop.hex;
    colorInput.className = "tc-color-input";
    colorInput.addEventListener("input", () => {
      state.stops[index].hex = colorInput.value;
      schedulePreview();
    });

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = stop.hex;
    textInput.className = "tc-input flex-1 min-w-[160px]";
    textInput.placeholder = "#ffffff";
    textInput.addEventListener("input", () => {
      const normalized = normalizeHex(textInput.value);
      if (normalized) {
        state.stops[index].hex = normalized;
        colorInput.value = normalized;
        schedulePreview();
      }
    });

    const posWrap = document.createElement("div");
    posWrap.className = "flex items-center gap-2";
    const posInput = document.createElement("input");
    posInput.type = "number";
    posInput.min = "0";
    posInput.max = "100";
    posInput.step = "1";
    posInput.value = String(stop.pos ?? 0);
    posInput.className = "tc-input w-20 text-right";
    posInput.addEventListener("input", () => {
      state.stops[index].pos = clampNumber(posInput.value, 0, 100);
      schedulePreview();
    });
    const posLabel = document.createElement("span");
    posLabel.className = "text-xs tc-muted";
    posLabel.textContent = "%";
    posWrap.appendChild(posInput);
    posWrap.appendChild(posLabel);

    row.appendChild(colorInput);
    row.appendChild(textInput);
    row.appendChild(posWrap);

    if (state.stops.length > MIN_STOPS) {
      const removeBtn = document.createElement("button");
      removeBtn.className = "tc-btn tc-chip px-3 py-2 text-sm";
      removeBtn.type = "button";
      removeBtn.textContent = "Xóa";
      removeBtn.addEventListener("click", () => {
        state.stops.splice(index, 1);
        renderStops();
        schedulePreview();
      });
      row.appendChild(removeBtn);
    }

    el.stopsWrap.appendChild(row);
  });
}
function renderSamples() {
  if (!el.samplesWrap) return;
  el.samplesWrap.innerHTML = "";
  state.samples.slice(0, 8).forEach((palette) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "tc-card p-3 text-left w-full";

    const title = document.createElement("p");
    title.className = "text-sm font-semibold";
    title.textContent = palette.ten || "Bảng phối màu";

    const preview = document.createElement("div");
    preview.className = "tc-gradient-preview mt-2";
    preview.style.minHeight = "56px";
    preview.style.background = gradientCss(palette.stops, state.angle, state.type);

    card.appendChild(title);
    card.appendChild(preview);

    card.addEventListener("click", () => {
      state.stops = migrateStops(palette.stops);
      renderStops();
      schedulePreview();
    });

    el.samplesWrap.appendChild(card);
  });
}

function applyAngle(value) {
  const next = clampNumber(value, 0, 360);
  state.angle = next;
  if (el.angleRange) el.angleRange.value = String(next);
  if (el.angleInput) el.angleInput.value = String(next);
  schedulePreview();
}

function getStopsFromHash() {
  const hash = (window.location.hash || "").replace("#", "");
  if (!hash) return null;
  const params = new URLSearchParams(hash);
  const raw = params.get("g");
  if (!raw) return null;
  const stops = raw.split(",").map((s) => normalizeHex(s)).filter(Boolean);
  if (stops.length >= MIN_STOPS && stops.length <= MAX_STOPS) {
    return migrateStops(stops);
  }
  return null;
}

async function loadSamples() {
  try {
    const res = await fetch("../data/palettes.json", { cache: "no-store" });
    const data = await res.json();
    state.samples = Array.isArray(data) ? data : [];
  } catch (_err) {
    state.samples = [];
  }
  renderSamples();
}

function initEvents() {
  el.angleRange?.addEventListener("input", () => applyAngle(el.angleRange.value));
  el.angleInput?.addEventListener("input", () => applyAngle(el.angleInput.value));
  el.resetAngle?.addEventListener("click", () => applyAngle(90));
  el.typeSelect?.addEventListener("change", () => {
    const next = el.typeSelect.value || "linear";
    state.type = next;
    schedulePreview();
  });

  el.addStop?.addEventListener("click", () => {
    if (state.stops.length >= MAX_STOPS) return;
    const lastPos = state.stops[state.stops.length - 1]?.pos ?? 100;
    state.stops.push({ hex: randomHex(), pos: clampNumber(lastPos + 10, 0, 100) });
    renderStops();
    schedulePreview();
  });
  el.randomStop?.addEventListener("click", () => {
    state.stops = state.stops.map((stop, idx) => ({
      hex: randomHex(),
      pos: Number.isFinite(stop.pos) ? stop.pos : Math.round((idx / Math.max(1, state.stops.length - 1)) * 100)
    }));
    renderStops();
    schedulePreview();
  });
  if (el.exportBtn) el.exportBtn.textContent = "Xuất Bản thông số";
  el.exportBtn?.addEventListener("click", async () => {
    const ok = await copyText(exportText());
    showToast(ok ? "Đã sao chép bản thông số." : "Không thể sao chép bản thông số.");
  });
  el.exportToken?.addEventListener("click", async () => {
    const ok = await copyText(exportTokenString());
    showToast(ok ? "Đã sao chép token gradient." : "Không thể sao chép token.");
  });
  el.exportSvg?.addEventListener("click", async () => {
    const svg = exportSvg();
    if (!svg) {
      showToast("Không thể tạo SVG.");
      return;
    }
    const ok = await copyText(svg);
    showToast(ok ? "Đã sao chép SVG gradient." : "Không thể sao chép SVG.");
  });
  el.toPalette?.addEventListener("click", () => {
    const stops = migrateStops(state.stops).map((stop) => stop.hex).join(",");
    window.location.href = `palette.html#p=${encodeURIComponent(stops)}`;
  });

  el.saveLibrary?.addEventListener("click", () => {
    const asset = buildGradientAsset();
    const ok = addAssetToLibrary(asset);
    showToast(ok ? "Đã lưu vào Thư viện." : "Không thể lưu tài sản.");
  });
  el.useLibrary?.addEventListener("click", () => {
    const payload = composeHandoff({
      from: HANDOFF_FROM,
      intent: "use",
      projectId: getCurrentProject()
    });
    window.location.href = `./library.html${payload}`;
  });
  el.share?.addEventListener("click", () => {
    publishToFeed(buildGradientAsset());
  });

  el.importBtn?.addEventListener("click", () => {
    const raw = el.importInput?.value || "";
    if (!raw.trim()) {
      showToast("Hãy dán CSS gradient trước khi nhập.");
      return;
    }
    applyImportedGradient(raw.trim());
  });
}

function applyHexesFromHub(detail) {
  const rawList = Array.isArray(detail?.hexes) ? detail.hexes : [];
  const mode = detail?.mode === "append" ? "append" : "replace";
  const normalized = rawList.map((hex) => normalizeHex(hex)).filter(Boolean);
  if (!normalized.length) return;
  const baseStops = mode === "append" ? migrateStops(state.stops) : [];
  const combined = [...baseStops, ...normalized.map((hex) => ({ hex }))];
  const unique = combined.filter((stop, idx) => {
    const hex = stop.hex;
    return hex && combined.findIndex((s) => s.hex === hex) === idx;
  });
  let next = migrateStops(unique).slice(0, MAX_STOPS);
  if (next.length < MIN_STOPS) {
    const fallback = migrateStops(state.stops).length ? migrateStops(state.stops) : normalized.map((hex) => ({ hex }));
    fallback.forEach((stop) => {
      if (next.length >= MIN_STOPS) return;
      next.push({ hex: stop.hex });
    });
  }
  if (next.length < MIN_STOPS && next.length) {
    while (next.length < MIN_STOPS) next.push({ hex: next[next.length - 1].hex });
  }
  if (next.length >= MIN_STOPS) {
    state.stops = migrateStops(next);
    renderStops();
    schedulePreview();
  }
}

function init() {
  const hashStops = getStopsFromHash();
  if (hashStops) {
    state.stops = hashStops;
  }
  state.stops = migrateStops(state.stops);
  if (el.typeSelect) el.typeSelect.value = state.type;
  renderStops();
  schedulePreview();
  applyAngle(state.angle);
  loadSamples();
  initEvents();
}

init();

window.addEventListener("tc:hex-apply", (event) => {
  applyHexesFromHub(event?.detail);
});
