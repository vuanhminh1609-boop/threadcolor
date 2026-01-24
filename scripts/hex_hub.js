const STYLE_ID = "tc-hexhub-style";
const FAB_ID = "tc-hexhub-fab";
const OVERLAY_ID = "tc-hexhub-overlay";
const SHEET_ID = "tc-hexhub-sheet";
const CACHE_KEY = "tc_hex_hub_cache";
const VERSION_KEY = "tc_hex_hub_version";
const CACHE_VERSION = "1";
const DATA_URL = new URL("../data/hex_library.generated.json", import.meta.url);

let memoryCache = null;
let memoryLoaded = false;

const normalizeHex = (value) => {
  if (!value) return "";
  const raw = String(value).trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(raw)) return "";
  return `#${raw.toUpperCase()}`;
};

const loadHexes = async () => {
  if (memoryLoaded && memoryCache) return memoryCache;
  memoryLoaded = true;
  try {
    const cachedVersion = localStorage.getItem(VERSION_KEY);
    const cached = localStorage.getItem(CACHE_KEY);
    if (cachedVersion === CACHE_VERSION && cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length) {
        memoryCache = parsed;
        return memoryCache;
      }
    }
  } catch (_err) {}

  try {
    const response = await fetch(DATA_URL.toString(), { cache: "no-store" });
    const data = await response.json();
    const list = Array.isArray(data) ? data : [];
    const hexes = list
      .map((item) => {
        if (typeof item === "string") return normalizeHex(item);
        if (item && typeof item.hex === "string") return normalizeHex(item.hex);
        return "";
      })
      .filter(Boolean);
    memoryCache = Array.from(new Set(hexes));
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(memoryCache));
      localStorage.setItem(VERSION_KEY, CACHE_VERSION);
    } catch (_err) {}
    return memoryCache;
  } catch (_err) {
    memoryCache = [];
    return memoryCache;
  }
};

