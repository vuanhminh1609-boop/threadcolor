import { onRequest } from "firebase-functions/v2/https";
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
