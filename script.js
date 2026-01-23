import { saveSearch, getSavedSearch, listSavedSearches, deleteSavedSearch } from "./library.js";
import { composeHandoff } from "./scripts/handoff.js";
import { normalizeAndDedupeThreads } from "./data_normalize.js";
import {
  submitThread,
  listPendingSubmissions,
  voteOnSubmission,
  getVoteSummary,
  isAdmin,
  promoteSubmissionToVerified
} from "./crowd.js";
//======================= UTILITIES =======================
function normalizeHex(hex) {
  if (!hex || typeof hex !== "string") return null;
  let v = hex.trim().toLowerCase().replace(/^##/, "#");
  if (!v.startsWith("#")) v = "#" + v;
  return /^#[0-9a-f]{6}$/.test(v) ? v : null;
}

function hexToRgbArray(hex) {
  const num = parseInt(hex.slice(1), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToLab([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  let y = (r * 0.2126 + g * 0.7152 + b * 0.0722);
  let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.cbrt(x) : (7.787 * x + 16 / 116);
  y = y > 0.008856 ? Math.cbrt(y) : (7.787 * y + 16 / 116);
  z = z > 0.008856 ? Math.cbrt(z) : (7.787 * z + 16 / 116);

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

const labCache = new Map();

function getLabForHex(hex) {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  const cached = labCache.get(normalized);
  if (cached) return cached;
  const lab = rgbToLab(hexToRgbArray(normalized));
  labCache.set(normalized, lab);
  return lab;
}

function t(key, fallback, params) {
  if (window.tcI18n?.t) return window.tcI18n.t(key, fallback, params);
  return fallback || "";
}

function isDevEnv() {
  const host = window.location?.hostname || "";
  if (host === "localhost" || host === "127.0.0.1") return true;
  try {
    return new URLSearchParams(window.location.search).get("debug") === "1";
  } catch (_err) {
    return false;
  }
}

function logDebug(...args) {
  if (!isDevEnv()) return;
  console.debug(...args);
}

function ensureLab(thread) {
  if (!thread) return null;
  if (!Array.isArray(thread.lab) || thread.lab.length !== 3) {
    thread.lab = getLabForHex(thread.hex);
  }
  return thread.lab;
}

function normalizeBrandKey(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function normalizeCodeKey(code) {
  return String(code || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, " ");
}

function isVerifiedThread(thread) {
  const conf = typeof thread?.confidence === "number" ? thread.confidence : 0;
  return conf >= 0.85 || thread?.source?.type === "CROWD_VERIFIED";
}

function rebuildIndexes(list = threads) {
  const byBrand = new Map();
  const byCode = new Map();
  const byCanonical = new Map();
  const brandKeyMap = new Map();

  list.forEach((thread) => {
    if (!thread) return;
    const brandName = (thread.brand || "").trim();
    const codeValue = (thread.code || "").trim();
    if (!brandName || !codeValue) return;
    const brandKey = normalizeBrandKey(brandName);
    const codeKey = normalizeCodeKey(codeValue);
    if (!brandKey || !codeKey) return;
    const canonicalKey = `${brandKey}::${codeKey}`;

    if (!byBrand.has(brandName)) byBrand.set(brandName, []);
    byBrand.get(brandName).push(thread);

    if (!byCode.has(codeKey)) byCode.set(codeKey, []);
    byCode.get(codeKey).push(thread);

    if (!byCanonical.has(canonicalKey)) {
      byCanonical.set(canonicalKey, thread);
    }

    if (!brandKeyMap.has(brandKey) || brandName.length > brandKeyMap.get(brandKey).length) {
      brandKeyMap.set(brandKey, brandName);
    }
  });

  threadsByBrand = byBrand;
  threadsByCode = byCode;
  threadsByCanonicalKey = byCanonical;
  brandKeyToName = brandKeyMap;
  brandNamesSorted = Array.from(brandKeyMap.entries())
    .map(([key, name]) => ({ key, name }))
    .sort((a, b) => b.name.length - a.name.length);
}

function deltaE76(lab1, lab2) {
  return Math.sqrt(
    (lab1[0] - lab2[0]) ** 2 +
    (lab1[1] - lab2[1]) ** 2 +
    (lab1[2] - lab2[2]) ** 2
  );
}

function deltaE2000(lab1, lab2) {
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
}

function getDelta(lab1, lab2, method) {
  return method === "2000" ? deltaE2000(lab1, lab2) : deltaE76(lab1, lab2);
}

function formatLab(lab) {
  return lab.map(v => v.toFixed(2));
}

function hexToRgbString(hex) {
  const [r, g, b] = hexToRgbArray(hex);
  return { rgbArray: [r, g, b], rgbString: `rgb(${r}, ${g}, ${b})` };
}

function hexToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [
    Math.round(h * 360),
    Math.round(s * 100),
    Math.round(l * 100)
  ];
}

//======================= GLOBAL STATE =======================
let threads = [];
let isDataReady = false;
let lastResults = null;
let lastChosenHex = null;
let currentDeltaThreshold = 3.0;
let currentDeltaMethod = "76";
let selectedItemEl = null;
let lastFocusedItem = null;
let currentUser = null;
let currentRendered = [];
let isAdminUser = false;
let useVerifiedOnly = false;
let verifiedThreads = [];
let pendingSubmissions = [];

const telemetry = (() => {
  const endpoint = window.TC_TELEMETRY_ENDPOINT
    || "https://us-central1-thread-colors-for-community.cloudfunctions.net/telemetryIngest";
  const sessionKey = "tc_session_id";
  const now = () => Date.now();
  const isLocalhost = () => {
    const host = window.location?.hostname || "";
    return host === "localhost" || host === "127.0.0.1";
  };
  const isTelemetryEnabled = () => {
    if (!isLocalhost()) return true;
    try {
      return new URLSearchParams(window.location.search).get("telemetry") === "1";
    } catch (_err) {
      return false;
    }
  };
  const getSessionId = () => {
    try {
      const existing = sessionStorage.getItem(sessionKey);
      if (existing) return existing;
      const next = (window.crypto?.randomUUID?.() || `sess-${now()}-${Math.random().toString(16).slice(2)}`);
      sessionStorage.setItem(sessionKey, next);
      return next;
    } catch (_err) {
      return `sess-${now()}-${Math.random().toString(16).slice(2)}`;
    }
  };
  const sessionId = getSessionId();
const counts = { search_start: 0, search_result: 0, pin: 0, copy: 0, save: 0 };
const ASSET_STORAGE_KEY = "tc_asset_library_v1";
const FEED_STORAGE_KEY = "tc_community_feed";
const HANDOFF_FROM = "threadcolor";
  const lastSent = { ...counts };
  let flushTimer = null;
  let lastFlushAt = now();

  const sendPayload = (payload, useBeacon = false) => {
    if (!isTelemetryEnabled()) return false;
    const body = JSON.stringify(payload);
    try {
      if (useBeacon && navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon(endpoint, blob);
        return true;
      }
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 1200);
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal: controller.signal
      })
        .catch(() => {})
        .finally(() => window.clearTimeout(timeoutId));
      return true;
    } catch (_err) {
      return false;
    }
  };

  const buildDelta = () => {
    const delta = {};
    let has = false;
    Object.keys(counts).forEach((key) => {
      const diff = counts[key] - lastSent[key];
      if (diff > 0) {
        delta[key] = diff;
        has = true;
      }
    });
    return has ? delta : null;
  };

  const flush = (useBeacon = false) => {
    const delta = buildDelta();
    if (!delta) return;
    const payload = {
      sessionId,
      world: document.documentElement?.dataset?.world || "origami",
      ts: new Date().toISOString(),
      counts: delta
    };
    sendPayload(payload, useBeacon);
    Object.keys(delta).forEach((key) => {
      lastSent[key] += delta[key];
    });
    lastFlushAt = now();
  };

  const scheduleFlush = () => {
    if (flushTimer) return;
    flushTimer = window.setTimeout(() => {
      flushTimer = null;
      flush(false);
    }, 5000);
  };

  const track = (type) => {
    if (!counts[type]) counts[type] = 0;
    counts[type] += 1;
    if (now() - lastFlushAt > 15000) {
      flush(false);
      return;
    }
    scheduleFlush();
  };

  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush(true);
  });
  window.addEventListener("beforeunload", () => flush(true));

  return { track };
})();
let threadsByBrand = new Map();
let threadsByCode = new Map();
let threadsByCanonicalKey = new Map();
let brandNamesSorted = [];
let brandKeyToName = new Map();
const matchCache = new Map();
const MATCH_CACHE_LIMIT = 60;
const MATCH_DEBOUNCE_MS = 160;
let matchDebounceTimer = null;
const RESULT_PAGE_SIZE = 60;
let resultRenderLimit = RESULT_PAGE_SIZE;
let lastGroupedResults = null;
let searchWorker = null;
let searchWorkerReady = false;
let searchWorkerSeq = 0;
const searchWorkerRequests = new Map();
const PIN_STORAGE_KEY = "tc_pins_v1";
let pinnedItems = [];
const PROJECT_STORAGE_KEY = "tc_project_current";
const PROJECT_RECENT_KEY = "tc_projects_recent";
let currentProject = "";
let recentProjects = [];
let libraryItemsCache = [];
let libraryProjectFilter = "";

function renderBrandFilters(brands) {
  if (!brandFilters) return;
  brandFilters.innerHTML = "";
  brands.forEach(rawBrand => {
    const brandName = (rawBrand || "").trim();
    if (!brandName) return;
    const label = document.createElement("label");
    label.className = "cursor-pointer";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "brand-filter peer sr-only";
    input.value = brandName;
    input.checked = true;

    const pill = document.createElement("span");
    pill.className = "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white/70 text-gray-700 shadow-sm transition duration-200 hover:shadow-md hover:-translate-y-px peer-checked:bg-indigo-50 peer-checked:border-indigo-500 peer-checked:text-indigo-700 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-400 peer-focus-visible:ring-offset-2";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "w-4 h-4 text-indigo-600 opacity-0 transition-opacity duration-150 peer-checked:opacity-100");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute("d", "M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0l-3.25-3.25a1 1 0 011.42-1.42l2.54 2.54 6.54-6.54a1 1 0 011.42 0z");
    path.setAttribute("clip-rule", "evenodd");
    svg.appendChild(path);

    const text = document.createElement("span");
    text.textContent = brandName;

    pill.appendChild(svg);
    pill.appendChild(text);
    label.appendChild(input);
    label.appendChild(pill);
    brandFilters.appendChild(label);
  });
}

function getUniqueBrands(list) {
  const brands = [];
  list.forEach(t => {
    const name = (t.brand || "").trim();
    if (!name || brands.includes(name)) return;
    brands.push(name);
  });
  return brands;
}

