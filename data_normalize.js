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

function getRecordTimestamp(rec) {
  const raw =
    rec?.meta?.updatedAt ||
    rec?.meta?.createdAt ||
    rec?.source?.date ||
    rec?.source?.timestamp;
  if (!raw) return 0;
  const parsed = new Date(raw).getTime();
  return Number.isFinite(parsed) ? parsed : 0;
}

function getSourceRank(sourceType = "") {
  const type = String(sourceType || "").toUpperCase();
  if (type.includes("OFFICIAL")) return 3;
  if (type === "TRID_JSON") return 2;
  if (type === "LEGACY_JSON") return 1;
  return 0;
}

function comparePrecedence(a, b) {
  const rankA = getSourceRank(a?.source?.type);
  const rankB = getSourceRank(b?.source?.type);
  if (rankA !== rankB) return rankA - rankB;
  const timeA = getRecordTimestamp(a);
  const timeB = getRecordTimestamp(b);
  if (timeA !== timeB) return timeA - timeB;
  return 0;
}

function loadGingkoOverrides() {
  if (loadGingkoOverrides.cache) return loadGingkoOverrides.cache;
  const registry = new Map();
  if (typeof window !== "undefined" && window.__tcGingkoOverrides) {
    window.__tcGingkoOverrides.forEach((item) => {
      if (item?.code && item?.canonicalHex) registry.set(String(item.code), item.canonicalHex);
    });
    loadGingkoOverrides.cache = registry;
    return registry;
  }
  try {
    const req = typeof require === "function" ? require : null;
    if (req) {
      const fs = req("fs");
      const path = req("path");
      const fullPath = path.join(process.cwd(), "data", "conflicts", "gingko_overrides.json");
      if (fs.existsSync(fullPath)) {
        const raw = fs.readFileSync(fullPath, "utf8");
        const parsed = JSON.parse(raw);
        const list = Array.isArray(parsed?.overrides) ? parsed.overrides : [];
        list.forEach((item) => {
          if (item?.code && item?.canonicalHex) registry.set(String(item.code), item.canonicalHex);
        });
      }
    }
  } catch (_err) {
    // ignore overrides load failure
  }
  loadGingkoOverrides.cache = registry;
  return registry;
}

function isDevRuntime() {
  if (typeof window !== "undefined") {
    const host = window.location?.hostname || "";
    return host === "localhost" || host === "127.0.0.1";
  }
  if (typeof process !== "undefined") {
    return process.env.NODE_ENV !== "production";
  }
  return false;
}

function collectSources(items = []) {
  const seen = new Set();
  const sources = [];
  const pushSource = (source) => {
    if (!source) return;
    const key = JSON.stringify(source);
    if (seen.has(key)) return;
    seen.add(key);
    sources.push(source);
  };
  items.forEach((item) => {
    if (!item) return;
    if (Array.isArray(item.sources)) item.sources.forEach(pushSource);
    if (item.source) pushSource(item.source);
    if (Array.isArray(item.alternates)) {
      item.alternates.forEach((alt) => pushSource(alt?.source));
    }
  });
  return sources;
}

function writeConflictReport(conflicts) {
  if (!conflicts.length) return;
  const payload = {
    generatedAt: new Date().toISOString(),
    conflicts
  };
  if (typeof window !== "undefined") {
    window.__tcConflictReport = payload;
    if (isDevRuntime()) {
      console.info(`Found ${conflicts.length} conflicts; report saved to window.__tcConflictReport`);
    }
    return;
  }
  if (typeof process === "undefined") return;
  const reportName = `conflicts-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  Promise.all([
    import("node:fs/promises"),
    import("node:path")
  ])
    .then(([fs, path]) => {
      const outDir = path.join(process.cwd(), "data", "reports");
      const outPath = path.join(outDir, reportName);
      return fs.mkdir(outDir, { recursive: true }).then(() =>
        fs.writeFile(outPath, JSON.stringify(payload, null, 2), "utf8").then(() => outPath)
      );
    })
    .then((outPath) => {
      if (isDevRuntime()) {
        console.info(`Found ${conflicts.length} conflicts; report saved to ${outPath}`);
      }
    })
    .catch(() => {});
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
  const conflicts = [];
  const gingkoOverrides = loadGingkoOverrides();

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

    if (rec.brandKey === "gingko" && gingkoOverrides.size) {
      const overrideHex = gingkoOverrides.get(rec.code);
      if (overrideHex) {
        const normalizedHex = normalizeHexValue(overrideHex);
        if (!normalizedHex) return;
        const forced = { ...existing };
        forced.hex = normalizedHex;
        forced.rgb = hexToRgb(normalizedHex);
        byKey.set(rec.canonicalKey, forced);
        return;
      }
    }

    const existingConf = typeof existing.confidence === "number" ? existing.confidence : 0;
    const incomingConf = typeof rec.confidence === "number" ? rec.confidence : 0;
    const precedence = comparePrecedence(existing, rec);
    const keepIncoming = precedence < 0 ? true : precedence > 0 ? false : incomingConf > existingConf;
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
    conflicts.push({
      code: rec.code,
      hexCandidates: Array.from(new Set([existing.hex, rec.hex])),
      sources: collectSources([existing, rec]),
      chosenHex: keep.hex,
      status: "NEEDS_REVIEW",
      timestamp: new Date().toISOString()
    });
  });

  writeConflictReport(conflicts);
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
