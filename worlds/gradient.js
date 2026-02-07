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

let stopDragIndex = null;
let stopDragPointerId = null;
let stopDragMoved = false;
let stopSuppressClick = false;
let stopPopoverIndex = null;
let stopPopoverEl = null;
let sampleDetailOpen = false;
let sampleDetailBodyOverflow = "";

const el = {
  preview: document.getElementById("gradientPreview"),
  angleRange: document.getElementById("gradientAngle"),
  angleInput: document.getElementById("gradientAngleInput"),
  angleValue: document.getElementById("gradientAngleValue"),
  resetAngle: document.getElementById("gradientResetAngle"),
  typeSelect: document.getElementById("gradientType"),
  stopsWrap: document.getElementById("gradientStops"),
  stopBar: document.getElementById("gradientStopBar"),
  addStop: document.getElementById("gradientAdd"),
  randomStop: document.getElementById("gradientRandom"),
  exportBtn: document.getElementById("gradientExport"),
  copyTokenBtn: document.getElementById("gradientCopyToken"),
  toPalette: document.getElementById("gradientToPalette"),
  samplesWrap: document.getElementById("gradientSamples"),
  saveLibrary: document.getElementById("gradientSaveLibrary"),
  useLibrary: document.getElementById("gradientUseLibrary"),
  share: document.getElementById("gradientShare"),
  exportSvg: document.getElementById("gradientExportSvg"),
  exportToken: document.getElementById("gradientExportToken"),
  importInput: document.getElementById("gradientImportInput"),
  importBtn: document.getElementById("gradientImportBtn"),
  exportMenu: document.getElementById("gradientExportMenu"),
  sampleDetail: document.getElementById("gradientSampleDetail"),
  sampleDetailBody: document.getElementById("gradientSampleDetailBody"),
  sampleDetailTitle: document.getElementById("gradientSampleDetailTitle"),
  sampleDetailSubtitle: document.getElementById("gradientSampleDetailSubtitle")
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

function rgbToHex(r, g, b) {
  const toHex = (value) => clampNumber(Math.round(value), 0, 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixHex(hexA, hexB, ratio) {
  const left = hexToRgb(hexA);
  const right = hexToRgb(hexB);
  if (!left || !right) return hexA;
  const t = clampNumber(ratio, 0, 1);
  const r = left.r + (right.r - left.r) * t;
  const g = left.g + (right.g - left.g) * t;
  const b = left.b + (right.b - left.b) * t;
  return rgbToHex(r, g, b);
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
  const list = migrateStops(stops).slice().sort((a, b) => (a.pos ?? 0) - (b.pos ?? 0));
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

function exportCssProperty(stops = state.stops) {
  return `background: ${gradientCss(stops)};`;
}

function exportTokenBlock(stops = state.stops) {
  return `:root {\n${tokensFor(stops)}\n}\n`;
}

function exportTokenString(stops = state.stops) {
  return gradientCss(stops);
}

function exportSvg(stopsInput = state.stops) {
  const stops = migrateStops(stopsInput).slice().sort((a, b) => (a.pos ?? 0) - (b.pos ?? 0));
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

function buildGradientAsset(stopsInput = state.stops) {
  const now = new Date().toISOString();
  return {
    id: `asset_${Date.now()}`,
    type: "gradient",
    name: "Dải chuyển màu nhanh",
    tags: ["gradient"],
    payload: { gradientParams: { stops: migrateStops(stopsInput), angle: state.angle, type: state.type } },
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
  if (el.stopBar) {
    el.stopBar.style.background = gradientCss();
  }
  if (el.angleValue) {
    el.angleValue.textContent = `${state.angle}°`;
  }
}

function getStopBarPercent(clientX) {
  if (!el.stopBar) return 0;
  const rect = el.stopBar.getBoundingClientRect();
  if (!rect.width) return 0;
  const raw = clampNumber(clientX - rect.left, 0, rect.width);
  return (raw / rect.width) * 100;
}

function getStopHandle(index) {
  if (!el.stopBar) return null;
  return el.stopBar.querySelector(`.tc-stop-handle[data-index="${index}"]`);
}

function updateStopInputs(index, { posOnly = false } = {}) {
  if (!el.stopsWrap) return;
  const row = el.stopsWrap.querySelector(`[data-stop-row="${index}"]`);
  if (!row) return;
  const stop = state.stops[index];
  if (!stop) return;
  const posInput = row.querySelector("[data-stop-role='pos']");
  if (posInput) posInput.value = String(Math.round(stop.pos ?? 0));
  if (posOnly) return;
  const colorInput = row.querySelector("[data-stop-role='color']");
  const textInput = row.querySelector("[data-stop-role='hex']");
  if (colorInput && colorInput.value !== stop.hex) colorInput.value = stop.hex;
  if (textInput && textInput.value !== stop.hex) textInput.value = stop.hex;
}

function updateStopHandle(index) {
  const stop = state.stops[index];
  if (!stop) return;
  const handle = getStopHandle(index);
  if (!handle) return;
  handle.style.left = `${clampNumber(stop.pos ?? 0, 0, 100)}%`;
  handle.style.setProperty("--stop-color", stop.hex);
  handle.setAttribute("aria-label", `Stop ${index + 1} tại ${Math.round(stop.pos ?? 0)}%`);
}

function ensureStopPopover() {
  if (stopPopoverEl) return stopPopoverEl;
  if (!el.stopBar) return null;
  const popover = document.createElement("div");
  popover.className = "tc-stop-popover";
  popover.setAttribute("aria-hidden", "true");
  popover.innerHTML = `
    <div class="tc-stop-popover-row">
      <input class="tc-color-input" type="color" data-stop-pop-color>
      <input class="tc-input flex-1 text-sm" type="text" data-stop-pop-hex placeholder="#ffffff">
    </div>
    <div class="tc-stop-popover-row">
      <span class="tc-muted text-xs" data-stop-pop-pos></span>
      <button class="tc-btn tc-chip px-3 py-2 text-xs" type="button" data-stop-pop-remove>Xóa stop</button>
    </div>
  `;
  popover.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!event.target.closest("[data-stop-pop-remove]")) return;
    if (stopPopoverIndex == null) return;
    if (state.stops.length <= MIN_STOPS) {
      showToast("Cần tối thiểu 2 stop.");
      return;
    }
    state.stops.splice(stopPopoverIndex, 1);
    closeStopPopover();
    renderStops();
    schedulePreview();
  });
  popover.addEventListener("input", (event) => {
    if (stopPopoverIndex == null) return;
    const target = event.target;
    if (target.matches("[data-stop-pop-color]")) {
      applyStopHex(stopPopoverIndex, target.value);
      return;
    }
    if (target.matches("[data-stop-pop-hex]")) {
      applyStopHex(stopPopoverIndex, target.value);
    }
  });
  stopPopoverEl = popover;
  return stopPopoverEl;
}

function syncStopPopover(index) {
  if (!stopPopoverEl || stopPopoverIndex !== index) return;
  const stop = state.stops[index];
  if (!stop) return;
  const colorInput = stopPopoverEl.querySelector("[data-stop-pop-color]");
  const hexInput = stopPopoverEl.querySelector("[data-stop-pop-hex]");
  const posLabel = stopPopoverEl.querySelector("[data-stop-pop-pos]");
  const removeBtn = stopPopoverEl.querySelector("[data-stop-pop-remove]");
  if (colorInput && colorInput.value !== stop.hex) colorInput.value = stop.hex;
  if (hexInput && hexInput.value !== stop.hex) hexInput.value = stop.hex;
  if (posLabel) posLabel.textContent = `Vị trí: ${Math.round(stop.pos ?? 0)}%`;
  if (removeBtn) {
    const locked = state.stops.length <= MIN_STOPS;
    removeBtn.disabled = locked;
    removeBtn.setAttribute("aria-disabled", locked ? "true" : "false");
  }
}

function positionStopPopover(index) {
  if (!el.stopBar || !stopPopoverEl || index == null) return;
  const stop = state.stops[index];
  if (!stop) return;
  const rect = el.stopBar.getBoundingClientRect();
  const rawLeft = (clampNumber(stop.pos ?? 0, 0, 100) / 100) * rect.width;
  stopPopoverEl.style.left = `${rawLeft}px`;
  window.requestAnimationFrame(() => {
    if (!el.stopBar || !stopPopoverEl) return;
    const popRect = stopPopoverEl.getBoundingClientRect();
    const min = popRect.width / 2 + 8;
    const max = rect.width - popRect.width / 2 - 8;
    const clamped = clampNumber(rawLeft, min, max);
    stopPopoverEl.style.left = `${clamped}px`;
  });
}

function openStopPopover(index, handle) {
  const popover = ensureStopPopover();
  if (!popover) return;
  if (stopPopoverIndex != null && stopPopoverIndex !== index) {
    const prevHandle = getStopHandle(stopPopoverIndex);
    if (prevHandle) prevHandle.classList.remove("is-active");
  }
  stopPopoverIndex = index;
  popover.classList.add("is-open");
  popover.setAttribute("aria-hidden", "false");
  const targetHandle = handle || getStopHandle(index);
  if (targetHandle) targetHandle.classList.add("is-active");
  syncStopPopover(index);
  positionStopPopover(index);
}

function closeStopPopover() {
  if (!stopPopoverEl) return;
  if (stopPopoverIndex != null) {
    const handle = getStopHandle(stopPopoverIndex);
    if (handle) handle.classList.remove("is-active");
  }
  stopPopoverIndex = null;
  stopPopoverEl.classList.remove("is-open");
  stopPopoverEl.setAttribute("aria-hidden", "true");
}

function toggleStopPopover(index, handle) {
  if (stopPopoverIndex === index) {
    closeStopPopover();
    return;
  }
  openStopPopover(index, handle);
}

function applyStopHex(index, value) {
  if (!state.stops[index]) return;
  const normalized = normalizeHex(value);
  if (!normalized) return;
  state.stops[index].hex = normalized;
  updateStopHandle(index);
  updateStopInputs(index);
  syncStopPopover(index);
  schedulePreview();
}

function applyStopPos(index, value) {
  if (!state.stops[index]) return;
  const nextPos = clampNumber(value, 0, 100);
  state.stops[index].pos = nextPos;
  updateStopHandle(index);
  updateStopInputs(index, { posOnly: true });
  syncStopPopover(index);
  if (stopPopoverIndex === index) {
    positionStopPopover(index);
  }
  schedulePreview();
}

function pickStopColor(pos) {
  const list = migrateStops(state.stops).slice().sort((a, b) => (a.pos ?? 0) - (b.pos ?? 0));
  if (!list.length) return randomHex();
  const clamped = clampNumber(pos, 0, 100);
  let left = list[0];
  let right = list[list.length - 1];
  for (let i = 0; i < list.length; i += 1) {
    const stop = list[i];
    if (stop.pos <= clamped) left = stop;
    if (stop.pos >= clamped) {
      right = stop;
      break;
    }
  }
  if (!left || !right) return list[0].hex;
  if (left === right) return left.hex;
  const span = right.pos - left.pos;
  const ratio = span === 0 ? 0 : (clamped - left.pos) / span;
  return mixHex(left.hex, right.hex, ratio);
}

function insertStopAt(pos, hex) {
  if (state.stops.length >= MAX_STOPS) {
    showToast("Đã đạt tối đa 7 stop.");
    return null;
  }
  const stop = {
    hex: normalizeHex(hex) || randomHex(),
    pos: clampNumber(pos, 0, 100)
  };
  const insertIndex = state.stops.findIndex((item) => (item.pos ?? 0) > stop.pos);
  if (insertIndex === -1) {
    state.stops.push(stop);
    return state.stops.length - 1;
  }
  state.stops.splice(insertIndex, 0, stop);
  return insertIndex;
}

function renderStopBar() {
  if (!el.stopBar) return;
  el.stopBar.innerHTML = "";
  closeStopPopover();
  state.stops = migrateStops(state.stops);
  state.stops.forEach((stop, index) => {
    const handle = document.createElement("button");
    handle.type = "button";
    handle.className = "tc-stop-handle";
    handle.dataset.index = String(index);
    handle.style.left = `${clampNumber(stop.pos ?? 0, 0, 100)}%`;
    handle.style.setProperty("--stop-color", stop.hex);
    handle.setAttribute("aria-label", `Stop ${index + 1} tại ${Math.round(stop.pos ?? 0)}%`);
    el.stopBar.appendChild(handle);
  });
  const popover = ensureStopPopover();
  if (popover) el.stopBar.appendChild(popover);
}

function renderStops() {
  if (!el.stopsWrap) return;
  el.stopsWrap.innerHTML = "";
  state.stops = migrateStops(state.stops);
  state.stops.forEach((stop, index) => {
    const row = document.createElement("div");
    row.className = "flex flex-wrap items-center gap-3";
    row.dataset.stopRow = String(index);

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = stop.hex;
    colorInput.className = "tc-color-input";
    colorInput.dataset.stopRole = "color";
    colorInput.addEventListener("input", () => {
      applyStopHex(index, colorInput.value);
    });

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = stop.hex;
    textInput.className = "tc-input flex-1 min-w-[160px]";
    textInput.placeholder = "#ffffff";
    textInput.dataset.stopRole = "hex";
    textInput.addEventListener("input", () => {
      applyStopHex(index, textInput.value);
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
    posInput.dataset.stopRole = "pos";
    posInput.addEventListener("input", () => {
      applyStopPos(index, posInput.value);
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
        closeStopPopover();
        renderStops();
        schedulePreview();
      });
      row.appendChild(removeBtn);
    }

    el.stopsWrap.appendChild(row);
  });
  renderStopBar();
}

function handleStopBarClick(event) {
  if (!el.stopBar) return;
  const handle = event.target.closest(".tc-stop-handle");
  if (handle && el.stopBar.contains(handle)) {
    if (stopSuppressClick) {
      stopSuppressClick = false;
      return;
    }
    const idx = Number(handle.dataset.index || -1);
    if (Number.isNaN(idx) || idx < 0) return;
    toggleStopPopover(idx, handle);
    return;
  }
  const pos = getStopBarPercent(event.clientX);
  const hex = pickStopColor(pos);
  const index = insertStopAt(pos, hex);
  if (index == null) return;
  renderStops();
  schedulePreview();
  openStopPopover(index);
}

function handleStopPointerDown(event) {
  if (!el.stopBar) return;
  const handle = event.target.closest(".tc-stop-handle");
  if (!handle || !el.stopBar.contains(handle)) return;
  event.preventDefault();
  stopDragIndex = Number(handle.dataset.index || -1);
  if (Number.isNaN(stopDragIndex) || stopDragIndex < 0) return;
  stopDragPointerId = event.pointerId;
  stopDragMoved = false;
  handle.setPointerCapture(event.pointerId);
  closeStopPopover();
}

function handleStopPointerMove(event) {
  if (stopDragIndex == null) return;
  if (event.pointerId !== stopDragPointerId) return;
  event.preventDefault();
  const pos = getStopBarPercent(event.clientX);
  const current = state.stops[stopDragIndex]?.pos ?? 0;
  if (Math.abs(pos - current) > 0.1) stopDragMoved = true;
  applyStopPos(stopDragIndex, pos);
}

function handleStopPointerUp(event) {
  if (stopDragIndex == null) return;
  if (event.pointerId !== stopDragPointerId) return;
  const handle = getStopHandle(stopDragIndex);
  if (handle) handle.releasePointerCapture(event.pointerId);
  if (stopDragMoved) stopSuppressClick = true;
  stopDragIndex = null;
  stopDragPointerId = null;
}

function handleStopOutsideClick(event) {
  if (!stopPopoverEl || stopPopoverIndex == null) return;
  const insideBar = event.target.closest("#gradientStopBar");
  if (insideBar) return;
  closeStopPopover();
}
function renderSamples() {
  if (!el.samplesWrap) return;
  el.samplesWrap.innerHTML = "";
  state.samples.slice(0, 8).forEach((palette) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "tc-gradient-sample";
    card.setAttribute("aria-label", palette.ten || "Mẫu dải phối");

    const tile = document.createElement("span");
    tile.className = "tc-gradient-sample-tile";
    tile.style.background = gradientCss(palette.stops, state.angle, state.type);

    const title = document.createElement("span");
    title.className = "tc-gradient-sample-title";
    title.textContent = palette.ten || "Mẫu dải phối";

    card.appendChild(tile);
    card.appendChild(title);

    card.addEventListener("click", () => {
      openSampleDetail(palette);
    });

    el.samplesWrap.appendChild(card);
  });
}

function ensureSampleDetailOverlay() {
  if (el.sampleDetail && el.sampleDetailBody) return el.sampleDetail;
  const overlay = document.getElementById("gradientSampleDetail");
  const body = document.getElementById("gradientSampleDetailBody");
  const title = document.getElementById("gradientSampleDetailTitle");
  const subtitle = document.getElementById("gradientSampleDetailSubtitle");
  if (overlay && body) {
    el.sampleDetail = overlay;
    el.sampleDetailBody = body;
    el.sampleDetailTitle = title;
    el.sampleDetailSubtitle = subtitle;
    return overlay;
  }
  return null;
}

function renderSampleDetail(palette) {
  const wrapper = document.createElement("div");
  wrapper.className = "grid gap-3";

  const preview = document.createElement("div");
  preview.className = "tc-gradient-preview tc-gradient-detail-preview";
  preview.style.background = gradientCss(palette.stops, state.angle, state.type);
  wrapper.appendChild(preview);

  const tags = Array.isArray(palette.tags) ? palette.tags.filter(Boolean) : [];
  if (tags.length) {
    const tagWrap = document.createElement("div");
    tagWrap.className = "flex flex-wrap gap-2";
    tags.forEach((tag) => {
      const chip = document.createElement("span");
      chip.className = "tc-chip px-3 py-1 text-xs";
      chip.textContent = tag;
      tagWrap.appendChild(chip);
    });
    wrapper.appendChild(tagWrap);
  }

  const actions = document.createElement("div");
  actions.className = "flex flex-wrap gap-2";

  const applyBtn = document.createElement("button");
  applyBtn.type = "button";
  applyBtn.className = "tc-btn tc-btn-primary px-4 py-2 text-sm";
  applyBtn.textContent = "Áp dụng dải này";
  applyBtn.addEventListener("click", () => {
    state.stops = migrateStops(palette.stops);
    renderStops();
    schedulePreview();
    closeSampleDetail();
    showToast("Đã áp dụng dải phối.");
  });
  actions.appendChild(applyBtn);

  const copyCssBtn = document.createElement("button");
  copyCssBtn.type = "button";
  copyCssBtn.className = "tc-btn tc-chip px-3 py-2 text-sm";
  copyCssBtn.textContent = "Sao chép CSS";
  copyCssBtn.addEventListener("click", async () => {
    const ok = await copyText(exportCssProperty(palette.stops));
    showToast(ok ? "Đã sao chép CSS." : "Không thể sao chép.");
  });
  actions.appendChild(copyCssBtn);

  const copyTokenBtn = document.createElement("button");
  copyTokenBtn.type = "button";
  copyTokenBtn.className = "tc-btn tc-chip px-3 py-2 text-sm";
  copyTokenBtn.textContent = "Sao chép Token";
  copyTokenBtn.addEventListener("click", async () => {
    const ok = await copyText(exportTokenBlock(palette.stops));
    showToast(ok ? "Đã sao chép token." : "Không thể sao chép.");
  });
  actions.appendChild(copyTokenBtn);

  const tokenPctBtn = document.createElement("button");
  tokenPctBtn.type = "button";
  tokenPctBtn.className = "tc-btn tc-chip px-3 py-2 text-sm";
  tokenPctBtn.textContent = "Token có %";
  tokenPctBtn.addEventListener("click", async () => {
    const ok = await copyText(exportTokenString(palette.stops));
    showToast(ok ? "Đã sao chép token có %." : "Không thể sao chép.");
  });
  actions.appendChild(tokenPctBtn);

  const svgBtn = document.createElement("button");
  svgBtn.type = "button";
  svgBtn.className = "tc-btn tc-chip px-3 py-2 text-sm";
  svgBtn.textContent = "Xuất SVG";
  svgBtn.addEventListener("click", async () => {
    const svg = exportSvg(palette.stops);
    if (!svg) {
      showToast("Không thể tạo SVG.");
      return;
    }
    const ok = await copyText(svg);
    showToast(ok ? "Đã sao chép SVG gradient." : "Không thể sao chép SVG.");
  });
  actions.appendChild(svgBtn);

  const shareBtn = document.createElement("button");
  shareBtn.type = "button";
  shareBtn.className = "tc-btn tc-chip px-3 py-2 text-sm";
  shareBtn.textContent = "Chia sẻ";
  shareBtn.addEventListener("click", () => {
    publishToFeed(buildGradientAsset(palette.stops));
  });
  actions.appendChild(shareBtn);

  wrapper.appendChild(actions);

  const uiPreview = document.createElement("div");
  uiPreview.className = "tc-gradient-ui";
  const uiHead = document.createElement("div");
  uiHead.className = "tc-gradient-ui-head";
  uiHead.style.background = gradientCss(palette.stops, state.angle, state.type);
  uiHead.textContent = "Thanh tiêu đề";
  const uiBody = document.createElement("div");
  uiBody.className = "tc-gradient-ui-body";
  ["Thẻ CTA", "Nhãn phụ", "Tương phản"].forEach((label) => {
    const pill = document.createElement("span");
    pill.className = "tc-gradient-ui-pill";
    pill.textContent = label;
    uiBody.appendChild(pill);
  });
  uiPreview.appendChild(uiHead);
  uiPreview.appendChild(uiBody);
  wrapper.appendChild(uiPreview);

  return wrapper;
}

function openSampleDetail(palette) {
  if (!palette) return;
  const overlay = ensureSampleDetailOverlay();
  if (!overlay || !el.sampleDetailBody) return;
  if (el.sampleDetailTitle) {
    el.sampleDetailTitle.textContent = palette.ten || "Chi tiết dải phối";
  }
  if (el.sampleDetailSubtitle) {
    const subtitle = Array.isArray(palette.tags) && palette.tags.length
      ? palette.tags.join(" · ")
      : "Mẫu dải phối";
    el.sampleDetailSubtitle.textContent = subtitle;
  }
  el.sampleDetailBody.innerHTML = "";
  el.sampleDetailBody.appendChild(renderSampleDetail(palette));
  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  sampleDetailOpen = true;
  sampleDetailBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
}

function closeSampleDetail() {
  if (!el.sampleDetail) return;
  el.sampleDetail.classList.add("hidden");
  el.sampleDetail.setAttribute("aria-hidden", "true");
  if (el.sampleDetailBody) el.sampleDetailBody.innerHTML = "";
  document.body.style.overflow = sampleDetailBodyOverflow;
  sampleDetailBodyOverflow = "";
  sampleDetailOpen = false;
}

function initSampleDetail() {
  const overlay = ensureSampleDetailOverlay();
  if (!overlay || overlay.dataset.ready === "1") return;
  overlay.dataset.ready = "1";
  overlay.addEventListener("click", (event) => {
    if (event.target.closest("[data-gradient-detail-close]")) {
      closeSampleDetail();
    }
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sampleDetailOpen) {
      closeSampleDetail();
    }
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
  el.stopBar?.addEventListener("click", handleStopBarClick);
  el.stopBar?.addEventListener("pointerdown", handleStopPointerDown);
  window.addEventListener("pointermove", handleStopPointerMove);
  window.addEventListener("pointerup", handleStopPointerUp);
  window.addEventListener("resize", () => {
    if (stopPopoverIndex != null) positionStopPopover(stopPopoverIndex);
  });
  document.addEventListener("click", handleStopOutsideClick);

  el.addStop?.addEventListener("click", () => {
    if (state.stops.length >= MAX_STOPS) return;
    const lastPos = state.stops[state.stops.length - 1]?.pos ?? 100;
    const nextIndex = insertStopAt(clampNumber(lastPos + 10, 0, 100), randomHex());
    if (nextIndex == null) return;
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
  if (el.exportBtn) el.exportBtn.textContent = "Sao chép CSS";
  el.exportBtn?.addEventListener("click", async () => {
    const ok = await copyText(exportCssProperty());
    showToast(ok ? "Đã sao chép CSS." : "Không thể sao chép.");
  });
  el.copyTokenBtn?.addEventListener("click", async () => {
    const ok = await copyText(exportTokenBlock());
    showToast(ok ? "Đã sao chép token." : "Không thể sao chép.");
  });
  el.exportToken?.addEventListener("click", async () => {
    const ok = await copyText(exportTokenString());
    showToast(ok ? "Đã sao chép token có %." : "Không thể sao chép token.");
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

  document.addEventListener("click", (event) => {
    if (!el.exportMenu?.open) return;
    if (event.target.closest("#gradientExportMenu")) return;
    el.exportMenu.open = false;
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
  initSampleDetail();
}

init();

window.addEventListener("tc:hex-apply", (event) => {
  applyHexesFromHub(event?.detail);
});
