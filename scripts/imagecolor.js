import { createSpec } from "./spec.js";
import { composeHandoff } from "./handoff.js";
import { resolveIncoming } from "./workbench_context.js";
import { uploadImage, delete as deleteImage } from "./storage/storage_client.js";

const ASSET_STORAGE_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const FEED_STORAGE_KEY = "tc_community_feed";
const HANDOFF_FROM = "imagecolor";
const TOUR_SEEN_KEY = "tc_w7_tour_seen_v1";
const TOUR_NEVER_KEY = "tc_w7_tour_never_v1";
const LOCK_LIMIT = 4;
const KEEP_LIMIT = 6;
const incomingHandoff = resolveIncoming({ search: window.location.search, hash: window.location.hash });

const t = (key, fallback = "", params) => {
  const fullKey = `imagecolor.${key}`;
  return window.tcI18n?.t?.(fullKey, fallback, params) || fallback;
};

const elements = {
  input: document.getElementById("imgInput"),
  dropzone: document.getElementById("dropzone"),
  btnChooseFile: document.getElementById("btnChooseFile"),
  preview: document.getElementById("imagePreview"),
  canvas: document.getElementById("sampleCanvas"),
  swatchGrid: document.getElementById("swatchGrid"),
  paletteSize: document.getElementById("paletteSize"),
  btnSample: document.getElementById("btnSample"),
  btnToPalette: document.getElementById("btnToPalette"),
  btnToGradient: document.getElementById("btnToGradient"),
  btnToPrint: document.getElementById("btnToPrint"),
  btnSave: document.getElementById("btnSaveLibrary"),
  btnUseLibrary: document.getElementById("btnUseLibrary"),
  btnShare: document.getElementById("btnShare"),
  btnCopyCss: document.getElementById("btnCopyCss"),
  btnCopyJson: document.getElementById("btnCopyJson"),
  btnSharePalette: document.getElementById("btnSharePalette"),
  btnShareGradient: document.getElementById("btnShareGradient"),
  btnOpenTour: document.getElementById("btnOpenTour"),
  btnRegion: document.getElementById("btnRegion"),
  btnRegionClear: document.getElementById("btnRegionClear"),
  regionStatus: document.getElementById("regionStatus"),
  toast: document.getElementById("toast"),
  status: document.getElementById("statusText"),
  previewCanvas: document.getElementById("imagePreviewCanvas"),
  previewPlaceholder: document.getElementById("imagePreviewPlaceholder"),
  loupe: document.getElementById("loupe"),
  loupeCanvas: document.getElementById("loupeCanvas"),
  loupeLabel: document.getElementById("loupeLabel"),
  regionBox: document.getElementById("regionBox"),
  mockupUi: document.getElementById("mockupUi"),
  mockupPoster: document.getElementById("mockupPoster"),
  mockupFabric: document.getElementById("mockupFabric"),
  mockupUiNote: document.getElementById("mockupUiNote"),
  mockupPosterNote: document.getElementById("mockupPosterNote"),
  mockupFabricNote: document.getElementById("mockupFabricNote"),
  decisionPanel: document.getElementById("paletteDecisionPanel"),
  decisionSummary: document.getElementById("decisionSummary"),
  decisionRoleGrid: document.getElementById("decisionRoleGrid"),
  dominantStrip: document.getElementById("dominantStrip"),
  nextActionHint: document.getElementById("nextActionHint"),
  handoffHint: document.getElementById("handoffHint"),
  strategyCompareGrid: document.getElementById("strategyCompareGrid"),
  strategyComparePanel: document.getElementById("strategyComparePanel"),
  replacePanel: document.getElementById("replacePanel"),
  replaceSourceHex: document.getElementById("replaceSourceHex"),
  replaceCandidateList: document.getElementById("replaceCandidateList"),
  replaceCandidatesEmpty: document.getElementById("replaceCandidatesEmpty"),
  replaceHexInput: document.getElementById("replaceHexInput"),
  btnReplaceApply: document.getElementById("btnReplaceApply"),
  btnReplaceCancel: document.getElementById("btnReplaceCancel"),
  nextStepList: document.getElementById("nextStepList"),
  legendDominantSwatch: document.getElementById("legendDominantSwatch"),
  legendDominantText: document.getElementById("legendDominantText"),
  legendAccentSwatch: document.getElementById("legendAccentSwatch"),
  legendAccentText: document.getElementById("legendAccentText"),
  legendNeutralSwatch: document.getElementById("legendNeutralSwatch"),
  legendNeutralText: document.getElementById("legendNeutralText")
};

const state = {
  image: null,
  imageName: "",
  palette: [],
  lockedHexes: new Set(),
  keptHexes: new Set(),
  dominantShare: {},
  strategyVariants: [],
  activeStrategyId: "balanced",
  imageCandidates: [],
  replaceTargetHex: "",
  samplePixels: [],
  pickCanvas: null,
  pickCtx: null,
  previewCtx: null,
  loupeCtx: null,
  loupeHex: "",
  loupePoint: null,
  loupeRaf: null,
  region: null,
  regionActive: false,
  regionDrag: null,
  worker: null,
  workerReady: false,
  sampleToken: 0,
  selectedHex: ""
};

let imageLoadSeq = 0;

const setStatus = (message) => {
  if (!elements.status) return;
  elements.status.textContent = message || "";
};

const setActionButtonsEnabled = (enabled) => {
  const buttons = [
    elements.btnToPalette,
    elements.btnToGradient,
    elements.btnToPrint,
    elements.btnSave,
    elements.btnShare,
    elements.btnCopyCss,
    elements.btnCopyJson,
    elements.btnSharePalette,
    elements.btnShareGradient
  ];
  buttons.forEach((btn) => {
    if (!btn) return;
    btn.disabled = !enabled;
    btn.classList.toggle("is-disabled", !enabled);
  });
};

const showToast = (message, options = {}) => {
  if (!elements.toast) return;
  const { onClick, duration = 1600 } = options;
  elements.toast.textContent = "";
  elements.toast.onclick = null;
  elements.toast.classList.remove("is-action");
  elements.toast.removeAttribute("role");
  window.clearTimeout(showToast._t);
  const raf = window.requestAnimationFrame || ((fn) => setTimeout(fn, 0));
  raf(() => {
    elements.toast.textContent = message;
    if (typeof onClick === "function") {
      elements.toast.classList.add("is-action");
      elements.toast.setAttribute("role", "button");
      elements.toast.onclick = () => {
        elements.toast.classList.remove("is-visible");
        onClick();
      };
    }
    elements.toast.classList.add("is-visible");
    showToast._t = window.setTimeout(() => {
      elements.toast.classList.remove("is-visible");
    }, duration);
  });
};

const copyText = async (text) => {
  if (!text) return false;
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  const temp = document.createElement("textarea");
  temp.value = text;
  temp.style.position = "fixed";
  temp.style.opacity = "0";
  document.body.appendChild(temp);
  temp.focus();
  temp.select();
  const ok = document.execCommand("copy");
  temp.remove();
  return ok;
};

const setRegionStatus = (message) => {
  if (!elements.regionStatus) return;
  elements.regionStatus.textContent = message || "";
};

const setRegionActive = (active) => {
  state.regionActive = Boolean(active);
  if (elements.btnRegion) {
    elements.btnRegion.classList.toggle("is-active", state.regionActive);
  }
  if (state.regionActive) {
    setRegionStatus(t("regionStatus.draw", "Kéo để khoanh vùng cần lấy mẫu."));
  } else if (state.region) {
    setRegionStatus(t("regionStatus.applied", "Đang lấy mẫu trong vùng đã chọn."));
  } else {
    setRegionStatus(t("regionStatus.empty", "Chưa chọn vùng."));
  }
};

const clearRegion = () => {
  state.region = null;
  state.regionDrag = null;
  if (elements.regionBox) elements.regionBox.classList.remove("is-visible");
  setRegionActive(false);
};

const updateRegionBox = () => {
  if (!elements.regionBox || !elements.previewCanvas || !state.region) return;
  const rect = elements.previewCanvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const scaleX = rect.width / elements.previewCanvas.width;
  const scaleY = rect.height / elements.previewCanvas.height;
  const left = rect.left + state.region.x * scaleX;
  const top = rect.top + state.region.y * scaleY;
  const width = state.region.w * scaleX;
  const height = state.region.h * scaleY;
  elements.regionBox.classList.add("is-visible");
  const parentRect = elements.previewCanvas.parentElement?.getBoundingClientRect() || rect;
  elements.regionBox.style.left = `${left - parentRect.left}px`;
  elements.regionBox.style.top = `${top - parentRect.top}px`;
  elements.regionBox.style.width = `${width}px`;
  elements.regionBox.style.height = `${height}px`;
};

const updateRegionFromDrag = (point) => {
  if (!state.regionDrag || !point || !state.pickCanvas) return;
  const canvas = state.pickCanvas;
  const startX = Math.max(0, Math.min(canvas.width, state.regionDrag.startX));
  const startY = Math.max(0, Math.min(canvas.height, state.regionDrag.startY));
  const endX = Math.max(0, Math.min(canvas.width, point.x));
  const endY = Math.max(0, Math.min(canvas.height, point.y));
  const x = Math.min(startX, endX);
  const y = Math.min(startY, endY);
  const w = Math.max(0, Math.abs(endX - startX));
  const h = Math.max(0, Math.abs(endY - startY));
  state.region = { x, y, w, h };
  updateRegionBox();
};

const startRegionSelection = (event) => {
  if (!state.regionActive || !state.image) return;
  event.preventDefault();
  const point = getCanvasPoint(event);
  if (!point) return;
  state.regionDrag = { startX: point.x, startY: point.y };
  if (elements.loupe) elements.loupe.classList.remove("is-visible");
  updateRegionFromDrag(point);
};

