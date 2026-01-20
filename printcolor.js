const PROFILE_PRESETS = {
  "300": { name: "Couche 300%", tac: 300 },
  "280": { name: "Thường 280%", tac: 280 },
  "240": { name: "Báo 240%", tac: 240 }
};

const elements = {
  input: document.getElementById("hexInput"),
  apply: document.getElementById("hexApply"),
  clear: document.getElementById("hexClear"),
  tableBody: document.getElementById("printTableBody"),
  tableWrap: document.getElementById("printTableWrap"),
  empty: document.getElementById("printEmpty"),
  toast: document.getElementById("printToast"),
  profilePreset: document.getElementById("profilePreset"),
  tacRange: document.getElementById("tacRange"),
  tacValue: document.getElementById("tacValue"),
  tacBadge: document.getElementById("tacBadge"),
  reduceAll: document.getElementById("reduceAll"),
  exportFormat: document.getElementById("exportFormat"),
  exportCopy: document.getElementById("exportCopy")
};

const state = {
  items: [],
  tacLimit: 300
};

const normalizeHex = (value) => {
  if (!value) return null;
  const raw = value.trim().replace(/^0x/i, "").replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(raw)) return null;
  const hex = raw.length === 3
    ? raw.split("").map((c) => c + c).join("")
    : raw;
  return `#${hex.toUpperCase()}`;
};

const parseHexList = (value) => {
  if (!value) return [];
  return value
    .split(/[\s,;|]+/)
    .map(normalizeHex)
    .filter(Boolean);
};

const hexToRgb = (hex) => {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return { r, g, b };
};

const rgbToHex = ({ r, g, b }) => {
  const toHex = (value) => value.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

const rgbToCmyk = ({ r, g, b }) => {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  if (r === 0 && g === 0 && b === 0) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }
  const cRaw = 1 - rNorm;
  const mRaw = 1 - gNorm;
  const yRaw = 1 - bNorm;
  const kRaw = Math.min(cRaw, mRaw, yRaw);
  const denom = 1 - kRaw;
  const c = denom === 0 ? 0 : (cRaw - kRaw) / denom;
  const m = denom === 0 ? 0 : (mRaw - kRaw) / denom;
  const y = denom === 0 ? 0 : (yRaw - kRaw) / denom;
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(kRaw * 100)
  };
};

const cmykToRgb = ({ c, m, y, k }) => {
  const cNorm = c / 100;
  const mNorm = m / 100;
  const yNorm = y / 100;
  const kNorm = k / 100;
  const r = Math.round(255 * (1 - cNorm) * (1 - kNorm));
  const g = Math.round(255 * (1 - mNorm) * (1 - kNorm));
  const b = Math.round(255 * (1 - yNorm) * (1 - kNorm));
  return { r, g, b };
};

const getHashParams = () => {
  const hash = window.location.hash ? window.location.hash.slice(1) : "";
  if (!hash) return {};
  const params = {};
  hash.split("&").forEach((part) => {
    const [key, value] = part.split("=");
    if (!key) return;
    params[key] = value ? decodeURIComponent(value) : "";
  });
  return params;
};

