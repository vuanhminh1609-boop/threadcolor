const STORAGE_KEY = "tc_threadvault_v1";
const OLD_STOCK_KEY = "tc_stock_local_v1";
const OLD_BUY_KEY = "tc_buy_local_v1";

const safeParse = (raw, fallback) => {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch (_err) {
    return fallback;
  }
};

const buildState = (raw) => {
  const base = raw && typeof raw === "object" ? raw : {};
  return {
    savedResults: Array.isArray(base.savedResults) ? base.savedResults : [],
    inventory: Array.isArray(base.inventory) ? base.inventory : [],
    shoppingList: Array.isArray(base.shoppingList) ? base.shoppingList : []
  };
};

const loadState = () => {
  try {
    return buildState(safeParse(localStorage.getItem(STORAGE_KEY), null));
  } catch (_err) {
    return buildState(null);
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (_err) {
    return false;
  }
};

const normalizeKey = (value) => String(value || "").trim().toLowerCase();

const buildItemKey = (item) => {
  const brand = normalizeKey(item.brand || "");
  const code = normalizeKey(item.code || "");
  return `${brand}::${code}`;
};

const upsertByKey = (list, item, qtyField = "qty", qtyDelta = 1) => {
  const key = buildItemKey(item);
  if (!key || key === "::") return list;
  const next = Array.isArray(list) ? list.slice() : [];
  const index = next.findIndex((entry) => buildItemKey(entry) === key);
  const now = new Date().toISOString();
  if (index >= 0) {
    const current = next[index];
    const qty = Math.max(1, Number(current[qtyField] || 0) + Number(qtyDelta || 0));
    next[index] = { ...current, ...item, [qtyField]: qty, updatedAt: now };
    return next;
  }
  const payload = {
    id: item.id || `tv_${Date.now()}_${Math.random().toString(16).slice(2, 6)}`,
    ...item,
    [qtyField]: Math.max(1, Number(item[qtyField] || qtyDelta || 1)),
    createdAt: item.createdAt || now,
    updatedAt: now
  };
  next.unshift(payload);
  return next;
};

export const addSavedResult = (payload) => {
  if (!payload) return false;
  const state = loadState();
  const now = new Date().toISOString();
  const entry = {
    id: payload.id || `saved_${Date.now()}_${Math.random().toString(16).slice(2, 6)}`,
    inputHex: payload.inputHex || "",
    results: Array.isArray(payload.results) ? payload.results : [],
    topMatch: payload.topMatch || null,
    project: payload.project || "",
    createdAt: payload.createdAt || now,
    updatedAt: now
  };
  state.savedResults = [entry, ...state.savedResults.filter((item) => item.id !== entry.id)].slice(0, 200);
  return saveState(state);
};

export const addToShoppingList = (item) => {
  if (!item) return false;
  const state = loadState();
  state.shoppingList = upsertByKey(state.shoppingList, { ...item, listType: "shopping" }, "qty", 1);
  return saveState(state);
};

export const toggleInStock = (item, qty = 1) => {
  if (!item) return false;
  const state = loadState();
  state.inventory = upsertByKey(state.inventory, { ...item, listType: "inventory" }, "qty", qty || 1);
  return saveState(state);
};

export const listSaved = () => {
  const state = loadState();
  return state.savedResults.slice();
};

export const listShopping = () => {
  const state = loadState();
  return state.shoppingList.slice();
};

export const listInventory = () => {
  const state = loadState();
  return state.inventory.slice();
};

export const migrateOldKeys = () => {
  const state = loadState();
  let changed = false;

  const oldStock = safeParse(localStorage.getItem(OLD_STOCK_KEY), []);
  if (Array.isArray(oldStock) && oldStock.length) {
    oldStock.forEach((item) => {
      state.inventory = upsertByKey(state.inventory, item, "qty", Number(item.qty || 1));
    });
    try {
      localStorage.removeItem(OLD_STOCK_KEY);
    } catch (_err) {}
    changed = true;
  }

  const oldBuy = safeParse(localStorage.getItem(OLD_BUY_KEY), []);
  if (Array.isArray(oldBuy) && oldBuy.length) {
    oldBuy.forEach((item) => {
      state.shoppingList = upsertByKey(state.shoppingList, item, "qty", Number(item.minQty || item.qty || 1));
    });
    try {
      localStorage.removeItem(OLD_BUY_KEY);
    } catch (_err) {}
    changed = true;
  }

  if (changed) saveState(state);
  return changed;
};