function formatFirestoreError(err, fallback = "Có lỗi Firestore") {
  const msg = (err && (err.message || err.code)) || "";
  const lower = msg.toLowerCase();
  if (lower.includes("permission-denied")) {
    return "Bạn chưa cấp quyền / rules đang chặn. Kiểm tra Firestore rules và đăng nhập.";
  }
  if (lower.includes("has not been used") || lower.includes("api not enabled")) {
    return "Firestore chưa bật API. Bật Cloud Firestore và thử lại.";
  }
  return msg || fallback;
}

function populateContributeBrands(brands = getUniqueBrands(threads)) {
  if (!contributeBrandSelect) return;
  contributeBrandSelect.innerHTML = '<option value="">Chọn hãng chỉ</option>';
  brands.forEach(b => {
    const opt = document.createElement("option");
    opt.value = b;
    opt.textContent = b;
    contributeBrandSelect.appendChild(opt);
  });
}

function openContributeModal() {
  populateContributeBrands();
  contributeOverlay?.classList.remove("hidden");
  if (contributeModal) {
    contributeModal.classList.remove("hidden");
    contributeModal.classList.add("flex");
  }
}

function closeContributeModal() {
  contributeOverlay?.classList.add("hidden");
  if (contributeModal) {
    contributeModal.classList.add("hidden");
    contributeModal.classList.remove("flex");
  }
  if (contributeBrandSelect) contributeBrandSelect.value = "";
  if (contributeBrandCustom) contributeBrandCustom.value = "";
  if (contributeCode) contributeCode.value = "";
  if (contributeName) contributeName.value = "";
  if (contributeHex) contributeHex.value = "";
}

async function loadPendingSubmissionsUI() {
  if (!verifyList) return;
  verifyList.innerHTML = "<div class='text-gray-500'>Đang tải...</div>";

  if (!ensureAuthReady() || !authApi?.db || !currentUser) {
    verifyList.innerHTML = "<div class='text-gray-500'>Cần đăng nhập.</div>";
    return;
  }
  try {
    await refreshAdmin(true);
    if (!isAdminUser) {
      verifyList.innerHTML = "<div class='text-red-600'>Bạn không có quyền xác minh (cần admin).</div>";
      return;
    }
    const subs = await listPendingSubmissions(authApi.db, 50);
    const withVotes = await Promise.all(
      subs.map(async (s) => {
        try {
          const summary = await getVoteSummary(authApi.db, s.id);
          return { ...s, summary };
        } catch (err) {
          if (isPermissionDenied(err)) {
            return { ...s, summary: { confirmCount: 0, rejectCount: 0 } };
          }
          throw err;
        }
      })
    );
    pendingSubmissions = withVotes;
    renderVerifyList();
  } catch (err) {
    if (isPermissionDenied(err)) {
      console.info("[verify] permission denied", { code: err?.code, msg: err?.message });
      verifyList.innerHTML = "<div class='text-red-600'>Bạn không có quyền xác minh (cần admin).</div>";
      return;
    }
    const friendly = typeof formatFirestoreError === "function" ? formatFirestoreError(err, "Lỗi tải submissions") : (err?.message || "Lỗi tải submissions");
    console.error(err);
    verifyList.innerHTML = `<div class='text-red-600'>${friendly}</div>`;
  }
}

