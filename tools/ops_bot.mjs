import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const ACTIONS_PATH = path.join(ROOT, "DOC", "ACTIONS.md");
const RISKS_PATH = path.join(ROOT, "DOC", "RISKS.md");
const COCKPIT_PATH = path.join(ROOT, "DOC", "CEO_COCKPIT.md");
const TREND_PATH = path.join(ROOT, "DOC", "health", "health-trend.json");
const HEALTH_PATHS = ["reports/repo_health.json", "repo_health.json", "reports/repo_health.json"];

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
    "# ACTIONS \u2014 H\u00e0ng \u0111\u1ee3i h\u00e0nh \u0111\u1ed9ng",
    "",
    "<!-- AUTO_START -->",
    "<!-- AUTO_END -->",
    "",
    "## TH\u1ee6 C\u00d4NG",
    "",
    "| ID | Vi\u1ec7c | M\u1ee9c | Owner | H\u1ea1n | Tr\u1ea1ng th\u00e1i | Ghi ch\u00fa |",
    "|---|---|---|---|---|---|---|",
    "| A-001 |  | P0/P1/P2 |  | YYYY-MM-DD | Todo/In progress/Done |  |",
    ""
  ].join("\n");
  fs.writeFileSync(ACTIONS_PATH, template, "utf8");
};

const ensureRisksTemplate = () => {
  if (fs.existsSync(RISKS_PATH)) return;
  const template = [
    "# RISKS \u2014 S\u1ed5 r\u1ee7i ro",
    "",
    "<!-- AUTO_START -->",
    "<!-- AUTO_END -->",
    "",
    "## TH\u1ee6 C\u00d4NG",
    "",
    "| ID | R\u1ee7i ro | X\u00e1c su\u1ea5t (1-5) | T\u00e1c \u0111\u1ed9ng (1-5) | M\u1ee9c | Ch\u1ee7 s\u1edf h\u1eefu | K\u1ebf ho\u1ea1ch gi\u1ea3m r\u1ee7i ro | H\u1ea1n |",
    "|---|---|---:|---:|---|---|---|---|",
    "| R-001 |  |  |  |  |  |  |  |",
    ""
  ].join("\n");
  fs.writeFileSync(RISKS_PATH, template, "utf8");
};

const updateAutoBlock = (filePath, autoContent, label) => {
  const content = fs.readFileSync(filePath, "utf8");
  const start = "<!-- AUTO_START -->";
  const end = "<!-- AUTO_END -->";
  if (!content.includes(start) || !content.includes(end)) {
    throw new Error(`Thi\u1ebfu AUTO markers trong ${label}`);
  }
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
  const block = `${start}\n${autoContent}\n${end}`;
  const updated = content.replace(pattern, block);
  if (updated === content) return false;
  fs.writeFileSync(filePath, updated, "utf8");
  return true;
};

