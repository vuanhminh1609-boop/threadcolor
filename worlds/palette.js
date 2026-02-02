import { composeHandoff } from "../scripts/handoff.js";

const MIN_STOPS = 2;
const MAX_STOPS = 7;
const ASSET_STORAGE_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const FEED_STORAGE_KEY = "tc_community_feed";
const HANDOFF_FROM = "palette";
const THREAD_BRAND_PRIORITY = ["Gingko", "Ming Shyang", "Marathon", "DMC"];
const KNOWLEDGE_URL = "../assets/knowledge/palette_knowledge_vi.json";

const FALLBACK_KNOWLEDGE = {
  goals: {
    ui: { keywords: ["website", "ui", "web", "giao dien", "giao diện"] },
    brand: { keywords: ["brand", "thuong hieu", "thương hiệu", "nhan dien", "nhận diện"] },
    embroidery: { keywords: ["theu", "thêu", "chi", "chỉ"] },
    print: { keywords: ["in", "cmyk", "print"] }
  },
  moods: [
    { key: "sang", label: "Sang", keywords: ["sang", "cao cap", "cao cấp"], h: 210, s: 28, l: 48 },
    { key: "tre", label: "Trẻ", keywords: ["tre", "trẻ", "nang dong", "năng động"], h: 20, s: 75, l: 55 },
    { key: "am", label: "Ấm", keywords: ["am", "ấm", "ap", "ấm áp"], h: 25, s: 55, l: 52 },
    { key: "lanh", label: "Lạnh", keywords: ["lanh", "lạnh", "mat", "mát"], h: 205, s: 50, l: 50 },
    { key: "tu_nhien", label: "Tự nhiên", keywords: ["tu nhien", "tự nhiên", "xanh la", "xanh lá"], h: 120, s: 40, l: 45 },
    { key: "toi_gian", label: "Tối giản", keywords: ["toi gian", "tối giản", "nhe", "nhẹ"], h: 220, s: 12, l: 65 }
  ],
  defaults: { h: 210, s: 35, l: 50 }
};

const state = {
  palettes: [],
  hashPalette: null,
  selectedPaletteId: "",
  lockedSlots: {},
  generatorStops: []
};

const el = {
  grid: document.getElementById("paletteGrid"),
  empty: document.getElementById("paletteEmpty"),
  saveLibrary: document.getElementById("paletteSaveLibrary"),
  useLibrary: document.getElementById("paletteUseLibrary"),
  share: document.getElementById("paletteShare"),
  hexInput: document.getElementById("paletteHexInput"),
  hexApply: document.getElementById("paletteHexApply"),
  baseColor: document.getElementById("paletteBaseColor"),
  harmonySelect: document.getElementById("paletteHarmony"),
  harmonyApply: document.getElementById("paletteHarmonyApply"),
  toneSelect: document.getElementById("paletteTone"),
  toneApply: document.getElementById("paletteToneApply"),
  lockRow: document.getElementById("paletteLockRow"),
  lockClear: document.getElementById("paletteLockClear"),
  goalSelect: document.getElementById("paletteGoal"),
  sourceSelect: document.getElementById("paletteSource"),
  boldnessRange: document.getElementById("paletteBoldness"),
  suggestBtn: document.getElementById("paletteSuggest"),
  suggestGrid: document.getElementById("paletteSuggestGrid"),
  smartBrief: document.getElementById("paletteSmartBrief"),
  smartGenerate: document.getElementById("paletteSmartGenerate"),
  smartGrid: document.getElementById("paletteSmartGrid"),
  briefPick: document.getElementById("paletteSmartPick"),
  briefSheet: document.getElementById("paletteBriefSheet"),
  briefIndustry: document.getElementById("paletteBriefIndustry"),
  briefList: document.getElementById("paletteBriefList")
};

function normalizeHex(input) {
  if (!input) return null;
  let value = String(input).trim();
  if (!value) return null;
  if (!value.startsWith("#")) value = `#${value}`;
  value = value.toLowerCase();
  return /^#[0-9a-f]{6}$/.test(value) ? value : null;
}

function hexToRgb(hex) {
  const cleaned = normalizeHex(hex);
  if (!cleaned) return null;
  const raw = cleaned.replace("#", "");
  return {
    r: parseInt(raw.slice(0, 2), 16),
    g: parseInt(raw.slice(2, 4), 16),
    b: parseInt(raw.slice(4, 6), 16)
  };
}

function rgbToHsl({ r, g, b }) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
  const sat = Math.max(0, Math.min(100, s)) / 100;
  const light = Math.max(0, Math.min(100, l)) / 100;
  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = light - c / 2;
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (h >= 0 && h < 60) {
    r1 = c; g1 = x; b1 = 0;
  } else if (h < 120) {
    r1 = x; g1 = c; b1 = 0;
  } else if (h < 180) {
    r1 = 0; g1 = c; b1 = x;
  } else if (h < 240) {
    r1 = 0; g1 = x; b1 = c;
  } else if (h < 300) {
    r1 = x; g1 = 0; b1 = c;
  } else {
    r1 = c; g1 = 0; b1 = x;
  }
  const toHex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r1)}${toHex(g1)}${toHex(b1)}`.toUpperCase();
}

function rgbToLab({ r, g, b }) {
  let rn = r / 255;
  let gn = g / 255;
  let bn = b / 255;
  rn = rn > 0.04045 ? Math.pow((rn + 0.055) / 1.055, 2.4) : rn / 12.92;
  gn = gn > 0.04045 ? Math.pow((gn + 0.055) / 1.055, 2.4) : gn / 12.92;
  bn = bn > 0.04045 ? Math.pow((bn + 0.055) / 1.055, 2.4) : bn / 12.92;

  let x = (rn * 0.4124 + gn * 0.3576 + bn * 0.1805) / 0.95047;
  let y = (rn * 0.2126 + gn * 0.7152 + bn * 0.0722);
  let z = (rn * 0.0193 + gn * 0.1192 + bn * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.cbrt(x) : (7.787 * x + 16 / 116);
  y = y > 0.008856 ? Math.cbrt(y) : (7.787 * y + 16 / 116);
  z = z > 0.008856 ? Math.cbrt(z) : (7.787 * z + 16 / 116);

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

function deltaE76(lab1, lab2) {
  if (!lab1 || !lab2) return null;
  return Math.sqrt(
    (lab1[0] - lab2[0]) ** 2 +
    (lab1[1] - lab2[1]) ** 2 +
    (lab1[2] - lab2[2]) ** 2
  );
}

function getLabForHex(hex) {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToLab(rgb) : null;
}

function clampNumber(value, min, max) {
  const num = Number(value);
  if (Number.isNaN(num)) return min;
  return Math.max(min, Math.min(max, num));
}

function rgbToCmykApprox({ r, g, b }) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k >= 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = (1 - rn - k) / (1 - k);
  const m = (1 - gn - k) / (1 - k);
  const y = (1 - bn - k) / (1 - k);
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100)
  };
}

function formatCmyk(cmyk) {
  if (!cmyk) return "--";
  return `${cmyk.c}/${cmyk.m}/${cmyk.y}/${cmyk.k}`;
}

function gradientCss(stops) {
  const total = stops.length;
  if (total <= 1) return stops[0] || "#000000";
  const parts = stops.map((hex, idx) => {
    const pct = Math.round((idx / (total - 1)) * 100);
    return `${hex} ${pct}%`;
  });
  return `linear-gradient(90deg, ${parts.join(", ")})`;
}

function relativeLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const toLinear = (c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const r = toLinear(rgb.r);
  const g = toLinear(rgb.g);
  const b = toLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hexA, hexB) {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

function getBestText(hex) {
  const black = "#000000";
  const white = "#FFFFFF";
  const contrastWithBlack = contrastRatio(hex, black);
  const contrastWithWhite = contrastRatio(hex, white);
  if (contrastWithBlack >= contrastWithWhite) {
    return { text: black, label: "Chữ đen", ratio: contrastWithBlack };
  }
  return { text: white, label: "Chữ trắng", ratio: contrastWithWhite };
}

function buildShareLink(stops) {
  const payload = encodeURIComponent(stops.join(","));
  return `${window.location.origin}${window.location.pathname}#p=${payload}`;
}