function renderVerifyList() {
  if (!verifyList) return;
  if (!pendingSubmissions.length) {
    verifyList.innerHTML = "<div class='text-gray-500'>Không có submissions chờ.</div>";
    return;
  }
  verifyList.innerHTML = pendingSubmissions.map(item => {
    const summary = item.summary || { confirmCount: 0, rejectCount: 0 };
    const canApprove = isAdminUser;
    const createdAt = item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : "";
    return `
      <div class="border border-gray-200 rounded-xl p-3 shadow-sm">
        <div class="flex items-start gap-3 justify-between">
          <div class="space-y-1">
            <div class="font-semibold">${item.brand || ""} ${item.code || ""}</div>
            <div class="text-gray-600 text-sm">${item.name || ""}</div>
            <div class="flex items-center gap-2 text-sm">
              <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg border bg-gray-50">
                <span class="w-4 h-4 rounded border" style="background:${item.hex || "#fff"}"></span>
                <span>${item.hex || ""}</span>
              </span>
              <span class="text-gray-500">by ${item.createdByName || item.createdByUid || "?"}</span>
              ${createdAt ? `<span class="text-gray-400 text-xs">${createdAt}</span>` : ""}
            </div>
            <div class="text-xs text-gray-600">Xác nhận: ${summary.confirmCount} | Từ chối: ${summary.rejectCount}</div>
          </div>
          <div class="flex flex-col gap-2">
            <button data-action="vote-confirm" data-id="${item.id}" class="px-3 py-1 rounded-lg border text-emerald-700 border-emerald-200 hover:bg-emerald-50">Xác nhận</button>
            <button data-action="vote-reject" data-id="${item.id}" class="px-3 py-1 rounded-lg border text-rose-700 border-rose-200 hover:bg-rose-50">Từ chối</button>
            ${canApprove ? `<button data-action="approve" data-id="${item.id}" class="px-3 py-1 rounded-lg bg-amber-600 text-white hover:bg-amber-700">Duyệt</button>` : ""}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function openVerifyModal() {
  verifyOverlay?.classList.remove("hidden");
  if (verifyModal) {
    verifyModal.classList.remove("hidden");
    verifyModal.classList.add("flex");
  }
  loadPendingSubmissionsUI();
}

function closeVerifyModal() {
  verifyOverlay?.classList.add("hidden");
  if (verifyModal) {
    verifyModal.classList.add("hidden");
    verifyModal.classList.remove("flex");
  }
}

async function fetchVerifiedThreads() {
  if (!authApi?.db || typeof authApi.getDocs !== "function") return [];
  try {
    const ref = authApi.collection(authApi.db, "verifiedThreads");
    logDebug("[fetchVerifiedThreads] path", ref.path || "verifiedThreads");
    const snap = await authApi.getDocs(ref);
    const raws = [];
    snap.forEach(d => {
      const data = d.data();
      if (!data) return;
      raws.push({
        ...data,
        source: { ...(data.source || {}), type: "CROWD_VERIFIED", provider: "firestore" },
        confidence: typeof data.confidence === "number" ? data.confidence : 0.85
      });
    });
    return normalizeAndDedupeThreads(raws, { source: { type: "CROWD_VERIFIED" }, confidence: 0.85 });
  } catch (err) {
    if (isPermissionDenied(err)) {
      console.info("[fetchVerifiedThreads] permission denied, skip verified threads");
      return [];
    }
    console.error(err);
    return [];
  }
}

function mergeVerifiedThreads(list) {
  if (!Array.isArray(list) || !list.length) return;
  const map = new Map();
  threads.forEach(t => {
    const key = t.canonicalKey || `${(t.brand || "").toLowerCase()}::${t.code}`;
    if (key) map.set(key, t);
  });
  list.forEach(v => {
    const key = v.canonicalKey || `${(v.brand || "").toLowerCase()}::${v.code}`;
    if (!key) return;
    const existing = map.get(key);
    if (existing) {
      const currentConf = typeof existing.confidence === "number" ? existing.confidence : 0;
      const verifiedConf = typeof v.confidence === "number" ? v.confidence : 0;
        if (verifiedConf > currentConf) {
        const altEntry = existing.hex ? {
          hex: existing.hex,
          rgb: existing.rgb,
          source: existing.source,
          confidence: existing.confidence
        } : null;
        const mergedAlt = [];
        if (v.alternates) mergedAlt.push(...v.alternates);
        if (altEntry) mergedAlt.push(altEntry);
          const updated = { ...existing, ...v, alternates: mergedAlt };
          updated.lab = getLabForHex(updated.hex);
          map.set(key, updated);
        } else {
        const altEntry = {
          hex: v.hex,
          rgb: v.rgb,
          source: v.source,
          confidence: v.confidence
        };
        const mergedAlt = existing.alternates ? [...existing.alternates] : [];
        mergedAlt.push(altEntry);
        existing.alternates = mergedAlt;
        map.set(key, existing);
      }
    } else {
      map.set(key, { ...v, lab: getLabForHex(v.hex) });
    }
  });
  threads = Array.from(map.values());
  matchCache.clear();
  rebuildIndexes(threads);
  const brands = getUniqueBrands(threads);
  renderBrandFilters(brands);
  populateContributeBrands(brands);
  if (lastChosenHex) {
    runSearch(lastChosenHex);
  }
}

const resultBox = document.getElementById("result");
const deltaSlider = document.getElementById("deltaSlider");
const deltaValueEls = document.querySelectorAll("#deltaValue, #deltaValueText");
const deltaMethodSelect = document.getElementById("deltaMethod");
const pinPanel = document.getElementById("pinPanel");
const pinList = document.getElementById("pinList");
const pinClear = document.getElementById("pinClear");
const brandFilters = document.getElementById("brandFilters");
const verifiedOnlyToggle = document.getElementById("verifiedOnlyToggle");
const btnFindNearest = document.getElementById("btnFindNearest");
const colorPicker = document.getElementById("colorPicker");
const codeInput = document.getElementById("codeInput");
const btnFindByCode = document.getElementById("btnFindByCode");
const imgInput = document.getElementById("imgInput");
const canvas = document.getElementById("canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

// Inspector elements
const drawer = document.getElementById("colorInspector");
const drawerOverlay = document.getElementById("inspectorOverlay");
const drawerCloseBtn = document.getElementById("inspectorClose");
const drawerTitle = document.getElementById("inspectorTitle");
const inspectorBrand = document.getElementById("inspectorBrand");
const inspectorCode = document.getElementById("inspectorCode");
const inspectorName = document.getElementById("inspectorName");
const inspectorDelta = document.getElementById("inspectorDelta");
const inspectorHex = document.getElementById("inspectorHex");
const inspectorRgb = document.getElementById("inspectorRgb");
const inspectorRgbString = document.getElementById("inspectorRgbString");
const inspectorLab = document.getElementById("inspectorLab");
const inspectorHsl = document.getElementById("inspectorHsl");
const previewMain = document.getElementById("previewMain");
const previewLight = document.getElementById("previewLight");
const previewDark = document.getElementById("previewDark");
const copyButtons = document.querySelectorAll("[data-copy]");
const copyAllBtn = document.getElementById("copyAll");
const toastContainer = document.getElementById("toastContainer");
const btnPickScreen = document.getElementById("btnPickScreen");
const eyedropperHint = document.getElementById("eyedropperHint");
const eyedropperFallback = document.getElementById("eyedropperFallback");
const fallbackColorPicker = document.getElementById("fallbackColorPicker");
const portalCtaWrap = document.getElementById("portalCtaWrap");
const portalCta = document.getElementById("portalCta");
function getAuthApi() {
  return window.firebaseAuth || null;
}

async function fetchAdminApi(path, options = {}) {
  const api = window.firebaseAuth || window.firebaseAuthApi || null;
  const user = api?.auth?.currentUser || api?.user || null;
  if (!user || typeof user.getIdToken !== "function") {
    throw new Error("Cần đăng nhập để gọi API quản trị.");
  }
  const token = await user.getIdToken();
  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${token}`);
  return fetch(path, { ...options, headers });
}

window.tcAdminApi = { fetch: fetchAdminApi };
const authApi = new Proxy({}, {
  get: (_target, prop) => {
    const api = getAuthApi();
    return api ? api[prop] : undefined;
  }
});
function getAuthInitError() {
  return getAuthApi()?.initError || null;
}
function isPermissionDenied(err) {
  const msg = String(err?.message || "");
  return err?.code === "permission-denied" || msg.includes("Missing or insufficient permissions");
}
let hasBoundAuth = false;
function bindAuth() {
  const err = getAuthInitError();
  if (err) {
    console.error("Auth init error", err);
    return;
  }
  const api = getAuthApi();
  if (!api || typeof api.onAuthStateChanged !== "function") return;
  if (hasBoundAuth) return;
  api.onAuthStateChanged(updateUserUI);
  hasBoundAuth = true;
}
const libraryOverlay = document.getElementById("libraryOverlay");
const libraryModal = document.getElementById("libraryModal");
const libraryClose = document.getElementById("libraryClose");
let btnExportCsv = document.getElementById("btnExportCsv");
const libraryList = document.getElementById("libraryList");
const contributeOverlay = document.getElementById("contributeOverlay");
const contributeModal = document.getElementById("contributeModal");
const contributeClose = document.getElementById("contributeClose");
const contributeCancel = document.getElementById("contributeCancel");
const contributeBrandSelect = document.getElementById("contributeBrandSelect");
const contributeBrandCustom = document.getElementById("contributeBrandCustom");
const contributeCode = document.getElementById("contributeCode");
const contributeName = document.getElementById("contributeName");
const contributeHex = document.getElementById("contributeHex");
const contributeSubmit = document.getElementById("contributeSubmit");
const btnUseCurrentColor = document.getElementById("btnUseCurrentColor");
const verifyOverlay = document.getElementById("verifyOverlay");
const verifyModal = document.getElementById("verifyModal");
const verifyClose = document.getElementById("verifyClose");
const verifyList = document.getElementById("verifyList");
const hasToolUI = !!resultBox;

function loadThreads() {
  if (!hasToolUI) return;
  renderResultState("loading");
  const threadsUrl = new URL("./threads.json", import.meta.url);
  fetch(threadsUrl)
  .then(res => res.json())
  .then(data => {
    const normalized = normalizeAndDedupeThreads(data, {
      source: { type: "runtime_json" }
    });
    matchCache.clear();
    labCache.clear();
    threads = normalized.map(t => ({ ...t }));
    rebuildIndexes(threads);
    initSearchWorker(threads);
    const brands = getUniqueBrands(threads);
    renderBrandFilters(brands);
    populateContributeBrands(brands);
    fetchVerifiedThreads().then(list => {
      verifiedThreads = list;
      mergeVerifiedThreads(list);
    });
    isDataReady = true;

    renderResultState("ready");

    restoreInspectorFromUrl();
  })
  .catch(() => {
    renderResultState("error");
  });
}

if (hasToolUI) {
  loadThreads();
}


//======================= DATA LOADING =======================

//======================= CORE LOGIC =======================
function getSelectedBrands() {
  return [...document.querySelectorAll(".brand-filter:checked")].map(cb => cb.value);
}

function addTopK(list, item, limit) {
  if (list.length < limit) {
    list.push(item);
    return;
  }
  let worstIndex = 0;
  let worst = list[0].delta;
  for (let i = 1; i < list.length; i += 1) {
    if (list[i].delta > worst) {
      worst = list[i].delta;
      worstIndex = i;
    }
  }
  if (item.delta < worst) list[worstIndex] = item;
}

function findNearestColors(chosenHex, limit = 100, method = "76") {
  const normalized = normalizeHex(chosenHex);
  if (!normalized) return [];
  const chosenLab = getLabForHex(normalized);
  if (!chosenLab) return [];
  const brands = getSelectedBrands();
  if (!brands.length) return [];
  const requireVerified = useVerifiedOnly;
  const lists = brands.map(brand => threadsByBrand.get(brand) || []);
  if (!lists.length) return [];

  if (method === "2000") {
    const candidateCount = Math.max(limit * 20, 200);
    const candidates = [];
    for (const list of lists) {
      for (const thread of list) {
        if (requireVerified && !isVerifiedThread(thread)) continue;
        const lab = ensureLab(thread);
        if (!lab) continue;
        const deltaFast = deltaE76(chosenLab, lab);
        addTopK(candidates, { thread, lab, delta: deltaFast }, candidateCount);
      }
    }
    const results = [];
    for (const candidate of candidates) {
      const delta = deltaE2000(chosenLab, candidate.lab);
      addTopK(results, { ...candidate.thread, lab: candidate.lab, delta }, limit);
    }
    return results.sort((a, b) => a.delta - b.delta);
  }

  const results = [];
  for (const list of lists) {
    for (const thread of list) {
      if (requireVerified && !isVerifiedThread(thread)) continue;
      const lab = ensureLab(thread);
      if (!lab) continue;
      const delta = deltaE76(chosenLab, lab);
      addTopK(results, { ...thread, lab, delta }, limit);
    }
  }
  return results.sort((a, b) => a.delta - b.delta);
}

function parseCodeQuery(raw) {
  const trimmed = String(raw || "").trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();

  for (const entry of brandNamesSorted) {
    if (!entry?.name) continue;
    const nameLower = entry.name.toLowerCase();
    if (lower.startsWith(nameLower + " ")) {
      const codePart = trimmed.slice(entry.name.length).trim();
      const codeKey = normalizeCodeKey(codePart);
      if (codeKey) {
        return { mode: "brand", brand: entry.name, brandKey: entry.key, codeKey };
      }
    }
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    const possibleBrand = parts.slice(0, -1).join(" ");
    const brandKey = normalizeBrandKey(possibleBrand);
    const mappedBrand = brandKeyToName.get(brandKey);
    const codeKey = normalizeCodeKey(parts[parts.length - 1]);
    if (mappedBrand && codeKey) {
      return { mode: "brand", brand: mappedBrand, brandKey, codeKey };
    }
  }

  const codeKey = normalizeCodeKey(trimmed);
  if (codeKey) return { mode: "code", codeKey };
  return null;
}

function renderCodeLookupResults(codeLabel, items) {
  if (!resultBox) return;
  const count = items.length;
  const title = count
    ? t("tc.code.found", "Tìm thấy {count} kết quả cho mã {code}.", { count, code: codeLabel })
    : t("tc.code.notFound", "Không tìm thấy kết quả cho mã {code}.", { code: codeLabel });
  const header = `<div class="mb-4 text-sm tc-muted">${title}</div>`;
  if (!count) {
    resultBox.innerHTML = header;
    return;
  }
  const cards = items.map(item => renderColorCard(item, item.hex)).join("");
  resultBox.innerHTML = `${header}<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">${cards}</div>`;
}

function initSearchWorker(payloadThreads) {
  if (searchWorkerReady || typeof Worker === "undefined") return;
  try {
    searchWorker = new Worker(new URL("./workers/thread_search.worker.js", import.meta.url), { type: "module" });
  } catch (err) {
    searchWorker = null;
    return;
  }
  searchWorker.onmessage = (event) => {
    const data = event.data || {};
    if (data.type === "ready") {
      searchWorkerReady = true;
      return;
    }
    const entry = searchWorkerRequests.get(data.id);
    if (!entry) return;
    searchWorkerRequests.delete(data.id);
    if (data.error) {
      entry.reject(new Error(data.error));
      return;
    }
    entry.resolve(data.results || []);
  };
  searchWorker.postMessage({ type: "init", threads: payloadThreads || [] });
}

function searchNearestAsync(chosenHex, limit, method) {
  if (!searchWorker || !searchWorkerReady) {
    return Promise.resolve(findNearestColors(chosenHex, limit, method));
  }
  const normalized = normalizeHex(chosenHex);
  if (!normalized) return Promise.resolve([]);
  const brands = getSelectedBrands();
  const payload = {
    targetHex: normalized,
    brands,
    verifiedOnly: useVerifiedOnly,
    method,
    limit
  };
  return new Promise((resolve, reject) => {
    const id = ++searchWorkerSeq;
    searchWorkerRequests.set(id, { resolve, reject });
    searchWorker.postMessage({ type: "search", id, payload });
  }).catch(() => findNearestColors(chosenHex, limit, method));
}

function groupByColorSimilarity(colors, threshold = 2.5, method = "76") {
  const groups = [];
  colors.forEach(c => {
    const g = groups.find(gr => getDelta(c.lab, gr.leader.lab, method) <= threshold);
    g ? g.items.push(c) : groups.push({ leader: c, items: [c] });
  });
  return groups;
}

function buildMatchCacheKey(hex, threshold, method) {
  const normalized = normalizeHex(hex);
  const brands = getSelectedBrands().slice().sort();
  return [
    normalized || "",
    useVerifiedOnly ? "1" : "0",
    method,
    threshold.toFixed(2),
    brands.join("|")
  ].join("::");
}

function setMatchCache(key, value) {
  if (matchCache.has(key)) {
    matchCache.delete(key);
  }
  matchCache.set(key, value);
  if (matchCache.size > MATCH_CACHE_LIMIT) {
    const oldest = matchCache.keys().next().value;
    if (oldest) matchCache.delete(oldest);
  }
}

async function runSearch(hex) {
  const normalized = normalizeHex(hex);
  if (!normalized) return;
  lastChosenHex = normalized;
  const method = currentDeltaMethod;
  const key = buildMatchCacheKey(normalized, currentDeltaThreshold, method);
  const cached = matchCache.get(key);
  if (cached) {
    lastResults = cached.base;
    showGroupedResults(cached.grouped, normalized);
    return;
  }
  renderResultState("loading");
  const base = await searchNearestAsync(normalized, 100, method);
  const filtered = base.filter(t => t.delta <= currentDeltaThreshold);
  if (!filtered.length) {
    lastResults = base;
    lastGroupedResults = null;
    currentRendered = [];
    resultRenderLimit = RESULT_PAGE_SIZE;
    renderResultState("no-results");
    return;
  }
  const grouped = groupByColorSimilarity(filtered, currentDeltaThreshold, method);
  lastResults = base;
  setMatchCache(key, { base, grouped });
  showGroupedResults(grouped, normalized);
}

function scheduleSearch(hex) {
  if (matchDebounceTimer) window.clearTimeout(matchDebounceTimer);
  matchDebounceTimer = window.setTimeout(() => {
    runSearch(hex);
  }, MATCH_DEBOUNCE_MS);
}

function renderResultState(type) {
  if (!resultBox) return;
  if (type === "loading") {
    resultBox.innerHTML = `<p class='text-gray-500 text-center'>${t("tc.status.loading", "Đang chuẩn bị dữ liệu...")}</p>`;
    return;
  }
  if (type === "ready") {
    const readyText = t("tc.status.ready", "Xong. Dữ liệu đã sẵn sàng.");
    const emptyText = t("tc.status.empty", "Chưa chọn màu — hãy chọn màu trực tiếp hoặc từ ảnh.");
    resultBox.innerHTML = `<div class='text-center space-y-1'>
      <p class='text-gray-500'>${readyText}</p>
      <p class='text-gray-500'>${emptyText}</p>
    </div>`;
    return;
  }
  if (type === "no-results") {
    const noResults = t("tc.status.noResults", "Không tìm thấy kết quả trong ngưỡng ΔE hiện tại. Thử tăng ΔE hoặc chọn thêm hãng.");
    resultBox.innerHTML = `<p class='text-gray-500 text-center'>${noResults}</p>`;
    return;
  }
  if (type === "error") {
    const errText = t("tc.status.error", "Lỗi tải dữ liệu. Vui lòng thử lại.");
    const retryText = t("tc.status.retry", "Thử lại");
    resultBox.innerHTML = `<div class='text-center space-y-3'>
      <p class='text-red-600'>${errText}</p>
      <button class="tc-btn tc-chip px-4 py-2" data-action="retry-load">${retryText}</button>
    </div>`;
  }
}

function loadPins() {
  try {
    const raw = localStorage.getItem(PIN_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    pinnedItems = Array.isArray(parsed) ? parsed.slice(0, 3) : [];
  } catch (err) {
    pinnedItems = [];
  }
  renderPinPanel();
  syncPinButtons();
}

function savePins() {
  try {
    localStorage.setItem(PIN_STORAGE_KEY, JSON.stringify(pinnedItems));
  } catch (err) {}
}

function isPinned(hex) {
  const normalized = normalizeHex(hex);
  return pinnedItems.some(item => item.hex === normalized);
}

function renderPinPanel() {
  if (!pinPanel || !pinList) return;
  if (!pinnedItems.length) {
    pinPanel.classList.add("hidden");
    pinList.innerHTML = "";
    return;
  }
  pinPanel.classList.remove("hidden");
  pinList.innerHTML = pinnedItems.map(item => {
    const deltaText = typeof item.delta === "number" ? item.delta.toFixed(2) : item.delta || "";
    return `
      <div class="pin-item flex items-center gap-3" data-hex="${item.hex}">
        <div class="pin-swatch" style="background:${item.hex}"></div>
        <div class="flex-1 min-w-0">
          <div class="font-semibold truncate">${item.brand || ""} ${item.code || ""}</div>
          <div class="tc-muted text-xs">ΔE ${deltaText}</div>
        </div>
        <div class="pin-actions flex items-center gap-2">
          <button data-action="pin-copy" data-hex="${item.hex}">${t("tc.pin.copyCode", "Sao chép mã")}</button>
          <button data-action="pin-remove" data-hex="${item.hex}">${t("tc.pin.remove", "Bỏ ghim")}</button>
        </div>
      </div>
    `;
  }).join("");
}

function addPin(item) {
  if (pinnedItems.length >= 3) {
    showToast(t("tc.pin.limit", "Chỉ ghim tối đa {count} kết quả.", { count: 3 }));
    return false;
  }
  pinnedItems.push(item);
  savePins();
  telemetry.track("pin");
  renderPinPanel();
  syncPinButtons();
  return true;
}

function removePin(hex) {
  const normalized = normalizeHex(hex);
  pinnedItems = pinnedItems.filter(item => item.hex !== normalized);
  savePins();
  renderPinPanel();
  syncPinButtons();
}

function updatePinButton(btn, pinned) {
  if (!btn) return;
  btn.dataset.pinned = pinned ? "1" : "0";
  btn.textContent = pinned ? t("tc.pin.unpin", "Bỏ ghim") : t("tc.pin.pin", "Ghim");
}

function syncPinButtons() {
  document.querySelectorAll('[data-action="pin-toggle"]').forEach((btn) => {
    const hex = btn.dataset.hex;
    updatePinButton(btn, isPinned(hex));
  });
}

function loadProjectPrefs() {
  try {
    currentProject = localStorage.getItem(PROJECT_STORAGE_KEY) || "";
  } catch (err) {
    currentProject = "";
  }
  try {
    const raw = localStorage.getItem(PROJECT_RECENT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    recentProjects = Array.isArray(parsed) ? parsed.slice(0, 10) : [];
  } catch (err) {
    recentProjects = [];
  }
}

function saveProjectPrefs(name) {
  const trimmed = (name || "").trim();
  currentProject = trimmed;
  if (trimmed) {
    recentProjects = [trimmed, ...recentProjects.filter(p => p !== trimmed)].slice(0, 10);
  }
  try {
    localStorage.setItem(PROJECT_STORAGE_KEY, currentProject);
    localStorage.setItem(PROJECT_RECENT_KEY, JSON.stringify(recentProjects));
  } catch (err) {}
}

function bindProjectInput() {
  const input = document.getElementById("projectInput");
  const list = document.getElementById("projectList");
  if (!input || !list) return;
  input.placeholder = t("tc.project.placeholder", "Nhập tên dự án");
  input.setAttribute("aria-label", t("tc.project.label", "Dự án"));
  input.value = currentProject || "";
  list.innerHTML = recentProjects.map(item => `<option value="${item}"></option>`).join("");
  if (input.dataset.bound === "1") return;
  input.dataset.bound = "1";
  input.addEventListener("input", () => {
    saveProjectPrefs(input.value);
  });
}

//======================= RENDERING =======================


// Không dùng tên biến/param `t` cho item vì `t()` là hàm i18n.
function renderColorCard(item, chosenHex) {
  const deltaText = typeof item.delta === "number" ? item.delta.toFixed(2) : "";
  const labAttr = item.lab ? item.lab.join(",") : "";
  const pinned = isPinned(item.hex);
  const saveLabel = t("tc.result.save", "Lưu");
  const pinLabel = pinned ? t("tc.pin.unpin", "Bỏ ghim") : t("tc.pin.pin", "Ghim");
  const copyCodeLabel = t("tc.result.copyCode", "Sao chép mã");
  const copyFullLabel = t("tc.result.copyFull", "Sao chép đầy đủ");
  return `
    <div class="result-item rounded-xl shadow-md bg-white p-3 hover:scale-[1.02] transition border border-transparent data-[selected=true]:border-indigo-400 data-[selected=true]:shadow-lg cursor-pointer"
         data-hex="${item.hex}" data-brand="${item.brand || ""}" data-code="${item.code || ""}" data-name="${item.name || ""}" data-delta="${deltaText}" data-lab="${labAttr}">
      <div class="flex gap-3 items-center">
        <div class="w-12 h-12 rounded-lg border" style="background:${item.hex}"></div>
        <div class="flex-1 text-sm">
          <div class="font-semibold">${item.brand || ""} ${item.code || ""}</div>
          <div class="text-gray-600">${item.name || ""}</div>

          <div class="text-xs text-gray-500">ΔE ${deltaText}</div>

        </div>
      </div>
      <div class="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <div class="w-4 h-4 rounded border" style="background:${chosenHex}"></div>
        <span>so với</span>
        <div class="w-4 h-4 rounded border" style="background:${item.hex}"></div>
      </div>
      <div class="mt-3 flex justify-end">
        <button class="btn-save px-3 py-1 text-xs rounded-lg border text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                data-action="save-search" data-save-hex="${item.hex}">
          ${saveLabel}
        </button>
        <button class="btn-pin ml-2 px-3 py-1 text-xs rounded-lg border"
                data-action="pin-toggle" data-hex="${item.hex}" data-pinned="${pinned ? "1" : "0"}">
          ${pinLabel}
        </button>
        <button class="btn-copy-code ml-2 px-3 py-1 text-xs rounded-lg border"
                data-action="copy-code">
          ${copyCodeLabel}
        </button>
        <button class="btn-copy-full ml-2 px-3 py-1 text-xs rounded-lg border"
                data-action="copy-full">
          ${copyFullLabel}
        </button>
      </div>
    </div>
  `;
}

function renderGroupedResults(groups, chosenHex, limit) {
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  const chosenLabel = t("tc.result.chosen", "Màu đã chọn");
  const projectLabel = t("tc.project.label", "Dự án");
  const projectPlaceholder = t("tc.project.placeholder", "Nhập tên dự án");
  const projectBlock = `
    <div class="flex flex-wrap items-center gap-3 mb-4">
      <label for="projectInput" class="text-sm tc-muted">${projectLabel}</label>
      <input id="projectInput" class="tc-field text-sm" list="projectList" data-i18n-attr="placeholder:tc.project.placeholder" placeholder="${projectPlaceholder}">
      <datalist id="projectList"></datalist>
    </div>
  `;
  let remaining = limit;
  const sections = groups.map((group, i) => {
    if (remaining <= 0) return "";
    const items = group.items.slice(0, remaining);
    remaining -= items.length;
    if (!items.length) return "";
    const groupLabel = t("tc.result.group", "Nhóm {index}", { index: i + 1 });
    const colorsLabel = t("tc.result.colors", "{count} màu", { count: group.items.length });
    return `
      <section class="mb-8">
        <h3 class="font-semibold mb-3 text-gray-700 flex items-center gap-2">
  <span>${groupLabel}</span>
  <span class="inline-block w-3 h-3 rounded-sm border" style="background:${chosenHex}"></span>
  <span>${colorsLabel}</span>
</h3>


        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          ${items.map(item => renderColorCard(item, chosenHex)).join("")}
        </div>
      </section>
    `;
  }).join("");
  const moreLabel = t("tc.result.loadMore", `Xem thêm (${total - limit})`, { count: total - limit });
  const moreButton = total > limit
    ? `<div class="mt-6 flex justify-center">
        <button class="tc-btn tc-chip px-4 py-2" data-action="load-more-results">${moreLabel}</button>
      </div>`
    : "";
  resultBox.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg border" style="background:${chosenHex}"></div>
        <div class="font-semibold">${chosenLabel}</div>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button class="tc-btn tc-chip px-3 py-2 text-sm" data-action="save-thread-library">Lưu vào Thư viện</button>
        <button class="tc-btn tc-chip px-3 py-2 text-sm" data-action="use-thread-library">Dùng từ Thư viện</button>
        <button class="tc-btn tc-chip px-3 py-2 text-sm" data-action="share-thread-library">Chia sẻ</button>
      </div>
    </div>
    ${projectBlock}
    ${sections}
    ${moreButton}
  `;
}

function showGroupedResults(groups, chosenHex) {
  currentRendered = groups.flatMap(g => g.items);
  if (currentRendered.length) {
    telemetry.track("search_result");
  }
  lastGroupedResults = groups;
  const total = currentRendered.length;
  resultRenderLimit = Math.min(RESULT_PAGE_SIZE, total);
  renderGroupedResults(groups, chosenHex, resultRenderLimit);
  bindProjectInput();
}

function loadMoreResults() {
  if (!lastGroupedResults || !lastChosenHex) return;
  const total = lastGroupedResults.reduce((sum, group) => sum + group.items.length, 0);
  resultRenderLimit = Math.min(resultRenderLimit + RESULT_PAGE_SIZE, total);
  renderGroupedResults(lastGroupedResults, lastChosenHex, resultRenderLimit);
}

//======================= INSPECTOR =======================
function setSelectedItem(el) {
  if (selectedItemEl === el) return;
  if (selectedItemEl) selectedItemEl.dataset.selected = "false";
  selectedItemEl = el;
  if (selectedItemEl) selectedItemEl.dataset.selected = "true";
}

function showToast(text) {
  if (!toastContainer) {
    if (text) console.info("[toast]", text);
    return;
  }
  const item = document.createElement("div");
  item.className = "bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg animate-fade-in-up";
  item.textContent = text;
  toastContainer.appendChild(item);
  setTimeout(() => {
    item.classList.add("opacity-0", "translate-y-1");
    setTimeout(() => item.remove(), 400);
  }, 1500);
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

function copyToClipboard(text, label) {
  if (!text) return;
  telemetry.track("copy");
  const message = label
    ? t("tc.toast.copiedWith", "Đã sao chép {label}.", { label })
    : t("tc.toast.copied", "Đã sao chép!");
  const fallbackCopy = () => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();

    try { document.execCommand("copy"); showToast(message); } catch (e) {}

    ta.remove();
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {

      showToast(message);

    }).catch(() => fallbackCopy());
  } else {
    fallbackCopy();
  }
}

function populateInspector(data) {
  const { hex, brand, code, name, delta, lab } = data;
  const normalizedHex = normalizeHex(hex);
  if (!normalizedHex) return;
  const { rgbArray, rgbString } = hexToRgbString(normalizedHex);
  const labValues = lab && lab.length === 3 ? lab : rgbToLab(rgbArray);
  const hsl = hexToHsl(rgbArray);

  previewMain.style.background = normalizedHex;
  previewLight.style.background = normalizedHex;
  previewDark.style.background = normalizedHex;

  inspectorHex.textContent = normalizedHex;
  inspectorRgb.textContent = rgbArray.join(", ");
  inspectorRgbString.textContent = rgbString;
  inspectorLab.textContent = formatLab(labValues).join(", ");
  inspectorHsl.textContent = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;


  inspectorBrand.textContent = brand || "—";
  inspectorCode.textContent = code || "—";
  inspectorName.textContent = name || "—";
  inspectorDelta.textContent = delta ? `ΔE ${delta}` : "—";
  drawerTitle.textContent = "Bảng thông tin màu";
  drawer.dataset.hex = normalizedHex;
}

function openInspector(data, triggerEl) {
  populateInspector(data);
  lastFocusedItem = triggerEl || null;
  drawer.classList.remove("translate-x-full", "md:translate-x-full", "translate-y-full");
  drawer.classList.add("open");
  drawerOverlay.classList.remove("pointer-events-none", "opacity-0");
  drawerOverlay.classList.add("opacity-50");
  (drawerCloseBtn || drawer).focus();
  updateUrlWithColor(data.hex);
}

function closeInspector() {
  drawer.classList.add("translate-x-full", "md:translate-x-full", "translate-y-full");
  drawer.classList.remove("open");
  drawerOverlay.classList.add("pointer-events-none", "opacity-0");
  drawerOverlay.classList.remove("opacity-50");
  if (selectedItemEl) selectedItemEl.dataset.selected = "false";
  selectedItemEl = null;
  clearUrlColor();
  if (lastFocusedItem) lastFocusedItem.focus();
}

function handleResultClick(e) {
  const card = e.target.closest(".result-item");
  if (!card) return;
  const hex = card.dataset.hex;
  if (!hex) return;
  const labData = card.dataset.lab ? card.dataset.lab.split(",").map(Number) : null;
  setSelectedItem(card);
  openInspector({
    hex,
    brand: card.dataset.brand,
    code: card.dataset.code,
    name: card.dataset.name,
    delta: card.dataset.delta,
    lab: labData
  }, card);
}

function handleResultContainerClick(e) {
  const retryBtn = e.target.closest('[data-action="retry-load"]');
  if (retryBtn) {
    e.preventDefault();
    if (typeof loadThreads === "function") loadThreads();
    return;
  }
  const saveLibraryBtn = e.target.closest('[data-action="save-thread-library"]');
  if (saveLibraryBtn) {
    e.preventDefault();
    const threads = Array.isArray(currentRendered)
      ? currentRendered.map((item) => ({
          brand: item.brand || "",
          code: item.code || "",
          name: item.name || "",
          hex: item.hex || "",
          delta: item.delta
        }))
      : [];
    if (!threads.length) {
      showToast("Chưa có dữ liệu để lưu.");
      return;
    }
    const now = new Date().toISOString();
    const asset = {
      id: `asset_${Date.now()}`,
      type: "thread_set",
      name: lastChosenHex ? `Mã chỉ cho ${lastChosenHex}` : "Bộ mã chỉ",
      tags: ["thêu"],
      payload: { threads },
      createdAt: now,
      updatedAt: now,
      sourceWorld: "threadcolor",
      project: currentProject || ""
    };
    const ok = addAssetToLibrary(asset);
    showToast(ok ? "Đã lưu vào Thư viện." : "Không thể lưu vào Thư viện.");
    return;
  }
  const useLibraryBtn = e.target.closest('[data-action="use-thread-library"]');
  if (useLibraryBtn) {
    e.preventDefault();
    const payload = composeHandoff({
      from: HANDOFF_FROM,
      intent: "use",
      projectId: currentProject || ""
    });
    window.location.href = `./library.html${payload}`;
    return;
  }
  const shareLibraryBtn = e.target.closest('[data-action="share-thread-library"]');
  if (shareLibraryBtn) {
    e.preventDefault();
    const threads = Array.isArray(currentRendered)
      ? currentRendered.map((item) => ({
          brand: item.brand || "",
          code: item.code || "",
          name: item.name || "",
          hex: item.hex || "",
          delta: item.delta
        }))
      : [];
    if (!threads.length) {
      showToast("Chưa có dữ liệu để chia sẻ.");
      return;
    }
    const now = new Date().toISOString();
    const asset = {
      id: `asset_${Date.now()}`,
      type: "thread_set",
      name: lastChosenHex ? `Mã chỉ cho ${lastChosenHex}` : "Bộ mã chỉ",
      tags: ["thêu"],
      payload: { threads },
      createdAt: now,
      updatedAt: now,
      sourceWorld: "threadcolor",
      project: currentProject || ""
    };
    publishToFeed(asset);
    return;
  }
  const loadMoreBtn = e.target.closest('[data-action="load-more-results"]');
  if (loadMoreBtn) {
    e.preventDefault();
    loadMoreResults();
    return;
  }
  const pinBtn = e.target.closest('[data-action="pin-toggle"]');
  if (pinBtn) {
    e.preventDefault();
    e.stopPropagation();
    const card = pinBtn.closest(".result-item");
    const hex = pinBtn.dataset.hex || card?.dataset?.hex;
    if (!hex) return;
    if (isPinned(hex)) {
      removePin(hex);
      updatePinButton(pinBtn, false);
      return;
    }
    const pinnedItem = {
      hex: normalizeHex(hex),
      brand: card?.dataset?.brand || "",
      code: card?.dataset?.code || "",
      delta: card?.dataset?.delta || ""
    };
    if (addPin(pinnedItem)) {
      updatePinButton(pinBtn, true);
    }
    return;
  }
  const copyCodeBtn = e.target.closest('[data-action="copy-code"]');
  if (copyCodeBtn) {
    e.preventDefault();
    e.stopPropagation();
    const card = copyCodeBtn.closest(".result-item");
    if (!card) return;
    const brand = (card.dataset.brand || "").trim();
    const code = (card.dataset.code || "").trim();
    const label = t("tc.result.copyCode", "Sao chép mã");
    const text = [brand, code].filter(Boolean).join(" ");
    if (text) copyToClipboard(text, label);
    return;
  }
  const copyFullBtn = e.target.closest('[data-action="copy-full"]');
  if (copyFullBtn) {
    e.preventDefault();
    e.stopPropagation();
    const card = copyFullBtn.closest(".result-item");
    if (!card) return;
    const brand = (card.dataset.brand || "").trim();
    const code = (card.dataset.code || "").trim();
    const name = (card.dataset.name || "").trim();
    const hex = (card.dataset.hex || "").trim();
    const label = t("tc.result.copyFull", "Sao chép đầy đủ");
    const text = [brand, code, name, hex].filter(Boolean).join(" | ");
    if (text) copyToClipboard(text, label);
    return;
  }
  const saveBtn = e.target.closest("[data-action=\"save-search\"]");
  if (saveBtn) {
    e.preventDefault();
    e.stopPropagation();
    handleSaveCurrentEnhanced(saveBtn);
    return;
  }
  handleResultClick(e);
}

async function handleSaveCurrentEnhanced(saveBtn) {
  const initErr = getAuthInitError();
  if (initErr) {
    const msg = `${initErr?.name || "Firebase"}: ${initErr?.message || "Loi khoi tao"}`;
    console.error(initErr);
    showToast(msg);
    return false;
  }
  if (!ensureAuthReady()) return;
  const api = getAuthApi();
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth(t("tc.auth.needLoginSave", "Cần đăng nhập để lưu."));
    return;
  }
  const card = saveBtn?.closest(".result-item");
  const cardHex = normalizeHex(card?.dataset?.hex || lastChosenHex);
  const cardBrand = card?.dataset?.brand || "";
  const cardCode = card?.dataset?.code || "";
  const cardName = card?.dataset?.name || "";
  if (!currentRendered.length || !cardHex) {
    showToast(t("tc.result.noDataSave", "Không có dữ liệu để lưu."));
    return;
  }
  console.info("[save] card data", { hex: cardHex, brand: cardBrand, code: cardCode, name: cardName });
  showToast(t("tc.result.saving", "Đang lưu..."));
  const resetSaveBtn = (text = t("tc.result.save", "Lưu")) => {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = text;
    }
  };
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.textContent = t("tc.result.saving", "Đang lưu...");
  }
  try {
    const payload = {
      inputHex: cardHex,
      project: currentProject || "",
      selectedBrands: getSelectedBrands(),
      deltaThreshold: currentDeltaThreshold,
      results: currentRendered.slice(0, 20).map(t => ({
        brand: t.brand,
        code: t.code,
        name: t.name,
        hex: t.hex,
        delta: t.delta
      }))
    };
    const docRef = await saveSearch(api.db, user.uid, payload);
    console.info("[save] saved doc id", docRef?.id);
    telemetry.track("save");
    if (saveBtn) {
      saveBtn.textContent = t("tc.result.saved", "Đã lưu");
      setTimeout(() => resetSaveBtn(t("tc.result.save", "Lưu")), 1500);
    }
    showToast(t("tc.result.saved", "Đã lưu"));
    if (libraryModal && !libraryModal.classList.contains("hidden")) {
        await loadLibraryListV2();
    }
  } catch (err) {
    console.error("[save] failed", err);
    const friendly = formatFirestoreError(err, "Luu that bai");
    showToast(friendly);
    resetSaveBtn("Lưu");
  }
}

function updateUrlWithColor(hex) {
  const url = new URL(window.location.href);
  url.hash = `color=${encodeURIComponent(hex)}`;
  history.replaceState(null, "", url.toString());
}

function clearUrlColor() {
  const url = new URL(window.location.href);
  if (url.hash.startsWith("#color=")) {
    url.hash = "";
    history.replaceState(null, "", url.toString());
  }
}

function getColorFromUrl() {
  const url = new URL(window.location.href);
  if (url.searchParams.get("color")) return url.searchParams.get("color");
  if (url.hash && url.hash.startsWith("#color=")) return decodeURIComponent(url.hash.replace("#color=", ""));
  if (url.hash) return decodeURIComponent(url.hash.slice(1));
  return null;
}

function restoreInspectorFromUrl() {
  const colorFromUrl = getColorFromUrl();
  const normalized = normalizeHex(colorFromUrl);
  if (!normalized) return;
  const card = document.querySelector(`.result-item[data-hex="${normalized}"]`);
  if (card) {
    handleResultClick({ target: card });
    return;
  }
  const thread = threads.find(t => t.hex.toLowerCase() === normalized.toLowerCase());
  const labData = thread ? ensureLab(thread) : getLabForHex(normalized);
  openInspector({
    hex: normalized,
    brand: thread?.brand || "",
    code: thread?.code || "",
    name: thread?.name || "",
    delta: "",
    lab: labData
  }, null);
}

//==================== AUTH GATE / AUTH STATE ====================
const openAuth = (message) => {
  const fallback = t("tc.auth.needLogin", "Cần đăng nhập để tiếp tục.");
  const resolved = typeof message === "string" && message.trim() ? message : fallback;
  const cleaned = /[\u00C3\u00C2\u00C4\u00C6\u00E1\u00BA]/.test(resolved) ? fallback : resolved;
  showToast(cleaned);
  window.tcAuth?.openAuth?.();
};

let lastAdminUid = null;
let lastAdminValue = null;
async function updateUserUI(user) {
  currentUser = user || null;
  if (user && authApi?.db) {
    if (hasToolUI) {
      if (lastAdminUid === user.uid && lastAdminValue === true) {
        isAdminUser = true;
      } else {
        await refreshAdmin(true);
      }
    }
    return;
  }
  isAdminUser = false;
  lastAdminUid = null;
  lastAdminValue = null;
}

async function refreshAdmin(force = false) {
  const user = authApi?.auth?.currentUser || currentUser;
  if (!authApi?.db || !user?.uid) {
    isAdminUser = false;
    lastAdminUid = user?.uid || null;
    lastAdminValue = null;
    return false;
  }
  if (!force && lastAdminUid === user.uid && lastAdminValue === true) {
    isAdminUser = true;
    return true;
  }
  try {
    if (typeof user.getIdToken === "function") {
      await user.getIdToken();
    }
    const val = await isAdmin(authApi.db, user.uid);
    isAdminUser = !!val;
    lastAdminUid = user.uid;
    lastAdminValue = isAdminUser;
    return isAdminUser;
  } catch (err) {
    if (isPermissionDenied(err)) {
      console.info("[isAdmin] permission denied -> treat as non-admin");
      isAdminUser = false;
      lastAdminUid = user.uid;
      lastAdminValue = false;
      return false;
    }
    console.error(err);
    isAdminUser = false;
    lastAdminUid = user.uid;
    lastAdminValue = false;
    return false;
  }
}

function ensureAuthReady() {
  const initErr = getAuthInitError();
  if (initErr) {
    console.error(initErr);
    showToast(`${initErr?.name || "Firebase"}: ${initErr?.message || "Lỗi khởi tạo"}`);
    return false;
  }
  const api = getAuthApi();
  if (!api || typeof api.onAuthStateChanged !== "function") {
    showToast("Firebase init error: missing firebaseConfig");
    return false;
  }
  return true;
}
async function loadLibraryList() {
  if (!libraryList) return;
  const api = getAuthApi();
  if (!ensureAuthReady()) return;
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth("Cần đăng nhập để xem thư viện.");
    return;
  }
  libraryList.innerHTML = "<div class='text-gray-500'>Đang tải...</div>";
  try {
    const { items } = await listSavedSearches(api.db, user.uid, 50);
    if (!items.length) {
      libraryList.innerHTML = "<div class='text-gray-500'>Chưa có bản lưu</div>";
      return;
    }
    libraryList.innerHTML = items.map(it => {
      const ts = it.createdAt && typeof it.createdAt.toDate === "function" ? it.createdAt.toDate().toLocaleString() : "";
      return `
        <div class="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
          <div>
            <div class="font-semibold text-gray-800">${it.inputHex || ""}</div>
            <div class="text-xs text-gray-500">${ts}</div>
          </div>
          <button data-action="open-saved" data-id="${it.id}" class="px-3 py-1 rounded-lg border bg-white hover:bg-gray-50 text-indigo-700">Mở</button>
        </div>
      `;
    }).join("");
  } catch (err) {
    console.error("Tải thư viện thất bại", err);
    const friendly = formatFirestoreError(err, "Không tải được Library");
    libraryList.innerHTML = `<div class='text-red-600'>${friendly}</div>`;
  }
}

function ensureLibraryControls() {
  const header = document.querySelector("#libraryModal .border-b");
  if (!header) return;
  const title = header.querySelector("h3");
  if (title) title.textContent = t("tc.library.title", "Thư viện của tôi");
  let actions = header.querySelector("[data-library-actions]");
  if (!actions) {
    actions = document.createElement("div");
    actions.className = "flex items-center gap-2";
    actions.dataset.libraryActions = "1";
    const closeBtn = document.getElementById("libraryClose");
    if (closeBtn) actions.appendChild(closeBtn);
    header.appendChild(actions);
  }
  if (!document.getElementById("btnExportCsv")) {
    const exportBtn = document.createElement("button");
    exportBtn.id = "btnExportCsv";
    exportBtn.className = "tc-btn tc-chip px-3 py-1 text-xs";
    actions.insertBefore(exportBtn, actions.firstChild);
  }
  btnExportCsv = document.getElementById("btnExportCsv");
  if (btnExportCsv) {
    btnExportCsv.textContent = t("tc.library.export", "Xuất CSV");
    if (btnExportCsv.dataset.bound !== "1") {
      btnExportCsv.dataset.bound = "1";
      btnExportCsv.addEventListener("click", exportLibraryCsv);
    }
  }
  const closeBtn = document.getElementById("libraryClose");
  if (closeBtn) {
    closeBtn.setAttribute("aria-label", t("tc.action.close", "Đóng"));
  }

  let projectFilter = document.getElementById("libraryProjectFilter");
  if (!projectFilter) {
    projectFilter = document.createElement("select");
    projectFilter.id = "libraryProjectFilter";
    projectFilter.className = "tc-field text-xs";
    projectFilter.setAttribute("aria-label", t("tc.project.filter", "Lọc theo dự án"));
    if (closeBtn) {
      actions.insertBefore(projectFilter, closeBtn);
    } else {
      actions.appendChild(projectFilter);
    }
  }
  syncLibraryProjectFilter(projectFilter);
  if (projectFilter.dataset.bound !== "1") {
    projectFilter.dataset.bound = "1";
    projectFilter.addEventListener("change", () => {
      libraryProjectFilter = projectFilter.value === "__all__" ? "" : projectFilter.value;
      renderLibraryList(libraryItemsCache);
    });
  }
}

function syncLibraryProjectFilter(selectEl) {
  if (!selectEl) return;
  const allLabel = t("tc.project.all", "Tất cả dự án");
  const options = [];
  const seen = new Set();
  options.push({ value: "__all__", label: allLabel });
  const preferred = [currentProject, ...recentProjects].filter(Boolean);
  preferred.forEach((item) => {
    if (seen.has(item)) return;
    seen.add(item);
    options.push({ value: item, label: item });
  });
  selectEl.innerHTML = options
    .map((opt) => `<option value="${opt.value}">${opt.label}</option>`)
    .join("");
  const fallback = currentProject || "__all__";
  if (!libraryProjectFilter && currentProject) {
    libraryProjectFilter = currentProject;
  }
  selectEl.value = libraryProjectFilter || fallback;
}

function getFilteredLibraryItems(items) {
  if (!libraryProjectFilter) return items;
  return items.filter((item) => (item.project || "") === libraryProjectFilter);
}

function renderLibraryList(items) {
  if (!libraryList) return;
  const filtered = getFilteredLibraryItems(items || []);
  if (!filtered.length) {
    libraryList.innerHTML = `<div class='text-gray-500'>${t("tc.library.empty", "Chưa có bản lưu")}</div>`;
    return;
  }
  libraryList.innerHTML = filtered.map(it => {
    const ts = it.createdAt && typeof it.createdAt.toDate === "function" ? it.createdAt.toDate().toLocaleString() : "";
    const projectLine = it.project ? `<div class="text-xs tc-muted">${t("tc.project.label", "Dự án")}: ${it.project}</div>` : "";
    return `
        <div class="border border-gray-200 rounded-lg p-3 flex items-center justify-between" data-saved-item="${it.id}">
          <div>
            <div class="font-semibold text-gray-800">${it.inputHex || ""}</div>
            ${projectLine}
            <div class="text-xs text-gray-500">${ts}</div>
          </div>
          <div class="flex items-center gap-2">
            <button data-action="open-saved" data-id="${it.id}" class="px-3 py-1 rounded-lg border bg-white hover:bg-gray-50 text-indigo-700">${t("tc.library.open", "Mở")}</button>
            <button data-action="delete-saved" data-id="${it.id}" class="px-3 py-1 rounded-lg border border-red-200 bg-white hover:bg-red-50 text-red-600">${t("tc.library.delete", "Xóa")}</button>
          </div>
        </div>
      `;
  }).join("");
}

async function loadLibraryListV2() {
  if (!libraryList) return;
  ensureLibraryControls();
  const api = getAuthApi();
  if (!ensureAuthReady()) return;
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth(t("tc.auth.needLoginLibrary", "Cần đăng nhập để xem thư viện."));
    return;
  }
  libraryList.innerHTML = `<div class='text-gray-500'>${t("tc.library.loading", "Đang tải...")}</div>`;
  try {
    const { items } = await listSavedSearches(api.db, user.uid, 50);
    libraryItemsCache = items || [];
    if (!items.length) {
      libraryList.innerHTML = `<div class='text-gray-500'>${t("tc.library.empty", "Chưa có bản lưu")}</div>`;
      return;
    }
    const fromItems = items.map(it => (it.project || "").trim()).filter(Boolean);
    if (fromItems.length) {
      recentProjects = [...new Set([...fromItems, ...recentProjects])].slice(0, 10);
      saveProjectPrefs(currentProject);
    }
    renderLibraryList(items);
  } catch (err) {
    console.error("Tải thư viện thất bại", err);
    const friendly = formatFirestoreError(err, t("tc.library.error", "Không tải được thư viện"));
    libraryItemsCache = [];
    libraryList.innerHTML = `<div class='text-red-600'>${friendly}</div>`;
  }
}

function exportLibraryCsv() {
  if (!libraryItemsCache.length) {
    showToast(t("tc.library.empty", "Chưa có bản lưu"));
    return;
  }
  const header = ["project", "brand", "code", "hex", "deltaE", "note", "createdAt"];
  const rows = libraryItemsCache.map(item => {
    const top = item.topMatch || (item.results || [])[0] || {};
    const createdAt = item.createdAt && typeof item.createdAt.toDate === "function"
      ? item.createdAt.toDate().toISOString()
      : "";
    return [
      item.project || "",
      top.brand || "",
      top.code || "",
      top.hex || "",
      typeof top.delta === "number" ? top.delta.toFixed(2) : (top.delta || ""),
      "",
      createdAt
    ];
  });
  const escapeCsv = (value) => {
    const str = String(value ?? "");
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, "\"\"")}"` : str;
  };
  const csv = [header.join(","), ...rows.map(row => row.map(escapeCsv).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "threadcolor-library.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast(t("tc.library.exported", "Đã xuất CSV"));
}

//======================= SAVE CURRENT =======================
async function handleSaveCurrent(saveBtn) {
  const initErr = getAuthInitError();
  if (initErr) {
    const msg = `${initErr?.name || "Firebase"}: ${initErr?.message || "Lỗi khởi tạo"}`;
    console.error(initErr);
    showToast(msg);
    return false;
  }
  if (!ensureAuthReady()) return;
  const api = getAuthApi();
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth(t("tc.auth.needLoginSave", "Cần đăng nhập để lưu."));
    return;
  }
const card = saveBtn?.closest(".result-item");
const cardHex = normalizeHex(card?.dataset?.hex || lastChosenHex);
const cardBrand = card?.dataset?.brand || "";
const cardCode = card?.dataset?.code || "";
const cardName = card?.dataset?.name || "";

if (!currentRendered.length || !cardHex) {
  showToast("Không có dữ liệu để lưu");
  return;
}

  console.info("[save] card data", { hex: cardHex, brand: cardBrand, code: cardCode, name: cardName });
  try {
    const payload = {
      inputHex: cardHex,
      project: currentProject || "",
      selectedBrands: getSelectedBrands(),
      deltaThreshold: currentDeltaThreshold,
      results: currentRendered.slice(0, 20).map(t => ({
        brand: t.brand,
        code: t.code,
        name: t.name,
        hex: t.hex,
        delta: t.delta
      }))
    };
    await saveSearch(api.db, user.uid, payload);
    telemetry.track("save");
    showToast(t("tc.result.saved", "Đã lưu"));
  } catch (err) {
    console.error("Lưu thất bại", err);
    const friendly = formatFirestoreError(err, "Luu that bai");
    showToast(friendly);
  }
}

//======================= OPEN SAVED =======================
async function handleOpenSaved(id) {
  const initErr = getAuthInitError();
  if (initErr) {
    console.error(initErr);
    showToast(`${initErr.name || "Firebase"}: ${initErr.message || "Loi"}`);
    return;
  }
  if (!ensureAuthReady()) return;
  const api = getAuthApi();
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth(t("tc.auth.needLoginOpen", "Cần đăng nhập để mở."));
    return;
  }
  try {
    const data = await getSavedSearch(api.db, user.uid, id);
    if (!data) {
      showToast("Khong tim thay ban luu");
      return;
    }
    const deltaVal = parseFloat(data.deltaThreshold) || currentDeltaThreshold;
    currentDeltaThreshold = deltaVal;
    if (deltaSlider) deltaSlider.value = deltaVal;

 deltaValueEls.forEach(el => el.textContent = `≈ ${currentDeltaThreshold.toFixed(1)}`);
    const brands = Array.isArray(data.selectedBrands) ? data.selectedBrands : [];
    document.querySelectorAll(".brand-filter").forEach(cb => {
      if (!brands.length) return;
      cb.checked = brands.includes(cb.value);
    });

    if (colorPicker && data.inputHex) {
      colorPicker.value = data.inputHex;
    }
    lastChosenHex = data.inputHex || lastChosenHex;

    const results = Array.isArray(data.results) ? data.results : [];
    if (!results.length) {
      resultBox.innerHTML = "<div class='text-sm text-gray-600'>Ban luu nay khong co ket qua.</div>";
      return;
    }
    const mapped = results.map(r => {
      const hex = normalizeHex(r.hex);
      if (!hex) return null;
      return {
        brand: r.brand,
        code: r.code,
        name: r.name,
        hex,
        delta: r.delta,
        lab: rgbToLab(hexToRgbArray(hex))
      };
    }).filter(Boolean);

    const grouped = groupByColorSimilarity(mapped, currentDeltaThreshold, currentDeltaMethod);
    showGroupedResults(grouped, data.inputHex || lastChosenHex || "#000000");
    const ts = data.createdAt && typeof data.createdAt.toDate === "function" ? data.createdAt.toDate() : null;
    const stamp = ts ? ts.toLocaleString() : "";
    const loadedFrom = t("tc.library.loadedFrom", "Đã tải từ Thư viện của tôi {stamp}", {
      stamp: stamp ? `- ${stamp}` : ""
    });
    resultBox.innerHTML = `<div class='mb-3 text-sm text-gray-600'>${loadedFrom}</div>` + resultBox.innerHTML;
    if (libraryOverlay) libraryOverlay.classList.add("hidden");
    if (libraryModal) {
      libraryModal.classList.add("hidden");
      libraryModal.classList.remove("flex");
    }
  }   catch (err) {
    console.error("Mở bản lưu thất bại", err);
    const friendly = formatFirestoreError(err, "Mo ban luu that bai");
    showToast(friendly);
  }
}

//======================= EYEDROPPER =======================
function startEyeDropper() {
  if (!btnPickScreen) return;
  if (!("EyeDropper" in window)) {
    if (eyedropperFallback) eyedropperFallback.classList.remove("hidden");
    if (fallbackColorPicker) fallbackColorPicker.classList.remove("hidden");
    if (fallbackColorPicker) fallbackColorPicker.focus();
    return;
  }
  if (eyedropperFallback) eyedropperFallback.classList.add("hidden");
  if (fallbackColorPicker) fallbackColorPicker.classList.add("hidden");
  if (eyedropperHint) eyedropperHint.classList.remove("hidden");
  const picker = new window.EyeDropper();
  picker.open().then(result => {
    if (eyedropperHint) eyedropperHint.classList.add("hidden");
    const hex = normalizeHex(result.sRGBHex);
    if (!hex) return;
    if (colorPicker) colorPicker.value = hex;
    copyToClipboard(hex, hex);
  }).catch(err => {
    if (eyedropperHint) eyedropperHint.classList.add("hidden");
    if (err && err.name === "AbortError") return;

    showToast("Không pick được ");
  });
}

//======================= EVENTS =======================
window.addEventListener("firebase-auth-ready", bindAuth);
bindAuth();


if (libraryClose) libraryClose.addEventListener("click", () => {
  libraryOverlay?.classList.add("hidden");
  if (libraryModal) {
    libraryModal.classList.add("hidden");
    libraryModal.classList.remove("flex");
  }
});

if (libraryOverlay) {
  libraryOverlay.addEventListener("click", () => {
    libraryOverlay.classList.add("hidden");
    if (libraryModal) {
      libraryModal.classList.add("hidden");
      libraryModal.classList.remove("flex");
    }
  });
}

const openLibraryModal = () => {
  if (!ensureAuthReady()) return;
  const api = getAuthApi();
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth(t("tc.auth.needLoginLibrary", "Cần đăng nhập để xem thư viện."));
    return;
  }
  libraryOverlay?.classList.remove("hidden");
  if (libraryModal) {
    libraryModal.classList.remove("hidden");
    libraryModal.classList.add("flex");
  }
  loadLibraryListV2();
};

const handleAuthAction = (action) => {
  if (action === "library") {
    openLibraryModal();
    return;
  }
  if (action === "contribute") {
    if (!currentUser) {
      openAuth(t("tc.auth.needLoginContribute", "Cần đăng nhập để đóng góp dữ liệu."));
      return;
    }
    if (!ensureAuthReady()) return;
    openContributeModal();
    return;
  }
  if (action === "verify") {
    if (!currentUser) {
      openAuth(t("tc.auth.needLoginVerify", "Cần đăng nhập để xác minh."));
      return;
    }
    if (!ensureAuthReady()) return;
    openVerifyModal();
  }
};

document.addEventListener("tc-auth-action", (event) => {
  const action = event?.detail?.action;
  if (!action) return;
  handleAuthAction(action);
});

(() => {
  let openAction = null;
  try {
    openAction = new URLSearchParams(window.location.search).get("open");
  } catch (err) {
    openAction = null;
  }
  const allowed = ["library", "contribute", "verify"];
  if (!openAction || !allowed.includes(openAction)) return;
  const auth = window.tcAuth || null;
  const isLoggedIn = typeof auth?.isLoggedIn === "function" ? auth.isLoggedIn() : false;
  if (openAction === "library") {
    if (String(window.location.pathname || "").includes("/worlds/threadcolor.html")) {
      window.location.href = "threadvault.html?tab=saved&open=library";
      return;
    }
    handleAuthAction(openAction);
    return;
  }
  if (!isLoggedIn) {
    handleAuthAction(openAction);
    return;
  }
  if (currentUser) {
    handleAuthAction(openAction);
    return;
  }
  const onAuth = (event) => {
    if (!event?.detail?.user) return;
    document.removeEventListener("tc-auth-changed", onAuth);
    handleAuthAction(openAction);
  };
  document.addEventListener("tc-auth-changed", onAuth);
})();


if (libraryList) {
  libraryList.addEventListener("click", e => {
    const deleteBtn = e.target.closest("[data-action=\"delete-saved\"]");
    if (deleteBtn) {
      e.preventDefault();
      const docId = deleteBtn.dataset.id;
      if (!docId) return;
      const confirmMsg = t("tc.library.deleteConfirm", "X\u00f3a b\u1ea3n l\u01b0u n\u00e0y?");
      if (!window.confirm(confirmMsg)) return;
      if (!ensureAuthReady()) return;
      const api = getAuthApi();
      const user = api?.auth?.currentUser || currentUser;
      if (!user) {
        openAuth(t("tc.auth.needLoginLibrary", "Cần đăng nhập để xem thư viện."));
        return;
      }
      deleteSavedSearch(api.db, user.uid, docId)
        .then(() => {
          libraryItemsCache = libraryItemsCache.filter((item) => item.id !== docId);
          renderLibraryList(libraryItemsCache);
          showToast(t("tc.library.deleted", "\u0110\u00e3 x\u00f3a b\u1ea3n l\u01b0u."));
        })
        .catch((err) => {
          console.error("X\u00f3a b\u1ea3n l\u01b0u th\u1ea5t b\u1ea1i", err);
          showToast(t("tc.library.deleteFail", "Kh\u00f4ng th\u1ec3 x\u00f3a b\u1ea3n l\u01b0u."));
        });
      return;
    }
    const openBtn = e.target.closest("[data-action=\"open-saved\"]");
    if (openBtn) {
      e.preventDefault();
      handleOpenSaved(openBtn.dataset.id, openBtn);
      return;
    }
  });
}
if (btnExportCsv && btnExportCsv.dataset.bound !== "1") {
  btnExportCsv.dataset.bound = "1";
  btnExportCsv.addEventListener("click", exportLibraryCsv);
}

if (verifiedOnlyToggle) {
  verifiedOnlyToggle.addEventListener("change", () => {
    useVerifiedOnly = verifiedOnlyToggle.checked;
    if (!lastChosenHex) return;
    scheduleSearch(lastChosenHex);
  });
}

if (btnUseCurrentColor) {
  btnUseCurrentColor.addEventListener("click", () => {
    const hex = normalizeHex(lastChosenHex || colorPicker?.value);
    if (hex && contributeHex) contributeHex.value = hex.toUpperCase();
  });
}

if (contributeSubmit) {
  contributeSubmit.addEventListener("click", async () => {
    const initErr = getAuthInitError();
    if (initErr) {
      console.error(initErr);
      showToast(`${initErr.name || "Firebase"}: ${initErr.message || "Loi"}`);
      return;
    }
    if (!ensureAuthReady()) return;
    if (!currentUser) {
      openAuth(t("tc.auth.needLoginContribute", "Cần đăng nhập để đóng góp dữ liệu."));
      return;
    }
    const brand = (contributeBrandCustom?.value || contributeBrandSelect?.value || "").trim();
    const code = (contributeCode?.value || "").trim();
    const name = (contributeName?.value || "").trim();
    const hexRaw = (contributeHex?.value || "").trim();
    const hex = normalizeHex(hexRaw);
    if (!brand || !code || !hex) {

      showToast("Brand, Code, Hex là bắt buộc");
      return;
    }

    if (!/^#[0-9a-f]{6}$/i.test(hex)) {
      showToast("Hex không hợp lệ");

      return;
    }
    try {
      await submitThread(authApi.db, currentUser, { brand, code, name, hex: hex.toUpperCase() });


      showToast(t("tc.verify.submitted", "Đã gửi, chờ xác minh"));


      closeContributeModal();
    } catch (err) {
      console.error(err);
      showToast(err?.message || "G?i th?t b?i");
    }
  });
}

if (contributeClose) contributeClose.addEventListener("click", closeContributeModal);
if (contributeCancel) contributeCancel.addEventListener("click", closeContributeModal);
if (contributeOverlay) contributeOverlay.addEventListener("click", closeContributeModal);

if (verifyClose) verifyClose.addEventListener("click", closeVerifyModal);
if (verifyOverlay) verifyOverlay.addEventListener("click", closeVerifyModal);

if (verifyList) {
  verifyList.addEventListener("click", async e => {
    const actionBtn = e.target.closest("[data-action]");
    if (!actionBtn) return;
    const id = actionBtn.dataset.id;
    const action = actionBtn.dataset.action;
    const targetItem = pendingSubmissions.find(p => p.id === id);
    if (!currentUser) {
      openAuth(t("tc.auth.needLoginVerify", "Cần đăng nhập để xác minh."));
      return;
    }
    if (!ensureAuthReady()) return;
    try {
      if (action === "vote-confirm" || action === "vote-reject") {
        const vote = action === "vote-confirm" ? "confirm" : "reject";
        await voteOnSubmission(authApi.db, id, currentUser, vote);
        let summary;
        try {
          summary = await getVoteSummary(authApi.db, id);
        } catch (err) {
          if (isPermissionDenied(err)) {
            const old = targetItem?.summary || { confirmCount: 0, rejectCount: 0 };
            summary = {
              confirmCount: old.confirmCount + (vote === "confirm" ? 1 : 0),
              rejectCount: old.rejectCount + (vote === "reject" ? 1 : 0)
            };
          } else {
            throw err;
          }
        }
        if (targetItem) targetItem.summary = summary;
        renderVerifyList();
      }
      if (action === "approve") {
        if (!isAdminUser) {
          showToast("Chỉ admin mới duyệt được");
          return;
        }
        if (!targetItem) {

          showToast("Không tìm thấy submission");

          return;
        }
        const summary = targetItem?.summary || await getVoteSummary(authApi.db, id);
        await promoteSubmissionToVerified(authApi.db, targetItem, summary, currentUser);
        pendingSubmissions = pendingSubmissions.filter(p => p.id !== id);
        renderVerifyList();
        fetchVerifiedThreads().then(list => {
          verifiedThreads = list;
          mergeVerifiedThreads(list);
        });
      }
    } catch (err) {
      console.error(err);

      showToast(err?.message || "Lỗi thao tác");

    }
  });
}

if (deltaMethodSelect) {
  currentDeltaMethod = deltaMethodSelect.value === "2000" ? "2000" : "76";
  deltaMethodSelect.addEventListener("change", () => {
    currentDeltaMethod = deltaMethodSelect.value === "2000" ? "2000" : "76";
    matchCache.clear();
    if (lastChosenHex) scheduleSearch(lastChosenHex);
  });
}
loadProjectPrefs();
loadPins();

btnFindNearest?.addEventListener("click", () => {

  if (!isDataReady) return alert("Dữ liệu chưa sẵn sàng");

  const hex = colorPicker.value;
  telemetry.track("search_start");
  runSearch(hex);
});

deltaSlider?.addEventListener("input", () => {
  currentDeltaThreshold = parseFloat(deltaSlider.value);
  deltaValueEls.forEach(el => el.textContent = `≈ ${currentDeltaThreshold.toFixed(1)}`);
  if (!lastResults || !lastChosenHex) return;
  scheduleSearch(lastChosenHex);
});

resultBox?.addEventListener("click", handleResultContainerClick);
if (pinPanel && !pinPanel.dataset.bound) {
  pinPanel.dataset.bound = "1";
  pinPanel.addEventListener("click", (e) => {
    const actionBtn = e.target.closest("[data-action]");
    if (!actionBtn) return;
    const action = actionBtn.dataset.action;
    const hex = actionBtn.dataset.hex;
    if (action === "pin-remove" && hex) {
      removePin(hex);
      return;
    }
    if (action === "pin-copy" && hex) {
      const item = pinnedItems.find(p => p.hex === normalizeHex(hex));
      const text = item?.code || item?.hex || "";
      copyToClipboard(text, t("tc.pin.copyCode", "Sao chép mã"));
      return;
    }
    if (action === "pin-clear") {
      pinnedItems = [];
      savePins();
      renderPinPanel();
      syncPinButtons();
    }
  });
}
pinClear?.addEventListener("click", () => {
  pinnedItems = [];
  savePins();
  renderPinPanel();
  syncPinButtons();
});
drawerOverlay?.addEventListener("click", closeInspector);
drawerCloseBtn?.addEventListener("click", closeInspector);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (hasToolUI) closeInspector();
  }
  try {
    if (localStorage.getItem("tc_shortcuts") === "0") return;
  } catch (err) {}
  if (!hasToolUI) return;
  const targetTag = (e.target.tagName || "").toLowerCase();
  const isTyping = targetTag === "input" || targetTag === "textarea";
  const key = (e.key || "").toLowerCase();
  if (!isTyping && key === "i") startEyeDropper();
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && key === "p") {
    e.preventDefault();
    startEyeDropper();
  }
});

copyButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.copy;
    const value = document.getElementById(`inspector${type}`).textContent;
    copyToClipboard(value, type.toUpperCase());
  });
});

copyAllBtn?.addEventListener("click", () => {
  const hex = inspectorHex.textContent;
  const rgb = inspectorRgb.textContent;
  const lab = inspectorLab.textContent;
  const hsl = inspectorHsl.textContent;
  const block = `HEX: ${hex}\nRGB: ${rgb}\nLAB: ${lab}\nHSL: ${hsl}`;
  copyToClipboard(block, t("tc.inspector.copyAllLabel", "Tất cả"));
});

// Canvas pick
imgInput?.addEventListener("change", e => {
  if (!canvas || !ctx) return;
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  const url = URL.createObjectURL(file);
  img.onload = () => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
  };
  img.src = url;
});

canvas?.addEventListener("click", e => {
  if (!ctx) return;


  if (!isDataReady) return alert("Dữ liệu chưa sẵn sàng");


  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = Math.floor((e.clientX - rect.left) * scaleX);
  const y = Math.floor((e.clientY - rect.top) * scaleY);
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  const hex = `#${[pixel[0], pixel[1], pixel[2]].map(v => v.toString(16).padStart(2, "0")).join("")}`;
  runSearch(hex);
});

