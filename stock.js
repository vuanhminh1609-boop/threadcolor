import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  deleteDoc,
  increment
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const $ = (sel) => document.querySelector(sel);
const t = (key, fallback, params) => window.tcI18n?.t?.(key, fallback, params) ?? fallback;

const state = {
  user: null,
  items: [],
  filtered: [],
  activeTab: "saved",
  editingId: null,
  isLoading: false,
  authResolved: false
};

const els = {
  cta: $("#stockCta"),
  ctaBtn: $("#stockLoginBtn"),
  panel: $("#stockPanel"),
  search: $("#stockSearch"),
  addBtn: $("#stockAddBtn"),
  importBtn: $("#stockImportBtn"),
  exportBtn: $("#stockExportBtn"),
  fileInput: $("#stockFileInput"),
  summaryItems: $("#stockSummaryItems"),
  summaryQty: $("#stockSummaryQty"),
  summaryLow: $("#stockSummaryLow"),
  body: $("#stockBody"),
  empty: $("#stockEmpty"),
  overlay: $("#stockOverlay"),
  modal: $("#stockModal"),
  modalTitle: $("#stockModalTitle"),
  modalClose: $("#stockModalClose"),
  form: $("#stockForm"),
  cancel: $("#stockCancel"),
  brand: $("#stockBrand"),
  code: $("#stockCode"),
  name: $("#stockName"),
  hex: $("#stockHex"),
  qty: $("#stockQty"),
  unit: $("#stockUnit"),
  location: $("#stockLocation"),
  note: $("#stockNote"),
  minQty: $("#stockMinQty")
};

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
  if (!hex || typeof hex !== "string") return "";
  let v = hex.trim().toUpperCase();
  if (!v.startsWith("#")) v = `#${v}`;
  return /^#[0-9A-F]{6}$/.test(v) ? v : "";
};

const getApi = () => window.firebaseAuth || window.firebaseAuthApi || null;
const getDb = () => getApi()?.db || null;

const setCtaText = (titleText, descText, hideButton) => {
  const title = els.cta?.querySelector('[data-i18n="vault.stock.ctaTitle"]');
  const desc = els.cta?.querySelector('[data-i18n="vault.stock.ctaDesc"]');
  if (title && titleText) title.textContent = titleText;
  if (desc && descText) desc.textContent = descText;
  if (els.ctaBtn) els.ctaBtn.classList.toggle("hidden", !!hideButton);
};

const setVisibility = (loggedIn) => {
  if (state.activeTab !== "stock") {
    if (els.cta) els.cta.classList.add("hidden");
    if (els.panel) els.panel.classList.add("hidden");
    return;
  }
  if (!state.authResolved) {
    if (els.cta) els.cta.classList.remove("hidden");
    if (els.panel) els.panel.classList.add("hidden");
    setCtaText("Đang kiểm tra đăng nhập…", "Vui lòng đợi trong giây lát.", true);
    return;
  }
  if (els.cta) els.cta.classList.toggle("hidden", loggedIn);
  if (els.panel) els.panel.classList.toggle("hidden", !loggedIn);
  if (!loggedIn) {
    setCtaText(
      t("vault.stock.ctaTitle", "Đăng nhập để dùng Tồn kho"),
      t("vault.stock.ctaDesc", "Quản lý tồn kho cá nhân theo tài khoản."),
      false
    );
  }
};

const setActiveTab = (tab) => {
  state.activeTab = tab;
  refresh();
};

const refresh = () => {
  if (!state.user || state.activeTab !== "stock") {
    setVisibility(false);
    return;
  }
  setVisibility(true);
  if (!state.isLoading) loadItems();
};

const buildDocId = (brand, code) => `${normalizeKey(brand)}__${normalizeCode(code)}`;

const applyFilter = () => {
  const q = (els.search?.value || "").trim().toLowerCase();
  if (!q) {
    state.filtered = [...state.items];
  } else {
    state.filtered = state.items.filter((item) => {
      return [item.brand, item.code, item.name, item.hex].some((v) => (v || "").toLowerCase().includes(q));
    });
  }
  renderTable();
};

const updateSummary = () => {
  const totalItems = state.filtered.length;
  const totalQty = state.filtered.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  const low = state.filtered.filter((item) => {
    const qty = Number(item.qty) || 0;
    const min = Number(item.minQty) || 0;
    return qty <= min;
  }).length;
  if (els.summaryItems) els.summaryItems.textContent = `${totalItems}`;
  if (els.summaryQty) els.summaryQty.textContent = `${totalQty}`;
  if (els.summaryLow) els.summaryLow.textContent = `${low}`;
};