let knowledgeCache = null;
let showAllIndustries = false;
async function loadKnowledge() {
  if (knowledgeCache) return knowledgeCache;
  try {
    const res = await fetch(KNOWLEDGE_URL, { cache: "no-store" });
    const data = await res.json();
    knowledgeCache = data || FALLBACK_KNOWLEDGE;
  } catch (_err) {
    knowledgeCache = FALLBACK_KNOWLEDGE;
  }
  return knowledgeCache;
}

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function pickGoal(normalized, knowledge) {
  const goals = knowledge?.goals || FALLBACK_KNOWLEDGE.goals;
  for (const [key, value] of Object.entries(goals)) {
    const keywords = value?.keywords || [];
    if (keywords.some((kw) => normalized.includes(normalizeText(kw)))) {
      return key;
    }
  }
  return "ui";
}

function pickMood(normalized, knowledge) {
  const moods = knowledge?.moods || FALLBACK_KNOWLEDGE.moods;
  for (const mood of moods) {
    const keywords = mood?.keywords || [];
    if (keywords.some((kw) => normalized.includes(normalizeText(kw)))) {
      return mood;
    }
  }
  return knowledge?.defaults || FALLBACK_KNOWLEDGE.defaults;
}

async function parseBrief(brief) {
  const knowledge = await loadKnowledge();
  const normalized = normalizeText(brief);
  const goal = pickGoal(normalized, knowledge);
  const mood = pickMood(normalized, knowledge);
  const boldness = detectBoldness(normalized);
  return { goal, mood, boldness };
}

function goalDisplay(goal) {
  if (goal === "brand") return "Brand";
  if (goal === "embroidery") return "Ngành thêu";
  if (goal === "print") return "In ấn";
  return "Website/UI";
}

function detectBoldness(normalized) {
  if (/(noi bat|nổi bật|manh|mạnh|cao|ruc|rực)/.test(normalized)) return 70;
  if (/(an toan|an toàn|toi gian|tối giản|nhe|nhẹ|tinh te|tinh tế)/.test(normalized)) return 25;
  return 45;
}

function ensureUiContrast(roles) {
  if (!roles?.background || !roles?.text) return roles;
  const ratio = contrastRatio(roles.background, roles.text);
  if (ratio >= 4.5) return roles;
  const black = "#111111";
  const white = "#FFFFFF";
  const contrastBlack = contrastRatio(roles.background, black);
  const contrastWhite = contrastRatio(roles.background, white);
  return {
    ...roles,
    text: contrastBlack >= contrastWhite ? black : white
  };
}

function buildBaseHex(goal, mood) {
  const base = mood || FALLBACK_KNOWLEDGE.defaults;
  const h = typeof base.h === "number" ? base.h : FALLBACK_KNOWLEDGE.defaults.h;
  let s = typeof base.s === "number" ? base.s : FALLBACK_KNOWLEDGE.defaults.s;
  let l = typeof base.l === "number" ? base.l : FALLBACK_KNOWLEDGE.defaults.l;
  if (goal === "embroidery") s = Math.min(s, 45);
  if (goal === "print") s = Math.min(s, 55);
  return hslToHex(h, s, l);
}

function getSaturation(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const hsl = rgbToHsl(rgb);
  return hsl.s;
}

function getBriefTemplates(knowledge) {
  const list = Array.isArray(knowledge?.briefTemplates) ? knowledge.briefTemplates : [];
  return list.filter((item) => item?.id && Array.isArray(item.briefs));
}

function getDefaultIndustryIds(knowledge) {
  const ids = Array.isArray(knowledge?.defaultIndustryIds) ? knowledge.defaultIndustryIds : [];
  return ids.filter(Boolean);
}

function openBriefSheet() {
  if (!el.briefSheet) return;
  el.briefSheet.classList.remove("hidden");
}

function closeBriefSheet() {
  if (!el.briefSheet) return;
  el.briefSheet.classList.add("hidden");
}

