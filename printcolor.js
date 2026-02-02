import { composeHandoff } from "./scripts/handoff.js";

const PROFILE_PRESETS = {
  "300": { name: "Couche 300%", tac: 300 },
  "280": { name: "Thường 280%", tac: 280 },
  "240": { name: "Báo 240%", tac: 240 },
  "screen_process": { name: "In l\u01b0\u1edbi \u2013 Process CMYK (tham chi\u1ebfu)", tac: 260, note: "CMYK/TAC ch\u1ec9 mang t\u00ednh tham chi\u1ebfu cho in l\u01b0\u1edbi; \u0111\u1ed9 d\u00e0y m\u1ef1c c\u1ea7n ki\u1ec3m so\u00e1t th\u1ef1c t\u1ebf.", screen: true },
  "screen_spot": { name: "In l\u01b0\u1edbi \u2013 Spot (tham chi\u1ebfu)", tac: 220, note: "CMYK/TAC ch\u1ec9 mang t\u00ednh tham chi\u1ebfu cho in l\u01b0\u1edbi; \u0111\u1ed9 d\u00e0y m\u1ef1c c\u1ea7n ki\u1ec3m so\u00e1t th\u1ef1c t\u1ebf.", screen: true }
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
  paste: document.getElementById("hexPaste"),
  clear: document.getElementById("hexClear"),
  tableBody: document.getElementById("printTableBody"),
  tableWrap: document.getElementById("printTableWrap"),
  empty: document.getElementById("printEmpty"),
  toast: document.getElementById("printToast"),
  profilePreset: document.getElementById("profilePreset"),
  profileNote: document.getElementById("profileNote"),
  darkFabric: document.getElementById("darkFabric"),
  tacRange: document.getElementById("tacRange"),
  tacValue: document.getElementById("tacValue"),
  tacBadge: document.getElementById("tacBadge"),
  reduceAll: document.getElementById("reduceAll"),
  exportFormat: document.getElementById("exportFormat"),
  exportCopy: document.getElementById("exportCopy"),
  qcExportType: document.getElementById("qcExportType"),
  qcExport: document.getElementById("qcExport"),
  exportWrap: document.getElementById("exportCopy")?.parentElement || null,
  saveLibrary: document.getElementById("printSaveLibrary"),
  useLibrary: document.getElementById("printUseLibrary"),
  share: document.getElementById("printShare"),
  printModeCmyk: document.getElementById("printModeCmyk"),
  printModeScreen: document.getElementById("printModeScreen"),
  cmykMode: document.getElementById("cmykMode"),
  screenMode: document.getElementById("screenMode"),
  screenSpotFromHex: document.getElementById("screenSpotFromHex"),
  screenSpotList: document.getElementById("screenSpotList"),
  screenSpotEmpty: document.getElementById("screenSpotEmpty"),
  screenFabricTone: document.getElementById("screenFabricTone"),
  screenUnderbase: document.getElementById("screenUnderbase"),
  screenUnderbaseType: document.getElementById("screenUnderbaseType"),
  screenCoverage: document.getElementById("screenCoverage"),
  screenNote: document.getElementById("screenNote"),
  screenHalftoneMode: document.getElementById("screenHalftoneMode"),
  screenHalftoneLpi: document.getElementById("screenHalftoneLpi"),
  screenAngleHint: document.getElementById("screenAngleHint"),
  screenDotGain: document.getElementById("screenDotGain"),
  screenDotGainLabel: document.getElementById("screenDotGainLabel"),
  screenMeshHint: document.getElementById("screenMeshHint"),
  screenExportType: document.getElementById("screenExportType"),
  screenExport: document.getElementById("screenExport"),
  screenReportView: document.getElementById("screenReportView"),
  screenReportPages: document.getElementById("screenReportPages"),
  iccInput: document.getElementById("iccInput"),
  iccProfile: document.getElementById("iccProfile"),
  iccStatus: document.getElementById("iccStatus"),
  iccIntent: document.getElementById("iccIntent"),
  iccBpc: document.getElementById("iccBpc"),
  deltaMethod: document.getElementById("deltaMethod"),
  gamutThreshold: document.getElementById("gamutThreshold"),
  gamutOverlay: document.getElementById("gamutOverlay"),
  richBlackPreset: document.getElementById("richBlackPreset"),
  safePrintAll: document.getElementById("safePrintAll"),
  summaryTotal: document.getElementById("summaryTotal"),
  summaryTac: document.getElementById("summaryTac"),
  summaryGamut: document.getElementById("summaryGamut"),
  summaryDelta: document.getElementById("summaryDelta"),
  summaryHint: document.getElementById("summaryHint"),
  pressJobName: document.getElementById("pressJobName"),
  pressClient: document.getElementById("pressClient"),
  pressMachine: document.getElementById("pressMachine"),
  pressMaterial: document.getElementById("pressMaterial"),
  pressTech: document.getElementById("pressTech"),
  pressNote: document.getElementById("pressNote"),
  qcInput: document.getElementById("qcInput"),
  qcThreshold: document.getElementById("qcThreshold"),
  qcParse: document.getElementById("qcParse"),
  qcStatus: document.getElementById("qcStatus"),  qcTableBody: document.getElementById("qcTableBody"),
  reportView: document.getElementById("qcReportView"),
  reportId: document.getElementById("qcReportId"),
  reportTime: document.getElementById("qcReportTime"),
  reportTotal: document.getElementById("qcReportTotal"),
  reportOverTac: document.getElementById("qcReportOverTac"),
  reportGamut: document.getElementById("qcReportGamut"),  reportTableBody: document.getElementById("qcReportTableBody"),
  reportRecommendations: document.getElementById("qcReportRecommendations"),
  reportPages: document.getElementById("qcReportPages")
};

const state = {
  items: [],
  tacLimit: 300,
  iccProfiles: [],
  iccSelectedId: "srgb",
  iccIntent: "perceptual",
  iccBpc: true,
  deltaMethod: "76",
  gamutThreshold: 5,
  gamutOverlay: false,
  richBlackPreset: "text",
  darkFabric: false,
  iccEngine: null,
  iccReady: false,
  iccLoading: false,
  qcEntries: [],
  qcErrors: 0,
  printMode: "cmyk",
  spotItems: [],
  screenFabricTone: "light",
  screenUnderbase: false,
  screenUnderbaseType: "full",
  screenCoverage: 100,
  screenHalftoneMode: "spot",
  screenHalftoneLpi: 55,
  screenDotGain: 35,
  screenPresets: null
};

const ASSET_STORAGE_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const FEED_STORAGE_KEY = "tc_community_feed";
const HANDOFF_FROM = "printcolor";
const REPORT_STORAGE_KEY = "tc_printcolor_qc_report_v1";
const SCREEN_REPORT_STORAGE_KEY = "tc_screenprint_report_v1";
const ROWS_PER_PAGE = 12;

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

