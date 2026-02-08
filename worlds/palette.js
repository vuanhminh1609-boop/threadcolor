import { composeHandoff } from "../scripts/handoff.js";

import { bootstrapIncomingHandoff, setWorkbenchContext } from "../scripts/workbench_context.js";
import "../scripts/workbench_bridge.js";

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

const FULLSCREEN_COLUMNS = 5;
const FULLSCREEN_HISTORY_LIMIT = 10;
const FULLSCREEN_HUE_STEP = 8;
const FULLSCREEN_HUE_STEP_LARGE = 20;
const FULLSCREEN_LIGHT_STEP = 3;
const FULLSCREEN_LIGHT_STEP_LARGE = 10;
let fullscreenActive = false;
let fullscreenPalette = [];
let fullscreenLocks = Array.from({ length: FULLSCREEN_COLUMNS }, () => false);
let fullscreenHelpVisible = false;
let fullscreenBodyOverflow = "";
let fullscreenHistory = [];
let fullscreenHistoryIndex = -1;
let fullscreenTokenVisible = false;
let fullscreenLastPointer = "mouse";
const fullscreenRailTimers = new WeakMap();
let presetDetailOpen = false;
let presetDetailBodyOverflow = "";

const el = {
  grid: document.getElementById("paletteGrid"),
  empty: document.getElementById("paletteEmpty"),
  saveLibrary: document.getElementById("paletteSaveLibrary"),
  useLibrary: document.getElementById("paletteUseLibrary"),
  share: document.getElementById("paletteShare"),
  fullscreenBtn: document.getElementById("paletteFullscreenBtn"),
  fullscreen: document.getElementById("paletteFullscreen"),
  fullscreenExit: document.getElementById("paletteFsExit"),
  fullscreenCopyAll: document.getElementById("paletteFsCopyAll"),
  fullscreenHelp: document.getElementById("paletteFsHelp"),
  fullscreenToken: document.getElementById("paletteFsToken"),
  fullscreenTokenCopy: document.getElementById("paletteFsTokenCopy"),
  presetDetail: document.getElementById("palettePresetDetail"),
  presetDetailBody: document.getElementById("palettePresetDetailBody"),
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
  const list = Array.isArray(stops)
    ? stops.map((hex) => normalizeHex(hex)).filter(Boolean).map((hex) => hex.toUpperCase())
    : [];
  const payload = encodeURIComponent(JSON.stringify({ colors: list }));
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

function buildHexPaletteFromInput(list) {
  const cleaned = Array.isArray(list) ? list.filter(Boolean) : [];
  if (!cleaned.length) return [];
  const base = cleaned[0];
  const fallback = buildHarmonyPalette(base, "analogous");
  const targetCount = 5;
  const result = fallback.slice(0, targetCount);
  cleaned.slice(0, targetCount).forEach((hex, idx) => {
    result[idx] = hex;
  });
  return result.slice(0, targetCount);
}

function buildFullscreenPalette() {
  const baseHue = Math.floor(Math.random() * 360);
  const hueOffsets = [0, 28, 62, 130, 210];
  const baseSat = clampNumber(45 + Math.random() * 30, 35, 85);
  const baseLight = clampNumber(42 + Math.random() * 16, 30, 70);
  return hueOffsets.map((offset, idx) => {
    const h = (baseHue + offset) % 360;
    const s = clampNumber(baseSat + (idx - 2) * 4, 28, 90);
    const l = clampNumber(baseLight + (idx - 2) * 6, 24, 82);
    return hslToHex(h, s, l);
  });
}

function seedFullscreenPalette() {
  const base = buildFullscreenPalette();
  const active = getActivePalette();
  const stops = Array.isArray(active?.stops) ? active.stops : [];
  if (!stops.length) return base;
  const cleaned = stops.map((hex) => normalizeHex(hex)).filter(Boolean);
  if (!cleaned.length) return base;
  return Array.from({ length: FULLSCREEN_COLUMNS }, (_, idx) => cleaned[idx] || base[idx]);
}

function normalizeFullscreenHex(hex) {
  const normalized = normalizeHex(hex);
  return normalized ? normalized.toUpperCase() : "#111111";
}

function snapshotFullscreenPalette(palette) {
  const list = Array.isArray(palette) ? palette : [];
  return Array.from({ length: FULLSCREEN_COLUMNS }, (_, idx) => normalizeFullscreenHex(list[idx]));
}

function showRailForCol(col, duration = 2000) {
  if (!col) return;
  col.classList.add("is-rail-visible");
  if (fullscreenRailTimers.has(col)) {
    window.clearTimeout(fullscreenRailTimers.get(col));
  }
  const timer = window.setTimeout(() => {
    col.classList.remove("is-rail-visible");
    fullscreenRailTimers.delete(col);
  }, duration);
  fullscreenRailTimers.set(col, timer);
}

function hideRailForCol(col) {
  if (!col) return;
  col.classList.remove("is-rail-visible");
  if (fullscreenRailTimers.has(col)) {
    window.clearTimeout(fullscreenRailTimers.get(col));
    fullscreenRailTimers.delete(col);
  }
}

function hideAllRails() {
  if (!el.fullscreen) return;
  el.fullscreen.querySelectorAll(".pf-col.is-rail-visible").forEach((col) => {
    hideRailForCol(col);
  });
}

function closeAllTunePopovers(exceptCol) {
  if (!el.fullscreen) return;
  el.fullscreen.querySelectorAll(".pf-tune.is-open").forEach((panel) => {
    const col = panel.closest(".pf-col");
    if (exceptCol && col === exceptCol) return;
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    if (col) col.classList.remove("is-tune-open");
  });
}

function toggleTunePopover(col) {
  if (!col) return;
  const panel = col.querySelector(".pf-tune");
  if (!panel) return;
  const isOpen = panel.classList.contains("is-open");
  closeAllTunePopovers(col);
  if (!isOpen) {
    initTunePanel(col);
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    col.classList.add("is-tune-open");
  } else {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    col.classList.remove("is-tune-open");
  }
}

function randomFullscreenHex() {
  const hue = Math.floor(Math.random() * 360);
  const sat = clampNumber(45 + Math.random() * 40, 30, 90);
  const light = clampNumber(35 + Math.random() * 30, 25, 80);
  return hslToHex(hue, sat, light);
}

function updateFullscreenColumn(idx, hex, { recordHistory = true } = {}) {
  if (idx < 0 || idx >= FULLSCREEN_COLUMNS) return;
  const next = snapshotFullscreenPalette(fullscreenPalette);
  next[idx] = normalizeFullscreenHex(hex);
  applyFullscreenPalette(next, { respectLocks: false, recordHistory });
}

function adjustFullscreenColumn(idx, { hueDelta = 0, lightDelta = 0 } = {}) {
  if (idx < 0 || idx >= FULLSCREEN_COLUMNS) return;
  const baseHex = fullscreenPalette[idx];
  const rgb = hexToRgb(baseHex);
  if (!rgb) return;
  const hsl = rgbToHsl(rgb);
  const nextHue = (hsl.h + hueDelta + 360) % 360;
  const nextLight = clampNumber(hsl.l + lightDelta, 0, 100);
  updateFullscreenColumn(idx, hslToHex(nextHue, hsl.s, nextLight));
}

function formatTuneValue(value, { isOffset = false } = {}) {
  const num = Math.round(Number(value) || 0);
  if (!isOffset) return String(num);
  if (num > 0) return `+${num}`;
  return String(num);
}

function syncTuneValues(panel) {
  if (!panel) return;
  const hueInput = panel.querySelector("[data-tune='hue']");
  const satInput = panel.querySelector("[data-tune='sat']");
  const lightInput = panel.querySelector("[data-tune='light']");
  const hueValue = panel.querySelector("[data-value='hue']");
  const satValue = panel.querySelector("[data-value='sat']");
  const lightValue = panel.querySelector("[data-value='light']");
  if (hueInput && hueValue) hueValue.textContent = formatTuneValue(hueInput.value);
  if (satInput && satValue) satValue.textContent = formatTuneValue(satInput.value, { isOffset: true });
  if (lightInput && lightValue) lightValue.textContent = formatTuneValue(lightInput.value, { isOffset: true });
}

function initTunePanel(col) {
  if (!col) return;
  const panel = col.querySelector(".pf-tune");
  if (!panel) return;
  const idx = Number(col.dataset.idx || 0);
  const hex = normalizeHex(fullscreenPalette[idx] || col.dataset.hex || "#111111");
  const rgb = hex ? hexToRgb(hex) : null;
  if (!rgb) return;
  const hsl = rgbToHsl(rgb);
  panel.dataset.baseH = String(Math.round(hsl.h));
  panel.dataset.baseS = String(Math.round(hsl.s));
  panel.dataset.baseL = String(Math.round(hsl.l));
  const hueInput = panel.querySelector("[data-tune='hue']");
  const satInput = panel.querySelector("[data-tune='sat']");
  const lightInput = panel.querySelector("[data-tune='light']");
  if (hueInput) hueInput.value = Math.round(hsl.h);
  if (satInput) satInput.value = 0;
  if (lightInput) lightInput.value = 0;
  syncTuneValues(panel);
}

function computeTuneHex(panel) {
  if (!panel) return null;
  const baseH = Number(panel.dataset.baseH || 0);
  const baseS = Number(panel.dataset.baseS || 0);
  const baseL = Number(panel.dataset.baseL || 0);
  const hueInput = panel.querySelector("[data-tune='hue']");
  const satInput = panel.querySelector("[data-tune='sat']");
  const lightInput = panel.querySelector("[data-tune='light']");
  const hue = Number(hueInput?.value ?? baseH);
  const satOffset = Number(satInput?.value ?? 0);
  const lightOffset = Number(lightInput?.value ?? 0);
  const nextS = clampNumber(baseS + satOffset, 0, 100);
  const nextL = clampNumber(baseL + lightOffset, 0, 100);
  return hslToHex(hue, nextS, nextL);
}

function getFullscreenStops() {
  return snapshotFullscreenPalette(fullscreenPalette);
}

function toggleFullscreenTokenPanel(force) {
  if (!el.fullscreenToken) return;
  if (typeof force === "boolean") {
    fullscreenTokenVisible = force;
  } else {
    fullscreenTokenVisible = !fullscreenTokenVisible;
  }
  el.fullscreenToken.classList.toggle("is-open", fullscreenTokenVisible);
  el.fullscreenToken.setAttribute("aria-hidden", fullscreenTokenVisible ? "false" : "true");
}

async function copyFullscreenTokens() {
  const stops = getFullscreenStops();
  if (!stops.length) {
    showToast("Chưa có màu để xuất token.");
    return;
  }
  const ok = await copyText(tokensFor(stops));
  showToast(ok ? "Đã sao chép CSS tokens." : "Không thể sao chép.");
  if (ok) toggleFullscreenTokenPanel(false);
}

function saveFullscreenToLibrary() {
  const stops = getFullscreenStops();
  if (stops.length < MIN_STOPS) {
    showToast("Chưa đủ màu để lưu.");
    return;
  }
  const palette = {
    ten: "Palette toàn màn hình",
    tags: ["fullscreen"],
    stops
  };
  const ok = addAssetToLibrary(buildPaletteAsset(palette));
  showToast(ok ? "Đã lưu vào Thư viện." : "Không thể lưu tài sản.");
}

async function copyFullscreenShareLink() {
  const stops = getFullscreenStops();
  if (stops.length < MIN_STOPS) {
    showToast("Chưa đủ màu để chia sẻ.");
    return;
  }
  const ok = await copyText(buildShareLink(stops));
  showToast(ok ? "Đã sao chép link chia sẻ." : "Không thể sao chép.");
}

function pushFullscreenHistory(palette) {
  const snapshot = snapshotFullscreenPalette(palette);
  const current = fullscreenHistory[fullscreenHistoryIndex];
  if (current && current.join("|") === snapshot.join("|")) return;
  if (fullscreenHistoryIndex < fullscreenHistory.length - 1) {
    fullscreenHistory = fullscreenHistory.slice(0, fullscreenHistoryIndex + 1);
  }
  fullscreenHistory.push(snapshot);
  if (fullscreenHistory.length > FULLSCREEN_HISTORY_LIMIT) {
    const overflow = fullscreenHistory.length - FULLSCREEN_HISTORY_LIMIT;
    fullscreenHistory = fullscreenHistory.slice(overflow);
  }
  fullscreenHistoryIndex = fullscreenHistory.length - 1;
}

function resetFullscreenHistory(palette) {
  fullscreenHistory = [];
  fullscreenHistoryIndex = -1;
  pushFullscreenHistory(palette);
}

function applyFullscreenPalette(hexes, { respectLocks = false, recordHistory = true } = {}) {
  const next = renderFullscreenPalette(hexes, { respectLocks });
  if (recordHistory && next) {
    pushFullscreenHistory(next);
  }
  return next;
}

function undoFullscreenPalette() {
  if (fullscreenHistoryIndex <= 0) return;
  fullscreenHistoryIndex -= 1;
  renderFullscreenPalette(fullscreenHistory[fullscreenHistoryIndex] || []);
}

function redoFullscreenPalette() {
  if (fullscreenHistoryIndex >= fullscreenHistory.length - 1) return;
  fullscreenHistoryIndex += 1;
  renderFullscreenPalette(fullscreenHistory[fullscreenHistoryIndex] || []);
}

function shiftFullscreenHue(delta) {
  if (!fullscreenPalette.length) return;
  const shifted = fullscreenPalette.map((hex) => {
    const normalized = normalizeHex(hex);
    if (!normalized) return hex;
    const rgb = hexToRgb(normalized);
    if (!rgb) return hex;
    const hsl = rgbToHsl(rgb);
    const nextHue = (hsl.h + delta + 360) % 360;
    return hslToHex(nextHue, hsl.s, hsl.l);
  });
  applyFullscreenPalette(shifted, { respectLocks: true });
}

function shiftFullscreenLightness(delta) {
  if (!fullscreenPalette.length) return;
  const shifted = fullscreenPalette.map((hex) => {
    const normalized = normalizeHex(hex);
    if (!normalized) return hex;
    const rgb = hexToRgb(normalized);
    if (!rgb) return hex;
    const hsl = rgbToHsl(rgb);
    const nextLight = clampNumber(hsl.l + delta, 0, 100);
    return hslToHex(hsl.h, hsl.s, nextLight);
  });
  applyFullscreenPalette(shifted, { respectLocks: true });
}

function ensureFullscreenOverlay() {
  let overlay = el.fullscreen || document.getElementById("paletteFullscreen");
  if (!overlay) {
    const lockIcon = `
      <svg class="pf-rail-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 11V8a5 5 0 0 1 10 0v3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"></rect>
      </svg>
    `;
    const copyRailIcon = `
      <svg class="pf-rail-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="9" y="9" width="10" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"></rect>
        <path d="M5 15V5a2 2 0 0 1 2-2h10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    `;
    const rollIcon = `
      <svg class="pf-rail-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4v6h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M20 20v-6h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M20 10a8 8 0 0 0-14-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M4 14a8 8 0 0 0 14 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    `;
    const tuneIcon = `
      <svg class="pf-rail-icon" viewBox="0 0 24 24" aria-hidden="true">
        <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
        <circle cx="9" cy="6" r="2" fill="none" stroke="currentColor" stroke-width="2"></circle>
        <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
        <circle cx="15" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="2"></circle>
        <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
        <circle cx="7" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="2"></circle>
      </svg>
    `;
    const pickIcon = `
      <svg class="pf-rail-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.5 3.5l6 6-2 2-1.5-1.5-7.5 7.5H7v-2.5l7.5-7.5L13 5.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M5 19h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
      </svg>
    `;
    const rail = `
      <div class="pf-rail" aria-hidden="false">
        <button class="pf-rail-btn" type="button" data-action="lock" data-tooltip="Khóa cột" aria-label="Khóa cột">${lockIcon}</button>
        <button class="pf-rail-btn" type="button" data-action="copy" data-tooltip="Sao chép HEX" aria-label="Sao chép HEX">${copyRailIcon}</button>
        <button class="pf-rail-btn" type="button" data-action="roll" data-tooltip="Quay cột" aria-label="Quay cột">${rollIcon}</button>
        <button class="pf-rail-btn" type="button" data-action="tune" data-tooltip="Tinh chỉnh" aria-label="Tinh chỉnh">${tuneIcon}</button>
        <button class="pf-rail-btn" type="button" data-action="pick" data-tooltip="Chọn màu" aria-label="Chọn màu">${pickIcon}</button>
      </div>
      <div class="pf-tune" aria-hidden="true">
        <div class="pf-tune-row">
          <span class="pf-tune-label">Hue</span>
          <input class="pf-tune-range" type="range" min="0" max="360" step="1" value="0" data-tune="hue" aria-label="Hue" />
          <span class="pf-tune-value" data-value="hue">0</span>
        </div>
        <div class="pf-tune-row">
          <span class="pf-tune-label">Bão hoà</span>
          <input class="pf-tune-range" type="range" min="-30" max="30" step="1" value="0" data-tune="sat" aria-label="Bão hoà" />
          <span class="pf-tune-value" data-value="sat">0</span>
        </div>
        <div class="pf-tune-row">
          <span class="pf-tune-label">Sáng</span>
          <input class="pf-tune-range" type="range" min="-20" max="20" step="1" value="0" data-tune="light" aria-label="Độ sáng" />
          <span class="pf-tune-value" data-value="light">0</span>
        </div>
      </div>
    `;
    const cols = Array.from({ length: FULLSCREEN_COLUMNS }, (_, idx) => `
      <div class="pf-col" role="button" tabindex="0" data-idx="${idx}">
        ${rail}
        <span class="pf-hex">#FFFFFF</span>
      </div>
    `).join("");
    const shortcutsIcon = `
      <svg class="pf-hud-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"></rect>
        <path d="M7 10h2M11 10h2M15 10h2M7 14h2M11 14h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
      </svg>
    `;
    const exitIcon = `
      <svg class="pf-hud-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 6l12 12M18 6l-12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
      </svg>
    `;
    overlay = document.createElement("div");
    overlay.id = "paletteFullscreen";
    overlay.className = "pf-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = `
      <div class="pf-hud pf-hud-top">
        <span class="pf-live">LIVE</span>
        <div class="pf-hud-rail">
          <button id="paletteFsShortcuts" class="pf-hud-btn" type="button" aria-label="Phím tắt">
            ${shortcutsIcon}
            <span class="pf-tooltip pf-tooltip--shortcuts" aria-hidden="true">
              <span>Space</span>
              <span>1-5</span>
              <span>C</span>
              <span>H</span>
              <span>Esc</span>
            </span>
          </button>
          <button id="paletteFsExit" class="pf-hud-btn" type="button" aria-label="Thoát">
            ${exitIcon}
          </button>
        </div>
      </div>
      <div class="pf-cols">
        ${cols}
      </div>
      <div id="paletteFsToken" class="pf-help" aria-hidden="true" style="top:auto; bottom:72px;">
        <div style="display:flex; align-items:center; gap:0.6rem; justify-content:space-between;">
          <p class="pf-help-title" style="margin:0;">CSS tokens</p>
          <button id="paletteFsTokenCopy" class="pf-btn" type="button">Copy</button>
        </div>
      </div>
      <div id="paletteFsHelp" class="pf-help" aria-hidden="true">
        <p class="pf-help-title">Phím tắt</p>
        <ul class="pf-help-list">
          <li><span>Space</span> Đổi palette</li>
          <li><span>1-5</span> Khoá/mở cột</li>
          <li><span>C</span> Sao chép toàn bộ</li>
          <li><span>H</span> Bật/tắt trợ giúp</li>
          <li><span>Esc</span> Thoát</li>
        </ul>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  el.fullscreen = overlay;
  el.fullscreenExit = overlay.querySelector("#paletteFsExit");
  el.fullscreenCopyAll = overlay.querySelector("#paletteFsCopyAll");
  el.fullscreenHelp = overlay.querySelector("#paletteFsHelp");
  el.fullscreenToken = overlay.querySelector("#paletteFsToken");
  el.fullscreenTokenCopy = overlay.querySelector("#paletteFsTokenCopy");
  if (!el.fullscreenToken) {
    const tokenPanel = document.createElement("div");
    tokenPanel.id = "paletteFsToken";
    tokenPanel.className = "pf-help";
    tokenPanel.setAttribute("aria-hidden", "true");
    tokenPanel.style.top = "auto";
    tokenPanel.style.bottom = "72px";
    tokenPanel.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.6rem; justify-content:space-between;">
        <p class="pf-help-title" style="margin:0;">CSS tokens</p>
        <button id="paletteFsTokenCopy" class="pf-btn" type="button">Copy</button>
      </div>
    `;
    overlay.appendChild(tokenPanel);
    el.fullscreenToken = tokenPanel;
    el.fullscreenTokenCopy = tokenPanel.querySelector("#paletteFsTokenCopy");
  }
  let picker = overlay.querySelector("#paletteFsPicker");
  if (!picker) {
    picker = document.createElement("input");
    picker.id = "paletteFsPicker";
    picker.type = "color";
    picker.className = "pf-picker";
    picker.setAttribute("aria-hidden", "true");
    overlay.appendChild(picker);
  }
  el.fullscreenPicker = picker;
  const helpList = overlay.querySelector(".pf-help-list");
  if (helpList) {
    helpList.innerHTML = `
      <li><span>Space</span> Đổi palette</li>
      <li><span>1-5</span> Khoá/mở cột</li>
      <li><span>C</span> Sao chép toàn bộ</li>
      <li><span>H</span> Bật/tắt trợ giúp</li>
      <li><span>Esc</span> Thoát</li>
    `;
  }
  return overlay;
}

function renderFullscreenPalette(hexes, { respectLocks = false } = {}) {
  if (!el.fullscreen) return;
  const cols = Array.from(el.fullscreen.querySelectorAll(".pf-col"));
  const nextPalette = [...fullscreenPalette];
  for (let idx = 0; idx < FULLSCREEN_COLUMNS; idx += 1) {
    const raw = hexes[idx] || nextPalette[idx] || "#111111";
    const normalized = normalizeHex(raw) ? normalizeHex(raw).toUpperCase() : "#111111";
    if (!respectLocks || !fullscreenLocks[idx] || !nextPalette[idx]) {
      nextPalette[idx] = normalized;
    }
  }
  cols.forEach((col) => {
    const idx = Number(col.dataset.idx || 0);
    const hex = nextPalette[idx] || "#111111";
    col.dataset.hex = hex;
    col.dataset.locked = fullscreenLocks[idx] ? "1" : "0";
    col.style.background = hex;
    const label = col.querySelector(".pf-hex");
    if (label) {
      label.textContent = hex;
      const best = getBestText(hex);
      const isDarkText = best.text === "#000000";
      label.style.color = best.text;
      label.style.backgroundColor = isDarkText ? "rgba(255,255,255,0.72)" : "rgba(0,0,0,0.35)";
      label.style.borderColor = isDarkText ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.2)";
    }
  });
  fullscreenPalette = nextPalette;
  return nextPalette;
}

function toggleFullscreenLock(idx) {
  if (idx < 0 || idx >= FULLSCREEN_COLUMNS) return;
  fullscreenLocks[idx] = !fullscreenLocks[idx];
  renderFullscreenPalette(fullscreenPalette, { respectLocks: true });
}

async function copyFullscreenAll() {
  const list = fullscreenPalette.filter(Boolean);
  if (!list.length) {
    showToast("Chưa có màu để sao chép.");
    return;
  }
  const ok = await copyText(list.join(", "));
  showToast(ok ? "Đã sao chép toàn bộ HEX." : "Không thể sao chép.");
}

function toggleFullscreenHelp(force) {
  if (!el.fullscreenHelp) return;
  if (typeof force === "boolean") {
    fullscreenHelpVisible = force;
  } else {
    fullscreenHelpVisible = !fullscreenHelpVisible;
  }
  el.fullscreenHelp.classList.toggle("is-open", fullscreenHelpVisible);
  el.fullscreenHelp.setAttribute("aria-hidden", fullscreenHelpVisible ? "false" : "true");
}

function handleFullscreenKeydown(event) {
  if (!fullscreenActive) return;
  const tag = event.target?.tagName || "";
  if (tag === "INPUT" || tag === "TEXTAREA") return;
  if (event.code === "Space") {
    event.preventDefault();
    applyFullscreenPalette(buildFullscreenPalette(), { respectLocks: true });
    return;
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    const step = event.shiftKey ? FULLSCREEN_HUE_STEP_LARGE : FULLSCREEN_HUE_STEP;
    shiftFullscreenHue(-step);
    return;
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    const step = event.shiftKey ? FULLSCREEN_HUE_STEP_LARGE : FULLSCREEN_HUE_STEP;
    shiftFullscreenHue(step);
    return;
  }
  if (event.key === "ArrowUp") {
    event.preventDefault();
    const step = event.shiftKey ? FULLSCREEN_LIGHT_STEP_LARGE : FULLSCREEN_LIGHT_STEP;
    shiftFullscreenLightness(step);
    return;
  }
  if (event.key === "ArrowDown") {
    event.preventDefault();
    const step = event.shiftKey ? FULLSCREEN_LIGHT_STEP_LARGE : FULLSCREEN_LIGHT_STEP;
    shiftFullscreenLightness(-step);
    return;
  }
  if (event.key === "Escape") {
    event.preventDefault();
    closeFullscreenPalette();
    return;
  }
  if (event.key === "c" || event.key === "C") {
    event.preventDefault();
    copyFullscreenAll();
    return;
  }
  if (event.key === "h" || event.key === "H") {
    event.preventDefault();
    toggleFullscreenHelp();
    return;
  }
  if (event.key === "t" || event.key === "T") {
    event.preventDefault();
    toggleFullscreenTokenPanel();
    return;
  }
  if (event.key === "s" || event.key === "S") {
    event.preventDefault();
    saveFullscreenToLibrary();
    return;
  }
  if (event.key === "l" || event.key === "L") {
    event.preventDefault();
    copyFullscreenShareLink();
    return;
  }
  if (event.key === "u" || event.key === "U") {
    event.preventDefault();
    undoFullscreenPalette();
    return;
  }
  if (event.key === "r" || event.key === "R") {
    event.preventDefault();
    redoFullscreenPalette();
    return;
  }
  if (/^[1-5]$/.test(event.key)) {
    event.preventDefault();
    toggleFullscreenLock(Number(event.key) - 1);
  }
}

function openFullscreenColorPicker(idx) {
  if (!el.fullscreenPicker) return;
  const hex = normalizeFullscreenHex(fullscreenPalette[idx]);
  el.fullscreenPicker.value = hex;
  el.fullscreenPicker.dataset.idx = String(idx);
  let opened = false;
  try {
    if (typeof el.fullscreenPicker.showPicker === "function") {
      el.fullscreenPicker.showPicker();
      opened = true;
    } else {
      el.fullscreenPicker.click();
      opened = true;
    }
  } catch (_err) {
    opened = false;
  }
  if (!opened) {
    const fallback = window.prompt("Nhập mã HEX (#RRGGBB):", hex);
    const next = normalizeHex(fallback);
    if (next) {
      updateFullscreenColumn(idx, next.toUpperCase());
    } else if (fallback) {
      showToast("Mã HEX không hợp lệ.");
    }
  }
}

function handleFullscreenPickerChange(event) {
  const picker = event.target;
  const idx = Number(picker.dataset.idx || -1);
  if (Number.isNaN(idx) || idx < 0) return;
  const next = normalizeHex(picker.value);
  if (!next) return;
  const normalized = next.toUpperCase();
  updateFullscreenColumn(idx, normalized);
  showToast(`Đã chọn ${normalized}.`);
}

async function handleFullscreenOverlayClick(event) {
  if (!fullscreenActive || !el.fullscreen) return;
  const overlay = el.fullscreen;
  const actionBtn = event.target.closest("[data-action]");
  if (actionBtn && overlay.contains(actionBtn)) {
    event.preventDefault();
    event.stopPropagation();
    const col = actionBtn.closest(".pf-col");
    const idx = Number(col?.dataset.idx ?? -1);
    if (Number.isNaN(idx) || idx < 0) return;
    const action = actionBtn.dataset.action || "";
    const hex = fullscreenPalette[idx] || col?.dataset.hex || "";
    if (action === "lock") {
      toggleFullscreenLock(idx);
      return;
    }
    if (action === "copy") {
      if (!hex) {
        showToast("Chưa có màu để sao chép.");
        return;
      }
      const ok = await copyText(hex);
      showToast(ok ? `Đã sao chép ${hex}` : "Không thể sao chép.");
      closeAllTunePopovers();
      return;
    }
    if (action === "roll") {
      updateFullscreenColumn(idx, randomFullscreenHex());
      closeAllTunePopovers();
      return;
    }
    if (action === "tune") {
      toggleTunePopover(col);
      return;
    }
    if (action === "pick") {
      openFullscreenColorPicker(idx);
      closeAllTunePopovers();
      return;
    }
    return;
  }

  const col = event.target.closest(".pf-col");
  if (!col || !overlay.contains(col)) {
    closeAllTunePopovers();
    return;
  }
  if (event.target.closest(".pf-tune")) return;
  if (fullscreenLastPointer === "touch") {
    showRailForCol(col, 2000);
    return;
  }
  const idx = Number(col.dataset.idx || 0);
  toggleFullscreenLock(idx);
  closeAllTunePopovers();
  const hex = col.dataset.hex || "";
  if (!hex) return;
  const ok = await copyText(hex);
  showToast(ok ? `Đã sao chép ${hex}` : "Không thể sao chép.");
}

function handleFullscreenOverlayPointerDown(event) {
  if (!el.fullscreen) return;
  fullscreenLastPointer = event.pointerType || "mouse";
  if (fullscreenLastPointer !== "touch") return;
  const col = event.target.closest(".pf-col");
  if (!col || !el.fullscreen.contains(col)) return;
  if (event.target.closest(".pf-rail") || event.target.closest(".pf-tune")) return;
  showRailForCol(col, 2000);
}

function handleFullscreenOverlayInput(event) {
  if (!fullscreenActive) return;
  const range = event.target.closest(".pf-tune-range");
  if (!range || !el.fullscreen?.contains(range)) return;
  const panel = range.closest(".pf-tune");
  const col = range.closest(".pf-col");
  if (!panel || !col) return;
  const idx = Number(col.dataset.idx || 0);
  const nextHex = computeTuneHex(panel);
  if (!nextHex) return;
  syncTuneValues(panel);
  updateFullscreenColumn(idx, nextHex, { recordHistory: false });
}

function handleFullscreenOverlayChange(event) {
  if (!fullscreenActive) return;
  const range = event.target.closest(".pf-tune-range");
  if (!range || !el.fullscreen?.contains(range)) return;
  const panel = range.closest(".pf-tune");
  const col = range.closest(".pf-col");
  if (!panel || !col) return;
  const idx = Number(col.dataset.idx || 0);
  const nextHex = computeTuneHex(panel);
  if (!nextHex) return;
  syncTuneValues(panel);
  updateFullscreenColumn(idx, nextHex, { recordHistory: true });
}

function handleFullscreenChange() {
  if (!fullscreenActive) return;
  if (document.fullscreenElement !== el.fullscreen) {
    closeFullscreenPalette({ skipExit: true });
  }
}

function openFullscreenPalette() {
  const overlay = ensureFullscreenOverlay();
  if (!overlay || fullscreenActive) return;
  fullscreenActive = true;
  fullscreenBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  overlay.classList.add("is-active");
  overlay.setAttribute("aria-hidden", "false");
  fullscreenLocks = Array.from({ length: FULLSCREEN_COLUMNS }, () => false);
  fullscreenHelpVisible = false;
  toggleFullscreenHelp(false);
  fullscreenTokenVisible = false;
  toggleFullscreenTokenPanel(false);
  fullscreenLastPointer = "mouse";
  closeAllTunePopovers();
  hideAllRails();
  const seeded = renderFullscreenPalette(seedFullscreenPalette());
  resetFullscreenHistory(seeded || []);
  window.addEventListener("keydown", handleFullscreenKeydown);
  document.addEventListener("fullscreenchange", handleFullscreenChange);
  if (typeof overlay.requestFullscreen === "function") {
    overlay.requestFullscreen().catch(() => {
      overlay.classList.add("is-fallback");
    });
  } else {
    overlay.classList.add("is-fallback");
  }
}

function closeFullscreenPalette({ skipExit = false } = {}) {
  if (!fullscreenActive || !el.fullscreen) return;
  fullscreenActive = false;
  el.fullscreen.classList.remove("is-active", "is-fallback");
  el.fullscreen.setAttribute("aria-hidden", "true");
  window.removeEventListener("keydown", handleFullscreenKeydown);
  document.removeEventListener("fullscreenchange", handleFullscreenChange);
  toggleFullscreenHelp(false);
  toggleFullscreenTokenPanel(false);
  closeAllTunePopovers();
  hideAllRails();
  if (!skipExit && document.fullscreenElement === el.fullscreen) {
    document.exitFullscreen().catch(() => {});
  }
  document.body.style.overflow = fullscreenBodyOverflow;
  fullscreenBodyOverflow = "";
  fullscreenHistory = [];
  fullscreenHistoryIndex = -1;
  fullscreenTokenVisible = false;
}

function initFullscreenPalette() {
  const overlay = ensureFullscreenOverlay();
  if (!overlay || overlay.dataset.ready === "1") return;
  overlay.dataset.ready = "1";
  const triggers = document.querySelectorAll("[data-action='palette-fullscreen']");
  triggers.forEach((btn) => {
    if (btn.dataset.fsBound === "1") return;
    btn.dataset.fsBound = "1";
    btn.addEventListener("click", openFullscreenPalette);
  });
  el.fullscreenExit?.addEventListener("click", closeFullscreenPalette);
  el.fullscreenCopyAll?.addEventListener("click", copyFullscreenAll);
  el.fullscreenTokenCopy?.addEventListener("click", copyFullscreenTokens);
  overlay.addEventListener("click", handleFullscreenOverlayClick);
  overlay.addEventListener("pointerdown", handleFullscreenOverlayPointerDown);
  overlay.addEventListener("input", handleFullscreenOverlayInput);
  overlay.addEventListener("change", handleFullscreenOverlayChange);
  el.fullscreenPicker?.addEventListener("change", handleFullscreenPickerChange);
  el.fullscreenPicker?.addEventListener("input", handleFullscreenPickerChange);
}

function initPaletteCardCtas() {
  const bind = (selector, handler) => {
    document.querySelectorAll(selector).forEach((btn) => {
      if (btn.dataset.ctaBound === "1") return;
      btn.dataset.ctaBound = "1";
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        handler(btn);
      });
    });
  };

  bind("[data-action='palette-goal-run']", (btn) => {
    const card = btn.closest("details");
    if (card) card.open = true;
    if (el.suggestBtn) {
      el.suggestBtn.click();
      return;
    }
    showToast("Chưa sẵn sàng gợi ý theo mục tiêu.");
  });

  bind("[data-action='palette-smart-run']", async (btn) => {
    const card = btn.closest("details");
    if (card) card.open = true;
    const brief = String(el.smartBrief?.value || "").trim();
    if (!brief) {
      showToast("Hãy nhập brief 1 dòng.");
      el.smartBrief?.focus();
      return;
    }
    if (el.smartGenerate) {
      el.smartGenerate.click();
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

  bind("[data-action='palette-hex-run']", (btn) => {
    const card = btn.closest("details");
    if (card) card.open = true;
    const stops = parseHexList(el.hexInput?.value || "").slice(0, 5);
    if (stops.length < MIN_STOPS) {
      showToast("Hãy nhập ít nhất 2 màu hợp lệ.");
      el.hexInput?.focus();
      return;
    }
    const next = applyLocks(buildHexPaletteFromInput(stops));
    createUserPalette(next, "Palette từ HEX", ["hex"]);
  });
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

function ensurePresetDetailOverlay() {
  if (el.presetDetail && el.presetDetailBody) return el.presetDetail;
  const overlay = document.getElementById("palettePresetDetail");
  const body = document.getElementById("palettePresetDetailBody");
  if (overlay && body) {
    el.presetDetail = overlay;
    el.presetDetailBody = body;
    return overlay;
  }
  return null;
}

function openPresetDetail(palette) {
  if (!palette) return;
  const overlay = ensurePresetDetailOverlay();
  if (!overlay || !el.presetDetailBody) return;
  selectPalette(palette);
  el.presetDetailBody.innerHTML = "";
  const detail = renderPaletteCard(palette);
  detail.classList.add("tc-palette-detail-card");
  el.presetDetailBody.appendChild(detail);
  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  presetDetailOpen = true;
  presetDetailBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
}

function closePresetDetail() {
  if (!el.presetDetail) return;
  el.presetDetail.classList.add("hidden");
  el.presetDetail.setAttribute("aria-hidden", "true");
  if (el.presetDetailBody) el.presetDetailBody.innerHTML = "";
  document.body.style.overflow = presetDetailBodyOverflow;
  presetDetailBodyOverflow = "";
  presetDetailOpen = false;
}

function initPresetDetail() {
  const overlay = ensurePresetDetailOverlay();
  if (!overlay || overlay.dataset.ready === "1") return;
  overlay.dataset.ready = "1";
  overlay.addEventListener("click", (event) => {
    if (event.target.closest("[data-preset-close]")) {
      closePresetDetail();
    }
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && presetDetailOpen) {
      closePresetDetail();
    }
  });
}

function renderPaletteMiniCard(palette) {
  const card = document.createElement("div");
  card.className = "tc-card tc-palette-mini p-3 flex flex-col gap-2";
  card.dataset.paletteId = palette.id || "";
  card.tabIndex = 0;
  card.setAttribute("role", "button");

  const title = document.createElement("p");
  title.className = "text-sm font-semibold";
  title.textContent = palette.ten || "Bảng phối màu";

  const swatchRow = document.createElement("div");
  swatchRow.className = "tc-palette-mini-swatches";
  (palette.stops || []).slice(0, 5).forEach((hex) => {
    const swatch = document.createElement("span");
    swatch.className = "tc-palette-mini-swatch";
    swatch.style.background = hex;
    swatch.setAttribute("aria-label", hex.toUpperCase());
    swatchRow.appendChild(swatch);
  });

  card.appendChild(title);
  card.appendChild(swatchRow);

  const openDetail = () => {
    openPresetDetail(palette);
  };
  card.addEventListener("click", openDetail);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetail();
    }
  });

  return card;
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

  const printSpecBtn = document.createElement("button");
  printSpecBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  printSpecBtn.type = "button";
  printSpecBtn.textContent = "Tạo bản thông số in";
  printSpecBtn.addEventListener("click", () => {
    const stops = (palette.stops || []).filter(Boolean);
    if (!stops.length) return;
    const hash = encodeURIComponent(stops.join(","));
    window.location.href = `printcolor.html#p=${hash}`;
  });

  actions.appendChild(printSpecBtn);

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
    el.grid.appendChild(renderPaletteMiniCard(palette));
  });
}

