export const SPEC_VERSION = "1.0.0";

export function normalizeSpec(input = {}) {
  const now = new Date().toISOString();
  const payload = input.payload || input.core || {};
  const core = input.core || payload || {};

  return {
    specVersion: input.specVersion || SPEC_VERSION,
    id: input.id || `asset_${Date.now()}`,
    type: input.type || "palette",
    name: input.name || "Tài sản mới",
    tags: Array.isArray(input.tags) ? input.tags : [],
    core,
    payload: input.payload,
    sourceImage: input.sourceImage,
    profiles: input.profiles || {},
    notes: input.notes || "",
    version: input.version || "1.0.0",
    createdAt: toIsoString(input.createdAt) || now,
    updatedAt: toIsoString(input.updatedAt) || now,
    sourceWorld: input.sourceWorld || "",
    project: input.project || ""
  };
}

export function validateSpec(input = {}) {
  const errors = [];
  if (!input || typeof input !== "object") {
    errors.push("Spec must be an object.");
    return { ok: false, errors };
  }
  if (!input.specVersion) errors.push("specVersion is required.");
  if (!input.id) errors.push("id is required.");
  if (!input.type) errors.push("type is required.");
  if (!input.name) errors.push("name is required.");
  if (!input.core || typeof input.core !== "object") errors.push("core must be an object.");
  if (!input.createdAt) errors.push("createdAt is required.");
  if (!input.updatedAt) errors.push("updatedAt is required.");
  return { ok: errors.length === 0, errors };
}

export function createSpec(input = {}) {
  return normalizeSpec(input);
}

function toIsoString(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  if (typeof value?.toDate === "function") {
    try {
      return value.toDate().toISOString();
    } catch (_err) {
      return "";
    }
  }
  return "";
}
