const STORAGE_KEY = "tc_paintfabric_assets";

const elements = {
  tabs: document.getElementById("pfTabs"),
  hex: document.getElementById("pfHex"),
  finish: document.getElementById("pfFinish"),
  lighting: document.getElementById("pfLighting"),
  surface: document.getElementById("pfSurface"),
  fabricType: document.getElementById("pfFabricType"),
  finishFabric: document.getElementById("pfFinishFabric"),
  lightingFabric: document.getElementById("pfLightingFabric"),
  texture: document.getElementById("pfTexture"),
  paintPanel: document.getElementById("pfPaintPanel"),
  fabricPanel: document.getElementById("pfFabricPanel"),
  preview: document.getElementById("pfPreview"),
  save: document.getElementById("pfSave"),
  export: document.getElementById("pfExport"),
  seed: document.getElementById("pfSeed"),
  savedSelect: document.getElementById("pfSavedSelect"),
  spec: document.getElementById("pfSpec"),
  status: document.getElementById("pfStatus")
};

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

const surfaceAreas = {
  tuong: "Phòng khách",
  xi_mang: "Sảnh",
  go: "Studio"
};

const fabricApplications = {
  lua: "Trang phục",
  cotton: "Nội thất",
  len: "Mùa lạnh"
};

const fabricLabels = {
  lua: "Lụa",
  cotton: "Cotton",
  len: "Len"
};

const getFeeling = (lighting, finish) => {
  if (lighting === "am") return finish === "bong" ? "Ấm áp" : "Trầm";
  if (lighting === "tu_nhien") return "Tự nhiên";
  return finish === "bong" ? "Sáng" : "Tĩnh";
};

const buildSuggestedName = (type, { lighting, finish, surface, fabricType }) => {
  const lightingLabel = lightingLabels[lighting] || "Trắng";
  const finishLabel = finishLabels[finish] || "Mờ";
  const feeling = getFeeling(lighting, finish);
  if (type === "paint_profile") {
    const area = surfaceAreas[surface] || "Khu vực chính";
    return `Tường ${area} — Sơn&Vải — ${lightingLabel} · ${finishLabel} · ${feeling} — v01`;
  }
  const application = fabricApplications[fabricType] || "Ứng dụng đa năng";
  const fabricLabel = fabricLabels[fabricType] || "Vải";
  return `${application} — Sơn&Vải — ${lightingLabel} · ${fabricLabel} · ${feeling} — v01`;
};