const moveRegionSelection = (event) => {
  if (!state.regionDrag) return false;
  const point = getCanvasPoint(event);
  if (!point) return true;
  updateRegionFromDrag(point);
  return true;
};

const endRegionSelection = () => {
  if (!state.regionDrag) return;
  state.regionDrag = null;
  if (!state.region || state.region.w < 8 || state.region.h < 8) {
    clearRegion();
    return;
  }
  setRegionActive(false);
  setRegionStatus(t("regionStatus.size", "Đang lấy mẫu trong vùng {width}×{height}px.", {
    width: Math.round(state.region.w),
    height: Math.round(state.region.h)
  }));
  if (state.image) sampleImage();
};

const getCurrentProject = () => {
  try {
    return localStorage.getItem(PROJECT_STORAGE_KEY) || "";
  } catch (_err) {
    return "";
  }
};

const isLoggedIn = () => {
  const auth = window.tcAuth || null;
  if (typeof auth?.isLoggedIn === "function") return auth.isLoggedIn();
  return false;
};

const publishToFeed = (asset) => {
  if (!asset) return false;
  if (!isLoggedIn()) {
    showToast(t("toasts.needLoginShare", "Cần đăng nhập để chia sẻ."));
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
    showToast(t("toasts.sharedToCommunity", "Đã đăng lên Cộng đồng. Bấm để xem."), {
      onClick: () => {
        window.location.href = "../spaces/community.html#feed";
      }
    });
    return true;
  } catch (_err) {
    showToast(t("toasts.shareFailed", "Không thể chia sẻ."));
    return false;
  }
};

const normalizeHex = (hex) => {
  if (!hex) return null;
  let value = hex.trim().toUpperCase();
  if (!value.startsWith("#")) value = `#${value}`;
  if (!/^#[0-9A-F]{6}$/.test(value)) return null;
  return value;
};

const rgbToHex = (r, g, b) => {
  const toHex = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

const hexToRgb = (hex) => {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return { r, g, b };
};

const adjustRgb = (hex, amount) => {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(r + amount, g + amount, b + amount);
};

const rgbToHsl = (r, g, b) => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rn:
        h = ((gn - bn) / delta) % 6;
        break;
      case gn:
        h = (bn - rn) / delta + 2;
        break;
      default:
        h = (rn - gn) / delta + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: s * 100, l: l * 100 };
};

const getHexProfile = (hex) => {
  const normalized = normalizeHex(hex);
  if (!normalized) return { s: 0, l: 0, h: 0 };
  const { r, g, b } = hexToRgb(normalized);
  return rgbToHsl(r, g, b);
};

const colorDistance = (hexA, hexB) => {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
};

const relativeLuminance = (hex) => {
  const { r, g, b } = hexToRgb(hex);
  const toLinear = (v) => {
    const n = v / 255;
    return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  };
  const rl = toLinear(r);
  const gl = toLinear(g);
  const bl = toLinear(b);
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
};

const contrastRatio = (hexA, hexB) => {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  const [maxL, minL] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return Number(((maxL + 0.05) / (minL + 0.05)).toFixed(2));
};

const buildColorBins = (pixels, step = 22) => {
  const bins = new Map();
  if (!Array.isArray(pixels) || !pixels.length) return [];
  pixels.forEach(([r, g, b]) => {
    const qr = Math.round(r / step) * step;
    const qg = Math.round(g / step) * step;
    const qb = Math.round(b / step) * step;
    const key = `${qr}_${qg}_${qb}`;
    const item = bins.get(key) || { r: 0, g: 0, b: 0, count: 0 };
    item.r += r;
    item.g += g;
    item.b += b;
    item.count += 1;
    bins.set(key, item);
  });
  return Array.from(bins.values())
    .map((item) => {
      const r = item.r / item.count;
      const g = item.g / item.count;
      const b = item.b / item.count;
      const hex = rgbToHex(r, g, b);
      return {
        hex,
        count: item.count,
        ...getHexProfile(hex),
        luminance: relativeLuminance(hex)
      };
    })
    .sort((a, b) => b.count - a.count);
};

const pickDistinctHexes = (candidates, desired, minDistance = 28) => {
  const output = [];
  (candidates || []).forEach((item) => {
    if (output.length >= desired) return;
    const hex = typeof item === "string" ? item : item?.hex;
    if (!hex || output.includes(hex)) return;
    if (!output.length || output.every((seed) => colorDistance(seed, hex) >= minDistance)) {
      output.push(hex);
    }
  });
  return output;
};

const buildImageCandidates = (pixels, { limit = 18 } = {}) => {
  const bins = buildColorBins(pixels);
  const shortlisted = pickDistinctHexes(bins, limit, 24);
  return shortlisted.map(normalizeHex).filter(Boolean);
};

const getDecisionModel = () => {
  if (!state.palette.length) return null;
  const shares = state.dominantShare || {};
  const byShare = state.palette.slice().sort((a, b) => (shares[b] || 0) - (shares[a] || 0));
  const dominant = byShare[0] || state.palette[0];
  const accent = state.palette
    .slice()
    .sort((a, b) => getHexProfile(b).s - getHexProfile(a).s)[0] || dominant;
  const neutralCandidates = state.palette
    .slice()
    .sort((a, b) => {
      const pa = getHexProfile(a);
      const pb = getHexProfile(b);
      const scoreA = Math.abs(pa.l - 55) + pa.s * 0.75;
      const scoreB = Math.abs(pb.l - 55) + pb.s * 0.75;
      return scoreA - scoreB;
    });
  const neutral = neutralCandidates[0] || dominant;
  const selected = normalizeHex(state.selectedHex) || dominant;
  const dominantProfile = getHexProfile(dominant);
  const accentProfile = getHexProfile(accent);
  const dominantShare = shares[dominant] ?? "--";
  let summary = t(
    "decision.summaryOnly",
    "Màu chủ đạo {dominant} đang chiếm ưu thế {share}% trong ảnh.",
    { dominant, share: dominantShare }
  );
  if (accent !== dominant) {
    summary = t(
      "decision.summaryWithAccent",
      "Màu chủ đạo {dominant} đang chiếm ưu thế {share}% trong ảnh. Màu nhấn {accent} phù hợp để tạo điểm tập trung.",
      { dominant, share: dominantShare, accent }
    );
  }
  let nextAction = t(
    "decision.next.default",
    "Tiếp theo: chuyển sang Bảng phối màu để tinh chỉnh vai màu rồi lưu vào Thư viện."
  );
  if (dominantProfile.l < 36) {
    nextAction = t(
      "decision.next.dark",
      "Nền ảnh nghiêng tối: ưu tiên mở In lưới để kiểm tra lớp lót trắng trước khi in."
    );
  } else if (accentProfile.s > 62) {
    nextAction = t(
      "decision.next.vivid",
      "Màu nhấn bão hoà cao: chuyển sang Dải chuyển màu hoặc mở Màu thêu để tra chỉ tương ứng."
    );
  } else if (dominantProfile.l > 70) {
    nextAction = t(
      "decision.next.light",
      "Nền sáng/trung tính: phù hợp thêu logo; mở Màu thêu để kiểm tra độ nổi chỉ."
    );
  }
  const handoff = t(
    "decision.handoff",
    "Luồng chuyển tiếp gợi ý: {first} → {second} → Thư viện.",
    {
      first: dominantProfile.l < 36
        ? t("links.print", "Mở ở In lưới")
        : t("links.palette", "Tạo Bảng phối"),
      second: accentProfile.s > 62
        ? t("links.gradient", "Tạo Dải chuyển")
        : t("links.thread", "Mở ở Màu thêu")
    }
  );
  return {
    dominant,
    accent,
    neutral,
    selected,
    summary,
    nextAction,
    handoff,
    byShare
  };
};

const buildSeedPalette = (baseHex, count) => {
  const steps = [-40, -20, 0, 20, 40, 60, -60];
  const list = [];
  steps.forEach((step) => {
    if (list.length >= count) return;
    list.push(adjustRgb(baseHex, step));
  });
  while (list.length < count) list.push(baseHex);
  return list.map(normalizeHex).filter(Boolean);
};

const getLockedList = () => Array.from(state.lockedHexes || []);
const getKeptList = () => Array.from(state.keptHexes || []);

const toggleLockHex = (hex, force) => {
  if (!hex) return false;
  const isLocked = state.lockedHexes.has(hex);
  const next = force === true ? true : force === false ? false : !isLocked;
  if (next) {
    if (state.lockedHexes.size >= LOCK_LIMIT && !isLocked) {
      showToast(t("toasts.lockLimit", "Chỉ khóa tối đa {count} màu.", { count: LOCK_LIMIT }));
      return false;
    }
    state.lockedHexes.add(hex);
    state.keptHexes.delete(hex);
  } else {
    state.lockedHexes.delete(hex);
  }
  return true;
};

const toggleKeepHex = (hex, force) => {
  if (!hex) return false;
  if (state.lockedHexes.has(hex) && force !== false) return true;
  const isKept = state.keptHexes.has(hex);
  const next = force === true ? true : force === false ? false : !isKept;
  if (next) {
    if (state.keptHexes.size >= KEEP_LIMIT && !isKept) {
      showToast(t("toasts.keepLimit", "Chỉ giữ ưu tiên tối đa {count} màu.", { count: KEEP_LIMIT }));
      return false;
    }
    state.keptHexes.add(hex);
  } else {
    state.keptHexes.delete(hex);
  }
  return true;
};

