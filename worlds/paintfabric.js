import { composeHandoff } from "../scripts/handoff.js";

const STORAGE_KEY = "tc_paintfabric_assets";
const ASSET_LIBRARY_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const FEED_STORAGE_KEY = "tc_community_feed";
const HANDOFF_FROM = "paintfabric";
const TEMPLATE_BASE = "../assets/material_scenes";
const PAINT_CALC_KEY = "tc_paint_calc_v1";

const elements = {
  tabs: document.getElementById("pfTabs"),
  hex: document.getElementById("pfHex"),
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
  paintPanel: document.getElementById("pfPaintPanel"),
  fabricPanel: document.getElementById("pfFabricPanel"),
  preview: document.getElementById("pfPreview"),
  save: document.getElementById("pfSave"),
  useLibrary: document.getElementById("pfUseLibrary"),
  share: document.getElementById("pfShare"),
  export: document.getElementById("pfExport"),
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
  paintCalcError: document.getElementById("pfPaintCalcError")
};

const svgCache = new Map();
const defaultHex = "#C27B4B";

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
  return {
    id: `asset_${Date.now()}`,
    type: spec.type,
    name: spec.name,
    tags: ["paintfabric"],
    payload: {
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

const buildSvgLayer = (svgText, options) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const svg = doc.documentElement;
  const fill = svg.querySelector("[data-pf-fill]");
  if (fill) fill.setAttribute("fill", options.color);
  const texture = svg.querySelector("[data-pf-texture]");
  if (texture) texture.setAttribute("opacity", String(options.textureOpacity));
  const noise = svg.querySelector("#pfNoise feTurbulence");
  if (noise) noise.setAttribute("baseFrequency", String(options.noiseFrequency));
  return svg.outerHTML;
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

const updatePreview = async () => {
  if (!elements.preview) return;
  const hex = normalizeHex(elements.hex?.value) || defaultHex;
  const activeTab = elements.paintPanel?.classList.contains("hidden") ? "fabric" : "paint";
  const finish = activeTab === "paint" ? elements.finish?.value || "mo" : elements.finishFabric?.value || "mo";
  const lighting = activeTab === "paint" ? elements.lighting?.value || "trang" : elements.lightingFabric?.value || "trang";
  const surface = elements.surface?.value || "tuong";
  const scene = elements.scene?.value || "living";
  const object = elements.object?.value || "shirt";
  const textureLevel = activeTab === "paint" ? "min" : elements.texture?.value || "min";
  const textureScale = Number(elements.textureScale?.value || 5);
  const compare = Number(elements.compare?.value || 60);
  const compareValue = `${compare}%`;
  if (elements.compareLabel) {
    elements.compareLabel.textContent = `Sau: ${compare}%`;
  }

  const svgText = await loadSvgTemplate(activeTab, activeTab === "paint" ? scene : object);
  if (!svgText) return;

  const neutralBase = activeTab === "paint" ? "#E8E1D6" : "#EFEDEA";
  const adjusted = applyLighting(hex, lighting);
  const adjustedNeutral = applyLighting(neutralBase, lighting);
  const textureSettings = getTextureSettings(
    activeTab,
    surface,
    textureLevel,
    textureScale,
    finish
  );

  const beforeLayer = buildSvgLayer(svgText, {
    color: adjustedNeutral,
    textureOpacity: textureSettings.textureOpacity * 0.7,
    noiseFrequency: textureSettings.noiseFrequency
  });
  const afterLayer = buildSvgLayer(svgText, {
    color: adjusted,
    textureOpacity: textureSettings.textureOpacity,
    noiseFrequency: textureSettings.noiseFrequency
  });

  elements.preview.innerHTML = `
    <div class="pf-compare" style="--pf-compare:${compareValue};">
      <div class="pf-layer pf-before">${beforeLayer}</div>
      <div class="pf-layer pf-after">${afterLayer}</div>
    </div>
  `;
};

const syncUI = () => {
  const spec = buildSpec();
  renderSpec(spec);
  updatePreview().catch(() => {});
  updatePaintCalc();
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
    updateTabs(button.dataset.tab);
  });

  document.querySelectorAll("[data-quick]").forEach((button) => {
    button.addEventListener("click", () => {
      const hex = normalizeHex(button.dataset.quick);
      if (!hex || !elements.hex) return;
      elements.hex.value = hex;
      syncUI();
    });
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
    input?.addEventListener("input", syncUI);
    input?.addEventListener("change", syncUI);
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
  });

  elements.save?.addEventListener("click", handleSave);
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

  elements.savedSelect?.addEventListener("change", () => {
    const assets = getAssets();
    const selected = assets.find((asset) => asset.id === elements.savedSelect.value);
    loadAsset(selected);
  });
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
  updateTabs("paint");
  setStatus("");
};

init();

const applyHexesFromHub = (detail) => {
  const rawList = Array.isArray(detail?.hexes) ? detail.hexes : [];
  const normalized = rawList.map((hex) => normalizeHex(hex)).filter(Boolean);
  if (!normalized.length || !elements.hex) return;
  elements.hex.value = normalized[0];
  syncUI();
};

window.addEventListener("tc:hex-apply", (event) => {
  applyHexesFromHub(event?.detail);
});
