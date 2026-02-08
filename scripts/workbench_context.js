const CONTEXT_KEY = "tc_workbench_context_v1";
const BUFFER_KEY = "tc_workbench_buffer_v1";
const BUFFER_TTL_MS = 1000 * 60 * 60 * 72;
const BUFFER_MAX = 40;
const DEFAULT_LIMIT = 60;

const safeParseJSON = (raw, fallback) => {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch (_err) {
    return fallback;
  }
};

const normalizeSearch = (search) => {
  if (!search) return "";
  if (search.startsWith("?")) return search;
  return `?${search}`;
};

const normalizeHex = (value) => {
  if (!value) return null;
  const raw = String(value).trim().replace(/^0x/i, "").replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(raw)) return null;
  const hex = raw.length === 3
    ? raw.split("").map((c) => c + c).join("")
    : raw;
  return `#${hex.toUpperCase()}`;
};

export const normalizeHexList = (list, limit = DEFAULT_LIMIT) => {
  const items = Array.isArray(list)
    ? list
    : (typeof list === "string" ? list.split(/[\s,;|]+/) : []);
  const output = [];
  const seen = new Set();
  items.forEach((item) => {
    const candidate = typeof item === "string" ? item : item?.hex || item?.color || "";
    const normalized = normalizeHex(candidate);
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    output.push(normalized);
  });
  return output.slice(0, limit);
};

export const extractHexesFromAsset = (asset) => {
  if (!asset || typeof asset !== "object") return [];
  const collected = [];
  const pushList = (list) => {
    if (!Array.isArray(list)) return;
    list.forEach((item) => {
      if (typeof item === "string") {
        collected.push(item);
      } else if (item && typeof item === "object") {
        if (item.hex) collected.push(item.hex);
        if (item.color) collected.push(item.color);
      }
    });
  };

  pushList(asset.core?.colors);
  pushList(asset.core?.stops);
  pushList(asset.payload?.colors);
  pushList(asset.payload?.stops);
  pushList(asset.payload?.threads);
  pushList(asset.payload?.cmyk);

  const gradientStops = asset.payload?.gradientParams?.stops;
  if (typeof gradientStops === "string") {
    pushList(gradientStops.split(/[\s,;|]+/));
  } else {
    pushList(gradientStops);
  }

  return normalizeHexList(collected);
};

const loadContext = () => {
  try {
    const raw = localStorage.getItem(CONTEXT_KEY);
    return safeParseJSON(raw, null);
  } catch (_err) {
    return null;
  }
};

export const getWorkbenchContext = () => {
  const ctx = loadContext();
  if (!ctx || !Array.isArray(ctx.hexes)) return null;
  const hexes = normalizeHexList(ctx.hexes);
  if (!hexes.length) return null;
  return { ...ctx, hexes };
};

export const setWorkbenchContext = (hexes, meta = {}) => {
  const normalized = normalizeHexList(hexes);
  if (!normalized.length) return null;
  const payload = {
    hexes: normalized,
    meta: meta && typeof meta === "object" ? meta : {},
    updatedAt: new Date().toISOString()
  };
  try {
    localStorage.setItem(CONTEXT_KEY, JSON.stringify(payload));
  } catch (_err) {
    // ignore
  }
  return payload;
};

export const getContext = () => getWorkbenchContext();

export const setContext = (hexes, meta) => setWorkbenchContext(hexes, meta);

const loadBufferMap = () => {
  try {
    return safeParseJSON(localStorage.getItem(BUFFER_KEY), {}) || {};
  } catch (_err) {
    return {};
  }
};

const saveBufferMap = (map) => {
  try {
    localStorage.setItem(BUFFER_KEY, JSON.stringify(map));
    return true;
  } catch (_err) {
    return false;
  }
};

const pruneBufferMap = (map) => {
  const now = Date.now();
  const entries = Object.entries(map || {}).filter(([, value]) => {
    if (!value || !Array.isArray(value.hexes)) return false;
    if (value.expiresAt && Number(value.expiresAt) < now) return false;
    return true;
  });
  entries.sort((a, b) => Number(b[1].createdAt || 0) - Number(a[1].createdAt || 0));
  const trimmed = entries.slice(0, BUFFER_MAX);
  const next = trimmed.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
  return next;
};

export const ensureBufferFromHexes = (hexes, meta = {}) => {
  const normalized = normalizeHexList(hexes);
  if (!normalized.length) return null;
  const now = Date.now();
  const map = pruneBufferMap(loadBufferMap());
  const existing = Object.entries(map).find(([, value]) => {
    if (!value || !Array.isArray(value.hexes)) return false;
    const stored = normalizeHexList(value.hexes);
    return stored.join("|") === normalized.join("|");
  });
  if (existing) {
    const [bufferId, value] = existing;
    value.updatedAt = new Date().toISOString();
    map[bufferId] = value;
    saveBufferMap(map);
    return bufferId;
  }

  const bufferId = `buf_${now}_${Math.random().toString(36).slice(2, 6)}`;
  map[bufferId] = {
    hexes: normalized,
    meta: meta && typeof meta === "object" ? meta : {},
    createdAt: now,
    updatedAt: new Date().toISOString(),
    expiresAt: now + BUFFER_TTL_MS
  };
  saveBufferMap(map);
  return bufferId;
};