const buildAutoBlock = ({ score, counts, blocks, warns }) => {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`updated_at: ${today}`);
  lines.push(`Health: Score ${score} | BLOCK ${counts.block} | WARN ${counts.warn} | INFO ${counts.info}`);
  lines.push("");
  lines.push("Top vi\u1ec7c c\u1ea7n l\u00e0m (AUTO):");
  if (!blocks.length && !warns.length) {
    lines.push("- (kh\u00f4ng c\u00f3)");
    return lines.join("\n");
  }
  let idx = 1;
  const pushItem = (item, level, owner) => {
    const reason = item.detail || item.note || item.title || "C\u1ea7n xem chi ti\u1ebft";
    const id = `AUTO-${String(idx).padStart(3, "0")}`;
    lines.push(`${idx}. [${id}][${level}] ${item.title} - Owner: ${owner} - ${reason}`);
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
        title: String(item.title || "C\u1ea7n x\u1eed l\u00fd"),
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

const buildRisksAuto = (health, trend) => {
  const today = new Date().toISOString().slice(0, 10);
  const risks = [];
  const addRisk = (risk) => risks.push(risk);

  if ((health?.counts?.block || 0) > 0) {
    addRisk({
      id: "R-BLOCK",
      level: "Cao",
      title: "C\u00f3 l\u1ed7i m\u1ee9c BLOCK (P0)",
      signal: "counts.block > 0",
      action: "X\u1eed l\u00fd ngay t\u1ea5t c\u1ea3 m\u1ee5c BLOCK, kh\u00f4ng tr\u00ec ho\u00e3n",
      owner: "CTO GPT"
    });
  }

  if (Array.isArray(trend) && trend.length >= 3) {
    const last = trend.slice(-3);
    const scores = last.map((d) => d.score);
    if (scores[0] > scores[1] && scores[1] > scores[2]) {
      addRisk({
        id: "R-TREND-DOWN",
        level: "Trung b\u00ecnh",
        title: "Xu h\u01b0\u1edbng gi\u1ea3m \u0111i\u1ec3m s\u1ee9c kho\u1ebb",
        signal: "score gi\u1ea3m 2 ng\u00e0y li\u00ean ti\u1ebfp",
        action: "R\u00e0 so\u00e1t WARN, khoanh v\u00f9ng g\u1ed1c g\u00e2y gi\u1ea3m \u0111i\u1ec3m",
        owner: "CEO"
      });
    }
    const warns = last.map((d) => d.warn);
    if (warns[0] < warns[1] && warns[1] < warns[2]) {
      addRisk({
        id: "R-WARN-UP",
        level: "Trung b\u00ecnh",
        title: "C\u1ea3nh b\u00e1o t\u0103ng li\u00ean t\u1ee5c",
        signal: "WARN t\u0103ng 3 ng\u00e0y li\u00ean ti\u1ebfp",
        action: "Gi\u1ea3m c\u1ea3nh b\u00e1o b\u1eb1ng vi\u1ec7c x\u1eed l\u00fd b\u1ea5t th\u01b0\u1eddng tr\u01b0\u1edbc",
        owner: "Th\u01b0 k\u00fd t\u1ed5ng"
      });
    }
  }

  if (!risks.length) {
    return [
      `updated_at: ${today}`,
      "Top r\u1ee7i ro (AUTO):",
      "- (kh\u00f4ng c\u00f3)"
    ].join("\n");
  }

  const levelRank = { "Cao": 1, "Trung b\u00ecnh": 2, "Th\u1ea5p": 3 };
  risks.sort((a, b) => {
    const rank = (levelRank[a.level] || 9) - (levelRank[b.level] || 9);
    if (rank !== 0) return rank;
    return a.id.localeCompare(b.id, "vi", { sensitivity: "base" });
  });

  const lines = [`updated_at: ${today}`, "Top r\u1ee7i ro (AUTO):"];
  risks.forEach((risk, index) => {
    lines.push(
      `${index + 1}. [${risk.id}] ${risk.title} - M\u1ee9c: ${risk.level} - T\u00edn hi\u1ec7u: ${risk.signal} - H\u00e0nh \u0111\u1ed9ng: ${risk.action} - Owner: ${risk.owner}`
    );
  });
  return lines.join("\n");
};

const extractAutoLines = (filePath) => {
  const content = fs.readFileSync(filePath, "utf8");
  const start = "<!-- AUTO_START -->";
  const end = "<!-- AUTO_END -->";
  const startIdx = content.indexOf(start);
  const endIdx = content.indexOf(end);
  if (startIdx === -1 || endIdx === -1) return [];
  const block = content.slice(startIdx + start.length, endIdx);
  return block.split("\n").map((line) => line.trim()).filter(Boolean);
};

const buildCockpitSummary = ({ health, actions, risks }) => {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`updated_at: ${today}`);
  lines.push(`Health: Score ${health.score} | BLOCK ${health.counts.block} | WARN ${health.counts.warn} | INFO ${health.counts.info}`);
  lines.push("Top vi\u1ec7c (AUTO):");
  if (!actions.length) {
    lines.push("- (kh\u00f4ng c\u00f3)");
  } else {
    actions.slice(0, 3).forEach((item) => lines.push(`- ${item}`));
  }
  lines.push("Top r\u1ee7i ro (AUTO):");
  if (!risks.length) {
    lines.push("- (kh\u00f4ng c\u00f3)");
  } else {
    risks.slice(0, 2).forEach((item) => lines.push(`- ${item}`));
  }
  return lines.join("\n");
};

const updateCockpit = (summary) => {
  const content = fs.readFileSync(COCKPIT_PATH, "utf8");
  const start = "<!-- OPS_SUMMARY_START -->";
  const end = "<!-- OPS_SUMMARY_END -->";
  if (!content.includes(start) || !content.includes(end)) {
    throw new Error("Thi\u1ebfu OPS_SUMMARY markers trong DOC/CEO_COCKPIT.md");
  }
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
  const block = `${start}\n${summary}\n${end}`;
  const updated = content.replace(pattern, block);
  if (updated === content) return false;
  fs.writeFileSync(COCKPIT_PATH, updated, "utf8");
  return true;
};

const main = () => {
  ensureActionsTemplate();
  ensureRisksTemplate();
  const healthPath = findHealthReport();
  if (!healthPath) {
    throw new Error("Kh\u00f4ng t\u00ecm th\u1ea5y repo_health.json");
  }
  const health = readJson(healthPath);
  if (!health) {
    throw new Error("Kh\u00f4ng \u0111\u1ecdc \u0111\u01b0\u1ee3c repo_health.json");
  }
  const trend = fs.existsSync(TREND_PATH) ? readJson(TREND_PATH) : null;
  const autoContent = buildAutoContent(health);
  const risksContent = buildRisksAuto(health, trend);
  const changedActions = updateAutoBlock(ACTIONS_PATH, autoContent, "DOC/ACTIONS.md");
  const changedRisks = updateAutoBlock(RISKS_PATH, risksContent, "DOC/RISKS.md");

  const actionLines = extractAutoLines(ACTIONS_PATH)
    .filter((line) => /^\d+\.\s+\[AUTO-\d+\]\[P\d\]/.test(line))
    .map((line) => line.replace(/^\d+\.\s+/, ""));
  const riskLines = extractAutoLines(RISKS_PATH)
    .filter((line) => /^\d+\.\s+\[R-/.test(line))
    .map((line) => line.replace(/^\d+\.\s+/, ""));

  const healthSummary = {
    score: typeof health?.health_score === "number" ? health.health_score : "NA",
    counts: {
      block: health?.counts?.block || 0,
      warn: health?.counts?.warn || 0,
      info: health?.counts?.info || 0
    }
  };
  const summary = buildCockpitSummary({
    health: healthSummary,
    actions: actionLines,
    risks: riskLines
  });
  const changedCockpit = updateCockpit(summary);

  if (changedActions || changedRisks || changedCockpit) {
    console.log("[ops_bot] updated");
  } else {
    console.log("[ops_bot] no changes");
  }
};

main();