// Find by code
btnFindByCode?.addEventListener("click", () => {
  if (!isDataReady) {
    showToast(t("tc.status.loading", "Đang chuẩn bị dữ liệu..."));
    return;
  }
  telemetry.track("search_start");
  const rawQuery = codeInput.value.trim();
  if (!rawQuery) {
    showToast(t("tc.code.empty", "Vui lòng nhập mã."));
    return;
  }
  const parsed = parseCodeQuery(rawQuery);
  if (!parsed) {
    showToast(t("tc.code.invalid", "Mã không hợp lệ."));
    return;
  }

  const selectedBrands = getSelectedBrands();
  const requireVerified = useVerifiedOnly;
  let results = [];

  if (parsed.mode === "brand") {
    if (selectedBrands.length && !selectedBrands.includes(parsed.brand)) {
      showToast(t("tc.code.brandNotSelected", "Hãng này chưa được chọn."));
      renderCodeLookupResults(rawQuery, []);
      return;
    }
    const list = threadsByBrand.get(parsed.brand) || [];
    results = list.filter(t => normalizeCodeKey(t.code) === parsed.codeKey)
      .filter(t => !requireVerified || isVerifiedThread(t));
  } else {
    const list = threadsByCode.get(parsed.codeKey) || [];
    results = list.filter(t => selectedBrands.includes(t.brand))
      .filter(t => !requireVerified || isVerifiedThread(t));
  }

  if (!results.length) {
    showToast(t("tc.code.notFoundToast", "Không tìm thấy mã này."));
    renderCodeLookupResults(rawQuery, []);
    return;
  }
  if (results.length === 1) {
    const item = results[0];
    openInspector({
      hex: item.hex,
      brand: item.brand || "",
      code: item.code || "",
      name: item.name || "",
      delta: "",
      lab: ensureLab(item)
    }, null);
    runSearch(item.hex);
    return;
  }
  results.sort((a, b) => a.brand.localeCompare(b.brand) || String(a.code).localeCompare(String(b.code)));
  renderCodeLookupResults(rawQuery, results);
});

if (btnPickScreen) {
  btnPickScreen.addEventListener("click", () => {
    startEyeDropper();
  });
} 

if (fallbackColorPicker) {
  fallbackColorPicker.addEventListener("input", () => {
    const hex = normalizeHex(fallbackColorPicker.value);
    if (!hex) return;
    if (colorPicker) colorPicker.value = hex;
    copyToClipboard(hex, hex);
  });
}
  







