import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUTPUT_MD = "DOC/REPO_SNAPSHOT_FULL.md";
const OUTPUT_INDEX = "DOC/REPO_SNAPSHOT_FULL_INDEX.json";
const MAX_BYTES = 300 * 1024;

const IGNORE_DIRS = new Set([
  ".git",
  "node_modules",
  "functions/node_modules",
  "functions/lib",
  ".firebase",
  "reports",
  "artifacts",
  "_graveyard"
]);

const toPosix = (p) => p.split(path.sep).join("/");
const isIgnoredDir = (name) => IGNORE_DIRS.has(name);

const stats = {
  scannedFiles: 0,
  includedFiles: 0,
  skippedFiles: 0,
  skippedReasons: {}
};

const ignored = {
  dirs: []
};

const included = [];
const skipped = [];
const sections = [];

const bumpReason = (reason) => {
  stats.skippedReasons[reason] = (stats.skippedReasons[reason] || 0) + 1;
};

const readDirSorted = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.sort((a, b) => a.name.localeCompare(b.name, "vi", { sensitivity: "base" }));
};

const isBinaryBuffer = (buf) => {
  if (buf.length === 0) return false;
  let suspicious = 0;
  for (const byte of buf) {
    if (byte === 0) return true;
    if (byte < 7 || (byte > 13 && byte < 32) || byte === 127) {
      suspicious += 1;
    }
  }
  return suspicious / buf.length > 0.3;
};

const shouldSkipOutput = (relPosix) => {
  return relPosix === OUTPUT_MD || relPosix === OUTPUT_INDEX;
};

const addSkipped = (relPosix, sizeBytes, reason) => {
  stats.skippedFiles += 1;
  bumpReason(reason);
  skipped.push({ path: relPosix, sizeBytes, reason });
};

const addIncluded = (relPosix, sizeBytes, content) => {
  stats.includedFiles += 1;
  included.push({ path: relPosix, sizeBytes });
  sections.push(`## ${relPosix}`);
  sections.push("````text");
  sections.push(content);
  sections.push("````");
  sections.push("");
};

const walk = (dir, rel = "") => {
  const entries = readDirSorted(dir);
  for (const entry of entries) {
    const entryRel = path.join(rel, entry.name);
    const entryRelPosix = toPosix(entryRel);
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (isIgnoredDir(entry.name)) {
        ignored.dirs.push(entryRelPosix);
        continue;
      }
      walk(fullPath, entryRel);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    stats.scannedFiles += 1;
    if (shouldSkipOutput(entryRelPosix)) {
      addSkipped(entryRelPosix, 0, "file_output");
      continue;
    }

    let sizeBytes = 0;
    try {
      sizeBytes = fs.statSync(fullPath).size;
    } catch {
      addSkipped(entryRelPosix, 0, "read_error");
      continue;
    }

    if (sizeBytes > MAX_BYTES) {
      addSkipped(entryRelPosix, sizeBytes, "vuot_300kb");
      continue;
    }

    let buffer;
    try {
      buffer = fs.readFileSync(fullPath);
    } catch {
      addSkipped(entryRelPosix, sizeBytes, "read_error");
      continue;
    }

    if (isBinaryBuffer(buffer)) {
      addSkipped(entryRelPosix, sizeBytes, "nhi_phan");
      continue;
    }

    const content = buffer.toString("utf8").replace(/\r\n/g, "\n");
    addIncluded(entryRelPosix, sizeBytes, content);
  }
};

const writeOutputs = () => {
  const docDir = path.join(ROOT, "DOC");
  if (!fs.existsSync(docDir)) {
    fs.mkdirSync(docDir, { recursive: true });
  }

  const header = [
    "# REPO SNAPSHOT FULL",
    "",
    "- Tai lieu tu dong: tools/repo_textdump.mjs",
    `- Thoi diem: ${new Date().toISOString()}`,
    ""
  ];

  const content = header.concat(sections).join("\n");
  fs.writeFileSync(path.join(ROOT, OUTPUT_MD), content, "utf8");

  const indexData = {
    generatedBy: "tools/repo_textdump.mjs",
    root: ".",
    generatedAt: new Date().toISOString(),
    rules: {
      maxBytes: MAX_BYTES,
      ignoredDirs: Array.from(IGNORE_DIRS),
      skippedReasons: {
        file_output: "Bo qua file output cua dump",
        vuot_300kb: "Vuot 300KB",
        nhi_phan: "File nhi phan",
        read_error: "Loi doc file"
      }
    },
    stats,
    ignored,
    included,
    skipped
  };

  fs.writeFileSync(path.join(ROOT, OUTPUT_INDEX), JSON.stringify(indexData, null, 2), "utf8");
};

const main = () => {
  walk(ROOT);
  writeOutputs();
  console.log(`[full-dump] included=${stats.includedFiles} skipped=${stats.skippedFiles}`);
};

main();
