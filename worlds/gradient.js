import { composeHandoff } from "../scripts/handoff.js";

const MIN_STOPS = 2;
const MAX_STOPS = 7;
const ASSET_STORAGE_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const FEED_STORAGE_KEY = "tc_community_feed";
const HANDOFF_FROM = "gradient";

const state = {
  stops: ["#ff6b6b", "#ffd93d", "#6ee7b7"],
  angle: 90,
  samples: []
};

const el = {
  preview: document.getElementById("gradientPreview"),
  angleRange: document.getElementById("gradientAngle"),
  angleInput: document.getElementById("gradientAngleInput"),
  angleValue: document.getElementById("gradientAngleValue"),
  resetAngle: document.getElementById("gradientResetAngle"),
  stopsWrap: document.getElementById("gradientStops"),
  addStop: document.getElementById("gradientAdd"),
  randomStop: document.getElementById("gradientRandom"),
  exportBtn: document.getElementById("gradientExport"),
  toPalette: document.getElementById("gradientToPalette"),
  samplesWrap: document.getElementById("gradientSamples"),
  saveLibrary: document.getElementById("gradientSaveLibrary"),
  useLibrary: document.getElementById("gradientUseLibrary"),
  share: document.getElementById("gradientShare")
};

function normalizeHex(input) {
  if (!input) return null;
  let value = String(input).trim();
  if (!value) return null;
  if (!value.startsWith("#")) value = `#${value}`;
  value = value.toLowerCase();
  return /^#[0-9a-f]{6}$/.test(value) ? value : null;
}

function randomHex() {
  const n = Math.floor(Math.random() * 0xffffff);
  return `#${n.toString(16).padStart(6, "0")}`;
}

function buildGradientStops(stops) {
  const total = stops.length;
  if (total === 1) return `${stops[0]} 0%`;
  return stops
    .map((hex, idx) => {
      const pct = Math.round((idx / (total - 1)) * 100);
      return `${hex} ${pct}%`;
    })
    .join(", ");
}

function gradientCss(stops = state.stops, angle = state.angle) {
  return `linear-gradient(${angle}deg, ${buildGradientStops(stops)})`;
}

function tokensFor(stops) {
  return stops
    .map((hex, idx) => `  --mau-${String(idx + 1).padStart(2, "0")}: ${hex};`)
    .join("\n");
}

function exportText() {
  return `/* Dải chuyển màu */\n${gradientCss()}\n\nHex: ${state.stops.join(
    ", "
  )}\n\n:root {\n${tokensFor(state.stops)}\n}\n`;
}

