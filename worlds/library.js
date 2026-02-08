import { parseHandoff, withHandoff } from "../scripts/handoff.js";

const STORAGE_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const PROJECT_RECENT_KEY = "tc_projects_recent";
const FEED_STORAGE_KEY = "tc_community_feed";
const HANDOFF_FROM = "library";
const HEX_VIEW_STORAGE_KEY = "tc_hex_view_mode";
const HEX_MENU_TIP_KEY = "tc_hex_menu_tip_v1";
const PINNED_ASSET_KEY = "tc_w5_pinned_assets_v1";
const RECENT_ASSET_KEY = "tc_w5_recent_assets_v1";
const WORLD_PATHS = {
  threadcolor: "./threadcolor.html",
  gradient: "./gradient.html",
  palette: "./palette.html",
  printcolor: "./printcolor.html",
  library: "./library.html",
  paintfabric: "./paintfabric.html",
  imagecolor: "./imagecolor.html",
  community: "../spaces/community.html"
};
const WORLD_LABELS = {
  threadcolor: "Màu thêu",
  gradient: "Dải chuyển",
  palette: "Palette",
  printcolor: "Màu in (CMYK)",
  paintfabric: "Sơn & Vải",
  imagecolor: "Ảnh"
};
const PACK_SCHEMA_VERSION = "1.0";
const SHARE_PREFIX = "SCASSET1:";

const elements = {
  search: document.getElementById("assetSearch"),
  filter: document.getElementById("assetFilter"),
  projectFilter: document.getElementById("assetProjectFilter"),
  grid: document.getElementById("assetGrid"),
  pinnedStrip: document.getElementById("assetPinnedStrip"),
  pinnedList: document.getElementById("assetPinnedList"),
  recentStrip: document.getElementById("assetRecentStrip"),
  recentList: document.getElementById("assetRecentList"),
  assetMultiSelect: document.getElementById("assetMultiSelect"),
  assetActionBar: document.getElementById("assetActionBar"),
  assetSelectedCount: document.getElementById("assetSelectedCount"),
  assetBulkPin: document.getElementById("assetBulkPin"),
  assetBulkUnpin: document.getElementById("assetBulkUnpin"),
  assetBulkExport: document.getElementById("assetBulkExport"),
  assetBulkDelete: document.getElementById("assetBulkDelete"),
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
    openWorld: document.getElementById("assetOpenWorld"),
    pinToggle: document.getElementById("assetPinToggle"),
    sharePack: document.getElementById("assetSharePack"),
    rename: document.getElementById("assetRename"),
    remove: document.getElementById("assetDelete"),
    share: document.getElementById("assetShare"),
    specText: document.getElementById("assetSpecText"),
    specJson: document.getElementById("assetSpecJson"),
    copyText: document.getElementById("assetCopyText"),
    copyJson: document.getElementById("assetCopyJson"),
    historyPanel: document.getElementById("assetHistoryPanel"),
    historyList: document.getElementById("assetHistoryList"),
    nameModal: document.getElementById("assetNameModal"),
    nameClose: document.getElementById("assetNameClose"),
    nameCancel: document.getElementById("assetNameCancel"),
    nameSave: document.getElementById("assetNameSave"),
    nameInput: document.getElementById("assetNameInput"),
    tagsInput: document.getElementById("assetTagsInput"),
    toast: document.getElementById("assetToast"),
    syncExport: document.getElementById("assetExportPack"),
    syncFile: document.getElementById("assetImportFile"),
    syncMode: document.getElementById("assetImportMode"),
    syncImport: document.getElementById("assetImportPack"),
    shareImportOpen: document.getElementById("assetShareImportOpen"),
    shareModal: document.getElementById("assetShareModal"),
    shareClose: document.getElementById("assetShareClose"),
    shareCancel: document.getElementById("assetShareCancel"),
    shareImport: document.getElementById("assetShareImport"),
    shareInput: document.getElementById("assetShareInput"),
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
  hexMultiSelect: document.getElementById("hexMultiSelect"),
  hexActionBar: document.getElementById("hexActionBar"),
  hexSelectedCount: document.getElementById("hexSelectedCount"),
  hexCopySelected: document.getElementById("hexCopySelected"),
  hexSaveSelected: document.getElementById("hexSaveSelected"),
  hexCreatePalette: document.getElementById("hexCreatePalette"),
  hexCreateGradient: document.getElementById("hexCreateGradient"),
  hexOpenThread: document.getElementById("hexOpenThread"),
  hexOpenPrint: document.getElementById("hexOpenPrint"),
  hexClearSelected: document.getElementById("hexClearSelected"),
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
  hexFullscreenCopy: document.getElementById("hexFullscreenCopy"),
  hexMenuPopover: document.getElementById("hexMenuPopover"),
  hexMenuList: document.getElementById("hexMenuList")
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
  hexView: "tiles",
  hexLoadMode: "infinite",
  hexVisibleCount: 0,
  hexActiveList: [],
  hexEntryMap: new Map(),
  hexBaseCount: 0,
  hexSpectrumCount: 0,
  hexMultiSelect: false,
  hexSelected: new Set(),
  hexRenderedList: [],
  hexLastSelectedIndex: null,
  hexProfileEntry: null,
  hexFullscreenIndex: 0,
  hexSimilarCache: new Map(),
  nameModalMode: "save",
  nameModalAsset: null,
  assetMultiSelect: false,
  assetSelectedIds: new Set(),
  assetRenderedIds: [],
  assetLastSelectedIndex: null
};

let assetPinnedIds = [];
let assetRecentIds = [];

const normalizeText = (value) => (value || "").toLowerCase();
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const escapeHTML = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const highlightHTML = (fullText, query) => {
  const text = String(fullText ?? "");
  const needle = String(query ?? "").trim();
  if (!needle) return escapeHTML(text);
  const lowerText = text.toLowerCase();
  const lowerNeedle = needle.toLowerCase();
  let result = "";
  let cursor = 0;
  while (cursor < text.length) {
    const idx = lowerText.indexOf(lowerNeedle, cursor);
    if (idx === -1) {
      result += escapeHTML(text.slice(cursor));
      break;
    }
    if (idx > cursor) {
      result += escapeHTML(text.slice(cursor, idx));
    }
    const match = text.slice(idx, idx + lowerNeedle.length);
    result += `<span class="tc-match">${escapeHTML(match)}</span>`;
    cursor = idx + lowerNeedle.length;
  }
  return result;
};

