let threads = [];
let labCache = new Map();
let threadsByBrand = new Map();

function isVerifiedThread(thread) {
  const conf = typeof thread?.confidence === "number" ? thread.confidence : 0;
  return conf >= 0.85 || thread?.source?.type === "CROWD_VERIFIED";
}

function buildIndexes(list) {
  const byBrand = new Map();
  list.forEach((thread) => {
    if (!thread || !thread.brand) return;
    if (!byBrand.has(thread.brand)) byBrand.set(thread.brand, []);
    byBrand.get(thread.brand).push(thread);
  });
  threadsByBrand = byBrand;
}

function addTopK(list, item, limit) {
  if (list.length < limit) {
    list.push(item);
    return;
  }
  let worstIndex = 0;
  let worst = list[0].delta;
  for (let i = 1; i < list.length; i += 1) {
    if (list[i].delta > worst) {
      worst = list[i].delta;
      worstIndex = i;
    }
  }
  if (item.delta < worst) list[worstIndex] = item;
}

function normalizeHex(hex) {
  if (!hex || typeof hex !== "string") return null;
  let v = hex.trim().toLowerCase().replace(/^##/, "#");
  if (!v.startsWith("#")) v = "#" + v;
  return /^#[0-9a-f]{6}$/.test(v) ? v : null;
}

function hexToRgbArray(hex) {
  const num = parseInt(hex.slice(1), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToLab([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  let y = (r * 0.2126 + g * 0.7152 + b * 0.0722);
  let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.cbrt(x) : (7.787 * x + 16 / 116);
  y = y > 0.008856 ? Math.cbrt(y) : (7.787 * y + 16 / 116);
  z = z > 0.008856 ? Math.cbrt(z) : (7.787 * z + 16 / 116);

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

function getLabForHex(hex) {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  const cached = labCache.get(normalized);
  if (cached) return cached;
  const lab = rgbToLab(hexToRgbArray(normalized));
  labCache.set(normalized, lab);
  return lab;
}

function deltaE76(lab1, lab2) {
  return Math.sqrt(
    (lab1[0] - lab2[0]) ** 2 +
    (lab1[1] - lab2[1]) ** 2 +
    (lab1[2] - lab2[2]) ** 2
  );
}

function deltaE2000(lab1, lab2) {
  const [l1, a1, b1] = lab1;
  const [l2, a2, b2] = lab2;
  const avgL = (l1 + l2) / 2;
  const c1 = Math.sqrt(a1 * a1 + b1 * b1);
  const c2 = Math.sqrt(a2 * a2 + b2 * b2);
  const avgC = (c1 + c2) / 2;
  const g = 0.5 * (1 - Math.sqrt(Math.pow(avgC, 7) / (Math.pow(avgC, 7) + Math.pow(25, 7))));
  const a1p = (1 + g) * a1;
  const a2p = (1 + g) * a2;
  const c1p = Math.sqrt(a1p * a1p + b1 * b1);
  const c2p = Math.sqrt(a2p * a2p + b2 * b2);
  const avgCp = (c1p + c2p) / 2;
  const h1p = Math.atan2(b1, a1p) >= 0 ? Math.atan2(b1, a1p) : Math.atan2(b1, a1p) + 2 * Math.PI;
  const h2p = Math.atan2(b2, a2p) >= 0 ? Math.atan2(b2, a2p) : Math.atan2(b2, a2p) + 2 * Math.PI;
  let deltahp = h2p - h1p;
  if (Math.abs(deltahp) > Math.PI) {
    deltahp -= Math.sign(deltahp) * 2 * Math.PI;
  }
  const deltaLp = l2 - l1;
  const deltaCp = c2p - c1p;
  const deltaHp = 2 * Math.sqrt(c1p * c2p) * Math.sin(deltahp / 2);
  const avgLp = (l1 + l2) / 2;
  let avghp = h1p + h2p;
  if (Math.abs(h1p - h2p) > Math.PI) {
    avghp += 2 * Math.PI;
  }
  avghp /= 2;
  const t = 1
    - 0.17 * Math.cos(avghp - Math.PI / 6)
    + 0.24 * Math.cos(2 * avghp)
    + 0.32 * Math.cos(3 * avghp + Math.PI / 30)
    - 0.20 * Math.cos(4 * avghp - 7 * Math.PI / 18);
  const deltaTheta = (30 * Math.PI / 180) * Math.exp(-(((avghp * 180 / Math.PI) - 275) / 25) ** 2);
  const rc = 2 * Math.sqrt(Math.pow(avgCp, 7) / (Math.pow(avgCp, 7) + Math.pow(25, 7)));
  const sl = 1 + (0.015 * ((avgLp - 50) ** 2)) / Math.sqrt(20 + ((avgLp - 50) ** 2));
  const sc = 1 + 0.045 * avgCp;
  const sh = 1 + 0.015 * avgCp * t;
  const rt = -Math.sin(2 * deltaTheta) * rc;
  return Math.sqrt(
    (deltaLp / sl) ** 2 +
    (deltaCp / sc) ** 2 +
    (deltaHp / sh) ** 2 +
    rt * (deltaCp / sc) * (deltaHp / sh)
  );
}

function getDelta(lab1, lab2, method) {
  return method === "2000" ? deltaE2000(lab1, lab2) : deltaE76(lab1, lab2);
}

self.onmessage = (event) => {
  const data = event.data || {};
  if (data.type === "init") {
    threads = Array.isArray(data.threads) ? data.threads : [];
    labCache = new Map();
    buildIndexes(threads);
    self.postMessage({ type: "ready" });
    return;
  }
  if (data.type !== "search") return;
  const { id, payload } = data;
  try {
    const start = Date.now();
    const targetHex = normalizeHex(payload.targetHex);
    const targetLab = payload.targetLab || (targetHex ? getLabForHex(targetHex) : null);
    if (!targetLab) {
      self.postMessage({ id, results: [], stats: { ms: 0 } });
      return;
    }
    const brands = Array.isArray(payload.brands) ? payload.brands : [];
    const requireVerified = !!payload.verifiedOnly;
    const method = payload.method === "2000" ? "2000" : "76";
    const limit = typeof payload.limit === "number" ? payload.limit : 100;
    const lists = brands.length ? brands.map(brand => threadsByBrand.get(brand) || []) : [threads];
    if (method === "2000") {
      const candidateCount = Math.max(limit * 20, 200);
      const candidates = [];
      for (const list of lists) {
        for (const t of list) {
          if (requireVerified && !isVerifiedThread(t)) continue;
          const lab = t.lab && Array.isArray(t.lab) && t.lab.length === 3 ? t.lab : getLabForHex(t.hex);
          if (!lab) continue;
          const deltaFast = deltaE76(targetLab, lab);
          addTopK(candidates, { thread: t, lab, delta: deltaFast }, candidateCount);
        }
      }
      const results = [];
      for (const candidate of candidates) {
        const delta = deltaE2000(targetLab, candidate.lab);
        addTopK(results, {
          hex: candidate.thread.hex,
          brand: candidate.thread.brand,
          code: candidate.thread.code,
          name: candidate.thread.name,
          source: candidate.thread.source,
          confidence: candidate.thread.confidence,
          lab: candidate.lab,
          delta
        }, limit);
      }
      results.sort((a, b) => a.delta - b.delta);
      const stats = { ms: Date.now() - start, total: candidates.length };
      self.postMessage({ id, results, stats });
      return;
    }

    const results = [];
    for (const list of lists) {
      for (const t of list) {
        if (requireVerified && !isVerifiedThread(t)) continue;
        const lab = t.lab && Array.isArray(t.lab) && t.lab.length === 3 ? t.lab : getLabForHex(t.hex);
        if (!lab) continue;
        const delta = deltaE76(targetLab, lab);
        addTopK(results, {
          hex: t.hex,
          brand: t.brand,
          code: t.code,
          name: t.name,
          source: t.source,
          confidence: t.confidence,
          lab,
          delta
        }, limit);
      }
    }
    results.sort((a, b) => a.delta - b.delta);
    const stats = { ms: Date.now() - start, total: results.length };
    self.postMessage({ id, results, stats });
  } catch (err) {
    self.postMessage({ id, error: err?.message || "worker-search-failed" });
  }
};
