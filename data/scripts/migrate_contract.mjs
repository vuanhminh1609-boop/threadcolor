#!/usr/bin/env node
import fs from "node:fs";
import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import crypto from "node:crypto";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const rootDir = process.cwd();
const manifestPath = path.resolve(rootDir, "data/contract.manifest.json");

const args = process.argv.slice(2);
const getArg = (flag) => {
  const idx = args.indexOf(flag);
  return idx >= 0 ? args[idx + 1] : null;
};
const hasFlag = (flag) => args.includes(flag);

const datasetArg = getArg("--dataset");
const fromArg = getArg("--from");
const toArg = getArg("--to");
const dryRun = hasFlag("--dry-run");

const readJson = async (filePath) => {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
};

const writeJson = async (filePath, payload) => {
  await writeFile(filePath, JSON.stringify(payload, null, 2) + "\n", "utf8");
};

const sha256File = async (filePath) => {
  const buf = await readFile(filePath);
  return crypto.createHash("sha256").update(buf).digest("hex");
};

const exists = (filePath) => fs.existsSync(filePath);

const getMajor = (version) => {
  const match = String(version || "").match(/^(\d+)\.(\d+)\.(\d+)/);
  return match ? Number(match[1]) : null;
};

const schemaPathFor = (dataset, version, fallbackPath) => {
  const candidate = path.resolve(rootDir, "data/schemas", dataset, `${version}.json`);
  return exists(candidate) ? candidate : path.resolve(rootDir, fallbackPath || "");
};

const migrationPathFor = (dataset, fromVer, toVer) => {
  return path.resolve(rootDir, "data/migrations", dataset, `${fromVer}__to__${toVer}.mjs`);
};

const runAudit = async (dataset, fromVer, toVer) => {
  const auditScript = path.resolve(rootDir, "data/scripts/audit.mjs");
  if (!exists(auditScript)) return;
  await execFileAsync("node", [auditScript, "migrate", `${dataset} ${fromVer} -> ${toVer}`]);
};

const main = async () => {
  if (!exists(manifestPath)) {
    console.error(`[migrate_contract] Khong tim thay manifest: ${manifestPath}`);
    process.exit(1);
  }

  const manifest = await readJson(manifestPath);
  const datasets = manifest?.datasets || {};
  const ajv = new Ajv({ allErrors: true, strict: false, allowUnionTypes: true });
  addFormats(ajv);

  const datasetKeys = datasetArg
    ? [datasetArg]
    : Object.keys(datasets).filter((key) => {
        const info = datasets[key];
        const schemaMajor = getMajor(info.phienBanSchema);
        const dataMajor = getMajor(info.phienBanDuLieu);
        return schemaMajor !== null && dataMajor !== null && schemaMajor > dataMajor;
      });

  if (!datasetKeys.length) {
    console.log("[migrate_contract] Khong co dataset can migrate.");
    return;
  }

  for (const key of datasetKeys) {
    const info = datasets[key];
    if (!info) {
      console.error(`[migrate_contract] Khong tim thay dataset: ${key}`);
      process.exit(1);
    }

    const fromVer = fromArg || info.phienBanDuLieu;
    const toVer = toArg || info.phienBanSchema;
    if (!fromVer || !toVer) {
      console.error(`[migrate_contract] ${key}: can co --from/--to hoac phienBanDuLieu/phienBanSchema`);
      process.exit(1);
    }

    const dataPath = path.resolve(rootDir, info.duongDan || "");
    if (!exists(dataPath)) {
      console.error(`[migrate_contract] ${key}: khong tim thay duong dan ${info.duongDan}`);
      process.exit(1);
    }

    const migPath = migrationPathFor(key, fromVer, toVer);
    if (!exists(migPath)) {
      console.error(`[migrate_contract] ${key}: thieu migration ${fromVer} -> ${toVer}`);
      console.error(`  can co: ${path.relative(rootDir, migPath)}`);
      process.exit(1);
    }

    const mod = await import(pathToFileURL(migPath).href);
    const migrate = mod?.migrate;
    const moTa = mod?.moTa || "(khong co mo ta)";
    if (typeof migrate !== "function") {
      console.error(`[migrate_contract] ${key}: migration khong export migrate(data)`);
      process.exit(1);
    }

    const raw = await readJson(dataPath);
    const next = await migrate(raw);
    if (typeof next === "undefined") {
      console.error(`[migrate_contract] ${key}: migrate tra ve undefined`);
      process.exit(1);
    }

    const schemaPath = schemaPathFor(key, toVer, info.schema);
    if (!exists(schemaPath)) {
      console.error(`[migrate_contract] ${key}: khong tim thay schema ${schemaPath}`);
      process.exit(1);
    }

    const schema = await readJson(schemaPath);
    const validate = ajv.compile(schema);
    const valid = validate(next);
    if (!valid) {
      console.error(`[migrate_contract] ${key}: schema FAIL`);
      console.error(validate.errors);
      process.exit(1);
    }

    console.log(`[migrate_contract] ${key}: ${fromVer} -> ${toVer} OK (${moTa})`);

    if (dryRun) {
      continue;
    }

    const backupPath = `${dataPath}.bak`;
    if (!exists(backupPath)) {
      await copyFile(dataPath, backupPath);
    }

    await writeJson(dataPath, next);
    const checksum = await sha256File(dataPath);
    info.phienBanDuLieu = toVer;
    if (info.phienBanSchema !== toVer) {
      info.phienBanSchema = toVer;
      if (exists(schemaPath)) {
        info.schema = path.relative(rootDir, schemaPath).replace(/\\/g, "/");
      }
    }
    info.checksumSha256 = checksum;
    manifest.capNhatLuc = new Date().toISOString();
    await writeJson(manifestPath, manifest);
    await runAudit(key, fromVer, toVer);
  }
};

main().catch((err) => {
  console.error("[migrate_contract] failed", err);
  process.exit(1);
});
