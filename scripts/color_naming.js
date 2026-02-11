import { BRIGHTNESS_LEVELS, CANONICAL_SIGNATURES, SIGNATURE_FALLBACK } from "./color_lexicon_vi.js";

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

const rgbToHsv = (r, g, b) => {
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
  const s = max === 0 ? 0 : delta / max;
  return { h, s: Math.round(s * 100), v: Math.round(max * 100) };
};

const rgbToXyz = (r, g, b) => {
  let rn = r / 255;
  let gn = g / 255;
  let bn = b / 255;
  rn = rn > 0.04045 ? Math.pow((rn + 0.055) / 1.055, 2.4) : rn / 12.92;
  gn = gn > 0.04045 ? Math.pow((gn + 0.055) / 1.055, 2.4) : gn / 12.92;
  bn = bn > 0.04045 ? Math.pow((bn + 0.055) / 1.055, 2.4) : bn / 12.92;
  return {
    x: (rn * 0.4124 + gn * 0.3576 + bn * 0.1805) * 100,
    y: (rn * 0.2126 + gn * 0.7152 + bn * 0.0722) * 100,
    z: (rn * 0.0193 + gn * 0.1192 + bn * 0.9505) * 100
  };
};

const xyzToLab = (x, y, z) => {
  let xn = x / 95.047;
  let yn = y / 100;
  let zn = z / 108.883;
  xn = xn > 0.008856 ? Math.cbrt(xn) : (7.787 * xn + 16 / 116);
  yn = yn > 0.008856 ? Math.cbrt(yn) : (7.787 * yn + 16 / 116);
  zn = zn > 0.008856 ? Math.cbrt(zn) : (7.787 * zn + 16 / 116);
  return {
    l: Math.round(116 * yn - 16),
    a: Math.round(500 * (xn - yn)),
    b: Math.round(200 * (yn - zn))
  };
};

const rgbToLab = (r, g, b) => {
  const xyz = rgbToXyz(r, g, b);
  return xyzToLab(xyz.x, xyz.y, xyz.z);
};

const ensureMetrics = (input = {}) => {
  const hex = normalizeHex(input.hex || "");
  const rgb = input.rgb || (hex ? hexToRgb(hex) : null);
  const hsl = input.hsl || (rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null);
  const hsv = input.hsv || (rgb ? rgbToHsv(rgb.r, rgb.g, rgb.b) : null);
  const lab = input.lab || (rgb ? rgbToLab(rgb.r, rgb.g, rgb.b) : null);
  return { hex, rgb, hsl, hsv, lab };
};

const resolveBrightness = (hsl) => {
  const lightness = hsl?.l ?? 0;
  if (lightness >= 92) return BRIGHTNESS_LEVELS[0];
  if (lightness >= 75) return BRIGHTNESS_LEVELS[1];
  if (lightness >= 50) return BRIGHTNESS_LEVELS[2];
  if (lightness >= 30) return BRIGHTNESS_LEVELS[3];
  return BRIGHTNESS_LEVELS[4];
};

const resolveTemperature = (hsl, lab, isNeutral) => {
  const saturation = hsl?.s ?? 0;
  if (isNeutral && lab) {
    if (lab.b >= 8) return "ấm";
    if (lab.b <= -8) return "lạnh";
    return "";
  }
  if (saturation < 18) return "";
  const hue = hsl?.h ?? 0;
  if (hue < 70 || hue >= 330) return "ấm";
  if (hue >= 70 && hue < 250) return "lạnh";
  return "lạnh";
};

const resolveCanonical = (hsl, hsv, lab) => {
  const lightness = hsl?.l ?? 0;
  const saturation = hsl?.s ?? 0;
  const hsvSat = hsv?.s ?? saturation;
  if (saturation < 8 || hsvSat < 10) {
    if (lightness >= 95) return "neutral.white";
    if (lightness <= 10) return "neutral.black";
    if (lightness >= 82 && lab?.b >= 12) return "neutral.ivory";
    if (lightness >= 70 && lab?.b >= 18) return "neutral.beige";
    if (lab?.b >= 6) return "neutral.warmgray";
    if (lab?.b <= -6) return "neutral.coolgray";
    return "neutral.gray";
  }
  const hue = hsl?.h ?? 0;
  if (lightness < 35 && hue >= 10 && hue < 50 && saturation >= 20) return "hue.brown";
  if (hue >= 345 || hue < 15) return "hue.red";
  if (hue < 35) return "hue.orange";
  if (hue < 60) return "hue.yellow";
  if (hue < 85) return "hue.lime";
  if (hue < 150) return "hue.green";
  if (hue < 190) return "hue.teal";
  if (hue < 210) return "hue.cyan";
  if (hue < 250) return "hue.blue";
  if (hue < 275) return "hue.indigo";
  if (hue < 305) return "hue.purple";
  if (hue < 330) return "hue.magenta";
  return "hue.pink";
};

const resolveSignature = (canonical) => CANONICAL_SIGNATURES[canonical] || SIGNATURE_FALLBACK;

export const buildDeltaLabel = (delta) => {
  if (!Number.isFinite(delta)) return "";
  if (delta <= 1) return "Cực giống";
  if (delta <= 2) return "Rất gần";
  if (delta <= 4) return "Gần";
  if (delta <= 8) return "Tham khảo";
  return "Xa";
};

export const buildPremiumHeaderModel = (input = {}) => {
  const { hex, rgb, hsl, hsv, lab } = ensureMetrics(input);
  const canonical = resolveCanonical(hsl, hsv, lab);
  const signature = resolveSignature(canonical);
  const brightness = resolveBrightness(hsl);
  const temperature = resolveTemperature(hsl, lab, canonical.startsWith("neutral."));

  const toneParts = [signature, brightness];
  if (temperature) toneParts.push(temperature);
  const toneLine = `Tên gợi ý: ${toneParts.join(" · ")}`;

  const nearest = input.nearest || null;
  const delta = nearest?.delta;
  const deltaLabel = buildDeltaLabel(delta);

  let nearestLine = "Gần nhất: Chưa có dữ liệu để đối chiếu";
  if (nearest && Number.isFinite(delta)) {
    const brand = nearest.brand || "";
    const code = nearest.code || "";
    const name = nearest.name || "Không tên";
    const label = deltaLabel || "Tham khảo";
    nearestLine = `Gần nhất: ${`${brand} ${code}`.trim()} — ${name} · ΔE ${delta.toFixed(2)} · ${label}`;
  }

  return {
    toneLine,
    nearestLine,
    deltaLabel,
    signature,
    brightness,
    temperature
  };
};