const renderTable = () => {
  if (!els.body) return;
  els.body.innerHTML = state.filtered.map((item) => {
    const updated = item.updatedAt?.toDate ? item.updatedAt.toDate().toLocaleString() : "";
    const qty = Number(item.qty) || 0;
    const min = Number(item.minQty) || 0;
    const warn = qty <= min ? "text-amber-600" : "";
    return `
      <tr class="border-b border-black/5">
        <td class="px-4 py-3">
          <span class="inline-block w-6 h-6 rounded border" style="background:${item.hex || "#fff"}"></span>
        </td>
        <td class="px-4 py-3">${item.brand || ""}</td>
        <td class="px-4 py-3">${item.code || ""}</td>
        <td class="px-4 py-3">${item.name || ""}</td>
        <td class="px-4 py-3 ${warn}">${qty}</td>
        <td class="px-4 py-3">${item.unit || ""}</td>
        <td class="px-4 py-3">${item.location || ""}</td>
        <td class="px-4 py-3 text-xs tc-muted">${updated}</td>
        <td class="px-4 py-3 text-right">
          <button class="tc-btn tc-chip px-2 py-1 text-xs" data-action="qty-plus" data-id="${item.id}">+</button>
          <button class="tc-btn tc-chip px-2 py-1 text-xs" data-action="qty-minus" data-id="${item.id}">-</button>
          <button class="tc-btn tc-chip px-2 py-1 text-xs" data-action="edit" data-id="${item.id}">${t("vault.stock.actionEdit", "Sửa")}</button>
          <button class="tc-btn tc-chip px-2 py-1 text-xs" data-action="delete" data-id="${item.id}">${t("vault.stock.actionDelete", "Xoá")}</button>
        </td>
      </tr>
    `;
  }).join("");
  const hasItems = state.filtered.length > 0;
  if (els.empty) els.empty.classList.toggle("hidden", hasItems);
  updateSummary();
};

const loadItems = async () => {
  if (!state.user || !getDb()) return;
  state.isLoading = true;
  try {
    const ref = collection(getDb(), "users", state.user.uid, "stockItems");
    const q = query(ref, orderBy("updatedAt", "desc"));
    const snap = await getDocs(q);
    state.items = snap.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    }));
    applyFilter();
  } catch (err) {
    console.error("[stock] load failed", err);
  } finally {
    state.isLoading = false;
  }
};

const openModal = (item) => {
  state.editingId = item?.id || null;
  if (els.modalTitle) {
    els.modalTitle.textContent = state.editingId
      ? t("vault.stock.modalEdit", "Sửa tồn kho")
      : t("vault.stock.modalAdd", "Thêm tồn kho");
  }
  els.brand.value = item?.brand || "";
  els.code.value = item?.code || "";
  els.name.value = item?.name || "";
  els.hex.value = item?.hex || "";
  els.qty.value = item?.qty ?? 0;
  els.unit.value = item?.unit || "";
  els.location.value = item?.location || "";
  els.note.value = item?.note || "";
  els.minQty.value = item?.minQty ?? 0;
  if (els.overlay) els.overlay.classList.remove("hidden");
  if (els.modal) {
    els.modal.classList.remove("hidden");
    els.modal.classList.add("flex");
  }
};

const closeModal = () => {
  if (els.overlay) els.overlay.classList.add("hidden");
  if (els.modal) {
    els.modal.classList.add("hidden");
    els.modal.classList.remove("flex");
  }
  state.editingId = null;
};

const saveItem = async () => {
  const brand = els.brand.value.trim();
  const code = els.code.value.trim();
  const qty = Number(els.qty.value);
  if (!brand || !code || Number.isNaN(qty)) return;
  const id = buildDocId(brand, code);
  const payload = {
    brand,
    brandKey: normalizeKey(brand),
    code,
    codeKey: normalizeCode(code),
    name: els.name.value.trim(),
    hex: normalizeHex(els.hex.value),
    qty: Number(els.qty.value) || 0,
    unit: els.unit.value.trim(),
    location: els.location.value.trim(),
    note: els.note.value.trim(),
    minQty: Number(els.minQty.value) || 0,
    updatedAt: serverTimestamp()
  };
  if (!state.editingId) payload.createdAt = serverTimestamp();
  if (!getDb()) return;
  if (state.editingId && state.editingId !== id) {
    await deleteDoc(doc(getDb(), "users", state.user.uid, "stockItems", state.editingId));
  }
  await setDoc(doc(getDb(), "users", state.user.uid, "stockItems", id), payload, { merge: true });
  closeModal();
  loadItems();
};

const updateQty = async (id, delta) => {
  if (!getDb()) return;
  const ref = doc(getDb(), "users", state.user.uid, "stockItems", id);
  await updateDoc(ref, { qty: increment(delta), updatedAt: serverTimestamp() });
  loadItems();
};

const deleteItem = async (id) => {
  const ok = confirm(t("vault.stock.confirmDelete", "Xoá mục này?"));
  if (!ok || !getDb()) return;
  await deleteDoc(doc(getDb(), "users", state.user.uid, "stockItems", id));
  loadItems();
};

const parseCsvRows = (text) => {
  const rows = [];
  const lines = text.split(/\r?\n/).filter(Boolean);
  for (const line of lines) {
    const cols = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i];
      if (ch === "\"") {
        inQuotes = !inQuotes;
        continue;
      }
      if (ch === "," && !inQuotes) {
        cols.push(current.trim());
        current = "";
        continue;
      }
      current += ch;
    }
    cols.push(current.trim());
    rows.push(cols);
  }
  return rows;
};

