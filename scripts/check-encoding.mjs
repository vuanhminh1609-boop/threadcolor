import { createReadStream } from "node:fs";
import { readdir } from "node:fs/promises";
import { createInterface } from "node:readline";
import { extname, join } from "node:path";

const ROOT = process.cwd();
const TARGET_EXTS = new Set([".html", ".js", ".css", ".json", ".md", ".yml", ".yaml"]);
const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "out",
  ".next",
  ".turbo",
  ".cache",
  ".parcel-cache",
  "coverage",
  "_graveyard"
]);

const SUSPECT_PATTERN = /(?:Ã|Ä|á»|áº|â€”|â€¢|â†’|â€|\uFFFD)/;
const SUSPECT_QMARK_WORD_PATTERN = /\p{L}\?\p{L}/gu;
const SUSPECT_QMARK_SPACE_PATTERN = /\p{L}\?\s+\p{L}/gu;
const QUERYSTRING_PATTERN = /^\?[a-z0-9_-]+=/i;
const IGNORE_QMARK_PATTERN = /^(?:\?\.|\?\?|\?\[|\?\s*:\s*|\?\s*\.)/;

async function walk(dir, results = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      await walk(join(dir, entry.name), results);
      continue;
    }
    const ext = extname(entry.name).toLowerCase();
    if (TARGET_EXTS.has(ext)) {
      results.push(join(dir, entry.name));
    }
  }
  return results;
}

async function scanFile(filePath) {
  const rel = filePath.replace(ROOT + "\\", "");
  const ext = extname(filePath).toLowerCase();
  const isMarkdown = ext === ".md";
  const stream = createReadStream(filePath, { encoding: "utf8" });
  const rl = createInterface({ input: stream, crlfDelay: Infinity });
  let lineNum = 0;
  let hit = false;
  let inFence = false;
  for await (const line of rl) {
    lineNum += 1;
    if (isMarkdown) {
      const trimmed = line.trimStart();
      if (trimmed.startsWith("```")) {
        inFence = !inFence;
        continue;
      }
      if (inFence) continue;
    }
    const matches = [];
    const mojibakeIndex = line.search(SUSPECT_PATTERN);
    if (mojibakeIndex !== -1) {
      matches.push(mojibakeIndex);
    }
    const scanQmark = (regex) => {
      let qMatch;
      while ((qMatch = regex.exec(line)) !== null) {
        const qIndex = qMatch.index + qMatch[0].indexOf("?");
        const tail = line.slice(qIndex);
        if (QUERYSTRING_PATTERN.test(tail)) continue;
        if (IGNORE_QMARK_PATTERN.test(tail)) continue;
        matches.push(qIndex);
      }
    };
    scanQmark(SUSPECT_QMARK_WORD_PATTERN);
    scanQmark(SUSPECT_QMARK_SPACE_PATTERN);
    if (matches.length) {
      hit = true;
      const uniq = Array.from(new Set(matches)).sort((a, b) => a - b);
      for (const match of uniq) {
        const start = Math.max(0, match - 30);
        const end = Math.min(line.length, match + 30);
        const snippet = line.slice(start, end);
        console.log(`${rel}:${lineNum}: ${snippet}`);
      }
    }
  }
  return hit;
}

async function main() {
  const files = await walk(ROOT);
  let totalHits = 0;
  for (const filePath of files) {
    const hit = await scanFile(filePath);
    if (hit) totalHits += 1;
  }
  if (totalHits === 0) {
    console.log("OK: Không phát hiện chuỗi nghi mojibake.");
    process.exit(0);
  }
  console.error(`Phát hiện ${totalHits} file có dấu hiệu mojibake.`);
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
