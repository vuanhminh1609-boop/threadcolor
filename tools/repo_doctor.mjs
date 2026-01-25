import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const REPORT_DIR = path.join(ROOT, "reports");

const SKIP_DIRS = new Set([".git", "node_modules", "dist", "build", "__pycache__", "_graveyard"]);
const TEXT_EXT = new Set([".html", ".css", ".js", ".mjs", ".json", ".md", ".yml", ".yaml", ".txt"]);
const BINARY_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".mp4", ".mov", ".psd",
  ".ttf", ".woff", ".woff2", ".eot", ".zip", ".rar", ".7z", ".pdf", ".ico"
]);
const ASSET_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".mp4", ".mov", ".psd",
  ".ttf", ".woff", ".woff2", ".eot", ".zip", ".rar", ".7z", ".pdf", ".ico"
]);
const BUILTIN_MODULES = new Set([
  "assert", "buffer", "child_process", "crypto", "events", "fs", "http", "https",
  "os", "path", "process", "readline", "stream", "timers", "url", "util", "zlib"
]);

const HTML_TAG_RE = /<(script|link|img|a|source)\b[^>]*?>/gi;
const HTML_ATTR_RE = /(src|href|srcset)=["']([^"']+)["']/gi;
const CSS_URL_RE = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;

const JS_IMPORT_RE = /\bimport\s+(?:[^"']+from\s+)?["']([^"']+)["']/g;
const JS_EXPORT_RE = /\bexport\s+[^"']+from\s+["']([^"']+)["']/g;
const JS_DYNAMIC_IMPORT_RE = /\bimport\(\s*["']([^"']+)["']\s*\)/g;
const JS_REQUIRE_RE = /\brequire\(\s*["']([^"']+)["']\s*\)/g;
const JS_WORKER_RE = /\bnew\s+Worker\(\s*["']([^"']+)["']/gi;
const JS_WORKER_URL_RE = /\bnew\s+Worker\(\s*new\s+URL\(\s*["']([^"']+)["']\s*,\s*import\.meta\.url\s*\)/gi;
const JS_SW_RE = /\bnavigator\.serviceWorker\.register\(\s*["']([^"']+)["']\s*\)/g;
const JS_FETCH_RE = /\bfetch\(\s*["']([^"']+)["']\s*\)/g;
const JS_XHR_RE = /\.open\(\s*["']GET["']\s*,\s*["']([^"']+)["']\s*\)/g;
const JS_IMPORT_SCRIPTS_RE = /\bimportScripts\(\s*["']([^"']+)["']\s*\)/g;
const JS_URL_ASSIGN_RE = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*new\s+URL\(\s*["']([^"']+)["']\s*,\s*import\.meta\.url\s*\)/g;

const RUNTIME_JS = [
  "auth.js",
  "script.js",
  "crowd.js",
  "stock.js",
  "data_normalize.js",
  "library.js",
  "workers/thread_search.worker.js"
];
const GENERATED_OUTPUTS = new Set(["threads.cleaned.json", "threads.conflicts.json"]);

function walk(dir, relBase = "", out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name !== "dist") {
        if (SKIP_DIRS.has(entry.name)) continue;
      } else {
        const relPosix = relBase.split(path.sep).join("/");
        if (!(relPosix === "assets" || relPosix.startsWith("assets/"))) {
          continue;
        }
      }
      walk(path.join(dir, entry.name), path.join(relBase, entry.name), out);
    } else if (entry.isFile()) {
      out.push(path.join(relBase, entry.name));
    }
  }
  return out;
}

function normalizeRef(ref) {
  return ref.split("#", 1)[0].split("?", 1)[0].trim();
}

function isExternalUrl(ref) {
  return /^(https?:)?\/\//i.test(ref) || ref.startsWith("data:") ||
    ref.startsWith("mailto:") || ref.startsWith("tel:") || ref.startsWith("javascript:");
}

function classifySpecifier(ref) {
  if (!ref) return "unknown";
  if (ref.startsWith("node:")) return "builtin";
  if (BUILTIN_MODULES.has(ref)) return "builtin";
  if (ref.startsWith("/admin") || ref.startsWith("/api")) return "external";
  if (ref.startsWith("/") && !path.extname(ref)) return "external";
  if (ref.startsWith("./") || ref.startsWith("../") || ref.startsWith("/")) return "internal";
  return "external";
}

function resolveRef(baseFile, ref, allFiles) {
  const cleaned = normalizeRef(ref);
  if (!cleaned || isExternalUrl(cleaned)) return { resolved: null, cleaned };
  const kind = classifySpecifier(cleaned);
  if (kind !== "internal") return { resolved: null, cleaned };

  let abs = cleaned.startsWith("/")
    ? path.join(ROOT, cleaned)
    : path.join(path.dirname(baseFile), cleaned);
  abs = path.normalize(abs);

  if (allFiles.has(abs)) return { resolved: abs, cleaned: abs };
  if (path.extname(abs)) return { resolved: null, cleaned: abs };

  for (const ext of [".js", ".mjs", ".css", ".json", ".html"]) {
    const guess = abs + ext;
    if (allFiles.has(guess)) return { resolved: guess, cleaned: guess };
  }
  for (const suffix of ["/index.js", "/index.html"]) {
    const guess = abs + suffix;
    if (allFiles.has(guess)) return { resolved: guess, cleaned: guess };
  }
  return { resolved: null, cleaned: abs };
}

function extractHtmlRefs(text) {
  const refs = [];
  let match;
  while ((match = HTML_TAG_RE.exec(text)) !== null) {
    const tag = match[0];
    let attrMatch;
    while ((attrMatch = HTML_ATTR_RE.exec(tag)) !== null) {
      const attr = attrMatch[1].toLowerCase();
      const raw = attrMatch[2];
      if (attr === "srcset") {
        const parts = raw.split(",").map(p => p.trim()).filter(Boolean);
        for (const part of parts) {
          const url = part.split(/\s+/)[0];
          if (url) refs.push(url);
        }
      } else {
        refs.push(raw);
      }
    }
  }
  return refs;
}

function extractAll(regex, text) {
  const out = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    out.push(match[1]);
  }
  return out.filter(Boolean);
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function fileCategory(rel) {
  if (rel.startsWith("DOC/") || rel.endsWith(".md")) return "doc";
  if (rel.startsWith("tools/") || rel.startsWith(".github/")) return "tooling";
  if (rel.endsWith(".json")) return "data";
  if (ASSET_EXT.has(path.extname(rel).toLowerCase())) return "asset";
  return "runtime";
}

function isRuntimeEntry(relPath) {
  if (relPath === "index.html" || relPath === "account.html") return true;
  if (relPath.startsWith("worlds/") && relPath.endsWith(".html")) return true;
  if (relPath.startsWith("workers/")) return true;
  return RUNTIME_JS.includes(relPath);
}

const files = walk(ROOT);
const absFiles = files.map(f => path.join(ROOT, f));
const allFiles = new Set(absFiles);

const nodes = {};
const missing = [];
const missingWarn = [];
const generatedInfo = [];
const refsIn = {};
let todoCount = 0;

for (const file of absFiles) {
  const ext = path.extname(file).toLowerCase();
  nodes[file] = nodes[file] || { path: file, refs_out: [] };
  if (!TEXT_EXT.has(ext)) continue;
  if (BINARY_EXT.has(ext)) continue;

  let text = "";
  try {
    text = fs.readFileSync(file, "utf8");
  } catch {
    continue;
  }

  const todoMatches = text.match(/TODO|FIXME/gi);
  if (todoMatches) todoCount += todoMatches.length;

  let refs = [];
  if (ext === ".html" || ext === ".htm") {
    refs = extractHtmlRefs(text);
  } else if (ext === ".css") {
    refs = extractAll(CSS_URL_RE, text);
  } else if (ext === ".js" || ext === ".mjs") {
    refs = refs
      .concat(extractAll(JS_IMPORT_RE, text))
      .concat(extractAll(JS_EXPORT_RE, text))
      .concat(extractAll(JS_DYNAMIC_IMPORT_RE, text))
      .concat(extractAll(JS_REQUIRE_RE, text))
      .concat(extractAll(JS_WORKER_URL_RE, text))
      .concat(extractAll(JS_WORKER_RE, text))
      .concat(extractAll(JS_SW_RE, text))
      .concat(extractAll(JS_FETCH_RE, text))
      .concat(extractAll(JS_IMPORT_SCRIPTS_RE, text))
      .concat(extractAll(JS_XHR_RE, text));

    let urlMatch;
    while ((urlMatch = JS_URL_ASSIGN_RE.exec(text)) !== null) {
      refs.push(urlMatch[2]);
    }
  }

  for (const ref of refs) {
    const cleaned = normalizeRef(ref);
    if (!cleaned || cleaned.startsWith("#") || isExternalUrl(cleaned)) continue;
    const kind = classifySpecifier(cleaned);
    if (kind === "builtin" || kind === "external") continue;
    const { resolved, cleaned: cleanedResolved } = resolveRef(file, cleaned, allFiles);
    if (resolved) {
      nodes[file].refs_out.push(resolved);
      refsIn[resolved] = refsIn[resolved] || new Set();
      refsIn[resolved].add(file);
    } else {
      const relFrom = path.relative(ROOT, file).replace(/\\/g, "/");
      const relMissing = cleanedResolved
        ? path.relative(ROOT, cleanedResolved).replace(/\\/g, "/")
        : cleaned;
      if (GENERATED_OUTPUTS.has(relMissing)) {
        generatedInfo.push({
          title: "Output tooling (\u0111\u01b0\u1ee3c ph\u00e9p)",
          detail: `Ch\u01b0a c\u00f3 ${relMissing}`,
          path: relFrom
        });
      } else if (isRuntimeEntry(relFrom)) {
        missing.push({
          title: "Thi\u1ebfu tham chi\u1ebfu n\u1ed9i b\u1ed9",
          detail: `Kh\u00f4ng t\u00ecm th\u1ea5y ${relMissing}`,
          from: relFrom,
          ref: cleaned
        });
      } else {
        missingWarn.push({
          title: "Thi\u1ebfu tham chi\u1ebfu n\u1ed9i b\u1ed9 (tooling/docs)",
          detail: `Kh\u00f4ng t\u00ecm th\u1ea5y ${relMissing}`,
          path: relFrom
        });
      }
    }
  }
}

const blockIssues = [];
const warnIssues = [];
const infoIssues = [];

for (const relPath of RUNTIME_JS) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) continue;
  let result;
  let tmpFile = null;
  let tmpDir = null;
  try {
    const content = fs.readFileSync(abs, "utf8");
    const isEsm = /^\s*import\s|^\s*export\s/m.test(content);
    if (path.extname(abs) === ".js" && isEsm) {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "repo-doctor-"));
      tmpFile = path.join(tmpDir, `${path.basename(abs, ".js")}.mjs`);
      fs.writeFileSync(tmpFile, content, "utf8");
      result = spawnSync("node", ["--check", tmpFile], { encoding: "utf8" });
    } else {
      result = spawnSync("node", ["--check", abs], { encoding: "utf8" });
    }
  } catch (err) {
    blockIssues.push({
      title: "Lỗi cú pháp JavaScript",
      detail: err?.message || String(err),
      from: relPath
    });
    continue;
  } finally {
    if (tmpFile && fs.existsSync(tmpFile)) {
      try { fs.unlinkSync(tmpFile); } catch {}
    }
    if (tmpDir && fs.existsSync(tmpDir)) {
      try { fs.rmdirSync(tmpDir); } catch {}
    }
  }
  if (result.status !== 0) {
    blockIssues.push({
      title: "Lỗi cú pháp JavaScript",
      detail: result.stderr.trim() || result.stdout.trim(),
      from: relPath
    });
  }
}

