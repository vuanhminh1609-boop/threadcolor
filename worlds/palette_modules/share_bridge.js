function decodeUriSafely(value) {
  const source = String(value || "");
  if (!source) return "";
  try {
    return decodeURIComponent(source);
  } catch (_err) {
    return source;
  }
}

function randomSecureIndex(max, cryptoApi = globalThis.crypto) {
  if (cryptoApi?.getRandomValues) {
    const arr = new Uint32Array(1);
    cryptoApi.getRandomValues(arr);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
}

export function normalizeShareSim(raw, shareSimToInternal = {}) {
  const key = String(raw || "").trim().toLowerCase();
  if (!key) return "normal";
  if (Object.prototype.hasOwnProperty.call(shareSimToInternal, key)) return key;
  if (key === "deuteranopia") return "deuter";
  if (key === "protanopia") return "protan";
  if (key === "tritanopia") return "tritan";
  if (key === "grayscale") return "normal";
  return "normal";
}

export function toInternalVisionMode(shareSim, shareSimToInternal = {}) {
  const simKey = normalizeShareSim(shareSim, shareSimToInternal);
  return shareSimToInternal[simKey] || "normal";
}

export function toShareSim(internalMode, shareSimFromInternal = {}) {
  const key = String(internalMode || "").trim().toLowerCase();
  return shareSimFromInternal[key] || "normal";
}

export function normalizeShareRoles(rawRoles, stopCount, roleKeys = []) {
  if (!rawRoles || typeof rawRoles !== "object") return null;
  const roles = {};
  for (const roleKey of roleKeys) {
    if (!Object.prototype.hasOwnProperty.call(rawRoles, roleKey)) return null;
    const value = Number(rawRoles[roleKey]);
    if (!Number.isInteger(value)) return null;
    if (value < 0 || value >= stopCount) return null;
    roles[roleKey] = value;
  }
  return roles;
}

export function normalizeShareStatePayload(payload, options = {}) {
  const {
    shareStateVersion = 1,
    normalizeHex = (hex) => String(hex || ""),
    minStops = 2,
    maxStops = 7,
    roleKeys = [],
    previewTabs = [],
    shareSimToInternal = {}
  } = options;
  if (!payload || typeof payload !== "object") return null;
  if (Number(payload.v) !== shareStateVersion) return null;
  const colors = Array.isArray(payload.colors)
    ? payload.colors.map((hex) => normalizeHex(hex)).filter(Boolean).map((hex) => String(hex).toUpperCase())
    : [];
  if (colors.length < minStops || colors.length > maxStops) return null;
  const roles = normalizeShareRoles(payload.roles, colors.length, roleKeys);
  if (!roles) return null;
  const preview = previewTabs.includes(payload.preview) ? payload.preview : null;
  if (!preview) return null;
  const sim = normalizeShareSim(payload.sim, shareSimToInternal);
  return {
    v: shareStateVersion,
    colors,
    roles,
    preview,
    sim,
    visionMode: toInternalVisionMode(sim, shareSimToInternal)
  };
}

export function encodeBase64UrlUtf8(text) {
  const value = String(text ?? "");
  try {
    if (typeof TextEncoder !== "undefined" && typeof btoa === "function") {
      const bytes = new TextEncoder().encode(value);
      let binary = "";
      bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
      });
      return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
    }
    if (typeof btoa === "function") {
      return btoa(unescape(encodeURIComponent(value))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
    }
    if (typeof Buffer !== "undefined") {
      return Buffer.from(value, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
    }
  } catch (_err) {
    return "";
  }
  return "";
}

export function decodeBase64UrlUtf8(input) {
  const source = String(input || "").trim();
  if (!source) return "";
  let base64 = source.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  try {
    if (typeof atob === "function") {
      const binary = atob(base64);
      if (typeof TextDecoder !== "undefined") {
        const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
        return new TextDecoder().decode(bytes);
      }
      return decodeURIComponent(escape(binary));
    }
    if (typeof Buffer !== "undefined") {
      return Buffer.from(base64, "base64").toString("utf8");
    }
  } catch (_err) {
    return "";
  }
  return "";
}

export function encodePaletteShareState(statePayload, options = {}) {
  const {
    shareStateVersion = 1,
    normalizePayload = (payload) => payload
  } = options;
  const normalized = normalizePayload(statePayload);
  if (!normalized) return "";
  const encoded = encodeBase64UrlUtf8(JSON.stringify({
    v: normalized.v,
    colors: normalized.colors,
    roles: normalized.roles,
    preview: normalized.preview,
    sim: normalized.sim
  }));
  if (!encoded) return "";
  return `v${shareStateVersion}.${encoded}`;
}

export function decodePaletteShareState(rawValue, options = {}) {
  const {
    shareStateVersion = 1,
    normalizePayload = (payload) => payload
  } = options;
  const value = String(rawValue || "").trim();
  if (!value) return { status: "none", state: null };
  const safe = decodeUriSafely(value).trim();
  if (!safe.startsWith(`v${shareStateVersion}.`)) {
    return { status: "none", state: null };
  }
  const encoded = safe.slice(`v${shareStateVersion}.`.length);
  if (!encoded) return { status: "invalid", state: null };
  const jsonText = decodeBase64UrlUtf8(encoded);
  if (!jsonText) return { status: "invalid", state: null };
  try {
    const payload = JSON.parse(jsonText);
    const normalized = normalizePayload(payload);
    if (!normalized) return { status: "invalid", state: null };
    return { status: "ok", state: normalized };
  } catch (_err) {
    return { status: "invalid", state: null };
  }
}

export function normalizeSearchText(searchText) {
  if (!searchText) return "";
  const value = String(searchText).trim();
  if (!value) return "";
  return value.startsWith("?") ? value.slice(1) : value;
}

export function normalizeShortShareId(rawValue) {
  const id = String(rawValue || "").trim();
  if (!/^[0-9A-Za-z]{8,10}$/.test(id)) return null;
  return id;
}

export function createShortShareId(options = {}) {
  const {
    length = 9,
    alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    cryptoApi = globalThis.crypto
  } = options;
  const size = Math.max(8, Math.min(10, Number(length) || 9));
  let output = "";
  for (let i = 0; i < size; i += 1) {
    output += alphabet[randomSecureIndex(alphabet.length, cryptoApi)];
  }
  return output;
}

export function createLibraryPresetId(options = {}) {
  const {
    length = 12,
    alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    cryptoApi = globalThis.crypto
  } = options;
  const size = Math.max(8, Math.min(20, Number(length) || 12));
  let output = "";
  for (let i = 0; i < size; i += 1) {
    output += alphabet[randomSecureIndex(alphabet.length, cryptoApi)];
  }
  return output;
}