const applyPreferencesToPalette = (palette, count, options = {}) => {
  const skipHexes = new Set((options.skipHexes || []).map((hex) => normalizeHex(hex)).filter(Boolean));
  const locked = getLockedList();
  const kept = getKeptList();
  const next = [];
  locked.forEach((hex) => {
    if (!skipHexes.has(hex) && !next.includes(hex)) next.push(hex);
  });
  kept.forEach((hex) => {
    if (!skipHexes.has(hex) && !next.includes(hex)) next.push(hex);
  });
  palette.forEach((hex) => {
    if (!hex || skipHexes.has(hex) || next.includes(hex)) return;
    next.push(hex);
  });
  return next.slice(0, count);
};

const applyLocksToPalette = (palette, count) => applyPreferencesToPalette(palette, count);

const syncPreferenceSetsToPalette = () => {
  const paletteSet = new Set(state.palette);
  Array.from(state.lockedHexes).forEach((hex) => {
    if (!paletteSet.has(hex)) state.lockedHexes.delete(hex);
  });
  Array.from(state.keptHexes).forEach((hex) => {
    if (!paletteSet.has(hex) || state.lockedHexes.has(hex)) state.keptHexes.delete(hex);
  });
};

const remapPreferenceHex = (fromHex, toHex) => {
  if (!fromHex || !toHex || fromHex === toHex) return;
  const hadLock = state.lockedHexes.has(fromHex);
  const hadKeep = state.keptHexes.has(fromHex);
  state.lockedHexes.delete(fromHex);
  state.keptHexes.delete(fromHex);
  if (hadLock) {
    state.lockedHexes.add(toHex);
  } else if (hadKeep) {
    state.keptHexes.add(toHex);
  }
};

const buildStrategyVariants = (basePalette, count) => {
  const normalizedBase = (basePalette || []).map((hex) => normalizeHex(hex)).filter(Boolean);
  if (!normalizedBase.length) return [];
  const bins = buildColorBins(state.samplePixels);
  const fromBins = bins.map((item) => item.hex);
  const fillFrom = [...normalizedBase, ...fromBins].filter((hex, idx, arr) => arr.indexOf(hex) === idx);

  const balancedPalette = pickDistinctHexes(normalizedBase.length ? normalizedBase : fillFrom, count, 14);
  for (const next of fillFrom) {
    if (balancedPalette.length >= count) break;
    if (!balancedPalette.includes(next)) balancedPalette.push(next);
  }

  const dominantCandidates = bins
    .slice()
    .sort((a, b) => b.count - a.count);
  const dominantPalette = pickDistinctHexes(dominantCandidates, count, 20);
  for (const next of fillFrom) {
    if (dominantPalette.length >= count) break;
    if (!dominantPalette.includes(next)) dominantPalette.push(next);
  }

  const byDark = bins.slice().sort((a, b) => a.luminance - b.luminance);
  const byLight = bins.slice().sort((a, b) => b.luminance - a.luminance);
  const bySat = bins.slice().sort((a, b) => b.s - a.s);
  const contrastSeed = [];
  if (byDark[0]?.hex) contrastSeed.push(byDark[0].hex);
  if (byLight[0]?.hex && !contrastSeed.includes(byLight[0].hex)) contrastSeed.push(byLight[0].hex);
  if (bySat[0]?.hex && !contrastSeed.includes(bySat[0].hex)) contrastSeed.push(bySat[0].hex);
  const contrastPool = [...contrastSeed, ...fromBins, ...normalizedBase]
    .filter((hex, idx, arr) => arr.indexOf(hex) === idx);
  const contrastPalette = [];
  while (contrastPalette.length < count && contrastPool.length) {
    if (!contrastPalette.length) {
      contrastPalette.push(contrastPool.shift());
      continue;
    }
    let bestHex = null;
    let bestScore = -1;
    contrastPool.forEach((hex) => {
      const distanceScore = Math.min(...contrastPalette.map((seed) => colorDistance(seed, hex)));
      const lumScore = Math.min(...contrastPalette.map((seed) => Math.abs(relativeLuminance(seed) - relativeLuminance(hex)) * 255));
      const score = distanceScore * 0.7 + lumScore * 0.3;
      if (score > bestScore) {
        bestScore = score;
        bestHex = hex;
      }
    });
    if (!bestHex) break;
    contrastPalette.push(bestHex);
    const idx = contrastPool.indexOf(bestHex);
    if (idx >= 0) contrastPool.splice(idx, 1);
  }
  for (const next of fillFrom) {
    if (contrastPalette.length >= count) break;
    if (!contrastPalette.includes(next)) contrastPalette.push(next);
  }

  return [
    {
      id: "balanced",
      name: t("strategies.items.balanced.name", "Cân bằng"),
      desc: t("strategies.items.balanced.desc", "Giữ nhịp màu hài hòa để dùng đa ngữ cảnh."),
      palette: applyPreferencesToPalette(balancedPalette, count)
    },
    {
      id: "dominant",
      name: t("strategies.items.dominant.name", "Chủ đạo rõ"),
      desc: t("strategies.items.dominant.desc", "Ưu tiên màu chiếm tỉ trọng cao để giữ tinh thần ảnh gốc."),
      palette: applyPreferencesToPalette(dominantPalette, count)
    },
    {
      id: "contrast",
      name: t("strategies.items.contrast.name", "Tương phản cao"),
      desc: t("strategies.items.contrast.desc", "Đẩy độ tách lớp màu để dễ đọc và dễ in."),
      palette: applyPreferencesToPalette(contrastPalette, count)
    }
  ];
};

const computeDominantShare = (palette, pixels) => {
  const shares = {};
  if (!palette.length || !pixels.length) return shares;
  const paletteRgb = palette.map((hex) => hexToRgb(hex));
  const counts = new Array(paletteRgb.length).fill(0);
  pixels.forEach(([r, g, b]) => {
    let bestIdx = 0;
    let bestDist = Infinity;
    paletteRgb.forEach((color, idx) => {
      const dr = r - color.r;
      const dg = g - color.g;
      const db = b - color.b;
      const dist = dr * dr + dg * dg + db * db;
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = idx;
      }
    });
    counts[bestIdx] += 1;
  });
  const total = counts.reduce((sum, val) => sum + val, 0) || 1;
  palette.forEach((hex, idx) => {
    shares[hex] = Math.round((counts[idx] / total) * 100);
  });
  return shares;
};

const getPaletteRoles = () => {
  const model = getDecisionModel();
  const main = model?.dominant || state.palette[0] || "#94A3B8";
  const secondary = model?.neutral || state.palette[1] || adjustRgb(main, 30);
  const accent = model?.accent || state.palette[2] || adjustRgb(main, -30);
  return { main, secondary, accent };
};

const updateMockups = () => {
  const { main, secondary, accent } = getPaletteRoles();
  const ratioUi = contrastRatio(main, secondary);
  const ratioCta = contrastRatio(accent, secondary);
  if (elements.mockupUi) {
    const body = elements.mockupUi.querySelector(".ic-mockup-body");
    if (body) body.style.background = secondary;
    const title = elements.mockupUi.querySelector("[data-role='title']");
    const subtitle = elements.mockupUi.querySelector("[data-role='subtitle']");
    const cta = elements.mockupUi.querySelector("[data-role='cta']");
    if (title) title.style.background = main;
    if (subtitle) subtitle.style.background = adjustRgb(secondary, -20);
    if (cta) cta.style.background = accent;
  }
  if (elements.mockupUiNote) {
    const key = ratioUi >= 4.5
      ? "preview.notes.uiStrong"
      : "preview.notes.uiWeak";
    const fallback = ratioUi >= 4.5
      ? "Bố cục UI đạt độ đọc tốt giữa tiêu đề và nền."
      : "Độ đọc UI còn thấp, nên chỉnh lại màu chủ đạo hoặc nền phụ.";
    elements.mockupUiNote.textContent = `${t(key, fallback)} (${ratioUi}:1)`;
  }
  if (elements.mockupPoster) {
    const body = elements.mockupPoster.querySelector(".ic-mockup-body");
    if (body) {
      body.style.background = `linear-gradient(140deg, ${main}, ${secondary})`;
    }
    const title = elements.mockupPoster.querySelector("[data-role='poster-title']");
    const subtitle = elements.mockupPoster.querySelector("[data-role='poster-sub']");
    if (title) title.style.background = accent;
    if (subtitle) subtitle.style.background = "rgba(255,255,255,0.6)";
  }
  if (elements.mockupPosterNote) {
    const key = ratioCta >= 3.5
      ? "preview.notes.posterStrong"
      : "preview.notes.posterWeak";
    const fallback = ratioCta >= 3.5
      ? "Màu nhấn tách nền tốt, phù hợp dùng làm điểm gọi hành động."
      : "Màu nhấn chưa tách nền rõ, cân nhắc tăng tương phản cho áp phích.";
    elements.mockupPosterNote.textContent = `${t(key, fallback)} (${ratioCta}:1)`;
  }
  if (elements.mockupFabric) {
    const body = elements.mockupFabric.querySelector(".ic-mockup-body");
    if (body) {
      body.style.background = `repeating-linear-gradient(45deg, ${main}, ${main} 12px, ${secondary} 12px, ${secondary} 24px)`;
      body.style.boxShadow = `inset 0 0 0 2px ${accent}`;
    }
  }
  if (elements.mockupFabricNote) {
    const mainProfile = getHexProfile(main);
    const tipKey = mainProfile.l < 40
      ? "preview.notes.fabricDark"
      : mainProfile.l > 68
        ? "preview.notes.fabricLight"
        : "preview.notes.fabricMid";
    const fallback = mainProfile.l < 40
      ? "Nền vải tối: ưu tiên kiểm tra underbase trước khi in."
      : mainProfile.l > 68
        ? "Nền vải sáng: phù hợp thêu logo nổi với màu nhấn hiện tại."
        : "Nền vải trung tính: dễ chuyển tiếp sang cả Thêu và In lưới.";
    elements.mockupFabricNote.textContent = t(tipKey, fallback);
  }
};

