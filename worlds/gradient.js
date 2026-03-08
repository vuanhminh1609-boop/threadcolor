import { composeHandoff } from "../scripts/handoff.js";
import { resolveIncoming } from "../scripts/workbench_context.js";

const MIN_STOPS = 2;
const MAX_STOPS = 7;
const HISTORY_LIMIT = 80;
const BANDING_SAMPLE_COUNT = 256;
const SHARE_STATE_VERSION = 1;
const ASSET_STORAGE_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const FEED_STORAGE_KEY = "tc_community_feed";
const MY_PRESET_STORAGE_KEY = "sc_w2_presets_v1";
const MY_PRESET_LIMIT = 200;
const HANDOFF_FROM = "gradient";
const VALID_GRADIENT_TYPES = new Set(["linear", "radial", "conic"]);
const incomingHandoff = resolveIncoming({ search: window.location.search, hash: window.location.hash });
const hasStrictIncoming = incomingHandoff && (incomingHandoff.source === "asset" || incomingHandoff.source === "buffer");
const GRADIENT_PRESETS = [
  {
    key: "neon",
    angle: 118,
    stops: ["#ff4fd8", "#7f5cff", "#30e8bf"]
  },
  {
    key: "ocean",
    angle: 128,
    stops: ["#0f6ba8", "#15a5cf", "#73d8f3"]
  },
  {
    key: "ink",
    angle: 140,
    stops: ["#111827", "#334155", "#cbd5e1"]
  },
  {
    key: "sunset",
    angle: 118,
    stops: ["#ff7b00", "#ff3d81", "#5f27cd"]
  },
  {
    key: "chrome",
    angle: 132,
    stops: ["#1d2738", "#6f7f98", "#d8e1ee"]
  },
  {
    key: "crystal",
    angle: 132,
    stops: ["#67e8f9", "#60a5fa", "#a78bfa"]
  },
  {
    key: "forest",
    angle: 120,
    stops: ["#14532d", "#22c55e", "#86efac"]
  },
  {
    key: "ember",
    angle: 130,
    stops: ["#451a03", "#d97706", "#facc15"]
  }
];
const USE_CASE_CONFIG = {
  webui: {
    key: "webui",
    presetKey: "crystal",
    previewTab: "ui",
    hint: "Web / UI: ưu tiên tương phản sạch, bám card và CTA."
  },
  branding: {
    key: "branding",
    presetKey: "sunset",
    previewTab: "poster",
    hint: "Branding: ưu tiên điểm nhấn thị giác mạnh cho headline và chiến dịch."
  },
  textile: {
    key: "textile",
    presetKey: "forest",
    previewTab: "thread",
    hint: "Textile: ưu tiên dải chuyển mềm, kiểm tra bề mặt sợi và nhịp chỉ."
  },
  print: {
    key: "print",
    presetKey: "chrome",
    previewTab: "poster",
    hint: "Print: ưu tiên dải kiểm soát tốt, hạn chế banding khi xuất in."
  }
};

const state = {
  stops: [
    { hex: "#ff6b6b", pos: 0 },
    { hex: "#ffd93d", pos: 50 },
    { hex: "#6ee7b7", pos: 100 }
  ],
  angle: 90,
  type: "linear",
  samples: [],
  myPresets: []
};
const EXPORT_FORMATS = ["css", "vars", "token", "tailwind"];
const CONTEXT_PREVIEW_TABS = ["ui", "poster", "thread"];
let exportFormatActive = "css";
let contextPreviewActiveTab = "ui";
let activeUseCase = "webui";
let previewDitherEnabled = false;
let latestBandingAnalysis = null;

let stopDragIndex = null;
let stopDragPointerId = null;
let stopDragMoved = false;
let stopSuppressClick = false;
let stopDragHistorySnapshot = null;
let stopPopoverIndex = null;
let stopPopoverEl = null;
let sampleDetailOpen = false;
let sampleDetailBodyOverflow = "";
let angleHistorySnapshot = null;
let importPanelOpen = false;
let importPanelBodyOverflow = "";
const historyState = {
  undo: [],
  redo: []
};

const el = {
  preview: document.getElementById("gradientPreview"),
  presetRail: document.getElementById("gradientPresetRail"),
  myPresetRail: document.getElementById("gradientMyPresetRail"),
  savePresetBtn: document.getElementById("gradientSavePreset"),
  angleRange: document.getElementById("gradientAngle"),
  angleInput: document.getElementById("gradientAngleInput"),
  angleValue: document.getElementById("gradientAngleValue"),
  resetAngle: document.getElementById("gradientResetAngle"),
  typeSelect: document.getElementById("gradientType"),
  stopsWrap: document.getElementById("gradientStops"),
  stopBar: document.getElementById("gradientStopBar"),
  undoBtn: document.getElementById("gradientUndo"),
  redoBtn: document.getElementById("gradientRedo"),
  addStop: document.getElementById("gradientAdd"),
  randomStop: document.getElementById("gradientRandom"),
  exportBtn: document.getElementById("gradientExport"),
  copyShareLinkBtn: document.getElementById("gradientCopyShareLink"),
  copyCssOptionBtn: document.getElementById("gradientCopyCssOption"),
  copyTokenBtn: document.getElementById("gradientCopyToken"),
  copyTailwindBtn: document.getElementById("gradientCopyTailwind"),
  copyMenu: document.getElementById("gradientCopyMenu"),
  toPalette: document.getElementById("gradientToPalette"),
  samplesWrap: document.getElementById("gradientSamples"),
  saveLibrary: document.getElementById("gradientSaveLibrary"),
  useLibrary: document.getElementById("gradientUseLibrary"),
  share: document.getElementById("gradientShare"),
  exportSvg: document.getElementById("gradientExportSvg"),
  exportToken: document.getElementById("gradientExportToken"),
  importInput: document.getElementById("gradientImportInput"),
  importApplyBtn: document.getElementById("gradientImportApply"),
  openImportPanelBtn: document.getElementById("gradientOpenImportPanel"),
  importPanel: document.getElementById("gradientImportPanel"),
  exportMenu: document.getElementById("gradientExportMenu"),
  exportCode: document.getElementById("gradientExportCode"),
  exportCodeCopy: document.getElementById("gradientExportCodeCopy"),
  exportTabCss: document.getElementById("gradientExportTabCss"),
  exportTabVars: document.getElementById("gradientExportTabVars"),
  exportTabToken: document.getElementById("gradientExportTabToken"),
  exportTabTailwind: document.getElementById("gradientExportTabTailwind"),
  contextTabUi: document.getElementById("gradientContextTabUi"),
  contextTabPoster: document.getElementById("gradientContextTabPoster"),
  contextTabThread: document.getElementById("gradientContextTabThread"),
  contextPanelUi: document.getElementById("gradientContextPanelUi"),
  contextPanelPoster: document.getElementById("gradientContextPanelPoster"),
  contextPanelThread: document.getElementById("gradientContextPanelThread"),
  contextSurfaceUi: document.getElementById("gradientContextSurfaceUi"),
  contextSurfacePoster: document.getElementById("gradientContextSurfacePoster"),
  contextSurfaceThread: document.getElementById("gradientContextSurfaceThread"),
  useCaseGroup: document.getElementById("gradientUseCaseGroup"),
  useCaseHint: document.getElementById("gradientUseCaseHint"),
  useCaseButtons: Array.from(document.querySelectorAll("[data-gradient-usecase]")),
  bandingScore: document.getElementById("gradientBandingScore"),
  bandingStatus: document.getElementById("gradientBandingStatus"),
  bandingMeta: document.getElementById("gradientBandingMeta"),
  bandingSuggestion: document.getElementById("gradientBandingSuggestion"),
  addMidStopBtn: document.getElementById("gradientAddMidStop"),
  toggleDitherBtn: document.getElementById("gradientToggleDither"),
  sampleDetail: document.getElementById("gradientSampleDetail"),
  sampleDetailBody: document.getElementById("gradientSampleDetailBody"),
  sampleDetailTitle: document.getElementById("gradientSampleDetailTitle"),
  sampleDetailSubtitle: document.getElementById("gradientSampleDetailSubtitle")
};

