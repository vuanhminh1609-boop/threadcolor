#!/usr/bin/env node
import fs from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const rootDir = process.cwd();
const manifestPath = path.resolve(rootDir, "data/contract.manifest.json");
const updateChecksum = process.argv.includes("--cap-nhat-checksum");

const readJson = async (filePath) => {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
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

const migrationPathFor = (dataset, fromVer, toVer) => {
  return path.resolve(rootDir, "data/migrations", dataset, `${fromVer}__to__${toVer}.mjs`);
};

const main = async () => {
  if (!exists(manifestPath)) {
    console.error(`[validate_contract] Khong tim thay manifest: ${manifestPath}`);
    process.exit(1);
  }

  const manifest = await readJson(manifestPath);
  const datasets = manifest?.datasets || {};
  const ajv = new Ajv({ allErrors: true, strict: false, allowUnionTypes: true });
  addFormats(ajv);

  let hasError = false;

  for (const [key, info] of Object.entries(datasets)) {
    const dataPath = path.resolve(rootDir, info.duongDan || "");
    const schemaPath = path.resolve(rootDir, info.schema || "");

    const schemaMajor = getMajor(info.phienBanSchema);
    const dataMajor = getMajor(info.phienBanDuLieu);
    if (schemaMajor === null || dataMajor === null) {
      console.error(`[validate_contract] ${key}: phienBanSchema/phienBanDuLieu khong dung dinh dang SemVer`);
      hasError = true;
    } else if (schemaMajor > dataMajor) {
      const migPath = migrationPathFor(key, info.phienBanDuLieu, info.phienBanSchema);
      if (!exists(migPath)) {
        console.error(`[validate_contract] ${key}: thieu migration MAJOR ${info.phienBanDuLieu} -> ${info.phienBanSchema}`);
        console.error(`  can co: ${path.relative(rootDir, migPath)}`);
        hasError = true;
      }
    }

    if (!exists(dataPath)) {
      console.warn(`[validate_contract] Bo qua ${key}: khong tim thay duong dan ${info.duongDan}`);
      continue;
    }
    if (!exists(schemaPath)) {
      console.error(`[validate_contract] ${key}: khong tim thay schema ${info.schema}`);
      hasError = true;
      continue;
    }

    let schema;
    let payload;
    try {
      schema = await readJson(schemaPath);
      payload = await readJson(dataPath);
    } catch (err) {
      console.error(`[validate_contract] ${key}: loi doc JSON`, err);
      hasError = true;
      continue;
    }

    const validate = ajv.compile(schema);
    const valid = validate(payload);
    if (!valid) {
      console.error(`[validate_contract] ${key}: schema FAIL`);
      console.error(validate.errors);
      hasError = true;
    } else {
      console.log(`[validate_contract] ${key}: schema PASS`);
    }

    const checksum = await sha256File(dataPath);
    if (updateChecksum) {
      info.checksumSha256 = checksum;
      console.warn(`[validate_contract] ${key}: cap nhat checksum -> ${checksum}`);
    } else if (!info.checksumSha256) {
      console.error(`[validate_contract] ${key}: checksum trong manifest dang rong`);
      hasError = true;
    } else if (info.checksumSha256 !== checksum) {
      console.error(`[validate_contract] ${key}: checksum KHONG khop`);
      console.error(`  manifest: ${info.checksumSha256}`);
      console.error(`  actual  : ${checksum}`);
      hasError = true;
    } else {
      console.log(`[validate_contract] ${key}: checksum PASS`);
    }
  }

  if (updateChecksum) {
    manifest.capNhatLuc = new Date().toISOString();
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  }

  if (hasError) {
    process.exit(1);
  }
};

main().catch((err) => {
  console.error("[validate_contract] failed", err);
  process.exit(1);
});