function showToast(message) {
  let toast = document.getElementById("gradientToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "gradientToast";
    toast.className = "tc-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1600);
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

function getCurrentProject() {
  try {
    return localStorage.getItem(PROJECT_STORAGE_KEY) || "";
  } catch (_err) {
    return "";
  }
}

function buildGradientAsset() {
  const now = new Date().toISOString();
  return {
    id: `asset_${Date.now()}`,
    type: "gradient",
    name: "Dải chuyển màu nhanh",
    tags: ["gradient"],
    payload: { gradientParams: { stops: [...state.stops], angle: state.angle } },
    createdAt: now,
    updatedAt: now,
    sourceWorld: HANDOFF_FROM,
    project: getCurrentProject()
  };
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

async function copyText(text) {
  if (!text) return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (_err) {
    // fallback below
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    return true;
  } catch (_err) {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

function renderPreview() {
  if (el.preview) {
    el.preview.style.background = gradientCss();
  }
  if (el.angleValue) {
    el.angleValue.textContent = `${state.angle}°`;
  }
}

function renderStops() {
  if (!el.stopsWrap) return;
  el.stopsWrap.innerHTML = "";
  state.stops.forEach((hex, index) => {
    const row = document.createElement("div");
    row.className = "flex items-center gap-3";

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = hex;
    colorInput.className = "tc-color-input";
    colorInput.addEventListener("input", () => {
      state.stops[index] = colorInput.value;
      renderPreview();
    });

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = hex;
    textInput.className = "tc-input flex-1";
    textInput.placeholder = "#ffffff";
    textInput.addEventListener("input", () => {
      const normalized = normalizeHex(textInput.value);
      if (normalized) {
        state.stops[index] = normalized;
        colorInput.value = normalized;
        renderPreview();
      }
    });

    row.appendChild(colorInput);
    row.appendChild(textInput);

    if (state.stops.length > MIN_STOPS) {
      const removeBtn = document.createElement("button");
      removeBtn.className = "tc-btn tc-chip px-3 py-2 text-sm";
      removeBtn.type = "button";
      removeBtn.textContent = "Xóa";
      removeBtn.addEventListener("click", () => {
        state.stops.splice(index, 1);
        renderStops();
        renderPreview();
      });
      row.appendChild(removeBtn);
    }

    el.stopsWrap.appendChild(row);
  });
}

function renderSamples() {
  if (!el.samplesWrap) return;
  el.samplesWrap.innerHTML = "";
  state.samples.slice(0, 8).forEach((palette) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "tc-card p-3 text-left w-full";

    const title = document.createElement("p");
    title.className = "text-sm font-semibold";
    title.textContent = palette.ten || "Bảng phối màu";

    const preview = document.createElement("div");
    preview.className = "tc-gradient-preview mt-2";
    preview.style.minHeight = "56px";
    preview.style.background = gradientCss(palette.stops, state.angle);

    card.appendChild(title);
    card.appendChild(preview);

    card.addEventListener("click", () => {
      state.stops = [...palette.stops];
      renderStops();
      renderPreview();
    });

    el.samplesWrap.appendChild(card);
  });
}

function applyAngle(value) {
  const next = Math.max(0, Math.min(360, Number(value) || 0));
  state.angle = next;
  if (el.angleRange) el.angleRange.value = String(next);
  if (el.angleInput) el.angleInput.value = String(next);
  renderPreview();
}

function getStopsFromHash() {
  const hash = (window.location.hash || "").replace("#", "");
  if (!hash) return null;
  const params = new URLSearchParams(hash);
  const raw = params.get("g");
  if (!raw) return null;
  const stops = raw.split(",").map((s) => normalizeHex(s)).filter(Boolean);
  if (stops.length >= MIN_STOPS && stops.length <= MAX_STOPS) {
    return stops;
  }
  return null;
}

async function loadSamples() {
  try {
    const res = await fetch("../data/palettes.json", { cache: "no-store" });
    const data = await res.json();
    state.samples = Array.isArray(data) ? data : [];
  } catch (_err) {
    state.samples = [];
  }
  renderSamples();
}

function initEvents() {
  el.angleRange?.addEventListener("input", () => applyAngle(el.angleRange.value));
  el.angleInput?.addEventListener("input", () => applyAngle(el.angleInput.value));
  el.resetAngle?.addEventListener("click", () => applyAngle(90));

  el.addStop?.addEventListener("click", () => {
    if (state.stops.length >= MAX_STOPS) return;
    state.stops.push(randomHex());
    renderStops();
    renderPreview();
  });
  el.randomStop?.addEventListener("click", () => {
    state.stops = Array.from({ length: state.stops.length }, () => randomHex());
    renderStops();
    renderPreview();
  });
  if (el.exportBtn) el.exportBtn.textContent = "Xuất Bản thông số";
  el.exportBtn?.addEventListener("click", async () => {
    const ok = await copyText(exportText());
    showToast(ok ? "Đã sao chép bản thông số." : "Không thể sao chép bản thông số.");
  });
  el.toPalette?.addEventListener("click", () => {
    const stops = state.stops.join(",");
    window.location.href = `palette.html#p=${encodeURIComponent(stops)}`;
  });

  el.saveLibrary?.addEventListener("click", () => {
    const asset = buildGradientAsset();
    const ok = addAssetToLibrary(asset);
    showToast(ok ? "Đã lưu vào Thư viện." : "Không thể lưu tài sản.");
  });
  el.useLibrary?.addEventListener("click", () => {
    const payload = composeHandoff({
      from: HANDOFF_FROM,
      intent: "use",
      projectId: getCurrentProject()
    });
    window.location.href = `./library.html${payload}`;
  });
  el.share?.addEventListener("click", () => {
    publishToFeed(buildGradientAsset());
  });
}

function init() {
  const hashStops = getStopsFromHash();
  if (hashStops) {
    state.stops = hashStops;
  }
  renderStops();
  renderPreview();
  applyAngle(state.angle);
  loadSamples();
  initEvents();
}

init();
