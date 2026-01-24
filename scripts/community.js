import { composeHandoff } from "./handoff.js";

const FEED_STORAGE_KEY = "tc_community_feed";
const LIBRARY_STORAGE_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const HANDOFF_FROM = "community";

const elements = {
  feed: document.getElementById("communityFeed"),
  empty: document.getElementById("communityEmpty"),
  toast: document.getElementById("toast"),
  saveLibrary: document.getElementById("communitySaveLibrary"),
  useLibrary: document.getElementById("communityUseLibrary"),
  share: document.getElementById("communityShare")
};

let pendingColors = [];

const normalizeHex = (hex) => {
  if (!hex) return null;
  let value = String(hex).trim().toUpperCase();
  if (!value.startsWith("#")) value = `#${value}`;
  return /^#[0-9A-F]{6}$/.test(value) ? value : null;
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

const isLoggedIn = () => {
  const auth = window.tcAuth || null;
  if (typeof auth?.isLoggedIn === "function") return auth.isLoggedIn();
  return false;
};

const getCurrentProject = () => {
  try {
    return localStorage.getItem(PROJECT_STORAGE_KEY) || "";
  } catch (_err) {
    return "";
  }
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

const loadFeed = () => {
  try {
    const raw = localStorage.getItem(FEED_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_err) {
    return [];
  }
};

const saveToLibrary = (asset) => {
  try {
    const raw = localStorage.getItem(LIBRARY_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const next = Array.isArray(list) ? list : [];
    next.unshift(asset);
    localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(next));
    return true;
  } catch (_err) {
    return false;
  }
};

const resolveWorldLink = (asset) => {
  if (!asset) return "./library.html";
  if (asset.type === "palette") {
    const payload = getStopsFromAsset(asset).map((hex) => hex.replace("#", "")).join(",");
    return `./palette.html#p=${encodeURIComponent(payload)}`;
  }
  if (asset.type === "gradient") {
    const payload = getStopsFromAsset(asset).map((hex) => hex.replace("#", "")).join(",");
    return `./gradient.html#g=${encodeURIComponent(payload)}`;
  }
  if (asset.type === "cmyk_recipe") {
    const payload = getStopsFromAsset(asset).map((hex) => hex.replace("#", "")).join(",");
    return `./printcolor.html#p=${encodeURIComponent(payload)}`;
  }
  if (asset.type === "thread_set") {
    return "./threadcolor.html";
  }
  return "./library.html";
};

const handleRemix = (postId) => {
  const feed = loadFeed();
  const post = feed.find((item) => item.id === postId);
  if (!post?.asset) return;
  if (!isLoggedIn()) {
    alert("Cần đăng nhập để remix.");
    return;
  }
  const now = new Date().toISOString();
  const remixAsset = {
    ...post.asset,
    id: `asset_${Date.now()}`,
    createdAt: now,
    updatedAt: now,
    sourceWorld: "community",
    project: getCurrentProject()
  };
  const ok = saveToLibrary(remixAsset);
  if (!ok) {
    showToast("Không thể lưu remix.");
    return;
  }
  showToast("Đã lưu remix vào Thư viện.");
  window.location.href = resolveWorldLink(remixAsset);
};

const renderFeed = () => {
  if (!elements.feed || !elements.empty) return;
  const items = loadFeed().sort((a, b) => {
    const ta = Date.parse(a.createdAt || "") || 0;
    const tb = Date.parse(b.createdAt || "") || 0;
    return tb - ta;
  });
  if (!items.length) {
    elements.empty.classList.remove("hidden");
    elements.feed.innerHTML = "";
    return;
  }
  elements.empty.classList.add("hidden");
  elements.feed.innerHTML = items.map((item) => {
    const asset = item.asset || {};
    const stops = getStopsFromAsset(asset);
    const swatches = stops.slice(0, 6).map((hex) =>
      `<span class="tc-swatch" style="background:${hex};"></span>`
    ).join("");
    const tags = (asset.tags || []).slice(0, 3).map((tag) =>
      `<span class="tc-chip px-2 py-1 rounded-full text-xs">${tag}</span>`
    ).join("");
    const time = item.createdAt ? new Date(item.createdAt).toLocaleString() : "";
    return `
      <div class="tc-card p-4 space-y-3">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs uppercase tracking-[0.2em] tc-muted">${asset.type || "asset"}</p>
            <h3 class="font-semibold">${asset.name || "Tài sản chia sẻ"}</h3>
            <p class="tc-muted text-xs">${time}</p>
          </div>
          <button class="tc-btn tc-chip px-3 py-2 text-xs" data-action="remix" data-id="${item.id}">Remix</button>
        </div>
        <div class="flex flex-wrap gap-2">${swatches}</div>
        <div class="flex flex-wrap gap-2">${tags}</div>
      </div>
    `;
  }).join("");
};

const bindEvents = () => {
  elements.feed?.addEventListener("click", (event) => {
    const remixBtn = event.target.closest("[data-action='remix']");
    if (!remixBtn) return;
    handleRemix(remixBtn.dataset.id);
  });
  elements.saveLibrary?.addEventListener("click", () => {
    showToast("Hãy dùng nút Remix để lưu vào Thư viện.");
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
    const payload = composeHandoff({
      from: HANDOFF_FROM,
      intent: "share",
      projectId: getCurrentProject()
    });
    window.location.href = `./library.html${payload}`;
  });
};

const applyHexesFromHub = (detail) => {
  const rawList = Array.isArray(detail?.hexes) ? detail.hexes : [];
  const mode = detail?.mode === "append" ? "append" : "replace";
  const normalized = rawList.map((hex) => normalizeHex(hex)).filter(Boolean);
  if (!normalized.length) return;
  if (mode === "append") {
    const combined = [...pendingColors, ...normalized];
    pendingColors = combined.filter((hex, idx) => combined.indexOf(hex) === idx);
  } else {
    pendingColors = normalized;
  }
  showToast(`Đã đính kèm ${pendingColors.length} màu.`);
};

renderFeed();
bindEvents();

window.addEventListener("tc:hex-apply", (event) => {
  applyHexesFromHub(event?.detail);
});
