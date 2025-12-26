import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// TODO: Điền cấu hình Firebase của bạn tại đây
const firebaseConfig = {
  apiKey: "AIzaSyCftjgq7XUpTCbEG9fMRI_RNlzFc7rqz7g",
  authDomain: "thread-colors-for-community.firebaseapp.com",
  projectId: "thread-colors-for-community",
  storageBucket: "thread-colors-for-community.firebasestorage.app",
  messagingSenderId: "980305784078",
  appId: "1:980305784078:web:455bfff119e25a77913b5f",
  measurementId: "G-SZ8R6VTFRY"
};

function validateConfig(cfg) {
  const required = ["apiKey", "authDomain", "projectId", "appId"];
  required.forEach(k => {
    const v = cfg[k];
    if (!v || String(v).includes("TODO")) {
      throw new Error("Thiếu firebaseConfig");
    }
  });
}

try {
  validateConfig(firebaseConfig);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  async function upsertUser(user, providerId) {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const now = serverTimestamp();
    await setDoc(ref, {
      uid: user.uid,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      provider: providerId || (user.providerData[0]?.providerId ?? "password"),
      createdAt: now,
      lastLoginAt: now
    }, { merge: true });
  }

  function defaultDisplayName(email) {
    if (!email) return "";
    return email.split("@")[0];
  }

  async function signInEmail(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await upsertUser(cred.user, "password");
    return cred;
  }

  async function registerEmail(email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (!cred.user.displayName) {
      await updateProfile(cred.user, { displayName: defaultDisplayName(email) });
    }
    await upsertUser(cred.user, "password");
    return cred;
  }

  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  }

  async function signInGoogle() {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    await upsertUser(cred.user, "google.com");
    return cred;
  }

  async function signInFacebook() {
    const provider = new FacebookAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    await upsertUser(cred.user, "facebook.com");
    return cred;
  }

  async function signOutUser() {
    await signOut(auth);
  }

  window.firebaseAuth = {
    auth,
    db,
    initError: null,
    onAuthStateChanged: (cb) => onAuthStateChanged(auth, cb),
    signInEmail,
    registerEmail,
    resetPassword,
    signInGoogle,
    signInFacebook,
    signOutUser,
    addDoc,
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    deleteDoc,
  };
  window.dispatchEvent(new Event("firebase-auth-ready"));
} catch (err) {
  console.error("Firebase init error", err);
  window.firebaseAuth = { initError: err };
}

function getAuthApi() {
  return window.firebaseAuth || window.firebaseAuthApi || null;
}

function resolveToolUrl() {
  const path = window.location.pathname || "";
  return path.includes("/worlds/") ? "threadcolor.html" : "./worlds/threadcolor.html";
}

function exposeAuthPublicApi() {
  if (window.tcAuth?.version === "v1") return;
  const getApi = () => window.firebaseAuth || window.firebaseAuthApi || null;
  window.tcAuth = {
    version: "v1",
    getApi,
    getUser: () => {
      const api = getApi();
      return api?.auth?.currentUser || api?.user || null;
    },
    isLoggedIn: () => {
      const user = window.tcAuth.getUser();
      return !!(user?.uid || user?.email);
    },
    openAuth: () => {
      const btnAccount = document.getElementById("btnAccount");
      if (btnAccount) {
        btnAccount.click();
        return;
      }
      window.location.href = resolveToolUrl();
    },
    goTool: () => {
      window.location.href = resolveToolUrl();
    }
  };
}

