import { composeHandoff, withHandoff } from "./handoff.js";

const FEED_STORAGE_KEY = "tc_community_feed";
const LIBRARY_STORAGE_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const HANDOFF_FROM = "community";

const elements = {
  feed: document.getElementById("communityFeed"),
  empty: document.getElementById("communityEmpty"),
  remix: document.getElementById("communityRemix"),
  showcase: document.getElementById("communityShowcase"),
  highlights: document.getElementById("communityHighlights"),
  toast: document.getElementById("toast"),
  saveLibrary: document.getElementById("communitySaveLibrary"),
  useLibrary: document.getElementById("communityUseLibrary"),
  share: document.getElementById("communityShare")
};

let pendingColors = [];
let currentFeed = [];

const normalizeHex = (hex) => {
  if (!hex) return null;
  let value = String(hex).trim().toUpperCase();
  if (!value.startsWith("#")) value = `#${value}`;
  return /^#[0-9A-F]{6}$/.test(value) ? value : null;
};

const uniqHexes = (list) => {
  const source = Array.isArray(list) ? list : [];
  const normalized = source.map((hex) => normalizeHex(hex)).filter(Boolean);
  return normalized.filter((hex, index) => normalized.indexOf(hex) === index);
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
    }, 1600);
  });
};

const getCurrentProject = () => {
  try {
    return localStorage.getItem(PROJECT_STORAGE_KEY) || "";
  } catch (_err) {
    return "";
  }
};

const getCurrentUser = () => {
  const auth = window.tcAuth || null;
  if (typeof auth?.getUser === "function") return auth.getUser();
  return null;
};

const getActorLabel = () => {
  const user = getCurrentUser();
  if (!user) return "Khách local";
  const display = String(user.displayName || "").trim();
  if (display) return display;
  const email = String(user.email || "").trim();
  if (email) return email;
  return "Người dùng 8Portals";
};

const getActorId = () => {
  const user = getCurrentUser();
  return String(user?.uid || user?.email || "guest_local");
};

const escapeHTML = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

const getStopsFromAsset = (asset) => {
  if (asset?.core?.colors) return asset.core.colors;
  if (asset?.core?.gradientParams?.stops) return asset.core.gradientParams.stops;
  if (asset?.payload?.colors) return asset.payload.colors;
  if (asset?.payload?.gradientParams?.stops) return asset.payload.gradientParams.stops;
  if (asset?.payload?.threads) return asset.payload.threads.map((item) => item.hex).filter(Boolean);
  if (asset?.payload?.cmyk) return asset.payload.cmyk.map((item) => item.hex).filter(Boolean);
  if (asset?.core?.stops) return asset.core.stops;
  return [];
};

