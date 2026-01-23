import { composeHandoff } from "./scripts/handoff.js";

const PROFILE_PRESETS = {
  "300": { name: "Couche 300%", tac: 300 },
  "280": { name: "Thường 280%", tac: 280 },
  "240": { name: "Báo 240%", tac: 240 }
};

const INTENT_LABELS = {
  perceptual: "Perceptual",
  relative: "Relative Colorimetric",
  saturation: "Saturation",
  absolute: "Absolute Colorimetric"
};

const RICH_BLACK_PRESETS = {
  text: { name: "Đen chữ", cmyk: { c: 0, m: 0, y: 0, k: 100 } },
  coated: { name: "Đen mảng - Couche", cmyk: { c: 60, m: 40, y: 40, k: 100 } },
  uncoated: { name: "Đen mảng - Thường", cmyk: { c: 50, m: 40, y: 40, k: 100 } },
  newsprint: { name: "Đen mảng - Báo", cmyk: { c: 40, m: 30, y: 30, k: 100 } }
};

const elements = {
  input: document.getElementById("hexInput"),
  apply: document.getElementById("hexApply"),
  clear: document.getElementById("hexClear"),
  tableBody: document.getElementById("printTableBody"),
  tableWrap: document.getElementById("printTableWrap"),
  empty: document.getElementById("printEmpty"),
  toast: document.getElementById("printToast"),
  profilePreset: document.getElementById("profilePreset"),
  tacRange: document.getElementById("tacRange"),
  tacValue: document.getElementById("tacValue"),
  tacBadge: document.getElementById("tacBadge"),
  reduceAll: document.getElementById("reduceAll"),
  exportFormat: document.getElementById("exportFormat"),
  exportCopy: document.getElementById("exportCopy"),
  exportWrap: document.getElementById("exportCopy")?.parentElement || null,
  saveLibrary: document.getElementById("printSaveLibrary"),
  useLibrary: document.getElementById("printUseLibrary"),
  share: document.getElementById("printShare"),
  iccInput: document.getElementById("iccInput"),
  iccProfile: document.getElementById("iccProfile"),
  iccStatus: document.getElementById("iccStatus"),
  iccIntent: document.getElementById("iccIntent"),
  iccBpc: document.getElementById("iccBpc"),
  gamutThreshold: document.getElementById("gamutThreshold"),
  gamutOverlay: document.getElementById("gamutOverlay"),
  richBlackPreset: document.getElementById("richBlackPreset"),
  safePrintAll: document.getElementById("safePrintAll")
};

const state = {
  items: [],
  tacLimit: 300,
  iccProfiles: [],
  iccSelectedId: "srgb",
  iccIntent: "perceptual",
  iccBpc: true,
  gamutThreshold: 5,
  gamutOverlay: false,
  richBlackPreset: "text",
  iccEngine: null,
  iccReady: false,
  iccLoading: false
};

const ASSET_STORAGE_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const FEED_STORAGE_KEY = "tc_community_feed";
const HANDOFF_FROM = "printcolor";

const normalizeHex = (value) => {
  if (!value) return null;
  const raw = value.trim().replace(/^0x/i, "").replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(raw)) return null;
  const hex = raw.length === 3
    ? raw.split("").map((c) => c + c).join("")
    : raw;
  return `#${hex.toUpperCase()}`;
};

const parseHexList = (value) => {
  if (!value) return [];
  return value
    .split(/[\s,;|]+/)
    .map(normalizeHex)
    .filter(Boolean);
};

const hexToRgb = (hex) => {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return { r, g, b };
};

const rgbToHex = ({ r, g, b }) => {
  const toHex = (value) => value.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

const rgbToCmyk = ({ r, g, b }) => {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  if (r === 0 && g === 0 && b === 0) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }
  const cRaw = 1 - rNorm;
  const mRaw = 1 - gNorm;
  const yRaw = 1 - bNorm;
  const kRaw = Math.min(cRaw, mRaw, yRaw);
  const denom = 1 - kRaw;
  const c = denom === 0 ? 0 : (cRaw - kRaw) / denom;
  const m = denom === 0 ? 0 : (mRaw - kRaw) / denom;
  const y = denom === 0 ? 0 : (yRaw - kRaw) / denom;
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(kRaw * 100)
  };
};

