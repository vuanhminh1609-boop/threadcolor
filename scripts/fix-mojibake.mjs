import { readFile, writeFile } from "node:fs/promises";
import { extname } from "node:path";

const TARGET_EXTS = new Set([".html", ".js", ".css", ".json", ".md", ".yml", ".yaml"]);
const SUSPECT_PATTERN = /(?:Ã|Ä|á»|áº|â€”|â€¢|â†’|â€|\uFFFD)/;
const REPLACEMENT_CHAR = /\uFFFD/;

const files = process.argv.slice(2);
if (!files.length) {
  console.error("Cần truyền danh sách file cần sửa.");
  process.exit(2);
}

const WIN1252_MAP = new Map([
  ["\u20AC", 0x80],
  ["\u201A", 0x82],
  ["\u0192", 0x83],
  ["\u201E", 0x84],
  ["\u2026", 0x85],
  ["\u2020", 0x86],
  ["\u2021", 0x87],
  ["\u02C6", 0x88],
  ["\u2030", 0x89],
  ["\u0160", 0x8a],
  ["\u2039", 0x8b],
  ["\u0152", 0x8c],
  ["\u017D", 0x8e],
  ["\u2018", 0x91],
  ["\u2019", 0x92],
  ["\u201C", 0x93],
  ["\u201D", 0x94],
  ["\u2022", 0x95],
  ["\u2013", 0x96],
  ["\u2014", 0x97],
  ["\u02DC", 0x98],
  ["\u2122", 0x99],
  ["\u0161", 0x9a],
  ["\u203A", 0x9b],
  ["\u0153", 0x9c],
  ["\u017E", 0x9e],
  ["\u0178", 0x9f]
]);

const normalizeWin1252 = (text) => {
  let result = "";
  for (const ch of text) {
    const mapped = WIN1252_MAP.get(ch);
    result += mapped !== undefined ? String.fromCharCode(mapped) : ch;
  }
  return result;
};

const countSuspect = (text) => {
  const matches = text.match(new RegExp(SUSPECT_PATTERN.source, "g"));
  return matches ? matches.length : 0;
};

const hasReplacement = (text) => REPLACEMENT_CHAR.test(text);

function splitLines(buffer) {
  const lines = [];
  let start = 0;
  for (let i = 0; i < buffer.length; i += 1) {
    if (buffer[i] === 0x0a) {
      lines.push(buffer.slice(start, i));
      start = i + 1;
    }
  }
  lines.push(buffer.slice(start));
  return lines;
}

async function fixFile(filePath) {
  if (!TARGET_EXTS.has(extname(filePath).toLowerCase())) return false;
  const rawBuffer = await readFile(filePath);
  const rawText = rawBuffer.toString("utf8");
  const beforeCount = countSuspect(rawText);
  if (beforeCount === 0) return false;

  const lines = splitLines(rawBuffer);
  let changed = false;
  const nextLines = lines.map((lineBuffer) => {
    const line = lineBuffer.toString("utf8");
    if (!SUSPECT_PATTERN.test(line)) return line;
    const normalized = normalizeWin1252(line);
    const converted = Buffer.from(normalized, "latin1").toString("utf8");
    const beforeLine = countSuspect(line);
    const afterLine = countSuspect(converted);
    if (afterLine < beforeLine && !hasReplacement(converted)) {
      changed = true;
      return converted;
    }
    return line;
  });

  if (!changed) return false;
  const next = nextLines.join("\n");
  const afterCount = countSuspect(next);
  if (afterCount >= beforeCount) return false;
  if (hasReplacement(next)) return false;
  await writeFile(filePath, next, "utf8");
  return true;
}

async function main() {
  const updated = [];
  for (const file of files) {
    const didFix = await fixFile(file);
    if (didFix) updated.push(file);
  }
  if (!updated.length) {
    console.log("Không có file nào được sửa.");
    return;
  }
  console.log("Đã sửa:");
  updated.forEach((file) => console.log(`- ${file}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
