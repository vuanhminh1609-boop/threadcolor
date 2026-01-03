import { onRequest } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import express from "express";
import { randomUUID } from "crypto";

admin.initializeApp();

const db = admin.firestore();
const app = express();

app.use(express.json({ limit: "1mb" }));
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

const getRequestId = (req: express.Request) =>
  (req.header("x-request-id") || req.header("x-correlation-id") || null) ?? randomUUID();

const writeAuditLog = async (payload: Record<string, unknown>) => {
  try {
    await db.collection("adminAuditLogs").add({
      ...payload,
      ts: admin.firestore.FieldValue.serverTimestamp()
    });
  } catch (_err) {
    // Không chặn phản hồi nếu log thất bại.
  }
};

const toIsoOrNull = (value?: string) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const redact = (input: unknown): unknown => {
  if (!input || typeof input !== "object") return input;
  if (Array.isArray(input)) return input.map(redact);
  const blocked = ["token", "email", "password", "secret"];
  const result: Record<string, unknown> = {};
  Object.entries(input as Record<string, unknown>).forEach(([key, value]) => {
    const lower = key.toLowerCase();
    if (blocked.some((k) => lower.includes(k))) return;
    result[key] = redact(value);
  });
  return result;
};

const pickPackSnapshot = (data?: admin.firestore.DocumentData | null) => {
  if (!data) return null;
  return {
    title: data.title || "",
    description: data.description || "",
    status: data.status || "",
    dueAt: data.dueAt || null,
    updatedAt: data.updatedAt || null
  };
};

const getIdempotencyDoc = (uid: string, key: string, pathKey: string) =>
  db.doc(`adminIdempotency/${uid}__${key}__${pathKey}`);

const requireAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.header("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const requestId = getRequestId(req);
  const baseAudit = {
    requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.header("user-agent") || ""
  };

  if (!token) {
    await writeAuditLog({ ...baseAudit, status: 401, uid: null, result: "MISSING_TOKEN" });
    return res.status(401).json({ ok: false, message: "Thiếu ID token. Vui lòng đăng nhập." });
  }

  let decoded: admin.auth.DecodedIdToken;
  try {
    decoded = await admin.auth().verifyIdToken(token);
  } catch (_err) {
    await writeAuditLog({ ...baseAudit, status: 401, uid: null, result: "INVALID_TOKEN" });
    return res.status(401).json({ ok: false, message: "ID token không hợp lệ." });
  }

  const uid = decoded.uid;
  try {
    const adminDoc = await db.doc(`admins/${uid}`).get();
    if (!adminDoc.exists) {
      await writeAuditLog({ ...baseAudit, status: 403, uid, result: "NOT_ADMIN" });
      return res.status(403).json({ ok: false, message: "Bạn không có quyền truy cập admin." });
    }
  } catch (_err) {
    await writeAuditLog({ ...baseAudit, status: 403, uid, result: "ADMIN_CHECK_FAILED" });
    return res.status(403).json({ ok: false, message: "Không thể xác minh quyền admin." });
  }

  res.locals.uid = uid;
  res.locals.requestId = requestId;
  return next();
};

app.get("/admin/ping", requireAdmin, async (req, res) => {
  const uid = res.locals.uid as string;
  await writeAuditLog({
    requestId: res.locals.requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.header("user-agent") || "",
    status: 200,
    uid,
    result: "OK"
  });
  return res.status(200).json({ ok: true, uid, role: "admin", message: "Admin API hoạt động" });
});

app.get("/admin/decision-packs", requireAdmin, async (req, res) => {
  const uid = res.locals.uid as string;
  const limit = Math.min(Number(req.query.limit) || 50, 200);
  const status = typeof req.query.status === "string" ? req.query.status : null;
  let query: FirebaseFirestore.Query = db.collection("decisionPacks").orderBy("createdAt", "desc").limit(limit);
  if (status) {
    query = query.where("status", "==", status);
  }

  const snap = await query.get();
  const packs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  await writeAuditLog({
    requestId: res.locals.requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.header("user-agent") || "",
    status: 200,
    uid,
    result: "LIST_DECISION_PACKS"
  });
  return res.status(200).json({ ok: true, items: packs });
});

