const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const normalizeHex = (value) => {
  if (!value) return "";
  const raw = String(value).trim().replace(/^0x/i, "").replace(/[^0-9a-fA-F]/g, "");
  if (raw.length === 3) {
    const expanded = raw.split("").map((c) => c + c).join("");
    return `#${expanded.toUpperCase()}`;
  }
  if (raw.length === 6) return `#${raw.toUpperCase()}`;
  return "";
};

const hexToRgb = (hex) => {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  const int = parseInt(normalized.slice(1), 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255
  };
};

const rgbToHsl = (r, g, b) => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  let h = 0;
  if (delta !== 0) {
    if (max === rn) h = ((gn - bn) / delta) % 6;
    if (max === gn) h = (bn - rn) / delta + 2;
    if (max === bn) h = (rn - gn) / delta + 4;
  }
  h = Math.round((h * 60 + 360) % 360);
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
};

const relativeLuminance = (rgb) => {
  if (!rgb) return 0;
  const toLinear = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const r = toLinear(rgb.r);
  const g = toLinear(rgb.g);
  const b = toLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrastRatio = (rgb1, rgb2) => {
  const l1 = relativeLuminance(rgb1);
  const l2 = relativeLuminance(rgb2);
  const bright = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (bright + 0.05) / (dark + 0.05);
};

const ensureMetrics = (input = {}) => {
  const hex = normalizeHex(input.hex || "");
  const rgb = input.rgb || (hex ? hexToRgb(hex) : null);
  const hsl = input.hsl || (rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null);
  return { hex, rgb, hsl };
};

const normalizeMode = (value) => {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) return "";
  if (raw.includes("ui")) return "UI";
  if (raw.includes("poster")) return "Poster";
  if (raw.includes("thêu") || raw.includes("theu") || raw.includes("thread")) return "Thêu";
  return "";
};

const buildUiTag = (rgb, hsl) => {
  const contrastWhite = contrastRatio(rgb, { r: 255, g: 255, b: 255 });
  const contrastBlack = contrastRatio(rgb, { r: 0, g: 0, b: 0 });
  let role = "CTA";
  if (contrastWhite >= 7) role = "Chữ";
  else if (contrastBlack >= 7) role = "Nền";
  else if ((hsl?.s ?? 0) < 35) role = "Nền";
  const scoreBase = Math.max(contrastWhite, contrastBlack) * 5;
  const score = clamp(scoreBase + (hsl?.s ?? 0) * 0.2, 0, 100);
  return { key: "UI", label: `Hợp UI · ${role}`, score };
};

const buildPosterTag = (hsl) => {
  const s = hsl?.s ?? 0;
  const l = hsl?.l ?? 0;
  let role = "Nền";
  if (s >= 60 && l >= 35 && l <= 70) role = "Nổi bật";
  else if (s >= 45) role = "Điểm nhấn";
  const score = clamp(s * 0.7 + (100 - Math.abs(l - 50)) * 0.3, 0, 100);
  return { key: "Poster", label: `Hợp Poster · ${role}`, score };
};

const buildEmbroideryTag = (nearest) => {
  const delta = Number.isFinite(nearest?.delta) ? nearest.delta : null;
  let role = "Khó khớp";
  if (delta != null && delta <= 2) role = "Có mã gần";
  else if (delta != null && delta <= 4) role = "Dễ thay thế";
  const score = delta == null ? 20 : clamp(100 - delta * 12, 10, 100);
  return { key: "Thêu", label: `Hợp Thêu · ${role}`, score };
};

export const computeContextTags = (input = {}) => {
  const { rgb, hsl } = ensureMetrics(input);
  if (!rgb || !hsl) return [];
  const candidates = [
    buildUiTag(rgb, hsl),
    buildPosterTag(hsl),
    buildEmbroideryTag(input.nearest)
  ];
  const modeKey = normalizeMode(input.mode);
  const picked = [];
  if (modeKey) {
    const forced = candidates.find((item) => item.key === modeKey);
    if (forced) picked.push(forced);
  }
  const remain = candidates.filter((item) => !picked.includes(item))
    .sort((a, b) => b.score - a.score);
  return [...picked, ...remain].slice(0, 2).map((item) => item.label);
};
