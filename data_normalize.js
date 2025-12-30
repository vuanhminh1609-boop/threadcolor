const SPACE_REGEX = /\s+/g;
const HEX_REGEX = /^#[0-9A-F]{6}$/;
const CONFIDENCE_MAP = {
  TCH: 0.9,
  OFFICIAL_CHART: 0.95,
  USER_SUBMISSION: 0.5,
  MANUAL: 0.6,
  LEGACY_JSON: 0.9,
  RUNTIME_JSON: 0.86
};

function normalizeWhitespace(value) {
  return typeof value === "string" ? value.replace(SPACE_REGEX, " ").trim() : "";
}

function normalizeHexValue(hex) {
  if (!hex || typeof hex !== "string") return null;
  let v = hex.trim();
  if (v.startsWith("##")) v = v.slice(1);
  if (!v.startsWith("#")) v = "#" + v;
  v = v.toUpperCase();
  return HEX_REGEX.test(v) ? v : null;
}

function normalizeRgbValue(rgb) {
  if (!rgb || typeof rgb !== "object") return null;
  const r = Number.isInteger(rgb.r) ? rgb.r : null;
  const g = Number.isInteger(rgb.g) ? rgb.g : null;
  const b = Number.isInteger(rgb.b) ? rgb.b : null;
  if ([r, g, b].some(v => v === null)) return null;
  if ([r, g, b].some(v => v < 0 || v > 255)) return null;
  return { r, g, b };
}

function hexToRgb(hex) {
  const num = parseInt(hex.slice(1), 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function normalizeSource(src) {
  if (!src || typeof src !== "object") return { type: "unknown" };
  return {
    type: src.type || "unknown",
    file: src.file,
    line: src.line,
    provider: src.provider,
    uid: src.uid
  };
}

function formatSourceForLog(source) {
  if (!source) return "";
  const parts = [source.type || "unknown"];
  if (source.file) parts.push(source.file);
  if (source.line) parts.push(`line ${source.line}`);
  if (source.provider) parts.push(`provider ${source.provider}`);
  if (source.uid) parts.push(`uid ${source.uid}`);
  return parts.join(" | ");
}

function resolveConfidence(rawConfidence, sourceType) {
  if (typeof rawConfidence === "number") return rawConfidence;
  const mapped = CONFIDENCE_MAP[(sourceType || "").toUpperCase()];
  return typeof mapped === "number" ? mapped : 0.5;
}

function applyTimestamps(meta = {}, options = {}) {
  if (!options.addTimestamps) return meta;
  const stamp = options.timestamp || new Date().toISOString();
  const nextMeta = { ...meta };
  if (!nextMeta.createdAt) nextMeta.createdAt = stamp;
  if (!nextMeta.updatedAt) nextMeta.updatedAt = stamp;
  return nextMeta;
}

export function normalizeThreadRecord(raw, ctx = {}) {
  const source = normalizeSource(raw?.source || ctx.source);
  const brand = normalizeWhitespace(raw?.brand);
  const code = normalizeWhitespace(
    raw?.code !== undefined && raw?.code !== null ? String(raw.code) : ""
  );
  const name = normalizeWhitespace(raw?.name || "");
  const hex = normalizeHexValue(raw?.hex);
  const rgbFromRaw =
    normalizeRgbValue(raw?.rgb) || normalizeRgbValue({ r: raw?.r, g: raw?.g, b: raw?.b });
  const rgb = rgbFromRaw || (hex ? hexToRgb(hex) : null);

  if (!brand || !code || !hex || !rgb) {
    console.warn(
      `[normalize] Skip invalid record (${formatSourceForLog(source)}): ` +
        JSON.stringify({ brand, code, name, hex, rgb })
    );
    return null;
  }

  const brandKey = brand.toLowerCase();
  const canonicalKey = `${brandKey}::${code}`;
  const confidence = resolveConfidence(raw?.confidence ?? ctx.confidence, source.type);
  const meta = applyTimestamps(raw?.meta, ctx);

  return {
    brand,
    brandKey,
    code,
    name,
    hex,
    rgb,
    thickness: raw?.thickness,
    source,
    confidence,
    meta,
    canonicalKey
  };
}

export function dedupeThreads(records = []) {
  const byKey = new Map();

  records.forEach(rec => {
    if (!rec || !rec.canonicalKey) return;
    const existing = byKey.get(rec.canonicalKey);
    if (!existing) {
      byKey.set(rec.canonicalKey, { ...rec });
      return;
    }

    if (existing.hex === rec.hex) {
      const mergedSources = existing.sources || [existing.source];
      const incomingSource = rec.source;
      if (incomingSource && !mergedSources.some(s => JSON.stringify(s) === JSON.stringify(incomingSource))) {
        mergedSources.push(incomingSource);
      }
      existing.sources = mergedSources;
      existing.meta = { ...rec.meta, ...existing.meta };
      byKey.set(rec.canonicalKey, existing);
      return;
    }

    const existingConf = typeof existing.confidence === "number" ? existing.confidence : 0;
    const incomingConf = typeof rec.confidence === "number" ? rec.confidence : 0;
    const keepIncoming = incomingConf > existingConf;
    const keep = keepIncoming ? rec : existing;
    const alt = keepIncoming ? existing : rec;

    const alternates = keep.alternates ? [...keep.alternates] : [];
    if (alt.alternates && Array.isArray(alt.alternates)) {
      alternates.push(...alt.alternates);
    }
    alternates.push({
      hex: alt.hex,
      rgb: alt.rgb,
      source: alt.source,
      confidence: alt.confidence
    });
    keep.alternates = alternates;

    byKey.set(rec.canonicalKey, keep);
    console.warn(
      `[dedupe] Conflict on ${rec.canonicalKey} (${formatSourceForLog(rec.source)}): ` +
        `${existing.hex} vs ${rec.hex} -> keeping ${keepIncoming ? rec.hex : existing.hex}`
    );
  });

  return Array.from(byKey.values());
}

export function normalizeAndDedupeThreads(records = [], ctx = {}) {
  const normalized = [];
  records.forEach(raw => {
    const n = normalizeThreadRecord(raw, ctx);
    if (n) normalized.push(n);
  });
  return dedupeThreads(normalized);
}
