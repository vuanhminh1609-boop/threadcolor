const DB_NAME = "sc_assets_v1";
const STORE_NAME = "images";
const URL_CACHE = new Map();
const MEMORY_STORE = new Map();
let dbPromise = null;

const isDirectUrl = (value) =>
  typeof value === "string" &&
  (value.startsWith("data:") || value.startsWith("blob:") || value.startsWith("http://") || value.startsWith("https://"));

const openDb = () => {
  if (dbPromise) return dbPromise;
  if (typeof indexedDB === "undefined") {
    dbPromise = Promise.resolve(null);
    return dbPromise;
  }
  dbPromise = new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
  return dbPromise;
};

const generateKey = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `img_${crypto.randomUUID()}`;
  }
  return `img_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
};

const dataUrlToBlob = async (dataUrl) => {
  if (!dataUrl || typeof dataUrl !== "string") return null;
  try {
    const res = await fetch(dataUrl);
    return await res.blob();
  } catch (_err) {
    try {
      const [header, payload] = dataUrl.split(",");
      if (!payload) return null;
      const match = /data:([^;]+);base64/.exec(header || "");
      const mime = match ? match[1] : "application/octet-stream";
      const binary = atob(payload);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
      }
      return new Blob([bytes], { type: mime });
    } catch (_err2) {
      return null;
    }
  }
};

const normalizeToBlob = async (input) => {
  if (!input) return null;
  if (input instanceof Blob) return input;
  if (typeof input === "string") {
    if (input.startsWith("data:")) return dataUrlToBlob(input);
    return null;
  }
  return null;
};

const putRecord = async (record) => {
  if (!record || !record.key) return false;
  const db = await openDb();
  if (!db) {
    MEMORY_STORE.set(record.key, record);
    return true;
  }
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(record);
    req.onsuccess = () => resolve(true);
    req.onerror = () => {
      MEMORY_STORE.set(record.key, record);
      resolve(true);
    };
  });
};

const getRecord = async (key) => {
  if (!key) return null;
  if (MEMORY_STORE.has(key)) return MEMORY_STORE.get(key);
  const db = await openDb();
  if (!db) return null;
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => resolve(null);
  });
};

const deleteRecord = async (key) => {
  if (!key) return false;
  MEMORY_STORE.delete(key);
  const db = await openDb();
  if (!db) return true;
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(key);
    req.onsuccess = () => resolve(true);
    req.onerror = () => resolve(false);
  });
};

const listRecords = async () => {
  const map = new Map();
  MEMORY_STORE.forEach((value, key) => map.set(key, value));
  const db = await openDb();
  if (!db) return Array.from(map.values());
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => {
      (req.result || []).forEach((record) => {
        if (record?.key && !map.has(record.key)) map.set(record.key, record);
      });
      resolve(Array.from(map.values()));
    };
    req.onerror = () => resolve(Array.from(map.values()));
  });
};

const matchesMeta = (meta, filter) => {
  if (!filter || typeof filter !== "object") return true;
  const entries = Object.entries(filter);
  if (!entries.length) return true;
  return entries.every(([key, value]) => {
    if (!meta || typeof meta !== "object") return false;
    if (Array.isArray(value)) return value.includes(meta[key]);
    return meta[key] === value;
  });
};

const buildDescriptor = (record) => ({
  key: record.key,
  size: record.size || 0,
  mime: record.mime || "",
  createdAt: record.createdAt || "",
  meta: record.meta || {}
});

const uploadImage = async (input, meta = {}) => {
  const blob = await normalizeToBlob(input);
  if (!blob) return null;
  const key = generateKey();
  const createdAt = new Date().toISOString();
  const record = {
    key,
    blob,
    meta: meta && typeof meta === "object" ? meta : {},
    createdAt,
    size: blob.size || 0,
    mime: blob.type || ""
  };
  const ok = await putRecord(record);
  if (!ok) return null;
  const url = URL.createObjectURL(blob);
  URL_CACHE.set(key, url);
  return {
    key,
    url,
    size: record.size,
    mime: record.mime,
    createdAt
  };
};

const getUrl = async (key) => {
  if (!key) return "";
  if (isDirectUrl(key)) return key;
  if (URL_CACHE.has(key)) return URL_CACHE.get(key);
  const record = await getRecord(key);
  if (!record?.blob) return "";
  const url = URL.createObjectURL(record.blob);
  URL_CACHE.set(key, url);
  return url;
};

const deleteImage = async (key) => {
  if (!key) return false;
  if (isDirectUrl(key)) {
    if (key.startsWith("blob:")) {
      URL.revokeObjectURL(key);
    }
    return false;
  }
  const cached = URL_CACHE.get(key);
  if (cached) {
    URL.revokeObjectURL(cached);
    URL_CACHE.delete(key);
  }
  return deleteRecord(key);
};

const list = async (metaFilter) => {
  const records = await listRecords();
  return records
    .filter((record) => matchesMeta(record.meta, metaFilter))
    .map(buildDescriptor);
};

export default {
  uploadImage,
  getUrl,
  delete: deleteImage,
  list
};