const updateLegend = ({ dominant, accent, neutral }) => {
  const applyLegend = (swatch, textNode, label, hex) => {
    if (swatch) swatch.style.background = hex || "transparent";
    if (textNode) {
      textNode.textContent = hex ? `${label}: ${hex}` : label;
    }
  };
  applyLegend(
    elements.legendDominantSwatch,
    elements.legendDominantText,
    t("preview.legend.dominant", "Chủ đạo"),
    dominant
  );
  applyLegend(
    elements.legendAccentSwatch,
    elements.legendAccentText,
    t("preview.legend.accent", "Nhấn"),
    accent
  );
  applyLegend(
    elements.legendNeutralSwatch,
    elements.legendNeutralText,
    t("preview.legend.neutral", "Trung tính"),
    neutral
  );
};

const renderDecisionPanel = () => {
  if (!elements.decisionSummary || !elements.decisionRoleGrid || !elements.dominantStrip || !elements.nextActionHint) {
    return;
  }
  const model = getDecisionModel();
  if (!model) {
    elements.decisionSummary.textContent = t(
      "decision.empty",
      "Chưa có bảng màu để đánh giá vai màu. Hãy tải ảnh và bấm Lấy mẫu màu."
    );
    elements.decisionRoleGrid.innerHTML = "";
    elements.dominantStrip.innerHTML = "";
    elements.nextActionHint.textContent = t(
      "decision.nextPlaceholder",
      "Gợi ý bước tiếp theo sẽ hiển thị sau khi có bảng màu."
    );
    if (elements.handoffHint) {
      elements.handoffHint.textContent = t(
        "handoff.hint",
        "Chuyển tiếp nhanh: Bảng phối/Dải chuyển để sáng tạo, Màu thêu để tra chỉ, In lưới để chuẩn bị in, Thư viện để lưu tài sản."
      );
    }
    updateLegend({ dominant: "", accent: "", neutral: "" });
    return;
  }

  const roleRows = [
    {
      role: t("decision.roles.dominant", "Màu chủ đạo"),
      note: t("decision.notes.share", "Chiếm {percent}%", {
        percent: state.dominantShare?.[model.dominant] ?? "--"
      }),
      hex: model.dominant
    },
    {
      role: t("decision.roles.accent", "Màu nhấn"),
      note: t("decision.notes.saturation", "Độ bão hòa {value}%", {
        value: Math.round(getHexProfile(model.accent).s)
      }),
      hex: model.accent
    },
    {
      role: t("decision.roles.neutral", "Màu nền trung tính"),
      note: t("decision.notes.lightness", "Độ sáng {value}%", {
        value: Math.round(getHexProfile(model.neutral).l)
      }),
      hex: model.neutral
    }
  ];

  elements.decisionSummary.textContent = model.summary;
  elements.decisionRoleGrid.innerHTML = roleRows
    .map((item) => `
      <article class="ic-role-item">
        <div class="ic-role-head">
          <span>${item.role}</span>
          <span>${item.note}</span>
        </div>
        <div class="ic-role-color">
          <span class="ic-role-swatch" style="background:${item.hex}"></span>
          <strong>${item.hex}</strong>
        </div>
      </article>
    `)
    .join("");

  const shareSegments = model.byShare
    .map((hex) => {
      const percent = state.dominantShare?.[hex] || 0;
      const flex = Math.max(1, percent);
      return `<span class="ic-dominant-segment" style="flex:${flex} 1 0;background:${hex}" title="${hex} · ${percent}%">${percent}%</span>`;
    })
    .join("");
  elements.dominantStrip.innerHTML = shareSegments;
  elements.nextActionHint.textContent = model.nextAction;
  if (elements.handoffHint) {
    elements.handoffHint.textContent = model.handoff;
  }
  updateLegend({
    dominant: model.dominant,
    accent: model.accent,
    neutral: model.neutral
  });
};

const refreshStrategyVariants = ({ resetActive = false } = {}) => {
  const count = Number(elements.paletteSize?.value || state.palette.length || 8);
  state.strategyVariants = buildStrategyVariants(state.palette, count);
  if (!state.strategyVariants.length) {
    state.activeStrategyId = "balanced";
    return;
  }
  const existing = state.strategyVariants.some((item) => item.id === state.activeStrategyId);
  if (resetActive || !existing) {
    state.activeStrategyId = state.strategyVariants[0].id;
  }
};

const renderStrategyPanel = () => {
  if (!elements.strategyCompareGrid || !elements.strategyComparePanel) return;
  if (!state.palette.length || !state.strategyVariants.length) {
    elements.strategyCompareGrid.innerHTML = `<p class="tc-muted text-xs">${t("strategies.empty", "Hãy trích màu trước để so sánh chiến lược.")}</p>`;
    return;
  }
  elements.strategyCompareGrid.innerHTML = state.strategyVariants
    .map((strategy) => {
      const isActive = strategy.id === state.activeStrategyId;
      const preview = strategy.palette
        .map((hex) => `<span style="background:${hex}" title="${hex}"></span>`)
        .join("");
      return `
        <article class="ic-strategy-card ${isActive ? "is-active" : ""}" data-strategy-card="${strategy.id}">
          <div class="flex items-start justify-between gap-2">
            <div>
              <p class="text-xs font-semibold">${strategy.name}</p>
              <p class="tc-muted text-[11px] leading-relaxed">${strategy.desc}</p>
            </div>
            <span class="tc-muted text-[10px]">${strategy.palette.length}</span>
          </div>
          <div class="ic-strategy-preview">${preview}</div>
          <div class="ic-strategy-actions">
            <span class="tc-muted text-[11px]">${strategy.palette.slice(0, 3).join(" · ")}</span>
            <button type="button" class="tc-btn tc-chip px-2 py-1 text-[11px]" data-strategy-apply="${strategy.id}">
              ${t("strategies.apply", "Áp dụng")}
            </button>
          </div>
        </article>
      `;
    })
    .join("");
};

const getContextualRecommendations = (model) => {
  if (!model) return [];
  const dominantProfile = getHexProfile(model.dominant);
  const accentProfile = getHexProfile(model.accent);
  const contrastDA = contrastRatio(model.dominant, model.accent);
  const contrastDN = contrastRatio(model.dominant, model.neutral);
  const list = [];
  if (dominantProfile.l < 40 || contrastDA < 2.6) {
    list.push({
      id: "print",
      action: "print",
      title: t("next.items.print.title", "Mở In lưới (World 4)"),
      reason: t("next.items.print.reason", "Ảnh có nền đậm hoặc tương phản thấp; nên kiểm tra underbase và thứ tự lớp in."),
      priority: 100
    });
  }
  if (accentProfile.s > 58) {
    list.push({
      id: "gradient",
      action: "gradient",
      title: t("next.items.gradient.title", "Chuyển sang Dải chuyển (World 2)"),
      reason: t("next.items.gradient.reason", "Màu nhấn bão hòa cao phù hợp tạo dải chuyển giàu cảm xúc."),
      priority: 90
    });
  }
  if (contrastDN >= 2.2) {
    list.push({
      id: "thread",
      action: "thread",
      title: t("next.items.thread.title", "Mở Màu thêu (World 1)"),
      reason: t("next.items.thread.reason", "Cặp chủ đạo và trung tính tách lớp ổn, thuận lợi để tra mã chỉ nhanh."),
      priority: 80
    });
  }
  list.push({
    id: "palette",
    action: "palette",
    title: t("next.items.palette.title", "Tinh chỉnh ở Bảng phối (World 3)"),
    reason: t("next.items.palette.reason", "Dùng khi cần chốt vai màu và tối ưu độ đọc trước khi triển khai."),
    priority: 70
  });
  list.push({
    id: "library",
    action: "library-save",
    title: t("next.items.library.title", "Lưu vào Thư viện (World 5)"),
    reason: t("next.items.library.reason", "Giữ lại như một asset để tái sử dụng cho dự án tiếp theo."),
    priority: 60
  });
  return list
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);
};

const renderNextStepPanel = () => {
  if (!elements.nextStepList) return;
  const model = getDecisionModel();
  if (!model) {
    elements.nextStepList.innerHTML = `<p class="tc-muted text-xs">${t("next.empty", "Sau khi có bảng màu, hệ thống sẽ gợi ý 2-3 bước chuyển tiếp phù hợp nhất.")}</p>`;
    return;
  }
  const recommendations = getContextualRecommendations(model);
  if (!recommendations.length) {
    elements.nextStepList.innerHTML = `<p class="tc-muted text-xs">${t("next.empty", "Sau khi có bảng màu, hệ thống sẽ gợi ý 2-3 bước chuyển tiếp phù hợp nhất.")}</p>`;
    return;
  }
  elements.nextStepList.innerHTML = recommendations
    .map((item, index) => `
      <article class="ic-next-step-item">
        <div class="ic-next-step-head">
          <strong class="text-xs">${item.title}</strong>
          <span class="tc-muted text-[10px]">${t("next.priority", "Ưu tiên {index}", { index: index + 1 })}</span>
        </div>
        <p class="tc-muted text-[11px] leading-relaxed">${item.reason}</p>
        <button type="button" class="tc-btn tc-chip px-2 py-1 text-[11px] self-start" data-next-action="${item.action}">
          ${t("next.useNow", "Dùng ngay")}
        </button>
      </article>
    `)
    .join("");
};

