import { composeHandoff } from "../scripts/handoff.js";

import { bootstrapIncomingHandoff, setWorkbenchContext } from "../scripts/workbench_context.js";
import "../scripts/workbench_bridge.js";

const STORAGE_KEY = "tc_paintfabric_assets";
const ASSET_LIBRARY_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const FEED_STORAGE_KEY = "tc_community_feed";
const HANDOFF_FROM = "paintfabric";
const TEMPLATE_BASE = "../assets/material_scenes";
const PAINT_CALC_KEY = "tc_paint_calc_v1";
const TRIPTYCH_KEY = "tc_paintfabric_triptych_v1";
const LAST_PRESET_KEY = "tc_w6_last_preset_v1";

const elements = {
  tabs: document.getElementById("pfTabs"),
  hex: document.getElementById("pfHex"),
  summaryBar: document.getElementById("pfSummaryBar"),
  summaryHex: document.getElementById("pfSummaryHex"),
  summaryMode: document.getElementById("pfSummaryMode"),
  summaryPreset: document.getElementById("pfSummaryPreset"),
  summaryMaterial: document.getElementById("pfSummaryMaterial"),
  summaryCompare: document.getElementById("pfSummaryCompare"),
  scene: document.getElementById("pfScene"),
  finish: document.getElementById("pfFinish"),
  lighting: document.getElementById("pfLighting"),
  surface: document.getElementById("pfSurface"),
  object: document.getElementById("pfObject"),
  fabricType: document.getElementById("pfFabricType"),
  finishFabric: document.getElementById("pfFinishFabric"),
  lightingFabric: document.getElementById("pfLightingFabric"),
  texture: document.getElementById("pfTexture"),
  textureScale: document.getElementById("pfTextureScale"),
  compare: document.getElementById("pfCompare"),
  compareLabel: document.getElementById("pfCompareLabel"),
  compareModes: document.getElementById("pfCompareModes"),
  compareSlots: document.getElementById("pfCompareSlots"),
  compareSliderWrap: document.getElementById("pfCompareSliderWrap"),
  paintPanel: document.getElementById("pfPaintPanel"),
  fabricPanel: document.getElementById("pfFabricPanel"),
  preview: document.getElementById("pfPreview"),
  companionMain: document.getElementById("pfCompanionMain"),
  companionTrim: document.getElementById("pfCompanionTrim"),
  companionAccent: document.getElementById("pfCompanionAccent"),
  companionMainHex: document.getElementById("pfCompanionMainHex"),
  companionTrimHex: document.getElementById("pfCompanionTrimHex"),
  companionAccentHex: document.getElementById("pfCompanionAccentHex"),
  companionPreview: document.getElementById("pfCompanionPreview"),
  openPalette: document.getElementById("pfOpenPalette"),
  openGradient: document.getElementById("pfOpenGradient"),
  photoDetails: document.getElementById("pfPhotoDetails"),
  photoInput: document.getElementById("pfPhotoInput"),
  photoCanvas: document.getElementById("pfPhotoCanvas"),
  photoBrush: document.getElementById("pfPhotoBrush"),
  photoBrushValue: document.getElementById("pfPhotoBrushValue"),
  photoFeather: document.getElementById("pfPhotoFeather"),
  photoFeatherValue: document.getElementById("pfPhotoFeatherValue"),
  photoOpacity: document.getElementById("pfPhotoOpacity"),
  photoOpacityValue: document.getElementById("pfPhotoOpacityValue"),
  photoBlend: document.getElementById("pfPhotoBlend"),
  photoUndo: document.getElementById("pfPhotoUndo"),
  photoClear: document.getElementById("pfPhotoClear"),
  photoCompare: document.getElementById("pfPhotoCompare"),
  photoCompareValue: document.getElementById("pfPhotoCompareValue"),
  photoSave: document.getElementById("pfPhotoSave"),
  photoStatus: document.getElementById("pfPhotoStatus"),
  save: document.getElementById("pfSave"),
  useLibrary: document.getElementById("pfUseLibrary"),
  share: document.getElementById("pfShare"),
  export: document.getElementById("pfExport"),
  exportJson: document.getElementById("pfExportJson"),
  exportPng: document.getElementById("pfExportPng"),
  copySummaryLine: document.getElementById("pfCopySummaryLine"),
  seed: document.getElementById("pfSeed"),
  savedSelect: document.getElementById("pfSavedSelect"),
  spec: document.getElementById("pfSpec"),
  status: document.getElementById("pfStatus"),
  paintArea: document.getElementById("pfPaintArea"),
  paintCoats: document.getElementById("pfPaintCoats"),
  paintCoverage: document.getElementById("pfPaintCoverage"),
  paintWaste: document.getElementById("pfPaintWaste"),
  paintPrice: document.getElementById("pfPaintPrice"),
  paintLiters: document.getElementById("pfPaintLiters"),
  paintCombos: document.getElementById("pfPaintCombos"),
  paintCalcError: document.getElementById("pfPaintCalcError"),
  presets: document.getElementById("pfPresets"),
  triptych: document.getElementById("pfTriptych"),
  copyHex: document.getElementById("pfCopyHex"),
  copySummary: document.getElementById("pfCopySummary"),
  copyJson: document.getElementById("pfCopyJson")
};

const svgCache = new Map();
const defaultHex = "#C27B4B";
let previewRenderSeq = 0;
let rafScheduled = false;

const state = {
  mode: "paint",
  presetId: "",
  presetLabel: "",
  compareMode: "off",
  compareSlot: "A",
  compareColors: {
    A: defaultHex,
    B: "#D9A46B",
    C: "#8C4B2E"
  },
  companions: {
    main: defaultHex,
    trim: "#D9A46B",
    accent: "#8C4B2E"
  }
};

const photoState = {
  initialized: false,
  imageLoaded: false,
  imageName: "",
  width: 0,
  height: 0,
  baseCanvas: null,
  baseCtx: null,
  maskCanvas: null,
  maskCtx: null,
  blurCanvas: null,
  blurCtx: null,
  overlayCanvas: null,
  overlayCtx: null,
  undoStack: [],
  isDrawing: false,
  lastPoint: null,
  renderPending: false,
  hasMask: false
};

const typeLabels = {
  paint_profile: "Sơn",
  fabric_profile: "Vải"
};

const finishLabels = {
  mo: "Mờ",
  bong: "Bóng"
};

const lightingLabels = {
  trang: "Trắng",
  am: "Ấm",
  tu_nhien: "Tự nhiên"
};

const sceneLabels = {
  living: "Phòng khách",
  bedroom: "Phòng ngủ",
  facade: "Mặt tiền",
  bathroom: "Phòng tắm"
};

const surfaceLabels = {
  tuong: "Tường",
  xi_mang: "Xi măng",
  gach: "Gạch",
  go: "Gỗ"
};

const objectLabels = {
  shirt: "Áo",
  curtain: "Rèm",
  sofa: "Sofa",
  blanket: "Chăn"
};

const fabricLabels = {
  cotton: "Cotton",
  linen: "Linen",
  denim: "Denim",
  silk: "Lụa",
  wool: "Len"
};

const surfaceAreas = {
  tuong: "Phòng khách",
  xi_mang: "Sảnh",
  gach: "Mặt tiền",
  go: "Studio"
};

const paintPresets = {
  tuong: { coverage: 10, waste: 8 },
  xi_mang: { coverage: 8, waste: 12 },
  go: { coverage: 12, waste: 6 }
};

const fabricApplications = {
  cotton: "Áo mặc hằng ngày",
  linen: "Rèm phòng",
  denim: "Trang phục street",
  silk: "Trang phục tiệc",
  wool: "Chăn ấm"
};

const compareModeLabels = {
  off: "Tắt",
  ab: "A/B",
  tri: "Triptych"
};

const paintPresetButtons = [
  { label: "Ấm mềm", lighting: "am", finish: "mo" },
  { label: "Ấm bóng", lighting: "am", finish: "bong" },
  { label: "Trắng tĩnh", lighting: "trang", finish: "mo" },
  { label: "Trắng sáng", lighting: "trang", finish: "bong" },
  { label: "Tự nhiên", lighting: "tu_nhien", finish: "mo" },
  { label: "Studio", lighting: "tu_nhien", finish: "bong" }
];

const fabricPresetButtons = [
  { label: "Lụa bóng", lighting: "am", finish: "bong", texture: "min" },
  { label: "Cotton êm", lighting: "tu_nhien", finish: "mo", texture: "min" },
  { label: "Linen thô", lighting: "tu_nhien", finish: "mo", texture: "tho" },
  { label: "Denim lạnh", lighting: "trang", finish: "mo", texture: "tho" },
  { label: "Len ấm", lighting: "am", finish: "mo", texture: "tho" },
  { label: "Sáng sang", lighting: "trang", finish: "bong", texture: "min" }
];