app.post("/admin/decision-packs", requireAdmin, async (req, res) => {
  const uid = res.locals.uid as string;
  const { title, description, dueAt } = req.body || {};
  if (!title || typeof title !== "string") {
    return res.status(400).json({ ok: false, message: "Thiếu tiêu đề gói quyết định." });
  }
  const cleanTitle = title.trim();
  if (!cleanTitle) {
    return res.status(400).json({ ok: false, message: "Tiêu đề không hợp lệ." });
  }

  const idempotencyKey = String(req.header("Idempotency-Key") || "").trim();
  if (!idempotencyKey) {
    return res.status(400).json({ ok: false, message: "Thiếu Idempotency-Key để chống tạo trùng." });
  }
  const pathKey = "decision-packs-create";
  const idemRef = getIdempotencyDoc(uid, idempotencyKey, pathKey);
  const idemSnap = await idemRef.get();
  if (idemSnap.exists) {
    const data = idemSnap.data() || {};
    const packId = data.packId || "";
    if (packId) {
      const packSnap = await db.doc(`decisionPacks/${packId}`).get();
      await writeAuditLog({
        requestId: res.locals.requestId,
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.header("user-agent") || "",
        status: 200,
        uid,
        result: "IDEMPOTENT_HIT",
        after: redact({ packId })
      });
      return res.status(200).json({ ok: true, item: { id: packSnap.id, ...packSnap.data() } });
    }
  }

  const dueIso = toIsoOrNull(dueAt);
  const now = admin.firestore.FieldValue.serverTimestamp();
  const docRef = await db.collection("decisionPacks").add({
    title: cleanTitle,
    description: typeof description === "string" ? description.trim() : "",
    status: "pending",
    dueAt: dueIso,
    createdBy: uid,
    createdAt: now,
    updatedAt: now
  });

  await idemRef.set({
    uid,
    packId: docRef.id,
    createdAt: now
  });

  const packSnap = await docRef.get();
  await writeAuditLog({
    requestId: res.locals.requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.header("user-agent") || "",
    status: 201,
    uid,
    result: "CREATE_DECISION_PACK",
    after: redact(pickPackSnapshot(packSnap.data()))
  });
  return res.status(201).json({ ok: true, item: { id: docRef.id, ...packSnap.data() } });
});

app.patch("/admin/decision-packs/:id", requireAdmin, async (req, res) => {
  const uid = res.locals.uid as string;
  const packId = req.params.id;
  const packRef = db.doc(`decisionPacks/${packId}`);
  const packSnap = await packRef.get();
  if (!packSnap.exists) {
    return res.status(404).json({ ok: false, message: "Không tìm thấy gói quyết định." });
  }

  const { title, description, dueAt, status } = req.body || {};
  const nextStatus = typeof status === "string" ? status : null;
  const allowedStatus = ["pending", "approved", "rejected", "expired"];
  if (nextStatus && !allowedStatus.includes(nextStatus)) {
    return res.status(400).json({ ok: false, message: "Trạng thái không hợp lệ." });
  }
  const dueIso = toIsoOrNull(dueAt);
  const updatePayload: Record<string, unknown> = {
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };
  if (typeof title === "string") updatePayload.title = title.trim();
  if (typeof description === "string") updatePayload.description = description.trim();
  if (dueAt !== undefined) updatePayload.dueAt = dueIso;
  if (nextStatus) {
    updatePayload.status = nextStatus;
    updatePayload.decidedBy = nextStatus === "approved" || nextStatus === "rejected" ? uid : null;
    updatePayload.decidedAt = nextStatus === "approved" || nextStatus === "rejected"
      ? admin.firestore.FieldValue.serverTimestamp()
      : null;
  }

  const before = pickPackSnapshot(packSnap.data());
  await packRef.set(updatePayload, { merge: true });
  const afterSnap = await packRef.get();
  await writeAuditLog({
    requestId: res.locals.requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.header("user-agent") || "",
    status: 200,
    uid,
    result: "UPDATE_DECISION_PACK",
    before: redact(before),
    after: redact(pickPackSnapshot(afterSnap.data()))
  });
  return res.status(200).json({ ok: true, item: { id: afterSnap.id, ...afterSnap.data() } });
});