export const appendBufferToUrl = (url, bufferId) => {
  if (!url || !bufferId) return url;
  const [base, hash] = String(url).split("#");
  const [path, query] = base.split("?");
  const params = new URLSearchParams(query || "");
  params.set("bufferId", bufferId);
  const nextQuery = params.toString();
  return `${path}${nextQuery ? `?${nextQuery}` : ""}${hash ? `#${hash}` : ""}`;
};

const getBufferById = (bufferId) => {
  if (!bufferId) return null;
  const map = pruneBufferMap(loadBufferMap());
  const entry = map[bufferId];
  saveBufferMap(map);
  if (!entry || !Array.isArray(entry.hexes)) return null;
  return entry;
};

const loadAssetById = (assetId) => {
  if (!assetId) return null;
  try {
    const raw = localStorage.getItem("tc_asset_library_v1");
    const list = safeParseJSON(raw, []);
    if (!Array.isArray(list)) return null;
    return list.find((item) => item && item.id === assetId) || null;
  } catch (_err) {
    return null;
  }
};

const safeDecode = (value) => {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch (_err) {
    return value;
  }
};

const parseHexPayload = (raw) => {
  if (!raw) return [];
  const decoded = safeDecode(raw).trim();
  if (!decoded) return [];
  if (decoded.startsWith("[") || decoded.startsWith("{")) {
    try {
      const parsed = JSON.parse(decoded);
      if (Array.isArray(parsed)) return normalizeHexList(parsed);
      if (Array.isArray(parsed?.colors)) return normalizeHexList(parsed.colors);
      if (Array.isArray(parsed?.stops)) return normalizeHexList(parsed.stops);
    } catch (_err) {
      // fallback below
    }
  }
  return normalizeHexList(decoded.split(/[\s,;|]+/));
};

const parseHashHexes = (hashInput) => {
  const rawHash = String(hashInput ?? window.location.hash ?? "").replace(/^#/, "");
  if (!rawHash) return null;
  if (!rawHash.includes("=")) {
    const list = normalizeHexList([rawHash]);
    if (list.length) return { hexes: list, source: "hash" };
    return null;
  }
  const hashParams = new URLSearchParams(rawHash);
  const raw = hashParams.get("p") || hashParams.get("g") || hashParams.get("c") || hashParams.get("color");
  const hexes = parseHexPayload(raw);
  if (!hexes.length) return null;
  return { hexes, source: "hash" };
};

const parseQueryHexes = (searchInput) => {
  const params = new URLSearchParams(normalizeSearch(searchInput ?? window.location.search ?? ""));
  const queryColor = params.get("color");
  if (!queryColor) return null;
  const list = normalizeHexList([queryColor]);
  if (!list.length) return null;
  return { hexes: list, source: "query" };
};

const parseLegacyHexes = (searchInput, hashInput) => {
  const hashResult = parseHashHexes(hashInput);
  if (hashResult?.hexes?.length) return hashResult;
  const queryResult = parseQueryHexes(searchInput);
  if (queryResult?.hexes?.length) return queryResult;
  return null;
};

export const resolveIncomingHandoffStrict = () => {
  const params = new URLSearchParams(normalizeSearch(window.location.search || ""));
  const assetId = params.get("assetId");
  const bufferId = params.get("bufferId");

  if (assetId) {
    const asset = loadAssetById(assetId);
    const hexes = extractHexesFromAsset(asset);
    if (hexes.length) {
      return { hexes, source: "asset", assetId, meta: { assetId } };
    }
  }

  if (bufferId) {
    const entry = getBufferById(bufferId);
    const hexes = normalizeHexList(entry?.hexes || []);
    if (hexes.length) {
      return { hexes, source: "buffer", bufferId, meta: entry?.meta || {} };
    }
  }

  return null;
};

export const resolveIncoming = ({ search, hash } = {}) => {
  const params = new URLSearchParams(normalizeSearch(search ?? window.location.search ?? ""));
  const assetId = params.get("assetId");
  const bufferId = params.get("bufferId");

  if (assetId) {
    const asset = loadAssetById(assetId);
    const hexes = extractHexesFromAsset(asset);
    if (hexes.length) {
      return { hexes, source: "asset", assetId, meta: { assetId } };
    }
  }

  if (bufferId) {
    const entry = getBufferById(bufferId);
    const hexes = normalizeHexList(entry?.hexes || []);
    if (hexes.length) {
      return { hexes, source: "buffer", bufferId, meta: entry?.meta || {} };
    }
  }

  return parseLegacyHexes(search, hash);
};

export const resolveIncomingHandoffFull = () => {
  return resolveIncoming({ search: window.location.search, hash: window.location.hash });
};

export const bootstrapIncomingHandoff = ({ minColors = 1, applyFn, worldKey = "" } = {}) => {
  if (typeof applyFn !== "function") return false;
  const incoming = resolveIncomingHandoffStrict();
  if (!incoming?.hexes?.length) return false;
  const normalized = normalizeHexList(incoming.hexes);
  if (!normalized.length) return false;
  const min = Math.max(1, Number(minColors) || 1);
  const filled = normalized.slice();
  while (filled.length < min) {
    filled.push(filled[filled.length - 1]);
  }
  applyFn(filled);
  setWorkbenchContext(filled, {
    worldKey,
    source: incoming.source,
    assetId: incoming.assetId || "",
    bufferId: incoming.bufferId || ""
  });
  return true;
};

export const pruneWorkbenchBuffers = () => {
  const map = pruneBufferMap(loadBufferMap());
  saveBufferMap(map);
  return Object.keys(map).length;
};
