import { createSpec } from "./spec.js";
import { composeHandoff } from "./handoff.js";

const ASSET_STORAGE_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const FEED_STORAGE_KEY = "tc_community_feed";
const HANDOFF_FROM = "imagecolor";

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
  btnSave: document.getElementById("btnSaveLibrary"),
  btnUseLibrary: document.getElementById("btnUseLibrary"),
  btnShare: document.getElementById("btnShare"),
  btnCopyCss: document.getElementById("btnCopyCss"),
  btnCopyJson: document.getElementById("btnCopyJson"),
  btnSharePalette: document.getElementById("btnSharePalette"),
  btnShareGradient: document.getElementById("btnShareGradient"),
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
  mockupFabric: document.getElementById("mockupFabric")
};

const state = {
  image: null,
  imageName: "",
  palette: [],
  lockedHexes: new Set(),
  dominantShare: {},
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
  sampleToken: 0
};

const setStatus = (message) => {
  if (!elements.status) return;
  elements.status.textContent = message || "";
};

const setActionButtonsEnabled = (enabled) => {
  const buttons = [
    elements.btnToPalette,
    elements.btnToGradient,
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
    setRegionStatus("Kéo để khoanh vùng cần lấy mẫu.");
  } else if (state.region) {
    setRegionStatus("Đang lấy mẫu trong vùng đã chọn.");
  } else {
    setRegionStatus("Chưa chọn vùng.");
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
  setRegionStatus(`Đang lấy mẫu trong vùng ${Math.round(state.region.w)}×${Math.round(state.region.h)}px.`);
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
    showToast("Đã đăng lên Cộng đồng. Bấm để xem.", {
      onClick: () => {
        window.location.href = "../worlds/community.html#feed";
      }
    });
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

const toggleLockHex = (hex, force) => {
  if (!hex) return false;
  const isLocked = state.lockedHexes.has(hex);
  const next = force === true ? true : force === false ? false : !isLocked;
  if (next) {
    if (state.lockedHexes.size >= 4 && !isLocked) {
      showToast("Chỉ giữ tối đa 4 màu.");
      return false;
    }
    state.lockedHexes.add(hex);
  } else {
    state.lockedHexes.delete(hex);
  }
  return true;
};

const applyLocksToPalette = (palette, count) => {
  const locked = getLockedList();
  const next = [];
  locked.forEach((hex) => {
    if (!next.includes(hex)) next.push(hex);
  });
  palette.forEach((hex) => {
    if (!next.includes(hex)) next.push(hex);
  });
  return next.slice(0, count);
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
  const main = state.palette[0] || "#94A3B8";
  const secondary = state.palette[1] || adjustRgb(main, 30);
  const accent = state.palette[2] || adjustRgb(main, -30);
  return { main, secondary, accent };
};

const updateMockups = () => {
  const { main, secondary, accent } = getPaletteRoles();
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
  if (elements.mockupFabric) {
    const body = elements.mockupFabric.querySelector(".ic-mockup-body");
    if (body) {
      body.style.background = `repeating-linear-gradient(45deg, ${main}, ${main} 12px, ${secondary} 12px, ${secondary} 24px)`;
      body.style.boxShadow = `inset 0 0 0 2px ${accent}`;
    }
  }
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
    elements.btnSample.textContent = "Đang lấy mẫu…";
    elements.btnSample.disabled = true;
    return;
  }
  elements.btnSample.textContent = elements.btnSample.dataset.label || "Lấy mẫu màu";
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
      showToast(`Đã lấy ${state.palette.length} màu từ ảnh.`);
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
    showToast("Không có dữ liệu ảnh để lấy mẫu.");
    return;
  }
  const paletteRaw = pickPalette(state.samplePixels, count).map(normalizeHex).filter(Boolean);
  state.palette = applyLocksToPalette(paletteRaw, count);
  state.dominantShare = computeDominantShare(state.palette, state.samplePixels);
  renderPalette();
  setSampleLoading(false);
  showToast(`Đã lấy ${state.palette.length} màu từ ảnh.`);
};