const quickSeeds = [
  { type: "paint_profile", colorHex: "#C27B4B", finish: "bong", lighting: "am", surface: "go" },
  { type: "paint_profile", colorHex: "#1FB6FF", finish: "mo", lighting: "trang", surface: "tuong" },
  { type: "paint_profile", colorHex: "#2D2A27", finish: "mo", lighting: "tu_nhien", surface: "xi_mang" },
  { type: "fabric_profile", colorHex: "#F2C4D8", finish: "bong", lighting: "am", fabricType: "lua", textureLevel: "min" },
  { type: "fabric_profile", colorHex: "#3A5A40", finish: "mo", lighting: "tu_nhien", fabricType: "cotton", textureLevel: "tho" },
  { type: "fabric_profile", colorHex: "#0B1020", finish: "bong", lighting: "trang", fabricType: "len", textureLevel: "tho" }
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

const getAssets = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_err) {
    return [];
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
  const base = {
    id: `pf_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    name: buildSuggestedName(activeTab === "paint" ? "paint_profile" : "fabric_profile", {
      lighting: activeTab === "paint" ? elements.lighting?.value : elements.lightingFabric?.value,
      finish: activeTab === "paint" ? elements.finish?.value : elements.finishFabric?.value,
      surface: elements.surface?.value,
      fabricType: elements.fabricType?.value
    }),
    colorHex: hex,
    finish: activeTab === "paint" ? elements.finish?.value : elements.finishFabric?.value,
    lighting: activeTab === "paint" ? elements.lighting?.value : elements.lightingFabric?.value,
    createdAt
  };
  if (activeTab === "paint") {
    return {
      ...base,
      type: "paint_profile",
      surface: elements.surface?.value || "tuong"
    };
  }
  return {
    ...base,
    type: "fabric_profile",
    fabricType: elements.fabricType?.value || "lua",
    textureLevel: elements.texture?.value || "min"
  };
};

const renderSpec = (spec) => {
  if (!elements.spec) return;
  const typeLabel = typeLabels[spec.type] || spec.type;
  const surfaceLabel = spec.surface ? `Bề mặt: ${spec.surface}` : `Loại vải: ${spec.fabricType}`;
  const textureLabel = spec.textureLevel ? `Độ vân: ${spec.textureLevel}` : "";
  const lines = [
    `Tên: ${spec.name}`,
    `Loại: ${typeLabel}`,
    `Màu HEX: ${spec.colorHex}`,
    `Độ bóng: ${spec.finish}`,
    `Ánh sáng: ${spec.lighting}`,
    surfaceLabel,
    textureLabel,
    `Tạo lúc: ${spec.createdAt}`,
    "",
    "JSON:",
    JSON.stringify(spec, null, 2)
  ].filter(Boolean);
  elements.spec.textContent = lines.join("\n");
};

const updatePreview = () => {
  if (!elements.preview) return;
  const hex = normalizeHex(elements.hex?.value) || defaultHex;
  const activeTab = elements.paintPanel?.classList.contains("hidden") ? "fabric" : "paint";
  if (activeTab === "paint") {
    const finish = elements.finish?.value || "mo";
    const lighting = elements.lighting?.value || "trang";
    const surface = elements.surface?.value || "tuong";
    const base = applyLighting(hex, lighting);
    const shade = finish === "bong" ? adjust(base, 30) : adjust(base, 10);
    const dark = finish === "bong" ? adjust(base, -35) : adjust(base, -20);
    const texture = surface === "xi_mang"
      ? "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), transparent 55%), radial-gradient(circle at 80% 30%, rgba(0,0,0,0.08), transparent 60%)"
      : surface === "go"
        ? "linear-gradient(90deg, rgba(0,0,0,0.08) 0 6px, rgba(255,255,255,0.05) 6px 12px)"
        : "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0))";
    const sheen = finish === "bong"
      ? "linear-gradient(120deg, rgba(255,255,255,0.45), rgba(255,255,255,0))"
      : "linear-gradient(120deg, rgba(255,255,255,0.28), rgba(255,255,255,0))";
    elements.preview.style.backgroundImage = `${texture}, ${sheen}, linear-gradient(180deg, ${shade}, ${dark})`;
    elements.preview.style.backgroundColor = base;
    elements.preview.style.backgroundBlendMode = "overlay";
    return;
  }

  const finish = elements.finishFabric?.value || "mo";
  const lighting = elements.lightingFabric?.value || "trang";
  const fabricType = elements.fabricType?.value || "lua";
  const textureLevel = elements.texture?.value || "min";
  const base = applyLighting(hex, lighting);
  const weaveOpacity = textureLevel === "tho" ? 0.18 : 0.1;
  const weaveSize = textureLevel === "tho" ? "8px 8px" : "5px 5px";
  const sheen = finish === "bong" ? 0.22 : 0.12;
  const fabricTint = fabricType === "len" ? adjust(base, -8) : fabricType === "cotton" ? adjust(base, 4) : base;
  elements.preview.style.backgroundImage = [
    `repeating-linear-gradient(45deg, rgba(255,255,255,${weaveOpacity}) 0 2px, rgba(0,0,0,${weaveOpacity / 1.6}) 2px 4px)`,
    `repeating-linear-gradient(-45deg, rgba(255,255,255,${weaveOpacity}) 0 2px, rgba(0,0,0,${weaveOpacity / 1.6}) 2px 4px)`,
    `linear-gradient(120deg, rgba(255,255,255,${sheen}), rgba(255,255,255,0))`,
    `linear-gradient(180deg, ${adjust(fabricTint, 24)}, ${adjust(fabricTint, -24)})`
  ].join(", ");
  elements.preview.style.backgroundSize = `${weaveSize}, ${weaveSize}, 100% 100%, 100% 100%`;
  elements.preview.style.backgroundColor = fabricTint;
  elements.preview.style.backgroundBlendMode = "soft-light, multiply, screen, normal";
};

const syncUI = () => {
  const spec = buildSpec();
  renderSpec(spec);
  updatePreview();
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
  elements.savedSelect.innerHTML = '<option value="">-- Chọn asset --</option>';
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
  } else {
    updateTabs("fabric");
    elements.finishFabric.value = asset.finish || "mo";
    elements.lightingFabric.value = asset.lighting || "trang";
    elements.fabricType.value = asset.fabricType || "lua";
    elements.texture.value = asset.textureLevel || "min";
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
  setStatus("Đã lưu tài sản vào Thư viện cục bộ.");
};

const handleExport = async () => {
  const spec = buildSpec();
  renderSpec(spec);
  const ok = await copyToClipboard(elements.spec?.textContent || "");
  setStatus(ok ? "Đã sao chép bản thông số." : "Không thể sao chép bản thông số.");
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
      fabricType: seed.fabricType,
      textureLevel: seed.textureLevel,
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
    elements.finish,
    elements.lighting,
    elements.surface,
    elements.fabricType,
    elements.finishFabric,
    elements.lightingFabric,
    elements.texture
  ].forEach((input) => {
    input?.addEventListener("input", syncUI);
    input?.addEventListener("change", syncUI);
  });

  elements.save?.addEventListener("click", handleSave);
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
  populateSavedSelect(getAssets());
  bindEvents();
  updateTabs("paint");
  setStatus("");
};

init();