function renderBriefIndustries(templates) {
  if (!el.briefIndustry || !el.briefList) return;
  el.briefIndustry.scrollTop = 0;
  el.briefIndustry.innerHTML = "";
  el.briefList.innerHTML = "";
  const defaultIds = getDefaultIndustryIds(knowledgeCache);
  const defaults = defaultIds.length
    ? templates.filter((item) => defaultIds.includes(item.id))
    : templates.slice(0, 6);
  const rest = templates.filter((item) => !defaults.includes(item));

  const addGroupLabel = (text) => {
    const label = document.createElement("div");
    label.className = "w-full text-[11px] font-semibold tc-muted";
    label.textContent = text;
    el.briefIndustry.appendChild(label);
  };

  addGroupLabel("Ngành phổ biến");
  defaults.forEach((template, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    btn.textContent = template.industryLabel;
    btn.addEventListener("click", () => {
      renderBriefList(template);
      const all = el.briefIndustry.querySelectorAll("button");
      all.forEach((item) => item.classList.remove("tc-btn-primary"));
      btn.classList.add("tc-btn-primary");
    });
    if (idx === 0) btn.classList.add("tc-btn-primary");
    el.briefIndustry.appendChild(btn);
  });

  if (rest.length) {
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "tc-btn tc-chip px-3 py-2 text-xs";
    toggle.textContent = showAllIndustries ? "Thu gọn" : "Xem thêm ngành";
    toggle.addEventListener("click", () => {
      showAllIndustries = !showAllIndustries;
      renderBriefIndustries(templates);
    });
    el.briefIndustry.appendChild(toggle);
  }

  if (showAllIndustries && rest.length) {
    addGroupLabel("Tất cả ngành");
    rest.forEach((template) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tc-btn tc-chip px-3 py-2 text-xs";
      btn.textContent = template.industryLabel;
      btn.addEventListener("click", () => {
        renderBriefList(template);
        const all = el.briefIndustry.querySelectorAll("button");
        all.forEach((item) => item.classList.remove("tc-btn-primary"));
        btn.classList.add("tc-btn-primary");
      });
      el.briefIndustry.appendChild(btn);
    });
  }

  if (defaults.length) {
    renderBriefList(defaults[0]);
  } else if (templates.length) {
    renderBriefList(templates[0]);
  }
}

function renderBriefList(template) {
  if (!el.briefList) return;
  el.briefList.innerHTML = "";
  template.briefs.forEach((brief) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tc-btn tc-chip px-3 py-2 text-xs text-left";
    btn.textContent = brief;
    btn.addEventListener("click", () => {
      if (el.smartBrief) {
        el.smartBrief.value = brief;
        el.smartBrief.dispatchEvent(new Event("input", { bubbles: true }));
      }
      closeBriefSheet();
    });
    el.briefList.appendChild(btn);
  });
}

let threadsLoaded = false;
let threadsAll = [];
const threadsByBrand = new Map();

async function ensureThreadsLoaded() {
  if (threadsLoaded) return;
  try {
    const res = await fetch("../threads.json", { cache: "no-store" });
    const data = await res.json();
    const list = Array.isArray(data) ? data : [];
    list.forEach((thread) => {
      if (!thread?.hex) return;
      const lab = Array.isArray(thread.lab) && thread.lab.length === 3
        ? thread.lab
        : getLabForHex(thread.hex);
      const normalized = {
        ...thread,
        lab
      };
      threadsAll.push(normalized);
      const brand = (thread.brand || "").trim();
      if (!threadsByBrand.has(brand)) threadsByBrand.set(brand, []);
      threadsByBrand.get(brand).push(normalized);
    });
  } catch (_err) {
    threadsAll = [];
    threadsByBrand.clear();
  }
  threadsLoaded = true;
}

function findNearestThread(hex) {
  const targetLab = getLabForHex(hex);
  if (!targetLab) return null;
  const findBestInList = (list) => {
    if (!list?.length) return null;
    let best = null;
    for (const item of list) {
      const delta = deltaE76(targetLab, item.lab);
      if (delta === null) continue;
      if (!best || delta < best.delta) {
        best = { thread: item, delta };
      }
    }
    return best;
  };
  for (const brand of THREAD_BRAND_PRIORITY) {
    const best = findBestInList(threadsByBrand.get(brand));
    if (best) {
      return { ...best.thread, delta: best.delta };
    }
  }
  const fallback = findBestInList(threadsAll);
  return fallback ? { ...fallback.thread, delta: fallback.delta } : null;
}