const sampleImage = () => {
  if (!state.image) {
    showToast("Hãy tải ảnh trước khi lấy mẫu.");
    return;
  }
  if (!elements.canvas) return;
  setSampleLoading(true);
  try {
    const count = Number(elements.paletteSize?.value || 8);
    const imageData = buildSampleImageData();
    if (!imageData) throw new Error("no-sample");
    state.samplePixels = pixelsFromImageData(imageData);
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
    showToast("Có lỗi khi lấy mẫu màu.");
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
    setStatus("Chưa có bảng phối màu. Hãy tải ảnh và bấm Lấy mẫu màu.");
    setActionButtonsEnabled(false);
    updateMockups();
    return;
  }
  state.dominantShare = computeDominantShare(state.palette, state.samplePixels);
  state.palette.forEach((hex) => {
    const card = document.createElement("div");
    card.className = "tc-swatch-card";

    const swatch = document.createElement("div");
    swatch.className = "tc-swatch";
    swatch.style.background = hex;
    swatch.textContent = hex;

    const share = document.createElement("div");
    share.className = "tc-swatch-share";
    const percent = state.dominantShare?.[hex];
    share.textContent = Number.isFinite(percent) ? `${percent}%` : "--";

    const actions = document.createElement("div");
    actions.className = "tc-swatch-actions";

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "tc-swatch-btn";
    copyBtn.dataset.hex = hex;
    copyBtn.dataset.hexAction = "copy";
    copyBtn.textContent = "Copy HEX";

    const lockBtn = document.createElement("button");
    lockBtn.type = "button";
    lockBtn.className = "tc-swatch-btn tc-swatch-lock";
    lockBtn.dataset.hex = hex;
    lockBtn.dataset.hexAction = "lock";
    lockBtn.textContent = state.lockedHexes.has(hex) ? "Đang giữ" : "Giữ màu";
    if (state.lockedHexes.has(hex)) lockBtn.classList.add("is-active");

    actions.appendChild(copyBtn);
    actions.appendChild(lockBtn);
    card.appendChild(swatch);
    card.appendChild(share);
    card.appendChild(actions);
    elements.swatchGrid.appendChild(card);
  });
  setStatus(`Đã lấy ${state.palette.length} màu từ ảnh.`);
  setActionButtonsEnabled(true);
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
  try {
    state.imageName = file.name || "Ảnh";
    state.lockedHexes.clear();
    const dataUrl = await readImageFile(file);
    const img = new Image();
    img.onload = () => {
      state.image = img;
      setPreview(dataUrl);
      clearRegion();
      drawPreviewImage(img);
      sampleImage();
    };
    img.onerror = () => {
      showToast("Không thể tải ảnh để xử lý.");
    };
    img.src = dataUrl;
  } catch (_err) {
    showToast("Không thể đọc ảnh. Vui lòng thử lại.");
  }
};

const buildThumbnail = (palette) => {
  if (!palette.length) return "";
  const canvas = document.createElement("canvas");
  const width = 180;
  const height = 120;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const step = width / palette.length;
  palette.forEach((hex, idx) => {
    ctx.fillStyle = hex;
    ctx.fillRect(idx * step, 0, step + 1, height);
  });
  return canvas.toDataURL("image/png");
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

const buildAssetSpec = () => {
  if (!state.palette.length) {
    return null;
  }
  const project = getCurrentProject();
  const thumbnail = buildThumbnail(state.palette);
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
      showToast("Hãy tải ảnh trước khi khoanh vùng.");
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
  elements.btnCopyCss?.addEventListener("click", async () => {
    if (!state.palette.length) return;
    const ok = await copyText(buildCssVars(state.palette));
    showToast(ok ? "Đã sao chép CSS vars." : "Không thể sao chép.");
  });
  elements.btnCopyJson?.addEventListener("click", async () => {
    if (!state.palette.length) return;
    const ok = await copyText(buildJsonTokens(state.palette));
    showToast(ok ? "Đã sao chép JSON tokens." : "Không thể sao chép.");
  });
  elements.btnSharePalette?.addEventListener("click", async () => {
    if (!state.palette.length) return;
    const ok = await copyText(buildPaletteShareLink(state.palette));
    showToast(ok ? "Đã sao chép link Palette." : "Không thể sao chép link.");
  });
  elements.btnShareGradient?.addEventListener("click", async () => {
    if (!state.palette.length) return;
    const ok = await copyText(buildGradientShareLink(state.palette));
    showToast(ok ? "Đã sao chép link Gradient." : "Không thể sao chép link.");
  });
  elements.paletteSize?.addEventListener("change", () => {
    if (state.image) sampleImage();
  });
  elements.swatchGrid?.addEventListener("click", async (event) => {
    const target = event.target.closest("[data-hex-action]");
    if (!target) return;
    const hex = target.dataset.hex;
    const action = target.dataset.hexAction;
    if (!hex || !action) return;
    if (action === "copy") {
      try {
        const ok = await copyText(hex);
        showToast(ok ? `Đã sao chép ${hex}.` : "Không thể sao chép.");
      } catch (_err) {
        showToast("Không thể sao chép. Hãy thử lại.");
      }
      return;
    }
    if (action === "lock") {
      const ok = toggleLockHex(hex);
      if (!ok) return;
      const count = Number(elements.paletteSize?.value || state.palette.length);
      state.palette = applyLocksToPalette(state.palette, count);
      renderPalette();
      showToast(state.lockedHexes.has(hex) ? `Đã giữ màu ${hex}.` : "Đã bỏ giữ màu.");
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
    showToast(event.shiftKey ? `Đã giữ màu ${hex}.` : `Đã thêm ${hex}.`);
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
  if (mode === "append" && state.palette.length) {
    const combined = [...state.palette, ...normalized];
    const unique = combined.filter((hex, idx) => combined.indexOf(hex) === idx);
    const count = Number(elements.paletteSize?.value || unique.length);
    state.palette = applyLocksToPalette(unique, count);
    renderPalette();
    setStatus("Đã thêm màu từ Kho HEX.");
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
  renderPalette();
  setStatus("Đã nhận màu từ Kho HEX.");
};

setPreview("");
setRegionStatus("Chưa chọn vùng.");
renderPalette();
bindEvents();

window.addEventListener("tc:hex-apply", (event) => {
  applyHexesFromHub(event?.detail);
});