const buildNormalizedList = (value) => {
  const tokens = String(value || "")
    .split(/[\s,;|]+/)
    .map((item) => item.trim())
    .filter(Boolean);
  const normalized = tokens.map(normalizeHex);
  const valid = normalized.filter(Boolean);
  const invalid = tokens.length - valid.length;
  return { tokens, valid, invalid };
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

const deltaE2000 = (lab1, lab2) => {
  const L1 = lab1.l;
  const a1 = lab1.a;
  const b1 = lab1.b;
  const L2 = lab2.l;
  const a2 = lab2.a;
  const b2 = lab2.b;
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

const getDelta = (lab1, lab2, method) =>
  method === "2000" ? deltaE2000(lab1, lab2) : deltaE(lab1, lab2);

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

const getDeltaMethodLabel = () =>
  state.deltaMethod === "2000" ? "CIEDE2000" : "ΔE76";

const buildItems = (list) => list.map((hex) => {
  const baseRgb = hexToRgb(hex);
  const cmyk = convertRgbToCmyk(baseRgb);
  const simRgb = convertCmykToRgb(cmyk);
  const baseLab = xyzToLab(rgbToXyz(baseRgb));
  const simLab = xyzToLab(rgbToXyz(simRgb));
  const delta = getDelta(baseLab, simLab, state.deltaMethod);
  return {
    hex,
    baseRgb,
    baseLab,
    cmyk,
    simRgb,
    simLab,
    delta
  };
});

const updateItemMetrics = (item) => {
  item.simRgb = convertCmykToRgb(item.cmyk);
  item.simLab = xyzToLab(rgbToXyz(item.simRgb));
  if (!item.baseLab) {
    item.baseLab = xyzToLab(rgbToXyz(item.baseRgb));
  }
  item.delta = getDelta(item.baseLab, item.simLab, state.deltaMethod);
};

const updateAllDeltas = () => {
  state.items.forEach((item) => {
    if (!item.baseLab) {
      item.baseLab = xyzToLab(rgbToXyz(item.baseRgb));
    }
    if (!item.simLab) {
      item.simLab = xyzToLab(rgbToXyz(item.simRgb));
    }
    item.delta = getDelta(item.baseLab, item.simLab, state.deltaMethod);
  });
};

const renderTable = () => {
  if (!elements.tableBody || !elements.tableWrap || !elements.empty) return;
  if (!state.items.length) {
    elements.tableBody.innerHTML = "";
    elements.tableWrap.classList.add("hidden");
    elements.empty.classList.remove("hidden");
    updateSummary();
    renderQcTable();
    return;
  }
  const deltaTag = state.deltaMethod === "2000" ? "ΔE2000" : "ΔE76";
  const rows = state.items.map((item, index) => {
    const tac = getTac(item.cmyk);
    const warn = tac > state.tacLimit ? "Vượt ngưỡng" : "Ổn";
    const warnClass = tac > state.tacLimit ? "tc-warn" : "";
    const simHex = rgbToHex(item.simRgb);
    const deltaLabel = getDeltaLabel(item.delta);
    const isGamut = item.delta > state.gamutThreshold;
    const gamutBadge = isGamut ? '<span class="tc-badge tc-warn">Vượt gamut</span>' : "";
    const needsUnderbase = state.darkFabric && isLightHex(item.hex);
    const underbaseBadge = needsUnderbase ? '<span class="tc-badge tc-warn">C\u1ea7n underbase tr\u1eafng</span>' : "";
    const disabled = tac <= state.tacLimit ? "disabled" : "";
    const rowClass = isGamut && state.gamutOverlay ? "tc-row-gamut" : "";
    const cmykText = `C ${item.cmyk.c}% \u00c2\u00b7 M ${item.cmyk.m}% \u00c2\u00b7 Y ${item.cmyk.y}% \u00c2\u00b7 K ${item.cmyk.k}%`;
    return `
      <tr data-row="${index}" class="${rowClass}">
        <td>
          <div class="tc-swatch-duo">
            <span class="tc-swatch" style="background:${item.hex};"></span>
            <span class="tc-swatch" style="background:${simHex};"></span>
          </div>
        </td>
        <td class="font-semibold">${item.hex}</td>
        <td>${cmykText}</td>
        <td>${tac}%</td>
        <td class="${warnClass}">${warn} ${gamutBadge} ${underbaseBadge}</td>
        <td>${deltaLabel} · ${deltaTag} ${item.delta.toFixed(1)}</td>
        <td>
          <div class="flex flex-wrap gap-1">
            <button class="tc-btn tc-chip px-2 py-1 text-xs" data-action="copy-cmyk" data-index="${index}">
              Sao ch\u00e9p CMYK
            </button>
            <button class="tc-btn tc-chip px-2 py-1 text-xs" data-action="copy-tac" data-index="${index}">
              Sao ch\u00e9p TAC
            </button>
            <button class="tc-btn tc-chip px-2 py-1 text-xs" data-action="reduce" data-index="${index}" ${disabled}>
              Gi\u1ea3m TAC
            </button>
          </div>
        </td>
      </tr>`;
  }).join("");
  elements.tableBody.innerHTML = rows;
  elements.tableWrap.classList.remove("hidden");
  elements.empty.classList.add("hidden");
  updateSummary();
  renderQcTable();
};

const updateSummary = () => {
  if (!elements.summaryTotal) return;
  const total = state.items.length;
  const tacOver = state.items.filter((item) => getTac(item.cmyk) > state.tacLimit).length;
  const gamutOver = state.items.filter((item) => item.delta > state.gamutThreshold).length;
  const maxDelta = state.items.reduce((max, item) => Math.max(max, item.delta), 0);
  elements.summaryTotal.textContent = String(total);
  if (elements.summaryTac) elements.summaryTac.textContent = String(tacOver);
  if (elements.summaryGamut) elements.summaryGamut.textContent = String(gamutOver);
  if (elements.summaryDelta) elements.summaryDelta.textContent = maxDelta.toFixed(1);
  if (!elements.summaryHint) return;
  if (!total) {
    elements.summaryHint.textContent = "Chưa có dữ liệu để kiểm tra.";
    return;
  }
  if (tacOver > 0) {
    elements.summaryHint.textContent = "Gợi ý: giảm TAC cho màu vượt ngưỡng.";
    return;
  }
  if (gamutOver > 0) {
    elements.summaryHint.textContent = "Gợi ý: cân nhắc đổi profile/intent hoặc giảm ngưỡng ΔE.";
    return;
  }
  elements.summaryHint.textContent = "Gợi ý: dữ liệu ổn, có thể xuất báo cáo in.";
};

const getQcThreshold = () => {
  if (!elements.qcThreshold) return 3;
  const value = Number(elements.qcThreshold.value || 3);
  return Number.isFinite(value) ? value : 3;
};

const buildQcResults = () => {
  if (!state.qcEntries.length) return [];
  const threshold = getQcThreshold();
  const byHex = new Map(state.items.map((item) => [item.hex, item]));
  return state.qcEntries.map((entry) => {
    const item = byHex.get(entry.hex);
    if (!item || !item.simLab) {
      return {
        ...entry,
        delta: null,
        pass: false,
        status: "Không tìm thấy"
      };
    }
    const delta = deltaE2000(item.simLab, entry.lab);
    return {
      ...entry,
      delta,
      pass: delta <= threshold,
      status: delta <= threshold ? "PASS" : "FAIL"
    };
  });
};

const renderQcTable = () => {
  if (!elements.qcTableBody || !elements.qcStatus) return;
  if (!state.qcEntries.length) {
    elements.qcTableBody.innerHTML = "";
    elements.qcStatus.textContent = "";
    return;
  }
  const results = buildQcResults();
  const threshold = getQcThreshold();
  let failCount = 0;
  const rows = results.map((row) => {
    if (row.delta == null) {
      return `\n      <tr>\n        <td class=\"font-semibold\">${row.hex}</td>\n        <td>-</td>\n        <td class=\"tc-muted\">${row.status}</td>\n      </tr>`;
    }
    const delta = row.delta.toFixed(2);
    const status = row.pass ? "PASS" : "FAIL";
    const statusClass = row.pass ? "tc-muted" : "tc-warn";
    if (!row.pass) failCount += 1;
    return `\n      <tr>\n        <td class=\"font-semibold\">${row.hex}</td>\n        <td>${delta}</td>\n        <td class=\"${statusClass}\">${status}</td>\n      </tr>`;
  }).join("");
  elements.qcTableBody.innerHTML = rows;
  elements.qcStatus.textContent = `Đã phân tích ${results.length} màu · ${failCount} vượt ngưỡng (${threshold}).`;
};

const parseQcInput = () => {
  if (!elements.qcInput) return;
  const lines = elements.qcInput.value.split(/\r?\n/);
  const entries = [];
  let errors = 0;
  lines.forEach((raw) => {
    const line = raw.trim();
    if (!line) return;
    const parts = line.split(",").map((part) => part.trim());
    if (parts.length < 4) {
      errors += 1;
      return;
    }
    const hex = normalizeHex(parts[0]);
    const l = Number(parts[1]);
    const a = Number(parts[2]);
    const b = Number(parts[3]);
    if (!hex || !Number.isFinite(l) || !Number.isFinite(a) || !Number.isFinite(b)) {
      errors += 1;
      return;
    }
    entries.push({ hex, lab: { l, a, b } });
  });
  state.qcEntries = entries;
  state.qcErrors = errors;
  if (errors > 0) {
    showToast(`Có ${errors} dòng lỗi.`);
  }
};

const updateTacDisplay = () => {
  const label = `${state.tacLimit}%`;
  if (elements.tacValue) elements.tacValue.textContent = label;
  if (elements.tacBadge) elements.tacBadge.textContent = label;
};

const setPrintMode = (mode) => {
  state.printMode = mode === "screen" ? "screen" : "cmyk";
  if (elements.cmykMode) elements.cmykMode.classList.toggle("hidden", state.printMode !== "cmyk");
  if (elements.screenMode) elements.screenMode.classList.toggle("hidden", state.printMode !== "screen");
  if (elements.printModeCmyk) {
    elements.printModeCmyk.classList.toggle("tc-btn-primary", state.printMode === "cmyk");
    elements.printModeCmyk.classList.toggle("tc-chip", state.printMode !== "cmyk");
  }
  if (elements.printModeScreen) {
    elements.printModeScreen.classList.toggle("tc-btn-primary", state.printMode === "screen");
    elements.printModeScreen.classList.toggle("tc-chip", state.printMode !== "screen");
  }
};

const renderSpotList = () => {
  if (!elements.screenSpotList || !elements.screenSpotEmpty) return;
  elements.screenSpotList.innerHTML = "";
  const items = state.spotItems || [];
  elements.screenSpotEmpty.classList.toggle("hidden", items.length > 0);
  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "flex flex-wrap items-center gap-2 tc-chip px-3 py-2";
    row.dataset.spotId = item.id;

    const swatch = document.createElement("span");
    swatch.className = "tc-swatch";
    swatch.style.background = item.hex;
    row.appendChild(swatch);

    const hex = document.createElement("span");
    hex.className = "text-xs font-semibold";
    hex.textContent = item.hex;
    row.appendChild(hex);

    const name = document.createElement("input");
    name.type = "text";
    name.className = "tc-input !min-h-0 !py-2 !px-2 w-[120px]";
    name.value = item.name || "";
    name.dataset.spotField = "name";
    row.appendChild(name);

    const passes = document.createElement("input");
    passes.type = "number";
    passes.min = "1";
    passes.max = "10";
    passes.className = "tc-input !min-h-0 !py-2 !px-2 w-[72px]";
    passes.value = String(item.passes || 1);
    passes.dataset.spotField = "passes";
    row.appendChild(passes);

    const note = document.createElement("input");
    note.type = "text";
    note.className = "tc-input !min-h-0 !py-2 !px-2 flex-1 min-w-[160px]";
    note.value = item.note || "";
    note.placeholder = "Ghi ch\u00fa";
    note.dataset.spotField = "note";
    row.appendChild(note);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "tc-btn tc-chip px-2 py-2 text-xs";
    remove.textContent = "X\u00f3a";
    remove.dataset.spotAction = "delete";
    row.appendChild(remove);

    elements.screenSpotList.appendChild(row);
  });
};

