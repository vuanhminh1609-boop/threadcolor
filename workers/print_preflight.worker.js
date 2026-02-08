const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const rgbToCmyk = (r, g, b) => {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const kRaw = 1 - Math.max(rNorm, gNorm, bNorm);
  if (kRaw >= 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }
  const denom = 1 - kRaw;
  const c = denom === 0 ? 0 : (1 - rNorm - kRaw) / denom;
  const m = denom === 0 ? 0 : (1 - gNorm - kRaw) / denom;
  const y = denom === 0 ? 0 : (1 - bNorm - kRaw) / denom;
  return {
    c: c * 100,
    m: m * 100,
    y: y * 100,
    k: kRaw * 100
  };
};

self.onmessage = (event) => {
  const payload = event.data || {};
  const width = payload.width || 0;
  const height = payload.height || 0;
  const buffer = payload.buffer;
  const tacLimit = Number.isFinite(payload.tacLimit) ? payload.tacLimit : 300;
  const seq = payload.seq || 0;
  if (!buffer || !width || !height) return;

  const data = new Uint8ClampedArray(buffer);
  const total = width * height;
  const heat = new Uint8Array(total);
  let countOver = 0;
  let maxTac = 0;
  const denom = Math.max(1, 400 - tacLimit);

  for (let i = 0; i < total; i += 1) {
    const idx = i * 4;
    const a = data[idx + 3];
    if (a < 8) {
      heat[i] = 0;
      continue;
    }
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const cmyk = rgbToCmyk(r, g, b);
    const tac = cmyk.c + cmyk.m + cmyk.y + cmyk.k;
    if (tac > maxTac) maxTac = tac;
    const over = tac - tacLimit;
    if (over > 0) {
      countOver += 1;
      const intensity = clamp(Math.round((over / denom) * 255), 0, 255);
      heat[i] = intensity;
    }
  }

  const maxTacRounded = Math.round(maxTac * 10) / 10;
  self.postMessage(
    {
      heat,
      countOver,
      maxTac: maxTacRounded,
      total,
      width,
      height,
      seq
    },
    [heat.buffer]
  );
};
