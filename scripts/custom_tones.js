const CUSTOM_TONE_KEY = "tc_custom_tones_v1";
const PREVIEW_VARS = ["--a1", "--a2", "--a3", "--a1-rgb", "--a2-rgb", "--a3-rgb"];

const elements = {
  hub: document.getElementById("customTonesHub"),
  list: document.getElementById("customTonesList"),
  empty: document.getElementById("customTonesEmpty"),
  reset: document.getElementById("customTonesReset"),
  badge: document.getElementById("customTonesPreviewBadge"),
  assetTabBtn: document.getElementById("assetTabBtn")
};

let previewActive = false;
let previewSnapshot = null;

const normalizeHex = (value) => {
  if (!value) return "";
  const raw = value.toString().trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(raw)) return "";
  return `#${raw.toUpperCase()}`;
};

const hexToRgb = (hex) => {
  const clean = normalizeHex(hex);
  if (!clean) return null;
  const r = parseInt(clean.slice(1, 3), 16);
  const g = parseInt(clean.slice(3, 5), 16);
  const b = parseInt(clean.slice(5, 7), 16);
  return { r, g, b };
};

const hexToRgbString = (hex) => {
  const rgb = hexToRgb(hex);
  return rgb ? `${rgb.r} ${rgb.g} ${rgb.b}` : "";
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

const showToast = (message) => {
  const toast = document.getElementById("assetToast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
};

const loadCustomTones = () => {
  try {
    if (typeof localStorage === "undefined") return [];
    const raw = localStorage.getItem(CUSTOM_TONE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_err) {
    showToast("Không thể đọc Sắc thái tuỳ chỉnh.");
    return [];
  }
};

const saveCustomTones = (list) => {
  try {
    if (typeof localStorage === "undefined") return false;
    localStorage.setItem(CUSTOM_TONE_KEY, JSON.stringify(list));
    return true;
  } catch (_err) {
    showToast("Không thể lưu Sắc thái tuỳ chỉnh.");
    return false;
  }
};

const upsertCustomTone = (tone) => {
  const list = loadCustomTones();
  const index = list.findIndex((item) => item.id === tone.id);
  if (index >= 0) list[index] = tone;
  else list.unshift(tone);
  return saveCustomTones(list);
};

const deleteCustomTone = (id) => {
  const list = loadCustomTones().filter((item) => item.id !== id);
  return saveCustomTones(list);
};

const buildTokenCss = (tone) => {
  if (!tone?.colors) return "";
  const a1 = normalizeHex(tone.colors.a1);
  const a2 = normalizeHex(tone.colors.a2) || a1;
  const a3 = normalizeHex(tone.colors.a3) || a2 || a1;
  const a1rgb = tone.colors.a1rgb || hexToRgbString(a1);
  const a2rgb = tone.colors.a2rgb || hexToRgbString(a2);
  const a3rgb = tone.colors.a3rgb || hexToRgbString(a3);
  if (!a1) return "";
  return [
    ":root{",
    `  --a1: ${a1};`,
    `  --a2: ${a2};`,
    `  --a3: ${a3};`,
    `  --a1-rgb: ${a1rgb};`,
    `  --a2-rgb: ${a2rgb};`,
    `  --a3-rgb: ${a3rgb};`,
    "}"
  ].join("\n");
};

const buildToneVars = (tone) => {
  if (!tone?.colors) return null;
  const a1 = normalizeHex(tone.colors.a1);
  const a2 = normalizeHex(tone.colors.a2) || a1;
  const a3 = normalizeHex(tone.colors.a3) || a2 || a1;
  if (!a1) return null;
  return {
    "--a1": a1,
    "--a2": a2,
    "--a3": a3,
    "--a1-rgb": tone.colors.a1rgb || hexToRgbString(a1),
    "--a2-rgb": tone.colors.a2rgb || hexToRgbString(a2),
    "--a3-rgb": tone.colors.a3rgb || hexToRgbString(a3)
  };
};

const snapshotThemeVars = (vars) => {
  const root = document.documentElement;
  const computed = getComputedStyle(root);
  return vars.reduce((acc, name) => {
    acc[name] = {
      inline: root.style.getPropertyValue(name),
      computed: computed.getPropertyValue(name).trim()
    };
    return acc;
  }, {});
};

const applyThemeVars = (map) => {
  if (!map) return;
  const root = document.documentElement;
  Object.entries(map).forEach(([name, value]) => {
    if (!value) return;
    root.style.setProperty(name, value);
  });
};

const restoreThemeVars = (snapshot, vars) => {
  const root = document.documentElement;
  vars.forEach((name) => {
    const entry = snapshot?.[name];
    if (entry && entry.inline) {
      root.style.setProperty(name, entry.inline.trim());
    } else {
      root.style.removeProperty(name);
    }
  });
};

const setPreviewUi = (active) => {
  if (active) {
    elements.badge?.classList.remove("hidden");
    elements.reset?.classList.remove("hidden");
  } else {
    elements.badge?.classList.add("hidden");
    elements.reset?.classList.add("hidden");
  }
};

const resetPreview = () => {
  if (!previewActive) return;
  restoreThemeVars(previewSnapshot, PREVIEW_VARS);
  previewSnapshot = null;
  previewActive = false;
  setPreviewUi(false);
};

const previewTone = (tone) => {
  const vars = buildToneVars(tone);
  if (!vars) return;
  if (!previewActive) previewSnapshot = snapshotThemeVars(PREVIEW_VARS);
  applyThemeVars(vars);
  previewActive = true;
  setPreviewUi(true);
};

const applyTone = (tone) => {
  const vars = buildToneVars(tone);
  if (!vars) return;
  applyThemeVars(vars);
  previewActive = false;
  previewSnapshot = null;
  setPreviewUi(false);
};

const renderCustomTones = () => {
  if (!elements.list || !elements.empty) return;
  const list = loadCustomTones();
  elements.list.innerHTML = "";
  elements.empty.classList.toggle("hidden", list.length > 0);
  list.forEach((tone) => {
    const card = document.createElement("div");
    card.className = "tc-custom-tone-card";
    card.dataset.toneId = tone.id;

    const head = document.createElement("div");
    head.className = "tc-custom-tone-head";

    const name = document.createElement("div");
    name.className = "tc-custom-tone-name";
    name.textContent = tone.name || "Sắc thái tuỳ chỉnh";

    const rename = document.createElement("button");
    rename.className = "tc-btn tc-chip px-3 py-2 text-xs";
    rename.type = "button";
    rename.textContent = "Đổi tên";
    rename.dataset.action = "rename";

    head.append(name, rename);

    const swatches = document.createElement("div");
    swatches.className = "tc-custom-tone-swatches";
    [tone.colors?.a1, tone.colors?.a2, tone.colors?.a3].forEach((hex) => {
      const sw = document.createElement("span");
      sw.className = "tc-custom-tone-swatch";
      sw.style.background = normalizeHex(hex) || "transparent";
      swatches.appendChild(sw);
    });

    const actions = document.createElement("div");
    actions.className = "tc-custom-tone-actions";

    const btnPreview = document.createElement("button");
    btnPreview.className = "tc-btn tc-chip px-3 py-2 text-xs";
    btnPreview.type = "button";
    btnPreview.textContent = "Xem trước";
    btnPreview.dataset.action = "preview";

    const btnApply = document.createElement("button");
    btnApply.className = "tc-btn tc-chip px-3 py-2 text-xs";
    btnApply.type = "button";
    btnApply.textContent = "Áp dụng";
    btnApply.dataset.action = "apply";

    const btnCopy = document.createElement("button");
    btnCopy.className = "tc-btn tc-chip px-3 py-2 text-xs";
    btnCopy.type = "button";
    btnCopy.textContent = "Sao chép token";
    btnCopy.dataset.action = "copy";

    const btnDelete = document.createElement("button");
    btnDelete.className = "tc-btn tc-chip px-3 py-2 text-xs";
    btnDelete.type = "button";
    btnDelete.textContent = "Xóa";
    btnDelete.dataset.action = "delete";

    actions.append(btnPreview, btnApply, btnCopy, btnDelete);

    card.append(head, swatches, actions);
    elements.list.appendChild(card);
  });
};

const handleListClick = (event) => {
  const actionBtn = event.target.closest("[data-action]");
  if (!actionBtn || !elements.list) return;
  const card = actionBtn.closest("[data-tone-id]");
  if (!card) return;
  const toneId = card.dataset.toneId;
  const list = loadCustomTones();
  const tone = list.find((item) => item.id === toneId);
  if (!tone) return;

  const action = actionBtn.dataset.action;
  if (action === "preview") {
    previewTone(tone);
    return;
  }
  if (action === "apply") {
    applyTone(tone);
    showToast("Đã áp dụng sắc thái.");
    return;
  }
  if (action === "copy") {
    const css = buildTokenCss(tone);
    if (!css) return;
    copyToClipboard(css).then(() => showToast("Đã sao chép token."));
    return;
  }
  if (action === "rename") {
    const next = prompt("Đổi tên sắc thái", tone.name || "");
    if (!next) return;
    tone.name = next.trim();
    if (!tone.name) return;
    if (saveCustomTones(list)) {
      renderCustomTones();
      showToast("Đã đổi tên.");
    }
    return;
  }
  if (action === "delete") {
    const ok = confirm("Xóa sắc thái tuỳ chỉnh này?");
    if (!ok) return;
    if (deleteCustomTone(toneId)) {
      renderCustomTones();
      showToast("Đã xóa.");
    }
  }
};

const handleHashRouting = () => {
  const raw = (window.location.hash || "").replace(/^#/, "");
  const params = new URLSearchParams(raw);
  const tab = params.get("tab");
  const isCustom = raw === "custom-tones" || tab === "custom-tones";
  if (!isCustom || !elements.hub) return;
  if (elements.assetTabBtn && elements.assetTabBtn.getAttribute("aria-selected") !== "true") {
    elements.assetTabBtn.click();
  }
  elements.hub.scrollIntoView({ behavior: "smooth", block: "start" });
};

const initCustomTones = () => {
  if (!elements.list || !elements.hub) return;
  renderCustomTones();
  elements.list.addEventListener("click", handleListClick);
  elements.reset?.addEventListener("click", resetPreview);
  document.addEventListener("tc-world-changed", resetPreview);
  if (typeof MutationObserver !== "undefined") {
    const observer = new MutationObserver((mutations) => {
      if (!previewActive) return;
      const changed = mutations.some((m) => m.type === "attributes" && m.attributeName === "data-world");
      if (changed) resetPreview();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-world"] });
  }
  handleHashRouting();
};

window.addEventListener("hashchange", handleHashRouting);
window.addEventListener("DOMContentLoaded", initCustomTones);
