import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");

const SKIP_DIRS = new Set([".git", "node_modules", "dist", "build", "__pycache__"]);
const TEXT_EXT = new Set([".html", ".css", ".js", ".mjs", ".json", ".md", ".yml", ".yaml", ".txt"]);
const BINARY_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".mp4", ".mov", ".psd",
  ".ttf", ".woff", ".woff2", ".eot", ".zip", ".rar", ".7z", ".pdf", ".ico"
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

const JS_TEMPLATE_DYNAMIC_RE = /`[^`]*\$\{[^`]+?\}[^`]*`/g;
const JS_CONCAT_DYNAMIC_RE = /["'][^"']*["']\s*\+\s*["'][^"']*["']/g;

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
  return /^(https?:)?\/\//i.test(ref) || ref.startsWith("data:") || ref.startsWith("mailto:") ||
    ref.startsWith("tel:") || ref.startsWith("javascript:");
}

function normalizeRef(ref) {
  return ref.split("#", 1)[0].split("?", 1)[0].trim();
}

function isLikelyPath(ref) {
  if (!ref) return false;
  if (ref === "a" || ref === "img" || ref === "script" || ref === "link") return false;
  if (!ref.includes("/") && !ref.includes(".")) return false;
  return true;
}

function resolveRef(baseFile, ref, allFiles) {
  const cleaned = normalizeRef(ref);
  if (!cleaned || isExternal(cleaned)) return { resolved: null, cleaned };
  if (!cleaned.startsWith(".") && !cleaned.startsWith("/")) {
    return { resolved: null, cleaned };
  }
  let abs = cleaned.startsWith("/")
    ? path.join(ROOT, cleaned)
    : path.join(path.dirname(baseFile), cleaned);
  abs = path.normalize(abs);

  if (allFiles.has(abs)) return { resolved: abs, cleaned };
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
const runtimeSuspected = [];

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

    const templateHits = extractAll(JS_TEMPLATE_DYNAMIC_RE, text);
    const concatHits = extractAll(JS_CONCAT_DYNAMIC_RE, text);
    if (templateHits.length || concatHits.length) {
      runtimeSuspected.push({
        file,
        patterns: [...templateHits, ...concatHits].slice(0, 5)
      });
    }
  }

  for (const ref of refs) {
    const cleaned = normalizeRef(ref);
    if (!cleaned || cleaned.startsWith("#") || isExternal(cleaned)) continue;
    if (isHtml && !isLikelyPath(cleaned)) {
      throw new Error(`Parser HTML bị lỗi: ref không hợp lệ "${cleaned}" trong ${file}`);
    }
    const { resolved, cleaned: cleanedResolved } = resolveRef(file, cleaned, allFiles);
    if (resolved) {
      nodes[file].refs_out.push(resolved);
      nodes[resolved] = nodes[resolved] || { path: resolved, refs_out: [], refs_in: [] };
      nodes[resolved].refs_in.push(file);
      edges.push([file, resolved]);
    } else if (!isExternal(cleaned)) {
      missing.push({ from: file, ref: cleanedResolved, rawRef: ref });
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
  if (!reachable.has(file)) {
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
  edges: edges.map(([a, b]) => [toRel(a), toRel(b)]),
  missing: missing.map(m => ({
    from: toRel(m.from),
    ref: m.ref ? toRel(m.ref) : null,
    rawRef: m.rawRef
  })),
  unreachable: unreachable.map(toRel),
  referenced_by: Object.fromEntries(
    Object.entries(referencedBy).map(([k, v]) => [toRel(k), v.map(toRel)])
  ),
  runtime_suspected: runtimeSuspected.map(item => ({
    file: toRel(item.file),
    patterns: item.patterns
  })),
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
md.push("## File chắc chắn không dùng (unreachable)");
md.push("| File |");
md.push("|---|");
auditJson.unreachable.slice(0, 50).forEach(p => md.push(`| ${p} |`));
md.push("");
md.push("## Nghi vấn runtime (template literal/concat)");
if (!auditJson.runtime_suspected.length) {
  md.push("- Không phát hiện.");
} else {
  auditJson.runtime_suspected.slice(0, 50).forEach(item => {
    md.push(`- ${item.file}: ${item.patterns.join(" | ")}`);
  });
}
md.push("");
md.push("## File bị reference nhưng thiếu");
md.push("| From | Ref | Raw |");
md.push("|---|---|---|");
auditJson.missing.slice(0, 50).forEach(m => md.push(`| ${m.from} | ${m.ref || ""} | ${m.rawRef} |`));
md.push("");
md.push("## Top file được tham chiếu nhiều");
const topUsed = auditJson.nodes
  .map(n => ({ path: n.path, count: (n.refs_in || []).length }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 20);
md.push("| File | Lần được tham chiếu |");
md.push("|---|---:|");
topUsed.forEach(i => md.push(`| ${i.path} | ${i.count} |`));
md.push("");
md.push("## Gợi ý dọn rác an toàn");
md.push("- Chuyển file nghi ngờ không dùng vào thư mục _graveyard/ trong 7 ngày trước khi xoá.");
md.push("- Theo dõi lỗi runtime/404 rồi mới xoá vĩnh viễn.");
md.push("");

fs.writeFileSync(path.join(ROOT, "dependency-audit.md"), md.join("\n"), "utf8");

console.log("Tóm tắt audit:");
console.log(`- Tổng file: ${stats.total}`);
console.log(`- Reachable: ${stats.reachable}`);
console.log(`- Unreachable: ${stats.unreachable}`);
console.log(`- Missing references: ${stats.missing}`);