function ensureAuthFallbackStyle() {
  if (document.getElementById("tc-auth-fallback-style")) return;
  const style = document.createElement("style");
  style.id = "tc-auth-fallback-style";
  style.textContent = `
#authOverlay{
  background: rgba(0,0,0,.45);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}
#authModal{
  background: var(--glass, rgba(255,255,255,.75));
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  color: var(--text, #111827);
  border-radius: 1.25rem;
  box-shadow: 0 22px 70px rgba(0,0,0,.28);
}
#authClose{
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  background: var(--glass, rgba(255,255,255,.75));
  color: var(--text, #111827);
  border-radius: .75rem;
}
#authModal input{
  background: var(--glass, rgba(255,255,255,.75));
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  color: var(--text, #111827);
  border-radius: .9rem;
}
#authModal input::placeholder{ color: var(--muted, rgba(17,24,39,.7)); opacity: .85; }
#authModal input:focus-visible,
#authClose:focus-visible,
#tabLogin:focus-visible, #tabRegister:focus-visible,
#btnLogin:focus-visible, #btnRegister:focus-visible,
#btnGoogle:focus-visible, #btnFacebook:focus-visible{
  outline: none;
  box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1, #6366f1);
}
#tabLogin, #tabRegister{
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  background: var(--glass, rgba(255,255,255,.75));
  color: var(--text, #111827);
  border-radius: .9rem;
}
#tabLogin.bg-indigo-50, #tabRegister.bg-indigo-50{
  background: linear-gradient(135deg, var(--a1, #6366f1), var(--a2, #8b5cf6));
  border-color: rgba(255,255,255,.18);
}
#tabLogin.text-indigo-700, #tabRegister.text-indigo-700{
  color: #fff !important;
}
#btnLogin, #btnRegister{
  background: linear-gradient(135deg, var(--a1, #6366f1), var(--a2, #8b5cf6));
  color: #fff;
  border: 1px solid rgba(255,255,255,.18);
  border-radius: .9rem;
}
#btnGoogle, #btnFacebook{
  background: var(--glass, rgba(255,255,255,.75));
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  color: var(--text, #111827);
  border-radius: .9rem;
}
#btnForgot{
  color: var(--muted, rgba(17,24,39,.7));
}
#authError{
  color: #ef4444;
  background: rgba(239,68,68,.10);
  border: 1px solid rgba(239,68,68,.22);
  border-radius: .9rem;
}
#topbarAuthSlot[data-auth-float="1"]{
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 70;
}
#topbarAuthSlot .tc-chip{
  background: var(--glass, rgba(255,255,255,.75));
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  color: var(--text, #111827);
}
#topbarAuthSlot .tc-btn{
  border-radius: 0.75rem;
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  background: var(--glass, rgba(255,255,255,.75));
  color: var(--text, #111827);
  font-weight: 650;
  letter-spacing: -0.005em;
  line-height: 1;
  transition: filter .15s ease, transform .05s ease, box-shadow .15s ease;
}
#topbarAuthSlot .tc-btn-primary{
  background: linear-gradient(135deg, var(--a1, #6366f1), var(--a2, #8b5cf6));
  color: #fff;
  border: 1px solid rgba(255,255,255,.18);
}
#topbarAuthSlot .tc-dot{
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--a1, #6366f1), var(--a2, #8b5cf6), var(--a3, #ec4899));
  box-shadow: 0 0 0 2px rgba(255,255,255,.5);
}
#topbarAuthSlot .tc-btn:hover,
#topbarAuthSlot .tc-chip:hover{ filter: brightness(1.03); }
#topbarAuthSlot .tc-btn:active{ transform: translateY(1px); }
#topbarAuthSlot .tc-btn:focus-visible,
#topbarAuthSlot #accountMenu button:focus-visible{
  outline: none;
  box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1, #6366f1);
}
#topbarAuthSlot #accountMenu{
  background: var(--glass, rgba(255,255,255,.75));
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  color: var(--text, #111827);
}
#topbarAuthSlot #accountMenu button{
  padding: .6rem .75rem;
  line-height: 1.1;
}
#topbarAuthSlot #accountMenu button:hover{
  background: rgba(255,255,255,.10);
}
#topbarAuthSlot #accountMenu button + button{
  border-top: 1px solid var(--stroke, rgba(0,0,0,.12));
  opacity: .35;
}
@media (prefers-reduced-motion: reduce){
  #topbarAuthSlot .tc-btn,
  #topbarAuthSlot .tc-chip{
    transition: none !important;
  }
}
@media (prefers-reduced-motion: reduce){
  #authModal *{ transition: none !important; }
}
  `;
  document.head.appendChild(style);
}