const ensureStyle = () => {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    [hidden]{display:none!important;}
    .tc-hexhub-fab{position:fixed;right:18px;bottom:18px;z-index:3200;background:linear-gradient(135deg,#1f2937,#111827);color:#fff;border:none;border-radius:999px;padding:12px 16px;font-size:14px;font-weight:600;box-shadow:0 12px 28px rgba(0,0,0,.25);display:flex;align-items:center;gap:8px;}
    .tc-hexhub-fab:focus-visible{outline:none;box-shadow:0 0 0 3px rgba(0,0,0,.2),0 0 0 6px #f59e0b;}
    .tc-hexhub-overlay{position:fixed;inset:0;background:rgba(10,10,12,.55);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;z-index:3300;}
    .tc-hexhub-sheet{background:#111827;color:#f9fafb;border-radius:18px;padding:18px;width:min(920px,92vw);max-height:88vh;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,.35);display:flex;flex-direction:column;gap:12px;}
    .tc-hexhub-header{display:flex;align-items:center;justify-content:space-between;gap:12px;}
    .tc-hexhub-title{font-weight:700;font-size:16px;}
    .tc-hexhub-input{flex:1;background:#0f172a;border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:10px 12px;color:#fff;}
    .tc-hexhub-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:10px;overflow:auto;padding-right:4px;}
    .tc-hexhub-card{border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:8px;background:rgba(15,23,42,.6);display:flex;flex-direction:column;gap:8px;cursor:pointer;}
    .tc-hexhub-swatch{height:54px;border-radius:10px;border:1px solid rgba(255,255,255,.12);}
    .tc-hexhub-card.is-selected{outline:2px solid #f59e0b;}
    .tc-hexhub-footer{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;}
    .tc-hexhub-actions{display:flex;gap:8px;flex-wrap:wrap;}
    .tc-hexhub-btn{border-radius:10px;border:1px solid rgba(255,255,255,.12);padding:8px 12px;background:rgba(15,23,42,.8);color:#fff;font-size:13px;font-weight:600;}
    .tc-hexhub-btn.primary{background:linear-gradient(135deg,#f59e0b,#f97316);border-color:transparent;color:#111827;}
    .tc-hexhub-status{font-size:12px;color:rgba(255,255,255,.7);}
    @media (max-width: 640px){
      .tc-hexhub-overlay{align-items:flex-end;}
      .tc-hexhub-sheet{width:100%;border-radius:18px 18px 0 0;max-height:84vh;}
    }
  `;
  document.head.appendChild(style);
};

const setupAutofillTrap = (input) => {
  if (!input) return;
  input.setAttribute("readonly", "readonly");
  input.dataset.userTouched = "0";
  const clearIfAutofill = () => {
    if (input.dataset.userTouched === "1") return;
    const value = String(input.value || "");
    if (value.includes("@") && value.includes(".")) {
      input.value = "";
    }
  };
  const unlock = () => {
    input.removeAttribute("readonly");
    input.dataset.userTouched = "1";
  };
  input.addEventListener("focus", unlock, { once: true });
  input.addEventListener("pointerdown", unlock, { once: true });
  input.addEventListener("keydown", () => {
    input.dataset.userTouched = "1";
  });
  input.addEventListener("input", () => {
    input.dataset.userTouched = "1";
  });
  window.setTimeout(clearIfAutofill, 500);
};

const createUI = () => {
  if (document.getElementById(OVERLAY_ID)) return null;
  if (document.getElementById(FAB_ID)) return null;
  ensureStyle();
  const fab = document.createElement("button");
  fab.id = FAB_ID;
  fab.className = "tc-hexhub-fab";
  fab.type = "button";
  fab.textContent = "Kho HEX";
  fab.setAttribute("aria-haspopup", "dialog");

  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.className = "tc-hexhub-overlay";
  overlay.setAttribute("hidden", "");
  overlay.setAttribute("aria-hidden", "true");

  const sheet = document.createElement("div");
  sheet.id = SHEET_ID;
  sheet.className = "tc-hexhub-sheet";
  sheet.innerHTML = `
    <div class="tc-hexhub-header">
      <div class="tc-hexhub-title">Kho HEX</div>
      <button class="tc-hexhub-btn" type="button" data-action="close">✕</button>
    </div>
    <input class="tc-hexhub-input" type="search" inputmode="search" name="hex_hub_search" autocomplete="off" spellcheck="false" placeholder="Tìm HEX...">
    <div class="tc-hexhub-grid"></div>
    <div class="tc-hexhub-footer">
      <div class="tc-hexhub-status">Chọn màu để áp dụng.</div>
      <div class="tc-hexhub-actions">
        <button class="tc-hexhub-btn" type="button" data-action="open-full">Mở toàn trang</button>
        <button class="tc-hexhub-btn" type="button" data-action="copy">Sao chép</button>
        <button class="tc-hexhub-btn" type="button" data-action="clear">Xóa chọn</button>
        <button class="tc-hexhub-btn primary" type="button" data-action="apply">Áp dụng</button>
      </div>
    </div>
  `;
  overlay.appendChild(sheet);
  document.body.appendChild(fab);
  document.body.appendChild(overlay);

  const input = sheet.querySelector(".tc-hexhub-input");
  setupAutofillTrap(input);

  return { fab, overlay, sheet, input };
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

const initHexHub = async () => {
  if (window.__tcHexHubMounted) return;
  if (document.getElementById(OVERLAY_ID)) return;
  window.__tcHexHubMounted = true;
  const ui = createUI();
  if (!ui) return;
  const { fab, overlay, sheet, input } = ui;
  const grid = sheet.querySelector(".tc-hexhub-grid");
  const status = sheet.querySelector(".tc-hexhub-status");
  const selected = new Set();
  let list = [];
  let filtered = [];

  const updateStatus = (message) => {
    if (status) status.textContent = message;
  };

  const renderGrid = () => {
    if (!grid) return;
    const maxItems = 240;
    const slice = filtered.slice(0, maxItems);
    if (!slice.length) {
      grid.innerHTML = `<div class="tc-hexhub-status">Không tìm thấy màu phù hợp.</div>`;
      return;
    }
    grid.innerHTML = slice
      .map((hex) => {
        const isSelected = selected.has(hex) ? "is-selected" : "";
        return `
        <button class="tc-hexhub-card ${isSelected}" type="button" data-hex="${hex}">
          <span class="tc-hexhub-swatch" style="background:${hex}"></span>
          <div class="text-xs font-semibold">${hex}</div>
        </button>
      `;
      })
      .join("");
    updateStatus(`Hiển thị ${slice.length}/${filtered.length} màu · Đã chọn ${selected.size}.`);
  };

  const applyFilter = () => {
    const query = (input?.value || "").trim().toUpperCase();
    if (!query) {
      filtered = list;
    } else {
      filtered = list.filter((hex) => hex.includes(query));
    }
    renderGrid();
  };

  const openHexHub = () => {
    overlay.removeAttribute("hidden");
    overlay.setAttribute("aria-hidden", "false");
    applyFilter();
    input?.focus();
  };

  const closeHexHub = () => {
    overlay.setAttribute("hidden", "");
    overlay.setAttribute("aria-hidden", "true");
  };

  const handleSelect = (hex) => {
    if (selected.has(hex)) {
      selected.delete(hex);
    } else {
      selected.add(hex);
    }
    renderGrid();
  };

  const getLibraryUrl = () => {
    const path = window.location?.pathname || "";
    if (path.includes("/worlds/")) return "./library.html";
    return "./worlds/library.html";
  };

  const dispatchApply = () => {
    if (!selected.size) {
      updateStatus("Chưa chọn màu để áp dụng.");
      return;
    }
    const hexes = Array.from(selected);
    window.dispatchEvent(new CustomEvent("tc:hex-apply", { detail: { hexes, mode: "replace" } }));
    updateStatus(`Đã áp dụng ${hexes.length} màu.`);
    closeHexHub();
  };

  fab.addEventListener("click", openHexHub);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeHexHub();
  });
  sheet.querySelector("[data-action='close']")?.addEventListener("click", closeHexHub);
  sheet.addEventListener("click", (event) => event.stopPropagation());

  sheet.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]")?.getAttribute("data-action");
    if (action === "open-full") {
      const first = Array.from(selected)[0];
      const base = getLibraryUrl();
      const hexParam = first ? `&hex=${encodeURIComponent(first)}` : "";
      window.location.href = `${base}#tab=hex${hexParam}`;
      return;
    }
    if (action === "copy") {
      if (!selected.size) {
        updateStatus("Hãy chọn màu để sao chép.");
        return;
      }
      const text = Array.from(selected).join(", ");
      copyText(text).then(() => updateStatus(`Đã sao chép ${selected.size} màu.`));
    }
    if (action === "clear") {
      selected.clear();
      renderGrid();
    }
    if (action === "apply") {
      dispatchApply();
    }
  });

  grid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-hex]");
    if (!card) return;
    const hex = card.getAttribute("data-hex");
    if (!hex) return;
    handleSelect(hex);
  });

  input?.addEventListener("input", () => {
    window.clearTimeout(input._hexTimer);
    input._hexTimer = window.setTimeout(applyFilter, 200);
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "h") {
      event.preventDefault();
      if (overlay.hasAttribute("hidden")) {
        openHexHub();
      } else {
        closeHexHub();
      }
    }
    if (event.key === "Escape" && !overlay.hasAttribute("hidden")) {
      closeHexHub();
    }
  });

  list = await loadHexes();
  filtered = list;
  renderGrid();
};

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    initHexHub();
  });
}