const normalizeHexLoose = (value) => {
  if (!value) return "";
  const cleaned = value.toString().trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(cleaned)) return "";
  const hex = cleaned.length === 3
    ? cleaned.split("").map((c) => c + c).join("")
    : cleaned;
  return `#${hex.toUpperCase()}`;
};

const cloneAsset = (asset) => {
  try {
    return JSON.parse(JSON.stringify(asset));
  } catch (_err) {
    return { ...asset };
  }
};

const ensureVersion = (asset) => {
  if (!asset) return;
  if (!asset.version) asset.version = "1.0.0";
  if (!asset.updatedAt) asset.updatedAt = new Date().toISOString();
};

const bumpVersion = (version) => {
  const raw = String(version || "");
  const parts = raw.split(".").map((part) => Number(part));
  if (parts.length !== 3 || parts.some((num) => Number.isNaN(num))) {
    return "1.0.1";
  }
  const [major, minor, patch] = parts;
  return `${major}.${minor}.${patch + 1}`;
};

const pushHistory = (asset) => {
  if (!asset) return;
  ensureVersion(asset);
  const snapshot = cloneAsset(asset);
  delete snapshot.history;
  asset.history = Array.isArray(asset.history) ? asset.history : [];
  asset.history.unshift({
    version: asset.version,
    savedAt: new Date().toISOString(),
    snapshot
  });
  asset.history = asset.history.slice(0, 10);
};

const restoreAssetVersion = (asset, entry) => {
  if (!asset || !entry?.snapshot) return;
  pushHistory(asset);
  const snapshot = cloneAsset(entry.snapshot);
  const history = Array.isArray(asset.history) ? asset.history : [];
  Object.keys(asset).forEach((key) => delete asset[key]);
  Object.assign(asset, snapshot);
  asset.history = history;
  asset.version = bumpVersion(snapshot.version || asset.version);
  asset.updatedAt = new Date().toISOString();
};

const encodeBase64 = (text) => {
  try {
    const bytes = new TextEncoder().encode(text);
    let binary = "";
    bytes.forEach((b) => {
      binary += String.fromCharCode(b);
    });
    return btoa(binary);
  } catch (_err) {
    return btoa(unescape(encodeURIComponent(text)));
  }
};