const goalPresets = [
  {
    id: "bedroom_calm",
    label: "Phòng ngủ thư giãn",
    mode: "paint",
    scene: "bedroom",
    surface: "tuong",
    lighting: "am",
    finish: "mo",
    accentShift: -12
  },
  {
    id: "living_luxe",
    label: "Phòng khách sang",
    mode: "paint",
    scene: "living",
    surface: "tuong",
    lighting: "tu_nhien",
    finish: "bong",
    accentShift: 14
  },
  {
    id: "facade_clean",
    label: "Mặt tiền sạch",
    mode: "paint",
    scene: "facade",
    surface: "gach",
    lighting: "trang",
    finish: "mo",
    accentShift: -6
  },
  {
    id: "streetwear",
    label: "Áo streetwear",
    mode: "fabric",
    object: "shirt",
    fabricType: "denim",
    lighting: "trang",
    finish: "mo",
    texture: "tho",
    accentShift: 18
  },
  {
    id: "curtain_minimal",
    label: "Rèm tối giản",
    mode: "fabric",
    object: "curtain",
    fabricType: "linen",
    lighting: "tu_nhien",
    finish: "mo",
    texture: "min",
    accentShift: -8
  }
];

const templates = {
  paint: {
    living: "paint-living.svg",
    bedroom: "paint-bedroom.svg",
    facade: "paint-facade.svg",
    bathroom: "paint-bathroom.svg"
  },
  fabric: {
    shirt: "fabric-shirt.svg",
    curtain: "fabric-curtain.svg",
    sofa: "fabric-sofa.svg",
    blanket: "fabric-blanket.svg"
  }
};

const getFeeling = (lighting, finish) => {
  if (lighting === "am") return finish === "bong" ? "Ấm áp" : "Trầm";
  if (lighting === "tu_nhien") return "Tự nhiên";
  return finish === "bong" ? "Sáng" : "Tĩnh";
};

const buildSuggestedName = (type, { lighting, finish, surface, fabricType, scene, object }) => {
  const lightingLabel = lightingLabels[lighting] || "Trắng";
  const finishLabel = finishLabels[finish] || "Mờ";
  const feeling = getFeeling(lighting, finish);
  if (type === "paint_profile") {
    const area = sceneLabels[scene] || surfaceAreas[surface] || "Khu vực chính";
    return `Tường ${area} — Sơn&Vải — ${lightingLabel} · ${finishLabel} · ${feeling} — v01`;
  }
  const application = objectLabels[object] || fabricApplications[fabricType] || "Ứng dụng đa năng";
  const fabricLabel = fabricLabels[fabricType] || "Vải";
  return `${application} — Sơn&Vải — ${lightingLabel} · ${fabricLabel} · ${feeling} — v01`;
};

const quickSeeds = [
  { type: "paint_profile", colorHex: "#C27B4B", finish: "bong", lighting: "am", surface: "go", scene: "living" },
  { type: "paint_profile", colorHex: "#1FB6FF", finish: "mo", lighting: "trang", surface: "tuong", scene: "bedroom" },
  { type: "paint_profile", colorHex: "#2D2A27", finish: "mo", lighting: "tu_nhien", surface: "xi_mang", scene: "facade" },
  { type: "fabric_profile", colorHex: "#F2C4D8", finish: "bong", lighting: "am", fabricType: "silk", textureLevel: "min", object: "shirt" },
  { type: "fabric_profile", colorHex: "#3A5A40", finish: "mo", lighting: "tu_nhien", fabricType: "linen", textureLevel: "tho", object: "curtain" },
  { type: "fabric_profile", colorHex: "#0B1020", finish: "bong", lighting: "trang", fabricType: "wool", textureLevel: "tho", object: "blanket" }
];

const normalizeHex = (value) => {
  if (!value) return null;
  let raw = value.trim().toUpperCase();
  if (!raw) return null;
  if (!raw.startsWith("#")) raw = `#${raw}`;
  if (raw.length === 4) {
    raw = `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`;
  }
  return /^#[0-9A-F]{6}$/.test(raw) ? raw : null;
};

const hexToRgb = (hex) => {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return { r, g, b };
};

