export function normalizeHex(input) {
  if (!input) return null;
  let value = String(input).trim();
  if (!value) return null;
  if (!value.startsWith("#")) value = `#${value}`;
  value = value.toLowerCase();
  return /^#[0-9a-f]{6}$/.test(value) ? value : null;
}

export function hexToRgb(hex) {
  const cleaned = normalizeHex(hex);
  if (!cleaned) return null;
  const raw = cleaned.replace("#", "");
  return {
    r: parseInt(raw.slice(0, 2), 16),
    g: parseInt(raw.slice(2, 4), 16),
    b: parseInt(raw.slice(4, 6), 16)
  };
}

export function rgbToHsl({ r, g, b }) {
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

export function hslToHex(h, s, l) {
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

export function rgbToLab({ r, g, b }) {
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

export function deltaE76(lab1, lab2) {
  if (!lab1 || !lab2) return null;
  return Math.sqrt(
    (lab1[0] - lab2[0]) ** 2 +
    (lab1[1] - lab2[1]) ** 2 +
    (lab1[2] - lab2[2]) ** 2
  );
}

export function clampNumber(value, min, max) {
  const num = Number(value);
  if (Number.isNaN(num)) return min;
  return Math.max(min, Math.min(max, num));
}

export function rgbToCmykApprox({ r, g, b }) {
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

export function formatCmyk(cmyk) {
  if (!cmyk) return "--";
  return `${cmyk.c}/${cmyk.m}/${cmyk.y}/${cmyk.k}`;
}

export function gradientCss(stops) {
  const total = stops.length;
  if (total <= 1) return stops[0] || "#000000";
  const parts = stops.map((hex, idx) => {
    const pct = Math.round((idx / (total - 1)) * 100);
    return `${hex} ${pct}%`;
  });
  return `linear-gradient(90deg, ${parts.join(", ")})`;
}

export function relativeLuminance(hex) {
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

export function contrastRatio(hexA, hexB) {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

export function toHexByte(value) {
  return Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0");
}

export function rgbToHexUpper(r, g, b) {
  return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`.toUpperCase();
}

export function colorDistanceSq(a, b) {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return dr * dr + dg * dg + db * db;
}

export function sampleImagePixels(imageData, priorityMode) {
  const width = Number(imageData?.width || 0);
  const height = Number(imageData?.height || 0);
  const data = imageData?.data;
  if (!width || !height || !data?.length) return [];
  const totalPixels = width * height;
  const targetSamples = 12000;
  const stride = Math.max(1, Math.floor(Math.sqrt(totalPixels / targetSamples)));
  const samples = [];

  for (let y = 0; y < height; y += stride) {
    const rowOffset = y * width * 4;
    for (let x = 0; x < width; x += stride) {
      const idx = rowOffset + x * 4;
      const alpha = data[idx + 3];
      if (alpha < 24) continue;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const rn = r / 255;
      const gn = g / 255;
      const bn = b / 255;
      const max = Math.max(rn, gn, bn);
      const min = Math.min(rn, gn, bn);
      const lum = (max + min) / 2;
      const delta = max - min;
      const sat = delta === 0 ? 0 : (lum > 0.5 ? delta / (2 - max - min) : delta / (max + min));
      const midTone = 1 - Math.min(1, Math.abs(lum - 0.5) * 2);
      const vividWeight = 0.45 + sat * 1.9;
      const softWeight = 0.55 + midTone * 1.2 + (1 - sat) * 0.35;
      const weight = priorityMode === "soft" ? softWeight : vividWeight;
      samples.push({ r, g, b, weight });
    }
  }
  return samples;
}

export function initKMeansCentroids(samples, count) {
  if (!samples.length) return [];
  const centroids = [];
  let first = samples[0];
  samples.forEach((sample) => {
    if (sample.weight > first.weight) first = sample;
  });
  centroids.push({ r: first.r, g: first.g, b: first.b });
  while (centroids.length < count) {
    let best = null;
    let bestScore = -1;
    samples.forEach((sample) => {
      let minDist = Number.POSITIVE_INFINITY;
      centroids.forEach((center) => {
        minDist = Math.min(minDist, colorDistanceSq(sample, center));
      });
      const score = minDist * Math.max(0.1, sample.weight);
      if (score > bestScore) {
        bestScore = score;
        best = sample;
      }
    });
    if (!best) break;
    centroids.push({ r: best.r, g: best.g, b: best.b });
  }
  return centroids;
}

export function quantizeSamplesKMeans(samples, targetCount) {
  if (!samples.length) return [];
  const count = Math.max(1, Math.min(targetCount, samples.length));
  const centroids = initKMeansCentroids(samples, count);
  if (!centroids.length) return [];

  for (let iteration = 0; iteration < 12; iteration += 1) {
    const sums = Array.from({ length: centroids.length }, () => ({ r: 0, g: 0, b: 0, w: 0 }));
    samples.forEach((sample) => {
      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      centroids.forEach((center, idx) => {
        const dist = colorDistanceSq(sample, center);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });
      const weight = Math.max(0.1, sample.weight);
      sums[bestIdx].r += sample.r * weight;
      sums[bestIdx].g += sample.g * weight;
      sums[bestIdx].b += sample.b * weight;
      sums[bestIdx].w += weight;
    });

    let totalShift = 0;
    sums.forEach((sum, idx) => {
      if (sum.w <= 0) {
        const fallback = samples[(idx * 131 + iteration * 17) % samples.length];
        totalShift += colorDistanceSq(centroids[idx], fallback);
        centroids[idx] = { r: fallback.r, g: fallback.g, b: fallback.b };
        return;
      }
      const next = {
        r: sum.r / sum.w,
        g: sum.g / sum.w,
        b: sum.b / sum.w
      };
      totalShift += colorDistanceSq(centroids[idx], next);
      centroids[idx] = next;
    });
    if (totalShift < centroids.length * 0.7) break;
  }
  return centroids;
}

export function hasCloseColor(colors, candidate, threshold) {
  return colors.some((color) => Math.sqrt(colorDistanceSq(color, candidate)) < threshold);
}

export function sortRgbByHue(colors) {
  const list = [...colors];
  list.sort((a, b) => {
    const ahsl = rgbToHsl(a);
    const bhsl = rgbToHsl(b);
    if (ahsl.h !== bhsl.h) return ahsl.h - bhsl.h;
    return ahsl.l - bhsl.l;
  });
  return list;
}

export function extractPaletteFromImageData(imageData, requestedCount, priorityMode, options = {}) {
  const minCount = Number(options.minCount);
  const maxCount = Number(options.maxCount);
  const safeMin = Number.isFinite(minCount) ? minCount : 3;
  const safeMax = Number.isFinite(maxCount) ? maxCount : 8;
  const target = clampNumber(requestedCount, safeMin, safeMax);
  const samples = sampleImagePixels(imageData, priorityMode);
  if (samples.length < 12) return [];
  const centroids = quantizeSamplesKMeans(samples, target);
  const unique = [];
  centroids.forEach((center) => {
    if (!hasCloseColor(unique, center, 18)) unique.push(center);
  });
  if (unique.length < target) {
    const fallbackPool = [...samples].sort((a, b) => b.weight - a.weight);
    fallbackPool.forEach((sample) => {
      if (unique.length >= target) return;
      if (!hasCloseColor(unique, sample, 16)) {
        unique.push({ r: sample.r, g: sample.g, b: sample.b });
      }
    });
  }
  const sorted = sortRgbByHue(unique).slice(0, target);
  return sorted.map((color) => rgbToHexUpper(color.r, color.g, color.b));
}

export function buildHarmonyPalette(baseHex, rule) {
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

export function buildTonePalette(tone, count) {
  const palette = [];
  const baseHue = Math.floor(Math.random() * 360);
  const toneMap = {
    fresh: { s: [70, 90], l: [45, 60] },
    pastel: { s: [25, 45], l: [70, 85] },
    deep: { s: [40, 60], l: [25, 40] },
    lux: { s: [20, 40], l: [35, 55] }
  };
  const conf = toneMap[tone] || toneMap.fresh;
  for (let i = 0; i < count; i += 1) {
    const h = (baseHue + i * 18) % 360;
    const s = clampNumber(conf.s[0] + Math.random() * (conf.s[1] - conf.s[0]), 10, 95);
    const l = clampNumber(conf.l[0] + Math.random() * (conf.l[1] - conf.l[0]), 15, 90);
    palette.push(hslToHex(h, s, l));
  }
  return palette;
}
