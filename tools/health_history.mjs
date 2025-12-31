import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const REPORT_JSON = path.join(ROOT, "reports", "repo_health.json");
const COCKPIT_PATH = path.join(ROOT, "DOC", "CEO_COCKPIT.md");
const HEALTH_DIR = path.join(ROOT, "DOC", "health");
const DAILY_DIR = path.join(HEALTH_DIR, "daily");
const TREND_PATH = path.join(HEALTH_DIR, "health-trend.json");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function writeJson(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
}

function formatDateUTC(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function updateCockpit(score, counts, topReasons, trendRows) {
  if (!fs.existsSync(COCKPIT_PATH)) return;
  const content = fs.readFileSync(COCKPIT_PATH, "utf8");
  const start = "<!-- HEALTH_START -->";
  const end = "<!-- HEALTH_END -->";
  const sIdx = content.indexOf(start);
  const eIdx = content.indexOf(end);
  if (sIdx === -1 || eIdx === -1 || eIdx < sIdx) return;

  const block = [];
  block.push(`\u0110i\u1ec3m hi\u1ec7n t\u1ea1i: **${score}**`);
  block.push(`- BLOCK: ${counts.block} | WARN: ${counts.warn}`);
  block.push("");
  block.push("Top l\u00fd do:");
  if (!topReasons.length) {
    block.push("- Kh\u00f4ng c\u00f3.");
  } else {
    topReasons.slice(0, 3).forEach(r => {
      block.push(`- ${r.level}: ${r.title} (${r.count})`);
    });
  }
  block.push("");
  block.push("| Ng\u00e0y | Score | BLOCK | WARN |");
  block.push("|---|---:|---:|---:|");
  trendRows.forEach(r => {
    block.push(`| ${r.date} | ${r.score} | ${r.block} | ${r.warn} |`);
  });

  const newContent = content.slice(0, sIdx + start.length)
    + "\n" + block.join("\n") + "\n"
    + content.slice(eIdx);
  fs.writeFileSync(COCKPIT_PATH, newContent, "utf8");
}

if (!fs.existsSync(REPORT_JSON)) {
  console.error("Thi\u1ebfu reports/repo_health.json");
  process.exit(1);
}

const report = readJson(REPORT_JSON);
const date = formatDateUTC();

ensureDir(DAILY_DIR);
ensureDir(HEALTH_DIR);

const dailyPath = path.join(DAILY_DIR, `${date}.json`);
const dailyPayload = {
  date,
  health_score: report.health_score,
  counts: report.counts,
  top_reasons: report.top_reasons
};
writeJson(dailyPath, dailyPayload);

let trend = [];
if (fs.existsSync(TREND_PATH)) {
  try {
    trend = readJson(TREND_PATH);
  } catch {
    trend = [];
  }
}

const existing = trend.find(item => item.date === date);
if (existing) {
  existing.score = report.health_score;
  existing.block = report.counts.block;
  existing.warn = report.counts.warn;
} else {
  trend.push({
    date,
    score: report.health_score,
    block: report.counts.block,
    warn: report.counts.warn
  });
}

trend.sort((a, b) => a.date.localeCompare(b.date));
if (trend.length > 7) trend = trend.slice(-7);
writeJson(TREND_PATH, trend);

updateCockpit(report.health_score, report.counts, report.top_reasons, trend);