function shuffle(array) {
  const next = [...array];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function scoreContrast(stops) {
  if (stops.length < 2) return 0;
  const background = stops[0];
  const text = stops[2] || stops[1] || stops[0];
  return contrastRatio(background, text);
}

function buildRolePalette(baseHex, goal, boldness) {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return [];
  const hsl = rgbToHsl(rgb);
  const hueShift = 18 + Math.round((boldness / 100) * 42);
  const accentShift = 120 + Math.round((boldness / 100) * 60);
  const baseLight = clampNumber(hsl.l, 20, 80);
  const satBoost = goal === "brand" ? 10 : 0;

  const background = hslToHex(hsl.h, clampNumber(hsl.s - 20, 8, 45), clampNumber(baseLight + 32, 80, 96));
  const surface = hslToHex(hsl.h, clampNumber(hsl.s - 10, 10, 50), clampNumber(baseLight + 18, 65, 88));
  const text = hslToHex(hsl.h, clampNumber(hsl.s + satBoost, 20, 65), clampNumber(baseLight - 32, 10, 35));
  const primary = hslToHex((hsl.h + hueShift) % 360, clampNumber(hsl.s + satBoost + 10, 35, 80), clampNumber(baseLight, 35, 60));
  const accent = hslToHex((hsl.h + accentShift) % 360, clampNumber(hsl.s + satBoost + 15, 40, 90), clampNumber(baseLight + 4, 40, 65));

  return [background, surface, text, primary, accent].map((hex) => hex.toUpperCase());
}

function getSourceSeedHexes(source) {
  if (source === "current") {
    const active = getActivePalette();
    return active?.stops?.length ? active.stops.slice(0, 5) : [];
  }
  if (source === "hexhub") {
    const list = state.generatorStops.length ? state.generatorStops : (state.palettes[0]?.stops || []);
    return list.slice(0, 5);
  }
  if (source === "random") {
    return buildTonePalette("fresh", 5);
  }
  const primary = normalizeHex(el.baseColor?.value || "") || "#0EA5E9";
  return [primary];
}

function buildSuggestions(goal, source, boldness) {
  const seeds = getSourceSeedHexes(source);
  const primary = seeds[0] || "#0EA5E9";
  const base = buildRolePalette(primary, goal, boldness);
  if (!base.length) return [];
  const suggestions = [];
  const variants = [
    { tweak: 0, label: "Chuẩn" },
    { tweak: 10, label: "Tươi hơn" },
    { tweak: -10, label: "Trầm hơn" },
    { tweak: 20, label: "Nổi bật" },
    { tweak: -20, label: "An toàn" },
    { tweak: 5, label: "Cân bằng" }
  ];
  variants.slice(0, 6).forEach((variant, idx) => {
    const adjusted = base.map((hex) => {
      const rgb = hexToRgb(hex);
      if (!rgb) return hex;
      const hsl = rgbToHsl(rgb);
      const nextL = clampNumber(hsl.l + variant.tweak, 8, 96);
      return hslToHex(hsl.h, hsl.s, nextL).toUpperCase();
    });
    const scored = scoreContrast(adjusted);
    suggestions.push({
      id: `suggest_${Date.now()}_${idx}`,
      label: variant.label,
      score: scored,
      roles: {
        background: adjusted[0],
        surface: adjusted[1],
        text: adjusted[2],
        primary: adjusted[3],
        accent: adjusted[4]
      },
      stops: adjusted
    });
  });
  return suggestions;
}

async function enrichSuggestions(goal, suggestions) {
  if (!suggestions.length) return suggestions;
  if (goal === "embroidery") {
    await ensureThreadsLoaded();
    suggestions.forEach((suggestion) => {
      suggestion.threadMatches = suggestion.stops.map((hex) => findNearestThread(hex));
    });
  }
  if (goal === "print") {
    suggestions.forEach((suggestion) => {
      suggestion.cmykList = suggestion.stops.map((hex) => {
        const rgb = hexToRgb(hex);
        return rgb ? rgbToCmykApprox(rgb) : null;
      });
    });
  }
  return suggestions;
}

function buildSmartSuggestions(goal, mood, boldness) {
  const baseHex = buildBaseHex(goal, mood);
  const base = buildRolePalette(baseHex, goal === "brand" ? "brand" : "ui", boldness);
  if (!base.length) return [];
  const variants = [
    { tweak: 0, label: "Chuẩn" },
    { tweak: 10, label: "Tươi hơn" },
    { tweak: -10, label: "Trầm hơn" },
    { tweak: 15, label: "Nổi bật" },
    { tweak: -15, label: "An toàn" },
    { tweak: 5, label: "Cân bằng" }
  ];
  return variants.map((variant, idx) => {
    const adjusted = base.map((hex) => {
      const rgb = hexToRgb(hex);
      if (!rgb) return hex;
      const hsl = rgbToHsl(rgb);
      const nextL = clampNumber(hsl.l + variant.tweak, 8, 96);
      return hslToHex(hsl.h, hsl.s, nextL).toUpperCase();
    });
    if (goal === "brand") {
      adjusted[3] = baseHex;
    }
    let roles = {
      background: adjusted[0],
      surface: adjusted[1],
      text: adjusted[2],
      primary: adjusted[3],
      accent: adjusted[4]
    };
    if (goal === "ui") {
      roles = ensureUiContrast(roles);
      adjusted[2] = roles.text;
    }
    const avgSaturation = adjusted.reduce((sum, hex) => sum + getSaturation(hex), 0) / adjusted.length;
    const note = goal === "print" && avgSaturation > 70
      ? "Cảnh báo: màu rực, CMYK xấp xỉ (chưa ICC)."
      : "";
    return {
      id: `smart_${Date.now()}_${idx}`,
      label: variant.label,
      roles,
      stops: adjusted,
      goal,
      note
    };
  });
}

function renderSmartCard(suggestion, goalLabelText, moodLabel) {
  const card = document.createElement("div");
  card.className = "tc-card p-3 space-y-2";

  const head = document.createElement("div");
  head.className = "flex items-center justify-between";
  head.innerHTML = `<span class="text-xs font-semibold">${goalLabelText}</span><span class="text-[10px] tc-muted">${moodLabel}</span>`;

  const roleGrid = document.createElement("div");
  roleGrid.className = "grid grid-cols-2 gap-2 text-[10px]";
  Object.entries({
    "Nền": suggestion.roles.background,
    "Bề mặt": suggestion.roles.surface,
    "Chữ": suggestion.roles.text,
    "Primary": suggestion.roles.primary,
    "Accent": suggestion.roles.accent
  }).forEach(([label, hex]) => {
    const cell = document.createElement("div");
    cell.className = "flex items-center gap-2";
    cell.innerHTML = `<span class="w-4 h-4 rounded border" style="background:${hex}"></span><span>${label}</span>`;
    roleGrid.appendChild(cell);
  });

  if (suggestion.note) {
    const note = document.createElement("div");
    note.className = "text-[10px] tc-muted";
    note.textContent = suggestion.note;
    card.appendChild(note);
  }

  const actions = document.createElement("div");
  actions.className = "flex flex-wrap gap-2";
  const useBtn = document.createElement("button");
  useBtn.className = "tc-btn tc-btn-primary px-3 py-2 text-xs";
  useBtn.type = "button";
  useBtn.textContent = "Dùng ngay";
  useBtn.addEventListener("click", () => {
    createUserPalette(suggestion.stops, "Palette từ brief 1 dòng", ["smart", suggestion.goal]);
  });
  const saveBtn = document.createElement("button");
  saveBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  saveBtn.type = "button";
  saveBtn.textContent = "Lưu";
  saveBtn.addEventListener("click", () => {
    const palette = {
      id: `smart_${Date.now()}`,
      ten: "Palette từ brief 1 dòng",
      tags: ["smart", suggestion.goal],
      stops: suggestion.stops
    };
    const ok = addAssetToLibrary(buildPaletteAsset(palette));
    showToast(ok ? "Đã lưu gợi ý vào Thư viện." : "Không thể lưu gợi ý.");
  });
  const copyBtn = document.createElement("button");
  copyBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  copyBtn.type = "button";
  copyBtn.textContent = "Sao chép tokens";
  copyBtn.addEventListener("click", async () => {
    const ok = await copyText(tokensFor(suggestion.stops));
    showToast(ok ? "Đã sao chép token." : "Không thể sao chép.");
  });
  actions.appendChild(useBtn);
  actions.appendChild(saveBtn);
  actions.appendChild(copyBtn);

  card.appendChild(head);
  card.appendChild(roleGrid);
  card.appendChild(actions);
  return card;
}

function renderSmartSuggestions(list, goalLabelText, moodLabel) {
  if (!el.smartGrid) return;
  el.smartGrid.innerHTML = "";
  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "tc-card p-3 text-xs tc-muted";
    empty.textContent = "Chưa có gợi ý phù hợp.";
    el.smartGrid.appendChild(empty);
    return;
  }
  list.forEach((item) => {
    el.smartGrid.appendChild(renderSmartCard(item, goalLabelText, moodLabel));
  });
}

