const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));

const rgbToHex = (r, g, b) => {
  const toHex = (v) => clamp(v).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

const buildHistogram = (data, bits = 5) => {
  const shift = 8 - bits;
  const map = new Map();
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 40) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const rQ = r >> shift;
    const gQ = g >> shift;
    const bQ = b >> shift;
    const key = (rQ << (bits * 2)) | (gQ << bits) | bQ;
    let bin = map.get(key);
    if (!bin) {
      bin = { r: 0, g: 0, b: 0, count: 0 };
      map.set(key, bin);
    }
    bin.r += r;
    bin.g += g;
    bin.b += b;
    bin.count += 1;
  }
  return Array.from(map.values()).map((bin) => ({
    r: bin.r,
    g: bin.g,
    b: bin.b,
    count: bin.count,
    avgR: bin.r / bin.count,
    avgG: bin.g / bin.count,
    avgB: bin.b / bin.count
  }));
};

const weightedKMeans = (bins, k, iterations = 6) => {
  if (!bins.length) return { centers: [], shares: [] };
  const sorted = bins.slice().sort((a, b) => b.count - a.count);
  const centerCount = Math.min(k, sorted.length);
  const centers = sorted.slice(0, centerCount).map((bin) => ({
    r: bin.avgR,
    g: bin.avgG,
    b: bin.avgB
  }));
  for (let iter = 0; iter < iterations; iter += 1) {
    const sumR = new Array(centerCount).fill(0);
    const sumG = new Array(centerCount).fill(0);
    const sumB = new Array(centerCount).fill(0);
    const sumW = new Array(centerCount).fill(0);
    bins.forEach((bin) => {
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < centerCount; i += 1) {
        const dr = bin.avgR - centers[i].r;
        const dg = bin.avgG - centers[i].g;
        const db = bin.avgB - centers[i].b;
        const dist = dr * dr + dg * dg + db * db;
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      sumR[best] += bin.avgR * bin.count;
      sumG[best] += bin.avgG * bin.count;
      sumB[best] += bin.avgB * bin.count;
      sumW[best] += bin.count;
    });
    for (let i = 0; i < centerCount; i += 1) {
      if (sumW[i] <= 0) continue;
      centers[i] = {
        r: sumR[i] / sumW[i],
        g: sumG[i] / sumW[i],
        b: sumB[i] / sumW[i]
      };
    }
  }
  const shares = new Array(centerCount).fill(0);
  const total = bins.reduce((sum, bin) => sum + bin.count, 0) || 1;
  bins.forEach((bin) => {
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < centerCount; i += 1) {
      const dr = bin.avgR - centers[i].r;
      const dg = bin.avgG - centers[i].g;
      const db = bin.avgB - centers[i].b;
      const dist = dr * dr + dg * dg + db * db;
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    shares[best] += bin.count;
  });
  const sharePercent = shares.map((value) => Math.round((value / total) * 100));
  return { centers, shares: sharePercent };
};

self.onmessage = (event) => {
  const { id, buffer, count } = event.data || {};
  try {
    const data = buffer ? new Uint8ClampedArray(buffer) : null;
    if (!data || !data.length) {
      self.postMessage({ id, error: "no-data" });
      return;
    }
    const bins = buildHistogram(data, 5);
    const result = weightedKMeans(bins, Math.max(1, count || 5), 7);
    const palette = result.centers.map((c) => rgbToHex(c.r, c.g, c.b));
    self.postMessage({ id, palette, shares: result.shares });
  } catch (err) {
    self.postMessage({ id, error: err?.message || "worker-error" });
  }
};