const loadFeedRaw = () => {
  try {
    const raw = localStorage.getItem(FEED_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_err) {
    return [];
  }
};

const loadLibraryAssets = () => {
  try {
    const raw = localStorage.getItem(LIBRARY_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_err) {
    return [];
  }
};

const saveFeedRaw = (items) => {
  try {
    localStorage.setItem(FEED_STORAGE_KEY, JSON.stringify(items));
    return true;
  } catch (_err) {
    return false;
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

const normalizePost = (item, options = {}) => {
  if (!item || typeof item !== "object") return null;
  const asset = item.asset && typeof item.asset === "object" ? item.asset : null;
  if (!asset) return null;
  const createdAt = item.createdAt || asset.updatedAt || asset.createdAt || new Date().toISOString();
  const actor = String(item?.author?.name || item?.author || item?.createdBy || "").trim() || "Thành viên cộng đồng";
  const lineage = item.lineage && typeof item.lineage === "object" ? item.lineage : null;
  return {
    id: String(item.id || `post_${Date.now()}`),
    asset,
    createdAt,
    author: {
      id: String(item?.author?.id || item?.authorId || ""),
      name: actor
    },
    lineage: lineage
      ? {
          sourcePostId: String(lineage.sourcePostId || ""),
          sourceAssetId: String(lineage.sourceAssetId || ""),
          remixedBy: String(lineage.remixedBy || ""),
          remixedAt: String(lineage.remixedAt || "")
        }
      : null,
    derived: Boolean(options.derived)
  };
};

const deriveFeedFromLibrary = () => {
  const assets = loadLibraryAssets();
  return assets.slice(0, 10).map((asset, index) => normalizePost({
    id: `seed_${asset.id || Date.now()}_${index}`,
    asset,
    createdAt: asset.updatedAt || asset.createdAt || new Date().toISOString(),
    author: { id: "local_seed", name: "Nguồn local" }
  }, { derived: true })).filter(Boolean);
};

const resolveWorldLink = (asset) => {
  if (!asset) return "../worlds/library.html";
  const stops = uniqHexes(getStopsFromAsset(asset)).map((hex) => hex.replace("#", ""));
  const payload = stops.join(",");
  if (asset.type === "palette") return `../worlds/palette.html#p=${encodeURIComponent(payload)}`;
  if (asset.type === "gradient") return `../worlds/gradient.html#g=${encodeURIComponent(payload)}`;
  if (asset.type === "cmyk_recipe") return `../worlds/printcolor.html#c=${encodeURIComponent(payload)}`;
  if (asset.type === "thread_set") return "../worlds/threadcolor.html";
  if (asset.type === "image_palette") return `../worlds/imagecolor.html#p=${encodeURIComponent(payload)}`;
  if (asset.type === "colorplay_run") return "../worlds/colorplay.html";
  return "../worlds/library.html";
};

const openAssetNow = (asset) => {
  const url = withHandoff(resolveWorldLink(asset), {
    from: HANDOFF_FROM,
    intent: "use",
    projectId: getCurrentProject(),
    assetId: String(asset?.id || "")
  });
  window.location.href = url;
};

const cloneForLibrary = (asset, options = {}) => {
  const now = new Date().toISOString();
  const baseName = String(asset?.name || "Tài sản remix").trim();
  const nextName = options.remix ? `${baseName} · Remix` : `${baseName} · Lưu từ cộng đồng`;
  const sourceTags = Array.isArray(asset?.tags) ? asset.tags : [];
  const nextTags = Array.from(new Set([
    ...sourceTags,
    "community",
    options.remix ? "remix" : "saved"
  ]));
  const lineage = options.lineage && typeof options.lineage === "object" ? options.lineage : null;
  return {
    ...asset,
    id: `asset_${Date.now()}`,
    name: nextName,
    tags: nextTags,
    createdAt: now,
    updatedAt: now,
    sourceWorld: "community",
    project: getCurrentProject(),
    lineage
  };
};

const appendRemixPost = (asset, lineage) => {
  const raw = loadFeedRaw();
  const next = Array.isArray(raw) ? raw : [];
  next.unshift({
    id: `post_${Date.now()}`,
    asset,
    createdAt: new Date().toISOString(),
    author: {
      id: getActorId(),
      name: getActorLabel()
    },
    lineage
  });
  saveFeedRaw(next);
};

const sortByCreatedAtDesc = (items) => [...items].sort((a, b) => {
  const ta = Date.parse(a.createdAt || "") || 0;
  const tb = Date.parse(b.createdAt || "") || 0;
  return tb - ta;
});

const loadCommunityFeed = () => {
  const stored = loadFeedRaw().map((item) => normalizePost(item)).filter(Boolean);
  if (stored.length) return sortByCreatedAtDesc(stored);
  return sortByCreatedAtDesc(deriveFeedFromLibrary());
};

const formatTime = (iso) => {
  const date = new Date(iso || "");
  if (Number.isNaN(date.getTime())) return "Không rõ thời gian";
  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
};

const findPostById = (postId) => currentFeed.find((item) => item.id === postId) || null;

const renderFeed = () => {
  if (!elements.feed || !elements.empty) return;
  if (!currentFeed.length) {
    elements.empty.classList.remove("hidden");
    elements.feed.innerHTML = "";
    return;
  }
  elements.empty.classList.add("hidden");
  elements.feed.innerHTML = currentFeed.map((item) => {
    const asset = item.asset || {};
    const stops = uniqHexes(getStopsFromAsset(asset)).slice(0, 6);
    const swatches = stops.map((hex) => `<span class="tc-swatch" style="background:${hex};"></span>`).join("");
    const tags = (asset.tags || []).slice(0, 4).map((tag) =>
      `<span class="tc-chip px-2 py-1 rounded-full text-xs">${escapeHTML(tag)}</span>`
    ).join("");
    const lineageText = item.lineage?.sourceAssetId
      ? `Gốc: ${escapeHTML(item.lineage.sourceAssetId)} · Remix bởi ${escapeHTML(item.lineage.remixedBy || item.author?.name || "N/A")}`
      : "Asset gốc từ hệ 8Portals";
    return `
      <article class="tc-community-item">
        <div class="flex items-start justify-between gap-2">
          <div>
            <p class="text-[11px] uppercase tracking-[0.2em] tc-muted">${escapeHTML(asset.type || "asset")}</p>
            <h3 class="font-semibold">${escapeHTML(asset.name || "Tài sản cộng đồng")}</h3>
            <p class="tc-muted text-xs mt-1">${escapeHTML(item.author?.name || "Cộng đồng")} · ${formatTime(item.createdAt)}</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">${swatches}</div>
        <p class="tc-muted text-xs">${lineageText}</p>
        <div class="flex flex-wrap gap-2">${tags}</div>
        <div class="tc-community-actions">
          <button class="tc-btn tc-chip px-3 py-2 text-xs" type="button" data-action="save" data-id="${escapeHTML(item.id)}">Lưu</button>
          <button class="tc-btn tc-chip px-3 py-2 text-xs" type="button" data-action="remix" data-id="${escapeHTML(item.id)}">Remix</button>
          <button class="tc-btn tc-btn-primary px-3 py-2 text-xs" type="button" data-action="use" data-id="${escapeHTML(item.id)}">Dùng ngay</button>
        </div>
      </article>
    `;
  }).join("");
};

const renderRemix = () => {
  if (!elements.remix) return;
  const remixItems = currentFeed.filter((item) => item.lineage?.sourceAssetId).slice(0, 6);
  if (!remixItems.length) {
    elements.remix.innerHTML = `<div class="tc-community-mini-item"><p class="tc-muted text-xs">Chưa có remix mới. Hãy remix một asset trong feed để tạo lineage.</p></div>`;
    return;
  }
  elements.remix.innerHTML = remixItems.map((item) => `
    <div class="tc-community-mini-item">
      <p class="text-xs font-semibold">${escapeHTML(item.asset?.name || "Asset remix")}</p>
      <p class="tc-muted text-xs">Từ ${escapeHTML(item.lineage?.sourceAssetId || "N/A")} · bởi ${escapeHTML(item.lineage?.remixedBy || item.author?.name || "N/A")}</p>
      <p class="tc-muted text-[11px]">${formatTime(item.createdAt)}</p>
    </div>
  `).join("");
};

const renderShowcase = () => {
  if (!elements.showcase) return;
  const ranked = sortByCreatedAtDesc(currentFeed).slice(0, 6);
  if (!ranked.length) {
    elements.showcase.innerHTML = `<div class="tc-community-mini-item"><p class="tc-muted text-xs">Chưa có tài sản để showcase.</p></div>`;
    return;
  }
  elements.showcase.innerHTML = ranked.map((item) => {
    const stops = uniqHexes(getStopsFromAsset(item.asset || {})).slice(0, 3);
    const swatchRow = stops.map((hex) => `<span class="tc-swatch" style="width:20px;height:20px;background:${hex};"></span>`).join("");
    return `
      <div class="tc-community-mini-item">
        <p class="text-xs font-semibold">${escapeHTML(item.asset?.name || "Tài sản cộng đồng")}</p>
        <div class="flex items-center gap-1">${swatchRow}</div>
        <p class="tc-muted text-[11px]">Dùng khi cần triển khai nhanh trong ${escapeHTML(item.asset?.type || "workflow")}.</p>
      </div>
    `;
  }).join("");
};

const renderHighlights = () => {
  if (!elements.highlights) return;
  if (!currentFeed.length) {
    elements.highlights.innerHTML = `<div class="tc-community-mini-item"><p class="tc-muted text-xs">Chưa đủ dữ liệu để xếp hạng nổi bật.</p></div>`;
    return;
  }
  const userMap = new Map();
  const assetMap = new Map();
  currentFeed.forEach((item) => {
    const actor = item.author?.name || "Cộng đồng";
    userMap.set(actor, (userMap.get(actor) || 0) + 1);
    const type = item.asset?.type || "asset";
    assetMap.set(type, (assetMap.get(type) || 0) + 1);
  });
  const topUsers = Array.from(userMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const topAssets = Array.from(assetMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const userText = topUsers.map(([name, total]) => `${name} (${total})`).join(" · ");
  const assetText = topAssets.map(([type, total]) => `${type} (${total})`).join(" · ");
  elements.highlights.innerHTML = `
    <div class="tc-community-mini-item">
      <p class="text-xs font-semibold">Người dùng nổi bật</p>
      <p class="tc-muted text-xs">${escapeHTML(userText || "Chưa có")}</p>
    </div>
    <div class="tc-community-mini-item">
      <p class="text-xs font-semibold">Asset nổi bật</p>
      <p class="tc-muted text-xs">${escapeHTML(assetText || "Chưa có")}</p>
    </div>
  `;
};

const refreshView = () => {
  currentFeed = loadCommunityFeed();
  renderFeed();
  renderRemix();
  renderShowcase();
  renderHighlights();
  if (window.location.hash === "#feed") {
    const target = document.getElementById("feed");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const handleSave = (postId) => {
  const post = findPostById(postId);
  if (!post?.asset) return;
  const asset = cloneForLibrary(post.asset, { remix: false });
  const ok = saveToLibrary(asset);
  showToast(ok ? "Đã lưu asset vào Thư viện." : "Không thể lưu asset.");
};

const handleUse = (postId) => {
  const post = findPostById(postId);
  if (!post?.asset) return;
  openAssetNow(post.asset);
};

const handleRemix = (postId) => {
  const post = findPostById(postId);
  if (!post?.asset) return;
  const now = new Date().toISOString();
  const lineage = {
    sourcePostId: post.id,
    sourceAssetId: String(post.asset.id || ""),
    remixedBy: getActorLabel(),
    remixedAt: now
  };
  const remixAsset = cloneForLibrary(post.asset, { remix: true, lineage });
  const ok = saveToLibrary(remixAsset);
  if (!ok) {
    showToast("Không thể lưu remix vào Thư viện.");
    return;
  }
  appendRemixPost(remixAsset, lineage);
  showToast("Đã remix và lưu vào Thư viện.");
  refreshView();
  openAssetNow(remixAsset);
};

const bindEvents = () => {
  elements.feed?.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action][data-id]");
    if (!target) return;
    const action = target.dataset.action || "";
    const postId = target.dataset.id || "";
    if (!postId) return;
    if (action === "save") handleSave(postId);
    if (action === "remix") handleRemix(postId);
    if (action === "use") handleUse(postId);
  });

  elements.saveLibrary?.addEventListener("click", () => {
    window.location.href = "../worlds/library.html";
  });

  elements.useLibrary?.addEventListener("click", () => {
    const payload = composeHandoff({
      from: HANDOFF_FROM,
      intent: "use",
      projectId: getCurrentProject()
    });
    window.location.href = `../worlds/library.html${payload}`;
  });

  elements.share?.addEventListener("click", () => {
    const payload = composeHandoff({
      from: HANDOFF_FROM,
      intent: "share",
      projectId: getCurrentProject()
    });
    window.location.href = `../worlds/library.html${payload}`;
  });
};

const applyHexesFromHub = (detail) => {
  const rawList = Array.isArray(detail?.hexes) ? detail.hexes : [];
  const mode = detail?.mode === "append" ? "append" : "replace";
  const normalized = uniqHexes(rawList);
  if (!normalized.length) return;
  if (mode === "append") {
    pendingColors = uniqHexes([...pendingColors, ...normalized]);
  } else {
    pendingColors = normalized;
  }
  showToast(`Đã đính kèm ${pendingColors.length} màu cho phiên cộng đồng.`);
};

refreshView();
bindEvents();

window.addEventListener("tc:hex-apply", (event) => {
  applyHexesFromHub(event?.detail);
});
