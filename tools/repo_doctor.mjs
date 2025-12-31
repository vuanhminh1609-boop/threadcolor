import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const REPORT_DIR = path.join(ROOT, "reports");

const SKIP_DIRS = new Set([".git", "node_modules", "dist", "build", "__pycache__"]);
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

function walk(dir, relBase = "", out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
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

const files = walk(ROOT);
const absFiles = files.map(f => path.join(ROOT, f));
const allFiles = new Set(absFiles);

const nodes = {};
const missing = [];
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
      missing.push({
        title: "Thiếu tham chiếu nội bộ",
        detail: `Không tìm thấy ${cleanedResolved}`,
        from: path.relative(ROOT, file).replace(/\\/g, "/"),
        ref: cleaned
      });
    }
  }
}

const blockIssues = [];
const warnIssues = [];
const infoIssues = [];

for (const relPath of RUNTIME_JS) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) continue;
  const result = spawnSync("node", ["--check", abs], { encoding: "utf8" });
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

for (const file of absFiles) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const ext = path.extname(file).toLowerCase();
  if ((ASSET_EXT.has(ext) || ext === ".css") && !(refsIn[file]?.size)) {
    warnIssues.push({
      title: "Asset/CSS không được tham chiếu",
      detail: "Không có refs_in",
      path: rel
    });
  }
  try {
    const size = fs.statSync(file).size;
    if (size > 500 * 1024) {
      warnIssues.push({
        title: "File lớn",
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
    detail: `Tổng ${todoCount} mục`,
    path: "-"
  });
}

infoIssues.push({
  title: "Thống kê tổng quan",
  detail: `Tổng file: ${absFiles.length}`
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
    unused_assets: warnIssues.filter(i => i.title === "Asset/CSS không được tham chiếu").length,
    large_files: warnIssues.filter(i => i.title === "File lớn").length
  }
};

ensureDir(REPORT_DIR);
fs.writeFileSync(path.join(REPORT_DIR, "repo_health.json"), JSON.stringify(reportJson, null, 2), "utf8");

const md = [];
md.push("# Báo cáo sức khoẻ Repo");
md.push("");
md.push(`- Điểm sức khoẻ: **${score}**`);
md.push(`- BLOCK: ${counts.block} | WARN: ${counts.warn} | INFO: ${counts.info}`);
md.push("");
md.push("## BLOCK");
if (!blockIssues.length) {
  md.push("- Không có.");
} else {
  blockIssues.forEach(issue => {
    md.push(`- ${issue.title}: ${issue.detail || ""} ${issue.from ? `(${issue.from})` : ""}`);
  });
}
md.push("");
md.push("## WARN");
if (!warnIssues.length) {
  md.push("- Không có.");
} else {
  warnIssues.forEach(issue => {
    md.push(`- ${issue.title}: ${issue.detail || ""} ${issue.path ? `(${issue.path})` : ""}`);
  });
}
md.push("");
md.push("## Top 5 gợi ý tối ưu sạch & đắt");
md.push("- Dọn asset/CSS không dùng sau 7 ngày quarantine.");
md.push("- Giảm file lớn hoặc tách tải theo nhu cầu.");
md.push("- Giảm TODO/FIXME trong runtime core.");
md.push("- Giữ missing nội bộ ở mức 0.");
md.push("- Giữ điểm sức khoẻ > 90.");
md.push("");

fs.writeFileSync(path.join(REPORT_DIR, "repo_health.md"), md.join("\n"), "utf8");

if (counts.block > 0) {
  console.error("BLOCK: Repo Doctor phát hiện lỗi cần xử lý.");
  process.exit(1);
}
