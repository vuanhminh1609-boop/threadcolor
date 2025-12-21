import { saveSearch, getSavedSearch, listSavedSearches } from "./library.js";
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

function deltaE76(lab1, lab2) {
  return Math.sqrt(
    (lab1[0] - lab2[0]) ** 2 +
    (lab1[1] - lab2[1]) ** 2 +
    (lab1[2] - lab2[2]) ** 2
  );
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
let selectedItemEl = null;
let lastFocusedItem = null;
let currentUser = null;
let currentRendered = [];
let isAdminUser = false;
let useVerifiedOnly = false;
let verifiedThreads = [];
let pendingSubmissions = [];

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
            <div class="text-xs text-gray-600">Confirm: ${summary.confirmCount} | Reject: ${summary.rejectCount}</div>
          </div>
          <div class="flex flex-col gap-2">
            <button data-action="vote-confirm" data-id="${item.id}" class="px-3 py-1 rounded-lg border text-emerald-700 border-emerald-200 hover:bg-emerald-50">Confirm</button>
            <button data-action="vote-reject" data-id="${item.id}" class="px-3 py-1 rounded-lg border text-rose-700 border-rose-200 hover:bg-rose-50">Reject</button>
            ${canApprove ? `<button data-action="approve" data-id="${item.id}" class="px-3 py-1 rounded-lg bg-amber-600 text-white hover:bg-amber-700">Approve</button>` : ""}
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
    console.info("[fetchVerifiedThreads] path", ref.path || "verifiedThreads");
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
        updated.lab = rgbToLab(hexToRgbArray(updated.hex));
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
      map.set(key, { ...v, lab: rgbToLab(hexToRgbArray(v.hex)) });
    }
  });
  threads = Array.from(map.values());
  const brands = getUniqueBrands(threads);
  renderBrandFilters(brands);
  populateContributeBrands(brands);
  if (lastChosenHex) {
    lastResults = findNearestColors(lastChosenHex, 100);
    const filtered = lastResults.filter(t => t.delta <= currentDeltaThreshold);
    showGroupedResults(groupByColorSimilarity(filtered, currentDeltaThreshold), lastChosenHex);
  }
}