function renderSuggestCard(suggestion) {
  const card = document.createElement("div");
  card.className = "tc-card p-3 space-y-2";

  const head = document.createElement("div");
  head.className = "flex items-center justify-between";
  head.innerHTML = `<span class="text-xs font-semibold">${suggestion.label}</span><span class="text-[10px] tc-muted">Chấm điểm ${suggestion.score.toFixed(2)}</span>`;

  const roleGrid = document.createElement("div");
  roleGrid.className = "grid grid-cols-2 gap-2 text-[10px]";
  const roles = suggestion.roles;
  Object.entries({
    "Nền": roles.background,
    "Bề mặt": roles.surface,
    "Chữ": roles.text,
    "Primary": roles.primary,
    "Accent": roles.accent
  }).forEach(([label, hex]) => {
    const cell = document.createElement("div");
    cell.className = "flex items-center gap-2";
    cell.innerHTML = `<span class="w-4 h-4 rounded border" style="background:${hex}"></span><span>${label}</span>`;
    roleGrid.appendChild(cell);
  });

  if (suggestion.threadMatches?.length) {
    const wrap = document.createElement("div");
    wrap.className = "space-y-1 text-[10px]";
    const title = document.createElement("div");
    title.className = "tc-muted";
    title.textContent = "Mã chỉ gợi ý (ΔE):";
    const list = document.createElement("div");
    list.className = "flex flex-wrap gap-2";
    suggestion.threadMatches.forEach((item) => {
      const chip = document.createElement("span");
      chip.className = "tc-chip px-2 py-1 rounded-full";
      if (!item) {
        chip.textContent = "—";
      } else {
        const delta = typeof item.delta === "number" ? item.delta.toFixed(2) : "--";
        chip.textContent = `${item.brand || "?"} ${item.code || ""} · ΔE ${delta}`;
      }
      list.appendChild(chip);
    });
    wrap.appendChild(title);
    wrap.appendChild(list);
    card.appendChild(wrap);
  }

  if (suggestion.cmykList?.length) {
    const wrap = document.createElement("div");
    wrap.className = "space-y-1 text-[10px]";
    const title = document.createElement("div");
    title.className = "tc-muted";
    title.textContent = "CMYK xấp xỉ (chưa ICC):";
    const list = document.createElement("div");
    list.className = "flex flex-wrap gap-2";
    suggestion.cmykList.forEach((item) => {
      const chip = document.createElement("span");
      chip.className = "tc-chip px-2 py-1 rounded-full";
      chip.textContent = formatCmyk(item);
      list.appendChild(chip);
    });
    wrap.appendChild(title);
    wrap.appendChild(list);
    card.appendChild(wrap);
  }

  const actions = document.createElement("div");
  actions.className = "flex flex-wrap gap-2";
  const useBtn = document.createElement("button");
  useBtn.className = "tc-btn tc-btn-primary px-3 py-2 text-xs";
  useBtn.type = "button";
  useBtn.textContent = "Dùng ngay";
  useBtn.addEventListener("click", () => {
    createUserPalette(suggestion.stops, "Palette gợi ý theo mục tiêu", ["suggest", goalLabel(el.goalSelect?.value)]);
  });
  const saveBtn = document.createElement("button");
  saveBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  saveBtn.type = "button";
  saveBtn.textContent = "Lưu";
  saveBtn.addEventListener("click", () => {
    const palette = {
      id: `suggest_${Date.now()}`,
      ten: "Palette gợi ý theo mục tiêu",
      tags: ["suggest"],
      stops: suggestion.stops
    };
    const ok = addAssetToLibrary(buildPaletteAsset(palette));
    showToast(ok ? "Đã lưu gợi ý vào Thư viện." : "Không thể lưu gợi ý.");
  });
  const copyBtn = document.createElement("button");
  copyBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  copyBtn.type = "button";
  copyBtn.textContent = "Sao chép";
  copyBtn.addEventListener("click", async () => {
    const ok = await copyText(suggestion.stops.join(", "));
    showToast(ok ? "Đã sao chép HEX." : "Không thể sao chép.");
  });
  const openThread = document.createElement("button");
  openThread.className = "tc-btn tc-chip px-3 py-2 text-xs";
  openThread.type = "button";
  openThread.textContent = "Mở ở Thêu";
  openThread.addEventListener("click", () => {
    const target = suggestion.stops[0];
    if (!target) return;
    window.location.href = `./threadcolor.html?color=${encodeURIComponent(target)}`;
  });
  const openPrint = document.createElement("button");
  openPrint.className = "tc-btn tc-chip px-3 py-2 text-xs";
  openPrint.type = "button";
  openPrint.textContent = "Mở ở In";
  openPrint.addEventListener("click", () => {
    const payload = encodeURIComponent(suggestion.stops.join(","));
    window.location.href = `./printcolor.html#c=${payload}`;
  });
  actions.appendChild(useBtn);
  actions.appendChild(saveBtn);
  actions.appendChild(copyBtn);
  actions.appendChild(openThread);
  actions.appendChild(openPrint);

  card.appendChild(head);
  card.appendChild(roleGrid);
  card.appendChild(actions);
  return card;
}

function goalLabel(goal) {
  if (goal === "brand") return "brand";
  if (goal === "ui") return "ui";
  if (goal === "embroidery") return "embroidery";
  if (goal === "print") return "print";
  return "ui";
}

function renderSuggestions(suggestions) {
  if (!el.suggestGrid) return;
  el.suggestGrid.innerHTML = "";
  if (!suggestions.length) {
    const empty = document.createElement("div");
    empty.className = "tc-card p-3 text-xs tc-muted";
    empty.textContent = "Chưa có gợi ý phù hợp.";
    el.suggestGrid.appendChild(empty);
    return;
  }
  suggestions.forEach((suggestion) => {
    el.suggestGrid.appendChild(renderSuggestCard(suggestion));
  });
}
function tokensFor(stops) {
  return stops
    .map((hex, idx) => `  --mau-${String(idx + 1).padStart(2, "0")}: ${hex};`)
    .join("\n");
}

function exportText(palette) {
  const name = palette.ten || "Bảng phối màu";
  const stops = palette.stops || [];
  return `/* ${name} */\nHex: ${stops.join(", ")}\n\n:root {\n${tokensFor(stops)}\n}\n`;
}

