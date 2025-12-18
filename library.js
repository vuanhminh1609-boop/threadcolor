import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  limit as fsLimit,
  getDocs,
  getDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

export async function saveSearch(db, uid, payload) {
  if (!db || !uid || !payload) throw new Error("Missing db/uid/payload");
  const ref = collection(db, "users", uid, "savedSearches");
  return addDoc(ref, { ...payload, createdAt: serverTimestamp() });
}

export async function listSavedSearches(db, uid, limitN = 20) {
  if (!db || !uid) throw new Error("Missing db/uid");
  const ref = collection(db, "users", uid, "savedSearches");
  const q = query(ref, orderBy("createdAt", "desc"), fsLimit(limitN));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function deleteSavedSearch(db, uid, docId) {
  if (!db || !uid || !docId) throw new Error("Missing db/uid/docId");
  const ref = doc(db, "users", uid, "savedSearches", docId);
  return deleteDoc(ref);
}

export async function getSavedSearch(db, uid, docId) {
  if (!db || !uid || !docId) throw new Error("Missing db/uid/docId");
  const ref = doc(db, "users", uid, "savedSearches", docId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}
