#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { normalizeAndDedupeThreads } from "../data_normalize.js";

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag, fallback) => {
    const i = args.indexOf(flag);
    return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
  };
  return {
    inDir: get("--in", "data/raw_tch"),
    outFile: get("--out", "data/threads.generated.json")
  };
}

function hexFromRgb(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map(v => {
        const n = Number(v);
        return Number.isInteger(n) && n >= 0 && n <= 255
          ? n.toString(16).padStart(2, "0")
          : null;
      })
      .join("")
  ).toUpperCase();
}

function parseLine(line, file, lineNumber) {
  const parts = line.split(",").map(p => p.trim());
  if (parts.length === 6 || parts.length === 7) {
    const [code, brand, name, maybeThickness, rRaw, gRaw, bRaw] =
      parts.length === 7
        ? parts
        : [parts[0], parts[1], parts[2], null, parts[3], parts[4], parts[5]];
    const r = Number(rRaw);
    const g = Number(gRaw);
    const b = Number(bRaw);
    if (![r, g, b].every(v => Number.isInteger(v) && v >= 0 && v <= 255)) {
      console.warn(`Skip invalid RGB at ${file}:${lineNumber} -> ${line}`);
      return null;
    }
    const hex = hexFromRgb(r, g, b);
    if (!hex || hex.includes("null")) {
      console.warn(`Skip invalid hex at ${file}:${lineNumber} -> ${line}`);
      return null;
    }
    return {
      brand,
      code,
      name,
      hex,
      rgb: { r, g, b },
      thickness: maybeThickness || undefined,
      source: { type: "TCH", file: path.basename(file), line: lineNumber },
      confidence: 0.9
    };
  }
  console.warn(`Skip invalid column count at ${file}:${lineNumber} -> ${line}`);
  return null;
}

async function readTchFile(filePath, results) {
  const data = await fs.readFile(filePath, "utf8");
  const lines = data.split(/\r?\n/);
  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();
    if (!line) return;
    const parsed = parseLine(line, path.basename(filePath), idx + 1);
    if (!parsed) return;
    results.push(parsed);
  });
}

async function main() {
  const { inDir, outFile } = parseArgs();
  await fs.mkdir(inDir, { recursive: true });
  const outDir = path.dirname(outFile);
  await fs.mkdir(outDir, { recursive: true });

  const entries = await fs.readdir(inDir, { withFileTypes: true });
  const tchFiles = entries
    .filter(e => e.isFile() && e.name.toLowerCase().endsWith(".tch"))
    .map(e => path.join(inDir, e.name));

  if (!tchFiles.length) {
    console.warn(`No .tch files found in ${inDir}`);
    await fs.writeFile(outFile, "[]\n", "utf8");
    return;
  }

  const results = [];

  for (const file of tchFiles) {
    await readTchFile(file, results);
  }

  const normalized = normalizeAndDedupeThreads(results, {
    addTimestamps: true,
    timestamp: new Date().toISOString()
  });

  normalized.sort((a, b) => {
    const brandCmp = (a.brand || "").localeCompare(b.brand || "");
    if (brandCmp !== 0) return brandCmp;
    return (a.code || "").localeCompare(b.code || "");
  });

  await fs.writeFile(outFile, JSON.stringify(normalized, null, 2) + "\n", "utf8");
  console.log(`Written ${normalized.length} records to ${outFile}`);
}

main().catch(err => {
  console.error("Import failed", err);
  process.exit(1);
});
