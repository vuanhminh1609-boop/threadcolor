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
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

export async function saveSearch(db, uid, payload) {
  if (!db || !uid || !payload) throw new Error("Missing db/uid/payload");
  console.info("[saveSearch] projectId", db?.app?.options?.projectId);
  console.info("[saveSearch] uid", uid, "path", collection(db, "users", uid, "savedSearches").path);
  const ref = collection(db, "users", uid, "savedSearches");
  const docRef = await addDoc(ref, { ...payload, createdAt: serverTimestamp() });
  console.info("[saveSearch] saved doc id", docRef.id);
  return docRef;
}

export async function listSavedSearches(db, uid, limitN = 50) {
  if (!db || !uid) throw new Error("Missing db/uid");
  console.info("[listSavedSearches] uid", uid, "path", collection(db, "users", uid, "savedSearches").path);
  const ref = collection(db, "users", uid, "savedSearches");
  let docs = [];
  try {
    const q = query(ref, orderBy("createdAt", "desc"), fsLimit(limitN));
    const snap = await getDocs(q);
    docs = snap.docs;
    console.info("[listSavedSearches] count", snap.size);
  } catch (err) {
    console.error("listSavedSearches orderBy fallback", err);
    const snap = await getDocs(ref);
    docs = snap.docs;
    docs.sort((a, b) => {
      const ta = a.data()?.createdAt?.toMillis ? a.data().createdAt.toMillis() : 0;
      const tb = b.data()?.createdAt?.toMillis ? b.data().createdAt.toMillis() : 0;
      return tb - ta;
    });
    console.info("[listSavedSearches] count (fallback)", docs.length);
  }

  const items = [];
  let migrated = 0;

  for (const d of docs.slice(0, limitN)) {
    const data = d.data() || {};
    const results = Array.isArray(data.results) ? data.results : [];
    const selectedBrands = Array.isArray(data.selectedBrands) ? data.selectedBrands : [];
    let topMatch = data.topMatch || (results.length ? results[0] : null);
    let label = data.label;
    if (!label) {
      if (topMatch) {
        label = `${topMatch.brand || ""} ${topMatch.code || ""}`.trim();
      } else if (results.length) {
        label = `${results[0].brand || ""} ${results[0].code || ""}`.trim();
        topMatch = topMatch || results[0];
      } else {
        label = data.inputHex || "";
      }
      try {
        await setDoc(d.ref, { label, topMatch }, { merge: true });
        migrated += 1;
      } catch (e) {
        console.error("listSavedSearches migrate label failed", e);
      }
    }
    items.push({
      id: d.id,
      inputHex: data.inputHex || "",
      createdAt: data.createdAt || null,
      deltaThreshold: data.deltaThreshold,
      selectedBrands: selectedBrands,
      selectedBrandsCount: selectedBrands.length || 0,
      resultsCount: results.length || 0,
      label,
      topMatch,
      results
    });
  }
  return { items, migrated };
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