function t(key, fallback = "", params) {
  const translate = window.tcI18n?.t;
  if (typeof translate !== "function") return fallback;
  return translate(key, fallback, params);
}

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

function cloneStops(stops) {
  return migrateStops(stops).map((stop) => ({
    hex: stop.hex,
    pos: clampNumber(stop.pos ?? 0, 0, 100),
    alpha: Number.isFinite(stop.alpha) ? clampNumber(stop.alpha, 0, 1) : undefined
  }));
}

function captureStateSnapshot() {
  return {
    stops: cloneStops(state.stops),
    angle: clampNumber(state.angle, 0, 360),
    type: state.type === "radial" || state.type === "conic" ? state.type : "linear"
  };
}

function areSnapshotsEqual(left, right) {
  if (!left || !right) return false;
  return JSON.stringify(left) === JSON.stringify(right);
}

function syncHistoryButtons() {
  if (el.undoBtn) {
    el.undoBtn.disabled = historyState.undo.length === 0;
    el.undoBtn.setAttribute("aria-disabled", historyState.undo.length === 0 ? "true" : "false");
  }
  if (el.redoBtn) {
    el.redoBtn.disabled = historyState.redo.length === 0;
    el.redoBtn.setAttribute("aria-disabled", historyState.redo.length === 0 ? "true" : "false");
  }
}

function recordHistory(beforeSnapshot) {
  if (!beforeSnapshot) return false;
  const afterSnapshot = captureStateSnapshot();
  if (areSnapshotsEqual(beforeSnapshot, afterSnapshot)) return false;
  historyState.undo.push(beforeSnapshot);
  if (historyState.undo.length > HISTORY_LIMIT) {
    historyState.undo.shift();
  }
  historyState.redo = [];
  syncHistoryButtons();
  return true;
}

function applySnapshot(snapshot) {
  if (!snapshot) return;
  state.stops = cloneStops(snapshot.stops);
  state.type = snapshot.type === "radial" || snapshot.type === "conic" ? snapshot.type : "linear";
  if (el.typeSelect) el.typeSelect.value = state.type;
  if (el.angleRange) el.angleRange.value = String(clampNumber(snapshot.angle, 0, 360));
  if (el.angleInput) el.angleInput.value = String(clampNumber(snapshot.angle, 0, 360));
  state.angle = clampNumber(snapshot.angle, 0, 360);
  renderStops();
  schedulePreview();
}

function runUndo() {
  if (!historyState.undo.length) return;
  const previous = historyState.undo.pop();
  historyState.redo.push(captureStateSnapshot());
  if (historyState.redo.length > HISTORY_LIMIT) {
    historyState.redo.shift();
  }
  applySnapshot(previous);
  syncHistoryButtons();
  showToast(t("gradient.toast.undo", "Đã hoàn tác."));
}

