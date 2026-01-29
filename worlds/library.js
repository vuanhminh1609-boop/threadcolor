import { parseHandoff, withHandoff } from "../scripts/handoff.js";

const STORAGE_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const PROJECT_RECENT_KEY = "tc_projects_recent";
const FEED_STORAGE_KEY = "tc_community_feed";
const HANDOFF_FROM = "library";
const HEX_VIEW_STORAGE_KEY = "tc_hex_view_mode";
const WORLD_PATHS = {
  threadcolor: "./threadcolor.html",
  gradient: "./gradient.html",
  palette: "./palette.html",
  printcolor: "./printcolor.html",
  library: "./library.html",
  paintfabric: "./paintfabric.html",
  imagecolor: "./imagecolor.html",
  community: "./community.html"
};

const elements = {
  search: document.getElementById("assetSearch"),
  filter: document.getElementById("assetFilter"),
  projectFilter: document.getElementById("assetProjectFilter"),
  grid: document.getElementById("assetGrid"),
  createDemo: document.getElementById("assetCreateDemo"),
  panel: document.getElementById("assetPanel"),
  panelEmpty: document.getElementById("assetPanelEmpty"),
  panelName: document.getElementById("assetPanelName"),
  panelType: document.getElementById("assetPanelType"),
    panelTags: document.getElementById("assetPanelTags"),
    panelSwatches: document.getElementById("assetPanelSwatches"),
    panelNotes: document.getElementById("assetPanelNotes"),
    save: document.getElementById("assetSave"),
    apply: document.getElementById("assetApply"),
    rename: document.getElementById("assetRename"),
    remove: document.getElementById("assetDelete"),
    share: document.getElementById("assetShare"),
    specText: document.getElementById("assetSpecText"),
    specJson: document.getElementById("assetSpecJson"),
    copyText: document.getElementById("assetCopyText"),
    copyJson: document.getElementById("assetCopyJson"),
    nameModal: document.getElementById("assetNameModal"),
    nameClose: document.getElementById("assetNameClose"),
    nameCancel: document.getElementById("assetNameCancel"),
    nameSave: document.getElementById("assetNameSave"),
    nameInput: document.getElementById("assetNameInput"),
    tagsInput: document.getElementById("assetTagsInput"),
    toast: document.getElementById("assetToast"),
    tabAssets: document.getElementById("assetTabBtn"),
  tabHex: document.getElementById("hexTabBtn"),
  tabContainer: document.getElementById("assetTabs") || document.getElementById("libraryTabs"),
  tabAssetsPanel: document.getElementById("assetTabPanel") || document.getElementById("assetsPanel"),
  tabHexPanel: document.getElementById("hexTabPanel") || document.getElementById("hexPanel"),
  hexSort: document.getElementById("hexSort"),
  hexView: document.getElementById("hexView"),
  hexLoadMode: document.getElementById("hexLoadMode"),
  hexSearch: document.getElementById("hexSearch"),
  hexPageSize: document.getElementById("hexPageSize"),
  hexGrid: document.getElementById("hexGrid"),
  hexStats: document.getElementById("hexStats"),
  hexPrev: document.getElementById("hexPrev"),
  hexNext: document.getElementById("hexNext"),
  hexPageInfo: document.getElementById("hexPageInfo"),
  hexStatus: document.getElementById("hexStatus"),
  hexProfileOverlay: document.getElementById("hexProfileOverlay"),
  hexProfileClose: document.getElementById("hexProfileClose"),
  hexProfileSwatch: document.getElementById("hexProfileSwatch"),
  hexProfileHex: document.getElementById("hexProfileHex"),
  hexProfileContrast: document.getElementById("hexProfileContrast"),
  hexProfileRgb: document.getElementById("hexProfileRgb"),
  hexProfileHsl: document.getElementById("hexProfileHsl"),
  hexProfileHsv: document.getElementById("hexProfileHsv"),
  hexProfileLab: document.getElementById("hexProfileLab"),
  hexProfileLch: document.getElementById("hexProfileLch"),
  hexProfileCmyk: document.getElementById("hexProfileCmyk"),
  hexProfileCopy: document.getElementById("hexProfileCopy"),
  hexProfileOpenThread: document.getElementById("hexProfileOpenThread"),
  hexProfileOpenGradient: document.getElementById("hexProfileOpenGradient"),
  hexProfileOpenPalette: document.getElementById("hexProfileOpenPalette"),
  hexProfileOpenPrint: document.getElementById("hexProfileOpenPrint"),
  hexProfileOpenPaint: document.getElementById("hexProfileOpenPaint"),
  hexProfileSave: document.getElementById("hexProfileSave"),
  hexLightenGroup: document.getElementById("hexLightenGroup"),
  hexDarkenGroup: document.getElementById("hexDarkenGroup"),
  hexSimilarGroup: document.getElementById("hexSimilarGroup"),
  hexSimilarRange: document.getElementById("hexSimilarRange"),
  hexSimilarValue: document.getElementById("hexSimilarValue"),
  hexFullscreen: document.getElementById("hexFullscreen"),
  hexFullscreenClose: document.getElementById("hexFullscreenClose"),
  hexFullscreenPrev: document.getElementById("hexFullscreenPrev"),
  hexFullscreenNext: document.getElementById("hexFullscreenNext"),
  hexFullscreenHex: document.getElementById("hexFullscreenHex"),
  hexFullscreenMeta: document.getElementById("hexFullscreenMeta"),
  hexFullscreenCopy: document.getElementById("hexFullscreenCopy")
};

const state = {
  assets: [],
  selected: null,
  currentProject: "",
  recentProjects: [],
  projectFilter: "",
  handoff: parseHandoff(),
  hexEntries: [],
  hexQuery: "",
  hexPage: 1,
  hexPageSize: 60,
  hexLoaded: false,
  hexSort: "hue",
  hexView: "compact",
  hexLoadMode: "infinite",
  hexVisibleCount: 0,
  hexActiveList: [],
  hexEntryMap: new Map(),
  hexProfileEntry: null,
  hexFullscreenIndex: 0,
  hexSimilarCache: new Map(),
  nameModalMode: "save",
  nameModalAsset: null
};

const normalizeText = (value) => (value || "").toLowerCase();
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const setupAutofillTrap = (input) => {
  if (!input) return;
  input.setAttribute("readonly", "readonly");
  input.dataset.userTouched = "0";
  const clearIfAutofill = () => {
    if (input.dataset.userTouched === "1") return;
    const value = String(input.value || "");
    if (value.includes("@") && value.includes(".")) {
      input.value = "";
    }
  };
  const unlock = () => {
    input.removeAttribute("readonly");
    input.dataset.userTouched = "1";
  };
  const lock = () => {
    if (input.dataset.userTouched === "1") return;
    input.setAttribute("readonly", "readonly");
  };
  input.addEventListener(
    "pointerdown",
    () => {
      if (input.hasAttribute("readonly")) input.removeAttribute("readonly");
    },
    true
  );
  input.addEventListener("focus", unlock);
  input.addEventListener("blur", lock);
  input.addEventListener("keydown", () => {
    if (input.hasAttribute("readonly")) input.removeAttribute("readonly");
    input.dataset.userTouched = "1";
  });
  input.addEventListener("input", () => {
    input.dataset.userTouched = "1";
  });
  window.setTimeout(clearIfAutofill, 500);
};

const debounce = (fn, delay = 250) => {
  let timer = null;
  return (...args) => {
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };
};

const showToast = (message) => {
  if (!elements.toast) return;
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 1800);
};

