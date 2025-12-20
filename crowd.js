import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit as fsLimit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { normalizeThreadRecord } from "./data_normalize.js";

export function normalizeBrandKey(brand) {
  if (!brand) return "";
  return brand.replace(/\s+/g, " ").trim().toLowerCase();
}

function ensureAuthUser(user) {
  if (!user || !user.uid) {
    throw new Error("User required");
  }
}

export async function submitThread(db, user, payload) {
  if (!db) throw new Error("Missing db");
  ensureAuthUser(user);
  if (!payload?.brand || !payload?.code || !payload?.hex) {
    throw new Error("Missing brand/code/hex");
  }
  const brandKey = normalizeBrandKey(payload.brand);
  const data = {
    brand: payload.brand.trim(),
    brandKey,
    code: String(payload.code).trim(),
    name: (payload.name || "").trim(),
    hex: payload.hex.trim(),
    rgb: payload.rgb || undefined,
    thickness: payload.thickness || undefined,
    status: "pending",
    createdByUid: user.uid,
    createdByName: user.displayName || "",
    createdByPhotoURL: user.photoURL || "",
    createdAt: serverTimestamp()
  };
  const ref = collection(db, "submissions");
  return addDoc(ref, data);
}

export async function listPendingSubmissions(db, limitN = 50) {
  if (!db) throw new Error("Missing db");
  const ref = collection(db, "submissions");
  const q = query(
    ref,
    where("status", "==", "pending"),
    orderBy("createdAt", "desc"),
    fsLimit(limitN)
  );
  console.info("[listPendingSubmissions] query", {
    path: ref.path || "submissions",
    limit: limitN,
    orderBy: "createdAt desc",
    where: "status == pending"
  });
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function voteOnSubmission(db, submissionId, user, vote) {
  if (!db) throw new Error("Missing db");
  ensureAuthUser(user);
  if (!submissionId || !vote) throw new Error("Missing submissionId/vote");
  const ref = doc(db, "submissions", submissionId, "votes", user.uid);
  await setDoc(ref, { vote, createdAt: serverTimestamp() }, { merge: true });
}

export async function getVoteSummary(db, submissionId) {
  if (!db) throw new Error("Missing db");
  if (!submissionId) throw new Error("Missing submissionId");
  const ref = collection(db, "submissions", submissionId, "votes");
  console.info("[getVoteSummary] query", { path: ref.path });
  const snap = await getDocs(ref);
  let confirmCount = 0;
  let rejectCount = 0;
  snap.forEach(docSnap => {
    const vote = docSnap.data()?.vote;
    if (vote === "confirm") confirmCount += 1;
    if (vote === "reject") rejectCount += 1;
  });
  return { confirmCount, rejectCount };
}

export async function isAdmin(db, uid) {
  if (!db || !uid) return false;
  const snap = await getDoc(doc(db, "admins", uid));
  return snap.exists() && snap.data()?.enabled === true;
}


export async function promoteSubmissionToVerified(db, submissionDoc, summary, adminUser) {
  if (!db) throw new Error("Missing db");
  ensureAuthUser(adminUser);
  if (!submissionDoc?.id) throw new Error("Missing submission doc");
  const adminOk = await isAdmin(db, adminUser.uid);
  if (!adminOk) throw new Error("Admin required");

  const brandKey = normalizeBrandKey(submissionDoc.brand);
  const key = `${brandKey}__${submissionDoc.code}`;
  const baseRecord = {
    brand: submissionDoc.brand,
    code: submissionDoc.code,
    name: submissionDoc.name,
    hex: submissionDoc.hex,
    rgb: submissionDoc.rgb,
    thickness: submissionDoc.thickness,
    confidence: 0.85,
    source: { type: "CROWD_VERIFIED", uid: adminUser.uid, provider: "crowd" },
    meta: { updatedAt: serverTimestamp() }
  };
  const normalized = normalizeThreadRecord(baseRecord, { source: baseRecord.source, confidence: 0.85 });
  if (!normalized) throw new Error("Invalid submission payload");

  const verifiedRef = doc(db, "verifiedThreads", key);
  await setDoc(verifiedRef, normalized, { merge: true });

  const submissionRef = doc(db, "submissions", submissionDoc.id);
  await setDoc(
    submissionRef,
    {
      status: "approved",
      approvedAt: serverTimestamp(),
      approvedBy: adminUser.uid,
      voteSummary: summary || null
    },
    { merge: true }
  );
}