const buildSpotItemsFromHex = () => {
  const source = elements.input ? elements.input.value : "";
  const list = parseHexList(source);
  if (!list.length) {
    showToast("Ch\u01b0a c\u00f3 m\u00e0u spot \u0111\u1ec3 xu\u1ea5t.");
    return;
  }
  state.spotItems = list.map((hex, idx) => ({
    id: `${Date.now()}_${idx}`,
    hex,
    name: `M\u00e0u ${idx + 1}`,
    passes: 1,
    note: ""
  }));
  renderSpotList();
};

const updateSpotField = (target) => {
  const row = target.closest("[data-spot-id]");
  if (!row) return;
  const id = row.dataset.spotId;
  const field = target.dataset.spotField;
  const item = state.spotItems.find((spot) => spot.id === id);
  if (!item || !field) return;
  if (field === "passes") {
    const next = Number(target.value || 1);
    item.passes = Number.isNaN(next) ? 1 : Math.max(1, next);
    target.value = String(item.passes);
    return;
  }
  item[field] = target.value;
};
const getDotGainLabel = (value, presets) => {
  const list = presets?.dotGainLabels || [];
  for (const item of list) {
    if (value <= item.max) return item.label;
  }
  return value <= 30 ? "Th\u1ea5p" : value <= 60 ? "Trung b\u00ecnh" : "Cao";
};

const applyScreenPreset = (lpi) => {
  const presets = state.screenPresets?.presets || [];
  const current = presets.find((item) => Number(item.lpi) === Number(lpi));
  if (elements.screenAngleHint) elements.screenAngleHint.textContent = current?.angleHint || "\u2014";
  if (elements.screenMeshHint) elements.screenMeshHint.textContent = current?.meshHint || "\u2014";
};

const updateDotGainUI = () => {
  if (!elements.screenDotGain) return;
  const value = Number(elements.screenDotGain.value || state.screenDotGain || 0);
  state.screenDotGain = Number.isNaN(value) ? 0 : value;
  if (elements.screenDotGainLabel) {
    elements.screenDotGainLabel.textContent = getDotGainLabel(state.screenDotGain, state.screenPresets);
  }
};

