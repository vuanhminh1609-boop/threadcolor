import { updateProfile } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  serverTimestamp,
  onSnapshot,
  writeBatch
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const TEXT = {
  authChecking: "\u0110ang ki\u1ec3m tra \u0111\u0103ng nh\u1eadp...",
  loginRequired: "Vui l\u00f2ng \u0111\u0103ng nh\u1eadp \u0111\u1ec3 l\u01b0u h\u1ed3 s\u01a1.",
  loginToSync: "\u0110\u0103ng nh\u1eadp \u0111\u1ec3 \u0111\u1ed3ng b\u1ed9 h\u1ed3 s\u01a1.",
  authNotReady: "Ch\u01b0a s\u1eb5n s\u00e0ng x\u00e1c th\u1ef1c. Vui l\u00f2ng th\u1eed l\u1ea1i.",
  saved: "\u0110\u00e3 l\u01b0u h\u1ed3 s\u01a1.",
  saving: "\u0110ang l\u01b0u...",
  saveFailed: "L\u01b0u kh\u00f4ng th\u00e0nh c\u00f4ng.",
  exportReady: "\u0110\u00e3 t\u1ea1o t\u1ec7p xu\u1ea5t.",
  importInvalid: "T\u1ec7p nh\u1eadp kh\u00f4ng h\u1ee3p l\u1ec7.",
  importReady: "\u0110\u00e3 s\u1eb5n s\u00e0ng nh\u1eadp d\u1eef li\u1ec7u.",
  importDone: "\u0110\u00e3 nh\u1eadp d\u1eef li\u1ec7u.",
  importCancelled: "\u0110\u00e3 hu\u1ef7 nh\u1eadp d\u1eef li\u1ec7u.",
  exportError: "Xu\u1ea5t d\u1eef li\u1ec7u th\u1ea5t b\u1ea1i.",
  importError: "Nh\u1eadp d\u1eef li\u1ec7u th\u1ea5t b\u1ea1i.",
  signOutOtherOk: "\u0110\u00e3 thu h\u1ed3i phi\u00ean tr\u00ean thi\u1ebft b\u1ecb kh\u00e1c.",
  signOutOtherFail: "Kh\u00f4ng thu h\u1ed3i \u0111\u01b0\u1ee3c phi\u00ean.",
  sessionRevoked: "Phi\u00ean n\u00e0y \u0111\u00e3 b\u1ecb thu h\u1ed3i. Vui l\u00f2ng \u0111\u0103ng nh\u1eadp l\u1ea1i.",
  requireLogin: "C\u1ea7n \u0111\u0103ng nh\u1eadp \u0111\u1ec3 ti\u1ebfp t\u1ee5c.",
  resetPasswordSent: "\u0110\u00e3 g\u1eedi email \u0111\u1eb7t l\u1ea1i m\u1eadt kh\u1ea9u.",
  resetPasswordFail: "Kh\u00f4ng g\u1eedi \u0111\u01b0\u1ee3c email \u0111\u1eb7t l\u1ea1i m\u1eadt kh\u1ea9u.",
  comingSoon: "T\u00ednh n\u0103ng n\u00e0y s\u1ebd s\u1edbm c\u00f3.",
  loginToSave: "\u0110\u0103ng nh\u1eadp \u0111\u1ec3 l\u01b0u",
  confirmTitle: "X\u00e1c nh\u1eadn thao t\u00e1c",
  confirmImport: "Ch\u1ecdn ch\u1ebf \u0111\u1ed9 nh\u1eadp d\u1eef li\u1ec7u.",
  confirmMerge: "G\u1ed9p d\u1eef li\u1ec7u",
  confirmOverwrite: "Ghi \u0111\u00e8 d\u1eef li\u1ec7u",
  confirmAccept: "X\u00e1c nh\u1eadn",
  confirmCancel: "Hu\u1ef7",
  confirmRevoke: "Thu h\u1ed3i phi\u00ean tr\u00ean thi\u1ebft b\u1ecb kh\u00e1c?",
  confirmRevokeDetail: "Thi\u1ebft b\u1ecb kh\u00e1c s\u1ebd b\u1ecb y\u00eau c\u1ea7u \u0111\u0103ng nh\u1eadp l\u1ea1i."
};

