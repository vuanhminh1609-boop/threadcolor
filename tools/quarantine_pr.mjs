import fs from "fs";
import path from "path";
import https from "https";
import { spawnSync } from "child_process";

const ROOT = process.cwd();
const JSON_PATH = path.join(ROOT, "DOC", "audit", "quarantine-candidates.json");
const TOKEN = process.env.GITHUB_TOKEN || "";
const REPO = process.env.GITHUB_REPOSITORY || "";
const EVENT_NAME = process.env.GITHUB_EVENT_NAME || "";

const isAllowedEvent = ["schedule", "workflow_dispatch"].includes(EVENT_NAME);
if (!isAllowedEvent) {
  console.log("[quarantine_pr] b\u1ecf qua: kh\u00f4ng ph\u1ea3i schedule/workflow_dispatch");
  process.exit(0);
}

if (!TOKEN || !REPO) {
  console.log("[quarantine_pr] thi\u1ebfu GITHUB_TOKEN ho\u1eb7c GITHUB_REPOSITORY");
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
          "User-Agent": "quarantine-bot",
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

const run = (cmd, args) => {
  const result = spawnSync(cmd, args, { stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error(`Command failed: ${cmd} ${args.join(" ")}`);
  }
};

const createIssue = async (title, body) => {
  await request("POST", `/repos/${owner}/${repo}/issues`, { title, body });
};

const createPullRequest = async (branch, body) => {
  await request("POST", `/repos/${owner}/${repo}/pulls`, {
    title: `[AUTO][QUARANTINE] c\u00e1ch ly file nghi th\u1eeba ${branch.split("/").pop()}`,
    head: branch,
    base: "main",
    body
  });
};

const main = async () => {
  if (!fs.existsSync(JSON_PATH)) {
    console.log("[quarantine_pr] kh\u00f4ng t\u00ecm th\u1ea5y quarantine-candidates.json");
    return;
  }
  const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
  const candidates = Array.isArray(data.candidates) ? data.candidates : [];

  if (candidates.length === 0) {
    console.log("[quarantine_pr] kh\u00f4ng c\u00f3 \u1ee9ng vi\u00ean");
    return;
  }

  if (candidates.length > 10) {
    const body = [
      "Danh s\u00e1ch \u1ee9ng vi\u00ean qu\u00e1 nhi\u1ec1u ( > 10 ).",
      "Vui l\u00f2ng xem b\u00e1o c\u00e1o: DOC/audit/quarantine-candidates.md",
      "",
      `T\u1ed5ng s\u1ed1: ${candidates.length}`
    ].join("\n");
    await createIssue("[AUTO][QUARANTINE] candidates nhi\u1ec1u, c\u1ea7n duy\u1ec7t", body);
    console.log("[quarantine_pr] \u0111\u00e3 t\u1ea1o issue");
    return;
  }

  const date = new Date().toISOString().slice(0, 10);
  const branch = `quarantine/${date}`;
  run("git", ["checkout", "-b", branch]);

  for (const item of candidates) {
    const src = path.join(ROOT, item.path);
    const dest = path.join(ROOT, "_graveyard", date, item.path);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const tracked = spawnSync("git", ["ls-files", "--error-unmatch", item.path], { stdio: "ignore" });
    if (tracked.status === 0) {
      run("git", ["mv", item.path, dest]);
    } else {
      fs.renameSync(src, dest);
    }
  }

  const readme = [
    "# Quarantine",
    "",
    `Ng\u00e0y: ${date}`,
    "",
    "C\u00e1ch rollback:",
    "- Di chuy\u1ec3n file t\u1eeb _graveyard quay l\u1ea1i v\u1ecb tr\u00ed c\u0169",
    "- Xo\u00e1 commit/quarantine branch n\u1ebfu c\u1ea7n"
  ].join("\n");
  const readmePath = path.join(ROOT, "_graveyard", date, "README.md");
  fs.writeFileSync(readmePath, readme, "utf8");

  run("git", ["add", "_graveyard", "DOC/audit/quarantine-candidates.md", "DOC/audit/quarantine-candidates.json"]);
  run("git", ["commit", "-m", `[AUTO][QUARANTINE] quarantine candidates ${date}`]);
  run("git", ["push", "-u", "origin", branch]);

  const body = [
    "PR c\u00e1ch ly file nghi th\u1eeba (kh\u00f4ng xo\u00e1).",
    "",
    "Danh s\u00e1ch file:",
    ...candidates.map((item) => `- ${item.path}`)
  ].join("\n");
  await createPullRequest(branch, body);
  console.log("[quarantine_pr] \u0111\u00e3 t\u1ea1o PR");
};

main().catch((err) => {
  console.error("[quarantine_pr] error", err.message);
  process.exit(1);
});