function showToast(message) {
  let toast = document.getElementById("paletteToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "paletteToast";
    toast.className = "tc-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1400);
}

function buildPaletteAsset(palette) {
  const now = new Date().toISOString();
  return {
    id: `asset_${Date.now()}`,
    type: "palette",
    name: palette.ten || "Bảng phối màu",
    tags: Array.isArray(palette.tags) ? palette.tags : [],
    payload: { colors: palette.stops || [] },
    createdAt: now,
    updatedAt: now,
    sourceWorld: HANDOFF_FROM,
    project: getCurrentProject()
  };
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

function getSelectedPalette() {
  if (state.selectedPaletteId === "hash-palette") return state.hashPalette;
  if (!state.selectedPaletteId) return null;
  return state.palettes.find((item) => item.id === state.selectedPaletteId) || null;
}

function selectPalette(palette) {
  if (!palette) return;
  state.selectedPaletteId = palette.id || "";
}

function getActivePalette() {
  return getSelectedPalette() || state.hashPalette;
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

function renderPaletteCard(palette) {
  const card = document.createElement("div");
  card.className = "tc-card p-4 flex flex-col gap-3";
  card.dataset.paletteId = palette.id || "";

  const header = document.createElement("div");
  header.className = "flex items-start justify-between gap-3";

  const meta = document.createElement("div");
  const title = document.createElement("p");
  title.className = "text-sm font-semibold";
  title.textContent = palette.ten || "Bảng phối màu";
  const tags = document.createElement("p");
  tags.className = "tc-muted text-xs mt-1";
  tags.textContent = (palette.tags || []).join(" · ");
  meta.appendChild(title);
  meta.appendChild(tags);

  const actions = document.createElement("div");
  actions.className = "flex flex-wrap gap-2";

  const exportBtn = document.createElement("button");
  exportBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  exportBtn.type = "button";
  exportBtn.textContent = "Xuất Bản thông số";
  exportBtn.addEventListener("click", async () => {
    selectPalette(palette);
    const ok = await copyText(exportText(palette));
    showToast(ok ? "Đã sao chép bảng phối." : "Không thể sao chép.");
  });

  const bridgeBtn = document.createElement("button");
  bridgeBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  bridgeBtn.type = "button";
  bridgeBtn.textContent = "Biến thành dải";
  bridgeBtn.addEventListener("click", () => {
    selectPalette(palette);
    const stops = (palette.stops || []).join(",");
    window.location.href = `gradient.html#g=${encodeURIComponent(stops)}`;
  });

  actions.appendChild(exportBtn);
  actions.appendChild(bridgeBtn);

  const saveBtn = document.createElement("button");
  saveBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  saveBtn.type = "button";
  saveBtn.textContent = "Lưu vào Thư viện";
  saveBtn.addEventListener("click", () => {
    selectPalette(palette);
    const ok = addAssetToLibrary(buildPaletteAsset(palette));
    showToast(ok ? "Đã lưu vào Thư viện." : "Không thể lưu tài sản.");
  });

  actions.appendChild(saveBtn);

  header.appendChild(meta);
  header.appendChild(actions);

  const swatchRow = document.createElement("div");
  swatchRow.className = "tc-swatch-row";

  (palette.stops || []).forEach((hex) => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className = "tc-swatch";
    swatch.style.background = hex;
    swatch.textContent = hex.toUpperCase();
    swatch.addEventListener("click", async () => {
      const ok = await copyText(hex.toUpperCase());
      showToast(ok ? `Đã sao chép ${hex.toUpperCase()}` : "Không thể sao chép.");
    });
    swatchRow.appendChild(swatch);
  });

  const strip = document.createElement("div");
  strip.className = "tc-strip";
  strip.style.background = gradientCss(palette.stops || []);

  const contrastWrap = document.createElement("details");
  contrastWrap.className = "tc-card p-3";
  const contrastSummary = document.createElement("summary");
  contrastSummary.className = "cursor-pointer text-xs font-semibold";
  contrastSummary.textContent = "Kiểm tra tương phản";
  const contrastBody = document.createElement("div");
  contrastBody.className = "mt-2 grid gap-2";
  (palette.stops || []).slice(0, 5).forEach((hex) => {
    const best = getBestText(hex);
    const row = document.createElement("div");
    row.className = "flex items-center justify-between text-xs";
    row.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="w-4 h-4 rounded border" style="background:${hex}"></span>
        <span class="font-semibold">${hex.toUpperCase()}</span>
      </div>
      <span class="tc-muted">${best.label} · ${best.ratio.toFixed(2)}:1</span>
    `;
    contrastBody.appendChild(row);
  });
  contrastWrap.appendChild(contrastSummary);
  contrastWrap.appendChild(contrastBody);

  const quickCopy = document.createElement("details");
  quickCopy.className = "tc-card p-3";
  const quickSummary = document.createElement("summary");
  quickSummary.className = "cursor-pointer text-xs font-semibold";
  quickSummary.textContent = "Sao chép nhanh";
  const quickBody = document.createElement("div");
  quickBody.className = "mt-2 flex flex-wrap gap-2";
  const hexListBtn = document.createElement("button");
  hexListBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  hexListBtn.type = "button";
  hexListBtn.textContent = "HEX list";
  hexListBtn.addEventListener("click", async () => {
    const ok = await copyText((palette.stops || []).join(", "));
    showToast(ok ? "Đã sao chép danh sách HEX." : "Không thể sao chép.");
  });
  const cssBtn = document.createElement("button");
  cssBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  cssBtn.type = "button";
  cssBtn.textContent = "CSS variables";
  cssBtn.addEventListener("click", async () => {
    const ok = await copyText(tokensFor(palette.stops || []));
    showToast(ok ? "Đã sao chép CSS variables." : "Không thể sao chép.");
  });
  const jsonBtn = document.createElement("button");
  jsonBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  jsonBtn.type = "button";
  jsonBtn.textContent = "JSON tokens";
  jsonBtn.addEventListener("click", async () => {
    const payload = JSON.stringify({ colors: palette.stops || [] }, null, 2);
    const ok = await copyText(payload);
    showToast(ok ? "Đã sao chép JSON tokens." : "Không thể sao chép.");
  });
  const linkBtn = document.createElement("button");
  linkBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  linkBtn.type = "button";
  linkBtn.textContent = "Link chia sẻ";
  linkBtn.addEventListener("click", async () => {
    const ok = await copyText(buildShareLink(palette.stops || []));
    showToast(ok ? "Đã sao chép link chia sẻ." : "Không thể sao chép.");
  });
  quickBody.appendChild(hexListBtn);
  quickBody.appendChild(cssBtn);
  quickBody.appendChild(jsonBtn);
  quickBody.appendChild(linkBtn);
  quickCopy.appendChild(quickSummary);
  quickCopy.appendChild(quickBody);

  const visualizer = document.createElement("div");
  visualizer.className = "tc-card p-3 space-y-2";
  const vizTitle = document.createElement("p");
  vizTitle.className = "text-xs font-semibold";
  vizTitle.textContent = "Visualizer mini";
  const vizHeader = document.createElement("div");
  vizHeader.className = "flex items-center justify-between rounded-lg px-3 py-2";
  vizHeader.style.background = (palette.stops || [])[0] || "#111827";
  vizHeader.style.color = getBestText((palette.stops || [])[0] || "#111827").text;
  vizHeader.innerHTML = `<span class="text-xs font-semibold">Thanh tiêu đề</span><span class="text-[10px]">Menu</span>`;
  const vizBody = document.createElement("div");
  vizBody.className = "rounded-lg p-3 space-y-2";
  vizBody.style.background = (palette.stops || [])[1] || "#f8fafc";
  const vizButton = document.createElement("div");
  vizButton.className = "inline-flex px-3 py-2 rounded-lg text-xs font-semibold";
  vizButton.style.background = (palette.stops || [])[2] || "#0ea5e9";
  vizButton.style.color = getBestText((palette.stops || [])[2] || "#0ea5e9").text;
  vizButton.textContent = "Nút hành động";
  const vizTag = document.createElement("div");
  vizTag.className = "inline-flex px-2 py-1 rounded-full text-[10px] font-semibold";
  vizTag.style.background = (palette.stops || [])[3] || "#f59e0b";
  vizTag.style.color = getBestText((palette.stops || [])[3] || "#f59e0b").text;
  vizTag.textContent = "Nhãn phụ";
  vizBody.appendChild(vizButton);
  vizBody.appendChild(vizTag);
  visualizer.appendChild(vizTitle);
  visualizer.appendChild(vizHeader);
  visualizer.appendChild(vizBody);

  card.appendChild(header);
  card.appendChild(swatchRow);
  card.appendChild(strip);
  card.appendChild(contrastWrap);
  card.appendChild(quickCopy);
  card.appendChild(visualizer);
  card.addEventListener("click", (event) => {
    if (event.target.closest("button")) return;
    selectPalette(palette);
  });

  return card;
}

function renderLockRow() {
  if (!el.lockRow) return;
  el.lockRow.innerHTML = "";
  const stops = state.generatorStops;
  if (!stops.length) {
    const note = document.createElement("span");
    note.className = "tc-muted text-xs";
    note.textContent = "Chưa có palette mới để khoá màu.";
    el.lockRow.appendChild(note);
    return;
  }
  stops.forEach((hex, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tc-btn tc-chip px-3 py-2 text-xs flex items-center gap-2";
    const isLocked = state.lockedSlots[idx] === hex;
    if (isLocked) btn.classList.add("tc-btn-primary");
    btn.dataset.lockIndex = String(idx);
    btn.dataset.lockHex = hex;
    btn.innerHTML = `<span class="w-3 h-3 rounded-full border" style="background:${hex}"></span>${hex}`;
    btn.addEventListener("click", () => toggleLock(idx, hex));
    el.lockRow.appendChild(btn);
  });
}

function toggleLock(index, hex) {
  if (state.lockedSlots[index] === hex) {
    delete state.lockedSlots[index];
    renderLockRow();
    return;
  }
  const lockedCount = Object.keys(state.lockedSlots).length;
  if (lockedCount >= 2 && !state.lockedSlots[index]) {
    showToast("Chỉ nên khoá tối đa 2 màu.");
    return;
  }
  state.lockedSlots[index] = hex;
  renderLockRow();
}

function clearLocks() {
  state.lockedSlots = {};
  renderLockRow();
}

function applyLocks(stops) {
  const next = [...stops];
  Object.entries(state.lockedSlots).forEach(([key, hex]) => {
    const idx = Number(key);
    if (Number.isNaN(idx) || idx < 0) return;
    if (idx < next.length) {
      next[idx] = hex;
    }
  });
  return next;
}

function createUserPalette(stops, name, tags = []) {
  const palette = {
    id: `user_${Date.now()}`,
    ten: name,
    tags: ["user-generated", ...tags],
    stops
  };
  state.palettes.unshift(palette);
  state.selectedPaletteId = palette.id;
  state.generatorStops = [...stops];
  renderLockRow();
  renderPalettes();
}

function parseHexList(text) {
  return (text || "")
    .split(/[\s,]+/)
    .map((item) => normalizeHex(item))
    .filter(Boolean);
}

function buildHarmonyPalette(baseHex, rule) {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return [];
  const hsl = rgbToHsl(rgb);
  const baseHue = hsl.h;
  const baseSat = hsl.s;
  const baseLight = hsl.l;
  const hues = [baseHue];
  if (rule === "complementary") {
    hues.push((baseHue + 180) % 360);
  } else if (rule === "analogous") {
    hues.push((baseHue + 30) % 360, (baseHue + 330) % 360);
  } else if (rule === "triad") {
    hues.push((baseHue + 120) % 360, (baseHue + 240) % 360);
  } else if (rule === "tetrad") {
    hues.push((baseHue + 90) % 360, (baseHue + 180) % 360, (baseHue + 270) % 360);
  }
  const unique = Array.from(new Set(hues)).slice(0, 5);
  while (unique.length < 5) unique.push((unique[unique.length - 1] + 20) % 360);
  return unique.map((h, idx) => {
    const l = clampNumber(baseLight + (idx - 2) * 6, 20, 85);
    return hslToHex(h, baseSat, l);
  });
}

function buildTonePalette(tone, count) {
  const palette = [];
  const baseHue = Math.floor(Math.random() * 360);
  const toneMap = {
    fresh: { s: [70, 90], l: [45, 60] },
    pastel: { s: [25, 45], l: [70, 85] },
    deep: { s: [40, 60], l: [25, 40] },
    lux: { s: [20, 40], l: [35, 55] }
  };
  const conf = toneMap[tone] || toneMap.fresh;
  for (let i = 0; i < count; i++) {
    const h = (baseHue + i * 18) % 360;
    const s = clampNumber(conf.s[0] + Math.random() * (conf.s[1] - conf.s[0]), 10, 95);
    const l = clampNumber(conf.l[0] + Math.random() * (conf.l[1] - conf.l[0]), 15, 90);
    palette.push(hslToHex(h, s, l));
  }
  return palette;
}

function renderPalettes() {
  if (!el.grid || !el.empty) return;
  el.grid.innerHTML = "";
  const list = [...state.palettes];
  if (state.hashPalette) {
    list.unshift(state.hashPalette);
  }
  if (!list.length) {
    el.empty.classList.remove("hidden");
    return;
  }
  el.empty.classList.add("hidden");
  list.forEach((palette) => {
    el.grid.appendChild(renderPaletteCard(palette));
  });
}

function getHashStops(key) {
  const hash = (window.location.hash || "").replace("#", "");
  if (!hash) return null;
  const params = new URLSearchParams(hash);
  const raw = params.get(key);
  if (!raw) return null;
  const stops = raw.split(",").map((s) => normalizeHex(s)).filter(Boolean);
  if (stops.length >= MIN_STOPS && stops.length <= MAX_STOPS) {
    return stops;
  }
  return null;
}

function handleBackwardCompatibility() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const hashStops = getHashStops("g");
  if (mode === "gradient" || hashStops) {
    const stops = hashStops ? hashStops.join(",") : "";
    const target = stops ? `gradient.html#g=${encodeURIComponent(stops)}` : "gradient.html";
    window.location.replace(target);
    return true;
  }
  return false;
}

async function loadPalettes() {
  try {
    const res = await fetch("../data/palettes.json", { cache: "no-store" });
    const data = await res.json();
    state.palettes = Array.isArray(data) ? data : [];
  } catch (_err) {
    state.palettes = [];
  }
  renderPalettes();
}

function init() {
  if (handleBackwardCompatibility()) return;
  const stops = getHashStops("p");
  if (stops) {
    state.hashPalette = {
      id: "hash-palette",
      ten: "Palette từ dải chuyển màu",
      tags: ["từ hash"],
      stops
    };
    state.selectedPaletteId = "hash-palette";
  }
  loadPalettes();

  el.hexApply?.addEventListener("click", () => {
    const stops = parseHexList(el.hexInput?.value || "").slice(0, MAX_STOPS);
    if (stops.length < MIN_STOPS) {
      showToast("Hãy nhập ít nhất 2 màu hợp lệ.");
      return;
    }
    const next = applyLocks(stops);
    createUserPalette(next, "Palette từ HEX", ["hex"]);
  });

  el.harmonyApply?.addEventListener("click", () => {
    const baseHex = normalizeHex(el.baseColor?.value || "");
    if (!baseHex) {
      showToast("Chọn màu chủ đạo hợp lệ.");
      return;
    }
    const rule = el.harmonySelect?.value || "complementary";
    const generated = buildHarmonyPalette(baseHex, rule).slice(0, MAX_STOPS);
    const next = applyLocks(generated);
    createUserPalette(next, "Palette theo quy tắc hài hoà", ["harmony", rule]);
  });

  el.toneApply?.addEventListener("click", () => {
    const tone = el.toneSelect?.value || "fresh";
    const generated = buildTonePalette(tone, 5).slice(0, MAX_STOPS);
    const next = applyLocks(generated);
    createUserPalette(next, "Palette ngẫu nhiên theo tông", ["random", tone]);
  });

  el.lockClear?.addEventListener("click", () => {
    clearLocks();
  });
  renderLockRow();

  el.suggestBtn?.addEventListener("click", async () => {
    const goal = el.goalSelect?.value || "ui";
    if (!["ui", "brand", "embroidery", "print"].includes(goal)) {
      showToast("Mục tiêu chưa hỗ trợ.");
      return;
    }
    const source = el.sourceSelect?.value || "primary";
    const boldness = clampNumber(el.boldnessRange?.value || 35, 0, 100);
    const suggestions = buildSuggestions(goal, source, boldness);
    await enrichSuggestions(goal, suggestions);
    renderSuggestions(suggestions);
  });

  el.smartGenerate?.addEventListener("click", async () => {
    const brief = String(el.smartBrief?.value || "").trim();
    if (!brief) {
      showToast("Hãy nhập brief 1 dòng.");
      return;
    }
    const parsed = await parseBrief(brief);
    const goal = parsed.goal || "ui";
    const mood = parsed.mood || FALLBACK_KNOWLEDGE.defaults;
    const boldness = clampNumber(parsed.boldness ?? 45, 0, 100);
    const suggestions = buildSmartSuggestions(goal, mood, boldness);
    const moodLabel = mood.label || "Mặc định";
    renderSmartSuggestions(suggestions, goalDisplay(goal), moodLabel);
  });

  el.briefPick?.addEventListener("click", async () => {
    const knowledge = await loadKnowledge();
    const templates = getBriefTemplates(knowledge);
    if (!templates.length) {
      showToast("Chưa có mẫu brief.");
      return;
    }
    renderBriefIndustries(templates);
    openBriefSheet();
  });

  el.briefSheet?.querySelectorAll("[data-brief-close]").forEach((btn) => {
    btn.addEventListener("click", closeBriefSheet);
  });

  el.saveLibrary?.addEventListener("click", () => {
    const active = getActivePalette();
    if (!active) {
      showToast("Hãy chọn một bảng phối màu.");
      return;
    }
    const ok = addAssetToLibrary(buildPaletteAsset(active));
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
    const active = getActivePalette();
    if (!active) {
      showToast("Hãy chọn một bảng phối màu.");
      return;
    }
    publishToFeed(buildPaletteAsset(active));
  });
}

init();

function applyHexesFromHub(detail) {
  const rawList = Array.isArray(detail?.hexes) ? detail.hexes : [];
  const mode = detail?.mode === "append" ? "append" : "replace";
  const normalized = rawList.map((hex) => normalizeHex(hex)).filter(Boolean);
  if (normalized.length < 2) return;
  const baseStops = mode === "append"
    ? (getActivePalette()?.stops || [])
    : [];
  const combined = [...baseStops, ...normalized];
  const unique = combined.filter((hex, idx) => combined.indexOf(hex) === idx);
  let nextStops = unique.slice(0, MAX_STOPS);
  if (nextStops.length < MIN_STOPS) {
    while (nextStops.length < MIN_STOPS) {
      nextStops.push(nextStops[nextStops.length - 1] || normalized[0]);
    }
  }
  const palette = {
    id: `hexhub_${Date.now()}`,
    ten: "Palette nhanh từ Kho HEX",
    tags: ["hex", "kho-hex"],
    stops: nextStops
  };
  state.palettes.unshift(palette);
  state.selectedPaletteId = palette.id;
  renderPalettes();
}

window.addEventListener("tc:hex-apply", (event) => {
  applyHexesFromHub(event?.detail);
});