const setModalOpen = (open) => {
  if (!elements.nameModal) return;
  elements.nameModal.classList.toggle("hidden", !open);
  elements.nameModal.setAttribute("aria-hidden", open ? "false" : "true");
  if (open && elements.nameInput) elements.nameInput.focus();
};

const normalizeHexView = (value) => {
  if (value === "card" || value === "detail") return "card";
  if (value === "compact") return "compact";
  return "compact";
};

const loadHexViewPreference = () => {
  try {
    const stored = localStorage.getItem(HEX_VIEW_STORAGE_KEY);
    if (stored) state.hexView = normalizeHexView(stored);
  } catch (_err) {}
};

const updateHexControls = () => {
  if (elements.hexSort) elements.hexSort.value = state.hexSort;
  if (elements.hexView) elements.hexView.value = state.hexView;
  if (elements.hexLoadMode) elements.hexLoadMode.value = state.hexLoadMode;
};

const sanitizeHex = (value) => {
  if (!value) return "";
  const cleaned = value.toString().trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) return "";
  return `#${cleaned.toUpperCase()}`;
};

const hexToRgb = (hex) => {
  const cleaned = sanitizeHex(hex);
  if (!cleaned) return null;
  const r = parseInt(cleaned.slice(1, 3), 16);
  const g = parseInt(cleaned.slice(3, 5), 16);
  const b = parseInt(cleaned.slice(5, 7), 16);
  return { r, g, b };
};

