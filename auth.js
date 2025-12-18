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
