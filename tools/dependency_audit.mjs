import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");

const SKIP_DIRS = new Set([".git", "node_modules", "dist", "build", "__pycache__"]);
const TEXT_EXT = new Set([".html", ".css", ".js", ".mjs", ".json", ".md", ".yml", ".yaml", ".txt"]);
const BINARY_EXT = new Set([
  ".png",".jpg",".jpeg",".webp",".gif",".svg",".mp4",".mov",".psd",".ttf",".woff",".woff2",".eot",".zip",".rar",".7z",".pdf",".ico"
]);

const HTML_RE = /<(script|link|img|a|source)[^>]+?(src|href|srcset)=["']([^"']+)["']/gi;
const CSS_RE = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;
const JS_IMPORT_RE = /\bimport\s+(?:[^"']+from\s+)?["']([^"']+)["']/g;
const JS_EXPORT_RE = /\bexport\s+[^"']+from\s+["']([^"']+)["']/g;
const JS_DYNAMIC_IMPORT_RE = /\bimport\(\s*["']([^"']+)["']\s*\)/g;
const JS_REQUIRE_RE = /\brequire\(\s*["']([^"']+)["']\s*\)/g;
const JS_WORKER_RE = /\bnew\s+Worker\(\s*(?:new\s+URL\(\s*)?["']([^"']+)["']/gi;
const JS_FETCH_RE = /\bfetch\(\s*["']([^"']+)["']\s*\)/g;
const JS_IMPORT_SCRIPTS_RE = /\bimportScripts\(\s*["']([^"']+)["']\s*\)/g;
const JS_XHR_RE = /\.open\(\s*["']GET["']\s*,\s*["']([^"']+)["']\s*\)/g;

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

function isExternal(ref) {
  return /^(https?:)?\/\//i.test(ref) || ref.startsWith("data:") || ref.startsWith("mailto:");
}

function normalizeRef(ref) {
  return ref.split("#", 1)[0].split("?", 1)[0].trim();
}

function resolveRef(baseFile, ref, allFiles) {
  const cleaned = normalizeRef(ref);
  if (!cleaned || isExternal(cleaned)) return null;
  if (!cleaned.startsWith(".") && !cleaned.startsWith("/")) {
    return null; // external module
  }
  let abs = cleaned.startsWith("/")
    ? path.join(ROOT, cleaned)
    : path.join(path.dirname(baseFile), cleaned);
  abs = path.normalize(abs);

  if (allFiles.has(abs)) return abs;
  if (path.extname(abs)) return null;

  for (const ext of [".js",".mjs",".css",".json",".html"]) {
    const guess = abs + ext;
    if (allFiles.has(guess)) return guess;
  }
  for (const suffix of ["/index.js","/index.html"]) {
    const guess = abs + suffix;
    if (allFiles.has(guess)) return guess;
  }
  return null;
}

function extractAll(regex, text) {
  const out = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    out.push(match[1] ?? match[3]);
  }
  return out.filter(Boolean);
}

const files = walk(ROOT);
const absFiles = files.map(f => path.join(ROOT, f));
const allFiles = new Set(absFiles);

const entrypoints = absFiles.filter(f => f.endsWith(".html"));
const nodes = {};
const edges = [];
const missing = [];

for (const file of absFiles) {
  nodes[file] = nodes[file] || { path: file, refs_out: [], refs_in: [] };
  const ext = path.extname(file).toLowerCase();
  if (!TEXT_EXT.has(ext)) continue;
  if (BINARY_EXT.has(ext)) continue;
  let text = "";
  try {
    text = fs.readFileSync(file, "utf8");
  } catch {
    continue;
  }

  let refs = [];
  if (ext === ".html" || ext === ".htm") {
    refs = extractAll(HTML_RE, text);
  } else if (ext === ".css") {
    refs = extractAll(CSS_RE, text);
  } else if (ext === ".js" || ext === ".mjs") {
    refs = refs
      .concat(extractAll(JS_IMPORT_RE, text))
      .concat(extractAll(JS_EXPORT_RE, text))
      .concat(extractAll(JS_DYNAMIC_IMPORT_RE, text))
      .concat(extractAll(JS_REQUIRE_RE, text))
      .concat(extractAll(JS_WORKER_RE, text))
      .concat(extractAll(JS_FETCH_RE, text))
      .concat(extractAll(JS_IMPORT_SCRIPTS_RE, text))
      .concat(extractAll(JS_XHR_RE, text));
  }

  for (const ref of refs) {
    const resolved = resolveRef(file, ref, allFiles);
    if (resolved) {
      nodes[file].refs_out.push(resolved);
      nodes[resolved] = nodes[resolved] || { path: resolved, refs_out: [], refs_in: [] };
      nodes[resolved].refs_in.push(file);
      edges.push([file, resolved]);
    } else if (!isExternal(ref)) {
      missing.push({ from: file, ref });
    }
  }
}

const reachable = new Set();
const stack = [...entrypoints];
while (stack.length) {
  const cur = stack.pop();
  if (reachable.has(cur)) continue;
  reachable.add(cur);
  for (const nxt of nodes[cur]?.refs_out || []) {
    if (!reachable.has(nxt)) stack.push(nxt);
  }
}

const unreachable = [];
for (const file of absFiles) {
  if (!reachable.has(file) && TEXT_EXT.has(path.extname(file).toLowerCase())) {
    unreachable.push(file);
  }
}

const referencedBy = {};
for (const [from, to] of edges) {
  referencedBy[to] = referencedBy[to] || [];
  referencedBy[to].push(from);
}

const stats = {
  total: absFiles.length,
  reachable: reachable.size,
  unreachable: unreachable.length,
  missing: missing.length
};

const toRel = (p) => path.relative(ROOT, p).replace(/\\/g, "/");

const auditJson = {
  entrypoints: entrypoints.map(toRel),
  nodes: Object.values(nodes).map(n => ({
    path: toRel(n.path),
    refs_out: n.refs_out.map(toRel),
    refs_in: n.refs_in.map(toRel)
  })),
  edges: edges.map(([a,b]) => [toRel(a), toRel(b)]),
  missing: missing.map(m => ({ from: toRel(m.from), ref: m.ref })),
  unreachable: unreachable.map(toRel),
  referenced_by: Object.fromEntries(
    Object.entries(referencedBy).map(([k,v]) => [toRel(k), v.map(toRel)])
  ),
  stats
};

fs.writeFileSync(path.join(ROOT, "dependency-audit.json"), JSON.stringify(auditJson, null, 2), "utf8");

const md = [];
md.push("# Báo cáo dependency audit");
md.push("");
md.push(`- Tổng file: ${stats.total}`);
md.push(`- Reachable: ${stats.reachable}`);
md.push(`- Unreachable: ${stats.unreachable}`);
md.push(`- Missing references: ${stats.missing}`);
md.push("");
md.push("## Entry points");
md.push("```text");
md.push(auditJson.entrypoints.join("\n"));
md.push("```");
md.push("");
md.push("## File không dùng (unreachable)");
md.push("| File |");
md.push("|---|");
auditJson.unreachable.slice(0, 50).forEach(p => md.push(`| ${p} |`));
md.push("");
md.push("## File bị reference nhưng thiếu");
md.push("| From | Ref |");
md.push("|---|---|");
auditJson.missing.slice(0, 50).forEach(m => md.push(`| ${m.from} | ${m.ref} |`));
md.push("");
md.push("## Top file được dùng nhiều (refs_in)");
const topUsed = auditJson.nodes
  .map(n => ({ path: n.path, count: (n.refs_in || []).length }))
  .sort((a,b) => b.count - a.count)
  .slice(0, 20);
md.push("| File | Lần được tham chiếu |");
md.push("|---|---:|");
topUsed.forEach(i => md.push(`| ${i.path} | ${i.count} |`));
md.push("");
md.push("## Lưu ý");
md.push("- Chỉ bắt path dạng string literal, không bắt dynamic template/concat.");
md.push("- Asset tải qua CDN không nằm trong repo sẽ bị bỏ qua.");
md.push("");

fs.writeFileSync(path.join(ROOT, "dependency-audit.md"), md.join("\n"), "utf8");

console.log("Tóm tắt audit:");
console.log(`- Tổng file: ${stats.total}`);
console.log(`- Reachable: ${stats.reachable}`);
console.log(`- Unreachable: ${stats.unreachable}`);
console.log(`- Missing references: ${stats.missing}`);