const rgbToHex = (r, g, b) => {
  const toHex = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

const applyLighting = (hex, lighting) => {
  const { r, g, b } = hexToRgb(hex);
  if (lighting === "am") return rgbToHex(r + 14, g + 4, b - 10);
  if (lighting === "tu_nhien") return rgbToHex(r + 6, g + 10, b + 2);
  return rgbToHex(r + 4, g + 6, b + 8);
};

const adjust = (hex, amount) => {
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

const hslToRgb = (h, s, l) => {
  const sat = Math.max(0, Math.min(100, s)) / 100;
  const light = Math.max(0, Math.min(100, l)) / 100;
  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = light - c / 2;
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (h < 60) {
    r1 = c; g1 = x; b1 = 0;
  } else if (h < 120) {
    r1 = x; g1 = c; b1 = 0;
  } else if (h < 180) {
    r1 = 0; g1 = c; b1 = x;
  } else if (h < 240) {
    r1 = 0; g1 = x; b1 = c;
  } else if (h < 300) {
    r1 = x; g1 = 0; b1 = c;
  } else {
    r1 = c; g1 = 0; b1 = x;
  }
  return {
    r: (r1 + m) * 255,
    g: (g1 + m) * 255,
    b: (b1 + m) * 255
  };
};

const shiftHue = (hex, shift, satShift = 0, lightShift = 0) => {
  const { r, g, b } = hexToRgb(hex);
  const hsl = rgbToHsl(r, g, b);
  const h = (hsl.h + shift + 360) % 360;
  const s = Math.max(6, Math.min(92, hsl.s + satShift));
  const l = Math.max(8, Math.min(92, hsl.l + lightShift));
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
};

const deriveCompanionColors = (hex, presetId) => {
  const base = normalizeHex(hex) || defaultHex;
  const preset = goalPresets.find((item) => item.id === presetId);
  const accentShift = preset?.accentShift ?? 12;
  const trim = shiftHue(base, 0, -12, 10);
  const accent = shiftHue(base, accentShift, 12, -4);
  return { main: base, trim, accent };
};

const setStatus = (message) => {
  if (!elements.status) return;
  elements.status.textContent = message || "";
};

const setPaintCalcError = (message) => {
  if (!elements.paintCalcError) return;
  elements.paintCalcError.textContent = message || "";
};

const loadPaintCalc = () => {
  try {
    const raw = localStorage.getItem(PAINT_CALC_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (_err) {
    return null;
  }
};

const savePaintCalc = (calc) => {
  try {
    localStorage.setItem(PAINT_CALC_KEY, JSON.stringify(calc));
  } catch (_err) {}
};

const readNumber = (value) => {
  const num = Number.parseFloat(value);
  return Number.isFinite(num) ? num : null;
};

const formatLiters = (value) => {
  if (!Number.isFinite(value)) return "--";
  return `${value.toFixed(2)} L`;
};

const buildComboOptions = (litersNeeded) => {
  if (!Number.isFinite(litersNeeded) || litersNeeded <= 0) return [];
  const max18 = Math.max(0, Math.ceil(litersNeeded / 18) + 2);
  const max5 = Math.max(0, Math.ceil(litersNeeded / 5) + 3);
  const options = [];
  for (let a = 0; a <= max18; a += 1) {
    for (let b = 0; b <= max5; b += 1) {
      const base = 18 * a + 5 * b;
      const remaining = Math.max(0, litersNeeded - base);
      const c = Math.ceil(remaining);
      const total = base + c;
      if (total <= 0) continue;
      options.push({
        a,
        b,
        c,
        total,
        waste: total - litersNeeded
      });
    }
  }
  options.sort((left, right) => {
    if (left.waste !== right.waste) return left.waste - right.waste;
    if (left.total !== right.total) return left.total - right.total;
    return (left.a + left.b + left.c) - (right.a + right.b + right.c);
  });
  return options.slice(0, 3);
};

const renderCombos = (combos, pricePerLiter) => {
  if (!elements.paintCombos) return;
  if (!combos.length) {
    elements.paintCombos.textContent = "Chưa đủ dữ liệu để gợi ý.";
    return;
  }
  elements.paintCombos.innerHTML = "";
  combos.forEach((combo, index) => {
    const line = document.createElement("div");
    const parts = [];
    if (combo.a) parts.push(`${combo.a} x 18L`);
    if (combo.b) parts.push(`${combo.b} x 5L`);
    if (combo.c) parts.push(`${combo.c} x 1L`);
    const waste = combo.waste.toFixed(2);
    const label = parts.join(" + ") || "1 x 1L";
    const cost = Number.isFinite(pricePerLiter) && pricePerLiter > 0
      ? ` · Ước tính ${(combo.total * pricePerLiter).toLocaleString("vi-VN")}đ`
      : "";
    line.textContent = `${index + 1}. ${label} = ${combo.total}L (dư ${waste}L)${cost}`;
    elements.paintCombos.appendChild(line);
  });
};

const updatePaintCalc = () => {
  if (!elements.paintPanel || elements.paintPanel.classList.contains("hidden")) return;
  const area = readNumber(elements.paintArea?.value);
  const coats = readNumber(elements.paintCoats?.value);
  const coverage = readNumber(elements.paintCoverage?.value);
  const waste = readNumber(elements.paintWaste?.value);
  const price = readNumber(elements.paintPrice?.value);

  if (!area || area <= 0) {
    setPaintCalcError("Vui lòng nhập diện tích hợp lệ.");
    if (elements.paintLiters) elements.paintLiters.textContent = "--";
    renderCombos([], price);
    return;
  }
  if (!coats || coats <= 0) {
    setPaintCalcError("Vui lòng nhập số lớp hợp lệ.");
    if (elements.paintLiters) elements.paintLiters.textContent = "--";
    renderCombos([], price);
    return;
  }
  if (!coverage || coverage <= 0) {
    setPaintCalcError("Vui lòng nhập độ phủ hợp lệ.");
    if (elements.paintLiters) elements.paintLiters.textContent = "--";
    renderCombos([], price);
    return;
  }
  if (waste == null || waste < 0) {
    setPaintCalcError("Vui lòng nhập hao hụt hợp lệ.");
    if (elements.paintLiters) elements.paintLiters.textContent = "--";
    renderCombos([], price);
    return;
  }

  setPaintCalcError("");
  const litersNeeded = (area / coverage) * coats * (1 + waste / 100);
  if (elements.paintLiters) elements.paintLiters.textContent = formatLiters(litersNeeded);
  const combos = buildComboOptions(litersNeeded);
  renderCombos(combos, price);
  savePaintCalc({
    area,
    coats,
    coverage,
    waste,
    price: Number.isFinite(price) ? price : null
  });
};

const applyPaintPreset = () => {
  const surface = elements.surface?.value || "tuong";
  const preset = paintPresets[surface] || paintPresets.tuong;
  if (elements.paintCoverage) elements.paintCoverage.value = preset.coverage;
  if (elements.paintWaste) elements.paintWaste.value = preset.waste;
};

const getAssets = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_err) {
    return [];
  }
};

const getCurrentProject = () => {
  try {
    return localStorage.getItem(PROJECT_STORAGE_KEY) || "";
  } catch (_err) {
    return "";
  }
};

const addAssetToLibrary = (asset) => {
  try {
    const raw = localStorage.getItem(ASSET_LIBRARY_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const next = Array.isArray(list) ? list : [];
    next.unshift(asset);
    localStorage.setItem(ASSET_LIBRARY_KEY, JSON.stringify(next));
    return true;
  } catch (_err) {
    return false;
  }
};

const buildLibraryAsset = (spec) => {
  const presetLabel = spec.presetLabel || "Tuỳ chỉnh";
  const modeTag = spec.type === "paint_profile" ? "sơn" : "vải";
  const tags = [
    "paintfabric",
    modeTag,
    presetLabel ? `preset:${presetLabel}` : null,
    spec.finish ? `finish:${spec.finish}` : null,
    spec.lighting ? `light:${spec.lighting}` : null
  ].filter(Boolean);
  const colors = [
    spec.colorHex,
    spec.companions?.trim,
    spec.companions?.accent
  ].map((hex) => normalizeHex(hex)).filter(Boolean);
  return {
    id: `asset_${Date.now()}`,
    type: spec.type,
    name: spec.name,
    tags,
    payload: {
      colors,
      preset: { id: spec.presetId || "", label: presetLabel },
      companions: spec.companions || null,
      compare: { mode: spec.compareMode || "off", colors: spec.compareColors || {} },
      materialProfile: {
        colorHex: spec.colorHex,
        finish: spec.finish,
        lighting: spec.lighting,
        surface: spec.surface,
        scene: spec.scene,
        object: spec.object,
        fabricType: spec.fabricType,
        textureLevel: spec.textureLevel,
        textureScale: spec.textureScale
      }
    },
    notes: "Sơn&Vải",
    createdAt: spec.createdAt,
    updatedAt: spec.createdAt,
    sourceWorld: HANDOFF_FROM,
    project: getCurrentProject()
  };
};

const isLoggedIn = () => {
  const auth = window.tcAuth || null;
  if (typeof auth?.isLoggedIn === "function") return auth.isLoggedIn();
  return false;
};

const publishToFeed = (asset) => {
  if (!asset) return false;
  if (!isLoggedIn()) {
    setStatus("Cần đăng nhập để chia sẻ.");
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
    setStatus("Đã chia sẻ lên feed.");
    return true;
  } catch (_err) {
    setStatus("Không thể chia sẻ.");
    return false;
  }
};

const saveAssets = (assets) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
  } catch (_err) {}
};

const buildSpec = () => {
  const hex = normalizeHex(elements.hex?.value) || defaultHex;
  const companions = deriveCompanionColors(hex, state.presetId);
  const activeTab = elements.paintPanel?.classList.contains("hidden") ? "fabric" : "paint";
  const createdAt = new Date().toISOString();
  const paintCalc = activeTab === "paint" ? {
    area: readNumber(elements.paintArea?.value),
    coats: readNumber(elements.paintCoats?.value),
    coverage: readNumber(elements.paintCoverage?.value),
    waste: readNumber(elements.paintWaste?.value),
    price: readNumber(elements.paintPrice?.value)
  } : null;
  const base = {
    id: `pf_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    name: buildSuggestedName(activeTab === "paint" ? "paint_profile" : "fabric_profile", {
      lighting: activeTab === "paint" ? elements.lighting?.value : elements.lightingFabric?.value,
      finish: activeTab === "paint" ? elements.finish?.value : elements.finishFabric?.value,
      surface: elements.surface?.value,
      fabricType: elements.fabricType?.value,
      scene: elements.scene?.value,
      object: elements.object?.value
    }),
    colorHex: hex,
    finish: activeTab === "paint" ? elements.finish?.value : elements.finishFabric?.value,
    lighting: activeTab === "paint" ? elements.lighting?.value : elements.lightingFabric?.value,
    presetId: state.presetId || "",
    presetLabel: state.presetLabel || "Tuỳ chỉnh",
    companions,
    compareMode: state.compareMode,
    compareColors: { ...state.compareColors },
    createdAt,
    project: getCurrentProject()
  };
  if (activeTab === "paint") {
    return {
      ...base,
      type: "paint_profile",
      surface: elements.surface?.value || "tuong",
      scene: elements.scene?.value || "living",
      paintCalc: paintCalc
    };
  }
  return {
    ...base,
    type: "fabric_profile",
    fabricType: elements.fabricType?.value || "cotton",
    textureLevel: elements.texture?.value || "min",
    textureScale: Number(elements.textureScale?.value || 5),
    object: elements.object?.value || "shirt"
  };
};

const buildOneLineSummary = (spec) => {
  const hex = spec.colorHex || defaultHex;
  const preset = spec.presetLabel || "Tuỳ chỉnh";
  const companions = spec.companions || state.companions;
  const trim = companions?.trim || "";
  const accent = companions?.accent || "";
  if (spec.type === "paint_profile") {
    const finishLabel = finishLabels[spec.finish] || spec.finish;
    const lightingLabel = lightingLabels[spec.lighting] || spec.lighting;
    return `World 6 • Sơn • ${hex} • Finish: ${finishLabel} • Ánh sáng: ${lightingLabel} • Preset: ${preset} • Viền: ${trim} • Nhấn: ${accent}`;
  }
  const finishLabel = finishLabels[spec.finish] || spec.finish;
  const lightingLabel = lightingLabels[spec.lighting] || spec.lighting;
  return `World 6 • Vải • ${hex} • Finish: ${finishLabel} • Ánh sáng: ${lightingLabel} • Preset: ${preset} • Viền: ${trim} • Nhấn: ${accent}`;
};

const buildExportPayload = (specInput) => {
  const spec = specInput || buildSpec();
  return {
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    mode: spec.type === "paint_profile" ? "paint" : "fabric",
    hex: spec.colorHex,
    preset: { id: spec.presetId || "", label: spec.presetLabel || "Tuỳ chỉnh" },
    lighting: spec.lighting,
    finish: spec.finish,
    texture: spec.textureLevel || null,
    textureScale: spec.textureScale || null,
    scene: spec.scene || null,
    surface: spec.surface || null,
    object: spec.object || null,
    fabricType: spec.fabricType || null,
    companions: spec.companions || null,
    compare: { mode: spec.compareMode || "off", colors: spec.compareColors || {} },
    paintCalc: spec.paintCalc || null,
    summary: buildOneLineSummary(spec)
  };
};

const handleCopySummaryLine = async () => {
  const summary = buildOneLineSummary(buildSpec());
  const ok = await copyToClipboard(summary);
  setStatus(ok ? "Đã sao chép tóm tắt." : "Không thể sao chép tóm tắt.");
};

const handleExportJson = () => {
  const payload = buildExportPayload();
  const hex = normalizeHex(elements.hex?.value) || defaultHex;
  const modeLabel = payload.mode === "paint" ? "son" : "vai";
  const filename = `world6-${modeLabel}-${hex.replace("#", "")}.json`;
  const ok = downloadBlob(JSON.stringify(payload, null, 2), filename, "application/json");
  setStatus(ok ? "Đã xuất JSON." : "Không thể xuất JSON.");
};

const handleOpenPalette = () => {
  const colors = getCompanionList();
  if (colors.length < 2) {
    setStatus("Chưa đủ màu để mở Palette.");
    return;
  }
  const payload = encodeURIComponent(JSON.stringify({ colors }));
  const query = composeHandoff({
    from: HANDOFF_FROM,
    intent: "open",
    projectId: getCurrentProject()
  });
  window.location.href = `palette.html${query}#p=${payload}`;
};

const handleOpenGradient = () => {
  const colors = getCompanionList();
  if (colors.length < 2) {
    setStatus("Chưa đủ màu để mở Gradient.");
    return;
  }
  const payload = encodeURIComponent(colors.join(","));
  const query = composeHandoff({
    from: HANDOFF_FROM,
    intent: "open",
    projectId: getCurrentProject()
  });
  window.location.href = `gradient.html${query}#g=${payload}`;
};

const renderSpec = (spec) => {
  if (!elements.spec) return;
  const typeLabel = typeLabels[spec.type] || spec.type;
  const surfaceLabel = spec.surface ? `Bề mặt: ${surfaceLabels[spec.surface] || spec.surface}` : `Loại vải: ${fabricLabels[spec.fabricType] || spec.fabricType}`;
  const textureLabel = spec.textureLevel ? `Độ vân: ${spec.textureLevel}` : "";
  const textureScale = spec.textureScale ? `Tỷ lệ texture: ${spec.textureScale}` : "";
  const sceneLabel = spec.scene ? `Bối cảnh: ${sceneLabels[spec.scene] || spec.scene}` : "";
  const objectLabel = spec.object ? `Vật thể: ${objectLabels[spec.object] || spec.object}` : "";
  const lines = [
    `Tên: ${spec.name}`,
    `Loại: ${typeLabel}`,
    `Màu HEX: ${spec.colorHex}`,
    `Độ bóng: ${spec.finish}`,
    `Ánh sáng: ${spec.lighting}`,
    surfaceLabel,
    sceneLabel,
    objectLabel,
    textureLabel,
    textureScale,
    `Tạo lúc: ${spec.createdAt}`,
    "",
    "JSON:",
    JSON.stringify(spec, null, 2)
  ].filter(Boolean);
  elements.spec.textContent = lines.join("\n");
};

const loadSvgTemplate = async (type, key) => {
  const file = templates[type]?.[key];
  if (!file) return null;
  const path = `${TEMPLATE_BASE}/${file}`;
  if (svgCache.has(path)) return svgCache.get(path);
  const response = await fetch(path, { cache: "force-cache" });
  if (!response.ok) return null;
  const text = await response.text();
  svgCache.set(path, text);
  return text;
};

const sanitizeSvgMarkup = (svgText) => {
  return svgText.replace(
    /\b(data-pf-[a-z0-9_-]+)(?!\s*=\s*)(?=\s|\/?>)/gi,
    '$1="1"'
  );
};

const buildSvgFallback = (label) => {
  const safeLabel = label || "Preview đang lỗi template";
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" role="img" aria-label="Preview lỗi">
      <rect width="600" height="400" fill="#f2f2f2"/>
      <rect x="24" y="24" width="552" height="352" rx="18" fill="#ffffff" stroke="#d6d6d6"/>
      <text x="300" y="210" text-anchor="middle" fill="#444" font-size="18" font-family="system-ui, -apple-system, Segoe UI, sans-serif">${safeLabel}</text>
    </svg>
  `;
};

const buildSvgLayer = (svgText, options, meta) => {
  const previewLabel = "Preview đang lỗi template";
  if (!svgText || svgText.slice(0, 200).indexOf("<svg") === -1) {
    console.warn("[paintfabric] SVG template không hợp lệ.", meta);
    return buildSvgFallback(previewLabel);
  }
  const cleanedSvg = sanitizeSvgMarkup(svgText);
  const parser = new DOMParser();
  const doc = parser.parseFromString(cleanedSvg, "image/svg+xml");
  const parserError = doc.querySelector("parsererror");
  if (parserError) {
    console.warn("[paintfabric] Parsererror khi parse SVG.", meta);
    return buildSvgFallback(previewLabel);
  }
  const svg = doc.documentElement;
  const fill = svg.querySelector("[data-pf-fill]");
  if (fill) fill.setAttribute("fill", options.color);
  const texture = svg.querySelector("[data-pf-texture]");
  if (texture) texture.setAttribute("opacity", String(options.textureOpacity));
  const noise = svg.querySelector("#pfNoise feTurbulence");
  if (noise) noise.setAttribute("baseFrequency", String(options.noiseFrequency));
  return svg.outerHTML;
};

const parseSvgSize = (svgText) => {
  const viewBoxMatch = svgText.match(/viewBox="[^"]*?0\s+0\s+([\d.]+)\s+([\d.]+)"/i);
  if (viewBoxMatch) {
    const width = Number.parseFloat(viewBoxMatch[1]);
    const height = Number.parseFloat(viewBoxMatch[2]);
    if (Number.isFinite(width) && Number.isFinite(height)) {
      return { width, height };
    }
  }
  const widthMatch = svgText.match(/width="([\d.]+)"/i);
  const heightMatch = svgText.match(/height="([\d.]+)"/i);
  const width = widthMatch ? Number.parseFloat(widthMatch[1]) : 600;
  const height = heightMatch ? Number.parseFloat(heightMatch[1]) : 400;
  return {
    width: Number.isFinite(width) ? width : 600,
    height: Number.isFinite(height) ? height : 400
  };
};

const svgToImage = (svgText) => new Promise((resolve, reject) => {
  const blob = new Blob([svgText], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    URL.revokeObjectURL(url);
    resolve(img);
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
    reject(new Error("Không thể nạp SVG."));
  };
  img.src = url;
});

const getTriptych = () => {
  try {
    const raw = localStorage.getItem(TRIPTYCH_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [null, null, null];
  } catch (_err) {
    return [null, null, null];
  }
};

const saveTriptych = (slots) => {
  try {
    localStorage.setItem(TRIPTYCH_KEY, JSON.stringify(slots));
  } catch (_err) {}
};

const setPresetSelection = (preset) => {
  if (!preset) {
    state.presetId = "";
    state.presetLabel = "Tuỳ chỉnh";
    return;
  }
  state.presetId = preset.id;
  state.presetLabel = preset.label;
  try {
    localStorage.setItem(LAST_PRESET_KEY, preset.id);
  } catch (_err) {}
};

const markPresetCustom = () => {
  if (!state.presetId && state.presetLabel === "Tuỳ chỉnh") return;
  state.presetId = "";
  state.presetLabel = "Tuỳ chỉnh";
};

const applyGoalPreset = (preset) => {
  if (!preset) return;
  if (preset.mode === "paint") {
    updateTabs("paint");
    if (elements.scene && preset.scene) elements.scene.value = preset.scene;
    if (elements.surface && preset.surface) elements.surface.value = preset.surface;
    if (elements.lighting && preset.lighting) elements.lighting.value = preset.lighting;
    if (elements.finish && preset.finish) elements.finish.value = preset.finish;
  } else {
    updateTabs("fabric");
    if (elements.object && preset.object) elements.object.value = preset.object;
    if (elements.fabricType && preset.fabricType) elements.fabricType.value = preset.fabricType;
    if (elements.lightingFabric && preset.lighting) elements.lightingFabric.value = preset.lighting;
    if (elements.finishFabric && preset.finish) elements.finishFabric.value = preset.finish;
    if (elements.texture && preset.texture) elements.texture.value = preset.texture;
  }
  setPresetSelection(preset);
  if (state.compareMode !== "off") {
    const companions = deriveCompanionColors(state.compareColors.A, preset.id);
    if (state.compareMode === "ab") {
      state.compareColors.B = companions.trim;
    }
    if (state.compareMode === "tri") {
      state.compareColors.B = companions.trim;
      state.compareColors.C = companions.accent;
    }
  }
  scheduleSyncUI();
};

const loadLastPreset = () => {
  try {
    const presetId = localStorage.getItem(LAST_PRESET_KEY);
    if (!presetId) return null;
    return goalPresets.find((preset) => preset.id === presetId) || null;
  } catch (_err) {
    return null;
  }
};

const renderPresets = () => {
  if (!elements.presets) return;
  elements.presets.innerHTML = "";
  goalPresets.forEach((preset) => {
    const btn = document.createElement("button");
    btn.type = "button";
    const isActive = state.presetId === preset.id;
    btn.className = `tc-btn tc-chip px-3 py-2 text-xs${isActive ? " tc-btn-primary" : ""}`;
    btn.textContent = preset.label;
    btn.addEventListener("click", () => applyGoalPreset(preset));
    elements.presets.appendChild(btn);
  });
};

const renderTriptych = () => {
  if (!elements.triptych) return;
  const slots = getTriptych();
  elements.triptych.innerHTML = "";
  ["A", "B", "C"].forEach((label, index) => {
    const card = document.createElement("div");
    card.className = "tc-card p-3 flex flex-col gap-2";
    const heading = document.createElement("div");
    heading.className = "text-xs font-semibold";
    heading.textContent = `Phương án ${label}`;
    const summary = document.createElement("div");
    summary.className = "text-xs tc-muted";
    summary.textContent = slots[index] ? buildOneLineSummary(slots[index]) : "Chưa ghim";
    const actions = document.createElement("div");
    actions.className = "flex flex-wrap gap-2";
    const pinBtn = document.createElement("button");
    pinBtn.type = "button";
    pinBtn.className = "tc-btn tc-chip px-2 py-1 text-xs";
    pinBtn.textContent = "Ghim";
    pinBtn.addEventListener("click", () => {
      const next = getTriptych();
      next[index] = buildSpec();
      saveTriptych(next);
      renderTriptych();
      setStatus(`Đã ghim phương án ${label}.`);
    });
    const useBtn = document.createElement("button");
    useBtn.type = "button";
    useBtn.className = "tc-btn tc-chip px-2 py-1 text-xs";
    useBtn.textContent = "Chọn";
    useBtn.addEventListener("click", () => {
      const current = getTriptych()[index];
      if (!current) return;
      elements.hex.value = current.colorHex || defaultHex;
      if (current.type === "paint_profile") {
        updateTabs("paint");
        elements.finish.value = current.finish || "mo";
        elements.lighting.value = current.lighting || "trang";
        elements.surface.value = current.surface || "tuong";
        if (elements.scene) elements.scene.value = current.scene || "living";
        if (current.paintCalc) {
          if (elements.paintArea && current.paintCalc.area != null) elements.paintArea.value = current.paintCalc.area;
          if (elements.paintCoats && current.paintCalc.coats != null) elements.paintCoats.value = current.paintCalc.coats;
          if (elements.paintCoverage && current.paintCalc.coverage != null) elements.paintCoverage.value = current.paintCalc.coverage;
          if (elements.paintWaste && current.paintCalc.waste != null) elements.paintWaste.value = current.paintCalc.waste;
          if (elements.paintPrice && current.paintCalc.price != null) elements.paintPrice.value = current.paintCalc.price;
        }
      } else {
        updateTabs("fabric");
        elements.finishFabric.value = current.finish || "mo";
        elements.lightingFabric.value = current.lighting || "trang";
        elements.fabricType.value = current.fabricType || "cotton";
        elements.texture.value = current.textureLevel || "min";
        if (elements.textureScale) elements.textureScale.value = current.textureScale || 5;
        if (elements.object) elements.object.value = current.object || "shirt";
      }
      scheduleSyncUI();
      setStatus(`Đã chọn phương án ${label}.`);
    });
    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "tc-btn tc-chip px-2 py-1 text-xs";
    clearBtn.textContent = "Xoá";
    clearBtn.addEventListener("click", () => {
      const next = getTriptych();
      next[index] = null;
      saveTriptych(next);
      renderTriptych();
      setStatus(`Đã xoá phương án ${label}.`);
    });
    actions.append(pinBtn, useBtn, clearBtn);
    card.append(heading, summary, actions);
    elements.triptych.appendChild(card);
  });
};

const getTextureSettings = (type, surface, textureLevel, textureScale, finish) => {
  const levelFactor = textureLevel === "tho" ? 1.2 : 0.8;
  const scale = Math.max(1, Math.min(10, textureScale || 5));
  const scaleFactor = 0.7 + scale * 0.05;
  let surfaceFactor = 1;
  if (surface === "xi_mang") surfaceFactor = 1.25;
  if (surface === "gach") surfaceFactor = 1.35;
  if (surface === "go") surfaceFactor = 1.15;
  const glossFactor = finish === "bong" ? 0.7 : 1;
  const textureOpacity = Math.min(0.35, 0.12 * levelFactor * surfaceFactor * glossFactor);
  const noiseFrequency = (type === "fabric" ? 0.9 : 0.75) * scaleFactor;
  return { textureOpacity: Number(textureOpacity.toFixed(2)), noiseFrequency: Number(noiseFrequency.toFixed(2)) };
};

const updateCompareUI = () => {
  if (elements.compareSliderWrap) {
    elements.compareSliderWrap.classList.toggle("hidden", state.compareMode !== "ab");
  }
  if (elements.compareSlots) {
    elements.compareSlots.classList.toggle("hidden", state.compareMode === "off");
  }
  if (elements.compareModes) {
    elements.compareModes.querySelectorAll("[data-compare-mode]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.compareMode === state.compareMode);
    });
  }
  if (elements.compareSlots) {
    elements.compareSlots.querySelectorAll("[data-compare-slot]").forEach((btn) => {
      const slot = btn.dataset.compareSlot;
      const show = state.compareMode === "tri" || slot !== "C";
      btn.classList.toggle("hidden", state.compareMode !== "tri" && slot === "C");
      btn.classList.toggle("is-active", slot === state.compareSlot && show);
    });
  }
  const compareValue = Number(elements.compare?.value || 60);
  if (elements.compareLabel) {
    const label = compareModeLabels[state.compareMode] || "Tắt";
    elements.compareLabel.textContent = state.compareMode === "ab"
      ? `${label}: ${compareValue}%`
      : label;
  }
  const compareNode = elements.preview?.querySelector(".pf-compare");
  if (compareNode) {
    compareNode.style.setProperty("--pf-compare", `${compareValue}%`);
  }
};

const setCompareMode = (mode) => {
  const next = compareModeLabels[mode] ? mode : "off";
  state.compareMode = next;
  if (next === "off") {
    state.compareSlot = "A";
    if (elements.hex) elements.hex.value = state.compareColors.A;
  } else if (next === "ab") {
    if (!state.compareColors.B || state.compareColors.B === state.compareColors.A) {
      state.compareColors.B = deriveCompanionColors(state.compareColors.A, state.presetId).trim;
    }
    state.compareSlot = "A";
    if (elements.hex) elements.hex.value = state.compareColors.A;
  } else if (next === "tri") {
    const companions = deriveCompanionColors(state.compareColors.A, state.presetId);
    state.compareColors.B = companions.trim;
    state.compareColors.C = companions.accent;
    state.compareSlot = "A";
    if (elements.hex) elements.hex.value = state.compareColors.A;
  }
  updateCompareUI();
  scheduleSyncUI();
};

const setCompareSlot = (slot) => {
  if (!slot) return;
  state.compareSlot = slot;
  if (elements.hex) elements.hex.value = state.compareColors[slot] || state.compareColors.A;
  updateCompareUI();
  scheduleSyncUI();
};

const updateCompanionUI = () => {
  const companions = state.companions;
  if (elements.companionMain) elements.companionMain.style.background = companions.main;
  if (elements.companionTrim) elements.companionTrim.style.background = companions.trim;
  if (elements.companionAccent) elements.companionAccent.style.background = companions.accent;
  if (elements.companionMainHex) elements.companionMainHex.textContent = companions.main;
  if (elements.companionTrimHex) elements.companionTrimHex.textContent = companions.trim;
  if (elements.companionAccentHex) elements.companionAccentHex.textContent = companions.accent;
  if (elements.companionPreview) {
    const layers = elements.companionPreview.querySelectorAll(".pf-companion-layer");
    layers.forEach((layer) => {
      const role = layer.dataset.role;
      if (role === "trim") layer.style.background = companions.trim;
      else if (role === "accent") layer.style.background = companions.accent;
      else layer.style.background = companions.main;
    });
  }
};

const getCompanionList = () => {
  const base = normalizeHex(elements.hex?.value) || defaultHex;
  const companions = deriveCompanionColors(base, state.presetId);
  state.companions = companions;
  updateCompanionUI();
  return [companions.main, companions.trim, companions.accent].filter(Boolean);
};

const updateSummaryBar = () => {
  if (!elements.summaryBar) return;
  const hex = state.companions.main;
  if (elements.summaryHex) elements.summaryHex.textContent = hex;
  if (elements.summaryMode) {
    elements.summaryMode.textContent = state.mode === "paint" ? "Sơn" : "Vải";
  }
  if (elements.summaryPreset) {
    elements.summaryPreset.textContent = state.presetLabel || "Tuỳ chỉnh";
  }
  if (elements.summaryCompare) {
    elements.summaryCompare.textContent = compareModeLabels[state.compareMode] || "Tắt";
  }
  if (elements.summaryMaterial) {
    const finish = state.mode === "paint" ? elements.finish?.value : elements.finishFabric?.value;
    const lighting = state.mode === "paint" ? elements.lighting?.value : elements.lightingFabric?.value;
    const texture = state.mode === "paint" ? "—" : (elements.texture?.value || "min");
    const finishLabel = finishLabels[finish] || finish;
    const lightingLabel = lightingLabels[lighting] || lighting;
    const textureLabel = state.mode === "paint" ? "" : ` · ${texture === "tho" ? "Thô" : "Mịn"}`;
    elements.summaryMaterial.textContent = `${finishLabel} · ${lightingLabel}${textureLabel}`;
  }
};

const scheduleSyncUI = () => {
  if (rafScheduled) return;
  rafScheduled = true;
  requestAnimationFrame(() => {
    rafScheduled = false;
    syncUI();
  });
};

const updatePreview = async () => {
  if (!elements.preview) return;
  const renderToken = ++previewRenderSeq;
  const activeTab = elements.paintPanel?.classList.contains("hidden") ? "fabric" : "paint";
  const finish = activeTab === "paint" ? elements.finish?.value || "mo" : elements.finishFabric?.value || "mo";
  const lighting = activeTab === "paint" ? elements.lighting?.value || "trang" : elements.lightingFabric?.value || "trang";
  const surface = elements.surface?.value || "tuong";
  const scene = elements.scene?.value || "living";
  const object = elements.object?.value || "shirt";
  const textureLevel = activeTab === "paint" ? "min" : elements.texture?.value || "min";
  const textureScale = Number(elements.textureScale?.value || 5);
  const compareValue = `${Number(elements.compare?.value || 60)}%`;

  const svgText = await loadSvgTemplate(activeTab, activeTab === "paint" ? scene : object);
  if (!svgText) return;
  if (renderToken !== previewRenderSeq) return;

  const textureSettings = getTextureSettings(
    activeTab,
    surface,
    textureLevel,
    textureScale,
    finish
  );
  const colorA = applyLighting(state.compareColors.A || defaultHex, lighting);
  const colorB = applyLighting(state.compareColors.B || state.compareColors.A || defaultHex, lighting);
  const colorC = applyLighting(state.compareColors.C || state.compareColors.A || defaultHex, lighting);

  const buildLayer = (color, opacityScale = 1) => buildSvgLayer(svgText, {
    color,
    textureOpacity: textureSettings.textureOpacity * opacityScale,
    noiseFrequency: textureSettings.noiseFrequency
  }, { type: activeTab, key: activeTab === "paint" ? scene : object });

  if (renderToken !== previewRenderSeq) return;
  if (state.compareMode === "tri") {
    elements.preview.innerHTML = `
      <div class="pf-triptych-grid">
        <div class="pf-triptych-card">
          <div class="pf-triptych-label">A</div>
          <div class="pf-layer">${buildLayer(colorA, 0.95)}</div>
        </div>
        <div class="pf-triptych-card">
          <div class="pf-triptych-label">B</div>
          <div class="pf-layer">${buildLayer(colorB, 0.95)}</div>
        </div>
        <div class="pf-triptych-card">
          <div class="pf-triptych-label">C</div>
          <div class="pf-layer">${buildLayer(colorC, 0.95)}</div>
        </div>
      </div>
    `;
  } else if (state.compareMode === "ab") {
    elements.preview.innerHTML = `
      <div class="pf-compare" style="--pf-compare:${compareValue};">
        <div class="pf-layer pf-before">${buildLayer(colorA, 0.9)}</div>
        <div class="pf-layer pf-after">${buildLayer(colorB, 1)}</div>
      </div>
    `;
  } else {
    elements.preview.innerHTML = `
      <div class="pf-layer">${buildLayer(colorA, 1)}</div>
    `;
  }
  updateCompareUI();
};

const exportPreviewPng = async () => {
  syncState();
  const activeTab = elements.paintPanel?.classList.contains("hidden") ? "fabric" : "paint";
  const finish = activeTab === "paint" ? elements.finish?.value || "mo" : elements.finishFabric?.value || "mo";
  const lighting = activeTab === "paint" ? elements.lighting?.value || "trang" : elements.lightingFabric?.value || "trang";
  const surface = elements.surface?.value || "tuong";
  const scene = elements.scene?.value || "living";
  const object = elements.object?.value || "shirt";
  const textureLevel = activeTab === "paint" ? "min" : elements.texture?.value || "min";
  const textureScale = Number(elements.textureScale?.value || 5);
  const compareValue = Number(elements.compare?.value || 60);
  const svgText = await loadSvgTemplate(activeTab, activeTab === "paint" ? scene : object);
  if (!svgText) {
    setStatus("Không thể tải preview để xuất PNG.");
    return false;
  }

  const { width, height } = parseSvgSize(svgText);
  const textureSettings = getTextureSettings(
    activeTab,
    surface,
    textureLevel,
    textureScale,
    finish
  );
  const colorA = applyLighting(state.compareColors.A || defaultHex, lighting);
  const colorB = applyLighting(state.compareColors.B || state.compareColors.A || defaultHex, lighting);
  const colorC = applyLighting(state.compareColors.C || state.compareColors.A || defaultHex, lighting);
  const buildLayer = (color, opacityScale = 1) => buildSvgLayer(svgText, {
    color,
    textureOpacity: textureSettings.textureOpacity * opacityScale,
    noiseFrequency: textureSettings.noiseFrequency
  }, { type: activeTab, key: activeTab === "paint" ? scene : object });

  try {
    const [imgA, imgB, imgC] = await Promise.all([
      svgToImage(buildLayer(colorA, 0.95)),
      svgToImage(buildLayer(colorB, 0.95)),
      svgToImage(buildLayer(colorC, 0.95))
    ]);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setStatus("Không thể xuất PNG.");
      return false;
    }
    if (state.compareMode === "tri") {
      const colWidth = width / 3;
      ctx.drawImage(imgA, 0, 0, colWidth, height);
      ctx.drawImage(imgB, colWidth, 0, colWidth, height);
      ctx.drawImage(imgC, colWidth * 2, 0, colWidth, height);
    } else if (state.compareMode === "ab") {
      ctx.drawImage(imgA, 0, 0, width, height);
      const clipX = width * (compareValue / 100);
      ctx.save();
      ctx.beginPath();
      ctx.rect(clipX, 0, width - clipX, height);
      ctx.clip();
      ctx.drawImage(imgB, 0, 0, width, height);
      ctx.restore();
    } else {
      ctx.drawImage(imgA, 0, 0, width, height);
    }
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) {
      setStatus("Không thể xuất PNG.");
      return false;
    }
    const hex = normalizeHex(elements.hex?.value) || defaultHex;
    const modeLabel = activeTab === "paint" ? "son" : "vai";
    const filename = `world6-${modeLabel}-${hex.replace("#", "")}.png`;
    downloadBlob(blob, filename, "image/png");
    setStatus("Đã xuất PNG.");
    return true;
  } catch (_err) {
    setStatus("Không thể xuất PNG.");
    return false;
  }
};

const syncState = () => {
  const isPaint = !elements.paintPanel?.classList.contains("hidden");
  state.mode = isPaint ? "paint" : "fabric";
  const hex = normalizeHex(elements.hex?.value) || defaultHex;
  if (state.compareMode === "off") {
    state.compareColors.A = hex;
  } else if (state.compareSlot) {
    state.compareColors[state.compareSlot] = hex;
  }
  state.companions = deriveCompanionColors(state.compareColors.A, state.presetId);
  updateCompanionUI();
  updateSummaryBar();
};

const syncUI = () => {
  syncState();
  const spec = buildSpec();
  renderSpec(spec);
  updatePreview().catch(() => {});
  updatePaintCalc();
  renderPresets();
};

const updateTabs = (target) => {
  const isPaint = target === "paint";
  elements.paintPanel?.classList.toggle("hidden", !isPaint);
  elements.fabricPanel?.classList.toggle("hidden", isPaint);
  Array.from(elements.tabs?.querySelectorAll("button") || []).forEach((btn) => {
    const active = btn.dataset.tab === target;
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
  syncUI();
};

const populateSavedSelect = (assets) => {
  if (!elements.savedSelect) return;
  const current = elements.savedSelect.value;
  elements.savedSelect.innerHTML = '<option value="">-- Chọn tài sản --</option>';
  assets.forEach((asset) => {
    const option = document.createElement("option");
    option.value = asset.id;
    option.textContent = `${asset.name} · ${typeLabels[asset.type] || asset.type}`;
    elements.savedSelect.appendChild(option);
  });
  if (current) elements.savedSelect.value = current;
};

const addAsset = (asset) => {
  const assets = getAssets();
  assets.unshift(asset);
  saveAssets(assets);
  populateSavedSelect(assets);
};

const loadAsset = (asset) => {
  if (!asset) return;
  elements.hex.value = asset.colorHex || defaultHex;
  if (asset.type === "paint_profile") {
    updateTabs("paint");
    elements.finish.value = asset.finish || "mo";
    elements.lighting.value = asset.lighting || "trang";
    elements.surface.value = asset.surface || "tuong";
    if (elements.scene) elements.scene.value = asset.scene || "living";
  } else {
    updateTabs("fabric");
    elements.finishFabric.value = asset.finish || "mo";
    elements.lightingFabric.value = asset.lighting || "trang";
    elements.fabricType.value = asset.fabricType || "cotton";
    elements.texture.value = asset.textureLevel || "min";
    if (elements.textureScale) elements.textureScale.value = asset.textureScale || 5;
    if (elements.object) elements.object.value = asset.object || "shirt";
  }
  syncUI();
};

const copyToClipboard = async (text) => {
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

const downloadBlob = (data, filename, type) => {
  if (!data) return false;
  const blob = data instanceof Blob ? data : new Blob([data], { type: type || "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || "download";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  return true;
};

const setPhotoStatus = (message) => {
  if (!elements.photoStatus) return;
  elements.photoStatus.textContent = message || "";
};

const updatePhotoLabels = () => {
  if (elements.photoBrushValue && elements.photoBrush) {
    elements.photoBrushValue.textContent = elements.photoBrush.value;
  }
  if (elements.photoFeatherValue && elements.photoFeather) {
    elements.photoFeatherValue.textContent = elements.photoFeather.value;
  }
  if (elements.photoOpacityValue && elements.photoOpacity) {
    elements.photoOpacityValue.textContent = `${elements.photoOpacity.value}%`;
  }
  if (elements.photoCompareValue && elements.photoCompare) {
    const value = Number(elements.photoCompare.value || 0);
    elements.photoCompareValue.textContent = value <= 0 ? "Trước" : `Sau ${value}%`;
  }
};

const getPhotoSettings = () => ({
  brushSize: Number(elements.photoBrush?.value || 24),
  feather: Number(elements.photoFeather?.value || 0),
  opacity: Number(elements.photoOpacity?.value || 70) / 100,
  blendMode: elements.photoBlend?.value || "source-over",
  compare: Number(elements.photoCompare?.value || 100)
});

const ensurePhotoCanvases = (width, height) => {
  if (!elements.photoCanvas) return false;
  if (!photoState.baseCanvas) {
    photoState.baseCanvas = document.createElement("canvas");
    photoState.baseCtx = photoState.baseCanvas.getContext("2d");
    photoState.maskCanvas = document.createElement("canvas");
    photoState.maskCtx = photoState.maskCanvas.getContext("2d");
    photoState.blurCanvas = document.createElement("canvas");
    photoState.blurCtx = photoState.blurCanvas.getContext("2d");
    photoState.overlayCanvas = document.createElement("canvas");
    photoState.overlayCtx = photoState.overlayCanvas.getContext("2d");
  }
  [photoState.baseCanvas, photoState.maskCanvas, photoState.blurCanvas, photoState.overlayCanvas, elements.photoCanvas]
    .forEach((canvas) => {
      canvas.width = width;
      canvas.height = height;
    });
  photoState.width = width;
  photoState.height = height;
  const ctx = elements.photoCanvas.getContext("2d");
  photoState.previewCtx = ctx;
  return Boolean(photoState.baseCtx && photoState.maskCtx && photoState.blurCtx && photoState.overlayCtx && ctx);
};

const pushPhotoUndo = () => {
  if (!photoState.maskCtx || !photoState.width) return;
  try {
    const snapshot = photoState.maskCtx.getImageData(0, 0, photoState.width, photoState.height);
    photoState.undoStack.push({ snapshot, hasMask: photoState.hasMask });
    if (photoState.undoStack.length > 20) {
      photoState.undoStack.shift();
    }
  } catch (_err) {}
};

const restorePhotoUndo = () => {
  if (!photoState.maskCtx || !photoState.undoStack.length) return;
  const last = photoState.undoStack.pop();
  if (!last) return;
  photoState.maskCtx.putImageData(last.snapshot, 0, 0);
  photoState.hasMask = last.hasMask;
  schedulePhotoRender();
};

const clearPhotoMask = () => {
  if (!photoState.maskCtx) return;
  pushPhotoUndo();
  photoState.maskCtx.clearRect(0, 0, photoState.width, photoState.height);
  photoState.hasMask = false;
  schedulePhotoRender();
};

const schedulePhotoRender = () => {
  if (photoState.renderPending) return;
  photoState.renderPending = true;
  requestAnimationFrame(() => {
    photoState.renderPending = false;
    renderPhotoPreview();
  });
};

const renderPhotoPreview = () => {
  if (!photoState.previewCtx || !photoState.imageLoaded) return;
  const ctx = photoState.previewCtx;
  const { width, height } = photoState;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(photoState.baseCanvas, 0, 0, width, height);
  if (!photoState.hasMask) return;

  const settings = getPhotoSettings();
  const overlayCtx = photoState.overlayCtx;
  const blurCtx = photoState.blurCtx;
  let maskSource = photoState.maskCanvas;

  if (settings.feather > 0) {
    blurCtx.clearRect(0, 0, width, height);
    blurCtx.filter = `blur(${settings.feather}px)`;
    blurCtx.drawImage(photoState.maskCanvas, 0, 0, width, height);
    blurCtx.filter = "none";
    maskSource = photoState.blurCanvas;
  }

  overlayCtx.clearRect(0, 0, width, height);
  overlayCtx.globalCompositeOperation = "source-over";
  overlayCtx.globalAlpha = 1;
  const hex = normalizeHex(elements.hex?.value) || defaultHex;
  overlayCtx.fillStyle = hex;
  overlayCtx.fillRect(0, 0, width, height);
  overlayCtx.globalCompositeOperation = "destination-in";
  overlayCtx.drawImage(maskSource, 0, 0, width, height);
  overlayCtx.globalCompositeOperation = "source-over";

  ctx.save();
  ctx.globalCompositeOperation = settings.blendMode;
  ctx.globalAlpha = settings.opacity;
  if (settings.compare < 100) {
    ctx.beginPath();
    ctx.rect(0, 0, width * (settings.compare / 100), height);
    ctx.clip();
  }
  ctx.drawImage(photoState.overlayCanvas, 0, 0, width, height);
  ctx.restore();
};

const handlePhotoFile = (file) => {
  if (!file) return;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    URL.revokeObjectURL(url);
    const maxSide = 1600;
    const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));
    if (!ensurePhotoCanvases(width, height)) {
      setPhotoStatus("Không thể khởi tạo canvas.");
      return;
    }
    photoState.baseCtx.clearRect(0, 0, width, height);
    photoState.baseCtx.drawImage(img, 0, 0, width, height);
    photoState.maskCtx.clearRect(0, 0, width, height);
    photoState.undoStack = [];
    photoState.imageLoaded = true;
    photoState.imageName = file.name || "";
    photoState.hasMask = false;
    updatePhotoLabels();
    schedulePhotoRender();
    setPhotoStatus("Ảnh đã sẵn sàng. Hãy vẽ vùng cần tô.");
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
    setPhotoStatus("Không thể đọc ảnh.");
  };
  img.src = url;
};

const getPhotoPoint = (event) => {
  const canvas = elements.photoCanvas;
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY
  };
};

const startPhotoStroke = (event) => {
  if (!photoState.imageLoaded || !photoState.maskCtx) return;
  event.preventDefault();
  const point = getPhotoPoint(event);
  if (!point) return;
  pushPhotoUndo();
  photoState.isDrawing = true;
  photoState.lastPoint = point;
  const settings = getPhotoSettings();
  photoState.maskCtx.strokeStyle = "rgba(255,255,255,1)";
  photoState.maskCtx.lineWidth = settings.brushSize;
  photoState.maskCtx.lineCap = "round";
  photoState.maskCtx.lineJoin = "round";
  photoState.maskCtx.beginPath();
  photoState.maskCtx.moveTo(point.x, point.y);
  photoState.maskCtx.lineTo(point.x + 0.1, point.y + 0.1);
  photoState.maskCtx.stroke();
  photoState.hasMask = true;
  schedulePhotoRender();
};

const movePhotoStroke = (event) => {
  if (!photoState.isDrawing || !photoState.maskCtx) return;
  const point = getPhotoPoint(event);
  if (!point) return;
  photoState.maskCtx.lineTo(point.x, point.y);
  photoState.maskCtx.stroke();
  photoState.lastPoint = point;
  schedulePhotoRender();
};

const endPhotoStroke = () => {
  if (!photoState.isDrawing) return;
  photoState.isDrawing = false;
  photoState.lastPoint = null;
  schedulePhotoRender();
};

const buildPhotoMockAsset = () => {
  if (!elements.photoCanvas || !photoState.imageLoaded) return null;
  const dataUrl = elements.photoCanvas.toDataURL("image/png");
  const settings = getPhotoSettings();
  const hex = normalizeHex(elements.hex?.value) || defaultHex;
  const now = new Date().toISOString();
  const type = state.mode === "paint" ? "paint_visual_mock" : "fabric_visual_mock";
  return {
    id: `asset_${Date.now()}`,
    type,
    name: `Mockup ${state.mode === "paint" ? "Sơn" : "Vải"} ${hex}`,
    tags: ["paintfabric", "mockup", state.mode],
    payload: {
      previewPng: dataUrl,
      hex,
      blendMode: settings.blendMode,
      opacity: settings.opacity,
      brushSize: settings.brushSize,
      feather: settings.feather,
      compare: settings.compare,
      imageName: photoState.imageName,
      size: { width: photoState.width, height: photoState.height }
    },
    notes: "Ảnh của bạn",
    createdAt: now,
    updatedAt: now,
    sourceWorld: HANDOFF_FROM,
    project: getCurrentProject()
  };
};

const handleSavePhotoMock = () => {
  if (!photoState.imageLoaded) {
    setPhotoStatus("Hãy tải ảnh trước khi lưu.");
    return;
  }
  const asset = buildPhotoMockAsset();
  if (!asset) {
    setPhotoStatus("Không thể tạo asset.");
    return;
  }
  const ok = addAssetToLibrary(asset);
  setPhotoStatus(ok ? "Đã lưu mockup vào Thư viện." : "Không thể lưu vào Thư viện.");
};

const initPhotoMode = () => {
  if (photoState.initialized) return;
  if (!elements.photoCanvas) return;
  photoState.initialized = true;
  const placeholderWidth = 720;
  const placeholderHeight = 420;
  ensurePhotoCanvases(placeholderWidth, placeholderHeight);
  photoState.imageLoaded = false;
  updatePhotoLabels();
  elements.photoCanvas.addEventListener("pointerdown", startPhotoStroke);
  elements.photoCanvas.addEventListener("pointermove", movePhotoStroke);
  elements.photoCanvas.addEventListener("pointerup", endPhotoStroke);
  elements.photoCanvas.addEventListener("pointerleave", endPhotoStroke);
  elements.photoCanvas.addEventListener("pointercancel", endPhotoStroke);
  if (elements.photoInput) {
    elements.photoInput.addEventListener("change", () => {
      const file = elements.photoInput.files?.[0];
      if (!file) return;
      handlePhotoFile(file);
    });
  }
  [
    elements.photoBrush,
    elements.photoFeather,
    elements.photoOpacity,
    elements.photoCompare
  ].forEach((input) => {
    input?.addEventListener("input", () => {
      updatePhotoLabels();
      schedulePhotoRender();
    });
  });
  elements.photoBlend?.addEventListener("change", () => {
    schedulePhotoRender();
  });
  elements.photoUndo?.addEventListener("click", restorePhotoUndo);
  elements.photoClear?.addEventListener("click", clearPhotoMask);
  elements.photoSave?.addEventListener("click", handleSavePhotoMock);
};

const handleSave = () => {
  const spec = buildSpec();
  addAsset(spec);
  renderSpec(spec);
  const ok = addAssetToLibrary(buildLibraryAsset(spec));
  setStatus(ok ? "Đã lưu vào Thư viện." : "Đã lưu cục bộ, nhưng chưa thể lưu vào Thư viện.");
};

const handleExport = async () => {
  const spec = buildSpec();
  renderSpec(spec);
  const ok = await copyToClipboard(elements.spec?.textContent || "");
  setStatus(ok ? "Đã sao chép Bản thông số." : "Không thể sao chép Bản thông số.");
};

const handleSeed = () => {
  const now = new Date().toISOString();
  const assets = getAssets();
  quickSeeds.forEach((seed, index) => {
    const suffix = (index + 1).toString().padStart(2, "0");
    assets.unshift({
      id: `pf_seed_${Date.now()}_${suffix}`,
      type: seed.type,
      name: seed.type === "paint_profile" ? `Sơn mẫu ${suffix}` : `Vải mẫu ${suffix}`,
      colorHex: seed.colorHex,
      finish: seed.finish,
      lighting: seed.lighting,
      surface: seed.surface,
      scene: seed.scene,
      fabricType: seed.fabricType,
      textureLevel: seed.textureLevel,
      textureScale: seed.textureScale || 5,
      object: seed.object,
      createdAt: now
    });
  });
  saveAssets(assets);
  populateSavedSelect(assets);
  setStatus("Đã tạo 6 mẫu nhanh để thử.");
};

const bindEvents = () => {
  elements.tabs?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-tab]");
    if (!button) return;
    markPresetCustom();
    updateTabs(button.dataset.tab);
  });

  document.querySelectorAll("[data-quick]").forEach((button) => {
    button.addEventListener("click", () => {
      const hex = normalizeHex(button.dataset.quick);
      if (!hex || !elements.hex) return;
      elements.hex.value = hex;
      markPresetCustom();
      syncUI();
    });
  });

  elements.compareModes?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-compare-mode]");
    if (!btn) return;
    setCompareMode(btn.dataset.compareMode);
  });

  elements.compareSlots?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-compare-slot]");
    if (!btn) return;
    setCompareSlot(btn.dataset.compareSlot);
  });

  [
    elements.hex,
    elements.scene,
    elements.finish,
    elements.lighting,
    elements.surface,
    elements.object,
    elements.fabricType,
    elements.finishFabric,
    elements.lightingFabric,
    elements.texture,
    elements.textureScale,
    elements.compare
  ].forEach((input) => {
    if (input === elements.compare) return;
    input?.addEventListener("input", () => {
      markPresetCustom();
      scheduleSyncUI();
      if (photoState.imageLoaded) schedulePhotoRender();
    });
    input?.addEventListener("change", () => {
      markPresetCustom();
      scheduleSyncUI();
      if (photoState.imageLoaded) schedulePhotoRender();
    });
  });

  [
    elements.paintArea,
    elements.paintCoats,
    elements.paintCoverage,
    elements.paintWaste,
    elements.paintPrice
  ].forEach((input) => {
    input?.addEventListener("input", updatePaintCalc);
    input?.addEventListener("change", updatePaintCalc);
  });

  elements.surface?.addEventListener("change", () => {
    applyPaintPreset();
    updatePaintCalc();
    scheduleSyncUI();
  });
  elements.compare?.addEventListener("input", updateCompareUI);
  elements.compare?.addEventListener("change", updateCompareUI);

  elements.save?.addEventListener("click", handleSave);
  elements.copySummaryLine?.addEventListener("click", handleCopySummaryLine);
  elements.exportJson?.addEventListener("click", handleExportJson);
  elements.exportPng?.addEventListener("click", () => {
    exportPreviewPng();
  });
  elements.openPalette?.addEventListener("click", handleOpenPalette);
  elements.openGradient?.addEventListener("click", handleOpenGradient);
  elements.useLibrary?.addEventListener("click", () => {
    const payload = composeHandoff({
      from: HANDOFF_FROM,
      intent: "use",
      projectId: getCurrentProject()
    });
    window.location.href = `./library.html${payload}`;
  });
  elements.share?.addEventListener("click", () => {
    const spec = buildSpec();
    publishToFeed(buildLibraryAsset(spec));
  });
  elements.export?.addEventListener("click", handleExport);
  elements.seed?.addEventListener("click", handleSeed);
  elements.copyHex?.addEventListener("click", async () => {
    const hex = normalizeHex(elements.hex?.value) || defaultHex;
    const ok = await copyToClipboard(hex);
    setStatus(ok ? `Đã sao chép ${hex}.` : "Không thể sao chép HEX.");
  });
  elements.copySummary?.addEventListener("click", async () => {
    const summary = buildOneLineSummary(buildSpec());
    const ok = await copyToClipboard(summary);
    setStatus(ok ? "Đã sao chép tóm tắt." : "Không thể sao chép tóm tắt.");
  });
  elements.copyJson?.addEventListener("click", async () => {
    const jsonText = JSON.stringify(buildSpec(), null, 2);
    const ok = await copyToClipboard(jsonText);
    setStatus(ok ? "Đã sao chép JSON." : "Không thể sao chép JSON.");
  });

  elements.savedSelect?.addEventListener("change", () => {
    const assets = getAssets();
    const selected = assets.find((asset) => asset.id === elements.savedSelect.value);
    loadAsset(selected);
  });

  elements.photoDetails?.addEventListener("toggle", () => {
    if (elements.photoDetails?.open) {
      initPhotoMode();
      if (photoState.imageLoaded) schedulePhotoRender();
      setPhotoStatus(photoState.imageLoaded ? "Ảnh đã sẵn sàng." : "Tải ảnh để bắt đầu.");
    }
  });
};

const initTopbarHeight = () => {
  const apply = () => {
    const topbar = document.querySelector(".tc-topbar");
    if (!topbar) return false;
    const height = topbar.offsetHeight || 56;
    document.documentElement.style.setProperty("--tc-topbar-h", `${height}px`);
    return true;
  };
  let timer = null;
  const schedule = () => {
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      apply();
    }, 120);
  };
  apply();
  window.setTimeout(() => {
    apply();
  }, 600);
  window.addEventListener("resize", schedule);
};

const init = () => {
  if (elements.hex && !elements.hex.value) {
    elements.hex.value = defaultHex;
  }
  const savedCalc = loadPaintCalc();
  if (savedCalc) {
    if (elements.paintArea && savedCalc.area != null) elements.paintArea.value = savedCalc.area;
    if (elements.paintCoats && savedCalc.coats != null) elements.paintCoats.value = savedCalc.coats;
    if (elements.paintCoverage && savedCalc.coverage != null) elements.paintCoverage.value = savedCalc.coverage;
    if (elements.paintWaste && savedCalc.waste != null) elements.paintWaste.value = savedCalc.waste;
    if (elements.paintPrice && savedCalc.price != null) elements.paintPrice.value = savedCalc.price;
  } else {
    applyPaintPreset();
  }
  populateSavedSelect(getAssets());
  bindEvents();
  initTopbarHeight();
  const lastPreset = loadLastPreset();
  if (lastPreset) {
    applyGoalPreset(lastPreset);
  } else {
    updateTabs("paint");
  }
  if (elements.photoDetails?.open) {
    initPhotoMode();
    setPhotoStatus("Tải ảnh để bắt đầu.");
  }
  setStatus("");
};

init();

const applyHexesFromHub = (detail) => {
  const rawList = Array.isArray(detail?.hexes) ? detail.hexes : [];
  const normalized = rawList.map((hex) => normalizeHex(hex)).filter(Boolean);
  if (!normalized.length || !elements.hex) return;
  setWorkbenchContext(normalized, { worldKey: "paintfabric", source: "hex-apply" });
  elements.hex.value = normalized[0];
  markPresetCustom();
  syncUI();
  if (photoState.imageLoaded) schedulePhotoRender();
};

window.addEventListener("tc:hex-apply", (event) => {
  applyHexesFromHub(event?.detail);
});

bootstrapIncomingHandoff({
  minColors: 1,
  worldKey: "paintfabric",
  applyFn: (hexes) => applyHexesFromHub({ hexes })
});