const importCsv = async (file) => {
  const text = await file.text();
  const rows = parseCsvRows(text);
  if (!rows.length) return;
  const header = rows[0].map((h) => h.toLowerCase());
  const get = (row, key, fallback = "") => {
    const idx = header.indexOf(key);
    return idx >= 0 ? row[idx] : fallback;
  };
  const dataRows = header.includes("brand") ? rows.slice(1) : rows;
  for (const row of dataRows) {
    const brand = get(row, "brand", row[0] || "").trim();
    const code = get(row, "code", row[1] || "").trim();
    if (!brand || !code) continue;
    const id = buildDocId(brand, code);
    const payload = {
      brand,
      brandKey: normalizeKey(brand),
      code,
      codeKey: normalizeCode(code),
      name: get(row, "name", row[2] || "").trim(),
      hex: normalizeHex(get(row, "hex", row[3] || "")),
      qty: Number(get(row, "qty", row[4] || "0")) || 0,
      unit: get(row, "unit", row[5] || "").trim(),
      location: get(row, "location", row[6] || "").trim(),
      note: get(row, "note", row[7] || "").trim(),
      minQty: Number(get(row, "minqty", row[8] || "0")) || 0,
      updatedAt: serverTimestamp()
    };
    await setDoc(doc(getDb(), "users", state.user.uid, "stockItems", id), payload, { merge: true });
  }
  loadItems();
};

const exportCsv = () => {
  const header = ["brand", "code", "name", "hex", "qty", "unit", "location", "note", "minQty"];
  const rows = state.items.map((item) => ([
    item.brand || "",
    item.code || "",
    item.name || "",
    item.hex || "",
    item.qty ?? 0,
    item.unit || "",
    item.location || "",
    item.note || "",
    item.minQty ?? 0
  ]));
  const csv = [header.join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/\"/g, '""')}"`).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "stock-items.csv";
  link.click();
  URL.revokeObjectURL(link.href);
};

const bindEvents = () => {
  els.ctaBtn?.addEventListener("click", () => window.tcAuth?.openAuth?.());
  els.search?.addEventListener("input", applyFilter);
  els.addBtn?.addEventListener("click", () => openModal());
  els.importBtn?.addEventListener("click", () => els.fileInput?.click());
  els.exportBtn?.addEventListener("click", () => exportCsv());
  els.fileInput?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (file) await importCsv(file);
    event.target.value = "";
  });
  els.modalClose?.addEventListener("click", closeModal);
  els.cancel?.addEventListener("click", closeModal);
  els.overlay?.addEventListener("click", closeModal);
  els.form?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveItem();
  });
  els.body?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-action]");
    if (!btn) return;
    const id = btn.getAttribute("data-id");
    if (!id) return;
    const action = btn.getAttribute("data-action");
    if (action === "edit") {
      const item = state.items.find((i) => i.id === id);
      if (item) openModal(item);
      return;
    }
    if (action === "delete") {
      deleteItem(id);
      return;
    }
    if (action === "qty-plus") {
      updateQty(id, 1);
      return;
    }
    if (action === "qty-minus") {
      updateQty(id, -1);
    }
  });
};

const onAuthChanged = (user) => {
  state.user = user || null;
  state.authResolved = true;
  refresh();
};

let tabsBound = false;
const bindTabs = () => {
  if (tabsBound) return;
  tabsBound = true;
  const tabButtons = Array.from(document.querySelectorAll('button[data-tab]'));
  const panels = Array.from(document.querySelectorAll('section[data-tab-panel]'));
  if (!tabButtons.length || !panels.length) return;

  const updateUrl = (tab) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tab);
    const next = `${window.location.pathname}?${params.toString()}${window.location.hash || ""}`;
    window.history.replaceState(null, "", next);
  };

  const applyTab = (tab, opts = {}) => {
    const { emit = true, pushUrl = true } = opts;
    tabButtons.forEach((btn) => {
      const active = btn.dataset.tab === tab;
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
    panels.forEach((panel) => {
      panel.classList.toggle("hidden", panel.dataset.tabPanel !== tab);
    });
    if (pushUrl) updateUrl(tab);
    setActiveTab(tab);
    if (emit) {
      document.dispatchEvent(new CustomEvent("tc-vault-tab-changed", { detail: { tab } }));
    }
  };

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab || "saved";
      applyTab(tab);
    });
  });

  const params = new URLSearchParams(window.location.search);
  const initial = params.get("tab");
  const target = initial === "stock" || initial === "saved" ? initial : state.activeTab;
  applyTab(target, { emit: false, pushUrl: false });
};

const boot = () => {
  setVisibility(false);
  bindEvents();
  bindTabs();
  document.addEventListener("tc-vault-tab-changed", (event) => {
    const tab = event?.detail?.tab || "saved";
    setActiveTab(tab);
  });
  const api = getApi();
  if (api?.onAuthStateChanged) {
    api.onAuthStateChanged(onAuthChanged);
  }
};

window.addEventListener("firebase-auth-ready", boot, { once: true });
if (window.firebaseAuth?.onAuthStateChanged || window.firebaseAuthApi?.onAuthStateChanged) {
  boot();
}