function runRedo() {
  if (!historyState.redo.length) return;
  const next = historyState.redo.pop();
  historyState.undo.push(captureStateSnapshot());
  if (historyState.undo.length > HISTORY_LIMIT) {
    historyState.undo.shift();
  }
  applySnapshot(next);
  syncHistoryButtons();
  showToast(t("gradient.toast.redo", "Đã làm lại."));
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

function exportTailwindString(stops = state.stops) {
  return `bg-[${gradientCss(stops).replace(/\s+/g, "_")}]`;
}

function exportCssGradientText(stops = state.stops) {
  return gradientCss(stops);
}

function exportCssVarsText(stops = state.stops) {
  const gradientValue = gradientCss(stops);
  return `:root {\n  --sc-gradient-1: ${gradientValue};\n}\n\n.bg-demo {\n  background-image: var(--sc-gradient-1);\n}\n`;
}

function exportTokenJsonText(stops = state.stops) {
  const payload = {
    type: state.type,
    angleDeg: clampNumber(state.angle, 0, 360),
    stops: migrateStops(stops)
      .slice()
      .sort((a, b) => (a.pos ?? 0) - (b.pos ?? 0))
      .map((stop) => ({
        color: (stop.hex || "").toUpperCase(),
        pos: clampNumber(Math.round(stop.pos ?? 0), 0, 100)
      }))
  };
  return JSON.stringify(payload, null, 2);
}

function getExportFormatText(format = exportFormatActive) {
  if (format === "vars") return exportCssVarsText();
  if (format === "token") return exportTokenJsonText();
  if (format === "tailwind") return exportTailwindString();
  return exportCssGradientText();
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

function normalizeParsedStops(rawStops) {
  if (!Array.isArray(rawStops) || !rawStops.length) return [];
  const allMissingPos = rawStops.every((stop) => !Number.isFinite(stop?.pos));
  const withPositions = allMissingPos
    ? rawStops.map((stop, index) => ({
        ...stop,
        pos: Math.round((index / Math.max(1, rawStops.length - 1)) * 100)
      }))
    : rawStops;
  return migrateStops(withPositions)
    .map((stop) => ({
      hex: normalizeHex(stop.hex) || randomHex(),
      pos: clampNumber(stop.pos ?? 0, 0, 100),
      alpha: Number.isFinite(stop.alpha) ? clampNumber(stop.alpha, 0, 1) : undefined
    }))
    .sort((a, b) => (a.pos ?? 0) - (b.pos ?? 0));
}

function reduceStopsToLimit(stops, limit = MAX_STOPS) {
  const list = normalizeParsedStops(stops);
  if (list.length <= limit) return list;
  const total = list.length;
  const picked = [];
  for (let i = 0; i < limit; i += 1) {
    const idx = Math.round((i * (total - 1)) / Math.max(1, limit - 1));
    if (!picked.includes(idx)) picked.push(idx);
  }
  if (!picked.includes(0)) picked.unshift(0);
  if (!picked.includes(total - 1)) picked.push(total - 1);
  for (let i = 1; i < total - 1 && picked.length < limit; i += 1) {
    if (!picked.includes(i)) picked.push(i);
  }
  picked.sort((a, b) => a - b);
  return picked.slice(0, limit).map((idx) => ({ ...list[idx] }));
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
    const parsedAngle = parseFloat(first);
    if (!Number.isFinite(parsedAngle)) return null;
    angle = clampNumber(parsedAngle, 0, 360);
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
      "to top left": 315,
      "to right top": 45,
      "to right bottom": 135,
      "to left top": 315,
      "to left bottom": 225
    };
    const direction = first.trim().toLowerCase();
    if (!Object.prototype.hasOwnProperty.call(map, direction)) return null;
    angle = map[direction];
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
  const normalizedStops = normalizeParsedStops(stops);
  const reducedStops = reduceStopsToLimit(normalizedStops, MAX_STOPS);
  if (reducedStops.length < MIN_STOPS) return null;
  return {
    type: "linear",
    angle,
    stops: reducedStops
  };
}

function applyImportedGradient(raw) {
  const parsed = parseLinearGradient(raw);
  if (!parsed) {
    showToast(t("gradient.import.unsupported", "Không hỗ trợ cú pháp này. Hãy dùng linear-gradient(...) hợp lệ."));
    return;
  }
  const beforeSnapshot = captureStateSnapshot();
  state.type = parsed.type;
  state.angle = parsed.angle;
  state.stops = parsed.stops;
  if (el.typeSelect) el.typeSelect.value = state.type;
  renderStops();
  schedulePreview();
  applyAngle(state.angle, { record: false });
  recordHistory(beforeSnapshot);
  showToast(t("gradient.import.applied", "Đã phân tích và áp dụng dải chuyển từ CSS."));
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
  renderExportFormatPreview();
  renderContextPreview();
  renderBandingPanel();
  renderPreviewDither();
}

function getContextPreviewPairs() {
  return [
    { key: "ui", tab: el.contextTabUi, panel: el.contextPanelUi },
    { key: "poster", tab: el.contextTabPoster, panel: el.contextPanelPoster },
    { key: "thread", tab: el.contextTabThread, panel: el.contextPanelThread }
  ];
}

function renderContextTabs() {
  const pairs = getContextPreviewPairs();
  pairs.forEach((entry) => {
    if (!entry.tab || !entry.panel) return;
    const active = contextPreviewActiveTab === entry.key;
    entry.tab.classList.toggle("is-active", active);
    entry.tab.setAttribute("aria-selected", active ? "true" : "false");
    entry.tab.setAttribute("tabindex", active ? "0" : "-1");
    entry.panel.hidden = !active;
    entry.panel.setAttribute("aria-hidden", active ? "false" : "true");
  });
}

function setContextPreviewTab(nextTab) {
  contextPreviewActiveTab = CONTEXT_PREVIEW_TABS.includes(nextTab) ? nextTab : "ui";
  renderContextTabs();
}

function renderContextPreview() {
  const gradient = gradientCss();
  if (el.contextSurfaceUi) {
    el.contextSurfaceUi.style.backgroundImage = gradient;
  }
  if (el.contextSurfacePoster) {
    el.contextSurfacePoster.style.backgroundImage = gradient;
  }
  if (el.contextSurfaceThread) {
    const patternLight = "repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.16) 0 2px, rgba(255, 255, 255, 0) 2px 9px)";
    const patternDark = "repeating-linear-gradient(-45deg, rgba(15, 23, 42, 0.2) 0 1px, rgba(15, 23, 42, 0) 1px 8px)";
    el.contextSurfaceThread.style.backgroundImage = `${patternLight}, ${patternDark}, ${gradient}`;
  }
}

function getBandingStops() {
  return cloneStops(state.stops)
    .slice()
    .sort((a, b) => (a.pos ?? 0) - (b.pos ?? 0));
}

function interpolateRgbAtPos(stops, pos) {
  const list = Array.isArray(stops) ? stops : [];
  if (!list.length) return { r: 0, g: 0, b: 0 };
  const clampedPos = clampNumber(pos, 0, 100);
  let left = list[0];
  let right = list[list.length - 1];
  for (let i = 0; i < list.length; i += 1) {
    const stop = list[i];
    if ((stop.pos ?? 0) <= clampedPos) left = stop;
    if ((stop.pos ?? 0) >= clampedPos) {
      right = stop;
      break;
    }
  }
  const leftRgb = hexToRgb(left.hex) || { r: 0, g: 0, b: 0 };
  const rightRgb = hexToRgb(right.hex) || leftRgb;
  if (left === right) return leftRgb;
  const span = (right.pos ?? 0) - (left.pos ?? 0);
  const ratio = span === 0 ? 0 : clampNumber((clampedPos - (left.pos ?? 0)) / span, 0, 1);
  return {
    r: leftRgb.r + (rightRgb.r - leftRgb.r) * ratio,
    g: leftRgb.g + (rightRgb.g - leftRgb.g) * ratio,
    b: leftRgb.b + (rightRgb.b - leftRgb.b) * ratio
  };
}

function quantizeRgb(rgb) {
  return {
    r: clampNumber(Math.round(rgb.r ?? 0), 0, 255),
    g: clampNumber(Math.round(rgb.g ?? 0), 0, 255),
    b: clampNumber(Math.round(rgb.b ?? 0), 0, 255)
  };
}

function getBandingStatusKey(score) {
  if (score >= 72) return "gradient.banding.status.smooth";
  if (score >= 45) return "gradient.banding.status.risk";
  return "gradient.banding.status.high";
}

function analyzeBanding(stopsInput = state.stops) {
  const stops = cloneStops(stopsInput)
    .slice()
    .sort((a, b) => (a.pos ?? 0) - (b.pos ?? 0));
  if (stops.length < MIN_STOPS) {
    return {
      score: 0,
      flatRatio: 1,
      lowRatio: 1,
      statusKey: "gradient.banding.status.high",
      suggestion: null
    };
  }
  const sampleCount = BANDING_SAMPLE_COUNT;
  const samples = [];
  for (let i = 0; i < sampleCount; i += 1) {
    const pos = (i / Math.max(1, sampleCount - 1)) * 100;
    samples.push({
      pos,
      rgb: interpolateRgbAtPos(stops, pos)
    });
  }
  const quantized = samples.map((sample) => ({
    pos: sample.pos,
    rgb: quantizeRgb(sample.rgb)
  }));

  let flatSegments = 0;
  let lowSegments = 0;
  let longestFlatRun = 0;
  let currentFlatRun = 0;
  const segmentMetrics = [];
  for (let i = 1; i < quantized.length; i += 1) {
    const prev = quantized[i - 1].rgb;
    const curr = quantized[i].rgb;
    const delta = Math.abs(curr.r - prev.r) + Math.abs(curr.g - prev.g) + Math.abs(curr.b - prev.b);
    if (delta === 0) {
      flatSegments += 1;
      currentFlatRun += 1;
      longestFlatRun = Math.max(longestFlatRun, currentFlatRun);
    } else {
      currentFlatRun = 0;
    }
    if (delta <= 2) lowSegments += 1;
    segmentMetrics.push({
      index: i,
      delta
    });
  }

  const totalSegments = Math.max(1, quantized.length - 1);
  const flatRatio = flatSegments / totalSegments;
  const lowRatio = lowSegments / totalSegments;
  const longestFlatRatio = longestFlatRun / totalSegments;
  const stopBonus = clampNumber((stops.length - 2) * 0.03, 0, 0.12);
  const riskRaw = flatRatio * 0.62 + lowRatio * 0.28 + longestFlatRatio * 0.1;
  const risk = clampNumber(riskRaw - stopBonus, 0, 1);
  const score = clampNumber(Math.round((1 - risk) * 100), 0, 100);

  segmentMetrics.sort((a, b) => (a.delta - b.delta) || (a.index - b.index));
  let suggestion = null;
  for (let i = 0; i < segmentMetrics.length; i += 1) {
    const metric = segmentMetrics[i];
    const pos = clampNumber(((metric.index - 0.5) / Math.max(1, sampleCount - 1)) * 100, 0, 100);
    const nearestDistance = stops.reduce((min, stop) => {
      return Math.min(min, Math.abs((stop.pos ?? 0) - pos));
    }, Number.POSITIVE_INFINITY);
    if (nearestDistance < 2.4) continue;
    const rgb = interpolateRgbAtPos(stops, pos);
    suggestion = {
      pos: Math.round(pos * 10) / 10,
      hex: rgbToHex(rgb.r, rgb.g, rgb.b).toUpperCase()
    };
    break;
  }

  return {
    score,
    flatRatio,
    lowRatio,
    statusKey: getBandingStatusKey(score),
    suggestion
  };
}

function renderBandingPanel() {
  latestBandingAnalysis = analyzeBanding(state.stops);
  const analysis = latestBandingAnalysis;
  if (!analysis) return;

  if (el.bandingScore) {
    el.bandingScore.textContent = String(analysis.score);
  }
  if (el.bandingStatus) {
    el.bandingStatus.textContent = t(analysis.statusKey, "Mượt");
    el.bandingStatus.dataset.level = analysis.statusKey;
  }
  if (el.bandingMeta) {
    el.bandingMeta.textContent = t(
      "gradient.banding.meta",
      "Đứng màu: {flatPct}% · Biến thiên thấp: {lowPct}%",
      {
        flatPct: Math.round(analysis.flatRatio * 100),
        lowPct: Math.round(analysis.lowRatio * 100)
      }
    );
  }
  if (el.bandingSuggestion) {
    if (analysis.suggestion && state.stops.length < MAX_STOPS) {
      el.bandingSuggestion.textContent = t(
        "gradient.banding.suggestion",
        "Gợi ý: thêm điểm neo quanh {pos}% ({color}).",
        {
          pos: analysis.suggestion.pos,
          color: analysis.suggestion.hex
        }
      );
    } else if (state.stops.length >= MAX_STOPS) {
      el.bandingSuggestion.textContent = t(
        "gradient.banding.suggestionMax",
        "Đã đủ số điểm neo tối đa, hãy chỉnh vị trí/màu trước khi thêm mới."
      );
    } else {
      el.bandingSuggestion.textContent = t(
        "gradient.banding.suggestionNone",
        "Hiện chưa cần thêm điểm neo giữa."
      );
    }
  }
  if (el.addMidStopBtn) {
    const canAdd = Boolean(analysis.suggestion) && state.stops.length < MAX_STOPS;
    el.addMidStopBtn.disabled = !canAdd;
    el.addMidStopBtn.setAttribute("aria-disabled", canAdd ? "false" : "true");
  }
  if (el.toggleDitherBtn) {
    el.toggleDitherBtn.textContent = previewDitherEnabled
      ? t("gradient.banding.actions.removeDither", "Tắt hạt mịn (dither)")
      : t("gradient.banding.actions.addDither", "Thêm hạt mịn (dither)");
  }
}

function renderPreviewDither() {
  const targets = [el.preview, el.contextSurfaceUi, el.contextSurfacePoster, el.contextSurfaceThread];
  targets.forEach((node) => {
    if (!node) return;
    node.classList.toggle("tc-dither-on", previewDitherEnabled);
  });
}

function addSuggestedMidStop() {
  if (!latestBandingAnalysis?.suggestion || state.stops.length >= MAX_STOPS) return;
  const beforeSnapshot = captureStateSnapshot();
  const index = insertStopAt(latestBandingAnalysis.suggestion.pos, latestBandingAnalysis.suggestion.hex);
  if (index == null) return;
  renderStops();
  schedulePreview();
  openStopPopover(index);
  recordHistory(beforeSnapshot);
  showToast(t(
    "gradient.banding.toast.midStopAdded",
    "Đã thêm điểm neo giữa tại {pos}% ({color}).",
    {
      pos: latestBandingAnalysis.suggestion.pos,
      color: latestBandingAnalysis.suggestion.hex
    }
  ));
}

function togglePreviewDither() {
  previewDitherEnabled = !previewDitherEnabled;
  renderPreviewDither();
  renderBandingPanel();
  showToast(previewDitherEnabled
    ? t("gradient.banding.toast.ditherOn", "Đã bật hạt mịn cho preview.")
    : t("gradient.banding.toast.ditherOff", "Đã tắt hạt mịn cho preview."));
}

function setExportFormat(format) {
  if (!EXPORT_FORMATS.includes(format)) {
    exportFormatActive = "css";
    return;
  }
  exportFormatActive = format;
}

function renderExportFormatPreview() {
  const tabMap = {
    css: el.exportTabCss,
    vars: el.exportTabVars,
    token: el.exportTabToken,
    tailwind: el.exportTabTailwind
  };
  EXPORT_FORMATS.forEach((format) => {
    const tab = tabMap[format];
    if (!tab) return;
    const active = format === exportFormatActive;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", active ? "true" : "false");
  });
  if (el.exportCode) {
    el.exportCode.textContent = getExportFormatText(exportFormatActive);
  }
}

function buildPresetStops(preset) {
  if (!preset) return [];
  const source = Array.isArray(preset.stops) ? preset.stops : [];
  const cleaned = source.map((hex, idx) => ({
    hex: normalizeHex(hex) || randomHex(),
    pos: Math.round((idx / Math.max(1, source.length - 1)) * 100)
  }));
  return cloneStops(cleaned);
}

function getPresetByKey(key) {
  return GRADIENT_PRESETS.find((preset) => preset.key === key) || null;
}

function applyPreset(preset) {
  if (!preset) return;
  const presetStops = buildPresetStops(preset);
  if (!presetStops.length) return;
  const beforeSnapshot = captureStateSnapshot();
  closeStopPopover();
  state.stops = presetStops;
  state.type = preset.type === "radial" || preset.type === "conic" ? preset.type : "linear";
  if (el.typeSelect) el.typeSelect.value = state.type;
  state.angle = clampNumber(preset.angle ?? 90, 0, 360);
  if (el.angleRange) el.angleRange.value = String(state.angle);
  if (el.angleInput) el.angleInput.value = String(state.angle);
  renderStops();
  schedulePreview();
  recordHistory(beforeSnapshot);
  showToast(t("gradient.toast.presetApplied", "Đã áp dụng preset dải chuyển."));
}

function renderUseCaseState() {
  const cfg = USE_CASE_CONFIG[activeUseCase] || USE_CASE_CONFIG.webui;
  (el.useCaseButtons || []).forEach((button) => {
    const key = String(button?.dataset?.gradientUsecase || "");
    const active = key === cfg.key;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
  if (el.useCaseHint) {
    el.useCaseHint.textContent = cfg.hint;
  }
}

function setUseCase(nextKey, options = {}) {
  const cfg = USE_CASE_CONFIG[nextKey] || USE_CASE_CONFIG.webui;
  activeUseCase = cfg.key;
  renderUseCaseState();
  if (cfg.previewTab) {
    setContextPreviewTab(cfg.previewTab);
  }
  if (!options.skipPreset) {
    const preset = getPresetByKey(cfg.presetKey);
    if (preset) {
      applyPreset(preset);
    }
  }
}

function renderPresetRail() {
  if (!el.presetRail) return;
  el.presetRail.innerHTML = "";
  GRADIENT_PRESETS.forEach((preset) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tc-btn tc-chip px-3 py-2 text-sm tc-gradient-preset";
    const label = t(`gradient.presets.items.${preset.key}`, preset.key);
    button.setAttribute("aria-label", label);
    const swatch = document.createElement("span");
    swatch.className = "tc-gradient-preset-swatch";
    swatch.style.background = gradientCss(buildPresetStops(preset), preset.angle ?? 90, preset.type || "linear");
    const text = document.createElement("span");
    text.textContent = label;
    button.appendChild(swatch);
    button.appendChild(text);
    button.addEventListener("click", () => {
      applyPreset(preset);
    });
    el.presetRail.appendChild(button);
  });
}

function normalizeGradientType(type) {
  return VALID_GRADIENT_TYPES.has(type) ? type : "linear";
}

function normalizePresetName(input, fallback = "") {
  const value = String(input ?? "").replace(/\s+/g, " ").trim();
  if (!value) return fallback;
  return value.slice(0, 80);
}

function createMyPresetId() {
  const randomPart = Math.random().toString(36).slice(2, 8);
  return `w2preset_${Date.now()}_${randomPart}`;
}

function buildDefaultMyPresetName(index = 1) {
  const safeIndex = Math.max(1, Number(index) || 1);
  return t("gradient.myPresets.defaultName", "Preset {index}", { index: safeIndex });
}

function serializeStopsForMyPreset(stopsInput = state.stops) {
  return migrateStops(stopsInput)
    .slice()
    .sort((a, b) => (a.pos ?? 0) - (b.pos ?? 0))
    .map((stop) => ({
      color: (normalizeHex(stop.hex) || "#000000").toUpperCase(),
      pos: clampNumber(Math.round(stop.pos ?? 0), 0, 100)
    }));
}

function normalizeMyPresetStops(stopsInput) {
  const normalized = normalizeParsedStops(migrateStops(stopsInput));
  const reduced = reduceStopsToLimit(normalized, MAX_STOPS);
  return reduced
    .slice()
    .sort((a, b) => (a.pos ?? 0) - (b.pos ?? 0))
    .map((stop) => ({
      color: (normalizeHex(stop.hex) || "#000000").toUpperCase(),
      pos: clampNumber(Math.round(stop.pos ?? 0), 0, 100)
    }));
}

function toStateStopsFromMyPreset(preset) {
  const source = Array.isArray(preset?.stops) ? preset.stops : [];
  return cloneStops(source.map((stop) => ({
    hex: stop?.color || stop?.hex,
    pos: stop?.pos
  })));
}

function sanitizeMyPreset(rawPreset, index = 0) {
  if (!rawPreset || typeof rawPreset !== "object") return null;
  const stops = normalizeMyPresetStops(rawPreset.stops);
  if (stops.length < MIN_STOPS) return null;
  const now = new Date().toISOString();
  const createdAt = typeof rawPreset.createdAt === "string" && rawPreset.createdAt.trim()
    ? rawPreset.createdAt
    : now;
  const updatedAt = typeof rawPreset.updatedAt === "string" && rawPreset.updatedAt.trim()
    ? rawPreset.updatedAt
    : createdAt;
  return {
    id: typeof rawPreset.id === "string" && rawPreset.id.trim() ? rawPreset.id.trim() : createMyPresetId(),
    name: normalizePresetName(rawPreset.name, buildDefaultMyPresetName(index + 1)),
    type: normalizeGradientType(rawPreset.type),
    angleDeg: clampNumber(rawPreset.angleDeg ?? rawPreset.angle ?? 90, 0, 360),
    stops,
    createdAt,
    updatedAt
  };
}

function saveMyPresetsToStorage() {
  try {
    localStorage.setItem(MY_PRESET_STORAGE_KEY, JSON.stringify(state.myPresets));
    return true;
  } catch (_err) {
    return false;
  }
}

function loadMyPresetsFromStorage() {
  try {
    const raw = localStorage.getItem(MY_PRESET_STORAGE_KEY);
    if (!raw) {
      state.myPresets = [];
      return;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      state.myPresets = [];
      return;
    }
    const usedIds = new Set();
    const cleaned = [];
    parsed.forEach((item, index) => {
      if (cleaned.length >= MY_PRESET_LIMIT) return;
      const normalized = sanitizeMyPreset(item, index);
      if (!normalized) return;
      while (usedIds.has(normalized.id)) {
        normalized.id = createMyPresetId();
      }
      usedIds.add(normalized.id);
      cleaned.push(normalized);
    });
    state.myPresets = cleaned;
    if (cleaned.length !== parsed.length) {
      saveMyPresetsToStorage();
    }
  } catch (_err) {
    state.myPresets = [];
  }
}

function ensureMyPresetCapacity() {
  if (state.myPresets.length < MY_PRESET_LIMIT) return true;
  showToast(t("gradient.myPresets.toast.limitReached", "Đã đạt giới hạn {limit} preset.", {
    limit: MY_PRESET_LIMIT
  }));
  return false;
}

function formatPresetDate(isoStamp) {
  if (!isoStamp) return "";
  const stamp = new Date(isoStamp);
  if (Number.isNaN(stamp.getTime())) return "";
  return stamp.toLocaleDateString("vi-VN");
}

function renderMyPresetRail() {
  if (!el.myPresetRail) return;
  el.myPresetRail.innerHTML = "";
  if (!state.myPresets.length) {
    const empty = document.createElement("p");
    empty.className = "tc-my-preset-empty";
    empty.textContent = t(
      "gradient.myPresets.empty",
      "Chưa có preset của bạn. Hãy lưu dải chuyển hiện tại để dùng lại nhanh."
    );
    el.myPresetRail.appendChild(empty);
    return;
  }
  state.myPresets.forEach((preset) => {
    const card = document.createElement("article");
    card.className = "tc-my-preset-card";

    const name = document.createElement("p");
    name.className = "tc-my-preset-name";
    name.textContent = preset.name;
    card.appendChild(name);

    const meta = document.createElement("p");
    meta.className = "tc-my-preset-meta";
    const updated = formatPresetDate(preset.updatedAt) || "--";
    meta.textContent = t(
      "gradient.myPresets.meta",
      "{count} điểm neo · cập nhật {updated}",
      { count: preset.stops.length, updated }
    );
    card.appendChild(meta);

    const preview = document.createElement("div");
    preview.className = "tc-my-preset-preview";
    preview.style.background = gradientCss(
      toStateStopsFromMyPreset(preset),
      clampNumber(preset.angleDeg ?? 90, 0, 360),
      normalizeGradientType(preset.type)
    );
    card.appendChild(preview);

    const actions = document.createElement("div");
    actions.className = "tc-my-preset-actions";

    const applyBtn = document.createElement("button");
    applyBtn.type = "button";
    applyBtn.className = "tc-btn tc-btn-primary px-3 py-1 text-xs";
    applyBtn.textContent = t("gradient.myPresets.actions.apply", "Áp dụng");
    applyBtn.addEventListener("click", () => {
      applyMyPreset(preset.id);
    });
    actions.appendChild(applyBtn);

    const renameBtn = document.createElement("button");
    renameBtn.type = "button";
    renameBtn.className = "tc-btn tc-chip px-3 py-1 text-xs";
    renameBtn.textContent = t("gradient.myPresets.actions.rename", "Đổi tên");
    renameBtn.addEventListener("click", () => {
      renameMyPreset(preset.id);
    });
    actions.appendChild(renameBtn);

    const duplicateBtn = document.createElement("button");
    duplicateBtn.type = "button";
    duplicateBtn.className = "tc-btn tc-chip px-3 py-1 text-xs";
    duplicateBtn.textContent = t("gradient.myPresets.actions.duplicate", "Nhân bản");
    duplicateBtn.addEventListener("click", () => {
      duplicateMyPreset(preset.id);
    });
    actions.appendChild(duplicateBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "tc-btn tc-chip px-3 py-1 text-xs";
    deleteBtn.textContent = t("gradient.myPresets.actions.delete", "Xoá");
    deleteBtn.addEventListener("click", () => {
      deleteMyPreset(preset.id);
    });
    actions.appendChild(deleteBtn);

    card.appendChild(actions);
    el.myPresetRail.appendChild(card);
  });
}

function saveCurrentAsMyPreset() {
  if (!ensureMyPresetCapacity()) return;
  const now = new Date().toISOString();
  const candidate = sanitizeMyPreset({
    id: createMyPresetId(),
    name: buildDefaultMyPresetName(state.myPresets.length + 1),
    type: state.type,
    angleDeg: state.angle,
    stops: serializeStopsForMyPreset(),
    createdAt: now,
    updatedAt: now
  }, state.myPresets.length);
  if (!candidate) {
    showToast(t("gradient.myPresets.toast.invalid", "Không thể lưu preset hiện tại."));
    return;
  }
  state.myPresets.unshift(candidate);
  const ok = saveMyPresetsToStorage();
  renderMyPresetRail();
  showToast(ok
    ? t("gradient.myPresets.toast.saved", "Đã lưu thành preset.")
    : t("gradient.myPresets.toast.saveFailed", "Không thể lưu preset vào trình duyệt."));
}

function applyMyPreset(presetId) {
  const preset = state.myPresets.find((item) => item.id === presetId);
  if (!preset) return;
  const nextStops = toStateStopsFromMyPreset(preset);
  if (nextStops.length < MIN_STOPS) return;
  const beforeSnapshot = captureStateSnapshot();
  closeStopPopover();
  state.stops = nextStops;
  state.type = normalizeGradientType(preset.type);
  state.angle = clampNumber(preset.angleDeg ?? 90, 0, 360);
  if (el.typeSelect) el.typeSelect.value = state.type;
  if (el.angleRange) el.angleRange.value = String(state.angle);
  if (el.angleInput) el.angleInput.value = String(state.angle);
  renderStops();
  schedulePreview();
  recordHistory(beforeSnapshot);
  showToast(t("gradient.myPresets.toast.applied", "Đã áp dụng preset cá nhân."));
}

function renameMyPreset(presetId) {
  const preset = state.myPresets.find((item) => item.id === presetId);
  if (!preset) return;
  const nextNameRaw = window.prompt(
    t("gradient.myPresets.renamePrompt", "Nhập tên preset mới"),
    preset.name
  );
  if (nextNameRaw == null) return;
  const nextName = normalizePresetName(nextNameRaw, "");
  if (!nextName) {
    showToast(t("gradient.myPresets.toast.renameEmpty", "Tên preset không được để trống."));
    return;
  }
  preset.name = nextName;
  preset.updatedAt = new Date().toISOString();
  const ok = saveMyPresetsToStorage();
  renderMyPresetRail();
  showToast(ok
    ? t("gradient.myPresets.toast.renamed", "Đã đổi tên preset.")
    : t("gradient.myPresets.toast.saveFailed", "Không thể lưu preset vào trình duyệt."));
}

function duplicateMyPreset(presetId) {
  if (!ensureMyPresetCapacity()) return;
  const preset = state.myPresets.find((item) => item.id === presetId);
  if (!preset) return;
  const now = new Date().toISOString();
  const duplicated = sanitizeMyPreset({
    ...preset,
    id: createMyPresetId(),
    name: t("gradient.myPresets.copyName", "{name} (bản sao)", { name: preset.name }),
    createdAt: now,
    updatedAt: now
  }, state.myPresets.length);
  if (!duplicated) return;
  state.myPresets.unshift(duplicated);
  const ok = saveMyPresetsToStorage();
  renderMyPresetRail();
  showToast(ok
    ? t("gradient.myPresets.toast.duplicated", "Đã nhân bản preset.")
    : t("gradient.myPresets.toast.saveFailed", "Không thể lưu preset vào trình duyệt."));
}

function deleteMyPreset(presetId) {
  const preset = state.myPresets.find((item) => item.id === presetId);
  if (!preset) return;
  const shouldDelete = window.confirm(
    t("gradient.myPresets.confirmDelete", "Bạn có chắc muốn xoá?")
  );
  if (!shouldDelete) return;
  state.myPresets = state.myPresets.filter((item) => item.id !== presetId);
  const ok = saveMyPresetsToStorage();
  renderMyPresetRail();
  showToast(ok
    ? t("gradient.myPresets.toast.deleted", "Đã xoá preset.")
    : t("gradient.myPresets.toast.saveFailed", "Không thể lưu preset vào trình duyệt."));
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
    const beforeSnapshot = captureStateSnapshot();
    state.stops.splice(stopPopoverIndex, 1);
    closeStopPopover();
    renderStops();
    schedulePreview();
    recordHistory(beforeSnapshot);
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

function applyStopHex(index, value, options = {}) {
  const { record = true } = options;
  if (!state.stops[index]) return;
  const normalized = normalizeHex(value);
  if (!normalized) return;
  if (state.stops[index].hex === normalized) return;
  const beforeSnapshot = record ? captureStateSnapshot() : null;
  state.stops[index].hex = normalized;
  updateStopHandle(index);
  updateStopInputs(index);
  syncStopPopover(index);
  schedulePreview();
  if (record) recordHistory(beforeSnapshot);
}

function applyStopPos(index, value, options = {}) {
  const { record = true } = options;
  if (!state.stops[index]) return;
  const nextPos = clampNumber(value, 0, 100);
  if (Math.abs((state.stops[index].pos ?? 0) - nextPos) < 0.01) return;
  const beforeSnapshot = record ? captureStateSnapshot() : null;
  state.stops[index].pos = nextPos;
  updateStopHandle(index);
  updateStopInputs(index, { posOnly: true });
  syncStopPopover(index);
  if (stopPopoverIndex === index) {
    positionStopPopover(index);
  }
  schedulePreview();
  if (record) recordHistory(beforeSnapshot);
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
        const beforeSnapshot = captureStateSnapshot();
        state.stops.splice(index, 1);
        closeStopPopover();
        renderStops();
        schedulePreview();
        recordHistory(beforeSnapshot);
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
  const beforeSnapshot = captureStateSnapshot();
  const index = insertStopAt(pos, hex);
  if (index == null) return;
  renderStops();
  schedulePreview();
  openStopPopover(index);
  recordHistory(beforeSnapshot);
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
  stopDragHistorySnapshot = captureStateSnapshot();
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
  applyStopPos(stopDragIndex, pos, { record: false });
}

function handleStopPointerUp(event) {
  if (stopDragIndex == null) return;
  if (event.pointerId !== stopDragPointerId) return;
  const handle = getStopHandle(stopDragIndex);
  if (handle) handle.releasePointerCapture(event.pointerId);
  if (stopDragMoved) {
    stopSuppressClick = true;
    recordHistory(stopDragHistorySnapshot);
  }
  stopDragIndex = null;
  stopDragPointerId = null;
  stopDragHistorySnapshot = null;
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

function openImportPanel() {
  if (!el.importPanel) return;
  el.importPanel.classList.remove("hidden");
  el.importPanel.setAttribute("aria-hidden", "false");
  importPanelOpen = true;
  importPanelBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  window.setTimeout(() => {
    el.importInput?.focus();
  }, 40);
}

function closeImportPanel() {
  if (!el.importPanel) return;
  el.importPanel.classList.add("hidden");
  el.importPanel.setAttribute("aria-hidden", "true");
  importPanelOpen = false;
  document.body.style.overflow = importPanelBodyOverflow;
  importPanelBodyOverflow = "";
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

function applyAngle(value, options = {}) {
  const { record = true } = options;
  const next = clampNumber(value, 0, 360);
  if (next === state.angle) {
    if (el.angleRange) el.angleRange.value = String(next);
    if (el.angleInput) el.angleInput.value = String(next);
    schedulePreview();
    return;
  }
  const beforeSnapshot = record ? captureStateSnapshot() : null;
  state.angle = next;
  if (el.angleRange) el.angleRange.value = String(next);
  if (el.angleInput) el.angleInput.value = String(next);
  schedulePreview();
  if (record) recordHistory(beforeSnapshot);
}

function encodeBase64Url(text) {
  if (typeof text !== "string" || !text) return "";
  try {
    if (typeof window?.btoa === "function") {
      const bytes = unescape(encodeURIComponent(text));
      return window.btoa(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
    }
  } catch (_err) {
    // fallback below
  }
  try {
    if (typeof Buffer !== "undefined") {
      return Buffer.from(text, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
    }
  } catch (_err) {
    // ignore
  }
  return "";
}

function decodeBase64Url(payload) {
  if (!payload) return null;
  const base = String(payload).replace(/-/g, "+").replace(/_/g, "/");
  const padded = base + "=".repeat((4 - (base.length % 4)) % 4);
  try {
    if (typeof window?.atob === "function") {
      const raw = window.atob(padded);
      const encoded = Array.from(raw)
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join("");
      return decodeURIComponent(encoded);
    }
  } catch (_err) {
    // fallback below
  }
  try {
    if (typeof Buffer !== "undefined") {
      return Buffer.from(padded, "base64").toString("utf8");
    }
  } catch (_err) {
    // ignore
  }
  return null;
}

function buildShareStatePayload(snapshot = captureStateSnapshot()) {
  const stops = cloneStops(snapshot.stops)
    .slice()
    .sort((a, b) => (a.pos ?? 0) - (b.pos ?? 0))
    .map((stop) => ({
      c: (normalizeHex(stop.hex) || "#000000").toUpperCase(),
      p: Math.round(clampNumber(stop.pos ?? 0, 0, 100) * 100) / 100
    }));
  return {
    v: SHARE_STATE_VERSION,
    type: normalizeGradientType(snapshot.type),
    angleDeg: Math.round(clampNumber(snapshot.angle ?? 90, 0, 360) * 100) / 100,
    stops
  };
}

function encodeShareStateHashValue() {
  try {
    const payload = buildShareStatePayload();
    const encoded = encodeBase64Url(JSON.stringify(payload));
    return encoded ? `v${SHARE_STATE_VERSION}.${encoded}` : "";
  } catch (_err) {
    return "";
  }
}

function parseShareStatePayload(payload) {
  if (!payload || typeof payload !== "object") return null;
  if (Number(payload.v) !== SHARE_STATE_VERSION) return null;
  const type = normalizeGradientType(payload.type);
  const angle = Number(payload.angleDeg);
  if (!Number.isFinite(angle)) return null;
  if (!Array.isArray(payload.stops)) return null;
  if (payload.stops.length < MIN_STOPS || payload.stops.length > MAX_STOPS) return null;
  const rawStops = payload.stops.map((stop) => {
    if (!stop || typeof stop !== "object") return null;
    const hex = normalizeHex(stop.c);
    const pos = Number(stop.p);
    if (!hex || !Number.isFinite(pos)) return null;
    return {
      hex,
      pos: clampNumber(pos, 0, 100)
    };
  });
  if (rawStops.some((stop) => !stop)) return null;
  const stops = cloneStops(rawStops)
    .slice()
    .sort((a, b) => (a.pos ?? 0) - (b.pos ?? 0));
  if (stops.length < MIN_STOPS || stops.length > MAX_STOPS) return null;
  return {
    type,
    angle: clampNumber(angle, 0, 360),
    stops
  };
}

function parseHashGradientState(rawValue) {
  const raw = String(rawValue || "").trim();
  if (!raw) return { snapshot: null, invalid: false };
  const prefix = `v${SHARE_STATE_VERSION}.`;
  if (raw.startsWith(prefix)) {
    const encoded = raw.slice(prefix.length);
    const json = decodeBase64Url(encoded);
    if (!json) return { snapshot: null, invalid: true };
    try {
      const parsed = JSON.parse(json);
      const snapshot = parseShareStatePayload(parsed);
      return snapshot ? { snapshot, invalid: false } : { snapshot: null, invalid: true };
    } catch (_err) {
      return { snapshot: null, invalid: true };
    }
  }
  if (/^v\d+\./i.test(raw)) {
    return { snapshot: null, invalid: true };
  }
  const stops = raw.split(",").map((item) => normalizeHex(item)).filter(Boolean);
  if (stops.length >= MIN_STOPS && stops.length <= MAX_STOPS) {
    return {
      snapshot: {
        type: "linear",
        angle: 90,
        stops: migrateStops(stops)
      },
      invalid: false
    };
  }
  return { snapshot: null, invalid: true };
}

function getGradientStateFromHash() {
  const hash = (window.location.hash || "").replace("#", "");
  if (!hash) return { snapshot: null, invalid: false };
  const params = new URLSearchParams(hash);
  const raw = params.get("g");
  if (!raw) return { snapshot: null, invalid: false };
  return parseHashGradientState(raw);
}

function buildShareLinkUrl() {
  const encoded = encodeShareStateHashValue();
  if (!encoded) return "";
  const base = String(window.location.href || "").split("#")[0];
  return `${base}#g=${encoded}`;
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
  const beginAngleHistory = () => {
    if (!angleHistorySnapshot) {
      angleHistorySnapshot = captureStateSnapshot();
    }
  };
  const commitAngleHistory = () => {
    if (!angleHistorySnapshot) return;
    recordHistory(angleHistorySnapshot);
    angleHistorySnapshot = null;
  };

  el.angleRange?.addEventListener("pointerdown", beginAngleHistory);
  el.angleRange?.addEventListener("input", () => {
    beginAngleHistory();
    applyAngle(el.angleRange.value, { record: false });
  });
  el.angleRange?.addEventListener("change", commitAngleHistory);
  el.angleRange?.addEventListener("pointerup", commitAngleHistory);
  el.angleRange?.addEventListener("blur", commitAngleHistory);

  el.angleInput?.addEventListener("focus", beginAngleHistory);
  el.angleInput?.addEventListener("input", () => {
    beginAngleHistory();
    applyAngle(el.angleInput.value, { record: false });
  });
  el.angleInput?.addEventListener("change", commitAngleHistory);
  el.angleInput?.addEventListener("blur", commitAngleHistory);

  el.resetAngle?.addEventListener("click", () => applyAngle(90));
  el.typeSelect?.addEventListener("change", () => {
    const next = el.typeSelect.value || "linear";
    if (next === state.type) return;
    const beforeSnapshot = captureStateSnapshot();
    state.type = next;
    schedulePreview();
    recordHistory(beforeSnapshot);
  });
  el.stopBar?.addEventListener("click", handleStopBarClick);
  el.stopBar?.addEventListener("pointerdown", handleStopPointerDown);
  window.addEventListener("pointermove", handleStopPointerMove);
  window.addEventListener("pointerup", handleStopPointerUp);
  window.addEventListener("resize", () => {
    if (stopPopoverIndex != null) positionStopPopover(stopPopoverIndex);
  });
  document.addEventListener("click", handleStopOutsideClick);
  el.undoBtn?.addEventListener("click", runUndo);
  el.redoBtn?.addEventListener("click", runRedo);

  el.addStop?.addEventListener("click", () => {
    if (state.stops.length >= MAX_STOPS) return;
    const beforeSnapshot = captureStateSnapshot();
    const lastPos = state.stops[state.stops.length - 1]?.pos ?? 100;
    const nextIndex = insertStopAt(clampNumber(lastPos + 10, 0, 100), randomHex());
    if (nextIndex == null) return;
    renderStops();
    schedulePreview();
    recordHistory(beforeSnapshot);
  });
  el.randomStop?.addEventListener("click", () => {
    const beforeSnapshot = captureStateSnapshot();
    state.stops = state.stops.map((stop, idx) => ({
      hex: randomHex(),
      pos: Number.isFinite(stop.pos) ? stop.pos : Math.round((idx / Math.max(1, state.stops.length - 1)) * 100)
    }));
    renderStops();
    schedulePreview();
    recordHistory(beforeSnapshot);
  });
  el.savePresetBtn?.addEventListener("click", () => {
    saveCurrentAsMyPreset();
  });
  el.addMidStopBtn?.addEventListener("click", () => {
    addSuggestedMidStop();
  });
  el.toggleDitherBtn?.addEventListener("click", () => {
    togglePreviewDither();
  });
  [
    { key: "ui", tab: el.contextTabUi },
    { key: "poster", tab: el.contextTabPoster },
    { key: "thread", tab: el.contextTabThread }
  ].forEach((entry) => {
    entry.tab?.addEventListener("click", () => {
      setContextPreviewTab(entry.key);
    });
  });
  (el.useCaseButtons || []).forEach((button) => {
    button.addEventListener("click", () => {
      const key = String(button.dataset.gradientUsecase || "");
      setUseCase(key);
    });
  });
  el.copyShareLinkBtn?.addEventListener("click", async () => {
    const shareUrl = buildShareLinkUrl();
    if (!shareUrl) {
      showToast(t("gradient.toast.copyFailed", "Không thể sao chép."));
      return;
    }
    const ok = await copyText(shareUrl);
    showToast(ok
      ? t("gradient.shareState.toast.copied", "Đã sao chép link!")
      : t("gradient.toast.copyFailed", "Không thể sao chép."));
  });
  el.exportBtn?.addEventListener("click", async () => {
    const ok = await copyText(exportCssProperty());
    showToast(ok ? t("gradient.toast.copiedCss", "Đã sao chép CSS.") : t("gradient.toast.copyFailed", "Không thể sao chép."));
  });
  el.copyCssOptionBtn?.addEventListener("click", async () => {
    const ok = await copyText(exportCssProperty());
    showToast(ok ? t("gradient.toast.copiedCss", "Đã sao chép CSS.") : t("gradient.toast.copyFailed", "Không thể sao chép."));
    if (el.copyMenu) el.copyMenu.open = false;
  });
  el.copyTokenBtn?.addEventListener("click", async () => {
    const ok = await copyText(exportTokenBlock());
    showToast(ok ? t("gradient.toast.copiedToken", "Đã sao chép token.") : t("gradient.toast.copyFailed", "Không thể sao chép."));
    if (el.copyMenu) el.copyMenu.open = false;
  });
  el.copyTailwindBtn?.addEventListener("click", async () => {
    const ok = await copyText(exportTailwindString());
    showToast(ok ? t("gradient.toast.copiedTailwind", "Đã sao chép Tailwind.") : t("gradient.toast.copyFailed", "Không thể sao chép."));
    if (el.copyMenu) el.copyMenu.open = false;
  });
  [el.exportTabCss, el.exportTabVars, el.exportTabToken, el.exportTabTailwind].forEach((tab) => {
    tab?.addEventListener("click", () => {
      const format = tab.getAttribute("data-export-tab") || "css";
      setExportFormat(format);
      renderExportFormatPreview();
    });
  });
  el.exportCodeCopy?.addEventListener("click", async () => {
    const ok = await copyText(getExportFormatText(exportFormatActive));
    showToast(ok ? t("gradient.toast.copiedFallback", "Đã sao chép.") : t("gradient.toast.copyFailed", "Không thể sao chép."));
  });
  el.exportToken?.addEventListener("click", async () => {
    const ok = await copyText(exportTokenString());
    showToast(ok ? t("gradient.toast.copiedTokenPercent", "Đã sao chép token có %.") : t("gradient.toast.copyFailed", "Không thể sao chép token."));
  });
  el.exportSvg?.addEventListener("click", async () => {
    const svg = exportSvg();
    if (!svg) {
      showToast(t("gradient.toast.svgFailed", "Không thể tạo SVG."));
      return;
    }
    const ok = await copyText(svg);
    showToast(ok ? t("gradient.toast.copiedSvg", "Đã sao chép SVG gradient.") : t("gradient.toast.svgCopyFailed", "Không thể sao chép SVG."));
  });
  el.toPalette?.addEventListener("click", () => {
    const stops = migrateStops(state.stops).map((stop) => stop.hex).join(",");
    window.location.href = `palette.html#p=${encodeURIComponent(stops)}`;
  });

  el.saveLibrary?.addEventListener("click", () => {
    const asset = buildGradientAsset();
    const ok = addAssetToLibrary(asset);
    showToast(ok ? t("gradient.toast.savedLibrary", "Đã lưu vào Thư viện.") : t("gradient.toast.saveFailed", "Không thể lưu tài sản."));
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

  el.openImportPanelBtn?.addEventListener("click", () => {
    openImportPanel();
  });
  el.importApplyBtn?.addEventListener("click", () => {
    const raw = el.importInput?.value || "";
    if (!raw.trim()) {
      showToast(t("gradient.toast.pasteCss", "Hãy dán CSS gradient trước khi nhập."));
      return;
    }
    applyImportedGradient(raw.trim());
    closeImportPanel();
  });
  el.importPanel?.addEventListener("click", (event) => {
    if (event.target.closest("[data-gradient-import-close]")) {
      closeImportPanel();
    }
  });

  window.addEventListener("keydown", (event) => {
    const isUndo = (event.ctrlKey || event.metaKey) && !event.shiftKey && event.key.toLowerCase() === "z";
    const isRedo = (event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === "y" || (event.shiftKey && event.key.toLowerCase() === "z"));
    if (isUndo) {
      event.preventDefault();
      runUndo();
      return;
    }
    if (isRedo) {
      event.preventDefault();
      runRedo();
      return;
    }
    if (event.key === "Escape" && importPanelOpen) {
      event.preventDefault();
      closeImportPanel();
    }
  });

  document.addEventListener("click", (event) => {
    if (el.copyMenu?.open && !event.target.closest("#gradientCopyMenu")) {
      el.copyMenu.open = false;
    }
    if (el.exportMenu?.open && !event.target.closest("#gradientExportMenu")) {
      el.exportMenu.open = false;
    }
  });
}

function applyHexesFromHub(detail) {
  const rawList = Array.isArray(detail?.hexes) ? detail.hexes : [];
  const mode = detail?.mode === "append" ? "append" : "replace";
  const normalized = rawList.map((hex) => normalizeHex(hex)).filter(Boolean);
  if (!normalized.length) return;
  window.tcWorkbench?.setContext?.(normalized, { worldKey: "gradient", source: detail?.source || "hex-apply" });
  if (normalized.length === 1) {
    const pickedHex = normalized[0];
    if (stopPopoverIndex != null && state.stops[stopPopoverIndex]) {
      applyStopHex(stopPopoverIndex, pickedHex);
      return;
    }
    const beforeSnapshot = captureStateSnapshot();
    const addedIndex = insertStopAt(50, pickedHex);
    if (addedIndex != null) {
      renderStops();
      schedulePreview();
      openStopPopover(addedIndex);
      recordHistory(beforeSnapshot);
      return;
    }
    if (state.stops.length) {
      const fallbackIndex = Math.floor((state.stops.length - 1) / 2);
      applyStopHex(fallbackIndex, pickedHex);
    }
    return;
  }
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
    const beforeSnapshot = captureStateSnapshot();
    state.stops = migrateStops(next);
    renderStops();
    schedulePreview();
    recordHistory(beforeSnapshot);
  }
}

function init() {
  let invalidShareHash = false;
  if (!hasStrictIncoming) {
    const hashState = getGradientStateFromHash();
    invalidShareHash = Boolean(hashState?.invalid);
    if (hashState?.snapshot) {
      state.type = normalizeGradientType(hashState.snapshot.type);
      state.angle = clampNumber(hashState.snapshot.angle ?? 90, 0, 360);
      state.stops = cloneStops(hashState.snapshot.stops);
    }
  }
  state.stops = migrateStops(state.stops);
  loadMyPresetsFromStorage();
  if (el.typeSelect) el.typeSelect.value = state.type;
  renderPresetRail();
  setUseCase(activeUseCase, { skipPreset: true });
  renderMyPresetRail();
  renderStops();
  setContextPreviewTab(contextPreviewActiveTab);
  schedulePreview();
  applyAngle(state.angle, { record: false });
  syncHistoryButtons();
  loadSamples();
  initEvents();
  initSampleDetail();
  if (invalidShareHash) {
    showToast(t("gradient.shareState.toast.invalidLink", "Link chia sẻ không hợp lệ."));
  }
}

init();

window.addEventListener("tc:hex-apply", (event) => {
  applyHexesFromHub(event?.detail);
});
if (hasStrictIncoming && incomingHandoff?.hexes?.length) {
  applyHexesFromHub({ hexes: incomingHandoff.hexes, mode: "replace" });
  window.tcWorkbench?.setContext?.(incomingHandoff.hexes, { worldKey: "gradient", source: incomingHandoff.source });
}