const cmykToRgb = ({ c, m, y, k }) => {
  const cNorm = c / 100;
  const mNorm = m / 100;
  const yNorm = y / 100;
  const kNorm = k / 100;
  const r = Math.round(255 * (1 - cNorm) * (1 - kNorm));
  const g = Math.round(255 * (1 - mNorm) * (1 - kNorm));
  const b = Math.round(255 * (1 - yNorm) * (1 - kNorm));
  return { r, g, b };
};

const srgbToLinear = (value) => {
  const v = value / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
};

const rgbToXyz = ({ r, g, b }) => {
  const rl = srgbToLinear(r);
  const gl = srgbToLinear(g);
  const bl = srgbToLinear(b);
  return {
    x: rl * 0.4124 + gl * 0.3576 + bl * 0.1805,
    y: rl * 0.2126 + gl * 0.7152 + bl * 0.0722,
    z: rl * 0.0193 + gl * 0.1192 + bl * 0.9505
  };
};

const xyzToLab = ({ x, y, z }) => {
  const refX = 0.95047;
  const refY = 1.00000;
  const refZ = 1.08883;
  const fx = x / refX;
  const fy = y / refY;
  const fz = z / refZ;
  const eps = 0.008856;
  const kappa = 903.3;
  const f = (t) => (t > eps ? Math.cbrt(t) : (kappa * t + 16) / 116);
  const fxn = f(fx);
  const fyn = f(fy);
  const fzn = f(fz);
  return {
    l: Math.max(0, 116 * fyn - 16),
    a: 500 * (fxn - fyn),
    b: 200 * (fyn - fzn)
  };
};

const deltaE = (lab1, lab2) => {
  const dl = lab1.l - lab2.l;
  const da = lab1.a - lab2.a;
  const db = lab1.b - lab2.b;
  return Math.sqrt(dl * dl + da * da + db * db);
};

const getHashParams = () => {
  const hash = window.location.hash ? window.location.hash.slice(1) : "";
  if (!hash) return {};
  const params = {};
  hash.split("&").forEach((part) => {
    const [key, value] = part.split("=");
    if (!key) return;
    params[key] = value ? decodeURIComponent(value) : "";
  });
  return params;
};