function ensureTopbarAuthDock() {
  const slot = document.getElementById("topbarAuthSlot");
  if (!slot) return false;
  if (slot.dataset.authDocked === "1") return false;

  const userInfo = document.getElementById("userInfo");
  const btnAccount = document.getElementById("btnAccount");
  const accountMenuBtn = document.getElementById("accountMenuBtn");
  const accountMenu = document.getElementById("accountMenu");
  const isSlotInBody = slot.parentElement === document.body;
  let changed = false;

  if (userInfo || btnAccount || accountMenuBtn || accountMenu) {
    let container = userInfo?.parentElement || null;
    if (container && btnAccount && !container.contains(btnAccount)) {
      container = btnAccount.parentElement;
    }
    if (container && userInfo && !container.contains(userInfo)) {
      container = null;
    }
    if (container) {
      if (container.parentElement !== slot) {
        slot.appendChild(container);
        changed = true;
      }
    } else {
      if (userInfo && userInfo.parentElement !== slot) {
        slot.appendChild(userInfo);
        changed = true;
      }
      if (btnAccount && btnAccount.parentElement !== slot) {
        slot.appendChild(btnAccount);
        changed = true;
      }
    }
  } else {
    slot.innerHTML = `
      <div class="flex items-center gap-3 min-w-[210px] justify-end">
        <div id="userInfo" class="hidden relative text-sm">
          <button id="accountMenuBtn" class="flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm tc-chip tc-btn">
            <img id="userAvatar" class="w-8 h-8 rounded-full border border-gray-200 object-cover" alt="">
            <span id="userName" class="font-semibold max-w-[110px] truncate"></span>
            <span class="opacity-70">&#9662;</span>
          </button>
          <div id="accountMenu" class="hidden absolute right-0 mt-3 w-44 rounded-lg shadow-lg overflow-hidden origin-top-right tc-chip">
            <button id="btnLibrary" class="w-full text-left px-3 py-2 hover:bg-white/10">Th&#432; vi&#7879;n c&#7911;a t&#244;i</button>
            <button id="btnContribute" class="w-full text-left px-3 py-2 hover:bg-white/10">&#272;&#243;ng g&#243;p d&#7919; li&#7879;u</button>
            <button id="btnVerify" class="w-full text-left px-3 py-2 hover:bg-white/10">X&#225;c minh</button>
            <button id="btnLogout" class="w-full text-left px-3 py-2 hover:bg-white/10">&#272;&#259;ng xu&#7845;t</button>
          </div>
        </div>
        <button id="btnAccount" class="tc-btn tc-btn-primary px-4 py-2">&#272;&#259;ng nh&#7853;p</button>
      </div>
    `;
    changed = true;
    if (isSlotInBody) {
      slot.dataset.authFloat = "1";
    } else {
      delete slot.dataset.authFloat;
    }
    slot.dataset.authDocked = "1";
    return true;
  }
  if (isSlotInBody) {
    slot.dataset.authFloat = "1";
  } else {
    delete slot.dataset.authFloat;
  }
  slot.dataset.authDocked = "1";
  return changed;
}

function ensureAuthModalExists() {
  const overlay = document.getElementById("authOverlay");
  const modal = document.getElementById("authModal");
  if (overlay && modal) return false;
  document.body.insertAdjacentHTML("beforeend", `
    <div id="authOverlay" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 hidden"></div>
    <div id="authModal" class="fixed inset-0 z-50 hidden items-center justify-center px-4">
      <div class="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div class="flex gap-2">
            <button id="tabLogin" class="px-3 py-1 rounded-lg text-sm font-semibold bg-indigo-50 text-indigo-700">&#272;&#259;ng nh&#7853;p</button>
            <button id="tabRegister" class="px-3 py-1 rounded-lg text-sm text-gray-600 hover:bg-gray-100">&#272;&#259;ng k&#253;</button>
          </div>
          <button id="authClose" class="p-2 rounded-full hover:bg-gray-100 text-gray-500">&times;</button>
        </div>
        <div class="p-5 space-y-4">
          <div id="authError" class="text-sm text-red-600 hidden"></div>
          <div id="loginPanel" class="space-y-3">
            <input id="loginEmail" type="email" class="w-full border rounded-lg px-3 py-2" placeholder="&#272;&#7883;a ch&#7881; email">
            <input id="loginPassword" type="password" class="w-full border rounded-lg px-3 py-2" placeholder="M&#7853;t kh&#7849;u">
            <button id="btnLogin" class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">&#272;&#259;ng nh&#7853;p</button>
            <button id="btnForgot" class="text-sm text-indigo-600 hover:underline">Qu&#234;n m&#7853;t kh&#7849;u?</button>
          </div>
          <div id="registerPanel" class="space-y-3 hidden">
            <input id="registerEmail" type="email" class="w-full border rounded-lg px-3 py-2" placeholder="&#272;&#7883;a ch&#7881; email">
            <input id="registerPassword" type="password" class="w-full border rounded-lg px-3 py-2" placeholder="M&#7853;t kh&#7849;u">
            <input id="registerConfirm" type="password" class="w-full border rounded-lg px-3 py-2" placeholder="X&#225;c nh&#7853;n m&#7853;t kh&#7849;u">
            <button id="btnRegister" class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">T&#7841;o t&#224;i kho&#7843;n</button>
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <span class="h-px flex-1 bg-gray-200"></span>
            <span>Ho&#7863;c</span>
            <span class="h-px flex-1 bg-gray-200"></span>
          </div>
          <button id="btnGoogle" class="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50">
            <span>G</span><span>Ti&#7871;p t&#7909;c v&#7899;i Google</span>
          </button>
          <button id="btnFacebook" class="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50">
            <span>f</span><span>Ti&#7871;p t&#7909;c v&#7899;i Facebook</span>
          </button>
        </div>
      </div>
    </div>
  `);
  return true;
}