const resultBox = document.getElementById("result");
const deltaSlider = document.getElementById("deltaSlider");
const deltaValueEls = document.querySelectorAll("#deltaValue");
const brandFilters = document.getElementById("brandFilters");
const verifiedOnlyToggle = document.getElementById("verifiedOnlyToggle");
const btnFindNearest = document.getElementById("btnFindNearest");
const colorPicker = document.getElementById("colorPicker");
const codeInput = document.getElementById("codeInput");
const btnFindByCode = document.getElementById("btnFindByCode");
const imgInput = document.getElementById("imgInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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
const accountBtn = document.getElementById("btnAccount");
const accountMenuBtn = document.getElementById("accountMenuBtn");
const accountMenu = document.getElementById("accountMenu");
const userInfo = document.getElementById("userInfo");
const userAvatar = document.getElementById("userAvatar");
const userName = document.getElementById("userName");
const btnLogout = document.getElementById("btnLogout");
const btnLibrary = document.getElementById("btnLibrary");
const btnContribute = document.getElementById("btnContribute");
const btnVerify = document.getElementById("btnVerify");
const authOverlay = document.getElementById("authOverlay");
const authModal = document.getElementById("authModal");
const authClose = document.getElementById("authClose");
const tabLogin = document.getElementById("tabLogin");
const tabRegister = document.getElementById("tabRegister");
const loginPanel = document.getElementById("loginPanel");
const registerPanel = document.getElementById("registerPanel");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const registerConfirm = document.getElementById("registerConfirm");
const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const btnGoogle = document.getElementById("btnGoogle");
const btnFacebook = document.getElementById("btnFacebook");
const btnForgot = document.getElementById("btnForgot");
const authError = document.getElementById("authError");
function getAuthApi() {
  return window.firebaseAuth || null;
}
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


resultBox.innerHTML = "<p class='text-gray-500 text-center'>Đang tải, dữ liệu màu chưa sẵn sàng</p>";


//======================= DATA LOADING =======================
fetch("threads.json")
  .then(res => res.json())
  .then(data => {
    const normalized = normalizeAndDedupeThreads(data, {
      source: { type: "runtime_json" }
    });
    threads = normalized.map(t => {
      const lab = rgbToLab(hexToRgbArray(t.hex));
      return { ...t, lab };
    });
    const brands = getUniqueBrands(threads);
    renderBrandFilters(brands);
    populateContributeBrands(brands);
    fetchVerifiedThreads().then(list => {
      verifiedThreads = list;
      mergeVerifiedThreads(list);
    });
    isDataReady = true;

    resultBox.innerHTML = "Xong. Dữ liệu màu đã sẵn sàng.";

    restoreInspectorFromUrl();
  })
  .catch(() => {
    resultBox.innerHTML = "<p class='text-red-600'>Lỗi tải dữ liệu</p>";
  });

//======================= CORE LOGIC =======================
function getSelectedBrands() {
  return [...document.querySelectorAll(".brand-filter:checked")].map(cb => cb.value);
}

function findNearestColors(chosenHex, limit = 100) {
  const normalized = normalizeHex(chosenHex);
  if (!normalized) return [];
  const chosenLab = rgbToLab(hexToRgbArray(normalized));
  const brands = getSelectedBrands();
  if (!brands.length) return [];
  const requireVerified = useVerifiedOnly;
  return threads
    .filter(t => brands.includes(t.brand))
    .filter(t => {
      if (!requireVerified) return true;
      const conf = typeof t.confidence === "number" ? t.confidence : 0;
      return conf >= 0.85 || t.source?.type === "CROWD_VERIFIED";
    })
    .map(t => ({ ...t, delta: deltaE76(chosenLab, t.lab) }))
    .sort((a, b) => a.delta - b.delta)
    .slice(0, limit);
}

function groupByColorSimilarity(colors, threshold = 2.5) {
  const groups = [];
  colors.forEach(c => {
    const g = groups.find(gr => deltaE76(c.lab, gr.leader.lab) <= threshold);
    g ? g.items.push(c) : groups.push({ leader: c, items: [c] });
  });
  return groups;
}

//======================= RENDERING =======================


function renderColorCard(t, chosenHex) {
  const deltaText = typeof t.delta === "number" ? t.delta.toFixed(2) : "";
  const labAttr = t.lab ? t.lab.join(",") : "";
  return `
    <div class="result-item rounded-xl shadow-md bg-white p-3 hover:scale-[1.02] transition border border-transparent data-[selected=true]:border-indigo-400 data-[selected=true]:shadow-lg cursor-pointer"
         data-hex="${t.hex}" data-brand="${t.brand || ""}" data-code="${t.code || ""}" data-name="${t.name || ""}" data-delta="${deltaText}" data-lab="${labAttr}">
      <div class="flex gap-3 items-center">
        <div class="w-12 h-12 rounded-lg border" style="background:${t.hex}"></div>
        <div class="flex-1 text-sm">
          <div class="font-semibold">${t.brand || ""} ${t.code || ""}</div>
          <div class="text-gray-600">${t.name || ""}</div>

          <div class="text-xs text-gray-500">ΔE ${deltaText}</div>

        </div>
      </div>
      <div class="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <div class="w-4 h-4 rounded border" style="background:${chosenHex}"></div>
        <span>so với</span>
        <div class="w-4 h-4 rounded border" style="background:${t.hex}"></div>
      </div>
      <div class="mt-3 flex justify-end">
        <button class="btn-save px-3 py-1 text-xs rounded-lg border text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                data-action="save-search" data-save-hex="${t.hex}">
          Save
        </button>
      </div>
    </div>
  `;
}

function showGroupedResults(groups, chosenHex) {
  currentRendered = groups.flatMap(g => g.items);
  resultBox.innerHTML = `
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-lg border" style="background:${chosenHex}"></div>
      <div class="font-semibold">Màu đã chọn</div>
    </div>
    ${groups.map((group, i) => `
      <section class="mb-8">
        <h3 class="font-semibold mb-3 text-gray-700 flex items-center gap-2">
  <span>Nhóm ${i + 1}</span>
  <span class="inline-block w-3 h-3 rounded-sm border" style="background:${chosenHex}"></span>
  <span>${group.items.length} màu</span>
</h3>


        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          ${group.items.map(t => renderColorCard(t, chosenHex)).join("")}
        </div>
      </section>
    `).join("")}
  `;
}

//======================= INSPECTOR =======================
function setSelectedItem(el) {
  if (selectedItemEl === el) return;
  if (selectedItemEl) selectedItemEl.dataset.selected = "false";
  selectedItemEl = el;
  if (selectedItemEl) selectedItemEl.dataset.selected = "true";
}

function showToast(text) {
  const item = document.createElement("div");
  item.className = "bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg animate-fade-in-up";
  item.textContent = text;
  toastContainer.appendChild(item);
  setTimeout(() => {
    item.classList.add("opacity-0", "translate-y-1");
    setTimeout(() => item.remove(), 400);
  }, 1500);
}

function copyToClipboard(text, label) {
  if (!text) return;
  const fallbackCopy = () => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();

    try { document.execCommand("copy"); showToast(`Đã copy ${label}`); } catch (e) {}

    ta.remove();
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {

      showToast(`Đã copy ${label}`);

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


  inspectorBrand.textContent = brand || "�";
  inspectorCode.textContent = code || "�";
  inspectorName.textContent = name || "�";
  inspectorDelta.textContent = delta ? `ΔE ${delta}` : "�";
  drawerTitle.textContent = "Color Inspector";
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
    showAuthError(msg);
    return false;
  }
  if (!ensureAuthReady()) return;
  const api = getAuthApi();
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    showAuthError("Login de luu");
    accountBtn?.click();
    return;
  }
  const card = saveBtn?.closest(".result-item");
  const cardHex = normalizeHex(card?.dataset?.hex || lastChosenHex);
  const cardBrand = card?.dataset?.brand || "";
  const cardCode = card?.dataset?.code || "";
  const cardName = card?.dataset?.name || "";
  if (!currentRendered.length || !cardHex) {
    showToast("Khong co du lieu de luu");
    return;
  }
  console.info("[save] card data", { hex: cardHex, brand: cardBrand, code: cardCode, name: cardName });
  showToast("Saving...");
  const resetSaveBtn = (text = "Save") => {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = text;
    }
  };
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.textContent = "Saving...";
  }
  try {
    const payload = {
      inputHex: cardHex,
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
    if (saveBtn) {
      saveBtn.textContent = "Saved ✓";
      setTimeout(() => resetSaveBtn("Save"), 1500);
    }
    showToast("Saved ✓");
    if (libraryModal && !libraryModal.classList.contains("hidden")) {
      await loadLibraryList();
    }
  } catch (err) {
    console.error("[save] failed", err);
    const friendly = formatFirestoreError(err, "Luu that bai");
    showToast(friendly);
    resetSaveBtn("Save");
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
  const labData = thread ? thread.lab : rgbToLab(hexToRgbArray(normalized));
  openInspector({
    hex: normalized,
    brand: thread?.brand || "",
    code: thread?.code || "",
    name: thread?.name || "",
    delta: "",
    lab: labData
  }, null);
}

//======================= AUTH UI =======================
function showAuthError(message) {
  if (!authError) return;
  if (!message) {
    authError.classList.add("hidden");
    authError.textContent = "";
    return;
  }
  authError.textContent = message;
  authError.classList.remove("hidden");
}

function setAuthTab(tab) {
  if (!tabLogin || !tabRegister || !loginPanel || !registerPanel) return;
  const isLogin = tab === "login";
  loginPanel.classList.toggle("hidden", !isLogin);
  registerPanel.classList.toggle("hidden", isLogin);
  tabLogin.classList.toggle("bg-indigo-50", isLogin);
  tabLogin.classList.toggle("text-indigo-700", isLogin);
  tabRegister.classList.toggle("bg-indigo-50", !isLogin);
  tabRegister.classList.toggle("text-indigo-700", !isLogin);
  showAuthError("");
}

function openAuthModal(tab = "login") {
  if (!authOverlay || !authModal) return;
  authOverlay.classList.remove("hidden");
  authModal.classList.remove("hidden");
  authModal.classList.add("flex");
  setAuthTab(tab);
  (tab === "login" ? loginEmail : registerEmail)?.focus();
}

function closeAuthModal() {
  if (!authOverlay || !authModal) return;
  authOverlay.classList.add("hidden");
  authModal.classList.add("hidden");
  authModal.classList.remove("flex");
  showAuthError("");
}

let lastAdminUid = null;
let lastAdminValue = null;
async function updateUserUI(user) {
  currentUser = user;
  const loggedIn = !!user;
  if (userInfo) userInfo.classList.toggle("hidden", !loggedIn);
  if (btnLogout) btnLogout.classList.toggle("hidden", !loggedIn);
  if (btnAccount) btnAccount.classList.toggle("hidden", loggedIn);
  if (user && userName) userName.textContent = user.displayName || user.email || "User";
  if (user && userAvatar) {
    userAvatar.src = user.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.displayName || user.email || "U");
  }
  if (user) closeAuthModal();
  if (user && authApi?.db) {
    if (lastAdminUid === user.uid && lastAdminValue === true) {
      isAdminUser = true;
    } else {
      await refreshAdmin(true);
    }
    if (btnVerify) btnVerify.classList.toggle("hidden", !isAdminUser);
  } else {
    isAdminUser = false;
    lastAdminUid = null;
    lastAdminValue = null;
    if (btnVerify) btnVerify.classList.add("hidden");
    if (accountMenu) accountMenu.classList.add("hidden");
  }
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
    showAuthError(`${initErr?.name || "Firebase"}: ${initErr?.message || "Lỗi khởi tạo"}`);
    return false;
  }
  const api = getAuthApi();
  if (!api || typeof api.onAuthStateChanged !== "function") {
    showAuthError("Firebase init error: missing firebaseConfig");
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
      showAuthError("Login để xem Library");
    accountBtn?.click();
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
          <button data-action="open-saved" data-id="${it.id}" class="px-3 py-1 rounded-lg border bg-white hover:bg-gray-50 text-indigo-700">Open</button>
        </div>
      `;
    }).join("");
  } catch (err) {
    console.error("Load library failed", err);
    const friendly = formatFirestoreError(err, "Không tải được Library");
    libraryList.innerHTML = `<div class='text-red-600'>${friendly}</div>`;
  }
}

//======================= SAVE CURRENT =======================
async function handleSaveCurrent(saveBtn) {
  const initErr = getAuthInitError();
  if (initErr) {
    const msg = `${initErr?.name || "Firebase"}: ${initErr?.message || "Lỗi khởi tạo"}`;
    console.error(initErr);
    showToast(msg);
    showAuthError(msg);
    return false;
  }
  if (!ensureAuthReady()) return;
  const api = getAuthApi();
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    showAuthError("Login de luu");
    accountBtn?.click();
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
    showToast("Saved");
  } catch (err) {
    console.error("Save failed", err);
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
    showAuthError("Login de mo");
    accountBtn?.click();
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

    const grouped = groupByColorSimilarity(mapped, currentDeltaThreshold);
    showGroupedResults(grouped, data.inputHex || lastChosenHex || "#000000");
    const ts = data.createdAt && typeof data.createdAt.toDate === "function" ? data.createdAt.toDate() : null;
    const stamp = ts ? ts.toLocaleString() : "";
    resultBox.innerHTML = `<div class='mb-3 text-sm text-gray-600'>Loaded from My Library ${stamp ? "- " + stamp : ""}</div>` + resultBox.innerHTML;
    if (libraryOverlay) libraryOverlay.classList.add("hidden");
    if (libraryModal) {
      libraryModal.classList.add("hidden");
      libraryModal.classList.remove("flex");
    }
  }   catch (err) {
    console.error("Open saved failed", err);
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

if (accountBtn) {
  accountBtn.addEventListener("click", () => openAuthModal("login"));
}

const closeAccountMenu = () => {
  if (accountMenu) accountMenu.classList.add("hidden");
};

if (accountMenuBtn) {
  accountMenuBtn.addEventListener("click", e => {
    e.stopPropagation();
    accountMenu?.classList.toggle("hidden");
  });
  document.addEventListener("click", () => closeAccountMenu());
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeAccountMenu();
  });
}

if (authClose) authClose.addEventListener("click", closeAuthModal);
if (authOverlay) authOverlay.addEventListener("click", closeAuthModal);
if (tabLogin) tabLogin.addEventListener("click", () => setAuthTab("login"));
if (tabRegister) tabRegister.addEventListener("click", () => setAuthTab("register"));

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
}if (btnLibrary) {
  btnLibrary.addEventListener("click", () => {
    if (!ensureAuthReady()) return;
    const api = getAuthApi();
    const user = api?.auth?.currentUser || currentUser;
    if (!user) {
      showAuthError("Login de xem Library");
      accountBtn?.click();
      return;
    }
    libraryOverlay?.classList.remove("hidden");
    if (libraryModal) {
      libraryModal.classList.remove("hidden");
      libraryModal.classList.add("flex");
    }
    loadLibraryList();
  });
}


if (libraryList) {
  libraryList.addEventListener("click", e => {
    const openBtn = e.target.closest("[data-action=\"open-saved\"]");
    if (openBtn) {
      e.preventDefault();
      handleOpenSaved(openBtn.dataset.id, openBtn);
      return;
    }
  });
}

if (verifiedOnlyToggle) {
  verifiedOnlyToggle.addEventListener("change", () => {
    useVerifiedOnly = verifiedOnlyToggle.checked;
    if (!lastChosenHex) return;
    lastResults = findNearestColors(lastChosenHex, 100);
    const filtered = lastResults.filter(t => t.delta <= currentDeltaThreshold);
    showGroupedResults(groupByColorSimilarity(filtered, currentDeltaThreshold), lastChosenHex);
  });
}

if (btnContribute) {
  btnContribute.addEventListener("click", () => {
    if (!currentUser) {

      showAuthError("Login để đóng góp dữ liệu");

      accountBtn?.click();
      return;
    }
    if (!ensureAuthReady()) return;
    openContributeModal();
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

      showAuthError("Login để đóng góp dữ liệu");

      accountBtn?.click();
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


      showToast("Đã gửi, chờ xác minh");


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

if (btnVerify) {
  btnVerify.addEventListener("click", () => {
    if (!currentUser) {
showAuthError("Login để đóng góp dữ liệu");

      accountBtn?.click();
      return;
    }
    if (!ensureAuthReady()) return;
    openVerifyModal();
  });
}

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

      showAuthError("Login để xác minh");
      accountBtn?.click();
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

if (btnLogin) {
  btnLogin.addEventListener("click", async () => {
    if (!ensureAuthReady()) return;
    const email = loginEmail?.value.trim();
    const pass = loginPassword?.value;

    if (!email || !pass) return showAuthError("Vui lòng nhập Email và mật khẩu");
    try {
      await authApi.signInEmail(email, pass);
      showToast("Đăng nhập thành công");
    } catch (err) {
      showAuthError(err?.message || "Đăng nhập thất bại");

    }
  });
}

if (btnRegister) {
  btnRegister.addEventListener("click", async () => {
    if (!ensureAuthReady()) return;
    const email = registerEmail?.value.trim();
    const pass = registerPassword?.value;
    const confirm = registerConfirm?.value;

    if (!email || !pass || !confirm) return showAuthError("Điền đầy đủ thông tin");
    if (pass !== confirm) return showAuthError("Mật khẩu không trùng khớp");
    try {
      await authApi.registerEmail(email, pass);
      showToast("Tạo tài khoản thành công");
    } catch (err) {
      showAuthError(err?.message || "Tạo tài khoản thất bại");

    }
  });
}

if (btnForgot) {
  btnForgot.addEventListener("click", async () => {
    if (!ensureAuthReady()) return;
    const email = loginEmail?.value.trim();
    if (!email) return showAuthError("Nhập email để đặt lại mật khẩu");
    try {
      await authApi.resetPassword(email);

      showToast("Đã gửi email đặt lại mật khẩu");
    } catch (err) {
      showAuthError(err?.message || "Không gửi được email");

    }
  });
}

if (btnGoogle) {
  btnGoogle.addEventListener("click", async () => {
    if (!ensureAuthReady()) return;
    try {
      await authApi.signInGoogle();

      showToast("Đăng nhập Google thành công");

    } catch (err) {
      showAuthError(err?.message || "Google login thất bại ");
    }
  });
}

if (btnFacebook) {
  btnFacebook.addEventListener("click", async () => {
    if (!ensureAuthReady()) return;
    try {
      await authApi.signInFacebook();

      showToast("Đăng nhập Facebook thành công");

    } catch (err) {
      showAuthError(err?.message || "Facebook login thất bại");
    }
  });
}

if (btnLogout) {
  btnLogout.addEventListener("click", async () => {
    if (!ensureAuthReady()) return;
    await authApi.signOutUser();

    showToast("Đã đăng xuất");

  });
}

btnFindNearest.addEventListener("click", () => {

  if (!isDataReady) return alert("Dữ liệu chưa sẵn sàng");

  const hex = colorPicker.value;
  lastChosenHex = hex;
  lastResults = findNearestColors(hex, 100);
  const filtered = lastResults.filter(t => t.delta <= currentDeltaThreshold);
  showGroupedResults(groupByColorSimilarity(filtered, currentDeltaThreshold), hex);
});

deltaSlider.addEventListener("input", () => {
  currentDeltaThreshold = parseFloat(deltaSlider.value);
  deltaValueEls.forEach(el => el.textContent = `≈ ${currentDeltaThreshold.toFixed(1)}`);
  if (!lastResults || !lastChosenHex) return;
  const filtered = lastResults.filter(t => t.delta <= currentDeltaThreshold);
  showGroupedResults(groupByColorSimilarity(filtered, currentDeltaThreshold), lastChosenHex);
});

resultBox.addEventListener("click", handleResultContainerClick);
drawerOverlay.addEventListener("click", closeInspector);
drawerCloseBtn.addEventListener("click", closeInspector);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeInspector();
    closeAuthModal();
  }
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

copyAllBtn.addEventListener("click", () => {
  const hex = inspectorHex.textContent;
  const rgb = inspectorRgb.textContent;
  const lab = inspectorLab.textContent;
  const hsl = inspectorHsl.textContent;
  const block = `HEX: ${hex}\nRGB: ${rgb}\nLAB: ${lab}\nHSL: ${hsl}`;
  copyToClipboard(block, "t?t c?");
});

// Canvas pick
imgInput.addEventListener("change", e => {
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

canvas.addEventListener("click", e => {


  if (!isDataReady) return alert("Dữ liệu chưa sẵn sàng");


  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = Math.floor((e.clientX - rect.left) * scaleX);
  const y = Math.floor((e.clientY - rect.top) * scaleY);
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  const hex = `#${[pixel[0], pixel[1], pixel[2]].map(v => v.toString(16).padStart(2, "0")).join("")}`;
  lastChosenHex = hex;
  lastResults = findNearestColors(hex, 100);
  const filtered = lastResults.filter(t => t.delta <= currentDeltaThreshold);
  showGroupedResults(groupByColorSimilarity(filtered, currentDeltaThreshold), hex);
});

// Find by code
btnFindByCode.addEventListener("click", () => {

  if (!isDataReady) return alert("Dữ liệu chưa sẵn sàng");
  const query = codeInput.value.trim().toLowerCase();
  if (!query) return;
  const found = threads.find(t => `${t.brand} ${t.code}`.toLowerCase() === query);
  if (!found) return alert("Không tìm thấy mã này");

  lastChosenHex = found.hex;
  lastResults = findNearestColors(found.hex, 100);
  const filtered = lastResults.filter(t => t.delta <= currentDeltaThreshold);
  showGroupedResults(groupByColorSimilarity(filtered, currentDeltaThreshold), found.hex);
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
