import {
  listSaved,
  listShopping,
  listInventory,
  migrateOldKeys
} from "../scripts/threadvault_store.js";

const savedListEl = document.getElementById("vaultSavedList");
const savedEmptyEl = document.getElementById("vaultSavedEmpty");
const shoppingListEl = document.getElementById("vaultShoppingList");
const shoppingEmptyEl = document.getElementById("vaultShoppingEmpty");
const shoppingSummaryItems = document.getElementById("shoppingSummaryItems");
const shoppingSummaryQty = document.getElementById("shoppingSummaryQty");
const stockBody = document.getElementById("stockBody");
const stockEmpty = document.getElementById("stockEmpty");
const stockSummaryItems = document.getElementById("stockSummaryItems");
const stockSummaryQty = document.getElementById("stockSummaryQty");
const stockSummaryLow = document.getElementById("stockSummaryLow");
const stockCta = document.getElementById("stockCta");
const stockPanel = document.getElementById("stockPanel");

const normalizeHex = (hex) => {
  const raw = String(hex || "").trim();
  if (!raw) return "";
  if (raw.startsWith("#")) return raw.toUpperCase();
  return `#${raw}`.toUpperCase();
};

const formatTime = (value) => {
  if (!value) return "";
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleString();
  } catch (_err) {
    return "";
  }
};

const renderSaved = () => {
  if (!savedListEl || !savedEmptyEl) return;
  const items = listSaved();
  if (!items.length) {
    savedEmptyEl.classList.remove("hidden");
    savedListEl.innerHTML = "";
    return;
  }
  savedEmptyEl.classList.add("hidden");
  savedListEl.innerHTML = items.map((item) => {
    const top = item.topMatch || (item.results || [])[0] || {};
    const swatch = normalizeHex(top.hex || item.inputHex || "#ffffff");
    const deltaText = typeof top.delta === "number" ? `ΔE ${top.delta.toFixed(2)}` : "ΔE --";
    return `
      <div class="tc-card rounded-2xl p-4 flex flex-wrap gap-4 items-center">
        <div class="w-12 h-12 rounded-lg border border-black/5" style="background:${swatch};"></div>
        <div class="flex-1 min-w-[220px]">
          <div class="text-sm font-semibold">HEX ${item.inputHex || "--"}</div>
          <div class="text-xs tc-muted mt-1">Top: ${(top.brand || "")} ${(top.code || "")} · ${deltaText}</div>
          <div class="text-xs tc-muted">${formatTime(item.createdAt)}</div>
        </div>
      </div>
    `;
  }).join("");
};

const renderShopping = () => {
  if (!shoppingListEl || !shoppingEmptyEl) return;
  const items = listShopping();
  const totalQty = items.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  if (shoppingSummaryItems) shoppingSummaryItems.textContent = String(items.length);
  if (shoppingSummaryQty) shoppingSummaryQty.textContent = String(totalQty);
  if (!items.length) {
    shoppingEmptyEl.classList.remove("hidden");
    shoppingListEl.innerHTML = "";
    return;
  }
  shoppingEmptyEl.classList.add("hidden");
  shoppingListEl.innerHTML = items.map((item) => `
    <div class="tc-card rounded-2xl p-4 flex flex-wrap gap-4 items-center">
      <div class="w-10 h-10 rounded-lg border border-black/5" style="background:${normalizeHex(item.hex || "#ffffff")};"></div>
      <div class="flex-1 min-w-[200px]">
        <div class="text-sm font-semibold">${item.brand || ""} ${item.code || ""}</div>
        <div class="text-xs tc-muted">${item.name || ""}</div>
      </div>
      <div class="text-sm font-semibold">x${Number(item.qty) || 1}</div>
    </div>
  `).join("");
};

const renderInventory = () => {
  if (!stockBody || !stockEmpty) return;
  const items = listInventory();
  const totalQty = items.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  const lowCount = items.filter((item) => {
    const minQty = Number(item.minQty) || 1;
    return Number(item.qty) <= minQty;
  }).length;
  if (stockSummaryItems) stockSummaryItems.textContent = String(items.length);
  if (stockSummaryQty) stockSummaryQty.textContent = String(totalQty);
  if (stockSummaryLow) stockSummaryLow.textContent = String(lowCount);
  if (!items.length) {
    stockEmpty.classList.remove("hidden");
    stockBody.innerHTML = "";
    return;
  }
  stockEmpty.classList.add("hidden");
  stockBody.innerHTML = items.map((item) => `
    <tr class="border-b border-black/5">
      <td class="px-4 py-3"><div class="w-8 h-8 rounded-lg border border-black/5" style="background:${normalizeHex(item.hex || "#ffffff")};"></div></td>
      <td class="px-4 py-3">${item.brand || ""}</td>
      <td class="px-4 py-3">${item.code || ""}</td>
      <td class="px-4 py-3">${item.name || ""}</td>
      <td class="px-4 py-3 font-semibold">${Number(item.qty) || 1}</td>
    </tr>
  `).join("");
};

const init = () => {
  migrateOldKeys();
  if (stockCta) stockCta.classList.add("hidden");
  if (stockPanel) stockPanel.classList.remove("hidden");
  renderSaved();
  renderShopping();
  renderInventory();
};

window.addEventListener("DOMContentLoaded", init);
