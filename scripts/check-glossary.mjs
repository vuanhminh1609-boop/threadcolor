import { existsSync, readFileSync } from "node:fs";

const candidates = [
  "DOC/DOC_GLOSSARY_8PORTALS.md",
  "DOC_GLOSSARY_8PORTALS.md"
];

const glossaryPath = candidates.find((p) => existsSync(p));
if (!glossaryPath) {
  console.error("Không tìm thấy file glossary (DOC/DOC_GLOSSARY_8PORTALS.md).");
  process.exit(2);
}

const text = readFileSync(glossaryPath, "utf8");
const lines = text.split(/\r?\n/);

const entityRegex = /&#(x?[0-9a-fA-F]+);/g;
const namedEntityRegex = /&(nbsp|amp|lt|gt|quot|apos|ndash|mdash);/g;

const entityMatches = [...text.matchAll(entityRegex), ...text.matchAll(namedEntityRegex)];
const entityCount = entityMatches.length;

const normalizeKey = (value) => value
  .normalize("NFC")
  .trim()
  .toLowerCase()
  .replace(/\s+/g, " ");

const seenSections = new Set();
const dupSections = [];
const seenTerms = new Map();
const seenViets = new Map();
const dupTerms = [];
const dupViets = [];

const headerRegex = /^##\s+(\d+)\)/;
lines.forEach((line, idx) => {
  const match = line.match(headerRegex);
  if (!match) return;
  const num = match[1];
  if (seenSections.has(num)) dupSections.push({ num, line: idx + 1 });
  seenSections.add(num);
});

for (let i = 0; i < lines.length; i += 1) {
  const line = lines[i];
  if (!line.startsWith("|") || i + 1 >= lines.length) continue;
  if (!lines[i + 1].trim().startsWith("|---")) continue;
  i += 1;
  for (let j = i + 1; j < lines.length; j += 1) {
    const row = lines[j];
    if (!row.startsWith("|")) {
      i = j - 1;
      break;
    }
    const cells = row.split("|").slice(1, -1).map((c) => c.trim());
    if (cells.length < 3) continue;
    const term = cells[0];
    const viet = cells[1];
    if (!term || !viet) continue;
    const termKey = normalizeKey(term);
    const vietKey = normalizeKey(viet);
    if (seenTerms.has(termKey)) {
      dupTerms.push({ key: termKey, line: j + 1, prev: seenTerms.get(termKey) });
    } else {
      seenTerms.set(termKey, j + 1);
    }
    if (seenViets.has(vietKey)) {
      dupViets.push({ key: vietKey, line: j + 1, prev: seenViets.get(vietKey) });
    } else {
      seenViets.set(vietKey, j + 1);
    }
  }
}

let hasError = false;
if (entityCount) {
  hasError = true;
  console.error(`Phát hiện ${entityCount} HTML entities trong glossary.`);
}
if (dupSections.length) {
  hasError = true;
  console.error(
    `Trùng số mục: ${dupSections.map((d) => `${d.num} (line ${d.line})`).join(", ")}`
  );
}
if (dupTerms.length) {
  hasError = true;
  console.error(
    `Trùng thuật ngữ (term): ${dupTerms.map((d) => `${d.key} (line ${d.line})`).join(", ")}`
  );
}
if (dupViets.length) {
  hasError = true;
  console.error(
    `Trùng Việt hoá: ${dupViets.map((d) => `${d.key} (line ${d.line})`).join(", ")}`
  );
}

if (hasError) process.exit(1);
console.log("OK: Glossary không có trùng lặp/HTML entities/số mục lặp.");
