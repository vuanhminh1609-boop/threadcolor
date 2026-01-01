import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "DOC", "audit");
const JSON_PATH = path.join(OUTPUT_DIR, "quarantine-candidates.json");
const MD_PATH = path.join(OUTPUT_DIR, "quarantine-candidates.md");

const IGNORE_DIRS = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".cache",
  ".next",
  ".vercel",
  "tmp",
  "artifacts",
  "reports",
  "_graveyard"
]);

const DENYLIST = new Set([
  "index.html",
  "account.html",
  "auth.js",
  "script.js",
  "threads.json",
  "workers/thread_search.worker.js",
  "worlds/threadcolor.html",
  "worlds/threadvault.html",
  "worlds/palette.html"
]);

const CANDIDATE_EXT = new Set([".png", ".jpg", ".jpeg", ".svg", ".webp", ".ico", ".woff", ".woff2", ".ttf"]);
const MANUAL_EXT = new Set([".js", ".mjs", ".css", ".html", ".json"]);
const TEXT_EXT = new Set([".html", ".js", ".mjs", ".css", ".md"]);

const toPosix = (p) => p.split(path.sep).join("/");

const readDirSorted = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.sort((a, b) => a.name.localeCompare(b.name, "vi", { sensitivity: "base" }));
};

const walk = (dir, rel = "") => {
  const items = [];
  for (const entry of readDirSorted(dir)) {
    const relPath = path.join(rel, entry.name);
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      items.push(...walk(path.join(dir, entry.name), relPath));
      continue;
    }
    if (entry.isFile()) items.push(relPath);
  }
  return items;
};

const isCandidate = (relPath) => {
  if (DENYLIST.has(toPosix(relPath))) return false;
  const ext = path.extname(relPath).toLowerCase();
  return CANDIDATE_EXT.has(ext);
};

const isTextFile = (relPath) => TEXT_EXT.has(path.extname(relPath).toLowerCase());
const isManualCandidate = (relPath) => MANUAL_EXT.has(path.extname(relPath).toLowerCase());

const readTextFiles = (files) =>
  files
    .filter(isTextFile)
    .map((file) => ({
      path: toPosix(file),
      content: fs.readFileSync(path.join(ROOT, file), "utf8")
    }));

const isReferenced = (candidate, sources) => {
  const posix = toPosix(candidate);
  const base = path.basename(candidate);
  return sources.some(({ content }) => content.includes(posix) || content.includes(base));
};

const main = () => {
  const allFiles = walk(ROOT);
  const sources = readTextFiles(allFiles);
  const candidates = [];
  const manualCandidates = [];

  for (const file of allFiles.filter(isCandidate)) {
    if (isReferenced(file, sources)) continue;
    candidates.push({
      path: toPosix(file),
      reason: "Kh\u00f4ng t\u00ecm th\u1ea5y tham chi\u1ebfu trong *.html/*.js/*.mjs/*.css/*.md"
    });
  }

  for (const file of allFiles.filter(isManualCandidate)) {
    if (isReferenced(file, sources)) continue;
    manualCandidates.push({
      path: toPosix(file),
      reason: "Ch\u1ec9 g\u1ee3i \u00fd duy\u1ec7t tay (kh\u00f4ng t\u1ef1 \u0111\u1ed9ng)"
    });
  }

  candidates.sort((a, b) => a.path.localeCompare(b.path, "vi", { sensitivity: "base" }));
  manualCandidates.sort((a, b) => a.path.localeCompare(b.path, "vi", { sensitivity: "base" }));

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const json = {
    generated_by: "tools/quarantine_candidates.mjs",
    total_candidates: candidates.length,
    candidates,
    manual_candidates: manualCandidates
  };
  fs.writeFileSync(JSON_PATH, JSON.stringify(json, null, 2), "utf8");

  const mdLines = [
    "# \u1ee8ng vi\u00ean c\u00e1ch ly (Quarantine)",
    "",
    `T\u1ed5ng s\u1ed1 \u1ee9ng vi\u00ean: ${candidates.length}`,
    "",
    "## Danh s\u00e1ch \u1ee9ng vi\u00ean",
    ...(candidates.length ? candidates.map((item) => `- ${item.path}`) : ["- (kh\u00f4ng c\u00f3)"]),
    "",
    "## C\u1ea7n duy\u1ec7t tay",
    ...(manualCandidates.length ? manualCandidates.map((item) => `- ${item.path}`) : ["- (kh\u00f4ng c\u00f3)"])
  ];
  fs.writeFileSync(MD_PATH, mdLines.join("\n"), "utf8");

  console.log(`[quarantine] candidates=${candidates.length}`);
};

main();