const closeReplacePanel = () => {
  state.replaceTargetHex = "";
  if (elements.replacePanel) {
    elements.replacePanel.classList.add("hidden");
    elements.replacePanel.setAttribute("aria-hidden", "true");
  }
  if (elements.replaceHexInput) {
    elements.replaceHexInput.value = "";
  }
};

const openReplacePanel = (hex) => {
  const sourceHex = normalizeHex(hex);
  if (!sourceHex || !elements.replacePanel || !elements.replaceSourceHex || !elements.replaceCandidateList) return;
  state.replaceTargetHex = sourceHex;
  elements.replaceSourceHex.textContent = sourceHex;
  if (elements.replaceHexInput) {
    elements.replaceHexInput.value = sourceHex;
  }
  const count = Number(elements.paletteSize?.value || state.palette.length || 8);
  const candidatePool = state.imageCandidates
    .filter((candidate) => !state.palette.includes(candidate) && candidate !== sourceHex)
    .slice(0, Math.max(6, count));
  elements.replaceCandidateList.innerHTML = candidatePool
    .map((candidate) => `<button type="button" class="ic-candidate-btn" data-replace-candidate="${candidate}" style="background:${candidate}" title="${candidate}" aria-label="${candidate}"></button>`)
    .join("");
  if (elements.replaceCandidatesEmpty) {
    elements.replaceCandidatesEmpty.classList.toggle("hidden", candidatePool.length > 0);
  }
  elements.replacePanel.classList.remove("hidden");
  elements.replacePanel.setAttribute("aria-hidden", "false");
};

const replacePaletteHex = (sourceHex, targetHex) => {
  const source = normalizeHex(sourceHex);
  const target = normalizeHex(targetHex);
  if (!source || !target || source === target) return false;
  const idx = state.palette.indexOf(source);
  if (idx < 0) return false;
  const next = state.palette.slice();
  next[idx] = target;
  const dedup = next.filter((hex, index) => next.indexOf(hex) === index);
  const count = Number(elements.paletteSize?.value || state.palette.length || dedup.length);
  state.palette = applyPreferencesToPalette(dedup, count, { skipHexes: [source] });
  for (const candidate of state.imageCandidates) {
    if (state.palette.length >= count) break;
    if (!state.palette.includes(candidate)) state.palette.push(candidate);
  }
  remapPreferenceHex(source, target);
  state.selectedHex = target;
  syncPreferenceSetsToPalette();
  state.dominantShare = computeDominantShare(state.palette, state.samplePixels);
  refreshStrategyVariants();
  renderPalette();
  showToast(t("toasts.replaced", "Đã thay {from} thành {to}.", { from: source, to: target }));
  return true;
};

const addPickedColor = (hex, { lock = false } = {}) => {
  const normalized = normalizeHex(hex);
  if (!normalized) return;
  const count = Number(elements.paletteSize?.value || 8);
  let next = [...state.palette];
  if (!next.includes(normalized)) next.push(normalized);
  if (lock) toggleLockHex(normalized, true);
  next = applyLocksToPalette(next, count);
  state.palette = next;
  state.dominantShare = computeDominantShare(state.palette, state.samplePixels);
  renderPalette();
};

const pickPalette = (pixels, count) => {
  const unique = [];
  const minDist = 28;
  for (const [r, g, b] of pixels) {
    if (unique.length === 0) {
      unique.push([r, g, b]);
      continue;
    }
    const isFar = unique.every(([ur, ug, ub]) => {
      const dr = r - ur;
      const dg = g - ug;
      const db = b - ub;
      return Math.sqrt(dr * dr + dg * dg + db * db) >= minDist;
    });
    if (isFar) unique.push([r, g, b]);
    if (unique.length >= count * 4) break;
  }
  const palette = [];
  const seed = unique.length ? unique[0] : pixels[0];
  palette.push(seed);
  while (palette.length < count && palette.length < unique.length) {
    let best = null;
    let bestScore = -1;
    for (const candidate of unique) {
      const score = Math.min(...palette.map(([pr, pg, pb]) => {
        const dr = pr - candidate[0];
        const dg = pg - candidate[1];
        const db = pb - candidate[2];
        return Math.sqrt(dr * dr + dg * dg + db * db);
      }));
      if (score > bestScore) {
        bestScore = score;
        best = candidate;
      }
    }
    if (!best) break;
    palette.push(best);
  }
  return palette.map(([r, g, b]) => rgbToHex(r, g, b));
};

const setSampleLoading = (isLoading) => {
  if (!elements.btnSample) return;
  if (isLoading) {
    elements.btnSample.dataset.label ||= elements.btnSample.textContent;
    elements.btnSample.textContent = t("sampleLoading", "Đang lấy mẫu…");
    elements.btnSample.disabled = true;
    return;
  }
  elements.btnSample.textContent = elements.btnSample.dataset.label || t("controls.sample", "Lấy mẫu màu");
  elements.btnSample.disabled = false;
};

const initPreviewContexts = () => {
  if (elements.previewCanvas && !state.previewCtx) {
    state.previewCtx = elements.previewCanvas.getContext("2d");
  }
  if (elements.loupeCanvas && !state.loupeCtx) {
    state.loupeCtx = elements.loupeCanvas.getContext("2d");
  }
};

const drawPreviewImage = (img) => {
  if (!elements.previewCanvas || !img) return;
  initPreviewContexts();
  const maxSide = 900;
  const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));

  if (!state.pickCanvas) state.pickCanvas = document.createElement("canvas");
  if (!state.pickCtx) state.pickCtx = state.pickCanvas.getContext("2d");

  state.pickCanvas.width = width;
  state.pickCanvas.height = height;
  elements.previewCanvas.width = width;
  elements.previewCanvas.height = height;
  state.pickCtx.clearRect(0, 0, width, height);
  state.pickCtx.drawImage(img, 0, 0, width, height);
  if (state.previewCtx) {
    state.previewCtx.clearRect(0, 0, width, height);
    state.previewCtx.drawImage(img, 0, 0, width, height);
  }
  if (elements.previewPlaceholder) {
    elements.previewPlaceholder.style.display = "none";
  }
  if (state.region) updateRegionBox();
};

const getCanvasPoint = (event) => {
  const canvas = elements.previewCanvas;
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
    relX: event.clientX - rect.left,
    relY: event.clientY - rect.top
  };
};

const getHexAtPoint = (point) => {
  if (!state.pickCtx || !point) return null;
  const x = Math.max(0, Math.min(state.pickCanvas.width - 1, Math.round(point.x)));
  const y = Math.max(0, Math.min(state.pickCanvas.height - 1, Math.round(point.y)));
  const data = state.pickCtx.getImageData(x, y, 1, 1).data;
  if (!data || data.length < 3) return null;
  return rgbToHex(data[0], data[1], data[2]);
};

const renderLoupe = () => {
  state.loupeRaf = null;
  if (!state.loupePoint || !elements.loupe || !elements.loupeCanvas || !state.pickCanvas) return;
  const point = state.loupePoint;
  const hex = getHexAtPoint(point);
  if (hex) {
    state.loupeHex = hex;
    if (elements.loupeLabel) elements.loupeLabel.textContent = hex;
  }
  if (state.loupeCtx) {
    const size = elements.loupeCanvas.width;
    const sampleSize = 20;
    const sx = Math.max(0, Math.min(state.pickCanvas.width - sampleSize, Math.round(point.x - sampleSize / 2)));
    const sy = Math.max(0, Math.min(state.pickCanvas.height - sampleSize, Math.round(point.y - sampleSize / 2)));
    state.loupeCtx.imageSmoothingEnabled = false;
    state.loupeCtx.clearRect(0, 0, size, size);
    state.loupeCtx.drawImage(state.pickCanvas, sx, sy, sampleSize, sampleSize, 0, 0, size, size);
    state.loupeCtx.strokeStyle = "rgba(255,255,255,0.8)";
    state.loupeCtx.beginPath();
    state.loupeCtx.moveTo(size / 2, 0);
    state.loupeCtx.lineTo(size / 2, size);
    state.loupeCtx.moveTo(0, size / 2);
    state.loupeCtx.lineTo(size, size / 2);
    state.loupeCtx.stroke();
  }
  if (elements.loupe) {
    elements.loupe.classList.add("is-visible");
    const previewRect = elements.previewCanvas.getBoundingClientRect();
    const offsetX = Math.min(previewRect.width - 60, Math.max(12, point.relX + 20));
    const offsetY = Math.min(previewRect.height - 60, Math.max(12, point.relY - 120));
    elements.loupe.style.left = `${offsetX}px`;
    elements.loupe.style.top = `${offsetY}px`;
  }
};

const scheduleLoupe = () => {
  if (state.loupeRaf) return;
  state.loupeRaf = requestAnimationFrame(renderLoupe);
};

const initWorker = () => {
  if (state.workerReady || !window.Worker) return;
  try {
    const worker = new Worker("../workers/imagecolor.worker.js", { type: "module" });
    worker.onmessage = (event) => {
      const { id, palette, error } = event.data || {};
      if (id !== state.sampleToken) return;
      if (error || !Array.isArray(palette)) {
        state.workerReady = false;
        fallbackSampleFromPixels();
        return;
      }
      const count = Number(elements.paletteSize?.value || palette.length);
      state.palette = applyLocksToPalette(palette.map(normalizeHex).filter(Boolean), count);
      state.dominantShare = computeDominantShare(state.palette, state.samplePixels);
      renderPalette();
      setSampleLoading(false);
      showToast(t("status.sampled", "Đã lấy {count} màu từ ảnh.", { count: state.palette.length }));
    };
    worker.onerror = () => {
      state.workerReady = false;
      fallbackSampleFromPixels();
    };
    state.worker = worker;
    state.workerReady = true;
  } catch (_err) {
    state.workerReady = false;
  }
};

