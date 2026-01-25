import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");

const SKIP_DIRS = new Set([".git", "node_modules", "dist", "build", "__pycache__", "_graveyard"]);
const TEXT_EXT = new Set([".html", ".css", ".js", ".mjs", ".json", ".md", ".yml", ".yaml", ".txt"]);
const BINARY_EXT = new Set([
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
const JS_FETCH_VAR_RE = /\bfetch\(\s*([A-Za-z_$][\w$]*)(?:\.href|\s*\)|\s*,)/g;
const JS_WORKER_VAR_RE = /\bnew\s+Worker\(\s*([A-Za-z_$][\w$]*)\s*(?:,|\))/g;
const JS_STRINGIFY_VAR_RE = /\bfetch\(\s*String\(\s*([A-Za-z_$][\w$]*)\s*\)\s*\)/g;

const JS_TEMPLATE_DYNAMIC_RE = /`[^`]*\$\{[^`]+?\}[^`]*`/g;
const JS_CONCAT_DYNAMIC_RE = /["'][^"']*["']\s*\+\s*[A-Za-z_$]/g;

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

function isLikelyPath(ref) {
  if (!ref) return false;
  if (ref === "a" || ref === "img" || ref === "script" || ref === "link") return false;
  if (!ref.includes("/") && !ref.includes(".")) return false;
  return true;
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

const files = walk(ROOT);
const absFiles = files.map(f => path.join(ROOT, f));
const allFiles = new Set(absFiles);

const entrypoints = [];
const indexHtml = path.join(ROOT, "index.html");
const accountHtml = path.join(ROOT, "account.html");
if (allFiles.has(indexHtml)) entrypoints.push(indexHtml);
if (allFiles.has(accountHtml)) entrypoints.push(accountHtml);

const worldsDir = path.join(ROOT, "worlds");
if (fs.existsSync(worldsDir)) {
  const worldHtml = walk(worldsDir, "worlds", [])
    .map(p => path.join(ROOT, p))
    .filter(p => p.endsWith(".html"));
  entrypoints.push(...worldHtml);
}

if (!entrypoints.length) {
  const rootHtml = absFiles.filter(p => path.dirname(p) === ROOT && p.endsWith(".html"));
  entrypoints.push(...rootHtml);
}

const nodes = {};
const edges = [];
const missing = [];
const suspectedRuntime = [];
let ignoredBuiltin = 0;
let ignoredExternal = 0;

const referencedPaths = new Set();

for (const file of absFiles) {
  const ext = path.extname(file).toLowerCase();
  nodes[file] = nodes[file] || { path: file, refs_out: [], refs_in: [] };
  if (!TEXT_EXT.has(ext)) continue;
  if (BINARY_EXT.has(ext)) continue;

  let text = "";
  try {
    text = fs.readFileSync(file, "utf8");
  } catch {
    continue;
  }

  let refs = [];
  const isHtml = ext === ".html" || ext === ".htm";
  if (isHtml) {
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

    const urlVars = new Map();
    let urlMatch;
    while ((urlMatch = JS_URL_ASSIGN_RE.exec(text)) !== null) {
      urlVars.set(urlMatch[1], urlMatch[2]);
      refs.push(urlMatch[2]);
    }

    const addVarRef = (match) => {
      const varName = match[1];
      if (urlVars.has(varName)) refs.push(urlVars.get(varName));
    };

    let fetchVar;
    while ((fetchVar = JS_FETCH_VAR_RE.exec(text)) !== null) addVarRef(fetchVar);
    let workerVar;
    while ((workerVar = JS_WORKER_VAR_RE.exec(text)) !== null) addVarRef(workerVar);
    let stringifyVar;
    while ((stringifyVar = JS_STRINGIFY_VAR_RE.exec(text)) !== null) addVarRef(stringifyVar);

    const templateHits = extractAll(JS_TEMPLATE_DYNAMIC_RE, text);
    const concatHits = extractAll(JS_CONCAT_DYNAMIC_RE, text);
    if (templateHits.length || concatHits.length) {
      suspectedRuntime.push({
        from: file,
        snippet: [...templateHits, ...concatHits].slice(0, 5).join(" | "),
        note: "Template literal/concat có biến"
      });
    }
  }

  for (const ref of refs) {
    const cleaned = normalizeRef(ref);
    if (!cleaned || cleaned.startsWith("#") || isExternalUrl(cleaned)) continue;
    if (isHtml && !isLikelyPath(cleaned)) {
      throw new Error(`Audit parse lỗi: ref không hợp lệ "${cleaned}" trong ${file}`);
    }
    const kind = classifySpecifier(cleaned);
    if (kind === "builtin") {
      ignoredBuiltin += 1;
      continue;
    }
    if (kind === "external") {
      ignoredExternal += 1;
      continue;
    }
    const { resolved, cleaned: cleanedResolved } = resolveRef(file, cleaned, allFiles);
    if (resolved) {
      referencedPaths.add(resolved);
      nodes[file].refs_out.push(resolved);
      nodes[resolved] = nodes[resolved] || { path: resolved, refs_out: [], refs_in: [] };
      nodes[resolved].refs_in.push(file);
      edges.push({ from: file, to: resolved, kind: "internal" });
    } else {
      missing.push({
        from: file,
        rawRef: ref,
        resolvedRef: cleanedResolved,
        kind: "internal",
        note: "Không tìm thấy file"
      });
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
  if (!reachable.has(file)) unreachable.push(file);
}

const referencedBy = {};
for (const edge of edges) {
  referencedBy[edge.to] = referencedBy[edge.to] || [];
  referencedBy[edge.to].push(edge.from);
}

const stats = {
  total: absFiles.length,
  reachable: reachable.size,
  unreachable: unreachable.length,
  missing: missing.length,
  suspected_runtime: suspectedRuntime.length,
  ignored_builtin: ignoredBuiltin,
  ignored_external: ignoredExternal
};

const toRel = (p) => path.relative(ROOT, p).replace(/\\/g, "/");

const auditJson = {
  entrypoints: entrypoints.map(toRel),
  stats,
  missing: missing.map(m => ({
    from: toRel(m.from),
    rawRef: m.rawRef,
    resolvedRef: m.resolvedRef ? toRel(m.resolvedRef) : null,
    kind: m.kind,
    note: m.note
  })),
  suspected_runtime: suspectedRuntime.map(s => ({
    from: toRel(s.from),
    snippet: s.snippet,
    note: s.note
  })),
  nodes: Object.values(nodes).map(n => ({
    path: toRel(n.path),
    type: path.extname(n.path).toLowerCase(),
    reachable: reachable.has(n.path),
    category: classifyNodeCategory(n.path),
    refs_in: n.refs_in.map(toRel),
    refs_out: n.refs_out.map(toRel)
  })),
  edges: edges.map(e => ({ from: toRel(e.from), to: toRel(e.to), kind: e.kind }))
};

fs.writeFileSync(path.join(ROOT, "dependency-audit.json"), JSON.stringify(auditJson, null, 2), "utf8");

const md = [];
md.push("# Báo cáo dependency audit");
md.push("");
md.push(`- Tổng file: ${stats.total}`);
md.push(`- Reachable: ${stats.reachable}`);
md.push(`- Unreachable: ${stats.unreachable}`);
md.push(`- Missing references: ${stats.missing}`);
md.push(`- Nghi vấn runtime: ${stats.suspected_runtime}`);
md.push(`- Builtin bỏ qua: ${stats.ignored_builtin}`);
md.push(`- External bỏ qua: ${stats.ignored_external}`);
md.push("");
md.push("## Entry points");
md.push("```text");
md.push(auditJson.entrypoints.join("\n"));
md.push("```");
md.push("");
md.push("## File bị reference nhưng thiếu (internal)");
md.push("| From | Ref | Raw |");
md.push("|---|---|---|");
auditJson.missing.slice(0, 50).forEach(m => md.push(`| ${m.from} | ${m.resolvedRef || ""} | ${m.rawRef} |`));
md.push("");
md.push("## File chết chắc chắn (unreachable)");
md.push("| File |");
md.push("|---|");
auditJson.nodes
  .filter(n => !n.reachable && n.category !== "doc" && n.category !== "tooling")
  .slice(0, 50)
  .forEach(n => md.push(`| ${n.path} |`));
md.push("");
md.push("## Nghi vấn runtime");
if (!auditJson.suspected_runtime.length) {
  md.push("- Không phát hiện.");
} else {
  auditJson.suspected_runtime.slice(0, 50).forEach(item => {
    md.push(`- ${item.from}: ${item.snippet}`);
  });
}
md.push("");
md.push("## Builtin/External đã bỏ qua");
md.push(`- Builtin: ${stats.ignored_builtin}`);
md.push(`- External: ${stats.ignored_external}`);
md.push("");
md.push("## Kế hoạch dọn rác an toàn");
md.push("- Chuyển file nghi ngờ không dùng vào thư mục _graveyard/ trong 7 ngày trước khi xoá.");
md.push("- Theo dõi lỗi runtime/404 rồi mới xoá vĩnh viễn.");
md.push("");

fs.writeFileSync(path.join(ROOT, "dependency-audit.md"), md.join("\n"), "utf8");

const threadsJsonAbs = path.join(ROOT, "threads.json");
if (allFiles.has(threadsJsonAbs)) {
  if (!reachable.has(threadsJsonAbs) && referencedPaths.has(threadsJsonAbs)) {
    throw new Error("threads.json đang bị false-unreachable");
  }
}

console.log("Tóm tắt audit:");
console.log(`- Tổng file: ${stats.total}`);
console.log(`- Reachable: ${stats.reachable}`);
console.log(`- Unreachable: ${stats.unreachable}`);
console.log(`- Missing references: ${stats.missing}`);

function classifyNodeCategory(filePath) {
  const rel = toRel(filePath);
  const ext = path.extname(filePath).toLowerCase();
  if (rel.startsWith("DOC/") || ext === ".md") return "doc";
  if (rel.startsWith("tools/") || rel.startsWith(".github/")) return "tooling";
  if (ext === ".json") return "data";
  if (BINARY_EXT.has(ext)) return "asset";
  return "runtime";
}
