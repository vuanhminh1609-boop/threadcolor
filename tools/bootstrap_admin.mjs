#!/usr/bin/env node
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import fs from "fs";

const ADMIN_UID = "Enx4e7xn8Rfv5uY3i4qeMDkoGPh2";

function loadCredential() {
  const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (keyPath && fs.existsSync(keyPath)) {
    const keyJson = JSON.parse(fs.readFileSync(keyPath, "utf8"));
    return cert(keyJson);
  }
  // Fallback to ADC (gcloud auth application-default login)
  return applicationDefault();
}

async function main() {
  const cred = loadCredential();
  const app = initializeApp({ credential: cred });
  const db = getFirestore(app);

  const docRef = db.collection("admins").doc(ADMIN_UID);
  await docRef.set(
    {
      uid: ADMIN_UID,
      role: "admin",
      note: "bootstrap",
      createdAt: FieldValue.serverTimestamp()
    },
    { merge: true }
  );
  console.log(`Admin doc written at admins/${ADMIN_UID}`);
}

main().catch(err => {
  console.error("Bootstrap admin failed:", err);
  process.exit(1);
});