const rgbToHex = (rgb) => {
  const toHex = (value) => Math.max(0, Math.min(255, value)).toString(16).padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`.toUpperCase();
};

const rgbToLab = (rgb) => {
  if (!rgb) return null;
  const srgbToLinear = (c) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const rl = srgbToLinear(rgb.r);
  const gl = srgbToLinear(rgb.g);
  const bl = srgbToLinear(rgb.b);
  const x = (rl * 0.4124 + gl * 0.3576 + bl * 0.1805) * 100;
  const y = (rl * 0.2126 + gl * 0.7152 + bl * 0.0722) * 100;
  const z = (rl * 0.0193 + gl * 0.1192 + bl * 0.9505) * 100;
  const refX = 95.047;
  const refY = 100.0;
  const refZ = 108.883;
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : (7.787 * t) + (16 / 116));
  const fx = f(x / refX);
  const fy = f(y / refY);
  const fz = f(z / refZ);
  const round = (val) => Number(val.toFixed(4));
  return [round(116 * fy - 16), round(500 * (fx - fy)), round(200 * (fy - fz))];
};

const labToLch = (lab) => {
  if (!Array.isArray(lab)) return null;
  const [l, a, b] = lab;
  const c = Math.sqrt(a * a + b * b);
  const h = ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;
  return [Number(l.toFixed(2)), Number(c.toFixed(2)), Number(h.toFixed(1))];
};

const labToRgb = (lab) => {
  if (!Array.isArray(lab)) return null;
  const [l, a, b] = lab;
  const refX = 95.047;
  const refY = 100.0;
  const refZ = 108.883;
  const fy = (l + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - b / 200;
  const inv = (t) => {
    const t3 = t ** 3;
    return t3 > 0.008856 ? t3 : (t - 16 / 116) / 7.787;
  };
  const x = refX * inv(fx);
  const y = refY * inv(fy);
  const z = refZ * inv(fz);
  let r = (x * 0.032406 + y * -0.015372 + z * -0.004986) / 100;
  let g = (x * -0.009689 + y * 0.018758 + z * 0.000415) / 100;
  let b2 = (x * 0.000557 + y * -0.002040 + z * 0.010570) / 100;
  const gamma = (v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055);
  r = Math.min(1, Math.max(0, gamma(r)));
  g = Math.min(1, Math.max(0, gamma(g)));
  b2 = Math.min(1, Math.max(0, gamma(b2)));
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b2 * 255)
  };
};

const rgbToHsl = (rgb) => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }
  return [
    Math.round(h * 360),
    Math.round(s * 100),
    Math.round(l * 100)
  ];
};

const rgbToHsv = (rgb) => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }
  const s = max === 0 ? 0 : d / max;
  return [
    Math.round(h * 360),
    Math.round(s * 100),
    Math.round(max * 100)
  ];
};

const rgbToCmyk = (rgb) => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const k = 1 - Math.max(r, g, b);
  if (k >= 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100)
  };
};

const relativeLuminance = (rgb) => {
  const toLinear = (v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const r = toLinear(rgb.r);
  const g = toLinear(rgb.g);
  const b = toLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const pickContrastText = (rgb) => {
  const bg = relativeLuminance(rgb);
  const white = (1.0 + 0.05) / (bg + 0.05);
  const black = (bg + 0.05) / 0.05;
  return white >= black ? { label: "Trắng", ratio: white } : { label: "Đen", ratio: black };
};

const deltaE2000 = (lab1, lab2) => {
  const [L1, a1, b1] = lab1;
  const [L2, a2, b2] = lab2;
  const avgLp = (L1 + L2) / 2;
  const C1 = Math.sqrt(a1 * a1 + b1 * b1);
  const C2 = Math.sqrt(a2 * a2 + b2 * b2);
  const avgC = (C1 + C2) / 2;
  const avgC7 = Math.pow(avgC, 7);
  const G = 0.5 * (1 - Math.sqrt(avgC7 / (avgC7 + Math.pow(25, 7))));
  const a1p = (1 + G) * a1;
  const a2p = (1 + G) * a2;
  const C1p = Math.sqrt(a1p * a1p + b1 * b1);
  const C2p = Math.sqrt(a2p * a2p + b2 * b2);
  const avgCp = (C1p + C2p) / 2;
  const h1p = Math.atan2(b1, a1p);
  const h2p = Math.atan2(b2, a2p);
  const h1pDeg = ((h1p * 180) / Math.PI + 360) % 360;
  const h2pDeg = ((h2p * 180) / Math.PI + 360) % 360;
  let deltahp = h2pDeg - h1pDeg;
  if (C1p * C2p === 0) {
    deltahp = 0;
  } else if (deltahp > 180) {
    deltahp -= 360;
  } else if (deltahp < -180) {
    deltahp += 360;
  }
  const deltaLp = L2 - L1;
  const deltaCp = C2p - C1p;
  const deltaHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((deltahp * Math.PI) / 360);
  const avgHp = (() => {
    if (C1p * C2p === 0) return h1pDeg + h2pDeg;
    const sum = h1pDeg + h2pDeg;
    if (Math.abs(h1pDeg - h2pDeg) > 180) {
      return sum < 360 ? (sum + 360) / 2 : (sum - 360) / 2;
    }
    return sum / 2;
  })();
  const T = 1
    - 0.17 * Math.cos(((avgHp - 30) * Math.PI) / 180)
    + 0.24 * Math.cos(((2 * avgHp) * Math.PI) / 180)
    + 0.32 * Math.cos(((3 * avgHp + 6) * Math.PI) / 180)
    - 0.20 * Math.cos(((4 * avgHp - 63) * Math.PI) / 180);
  const deltaTheta = 30 * Math.exp(-(((avgHp - 275) / 25) ** 2));
  const Rc = 2 * Math.sqrt(Math.pow(avgCp, 7) / (Math.pow(avgCp, 7) + Math.pow(25, 7)));
  const Sl = 1 + (0.015 * ((avgLp - 50) ** 2)) / Math.sqrt(20 + ((avgLp - 50) ** 2));
  const Sc = 1 + 0.045 * avgCp;
  const Sh = 1 + 0.015 * avgCp * T;
  const Rt = -Math.sin((2 * deltaTheta * Math.PI) / 180) * Rc;
  return Math.sqrt(
    (deltaLp / Sl) ** 2 +
    (deltaCp / Sc) ** 2 +
    (deltaHp / Sh) ** 2 +
    Rt * (deltaCp / Sc) * (deltaHp / Sh)
  );
};

const formatRgb = (rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
const formatHsl = (hsl) => `hsl(${hsl[0]}°, ${hsl[1]}%, ${hsl[2]}%)`;
const formatHsv = (hsv) => `hsv(${hsv[0]}°, ${hsv[1]}%, ${hsv[2]}%)`;
const formatLab = (lab) => `L ${lab[0].toFixed(1)} · a ${lab[1].toFixed(1)} · b ${lab[2].toFixed(1)}`;
const formatLch = (lch) => `L ${lch[0]} · C ${lch[1]} · h ${lch[2]}°`;
const formatCmyk = (cmyk) => `C ${cmyk.c}% · M ${cmyk.m}% · Y ${cmyk.y}% · K ${cmyk.k}%`;


const loadProjectPrefs = () => {
  try {
    state.currentProject = localStorage.getItem(PROJECT_STORAGE_KEY) || "";
  } catch (_err) {
    state.currentProject = "";
  }
  try {
    const raw = localStorage.getItem(PROJECT_RECENT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    state.recentProjects = Array.isArray(parsed) ? parsed.slice(0, 10) : [];
  } catch (_err) {
    state.recentProjects = [];
  }
};

const syncProjectFilter = () => {
  if (!elements.projectFilter) return;
  const options = ["T\u1ea5t c\u1ea3 d\u1ef1 \u00e1n", ...new Set([state.currentProject, ...state.recentProjects].filter(Boolean))];
  elements.projectFilter.innerHTML = options.map((label, index) => {
    const value = index === 0 ? "__all__" : label;
    return `<option value="${value}">${label}</option>`;
  }).join("");
  if (!state.projectFilter && state.currentProject) {
    state.projectFilter = state.currentProject;
  }
  elements.projectFilter.value = state.projectFilter || "__all__";
};

const loadAssets = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_err) {
    return [];
  }
};

const saveAssets = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.assets));
  } catch (_err) {}
};

const createDemoAsset = () => {
  const now = new Date().toISOString();
  const isPalette = state.assets.length % 2 === 0;
  const stops = isPalette
    ? ["#F7F3E8", "#C7A57A", "#7A5B3A", "#2B1E17", "#1A0F08"]
    : ["#FFECEC", "#FF9A9E", "#F472B6", "#3B82F6", "#1E293B"];
  return {
    id: `asset_${Date.now()}`,
    type: isPalette ? "palette" : "gradient",
    name: isPalette ? "Bộ trung tính ấm" : "Dải neon đêm",
    tags: isPalette ? ["ấm", "trung tính", "sang"] : ["đậm", "đêm", "năng lượng"],
    payload: isPalette
      ? { colors: stops }
      : { gradientParams: { stops, angle: 90 } },
    notes: "Tài sản demo cho thư viện.",
    version: "1.0.0",
    createdAt: now,
    updatedAt: now,
    sourceWorld: "library",
    project: state.currentProject || ""
  };
};

const getStopsFromAsset = (asset) => {
  if (asset?.core?.colors) return asset.core.colors;
  if (asset?.core?.gradientParams?.stops) return asset.core.gradientParams.stops;
  if (asset?.payload?.colors) return asset.payload.colors;
  if (asset?.payload?.gradientParams?.stops) return asset.payload.gradientParams.stops;
  if (asset?.payload?.threads) {
    return asset.payload.threads.map((item) => item.hex).filter(Boolean);
  }
  if (asset?.payload?.cmyk) {
    return asset.payload.cmyk.map((item) => item.hex).filter(Boolean);
  }
  if (asset?.core?.stops) return asset.core.stops;
  return [];
};

const resolveWorldKey = (asset) => {
  if (state.handoff?.from) return state.handoff.from;
  const type = asset?.type || "";
  const mapping = {
    palette: "palette",
    gradient: "gradient",
    thread_set: "threadcolor",
    cmyk_recipe: "printcolor",
    paint_profile: "paintfabric",
    fabric_profile: "paintfabric",
    image_palette: "imagecolor"
  };
  return mapping[type] || "";
};

export const openInWorld = (worldKey, payload = {}) => {
  const path = WORLD_PATHS[worldKey];
  if (!path) return false;
  const url = withHandoff(path, payload);
  window.location.href = url;
  return true;
};

const filterAssets = () => {
  const query = normalizeText(elements.search?.value);
  const typeFilter = elements.filter?.value || "all";
  return state.assets.filter((asset) => {
    const matchType = typeFilter === "all"
      || (typeFilter === "other" && !["palette", "gradient"].includes(asset.type))
      || asset.type === typeFilter;
    if (!matchType) return false;
    const projectFilter = state.projectFilter || "";
    if (projectFilter && (asset.project || "") !== projectFilter) return false;
    if (!query) return true;
    const haystack = [
      asset.name,
      asset.type,
      ...(asset.tags || [])
    ].join(" ");
    return normalizeText(haystack).includes(query);
  });
};

  const renderGrid = () => {
    if (!elements.grid) return;
    const items = filterAssets();
    if (!items.length) {
      elements.grid.innerHTML = `<div class="tc-muted text-sm">Chưa có tài sản. Hãy tạo demo.</div>`;
      return;
    }
    elements.grid.innerHTML = items.map((asset) => {
      const stops = getStopsFromAsset(asset);
      const swatches = stops.slice(0, 5).map((hex) =>
        `<span class="tc-swatch" style="background:${hex};"></span>`
      ).join("");
      const tags = (asset.tags || []).slice(0, 3).map((tag) =>
        `<span class="tc-chip px-2 py-1 rounded-full text-xs">${tag}</span>`
      ).join("");
      const isSelected = state.selected && state.selected.id === asset.id ? " is-selected" : "";
      return `
        <button class="tc-card p-4 text-left space-y-3${isSelected}" data-asset-id="${asset.id}" type="button">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] tc-muted">${asset.type}</p>
              <h3 class="font-semibold">${asset.name}</h3>
            </div>
            <div class="flex flex-wrap gap-1">${tags}</div>
          </div>
          <div class="flex flex-wrap gap-2">${swatches}</div>
          <div class="flex items-center justify-end asset-kebab">
            <details data-asset-menu class="asset-kebab">
              <summary data-asset-menu-toggle class="asset-kebab__btn tc-btn tc-chip px-2 py-1 text-xs cursor-pointer" aria-label="Tác vụ">⋯</summary>
              <div class="asset-kebab__panel rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
                <button class="tc-btn tc-chip w-full justify-start px-3 py-2 text-xs" data-asset-action="use" data-asset-id="${asset.id}" type="button">Dùng</button>
                <button class="tc-btn tc-chip w-full justify-start px-3 py-2 text-xs" data-asset-action="rename" data-asset-id="${asset.id}" type="button">Đổi tên</button>
                <button class="tc-btn tc-chip w-full justify-start px-3 py-2 text-xs" data-asset-action="delete" data-asset-id="${asset.id}" type="button">Xóa</button>
              </div>
            </details>
          </div>
        </button>
      `;
    }).join("");
  };

  const openNameModal = (asset, mode) => {
    state.nameModalMode = mode;
    state.nameModalAsset = asset;
    if (elements.nameInput) {
      const fallback = `Tài sản màu – ${new Date().toLocaleDateString("vi-VN")}`;
      elements.nameInput.value = asset?.name || fallback;
    }
    if (elements.tagsInput) {
      elements.tagsInput.value = Array.isArray(asset?.tags) ? asset.tags.join(", ") : "";
    }
    setModalOpen(true);
  };

  const saveNameModal = () => {
    if (!state.nameModalAsset) return;
    const name = elements.nameInput ? elements.nameInput.value.trim() : "";
    if (!name) {
      showToast("Vui lòng nhập tên tài sản.");
      return;
    }
    const tagsRaw = elements.tagsInput ? elements.tagsInput.value : "";
    const tags = tagsRaw
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    state.nameModalAsset.name = name;
    state.nameModalAsset.tags = tags;
    if (state.nameModalMode === "save") {
      state.assets.unshift(state.nameModalAsset);
    }
    saveAssets();
    renderGrid();
    renderPanel(state.selected);
    setModalOpen(false);
    showToast(`Đã lưu ${name}.`);
  };

  const renderPanel = (asset) => {
  if (!elements.panel || !elements.panelEmpty) return;
  if (!asset) {
    elements.panel.classList.add("hidden");
    elements.panelEmpty.classList.remove("hidden");
    return;
  }
  elements.panel.classList.remove("hidden");
  elements.panelEmpty.classList.add("hidden");
  if (elements.panelName) elements.panelName.textContent = asset.name;
  if (elements.panelType) elements.panelType.textContent = `Loại: ${asset.type}`;
  if (elements.panelNotes) elements.panelNotes.textContent = asset.notes || "";
  if (elements.panelTags) {
    elements.panelTags.innerHTML = (asset.tags || []).map((tag) =>
      `<span class="tc-chip px-2 py-1 rounded-full text-xs">${tag}</span>`
    ).join("");
  }
  if (elements.panelSwatches) {
    const stops = getStopsFromAsset(asset);
    elements.panelSwatches.innerHTML = stops.map((hex) =>
      `<span class="tc-swatch" style="background:${hex};"></span>`
    ).join("");
  }
  const worldKey = resolveWorldKey(asset);
    const isInLibrary = state.assets.some((item) => item.id === asset.id);
    if (elements.save) {
      elements.save.disabled = isInLibrary;
      elements.save.title = isInLibrary ? "Tài sản đã ở Thư viện." : "Lưu tài sản vào Thư viện.";
      elements.save.classList.toggle("opacity-60", isInLibrary);
      elements.save.classList.toggle("cursor-not-allowed", isInLibrary);
    }
    if (elements.rename) {
      elements.rename.disabled = !isInLibrary;
      elements.rename.classList.toggle("opacity-60", !isInLibrary);
      elements.rename.classList.toggle("cursor-not-allowed", !isInLibrary);
    }
    if (elements.remove) {
      elements.remove.disabled = !isInLibrary;
      elements.remove.classList.toggle("opacity-60", !isInLibrary);
      elements.remove.classList.toggle("cursor-not-allowed", !isInLibrary);
    }
  if (elements.apply) {
    const canApply = Boolean(worldKey);
    elements.apply.disabled = !canApply;
    elements.apply.textContent = canApply ? "Dùng từ Thư viện" : "Chưa hỗ trợ";
    elements.apply.classList.toggle("opacity-60", !canApply);
    elements.apply.classList.toggle("cursor-not-allowed", !canApply);
  }
  const material = asset.profiles?.material;
  const materialLine = material
    ? `material_profile: ${material.materialType || ""} · ${material.finish || ""} · ${material.lighting || ""}`
    : "";
  const specText = [
    `id: ${asset.id}`,
    `type: ${asset.type}`,
    `name: ${asset.name}`,
    `tags: ${(asset.tags || []).join(", ")}`,
    `sourceWorld: ${asset.sourceWorld || ""}`,
    asset.project ? `project: ${asset.project}` : "",
    materialLine,
    `stops: ${getStopsFromAsset(asset).join(", ")}`,
    `version: ${asset.version}`
  ].filter(Boolean).join("\n");
    if (elements.specText) elements.specText.textContent = specText;
    if (elements.specJson) elements.specJson.textContent = JSON.stringify(asset, null, 2);
  };

  const deleteAsset = (asset) => {
    if (!asset) return;
    const confirmed = window.confirm(`Xóa tài sản "${asset.name}" khỏi Thư viện?`);
    if (!confirmed) return;
    state.assets = state.assets.filter((item) => item.id !== asset.id);
    if (state.selected && state.selected.id === asset.id) {
      state.selected = null;
    }
    saveAssets();
    renderGrid();
    renderPanel(state.selected);
    showToast(`Đã xóa tài sản ${asset.name}.`);
  };

const applyAsset = (asset) => {
  if (!asset) return;
  const worldKey = resolveWorldKey(asset);
  if (!worldKey) return;
  const payload = {
    assetId: asset.id,
    projectId: asset.project || state.handoff?.projectId || "",
    from: HANDOFF_FROM,
    intent: state.handoff?.intent || "use",
    shade: state.handoff?.shade || ""
  };
  openInWorld(worldKey, payload);
};

const copyText = (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch (_err) {}
    ta.remove();
    resolve();
  });
};

const isLoggedIn = () => {
  const auth = window.tcAuth || null;
  if (typeof auth?.isLoggedIn === "function") return auth.isLoggedIn();
  return false;
};

const publishToFeed = (asset) => {
  if (!asset) return false;
  if (!isLoggedIn()) {
    alert("Cần đăng nhập để chia sẻ.");
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
    alert("Đã chia sẻ lên feed.");
    return true;
  } catch (_err) {
    alert("Không thể chia sẻ.");
    return false;
  }
};

const setActiveTab = (key) => {
  const isAssets = key === "assets";
  if (elements.tabAssets) elements.tabAssets.setAttribute("aria-selected", isAssets ? "true" : "false");
  if (elements.tabHex) elements.tabHex.setAttribute("aria-selected", isAssets ? "false" : "true");
  if (elements.tabAssetsPanel) elements.tabAssetsPanel.classList.toggle("hidden", !isAssets);
  if (elements.tabHexPanel) elements.tabHexPanel.classList.toggle("hidden", isAssets);
  if (!isAssets && !state.hexLoaded) {
    loadHexLibrary();
  }
};

const parseHexHashParams = () => {
  const raw = (window.location.hash || "").replace(/^#/, "");
  if (!raw) return { tab: "", hex: "" };
  const params = new URLSearchParams(raw);
  const tab = params.get("tab") || "";
  const hex = sanitizeHex(params.get("hex") || "");
  return { tab, hex };
};

const applyHashRouting = async () => {
  const { tab, hex } = parseHexHashParams();
  if (tab !== "hex") return;
  setActiveTab("hex");
  if (!hex) return;
  await loadHexLibrary();
  const entry = state.hexEntryMap.get(hex) || state.hexEntries.find((item) => item.hex === hex);
  if (entry) renderHexProfile(entry);
};

const setHexStatus = (message) => {
  if (!elements.hexStatus) return;
  elements.hexStatus.textContent = message;
  if (!message) return;
  window.setTimeout(() => {
    if (elements.hexStatus.textContent === message) {
      elements.hexStatus.textContent = "";
    }
  }, 2000);
};

const highlightHexCard = (hex) => {
  if (!elements.hexGrid || !hex) return;
  const card = elements.hexGrid.querySelector(`[data-hex-card="${hex}"]`);
  if (!card) return;
  card.scrollIntoView({ behavior: "smooth", block: "center" });
  card.style.boxShadow = "0 0 0 2px rgba(96,165,250,0.9)";
  window.setTimeout(() => {
    if (card.style.boxShadow.includes("rgba")) {
      card.style.boxShadow = "";
    }
  }, 1200);
};

const jumpToHex = (hex) => {
  if (!hex) return false;
  const list = sortHexList(applyHexFilter());
  const index = list.findIndex((entry) => entry.hex === hex);
  if (index === -1) {
    setHexStatus(`Không tìm thấy ${hex}.`);
    return false;
  }
  const pageSize = state.hexPageSize || 60;
  if (state.hexLoadMode === "infinite") {
    state.hexVisibleCount = Math.max(state.hexVisibleCount || pageSize, index + 1);
  } else {
    state.hexPage = Math.floor(index / pageSize) + 1;
  }
  renderHexGrid();
  window.requestAnimationFrame(() => highlightHexCard(hex));
  return true;
};

const setOverlayOpen = (element, open) => {
  if (!element) return;
  element.classList.toggle("hidden", !open);
  element.setAttribute("aria-hidden", open ? "false" : "true");
};

let warnedMissingHexOverlay = false;

const ensureEntryMetrics = (entry) => {
  if (!entry) return null;
  if (!entry.rgb) entry.rgb = hexToRgb(entry.hex);
  if (!entry.lab) entry.lab = rgbToLab(entry.rgb);
  if (!entry.hsl) entry.hsl = rgbToHsl(entry.rgb);
  if (!entry.hsv) entry.hsv = rgbToHsv(entry.rgb);
  return entry;
};

const sortHexList = (list) => {
  const items = list.slice();
  if (state.hexSort === "hex") {
    return items.sort((a, b) => a.hex.localeCompare(b.hex));
  }
  if (state.hexSort === "lightness") {
    return items.sort((a, b) => {
      const ahsl = ensureEntryMetrics(a)?.hsl || [0, 0, 0];
      const bhsl = ensureEntryMetrics(b)?.hsl || [0, 0, 0];
      if (ahsl[2] !== bhsl[2]) return bhsl[2] - ahsl[2];
      if (ahsl[1] !== bhsl[1]) return bhsl[1] - ahsl[1];
      return a.hex.localeCompare(b.hex);
    });
  }
  return items.sort((a, b) => {
    const ahsv = ensureEntryMetrics(a)?.hsv || [0, 0, 0];
    const bhsv = ensureEntryMetrics(b)?.hsv || [0, 0, 0];
    if (ahsv[0] !== bhsv[0]) return ahsv[0] - bhsv[0];
    if (ahsv[1] !== bhsv[1]) return bhsv[1] - ahsv[1];
    if (ahsv[2] !== bhsv[2]) return bhsv[2] - ahsv[2];
    return a.hex.localeCompare(b.hex);
  });
};

const setHexPagingVisible = (enabled) => {
  if (elements.hexPrev) elements.hexPrev.hidden = !enabled;
  if (elements.hexNext) elements.hexNext.hidden = !enabled;
  if (elements.hexPageInfo) elements.hexPageInfo.hidden = !enabled;
};

const resetHexList = () => {
  state.hexPage = 1;
  state.hexVisibleCount = 0;
};

let hexObserver = null;

const attachHexObserver = () => {
  if (hexObserver) {
    hexObserver.disconnect();
    hexObserver = null;
  }
  if (!elements.hexGrid || state.hexLoadMode !== "infinite") return;
  const sentinel = elements.hexGrid.querySelector("[data-hex-sentinel]");
  if (!sentinel) return;
  hexObserver = new IntersectionObserver((entries) => {
    const hit = entries.some((entry) => entry.isIntersecting);
    if (!hit) return;
    const step = state.hexPageSize || 60;
    state.hexVisibleCount += step;
    renderHexGrid();
  }, { rootMargin: "240px" });
  hexObserver.observe(sentinel);
};

const buildLightDarkVariants = (entry, direction) => {
  const base = ensureEntryMetrics({ ...entry });
  if (!base || !base.lab) return [];
  const [l, a, b] = base.lab;
  const steps = [8, 16, 24, 32];
  const list = [];
  const seen = new Set();
  steps.forEach((step) => {
    const nextL = direction === "light"
      ? Math.min(100, l + step)
      : Math.max(0, l - step);
    const rgb = labToRgb([nextL, a, b]);
    if (!rgb) return;
    const hex = rgbToHex(rgb);
    if (!seen.has(hex)) {
      list.push({ hex });
      seen.add(hex);
    }
  });
  return list;
};

const getSimilarColors = (entry, threshold) => {
  const key = `${entry.hex}_${threshold}`;
  if (state.hexSimilarCache.has(key)) {
    return state.hexSimilarCache.get(key);
  }
  const base = ensureEntryMetrics({ ...entry });
  if (!base || !base.lab) return [];
  const items = [];
  state.hexEntries.forEach((candidate) => {
    if (candidate.hex === base.hex) return;
    const candidateLab = candidate.lab || rgbToLab(candidate.rgb || hexToRgb(candidate.hex));
    if (!candidateLab) return;
    const delta = deltaE2000(base.lab, candidateLab);
    if (delta <= threshold) {
      items.push({ hex: candidate.hex, delta });
    }
  });
  items.sort((a, b) => a.delta - b.delta);
  const trimmed = items.slice(0, 12);
  state.hexSimilarCache.set(key, trimmed);
  return trimmed;
};

const renderSuggestionRow = (container, list, showDelta = false) => {
  if (!container) return;
  if (!list.length) {
    container.innerHTML = `<div class="tc-muted text-xs">Chưa có gợi ý phù hợp.</div>`;
    return;
  }
  container.innerHTML = list.map((item) => {
    const deltaLine = showDelta && item.delta != null
      ? `<div class="text-[10px] tc-muted">Î”E ${item.delta.toFixed(1)}</div>`
      : "";
    return `
      <button class="tc-card p-2 text-left" data-hex-suggest="${item.hex}" type="button">
        <div class="flex items-center gap-2">
          <span class="tc-swatch" style="background:${item.hex};"></span>
          <div class="text-xs font-semibold">${item.hex}</div>
        </div>
        ${deltaLine}
      </button>
    `;
  }).join("");
};

const renderHexProfile = (entry) => {
  if (!entry || !elements.hexProfileOverlay) {
    if (!warnedMissingHexOverlay) {
      warnedMissingHexOverlay = true;
      console.warn("Thiếu #hexProfileOverlay trong library.html.");
    }
    return;
  }
  const active = ensureEntryMetrics({ ...entry });
  if (!active || !active.rgb || !active.lab) return;
  state.hexProfileEntry = active;
  const hsl = rgbToHsl(active.rgb);
  const hsv = rgbToHsv(active.rgb);
  const lch = labToLch(active.lab);
  const cmyk = rgbToCmyk(active.rgb);
  const contrast = pickContrastText(active.rgb);
  if (elements.hexProfileSwatch) {
    elements.hexProfileSwatch.style.background = active.hex;
  }
  if (elements.hexProfileHex) elements.hexProfileHex.textContent = active.hex;
  if (elements.hexProfileRgb) elements.hexProfileRgb.textContent = formatRgb(active.rgb);
  if (elements.hexProfileHsl) elements.hexProfileHsl.textContent = formatHsl(hsl);
  if (elements.hexProfileHsv) elements.hexProfileHsv.textContent = formatHsv(hsv);
  if (elements.hexProfileLab) elements.hexProfileLab.textContent = formatLab(active.lab);
  if (elements.hexProfileLch && lch) elements.hexProfileLch.textContent = formatLch(lch);
  if (elements.hexProfileCmyk) elements.hexProfileCmyk.textContent = formatCmyk(cmyk);
  if (elements.hexProfileContrast) {
    elements.hexProfileContrast.textContent = `Tương phản chữ: ${contrast.label} · ${contrast.ratio.toFixed(2)}:1`;
  }
  const lightList = buildLightDarkVariants(active, "light");
  const darkList = buildLightDarkVariants(active, "dark");
  renderSuggestionRow(elements.hexLightenGroup, lightList);
  renderSuggestionRow(elements.hexDarkenGroup, darkList);
  if (elements.hexSimilarRange && !elements.hexSimilarRange.value) {
    elements.hexSimilarRange.value = "6";
  }
  updateSimilarForProfile();
  setOverlayOpen(elements.hexProfileOverlay, true);
};

const updateSimilarForProfile = () => {
  if (!state.hexProfileEntry) return;
  const threshold = elements.hexSimilarRange ? Number(elements.hexSimilarRange.value || 6) : 6;
  if (elements.hexSimilarValue) elements.hexSimilarValue.textContent = String(threshold);
  const similarList = getSimilarColors(state.hexProfileEntry, threshold);
  renderSuggestionRow(elements.hexSimilarGroup, similarList, true);
};

const closeHexProfile = () => {
  setOverlayOpen(elements.hexProfileOverlay, false);
  state.hexProfileEntry = null;
};

const renderFullscreen = (entry) => {
  if (!entry || !elements.hexFullscreen) return;
  const active = ensureEntryMetrics({ ...entry });
  if (!active || !active.rgb || !active.lab) return;
  if (elements.hexFullscreenHex) elements.hexFullscreenHex.textContent = active.hex;
  if (elements.hexFullscreenMeta) {
    const hsl = rgbToHsl(active.rgb);
    const lab = active.lab;
    elements.hexFullscreenMeta.textContent = `${formatRgb(active.rgb)} · ${formatHsl(hsl)} · L* ${lab[0].toFixed(1)}`;
  }
  elements.hexFullscreen.style.background = active.hex;
};

const openHexFullscreen = (entry) => {
  if (!entry) return;
  const activeList = state.hexActiveList.length ? state.hexActiveList : state.hexEntries;
  const index = activeList.findIndex((item) => item.hex === entry.hex);
  state.hexFullscreenIndex = index >= 0 ? index : 0;
  renderFullscreen(activeList[state.hexFullscreenIndex]);
  setOverlayOpen(elements.hexFullscreen, true);
};

const closeHexFullscreen = () => {
  setOverlayOpen(elements.hexFullscreen, false);
};

const stepFullscreen = (direction) => {
  const list = state.hexActiveList.length ? state.hexActiveList : state.hexEntries;
  if (!list.length) return;
  state.hexFullscreenIndex = clamp(state.hexFullscreenIndex + direction, 0, list.length - 1);
  renderFullscreen(list[state.hexFullscreenIndex]);
};

const buildHexIndex = (threads) => {
  const map = new Map();
  threads.forEach((item) => {
    const hex = sanitizeHex(item.hex);
    if (!hex) return;
    const key = hex.toUpperCase();
    if (!map.has(key)) {
      const rgb = item.rgb && typeof item.rgb === "object" ? item.rgb : hexToRgb(hex);
      const lab = Array.isArray(item.lab) && item.lab.length === 3 ? item.lab : rgbToLab(rgb);
      map.set(key, {
        hex,
        rgb,
        lab,
        refs: [],
        searchText: hex.toLowerCase()
      });
    }
    const entry = map.get(key);
    entry.refs.push({
      brand: item.brand || "",
      code: item.code || "",
      name: item.name || ""
    });
    entry.searchText += ` ${normalizeText(item.brand)} ${normalizeText(item.code)} ${normalizeText(item.name)}`;
  });
  return Array.from(map.values()).sort((a, b) => a.hex.localeCompare(b.hex));
};

const applyHexFilter = () => {
  const query = normalizeText(state.hexQuery);
  if (!query) return state.hexEntries;
  return state.hexEntries.filter((entry) => entry.searchText.includes(query));
};

const renderHexGrid = () => {
  if (!elements.hexGrid) return;
  const filtered = applyHexFilter();
  const sorted = sortHexList(filtered);
  state.hexActiveList = sorted;
  const pageSize = state.hexPageSize || 60;
  let pageItems = sorted;
  let totalPages = 1;
  if (state.hexLoadMode === "infinite") {
    if (!state.hexVisibleCount) state.hexVisibleCount = pageSize;
    const limit = Math.min(state.hexVisibleCount, sorted.length);
    pageItems = sorted.slice(0, limit);
  } else {
    totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    state.hexPage = clamp(state.hexPage, 1, totalPages);
    const start = (state.hexPage - 1) * pageSize;
    pageItems = sorted.slice(start, start + pageSize);
  }
  elements.hexGrid.dataset.view = state.hexView;
  elements.hexGrid.classList.toggle("is-compact", state.hexView == "compact");
  elements.hexGrid.classList.toggle("is-card", state.hexView != "compact");
  if (!pageItems.length) {
    elements.hexGrid.innerHTML = `<div class="tc-muted text-sm">Không tìm thấy màu phù hợp.</div>`;
  } else {
    const cardHtml = pageItems.map((entry) => {
      const refsPreview = entry.refs.slice(0, 2).map((ref) => `${ref.brand} ${ref.code}`.trim()).join(" · ");
      const refsSuffix = entry.refs.length > 2 ? ` +${entry.refs.length - 2}` : "";
      const actionMenu = `
        <details class="relative" data-hex-ignore="true">
          <summary class="tc-btn tc-chip px-2 py-2 text-xs" aria-label="Mở menu">...</summary>
          <div class="absolute right-0 mt-2 w-40 rounded-xl border border-white/10 bg-[#0c1118] p-2 shadow-xl text-xs space-y-1 z-10">
            <button class="tc-btn tc-chip w-full justify-start px-3 py-2" data-hex-action="detail" data-hex="${entry.hex}" type="button">Chi tiết</button>
            <button class="tc-btn tc-chip w-full justify-start px-3 py-2" data-hex-action="threadcolor" data-hex="${entry.hex}" type="button">Mở ở Thêu</button>
            <button class="tc-btn tc-chip w-full justify-start px-3 py-2" data-hex-action="printcolor" data-hex="${entry.hex}" type="button">Mở ở In</button>
            <button class="tc-btn tc-chip w-full justify-start px-3 py-2" data-hex-action="palette" data-hex="${entry.hex}" type="button">Tạo Palette</button>
            <button class="tc-btn tc-chip w-full justify-start px-3 py-2" data-hex-action="gradient" data-hex="${entry.hex}" type="button">Tạo Gradient</button>
            <button class="tc-btn tc-chip w-full justify-start px-3 py-2" data-hex-action="fullscreen" data-hex="${entry.hex}" type="button">Toàn màn hình</button>
          </div>
        </details>
      `;
      if (state.hexView === "compact") {
        return `
          <div class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2" data-hex-card="${entry.hex}">
            <span class="tc-hex-swatch" style="background:${entry.hex};"></span>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-semibold">${entry.hex}</div>
              <div class="text-[10px] tc-muted">${entry.refs.length} mã</div>
            </div>
            <div class="flex items-center gap-1" data-hex-ignore="true">
              <button class="tc-btn tc-chip px-2 py-2 text-[10px]" data-hex-action="copy" data-hex="${entry.hex}" type="button">Copy</button>
              <button class="tc-btn tc-btn-primary px-2 py-2 text-[10px]" data-hex-action="save" data-hex="${entry.hex}" type="button">Lưu</button>
              ${actionMenu}
            </div>
          </div>
        `;
      }
      return `
        <div class="tc-card p-4 space-y-3" data-hex-card="${entry.hex}">
          <div class="flex items-center gap-3">
            <span class="tc-hex-swatch" style="background:${entry.hex};"></span>
            <div class="flex-1">
              <div class="font-semibold">${entry.hex}</div>
              <div class="text-xs tc-muted">${entry.refs.length} mã · ${refsPreview}${refsSuffix}</div>
            </div>
            <div class="flex items-center gap-2" data-hex-ignore="true">
              <button class="tc-btn tc-chip px-3 py-2 text-xs" data-hex-action="copy" data-hex="${entry.hex}" type="button">Sao chép</button>
              <button class="tc-btn tc-btn-primary px-3 py-2 text-xs" data-hex-action="save" data-hex="${entry.hex}" type="button">Lưu</button>
              ${actionMenu}
            </div>
          </div>
        </div>
      `;
    }).join("");
    const sentinel = state.hexLoadMode === "infinite" && pageItems.length < sorted.length
      ? `<div data-hex-sentinel="true"></div>`
      : "";
    elements.hexGrid.innerHTML = cardHtml + sentinel;
  }
  if (elements.hexStats) {
    elements.hexStats.textContent = `Tổng ${sorted.length} màu · ${state.hexEntries.length} màu trong kho`;
  }
  if (elements.hexPageInfo) {
    if (state.hexLoadMode === "infinite") {
      elements.hexPageInfo.textContent = `Hiển thị ${pageItems.length}/${sorted.length}`;
    } else {
      elements.hexPageInfo.textContent = `Trang ${state.hexPage}/${totalPages}`;
    }
  }
  if (state.hexLoadMode === "infinite") {
    setHexPagingVisible(false);
  } else {
    setHexPagingVisible(true);
  }
  if (elements.hexPrev) elements.hexPrev.disabled = state.hexPage <= 1;
  if (elements.hexNext) elements.hexNext.disabled = state.hexPage >= totalPages;
  attachHexObserver();
};
const loadHexLibrary = async () => {
  if (state.hexLoaded) return;
  state.hexLoaded = true;
  if (elements.hexStats) elements.hexStats.textContent = "Đang nạp dữ liệu...";
  try {
    const response = await fetch("../threads.json", { cache: "no-store" });
    const data = await response.json();
    state.hexEntries = buildHexIndex(Array.isArray(data) ? data : []);
    state.hexEntryMap = new Map(state.hexEntries.map((entry) => [entry.hex, entry]));
    renderHexGrid();
  } catch (_err) {
    if (elements.hexStats) elements.hexStats.textContent = "Không thể nạp dữ liệu kho HEX.";
  }
};

const saveHexToLibrary = (entry) => {
  if (!entry) return;
  const now = new Date().toISOString();
  const asset = {
    id: `hex_${entry.hex.replace("#", "")}_${Date.now()}`,
    type: "hex_swatch",
    name: `HEX ${entry.hex}`,
    tags: ["hex", "swatch"],
    core: {
      colors: [entry.hex],
      hex: entry.hex,
      rgb: entry.rgb || hexToRgb(entry.hex),
      lab: entry.lab || rgbToLab(entry.rgb || hexToRgb(entry.hex)),
      refs: entry.refs.slice(0, 12)
    },
    notes: `Kho HEX: ${entry.refs.length} mã tham chiếu.`,
    version: "1.0.0",
    createdAt: now,
    updatedAt: now,
    sourceWorld: "library",
    project: state.currentProject || ""
  };
  state.assets.unshift(asset);
  saveAssets();
  renderGrid();
  setHexStatus(`Đã lưu ${entry.hex} vào Thư viện.`);
};

const bindEvents = () => {
  elements.search?.addEventListener("input", renderGrid);
  elements.filter?.addEventListener("change", renderGrid);
  elements.projectFilter?.addEventListener("change", () => {
    state.projectFilter = elements.projectFilter.value === "__all__" ? "" : elements.projectFilter.value;
    renderGrid();
  });
  elements.createDemo?.addEventListener("click", () => {
    const asset = createDemoAsset();
    state.assets.unshift(asset);
    saveAssets();
    renderGrid();
  });
  elements.tabAssets?.addEventListener("click", () => setActiveTab("assets"));
  elements.tabHex?.addEventListener("click", () => setActiveTab("hex"));
  const onHexSearch = debounce(() => {
    state.hexQuery = elements.hexSearch?.value || "";
    resetHexList();
    renderHexGrid();
  }, 300);
  elements.hexSearch?.addEventListener("input", onHexSearch);
  elements.hexSearch?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const hex = sanitizeHex(elements.hexSearch?.value || "");
    if (!hex) return;
    event.preventDefault();
    jumpToHex(hex);
  });
  elements.hexSort?.addEventListener("change", () => {
    state.hexSort = elements.hexSort.value || "hex";
    resetHexList();
    renderHexGrid();
  });
  elements.hexView?.addEventListener("change", () => {
    const next = normalizeHexView(elements.hexView.value);
    state.hexView = next;
    resetHexList();
    try {
      localStorage.setItem(HEX_VIEW_STORAGE_KEY, next);
    } catch (_err) {}
    renderHexGrid();
  });
  elements.hexLoadMode?.addEventListener("change", () => {
    const next = elements.hexLoadMode.value === "paged" ? "paged" : "infinite";
    state.hexLoadMode = next;
    resetHexList();
    renderHexGrid();
  });
  elements.hexPageSize?.addEventListener("change", () => {
    const next = parseInt(elements.hexPageSize.value, 10);
    state.hexPageSize = Number.isFinite(next) ? next : 60;
    resetHexList();
    renderHexGrid();
  });
  elements.hexPrev?.addEventListener("click", () => {
    state.hexPage = clamp(state.hexPage - 1, 1, Number.MAX_SAFE_INTEGER);
    renderHexGrid();
  });
  elements.hexNext?.addEventListener("click", () => {
    state.hexPage = clamp(state.hexPage + 1, 1, Number.MAX_SAFE_INTEGER);
    renderHexGrid();
  });
    elements.hexGrid?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-hex-action]");
    if (btn) {
      const hex = btn.dataset.hex;
      const action = btn.dataset.hexAction;
      const entry = state.hexEntryMap.get(hex) || state.hexEntries.find((item) => item.hex === hex);
      if (!hex || !action) return;
      if (action === "detail") {
        if (entry) renderHexProfile(entry);
        return;
      }
      if (action === "copy") {
        copyText(hex);
        setHexStatus(`Đã sao chép ${hex}.`);
        return;
      }
      if (action === "threadcolor") {
        window.location.href = `../worlds/threadcolor.html?color=${hex}`;
        return;
      }
      if (action === "printcolor") {
        window.location.href = `../worlds/printcolor.html#c=${hex}`;
        return;
      }
      if (action === "palette") {
        window.location.href = `../worlds/palette.html#p=${hex}`;
        return;
      }
      if (action === "gradient") {
        window.location.href = `../worlds/gradient.html#g=${hex}`;
        return;
      }
      if (action === "save") {
        saveHexToLibrary(entry);
        return;
      }
      if (action === "fullscreen") {
        openHexFullscreen(entry);
      }
      return;
    }
    if (event.target.closest("[data-hex-ignore]")) return;
    const card = event.target.closest("[data-hex-card]");
    if (!card) return;
    const hex = card.dataset.hexCard;
    const entry = state.hexEntryMap.get(hex) || state.hexEntries.find((item) => item.hex === hex);
    if (entry) renderHexProfile(entry);
  });
  elements.hexProfileClose?.addEventListener("click", closeHexProfile);
  elements.hexProfileOverlay?.addEventListener("click", (event) => {
    if (event.target === elements.hexProfileOverlay) {
      closeHexProfile();
    }
  });
  elements.hexProfileCopy?.addEventListener("click", () => {
    if (!state.hexProfileEntry) return;
    copyText(state.hexProfileEntry.hex);
    setHexStatus(`Đã sao chép ${state.hexProfileEntry.hex}.`);
  });
  elements.hexProfileSave?.addEventListener("click", () => {
    if (!state.hexProfileEntry) return;
    saveHexToLibrary(state.hexProfileEntry);
  });
  elements.hexProfileOpenThread?.addEventListener("click", () => {
    if (!state.hexProfileEntry) return;
    window.location.href = `../worlds/threadcolor.html?color=${state.hexProfileEntry.hex}`;
  });
  elements.hexProfileOpenGradient?.addEventListener("click", () => {
    if (!state.hexProfileEntry) return;
    window.location.href = `../worlds/gradient.html#g=${state.hexProfileEntry.hex}`;
  });
  elements.hexProfileOpenPalette?.addEventListener("click", () => {
    if (!state.hexProfileEntry) return;
    window.location.href = `../worlds/palette.html#p=${state.hexProfileEntry.hex}`;
  });
  elements.hexProfileOpenPrint?.addEventListener("click", () => {
    if (!state.hexProfileEntry) return;
    window.location.href = `../worlds/printcolor.html#c=${state.hexProfileEntry.hex}`;
  });
  elements.hexProfileOpenPaint?.addEventListener("click", () => {
    if (!state.hexProfileEntry) return;
    window.location.href = `../worlds/paintfabric.html?color=${state.hexProfileEntry.hex}`;
  });
  const debouncedSimilar = debounce(() => updateSimilarForProfile(), 200);
  elements.hexSimilarRange?.addEventListener("input", () => {
    debouncedSimilar();
  });
  elements.hexLightenGroup?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-hex-suggest]");
    if (!btn) return;
    const hex = btn.dataset.hexSuggest;
    const entry = state.hexEntryMap.get(hex) || state.hexEntries.find((item) => item.hex === hex);
    if (entry) renderHexProfile(entry);
  });
  elements.hexDarkenGroup?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-hex-suggest]");
    if (!btn) return;
    const hex = btn.dataset.hexSuggest;
    const entry = state.hexEntryMap.get(hex) || state.hexEntries.find((item) => item.hex === hex);
    if (entry) renderHexProfile(entry);
  });
  elements.hexSimilarGroup?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-hex-suggest]");
    if (!btn) return;
    const hex = btn.dataset.hexSuggest;
    const entry = state.hexEntryMap.get(hex) || state.hexEntries.find((item) => item.hex === hex);
    if (entry) renderHexProfile(entry);
  });
  elements.hexFullscreenClose?.addEventListener("click", closeHexFullscreen);
  elements.hexFullscreenPrev?.addEventListener("click", () => stepFullscreen(-1));
  elements.hexFullscreenNext?.addEventListener("click", () => stepFullscreen(1));
  elements.hexFullscreenCopy?.addEventListener("click", () => {
    const list = state.hexActiveList.length ? state.hexActiveList : state.hexEntries;
    const entry = list[state.hexFullscreenIndex];
    if (!entry) return;
    copyText(entry.hex);
    setHexStatus(`Đã sao chép ${entry.hex}.`);
  });
  elements.hexFullscreen?.addEventListener("touchstart", (event) => {
    if (!event.touches?.length) return;
    elements.hexFullscreen.dataset.touchStartX = String(event.touches[0].clientX);
  }, { passive: true });
  elements.hexFullscreen?.addEventListener("touchend", (event) => {
    const startX = Number(elements.hexFullscreen?.dataset.touchStartX || 0);
    const endX = event.changedTouches?.[0]?.clientX || 0;
    const delta = endX - startX;
    if (Math.abs(delta) > 50) {
      stepFullscreen(delta < 0 ? 1 : -1);
    }
    });
    elements.grid?.addEventListener("click", (event) => {
      const actionBtn = event.target.closest("[data-asset-action]");
      if (actionBtn) {
        event.preventDefault();
        event.stopPropagation();
        const id = actionBtn.dataset.assetId;
        const action = actionBtn.dataset.assetAction;
        const asset = state.assets.find((item) => item.id === id);
        if (!asset) return;
        if (action === "use") applyAsset(asset);
        if (action === "rename") openNameModal(asset, "rename");
        if (action === "delete") deleteAsset(asset);
        const details = actionBtn.closest("details");
        if (details) details.open = false;
        return;
      }
      if (event.target.closest("[data-asset-menu]")) return;
      const card = event.target.closest("[data-asset-id]");
      if (!card) return;
      const asset = state.assets.find((item) => item.id === card.dataset.assetId);
      state.selected = asset || null;
      renderPanel(state.selected);
      renderGrid();
      document.getElementById("assetPanel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    elements.apply?.addEventListener("click", () => applyAsset(state.selected));
    elements.share?.addEventListener("click", () => publishToFeed(state.selected));
    elements.save?.addEventListener("click", () => {
      if (!state.selected) return;
      const exists = state.assets.some((item) => item.id === state.selected.id);
      if (exists) {
        showToast("Tài sản đã ở Thư viện.");
        return;
      }
      openNameModal(state.selected, "save");
    });
    elements.rename?.addEventListener("click", () => {
      if (!state.selected) return;
      openNameModal(state.selected, "rename");
    });
    elements.remove?.addEventListener("click", () => {
      if (!state.selected) return;
      deleteAsset(state.selected);
    });
    elements.nameClose?.addEventListener("click", () => setModalOpen(false));
    elements.nameCancel?.addEventListener("click", () => setModalOpen(false));
    elements.nameModal?.addEventListener("click", (event) => {
      if (event.target === elements.nameModal) setModalOpen(false);
    });
    elements.nameSave?.addEventListener("click", saveNameModal);
    elements.copyText?.addEventListener("click", () => {
      if (!elements.specText) return;
    copyText(elements.specText.textContent || "");
  });
  elements.copyJson?.addEventListener("click", () => {
    if (!elements.specJson) return;
    copyText(elements.specJson.textContent || "");
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeHexProfile();
      closeHexFullscreen();
    }
    if (elements.hexFullscreen && !elements.hexFullscreen.classList.contains("hidden")) {
      if (event.key === "ArrowLeft") stepFullscreen(-1);
      if (event.key === "ArrowRight") stepFullscreen(1);
    }
  });
};

state.assets = loadAssets();
loadProjectPrefs();
syncProjectFilter();
loadHexViewPreference();
if (elements.hexSort?.value) state.hexSort = elements.hexSort.value;
if (elements.hexLoadMode?.value) {
  state.hexLoadMode = elements.hexLoadMode.value === "paged" ? "paged" : "infinite";
}
if (elements.hexView?.value && !localStorage.getItem(HEX_VIEW_STORAGE_KEY)) {
  state.hexView = normalizeHexView(elements.hexView.value);
}
updateHexControls();
renderGrid();
renderPanel(state.selected);
bindEvents();
setActiveTab("assets");
setupAutofillTrap(elements.search);
applyHashRouting();

window.addEventListener("hashchange", () => {
  applyHashRouting();
});

if (typeof window !== "undefined") {
  window.tcOpenInWorld = openInWorld;
}