const PREF_WORLD = [
  { key: "origami", label: "Origami" },
  { key: "nebula", label: "Tinh v\u00e2n" },
  { key: "ocean", label: "\u0110\u1ea1i d\u01b0\u01a1ng" },
  { key: "ink", label: "M\u1ef1c t\u00e0u" },
  { key: "arcade", label: "Arcade" },
  { key: "dunes", label: "\u0110\u1ed3i c\u00e1t" },
  { key: "chrome", label: "Chrome" },
  { key: "circuit", label: "M\u1ea1ch \u0111i\u1ec7n" }
];
const PREF_LANGUAGE = [
  { key: "vi", label: "Ti\u1ebfng Vi\u1ec7t" },
  { key: "en", label: "English" }
];
const PREF_DENSITY = [
  { key: "standard", label: "Chu\u1ea9n" },
  { key: "compact", label: "G\u1ecdn" },
  { key: "relaxed", label: "R\u1ed9ng" }
];

const state = {
  currentUser: null,
  authResolved: false,
  api: null,
  db: null,
  userDoc: null,
  userData: {},
  saveTimer: null,
  saveQueue: {},
  sessionVersion: 0,
  unsubSession: null,
  pendingImport: null
};

const el = (id) => document.getElementById(id);

function setProfileStatus(message, isError = false) {
  const status = el("profileStatus");
  if (!status) return;
  status.textContent = message || "";
  status.classList.toggle("text-red-500", isError);
}

