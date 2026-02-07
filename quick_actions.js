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

  const pickTopHexes = (hexes, max = 3) => {
    const output = [];
    const seen = new Set();
    (Array.isArray(hexes) ? hexes : []).forEach((hex) => {
      const normalized = normalizeHex(hex);
      if (!normalized || seen.has(normalized)) return;
      seen.add(normalized);
      output.push(normalized);
    });
    return output.slice(0, max);
  };

  const rgbCssToHex = (cssColor) => {
    if (!cssColor) return null;
    const raw = String(cssColor).trim();
    if (raw.startsWith("#")) return normalizeHex(raw);
    const match = raw.match(/rgba?\(([^)]+)\)/i);
    if (!match) return null;
    const parts = match[1].split(/[,\s/]+/).filter(Boolean).map((item) => Number.parseFloat(item));
    if (parts.length < 3 || parts.slice(0, 3).some((item) => !Number.isFinite(item))) return null;
    const toHex = (value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0");
    return `#${toHex(parts[0])}${toHex(parts[1])}${toHex(parts[2])}`.toUpperCase();
  };

  const getCssVarValue = (name) => {
    const root = document.documentElement;
    if (!root) return "";
    return getComputedStyle(root).getPropertyValue(name).trim();
  };

  const parseHexListFromCssVar = (value) => {
    if (!value) return [];
    return value
      .split(/[\s,;|]+/)
      .map(normalizeHex)
      .filter(Boolean);
  };

  const getHeroText = () => {
    const hero = document.querySelector(".tc-hero-title");
    if (!hero) return "Không gian chuẩn hóa màu số";
    const rawLines = hero.dataset.heroLines;
    if (rawLines) {
      return rawLines.split("|").map((part) => part.trim()).filter(Boolean).join(" ");
    }
    return (hero.getAttribute("aria-label") || hero.dataset.heroText || hero.textContent || "Không gian chuẩn hóa màu số").trim();
  };

  const getWordStartIndices = (text) => {
    const indices = [];
    if (!text) return indices;
    let prevSpace = true;
    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      const isSpace = /\s/.test(char);
      if (!isSpace && prevSpace) indices.push(i);
      prevSpace = isSpace;
    }
    return indices;
  };

  const syncAuroraHexRowFromSwatches = () => {
    const swatchIds = ["qaAuroraSw1", "qaAuroraSw2", "qaAuroraSw3", "qaAuroraSw4", "qaAuroraSw5", "qaAuroraSw6"];
    const swatches = swatchIds.map((id) => document.getElementById(id));
    const hexLabels = swatchIds.map((_, idx) => document.getElementById(`qaAuroraHex${idx + 1}`));
    const hexRow = document.getElementById("qaAuroraHexRow");
    if (!swatches.every(Boolean) || !hexRow) return;
    const current = swatches
      .map((swatch) => rgbCssToHex(getComputedStyle(swatch).backgroundColor))
      .filter(Boolean);
    if (!current.length) return;
    hexLabels.forEach((label, idx) => {
      if (label && current[idx]) setText(label, current[idx]);
    });
    setText(hexRow, current.join(" · "));
  };

  const getHeroSwatchHexes = () => {
    const cssVar = getCssVarValue("--hero-swatches");
    const parsed = parseHexListFromCssVar(cssVar);
    if (parsed.length >= 6) return parsed.slice(0, 6);
    const start = parseFloat(getCssVarValue("--hero-hue-start"));
    const step = parseFloat(getCssVarValue("--hero-hue-step"));
    const hueStart = Number.isFinite(start) ? start : 0;
    const hueStep = Number.isFinite(step) ? step : 8;
    const heroText = getHeroText();
    const wordIndices = getWordStartIndices(heroText);
    const indices = wordIndices.length >= 6
      ? wordIndices.slice(0, 6)
      : Array.from({ length: 6 }, (_v, idx) => idx * 4);
    return indices.map((offset) => rgbToHex(hslToRgb({
      h: hueStart + hueStep * offset,
      s: 0.78,
      l: 0.58
    })));
  };

  const syncHeroAurora = () => {
    const swatchIds = ["qaAuroraSw1", "qaAuroraSw2", "qaAuroraSw3", "qaAuroraSw4", "qaAuroraSw5", "qaAuroraSw6"];
    const swatches = swatchIds.map((id) => document.getElementById(id));
    if (!swatches.every(Boolean)) return;
    const palette = getHeroSwatchHexes();
    if (palette.length) {
      swatches.forEach((swatch, idx) => {
        const hex = palette[idx] || palette[palette.length - 1];
        if (hex) setBg(swatch, hex);
      });
    }
    syncAuroraHexRowFromSwatches();
  };

  const hexToRgb = (hex) => {
    const clean = hex.replace("#", "");
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16)
    };
  };

  const relativeLuminance = ({ r, g, b }) => {
    const transform = (value) => {
      const s = value / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    };
    const rLin = transform(r);
    const gLin = transform(g);
    const bLin = transform(b);
    return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
  };

  const rgbToHue = ({ r, g, b }) => {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;
    if (delta === 0) return 0;
    let hue;
    if (max === rNorm) hue = ((gNorm - bNorm) / delta) % 6;
    else if (max === gNorm) hue = (bNorm - rNorm) / delta + 2;
    else hue = (rNorm - gNorm) / delta + 4;
    hue = Math.round(hue * 60);
    return hue < 0 ? hue + 360 : hue;
  };

  const rgbToHsl = ({ r, g, b }) => {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (delta !== 0) {
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
      switch (max) {
        case rNorm:
          h = (gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0);
          break;
        case gNorm:
          h = (bNorm - rNorm) / delta + 2;
          break;
        default:
          h = (rNorm - gNorm) / delta + 4;
      }
      h *= 60;
    }
    return { h, s, l };
  };

  const hslToRgb = ({ h, s, l }) => {
    if (s === 0) {
      const value = Math.round(l * 255);
      return { r: value, g: value, b: value };
    }
    const hue = ((h % 360) + 360) % 360 / 360;
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hueToRgb = (t) => {
      let temp = t;
      if (temp < 0) temp += 1;
      if (temp > 1) temp -= 1;
      if (temp < 1 / 6) return p + (q - p) * 6 * temp;
      if (temp < 1 / 2) return q;
      if (temp < 2 / 3) return p + (q - p) * (2 / 3 - temp) * 6;
      return p;
    };
    return {
      r: Math.round(hueToRgb(hue + 1 / 3) * 255),
      g: Math.round(hueToRgb(hue) * 255),
      b: Math.round(hueToRgb(hue - 1 / 3) * 255)
    };
  };

  const rgbToHex = ({ r, g, b }) => {
    const toHex = (value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  const contrastRatio = (l1, l2) => {
    const bright = Math.max(l1, l2);
    const dark = Math.min(l1, l2);
    return (bright + 0.05) / (dark + 0.05);
  };

  const classifyHex = (hex) => {
    const rgb = hexToRgb(hex);
    const lum = relativeLuminance(rgb);
    const hue = rgbToHue(rgb);
    const isWarm = hue <= 60 || hue >= 320;
    const isCool = hue >= 160 && hue <= 260;
    if (lum >= 0.75) {
      if (isWarm) return "Ấm & sáng";
      if (isCool) return "Mát & trong";
      return "Sáng & sạch";
    }
    if (lum <= 0.35) return "Đậm & sâu";
    if (isWarm) return "Ấm & sáng";
    if (isCool) return "Mát & trong";
    return "Sáng & sạch";
  };

  const setText = (el, txt) => {
    if (!el) return;
    el.textContent = txt || "";
  };

  const setBg = (el, hex) => {
    if (!el || !hex) return;
    el.style.setProperty("--swatch-color", hex);
    el.style.background = hex;
  };

  const clearBg = (el) => {
    if (!el) return;
    el.style.removeProperty("--swatch-color");
    el.style.background = "";
  };

  const hexToRgbString = (hex) => {
    const rgb = hexToRgb(hex);
    return `${rgb.r} ${rgb.g} ${rgb.b}`;
  };

  const getCssVarHex = (name) => {
    const root = document.documentElement;
    if (!root) return null;
    const value = getComputedStyle(root).getPropertyValue(name).trim();
    if (!value) return null;
    return rgbCssToHex(value);
  };

  let lastAuroraKey = "";
  let lastAuroraMode = "paste";
  let lastTokenKey = "";
  let lastTokenContext = null;

  const clampValue = (value, min, max) => Math.min(max, Math.max(min, value));

  const representativeHue = (hexes) => {
    const palette = pickTopHexes(hexes, 3);
    if (!palette.length) {
      return { h: 0, s: 0.6, l: 0.5 };
    }
    const hslList = palette.map((hex) => rgbToHsl(hexToRgb(hex)));
    if (hslList.length === 1) {
      const solo = hslList[0];
      return {
        h: solo.h,
        s: clampValue(solo.s, 0.35, 0.92),
        l: clampValue(solo.l, 0.18, 0.88)
      };
    }
    const vector = hslList.reduce((acc, item) => {
      const rad = (item.h * Math.PI) / 180;
      acc.x += Math.cos(rad);
      acc.y += Math.sin(rad);
      acc.s += item.s;
      acc.l += item.l;
      return acc;
    }, { x: 0, y: 0, s: 0, l: 0 });
    const count = hslList.length;
    const avgX = vector.x / count;
    const avgY = vector.y / count;
    let hue = Math.atan2(avgY, avgX) * (180 / Math.PI);
    if (hue < 0) hue += 360;
    return {
      h: hue,
      s: clampValue(vector.s / count, 0.35, 0.92),
      l: clampValue(vector.l / count, 0.18, 0.88)
    };
  };

  const generateHarmonySuggestions = (hexes) => {
    const palette = pickTopHexes(hexes, 3);
    const baseHex = palette[0];
    if (!baseHex) return [];

    const rep = representativeHue(palette);
    const baseHsl = rgbToHsl(hexToRgb(baseHex));
    const clampS = (value) => clampValue(value, 0.35, 0.92);
    const clampL = (value) => clampValue(value, 0.18, 0.88);

    const compHex = rgbToHex(hslToRgb({
      h: (rep.h + 180) % 360,
      s: clampS(rep.s),
      l: clampL(rep.l)
    }));

    const leftHex = rgbToHex(hslToRgb({
      h: (rep.h - 30 + 360) % 360,
      s: clampS(rep.s),
      l: clampL(rep.l)
    }));
    const rightHex = rgbToHex(hslToRgb({
      h: (rep.h + 30) % 360,
      s: clampS(rep.s),
      l: clampL(rep.l)
    }));

    const baseLum = relativeLuminance(hexToRgb(baseHex));
    const direction = baseLum < 0.35 ? 1 : -1;
    const steps = 10;
    let bestAccent = null;
    let bestRatio = 0;
    for (let i = 1; i <= steps; i += 1) {
      const t = i / steps;
      const shift = direction === 1 ? (0.88 - baseHsl.l) : (baseHsl.l - 0.18);
      const l = clampL(baseHsl.l + direction * t * shift);
      const accentRgb = hslToRgb({ h: baseHsl.h, s: clampS(baseHsl.s), l });
      const accentLum = relativeLuminance(accentRgb);
      const ratio = contrastRatio(baseLum, accentLum);
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestAccent = rgbToHex(accentRgb);
      }
      if (ratio >= 4.5) break;
    }
    const accentHex = bestAccent || baseHex;

    return [
      {
        kind: "complementary",
        title: "Bù 180°",
        sub: "Dùng làm điểm nhấn mạnh (CTA/nhãn).",
        colors: [baseHex, compHex]
      },
      {
        kind: "analogous",
        title: "Tương tự ±30°",
        sub: "Mượt, hài hoà (nền/khối phụ).",
        colors: [leftHex, rightHex]
      },
      {
        kind: "accent",
        title: "Nhấn tương phản",
        sub: "Tăng độ rõ cho chữ/viền/biểu tượng.",
        colors: [baseHex, accentHex]
      }
    ];
  };

  const buildCssTokensFromSuggestion = (baseHex, suggestion, fallbackHexes = []) => {
    const fallback = pickTopHexes(fallbackHexes, 3);
    const colors = (suggestion?.colors || []).map(normalizeHex).filter(Boolean);
    let a1 = normalizeHex(baseHex) || fallback[0] || colors[0];
    if (!a1) return "";
    let a2 = a1;
    let a3 = a1;
    const kind = suggestion?.kind || "";
    if (kind === "analogous") {
      a2 = colors[0] || fallback[1] || a1;
      a3 = colors[1] || fallback[2] || a1;
    } else if (kind === "complementary") {
      const comp = colors[1] || colors[0] || fallback[1] || a1;
      a2 = comp;
      a3 = fallback[1] && fallback[1] !== comp ? fallback[1] : a1;
    } else if (kind === "accent") {
      const accent = colors[1] || colors[0] || fallback[1] || a1;
      a2 = accent;
      a3 = fallback[1] || a1;
    } else {
      a2 = colors[1] || colors[0] || fallback[1] || a1;
      a3 = fallback[2] || a1;
    }
    const css = [
      ":root{",
      `  --a1: ${a1};`,
      `  --a2: ${a2};`,
      `  --a3: ${a3};`,
      `  --a1-rgb: ${hexToRgbString(a1)};`,
      `  --a2-rgb: ${hexToRgbString(a2)};`,
      `  --a3-rgb: ${hexToRgbString(a3)};`,
      "}"
    ];
    return css.join("\n");
  };

  const renderAuroraTokenPanel = (context = {}) => {
    const presetEl = document.getElementById("qaAuroraTokenPreset");
    const codeEl = document.getElementById("qaAuroraTokenCss");
    if (!presetEl || !codeEl) return;

    let hexes = pickTopHexes(context.hexes, 3);
    if (!hexes.length) {
      const swatches = [
        document.getElementById("qaAuroraSw1"),
        document.getElementById("qaAuroraSw2"),
        document.getElementById("qaAuroraSw3")
      ].filter(Boolean);
      hexes = swatches
        .map((swatch) => rgbCssToHex(getComputedStyle(swatch).backgroundColor))
        .filter(Boolean)
        .slice(0, 3);
    }
    const rawSuggestions = Array.isArray(context.suggestions) && context.suggestions.length
      ? context.suggestions
      : generateHarmonySuggestions(hexes);
    const tokenSuggestions = rawSuggestions.some((item) => Array.isArray(item.colors) && item.colors.length)
      ? rawSuggestions
      : generateHarmonySuggestions(hexes);

    lastTokenContext = { hexes, suggestions: tokenSuggestions };

    const byKind = tokenSuggestions.reduce((acc, item) => {
      if (item.kind) acc[item.kind] = item;
      return acc;
    }, {});

    const preset = presetEl.value || "auto";
    const baseHex = hexes[0] || tokenSuggestions[0]?.colors?.[0];
    let picked = byKind.analogous || tokenSuggestions[1] || tokenSuggestions[0];
    if (preset === "complementary") {
      picked = byKind.complementary || tokenSuggestions[0];
    } else if (preset === "analogous") {
      picked = byKind.analogous || tokenSuggestions[1] || tokenSuggestions[0];
    } else if (preset === "accent") {
      picked = byKind.accent || tokenSuggestions[2] || tokenSuggestions[0];
    } else if (preset === "auto") {
      const bgHex = getCssVarHex("--bg");
      if (baseHex && bgHex) {
        const ratio = contrastRatio(relativeLuminance(hexToRgb(baseHex)), relativeLuminance(hexToRgb(bgHex)));
        picked = ratio < 4.5
          ? (byKind.accent || tokenSuggestions[2] || picked)
          : (byKind.analogous || tokenSuggestions[1] || picked);
      }
    }

    const css = buildCssTokensFromSuggestion(baseHex, picked, hexes);
    const key = `${preset}|${hexes.join(",")}|${picked?.title || ""}|${picked?.colors?.join(",") || ""}`;
    if (key && key === lastTokenKey) return;
    lastTokenKey = key;
    codeEl.textContent = css;
  };

  const buildThreadSuggestions = (items) => {
    return (Array.isArray(items) ? items : []).slice(0, 3).map((item) => {
      const title = `${item.brand || ""} ${item.code || ""}`.trim() || "Gợi ý mã chỉ";
      const parts = [];
      if (item.name) parts.push(item.name);
      if (item.hex) parts.push(item.hex);
      return {
        title,
        sub: parts.join(" · ") || "Màu gần nhất"
      };
    });
  };

  const updateAuroraPreview = (payload = {}) => {
    const sw1 = document.getElementById("qaAuroraSw1");
    const sw2 = document.getElementById("qaAuroraSw2");
    const sw3 = document.getElementById("qaAuroraSw3");
    const hexRow = document.getElementById("qaAuroraHexRow");
    const sug1Title = document.getElementById("qaAuroraSug1Title");
    const sug1Sub = document.getElementById("qaAuroraSug1Sub");
    const sug2Title = document.getElementById("qaAuroraSug2Title");
    const sug2Sub = document.getElementById("qaAuroraSug2Sub");
    const sug3Title = document.getElementById("qaAuroraSug3Title");
    const sug3Sub = document.getElementById("qaAuroraSug3Sub");
    const sug1Dot1 = document.getElementById("qaAuroraSug1Dot1");
    const sug1Dot2 = document.getElementById("qaAuroraSug1Dot2");
    const sug2Dot1 = document.getElementById("qaAuroraSug2Dot1");
    const sug2Dot2 = document.getElementById("qaAuroraSug2Dot2");
    const sug3Dot1 = document.getElementById("qaAuroraSug3Dot1");
    const sug3Dot2 = document.getElementById("qaAuroraSug3Dot2");

    const required = [sw1, sw2, sw3, hexRow, sug1Title, sug1Sub, sug2Title, sug2Sub, sug3Title, sug3Sub];
    if (required.some((el) => !el)) return;

    const hexes = pickTopHexes(payload.hexes, 3);
    const autoKey = `${payload.mode || ""}::${hexes.join(",")}::auto`;
    if ((!payload.suggestions || payload.suggestions.length === 0) && autoKey === lastAuroraKey) {
      return;
    }
    const suggestions = Array.isArray(payload.suggestions) && payload.suggestions.length
      ? payload.suggestions
      : generateHarmonySuggestions(hexes);
    const tokenSuggestions = suggestions.some((item) => Array.isArray(item.colors) && item.colors.length)
      ? suggestions
      : generateHarmonySuggestions(hexes);

    const key = [
      payload.mode || "",
      hexes.join(","),
      suggestions.map((item) => `${item.title || ""}|${item.sub || ""}`).join(";")
    ].join("::") || autoKey;
    if (key && key === lastAuroraKey) return;
    if (key) lastAuroraKey = key;
    if (payload.mode) lastAuroraMode = payload.mode;

    syncHeroAurora();

    const s1 = suggestions[0];
    const s2 = suggestions[1];
    const s3 = suggestions[2];
    if (s1) {
      setText(sug1Title, s1.title || "Gợi ý #1");
      setText(sug1Sub, s1.sub || "");
      if (s1.colors?.[0]) setBg(sug1Dot1, s1.colors[0]); else clearBg(sug1Dot1);
      if (s1.colors?.[1]) setBg(sug1Dot2, s1.colors[1]); else clearBg(sug1Dot2);
    }
    if (s2) {
      setText(sug2Title, s2.title || "Gợi ý #2");
      setText(sug2Sub, s2.sub || "");
      if (s2.colors?.[0]) setBg(sug2Dot1, s2.colors[0]); else clearBg(sug2Dot1);
      if (s2.colors?.[1]) setBg(sug2Dot2, s2.colors[1]); else clearBg(sug2Dot2);
    }
    if (s3) {
      setText(sug3Title, s3.title || "Gợi ý #3");
      setText(sug3Sub, s3.sub || "");
      if (s3.colors?.[0]) setBg(sug3Dot1, s3.colors[0]); else clearBg(sug3Dot1);
      if (s3.colors?.[1]) setBg(sug3Dot2, s3.colors[1]); else clearBg(sug3Dot2);
    }

    renderAuroraTokenPanel({ hexes, suggestions: tokenSuggestions });
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

  const tokenPresetEl = document.getElementById("qaAuroraTokenPreset");
  const tokenCssEl = document.getElementById("qaAuroraTokenCss");
  const tokenCopyBtn = document.getElementById("qaAuroraCopyCss");
  const tokenToast = document.getElementById("qaAuroraCopyToast");
  const previewBtn = document.getElementById("qaAuroraPreviewTheme");
  const resetBtn = document.getElementById("qaAuroraResetTheme");
  const previewBadge = document.getElementById("qaAuroraPreviewBadge");
  const toneNameInput = document.getElementById("qaAuroraToneName");
  const saveToneBtn = document.getElementById("qaAuroraSaveTone");

  const showTokenToast = (message) => {
    if (!tokenToast) return;
    tokenToast.textContent = message;
    tokenToast.classList.add("is-visible");
    window.clearTimeout(showTokenToast._t);
    showTokenToast._t = window.setTimeout(() => {
      tokenToast.classList.remove("is-visible");
    }, 1200);
  };

  const bindAuroraSwatchCopy = () => {
    const items = Array.from(document.querySelectorAll(".tc-qa-swatch-item[data-swatch-id]"));
    if (!items.length) return;
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const swatchId = item.dataset.swatchId;
        const swatch = swatchId ? document.getElementById(swatchId) : item.querySelector(".tc-qa-swatch");
        if (!swatch) return;
        const hex = rgbCssToHex(getComputedStyle(swatch).backgroundColor);
        if (!hex) return;
        copyToClipboard(hex).then(() => showTokenToast(`Đã sao chép ${hex}`));
      });
    });
  };

  tokenPresetEl?.addEventListener("change", () => {
    if (lastTokenContext) renderAuroraTokenPanel(lastTokenContext);
  });

  tokenCopyBtn?.addEventListener("click", () => {
    const txt = tokenCssEl?.textContent || "";
    if (!txt.trim()) return;
    copyToClipboard(txt.trim()).then(() => showTokenToast("Đã sao chép token CSS"));
  });

  const CUSTOM_TONE_KEY = "tc_custom_tones_v1";

  const loadCustomTones = () => {
    try {
      if (typeof localStorage === "undefined") return [];
      const raw = localStorage.getItem(CUSTOM_TONE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_err) {
      showTokenToast("Không thể đọc Thư viện.");
      return [];
    }
  };

  const saveCustomTones = (list) => {
    try {
      if (typeof localStorage === "undefined") return false;
      localStorage.setItem(CUSTOM_TONE_KEY, JSON.stringify(list));
      return true;
    } catch (_err) {
      showTokenToast("Không thể lưu vào Thư viện.");
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

  const getTokenColorsFromPanel = () => {
    const vars = parseTokenCssVars(tokenCssEl?.textContent || "");
    if (!vars) return null;
    return {
      a1: vars["--a1"],
      a2: vars["--a2"],
      a3: vars["--a3"],
      a1rgb: vars["--a1-rgb"],
      a2rgb: vars["--a2-rgb"],
      a3rgb: vars["--a3-rgb"]
    };
  };

  saveToneBtn?.addEventListener("click", () => {
    const colors = getTokenColorsFromPanel();
    if (!colors?.a1) {
      showTokenToast("Chưa có token để lưu.");
      return;
    }
    const list = loadCustomTones();
    const index = list.length + 1;
    const rawName = (toneNameInput?.value || "").trim();
    const name = rawName || `Sắc thái tuỳ chỉnh #${index}`;
    const tone = {
      id: `ct_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name,
      colors,
      createdAt: new Date().toISOString(),
      source: "aurora"
    };
    if (upsertCustomTone(tone)) {
      showTokenToast("Đã lưu vào Thư viện.");
      if (toneNameInput) toneNameInput.value = "";
    }
  });

  const previewVars = ["--a1", "--a2", "--a3", "--a1-rgb", "--a2-rgb", "--a3-rgb"];
  let previewActive = false;
  let previewSnapshot = null;

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

  const parseRgbValue = (value) => {
    if (!value) return null;
    const nums = value.match(/[\d.]+/g);
    if (!nums || nums.length < 3) return null;
    const parts = nums.slice(0, 3).map((n) => Math.round(parseFloat(n)));
    if (parts.some((n) => Number.isNaN(n))) return null;
    return `${parts[0]} ${parts[1]} ${parts[2]}`;
  };

  const parseTokenCssVars = (text) => {
    if (!text) return null;
    const grab = (name) => {
      const match = text.match(new RegExp(`${name}\\s*:\\s*([^;]+);`, "i"));
      return match ? match[1].trim() : "";
    };
    const a1 = (() => {
      const raw = grab("--a1");
      return raw ? (normalizeHex(raw) || rgbCssToHex(raw)) : null;
    })();
    const a2 = (() => {
      const raw = grab("--a2");
      return raw ? (normalizeHex(raw) || rgbCssToHex(raw)) : null;
    })();
    const a3 = (() => {
      const raw = grab("--a3");
      return raw ? (normalizeHex(raw) || rgbCssToHex(raw)) : null;
    })();
    if (!a1 && !a2 && !a3) return null;
    const a1rgb = parseRgbValue(grab("--a1-rgb")) || (a1 ? hexToRgbString(a1) : null);
    const a2rgb = parseRgbValue(grab("--a2-rgb")) || (a2 ? hexToRgbString(a2) : null);
    const a3rgb = parseRgbValue(grab("--a3-rgb")) || (a3 ? hexToRgbString(a3) : null);
    return {
      "--a1": a1,
      "--a2": a2 || a1,
      "--a3": a3 || a2 || a1,
      "--a1-rgb": a1rgb,
      "--a2-rgb": a2rgb || a1rgb,
      "--a3-rgb": a3rgb || a2rgb || a1rgb
    };
  };

  const setPreviewUi = (active) => {
    if (active) {
      document.body?.setAttribute("data-preview-theme", "1");
      previewBtn?.classList.add("hidden");
      resetBtn?.classList.remove("hidden");
      previewBadge?.classList.remove("hidden");
    } else {
      document.body?.removeAttribute("data-preview-theme");
      previewBtn?.classList.remove("hidden");
      resetBtn?.classList.add("hidden");
      previewBadge?.classList.add("hidden");
    }
  };

  const resetPreview = () => {
    if (!previewActive) return;
    restoreThemeVars(previewSnapshot, previewVars);
    previewSnapshot = null;
    previewActive = false;
    setPreviewUi(false);
  };

  const applyPreview = () => {
    const tokenText = tokenCssEl?.textContent || "";
    const vars = parseTokenCssVars(tokenText);
    if (!vars) return;
    if (!previewActive) {
      previewSnapshot = snapshotThemeVars(previewVars);
    }
    applyThemeVars(vars);
    previewActive = true;
    setPreviewUi(true);
  };

  previewBtn?.addEventListener("click", applyPreview);
  resetBtn?.addEventListener("click", resetPreview);

  document.addEventListener("tc-world-changed", () => {
    if (previewActive) resetPreview();
  });

  if (typeof MutationObserver !== "undefined" && document.documentElement) {
    const observer = new MutationObserver((mutations) => {
      if (!previewActive) return;
      const changed = mutations.some((m) => m.type === "attributes" && m.attributeName === "data-world");
      if (changed) resetPreview();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-world"] });
  }

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
  bindAuroraSwatchCopy();
  syncHeroAurora();
  renderAuroraTokenPanel({});

  const chipThreadMap = document.getElementById("qaChipThreadMap");
  const chipDeltaE = document.getElementById("qaChipDeltaE");
  const chipBrandFilter = document.getElementById("qaChipBrandFilter");
  const chipHint = document.getElementById("qaChipHint");

  const showChipHint = (text) => {
    if (!chipHint) return;
    chipHint.textContent = text;
    chipHint.classList.remove("hidden");
    window.clearTimeout(showChipHint._t);
    showChipHint._t = window.setTimeout(() => {
      chipHint.classList.add("hidden");
    }, 1400);
  };

  chipThreadMap?.addEventListener("click", () => {
    setActiveTab("thread");
    const input = document.getElementById("qaThreadHex");
    input?.focus();
    input?.select?.();
  });

  chipDeltaE?.addEventListener("click", () => {
    chipDeltaE.classList.toggle("is-active");
    showChipHint("ΔE sẽ hiển thị khi có dữ liệu so khớp.");
  });

  chipBrandFilter?.addEventListener("click", () => {
    chipBrandFilter.classList.toggle("is-active");
    showChipHint("Bộ lọc hãng sẽ ưu tiên trong danh sách tra mã.");
  });

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
    updateAuroraPreview({ mode: "paste", hexes: pasteColors });
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
    try {
      const results = await findNearestThreads(hex, 5);
      const hexes = pickTopHexes([hex, ...results.map((item) => item.hex)], 3);
      const suggestions = buildThreadSuggestions(results);
      updateAuroraPreview({ mode: "thread", hexes, suggestions });
      threadList.innerHTML = results.map((item) => `
        <li class="flex items-center gap-2">
          ${swatchHtml(item.hex)}
          <span class="font-semibold">${item.brand} ${item.code}</span>
          <span class="tc-muted text-xs">${item.name || ""}</span>
          <span class="tc-muted text-xs">${item.hex}</span>
        </li>
      `).join("");
      setOpenLink(threadOpen, `./worlds/threadcolor.html#${buildHash([hex], "c")}`);
    } catch (_err) {
      threadList.innerHTML = "<li class=\"tc-muted\">Có lỗi khi tải dữ liệu, vui lòng thử lại.</li>";
      hideOpenLink(threadOpen);
    }
  });

  const initImageTab = () => {
    const imageInput = document.getElementById("qaImageInput");
    const imageAnalyze = document.getElementById("qaImageAnalyze");
    const imageSwatches = document.getElementById("qaImageSwatches");
    const imageThreads = document.getElementById("qaImageThreads");
    const imageOpen = document.getElementById("qaImageOpen");
    const imagePreview = document.getElementById("qaImagePreview");
    let imagePreviewUrl = "";

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

    const clearImagePreview = () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
        imagePreviewUrl = "";
      }
      if (imagePreview) {
        imagePreview.src = "";
        imagePreview.classList.add("hidden");
      }
    };

    const showImagePreview = (file) => {
      if (!imagePreview || !file || !file.type.startsWith("image/")) return;
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
      imagePreviewUrl = URL.createObjectURL(file);
      imagePreview.src = imagePreviewUrl;
      imagePreview.classList.remove("hidden");
    };

    imageInput?.addEventListener("change", () => {
      const file = imageInput?.files?.[0];
      if (!file || !file.type.startsWith("image/")) {
        clearImagePreview();
        return;
      }
      showImagePreview(file);
    });

    imageAnalyze?.addEventListener("click", async () => {
      const file = imageInput?.files?.[0];
      if (!file) return;
      const colors = await extractPalette(file);
      updateAuroraPreview({ mode: "image", hexes: colors });
      imageSwatches.innerHTML = colors.map(swatchHtml).join("");
      const results = await Promise.all(colors.map((hex) => findNearestThreads(hex, 3)));
      const flatResults = results.flat();
      const imageSuggestions = buildThreadSuggestions(flatResults);
      if (imageSuggestions.length) {
        updateAuroraPreview({ mode: "image", hexes: colors, suggestions: imageSuggestions });
      }
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

  document.addEventListener("tc-world-changed", () => syncHeroAurora());
  document.addEventListener("tc:tone-changed", () => syncHeroAurora());

  if (typeof MutationObserver !== "undefined" && document.documentElement) {
    const toneObserver = new MutationObserver((mutations) => {
      const changed = mutations.some((m) => m.type === "attributes" && m.attributeName === "data-world");
      if (changed) syncHeroAurora();
    });
    toneObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-world"] });
  }
})();


