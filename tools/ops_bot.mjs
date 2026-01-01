import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const ACTIONS_PATH = path.join(ROOT, "DOC", "ACTIONS.md");
const RISKS_PATH = path.join(ROOT, "DOC", "RISKS.md");
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
    "# ACTIONS - Hang doi hanh dộng",
    "",
    "<!-- AUTO_START -->",
    "<!-- AUTO_END -->",
    "",
    "## THỦ CÔNG",
    "",
    "| ID | Viec | Muc | Owner | Han | Trang thai | Ghi chu |",
    "|---|---|---|---|---|---|---|",
    "| A-001 |  | P0/P1/P2 |  | YYYY-MM-DD | Todo/In progress/Done |  |",
    ""
  ].join("\n");
  fs.writeFileSync(ACTIONS_PATH, template, "utf8");
};

const ensureRisksTemplate = () => {
  if (fs.existsSync(RISKS_PATH)) return;
  const template = [
    "# RISKS - Sổ rủi ro",
    "",
    "<!-- AUTO_START -->",
    "<!-- AUTO_END -->",
    "",
    "## THỦ CÔNG",
    "",
    "| ID | Ruii ro | Xac suat (1-5) | Tac dộng (1-5) | Muc | Chu sở hữu | Ke hoach giam rui ro | Han |",
    "|---|---|---:|---:|---|---|---|---|",
    "| R-001 |  |  |  |  |  |  |  |",
    ""
  ].join("\n");
  fs.writeFileSync(RISKS_PATH, template, "utf8");
};

const buildAutoBlock = ({ score, counts, blocks, warns }) => {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`updated_at: ${today}`);
  lines.push(`Health: Score ${score} | BLOCK ${counts.block} | WARN ${counts.warn} | INFO ${counts.info}`);
  lines.push("");
  lines.push("Top việc cần làm (AUTO):");
  if (!blocks.length && !warns.length) {
    lines.push("- (không có)");
    return lines.join("\n");
  }
  let idx = 1;
  const pushItem = (item, level, owner) => {
    const reason = item.detail || item.note || item.title || "C\u1ea7n xem chi ti\u1ebft";
    lines.push(`${idx}. [${level}] ${item.title} - Owner: ${owner} - ${reason}`);
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

const updateAutoBlock = (filePath, autoContent, label) => {
  const content = fs.readFileSync(filePath, "utf8");
  const start = "<!-- AUTO_START -->";
  const end = "<!-- AUTO_END -->";
  if (!content.includes(start) || !content.includes(end)) {
    throw new Error(`Thieu AUTO markers trong ${label}`);
  }
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
  const block = `${start}\n${autoContent}\n${end}`;
  const updated = content.replace(pattern, block);
  if (updated === content) return false;
  fs.writeFileSync(filePath, updated, "utf8");
  return true;
};

const buildRisksAuto = (health, trend) => {
  const today = new Date().toISOString().slice(0, 10);
  const risks = [];
  const addRisk = (risk) => risks.push(risk);

  if ((health?.counts?.block || 0) > 0) {
    addRisk({
      id: "R-BLOCK",
      level: "Cao",
      title: "Có lỗi mức BLOCK (P0)",
      signal: "counts.block > 0",
      action: "Xử lý ngay tất cả mục BLOCK, không trì hoãn",
      owner: "CTO GPT"
    });
  }

  if (Array.isArray(trend) && trend.length >= 3) {
    const last = trend.slice(-3);
    const scores = last.map((d) => d.score);
    if (scores[0] > scores[1] && scores[1] > scores[2]) {
      addRisk({
        id: "R-TREND-DOWN",
        level: "Trung bình",
        title: "Xu hướng giảm điểm sức khỏe",
        signal: "score giam 2 ngay lien tiep",
        action: "Rà soát WARN, khoanh vùng gốc gây giảm điểm",
        owner: "CEO"
      });
    }
    const warns = last.map((d) => d.warn);
    if (warns[0] < warns[1] && warns[1] < warns[2]) {
      addRisk({
        id: "R-WARN-UP",
        level: "Trung bình",
        title: "Cảnh báo tăng liên tục",
        signal: "WARN tang 3 ngay lien tiep",
        action: "Giảm cảnh báo bằng việc xử lý bất thường trước",
        owner: "Thu ky tong"
      });
    }
  }

  if (!risks.length) {
    return [
      `updated_at: ${today}`,
      "Top rủi ro (AUTO):",
      "- (không có)"
    ].join("\n");
  }

  const levelRank = { "Cao": 1, "Trung bình": 2, "Thap": 3 };
  risks.sort((a, b) => {
    const rank = (levelRank[a.level] || 9) - (levelRank[b.level] || 9);
    if (rank !== 0) return rank;
    return a.id.localeCompare(b.id, "vi", { sensitivity: "base" });
  });

  const lines = [`updated_at: ${today}`, "Top rui ro (AUTO):"];
  risks.forEach((risk, index) => {
    lines.push(
      `${index + 1}. [${risk.id}] ${risk.title} - M\u1ee9c: ${risk.level} - Tín hiệu: ${risk.signal} - Hành động: ${risk.action} - Owner: ${risk.owner}`
    );
  });
  return lines.join("\n");
};

const main = () => {
  ensureActionsTemplate();
  ensureRisksTemplate();
  const healthPath = findHealthReport();
  if (!healthPath) {
    throw new Error("Khong tim thay repo_health.json");
  }
  const health = readJson(healthPath);
  if (!health) {
    throw new Error("Khong doc duoc repo_health.json");
  }
  const trend = fs.existsSync(TREND_PATH) ? readJson(TREND_PATH) : null;
  const autoContent = buildAutoContent(health);
  const risksContent = buildRisksAuto(health, trend);
  const changedActions = updateAutoBlock(ACTIONS_PATH, autoContent, "DOC/ACTIONS.md");
  const changedRisks = updateAutoBlock(RISKS_PATH, risksContent, "DOC/RISKS.md");
  if (changedActions || changedRisks) {
    console.log("[ops_bot] updated");
  } else {
    console.log("[ops_bot] no changes");
  }
};

main();
