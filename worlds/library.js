const STORAGE_KEY = "tc_asset_library_v1";

const elements = {
  search: document.getElementById("assetSearch"),
  filter: document.getElementById("assetFilter"),
  grid: document.getElementById("assetGrid"),
  createDemo: document.getElementById("assetCreateDemo"),
  panel: document.getElementById("assetPanel"),
  panelEmpty: document.getElementById("assetPanelEmpty"),
  panelName: document.getElementById("assetPanelName"),
  panelType: document.getElementById("assetPanelType"),
  panelTags: document.getElementById("assetPanelTags"),
  panelSwatches: document.getElementById("assetPanelSwatches"),
  panelNotes: document.getElementById("assetPanelNotes"),
  apply: document.getElementById("assetApply"),
  specText: document.getElementById("assetSpecText"),
  specJson: document.getElementById("assetSpecJson"),
  copyText: document.getElementById("assetCopyText"),
  copyJson: document.getElementById("assetCopyJson")
};

const state = {
  assets: [],
  selected: null
};

const normalizeText = (value) => (value || "").toLowerCase();

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
    sourceWorld: "library"
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

const filterAssets = () => {
  const query = normalizeText(elements.search?.value);
  const typeFilter = elements.filter?.value || "all";
  return state.assets.filter((asset) => {
    const matchType = typeFilter === "all"
      || (typeFilter === "other" && !["palette", "gradient"].includes(asset.type))
      || asset.type === typeFilter;
    if (!matchType) return false;
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
  if (elements.apply) {
    const canApply = asset.type === "palette" || asset.type === "gradient";
    elements.apply.disabled = !canApply;
    elements.apply.textContent = canApply ? "Áp dụng" : "Chưa hỗ trợ";
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
    materialLine,
    `stops: ${getStopsFromAsset(asset).join(", ")}`,
    `version: ${asset.version}`
  ].filter(Boolean).join("\n");
  if (elements.specText) elements.specText.textContent = specText;
  if (elements.specJson) elements.specJson.textContent = JSON.stringify(asset, null, 2);
};

const applyAsset = (asset) => {
  if (!asset) return;
  const stops = getStopsFromAsset(asset);
  if (!stops.length) return;
  if (asset.type === "palette") {
    const payload = stops.map((hex) => hex.replace("#", "")).join(",");
    window.location.href = `./palette.html#p=${encodeURIComponent(payload)}`;
    return;
  }
  if (asset.type === "gradient") {
    const payload = stops.map((hex) => hex.replace("#", "")).join(",");
    window.location.href = `./gradient.html#g=${encodeURIComponent(payload)}`;
    return;
  }
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

const bindEvents = () => {
  elements.search?.addEventListener("input", renderGrid);
  elements.filter?.addEventListener("change", renderGrid);
  elements.createDemo?.addEventListener("click", () => {
    const asset = createDemoAsset();
    state.assets.unshift(asset);
    saveAssets();
    renderGrid();
  });
  elements.grid?.addEventListener("click", (event) => {
    const card = event.target.closest("[data-asset-id]");
    if (!card) return;
    const asset = state.assets.find((item) => item.id === card.dataset.assetId);
    state.selected = asset || null;
    renderPanel(state.selected);
  });
  elements.apply?.addEventListener("click", () => applyAsset(state.selected));
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
renderGrid();
renderPanel(state.selected);
bindEvents();