function showAuthError(message) {
  const authError = document.getElementById("authError");
  if (!authError) return;
  if (!message) {
    authError.classList.add("hidden");
    authError.textContent = "";
    return;
  }
  authError.textContent = message;
  authError.classList.remove("hidden");
}

function setAuthTab(tab) {
  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");
  const loginPanel = document.getElementById("loginPanel");
  const registerPanel = document.getElementById("registerPanel");
  if (!tabLogin || !tabRegister || !loginPanel || !registerPanel) return;
  const isLogin = tab === "login";
  loginPanel.classList.toggle("hidden", !isLogin);
  registerPanel.classList.toggle("hidden", isLogin);
  tabLogin.classList.toggle("bg-indigo-50", isLogin);
  tabLogin.classList.toggle("text-indigo-700", isLogin);
  tabRegister.classList.toggle("bg-indigo-50", !isLogin);
  tabRegister.classList.toggle("text-indigo-700", !isLogin);
  showAuthError("");
}

function openAuthModal(tab = "login") {
  const authOverlay = document.getElementById("authOverlay");
  const authModal = document.getElementById("authModal");
  if (!authOverlay || !authModal) return;
  authOverlay.classList.remove("hidden");
  authModal.classList.remove("hidden");
  authModal.classList.add("flex");
  setAuthTab(tab);
  const loginEmail = document.getElementById("loginEmail");
  const registerEmail = document.getElementById("registerEmail");
  (tab === "login" ? loginEmail : registerEmail)?.focus();
}

function closeAuthModal() {
  const authOverlay = document.getElementById("authOverlay");
  const authModal = document.getElementById("authModal");
  if (!authOverlay || !authModal) return;
  authOverlay.classList.add("hidden");
  authModal.classList.add("hidden");
  authModal.classList.remove("flex");
  showAuthError("");
}

let lastAuthSignature = null;
function emitAuthChanged(user) {
  const payload = user ? {
    uid: user.uid || null,
    email: user.email || null,
    displayName: user.displayName || null,
    photoURL: user.photoURL || null
  } : null;
  const signature = payload ? `${payload.uid || ""}|${payload.email || ""}` : "guest";
  if (signature === lastAuthSignature) return;
  lastAuthSignature = signature;
  document.dispatchEvent(new CustomEvent("tc-auth-changed", { detail: { user: payload } }));
}

function updateAuthUI(user) {
  const api = getAuthApi();
  if (api) {
    api.user = user || null;
  }
  const userInfo = document.getElementById("userInfo");
  const btnAccount = document.getElementById("btnAccount");
  const btnLogout = document.getElementById("btnLogout");
  const userAvatar = document.getElementById("userAvatar");
  const userName = document.getElementById("userName");
  const loggedIn = !!user;
  userInfo?.classList.toggle("hidden", !loggedIn);
  btnAccount?.classList.toggle("hidden", loggedIn);
  btnLogout?.classList.toggle("hidden", !loggedIn);
  if (loggedIn && userName) userName.textContent = user.displayName || user.email || "User";
  if (loggedIn && userAvatar) {
    userAvatar.src = user.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.displayName || user.email || "U");
  }
  if (loggedIn) closeAuthModal();
  emitAuthChanged(user || null);
}

