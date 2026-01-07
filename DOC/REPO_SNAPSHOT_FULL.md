# REPO SNAPSHOT FULL

- Tai lieu tu dong: tools/repo_textdump.mjs
- Thoi diem: 2026-01-07T09:38:28.961Z

## _graveyard/style.css
````text
/* Định dạng chung cho toàn trang */
body {
  font-family: Arial, sans-serif;   /* Font chữ dễ đọc */
  margin: 20px;                     /* Khoảng cách lề */
  line-height: 1.5;                 /* Độ cao dòng */
  background-color: #f5f5f5;        /* Màu nền nhẹ nhàng */
}

/* Tiêu đề chính */
h1 {
  color: #333;                      /* Màu chữ xám đậm */
  margin-bottom: 20px;
}

/* Các khối nội dung (section) */
section {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;           /* Viền mảnh */
  border-radius: 8px;               /* Bo góc */
  background: #fff;                 /* Nền trắng */
}

/* Nhãn và input */
label {
  margin-right: 10px;
  font-weight: bold;
}

input, button {
  margin-top: 5px;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Nút bấm */
button {
  background-color: #007BFF;        /* Xanh dương */
  color: white;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;        /* Xanh đậm khi hover */
}

/* Canvas hiển thị ảnh */
#canvas {
  display: block;
  border: 1px solid #ccc;
  max-width: 480px;
  margin-top: 10px;
}

/* Kết quả hiển thị */
#result {
  margin-top: 20px;
  padding: 10px;
  background: #eef;
  border: 1px solid #99c;
  border-radius: 6px;
}

/* Mỗi dòng kết quả */
#result .item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-bottom: 1px dashed #ccc;
}

/* Ô màu mẫu */
.swatch {
  width: 40px;
  height: 24px;
  border: 1px solid #aaa;
  border-radius: 4px;
}
````

## _graveyard/themes.css
````text
:root {
  --z-topbar: 2000;
  --z-topbar-menu: 4000;
  --z-actionbar: 1500;
  --z-actionbar-menu: 3000;
  --bg0: radial-gradient(circle at 20% 20%, rgba(96, 223, 255, 0.18), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255, 140, 255, 0.2), transparent 40%), #060713;
  --panel: rgba(255, 255, 255, 0.06);
  --border: rgba(255, 255, 255, 0.12);
  --text: #e9f2ff;
  --muted: #b9c4dd;
  --accent: #7ae0ff;
  --portal-glow: 0 15px 50px rgba(122, 224, 255, 0.35);
  --radius-sm: 0.6rem;
  --radius-md: 0.9rem;
  --radius-lg: 1.25rem;
  --shadow-1: 0 12px 30px rgba(0,0,0,.12);
  --shadow-2: 0 18px 50px rgba(0,0,0,.18);
  --aurora-swatch: linear-gradient(135deg, #7ae0ff, #c189ff);
  --neon-swatch: linear-gradient(135deg, #00ffd1, #ff00ea);
  --zen-swatch: linear-gradient(135deg, #9ad4c8, #3f6d6c);
  --ocean-swatch: linear-gradient(135deg, #4ec2ff, #214b8f);
  --botanical-swatch: linear-gradient(135deg, #7bff9b, #2c7a44);
  --desert-swatch: linear-gradient(135deg, #ffc86b, #c06022);
  --retro-swatch: linear-gradient(135deg, #ff6bb5, #6b9bff);
  --royal-swatch: linear-gradient(135deg, #b08cff, #243b8b);
}

.theme-body {
  background: var(--bg0);
  color: var(--text);
}

.glass-card {
  background: var(--panel);
  border-color: var(--border);
  backdrop-filter: blur(14px);
}

[data-theme="neon"] {
  --bg0: radial-gradient(circle at 25% 20%, rgba(0, 255, 209, 0.18), transparent 35%), radial-gradient(circle at 80% 10%, rgba(255, 0, 234, 0.2), transparent 40%), #05030d;
  --panel: rgba(0, 0, 0, 0.35);
  --border: rgba(0, 255, 209, 0.25);
  --text: #f0f5ff;
  --muted: #9ad6d3;
  --accent: #00ffd1;
  --portal-glow: 0 15px 50px rgba(0, 255, 209, 0.35);
}

[data-theme="aurora"] {
  --bg0: radial-gradient(circle at 20% 20%, rgba(122, 224, 255, 0.15), transparent 35%), radial-gradient(circle at 70% 40%, rgba(193, 137, 255, 0.18), transparent 45%), #060713;
  --panel: rgba(255, 255, 255, 0.06);
  --border: rgba(255, 255, 255, 0.12);
  --text: #e9f2ff;
  --muted: #b9c4dd;
  --accent: #7ae0ff;
  --portal-glow: 0 15px 50px rgba(122, 224, 255, 0.35);
}

[data-theme="zen"] {
  --bg0: linear-gradient(135deg, #0c1a1a, #0f2a2a);
  --panel: rgba(255, 255, 255, 0.04);
  --border: rgba(124, 192, 180, 0.3);
  --text: #d9f2ec;
  --muted: #9cc8bc;
  --accent: #9ad4c8;
  --portal-glow: 0 15px 50px rgba(154, 212, 200, 0.35);
}

[data-theme="ocean"] {
  --bg0: radial-gradient(circle at 30% 15%, rgba(78, 194, 255, 0.18), transparent 35%), radial-gradient(circle at 80% 70%, rgba(33, 75, 143, 0.3), transparent 50%), #041021;
  --panel: rgba(255, 255, 255, 0.05);
  --border: rgba(78, 194, 255, 0.25);
  --text: #dff2ff;
  --muted: #9bc0e0;
  --accent: #4ec2ff;
  --portal-glow: 0 15px 50px rgba(78, 194, 255, 0.35);
}

[data-theme="botanical"] {
  --bg0: linear-gradient(145deg, #07140f, #0f2d1b);
  --panel: rgba(255, 255, 255, 0.04);
  --border: rgba(123, 255, 155, 0.25);
  --text: #e7ffe8;
  --muted: #a3d8b0;
  --accent: #7bff9b;
  --portal-glow: 0 15px 50px rgba(123, 255, 155, 0.35);
}

[data-theme="desert"] {
  --bg0: linear-gradient(160deg, #1f1206, #2d1b0a 50%, #5a3211 100%);
  --panel: rgba(255, 255, 255, 0.05);
  --border: rgba(255, 200, 107, 0.25);
  --text: #ffeede;
  --muted: #e4caa7;
  --accent: #ffc86b;
  --portal-glow: 0 15px 50px rgba(255, 200, 107, 0.35);
}

[data-theme="retro"] {
  --bg0: radial-gradient(circle at 20% 20%, rgba(255, 107, 181, 0.16), transparent 35%), radial-gradient(circle at 80% 20%, rgba(107, 155, 255, 0.18), transparent 40%), #0b0a16;
  --panel: rgba(255, 255, 255, 0.04);
  --border: rgba(255, 107, 181, 0.25);
  --text: #f0e8ff;
  --muted: #cbb7e6;
  --accent: #ff6bb5;
  --portal-glow: 0 15px 50px rgba(255, 107, 181, 0.35);
}

[data-theme="royal"] {
  --bg0: linear-gradient(150deg, #0b0e2a, #141a3f 50%, #1d2e63 100%);
  --panel: rgba(255, 255, 255, 0.05);
  --border: rgba(176, 140, 255, 0.3);
  --text: #e9e6ff;
  --muted: #bfc5ec;
  --accent: #b08cff;
  --portal-glow: 0 15px 50px rgba(176, 140, 255, 0.35);
}

.text-text { color: var(--text); }
.text-muted { color: var(--muted); }
.text-accent { color: var(--accent); }
.bg-panel { background: var(--panel); }
.border-border { border-color: var(--border); }
.bg-accent { background: var(--accent); }

.card {
  background: var(--glass, var(--panel));
  border: 1px solid var(--stroke, var(--border));
  color: var(--text);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-1);
}

.badge {
  background: var(--glass, var(--panel));
  border: 1px solid var(--stroke, var(--border));
  color: var(--text);
  border-radius: 999px;
}

.input,
.select {
  background: var(--glass, var(--panel));
  border: 1px solid var(--stroke, var(--border));
  color: var(--text);
  border-radius: var(--radius-md);
}

.input::placeholder { color: var(--muted); }
.input:focus-visible,
.select:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1, var(--accent));
}

.btn {
  border-radius: var(--radius-md);
  border: 1px solid var(--stroke, var(--border));
  background: var(--glass, var(--panel));
  color: var(--text);
  font-weight: 600;
  letter-spacing: -0.005em;
}
.btn:hover { filter: brightness(1.03); }
.btn:active { transform: translateY(1px); }
.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1, var(--accent));
}

.btn-primary {
  background: linear-gradient(135deg, var(--a1, var(--accent)), var(--a2, #8b5cf6));
  color: #fff;
  border: 1px solid rgba(255,255,255,.18);
}
.btn-primary:hover { filter: brightness(1.06); }

.btn-ghost {
  background: transparent;
  border: 1px solid transparent;
  color: var(--text);
}

.panel {
  background: var(--glass, var(--panel));
  border: 1px solid var(--stroke, var(--border));
  color: var(--text);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-2);
}

.toast {
  background: var(--glass, var(--panel));
  border: 1px solid var(--stroke, var(--border));
  color: var(--text);
  border-radius: var(--radius-md);
}

@media (prefers-reduced-motion: reduce) {
  .btn,
  .panel,
  .card,
  .toast {
    transition: none;
  }
}

````

## .editorconfig
````text
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true

````

## .firebaserc
````text
{
  "projects": {
    "default": "thread-colors-for-community"
  }
}

````

## .github/CODEOWNERS
````text
# TODO: cập nhật owner nếu khác
* @vuanhminh1609-boop

````

## .github/ISSUE_TEMPLATE/bug_report.yml
````text
name: "Báo lỗi"
description: "Báo lỗi để đội ngũ xử lý"
title: "[Bug] "
labels: ["Bug", "P1-Quan trọng"]
body:
  - type: markdown
    attributes:
      value: "Vui lòng điền đầy đủ thông tin để tái hiện lỗi."
  - type: textarea
    id: summary
    attributes:
      label: "Mô tả lỗi"
      description: "Lỗi xảy ra như thế nào?"
      placeholder: "VD: Khi bấm tìm mã chỉ gần nhất thì không ra kết quả."
    validations:
      required: true
  - type: textarea
    id: steps
    attributes:
      label: "Các bước tái hiện"
      description: "Liệt kê từng bước"
      placeholder: "1) ...\n2) ..."
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: "Kỳ vọng"
      placeholder: "VD: Kết quả phải hiển thị danh sách mã chỉ."
    validations:
      required: true
  - type: input
    id: environment
    attributes:
      label: "Môi trường"
      placeholder: "Chrome 123 / Windows 11"
  - type: textarea
    id: attachments
    attributes:
      label: "Ảnh/Screenshot (nếu có)"
      placeholder: "Kéo thả ảnh hoặc dán link."

````

## .github/ISSUE_TEMPLATE/feature_request.yml
````text
name: "Đề xuất tính năng"
description: "Đề xuất tính năng hoặc cải tiến"
title: "[Feature] "
labels: ["Tính năng", "P2-Nâng cấp"]
body:
  - type: markdown
    attributes:
      value: "Mô tả ngắn gọn nhu cầu và giá trị."
  - type: textarea
    id: problem
    attributes:
      label: "Vấn đề / Nhu cầu"
      placeholder: "VD: Cần thêm bộ lọc theo nhóm màu."
    validations:
      required: true
  - type: textarea
    id: solution
    attributes:
      label: "Giải pháp đề xuất"
      placeholder: "VD: Thêm dropdown nhóm màu ở khu lọc."
  - type: textarea
    id: done
    attributes:
      label: "Tiêu chí hoàn thành"
      placeholder: "- [ ] ...\n- [ ] ..."

````

## .github/pull_request_template.md
````text
## Mục tiêu
- 

## Thay đổi chính
- 

## Ảnh hưởng / rủi ro
- 

## Checklist test
- [ ] Không lỗi console
- [ ] Dòng “Xong. Dữ liệu đã sẵn sàng.” còn xuất hiện
- [ ] “Tìm mã chỉ gần nhất” trả kết quả
- [ ] Login top-right hoạt động

## Ảnh/Screenshot (nếu UI)
- 

````

## .github/workflows/ceo-repo-health.yml
````text
name: CEO Repo Health

on:
  pull_request:
  workflow_dispatch:
  schedule:
    - cron: "0 1 * * *"

permissions:
  contents: write
  issues: write

concurrency:
  group: ops-commit
  cancel-in-progress: false

jobs:
  repo-health:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Repo Doctor
        run: node tools/repo_doctor.mjs
      - name: OPS Bot (AUTO actions)
        run: node tools/ops_bot.mjs
      - name: Upload reports
        if: github.event_name != 'schedule'
        uses: actions/upload-artifact@v4
        with:
          name: repo-health-reports
          path: |
            reports/*
            DOC/ACTIONS.md
            DOC/RISKS.md
      - name: Update health history (schedule only)
        if: github.event_name == 'schedule'
        run: node tools/health_history.mjs
      - name: OPS Automation (schedule only)
        if: github.event_name == 'schedule'
        run: node tools/ops_automation.mjs
      - name: Commit health history (schedule only)
        if: github.event_name == 'schedule'
        run: |
          git status --short
          if [ -d "DOC/health" ]; then git add DOC/health; fi
          if [ -f "DOC/CEO_COCKPIT.md" ]; then git add DOC/CEO_COCKPIT.md; elif [ -f "CEO_COCKPIT.md" ]; then git add CEO_COCKPIT.md; fi
          if [ -f "DOC/ACTIONS.md" ]; then git add DOC/ACTIONS.md; elif [ -f "ACTIONS.md" ]; then git add ACTIONS.md; fi
          if [ -f "DOC/RISKS.md" ]; then git add DOC/RISKS.md; elif [ -f "RISKS.md" ]; then git add RISKS.md; fi
          if git diff --cached --quiet; then
            echo "No changes to commit."
            exit 0
          fi
          git config user.name "github-actions"
          git config user.email "github-actions@users.noreply.github.com"
          git commit -m "chore(ops): daily health + ops docs $(date -u +%F)"
          git push

````

## .github/workflows/data-contract.yml
````text
name: Data Contract

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  validate-data:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install data tooling deps
        run: npm ci
      - name: Dry-run migrate when MAJOR bump exists
        run: node data/scripts/migrate_contract.mjs --dry-run
      - name: Validate data contracts
        run: npm run validate:data

````

## .github/workflows/ops-quarantine.yml
````text
name: Ops Quarantine

on:
  schedule:
    - cron: "0 2 * * 1"
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write
  issues: write

concurrency:
  group: ops-commit
  cancel-in-progress: false

jobs:
  quarantine:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: node tools/quarantine_candidates.mjs
      - uses: actions/upload-artifact@v4
        with:
          name: quarantine-candidates
          path: DOC/audit/*
      - run: node tools/quarantine_pr.mjs

````

## .github/workflows/repo-snapshot.yml
````text
﻿name: Repo Snapshot

on:
  pull_request:
  workflow_dispatch:
  push:
    branches: [main]

permissions:
  contents: read

concurrency:
  group: ops-commit
  cancel-in-progress: false

jobs:
  snapshot_pr:
    if: github.event_name != 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: node tools/repo_snapshot.mjs
      - run: node tools/repo_textdump.mjs
      - name: PR snapshot summary
        run: |
          node - <<'NODE'
          const fs = require("fs");
          const data = JSON.parse(fs.readFileSync("DOC/REPO_SNAPSHOT_INDEX.json", "utf8"));
          const ext = Object.entries(data.stats?.extCounts || {})
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([k, v]) => `- ${k}: ${v}`)
            .join("\n") || "- (kh\u00f4ng c\u00f3)";
          const ignored = [
            ...(data.ignored?.dirs || []).map((p) => `- ${p}/`),
            ...(data.ignored?.partialDirs || []).map((p) => `- ${p}/ (b\u1ecf qua file con)`)
          ];
          const summary = [
            "### \u1ea2nh ch\u1ee5p kho m\u00e3 (Snapshot)",
            `- Tham chi\u1ebfu: ${process.env.GITHUB_REF || ""}`,
            `- T\u1ed5ng s\u1ed1 t\u1ec7p: ${data.stats?.totalFiles ?? 0}`,
            `- T\u1ed5ng s\u1ed1 th\u01b0 m\u1ee5c: ${data.stats?.totalDirs ?? 0}`,
            "",
            "Top 5 \u0111u\u00f4i t\u1ec7p:",
            ext,
            "",
            "Danh s\u00e1ch b\u1ecf qua:",
            ignored.length ? ignored.join("\n") : "- (kh\u00f4ng c\u00f3)",
            "",
            "Artifact: REPO_SNAPSHOT.md"
          ].join("\n");
          fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
          NODE
      - uses: actions/upload-artifact@v4
        with:
          name: repo-snapshot
          if-no-files-found: warn
          path: |
            DOC/REPO_SNAPSHOT.md
            DOC/REPO_SNAPSHOT_INDEX.json
            DOC/REPO_SNAPSHOT_FULL.md
            DOC/REPO_SNAPSHOT_FULL_INDEX.json
            repo_manifest.txt

  snapshot_main:
    if: github.event_name == 'push' && github.ref == 'refs/heads/main' && github.actor != 'github-actions[bot]' && !contains(github.event.head_commit.message, 'docs(snapshot):') && !contains(github.event.head_commit.message, '[skip snapshot]')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: node tools/repo_snapshot.mjs
      - run: node tools/repo_textdump.mjs
      - name: Tải artifact snapshot
        uses: actions/upload-artifact@v4
        with:
          name: repo-snapshot
          if-no-files-found: warn
          path: |
            DOC/REPO_SNAPSHOT.md
            DOC/REPO_SNAPSHOT_INDEX.json
            DOC/REPO_SNAPSHOT_FULL.md
            DOC/REPO_SNAPSHOT_FULL_INDEX.json
            repo_manifest.txt

````

## .gitignore
````text
# Output do tools/validate_threads.mjs sinh ra
threads.cleaned.json
threads.conflicts.json
reports/
node_modules/
functions/node_modules/
functions/lib/
.firebase/
functions/.firebase/
firebase-debug.log
*.log
data/audit/*.jsonl

````

## account.html
````text
<!DOCTYPE html>
<html lang="vi" data-world="origami">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Trung t&#226;m t&#224;i kho&#7843;n</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root{
      --z-topbar: 2000;
      --z-topbar-menu: 4000;
      --bg: #f6f1e9;
      --text: #201a14;
      --muted: #6b5d4b;
      --glass: rgba(255, 255, 255, 0.72);
      --stroke: rgba(32, 26, 20, 0.10);
      --a1: #c27b4b;
      --a2: #d59e6d;
      --a3: #8c6d54;
    }
    html[data-world="nebula"]{
      --bg:#040512;
      --text:#eef2ff;
      --muted:#b8c2ff;
      --glass:rgba(12,16,34,0.72);
      --stroke:rgba(255,255,255,0.14);
      --a1:#6ee7ff;
      --a2:#8b5cf6;
      --a3:#f472b6;
    }
    html[data-world="ocean"]{
      --bg:#dff6ff;
      --text:#062a3a;
      --muted:#3f6b7f;
      --glass:rgba(255,255,255,0.76);
      --stroke:rgba(6,42,58,0.12);
      --a1:#1fb6ff;
      --a2:#0ea5a8;
      --a3:#4dd4ff;
    }
    html[data-world="ink"]{
      --bg:#0b0d12;
      --text:#f4f6fb;
      --muted:#a6afbd;
      --glass:rgba(16,18,24,0.76);
      --stroke:rgba(255,255,255,0.12);
      --a1:#e2e8f0;
      --a2:#94a3b8;
      --a3:#64748b;
    }
    html[data-world="origami"]{
      --bg:#f6f1e9;
      --text:#201a14;
      --muted:#6b5d4b;
      --glass:rgba(255,255,255,0.74);
      --stroke:rgba(32,26,20,0.10);
      --a1:#c27b4b;
      --a2:#d59e6d;
      --a3:#8c6d54;
    }
    html[data-world="arcade"]{
      --bg:#05040f;
      --text:#fff7ff;
      --muted:#d8c9f6;
      --glass:rgba(14,12,28,0.80);
      --stroke:rgba(255,255,255,0.16);
      --a1:#ff3dcd;
      --a2:#7c3aed;
      --a3:#20e3b2;
    }
    html[data-world="dunes"]{
      --bg:#f7f0e1;
      --text:#3a2d1a;
      --muted:#7a644a;
      --glass:rgba(255,255,255,0.74);
      --stroke:rgba(58,45,26,0.12);
      --a1:#d39b54;
      --a2:#e3b87b;
      --a3:#b3743d;
    }
    html[data-world="chrome"]{
      --bg:#f1f4f8;
      --text:#1c232b;
      --muted:#5f6b79;
      --glass:rgba(255,255,255,0.72);
      --stroke:rgba(28,35,43,0.12);
      --a1:#3b82f6;
      --a2:#94a3b8;
      --a3:#0f172a;
    }
    html[data-world="circuit"]{
      --bg:#04110a;
      --text:#eafff2;
      --muted:#a6d6bb;
      --glass:rgba(8,20,14,0.76);
      --stroke:rgba(255,255,255,0.12);
      --a1:#22c55e;
      --a2:#16a34a;
      --a3:#86efac;
    }
    body{
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .tc-topbar{
      background: var(--glass);
      border-bottom: 1px solid var(--stroke);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.08);
      position: sticky;
      top: 0;
      z-index: var(--z-topbar);
      overflow: visible;
    }
    .tc-topbar::after{
      content:"";
      position:absolute; left:0; right:0; bottom:-1px; height:1px;
      background: linear-gradient(90deg, var(--a1), var(--a2), var(--a3));
      opacity: .35;
    }
    .tc-chip{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
    }
    .tc-btn{
      border-radius: 0.75rem;
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      font-weight: 600;
      letter-spacing: -0.005em;
      line-height: 1;
    }
    .tc-btn:hover{ filter: brightness(1.03); }
    .tc-btn:active{ transform: translateY(1px); }
    .tc-btn:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    .tc-btn-primary{
      background: linear-gradient(135deg, var(--a1), var(--a2));
      color: #fff;
      border: 1px solid rgba(255,255,255,.18);
    }
    .tc-btn-primary:hover{ filter: brightness(1.06); }
    .tc-dot{
      width: 10px; height: 10px; border-radius: 999px;
      background: linear-gradient(135deg, var(--a1), var(--a2), var(--a3));
      box-shadow: 0 0 0 2px rgba(255,255,255,.5);
    }
    .tc-card{
      background: var(--glass);
      border: 1px solid var(--stroke);
      border-radius: 1.25rem;
      box-shadow: 0 24px 60px rgba(0,0,0,0.12);
    }
    .tc-muted{ color: var(--muted); }
    #portalMenu[data-open="0"],
    #worldMenu[data-open="0"]{ display: none; }
    .tc-menu-item{
      color: var(--text);
      transition: background-color .15s ease, transform .05s ease;
    }
    .tc-menu-item:hover{ background: rgba(255,255,255,.10); }
    .tc-menu-item:active{ transform: translateY(1px); }
    .tc-menu-item:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
      background: rgba(255,255,255,.08);
    }
    #worldMenu .tc-world-item{
      color: var(--text);
      transition: background-color .15s ease, transform .05s ease;
    }
    #worldMenu .tc-world-item:hover{ background: rgba(255,255,255,.10); }
    #worldMenu .tc-world-item:active{ transform: translateY(1px); }
    #portalMenu,
    #worldMenu{
      z-index: var(--z-topbar-menu);
    }
    .account-nav-link{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: .5rem;
      padding: .55rem .75rem;
      border-radius: .8rem;
      color: var(--text);
    }
    .account-nav-link:hover{ background: rgba(255,255,255,.08); }
    .account-nav-link.is-active{
      background: linear-gradient(135deg, rgba(255,255,255,.24), rgba(255,255,255,.08));
      border: 1px solid var(--stroke);
    }
    .setting-row{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    .setting-control{
      min-width: 180px;
      text-align: right;
    }
    .setting-control input,
    .setting-control select{
      width: 100%;
      text-align: left;
    }
    .setting-toggle{
      min-width: 120px;
    }
    .overview-card{
      transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
    }
    .overview-content{
      display: block;
    }
    .overview-skeleton{
      display: none;
    }
    .overview-card.is-loading .overview-content{
      display: none;
    }
    .overview-card.is-loading .overview-skeleton{
      display: block;
    }
    .overview-skeleton .skeleton-line{
      height: 10px;
      border-radius: 999px;
      background: linear-gradient(90deg, rgba(255,255,255,0.25), rgba(255,255,255,0.55), rgba(255,255,255,0.25));
      background-size: 180% 100%;
      animation: skeletonShift 1.1s ease-in-out infinite;
    }
    .overview-skeleton .skeleton-pill{
      height: 18px;
      width: 86px;
      border-radius: 999px;
      border: 1px solid var(--stroke);
      background: rgba(255,255,255,0.25);
    }
    @keyframes skeletonShift{
      0%{ background-position: 100% 0; }
      100%{ background-position: 0 0; }
    }
    .overview-card:hover{
      transform: translateY(-1px);
      box-shadow: 0 26px 60px rgba(0,0,0,0.16);
      border-color: rgba(0,0,0,0.18);
    }
    .overview-card:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    .overview-head{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: .75rem;
    }
    .overview-label{
      display: flex;
      align-items: center;
      gap: .5rem;
    }
    .overview-icon{
      width: 16px;
      height: 16px;
      color: var(--muted);
    }
    .overview-pill{
      border-radius: 999px;
      border: 1px solid var(--stroke);
      background: rgba(255,255,255,0.35);
      font-size: 11px;
      font-weight: 600;
      padding: .2rem .55rem;
      color: var(--text);
      white-space: nowrap;
    }
    .overview-pill.is-warning{
      color: #8a5a1a;
      border-color: rgba(138,90,26,0.35);
      background: rgba(255,240,220,0.7);
    }
    .overview-pill.is-error{
      color: #b42318;
      border-color: rgba(180,35,24,0.35);
      background: rgba(255,220,220,0.7);
    }
    #section-preferences .tc-pref-row{
      position: relative;
      z-index: 0;
    }
    #section-preferences .tc-pref-row.is-open{
      z-index: 50;
    }
    #section-preferences .tc-pref-menu{
      position: absolute;
      z-index: 60;
    }
    #section-preferences .setting-control .tc-btn{
      display: inline-flex;
      align-items: center;
      gap: .4rem;
    }
    #section-preferences .tc-pref-menu .tc-menu-item[data-selected="1"]{
      font-weight: 600;
    }
    #section-preferences .tc-pref-menu .tc-menu-item[data-selected="1"]::after{
      content: "\2713";
      float: right;
      color: var(--text);
    }
    html[data-density="gon"] .tc-account-main .p-6{ padding: 1.25rem !important; }
    html[data-density="gon"] .tc-account-main .p-4{ padding: 0.85rem !important; }
    html[data-density="gon"] .tc-account-main .gap-6{ gap: 1rem !important; }
    html[data-density="gon"] .tc-account-main .gap-4{ gap: 0.75rem !important; }
    html[data-density="gon"] .tc-account-main .px-4{ padding-left: 0.85rem !important; padding-right: 0.85rem !important; }
    html[data-density="gon"] .tc-account-main .px-3{ padding-left: 0.6rem !important; padding-right: 0.6rem !important; }
    html[data-density="gon"] .tc-account-main .py-3{ padding-top: 0.6rem !important; padding-bottom: 0.6rem !important; }
    html[data-density="gon"] .tc-account-main .py-2{ padding-top: 0.45rem !important; padding-bottom: 0.45rem !important; }
    html[data-density="thoang"] .tc-account-main .p-6{ padding: 1.85rem !important; }
    html[data-density="thoang"] .tc-account-main .p-4{ padding: 1.2rem !important; }
    html[data-density="thoang"] .tc-account-main .gap-6{ gap: 1.65rem !important; }
    html[data-density="thoang"] .tc-account-main .gap-4{ gap: 1.2rem !important; }
    html[data-density="thoang"] .tc-account-main .px-4{ padding-left: 1.2rem !important; padding-right: 1.2rem !important; }
    html[data-density="thoang"] .tc-account-main .px-3{ padding-left: 0.9rem !important; padding-right: 0.9rem !important; }
    html[data-density="thoang"] .tc-account-main .py-3{ padding-top: 0.95rem !important; padding-bottom: 0.95rem !important; }
    html[data-density="thoang"] .tc-account-main .py-2{ padding-top: 0.7rem !important; padding-bottom: 0.7rem !important; }
    @media (prefers-reduced-motion: reduce){
      .overview-card{ transition: none; }
      .overview-card:hover{ transform: none; }
      .overview-skeleton .skeleton-line{ animation: none; }
    }
      .account-rail{
        position: sticky;
        top: 96px;
      }
      @media (max-width: 520px) {
        .tc-topbar > .max-w-6xl {
          flex-wrap: wrap;
          row-gap: 8px;
          column-gap: 8px;
        }
        .tc-topbar > .max-w-6xl > :nth-child(1) {
          order: 1;
          min-width: 0;
        }
        .tc-topbar > .max-w-6xl > :nth-child(2) {
          order: 3;
          flex: 1 1 100%;
          min-width: 0;
        }
        .tc-topbar > .max-w-6xl > :nth-child(3) {
          order: 2;
          margin-left: auto;
        }
        .tc-topbar #portalSwitcher,
        .tc-topbar #portalBtn {
          width: 100%;
          max-width: 100%;
        }
        .tc-topbar [data-i18n="topbar.slogan"] {
          display: none;
        }
        .tc-topbar .tc-brand {
          max-width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        #topbarAuthSlot #userName {
          display: none;
        }
        .tc-topbar a,
        .tc-topbar button {
          min-height: 40px;
        }
        .account-rail{
          position: static;
        }
        .account-rail .account-nav{
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 6px;
          scroll-snap-type: x mandatory;
        }
        .account-rail .account-nav::-webkit-scrollbar{
          height: 4px;
        }
        .account-rail .account-nav::-webkit-scrollbar-thumb{
          background: rgba(0,0,0,.18);
          border-radius: 999px;
        }
        .account-rail .account-nav-link{
          flex: 0 0 auto;
          white-space: nowrap;
          scroll-snap-align: start;
        }
      }
    </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    html, body, button, input, select, textarea {
      font-family: "Inter", "Noto Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
    }
  </style></head>
<body class="font-sans">
  <header class="tc-topbar relative">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
      <div class="flex items-center gap-3 min-w-0">
        <a href="./index.html" class="flex items-center gap-3 min-w-0">
          <span class="h-11 w-11 md:h-12 md:w-12 rounded-xl shrink-0 flex items-center justify-center bg-white/5 ring-1 ring-white/10">
            <picture>
              <source srcset="./assets/spacecolors-mark.svg" type="image/svg+xml">
              <img
                src="./assets/spacecolors-mark-128.png"
                srcset="./assets/spacecolors-mark-128.png 1x, ./assets/spacecolors-mark-256.png 2x"
                class="h-full w-full object-contain select-none"
                alt="SpaceColors"
                decoding="async"
                loading="eager"
              />
            </picture>
          </span>
          <span class="min-w-0 flex flex-col justify-center leading-tight">
            <span class="tc-brand text-base md:text-lg whitespace-nowrap">SpaceColors &#183; 8Portal</span>
            <span class="tc-muted text-[11px] md:text-xs truncate max-w-[240px] md:max-w-[360px]">M&#7897;t ch&#7841;m m&#7903; kh&#244;ng gian m&#224;u v&#244; h&#7841;n</span>
          </span>
        </a>
      </div>
      <div class="flex-1 flex items-center justify-center">
        <div class="relative" id="portalSwitcher">
          <button id="portalBtn" class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[210px] justify-between" aria-expanded="false" aria-haspopup="menu" aria-controls="portalMenu">
            Ch&#7885;n Th&#7871; gi&#7899;i
          </button>
          <div id="portalMenu" data-open="0" role="menu" class="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./worlds/threadcolor.html" role="menuitem">Th&#7871; gi&#7899;i m&#224;u th&#234;u</a>
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./worlds/palette.html" role="menuitem">Th&#7871; gi&#7899;i d&#7843;i m&#224;u</a>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="relative" id="worldSwitcher">
          <button id="worldBtn" class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[150px] justify-between" aria-expanded="false" aria-haspopup="menu" aria-controls="worldMenu">
            <span class="flex items-center gap-2">
              <span class="tc-dot" aria-hidden="true"></span>
              <span id="worldLabel">Origami</span>
            </span>
            <span aria-hidden="true">&#9662;</span>
          </button>
          <div id="worldMenu" data-open="0" role="menu" class="absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="nebula" role="menuitem">Tinh v&#226;n</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="ocean" role="menuitem">&#272;&#7841;i d&#432;&#417;ng</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="ink" role="menuitem">M&#7921;c t&#224;u</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="origami" role="menuitem">Origami</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="arcade" role="menuitem">Arcade</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="dunes" role="menuitem">&#272;&#7891;i c&#225;t</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="chrome" role="menuitem">Chrome</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="circuit" role="menuitem">M&#7841;ch &#273;i&#7879;n</button>
          </div>
        </div>
        <div id="topbarAuthSlot" data-auth-slot="topbar" class="flex items-center justify-end min-w-[210px]"></div>
      </div>
    </div>
  </header>

  <main class="mx-auto max-w-6xl px-4 pt-8 pb-16 tc-account-main">
    <div class="flex flex-col gap-6 lg:flex-row">
      <aside class="lg:w-60">
        <div class="tc-card p-4 space-y-4">
          <a id="returnLink" class="tc-btn tc-chip w-full justify-center text-sm font-semibold hidden" href="#">&larr; Quay l&#7841;i</a>
          <div>
            <div class="text-xs uppercase tracking-wide tc-muted">T&#224;i kho&#7843;n</div>
            <nav class="account-nav mt-2 space-y-1">
              <a class="account-nav-link" href="#section-overview">T&#7893;ng quan</a>
              <a class="account-nav-link" href="#section-profile">H&#7891; s&#417;</a>
              <a class="account-nav-link" href="#section-security">B&#7843;o m&#7853;t</a>
            </nav>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wide tc-muted">T&#249;y bi&#7871;n</div>
            <nav class="account-nav mt-2 space-y-1">
              <a class="account-nav-link" href="#section-preferences">T&#249;y bi&#7871;n</a>
            </nav>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wide tc-muted">D&#7919; li&#7879;u &amp; &#273;&#7891;ng b&#7897;</div>
            <nav class="account-nav mt-2 space-y-1">
              <a class="account-nav-link" href="#section-data">D&#7919; li&#7879;u &amp; &#273;&#7891;ng b&#7897;</a>
              <a class="account-nav-link" href="#section-privacy">Quy&#7873;n ri&#234;ng t&#432;</a>
            </nav>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wide tc-muted">H&#7879; sinh th&#225;i</div>
            <nav class="account-nav mt-2 space-y-1">
              <a class="account-nav-link opacity-60 cursor-not-allowed" href="#section-plan" aria-disabled="true">G&#243;i d&#7883;ch v&#7909; (s&#7855;p ra m&#7855;t)</a>
              <a class="account-nav-link opacity-60 cursor-not-allowed" href="#section-team" aria-disabled="true">Kh&#244;ng gian l&#224;m vi&#7879;c / Nh&#243;m (s&#7855;p ra m&#7855;t)</a>
            </nav>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wide tc-muted">H&#7895; tr&#7907;</div>
            <nav class="account-nav mt-2 space-y-1">
              <a class="account-nav-link" href="#section-support">H&#7895; tr&#7907; &amp; ph&#7843;n h&#7891;i</a>
              <a class="account-nav-link" href="#section-logout">&#272;&#259;ng xu&#7845;t</a>
            </nav>
          </div>
        </div>
      </aside>

      <section class="flex-1 space-y-6">
        <div id="accountAuthGate" class="tc-card p-6 hidden" data-section="auth-gate">
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div class="text-xs uppercase tracking-wide tc-muted">Qu&#7843;n l&#253; t&#224;i kho&#7843;n</div>
              <div class="text-lg font-semibold mt-2">&#272;&#259;ng nh&#7853;p &#273;&#7875; &#273;&#7891;ng b&#7897; h&#7891; s&#417;</div>
              <div class="tc-muted text-sm mt-1">M&#7903; kh&#243;a sao l&#432;u, l&#7883;ch s&#7917; v&#224; d&#7919; li&#7879;u &#273;&#227; l&#432;u.</div>
            </div>
            <button id="btnAccountLogin" data-action="login" class="tc-btn tc-btn-primary px-5 py-2 text-sm font-semibold">&#272;&#259;ng nh&#7853;p</button>
          </div>
        </div>
        <div id="section-overview" class="tc-card p-6">
          <h2 class="text-xl font-semibold">T&#7893;ng quan</h2>
          <div class="mt-4 grid gap-4 md:grid-cols-2">
            <div class="tc-card p-4 overview-card is-loading" data-overview-card="1" data-overview-index="0" tabindex="0">
              <div class="overview-content">
                <div class="overview-head">
                  <div class="overview-label">
                    <svg class="overview-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                      <path d="M12 3l8 8-8 8-8-8 8-8z"></path>
                      <circle cx="12" cy="12" r="2.2"></circle>
                    </svg>
                    <span class="text-sm tc-muted">Tr&#7841;ng th&#225;i t&#224;i kho&#7843;n</span>
                  </div>
                  <span class="overview-pill" data-role="pill">&#272;ang k&#7871;t n&#7889;i</span>
                </div>
                <div class="mt-3 text-lg font-semibold leading-tight" data-role="value">&#7892;n &#273;&#7883;nh</div>
                <div class="text-xs tc-muted mt-1" data-role="sub">Phi&#234;n ho&#7841;t &#273;&#7897;ng li&#234;n t&#7909;c</div>
              </div>
              <div class="overview-skeleton" aria-hidden="true">
                <div class="overview-head">
                  <div class="overview-label">
                    <span class="skeleton-line" style="width: 120px;"></span>
                  </div>
                  <span class="skeleton-pill"></span>
                </div>
                <div class="mt-3 skeleton-line" style="width: 70%; height: 14px;"></div>
                <div class="mt-2 skeleton-line" style="width: 55%;"></div>
              </div>
            </div>
            <div class="tc-card p-4 overview-card is-loading" data-overview-card="1" data-overview-index="1" tabindex="0">
              <div class="overview-content">
                <div class="overview-head">
                  <div class="overview-label">
                    <svg class="overview-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                      <path d="M4 7h16M4 12h16M4 17h10"></path>
                    </svg>
                    <span class="text-sm tc-muted">D&#7919; li&#7879;u</span>
                  </div>
                  <span class="overview-pill" data-role="pill">&#272;ang &#273;&#7891;ng b&#7897;</span>
                </div>
                <div class="mt-3 text-lg font-semibold leading-tight" data-role="value">12 b&#7843;n l&#432;u</div>
                <div class="text-xs tc-muted mt-1" data-role="sub">3 d&#7921; &#225;n &#273;ang theo d&#245;i</div>
              </div>
              <div class="overview-skeleton" aria-hidden="true">
                <div class="overview-head">
                  <div class="overview-label">
                    <span class="skeleton-line" style="width: 90px;"></span>
                  </div>
                  <span class="skeleton-pill"></span>
                </div>
                <div class="mt-3 skeleton-line" style="width: 62%; height: 14px;"></div>
                <div class="mt-2 skeleton-line" style="width: 50%;"></div>
              </div>
            </div>
            <div class="tc-card p-4 overview-card is-loading" data-overview-card="1" data-overview-index="2" tabindex="0">
              <div class="overview-content">
                <div class="overview-head">
                  <div class="overview-label">
                    <svg class="overview-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                      <path d="M4 12a8 8 0 0 1 16 0"></path>
                      <path d="M12 4v6l4 2"></path>
                    </svg>
                    <span class="text-sm tc-muted">&#272;&#7891;ng b&#7897;</span>
                  </div>
                  <span class="overview-pill" data-role="pill">&#272;ang b&#7853;t</span>
                </div>
                <div class="mt-3 text-lg font-semibold leading-tight" data-role="value">&#272;ang b&#7853;t</div>
                <div class="text-xs tc-muted mt-1" data-role="sub">T&#7889;c &#273;&#7897; ti&#234;u chu&#7849;n</div>
              </div>
              <div class="overview-skeleton" aria-hidden="true">
                <div class="overview-head">
                  <div class="overview-label">
                    <span class="skeleton-line" style="width: 90px;"></span>
                  </div>
                  <span class="skeleton-pill"></span>
                </div>
                <div class="mt-3 skeleton-line" style="width: 58%; height: 14px;"></div>
                <div class="mt-2 skeleton-line" style="width: 46%;"></div>
              </div>
            </div>
            <div class="tc-card p-4 overview-card is-loading" data-overview-card="1" data-overview-index="3" tabindex="0">
              <div class="overview-content">
                <div class="overview-head">
                  <div class="overview-label">
                    <svg class="overview-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                      <path d="M12 6v6l4 2"></path>
                      <circle cx="12" cy="12" r="8"></circle>
                    </svg>
                    <span class="text-sm tc-muted">Ho&#7841;t &#273;&#7897;ng g&#7847;n &#273;&#226;y</span>
                  </div>
                  <span class="overview-pill" data-role="pill">M&#7899;i</span>
                </div>
                <div class="mt-3 text-lg font-semibold leading-tight" data-role="value">3 thao t&#225;c</div>
                <div class="text-xs tc-muted mt-1" data-role="sub">C&#7853;p nh&#7853;t h&#244;m nay</div>
              </div>
              <div class="overview-skeleton" aria-hidden="true">
                <div class="overview-head">
                  <div class="overview-label">
                    <span class="skeleton-line" style="width: 140px;"></span>
                  </div>
                  <span class="skeleton-pill"></span>
                </div>
                <div class="mt-3 skeleton-line" style="width: 64%; height: 14px;"></div>
                <div class="mt-2 skeleton-line" style="width: 42%;"></div>
              </div>
            </div>
          </div>
        </div>

        <div id="section-profile" class="tc-card p-6" data-section="profile">
          <h2 class="text-xl font-semibold">H&#7891; s&#417;</h2>
          <div class="mt-2 tc-muted text-sm">C&#7853;p nh&#7853;t th&#244;ng tin hi&#7875;n th&#7883; trong h&#7879; sinh th&#225;i.</div>
          <div class="mt-4 space-y-3">
            <div class="tc-card p-4 setting-row" data-setting="display-name">
              <div>
                <div class="text-sm tc-muted">T&#234;n hi&#7875;n th&#7883;</div>
                <div class="text-xs tc-muted">T&#234;n hi&#7875;n th&#7883; tr&#234;n menu t&#224;i kho&#7843;n.</div>
              </div>
              <div class="setting-control">
                <input id="profileDisplayName" data-field="profile.displayName" type="text" class="tc-chip px-3 py-2 text-sm font-semibold w-full" placeholder="V&#237; d&#7909;: SpaceColors Studio">
              </div>
            </div>
            <div class="tc-card p-4 setting-row" data-setting="photo-url">
              <div>
                <div class="text-sm tc-muted">&#7842;nh (URL)</div>
                <div class="text-xs tc-muted">Link &#7843;nh &#273;&#7841;i di&#7879;n c&#244;ng khai.</div>
              </div>
              <div class="setting-control">
                <input id="profilePhotoUrl" data-field="profile.photoURL" type="url" class="tc-chip px-3 py-2 text-sm font-semibold w-full" placeholder="https://">
              </div>
            </div>
            <div class="tc-card p-4 setting-row" data-setting="org-unit">
              <div>
                <div class="text-sm tc-muted">&#272;&#417;n v&#7883; / Nh&#243;m</div>
                <div class="text-xs tc-muted">D&#249;ng cho v&#7883; tr&#237; l&#224;m vi&#7879;c.</div>
              </div>
              <div class="setting-control">
                <input id="profileOrgUnit" data-field="profile.orgUnit" type="text" class="tc-chip px-3 py-2 text-sm font-semibold w-full" placeholder="V&#237; d&#7909;: X&#432;&#7903;ng Th&#234;u 01">
              </div>
            </div>
            <div class="tc-card p-4 setting-row" data-setting="goal">
              <div>
                <div class="text-sm tc-muted">M&#7909;c ti&#234;u</div>
                <div class="text-xs tc-muted">Ghi ng&#7855;n g&#7885;n nhu c&#7847;u ch&#237;nh.</div>
              </div>
              <div class="setting-control">
                <input id="profileGoal" data-field="profile.goal" type="text" class="tc-chip px-3 py-2 text-sm font-semibold w-full" placeholder="V&#237; d&#7909;: T&#432;&#417;ng th&#237;ch m&#224;u ch&#237;nh x&#225;c">
              </div>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap items-center gap-3">
            <button id="btnProfileSave" data-action="profile-save" class="tc-btn tc-btn-primary px-4 py-2 text-sm font-semibold">L&#432;u h&#7891; s&#417;</button>
            <div id="profileStatus" data-role="profile-status" class="text-sm tc-muted"></div>
          </div>
        </div>

        <div id="section-security" class="tc-card p-6" data-section="security">
          <h2 class="text-xl font-semibold">B&#7843;o m&#7853;t</h2>
          <div class="mt-4 space-y-3">
            <div class="tc-card p-4 setting-row" data-setting="password">
              <div>
                <div class="text-sm tc-muted">&#272;&#7893;i m&#7853;t kh&#7849;u</div>
                <div class="text-xs tc-muted">G&#7917;i li&#234;n k&#7871;t &#273;&#7863;t l&#7841;i qua email.</div>
              </div>
              <div class="setting-control">
                <button id="btnPasswordAction" data-action="password-reset" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">C&#7853;p nh&#7853;t</button>
              </div>
            </div>
            <div class="tc-card p-4 setting-row" data-setting="sessions">
              <div>
                <div class="text-sm tc-muted">Phi&#234;n &#273;&#259;ng nh&#7853;p</div>
                <div class="text-xs tc-muted">Thu h&#7891;i t&#7845;t c&#7843; phi&#234;n &#273;&#227; m&#7903;.</div>
              </div>
              <div class="setting-control">
                <button id="btnSignOutAllDevices" data-action="revoke-sessions" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">&#272;&#259;ng xu&#7845;t m&#7885;i thi&#7871;t b&#7883;</button>
              </div>
            </div>
          </div>
        </div>

        <div id="section-preferences" class="tc-card p-6" data-section="preferences">
          <h2 class="text-xl font-semibold">T&#249;y bi&#7871;n</h2>
          <div class="mt-4 space-y-3">
            <div class="tc-card p-4 setting-row tc-pref-row" data-setting="world">
              <div>
                <div class="text-sm tc-muted">S&#7855;c th&#225;i m&#7863;c &#273;&#7883;nh</div>
                <div class="text-xs tc-muted">Ch&#7885;n s&#7855;c th&#225;i m&#7863;c &#273;&#7883;nh.</div>
              </div>
              <div class="setting-control">
                <div class="relative">
                  <button id="btnPrefWorld" data-action="pref-world" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold flex items-center gap-2" aria-expanded="false" aria-haspopup="menu" aria-controls="prefWorldMenu">
                    <span id="prefWorldLabel">Origami</span>
                    <span aria-hidden="true">&#9662;</span>
                  </button>
                  <div id="prefWorldMenu" data-open="0" role="menu" class="tc-pref-menu absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip hidden">
                    <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md" data-value="nebula" role="menuitem">Tinh v&#226;n</button>
                    <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md" data-value="ocean" role="menuitem">&#272;&#7841;i d&#432;&#417;ng</button>
                    <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md" data-value="ink" role="menuitem">M&#7921;c t&#224;u</button>
                    <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md" data-value="origami" role="menuitem">Origami</button>
                    <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md" data-value="arcade" role="menuitem">Arcade</button>
                    <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md" data-value="dunes" role="menuitem">&#272;&#7891;i c&#225;t</button>
                    <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md" data-value="chrome" role="menuitem">Chrome</button>
                    <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md" data-value="circuit" role="menuitem">M&#7841;ch &#273;i&#7879;n</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="tc-card p-4 setting-row tc-pref-row" data-setting="language">
              <div>
                <div class="text-sm tc-muted">Ng&#244;n ng&#7919;</div>
                <div class="text-xs tc-muted">D&#249;ng ng&#244;n ng&#7919; &#432;a th&#237;ch.</div>
              </div>
              <div class="setting-control">
                <div class="relative">
                  <button id="btnPrefLanguage" data-action="pref-language" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold flex items-center gap-2" aria-expanded="false" aria-haspopup="menu" aria-controls="prefLanguageMenu">
                    <span id="prefLanguageLabel">Ti&#7871;ng Vi&#7879;t</span>
                    <span aria-hidden="true">&#9662;</span>
                  </button>
                  <div id="prefLanguageMenu" data-open="0" role="menu" class="tc-pref-menu absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip hidden">
                    <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md" data-value="vi" role="menuitem">Ti&#7871;ng Vi&#7879;t</button>
                    <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" data-value="en" role="menuitem" aria-disabled="true" disabled>English (s&#7855;p ra m&#7855;t)</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="tc-card p-4 setting-row tc-pref-row" data-setting="density">
              <div>
                <div class="text-sm tc-muted">M&#7853;t &#273;&#7897; UI</div>
                <div class="text-xs tc-muted">&#272;i&#7873;u ch&#7881;nh &#273;&#7897; tho&#225;ng giao di&#7879;n.</div>
              </div>
              <div class="setting-control">
                <div class="relative">
                  <button id="btnPrefDensity" data-action="pref-density" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold flex items-center gap-2" aria-expanded="false" aria-haspopup="menu" aria-controls="prefDensityMenu">
                    <span id="prefDensityLabel">Chu&#7849;n</span>
                    <span aria-hidden="true">&#9662;</span>
                  </button>
                  <div id="prefDensityMenu" data-open="0" role="menu" class="tc-pref-menu absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip hidden">
                    <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md" data-value="chuan" role="menuitem">Chu&#7849;n</button>
                    <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md" data-value="gon" role="menuitem">G&#7885;n</button>
                    <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md" data-value="thoang" role="menuitem">Tho&#225;ng</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="tc-card p-4 setting-row tc-pref-row" data-setting="shortcuts">
              <div>
                <div class="text-sm tc-muted">Ph&#237;m t&#7855;t</div>
                <div class="text-xs tc-muted">B&#7853;t/t&#7855;t ph&#237;m t&#7855;t n&#7893;i.</div>
              </div>
              <div class="setting-control setting-toggle flex flex-col items-end gap-2">
                <button id="btnPrefShortcutsToggle" data-toggle="shortcuts" aria-pressed="true" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">&#272;ang b&#7853;t</button>
                <div id="shortcutsListWrap" class="hidden">
                  <button id="btnShortcutsList" data-action="shortcuts-list" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">Xem danh s&#225;ch ph&#237;m t&#7855;t</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="section-data" class="tc-card p-6" data-section="data">
          <h2 class="text-xl font-semibold">D&#7919; li&#7879;u &amp; &#273;&#7891;ng b&#7897;</h2>
          <div class="mt-4 space-y-3">
            <div class="tc-card p-4 setting-row" data-setting="export">
              <div>
                <div class="text-sm tc-muted">Xu&#7845;t d&#7919; li&#7879;u</div>
                <div class="text-xs tc-muted">T&#7843;i v&#7873; JSON ho&#7863;c CSV.</div>
              </div>
              <div class="setting-control flex flex-wrap gap-2 justify-end">
                <button id="btnExportJson" data-action="export-json" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">Xu&#7845;t JSON</button>
                <button id="btnExportCsv" data-action="export-csv" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">Xu&#7845;t CSV</button>
              </div>
            </div>
            <div class="tc-card p-4 setting-row" data-setting="import">
              <div>
                <div class="text-sm tc-muted">Nh&#7853;p d&#7919; li&#7879;u</div>
                <div class="text-xs tc-muted">Nh&#7853;p t&#7879;p t&#7915; b&#7897; s&#432;u t&#7853;p kh&#225;c.</div>
              </div>
              <div class="setting-control">
                <button id="btnImportFile" data-action="import-file" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">Nh&#7853;p t&#7879;p</button>
              </div>
            </div>
            <div class="tc-card p-4 setting-row" data-setting="backup">
              <div>
                <div class="text-sm tc-muted">Sao l&#432;u / Kh&#244;i ph&#7909;c</div>
                <div class="text-xs tc-muted">L&#432;u nhanh ho&#7863;c kh&#244;i ph&#7909;c t&#7915; b&#7843;n sao.</div>
              </div>
              <div class="setting-control flex flex-wrap gap-2 justify-end">
                <button id="btnBackupCreate" data-action="backup-create" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">T&#7841;o sao l&#432;u</button>
                <button id="btnBackupRestore" data-action="backup-restore" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">Kh&#244;i ph&#7909;c</button>
              </div>
            </div>
            <div class="tc-card p-4 setting-row" data-setting="sync">
              <div>
                <div class="text-sm tc-muted">&#272;&#7891;ng b&#7897;</div>
                <div class="text-xs tc-muted">B&#7853;t t&#7927; l&#7879; &#273;&#7891;ng b&#7897; v&#7899;i t&#224;i kho&#7843;n.</div>
              </div>
              <div class="setting-control setting-toggle">
                <button id="btnSyncToggle" data-toggle="sync" aria-pressed="true" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">&#272;ang b&#7853;t</button>
              </div>
            </div>
          </div>
          <input id="accountImportInput" data-role="import-input" type="file" accept=".json,.csv" class="hidden">
        </div>
        <div id="section-privacy" class="tc-card p-6" data-section="privacy">
          <h2 class="text-xl font-semibold">Quy&#7873;n ri&#234;ng t&#432;</h2>
          <div class="mt-4 space-y-3">
            <div class="tc-card p-4 setting-row" data-setting="telemetry">
              <div>
                <div class="text-sm tc-muted">&#272;&#243;ng g&#243;p d&#7919; li&#7879;u</div>
                <div class="text-xs tc-muted">Chia s&#7867; nh&#7865; &#273;&#7875; c&#7843;i thi&#7879;n s&#7843;n ph&#7849;m.</div>
              </div>
              <div class="setting-control setting-toggle">
                <button id="btnPrivacyTelemetryToggle" data-toggle="telemetry" aria-pressed="true" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">&#272;ang b&#7853;t</button>
              </div>
            </div>
            <div class="tc-card p-4 setting-row" data-setting="read-only">
              <div>
                <div class="text-sm tc-muted">Chia s&#7867; ch&#7871; &#273;&#7897; xem</div>
                <div class="text-xs tc-muted">Cho ph&#233;p ng&#432;&#7901;i kh&#225;c xem m&#7909;c c&#244;ng khai.</div>
              </div>
              <div class="setting-control setting-toggle">
                <button id="btnPrivacyReadonlyToggle" data-toggle="read-only" aria-pressed="false" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">&#272;ang t&#7855;t</button>
              </div>
            </div>
            <div class="tc-card p-4 setting-row" data-setting="anonymous">
              <div>
                <div class="text-sm tc-muted">Ch&#7871; &#273;&#7897; &#7849;n danh</div>
                <div class="text-xs tc-muted">&#7848;n t&#234;n hi&#7875;n th&#7883; trong b&#7843;ng x&#7871;p h&#7841;ng.</div>
              </div>
              <div class="setting-control setting-toggle">
                <button id="btnPrivacyAnonymousToggle" data-toggle="anonymous" aria-pressed="false" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">Kh&#244;ng k&#237;ch ho&#7841;t</button>
              </div>
            </div>
          </div>
        </div>

        <div id="section-plan" class="tc-card p-6">
          <h2 class="text-xl font-semibold">G&#243;i d&#7883;ch v&#7909; (s&#7855;p ra m&#7855;t)</h2>
          <p class="mt-2 tc-muted">Chu&#7849;n b&#7883; ra m&#7855;t g&#243;i c&#225; nh&#226;n v&#224; doanh nghi&#7879;p.</p>
        </div>

        <div id="section-team" class="tc-card p-6">
          <h2 class="text-xl font-semibold">Kh&#244;ng gian l&#224;m vi&#7879;c / Nh&#243;m (s&#7855;p ra m&#7855;t)</h2>
          <p class="mt-2 tc-muted">T&#7893; ch&#7913;c nh&#243;m, quy tr&#236;nh v&#224; ph&#226;n quy&#7873;n s&#7869; &#273;&#432;&#7907;c m&#7903; sau.</p>
        </div>

        <div id="section-support" class="tc-card p-6" data-section="support">
          <h2 class="text-xl font-semibold">H&#7895; tr&#7907; &amp; ph&#7843;n h&#7891;i</h2>
          <div class="mt-4 space-y-3">
            <div class="tc-card p-4 setting-row" data-setting="feedback">
              <div>
                <div class="text-sm tc-muted">G&#7917;i ph&#7843;n h&#7891;i</div>
                <div class="text-xs tc-muted">N&#243;i nhanh nhu c&#7847;u ho&#7863;c l&#7895;i g&#7863;p ph&#7843;i.</div>
              </div>
              <div class="setting-control">
                <button id="btnSupportFeedback" data-action="support-feedback" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">G&#7917;i ph&#7843;n h&#7891;i</button>
              </div>
            </div>
            <div class="tc-card p-4 setting-row" data-setting="contact">
              <div>
                <div class="text-sm tc-muted">Li&#234;n h&#7879; h&#7895; tr&#7907;</div>
                <div class="text-xs tc-muted">&#431;u ti&#234;n nh&#432;&#771;ng v&#7845;n &#273;&#7873; kh&#7849;n c&#7845;p.</div>
              </div>
              <div class="setting-control">
                <button id="btnSupportContact" data-action="support-contact" class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">Li&#234;n h&#7879; ngay</button>
              </div>
            </div>
          </div>
        </div>

        <div id="section-logout" class="tc-card p-6" data-section="logout">
          <h2 class="text-xl font-semibold">&#272;&#259;ng xu&#7845;t</h2>
          <div class="mt-4 space-y-3">
            <div class="tc-card p-4 setting-row" data-setting="logout">
              <div>
                <div class="text-sm tc-muted">Tho&#225;t t&#224;i kho&#7843;n</div>
                <div class="text-xs tc-muted">K&#7871;t th&#250;c phi&#234;n hi&#7879;n t&#7841;i tr&#234;n thi&#7871;t b&#7883; n&#224;y.</div>
              </div>
              <div class="setting-control">
                <button id="btnLogout" data-action="logout" class="tc-btn tc-btn-primary px-4 py-2 text-sm font-semibold">Tho&#225;t t&#224;i kho&#7843;n</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside class="lg:w-72">
        <div class="account-rail tc-card p-5 space-y-4">
          <div>
            <div class="text-xs uppercase tracking-wide tc-muted">H&#224;nh &#273;&#7897;ng nhanh</div>
            <div class="mt-2 flex flex-col gap-2">
              <button id="btnQuickSyncNow" data-action="sync-now" class="tc-btn tc-btn-primary px-4 py-2 text-sm font-semibold">&#272;&#7891;ng b&#7897; ngay</button>
              <button id="btnQuickSyncToggle" data-action="sync-toggle-quick" class="tc-btn tc-chip px-4 py-2 text-sm font-semibold">T&#7855;t &#273;&#7891;ng b&#7897;</button>
              <button id="btnQuickRetry" data-action="sync-retry" class="tc-btn tc-chip px-4 py-2 text-sm font-semibold">Th&#7917; l&#7841;i k&#7871;t n&#7889;i</button>
            </div>
          </div>
          <div class="tc-card p-4">
            <div class="text-sm tc-muted">Tr&#7841;ng th&#225;i</div>
            <div class="mt-2 text-sm font-semibold">2/8 Th&#7871; gi&#7899;i s&#7855;n s&#224;ng</div>
            <div class="mt-1 text-sm tc-muted">S&#7855;c th&#225;i &#273;ang d&#249;ng: Origami</div>
            <div class="mt-1 text-sm tc-muted">&#272;&#7891;ng b&#7897;: &#272;ang b&#7853;t</div>
          </div>
        </div>
      </aside>
    </div>
  </main>

  <div id="toastContainer" data-role="toast-container" class="fixed bottom-6 right-6 z-[5000] flex flex-col gap-2"></div>

  <div id="confirmModal" data-role="confirm-modal" class="fixed inset-0 z-[4500] hidden items-center justify-center bg-black/30 p-4">
    <div class="tc-card w-full max-w-md p-6">
      <div class="text-xs uppercase tracking-wide tc-muted">X&#225;c nh&#7853;n</div>
      <div id="confirmTitle" data-role="confirm-title" class="text-lg font-semibold mt-2">X&#225;c nh&#7853;n thao t&#225;c</div>
      <div id="confirmMessage" data-role="confirm-message" class="tc-muted text-sm mt-2">B&#7841;n c&#243; ch&#7855;c mu&#7889;n ti&#7871;p t&#7909;c?</div>
      <div class="mt-4 flex flex-wrap justify-end gap-2">
        <button id="btnConfirmCancel" data-action="confirm-cancel" class="tc-btn tc-chip px-4 py-2 text-sm font-semibold">Hu&#7927;</button>
        <button id="btnConfirmOk" data-action="confirm-ok" class="tc-btn tc-btn-primary px-4 py-2 text-sm font-semibold">X&#225;c nh&#7853;n</button>
      </div>
    </div>
  </div>

  <div id="shortcutsModal" data-role="shortcuts-modal" class="fixed inset-0 z-[4600] hidden items-center justify-center bg-black/40 p-4">
    <div class="tc-card w-full max-w-lg p-6">
      <div class="text-xs uppercase tracking-wide tc-muted">Ph&#237;m t&#7855;t</div>
      <div class="text-lg font-semibold mt-2">Danh s&#225;ch ph&#237;m t&#7855;t</div>
      <div class="tc-muted text-sm mt-1">Danh s&#225;ch n&#224;y &#273;&#432;&#7907;c tr&#237;ch t&#7915; m&#227; hi&#7879;n t&#7841;i.</div>
      <div id="shortcutsList" class="mt-4 space-y-3"></div>
      <div class="mt-5 flex justify-end">
        <button id="btnShortcutsClose" data-action="shortcuts-close" class="tc-btn tc-btn-primary px-4 py-2 text-sm font-semibold">&#272;&#243;ng</button>
      </div>
    </div>
  </div>

  <script src="./i18n.js"></script>
  <script type="module" src="./auth.js"></script>
  <script type="module" src="./account.js"></script>
  <script>
    (() => {
      const portalSwitcher = document.getElementById("portalSwitcher");
      const portalBtn = document.getElementById("portalBtn");
      const portalMenu = document.getElementById("portalMenu");
      if (portalSwitcher && portalBtn && portalMenu) {
        const setOpen = (open) => {
          portalMenu.dataset.open = open ? "1" : "0";
          portalMenu.hidden = !open;
          portalBtn.setAttribute("aria-expanded", open ? "true" : "false");
        };
        setOpen(portalMenu.dataset.open === "1");
        portalBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          setOpen(portalMenu.dataset.open !== "1");
        });
        portalMenu.addEventListener("click", (event) => {
          const item = event.target.closest(".tc-menu-item");
          if (!item || !portalMenu.contains(item)) return;
          setOpen(false);
        });
        document.addEventListener("click", (event) => {
          if (!portalMenu.contains(event.target) && !portalBtn.contains(event.target)) {
            setOpen(false);
          }
        });
        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape") setOpen(false);
        });
      }
    })();
  </script>
  <script>
    (() => {
      const worldBtn = document.getElementById("worldBtn");
      const worldMenu = document.getElementById("worldMenu");
      const switcher = document.getElementById("worldSwitcher");
      if (!worldBtn || !worldMenu || !switcher) return;
      const worlds = ["nebula","ocean","ink","origami","arcade","dunes","chrome","circuit"];
      const labels = {
        nebula: "Tinh v\u00e2n",
        ocean: "\u0110\u1ea1i d\u01b0\u01a1ng",
        ink: "M\u1ef1c t\u00e0u",
        origami: "Origami",
        arcade: "Arcade",
        dunes: "\u0110\u1ed3i c\u00e1t",
        chrome: "Chrome",
        circuit: "M\u1ea1ch \u0111i\u1ec7n"
      };
      const storageKey = "tc_world";
      const defaultWorld = "origami";
      const labelEl = document.getElementById("worldLabel");
      const prefLabelEl = document.getElementById("prefWorldLabel");
      const setPrefWorldLabel = (key) => {
        if (!prefLabelEl) return;
        prefLabelEl.textContent = labels[key] || "Origami";
      };
      const setMenuOpen = (open) => {
        worldMenu.dataset.open = open ? "1" : "0";
        worldMenu.hidden = !open;
        worldBtn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      const applyWorld = (nextKey) => {
        const next = worlds.includes(nextKey) ? nextKey : defaultWorld;
        document.documentElement.setAttribute("data-world", next);
        try { localStorage.setItem(storageKey, next); } catch (e) {}
        if (labelEl) labelEl.textContent = labels[next] || "Origami";
        setPrefWorldLabel(next);
        window.dispatchEvent(new CustomEvent("tc-world-changed", { detail: { world: next } }));
      };
      const getWorld = () => {
        const stored = localStorage.getItem(storageKey);
        return worlds.includes(stored) ? stored : (document.documentElement.dataset.world || defaultWorld);
      };
      window.tcTheme = { applyWorld, getWorld, worlds, labels };
      try {
        const stored = localStorage.getItem(storageKey);
        applyWorld(stored || document.documentElement.dataset.world || defaultWorld);
      } catch (e) {
        applyWorld(document.documentElement.dataset.world || defaultWorld);
      }
      setMenuOpen(false);
      worldBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        setMenuOpen(worldMenu.dataset.open !== "1");
      });
      worldMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-world-item");
        if (!item || !worldMenu.contains(item)) return;
        applyWorld(item.getAttribute("data-world"));
        setMenuOpen(false);
        worldBtn.focus();
      });
      document.addEventListener("click", (event) => {
        if (!switcher.contains(event.target)) setMenuOpen(false);
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          setMenuOpen(false);
          worldBtn.focus();
        }
      });
    })();
  </script>
  <script>
    (() => {
      const prefWorldBtn = document.getElementById("btnPrefWorld");
      const prefWorldMenu = document.getElementById("prefWorldMenu");
      const prefWorldLabel = document.getElementById("prefWorldLabel");
      const prefLanguageBtn = document.getElementById("btnPrefLanguage");
      const prefLanguageMenu = document.getElementById("prefLanguageMenu");
      const prefLanguageLabel = document.getElementById("prefLanguageLabel");
      const prefDensityBtn = document.getElementById("btnPrefDensity");
      const prefDensityMenu = document.getElementById("prefDensityMenu");
      const prefDensityLabel = document.getElementById("prefDensityLabel");
      const prefShortcutsBtn = document.getElementById("btnPrefShortcutsToggle");
      const shortcutsListWrap = document.getElementById("shortcutsListWrap");
      const shortcutsListBtn = document.getElementById("btnShortcutsList");
      const shortcutsModal = document.getElementById("shortcutsModal");
      const shortcutsList = document.getElementById("shortcutsList");
      const shortcutsClose = document.getElementById("btnShortcutsClose");
      const prefRows = Array.from(document.querySelectorAll("#section-preferences .tc-pref-row"));
      const toneOptions = [
        { key: "nebula", label: "Tinh v\u00e2n" },
        { key: "ocean", label: "\u0110\u1ea1i d\u01b0\u01a1ng" },
        { key: "ink", label: "M\u1ef1c t\u00e0u" },
        { key: "origami", label: "Origami" },
        { key: "arcade", label: "Arcade" },
        { key: "dunes", label: "\u0110\u1ed3i c\u00e1t" },
        { key: "chrome", label: "Chrome" },
        { key: "circuit", label: "M\u1ea1ch \u0111i\u1ec7n" }
      ];
      const toneLabels = toneOptions.reduce((acc, item) => {
        acc[item.key] = item.label;
        return acc;
      }, {});
      const defaultTone = "origami";
      const densityLabels = {
        chuan: "Chu\u1ea9n",
        gon: "G\u1ecdn",
        thoang: "Tho\u00e1ng"
      };
      const langLabels = {
        vi: "Ti\u1ebfng Vi\u1ec7t",
        en: "English"
      };
      const shortcutItems = [
        {
          key: "Escape",
          action: "\u0110\u00f3ng b\u1ea3ng ki\u1ec3m m\u00e0u (Inspector)",
          source: "script.js#L2281"
        },
        {
          key: "I",
          action: "M\u1edf c\u00f4ng c\u1ee5 l\u1ea5y m\u00e0u (EyeDropper)",
          source: "script.js#L2281"
        },
        {
          key: "Ctrl/Cmd + Shift + P",
          action: "M\u1edf c\u00f4ng c\u1ee5 l\u1ea5y m\u00e0u (EyeDropper)",
          source: "script.js#L2281"
        },
        {
          key: "Escape",
          action: "\u0110\u00f3ng menu s\u1eafc th\u00e1i \u1edf Topbar",
          source: "account.html#L1030"
        },
        {
          key: "Escape",
          action: "\u0110\u00f3ng menu portal/nh\u00f3m",
          source: "worlds/threadcolor.html#L1062, worlds/threadvault.html#L486, worlds/palette.html#L382"
        }
      ];
      const setRowOpen = (row, open) => {
        prefRows.forEach((item) => {
          item.classList.toggle("is-open", item === row && open);
        });
      };
      const closeMenus = () => {
        [prefWorldMenu, prefLanguageMenu, prefDensityMenu].forEach((menu) => {
          if (!menu) return;
          menu.dataset.open = "0";
          menu.classList.add("hidden");
        });
        [prefWorldBtn, prefLanguageBtn, prefDensityBtn].forEach((btn) => {
          if (!btn) return;
          btn.setAttribute("aria-expanded", "false");
        });
        setRowOpen(null, false);
      };
      const toggleMenu = (btn, menu) => {
        if (!btn || !menu) return;
        const open = menu.dataset.open !== "1";
        closeMenus();
        menu.dataset.open = open ? "1" : "0";
        menu.classList.toggle("hidden", !open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        setRowOpen(btn.closest(".tc-pref-row"), open);
      };
      const applyDensity = (value, persist = true) => {
        const next = densityLabels[value] ? value : "chuan";
        document.documentElement.dataset.density = next;
        if (prefDensityLabel) prefDensityLabel.textContent = densityLabels[next];
        if (persist) {
          try { localStorage.setItem("tc_density", next); } catch (e) {}
        }
      };
      const applyLanguage = (value, persist = true) => {
        const next = langLabels[value] ? value : "vi";
        if (prefLanguageLabel) prefLanguageLabel.textContent = langLabels[next];
        if (persist) {
          try { localStorage.setItem("tc_lang", next); } catch (e) {}
        }
        if (window.tcI18n?.setLang) window.tcI18n.setLang(next);
      };
      const applyShortcuts = (enabled, persist = true) => {
        if (!prefShortcutsBtn) return;
        const next = !!enabled;
        prefShortcutsBtn.setAttribute("aria-pressed", next ? "true" : "false");
        prefShortcutsBtn.textContent = next ? "\u0110ang b\u1eadt" : "\u0110ang t\u1eaft";
        if (shortcutsListWrap) shortcutsListWrap.classList.toggle("hidden", !next);
        if (persist) {
          try { localStorage.setItem("tc_shortcuts", next ? "1" : "0"); } catch (e) {}
        }
      };
      const renderShortcuts = () => {
        if (!shortcutsList) return;
        shortcutsList.innerHTML = "";
        shortcutItems.forEach((item) => {
          const row = document.createElement("div");
          row.className = "tc-card p-4";
          row.innerHTML = `
            <div class="flex items-center justify-between gap-4">
              <div>
                <div class="text-sm font-semibold">${item.key}</div>
                <div class="text-xs tc-muted">${item.action || "Ph\u00edm: " + item.key + " \u2014 H\u00e0nh \u0111\u1ed9ng: (ch\u01b0a m\u00f4 t\u1ea3)"}</div>
              </div>
              <div class="text-[11px] tc-muted">${item.source}</div>
            </div>
          `;
          shortcutsList.appendChild(row);
        });
      };
      const openShortcutsModal = () => {
        if (!shortcutsModal) return;
        renderShortcuts();
        shortcutsModal.classList.remove("hidden");
        shortcutsModal.classList.add("flex");
      };
      const closeShortcutsModal = () => {
        if (!shortcutsModal) return;
        shortcutsModal.classList.add("hidden");
        shortcutsModal.classList.remove("flex");
      };
      const updateToneMenu = (selected) => {
        if (!prefWorldMenu) return;
        prefWorldMenu.querySelectorAll(".tc-menu-item").forEach((item) => {
          const value = item.getAttribute("data-value");
          const isSelected = value === selected;
          item.dataset.selected = isSelected ? "1" : "0";
          item.setAttribute("aria-checked", isSelected ? "true" : "false");
        });
      };
      const applyTone = (value, persist = true, syncWorld = true) => {
        const next = toneLabels[value] ? value : defaultTone;
        document.documentElement.dataset.tone = next;
        document.documentElement.dataset.world = next;
        if (prefWorldLabel) prefWorldLabel.textContent = toneLabels[next];
        updateToneMenu(next);
        if (persist) {
          try { localStorage.setItem("tc_tone", next); } catch (e) {}
        }
        if (syncWorld) {
          window.tcTheme?.applyWorld?.(next);
        } else if (window.tcTheme?.labels) {
          const topbarLabel = document.getElementById("worldLabel");
          if (topbarLabel) topbarLabel.textContent = window.tcTheme.labels[next] || "Origami";
        }
      };
      const syncFromStorage = () => {
        const storedTone = localStorage.getItem("tc_tone");
        const fallbackTone = window.tcTheme?.getWorld?.() || document.documentElement.dataset.world || defaultTone;
        applyTone(storedTone || fallbackTone, false, false);
        const storedDensity = localStorage.getItem("tc_density");
        applyDensity(storedDensity || "chuan", false);
        const storedLang = localStorage.getItem("tc_lang");
        applyLanguage(storedLang || "vi", false);
        const storedShortcuts = localStorage.getItem("tc_shortcuts");
        applyShortcuts(storedShortcuts !== "0", false);
      };

      prefWorldBtn?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        toggleMenu(prefWorldBtn, prefWorldMenu);
      }, true);
      prefLanguageBtn?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        toggleMenu(prefLanguageBtn, prefLanguageMenu);
      }, true);
      prefDensityBtn?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        toggleMenu(prefDensityBtn, prefDensityMenu);
      }, true);
      prefShortcutsBtn?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        const current = prefShortcutsBtn.getAttribute("aria-pressed") === "true";
        applyShortcuts(!current, true);
      }, true);
      shortcutsListBtn?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openShortcutsModal();
      });
      shortcutsClose?.addEventListener("click", (event) => {
        event.preventDefault();
        closeShortcutsModal();
      });
      shortcutsModal?.addEventListener("click", (event) => {
        if (event.target === shortcutsModal) closeShortcutsModal();
      });

      prefWorldMenu?.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-menu-item");
        if (!item || item.disabled) return;
        const value = item.getAttribute("data-value");
        applyTone(value, true, true);
        closeMenus();
      });
      prefLanguageMenu?.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-menu-item");
        if (!item || item.disabled) return;
        const value = item.getAttribute("data-value");
        applyLanguage(value, true);
        closeMenus();
      });
      prefDensityMenu?.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-menu-item");
        if (!item || item.disabled) return;
        const value = item.getAttribute("data-value");
        applyDensity(value, true);
        closeMenus();
      });

      window.addEventListener("tc-world-changed", (event) => {
        const value = event.detail?.world;
        if (value) applyTone(value, true, false);
      });

      document.addEventListener("click", closeMenus);
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeMenus();
          closeShortcutsModal();
        }
      });

      syncFromStorage();
      let syncCount = 0;
      const syncTimer = setInterval(() => {
        syncFromStorage();
        syncCount += 1;
        if (syncCount > 6) clearInterval(syncTimer);
      }, 500);
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden) syncFromStorage();
      });
    })();
  </script>
  <script>
    (() => {
      const returnLink = document.getElementById("returnLink");
      const params = new URLSearchParams(window.location.search);
      const ret = params.get("return");
      if (returnLink) {
        if (ret) {
          returnLink.href = ret;
          returnLink.classList.remove("hidden");
        }
      }
      const links = Array.from(document.querySelectorAll(".account-nav-link"));
      const sections = links
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);
      if (!sections.length) return;
      const setActive = (id) => {
        links.forEach(link => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, { rootMargin: "-30% 0px -55% 0px" });
      sections.forEach(section => observer.observe(section));
    })();
  </script>
</body>
</html>








````

## account.js
````text
import { updateProfile } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  serverTimestamp,
  onSnapshot,
  writeBatch
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const TEXT = {
  authChecking: "\u0110ang ki\u1ec3m tra \u0111\u0103ng nh\u1eadp...",
  loginRequired: "Vui l\u00f2ng \u0111\u0103ng nh\u1eadp \u0111\u1ec3 l\u01b0u h\u1ed3 s\u01a1.",
  loginToSync: "\u0110\u0103ng nh\u1eadp \u0111\u1ec3 \u0111\u1ed3ng b\u1ed9 h\u1ed3 s\u01a1.",
  authNotReady: "Ch\u01b0a s\u1eb5n s\u00e0ng x\u00e1c th\u1ef1c. Vui l\u00f2ng th\u1eed l\u1ea1i.",
  saved: "\u0110\u00e3 l\u01b0u h\u1ed3 s\u01a1.",
  saving: "\u0110ang l\u01b0u...",
  saveFailed: "L\u01b0u kh\u00f4ng th\u00e0nh c\u00f4ng.",
  exportReady: "\u0110\u00e3 t\u1ea1o t\u1ec7p xu\u1ea5t.",
  importInvalid: "T\u1ec7p nh\u1eadp kh\u00f4ng h\u1ee3p l\u1ec7.",
  importReady: "\u0110\u00e3 s\u1eb5n s\u00e0ng nh\u1eadp d\u1eef li\u1ec7u.",
  importDone: "\u0110\u00e3 nh\u1eadp d\u1eef li\u1ec7u.",
  importCancelled: "\u0110\u00e3 hu\u1ef7 nh\u1eadp d\u1eef li\u1ec7u.",
  exportError: "Xu\u1ea5t d\u1eef li\u1ec7u th\u1ea5t b\u1ea1i.",
  importError: "Nh\u1eadp d\u1eef li\u1ec7u th\u1ea5t b\u1ea1i.",
  signOutOtherOk: "\u0110\u00e3 thu h\u1ed3i phi\u00ean tr\u00ean thi\u1ebft b\u1ecb kh\u00e1c.",
  signOutOtherFail: "Kh\u00f4ng thu h\u1ed3i \u0111\u01b0\u1ee3c phi\u00ean.",
  sessionRevoked: "Phi\u00ean n\u00e0y \u0111\u00e3 b\u1ecb thu h\u1ed3i. Vui l\u00f2ng \u0111\u0103ng nh\u1eadp l\u1ea1i.",
  requireLogin: "C\u1ea7n \u0111\u0103ng nh\u1eadp \u0111\u1ec3 ti\u1ebfp t\u1ee5c.",
  resetPasswordSent: "\u0110\u00e3 g\u1eedi email \u0111\u1eb7t l\u1ea1i m\u1eadt kh\u1ea9u.",
  resetPasswordFail: "Kh\u00f4ng g\u1eedi \u0111\u01b0\u1ee3c email \u0111\u1eb7t l\u1ea1i m\u1eadt kh\u1ea9u.",
  comingSoon: "T\u00ednh n\u0103ng n\u00e0y s\u1ebd s\u1edbm c\u00f3.",
  loginToSave: "\u0110\u0103ng nh\u1eadp \u0111\u1ec3 l\u01b0u",
  confirmTitle: "X\u00e1c nh\u1eadn thao t\u00e1c",
  confirmImport: "Ch\u1ecdn ch\u1ebf \u0111\u1ed9 nh\u1eadp d\u1eef li\u1ec7u.",
  confirmMerge: "G\u1ed9p d\u1eef li\u1ec7u",
  confirmOverwrite: "Ghi \u0111\u00e8 d\u1eef li\u1ec7u",
  confirmAccept: "X\u00e1c nh\u1eadn",
  confirmCancel: "Hu\u1ef7",
  confirmRevoke: "Thu h\u1ed3i phi\u00ean tr\u00ean thi\u1ebft b\u1ecb kh\u00e1c?",
  confirmRevokeDetail: "Thi\u1ebft b\u1ecb kh\u00e1c s\u1ebd b\u1ecb y\u00eau c\u1ea7u \u0111\u0103ng nh\u1eadp l\u1ea1i.",
  syncNowOk: "\u0110\u00e3 \u0111\u1ed3ng b\u1ed9.",
  syncNowFail: "\u0110\u1ed3ng b\u1ed9 kh\u00f4ng th\u00e0nh c\u00f4ng.",
  syncDisabled: "\u0110ang t\u1eaft \u0111\u1ed3ng b\u1ed9."
};

const PREF_WORLD = [
  { key: "origami", label: "Origami" },
  { key: "nebula", label: "Tinh v\u00e2n" },
  { key: "ocean", label: "\u0110\u1ea1i d\u01b0\u01a1ng" },
  { key: "ink", label: "M\u1ef1c t\u00e0u" },
  { key: "arcade", label: "Arcade" },
  { key: "dunes", label: "\u0110\u1ed3i c\u00e1t" },
  { key: "chrome", label: "Chrome" },
  { key: "circuit", label: "M\u1ea1ch \u0111i\u1ec7n" }
];
const PREF_LANGUAGE = [
  { key: "vi", label: "Ti\u1ebfng Vi\u1ec7t" },
  { key: "en", label: "English" }
];
const PREF_DENSITY = [
  { key: "standard", label: "Chu\u1ea9n" },
  { key: "compact", label: "G\u1ecdn" },
  { key: "relaxed", label: "R\u1ed9ng" }
];

const state = {
  currentUser: null,
  authResolved: false,
  api: null,
  db: null,
  userDoc: null,
  userData: {},
  saveTimer: null,
  saveQueue: {},
  sessionVersion: 0,
  unsubSession: null,
  pendingImport: null
};

const el = (id) => document.getElementById(id);

const OVERVIEW_CACHE_KEY = "tc_account_overview_cache";
const OVERVIEW_CACHE_TTL = 60000;
const OVERVIEW_LOADING_MIN = 300;
const OVERVIEW_LOADING_MAX = 600;

function setProfileStatus(message, isError = false) {
  const status = el("profileStatus");
  if (!status) return;
  status.textContent = message || "";
  status.classList.toggle("text-red-500", isError);
}

function showToast(message, type = "info") {
  const container = el("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "tc-card px-4 py-3 text-sm font-semibold shadow-lg";
  toast.textContent = message;
  if (type === "error") {
    toast.classList.add("text-red-600");
  }
  if (type === "success") {
    toast.classList.add("text-emerald-600");
  }
  container.appendChild(toast);
  setTimeout(() => toast.classList.add("opacity-0"), 2400);
  setTimeout(() => toast.remove(), 3000);
}

function openConfirm({ title, message, okLabel, cancelLabel, onOk, onCancel, onDismiss }) {
  const modal = el("confirmModal");
  const titleEl = el("confirmTitle");
  const msgEl = el("confirmMessage");
  const btnOk = el("btnConfirmOk");
  const btnCancel = el("btnConfirmCancel");
  if (!modal || !btnOk || !btnCancel) return;
  if (titleEl) titleEl.textContent = title || TEXT.confirmTitle;
  if (msgEl) msgEl.textContent = message || "";
  btnOk.textContent = okLabel || TEXT.confirmOverwrite;
  btnCancel.textContent = cancelLabel || TEXT.confirmCancel;
  const close = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };
  const cleanup = () => {
    btnOk.onclick = null;
    btnCancel.onclick = null;
    modal.onclick = null;
    document.onkeydown = null;
  };
  btnOk.onclick = () => {
    close();
    cleanup();
    if (typeof onOk === "function") onOk();
  };
  btnCancel.onclick = () => {
    close();
    cleanup();
    if (typeof onCancel === "function") onCancel();
  };
  modal.onclick = (evt) => {
    if (evt.target === modal) {
      close();
      cleanup();
      if (typeof onDismiss === "function") onDismiss();
    }
  };
  document.onkeydown = (evt) => {
    if (evt.key === "Escape") {
      close();
      cleanup();
      if (typeof onDismiss === "function") onDismiss();
    }
  };
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function waitForAuthApi(timeoutMs = 4000) {
  return new Promise((resolve) => {
    if (window.firebaseAuth) return resolve(window.firebaseAuth);
    const timer = setTimeout(() => resolve(window.firebaseAuth || null), timeoutMs);
    window.addEventListener("firebase-auth-ready", () => {
      clearTimeout(timer);
      resolve(window.firebaseAuth || null);
    }, { once: true });
  });
}

function getLocalSessionKey(uid) {
  return `tc_session_version_${uid}`;
}

function setAuthGuard(loggedIn) {
  const gate = el("accountAuthGate");
  const btnLogin = el("btnAccountLogin");
  if (!gate || !btnLogin) return;
  gate.classList.toggle("hidden", loggedIn);
  btnLogin.onclick = () => window.tcAuth?.openAuth?.();
}

function disableSave(disabled) {
  const btnSave = el("btnProfileSave");
  if (!btnSave) return;
  btnSave.disabled = !!disabled;
  btnSave.classList.toggle("opacity-60", !!disabled);
  btnSave.classList.toggle("cursor-not-allowed", !!disabled);
}

function renderAuthState() {
  if (!state.authResolved) {
    setProfileStatus(TEXT.authChecking);
    disableSave(true);
    setAuthGuard(false);
    return;
  }
  if (!state.currentUser) {
    setProfileStatus(TEXT.loginRequired, true);
    disableSave(true);
    setAuthGuard(false);
    return;
  }
  setProfileStatus("");
  disableSave(false);
  setAuthGuard(true);
}

function setButtonValue(button, value, mapping) {
  if (!button) return;
  const match = mapping.find((item) => item.key === value) || mapping[0];
  button.dataset.value = match.key;
  button.textContent = match.label;
}

function nextButtonValue(button, mapping) {
  if (!button) return mapping[0].key;
  const current = button.dataset.value || mapping[0].key;
  const idx = mapping.findIndex((item) => item.key === current);
  const next = mapping[(idx + 1) % mapping.length];
  setButtonValue(button, next.key, mapping);
  return next.key;
}

function setToggle(button, value, labels) {
  if (!button) return;
  const next = !!value;
  button.setAttribute("aria-pressed", next ? "true" : "false");
  button.textContent = next ? labels.on : labels.off;
}

function setButtonDisabled(button, disabled) {
  if (!button) return;
  button.disabled = !!disabled;
  button.classList.toggle("opacity-60", !!disabled);
  button.classList.toggle("cursor-not-allowed", !!disabled);
}

function setQuickSyncToggle(enabled) {
  const btn = el("btnQuickSyncToggle");
  if (!btn) return;
  btn.textContent = enabled ? "T\u1eaft \u0111\u1ed3ng b\u1ed9" : "B\u1eadt \u0111\u1ed3ng b\u1ed9";
}

function updateSyncControls(enabled, persist = false) {
  setToggle(el("btnSyncToggle"), enabled, { on: "\u0110ang b\u1eadt", off: "\u0110ang t\u1eaft" });
  setQuickSyncToggle(enabled);
  if (persist) {
    setLocalValue("data.sync", enabled);
    scheduleSave("data.sync", enabled);
  }
}

function setOverviewState(card, config) {
  if (!card) return;
  const pill = card.querySelector("[data-role=\"pill\"]");
  const value = card.querySelector("[data-role=\"value\"]");
  const sub = card.querySelector("[data-role=\"sub\"]");
  const state = config.state || "ok";
  card.classList.remove("is-loading");
  if (pill) {
    pill.textContent = config.pill || "";
    pill.classList.toggle("is-warning", state === "warning");
    pill.classList.toggle("is-error", state === "error");
  }
  if (value && config.value) value.textContent = config.value;
  if (sub && config.sub) sub.textContent = config.sub;
}

function setOverviewLoading(loading) {
  const cards = Array.from(document.querySelectorAll("[data-overview-card=\"1\"]"));
  cards.forEach((card) => card.classList.toggle("is-loading", !!loading));
}

function parseTimestamp(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (typeof value.toDate === "function") return value.toDate();
  if (typeof value.seconds === "number") return new Date(value.seconds * 1000);
  return null;
}

function formatDateTime(value) {
  const date = parseTimestamp(value);
  if (!date) return "";
  return date.toLocaleString("vi-VN");
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

function getOverviewCache() {
  try {
    const raw = sessionStorage.getItem(OVERVIEW_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

function setOverviewCache(payload) {
  try {
    sessionStorage.setItem(OVERVIEW_CACHE_KEY, JSON.stringify({
      ts: Date.now(),
      payload
    }));
  } catch (err) {}
}

async function getAccountOverview(options = {}) {
  const force = options.force === true;
  if (!state.currentUser) {
    return {
      state: "warning",
      syncEnabled: false,
      cards: [
        {
          state: "warning",
          pill: "Ch\u01b0a \u0111\u0103ng nh\u1eadp",
          value: "C\u1ea7n \u0111\u0103ng nh\u1eadp",
          sub: "\u0110\u0103ng nh\u1eadp \u0111\u1ec3 \u0111\u1ed3ng b\u1ed9 h\u1ed3 s\u01a1"
        },
        {
          state: "warning",
          pill: "Ch\u01b0a c\u00f3 d\u1eef li\u1ec7u",
          value: "0 b\u1ea3n l\u01b0u",
          sub: "Ch\u01b0a c\u00f3 d\u1ef1 \u00e1n theo d\u00f5i"
        },
        {
          state: "warning",
          pill: "\u0110ang t\u1eaft",
          value: "\u0110ang t\u1eaft",
          sub: "\u0110\u0103ng nh\u1eadp \u0111\u1ec3 b\u1eadt \u0111\u1ed3ng b\u1ed9"
        },
        {
          state: "warning",
          pill: "Ch\u01b0a c\u00f3",
          value: "0 ho\u1ea1t \u0111\u1ed9ng",
          sub: "Ch\u01b0a c\u00f3 ho\u1ea1t \u0111\u1ed9ng h\u00f4m nay"
        }
      ]
    };
  }

  const cached = getOverviewCache();
  if (!force && cached && typeof cached.ts === "number" && cached.payload) {
    if (Date.now() - cached.ts < OVERVIEW_CACHE_TTL) {
      return cached.payload;
    }
  }

  if (!state.db) {
    return {
      state: "warning",
      syncEnabled: false,
      cards: [
        {
          state: "warning",
          pill: "Gi\u1edbi h\u1ea1n",
          value: "Ch\u01b0a s\u1eb5n s\u00e0ng",
          sub: "Ch\u01b0a k\u1ebft n\u1ed1i \u0111\u1ebfn d\u1eef li\u1ec7u"
        },
        {
          state: "warning",
          pill: "Ch\u01b0a c\u00f3 d\u1eef li\u1ec7u",
          value: "0 b\u1ea3n l\u01b0u",
          sub: "Ch\u01b0a c\u00f3 d\u1ef1 \u00e1n theo d\u00f5i"
        },
        {
          state: "warning",
          pill: "\u0110ang t\u1eaft",
          value: "\u0110ang t\u1eaft",
          sub: "K\u00edch ho\u1ea1t k\u1ebft n\u1ed1i \u0111\u1ec3 \u0111\u1ed3ng b\u1ed9"
        },
        {
          state: "warning",
          pill: "Ch\u01b0a c\u00f3",
          value: "0 ho\u1ea1t \u0111\u1ed9ng",
          sub: "Ch\u01b0a c\u00f3 ho\u1ea1t \u0111\u1ed9ng h\u00f4m nay"
        }
      ]
    };
  }

  let savedSearches = [];
  try {
    const searchesCol = collection(state.db, "users", state.currentUser.uid, "savedSearches");
    const searchSnap = await getDocs(searchesCol);
    savedSearches = searchSnap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
  } catch (err) {
    console.error("overview savedSearches", err);
    return {
      state: "error",
      syncEnabled: false,
      cards: [
        {
          state: "error",
          pill: "M\u1ea5t k\u1ebft n\u1ed1i",
          value: "Kh\u00f4ng t\u1ea3i \u0111\u01b0\u1ee3c",
          sub: "Ki\u1ec3m tra l\u1ea1i k\u1ebft n\u1ed1i"
        },
        {
          state: "error",
          pill: "L\u1ed7i d\u1eef li\u1ec7u",
          value: "Kh\u00f4ng \u0111\u1ecdc \u0111\u01b0\u1ee3c",
          sub: "Th\u1eed l\u1ea1i sau"
        },
        {
          state: "warning",
          pill: "\u0110ang t\u1eaft",
          value: "\u0110ang t\u1eaft",
          sub: "Ch\u01b0a k\u1ebft n\u1ed1i \u0111\u1ed3ng b\u1ed9"
        },
        {
          state: "warning",
          pill: "Ch\u01b0a c\u00f3",
          value: "0 ho\u1ea1t \u0111\u1ed9ng",
          sub: "Ch\u01b0a c\u00f3 ho\u1ea1t \u0111\u1ed9ng h\u00f4m nay"
        }
      ]
    };
  }

  const profile = state.userData.profile || {};
  const dataConfig = state.userData.data || {};
  const projects = Array.isArray(state.userData.projects)
    ? state.userData.projects
    : Array.isArray(dataConfig.projects)
      ? dataConfig.projects
      : [];
  const syncEnabled = dataConfig.sync !== false;
  const lastSyncAt = dataConfig.lastSyncAt || state.userData.capNhatLuc || null;
  const today = new Date();
  const activityToday = savedSearches.reduce((total, item) => {
    const when = parseTimestamp(item.updatedAt || item.updated_at || item.createdAt || item.created_at);
    return when && isSameDay(when, today) ? total + 1 : total;
  }, 0);
  const savedSearchCount = savedSearches.length;
  const projectCount = projects.length;
  const displayName = profile.displayName || state.currentUser.displayName || "B\u1ea1n";
  const lastSyncLabel = formatDateTime(lastSyncAt);
  const lastSyncSub = lastSyncLabel ? `L\u1ea7n g\u1ea7n nh\u1ea5t: ${lastSyncLabel}` : "Ch\u01b0a c\u00f3 l\u1ea7n \u0111\u1ed3ng b\u1ed9";

  const overview = {
    state: "ok",
    syncEnabled,
    cards: [
      {
        state: "ok",
        pill: "\u0110ang k\u1ebft n\u1ed1i",
        value: `Ch\u00e0o ${displayName}`,
        sub: "Phi\u00ean \u0111ang ho\u1ea1t \u0111\u1ed9ng"
      },
      {
        state: savedSearchCount ? "ok" : "warning",
        pill: savedSearchCount ? "\u0110\u1ee7 d\u1eef li\u1ec7u" : "Ch\u01b0a c\u00f3",
        value: `${savedSearchCount} b\u1ea3n l\u01b0u`,
        sub: projectCount ? `${projectCount} d\u1ef1 \u00e1n \u0111ang theo d\u00f5i` : "Ch\u01b0a c\u00f3 d\u1ef1 \u00e1n theo d\u00f5i"
      },
      {
        state: syncEnabled ? "ok" : "warning",
        pill: syncEnabled ? "\u0110ang b\u1eadt" : "\u0110ang t\u1eaft",
        value: syncEnabled ? "\u0110ang b\u1eadt" : "\u0110ang t\u1eaft",
        sub: lastSyncSub
      },
      {
        state: activityToday ? "ok" : "warning",
        pill: activityToday ? "M\u1edbi" : "Y\u00ean \u1eafng",
        value: `${activityToday} ho\u1ea1t \u0111\u1ed9ng`,
        sub: activityToday ? "C\u1eadp nh\u1eadt h\u00f4m nay" : "Ch\u01b0a c\u00f3 ho\u1ea1t \u0111\u1ed9ng h\u00f4m nay"
      }
    ]
  };
  setOverviewCache(overview);
  return overview;
}

function renderOverview(payload) {
  const cards = Array.from(document.querySelectorAll("[data-overview-card=\"1\"]"));
  cards.forEach((card, idx) => setOverviewState(card, payload.cards[idx] || payload.cards[0]));
  const syncEnabled = payload.syncEnabled;
  setQuickSyncToggle(syncEnabled);
  setButtonDisabled(el("btnQuickSyncNow"), !state.currentUser || !syncEnabled);
  setButtonDisabled(el("btnQuickSyncToggle"), !state.currentUser);
  setButtonDisabled(el("btnQuickRetry"), !state.currentUser);
}

async function refreshOverview(options = {}) {
  const delay = OVERVIEW_LOADING_MIN + Math.floor(Math.random() * (OVERVIEW_LOADING_MAX - OVERVIEW_LOADING_MIN + 1));
  setOverviewLoading(true);
  const start = Date.now();
  const payload = await getAccountOverview(options);
  const elapsed = Date.now() - start;
  const wait = Math.max(0, delay - elapsed);
  setTimeout(() => {
    setOverviewLoading(false);
    renderOverview(payload);
  }, wait);
}

function bindInputs() {
  const inputMap = [
    { id: "profileDisplayName", path: "profile.displayName" },
    { id: "profilePhotoUrl", path: "profile.photoURL" },
    { id: "profileOrgUnit", path: "profile.orgUnit" },
    { id: "profileGoal", path: "profile.goal" }
  ];
  inputMap.forEach(({ id, path }) => {
    const input = el(id);
    if (!input) return;
    input.addEventListener("input", () => {
      setLocalValue(path, input.value);
      scheduleSave(path, input.value);
    });
  });
}

function setLocalValue(path, value) {
  const parts = path.split(".");
  let target = state.userData;
  parts.forEach((part, idx) => {
    if (idx === parts.length - 1) {
      target[part] = value;
    } else {
      target[part] = target[part] || {};
      target = target[part];
    }
  });
}

function getLocalValue(path, fallback = "") {
  const parts = path.split(".");
  let target = state.userData;
  for (const part of parts) {
    if (!target || typeof target !== "object") return fallback;
    target = target[part];
  }
  return target ?? fallback;
}

function scheduleSave(path, value) {
  state.saveQueue[path] = value;
  if (state.saveTimer) clearTimeout(state.saveTimer);
  state.saveTimer = setTimeout(() => flushSaveQueue(), 700);
}

async function flushSaveQueue() {
  const queue = { ...state.saveQueue };
  state.saveQueue = {};
  if (!Object.keys(queue).length) return;
  await saveUserData(queue, true);
}

function buildPatch(queue) {
  const patch = {};
  Object.entries(queue).forEach(([path, value]) => {
    const parts = path.split(".");
    let target = patch;
    parts.forEach((part, idx) => {
      if (idx === parts.length - 1) {
        target[part] = value;
      } else {
        target[part] = target[part] || {};
        target = target[part];
      }
    });
  });
  return patch;
}

async function saveUserData(queue, silent = false) {
  if (!state.currentUser || !state.db) return;
  if (!silent) setProfileStatus(TEXT.saving);
  try {
    const patch = buildPatch(queue);
    await setDoc(state.userDoc, {
      ...patch,
      capNhatLuc: serverTimestamp()
    }, { merge: true });
    if (!silent) setProfileStatus(TEXT.saved);
  } catch (err) {
    console.error("saveUserData", err);
    if (!silent) setProfileStatus(TEXT.saveFailed, true);
  }
}

async function saveProfile() {
  if (!state.authResolved) {
    showToast(TEXT.authChecking);
    return;
  }
  if (!state.currentUser) {
    showToast(TEXT.requireLogin);
    window.tcAuth?.openAuth?.();
    return;
  }
  const displayName = el("profileDisplayName")?.value || "";
  const photoURL = el("profilePhotoUrl")?.value || "";
  const patch = {
    "profile.displayName": displayName,
    "profile.photoURL": photoURL,
    "profile.orgUnit": el("profileOrgUnit")?.value || "",
    "profile.goal": el("profileGoal")?.value || ""
  };
  try {
    await updateProfile(state.currentUser, { displayName, photoURL });
  } catch (err) {
    console.warn("updateProfile", err);
  }
  await saveUserData(patch, false);
}

async function loadUserData() {
  if (!state.currentUser || !state.db) return;
  state.userDoc = doc(state.db, "users", state.currentUser.uid);
  const snapshot = await getDoc(state.userDoc);
  state.userData = snapshot.exists() ? (snapshot.data() || {}) : {};
  hydrateForm();
  refreshOverview({ force: true });
  setupSessionWatch();
}

function hydrateForm() {
  const profile = state.userData.profile || {};
  const prefs = state.userData.prefs || {};
  const privacy = state.userData.privacy || {};
  const data = state.userData.data || {};
  const displayName = profile.displayName || state.currentUser?.displayName || "";
  const photoURL = profile.photoURL || state.currentUser?.photoURL || "";
  const orgUnit = profile.orgUnit || "";
  const goal = profile.goal || "";
  if (el("profileDisplayName")) el("profileDisplayName").value = displayName;
  if (el("profilePhotoUrl")) el("profilePhotoUrl").value = photoURL;
  if (el("profileOrgUnit")) el("profileOrgUnit").value = orgUnit;
  if (el("profileGoal")) el("profileGoal").value = goal;

  setButtonValue(el("btnPrefWorld"), prefs.world || "origami", PREF_WORLD);
  setButtonValue(el("btnPrefLanguage"), prefs.language || "vi", PREF_LANGUAGE);
  setButtonValue(el("btnPrefDensity"), prefs.density || "standard", PREF_DENSITY);
  setToggle(el("btnPrefShortcutsToggle"), prefs.shortcuts !== false, { on: "\u0110ang b\u1eadt", off: "\u0110ang t\u1eaft" });
  updateSyncControls(data.sync !== false, false);

  setToggle(el("btnPrivacyTelemetryToggle"), privacy.telemetry !== false, { on: "\u0110ang b\u1eadt", off: "\u0110ang t\u1eaft" });
  setToggle(el("btnPrivacyReadonlyToggle"), !!privacy.readOnly, { on: "\u0110ang b\u1eadt", off: "\u0110ang t\u1eaft" });
  setToggle(el("btnPrivacyAnonymousToggle"), !!privacy.anonymous, { on: "\u0110ang b\u1eadt", off: "Kh\u00f4ng k\u00edch ho\u1ea1t" });
}

function bindButtons() {
  el("btnProfileSave")?.addEventListener("click", saveProfile);
  el("btnPasswordAction")?.addEventListener("click", async () => {
    const email = state.currentUser?.email;
    if (!email) return showToast(TEXT.requireLogin);
    try {
      await state.api?.resetPassword?.(email);
      showToast(TEXT.resetPasswordSent, "success");
    } catch (err) {
      console.error(err);
      showToast(TEXT.resetPasswordFail, "error");
    }
  });
  el("btnSignOutAllDevices")?.addEventListener("click", () => {
    openConfirm({
      title: TEXT.confirmTitle,
      message: `${TEXT.confirmRevoke} ${TEXT.confirmRevokeDetail}`,
      okLabel: TEXT.confirmAccept,
      cancelLabel: TEXT.confirmCancel,
      onOk: () => revokeOtherSessions()
    });
  });
  document.querySelector("#section-logout #btnLogout")?.addEventListener("click", async () => {
    await state.api?.signOutUser?.();
  });
  el("btnAccountLogin")?.addEventListener("click", () => window.tcAuth?.openAuth?.());

  el("btnPrefWorld")?.addEventListener("click", () => {
    const value = nextButtonValue(el("btnPrefWorld"), PREF_WORLD);
    setLocalValue("prefs.world", value);
    scheduleSave("prefs.world", value);
  });
  el("btnPrefLanguage")?.addEventListener("click", () => {
    const value = nextButtonValue(el("btnPrefLanguage"), PREF_LANGUAGE);
    setLocalValue("prefs.language", value);
    scheduleSave("prefs.language", value);
  });
  el("btnPrefDensity")?.addEventListener("click", () => {
    const value = nextButtonValue(el("btnPrefDensity"), PREF_DENSITY);
    setLocalValue("prefs.density", value);
    scheduleSave("prefs.density", value);
  });
  el("btnPrefShortcutsToggle")?.addEventListener("click", () => {
    const current = el("btnPrefShortcutsToggle")?.getAttribute("aria-pressed") === "true";
    const next = !current;
    setToggle(el("btnPrefShortcutsToggle"), next, { on: "\u0110ang b\u1eadt", off: "\u0110ang t\u1eaft" });
    setLocalValue("prefs.shortcuts", next);
    scheduleSave("prefs.shortcuts", next);
  });
  el("btnSyncToggle")?.addEventListener("click", () => {
    const current = el("btnSyncToggle")?.getAttribute("aria-pressed") === "true";
    const next = !current;
    updateSyncControls(next, true);
    refreshOverview({ force: true });
  });
  el("btnPrivacyTelemetryToggle")?.addEventListener("click", () => {
    const current = el("btnPrivacyTelemetryToggle")?.getAttribute("aria-pressed") === "true";
    const next = !current;
    setToggle(el("btnPrivacyTelemetryToggle"), next, { on: "\u0110ang b\u1eadt", off: "\u0110ang t\u1eaft" });
    setLocalValue("privacy.telemetry", next);
    scheduleSave("privacy.telemetry", next);
  });
  el("btnPrivacyReadonlyToggle")?.addEventListener("click", () => {
    const current = el("btnPrivacyReadonlyToggle")?.getAttribute("aria-pressed") === "true";
    const next = !current;
    setToggle(el("btnPrivacyReadonlyToggle"), next, { on: "\u0110ang b\u1eadt", off: "\u0110ang t\u1eaft" });
    setLocalValue("privacy.readOnly", next);
    scheduleSave("privacy.readOnly", next);
  });
  el("btnPrivacyAnonymousToggle")?.addEventListener("click", () => {
    const current = el("btnPrivacyAnonymousToggle")?.getAttribute("aria-pressed") === "true";
    const next = !current;
    setToggle(el("btnPrivacyAnonymousToggle"), next, { on: "\u0110ang b\u1eadt", off: "Kh\u00f4ng k\u00edch ho\u1ea1t" });
    setLocalValue("privacy.anonymous", next);
    scheduleSave("privacy.anonymous", next);
  });

  el("btnExportJson")?.addEventListener("click", () => exportData("json"));
  el("btnExportCsv")?.addEventListener("click", () => exportData("csv"));
  el("btnImportFile")?.addEventListener("click", () => el("accountImportInput")?.click());
  el("accountImportInput")?.addEventListener("change", handleImportFile);

  el("btnBackupCreate")?.addEventListener("click", () => showToast(TEXT.comingSoon));
  el("btnBackupRestore")?.addEventListener("click", () => showToast(TEXT.comingSoon));
  el("btnSupportFeedback")?.addEventListener("click", () => showToast(TEXT.comingSoon));
  el("btnSupportContact")?.addEventListener("click", () => showToast(TEXT.comingSoon));

  el("btnQuickSyncNow")?.addEventListener("click", handleSyncNow);
  el("btnQuickSyncToggle")?.addEventListener("click", () => {
    const current = el("btnSyncToggle")?.getAttribute("aria-pressed") === "true";
    updateSyncControls(!current, true);
    refreshOverview({ force: true });
  });
  el("btnQuickRetry")?.addEventListener("click", () => refreshOverview({ force: true }));
}

function setupSessionWatch() {
  if (!state.userDoc || !state.currentUser) return;
  const uid = state.currentUser.uid;
  const storageKey = getLocalSessionKey(uid);
  const localVersion = Number(localStorage.getItem(storageKey) || "0");
  const docVersion = Number(state.userData.sessionVersion || 0);
  state.sessionVersion = Math.max(localVersion, docVersion);
  localStorage.setItem(storageKey, String(state.sessionVersion));
  if (state.unsubSession) state.unsubSession();
  state.unsubSession = onSnapshot(state.userDoc, (snap) => {
    const remoteVersion = Number(snap.data()?.sessionVersion || 0);
    if (remoteVersion > state.sessionVersion) {
      localStorage.setItem(storageKey, String(remoteVersion));
      state.sessionVersion = remoteVersion;
      showToast(TEXT.sessionRevoked, "error");
      state.api?.signOutUser?.();
    }
  });
}

async function revokeOtherSessions() {
  if (!state.currentUser || !state.userDoc) return showToast(TEXT.requireLogin, "error");
  try {
    const nextVersion = (state.sessionVersion || 0) + 1;
    state.sessionVersion = nextVersion;
    localStorage.setItem(getLocalSessionKey(state.currentUser.uid), String(nextVersion));
    await setDoc(state.userDoc, {
      sessionVersion: nextVersion,
      capNhatLuc: serverTimestamp()
    }, { merge: true });
    showToast(TEXT.signOutOtherOk, "success");
  } catch (err) {
    console.error(err);
    showToast(TEXT.signOutOtherFail, "error");
  }
}

function buildExportObject(savedSearches) {
  return {
    profile: state.userData.profile || {},
    prefs: state.userData.prefs || {},
    privacy: state.userData.privacy || {},
    data: state.userData.data || {},
    savedSearches
  };
}

function downloadFile(name, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function toCsv(items) {
  if (!items.length) return "id\n";
  const keys = new Set();
  items.forEach((item) => Object.keys(item).forEach((k) => keys.add(k)));
  const columns = ["id", ...Array.from(keys).filter((k) => k !== "id")];
  const escape = (value) => {
    const text = value == null ? "" : String(value);
    if (/[\",\\n]/.test(text)) return `\"${text.replace(/\"/g, '\"\"')}\"`;
    return text;
  };
  const lines = [columns.join(",")];
  items.forEach((item) => {
    const row = columns.map((col) => escape(item[col]));
    lines.push(row.join(","));
  });
  return lines.join("\n");
}

async function exportData(type) {
  if (!state.currentUser || !state.db) return showToast(TEXT.requireLogin, "error");
  try {
    const searchesCol = collection(state.db, "users", state.currentUser.uid, "savedSearches");
    const searchSnap = await getDocs(searchesCol);
    const savedSearches = searchSnap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
    const payload = buildExportObject(savedSearches);
    if (type === "json") {
      downloadFile("account-export.json", JSON.stringify(payload, null, 2), "application/json");
      showToast(TEXT.exportReady, "success");
      return;
    }
    const csv = toCsv(savedSearches);
    downloadFile("account-saved-searches.csv", csv, "text/csv");
    showToast(TEXT.exportReady, "success");
  } catch (err) {
    console.error(err);
    showToast(TEXT.exportError, "error");
  }
}

function handleImportFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!data || typeof data !== "object") throw new Error("invalid");
      const savedSearches = Array.isArray(data.savedSearches) ? data.savedSearches : [];
      state.pendingImport = { ...data, savedSearches };
      showToast(TEXT.importReady, "success");
      openConfirm({
        title: TEXT.confirmTitle,
        message: `${TEXT.confirmImport} (${savedSearches.length} m\u1ee5c \u0111\u00e3 l\u01b0u)`,
        okLabel: TEXT.confirmMerge,
        cancelLabel: TEXT.confirmOverwrite,
        onOk: () => applyImport("merge"),
        onCancel: () => applyImport("overwrite"),
        onDismiss: () => {
          state.pendingImport = null;
          showToast(TEXT.importCancelled);
        }
      });
    } catch (err) {
      console.error(err);
      showToast(TEXT.importInvalid, "error");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

async function applyImport(mode) {
  if (!state.pendingImport) return;
  if (!state.currentUser || !state.db) return showToast(TEXT.requireLogin, "error");
  try {
    const { profile, prefs, privacy, data, savedSearches } = state.pendingImport;
    const patch = {};
    if (profile && typeof profile === "object") patch.profile = profile;
    if (prefs && typeof prefs === "object") patch.prefs = prefs;
    if (privacy && typeof privacy === "object") patch.privacy = privacy;
    if (data && typeof data === "object") patch.data = data;
    if (Object.keys(patch).length) {
      await setDoc(state.userDoc, patch, { merge: true });
    }
    if (Array.isArray(savedSearches)) {
      const colRef = collection(state.db, "users", state.currentUser.uid, "savedSearches");
      if (mode === "overwrite") {
        const existing = await getDocs(colRef);
        const batch = writeBatch(state.db);
        existing.docs.forEach((docSnap) => batch.delete(docSnap.ref));
        await batch.commit();
      }
      const batch = writeBatch(state.db);
      savedSearches.forEach((item) => {
        const clean = { ...item };
        const id = clean.id;
        delete clean.id;
        if (id) {
          batch.set(doc(colRef, id), clean, { merge: mode === "merge" });
        }
      });
      await batch.commit();
      for (const item of savedSearches) {
        if (!item.id) {
          await setDoc(doc(colRef), item, { merge: true });
        }
      }
    }
    state.pendingImport = null;
    showToast(TEXT.importDone, "success");
  } catch (err) {
    console.error(err);
    showToast(TEXT.importError, "error");
  }
}

async function handleSyncNow() {
  if (!state.currentUser || !state.userDoc) {
    showToast(TEXT.requireLogin, "error");
    return;
  }
  const syncEnabled = getLocalValue("data.sync", true) !== false;
  if (!syncEnabled) {
    showToast(TEXT.syncDisabled, "error");
    return;
  }
  try {
    await setDoc(state.userDoc, {
      data: {
        lastSyncAt: serverTimestamp(),
        sync: true
      },
      capNhatLuc: serverTimestamp()
    }, { merge: true });
    setLocalValue("data.lastSyncAt", new Date().toISOString());
    showToast(TEXT.syncNowOk, "success");
    refreshOverview({ force: true });
  } catch (err) {
    console.error(err);
    showToast(TEXT.syncNowFail, "error");
  }
}

async function init() {
  setProfileStatus(TEXT.authChecking);
  disableSave(true);
  state.api = await waitForAuthApi();
  if (!state.api || state.api.initError) {
    console.error("firebaseAuth not ready", state.api?.initError);
    showToast(TEXT.authNotReady, "error");
    return;
  }
  state.db = state.api.db || state.api.firestore || null;
  bindInputs();
  bindButtons();
  refreshOverview({ force: true });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refreshOverview();
  });
  state.api.onAuthStateChanged(async (user) => {
    state.currentUser = user || null;
    state.authResolved = true;
    renderAuthState();
    if (user) {
      await loadUserData();
    } else {
      state.userData = {};
      if (state.unsubSession) state.unsubSession();
      refreshOverview({ force: true });
    }
  });
}

document.addEventListener("DOMContentLoaded", init);


````

## admin.html
````text
<!DOCTYPE html>
<html lang="vi" data-world="origami">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bảng điều phối quản trị</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root{
      --z-topbar: 2000;
      --z-topbar-menu: 4000;
      --bg: #f6f1e9;
      --text: #201a14;
      --muted: #6b5d4b;
      --glass: rgba(255, 255, 255, 0.72);
      --stroke: rgba(32, 26, 20, 0.10);
      --a1: #c27b4b;
      --a2: #d59e6d;
      --a3: #8c6d54;
    }
    html[data-world="nebula"]{
      --bg:#040512;
      --text:#eef2ff;
      --muted:#b8c2ff;
      --glass:rgba(12,16,34,0.72);
      --stroke:rgba(255,255,255,0.14);
      --a1:#6ee7ff;
      --a2:#8b5cf6;
      --a3:#f472b6;
    }
    html[data-world="ocean"]{
      --bg:#dff6ff;
      --text:#062a3a;
      --muted:#3f6b7f;
      --glass:rgba(255,255,255,0.76);
      --stroke:rgba(6,42,58,0.12);
      --a1:#1fb6ff;
      --a2:#0ea5a8;
      --a3:#4dd4ff;
    }
    html[data-world="ink"]{
      --bg:#0b0d12;
      --text:#f4f6fb;
      --muted:#a6afbd;
      --glass:rgba(16,18,24,0.76);
      --stroke:rgba(255,255,255,0.12);
      --a1:#e2e8f0;
      --a2:#94a3b8;
      --a3:#64748b;
    }
    html[data-world="origami"]{
      --bg:#f6f1e9;
      --text:#201a14;
      --muted:#6b5d4b;
      --glass:rgba(255,255,255,0.74);
      --stroke:rgba(32,26,20,0.10);
      --a1:#c27b4b;
      --a2:#d59e6d;
      --a3:#8c6d54;
    }
    html[data-world="arcade"]{
      --bg:#05040f;
      --text:#fff7ff;
      --muted:#d8c9f6;
      --glass:rgba(14,12,28,0.80);
      --stroke:rgba(255,255,255,0.16);
      --a1:#ff3dcd;
      --a2:#7c3aed;
      --a3:#20e3b2;
    }
    html[data-world="dunes"]{
      --bg:#f7f0e1;
      --text:#3a2d1a;
      --muted:#7a644a;
      --glass:rgba(255,255,255,0.74);
      --stroke:rgba(58,45,26,0.12);
      --a1:#d39b54;
      --a2:#e3b87b;
      --a3:#b3743d;
    }
    html[data-world="chrome"]{
      --bg:#f1f4f8;
      --text:#1c232b;
      --muted:#5f6b79;
      --glass:rgba(255,255,255,0.72);
      --stroke:rgba(28,35,43,0.12);
      --a1:#3b82f6;
      --a2:#94a3b8;
      --a3:#0f172a;
    }
    html[data-world="circuit"]{
      --bg:#04110a;
      --text:#eafff2;
      --muted:#a6d6bb;
      --glass:rgba(8,20,14,0.76);
      --stroke:rgba(255,255,255,0.12);
      --a1:#22c55e;
      --a2:#16a34a;
      --a3:#86efac;
    }
    body{
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .tc-topbar{
      background: var(--glass);
      border-bottom: 1px solid var(--stroke);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.08);
      position: sticky;
      top: 0;
      z-index: var(--z-topbar);
      overflow: visible;
    }
    .tc-topbar::after{
      content:"";
      position:absolute;
      left:0;
      right:0;
      bottom:-1px;
      height:1px;
      background: linear-gradient(90deg, var(--a1), var(--a2), var(--a3));
      opacity: .35;
    }
    .tc-brand{
      font-weight: 700;
      letter-spacing: -0.01em;
      text-shadow: 0 1px 0 rgba(255,255,255,.15);
      color: var(--text);
    }
    .tc-card{
      background: var(--glass);
      border: 1px solid var(--stroke);
      border-radius: 1.25rem;
      backdrop-filter: blur(16px);
      box-shadow: 0 24px 60px rgba(0,0,0,0.12);
    }
    .tc-chip{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
    }
    .tc-btn{
      border-radius: 0.75rem;
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      font-weight: 650;
      letter-spacing: -0.005em;
      line-height: 1;
    }
    .tc-btn:hover{ filter: brightness(1.03); }
    .tc-btn:active{ transform: translateY(1px); }
    .tc-btn:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    .tc-btn-primary{
      background: linear-gradient(135deg, var(--a1), var(--a2));
      color: #fff;
      border: 1px solid rgba(255,255,255,.18);
    }
    .tc-dot{
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--a1), var(--a2), var(--a3));
      box-shadow: 0 0 0 2px rgba(255,255,255,.5);
    }
    #portalMenu[data-open="0"],
    #worldMenu[data-open="0"]{ display: none; }
    #portalMenu,
    #worldMenu{ border: 1px solid var(--stroke); }
    .tc-menu-item{
      color: var(--text);
      padding: 0.6rem 0.75rem;
      border-radius: 0.6rem;
      transition: background-color .15s ease, transform .05s ease;
    }
    .tc-menu-item:hover{ background: rgba(255,255,255,.10); }
    .tc-menu-item:active{ transform: translateY(1px); }
    .tc-menu-item:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      background: rgba(255,255,255,.08);
    }
    .tc-field{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: 0.9rem;
      padding: 0.6rem 0.75rem;
      outline: none;
    }
    .tc-field:focus-visible{
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    .tc-muted{ color: var(--muted); }
    .tc-tab{
      border-radius: 999px;
      border: 1px solid var(--stroke);
      padding: 0.45rem 0.9rem;
      font-size: 0.875rem;
      background: var(--glass);
      color: var(--text);
    }
    .tc-tab.is-active{
      background: linear-gradient(135deg, var(--a1), var(--a2));
      color: #fff;
      border-color: rgba(255,255,255,.18);
    }
    .tc-badge{
      display: inline-flex;
      align-items: center;
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      font-size: 0.75rem;
      border: 1px solid var(--stroke);
      background: rgba(255,255,255,.12);
    }
    @media (prefers-reduced-motion: reduce){
      .tc-btn, .tc-menu-item{ transition: none; }
    }
  </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    html, body, button, input, select, textarea {
      font-family: "Inter", "Noto Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
    }
  </style></head>
<body class="font-sans">
  <header class="tc-topbar relative">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3 min-w-0">
        <a href="./index.html" class="flex items-center gap-3 min-w-0">
          <span class="h-11 w-11 md:h-12 md:w-12 rounded-xl shrink-0 flex items-center justify-center bg-white/5 ring-1 ring-white/10">
            <picture>
              <source srcset="./assets/spacecolors-mark.svg" type="image/svg+xml">
              <img
                src="./assets/spacecolors-mark-128.png"
                srcset="./assets/spacecolors-mark-128.png 1x, ./assets/spacecolors-mark-256.png 2x"
                class="h-full w-full object-contain select-none"
                alt="SpaceColors"
                decoding="async"
                loading="eager"
              />
            </picture>
          </span>
          <span class="min-w-0 flex flex-col justify-center leading-tight">
            <span class="tc-brand text-base md:text-lg whitespace-nowrap">SpaceColors · 8Portal</span>
            <span class="tc-muted text-[11px] md:text-xs truncate max-w-[240px] md:max-w-[360px] hidden sm:block">
              Một chạm mở không gian màu vô hạn
            </span>
          </span>
        </a>
      </div>
      <div class="flex-1 flex items-center justify-center">
        <div class="relative" id="portalSwitcher">
          <button id="portalBtn"
            class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[210px] justify-between"
            aria-expanded="false" aria-haspopup="menu" aria-controls="portalMenu">
            Chọn Thế giới
          </button>
          <div id="portalMenu" data-open="0" role="menu" class="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <a class="tc-menu-item block w-full text-left rounded-md" href="./worlds/threadcolor.html" role="menuitem">Thế giới màu thêu</a>
            <a class="tc-menu-item block w-full text-left rounded-md" href="./worlds/palette.html" role="menuitem">Thế giới dải màu</a>
            <button class="tc-menu-item w-full text-left rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>Sắp ra mắt</button>
            <button class="tc-menu-item w-full text-left rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>Sắp ra mắt</button>
            <button class="tc-menu-item w-full text-left rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>Sắp ra mắt</button>
            <button class="tc-menu-item w-full text-left rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>Sắp ra mắt</button>
            <button class="tc-menu-item w-full text-left rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>Sắp ra mắt</button>
            <button class="tc-menu-item w-full text-left rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>Sắp ra mắt</button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end gap-3 min-w-[210px]">
        <div class="relative" id="worldSwitcher">
          <button id="worldBtn"
            class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[150px] justify-between"
            aria-expanded="false" aria-haspopup="menu" aria-controls="worldMenu">
            <span class="flex items-center gap-2">
              <span class="tc-dot" aria-hidden="true"></span>
              <span id="worldLabel">Origami</span>
            </span>
            <span aria-hidden="true">&#9662;</span>
          </button>
          <div id="worldMenu" data-open="0" role="menu" class="absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <button class="tc-world-item tc-menu-item w-full text-left rounded-md" data-world="nebula" role="menuitem">Tinh vân</button>
            <button class="tc-world-item tc-menu-item w-full text-left rounded-md" data-world="ocean" role="menuitem">Đại dương</button>
            <button class="tc-world-item tc-menu-item w-full text-left rounded-md" data-world="ink" role="menuitem">Mực tàu</button>
            <button class="tc-world-item tc-menu-item w-full text-left rounded-md" data-world="origami" role="menuitem">Origami</button>
            <button class="tc-world-item tc-menu-item w-full text-left rounded-md" data-world="arcade" role="menuitem">Arcade</button>
            <button class="tc-world-item tc-menu-item w-full text-left rounded-md" data-world="dunes" role="menuitem">Đồi cát</button>
            <button class="tc-world-item tc-menu-item w-full text-left rounded-md" data-world="chrome" role="menuitem">Chrome</button>
            <button class="tc-world-item tc-menu-item w-full text-left rounded-md" data-world="circuit" role="menuitem">Mạch điện</button>
          </div>
        </div>
        <div id="topbarAuthSlot" data-auth-slot="topbar" class="tc-auth-float flex items-center justify-end min-w-[210px]"></div>
      </div>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-4 pt-8 pb-12">
    <section class="tc-card p-6 md:p-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold">Bảng điều phối quản trị</h1>
          <p class="tc-muted text-sm">Quản lý gói quyết định và nhật ký truy vết (chỉ admin).</p>
        </div>
        <button id="adminRefresh" class="tc-btn tc-chip px-3 py-2 text-sm">Làm mới</button>
      </div>

      <div id="adminMessage" class="mt-4 text-sm tc-muted hidden"></div>

      <div id="adminAuthCta" class="tc-card mt-6 p-4 hidden">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div class="font-semibold">Cần quyền quản trị</div>
            <div class="tc-muted text-sm">Đăng nhập tài khoản admin để truy cập bảng điều phối.</div>
          </div>
          <button id="adminLoginBtn" class="tc-btn tc-btn-primary px-4 py-2 text-sm">ĐĒng nhập</button>
        </div>
      </div>

      <div id="adminPanel" class="mt-6 hidden">
        <div class="flex flex-wrap items-center gap-3">
          <button id="tabPacks" class="tc-tab is-active" data-tab="packs">Gói quyết định</button>
          <button id="tabLogs" class="tc-tab" data-tab="logs">Nhật ký truy vết</button>
          <div class="flex-1"></div>
          <input id="adminSearch" class="tc-field text-sm w-full sm:w-64" type="search" placeholder="Tìm theo tiêu đề, mô tả, UID..." />
          <select id="adminStatus" class="tc-field text-sm w-full sm:w-44">
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ duyệt</option>
            <option value="approved">Đã duyệt</option>
            <option value="rejected">Từ chối</option>
            <option value="expired">Hết hạn</option>
          </select>
        </div>

        <div id="packsView" class="mt-6 space-y-4">
          <div class="tc-card p-4">
            <div class="font-semibold mb-3">Tạo gói quyết định mới</div>
            <div class="grid gap-3 md:grid-cols-2">
              <input id="packTitle" class="tc-field" type="text" placeholder="Tiêu đề gói quyết định" />
              <input id="packDueAt" class="tc-field" type="date" />
              <textarea id="packDescription" class="tc-field md:col-span-2" rows="3" placeholder="Mô tả ngắn (tuỳ chọn)"></textarea>
            </div>
            <div class="mt-3 flex items-center gap-2">
              <button id="packCreate" class="tc-btn tc-btn-primary px-4 py-2 text-sm">Tạo gói</button>
              <span class="tc-muted text-xs">Yêu cầu quyền admin và Idempotency-Key tự động.</span>
            </div>
          </div>
          <div class="grid gap-3" id="decisionPackList"></div>
        </div>

        <div id="logsView" class="mt-6 hidden">
          <div class="grid gap-3" id="auditLogList"></div>
        </div>
      </div>
    </section>
  </main>

  <script src="./auth.js" type="module"></script>
  <script>
    (() => {
      const portalBtn = document.getElementById("portalBtn");
      const portalMenu = document.getElementById("portalMenu");
      if (portalBtn && portalMenu) {
        const setOpen = (open) => {
          portalMenu.dataset.open = open ? "1" : "0";
          portalMenu.hidden = !open;
          portalBtn.setAttribute("aria-expanded", open ? "true" : "false");
        };
        setOpen(portalMenu.dataset.open === "1");
        portalBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          setOpen(portalMenu.dataset.open !== "1");
        });
        document.addEventListener("click", (event) => {
          if (!portalMenu.contains(event.target) && !portalBtn.contains(event.target)) {
            setOpen(false);
          }
        });
        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape") setOpen(false);
        });
      }
    })();
  </script>
  <script>
    (() => {
      const worldBtn = document.getElementById("worldBtn");
      const worldMenu = document.getElementById("worldMenu");
      const switcher = document.getElementById("worldSwitcher");
      if (!worldBtn || !worldMenu || !switcher) return;
      const storageKey = "tc_world";
      const worlds = ["nebula", "ocean", "ink", "origami", "arcade", "dunes", "chrome", "circuit"];
      const applyWorld = (key) => {
        const current = document.documentElement.dataset.world;
        const next = worlds.includes(key)
          ? key
          : (worlds.includes(current) ? current : "origami");
        document.documentElement.setAttribute("data-world", next);
        try {
          localStorage.setItem(storageKey, next);
        } catch (_err) {}
        const label = worldMenu.querySelector(`[data-world="${next}"]`);
        const labelText = label ? label.textContent.trim() : next;
        const labelEl = document.getElementById("worldLabel");
        if (labelEl && labelText) labelEl.textContent = labelText;
      };
      const setMenuOpen = (open) => {
        worldMenu.dataset.open = open ? "1" : "0";
        worldBtn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      worldBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        setMenuOpen(worldMenu.dataset.open !== "1");
      });
      worldMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-world-item");
        if (!item || !worldMenu.contains(item)) return;
        event.preventDefault();
        applyWorld(item.getAttribute("data-world"));
        setMenuOpen(false);
        worldBtn.focus();
      });
      document.addEventListener("click", (event) => {
        if (!worldMenu.contains(event.target) && !worldBtn.contains(event.target)) {
          setMenuOpen(false);
        }
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          setMenuOpen(false);
          worldBtn.focus();
        }
      });
      let stored = null;
      try {
        stored = localStorage.getItem(storageKey);
      } catch (_err) {}
      applyWorld(stored || document.documentElement.dataset.world || "origami");
      setMenuOpen(false);
    })();
  </script>
  <script>
    (() => {
      const adminPanel = document.getElementById("adminPanel");
      const adminAuthCta = document.getElementById("adminAuthCta");
      const adminMessage = document.getElementById("adminMessage");
      const adminLoginBtn = document.getElementById("adminLoginBtn");
      const decisionPackList = document.getElementById("decisionPackList");
      const auditLogList = document.getElementById("auditLogList");
      const tabPacks = document.getElementById("tabPacks");
      const tabLogs = document.getElementById("tabLogs");
      const packsView = document.getElementById("packsView");
      const logsView = document.getElementById("logsView");
      const adminSearch = document.getElementById("adminSearch");
      const adminStatus = document.getElementById("adminStatus");
      const packTitle = document.getElementById("packTitle");
      const packDescription = document.getElementById("packDescription");
      const packDueAt = document.getElementById("packDueAt");
      const packCreate = document.getElementById("packCreate");
      const refreshBtn = document.getElementById("adminRefresh");

      const state = {
        packs: [],
        logs: [],
        tab: "packs",
        search: "",
        status: "all"
      };

      const setMessage = (text, isError = false) => {
        if (!adminMessage) return;
        adminMessage.textContent = text || "";
        adminMessage.classList.toggle("hidden", !text);
        adminMessage.classList.toggle("text-red-600", !!(text && isError));
      };

      const setAuthState = (isAdmin) => {
        if (adminPanel) adminPanel.classList.toggle("hidden", !isAdmin);
        if (adminAuthCta) adminAuthCta.classList.toggle("hidden", !!isAdmin);
      };

      const getApi = () => window.firebaseAuth || window.firebaseAuthApi || null;

      const getToken = async () => {
        const api = getApi();
        const user = api?.auth?.currentUser || api?.user || null;
        if (!user || typeof user.getIdToken !== "function") {
          throw new Error("Cần đăng nhập để truy cập quản trị.");
        }
        return user.getIdToken();
      };

      const fetchAdmin = async (path, options = {}) => {
        const token = await getToken();
        const headers = new Headers(options.headers || {});
        headers.set("Authorization", `Bearer ${token}`);
        if (!headers.has("Content-Type") && options.body) {
          headers.set("Content-Type", "application/json");
        }
        const res = await fetch(path, { ...options, headers });
        if (res.status === 401 || res.status === 403) {
          throw new Error("Bạn không có quyền quản trị.");
        }
        return res.json();
      };

      const formatStatus = (status) => {
        switch (status) {
          case "approved": return "Đã duyệt";
          case "rejected": return "Từ chối";
          case "expired": return "Hết hạn";
          default: return "Chờ duyệt";
        }
      };

      const renderPacks = () => {
        if (!decisionPackList) return;
        const search = state.search.toLowerCase();
        const status = state.status;
        const items = state.packs.filter((item) => {
          const text = `${item.title || ""} ${item.description || ""}`.toLowerCase();
          const matchText = !search || text.includes(search);
          const matchStatus = status === "all" || item.status === status;
          return matchText && matchStatus;
        });
        if (!items.length) {
          decisionPackList.innerHTML = `<div class="tc-card p-4 tc-muted">Chưa có gói quyết định phù hợp.</div>`;
          return;
        }
        decisionPackList.innerHTML = items.map((item) => {
          const dueAt = item.dueAt ? new Date(item.dueAt).toLocaleDateString("vi-VN") : "--";
          const canAct = item.status === "pending";
          return `
            <div class="tc-card p-4">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div class="font-semibold">${item.title || "Không tiêu đề"}</div>
                  <div class="tc-muted text-sm">${item.description || "Không có mô tả."}</div>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <span class="tc-badge">${formatStatus(item.status)}</span>
                  <span class="tc-muted">Hạn: ${dueAt}</span>
                </div>
              </div>
              <div class="mt-3 flex flex-wrap items-center gap-2">
                ${canAct ? `<button class="tc-btn tc-btn-primary px-3 py-2 text-xs" data-action="approve" data-id="${item.id}">Duyệt</button>` : ""}
                ${canAct ? `<button class="tc-btn tc-chip px-3 py-2 text-xs" data-action="reject" data-id="${item.id}">Từ chối</button>` : ""}
                <button class="tc-btn tc-chip px-3 py-2 text-xs" data-action="edit" data-id="${item.id}">Cập nhật</button>
              </div>
            </div>
          `;
        }).join("");
      };

      const renderLogs = () => {
        if (!auditLogList) return;
        const search = state.search.toLowerCase();
        const items = state.logs.filter((item) => {
          const text = `${item.result || ""} ${item.path || ""} ${item.uid || ""}`.toLowerCase();
          return !search || text.includes(search);
        });
        if (!items.length) {
          auditLogList.innerHTML = `<div class="tc-card p-4 tc-muted">Chưa có nhật ký phù hợp.</div>`;
          return;
        }
        auditLogList.innerHTML = items.map((item) => {
          const when = item.ts?.toDate ? item.ts.toDate().toLocaleString("vi-VN") : "";
          return `
            <div class="tc-card p-4">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div class="font-semibold">${item.result || "Audit log"}</div>
                  <div class="tc-muted text-xs">${item.path || ""}</div>
                </div>
                <div class="tc-muted text-xs">${when || "--"}</div>
              </div>
              <div class="mt-2 text-xs tc-muted">UID: ${item.uid || "--"} â€¢ HTTP: ${item.status || "--"}</div>
            </div>
          `;
        }).join("");
      };

      const render = () => {
        if (packsView) packsView.classList.toggle("hidden", state.tab !== "packs");
        if (logsView) logsView.classList.toggle("hidden", state.tab !== "logs");
        if (tabPacks) tabPacks.classList.toggle("is-active", state.tab === "packs");
        if (tabLogs) tabLogs.classList.toggle("is-active", state.tab === "logs");
        if (state.tab === "packs") renderPacks();
        if (state.tab === "logs") renderLogs();
      };

      const loadData = async () => {
        setMessage("Đang tải dữ liệu quản trị...");
        try {
          const [packsRes, logsRes] = await Promise.all([
            fetchAdmin("/admin/decision-packs?limit=50"),
            fetchAdmin("/admin/audit-logs?limit=50")
          ]);
          state.packs = packsRes.items || [];
          state.logs = logsRes.items || [];
          setMessage("");
          render();
        } catch (err) {
          setMessage(err?.message || "Không thể tải dữ liệu quản trị.", true);
        }
      };

      const checkAdmin = async (user) => {
        if (!user) {
          setAuthState(false);
          setMessage("Cần đăng nhập để xem bảng điều phối.", true);
          return;
        }
        try {
          const token = await user.getIdToken();
          const res = await fetch("/admin/ping", {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (!res.ok) throw new Error("Bạn không có quyền quản trị.");
          setAuthState(true);
          await loadData();
        } catch (err) {
          setAuthState(false);
          setMessage(err?.message || "Bạn không có quyền quản trị.", true);
        }
      };

      if (tabPacks) tabPacks.addEventListener("click", () => {
        state.tab = "packs";
        render();
      });
      if (tabLogs) tabLogs.addEventListener("click", () => {
        state.tab = "logs";
        render();
      });
      if (adminSearch) adminSearch.addEventListener("input", () => {
        state.search = adminSearch.value || "";
        render();
      });
      if (adminStatus) adminStatus.addEventListener("change", () => {
        state.status = adminStatus.value || "all";
        render();
      });
      if (refreshBtn) refreshBtn.addEventListener("click", () => {
        loadData();
      });
      if (packCreate) packCreate.addEventListener("click", async () => {
        try {
          const title = packTitle?.value?.trim();
          if (!title) {
            setMessage("Vui lòng nhập tiêu đề gói quyết định.", true);
            return;
          }
          const payload = {
            title,
            description: packDescription?.value?.trim() || "",
            dueAt: packDueAt?.value || ""
          };
          const idemKey = window.crypto?.randomUUID
            ? window.crypto.randomUUID()
            : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
          await fetchAdmin("/admin/decision-packs", {
            method: "POST",
            headers: { "Idempotency-Key": idemKey },
            body: JSON.stringify(payload)
          });
          if (packTitle) packTitle.value = "";
          if (packDescription) packDescription.value = "";
          if (packDueAt) packDueAt.value = "";
          await loadData();
          setMessage("Đã tạo gói quyết định mới.");
        } catch (err) {
          setMessage(err?.message || "Không thể tạo gói quyết định.", true);
        }
      });

      if (decisionPackList) {
        decisionPackList.addEventListener("click", async (event) => {
          const actionBtn = event.target.closest("[data-action]");
          if (!actionBtn) return;
          const action = actionBtn.getAttribute("data-action");
          const packId = actionBtn.getAttribute("data-id");
          if (!packId) return;
          if (action === "edit") {
            setMessage("Chức năng cập nhật đang phát triển.");
            return;
          }
          try {
            await fetchAdmin(`/admin/decision-packs/${packId}`, {
              method: "PATCH",
              body: JSON.stringify({ status: action === "approve" ? "approved" : "rejected" })
            });
            await loadData();
            setMessage(action === "approve" ? "Đã duyệt gói." : "Đã từ chối gói.");
          } catch (err) {
            setMessage(err?.message || "Không thỒ cập nhật gói.", true);
          }
        });
      }

      if (adminLoginBtn) {
        adminLoginBtn.addEventListener("click", () => {
          if (window.tcAuth?.openAuth) {
            window.tcAuth.openAuth();
            return;
          }
          const btnAccount = document.getElementById("btnAccount");
          btnAccount?.click();
        });
      }

      const bindAuth = () => {
        const api = getApi();
        if (!api?.onAuthStateChanged) return;
        api.onAuthStateChanged((user) => {
          checkAdmin(user);
        });
      };

      if (window.firebaseAuth) {
        bindAuth();
      } else {
        window.addEventListener("firebase-auth-ready", bindAuth, { once: true });
      }
    })();
  </script>
</body>
</html>

````

## assets/spacecolors-mark.svg
````text
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" fill="none">
  <defs>
    <!-- Soft shadow / glow -->
    <filter id="ds" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#000000" flood-opacity="0.25"/>
    </filter>

    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="6" result="b"/>
      <feColorMatrix in="b" type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.55 0" result="g"/>
      <feMerge>
        <feMergeNode in="g"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Gradients -->
    <radialGradient id="gPlanet" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
      gradientTransform="translate(110 98) rotate(25) scale(132)">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="0.18" stop-color="#C9B2FF"/>
      <stop offset="0.48" stop-color="#FFB25E"/>
      <stop offset="0.74" stop-color="#63D9FF"/>
      <stop offset="1" stop-color="#2A2E8F"/>
    </radialGradient>

    <linearGradient id="gRing" x1="40" y1="120" x2="216" y2="168" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FF5C3A"/>
      <stop offset="0.22" stop-color="#FFB35A"/>
      <stop offset="0.52" stop-color="#59D7FF"/>
      <stop offset="0.78" stop-color="#A28CFF"/>
      <stop offset="1" stop-color="#FF4BA8"/>
    </linearGradient>

    <linearGradient id="gHighlight" x1="92" y1="64" x2="150" y2="150" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.75"/>
      <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>

    <!-- Clip top/bottom for ring layering -->
    <clipPath id="clipTop">
      <rect x="0" y="0" width="256" height="132" />
    </clipPath>
    <clipPath id="clipBottom">
      <rect x="0" y="132" width="256" height="124" />
    </clipPath>
  </defs>

  <!-- Sparkles (subtle, clean) -->
  <g opacity="0.9">
    <circle cx="52" cy="88" r="2" fill="#A28CFF"/>
    <circle cx="66" cy="64" r="1.6" fill="#59D7FF"/>
    <circle cx="198" cy="74" r="1.8" fill="#FFB35A"/>
    <circle cx="212" cy="102" r="1.4" fill="#FF4BA8"/>
    <circle cx="184" cy="44" r="1.2" fill="#FFFFFF" opacity="0.8"/>
  </g>

  <!-- Back ring (behind planet) -->
  <g clip-path="url(#clipTop)" opacity="0.72" filter="url(#glow)">
    <ellipse cx="128" cy="140" rx="112" ry="50" transform="rotate(-18 128 140)"
      stroke="url(#gRing)" stroke-width="18" stroke-linecap="round"/>
  </g>

  <!-- Planet -->
  <g filter="url(#ds)">
    <circle cx="128" cy="114" r="62" fill="url(#gPlanet)"/>
    <!-- subtle rim -->
    <circle cx="128" cy="114" r="62" fill="none" stroke="#FFFFFF" stroke-opacity="0.22" stroke-width="2"/>
    <!-- highlight -->
    <path d="M88 104C93 74 117 56 146 58C160 59 172 66 180 76C165 71 150 74 136 84C117 97 104 116 98 132C92 125 86 116 88 104Z"
      fill="url(#gHighlight)" opacity="0.9"/>
    <!-- inner gloss -->
    <ellipse cx="112" cy="96" rx="22" ry="14" transform="rotate(-22 112 96)" fill="#FFFFFF" opacity="0.18"/>
  </g>

  <!-- Front ring (in front of planet) -->
  <g clip-path="url(#clipBottom)" filter="url(#glow)">
    <ellipse cx="128" cy="140" rx="112" ry="50" transform="rotate(-18 128 140)"
      stroke="url(#gRing)" stroke-width="18" stroke-linecap="round"/>
    <!-- ring shine -->
    <ellipse cx="128" cy="140" rx="112" ry="50" transform="rotate(-18 128 140)"
      stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="2" stroke-linecap="round"/>
  </g>

  <!-- Micro particles (very subtle) -->
  <g opacity="0.35">
    <circle cx="66" cy="118" r="1.2" fill="#59D7FF"/>
    <circle cx="76" cy="142" r="1.1" fill="#FFB35A"/>
    <circle cx="196" cy="132" r="1.2" fill="#A28CFF"/>
    <circle cx="208" cy="156" r="1.1" fill="#FF4BA8"/>
  </g>
</svg>

````

## auth.js
````text
let hasLoadedGuide = false;
async function loadGuideOnce() {
  if (hasLoadedGuide) return;
  hasLoadedGuide = true;
  try {
    await import("./guide.js");
  } catch (err) {
    console.warn("Guide load failed", err);
  }
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// TODO: Điền cấu hình Firebase của bạn tại đây
const firebaseConfig = {
  apiKey: "AIzaSyCftjgq7XUpTCbEG9fMRI_RNlzFc7rqz7g",
  authDomain: "thread-colors-for-community.firebaseapp.com",
  projectId: "thread-colors-for-community",
  storageBucket: "thread-colors-for-community.firebasestorage.app",
  messagingSenderId: "980305784078",
  appId: "1:980305784078:web:455bfff119e25a77913b5f",
  measurementId: "G-SZ8R6VTFRY"
};

function validateConfig(cfg) {
  const required = ["apiKey", "authDomain", "projectId", "appId"];
  required.forEach(k => {
    const v = cfg[k];
    if (!v || String(v).includes("TODO")) {
      throw new Error("Thiếu firebaseConfig");
    }
  });
}

try {
  validateConfig(firebaseConfig);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  async function upsertUser(user, providerId) {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const now = serverTimestamp();
    await setDoc(ref, {
      uid: user.uid,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      provider: providerId || (user.providerData[0]?.providerId ?? "password"),
      createdAt: now,
      lastLoginAt: now
    }, { merge: true });
  }

  function defaultDisplayName(email) {
    if (!email) return "";
    return email.split("@")[0];
  }

  async function signInEmail(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await upsertUser(cred.user, "password");
    return cred;
  }

  async function registerEmail(email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (!cred.user.displayName) {
      await updateProfile(cred.user, { displayName: defaultDisplayName(email) });
    }
    await upsertUser(cred.user, "password");
    return cred;
  }

  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  }

  async function signInGoogle() {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    await upsertUser(cred.user, "google.com");
    return cred;
  }

  async function signInFacebook() {
    const provider = new FacebookAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    await upsertUser(cred.user, "facebook.com");
    return cred;
  }

  async function signOutUser() {
    await signOut(auth);
  }

  window.firebaseAuth = {
    auth,
    db,
    initError: null,
    onAuthStateChanged: (cb) => onAuthStateChanged(auth, cb),
    signInEmail,
    registerEmail,
    resetPassword,
    signInGoogle,
    signInFacebook,
    signOutUser,
    addDoc,
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    deleteDoc,
  };
  window.dispatchEvent(new Event("firebase-auth-ready"));
} catch (err) {
  console.error("Firebase init error", err);
  window.firebaseAuth = { initError: err };
}

function getAuthApi() {
  return window.firebaseAuth || window.firebaseAuthApi || null;
}

function resolveToolUrl() {
  const path = window.location.pathname || "";
  return path.includes("/worlds/") ? "threadcolor.html" : "./worlds/threadcolor.html";
}

async function safeSignOut() {
  const api = getAuthApi();
  if (!api) return;
  try {
    if (typeof api?.signOut === "function") {
      await api.signOut();
      return;
    }
    if (typeof api?.auth?.signOut === "function") {
      await api.auth.signOut();
    }
  } catch (err) {
    console.error("Sign out failed", err);
  }
}

function exposeAuthPublicApi() {
  if (window.tcAuth?.version === "v1") return;
  const getApi = () => window.firebaseAuth || window.firebaseAuthApi || null;
  window.tcAuth = {
    version: "v1",
    getApi,
    getUser: () => {
      const api = getApi();
      return api?.auth?.currentUser || api?.user || null;
    },
    isLoggedIn: () => {
      const user = window.tcAuth.getUser();
      return !!(user?.uid || user?.email);
    },
    openAuth: () => {
      const btnAccount = document.getElementById("btnAccount");
      if (btnAccount) {
        btnAccount.click();
        return;
      }
      window.location.href = resolveToolUrl();
    },
    openRegister: () => {
      if (typeof openAuthModal === "function") {
        openAuthModal("register");
        return;
      }
      window.tcAuth?.openAuth?.();
    },
    goTool: () => {
      window.location.href = resolveToolUrl();
    }
  };
}

function ensureAuthFallbackStyle() {
  if (document.getElementById("tc-auth-fallback-style")) return;
  const style = document.createElement("style");
  style.id = "tc-auth-fallback-style";
  style.textContent = `
#authOverlay{
  background: rgba(0,0,0,.45);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}
#authModal{
  background: var(--glass, rgba(255,255,255,.75));
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  color: var(--text, #111827);
  border-radius: 1.25rem;
  box-shadow: 0 22px 70px rgba(0,0,0,.28);
}
#authClose{
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  background: var(--glass, rgba(255,255,255,.75));
  color: var(--text, #111827);
  border-radius: .75rem;
}
#authModal input{
  background: var(--glass, rgba(255,255,255,.75));
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  color: var(--text, #111827);
  border-radius: .9rem;
}
#authModal input::placeholder{ color: var(--muted, rgba(17,24,39,.7)); opacity: .85; }
#authModal input:focus-visible,
#authClose:focus-visible,
#tabLogin:focus-visible, #tabRegister:focus-visible,
#btnLogin:focus-visible, #btnRegister:focus-visible,
#btnGoogle:focus-visible, #btnFacebook:focus-visible{
  outline: none;
  box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1, #6366f1);
}
#tabLogin, #tabRegister{
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  background: var(--glass, rgba(255,255,255,.75));
  color: var(--text, #111827);
  border-radius: .9rem;
}
#tabLogin.bg-indigo-50, #tabRegister.bg-indigo-50{
  background: linear-gradient(135deg, var(--a1, #6366f1), var(--a2, #8b5cf6));
  border-color: rgba(255,255,255,.18);
}
#tabLogin.text-indigo-700, #tabRegister.text-indigo-700{
  color: #fff !important;
}
#btnLogin, #btnRegister{
  background: linear-gradient(135deg, var(--a1, #6366f1), var(--a2, #8b5cf6));
  color: #fff;
  border: 1px solid rgba(255,255,255,.18);
  border-radius: .9rem;
}
#btnGoogle, #btnFacebook{
  background: var(--glass, rgba(255,255,255,.75));
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  color: var(--text, #111827);
  border-radius: .9rem;
}
#btnForgot{
  color: var(--muted, rgba(17,24,39,.7));
}
#authError{
  color: #ef4444;
  background: rgba(239,68,68,.10);
  border: 1px solid rgba(239,68,68,.22);
  border-radius: .9rem;
}
#topbarAuthSlot[data-auth-float="1"]{
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 70;
}
#topbarAuthSlot .tc-chip{
  background: var(--glass, rgba(255,255,255,.75));
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  color: var(--text, #111827);
}
#topbarAuthSlot .tc-btn{
  border-radius: 0.75rem;
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  background: var(--glass, rgba(255,255,255,.75));
  color: var(--text, #111827);
  font-weight: 650;
  letter-spacing: -0.005em;
  line-height: 1;
  transition: filter .15s ease, transform .05s ease, box-shadow .15s ease;
}
#topbarAuthSlot .tc-btn-primary{
  background: linear-gradient(135deg, var(--a1, #6366f1), var(--a2, #8b5cf6));
  color: #fff;
  border: 1px solid rgba(255,255,255,.18);
}
#topbarAuthSlot .tc-dot{
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--a1, #6366f1), var(--a2, #8b5cf6), var(--a3, #ec4899));
  box-shadow: 0 0 0 2px rgba(255,255,255,.5);
}
#topbarAuthSlot .tc-btn:hover,
#topbarAuthSlot .tc-chip:hover{ filter: brightness(1.03); }
#topbarAuthSlot .tc-btn:active{ transform: translateY(1px); }
#topbarAuthSlot .tc-btn:focus-visible,
#topbarAuthSlot #accountMenu button:focus-visible{
  outline: none;
  box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1, #6366f1);
}
#topbarAuthSlot #accountMenu{
  background: var(--glass, rgba(255,255,255,.75));
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  color: var(--text, #111827);
}
#topbarAuthSlot #accountMenu .tc-account-header{
  border-bottom: 1px solid var(--stroke, rgba(0,0,0,.12));
}
#topbarAuthSlot #accountMenu .tc-account-email{
  color: var(--muted, rgba(17,24,39,.7));
}
#topbarAuthSlot #accountMenu .tc-account-actions{
  display: flex;
  flex-direction: column;
  gap: .25rem;
}
#topbarAuthSlot #accountMenu button{
  padding: .6rem .75rem;
  line-height: 1.1;
}
#topbarAuthSlot #accountMenu button:hover{
  background: rgba(255,255,255,.10);
}
#topbarAuthSlot #accountMenu button + button{
  border-top: 1px solid var(--stroke, rgba(0,0,0,.12));
  opacity: 1;
}
#topbarAuthSlot #accountMenu #btnLogout{
  color: rgba(239,68,68,.95);
}
#topbarAuthSlot #accountMenu #btnLogout:hover{
  background: rgba(239,68,68,.08);
}
@media (prefers-reduced-motion: reduce){
  #topbarAuthSlot .tc-btn,
  #topbarAuthSlot .tc-chip{
    transition: none !important;
  }
}
@media (prefers-reduced-motion: reduce){
  #authModal *{ transition: none !important; }
}
  `;
  document.head.appendChild(style);
}

function ensureTopbarAuthDock() {
  const slot = document.getElementById("topbarAuthSlot");
  if (!slot) return false;
  if (slot.dataset.authDocked === "1") return false;

  const userInfo = document.getElementById("userInfo");
  const btnAccount = document.getElementById("btnAccount");
  const accountMenuBtn = document.getElementById("accountMenuBtn");
  const accountMenu = document.getElementById("accountMenu");
  const isSlotInBody = slot.parentElement === document.body;
  let changed = false;

  if (userInfo || btnAccount || accountMenuBtn || accountMenu) {
    let container = userInfo?.parentElement || null;
    if (container && btnAccount && !container.contains(btnAccount)) {
      container = btnAccount.parentElement;
    }
    if (container && userInfo && !container.contains(userInfo)) {
      container = null;
    }
    if (container) {
      if (container.parentElement !== slot) {
        slot.appendChild(container);
        changed = true;
      }
    } else {
      if (userInfo && userInfo.parentElement !== slot) {
        slot.appendChild(userInfo);
        changed = true;
      }
      if (btnAccount && btnAccount.parentElement !== slot) {
        slot.appendChild(btnAccount);
        changed = true;
      }
    }
  } else {
    slot.innerHTML = `
      <div class="flex items-center gap-3 min-w-[210px] justify-end">
        <div id="userInfo" class="hidden relative text-sm">
          <button id="accountMenuBtn" class="flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm tc-chip tc-btn">
            <img id="userAvatar" class="w-8 h-8 rounded-full border border-gray-200 object-cover" alt="">
            <span id="userName" class="font-semibold max-w-[110px] truncate"></span>
            <span class="opacity-70">&#9662;</span>
          </button>
          <div id="accountMenu" class="hidden absolute right-0 mt-3 w-64 rounded-lg shadow-lg overflow-hidden origin-top-right tc-chip">
            <div class="tc-account-header px-3 py-3">
              <div class="flex items-center gap-3">
                <img class="tc-account-avatar w-10 h-10 rounded-full border border-white/30 object-cover" alt="" data-auth-avatar>
                <div class="min-w-0">
                  <div class="tc-account-name font-semibold truncate" data-auth-name></div>
                  <div class="tc-account-email text-xs tc-muted truncate" data-auth-email></div>
                </div>
              </div>
            </div>
            <div class="tc-account-actions px-2 pb-2">
              <button id="btnManageAccount" class="w-full text-left px-3 py-2 hover:bg-white/10" data-i18n="tc.account.manage">Quản lý tài khoản</button>
              <button id="btnLogout" class="w-full text-left px-3 py-2 hover:bg-white/10" data-i18n="tc.account.logout">Đăng xuất</button>
            </div>
          </div>
        </div>
        <button id="btnAccount" class="tc-btn tc-btn-primary px-4 py-2" data-i18n="tc.account.login">Đăng nhập</button>
      </div>
    `;
    changed = true;
    if (isSlotInBody) {
      slot.dataset.authFloat = "1";
    } else {
      delete slot.dataset.authFloat;
    }
    slot.dataset.authDocked = "1";
    return true;
  }
  if (isSlotInBody) {
    slot.dataset.authFloat = "1";
  } else {
    delete slot.dataset.authFloat;
  }
  slot.dataset.authDocked = "1";
  return changed;
}

function bindTopbarAuthDelegation() {
  const slot = document.getElementById("topbarAuthSlot");
  if (!slot || slot.dataset.authDelegationBound === "1") return;
  slot.dataset.authDelegationBound = "1";

  const closeMenu = () => {
    const menu = document.getElementById("accountMenu");
    if (menu) menu.classList.add("hidden");
  };

  slot.addEventListener("click", async (event) => {
    const accountBtn = event.target.closest("#accountMenuBtn");
    if (accountBtn) {
      event.stopPropagation();
      const menu = document.getElementById("accountMenu");
      menu?.classList.toggle("hidden");
      return;
    }
    const logoutBtn = event.target.closest("#btnLogout");
    if (logoutBtn) {
      event.stopPropagation();
      await safeSignOut();
      closeMenu();
      return;
    }
    const manageBtn = event.target.closest("#btnManageAccount");
    if (manageBtn) {
      event.stopPropagation();
      closeMenu();
      const returnUrl = encodeURIComponent(window.location.href);
      const accountPath = window.location.pathname.includes("/worlds/") ? "../account.html" : "./account.html";
      window.location.href = `${accountPath}?return=${returnUrl}`;
      return;
    }
    const menuActionBtn = event.target.closest("#btnLibrary, #btnContribute, #btnVerify");
    if (menuActionBtn && slot.contains(menuActionBtn)) {
      event.stopPropagation();
      closeMenu();
      const inToolWorld = !!(
        document.getElementById("libraryModal") ||
        document.getElementById("contributeModal") ||
        document.getElementById("verifyModal")
      );
      if (inToolWorld) {
        const actionMap = {
          btnLibrary: "library",
          btnContribute: "contribute",
          btnVerify: "verify"
        };
        const action = actionMap[menuActionBtn.id];
        if (action) {
          document.dispatchEvent(new CustomEvent("tc-auth-action", { detail: { action } }));
        }
        return;
      }
      window.location.href = resolveToolUrl();
    }
  });

  document.addEventListener("click", (event) => {
    if (!slot.contains(event.target)) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function ensureAuthModalExists() {
  const overlay = document.getElementById("authOverlay");
  const modal = document.getElementById("authModal");
  if (overlay && modal) return false;
  document.body.insertAdjacentHTML("beforeend", `
    <div id="authOverlay" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 hidden"></div>
    <div id="authModal" class="fixed inset-0 z-50 hidden items-center justify-center px-4">
      <div class="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div class="flex gap-2">
            <button id="tabLogin" class="px-3 py-1 rounded-lg text-sm font-semibold bg-indigo-50 text-indigo-700" data-i18n="tc.auth.login">Đăng nhập</button>
            <button id="tabRegister" class="px-3 py-1 rounded-lg text-sm text-gray-600 hover:bg-gray-100" data-i18n="tc.auth.register">Đăng ký</button>
          </div>
          <button id="authClose" class="p-2 rounded-full hover:bg-gray-100 text-gray-500" data-i18n-attr="aria-label:tc.auth.close">&times;</button>
        </div>
        <div class="p-5 space-y-4">
          <div id="authError" class="text-sm text-red-600 hidden"></div>
          <div id="loginPanel" class="space-y-3">
          <input id="loginEmail" type="email" class="w-full border rounded-lg px-3 py-2" data-i18n-attr="placeholder:tc.auth.email">
          <input id="loginPassword" type="password" class="w-full border rounded-lg px-3 py-2" data-i18n-attr="placeholder:tc.auth.password">
          <button id="btnLogin" class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700" data-i18n="tc.auth.login">Đăng nhập</button>
          <button id="btnForgot" class="text-sm text-indigo-600 hover:underline" data-i18n="tc.auth.forgot">Quên mật khẩu?</button>
          </div>
          <div id="registerPanel" class="space-y-3 hidden">
          <input id="registerEmail" type="email" class="w-full border rounded-lg px-3 py-2" data-i18n-attr="placeholder:tc.auth.email">
          <input id="registerPassword" type="password" class="w-full border rounded-lg px-3 py-2" data-i18n-attr="placeholder:tc.auth.password">
          <input id="registerConfirm" type="password" class="w-full border rounded-lg px-3 py-2" data-i18n-attr="placeholder:tc.auth.confirm">
          <button id="btnRegister" class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700" data-i18n="tc.auth.create">Tạo tài khoản</button>
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <span class="h-px flex-1 bg-gray-200"></span>
          <span data-i18n="common.or">Hoặc</span>
            <span class="h-px flex-1 bg-gray-200"></span>
          </div>
        <button id="btnGoogle" class="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50">
          <span>G</span><span data-i18n="tc.auth.google">Tiếp tục với Google</span>
        </button>
        <button id="btnFacebook" class="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50">
          <span>f</span><span data-i18n="tc.auth.facebook">Tiếp tục với Facebook</span>
        </button>
        </div>
      </div>
    </div>
  `);
  return true;
}

function showAuthError(message) {
  const authError = document.getElementById("authError");
  if (!authError) return;
  if (!message) {
    authError.classList.add("hidden");
    authError.textContent = "";
    return;
  }
  authError.textContent = message;
  authError.classList.remove("hidden");
}

function setAuthTab(tab) {
  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");
  const loginPanel = document.getElementById("loginPanel");
  const registerPanel = document.getElementById("registerPanel");
  if (!tabLogin || !tabRegister || !loginPanel || !registerPanel) return;
  const isLogin = tab === "login";
  loginPanel.classList.toggle("hidden", !isLogin);
  registerPanel.classList.toggle("hidden", isLogin);
  tabLogin.classList.toggle("bg-indigo-50", isLogin);
  tabLogin.classList.toggle("text-indigo-700", isLogin);
  tabRegister.classList.toggle("bg-indigo-50", !isLogin);
  tabRegister.classList.toggle("text-indigo-700", !isLogin);
  showAuthError("");
}

function openAuthModal(tab = "login") {
  const authOverlay = document.getElementById("authOverlay");
  const authModal = document.getElementById("authModal");
  if (!authOverlay || !authModal) return;
  authOverlay.classList.remove("hidden");
  authModal.classList.remove("hidden");
  authModal.classList.add("flex");
  setAuthTab(tab);
  const loginEmail = document.getElementById("loginEmail");
  const registerEmail = document.getElementById("registerEmail");
  (tab === "login" ? loginEmail : registerEmail)?.focus();
}

function closeAuthModal() {
  const authOverlay = document.getElementById("authOverlay");
  const authModal = document.getElementById("authModal");
  if (!authOverlay || !authModal) return;
  authOverlay.classList.add("hidden");
  authModal.classList.add("hidden");
  authModal.classList.remove("flex");
  showAuthError("");
}

let lastAuthSignature = null;
function emitAuthChanged(user) {
  const payload = user ? {
    uid: user.uid || null,
    email: user.email || null,
    displayName: user.displayName || null,
    photoURL: user.photoURL || null
  } : null;
  const signature = payload ? `${payload.uid || ""}|${payload.email || ""}` : "guest";
  if (signature === lastAuthSignature) return;
  lastAuthSignature = signature;
  document.dispatchEvent(new CustomEvent("tc-auth-changed", { detail: { user: payload } }));
}

function updateAuthUI(user) {
  const api = getAuthApi();
  if (api) {
    api.user = user || null;
  }
  const userInfo = document.getElementById("userInfo");
  const btnAccount = document.getElementById("btnAccount");
  const btnLogout = document.getElementById("btnLogout");
  const userAvatar = document.getElementById("userAvatar");
  const userName = document.getElementById("userName");
  const menuAvatar = document.querySelector("#accountMenu [data-auth-avatar]");
  const menuName = document.querySelector("#accountMenu [data-auth-name]");
  const menuEmail = document.querySelector("#accountMenu [data-auth-email]");
  const loggedIn = !!user;
  userInfo?.classList.toggle("hidden", !loggedIn);
  btnAccount?.classList.toggle("hidden", loggedIn);
  btnLogout?.classList.toggle("hidden", !loggedIn);
  if (loggedIn && userName) userName.textContent = user.displayName || user.email || "User";
  if (loggedIn && userAvatar) {
    userAvatar.src = user.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.displayName || user.email || "U");
  }
  if (loggedIn) {
    const displayName = user.displayName || user.email || "User";
    const email = user.email || "";
    if (menuName) menuName.textContent = displayName;
    if (menuEmail) menuEmail.textContent = email;
    if (menuAvatar) {
      menuAvatar.src = user.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(displayName || "U");
    }
  } else {
    if (menuName) menuName.textContent = "";
    if (menuEmail) menuEmail.textContent = "";
    if (menuAvatar) menuAvatar.removeAttribute("src");
  }
  if (loggedIn) closeAuthModal();
  emitAuthChanged(user || null);
}

function bindAuthUiEvents() {
  const authModal = document.getElementById("authModal");
  if (!authModal || authModal.dataset.bound === "1") return;

  authModal.dataset.bound = "1";
  const btnAccount = document.getElementById("btnAccount");
  const authOverlay = document.getElementById("authOverlay");
  const authClose = document.getElementById("authClose");
  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const registerEmail = document.getElementById("registerEmail");
  const registerPassword = document.getElementById("registerPassword");
  const registerConfirm = document.getElementById("registerConfirm");
  const btnLogin = document.getElementById("btnLogin");
  const btnRegister = document.getElementById("btnRegister");
  const btnGoogle = document.getElementById("btnGoogle");
  const btnFacebook = document.getElementById("btnFacebook");
  const btnForgot = document.getElementById("btnForgot");
  const accountMenuBtn = document.getElementById("accountMenuBtn");
  const accountMenu = document.getElementById("accountMenu");
  const btnLibrary = document.getElementById("btnLibrary");
  const btnContribute = document.getElementById("btnContribute");
  const btnVerify = document.getElementById("btnVerify");
  const isToolWorld = () => !!(
    document.getElementById("libraryModal") ||
    document.getElementById("contributeModal") ||
    document.getElementById("verifyModal")
  );

  btnAccount?.addEventListener("click", () => openAuthModal("login"));
  authClose?.addEventListener("click", closeAuthModal);
  authOverlay?.addEventListener("click", closeAuthModal);
  tabLogin?.addEventListener("click", () => setAuthTab("login"));
  tabRegister?.addEventListener("click", () => setAuthTab("register"));

  const api = getAuthApi();
  btnLogin?.addEventListener("click", async () => {
    const email = loginEmail?.value.trim();
    const pass = loginPassword?.value;
    if (!email || !pass) return showAuthError("Vui l&#242;ng nh&#7853;p Email v&#224; m&#7853;t kh&#7849;u");
    try {
      await api?.signInEmail?.(email, pass);
    } catch (err) {
      showAuthError(err?.message || "&#272;&#259;ng nh&#7853;p th&#7845;t b&#7841;i");
    }
  });

  btnRegister?.addEventListener("click", async () => {
    const email = registerEmail?.value.trim();
    const pass = registerPassword?.value;
    const confirm = registerConfirm?.value;
    if (!email || !pass || !confirm) return showAuthError("&#272;i&#7873;n &#273;&#7847;y &#273;&#7911; th&#244;ng tin");
    if (pass !== confirm) return showAuthError("M&#7853;t kh&#7849;u kh&#244;ng tr&#249;ng kh&#7899;p");
    try {
      await api?.registerEmail?.(email, pass);
    } catch (err) {
      showAuthError(err?.message || "T&#7841;o t&#224;i kho&#7843;n th&#7845;t b&#7841;i");
    }
  });

  btnForgot?.addEventListener("click", async () => {
    const email = loginEmail?.value.trim();
    if (!email) return showAuthError("Nh&#7853;p email &#273;&#7875; &#273;&#7863;t l&#7841;i m&#7853;t kh&#7849;u");
    try {
      await api?.resetPassword?.(email);
    } catch (err) {
      showAuthError(err?.message || "Kh&#244;ng g&#7917;i &#273;&#432;&#7907;c email");
    }
  });

  btnGoogle?.addEventListener("click", async () => {
    try {
      await api?.signInGoogle?.();
    } catch (err) {
      showAuthError(err?.message || "Google login th&#7845;t b&#7841;i");
    }
  });

  btnFacebook?.addEventListener("click", async () => {
    try {
      await api?.signInFacebook?.();
    } catch (err) {
      showAuthError(err?.message || "Facebook login th&#7845;t b&#7841;i");
    }
  });

  if (accountMenuBtn) {
    accountMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      accountMenu?.classList.toggle("hidden");
    });
    document.addEventListener("click", () => accountMenu?.classList.add("hidden"));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        accountMenu?.classList.add("hidden");
        closeAuthModal();
      }
    });
  }

  const fallbackToTool = () => {
    if (isToolWorld()) return;
    window.location.href = "worlds/threadcolor.html";
  };
  btnLibrary?.addEventListener("click", () => fallbackToTool());
  btnContribute?.addEventListener("click", () => fallbackToTool());
  btnVerify?.addEventListener("click", () => fallbackToTool());
}

let hasBoundAuthState = false;
function bindAuthState() {
  if (hasBoundAuthState) return;
  const api = getAuthApi();
  if (!api?.onAuthStateChanged) return;
  hasBoundAuthState = true;
  api.onAuthStateChanged((user) => updateAuthUI(user));
  updateAuthUI(api.auth?.currentUser || null);
}

function initAuthDocking() {
  exposeAuthPublicApi();
  ensureAuthFallbackStyle();
  const injectedModal = ensureAuthModalExists();
  const injectedAccount = ensureTopbarAuthDock();
  if (injectedModal || injectedAccount) {
    bindAuthUiEvents();
  }
  bindTopbarAuthDelegation();
  bindAuthState();
}

document.addEventListener("DOMContentLoaded", initAuthDocking);
window.addEventListener("firebase-auth-ready", () => {
  exposeAuthPublicApi();
  const injectedAccount = ensureTopbarAuthDock();
  if (injectedAccount) {
    bindAuthUiEvents();
  }
  bindTopbarAuthDelegation();
  bindAuthState();
});


````

## CONTRIBUTING.md
````text
# Đóng góp cho ThreadColor

## Chạy local (web tĩnh)
Ví dụ:
```bash
python -m http.server 5173
```
Mở: `http://localhost:5173/worlds/threadcolor.html`

## Quy tắc PR
- PR nhỏ, rõ ràng, đúng phạm vi.
- Không sửa file ngoài phạm vi được giao.
- Không phá login top-right và luồng auth.
- Giữ tiếng Việt cho text hiển thị.

## Definition of Done (tối thiểu)
- Không lỗi console.
- Dòng “Xong. Dữ liệu đã sẵn sàng.” vẫn xuất hiện khi ready.
- “Tìm mã chỉ gần nhất” trả kết quả.

````

## crowd.js
````text
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit as fsLimit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { normalizeThreadRecord } from "./data_normalize.js";

export function normalizeBrandKey(brand) {
  if (!brand) return "";
  return brand.replace(/\s+/g, " ").trim().toLowerCase();
}

function ensureAuthUser(user) {
  if (!user || !user.uid) {
    throw new Error("User required");
  }
}

function cleanUndefined(value) {
  if (Array.isArray(value)) {
    return value
      .map(v => cleanUndefined(v))
      .filter(v => v !== undefined);
  }
  if (value && typeof value === "object") {
    const out = {};
    Object.entries(value).forEach(([k, v]) => {
      const cleaned = cleanUndefined(v);
      if (cleaned !== undefined) out[k] = cleaned;
    });
    return out;
  }
  return value === undefined ? undefined : value;
}

export async function submitThread(db, user, payload) {
  if (!db) throw new Error("Missing db");
  ensureAuthUser(user);
  if (!payload?.brand || !payload?.code || !payload?.hex) {
    throw new Error("Missing brand/code/hex");
  }
  const brandKey = normalizeBrandKey(payload.brand);
  const data = {
    brand: payload.brand.trim(),
    brandKey,
    code: String(payload.code).trim(),
    name: (payload.name || "").trim(),
    hex: payload.hex.trim(),
    rgb: payload.rgb || undefined,
    thickness: payload.thickness || undefined,
    status: "pending",
    createdByUid: user.uid,
    createdByName: user.displayName || "",
    createdByPhotoURL: user.photoURL || "",
    createdAt: serverTimestamp()
  };
  if (!data.rgb) {
    console.warn("[submitThread] missing rgb, omitting field", { hex: data.hex });
    delete data.rgb;
  }
  const cleaned = cleanUndefined(data);
  const ref = collection(db, "submissions");
  return addDoc(ref, cleaned);
}

export async function listPendingSubmissions(db, limitN = 50) {
  if (!db) throw new Error("Missing db");
  const ref = collection(db, "submissions");
  const q = query(
    ref,
    where("status", "==", "pending"),
    orderBy("createdAt", "desc"),
    fsLimit(limitN)
  );
  console.info("[listPendingSubmissions] query", {
    path: ref.path || "submissions",
    limit: limitN,
    orderBy: "createdAt desc",
    where: "status == pending"
  });
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function voteOnSubmission(db, submissionId, user, vote) {
  if (!db) throw new Error("Missing db");
  ensureAuthUser(user);
  if (!submissionId || !vote) throw new Error("Missing submissionId/vote");
  const ref = doc(db, "submissions", submissionId, "votes", user.uid);
  console.info("[voteOnSubmission] doc path =", ref.path);
  await setDoc(ref, { vote, createdAt: serverTimestamp() }, { merge: true });
}

export async function getVoteSummary(db, submissionId) {
  if (!db) throw new Error("Missing db");
  if (!submissionId) throw new Error("Missing submissionId");
  const ref = collection(db, "submissions", submissionId, "votes");
  console.info("[getVoteSummary] query", { path: ref.path });
  const snap = await getDocs(ref);
  let confirmCount = 0;
  let rejectCount = 0;
  snap.forEach(docSnap => {
    const vote = docSnap.data()?.vote;
    if (vote === "confirm") confirmCount += 1;
    if (vote === "reject") rejectCount += 1;
  });
  return { confirmCount, rejectCount };
}

export async function isAdmin(db, uid) {
  if (!db || !uid) return false;
  const snap = await getDoc(doc(db, "admins", uid));
  return snap.exists() && snap.data()?.enabled === true;
}


export async function promoteSubmissionToVerified(db, submissionDoc, summary, adminUser) {
  if (!db) throw new Error("Missing db");
  ensureAuthUser(adminUser);
  if (!submissionDoc?.id) throw new Error("Missing submission doc");
  const adminOk = await isAdmin(db, adminUser.uid);
  if (!adminOk) throw new Error("Admin required");

  const brandKey = normalizeBrandKey(submissionDoc.brand);
  const key = `${brandKey}__${submissionDoc.code}`;
  const baseRecord = {
    brand: submissionDoc.brand,
    code: submissionDoc.code,
    name: submissionDoc.name,
    hex: submissionDoc.hex,
    rgb: submissionDoc.rgb,
    thickness: submissionDoc.thickness,
    confidence: 0.85,
    source: { type: "CROWD_VERIFIED", uid: adminUser.uid, provider: "crowd" },
    meta: { updatedAt: serverTimestamp() }
  };
  const normalized = normalizeThreadRecord(baseRecord, { source: baseRecord.source, confidence: 0.85 });
  if (!normalized) throw new Error("Invalid submission payload");

  const verifiedRef = doc(db, "verifiedThreads", key);
  await setDoc(verifiedRef, cleanUndefined(normalized), { merge: true });

  const submissionRef = doc(db, "submissions", submissionDoc.id);
  await setDoc(
    submissionRef,
    {
      status: "approved",
      approvedAt: serverTimestamp(),
      approvedBy: adminUser.uid,
      voteSummary: summary || null
    },
    { merge: true }
  );
}

````

## data/audit/.gitkeep
````text

````

## data/contract.manifest.json
````text
{
    "phienBanManifest":  "1.0.0",
    "capNhatLuc":  "2026-01-04T07:29:12.2933158Z",
    "datasets":  {
                     "threads":  {
                                     "duongDan":  "threads.json",
                                     "schema":  "data/schemas/threads/0.1.0.json",
                                     "phienBanSchema":  "0.1.0",
                                     "phienBanDuLieu":  "0.1.0",
                                     "checksumSha256":  "30fc4f3c52bcba5f08d46c85304515203f051928d6f036a4156d782f3987fc71",
                                     "tinhTrang":  "dang-dung",
                                     "ghiChu":  "Du lieu chi may dang su dung cho tra cuu."
                                 },
                     "threads_generated":  {
                                               "duongDan":  "data/threads.generated.json",
                                               "schema":  "data/schemas/threads/0.1.0.json",
                                               "phienBanSchema":  "0.1.0",
                                               "phienBanDuLieu":  "0.1.0",
                                               "checksumSha256":  "8aae383d9dad03759fd9fc3086760d6d918bbaed0ee728e64385fe6c54055ec9",
                                               "tinhTrang":  "sinh-ra",
                                               "ghiChu":  "Du lieu sinh ra tu raw_tch de doi chieu."
                                           },
                     "palettes":  {
                                      "duongDan":  "data/palettes.json",
                                      "schema":  "data/schemas/palettes/0.1.0.json",
                                      "phienBanSchema":  "0.1.0",
                                      "phienBanDuLieu":  "0.1.0",
                                      "checksumSha256":  "a5338d955b09046ec0b16f3a9625b7955c763aae07dc722e474e6078745f932f",
                                      "tinhTrang":  "khoi-tao",
                                      "ghiChu":  "Khoi tao rong cho hop dong palettes."
                                  },
                     "vault":  {
                                   "duongDan":  "data/vault.json",
                                   "schema":  "data/schemas/vault/0.1.0.json",
                                   "phienBanSchema":  "0.1.0",
                                   "phienBanDuLieu":  "0.1.0",
                                   "checksumSha256":  "a5338d955b09046ec0b16f3a9625b7955c763aae07dc722e474e6078745f932f",
                                   "tinhTrang":  "khoi-tao",
                                   "ghiChu":  "Khoi tao rong cho hop dong vault."
                               }
                 }
}

````

## data/migrations/palettes/0.1.0__to__1.0.0.mjs
````text
export const moTa = "Di tru 0.1.0 -> 1.0.0 (khong doi du lieu, khung mau).";

export function migrate(data) {
  return data;
}

````

## data/migrations/threads/0.1.0__to__1.0.0.mjs
````text
export const moTa = "Di tru 0.1.0 -> 1.0.0 (khong doi du lieu, khung mau).";

export function migrate(data) {
  return data;
}

````

## data/migrations/threads_generated/0.1.0__to__1.0.0.mjs
````text
export const moTa = "Di tru 0.1.0 -> 1.0.0 (khong doi du lieu, khung mau).";

export function migrate(data) {
  return data;
}

````

## data/migrations/vault/0.1.0__to__1.0.0.mjs
````text
export const moTa = "Di tru 0.1.0 -> 1.0.0 (khong doi du lieu, khung mau).";

export function migrate(data) {
  return data;
}

````

## data/palettes.json
````text
[]

````

## data/raw_tch/Ackerman Isacord 30.tch
````text
0015,Isacord 30,White,B,255,255,255
0010,Isacord 30,Parchment,B,255,255,250
0600,Isacord 30,Yellow,B,255,255,0
0702,Isacord 30,Mid Gold,B,255,230,75
0704,Isacord 30,Darker Gold,B,245,240,102
0800,Isacord 30,Orange Gold,B,255,245,0
1355,Isacord 30,Dark Brown,B,153,102,51
1346,Isacord 30,Night Brown,B,135,90,45
1304,Isacord 30,Orange,B,255,125,0
1703,Isacord 30,Red,B,255,0,0
1902,Isacord 30,Dark Red,B,204,0,0
1913,Isacord 30,Brown Fox,B,204,51,0
1912,Isacord 30,Plum,B,175,0,75
2123,Isacord 30,Dark Plum,B,135,0,51
2241,Isacord 30,Plum Pink,B,204,140,150
2250,Isacord 30,Mauve Pink,B,255,204,215
3543 ,Isacord 30,Marine Blue,B,51,0,204
3355,Isacord 30,Navy,B,0,0,102
3820,Isacord 30,Medium Blue,B,150,190,230
5422,Isacord 30,Teal Green,B,60,175,120
5326,Isacord 30,Dark Leaf Green,B,0,115,80
0761,Isacord 30,Light Grey Brown,B,245,235,204
1876,Isacord 30,Brownish Green,B,125,90,50
0851,Isacord 30,Gold,B,240,204,145
0124,Isacord 30,Light Grey Brown,B,204,204,185
0111,Isacord 30,Dark Grey,B,127,127,127
0142,Isacord 30,Silver Grey,B,178,178,178
0020,Isacord 30,Black,B,0,0,0

````

## data/README.md
````text
# Data Contract (Giai doan 2)

Tai lieu nay mo ta quy trinh quan ly schema, version, migration va guardrails cho du lieu.

## 1) Cau truc thu muc
- data/schemas/<dataset>/<version>.json: schema theo phien ban.
- data/schemas/<dataset>.schema.json: schema latest (giu de tooling khong gay).
- data/migrations/<dataset>/<from>__to__<to>.mjs: migration theo cap (SemVer).
- data/scripts/validate_contract.mjs: validate schema + checksum + guardrails.
- data/scripts/migrate_contract.mjs: migrate + backup + validate + update manifest.
- data/audit/: log JSONL khi migrate.
- data/contract.manifest.json: manifest hop dong (tieng Viet).

## 2) Bump version schema
1) Tao schema moi trong data/schemas/<dataset>/<version>.json.
2) Cap nhat data/schemas/<dataset>.schema.json neu can (latest).
3) Cap nhat manifest:
   - phienBanSchema = <version>
   - schema = duong dan schema moi
4) Neu MAJOR tang: bat buoc co migration tu phienBanDuLieu -> phienBanSchema.

## 3) Migrate du lieu
- Dry run (khong ghi):
  node data/scripts/migrate_contract.mjs --dataset threads --from 0.1.0 --to 1.0.0 --dry-run
- Chay that:
  node data/scripts/migrate_contract.mjs --dataset threads --from 0.1.0 --to 1.0.0
  Ket qua:
  - Tao file .bak
  - Validate schema moi
  - Update manifest (phienBanDuLieu + checksum)
  - Ghi audit JSONL

## 4) Validate hop dong
- npm run validate:data
- Neu checksum lech hoac schema FAIL thi exit 1.

## 5) Guardrails (CI)
- CI luon chay validate:data.
- Neu phienBanSchema MAJOR tang, CI se dry-run migration.

Luu y: Khong them field version/audit vao tung record de tranh gay backward compatibility.

````

## data/schemas/palettes/0.1.0.json
````text
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Palettes dataset",
  "type": "array",
  "items": {
    "type": "object",
    "additionalProperties": true
  }
}

````

## data/schemas/palettes.schema.json
````text
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Palettes dataset",
  "type": "array",
  "items": {
    "type": "object",
    "additionalProperties": true
  }
}

````

## data/schemas/threads/0.1.0.json
````text
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Threads dataset",
  "type": "array",
  "items": {
    "anyOf": [
      {
        "type": "object",
        "required": ["brand", "code", "hex"],
        "properties": {
          "brand": { "type": "string" },
          "code": { "type": "string" },
          "name": { "type": "string" },
          "hex": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
          "lab": {
            "type": "array",
            "items": { "type": "number" },
            "minItems": 3,
            "maxItems": 3
          },
          "source": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "file": { "type": "string" },
              "imported_at": { "type": "string" },
              "line": { "type": "integer" },
              "provider": { "type": "string" },
              "uid": { "type": "string" }
            },
            "additionalProperties": true
          },
          "rating": {
            "type": "object",
            "properties": {
              "score": { "type": ["number", "null"] },
              "votes": { "type": "integer" }
            },
            "additionalProperties": true
          },
          "confidence": { "type": "number" },
          "brandKey": { "type": "string" },
          "codeKey": { "type": "string" },
          "id": { "type": "string" },
          "verified": { "type": "boolean" }
        },
        "additionalProperties": true
      },
      {
        "type": "object",
        "required": ["brand", "code", "hex"],
        "properties": {
          "brand": { "type": "string" },
          "code": { "type": "string" },
          "name": { "type": "string" },
          "hex": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
          "rgb": {
            "type": "object",
            "properties": {
              "r": { "type": "integer", "minimum": 0, "maximum": 255 },
              "g": { "type": "integer", "minimum": 0, "maximum": 255 },
              "b": { "type": "integer", "minimum": 0, "maximum": 255 }
            },
            "additionalProperties": true
          },
          "thickness": { "type": "string" },
          "source": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "file": { "type": "string" },
              "line": { "type": "integer" }
            },
            "additionalProperties": true
          },
          "meta": { "type": "object", "additionalProperties": true },
          "canonicalKey": { "type": "string" },
          "alternates": { "type": "array", "items": { "type": "object" } }
        },
        "additionalProperties": true
      }
    ]
  }
}

````

## data/schemas/threads.schema.json
````text
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Threads dataset",
  "type": "array",
  "items": {
    "anyOf": [
      {
        "type": "object",
        "required": ["brand", "code", "hex"],
        "properties": {
          "brand": { "type": "string" },
          "code": { "type": "string" },
          "name": { "type": "string" },
          "hex": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
          "lab": {
            "type": "array",
            "items": { "type": "number" },
            "minItems": 3,
            "maxItems": 3
          },
          "source": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "file": { "type": "string" },
              "imported_at": { "type": "string" },
              "line": { "type": "integer" },
              "provider": { "type": "string" },
              "uid": { "type": "string" }
            },
            "additionalProperties": true
          },
          "rating": {
            "type": "object",
            "properties": {
              "score": { "type": ["number", "null"] },
              "votes": { "type": "integer" }
            },
            "additionalProperties": true
          },
          "confidence": { "type": "number" },
          "brandKey": { "type": "string" },
          "codeKey": { "type": "string" },
          "id": { "type": "string" },
          "verified": { "type": "boolean" }
        },
        "additionalProperties": true
      },
      {
        "type": "object",
        "required": ["brand", "code", "hex"],
        "properties": {
          "brand": { "type": "string" },
          "code": { "type": "string" },
          "name": { "type": "string" },
          "hex": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
          "rgb": {
            "type": "object",
            "properties": {
              "r": { "type": "integer", "minimum": 0, "maximum": 255 },
              "g": { "type": "integer", "minimum": 0, "maximum": 255 },
              "b": { "type": "integer", "minimum": 0, "maximum": 255 }
            },
            "additionalProperties": true
          },
          "thickness": { "type": "string" },
          "source": {
            "type": "object",
            "properties": {
              "type": { "type": "string" },
              "file": { "type": "string" },
              "line": { "type": "integer" }
            },
            "additionalProperties": true
          },
          "meta": { "type": "object", "additionalProperties": true },
          "canonicalKey": { "type": "string" },
          "alternates": { "type": "array", "items": { "type": "object" } }
        },
        "additionalProperties": true
      }
    ]
  }
}

````

## data/schemas/vault/0.1.0.json
````text
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Vault dataset",
  "type": "array",
  "items": {
    "type": "object",
    "additionalProperties": true
  }
}

````

## data/schemas/vault.schema.json
````text
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Vault dataset",
  "type": "array",
  "items": {
    "type": "object",
    "additionalProperties": true
  }
}

````

## data/scripts/audit.mjs
````text
#!/usr/bin/env node
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const auditDir = path.resolve(rootDir, "data/audit");
const auditPath = path.resolve(auditDir, "data-audit.jsonl");

const main = async () => {
  await mkdir(auditDir, { recursive: true });
  const entry = {
    ts: new Date().toISOString(),
    event: process.argv[2] || "data-audit",
    note: process.argv.slice(3).join(" ") || ""
  };
  await appendFile(auditPath, JSON.stringify(entry) + "\n", "utf8");
  console.log(`[audit] ghi ${auditPath}`);
};

main().catch((err) => {
  console.error("[audit] failed", err);
  process.exit(1);
});

````

## data/scripts/migrate_contract.mjs
````text
#!/usr/bin/env node
import fs from "node:fs";
import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import crypto from "node:crypto";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const rootDir = process.cwd();
const manifestPath = path.resolve(rootDir, "data/contract.manifest.json");

const args = process.argv.slice(2);
const getArg = (flag) => {
  const idx = args.indexOf(flag);
  return idx >= 0 ? args[idx + 1] : null;
};
const hasFlag = (flag) => args.includes(flag);

const datasetArg = getArg("--dataset");
const fromArg = getArg("--from");
const toArg = getArg("--to");
const dryRun = hasFlag("--dry-run");

const readJson = async (filePath) => {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
};

const writeJson = async (filePath, payload) => {
  await writeFile(filePath, JSON.stringify(payload, null, 2) + "\n", "utf8");
};

const sha256File = async (filePath) => {
  const buf = await readFile(filePath);
  return crypto.createHash("sha256").update(buf).digest("hex");
};

const exists = (filePath) => fs.existsSync(filePath);

const getMajor = (version) => {
  const match = String(version || "").match(/^(\d+)\.(\d+)\.(\d+)/);
  return match ? Number(match[1]) : null;
};

const schemaPathFor = (dataset, version, fallbackPath) => {
  const candidate = path.resolve(rootDir, "data/schemas", dataset, `${version}.json`);
  return exists(candidate) ? candidate : path.resolve(rootDir, fallbackPath || "");
};

const migrationPathFor = (dataset, fromVer, toVer) => {
  return path.resolve(rootDir, "data/migrations", dataset, `${fromVer}__to__${toVer}.mjs`);
};

const runAudit = async (dataset, fromVer, toVer) => {
  const auditScript = path.resolve(rootDir, "data/scripts/audit.mjs");
  if (!exists(auditScript)) return;
  await execFileAsync("node", [auditScript, "migrate", `${dataset} ${fromVer} -> ${toVer}`]);
};

const main = async () => {
  if (!exists(manifestPath)) {
    console.error(`[migrate_contract] Khong tim thay manifest: ${manifestPath}`);
    process.exit(1);
  }

  const manifest = await readJson(manifestPath);
  const datasets = manifest?.datasets || {};
  const ajv = new Ajv({ allErrors: true, strict: false, allowUnionTypes: true });
  addFormats(ajv);

  const datasetKeys = datasetArg
    ? [datasetArg]
    : Object.keys(datasets).filter((key) => {
        const info = datasets[key];
        const schemaMajor = getMajor(info.phienBanSchema);
        const dataMajor = getMajor(info.phienBanDuLieu);
        return schemaMajor !== null && dataMajor !== null && schemaMajor > dataMajor;
      });

  if (!datasetKeys.length) {
    console.log("[migrate_contract] Khong co dataset can migrate.");
    return;
  }

  for (const key of datasetKeys) {
    const info = datasets[key];
    if (!info) {
      console.error(`[migrate_contract] Khong tim thay dataset: ${key}`);
      process.exit(1);
    }

    const fromVer = fromArg || info.phienBanDuLieu;
    const toVer = toArg || info.phienBanSchema;
    if (!fromVer || !toVer) {
      console.error(`[migrate_contract] ${key}: can co --from/--to hoac phienBanDuLieu/phienBanSchema`);
      process.exit(1);
    }

    const dataPath = path.resolve(rootDir, info.duongDan || "");
    if (!exists(dataPath)) {
      console.error(`[migrate_contract] ${key}: khong tim thay duong dan ${info.duongDan}`);
      process.exit(1);
    }

    const migPath = migrationPathFor(key, fromVer, toVer);
    if (!exists(migPath)) {
      console.error(`[migrate_contract] ${key}: thieu migration ${fromVer} -> ${toVer}`);
      console.error(`  can co: ${path.relative(rootDir, migPath)}`);
      process.exit(1);
    }

    const mod = await import(pathToFileURL(migPath).href);
    const migrate = mod?.migrate;
    const moTa = mod?.moTa || "(khong co mo ta)";
    if (typeof migrate !== "function") {
      console.error(`[migrate_contract] ${key}: migration khong export migrate(data)`);
      process.exit(1);
    }

    const raw = await readJson(dataPath);
    const next = await migrate(raw);
    if (typeof next === "undefined") {
      console.error(`[migrate_contract] ${key}: migrate tra ve undefined`);
      process.exit(1);
    }

    const schemaPath = schemaPathFor(key, toVer, info.schema);
    if (!exists(schemaPath)) {
      console.error(`[migrate_contract] ${key}: khong tim thay schema ${schemaPath}`);
      process.exit(1);
    }

    const schema = await readJson(schemaPath);
    const validate = ajv.compile(schema);
    const valid = validate(next);
    if (!valid) {
      console.error(`[migrate_contract] ${key}: schema FAIL`);
      console.error(validate.errors);
      process.exit(1);
    }

    console.log(`[migrate_contract] ${key}: ${fromVer} -> ${toVer} OK (${moTa})`);

    if (dryRun) {
      continue;
    }

    const backupPath = `${dataPath}.bak`;
    if (!exists(backupPath)) {
      await copyFile(dataPath, backupPath);
    }

    await writeJson(dataPath, next);
    const checksum = await sha256File(dataPath);
    info.phienBanDuLieu = toVer;
    if (info.phienBanSchema !== toVer) {
      info.phienBanSchema = toVer;
      if (exists(schemaPath)) {
        info.schema = path.relative(rootDir, schemaPath).replace(/\\/g, "/");
      }
    }
    info.checksumSha256 = checksum;
    manifest.capNhatLuc = new Date().toISOString();
    await writeJson(manifestPath, manifest);
    await runAudit(key, fromVer, toVer);
  }
};

main().catch((err) => {
  console.error("[migrate_contract] failed", err);
  process.exit(1);
});

````

## data/scripts/validate_contract.mjs
````text
#!/usr/bin/env node
import fs from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const rootDir = process.cwd();
const manifestPath = path.resolve(rootDir, "data/contract.manifest.json");
const updateChecksum = process.argv.includes("--cap-nhat-checksum");

const readJson = async (filePath) => {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
};

const sha256File = async (filePath) => {
  const buf = await readFile(filePath);
  return crypto.createHash("sha256").update(buf).digest("hex");
};

const exists = (filePath) => fs.existsSync(filePath);

const getMajor = (version) => {
  const match = String(version || "").match(/^(\d+)\.(\d+)\.(\d+)/);
  return match ? Number(match[1]) : null;
};

const migrationPathFor = (dataset, fromVer, toVer) => {
  return path.resolve(rootDir, "data/migrations", dataset, `${fromVer}__to__${toVer}.mjs`);
};

const main = async () => {
  if (!exists(manifestPath)) {
    console.error(`[validate_contract] Khong tim thay manifest: ${manifestPath}`);
    process.exit(1);
  }

  const manifest = await readJson(manifestPath);
  const datasets = manifest?.datasets || {};
  const ajv = new Ajv({ allErrors: true, strict: false, allowUnionTypes: true });
  addFormats(ajv);

  let hasError = false;

  for (const [key, info] of Object.entries(datasets)) {
    const dataPath = path.resolve(rootDir, info.duongDan || "");
    const schemaPath = path.resolve(rootDir, info.schema || "");

    const schemaMajor = getMajor(info.phienBanSchema);
    const dataMajor = getMajor(info.phienBanDuLieu);
    if (schemaMajor === null || dataMajor === null) {
      console.error(`[validate_contract] ${key}: phienBanSchema/phienBanDuLieu khong dung dinh dang SemVer`);
      hasError = true;
    } else if (schemaMajor > dataMajor) {
      const migPath = migrationPathFor(key, info.phienBanDuLieu, info.phienBanSchema);
      if (!exists(migPath)) {
        console.error(`[validate_contract] ${key}: thieu migration MAJOR ${info.phienBanDuLieu} -> ${info.phienBanSchema}`);
        console.error(`  can co: ${path.relative(rootDir, migPath)}`);
        hasError = true;
      }
    }

    if (!exists(dataPath)) {
      console.warn(`[validate_contract] Bo qua ${key}: khong tim thay duong dan ${info.duongDan}`);
      continue;
    }
    if (!exists(schemaPath)) {
      console.error(`[validate_contract] ${key}: khong tim thay schema ${info.schema}`);
      hasError = true;
      continue;
    }

    let schema;
    let payload;
    try {
      schema = await readJson(schemaPath);
      payload = await readJson(dataPath);
    } catch (err) {
      console.error(`[validate_contract] ${key}: loi doc JSON`, err);
      hasError = true;
      continue;
    }

    const validate = ajv.compile(schema);
    const valid = validate(payload);
    if (!valid) {
      console.error(`[validate_contract] ${key}: schema FAIL`);
      console.error(validate.errors);
      hasError = true;
    } else {
      console.log(`[validate_contract] ${key}: schema PASS`);
    }

    const checksum = await sha256File(dataPath);
    if (updateChecksum) {
      info.checksumSha256 = checksum;
      console.warn(`[validate_contract] ${key}: cap nhat checksum -> ${checksum}`);
    } else if (!info.checksumSha256) {
      console.error(`[validate_contract] ${key}: checksum trong manifest dang rong`);
      hasError = true;
    } else if (info.checksumSha256 !== checksum) {
      console.error(`[validate_contract] ${key}: checksum KHONG khop`);
      console.error(`  manifest: ${info.checksumSha256}`);
      console.error(`  actual  : ${checksum}`);
      hasError = true;
    } else {
      console.log(`[validate_contract] ${key}: checksum PASS`);
    }
  }

  if (updateChecksum) {
    manifest.capNhatLuc = new Date().toISOString();
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  }

  if (hasError) {
    process.exit(1);
  }
};

main().catch((err) => {
  console.error("[validate_contract] failed", err);
  process.exit(1);
});

````

## data/threads.generated.json
````text
[
  {
    "brand": "Isacord 30",
    "code": "0010",
    "name": "Parchment",
    "hex": "#FFFFFA",
    "rgb": {
      "r": 255,
      "g": 255,
      "b": 250
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 2
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0015",
    "name": "White",
    "hex": "#FFFFFF",
    "rgb": {
      "r": 255,
      "g": 255,
      "b": 255
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 1
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0020",
    "name": "Black",
    "hex": "#000000",
    "rgb": {
      "r": 0,
      "g": 0,
      "b": 0
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 28
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0111",
    "name": "Dark Grey",
    "hex": "#7F7F7F",
    "rgb": {
      "r": 127,
      "g": 127,
      "b": 127
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 26
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0124",
    "name": "Light Grey Brown",
    "hex": "#CCCCB9",
    "rgb": {
      "r": 204,
      "g": 204,
      "b": 185
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 25
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0142",
    "name": "Silver Grey",
    "hex": "#B2B2B2",
    "rgb": {
      "r": 178,
      "g": 178,
      "b": 178
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 27
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0600",
    "name": "Yellow",
    "hex": "#FFFF00",
    "rgb": {
      "r": 255,
      "g": 255,
      "b": 0
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 3
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0702",
    "name": "Mid Gold",
    "hex": "#FFE64B",
    "rgb": {
      "r": 255,
      "g": 230,
      "b": 75
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 4
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0704",
    "name": "Darker Gold",
    "hex": "#F5F066",
    "rgb": {
      "r": 245,
      "g": 240,
      "b": 102
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 5
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0761",
    "name": "Light Grey Brown",
    "hex": "#F5EBCC",
    "rgb": {
      "r": 245,
      "g": 235,
      "b": 204
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 22
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0800",
    "name": "Orange Gold",
    "hex": "#FFF500",
    "rgb": {
      "r": 255,
      "g": 245,
      "b": 0
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 6
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0851",
    "name": "Gold",
    "hex": "#F0CC91",
    "rgb": {
      "r": 240,
      "g": 204,
      "b": 145
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 24
    }
  },
  {
    "brand": "Isacord 30",
    "code": "1304",
    "name": "Orange",
    "hex": "#FF7D00",
    "rgb": {
      "r": 255,
      "g": 125,
      "b": 0
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 9
    }
  },
  {
    "brand": "Isacord 30",
    "code": "1346",
    "name": "Night Brown",
    "hex": "#875A2D",
    "rgb": {
      "r": 135,
      "g": 90,
      "b": 45
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 8
    }
  },
  {
    "brand": "Isacord 30",
    "code": "1355",
    "name": "Dark Brown",
    "hex": "#996633",
    "rgb": {
      "r": 153,
      "g": 102,
      "b": 51
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 7
    }
  },
  {
    "brand": "Isacord 30",
    "code": "1703",
    "name": "Red",
    "hex": "#FF0000",
    "rgb": {
      "r": 255,
      "g": 0,
      "b": 0
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 10
    }
  },
  {
    "brand": "Isacord 30",
    "code": "1876",
    "name": "Brownish Green",
    "hex": "#7D5A32",
    "rgb": {
      "r": 125,
      "g": 90,
      "b": 50
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 23
    }
  },
  {
    "brand": "Isacord 30",
    "code": "1902",
    "name": "Dark Red",
    "hex": "#CC0000",
    "rgb": {
      "r": 204,
      "g": 0,
      "b": 0
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 11
    }
  },
  {
    "brand": "Isacord 30",
    "code": "1912",
    "name": "Plum",
    "hex": "#AF004B",
    "rgb": {
      "r": 175,
      "g": 0,
      "b": 75
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 13
    }
  },
  {
    "brand": "Isacord 30",
    "code": "1913",
    "name": "Brown Fox",
    "hex": "#CC3300",
    "rgb": {
      "r": 204,
      "g": 51,
      "b": 0
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 12
    }
  },
  {
    "brand": "Isacord 30",
    "code": "2123",
    "name": "Dark Plum",
    "hex": "#870033",
    "rgb": {
      "r": 135,
      "g": 0,
      "b": 51
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 14
    }
  },
  {
    "brand": "Isacord 30",
    "code": "2241",
    "name": "Plum Pink",
    "hex": "#CC8C96",
    "rgb": {
      "r": 204,
      "g": 140,
      "b": 150
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 15
    }
  },
  {
    "brand": "Isacord 30",
    "code": "2250",
    "name": "Mauve Pink",
    "hex": "#FFCCD7",
    "rgb": {
      "r": 255,
      "g": 204,
      "b": 215
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 16
    }
  },
  {
    "brand": "Isacord 30",
    "code": "3355",
    "name": "Navy",
    "hex": "#000066",
    "rgb": {
      "r": 0,
      "g": 0,
      "b": 102
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 18
    }
  },
  {
    "brand": "Isacord 30",
    "code": "3543",
    "name": "Marine Blue",
    "hex": "#3300CC",
    "rgb": {
      "r": 51,
      "g": 0,
      "b": 204
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 17
    }
  },
  {
    "brand": "Isacord 30",
    "code": "3820",
    "name": "Medium Blue",
    "hex": "#96BEE6",
    "rgb": {
      "r": 150,
      "g": 190,
      "b": 230
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 19
    }
  },
  {
    "brand": "Isacord 30",
    "code": "5326",
    "name": "Dark Leaf Green",
    "hex": "#007350",
    "rgb": {
      "r": 0,
      "g": 115,
      "b": 80
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 21
    }
  },
  {
    "brand": "Isacord 30",
    "code": "5422",
    "name": "Teal Green",
    "hex": "#3CAF78",
    "rgb": {
      "r": 60,
      "g": 175,
      "b": 120
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 20
    }
  }
]

````

## data/vault.json
````text
[]

````

## data_normalize.js
````text
const SPACE_REGEX = /\s+/g;
const HEX_REGEX = /^#[0-9A-F]{6}$/;
const CONFIDENCE_MAP = {
  TCH: 0.9,
  OFFICIAL_CHART: 0.95,
  USER_SUBMISSION: 0.5,
  MANUAL: 0.6,
  LEGACY_JSON: 0.9,
  RUNTIME_JSON: 0.86
};

function normalizeWhitespace(value) {
  return typeof value === "string" ? value.replace(SPACE_REGEX, " ").trim() : "";
}

function normalizeHexValue(hex) {
  if (!hex || typeof hex !== "string") return null;
  let v = hex.trim();
  if (v.startsWith("##")) v = v.slice(1);
  if (!v.startsWith("#")) v = "#" + v;
  v = v.toUpperCase();
  return HEX_REGEX.test(v) ? v : null;
}

function normalizeRgbValue(rgb) {
  if (!rgb || typeof rgb !== "object") return null;
  const r = Number.isInteger(rgb.r) ? rgb.r : null;
  const g = Number.isInteger(rgb.g) ? rgb.g : null;
  const b = Number.isInteger(rgb.b) ? rgb.b : null;
  if ([r, g, b].some(v => v === null)) return null;
  if ([r, g, b].some(v => v < 0 || v > 255)) return null;
  return { r, g, b };
}

function hexToRgb(hex) {
  const num = parseInt(hex.slice(1), 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function normalizeSource(src) {
  if (!src || typeof src !== "object") return { type: "unknown" };
  return {
    type: src.type || "unknown",
    file: src.file,
    line: src.line,
    provider: src.provider,
    uid: src.uid
  };
}

function formatSourceForLog(source) {
  if (!source) return "";
  const parts = [source.type || "unknown"];
  if (source.file) parts.push(source.file);
  if (source.line) parts.push(`line ${source.line}`);
  if (source.provider) parts.push(`provider ${source.provider}`);
  if (source.uid) parts.push(`uid ${source.uid}`);
  return parts.join(" | ");
}

function resolveConfidence(rawConfidence, sourceType) {
  if (typeof rawConfidence === "number") return rawConfidence;
  const mapped = CONFIDENCE_MAP[(sourceType || "").toUpperCase()];
  return typeof mapped === "number" ? mapped : 0.5;
}

function applyTimestamps(meta = {}, options = {}) {
  if (!options.addTimestamps) return meta;
  const stamp = options.timestamp || new Date().toISOString();
  const nextMeta = { ...meta };
  if (!nextMeta.createdAt) nextMeta.createdAt = stamp;
  if (!nextMeta.updatedAt) nextMeta.updatedAt = stamp;
  return nextMeta;
}

export function normalizeThreadRecord(raw, ctx = {}) {
  const source = normalizeSource(raw?.source || ctx.source);
  const brand = normalizeWhitespace(raw?.brand);
  const code = normalizeWhitespace(
    raw?.code !== undefined && raw?.code !== null ? String(raw.code) : ""
  );
  const name = normalizeWhitespace(raw?.name || "");
  const hex = normalizeHexValue(raw?.hex);
  const rgbFromRaw =
    normalizeRgbValue(raw?.rgb) || normalizeRgbValue({ r: raw?.r, g: raw?.g, b: raw?.b });
  const rgb = rgbFromRaw || (hex ? hexToRgb(hex) : null);

  if (!brand || !code || !hex || !rgb) {
    console.warn(
      `[normalize] Skip invalid record (${formatSourceForLog(source)}): ` +
        JSON.stringify({ brand, code, name, hex, rgb })
    );
    return null;
  }

  const brandKey = brand.toLowerCase();
  const canonicalKey = `${brandKey}::${code}`;
  const confidence = resolveConfidence(raw?.confidence ?? ctx.confidence, source.type);
  const meta = applyTimestamps(raw?.meta, ctx);

  return {
    brand,
    brandKey,
    code,
    name,
    hex,
    rgb,
    thickness: raw?.thickness,
    source,
    confidence,
    meta,
    canonicalKey
  };
}

export function dedupeThreads(records = []) {
  const byKey = new Map();

  records.forEach(rec => {
    if (!rec || !rec.canonicalKey) return;
    const existing = byKey.get(rec.canonicalKey);
    if (!existing) {
      byKey.set(rec.canonicalKey, { ...rec });
      return;
    }

    if (existing.hex === rec.hex) {
      const mergedSources = existing.sources || [existing.source];
      const incomingSource = rec.source;
      if (incomingSource && !mergedSources.some(s => JSON.stringify(s) === JSON.stringify(incomingSource))) {
        mergedSources.push(incomingSource);
      }
      existing.sources = mergedSources;
      existing.meta = { ...rec.meta, ...existing.meta };
      byKey.set(rec.canonicalKey, existing);
      return;
    }

    const existingConf = typeof existing.confidence === "number" ? existing.confidence : 0;
    const incomingConf = typeof rec.confidence === "number" ? rec.confidence : 0;
    const keepIncoming = incomingConf > existingConf;
    const keep = keepIncoming ? rec : existing;
    const alt = keepIncoming ? existing : rec;

    const alternates = keep.alternates ? [...keep.alternates] : [];
    if (alt.alternates && Array.isArray(alt.alternates)) {
      alternates.push(...alt.alternates);
    }
    alternates.push({
      hex: alt.hex,
      rgb: alt.rgb,
      source: alt.source,
      confidence: alt.confidence
    });
    keep.alternates = alternates;

    byKey.set(rec.canonicalKey, keep);
    console.warn(
      `[dedupe] Conflict on ${rec.canonicalKey} (${formatSourceForLog(rec.source)}): ` +
        `${existing.hex} vs ${rec.hex} -> keeping ${keepIncoming ? rec.hex : existing.hex}`
    );
  });

  return Array.from(byKey.values());
}

export function normalizeAndDedupeThreads(records = [], ctx = {}) {
  const normalized = [];
  records.forEach(raw => {
    const n = normalizeThreadRecord(raw, ctx);
    if (n) normalized.push(n);
  });
  return dedupeThreads(normalized);
}

````

## dependency-audit.json
````text
{
  "entrypoints": [
    "index.html",
    "account.html",
    "worlds/palette.html",
    "worlds/threadcolor.html",
    "worlds/threadvault.html"
  ],
  "stats": {
    "total": 41,
    "reachable": 15,
    "unreachable": 26,
    "missing": 2,
    "suspected_runtime": 0,
    "ignored_builtin": 7,
    "ignored_external": 3
  },
  "missing": [
    {
      "from": "tools/validate_threads.mjs",
      "rawRef": "../threads.cleaned.json",
      "resolvedRef": "threads.cleaned.json",
      "kind": "internal",
      "note": "Không tìm thấy file"
    },
    {
      "from": "tools/validate_threads.mjs",
      "rawRef": "../threads.conflicts.json",
      "resolvedRef": "threads.conflicts.json",
      "kind": "internal",
      "note": "Không tìm thấy file"
    }
  ],
  "suspected_runtime": [],
  "nodes": [
    {
      "path": ".github/CODEOWNERS",
      "type": "",
      "reachable": false,
      "category": "tooling",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": ".github/ISSUE_TEMPLATE/bug_report.yml",
      "type": ".yml",
      "reachable": false,
      "category": "tooling",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": ".github/ISSUE_TEMPLATE/feature_request.yml",
      "type": ".yml",
      "reachable": false,
      "category": "tooling",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": ".github/pull_request_template.md",
      "type": ".md",
      "reachable": false,
      "category": "doc",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "account.html",
      "type": ".html",
      "reachable": true,
      "category": "runtime",
      "refs_in": [],
      "refs_out": [
        "index.html",
        "assets/spacecolors-logo-topbar.png",
        "worlds/threadcolor.html",
        "worlds/palette.html",
        "worlds/threadvault.html",
        "worlds/threadcolor.html",
        "worlds/palette.html",
        "auth.js"
      ]
    },
    {
      "path": "index.html",
      "type": ".html",
      "reachable": true,
      "category": "runtime",
      "refs_in": [
        "account.html",
        "index.html",
        "worlds/palette.html",
        "worlds/threadcolor.html",
        "worlds/threadvault.html"
      ],
      "refs_out": [
        "index.html",
        "assets/spacecolors-logo-topbar.png",
        "worlds/threadcolor.html",
        "worlds/palette.html",
        "worlds/threadcolor.html",
        "worlds/threadcolor.html",
        "worlds/threadcolor.html",
        "i18n.js",
        "auth.js"
      ]
    },
    {
      "path": "assets/spacecolors-logo-topbar.png",
      "type": ".png",
      "reachable": true,
      "category": "asset",
      "refs_in": [
        "account.html",
        "index.html",
        "worlds/palette.html",
        "worlds/threadcolor.html",
        "worlds/threadvault.html"
      ],
      "refs_out": []
    },
    {
      "path": "worlds/threadcolor.html",
      "type": ".html",
      "reachable": true,
      "category": "runtime",
      "refs_in": [
        "account.html",
        "account.html",
        "index.html",
        "index.html",
        "index.html",
        "index.html",
        "worlds/palette.html",
        "worlds/palette.html",
        "worlds/threadcolor.html",
        "worlds/threadvault.html",
        "worlds/threadvault.html",
        "worlds/threadvault.html",
        "worlds/threadvault.html"
      ],
      "refs_out": [
        "index.html",
        "assets/spacecolors-logo-topbar.png",
        "worlds/threadcolor.html",
        "worlds/palette.html",
        "worlds/threadvault.html",
        "i18n.js",
        "auth.js",
        "script.js"
      ]
    },
    {
      "path": "worlds/palette.html",
      "type": ".html",
      "reachable": true,
      "category": "runtime",
      "refs_in": [
        "account.html",
        "account.html",
        "index.html",
        "worlds/palette.html",
        "worlds/threadcolor.html",
        "worlds/threadvault.html"
      ],
      "refs_out": [
        "index.html",
        "assets/spacecolors-logo-topbar.png",
        "worlds/threadcolor.html",
        "worlds/palette.html",
        "worlds/threadcolor.html",
        "auth.js"
      ]
    },
    {
      "path": "worlds/threadvault.html",
      "type": ".html",
      "reachable": true,
      "category": "runtime",
      "refs_in": [
        "account.html",
        "worlds/threadcolor.html"
      ],
      "refs_out": [
        "index.html",
        "assets/spacecolors-logo-topbar.png",
        "worlds/threadcolor.html",
        "worlds/palette.html",
        "worlds/threadcolor.html",
        "worlds/threadcolor.html",
        "worlds/threadcolor.html",
        "i18n.js",
        "auth.js",
        "script.js",
        "stock.js"
      ]
    },
    {
      "path": "auth.js",
      "type": ".js",
      "reachable": true,
      "category": "runtime",
      "refs_in": [
        "account.html",
        "index.html",
        "worlds/palette.html",
        "worlds/threadcolor.html",
        "worlds/threadvault.html"
      ],
      "refs_out": []
    },
    {
      "path": "assets/Logo SpaceColors.png",
      "type": ".png",
      "reachable": false,
      "category": "asset",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "assets/spacecolors-mark-512.png",
      "type": ".png",
      "reachable": false,
      "category": "asset",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "assets/spacecolors-mark-64.png",
      "type": ".png",
      "reachable": false,
      "category": "asset",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "CONTRIBUTING.md",
      "type": ".md",
      "reachable": false,
      "category": "doc",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "crowd.js",
      "type": ".js",
      "reachable": true,
      "category": "runtime",
      "refs_in": [
        "script.js"
      ],
      "refs_out": [
        "data_normalize.js"
      ]
    },
    {
      "path": "data_normalize.js",
      "type": ".js",
      "reachable": true,
      "category": "runtime",
      "refs_in": [
        "crowd.js",
        "script.js",
        "tools/import_tch.mjs"
      ],
      "refs_out": []
    },
    {
      "path": "data/raw_tch/Ackerman Isacord 30.tch",
      "type": ".tch",
      "reachable": false,
      "category": "runtime",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "data/threads.generated.json",
      "type": ".json",
      "reachable": false,
      "category": "data",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "dependency-audit.json",
      "type": ".json",
      "reachable": false,
      "category": "data",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "dependency-audit.md",
      "type": ".md",
      "reachable": false,
      "category": "doc",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "DOC/00_TOAN_CANH.md",
      "type": ".md",
      "reachable": false,
      "category": "doc",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "DOC/01_WORKFLOW.md",
      "type": ".md",
      "reachable": false,
      "category": "doc",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "DOC/02_QUAN_TRI_GITHUB.md",
      "type": ".md",
      "reachable": false,
      "category": "doc",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "DOC/REPO_SNAPSHOT.md",
      "type": ".md",
      "reachable": false,
      "category": "doc",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "firestore.rules",
      "type": ".rules",
      "reachable": false,
      "category": "runtime",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "i18n.js",
      "type": ".js",
      "reachable": true,
      "category": "runtime",
      "refs_in": [
        "index.html",
        "worlds/threadcolor.html",
        "worlds/threadvault.html"
      ],
      "refs_out": []
    },
    {
      "path": "library.js",
      "type": ".js",
      "reachable": true,
      "category": "runtime",
      "refs_in": [
        "script.js"
      ],
      "refs_out": []
    },
    {
      "path": "README.md",
      "type": ".md",
      "reachable": false,
      "category": "doc",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "script.js",
      "type": ".js",
      "reachable": true,
      "category": "runtime",
      "refs_in": [
        "worlds/threadcolor.html",
        "worlds/threadvault.html"
      ],
      "refs_out": [
        "library.js",
        "data_normalize.js",
        "crowd.js",
        "workers/thread_search.worker.js",
        "threads.json",
        "threads.json"
      ]
    },
    {
      "path": "workers/thread_search.worker.js",
      "type": ".js",
      "reachable": true,
      "category": "runtime",
      "refs_in": [
        "script.js"
      ],
      "refs_out": []
    },
    {
      "path": "threads.json",
      "type": ".json",
      "reachable": true,
      "category": "data",
      "refs_in": [
        "script.js",
        "script.js",
        "tools/normalize_threads.mjs",
        "tools/validate_threads.mjs"
      ],
      "refs_out": []
    },
    {
      "path": "SECURITY.md",
      "type": ".md",
      "reachable": false,
      "category": "doc",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "stock.js",
      "type": ".js",
      "reachable": true,
      "category": "runtime",
      "refs_in": [
        "worlds/threadvault.html"
      ],
      "refs_out": []
    },
    {
      "path": "style.css",
      "type": ".css",
      "reachable": false,
      "category": "runtime",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "themes.css",
      "type": ".css",
      "reachable": false,
      "category": "runtime",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "tools/bootstrap_admin.mjs",
      "type": ".mjs",
      "reachable": false,
      "category": "tooling",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "tools/dependency_audit.mjs",
      "type": ".mjs",
      "reachable": false,
      "category": "tooling",
      "refs_in": [],
      "refs_out": []
    },
    {
      "path": "tools/import_tch.mjs",
      "type": ".mjs",
      "reachable": false,
      "category": "tooling",
      "refs_in": [],
      "refs_out": [
        "data_normalize.js"
      ]
    },
    {
      "path": "tools/normalize_threads.mjs",
      "type": ".mjs",
      "reachable": false,
      "category": "tooling",
      "refs_in": [],
      "refs_out": [
        "tools/validate_threads.mjs",
        "threads.json"
      ]
    },
    {
      "path": "tools/validate_threads.mjs",
      "type": ".mjs",
      "reachable": false,
      "category": "tooling",
      "refs_in": [
        "tools/normalize_threads.mjs"
      ],
      "refs_out": [
        "threads.json"
      ]
    }
  ],
  "edges": [
    {
      "from": "account.html",
      "to": "index.html",
      "kind": "internal"
    },
    {
      "from": "account.html",
      "to": "assets/spacecolors-logo-topbar.png",
      "kind": "internal"
    },
    {
      "from": "account.html",
      "to": "worlds/threadcolor.html",
      "kind": "internal"
    },
    {
      "from": "account.html",
      "to": "worlds/palette.html",
      "kind": "internal"
    },
    {
      "from": "account.html",
      "to": "worlds/threadvault.html",
      "kind": "internal"
    },
    {
      "from": "account.html",
      "to": "worlds/threadcolor.html",
      "kind": "internal"
    },
    {
      "from": "account.html",
      "to": "worlds/palette.html",
      "kind": "internal"
    },
    {
      "from": "account.html",
      "to": "auth.js",
      "kind": "internal"
    },
    {
      "from": "crowd.js",
      "to": "data_normalize.js",
      "kind": "internal"
    },
    {
      "from": "index.html",
      "to": "index.html",
      "kind": "internal"
    },
    {
      "from": "index.html",
      "to": "assets/spacecolors-logo-topbar.png",
      "kind": "internal"
    },
    {
      "from": "index.html",
      "to": "worlds/threadcolor.html",
      "kind": "internal"
    },
    {
      "from": "index.html",
      "to": "worlds/palette.html",
      "kind": "internal"
    },
    {
      "from": "index.html",
      "to": "worlds/threadcolor.html",
      "kind": "internal"
    },
    {
      "from": "index.html",
      "to": "worlds/threadcolor.html",
      "kind": "internal"
    },
    {
      "from": "index.html",
      "to": "worlds/threadcolor.html",
      "kind": "internal"
    },
    {
      "from": "index.html",
      "to": "i18n.js",
      "kind": "internal"
    },
    {
      "from": "index.html",
      "to": "auth.js",
      "kind": "internal"
    },
    {
      "from": "script.js",
      "to": "library.js",
      "kind": "internal"
    },
    {
      "from": "script.js",
      "to": "data_normalize.js",
      "kind": "internal"
    },
    {
      "from": "script.js",
      "to": "crowd.js",
      "kind": "internal"
    },
    {
      "from": "script.js",
      "to": "workers/thread_search.worker.js",
      "kind": "internal"
    },
    {
      "from": "script.js",
      "to": "threads.json",
      "kind": "internal"
    },
    {
      "from": "script.js",
      "to": "threads.json",
      "kind": "internal"
    },
    {
      "from": "tools/import_tch.mjs",
      "to": "data_normalize.js",
      "kind": "internal"
    },
    {
      "from": "tools/normalize_threads.mjs",
      "to": "tools/validate_threads.mjs",
      "kind": "internal"
    },
    {
      "from": "tools/normalize_threads.mjs",
      "to": "threads.json",
      "kind": "internal"
    },
    {
      "from": "tools/validate_threads.mjs",
      "to": "threads.json",
      "kind": "internal"
    },
    {
      "from": "worlds/palette.html",
      "to": "index.html",
      "kind": "internal"
    },
    {
      "from": "worlds/palette.html",
      "to": "assets/spacecolors-logo-topbar.png",
      "kind": "internal"
    },
    {
      "from": "worlds/palette.html",
      "to": "worlds/threadcolor.html",
      "kind": "internal"
    },
    {
      "from": "worlds/palette.html",
      "to": "worlds/palette.html",
      "kind": "internal"
    },
    {
      "from": "worlds/palette.html",
      "to": "worlds/threadcolor.html",
      "kind": "internal"
    },
    {
      "from": "worlds/palette.html",
      "to": "auth.js",
      "kind": "internal"
    },
    {
      "from": "worlds/threadcolor.html",
      "to": "index.html",
      "kind": "internal"
    },
    {
      "from": "worlds/threadcolor.html",
      "to": "assets/spacecolors-logo-topbar.png",
      "kind": "internal"
    },
    {
      "from": "worlds/threadcolor.html",
      "to": "worlds/threadcolor.html",
      "kind": "internal"
    },
    {
      "from": "worlds/threadcolor.html",
      "to": "worlds/palette.html",
      "kind": "internal"
    },
    {
      "from": "worlds/threadcolor.html",
      "to": "worlds/threadvault.html",
      "kind": "internal"
    },
    {
      "from": "worlds/threadcolor.html",
      "to": "i18n.js",
      "kind": "internal"
    },
    {
      "from": "worlds/threadcolor.html",
      "to": "auth.js",
      "kind": "internal"
    },
    {
      "from": "worlds/threadcolor.html",
      "to": "script.js",
      "kind": "internal"
    },
    {
      "from": "worlds/threadvault.html",
      "to": "index.html",
      "kind": "internal"
    },
    {
      "from": "worlds/threadvault.html",
      "to": "assets/spacecolors-logo-topbar.png",
      "kind": "internal"
    },
    {
      "from": "worlds/threadvault.html",
      "to": "worlds/threadcolor.html",
      "kind": "internal"
    },
    {
      "from": "worlds/threadvault.html",
      "to": "worlds/palette.html",
      "kind": "internal"
    },
    {
      "from": "worlds/threadvault.html",
      "to": "worlds/threadcolor.html",
      "kind": "internal"
    },
    {
      "from": "worlds/threadvault.html",
      "to": "worlds/threadcolor.html",
      "kind": "internal"
    },
    {
      "from": "worlds/threadvault.html",
      "to": "worlds/threadcolor.html",
      "kind": "internal"
    },
    {
      "from": "worlds/threadvault.html",
      "to": "i18n.js",
      "kind": "internal"
    },
    {
      "from": "worlds/threadvault.html",
      "to": "auth.js",
      "kind": "internal"
    },
    {
      "from": "worlds/threadvault.html",
      "to": "script.js",
      "kind": "internal"
    },
    {
      "from": "worlds/threadvault.html",
      "to": "stock.js",
      "kind": "internal"
    }
  ]
}
````

## dependency-audit.md
````text
# Báo cáo dependency audit

- Tổng file: 41
- Reachable: 15
- Unreachable: 26
- Missing references: 2
- Nghi vấn runtime: 0
- Builtin bỏ qua: 7
- External bỏ qua: 3

## Entry points
```text
index.html
account.html
worlds/palette.html
worlds/threadcolor.html
worlds/threadvault.html
```

## File bị reference nhưng thiếu (internal)
| From | Ref | Raw |
|---|---|---|
| tools/validate_threads.mjs | threads.cleaned.json | ../threads.cleaned.json |
| tools/validate_threads.mjs | threads.conflicts.json | ../threads.conflicts.json |

## File chết chắc chắn (unreachable)
| File |
|---|
| assets/Logo SpaceColors.png |
| assets/spacecolors-mark-512.png |
| assets/spacecolors-mark-64.png |
| data/raw_tch/Ackerman Isacord 30.tch |
| data/threads.generated.json |
| dependency-audit.json |
| firestore.rules |
| style.css |
| themes.css |

## Nghi vấn runtime
- Không phát hiện.

## Builtin/External đã bỏ qua
- Builtin: 7
- External: 3

## Kế hoạch dọn rác an toàn
- Chuyển file nghi ngờ không dùng vào thư mục _graveyard/ trong 7 ngày trước khi xoá.
- Theo dõi lỗi runtime/404 rồi mới xoá vĩnh viễn.

````

## DOC/00_TOAN_CANH.md
````text
# Toàn cảnh ThreadColor

## Mục tiêu
ThreadColor là World “Thế giới màu thêu” trong hệ sinh thái 8Portals, tập trung vào tra mã chỉ theo màu, hỗ trợ lọc theo hãng, xác minh dữ liệu và công cụ kiểm tra màu chuyên sâu.

## Sơ đồ tổng quan (Mermaid)
```mermaid
flowchart TD
  UI[Index / Worlds] --> Core[Core JS]
  Core --> Data[threads.json + normalize]
  Core --> Worker[worker: thread_search.worker.js]
  Auth[auth.js + Firebase] --> Firestore[Firestore]
  Firestore --> Library[Library / Saved]
  Core --> UI
```

## Module map (đi kèm đường dẫn)
- UI:
  - `index.html` (Sảnh điều phối)
  - `worlds/threadcolor.html` (World 1)
  - `worlds/threadvault.html` (Kho chỉ)
- Core logic:
  - `script.js` (tìm kiếm, render, inspector, library)
- Dữ liệu:
  - `threads.json`
  - `data_normalize.js` (chuẩn hoá + confidence)
- Worker:
  - `workers/thread_search.worker.js`
- Auth + Firestore:
  - `auth.js`, `library.js`, `crowd.js`
- I18n:
  - `i18n.js`

## Trách nhiệm module (tóm tắt)
| Module | Vai trò | Owner (tạm) | Rủi ro |
|---|---|---|---|
| `script.js` | Tìm kiếm, render, UI logic chính | @repo-owner | Hiệu năng/lag nếu query nặng |
| `data_normalize.js` | Chuẩn hoá dữ liệu đầu vào | @repo-owner | Sai confidence làm lọc verified rỗng |
| Worker | Tối ưu tìm kiếm nặng | @repo-owner | Sai contract làm UI lỗi |
| Auth/Library | Đăng nhập + lưu kết quả | @repo-owner | Quyền Firestore, UX login |

## Khi muốn sửa tính năng X
- “Tìm mã chỉ gần nhất”: `script.js` + `workers/thread_search.worker.js`
- “Tra theo mã chỉ”: `script.js` + `threadsByCode` index
- “Lọc chỉ đã xác minh”: `data_normalize.js` + `isVerifiedThread`
- “Lưu/Thư viện”: `library.js` + `script.js`

## Guardrails bắt buộc
- Không phá login top-right (#topbarAuthSlot).
- Không phá filter hãng + trạng thái “Xong. Dữ liệu đã sẵn sàng.”
- Không đổi id/class đang được JS sử dụng.

````

## DOC/01_NOW.md
````text
# 01_NOW — Tuần này chúng ta đang làm gì

updated_at: 2025-12-31
owner: Chủ tịch / Thư ký tổng

## Top 3 ưu tiên (tuần này)
1.
2.
3.

## Đang làm (In progress)
-

## Tiếp theo (7 ngày)
-

## Anti-goals (tuần này KHÔNG làm)
-

## Rủi ro chính (tối đa 3)
-

````

## DOC/01_WORKFLOW.md
````text
# Workflow chuẩn

## Quy trình
1) Tạo Issue từ template (bug/feature).
2) Tạo branch theo quy ước: `type/ngan-gon` (vd: `fix/verified-filter`).
3) Mở PR → review → merge.
4) Deploy GitHub Pages (nếu có).

## Quy tắc bắt buộc
- Giữ tiếng Việt cho mọi text hiển thị.
- Không phá login top-right và luồng auth.
- Không đổi id/class mà JS đang phụ thuộc (trừ khi cập nhật đồng bộ).
- Không sửa ngoài phạm vi được phép.

## Checklist test nhanh (PASS/FAIL)
- [ ] Mở `worlds/threadcolor.html` qua static server, không lỗi console.
- [ ] Dòng “Xong. Dữ liệu đã sẵn sàng.” xuất hiện sau load.
- [ ] Filter hãng hoạt động, kết quả thay đổi.
- [ ] “Tìm mã chỉ gần nhất” trả kết quả.
- [ ] Tra theo mã chỉ: “310” và “DMC 310” hoạt động.
- [ ] Login top-right vẫn hiển thị và hoạt động.

## Quy ước đặt tên
- Issue: `[P0|P1|P2] <mô tả ngắn>`
- PR: `[P0|P1|P2] <mô tả ngắn>`

````

## DOC/02_QUAN_TRI_GITHUB.md
````text
# Quản trị GitHub (gợi ý)

## Labels đề xuất
- P0-Sống còn
- P1-Quan trọng
- P2-Nâng cấp
- Khu vực-UI
- Khu vực-Auth
- Khu vực-Dữ liệu
- Khu vực-Hiệu năng
- Khu vực-Deploy
- Bug
- Tính năng

> Lưu ý: labels cần tạo thủ công trong GitHub UI.

## Project board đề xuất
Tạo GitHub Project với các cột:
- Backlog
- Đang làm
- Review
- Sẵn sàng Deploy
- Done

## Quy ước quản trị
- Mỗi PR phải gắn ít nhất 1 label P0/P1/P2.
- Mỗi issue lớn nên có checklist test nhanh trong mô tả.

````

## DOC/03_RUNTIME_CONTRACT.md
````text
# Runtime Contract

## Runtime Core (khong dung neu khong can)
- index.html
- account.html
- worlds/threadcolor.html
- worlds/threadvault.html
- worlds/palette.html
- auth.js
- i18n.js
- script.js
- library.js
- data_normalize.js
- crowd.js
- stock.js
- workers/thread_search.worker.js
- threads.json
- assets/spacecolors-logo-topbar.png

## Checklist test PASS/FAIL
- Mo index.html: khong co loi console nghiem trong
- Vao 3 world: threadcolor / threadvault / palette
- Login hien thi top-right, khong nhay layout
- Search dung worker hoat dong
- threads.json load OK (khong 404)

## Nguyen tac don rac
- Quarantine 7 ngay truoc khi xoa
- Moi thay doi phai kem grep + checklist

````

## DOC/04_CƠ_CẤU_VẬN_HÀNH.md
````text
# 04_CƠ_CẤU_VẬN_HÀNH — Thiết lập Cơ cấu Vận hành 8Portals

> **Mục tiêu:** phân định rõ vai trò – trách nhiệm – quyền hạn – đầu ra – nhịp điều hành để 8Portals vận hành “Đẹp • Mượt • Sang • Sạch • Đắt • Workflow mạnh” mà không phình bộ máy.

---

## 1) Ba luật thắng (Winning Constraints) — Bất biến
1) **BLOCK = 0**: có BLOCK là ưu tiên P0, không merge.
2) **Health Score ≥ 90**: dưới 90 phải có kế hoạch kéo lên.
3) **Đăng nhập TOP-right bất biến**: không nhảy layout, không đổi “slot” tuỳ tiện.

---

## 2) Cơ cấu tinh gọn (không tuyển người thật)
### Vai trò cố định
- **Chủ tịch**: quyết định “cửa một chiều” + ra lệnh “Gọi Codex vào làm việc”.
- **8Portals CEO (em)**: chốt phương án tối ưu, thiết kế plan (scope file / rủi ro / checklist PASS–FAIL).
- **Thư ký tổng (GPT)**: radar/triage/brief; duy trì NOW/DECISIONS/RISKS/ACTIONS; đề xuất lệnh cho Chủ tịch.

### 4 chiếc mũ (hat roles) — kiêm nhiệm bằng GPTs
> Chủ tịch có thể gán “owner” tạm thời theo GPTs, không cần người thật.

1) **Kiến trúc sư trưởng (CTO/Architect)**  
   - Giữ kiến trúc + ranh giới module + chuẩn kỹ thuật + gác cổng chất lượng.
2) **Giám đốc Trải nghiệm (Product/Design)**  
   - Giữ “taste”: UI/UX, microcopy, consistency desktop/mobile.
3) **Quản gia Dữ liệu (Data Steward)**  
   - Giữ hợp đồng dữ liệu, chất lượng dữ liệu, chính sách artifact/source.
4) **Giám đốc Cộng đồng & Tăng trưởng (Growth/Community)** *(kích hoạt sau)*  
   - Khi bắt đầu mở đóng góp/cộng đồng/marketplace thì mới cần.

---

## 3) Ranh giới quyền hạn (Authority Boundary)
### Thư ký tổng (GPT) được phép
- Tóm tắt tình hình (score/trend), triage BLOCK/WARN/INFO.
- Đề xuất lựa chọn và **3 câu lệnh** (copy/paste) cho Chủ tịch.

### Thư ký tổng (GPT) không được phép
- Không tự ý quyết định kỹ thuật/chiến lược.
- Không tự ý yêu cầu xoá thẳng (phải quarantine 7 ngày).
- Không viết prompt Codex thay CEO.

### CEO (em) chịu trách nhiệm
- Chốt phương án tối ưu + trade-off.
- Viết plan + scope file + rủi ro + checklist test.
- Khi Chủ tịch ra lệnh: viết prompt Codex “sạch & an toàn”.

---

## 4) Đầu ra bắt buộc theo vai (Outputs)
### Chủ tịch
- Chốt **Top 1 ưu tiên/tuần** (1 câu).
- Các quyết định quan trọng ghi vào **DECISIONS**.

### Thư ký tổng (GPT)
- **Daily Brief** (≤ 20 dòng) theo template.
- Weekly Brief: cập nhật **NOW**.
- Duy trì **DECISIONS / RISKS / ACTIONS**.

### CEO (em)
- Mỗi yêu cầu: Plan theo format chuẩn (scope/risk/checklist).
- Khi “Gọi Codex”: 1 prompt duy nhất, rõ mục tiêu + guardrails.

### CTO/Architect (GPT)
- Đề xuất kiến trúc, tiêu chuẩn kỹ thuật, “gác cổng” CI.
- 1 “chốt kiến trúc”/tháng (ngắn gọn).

### Product/Design (GPT)
- 1 vòng polish/tuần: microcopy + mobile layout + consistency.

### Data Steward (GPT)
- Chốt data contract, artifact policy, versioning.

---

## 5) Ma trận RACI (đơn giản, đủ dùng)
| Hạng mục | Chủ tịch | CEO | Thư ký tổng | CTO GPT | Design GPT | Data GPT |
|---|---|---|---|---|---|---|
| P0 Fix (BLOCK) | A | R | C | C | I | C |
| Dọn sạch (quarantine) | A | R | C | C | I | C |
| Tối ưu UX/microcopy | A | R | C | I | C | I |
| Data contract/artifact policy | A | R | C | C | I | C |
| Nhịp điều hành (brief/log) | A | C | R | I | I | I |

> R = Responsible (làm) • A = Accountable (chịu trách nhiệm cuối) • C = Consulted (tham vấn) • I = Informed (được biết)

---

## 6) Giao thức ra lệnh nhanh (Command Language)
- “**Đập P0 ngay**” → ưu tiên fix BLOCK.
- “**Dọn sạch theo quarantine**” → lập danh sách cách ly 7 ngày.
- “**Kéo score lên ≥ 90 trong 7 ngày**” → kế hoạch kéo điểm.
- “**Mở world mới theo spec**” → chuẩn bị spec + checklist.


````

## DOC/05_NHỊP_ĐIỀU_HÀNH.md
````text
# 05_NHỊP_ĐIỀU_HÀNH — Cadence 8Portals

> Mục tiêu: vận hành như “ông lớn” nhưng gọn. Ít họp, nhiều đầu ra.

---

## 1) Nhịp hằng ngày (5–10 phút)
**Người gửi:** Thư ký tổng (GPT)  
**Đầu vào:** CEO_COCKPIT + health-trend + NOW + repo_health (artifact)  
**Đầu ra:** Daily Brief (≤ 20 dòng) gồm:
1) Radar: Score/BLOCK/WARN + trend 7 ngày  
2) Top 3 P0 (nếu có)  
3) Top 3 P1 (dọn sạch/tối ưu)  
4) Rủi ro (≤ 2 dòng)  
5) Quyết định cần gật (1–2)  
6) 3 câu lệnh đề xuất (copy/paste)

---

## 2) Nhịp hằng tuần (30 phút)
**Thời điểm gợi ý:** Chủ nhật 20:00  
**Mục tiêu:** chốt “tuần này làm gì” (Top 3) và “không làm gì” (anti-goals)

**Agenda:**
- 10’ xem trend (score/WARN)  
- 10’ chốt Top 3 + anti-goals  
- 10’ chốt 1 quyết định quan trọng (ghi DECISIONS)

**Đầu ra:**
- Cập nhật `DOC/01_NOW.md`
- Cập nhật `DOC/ACTIONS.md` (Top 3 tuần)

---

## 3) Nhịp hằng tháng (60 phút) — chỉ khi nền ổn
**Mục tiêu:** review kiến trúc + roadmap hệ sinh thái (world/data/community)

**Đầu ra:**
- 1 “chốt kiến trúc” ngắn (ADR/ghi chú) nếu có thay đổi lớn
- 1 “gói tối ưu” (perf/UX/data) cho tháng tiếp theo

---

## 4) Quy tắc báo cáo (để luôn “sang & sạch”)
- Mỗi mục tối đa 3 bullet.
- Có BLOCK → đưa lên đầu, không bàn chuyện đẹp.
- Quarantine 7 ngày trước khi xoá hẳn.


````

## DOC/06_TIÊU_CHUẨN_CHẤT_LƯỢNG.md
````text
# 06_TIÊU_CHUẨN_CHẤT_LƯỢNG — Quality Bar 8Portals

> Tiêu chí tối cao: **Đẹp • Mượt • Sang • Đã • Nghiện • Sạch • Đắt • Chất • Workflow mạnh • Hệ sinh thái thịnh vượng • Tối ưu • Hiện đại • Tự động hoá**

---

## 1) Tiêu chuẩn UX/UI (desktop + mobile)
- **Đăng nhập TOP-right bất biến**: không nhảy layout khi resize/login/logout.
- Mobile first: không tràn topbar, nút bấm đủ lớn, không vỡ chữ.
- Empty/Error state phải “sang”: gọn, rõ, không xin lỗi, không spam.

---

## 2) Tiêu chuẩn hiệu năng “mượt”
- Việc nặng chạy ở **tiến trình phụ** (worker) khi phù hợp.
- Không làm UI giật khi gõ tìm kiếm (debounce, index).
- Dữ liệu lớn phải có chiến lược: cache/versioning/virtual list.

---

## 3) Tiêu chuẩn dữ liệu “sạch”
- Có **Nguồn dữ liệu gốc** (source of truth) rõ ràng.
- Tệp sinh ra (artifact) không làm bẩn git (ignore/CI artifact).
- Hợp đồng dữ liệu: schema + version + quy trình cập nhật.

---

## 4) Tiêu chuẩn bảo mật “đúng quyền”
- Quy tắc truy cập dữ liệu theo **tối thiểu quyền**.
- Không public write khi có backend dữ liệu.

---

## 5) Tiêu chuẩn kho mã “workflow mạnh”
- BLOCK = 0 mới merge.
- Có Repo Doctor + Health Score + Trend 7 ngày.
- Quarantine 7 ngày trước khi xoá.

---

## 6) Definition of Done (DoD) cho mọi thay đổi
- Có mô tả thay đổi + phạm vi file.
- Có checklist PASS/FAIL.
- Không phá 3 luật thắng.
- Có rollback plan (nếu là quyết định “cửa một chiều”).


````

## DOC/ACTIONS.md
````text
# ACTIONS — Hàng đợi hành động

<!-- AUTO_START -->
updated_at: 2026-01-04
Health: Score 91 | BLOCK 0 | WARN 3 | INFO 5

Top việc cần làm (AUTO):
1. [AUTO-649BEB65][P1] Asset/CSS không được tham chiếu - Owner: Design GPT - Không có refs_in
2. [AUTO-717CFE01][P1] File lớn - Owner: Design GPT - 2859 KB
3. [AUTO-D5187625][P1] TODO/FIXME - Owner: Design GPT - Tổng 31 mục
<!-- AUTO_END -->

## THỦ CÔNG

| ID | Việc | Mức | Owner | Hạn | Trạng thái | Ghi chú |
|---|---|---|---|---|---|---|
| A-001 |  | P0/P1/P2 |  | YYYY-MM-DD | Todo/In progress/Done |  |
````

## DOC/audit/quarantine-candidates.json
````text
{
  "generated_by": "tools/quarantine_candidates.mjs",
  "total_candidates": 0,
  "candidates": [],
  "manual_candidates": []
}
````

## DOC/audit/quarantine-candidates.md
````text
# Ứng viên cách ly (Quarantine)

Tổng số ứng viên: 0

## Danh sách ứng viên
- (không có)

## Cần duyệt tay
- (không có)
````

## DOC/CEO_COCKPIT.md
````text
# CEO COCKPIT — 8Portals

Tham chiếu nhanh:
- North Star: (TODO)
- Now: (TODO)
- Architecture: DOC/00_TOAN_CANH.md
- Runtime Contract: DOC/03_RUNTIME_CONTRACT.md

## Điều hành 1-click
- [REPO_SNAPSHOT — Cây thư mục & thống kê](REPO_SNAPSHOT.md)
- [ACTIONS — Hàng đợi hành động](ACTIONS.md)
- [RISKS — Sổ rủi ro](RISKS.md)
- [01_NOW — Tuần này đang làm gì](01_NOW.md)
- [DECISIONS — Sổ quyết định](DECISIONS.md)

## North Star & 3 leading
- [NORTH_STAR — TMTC-7](NORTH_STAR.md)
- [EVENT_MAP — Sự kiện tối thiểu](EVENT_MAP.md)

<!-- OPS_SUMMARY_START -->
updated_at: 2026-01-04
Health: Score 91 | BLOCK 0 | WARN 3 | INFO 5
Top việc (AUTO):
- [AUTO-649BEB65][P1] Asset/CSS không được tham chiếu - Owner: Design GPT - Không có refs_in
- [AUTO-717CFE01][P1] File lớn - Owner: Design GPT - 2859 KB
- [AUTO-D5187625][P1] TODO/FIXME - Owner: Design GPT - Tổng 31 mục
Top rủi ro (AUTO):
- (không có)
<!-- OPS_SUMMARY_END -->

## Sức khoẻ Repo

<!-- HEALTH_START -->
Điểm hiện tại: **91**
- BLOCK: 0 | WARN: 3

Top lý do:
- WARN: File lớn (1)
- WARN: Asset/CSS không được tham chiếu (1)
- WARN: TODO/FIXME (1)

| Ngày | Score | BLOCK | WARN |
|---|---:|---:|---:|
| 2025-12-31 | 97 | 0 | 1 |
| 2026-01-01 | 97 | 0 | 1 |
| 2026-01-02 | 97 | 0 | 1 |
| 2026-01-04 | 91 | 0 | 3 |
<!-- HEALTH_END -->

````

## DOC/DECISIONS.md
````text
# DECISIONS — Sổ quyết định

| Ngày | Quyết định | Lý do | One-way / Two-way | Rủi ro | Tiêu chí rollback |
|---|---|---|---|---|---|
| YYYY-MM-DD |  |  |  |  |  |

````

## DOC/DEV_EMULATORS.md
````text
# DEV_EMULATORS — Hướng dẫn chạy Firebase Emulator Suite

## 1) Mục tiêu
Chạy local: Hosting + Functions + Firestore (không cần deploy).

## 2) Chuẩn bị
### Cài dependencies cho Functions
```bash
cd functions
npm install
```

### (Tuỳ chọn) Build TypeScript trước khi chạy
```bash
npm run build
```

## 3) Chạy Emulator Suite
Từ repo root:
```bash
firebase emulators:start
```

Các cổng mặc định (đã cấu hình):
- Hosting: http://localhost:5000
- Functions: http://localhost:5001
- Firestore: http://localhost:8080
- Emulator UI: http://localhost:4000

## 4) Smoke test telemetry
1) Mở trang ThreadColor qua Hosting emulator:
   - http://localhost:5000/worlds/threadcolor.html
2) Thực hiện các thao tác:
   - Tra màu, có kết quả
   - Ghim / Copy / Lưu kho chỉ
3) DevTools → Network:
   - Xác nhận request POST tới `/telemetry/ingest` trả 200.
4) Firestore emulator:
   - Kiểm tra collection `metrics_daily/{YYYY-MM-DD}`
   - Thấy các trường đếm (`search_start`, `search_result`, `pin`, `copy`, `save`) tăng.

## 5) Lưu ý quan trọng
- Emulator không ảnh hưởng production.
- Nếu thiếu `firebaseConfig` ở client, cần cấu hình phù hợp để test auth.
- Nếu Functions không build, hãy chạy `npm run build` trong `functions/`.

````

## DOC/DOC_GLOSSARY_8PORTALS.md
````text
# Tá»« Ä‘iá»ƒn thuáº­t ngá»¯ 8Portals (Viá»‡t hoÃ¡ 100%)

> Má»¥c tiÃªu: thá»‘ng nháº¥t ngÃ´n ngá»¯ chung trong repo 8Portals Ä‘á»ƒ trao Ä‘á»•i nhanh â€“ rÃµ â€“ â€œsang & sáº¡châ€.
>
> **Quy Æ°á»›c báº¥t biáº¿n (khÃ´ng Ä‘á»•i tÃªn):**
> 1) **DSG- DigitalSpaceGroup** â€” *Táº­p Ä‘oÃ n phÃ¡t triá»ƒn ká»¹ thuáº­t cÃ´ng nghá»‡ vÃ  khÃ´ng gian sá»‘ (CÃ´ng ty máº¹)*  
> 2) **SpaceColors - 8Portals** â€” *CÃ´ng ty con*

---

## 1) Thuáº­t ngá»¯ tá»• chá»©c & váº­n hÃ nh

| Thuáº­t ngá»¯ | Viá»‡t hoÃ¡ dÃ¹ng trong repo | Äá»‹nh nghÄ©a ngáº¯n |
|---|---|---|
| CEO | Tá»•ng giÃ¡m Ä‘á»‘c Ä‘iá»u hÃ nh | NgÆ°á»i chá»‘t phÆ°Æ¡ng Ã¡n tá»‘i Æ°u, ra quyáº¿t Ä‘á»‹nh Æ°u tiÃªn, chá»‹u trÃ¡ch nhiá»‡m káº¿t quáº£. |
| ThÆ° kÃ½ tá»•ng | ChÃ¡nh vÄƒn phÃ²ng Ä‘iá»u hÃ nh | NgÆ°á»i tá»•ng há»£p â€“ phÃ¢n loáº¡i â€“ nháº¯c nhá»‹p, táº¡o â€œbrief 1 trangâ€ + lá»‡nh Ä‘á» xuáº¥t cho Chá»§ tá»‹ch. |
| Thiáº¿t láº­p CÆ¡ cáº¥u Váº­n hÃ nh | Thiáº¿t láº­p CÆ¡ cáº¥u Váº­n hÃ nh | XÃ¡c Ä‘á»‹nh vai trÃ²â€“trÃ¡ch nhiá»‡mâ€“quyá»n háº¡nâ€“Ä‘áº§u raâ€“nhá»‹p Ä‘iá»u hÃ nh Ä‘á»ƒ tá»• chá»©c cháº¡y nhanh vÃ  khÃ´ng loáº¡n. |
| Nhá»‹p Ä‘iá»u hÃ nh | Nhá»‹p Ä‘iá»u hÃ nh | Lá»‹ch láº·p: háº±ng ngÃ y/tuáº§n/thÃ¡ng (brief, cáº­p nháº­t Æ°u tiÃªn, review rá»§i ro). |
| Sá»• quyáº¿t Ä‘á»‹nh | Nháº­t kÃ½ quyáº¿t Ä‘á»‹nh | Báº£ng ghi: ngÃ y, quyáº¿t Ä‘á»‹nh, lÃ½ do, rá»§i ro, tiÃªu chÃ­ quay Ä‘áº§u. |
| Sá»• rá»§i ro | Danh má»¥c rá»§i ro | Báº£ng rá»§i ro: xÃ¡c suáº¥t/tÃ¡c Ä‘á»™ng, chá»§ sá»Ÿ há»¯u, káº¿ hoáº¡ch giáº£m rá»§i ro. |
| HÃ ng Ä‘á»£i hÃ nh Ä‘á»™ng | Danh sÃ¡ch hÃ nh Ä‘á»™ng | Báº£ng viá»‡c cáº§n lÃ m: má»©c Ä‘á»™, owner, háº¡n, tráº¡ng thÃ¡i. |
| Chá»‰ sá»‘ báº¯c cáº§u | Chá»‰ sá»‘ dáº«n dáº¯t | Chá»‰ sá»‘ bÃ¡o trÆ°á»›c thÃ nh cÃ´ng (vÃ­ dá»¥: tá»‰ lá»‡ tÃ¬m tháº¥y Ä‘Ãºng mÃ u, thá»i gian tÃ¬m kiáº¿m). |
| Chá»‰ sá»‘ káº¿t quáº£ | Chá»‰ sá»‘ káº¿t quáº£ | Chá»‰ sá»‘ â€œÄ‘Ã­châ€ (vÃ­ dá»¥: sá»‘ ngÆ°á»i dÃ¹ng hoáº¡t Ä‘á»™ng, sá»‘ bá»™ dá»¯ liá»‡u Ä‘Æ°á»£c dÃ¹ng). |

---

## 2) Thuáº­t ngá»¯ sáº£n pháº©m (Portal/World)

| Thuáº­t ngá»¯ | Viá»‡t hoÃ¡ dÃ¹ng trong repo | Äá»‹nh nghÄ©a ngáº¯n |
|---|---|---|
| Portal | Cá»•ng | Äiá»ƒm vÃ o/Ä‘iá»u hÆ°á»›ng Ä‘áº¿n cÃ¡c â€œTháº¿ giá»›iâ€. |
| World | Tháº¿ giá»›i | Má»™t khÃ´ng gian chá»©c nÄƒng Ä‘á»™c láº­p trong 8Portals (vÃ­ dá»¥: MÃ u thÃªu, Kho chá»‰). |
| ThreadColor | Tháº¿ giá»›i MÃ u thÃªu (ThreadColor) | Tháº¿ giá»›i tra cá»©u/gá»£i Ã½ mÃ u chá»‰. |
| ThreadVault | Tháº¿ giá»›i Kho chá»‰ (ThreadVault) | Tháº¿ giá»›i quáº£n lÃ½/bá»™ sÆ°u táº­p chá»‰ vÃ  dá»¯ liá»‡u liÃªn quan. |
| Palette | Tháº¿ giá»›i Dáº£i mÃ u (Palette) | Tháº¿ giá»›i táº¡o/ghÃ©p/dÃ¹ng dáº£i mÃ u; cÃ³ thá»ƒ lÃ  â€œSáº¯p ra máº¯tâ€. |
| Topbar | Thanh trÃªn | Thanh Ä‘iá»u hÆ°á»›ng trÃªn cÃ¹ng; pháº£i giá»¯ **ÄÄƒng nháº­p** á»Ÿ gÃ³c pháº£i. |
| Slot Ä‘Äƒng nháº­p | Vá»‹ trÃ­ ÄÄƒng nháº­p | Khu vá»±c â€œneoâ€ hiá»ƒn thá»‹ Ä‘Äƒng nháº­p/Ä‘Äƒng xuáº¥t á»Ÿ top-right (khÃ´ng Ä‘Æ°á»£c Ä‘á»•i tuá»³ tiá»‡n). |
| Microcopy | Vi mÃ´ ngÃ´n tá»« | CÃ¢u chá»¯ ngáº¯n trong UI (nhÃ£n nÃºt, mÃ´ táº£) â€” pháº£i â€œÄ‘áº¯t vÃ  sáº¡châ€. |
| Tráº¡ng thÃ¡i rá»—ng | MÃ n hÃ¬nh rá»—ng | UI khi chÆ°a cÃ³ dá»¯ liá»‡u (pháº£i sang, khÃ´ng xin lá»—i). |
| Tráº¡ng thÃ¡i lá»—i | MÃ n hÃ¬nh lá»—i | UI khi cÃ³ lá»—i (gá»n, rÃµ, khÃ´ng hoáº£ng). |

---

## 3) Thuáº­t ngá»¯ dá»¯ liá»‡u & cháº¥t lÆ°á»£ng dá»¯ liá»‡u

| Thuáº­t ngá»¯ | Viá»‡t hoÃ¡ dÃ¹ng trong repo | Äá»‹nh nghÄ©a ngáº¯n |
|---|---|---|
| Source of truth | Nguá»“n dá»¯ liá»‡u gá»‘c | Nguá»“n chÃ­nh thá»©c, má»i thá»© khÃ¡c sinh ra tá»« Ä‘Ã¢y (vÃ­ dá»¥: `threads.json`). |
| Ngu&#7891;n s&#7921; th&#7853;t (single source of truth) | Ngu&#7891;n s&#7921; th&#7853;t (single source of truth) | Ngu&#7891;n d&#7919; li&#7879;u th&#7889;ng nh&#7845;t &#273;&#7875; tr&#225;nh l&#7879;ch s&#7889; (ngu&#7891;n d&#7919; li&#7879;u th&#7889;ng nh&#7845;t &#273;&#7875; tr&#225;nh l&#7879;ch s&#7889;). |
| M&#225;y tr&#7841;ng th&#225;i (state machine) | M&#225;y tr&#7841;ng th&#225;i (state machine) | Quy t&#7855;c chuy&#7875;n &#273;&#7893;i tr&#7841;ng th&#225;i loading/ok/warning/error (quy t&#7855;c chuy&#7875;n &#273;&#7893;i tr&#7841;ng th&#225;i loading/ok/warning/error). |
| Data contract | Há»£p Ä‘á»“ng dá»¯ liá»‡u | Quy Æ°á»›c: file nÃ o lÃ  gá»‘c, file nÃ o lÃ  sinh ra, schema, phiÃªn báº£n, cÃ¡ch cáº­p nháº­t. |
| JSON Schema | JSON Schema | Chuan mo ta cau truc JSON de kiem tra hop le (chuan mo ta cau truc JSON de kiem tra hop le). |
| SemVer | SemVer | Chuan danh phien ban MAJOR.MINOR.PATCH (chuan danh phien ban MAJOR.MINOR.PATCH). |
| Manifest hop dong | Manifest hop dong | Tep ke khai: dataset nao dung schema nao + phien ban + checksum (tep ke khai: dataset nao dung schema nao + phien ban + checksum). |
| Danh m&#7909;c t&#7879;p (manifest) | Danh m&#7909;c t&#7879;p (manifest) | Danh s&#225;ch li&#7879;t k&#234; t&#7879;p trong repo/snapshot &#273;&#7875; ki&#7875;m tra v&#224; &#273;&#7889;i chi&#7871;u. |
| JSONL | JSON Lines | Dinh dang JSON Lines: moi dong la 1 JSON, phu hop log/audit (dinh dang JSON Lines: moi dong la 1 JSON, phu hop log/audit). |
| Checksum | Checksum | Chuoi kiem chung toan ven du lieu (chuoi kiem chung toan ven du lieu). |
| SHA-256 | SHA-256 | Ham bam tao dau van tay noi dung (ham bam tao dau van tay noi dung). |
| Ajv | Ajv | Thu vien Node.js de kiem tra JSON Schema (thu vien Node.js de kiem tra JSON Schema). |
| CI gate | CI gate | Cong chan trong CI de ngan loi vao main (cong chan trong CI de ngan loi vao main). |
| additionalProperties | additionalProperties | Tuy chon cua JSON Schema cho phep field phat sinh (tuy chon cua JSON Schema cho phep field phat sinh). |
| authResolved | authResolved | Trang thai da xac dinh dang nhap hay chua (trang thai da xac dinh dang nhap hay chua). |
| Migration | Migration | Di tru du lieu khi doi schema (di tru du lieu khi doi schema). |
| Dry run | Dry run | Chay thu khong ghi du lieu (chay thu khong ghi du lieu). |
| Reproducible build | Reproducible build | Build tai lap nho lockfile (build tai lap nho lockfile). |
| Lockfile | Lockfile | Tep khoa phien ban phu thuoc, vi du package-lock.json (tep khoa phien ban phu thuoc, vi du package-lock.json). |
| Generated artifact | Tá»‡p sinh ra | File do cÃ´ng cá»¥ táº¡o (vÃ­ dá»¥: `threads.cleaned.json`) â€” thÆ°á»ng khÃ´ng commit. |
| Raw sources | Dá»¯ liá»‡u thÃ´ | Nguá»“n thÃ´ Ä‘áº§u vÃ o (vÃ­ dá»¥: `.tch`) dÃ¹ng Ä‘á»ƒ tÃ¡i táº¡o dá»¯ liá»‡u. |
| Validate | Kiá»ƒm tra há»£p lá»‡ | Kiá»ƒm tra cáº¥u trÃºc/logic dá»¯ liá»‡u Ä‘á»ƒ phÃ¡t hiá»‡n lá»—i sá»›m. |
| Normalize | Chuáº©n hoÃ¡ | Biáº¿n dá»¯ liá»‡u vá» dáº¡ng thá»‘ng nháº¥t (tÃªn, mÃ£, format). |
| Conflicts | MÃ¢u thuáº«n dá»¯ liá»‡u | CÃ¡c Ä‘iá»ƒm dá»¯ liá»‡u xung Ä‘á»™t cáº§n xá»­ lÃ½. |
| Versioning | ÄÃ¡nh phiÃªn báº£n | Gáº¯n phiÃªn báº£n dá»¯ liá»‡u Ä‘á»ƒ cache vÃ  truy váº¿t thay Ä‘á»•i. |

---

## 4) Thuáº­t ngá»¯ hiá»‡u nÄƒng & tráº£i nghiá»‡m

| Thuáº­t ngá»¯ | Viá»‡t hoÃ¡ dÃ¹ng trong repo | Äá»‹nh nghÄ©a ngáº¯n |
|---|---|---|
| Modal (h&#7897;p tho&#7841;i ph&#7911;) | Modal (h&#7897;p tho&#7841;i ph&#7911;) | H&#7897;p n&#7893;i ch&#7863;n n&#7873;n &#273;&#7875; hi&#7875;n th&#7883; th&#244;ng tin/t&#225;c v&#7909;. |
| Ng&#7919; c&#7843;nh ch&#7891;ng l&#7899;p (stacking context) | Ng&#7919; c&#7843;nh ch&#7891;ng l&#7899;p (stacking context) | C&#417; ch&#7871; quy&#7871;t &#273;&#7883;nh l&#7899;p tr&#234;n/d&#432;&#7899;i khi c&#243; blur/transform. |
| L&#7899;p ph&#7911; (overlay layer) | L&#7899;p ph&#7911; (overlay layer) | L&#7899;p n&#7893;i nh&#432; menu/popup ph&#7843;i n&#7857;m tr&#234;n n&#7897;i dung. |
| N&#226;ng l&#7899;p theo tr&#7841;ng th&#225;i (is-open z-index) | N&#226;ng l&#7899;p theo tr&#7841;ng th&#225;i (is-open z-index) | K&#7929; thu&#7853;t t&#259;ng z-index cho row &#273;ang m&#7903; menu. |
| M&#7853;t &#273;&#7897; UI | M&#7853;t &#273;&#7897; UI | &#272;&#7897; tho&#225;ng giao di&#7879;n (&#273;i&#7873;u ch&#7881;nh kho&#7843;ng c&#225;ch/padding/gap). |
| Menu th&#7843; xu&#7889;ng | Menu th&#7843; xu&#7889;ng | B&#7843;ng ch&#7885;n m&#7903; ra khi b&#7845;m n&#250;t (dropdown menu). |
| Logo mark (bi&#7875;u t&#432;&#7907;ng logo) | Logo mark (bi&#7875;u t&#432;&#7907;ng logo) | Bi&#7875;u t&#432;&#7907;ng r&#250;t g&#7885;n c&#7911;a logo, d&#249;ng &#273;&#7891;ng h&#224;nh v&#7899;i t&#234;n th&#432;&#417;ng hi&#7879;u. |
| H&#236;nh vector (SVG) | H&#236;nh vector (SVG) | &#7842;nh d&#7841;ng vector, ph&#243;ng to kh&#244;ng v&#7905; v&#224; nh&#7865; cho UI. |
| &#7842;nh &#273;a &#273;&#7897; ph&#226;n gi&#7843;i (srcset) | &#7842;nh &#273;a &#273;&#7897; ph&#226;n gi&#7843;i (srcset) | Khai b&#225;o nhi&#7873;u m&#7913;c &#273;&#7897; ph&#226;n gi&#7843;i &#273;&#7875; tr&#236;nh duy&#7879;t t&#7921; ch&#7885;n. |
| Fallback (ph&#432;&#417;ng &#225;n d&#7921; ph&#242;ng) | Fallback (ph&#432;&#417;ng &#225;n d&#7921; ph&#242;ng) | Ph&#432;&#417;ng &#225;n d&#7921; ph&#242;ng khi t&#224;i nguy&#234;n ch&#237;nh kh&#244;ng d&#249;ng &#273;&#432;&#7907;c. |
| L&#432;u c&#7909;c b&#7897; | L&#432;u c&#7909;c b&#7897; | L&#432;u l&#7921;a ch&#7885;n tr&#234;n tr&#236;nh duy&#7879;t b&#7857;ng localStorage. |
| S&#7921; ki&#7879;n tu&#7923; bi&#7871;n | S&#7921; ki&#7879;n tu&#7923; bi&#7871;n | CustomEvent &#273;&#7875; &#273;&#7891;ng b&#7897; tr&#7841;ng th&#225;i gi&#7919;a c&#225;c kh&#7889;i UI. |
| Worker | Tiáº¿n trÃ¬nh phá»¥ | Cháº¡y tÃ¡c vá»¥ náº·ng (tÃ¬m kiáº¿m, láº­p chá»‰ má»¥c) ngoÃ i luá»“ng chÃ­nh Ä‘á»ƒ UI mÆ°á»£t. |
| Main thread | Luá»“ng chÃ­nh | Luá»“ng cháº¡y UI; cÃ ng Ã­t viá»‡c cÃ ng mÆ°á»£t. |
| Index | Láº­p chá»‰ má»¥c | Chuáº©n bá»‹ cáº¥u trÃºc tra cá»©u nhanh (theo mÃ£, hÃ£ng, mÃ u). |
| Cache | Bá»™ nhá»› Ä‘á»‡m | LÆ°u táº¡m káº¿t quáº£ Ä‘á»ƒ táº£i nhanh hÆ¡n. |
| Debounce | Trá»… cÃ³ chá»§ Ä‘Ã­ch | Chá» ngÆ°á»i dÃ¹ng dá»«ng gÃµ rá»“i má»›i tÃ¬m, trÃ¡nh giáº­t. |
| Virtual list | Danh sÃ¡ch áº£o | Chá»‰ render pháº§n Ä‘ang nhÃ¬n tháº¥y Ä‘á»ƒ khá»i lag. |
| Latency | Äá»™ trá»… | Thá»i gian chá» pháº£n há»“i. |

---

## 5) Thuáº­t ngá»¯ kiá»ƒm thá»­ & â€œgÃ¡c cá»•ng cháº¥t lÆ°á»£ngâ€

| Thuáº­t ngá»¯ | Viá»‡t hoÃ¡ dÃ¹ng trong repo | Äá»‹nh nghÄ©a ngáº¯n |
|---|---|---|
| Smoke test | Kiá»ƒm tra khÃ³i | Kiá»ƒm tra nhanh: trang cÃ³ má»Ÿ Ä‘Æ°á»£c, file cÃ³ táº£i Ä‘Æ°á»£c, khÃ´ng 404. |
| Checklist PASS/FAIL | Danh sÃ¡ch Ä‘áº¡t/khÃ´ng Ä‘áº¡t | Danh sÃ¡ch test ngáº¯n gá»n Ä‘á»ƒ xÃ¡c nháº­n thay Ä‘á»•i an toÃ n. |
| Gate | Cá»•ng cháº·n | Quy táº¯c báº¯t buá»™c pháº£i qua trÆ°á»›c khi merge (vÃ­ dá»¥: khÃ´ng cÃ³ BLOCK). |
| Repo Doctor | BÃ¡c sÄ© kho mÃ£ | CÃ´ng cá»¥ quÃ©t repo: lá»—i gÃ£y (BLOCK), cáº£nh bÃ¡o (WARN), thÃ´ng tin (INFO). |
| Health Score | Äiá»ƒm sá»©c khoáº» | Äiá»ƒm 0â€“100 pháº£n Ã¡nh tÃ¬nh tráº¡ng repo theo quy táº¯c Ä‘Ã£ thá»‘ng nháº¥t. |
| Trend 7 ngÃ y | Xu hÆ°á»›ng 7 ngÃ y | Chuá»—i Ä‘iá»ƒm/Ä‘áº¿m trong 7 ngÃ y gáº§n nháº¥t Ä‘á»ƒ xem tiáº¿n hay lÃ¹i. |
| BLOCK | Cháº·n kháº©n cáº¥p | Lá»—i má»©c P0: lÃ m gÃ£y cháº¡y/thiáº¿u file runtime/syntaxâ€¦ => khÃ´ng merge. |
| WARN | Cáº£nh bÃ¡o | Váº¥n Ä‘á» cáº§n dá»n/tá»‘i Æ°u nhÆ°ng chÆ°a lÃ m gÃ£y há»‡. |
| INFO | Ghi nháº­n | ThÃ´ng tin thá»‘ng kÃª, khÃ´ng pháº£i lá»—i. |
| Quarantine | CÃ¡ch ly 7 ngÃ y | Chuyá»ƒn file â€œnghi thá»«aâ€ vÃ o `_graveyard/` trÆ°á»›c khi xoÃ¡ háº³n. |
| Graveyard | NghÄ©a Ä‘á»‹a táº¡m | ThÆ° má»¥c `_graveyard/` chá»©a file cÃ¡ch ly. |

---

## 6) Thuáº­t ngá»¯ Git & quy trÃ¬nh lÃ m viá»‡c

| Thuáº­t ngá»¯ | Viá»‡t hoÃ¡ dÃ¹ng trong repo | Äá»‹nh nghÄ©a ngáº¯n |
|---|---|---|
| Repo | Kho mÃ£ | NÆ¡i chá»©a toÃ n bá»™ mÃ£ nguá»“n, dá»¯ liá»‡u, tÃ i liá»‡u. |
| Commit | Báº£n ghi thay Ä‘á»•i | Má»‘c thay Ä‘á»•i cÃ³ mÃ´ táº£ rÃµ rÃ ng. |
| Branch | NhÃ¡nh | NhÃ¡nh lÃ m viá»‡c tÃ¡ch khá»i chÃ­nh. |
| Nh&#225;nh snapshot (snapshot branch) | Nh&#225;nh snapshot (snapshot branch) | Nh&#225;nh chuy&#234;n d&#249;ng cho m&#7909;c &#273;&#237;ch t&#7841;o/gi&#7919; b&#7843;n ch&#7909;p kho m&#227;, kh&#244;ng l&#224;m &#7843;nh h&#432;&#7903;ng nh&#225;nh ch&#237;nh. |
| Pull request (PR) | YÃªu cáº§u há»£p nháº¥t | Gá»­i thay Ä‘á»•i Ä‘á»ƒ review vÃ  há»£p nháº¥t vÃ o nhÃ¡nh chÃ­nh. |
| Merge | Há»£p nháº¥t | Gá»™p thay Ä‘á»•i vÃ o nhÃ¡nh chÃ­nh. |
| CI | Tá»± Ä‘á»™ng kiá»ƒm tra | Há»‡ thá»‘ng cháº¡y kiá»ƒm tra khi PR/push/schedule. |
| Workflow | Quy trÃ¬nh tá»± Ä‘á»™ng | Táº­p lá»‡nh CI (vÃ­ dá»¥: GitHub Actions). |
| workflow_dispatch | KÃ­ch hoáº¡t thá»§ cÃ´ng | Cháº¡y workflow báº±ng tay tá»« giao diá»‡n. |
| schedule | Lá»‹ch cháº¡y | Workflow cháº¡y theo cron (háº±ng ngÃ y). |
| Artifact | G&#243;i &#273;&#237;nh k&#232;m CI | File b&#225;o c&#225;o l&#432;u trong CI &#273;&#7875; t&#7843;i v&#7873; (kh&#244;ng nh&#7845;t thi&#7871;t commit). |

---

## 7) Thuáº­t ngá»¯ háº¡ táº§ng & báº£o máº­t

| Thuáº­t ngá»¯ | Viá»‡t hoÃ¡ dÃ¹ng trong repo | Äá»‹nh nghÄ©a ngáº¯n |
|---|---|---|
| Firestore rules | Quy táº¯c Firestore | Quy táº¯c truy cáº­p dá»¯ liá»‡u: ai Ä‘Æ°á»£c Ä‘á»c/ghi gÃ¬. |
| Least privilege | Tá»‘i thiá»ƒu quyá»n | Má»—i ngÆ°á»i chá»‰ cÃ³ Ä‘Ãºng quyá»n cáº§n thiáº¿t. |
| Auth | XÃ¡c thá»±c | Äá»‹nh danh ngÆ°á»i dÃ¹ng (Ä‘Äƒng nháº­p/Ä‘Äƒng xuáº¥t). |
| Custom claims | Quyá»n Ä‘áº·c biá»‡t | â€œCá»â€ phÃ¢n quyá»n nÃ¢ng cao (admin/mod). |

---

## 8) Thuáº­t ngá»¯ ra quyáº¿t Ä‘á»‹nh kiá»ƒu â€œÃ´ng lá»›nâ€

| Thuáº­t ngá»¯ | Viá»‡t hoÃ¡ dÃ¹ng trong repo | Äá»‹nh nghÄ©a ngáº¯n |
|---|---|---|
| One-way door | Cá»­a má»™t chiá»u | Quyáº¿t Ä‘á»‹nh khÃ³ quay Ä‘áº§u (pháº£i cÃ¢n nháº¯c ká»¹). |
| Two-way door | Cá»­a hai chiá»u | Quyáº¿t Ä‘á»‹nh cÃ³ thá»ƒ thá»­ nhanh vÃ  quay láº¡i. |
| Trade-off | ÄÃ¡nh Ä‘á»•i | Chá»n A thÃ¬ máº¥t B; pháº£i ghi rÃµ. |
| North Star Metric | Chá»‰ sá»‘ Báº¯c cá»±c | Chá»‰ sá»‘ cá»‘t lÃµi dáº«n toÃ n bá»™ Ä‘á»™i. |
| KPI | Chá»‰ sá»‘ hiá»‡u suáº¥t | Chá»‰ sá»‘ Ä‘o tiáº¿n Ä‘á»™/káº¿t quáº£. |
| OKR | Má»¥c tiÃªu & káº¿t quáº£ then chá»‘t | Há»‡ má»¥c tiÃªu theo quÃ½/thÃ¡ng. |

---

## 9) Quy táº¯c Ä‘áº·t thuáº­t ngá»¯ má»›i (Ä‘á»ƒ Viá»‡t hoÃ¡ 100%)
1) Æ¯u tiÃªn tá»« **ngáº¯n â€“ dá»… hiá»ƒu â€“ sang** (vÃ­ dá»¥: â€œCá»•ngâ€, â€œTháº¿ giá»›iâ€, â€œCÃ¡ch ly 7 ngÃ yâ€).  
2) Náº¿u báº¯t buá»™c giá»¯ tÃªn riÃªng (vÃ­ dá»¥: ThreadColor) â†’ luÃ´n kÃ¨m **bÃ­ danh tiáº¿ng Viá»‡t**: â€œTháº¿ giá»›i MÃ u thÃªu (ThreadColor)â€.  
3) Thuáº­t ngá»¯ ká»¹ thuáº­t váº«n Viá»‡t hoÃ¡, nhÆ°ng cÃ³ thá»ƒ giá»¯ trong ngoáº·c náº¿u cáº§n Ä‘á»‘i chiáº¿u: â€œBá»™ nhá»› Ä‘á»‡m (cache)â€.  
4) Hai tÃªn **khÃ´ng Ä‘á»•i**: **DSG- DigitalSpaceGroup**, **SpaceColors - 8Portals**.

---

*File nÃ y lÃ  â€œnguá»“n ngÃ´n ngá»¯ gá»‘câ€. Má»i tÃ i liá»‡u/brief nÃªn bÃ¡m theo Ä‘á»ƒ thá»‘ng nháº¥t giá»ng Ä‘iá»‡u.*
---

## 9) Thuáº­t ngá»¯ Backend & GÃ³i quyáº¿t Ä‘á»‹nh (Báº£o máº­t)

| Thuáº­t ngá»¯ | Viáº¿t hoÃ¡ dáº¡ng trong repo | Äá»‹nh nghÄ©a ngáº¯n |
|---|---|---|
| Cloud Functions (HÃ m Ä‘Ã¡m mÃ¢y) | Cloud Functions | HÃ m server-side cháº¡y theo sá»± kiá»‡n/HTTP, xá»­ lÃ½ logic nháº¡y cáº£m. |
| Firebase Hosting | Firebase Hosting | Háº¡ táº§ng phá»¥c vá»¥ web tÄ©nh vÃ  rewrite Ä‘áº¿n Functions. |
| Cross-Origin-Opener-Policy (COOP) | Cross-Origin-Opener-Policy (COOP) | Chinh sach co lap cua so mo ra giua cac nguon (chinh sach co lap cua so mo ra giua cac nguon). |
| same-origin-allow-popups | same-origin-allow-popups | Che do COOP cho phep popup van hoat dong voi cua so mo no (che do COOP cho phep popup van hoat dong voi cua so mo no). |
| signInWithRedirect | signInWithRedirect | Dang nhap bang chuyen huong thay vi popup (dang nhap bang chuyen huong thay vi popup). |
| Express | Express | Bá»™ Ä‘á»‹nh tuyáº¿n HTTP nháº¹ Ä‘á»ƒ tá»• chá»©c API admin. |
| rewrite (Ãnh xáº¡ Ä‘Æ°á»ng dáº«n) | rewrite | Chuyá»ƒn hÆ°á»›ng `/admin/**` tá»« Hosting sang Functions. |
| RBAC (PhÃ¢n quyá»n theo vai trÃ²) | RBAC | CÆ¡ cháº¿ phÃ¢n quyá»n admin/khÃ´ng admin theo vai trÃ². |
| ID token (mÃ£ chá»©ng thá»±c) | ID token | Token xÃ¡c thá»±c ngÆ°á»i dÃ¹ng do Firebase Auth cáº¥p. |
| no-store (cáº¥m cache) | no-store | Header chá»‘ng lÆ°u Ä‘á»‡m cho response nháº¡y cáº£m. |
| Audit log (nháº­t kÃ½ truy váº¿t) | Audit log | Ghi láº¡i GENERATE/VIEW, ai lÃ m, lÃºc nÃ o. |
| Redaction (che dá»¯ liá»‡u nháº¡y cáº£m) | Redaction | Che thÃ´ng tin nháº¡y cáº£m trÆ°á»›c khi lÆ°u/hiá»ƒn thá»‹. |
| DecisionPack (GÃ³i quyáº¿t Ä‘á»‹nh) | DecisionPack | Báº£n ghi gÃ³i quyáº¿t Ä‘á»‹nh ná»™i bá»™ theo ngÃ y. |
| Snapshot (báº£n chá»¥p) | Snapshot | Báº£n chá»¥p tráº¡ng thÃ¡i Ä‘á»ƒ Ä‘á»‘i chiáº¿u/ra quyáº¿t Ä‘á»‹nh. |
| Idempotency (chá»‘ng cháº¡y láº·p) | Idempotency | Cháº¡y láº¡i khÃ´ng táº¡o trÃ¹ng, giá»¯ 1 ?latest?. |
---

## 10) Thu?t ng? tri?n khai Functions & Hosting

| Thu?t ng? | Vi?t ho? d?ng trong repo | ??nh ngh?a ng?n |
|---|---|---|
| functions.source | functions.source | Khai b?o th? m?c m? Functions ?? deploy ??ng 100%. |
| predeploy | predeploy | L?nh ch?y t? ??ng tr??c khi deploy (v? d? build TypeScript). |
| emulator | emulator | M?i tr??ng gi? l?p Functions/Hosting ?? test local. |
| Node LTS | Node LTS | Phi?n b?n Node ?n ??nh d?i h?n, khuy?n ngh? d?ng trong Functions. |
---

## 11) Thuáº­t ngá»¯ quáº£n trá»‹ & xÃ¡c thá»±c bá»• sung

| Thuáº­t ngá»¯ | Viáº¿t hoÃ¡ dáº¡ng trong repo | Äá»‹nh nghÄ©a ngáº¯n |
|---|---|---|
| Authorization Bearer token | Bearer token | Chuá»—i token Ä‘áº·t trong header `Authorization: Bearer <token>` Ä‘á»ƒ gá»i API quáº£n trá»‹. |
| Admin UI | Báº£ng Ä‘iá»u phá»‘i quáº£n trá»‹ | Giao diá»‡n ná»™i bá»™ cho admin xem gÃ³i quyáº¿t Ä‘á»‹nh vÃ  nháº­t kÃ½ truy váº¿t. |
| Audit logs | Nháº­t kÃ½ truy váº¿t | Danh sÃ¡ch sá»± kiá»‡n truy cáº­p/ghi nháº­n á»Ÿ API admin, phá»¥c vá»¥ kiá»ƒm tra báº£o máº­t. |
---

## 12) Thuáº­t ngá»¯ Git hygiene

| Thuáº­t ngá»¯ | Viáº¿t hoÃ¡ dáº¡ng trong repo | Äá»‹nh nghÄ©a ngáº¯n |
|---|---|---|
| K&#7927; lu&#7853;t s&#7841;ch kho m&#227; (repo hygiene) | K&#7927; lu&#7853;t s&#7841;ch kho m&#227; (repo hygiene) | Th&#243;i quen gi&#7919; repo g&#7885;n, kh&#244;ng r&#242; r&#7881; file nh&#7841;y c&#7843;m, tu&#226;n th&#7911; quy &#432;&#7899;c. |
| .gitignore | .gitignore | Danh sÃ¡ch file/thÆ° má»¥c bá»‹ Git bá» qua, khÃ´ng Ä‘Æ°a vÃ o commit. |
| node_modules | node_modules | ThÆ° má»¥c chá»©a thÆ° viá»‡n cÃ i Ä‘áº·t tá»« npm; khÃ´ng commit. |
| Tracked | Tracked | File Ä‘ang Ä‘Æ°á»£c Git theo dÃµi (Ä‘Ã£ add). |
| Untracked | Untracked | File chÆ°a Ä‘Æ°á»£c Git theo dÃµi. |
| Build artifact | Build artifact | Káº¿t quáº£ sinh ra khi build (vÃ­ dá»¥ `functions/lib/`), khÃ´ng commit. |
---

## 13) Thuáº­t ngá»¯ xuáº¥t repo & chia sáº»

| Thuáº­t ngá»¯ | Viáº¿t hoÃ¡ dáº¡ng trong repo | Äá»‹nh nghÄ©a ngáº¯n |
|---|---|---|
| Git bundle | Git bundle | GÃ³i Git cÃ³ lá»‹ch sá»­ Ä‘áº§y Ä‘á»§, dÃ¹ng Ä‘á»ƒ chia sáº» repo mÃ  khÃ´ng cáº§n remote. |
| Git archive | Git archive | GÃ³i snapshot khÃ´ng lá»‹ch sá»­ (zip/tar) Ä‘á»ƒ chia sáº» mÃ£ nguá»“n hiá»‡n táº¡i. |
| Submodule | Submodule | Repo con gáº¯n vÃ o repo cha; cáº§n táº£i riÃªng khi chia sáº». |
| Git LFS | Git LFS | CÆ¡ cháº¿ lÆ°u file lá»›n ngoÃ i Git; cáº§n pull riÃªng Ä‘á»ƒ Ä‘á»§ dá»¯ liá»‡u. |
| Full dump | B&#7843;n &#273;&#7893; &#273;&#7847;y &#273;&#7911; (full dump) | B&#7843;n ghi to&#224;n b&#7897; n&#7897;i dung text c&#7911;a repo &#273;&#7875; tra c&#7913;u/&#273;&#7889;i chi&#7871;u. |
| Index dump | B&#7843;n &#273;&#7893; ch&#7881; m&#7909;c (index dump) | B&#7843;n t&#243;m t&#7855;t li&#7879;t k&#234; file &#273;&#227; dump/&#273;&#227; b&#7887; qua k&#232;m l&#253; do v&#224; th&#7889;ng k&#234;. |
---

## 14) Thuáº­t ngá»¯ PowerShell

| Thuáº­t ngá»¯ | Viáº¿t hoÃ¡ dáº¡ng trong repo | Äá»‹nh nghÄ©a ngáº¯n |
|---|---|---|
| ExecutionPolicy | ExecutionPolicy | ChÃ­nh sÃ¡ch cho phÃ©p cháº¡y script PowerShell trong phiÃªn hiá»‡n táº¡i. |
| Scope Process | Scope Process | Pháº¡m vi Ã¡p dá»¥ng cá»§a ExecutionPolicy chá»‰ trong phiÃªn PowerShell Ä‘ang cháº¡y. |
| &#272;&#7897;ng t&#7915; &#273;&#432;&#7907;c ph&#234; duy&#7879;t (approved verbs) | &#272;&#7897;ng t&#7915; &#273;&#432;&#7907;c ph&#234; duy&#7879;t (approved verbs) | Danh s&#225;ch &#273;&#7897;ng t&#7915; PowerShell chu&#7849;n d&#249;ng &#273;&#7875; &#273;&#7863;t t&#234;n cmdlet/function, gi&#250;p nh&#7845;t qu&#225;n v&#224; qua PSScriptAnalyzer. |
---

## 15) Thuáº­t ngá»¯ Ä‘o lÆ°á»ng & sá»± kiá»‡n

| Thuáº­t ngá»¯ | Viáº¿t hoÃ¡ dáº¡ng trong repo | Äá»‹nh nghÄ©a ngáº¯n |
|---|---|---|
| North Star Metric (NSM) | NSM | Chá»‰ sá»‘ Ä‘á»‹nh hÆ°á»›ng chÃ­nh, Ä‘o hiá»‡u quáº£ cá»‘t lÃµi cá»§a sáº£n pháº©m. |
| Leading indicator | Chá»‰ sá»‘ dáº«n dáº¯t | Chá»‰ sá»‘ sá»›m dá»± bÃ¡o xu hÆ°á»›ng cá»§a NSM. |
| TMTC-7 | TMTC-7 | Tá»· lá»‡ MÃ u ThÃªu Chuáº©n trong 7 ngÃ y. |
| TTGP | TTGP | Tá»· lá»‡ Tra cá»©u Gáº§n Ä‘Ãºng thÃ nh cÃ´ng. |
| TLC | TLC | Tá»· lá»‡ LÆ°u vÃ o Kho chá»‰. |
| TLK | TLK | Tá»· lá»‡ Lá»±a chá»n káº¿t quáº£. |
| Event map | Báº£n Ä‘á»“ sá»± kiá»‡n | Danh sÃ¡ch sá»± kiá»‡n tá»‘i thiá»ƒu + thuá»™c tÃ­nh Ä‘á»ƒ Ä‘o lÆ°á»ng. |
---

## 16) Thuáº­t ngá»¯ Emulator & triá»ƒn khai

| Thuáº­t ngá»¯ | Viáº¿t hoÃ¡ dáº¡ng trong repo | Äá»‹nh nghÄ©a ngáº¯n |
|---|---|---|
| Emulator (mÃ´ phá»ng dá»‹ch vá»¥ cháº¡y local) | Emulator | Bá»™ giáº£ láº­p dá»‹ch vá»¥ Firebase cháº¡y trÃªn mÃ¡y local Ä‘á»ƒ test nhanh. |
| Blaze plan (gÃ³i tráº£ phÃ­ pay-as-you-go) | Blaze plan | GÃ³i tráº£ phÃ­ theo má»©c dÃ¹ng, cáº§n Ä‘á»ƒ dÃ¹ng má»™t sá»‘ tÃ­nh nÄƒng nÃ¢ng cao. |
| Spark plan (gÃ³i miá»…n phÃ­) | Spark plan | GÃ³i miá»…n phÃ­ vá»›i giá»›i háº¡n tÃ i nguyÃªn cÆ¡ báº£n. |
| Rewrite (Ä‘iá»u hÆ°á»›ng route trÃªn hosting) | Rewrite | Cáº¥u hÃ¬nh chuyá»ƒn hÆ°á»›ng route tÄ©nh sang Functions/API. |
| Smoke test (kiá»ƒm thá»­ nhanh tuyáº¿n chÃ­nh) | Smoke test | Kiá»ƒm tra nhanh cÃ¡c luá»“ng chÃ­nh Ä‘á»ƒ phÃ¡t hiá»‡n lá»—i lá»›n. |



````

## DOC/EVENT_MAP.md
````text
# EVENT MAP — Sự kiện tối thiểu

## 1) Mục tiêu
Đảm bảo theo dõi đủ hành vi để tính TMTC-7 và 3 chỉ số dẫn dắt (TTGP/TLC/TLK).

## 2) Danh sách sự kiện tối thiểu

### A. Tra cứu & kết quả
- `tc.search.nearest`
  - `hex` (string)
  - `method` (string: DE76/DE2000)
  - `brands` (array)
  - `verifiedOnly` (boolean)
  - `resultCount` (number)

- `tc.search.by_code`
  - `query` (string)
  - `brandMatched` (boolean)
  - `resultCount` (number)

### B. Hành vi sử dụng kết quả
- `tc.result.open_inspector`
  - `brand` (string)
  - `code` (string)
  - `hex` (string)
  - `delta` (number | null)

- `tc.result.copy_code`
  - `brand` (string)
  - `code` (string)

- `tc.result.copy_full`
  - `brand` (string)
  - `code` (string)
  - `name` (string | null)
  - `hex` (string)

### C. Kho chỉ (lưu)
- `tc.vault.save_session`
  - `hex` (string)
  - `brandCount` (number)
  - `resultCount` (number)

- `tc.vault.save_item`
  - `brand` (string)
  - `code` (string)
  - `hex` (string)

## 3) Thuộc tính chuẩn (chuẩn hoá)
- `userId` (string | null)
- `ts` (ISO timestamp)
- `world` (string)
- `page` (string)
- `sessionId` (string)

> Ghi chú: danh sách sự kiện là tối thiểu, có thể mở rộng theo nhu cầu.

````

## DOC/health/daily/2025-12-31.json
````text
{
  "date": "2025-12-31",
  "health_score": 97,
  "counts": {
    "block": 0,
    "warn": 1,
    "info": 5
  },
  "top_reasons": [
    {
      "level": "WARN",
      "title": "TODO/FIXME",
      "count": 1
    }
  ]
}
````

## DOC/health/daily/2026-01-01.json
````text
{
  "date": "2026-01-01",
  "health_score": 97,
  "counts": {
    "block": 0,
    "warn": 1,
    "info": 5
  },
  "top_reasons": [
    {
      "level": "WARN",
      "title": "TODO/FIXME",
      "count": 1
    }
  ]
}
````

## DOC/health/daily/2026-01-02.json
````text
{
  "date": "2026-01-02",
  "health_score": 97,
  "counts": {
    "block": 0,
    "warn": 1,
    "info": 5
  },
  "top_reasons": [
    {
      "level": "WARN",
      "title": "TODO/FIXME",
      "count": 1
    }
  ]
}
````

## DOC/health/daily/2026-01-04.json
````text
{
  "date": "2026-01-04",
  "health_score": 91,
  "counts": {
    "block": 0,
    "warn": 3,
    "info": 5
  },
  "top_reasons": [
    {
      "level": "WARN",
      "title": "File lớn",
      "count": 1
    },
    {
      "level": "WARN",
      "title": "Asset/CSS không được tham chiếu",
      "count": 1
    },
    {
      "level": "WARN",
      "title": "TODO/FIXME",
      "count": 1
    }
  ]
}
````

## DOC/health/health-trend.json
````text
[
  {
    "date": "2025-12-31",
    "score": 97,
    "block": 0,
    "warn": 1
  },
  {
    "date": "2026-01-01",
    "score": 97,
    "block": 0,
    "warn": 1
  },
  {
    "date": "2026-01-02",
    "score": 97,
    "block": 0,
    "warn": 1
  },
  {
    "date": "2026-01-04",
    "score": 91,
    "block": 0,
    "warn": 3
  }
]
````

## DOC/NORTH_STAR.md
````text
# NORTH STAR — TMTC-7

## 1) North Star Metric (NSM)

**NSM:** TMTC-7  
**Tên đầy đủ:** Tỷ lệ Màu Thêu Chuẩn trong 7 ngày

### Định nghĩa thành công
Một người dùng đạt “thành công” nếu trong 7 ngày gần nhất:
- Thực hiện tra cứu màu chỉ hợp lệ, và
- Có ít nhất 1 kết quả phù hợp (trong ngưỡng ΔE hiện tại), và
- Có hành động sử dụng kết quả (lưu vào kho chỉ, mở inspector, hoặc copy mã).

### Công thức gợi ý
```
TMTC-7 = (Số người dùng đạt “thành công” trong 7 ngày) / (Tổng số người dùng hoạt động trong 7 ngày)
```

> Ghi chú: “người dùng hoạt động” = có ít nhất 1 hành động tra cứu hoặc chọn màu trong 7 ngày.

## 2) 3 Leading Indicators (dẫn dắt)

1) **TTGP** — Tỷ lệ Tra cứu Gần đúng thành công  
   - Công thức: số tra cứu có kết quả / tổng số tra cứu
2) **TLC** — Tỷ lệ Lưu vào Kho chỉ  
   - Công thức: số lượt lưu / số lượt xem kết quả
3) **TLK** — Tỷ lệ Lựa chọn kết quả  
   - Công thức: số lượt mở inspector hoặc copy mã / số lượt xem kết quả

## 3) Guardrail đề xuất

- **P0 ổn định:** “Tìm mã chỉ gần nhất” phải luôn trả kết quả khi dữ liệu sẵn sàng.  
- **Không làm chậm UI:** tra cứu phải mượt, không giật khi kéo ΔE hoặc đổi hãng.  
- **Không rỗng dữ liệu:** bật “Chỉ đã xác minh” không được trống khó hiểu.  
- **Bảo mật & riêng tư:** dữ liệu người dùng không bị lộ qua logs hoặc UI.  

## 4) Ghi chú triển khai

- TMTC-7 ưu tiên phản ánh hiệu quả sản phẩm thay vì số lượng thao tác.  
- 3 chỉ số dẫn dắt giúp tối ưu hành vi trước khi tối ưu NSM.  

````

## DOC/REPO_SNAPSHOT_INDEX.json
````text
{
  "generatedBy": "tools/repo_snapshot.mjs",
  "root": ".",
  "stats": {
    "totalFiles": 110,
    "totalDirs": 29,
    "extCounts": {
      ".png": 5,
      ".css": 2,
      "(noext)": 5,
      ".yml": 6,
      ".md": 26,
      ".html": 6,
      ".js": 9,
      ".svg": 1,
      ".json": 21,
      ".mjs": 21,
      ".tch": 1,
      ".txt": 2,
      ".rules": 1,
      ".ts": 1,
      ".bundle": 1,
      ".ps1": 1,
      ".sh": 1
    }
  },
  "ignored": {
    "dirs": [
      ".git"
    ],
    "partialDirs": [
      "DOC/health/daily"
    ]
  },
  "nodes": [
    {
      "path": "_graveyard",
      "type": "dir"
    },
    {
      "path": "_graveyard/assets",
      "type": "dir"
    },
    {
      "path": "_graveyard/assets/spacecolors-mark-512.png",
      "type": "file"
    },
    {
      "path": "_graveyard/assets/spacecolors-mark-64.png",
      "type": "file"
    },
    {
      "path": "_graveyard/style.css",
      "type": "file"
    },
    {
      "path": "_graveyard/themes.css",
      "type": "file"
    },
    {
      "path": ".editorconfig",
      "type": "file"
    },
    {
      "path": ".firebaserc",
      "type": "file"
    },
    {
      "path": ".github",
      "type": "dir"
    },
    {
      "path": ".github/CODEOWNERS",
      "type": "file"
    },
    {
      "path": ".github/ISSUE_TEMPLATE",
      "type": "dir"
    },
    {
      "path": ".github/ISSUE_TEMPLATE/bug_report.yml",
      "type": "file"
    },
    {
      "path": ".github/ISSUE_TEMPLATE/feature_request.yml",
      "type": "file"
    },
    {
      "path": ".github/pull_request_template.md",
      "type": "file"
    },
    {
      "path": ".github/workflows",
      "type": "dir"
    },
    {
      "path": ".github/workflows/ceo-repo-health.yml",
      "type": "file"
    },
    {
      "path": ".github/workflows/data-contract.yml",
      "type": "file"
    },
    {
      "path": ".github/workflows/ops-quarantine.yml",
      "type": "file"
    },
    {
      "path": ".github/workflows/repo-snapshot.yml",
      "type": "file"
    },
    {
      "path": ".gitignore",
      "type": "file"
    },
    {
      "path": "account.html",
      "type": "file"
    },
    {
      "path": "account.js",
      "type": "file"
    },
    {
      "path": "admin.html",
      "type": "file"
    },
    {
      "path": "assets",
      "type": "dir"
    },
    {
      "path": "assets/spacecolors-mark-128.png",
      "type": "file"
    },
    {
      "path": "assets/spacecolors-mark-256.png",
      "type": "file"
    },
    {
      "path": "assets/spacecolors-mark-512.png",
      "type": "file"
    },
    {
      "path": "assets/spacecolors-mark.svg",
      "type": "file"
    },
    {
      "path": "auth.js",
      "type": "file"
    },
    {
      "path": "CONTRIBUTING.md",
      "type": "file"
    },
    {
      "path": "crowd.js",
      "type": "file"
    },
    {
      "path": "data",
      "type": "dir"
    },
    {
      "path": "data/audit",
      "type": "dir"
    },
    {
      "path": "data/audit/.gitkeep",
      "type": "file"
    },
    {
      "path": "data/contract.manifest.json",
      "type": "file"
    },
    {
      "path": "data/migrations",
      "type": "dir"
    },
    {
      "path": "data/migrations/palettes",
      "type": "dir"
    },
    {
      "path": "data/migrations/palettes/0.1.0__to__1.0.0.mjs",
      "type": "file"
    },
    {
      "path": "data/migrations/threads",
      "type": "dir"
    },
    {
      "path": "data/migrations/threads/0.1.0__to__1.0.0.mjs",
      "type": "file"
    },
    {
      "path": "data/migrations/threads_generated",
      "type": "dir"
    },
    {
      "path": "data/migrations/threads_generated/0.1.0__to__1.0.0.mjs",
      "type": "file"
    },
    {
      "path": "data/migrations/vault",
      "type": "dir"
    },
    {
      "path": "data/migrations/vault/0.1.0__to__1.0.0.mjs",
      "type": "file"
    },
    {
      "path": "data/palettes.json",
      "type": "file"
    },
    {
      "path": "data/raw_tch",
      "type": "dir"
    },
    {
      "path": "data/raw_tch/Ackerman Isacord 30.tch",
      "type": "file"
    },
    {
      "path": "data/README.md",
      "type": "file"
    },
    {
      "path": "data/schemas",
      "type": "dir"
    },
    {
      "path": "data/schemas/palettes",
      "type": "dir"
    },
    {
      "path": "data/schemas/palettes/0.1.0.json",
      "type": "file"
    },
    {
      "path": "data/schemas/palettes.schema.json",
      "type": "file"
    },
    {
      "path": "data/schemas/threads",
      "type": "dir"
    },
    {
      "path": "data/schemas/threads/0.1.0.json",
      "type": "file"
    },
    {
      "path": "data/schemas/threads.schema.json",
      "type": "file"
    },
    {
      "path": "data/schemas/vault",
      "type": "dir"
    },
    {
      "path": "data/schemas/vault/0.1.0.json",
      "type": "file"
    },
    {
      "path": "data/schemas/vault.schema.json",
      "type": "file"
    },
    {
      "path": "data/scripts",
      "type": "dir"
    },
    {
      "path": "data/scripts/audit.mjs",
      "type": "file"
    },
    {
      "path": "data/scripts/migrate_contract.mjs",
      "type": "file"
    },
    {
      "path": "data/scripts/validate_contract.mjs",
      "type": "file"
    },
    {
      "path": "data/threads.generated.json",
      "type": "file"
    },
    {
      "path": "data/vault.json",
      "type": "file"
    },
    {
      "path": "data_normalize.js",
      "type": "file"
    },
    {
      "path": "dependency-audit.json",
      "type": "file"
    },
    {
      "path": "dependency-audit.md",
      "type": "file"
    },
    {
      "path": "DOC",
      "type": "dir"
    },
    {
      "path": "DOC/00_TOAN_CANH.md",
      "type": "file"
    },
    {
      "path": "DOC/01_NOW.md",
      "type": "file"
    },
    {
      "path": "DOC/01_WORKFLOW.md",
      "type": "file"
    },
    {
      "path": "DOC/02_QUAN_TRI_GITHUB.md",
      "type": "file"
    },
    {
      "path": "DOC/03_RUNTIME_CONTRACT.md",
      "type": "file"
    },
    {
      "path": "DOC/04_CƠ_CẤU_VẬN_HÀNH.md",
      "type": "file"
    },
    {
      "path": "DOC/05_NHỊP_ĐIỀU_HÀNH.md",
      "type": "file"
    },
    {
      "path": "DOC/06_TIÊU_CHUẨN_CHẤT_LƯỢNG.md",
      "type": "file"
    },
    {
      "path": "DOC/ACTIONS.md",
      "type": "file"
    },
    {
      "path": "DOC/audit",
      "type": "dir"
    },
    {
      "path": "DOC/audit/quarantine-candidates.json",
      "type": "file"
    },
    {
      "path": "DOC/audit/quarantine-candidates.md",
      "type": "file"
    },
    {
      "path": "DOC/CEO_COCKPIT.md",
      "type": "file"
    },
    {
      "path": "DOC/DECISIONS.md",
      "type": "file"
    },
    {
      "path": "DOC/DEV_EMULATORS.md",
      "type": "file"
    },
    {
      "path": "DOC/DOC_GLOSSARY_8PORTALS.md",
      "type": "file"
    },
    {
      "path": "DOC/EVENT_MAP.md",
      "type": "file"
    },
    {
      "path": "DOC/health",
      "type": "dir"
    },
    {
      "path": "DOC/health/daily",
      "type": "dir"
    },
    {
      "path": "DOC/health/health-trend.json",
      "type": "file"
    },
    {
      "path": "DOC/NORTH_STAR.md",
      "type": "file"
    },
    {
      "path": "DOC/REPO_SNAPSHOT_INDEX.json",
      "type": "file"
    },
    {
      "path": "DOC/REPO_SNAPSHOT.md",
      "type": "file"
    },
    {
      "path": "DOC/RISKS.md",
      "type": "file"
    },
    {
      "path": "emulator_status.txt",
      "type": "file"
    },
    {
      "path": "firebase.json",
      "type": "file"
    },
    {
      "path": "firestore.rules",
      "type": "file"
    },
    {
      "path": "functions",
      "type": "dir"
    },
    {
      "path": "functions/package-lock.json",
      "type": "file"
    },
    {
      "path": "functions/package.json",
      "type": "file"
    },
    {
      "path": "functions/README.md",
      "type": "file"
    },
    {
      "path": "functions/src",
      "type": "dir"
    },
    {
      "path": "functions/src/index.ts",
      "type": "file"
    },
    {
      "path": "functions/tsconfig.json",
      "type": "file"
    },
    {
      "path": "i18n.js",
      "type": "file"
    },
    {
      "path": "index.html",
      "type": "file"
    },
    {
      "path": "library.js",
      "type": "file"
    },
    {
      "path": "package-lock.json",
      "type": "file"
    },
    {
      "path": "package.json",
      "type": "file"
    },
    {
      "path": "README.md",
      "type": "file"
    },
    {
      "path": "repo_manifest.txt",
      "type": "file"
    },
    {
      "path": "repo.bundle",
      "type": "file"
    },
    {
      "path": "script.js",
      "type": "file"
    },
    {
      "path": "scripts",
      "type": "dir"
    },
    {
      "path": "scripts/check-encoding.mjs",
      "type": "file"
    },
    {
      "path": "scripts/fix-mojibake.mjs",
      "type": "file"
    },
    {
      "path": "SECURITY.md",
      "type": "file"
    },
    {
      "path": "stock.js",
      "type": "file"
    },
    {
      "path": "threads.json",
      "type": "file"
    },
    {
      "path": "tools",
      "type": "dir"
    },
    {
      "path": "tools/bootstrap_admin.mjs",
      "type": "file"
    },
    {
      "path": "tools/dependency_audit.mjs",
      "type": "file"
    },
    {
      "path": "tools/export_repo_snapshot.ps1",
      "type": "file"
    },
    {
      "path": "tools/export_repo_snapshot.sh",
      "type": "file"
    },
    {
      "path": "tools/health_history.mjs",
      "type": "file"
    },
    {
      "path": "tools/import_tch.mjs",
      "type": "file"
    },
    {
      "path": "tools/normalize_threads.mjs",
      "type": "file"
    },
    {
      "path": "tools/ops_automation.mjs",
      "type": "file"
    },
    {
      "path": "tools/ops_bot.mjs",
      "type": "file"
    },
    {
      "path": "tools/quarantine_candidates.mjs",
      "type": "file"
    },
    {
      "path": "tools/quarantine_pr.mjs",
      "type": "file"
    },
    {
      "path": "tools/README_EXPORT_REPO.md",
      "type": "file"
    },
    {
      "path": "tools/repo_doctor.mjs",
      "type": "file"
    },
    {
      "path": "tools/repo_snapshot.mjs",
      "type": "file"
    },
    {
      "path": "tools/validate_threads.mjs",
      "type": "file"
    },
    {
      "path": "workers",
      "type": "dir"
    },
    {
      "path": "workers/thread_search.worker.js",
      "type": "file"
    },
    {
      "path": "worlds",
      "type": "dir"
    },
    {
      "path": "worlds/palette.html",
      "type": "file"
    },
    {
      "path": "worlds/threadcolor.html",
      "type": "file"
    },
    {
      "path": "worlds/threadvault.html",
      "type": "file"
    }
  ]
}
````

## DOC/REPO_SNAPSHOT.md
````text
# REPO SNAPSHOT

- Tai lieu tu dong: tools/repo_snapshot.mjs
- Cac khoi duoi day duoc cap nhat tu dong, on dinh va khong tao diff vo nghia.
## Cay thu muc
<!-- SNAPSHOT_TREE_START -->
```text
- _graveyard
  - assets
    - spacecolors-mark-512.png
    - spacecolors-mark-64.png
  - style.css
  - themes.css
- .editorconfig
- .firebaserc
- .github
  - CODEOWNERS
  - ISSUE_TEMPLATE
    - bug_report.yml
    - feature_request.yml
  - pull_request_template.md
  - workflows
    - ceo-repo-health.yml
    - data-contract.yml
    - ops-quarantine.yml
    - repo-snapshot.yml
- .gitignore
- account.html
- account.js
- admin.html
- assets
  - spacecolors-mark-128.png
  - spacecolors-mark-256.png
  - spacecolors-mark-512.png
  - spacecolors-mark.svg
- auth.js
- CONTRIBUTING.md
- crowd.js
- data
  - audit
    - .gitkeep
  - contract.manifest.json
  - migrations
    - palettes
      - 0.1.0__to__1.0.0.mjs
    - threads
      - 0.1.0__to__1.0.0.mjs
    - threads_generated
      - 0.1.0__to__1.0.0.mjs
    - vault
      - 0.1.0__to__1.0.0.mjs
  - palettes.json
  - raw_tch
    - Ackerman Isacord 30.tch
  - README.md
  - schemas
    - palettes
      - 0.1.0.json
    - palettes.schema.json
    - threads
      - 0.1.0.json
    - threads.schema.json
    - vault
      - 0.1.0.json
    - vault.schema.json
  - scripts
    - audit.mjs
    - migrate_contract.mjs
    - validate_contract.mjs
  - threads.generated.json
  - vault.json
- data_normalize.js
- dependency-audit.json
- dependency-audit.md
- DOC
  - 00_TOAN_CANH.md
  - 01_NOW.md
  - 01_WORKFLOW.md
  - 02_QUAN_TRI_GITHUB.md
  - 03_RUNTIME_CONTRACT.md
  - 04_CƠ_CẤU_VẬN_HÀNH.md
  - 05_NHỊP_ĐIỀU_HÀNH.md
  - 06_TIÊU_CHUẨN_CHẤT_LƯỢNG.md
  - ACTIONS.md
  - audit
    - quarantine-candidates.json
    - quarantine-candidates.md
  - CEO_COCKPIT.md
  - DECISIONS.md
  - DEV_EMULATORS.md
  - DOC_GLOSSARY_8PORTALS.md
  - EVENT_MAP.md
  - health
    - daily (bo qua file con)
    - health-trend.json
  - NORTH_STAR.md
  - REPO_SNAPSHOT_INDEX.json
  - REPO_SNAPSHOT.md
  - RISKS.md
- emulator_status.txt
- firebase.json
- firestore.rules
- functions
  - package-lock.json
  - package.json
  - README.md
  - src
    - index.ts
  - tsconfig.json
- i18n.js
- index.html
- library.js
- package-lock.json
- package.json
- README.md
- repo_manifest.txt
- repo.bundle
- script.js
- scripts
  - check-encoding.mjs
  - fix-mojibake.mjs
- SECURITY.md
- stock.js
- threads.json
- tools
  - bootstrap_admin.mjs
  - dependency_audit.mjs
  - export_repo_snapshot.ps1
  - export_repo_snapshot.sh
  - health_history.mjs
  - import_tch.mjs
  - normalize_threads.mjs
  - ops_automation.mjs
  - ops_bot.mjs
  - quarantine_candidates.mjs
  - quarantine_pr.mjs
  - README_EXPORT_REPO.md
  - repo_doctor.mjs
  - repo_snapshot.mjs
  - validate_threads.mjs
- workers
  - thread_search.worker.js
- worlds
  - palette.html
  - threadcolor.html
  - threadvault.html
```
<!-- SNAPSHOT_TREE_END -->
## Thong ke
<!-- SNAPSHOT_STATS_START -->
```text
Tong thu muc: 29
Tong file: 110

Thong ke phan mo rong:
.bundle: 1
.css: 2
.html: 6
.js: 9
.json: 21
.md: 26
.mjs: 21
.png: 5
.ps1: 1
.rules: 1
.sh: 1
.svg: 1
.tch: 1
.ts: 1
.txt: 2
.yml: 6
(noext): 5

Bo qua:
- .git/ (bo qua toan bo)
- DOC/health/daily/ (bo qua file con)
```
<!-- SNAPSHOT_STATS_END -->

````

## DOC/RISKS.md
````text
# RISKS — Sổ rủi ro

<!-- AUTO_START -->
updated_at: 2026-01-04
Top rủi ro (AUTO):
- (không có)
<!-- AUTO_END -->

## THỦ CÔNG

| ID | Rủi ro | Xác suất (1-5) | Tác động (1-5) | Mức | Chủ sở hữu | Kế hoạch giảm rủi ro | Hạn |
|---|---|---:|---:|---|---|---|---|
| R-001 |  |  |  |  |  |  |  |
````

## emulator_status.txt
````text
﻿ERR

````

## emulator.err.log
````text

````

## emulator.out.log
````text
[36m[1mi  emulators:[22m[39m Shutting down emulators.

[1m[31mError:[39m[22m Could not spawn `java -version`. Please make sure Java is installed and on your system PATH.

````

## firebase.json
````text
{
  "functions": {
    "source": "functions",
    "predeploy": [
      "npm --prefix \"$RESOURCE_DIR\" run build"
    ]
  },
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      ".firebaserc",
      "**/node_modules/**",
      "functions/**",
      ".github/**",
      "DOC/**",
      "reports/**",
      "tools/**",
      "workers/**",
      "_graveyard/**"
    ],
    "headers": [
      {
        "source": "**/*.html",
        "headers": [
          {
            "key": "Content-Type",
            "value": "text/html; charset=utf-8"
          },
          {
            "key": "Cache-Control",
            "value": "no-cache"
          }
        ]
      },
      {
        "source": "**/*.js",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/javascript; charset=utf-8"
          }
        ]
      },
      {
        "source": "**/*.css",
        "headers": [
          {
            "key": "Content-Type",
            "value": "text/css; charset=utf-8"
          }
        ]
      },
      {
        "source": "/admin/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-store"
          }
        ]
      }
    ],
    "rewrites": [
      {
        "source": "/admin/**",
        "function": "adminApi"
      },
      {
        "source": "/telemetry/ingest",
        "function": "telemetryIngest"
      }
    ]
  },
  "emulators": {
    "functions": { "port": 5001 },
    "firestore": { "port": 8080 },
    "hosting": { "port": 5000 },
    "ui": { "enabled": true, "port": 4000 },
    "singleProjectMode": true
  }
}

````

## firestore-debug.log
````text
Jan 04, 2026 10:41:01 PM com.google.cloud.datastore.emulator.firestore.websocket.WebSocketServer start
INFO: Started WebSocket server on ws://127.0.0.1:9150
API endpoint: http://127.0.0.1:8080
If you are using a library that supports the FIRESTORE_EMULATOR_HOST environment variable, run:

   export FIRESTORE_EMULATOR_HOST=127.0.0.1:8080

If you are running a Firestore in Datastore Mode project, run:

   export DATASTORE_EMULATOR_HOST=127.0.0.1:8080

Note: Support for Datastore Mode is in preview. If you encounter any bugs please file at https://github.com/firebase/firebase-tools/issues.
Dev App Server is now running.


````

## firestore.rules
````text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    match /verifiedThreads/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /submissions/{id} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.createdByUid == request.auth.uid;
      allow update: if isAdmin() || (request.auth != null && request.resource.data.createdByUid == request.auth.uid && request.resource.data.status == "pending");
      allow delete: if isAdmin() || (request.auth != null && request.resource.data.createdByUid == request.auth.uid);

      match /votes/{uid} {
        allow read: if request.auth != null;
        allow write: if request.auth != null && request.auth.uid == uid;
        allow delete: if request.auth != null && request.auth.uid == uid;
      }
    }

    match /users/{uid} {
      allow read, create, update, delete: if request.auth != null && request.auth.uid == uid;

      match /savedSearches/{docId} {
        allow read, create, update, delete: if request.auth != null && request.auth.uid == uid;
      }
    }

    match /feedback/{docId} {
      allow create: if request.auth != null;
      allow read: if isAdmin();
      allow update, delete: if false;
    }

    match /admins/{uid} {
      allow read: if isAdmin();
      allow write: if false;
    }

    // Các collection nhạy cảm chỉ cho phép truy cập từ server (Admin SDK).
    match /decisionPacks/{docId} {
      allow read, write: if false;
    }
    match /adminAuditLogs/{docId} {
      allow read, write: if false;
    }
    match /adminIdempotency/{docId} {
      allow read, write: if false;
    }
    match /adminReports/{docId} {
      allow read, write: if false;
    }
  }
}

````

## functions/lib/index.js
````text
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailyAdminReport = exports.telemetryIngest = exports.accountApi = exports.adminApi = void 0;
const https_1 = require("firebase-functions/v2/https");
const scheduler_1 = require("firebase-functions/v2/scheduler");
const admin = __importStar(require("firebase-admin"));
const express_1 = __importDefault(require("express"));
const crypto_1 = require("crypto");
admin.initializeApp();
const db = admin.firestore();
const app = (0, express_1.default)();
const accountApp = (0, express_1.default)();
app.use(express_1.default.json({ limit: "1mb" }));
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    next();
});
accountApp.use(express_1.default.json({ limit: "1mb" }));
accountApp.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    next();
});
const getRequestId = (req) => (req.header("x-request-id") || req.header("x-correlation-id") || null) ?? (0, crypto_1.randomUUID)();
const writeAuditLog = async (payload) => {
    try {
        await db.collection("adminAuditLogs").add({
            ...payload,
            ts: admin.firestore.FieldValue.serverTimestamp()
        });
    }
    catch (_err) {
        // Không chặn phản hồi nếu log thất bại.
    }
};
const toIsoOrNull = (value) => {
    if (!value)
        return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
};
const redact = (input) => {
    if (!input || typeof input !== "object")
        return input;
    if (Array.isArray(input))
        return input.map(redact);
    const blocked = ["token", "email", "password", "secret"];
    const result = {};
    Object.entries(input).forEach(([key, value]) => {
        const lower = key.toLowerCase();
        if (blocked.some((k) => lower.includes(k)))
            return;
        result[key] = redact(value);
    });
    return result;
};
const pickPackSnapshot = (data) => {
    if (!data)
        return null;
    return {
        title: data.title || "",
        description: data.description || "",
        status: data.status || "",
        dueAt: data.dueAt || null,
        updatedAt: data.updatedAt || null
    };
};
const getIdempotencyDoc = (uid, key, pathKey) => db.doc(`adminIdempotency/${uid}__${key}__${pathKey}`);
const requireAdmin = async (req, res, next) => {
    const authHeader = req.header("Authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    const requestId = getRequestId(req);
    const baseAudit = {
        requestId,
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.header("user-agent") || ""
    };
    if (!token) {
        await writeAuditLog({ ...baseAudit, status: 401, uid: null, result: "MISSING_TOKEN" });
        return res.status(401).json({ ok: false, message: "Thiếu ID token. Vui lòng đăng nhập." });
    }
    let decoded;
    try {
        decoded = await admin.auth().verifyIdToken(token);
    }
    catch (_err) {
        await writeAuditLog({ ...baseAudit, status: 401, uid: null, result: "INVALID_TOKEN" });
        return res.status(401).json({ ok: false, message: "ID token không hợp lệ." });
    }
    const uid = decoded.uid;
    try {
        const adminDoc = await db.doc(`admins/${uid}`).get();
        if (!adminDoc.exists) {
            await writeAuditLog({ ...baseAudit, status: 403, uid, result: "NOT_ADMIN" });
            return res.status(403).json({ ok: false, message: "Bạn không có quyền truy cập admin." });
        }
    }
    catch (_err) {
        await writeAuditLog({ ...baseAudit, status: 403, uid, result: "ADMIN_CHECK_FAILED" });
        return res.status(403).json({ ok: false, message: "Không thể xác minh quyền admin." });
    }
    res.locals.uid = uid;
    res.locals.requestId = requestId;
    return next();
};
app.get("/admin/ping", requireAdmin, async (req, res) => {
    const uid = res.locals.uid;
    await writeAuditLog({
        requestId: res.locals.requestId,
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.header("user-agent") || "",
        status: 200,
        uid,
        result: "OK"
    });
    return res.status(200).json({ ok: true, uid, role: "admin", message: "Admin API hoạt động" });
});
app.get("/admin/decision-packs", requireAdmin, async (req, res) => {
    const uid = res.locals.uid;
    const limit = Math.min(Number(req.query.limit) || 50, 200);
    const status = typeof req.query.status === "string" ? req.query.status : null;
    let query = db.collection("decisionPacks").orderBy("createdAt", "desc").limit(limit);
    if (status) {
        query = query.where("status", "==", status);
    }
    const snap = await query.get();
    const packs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    await writeAuditLog({
        requestId: res.locals.requestId,
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.header("user-agent") || "",
        status: 200,
        uid,
        result: "LIST_DECISION_PACKS"
    });
    return res.status(200).json({ ok: true, items: packs });
});
app.post("/admin/decision-packs", requireAdmin, async (req, res) => {
    const uid = res.locals.uid;
    const { title, description, dueAt } = req.body || {};
    if (!title || typeof title !== "string") {
        return res.status(400).json({ ok: false, message: "Thiếu tiêu đề gói quyết định." });
    }
    const cleanTitle = title.trim();
    if (!cleanTitle) {
        return res.status(400).json({ ok: false, message: "Tiêu đề không hợp lệ." });
    }
    const idempotencyKey = String(req.header("Idempotency-Key") || "").trim();
    if (!idempotencyKey) {
        return res.status(400).json({ ok: false, message: "Thiếu Idempotency-Key để chống tạo trùng." });
    }
    const pathKey = "decision-packs-create";
    const idemRef = getIdempotencyDoc(uid, idempotencyKey, pathKey);
    const idemSnap = await idemRef.get();
    if (idemSnap.exists) {
        const data = idemSnap.data() || {};
        const packId = data.packId || "";
        if (packId) {
            const packSnap = await db.doc(`decisionPacks/${packId}`).get();
            await writeAuditLog({
                requestId: res.locals.requestId,
                method: req.method,
                path: req.path,
                ip: req.ip,
                userAgent: req.header("user-agent") || "",
                status: 200,
                uid,
                result: "IDEMPOTENT_HIT",
                after: redact({ packId })
            });
            return res.status(200).json({ ok: true, item: { id: packSnap.id, ...packSnap.data() } });
        }
    }
    const dueIso = toIsoOrNull(dueAt);
    const now = admin.firestore.FieldValue.serverTimestamp();
    const docRef = await db.collection("decisionPacks").add({
        title: cleanTitle,
        description: typeof description === "string" ? description.trim() : "",
        status: "pending",
        dueAt: dueIso,
        createdBy: uid,
        createdAt: now,
        updatedAt: now
    });
    await idemRef.set({
        uid,
        packId: docRef.id,
        createdAt: now
    });
    const packSnap = await docRef.get();
    await writeAuditLog({
        requestId: res.locals.requestId,
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.header("user-agent") || "",
        status: 201,
        uid,
        result: "CREATE_DECISION_PACK",
        after: redact(pickPackSnapshot(packSnap.data()))
    });
    return res.status(201).json({ ok: true, item: { id: docRef.id, ...packSnap.data() } });
});
app.patch("/admin/decision-packs/:id", requireAdmin, async (req, res) => {
    const uid = res.locals.uid;
    const packId = req.params.id;
    const packRef = db.doc(`decisionPacks/${packId}`);
    const packSnap = await packRef.get();
    if (!packSnap.exists) {
        return res.status(404).json({ ok: false, message: "Không tìm thấy gói quyết định." });
    }
    const { title, description, dueAt, status } = req.body || {};
    const nextStatus = typeof status === "string" ? status : null;
    const allowedStatus = ["pending", "approved", "rejected", "expired"];
    if (nextStatus && !allowedStatus.includes(nextStatus)) {
        return res.status(400).json({ ok: false, message: "Trạng thái không hợp lệ." });
    }
    const dueIso = toIsoOrNull(dueAt);
    const updatePayload = {
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    if (typeof title === "string")
        updatePayload.title = title.trim();
    if (typeof description === "string")
        updatePayload.description = description.trim();
    if (dueAt !== undefined)
        updatePayload.dueAt = dueIso;
    if (nextStatus) {
        updatePayload.status = nextStatus;
        updatePayload.decidedBy = nextStatus === "approved" || nextStatus === "rejected" ? uid : null;
        updatePayload.decidedAt = nextStatus === "approved" || nextStatus === "rejected"
            ? admin.firestore.FieldValue.serverTimestamp()
            : null;
    }
    const before = pickPackSnapshot(packSnap.data());
    await packRef.set(updatePayload, { merge: true });
    const afterSnap = await packRef.get();
    await writeAuditLog({
        requestId: res.locals.requestId,
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.header("user-agent") || "",
        status: 200,
        uid,
        result: "UPDATE_DECISION_PACK",
        before: redact(before),
        after: redact(pickPackSnapshot(afterSnap.data()))
    });
    return res.status(200).json({ ok: true, item: { id: afterSnap.id, ...afterSnap.data() } });
});
app.get("/admin/audit-logs", requireAdmin, async (req, res) => {
    const uid = res.locals.uid;
    const limit = Math.min(Number(req.query.limit) || 50, 200);
    const snap = await db.collection("adminAuditLogs").orderBy("ts", "desc").limit(limit).get();
    const logs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    await writeAuditLog({
        requestId: res.locals.requestId,
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.header("user-agent") || "",
        status: 200,
        uid,
        result: "LIST_AUDIT_LOGS"
    });
    return res.status(200).json({ ok: true, items: logs });
});
app.all("/admin/*", requireAdmin, async (req, res) => {
    await writeAuditLog({
        requestId: res.locals.requestId,
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.header("user-agent") || "",
        status: 404,
        uid: res.locals.uid || null,
        result: "NOT_FOUND"
    });
    return res.status(404).json({ ok: false, message: "Không tìm thấy API admin." });
});
exports.adminApi = (0, https_1.onRequest)(app);
accountApp.post("/account/revoke-sessions", async (req, res) => {
    const authHeader = req.header("Authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (!token) {
        res.status(401).json({ ok: false, message: "Thieu ID token." });
        return;
    }
    try {
        const decoded = await admin.auth().verifyIdToken(token);
        await admin.auth().revokeRefreshTokens(decoded.uid);
        res.status(200).json({ ok: true });
        return;
    }
    catch (_err) {
        res.status(401).json({ ok: false, message: "ID token khong hop le." });
        return;
    }
});
exports.accountApi = (0, https_1.onRequest)(accountApp);
exports.telemetryIngest = (0, https_1.onRequest)({ cors: true }, async (req, res) => {
    res.set("Cache-Control", "no-store");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    if (req.method === "OPTIONS") {
        return res.status(204).send("");
    }
    if (req.method !== "POST") {
        return res.status(405).json({ ok: false, message: "Chỉ hỗ trợ POST." });
    }
    const body = req.body || {};
    const counts = body.counts || {};
    const allowed = ["search_start", "search_result", "pin", "copy", "save"];
    const increments = {};
    allowed.forEach((key) => {
        const value = Number(counts[key] || 0);
        if (value > 0)
            increments[key] = admin.firestore.FieldValue.increment(value);
    });
    if (!Object.keys(increments).length) {
        return res.status(200).json({ ok: true, message: "Không có dữ liệu cập nhật." });
    }
    const dateKey = formatDateBangkok(new Date());
    const ref = db.doc(`metrics_daily/${dateKey}`);
    await ref.set({
        date: dateKey,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        ...increments
    }, { merge: true });
    return res.status(200).json({ ok: true });
});
function formatDateBangkok(date) {
    const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Bangkok",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
    return formatter.format(date);
}
exports.dailyAdminReport = (0, scheduler_1.onSchedule)({ schedule: "5 0 * * *", timeZone: "Asia/Bangkok" }, async () => {
    const todayKey = formatDateBangkok(new Date());
    const reportRef = db.doc(`adminReports/daily/${todayKey}`);
    const exists = await reportRef.get();
    if (exists.exists)
        return;
    const [packsSnap, logsSnap, authErrorSnap] = await Promise.all([
        db.collection("decisionPacks").get(),
        db.collection("adminAuditLogs").get(),
        db.collection("adminAuditLogs").where("status", "in", [401, 403]).get()
    ]);
    const payload = {
        date: todayKey,
        decisionPacksCount: packsSnap.size,
        auditLogsCount: logsSnap.size,
        authDeniedCount: authErrorSnap.size,
        generatedAt: admin.firestore.FieldValue.serverTimestamp(),
        note: "Báo cáo tự động theo ngày (Asia/Bangkok)"
    };
    await reportRef.set(payload, { merge: true });
    await writeAuditLog({
        requestId: "SYSTEM",
        method: "SCHEDULE",
        path: "dailyAdminReport",
        ip: "",
        userAgent: "scheduler",
        status: 200,
        uid: "SYSTEM",
        result: "DAILY_REPORT",
        after: redact(payload)
    });
});

````

## functions/package-lock.json
````text
{
  "name": "admin-api",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "admin-api",
      "dependencies": {
        "express": "^4.18.2",
        "firebase-admin": "^11.10.1",
        "firebase-functions": "^4.4.1"
      },
      "devDependencies": {
        "@types/body-parser": "^1.19.6",
        "@types/connect": "^3.4.38",
        "@types/cors": "^2.8.19",
        "@types/express": "^5.0.6",
        "@types/express-serve-static-core": "^5.1.0",
        "@types/glob": "^8.1.0",
        "@types/http-errors": "^2.0.5",
        "@types/ms": "^2.1.0",
        "@types/node": "^25.0.3",
        "@types/qs": "^6.14.0",
        "@types/range-parser": "^1.2.7",
        "@types/serve-static": "^2.2.0",
        "typescript": "^5.3.3"
      },
      "engines": {
        "node": "18"
      }
    },
    "node_modules/@fastify/busboy": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@fastify/busboy/-/busboy-1.2.1.tgz",
      "integrity": "sha512-7PQA7EH43S0CxcOa9OeAnaeA0oQ+e/DHNPZwSQM9CQHW76jle5+OvLdibRp/Aafs9KXbLhxyjOTkRjWUbQEd3Q==",
      "license": "MIT",
      "dependencies": {
        "text-decoding": "^1.0.0"
      },
      "engines": {
        "node": ">=14"
      }
    },
    "node_modules/@fastify/busboy/node_modules/text-decoding": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/text-decoding/-/text-decoding-1.0.0.tgz",
      "integrity": "sha512-/0TJD42KDnVwKmDK6jj3xP7E2MG7SHAOG4tyTgyUCRPdHwvkquYNLEQltmdMa3owq3TkddCVcTsoctJI8VQNKA==",
      "license": "MIT"
    },
    "node_modules/@firebase/database-compat": {
      "version": "0.3.4",
      "resolved": "https://registry.npmjs.org/@firebase/database-compat/-/database-compat-0.3.4.tgz",
      "integrity": "sha512-kuAW+l+sLMUKBThnvxvUZ+Q1ZrF/vFJ58iUY9kAcbX48U03nVzIF6Tmkf0p3WVQwMqiXguSgtOPIB6ZCeF+5Gg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/component": "0.6.4",
        "@firebase/database": "0.14.4",
        "@firebase/database-types": "0.10.4",
        "@firebase/logger": "0.4.0",
        "@firebase/util": "1.9.3",
        "tslib": "^2.1.0"
      }
    },
    "node_modules/@firebase/database-compat/node_modules/@firebase/auth-interop-types": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/@firebase/auth-interop-types/-/auth-interop-types-0.2.1.tgz",
      "integrity": "sha512-VOaGzKp65MY6P5FI84TfYKBXEPi6LmOCSMMzys6o2BN2LOsqy7pCuZCup7NYnfbk5OkkQKzvIfHOzTm0UDpkyg==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/database-compat/node_modules/@firebase/component": {
      "version": "0.6.4",
      "resolved": "https://registry.npmjs.org/@firebase/component/-/component-0.6.4.tgz",
      "integrity": "sha512-rLMyrXuO9jcAUCaQXCMjCMUsWrba5fzHlNK24xz5j2W6A/SRmK8mZJ/hn7V0fViLbxC0lPMtrK1eYzk6Fg03jA==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/util": "1.9.3",
        "tslib": "^2.1.0"
      }
    },
    "node_modules/@firebase/database-compat/node_modules/@firebase/database": {
      "version": "0.14.4",
      "resolved": "https://registry.npmjs.org/@firebase/database/-/database-0.14.4.tgz",
      "integrity": "sha512-+Ea/IKGwh42jwdjCyzTmeZeLM3oy1h0mFPsTy6OqCWzcu/KFqRAr5Tt1HRCOBlNOdbh84JPZC47WLU18n2VbxQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/auth-interop-types": "0.2.1",
        "@firebase/component": "0.6.4",
        "@firebase/logger": "0.4.0",
        "@firebase/util": "1.9.3",
        "faye-websocket": "0.11.4",
        "tslib": "^2.1.0"
      }
    },
    "node_modules/@firebase/database-compat/node_modules/@firebase/logger": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/@firebase/logger/-/logger-0.4.0.tgz",
      "integrity": "sha512-eRKSeykumZ5+cJPdxxJRgAC3G5NknY2GwEbKfymdnXtnT0Ucm4pspfR6GT4MUQEDuJwRVbVcSx85kgJulMoFFA==",
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.1.0"
      }
    },
    "node_modules/@firebase/database-compat/node_modules/@firebase/util": {
      "version": "1.9.3",
      "resolved": "https://registry.npmjs.org/@firebase/util/-/util-1.9.3.tgz",
      "integrity": "sha512-DY02CRhOZwpzO36fHpuVysz6JZrscPiBXD0fXp6qSrL9oNOx5KWICKdR95C0lSITzxp0TZosVyHqzatE8JbcjA==",
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.1.0"
      }
    },
    "node_modules/@firebase/database-compat/node_modules/faye-websocket": {
      "version": "0.11.4",
      "resolved": "https://registry.npmjs.org/faye-websocket/-/faye-websocket-0.11.4.tgz",
      "integrity": "sha512-CzbClwlXAuiRQAlUyfqPgvPoNKTckTPGfwZV4ZdAhVcP2lh9KUxJg2b5GkE7XbjKQ3YJnQ9z6D9ntLAlB+tP8g==",
      "license": "Apache-2.0",
      "dependencies": {
        "websocket-driver": ">=0.5.1"
      },
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/@firebase/database-compat/node_modules/http-parser-js": {
      "version": "0.5.10",
      "resolved": "https://registry.npmjs.org/http-parser-js/-/http-parser-js-0.5.10.tgz",
      "integrity": "sha512-Pysuw9XpUq5dVc/2SMHpuTY01RFl8fttgcyunjL7eEMhGM3cI4eOmiCycJDVCo/7O7ClfQD3SaI6ftDzqOXYMA==",
      "license": "MIT"
    },
    "node_modules/@firebase/database-compat/node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/@firebase/database-compat/node_modules/websocket-driver": {
      "version": "0.7.4",
      "resolved": "https://registry.npmjs.org/websocket-driver/-/websocket-driver-0.7.4.tgz",
      "integrity": "sha512-b17KeDIQVjvb0ssuSDF2cYXSg2iztliJ4B9WdsuB6J952qCPKmnVq4DyW5motImXHDC1cBT/1UezrJVsKw5zjg==",
      "license": "Apache-2.0",
      "dependencies": {
        "http-parser-js": ">=0.5.1",
        "safe-buffer": ">=5.1.0",
        "websocket-extensions": ">=0.1.1"
      },
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/@firebase/database-compat/node_modules/websocket-extensions": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/websocket-extensions/-/websocket-extensions-0.1.4.tgz",
      "integrity": "sha512-OqedPIGOfsDlo31UNwYbCFMSaO9m9G/0faIHj5/dZFDMFqPTcx6UwqyOy3COEaEOg/9VsGIpdqn62W5KhoKSpg==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/@firebase/database-types": {
      "version": "0.10.4",
      "resolved": "https://registry.npmjs.org/@firebase/database-types/-/database-types-0.10.4.tgz",
      "integrity": "sha512-dPySn0vJ/89ZeBac70T+2tWWPiJXWbmRygYv0smT5TfE3hDrQ09eKMF3Y+vMlTdrMWq7mUdYW5REWPSGH4kAZQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@firebase/app-types": "0.9.0",
        "@firebase/util": "1.9.3"
      }
    },
    "node_modules/@firebase/database-types/node_modules/@firebase/app-types": {
      "version": "0.9.0",
      "resolved": "https://registry.npmjs.org/@firebase/app-types/-/app-types-0.9.0.tgz",
      "integrity": "sha512-AeweANOIo0Mb8GiYm3xhTEBVCmPwTYAu9Hcd2qSkLuga/6+j9b1Jskl5bpiSQWy9eJ/j5pavxj6eYogmnuzm+Q==",
      "license": "Apache-2.0"
    },
    "node_modules/@firebase/database-types/node_modules/@firebase/util": {
      "version": "1.9.3",
      "resolved": "https://registry.npmjs.org/@firebase/util/-/util-1.9.3.tgz",
      "integrity": "sha512-DY02CRhOZwpzO36fHpuVysz6JZrscPiBXD0fXp6qSrL9oNOx5KWICKdR95C0lSITzxp0TZosVyHqzatE8JbcjA==",
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.1.0"
      }
    },
    "node_modules/@firebase/database-types/node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/@google-cloud/firestore": {
      "version": "6.8.0",
      "resolved": "https://registry.npmjs.org/@google-cloud/firestore/-/firestore-6.8.0.tgz",
      "integrity": "sha512-JRpk06SmZXLGz0pNx1x7yU3YhkUXheKgH5hbDZ4kMsdhtfV5qPLJLRI4wv69K0cZorIk+zTMOwptue7hizo0eA==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "functional-red-black-tree": "^1.0.1",
        "google-gax": "^3.5.7",
        "protobufjs": "^7.2.5"
      },
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/@babel/helper-validator-identifier": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.28.5.tgz",
      "integrity": "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/@babel/parser": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.28.5.tgz",
      "integrity": "sha512-KKBU1VGYR7ORr3At5HAtUQ+TV3SzRCXmA/8OdDZiLDBIZxVyzXuztPjfLd3BV1PRAQGCMWWSHYhL0F8d5uHBDQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@babel/types": "^7.28.5"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/@babel/types": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.28.5.tgz",
      "integrity": "sha512-qQ5m48eI/MFLQ5PxQj4PFaprjyCTLI37ElWMmNs0K8Lk3dVeOdNpB3ks8jc7yM5CDmVC73eMVk/trk3fgmrUpA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@babel/helper-string-parser": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.28.5"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/@grpc/grpc-js": {
      "version": "1.8.22",
      "resolved": "https://registry.npmjs.org/@grpc/grpc-js/-/grpc-js-1.8.22.tgz",
      "integrity": "sha512-oAjDdN7fzbUi+4hZjKG96MR6KTEubAeMpQEb+77qy+3r0Ua5xTFuie6JOLr4ZZgl5g+W5/uRTS2M1V8mVAFPuA==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "@grpc/proto-loader": "^0.7.0",
        "@types/node": ">=12.12.47"
      },
      "engines": {
        "node": "^8.13.0 || >=10.10.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/@grpc/proto-loader": {
      "version": "0.7.15",
      "resolved": "https://registry.npmjs.org/@grpc/proto-loader/-/proto-loader-0.7.15.tgz",
      "integrity": "sha512-tMXdRCfYVixjuFK+Hk0Q1s38gV9zDiDJfWL3h1rv4Qc39oILCu1TRTDt7+fGUI8K4G1Fj125Hx/ru3azECWTyQ==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "lodash.camelcase": "^4.3.0",
        "long": "^5.0.0",
        "protobufjs": "^7.2.5",
        "yargs": "^17.7.2"
      },
      "bin": {
        "proto-loader-gen-types": "build/bin/proto-loader-gen-types.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/@jsdoc/salty": {
      "version": "0.2.9",
      "resolved": "https://registry.npmjs.org/@jsdoc/salty/-/salty-0.2.9.tgz",
      "integrity": "sha512-yYxMVH7Dqw6nO0d5NIV8OQWnitU8k6vXH8NtgqAfIa/IUqRMxRv/NUJJ08VEKbAakwxlgBl5PJdrU0dMPStsnw==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "lodash": "^4.17.21"
      },
      "engines": {
        "node": ">=v12.0.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/@protobufjs/aspromise": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/aspromise/-/aspromise-1.1.2.tgz",
      "integrity": "sha512-j+gKExEuLmKwvz3OgROXtrJ2UG2x8Ch2YZUxahh+s1F2HZ+wAceUNLkvy6zKCPVRkU++ZWQrdxsUeQXmcg4uoQ==",
      "license": "BSD-3-Clause",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/@protobufjs/base64": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/base64/-/base64-1.1.2.tgz",
      "integrity": "sha512-AZkcAA5vnN/v4PDqKyMR5lx7hZttPDgClv83E//FMNhR2TMcLUhfRUBHCmSl0oi9zMgDDqRUJkSxO3wm85+XLg==",
      "license": "BSD-3-Clause",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/@protobufjs/codegen": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/@protobufjs/codegen/-/codegen-2.0.4.tgz",
      "integrity": "sha512-YyFaikqM5sH0ziFZCN3xDC7zeGaB/d0IUb9CATugHWbd1FRFwWwt4ld4OYMPWu5a3Xe01mGAULCdqhMlPl29Jg==",
      "license": "BSD-3-Clause",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/@protobufjs/eventemitter": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/eventemitter/-/eventemitter-1.1.0.tgz",
      "integrity": "sha512-j9ednRT81vYJ9OfVuXG6ERSTdEL1xVsNgqpkxMsbIabzSo3goCjDIveeGv5d03om39ML71RdmrGNjG5SReBP/Q==",
      "license": "BSD-3-Clause",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/@protobufjs/fetch": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/fetch/-/fetch-1.1.0.tgz",
      "integrity": "sha512-lljVXpqXebpsijW71PZaCYeIcE5on1w5DlQy5WH6GLbFryLUrBD4932W/E2BSpfRJWseIL4v/KPgBFxDOIdKpQ==",
      "license": "BSD-3-Clause",
      "optional": true,
      "dependencies": {
        "@protobufjs/aspromise": "^1.1.1",
        "@protobufjs/inquire": "^1.1.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/@protobufjs/float": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/float/-/float-1.0.2.tgz",
      "integrity": "sha512-Ddb+kVXlXst9d+R9PfTIxh1EdNkgoRe5tOX6t01f1lYWOvJnSPDBlG241QLzcyPdoNTsblLUdujGSE4RzrTZGQ==",
      "license": "BSD-3-Clause",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/@protobufjs/inquire": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/inquire/-/inquire-1.1.0.tgz",
      "integrity": "sha512-kdSefcPdruJiFMVSbn801t4vFK7KB/5gd2fYvrxhuJYg8ILrmn9SKSX2tZdV6V+ksulWqS7aXjBcRXl3wHoD9Q==",
      "license": "BSD-3-Clause",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/@protobufjs/path": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/path/-/path-1.1.2.tgz",
      "integrity": "sha512-6JOcJ5Tm08dOHAbdR3GrvP+yUUfkjG5ePsHYczMFLq3ZmMkAD98cDgcT2iA1lJ9NVwFd4tH/iSSoe44YWkltEA==",
      "license": "BSD-3-Clause",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/@protobufjs/pool": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/pool/-/pool-1.1.0.tgz",
      "integrity": "sha512-0kELaGSIDBKvcgS4zkjz1PeddatrjYcmMWOlAuAPwAeccUrPHdUqo/J6LiymHHEiJT5NrF1UVwxY14f+fy4WQw==",
      "license": "BSD-3-Clause",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/@protobufjs/utf8": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/utf8/-/utf8-1.1.0.tgz",
      "integrity": "sha512-Vvn3zZrhQZkkBE8LSuW3em98c0FwgO4nxzv6OdSxPKJIEKY2bGbHn+mhGIPerzI4twdxaP8/0+06HBpwf345Lw==",
      "license": "BSD-3-Clause",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/@types/long": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/@types/long/-/long-4.0.2.tgz",
      "integrity": "sha512-MqTGEo5bj5t157U6fA/BiDynNkn0YknVdh48CMPkTSpFTVmvao5UQmm7uEF6xBEo7qIMAlY/JSleYaE6VOdpaA==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/@types/rimraf": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/rimraf/-/rimraf-3.0.2.tgz",
      "integrity": "sha512-F3OznnSLAUxFrCEu/L5PY8+ny8DtcFRjx7fZZ9bycvXRi3KPTRS9HOitGZwvPg0juRhXFWIeKX58cnX5YqLohQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@types/glob": "*",
        "@types/node": "*"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/abort-controller": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/abort-controller/-/abort-controller-3.0.0.tgz",
      "integrity": "sha512-h8lQ8tacZYnR3vNQTgibj+tODHI5/+l06Au2Pcriv/Gmet0eaj4TwWH41sO9wnHDiQsEj19q0drzdWdeAHtweg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "event-target-shim": "^5.0.0"
      },
      "engines": {
        "node": ">=6.5"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/acorn-jsx": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
      "integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
      "license": "MIT",
      "optional": true,
      "peerDependencies": {
        "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/agent-base": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-6.0.2.tgz",
      "integrity": "sha512-RZNwNclF7+MS/8bDg70amg32dyeZGZxiDuQmZxKLAlQjr3jGyLx+4Kkk58UO7D2QdgFIQCovuSuZESne6RG6XQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "debug": "4"
      },
      "engines": {
        "node": ">= 6.0.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/arrify": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/arrify/-/arrify-2.0.1.tgz",
      "integrity": "sha512-3duEwti880xqi4eAMN8AyR4a0ByT90zoYdLlevfrvU43vb0YZwZVfxOgxWrLXXXpyugL0hNZc9G6BiB5B3nUug==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/base64-js": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.5.1.tgz",
      "integrity": "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/bignumber.js": {
      "version": "9.3.1",
      "resolved": "https://registry.npmjs.org/bignumber.js/-/bignumber.js-9.3.1.tgz",
      "integrity": "sha512-Ko0uX15oIUS7wJ3Rb30Fs6SkVbLmPBAKdlm7q9+ak9bbIeFf0MwuBsQV6z7+X768/cHsfg+WlysDWJcmthjsjQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": "*"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/bluebird": {
      "version": "3.7.2",
      "resolved": "https://registry.npmjs.org/bluebird/-/bluebird-3.7.2.tgz",
      "integrity": "sha512-XpNj6GDQzdfW+r2Wnn7xiSAd7TM3jzkxGXBGTtWKuSXv1xUV+azxAm8jdWZN06QTQk+2N2XB9jRDkvbmQmcRtg==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/brace-expansion": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.0.2.tgz",
      "integrity": "sha512-Jt0vHyM+jmUBqojB7E1NIYadt0vI0Qxjxd2TErW94wDz+E2LAm5vKMXXwg6ZZBTHPuUlDgQHKXvjGBdfcF1ZDQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "balanced-match": "^1.0.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/buffer-equal-constant-time": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/buffer-equal-constant-time/-/buffer-equal-constant-time-1.0.1.tgz",
      "integrity": "sha512-zRpUiDwd/xk6ADqPMATG8vc9VPrkck7T07OIx0gnjmJAnHnTVXNQG3vfvWNuiZIkwu9KrKdA1iJKfsfTVxE6NA==",
      "license": "BSD-3-Clause",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/catharsis": {
      "version": "0.9.0",
      "resolved": "https://registry.npmjs.org/catharsis/-/catharsis-0.9.0.tgz",
      "integrity": "sha512-prMTQVpcns/tzFgFVkVp6ak6RykZyWb3gu8ckUpd6YkTlacOd3DXGJjIpD4Q6zJirizvaiAjSSHlOsA+6sNh2A==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "lodash": "^4.17.15"
      },
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/cliui": {
      "version": "8.0.1",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
      "integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
      "license": "ISC",
      "optional": true,
      "dependencies": {
        "string-width": "^4.2.0",
        "strip-ansi": "^6.0.1",
        "wrap-ansi": "^7.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/duplexify": {
      "version": "4.1.3",
      "resolved": "https://registry.npmjs.org/duplexify/-/duplexify-4.1.3.tgz",
      "integrity": "sha512-M3BmBhwJRZsSx38lZyhE53Csddgzl5R7xGJNk7CVddZD6CcmwMCH8J+7AprIrQKH7TonKxaCjcv27Qmf+sQ+oA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "end-of-stream": "^1.4.1",
        "inherits": "^2.0.3",
        "readable-stream": "^3.1.1",
        "stream-shift": "^1.0.2"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/ecdsa-sig-formatter": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/ecdsa-sig-formatter/-/ecdsa-sig-formatter-1.0.11.tgz",
      "integrity": "sha512-nagl3RYrbNv6kQkeJIpt6NJZy8twLB/2vtz6yN9Z4vRKHN4/QZJIEbqohALSgwKdnksuY3k5Addp5lg8sVoVcQ==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/end-of-stream": {
      "version": "1.4.5",
      "resolved": "https://registry.npmjs.org/end-of-stream/-/end-of-stream-1.4.5.tgz",
      "integrity": "sha512-ooEGc6HP26xXq/N+GCGOT0JKCLDGrq2bQUZrQ7gyrJiZANJ/8YDTxTpQBXGMn+WbIQXNVpyWymm7KYVICQnyOg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "once": "^1.4.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/escape-string-regexp": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-2.0.0.tgz",
      "integrity": "sha512-UpzcLCXolUWcNu5HtVMHYdXJjArjsF9C0aNnquZYY4uW/Vu0miy5YoWvbV345HauVvcAUnpRuhMMcqTcGOY2+w==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/escodegen": {
      "version": "1.14.3",
      "resolved": "https://registry.npmjs.org/escodegen/-/escodegen-1.14.3.tgz",
      "integrity": "sha512-qFcX0XJkdg+PB3xjZZG/wKSuT1PnQWx57+TVSjIMmILd2yC/6ByYElPwJnslDsuWuSAp4AwJGumarAAmJch5Kw==",
      "license": "BSD-2-Clause",
      "optional": true,
      "dependencies": {
        "esprima": "^4.0.1",
        "estraverse": "^4.2.0",
        "esutils": "^2.0.2",
        "optionator": "^0.8.1"
      },
      "bin": {
        "escodegen": "bin/escodegen.js",
        "esgenerate": "bin/esgenerate.js"
      },
      "engines": {
        "node": ">=4.0"
      },
      "optionalDependencies": {
        "source-map": "~0.6.1"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/escodegen/node_modules/estraverse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-4.3.0.tgz",
      "integrity": "sha512-39nnKffWz8xN1BU/2c79n9nB9HDzo0niYUqx6xyqUnyoAnQyyWpOTdZEeiCch8BBu515t4wp9ZmgVfVhn9EBpw==",
      "license": "BSD-2-Clause",
      "optional": true,
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "license": "Apache-2.0",
      "optional": true,
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/espree": {
      "version": "9.6.1",
      "resolved": "https://registry.npmjs.org/espree/-/espree-9.6.1.tgz",
      "integrity": "sha512-oruZaFkjorTpF32kDSI5/75ViwGeZginGGy2NoOSg3Q9bnwlnmDm4HLnkl0RE3n+njDXR037aY1+x58Z/zFdwQ==",
      "license": "BSD-2-Clause",
      "optional": true,
      "dependencies": {
        "acorn": "^8.9.0",
        "acorn-jsx": "^5.3.2",
        "eslint-visitor-keys": "^3.4.1"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/esprima": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
      "integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A==",
      "license": "BSD-2-Clause",
      "optional": true,
      "bin": {
        "esparse": "bin/esparse.js",
        "esvalidate": "bin/esvalidate.js"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "license": "BSD-2-Clause",
      "optional": true,
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "license": "BSD-2-Clause",
      "optional": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/event-target-shim": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/event-target-shim/-/event-target-shim-5.0.1.tgz",
      "integrity": "sha512-i/2XbnSz/uxRCU6+NdVJgKWDTM427+MqYbkQzD321DuCQJUqOuJKIA0IM2+W2xtYHdKOmZ4dR6fExsd4SXL+WQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/extend": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/extend/-/extend-3.0.2.tgz",
      "integrity": "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/fast-text-encoding": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/fast-text-encoding/-/fast-text-encoding-1.0.6.tgz",
      "integrity": "sha512-VhXlQgj9ioXCqGstD37E/HBeqEGV/qOD/kmbVG8h5xKBYvM1L3lR1Zn4555cQ8GkYbJa8aJSipLPndE1k6zK2w==",
      "license": "Apache-2.0",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/fs.realpath": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
      "integrity": "sha512-OO0pH2lK6a0hZnAdau5ItzHPI6pUlvI7jMVnxUQRtw4owF2wk8lOSabtGDCTP4Ggrg2MbGnWO9X8K1t4+fGMDw==",
      "license": "ISC",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/functional-red-black-tree": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/functional-red-black-tree/-/functional-red-black-tree-1.0.1.tgz",
      "integrity": "sha512-dsKNQNdj6xA3T+QlADDA7mOSlX0qiMINjn0cgr+eGHGsbSHzTabcIogz2+p/iqP1Xs6EP/sS2SbqH+brGTbq0g==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/gaxios": {
      "version": "5.1.3",
      "resolved": "https://registry.npmjs.org/gaxios/-/gaxios-5.1.3.tgz",
      "integrity": "sha512-95hVgBRgEIRQQQHIbnxBXeHbW4TqFk4ZDJW7wmVtvYar72FdhRIo1UGOLS2eRAKCPEdPBWu+M7+A33D9CdX9rA==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "extend": "^3.0.2",
        "https-proxy-agent": "^5.0.0",
        "is-stream": "^2.0.0",
        "node-fetch": "^2.6.9"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/gcp-metadata": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/gcp-metadata/-/gcp-metadata-5.3.0.tgz",
      "integrity": "sha512-FNTkdNEnBdlqF2oatizolQqNANMrcqJt6AAYt99B3y1aLLC8Hc5IOBb+ZnnzllodEEf6xMBp6wRcBbc16fa65w==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "gaxios": "^5.0.0",
        "json-bigint": "^1.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/get-caller-file": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
      "license": "ISC",
      "optional": true,
      "engines": {
        "node": "6.* || 8.* || >= 10.*"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/glob": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/glob/-/glob-8.1.0.tgz",
      "integrity": "sha512-r8hpEjiQEYlF2QU0df3dS+nxxSIreXQS1qRhMJM0Q5NDdR386C7jb7Hwwod8Fgiuex+k0GFjgft18yvxm5XoCQ==",
      "deprecated": "Glob versions prior to v9 are no longer supported",
      "license": "ISC",
      "optional": true,
      "dependencies": {
        "fs.realpath": "^1.0.0",
        "inflight": "^1.0.4",
        "inherits": "2",
        "minimatch": "^5.0.1",
        "once": "^1.3.0"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/google-auth-library": {
      "version": "8.9.0",
      "resolved": "https://registry.npmjs.org/google-auth-library/-/google-auth-library-8.9.0.tgz",
      "integrity": "sha512-f7aQCJODJFmYWN6PeNKzgvy9LI2tYmXnzpNDHEjG5sDNPgGb2FXQyTBnXeSH+PAtpKESFD+LmHw3Ox3mN7e1Fg==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "arrify": "^2.0.0",
        "base64-js": "^1.3.0",
        "ecdsa-sig-formatter": "^1.0.11",
        "fast-text-encoding": "^1.0.0",
        "gaxios": "^5.0.0",
        "gcp-metadata": "^5.3.0",
        "gtoken": "^6.1.0",
        "jws": "^4.0.0",
        "lru-cache": "^6.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/google-gax": {
      "version": "3.6.1",
      "resolved": "https://registry.npmjs.org/google-gax/-/google-gax-3.6.1.tgz",
      "integrity": "sha512-g/lcUjGcB6DSw2HxgEmCDOrI/CByOwqRvsuUvNalHUK2iPPPlmAIpbMbl62u0YufGMr8zgE3JL7th6dCb1Ry+w==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "@grpc/grpc-js": "~1.8.0",
        "@grpc/proto-loader": "^0.7.0",
        "@types/long": "^4.0.0",
        "@types/rimraf": "^3.0.2",
        "abort-controller": "^3.0.0",
        "duplexify": "^4.0.0",
        "fast-text-encoding": "^1.0.3",
        "google-auth-library": "^8.0.2",
        "is-stream-ended": "^0.1.4",
        "node-fetch": "^2.6.1",
        "object-hash": "^3.0.0",
        "proto3-json-serializer": "^1.0.0",
        "protobufjs": "7.2.4",
        "protobufjs-cli": "1.1.1",
        "retry-request": "^5.0.0"
      },
      "bin": {
        "compileProtos": "build/tools/compileProtos.js",
        "minifyProtoJson": "build/tools/minify.js"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/google-gax/node_modules/protobufjs-cli": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/protobufjs-cli/-/protobufjs-cli-1.1.1.tgz",
      "integrity": "sha512-VPWMgIcRNyQwWUv8OLPyGQ/0lQY/QTQAVN5fh+XzfDwsVw1FZ2L3DM/bcBf8WPiRz2tNpaov9lPZfNcmNo6LXA==",
      "license": "BSD-3-Clause",
      "optional": true,
      "dependencies": {
        "chalk": "^4.0.0",
        "escodegen": "^1.13.0",
        "espree": "^9.0.0",
        "estraverse": "^5.1.0",
        "glob": "^8.0.0",
        "jsdoc": "^4.0.0",
        "minimist": "^1.2.0",
        "semver": "^7.1.2",
        "tmp": "^0.2.1",
        "uglify-js": "^3.7.7"
      },
      "bin": {
        "pbjs": "bin/pbjs",
        "pbts": "bin/pbts"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "protobufjs": "^7.0.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/google-p12-pem": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/google-p12-pem/-/google-p12-pem-4.0.1.tgz",
      "integrity": "sha512-WPkN4yGtz05WZ5EhtlxNDWPhC4JIic6G8ePitwUWy4l+XPVYec+a0j0Ts47PDtW59y3RwAhUd9/h9ZZ63px6RQ==",
      "deprecated": "Package is no longer maintained",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "node-forge": "^1.3.1"
      },
      "bin": {
        "gp12-pem": "build/src/bin/gp12-pem.js"
      },
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "license": "ISC",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/gtoken": {
      "version": "6.1.2",
      "resolved": "https://registry.npmjs.org/gtoken/-/gtoken-6.1.2.tgz",
      "integrity": "sha512-4ccGpzz7YAr7lxrT2neugmXQ3hP9ho2gcaityLVkiUecAiwiy60Ii8gRbZeOsXV19fYaRjgBSshs8kXw+NKCPQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "gaxios": "^5.0.1",
        "google-p12-pem": "^4.0.0",
        "jws": "^4.0.0"
      },
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/https-proxy-agent": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-5.0.1.tgz",
      "integrity": "sha512-dFcAjpTQFgoLMzC2VwU+C/CbS7uRL0lWmxDITmqm7C+7F0Odmj6s9l6alZc6AELXhrnggM2CeWSXHGOdX2YtwA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "agent-base": "6",
        "debug": "4"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/inflight": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
      "integrity": "sha512-k92I/b08q4wvFscXCLvqfsHCrjrF7yiXsQuIVvVE7N82W3+aqpzuUdBbfhWcy/FZR3/4IgflMgKLOsvPDrGCJA==",
      "deprecated": "This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.",
      "license": "ISC",
      "optional": true,
      "dependencies": {
        "once": "^1.3.0",
        "wrappy": "1"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/is-stream": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/is-stream/-/is-stream-2.0.1.tgz",
      "integrity": "sha512-hFoiJiTl63nn+kstHGBtewWSKnQLpyb155KHheA1l39uvtO9nWIop1p3udqPcUd/xbF1VLMO4n7OI6p7RbngDg==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/is-stream-ended": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/is-stream-ended/-/is-stream-ended-0.1.4.tgz",
      "integrity": "sha512-xj0XPvmr7bQFTvirqnFr50o0hQIh6ZItDqloxt5aJrR4NQsYeSsyFQERYGCAzfindAcnKjINnwEEgLx4IqVzQw==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/js2xmlparser": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/js2xmlparser/-/js2xmlparser-4.0.2.tgz",
      "integrity": "sha512-6n4D8gLlLf1n5mNLQPRfViYzu9RATblzPEtm1SthMX1Pjao0r9YI9nw7ZIfRxQMERS87mcswrg+r/OYrPRX6jA==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "xmlcreate": "^2.0.4"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/jsdoc": {
      "version": "4.0.5",
      "resolved": "https://registry.npmjs.org/jsdoc/-/jsdoc-4.0.5.tgz",
      "integrity": "sha512-P4C6MWP9yIlMiK8nwoZvxN84vb6MsnXcHuy7XzVOvQoCizWX5JFCBsWIIWKXBltpoRZXddUOVQmCTOZt9yDj9g==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "@babel/parser": "^7.20.15",
        "@jsdoc/salty": "^0.2.1",
        "@types/markdown-it": "^14.1.1",
        "bluebird": "^3.7.2",
        "catharsis": "^0.9.0",
        "escape-string-regexp": "^2.0.0",
        "js2xmlparser": "^4.0.2",
        "klaw": "^3.0.0",
        "markdown-it": "^14.1.0",
        "markdown-it-anchor": "^8.6.7",
        "marked": "^4.0.10",
        "mkdirp": "^1.0.4",
        "requizzle": "^0.2.3",
        "strip-json-comments": "^3.1.0",
        "underscore": "~1.13.2"
      },
      "bin": {
        "jsdoc": "jsdoc.js"
      },
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/json-bigint": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/json-bigint/-/json-bigint-1.0.0.tgz",
      "integrity": "sha512-SiPv/8VpZuWbvLSMtTDU8hEfrZWg/mH/nV/b4o0CYbSxu1UIQPLdwKOCIyLQX+VIPO5vrLX3i8qtqFyhdPSUSQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "bignumber.js": "^9.0.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/jwa": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/jwa/-/jwa-2.0.1.tgz",
      "integrity": "sha512-hRF04fqJIP8Abbkq5NKGN0Bbr3JxlQ+qhZufXVr0DvujKy93ZCbXZMHDL4EOtodSbCWxOqR8MS1tXA5hwqCXDg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "buffer-equal-constant-time": "^1.0.1",
        "ecdsa-sig-formatter": "1.0.11",
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/jws": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/jws/-/jws-4.0.1.tgz",
      "integrity": "sha512-EKI/M/yqPncGUUh44xz0PxSidXFr/+r0pA70+gIYhjv+et7yxM+s29Y+VGDkovRofQem0fs7Uvf4+YmAdyRduA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "jwa": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/klaw": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/klaw/-/klaw-3.0.0.tgz",
      "integrity": "sha512-0Fo5oir+O9jnXu5EefYbVK+mHMBeEVEy2cmctR1O1NECcCkPRreJKrS6Qt/j3KC2C148Dfo9i3pCmCMsdqGr0g==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "graceful-fs": "^4.1.9"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/levn": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.3.0.tgz",
      "integrity": "sha512-0OO4y2iOHix2W6ujICbKIaEQXvFQHue65vUG3pb5EUomzPI90z9hsA1VsO/dbIIpC53J8gxM9Q4Oho0jrCM/yA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "prelude-ls": "~1.1.2",
        "type-check": "~0.3.2"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/lodash": {
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/lodash.camelcase": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/lodash.camelcase/-/lodash.camelcase-4.3.0.tgz",
      "integrity": "sha512-TwuEnCnxbc3rAvhf/LbG7tJUDzhqXyFnv3dtzLOPgCG/hODL7WFnsbwktkD7yUV0RrreP/l1PALq/YSg6VvjlA==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/long": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/long/-/long-5.3.2.tgz",
      "integrity": "sha512-mNAgZ1GmyNhD7AuqnTG3/VQ26o760+ZYBPKjPvugO8+nLbYfX6TVpJPseBvopbdY+qpZ/lKUnmEc1LeZYS3QAA==",
      "license": "Apache-2.0",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/lru-cache": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
      "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
      "license": "ISC",
      "optional": true,
      "dependencies": {
        "yallist": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/markdown-it-anchor": {
      "version": "8.6.7",
      "resolved": "https://registry.npmjs.org/markdown-it-anchor/-/markdown-it-anchor-8.6.7.tgz",
      "integrity": "sha512-FlCHFwNnutLgVTflOYHPW2pPcl2AACqVzExlkGQNsi4CJgqOHN7YTgDd4LuhgN1BFO3TS0vLAruV1Td6dwWPJA==",
      "license": "Unlicense",
      "optional": true,
      "peerDependencies": {
        "@types/markdown-it": "*",
        "markdown-it": "*"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/marked": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/marked/-/marked-4.3.0.tgz",
      "integrity": "sha512-PRsaiG84bK+AMvxziE/lCFss8juXjNaWzVbN5tXAm4XjeaS9NAHhop+PjQxz2A9h8Q4M/xGmzP8vqNwy6JeK0A==",
      "license": "MIT",
      "optional": true,
      "bin": {
        "marked": "bin/marked.js"
      },
      "engines": {
        "node": ">= 12"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/minimatch": {
      "version": "5.1.6",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-5.1.6.tgz",
      "integrity": "sha512-lKwV/1brpG6mBUFHtb7NUmtABCb2WZZmm2wNiOA5hAb8VdCS4B3dtMWyvcoViccwAW/COERjXLt0zP1zXUN26g==",
      "license": "ISC",
      "optional": true,
      "dependencies": {
        "brace-expansion": "^2.0.1"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/minimist": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
      "integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
      "license": "MIT",
      "optional": true,
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/mkdirp": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-1.0.4.tgz",
      "integrity": "sha512-vVqVZQyf3WLx2Shd0qJ9xuvqgAyKPLAiqITEtqW0oIUjzo3PePDd6fW9iFz30ef7Ysp/oiWqbhszeGWW2T6Gzw==",
      "license": "MIT",
      "optional": true,
      "bin": {
        "mkdirp": "bin/cmd.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/node-fetch": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-2.7.0.tgz",
      "integrity": "sha512-c4FRfUm/dbcWZ7U+1Wq0AwCyFL+3nt2bEw05wfxSz+DWpWsitgmSgYmy2dQdWyKC1694ELPqMs/YzUSNozLt8A==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "whatwg-url": "^5.0.0"
      },
      "engines": {
        "node": "4.x || >=6.0.0"
      },
      "peerDependencies": {
        "encoding": "^0.1.0"
      },
      "peerDependenciesMeta": {
        "encoding": {
          "optional": true
        }
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
      "license": "ISC",
      "optional": true,
      "dependencies": {
        "wrappy": "1"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/optionator": {
      "version": "0.8.3",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.8.3.tgz",
      "integrity": "sha512-+IW9pACdk3XWmmTXG8m3upGUJst5XRGzxMRjXzAuJ1XnIFNvfhjjIuYkDvysnPQ7qzqVzLt78BCruntqRhWQbA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "deep-is": "~0.1.3",
        "fast-levenshtein": "~2.0.6",
        "levn": "~0.3.0",
        "prelude-ls": "~1.1.2",
        "type-check": "~0.3.2",
        "word-wrap": "~1.2.3"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/prelude-ls": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.1.2.tgz",
      "integrity": "sha512-ESF23V4SKG6lVSGZgYNpbsiaAkdab6ZgOxe52p7+Kid3W3u3bxR4Vfd/o21dmN7jSt0IwgZ4v5MUd26FEtXE9w==",
      "optional": true,
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/proto3-json-serializer": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/proto3-json-serializer/-/proto3-json-serializer-1.1.1.tgz",
      "integrity": "sha512-AwAuY4g9nxx0u52DnSMkqqgyLHaW/XaPLtaAo3y/ZCfeaQB/g4YDH4kb8Wc/mWzWvu0YjOznVnfn373MVZZrgw==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "protobufjs": "^7.0.0"
      },
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/readable-stream": {
      "version": "3.6.2",
      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.2.tgz",
      "integrity": "sha512-9u/sniCrY3D5WdsERHzHE4G2YCXqoG5FTHUiCC4SIbr6XcLZBY05ya9EKjYek9O5xOAwjGq+1JdGBAS7Q9ScoA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "inherits": "^2.0.3",
        "string_decoder": "^1.1.1",
        "util-deprecate": "^1.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/requizzle": {
      "version": "0.2.4",
      "resolved": "https://registry.npmjs.org/requizzle/-/requizzle-0.2.4.tgz",
      "integrity": "sha512-JRrFk1D4OQ4SqovXOgdav+K8EAhSB/LJZqCz8tbX0KObcdeM15Ss59ozWMBWmmINMagCwmqn4ZNryUGpBsl6Jw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "lodash": "^4.17.21"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/retry-request": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/retry-request/-/retry-request-5.0.2.tgz",
      "integrity": "sha512-wfI3pk7EE80lCIXprqh7ym48IHYdwmAAzESdbU8Q9l7pnRCk9LEhpbOTNKjz6FARLm/Bl5m+4F0ABxOkYUujSQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "debug": "^4.1.1",
        "extend": "^3.0.2"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/semver": {
      "version": "7.7.3",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.3.tgz",
      "integrity": "sha512-SdsKMrI9TdgjdweUSR9MweHA4EJ8YxHn8DFaDisvhVlUOe4BF1tLD7GAj0lIqWVl+dPb/rExr0Btby5loQm20Q==",
      "license": "ISC",
      "optional": true,
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/source-map": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
      "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
      "license": "BSD-3-Clause",
      "optional": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/stream-shift": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/stream-shift/-/stream-shift-1.0.3.tgz",
      "integrity": "sha512-76ORR0DO1o1hlKwTbi/DM3EXWGf3ZJYO8cXX5RJwnul2DEg2oyoZyjLNoQM8WsvZiFKCRfC1O0J7iCvie3RZmQ==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/string_decoder": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.3.0.tgz",
      "integrity": "sha512-hkRX8U1WjJFd8LsDJ2yQ/wWWxaopEsABU1XfkM8A+j0+85JAGppt16cr1Whg6KIbb4okU6Mql6BOj+uup/wKeA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "safe-buffer": "~5.2.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/strip-json-comments": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
      "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/tmp": {
      "version": "0.2.5",
      "resolved": "https://registry.npmjs.org/tmp/-/tmp-0.2.5.tgz",
      "integrity": "sha512-voyz6MApa1rQGUxT3E+BK7/ROe8itEx7vD8/HEvt4xwXucvQ5G5oeEiHkmHZJuBO21RpOf+YYm9MOivj709jow==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=14.14"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/tr46": {
      "version": "0.0.3",
      "resolved": "https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz",
      "integrity": "sha512-N3WMsuqV66lT30CrXNbEjx4GEwlow3v6rr4mCcv6prnfwhS01rkgyFdjPNBYd9br7LpXV1+Emh01fHnq2Gdgrw==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/type-check": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.3.2.tgz",
      "integrity": "sha512-ZCmOJdvOWDBYJlzAoFkC+Q0+bUyEOS1ltgp1MGU03fqHG+dbi9tBFU2Rd9QKiDZFAYrhPh2JUf7rZRIuHRKtOg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "prelude-ls": "~1.1.2"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/uglify-js": {
      "version": "3.19.3",
      "resolved": "https://registry.npmjs.org/uglify-js/-/uglify-js-3.19.3.tgz",
      "integrity": "sha512-v3Xu+yuwBXisp6QYTcH4UbH+xYJXqnq2m/LtQVWKWzYc1iehYnLixoQDN9FH6/j9/oybfd6W9Ghwkl8+UMKTKQ==",
      "license": "BSD-2-Clause",
      "optional": true,
      "bin": {
        "uglifyjs": "bin/uglifyjs"
      },
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/underscore": {
      "version": "1.13.7",
      "resolved": "https://registry.npmjs.org/underscore/-/underscore-1.13.7.tgz",
      "integrity": "sha512-GMXzWtsc57XAtguZgaQViUOzs0KTkk8ojr3/xAxXLITqf/3EMwxC0inyETfDFjH/Krbhuep0HNbbjI9i/q3F3g==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/webidl-conversions": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-3.0.1.tgz",
      "integrity": "sha512-2JAn3z8AR6rjK8Sm8orRC0h/bcl/DqL7tRPdGZ4I1CjdF+EaMLmYxBHyXuKL849eucPFhvBoxMsflfOb8kxaeQ==",
      "license": "BSD-2-Clause",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/whatwg-url": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-5.0.0.tgz",
      "integrity": "sha512-saE57nupxk6v3HY35+jzBwYa0rKSy0XR8JSxZPwgLr7ys0IBzhGviA1/TUGJLmSVqs8pb9AnvICXEuOHLprYTw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tr46": "~0.0.3",
        "webidl-conversions": "^3.0.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/word-wrap": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
      "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/wrap-ansi": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
      "license": "ISC",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/xmlcreate": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/xmlcreate/-/xmlcreate-2.0.4.tgz",
      "integrity": "sha512-nquOebG4sngPmGPICTS5EnxqhKbCmz5Ox5hsszI2T6U5qdrJizBc+0ilYSEjTSzU0yZcmvppztXe/5Al5fUwdg==",
      "license": "Apache-2.0",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/y18n": {
      "version": "5.0.8",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
      "integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
      "license": "ISC",
      "optional": true,
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/yallist": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
      "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
      "license": "ISC",
      "optional": true
    },
    "node_modules/@google-cloud/firestore/node_modules/yargs": {
      "version": "17.7.2",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.2.tgz",
      "integrity": "sha512-7dSzzRQ++CKnNI/krKnYRV7JKKPUXMEh61soaHKg9mrWEhzFWhFnxPxGl+69cD1Ou63C13NUPCnmIcrvqCuM6w==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "cliui": "^8.0.1",
        "escalade": "^3.1.1",
        "get-caller-file": "^2.0.5",
        "require-directory": "^2.1.1",
        "string-width": "^4.2.3",
        "y18n": "^5.0.5",
        "yargs-parser": "^21.1.1"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@google-cloud/firestore/node_modules/yargs-parser": {
      "version": "21.1.1",
      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
      "integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
      "license": "ISC",
      "optional": true,
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@google-cloud/storage": {
      "version": "6.12.0",
      "resolved": "https://registry.npmjs.org/@google-cloud/storage/-/storage-6.12.0.tgz",
      "integrity": "sha512-78nNAY7iiZ4O/BouWMWTD/oSF2YtYgYB3GZirn0To6eBOugjXVoK+GXgUXOl+HlqbAOyHxAVXOlsj3snfbQ1dw==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "@google-cloud/paginator": "^3.0.7",
        "@google-cloud/projectify": "^3.0.0",
        "@google-cloud/promisify": "^3.0.0",
        "abort-controller": "^3.0.0",
        "async-retry": "^1.3.3",
        "compressible": "^2.0.12",
        "duplexify": "^4.0.0",
        "ent": "^2.2.0",
        "extend": "^3.0.2",
        "fast-xml-parser": "^4.2.2",
        "gaxios": "^5.0.0",
        "google-auth-library": "^8.0.1",
        "mime": "^3.0.0",
        "mime-types": "^2.0.8",
        "p-limit": "^3.0.1",
        "retry-request": "^5.0.0",
        "teeny-request": "^8.0.0",
        "uuid": "^8.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/@google-cloud/paginator": {
      "version": "3.0.7",
      "resolved": "https://registry.npmjs.org/@google-cloud/paginator/-/paginator-3.0.7.tgz",
      "integrity": "sha512-jJNutk0arIQhmpUUQJPJErsojqo834KcyB6X7a1mxuic8i1tKXxde8E69IZxNZawRIlZdIK2QY4WALvlK5MzYQ==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "arrify": "^2.0.0",
        "extend": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/@google-cloud/projectify": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/@google-cloud/projectify/-/projectify-3.0.0.tgz",
      "integrity": "sha512-HRkZsNmjScY6Li8/kb70wjGlDDyLkVk3KvoEo9uIoxSjYLJasGiCch9+PqRVDOCGUFvEIqyogl+BeqILL4OJHA==",
      "license": "Apache-2.0",
      "optional": true,
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/@google-cloud/promisify": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/@google-cloud/promisify/-/promisify-3.0.1.tgz",
      "integrity": "sha512-z1CjRjtQyBOYL+5Qr9DdYIfrdLBe746jRTYfaYU6MeXkqp7UfYs/jX16lFFVzZ7PGEJvqZNqYUEtb1mvDww4pA==",
      "license": "Apache-2.0",
      "optional": true,
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/@tootallnate/once": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/@tootallnate/once/-/once-2.0.0.tgz",
      "integrity": "sha512-XCuKFP5PS55gnMVu3dty8KPatLqUoy/ZYzDzAGCQ8JNFCkLXzmI7vNHCR+XpbZaMWQK/vQubr7PkYq8g470J/A==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/abort-controller": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/abort-controller/-/abort-controller-3.0.0.tgz",
      "integrity": "sha512-h8lQ8tacZYnR3vNQTgibj+tODHI5/+l06Au2Pcriv/Gmet0eaj4TwWH41sO9wnHDiQsEj19q0drzdWdeAHtweg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "event-target-shim": "^5.0.0"
      },
      "engines": {
        "node": ">=6.5"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/agent-base": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-6.0.2.tgz",
      "integrity": "sha512-RZNwNclF7+MS/8bDg70amg32dyeZGZxiDuQmZxKLAlQjr3jGyLx+4Kkk58UO7D2QdgFIQCovuSuZESne6RG6XQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "debug": "4"
      },
      "engines": {
        "node": ">= 6.0.0"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/arrify": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/arrify/-/arrify-2.0.1.tgz",
      "integrity": "sha512-3duEwti880xqi4eAMN8AyR4a0ByT90zoYdLlevfrvU43vb0YZwZVfxOgxWrLXXXpyugL0hNZc9G6BiB5B3nUug==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/async-retry": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/async-retry/-/async-retry-1.3.3.tgz",
      "integrity": "sha512-wfr/jstw9xNi/0teMHrRW7dsz3Lt5ARhYNZ2ewpadnhaIp5mbALhOAP+EAdsC7t4Z6wqsDVv9+W6gm1Dk9mEyw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "retry": "0.13.1"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/base64-js": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.5.1.tgz",
      "integrity": "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/storage/node_modules/bignumber.js": {
      "version": "9.3.1",
      "resolved": "https://registry.npmjs.org/bignumber.js/-/bignumber.js-9.3.1.tgz",
      "integrity": "sha512-Ko0uX15oIUS7wJ3Rb30Fs6SkVbLmPBAKdlm7q9+ak9bbIeFf0MwuBsQV6z7+X768/cHsfg+WlysDWJcmthjsjQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": "*"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/buffer-equal-constant-time": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/buffer-equal-constant-time/-/buffer-equal-constant-time-1.0.1.tgz",
      "integrity": "sha512-zRpUiDwd/xk6ADqPMATG8vc9VPrkck7T07OIx0gnjmJAnHnTVXNQG3vfvWNuiZIkwu9KrKdA1iJKfsfTVxE6NA==",
      "license": "BSD-3-Clause",
      "optional": true
    },
    "node_modules/@google-cloud/storage/node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/compressible": {
      "version": "2.0.18",
      "resolved": "https://registry.npmjs.org/compressible/-/compressible-2.0.18.tgz",
      "integrity": "sha512-AF3r7P5dWxL8MxyITRMlORQNaOA2IkAFaTr4k7BUumjPtRpGDTZpl0Pb1XCO6JeDCBdp126Cgs9sMxqSjgYyRg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "mime-db": ">= 1.43.0 < 2"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/@google-cloud/storage/node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/duplexify": {
      "version": "4.1.3",
      "resolved": "https://registry.npmjs.org/duplexify/-/duplexify-4.1.3.tgz",
      "integrity": "sha512-M3BmBhwJRZsSx38lZyhE53Csddgzl5R7xGJNk7CVddZD6CcmwMCH8J+7AprIrQKH7TonKxaCjcv27Qmf+sQ+oA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "end-of-stream": "^1.4.1",
        "inherits": "^2.0.3",
        "readable-stream": "^3.1.1",
        "stream-shift": "^1.0.2"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/ecdsa-sig-formatter": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/ecdsa-sig-formatter/-/ecdsa-sig-formatter-1.0.11.tgz",
      "integrity": "sha512-nagl3RYrbNv6kQkeJIpt6NJZy8twLB/2vtz6yN9Z4vRKHN4/QZJIEbqohALSgwKdnksuY3k5Addp5lg8sVoVcQ==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/end-of-stream": {
      "version": "1.4.5",
      "resolved": "https://registry.npmjs.org/end-of-stream/-/end-of-stream-1.4.5.tgz",
      "integrity": "sha512-ooEGc6HP26xXq/N+GCGOT0JKCLDGrq2bQUZrQ7gyrJiZANJ/8YDTxTpQBXGMn+WbIQXNVpyWymm7KYVICQnyOg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "once": "^1.4.0"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/ent": {
      "version": "2.2.2",
      "resolved": "https://registry.npmjs.org/ent/-/ent-2.2.2.tgz",
      "integrity": "sha512-kKvD1tO6BM+oK9HzCPpUdRb4vKFQY/FPTFmurMvh6LlN68VMrdj77w8yp51/kDbpkFOS9J8w5W6zIzgM2H8/hw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "punycode": "^1.4.1",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/es-object-atoms": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/event-target-shim": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/event-target-shim/-/event-target-shim-5.0.1.tgz",
      "integrity": "sha512-i/2XbnSz/uxRCU6+NdVJgKWDTM427+MqYbkQzD321DuCQJUqOuJKIA0IM2+W2xtYHdKOmZ4dR6fExsd4SXL+WQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/extend": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/extend/-/extend-3.0.2.tgz",
      "integrity": "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/storage/node_modules/fast-text-encoding": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/fast-text-encoding/-/fast-text-encoding-1.0.6.tgz",
      "integrity": "sha512-VhXlQgj9ioXCqGstD37E/HBeqEGV/qOD/kmbVG8h5xKBYvM1L3lR1Zn4555cQ8GkYbJa8aJSipLPndE1k6zK2w==",
      "license": "Apache-2.0",
      "optional": true
    },
    "node_modules/@google-cloud/storage/node_modules/fast-xml-parser": {
      "version": "4.5.3",
      "resolved": "https://registry.npmjs.org/fast-xml-parser/-/fast-xml-parser-4.5.3.tgz",
      "integrity": "sha512-RKihhV+SHsIUGXObeVy9AXiBbFwkVk7Syp8XgwN5U3JV416+Gwp/GO9i0JYKmikykgz/UHRrrV4ROuZEo/T0ig==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/NaturalIntelligence"
        }
      ],
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "strnum": "^1.1.1"
      },
      "bin": {
        "fxparser": "src/cli/cli.js"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "optional": true,
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/gaxios": {
      "version": "5.1.3",
      "resolved": "https://registry.npmjs.org/gaxios/-/gaxios-5.1.3.tgz",
      "integrity": "sha512-95hVgBRgEIRQQQHIbnxBXeHbW4TqFk4ZDJW7wmVtvYar72FdhRIo1UGOLS2eRAKCPEdPBWu+M7+A33D9CdX9rA==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "extend": "^3.0.2",
        "https-proxy-agent": "^5.0.0",
        "is-stream": "^2.0.0",
        "node-fetch": "^2.6.9"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/gcp-metadata": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/gcp-metadata/-/gcp-metadata-5.3.0.tgz",
      "integrity": "sha512-FNTkdNEnBdlqF2oatizolQqNANMrcqJt6AAYt99B3y1aLLC8Hc5IOBb+ZnnzllodEEf6xMBp6wRcBbc16fa65w==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "gaxios": "^5.0.0",
        "json-bigint": "^1.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/google-auth-library": {
      "version": "8.9.0",
      "resolved": "https://registry.npmjs.org/google-auth-library/-/google-auth-library-8.9.0.tgz",
      "integrity": "sha512-f7aQCJODJFmYWN6PeNKzgvy9LI2tYmXnzpNDHEjG5sDNPgGb2FXQyTBnXeSH+PAtpKESFD+LmHw3Ox3mN7e1Fg==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "arrify": "^2.0.0",
        "base64-js": "^1.3.0",
        "ecdsa-sig-formatter": "^1.0.11",
        "fast-text-encoding": "^1.0.0",
        "gaxios": "^5.0.0",
        "gcp-metadata": "^5.3.0",
        "gtoken": "^6.1.0",
        "jws": "^4.0.0",
        "lru-cache": "^6.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/google-p12-pem": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/google-p12-pem/-/google-p12-pem-4.0.1.tgz",
      "integrity": "sha512-WPkN4yGtz05WZ5EhtlxNDWPhC4JIic6G8ePitwUWy4l+XPVYec+a0j0Ts47PDtW59y3RwAhUd9/h9ZZ63px6RQ==",
      "deprecated": "Package is no longer maintained",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "node-forge": "^1.3.1"
      },
      "bin": {
        "gp12-pem": "build/src/bin/gp12-pem.js"
      },
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/gtoken": {
      "version": "6.1.2",
      "resolved": "https://registry.npmjs.org/gtoken/-/gtoken-6.1.2.tgz",
      "integrity": "sha512-4ccGpzz7YAr7lxrT2neugmXQ3hP9ho2gcaityLVkiUecAiwiy60Ii8gRbZeOsXV19fYaRjgBSshs8kXw+NKCPQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "gaxios": "^5.0.1",
        "google-p12-pem": "^4.0.0",
        "jws": "^4.0.0"
      },
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/has-tostringtag": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.2.tgz",
      "integrity": "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "has-symbols": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/http-proxy-agent": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/http-proxy-agent/-/http-proxy-agent-5.0.0.tgz",
      "integrity": "sha512-n2hY8YdoRE1i7r6M0w9DIw5GgZN0G25P8zLCRQ8rjXtTU3vsNFBI/vWK/UIeE6g5MUUz6avwAPXmL6Fy9D/90w==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@tootallnate/once": "2",
        "agent-base": "6",
        "debug": "4"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/https-proxy-agent": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-5.0.1.tgz",
      "integrity": "sha512-dFcAjpTQFgoLMzC2VwU+C/CbS7uRL0lWmxDITmqm7C+7F0Odmj6s9l6alZc6AELXhrnggM2CeWSXHGOdX2YtwA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "agent-base": "6",
        "debug": "4"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC",
      "optional": true
    },
    "node_modules/@google-cloud/storage/node_modules/is-regex": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.2.1.tgz",
      "integrity": "sha512-MjYsKHO5O7mCsmRGxWcLWheFqN9DJ/2TmngvjKXihe6efViPqc274+Fx/4fYj/r03+ESvBdTXK0V6tA3rgez1g==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "call-bound": "^1.0.2",
        "gopd": "^1.2.0",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/is-stream": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/is-stream/-/is-stream-2.0.1.tgz",
      "integrity": "sha512-hFoiJiTl63nn+kstHGBtewWSKnQLpyb155KHheA1l39uvtO9nWIop1p3udqPcUd/xbF1VLMO4n7OI6p7RbngDg==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/json-bigint": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/json-bigint/-/json-bigint-1.0.0.tgz",
      "integrity": "sha512-SiPv/8VpZuWbvLSMtTDU8hEfrZWg/mH/nV/b4o0CYbSxu1UIQPLdwKOCIyLQX+VIPO5vrLX3i8qtqFyhdPSUSQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "bignumber.js": "^9.0.0"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/jwa": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/jwa/-/jwa-2.0.1.tgz",
      "integrity": "sha512-hRF04fqJIP8Abbkq5NKGN0Bbr3JxlQ+qhZufXVr0DvujKy93ZCbXZMHDL4EOtodSbCWxOqR8MS1tXA5hwqCXDg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "buffer-equal-constant-time": "^1.0.1",
        "ecdsa-sig-formatter": "1.0.11",
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/jws": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/jws/-/jws-4.0.1.tgz",
      "integrity": "sha512-EKI/M/yqPncGUUh44xz0PxSidXFr/+r0pA70+gIYhjv+et7yxM+s29Y+VGDkovRofQem0fs7Uvf4+YmAdyRduA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "jwa": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/lru-cache": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
      "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
      "license": "ISC",
      "optional": true,
      "dependencies": {
        "yallist": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/mime": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/mime/-/mime-3.0.0.tgz",
      "integrity": "sha512-jSCU7/VB1loIWBZe14aEYHU/+1UMEHoaO7qxCOVJOw9GgH72VAWppxNcjU+x9a2k3GSIBXNKxXQFqRvvZ7vr3A==",
      "license": "MIT",
      "optional": true,
      "bin": {
        "mime": "cli.js"
      },
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/mime-db": {
      "version": "1.54.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/mime-types/node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/storage/node_modules/node-fetch": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-2.7.0.tgz",
      "integrity": "sha512-c4FRfUm/dbcWZ7U+1Wq0AwCyFL+3nt2bEw05wfxSz+DWpWsitgmSgYmy2dQdWyKC1694ELPqMs/YzUSNozLt8A==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "whatwg-url": "^5.0.0"
      },
      "engines": {
        "node": "4.x || >=6.0.0"
      },
      "peerDependencies": {
        "encoding": "^0.1.0"
      },
      "peerDependenciesMeta": {
        "encoding": {
          "optional": true
        }
      }
    },
    "node_modules/@google-cloud/storage/node_modules/once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
      "license": "ISC",
      "optional": true,
      "dependencies": {
        "wrappy": "1"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/punycode": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-1.4.1.tgz",
      "integrity": "sha512-jmYNElW7yvO7TV33CjSmvSiE2yco3bV2czu/OzDKdMNVZQWfxCblURLhf+47syQRBntjfLdd/H0egrzIG+oaFQ==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/storage/node_modules/readable-stream": {
      "version": "3.6.2",
      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.2.tgz",
      "integrity": "sha512-9u/sniCrY3D5WdsERHzHE4G2YCXqoG5FTHUiCC4SIbr6XcLZBY05ya9EKjYek9O5xOAwjGq+1JdGBAS7Q9ScoA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "inherits": "^2.0.3",
        "string_decoder": "^1.1.1",
        "util-deprecate": "^1.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/retry": {
      "version": "0.13.1",
      "resolved": "https://registry.npmjs.org/retry/-/retry-0.13.1.tgz",
      "integrity": "sha512-XQBQ3I8W1Cge0Seh+6gjj03LbmRFWuoszgK9ooCpwYIrhhoO80pfq4cUkU5DkknwfOfFteRwlZ56PYOGYyFWdg==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/retry-request": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/retry-request/-/retry-request-5.0.2.tgz",
      "integrity": "sha512-wfI3pk7EE80lCIXprqh7ym48IHYdwmAAzESdbU8Q9l7pnRCk9LEhpbOTNKjz6FARLm/Bl5m+4F0ABxOkYUujSQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "debug": "^4.1.1",
        "extend": "^3.0.2"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/safe-regex-test": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/safe-regex-test/-/safe-regex-test-1.1.0.tgz",
      "integrity": "sha512-x/+Cz4YrimQxQccJf5mKEbIa1NzeCRNI5Ecl/ekmlYaampdNLPalVyIcCZNNH3MvmqBugV5TMYZXv0ljslUlaw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "is-regex": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/stream-events": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/stream-events/-/stream-events-1.0.5.tgz",
      "integrity": "sha512-E1GUzBSgvct8Jsb3v2X15pjzN1tYebtbLaMg+eBOUOAxgbLoSbT2NS91ckc5lJD1KfLjId+jXJRgo0qnV5Nerg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "stubs": "^3.0.0"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/stream-shift": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/stream-shift/-/stream-shift-1.0.3.tgz",
      "integrity": "sha512-76ORR0DO1o1hlKwTbi/DM3EXWGf3ZJYO8cXX5RJwnul2DEg2oyoZyjLNoQM8WsvZiFKCRfC1O0J7iCvie3RZmQ==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/storage/node_modules/string_decoder": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.3.0.tgz",
      "integrity": "sha512-hkRX8U1WjJFd8LsDJ2yQ/wWWxaopEsABU1XfkM8A+j0+85JAGppt16cr1Whg6KIbb4okU6Mql6BOj+uup/wKeA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "safe-buffer": "~5.2.0"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/strnum": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/strnum/-/strnum-1.1.2.tgz",
      "integrity": "sha512-vrN+B7DBIoTTZjnPNewwhx6cBA/H+IS7rfW68n7XxC1y7uoiGQBxaKzqucGUgavX15dJgiGztLJ8vxuEzwqBdA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/NaturalIntelligence"
        }
      ],
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/storage/node_modules/stubs": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/stubs/-/stubs-3.0.0.tgz",
      "integrity": "sha512-PdHt7hHUJKxvTCgbKX9C1V/ftOcjJQgz8BZwNfV5c4B6dcGqlpelTbJ999jBGZ2jYiPAwcX5dP6oBwVlBlUbxw==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/storage/node_modules/teeny-request": {
      "version": "8.0.3",
      "resolved": "https://registry.npmjs.org/teeny-request/-/teeny-request-8.0.3.tgz",
      "integrity": "sha512-jJZpA5He2y52yUhA7pyAGZlgQpcB+xLjcN0eUFxr9c8hP/H7uOXbBNVo/O0C/xVfJLJs680jvkFgVJEEvk9+ww==",
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "http-proxy-agent": "^5.0.0",
        "https-proxy-agent": "^5.0.0",
        "node-fetch": "^2.6.1",
        "stream-events": "^1.0.5",
        "uuid": "^9.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/teeny-request/node_modules/uuid": {
      "version": "9.0.1",
      "resolved": "https://registry.npmjs.org/uuid/-/uuid-9.0.1.tgz",
      "integrity": "sha512-b+1eJOlsR9K8HJpow9Ok3fiWOWSIcIzXodvv0rQjVoOVNpWMpxf1wZNpt4y9h10odCNrqnYp1OBzRktckBe3sA==",
      "funding": [
        "https://github.com/sponsors/broofa",
        "https://github.com/sponsors/ctavan"
      ],
      "license": "MIT",
      "optional": true,
      "bin": {
        "uuid": "dist/bin/uuid"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/tr46": {
      "version": "0.0.3",
      "resolved": "https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz",
      "integrity": "sha512-N3WMsuqV66lT30CrXNbEjx4GEwlow3v6rr4mCcv6prnfwhS01rkgyFdjPNBYd9br7LpXV1+Emh01fHnq2Gdgrw==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/storage/node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@google-cloud/storage/node_modules/uuid": {
      "version": "8.3.2",
      "resolved": "https://registry.npmjs.org/uuid/-/uuid-8.3.2.tgz",
      "integrity": "sha512-+NYs2QeMWy+GWFOEm9xnn6HCDp0l7QBD7ml8zLUmJ+93Q5NF0NocErnwkTkXVFNiX3/fpC6afS8Dhb/gz7R7eg==",
      "license": "MIT",
      "optional": true,
      "bin": {
        "uuid": "dist/bin/uuid"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/webidl-conversions": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-3.0.1.tgz",
      "integrity": "sha512-2JAn3z8AR6rjK8Sm8orRC0h/bcl/DqL7tRPdGZ4I1CjdF+EaMLmYxBHyXuKL849eucPFhvBoxMsflfOb8kxaeQ==",
      "license": "BSD-2-Clause",
      "optional": true
    },
    "node_modules/@google-cloud/storage/node_modules/whatwg-url": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-5.0.0.tgz",
      "integrity": "sha512-saE57nupxk6v3HY35+jzBwYa0rKSy0XR8JSxZPwgLr7ys0IBzhGviA1/TUGJLmSVqs8pb9AnvICXEuOHLprYTw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tr46": "~0.0.3",
        "webidl-conversions": "^3.0.0"
      }
    },
    "node_modules/@google-cloud/storage/node_modules/wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
      "license": "ISC",
      "optional": true
    },
    "node_modules/@google-cloud/storage/node_modules/yallist": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
      "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
      "license": "ISC",
      "optional": true
    },
    "node_modules/@google-cloud/storage/node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@types/body-parser": {
      "version": "1.19.6",
      "resolved": "https://registry.npmjs.org/@types/body-parser/-/body-parser-1.19.6.tgz",
      "integrity": "sha512-HLFeCYgz89uk22N5Qg3dvGvsv46B8GLvKKo1zKG4NybA8U2DiEO3w9lqGg29t/tfLRJpJ6iQxnVw4OnB7MoM9g==",
      "license": "MIT",
      "dependencies": {
        "@types/connect": "*",
        "@types/node": "*"
      }
    },
    "node_modules/@types/connect": {
      "version": "3.4.38",
      "resolved": "https://registry.npmjs.org/@types/connect/-/connect-3.4.38.tgz",
      "integrity": "sha512-K6uROf1LD88uDQqJCktA4yzL1YYAK6NgfsI0v/mTgyPKWsX1CnJ0XPSDhViejru1GcRkLWb8RlzFYJRqGUbaug==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/cors": {
      "version": "2.8.19",
      "resolved": "https://registry.npmjs.org/@types/cors/-/cors-2.8.19.tgz",
      "integrity": "sha512-mFNylyeyqN93lfe/9CSxOGREz8cpzAhH+E93xJ4xWQf62V8sQ/24reV2nyzUWM6H6Xji+GGHpkbLe7pVoUEskg==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/express": {
      "version": "5.0.6",
      "resolved": "https://registry.npmjs.org/@types/express/-/express-5.0.6.tgz",
      "integrity": "sha512-sKYVuV7Sv9fbPIt/442koC7+IIwK5olP1KWeD88e/idgoJqDm3JV/YUiPwkoKK92ylff2MGxSz1CSjsXelx0YA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/body-parser": "*",
        "@types/express-serve-static-core": "^5.0.0",
        "@types/serve-static": "^2"
      }
    },
    "node_modules/@types/express-serve-static-core": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/@types/express-serve-static-core/-/express-serve-static-core-5.1.0.tgz",
      "integrity": "sha512-jnHMsrd0Mwa9Cf4IdOzbz543y4XJepXrbia2T4b6+spXC2We3t1y6K44D3mR8XMFSXMCf3/l7rCgddfx7UNVBA==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*",
        "@types/qs": "*",
        "@types/range-parser": "*",
        "@types/send": "*"
      }
    },
    "node_modules/@types/glob": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/@types/glob/-/glob-8.1.0.tgz",
      "integrity": "sha512-IO+MJPVhoqz+28h1qLAcBEH2+xHMK6MTyHJc7MTnnYb6wsoLR29POVGJ7LycmVXIqyy/4/2ShP5sUwTXuOwb/w==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "@types/minimatch": "^5.1.2",
        "@types/node": "*"
      }
    },
    "node_modules/@types/http-errors": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@types/http-errors/-/http-errors-2.0.5.tgz",
      "integrity": "sha512-r8Tayk8HJnX0FztbZN7oVqGccWgw98T/0neJphO91KkmOzug1KkofZURD4UaD5uH8AqcFLfdPErnBod0u71/qg==",
      "license": "MIT"
    },
    "node_modules/@types/markdown-it": {
      "version": "14.1.2",
      "resolved": "https://registry.npmjs.org/@types/markdown-it/-/markdown-it-14.1.2.tgz",
      "integrity": "sha512-promo4eFwuiW+TfGxhi+0x3czqTYJkG8qB17ZUJiVF10Xm7NLVRSLUsfRTU/6h1e24VvRnXCx+hG7li58lkzog==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@types/linkify-it": "^5",
        "@types/mdurl": "^2"
      }
    },
    "node_modules/@types/markdown-it/node_modules/@types/linkify-it": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/@types/linkify-it/-/linkify-it-5.0.0.tgz",
      "integrity": "sha512-sVDA58zAw4eWAffKOaQH5/5j3XeayukzDk+ewSsnv3p4yJEZHCCzMDiZM8e0OUrRvmpGZ85jf4yDHkHsgBNr9Q==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@types/markdown-it/node_modules/@types/mdurl": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/@types/mdurl/-/mdurl-2.0.0.tgz",
      "integrity": "sha512-RGdgjQUZba5p6QEFAVx2OGb8rQDL/cPRG7GiedRzMcJ1tYnUANBncjbSB1NRGwbvjcPeikRABz2nshyPk1bhWg==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/@types/minimatch": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/@types/minimatch/-/minimatch-5.1.2.tgz",
      "integrity": "sha512-K0VQKziLUWkVKiRVrx4a40iPaxTUefQmjtkQofBkYRcoaaL/8rhwDWww9qWbrgicNOgnpIsMxyNIUM4+n6dUIA==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/@types/ms": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/@types/ms/-/ms-2.1.0.tgz",
      "integrity": "sha512-GsCCIZDE/p3i96vtEqx+7dBUGXrc7zeSK3wwPHIaRThS+9OhWIXRqzs4d6k1SVU8g91DrNRWxWUGhp5KXQb2VA==",
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "25.0.3",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-25.0.3.tgz",
      "integrity": "sha512-W609buLVRVmeW693xKfzHeIV6nJGGz98uCPfeXI1ELMLXVeKYZ9m15fAMSaUPBHYLGFsVRcMmSCksQOrZV9BYA==",
      "license": "MIT",
      "dependencies": {
        "undici-types": "~7.16.0"
      }
    },
    "node_modules/@types/qs": {
      "version": "6.14.0",
      "resolved": "https://registry.npmjs.org/@types/qs/-/qs-6.14.0.tgz",
      "integrity": "sha512-eOunJqu0K1923aExK6y8p6fsihYEn/BYuQ4g0CxAAgFc4b/ZLN4CrsRZ55srTdqoiLzU2B2evC+apEIxprEzkQ==",
      "license": "MIT"
    },
    "node_modules/@types/range-parser": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/@types/range-parser/-/range-parser-1.2.7.tgz",
      "integrity": "sha512-hKormJbkJqzQGhziax5PItDUTMAM9uE2XXQmM37dyd4hVM+5aVl7oVxMVUiVQn2oCQFN/LKCZdvSM0pFRqbSmQ==",
      "license": "MIT"
    },
    "node_modules/@types/send": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@types/send/-/send-1.2.1.tgz",
      "integrity": "sha512-arsCikDvlU99zl1g69TcAB3mzZPpxgw0UQnaHeC1Nwb015xp8bknZv5rIfri9xTOcMuaVgvabfIRA7PSZVuZIQ==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/serve-static": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/@types/serve-static/-/serve-static-2.2.0.tgz",
      "integrity": "sha512-8mam4H1NHLtu7nmtalF7eyBH14QyOASmcxHhSfEoRyr0nP/YdoesEtU+uSRvMe96TW/HPTtkoKqQLl53N7UXMQ==",
      "license": "MIT",
      "dependencies": {
        "@types/http-errors": "*",
        "@types/node": "*"
      }
    },
    "node_modules/accepts": {
      "version": "1.3.8",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
      "integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
      "license": "MIT",
      "dependencies": {
        "mime-types": "~2.1.34",
        "negotiator": "0.6.3"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/accepts/node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/accepts/node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/accepts/node_modules/negotiator": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
      "integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/array-flatten": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
      "integrity": "sha512-PCVAQswWemu6UdxsDFFX/+gVeYqKAod3D3UVm91jHwynguOwAvYPhx8nNlM++NqRcK6CxxpUafjmhIdKiHibqg==",
      "license": "MIT"
    },
    "node_modules/body-parser": {
      "version": "1.20.4",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.4.tgz",
      "integrity": "sha512-ZTgYYLMOXY9qKU/57FAo8F+HA2dGX7bqGc71txDRC1rS4frdFI5R7NhluHxH6M0YItAP0sHB4uqAOcYKxO6uGA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "~3.1.2",
        "content-type": "~1.0.5",
        "debug": "2.6.9",
        "depd": "2.0.0",
        "destroy": "~1.2.0",
        "http-errors": "~2.0.1",
        "iconv-lite": "~0.4.24",
        "on-finished": "~2.4.1",
        "qs": "~6.14.0",
        "raw-body": "~2.5.3",
        "type-is": "~1.6.18",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8",
        "npm": "1.2.8000 || >= 1.4.16"
      }
    },
    "node_modules/body-parser/node_modules/bytes": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz",
      "integrity": "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/body-parser/node_modules/destroy": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.2.0.tgz",
      "integrity": "sha512-2sJGJTaXIIaR1w4iJSNoN0hnMY7Gpc/n8D4qSCJw8QqFWXf7cuAgnEHxBpweaVcPevC2l3KpjYCx3NypQQgaJg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8",
        "npm": "1.2.8000 || >= 1.4.16"
      }
    },
    "node_modules/body-parser/node_modules/iconv-lite": {
      "version": "0.4.24",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
      "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/body-parser/node_modules/raw-body": {
      "version": "2.5.3",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.5.3.tgz",
      "integrity": "sha512-s4VSOf6yN0rvbRZGxs8Om5CWj6seneMwK3oDb4lWDH0UPhWcxwOWw5+qk24bxq87szX1ydrwylIOp2uG1ojUpA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "~3.1.2",
        "http-errors": "~2.0.1",
        "iconv-lite": "~0.4.24",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/body-parser/node_modules/safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
      "license": "MIT"
    },
    "node_modules/body-parser/node_modules/unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/content-disposition": {
      "version": "0.5.4",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz",
      "integrity": "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==",
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "5.2.1"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/content-type": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.5.tgz",
      "integrity": "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.2.tgz",
      "integrity": "sha512-yki5XnKuf750l50uGTllt6kKILY4nQ1eNIQatoXEByZ5dWgnKqbnqmTrBE5B4N7lrMJKQ2ytWMiTO2o0v6Ew/w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie-signature": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.7.tgz",
      "integrity": "sha512-NXdYc3dLr47pBkpUCHtKSwIOQXLVn8dZEuywboCOJY/osA0wFSLlSawr3KN8qXJEyX66FcONTH8EIlVuK0yyFA==",
      "license": "MIT"
    },
    "node_modules/cors": {
      "version": "2.8.5",
      "resolved": "https://registry.npmjs.org/cors/-/cors-2.8.5.tgz",
      "integrity": "sha512-KIHbLJqu73RGr/hnbrO9uBeixNGuvSQjul/jdFvS/KFSIH1hWVd1ng7zOHx+YrEfInLG7q4n6GHQ9cDtxv/P6g==",
      "license": "MIT",
      "dependencies": {
        "object-assign": "^4",
        "vary": "^1"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/cors/node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/debug/node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "license": "MIT"
    },
    "node_modules/depd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
      "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/encodeurl": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-2.0.0.tgz",
      "integrity": "sha512-Q0n9HRi4m6JuGIV1eFlmvJB7ZEVxu93IrMyiMsGC0lrMJMWzRgx6WGquyfQgZVb31vhGgXnfmPNNXmxnOkRBrg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
      "license": "MIT"
    },
    "node_modules/etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/express": {
      "version": "4.22.1",
      "resolved": "https://registry.npmjs.org/express/-/express-4.22.1.tgz",
      "integrity": "sha512-F2X8g9P1X7uCPZMA3MVf9wcTqlyNp7IhH5qPCI0izhaOIYXaW9L535tGA3qmjRzpH+bZczqq7hVKxTR4NWnu+g==",
      "license": "MIT",
      "dependencies": {
        "accepts": "~1.3.8",
        "array-flatten": "1.1.1",
        "body-parser": "~1.20.3",
        "content-disposition": "~0.5.4",
        "content-type": "~1.0.4",
        "cookie": "~0.7.1",
        "cookie-signature": "~1.0.6",
        "debug": "2.6.9",
        "depd": "2.0.0",
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "finalhandler": "~1.3.1",
        "fresh": "~0.5.2",
        "http-errors": "~2.0.0",
        "merge-descriptors": "1.0.3",
        "methods": "~1.1.2",
        "on-finished": "~2.4.1",
        "parseurl": "~1.3.3",
        "path-to-regexp": "~0.1.12",
        "proxy-addr": "~2.0.7",
        "qs": "~6.14.0",
        "range-parser": "~1.2.1",
        "safe-buffer": "5.2.1",
        "send": "~0.19.0",
        "serve-static": "~1.16.2",
        "setprototypeof": "1.2.0",
        "statuses": "~2.0.1",
        "type-is": "~1.6.18",
        "utils-merge": "1.0.1",
        "vary": "~1.1.2"
      },
      "engines": {
        "node": ">= 0.10.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/finalhandler": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.3.2.tgz",
      "integrity": "sha512-aA4RyPcd3badbdABGDuTXCMTtOneUCAYH/gxoYRTZlIJdF0YPWuGqiAsIrhNnnqdXGswYk6dGujem4w80UJFhg==",
      "license": "MIT",
      "dependencies": {
        "debug": "2.6.9",
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "on-finished": "~2.4.1",
        "parseurl": "~1.3.3",
        "statuses": "~2.0.2",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/finalhandler/node_modules/unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/firebase-admin": {
      "version": "11.11.1",
      "resolved": "https://registry.npmjs.org/firebase-admin/-/firebase-admin-11.11.1.tgz",
      "integrity": "sha512-UyEbq+3u6jWzCYbUntv/HuJiTixwh36G1R9j0v71mSvGAx/YZEWEW7uSGLYxBYE6ckVRQoKMr40PYUEzrm/4dg==",
      "license": "Apache-2.0",
      "peer": true,
      "dependencies": {
        "@fastify/busboy": "^1.2.1",
        "@firebase/database-compat": "^0.3.4",
        "@firebase/database-types": "^0.10.4",
        "@types/node": ">=12.12.47",
        "jsonwebtoken": "^9.0.0",
        "jwks-rsa": "^3.0.1",
        "node-forge": "^1.3.1",
        "uuid": "^9.0.0"
      },
      "engines": {
        "node": ">=14"
      },
      "optionalDependencies": {
        "@google-cloud/firestore": "^6.8.0",
        "@google-cloud/storage": "^6.9.5"
      }
    },
    "node_modules/firebase-functions": {
      "version": "4.9.0",
      "resolved": "https://registry.npmjs.org/firebase-functions/-/firebase-functions-4.9.0.tgz",
      "integrity": "sha512-IqxOEsVAWGcRv9KRGzWQR5mOFuNsil3vsfkRPPiaV1U/ATC27/jbahh4z8I4rW8Xqa6cQE5xqnw0ueyMH7i7Ag==",
      "license": "MIT",
      "dependencies": {
        "@types/cors": "^2.8.5",
        "@types/express": "4.17.3",
        "cors": "^2.8.5",
        "express": "^4.17.1",
        "protobufjs": "^7.2.2"
      },
      "bin": {
        "firebase-functions": "lib/bin/firebase-functions.js"
      },
      "engines": {
        "node": ">=14.10.0"
      },
      "peerDependencies": {
        "firebase-admin": "^10.0.0 || ^11.0.0 || ^12.0.0"
      }
    },
    "node_modules/firebase-functions/node_modules/@types/express": {
      "version": "4.17.3",
      "resolved": "https://registry.npmjs.org/@types/express/-/express-4.17.3.tgz",
      "integrity": "sha512-I8cGRJj3pyOLs/HndoP+25vOqhqWkAZsWMEmq1qXy/b/M3ppufecUwaK2/TVDVxcV61/iSdhykUjQQ2DLSrTdg==",
      "license": "MIT",
      "dependencies": {
        "@types/body-parser": "*",
        "@types/express-serve-static-core": "*",
        "@types/serve-static": "*"
      }
    },
    "node_modules/fresh": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
      "integrity": "sha512-zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/http-errors": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.1.tgz",
      "integrity": "sha512-4FbRdAX+bSdmo4AUFuS0WNiPz8NgFt+r8ThgNWmlrjQjt1Q7ZR9+zTlce2859x4KSXrwIsaeTqDoKQmtP8pLmQ==",
      "license": "MIT",
      "dependencies": {
        "depd": "~2.0.0",
        "inherits": "~2.0.4",
        "setprototypeof": "~1.2.0",
        "statuses": "~2.0.2",
        "toidentifier": "~1.0.1"
      },
      "engines": {
        "node": ">= 0.8"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/http-errors/node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC"
    },
    "node_modules/http-errors/node_modules/toidentifier": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
      "integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.6"
      }
    },
    "node_modules/jsonwebtoken": {
      "version": "9.0.3",
      "resolved": "https://registry.npmjs.org/jsonwebtoken/-/jsonwebtoken-9.0.3.tgz",
      "integrity": "sha512-MT/xP0CrubFRNLNKvxJ2BYfy53Zkm++5bX9dtuPbqAeQpTVe0MQTFhao8+Cp//EmJp244xt6Drw/GVEGCUj40g==",
      "license": "MIT",
      "dependencies": {
        "jws": "^4.0.1",
        "lodash.includes": "^4.3.0",
        "lodash.isboolean": "^3.0.3",
        "lodash.isinteger": "^4.0.4",
        "lodash.isnumber": "^3.0.3",
        "lodash.isplainobject": "^4.0.6",
        "lodash.isstring": "^4.0.1",
        "lodash.once": "^4.0.0",
        "ms": "^2.1.1",
        "semver": "^7.5.4"
      },
      "engines": {
        "node": ">=12",
        "npm": ">=6"
      }
    },
    "node_modules/jsonwebtoken/node_modules/buffer-equal-constant-time": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/buffer-equal-constant-time/-/buffer-equal-constant-time-1.0.1.tgz",
      "integrity": "sha512-zRpUiDwd/xk6ADqPMATG8vc9VPrkck7T07OIx0gnjmJAnHnTVXNQG3vfvWNuiZIkwu9KrKdA1iJKfsfTVxE6NA==",
      "license": "BSD-3-Clause"
    },
    "node_modules/jsonwebtoken/node_modules/ecdsa-sig-formatter": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/ecdsa-sig-formatter/-/ecdsa-sig-formatter-1.0.11.tgz",
      "integrity": "sha512-nagl3RYrbNv6kQkeJIpt6NJZy8twLB/2vtz6yN9Z4vRKHN4/QZJIEbqohALSgwKdnksuY3k5Addp5lg8sVoVcQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/jsonwebtoken/node_modules/jwa": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/jwa/-/jwa-2.0.1.tgz",
      "integrity": "sha512-hRF04fqJIP8Abbkq5NKGN0Bbr3JxlQ+qhZufXVr0DvujKy93ZCbXZMHDL4EOtodSbCWxOqR8MS1tXA5hwqCXDg==",
      "license": "MIT",
      "dependencies": {
        "buffer-equal-constant-time": "^1.0.1",
        "ecdsa-sig-formatter": "1.0.11",
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/jsonwebtoken/node_modules/jws": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/jws/-/jws-4.0.1.tgz",
      "integrity": "sha512-EKI/M/yqPncGUUh44xz0PxSidXFr/+r0pA70+gIYhjv+et7yxM+s29Y+VGDkovRofQem0fs7Uvf4+YmAdyRduA==",
      "license": "MIT",
      "dependencies": {
        "jwa": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/jsonwebtoken/node_modules/lodash.includes": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/lodash.includes/-/lodash.includes-4.3.0.tgz",
      "integrity": "sha512-W3Bx6mdkRTGtlJISOvVD/lbqjTlPPUDTMnlXZFnVwi9NKJ6tiAk6LVdlhZMm17VZisqhKcgzpO5Wz91PCt5b0w==",
      "license": "MIT"
    },
    "node_modules/jsonwebtoken/node_modules/lodash.isboolean": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/lodash.isboolean/-/lodash.isboolean-3.0.3.tgz",
      "integrity": "sha512-Bz5mupy2SVbPHURB98VAcw+aHh4vRV5IPNhILUCsOzRmsTmSQ17jIuqopAentWoehktxGd9e/hbIXq980/1QJg==",
      "license": "MIT"
    },
    "node_modules/jsonwebtoken/node_modules/lodash.isinteger": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/lodash.isinteger/-/lodash.isinteger-4.0.4.tgz",
      "integrity": "sha512-DBwtEWN2caHQ9/imiNeEA5ys1JoRtRfY3d7V9wkqtbycnAmTvRRmbHKDV4a0EYc678/dia0jrte4tjYwVBaZUA==",
      "license": "MIT"
    },
    "node_modules/jsonwebtoken/node_modules/lodash.isnumber": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/lodash.isnumber/-/lodash.isnumber-3.0.3.tgz",
      "integrity": "sha512-QYqzpfwO3/CWf3XP+Z+tkQsfaLL/EnUlXWVkIk5FUPc4sBdTehEqZONuyRt2P67PXAk+NXmTBcc97zw9t1FQrw==",
      "license": "MIT"
    },
    "node_modules/jsonwebtoken/node_modules/lodash.isplainobject": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/lodash.isplainobject/-/lodash.isplainobject-4.0.6.tgz",
      "integrity": "sha512-oSXzaWypCMHkPC3NvBEaPHf0KsA5mvPrOPgQWDsbg8n7orZ290M0BmC/jgRZ4vcJ6DTAhjrsSYgdsW/F+MFOBA==",
      "license": "MIT"
    },
    "node_modules/jsonwebtoken/node_modules/lodash.isstring": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/lodash.isstring/-/lodash.isstring-4.0.1.tgz",
      "integrity": "sha512-0wJxfxH1wgO3GrbuP+dTTk7op+6L41QCXbGINEmD+ny/G/eCqGzxyCsh7159S+mgDDcoarnBw6PC1PS5+wUGgw==",
      "license": "MIT"
    },
    "node_modules/jsonwebtoken/node_modules/lodash.once": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/lodash.once/-/lodash.once-4.1.1.tgz",
      "integrity": "sha512-Sb487aTOCr9drQVL8pIxOzVhafOjZN9UU54hiN8PU3uAiSV7lx1yYNpbNmex2PK6dSJoNTSJUUswT651yww3Mg==",
      "license": "MIT"
    },
    "node_modules/jsonwebtoken/node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/jsonwebtoken/node_modules/semver": {
      "version": "7.7.3",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.3.tgz",
      "integrity": "sha512-SdsKMrI9TdgjdweUSR9MweHA4EJ8YxHn8DFaDisvhVlUOe4BF1tLD7GAj0lIqWVl+dPb/rExr0Btby5loQm20Q==",
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/jwks-rsa": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/jwks-rsa/-/jwks-rsa-3.2.0.tgz",
      "integrity": "sha512-PwchfHcQK/5PSydeKCs1ylNym0w/SSv8a62DgHJ//7x2ZclCoinlsjAfDxAAbpoTPybOum/Jgy+vkvMmKz89Ww==",
      "license": "MIT",
      "dependencies": {
        "@types/express": "^4.17.20",
        "@types/jsonwebtoken": "^9.0.4",
        "debug": "^4.3.4",
        "jose": "^4.15.4",
        "limiter": "^1.1.5",
        "lru-memoizer": "^2.2.0"
      },
      "engines": {
        "node": ">=14"
      }
    },
    "node_modules/jwks-rsa/node_modules/@types/express": {
      "version": "4.17.25",
      "resolved": "https://registry.npmjs.org/@types/express/-/express-4.17.25.tgz",
      "integrity": "sha512-dVd04UKsfpINUnK0yBoYHDF3xu7xVH4BuDotC/xGuycx4CgbP48X/KF/586bcObxT0HENHXEU8Nqtu6NR+eKhw==",
      "license": "MIT",
      "dependencies": {
        "@types/body-parser": "*",
        "@types/express-serve-static-core": "^4.17.33",
        "@types/qs": "*",
        "@types/serve-static": "^1"
      }
    },
    "node_modules/jwks-rsa/node_modules/@types/express-serve-static-core": {
      "version": "4.19.7",
      "resolved": "https://registry.npmjs.org/@types/express-serve-static-core/-/express-serve-static-core-4.19.7.tgz",
      "integrity": "sha512-FvPtiIf1LfhzsaIXhv/PHan/2FeQBbtBDtfX2QfvPxdUelMDEckK08SM6nqo1MIZY3RUlfA+HV8+hFUSio78qg==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*",
        "@types/qs": "*",
        "@types/range-parser": "*",
        "@types/send": "*"
      }
    },
    "node_modules/jwks-rsa/node_modules/@types/jsonwebtoken": {
      "version": "9.0.10",
      "resolved": "https://registry.npmjs.org/@types/jsonwebtoken/-/jsonwebtoken-9.0.10.tgz",
      "integrity": "sha512-asx5hIG9Qmf/1oStypjanR7iKTv0gXQ1Ov/jfrX6kS/EO0OFni8orbmGCn0672NHR3kXHwpAwR+B368ZGN/2rA==",
      "license": "MIT",
      "dependencies": {
        "@types/ms": "*",
        "@types/node": "*"
      }
    },
    "node_modules/jwks-rsa/node_modules/@types/mime": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/@types/mime/-/mime-1.3.5.tgz",
      "integrity": "sha512-/pyBZWSLD2n0dcHE3hq8s8ZvcETHtEuF+3E7XVt0Ig2nvsVQXdghHVcEkIWjy9A0wKfTn97a/PSDYohKIlnP/w==",
      "license": "MIT"
    },
    "node_modules/jwks-rsa/node_modules/@types/send": {
      "version": "0.17.6",
      "resolved": "https://registry.npmjs.org/@types/send/-/send-0.17.6.tgz",
      "integrity": "sha512-Uqt8rPBE8SY0RK8JB1EzVOIZ32uqy8HwdxCnoCOsYrvnswqmFZ/k+9Ikidlk/ImhsdvBsloHbAlewb2IEBV/Og==",
      "license": "MIT",
      "dependencies": {
        "@types/mime": "^1",
        "@types/node": "*"
      }
    },
    "node_modules/jwks-rsa/node_modules/@types/serve-static": {
      "version": "1.15.10",
      "resolved": "https://registry.npmjs.org/@types/serve-static/-/serve-static-1.15.10.tgz",
      "integrity": "sha512-tRs1dB+g8Itk72rlSI2ZrW6vZg0YrLI81iQSTkMmOqnqCaNr/8Ek4VwWcN5vZgCYWbg/JJSGBlUaYGAOP73qBw==",
      "license": "MIT",
      "dependencies": {
        "@types/http-errors": "*",
        "@types/node": "*",
        "@types/send": "<1"
      }
    },
    "node_modules/jwks-rsa/node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/jwks-rsa/node_modules/jose": {
      "version": "4.15.9",
      "resolved": "https://registry.npmjs.org/jose/-/jose-4.15.9.tgz",
      "integrity": "sha512-1vUQX+IdDMVPj4k8kOxgUqlcK518yluMuGZwqlr44FS1ppZB/5GWh4rZG89erpOBOJjU/OBsnCVFfapsRz6nEA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/panva"
      }
    },
    "node_modules/jwks-rsa/node_modules/limiter": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/limiter/-/limiter-1.1.5.tgz",
      "integrity": "sha512-FWWMIEOxz3GwUI4Ts/IvgVy6LPvoMPgjMdQ185nN6psJyBJ4yOpzqm695/h5umdLJg2vW3GR5iG11MAkR2AzJA=="
    },
    "node_modules/jwks-rsa/node_modules/lodash.clonedeep": {
      "version": "4.5.0",
      "resolved": "https://registry.npmjs.org/lodash.clonedeep/-/lodash.clonedeep-4.5.0.tgz",
      "integrity": "sha512-H5ZhCF25riFd9uB5UCkVKo61m3S/xZk1x4wA6yp/L3RFP6Z/eHH1ymQcGLo7J3GMPfm0V/7m1tryHuGVxpqEBQ==",
      "license": "MIT"
    },
    "node_modules/jwks-rsa/node_modules/lru-cache": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-6.0.0.tgz",
      "integrity": "sha512-Jo6dJ04CmSjuznwJSS3pUeWmd/H0ffTlkXXgwZi+eq1UCmqQwCh+eLsYOYCwY991i2Fah4h1BEMCx4qThGbsiA==",
      "license": "ISC",
      "dependencies": {
        "yallist": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/jwks-rsa/node_modules/lru-memoizer": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/lru-memoizer/-/lru-memoizer-2.3.0.tgz",
      "integrity": "sha512-GXn7gyHAMhO13WSKrIiNfztwxodVsP8IoZ3XfrJV4yH2x0/OeTO/FIaAHTY5YekdGgW94njfuKmyyt1E0mR6Ug==",
      "license": "MIT",
      "dependencies": {
        "lodash.clonedeep": "^4.5.0",
        "lru-cache": "6.0.0"
      }
    },
    "node_modules/jwks-rsa/node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/jwks-rsa/node_modules/yallist": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
      "integrity": "sha512-3wdGidZyq5PB084XLES5TpOSRA3wjXAlIWMhum2kRcv/41Sn2emQ0dycQW4uZXLejwKvg6EsvbdlVL+FYEct7A==",
      "license": "ISC"
    },
    "node_modules/markdown-it": {
      "version": "14.1.0",
      "resolved": "https://registry.npmjs.org/markdown-it/-/markdown-it-14.1.0.tgz",
      "integrity": "sha512-a54IwgWPaeBCAAsv13YgmALOF1elABB08FxO9i+r4VFk5Vl4pKokRPeX8u5TCgSsPi6ec1otfLjdOpVcgbpshg==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "argparse": "^2.0.1",
        "entities": "^4.4.0",
        "linkify-it": "^5.0.0",
        "mdurl": "^2.0.0",
        "punycode.js": "^2.3.1",
        "uc.micro": "^2.1.0"
      },
      "bin": {
        "markdown-it": "bin/markdown-it.mjs"
      }
    },
    "node_modules/markdown-it/node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
      "license": "Python-2.0",
      "optional": true
    },
    "node_modules/markdown-it/node_modules/entities": {
      "version": "4.5.0",
      "resolved": "https://registry.npmjs.org/entities/-/entities-4.5.0.tgz",
      "integrity": "sha512-V0hjH4dGPh9Ao5p0MoRY6BVqtwCjhz6vI5LT8AJ55H+4g9/4vbHx1I54fS0XuclLhDHArPQCiMjDxjaL8fPxhw==",
      "license": "BSD-2-Clause",
      "optional": true,
      "engines": {
        "node": ">=0.12"
      },
      "funding": {
        "url": "https://github.com/fb55/entities?sponsor=1"
      }
    },
    "node_modules/markdown-it/node_modules/linkify-it": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/linkify-it/-/linkify-it-5.0.0.tgz",
      "integrity": "sha512-5aHCbzQRADcdP+ATqnDuhhJ/MRIqDkZX5pyjFHRRysS8vZ5AbqGEoFIb6pYHPZ+L/OC2Lc+xT8uHVVR5CAK/wQ==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "uc.micro": "^2.0.0"
      }
    },
    "node_modules/markdown-it/node_modules/mdurl": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/mdurl/-/mdurl-2.0.0.tgz",
      "integrity": "sha512-Lf+9+2r+Tdp5wXDXC4PcIBjTDtq4UKjCPMQhKIuzpJNW0b96kVqSwW0bT7FhRSfmAiFYgP+SCRvdrDozfh0U5w==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/markdown-it/node_modules/punycode.js": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode.js/-/punycode.js-2.3.1.tgz",
      "integrity": "sha512-uxFIHU0YlHYhDQtV4R9J6a52SLx28BCjT+4ieh7IGbgwVJWO+km431c4yRlREUAsAmt/uMjQUyQHNEPf0M39CA==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/markdown-it/node_modules/uc.micro": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/uc.micro/-/uc.micro-2.1.0.tgz",
      "integrity": "sha512-ARDJmphmdvUk6Glw7y9DQ2bFkKBHwQHLi2lsaH6PPmz/Ka9sFOBsBluozhDltWmnv9u/cF6Rt87znRTPV+yp/A==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/merge-descriptors": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.3.tgz",
      "integrity": "sha512-gaNvAS7TZ897/rVaZ0nMtAyxNyi/pdbjbAwUpFQpN70GqnVfOiXpeUUMKRBmzXaSQ8DdTX4/0ms62r2K+hE6mQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/methods": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz",
      "integrity": "sha512-iclAHeNqNm68zFtnZ0e+1L2yUIdvzNoauKU4WBA3VvH/vPFieF7qfRlwUZU+DA9P9bPXIS90ulxoUoCH23sV2w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/node-forge": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/node-forge/-/node-forge-1.3.3.tgz",
      "integrity": "sha512-rLvcdSyRCyouf6jcOIPe/BgwG/d7hKjzMKOas33/pHEr6gbq18IK9zV7DiPvzsz0oBJPme6qr6H6kGZuI9/DZg==",
      "license": "(BSD-3-Clause OR GPL-2.0)",
      "engines": {
        "node": ">= 6.13.0"
      }
    },
    "node_modules/on-finished": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz",
      "integrity": "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==",
      "license": "MIT",
      "dependencies": {
        "ee-first": "1.1.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/on-finished/node_modules/ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
      "license": "MIT"
    },
    "node_modules/parseurl": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/path-to-regexp": {
      "version": "0.1.12",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.12.tgz",
      "integrity": "sha512-RA1GjUVMnvYFxuqovrEqZoxxW5NUZqbwKtYz/Tt7nXerk0LbLblQmrsgdeOxV5SFHf0UDggjS/bSeOZwt1pmEQ==",
      "license": "MIT"
    },
    "node_modules/protobufjs": {
      "version": "7.5.4",
      "resolved": "https://registry.npmjs.org/protobufjs/-/protobufjs-7.5.4.tgz",
      "integrity": "sha512-CvexbZtbov6jW2eXAvLukXjXUW1TzFaivC46BpWc/3BpcCysb5Vffu+B3XHMm8lVEuy2Mm4XGex8hBSg1yapPg==",
      "hasInstallScript": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "@protobufjs/aspromise": "^1.1.2",
        "@protobufjs/base64": "^1.1.2",
        "@protobufjs/codegen": "^2.0.4",
        "@protobufjs/eventemitter": "^1.1.0",
        "@protobufjs/fetch": "^1.1.0",
        "@protobufjs/float": "^1.0.2",
        "@protobufjs/inquire": "^1.1.0",
        "@protobufjs/path": "^1.1.2",
        "@protobufjs/pool": "^1.1.0",
        "@protobufjs/utf8": "^1.1.0",
        "@types/node": ">=13.7.0",
        "long": "^5.0.0"
      },
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/protobufjs/node_modules/@protobufjs/aspromise": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/aspromise/-/aspromise-1.1.2.tgz",
      "integrity": "sha512-j+gKExEuLmKwvz3OgROXtrJ2UG2x8Ch2YZUxahh+s1F2HZ+wAceUNLkvy6zKCPVRkU++ZWQrdxsUeQXmcg4uoQ==",
      "license": "BSD-3-Clause"
    },
    "node_modules/protobufjs/node_modules/@protobufjs/base64": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/base64/-/base64-1.1.2.tgz",
      "integrity": "sha512-AZkcAA5vnN/v4PDqKyMR5lx7hZttPDgClv83E//FMNhR2TMcLUhfRUBHCmSl0oi9zMgDDqRUJkSxO3wm85+XLg==",
      "license": "BSD-3-Clause"
    },
    "node_modules/protobufjs/node_modules/@protobufjs/codegen": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/@protobufjs/codegen/-/codegen-2.0.4.tgz",
      "integrity": "sha512-YyFaikqM5sH0ziFZCN3xDC7zeGaB/d0IUb9CATugHWbd1FRFwWwt4ld4OYMPWu5a3Xe01mGAULCdqhMlPl29Jg==",
      "license": "BSD-3-Clause"
    },
    "node_modules/protobufjs/node_modules/@protobufjs/eventemitter": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/eventemitter/-/eventemitter-1.1.0.tgz",
      "integrity": "sha512-j9ednRT81vYJ9OfVuXG6ERSTdEL1xVsNgqpkxMsbIabzSo3goCjDIveeGv5d03om39ML71RdmrGNjG5SReBP/Q==",
      "license": "BSD-3-Clause"
    },
    "node_modules/protobufjs/node_modules/@protobufjs/fetch": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/fetch/-/fetch-1.1.0.tgz",
      "integrity": "sha512-lljVXpqXebpsijW71PZaCYeIcE5on1w5DlQy5WH6GLbFryLUrBD4932W/E2BSpfRJWseIL4v/KPgBFxDOIdKpQ==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "@protobufjs/aspromise": "^1.1.1",
        "@protobufjs/inquire": "^1.1.0"
      }
    },
    "node_modules/protobufjs/node_modules/@protobufjs/float": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/float/-/float-1.0.2.tgz",
      "integrity": "sha512-Ddb+kVXlXst9d+R9PfTIxh1EdNkgoRe5tOX6t01f1lYWOvJnSPDBlG241QLzcyPdoNTsblLUdujGSE4RzrTZGQ==",
      "license": "BSD-3-Clause"
    },
    "node_modules/protobufjs/node_modules/@protobufjs/inquire": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/inquire/-/inquire-1.1.0.tgz",
      "integrity": "sha512-kdSefcPdruJiFMVSbn801t4vFK7KB/5gd2fYvrxhuJYg8ILrmn9SKSX2tZdV6V+ksulWqS7aXjBcRXl3wHoD9Q==",
      "license": "BSD-3-Clause"
    },
    "node_modules/protobufjs/node_modules/@protobufjs/path": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@protobufjs/path/-/path-1.1.2.tgz",
      "integrity": "sha512-6JOcJ5Tm08dOHAbdR3GrvP+yUUfkjG5ePsHYczMFLq3ZmMkAD98cDgcT2iA1lJ9NVwFd4tH/iSSoe44YWkltEA==",
      "license": "BSD-3-Clause"
    },
    "node_modules/protobufjs/node_modules/@protobufjs/pool": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/pool/-/pool-1.1.0.tgz",
      "integrity": "sha512-0kELaGSIDBKvcgS4zkjz1PeddatrjYcmMWOlAuAPwAeccUrPHdUqo/J6LiymHHEiJT5NrF1UVwxY14f+fy4WQw==",
      "license": "BSD-3-Clause"
    },
    "node_modules/protobufjs/node_modules/@protobufjs/utf8": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@protobufjs/utf8/-/utf8-1.1.0.tgz",
      "integrity": "sha512-Vvn3zZrhQZkkBE8LSuW3em98c0FwgO4nxzv6OdSxPKJIEKY2bGbHn+mhGIPerzI4twdxaP8/0+06HBpwf345Lw==",
      "license": "BSD-3-Clause"
    },
    "node_modules/protobufjs/node_modules/long": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/long/-/long-5.3.2.tgz",
      "integrity": "sha512-mNAgZ1GmyNhD7AuqnTG3/VQ26o760+ZYBPKjPvugO8+nLbYfX6TVpJPseBvopbdY+qpZ/lKUnmEc1LeZYS3QAA==",
      "license": "Apache-2.0"
    },
    "node_modules/proxy-addr": {
      "version": "2.0.7",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.7.tgz",
      "integrity": "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==",
      "license": "MIT",
      "dependencies": {
        "forwarded": "0.2.0",
        "ipaddr.js": "1.9.1"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/proxy-addr/node_modules/forwarded": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
      "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/proxy-addr/node_modules/ipaddr.js": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
      "integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/qs": {
      "version": "6.14.1",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.14.1.tgz",
      "integrity": "sha512-4EK3+xJl8Ts67nLYNwqw/dsFVnCf+qR7RgXSK9jEEm9unao3njwMDdmsdvoKBKHzxd7tCYz5e5M+SnMjdtXGQQ==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/qs/node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/qs/node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/qs/node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/qs/node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/qs/node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/qs/node_modules/es-object-atoms": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/qs/node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/qs/node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/qs/node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/qs/node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/qs/node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/qs/node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/qs/node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/qs/node_modules/object-inspect": {
      "version": "1.13.4",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
      "integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/qs/node_modules/side-channel": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.0.tgz",
      "integrity": "sha512-ZX99e6tRweoUXqR+VBrslhda51Nh5MTQwou5tnUDgbtyM0dBgmhEDtWGP/xbKn6hqfPRHujUNwz5fy/wbbhnpw==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3",
        "side-channel-list": "^1.0.0",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/qs/node_modules/side-channel-list": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.0.tgz",
      "integrity": "sha512-FCLHtRD/gnpCiCHEiJLOwdmFP+wzCmDEkc9y7NsYxeF4u7Btsn1ZuwgwJGxImImHicJArLP4R0yX4c2KCrMrTA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/qs/node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/qs/node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/range-parser": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
      "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/safe-buffer": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
      "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/send": {
      "version": "0.19.2",
      "resolved": "https://registry.npmjs.org/send/-/send-0.19.2.tgz",
      "integrity": "sha512-VMbMxbDeehAxpOtWJXlcUS5E8iXh6QmN+BkRX1GARS3wRaXEEgzCcB10gTQazO42tpNIya8xIyNx8fll1OFPrg==",
      "license": "MIT",
      "dependencies": {
        "debug": "2.6.9",
        "depd": "2.0.0",
        "destroy": "1.2.0",
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "fresh": "~0.5.2",
        "http-errors": "~2.0.1",
        "mime": "1.6.0",
        "ms": "2.1.3",
        "on-finished": "~2.4.1",
        "range-parser": "~1.2.1",
        "statuses": "~2.0.2"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/send/node_modules/destroy": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.2.0.tgz",
      "integrity": "sha512-2sJGJTaXIIaR1w4iJSNoN0hnMY7Gpc/n8D4qSCJw8QqFWXf7cuAgnEHxBpweaVcPevC2l3KpjYCx3NypQQgaJg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8",
        "npm": "1.2.8000 || >= 1.4.16"
      }
    },
    "node_modules/send/node_modules/mime": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
      "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==",
      "license": "MIT",
      "bin": {
        "mime": "cli.js"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/send/node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/serve-static": {
      "version": "1.16.3",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.16.3.tgz",
      "integrity": "sha512-x0RTqQel6g5SY7Lg6ZreMmsOzncHFU7nhnRWkKgWuMTu5NN0DR5oruckMqRvacAN9d5w6ARnRBXl9xhDCgfMeA==",
      "license": "MIT",
      "dependencies": {
        "encodeurl": "~2.0.0",
        "escape-html": "~1.0.3",
        "parseurl": "~1.3.3",
        "send": "~0.19.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/setprototypeof": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
      "license": "ISC"
    },
    "node_modules/statuses": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.2.tgz",
      "integrity": "sha512-DvEy55V3DB7uknRo+4iOGT5fP1slR8wQohVdknigZPMpMstaKJQWhwiYBACJE3Ul2pTnATihhBYnRhZQHGBiRw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/type-is": {
      "version": "1.6.18",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
      "integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
      "license": "MIT",
      "dependencies": {
        "media-typer": "0.3.0",
        "mime-types": "~2.1.24"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/type-is/node_modules/media-typer": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
      "integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/type-is/node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/type-is/node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/undici-types": {
      "version": "7.16.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.16.0.tgz",
      "integrity": "sha512-Zz+aZWSj8LE6zoxD+xrjh4VfkIG8Ya6LvYkZqtUQGJPZjYl53ypCaUwWqo7eI0x66KBGeRo+mlBEkMSeSZ38Nw==",
      "license": "MIT"
    },
    "node_modules/utils-merge": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
      "integrity": "sha512-pMZTvIkT1d+TFGvDOqodOclx0QWkkgi6Tdoa8gC8ffGAAqz9pzPTZWAybbsHHoED/ztMtkv/VoYTYyShUn81hA==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4.0"
      }
    },
    "node_modules/uuid": {
      "version": "9.0.1",
      "resolved": "https://registry.npmjs.org/uuid/-/uuid-9.0.1.tgz",
      "integrity": "sha512-b+1eJOlsR9K8HJpow9Ok3fiWOWSIcIzXodvv0rQjVoOVNpWMpxf1wZNpt4y9h10odCNrqnYp1OBzRktckBe3sA==",
      "funding": [
        "https://github.com/sponsors/broofa",
        "https://github.com/sponsors/ctavan"
      ],
      "license": "MIT",
      "bin": {
        "uuid": "dist/bin/uuid"
      }
    },
    "node_modules/vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    }
  }
}

````

## functions/package.json
````text
{
  "name": "admin-api",
  "private": true,
  "engines": {
    "node": "18"
  },
  "main": "lib/index.js",
  "scripts": {
    "build": "tsc",
    "serve": "npm run build && firebase emulators:start --only functions",
    "deploy": "firebase deploy --only functions"
  },
  "dependencies": {
    "express": "^4.18.2",
    "firebase-admin": "^11.10.1",
    "firebase-functions": "^4.4.1"
  },
  "devDependencies": {
    "@types/body-parser": "^1.19.6",
    "@types/connect": "^3.4.38",
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.6",
    "@types/express-serve-static-core": "^5.1.0",
    "@types/glob": "^8.1.0",
    "@types/http-errors": "^2.0.5",
    "@types/ms": "^2.1.0",
    "@types/node": "^25.0.3",
    "@types/qs": "^6.14.0",
    "@types/range-parser": "^1.2.7",
    "@types/serve-static": "^2.2.0",
    "typescript": "^5.3.3"
  }
}

````

## functions/README.md
````text
# Hướng dẫn test nhanh (P0)

## 1) Test không có token (bị chặn)
```bash
curl -i https://<your-host>/admin/ping
```
Kỳ vọng: HTTP 401 hoặc 403, message tiếng Việt.

## 2) Test token giả (bị chặn)
```bash
curl -i \
  -H "Authorization: Bearer FAKE_TOKEN" \
  https://<your-host>/admin/ping
```
Kỳ vọng: HTTP 401 hoặc 403, message tiếng Việt.

## 3) Test token thật (P1)
Hiện client chưa có firebaseConfig ở môi trường production.  
P1 sẽ bổ sung luồng lấy ID token thật từ client admin.


````

## functions/src/index.ts
````text
import { onRequest } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import express from "express";
import { randomUUID } from "crypto";

admin.initializeApp();

const db = admin.firestore();
const app = express();

app.use(express.json({ limit: "1mb" }));
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

const getRequestId = (req: express.Request) =>
  (req.header("x-request-id") || req.header("x-correlation-id") || null) ?? randomUUID();

const writeAuditLog = async (payload: Record<string, unknown>) => {
  try {
    await db.collection("adminAuditLogs").add({
      ...payload,
      ts: admin.firestore.FieldValue.serverTimestamp()
    });
  } catch (_err) {
    // Không chặn phản hồi nếu log thất bại.
  }
};

const toIsoOrNull = (value?: string) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const redact = (input: unknown): unknown => {
  if (!input || typeof input !== "object") return input;
  if (Array.isArray(input)) return input.map(redact);
  const blocked = ["token", "email", "password", "secret"];
  const result: Record<string, unknown> = {};
  Object.entries(input as Record<string, unknown>).forEach(([key, value]) => {
    const lower = key.toLowerCase();
    if (blocked.some((k) => lower.includes(k))) return;
    result[key] = redact(value);
  });
  return result;
};

const pickPackSnapshot = (data?: admin.firestore.DocumentData | null) => {
  if (!data) return null;
  return {
    title: data.title || "",
    description: data.description || "",
    status: data.status || "",
    dueAt: data.dueAt || null,
    updatedAt: data.updatedAt || null
  };
};

const getIdempotencyDoc = (uid: string, key: string, pathKey: string) =>
  db.doc(`adminIdempotency/${uid}__${key}__${pathKey}`);

const requireAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.header("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const requestId = getRequestId(req);
  const baseAudit = {
    requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.header("user-agent") || ""
  };

  if (!token) {
    await writeAuditLog({ ...baseAudit, status: 401, uid: null, result: "MISSING_TOKEN" });
    return res.status(401).json({ ok: false, message: "Thiếu ID token. Vui lòng đăng nhập." });
  }

  let decoded: admin.auth.DecodedIdToken;
  try {
    decoded = await admin.auth().verifyIdToken(token);
  } catch (_err) {
    await writeAuditLog({ ...baseAudit, status: 401, uid: null, result: "INVALID_TOKEN" });
    return res.status(401).json({ ok: false, message: "ID token không hợp lệ." });
  }

  const uid = decoded.uid;
  try {
    const adminDoc = await db.doc(`admins/${uid}`).get();
    if (!adminDoc.exists) {
      await writeAuditLog({ ...baseAudit, status: 403, uid, result: "NOT_ADMIN" });
      return res.status(403).json({ ok: false, message: "Bạn không có quyền truy cập admin." });
    }
  } catch (_err) {
    await writeAuditLog({ ...baseAudit, status: 403, uid, result: "ADMIN_CHECK_FAILED" });
    return res.status(403).json({ ok: false, message: "Không thể xác minh quyền admin." });
  }

  res.locals.uid = uid;
  res.locals.requestId = requestId;
  return next();
};

app.get("/admin/ping", requireAdmin, async (req, res) => {
  const uid = res.locals.uid as string;
  await writeAuditLog({
    requestId: res.locals.requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.header("user-agent") || "",
    status: 200,
    uid,
    result: "OK"
  });
  return res.status(200).json({ ok: true, uid, role: "admin", message: "Admin API hoạt động" });
});

app.get("/admin/decision-packs", requireAdmin, async (req, res) => {
  const uid = res.locals.uid as string;
  const limit = Math.min(Number(req.query.limit) || 50, 200);
  const status = typeof req.query.status === "string" ? req.query.status : null;
  let query: FirebaseFirestore.Query = db.collection("decisionPacks").orderBy("createdAt", "desc").limit(limit);
  if (status) {
    query = query.where("status", "==", status);
  }

  const snap = await query.get();
  const packs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  await writeAuditLog({
    requestId: res.locals.requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.header("user-agent") || "",
    status: 200,
    uid,
    result: "LIST_DECISION_PACKS"
  });
  return res.status(200).json({ ok: true, items: packs });
});

app.post("/admin/decision-packs", requireAdmin, async (req, res) => {
  const uid = res.locals.uid as string;
  const { title, description, dueAt } = req.body || {};
  if (!title || typeof title !== "string") {
    return res.status(400).json({ ok: false, message: "Thiếu tiêu đề gói quyết định." });
  }
  const cleanTitle = title.trim();
  if (!cleanTitle) {
    return res.status(400).json({ ok: false, message: "Tiêu đề không hợp lệ." });
  }

  const idempotencyKey = String(req.header("Idempotency-Key") || "").trim();
  if (!idempotencyKey) {
    return res.status(400).json({ ok: false, message: "Thiếu Idempotency-Key để chống tạo trùng." });
  }
  const pathKey = "decision-packs-create";
  const idemRef = getIdempotencyDoc(uid, idempotencyKey, pathKey);
  const idemSnap = await idemRef.get();
  if (idemSnap.exists) {
    const data = idemSnap.data() || {};
    const packId = data.packId || "";
    if (packId) {
      const packSnap = await db.doc(`decisionPacks/${packId}`).get();
      await writeAuditLog({
        requestId: res.locals.requestId,
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.header("user-agent") || "",
        status: 200,
        uid,
        result: "IDEMPOTENT_HIT",
        after: redact({ packId })
      });
      return res.status(200).json({ ok: true, item: { id: packSnap.id, ...packSnap.data() } });
    }
  }

  const dueIso = toIsoOrNull(dueAt);
  const now = admin.firestore.FieldValue.serverTimestamp();
  const docRef = await db.collection("decisionPacks").add({
    title: cleanTitle,
    description: typeof description === "string" ? description.trim() : "",
    status: "pending",
    dueAt: dueIso,
    createdBy: uid,
    createdAt: now,
    updatedAt: now
  });

  await idemRef.set({
    uid,
    packId: docRef.id,
    createdAt: now
  });

  const packSnap = await docRef.get();
  await writeAuditLog({
    requestId: res.locals.requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.header("user-agent") || "",
    status: 201,
    uid,
    result: "CREATE_DECISION_PACK",
    after: redact(pickPackSnapshot(packSnap.data()))
  });
  return res.status(201).json({ ok: true, item: { id: docRef.id, ...packSnap.data() } });
});

app.patch("/admin/decision-packs/:id", requireAdmin, async (req, res) => {
  const uid = res.locals.uid as string;
  const packId = req.params.id;
  const packRef = db.doc(`decisionPacks/${packId}`);
  const packSnap = await packRef.get();
  if (!packSnap.exists) {
    return res.status(404).json({ ok: false, message: "Không tìm thấy gói quyết định." });
  }

  const { title, description, dueAt, status } = req.body || {};
  const nextStatus = typeof status === "string" ? status : null;
  const allowedStatus = ["pending", "approved", "rejected", "expired"];
  if (nextStatus && !allowedStatus.includes(nextStatus)) {
    return res.status(400).json({ ok: false, message: "Trạng thái không hợp lệ." });
  }
  const dueIso = toIsoOrNull(dueAt);
  const updatePayload: Record<string, unknown> = {
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };
  if (typeof title === "string") updatePayload.title = title.trim();
  if (typeof description === "string") updatePayload.description = description.trim();
  if (dueAt !== undefined) updatePayload.dueAt = dueIso;
  if (nextStatus) {
    updatePayload.status = nextStatus;
    updatePayload.decidedBy = nextStatus === "approved" || nextStatus === "rejected" ? uid : null;
    updatePayload.decidedAt = nextStatus === "approved" || nextStatus === "rejected"
      ? admin.firestore.FieldValue.serverTimestamp()
      : null;
  }

  const before = pickPackSnapshot(packSnap.data());
  await packRef.set(updatePayload, { merge: true });
  const afterSnap = await packRef.get();
  await writeAuditLog({
    requestId: res.locals.requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.header("user-agent") || "",
    status: 200,
    uid,
    result: "UPDATE_DECISION_PACK",
    before: redact(before),
    after: redact(pickPackSnapshot(afterSnap.data()))
  });
  return res.status(200).json({ ok: true, item: { id: afterSnap.id, ...afterSnap.data() } });
});

app.get("/admin/audit-logs", requireAdmin, async (req, res) => {
  const uid = res.locals.uid as string;
  const limit = Math.min(Number(req.query.limit) || 50, 200);
  const snap = await db.collection("adminAuditLogs").orderBy("ts", "desc").limit(limit).get();
  const logs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  await writeAuditLog({
    requestId: res.locals.requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.header("user-agent") || "",
    status: 200,
    uid,
    result: "LIST_AUDIT_LOGS"
  });
  return res.status(200).json({ ok: true, items: logs });
});

app.all("/admin/*", requireAdmin, async (req, res) => {
  await writeAuditLog({
    requestId: res.locals.requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.header("user-agent") || "",
    status: 404,
    uid: res.locals.uid || null,
    result: "NOT_FOUND"
  });
  return res.status(404).json({ ok: false, message: "Không tìm thấy API admin." });
});

export const adminApi = onRequest(app);

export const telemetryIngest = onRequest({ cors: true }, async (req, res) => {
  res.set("Cache-Control", "no-store");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Chỉ hỗ trợ POST." });
  }

  const body = req.body || {};
  const counts = body.counts || {};
  const allowed = ["search_start", "search_result", "pin", "copy", "save"];
  const increments: Record<string, admin.firestore.FieldValue> = {};
  allowed.forEach((key) => {
    const value = Number(counts[key] || 0);
    if (value > 0) increments[key] = admin.firestore.FieldValue.increment(value);
  });

  if (!Object.keys(increments).length) {
    return res.status(200).json({ ok: true, message: "Không có dữ liệu cập nhật." });
  }

  const dateKey = formatDateBangkok(new Date());
  const ref = db.doc(`metrics_daily/${dateKey}`);
  await ref.set({
    date: dateKey,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    ...increments
  }, { merge: true });

  return res.status(200).json({ ok: true });
});

function formatDateBangkok(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return formatter.format(date);
}

export const dailyAdminReport = onSchedule(
  { schedule: "5 0 * * *", timeZone: "Asia/Bangkok" },
  async () => {
    const todayKey = formatDateBangkok(new Date());
  const reportRef = db.doc(`adminReports/daily/${todayKey}`);
  const exists = await reportRef.get();
  if (exists.exists) return;

  const [packsSnap, logsSnap, authErrorSnap] = await Promise.all([
    db.collection("decisionPacks").get(),
    db.collection("adminAuditLogs").get(),
    db.collection("adminAuditLogs").where("status", "in", [401, 403]).get()
  ]);

  const payload = {
    date: todayKey,
    decisionPacksCount: packsSnap.size,
    auditLogsCount: logsSnap.size,
    authDeniedCount: authErrorSnap.size,
    generatedAt: admin.firestore.FieldValue.serverTimestamp(),
    note: "Báo cáo tự động theo ngày (Asia/Bangkok)"
  };

  await reportRef.set(payload, { merge: true });
  await writeAuditLog({
    requestId: "SYSTEM",
    method: "SCHEDULE",
    path: "dailyAdminReport",
    ip: "",
    userAgent: "scheduler",
    status: 200,
    uid: "SYSTEM",
    result: "DAILY_REPORT",
    after: redact(payload)
  });
});

````

## functions/tsconfig.json
````text
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "lib",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}

````

## i18n.js
````text
(() => {
  const storageKey = "tc_lang";
  const defaultLang = "vi";
  const locales = {
    vi: {
      common: {
        open: "Mở",
        soon: "Sắp ra mắt",
        copy: "Sao chép",
        close: "Đóng",
        or: "Hoặc"
      },
        topbar: {
          brand: "SpaceColors · 8Portal",
          slogan: "Một chạm mở không gian màu vô hạn",
          nav: {
            community: "Cộng đồng",
            spaces: "Không gian"
          },
                    portal: {
            placeholder: "Ch?n Th? gi?i",
            threadcolor: "Th? gi?i m?u th?u",
            palette: "Th? gi?i d?i m?u",
            soon: "S?p ra m?t"
          },
          communityContribute: "Đóng góp dữ liệu",
          communityVerify: "Xác minh",
          spaceVault: "Kho chỉ",
        spaceLibrary: "Kết quả đã lưu"
        },
        vault: {
          title: "Kho chỉ",
          desc: "Không gian này đang được hoàn thiện. Quay lại sau nhé.",
          tabSaved: "Kết quả đã lưu",
          tabStock: "Tồn kho",
          stockPlaceholder: "Tồn kho đang được chuẩn bị.",
          stock: {
            ctaTitle: "Đăng nhập để dùng Tồn kho",
            ctaDesc: "Quản lý tồn kho cá nhân theo tài khoản.",
            ctaAction: "Đăng nhập",
            search: "Tìm theo hãng/mã/tên/hex",
            add: "Thêm",
            import: "Nhập CSV",
            export: "Xuất CSV",
            summaryItems: "Tổng mã",
            summaryQty: "Tổng số lượng",
            summaryLow: "Sắp hết",
            table: {
              swatch: "Màu",
              brand: "Hãng",
              code: "Mã",
              name: "Tên",
              qty: "SL",
              unit: "Đơn vị",
              location: "Vị trí",
              updated: "Cập nhật",
              actions: "Thao tác"
            },
            empty: "Chưa có dữ liệu tồn kho.",
            modalAdd: "Thêm tồn kho",
            modalEdit: "Sửa tồn kho",
            modalSave: "Lưu",
            modalCancel: "Huỷ",
            fields: {
              brand: "Hãng",
              code: "Mã",
              name: "Tên",
              hex: "Hex",
              qty: "Số lượng",
              unit: "Đơn vị",
              location: "Vị trí",
              minQty: "Tồn tối thiểu",
              note: "Ghi chú"
            },
            actionEdit: "Sửa",
            actionDelete: "Xoá",
            confirmDelete: "Xoá mục này?"
          }
        },
      hero: {
        title: "Không gian chuẩn hóa màu của bạn",
        desc: "8 cổng tính năng dẫn bạn đến 8 Thế giới sắc màu — mỗi Thế giới là một công cụ riêng.\nThế giới màu chỉ: Chọn màu/HEX/ảnh → Mã chỉ đa hãng → Dùng ngay cho sản xuất.\nThế giới dải màu (sắp ra mắt): Tạo dải màu → Lưu bộ sưu tập → Xuất dữ liệu theo nhu cầu.\n6 Thế giới còn lại đang chuẩn bị. Khám phá cảm hứng và tạo không gian màu mang bản sắc của bạn.",
        ctaPrimary: "Mở công cụ",
        ctaSecondary: "Khám phá Thế giới"
      },
      portalHub: {
        title: "8 Cổng SpaceColors",
        desc: "Chọn cổng để bước vào một Thế giới sắc màu khác.",
        gates: {
          threadcolor: {
            title: "Thế giới màu chỉ",
            desc: "Tra cứu mã chỉ theo ảnh, màu và mã.",
            cta: "Mở"
          },
          palette: {
            title: "Thế giới dải màu",
            desc: "Khám phá bảng màu theo dải và cảm xúc.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          gem: {
            title: "Thế giới ngọc",
            desc: "Tông màu quý, ánh kim và chiều sâu.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          silk: {
            title: "Thế giới tơ lụa",
            desc: "Bảng màu mềm, mịn và mơ màng.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          craft: {
            title: "Thế giới thủ công",
            desc: "Sắc màu truyền thống, ấm và gần gũi.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          light: {
            title: "Thế giới ánh sáng",
            desc: "Dải màu rực rỡ, phản quang và sáng bừng.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          minimal: {
            title: "Thế giới tối giản",
            desc: "Bảng màu tối giản, tinh gọn và sang.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          memory: {
            title: "Thế giới ký ức",
            desc: "Màu sắc hoài niệm và chất liệu xưa.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          }
        }
      },
      quick: {
        title: "Hành động nhanh",
        desc: "Truy cập nhanh các tác vụ chính của 8Portal.",
        items: {
          threadcolor: {
            title: "Tra mã chỉ",
            desc: "Tra cứu màu chỉ theo ảnh, mã hoặc màu chọn.",
            cta: "Mở công cụ"
          },
          library: {
            title: "Thư viện",
            desc: "Lưu và xem lại các lần tra cứu của bạn.",
            cta: "Sắp ra mắt"
          },
          contribute: {
            title: "Đóng góp dữ liệu",
            desc: "Gửi màu và mã chỉ mới cho cộng đồng.",
            cta: "Bắt đầu"
          },
          verify: {
            title: "Xác minh",
            desc: "Dành cho admin duyệt dữ liệu cộng đồng.",
            cta: "Đi tới"
          }
        }
      },
      roulette: {
        title: "Vòng quay dải màu",
        desc: "Chọn ngẫu nhiên một bộ màu nhấn để khám phá nhanh.",
        spin: "Quay màu",
        reset: "Đặt lại"
      },
      forge: {
        title: "Lò rèn bảng màu",
        desc: "Tuỳ chỉnh bộ màu nhấn để phù hợp với gu của bạn.",
        a1: { label: "Màu nhấn 1" },
        a2: { label: "Màu nhấn 2" },
        a3: { label: "Màu nhấn 3" },
        preview: "Xem trước gradient",
        copy: "Sao chép CSS"
      },
      gallery: {
        title: "Bộ sưu tập sắc thái",
        desc: "8 sắc thái cảm giác.",
        activate: "Kích hoạt",
        aria: {
          nebula: "Kích hoạt Thế giới: Tinh vân",
          ocean: "Kích hoạt Thế giới: Đại dương",
          ink: "Kích hoạt Thế giới: Mực tàu",
          origami: "Kích hoạt Thế giới: Origami",
          arcade: "Kích hoạt Thế giới: Arcade",
          dunes: "Kích hoạt Thế giới: Đồi cát",
          chrome: "Kích hoạt Thế giới: Chrome",
          circuit: "Kích hoạt Thế giới: Mạch điện"
        }
      },
      footer: {
        left: "8Portal v4 · Khung A1→A3",
        right: "Token Thế giới đã sẵn sàng"
      },
      toast: {
        copied: "Đã sao chép!"
      },
      worlds: {
        nebula: {
          label: "Tinh vân",
          desc: "Tinh vân huyền ảo, ánh tím xanh sâu thẳm."
        },
        ocean: {
          label: "Đại dương",
          desc: "Đại dương mát lạnh, cảm giác trong trẻo."
        },
        ink: {
          label: "Mực tàu",
          desc: "Tối giản, mực tàu và độ sâu."
        },
        origami: {
          label: "Origami",
          desc: "Giấy gấp, ấm áp và nhẹ nhàng."
        },
        arcade: {
          label: "Arcade",
          desc: "Neon năng lượng, nhịp nhanh."
        },
        dunes: {
          label: "Đồi cát",
          desc: "Sa mạc, nắng vàng, yên tĩnh."
        },
        chrome: {
          label: "Chrome",
          desc: "Kim loại sáng, chuẩn xác, sạch."
        },
        circuit: {
          label: "Mạch điện",
          desc: "Mạch điện, xanh lục kỹ thuật."
        }
      },
      tc: {
        title: "Tra mã chỉ thêu theo màu",
        status: {
          loading: "Đang chuẩn bị dữ liệu...",
          ready: "Xong. Dữ liệu đã sẵn sàng.",
          empty: "Chưa chọn màu — hãy chọn màu trực tiếp hoặc từ ảnh.",
          noResults: "Không tìm thấy kết quả trong ngưỡng ΔE hiện tại. Thử tăng ΔE hoặc chọn thêm hãng.",
          error: "Lỗi tải dữ liệu. Vui lòng thử lại.",
          retry: "Thử lại"
        },
        result: {
          chosen: "Màu đã chọn",
          group: "Nhóm {index}",
          colors: "{count} màu",
          save: "Lưu",
          saved: "Đã lưu",
          saving: "Đang lưu...",
          noDataSave: "Không có dữ liệu để lưu.",
          loadMore: "Xem thêm ({count})",
          copyCode: "Sao chép mã",
          copyFull: "Sao chép đầy đủ"
        },
        pin: {
          pin: "Ghim",
          unpin: "Bỏ ghim",
          limit: "Chỉ ghim tối đa {count} kết quả.",
          panelTitle: "So sánh đã ghim",
          clear: "Xoá tất cả ghim",
          remove: "Bỏ ghim",
          copyCode: "Sao chép mã"
        },
        project: {
          label: "Dự án",
          placeholder: "Nhập tên dự án",
          recent: "Gần đây"
        },
        library: {
          title: "Kết quả đã lưu",
          loading: "Đang tải...",
          empty: "Chưa có bản lưu",
          open: "Mở",
          export: "Xuất CSV",
          exported: "Đã xuất CSV",
          error: "Không tải được thư viện",
          loadedFrom: "Đã tải từ Kết quả đã lưu {stamp}"
        },
        inspector: {
          copyAllLabel: "Tất cả"
        },
        toast: {
          copied: "Đã sao chép!",
          copiedWith: "Đã sao chép {label}."
        },
        action: {
          close: "Đóng"
        },
        auth: {
          needLogin: "Cần đăng nhập để tiếp tục.",
          needLoginSave: "Cần đăng nhập để lưu.",
          needLoginLibrary: "Cần đăng nhập để xem Đã lưu.",
          needLoginOpen: "Cần đăng nhập để mở.",
          needLoginContribute: "Cần đăng nhập để đóng góp dữ liệu.",
          needLoginVerify: "Cần đăng nhập để xác minh."
        },
        verify: {
          submitted: "Đã gửi, chờ xác minh"
        },
        section: {
          brand: {
            title: "Chọn hãng chỉ",
            verified: "Chỉ đã xác minh"
          },
          delta: {
            title: "Độ tương đồng màu (ΔE)",
            method: "Phương pháp ΔE",
            method76: "Cơ bản (ΔE76)",
            method2000: "Chuẩn hơn (CIEDE2000)",
            low: "Rất giống",
            high: "Khác hẳn"
          },
          pick: {
            title: "Chọn màu trực tiếp",
            nearest: "Tìm mã chỉ gần nhất",
            pick: "Chọn màu",
            hint: "Bấm vào bất kỳ đâu để chọn màu (Esc để hủy)",
            fallback: "Trình duyệt chưa hỗ trợ chọn màu toàn màn hình. Dùng input màu bên dưới."
          },
          image: {
            title: "Chọn màu từ ảnh",
            helper: "Chọn ảnh và bấm vào bất kỳ điểm nào để lấy màu"
          },
          code: {
            title: "Tra ngược theo mã chỉ",
            placeholder: "Nhập mã (VD: DMC 310)",
            action: "Tra cứu"
          }
        },
        inspector: {
          title: "Bảng thông tin màu",
          light: "Nền sáng",
          dark: "Nền tối",
          brand: "Hãng",
          code: "Mã chỉ",
          name: "Tên màu",
          delta: "Độ lệch (ΔE)",
          values: "Giá trị màu",
          copyAll: "Sao chép tất cả",
          rgbString: "Chuỗi RGB",
          close: "Đóng"
        },
        auth: {
          login: "Đăng nhập",
          register: "Đăng ký",
          email: "Địa chỉ email",
          password: "Mật khẩu",
          confirm: "Xác nhận mật khẩu",
          forgot: "Quên mật khẩu?",
          create: "Tạo tài khoản",
          google: "Tiếp tục với Google",
          facebook: "Tiếp tục với Facebook",
          close: "Đóng"
        },
        account: {
          library: "Bảng điều khiển",
          contribute: "Đóng góp dữ liệu",
          verify: "Xác minh",
          manage: "Quản lý tài khoản (sắp ra mắt)",
          logout: "Đăng xuất",
          login: "Đăng nhập"
        },
        library: {
          title: "Kết quả đã lưu",
          loading: "Đang tải..."
        },
        contribute: {
          title: "Đóng góp dữ liệu",
          brand: "Hãng",
          brandSelect: "Chọn hãng",
          brandCustom: "Hoặc nhập hãng mới",
          code: "Mã chỉ",
          name: "Tên màu (tuỳ chọn)",
          hex: "Hex",
          useCurrent: "Dùng màu hiện tại",
          cancel: "Huỷ",
          submit: "Gửi"
        },
        verify: {
          title: "Xác minh dữ liệu",
          loading: "Đang tải..."
        },
        buttons: {
          copy: "Sao chép"
        }
      }
    }
  };

  const state = {
    lang: defaultLang
  };

  const getByPath = (obj, path) => {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
  };

  const formatParams = (text, params) => {
    if (!params) return text;
    return Object.keys(params).reduce((acc, key) => {
      return acc.replace(new RegExp(`\\{${key}\\}`, "g"), params[key]);
    }, text);
  };

  const normalizeText = (value) => {
    if (typeof value !== "string") return value;
    return value.normalize("NFC");
  };

  const getLocale = (lang) => locales[lang] || locales[defaultLang];

  const t = (key, fallback = "", params) => {
    const dict = getLocale(state.lang);
    const value = getByPath(dict, key);
    if (value === null || value === undefined) return fallback;
    if (typeof value !== "string") return fallback;
    return formatParams(value, params);
  };

  const apply = (lang) => {
    if (lang) state.lang = lang;
    document.documentElement.setAttribute("lang", state.lang || defaultLang);
    const dict = getLocale(state.lang);
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const value = getByPath(dict, node.getAttribute("data-i18n"));
      if (value) node.textContent = normalizeText(value);
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
      const raw = node.getAttribute("data-i18n-attr") || "";
      raw.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((item) => item.trim()).filter(Boolean);
        if (!attr || !key) return;
        const value = getByPath(dict, key);
        if (value) node.setAttribute(attr, normalizeText(value));
      });
    });
    document.querySelectorAll("[data-world-label]").forEach((node) => {
      const key = node.getAttribute("data-world-label");
      const label = dict.worlds?.[key]?.label;
      if (label) node.textContent = normalizeText(label);
    });
    document.querySelectorAll("[data-world-desc]").forEach((node) => {
      const key = node.getAttribute("data-world-desc");
      const desc = dict.worlds?.[key]?.desc;
      if (desc) node.textContent = normalizeText(desc);
    });
    document.querySelectorAll("#worldMenu [data-world]").forEach((node) => {
      const key = node.getAttribute("data-world");
      const label = dict.worlds?.[key]?.label;
      if (label) node.textContent = normalizeText(label);
    });
    const currentWorld = document.documentElement?.dataset?.world;
    if (currentWorld) {
      const label = dict.worlds?.[currentWorld]?.label;
      const worldLabel = document.getElementById("worldLabel");
      if (label && worldLabel) worldLabel.textContent = normalizeText(label);
    }
  };

  const setLang = (lang) => {
    state.lang = lang || defaultLang;
    try {
      localStorage.setItem(storageKey, state.lang);
    } catch (err) {}
    apply();
  };

  const extendLocale = (lang, patch) => {
    if (!lang || !patch) return;
    locales[lang] = { ...(locales[lang] || {}), ...patch };
    if (state.lang === lang) apply();
  };

  const init = () => {
    let stored = null;
    try {
      stored = localStorage.getItem(storageKey);
    } catch (err) {}
    state.lang = stored || defaultLang;
    apply();
  };

  window.tcI18n = {
    t,
    apply,
    setLang,
    extendLocale
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  document.addEventListener("tc-world-changed", () => {
    apply();
  });
})();

````

## index.html
````text
<!DOCTYPE html>
<html lang="vi" data-world="origami">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>8Portal v4</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --bg: #f6f1e9;
      --text: #201a14;
      --muted: #6b5d4b;
      --glass: rgba(255, 255, 255, 0.72);
      --stroke: rgba(32, 26, 20, 0.08);
      --a1: #c27b4b;
      --a2: #d59e6d;
      --a3: #8c6d54;
    }
    html[data-world="nebula"] {
      --bg:
        radial-gradient(circle, rgba(255,255,255,.26) 0 1px, transparent 1.2px) 0 0/ 160px 160px repeat,
        radial-gradient(circle, rgba(255,255,255,.14) 0 1px, transparent 1.2px) 60px 90px/ 260px 260px repeat,
        repeating-linear-gradient(135deg, rgba(110,231,255,.045) 0 1px, transparent 1px 10px) 0 0/ 420px 420px repeat,
        radial-gradient(1200px circle at 18% 12%, rgba(110,231,255,.26), transparent 60%) 50% 50%/ cover no-repeat,
        radial-gradient(1100px circle at 86% 22%, rgba(139,92,246,.26), transparent 62%) 50% 50%/ cover no-repeat,
        radial-gradient(900px circle at 62% 88%, rgba(244,114,182,.20), transparent 62%) 50% 50%/ cover no-repeat,
        conic-gradient(from 220deg at 60% 35%, rgba(139,92,246,.18), transparent 30%, rgba(110,231,255,.14), transparent 62%, rgba(244,114,182,.16)) 50% 50%/ cover no-repeat,
        radial-gradient(1600px circle at 50% 55%, rgba(0,0,0,0) 0 55%, rgba(0,0,0,.55) 100%) 50% 50%/ cover no-repeat,
        #040512;
      --text: #eef2ff;
      --muted: #b8c2ff;
      --glass: rgba(12, 16, 34, 0.72);
      --stroke: rgba(255, 255, 255, 0.14);
      --a1: #6ee7ff;
      --a2: #8b5cf6;
      --a3: #f472b6;
    }
    html[data-world="ocean"] {
      --bg:
        radial-gradient(circle, rgba(255,255,255,.22) 0 2px, transparent 2.6px) 0 0/ 220px 220px repeat,
        repeating-linear-gradient(160deg, rgba(255,255,255,.10) 0 2px, transparent 2px 14px) 0 0/ 520px 520px repeat,
        radial-gradient(1100px circle at 18% 14%, rgba(31,182,255,.24), transparent 62%) 50% 50%/ cover no-repeat,
        radial-gradient(1000px circle at 86% 28%, rgba(14,165,168,.20), transparent 64%) 50% 50%/ cover no-repeat,
        radial-gradient(900px circle at 52% 90%, rgba(77,212,255,.18), transparent 64%) 50% 50%/ cover no-repeat,
        linear-gradient(180deg, rgba(255,255,255,.68), rgba(255,255,255,0) 45%) 50% 50%/ cover no-repeat,
        conic-gradient(from 200deg at 50% 10%, rgba(77,212,255,.22), transparent 35%, rgba(31,182,255,.14), transparent 70%, rgba(14,165,168,.14)) 50% 50%/ cover no-repeat,
        radial-gradient(1600px circle at 50% 0%, rgba(255,255,255,.55), transparent 55%) 50% 50%/ cover no-repeat,
        #dff6ff;
      --text: #062a3a;
      --muted: #3f6b7f;
      --glass: rgba(255, 255, 255, 0.76);
      --stroke: rgba(6, 42, 58, 0.12);
      --a1: #1fb6ff;
      --a2: #0ea5a8;
      --a3: #4dd4ff;
    }
    html[data-world="ink"] {
      --bg:
        repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 1px, transparent 1px 6px) 0 0/ 100% 100% repeat,
        repeating-linear-gradient(90deg, rgba(255,255,255,.018) 0 1px, transparent 1px 10px) 0 0/ 100% 100% repeat,
        radial-gradient(1200px circle at 20% 20%, rgba(226,232,240,.10), transparent 62%) 50% 50%/ cover no-repeat,
        radial-gradient(1000px circle at 82% 26%, rgba(148,163,184,.10), transparent 66%) 50% 50%/ cover no-repeat,
        radial-gradient(850px circle at 52% 92%, rgba(100,116,139,.12), transparent 66%) 50% 50%/ cover no-repeat,
        radial-gradient(1400px circle at 50% 55%, rgba(0,0,0,0) 0 52%, rgba(0,0,0,.62) 100%) 50% 50%/ cover no-repeat,
        linear-gradient(180deg, #0b0d12, #07080c) 50% 50%/ cover no-repeat;
      --text: #f4f6fb;
      --muted: #a6afbd;
      --glass: rgba(16, 18, 24, 0.76);
      --stroke: rgba(255, 255, 255, 0.12);
      --a1: #e2e8f0;
      --a2: #94a3b8;
      --a3: #64748b;
    }
    html[data-world="origami"] {
      --bg:
        repeating-linear-gradient(0deg, rgba(32,26,20,.025) 0 1px, transparent 1px 7px) 0 0/ 100% 100% repeat,
        repeating-linear-gradient(90deg, rgba(32,26,20,.018) 0 1px, transparent 1px 11px) 0 0/ 100% 100% repeat,
        linear-gradient(135deg, rgba(255,255,255,.62), rgba(255,255,255,0) 48%) 50% 50%/ cover no-repeat,
        linear-gradient(315deg, rgba(140,109,84,.10), transparent 55%) 50% 50%/ cover no-repeat,
        radial-gradient(1000px circle at 22% 16%, rgba(194,123,75,.18), transparent 64%) 50% 50%/ cover no-repeat,
        radial-gradient(950px circle at 84% 26%, rgba(213,158,109,.16), transparent 66%) 50% 50%/ cover no-repeat,
        radial-gradient(900px circle at 52% 92%, rgba(140,109,84,.12), transparent 66%) 50% 50%/ cover no-repeat,
        linear-gradient(180deg, #f7f2ea, #f1e6d6) 50% 50%/ cover no-repeat;
      --text: #201a14;
      --muted: #6b5d4b;
      --glass: rgba(255, 255, 255, 0.74);
      --stroke: rgba(32, 26, 20, 0.10);
      --a1: #c27b4b;
      --a2: #d59e6d;
      --a3: #8c6d54;
    }
    html[data-world="arcade"] {
      --bg:
        radial-gradient(circle, rgba(255,255,255,.18) 0 1px, transparent 1.2px) 0 0/ 180px 180px repeat,
        repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 4px) 0 0/ 100% 100% repeat,
        repeating-linear-gradient(90deg, rgba(255,61,205,.05) 0 1px, transparent 1px 18px) 0 0/ 520px 520px repeat,
        radial-gradient(1100px circle at 18% 14%, rgba(255,61,205,.26), transparent 62%) 50% 50%/ cover no-repeat,
        radial-gradient(1050px circle at 86% 18%, rgba(124,58,237,.26), transparent 64%) 50% 50%/ cover no-repeat,
        radial-gradient(950px circle at 52% 92%, rgba(32,227,178,.18), transparent 66%) 50% 50%/ cover no-repeat,
        conic-gradient(from 210deg at 56% 30%, rgba(255,61,205,.18), transparent 28%, rgba(124,58,237,.16), transparent 60%, rgba(32,227,178,.16)) 50% 50%/ cover no-repeat,
        radial-gradient(1600px circle at 50% 55%, rgba(0,0,0,0) 0 54%, rgba(0,0,0,.60) 100%) 50% 50%/ cover no-repeat,
        #05040f;
      --text: #fff7ff;
      --muted: #d8c9f6;
      --glass: rgba(14, 12, 28, 0.80);
      --stroke: rgba(255, 255, 255, 0.16);
      --a1: #ff3dcd;
      --a2: #7c3aed;
      --a3: #20e3b2;
    }
    html[data-world="dunes"] {
      --bg:
        radial-gradient(circle, rgba(255,255,255,.18) 0 2px, transparent 2.6px) 0 0/ 260px 260px repeat,
        repeating-linear-gradient(165deg, rgba(179,116,61,.06) 0 2px, transparent 2px 16px) 0 0/ 680px 680px repeat,
        radial-gradient(1200px circle at 78% 10%, rgba(255,245,215,.75), transparent 60%) 50% 50%/ cover no-repeat,
        radial-gradient(1050px circle at 20% 22%, rgba(211,155,84,.18), transparent 66%) 50% 50%/ cover no-repeat,
        radial-gradient(950px circle at 86% 36%, rgba(227,184,123,.16), transparent 68%) 50% 50%/ cover no-repeat,
        radial-gradient(900px circle at 52% 92%, rgba(179,116,61,.14), transparent 70%) 50% 50%/ cover no-repeat,
        linear-gradient(180deg, #f8f2e3, #f2e4c7) 50% 50%/ cover no-repeat;
      --text: #3a2d1a;
      --muted: #7a644a;
      --glass: rgba(255, 255, 255, 0.74);
      --stroke: rgba(58, 45, 26, 0.12);
      --a1: #d39b54;
      --a2: #e3b87b;
      --a3: #b3743d;
    }
    html[data-world="chrome"] {
      --bg:
        radial-gradient(circle, rgba(255,255,255,.20) 0 2px, transparent 2.6px) 0 0/ 280px 280px repeat,
        repeating-linear-gradient(135deg, rgba(15,23,42,.03) 0 1px, transparent 1px 12px) 0 0/ 720px 720px repeat,
        radial-gradient(1100px circle at 22% 14%, rgba(59,130,246,.14), transparent 66%) 50% 50%/ cover no-repeat,
        radial-gradient(900px circle at 82% 26%, rgba(148,163,184,.16), transparent 68%) 50% 50%/ cover no-repeat,
        linear-gradient(120deg, rgba(255,255,255,.75), rgba(255,255,255,0) 42%) 50% 50%/ cover no-repeat,
        linear-gradient(300deg, rgba(15,23,42,.08), transparent 55%) 50% 50%/ cover no-repeat,
        linear-gradient(180deg, #f6f9ff, #eef3f8) 50% 50%/ cover no-repeat;
      --text: #1c232b;
      --muted: #5f6b79;
      --glass: rgba(255, 255, 255, 0.72);
      --stroke: rgba(28, 35, 43, 0.12);
      --a1: #3b82f6;
      --a2: #94a3b8;
      --a3: #0f172a;
    }
    html[data-world="circuit"] {
      --bg:
        repeating-linear-gradient(0deg, rgba(134,239,172,.06) 0 1px, transparent 1px 18px) 0 0/ 100% 100% repeat,
        repeating-linear-gradient(90deg, rgba(34,197,94,.05) 0 1px, transparent 1px 22px) 0 0/ 100% 100% repeat,
        radial-gradient(circle, rgba(255,255,255,.12) 0 1px, transparent 1.2px) 0 0/ 200px 200px repeat,
        radial-gradient(1100px circle at 20% 14%, rgba(34,197,94,.22), transparent 64%) 50% 50%/ cover no-repeat,
        radial-gradient(1000px circle at 86% 22%, rgba(22,163,74,.20), transparent 66%) 50% 50%/ cover no-repeat,
        radial-gradient(900px circle at 52% 92%, rgba(134,239,172,.16), transparent 68%) 50% 50%/ cover no-repeat,
        conic-gradient(from 220deg at 56% 30%, rgba(34,197,94,.16), transparent 30%, rgba(134,239,172,.12), transparent 62%, rgba(22,163,74,.14)) 50% 50%/ cover no-repeat,
        radial-gradient(1600px circle at 50% 55%, rgba(0,0,0,0) 0 54%, rgba(0,0,0,.58) 100%) 50% 50%/ cover no-repeat,
        #04110a;
      --text: #eafff2;
      --muted: #a6d6bb;
      --glass: rgba(8, 20, 14, 0.76);
      --stroke: rgba(255, 255, 255, 0.12);
      --a1: #22c55e;
      --a2: #16a34a;
      --a3: #86efac;
    }
    body {
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .tc-topbar {
      background: var(--glass);
      border-bottom: 1px solid var(--stroke);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
      position: sticky;
      top: 0;
      z-index: var(--z-topbar, 2000) !important;
      overflow: visible;
    }
    .tc-topbar::after{
      content:"";
      position:absolute; left:0; right:0; bottom:-1px; height:1px;
      background: linear-gradient(90deg, var(--a1), var(--a2), var(--a3));
      opacity: .35;
    }
    #portalMenu,
    #worldMenu{
      z-index: var(--z-topbar-menu, 4000) !important;
    }
    .tc-brand {
      font-weight: 700;
      letter-spacing: -0.01em;
      color: var(--text);
      text-shadow: 0 1px 0 rgba(255,255,255,.15);
    }
    .tc-chip{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
    }
    .tc-chip:hover{ filter: brightness(1.03); }
    .tc-btn{
      border-radius: 0.75rem;
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      font-weight: 650;
      letter-spacing: -0.005em;
      line-height: 1;
      transition: filter .15s ease, transform .05s ease, box-shadow .15s ease;
    }
    .tc-btn:hover{ filter: brightness(1.03); }
    .tc-btn:active{ transform: translateY(1px); }
    .tc-btn:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    .tc-btn-primary{
      background: linear-gradient(135deg, var(--a1), var(--a2));
      color: #fff;
      border: 1px solid rgba(255,255,255,.18);
    }
    .tc-btn-primary:hover{ filter: brightness(1.06); }
    .tc-dot{
      width: 10px; height: 10px; border-radius: 999px;
      background: linear-gradient(135deg, var(--a1), var(--a2), var(--a3));
      box-shadow: 0 0 0 2px rgba(255,255,255,.5);
    }
    .tc-muted{ color: var(--muted); }
    .tc-card{
      background: var(--glass);
      border: 1px solid var(--stroke);
      border-radius: 1rem;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
    }
    .tc-color-input{
      background: var(--glass);
      border: 1px solid var(--stroke);
      border-radius: 0.75rem;
      width: 3rem;
      height: 2.25rem;
      padding: 0.15rem;
    }
    .tc-preview-swatch{
      width: 3rem;
      height: 3rem;
      border-radius: 0.9rem;
      border: 1px solid var(--stroke);
      background: var(--glass);
    }
    .tc-gradient-preview{
      border-radius: 0.9rem;
      border: 1px solid var(--stroke);
      background: linear-gradient(135deg, var(--a1), var(--a2), var(--a3));
      height: 70px;
    }
    .tc-toast{
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 80;
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: 0.9rem;
      padding: 0.6rem 0.9rem;
      box-shadow: 0 16px 40px rgba(0,0,0,.18);
      opacity: 0;
      transform: translateY(6px);
      pointer-events: none;
      transition: opacity .18s ease, transform .18s ease;
    }
    .tc-toast.is-visible{
      opacity: 1;
      transform: translateY(0);
    }
    [data-world-card="1"]{
      cursor: pointer;
      transition: transform .12s ease, box-shadow .18s ease, filter .18s ease;
    }
    [data-world-card="1"]:hover{
      transform: translateY(-1px);
      box-shadow: 0 18px 50px rgba(0,0,0,.16);
      filter: brightness(1.02);
    }
    [data-world-card="1"]:active{
      transform: translateY(1px);
    }
    [data-world-card="1"]:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1), 0 18px 50px rgba(0,0,0,.16);
    }
    #worldMenu[data-open="0"] { display: none; }
    #worldMenu[data-open="1"] { display: block; }
    #worldMenu .tc-world-item{
      color: var(--text);
      transition: background-color .15s ease;
    }
    #worldMenu .tc-world-item:hover{ background: rgba(255,255,255,.10); }
    #worldMenu .tc-world-item:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
      background: rgba(255,255,255,.08);
    }
    .tc-menu[data-open="0"] { display: none; }
    .tc-menu[data-open="1"] { display: block; }
    .tc-menu{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
    }
    .tc-menu-item{
      color: var(--text);
      transition: background-color .15s ease, transform .05s ease;
    }
    .tc-menu-item:hover{ background: rgba(255,255,255,.10); }
    .tc-menu-item:active{ transform: translateY(1px); }
    .tc-menu-item:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
      background: rgba(255,255,255,.08);
    }
    @media (prefers-reduced-motion: reduce){
      .tc-btn,
      #worldMenu .tc-world-item,
      .tc-menu-item{
        transition: none;
      }
      [data-world-card="1"]{
        transition: none;
      }
      [data-world-card="1"]:hover,
      [data-world-card="1"]:active{
        transform: none;
      }
      .tc-toast{
        transition: none;
        transform: none;
      }
        .tc-toast.is-visible{
          transform: none;
        }
      }
      @media (max-width: 520px) {
        .tc-topbar > .max-w-6xl {
          flex-wrap: wrap;
          row-gap: 8px;
          column-gap: 8px;
        }
        .tc-topbar > .max-w-6xl > :nth-child(1) {
          order: 1;
          min-width: 0;
        }
        .tc-topbar > .max-w-6xl > :nth-child(2) {
          order: 3;
          flex: 1 1 100%;
          min-width: 0;
        }
        .tc-topbar > .max-w-6xl > :nth-child(3) {
          order: 2;
          margin-left: auto;
        }
        .tc-topbar #portalSwitcher,
        .tc-topbar #portalBtn {
          width: 100%;
          max-width: 100%;
        }
        .tc-topbar [data-i18n="topbar.slogan"] {
          display: none;
        }
        .tc-topbar .tc-brand {
          max-width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        #topbarAuthSlot #userName {
          display: none;
        }
        .tc-topbar a,
        .tc-topbar button {
          min-height: 40px;
        }
      }
    </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    html, body, button, input, select, textarea {
      font-family: "Inter", "Noto Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
    }
  </style></head>
<body class="font-sans">
  <!-- TOPBAR -->
  <header class="tc-topbar relative">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
      <div class="flex items-center gap-3">
        <a href="./index.html" class="flex items-center gap-3 min-w-0">
          <span class="h-11 w-11 md:h-12 md:w-12 rounded-xl shrink-0 flex items-center justify-center bg-white/5 ring-1 ring-white/10">
            <picture>
              <source srcset="./assets/spacecolors-mark.svg" type="image/svg+xml">
              <img
                src="./assets/spacecolors-mark-128.png"
                srcset="./assets/spacecolors-mark-128.png 1x, ./assets/spacecolors-mark-256.png 2x"
                class="h-full w-full object-contain select-none"
                alt="SpaceColors"
                decoding="async"
                loading="eager"
              />
            </picture>
          </span>
          <span class="min-w-0 flex flex-col justify-center leading-tight">
            <span class="tc-brand text-base md:text-lg whitespace-nowrap" data-i18n="topbar.brand">SpaceColors · 8Portal</span>
            <span class="tc-muted text-[11px] md:text-xs truncate max-w-[240px] md:max-w-[360px] hidden sm:block" data-i18n="topbar.slogan">
              Một chạm mở không gian màu vô hạn
            </span>
          </span>
        </a>
      </div>


      <div class="flex-1 flex items-center justify-center">
        <div class="relative" id="portalSwitcher">
          <button id="portalBtn"
            class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[210px] justify-between"
            aria-expanded="false" aria-haspopup="menu" aria-controls="portalMenu">
            Ch&#7885;n Th&#7871; gi&#7899;i
          </button>
          <div id="portalMenu" data-open="0" role="menu" class="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./worlds/threadcolor.html" role="menuitem">Th&#7871; gi&#7899;i m&#224;u th&#234;u</a>
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./worlds/palette.html" role="menuitem">Th&#7871; gi&#7899;i d&#7843;i m&#224;u</a>
            <a id="portalAdminLink" class="tc-menu-item block w-full text-left px-3 py-2 rounded-md hidden" href="./admin.html" role="menuitem" aria-hidden="true">Qu&#7843;n tr&#7883;</a>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end gap-3 min-w-[210px]">
        <div class="relative" id="worldSwitcher">
          <button id="worldBtn"
            class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[150px] justify-between"
            aria-expanded="false" aria-haspopup="menu" aria-controls="worldMenu">
            <span class="flex items-center gap-2">
              <span class="tc-dot" aria-hidden="true"></span>
              <span id="worldLabel">Origami</span>
            </span>
            <span aria-hidden="true">&#9662;</span>
          </button>
          <div id="worldMenu" data-open="0" role="menu" class="absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="nebula" role="menuitem">Tinh vân</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="ocean" role="menuitem">Đại dương</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="ink" role="menuitem">Mực tàu</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="origami" role="menuitem">Origami</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="arcade" role="menuitem">Arcade</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="dunes" role="menuitem">Đồi cát</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="chrome" role="menuitem">Chrome</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="circuit" role="menuitem">Mạch điện</button>
          </div>
        </div>
        <div id="topbarAuthSlot" data-auth-slot="topbar" class="tc-auth-float flex items-center justify-end min-w-[210px]"></div>
      </div>
    </div>
  </header>

  <main>
    <!-- HERO -->
    <section class="max-w-6xl mx-auto px-4 pt-14 pb-12">
      <div class="tc-card p-8 md:p-10">
        <p class="text-xs uppercase tracking-[0.3em] tc-muted">8Portal v4</p>
        <h1 class="text-4xl md:text-5xl font-bold mt-3" data-i18n="hero.title">Không gian màu vô hạn.</h1>
        <p class="mt-4 tc-muted max-w-2xl whitespace-pre-line" data-i18n="hero.desc">Chuyển Thế giới để cảm nhận sắc thái mới, khám phá các công cụ và thư viện màu đa dạng(màu chỉ,palette,HEX).</p>
        <div class="mt-6 flex flex-wrap gap-3">
          <a class="tc-btn tc-btn-primary px-5 py-3" href="./worlds/threadcolor.html" data-i18n="hero.ctaPrimary">Mở công cụ</a>
          <button class="tc-btn tc-chip px-5 py-3" data-i18n="hero.ctaSecondary">Khám phá Thế giới</button>
        </div>
      </div>
    </section>

    <!-- PORTAL HUB -->
    <section class="max-w-6xl mx-auto px-4 pb-12">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h2 class="text-2xl font-semibold">8 Cổng SpaceColors</h2>
          <p class="tc-muted text-sm mt-1">Chọn cổng để bước vào một Thế giới sắc màu khác.</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="tc-card p-5 flex flex-col gap-4">
          <div>
            <h3 class="font-semibold">Thế giới màu thêu</h3>
            <p class="tc-muted text-sm mt-2">Tra cứu mã chỉ theo ảnh, màu và mã HEX.Tra ngược màu theo mã chỉ.Hỗ trợ nhiều hãng chỉ phổ biến. Kiểm soát tồn dư kho chỉ.Đặt mua chỉ trực tiếp.</p>
          </div>
          <a class="tc-btn tc-btn-primary px-4 py-2 inline-flex w-max" href="./worlds/threadcolor.html">Mở</a>
        </div>
        <div class="tc-card p-5 flex flex-col gap-4">
          <div>
            <div class="inline-flex items-center gap-2 tc-chip px-2.5 py-1 rounded-full text-xs">Sắp ra mắt</div>
            <h3 class="font-semibold mt-3">Thế giới dải màu</h3>
            <p class="tc-muted text-sm mt-2">Khám phá bảng màu theo dải và cảm xúc.</p>
          </div>
          <button class="tc-btn tc-chip px-4 py-2 inline-flex w-max opacity-60 cursor-not-allowed" disabled>Sắp ra mắt</button>
        </div>
        <div class="tc-card p-5 flex flex-col gap-4">
          <div>
            <div class="inline-flex items-center gap-2 tc-chip px-2.5 py-1 rounded-full text-xs">Sắp ra mắt</div>
            <h3 class="font-semibold mt-3">Thế giới ngọc</h3>
            <p class="tc-muted text-sm mt-2">Tông màu quý, ánh kim và chiều sâu.</p>
          </div>
          <button class="tc-btn tc-chip px-4 py-2 inline-flex w-max opacity-60 cursor-not-allowed" disabled>Sắp ra mắt</button>
        </div>
        <div class="tc-card p-5 flex flex-col gap-4">
          <div>
            <div class="inline-flex items-center gap-2 tc-chip px-2.5 py-1 rounded-full text-xs">Sắp ra mắt</div>
            <h3 class="font-semibold mt-3">Thế giới tơ lụa</h3>
            <p class="tc-muted text-sm mt-2">Bảng màu mềm, mịn và mơ màng.</p>
          </div>
          <button class="tc-btn tc-chip px-4 py-2 inline-flex w-max opacity-60 cursor-not-allowed" disabled>Sắp ra mắt</button>
        </div>
        <div class="tc-card p-5 flex flex-col gap-4">
          <div>
            <div class="inline-flex items-center gap-2 tc-chip px-2.5 py-1 rounded-full text-xs">Sắp ra mắt</div>
            <h3 class="font-semibold mt-3">Thế giới thủ công</h3>
            <p class="tc-muted text-sm mt-2">Sắc màu truyền thống, ấm và gần gũi.</p>
          </div>
          <button class="tc-btn tc-chip px-4 py-2 inline-flex w-max opacity-60 cursor-not-allowed" disabled>Sắp ra mắt</button>
        </div>
        <div class="tc-card p-5 flex flex-col gap-4">
          <div>
            <div class="inline-flex items-center gap-2 tc-chip px-2.5 py-1 rounded-full text-xs">Sắp ra mắt</div>
            <h3 class="font-semibold mt-3">Thế giới ánh sáng</h3>
            <p class="tc-muted text-sm mt-2">Dải màu rực rỡ, phản quang và sáng bừng.</p>
          </div>
          <button class="tc-btn tc-chip px-4 py-2 inline-flex w-max opacity-60 cursor-not-allowed" disabled>Sắp ra mắt</button>
        </div>
        <div class="tc-card p-5 flex flex-col gap-4">
          <div>
            <div class="inline-flex items-center gap-2 tc-chip px-2.5 py-1 rounded-full text-xs">Sắp ra mắt</div>
            <h3 class="font-semibold mt-3">Thế giới tối giản</h3>
            <p class="tc-muted text-sm mt-2">Bảng màu tối giản, tinh gọn và sang.</p>
          </div>
          <button class="tc-btn tc-chip px-4 py-2 inline-flex w-max opacity-60 cursor-not-allowed" disabled>Sắp ra mắt</button>
        </div>
        <div class="tc-card p-5 flex flex-col gap-4">
          <div>
            <div class="inline-flex items-center gap-2 tc-chip px-2.5 py-1 rounded-full text-xs">Sắp ra mắt</div>
            <h3 class="font-semibold mt-3">Thế giới ký ức</h3>
            <p class="tc-muted text-sm mt-2">Màu sắc hoài niệm và chất liệu xưa.</p>
          </div>
          <button class="tc-btn tc-chip px-4 py-2 inline-flex w-max opacity-60 cursor-not-allowed" disabled>Sắp ra mắt</button>
        </div>
      </div>
    </section>

    <!-- QUICK ACTIONS -->
    <section class="max-w-6xl mx-auto px-4 pb-12">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h2 class="text-2xl font-semibold" data-i18n="quick.title">Hành động nhanh</h2>
          <p class="tc-muted text-sm mt-1" data-i18n="quick.desc">Truy cập nhanh các tác vụ chính của 8Portal.</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="tc-card p-5">
          <h3 class="font-semibold" data-i18n="quick.items.threadcolor.title">Tra mã chỉ</h3>
          <p class="tc-muted text-sm mt-2" data-i18n="quick.items.threadcolor.desc">Tra cứu màu chỉ theo ảnh, mã hoặc màu chọn.</p>
          <a class="tc-btn tc-btn-primary px-4 py-2 mt-4 inline-flex" href="./worlds/threadcolor.html" data-i18n="quick.items.threadcolor.cta">Mở công cụ</a>
        </div>
        <div class="tc-card p-5">
          <h3 class="font-semibold" data-i18n="quick.items.library.title">Thư viện</h3>
          <p class="tc-muted text-sm mt-2" data-i18n="quick.items.library.desc">Lưu và xem lại các lần tra cứu của bạn.</p>
          <button class="tc-btn tc-chip px-4 py-2 mt-4 inline-flex opacity-60 cursor-not-allowed" disabled data-i18n="quick.items.library.cta">Sắp ra mắt</button>
        </div>
        <div class="tc-card p-5">
          <h3 class="font-semibold" data-i18n="quick.items.contribute.title">Đóng góp dữ liệu</h3>
          <p class="tc-muted text-sm mt-2" data-i18n="quick.items.contribute.desc">Gửi màu và mã chỉ mới cho cộng đồng.</p>
          <button class="tc-btn tc-chip px-4 py-2 mt-4 inline-flex" data-qa-action="contribute" data-i18n="quick.items.contribute.cta">Bắt đầu</button>
        </div>
        <div class="tc-card p-5">
          <h3 class="font-semibold" data-i18n="quick.items.verify.title">Xác minh</h3>
          <p class="tc-muted text-sm mt-2" data-i18n="quick.items.verify.desc">Dành cho admin duyệt dữ liệu cộng đồng.</p>
          <button class="tc-btn tc-chip px-4 py-2 mt-4 inline-flex" data-qa-action="verify" data-i18n="quick.items.verify.cta">Đi tới</button>
        </div>
      </div>
    </section>

    <!-- ROULETTE -->
    <section class="max-w-6xl mx-auto px-4 pb-12">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h2 class="text-2xl font-semibold" data-i18n="roulette.title">Vòng quay dải màu</h2>
          <p class="tc-muted text-sm mt-1" data-i18n="roulette.desc">Chọn ngẫu nhiên một bộ màu nhấn để khám phá nhanh.</p>
        </div>
      </div>
      <div class="tc-card p-6 md:p-8">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-3">
            <div class="tc-preview-swatch" style="background: var(--a1);"></div>
            <div class="tc-preview-swatch" style="background: var(--a2);"></div>
            <div class="tc-preview-swatch" style="background: var(--a3);"></div>
          </div>
          <div class="flex flex-wrap gap-3">
            <button id="rouletteSpin" class="tc-btn tc-btn-primary px-4 py-2" data-i18n="roulette.spin">Quay màu</button>
            <button id="rouletteReset" class="tc-btn tc-chip px-4 py-2" data-i18n="roulette.reset">Đặt lại</button>
          </div>
        </div>
      </div>
    </section>

    <!-- FORGE -->
    <section class="max-w-6xl mx-auto px-4 pb-16">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h2 class="text-2xl font-semibold" data-i18n="forge.title">Lò rèn bảng màu</h2>
          <p class="tc-muted text-sm mt-1" data-i18n="forge.desc">Tuỳ chỉnh bộ màu nhấn để phù hợp với gu của bạn.</p>
        </div>
      </div>
      <div class="tc-card p-6 md:p-8 space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="flex items-center justify-between gap-3">
            <div>
              <div class="text-sm font-semibold" data-i18n="forge.a1.label">Màu nhấn 1</div>
              <div class="tc-muted text-xs mt-1" data-accent-value="a1">--</div>
            </div>
            <input id="forgeA1" type="color" class="tc-color-input" value="#000000" aria-label="Màu nhấn 1">
          </div>
          <div class="flex items-center justify-between gap-3">
            <div>
              <div class="text-sm font-semibold" data-i18n="forge.a2.label">Màu nhấn 2</div>
              <div class="tc-muted text-xs mt-1" data-accent-value="a2">--</div>
            </div>
            <input id="forgeA2" type="color" class="tc-color-input" value="#000000" aria-label="Màu nhấn 2">
          </div>
          <div class="flex items-center justify-between gap-3">
            <div>
              <div class="text-sm font-semibold" data-i18n="forge.a3.label">Màu nhấn 3</div>
              <div class="tc-muted text-xs mt-1" data-accent-value="a3">--</div>
            </div>
            <input id="forgeA3" type="color" class="tc-color-input" value="#000000" aria-label="Màu nhấn 3">
          </div>
        </div>
        <div>
          <div class="text-sm font-semibold mb-2" data-i18n="forge.preview">Xem trước gradient</div>
          <div id="forgePreview" class="tc-gradient-preview"></div>
        </div>
        <div class="flex flex-wrap gap-3">
          <button id="forgeCopy" class="tc-btn tc-chip px-4 py-2" data-i18n="forge.copy">Sao chép CSS</button>
        </div>
      </div>
    </section>

    <!-- GALLERY -->
    <section class="max-w-6xl mx-auto px-4 pb-16">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h2 class="text-2xl font-semibold" data-i18n="gallery.title">B&#7897; s&#432;u t&#7853;p s&#7855;c th&#225;i</h2>
          <p class="tc-muted text-sm mt-1" data-i18n="gallery.desc">8 s&#7855;c th&#225;i c&#7843;m gi&#225;c.</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-world-grid="1">
        <div class="tc-card p-5" data-world-card="1" data-world="nebula" role="button" tabindex="0" aria-label="Kích hoạt Thế giới: Tinh vân">
          <div class="flex items-center gap-2">
            <span class="tc-dot"></span>
            <h3 class="font-semibold" data-world-label="nebula">Tinh vân</h3>
          </div>
          <p class="tc-muted text-sm mt-2" data-world-desc="nebula">Tinh vân huyền ảo, ánh tím xanh sâu thẳm.</p>
          <span class="text-xs mt-4 inline-block tc-muted" data-i18n="gallery.activate">Kích hoạt</span>
        </div>
        <div class="tc-card p-5" data-world-card="1" data-world="ocean" role="button" tabindex="0" aria-label="Kích hoạt Thế giới: Đại dương">
          <div class="flex items-center gap-2">
            <span class="tc-dot"></span>
            <h3 class="font-semibold" data-world-label="ocean">Đại dương</h3>
          </div>
          <p class="tc-muted text-sm mt-2" data-world-desc="ocean">Đại dương mát lành, cảm giác sáng sạch.</p>
          <span class="text-xs mt-4 inline-block tc-muted" data-i18n="gallery.activate">Kích hoạt</span>
        </div>
        <div class="tc-card p-5" data-world-card="1" data-world="ink" role="button" tabindex="0" aria-label="Kích hoạt Thế giới: Mực tàu">
          <div class="flex items-center gap-2">
            <span class="tc-dot"></span>
            <h3 class="font-semibold" data-world-label="ink">Mực tàu</h3>
          </div>
          <p class="tc-muted text-sm mt-2" data-world-desc="ink">Tối giản, mực tàu và độ sâu.</p>
          <span class="text-xs mt-4 inline-block tc-muted" data-i18n="gallery.activate">Kích hoạt</span>
        </div>
        <div class="tc-card p-5" data-world-card="1" data-world="origami" role="button" tabindex="0" aria-label="Kích hoạt Thế giới: Origami">
          <div class="flex items-center gap-2">
            <span class="tc-dot"></span>
            <h3 class="font-semibold" data-world-label="origami">Origami</h3>
          </div>
          <p class="tc-muted text-sm mt-2" data-world-desc="origami">Giấy gấp, ấm áp và nhẹ nhàng.</p>
          <span class="text-xs mt-4 inline-block tc-muted" data-i18n="gallery.activate">Kích hoạt</span>
        </div>
        <div class="tc-card p-5" data-world-card="1" data-world="arcade" role="button" tabindex="0" aria-label="Kích hoạt Thế giới: Arcade">
          <div class="flex items-center gap-2">
            <span class="tc-dot"></span>
            <h3 class="font-semibold" data-world-label="arcade">Arcade</h3>
          </div>
          <p class="tc-muted text-sm mt-2" data-world-desc="arcade">Nê-on năng lượng, nhịp nhanh.</p>
          <span class="text-xs mt-4 inline-block tc-muted" data-i18n="gallery.activate">Kích hoạt</span>
        </div>
        <div class="tc-card p-5" data-world-card="1" data-world="dunes" role="button" tabindex="0" aria-label="Kích hoạt Thế giới: Đồi cát">
          <div class="flex items-center gap-2">
            <span class="tc-dot"></span>
            <h3 class="font-semibold" data-world-label="dunes">Đồi cát</h3>
          </div>
          <p class="tc-muted text-sm mt-2" data-world-desc="dunes">Sa mạc, nắng vàng, yên tĩnh.</p>
          <span class="text-xs mt-4 inline-block tc-muted" data-i18n="gallery.activate">Kích hoạt</span>
        </div>
        <div class="tc-card p-5" data-world-card="1" data-world="chrome" role="button" tabindex="0" aria-label="Kích hoạt Thế giới: Chrome">
          <div class="flex items-center gap-2">
            <span class="tc-dot"></span>
            <h3 class="font-semibold" data-world-label="chrome">Chrome</h3>
          </div>
          <p class="tc-muted text-sm mt-2" data-world-desc="chrome">Kim loại sáng, chuẩn xác, sạch.</p>
          <span class="text-xs mt-4 inline-block tc-muted" data-i18n="gallery.activate">Kích hoạt</span>
        </div>
        <div class="tc-card p-5" data-world-card="1" data-world="circuit" role="button" tabindex="0" aria-label="Kích hoạt Thế giới: Mạch điện">
          <div class="flex items-center gap-2">
            <span class="tc-dot"></span>
            <h3 class="font-semibold" data-world-label="circuit">Mạch điện</h3>
          </div>
          <p class="tc-muted text-sm mt-2" data-world-desc="circuit">Mạch điện, xanh lục kỹ thuật.</p>
          <span class="text-xs mt-4 inline-block tc-muted" data-i18n="gallery.activate">Kích hoạt</span>
        </div>
      </div>
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="max-w-6xl mx-auto px-4 pb-10">
    <div class="tc-card p-4 text-sm tc-muted flex items-center justify-between">
      <span data-i18n="footer.left">8Portal v4 â€” Khung A1â†’A3</span>
      <span data-i18n="footer.right">Token thế giới đã sẵn sàng</span>
    </div>
  </footer>

  <script src="./i18n.js"></script>
  <script type="module" src="./auth.js"></script>
  <script>
    (() => {
      const adminLink = document.getElementById("portalAdminLink");
      if (!adminLink) return;
      const setVisible = (visible) => {
        adminLink.classList.toggle("hidden", !visible);
        adminLink.setAttribute("aria-hidden", visible ? "false" : "true");
      };
      const checkAdmin = async (user) => {
        if (!user || typeof user.getIdToken !== "function") {
          setVisible(false);
          return;
        }
        try {
          const token = await user.getIdToken();
          const res = await fetch("/admin/ping", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setVisible(res.ok);
        } catch (_err) {
          setVisible(false);
        }
      };
      const bind = () => {
        const api = window.firebaseAuth || window.firebaseAuthApi || null;
        if (!api?.onAuthStateChanged) {
          setVisible(false);
          return;
        }
        api.onAuthStateChanged((user) => {
          checkAdmin(user);
        });
      };
      if (window.firebaseAuth) {
        bind();
      } else {
        window.addEventListener("firebase-auth-ready", bind, { once: true });
      }
    })();
  </script>
  <script>
    (() => {
      if (window.__portalSwitcherBound) return;
      window.__portalSwitcherBound = true;
      const portalBtn = document.getElementById("portalBtn");
      const portalMenu = document.getElementById("portalMenu");
      if (!portalBtn || !portalMenu) return;
      const setOpen = (open) => {
        portalMenu.dataset.open = open ? "1" : "0";
        portalMenu.hidden = !open;
        portalBtn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      setOpen(portalMenu.dataset.open === "1");
      portalBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        setOpen(portalMenu.dataset.open !== "1");
      });
      portalMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-menu-item");
        if (!item || !portalMenu.contains(item)) return;
        setOpen(false);
      });
      document.addEventListener("click", (event) => {
        if (!portalMenu.contains(event.target) && !portalBtn.contains(event.target)) {
          setOpen(false);
        }
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
      });
    })();
  </script>
  <script>
    (() => {
      const worldBtn = document.getElementById("worldBtn");
      const worldMenu = document.getElementById("worldMenu");
      const switcher = document.getElementById("worldSwitcher");
      if (!worldBtn || !worldMenu || !switcher) return;
      const storageKey = "tc_world";
      const worlds = ["nebula", "ocean", "ink", "origami", "arcade", "dunes", "chrome", "circuit"];
      const getItems = () => Array.from(worldMenu.querySelectorAll(".tc-world-item"));
      const applyWorld = (key) => {
        const current = document.documentElement.dataset.world;
        const next = worlds.includes(key)
          ? key
          : (worlds.includes(current) ? current : "origami");
        const prev = document.documentElement.getAttribute("data-world");
        document.documentElement.setAttribute("data-world", next);
        try {
          localStorage.setItem(storageKey, next);
        } catch (err) {}
        if (prev !== next) {
          document.dispatchEvent(new CustomEvent("tc-world-changed", { detail: { world: next } }));
        }
      };
      const setMenuOpen = (open) => {
        worldMenu.dataset.open = open ? "1" : "0";
        worldBtn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      worldBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        setMenuOpen(worldMenu.dataset.open !== "1");
      });
      worldMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-world-item");
        if (!item || !worldMenu.contains(item)) return;
        event.preventDefault();
        applyWorld(item.getAttribute("data-world"));
        setMenuOpen(false);
        worldBtn.focus();
      });
      const galleryGrid = document.querySelector('[data-world-grid="1"]');
      if (galleryGrid) {
        galleryGrid.addEventListener("click", (event) => {
          const card = event.target.closest('[data-world-card="1"]');
          if (!card || !galleryGrid.contains(card)) return;
          applyWorld(card.dataset.world);
          if (worldMenu.dataset.open === "1") {
            setMenuOpen(false);
          }
        });
        galleryGrid.addEventListener("keydown", (event) => {
          const card = event.target.closest('[data-world-card="1"]');
          if (!card || !galleryGrid.contains(card) || document.activeElement !== card) return;
          if (event.key === "Enter" || event.key === " " || event.key === "Spacebar" || event.key === "Space") {
            event.preventDefault();
            applyWorld(card.dataset.world);
            if (worldMenu.dataset.open === "1") {
              setMenuOpen(false);
            }
          }
        });
      }
      document.addEventListener("click", (event) => {
        if (!switcher.contains(event.target)) {
          setMenuOpen(false);
        }
      });
      document.addEventListener("keydown", (event) => {
        const items = getItems();
        const isOpen = worldMenu.dataset.open === "1";
        if (event.key === "Escape") {
          if (isOpen) {
            setMenuOpen(false);
            worldBtn.focus();
          }
          return;
        }
        if (event.key === "ArrowDown" && document.activeElement === worldBtn) {
          event.preventDefault();
          setMenuOpen(true);
          if (!items.length) return;
          items[0]?.focus();
          return;
        }
        if (!isOpen || (event.key !== "ArrowDown" && event.key !== "ArrowUp")) return;
        const currentIndex = items.indexOf(document.activeElement);
        if (currentIndex === -1) return;
        event.preventDefault();
        const nextIndex = event.key === "ArrowDown"
          ? (currentIndex + 1) % items.length
          : (currentIndex - 1 + items.length) % items.length;
        items[nextIndex]?.focus();
      });
      let storedWorld = null;
      try {
        storedWorld = localStorage.getItem(storageKey);
      } catch (err) {}
      if (worlds.includes(storedWorld)) {
        applyWorld(storedWorld);
      } else {
        applyWorld(document.documentElement.dataset.world);
      }
      setMenuOpen(false);
    })();
  </script>
  <script>
    (() => {
      const communityBtn = document.getElementById("communityBtn");
      const communityMenu = document.getElementById("communityMenu");
      const spacesBtn = document.getElementById("spacesBtn");
      const spacesMenu = document.getElementById("spacesMenu");
      if (!communityBtn || !communityMenu || !spacesBtn || !spacesMenu) return;
      const menus = [
        { btn: communityBtn, menu: communityMenu },
        { btn: spacesBtn, menu: spacesMenu }
      ];
      const setMenuOpen = (btn, menu, open) => {
        menu.dataset.open = open ? "1" : "0";
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      const closeAll = () => menus.forEach(({ btn, menu }) => setMenuOpen(btn, menu, false));
      const goTool = (action) => {
        const auth = window.tcAuth || null;
        const isLoggedIn = typeof auth?.isLoggedIn === "function" ? auth.isLoggedIn() : false;
        if (!isLoggedIn) {
          if (typeof auth?.openAuth === "function") {
            auth.openAuth();
            return;
          }
        }
        const target = action ? `./worlds/threadcolor.html?open=${encodeURIComponent(action)}` : "./worlds/threadcolor.html";
        window.location.href = target;
      };
      communityBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = communityMenu.dataset.open === "1";
        closeAll();
        setMenuOpen(communityBtn, communityMenu, !isOpen);
      });
      spacesBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = spacesMenu.dataset.open === "1";
        closeAll();
        setMenuOpen(spacesBtn, spacesMenu, !isOpen);
      });
      communityMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-menu-item");
        if (!item || !communityMenu.contains(item)) return;
        const action = item.getAttribute("data-action");
        if (action) goTool(action);
        closeAll();
      });
      spacesMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-menu-item");
        if (!item || !spacesMenu.contains(item)) return;
        const action = item.getAttribute("data-action");
        if (action) goTool(action);
        closeAll();
      });
      document.addEventListener("click", (event) => {
        if (menus.some(({ btn, menu }) => btn.contains(event.target) || menu.contains(event.target))) return;
        closeAll();
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeAll();
      });
    })();
  </script>
  <script>
    (() => {
      const contributeBtn = document.querySelector('[data-qa-action="contribute"]');
      const verifyBtn = document.querySelector('[data-qa-action="verify"]');
      if (!contributeBtn && !verifyBtn) return;

      const isLoggedIn = () => {
        if (window.tcAuth?.isLoggedIn?.()) return true;
        const api = (window.firebaseAuth || window.firebaseAuthApi || null);
        if (api?.auth?.currentUser) return true;
        if (api?.user?.uid || api?.user?.email) return true;
        const userInfo = document.getElementById("userInfo");
        return !!userInfo && !userInfo.classList.contains("hidden");
      };

      const openLoginOrGo = () => {
        const btnAccount = document.getElementById("btnAccount");
        if (btnAccount) {
          btnAccount.click();
          return;
        }
        window.location.href = "./worlds/threadcolor.html";
      };

      const goThreadcolor = () => {
        window.location.href = "./worlds/threadcolor.html";
      };

      const bindQuickAction = (button) => {
        if (!button) return;
        button.addEventListener("click", () => {
          if (isLoggedIn()) {
            goThreadcolor();
            return;
          }
          openLoginOrGo();
        });
      };

      bindQuickAction(contributeBtn);
      bindQuickAction(verifyBtn);
    })();
  </script>
  <script>
    (() => {
      const root = document.documentElement;
      const spinBtn = document.getElementById("rouletteSpin");
      const resetBtn = document.getElementById("rouletteReset");
      const inputA1 = document.getElementById("forgeA1");
      const inputA2 = document.getElementById("forgeA2");
      const inputA3 = document.getElementById("forgeA3");
      const copyBtn = document.getElementById("forgeCopy");
      const valueEls = {
        a1: document.querySelector('[data-accent-value="a1"]'),
        a2: document.querySelector('[data-accent-value="a2"]'),
        a3: document.querySelector('[data-accent-value="a3"]')
      };
      if (!spinBtn || !resetBtn || !inputA1 || !inputA2 || !inputA3 || !copyBtn) return;

      const presets = [
        ["#ff6b6b", "#ffd166", "#6ee7b7"],
        ["#60a5fa", "#a78bfa", "#f472b6"],
        ["#22c55e", "#84cc16", "#14b8a6"],
        ["#f97316", "#facc15", "#fb7185"],
        ["#38bdf8", "#0ea5e9", "#6366f1"],
        ["#f59e0b", "#ef4444", "#fb7185"],
        ["#2dd4bf", "#60a5fa", "#a78bfa"]
      ];

      const setAccent = (a1, a2, a3) => {
        root.style.setProperty("--a1", a1);
        root.style.setProperty("--a2", a2);
        root.style.setProperty("--a3", a3);
      };

      const resetAccent = () => {
        root.style.removeProperty("--a1");
        root.style.removeProperty("--a2");
        root.style.removeProperty("--a3");
      };

      const parseRgb = (value) => {
        const match = value.replace(/\s+/g, "").match(/^rgba?\((\d+),(\d+),(\d+)/i);
        if (!match) return null;
        const r = Number(match[1]);
        const g = Number(match[2]);
        const b = Number(match[3]);
        if ([r, g, b].some((v) => Number.isNaN(v))) return null;
        return [r, g, b];
      };

      const toHex = (value) => {
        if (!value) return "#000000";
        const raw = value.trim();
        if (raw.startsWith("#")) {
          if (raw.length === 4) {
            return "#" + raw.slice(1).split("").map((c) => c + c).join("");
          }
          if (raw.length === 7) return raw;
        }
        const rgb = parseRgb(raw);
        if (!rgb) return "#000000";
        return "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("");
      };

      const getAccent = () => {
        const styles = getComputedStyle(root);
        return {
          a1: toHex(styles.getPropertyValue("--a1")),
          a2: toHex(styles.getPropertyValue("--a2")),
          a3: toHex(styles.getPropertyValue("--a3"))
        };
      };

      const refreshForgeUI = () => {
        const current = getAccent();
        inputA1.value = current.a1;
        inputA2.value = current.a2;
        inputA3.value = current.a3;
        if (valueEls.a1) valueEls.a1.textContent = current.a1.toUpperCase();
        if (valueEls.a2) valueEls.a2.textContent = current.a2.toUpperCase();
        if (valueEls.a3) valueEls.a3.textContent = current.a3.toUpperCase();
      };

      const ensureToast = () => {
        let toast = document.getElementById("tcToast");
        if (toast) return toast;
        toast = document.createElement("div");
        toast.id = "tcToast";
        toast.className = "tc-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
        return toast;
      };

      const showToast = (message) => {
        const toast = ensureToast();
        toast.textContent = "";
        window.clearTimeout(showToast._t);
        const raf = window.requestAnimationFrame || ((fn) => setTimeout(fn, 0));
        raf(() => {
          toast.textContent = message;
          toast.classList.add("is-visible");
          showToast._t = window.setTimeout(() => {
            toast.classList.remove("is-visible");
          }, 1400);
        });
      };

      const getCopyText = () => {
        const current = getAccent();
        return `--a1: ${current.a1};\n--a2: ${current.a2};\n--a3: ${current.a3};`;
      };

      const copyToClipboard = (text) => {
        if (navigator.clipboard && window.isSecureContext) {
          return navigator.clipboard.writeText(text);
        }
        return new Promise((resolve) => {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand("copy");
          } catch (err) {}
          ta.remove();
          resolve();
        });
      };

      spinBtn.addEventListener("click", () => {
        const preset = presets[Math.floor(Math.random() * presets.length)];
        if (!preset) return;
        setAccent(preset[0], preset[1], preset[2]);
        refreshForgeUI();
      });

      resetBtn.addEventListener("click", () => {
        resetAccent();
        refreshForgeUI();
      });

      const onForgeInput = () => {
        setAccent(inputA1.value, inputA2.value, inputA3.value);
        refreshForgeUI();
      };
      inputA1.addEventListener("input", onForgeInput);
      inputA2.addEventListener("input", onForgeInput);
      inputA3.addEventListener("input", onForgeInput);

      copyBtn.addEventListener("click", () => {
        const messageNode = document.querySelector('[data-i18n="toast.copied"]');
        const message = messageNode ? messageNode.textContent : "Đã sao chép!";
        copyToClipboard(getCopyText()).then(() => showToast(message));
      });

      refreshForgeUI();
    })();
  </script>
  <span class="sr-only" data-i18n="toast.copied">Đã sao chép!</span>
</body>
</html>

````

## library.js
````text
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  limit as fsLimit,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

export async function saveSearch(db, uid, payload) {
  if (!db || !uid || !payload) throw new Error("Missing db/uid/payload");
  console.info("[saveSearch] projectId", db?.app?.options?.projectId);
  console.info("[saveSearch] uid", uid, "path", collection(db, "users", uid, "savedSearches").path);
  const ref = collection(db, "users", uid, "savedSearches");
  const docRef = await addDoc(ref, { ...payload, createdAt: serverTimestamp() });
  console.info("[saveSearch] saved doc id", docRef.id);
  return docRef;
}

export async function listSavedSearches(db, uid, limitN = 50) {
  if (!db || !uid) throw new Error("Missing db/uid");
  console.info("[listSavedSearches] uid", uid, "path", collection(db, "users", uid, "savedSearches").path);
  const ref = collection(db, "users", uid, "savedSearches");
  let docs = [];
  try {
    const q = query(ref, orderBy("createdAt", "desc"), fsLimit(limitN));
    const snap = await getDocs(q);
    docs = snap.docs;
    console.info("[listSavedSearches] count", snap.size);
  } catch (err) {
    console.error("listSavedSearches orderBy fallback", err);
    const snap = await getDocs(ref);
    docs = snap.docs;
    docs.sort((a, b) => {
      const ta = a.data()?.createdAt?.toMillis ? a.data().createdAt.toMillis() : 0;
      const tb = b.data()?.createdAt?.toMillis ? b.data().createdAt.toMillis() : 0;
      return tb - ta;
    });
    console.info("[listSavedSearches] count (fallback)", docs.length);
  }

  const items = [];
  let migrated = 0;

  for (const d of docs.slice(0, limitN)) {
    const data = d.data() || {};
    const results = Array.isArray(data.results) ? data.results : [];
    const selectedBrands = Array.isArray(data.selectedBrands) ? data.selectedBrands : [];
    let topMatch = data.topMatch || (results.length ? results[0] : null);
    let label = data.label;
    if (!label) {
      if (topMatch) {
        label = `${topMatch.brand || ""} ${topMatch.code || ""}`.trim();
      } else if (results.length) {
        label = `${results[0].brand || ""} ${results[0].code || ""}`.trim();
        topMatch = topMatch || results[0];
      } else {
        label = data.inputHex || "";
      }
      try {
        await setDoc(d.ref, { label, topMatch }, { merge: true });
        migrated += 1;
      } catch (e) {
        console.error("listSavedSearches migrate label failed", e);
      }
    }
    items.push({
      id: d.id,
      inputHex: data.inputHex || "",
      project: data.project || "",
      createdAt: data.createdAt || null,
      deltaThreshold: data.deltaThreshold,
      selectedBrands: selectedBrands,
      selectedBrandsCount: selectedBrands.length || 0,
      resultsCount: results.length || 0,
      label,
      topMatch,
      results
    });
  }
  return { items, migrated };
}

export async function deleteSavedSearch(db, uid, docId) {
  if (!db || !uid || !docId) throw new Error("Missing db/uid/docId");
  const ref = doc(db, "users", uid, "savedSearches", docId);
  return deleteDoc(ref);
}

export async function getSavedSearch(db, uid, docId) {
  if (!db || !uid || !docId) throw new Error("Missing db/uid/docId");
  const ref = doc(db, "users", uid, "savedSearches", docId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

````

## package-lock.json
````text
{
  "name": "8portals-data-tools",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "8portals-data-tools",
      "dependencies": {
        "ajv": "^8.12.0",
        "ajv-formats": "^2.1.1"
      }
    },
    "node_modules/ajv": {
      "version": "8.17.1",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-8.17.1.tgz",
      "integrity": "sha512-B/gBuNg5SiMTrPkC+A2+cW0RszwxYmn6VYxB/inlBStS5nx6xHIt/ehKRhIMhqusl7a8LjQoZnjCs5vhwxOQ1g==",
      "dependencies": {
        "fast-deep-equal": "^3.1.3",
        "fast-uri": "^3.0.1",
        "json-schema-traverse": "^1.0.0",
        "require-from-string": "^2.0.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/ajv-formats": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/ajv-formats/-/ajv-formats-2.1.1.tgz",
      "integrity": "sha512-Wx0Kx52hxE7C18hkMEggYlEifqWZtYaRgouJor+WMdPnQyEK13vgEWyVNup7SoeeoLMsr4kf5h6dOW11I15MUA==",
      "dependencies": {
        "ajv": "^8.0.0"
      },
      "peerDependencies": {
        "ajv": "^8.0.0"
      },
      "peerDependenciesMeta": {
        "ajv": {
          "optional": true
        }
      }
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q=="
    },
    "node_modules/fast-uri": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/fast-uri/-/fast-uri-3.1.0.tgz",
      "integrity": "sha512-iPeeDKJSWf4IEOasVVrknXpaBV0IApz/gp7S2bb7Z4Lljbl2MGJRqInZiUrQwV16cpzw/D3S5j5Julj/gT52AA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/fastify"
        },
        {
          "type": "opencollective",
          "url": "https://opencollective.com/fastify"
        }
      ]
    },
    "node_modules/json-schema-traverse": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-1.0.0.tgz",
      "integrity": "sha512-NM8/P9n3XjXhIZn1lLhkFaACTOURQXjWhV4BA/RnOv8xvgqtqpAX9IO4mRQxSx1Rlo4tqzeqb0sOlruaOy3dug=="
    },
    "node_modules/require-from-string": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/require-from-string/-/require-from-string-2.0.2.tgz",
      "integrity": "sha512-Xf0nWe6RseziFMu+Ap9biiUbmplq6S9/p+7w7YXP/JBHhrUDDUhwa+vANyubuqfZWTveU//DYVGsDG7RKL/vEw==",
      "engines": {
        "node": ">=0.10.0"
      }
    }
  }
}

````

## package.json
````text
{
  "name": "8portals-data-tools",
  "private": true,
  "scripts": {
    "validate:data": "node data/scripts/validate_contract.mjs",
    "check:encoding": "node scripts/check-encoding.mjs"
  },
  "dependencies": {
    "ajv": "^8.12.0",
    "ajv-formats": "^2.1.1"
  }
}

````

## README.md
````text
# ThreadColor

Thuộc hệ sinh thái 8Portals / SpaceColors.

## Bản chạy
- GitHub Pages: https://vuanhminh1609-boop.github.io/threadcolor/

## Sản phẩm làm gì
- Tra mã chỉ theo màu từ dữ liệu nhiều hãng.
- Cho phép chọn màu trực tiếp, từ ảnh, hoặc tra theo mã chỉ.
- Hỗ trợ lọc theo hãng và chỉ hiển thị dữ liệu đã xác minh.
- Hiển thị thông tin màu chi tiết (HEX/RGB/LAB/HSL).
- Đồng bộ theme (8 thế giới) và trải nghiệm đăng nhập chung.

## Bản đồ nhanh
- Sơ đồ tổng quan, module map, luồng dữ liệu: `DOC/00_TOAN_CANH.md`

## Vận hành
- Quy trình issue → PR → deploy: `DOC/01_WORKFLOW.md`

## Quản trị GitHub
- Labels/Project board chuẩn: `DOC/02_QUAN_TRI_GITHUB.md`

## Đóng góp & bảo mật
- Đóng góp: `CONTRIBUTING.md`
- Bảo mật: `SECURITY.md`

## Ownership
- CODEOWNERS: `.github/CODEOWNERS`

````

## script.js
````text
import { saveSearch, getSavedSearch, listSavedSearches } from "./library.js";
import { normalizeAndDedupeThreads } from "./data_normalize.js";
import {
  submitThread,
  listPendingSubmissions,
  voteOnSubmission,
  getVoteSummary,
  isAdmin,
  promoteSubmissionToVerified
} from "./crowd.js";
//======================= UTILITIES =======================
function normalizeHex(hex) {
  if (!hex || typeof hex !== "string") return null;
  let v = hex.trim().toLowerCase().replace(/^##/, "#");
  if (!v.startsWith("#")) v = "#" + v;
  return /^#[0-9a-f]{6}$/.test(v) ? v : null;
}

function hexToRgbArray(hex) {
  const num = parseInt(hex.slice(1), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToLab([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  let y = (r * 0.2126 + g * 0.7152 + b * 0.0722);
  let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.cbrt(x) : (7.787 * x + 16 / 116);
  y = y > 0.008856 ? Math.cbrt(y) : (7.787 * y + 16 / 116);
  z = z > 0.008856 ? Math.cbrt(z) : (7.787 * z + 16 / 116);

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

const labCache = new Map();

function getLabForHex(hex) {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  const cached = labCache.get(normalized);
  if (cached) return cached;
  const lab = rgbToLab(hexToRgbArray(normalized));
  labCache.set(normalized, lab);
  return lab;
}

function t(key, fallback, params) {
  if (window.tcI18n?.t) return window.tcI18n.t(key, fallback, params);
  return fallback || "";
}

function ensureLab(thread) {
  if (!thread) return null;
  if (!Array.isArray(thread.lab) || thread.lab.length !== 3) {
    thread.lab = getLabForHex(thread.hex);
  }
  return thread.lab;
}

function normalizeBrandKey(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function normalizeCodeKey(code) {
  return String(code || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, " ");
}

function isVerifiedThread(thread) {
  const conf = typeof thread?.confidence === "number" ? thread.confidence : 0;
  return conf >= 0.85 || thread?.source?.type === "CROWD_VERIFIED";
}

function rebuildIndexes(list = threads) {
  const byBrand = new Map();
  const byCode = new Map();
  const byCanonical = new Map();
  const brandKeyMap = new Map();

  list.forEach((thread) => {
    if (!thread) return;
    const brandName = (thread.brand || "").trim();
    const codeValue = (thread.code || "").trim();
    if (!brandName || !codeValue) return;
    const brandKey = normalizeBrandKey(brandName);
    const codeKey = normalizeCodeKey(codeValue);
    if (!brandKey || !codeKey) return;
    const canonicalKey = `${brandKey}::${codeKey}`;

    if (!byBrand.has(brandName)) byBrand.set(brandName, []);
    byBrand.get(brandName).push(thread);

    if (!byCode.has(codeKey)) byCode.set(codeKey, []);
    byCode.get(codeKey).push(thread);

    if (!byCanonical.has(canonicalKey)) {
      byCanonical.set(canonicalKey, thread);
    }

    if (!brandKeyMap.has(brandKey) || brandName.length > brandKeyMap.get(brandKey).length) {
      brandKeyMap.set(brandKey, brandName);
    }
  });

  threadsByBrand = byBrand;
  threadsByCode = byCode;
  threadsByCanonicalKey = byCanonical;
  brandKeyToName = brandKeyMap;
  brandNamesSorted = Array.from(brandKeyMap.entries())
    .map(([key, name]) => ({ key, name }))
    .sort((a, b) => b.name.length - a.name.length);
}

function deltaE76(lab1, lab2) {
  return Math.sqrt(
    (lab1[0] - lab2[0]) ** 2 +
    (lab1[1] - lab2[1]) ** 2 +
    (lab1[2] - lab2[2]) ** 2
  );
}

function deltaE2000(lab1, lab2) {
  const [L1, a1, b1] = lab1;
  const [L2, a2, b2] = lab2;
  const avgLp = (L1 + L2) / 2;
  const C1 = Math.sqrt(a1 * a1 + b1 * b1);
  const C2 = Math.sqrt(a2 * a2 + b2 * b2);
  const avgC = (C1 + C2) / 2;
  const avgC7 = Math.pow(avgC, 7);
  const G = 0.5 * (1 - Math.sqrt(avgC7 / (avgC7 + Math.pow(25, 7))));
  const a1p = (1 + G) * a1;
  const a2p = (1 + G) * a2;
  const C1p = Math.sqrt(a1p * a1p + b1 * b1);
  const C2p = Math.sqrt(a2p * a2p + b2 * b2);
  const avgCp = (C1p + C2p) / 2;
  const h1p = Math.atan2(b1, a1p);
  const h2p = Math.atan2(b2, a2p);
  const h1pDeg = ((h1p * 180) / Math.PI + 360) % 360;
  const h2pDeg = ((h2p * 180) / Math.PI + 360) % 360;
  let deltahp = h2pDeg - h1pDeg;
  if (C1p * C2p === 0) {
    deltahp = 0;
  } else if (deltahp > 180) {
    deltahp -= 360;
  } else if (deltahp < -180) {
    deltahp += 360;
  }
  const deltaLp = L2 - L1;
  const deltaCp = C2p - C1p;
  const deltaHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((deltahp * Math.PI) / 360);
  const avgHp = (() => {
    if (C1p * C2p === 0) return h1pDeg + h2pDeg;
    const sum = h1pDeg + h2pDeg;
    if (Math.abs(h1pDeg - h2pDeg) > 180) {
      return sum < 360 ? (sum + 360) / 2 : (sum - 360) / 2;
    }
    return sum / 2;
  })();
  const T = 1
    - 0.17 * Math.cos(((avgHp - 30) * Math.PI) / 180)
    + 0.24 * Math.cos(((2 * avgHp) * Math.PI) / 180)
    + 0.32 * Math.cos(((3 * avgHp + 6) * Math.PI) / 180)
    - 0.20 * Math.cos(((4 * avgHp - 63) * Math.PI) / 180);
  const deltaTheta = 30 * Math.exp(-(((avgHp - 275) / 25) ** 2));
  const Rc = 2 * Math.sqrt(Math.pow(avgCp, 7) / (Math.pow(avgCp, 7) + Math.pow(25, 7)));
  const Sl = 1 + (0.015 * ((avgLp - 50) ** 2)) / Math.sqrt(20 + ((avgLp - 50) ** 2));
  const Sc = 1 + 0.045 * avgCp;
  const Sh = 1 + 0.015 * avgCp * T;
  const Rt = -Math.sin((2 * deltaTheta * Math.PI) / 180) * Rc;
  return Math.sqrt(
    (deltaLp / Sl) ** 2 +
    (deltaCp / Sc) ** 2 +
    (deltaHp / Sh) ** 2 +
    Rt * (deltaCp / Sc) * (deltaHp / Sh)
  );
}

function getDelta(lab1, lab2, method) {
  return method === "2000" ? deltaE2000(lab1, lab2) : deltaE76(lab1, lab2);
}

function formatLab(lab) {
  return lab.map(v => v.toFixed(2));
}

function hexToRgbString(hex) {
  const [r, g, b] = hexToRgbArray(hex);
  return { rgbArray: [r, g, b], rgbString: `rgb(${r}, ${g}, ${b})` };
}

function hexToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [
    Math.round(h * 360),
    Math.round(s * 100),
    Math.round(l * 100)
  ];
}

//======================= GLOBAL STATE =======================
let threads = [];
let isDataReady = false;
let lastResults = null;
let lastChosenHex = null;
let currentDeltaThreshold = 3.0;
let currentDeltaMethod = "76";
let selectedItemEl = null;
let lastFocusedItem = null;
let currentUser = null;
let currentRendered = [];
let isAdminUser = false;
let useVerifiedOnly = false;
let verifiedThreads = [];
let pendingSubmissions = [];

const telemetry = (() => {
  const endpoint = window.TC_TELEMETRY_ENDPOINT
    || "https://us-central1-thread-colors-for-community.cloudfunctions.net/telemetryIngest";
  const sessionKey = "tc_session_id";
  const now = () => Date.now();
  const getSessionId = () => {
    try {
      const existing = sessionStorage.getItem(sessionKey);
      if (existing) return existing;
      const next = (window.crypto?.randomUUID?.() || `sess-${now()}-${Math.random().toString(16).slice(2)}`);
      sessionStorage.setItem(sessionKey, next);
      return next;
    } catch (_err) {
      return `sess-${now()}-${Math.random().toString(16).slice(2)}`;
    }
  };
  const sessionId = getSessionId();
  const counts = { search_start: 0, search_result: 0, pin: 0, copy: 0, save: 0 };
  const lastSent = { ...counts };
  let flushTimer = null;
  let lastFlushAt = now();

  const buildDelta = () => {
    const delta = {};
    let has = false;
    Object.keys(counts).forEach((key) => {
      const diff = counts[key] - lastSent[key];
      if (diff > 0) {
        delta[key] = diff;
        has = true;
      }
    });
    return has ? delta : null;
  };

  const flush = (useBeacon = false) => {
    const delta = buildDelta();
    if (!delta) return;
    const payload = {
      sessionId,
      world: document.documentElement?.dataset?.world || "origami",
      ts: new Date().toISOString(),
      counts: delta
    };
    const body = JSON.stringify(payload);
    try {
      if (useBeacon && navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon(endpoint, blob);
      } else {
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body
        }).catch(() => {});
      }
      Object.keys(delta).forEach((key) => {
        lastSent[key] += delta[key];
      });
      lastFlushAt = now();
    } catch (_err) {
      // fail-safe: không làm gãy UI
    }
  };

  const scheduleFlush = () => {
    if (flushTimer) return;
    flushTimer = window.setTimeout(() => {
      flushTimer = null;
      flush(false);
    }, 5000);
  };

  const track = (type) => {
    if (!counts[type]) counts[type] = 0;
    counts[type] += 1;
    if (now() - lastFlushAt > 15000) {
      flush(false);
      return;
    }
    scheduleFlush();
  };

  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush(true);
  });
  window.addEventListener("beforeunload", () => flush(true));

  return { track };
})();
let threadsByBrand = new Map();
let threadsByCode = new Map();
let threadsByCanonicalKey = new Map();
let brandNamesSorted = [];
let brandKeyToName = new Map();
const matchCache = new Map();
const MATCH_CACHE_LIMIT = 60;
const MATCH_DEBOUNCE_MS = 160;
let matchDebounceTimer = null;
const RESULT_PAGE_SIZE = 60;
let resultRenderLimit = RESULT_PAGE_SIZE;
let lastGroupedResults = null;
let searchWorker = null;
let searchWorkerReady = false;
let searchWorkerSeq = 0;
const searchWorkerRequests = new Map();
const PIN_STORAGE_KEY = "tc_pins_v1";
let pinnedItems = [];
const PROJECT_STORAGE_KEY = "tc_project_current";
const PROJECT_RECENT_KEY = "tc_projects_recent";
let currentProject = "";
let recentProjects = [];
let libraryItemsCache = [];

function renderBrandFilters(brands) {
  if (!brandFilters) return;
  brandFilters.innerHTML = "";
  brands.forEach(rawBrand => {
    const brandName = (rawBrand || "").trim();
    if (!brandName) return;
    const label = document.createElement("label");
    label.className = "cursor-pointer";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "brand-filter peer sr-only";
    input.value = brandName;
    input.checked = true;

    const pill = document.createElement("span");
    pill.className = "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white/70 text-gray-700 shadow-sm transition duration-200 hover:shadow-md hover:-translate-y-px peer-checked:bg-indigo-50 peer-checked:border-indigo-500 peer-checked:text-indigo-700 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-400 peer-focus-visible:ring-offset-2";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "w-4 h-4 text-indigo-600 opacity-0 transition-opacity duration-150 peer-checked:opacity-100");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute("d", "M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0l-3.25-3.25a1 1 0 011.42-1.42l2.54 2.54 6.54-6.54a1 1 0 011.42 0z");
    path.setAttribute("clip-rule", "evenodd");
    svg.appendChild(path);

    const text = document.createElement("span");
    text.textContent = brandName;

    pill.appendChild(svg);
    pill.appendChild(text);
    label.appendChild(input);
    label.appendChild(pill);
    brandFilters.appendChild(label);
  });
}

function getUniqueBrands(list) {
  const brands = [];
  list.forEach(t => {
    const name = (t.brand || "").trim();
    if (!name || brands.includes(name)) return;
    brands.push(name);
  });
  return brands;
}

function formatFirestoreError(err, fallback = "Có lỗi Firestore") {
  const msg = (err && (err.message || err.code)) || "";
  const lower = msg.toLowerCase();
  if (lower.includes("permission-denied")) {
    return "Bạn chưa cấp quyền / rules đang chặn. Kiểm tra Firestore rules và đăng nhập.";
  }
  if (lower.includes("has not been used") || lower.includes("api not enabled")) {
    return "Firestore chưa bật API. Bật Cloud Firestore và thử lại.";
  }
  return msg || fallback;
}

function populateContributeBrands(brands = getUniqueBrands(threads)) {
  if (!contributeBrandSelect) return;
  contributeBrandSelect.innerHTML = '<option value="">Chọn hãng chỉ</option>';
  brands.forEach(b => {
    const opt = document.createElement("option");
    opt.value = b;
    opt.textContent = b;
    contributeBrandSelect.appendChild(opt);
  });
}

function openContributeModal() {
  populateContributeBrands();
  contributeOverlay?.classList.remove("hidden");
  if (contributeModal) {
    contributeModal.classList.remove("hidden");
    contributeModal.classList.add("flex");
  }
}

function closeContributeModal() {
  contributeOverlay?.classList.add("hidden");
  if (contributeModal) {
    contributeModal.classList.add("hidden");
    contributeModal.classList.remove("flex");
  }
  if (contributeBrandSelect) contributeBrandSelect.value = "";
  if (contributeBrandCustom) contributeBrandCustom.value = "";
  if (contributeCode) contributeCode.value = "";
  if (contributeName) contributeName.value = "";
  if (contributeHex) contributeHex.value = "";
}

async function loadPendingSubmissionsUI() {
  if (!verifyList) return;
  verifyList.innerHTML = "<div class='text-gray-500'>Đang tải...</div>";

  if (!ensureAuthReady() || !authApi?.db || !currentUser) {
    verifyList.innerHTML = "<div class='text-gray-500'>Cần đăng nhập.</div>";
    return;
  }
  try {
    await refreshAdmin(true);
    if (!isAdminUser) {
      verifyList.innerHTML = "<div class='text-red-600'>Bạn không có quyền xác minh (cần admin).</div>";
      return;
    }
    const subs = await listPendingSubmissions(authApi.db, 50);
    const withVotes = await Promise.all(
      subs.map(async (s) => {
        try {
          const summary = await getVoteSummary(authApi.db, s.id);
          return { ...s, summary };
        } catch (err) {
          if (isPermissionDenied(err)) {
            return { ...s, summary: { confirmCount: 0, rejectCount: 0 } };
          }
          throw err;
        }
      })
    );
    pendingSubmissions = withVotes;
    renderVerifyList();
  } catch (err) {
    if (isPermissionDenied(err)) {
      console.info("[verify] permission denied", { code: err?.code, msg: err?.message });
      verifyList.innerHTML = "<div class='text-red-600'>Bạn không có quyền xác minh (cần admin).</div>";
      return;
    }
    const friendly = typeof formatFirestoreError === "function" ? formatFirestoreError(err, "Lỗi tải submissions") : (err?.message || "Lỗi tải submissions");
    console.error(err);
    verifyList.innerHTML = `<div class='text-red-600'>${friendly}</div>`;
  }
}

function renderVerifyList() {
  if (!verifyList) return;
  if (!pendingSubmissions.length) {
    verifyList.innerHTML = "<div class='text-gray-500'>Không có submissions chờ.</div>";
    return;
  }
  verifyList.innerHTML = pendingSubmissions.map(item => {
    const summary = item.summary || { confirmCount: 0, rejectCount: 0 };
    const canApprove = isAdminUser;
    const createdAt = item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : "";
    return `
      <div class="border border-gray-200 rounded-xl p-3 shadow-sm">
        <div class="flex items-start gap-3 justify-between">
          <div class="space-y-1">
            <div class="font-semibold">${item.brand || ""} ${item.code || ""}</div>
            <div class="text-gray-600 text-sm">${item.name || ""}</div>
            <div class="flex items-center gap-2 text-sm">
              <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg border bg-gray-50">
                <span class="w-4 h-4 rounded border" style="background:${item.hex || "#fff"}"></span>
                <span>${item.hex || ""}</span>
              </span>
              <span class="text-gray-500">by ${item.createdByName || item.createdByUid || "?"}</span>
              ${createdAt ? `<span class="text-gray-400 text-xs">${createdAt}</span>` : ""}
            </div>
            <div class="text-xs text-gray-600">Xác nhận: ${summary.confirmCount} | Từ chối: ${summary.rejectCount}</div>
          </div>
          <div class="flex flex-col gap-2">
            <button data-action="vote-confirm" data-id="${item.id}" class="px-3 py-1 rounded-lg border text-emerald-700 border-emerald-200 hover:bg-emerald-50">Xác nhận</button>
            <button data-action="vote-reject" data-id="${item.id}" class="px-3 py-1 rounded-lg border text-rose-700 border-rose-200 hover:bg-rose-50">Từ chối</button>
            ${canApprove ? `<button data-action="approve" data-id="${item.id}" class="px-3 py-1 rounded-lg bg-amber-600 text-white hover:bg-amber-700">Duyệt</button>` : ""}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function openVerifyModal() {
  verifyOverlay?.classList.remove("hidden");
  if (verifyModal) {
    verifyModal.classList.remove("hidden");
    verifyModal.classList.add("flex");
  }
  loadPendingSubmissionsUI();
}

function closeVerifyModal() {
  verifyOverlay?.classList.add("hidden");
  if (verifyModal) {
    verifyModal.classList.add("hidden");
    verifyModal.classList.remove("flex");
  }
}

async function fetchVerifiedThreads() {
  if (!authApi?.db || typeof authApi.getDocs !== "function") return [];
  try {
    const ref = authApi.collection(authApi.db, "verifiedThreads");
    console.info("[fetchVerifiedThreads] path", ref.path || "verifiedThreads");
    const snap = await authApi.getDocs(ref);
    const raws = [];
    snap.forEach(d => {
      const data = d.data();
      if (!data) return;
      raws.push({
        ...data,
        source: { ...(data.source || {}), type: "CROWD_VERIFIED", provider: "firestore" },
        confidence: typeof data.confidence === "number" ? data.confidence : 0.85
      });
    });
    return normalizeAndDedupeThreads(raws, { source: { type: "CROWD_VERIFIED" }, confidence: 0.85 });
  } catch (err) {
    if (isPermissionDenied(err)) {
      console.info("[fetchVerifiedThreads] permission denied, skip verified threads");
      return [];
    }
    console.error(err);
    return [];
  }
}

function mergeVerifiedThreads(list) {
  if (!Array.isArray(list) || !list.length) return;
  const map = new Map();
  threads.forEach(t => {
    const key = t.canonicalKey || `${(t.brand || "").toLowerCase()}::${t.code}`;
    if (key) map.set(key, t);
  });
  list.forEach(v => {
    const key = v.canonicalKey || `${(v.brand || "").toLowerCase()}::${v.code}`;
    if (!key) return;
    const existing = map.get(key);
    if (existing) {
      const currentConf = typeof existing.confidence === "number" ? existing.confidence : 0;
      const verifiedConf = typeof v.confidence === "number" ? v.confidence : 0;
        if (verifiedConf > currentConf) {
        const altEntry = existing.hex ? {
          hex: existing.hex,
          rgb: existing.rgb,
          source: existing.source,
          confidence: existing.confidence
        } : null;
        const mergedAlt = [];
        if (v.alternates) mergedAlt.push(...v.alternates);
        if (altEntry) mergedAlt.push(altEntry);
          const updated = { ...existing, ...v, alternates: mergedAlt };
          updated.lab = getLabForHex(updated.hex);
          map.set(key, updated);
        } else {
        const altEntry = {
          hex: v.hex,
          rgb: v.rgb,
          source: v.source,
          confidence: v.confidence
        };
        const mergedAlt = existing.alternates ? [...existing.alternates] : [];
        mergedAlt.push(altEntry);
        existing.alternates = mergedAlt;
        map.set(key, existing);
      }
    } else {
      map.set(key, { ...v, lab: getLabForHex(v.hex) });
    }
  });
  threads = Array.from(map.values());
  matchCache.clear();
  rebuildIndexes(threads);
  const brands = getUniqueBrands(threads);
  renderBrandFilters(brands);
  populateContributeBrands(brands);
  if (lastChosenHex) {
    runSearch(lastChosenHex);
  }
}

const resultBox = document.getElementById("result");
const deltaSlider = document.getElementById("deltaSlider");
const deltaValueEls = document.querySelectorAll("#deltaValue, #deltaValueText");
const deltaMethodSelect = document.getElementById("deltaMethod");
const pinPanel = document.getElementById("pinPanel");
const pinList = document.getElementById("pinList");
const pinClear = document.getElementById("pinClear");
const brandFilters = document.getElementById("brandFilters");
const verifiedOnlyToggle = document.getElementById("verifiedOnlyToggle");
const btnFindNearest = document.getElementById("btnFindNearest");
const colorPicker = document.getElementById("colorPicker");
const codeInput = document.getElementById("codeInput");
const btnFindByCode = document.getElementById("btnFindByCode");
const imgInput = document.getElementById("imgInput");
const canvas = document.getElementById("canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

// Inspector elements
const drawer = document.getElementById("colorInspector");
const drawerOverlay = document.getElementById("inspectorOverlay");
const drawerCloseBtn = document.getElementById("inspectorClose");
const drawerTitle = document.getElementById("inspectorTitle");
const inspectorBrand = document.getElementById("inspectorBrand");
const inspectorCode = document.getElementById("inspectorCode");
const inspectorName = document.getElementById("inspectorName");
const inspectorDelta = document.getElementById("inspectorDelta");
const inspectorHex = document.getElementById("inspectorHex");
const inspectorRgb = document.getElementById("inspectorRgb");
const inspectorRgbString = document.getElementById("inspectorRgbString");
const inspectorLab = document.getElementById("inspectorLab");
const inspectorHsl = document.getElementById("inspectorHsl");
const previewMain = document.getElementById("previewMain");
const previewLight = document.getElementById("previewLight");
const previewDark = document.getElementById("previewDark");
const copyButtons = document.querySelectorAll("[data-copy]");
const copyAllBtn = document.getElementById("copyAll");
const toastContainer = document.getElementById("toastContainer");
const btnPickScreen = document.getElementById("btnPickScreen");
const eyedropperHint = document.getElementById("eyedropperHint");
const eyedropperFallback = document.getElementById("eyedropperFallback");
const fallbackColorPicker = document.getElementById("fallbackColorPicker");
const portalCtaWrap = document.getElementById("portalCtaWrap");
const portalCta = document.getElementById("portalCta");
function getAuthApi() {
  return window.firebaseAuth || null;
}

async function fetchAdminApi(path, options = {}) {
  const api = window.firebaseAuth || window.firebaseAuthApi || null;
  const user = api?.auth?.currentUser || api?.user || null;
  if (!user || typeof user.getIdToken !== "function") {
    throw new Error("Cần đăng nhập để gọi API quản trị.");
  }
  const token = await user.getIdToken();
  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${token}`);
  return fetch(path, { ...options, headers });
}

window.tcAdminApi = { fetch: fetchAdminApi };
const authApi = new Proxy({}, {
  get: (_target, prop) => {
    const api = getAuthApi();
    return api ? api[prop] : undefined;
  }
});
function getAuthInitError() {
  return getAuthApi()?.initError || null;
}
function isPermissionDenied(err) {
  const msg = String(err?.message || "");
  return err?.code === "permission-denied" || msg.includes("Missing or insufficient permissions");
}
let hasBoundAuth = false;
function bindAuth() {
  const err = getAuthInitError();
  if (err) {
    console.error("Auth init error", err);
    return;
  }
  const api = getAuthApi();
  if (!api || typeof api.onAuthStateChanged !== "function") return;
  if (hasBoundAuth) return;
  api.onAuthStateChanged(updateUserUI);
  hasBoundAuth = true;
}
const libraryOverlay = document.getElementById("libraryOverlay");
const libraryModal = document.getElementById("libraryModal");
const libraryClose = document.getElementById("libraryClose");
let btnExportCsv = document.getElementById("btnExportCsv");
const libraryList = document.getElementById("libraryList");
const contributeOverlay = document.getElementById("contributeOverlay");
const contributeModal = document.getElementById("contributeModal");
const contributeClose = document.getElementById("contributeClose");
const contributeCancel = document.getElementById("contributeCancel");
const contributeBrandSelect = document.getElementById("contributeBrandSelect");
const contributeBrandCustom = document.getElementById("contributeBrandCustom");
const contributeCode = document.getElementById("contributeCode");
const contributeName = document.getElementById("contributeName");
const contributeHex = document.getElementById("contributeHex");
const contributeSubmit = document.getElementById("contributeSubmit");
const btnUseCurrentColor = document.getElementById("btnUseCurrentColor");
const verifyOverlay = document.getElementById("verifyOverlay");
const verifyModal = document.getElementById("verifyModal");
const verifyClose = document.getElementById("verifyClose");
const verifyList = document.getElementById("verifyList");
const hasToolUI = !!resultBox;

function loadThreads() {
  if (!hasToolUI) return;
  renderResultState("loading");
  const threadsUrl = new URL("./threads.json", import.meta.url);
  fetch(threadsUrl)
  .then(res => res.json())
  .then(data => {
    const normalized = normalizeAndDedupeThreads(data, {
      source: { type: "runtime_json" }
    });
    matchCache.clear();
    labCache.clear();
    threads = normalized.map(t => ({ ...t }));
    rebuildIndexes(threads);
    initSearchWorker(threads);
    const brands = getUniqueBrands(threads);
    renderBrandFilters(brands);
    populateContributeBrands(brands);
    fetchVerifiedThreads().then(list => {
      verifiedThreads = list;
      mergeVerifiedThreads(list);
    });
    isDataReady = true;

    renderResultState("ready");

    restoreInspectorFromUrl();
  })
  .catch(() => {
    renderResultState("error");
  });
}

if (hasToolUI) {
  loadThreads();
}


//======================= DATA LOADING =======================

//======================= CORE LOGIC =======================
function getSelectedBrands() {
  return [...document.querySelectorAll(".brand-filter:checked")].map(cb => cb.value);
}

function addTopK(list, item, limit) {
  if (list.length < limit) {
    list.push(item);
    return;
  }
  let worstIndex = 0;
  let worst = list[0].delta;
  for (let i = 1; i < list.length; i += 1) {
    if (list[i].delta > worst) {
      worst = list[i].delta;
      worstIndex = i;
    }
  }
  if (item.delta < worst) list[worstIndex] = item;
}

function findNearestColors(chosenHex, limit = 100, method = "76") {
  const normalized = normalizeHex(chosenHex);
  if (!normalized) return [];
  const chosenLab = getLabForHex(normalized);
  if (!chosenLab) return [];
  const brands = getSelectedBrands();
  if (!brands.length) return [];
  const requireVerified = useVerifiedOnly;
  const lists = brands.map(brand => threadsByBrand.get(brand) || []);
  if (!lists.length) return [];

  if (method === "2000") {
    const candidateCount = Math.max(limit * 20, 200);
    const candidates = [];
    for (const list of lists) {
      for (const thread of list) {
        if (requireVerified && !isVerifiedThread(thread)) continue;
        const lab = ensureLab(thread);
        if (!lab) continue;
        const deltaFast = deltaE76(chosenLab, lab);
        addTopK(candidates, { thread, lab, delta: deltaFast }, candidateCount);
      }
    }
    const results = [];
    for (const candidate of candidates) {
      const delta = deltaE2000(chosenLab, candidate.lab);
      addTopK(results, { ...candidate.thread, lab: candidate.lab, delta }, limit);
    }
    return results.sort((a, b) => a.delta - b.delta);
  }

  const results = [];
  for (const list of lists) {
    for (const thread of list) {
      if (requireVerified && !isVerifiedThread(thread)) continue;
      const lab = ensureLab(thread);
      if (!lab) continue;
      const delta = deltaE76(chosenLab, lab);
      addTopK(results, { ...thread, lab, delta }, limit);
    }
  }
  return results.sort((a, b) => a.delta - b.delta);
}

function parseCodeQuery(raw) {
  const trimmed = String(raw || "").trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();

  for (const entry of brandNamesSorted) {
    if (!entry?.name) continue;
    const nameLower = entry.name.toLowerCase();
    if (lower.startsWith(nameLower + " ")) {
      const codePart = trimmed.slice(entry.name.length).trim();
      const codeKey = normalizeCodeKey(codePart);
      if (codeKey) {
        return { mode: "brand", brand: entry.name, brandKey: entry.key, codeKey };
      }
    }
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    const possibleBrand = parts.slice(0, -1).join(" ");
    const brandKey = normalizeBrandKey(possibleBrand);
    const mappedBrand = brandKeyToName.get(brandKey);
    const codeKey = normalizeCodeKey(parts[parts.length - 1]);
    if (mappedBrand && codeKey) {
      return { mode: "brand", brand: mappedBrand, brandKey, codeKey };
    }
  }

  const codeKey = normalizeCodeKey(trimmed);
  if (codeKey) return { mode: "code", codeKey };
  return null;
}

function renderCodeLookupResults(codeLabel, items) {
  if (!resultBox) return;
  const count = items.length;
  const title = count
    ? t("tc.code.found", "Tìm thấy {count} kết quả cho mã {code}.", { count, code: codeLabel })
    : t("tc.code.notFound", "Không tìm thấy kết quả cho mã {code}.", { code: codeLabel });
  const header = `<div class="mb-4 text-sm tc-muted">${title}</div>`;
  if (!count) {
    resultBox.innerHTML = header;
    return;
  }
  const cards = items.map(item => renderColorCard(item, item.hex)).join("");
  resultBox.innerHTML = `${header}<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">${cards}</div>`;
}

function initSearchWorker(payloadThreads) {
  if (searchWorkerReady || typeof Worker === "undefined") return;
  try {
    searchWorker = new Worker(new URL("./workers/thread_search.worker.js", import.meta.url), { type: "module" });
  } catch (err) {
    searchWorker = null;
    return;
  }
  searchWorker.onmessage = (event) => {
    const data = event.data || {};
    if (data.type === "ready") {
      searchWorkerReady = true;
      return;
    }
    const entry = searchWorkerRequests.get(data.id);
    if (!entry) return;
    searchWorkerRequests.delete(data.id);
    if (data.error) {
      entry.reject(new Error(data.error));
      return;
    }
    entry.resolve(data.results || []);
  };
  searchWorker.postMessage({ type: "init", threads: payloadThreads || [] });
}

function searchNearestAsync(chosenHex, limit, method) {
  if (!searchWorker || !searchWorkerReady) {
    return Promise.resolve(findNearestColors(chosenHex, limit, method));
  }
  const normalized = normalizeHex(chosenHex);
  if (!normalized) return Promise.resolve([]);
  const brands = getSelectedBrands();
  const payload = {
    targetHex: normalized,
    brands,
    verifiedOnly: useVerifiedOnly,
    method,
    limit
  };
  return new Promise((resolve, reject) => {
    const id = ++searchWorkerSeq;
    searchWorkerRequests.set(id, { resolve, reject });
    searchWorker.postMessage({ type: "search", id, payload });
  }).catch(() => findNearestColors(chosenHex, limit, method));
}

function groupByColorSimilarity(colors, threshold = 2.5, method = "76") {
  const groups = [];
  colors.forEach(c => {
    const g = groups.find(gr => getDelta(c.lab, gr.leader.lab, method) <= threshold);
    g ? g.items.push(c) : groups.push({ leader: c, items: [c] });
  });
  return groups;
}

function buildMatchCacheKey(hex, threshold, method) {
  const normalized = normalizeHex(hex);
  const brands = getSelectedBrands().slice().sort();
  return [
    normalized || "",
    useVerifiedOnly ? "1" : "0",
    method,
    threshold.toFixed(2),
    brands.join("|")
  ].join("::");
}

function setMatchCache(key, value) {
  if (matchCache.has(key)) {
    matchCache.delete(key);
  }
  matchCache.set(key, value);
  if (matchCache.size > MATCH_CACHE_LIMIT) {
    const oldest = matchCache.keys().next().value;
    if (oldest) matchCache.delete(oldest);
  }
}

async function runSearch(hex) {
  const normalized = normalizeHex(hex);
  if (!normalized) return;
  lastChosenHex = normalized;
  const method = currentDeltaMethod;
  const key = buildMatchCacheKey(normalized, currentDeltaThreshold, method);
  const cached = matchCache.get(key);
  if (cached) {
    lastResults = cached.base;
    showGroupedResults(cached.grouped, normalized);
    return;
  }
  renderResultState("loading");
  const base = await searchNearestAsync(normalized, 100, method);
  const filtered = base.filter(t => t.delta <= currentDeltaThreshold);
  if (!filtered.length) {
    lastResults = base;
    lastGroupedResults = null;
    currentRendered = [];
    resultRenderLimit = RESULT_PAGE_SIZE;
    renderResultState("no-results");
    return;
  }
  const grouped = groupByColorSimilarity(filtered, currentDeltaThreshold, method);
  lastResults = base;
  setMatchCache(key, { base, grouped });
  showGroupedResults(grouped, normalized);
}

function scheduleSearch(hex) {
  if (matchDebounceTimer) window.clearTimeout(matchDebounceTimer);
  matchDebounceTimer = window.setTimeout(() => {
    runSearch(hex);
  }, MATCH_DEBOUNCE_MS);
}

function renderResultState(type) {
  if (!resultBox) return;
  if (type === "loading") {
    resultBox.innerHTML = `<p class='text-gray-500 text-center'>${t("tc.status.loading", "Đang chuẩn bị dữ liệu...")}</p>`;
    return;
  }
  if (type === "ready") {
    const readyText = t("tc.status.ready", "Xong. Dữ liệu đã sẵn sàng.");
    const emptyText = t("tc.status.empty", "Chưa chọn màu — hãy chọn màu trực tiếp hoặc từ ảnh.");
    resultBox.innerHTML = `<div class='text-center space-y-1'>
      <p class='text-gray-500'>${readyText}</p>
      <p class='text-gray-500'>${emptyText}</p>
    </div>`;
    return;
  }
  if (type === "no-results") {
    const noResults = t("tc.status.noResults", "Không tìm thấy kết quả trong ngưỡng ΔE hiện tại. Thử tăng ΔE hoặc chọn thêm hãng.");
    resultBox.innerHTML = `<p class='text-gray-500 text-center'>${noResults}</p>`;
    return;
  }
  if (type === "error") {
    const errText = t("tc.status.error", "Lỗi tải dữ liệu. Vui lòng thử lại.");
    const retryText = t("tc.status.retry", "Thử lại");
    resultBox.innerHTML = `<div class='text-center space-y-3'>
      <p class='text-red-600'>${errText}</p>
      <button class="tc-btn tc-chip px-4 py-2" data-action="retry-load">${retryText}</button>
    </div>`;
  }
}

function loadPins() {
  try {
    const raw = localStorage.getItem(PIN_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    pinnedItems = Array.isArray(parsed) ? parsed.slice(0, 3) : [];
  } catch (err) {
    pinnedItems = [];
  }
  renderPinPanel();
  syncPinButtons();
}

function savePins() {
  try {
    localStorage.setItem(PIN_STORAGE_KEY, JSON.stringify(pinnedItems));
  } catch (err) {}
}

function isPinned(hex) {
  const normalized = normalizeHex(hex);
  return pinnedItems.some(item => item.hex === normalized);
}

function renderPinPanel() {
  if (!pinPanel || !pinList) return;
  if (!pinnedItems.length) {
    pinPanel.classList.add("hidden");
    pinList.innerHTML = "";
    return;
  }
  pinPanel.classList.remove("hidden");
  pinList.innerHTML = pinnedItems.map(item => {
    const deltaText = typeof item.delta === "number" ? item.delta.toFixed(2) : item.delta || "";
    return `
      <div class="pin-item flex items-center gap-3" data-hex="${item.hex}">
        <div class="pin-swatch" style="background:${item.hex}"></div>
        <div class="flex-1 min-w-0">
          <div class="font-semibold truncate">${item.brand || ""} ${item.code || ""}</div>
          <div class="tc-muted text-xs">ΔE ${deltaText}</div>
        </div>
        <div class="pin-actions flex items-center gap-2">
          <button data-action="pin-copy" data-hex="${item.hex}">${t("tc.pin.copyCode", "Sao chép mã")}</button>
          <button data-action="pin-remove" data-hex="${item.hex}">${t("tc.pin.remove", "Bỏ ghim")}</button>
        </div>
      </div>
    `;
  }).join("");
}

function addPin(item) {
  if (pinnedItems.length >= 3) {
    showToast(t("tc.pin.limit", "Chỉ ghim tối đa {count} kết quả.", { count: 3 }));
    return false;
  }
  pinnedItems.push(item);
  savePins();
  telemetry.track("pin");
  renderPinPanel();
  syncPinButtons();
  return true;
}

function removePin(hex) {
  const normalized = normalizeHex(hex);
  pinnedItems = pinnedItems.filter(item => item.hex !== normalized);
  savePins();
  renderPinPanel();
  syncPinButtons();
}

function updatePinButton(btn, pinned) {
  if (!btn) return;
  btn.dataset.pinned = pinned ? "1" : "0";
  btn.textContent = pinned ? t("tc.pin.unpin", "Bỏ ghim") : t("tc.pin.pin", "Ghim");
}

function syncPinButtons() {
  document.querySelectorAll('[data-action="pin-toggle"]').forEach((btn) => {
    const hex = btn.dataset.hex;
    updatePinButton(btn, isPinned(hex));
  });
}

function loadProjectPrefs() {
  try {
    currentProject = localStorage.getItem(PROJECT_STORAGE_KEY) || "";
  } catch (err) {
    currentProject = "";
  }
  try {
    const raw = localStorage.getItem(PROJECT_RECENT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    recentProjects = Array.isArray(parsed) ? parsed.slice(0, 10) : [];
  } catch (err) {
    recentProjects = [];
  }
}

function saveProjectPrefs(name) {
  const trimmed = (name || "").trim();
  currentProject = trimmed;
  if (trimmed) {
    recentProjects = [trimmed, ...recentProjects.filter(p => p !== trimmed)].slice(0, 10);
  }
  try {
    localStorage.setItem(PROJECT_STORAGE_KEY, currentProject);
    localStorage.setItem(PROJECT_RECENT_KEY, JSON.stringify(recentProjects));
  } catch (err) {}
}

function bindProjectInput() {
  const input = document.getElementById("projectInput");
  const list = document.getElementById("projectList");
  if (!input || !list) return;
  input.placeholder = t("tc.project.placeholder", "Nhập tên dự án");
  input.setAttribute("aria-label", t("tc.project.label", "Dự án"));
  input.value = currentProject || "";
  list.innerHTML = recentProjects.map(item => `<option value="${item}"></option>`).join("");
  if (input.dataset.bound === "1") return;
  input.dataset.bound = "1";
  input.addEventListener("input", () => {
    saveProjectPrefs(input.value);
  });
}

//======================= RENDERING =======================


// Không dùng tên biến/param `t` cho item vì `t()` là hàm i18n.
function renderColorCard(item, chosenHex) {
  const deltaText = typeof item.delta === "number" ? item.delta.toFixed(2) : "";
  const labAttr = item.lab ? item.lab.join(",") : "";
  const pinned = isPinned(item.hex);
  const saveLabel = t("tc.result.save", "Lưu");
  const pinLabel = pinned ? t("tc.pin.unpin", "Bỏ ghim") : t("tc.pin.pin", "Ghim");
  const copyCodeLabel = t("tc.result.copyCode", "Sao chép mã");
  const copyFullLabel = t("tc.result.copyFull", "Sao chép đầy đủ");
  return `
    <div class="result-item rounded-xl shadow-md bg-white p-3 hover:scale-[1.02] transition border border-transparent data-[selected=true]:border-indigo-400 data-[selected=true]:shadow-lg cursor-pointer"
         data-hex="${item.hex}" data-brand="${item.brand || ""}" data-code="${item.code || ""}" data-name="${item.name || ""}" data-delta="${deltaText}" data-lab="${labAttr}">
      <div class="flex gap-3 items-center">
        <div class="w-12 h-12 rounded-lg border" style="background:${item.hex}"></div>
        <div class="flex-1 text-sm">
          <div class="font-semibold">${item.brand || ""} ${item.code || ""}</div>
          <div class="text-gray-600">${item.name || ""}</div>

          <div class="text-xs text-gray-500">ΔE ${deltaText}</div>

        </div>
      </div>
      <div class="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <div class="w-4 h-4 rounded border" style="background:${chosenHex}"></div>
        <span>so với</span>
        <div class="w-4 h-4 rounded border" style="background:${item.hex}"></div>
      </div>
      <div class="mt-3 flex justify-end">
        <button class="btn-save px-3 py-1 text-xs rounded-lg border text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                data-action="save-search" data-save-hex="${item.hex}">
          ${saveLabel}
        </button>
        <button class="btn-pin ml-2 px-3 py-1 text-xs rounded-lg border"
                data-action="pin-toggle" data-hex="${item.hex}" data-pinned="${pinned ? "1" : "0"}">
          ${pinLabel}
        </button>
        <button class="btn-copy-code ml-2 px-3 py-1 text-xs rounded-lg border"
                data-action="copy-code">
          ${copyCodeLabel}
        </button>
        <button class="btn-copy-full ml-2 px-3 py-1 text-xs rounded-lg border"
                data-action="copy-full">
          ${copyFullLabel}
        </button>
      </div>
    </div>
  `;
}

function renderGroupedResults(groups, chosenHex, limit) {
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  const chosenLabel = t("tc.result.chosen", "Màu đã chọn");
  const projectLabel = t("tc.project.label", "Dự án");
  const projectPlaceholder = t("tc.project.placeholder", "Nhập tên dự án");
  const projectBlock = `
    <div class="flex flex-wrap items-center gap-3 mb-4">
      <label for="projectInput" class="text-sm tc-muted">${projectLabel}</label>
      <input id="projectInput" class="tc-field text-sm" list="projectList" data-i18n-attr="placeholder:tc.project.placeholder" placeholder="${projectPlaceholder}">
      <datalist id="projectList"></datalist>
    </div>
  `;
  let remaining = limit;
  const sections = groups.map((group, i) => {
    if (remaining <= 0) return "";
    const items = group.items.slice(0, remaining);
    remaining -= items.length;
    if (!items.length) return "";
    const groupLabel = t("tc.result.group", "Nhóm {index}", { index: i + 1 });
    const colorsLabel = t("tc.result.colors", "{count} màu", { count: group.items.length });
    return `
      <section class="mb-8">
        <h3 class="font-semibold mb-3 text-gray-700 flex items-center gap-2">
  <span>${groupLabel}</span>
  <span class="inline-block w-3 h-3 rounded-sm border" style="background:${chosenHex}"></span>
  <span>${colorsLabel}</span>
</h3>


        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          ${items.map(item => renderColorCard(item, chosenHex)).join("")}
        </div>
      </section>
    `;
  }).join("");
  const moreLabel = t("tc.result.loadMore", `Xem thêm (${total - limit})`, { count: total - limit });
  const moreButton = total > limit
    ? `<div class="mt-6 flex justify-center">
        <button class="tc-btn tc-chip px-4 py-2" data-action="load-more-results">${moreLabel}</button>
      </div>`
    : "";
  resultBox.innerHTML = `
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-lg border" style="background:${chosenHex}"></div>
      <div class="font-semibold">${chosenLabel}</div>
    </div>
    ${projectBlock}
    ${sections}
    ${moreButton}
  `;
}

function showGroupedResults(groups, chosenHex) {
  currentRendered = groups.flatMap(g => g.items);
  if (currentRendered.length) {
    telemetry.track("search_result");
  }
  lastGroupedResults = groups;
  const total = currentRendered.length;
  resultRenderLimit = Math.min(RESULT_PAGE_SIZE, total);
  renderGroupedResults(groups, chosenHex, resultRenderLimit);
  bindProjectInput();
}

function loadMoreResults() {
  if (!lastGroupedResults || !lastChosenHex) return;
  const total = lastGroupedResults.reduce((sum, group) => sum + group.items.length, 0);
  resultRenderLimit = Math.min(resultRenderLimit + RESULT_PAGE_SIZE, total);
  renderGroupedResults(lastGroupedResults, lastChosenHex, resultRenderLimit);
}

//======================= INSPECTOR =======================
function setSelectedItem(el) {
  if (selectedItemEl === el) return;
  if (selectedItemEl) selectedItemEl.dataset.selected = "false";
  selectedItemEl = el;
  if (selectedItemEl) selectedItemEl.dataset.selected = "true";
}

function showToast(text) {
  if (!toastContainer) {
    if (text) console.info("[toast]", text);
    return;
  }
  const item = document.createElement("div");
  item.className = "bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg animate-fade-in-up";
  item.textContent = text;
  toastContainer.appendChild(item);
  setTimeout(() => {
    item.classList.add("opacity-0", "translate-y-1");
    setTimeout(() => item.remove(), 400);
  }, 1500);
}

function copyToClipboard(text, label) {
  if (!text) return;
  telemetry.track("copy");
  const message = label
    ? t("tc.toast.copiedWith", "Đã sao chép {label}.", { label })
    : t("tc.toast.copied", "Đã sao chép!");
  const fallbackCopy = () => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();

    try { document.execCommand("copy"); showToast(message); } catch (e) {}

    ta.remove();
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {

      showToast(message);

    }).catch(() => fallbackCopy());
  } else {
    fallbackCopy();
  }
}

function populateInspector(data) {
  const { hex, brand, code, name, delta, lab } = data;
  const normalizedHex = normalizeHex(hex);
  if (!normalizedHex) return;
  const { rgbArray, rgbString } = hexToRgbString(normalizedHex);
  const labValues = lab && lab.length === 3 ? lab : rgbToLab(rgbArray);
  const hsl = hexToHsl(rgbArray);

  previewMain.style.background = normalizedHex;
  previewLight.style.background = normalizedHex;
  previewDark.style.background = normalizedHex;

  inspectorHex.textContent = normalizedHex;
  inspectorRgb.textContent = rgbArray.join(", ");
  inspectorRgbString.textContent = rgbString;
  inspectorLab.textContent = formatLab(labValues).join(", ");
  inspectorHsl.textContent = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;


  inspectorBrand.textContent = brand || "—";
  inspectorCode.textContent = code || "—";
  inspectorName.textContent = name || "—";
  inspectorDelta.textContent = delta ? `ΔE ${delta}` : "—";
  drawerTitle.textContent = "Bảng thông tin màu";
  drawer.dataset.hex = normalizedHex;
}

function openInspector(data, triggerEl) {
  populateInspector(data);
  lastFocusedItem = triggerEl || null;
  drawer.classList.remove("translate-x-full", "md:translate-x-full", "translate-y-full");
  drawer.classList.add("open");
  drawerOverlay.classList.remove("pointer-events-none", "opacity-0");
  drawerOverlay.classList.add("opacity-50");
  (drawerCloseBtn || drawer).focus();
  updateUrlWithColor(data.hex);
}

function closeInspector() {
  drawer.classList.add("translate-x-full", "md:translate-x-full", "translate-y-full");
  drawer.classList.remove("open");
  drawerOverlay.classList.add("pointer-events-none", "opacity-0");
  drawerOverlay.classList.remove("opacity-50");
  if (selectedItemEl) selectedItemEl.dataset.selected = "false";
  selectedItemEl = null;
  clearUrlColor();
  if (lastFocusedItem) lastFocusedItem.focus();
}

function handleResultClick(e) {
  const card = e.target.closest(".result-item");
  if (!card) return;
  const hex = card.dataset.hex;
  if (!hex) return;
  const labData = card.dataset.lab ? card.dataset.lab.split(",").map(Number) : null;
  setSelectedItem(card);
  openInspector({
    hex,
    brand: card.dataset.brand,
    code: card.dataset.code,
    name: card.dataset.name,
    delta: card.dataset.delta,
    lab: labData
  }, card);
}

function handleResultContainerClick(e) {
  const retryBtn = e.target.closest('[data-action="retry-load"]');
  if (retryBtn) {
    e.preventDefault();
    if (typeof loadThreads === "function") loadThreads();
    return;
  }
  const loadMoreBtn = e.target.closest('[data-action="load-more-results"]');
  if (loadMoreBtn) {
    e.preventDefault();
    loadMoreResults();
    return;
  }
  const pinBtn = e.target.closest('[data-action="pin-toggle"]');
  if (pinBtn) {
    e.preventDefault();
    e.stopPropagation();
    const card = pinBtn.closest(".result-item");
    const hex = pinBtn.dataset.hex || card?.dataset?.hex;
    if (!hex) return;
    if (isPinned(hex)) {
      removePin(hex);
      updatePinButton(pinBtn, false);
      return;
    }
    const pinnedItem = {
      hex: normalizeHex(hex),
      brand: card?.dataset?.brand || "",
      code: card?.dataset?.code || "",
      delta: card?.dataset?.delta || ""
    };
    if (addPin(pinnedItem)) {
      updatePinButton(pinBtn, true);
    }
    return;
  }
  const copyCodeBtn = e.target.closest('[data-action="copy-code"]');
  if (copyCodeBtn) {
    e.preventDefault();
    e.stopPropagation();
    const card = copyCodeBtn.closest(".result-item");
    if (!card) return;
    const brand = (card.dataset.brand || "").trim();
    const code = (card.dataset.code || "").trim();
    const label = t("tc.result.copyCode", "Sao chép mã");
    const text = [brand, code].filter(Boolean).join(" ");
    if (text) copyToClipboard(text, label);
    return;
  }
  const copyFullBtn = e.target.closest('[data-action="copy-full"]');
  if (copyFullBtn) {
    e.preventDefault();
    e.stopPropagation();
    const card = copyFullBtn.closest(".result-item");
    if (!card) return;
    const brand = (card.dataset.brand || "").trim();
    const code = (card.dataset.code || "").trim();
    const name = (card.dataset.name || "").trim();
    const hex = (card.dataset.hex || "").trim();
    const label = t("tc.result.copyFull", "Sao chép đầy đủ");
    const text = [brand, code, name, hex].filter(Boolean).join(" | ");
    if (text) copyToClipboard(text, label);
    return;
  }
  const saveBtn = e.target.closest("[data-action=\"save-search\"]");
  if (saveBtn) {
    e.preventDefault();
    e.stopPropagation();
    handleSaveCurrentEnhanced(saveBtn);
    return;
  }
  handleResultClick(e);
}

async function handleSaveCurrentEnhanced(saveBtn) {
  const initErr = getAuthInitError();
  if (initErr) {
    const msg = `${initErr?.name || "Firebase"}: ${initErr?.message || "Loi khoi tao"}`;
    console.error(initErr);
    showToast(msg);
    return false;
  }
  if (!ensureAuthReady()) return;
  const api = getAuthApi();
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth(t("tc.auth.needLoginSave", "Cần đăng nhập để lưu."));
    return;
  }
  const card = saveBtn?.closest(".result-item");
  const cardHex = normalizeHex(card?.dataset?.hex || lastChosenHex);
  const cardBrand = card?.dataset?.brand || "";
  const cardCode = card?.dataset?.code || "";
  const cardName = card?.dataset?.name || "";
  if (!currentRendered.length || !cardHex) {
    showToast(t("tc.result.noDataSave", "Không có dữ liệu để lưu."));
    return;
  }
  console.info("[save] card data", { hex: cardHex, brand: cardBrand, code: cardCode, name: cardName });
  showToast(t("tc.result.saving", "Đang lưu..."));
  const resetSaveBtn = (text = t("tc.result.save", "Lưu")) => {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = text;
    }
  };
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.textContent = t("tc.result.saving", "Đang lưu...");
  }
  try {
    const payload = {
      inputHex: cardHex,
      project: currentProject || "",
      selectedBrands: getSelectedBrands(),
      deltaThreshold: currentDeltaThreshold,
      results: currentRendered.slice(0, 20).map(t => ({
        brand: t.brand,
        code: t.code,
        name: t.name,
        hex: t.hex,
        delta: t.delta
      }))
    };
    const docRef = await saveSearch(api.db, user.uid, payload);
    console.info("[save] saved doc id", docRef?.id);
    telemetry.track("save");
    if (saveBtn) {
      saveBtn.textContent = t("tc.result.saved", "Đã lưu");
      setTimeout(() => resetSaveBtn(t("tc.result.save", "Lưu")), 1500);
    }
    showToast(t("tc.result.saved", "Đã lưu"));
    if (libraryModal && !libraryModal.classList.contains("hidden")) {
        await loadLibraryListV2();
    }
  } catch (err) {
    console.error("[save] failed", err);
    const friendly = formatFirestoreError(err, "Luu that bai");
    showToast(friendly);
    resetSaveBtn("Lưu");
  }
}

function updateUrlWithColor(hex) {
  const url = new URL(window.location.href);
  url.hash = `color=${encodeURIComponent(hex)}`;
  history.replaceState(null, "", url.toString());
}

function clearUrlColor() {
  const url = new URL(window.location.href);
  if (url.hash.startsWith("#color=")) {
    url.hash = "";
    history.replaceState(null, "", url.toString());
  }
}

function getColorFromUrl() {
  const url = new URL(window.location.href);
  if (url.searchParams.get("color")) return url.searchParams.get("color");
  if (url.hash && url.hash.startsWith("#color=")) return decodeURIComponent(url.hash.replace("#color=", ""));
  if (url.hash) return decodeURIComponent(url.hash.slice(1));
  return null;
}

function restoreInspectorFromUrl() {
  const colorFromUrl = getColorFromUrl();
  const normalized = normalizeHex(colorFromUrl);
  if (!normalized) return;
  const card = document.querySelector(`.result-item[data-hex="${normalized}"]`);
  if (card) {
    handleResultClick({ target: card });
    return;
  }
  const thread = threads.find(t => t.hex.toLowerCase() === normalized.toLowerCase());
  const labData = thread ? ensureLab(thread) : getLabForHex(normalized);
  openInspector({
    hex: normalized,
    brand: thread?.brand || "",
    code: thread?.code || "",
    name: thread?.name || "",
    delta: "",
    lab: labData
  }, null);
}

//==================== AUTH GATE / AUTH STATE ====================
const openAuth = (message) => {
  const fallback = t("tc.auth.needLogin", "Cần đăng nhập để tiếp tục.");
  const resolved = typeof message === "string" && message.trim() ? message : fallback;
  const cleaned = /[\u00C3\u00C2\u00C4\u00C6\u00E1\u00BA]/.test(resolved) ? fallback : resolved;
  showToast(cleaned);
  window.tcAuth?.openAuth?.();
};

let lastAdminUid = null;
let lastAdminValue = null;
async function updateUserUI(user) {
  currentUser = user || null;
  if (user && authApi?.db) {
    if (hasToolUI) {
      if (lastAdminUid === user.uid && lastAdminValue === true) {
        isAdminUser = true;
      } else {
        await refreshAdmin(true);
      }
    }
    return;
  }
  isAdminUser = false;
  lastAdminUid = null;
  lastAdminValue = null;
}

async function refreshAdmin(force = false) {
  const user = authApi?.auth?.currentUser || currentUser;
  if (!authApi?.db || !user?.uid) {
    isAdminUser = false;
    lastAdminUid = user?.uid || null;
    lastAdminValue = null;
    return false;
  }
  if (!force && lastAdminUid === user.uid && lastAdminValue === true) {
    isAdminUser = true;
    return true;
  }
  try {
    if (typeof user.getIdToken === "function") {
      await user.getIdToken();
    }
    const val = await isAdmin(authApi.db, user.uid);
    isAdminUser = !!val;
    lastAdminUid = user.uid;
    lastAdminValue = isAdminUser;
    return isAdminUser;
  } catch (err) {
    if (isPermissionDenied(err)) {
      console.info("[isAdmin] permission denied -> treat as non-admin");
      isAdminUser = false;
      lastAdminUid = user.uid;
      lastAdminValue = false;
      return false;
    }
    console.error(err);
    isAdminUser = false;
    lastAdminUid = user.uid;
    lastAdminValue = false;
    return false;
  }
}

function ensureAuthReady() {
  const initErr = getAuthInitError();
  if (initErr) {
    console.error(initErr);
    showToast(`${initErr?.name || "Firebase"}: ${initErr?.message || "Lỗi khởi tạo"}`);
    return false;
  }
  const api = getAuthApi();
  if (!api || typeof api.onAuthStateChanged !== "function") {
    showToast("Firebase init error: missing firebaseConfig");
    return false;
  }
  return true;
}
async function loadLibraryList() {
  if (!libraryList) return;
  const api = getAuthApi();
  if (!ensureAuthReady()) return;
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth("Cần đăng nhập để xem thư viện.");
    return;
  }
  libraryList.innerHTML = "<div class='text-gray-500'>Đang tải...</div>";
  try {
    const { items } = await listSavedSearches(api.db, user.uid, 50);
    if (!items.length) {
      libraryList.innerHTML = "<div class='text-gray-500'>Chưa có bản lưu</div>";
      return;
    }
    libraryList.innerHTML = items.map(it => {
      const ts = it.createdAt && typeof it.createdAt.toDate === "function" ? it.createdAt.toDate().toLocaleString() : "";
      return `
        <div class="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
          <div>
            <div class="font-semibold text-gray-800">${it.inputHex || ""}</div>
            <div class="text-xs text-gray-500">${ts}</div>
          </div>
          <button data-action="open-saved" data-id="${it.id}" class="px-3 py-1 rounded-lg border bg-white hover:bg-gray-50 text-indigo-700">Mở</button>
        </div>
      `;
    }).join("");
  } catch (err) {
    console.error("Tải thư viện thất bại", err);
    const friendly = formatFirestoreError(err, "Không tải được Library");
    libraryList.innerHTML = `<div class='text-red-600'>${friendly}</div>`;
  }
}

function ensureLibraryControls() {
  const header = document.querySelector("#libraryModal .border-b");
  if (!header) return;
  const title = header.querySelector("h3");
  if (title) title.textContent = t("tc.library.title", "Thư viện của tôi");
  let actions = header.querySelector("[data-library-actions]");
  if (!actions) {
    actions = document.createElement("div");
    actions.className = "flex items-center gap-2";
    actions.dataset.libraryActions = "1";
    const closeBtn = document.getElementById("libraryClose");
    if (closeBtn) actions.appendChild(closeBtn);
    header.appendChild(actions);
  }
  if (!document.getElementById("btnExportCsv")) {
    const exportBtn = document.createElement("button");
    exportBtn.id = "btnExportCsv";
    exportBtn.className = "tc-btn tc-chip px-3 py-1 text-xs";
    actions.insertBefore(exportBtn, actions.firstChild);
  }
  btnExportCsv = document.getElementById("btnExportCsv");
  if (btnExportCsv) {
    btnExportCsv.textContent = t("tc.library.export", "Xuất CSV");
    if (btnExportCsv.dataset.bound !== "1") {
      btnExportCsv.dataset.bound = "1";
      btnExportCsv.addEventListener("click", exportLibraryCsv);
    }
  }
  const closeBtn = document.getElementById("libraryClose");
  if (closeBtn) {
    closeBtn.setAttribute("aria-label", t("tc.action.close", "Đóng"));
  }
}

async function loadLibraryListV2() {
  if (!libraryList) return;
  ensureLibraryControls();
  const api = getAuthApi();
  if (!ensureAuthReady()) return;
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth(t("tc.auth.needLoginLibrary", "Cần đăng nhập để xem thư viện."));
    return;
  }
  libraryList.innerHTML = `<div class='text-gray-500'>${t("tc.library.loading", "Đang tải...")}</div>`;
  try {
    const { items } = await listSavedSearches(api.db, user.uid, 50);
    libraryItemsCache = items || [];
    if (!items.length) {
      libraryList.innerHTML = `<div class='text-gray-500'>${t("tc.library.empty", "Chưa có bản lưu")}</div>`;
      return;
    }
    const fromItems = items.map(it => (it.project || "").trim()).filter(Boolean);
    if (fromItems.length) {
      recentProjects = [...new Set([...fromItems, ...recentProjects])].slice(0, 10);
      saveProjectPrefs(currentProject);
    }
    libraryList.innerHTML = items.map(it => {
      const ts = it.createdAt && typeof it.createdAt.toDate === "function" ? it.createdAt.toDate().toLocaleString() : "";
      const projectLine = it.project ? `<div class="text-xs tc-muted">${t("tc.project.label", "Dự án")}: ${it.project}</div>` : "";
      return `
        <div class="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
          <div>
            <div class="font-semibold text-gray-800">${it.inputHex || ""}</div>
            ${projectLine}
            <div class="text-xs text-gray-500">${ts}</div>
          </div>
          <button data-action="open-saved" data-id="${it.id}" class="px-3 py-1 rounded-lg border bg-white hover:bg-gray-50 text-indigo-700">${t("tc.library.open", "Mở")}</button>
        </div>
      `;
    }).join("");
  } catch (err) {
    console.error("Tải thư viện thất bại", err);
    const friendly = formatFirestoreError(err, t("tc.library.error", "Không tải được thư viện"));
    libraryItemsCache = [];
    libraryList.innerHTML = `<div class='text-red-600'>${friendly}</div>`;
  }
}

function exportLibraryCsv() {
  if (!libraryItemsCache.length) {
    showToast(t("tc.library.empty", "Chưa có bản lưu"));
    return;
  }
  const header = ["project", "brand", "code", "hex", "deltaE", "note", "createdAt"];
  const rows = libraryItemsCache.map(item => {
    const top = item.topMatch || (item.results || [])[0] || {};
    const createdAt = item.createdAt && typeof item.createdAt.toDate === "function"
      ? item.createdAt.toDate().toISOString()
      : "";
    return [
      item.project || "",
      top.brand || "",
      top.code || "",
      top.hex || "",
      typeof top.delta === "number" ? top.delta.toFixed(2) : (top.delta || ""),
      "",
      createdAt
    ];
  });
  const escapeCsv = (value) => {
    const str = String(value ?? "");
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, "\"\"")}"` : str;
  };
  const csv = [header.join(","), ...rows.map(row => row.map(escapeCsv).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "threadcolor-library.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast(t("tc.library.exported", "Đã xuất CSV"));
}

//======================= SAVE CURRENT =======================
async function handleSaveCurrent(saveBtn) {
  const initErr = getAuthInitError();
  if (initErr) {
    const msg = `${initErr?.name || "Firebase"}: ${initErr?.message || "Lỗi khởi tạo"}`;
    console.error(initErr);
    showToast(msg);
    return false;
  }
  if (!ensureAuthReady()) return;
  const api = getAuthApi();
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth(t("tc.auth.needLoginSave", "Cần đăng nhập để lưu."));
    return;
  }
const card = saveBtn?.closest(".result-item");
const cardHex = normalizeHex(card?.dataset?.hex || lastChosenHex);
const cardBrand = card?.dataset?.brand || "";
const cardCode = card?.dataset?.code || "";
const cardName = card?.dataset?.name || "";

if (!currentRendered.length || !cardHex) {
  showToast("Không có dữ liệu để lưu");
  return;
}

  console.info("[save] card data", { hex: cardHex, brand: cardBrand, code: cardCode, name: cardName });
  try {
    const payload = {
      inputHex: cardHex,
      project: currentProject || "",
      selectedBrands: getSelectedBrands(),
      deltaThreshold: currentDeltaThreshold,
      results: currentRendered.slice(0, 20).map(t => ({
        brand: t.brand,
        code: t.code,
        name: t.name,
        hex: t.hex,
        delta: t.delta
      }))
    };
    await saveSearch(api.db, user.uid, payload);
    telemetry.track("save");
    showToast(t("tc.result.saved", "Đã lưu"));
  } catch (err) {
    console.error("Lưu thất bại", err);
    const friendly = formatFirestoreError(err, "Luu that bai");
    showToast(friendly);
  }
}

//======================= OPEN SAVED =======================
async function handleOpenSaved(id) {
  const initErr = getAuthInitError();
  if (initErr) {
    console.error(initErr);
    showToast(`${initErr.name || "Firebase"}: ${initErr.message || "Loi"}`);
    return;
  }
  if (!ensureAuthReady()) return;
  const api = getAuthApi();
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth(t("tc.auth.needLoginOpen", "Cần đăng nhập để mở."));
    return;
  }
  try {
    const data = await getSavedSearch(api.db, user.uid, id);
    if (!data) {
      showToast("Khong tim thay ban luu");
      return;
    }
    const deltaVal = parseFloat(data.deltaThreshold) || currentDeltaThreshold;
    currentDeltaThreshold = deltaVal;
    if (deltaSlider) deltaSlider.value = deltaVal;

 deltaValueEls.forEach(el => el.textContent = `≈ ${currentDeltaThreshold.toFixed(1)}`);
    const brands = Array.isArray(data.selectedBrands) ? data.selectedBrands : [];
    document.querySelectorAll(".brand-filter").forEach(cb => {
      if (!brands.length) return;
      cb.checked = brands.includes(cb.value);
    });

    if (colorPicker && data.inputHex) {
      colorPicker.value = data.inputHex;
    }
    lastChosenHex = data.inputHex || lastChosenHex;

    const results = Array.isArray(data.results) ? data.results : [];
    if (!results.length) {
      resultBox.innerHTML = "<div class='text-sm text-gray-600'>Ban luu nay khong co ket qua.</div>";
      return;
    }
    const mapped = results.map(r => {
      const hex = normalizeHex(r.hex);
      if (!hex) return null;
      return {
        brand: r.brand,
        code: r.code,
        name: r.name,
        hex,
        delta: r.delta,
        lab: rgbToLab(hexToRgbArray(hex))
      };
    }).filter(Boolean);

    const grouped = groupByColorSimilarity(mapped, currentDeltaThreshold, currentDeltaMethod);
    showGroupedResults(grouped, data.inputHex || lastChosenHex || "#000000");
    const ts = data.createdAt && typeof data.createdAt.toDate === "function" ? data.createdAt.toDate() : null;
    const stamp = ts ? ts.toLocaleString() : "";
    const loadedFrom = t("tc.library.loadedFrom", "Đã tải từ Thư viện của tôi {stamp}", {
      stamp: stamp ? `- ${stamp}` : ""
    });
    resultBox.innerHTML = `<div class='mb-3 text-sm text-gray-600'>${loadedFrom}</div>` + resultBox.innerHTML;
    if (libraryOverlay) libraryOverlay.classList.add("hidden");
    if (libraryModal) {
      libraryModal.classList.add("hidden");
      libraryModal.classList.remove("flex");
    }
  }   catch (err) {
    console.error("Mở bản lưu thất bại", err);
    const friendly = formatFirestoreError(err, "Mo ban luu that bai");
    showToast(friendly);
  }
}

//======================= EYEDROPPER =======================
function startEyeDropper() {
  if (!btnPickScreen) return;
  if (!("EyeDropper" in window)) {
    if (eyedropperFallback) eyedropperFallback.classList.remove("hidden");
    if (fallbackColorPicker) fallbackColorPicker.classList.remove("hidden");
    if (fallbackColorPicker) fallbackColorPicker.focus();
    return;
  }
  if (eyedropperFallback) eyedropperFallback.classList.add("hidden");
  if (fallbackColorPicker) fallbackColorPicker.classList.add("hidden");
  if (eyedropperHint) eyedropperHint.classList.remove("hidden");
  const picker = new window.EyeDropper();
  picker.open().then(result => {
    if (eyedropperHint) eyedropperHint.classList.add("hidden");
    const hex = normalizeHex(result.sRGBHex);
    if (!hex) return;
    if (colorPicker) colorPicker.value = hex;
    copyToClipboard(hex, hex);
  }).catch(err => {
    if (eyedropperHint) eyedropperHint.classList.add("hidden");
    if (err && err.name === "AbortError") return;

    showToast("Không pick được ");
  });
}

//======================= EVENTS =======================
window.addEventListener("firebase-auth-ready", bindAuth);
bindAuth();


if (libraryClose) libraryClose.addEventListener("click", () => {
  libraryOverlay?.classList.add("hidden");
  if (libraryModal) {
    libraryModal.classList.add("hidden");
    libraryModal.classList.remove("flex");
  }
});

if (libraryOverlay) {
  libraryOverlay.addEventListener("click", () => {
    libraryOverlay.classList.add("hidden");
    if (libraryModal) {
      libraryModal.classList.add("hidden");
      libraryModal.classList.remove("flex");
    }
  });
}

const openLibraryModal = () => {
  if (!ensureAuthReady()) return;
  const api = getAuthApi();
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth(t("tc.auth.needLoginLibrary", "Cần đăng nhập để xem thư viện."));
    return;
  }
  libraryOverlay?.classList.remove("hidden");
  if (libraryModal) {
    libraryModal.classList.remove("hidden");
    libraryModal.classList.add("flex");
  }
  loadLibraryListV2();
};

const handleAuthAction = (action) => {
  if (action === "library") {
    openLibraryModal();
    return;
  }
  if (action === "contribute") {
    if (!currentUser) {
      openAuth(t("tc.auth.needLoginContribute", "Cần đăng nhập để đóng góp dữ liệu."));
      return;
    }
    if (!ensureAuthReady()) return;
    openContributeModal();
    return;
  }
  if (action === "verify") {
    if (!currentUser) {
      openAuth(t("tc.auth.needLoginVerify", "Cần đăng nhập để xác minh."));
      return;
    }
    if (!ensureAuthReady()) return;
    openVerifyModal();
  }
};

document.addEventListener("tc-auth-action", (event) => {
  const action = event?.detail?.action;
  if (!action) return;
  handleAuthAction(action);
});

(() => {
  let openAction = null;
  try {
    openAction = new URLSearchParams(window.location.search).get("open");
  } catch (err) {
    openAction = null;
  }
  const allowed = ["library", "contribute", "verify"];
  if (!openAction || !allowed.includes(openAction)) return;
  const auth = window.tcAuth || null;
  const isLoggedIn = typeof auth?.isLoggedIn === "function" ? auth.isLoggedIn() : false;
  if (openAction === "library") {
    if (String(window.location.pathname || "").includes("/worlds/threadcolor.html")) {
      window.location.href = "threadvault.html?tab=saved";
      return;
    }
    handleAuthAction(openAction);
    return;
  }
  if (!isLoggedIn) {
    handleAuthAction(openAction);
    return;
  }
  if (currentUser) {
    handleAuthAction(openAction);
    return;
  }
  const onAuth = (event) => {
    if (!event?.detail?.user) return;
    document.removeEventListener("tc-auth-changed", onAuth);
    handleAuthAction(openAction);
  };
  document.addEventListener("tc-auth-changed", onAuth);
})();


if (libraryList) {
  libraryList.addEventListener("click", e => {
    const openBtn = e.target.closest("[data-action=\"open-saved\"]");
    if (openBtn) {
      e.preventDefault();
      handleOpenSaved(openBtn.dataset.id, openBtn);
      return;
    }
  });
}
if (btnExportCsv && btnExportCsv.dataset.bound !== "1") {
  btnExportCsv.dataset.bound = "1";
  btnExportCsv.addEventListener("click", exportLibraryCsv);
}

if (verifiedOnlyToggle) {
  verifiedOnlyToggle.addEventListener("change", () => {
    useVerifiedOnly = verifiedOnlyToggle.checked;
    if (!lastChosenHex) return;
    scheduleSearch(lastChosenHex);
  });
}

if (btnUseCurrentColor) {
  btnUseCurrentColor.addEventListener("click", () => {
    const hex = normalizeHex(lastChosenHex || colorPicker?.value);
    if (hex && contributeHex) contributeHex.value = hex.toUpperCase();
  });
}

if (contributeSubmit) {
  contributeSubmit.addEventListener("click", async () => {
    const initErr = getAuthInitError();
    if (initErr) {
      console.error(initErr);
      showToast(`${initErr.name || "Firebase"}: ${initErr.message || "Loi"}`);
      return;
    }
    if (!ensureAuthReady()) return;
    if (!currentUser) {
      openAuth(t("tc.auth.needLoginContribute", "Cần đăng nhập để đóng góp dữ liệu."));
      return;
    }
    const brand = (contributeBrandCustom?.value || contributeBrandSelect?.value || "").trim();
    const code = (contributeCode?.value || "").trim();
    const name = (contributeName?.value || "").trim();
    const hexRaw = (contributeHex?.value || "").trim();
    const hex = normalizeHex(hexRaw);
    if (!brand || !code || !hex) {

      showToast("Brand, Code, Hex là bắt buộc");
      return;
    }

    if (!/^#[0-9a-f]{6}$/i.test(hex)) {
      showToast("Hex không hợp lệ");

      return;
    }
    try {
      await submitThread(authApi.db, currentUser, { brand, code, name, hex: hex.toUpperCase() });


      showToast(t("tc.verify.submitted", "Đã gửi, chờ xác minh"));


      closeContributeModal();
    } catch (err) {
      console.error(err);
      showToast(err?.message || "G?i th?t b?i");
    }
  });
}

if (contributeClose) contributeClose.addEventListener("click", closeContributeModal);
if (contributeCancel) contributeCancel.addEventListener("click", closeContributeModal);
if (contributeOverlay) contributeOverlay.addEventListener("click", closeContributeModal);

if (verifyClose) verifyClose.addEventListener("click", closeVerifyModal);
if (verifyOverlay) verifyOverlay.addEventListener("click", closeVerifyModal);

if (verifyList) {
  verifyList.addEventListener("click", async e => {
    const actionBtn = e.target.closest("[data-action]");
    if (!actionBtn) return;
    const id = actionBtn.dataset.id;
    const action = actionBtn.dataset.action;
    const targetItem = pendingSubmissions.find(p => p.id === id);
    if (!currentUser) {
      openAuth(t("tc.auth.needLoginVerify", "Cần đăng nhập để xác minh."));
      return;
    }
    if (!ensureAuthReady()) return;
    try {
      if (action === "vote-confirm" || action === "vote-reject") {
        const vote = action === "vote-confirm" ? "confirm" : "reject";
        await voteOnSubmission(authApi.db, id, currentUser, vote);
        let summary;
        try {
          summary = await getVoteSummary(authApi.db, id);
        } catch (err) {
          if (isPermissionDenied(err)) {
            const old = targetItem?.summary || { confirmCount: 0, rejectCount: 0 };
            summary = {
              confirmCount: old.confirmCount + (vote === "confirm" ? 1 : 0),
              rejectCount: old.rejectCount + (vote === "reject" ? 1 : 0)
            };
          } else {
            throw err;
          }
        }
        if (targetItem) targetItem.summary = summary;
        renderVerifyList();
      }
      if (action === "approve") {
        if (!isAdminUser) {
          showToast("Chỉ admin mới duyệt được");
          return;
        }
        if (!targetItem) {

          showToast("Không tìm thấy submission");

          return;
        }
        const summary = targetItem?.summary || await getVoteSummary(authApi.db, id);
        await promoteSubmissionToVerified(authApi.db, targetItem, summary, currentUser);
        pendingSubmissions = pendingSubmissions.filter(p => p.id !== id);
        renderVerifyList();
        fetchVerifiedThreads().then(list => {
          verifiedThreads = list;
          mergeVerifiedThreads(list);
        });
      }
    } catch (err) {
      console.error(err);

      showToast(err?.message || "Lỗi thao tác");

    }
  });
}

if (deltaMethodSelect) {
  currentDeltaMethod = deltaMethodSelect.value === "2000" ? "2000" : "76";
  deltaMethodSelect.addEventListener("change", () => {
    currentDeltaMethod = deltaMethodSelect.value === "2000" ? "2000" : "76";
    matchCache.clear();
    if (lastChosenHex) scheduleSearch(lastChosenHex);
  });
}
loadProjectPrefs();
loadPins();

btnFindNearest?.addEventListener("click", () => {

  if (!isDataReady) return alert("Dữ liệu chưa sẵn sàng");

  const hex = colorPicker.value;
  telemetry.track("search_start");
  runSearch(hex);
});

deltaSlider?.addEventListener("input", () => {
  currentDeltaThreshold = parseFloat(deltaSlider.value);
  deltaValueEls.forEach(el => el.textContent = `≈ ${currentDeltaThreshold.toFixed(1)}`);
  if (!lastResults || !lastChosenHex) return;
  scheduleSearch(lastChosenHex);
});

resultBox?.addEventListener("click", handleResultContainerClick);
if (pinPanel && !pinPanel.dataset.bound) {
  pinPanel.dataset.bound = "1";
  pinPanel.addEventListener("click", (e) => {
    const actionBtn = e.target.closest("[data-action]");
    if (!actionBtn) return;
    const action = actionBtn.dataset.action;
    const hex = actionBtn.dataset.hex;
    if (action === "pin-remove" && hex) {
      removePin(hex);
      return;
    }
    if (action === "pin-copy" && hex) {
      const item = pinnedItems.find(p => p.hex === normalizeHex(hex));
      const text = item?.code || item?.hex || "";
      copyToClipboard(text, t("tc.pin.copyCode", "Sao chép mã"));
      return;
    }
    if (action === "pin-clear") {
      pinnedItems = [];
      savePins();
      renderPinPanel();
      syncPinButtons();
    }
  });
}
pinClear?.addEventListener("click", () => {
  pinnedItems = [];
  savePins();
  renderPinPanel();
  syncPinButtons();
});
drawerOverlay?.addEventListener("click", closeInspector);
drawerCloseBtn?.addEventListener("click", closeInspector);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (hasToolUI) closeInspector();
  }
  try {
    if (localStorage.getItem("tc_shortcuts") === "0") return;
  } catch (err) {}
  if (!hasToolUI) return;
  const targetTag = (e.target.tagName || "").toLowerCase();
  const isTyping = targetTag === "input" || targetTag === "textarea";
  const key = (e.key || "").toLowerCase();
  if (!isTyping && key === "i") startEyeDropper();
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && key === "p") {
    e.preventDefault();
    startEyeDropper();
  }
});

copyButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.copy;
    const value = document.getElementById(`inspector${type}`).textContent;
    copyToClipboard(value, type.toUpperCase());
  });
});

copyAllBtn?.addEventListener("click", () => {
  const hex = inspectorHex.textContent;
  const rgb = inspectorRgb.textContent;
  const lab = inspectorLab.textContent;
  const hsl = inspectorHsl.textContent;
  const block = `HEX: ${hex}\nRGB: ${rgb}\nLAB: ${lab}\nHSL: ${hsl}`;
  copyToClipboard(block, t("tc.inspector.copyAllLabel", "Tất cả"));
});

// Canvas pick
imgInput?.addEventListener("change", e => {
  if (!canvas || !ctx) return;
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  const url = URL.createObjectURL(file);
  img.onload = () => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
  };
  img.src = url;
});

canvas?.addEventListener("click", e => {
  if (!ctx) return;


  if (!isDataReady) return alert("Dữ liệu chưa sẵn sàng");


  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = Math.floor((e.clientX - rect.left) * scaleX);
  const y = Math.floor((e.clientY - rect.top) * scaleY);
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  const hex = `#${[pixel[0], pixel[1], pixel[2]].map(v => v.toString(16).padStart(2, "0")).join("")}`;
  runSearch(hex);
});

// Find by code
btnFindByCode?.addEventListener("click", () => {
  if (!isDataReady) {
    showToast(t("tc.status.loading", "Đang chuẩn bị dữ liệu..."));
    return;
  }
  telemetry.track("search_start");
  const rawQuery = codeInput.value.trim();
  if (!rawQuery) {
    showToast(t("tc.code.empty", "Vui lòng nhập mã."));
    return;
  }
  const parsed = parseCodeQuery(rawQuery);
  if (!parsed) {
    showToast(t("tc.code.invalid", "Mã không hợp lệ."));
    return;
  }

  const selectedBrands = getSelectedBrands();
  const requireVerified = useVerifiedOnly;
  let results = [];

  if (parsed.mode === "brand") {
    if (selectedBrands.length && !selectedBrands.includes(parsed.brand)) {
      showToast(t("tc.code.brandNotSelected", "Hãng này chưa được chọn."));
      renderCodeLookupResults(rawQuery, []);
      return;
    }
    const list = threadsByBrand.get(parsed.brand) || [];
    results = list.filter(t => normalizeCodeKey(t.code) === parsed.codeKey)
      .filter(t => !requireVerified || isVerifiedThread(t));
  } else {
    const list = threadsByCode.get(parsed.codeKey) || [];
    results = list.filter(t => selectedBrands.includes(t.brand))
      .filter(t => !requireVerified || isVerifiedThread(t));
  }

  if (!results.length) {
    showToast(t("tc.code.notFoundToast", "Không tìm thấy mã này."));
    renderCodeLookupResults(rawQuery, []);
    return;
  }
  if (results.length === 1) {
    const item = results[0];
    openInspector({
      hex: item.hex,
      brand: item.brand || "",
      code: item.code || "",
      name: item.name || "",
      delta: "",
      lab: ensureLab(item)
    }, null);
    runSearch(item.hex);
    return;
  }
  results.sort((a, b) => a.brand.localeCompare(b.brand) || String(a.code).localeCompare(String(b.code)));
  renderCodeLookupResults(rawQuery, results);
});

if (btnPickScreen) {
  btnPickScreen.addEventListener("click", () => {
    startEyeDropper();
  });
}

if (fallbackColorPicker) {
  fallbackColorPicker.addEventListener("input", () => {
    const hex = normalizeHex(fallbackColorPicker.value);
    if (!hex) return;
    if (colorPicker) colorPicker.value = hex;
    copyToClipboard(hex, hex);
  });
}
  






````

## scripts/check-encoding.mjs
````text
import { createReadStream } from "node:fs";
import { readdir } from "node:fs/promises";
import { createInterface } from "node:readline";
import { extname, join } from "node:path";

const ROOT = process.cwd();
const TARGET_EXTS = new Set([".html", ".js", ".css", ".json"]);
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
  "coverage"
]);

const SUSPECT_PATTERN = /[ÃÂÄÅÆ]|á»|áº|\uFFFD/;

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
  const stream = createReadStream(filePath, { encoding: "utf8" });
  const rl = createInterface({ input: stream, crlfDelay: Infinity });
  let lineNum = 0;
  let hit = false;
  for await (const line of rl) {
    lineNum += 1;
    const match = line.search(SUSPECT_PATTERN);
    if (match !== -1) {
      hit = true;
      const start = Math.max(0, match - 30);
      const end = Math.min(line.length, match + 30);
      const snippet = line.slice(start, end);
      console.log(`${rel}:${lineNum}: ${snippet}`);
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

````

## scripts/fix-mojibake.mjs
````text
import { readFile, writeFile } from "node:fs/promises";
import { extname } from "node:path";

const TARGET_EXTS = new Set([".html", ".js", ".css", ".json"]);
const SUSPECT_PATTERN = /[ÃÂÄÅÆ]|á»|áº|\uFFFD/;
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

````

## SECURITY.md
````text
# Bảo mật

Nếu bạn phát hiện lỗ hổng bảo mật:
- Vui lòng dùng tính năng “Report a vulnerability” trên GitHub để gửi báo cáo riêng tư.
- Không báo lỗ hổng nghiêm trọng qua Issues public.

Phạm vi:
- Ứng dụng web ThreadColor và các World liên quan.

Thời gian phản hồi dự kiến:
- Phản hồi ban đầu trong 3–7 ngày làm việc.

````

## stock.js
````text
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  deleteDoc,
  increment
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const $ = (sel) => document.querySelector(sel);
const t = (key, fallback, params) => window.tcI18n?.t?.(key, fallback, params) ?? fallback;

const state = {
  user: null,
  items: [],
  filtered: [],
  activeTab: "saved",
  editingId: null,
  isLoading: false
};

const els = {
  cta: $("#stockCta"),
  ctaBtn: $("#stockLoginBtn"),
  panel: $("#stockPanel"),
  search: $("#stockSearch"),
  addBtn: $("#stockAddBtn"),
  importBtn: $("#stockImportBtn"),
  exportBtn: $("#stockExportBtn"),
  fileInput: $("#stockFileInput"),
  summaryItems: $("#stockSummaryItems"),
  summaryQty: $("#stockSummaryQty"),
  summaryLow: $("#stockSummaryLow"),
  body: $("#stockBody"),
  empty: $("#stockEmpty"),
  overlay: $("#stockOverlay"),
  modal: $("#stockModal"),
  modalTitle: $("#stockModalTitle"),
  modalClose: $("#stockModalClose"),
  form: $("#stockForm"),
  cancel: $("#stockCancel"),
  brand: $("#stockBrand"),
  code: $("#stockCode"),
  name: $("#stockName"),
  hex: $("#stockHex"),
  qty: $("#stockQty"),
  unit: $("#stockUnit"),
  location: $("#stockLocation"),
  note: $("#stockNote"),
  minQty: $("#stockMinQty")
};

const normalizeKey = (value) => {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
};

const normalizeCode = (value) => {
  return (value || "")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, " ");
};

const normalizeHex = (hex) => {
  if (!hex || typeof hex !== "string") return "";
  let v = hex.trim().toUpperCase();
  if (!v.startsWith("#")) v = `#${v}`;
  return /^#[0-9A-F]{6}$/.test(v) ? v : "";
};

const getApi = () => window.firebaseAuth || window.firebaseAuthApi || null;
const getDb = () => getApi()?.db || null;

const setVisibility = (loggedIn) => {
  if (els.cta) els.cta.classList.toggle("hidden", loggedIn);
  if (els.panel) els.panel.classList.toggle("hidden", !loggedIn);
};

const setActiveTab = (tab) => {
  state.activeTab = tab;
  if (tab === "stock") {
    refresh();
  }
};

const refresh = () => {
  if (!state.user || state.activeTab !== "stock") {
    setVisibility(false);
    return;
  }
  setVisibility(true);
  if (!state.isLoading) loadItems();
};

const buildDocId = (brand, code) => `${normalizeKey(brand)}__${normalizeCode(code)}`;

const applyFilter = () => {
  const q = (els.search?.value || "").trim().toLowerCase();
  if (!q) {
    state.filtered = [...state.items];
  } else {
    state.filtered = state.items.filter((item) => {
      return [item.brand, item.code, item.name, item.hex].some((v) => (v || "").toLowerCase().includes(q));
    });
  }
  renderTable();
};

const updateSummary = () => {
  const totalItems = state.filtered.length;
  const totalQty = state.filtered.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  const low = state.filtered.filter((item) => {
    const qty = Number(item.qty) || 0;
    const min = Number(item.minQty) || 0;
    return qty <= min;
  }).length;
  if (els.summaryItems) els.summaryItems.textContent = `${totalItems}`;
  if (els.summaryQty) els.summaryQty.textContent = `${totalQty}`;
  if (els.summaryLow) els.summaryLow.textContent = `${low}`;
};

const renderTable = () => {
  if (!els.body) return;
  els.body.innerHTML = state.filtered.map((item) => {
    const updated = item.updatedAt?.toDate ? item.updatedAt.toDate().toLocaleString() : "";
    const qty = Number(item.qty) || 0;
    const min = Number(item.minQty) || 0;
    const warn = qty <= min ? "text-amber-600" : "";
    return `
      <tr class="border-b border-black/5">
        <td class="px-4 py-3">
          <span class="inline-block w-6 h-6 rounded border" style="background:${item.hex || "#fff"}"></span>
        </td>
        <td class="px-4 py-3">${item.brand || ""}</td>
        <td class="px-4 py-3">${item.code || ""}</td>
        <td class="px-4 py-3">${item.name || ""}</td>
        <td class="px-4 py-3 ${warn}">${qty}</td>
        <td class="px-4 py-3">${item.unit || ""}</td>
        <td class="px-4 py-3">${item.location || ""}</td>
        <td class="px-4 py-3 text-xs tc-muted">${updated}</td>
        <td class="px-4 py-3 text-right">
          <button class="tc-btn tc-chip px-2 py-1 text-xs" data-action="qty-plus" data-id="${item.id}">+</button>
          <button class="tc-btn tc-chip px-2 py-1 text-xs" data-action="qty-minus" data-id="${item.id}">-</button>
          <button class="tc-btn tc-chip px-2 py-1 text-xs" data-action="edit" data-id="${item.id}">${t("vault.stock.actionEdit", "Sửa")}</button>
          <button class="tc-btn tc-chip px-2 py-1 text-xs" data-action="delete" data-id="${item.id}">${t("vault.stock.actionDelete", "Xoá")}</button>
        </td>
      </tr>
    `;
  }).join("");
  const hasItems = state.filtered.length > 0;
  if (els.empty) els.empty.classList.toggle("hidden", hasItems);
  updateSummary();
};

const loadItems = async () => {
  if (!state.user || !getDb()) return;
  state.isLoading = true;
  try {
    const ref = collection(getDb(), "users", state.user.uid, "stockItems");
    const q = query(ref, orderBy("updatedAt", "desc"));
    const snap = await getDocs(q);
    state.items = snap.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    }));
    applyFilter();
  } catch (err) {
    console.error("[stock] load failed", err);
  } finally {
    state.isLoading = false;
  }
};

const openModal = (item) => {
  state.editingId = item?.id || null;
  if (els.modalTitle) {
    els.modalTitle.textContent = state.editingId
      ? t("vault.stock.modalEdit", "Sửa tồn kho")
      : t("vault.stock.modalAdd", "Thêm tồn kho");
  }
  els.brand.value = item?.brand || "";
  els.code.value = item?.code || "";
  els.name.value = item?.name || "";
  els.hex.value = item?.hex || "";
  els.qty.value = item?.qty ?? 0;
  els.unit.value = item?.unit || "";
  els.location.value = item?.location || "";
  els.note.value = item?.note || "";
  els.minQty.value = item?.minQty ?? 0;
  if (els.overlay) els.overlay.classList.remove("hidden");
  if (els.modal) {
    els.modal.classList.remove("hidden");
    els.modal.classList.add("flex");
  }
};

const closeModal = () => {
  if (els.overlay) els.overlay.classList.add("hidden");
  if (els.modal) {
    els.modal.classList.add("hidden");
    els.modal.classList.remove("flex");
  }
  state.editingId = null;
};

const saveItem = async () => {
  const brand = els.brand.value.trim();
  const code = els.code.value.trim();
  const qty = Number(els.qty.value);
  if (!brand || !code || Number.isNaN(qty)) return;
  const id = buildDocId(brand, code);
  const payload = {
    brand,
    brandKey: normalizeKey(brand),
    code,
    codeKey: normalizeCode(code),
    name: els.name.value.trim(),
    hex: normalizeHex(els.hex.value),
    qty: Number(els.qty.value) || 0,
    unit: els.unit.value.trim(),
    location: els.location.value.trim(),
    note: els.note.value.trim(),
    minQty: Number(els.minQty.value) || 0,
    updatedAt: serverTimestamp()
  };
  if (!state.editingId) payload.createdAt = serverTimestamp();
  if (!getDb()) return;
  if (state.editingId && state.editingId !== id) {
    await deleteDoc(doc(getDb(), "users", state.user.uid, "stockItems", state.editingId));
  }
  await setDoc(doc(getDb(), "users", state.user.uid, "stockItems", id), payload, { merge: true });
  closeModal();
  loadItems();
};

const updateQty = async (id, delta) => {
  if (!getDb()) return;
  const ref = doc(getDb(), "users", state.user.uid, "stockItems", id);
  await updateDoc(ref, { qty: increment(delta), updatedAt: serverTimestamp() });
  loadItems();
};

const deleteItem = async (id) => {
  const ok = confirm(t("vault.stock.confirmDelete", "Xoá mục này?"));
  if (!ok || !getDb()) return;
  await deleteDoc(doc(getDb(), "users", state.user.uid, "stockItems", id));
  loadItems();
};

const parseCsvRows = (text) => {
  const rows = [];
  const lines = text.split(/\r?\n/).filter(Boolean);
  for (const line of lines) {
    const cols = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i];
      if (ch === "\"") {
        inQuotes = !inQuotes;
        continue;
      }
      if (ch === "," && !inQuotes) {
        cols.push(current.trim());
        current = "";
        continue;
      }
      current += ch;
    }
    cols.push(current.trim());
    rows.push(cols);
  }
  return rows;
};

const importCsv = async (file) => {
  const text = await file.text();
  const rows = parseCsvRows(text);
  if (!rows.length) return;
  const header = rows[0].map((h) => h.toLowerCase());
  const get = (row, key, fallback = "") => {
    const idx = header.indexOf(key);
    return idx >= 0 ? row[idx] : fallback;
  };
  const dataRows = header.includes("brand") ? rows.slice(1) : rows;
  for (const row of dataRows) {
    const brand = get(row, "brand", row[0] || "").trim();
    const code = get(row, "code", row[1] || "").trim();
    if (!brand || !code) continue;
    const id = buildDocId(brand, code);
    const payload = {
      brand,
      brandKey: normalizeKey(brand),
      code,
      codeKey: normalizeCode(code),
      name: get(row, "name", row[2] || "").trim(),
      hex: normalizeHex(get(row, "hex", row[3] || "")),
      qty: Number(get(row, "qty", row[4] || "0")) || 0,
      unit: get(row, "unit", row[5] || "").trim(),
      location: get(row, "location", row[6] || "").trim(),
      note: get(row, "note", row[7] || "").trim(),
      minQty: Number(get(row, "minqty", row[8] || "0")) || 0,
      updatedAt: serverTimestamp()
    };
    await setDoc(doc(getDb(), "users", state.user.uid, "stockItems", id), payload, { merge: true });
  }
  loadItems();
};

const exportCsv = () => {
  const header = ["brand", "code", "name", "hex", "qty", "unit", "location", "note", "minQty"];
  const rows = state.items.map((item) => ([
    item.brand || "",
    item.code || "",
    item.name || "",
    item.hex || "",
    item.qty ?? 0,
    item.unit || "",
    item.location || "",
    item.note || "",
    item.minQty ?? 0
  ]));
  const csv = [header.join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/\"/g, '""')}"`).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "stock-items.csv";
  link.click();
  URL.revokeObjectURL(link.href);
};

const bindEvents = () => {
  els.ctaBtn?.addEventListener("click", () => window.tcAuth?.openAuth?.());
  els.search?.addEventListener("input", applyFilter);
  els.addBtn?.addEventListener("click", () => openModal());
  els.importBtn?.addEventListener("click", () => els.fileInput?.click());
  els.exportBtn?.addEventListener("click", () => exportCsv());
  els.fileInput?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (file) await importCsv(file);
    event.target.value = "";
  });
  els.modalClose?.addEventListener("click", closeModal);
  els.cancel?.addEventListener("click", closeModal);
  els.overlay?.addEventListener("click", closeModal);
  els.form?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveItem();
  });
  els.body?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-action]");
    if (!btn) return;
    const id = btn.getAttribute("data-id");
    if (!id) return;
    const action = btn.getAttribute("data-action");
    if (action === "edit") {
      const item = state.items.find((i) => i.id === id);
      if (item) openModal(item);
      return;
    }
    if (action === "delete") {
      deleteItem(id);
      return;
    }
    if (action === "qty-plus") {
      updateQty(id, 1);
      return;
    }
    if (action === "qty-minus") {
      updateQty(id, -1);
    }
  });
};

const onAuthChanged = (user) => {
  state.user = user || null;
  refresh();
};

const boot = () => {
  bindEvents();
  document.addEventListener("tc-vault-tab-changed", (event) => {
    const tab = event?.detail?.tab || "saved";
    setActiveTab(tab);
  });
  const api = getApi();
  if (api?.onAuthStateChanged) {
    api.onAuthStateChanged(onAuthChanged);
  }
};

window.addEventListener("firebase-auth-ready", boot, { once: true });
if (window.firebaseAuth?.onAuthStateChanged || window.firebaseAuthApi?.onAuthStateChanged) {
  boot();
}

````

## tools/bootstrap_admin.mjs
````text
#!/usr/bin/env node
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import fs from "fs";

const ADMIN_UID = "Enx4e7xn8Rfv5uY3i4qeMDkoGPh2";

function loadCredential() {
  const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (keyPath && fs.existsSync(keyPath)) {
    const keyJson = JSON.parse(fs.readFileSync(keyPath, "utf8"));
    return cert(keyJson);
  }
  // Fallback to ADC (gcloud auth application-default login)
  return applicationDefault();
}

async function main() {
  const cred = loadCredential();
  const app = initializeApp({ credential: cred });
  const db = getFirestore(app);

  const docRef = db.collection("admins").doc(ADMIN_UID);
  await docRef.set(
    {
      uid: ADMIN_UID,
      role: "admin",
      note: "bootstrap",
      createdAt: FieldValue.serverTimestamp()
    },
    { merge: true }
  );
  console.log(`Admin doc written at admins/${ADMIN_UID}`);
}

main().catch(err => {
  console.error("Bootstrap admin failed:", err);
  process.exit(1);
});

````

## tools/dependency_audit.mjs
````text
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");

const SKIP_DIRS = new Set([".git", "node_modules", "dist", "build", "__pycache__"]);
const TEXT_EXT = new Set([".html", ".css", ".js", ".mjs", ".json", ".md", ".yml", ".yaml", ".txt"]);
const BINARY_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".mp4", ".mov", ".psd",
  ".ttf", ".woff", ".woff2", ".eot", ".zip", ".rar", ".7z", ".pdf", ".ico"
]);

const BUILTIN_MODULES = new Set([
  "assert", "buffer", "child_process", "crypto", "events", "fs", "http", "https",
  "os", "path", "process", "readline", "stream", "timers", "url", "util", "zlib"
]);

const HTML_TAG_RE = /<(script|link|img|a|source)\b[^>]*?>/gi;
const HTML_ATTR_RE = /(src|href|srcset)=["']([^"']+)["']/gi;
const CSS_URL_RE = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;

const JS_IMPORT_RE = /\bimport\s+(?:[^"']+from\s+)?["']([^"']+)["']/g;
const JS_EXPORT_RE = /\bexport\s+[^"']+from\s+["']([^"']+)["']/g;
const JS_DYNAMIC_IMPORT_RE = /\bimport\(\s*["']([^"']+)["']\s*\)/g;
const JS_REQUIRE_RE = /\brequire\(\s*["']([^"']+)["']\s*\)/g;
const JS_WORKER_RE = /\bnew\s+Worker\(\s*["']([^"']+)["']/gi;
const JS_WORKER_URL_RE = /\bnew\s+Worker\(\s*new\s+URL\(\s*["']([^"']+)["']\s*,\s*import\.meta\.url\s*\)/gi;
const JS_SW_RE = /\bnavigator\.serviceWorker\.register\(\s*["']([^"']+)["']\s*\)/g;
const JS_FETCH_RE = /\bfetch\(\s*["']([^"']+)["']\s*\)/g;
const JS_XHR_RE = /\.open\(\s*["']GET["']\s*,\s*["']([^"']+)["']\s*\)/g;
const JS_IMPORT_SCRIPTS_RE = /\bimportScripts\(\s*["']([^"']+)["']\s*\)/g;

const JS_URL_ASSIGN_RE = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*new\s+URL\(\s*["']([^"']+)["']\s*,\s*import\.meta\.url\s*\)/g;
const JS_FETCH_VAR_RE = /\bfetch\(\s*([A-Za-z_$][\w$]*)(?:\.href|\s*\)|\s*,)/g;
const JS_WORKER_VAR_RE = /\bnew\s+Worker\(\s*([A-Za-z_$][\w$]*)\s*(?:,|\))/g;
const JS_STRINGIFY_VAR_RE = /\bfetch\(\s*String\(\s*([A-Za-z_$][\w$]*)\s*\)\s*\)/g;

const JS_TEMPLATE_DYNAMIC_RE = /`[^`]*\$\{[^`]+?\}[^`]*`/g;
const JS_CONCAT_DYNAMIC_RE = /["'][^"']*["']\s*\+\s*[A-Za-z_$]/g;

function walk(dir, relBase = "", out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), path.join(relBase, entry.name), out);
    } else if (entry.isFile()) {
      out.push(path.join(relBase, entry.name));
    }
  }
  return out;
}

function normalizeRef(ref) {
  return ref.split("#", 1)[0].split("?", 1)[0].trim();
}

function isExternalUrl(ref) {
  return /^(https?:)?\/\//i.test(ref) || ref.startsWith("data:") ||
    ref.startsWith("mailto:") || ref.startsWith("tel:") || ref.startsWith("javascript:");
}

function classifySpecifier(ref) {
  if (!ref) return "unknown";
  if (ref.startsWith("node:")) return "builtin";
  if (BUILTIN_MODULES.has(ref)) return "builtin";
  if (ref.startsWith("./") || ref.startsWith("../") || ref.startsWith("/")) return "internal";
  return "external";
}

function isLikelyPath(ref) {
  if (!ref) return false;
  if (ref === "a" || ref === "img" || ref === "script" || ref === "link") return false;
  if (!ref.includes("/") && !ref.includes(".")) return false;
  return true;
}

function resolveRef(baseFile, ref, allFiles) {
  const cleaned = normalizeRef(ref);
  if (!cleaned || isExternalUrl(cleaned)) return { resolved: null, cleaned };
  const kind = classifySpecifier(cleaned);
  if (kind !== "internal") return { resolved: null, cleaned };

  let abs = cleaned.startsWith("/")
    ? path.join(ROOT, cleaned)
    : path.join(path.dirname(baseFile), cleaned);
  abs = path.normalize(abs);

  if (allFiles.has(abs)) return { resolved: abs, cleaned: abs };
  if (path.extname(abs)) return { resolved: null, cleaned: abs };

  for (const ext of [".js", ".mjs", ".css", ".json", ".html"]) {
    const guess = abs + ext;
    if (allFiles.has(guess)) return { resolved: guess, cleaned: guess };
  }
  for (const suffix of ["/index.js", "/index.html"]) {
    const guess = abs + suffix;
    if (allFiles.has(guess)) return { resolved: guess, cleaned: guess };
  }
  return { resolved: null, cleaned: abs };
}

function extractHtmlRefs(text) {
  const refs = [];
  let match;
  while ((match = HTML_TAG_RE.exec(text)) !== null) {
    const tag = match[0];
    let attrMatch;
    while ((attrMatch = HTML_ATTR_RE.exec(tag)) !== null) {
      const attr = attrMatch[1].toLowerCase();
      const raw = attrMatch[2];
      if (attr === "srcset") {
        const parts = raw.split(",").map(p => p.trim()).filter(Boolean);
        for (const part of parts) {
          const url = part.split(/\s+/)[0];
          if (url) refs.push(url);
        }
      } else {
        refs.push(raw);
      }
    }
  }
  return refs;
}

function extractAll(regex, text) {
  const out = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    out.push(match[1]);
  }
  return out.filter(Boolean);
}

const files = walk(ROOT);
const absFiles = files.map(f => path.join(ROOT, f));
const allFiles = new Set(absFiles);

const entrypoints = [];
const indexHtml = path.join(ROOT, "index.html");
const accountHtml = path.join(ROOT, "account.html");
if (allFiles.has(indexHtml)) entrypoints.push(indexHtml);
if (allFiles.has(accountHtml)) entrypoints.push(accountHtml);

const worldsDir = path.join(ROOT, "worlds");
if (fs.existsSync(worldsDir)) {
  const worldHtml = walk(worldsDir, "worlds", [])
    .map(p => path.join(ROOT, p))
    .filter(p => p.endsWith(".html"));
  entrypoints.push(...worldHtml);
}

if (!entrypoints.length) {
  const rootHtml = absFiles.filter(p => path.dirname(p) === ROOT && p.endsWith(".html"));
  entrypoints.push(...rootHtml);
}

const nodes = {};
const edges = [];
const missing = [];
const suspectedRuntime = [];
let ignoredBuiltin = 0;
let ignoredExternal = 0;

const referencedPaths = new Set();

for (const file of absFiles) {
  const ext = path.extname(file).toLowerCase();
  nodes[file] = nodes[file] || { path: file, refs_out: [], refs_in: [] };
  if (!TEXT_EXT.has(ext)) continue;
  if (BINARY_EXT.has(ext)) continue;

  let text = "";
  try {
    text = fs.readFileSync(file, "utf8");
  } catch {
    continue;
  }

  let refs = [];
  const isHtml = ext === ".html" || ext === ".htm";
  if (isHtml) {
    refs = extractHtmlRefs(text);
  } else if (ext === ".css") {
    refs = extractAll(CSS_URL_RE, text);
  } else if (ext === ".js" || ext === ".mjs") {
    refs = refs
      .concat(extractAll(JS_IMPORT_RE, text))
      .concat(extractAll(JS_EXPORT_RE, text))
      .concat(extractAll(JS_DYNAMIC_IMPORT_RE, text))
      .concat(extractAll(JS_REQUIRE_RE, text))
      .concat(extractAll(JS_WORKER_URL_RE, text))
      .concat(extractAll(JS_WORKER_RE, text))
      .concat(extractAll(JS_SW_RE, text))
      .concat(extractAll(JS_FETCH_RE, text))
      .concat(extractAll(JS_IMPORT_SCRIPTS_RE, text))
      .concat(extractAll(JS_XHR_RE, text));

    const urlVars = new Map();
    let urlMatch;
    while ((urlMatch = JS_URL_ASSIGN_RE.exec(text)) !== null) {
      urlVars.set(urlMatch[1], urlMatch[2]);
      refs.push(urlMatch[2]);
    }

    const addVarRef = (match) => {
      const varName = match[1];
      if (urlVars.has(varName)) refs.push(urlVars.get(varName));
    };

    let fetchVar;
    while ((fetchVar = JS_FETCH_VAR_RE.exec(text)) !== null) addVarRef(fetchVar);
    let workerVar;
    while ((workerVar = JS_WORKER_VAR_RE.exec(text)) !== null) addVarRef(workerVar);
    let stringifyVar;
    while ((stringifyVar = JS_STRINGIFY_VAR_RE.exec(text)) !== null) addVarRef(stringifyVar);

    const templateHits = extractAll(JS_TEMPLATE_DYNAMIC_RE, text);
    const concatHits = extractAll(JS_CONCAT_DYNAMIC_RE, text);
    if (templateHits.length || concatHits.length) {
      suspectedRuntime.push({
        from: file,
        snippet: [...templateHits, ...concatHits].slice(0, 5).join(" | "),
        note: "Template literal/concat có biến"
      });
    }
  }

  for (const ref of refs) {
    const cleaned = normalizeRef(ref);
    if (!cleaned || cleaned.startsWith("#") || isExternalUrl(cleaned)) continue;
    if (isHtml && !isLikelyPath(cleaned)) {
      throw new Error(`Audit parse lỗi: ref không hợp lệ "${cleaned}" trong ${file}`);
    }
    const kind = classifySpecifier(cleaned);
    if (kind === "builtin") {
      ignoredBuiltin += 1;
      continue;
    }
    if (kind === "external") {
      ignoredExternal += 1;
      continue;
    }
    const { resolved, cleaned: cleanedResolved } = resolveRef(file, cleaned, allFiles);
    if (resolved) {
      referencedPaths.add(resolved);
      nodes[file].refs_out.push(resolved);
      nodes[resolved] = nodes[resolved] || { path: resolved, refs_out: [], refs_in: [] };
      nodes[resolved].refs_in.push(file);
      edges.push({ from: file, to: resolved, kind: "internal" });
    } else {
      missing.push({
        from: file,
        rawRef: ref,
        resolvedRef: cleanedResolved,
        kind: "internal",
        note: "Không tìm thấy file"
      });
    }
  }
}

const reachable = new Set();
const stack = [...entrypoints];
while (stack.length) {
  const cur = stack.pop();
  if (reachable.has(cur)) continue;
  reachable.add(cur);
  for (const nxt of nodes[cur]?.refs_out || []) {
    if (!reachable.has(nxt)) stack.push(nxt);
  }
}

const unreachable = [];
for (const file of absFiles) {
  if (!reachable.has(file)) unreachable.push(file);
}

const referencedBy = {};
for (const edge of edges) {
  referencedBy[edge.to] = referencedBy[edge.to] || [];
  referencedBy[edge.to].push(edge.from);
}

const stats = {
  total: absFiles.length,
  reachable: reachable.size,
  unreachable: unreachable.length,
  missing: missing.length,
  suspected_runtime: suspectedRuntime.length,
  ignored_builtin: ignoredBuiltin,
  ignored_external: ignoredExternal
};

const toRel = (p) => path.relative(ROOT, p).replace(/\\/g, "/");

const auditJson = {
  entrypoints: entrypoints.map(toRel),
  stats,
  missing: missing.map(m => ({
    from: toRel(m.from),
    rawRef: m.rawRef,
    resolvedRef: m.resolvedRef ? toRel(m.resolvedRef) : null,
    kind: m.kind,
    note: m.note
  })),
  suspected_runtime: suspectedRuntime.map(s => ({
    from: toRel(s.from),
    snippet: s.snippet,
    note: s.note
  })),
  nodes: Object.values(nodes).map(n => ({
    path: toRel(n.path),
    type: path.extname(n.path).toLowerCase(),
    reachable: reachable.has(n.path),
    category: classifyNodeCategory(n.path),
    refs_in: n.refs_in.map(toRel),
    refs_out: n.refs_out.map(toRel)
  })),
  edges: edges.map(e => ({ from: toRel(e.from), to: toRel(e.to), kind: e.kind }))
};

fs.writeFileSync(path.join(ROOT, "dependency-audit.json"), JSON.stringify(auditJson, null, 2), "utf8");

const md = [];
md.push("# Báo cáo dependency audit");
md.push("");
md.push(`- Tổng file: ${stats.total}`);
md.push(`- Reachable: ${stats.reachable}`);
md.push(`- Unreachable: ${stats.unreachable}`);
md.push(`- Missing references: ${stats.missing}`);
md.push(`- Nghi vấn runtime: ${stats.suspected_runtime}`);
md.push(`- Builtin bỏ qua: ${stats.ignored_builtin}`);
md.push(`- External bỏ qua: ${stats.ignored_external}`);
md.push("");
md.push("## Entry points");
md.push("```text");
md.push(auditJson.entrypoints.join("\n"));
md.push("```");
md.push("");
md.push("## File bị reference nhưng thiếu (internal)");
md.push("| From | Ref | Raw |");
md.push("|---|---|---|");
auditJson.missing.slice(0, 50).forEach(m => md.push(`| ${m.from} | ${m.resolvedRef || ""} | ${m.rawRef} |`));
md.push("");
md.push("## File chết chắc chắn (unreachable)");
md.push("| File |");
md.push("|---|");
auditJson.nodes
  .filter(n => !n.reachable && n.category !== "doc" && n.category !== "tooling")
  .slice(0, 50)
  .forEach(n => md.push(`| ${n.path} |`));
md.push("");
md.push("## Nghi vấn runtime");
if (!auditJson.suspected_runtime.length) {
  md.push("- Không phát hiện.");
} else {
  auditJson.suspected_runtime.slice(0, 50).forEach(item => {
    md.push(`- ${item.from}: ${item.snippet}`);
  });
}
md.push("");
md.push("## Builtin/External đã bỏ qua");
md.push(`- Builtin: ${stats.ignored_builtin}`);
md.push(`- External: ${stats.ignored_external}`);
md.push("");
md.push("## Kế hoạch dọn rác an toàn");
md.push("- Chuyển file nghi ngờ không dùng vào thư mục _graveyard/ trong 7 ngày trước khi xoá.");
md.push("- Theo dõi lỗi runtime/404 rồi mới xoá vĩnh viễn.");
md.push("");

fs.writeFileSync(path.join(ROOT, "dependency-audit.md"), md.join("\n"), "utf8");

const threadsJsonAbs = path.join(ROOT, "threads.json");
if (allFiles.has(threadsJsonAbs)) {
  if (!reachable.has(threadsJsonAbs) && referencedPaths.has(threadsJsonAbs)) {
    throw new Error("threads.json đang bị false-unreachable");
  }
}

console.log("Tóm tắt audit:");
console.log(`- Tổng file: ${stats.total}`);
console.log(`- Reachable: ${stats.reachable}`);
console.log(`- Unreachable: ${stats.unreachable}`);
console.log(`- Missing references: ${stats.missing}`);

function classifyNodeCategory(filePath) {
  const rel = toRel(filePath);
  const ext = path.extname(filePath).toLowerCase();
  if (rel.startsWith("DOC/") || ext === ".md") return "doc";
  if (rel.startsWith("tools/") || rel.startsWith(".github/")) return "tooling";
  if (ext === ".json") return "data";
  if (BINARY_EXT.has(ext)) return "asset";
  return "runtime";
}

````

## tools/export_repo_snapshot.ps1
````text
﻿param(
  [ValidateSet("snapshot", "bundle", "both")]
  [string]$Mode = "both"
)

$ErrorActionPreference = "Stop"
$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
try { chcp 65001 | Out-Null } catch {}

function Get-RepoRoot {
  try {
    return (git rev-parse --show-toplevel).Trim()
  } catch {
    return $null
  }
}

function ConvertTo-RedactedText([string]$text) {
  if (-not $text) { return $text }
  return ($text -replace '(https?://)[^/@]+@', '$1***@')
}

function Test-ExcludedPath([string]$relativePath) {
  $excludedDirs = @(
    ".git",
    "node_modules",
    "functions/node_modules",
    "functions/lib",
    "dist",
    "build",
    ".next",
    "coverage",
    ".cache",
    ".firebase",
    "functions/.firebase"
  )
  foreach ($dir in $excludedDirs) {
    if ($relativePath -like "$dir/*" -or $relativePath -eq $dir) { return $true }
  }
  if ($relativePath -like "*.log") { return $true }
  return $false
}

function Get-RelativePath([string]$root, [string]$fullPath) {
  return ($fullPath.Substring($root.Length)).TrimStart("\", "/").Replace("\", "/")
}

function Find-SensitiveFiles([string]$root) {
  $patterns = @(".env", "*.pem", "*key*", "serviceAccount*.json", "*token*", "*credential*", "*credentials*")
  $results = @()
  Get-ChildItem -Force -Recurse -File -Path $root | ForEach-Object {
    $rel = Get-RelativePath $root $_.FullName
    if ($rel -like ".git/*") { return }
    if (Test-ExcludedPath $rel) { return }
    foreach ($pattern in $patterns) {
      if ($rel -like $pattern) {
        if ($rel -ieq ".env.example") { return }
        if ($rel -ieq ".env") { $results += $rel; break }
        if ($rel -like "*/.env") { $results += $rel; break }
        $results += $rel
        break
      }
    }
  }
  return ($results | Sort-Object -Unique)
}

function Write-Manifest([string]$root) {
  $manifest = Join-Path $root "repo_manifest.txt"
  $lines = New-Object System.Collections.Generic.List[string]
  $lines.Add("==== REPO MANIFEST ====")
  $lines.Add(("Thời điểm: {0}" -f (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")))
  try { $lines.Add(("Commit: {0}" -f (git rev-parse HEAD).Trim())) } catch { $lines.Add("Commit: (không lấy được)") }
  $lines.Add("")
  $lines.Add("=== Branches ===")
  try { $lines.AddRange((git branch -a) -split "`n") } catch { $lines.Add("Không lấy được branch.") }
  $lines.Add("")
  $lines.Add("=== Remotes ===")
  try { $lines.AddRange((ConvertTo-RedactedText (git remote -v)) -split "`n") } catch { $lines.Add("Không lấy được remote.") }
  $lines.Add("")
  $lines.Add("=== Status ===")
  try { $lines.AddRange((git status --porcelain) -split "`n") } catch { $lines.Add("Không lấy được status.") }
  $lines.Add("")
  $lines.Add("=== Tracked files ===")
  try { $lines.AddRange((git ls-files) -split "`n") } catch { $lines.Add("Không lấy được file list.") }
  $lines.Add("")
  $lines.Add("=== Tree ===")
  if (Get-Command tree -ErrorAction SilentlyContinue) {
    $lines.AddRange((tree /f /a) -split "`n")
  } else {
    Get-ChildItem -Force -Recurse -Path $root | ForEach-Object {
      $lines.Add((Get-RelativePath $root $_.FullName))
    }
  }
  Set-Content -Path $manifest -Value $lines -Encoding UTF8
}

function New-SnapshotZip([string]$root) {
  $zipPath = Join-Path $root "repo_snapshot.zip"
  if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

  Add-Type -AssemblyName System.IO.Compression
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  $zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
  try {
    Get-ChildItem -Force -Recurse -File -Path $root | ForEach-Object {
      $rel = Get-RelativePath $root $_.FullName
      if (Test-ExcludedPath $rel) { return }
      if ($rel -eq "repo_snapshot.zip" -or $rel -eq "repo.bundle") { return }
      [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $rel) | Out-Null
    }
  } finally {
    $zip.Dispose()
  }
}

function New-GitBundle([string]$root) {
  $bundlePath = Join-Path $root "repo.bundle"
  if (Test-Path $bundlePath) { Remove-Item $bundlePath -Force }
  git bundle create $bundlePath --all | Out-Null
}

$root = Get-RepoRoot
if (-not $root) {
  Write-Error "Không tìm thấy repo Git. Hãy chạy script trong repo."
  exit 1
}

Set-Location $root

Write-Host "Quét file nhạy cảm..."
$sensitive = Find-SensitiveFiles $root
if ($sensitive.Count -gt 0) {
  Write-Warning "Phát hiện file có thể nhạy cảm. Hãy xử lý trước khi xuất:"
  $sensitive | ForEach-Object { Write-Host (" - {0}" -f $_) }
  exit 2
}

Write-Manifest $root

if ($Mode -eq "snapshot" -or $Mode -eq "both") {
  Write-Host "Tạo snapshot zip..."
  New-SnapshotZip $root
}

if ($Mode -eq "bundle" -or $Mode -eq "both") {
  Write-Host "Tạo git bundle..."
  New-GitBundle $root
}

Write-Host "Hoàn tất:"
$completed = @()
if ($Mode -eq "snapshot" -or $Mode -eq "both") { $completed += "repo_snapshot.zip" }
if ($Mode -eq "bundle" -or $Mode -eq "both") { $completed += "repo.bundle" }
$completed += "repo_manifest.txt"
$completed | ForEach-Object { Write-Host (" - {0}" -f $_) }

````

## tools/export_repo_snapshot.sh
````text
#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "${ROOT_DIR}" ]]; then
  echo "Không tìm thấy repo Git. Hãy chạy script trong repo." >&2
  exit 1
fi

cd "${ROOT_DIR}"

MANIFEST="repo_manifest.txt"
SNAPSHOT_ZIP="repo_snapshot.zip"
REPO_BUNDLE="repo.bundle"

EXCLUDE_PATTERNS=(
  ".git/*"
  "node_modules/*"
  "functions/node_modules/*"
  "functions/lib/*"
  "dist/*"
  "build/*"
  ".next/*"
  "coverage/*"
  ".cache/*"
  ".firebase/*"
  "functions/.firebase/*"
  "*.log"
)

SENSITIVE_PATTERNS=(
  ".env"
  "*.pem"
  "*key*"
  "serviceAccount*.json"
  "*token*"
  "*credential*"
  "*credentials*"
)

redact_remote() {
  sed -E 's#(https?://)[^/@]+@#\1***@#g'
}

echo "Tạo manifest: ${MANIFEST}"
{
  echo "==== REPO MANIFEST ===="
  echo "Thời điểm: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  echo "Commit: $(git rev-parse HEAD)"
  echo
  echo "=== Branches ==="
  git branch -a
  echo
  echo "=== Remotes ==="
  git remote -v | redact_remote
  echo
  echo "=== Status ==="
  git status --porcelain
  echo
  echo "=== Tracked files ==="
  git ls-files
  echo
  echo "=== Tree ==="
  if command -v tree >/dev/null 2>&1; then
    tree -a -I '.git|node_modules|dist|build|.next|coverage|.cache|functions/lib|functions/node_modules|.firebase|functions/.firebase'
  else
    find . -maxdepth 4 -print
  fi
} > "${MANIFEST}"

echo "Quét file nhạy cảm (chỉ cảnh báo)..."
SENSITIVE_FOUND=()
while IFS= read -r file; do
  [[ -z "${file}" ]] && continue
  SENSITIVE_FOUND+=("${file}")
done < <(
  find . -type f \( \
    -iname "${SENSITIVE_PATTERNS[0]}" -o \
    -iname "${SENSITIVE_PATTERNS[1]}" -o \
    -iname "${SENSITIVE_PATTERNS[2]}" -o \
    -iname "${SENSITIVE_PATTERNS[3]}" -o \
    -iname "${SENSITIVE_PATTERNS[4]}" -o \
    -iname "${SENSITIVE_PATTERNS[5]}" -o \
    -iname "${SENSITIVE_PATTERNS[6]}" \
  \)
)

if [[ "${#SENSITIVE_FOUND[@]}" -gt 0 ]]; then
  echo "CẢNH BÁO: phát hiện file có thể nhạy cảm. Hãy kiểm tra trước khi chia sẻ:"
  printf ' - %s\n' "${SENSITIVE_FOUND[@]}"
  echo "Nếu cần, hãy loại bỏ hoặc che nội dung trước khi gửi."
else
  echo "Không phát hiện file nhạy cảm theo pattern cơ bản."
fi

echo "Tạo snapshot zip (không chứa lịch sử Git)..."
ZIP_EXCLUDES=()
for pattern in "${EXCLUDE_PATTERNS[@]}"; do
  ZIP_EXCLUDES+=("-x" "${pattern}")
done
zip -r "${SNAPSHOT_ZIP}" . "${ZIP_EXCLUDES[@]}" >/dev/null

echo "Tạo git bundle (có lịch sử)..."
git bundle create "${REPO_BUNDLE}" --all

echo "Hoàn tất:"
echo " - ${SNAPSHOT_ZIP}"
echo " - ${REPO_BUNDLE}"
echo " - ${MANIFEST}"

````

## tools/health_history.mjs
````text
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

````

## tools/import_tch.mjs
````text
#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { normalizeAndDedupeThreads } from "../data_normalize.js";

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag, fallback) => {
    const i = args.indexOf(flag);
    return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
  };
  return {
    inDir: get("--in", "data/raw_tch"),
    outFile: get("--out", "data/threads.generated.json")
  };
}

function hexFromRgb(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map(v => {
        const n = Number(v);
        return Number.isInteger(n) && n >= 0 && n <= 255
          ? n.toString(16).padStart(2, "0")
          : null;
      })
      .join("")
  ).toUpperCase();
}

function parseLine(line, file, lineNumber) {
  const parts = line.split(",").map(p => p.trim());
  if (parts.length === 6 || parts.length === 7) {
    const [code, brand, name, maybeThickness, rRaw, gRaw, bRaw] =
      parts.length === 7
        ? parts
        : [parts[0], parts[1], parts[2], null, parts[3], parts[4], parts[5]];
    const r = Number(rRaw);
    const g = Number(gRaw);
    const b = Number(bRaw);
    if (![r, g, b].every(v => Number.isInteger(v) && v >= 0 && v <= 255)) {
      console.warn(`Skip invalid RGB at ${file}:${lineNumber} -> ${line}`);
      return null;
    }
    const hex = hexFromRgb(r, g, b);
    if (!hex || hex.includes("null")) {
      console.warn(`Skip invalid hex at ${file}:${lineNumber} -> ${line}`);
      return null;
    }
    return {
      brand,
      code,
      name,
      hex,
      rgb: { r, g, b },
      thickness: maybeThickness || undefined,
      source: { type: "TCH", file: path.basename(file), line: lineNumber },
      confidence: 0.9
    };
  }
  console.warn(`Skip invalid column count at ${file}:${lineNumber} -> ${line}`);
  return null;
}

async function readTchFile(filePath, results) {
  const data = await fs.readFile(filePath, "utf8");
  const lines = data.split(/\r?\n/);
  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();
    if (!line) return;
    const parsed = parseLine(line, path.basename(filePath), idx + 1);
    if (!parsed) return;
    results.push(parsed);
  });
}

async function main() {
  const { inDir, outFile } = parseArgs();
  await fs.mkdir(inDir, { recursive: true });
  const outDir = path.dirname(outFile);
  await fs.mkdir(outDir, { recursive: true });

  const entries = await fs.readdir(inDir, { withFileTypes: true });
  const tchFiles = entries
    .filter(e => e.isFile() && e.name.toLowerCase().endsWith(".tch"))
    .map(e => path.join(inDir, e.name));

  if (!tchFiles.length) {
    console.warn(`No .tch files found in ${inDir}`);
    await fs.writeFile(outFile, "[]\n", "utf8");
    return;
  }

  const results = [];

  for (const file of tchFiles) {
    await readTchFile(file, results);
  }

  const normalized = normalizeAndDedupeThreads(results, {
    addTimestamps: true,
    timestamp: new Date().toISOString()
  });

  normalized.sort((a, b) => {
    const brandCmp = (a.brand || "").localeCompare(b.brand || "");
    if (brandCmp !== 0) return brandCmp;
    return (a.code || "").localeCompare(b.code || "");
  });

  await fs.writeFile(outFile, JSON.stringify(normalized, null, 2) + "\n", "utf8");
  console.log(`Written ${normalized.length} records to ${outFile}`);
}

main().catch(err => {
  console.error("Import failed", err);
  process.exit(1);
});

````

## tools/normalize_threads.mjs
````text
import { writeFile } from "node:fs/promises";
import { runValidation } from "./validate_threads.mjs";

const threadsPath = new URL("../threads.json", import.meta.url);

const main = async () => {
  const { cleaned, conflicts } = await runValidation();
  if (conflicts.length) {
    console.error(`[normalize_threads] Có ${conflicts.length} xung đột. Vui lòng xử lý threads.conflicts.json trước.`);
    process.exit(1);
  }
  await writeFile(threadsPath, JSON.stringify(cleaned, null, 2), "utf8");
  console.info(`[normalize_threads] Ghi threads.json thành công (${cleaned.length} bản ghi).`);
};

main().catch((err) => {
  console.error("[normalize_threads] failed", err);
  process.exit(1);
});

````

## tools/ops_automation.mjs
````text
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

````

## tools/ops_bot.mjs
````text
import fs from "fs";
import path from "path";
import crypto from "crypto";

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
    const key = crypto.createHash("sha1").update(`${item.title}\n${reason}`).digest("hex").slice(0, 8).toUpperCase();
    const id = `AUTO-${key}`;
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
    .filter((line) => /^\d+\.\s+\[AUTO-[0-9A-F]{8}\]\[P\d\]/.test(line))
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

````

## tools/quarantine_candidates.mjs
````text
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "DOC", "audit");
const JSON_PATH = path.join(OUTPUT_DIR, "quarantine-candidates.json");
const MD_PATH = path.join(OUTPUT_DIR, "quarantine-candidates.md");

const IGNORE_DIRS = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".cache",
  ".next",
  ".vercel",
  "tmp",
  "artifacts",
  "reports",
  "_graveyard"
]);

const DENYLIST = new Set([
  "index.html",
  "account.html",
  "auth.js",
  "script.js",
  "threads.json",
  "workers/thread_search.worker.js",
  "worlds/threadcolor.html",
  "worlds/threadvault.html",
  "worlds/palette.html"
]);

const CANDIDATE_EXT = new Set([".png", ".jpg", ".jpeg", ".svg", ".webp", ".ico", ".woff", ".woff2", ".ttf"]);
const MANUAL_EXT = new Set([".js", ".mjs", ".css", ".html", ".json"]);
const TEXT_EXT = new Set([".html", ".js", ".mjs", ".css", ".md"]);

const toPosix = (p) => p.split(path.sep).join("/");

const readDirSorted = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.sort((a, b) => a.name.localeCompare(b.name, "vi", { sensitivity: "base" }));
};

const walk = (dir, rel = "") => {
  const items = [];
  for (const entry of readDirSorted(dir)) {
    const relPath = path.join(rel, entry.name);
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      items.push(...walk(path.join(dir, entry.name), relPath));
      continue;
    }
    if (entry.isFile()) items.push(relPath);
  }
  return items;
};

const isCandidate = (relPath) => {
  if (DENYLIST.has(toPosix(relPath))) return false;
  const ext = path.extname(relPath).toLowerCase();
  return CANDIDATE_EXT.has(ext);
};

const isTextFile = (relPath) => TEXT_EXT.has(path.extname(relPath).toLowerCase());
const isManualCandidate = (relPath) => MANUAL_EXT.has(path.extname(relPath).toLowerCase());

const readTextFiles = (files) =>
  files
    .filter(isTextFile)
    .map((file) => ({
      path: toPosix(file),
      content: fs.readFileSync(path.join(ROOT, file), "utf8")
    }));

const isReferenced = (candidate, sources) => {
  const posix = toPosix(candidate);
  const base = path.basename(candidate);
  return sources.some(({ content }) => content.includes(posix) || content.includes(base));
};

const main = () => {
  const allFiles = walk(ROOT);
  const sources = readTextFiles(allFiles);
  const candidates = [];
  const manualCandidates = [];

  for (const file of allFiles.filter(isCandidate)) {
    if (isReferenced(file, sources)) continue;
    candidates.push({
      path: toPosix(file),
      reason: "Kh\u00f4ng t\u00ecm th\u1ea5y tham chi\u1ebfu trong *.html/*.js/*.mjs/*.css/*.md"
    });
  }

  for (const file of allFiles.filter(isManualCandidate)) {
    if (isReferenced(file, sources)) continue;
    manualCandidates.push({
      path: toPosix(file),
      reason: "Ch\u1ec9 g\u1ee3i \u00fd duy\u1ec7t tay (kh\u00f4ng t\u1ef1 \u0111\u1ed9ng)"
    });
  }

  candidates.sort((a, b) => a.path.localeCompare(b.path, "vi", { sensitivity: "base" }));
  manualCandidates.sort((a, b) => a.path.localeCompare(b.path, "vi", { sensitivity: "base" }));

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const json = {
    generated_by: "tools/quarantine_candidates.mjs",
    total_candidates: candidates.length,
    candidates,
    manual_candidates: manualCandidates
  };
  fs.writeFileSync(JSON_PATH, JSON.stringify(json, null, 2), "utf8");

  const mdLines = [
    "# \u1ee8ng vi\u00ean c\u00e1ch ly (Quarantine)",
    "",
    `T\u1ed5ng s\u1ed1 \u1ee9ng vi\u00ean: ${candidates.length}`,
    "",
    "## Danh s\u00e1ch \u1ee9ng vi\u00ean",
    ...(candidates.length ? candidates.map((item) => `- ${item.path}`) : ["- (kh\u00f4ng c\u00f3)"]),
    "",
    "## C\u1ea7n duy\u1ec7t tay",
    ...(manualCandidates.length ? manualCandidates.map((item) => `- ${item.path}`) : ["- (kh\u00f4ng c\u00f3)"])
  ];
  fs.writeFileSync(MD_PATH, mdLines.join("\n"), "utf8");

  console.log(`[quarantine] candidates=${candidates.length}`);
};

main();

````

## tools/quarantine_pr.mjs
````text
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

````

## tools/README_EXPORT_REPO.md
````text
# Hướng dẫn xuất repo để chia sẻ phân tích

Mục tiêu: tạo gói repo phục vụ phân tích mà **không lộ bí mật**. Script hỗ trợ 2 lựa chọn:
- Snapshot zip (không lịch sử Git): `repo_snapshot.zip`
- Git bundle (có lịch sử): `repo.bundle`

## Cách chạy

```bash
bash tools/export_repo_snapshot.sh
```

### PowerShell (Windows)

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\tools\export_repo_snapshot.ps1 -Mode both
```

Sau khi chạy, thư mục root sẽ có:
- `repo_snapshot.zip`
- `repo.bundle`
- `repo_manifest.txt`

## Lưu ý bảo mật (rất quan trọng)

Script có bước quét file nhạy cảm theo pattern, ví dụ: `.env`, `*.pem`, `*key*`, `serviceAccount*.json`, `*token*`, `*credential*`.
Thư mục `node_modules` và các artifact build được loại khỏi vùng quét để tránh báo động nhầm.
Nếu có cảnh báo, **không chia sẻ** gói cho đến khi đã:
- Loại bỏ file nhạy cảm khỏi repo, hoặc
- Che/redact nội dung trước khi gửi.

## Submodule (repo con gắn vào repo cha)

Snapshot zip và git bundle **không tự động đóng gói nội dung submodule**.
Nếu repo có submodule:
1) Chạy `git submodule update --init --recursive`
2) Chia sẻ thêm từng submodule (zip/bundle riêng) hoặc ghi rõ rằng submodule không kèm.

## Git LFS (file lớn lưu ngoài Git)

Git LFS lưu file lớn ở ngoài git history. `repo.bundle` sẽ **không chứa** nội dung LFS nếu người nhận chưa pull.
Nếu repo dùng LFS:
- Ghi rõ trong trao đổi
- Hoặc cung cấp thêm file LFS (theo hướng dẫn của team).

## Rủi ro & cách xử lý

- Nặng: vô tình đóng gói secret → **bắt buộc kiểm tra cảnh báo** trước khi gửi.
- Vừa: thiếu file do submodule/LFS → kiểm tra và bổ sung hướng dẫn.
- Nhẹ: thiếu dotfiles → zip mặc định đã bao gồm file ẩn, nhưng nên xác nhận bằng `repo_manifest.txt`.

## Checklist tự test (PASS/FAIL)

- [ ] Tạo zip/bundle thành công
- [ ] `repo_manifest.txt` được sinh ra
- [ ] Không đóng gói `node_modules`
- [ ] Cảnh báo secret hoạt động nếu có file nhạy cảm

````

## tools/repo_doctor.mjs
````text
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const REPORT_DIR = path.join(ROOT, "reports");

const SKIP_DIRS = new Set([".git", "node_modules", "dist", "build", "__pycache__"]);
const TEXT_EXT = new Set([".html", ".css", ".js", ".mjs", ".json", ".md", ".yml", ".yaml", ".txt"]);
const BINARY_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".mp4", ".mov", ".psd",
  ".ttf", ".woff", ".woff2", ".eot", ".zip", ".rar", ".7z", ".pdf", ".ico"
]);
const ASSET_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".mp4", ".mov", ".psd",
  ".ttf", ".woff", ".woff2", ".eot", ".zip", ".rar", ".7z", ".pdf", ".ico"
]);
const BUILTIN_MODULES = new Set([
  "assert", "buffer", "child_process", "crypto", "events", "fs", "http", "https",
  "os", "path", "process", "readline", "stream", "timers", "url", "util", "zlib"
]);

const HTML_TAG_RE = /<(script|link|img|a|source)\b[^>]*?>/gi;
const HTML_ATTR_RE = /(src|href|srcset)=["']([^"']+)["']/gi;
const CSS_URL_RE = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;

const JS_IMPORT_RE = /\bimport\s+(?:[^"']+from\s+)?["']([^"']+)["']/g;
const JS_EXPORT_RE = /\bexport\s+[^"']+from\s+["']([^"']+)["']/g;
const JS_DYNAMIC_IMPORT_RE = /\bimport\(\s*["']([^"']+)["']\s*\)/g;
const JS_REQUIRE_RE = /\brequire\(\s*["']([^"']+)["']\s*\)/g;
const JS_WORKER_RE = /\bnew\s+Worker\(\s*["']([^"']+)["']/gi;
const JS_WORKER_URL_RE = /\bnew\s+Worker\(\s*new\s+URL\(\s*["']([^"']+)["']\s*,\s*import\.meta\.url\s*\)/gi;
const JS_SW_RE = /\bnavigator\.serviceWorker\.register\(\s*["']([^"']+)["']\s*\)/g;
const JS_FETCH_RE = /\bfetch\(\s*["']([^"']+)["']\s*\)/g;
const JS_XHR_RE = /\.open\(\s*["']GET["']\s*,\s*["']([^"']+)["']\s*\)/g;
const JS_IMPORT_SCRIPTS_RE = /\bimportScripts\(\s*["']([^"']+)["']\s*\)/g;
const JS_URL_ASSIGN_RE = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*new\s+URL\(\s*["']([^"']+)["']\s*,\s*import\.meta\.url\s*\)/g;

const RUNTIME_JS = [
  "auth.js",
  "script.js",
  "crowd.js",
  "stock.js",
  "data_normalize.js",
  "library.js",
  "workers/thread_search.worker.js"
];
const GENERATED_OUTPUTS = new Set(["threads.cleaned.json", "threads.conflicts.json"]);

function walk(dir, relBase = "", out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), path.join(relBase, entry.name), out);
    } else if (entry.isFile()) {
      out.push(path.join(relBase, entry.name));
    }
  }
  return out;
}

function normalizeRef(ref) {
  return ref.split("#", 1)[0].split("?", 1)[0].trim();
}

function isExternalUrl(ref) {
  return /^(https?:)?\/\//i.test(ref) || ref.startsWith("data:") ||
    ref.startsWith("mailto:") || ref.startsWith("tel:") || ref.startsWith("javascript:");
}

function classifySpecifier(ref) {
  if (!ref) return "unknown";
  if (ref.startsWith("node:")) return "builtin";
  if (BUILTIN_MODULES.has(ref)) return "builtin";
  if (ref.startsWith("./") || ref.startsWith("../") || ref.startsWith("/")) return "internal";
  return "external";
}

function resolveRef(baseFile, ref, allFiles) {
  const cleaned = normalizeRef(ref);
  if (!cleaned || isExternalUrl(cleaned)) return { resolved: null, cleaned };
  const kind = classifySpecifier(cleaned);
  if (kind !== "internal") return { resolved: null, cleaned };

  let abs = cleaned.startsWith("/")
    ? path.join(ROOT, cleaned)
    : path.join(path.dirname(baseFile), cleaned);
  abs = path.normalize(abs);

  if (allFiles.has(abs)) return { resolved: abs, cleaned: abs };
  if (path.extname(abs)) return { resolved: null, cleaned: abs };

  for (const ext of [".js", ".mjs", ".css", ".json", ".html"]) {
    const guess = abs + ext;
    if (allFiles.has(guess)) return { resolved: guess, cleaned: guess };
  }
  for (const suffix of ["/index.js", "/index.html"]) {
    const guess = abs + suffix;
    if (allFiles.has(guess)) return { resolved: guess, cleaned: guess };
  }
  return { resolved: null, cleaned: abs };
}

function extractHtmlRefs(text) {
  const refs = [];
  let match;
  while ((match = HTML_TAG_RE.exec(text)) !== null) {
    const tag = match[0];
    let attrMatch;
    while ((attrMatch = HTML_ATTR_RE.exec(tag)) !== null) {
      const attr = attrMatch[1].toLowerCase();
      const raw = attrMatch[2];
      if (attr === "srcset") {
        const parts = raw.split(",").map(p => p.trim()).filter(Boolean);
        for (const part of parts) {
          const url = part.split(/\s+/)[0];
          if (url) refs.push(url);
        }
      } else {
        refs.push(raw);
      }
    }
  }
  return refs;
}

function extractAll(regex, text) {
  const out = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    out.push(match[1]);
  }
  return out.filter(Boolean);
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function fileCategory(rel) {
  if (rel.startsWith("DOC/") || rel.endsWith(".md")) return "doc";
  if (rel.startsWith("tools/") || rel.startsWith(".github/")) return "tooling";
  if (rel.endsWith(".json")) return "data";
  if (ASSET_EXT.has(path.extname(rel).toLowerCase())) return "asset";
  return "runtime";
}

function isRuntimeEntry(relPath) {
  if (relPath === "index.html" || relPath === "account.html") return true;
  if (relPath.startsWith("worlds/") && relPath.endsWith(".html")) return true;
  if (relPath.startsWith("workers/")) return true;
  return RUNTIME_JS.includes(relPath);
}

const files = walk(ROOT);
const absFiles = files.map(f => path.join(ROOT, f));
const allFiles = new Set(absFiles);

const nodes = {};
const missing = [];
const missingWarn = [];
const generatedInfo = [];
const refsIn = {};
let todoCount = 0;

for (const file of absFiles) {
  const ext = path.extname(file).toLowerCase();
  nodes[file] = nodes[file] || { path: file, refs_out: [] };
  if (!TEXT_EXT.has(ext)) continue;
  if (BINARY_EXT.has(ext)) continue;

  let text = "";
  try {
    text = fs.readFileSync(file, "utf8");
  } catch {
    continue;
  }

  const todoMatches = text.match(/TODO|FIXME/gi);
  if (todoMatches) todoCount += todoMatches.length;

  let refs = [];
  if (ext === ".html" || ext === ".htm") {
    refs = extractHtmlRefs(text);
  } else if (ext === ".css") {
    refs = extractAll(CSS_URL_RE, text);
  } else if (ext === ".js" || ext === ".mjs") {
    refs = refs
      .concat(extractAll(JS_IMPORT_RE, text))
      .concat(extractAll(JS_EXPORT_RE, text))
      .concat(extractAll(JS_DYNAMIC_IMPORT_RE, text))
      .concat(extractAll(JS_REQUIRE_RE, text))
      .concat(extractAll(JS_WORKER_URL_RE, text))
      .concat(extractAll(JS_WORKER_RE, text))
      .concat(extractAll(JS_SW_RE, text))
      .concat(extractAll(JS_FETCH_RE, text))
      .concat(extractAll(JS_IMPORT_SCRIPTS_RE, text))
      .concat(extractAll(JS_XHR_RE, text));

    let urlMatch;
    while ((urlMatch = JS_URL_ASSIGN_RE.exec(text)) !== null) {
      refs.push(urlMatch[2]);
    }
  }

  for (const ref of refs) {
    const cleaned = normalizeRef(ref);
    if (!cleaned || cleaned.startsWith("#") || isExternalUrl(cleaned)) continue;
    const kind = classifySpecifier(cleaned);
    if (kind === "builtin" || kind === "external") continue;
    const { resolved, cleaned: cleanedResolved } = resolveRef(file, cleaned, allFiles);
    if (resolved) {
      nodes[file].refs_out.push(resolved);
      refsIn[resolved] = refsIn[resolved] || new Set();
      refsIn[resolved].add(file);
    } else {
      const relFrom = path.relative(ROOT, file).replace(/\\/g, "/");
      const relMissing = cleanedResolved
        ? path.relative(ROOT, cleanedResolved).replace(/\\/g, "/")
        : cleaned;
      if (GENERATED_OUTPUTS.has(relMissing)) {
        generatedInfo.push({
          title: "Output tooling (\u0111\u01b0\u1ee3c ph\u00e9p)",
          detail: `Ch\u01b0a c\u00f3 ${relMissing}`,
          path: relFrom
        });
      } else if (isRuntimeEntry(relFrom)) {
        missing.push({
          title: "Thi\u1ebfu tham chi\u1ebfu n\u1ed9i b\u1ed9",
          detail: `Kh\u00f4ng t\u00ecm th\u1ea5y ${relMissing}`,
          from: relFrom,
          ref: cleaned
        });
      } else {
        missingWarn.push({
          title: "Thi\u1ebfu tham chi\u1ebfu n\u1ed9i b\u1ed9 (tooling/docs)",
          detail: `Kh\u00f4ng t\u00ecm th\u1ea5y ${relMissing}`,
          path: relFrom
        });
      }
    }
  }
}

const blockIssues = [];
const warnIssues = [];
const infoIssues = [];

for (const relPath of RUNTIME_JS) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) continue;
  const result = spawnSync("node", ["--check", abs], { encoding: "utf8" });
  if (result.status !== 0) {
    blockIssues.push({
      title: "L\u1ed7i c\u00fa ph\u00e1p JavaScript",
      detail: result.stderr.trim() || result.stdout.trim(),
      from: relPath
    });
  }
}

if (missing.length) {
  for (const item of missing) blockIssues.push(item);
}
if (missingWarn.length) {
  for (const item of missingWarn) warnIssues.push(item);
}
if (generatedInfo.length) {
  for (const item of generatedInfo) infoIssues.push(item);
}

for (const file of absFiles) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const ext = path.extname(file).toLowerCase();
  if (rel.startsWith("_graveyard/")) continue;
  if ((ASSET_EXT.has(ext) || ext === ".css") && !(refsIn[file]?.size)) {
    warnIssues.push({
      title: "Asset/CSS kh\u00f4ng \u0111\u01b0\u1ee3c tham chi\u1ebfu",
      detail: "Kh\u00f4ng c\u00f3 refs_in",
      path: rel
    });
  }
  try {
    const size = fs.statSync(file).size;
    if (size > 500 * 1024) {
      warnIssues.push({
      title: "File l\u1edbn",
        detail: `${Math.round(size / 1024)} KB`,
        path: rel
      });
    }
  } catch {
    continue;
  }
}

if (todoCount > 0) {
  warnIssues.push({
    title: "TODO/FIXME",
    detail: `T\u1ed5ng ${todoCount} m\u1ee5c`,
    path: "-"
  });
}

infoIssues.push({
  title: "Th\u1ed1ng k\u00ea t\u1ed5ng quan",
  detail: `T\u1ed5ng file: ${absFiles.length}`
});
infoIssues.push({
  title: "Worlds",
  detail: `${absFiles.filter(p => p.includes(path.join(ROOT, "worlds") + path.sep) && p.endsWith(".html")).length} trang`
});
infoIssues.push({
  title: "Workers",
  detail: `${absFiles.filter(p => p.includes(path.join(ROOT, "workers") + path.sep)).length} file`
});

const counts = {
  block: blockIssues.length,
  warn: warnIssues.length,
  info: infoIssues.length
};

let score = 100;
score -= counts.block * 25;
score -= counts.warn * 3;
if (counts.block > 0) score = Math.min(score, 79);
if (score < 0) score = 0;

const reasons = new Map();
for (const issue of blockIssues) {
  const key = `BLOCK:${issue.title}`;
  reasons.set(key, (reasons.get(key) || 0) + 1);
}
for (const issue of warnIssues) {
  const key = `WARN:${issue.title}`;
  reasons.set(key, (reasons.get(key) || 0) + 1);
}
const topReasons = [...reasons.entries()]
  .map(([key, count]) => {
    const [level, title] = key.split(":");
    return { level, title, count };
  })
  .sort((a, b) => b.count - a.count)
  .slice(0, 5);

const reportJson = {
  generated_at: new Date().toISOString(),
  health_score: score,
  counts,
  top_reasons: topReasons,
  issues: {
    block: blockIssues,
    warn: warnIssues,
    info: infoIssues
  },
  stats: {
    total_files: absFiles.length,
    missing_internal: missing.length,
    unused_assets: warnIssues.filter(i => i.title === "Asset/CSS kh\u00f4ng \u0111\u01b0\u1ee3c tham chi\u1ebfu").length,
    large_files: warnIssues.filter(i => i.title === "File l\u1edbn").length
  }
};

ensureDir(REPORT_DIR);
fs.writeFileSync(path.join(REPORT_DIR, "repo_health.json"), JSON.stringify(reportJson, null, 2), "utf8");

const md = [];
md.push("# \u0042\u00e1o c\u00e1o s\u1ee9c kho\u1ebb Repo");
md.push("");
md.push("- \u0110i\u1ec3m s\u1ee9c kho\u1ebb: **" + score + "**");
md.push("- BLOCK: " + counts.block + " | WARN: " + counts.warn + " | INFO: " + counts.info);
md.push("");
md.push("## BLOCK");
if (!blockIssues.length) {
  md.push("- Kh\u00f4ng c\u00f3.");
} else {
  blockIssues.forEach(issue => {
    md.push("- " + issue.title + ": " + (issue.detail || "") + (issue.from ? " (" + issue.from + ")" : ""));
  });
}
md.push("");
md.push("## WARN");
if (!warnIssues.length) {
  md.push("- Kh\u00f4ng c\u00f3.");
} else {
  warnIssues.forEach(issue => {
    md.push("- " + issue.title + ": " + (issue.detail || "") + (issue.path ? " (" + issue.path + ")" : ""));
  });
}
md.push("");
md.push("## Top 5 g\u1ee3i \u00fd t\u1ed1i \u01b0u s\u1ea1ch & \u0111\u1eaft");
md.push("- D\u1ecdn asset/CSS kh\u00f4ng d\u00f9ng sau 7 ng\u00e0y quarantine.");
md.push("- Gi\u1ea3m file l\u1edbn ho\u1eb7c t\u00e1ch t\u1ea3i theo nhu c\u1ea7u.");
md.push("- Gi\u1ea3m TODO/FIXME trong runtime core.");
md.push("- Gi\u1eef missing n\u1ed9i b\u1ed9 \u1edf m\u1ee9c 0.");
md.push("- Gi\u1eef \u0111i\u1ec3m s\u1ee9c kho\u1ebb > 90.");
md.push("");
fs.writeFileSync(path.join(REPORT_DIR, "repo_health.md"), md.join("\n"), "utf8");

if (counts.block > 0) {
  console.error("BLOCK: Repo Doctor ph\u00e1t hi\u1ec7n l\u1ed7i c\u1ea7n x\u1eed l\u00fd.");
  process.exit(1);
}

````

## tools/repo_snapshot.mjs
````text
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DOC_PATH = path.join(ROOT, "DOC", "REPO_SNAPSHOT.md");
const INDEX_JSON_PATH = path.join(ROOT, "DOC", "REPO_SNAPSHOT_INDEX.json");

const IGNORE_DIRS = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".cache",
  ".next",
  ".vercel",
  "tmp",
  "artifacts",
  "reports"
]);

const PARTIAL_DIRS = new Set([
  "DOC/health/daily"
]);

const toPosix = (p) => p.split(path.sep).join("/");
const isPartialDir = (rel) => PARTIAL_DIRS.has(toPosix(rel));

const stats = {
  totalFiles: 0,
  totalDirs: 0,
  extCounts: new Map()
};

const ignored = {
  dirs: [],
  partialDirs: []
};

const nodes = [];

const addExt = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  const key = ext ? ext : "(noext)";
  stats.extCounts.set(key, (stats.extCounts.get(key) || 0) + 1);
};

const readDirSorted = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.sort((a, b) => a.name.localeCompare(b.name, "vi", { sensitivity: "base" }));
};

const buildTree = (dir, rel = "", indent = "") => {
  const lines = [];
  const entries = readDirSorted(dir);

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) {
        ignored.dirs.push(toPosix(path.join(rel, entry.name)));
        continue;
      }
      const relDir = path.join(rel, entry.name);
      stats.totalDirs += 1;
      nodes.push({ path: toPosix(relDir), type: "dir" });
      if (isPartialDir(relDir)) {
        ignored.partialDirs.push(toPosix(relDir));
        lines.push(`${indent}- ${entry.name} (bo qua file con)`);
        continue;
      }
      lines.push(`${indent}- ${entry.name}`);
      lines.push(...buildTree(path.join(dir, entry.name), relDir, `${indent}  `));
      continue;
    }

    if (entry.isFile()) {
      const relFile = path.join(rel, entry.name);
      stats.totalFiles += 1;
      addExt(entry.name);
      nodes.push({ path: toPosix(relFile), type: "file" });
      lines.push(`${indent}- ${entry.name}`);
    }
  }

  return lines;
};

const renderStats = () => {
  const extLines = Array.from(stats.extCounts.entries())
    .sort((a, b) => a[0].localeCompare(b[0], "vi", { sensitivity: "base" }))
    .map(([ext, count]) => `${ext}: ${count}`);

  const ignoredLines = [
    ...ignored.dirs.map((p) => `- ${p}/ (bo qua toan bo)`),
    ...ignored.partialDirs.map((p) => `- ${p}/ (bo qua file con)`)
  ];

  const blocks = [
    `Tong thu muc: ${stats.totalDirs}`,
    `Tong file: ${stats.totalFiles}`,
    "",
    "Thong ke phan mo rong:",
    ...extLines,
    ""
  ];

  if (ignoredLines.length) {
    blocks.push("Bo qua:");
    blocks.push(...ignoredLines);
  } else {
    blocks.push("Bo qua: (khong co)");
  }

  return blocks.join("\n");
};

const renderDoc = (treeText, statsText) => {
  const header = [
    "# REPO SNAPSHOT",
    "",
    "- Tai lieu tu dong: tools/repo_snapshot.mjs",
    "- Cac khoi duoi day duoc cap nhat tu dong, on dinh va khong tao diff vo nghia.",
    ""
  ].join("\n");

  const treeBlock = [
    "## Cay thu muc",
    "<!-- SNAPSHOT_TREE_START -->",
    "```text",
    treeText,
    "```",
    "<!-- SNAPSHOT_TREE_END -->",
    ""
  ].join("\n");

  const statsBlock = [
    "## Thong ke",
    "<!-- SNAPSHOT_STATS_START -->",
    "```text",
    statsText,
    "```",
    "<!-- SNAPSHOT_STATS_END -->",
    ""
  ].join("\n");

  return `${header}${treeBlock}${statsBlock}`;
};

const updateSnapshotFile = (treeText, statsText) => {
  if (!fs.existsSync(path.dirname(DOC_PATH))) {
    fs.mkdirSync(path.dirname(DOC_PATH), { recursive: true });
  }
  const content = renderDoc(treeText, statsText);
  fs.writeFileSync(DOC_PATH, content, "utf8");
};

const writeIndexJson = () => {
  const data = {
    generatedBy: "tools/repo_snapshot.mjs",
    root: ".",
    stats: {
      totalFiles: stats.totalFiles,
      totalDirs: stats.totalDirs,
      extCounts: Object.fromEntries(stats.extCounts)
    },
    ignored,
    nodes
  };
  fs.writeFileSync(INDEX_JSON_PATH, JSON.stringify(data, null, 2), "utf8");
};

const main = () => {
  const treeLines = buildTree(ROOT);
  const treeText = treeLines.join("\n");
  const statsText = renderStats();
  updateSnapshotFile(treeText, statsText);
  writeIndexJson();
  console.log(`[snapshot] files=${stats.totalFiles} dirs=${stats.totalDirs}`);
};

main();

````

## tools/repo_textdump.mjs
````text
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUTPUT_MD = "DOC/REPO_SNAPSHOT_FULL.md";
const OUTPUT_INDEX = "DOC/REPO_SNAPSHOT_FULL_INDEX.json";
const MAX_BYTES = 300 * 1024;

const IGNORE_DIRS = new Set([
  ".git",
  "node_modules",
  "functions/node_modules",
  "functions/lib",
  ".firebase",
  "reports",
  "artifacts"
]);

const toPosix = (p) => p.split(path.sep).join("/");
const isIgnoredDir = (name) => IGNORE_DIRS.has(name);

const stats = {
  scannedFiles: 0,
  includedFiles: 0,
  skippedFiles: 0,
  skippedReasons: {}
};

const ignored = {
  dirs: []
};

const included = [];
const skipped = [];
const sections = [];

const bumpReason = (reason) => {
  stats.skippedReasons[reason] = (stats.skippedReasons[reason] || 0) + 1;
};

const readDirSorted = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.sort((a, b) => a.name.localeCompare(b.name, "vi", { sensitivity: "base" }));
};

const isBinaryBuffer = (buf) => {
  if (buf.length === 0) return false;
  let suspicious = 0;
  for (const byte of buf) {
    if (byte === 0) return true;
    if (byte < 7 || (byte > 13 && byte < 32) || byte === 127) {
      suspicious += 1;
    }
  }
  return suspicious / buf.length > 0.3;
};

const shouldSkipOutput = (relPosix) => {
  return relPosix === OUTPUT_MD || relPosix === OUTPUT_INDEX;
};

const addSkipped = (relPosix, sizeBytes, reason) => {
  stats.skippedFiles += 1;
  bumpReason(reason);
  skipped.push({ path: relPosix, sizeBytes, reason });
};

const addIncluded = (relPosix, sizeBytes, content) => {
  stats.includedFiles += 1;
  included.push({ path: relPosix, sizeBytes });
  sections.push(`## ${relPosix}`);
  sections.push("````text");
  sections.push(content);
  sections.push("````");
  sections.push("");
};

const walk = (dir, rel = "") => {
  const entries = readDirSorted(dir);
  for (const entry of entries) {
    const entryRel = path.join(rel, entry.name);
    const entryRelPosix = toPosix(entryRel);
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (isIgnoredDir(entry.name)) {
        ignored.dirs.push(entryRelPosix);
        continue;
      }
      walk(fullPath, entryRel);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    stats.scannedFiles += 1;
    if (shouldSkipOutput(entryRelPosix)) {
      addSkipped(entryRelPosix, 0, "file_output");
      continue;
    }

    let sizeBytes = 0;
    try {
      sizeBytes = fs.statSync(fullPath).size;
    } catch {
      addSkipped(entryRelPosix, 0, "read_error");
      continue;
    }

    if (sizeBytes > MAX_BYTES) {
      addSkipped(entryRelPosix, sizeBytes, "vuot_300kb");
      continue;
    }

    let buffer;
    try {
      buffer = fs.readFileSync(fullPath);
    } catch {
      addSkipped(entryRelPosix, sizeBytes, "read_error");
      continue;
    }

    if (isBinaryBuffer(buffer)) {
      addSkipped(entryRelPosix, sizeBytes, "nhi_phan");
      continue;
    }

    const content = buffer.toString("utf8").replace(/\r\n/g, "\n");
    addIncluded(entryRelPosix, sizeBytes, content);
  }
};

const writeOutputs = () => {
  const docDir = path.join(ROOT, "DOC");
  if (!fs.existsSync(docDir)) {
    fs.mkdirSync(docDir, { recursive: true });
  }

  const header = [
    "# REPO SNAPSHOT FULL",
    "",
    "- Tai lieu tu dong: tools/repo_textdump.mjs",
    `- Thoi diem: ${new Date().toISOString()}`,
    ""
  ];

  const content = header.concat(sections).join("\n");
  fs.writeFileSync(path.join(ROOT, OUTPUT_MD), content, "utf8");

  const indexData = {
    generatedBy: "tools/repo_textdump.mjs",
    root: ".",
    generatedAt: new Date().toISOString(),
    rules: {
      maxBytes: MAX_BYTES,
      ignoredDirs: Array.from(IGNORE_DIRS),
      skippedReasons: {
        file_output: "Bo qua file output cua dump",
        vuot_300kb: "Vuot 300KB",
        nhi_phan: "File nhi phan",
        read_error: "Loi doc file"
      }
    },
    stats,
    ignored,
    included,
    skipped
  };

  fs.writeFileSync(path.join(ROOT, OUTPUT_INDEX), JSON.stringify(indexData, null, 2), "utf8");
};

const main = () => {
  walk(ROOT);
  writeOutputs();
  console.log(`[full-dump] included=${stats.includedFiles} skipped=${stats.skippedFiles}`);
};

main();

````

## tools/tmp_utf8_test.txt
````text
﻿Th?i ?i?m

````

## tools/validate_threads.mjs
````text
import { readFile, writeFile } from "node:fs/promises";

const threadsPath = new URL("../threads.json", import.meta.url);
const cleanedPath = new URL("../threads.cleaned.json", import.meta.url);
const conflictsPath = new URL("../threads.conflicts.json", import.meta.url);

const normalizeKey = (value) => {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
};

const normalizeCode = (value) => {
  return (value || "")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, " ");
};

const normalizeHex = (hex) => {
  if (!hex || typeof hex !== "string") return null;
  let v = hex.trim().toLowerCase().replace(/^##/, "#");
  if (!v.startsWith("#")) v = "#" + v;
  return /^#[0-9a-f]{6}$/.test(v) ? v : null;
};

const hexToRgbArray = (hex) => {
  const num = parseInt(hex.slice(1), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const rgbToLab = ([r, g, b]) => {
  r /= 255; g /= 255; b /= 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  let y = (r * 0.2126 + g * 0.7152 + b * 0.0722);
  let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.cbrt(x) : (7.787 * x + 16 / 116);
  y = y > 0.008856 ? Math.cbrt(y) : (7.787 * y + 16 / 116);
  z = z > 0.008856 ? Math.cbrt(z) : (7.787 * z + 16 / 116);

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
};

const getScore = (record) => {
  const ratingScore = typeof record?.rating?.score === "number" ? record.rating.score : null;
  const voteScore = typeof record?.votes === "number" ? record.votes : null;
  const voteCount = typeof record?.voteCount === "number" ? record.voteCount : null;
  const confidence = typeof record?.confidence === "number" ? record.confidence : null;
  const base = ratingScore ?? voteScore ?? voteCount ?? confidence ?? 0;
  const verified = record?.source?.verified === true || record?.verified === true;
  return (verified ? 1000 : 0) + base;
};

export async function runValidation() {
  const raw = await readFile(threadsPath, "utf8");
  const data = JSON.parse(raw);
  const items = Array.isArray(data) ? data : [];
  const map = new Map();
  const conflicts = [];
  const cleaned = [];
  let deduped = 0;
  let computedLab = 0;
  let invalid = 0;

  for (const record of items) {
    const brand = typeof record?.brand === "string" ? record.brand.trim() : "";
    const code = typeof record?.code === "string" ? record.code.trim() : "";
    const hex = normalizeHex(record?.hex || "");
    if (!brand || !code || !hex) {
      invalid += 1;
      continue;
    }
    const brandKey = normalizeKey(brand);
    const codeKey = normalizeCode(code);
    const id = `${brandKey}:${codeKey}`;
    const existing = map.get(id);
    const withLab = Array.isArray(record?.lab) && record.lab.length === 3
      ? record.lab
      : rgbToLab(hexToRgbArray(hex));
    if (!record.lab || record.lab.length !== 3) computedLab += 1;
    const next = {
      ...record,
      brand,
      code,
      hex,
      lab: withLab,
      brandKey,
      codeKey,
      id
    };
    if (!existing) {
      map.set(id, { items: [next], hex });
      continue;
    }
    if (existing.hex !== hex) {
      existing.items.push(next);
      continue;
    }
    deduped += 1;
    existing.items.push(next);
  }

  for (const [id, group] of map.entries()) {
    const records = group.items;
    if (records.length === 1) {
      cleaned.push(records[0]);
      continue;
    }
    const uniqueHex = new Set(records.map(r => r.hex));
    if (uniqueHex.size > 1) {
      conflicts.push({ id, records });
      const sorted = [...records].sort((a, b) => getScore(b) - getScore(a));
      const picked = { ...sorted[0], needsReview: true };
      cleaned.push(picked);
      continue;
    }
    const sorted = [...records].sort((a, b) => getScore(b) - getScore(a));
    cleaned.push(sorted[0]);
    deduped += records.length - 1;
  }

  await writeFile(cleanedPath, JSON.stringify(cleaned, null, 2), "utf8");
  await writeFile(conflictsPath, JSON.stringify(conflicts, null, 2), "utf8");

  console.info("[validate_threads] total", items.length);
  console.info("[validate_threads] cleaned", cleaned.length);
  console.info("[validate_threads] invalid", invalid);
  console.info("[validate_threads] deduped", deduped);
  console.info("[validate_threads] conflicts", conflicts.length);
  console.info("[validate_threads] labComputed", computedLab);

  return { cleaned, conflicts, stats: { total: items.length, invalid, deduped, computedLab } };
}

if (import.meta.url === new URL(process.argv[1], "file:").href) {
  runValidation().catch((err) => {
    console.error("[validate_threads] failed", err);
    process.exit(1);
  });
}

````

## workers/thread_search.worker.js
````text
let threads = [];
let labCache = new Map();
let threadsByBrand = new Map();

function isVerifiedThread(thread) {
  const conf = typeof thread?.confidence === "number" ? thread.confidence : 0;
  return conf >= 0.85 || thread?.source?.type === "CROWD_VERIFIED";
}

function buildIndexes(list) {
  const byBrand = new Map();
  list.forEach((thread) => {
    if (!thread || !thread.brand) return;
    if (!byBrand.has(thread.brand)) byBrand.set(thread.brand, []);
    byBrand.get(thread.brand).push(thread);
  });
  threadsByBrand = byBrand;
}

function addTopK(list, item, limit) {
  if (list.length < limit) {
    list.push(item);
    return;
  }
  let worstIndex = 0;
  let worst = list[0].delta;
  for (let i = 1; i < list.length; i += 1) {
    if (list[i].delta > worst) {
      worst = list[i].delta;
      worstIndex = i;
    }
  }
  if (item.delta < worst) list[worstIndex] = item;
}

function normalizeHex(hex) {
  if (!hex || typeof hex !== "string") return null;
  let v = hex.trim().toLowerCase().replace(/^##/, "#");
  if (!v.startsWith("#")) v = "#" + v;
  return /^#[0-9a-f]{6}$/.test(v) ? v : null;
}

function hexToRgbArray(hex) {
  const num = parseInt(hex.slice(1), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToLab([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  let y = (r * 0.2126 + g * 0.7152 + b * 0.0722);
  let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.cbrt(x) : (7.787 * x + 16 / 116);
  y = y > 0.008856 ? Math.cbrt(y) : (7.787 * y + 16 / 116);
  z = z > 0.008856 ? Math.cbrt(z) : (7.787 * z + 16 / 116);

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

function getLabForHex(hex) {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  const cached = labCache.get(normalized);
  if (cached) return cached;
  const lab = rgbToLab(hexToRgbArray(normalized));
  labCache.set(normalized, lab);
  return lab;
}

function deltaE76(lab1, lab2) {
  return Math.sqrt(
    (lab1[0] - lab2[0]) ** 2 +
    (lab1[1] - lab2[1]) ** 2 +
    (lab1[2] - lab2[2]) ** 2
  );
}

function deltaE2000(lab1, lab2) {
  const [l1, a1, b1] = lab1;
  const [l2, a2, b2] = lab2;
  const avgL = (l1 + l2) / 2;
  const c1 = Math.sqrt(a1 * a1 + b1 * b1);
  const c2 = Math.sqrt(a2 * a2 + b2 * b2);
  const avgC = (c1 + c2) / 2;
  const g = 0.5 * (1 - Math.sqrt(Math.pow(avgC, 7) / (Math.pow(avgC, 7) + Math.pow(25, 7))));
  const a1p = (1 + g) * a1;
  const a2p = (1 + g) * a2;
  const c1p = Math.sqrt(a1p * a1p + b1 * b1);
  const c2p = Math.sqrt(a2p * a2p + b2 * b2);
  const avgCp = (c1p + c2p) / 2;
  const h1p = Math.atan2(b1, a1p) >= 0 ? Math.atan2(b1, a1p) : Math.atan2(b1, a1p) + 2 * Math.PI;
  const h2p = Math.atan2(b2, a2p) >= 0 ? Math.atan2(b2, a2p) : Math.atan2(b2, a2p) + 2 * Math.PI;
  let deltahp = h2p - h1p;
  if (Math.abs(deltahp) > Math.PI) {
    deltahp -= Math.sign(deltahp) * 2 * Math.PI;
  }
  const deltaLp = l2 - l1;
  const deltaCp = c2p - c1p;
  const deltaHp = 2 * Math.sqrt(c1p * c2p) * Math.sin(deltahp / 2);
  const avgLp = (l1 + l2) / 2;
  let avghp = h1p + h2p;
  if (Math.abs(h1p - h2p) > Math.PI) {
    avghp += 2 * Math.PI;
  }
  avghp /= 2;
  const t = 1
    - 0.17 * Math.cos(avghp - Math.PI / 6)
    + 0.24 * Math.cos(2 * avghp)
    + 0.32 * Math.cos(3 * avghp + Math.PI / 30)
    - 0.20 * Math.cos(4 * avghp - 7 * Math.PI / 18);
  const deltaTheta = (30 * Math.PI / 180) * Math.exp(-((((avghp * 180 / Math.PI) - 275) / 25) ** 2));
  const rc = 2 * Math.sqrt(Math.pow(avgCp, 7) / (Math.pow(avgCp, 7) + Math.pow(25, 7)));
  const sl = 1 + (0.015 * ((avgLp - 50) ** 2)) / Math.sqrt(20 + ((avgLp - 50) ** 2));
  const sc = 1 + 0.045 * avgCp;
  const sh = 1 + 0.015 * avgCp * t;
  const rt = -Math.sin(2 * deltaTheta) * rc;
  return Math.sqrt(
    (deltaLp / sl) ** 2 +
    (deltaCp / sc) ** 2 +
    (deltaHp / sh) ** 2 +
    rt * (deltaCp / sc) * (deltaHp / sh)
  );
}

function getDelta(lab1, lab2, method) {
  return method === "2000" ? deltaE2000(lab1, lab2) : deltaE76(lab1, lab2);
}

self.onmessage = (event) => {
  const data = event.data || {};
  if (data.type === "init") {
    threads = Array.isArray(data.threads) ? data.threads : [];
    labCache = new Map();
    buildIndexes(threads);
    self.postMessage({ type: "ready" });
    return;
  }
  if (data.type !== "search") return;
  const { id, payload } = data;
  try {
    const start = Date.now();
    const targetHex = normalizeHex(payload.targetHex);
    const targetLab = payload.targetLab || (targetHex ? getLabForHex(targetHex) : null);
    if (!targetLab) {
      self.postMessage({ id, results: [], stats: { ms: 0 } });
      return;
    }
    const brands = Array.isArray(payload.brands) ? payload.brands : [];
    const requireVerified = !!payload.verifiedOnly;
    const method = payload.method === "2000" ? "2000" : "76";
    const limit = typeof payload.limit === "number" ? payload.limit : 100;
    const lists = brands.length ? brands.map(brand => threadsByBrand.get(brand) || []) : [threads];
    if (method === "2000") {
      const candidateCount = Math.max(limit * 20, 200);
      const candidates = [];
      for (const list of lists) {
        for (const t of list) {
          if (requireVerified && !isVerifiedThread(t)) continue;
          const lab = t.lab && Array.isArray(t.lab) && t.lab.length === 3 ? t.lab : getLabForHex(t.hex);
          if (!lab) continue;
          const deltaFast = deltaE76(targetLab, lab);
          addTopK(candidates, { thread: t, lab, delta: deltaFast }, candidateCount);
        }
      }
      const results = [];
      for (const candidate of candidates) {
        const delta = deltaE2000(targetLab, candidate.lab);
        addTopK(results, {
          hex: candidate.thread.hex,
          brand: candidate.thread.brand,
          code: candidate.thread.code,
          name: candidate.thread.name,
          source: candidate.thread.source,
          confidence: candidate.thread.confidence,
          lab: candidate.lab,
          delta
        }, limit);
      }
      results.sort((a, b) => a.delta - b.delta);
      const stats = { ms: Date.now() - start, total: candidates.length };
      self.postMessage({ id, results, stats });
      return;
    }

    const results = [];
    for (const list of lists) {
      for (const t of list) {
        if (requireVerified && !isVerifiedThread(t)) continue;
        const lab = t.lab && Array.isArray(t.lab) && t.lab.length === 3 ? t.lab : getLabForHex(t.hex);
        if (!lab) continue;
        const delta = deltaE76(targetLab, lab);
        addTopK(results, {
          hex: t.hex,
          brand: t.brand,
          code: t.code,
          name: t.name,
          source: t.source,
          confidence: t.confidence,
          lab,
          delta
        }, limit);
      }
    }
    results.sort((a, b) => a.delta - b.delta);
    const stats = { ms: Date.now() - start, total: results.length };
    self.postMessage({ id, results, stats });
  } catch (err) {
    self.postMessage({ id, error: err?.message || "worker-search-failed" });
  }
};

````

## worlds/palette.html
````text
<!DOCTYPE html>
<html lang="vi" data-world="origami">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Th&#7871; gi&#7899;i d&#7843;i m&#224;u</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root{
      --z-topbar: 2000;
      --z-topbar-menu: 4000;
      --bg: #f6f1e9;
      --text: #201a14;
      --muted: #6b5d4b;
      --glass: rgba(255, 255, 255, 0.72);
      --stroke: rgba(32, 26, 20, 0.10);
      --a1: #c27b4b;
      --a2: #d59e6d;
      --a3: #8c6d54;
    }
    html[data-world="nebula"]{
      --bg:#040512;
      --text:#eef2ff;
      --muted:#b8c2ff;
      --glass:rgba(12,16,34,0.72);
      --stroke:rgba(255,255,255,0.14);
      --a1:#6ee7ff;
      --a2:#8b5cf6;
      --a3:#f472b6;
    }
    html[data-world="ocean"]{
      --bg:#dff6ff;
      --text:#062a3a;
      --muted:#3f6b7f;
      --glass:rgba(255,255,255,0.76);
      --stroke:rgba(6,42,58,0.12);
      --a1:#1fb6ff;
      --a2:#0ea5a8;
      --a3:#4dd4ff;
    }
    html[data-world="ink"]{
      --bg:#0b0d12;
      --text:#f4f6fb;
      --muted:#a6afbd;
      --glass:rgba(16,18,24,0.76);
      --stroke:rgba(255,255,255,0.12);
      --a1:#e2e8f0;
      --a2:#94a3b8;
      --a3:#64748b;
    }
    html[data-world="origami"]{
      --bg:#f6f1e9;
      --text:#201a14;
      --muted:#6b5d4b;
      --glass:rgba(255,255,255,0.74);
      --stroke:rgba(32,26,20,0.10);
      --a1:#c27b4b;
      --a2:#d59e6d;
      --a3:#8c6d54;
    }
    html[data-world="arcade"]{
      --bg:#05040f;
      --text:#fff7ff;
      --muted:#d8c9f6;
      --glass:rgba(14,12,28,0.80);
      --stroke:rgba(255,255,255,0.16);
      --a1:#ff3dcd;
      --a2:#7c3aed;
      --a3:#20e3b2;
    }
    html[data-world="dunes"]{
      --bg:#f7f0e1;
      --text:#3a2d1a;
      --muted:#7a644a;
      --glass:rgba(255,255,255,0.74);
      --stroke:rgba(58,45,26,0.12);
      --a1:#d39b54;
      --a2:#e3b87b;
      --a3:#b3743d;
    }
    html[data-world="chrome"]{
      --bg:#f1f4f8;
      --text:#1c232b;
      --muted:#5f6b79;
      --glass:rgba(255,255,255,0.72);
      --stroke:rgba(28,35,43,0.12);
      --a1:#3b82f6;
      --a2:#94a3b8;
      --a3:#0f172a;
    }
    html[data-world="circuit"]{
      --bg:#04110a;
      --text:#eafff2;
      --muted:#a6d6bb;
      --glass:rgba(8,20,14,0.76);
      --stroke:rgba(255,255,255,0.12);
      --a1:#22c55e;
      --a2:#16a34a;
      --a3:#86efac;
    }
    body{
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .tc-topbar{
      background: var(--glass);
      border-bottom: 1px solid var(--stroke);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.08);
      position: sticky;
      top: 0;
      z-index: var(--z-topbar);
      overflow: visible;
    }
    .tc-topbar::after{
      content:"";
      position:absolute; left:0; right:0; bottom:-1px; height:1px;
      background: linear-gradient(90deg, var(--a1), var(--a2), var(--a3));
      opacity: .35;
    }
    .tc-chip{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
    }
    .tc-btn{
      border-radius: 0.75rem;
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      font-weight: 600;
      letter-spacing: -0.005em;
      line-height: 1;
    }
    .tc-btn:hover{ filter: brightness(1.03); }
    .tc-btn:active{ transform: translateY(1px); }
    .tc-btn:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    .tc-btn-primary{
      background: linear-gradient(135deg, var(--a1), var(--a2));
      color: #fff;
      border: 1px solid rgba(255,255,255,.18);
    }
    .tc-btn-primary:hover{ filter: brightness(1.06); }
    .tc-dot{
      width: 10px; height: 10px; border-radius: 999px;
      background: linear-gradient(135deg, var(--a1), var(--a2), var(--a3));
      box-shadow: 0 0 0 2px rgba(255,255,255,.5);
    }
    .tc-card{
      background: var(--glass);
      border: 1px solid var(--stroke);
      border-radius: 1.25rem;
      box-shadow: 0 24px 60px rgba(0,0,0,0.12);
    }
    .tc-muted{ color: var(--muted); }
    #portalMenu[data-open="0"],
    #worldMenu[data-open="0"]{ display: none; }
    #portalMenu,
    #worldMenu{
      z-index: var(--z-topbar-menu);
    }
    .tc-menu-item{
      color: var(--text);
      transition: background-color .15s ease, transform .05s ease;
    }
    .tc-menu-item:hover{ background: rgba(255,255,255,.10); }
    .tc-menu-item:active{ transform: translateY(1px); }
    .tc-menu-item:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
      background: rgba(255,255,255,.08);
    }
      #worldMenu .tc-world-item{
        color: var(--text);
        transition: background-color .15s ease, transform .05s ease;
      }
      #worldMenu .tc-world-item:hover{ background: rgba(255,255,255,.10); }
      #worldMenu .tc-world-item:active{ transform: translateY(1px); }
      @media (max-width: 520px) {
        .tc-topbar > .max-w-6xl {
          flex-wrap: wrap;
          row-gap: 8px;
          column-gap: 8px;
        }
        .tc-topbar > .max-w-6xl > :nth-child(1) {
          order: 1;
          min-width: 0;
        }
        .tc-topbar > .max-w-6xl > :nth-child(2) {
          order: 3;
          flex: 1 1 100%;
          min-width: 0;
        }
        .tc-topbar > .max-w-6xl > :nth-child(3) {
          order: 2;
          margin-left: auto;
        }
        .tc-topbar #portalSwitcher,
        .tc-topbar #portalBtn {
          width: 100%;
          max-width: 100%;
        }
        .tc-topbar [data-i18n="topbar.slogan"] {
          display: none;
        }
        .tc-topbar .tc-brand {
          max-width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        #topbarAuthSlot #userName {
          display: none;
        }
        .tc-topbar a,
        .tc-topbar button {
          min-height: 40px;
        }
      }
    </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    html, body, button, input, select, textarea {
      font-family: "Inter", "Noto Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
    }
  </style></head>
<body class="font-sans">
  <header class="tc-topbar relative">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
      <div class="flex items-center gap-3 min-w-0">
        <a href="../index.html" class="flex items-center gap-3 min-w-0">
          <span class="h-11 w-11 md:h-12 md:w-12 rounded-xl shrink-0 flex items-center justify-center bg-white/5 ring-1 ring-white/10">
            <picture>
              <source srcset="../assets/spacecolors-mark.svg" type="image/svg+xml">
              <img
                src="../assets/spacecolors-mark-128.png"
                srcset="../assets/spacecolors-mark-128.png 1x, ../assets/spacecolors-mark-256.png 2x"
                class="h-full w-full object-contain select-none"
                alt="SpaceColors"
                decoding="async"
                loading="eager"
              />
            </picture>
          </span>
          <span class="min-w-0 flex flex-col justify-center leading-tight">
            <span class="tc-brand text-base md:text-lg whitespace-nowrap">SpaceColors &#183; 8Portal</span>
            <span class="tc-muted text-[11px] md:text-xs truncate max-w-[240px] md:max-w-[360px]">M&#7897;t ch&#7841;m m&#7903; kh&#244;ng gian m&#224;u v&#244; h&#7841;n</span>
          </span>
        </a>
      </div>
      <div class="flex-1 flex items-center justify-center">
        <div class="relative" id="portalSwitcher">
          <button id="portalBtn" class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[210px] justify-between" aria-expanded="false" aria-haspopup="menu" aria-controls="portalMenu">
            Ch&#7885;n Th&#7871; gi&#7899;i
          </button>
          <div id="portalMenu" data-open="0" role="menu" class="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./threadcolor.html" role="menuitem">Th&#7871; gi&#7899;i m&#224;u th&#234;u</a>
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./palette.html" role="menuitem">Th&#7871; gi&#7899;i d&#7843;i m&#224;u</a>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="relative" id="worldSwitcher">
          <button id="worldBtn" class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[150px] justify-between" aria-expanded="false" aria-haspopup="menu" aria-controls="worldMenu">
            <span class="flex items-center gap-2">
              <span class="tc-dot" aria-hidden="true"></span>
              <span id="worldLabel">Origami</span>
            </span>
            <span aria-hidden="true">&#9662;</span>
          </button>
          <div id="worldMenu" data-open="0" role="menu" class="absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="nebula" role="menuitem">Tinh v&#226;n</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="ocean" role="menuitem">&#272;&#7841;i d&#432;&#417;ng</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="ink" role="menuitem">M&#7921;c t&#224;u</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="origami" role="menuitem">Origami</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="arcade" role="menuitem">Arcade</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="dunes" role="menuitem">&#272;&#7891;i c&#225;t</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="chrome" role="menuitem">Chrome</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="circuit" role="menuitem">M&#7841;ch &#273;i&#7879;n</button>
          </div>
        </div>
        <div id="topbarAuthSlot" data-auth-slot="topbar" class="flex items-center justify-end min-w-[210px]"></div>
      </div>
    </div>
  </header>

  <main class="mx-auto max-w-3xl px-4 pt-10 pb-16">
    <div class="tc-card p-8 text-center">
      <h1 class="text-3xl font-bold">Th&#7871; gi&#7899;i d&#7843;i m&#224;u</h1>
      <p class="mt-3 tc-muted">Kh&#244;ng gian n&#224;y &#273;ang &#273;&#432;&#7907;c ho&#224;n thi&#7879;n. Quay l&#7841;i sau nh&#233;.</p>
      <a class="mt-6 inline-flex tc-btn tc-chip px-4 py-2 text-sm font-semibold" href="./threadcolor.html">&#8592; V&#7873; Th&#7871; gi&#7899;i m&#224;u th&#234;u</a>
    </div>
  </main>

  <script type="module" src="../auth.js"></script>
  <script>
    (() => {
      const portalBtn = document.getElementById("portalBtn");
      const portalMenu = document.getElementById("portalMenu");
      if (!portalBtn || !portalMenu) return;
      const setOpen = (open) => {
        portalMenu.dataset.open = open ? "1" : "0";
        portalMenu.hidden = !open;
        portalBtn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      setOpen(portalMenu.dataset.open === "1");
      portalBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        setOpen(portalMenu.dataset.open !== "1");
      });
      portalMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-menu-item");
        if (!item || !portalMenu.contains(item)) return;
        setOpen(false);
      });
      document.addEventListener("click", (event) => {
        if (!portalMenu.contains(event.target) && !portalBtn.contains(event.target)) {
          setOpen(false);
        }
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
      });
    })();
  </script>
  <script>
    (() => {
      const worldBtn = document.getElementById("worldBtn");
      const worldMenu = document.getElementById("worldMenu");
      const switcher = document.getElementById("worldSwitcher");
      if (!worldBtn || !worldMenu || !switcher) return;
      const worlds = ["nebula","ocean","ink","origami","arcade","dunes","chrome","circuit"];
      const labels = {
        nebula: "Tinh v\u00e2n",
        ocean: "\u0110\u1ea1i d\u01b0\u01a1ng",
        ink: "M\u1ef1c t\u00e0u",
        origami: "Origami",
        arcade: "Arcade",
        dunes: "\u0110\u1ed3i c\u00e1t",
        chrome: "Chrome",
        circuit: "M\u1ea1ch \u0111i\u1ec7n"
      };
      const storageKey = "tc_world";
      const defaultWorld = "origami";
      const labelEl = document.getElementById("worldLabel");
      const setMenuOpen = (open) => {
        worldMenu.dataset.open = open ? "1" : "0";
        worldMenu.hidden = !open;
        worldBtn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      const applyWorld = (nextKey) => {
        const next = worlds.includes(nextKey) ? nextKey : defaultWorld;
        document.documentElement.setAttribute("data-world", next);
        try { localStorage.setItem(storageKey, next); } catch (e) {}
        if (labelEl) labelEl.textContent = labels[next] || "Origami";
      };
      try {
        const stored = localStorage.getItem(storageKey);
        applyWorld(stored || document.documentElement.dataset.world || defaultWorld);
      } catch (e) {
        applyWorld(document.documentElement.dataset.world || defaultWorld);
      }
      setMenuOpen(false);
      worldBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        setMenuOpen(worldMenu.dataset.open !== "1");
      });
      worldMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-world-item");
        if (!item || !worldMenu.contains(item)) return;
        applyWorld(item.getAttribute("data-world"));
        setMenuOpen(false);
        worldBtn.focus();
      });
      document.addEventListener("click", (event) => {
        if (!switcher.contains(event.target)) setMenuOpen(false);
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          setMenuOpen(false);
          worldBtn.focus();
        }
      });
    })();
  </script>
</body>
</html>

````

## worlds/threadcolor.html
````text
<!DOCTYPE html>
<html lang="vi" data-world="origami">
<head>
  <meta charset="utf-8">
  <title>Tra mã chỉ thêu theo màu</title>
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --bg: #f6f1e9;
      --text: #201a14;
      --muted: #6b5d4b;
      --glass: rgba(255, 255, 255, 0.72);
      --stroke: rgba(32, 26, 20, 0.08);
      --a1: #c27b4b;
      --a2: #d59e6d;
      --a3: #8c6d54;
    }
    html[data-world="nebula"] {
      --bg: #0c1123;
      --text: #eef2ff;
      --muted: #b6bfe3;
      --glass: rgba(18, 26, 48, 0.72);
      --stroke: rgba(255, 255, 255, 0.12);
      --a1: #6ee7ff;
      --a2: #8b5cf6;
      --a3: #f472b6;
    }
    html[data-world="ocean"] {
      --bg: #e7f6ff;
      --text: #0b2b3a;
      --muted: #4b6b7b;
      --glass: rgba(255, 255, 255, 0.7);
      --stroke: rgba(11, 43, 58, 0.12);
      --a1: #1fb6ff;
      --a2: #0ea5a8;
      --a3: #4dd4ff;
    }
    html[data-world="ink"] {
      --bg: #0f1115;
      --text: #f4f4f6;
      --muted: #9aa0a9;
      --glass: rgba(24, 26, 31, 0.72);
      --stroke: rgba(255, 255, 255, 0.1);
      --a1: #e2e8f0;
      --a2: #94a3b8;
      --a3: #64748b;
    }
    html[data-world="origami"] {
      --bg: #f6f1e9;
      --text: #201a14;
      --muted: #6b5d4b;
      --glass: rgba(255, 255, 255, 0.72);
      --stroke: rgba(32, 26, 20, 0.08);
      --a1: #c27b4b;
      --a2: #d59e6d;
      --a3: #8c6d54;
    }
    html[data-world="arcade"] {
      --bg: #0b0b14;
      --text: #fef7ff;
      --muted: #c9b9e8;
      --glass: rgba(20, 18, 36, 0.78);
      --stroke: rgba(255, 255, 255, 0.14);
      --a1: #ff3dcd;
      --a2: #7c3aed;
      --a3: #20e3b2;
    }
    html[data-world="dunes"] {
      --bg: #f7f0e1;
      --text: #3a2d1a;
      --muted: #7a644a;
      --glass: rgba(255, 255, 255, 0.7);
      --stroke: rgba(58, 45, 26, 0.12);
      --a1: #d39b54;
      --a2: #e3b87b;
      --a3: #b3743d;
    }
    html[data-world="chrome"] {
      --bg: #f1f4f8;
      --text: #1c232b;
      --muted: #5f6b79;
      --glass: rgba(255, 255, 255, 0.68);
      --stroke: rgba(28, 35, 43, 0.12);
      --a1: #3b82f6;
      --a2: #94a3b8;
      --a3: #0f172a;
    }
    html[data-world="circuit"] {
      --bg: #0b1410;
      --text: #e9fff3;
      --muted: #9ec4ad;
      --glass: rgba(12, 24, 18, 0.72);
      --stroke: rgba(255, 255, 255, 0.12);
      --a1: #22c55e;
      --a2: #16a34a;
      --a3: #86efac;
    }
    body {
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .animate-fade-in-up {
      animation: fade-in-up 0.25s ease forwards;
    }
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .tc-topbar {
      background: var(--glass);
      border-bottom: 1px solid var(--stroke);
      backdrop-filter: blur(14px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
      transition: box-shadow .2s ease, backdrop-filter .2s ease, background-color .2s ease;
      will-change: box-shadow, backdrop-filter;
      z-index: var(--z-topbar, 2000) !important;
      overflow: visible;
    }
    .tc-brand {
      font-weight: 700;
      letter-spacing: 0.04em;
      color: var(--text);
    }
    .tc-topbar .tc-brand {
      letter-spacing: -0.01em;
      text-shadow: 0 1px 0 rgba(255,255,255,.15);
    }
    .tc-nav a {
      color: var(--muted);
    }
    .tc-nav a:hover {
      color: var(--text);
    }
    .tc-card {
      background: var(--glass);
      border: 1px solid var(--stroke);
      backdrop-filter: blur(16px);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
    }
    #worldMenu[data-open="0"] {
      display: none;
    }
    #worldMenu[data-open="1"] {
      display: block;
    }
    .tc-menu[data-open="0"] {
      display: none;
    }
    .tc-menu[data-open="1"] {
      display: block;
    }
    .tc-menu {
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
    }
    .tc-menu-item {
      color: var(--text);
      transition: background-color .15s ease, transform .05s ease;
    }
    .tc-menu-item:hover {
      background: rgba(255,255,255,.10);
    }
    .tc-menu-item:active {
      transform: translateY(1px);
    }
    .tc-menu-item:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
      background: rgba(255,255,255,.08);
    }
    .tc-world-item.is-active {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
      color: var(--text);
    }
    #worldMenu .tc-world-item {
      position: relative;
      color: var(--text);
      padding-top: 0.6rem;
      padding-bottom: 0.6rem;
      transition: background-color .15s ease, transform .05s ease;
    }
    #worldMenu {
      border: 1px solid var(--stroke);
    }
    #worldMenu .tc-world-item.is-active::before {
      content: "";
      position: absolute;
      left: 8px;
      top: 8px;
      bottom: 8px;
      width: 3px;
      border-radius: 999px;
      background: linear-gradient(180deg, var(--a1), var(--a2), var(--a3));
      opacity: .95;
    }
    #worldMenu .tc-world-item.is-active::after {
      content: "\2713";
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-weight: 800;
      font-size: 12px;
      color: var(--text);
      opacity: .85;
    }
    #worldMenu .tc-world-item.is-active {
      padding-left: 1.1rem;
      padding-right: 1.6rem;
    }
    #worldMenu .tc-world-item:hover {
      background: rgba(255,255,255,.10);
    }
    #worldMenu .tc-world-item:active {
      transform: translateY(1px);
    }
    #worldMenu .tc-world-item:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
      background: rgba(255,255,255,.08);
    }
    #worldMenu .tc-world-item + .tc-world-item {
      border-top: 1px solid var(--stroke);
    }
    #accountMenu {
      border: 1px solid var(--stroke);
    }
    #accountMenu .tc-account-header {
      border-bottom: 1px solid var(--stroke);
    }
    #accountMenu .tc-account-email {
      color: var(--muted);
    }
    #accountMenu .tc-account-actions {
      display: flex;
      flex-direction: column;
      gap: .25rem;
    }
    #accountMenu button {
      color: var(--text);
      padding: 0.6rem 0.75rem;
      line-height: 1.1;
      transition: background-color .15s ease, transform .05s ease;
    }
    #accountMenu button:hover {
      background: rgba(255,255,255,.10);
    }
    #accountMenu button:active {
      transform: translateY(1px);
    }
    #accountMenu button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
      background: rgba(255,255,255,.08);
    }
    #accountMenu button + button {
      border-top: 1px solid var(--stroke);
      opacity: 1;
    }
    #pinPanel .pin-item{
      background: var(--glass);
      border: 1px solid var(--stroke);
      border-radius: 0.9rem;
      padding: 0.6rem;
    }
    #pinPanel .pin-swatch{
      width: 32px;
      height: 32px;
      border-radius: 0.6rem;
      border: 1px solid var(--stroke);
    }
    #pinPanel .pin-actions button{
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      border-radius: 0.75rem;
      padding: 0.25rem 0.5rem;
      font-size: 12px;
    }
    #pinPanel .pin-actions button:hover{ filter: brightness(1.03); }
    #pinPanel .pin-actions button:active{ transform: translateY(1px); }
    #pinPanel .pin-actions button:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    /* --- Topbar UI tokens (8portal-ready) --- */
    .tc-topbar { position: sticky; top: 0; }
    .tc-topbar::after{
      content:"";
      position:absolute; left:0; right:0; bottom:-1px; height:1px;
      background: linear-gradient(90deg, var(--a1), var(--a2), var(--a3));
      opacity: .35;
    }
    .tc-topbar.is-scrolled {
      box-shadow: 0 18px 50px rgba(0,0,0,.18);
    }
    .tc-topbar.is-scrolled::after{
      opacity: .55;
    }
    @media (prefers-reduced-motion: reduce) {
      .tc-topbar {
        transition: none;
      }
    }
    .tc-chip{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
    }
    .tc-chip:hover{ filter: brightness(1.03); }
    .tc-btn{
      border-radius: 0.75rem;
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      font-weight: 650;
      letter-spacing: -0.005em;
      line-height: 1;
    }
    .tc-btn:hover{ filter: brightness(1.03); }
    .tc-btn:active{ transform: translateY(1px); }
    .tc-btn:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    .tc-btn-primary{
      background: linear-gradient(135deg, var(--a1), var(--a2));
      color: #fff;
      border: 1px solid rgba(255,255,255,.18);
    }
    .tc-btn-primary:hover{ filter: brightness(1.06); }
    .tc-dot{
      width: 10px; height: 10px; border-radius: 999px;
      background: linear-gradient(135deg, var(--a1), var(--a2), var(--a3));
      box-shadow: 0 0 0 2px rgba(255,255,255,.5);
    }
    .tc-muted { color: var(--muted); }
    .tc-gradient-text{
      background: linear-gradient(135deg, var(--a1), var(--a2), var(--a3));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .tc-field{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: 0.9rem;
      padding: 0.6rem 0.75rem;
      outline: none;
    }
    .tc-field:focus-visible{
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    .tc-color{
      background: var(--glass);
      border: 1px solid var(--stroke);
      border-radius: 0.9rem;
      padding: 0.15rem;
      width: 4rem;
      height: 2.5rem;
    }
    .tc-check{
      accent-color: var(--a1);
    }
    .tc-range{
      accent-color: var(--a1);
    }
    main h3 { color: var(--text); }
    main .tc-helper { color: var(--muted); }
    #result {
      border: 1px solid var(--stroke);
    }
    #brandFilters label{
      display: inline-flex;
      align-items: center;
      gap: .5rem;
      cursor: pointer;
      user-select: none;
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: 999px;
      padding: 0.45rem 0.7rem;
    }
    #brandFilters label:hover{ filter: brightness(1.03); }
    #brandFilters input[type="checkbox"] { accent-color: var(--a1); }
    /* --- Result UI (tokenized, premium) --- */
    #result .result-item{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      box-shadow: 0 12px 30px rgba(0,0,0,.08);
      transition: transform .12s ease, box-shadow .18s ease, border-color .18s ease, filter .18s ease;
    }
    #result .result-item:hover{
      transform: translateY(-1px) !important;
      box-shadow: 0 18px 50px rgba(0,0,0,.16);
      filter: brightness(1.02);
    }
    #result .result-item:active{
      transform: translateY(1px) !important;
    }
    #result .result-item[data-selected="true"]{
      border-color: var(--a1);
      box-shadow: 0 18px 55px rgba(0,0,0,.20);
    }
    #result .result-item:focus-visible{
      outline: none;
      box-shadow:
        0 0 0 3px rgba(0,0,0,.12),
        0 0 0 6px var(--a1),
        0 18px 55px rgba(0,0,0,.18);
    }
    #result .text-gray-700{ color: var(--text); }
    #result .text-gray-600,
    #result .text-gray-500,
    #result .text-gray-400{ color: var(--muted); }
    #result .result-item .border{
      border-color: var(--stroke);
    }
    /* Save button inside result cards */
    #result .btn-save{
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      border-radius: 0.75rem;
      font-weight: 650;
      letter-spacing: -0.005em;
      transition: filter .15s ease, transform .05s ease, box-shadow .15s ease;
    }
    #result .btn-save:hover{ filter: brightness(1.03); }
    #result .btn-save:active{ transform: translateY(1px); }
    #result .btn-save:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    #result .btn-save:disabled{
      opacity: .6;
      cursor: not-allowed;
      filter: none;
      transform: none;
    }
    /* Reduce motion */
    @media (prefers-reduced-motion: reduce){
      #result .result-item,
      #result .btn-save { transition: none; }
    }
    /* --- Auth modal (tokenized) --- */
    #authOverlay{
      background: rgba(0,0,0,.45);
      -webkit-backdrop-filter: blur(2px);
      backdrop-filter: blur(2px);
    }
    #authModal{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: 1.25rem;
      box-shadow: 0 22px 70px rgba(0,0,0,.28);
    }
    #authClose{
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      border-radius: .75rem;
    }
    #authClose:hover{ filter: brightness(1.03); }
    #authClose:active{ transform: translateY(1px); }
    #authClose:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    #authModal input{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: .9rem;
    }
    #authModal input::placeholder{ color: var(--muted); opacity: .85; }
    #authModal input:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    #tabLogin, #tabRegister{
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      border-radius: .9rem;
    }
    #tabLogin:hover, #tabRegister:hover{ filter: brightness(1.03); }
    #tabLogin.bg-indigo-50, #tabRegister.bg-indigo-50{
      background: linear-gradient(135deg, var(--a1), var(--a2));
      border-color: rgba(255,255,255,.18);
    }
    #tabLogin.text-indigo-700, #tabRegister.text-indigo-700{
      color: #fff !important;
    }
    #btnLogin, #btnRegister{
      background: linear-gradient(135deg, var(--a1), var(--a2));
      color: #fff;
      border: 1px solid rgba(255,255,255,.18);
      border-radius: .9rem;
    }
    #btnLogin:hover, #btnRegister:hover{ filter: brightness(1.06); }
    #btnLogin:active, #btnRegister:active{ transform: translateY(1px); }
    #btnLogin:focus-visible, #btnRegister:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    #btnGoogle, #btnFacebook{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: .9rem;
    }
    #btnGoogle:hover, #btnFacebook:hover{ filter: brightness(1.03); }
    #btnGoogle:active, #btnFacebook:active{ transform: translateY(1px); }
    #btnGoogle:focus-visible, #btnFacebook:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    #btnForgot{
      color: var(--muted);
    }
    #btnForgot:hover{ filter: brightness(1.08); }
    #authError{
      color: #ef4444;
      background: rgba(239,68,68,.10);
      border: 1px solid rgba(239,68,68,.22);
      border-radius: .9rem;
    }
    @media (prefers-reduced-motion: reduce){
      #authModal *{ transition: none !important; }
    }
    /* --- Library modal (tokenized) --- */
    #libraryOverlay{
      background: rgba(0,0,0,.45);
      -webkit-backdrop-filter: blur(2px);
      backdrop-filter: blur(2px);
    }
    #libraryModal > div{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: 1.25rem;
      box-shadow: 0 22px 70px rgba(0,0,0,.28);
    }
    #libraryClose{
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      border-radius: .75rem;
    }
    #libraryClose:hover{ filter: brightness(1.03); }
    #libraryClose:active{ transform: translateY(1px); }
    #libraryClose:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    #libraryList > div{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: 0.9rem;
      box-shadow: 0 12px 30px rgba(0,0,0,.08);
      transition: transform .12s ease, box-shadow .18s ease, border-color .18s ease, filter .18s ease;
    }
    #libraryList > div:hover{
      transform: translateY(-1px);
      box-shadow: 0 18px 50px rgba(0,0,0,.16);
      filter: brightness(1.02);
    }
    #libraryList .text-gray-500{ color: var(--muted); }
    #libraryList .text-gray-800{ color: var(--text); }
    #libraryList .text-gray-500.text-xs{ color: var(--muted); }
    #libraryList button{
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      border-radius: 0.75rem;
      font-weight: 650;
      letter-spacing: -0.005em;
      transition: filter .15s ease, transform .05s ease, box-shadow .15s ease;
    }
    #libraryList button:hover{ filter: brightness(1.03); }
    #libraryList button:active{ transform: translateY(1px); }
    #libraryList button:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    #libraryList .text-red-600{
      color: #ef4444;
      background: rgba(239,68,68,.10);
      border: 1px solid rgba(239,68,68,.22);
      border-radius: .9rem;
      padding: .75rem;
    }
    @media (prefers-reduced-motion: reduce){
      #libraryModal *{ transition: none !important; }
    }
    #accountMenu button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
      background: rgba(255,255,255,.08);
    }
    .w1-actionbar {
      position: sticky;
      top: var(--tc-topbar-h, 64px);
      overflow: visible;
      z-index: var(--z-actionbar, 1500) !important;
    }
    .w1-actionbar > div {
      overflow: visible;
    }
    .w1-actionbar .tc-menu {
      position: absolute;
      z-index: var(--z-actionbar-menu, 3000) !important;
      top: calc(100% + 8px);
    }
      #portalMenu,
      #worldMenu {
        z-index: var(--z-topbar-menu, 4000) !important;
      }
      @media (max-width: 520px) {
        .tc-topbar > .max-w-6xl {
          flex-wrap: wrap;
          row-gap: 8px;
          column-gap: 8px;
        }
        .tc-topbar > .max-w-6xl > :nth-child(1) {
          order: 1;
          min-width: 0;
        }
        .tc-topbar > .max-w-6xl > :nth-child(2) {
          order: 3;
          flex: 1 1 100%;
          min-width: 0;
        }
        .tc-topbar > .max-w-6xl > :nth-child(3) {
          order: 2;
          margin-left: auto;
        }
        .tc-topbar #portalSwitcher,
        .tc-topbar #portalBtn {
          width: 100%;
          max-width: 100%;
        }
        .tc-topbar [data-i18n="topbar.slogan"] {
          display: none;
        }
        .tc-topbar .tc-brand {
          max-width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        #topbarAuthSlot #userName {
          display: none;
        }
        .tc-topbar a,
        .tc-topbar button {
          min-height: 40px;
        }
      }
    </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    html, body, button, input, select, textarea {
      font-family: "Inter", "Noto Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
    }
  </style></head>
<body class="font-sans">
  <header class="tc-topbar sticky top-0 z-30 relative">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
      <a href="../index.html" class="flex items-center gap-3 min-w-0">
        <span class="h-11 w-11 md:h-12 md:w-12 rounded-xl shrink-0 flex items-center justify-center bg-white/5 ring-1 ring-white/10">
          <picture>
            <source srcset="../assets/spacecolors-mark.svg" type="image/svg+xml">
            <img
              src="../assets/spacecolors-mark-128.png"
              srcset="../assets/spacecolors-mark-128.png 1x, ../assets/spacecolors-mark-256.png 2x"
              class="h-full w-full object-contain select-none"
              alt="SpaceColors"
              decoding="async"
              loading="eager"
            />
          </picture>
        </span>
        <span class="min-w-0 flex flex-col justify-center leading-tight">
          <span class="tc-brand text-base md:text-lg whitespace-nowrap" data-i18n="topbar.brand">SpaceColors &#183; 8Portal</span>
          <span class="tc-muted text-[11px] md:text-xs truncate max-w-[240px] md:max-w-[360px] hidden sm:block" data-i18n="topbar.slogan">M&#7897;t ch&#7841;m m&#7903; kh&#244;ng gian m&#224;u v&#244; h&#7841;n</span>
        </span>
      </a>
      <div class="flex-1 flex items-center justify-center">
        <div class="relative" id="portalSwitcher">
          <button id="portalBtn"
            class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[210px] justify-between"
            aria-expanded="false" aria-haspopup="menu" aria-controls="portalMenu">
            Ch&#7885;n Th&#7871; gi&#7899;i
          </button>
          <div id="portalMenu" data-open="0" role="menu" class="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./threadcolor.html" role="menuitem">Th&#7871; gi&#7899;i m&#224;u th&#234;u</a>
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./palette.html" role="menuitem">Th&#7871; gi&#7899;i d&#7843;i m&#224;u</a>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end gap-3 min-w-[210px]">
        <div class="relative" id="worldSwitcher">
          <button id="worldBtn"
            class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[150px] justify-between"
            aria-expanded="false" aria-haspopup="menu" aria-controls="worldMenu">
            <span class="flex items-center gap-2">
              <span class="tc-dot" aria-hidden="true"></span>
              <span id="worldLabel">Origami</span>
            </span>
            <span aria-hidden="true">&#9662;</span>
          </button>
          <div id="worldMenu" data-open="0" class="absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md hover:bg-white/10" data-world="nebula">Tinh v&#226;n</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md hover:bg-white/10" data-world="ocean">&#272;&#7841;i d&#432;&#417;ng</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md hover:bg-white/10" data-world="ink">M&#7921;c t&#224;u</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md hover:bg-white/10" data-world="origami">Origami</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md hover:bg-white/10" data-world="arcade">Arcade</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md hover:bg-white/10" data-world="dunes">&#272;&#7891;i c&#225;t</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md hover:bg-white/10" data-world="chrome">Chrome</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md hover:bg-white/10" data-world="circuit">M&#7841;ch &#273;i&#7879;n</button>
          </div>
        </div>
        <div id="topbarAuthSlot" data-auth-slot="topbar" class="flex items-center justify-end min-w-[210px]"></div>
      </div>
    </div>
  </header>
  <div class="w1-actionbar border-b border-black/5">
    <div class="max-w-6xl mx-auto px-4 py-2 flex items-center justify-end gap-3">
      <div class="relative">
        <button id="w1CommunityBtn" class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold" aria-expanded="false" aria-haspopup="menu" aria-controls="w1CommunityMenu" data-i18n="topbar.nav.community">C&#7897;ng &#273;&#7891;ng</button>
        <div id="w1CommunityMenu" data-open="0" role="menu" class="tc-menu absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm">
          <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md" data-action="contribute" data-i18n="topbar.communityContribute" role="menuitem">&#272;&#243;ng g&#243;p d&#7919; li&#7879;u</button>
          <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md" data-action="verify" data-i18n="topbar.communityVerify" role="menuitem">X&#225;c minh</button>
        </div>
      </div>
      <div class="relative">
        <button id="w1SpacesBtn" class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold" aria-expanded="false" aria-haspopup="menu" aria-controls="w1SpacesMenu" data-i18n="topbar.nav.spaces">Kh&#244;ng gian</button>
        <div id="w1SpacesMenu" data-open="0" role="menu" class="tc-menu absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm">
          <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./threadvault.html?tab=saved" data-i18n="topbar.spaceVault" role="menuitem">Kho ch&#7881;</a>
        </div>
      </div>
    </div>
  </div>

  <main class="mx-auto max-w-4xl px-4 pt-6 pb-10">
    <div class="tc-card rounded-2xl p-6 md:p-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold tc-gradient-text text-center md:text-left" data-i18n="tc.title">Tra mã chỉ thêu theo màu</h1>
      </div>

      <section class="mb-6">
        <h3 class="text-lg font-semibold mb-2" data-i18n="tc.section.brand.title">Chọn hãng chỉ</h3>
        <div id="brandFilters" class="flex flex-wrap gap-3"></div>
        <label class="mt-3 inline-flex items-center gap-2 text-sm tc-muted">
          <input id="verifiedOnlyToggle" type="checkbox" class="tc-check">
          <span data-i18n="tc.section.brand.verified">Chỉ đã xác minh</span>
        </label>
      </section>
      <section class="mb-6">
        <h3 class="text-lg font-semibold mb-2">
          <span data-i18n="tc.section.delta.title">Độ tương đồng màu (ΔE)</span>
          <span id="deltaValue" class="text-sm tc-muted">(Î”E 3.0)</span>
        </h3>

        <input
          type="range"
          id="deltaSlider"
          min="0.5"
          max="30"
          step="0.5"
          value="3"
          class="tc-range w-full"
        />
        <div class="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <label for="deltaMethod" class="tc-muted" data-i18n="tc.section.delta.method">Phương pháp ΔE</label>
          <select id="deltaMethod" class="tc-field text-sm py-2">
            <option value="76" data-i18n="tc.section.delta.method76">Cơ bản (ΔE76)</option>
            <option value="2000" data-i18n="tc.section.delta.method2000">Chuẩn hơn (CIEDE2000)</option>
          </select>
        </div>
        <span id="deltaValueText" class="tc-muted">Î”E 3.0</span>
        <div class="flex justify-between text-xs tc-muted mt-1">
          <span data-i18n="tc.section.delta.low">Rất giống</span>
          <span data-i18n="tc.section.delta.high">Khác hẳn</span>
        </div>
      </section>

      <section class="mb-6">
        <h3 class="text-lg font-semibold mb-2" data-i18n="tc.section.pick.title">Chọn màu trực tiếp</h3>
        <div class="flex items-center gap-4">
          <input type="color" id="colorPicker" class="tc-color">
          <button id="btnFindNearest" class="tc-btn tc-btn-primary px-4 py-2 rounded-lg shadow-md" data-i18n="tc.section.pick.nearest">
            Tìm mã chỉ gần nhất
          </button>
          <button id="btnPickScreen" class="tc-chip tc-btn flex items-center gap-2 px-4 py-2 rounded-lg shadow-md">
            <span>o</span>
            <span data-i18n="tc.section.pick.pick">Chọn màu</span>
          </button>
        </div>
        <div class="mt-2 text-xs tc-muted hidden" id="eyedropperHint" data-i18n="tc.section.pick.hint">Bấm vào bất kỳ đâu để chọn màu (Esc để hủy)</div>
        <div class="mt-2 text-sm text-amber-700 hidden" id="eyedropperFallback">
          <span data-i18n="tc.section.pick.fallback">Trình duyệt chưa hỗ trợ chọn màu toàn màn hình. Dùng input màu bên dưới.</span>
        </div>
        <input type="color" id="fallbackColorPicker" class="mt-2 hidden tc-field p-1 w-16 h-10">
      </section>

      <section class="mb-6">
        <h3 class="text-lg font-semibold mb-2" data-i18n="tc.section.image.title">Chọn màu từ ảnh</h3>
        <input type="file" id="imgInput" accept="image/*" class="mb-2">
        <canvas
          id="canvas"
          class="border rounded-lg max-w-full min-h-[200px] bg-gray-100">
        </canvas>
        <p class="text-sm tc-muted mb-1" data-i18n="tc.section.image.helper">Chọn ảnh và bấm vào bất kỳ điểm nào để lấy màu</p>
      </section>

      <section class="mb-6">
        <h3 class="text-lg font-semibold mb-2" data-i18n="tc.section.code.title">Tra ngược theo mã chỉ</h3>
        <div class="flex items-center gap-4">
          <input type="text" id="codeInput" placeholder="Nhập mã (VD: DMC 310)" class="tc-field flex-1" data-i18n-attr="placeholder:tc.section.code.placeholder">
          <button id="btnFindByCode" class="tc-btn tc-btn-primary px-4 py-2 rounded-lg shadow-md" data-i18n="tc.section.code.action">
            Tra cứu
          </button>
        </div>
      </section>

      <section id="result" class="p-4 tc-chip rounded-lg shadow-inner"></section>
    </div>
  </main>

  <div id="inspectorOverlay" class="fixed inset-0 bg-black opacity-0 pointer-events-none transition-opacity duration-200 z-40"></div>

  <div id="colorInspector" class="fixed z-50 inset-x-0 bottom-0 translate-y-full md:inset-y-0 md:right-0 md:w-[380px] md:translate-x-full transition-transform duration-300">
    <div class="bg-white shadow-2xl rounded-t-2xl md:rounded-none border border-gray-200 h-[75vh] md:h-full flex flex-col">
      <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h2 id="inspectorTitle" class="text-lg font-semibold text-gray-800">Bảng thông tin màu</h2>
        <button id="inspectorClose" class="p-2 rounded-full hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400" aria-label="Đóng">
          &times;
        </button>
      </div>
      <div class="p-4 space-y-4 overflow-y-auto">
        <div class="flex gap-3 items-center">
          <div id="previewMain" class="w-16 h-16 rounded-xl border shadow-inner"></div>
          <div class="flex-1 grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div class="p-2 rounded-lg border bg-gray-50">
              <div class="text-[11px] uppercase tracking-wide text-gray-500">Nền sáng</div>
              <div id="previewLight" class="mt-2 w-full h-10 rounded-md border bg-white"></div>
            </div>
            <div class="p-2 rounded-lg border bg-gray-900 text-white">
              <div class="text-[11px] uppercase tracking-wide">Nền tối</div>
              <div id="previewDark" class="mt-2 w-full h-10 rounded-md border border-gray-700 bg-gray-800"></div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="space-y-1">
            <div class="text-xs text-gray-500">Hãng</div>
            <div id="inspectorBrand" class="font-medium text-gray-800">--</div>
          </div>
          <div class="space-y-1">
            <div class="text-xs text-gray-500">Mã chỉ</div>
            <div id="inspectorCode" class="font-medium text-gray-800">--</div>
          </div>
          <div class="space-y-1 col-span-2">
            <div class="text-xs text-gray-500">Tên màu</div>
            <div id="inspectorName" class="font-medium text-gray-800">--</div>
          </div>
          <div class="space-y-1 col-span-2">
            <div class="text-xs text-gray-500">Độ lệch (ΔE)</div>
            <div id="inspectorDelta" class="font-medium text-gray-800">--</div>
          </div>
        </div>

        <div class="rounded-xl border border-gray-200 bg-gray-50 p-3 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-gray-800">Giá trị màu</span>
            <button id="copyAll" class="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Sao chép tất cả</button>
          </div>
          <div class="grid grid-cols-1 gap-2 text-sm text-gray-800">
            <div class="flex items-center justify-between gap-2">
              <div><span class="text-xs uppercase text-gray-500">HEX</span> <span id="inspectorHex" class="font-semibold">--</span></div>
              <button data-copy="Hex" class="text-xs px-2 py-1 rounded-full bg-white border hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Sao chép</button>
            </div>
            <div class="flex items-center justify-between gap-2">
              <div><span class="text-xs uppercase text-gray-500">RGB</span> <span id="inspectorRgb" class="font-semibold">--</span></div>
              <button data-copy="Rgb" class="text-xs px-2 py-1 rounded-full bg-white border hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Sao chép</button>
            </div>
            <div class="flex items-center justify-between gap-2">
              <div><span class="text-xs uppercase text-gray-500">Chuỗi RGB</span> <span id="inspectorRgbString" class="font-semibold">--</span></div>
              <button data-copy="RgbString" class="text-xs px-2 py-1 rounded-full bg-white border hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Sao chép</button>
            </div>
            <div class="flex items-center justify-between gap-2">
              <div><span class="text-xs uppercase text-gray-500">LAB</span> <span id="inspectorLab" class="font-semibold">--</span></div>
              <button data-copy="Lab" class="text-xs px-2 py-1 rounded-full bg-white border hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Sao chép</button>
            </div>
            <div class="flex items-center justify-between gap-2">
              <div><span class="text-xs uppercase text-gray-500">HSL</span> <span id="inspectorHsl" class="font-semibold">--</span></div>
              <button data-copy="Hsl" class="text-xs px-2 py-1 rounded-full bg-white border hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Sao chép</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="toastContainer" class="fixed bottom-4 right-4 space-y-2 z-50"></div>
  <div id="pinPanel" class="fixed bottom-4 left-4 right-4 md:right-auto md:w-[360px] z-40 hidden">
    <div class="tc-card p-4 space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-semibold" data-i18n="tc.pin.panelTitle">So sánh đã ghim</h3>
        <button id="pinClear" class="tc-btn tc-chip px-3 py-1 text-xs" data-i18n="tc.pin.clear">Xoá tất cả ghim</button>
      </div>
      <div id="pinList" class="space-y-2 text-sm"></div>
    </div>
  </div>

  <div id="libraryOverlay" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden"></div>
  <div id="libraryModal" class="fixed inset-0 z-50 hidden items-center justify-center px-4">
    <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800" data-i18n="tc.library.title">Kết quả đã lưu</h3>
        <button id="libraryClose" class="p-2 rounded-full hover:bg-gray-100 text-gray-500">&times;</button>
      </div>
      <div class="p-4">
        <div id="libraryList" class="space-y-3 text-sm text-gray-800">
          <div class="text-gray-500">Đang tải...</div>
        </div>
      </div>
    </div>
  </div>

  <div id="contributeOverlay" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden"></div>
  <div id="contributeModal" class="fixed inset-0 z-50 hidden items-center justify-center px-4">
    <div class="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800">Đóng góp dữ liệu</h3>
        <button id="contributeClose" class="p-2 rounded-full hover:bg-gray-100 text-gray-500">&times;</button>
      </div>
      <div class="p-5 space-y-4 text-sm text-gray-800">
        <div class="space-y-1">
          <label class="font-medium">Hãng</label>
          <select id="contributeBrandSelect" class="w-full border rounded-lg px-3 py-2">
            <option value="">Chọn hãng</option>
          </select>
          <input id="contributeBrandCustom" type="text" placeholder="Hoặc nhập hãng mới" class="w-full border rounded-lg px-3 py-2 mt-2">
        </div>
        <div class="space-y-1">
          <label class="font-medium">Mã chỉ</label>
          <input id="contributeCode" type="text" class="w-full border rounded-lg px-3 py-2" placeholder="Mã chỉ">
        </div>
        <div class="space-y-1">
          <label class="font-medium">Tên màu (tuỳ chọn)</label>
          <input id="contributeName" type="text" class="w-full border rounded-lg px-3 py-2" placeholder="Tên màu">
        </div>
        <div class="space-y-2">
          <label class="font-medium">Hex</label>
          <div class="flex gap-2">
            <input id="contributeHex" type="text" class="flex-1 border rounded-lg px-3 py-2" placeholder="#RRGGBB">
            <button id="btnUseCurrentColor" class="px-3 py-2 rounded-lg border bg-gray-50 hover:bg-gray-100 text-gray-700">Dùng màu hiện tại</button>
          </div>
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button id="contributeCancel" class="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 text-gray-700">Huỷ</button>
          <button id="contributeSubmit" class="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Gửi</button>
        </div>
      </div>
    </div>
  </div>

  <div id="verifyOverlay" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden"></div>
  <div id="verifyModal" class="fixed inset-0 z-50 hidden items-center justify-center px-4">
    <div class="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800">Xác minh dữ liệu</h3>
        <button id="verifyClose" class="p-2 rounded-full hover:bg-gray-100 text-gray-500">&times;</button>
      </div>
      <div class="p-5 space-y-3 text-sm text-gray-800">
        <div id="verifyList" class="space-y-3">
          <div class="text-gray-500">Đang tải...</div>
        </div>
      </div>
    </div>
  </div>


  <script>
    (function () {
      var worlds = ["nebula", "ocean", "ink", "origami", "arcade", "dunes", "chrome", "circuit"];
      var labels = {
        nebula: "Tinh vân",
        ocean: "Đại dương",
        ink: "Mực tàu",
        origami: "Origami",
        arcade: "Arcade",
        dunes: "Đồi cát",
        chrome: "Chrome",
        circuit: "Mạch điện"
      };
      var storageKey = "tc_world";
      var defaultWorld = "origami";
      var worldBtn = document.getElementById("worldBtn");
      var worldMenu = document.getElementById("worldMenu");
      var worldLabel = document.getElementById("worldLabel");
      var switcher = document.getElementById("worldSwitcher");

      function applyWorld(next) {
        var world = worlds.indexOf(next) !== -1 ? next : defaultWorld;
        document.documentElement.setAttribute("data-world", world);
        localStorage.setItem(storageKey, world);
        if (worldLabel) {
          worldLabel.textContent = labels[world] || world;
        }
        if (worldMenu) {
          worldMenu.querySelectorAll("[data-world]").forEach(function (btn) {
            btn.classList.toggle("is-active", btn.getAttribute("data-world") === world);
          });
        }
      }

      function setMenuOpen(open) {
        if (!worldMenu) return;
        worldMenu.dataset.open = open ? "1" : "0";
        if (worldBtn) {
          worldBtn.setAttribute("aria-expanded", open ? "true" : "false");
        }
      }

      if (worldBtn && worldMenu) {
        worldBtn.addEventListener("click", function (event) {
          event.stopPropagation();
          setMenuOpen(worldMenu.dataset.open !== "1");
        });

        worldMenu.querySelectorAll("[data-world]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            applyWorld(btn.getAttribute("data-world"));
            setMenuOpen(false);
          });
        });
      }

      document.addEventListener("click", function (event) {
        if (!switcher) return;
        if (!switcher.contains(event.target)) {
          setMenuOpen(false);
        }
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          setMenuOpen(false);
        }
      });

      window.addEventListener("storage", function (event) {
        if (event.key === storageKey && event.newValue) {
          applyWorld(event.newValue);
        }
      });

      var initial = localStorage.getItem(storageKey) || defaultWorld;
      applyWorld(initial);
      setMenuOpen(false);
    })();
  </script>
  <script>
    (() => {
      if (window.__portalSwitcherBound) return;
      window.__portalSwitcherBound = true;
      const portalBtn = document.getElementById("portalBtn");
      const portalMenu = document.getElementById("portalMenu");
      if (!portalBtn || !portalMenu) return;
      const setOpen = (open) => {
        portalMenu.dataset.open = open ? "1" : "0";
        portalMenu.hidden = !open;
        portalBtn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      setOpen(portalMenu.dataset.open === "1");
      portalBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        setOpen(portalMenu.dataset.open !== "1");
      });
      portalMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-menu-item");
        if (!item || !portalMenu.contains(item)) return;
        setOpen(false);
      });
      document.addEventListener("click", (event) => {
        if (!portalMenu.contains(event.target) && !portalBtn.contains(event.target)) {
          setOpen(false);
        }
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
      });
    })();
  </script>
  <script>
    (() => {
      const menus = [
        { btn: document.getElementById("w1CommunityBtn"), menu: document.getElementById("w1CommunityMenu") },
        { btn: document.getElementById("w1SpacesBtn"), menu: document.getElementById("w1SpacesMenu") }
      ];
      const setMenuOpen = (btn, menu, open) => {
        if (!btn || !menu) return;
        menu.dataset.open = open ? "1" : "0";
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      const closeAll = () => {
        menus.forEach(({ btn, menu }) => setMenuOpen(btn, menu, false));
      };
      menus.forEach(({ btn, menu }) => {
        if (!btn || !menu) return;
        btn.addEventListener("click", (event) => {
          event.stopPropagation();
          const isOpen = menu.dataset.open === "1";
          closeAll();
          setMenuOpen(btn, menu, !isOpen);
        });
        menu.addEventListener("click", (event) => {
          const item = event.target.closest(".tc-menu-item");
          if (!item || !menu.contains(item)) return;
          const action = item.getAttribute("data-action");
          if (action) {
            document.dispatchEvent(new CustomEvent("tc-auth-action", { detail: { action } }));
          }
          closeAll();
        });
      });
      document.addEventListener("click", (event) => {
        if (menus.some(({ btn, menu }) => btn?.contains(event.target) || menu?.contains(event.target))) return;
        closeAll();
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeAll();
      });
    })();
  </script>
  <script src="../i18n.js"></script>
  <script type="module" src="../auth.js"></script>
  <script type="module" src="../script.js"></script>
  <script>
    (() => {
      const bar = document.querySelector('.tc-topbar');
      if (!bar) return;
      let ticking = false;
      const update = () => {
        bar.classList.toggle('is-scrolled', window.scrollY > 8);
        ticking = false;
      };
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      update();
    })();
  </script>
</body>
</html>

````

## worlds/threadvault.html
````text
<!DOCTYPE html>
<html lang="vi" data-world="origami">
<head>
  <meta charset="utf-8">
  <title>Kho chỉ</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --bg: #f6f1e9;
      --text: #201a14;
      --muted: #6b5d4b;
      --glass: rgba(255, 255, 255, 0.72);
      --stroke: rgba(32, 26, 20, 0.08);
      --a1: #c27b4b;
      --a2: #d59e6d;
      --a3: #8c6d54;
    }
    html[data-world="nebula"] {
      --bg: #0c1123;
      --text: #eef2ff;
      --muted: #b6bfe3;
      --glass: rgba(18, 26, 48, 0.72);
      --stroke: rgba(255, 255, 255, 0.12);
      --a1: #6ee7ff;
      --a2: #8b5cf6;
      --a3: #f472b6;
    }
    html[data-world="ocean"] {
      --bg: #e7f6ff;
      --text: #0b2b3a;
      --muted: #4b6b7b;
      --glass: rgba(255, 255, 255, 0.7);
      --stroke: rgba(11, 43, 58, 0.12);
      --a1: #1fb6ff;
      --a2: #0ea5a8;
      --a3: #4dd4ff;
    }
    html[data-world="ink"] {
      --bg: #0f1115;
      --text: #f4f4f6;
      --muted: #9aa0a9;
      --glass: rgba(24, 26, 31, 0.72);
      --stroke: rgba(255, 255, 255, 0.1);
      --a1: #e2e8f0;
      --a2: #94a3b8;
      --a3: #64748b;
    }
    html[data-world="origami"] {
      --bg: #f6f1e9;
      --text: #201a14;
      --muted: #6b5d4b;
      --glass: rgba(255, 255, 255, 0.72);
      --stroke: rgba(32, 26, 20, 0.08);
      --a1: #c27b4b;
      --a2: #d59e6d;
      --a3: #8c6d54;
    }
    html[data-world="arcade"] {
      --bg: #0b0b14;
      --text: #fef7ff;
      --muted: #c9b9e8;
      --glass: rgba(20, 18, 36, 0.78);
      --stroke: rgba(255, 255, 255, 0.14);
      --a1: #ff3dcd;
      --a2: #7c3aed;
      --a3: #20e3b2;
    }
    html[data-world="dunes"] {
      --bg: #f7f0e1;
      --text: #3a2d1a;
      --muted: #7a644a;
      --glass: rgba(255, 255, 255, 0.7);
      --stroke: rgba(58, 45, 26, 0.12);
      --a1: #d39b54;
      --a2: #e3b87b;
      --a3: #b3743d;
    }
    html[data-world="chrome"] {
      --bg: #f1f4f8;
      --text: #1c232b;
      --muted: #5f6b79;
      --glass: rgba(255, 255, 255, 0.68);
      --stroke: rgba(28, 35, 43, 0.12);
      --a1: #3b82f6;
      --a2: #94a3b8;
      --a3: #0f172a;
    }
    html[data-world="circuit"] {
      --bg: #0b1410;
      --text: #e9fff3;
      --muted: #9ec4ad;
      --glass: rgba(12, 24, 18, 0.72);
      --stroke: rgba(255, 255, 255, 0.12);
      --a1: #22c55e;
      --a2: #16a34a;
      --a3: #86efac;
    }
    body {
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
    }
    .tc-topbar {
      background: var(--glass);
      border-bottom: 1px solid var(--stroke);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
      z-index: var(--z-topbar, 2000) !important;
      overflow: visible;
    }
    .tc-topbar::after{
      content:"";
      position:absolute; left:0; right:0; bottom:-1px; height:1px;
      background: linear-gradient(90deg, var(--a1), var(--a2), var(--a3));
      opacity: .35;
    }
    .tc-chip{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
    }
    .tc-btn{
      border-radius: 0.75rem;
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
    }
    .tc-btn-primary{
      background: linear-gradient(135deg, var(--a1), var(--a2));
      color: #fff;
      border: 1px solid rgba(255,255,255,.18);
    }
    .tc-dot{
      width: 10px; height: 10px; border-radius: 999px;
      background: linear-gradient(135deg, var(--a1), var(--a2), var(--a3));
      box-shadow: 0 0 0 2px rgba(255,255,255,.5);
    }
    .tc-card{
      background: var(--glass);
      border: 1px solid var(--stroke);
      backdrop-filter: blur(16px);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
    }
    #worldMenu[data-open="0"] { display: none; }
    #worldMenu[data-open="1"] { display: block; }
    .tc-menu[data-open="0"] { display: none; }
    .tc-menu[data-open="1"] { display: block; }
    .tc-menu{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
    }
    .tc-menu-item{
      color: var(--text);
    }
    .tc-menu-item:hover{ background: rgba(255,255,255,.10); }
    .tc-menu-item:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
    }
    .w1-actionbar {
      position: sticky;
      top: var(--tc-topbar-h, 64px);
      overflow: visible;
      z-index: var(--z-actionbar, 1500) !important;
    }
    .w1-actionbar > div {
      overflow: visible;
    }
    .w1-actionbar .tc-menu {
      position: absolute;
      z-index: var(--z-actionbar-menu, 3000) !important;
      top: calc(100% + 8px);
    }
      #portalMenu,
      #worldMenu {
        z-index: var(--z-topbar-menu, 4000) !important;
      }
      @media (max-width: 520px) {
        .tc-topbar > .max-w-6xl {
          flex-wrap: wrap;
          row-gap: 8px;
          column-gap: 8px;
        }
        .tc-topbar > .max-w-6xl > :nth-child(1) {
          order: 1;
          min-width: 0;
        }
        .tc-topbar > .max-w-6xl > :nth-child(2) {
          order: 3;
          flex: 1 1 100%;
          min-width: 0;
        }
        .tc-topbar > .max-w-6xl > :nth-child(3) {
          order: 2;
          margin-left: auto;
        }
        .tc-topbar #portalSwitcher,
        .tc-topbar #portalBtn {
          width: 100%;
          max-width: 100%;
        }
        .tc-topbar [data-i18n="topbar.slogan"] {
          display: none;
        }
        .tc-topbar .tc-brand {
          max-width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        #topbarAuthSlot #userName {
          display: none;
        }
        .tc-topbar a,
        .tc-topbar button {
          min-height: 40px;
        }
      }
    </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    html, body, button, input, select, textarea {
      font-family: "Inter", "Noto Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
    }
  </style></head>
<body class="font-sans">
  <header class="tc-topbar sticky top-0 z-30 relative">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
      <a href="../index.html" class="flex items-center gap-3 min-w-0">
        <span class="h-11 w-11 md:h-12 md:w-12 rounded-xl shrink-0 flex items-center justify-center bg-white/5 ring-1 ring-white/10">
          <picture>
            <source srcset="../assets/spacecolors-mark.svg" type="image/svg+xml">
            <img
              src="../assets/spacecolors-mark-128.png"
              srcset="../assets/spacecolors-mark-128.png 1x, ../assets/spacecolors-mark-256.png 2x"
              class="h-full w-full object-contain select-none"
              alt="SpaceColors"
              decoding="async"
              loading="eager"
            />
          </picture>
        </span>
        <span class="min-w-0 flex flex-col justify-center leading-tight">
          <span class="tc-brand text-base md:text-lg whitespace-nowrap" data-i18n="topbar.brand">SpaceColors &#183; 8Portal</span>
          <span class="tc-muted text-[11px] md:text-xs truncate max-w-[240px] md:max-w-[360px] hidden sm:block" data-i18n="topbar.slogan">M&#7897;t ch&#7841;m m&#7903; kh&#244;ng gian m&#224;u v&#244; h&#7841;n</span>
        </span>
      </a>
      <div class="flex-1 flex items-center justify-center">
        <div class="relative" id="portalSwitcher">
          <button id="portalBtn"
            class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[210px] justify-between"
            aria-expanded="false" aria-haspopup="menu" aria-controls="portalMenu">
            Ch&#7885;n Th&#7871; gi&#7899;i
          </button>
          <div id="portalMenu" data-open="0" role="menu" class="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./threadcolor.html" role="menuitem">Th&#7871; gi&#7899;i m&#224;u th&#234;u</a>
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./palette.html" role="menuitem">Th&#7871; gi&#7899;i d&#7843;i m&#224;u</a>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end gap-3 min-w-[210px]">
        <div class="relative" id="worldSwitcher">
          <button id="worldBtn"
            class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[150px] justify-between"
            aria-expanded="false" aria-haspopup="menu" aria-controls="worldMenu">
            <span class="flex items-center gap-2">
              <span class="tc-dot" aria-hidden="true"></span>
              <span id="worldLabel">Origami</span>
            </span>
            <span aria-hidden="true">&#9662;</span>
          </button>
          <div id="worldMenu" data-open="0" role="menu" class="absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="nebula" role="menuitem">Tinh v&#226;n</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="ocean" role="menuitem">&#272;&#7841;i d&#432;&#417;ng</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="ink" role="menuitem">M&#7921;c t&#224;u</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="origami" role="menuitem">Origami</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="arcade" role="menuitem">Arcade</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="dunes" role="menuitem">&#272;&#7891;i c&#225;t</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="chrome" role="menuitem">Chrome</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="circuit" role="menuitem">M&#7841;ch &#273;i&#7879;n</button>
          </div>
        </div>
        <div id="topbarAuthSlot" data-auth-slot="topbar" class="flex items-center justify-end min-w-[210px]"></div>
      </div>
    </div>
  </header>
  <div class="w1-actionbar border-b border-black/5">
    <div class="max-w-6xl mx-auto px-4 py-2 flex items-center justify-end gap-3">
      <div class="relative">
        <button id="w1CommunityBtn" class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold" aria-expanded="false" aria-haspopup="menu" aria-controls="w1CommunityMenu" data-i18n="topbar.nav.community">C&#7897;ng &#273;&#7891;ng</button>
        <div id="w1CommunityMenu" data-open="0" role="menu" class="tc-menu absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm">
          <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./threadcolor.html?open=contribute" data-i18n="topbar.communityContribute" role="menuitem">&#272;&#243;ng g&#243;p d&#7919; li&#7879;u</a>
          <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./threadcolor.html?open=verify" data-i18n="topbar.communityVerify" role="menuitem">X&#225;c minh</a>
        </div>
      </div>
      <div class="relative">
        <button id="w1SpacesBtn" class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold" aria-expanded="false" aria-haspopup="menu" aria-controls="w1SpacesMenu" data-i18n="topbar.nav.spaces">Kh&#244;ng gian</button>
        <div id="w1SpacesMenu" data-open="0" role="menu" class="tc-menu absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm">
          <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" aria-disabled="true" disabled data-i18n="topbar.spaceVault">Kho ch&#7881;</button>
        </div>
      </div>
    </div>
  </div>

  <main class="mx-auto max-w-4xl px-4 pt-10 pb-16">
    <a class="tc-btn tc-chip inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold" href="./threadcolor.html">
      &#8592; V&#7873; Th&#7871; gi&#7899;i m&#224;u th&#234;u
    </a>
    <div class="tc-card rounded-2xl p-6 md:p-10">
      <h1 class="text-3xl font-bold" data-i18n="vault.title">Kho chỉ</h1>
      <p class="mt-3 tc-muted" data-i18n="vault.desc">Không gian này đang được hoàn thiện. Quay lại sau nhé.</p>
      <div class="mt-6 flex flex-wrap gap-2" role="tablist">
        <button class="tc-chip tc-btn px-3 py-2 text-sm font-semibold" data-tab="saved" data-i18n="vault.tabSaved" aria-selected="true">Kết quả đã lưu</button>
        <button class="tc-chip tc-btn px-3 py-2 text-sm font-semibold" data-tab="stock" data-i18n="vault.tabStock" aria-selected="false">Tồn kho</button>
      </div>
      <div class="mt-6">
        <section id="vaultTabSaved" data-tab-panel="saved">
          <div id="libraryOverlay" class="hidden"></div>
          <div id="libraryModal" class="hidden tc-card rounded-2xl border border-black/5 overflow-hidden">
            <div class="flex items-center justify-between px-5 py-4 border-b border-black/5">
              <h3 class="text-lg font-semibold" data-i18n="tc.library.title">Kết quả đã lưu</h3>
              <button id="libraryClose" class="tc-btn tc-chip px-3 py-2 text-sm" data-i18n="common.close">Đóng</button>
            </div>
            <div class="p-4">
              <div id="libraryList" class="space-y-3 text-sm"></div>
            </div>
          </div>
        </section>
        <section id="vaultTabStock" data-tab-panel="stock" class="hidden">
          <div id="stockCta" class="tc-card rounded-2xl p-6 hidden">
            <h2 class="text-lg font-semibold" data-i18n="vault.stock.ctaTitle">Đăng nhập để dùng Tồn kho</h2>
            <p class="tc-muted mt-1" data-i18n="vault.stock.ctaDesc">Quản lý tồn kho cá nhân theo tài khoản.</p>
            <button id="stockLoginBtn" class="tc-btn tc-btn-primary px-4 py-2 mt-4" data-i18n="vault.stock.ctaAction">ĐĒng nhập</button>
          </div>
          <div id="stockPanel" class="space-y-4">
            <div class="flex flex-wrap items-center gap-2">
              <input id="stockSearch" class="tc-field text-sm flex-1 min-w-[200px]" data-i18n-attr="placeholder:vault.stock.search" placeholder="Tìm theo hãng/mã/tên/hex">
              <div class="flex flex-wrap gap-2">
                <button id="stockAddBtn" class="tc-btn tc-btn-primary px-3 py-2 text-sm" data-i18n="vault.stock.add">Thêm</button>
                <button id="stockImportBtn" class="tc-btn tc-chip px-3 py-2 text-sm" data-i18n="vault.stock.import">Nhập CSV</button>
                <button id="stockExportBtn" class="tc-btn tc-chip px-3 py-2 text-sm" data-i18n="vault.stock.export">Xuất CSV</button>
              </div>
            </div>
            <div class="tc-card rounded-2xl p-4 flex flex-wrap gap-6 text-sm">
              <div><span class="tc-muted" data-i18n="vault.stock.summaryItems">Tổng mã</span> <strong id="stockSummaryItems">0</strong></div>
              <div><span class="tc-muted" data-i18n="vault.stock.summaryQty">Tổng số lượng</span> <strong id="stockSummaryQty">0</strong></div>
              <div><span class="tc-muted" data-i18n="vault.stock.summaryLow">Sắp hết</span> <strong id="stockSummaryLow">0</strong></div>
            </div>
            <div class="tc-card rounded-2xl overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead class="text-left">
                    <tr class="border-b border-black/5">
                      <th class="px-4 py-3" data-i18n="vault.stock.table.swatch">Màu</th>
                      <th class="px-4 py-3" data-i18n="vault.stock.table.brand">Hãng</th>
                      <th class="px-4 py-3" data-i18n="vault.stock.table.code">Mã</th>
                      <th class="px-4 py-3" data-i18n="vault.stock.table.name">Tên</th>
                      <th class="px-4 py-3" data-i18n="vault.stock.table.qty">SL</th>
                      <th class="px-4 py-3" data-i18n="vault.stock.table.unit">Đơn vị</th>
                      <th class="px-4 py-3" data-i18n="vault.stock.table.location">Vị trí</th>
                      <th class="px-4 py-3" data-i18n="vault.stock.table.updated">Cập nhật</th>
                      <th class="px-4 py-3 text-right" data-i18n="vault.stock.table.actions">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody id="stockBody"></tbody>
                </table>
              </div>
              <div id="stockEmpty" class="p-4 tc-muted hidden" data-i18n="vault.stock.empty">Chưa có dữ liệu tồn kho.</div>
            </div>
          </div>
          <input type="file" id="stockFileInput" class="hidden" accept=".csv,text/csv">
          <div id="stockOverlay" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden"></div>
          <div id="stockModal" class="fixed inset-0 z-50 hidden items-center justify-center px-4">
            <div class="tc-card w-full max-w-xl rounded-2xl shadow-2xl border border-black/5 overflow-hidden">
              <div class="flex items-center justify-between px-5 py-4 border-b border-black/5">
                <h3 id="stockModalTitle" class="text-lg font-semibold" data-i18n="vault.stock.modalAdd">Thêm tồn kho</h3>
                <button id="stockModalClose" class="tc-btn tc-chip px-3 py-2 text-sm" data-i18n="common.close">Đóng</button>
              </div>
              <form id="stockForm" class="p-5 space-y-4 text-sm">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="space-y-1">
                    <label class="font-medium" data-i18n="vault.stock.fields.brand">Hãng</label>
                    <input id="stockBrand" class="tc-field w-full" required>
                  </div>
                  <div class="space-y-1">
                    <label class="font-medium" data-i18n="vault.stock.fields.code">Mã</label>
                    <input id="stockCode" class="tc-field w-full" required>
                  </div>
                  <div class="space-y-1">
                    <label class="font-medium" data-i18n="vault.stock.fields.name">Tên</label>
                    <input id="stockName" class="tc-field w-full">
                  </div>
                  <div class="space-y-1">
                    <label class="font-medium" data-i18n="vault.stock.fields.hex">Hex</label>
                    <input id="stockHex" class="tc-field w-full" placeholder="#RRGGBB">
                  </div>
                  <div class="space-y-1">
                    <label class="font-medium" data-i18n="vault.stock.fields.qty">Số lượng</label>
                    <input id="stockQty" type="number" class="tc-field w-full" min="0" step="1" required>
                  </div>
                  <div class="space-y-1">
                    <label class="font-medium" data-i18n="vault.stock.fields.unit">Đơn vị</label>
                    <input id="stockUnit" class="tc-field w-full">
                  </div>
                  <div class="space-y-1">
                    <label class="font-medium" data-i18n="vault.stock.fields.location">Vị trí</label>
                    <input id="stockLocation" class="tc-field w-full">
                  </div>
                  <div class="space-y-1">
                    <label class="font-medium" data-i18n="vault.stock.fields.minQty">Tồn tối thiểu</label>
                    <input id="stockMinQty" type="number" class="tc-field w-full" min="0" step="1">
                  </div>
                </div>
                <div class="space-y-1">
                  <label class="font-medium" data-i18n="vault.stock.fields.note">Ghi chú</label>
                  <textarea id="stockNote" class="tc-field w-full min-h-[80px]"></textarea>
                </div>
                <div class="flex justify-end gap-2 pt-2">
                  <button type="button" id="stockCancel" class="tc-btn tc-chip px-4 py-2" data-i18n="vault.stock.modalCancel">Huỷ</button>
                  <button type="submit" id="stockSave" class="tc-btn tc-btn-primary px-4 py-2" data-i18n="vault.stock.modalSave">Lưu</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>

  <script>
    (function () {
      var worlds = ["nebula", "ocean", "ink", "origami", "arcade", "dunes", "chrome", "circuit"];
      var labels = {
        nebula: "Tinh vân",
        ocean: "Đại dương",
        ink: "Mực tàu",
        origami: "Origami",
        arcade: "Arcade",
        dunes: "Đồi cát",
        chrome: "Chrome",
        circuit: "Mạch điện"
      };
      var storageKey = "tc_world";
      var defaultWorld = "origami";
      var worldBtn = document.getElementById("worldBtn");
      var worldMenu = document.getElementById("worldMenu");
      var worldLabel = document.getElementById("worldLabel");
      var switcher = document.getElementById("worldSwitcher");

      function applyWorld(next) {
        var world = worlds.indexOf(next) !== -1 ? next : defaultWorld;
        document.documentElement.setAttribute("data-world", world);
        try { localStorage.setItem(storageKey, world); } catch (err) {}
        if (worldLabel) {
          worldLabel.textContent = labels[world] || world;
        }
      }

      function setMenuOpen(open) {
        if (!worldMenu) return;
        worldMenu.dataset.open = open ? "1" : "0";
        if (worldBtn) {
          worldBtn.setAttribute("aria-expanded", open ? "true" : "false");
        }
      }

      if (worldBtn && worldMenu) {
        worldBtn.addEventListener("click", function (event) {
          event.stopPropagation();
          setMenuOpen(worldMenu.dataset.open !== "1");
        });
        worldMenu.querySelectorAll("[data-world]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            applyWorld(btn.getAttribute("data-world"));
            setMenuOpen(false);
          });
        });
      }

      document.addEventListener("click", function (event) {
        if (!switcher) return;
        if (!switcher.contains(event.target)) {
          setMenuOpen(false);
        }
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          setMenuOpen(false);
        }
      });

      var initial = defaultWorld;
      try {
        initial = localStorage.getItem(storageKey) || defaultWorld;
      } catch (err) {}
      applyWorld(initial);
      setMenuOpen(false);
    })();
  </script>
  <script>
    (() => {
      if (window.__portalSwitcherBound) return;
      window.__portalSwitcherBound = true;
      const portalBtn = document.getElementById("portalBtn");
      const portalMenu = document.getElementById("portalMenu");
      if (!portalBtn || !portalMenu) return;
      const setOpen = (open) => {
        portalMenu.dataset.open = open ? "1" : "0";
        portalMenu.hidden = !open;
        portalBtn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      setOpen(portalMenu.dataset.open === "1");
      portalBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        setOpen(portalMenu.dataset.open !== "1");
      });
      portalMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-menu-item");
        if (!item || !portalMenu.contains(item)) return;
        setOpen(false);
      });
      document.addEventListener("click", (event) => {
        if (!portalMenu.contains(event.target) && !portalBtn.contains(event.target)) {
          setOpen(false);
        }
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
      });
    })();
  </script>
  <script>
    (() => {
      const communityBtn = document.getElementById("w1CommunityBtn");
      const communityMenu = document.getElementById("w1CommunityMenu");
      const spacesBtn = document.getElementById("w1SpacesBtn");
      const spacesMenu = document.getElementById("w1SpacesMenu");
      if (!communityBtn || !communityMenu || !spacesBtn || !spacesMenu) return;
      const menus = [
        { btn: communityBtn, menu: communityMenu },
        { btn: spacesBtn, menu: spacesMenu }
      ];
      const setMenuOpen = (btn, menu, open) => {
        menu.dataset.open = open ? "1" : "0";
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      const closeAll = () => menus.forEach(({ btn, menu }) => setMenuOpen(btn, menu, false));
      communityBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = communityMenu.dataset.open === "1";
        closeAll();
        setMenuOpen(communityBtn, communityMenu, !isOpen);
      });
      spacesBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = spacesMenu.dataset.open === "1";
        closeAll();
        setMenuOpen(spacesBtn, spacesMenu, !isOpen);
      });
      communityMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-menu-item");
        if (!item || !communityMenu.contains(item)) return;
        closeAll();
      });
      spacesMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-menu-item");
        if (!item || !spacesMenu.contains(item)) return;
        closeAll();
      });
      document.addEventListener("click", (event) => {
        if (menus.some(({ btn, menu }) => btn.contains(event.target) || menu.contains(event.target))) return;
        closeAll();
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeAll();
      });
    })();
  </script>
  <script src="../i18n.js"></script>
  <script type="module" src="../auth.js"></script>
  <script type="module" src="../script.js"></script>
  <script type="module" src="../stock.js"></script>
  <script>
    (() => {
      const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
      const panels = Array.from(document.querySelectorAll("[data-tab-panel]"));
      let activeTab = "saved";
      const fireSaved = () => {
        if (activeTab !== "saved") return;
        document.dispatchEvent(new CustomEvent("tc-auth-action", { detail: { action: "library" } }));
      };
      const setActive = (tab) => {
        activeTab = tab;
        tabButtons.forEach((btn) => {
          const isActive = btn.getAttribute("data-tab") === tab;
          btn.setAttribute("aria-selected", isActive ? "true" : "false");
        });
        panels.forEach((panel) => {
          const isActive = panel.getAttribute("data-tab-panel") === tab;
          panel.classList.toggle("hidden", !isActive);
        });
        document.dispatchEvent(new CustomEvent("tc-vault-tab-changed", { detail: { tab } }));
        fireSaved();
      };
      const params = new URLSearchParams(window.location.search);
      const hashTab = window.location.hash.replace("#", "");
      const initial = params.get("tab") || hashTab || "saved";
      setActive(initial === "stock" ? "stock" : "saved");
      tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => setActive(btn.getAttribute("data-tab")));
      });
      document.addEventListener("tc-auth-changed", (event) => {
        if (!event?.detail?.user) return;
        fireSaved();
      });
    })();
  </script>
</body>
</html>

````