const buildSampleImageData = () => {
  if (!state.pickCanvas || !state.pickCtx) return null;
  const canvas = state.pickCanvas;
  let region = state.region;
  if (!region) {
    region = { x: 0, y: 0, w: canvas.width, h: canvas.height };
  }
  const sampleSize = 96;
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = sampleSize;
  tempCanvas.height = sampleSize;
  const ctx = tempCanvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(canvas, region.x, region.y, region.w, region.h, 0, 0, sampleSize, sampleSize);
  return ctx.getImageData(0, 0, sampleSize, sampleSize);
};

const pixelsFromImageData = (imageData) => {
  const pixels = [];
  if (!imageData) return pixels;
  const data = imageData.data || [];
  for (let i = 0; i < data.length; i += 16) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 50) continue;
    pixels.push([r, g, b]);
  }
  return pixels;
};

const fallbackSampleFromPixels = () => {
  const count = Number(elements.paletteSize?.value || 8);
  if (!state.samplePixels.length) {
    setSampleLoading(false);
    showToast(t("toasts.noImageData", "Không có dữ liệu ảnh để lấy mẫu."));
    return;
  }
  const paletteRaw = pickPalette(state.samplePixels, count).map(normalizeHex).filter(Boolean);
  state.palette = applyLocksToPalette(paletteRaw, count);
  state.dominantShare = computeDominantShare(state.palette, state.samplePixels);
  renderPalette();
  setSampleLoading(false);
  showToast(t("status.sampled", "Đã lấy {count} màu từ ảnh.", { count: state.palette.length }));
};

const sampleImage = () => {
  if (!state.image) {
    showToast(t("toasts.needImageBeforeSample", "Hãy tải ảnh trước khi lấy mẫu."));
    return;
  }
  if (!elements.canvas) return;
  setSampleLoading(true);
  try {
    const count = Number(elements.paletteSize?.value || 8);
    const imageData = buildSampleImageData();
    if (!imageData) throw new Error("no-sample");
    state.samplePixels = pixelsFromImageData(imageData);
    state.imageCandidates = buildImageCandidates(state.samplePixels, { limit: 24 });
    initWorker();
    if (state.workerReady && state.worker) {
      state.sampleToken += 1;
      const buffer = imageData.data.buffer;
      state.worker.postMessage({
        id: state.sampleToken,
        width: imageData.width,
        height: imageData.height,
        count,
        buffer
      }, [buffer]);
      return;
    }
    fallbackSampleFromPixels();
  } catch (_err) {
    showToast(t("toasts.sampleError", "Có lỗi khi lấy mẫu màu."));
    setSampleLoading(false);
  } finally {
    if (!state.workerReady) {
      setSampleLoading(false);
    }
  }
};

const renderPalette = () => {
  if (!elements.swatchGrid) return;
  elements.swatchGrid.innerHTML = "";
  if (!state.palette.length) {
    state.selectedHex = "";
    state.strategyVariants = [];
    closeReplacePanel();
    setStatus(t("status.noPalette", "Chưa có bảng màu. Hãy tải ảnh và bấm Lấy mẫu màu."));
    setActionButtonsEnabled(false);
    renderDecisionPanel();
    renderStrategyPanel();
    renderNextStepPanel();
    updateMockups();
    return;
  }
  state.dominantShare = computeDominantShare(state.palette, state.samplePixels);
  syncPreferenceSetsToPalette();
  if (state.replaceTargetHex && !state.palette.includes(state.replaceTargetHex)) {
    closeReplacePanel();
  }
  if (!state.palette.includes(state.selectedHex)) {
    state.selectedHex = state.palette[0];
  }
  refreshStrategyVariants();
  const model = getDecisionModel();
  state.palette.forEach((hex) => {
    const card = document.createElement("div");
    card.className = "tc-swatch-card";
    card.dataset.hexCard = hex;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    if (state.selectedHex === hex) {
      card.classList.add("is-selected");
    }

    const swatch = document.createElement("div");
    swatch.className = "tc-swatch";
    swatch.style.background = hex;
    swatch.textContent = hex;

    const share = document.createElement("div");
    share.className = "tc-swatch-share";
    const percent = state.dominantShare?.[hex];
    share.textContent = Number.isFinite(percent) ? `${percent}%` : "--";

    const roleBadge = document.createElement("span");
    roleBadge.className = "ic-role-badge";
    if (model?.dominant === hex) {
      roleBadge.textContent = t("decision.roles.dominant", "Màu chủ đạo");
    } else if (model?.accent === hex) {
      roleBadge.textContent = t("decision.roles.accent", "Màu nhấn");
    } else if (model?.neutral === hex) {
      roleBadge.textContent = t("decision.roles.neutral", "Màu nền trung tính");
    } else if (state.keptHexes.has(hex)) {
      roleBadge.textContent = t("swatch.kept", "Đang giữ ưu tiên");
    } else if (state.lockedHexes.has(hex)) {
      roleBadge.textContent = t("swatch.locked", "Đang khóa");
    } else {
      roleBadge.textContent = t("swatch.unassigned", "Màu hỗ trợ");
    }

    const actions = document.createElement("div");
    actions.className = "tc-swatch-actions";

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "tc-swatch-btn";
    copyBtn.dataset.hex = hex;
    copyBtn.dataset.hexAction = "copy";
    copyBtn.textContent = t("swatch.copyHex", "Sao chép HEX");

    const lockBtn = document.createElement("button");
    lockBtn.type = "button";
    lockBtn.className = "tc-swatch-btn tc-swatch-lock";
    lockBtn.dataset.hex = hex;
    lockBtn.dataset.hexAction = "lock";
    lockBtn.textContent = state.lockedHexes.has(hex)
      ? t("swatch.locked", "Đang khóa")
      : t("swatch.lock", "Khóa");
    if (state.lockedHexes.has(hex)) lockBtn.classList.add("is-active");

    const keepBtn = document.createElement("button");
    keepBtn.type = "button";
    keepBtn.className = "tc-swatch-btn tc-swatch-keep";
    keepBtn.dataset.hex = hex;
    keepBtn.dataset.hexAction = "keep";
    keepBtn.textContent = state.keptHexes.has(hex)
      ? t("swatch.kept", "Đang giữ ưu tiên")
      : t("swatch.keep", "Giữ");
    if (state.keptHexes.has(hex)) keepBtn.classList.add("is-active");

    const replaceBtn = document.createElement("button");
    replaceBtn.type = "button";
    replaceBtn.className = "tc-swatch-btn";
    replaceBtn.dataset.hex = hex;
    replaceBtn.dataset.hexAction = "replace";
    replaceBtn.textContent = t("swatch.replace", "Thay");

    actions.appendChild(copyBtn);
    actions.appendChild(lockBtn);
    actions.appendChild(keepBtn);
    actions.appendChild(replaceBtn);
    card.appendChild(swatch);
    card.appendChild(share);
    card.appendChild(roleBadge);
    card.appendChild(actions);
    elements.swatchGrid.appendChild(card);
  });
  setStatus(t("status.sampled", "Đã lấy {count} màu từ ảnh.", { count: state.palette.length }));
  setActionButtonsEnabled(true);
  renderDecisionPanel();
  renderStrategyPanel();
  renderNextStepPanel();
  updateMockups();
};

const setPreview = (src) => {
  if (!elements.preview) return;
  if (!src) {
    if (elements.previewPlaceholder) {
      elements.previewPlaceholder.style.display = "grid";
    }
    if (elements.loupe) elements.loupe.classList.remove("is-visible");
    if (state.previewCtx && elements.previewCanvas) {
      state.previewCtx.clearRect(0, 0, elements.previewCanvas.width, elements.previewCanvas.height);
    }
    return;
  }
  if (elements.previewPlaceholder) {
    elements.previewPlaceholder.style.display = "none";
  }
};

const readImageFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const handleFile = async (file) => {
  if (!file) return;
  const loadSeq = imageLoadSeq + 1;
  imageLoadSeq = loadSeq;
  try {
    state.imageName = file.name || "Ảnh";
    state.lockedHexes.clear();
    state.keptHexes.clear();
    state.replaceTargetHex = "";
    const stored = await uploadImage(file, {
      sourceWorld: "imagecolor",
      purpose: "preview",
      name: state.imageName
    });
    let dataUrl = stored?.url || "";
    let cleanup = () => {};
    if (stored?.key) {
      cleanup = () => {
        void deleteImage(stored.key);
      };
    }
    if (!dataUrl) {
      dataUrl = await readImageFile(file);
      cleanup = () => {};
    }
    const img = new Image();
    img.onload = () => {
      if (loadSeq !== imageLoadSeq) {
        cleanup();
        return;
      }
      state.image = img;
      setPreview(dataUrl);
      clearRegion();
      drawPreviewImage(img);
      sampleImage();
      cleanup();
    };
    img.onerror = () => {
      cleanup();
      showToast(t("toasts.loadImageError", "Không thể tải ảnh để xử lý."));
    };
    img.src = dataUrl;
  } catch (_err) {
    showToast(t("toasts.readImageError", "Không thể đọc ảnh. Vui lòng thử lại."));
  }
};

const captureCanvasImage = (canvas, type = "image/png") => new Promise((resolve) => {
  if (!canvas) {
    resolve(null);
    return;
  }
  if (canvas.toBlob) {
    canvas.toBlob((blob) => resolve(blob || null), type);
    return;
  }
  try {
    resolve(canvas.toDataURL(type));
  } catch (_err) {
    resolve(null);
  }
});

