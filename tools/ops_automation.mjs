import fs from "fs";
import https from "https";
import path from "path";

const ROOT = process.cwd();
const ACTIONS_PATH = path.join(ROOT, "DOC", "ACTIONS.md");
const EVENT_NAME = process.env.GITHUB_EVENT_NAME || "";
const REPO = process.env.GITHUB_REPOSITORY || "";
const TOKEN = process.env.GITHUB_TOKEN || "";

const isAllowedEvent = ["schedule", "workflow_dispatch"].includes(EVENT_NAME);
if (!isAllowedEvent) {
  console.log("[ops_automation] b\u1ecf qua: kh\u00f4ng ph\u1ea3i schedule/workflow_dispatch");
  process.exit(0);
}

if (!TOKEN || !REPO) {
  console.log("[ops_automation] thi\u1ebfu GITHUB_TOKEN ho\u1eb7c GITHUB_REPOSITORY");
  process.exit(0);
}

const [owner, repo] = REPO.split("/");

const request = (method, urlPath, body) =>
  new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request(
      {
        hostname: "api.github.com",
        path: urlPath,
        method,
        headers: {
          "User-Agent": "ops-automation-bot",
          "Accept": "application/vnd.github+json",
          "Authorization": `Bearer ${TOKEN}`,
          ...(data ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) } : {})
        }
      },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(raw ? JSON.parse(raw) : null);
            return;
          }
          reject(new Error(`HTTP ${res.statusCode}: ${raw}`));
        });
      }
    );
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });

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

const parseActions = () => {
  if (!fs.existsSync(ACTIONS_PATH)) return [];
  const lines = extractAutoLines(ACTIONS_PATH);
  const items = [];
  for (const line of lines) {
    const match = line.match(/^\d+\.\s+\[(AUTO-[0-9A-F]{8})\]\[(P\d)\]\s+(.+)$/);
    if (!match) continue;
    items.push({ id: match[1], level: match[2], text: match[3] });
  }
  const levelRank = { P0: 1, P1: 2, P2: 3 };
  return items.sort((a, b) => {
    const rank = (levelRank[a.level] || 9) - (levelRank[b.level] || 9);
    if (rank !== 0) return rank;
    return a.id.localeCompare(b.id, "vi", { sensitivity: "base" });
  });
};

const buildIssueBody = (action, key) => [
  "## AUTO Action",
  `ops_auto_id: ${action.id}`,
  `ops_auto_key: ${key}`,
  `M\u1ee9c: ${action.level}`,
  `N\u1ed9i dung: ${action.text}`,
  "Ngu\u1ed3n: DOC/ACTIONS.md (AUTO)",
  "Tr\u1ea1ng th\u00e1i: \u0111ang theo d\u00f5i"
].join("\n");

const main = async () => {
  const actions = parseActions();
  if (!actions.length) {
    console.log("[ops_automation] kh\u00f4ng c\u00f3 h\u00e0nh \u0111\u1ed9ng AUTO");
    return;
  }

  const existing = await request("GET", `/repos/${owner}/${repo}/issues?state=open&per_page=100`);
  const mapByKey = new Map();
  const legacyIssues = [];
  for (const issue of existing || []) {
    if (!issue.body) continue;
    const matchKey = issue.body.match(/ops_auto_key:\\s*(AUTO-[0-9A-F]{8})/);
    if (matchKey) {
      mapByKey.set(matchKey[1], issue);
      continue;
    }
    const matchLegacy = issue.body.match(/ops_auto_id:\\s*(AUTO-\\d+)/);
    if (matchLegacy) {
      legacyIssues.push(issue);
    }
  }

  let created = 0;
  for (const action of actions) {
    const key = action.id;
    const body = buildIssueBody(action, key);
    const existingIssue = mapByKey.get(key);
    if (existingIssue) {
      await request("PATCH", `/repos/${owner}/${repo}/issues/${existingIssue.number}`, { body });
      continue;
    }
    const legacyMatch = legacyIssues.find((issue) => issue.body && issue.body.includes(action.text));
    if (legacyMatch) {
      await request("PATCH", `/repos/${owner}/${repo}/issues/${legacyMatch.number}`, { body });
      continue;
    }
    if (created >= 3) break;
    const title = `[AUTO][${action.level}] ${action.text}`;
    await request("POST", `/repos/${owner}/${repo}/issues`, { title, body });
    created += 1;
  }

  console.log(`[ops_automation] created=${created}`);
};

main().catch((err) => {
  console.error("[ops_automation] error", err.message);
  process.exit(1);
});
