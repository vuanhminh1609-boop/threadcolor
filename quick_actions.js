(() => {
  const tabs = Array.from(document.querySelectorAll("[data-tab]"));
  const panels = Array.from(document.querySelectorAll("[data-panel]"));
  const tabState = { active: "paste", imageInit: false };

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
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16)
    };
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

  const setActiveTab = (id) => {
    tabState.active = id;
    tabs.forEach((btn) => {
      const isActive = btn.dataset.tab === id;
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
      btn.classList.toggle("tc-btn-primary", isActive);
      btn.classList.toggle("tc-chip", !isActive);
    });
    panels.forEach((panel) => {
      panel.classList.toggle("hidden", panel.dataset.panel !== id);
    });
    if (id === "image" && !tabState.imageInit) {
      initImageTab();
      tabState.imageInit = true;
    }
  };

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => setActiveTab(btn.dataset.tab));
  });
  setActiveTab(tabState.active);

  const swatchHtml = (hex) =>
    `<span class="inline-flex w-7 h-7 rounded-lg border border-[rgba(0,0,0,.12)]" style="background:${hex};"></span>`;

  const setOpenLink = (el, url) => {
    if (!el) return;
    el.href = url;
    el.classList.remove("hidden");
  };

  const hideOpenLink = (el) => {
    if (!el) return;
    el.classList.add("hidden");
  };

  const buildHash = (list, key) => {
    const payload = list.map((hex) => hex.replace("#", "")).join(",");
    return `${key}=${encodeURIComponent(payload)}`;
  };

  const pasteInput = document.getElementById("qaPasteInput");
  const pasteApply = document.getElementById("qaPasteApply");
  const pasteSwatches = document.getElementById("qaPasteSwatches");
  const pasteCmyk = document.getElementById("qaPasteCmyk");
  const pasteCmykOut = document.getElementById("qaPasteCmykOut");
  const pasteGradient = document.getElementById("qaPasteGradient");
  const pasteGradientOut = document.getElementById("qaPasteGradientOut");
  const pasteExport = document.getElementById("qaPasteExport");
  const pasteExportOut = document.getElementById("qaPasteExportOut");
  const pasteCopy = document.getElementById("qaPasteCopy");
  const openCmyk = document.getElementById("qaOpenCmyk");
  const openGradient = document.getElementById("qaOpenGradient");
  const openPalette = document.getElementById("qaOpenPalette");

  let pasteColors = [];
  let pasteExportText = "";

  const renderPasteSwatches = () => {
    if (!pasteSwatches) return;
    pasteSwatches.innerHTML = pasteColors.map(swatchHtml).join("");
  };

  const handlePasteApply = () => {
    pasteColors = parseHexList(pasteInput?.value || "");
    renderPasteSwatches();
    pasteCmykOut.textContent = "";
    pasteGradientOut.style.background = "";
    pasteExportOut.textContent = "";
    pasteExportText = "";
    if (pasteCopy) pasteCopy.classList.add("hidden");
    hideOpenLink(openCmyk);
    hideOpenLink(openGradient);
    hideOpenLink(openPalette);
  };

  pasteApply?.addEventListener("click", handlePasteApply);

  pasteCmyk?.addEventListener("click", () => {
    if (!pasteColors.length) return;
    const lines = pasteColors.map((hex) => {
      const cmyk = rgbToCmyk(hexToRgb(hex));
      const tac = cmyk.c + cmyk.m + cmyk.y + cmyk.k;
      const warn = tac > 300 ? "⚠ TAC cao" : "OK";
      return `${hex} → C${cmyk.c}% M${cmyk.m}% Y${cmyk.y}% K${cmyk.k}% (TAC ${tac}%) ${warn}`;
    });
    pasteCmykOut.textContent = lines.join("\n");
    setOpenLink(openCmyk, `./worlds/printcolor.html#${buildHash(pasteColors, "c")}`);
  });

  pasteGradient?.addEventListener("click", () => {
    if (!pasteColors.length) return;
    pasteGradientOut.style.background = `linear-gradient(90deg, ${pasteColors.join(", ")})`;
    setOpenLink(openGradient, `./worlds/gradient.html#${buildHash(pasteColors, "g")}`);
  });

  pasteExport?.addEventListener("click", () => {
    if (!pasteColors.length) return;
    const css = pasteColors.map((hex, i) => `--mau-${String(i + 1).padStart(2, "0")}: ${hex};`).join("\n");
    const json = pasteColors.reduce((acc, hex, i) => {
      acc[`mau_${String(i + 1).padStart(2, "0")}`] = hex;
      return acc;
    }, {});
    pasteExportText = `${css}\n\n${JSON.stringify(json, null, 2)}`;
    pasteExportOut.textContent = pasteExportText;
    if (pasteCopy) pasteCopy.classList.remove("hidden");
    setOpenLink(openPalette, `./worlds/palette.html#${buildHash(pasteColors, "p")}`);
  });

  pasteCopy?.addEventListener("click", () => {
    if (!pasteExportText) return;
    copyToClipboard(pasteExportText);
  });

  let threadDataPromise = null;
  const loadThreads = () => {
    if (!threadDataPromise) {
      threadDataPromise = fetch("./threads.json")
        .then((res) => res.json())
        .then((data) => data.filter((item) => item.hex))
        .catch(() => []);
    }
    return threadDataPromise;
  };

  const colorDistance = (a, b) => {
    const dr = a.r - b.r;
    const dg = a.g - b.g;
    const db = a.b - b.b;
    return dr * dr + dg * dg + db * db;
  };

  const findNearestThreads = async (hex, limit = 5) => {
    const data = await loadThreads();
    const target = hexToRgb(hex);
    const sorted = data
      .map((item) => ({
        ...item,
        _dist: colorDistance(target, hexToRgb(item.hex))
      }))
      .sort((a, b) => a._dist - b._dist)
      .slice(0, limit);
    return sorted;
  };

  const threadHex = document.getElementById("qaThreadHex");
  const threadSearch = document.getElementById("qaThreadSearch");
  const threadList = document.getElementById("qaThreadList");
  const threadOpen = document.getElementById("qaThreadOpen");

  threadSearch?.addEventListener("click", async () => {
    const hex = normalizeHex(threadHex?.value || "");
    if (!hex) {
      threadList.innerHTML = "<li class=\"tc-muted\">HEX chưa hợp lệ.</li>";
      hideOpenLink(threadOpen);
      return;
    }
    threadList.innerHTML = "<li class=\"tc-muted\">Đang tra...</li>";
    const results = await findNearestThreads(hex, 5);
    threadList.innerHTML = results.map((item) => `
      <li class="flex items-center gap-2">
        ${swatchHtml(item.hex)}
        <span class="font-semibold">${item.brand} ${item.code}</span>
        <span class="tc-muted text-xs">${item.name || ""}</span>
        <span class="tc-muted text-xs">${item.hex}</span>
      </li>
    `).join("");
    setOpenLink(threadOpen, `./worlds/threadcolor.html#${buildHash([hex], "c")}`);
  });

  const initImageTab = () => {
    const imageInput = document.getElementById("qaImageInput");
    const imageLabel = document.querySelector("label[for='qaImageInput']");
    const imageAnalyze = document.getElementById("qaImageAnalyze");
    const imageSwatches = document.getElementById("qaImageSwatches");
    const imageThreads = document.getElementById("qaImageThreads");
    const imageOpen = document.getElementById("qaImageOpen");

    const extractPalette = async (file) => {
      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement("canvas");
      const scale = Math.min(80 / bitmap.width, 80 / bitmap.height, 1);
      canvas.width = Math.max(1, Math.floor(bitmap.width * scale));
      canvas.height = Math.max(1, Math.floor(bitmap.height * scale));
      const ctx = canvas.getContext("2d");
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const buckets = new Map();
      for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3];
        if (a < 50) continue;
        const r = data[i] >> 4;
        const g = data[i + 1] >> 4;
        const b = data[i + 2] >> 4;
        const key = `${r}-${g}-${b}`;
        buckets.set(key, (buckets.get(key) || 0) + 1);
      }
      const top = Array.from(buckets.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([key]) => {
          const [r, g, b] = key.split("-").map((v) => parseInt(v, 10) * 16 + 8);
          return normalizeHex(`#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`);
        })
        .filter(Boolean);
      return top;
    };

    imageAnalyze?.addEventListener("click", async () => {
      const file = imageInput?.files?.[0];
      if (!file) return;
      const colors = await extractPalette(file);
      imageSwatches.innerHTML = colors.map(swatchHtml).join("");
      const results = await Promise.all(colors.map((hex) => findNearestThreads(hex, 3)));
      imageThreads.innerHTML = results.map((list, idx) => {
        const hex = colors[idx];
        const items = list.map((item) =>
          `<div class="flex items-center gap-2">
            ${swatchHtml(item.hex)}
            <span class="font-semibold">${item.brand} ${item.code}</span>
            <span class="tc-muted text-xs">${item.name || ""}</span>
          </div>`
        ).join("");
        return `<li class="space-y-2">${swatchHtml(hex)} <span class="font-semibold">${hex}</span>${items}</li>`;
      }).join("");
      setOpenLink(imageOpen, `./worlds/threadcolor.html#${buildHash(colors, "c")}`);
    });
  };
})();
    imageLabel?.addEventListener("click", () => {
      if (imageInput) imageInput.click();
    });