const extractHashColors = () => {
  const params = getHashParams();
  const raw = params.c || params.p || params.g || "";
  if (!raw) return [];
  return parseHexList(raw.replace(/#/g, ""));
};

const setHashColors = (list) => {
  const url = new URL(window.location.href);
  if (!list.length) {
    url.hash = "";
    window.history.replaceState(null, "", url.toString());
    return;
  }
  const payload = list.map((item) => item.replace("#", "")).join(",");
  url.hash = `c=${encodeURIComponent(payload)}`;
  window.history.replaceState(null, "", url.toString());
};

const showToast = (message) => {
  if (!elements.toast) return;
  elements.toast.textContent = "";
  window.clearTimeout(showToast._t);
  const raf = window.requestAnimationFrame || ((fn) => setTimeout(fn, 0));
  raf(() => {
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    showToast._t = window.setTimeout(() => {
      elements.toast.classList.remove("is-visible");
    }, 1400);
  });
};

const copyToClipboard = (text) => {
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

const addAssetToLibrary = (asset) => {
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
};

const getCurrentProject = () => {
  try {
    return localStorage.getItem(PROJECT_STORAGE_KEY) || "";
  } catch (_err) {
    return "";
  }
};

const buildCmykAsset = () => {
  const now = new Date().toISOString();
  const profile = getSelectedProfile();
  return {
    id: `asset_${Date.now()}`,
    type: "cmyk_recipe",
    name: `CMYK ${profile?.name || "sRGB"}`,
    tags: ["cmyk", "in"],
    payload: { cmyk: buildCmykPayload() },
    notes: `TAC ${state.tacLimit}% · intent ${state.iccIntent} · BPC ${state.iccBpc ? "on" : "off"}`,
    createdAt: now,
    updatedAt: now,
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
};

const openIccDb = () => new Promise((resolve) => {
  if (!("indexedDB" in window)) {
    resolve(null);
    return;
  }
  const request = indexedDB.open("tc_icc_profiles", 1);
  request.onupgradeneeded = () => {
    const db = request.result;
    if (!db.objectStoreNames.contains("profiles")) {
      db.createObjectStore("profiles", { keyPath: "id" });
    }
  };
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => resolve(null);
});

const loadProfilesFromDb = async () => {
  const db = await openIccDb();
  if (!db) return [];
  return new Promise((resolve) => {
    const tx = db.transaction("profiles", "readonly");
    const store = tx.objectStore("profiles");
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => resolve([]);
  });
};

const saveProfileToDb = async (profile) => {
  const db = await openIccDb();
  if (!db) return;
  await new Promise((resolve) => {
    const tx = db.transaction("profiles", "readwrite");
    tx.objectStore("profiles").put(profile);
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
};

const resolveIccEngine = () => {
  if (window.Lcms2Wasm?.rgbToCmyk && window.Lcms2Wasm?.cmykToRgb) {
    return window.Lcms2Wasm;
  }
  if (window.lcms2?.rgbToCmyk && window.lcms2?.cmykToRgb) {
    return window.lcms2;
  }
  return null;
};

const loadIccEngine = () => {
  if (state.iccReady || state.iccLoading) return;
  state.iccLoading = true;
  const script = document.createElement("script");
  script.src = "../assets/wasm/lcms2.js";
  script.async = true;
  script.onload = () => {
    const engine = resolveIccEngine();
    if (engine) {
      state.iccEngine = engine;
      state.iccReady = true;
      updateIccStatus();
      rebuildItems();
    } else {
      state.iccReady = false;
      updateIccStatus("Chưa thấy engine ICC trong lcms2.js.");
    }
  };
  script.onerror = () => {
    state.iccReady = false;
    updateIccStatus("Không tải được lcms2 WASM.");
  };
  document.head.appendChild(script);
};

const getSelectedProfile = () =>
  state.iccProfiles.find((profile) => profile.id === state.iccSelectedId) || state.iccProfiles[0];

const convertRgbToCmyk = (rgb) => {
  const profile = getSelectedProfile();
  if (state.iccReady && state.iccEngine && profile?.data) {
    try {
      return state.iccEngine.rgbToCmyk(rgb, profile.data, {
        intent: state.iccIntent,
        bpc: state.iccBpc
      });
    } catch (_err) {
      return rgbToCmyk(rgb);
    }
  }
  return rgbToCmyk(rgb);
};

const convertCmykToRgb = (cmyk) => {
  const profile = getSelectedProfile();
  if (state.iccReady && state.iccEngine && profile?.data) {
    try {
      return state.iccEngine.cmykToRgb(cmyk, profile.data, {
        intent: state.iccIntent,
        bpc: state.iccBpc
      });
    } catch (_err) {
      return cmykToRgb(cmyk);
    }
  }
  return cmykToRgb(cmyk);
};

const getTac = (cmyk) => cmyk.c + cmyk.m + cmyk.y + cmyk.k;

const getLuminance = ({ r, g, b }) =>
  0.2126 * r + 0.7152 * g + 0.0722 * b;

const isNearBlack = (rgb) => getLuminance(rgb) <= 20;

const reduceTac = (cmyk, limit) => {
  const tac = getTac(cmyk);
  if (tac <= limit || tac === 0) return { ...cmyk };
  const factor = limit / tac;
  const scaled = {
    c: Math.round(cmyk.c * factor),
    m: Math.round(cmyk.m * factor),
    y: Math.round(cmyk.y * factor),
    k: Math.round(cmyk.k * factor)
  };
  const overflow = getTac(scaled) - limit;
  if (overflow > 0) {
    scaled.k = Math.max(0, scaled.k - overflow);
  }
  return scaled;
};

const getDeltaLabel = (deltaValue) => {
  if (deltaValue < 2) return "Thấp";
  if (deltaValue < 6) return "Vừa";
  return "Cao";
};

const buildItems = (list) => list.map((hex) => {
  const baseRgb = hexToRgb(hex);
  const cmyk = convertRgbToCmyk(baseRgb);
  const simRgb = convertCmykToRgb(cmyk);
  const baseLab = xyzToLab(rgbToXyz(baseRgb));
  const simLab = xyzToLab(rgbToXyz(simRgb));
  const delta = deltaE(baseLab, simLab);
  return {
    hex,
    baseRgb,
    cmyk,
    simRgb,
    delta
  };
});

const updateItemMetrics = (item) => {
  item.simRgb = convertCmykToRgb(item.cmyk);
  const baseLab = xyzToLab(rgbToXyz(item.baseRgb));
  const simLab = xyzToLab(rgbToXyz(item.simRgb));
  item.delta = deltaE(baseLab, simLab);
};

const renderTable = () => {
  if (!elements.tableBody || !elements.tableWrap || !elements.empty) return;
  if (!state.items.length) {
    elements.tableBody.innerHTML = "";
    elements.tableWrap.classList.add("hidden");
    elements.empty.classList.remove("hidden");
    return;
  }
  const rows = state.items.map((item, index) => {
    const tac = getTac(item.cmyk);
    const warn = tac > state.tacLimit ? "Vượt ngưỡng" : "Ổn";
    const warnClass = tac > state.tacLimit ? "tc-warn" : "";
    const simHex = rgbToHex(item.simRgb);
    const deltaLabel = getDeltaLabel(item.delta);
    const isGamut = item.delta > state.gamutThreshold;
    const gamutBadge = isGamut ? '<span class="tc-badge tc-warn">Vượt gamut</span>' : "";
    const disabled = tac <= state.tacLimit ? "disabled" : "";
    const rowClass = isGamut && state.gamutOverlay ? "tc-row-gamut" : "";
    return `
      <tr data-row="${index}" class="${rowClass}">
        <td>
          <div class="tc-swatch-duo">
            <span class="tc-swatch" style="background:${item.hex};"></span>
            <span class="tc-swatch" style="background:${simHex};"></span>
          </div>
        </td>
        <td class="font-semibold">${item.hex}</td>
        <td>C ${item.cmyk.c}% · M ${item.cmyk.m}% · Y ${item.cmyk.y}% · K ${item.cmyk.k}%</td>
        <td>${tac}%</td>
        <td class="${warnClass}">${warn} ${gamutBadge}</td>
        <td>${deltaLabel} · ΔE ${item.delta.toFixed(1)}</td>
        <td>
          <button class="tc-btn tc-chip px-3 py-1 text-xs" data-action="reduce" data-index="${index}" ${disabled}>
            Giảm TAC
          </button>
        </td>
      </tr>`;
  }).join("");
  elements.tableBody.innerHTML = rows;
  elements.tableWrap.classList.remove("hidden");
  elements.empty.classList.add("hidden");
};

const updateTacDisplay = () => {
  const label = `${state.tacLimit}%`;
  if (elements.tacValue) elements.tacValue.textContent = label;
  if (elements.tacBadge) elements.tacBadge.textContent = label;
};

const updateIccStatus = (override) => {
  if (!elements.iccStatus) return;
  if (override) {
    elements.iccStatus.textContent = override;
    return;
  }
  const profile = getSelectedProfile();
  if (!profile || profile.id === "srgb") {
    elements.iccStatus.textContent = "Đang dùng sRGB xấp xỉ (chưa có ICC).";
    return;
  }
  const intentLabel = INTENT_LABELS[state.iccIntent] || "Perceptual";
  const bpcLabel = state.iccBpc ? "BPC bật" : "BPC tắt";
  if (state.iccReady) {
    elements.iccStatus.textContent = `ICC: ${profile.name} · ${intentLabel} · ${bpcLabel}`;
  } else if (state.iccLoading) {
    elements.iccStatus.textContent = "Đang tải engine ICC...";
  } else {
    elements.iccStatus.textContent = "Chưa tải engine ICC, đang dùng xấp xỉ.";
  }
};

const rebuildItems = () => {
  const list = state.items.map((item) => item.hex);
  state.items = buildItems(list);
  renderTable();
};

const applyFromInput = () => {
  if (!elements.input) return;
  const list = parseHexList(elements.input.value);
  state.items = buildItems(list);
  renderTable();
  setHashColors(list);
  if (!list.length) {
    showToast("Chưa có mã màu hợp lệ.");
  }
};

const applyFromHash = () => {
  const list = extractHashColors();
  if (elements.input && list.length) {
    elements.input.value = list.join("\n");
  }
  state.items = buildItems(list);
  renderTable();
};

const handleReduce = (index) => {
  const item = state.items[index];
  if (!item) return;
  const reduced = reduceTac(item.cmyk, state.tacLimit);
  item.cmyk = reduced;
  updateItemMetrics(item);
  renderTable();
};

const reduceAll = () => {
  state.items = state.items.map((item) => {
    const reduced = reduceTac(item.cmyk, state.tacLimit);
    const next = { ...item, cmyk: reduced };
    updateItemMetrics(next);
    return next;
  });
  renderTable();
};

const applyRichBlack = (item) => {
  if (!isNearBlack(item.baseRgb)) return item;
  const preset = RICH_BLACK_PRESETS[state.richBlackPreset];
  if (!preset) return item;
  const next = { ...item, cmyk: { ...preset.cmyk } };
  next.cmyk = reduceTac(next.cmyk, state.tacLimit);
  updateItemMetrics(next);
  return next;
};

const safePrintAll = () => {
  state.items = state.items.map((item) => {
    let next = { ...item };
    if (isNearBlack(item.baseRgb)) {
      next = applyRichBlack(next);
    } else {
      next.cmyk = reduceTac(next.cmyk, state.tacLimit);
      updateItemMetrics(next);
    }
    return next;
  });
  renderTable();
};

const buildExportCsv = () => {
  const header = "hex,sim_hex,c,m,y,k,tac,delta,profile,intent,bpc";
  const profile = getSelectedProfile();
  const intentLabel = INTENT_LABELS[state.iccIntent] || "Perceptual";
  const bpcLabel = state.iccBpc ? "on" : "off";
  const rows = state.items.map((item) => {
    const simHex = rgbToHex(item.simRgb);
    const tac = getTac(item.cmyk);
    const delta = getDeltaLabel(item.delta);
    return `${item.hex},${simHex},${item.cmyk.c},${item.cmyk.m},${item.cmyk.y},${item.cmyk.k},${tac},${delta},${profile?.name || "sRGB"},${intentLabel},${bpcLabel}`;
  });
  return [header, ...rows].join("\n");
};

const buildExportJson = () => {
  const tokens = {};
  const profile = getSelectedProfile();
  state.items.forEach((item, index) => {
    const id = String(index + 1).padStart(2, "0");
    tokens[`cmyk-${id}`] = {
      hex: item.hex,
      simHex: rgbToHex(item.simRgb),
      c: item.cmyk.c,
      m: item.cmyk.m,
      y: item.cmyk.y,
      k: item.cmyk.k,
      tac: getTac(item.cmyk),
      profile: profile?.name || "sRGB",
      intent: state.iccIntent,
      bpc: state.iccBpc
    };
  });
  return JSON.stringify({ tokens }, null, 2);
};

const buildExportCss = () => {
  return state.items.map((item, index) => {
    const id = String(index + 1).padStart(2, "0");
    const simHex = rgbToHex(item.simRgb);
    return [
      `--cmyk-${id}: cmyk(${item.cmyk.c}% ${item.cmyk.m}% ${item.cmyk.y}% ${item.cmyk.k}%);`,
      `--hex-${id}: ${item.hex};`,
      `--sim-${id}: ${simHex};`
    ].join("\n");
  }).join("\n");
};

const buildExportReport = () => {
  const profile = getSelectedProfile();
  const intentLabel = INTENT_LABELS[state.iccIntent] || "Perceptual";
  const bpcLabel = state.iccBpc ? "Bật" : "Tắt";
  const lines = [];
  lines.push("Báo cáo in");
  lines.push(`Profile: ${profile?.name || "sRGB"}`);
  lines.push(`Intent: ${intentLabel}`);
  lines.push(`BPC: ${bpcLabel}`);
  lines.push(`TAC ngưỡng: ${state.tacLimit}%`);
  lines.push(`Ngưỡng DeltaE: ${state.gamutThreshold}`);
  lines.push("");
  const outOfGamut = state.items.filter((item) => item.delta > state.gamutThreshold);
  lines.push(`Số màu vượt gamut: ${outOfGamut.length}`);
  if (outOfGamut.length) {
    lines.push("Danh sách vượt gamut:");
    outOfGamut.forEach((item) => {
      lines.push(`- ${item.hex} (ΔE ${item.delta.toFixed(1)})`);
    });
  }
  return lines.join("\n");
};

const buildCmykPayload = () => {
  return state.items.map((item) => ({
    hex: item.hex,
    c: item.cmyk.c,
    m: item.cmyk.m,
    y: item.cmyk.y,
    k: item.cmyk.k,
    tac: getTac(item.cmyk)
  }));
};

const exportData = () => {
  if (!state.items.length) {
    showToast("Chưa có dữ liệu để xuất.");
    return;
  }
  const format = elements.exportFormat ? elements.exportFormat.value : "csv";
  let text = "";
  if (format === "json") text = buildExportJson();
  else if (format === "css") text = buildExportCss();
  else if (format === "report") text = buildExportReport();
  else text = buildExportCsv();
  copyToClipboard(text).then(() => {
    showToast("Đã sao chép dữ liệu xuất.");
  });
};

const renderProfileOptions = () => {
  if (!elements.iccProfile) return;
  const options = state.iccProfiles.map((profile) =>
    `<option value="${profile.id}">${profile.name}</option>`
  );
  elements.iccProfile.innerHTML = options.join("");
  elements.iccProfile.value = state.iccSelectedId;
};

const initProfiles = async () => {
  const stored = await loadProfilesFromDb();
  state.iccProfiles = [
    { id: "srgb", name: "sRGB (mặc định)", data: null },
    ...stored
  ];
  renderProfileOptions();
  updateIccStatus();
};

const handleIccUpload = async (file) => {
  if (!file) return;
  const buffer = await file.arrayBuffer();
  const id = `icc_${Date.now()}`;
  const profile = {
    id,
    name: file.name.replace(/\.[^.]+$/, ""),
    data: buffer,
    addedAt: Date.now()
  };
  state.iccProfiles.push(profile);
  await saveProfileToDb(profile);
  state.iccSelectedId = id;
  renderProfileOptions();
  updateIccStatus();
  loadIccEngine();
  rebuildItems();
  showToast("Đã nạp ICC.");
};

const bindEvents = () => {
  if (elements.apply) elements.apply.addEventListener("click", applyFromInput);
  if (elements.clear) {
    elements.clear.addEventListener("click", () => {
      if (elements.input) elements.input.value = "";
      state.items = [];
      renderTable();
      setHashColors([]);
      showToast("Đã xóa danh sách.");
    });
  }
  if (elements.profilePreset) {
    elements.profilePreset.addEventListener("change", () => {
      const preset = PROFILE_PRESETS[elements.profilePreset.value];
      const next = preset ? preset.tac : 300;
      state.tacLimit = next;
      if (elements.tacRange) elements.tacRange.value = String(next);
      updateTacDisplay();
      renderTable();
    });
  }
  if (elements.tacRange) {
    elements.tacRange.addEventListener("input", () => {
      const next = Number(elements.tacRange.value || 300);
      state.tacLimit = next;
      updateTacDisplay();
      renderTable();
    });
  }
  if (elements.reduceAll) {
    elements.reduceAll.addEventListener("click", reduceAll);
  }
  if (elements.tableBody) {
    elements.tableBody.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action='reduce']");
      if (!button) return;
      const index = Number(button.getAttribute("data-index"));
      if (Number.isNaN(index)) return;
      handleReduce(index);
    });
  }
  if (elements.exportCopy) {
    elements.exportCopy.textContent = "Xuất Bản thông số";
    elements.exportCopy.addEventListener("click", exportData);
  }
  elements.saveLibrary?.addEventListener("click", () => {
    if (!state.items.length) {
      showToast("Chưa có dữ liệu để lưu.");
      return;
    }
    const ok = addAssetToLibrary(buildCmykAsset());
    showToast(ok ? "Đã lưu vào Thư viện." : "Không thể lưu tài sản.");
  });
  elements.useLibrary?.addEventListener("click", () => {
    const payload = composeHandoff({
      from: HANDOFF_FROM,
      intent: "use",
      projectId: getCurrentProject()
    });
    window.location.href = `./library.html${payload}`;
  });
  elements.share?.addEventListener("click", () => {
    if (!state.items.length) {
      showToast("Chưa có dữ liệu để chia sẻ.");
      return;
    }
    publishToFeed(buildCmykAsset());
  });
  if (elements.iccInput) {
    elements.iccInput.addEventListener("change", (event) => {
      const [file] = event.target.files || [];
      handleIccUpload(file);
    });
  }
  if (elements.iccProfile) {
    elements.iccProfile.addEventListener("change", () => {
      state.iccSelectedId = elements.iccProfile.value;
      updateIccStatus();
      if (state.iccSelectedId !== "srgb") loadIccEngine();
      rebuildItems();
    });
  }
  if (elements.iccIntent) {
    elements.iccIntent.addEventListener("change", () => {
      state.iccIntent = elements.iccIntent.value;
      updateIccStatus();
      rebuildItems();
    });
  }
  if (elements.iccBpc) {
    elements.iccBpc.addEventListener("change", () => {
      state.iccBpc = elements.iccBpc.checked;
      updateIccStatus();
      rebuildItems();
    });
  }
  if (elements.gamutThreshold) {
    elements.gamutThreshold.addEventListener("input", () => {
      const next = Number(elements.gamutThreshold.value || 5);
      state.gamutThreshold = Number.isNaN(next) ? 5 : next;
      renderTable();
    });
  }
  if (elements.gamutOverlay) {
    elements.gamutOverlay.addEventListener("change", () => {
      state.gamutOverlay = elements.gamutOverlay.checked;
      renderTable();
    });
  }
  if (elements.richBlackPreset) {
    elements.richBlackPreset.addEventListener("change", () => {
      state.richBlackPreset = elements.richBlackPreset.value;
    });
  }
  if (elements.safePrintAll) {
    elements.safePrintAll.addEventListener("click", safePrintAll);
  }
};

updateTacDisplay();
if (elements.iccBpc) {
  elements.iccBpc.checked = state.iccBpc;
}
if (elements.gamutThreshold) {
  elements.gamutThreshold.value = String(state.gamutThreshold);
}
if (elements.gamutOverlay) {
  elements.gamutOverlay.checked = state.gamutOverlay;
}
if (elements.richBlackPreset) {
  elements.richBlackPreset.value = state.richBlackPreset;
}
initProfiles();
bindEvents();
applyFromHash();

window.addEventListener("hashchange", () => {
  applyFromHash();
});