if (missing.length) {
  for (const item of missing) blockIssues.push(item);
}
if (missingWarn.length) {
  for (const item of missingWarn) warnIssues.push(item);
}
if (generatedInfo.length) {
  for (const item of generatedInfo) infoIssues.push(item);
}

for (const file of absFiles) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const ext = path.extname(file).toLowerCase();
  if (rel.startsWith("_graveyard/")) continue;
  if ((ASSET_EXT.has(ext) || ext === ".css") && !(refsIn[file]?.size)) {
    warnIssues.push({
      title: "Asset/CSS kh\u00f4ng \u0111\u01b0\u1ee3c tham chi\u1ebfu",
      detail: "Kh\u00f4ng c\u00f3 refs_in",
      path: rel
    });
  }
  try {
    const size = fs.statSync(file).size;
    if (size > 500 * 1024) {
      warnIssues.push({
      title: "File l\u1edbn",
        detail: `${Math.round(size / 1024)} KB`,
        path: rel
      });
    }
  } catch {
    continue;
  }
}

if (todoCount > 0) {
  warnIssues.push({
    title: "TODO/FIXME",
    detail: `T\u1ed5ng ${todoCount} m\u1ee5c`,
    path: "-"
  });
}

infoIssues.push({
  title: "Th\u1ed1ng k\u00ea t\u1ed5ng quan",
  detail: `T\u1ed5ng file: ${absFiles.length}`
});
infoIssues.push({
  title: "Worlds",
  detail: `${absFiles.filter(p => p.includes(path.join(ROOT, "worlds") + path.sep) && p.endsWith(".html")).length} trang`
});
infoIssues.push({
  title: "Workers",
  detail: `${absFiles.filter(p => p.includes(path.join(ROOT, "workers") + path.sep)).length} file`
});

