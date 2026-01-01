import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const ACTIONS_PATH = path.join(ROOT, "DOC", "ACTIONS.md");
const HEALTH_PATHS = [
  "reports/repo_health.json",
  "repo_health.json",
  "reports/repo_health.json"
];
const TREND_PATH = path.join(ROOT, "DOC", "health", "health-trend.json");

const readJson = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
};

const findHealthReport = () => {
  for (const rel of HEALTH_PATHS) {
    const full = path.join(ROOT, rel);
    if (fs.existsSync(full)) return full;
  }
  return null;
};

const ensureActionsTemplate = () => {
  if (fs.existsSync(ACTIONS_PATH)) return;
  const template = [
    "# ACTIONS — Hàng đợi hành động",
    "",
    "<!-- AUTO_START -->",
    "<!-- AUTO_END -->",
    "",
    "## THỦ CÔNG",
    "",
    "| ID | Việc | Mức | Owner | Hạn | Trạng thái | Ghi chú |",
    "|---|---|---|---|---|---|---|",
    "| A-001 |  | P0/P1/P2 |  | YYYY-MM-DD | Todo/In progress/Done |  |",
    ""
  ].join("\n");
  fs.writeFileSync(ACTIONS_PATH, template, "utf8");
};

const buildAutoBlock = ({ score, counts, blocks, warns }) => {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`updated_at: ${today}`);
  lines.push(`Health: Score ${score} | BLOCK ${counts.block} | WARN ${counts.warn} | INFO ${counts.info}`);
  lines.push("");
  lines.push("Top việc cần làm (AUTO):");
  if (!blocks.length && !warns.length) {
    lines.push("- (khong co)");
    return lines.join("\n");
  }
  let idx = 1;
  const pushItem = (item, level, owner) => {
    const reason = item.detail || item.note || item.title || "Can xem chi tiet";
    lines.push(`${idx}. [${level}] ${item.title} — Owner: ${owner} — ${reason}`);
    idx += 1;
  };
  blocks.forEach((item) => pushItem(item, "P0", "CTO GPT"));
  warns.slice(0, 5).forEach((item) => pushItem(item, "P1", "Design GPT"));
  return lines.join("\n");
};

const buildAutoContent = (health) => {
  const counts = {
    block: health?.counts?.block || 0,
    warn: health?.counts?.warn || 0,
    info: health?.counts?.info || 0
  };
  const score = typeof health?.health_score === "number" ? health.health_score : "NA";
  const blocks = Array.isArray(health?.issues?.block) ? [...health.issues.block] : [];
  const warns = Array.isArray(health?.issues?.warn) ? [...health.issues.warn] : [];

  const normalize = (list) =>
    list
      .map((item) => ({
        title: String(item.title || "Can xu ly"),
        detail: String(item.detail || item.ref || item.path || "")
      }))
      .sort((a, b) => a.title.localeCompare(b.title, "vi", { sensitivity: "base" }));

  return buildAutoBlock({
    score,
    counts,
    blocks: normalize(blocks),
    warns: normalize(warns)
  });
};

const updateActionsFile = (autoContent) => {
  const content = fs.readFileSync(ACTIONS_PATH, "utf8");
  const start = "<!-- AUTO_START -->";
  const end = "<!-- AUTO_END -->";
  if (!content.includes(start) || !content.includes(end)) {
    throw new Error("Thieu AUTO markers trong DOC/ACTIONS.md");
  }
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
  const block = `${start}\n${autoContent}\n${end}`;
  const updated = content.replace(pattern, block);
  if (updated === content) return false;
  fs.writeFileSync(ACTIONS_PATH, updated, "utf8");
  return true;
};

const main = () => {
  ensureActionsTemplate();
  const healthPath = findHealthReport();
  if (!healthPath) {
    throw new Error("Khong tim thay repo_health.json");
  }
  const health = readJson(healthPath);
  if (!health) {
    throw new Error("Khong doc duoc repo_health.json");
  }
  if (fs.existsSync(TREND_PATH)) {
    readJson(TREND_PATH);
  }
  const autoContent = buildAutoContent(health);
  const changed = updateActionsFile(autoContent);
  console.log(changed ? "[ops_bot] updated" : "[ops_bot] no changes");
};

main();
