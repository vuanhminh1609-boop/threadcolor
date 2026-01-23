import { createSpec } from "./spec.js";
import { composeHandoff } from "./handoff.js";

const ASSET_STORAGE_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const FEED_STORAGE_KEY = "tc_community_feed";
const HANDOFF_FROM = "imagecolor";

const elements = {
  input: document.getElementById("imgInput"),
  preview: document.getElementById("imagePreview"),
  canvas: document.getElementById("sampleCanvas"),
  swatchGrid: document.getElementById("swatchGrid"),
  paletteSize: document.getElementById("paletteSize"),
  btnSample: document.getElementById("btnSample"),
  btnToPalette: document.getElementById("btnToPalette"),
  btnToGradient: document.getElementById("btnToGradient"),
  btnSave: document.getElementById("btnSaveLibrary"),
  btnUseLibrary: document.getElementById("btnUseLibrary"),
  btnShare: document.getElementById("btnShare"),
  toast: document.getElementById("toast"),
  status: document.getElementById("statusText")
};

const state = {
  image: null,
  imageName: "",
  palette: []
};

const setStatus = (message) => {
  if (!elements.status) return;
  elements.status.textContent = message || "";
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

const sampleImage = () => {
  if (!state.image || !elements.canvas) return;
  const ctx = elements.canvas.getContext("2d");
  if (!ctx) return;
  const size = 64;
  elements.canvas.width = size;
  elements.canvas.height = size;
  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(state.image, 0, 0, size, size);
  const data = ctx.getImageData(0, 0, size, size).data;
  const pixels = [];
  for (let i = 0; i < data.length; i += 16) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 50) continue;
    pixels.push([r, g, b]);
  }
  const count = Number(elements.paletteSize?.value || 8);
  state.palette = pickPalette(pixels, count).map(normalizeHex).filter(Boolean);
  renderPalette();
};

const renderPalette = () => {
  if (!elements.swatchGrid) return;
  elements.swatchGrid.innerHTML = "";
  if (!state.palette.length) {
    setStatus("Chưa có bảng phối màu. Hãy tải ảnh và bấm Lấy mẫu màu.");
    return;
  }
  state.palette.forEach((hex) => {
    const swatch = document.createElement("div");
    swatch.className = "tc-swatch";
    swatch.style.background = hex;
    swatch.textContent = hex;
    elements.swatchGrid.appendChild(swatch);
  });
  setStatus(`Đã lấy ${state.palette.length} màu từ ảnh.`);
};

const setPreview = (src) => {
  if (!elements.preview) return;
  elements.preview.innerHTML = "";
  if (!src) {
    elements.preview.innerHTML = "<div class='tc-muted text-sm'>Ảnh xem trước</div>";
    return;
  }
  const img = document.createElement("img");
  img.src = src;
  img.alt = "Ảnh xem trước";
  img.className = "w-full h-full object-cover";
  elements.preview.appendChild(img);
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
  state.imageName = file.name || "Ảnh";
  const dataUrl = await readImageFile(file);
  const img = new Image();
  img.onload = () => {
    state.image = img;
    setPreview(dataUrl);
    sampleImage();
  };
  img.src = dataUrl;
};

const buildAssetSpec = () => {
  if (!state.palette.length) {
    return null;
  }
  const project = getCurrentProject();
  return createSpec({
    type: "palette",
    name: `Bảng phối màu từ ảnh`,
    tags: ["ảnh", "palette"],
    core: { colors: state.palette },
    payload: { colors: state.palette },
    sourceImage: {
      name: state.imageName
    },
    sourceWorld: "imagecolor",
    project
  });
};

const saveToLibrary = () => {
  const spec = buildAssetSpec();
  if (!spec) {
    showToast("Chưa có bảng phối màu để lưu.");
    return;
  }
  try {
    const raw = localStorage.getItem(ASSET_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const next = Array.isArray(list) ? list : [];
    next.unshift(spec);
    localStorage.setItem(ASSET_STORAGE_KEY, JSON.stringify(next));
    showToast("Đã lưu vào Thư viện.");
  } catch (_err) {
    showToast("Không thể lưu vào Thư viện.");
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

const bindEvents = () => {
  elements.input?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    handleFile(file);
  });
  elements.btnSample?.addEventListener("click", sampleImage);
  elements.btnToPalette?.addEventListener("click", toPaletteWorld);
  elements.btnToGradient?.addEventListener("click", toGradientWorld);
  elements.btnSave?.addEventListener("click", saveToLibrary);
  elements.btnUseLibrary?.addEventListener("click", () => {
    const payload = composeHandoff({
      from: HANDOFF_FROM,
      intent: "use",
      projectId: getCurrentProject()
    });
    window.location.href = `../worlds/library.html${payload}`;
  });
  elements.btnShare?.addEventListener("click", () => {
    const spec = buildAssetSpec();
    if (!spec) {
      showToast("Chưa có bảng phối màu để chia sẻ.");
      return;
    }
    publishToFeed(spec);
  });
  elements.paletteSize?.addEventListener("change", sampleImage);
};

setPreview("");
renderPalette();
bindEvents();