const counts = {
  block: blockIssues.length,
  warn: warnIssues.length,
  info: infoIssues.length
};

let score = 100;
score -= counts.block * 25;
score -= counts.warn * 3;
if (counts.block > 0) score = Math.min(score, 79);
if (score < 0) score = 0;

const reasons = new Map();
for (const issue of blockIssues) {
  const key = `BLOCK:${issue.title}`;
  reasons.set(key, (reasons.get(key) || 0) + 1);
}
for (const issue of warnIssues) {
  const key = `WARN:${issue.title}`;
  reasons.set(key, (reasons.get(key) || 0) + 1);
}
const topReasons = [...reasons.entries()]
  .map(([key, count]) => {
    const [level, title] = key.split(":");
    return { level, title, count };
  })
  .sort((a, b) => b.count - a.count)
  .slice(0, 5);

const reportJson = {
  generated_at: new Date().toISOString(),
  health_score: score,
  counts,
  top_reasons: topReasons,
  issues: {
    block: blockIssues,
    warn: warnIssues,
    info: infoIssues
  },
  stats: {
    total_files: absFiles.length,
    missing_internal: missing.length,
    unused_assets: warnIssues.filter(i => i.title === "Asset/CSS kh\u00f4ng \u0111\u01b0\u1ee3c tham chi\u1ebfu").length,
    large_files: warnIssues.filter(i => i.title === "File l\u1edbn").length
  }
};

