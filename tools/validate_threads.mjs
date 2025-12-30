import { readFile, writeFile } from "node:fs/promises";

const threadsPath = new URL("../threads.json", import.meta.url);
const cleanedPath = new URL("../threads.cleaned.json", import.meta.url);
const conflictsPath = new URL("../threads.conflicts.json", import.meta.url);

const normalizeKey = (value) => {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
};

const normalizeCode = (value) => {
  return (value || "")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, " ");
};

const normalizeHex = (hex) => {
  if (!hex || typeof hex !== "string") return null;
  let v = hex.trim().toLowerCase().replace(/^##/, "#");
  if (!v.startsWith("#")) v = "#" + v;
  return /^#[0-9a-f]{6}$/.test(v) ? v : null;
};

const hexToRgbArray = (hex) => {
  const num = parseInt(hex.slice(1), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const rgbToLab = ([r, g, b]) => {
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
};

const getScore = (record) => {
  const ratingScore = typeof record?.rating?.score === "number" ? record.rating.score : null;
  const voteScore = typeof record?.votes === "number" ? record.votes : null;
  const voteCount = typeof record?.voteCount === "number" ? record.voteCount : null;
  const confidence = typeof record?.confidence === "number" ? record.confidence : null;
  const base = ratingScore ?? voteScore ?? voteCount ?? confidence ?? 0;
  const verified = record?.source?.verified === true || record?.verified === true;
  return (verified ? 1000 : 0) + base;
};

export async function runValidation() {
  const raw = await readFile(threadsPath, "utf8");
  const data = JSON.parse(raw);
  const items = Array.isArray(data) ? data : [];
  const map = new Map();
  const conflicts = [];
  const cleaned = [];
  let deduped = 0;
  let computedLab = 0;
  let invalid = 0;

  for (const record of items) {
    const brand = typeof record?.brand === "string" ? record.brand.trim() : "";
    const code = typeof record?.code === "string" ? record.code.trim() : "";
    const hex = normalizeHex(record?.hex || "");
    if (!brand || !code || !hex) {
      invalid += 1;
      continue;
    }
    const brandKey = normalizeKey(brand);
    const codeKey = normalizeCode(code);
    const id = `${brandKey}:${codeKey}`;
    const existing = map.get(id);
    const withLab = Array.isArray(record?.lab) && record.lab.length === 3
      ? record.lab
      : rgbToLab(hexToRgbArray(hex));
    if (!record.lab || record.lab.length !== 3) computedLab += 1;
    const next = {
      ...record,
      brand,
      code,
      hex,
      lab: withLab,
      brandKey,
      codeKey,
      id
    };
    if (!existing) {
      map.set(id, { items: [next], hex });
      continue;
    }
    if (existing.hex !== hex) {
      existing.items.push(next);
      continue;
    }
    deduped += 1;
    existing.items.push(next);
  }

  for (const [id, group] of map.entries()) {
    const records = group.items;
    if (records.length === 1) {
      cleaned.push(records[0]);
      continue;
    }
    const uniqueHex = new Set(records.map(r => r.hex));
    if (uniqueHex.size > 1) {
      conflicts.push({ id, records });
      const sorted = [...records].sort((a, b) => getScore(b) - getScore(a));
      const picked = { ...sorted[0], needsReview: true };
      cleaned.push(picked);
      continue;
    }
    const sorted = [...records].sort((a, b) => getScore(b) - getScore(a));
    cleaned.push(sorted[0]);
    deduped += records.length - 1;
  }

  await writeFile(cleanedPath, JSON.stringify(cleaned, null, 2), "utf8");
  await writeFile(conflictsPath, JSON.stringify(conflicts, null, 2), "utf8");

  console.info("[validate_threads] total", items.length);
  console.info("[validate_threads] cleaned", cleaned.length);
  console.info("[validate_threads] invalid", invalid);
  console.info("[validate_threads] deduped", deduped);
  console.info("[validate_threads] conflicts", conflicts.length);
  console.info("[validate_threads] labComputed", computedLab);

  return { cleaned, conflicts, stats: { total: items.length, invalid, deduped, computedLab } };
}

if (import.meta.url === new URL(process.argv[1], "file:").href) {
  runValidation().catch((err) => {
    console.error("[validate_threads] failed", err);
    process.exit(1);
  });
}