function bindAuthUiEvents() {
  const authModal = document.getElementById("authModal");
  if (!authModal || authModal.dataset.bound === "1") return;

  authModal.dataset.bound = "1";
  const btnAccount = document.getElementById("btnAccount");
  const authOverlay = document.getElementById("authOverlay");
  const authClose = document.getElementById("authClose");
  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const registerEmail = document.getElementById("registerEmail");
  const registerPassword = document.getElementById("registerPassword");
  const registerConfirm = document.getElementById("registerConfirm");
  const btnLogin = document.getElementById("btnLogin");
  const btnRegister = document.getElementById("btnRegister");
  const btnGoogle = document.getElementById("btnGoogle");
  const btnFacebook = document.getElementById("btnFacebook");
  const btnForgot = document.getElementById("btnForgot");
  const accountMenuBtn = document.getElementById("accountMenuBtn");
  const accountMenu = document.getElementById("accountMenu");
  const btnLibrary = document.getElementById("btnLibrary");
  const btnContribute = document.getElementById("btnContribute");
  const btnVerify = document.getElementById("btnVerify");
  const isToolWorld = () => !!(
    document.getElementById("libraryModal") ||
    document.getElementById("contributeModal") ||
    document.getElementById("verifyModal")
  );

  btnAccount?.addEventListener("click", () => openAuthModal("login"));
  authClose?.addEventListener("click", closeAuthModal);
  authOverlay?.addEventListener("click", closeAuthModal);
  tabLogin?.addEventListener("click", () => setAuthTab("login"));
  tabRegister?.addEventListener("click", () => setAuthTab("register"));

  const api = getAuthApi();
  btnLogin?.addEventListener("click", async () => {
    const email = loginEmail?.value.trim();
    const pass = loginPassword?.value;
    if (!email || !pass) return showAuthError("Vui l&#242;ng nh&#7853;p Email v&#224; m&#7853;t kh&#7849;u");
    try {
      await api?.signInEmail?.(email, pass);
    } catch (err) {
      showAuthError(err?.message || "&#272;&#259;ng nh&#7853;p th&#7845;t b&#7841;i");
    }
  });

  btnRegister?.addEventListener("click", async () => {
    const email = registerEmail?.value.trim();
    const pass = registerPassword?.value;
    const confirm = registerConfirm?.value;
    if (!email || !pass || !confirm) return showAuthError("&#272;i&#7873;n &#273;&#7847;y &#273;&#7911; th&#244;ng tin");
    if (pass !== confirm) return showAuthError("M&#7853;t kh&#7849;u kh&#244;ng tr&#249;ng kh&#7899;p");
    try {
      await api?.registerEmail?.(email, pass);
    } catch (err) {
      showAuthError(err?.message || "T&#7841;o t&#224;i kho&#7843;n th&#7845;t b&#7841;i");
    }
  });

  btnForgot?.addEventListener("click", async () => {
    const email = loginEmail?.value.trim();
    if (!email) return showAuthError("Nh&#7853;p email &#273;&#7875; &#273;&#7863;t l&#7841;i m&#7853;t kh&#7849;u");
    try {
      await api?.resetPassword?.(email);
    } catch (err) {
      showAuthError(err?.message || "Kh&#244;ng g&#7917;i &#273;&#432;&#7907;c email");
    }
  });

  btnGoogle?.addEventListener("click", async () => {
    try {
      await api?.signInGoogle?.();
    } catch (err) {
      showAuthError(err?.message || "Google login th&#7845;t b&#7841;i");
    }
  });

  btnFacebook?.addEventListener("click", async () => {
    try {
      await api?.signInFacebook?.();
    } catch (err) {
      showAuthError(err?.message || "Facebook login th&#7845;t b&#7841;i");
    }
  });

  if (accountMenuBtn) {
    accountMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      accountMenu?.classList.toggle("hidden");
    });
    document.addEventListener("click", () => accountMenu?.classList.add("hidden"));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        accountMenu?.classList.add("hidden");
        closeAuthModal();
      }
    });
  }

  const fallbackToTool = () => {
    if (isToolWorld()) return;
    window.location.href = "worlds/threadcolor.html";
  };
  btnLibrary?.addEventListener("click", () => fallbackToTool());
  btnContribute?.addEventListener("click", () => fallbackToTool());
  btnVerify?.addEventListener("click", () => fallbackToTool());
}

let hasBoundAuthState = false;
function bindAuthState() {
  if (hasBoundAuthState) return;
  const api = getAuthApi();
  if (!api?.onAuthStateChanged) return;
  hasBoundAuthState = true;
  api.onAuthStateChanged((user) => updateAuthUI(user));
  updateAuthUI(api.auth?.currentUser || null);
}

function initAuthDocking() {
  exposeAuthPublicApi();
  ensureAuthFallbackStyle();
  const injectedModal = ensureAuthModalExists();
  const injectedAccount = ensureTopbarAuthDock();
  if (injectedModal || injectedAccount) {
    bindAuthUiEvents();
  }
  bindAuthState();
}

document.addEventListener("DOMContentLoaded", initAuthDocking);
window.addEventListener("firebase-auth-ready", () => {
  exposeAuthPublicApi();
  const injectedAccount = ensureTopbarAuthDock();
  if (injectedAccount) {
    bindAuthUiEvents();
  }
  bindAuthState();
});