const buildThumbnailCanvas = (palette) => {
  if (!palette.length) return null;
  const canvas = document.createElement("canvas");
  const width = 180;
  const height = 120;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const step = width / palette.length;
  palette.forEach((hex, idx) => {
    ctx.fillStyle = hex;
    ctx.fillRect(idx * step, 0, step + 1, height);
  });
  return canvas;
};

const buildCssVars = (palette) => {
  const lines = palette.map((hex, idx) => `  --ic-color-${idx + 1}: ${hex};`);
  return `:root {\n${lines.join("\n")}\n}\n`;
};

const buildJsonTokens = (palette) => {
  const tokens = palette.map((hex, idx) => ({
    name: `ic-color-${idx + 1}`,
    value: hex
  }));
  return JSON.stringify({ tokens, palette }, null, 2);
};

const buildPaletteShareLink = (palette) => {
  const list = palette.map((hex) => normalizeHex(hex)).filter(Boolean);
  const payload = encodeURIComponent(JSON.stringify({ colors: list }));
  const url = new URL("./palette.html", window.location.href);
  url.hash = `p=${payload}`;
  return url.toString();
};

const buildGradientShareLink = (palette) => {
  const list = palette.map((hex) => normalizeHex(hex)).filter(Boolean).map((hex) => hex.replace("#", ""));
  const payload = encodeURIComponent(list.join(","));
  const url = new URL("./gradient.html", window.location.href);
  url.hash = `g=${payload}`;
  return url.toString();
};

const buildAssetSpec = async () => {
  if (!state.palette.length) {
    return null;
  }
  const project = getCurrentProject();
  const thumbCanvas = buildThumbnailCanvas(state.palette);
  const thumbPayload = await captureCanvasImage(thumbCanvas);
  let thumbnail = "";
  if (thumbPayload) {
    try {
      const storedThumb = await uploadImage(thumbPayload, {
        sourceWorld: "imagecolor",
        purpose: "palette-thumbnail",
        paletteSize: state.palette.length,
        sourceImage: state.imageName || ""
      });
      thumbnail = storedThumb?.key || "";
    } catch (_err) {
      thumbnail = "";
    }
  }
  const lockedHexes = getLockedList();
  const paletteSize = Number(elements.paletteSize?.value || state.palette.length);
  const createdAt = new Date().toISOString();
  return createSpec({
    type: "palette",
    name: "Bảng phối màu từ ảnh",
    tags: ["ảnh", "palette", "world7"],
    core: { colors: state.palette },
    payload: {
      colors: state.palette,
      lockedHexes,
      paletteSize,
      dominantShare: state.dominantShare,
      thumbnail,
      settings: {
        paletteSize,
        lockedHexes
      }
    },
    sourceImage: {
      name: state.imageName
    },
    sourceWorld: "imagecolor",
    project,
    createdAt,
    updatedAt: createdAt
  });
};

