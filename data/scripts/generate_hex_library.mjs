import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..", "..");

const threadsPath = path.join(rootDir, "threads.json");
const palettesPath = path.join(rootDir, "data", "palettes.json");
const outputPath = path.join(rootDir, "data", "hex_library.generated.json");

const normalizeHex = (value) => {
  if (!value) return "";
  const raw = String(value).trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(raw)) return "";
  return `#${raw.toUpperCase()}`;
};

const loadJson = (filePath) => {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
};

const hexSet = new Set();

const threads = loadJson(threadsPath);
if (Array.isArray(threads)) {
  threads.forEach((item) => {
    const hex = normalizeHex(item?.hex);
    if (hex) hexSet.add(hex);
  });
}

const palettes = loadJson(palettesPath);
if (Array.isArray(palettes)) {
  palettes.forEach((item) => {
    const stops = Array.isArray(item?.stops) ? item.stops : [];
    stops.forEach((stop) => {
      const hex = normalizeHex(stop);
      if (hex) hexSet.add(hex);
    });
  });
}

const list = Array.from(hexSet).sort((a, b) => a.localeCompare(b));
fs.writeFileSync(outputPath, `${JSON.stringify(list, null, 2)}\n`, "utf8");

console.log(`OK: ${list.length} HEX -> ${outputPath}`);
