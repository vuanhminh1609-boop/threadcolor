import { parseHandoff, withHandoff } from "../scripts/handoff.js";

const STORAGE_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const PROJECT_RECENT_KEY = "tc_projects_recent";
const FEED_STORAGE_KEY = "tc_community_feed";
const HANDOFF_FROM = "library";
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
  share: document.getElementById("assetShare"),
  specText: document.getElementById("assetSpecText"),
  specJson: document.getElementById("assetSpecJson"),
  copyText: document.getElementById("assetCopyText"),
  copyJson: document.getElementById("assetCopyJson"),
  tabAssets: document.getElementById("assetTabBtn"),
  tabHex: document.getElementById("hexTabBtn"),
  tabAssetsPanel: document.getElementById("assetTabPanel"),
  tabHexPanel: document.getElementById("hexTabPanel"),
  hexSearch: document.getElementById("hexSearch"),
  hexPageSize: document.getElementById("hexPageSize"),
  hexGrid: document.getElementById("hexGrid"),
  hexStats: document.getElementById("hexStats"),
  hexPrev: document.getElementById("hexPrev"),
  hexNext: document.getElementById("hexNext"),
  hexPageInfo: document.getElementById("hexPageInfo"),
  hexStatus: document.getElementById("hexStatus")
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
  hexLoaded: false
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
  input.addEventListener("focus", unlock, { once: true });
  input.addEventListener("pointerdown", unlock, { once: true });
  input.addEventListener("keydown", () => {
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
    return `
      <button class="tc-card p-4 text-left space-y-3" data-asset-id="${asset.id}" type="button">
        <div>
          <p class="text-xs uppercase tracking-[0.2em] tc-muted">${asset.type}</p>
          <h3 class="font-semibold">${asset.name}</h3>
        </div>
        <div class="flex flex-wrap gap-2">${swatches}</div>
        <div class="flex flex-wrap gap-2">${tags}</div>
      </button>
    `;
  }).join("");
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
  if (elements.save) {
    elements.save.disabled = true;
    elements.save.title = "Tài sản đã ở Thư viện.";
    elements.save.classList.add("opacity-60", "cursor-not-allowed");
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
  const pageSize = state.hexPageSize || 60;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  state.hexPage = clamp(state.hexPage, 1, totalPages);
  const start = (state.hexPage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);
  if (!pageItems.length) {
    elements.hexGrid.innerHTML = `<div class="tc-muted text-sm">Không tìm thấy màu phù hợp.</div>`;
  } else {
    elements.hexGrid.innerHTML = pageItems.map((entry) => {
      const refsPreview = entry.refs.slice(0, 2).map((ref) => `${ref.brand} ${ref.code}`.trim()).join(" · ");
      const refsSuffix = entry.refs.length > 2 ? ` +${entry.refs.length - 2}` : "";
      return `
        <div class="tc-card p-4 space-y-3">
          <div class="flex items-center gap-3">
            <span class="tc-hex-swatch" style="background:${entry.hex};"></span>
            <div>
              <div class="font-semibold">${entry.hex}</div>
              <div class="text-xs tc-muted">${entry.refs.length} mã · ${refsPreview}${refsSuffix}</div>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 text-xs">
            <button class="tc-btn tc-chip px-3 py-2" data-hex-action="copy" data-hex="${entry.hex}" type="button">Sao chép HEX</button>
            <button class="tc-btn tc-chip px-3 py-2" data-hex-action="threadcolor" data-hex="${entry.hex}" type="button">Mở ở Thêu</button>
            <button class="tc-btn tc-chip px-3 py-2" data-hex-action="printcolor" data-hex="${entry.hex}" type="button">Mở ở In</button>
            <button class="tc-btn tc-chip px-3 py-2" data-hex-action="palette" data-hex="${entry.hex}" type="button">Tạo Palette</button>
            <button class="tc-btn tc-chip px-3 py-2" data-hex-action="gradient" data-hex="${entry.hex}" type="button">Tạo Gradient</button>
            <button class="tc-btn tc-btn-primary px-3 py-2" data-hex-action="save" data-hex="${entry.hex}" type="button">Lưu vào Thư viện</button>
          </div>
        </div>
      `;
    }).join("");
  }
  if (elements.hexStats) {
    elements.hexStats.textContent = `Tổng ${filtered.length} màu · ${state.hexEntries.length} màu trong kho`;
  }
  if (elements.hexPageInfo) {
    elements.hexPageInfo.textContent = `Trang ${state.hexPage}/${totalPages}`;
  }
  if (elements.hexPrev) elements.hexPrev.disabled = state.hexPage <= 1;
  if (elements.hexNext) elements.hexNext.disabled = state.hexPage >= totalPages;
};

const loadHexLibrary = async () => {
  if (state.hexLoaded) return;
  state.hexLoaded = true;
  if (elements.hexStats) elements.hexStats.textContent = "Đang nạp dữ liệu...";
  try {
    const response = await fetch("../threads.json", { cache: "no-store" });
    const data = await response.json();
    state.hexEntries = buildHexIndex(Array.isArray(data) ? data : []);
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
    state.hexPage = 1;
    renderHexGrid();
  }, 300);
  elements.hexSearch?.addEventListener("input", onHexSearch);
  elements.hexPageSize?.addEventListener("change", () => {
    const next = parseInt(elements.hexPageSize.value, 10);
    state.hexPageSize = Number.isFinite(next) ? next : 60;
    state.hexPage = 1;
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
    if (!btn) return;
    const hex = btn.dataset.hex;
    const action = btn.dataset.hexAction;
    const entry = state.hexEntries.find((item) => item.hex === hex);
    if (!hex || !action) return;
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
    }
  });
  elements.grid?.addEventListener("click", (event) => {
    const card = event.target.closest("[data-asset-id]");
    if (!card) return;
    const asset = state.assets.find((item) => item.id === card.dataset.assetId);
    state.selected = asset || null;
    renderPanel(state.selected);
  });
  elements.apply?.addEventListener("click", () => applyAsset(state.selected));
  elements.share?.addEventListener("click", () => publishToFeed(state.selected));
  elements.copyText?.addEventListener("click", () => {
    if (!elements.specText) return;
    copyText(elements.specText.textContent || "");
  });
  elements.copyJson?.addEventListener("click", () => {
    if (!elements.specJson) return;
    copyText(elements.specJson.textContent || "");
  });
};

state.assets = loadAssets();
loadProjectPrefs();
syncProjectFilter();
renderGrid();
renderPanel(state.selected);
bindEvents();
setActiveTab("assets");
setupAutofillTrap(elements.search);

if (typeof window !== "undefined") {
  window.tcOpenInWorld = openInWorld;
}