function showToast(message, type = "info") {
  const container = el("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "tc-card px-4 py-3 text-sm font-semibold shadow-lg";
  toast.textContent = message;
  if (type === "error") {
    toast.classList.add("text-red-600");
  }
  if (type === "success") {
    toast.classList.add("text-emerald-600");
  }
  container.appendChild(toast);
  setTimeout(() => toast.classList.add("opacity-0"), 2400);
  setTimeout(() => toast.remove(), 3000);
}

function openConfirm({ title, message, okLabel, cancelLabel, onOk, onCancel, onDismiss }) {
  const modal = el("confirmModal");
  const titleEl = el("confirmTitle");
  const msgEl = el("confirmMessage");
  const btnOk = el("btnConfirmOk");
  const btnCancel = el("btnConfirmCancel");
  if (!modal || !btnOk || !btnCancel) return;
  if (titleEl) titleEl.textContent = title || TEXT.confirmTitle;
  if (msgEl) msgEl.textContent = message || "";
  btnOk.textContent = okLabel || TEXT.confirmOverwrite;
  btnCancel.textContent = cancelLabel || TEXT.confirmCancel;
  const close = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };
  const cleanup = () => {
    btnOk.onclick = null;
    btnCancel.onclick = null;
    modal.onclick = null;
    document.onkeydown = null;
  };
  btnOk.onclick = () => {
    close();
    cleanup();
    if (typeof onOk === "function") onOk();
  };
  btnCancel.onclick = () => {
    close();
    cleanup();
    if (typeof onCancel === "function") onCancel();
  };
  modal.onclick = (evt) => {
    if (evt.target === modal) {
      close();
      cleanup();
      if (typeof onDismiss === "function") onDismiss();
    }
  };
  document.onkeydown = (evt) => {
    if (evt.key === "Escape") {
      close();
      cleanup();
      if (typeof onDismiss === "function") onDismiss();
    }
  };
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function waitForAuthApi(timeoutMs = 4000) {
  return new Promise((resolve) => {
    if (window.firebaseAuth) return resolve(window.firebaseAuth);
    const timer = setTimeout(() => resolve(window.firebaseAuth || null), timeoutMs);
    window.addEventListener("firebase-auth-ready", () => {
      clearTimeout(timer);
      resolve(window.firebaseAuth || null);
    }, { once: true });
  });
}

function getLocalSessionKey(uid) {
  return `tc_session_version_${uid}`;
}

function setAuthGuard(loggedIn) {
  const gate = el("accountAuthGate");
  const btnLogin = el("btnAccountLogin");
  if (!gate || !btnLogin) return;
  gate.classList.toggle("hidden", loggedIn);
  btnLogin.onclick = () => window.tcAuth?.openAuth?.();
}

function disableSave(disabled) {
  const btnSave = el("btnProfileSave");
  if (!btnSave) return;
  btnSave.disabled = !!disabled;
  btnSave.classList.toggle("opacity-60", !!disabled);
  btnSave.classList.toggle("cursor-not-allowed", !!disabled);
}

function renderAuthState() {
  if (!state.authResolved) {
    setProfileStatus(TEXT.authChecking);
    disableSave(true);
    setAuthGuard(false);
    return;
  }
  if (!state.currentUser) {
    setProfileStatus(TEXT.loginRequired, true);
    disableSave(true);
    setAuthGuard(false);
    return;
  }
  setProfileStatus("");
  disableSave(false);
  setAuthGuard(true);
}

function setButtonValue(button, value, mapping) {
  if (!button) return;
  const match = mapping.find((item) => item.key === value) || mapping[0];
  button.dataset.value = match.key;
  button.textContent = match.label;
}

function nextButtonValue(button, mapping) {
  if (!button) return mapping[0].key;
  const current = button.dataset.value || mapping[0].key;
  const idx = mapping.findIndex((item) => item.key === current);
  const next = mapping[(idx + 1) % mapping.length];
  setButtonValue(button, next.key, mapping);
  return next.key;
}

function setToggle(button, value, labels) {
  if (!button) return;
  const next = !!value;
  button.setAttribute("aria-pressed", next ? "true" : "false");
  button.textContent = next ? labels.on : labels.off;
}

function bindInputs() {
  const inputMap = [
    { id: "profileDisplayName", path: "profile.displayName" },
    { id: "profilePhotoUrl", path: "profile.photoURL" },
    { id: "profileOrgUnit", path: "profile.orgUnit" },
    { id: "profileGoal", path: "profile.goal" }
  ];
  inputMap.forEach(({ id, path }) => {
    const input = el(id);
    if (!input) return;
    input.addEventListener("input", () => {
      setLocalValue(path, input.value);
      scheduleSave(path, input.value);
    });
  });
}

function setLocalValue(path, value) {
  const parts = path.split(".");
  let target = state.userData;
  parts.forEach((part, idx) => {
    if (idx === parts.length - 1) {
      target[part] = value;
    } else {
      target[part] = target[part] || {};
      target = target[part];
    }
  });
}

function getLocalValue(path, fallback = "") {
  const parts = path.split(".");
  let target = state.userData;
  for (const part of parts) {
    if (!target || typeof target !== "object") return fallback;
    target = target[part];
  }
  return target ?? fallback;
}

function scheduleSave(path, value) {
  state.saveQueue[path] = value;
  if (state.saveTimer) clearTimeout(state.saveTimer);
  state.saveTimer = setTimeout(() => flushSaveQueue(), 700);
}

async function flushSaveQueue() {
  const queue = { ...state.saveQueue };
  state.saveQueue = {};
  if (!Object.keys(queue).length) return;
  await saveUserData(queue, true);
}

function buildPatch(queue) {
  const patch = {};
  Object.entries(queue).forEach(([path, value]) => {
    const parts = path.split(".");
    let target = patch;
    parts.forEach((part, idx) => {
      if (idx === parts.length - 1) {
        target[part] = value;
      } else {
        target[part] = target[part] || {};
        target = target[part];
      }
    });
  });
  return patch;
}

async function saveUserData(queue, silent = false) {
  if (!state.currentUser || !state.db) return;
  if (!silent) setProfileStatus(TEXT.saving);
  try {
    const patch = buildPatch(queue);
    await setDoc(state.userDoc, {
      ...patch,
      capNhatLuc: serverTimestamp()
    }, { merge: true });
    if (!silent) setProfileStatus(TEXT.saved);
  } catch (err) {
    console.error("saveUserData", err);
    if (!silent) setProfileStatus(TEXT.saveFailed, true);
  }
}

async function saveProfile() {
  if (!state.authResolved) {
    showToast(TEXT.authChecking);
    return;
  }
  if (!state.currentUser) {
    showToast(TEXT.requireLogin);
    window.tcAuth?.openAuth?.();
    return;
  }
  const displayName = el("profileDisplayName")?.value || "";
  const photoURL = el("profilePhotoUrl")?.value || "";
  const patch = {
    "profile.displayName": displayName,
    "profile.photoURL": photoURL,
    "profile.orgUnit": el("profileOrgUnit")?.value || "",
    "profile.goal": el("profileGoal")?.value || ""
  };
  try {
    await updateProfile(state.currentUser, { displayName, photoURL });
  } catch (err) {
    console.warn("updateProfile", err);
  }
  await saveUserData(patch, false);
}

async function loadUserData() {
  if (!state.currentUser || !state.db) return;
  state.userDoc = doc(state.db, "users", state.currentUser.uid);
  const snapshot = await getDoc(state.userDoc);
  state.userData = snapshot.exists() ? (snapshot.data() || {}) : {};
  hydrateForm();
  setupSessionWatch();
}

function hydrateForm() {
  const profile = state.userData.profile || {};
  const prefs = state.userData.prefs || {};
  const privacy = state.userData.privacy || {};
  const data = state.userData.data || {};
  const displayName = profile.displayName || state.currentUser?.displayName || "";
  const photoURL = profile.photoURL || state.currentUser?.photoURL || "";
  const orgUnit = profile.orgUnit || "";
  const goal = profile.goal || "";
  if (el("profileDisplayName")) el("profileDisplayName").value = displayName;
  if (el("profilePhotoUrl")) el("profilePhotoUrl").value = photoURL;
  if (el("profileOrgUnit")) el("profileOrgUnit").value = orgUnit;
  if (el("profileGoal")) el("profileGoal").value = goal;

  setButtonValue(el("btnPrefWorld"), prefs.world || "origami", PREF_WORLD);
  setButtonValue(el("btnPrefLanguage"), prefs.language || "vi", PREF_LANGUAGE);
  setButtonValue(el("btnPrefDensity"), prefs.density || "standard", PREF_DENSITY);
  setToggle(el("btnPrefShortcutsToggle"), prefs.shortcuts !== false, { on: "\u0110ang b\u1eadt", off: "\u0110ang t\u1eaft" });
  setToggle(el("btnSyncToggle"), data.sync !== false, { on: "\u0110ang b\u1eadt", off: "\u0110ang t\u1eaft" });

  setToggle(el("btnPrivacyTelemetryToggle"), privacy.telemetry !== false, { on: "\u0110ang b\u1eadt", off: "\u0110ang t\u1eaft" });
  setToggle(el("btnPrivacyReadonlyToggle"), !!privacy.readOnly, { on: "\u0110ang b\u1eadt", off: "\u0110ang t\u1eaft" });
  setToggle(el("btnPrivacyAnonymousToggle"), !!privacy.anonymous, { on: "\u0110ang b\u1eadt", off: "Kh\u00f4ng k\u00edch ho\u1ea1t" });
}

function bindButtons() {
  el("btnProfileSave")?.addEventListener("click", saveProfile);
  el("btnPasswordAction")?.addEventListener("click", async () => {
    const email = state.currentUser?.email;
    if (!email) return showToast(TEXT.requireLogin);
    try {
      await state.api?.resetPassword?.(email);
      showToast(TEXT.resetPasswordSent, "success");
    } catch (err) {
      console.error(err);
      showToast(TEXT.resetPasswordFail, "error");
    }
  });
  el("btnSignOutAllDevices")?.addEventListener("click", () => {
    openConfirm({
      title: TEXT.confirmTitle,
      message: `${TEXT.confirmRevoke} ${TEXT.confirmRevokeDetail}`,
      okLabel: TEXT.confirmAccept,
      cancelLabel: TEXT.confirmCancel,
      onOk: () => revokeOtherSessions()
    });
  });
  document.querySelector("#section-logout #btnLogout")?.addEventListener("click", async () => {
    await state.api?.signOutUser?.();
  });
  el("btnAccountLogin")?.addEventListener("click", () => window.tcAuth?.openAuth?.());

  el("btnPrefWorld")?.addEventListener("click", () => {
    const value = nextButtonValue(el("btnPrefWorld"), PREF_WORLD);
    setLocalValue("prefs.world", value);
    scheduleSave("prefs.world", value);
  });
  el("btnPrefLanguage")?.addEventListener("click", () => {
    const value = nextButtonValue(el("btnPrefLanguage"), PREF_LANGUAGE);
    setLocalValue("prefs.language", value);
    scheduleSave("prefs.language", value);
  });
  el("btnPrefDensity")?.addEventListener("click", () => {
    const value = nextButtonValue(el("btnPrefDensity"), PREF_DENSITY);
    setLocalValue("prefs.density", value);
    scheduleSave("prefs.density", value);
  });
  el("btnPrefShortcutsToggle")?.addEventListener("click", () => {
    const current = el("btnPrefShortcutsToggle")?.getAttribute("aria-pressed") === "true";
    const next = !current;
    setToggle(el("btnPrefShortcutsToggle"), next, { on: "\u0110ang b\u1eadt", off: "\u0110ang t\u1eaft" });
    setLocalValue("prefs.shortcuts", next);
    scheduleSave("prefs.shortcuts", next);
  });
  el("btnSyncToggle")?.addEventListener("click", () => {
    const current = el("btnSyncToggle")?.getAttribute("aria-pressed") === "true";
    const next = !current;
    setToggle(el("btnSyncToggle"), next, { on: "\u0110ang b\u1eadt", off: "\u0110ang t\u1eaft" });
    setLocalValue("data.sync", next);
    scheduleSave("data.sync", next);
  });
  el("btnPrivacyTelemetryToggle")?.addEventListener("click", () => {
    const current = el("btnPrivacyTelemetryToggle")?.getAttribute("aria-pressed") === "true";
    const next = !current;
    setToggle(el("btnPrivacyTelemetryToggle"), next, { on: "\u0110ang b\u1eadt", off: "\u0110ang t\u1eaft" });
    setLocalValue("privacy.telemetry", next);
    scheduleSave("privacy.telemetry", next);
  });
  el("btnPrivacyReadonlyToggle")?.addEventListener("click", () => {
    const current = el("btnPrivacyReadonlyToggle")?.getAttribute("aria-pressed") === "true";
    const next = !current;
    setToggle(el("btnPrivacyReadonlyToggle"), next, { on: "\u0110ang b\u1eadt", off: "\u0110ang t\u1eaft" });
    setLocalValue("privacy.readOnly", next);
    scheduleSave("privacy.readOnly", next);
  });
  el("btnPrivacyAnonymousToggle")?.addEventListener("click", () => {
    const current = el("btnPrivacyAnonymousToggle")?.getAttribute("aria-pressed") === "true";
    const next = !current;
    setToggle(el("btnPrivacyAnonymousToggle"), next, { on: "\u0110ang b\u1eadt", off: "Kh\u00f4ng k\u00edch ho\u1ea1t" });
    setLocalValue("privacy.anonymous", next);
    scheduleSave("privacy.anonymous", next);
  });

  el("btnExportJson")?.addEventListener("click", () => exportData("json"));
  el("btnExportCsv")?.addEventListener("click", () => exportData("csv"));
  el("btnImportFile")?.addEventListener("click", () => el("accountImportInput")?.click());
  el("accountImportInput")?.addEventListener("change", handleImportFile);

  el("btnBackupCreate")?.addEventListener("click", () => showToast(TEXT.comingSoon));
  el("btnBackupRestore")?.addEventListener("click", () => showToast(TEXT.comingSoon));
  el("btnSupportFeedback")?.addEventListener("click", () => showToast(TEXT.comingSoon));
  el("btnSupportContact")?.addEventListener("click", () => showToast(TEXT.comingSoon));
}

function setupSessionWatch() {
  if (!state.userDoc || !state.currentUser) return;
  const uid = state.currentUser.uid;
  const storageKey = getLocalSessionKey(uid);
  const localVersion = Number(localStorage.getItem(storageKey) || "0");
  const docVersion = Number(state.userData.sessionVersion || 0);
  state.sessionVersion = Math.max(localVersion, docVersion);
  localStorage.setItem(storageKey, String(state.sessionVersion));
  if (state.unsubSession) state.unsubSession();
  state.unsubSession = onSnapshot(state.userDoc, (snap) => {
    const remoteVersion = Number(snap.data()?.sessionVersion || 0);
    if (remoteVersion > state.sessionVersion) {
      localStorage.setItem(storageKey, String(remoteVersion));
      state.sessionVersion = remoteVersion;
      showToast(TEXT.sessionRevoked, "error");
      state.api?.signOutUser?.();
    }
  });
}

async function revokeOtherSessions() {
  if (!state.currentUser || !state.userDoc) return showToast(TEXT.requireLogin, "error");
  try {
    const nextVersion = (state.sessionVersion || 0) + 1;
    state.sessionVersion = nextVersion;
    localStorage.setItem(getLocalSessionKey(state.currentUser.uid), String(nextVersion));
    await setDoc(state.userDoc, {
      sessionVersion: nextVersion,
      capNhatLuc: serverTimestamp()
    }, { merge: true });
    showToast(TEXT.signOutOtherOk, "success");
  } catch (err) {
    console.error(err);
    showToast(TEXT.signOutOtherFail, "error");
  }
}

function buildExportObject(savedSearches) {
  return {
    profile: state.userData.profile || {},
    prefs: state.userData.prefs || {},
    privacy: state.userData.privacy || {},
    data: state.userData.data || {},
    savedSearches
  };
}

function downloadFile(name, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function toCsv(items) {
  if (!items.length) return "id\n";
  const keys = new Set();
  items.forEach((item) => Object.keys(item).forEach((k) => keys.add(k)));
  const columns = ["id", ...Array.from(keys).filter((k) => k !== "id")];
  const escape = (value) => {
    const text = value == null ? "" : String(value);
    if (/[\",\\n]/.test(text)) return `\"${text.replace(/\"/g, '\"\"')}\"`;
    return text;
  };
  const lines = [columns.join(",")];
  items.forEach((item) => {
    const row = columns.map((col) => escape(item[col]));
    lines.push(row.join(","));
  });
  return lines.join("\n");
}

async function exportData(type) {
  if (!state.currentUser || !state.db) return showToast(TEXT.requireLogin, "error");
  try {
    const searchesCol = collection(state.db, "users", state.currentUser.uid, "savedSearches");
    const searchSnap = await getDocs(searchesCol);
    const savedSearches = searchSnap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
    const payload = buildExportObject(savedSearches);
    if (type === "json") {
      downloadFile("account-export.json", JSON.stringify(payload, null, 2), "application/json");
      showToast(TEXT.exportReady, "success");
      return;
    }
    const csv = toCsv(savedSearches);
    downloadFile("account-saved-searches.csv", csv, "text/csv");
    showToast(TEXT.exportReady, "success");
  } catch (err) {
    console.error(err);
    showToast(TEXT.exportError, "error");
  }
}

function handleImportFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!data || typeof data !== "object") throw new Error("invalid");
      const savedSearches = Array.isArray(data.savedSearches) ? data.savedSearches : [];
      state.pendingImport = { ...data, savedSearches };
      showToast(TEXT.importReady, "success");
      openConfirm({
        title: TEXT.confirmTitle,
        message: `${TEXT.confirmImport} (${savedSearches.length} m\u1ee5c \u0111\u00e3 l\u01b0u)`,
        okLabel: TEXT.confirmMerge,
        cancelLabel: TEXT.confirmOverwrite,
        onOk: () => applyImport("merge"),
        onCancel: () => applyImport("overwrite"),
        onDismiss: () => {
          state.pendingImport = null;
          showToast(TEXT.importCancelled);
        }
      });
    } catch (err) {
      console.error(err);
      showToast(TEXT.importInvalid, "error");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

async function applyImport(mode) {
  if (!state.pendingImport) return;
  if (!state.currentUser || !state.db) return showToast(TEXT.requireLogin, "error");
  try {
    const { profile, prefs, privacy, data, savedSearches } = state.pendingImport;
    const patch = {};
    if (profile && typeof profile === "object") patch.profile = profile;
    if (prefs && typeof prefs === "object") patch.prefs = prefs;
    if (privacy && typeof privacy === "object") patch.privacy = privacy;
    if (data && typeof data === "object") patch.data = data;
    if (Object.keys(patch).length) {
      await setDoc(state.userDoc, patch, { merge: true });
    }
    if (Array.isArray(savedSearches)) {
      const colRef = collection(state.db, "users", state.currentUser.uid, "savedSearches");
      if (mode === "overwrite") {
        const existing = await getDocs(colRef);
        const batch = writeBatch(state.db);
        existing.docs.forEach((docSnap) => batch.delete(docSnap.ref));
        await batch.commit();
      }
      const batch = writeBatch(state.db);
      savedSearches.forEach((item) => {
        const clean = { ...item };
        const id = clean.id;
        delete clean.id;
        if (id) {
          batch.set(doc(colRef, id), clean, { merge: mode === "merge" });
        }
      });
      await batch.commit();
      for (const item of savedSearches) {
        if (!item.id) {
          await setDoc(doc(colRef), item, { merge: true });
        }
      }
    }
    state.pendingImport = null;
    showToast(TEXT.importDone, "success");
  } catch (err) {
    console.error(err);
    showToast(TEXT.importError, "error");
  }
}

async function init() {
  setProfileStatus(TEXT.authChecking);
  disableSave(true);
  state.api = await waitForAuthApi();
  if (!state.api || state.api.initError) {
    console.error("firebaseAuth not ready", state.api?.initError);
    showToast(TEXT.authNotReady, "error");
    return;
  }
  state.db = state.api.db || state.api.firestore || null;
  bindInputs();
  bindButtons();
  state.api.onAuthStateChanged((user) => {
    state.currentUser = user || null;
    state.authResolved = true;
    renderAuthState();
    if (user) {
      loadUserData();
    } else {
      state.userData = {};
      if (state.unsubSession) state.unsubSession();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