const decodeBase64 = (payload) => {
  try {
    const binary = atob(payload);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch (_err) {
    try {
      return decodeURIComponent(escape(atob(payload)));
    } catch (_err2) {
      return "";
    }
  }
};

const parseDateValue = (value) => {
  const time = Date.parse(value || "");
  return Number.isNaN(time) ? 0 : time;
};

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

const setShareModalOpen = (open) => {
  if (!elements.shareModal) return;
  elements.shareModal.classList.toggle("hidden", !open);
  elements.shareModal.setAttribute("aria-hidden", open ? "false" : "true");
  if (open && elements.shareInput) elements.shareInput.focus();
};

const normalizeHexView = (value) => {
  if (value === "tiles") return "tiles";
  if (value === "card" || value === "detail") return "card";
  if (value === "compact") return "compact";
  return "tiles";
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

const showHexMenuTip = () => {
  if (!elements.hexStatus) return;
  try {
    if (localStorage.getItem(HEX_MENU_TIP_KEY)) return;
    elements.hexStatus.textContent = "Menu ⋯ ở góc phải ô màu chứa các tác vụ.";
    localStorage.setItem(HEX_MENU_TIP_KEY, "1");
    window.setTimeout(() => {
      if (elements.hexStatus.textContent.includes("Menu ⋯")) {
        elements.hexStatus.textContent = "";
      }
    }, 3500);
  } catch (_err) {}
};

const updateHexSelectionUI = () => {
  const count = state.hexSelected.size;
  if (elements.hexSelectedCount) elements.hexSelectedCount.textContent = String(count);
  if (elements.hexActionBar) {
    elements.hexActionBar.classList.toggle("hidden", count === 0);
  }
  if (elements.hexCreateGradient) elements.hexCreateGradient.disabled = count < 2;
};

const toggleHexSelection = (hex, card) => {
  if (!hex) return;
  if (state.hexSelected.has(hex)) {
    state.hexSelected.delete(hex);
    card?.classList.remove("is-selected");
  } else {
    state.hexSelected.add(hex);
    card?.classList.add("is-selected");
  }
  updateHexSelectionUI();
};

const selectHexRange = (startIndex, endIndex) => {
  const list = state.hexRenderedList || [];
  if (!list.length) return;
  const from = Math.max(0, Math.min(startIndex, endIndex));
  const to = Math.min(list.length - 1, Math.max(startIndex, endIndex));
  // Only select within the currently rendered list (infinite/paged slice).
  for (let i = from; i <= to; i += 1) {
    const hex = list[i];
    if (!hex) continue;
    state.hexSelected.add(hex);
    const card = elements.hexGrid?.querySelector(`[data-hex-card="${hex}"]`);
    card?.classList.add("is-selected");
  }
  updateHexSelectionUI();
};

const getSelectedHexList = () => Array.from(state.hexSelected);

const copyHexList = (list) => {
  if (!list.length) return Promise.resolve(false);
  return copyText(list.join("\n")).then(() => true);
};

const saveHexBatch = async (list) => {
  if (!list.length) return 0;
  let saved = 0;
  for (const hex of list) {
    const entry = state.hexEntryMap.get(hex) || state.hexEntries.find((item) => item.hex === hex);
    if (entry) {
      saveHexToLibrary(entry);
      saved += 1;
    }
    await new Promise((resolve) => window.requestAnimationFrame(resolve));
  }
  return saved;
};

const closeHexMenu = () => {
  if (!elements.hexMenuPopover) return;
  elements.hexMenuPopover.setAttribute("hidden", "true");
  if (elements.hexMenuList) elements.hexMenuList.innerHTML = "";
};

const openHexMenu = (anchor, entry) => {
  if (!elements.hexMenuPopover || !elements.hexMenuList || !entry) return;
  const actions = [
    { id: "save", label: "Lưu" },
    { id: "detail", label: "Chi tiết" },
    { id: "fullscreen", label: "Toàn màn hình" },
    { id: "threadcolor", label: "Mở ở Thêu" },
    { id: "printcolor", label: "Mở ở In" },
    { id: "palette", label: "Tạo Palette" },
    { id: "gradient", label: "Tạo Gradient" }
  ];
  elements.hexMenuList.innerHTML = actions.map((action) =>
    `<button class="tc-btn tc-chip w-full justify-start px-3 py-2 text-xs" data-hex-action="${action.id}" data-hex="${entry.hex}" type="button">${action.label}</button>`
  ).join("");

  const rect = anchor.getBoundingClientRect();
  const popover = elements.hexMenuPopover;
  popover.removeAttribute("hidden");
  const popRect = popover.getBoundingClientRect();
  const padding = 8;
  let left = rect.right - popRect.width;
  let top = rect.bottom + 6;
  if (left < padding) left = padding;
  if (left + popRect.width > window.innerWidth - padding) {
    left = window.innerWidth - popRect.width - padding;
  }
  if (top + popRect.height > window.innerHeight - padding) {
    top = rect.top - popRect.height - 6;
  }
  if (top < padding) top = padding;
  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
};

const handleHexAction = (action, hex) => {
  const entry = state.hexEntryMap.get(hex) || state.hexEntries.find((item) => item.hex === hex);
  if (!hex || !action) return;
  if (action === "detail") {
    if (entry) renderHexProfile(entry);
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

const getContrastTextColor = (rgb) => {
  const pick = pickContrastText(rgb);
  return pick.label === "Trắng" ? "#ffffff" : "#0b0b0b";
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

const buildLibraryPack = () => ({
  schemaVersion: PACK_SCHEMA_VERSION,
  exportedAt: new Date().toISOString(),
  assets: state.assets,
  pinnedIds: assetPinnedIds,
  recentIds: assetRecentIds
});

const downloadPack = () => {
  const payload = JSON.stringify(buildLibraryPack(), null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const link = document.createElement("a");
  link.href = url;
  link.download = `library_pack_${stamp}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const importLibraryPack = (pack, mode = "merge") => {
  if (!pack || typeof pack !== "object") return false;
  if (!pack.schemaVersion || String(pack.schemaVersion).startsWith("1") === false) {
    return false;
  }
  const incoming = Array.isArray(pack.assets) ? pack.assets : [];
  if (!incoming.length) return false;
  const byId = new Map(state.assets.map((asset) => [asset.id, asset]));
  const nextAssets = state.assets.slice();
  incoming.forEach((asset) => {
    if (!asset?.id) return;
    ensureVersion(asset);
    const existing = byId.get(asset.id);
    if (!existing) {
      nextAssets.push(asset);
      return;
    }
    if (mode === "overwrite") {
      const idx = nextAssets.findIndex((item) => item.id === asset.id);
      if (idx !== -1) nextAssets[idx] = asset;
      return;
    }
    const incomingTime = parseDateValue(asset.updatedAt);
    const existingTime = parseDateValue(existing.updatedAt);
    if (incomingTime > existingTime) {
      const idx = nextAssets.findIndex((item) => item.id === asset.id);
      if (idx !== -1) nextAssets[idx] = asset;
    }
  });
  state.assets = nextAssets;
  const packPinned = Array.isArray(pack.pinnedIds) ? pack.pinnedIds : [];
  const packRecent = Array.isArray(pack.recentIds) ? pack.recentIds : [];
  assetPinnedIds = [...packPinned, ...assetPinnedIds.filter((id) => !packPinned.includes(id))];
  assetRecentIds = [...packRecent, ...assetRecentIds.filter((id) => !packRecent.includes(id))].slice(0, 12);
  syncPinnedRecent();
  saveAssets();
  renderGrid();
  renderPanel(state.selected);
  return true;
};

const loadPinnedAssets = () => {
  try {
    const raw = localStorage.getItem(PINNED_ASSET_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    assetPinnedIds = Array.isArray(parsed) ? parsed : [];
  } catch (_err) {
    assetPinnedIds = [];
  }
};

const savePinnedAssets = () => {
  try {
    localStorage.setItem(PINNED_ASSET_KEY, JSON.stringify(assetPinnedIds));
  } catch (_err) {}
};

const loadRecentAssets = () => {
  try {
    const raw = localStorage.getItem(RECENT_ASSET_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    assetRecentIds = Array.isArray(parsed) ? parsed : [];
  } catch (_err) {
    assetRecentIds = [];
  }
};

const saveRecentAssets = () => {
  try {
    localStorage.setItem(RECENT_ASSET_KEY, JSON.stringify(assetRecentIds));
  } catch (_err) {}
};

const syncPinnedRecent = () => {
  const ids = new Set(state.assets.map((asset) => asset.id));
  assetPinnedIds = assetPinnedIds.filter((id) => ids.has(id));
  assetRecentIds = assetRecentIds.filter((id) => ids.has(id));
  savePinnedAssets();
  saveRecentAssets();
};

const isAssetPinned = (id) => assetPinnedIds.includes(id);

const pinAsset = (id) => {
  if (!id) return;
  assetPinnedIds = [id, ...assetPinnedIds.filter((item) => item !== id)];
  savePinnedAssets();
};

const unpinAsset = (id) => {
  if (!id) return;
  assetPinnedIds = assetPinnedIds.filter((item) => item !== id);
  savePinnedAssets();
};

const touchRecentAsset = (asset) => {
  if (!asset?.id) return;
  assetRecentIds = assetRecentIds.filter((id) => id !== asset.id);
  assetRecentIds.unshift(asset.id);
  assetRecentIds = assetRecentIds.slice(0, 12);
  saveRecentAssets();
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

const matchesAssetQuery = (asset, query) => {
  const needle = String(query || "").trim();
  if (!needle) return true;
  const haystack = [
    asset?.name,
    asset?.type,
    ...(asset?.tags || [])
  ].join(" ");
  return normalizeText(haystack).includes(needle);
};

const filterAssets = () => {
  const query = normalizeText(elements.search?.value).trim();
  const typeFilter = elements.filter?.value || "all";
  return state.assets.filter((asset) => {
    const matchType = typeFilter === "all"
      || (typeFilter === "other" && !["palette", "gradient"].includes(asset.type))
      || asset.type === typeFilter;
    if (!matchType) return false;
    const projectFilter = state.projectFilter || "";
    if (projectFilter && (asset.project || "") !== projectFilter) return false;
    return matchesAssetQuery(asset, query);
  });
};

const buildAssetSwatches = (asset, limit = 5) => {
  const stops = getStopsFromAsset(asset)
    .map((hex) => normalizeHexLoose(hex))
    .filter(Boolean)
    .slice(0, limit);
  return stops.map((hex) =>
    `<span class="tc-swatch" style="background:${hex};"></span>`
  ).join("");
};

const renderAssetMiniCard = (asset, query) => {
  const nameHtml = highlightHTML(asset?.name || "Không tên", query);
  const typeLabel = escapeHTML(asset?.type || "");
  const swatches = buildAssetSwatches(asset, 4);
  const selected = state.assetMultiSelect
    ? state.assetSelectedIds.has(asset.id)
    : state.selected && state.selected.id === asset.id;
  const selectedClass = selected ? " is-selected" : "";
  return `
    <button class="asset-mini${selectedClass}" data-asset-id="${escapeHTML(asset.id)}" type="button">
      <div class="asset-mini__meta">${typeLabel}</div>
      <div class="asset-mini__title">${nameHtml}</div>
      <div class="asset-mini__swatches">${swatches}</div>
    </button>
  `;
};

const renderPinnedStrip = (query) => {
  if (!elements.pinnedStrip || !elements.pinnedList) return;
  const items = assetPinnedIds
    .map((id) => state.assets.find((asset) => asset.id === id))
    .filter((asset) => asset && matchesAssetQuery(asset, query));
  elements.pinnedStrip.classList.toggle("hidden", items.length === 0);
  elements.pinnedList.innerHTML = items.map((asset) => renderAssetMiniCard(asset, query)).join("");
};

const renderRecentStrip = (query) => {
  if (!elements.recentStrip || !elements.recentList) return;
  const items = assetRecentIds
    .map((id) => state.assets.find((asset) => asset.id === id))
    .filter((asset) => asset && matchesAssetQuery(asset, query));
  elements.recentStrip.classList.toggle("hidden", items.length === 0);
  elements.recentList.innerHTML = items.map((asset) => renderAssetMiniCard(asset, query)).join("");
};

const updateAssetActionBar = () => {
  if (!elements.assetActionBar || !elements.assetSelectedCount) return;
  const count = state.assetSelectedIds.size;
  elements.assetSelectedCount.textContent = String(count);
  elements.assetActionBar.classList.toggle("hidden", count === 0);
};

const clearAssetSelection = () => {
  state.assetSelectedIds.clear();
  state.assetLastSelectedIndex = null;
  updateAssetActionBar();
};

const toggleAssetSelection = (assetId, card) => {
  if (!assetId) return;
  if (state.assetSelectedIds.has(assetId)) {
    state.assetSelectedIds.delete(assetId);
    card?.classList.remove("is-selected");
  } else {
    state.assetSelectedIds.add(assetId);
    card?.classList.add("is-selected");
  }
  updateAssetActionBar();
};

const selectAssetRange = (start, end) => {
  if (!state.assetRenderedIds.length) return;
  const min = Math.min(start, end);
  const max = Math.max(start, end);
  for (let i = min; i <= max; i += 1) {
    const id = state.assetRenderedIds[i];
    if (id) state.assetSelectedIds.add(id);
  }
  renderGrid();
  updateAssetActionBar();
};

const getSelectedAssets = () => {
  const idSet = state.assetSelectedIds;
  return state.assets.filter((asset) => idSet.has(asset.id));
};

const selectAssetCard = (asset) => {
  state.selected = asset || null;
  if (!asset) {
    renderPanel(state.selected);
    renderGrid();
    return;
  }
  touchRecentAsset(asset);
  renderPanel(state.selected);
  renderGrid();
  document.getElementById("assetPanel")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

  const renderGrid = () => {
    if (!elements.grid) return;
    const query = normalizeText(elements.search?.value).trim();
    const items = filterAssets();
    state.assetRenderedIds = items.map((asset) => asset.id);
    renderPinnedStrip(query);
    renderRecentStrip(query);
    if (!items.length) {
      elements.grid.innerHTML = `<div class="tc-muted text-sm">Chưa có tài sản. Hãy tạo demo.</div>`;
      updateAssetActionBar();
      return;
    }
    elements.grid.innerHTML = items.map((asset, index) => {
      const swatches = buildAssetSwatches(asset);
      const tags = (asset.tags || []).slice(0, 3).map((tag) =>
        `<span class="tc-chip px-2 py-1 rounded-full text-xs">${highlightHTML(tag, query)}</span>`
      ).join("");
      const isSelected = state.assetMultiSelect
        ? state.assetSelectedIds.has(asset.id)
        : state.selected && state.selected.id === asset.id;
      const selectedClass = isSelected ? " is-selected" : "";
      const isPinned = isAssetPinned(asset.id);
      const pinLabel = isPinned ? "Bỏ ghim" : "Ghim";
      return `
        <article class="tc-card p-4 text-left space-y-3 asset-card${selectedClass}" data-asset-id="${escapeHTML(asset.id)}" data-asset-index="${index}" role="button" tabindex="0">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] tc-muted">${escapeHTML(asset.type || "")}</p>
              <h3 class="font-semibold">${highlightHTML(asset.name || "Không tên", query)}</h3>
            </div>
            <div class="flex flex-wrap gap-1">${tags}</div>
          </div>
          <div class="flex flex-wrap gap-2">${swatches}</div>
          <div class="flex items-center justify-end asset-kebab">
            <details data-asset-menu class="asset-kebab">
              <summary data-asset-menu-toggle class="asset-kebab__btn tc-btn tc-chip px-2 py-1 text-xs cursor-pointer" aria-label="Tác vụ">⋯</summary>
              <div class="asset-kebab__panel rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
                <button class="tc-btn tc-chip w-full justify-start px-3 py-2 text-xs" data-asset-action="use" data-asset-id="${escapeHTML(asset.id)}" type="button">Dùng</button>
                <button class="tc-btn tc-chip w-full justify-start px-3 py-2 text-xs" data-asset-action="pin" data-asset-id="${escapeHTML(asset.id)}" type="button">${pinLabel}</button>
                <button class="tc-btn tc-chip w-full justify-start px-3 py-2 text-xs" data-asset-action="rename" data-asset-id="${escapeHTML(asset.id)}" type="button">Đổi tên</button>
                <button class="tc-btn tc-chip w-full justify-start px-3 py-2 text-xs" data-asset-action="delete" data-asset-id="${escapeHTML(asset.id)}" type="button">Xóa</button>
              </div>
            </details>
          </div>
        </article>
      `;
    }).join("");
    updateAssetActionBar();
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
  const asset = state.nameModalAsset;
  if (state.nameModalMode === "rename") {
    pushHistory(asset);
  }
  asset.name = name;
  asset.tags = tags;
  ensureVersion(asset);
  if (state.nameModalMode === "rename") {
    asset.version = bumpVersion(asset.version);
    asset.updatedAt = new Date().toISOString();
  }
  if (state.nameModalMode === "save") {
    asset.updatedAt = new Date().toISOString();
  }
  if (state.nameModalMode === "save") {
    state.assets.unshift(asset);
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
    elements.panelTags.textContent = "";
    (asset.tags || []).forEach((tag) => {
      const span = document.createElement("span");
      span.className = "tc-chip px-2 py-1 rounded-full text-xs";
      span.textContent = tag;
      elements.panelTags.appendChild(span);
    });
  }
  if (elements.panelSwatches) {
    elements.panelSwatches.textContent = "";
    const stops = getStopsFromAsset(asset)
      .map((hex) => normalizeHexLoose(hex))
      .filter(Boolean);
    stops.forEach((hex) => {
      const swatch = document.createElement("span");
      swatch.className = "tc-swatch";
      swatch.style.background = hex;
      elements.panelSwatches.appendChild(swatch);
    });
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
    elements.apply.textContent = canApply ? "Dùng ngay" : "Chưa hỗ trợ";
    elements.apply.classList.toggle("opacity-60", !canApply);
    elements.apply.classList.toggle("cursor-not-allowed", !canApply);
  }
  if (elements.openWorld) {
    const canOpen = Boolean(worldKey);
    elements.openWorld.disabled = !canOpen;
    elements.openWorld.classList.toggle("opacity-60", !canOpen);
    elements.openWorld.classList.toggle("cursor-not-allowed", !canOpen);
  }
  if (elements.pinToggle) {
    const pinned = isAssetPinned(asset.id);
    elements.pinToggle.textContent = pinned ? "Bỏ ghim" : "Ghim";
  }
  if (elements.historyList) {
    elements.historyList.textContent = "";
    const history = Array.isArray(asset.history) ? asset.history : [];
    if (!history.length) {
      const empty = document.createElement("div");
      empty.className = "tc-muted";
      empty.textContent = "Chưa có lịch sử phiên bản.";
      elements.historyList.appendChild(empty);
    } else {
      history.slice(0, 10).forEach((entry, index) => {
        const row = document.createElement("div");
        row.className = "flex items-center justify-between gap-2 tc-chip px-2 py-2";

        const meta = document.createElement("div");
        meta.className = "flex flex-col";
        const version = document.createElement("span");
        version.className = "font-semibold";
        version.textContent = entry.version || "—";
        const time = document.createElement("span");
        time.className = "tc-muted";
        const date = entry.savedAt ? new Date(entry.savedAt) : null;
        time.textContent = date && !Number.isNaN(date.getTime())
          ? date.toLocaleString("vi-VN")
          : "Không rõ thời gian";
        meta.appendChild(version);
        meta.appendChild(time);

        const button = document.createElement("button");
        button.type = "button";
        button.className = "tc-btn tc-chip px-2 py-1 text-xs";
        button.textContent = "Khôi phục";
        button.dataset.historyIndex = String(index);

        row.appendChild(meta);
        row.appendChild(button);
        elements.historyList.appendChild(row);
      });
    }
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
    assetPinnedIds = assetPinnedIds.filter((id) => id !== asset.id);
    assetRecentIds = assetRecentIds.filter((id) => id !== asset.id);
    state.assetSelectedIds.delete(asset.id);
    savePinnedAssets();
    saveRecentAssets();
    if (state.selected && state.selected.id === asset.id) {
      state.selected = null;
    }
    saveAssets();
    renderGrid();
    renderPanel(state.selected);
    showToast(`Đã xóa tài sản ${asset.name}.`);
  };

const openAssetInWorld = (asset, intent = "use") => {
  if (!asset) return false;
  const worldKey = resolveWorldKey(asset);
  if (!worldKey) return false;
  const payload = {
    assetId: asset.id,
    projectId: asset.project || state.handoff?.projectId || "",
    from: HANDOFF_FROM,
    intent,
    shade: state.handoff?.shade || ""
  };
  touchRecentAsset(asset);
  const label = WORLD_LABELS[worldKey] || worldKey;
  showToast(`Đang mở ở World ${label}.`);
  return openInWorld(worldKey, payload);
};

const applyAsset = (asset) => {
  if (!asset) return;
  const intent = state.handoff?.intent || "use";
  openAssetInWorld(asset, intent);
};

const buildSharePack = (asset) => {
  const payload = {
    asset,
    exportedAt: new Date().toISOString()
  };
  return `${SHARE_PREFIX}${encodeBase64(JSON.stringify(payload))}`;
};

const parseSharePack = (text) => {
  const raw = String(text || "").trim();
  if (!raw.startsWith(SHARE_PREFIX)) return null;
  const payload = raw.slice(SHARE_PREFIX.length);
  const decoded = decodeBase64(payload);
  if (!decoded) return null;
  try {
    const parsed = JSON.parse(decoded);
    if (!parsed?.asset) return null;
    return parsed;
  } catch (_err) {
    return null;
  }
};

const normalizeImportedAsset = (asset) => {
  if (!asset) return null;
  const cloned = cloneAsset(asset);
  ensureVersion(cloned);
  cloned.updatedAt = new Date().toISOString();
  return cloned;
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

const isTypingContext = (target) => {
  if (!target) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return target.isContentEditable;
};

const focusActiveSearch = () => {
  const isAssets = elements.tabAssets?.getAttribute("aria-selected") === "true";
  const input = isAssets ? elements.search : elements.hexSearch;
  if (!input) return;
  if (input.hasAttribute("readonly")) input.removeAttribute("readonly");
  input.focus();
  if (input.value) input.select();
};

const handleSearchEscape = (event) => {
  if (event.key !== "Escape") return;
  const input = event.currentTarget;
  const value = input.value || "";
  if (value) {
    input.value = "";
    if (input === elements.search) {
      renderGrid();
    } else {
      state.hexQuery = "";
      resetHexList();
      renderHexGrid();
    }
  } else {
    input.blur();
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

const buildSpectrumItems = () => {
  const items = [];
  const step = 17;
  let index = 1;
  for (let r = 0; r <= 255; r += step) {
    for (let g = 0; g <= 255; g += step) {
      for (let b = 0; b <= 255; b += step) {
        const hex = rgbToHex({ r, g, b });
        items.push({
          brand: "Phổ màu",
          code: `GEN-${String(index).padStart(4, "0")}`,
          name: "Phổ màu chuẩn",
          hex,
          rgb: { r, g, b }
        });
        index += 1;
      }
    }
  }
  for (let i = 0; i <= 255; i += 1) {
    const hex = rgbToHex({ r: i, g: i, b: i });
    items.push({
      brand: "Phổ màu",
      code: `GEN-${String(index).padStart(4, "0")}`,
      name: "Phổ màu chuẩn",
      hex,
      rgb: { r: i, g: i, b: i }
    });
    index += 1;
  }
  return items;
};

const sortHexList = (list) => {
  const items = list.slice();
  if (state.hexSort === "hex") {
    return items.sort((a, b) => a.hex.localeCompare(b.hex));
  }
  if (state.hexSort === "color_dark_light") {
    const groupIndex = (entry) => {
      const hsl = ensureEntryMetrics(entry)?.hsl || [0, 0, 0];
      const hue = hsl[0];
      const sat = hsl[1];
      if (sat < 0.12) return 8;
      if (hue < 20 || hue >= 345) return 0;
      if (hue < 45) return 1;
      if (hue < 70) return 2;
      if (hue < 170) return 3;
      if (hue < 200) return 4;
      if (hue < 250) return 5;
      if (hue < 295) return 6;
      return 7;
    };
    return items.sort((a, b) => {
      const ahsl = ensureEntryMetrics(a)?.hsl || [0, 0, 0];
      const bhsl = ensureEntryMetrics(b)?.hsl || [0, 0, 0];
      const ag = groupIndex(a);
      const bg = groupIndex(b);
      if (ag !== bg) return ag - bg;
      if (ahsl[0] !== bhsl[0]) return ahsl[0] - bhsl[0];
      if (ahsl[2] !== bhsl[2]) return ahsl[2] - bhsl[2];
      return a.hex.localeCompare(b.hex);
    });
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
  state.hexRenderedList = pageItems.map((entry) => entry.hex);
  elements.hexGrid.dataset.view = state.hexView;
  elements.hexGrid.classList.toggle("is-tiles", state.hexView === "tiles");
  elements.hexGrid.classList.toggle("is-compact", state.hexView === "compact");
  elements.hexGrid.classList.toggle("is-card", state.hexView === "card");
  if (!pageItems.length) {
    elements.hexGrid.innerHTML = `<div class="tc-muted text-sm">Không tìm thấy màu phù hợp.</div>`;
  } else {
    const cardHtml = pageItems.map((entry) => {
      const refsPreview = entry.refs.slice(0, 2).map((ref) => `${ref.brand} ${ref.code}`.trim()).join(" · ");
      const refsSuffix = entry.refs.length > 2 ? ` +${entry.refs.length - 2}` : "";
      const actionMenu = `
        <button class="hex-tile__menu-btn" data-hex-menu="true" data-hex="${entry.hex}" data-hex-ignore="true" type="button" aria-label="Mở menu">...</button>
      `;
      if (state.hexView === "tiles") {
        const active = ensureEntryMetrics(entry);
        const textColor = active?.rgb ? getContrastTextColor(active.rgb) : "#ffffff";
        const selected = state.hexSelected.has(entry.hex) ? " is-selected" : "";
        return `
          <div class="hex-tile${selected}" data-hex-card="${entry.hex}">
            <span class="hex-tile__swatch" style="background:${entry.hex};"></span>
            ${actionMenu}
            <span class="hex-tile__label" style="color:${textColor};">${entry.hex}</span>
          </div>
        `;
      }
      if (state.hexView === "compact") {
        return `
          <div class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2" data-hex-card="${entry.hex}">
            <span class="tc-hex-swatch" style="background:${entry.hex};"></span>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-semibold">${entry.hex}</div>
              <div class="text-[10px] tc-muted">${entry.refs.length} mã</div>
            </div>
            <div class="flex items-center gap-1" data-hex-ignore="true">
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
    const baseCount = state.hexBaseCount || 0;
    const spectrumCount = state.hexSpectrumCount || 0;
    elements.hexStats.textContent = `Tổng ${sorted.length} màu · ${baseCount} màu có mã · ${spectrumCount} màu phổ màu`;
  }
  updateHexSelectionUI();
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
  showHexMenuTip();
};
const loadHexLibrary = async () => {
  if (state.hexLoaded) return;
  state.hexLoaded = true;
  if (elements.hexStats) elements.hexStats.textContent = "Đang nạp dữ liệu...";
  try {
    const response = await fetch("../threads.json", { cache: "no-store" });
    const data = await response.json();
    const threadItems = Array.isArray(data) ? data : [];
    const baseMap = new Map();
    threadItems.forEach((item) => {
      const hex = sanitizeHex(item.hex);
      if (!hex) return;
      baseMap.set(hex, true);
    });
    const spectrumItems = buildSpectrumItems();
    let spectrumCount = 0;
    spectrumItems.forEach((item) => {
      const hex = sanitizeHex(item.hex);
      if (!hex) return;
      if (!baseMap.has(hex)) spectrumCount += 1;
    });
    state.hexBaseCount = baseMap.size;
    state.hexSpectrumCount = spectrumCount;
    state.hexEntries = buildHexIndex([...threadItems, ...spectrumItems]);
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
  elements.search?.addEventListener("keydown", handleSearchEscape);
  elements.filter?.addEventListener("change", renderGrid);
  elements.projectFilter?.addEventListener("change", () => {
    state.projectFilter = elements.projectFilter.value === "__all__" ? "" : elements.projectFilter.value;
    renderGrid();
  });
  elements.assetMultiSelect?.addEventListener("change", () => {
    state.assetMultiSelect = elements.assetMultiSelect.checked;
    if (!state.assetMultiSelect) {
      clearAssetSelection();
      renderGrid();
      return;
    }
    updateAssetActionBar();
  });
  elements.createDemo?.addEventListener("click", () => {
    const asset = createDemoAsset();
    state.assets.unshift(asset);
    saveAssets();
    renderGrid();
  });
  elements.tabAssets?.addEventListener("click", () => setActiveTab("assets"));
  elements.tabHex?.addEventListener("click", () => setActiveTab("hex"));
  document.addEventListener("keydown", (event) => {
    if (event.key !== "/") return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (isTypingContext(event.target)) return;
    event.preventDefault();
    focusActiveSearch();
  });
  const onHexSearch = debounce(() => {
    state.hexQuery = elements.hexSearch?.value || "";
    resetHexList();
    renderHexGrid();
  }, 300);
  elements.hexSearch?.addEventListener("input", onHexSearch);
  elements.hexSearch?.addEventListener("keydown", handleSearchEscape);
  elements.hexSearch?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const hex = sanitizeHex(elements.hexSearch?.value || "");
    if (!hex) return;
    event.preventDefault();
    jumpToHex(hex);
  });
  elements.hexMultiSelect?.addEventListener("change", () => {
    state.hexMultiSelect = elements.hexMultiSelect.checked;
    if (!state.hexMultiSelect) {
      state.hexSelected.clear();
      state.hexLastSelectedIndex = null;
      renderHexGrid();
      return;
    }
    updateHexSelectionUI();
  });
  elements.hexCopySelected?.addEventListener("click", () => {
    const list = getSelectedHexList();
    if (!list.length) return;
    copyHexList(list).then((ok) => {
      if (ok) showToast(`Đã sao chép ${list.length} mã HEX.`);
    });
  });
  elements.hexSaveSelected?.addEventListener("click", async () => {
    const list = getSelectedHexList();
    if (!list.length) return;
    const saved = await saveHexBatch(list);
    showToast(`Đã lưu ${saved} màu.`);
  });
  elements.hexCreatePalette?.addEventListener("click", () => {
    const list = getSelectedHexList();
    if (!list.length) return;
    window.location.href = `../worlds/palette.html#p=${list.join(",")}`;
  });
  elements.hexCreateGradient?.addEventListener("click", () => {
    const list = getSelectedHexList();
    if (list.length < 2) return;
    const trimmed = list.slice(0, 7);
    if (list.length > 7) {
      showToast("Gradient tối đa 7 màu, đã lấy 7 màu đầu.");
    }
    window.location.href = `../worlds/gradient.html#g=${trimmed.join(",")}`;
  });
  elements.hexOpenThread?.addEventListener("click", () => {
    const list = getSelectedHexList();
    if (!list.length) return;
    copyHexList(list);
    window.location.href = `../worlds/threadcolor.html?color=${list[0]}`;
  });
  elements.hexOpenPrint?.addEventListener("click", () => {
    const list = getSelectedHexList();
    if (!list.length) return;
    copyHexList(list);
    window.location.href = `../worlds/printcolor.html#c=${list[0]}`;
  });
  elements.hexClearSelected?.addEventListener("click", () => {
    state.hexSelected.clear();
    renderHexGrid();
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
      handleHexAction(btn.dataset.hexAction, btn.dataset.hex);
      closeHexMenu();
      return;
    }
    const menuBtn = event.target.closest("[data-hex-menu=\"true\"]");
    if (menuBtn) {
      const hex = menuBtn.dataset.hex;
      const entry = state.hexEntryMap.get(hex) || state.hexEntries.find((item) => item.hex === hex);
      openHexMenu(menuBtn, entry);
      return;
    }
    if (event.target.closest("[data-hex-ignore]")) return;
    const card = event.target.closest("[data-hex-card]");
    if (!card) return;
    const hex = card.dataset.hexCard;
    if (!hex) return;
    if (state.hexMultiSelect) {
      const index = state.hexRenderedList.indexOf(hex);
      if (event.shiftKey && state.hexLastSelectedIndex != null && index !== -1) {
        selectHexRange(state.hexLastSelectedIndex, index);
      } else {
        toggleHexSelection(hex, card);
      }
      if (index !== -1) state.hexLastSelectedIndex = index;
      return;
    }
    const targetCard = card;
    copyText(hex).then(() => {
      showToast(`Đã sao chép ${hex}.`);
      setHexStatus(`Đã sao chép ${hex}.`);
      targetCard.classList.add("is-copied");
      window.setTimeout(() => targetCard.classList.remove("is-copied"), 300);
    });
  });
  elements.hexMenuList?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-hex-action]");
    if (!btn) return;
    handleHexAction(btn.dataset.hexAction, btn.dataset.hex);
    closeHexMenu();
  });
  let hexLongPressTimer = null;
  const clearHexLongPress = () => {
    if (!hexLongPressTimer) return;
    window.clearTimeout(hexLongPressTimer);
    hexLongPressTimer = null;
  };
  elements.hexGrid?.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch") return;
    const card = event.target.closest("[data-hex-card]");
    if (!card) return;
    clearHexLongPress();
    hexLongPressTimer = window.setTimeout(() => {
      if (!state.hexMultiSelect) {
        state.hexMultiSelect = true;
        if (elements.hexMultiSelect) elements.hexMultiSelect.checked = true;
      }
      const hex = card.dataset.hexCard;
      if (hex) toggleHexSelection(hex, card);
    }, 350);
  });
  elements.hexGrid?.addEventListener("pointerup", clearHexLongPress);
  elements.hexGrid?.addEventListener("pointerleave", clearHexLongPress);
  elements.hexGrid?.addEventListener("pointercancel", clearHexLongPress);
  document.addEventListener("click", (event) => {
    if (!elements.hexMenuPopover || elements.hexMenuPopover.hasAttribute("hidden")) return;
    if (event.target.closest("#hexMenuPopover")) return;
    if (event.target.closest("[data-hex-menu=\"true\"]")) return;
    closeHexMenu();
  }, true);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeHexMenu();
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
  const handleStripClick = (event) => {
    const card = event.target.closest("[data-asset-id]");
    if (!card) return;
    const assetId = card.dataset.assetId;
    const asset = state.assets.find((item) => item.id === assetId);
    if (!asset) return;
    if (state.assetMultiSelect) {
      toggleAssetSelection(asset.id, card);
      renderGrid();
      return;
    }
    selectAssetCard(asset);
  };
  elements.pinnedList?.addEventListener("click", handleStripClick);
  elements.recentList?.addEventListener("click", handleStripClick);
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
      if (action === "pin") {
        if (isAssetPinned(asset.id)) unpinAsset(asset.id);
        else pinAsset(asset.id);
        renderGrid();
        renderPanel(state.selected);
      }
      if (action === "rename") openNameModal(asset, "rename");
      if (action === "delete") deleteAsset(asset);
      const details = actionBtn.closest("details");
      if (details) details.open = false;
      return;
    }
    if (event.target.closest("[data-asset-menu]")) return;
    const card = event.target.closest("[data-asset-id]");
    if (!card) return;
    const assetId = card.dataset.assetId;
    const asset = state.assets.find((item) => item.id === assetId);
    if (!asset) return;
    if (state.assetMultiSelect) {
      const index = Number(card.dataset.assetIndex || -1);
      if (event.shiftKey && state.assetLastSelectedIndex != null && index >= 0) {
        selectAssetRange(state.assetLastSelectedIndex, index);
      } else {
        toggleAssetSelection(asset.id, card);
      }
      if (index >= 0) state.assetLastSelectedIndex = index;
      return;
    }
    selectAssetCard(asset);
  });
  elements.grid?.addEventListener("keydown", (event) => {
    if (isTypingContext(event.target)) return;
    const card = event.target.closest(".asset-card");
    if (!card) return;
    if (event.key === "Escape") {
      const openMenu = card.querySelector("details[open]");
      if (openMenu) {
        openMenu.open = false;
        event.preventDefault();
      }
      return;
    }
    if (event.key !== "Enter" && event.key !== " ") return;
    if (event.target.closest("button, summary, a, input, textarea, select")) return;
    event.preventDefault();
    const assetId = card.dataset.assetId;
    const asset = state.assets.find((item) => item.id === assetId);
    if (!asset) return;
    if (state.assetMultiSelect) {
      toggleAssetSelection(asset.id, card);
      return;
    }
    selectAssetCard(asset);
  });
  elements.apply?.addEventListener("click", () => applyAsset(state.selected));
  elements.openWorld?.addEventListener("click", () => {
    if (!state.selected) return;
    openAssetInWorld(state.selected, "open");
  });
  elements.pinToggle?.addEventListener("click", () => {
    if (!state.selected) return;
    if (isAssetPinned(state.selected.id)) {
      unpinAsset(state.selected.id);
      showToast("Đã bỏ ghim.");
    } else {
      pinAsset(state.selected.id);
      showToast("Đã ghim.");
    }
    renderGrid();
    renderPanel(state.selected);
  });
  elements.assetBulkPin?.addEventListener("click", () => {
    const selected = Array.from(state.assetSelectedIds);
    if (!selected.length) return;
    assetPinnedIds = [...selected, ...assetPinnedIds.filter((id) => !state.assetSelectedIds.has(id))];
    savePinnedAssets();
    renderGrid();
    showToast(`Đã ghim ${selected.length} tài sản.`);
  });
  elements.assetBulkUnpin?.addEventListener("click", () => {
    const selected = Array.from(state.assetSelectedIds);
    if (!selected.length) return;
    assetPinnedIds = assetPinnedIds.filter((id) => !state.assetSelectedIds.has(id));
    savePinnedAssets();
    renderGrid();
    showToast(`Đã bỏ ghim ${selected.length} tài sản.`);
  });
  elements.assetBulkExport?.addEventListener("click", () => {
    const selectedAssets = getSelectedAssets();
    if (!selectedAssets.length) return;
    copyText(JSON.stringify(selectedAssets, null, 2)).then(() => {
      showToast(`Đã sao chép ${selectedAssets.length} tài sản.`);
    });
  });
  elements.assetBulkDelete?.addEventListener("click", () => {
    const selectedAssets = getSelectedAssets();
    if (!selectedAssets.length) return;
    if (!window.confirm(`Xóa ${selectedAssets.length} tài sản đã chọn?`)) return;
    const selectedIds = new Set(state.assetSelectedIds);
    state.assets = state.assets.filter((asset) => !selectedIds.has(asset.id));
    assetPinnedIds = assetPinnedIds.filter((id) => !selectedIds.has(id));
    assetRecentIds = assetRecentIds.filter((id) => !selectedIds.has(id));
    if (state.selected && selectedIds.has(state.selected.id)) state.selected = null;
    clearAssetSelection();
    saveAssets();
    savePinnedAssets();
    saveRecentAssets();
    renderGrid();
      renderPanel(state.selected);
      showToast(`Đã xóa ${selectedAssets.length} tài sản.`);
    });
  elements.syncExport?.addEventListener("click", () => {
    downloadPack();
    showToast("Đã xuất gói Thư viện.");
  });
  elements.syncImport?.addEventListener("click", async () => {
    const file = elements.syncFile?.files?.[0];
    if (!file) {
      showToast("Vui lòng chọn gói Thư viện để nhập.");
      return;
    }
    try {
      const text = await file.text();
      const pack = JSON.parse(text);
      const mode = elements.syncMode?.value === "overwrite" ? "overwrite" : "merge";
      const ok = importLibraryPack(pack, mode);
      if (ok) {
        showToast("Đã nhập gói Thư viện.");
      } else {
        showToast("Gói không hợp lệ hoặc không hỗ trợ.");
      }
    } catch (_err) {
      showToast("Không thể đọc gói Thư viện.");
    }
  });
  elements.shareImportOpen?.addEventListener("click", () => {
    if (elements.shareInput) elements.shareInput.value = "";
    setShareModalOpen(true);
  });
  elements.shareClose?.addEventListener("click", () => setShareModalOpen(false));
  elements.shareCancel?.addEventListener("click", () => setShareModalOpen(false));
  elements.shareModal?.addEventListener("click", (event) => {
    if (event.target === elements.shareModal) setShareModalOpen(false);
  });
  elements.shareImport?.addEventListener("click", () => {
    const text = elements.shareInput?.value || "";
    const parsed = parseSharePack(text);
    if (!parsed || !parsed.asset) {
      showToast("Gói chia sẻ không hợp lệ.");
      return;
    }
    const incoming = normalizeImportedAsset(parsed.asset);
    if (!incoming?.id || !incoming?.type || !incoming?.name) {
      showToast("Thiếu thông tin tài sản trong gói.");
      return;
    }
    const exists = state.assets.find((item) => item.id === incoming.id);
    if (exists) {
      const ok = window.confirm("Tài sản đã tồn tại. Ghi đè không?");
      if (!ok) {
        incoming.id = `${incoming.id}_copy_${Date.now()}`;
      } else {
        const idx = state.assets.findIndex((item) => item.id === incoming.id);
        if (idx !== -1) state.assets[idx] = incoming;
      }
    } else {
      state.assets.unshift(incoming);
    }
    saveAssets();
    renderGrid();
    renderPanel(state.selected);
    setShareModalOpen(false);
    if (elements.shareInput) elements.shareInput.value = "";
    showToast("Đã nhập gói chia sẻ.");
  });
  elements.sharePack?.addEventListener("click", () => {
    if (!state.selected) return;
    const packText = buildSharePack(state.selected);
    copyText(packText).then(() => {
      showToast("Đã sao chép gói chia sẻ.");
    });
  });
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
  elements.historyList?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-history-index]");
    if (!btn) return;
    const index = Number(btn.dataset.historyIndex || -1);
    if (Number.isNaN(index) || index < 0) return;
    const asset = state.selected;
    if (!asset || !Array.isArray(asset.history) || !asset.history[index]) return;
    if (!window.confirm("Khôi phục phiên bản này?")) return;
    restoreAssetVersion(asset, asset.history[index]);
    saveAssets();
    renderPanel(state.selected);
    renderGrid();
    showToast("Đã khôi phục phiên bản.");
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
loadPinnedAssets();
loadRecentAssets();
syncPinnedRecent();
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