const saveToLibrary = async () => {
  const spec = await buildAssetSpec();
  if (!spec) {
    showToast(t("toasts.noPaletteSave", "Chưa có bảng phối màu để lưu."));
    return;
  }
  try {
    const raw = localStorage.getItem(ASSET_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const next = Array.isArray(list) ? list : [];
    next.unshift(spec);
    localStorage.setItem(ASSET_STORAGE_KEY, JSON.stringify(next));
    showToast(t("toasts.savedLibrary", "Đã lưu vào Thư viện."));
  } catch (_err) {
    showToast(t("toasts.saveLibraryError", "Không thể lưu vào Thư viện."));
  }
};

const toPaletteWorld = () => {
  if (!state.palette.length) return;
  const payload = state.palette.map((hex) => hex.replace("#", "")).join(",");
  window.location.href = `../worlds/palette.html#p=${encodeURIComponent(payload)}`;
};

const toGradientWorld = () => {
  if (!state.palette.length) return;
  const payload = state.palette.map((hex) => hex.replace("#", "")).join(",");
  window.location.href = `../worlds/gradient.html#g=${encodeURIComponent(payload)}`;
};

const toPrintWorld = () => {
  if (!state.palette.length) return;
  const payload = state.palette.map((hex) => hex.replace("#", "")).join(",");
  window.location.href = `../worlds/printcolor.html#c=${encodeURIComponent(payload)}`;
};

const buildWorld7TourConfig = () => {
  return {
    id: "world7-imagecolor",
    force: false,
    storageSeenKey: TOUR_SEEN_KEY,
    storageNeverKey: TOUR_NEVER_KEY,
    labels: {
      dialog: t("tour.dialogLabel", "Hướng dẫn World 7"),
      prev: t("tour.labels.prev", "Quay lại"),
      skip: t("tour.labels.skip", "Bỏ qua"),
      dontShow: t("tour.labels.dontShow", "Đừng hiện lại"),
      next: t("tour.labels.next", "Tiếp"),
      done: t("tour.labels.done", "Hoàn tất"),
      step: t("tour.labels.step", "Bước {current}/{total}")
    },
    steps: [
      {
        id: "hero",
        selector: "[data-tour='w7-hero']",
        title: t("tour.steps.hero.title", "Thế giới màu ảnh dùng để làm gì?"),
        desc: t("tour.steps.hero.desc", "Đây là điểm vào để chuyển ảnh thành bảng màu có thể dùng ngay cho thêu, in và lưu tài sản.")
      },
      {
        id: "upload",
        selector: "#dropzone",
        title: t("tour.steps.upload.title", "Tải ảnh hoặc kéo thả"),
        desc: t("tour.steps.upload.desc", "Bắt đầu bằng một ảnh tham chiếu. Bạn có thể kéo thả trực tiếp để xử lý nhanh.")
      },
      {
        id: "region",
        selector: "#btnRegion",
        title: t("tour.steps.region.title", "Khoanh vùng và lấy mẫu"),
        desc: t("tour.steps.region.desc", "Dùng Khoanh vùng khi chỉ muốn trích màu ở khu vực trọng tâm thay vì toàn ảnh.")
      },
      {
        id: "decision",
        selector: "#paletteDecisionPanel",
        title: t("tour.steps.decision.title", "Đọc bảng màu mức quyết định"),
        desc: t("tour.steps.decision.desc", "Theo dõi màu chủ đạo, màu nhấn và màu nền trung tính để chốt nhanh phương án dùng tiếp.")
      },
      {
        id: "handoff",
        selector: "#handoffActions",
        title: t("tour.steps.handoff.title", "Chuyển tiếp sang Thế giới khác"),
        desc: t("tour.steps.handoff.desc", "Từ đây bạn có thể mở Thêu, In lưới, Bảng phối, Dải chuyển hoặc lưu vào Thư viện.")
      }
    ]
  };
};

const startWorld7Tour = ({ force = false } = {}) => {
  if (typeof window.tcOnboardingTour?.startTour !== "function") return;
  const config = buildWorld7TourConfig();
  config.force = Boolean(force);
  window.tcOnboardingTour.startTour(config);
};

const bindEvents = () => {
  elements.input?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    handleFile(file);
  });
  elements.btnChooseFile?.addEventListener("click", () => {
    elements.input?.click();
  });
  if (elements.dropzone) {
    ["dragenter", "dragover"].forEach((name) => {
      elements.dropzone.addEventListener(name, (event) => {
        event.preventDefault();
        elements.dropzone.classList.add("is-dragover");
      });
    });
    ["dragleave", "drop"].forEach((name) => {
      elements.dropzone.addEventListener(name, (event) => {
        event.preventDefault();
        elements.dropzone.classList.remove("is-dragover");
      });
    });
    elements.dropzone.addEventListener("drop", (event) => {
      const file = event.dataTransfer?.files?.[0];
      handleFile(file);
    });
  }
  elements.btnSample?.addEventListener("click", sampleImage);
  elements.btnRegion?.addEventListener("click", () => {
    if (!state.image) {
      showToast(t("toasts.needImageBeforeRegion", "Hãy tải ảnh trước khi khoanh vùng."));
      return;
    }
    setRegionActive(!state.regionActive);
  });
  elements.btnRegionClear?.addEventListener("click", () => {
    clearRegion();
    if (state.image) sampleImage();
  });
  elements.btnToPalette?.addEventListener("click", toPaletteWorld);
  elements.btnToGradient?.addEventListener("click", toGradientWorld);
  elements.btnToPrint?.addEventListener("click", toPrintWorld);
  elements.btnOpenTour?.addEventListener("click", () => {
    startWorld7Tour({ force: true });
  });
  elements.btnReplaceApply?.addEventListener("click", () => {
    const sourceHex = state.replaceTargetHex;
    const targetHex = normalizeHex(elements.replaceHexInput?.value || "");
    if (!sourceHex || !targetHex) {
      showToast(t("toasts.needReplaceHex", "Hãy chọn hoặc nhập mã HEX hợp lệ để thay."));
      return;
    }
    const ok = replacePaletteHex(sourceHex, targetHex);
    if (ok) closeReplacePanel();
  });
  elements.btnReplaceCancel?.addEventListener("click", closeReplacePanel);
  elements.replaceCandidateList?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-replace-candidate]");
    if (!btn || !elements.replaceHexInput) return;
    const hex = normalizeHex(btn.dataset.replaceCandidate || "");
    if (!hex) return;
    elements.replaceHexInput.value = hex;
  });
  elements.btnSave?.addEventListener("click", () => {
    void saveToLibrary();
  });
  elements.btnUseLibrary?.addEventListener("click", () => {
    const payload = composeHandoff({
      from: HANDOFF_FROM,
      intent: "use",
      projectId: getCurrentProject()
    });
    window.location.href = `../worlds/library.html${payload}`;
  });
  elements.btnShare?.addEventListener("click", () => {
    void (async () => {
      const spec = await buildAssetSpec();
      if (!spec) {
        showToast(t("toasts.noPaletteShare", "Chưa có bảng phối màu để chia sẻ."));
        return;
      }
      publishToFeed(spec);
    })();
  });
  elements.btnCopyCss?.addEventListener("click", async () => {
    if (!state.palette.length) return;
    const ok = await copyText(buildCssVars(state.palette));
    showToast(ok ? t("toasts.copiedCss", "Đã sao chép biến CSS.") : t("toasts.copyFailed", "Không thể sao chép."));
  });
  elements.btnCopyJson?.addEventListener("click", async () => {
    if (!state.palette.length) return;
    const ok = await copyText(buildJsonTokens(state.palette));
    showToast(ok ? t("toasts.copiedJson", "Đã sao chép token JSON.") : t("toasts.copyFailed", "Không thể sao chép."));
  });
  elements.btnSharePalette?.addEventListener("click", async () => {
    if (!state.palette.length) return;
    const ok = await copyText(buildPaletteShareLink(state.palette));
    showToast(ok ? t("toasts.copiedPaletteLink", "Đã sao chép liên kết Bảng phối.") : t("toasts.copyLinkFailed", "Không thể sao chép liên kết."));
  });
  elements.btnShareGradient?.addEventListener("click", async () => {
    if (!state.palette.length) return;
    const ok = await copyText(buildGradientShareLink(state.palette));
    showToast(ok ? t("toasts.copiedGradientLink", "Đã sao chép liên kết Dải chuyển.") : t("toasts.copyLinkFailed", "Không thể sao chép liên kết."));
  });
  elements.paletteSize?.addEventListener("change", () => {
    if (state.image) sampleImage();
  });
  elements.swatchGrid?.addEventListener("click", async (event) => {
    const target = event.target.closest("[data-hex-action]");
    if (target) {
      const hex = target.dataset.hex;
      const action = target.dataset.hexAction;
      if (!hex || !action) return;
      if (action === "copy") {
        try {
          const ok = await copyText(hex);
          showToast(ok
            ? t("toasts.copiedHex", "Đã sao chép {hex}.", { hex })
            : t("toasts.copyFailed", "Không thể sao chép."));
        } catch (_err) {
          showToast(t("toasts.copyRetry", "Không thể sao chép. Hãy thử lại."));
        }
        return;
      }
      if (action === "lock") {
        const ok = toggleLockHex(hex);
        if (!ok) return;
        const count = Number(elements.paletteSize?.value || state.palette.length);
        state.palette = applyLocksToPalette(state.palette, count);
        syncPreferenceSetsToPalette();
        renderPalette();
        showToast(state.lockedHexes.has(hex)
          ? t("toasts.lockOn", "Đã khóa màu {hex}.", { hex })
          : t("toasts.lockOff", "Đã bỏ khóa màu."));
      }
      if (action === "keep") {
        if (state.lockedHexes.has(hex)) {
          showToast(t("toasts.keepSkipLocked", "Màu này đang khóa cứng, không cần giữ ưu tiên."));
          return;
        }
        const ok = toggleKeepHex(hex);
        if (!ok) return;
        const count = Number(elements.paletteSize?.value || state.palette.length);
        state.palette = applyPreferencesToPalette(state.palette, count);
        syncPreferenceSetsToPalette();
        renderPalette();
        showToast(state.keptHexes.has(hex)
          ? t("toasts.keepOn", "Đã giữ ưu tiên màu {hex}.", { hex })
          : t("toasts.keepOff", "Đã bỏ giữ ưu tiên."));
      }
      if (action === "replace") {
        openReplacePanel(hex);
      }
      return;
    }
    const swatchCard = event.target.closest("[data-hex-card]");
    if (!swatchCard) return;
    const selectedHex = normalizeHex(swatchCard.dataset.hexCard || "");
    if (!selectedHex) return;
    if (state.selectedHex !== selectedHex) {
      state.selectedHex = selectedHex;
      renderPalette();
      showToast(t("toasts.focusColor", "Đang tập trung màu {hex}.", { hex: selectedHex }), { duration: 1200 });
    }
  });
  elements.swatchGrid?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest("[data-hex-card]");
    if (!card) return;
    event.preventDefault();
    const selectedHex = normalizeHex(card.dataset.hexCard || "");
    if (!selectedHex) return;
    state.selectedHex = selectedHex;
    renderPalette();
  });
  elements.strategyCompareGrid?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-strategy-apply]");
    if (!btn) return;
    const strategyId = btn.dataset.strategyApply || "";
    const strategy = state.strategyVariants.find((item) => item.id === strategyId);
    if (!strategy) return;
    state.activeStrategyId = strategyId;
    const count = Number(elements.paletteSize?.value || strategy.palette.length || 8);
    state.palette = applyPreferencesToPalette(strategy.palette, count);
    syncPreferenceSetsToPalette();
    state.selectedHex = state.palette[0] || "";
    state.dominantShare = computeDominantShare(state.palette, state.samplePixels);
    renderPalette();
    showToast(t("toasts.strategyApplied", "Đã áp dụng chiến lược: {name}.", { name: strategy.name }));
  });
  elements.nextStepList?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-next-action]");
    if (!btn) return;
    const action = btn.dataset.nextAction || "";
    if (action === "palette") {
      toPaletteWorld();
      return;
    }
    if (action === "gradient") {
      toGradientWorld();
      return;
    }
    if (action === "thread") {
      if (!state.palette.length) return;
      const target = state.palette[0]?.replace("#", "") || "";
      window.location.href = `../worlds/threadcolor.html?color=%23${encodeURIComponent(target)}`;
      return;
    }
    if (action === "print") {
      toPrintWorld();
      return;
    }
    if (action === "library-save") {
      void saveToLibrary();
    }
  });

  elements.previewCanvas?.addEventListener("pointerdown", (event) => {
    if (!state.image) return;
    if (state.regionActive) {
      startRegionSelection(event);
    }
  });
  elements.previewCanvas?.addEventListener("pointermove", (event) => {
    if (!state.image) return;
    if (moveRegionSelection(event)) return;
    const point = getCanvasPoint(event);
    if (!point) return;
    state.loupePoint = point;
    scheduleLoupe();
  });
  elements.previewCanvas?.addEventListener("pointerup", () => {
    endRegionSelection();
  });
  elements.previewCanvas?.addEventListener("pointerleave", () => {
    endRegionSelection();
    if (elements.loupe) elements.loupe.classList.remove("is-visible");
    state.loupePoint = null;
  });
  elements.previewCanvas?.addEventListener("click", (event) => {
    if (!state.image) return;
    if (state.regionActive || state.regionDrag) return;
    const point = getCanvasPoint(event);
    if (!point) return;
    const hex = getHexAtPoint(point);
    if (!hex) return;
    addPickedColor(hex, { lock: event.shiftKey });
    showToast(event.shiftKey
      ? t("toasts.lockOn", "Đã khóa màu {hex}.", { hex })
      : t("toasts.addColor", "Đã thêm {hex}.", { hex }));
  });

  document.addEventListener("click", (event) => {
    if (!elements.replacePanel || elements.replacePanel.classList.contains("hidden")) return;
    const inPanel = event.target.closest("#replacePanel");
    const inReplaceAction = event.target.closest("[data-hex-action='replace']");
    if (inPanel || inReplaceAction) return;
    closeReplacePanel();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeReplacePanel();
  });

  window.addEventListener("resize", () => {
    if (state.region) updateRegionBox();
  });
};

const applyHexesFromHub = (detail) => {
  const rawList = Array.isArray(detail?.hexes) ? detail.hexes : [];
  const mode = detail?.mode === "append" ? "append" : "replace";
  const normalized = rawList.map((hex) => normalizeHex(hex)).filter(Boolean);
  if (!normalized.length) return;
  window.tcWorkbench?.setContext?.(normalized, { worldKey: "imagecolor", source: detail?.source || "hex-apply" });
  if (mode === "append" && state.palette.length) {
    const combined = [...state.palette, ...normalized];
    const unique = combined.filter((hex, idx) => combined.indexOf(hex) === idx);
    const count = Number(elements.paletteSize?.value || unique.length);
    state.palette = applyLocksToPalette(unique, count);
    refreshStrategyVariants();
    renderPalette();
    setStatus(t("status.fromHexAppend", "Đã thêm màu từ Kho HEX."));
    return;
  }
  if (normalized.length >= 2) {
    const count = Number(elements.paletteSize?.value || normalized.length);
    state.palette = applyLocksToPalette(normalized, count);
  } else {
    const count = Number(elements.paletteSize?.value || 8);
    const seeded = buildSeedPalette(normalized[0], count);
    state.palette = applyLocksToPalette(seeded, count);
  }
  refreshStrategyVariants({ resetActive: true });
  renderPalette();
  setStatus(t("status.fromHexReplace", "Đã nhận màu từ Kho HEX."));
};

setPreview("");
setRegionStatus(t("regionStatus.empty", "Chưa chọn vùng."));
if (elements.replaceHexInput) {
  elements.replaceHexInput.placeholder = t("replace.manualPlaceholder", "#A1B2C3");
}
renderPalette();
bindEvents();
window.startWorld7Tour = startWorld7Tour;
window.setTimeout(() => {
  startWorld7Tour();
}, 220);

window.addEventListener("tc:hex-apply", (event) => {
  applyHexesFromHub(event?.detail);
});
if (incomingHandoff?.hexes?.length) {
  applyHexesFromHub({ hexes: incomingHandoff.hexes, mode: "replace" });
  window.tcWorkbench?.setContext?.(incomingHandoff.hexes, { worldKey: "imagecolor", source: incomingHandoff.source });
}