function safeDecode(value) {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch (_err) {
    return value;
  }
}

function decodePaletteStops(raw) {
  if (!raw) return null;
  const decoded = safeDecode(raw).trim();
  if (!decoded) return null;
  let list = null;
  if (decoded.startsWith("{") || decoded.startsWith("[")) {
    try {
      const payload = JSON.parse(decoded);
      if (Array.isArray(payload)) {
        list = payload;
      } else if (Array.isArray(payload?.colors)) {
        list = payload.colors;
      } else if (Array.isArray(payload?.stops)) {
        list = payload.stops;
      }
    } catch (_err) {
      list = null;
    }
  }
  if (!list) {
    list = decoded.split(",");
  }
  const stops = list.map((s) => normalizeHex(s)).filter(Boolean);
  if (stops.length >= MIN_STOPS && stops.length <= MAX_STOPS) {
    return stops;
  }
  return null;
}

function getHashStops(key) {
  const hash = (window.location.hash || "").replace("#", "");
  if (!hash) return null;
  const params = new URLSearchParams(hash);
  const raw = params.get(key);
  if (!raw) return null;
  return decodePaletteStops(raw);
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
  initFullscreenPalette();
  initPaletteCardCtas();
  initPresetDetail();

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
  setWorkbenchContext(normalized, { worldKey: "palette", source: "hex-apply" });
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

bootstrapIncomingHandoff({
  minColors: 2,
  worldKey: "palette",
  applyFn: (hexes) => applyHexesFromHub({ hexes, mode: "replace" })
});
