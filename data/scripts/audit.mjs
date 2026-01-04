#!/usr/bin/env node
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const auditDir = path.resolve(rootDir, "data/audit");
const auditPath = path.resolve(auditDir, "data-audit.jsonl");

const main = async () => {
  await mkdir(auditDir, { recursive: true });
  const entry = {
    ts: new Date().toISOString(),
    event: process.argv[2] || "data-audit",
    note: process.argv.slice(3).join(" ") || ""
  };
  await appendFile(auditPath, JSON.stringify(entry) + "\n", "utf8");
  console.log(`[audit] ghi ${auditPath}`);
};

main().catch((err) => {
  console.error("[audit] failed", err);
  process.exit(1);
});
