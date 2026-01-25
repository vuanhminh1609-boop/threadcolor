import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DOC_PATH = path.join(ROOT, "DOC", "REPO_SNAPSHOT.md");
const INDEX_JSON_PATH = path.join(ROOT, "DOC", "REPO_SNAPSHOT_INDEX.json");

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

const PARTIAL_DIRS = new Set([
  "DOC/health/daily"
]);

const toPosix = (p) => p.split(path.sep).join("/");
const isPartialDir = (rel) => PARTIAL_DIRS.has(toPosix(rel));

const stats = {
  totalFiles: 0,
  totalDirs: 0,
  extCounts: new Map()
};

const ignored = {
  dirs: [],
  partialDirs: []
};

const nodes = [];

const addExt = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  const key = ext ? ext : "(noext)";
  stats.extCounts.set(key, (stats.extCounts.get(key) || 0) + 1);
};

const readDirSorted = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.sort((a, b) => a.name.localeCompare(b.name, "vi", { sensitivity: "base" }));
};

const buildTree = (dir, rel = "", indent = "") => {
  const lines = [];
  const entries = readDirSorted(dir);

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) {
        ignored.dirs.push(toPosix(path.join(rel, entry.name)));
        continue;
      }
      const relDir = path.join(rel, entry.name);
      stats.totalDirs += 1;
      nodes.push({ path: toPosix(relDir), type: "dir" });
      if (isPartialDir(relDir)) {
        ignored.partialDirs.push(toPosix(relDir));
        lines.push(`${indent}- ${entry.name} (bo qua file con)`);
        continue;
      }
      lines.push(`${indent}- ${entry.name}`);
      lines.push(...buildTree(path.join(dir, entry.name), relDir, `${indent}  `));
      continue;
    }

    if (entry.isFile()) {
      const relFile = path.join(rel, entry.name);
      stats.totalFiles += 1;
      addExt(entry.name);
      nodes.push({ path: toPosix(relFile), type: "file" });
      lines.push(`${indent}- ${entry.name}`);
    }
  }

  return lines;
};

const renderStats = () => {
  const extLines = Array.from(stats.extCounts.entries())
    .sort((a, b) => a[0].localeCompare(b[0], "vi", { sensitivity: "base" }))
    .map(([ext, count]) => `${ext}: ${count}`);

  const ignoredLines = [
    ...ignored.dirs.map((p) => `- ${p}/ (bo qua toan bo)`),
    ...ignored.partialDirs.map((p) => `- ${p}/ (bo qua file con)`)
  ];

  const blocks = [
    `Tong thu muc: ${stats.totalDirs}`,
    `Tong file: ${stats.totalFiles}`,
    "",
    "Thong ke phan mo rong:",
    ...extLines,
    ""
  ];

  if (ignoredLines.length) {
    blocks.push("Bo qua:");
    blocks.push(...ignoredLines);
  } else {
    blocks.push("Bo qua: (khong co)");
  }

  return blocks.join("\n");
};

const renderDoc = (treeText, statsText) => {
  const header = [
    "# REPO SNAPSHOT",
    "",
    "- Tai lieu tu dong: tools/repo_snapshot.mjs",
    "- Cac khoi duoi day duoc cap nhat tu dong, on dinh va khong tao diff vo nghia.",
    ""
  ].join("\n");

  const treeBlock = [
    "## Cay thu muc",
    "<!-- SNAPSHOT_TREE_START -->",
    "```text",
    treeText,
    "```",
    "<!-- SNAPSHOT_TREE_END -->",
    ""
  ].join("\n");

  const statsBlock = [
    "## Thong ke",
    "<!-- SNAPSHOT_STATS_START -->",
    "```text",
    statsText,
    "```",
    "<!-- SNAPSHOT_STATS_END -->",
    ""
  ].join("\n");

  return `${header}${treeBlock}${statsBlock}`;
};

const updateSnapshotFile = (treeText, statsText) => {
  if (!fs.existsSync(path.dirname(DOC_PATH))) {
    fs.mkdirSync(path.dirname(DOC_PATH), { recursive: true });
  }
  const content = renderDoc(treeText, statsText);
  fs.writeFileSync(DOC_PATH, content, "utf8");
};

const writeIndexJson = () => {
  const data = {
    generatedBy: "tools/repo_snapshot.mjs",
    root: ".",
    stats: {
      totalFiles: stats.totalFiles,
      totalDirs: stats.totalDirs,
      extCounts: Object.fromEntries(stats.extCounts)
    },
    ignored,
    nodes
  };
  fs.writeFileSync(INDEX_JSON_PATH, JSON.stringify(data, null, 2), "utf8");
};

const main = () => {
  const treeLines = buildTree(ROOT);
  const treeText = treeLines.join("\n");
  const statsText = renderStats();
  updateSnapshotFile(treeText, statsText);
  writeIndexJson();
  console.log(`[snapshot] files=${stats.totalFiles} dirs=${stats.totalDirs}`);
};

main();