ensureDir(REPORT_DIR);
fs.writeFileSync(path.join(REPORT_DIR, "repo_health.json"), JSON.stringify(reportJson, null, 2), "utf8");

const md = [];
md.push("# \u0042\u00e1o c\u00e1o s\u1ee9c kho\u1ebb Repo");
md.push("");
md.push("- \u0110i\u1ec3m s\u1ee9c kho\u1ebb: **" + score + "**");
md.push("- BLOCK: " + counts.block + " | WARN: " + counts.warn + " | INFO: " + counts.info);
md.push("");
md.push("## BLOCK");
if (!blockIssues.length) {
  md.push("- Kh\u00f4ng c\u00f3.");
} else {
  blockIssues.forEach(issue => {
    md.push("- " + issue.title + ": " + (issue.detail || "") + (issue.from ? " (" + issue.from + ")" : ""));
  });
}
md.push("");
md.push("## WARN");
if (!warnIssues.length) {
  md.push("- Kh\u00f4ng c\u00f3.");
} else {
  warnIssues.forEach(issue => {
    md.push("- " + issue.title + ": " + (issue.detail || "") + (issue.path ? " (" + issue.path + ")" : ""));
  });
}
md.push("");
md.push("## Top 5 g\u1ee3i \u00fd t\u1ed1i \u01b0u s\u1ea1ch & \u0111\u1eaft");
md.push("- D\u1ecdn asset/CSS kh\u00f4ng d\u00f9ng sau 7 ng\u00e0y quarantine.");
md.push("- Gi\u1ea3m file l\u1edbn ho\u1eb7c t\u00e1ch t\u1ea3i theo nhu c\u1ea7u.");
md.push("- Gi\u1ea3m TODO/FIXME trong runtime core.");
md.push("- Gi\u1eef missing n\u1ed9i b\u1ed9 \u1edf m\u1ee9c 0.");
md.push("- Gi\u1eef \u0111i\u1ec3m s\u1ee9c kho\u1ebb > 90.");
md.push("");
fs.writeFileSync(path.join(REPORT_DIR, "repo_health.md"), md.join("\n"), "utf8");

if (counts.block > 0) {
  console.error("Top 10 l\u1ed7i BLOCK:");
  blockIssues.slice(0, 10).forEach((issue, index) => {
    const location = issue.from || issue.path || "-";
    const ref = issue.ref ? ` | ref=${issue.ref}` : "";
    const detail = issue.detail ? ` | ${issue.detail}` : "";
    console.error(`${index + 1}. ${issue.title} (${location}${ref}${detail})`);
  });
  console.error("BLOCK: Repo Doctor ph\u00e1t hi\u1ec7n l\u1ed7i c\u1ea7n x\u1eed l\u00fd.");
  process.exit(1);
}