const loadScreenPresets = async () => {
  try {
    const res = await fetch("../assets/knowledge/screenprint_presets_vi.json");
    if (!res.ok) throw new Error("bad_status");
    state.screenPresets = await res.json();
  } catch (err) {
    console.warn("Kh\u00f4ng th\u1ec3 t\u1ea3i preset in l\u01b0\u1edbi:", err);
    state.screenPresets = null;
  }
  applyScreenPreset(state.screenHalftoneLpi);
  updateDotGainUI();
};
const updateProfileNote = (presetKey) => {
  if (!elements.profileNote) return;
  const preset = PROFILE_PRESETS[presetKey];
  if (preset && preset.note) {
    elements.profileNote.textContent = preset.note;
    elements.profileNote.classList.remove("hidden");
  } else {
    elements.profileNote.textContent = "";
    elements.profileNote.classList.add("hidden");
  }
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

const pasteFromClipboard = async () => {
  if (!elements.input) return;
  if (!navigator.clipboard?.readText) {
    showToast("\u004b\u0068\u00f4\u006e\u0067\u0020\u0074\u0068\u1ec3\u0020\u0111\u1ecd\u0063\u0020\u0063\u006c\u0069\u0070\u0062\u006f\u0061\u0072\u0064\u002e");
    return;
  }
  try {
    const text = await navigator.clipboard.readText();
    const { valid, invalid } = buildNormalizedList(text);
    elements.input.value = valid.join("\n");
    state.items = buildItems(valid);
    renderTable();
    setHashColors(valid);
    showToast("\u0110\u00e3\u0020\u0064\u00e1\u006e\u0020" + valid.length + "\u0020\u006d\u00e0\u0075\u0020\u0068\u1ee3\u0070\u0020\u006c\u1ec7\u002c\u0020" + invalid + "\u0020\u006c\u1ed7\u0069\u002e");
  } catch (_err) {
    showToast("\u004b\u0068\u00f4\u006e\u0067\u0020\u0074\u0068\u1ec3\u0020\u0111\u1ecd\u0063\u0020\u0063\u006c\u0069\u0070\u0062\u006f\u0061\u0072\u0064\u002e");
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

const buildQcReport = () => {
  const createdAt = new Date().toISOString();
  const createdBy = window.tcAuth?.currentUser?.email || "";
  const profile = getSelectedProfile();
  const iccName = profile?.name || "sRGB";
  const inputHexes = state.items.map((item) => item.hex);
  const rows = state.items.map((item) => {
    const tac = getTac(item.cmyk);
    const overTac = tac > state.tacLimit;
    const gamutWarn = item.delta > state.gamutThreshold;
    return {
      hex: item.hex,
      c: item.cmyk.c,
      m: item.cmyk.m,
      y: item.cmyk.y,
      k: item.cmyk.k,
      tac,
      overTac,
      gamutWarn,
      note: overTac ? "TAC v\u01b0\u1ee3t ng\u01b0\u1ee1ng" : (gamutWarn ? "V\u01b0\u1ee3t gamut" : "")
    };
  });
  const summary = {
    total: rows.length,
    overTacCount: rows.filter((row) => row.overTac).length,
    gamutWarnCount: rows.filter((row) => row.gamutWarn).length
  };
  const warnings = [];
  if (summary.overTacCount > 0) warnings.push("C\u00f3 m\u00e0u v\u01b0\u1ee3t TAC.");
  if (summary.gamutWarnCount > 0) warnings.push("C\u00f3 m\u00e0u ngo\u00e0i gamut.");
  if (!summary.total) warnings.push("Ch\u01b0a c\u00f3 d\u1eef li\u1ec7u ki\u1ec3m tra.");
  const recommendations = [];
  if (summary.overTacCount > 0) recommendations.push("G\u1ee3i \u00fd: gi\u1ea3m TAC cho m\u00e0u v\u01b0\u1ee3t ng\u01b0\u1ee1ng.");
  if (summary.gamutWarnCount > 0) recommendations.push("G\u1ee3i \u00fd: c\u00e2n nh\u1eafc \u0111\u1ed5i ICC/intent ho\u1eb7c gi\u1ea3m ng\u01b0\u1ee1ng \u0394E.");
  if (!summary.total) recommendations.push("Ch\u01b0a c\u00f3 d\u1eef li\u1ec7u \u0111\u1ec3 ki\u1ec3m tra.");
  const reportId = buildReportId({
    inputHexes,
    tacLimit: state.tacLimit,
    presetTAC: state.tacLimit,
    iccName,
    intent: state.iccIntent,
    bpc: state.iccBpc,
    createdAt
  });
  return {
    createdAt,
    createdBy,
    presetTAC: state.tacLimit,
    tacLimit: state.tacLimit,
    iccName,
    intent: state.iccIntent,
    bpc: state.iccBpc,
    inputHexes,
    rows,
    summary,
    warnings,
    recommendations,
    reportId
  };
};

const storeQcReport = (report) => {
  try {
    localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(report));
  } catch (err) {
    console.warn("Kh\u00f4ng th\u1ec3 l\u01b0u b\u00e1o c\u00e1o QC:", err);
  }
};

const loadQcReport = (reportId) => {
  try {
    const raw = localStorage.getItem(REPORT_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (reportId && data?.reportId && data.reportId !== reportId) return data;
    return data;
  } catch (err) {
    console.warn("Kh\u00f4ng th\u1ec3 \u0111\u1ecdc b\u00e1o c\u00e1o QC:", err);
    return null;
  }
};

const isReportMode = () => {
  const params = new URLSearchParams(window.location.search);
  return Boolean(params.get("report"));
};

const renderQcReportView = (report) => {
  if (!elements.reportView || !elements.reportPages) return;
  elements.reportView.hidden = false;
  const data = report || {
    rows: [],
    summary: { total: 0, overTacCount: 0, gamutWarnCount: 0 },
    recommendations: [],
    reportId: "",
    createdAt: ""
  };
  const rows = Array.isArray(data.rows) ? data.rows : [];
  const reportId = data.reportId || "\u2014";
  const reportTime = data.createdAt ? new Date(data.createdAt).toLocaleString() : "\u2014";
  const totalPages = Math.max(1, Math.ceil(rows.length / ROWS_PER_PAGE));
  const recommendations = Array.isArray(data.recommendations) && data.recommendations.length
    ? data.recommendations
    : ["Kh\u00f4ng c\u00f3 khuy\u1ebfn ngh\u1ecb b\u1ed5 sung."];

  elements.reportPages.innerHTML = "";

  const buildHeader = (compact) => {
    const header = document.createElement("header");
    header.className = compact ? "qc-report-header qc-report-header--compact" : "qc-report-header";
    const left = document.createElement("div");
    if (!compact) {
      const eyebrow = document.createElement("p");
      eyebrow.className = "qc-report-eyebrow";
      eyebrow.textContent = "SpaceColors";
      left.appendChild(eyebrow);
    }
    const title = document.createElement("h1");
    title.className = "qc-report-title";
    title.textContent = "B\u00e1o c\u00e1o QC m\u00e0u in (CMYK)";
    left.appendChild(title);
    const sub = document.createElement("p");
    sub.className = "qc-report-sub";
    sub.textContent = compact ? "B\u1ea3n r\u00fat g\u1ecdn" : "B\u00e1o c\u00e1o ki\u1ec3m tra nhanh cho nh\u00e0 in.";
    left.appendChild(sub);
    header.appendChild(left);

    const meta = document.createElement("div");
    meta.className = "qc-report-meta";
    const metaId = document.createElement("div");
    metaId.innerHTML = `<span class="qc-report-meta-label">Report ID</span> ${reportId}`;
    const metaTime = document.createElement("div");
    metaTime.innerHTML = `<span class="qc-report-meta-label">Th\u1eddi gian</span> ${reportTime}`;
    meta.appendChild(metaId);
    meta.appendChild(metaTime);
    header.appendChild(meta);
    return header;
  };

  const buildSummary = () => {
    const summary = document.createElement("section");
    summary.className = "qc-report-summary";
    const total = document.createElement("div");
    total.className = "qc-report-chip";
    total.textContent = `T\u1ed5ng m\u00e0u ${data.summary?.total ?? 0}`;
    const tac = document.createElement("div");
    tac.className = "qc-report-chip";
    tac.textContent = `V\u01b0\u1ee3t TAC ${data.summary?.overTacCount ?? 0}`;
    const gamut = document.createElement("div");
    gamut.className = "qc-report-chip";
    gamut.textContent = `Ngo\u00e0i gamut ${data.summary?.gamutWarnCount ?? 0}`;
    summary.appendChild(total);
    summary.appendChild(tac);
    summary.appendChild(gamut);
    return summary;
  };

  const buildTopWarnings = () => {
    if (rows.length <= 60) return null;
    const container = document.createElement("div");
    container.className = "qc-report-top";
    const title = document.createElement("strong");
    title.textContent = "Top c\u1ea3nh b\u00e1o";
    container.appendChild(title);
    const list = document.createElement("div");
    const sorted = rows.slice().sort((a, b) => {
      const aScore = (a.overTac ? 2 : 0) + (a.gamutWarn ? 1 : 0);
      const bScore = (b.overTac ? 2 : 0) + (b.gamutWarn ? 1 : 0);
      return bScore - aScore;
    });
    const top = sorted.filter((row) => row.overTac || row.gamutWarn).slice(0, 20);
    if (!top.length) {
      const line = document.createElement("div");
      line.textContent = "Kh\u00f4ng c\u00f3 c\u1ea3nh b\u00e1o n\u1ed5i b\u1eadt.";
      list.appendChild(line);
    } else {
      top.forEach((row) => {
        const line = document.createElement("div");
        const tags = [];
        if (row.overTac) tags.push("V\u01b0\u1ee3t TAC");
        if (row.gamutWarn) tags.push("Ngo\u00e0i gamut");
        line.textContent = `${row.hex} \u00b7 ${tags.join(" \u00b7 ")}`;
        list.appendChild(line);
      });
    }
    container.appendChild(list);
    const note = document.createElement("div");
    note.textContent = "Danh s\u00e1ch d\u00e0i, vui l\u00f2ng xem CSV \u0111\u1ec3 x\u1eed l\u00fd chi ti\u1ebft.";
    container.appendChild(note);
    return container;
  };

  const buildTable = (pageRows) => {
    const section = document.createElement("section");
    section.className = "qc-report-table";
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["M\u00e0u", "HEX", "CMYK", "TAC", "Tr\u1ea1ng th\u00e1i", "Ghi ch\u00fa"].forEach((label) => {
      const th = document.createElement("th");
      th.textContent = label;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    if (!pageRows.length) {
      const tr = document.createElement("tr");
      tr.className = "qc-report-row";
      const td = document.createElement("td");
      td.colSpan = 6;
      td.textContent = "Ch\u01b0a c\u00f3 d\u1eef li\u1ec7u b\u00e1o c\u00e1o.";
      tr.appendChild(td);
      tbody.appendChild(tr);
    } else {
      pageRows.forEach((row) => {
        const tr = document.createElement("tr");
        tr.className = "qc-report-row";
        const swatch = document.createElement("span");
        swatch.className = "qc-report-swatch";
        swatch.style.background = row.hex;
        const colorCell = document.createElement("td");
        colorCell.appendChild(swatch);

        const hexCell = document.createElement("td");
        hexCell.textContent = row.hex;

        const cmykCell = document.createElement("td");
        cmykCell.textContent = `C ${row.c}% \u00b7 M ${row.m}% \u00b7 Y ${row.y}% \u00b7 K ${row.k}%`;

        const tacCell = document.createElement("td");
        tacCell.textContent = `${Math.round(row.tac)}%`;

        const statusCell = document.createElement("td");
        statusCell.textContent = row.overTac ? "V\u01b0\u1ee3t TAC" : (row.gamutWarn ? "Ngo\u00e0i gamut" : "OK");

        const noteCell = document.createElement("td");
        noteCell.textContent = row.note || "";

        tr.appendChild(colorCell);
        tr.appendChild(hexCell);
        tr.appendChild(cmykCell);
        tr.appendChild(tacCell);
        tr.appendChild(statusCell);
        tr.appendChild(noteCell);
        tbody.appendChild(tr);
      });
    }
    table.appendChild(tbody);
    section.appendChild(table);
    return section;
  };

  const buildNotes = () => {
    const notes = document.createElement("section");
    notes.className = "qc-report-notes";
    const wrap = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = "Khuy\u1ebfn ngh\u1ecb";
    wrap.appendChild(title);
    const list = document.createElement("ul");
    recommendations.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
    wrap.appendChild(list);
    notes.appendChild(wrap);
    const disclaimer = document.createElement("p");
    disclaimer.className = "qc-report-disclaimer";
    disclaimer.textContent = "Ghi ch\u00fa: B\u00e1o c\u00e1o n\u00e0y d\u00f9ng chuy\u1ec3n \u0111\u1ed5i CMYK x\u1ea5p x\u1ec9, ch\u01b0a \u00e1p d\u1ee5ng ICC chuy\u00ean s\u00e2u.";
    notes.appendChild(disclaimer);
    return notes;
  };

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
    const page = document.createElement("div");
    page.className = "qc-report-page qc-report-card";
    const compact = pageIndex > 0;
    page.appendChild(buildHeader(compact));
    if (!compact) {
      page.appendChild(buildSummary());
      const topWarnings = buildTopWarnings();
      if (topWarnings) page.appendChild(topWarnings);
    }

    const pageRows = rows.slice(pageIndex * ROWS_PER_PAGE, (pageIndex + 1) * ROWS_PER_PAGE);
    page.appendChild(buildTable(pageRows));

    if (!compact) {
      page.appendChild(buildNotes());
    }

    const footer = document.createElement("div");
    footer.className = "qc-report-footer";
    footer.textContent = `Trang ${pageIndex + 1}/${totalPages} \u00b7 Report ID: ${reportId} \u00b7 ${reportTime}`;
    page.appendChild(footer);
    elements.reportPages.appendChild(page);
  }
};

const renderScreenReportView = (report) => {
  if (!elements.screenReportView || !elements.screenReportPages) return;
  elements.screenReportView.hidden = false;
  const data = report || { rows: [], jobInfo: {}, screenInfo: {}, processInfo: {}, reportId: "", createdAt: "" };
  const rows = Array.isArray(data.rows) ? data.rows : [];
  const reportId = data.reportId || "\u2014";
  const reportTime = data.createdAt ? new Date(data.createdAt).toLocaleString() : "\u2014";
  const totalPages = Math.max(1, Math.ceil(rows.length / ROWS_PER_PAGE));
  const recommendations = Array.isArray(data.recommendations) && data.recommendations.length
    ? data.recommendations
    : ["Kh\u00f4ng c\u00f3 khuy\u1ebfn ngh\u1ecb b\u1ed5 sung."];

  elements.screenReportPages.innerHTML = "";

  const buildHeader = (compact) => {
    const header = document.createElement("header");
    header.className = compact ? "qc-report-header qc-report-header--compact" : "qc-report-header";
    const left = document.createElement("div");
    if (!compact) {
      const eyebrow = document.createElement("p");
      eyebrow.className = "qc-report-eyebrow";
      eyebrow.textContent = "SpaceColors";
      left.appendChild(eyebrow);
    }
    const title = document.createElement("h1");
    title.className = "qc-report-title";
    title.textContent = "Phi\u1ebfu k\u1ef9 thu\u1eadt in l\u01b0\u1edbi";
    left.appendChild(title);
    const sub = document.createElement("p");
    sub.className = "qc-report-sub";
    sub.textContent = compact ? "B\u1ea3n r\u00fat g\u1ecdn" : "D\u00f9ng \u0111\u1ec3 giao ti\u1ebfp v\u1edbi x\u01b0\u1edfng in.";
    left.appendChild(sub);
    header.appendChild(left);

    const meta = document.createElement("div");
    meta.className = "qc-report-meta";
    const metaId = document.createElement("div");
    metaId.innerHTML = `<span class="qc-report-meta-label">Report ID</span> ${reportId}`;
    const metaTime = document.createElement("div");
    metaTime.innerHTML = `<span class="qc-report-meta-label">Th\u1eddi gian</span> ${reportTime}`;
    meta.appendChild(metaId);
    meta.appendChild(metaTime);
    header.appendChild(meta);
    return header;
  };

  const buildJobInfo = () => {
    const section = document.createElement("section");
    section.className = "qc-report-top";
    const lines = [
      `T\u00ean Job: ${data.jobInfo?.jobName || "\u2014"}`,
      `Kh\u00e1ch h\u00e0ng: ${data.jobInfo?.client || "\u2014"}`,
      `M\u00e1y in: ${data.jobInfo?.machine || "\u2014"}`,
      `Gi\u1ea5y/V\u1eadt li\u1ec7u: ${data.jobInfo?.material || "\u2014"}`,
      `C\u00f4ng ngh\u1ec7: ${data.jobInfo?.tech || "\u2014"}`,
      `Ghi ch\u00fa: ${data.jobInfo?.note || "\u2014"}`
    ];
    const title = document.createElement("strong");
    title.textContent = "Job info";
    section.appendChild(title);
    lines.forEach((line) => {
      const div = document.createElement("div");
      div.textContent = line;
      section.appendChild(div);
    });
    return section;
  };

  const buildScreenInfo = () => {
    const section = document.createElement("section");
    section.className = "qc-report-top";
    const toneLabel = data.screenInfo?.fabricTone === "dark" ? "T\u1ed1i" : data.screenInfo?.fabricTone === "mid" ? "Trung t\u00ednh" : "Tr\u1eafng/S\u00e1ng";
    const underbaseLabel = data.screenInfo?.underbase ? "B\u1eadt" : "T\u1eaft";
    const lines = [
      `N\u1ec1n \u00e1o: ${toneLabel}`,
      `Underbase: ${underbaseLabel}`,
      `Ki\u1ec3u underbase: ${data.screenInfo?.underbaseType || "\u2014"}`,
      `M\u1ee9c ph\u1ee7: ${data.screenInfo?.coverage ?? "\u2014"}%`
    ];
    const title = document.createElement("strong");
    title.textContent = "N\u1ec1n \u00e1o & Underbase";
    section.appendChild(title);
    lines.forEach((line) => {
      const div = document.createElement("div");
      div.textContent = line;
      section.appendChild(div);
    });
    return section;
  };

  const buildProcessInfo = () => {
    const section = document.createElement("section");
    section.className = "qc-report-top";
    const lines = [
      `Mode: ${data.processInfo?.mode || "\u2014"}`,
      `LPI: ${data.processInfo?.lpi || "\u2014"}`,
      `G\u00f3c tram: ${data.processInfo?.angleHint || "\u2014"}`,
      `Mesh g\u1ee3i \u00fd: ${data.processInfo?.meshHint || "\u2014"}`,
      `T\u0103ng tram: ${data.processInfo?.dotGain ?? "\u2014"}%`
    ];
    const title = document.createElement("strong");
    title.textContent = "Thi\u1ebft l\u1eadp tram";
    section.appendChild(title);
    lines.forEach((line) => {
      const div = document.createElement("div");
      div.textContent = line;
      section.appendChild(div);
    });
    return section;
  };

  const buildTopWarnings = () => {
    if (rows.length <= 60) return null;
    const container = document.createElement("div");
    container.className = "qc-report-top";
    const title = document.createElement("strong");
    title.textContent = "Top c\u1ea3nh b\u00e1o";
    container.appendChild(title);
    const list = document.createElement("div");
    const sorted = rows.slice().sort((a, b) => (b.passes || 1) - (a.passes || 1));
    const top = sorted.slice(0, 20);
    top.forEach((row) => {
      const line = document.createElement("div");
      line.textContent = `${row.hex} \u00b7 ${row.name || ""} \u00b7 ${row.passes || 1} l\u1ea7n`;
      list.appendChild(line);
    });
    container.appendChild(list);
    const note = document.createElement("div");
    note.textContent = "Danh s\u00e1ch d\u00e0i, vui l\u00f2ng xem CSV \u0111\u1ec3 x\u1eed l\u00fd chi ti\u1ebft.";
    container.appendChild(note);
    return container;
  };

  const buildTable = (pageRows) => {
    const section = document.createElement("section");
    section.className = "qc-report-table";
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["Th\u1ee9 t\u1ef1", "M\u00e0u", "T\u00ean", "L\u01b0\u1ee3t in", "Ghi ch\u00fa"].forEach((label) => {
      const th = document.createElement("th");
      th.textContent = label;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    if (!pageRows.length) {
      const tr = document.createElement("tr");
      tr.className = "qc-report-row";
      const td = document.createElement("td");
      td.colSpan = 5;
      td.textContent = "Ch\u01b0a c\u00f3 d\u1eef li\u1ec7u.";
      tr.appendChild(td);
      tbody.appendChild(tr);
    } else {
      pageRows.forEach((row) => {
        const tr = document.createElement("tr");
        tr.className = "qc-report-row";
        const orderCell = document.createElement("td");
        orderCell.textContent = row.order;
        const colorCell = document.createElement("td");
        const swatch = document.createElement("span");
        swatch.className = "qc-report-swatch";
        swatch.style.background = row.hex;
        colorCell.appendChild(swatch);
        const hexSpan = document.createElement("span");
        hexSpan.textContent = row.hex;
        colorCell.appendChild(hexSpan);
        const nameCell = document.createElement("td");
        nameCell.textContent = row.name || "";
        const passCell = document.createElement("td");
        passCell.textContent = row.passes || 1;
        const noteCell = document.createElement("td");
        noteCell.textContent = row.note || "";
        tr.appendChild(orderCell);
        tr.appendChild(colorCell);
        tr.appendChild(nameCell);
        tr.appendChild(passCell);
        tr.appendChild(noteCell);
        tbody.appendChild(tr);
      });
    }
    table.appendChild(tbody);
    section.appendChild(table);
    return section;
  };

  const buildNotes = () => {
    const notes = document.createElement("section");
    notes.className = "qc-report-notes";
    const wrap = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = "Khuy\u1ebfn ngh\u1ecb";
    wrap.appendChild(title);
    const list = document.createElement("ul");
    recommendations.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
    wrap.appendChild(list);
    notes.appendChild(wrap);
    return notes;
  };

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
    const page = document.createElement("div");
    page.className = "qc-report-page qc-report-card";
    const compact = pageIndex > 0;
    page.appendChild(buildHeader(compact));
    if (!compact) {
      page.appendChild(buildJobInfo());
      page.appendChild(buildScreenInfo());
      page.appendChild(buildProcessInfo());
      const topWarnings = buildTopWarnings();
      if (topWarnings) page.appendChild(topWarnings);
    }
    const pageRows = rows.slice(pageIndex * ROWS_PER_PAGE, (pageIndex + 1) * ROWS_PER_PAGE);
    page.appendChild(buildTable(pageRows));
    if (!compact) {
      page.appendChild(buildNotes());
    }
    const footer = document.createElement("div");
    footer.className = "qc-report-footer";
    footer.textContent = `Trang ${pageIndex + 1}/${totalPages} \u00b7 Report ID: ${reportId}`;
    page.appendChild(footer);
    elements.screenReportPages.appendChild(page);
  }
};
const openReportView = (report) => {
  storeQcReport(report);
  const url = new URL(window.location.href);
  url.searchParams.set("report", "1");
  if (report?.reportId) url.searchParams.set("reportId", report.reportId);
  const popup = window.open(url.toString(), "_blank", "noopener");
  if (!popup) window.location.href = url.toString();
};

const initReportView = () => {
  if (!isReportMode()) return false;
  document.body?.setAttribute("data-report", "1");
  const params = new URLSearchParams(window.location.search);
  const reportId = params.get("reportId");
  if (params.get("report") === "screenprint") {
    const report = loadScreenReport(reportId);
    renderScreenReportView(report);
    return true;
  }
  const report = loadQcReport(reportId);
  renderQcReportView(report);
  return true;
};

const storeScreenReport = (report) => {
  try {
    localStorage.setItem(SCREEN_REPORT_STORAGE_KEY, JSON.stringify(report));
  } catch (err) {
    console.warn("Kh\u00f4ng th\u1ec3 l\u01b0u phi\u1ebfu in l\u01b0\u1edbi:", err);
  }
};

const loadScreenReport = (reportId) => {
  try {
    const raw = localStorage.getItem(SCREEN_REPORT_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (reportId && data?.reportId && data.reportId !== reportId) return data;
    return data;
  } catch (err) {
    console.warn("Kh\u00f4ng th\u1ec3 \u0111\u1ecdc phi\u1ebfu in l\u01b0\u1edbi:", err);
    return null;
  }
};

const buildScreenReport = () => {
  const createdAt = new Date().toISOString();
  const createdBy = window.tcAuth?.currentUser?.email || "";
  const rows = (state.spotItems || []).map((item, idx) => ({
    order: idx + 1,
    hex: item.hex,
    name: item.name || "",
    passes: item.passes || 1,
    note: item.note || ""
  }));
  const jobInfo = {
    jobName: elements.pressJobName?.value.trim() || "\u2014",
    client: elements.pressClient?.value.trim() || "\u2014",
    machine: elements.pressMachine?.value.trim() || "\u2014",
    material: elements.pressMaterial?.value.trim() || "\u2014",
    tech: elements.pressTech?.value || "\u2014",
    note: elements.pressNote?.value.trim() || "\u2014"
  };
  const screenInfo = {
    fabricTone: state.screenFabricTone,
    underbase: state.screenUnderbase,
    underbaseType: state.screenUnderbaseType,
    coverage: state.screenCoverage
  };
  const processInfo = {
    mode: state.screenHalftoneMode,
    lpi: state.screenHalftoneLpi,
    angleHint: elements.screenAngleHint?.textContent || "\u2014",
    meshHint: elements.screenMeshHint?.textContent || "\u2014",
    dotGain: state.screenDotGain
  };
  const warnings = [];
  if (!rows.length) warnings.push("Ch\u01b0a c\u00f3 m\u00e0u spot.");
  if (screenInfo.fabricTone === "dark" && !screenInfo.underbase) {
    warnings.push("N\u1ec1n v\u1ea3i t\u1ed1i ch\u01b0a b\u1eadt underbase.");
  }
  const recommendations = [];
  if (screenInfo.fabricTone === "dark" && !screenInfo.underbase) {
    recommendations.push("G\u1ee3i \u00fd: b\u1eadt underbase tr\u1eafng \u0111\u1ec3 gi\u1eef t\u00f4ng m\u00e0u.");
  }
  if (rows.length > 12) recommendations.push("B\u00e1o c\u00e1o s\u1ebd t\u1ef1 chia trang theo 12 m\u00e0u.");
  const reportId = buildReportId({
    type: "screenprint",
    createdAt,
    rows,
    screenInfo,
    processInfo
  });
  return {
    createdAt,
    createdBy,
    reportId,
    jobInfo,
    screenInfo,
    processInfo,
    rows,
    warnings,
    recommendations
  };
};

const openScreenReportView = (report) => {
  storeScreenReport(report);
  const url = new URL(window.location.href);
  url.searchParams.set("report", "screenprint");
  if (report?.reportId) url.searchParams.set("reportId", report.reportId);
  const popup = window.open(url.toString(), "_blank", "noopener");
  if (!popup) window.location.href = url.toString();
};
const buildReportId = (payload) => {
  const text = JSON.stringify(payload);
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return (hash >>> 0).toString(16);
};

const formatQcFilename = () => {
  const now = new Date();
  const pad = (v) => String(v).padStart(2, "0");
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
  return `QC_CMYK_${stamp}`;
};

const formatScreenFilename = () => {
  const now = new Date();
  const pad = (v) => String(v).padStart(2, "0");
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
  return `SCREENPRINT_${stamp}`;
};

const exportScreenCsv = (report) => {
  const header = "order,hex,name,passes,note";
  const rows = report.rows.map((row) => [
    row.order,
    row.hex,
    row.name || "",
    row.passes || 1,
    row.note || ""
  ].map((value) => {
    const text = String(value).replace(/"/g, '""');
    return `"${text}"`;
  }).join(","));
  return [header, ...rows].join("\n");
};

const exportScreenJson = (report) => JSON.stringify(report, null, 2);

const downloadText = (filename, content, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const exportQcCsv = (report) => {
  const header = "hex,c,m,y,k,tac,overTac,gamutWarn,note";
  const rows = report.rows.map((row) => [
    row.hex,
    row.c,
    row.m,
    row.y,
    row.k,
    row.tac,
    row.overTac,
    row.gamutWarn,
    row.note || ""
  ].join(","));
  return [header, ...rows].join("\n");
};

const exportQcJson = (report) => JSON.stringify(report, null, 2);

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
  const methodLabel = getDeltaMethodLabel();
  const prepress = {
    jobName: elements.pressJobName?.value.trim() || "—",
    client: elements.pressClient?.value.trim() || "—",
    machine: elements.pressMachine?.value.trim() || "—",
    material: elements.pressMaterial?.value.trim() || "—",
    tech: elements.pressTech?.value || "—",
    note: elements.pressNote?.value.trim() || "—"
  };
  const lines = [];
  lines.push("Báo cáo in");
  lines.push("Phiếu Prepress");
  lines.push(`Tên Job: ${prepress.jobName}`);
  lines.push(`Khách hàng: ${prepress.client}`);
  lines.push(`Máy in: ${prepress.machine}`);
  lines.push(`Giấy/Vật liệu: ${prepress.material}`);
  lines.push(`Công nghệ: ${prepress.tech}`);
  lines.push(`Ghi chú: ${prepress.note}`);
  lines.push("");
  lines.push(`Profile: ${profile?.name || "sRGB"}`);
  lines.push(`Intent: ${intentLabel}`);
  lines.push(`BPC: ${bpcLabel}`);
  lines.push(`TAC ngưỡng: ${state.tacLimit}%`);
  lines.push(`Phương pháp ΔE: ${methodLabel}`);
  lines.push(`Ngưỡng ΔE (${methodLabel}): ${state.gamutThreshold}`);
  lines.push("");
  const outOfGamut = state.items.filter((item) => item.delta > state.gamutThreshold);
  lines.push(`Số màu vượt gamut: ${outOfGamut.length}`);
  if (outOfGamut.length) {
    lines.push("Danh sách vượt gamut:");
    outOfGamut.forEach((item) => {
      lines.push(`- ${item.hex} (ΔE ${item.delta.toFixed(1)})`);
    });
  }
  if (state.qcEntries.length) {
    const qcThreshold = getQcThreshold();
    const qcResults = buildQcResults();
    const qcFails = qcResults.filter((row) => row.delta != null && !row.pass);
    const qcMissing = qcResults.filter((row) => row.delta == null);
    lines.push("");
    lines.push("QC đo màu");
    lines.push(`Ngưỡng ΔE2000: ${qcThreshold}`);
    lines.push(`Số màu QC: ${qcResults.length}`);
    lines.push(`Số màu FAIL: ${qcFails.length}`);
    if (qcMissing.length) {
      lines.push(`Không tìm thấy trong bảng: ${qcMissing.length}`);
    }
    if (state.qcErrors > 0) {
      lines.push(`Dòng lỗi khi parse: ${state.qcErrors}`);
    }
    if (qcFails.length) {
      lines.push("Danh sách FAIL:");
      qcFails.forEach((row) => {
        lines.push(`- ${row.hex} (ΔE2000 ${row.delta.toFixed(2)})`);
      });
    }
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
  if (elements.paste) elements.paste.addEventListener("click", pasteFromClipboard);
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
      updateProfileNote(elements.profilePreset.value);
      renderTable();
    });
  }
  if (elements.darkFabric) {
    elements.darkFabric.addEventListener("change", () => {
      state.darkFabric = elements.darkFabric.checked;
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
      const button = event.target.closest("[data-action]");
      if (!button) return;
      const action = button.getAttribute("data-action");
      const index = Number(button.getAttribute("data-index"));
      if (Number.isNaN(index)) return;
      const item = state.items[index];
      if (!item) return;
      if (action === "reduce") {
        handleReduce(index);
        return;
      }
      if (action === "copy-cmyk") {
        const text = `C ${item.cmyk.c}% \u00b7 M ${item.cmyk.m}% \u00b7 Y ${item.cmyk.y}% \u00b7 K ${item.cmyk.k}%`;
        copyToClipboard(text).then(() => showToast("\u0110\u00e3 sao ch\u00e9p CMYK."));
        return;
      }
      if (action === "copy-tac") {
        const text = `${getTac(item.cmyk)}%`;
        copyToClipboard(text).then(() => showToast("\u0110\u00e3 sao ch\u00e9p TAC."));
      }
    });
  }
  if (elements.exportCopy) {
    elements.exportCopy.textContent = "Xuất Bản thông số";
    elements.exportCopy.addEventListener("click", exportData);
  }
  if (elements.qcExport) {
    elements.qcExport.addEventListener("click", () => {
      if (!state.items.length) {
        showToast("Ch\u01b0a c\u00f3 d\u1eef li\u1ec7u \u0111\u1ec3 xu\u1ea5t b\u00e1o c\u00e1o QC.");
        return;
      }
      const report = buildQcReport();
      const base = formatQcFilename();
      const type = elements.qcExportType?.value || "csv";
      if (type === "pdf") {
        openReportView(report);
        showToast("\u0110\u00e3 m\u1edf b\u00e1o c\u00e1o \u0111\u1ec3 in.");
        return;
      }
      if (type === "json") {
        downloadText(base + ".json", exportQcJson(report), "application/json");
        showToast("\u0110\u00e3 xu\u1ea5t b\u00e1o c\u00e1o QC (JSON).");
        return;
      }
      downloadText(base + ".csv", exportQcCsv(report), "text/csv");
      showToast("\u0110\u00e3 xu\u1ea5t b\u00e1o c\u00e1o QC (CSV).");
    });
  }
  
  if (elements.screenExport) {
    elements.screenExport.addEventListener("click", () => {
      if (!state.spotItems.length) {
        showToast("Ch\u01b0a c\u00f3 m\u00e0u spot \u0111\u1ec3 xu\u1ea5t.");
        return;
      }
      const report = buildScreenReport();
      const base = formatScreenFilename();
      const type = elements.screenExportType?.value || "csv";
      if (type === "pdf") {
        openScreenReportView(report);
        showToast("\u0110\u00e3 m\u1edf phi\u1ebfu k\u1ef9 thu\u1eadt \u0111\u1ec3 in.");
        return;
      }
      if (type === "json") {
        downloadText(base + ".json", exportScreenJson(report), "application/json");
        showToast("\u0110\u00e3 xu\u1ea5t phi\u1ebfu k\u1ef9 thu\u1eadt (JSON).");
        return;
      }
      downloadText(base + ".csv", exportScreenCsv(report), "text/csv");
      showToast("\u0110\u00e3 xu\u1ea5t phi\u1ebfu k\u1ef9 thu\u1eadt (CSV).");
    });
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
  if (elements.deltaMethod) {
    elements.deltaMethod.addEventListener("change", () => {
      state.deltaMethod = elements.deltaMethod.value;
      updateAllDeltas();
      renderTable();
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
  if (elements.qcParse) {
    elements.qcParse.addEventListener("click", () => {
      parseQcInput();
      renderQcTable();
    });
  }
  if (elements.qcThreshold) {
    elements.qcThreshold.addEventListener("input", () => {
      renderQcTable();
    });
  }
};

const applyHexesFromHub = (detail) => {
  const rawList = Array.isArray(detail?.hexes) ? detail.hexes : [];
  const mode = detail?.mode === "append" ? "append" : "replace";
  const normalized = rawList.map((hex) => normalizeHex(hex)).filter(Boolean);
  if (!normalized.length || !elements.input) return;
  const base = mode === "append" ? parseHexList(elements.input.value) : [];
  const combined = [...base, ...normalized];
  const unique = combined.filter((hex, idx) => combined.indexOf(hex) === idx);
  elements.input.value = unique.join(", ");
  elements.apply?.click();
};

if (!initReportView()) {
  updateTacDisplay();
  if (elements.iccBpc) {
    elements.iccBpc.checked = state.iccBpc;
  }
  if (elements.deltaMethod) {
    elements.deltaMethod.value = state.deltaMethod;
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
  if (elements.profilePreset) {
    updateProfileNote(elements.profilePreset.value);
  }
  if (elements.darkFabric) {
    elements.darkFabric.checked = state.darkFabric;
  }
  initProfiles();
  bindEvents();
  setPrintMode(state.printMode);
  renderSpotList();
  if (elements.screenHalftoneMode) {
    elements.screenHalftoneMode.value = state.screenHalftoneMode;
  }
  if (elements.screenHalftoneLpi) {
    elements.screenHalftoneLpi.value = String(state.screenHalftoneLpi);
  }
  if (elements.screenDotGain) {
    elements.screenDotGain.value = String(state.screenDotGain);
  }
  loadScreenPresets();
  applyFromHash();

  window.addEventListener("hashchange", () => {
    applyFromHash();
  });

  window.addEventListener("tc:hex-apply", (event) => {
    applyHexesFromHub(event?.detail);
  });
}