const extractHashColors = () => {
  const params = getHashParams();
  const raw = params.c || params.p || params.g || "";
  if (!raw) return [];
  return parseHexList(raw.replace(/#/g, ""));
};

const setHashColors = (list) => {
  const url = new URL(window.location.href);
  if (!list.length) {
    url.hash = "";
    window.history.replaceState(null, "", url.toString());
    return;
  }
  const payload = list.map((item) => item.replace("#", "")).join(",");
  url.hash = `c=${encodeURIComponent(payload)}`;
  window.history.replaceState(null, "", url.toString());
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

const getTac = (cmyk) => cmyk.c + cmyk.m + cmyk.y + cmyk.k;

const reduceTac = (cmyk, limit) => {
  const tac = getTac(cmyk);
  if (tac <= limit || tac === 0) return { ...cmyk };
  const factor = limit / tac;
  const scaled = {
    c: Math.round(cmyk.c * factor),
    m: Math.round(cmyk.m * factor),
    y: Math.round(cmyk.y * factor),
    k: Math.round(cmyk.k * factor)
  };
  const overflow = getTac(scaled) - limit;
  if (overflow > 0) {
    scaled.k = Math.max(0, scaled.k - overflow);
  }
  return scaled;
};

const getDeltaLabel = (baseRgb, simRgb) => {
  const diff = Math.sqrt(
    Math.pow(baseRgb.r - simRgb.r, 2) +
    Math.pow(baseRgb.g - simRgb.g, 2) +
    Math.pow(baseRgb.b - simRgb.b, 2)
  );
  if (diff < 35) return "Thấp";
  if (diff < 80) return "Vừa";
  return "Cao";
};

const buildItems = (list) => list.map((hex) => {
  const baseRgb = hexToRgb(hex);
  const cmyk = rgbToCmyk(baseRgb);
  const simRgb = cmykToRgb(cmyk);
  return {
    hex,
    baseRgb,
    cmyk,
    simRgb
  };
});

const renderTable = () => {
  if (!elements.tableBody || !elements.tableWrap || !elements.empty) return;
  if (!state.items.length) {
    elements.tableBody.innerHTML = "";
    elements.tableWrap.classList.add("hidden");
    elements.empty.classList.remove("hidden");
    return;
  }
  const rows = state.items.map((item, index) => {
    const tac = getTac(item.cmyk);
    const warn = tac > state.tacLimit ? "Vượt ngưỡng" : "Ổn";
    const warnClass = tac > state.tacLimit ? "tc-warn" : "";
    const simHex = rgbToHex(item.simRgb);
    const delta = getDeltaLabel(item.baseRgb, item.simRgb);
    const disabled = tac <= state.tacLimit ? "disabled" : "";
    return `
      <tr data-row="${index}">
        <td>
          <div class="tc-swatch-duo">
            <span class="tc-swatch" style="background:${item.hex};"></span>
            <span class="tc-swatch" style="background:${simHex};"></span>
          </div>
        </td>
        <td class="font-semibold">${item.hex}</td>
        <td>C ${item.cmyk.c}% · M ${item.cmyk.m}% · Y ${item.cmyk.y}% · K ${item.cmyk.k}%</td>
        <td>${tac}%</td>
        <td class="${warnClass}">${warn}</td>
        <td>${delta}</td>
        <td>
          <button class="tc-btn tc-chip px-3 py-1 text-xs" data-action="reduce" data-index="${index}" ${disabled}>
            Giảm TAC
          </button>
        </td>
      </tr>`;
  }).join("");
  elements.tableBody.innerHTML = rows;
  elements.tableWrap.classList.remove("hidden");
  elements.empty.classList.add("hidden");
};

const updateTacDisplay = () => {
  const label = `${state.tacLimit}%`;
  if (elements.tacValue) elements.tacValue.textContent = label;
  if (elements.tacBadge) elements.tacBadge.textContent = label;
};

const applyFromInput = () => {
  if (!elements.input) return;
  const list = parseHexList(elements.input.value);
  state.items = buildItems(list);
  renderTable();
  setHashColors(list);
  if (!list.length) {
    showToast("Chưa có mã màu hợp lệ.");
  }
};

const applyFromHash = () => {
  const list = extractHashColors();
  if (elements.input && list.length) {
    elements.input.value = list.join("\n");
  }
  state.items = buildItems(list);
  renderTable();
};

const handleReduce = (index) => {
  const item = state.items[index];
  if (!item) return;
  const reduced = reduceTac(item.cmyk, state.tacLimit);
  item.cmyk = reduced;
  item.simRgb = cmykToRgb(reduced);
  renderTable();
};

const reduceAll = () => {
  state.items = state.items.map((item) => {
    const reduced = reduceTac(item.cmyk, state.tacLimit);
    return {
      ...item,
      cmyk: reduced,
      simRgb: cmykToRgb(reduced)
    };
  });
  renderTable();
};

const buildExportCsv = () => {
  const header = "hex,sim_hex,c,m,y,k,tac,delta";
  const rows = state.items.map((item) => {
    const simHex = rgbToHex(item.simRgb);
    const tac = getTac(item.cmyk);
    const delta = getDeltaLabel(item.baseRgb, item.simRgb);
    return `${item.hex},${simHex},${item.cmyk.c},${item.cmyk.m},${item.cmyk.y},${item.cmyk.k},${tac},${delta}`;
  });
  return [header, ...rows].join("\n");
};

const buildExportJson = () => {
  const tokens = {};
  state.items.forEach((item, index) => {
    const id = String(index + 1).padStart(2, "0");
    tokens[`cmyk-${id}`] = {
      hex: item.hex,
      simHex: rgbToHex(item.simRgb),
      c: item.cmyk.c,
      m: item.cmyk.m,
      y: item.cmyk.y,
      k: item.cmyk.k,
      tac: getTac(item.cmyk)
    };
  });
  return JSON.stringify({ tokens }, null, 2);
};

const buildExportCss = () => {
  return state.items.map((item, index) => {
    const id = String(index + 1).padStart(2, "0");
    const simHex = rgbToHex(item.simRgb);
    return [
      `--cmyk-${id}: cmyk(${item.cmyk.c}% ${item.cmyk.m}% ${item.cmyk.y}% ${item.cmyk.k}%);`,
      `--hex-${id}: ${item.hex};`,
      `--sim-${id}: ${simHex};`
    ].join("\n");
  }).join("\n");
};

const exportData = () => {
  if (!state.items.length) {
    showToast("Chưa có dữ liệu để xuất.");
    return;
  }
  const format = elements.exportFormat ? elements.exportFormat.value : "csv";
  let text = "";
  if (format === "json") text = buildExportJson();
  else if (format === "css") text = buildExportCss();
  else text = buildExportCsv();
  copyToClipboard(text).then(() => {
    showToast("Đã sao chép dữ liệu xuất.");
  });
};

const bindEvents = () => {
  if (elements.apply) elements.apply.addEventListener("click", applyFromInput);
  if (elements.clear) {
    elements.clear.addEventListener("click", () => {
      if (elements.input) elements.input.value = "";
      state.items = [];
      renderTable();
      setHashColors([]);
      showToast("Đã xóa danh sách.");
    });
  }
  if (elements.profilePreset) {
    elements.profilePreset.addEventListener("change", () => {
      const preset = PROFILE_PRESETS[elements.profilePreset.value];
      const next = preset ? preset.tac : 300;
      state.tacLimit = next;
      if (elements.tacRange) elements.tacRange.value = String(next);
      updateTacDisplay();
      renderTable();
    });
  }
  if (elements.tacRange) {
    elements.tacRange.addEventListener("input", () => {
      const next = Number(elements.tacRange.value || 300);
      state.tacLimit = next;
      updateTacDisplay();
      renderTable();
    });
  }
  if (elements.reduceAll) {
    elements.reduceAll.addEventListener("click", reduceAll);
  }
  if (elements.tableBody) {
    elements.tableBody.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action='reduce']");
      if (!button) return;
      const index = Number(button.getAttribute("data-index"));
      if (Number.isNaN(index)) return;
      handleReduce(index);
    });
  }
  if (elements.exportCopy) {
    elements.exportCopy.addEventListener("click", exportData);
  }
};

updateTacDisplay();
bindEvents();
applyFromHash();

window.addEventListener("hashchange", () => {
  applyFromHash();
});
