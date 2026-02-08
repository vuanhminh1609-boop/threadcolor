let isReady = false;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const rgbToHex = (r, g, b) => {
  const toHex = (v) => v.toString(16).padStart(2, "0");
  return `#${toHex(clamp(Math.round(r), 0, 255))}${toHex(clamp(Math.round(g), 0, 255))}${toHex(clamp(Math.round(b), 0, 255))}`.toUpperCase();
};

const pickWeightedIndex = (weights) => {
  let total = 0;
  for (let i = 0; i < weights.length; i += 1) total += weights[i];
  if (!total) return Math.floor(Math.random() * weights.length);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i += 1) {
    r -= weights[i];
    if (r <= 0) return i;
  }
  return weights.length - 1;
};

const initCentroids = (samples, k) => {
  const sampleCount = samples.length / 3;
  const centroids = [];
  const firstIndex = Math.floor(Math.random() * sampleCount);
  centroids.push([
    samples[firstIndex * 3],
    samples[firstIndex * 3 + 1],
    samples[firstIndex * 3 + 2]
  ]);
  const distances = new Array(sampleCount).fill(0);
  while (centroids.length < k) {
    for (let i = 0; i < sampleCount; i += 1) {
      const r = samples[i * 3];
      const g = samples[i * 3 + 1];
      const b = samples[i * 3 + 2];
      let best = Infinity;
      for (let c = 0; c < centroids.length; c += 1) {
        const dr = r - centroids[c][0];
        const dg = g - centroids[c][1];
        const db = b - centroids[c][2];
        const d = dr * dr + dg * dg + db * db;
        if (d < best) best = d;
      }
      distances[i] = best;
    }
    const nextIndex = pickWeightedIndex(distances);
    centroids.push([
      samples[nextIndex * 3],
      samples[nextIndex * 3 + 1],
      samples[nextIndex * 3 + 2]
    ]);
  }
  return centroids;
};

const runKMeans = (samples, k, iterations = 8) => {
  const sampleCount = samples.length / 3;
  if (!sampleCount) return [];
  const centroids = initCentroids(samples, k);
  const assignments = new Array(sampleCount).fill(0);
  for (let iter = 0; iter < iterations; iter += 1) {
    const sums = Array.from({ length: k }, () => [0, 0, 0]);
    const counts = new Array(k).fill(0);
    for (let i = 0; i < sampleCount; i += 1) {
      const r = samples[i * 3];
      const g = samples[i * 3 + 1];
      const b = samples[i * 3 + 2];
      let best = 0;
      let bestDist = Infinity;
      for (let c = 0; c < k; c += 1) {
        const dr = r - centroids[c][0];
        const dg = g - centroids[c][1];
        const db = b - centroids[c][2];
        const d = dr * dr + dg * dg + db * db;
        if (d < bestDist) {
          bestDist = d;
          best = c;
        }
      }
      assignments[i] = best;
      sums[best][0] += r;
      sums[best][1] += g;
      sums[best][2] += b;
      counts[best] += 1;
    }
    for (let c = 0; c < k; c += 1) {
      if (!counts[c]) continue;
      centroids[c][0] = sums[c][0] / counts[c];
      centroids[c][1] = sums[c][1] / counts[c];
      centroids[c][2] = sums[c][2] / counts[c];
    }
  }
  return { centroids, assignments };
};

const extractPalette = (payload) => {
  const width = payload.width;
  const height = payload.height;
  const count = payload.count;
  const buffer = payload.buffer;
  if (!width || !height || !buffer) return [];
  const data = new Uint8ClampedArray(buffer);
  const totalPixels = width * height;
  const targetSamples = 12000;
  const step = Math.max(1, Math.floor(totalPixels / targetSamples));
  const samples = [];
  for (let i = 0; i < totalPixels; i += step) {
    const idx = i * 4;
    const a = data[idx + 3];
    if (a < 16) continue;
    samples.push(data[idx], data[idx + 1], data[idx + 2]);
  }
  const sampleCount = samples.length / 3;
  if (!sampleCount) return [];
  const k = Math.max(1, Math.min(count, sampleCount));
  const result = runKMeans(samples, k);
  if (!result) return [];
  const { centroids, assignments } = result;
  const counts = new Array(k).fill(0);
  for (let i = 0; i < assignments.length; i += 1) {
    counts[assignments[i]] += 1;
  }
  const total = counts.reduce((sum, v) => sum + v, 0) || 1;
  const output = centroids.map((centroid, idx) => ({
    hex: rgbToHex(centroid[0], centroid[1], centroid[2]),
    count: counts[idx],
    percent: (counts[idx] / total) * 100
  }));
  output.sort((a, b) => b.count - a.count);
  return output;
};

self.onmessage = (event) => {
  const data = event.data || {};
  if (data.type === "init") {
    if (!isReady) {
      isReady = true;
      self.postMessage({ type: "ready" });
    }
    return;
  }
  if (data.type !== "extract") return;
  const { id, payload } = data;
  try {
    const colors = extractPalette(payload);
    self.postMessage({ id, colors });
  } catch (err) {
    self.postMessage({ id, error: err?.message || "palette-extract-failed" });
  }
};