app.get("/admin/audit-logs", requireAdmin, async (req, res) => {
  const uid = res.locals.uid as string;
  const limit = Math.min(Number(req.query.limit) || 50, 200);
  const snap = await db.collection("adminAuditLogs").orderBy("ts", "desc").limit(limit).get();
  const logs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  await writeAuditLog({
    requestId: res.locals.requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.header("user-agent") || "",
    status: 200,
    uid,
    result: "LIST_AUDIT_LOGS"
  });
  return res.status(200).json({ ok: true, items: logs });
});

app.all("/admin/*", requireAdmin, async (req, res) => {
  await writeAuditLog({
    requestId: res.locals.requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.header("user-agent") || "",
    status: 404,
    uid: res.locals.uid || null,
    result: "NOT_FOUND"
  });
  return res.status(404).json({ ok: false, message: "Không tìm thấy API admin." });
});

export const adminApi = onRequest(app);

export const telemetryIngest = onRequest({ cors: true }, async (req, res) => {
  res.set("Cache-Control", "no-store");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Chỉ hỗ trợ POST." });
  }

  const body = req.body || {};
  const counts = body.counts || {};
  const allowed = ["search_start", "search_result", "pin", "copy", "save"];
  const increments: Record<string, admin.firestore.FieldValue> = {};
  allowed.forEach((key) => {
    const value = Number(counts[key] || 0);
    if (value > 0) increments[key] = admin.firestore.FieldValue.increment(value);
  });

  if (!Object.keys(increments).length) {
    return res.status(200).json({ ok: true, message: "Không có dữ liệu cập nhật." });
  }

  const dateKey = formatDateBangkok(new Date());
  const ref = db.doc(`metrics_daily/${dateKey}`);
  await ref.set({
    date: dateKey,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    ...increments
  }, { merge: true });

  return res.status(200).json({ ok: true });
});

function formatDateBangkok(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return formatter.format(date);
}

export const dailyAdminReport = onSchedule(
  { schedule: "5 0 * * *", timeZone: "Asia/Bangkok" },
  async () => {
    const todayKey = formatDateBangkok(new Date());
  const reportRef = db.doc(`adminReports/daily/${todayKey}`);
  const exists = await reportRef.get();
  if (exists.exists) return;

  const [packsSnap, logsSnap, authErrorSnap] = await Promise.all([
    db.collection("decisionPacks").get(),
    db.collection("adminAuditLogs").get(),
    db.collection("adminAuditLogs").where("status", "in", [401, 403]).get()
  ]);

  const payload = {
    date: todayKey,
    decisionPacksCount: packsSnap.size,
    auditLogsCount: logsSnap.size,
    authDeniedCount: authErrorSnap.size,
    generatedAt: admin.firestore.FieldValue.serverTimestamp(),
    note: "Báo cáo tự động theo ngày (Asia/Bangkok)"
  };

  await reportRef.set(payload, { merge: true });
  await writeAuditLog({
    requestId: "SYSTEM",
    method: "SCHEDULE",
    path: "dailyAdminReport",
    ip: "",
    userAgent: "scheduler",
    status: 200,
    uid: "SYSTEM",
    result: "DAILY_REPORT",
    after: redact(payload)
  });
});
