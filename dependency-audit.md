# Báo cáo dependency audit

- Tổng file: 41
- Reachable: 14
- Unreachable: 27
- Missing references: 10

## Entry points
```text
index.html
account.html
worlds/palette.html
worlds/threadcolor.html
worlds/threadvault.html
```

## File chắc chắn không dùng (unreachable)
| File |
|---|
| .github/CODEOWNERS |
| .github/ISSUE_TEMPLATE/bug_report.yml |
| .github/ISSUE_TEMPLATE/feature_request.yml |
| .github/pull_request_template.md |
| assets/Logo SpaceColors.png |
| assets/spacecolors-mark-512.png |
| assets/spacecolors-mark-64.png |
| CONTRIBUTING.md |
| data/raw_tch/Ackerman Isacord 30.tch |
| data/threads.generated.json |
| dependency-audit.json |
| dependency-audit.md |
| DOC/00_TOAN_CANH.md |
| DOC/01_WORKFLOW.md |
| DOC/02_QUAN_TRI_GITHUB.md |
| DOC/REPO_SNAPSHOT.md |
| firestore.rules |
| README.md |
| SECURITY.md |
| style.css |
| themes.css |
| threads.json |
| tools/bootstrap_admin.mjs |
| tools/dependency_audit.mjs |
| tools/import_tch.mjs |
| tools/normalize_threads.mjs |
| tools/validate_threads.mjs |

## Nghi vấn runtime (template literal/concat)
- Không phát hiện.

## File bị reference nhưng thiếu
| From | Ref | Raw |
|---|---|---|
| tools/bootstrap_admin.mjs | firebase-admin/app | firebase-admin/app |
| tools/bootstrap_admin.mjs | firebase-admin/firestore | firebase-admin/firestore |
| tools/bootstrap_admin.mjs | fs | fs |
| tools/dependency_audit.mjs | fs | fs |
| tools/dependency_audit.mjs | path | path |
| tools/dependency_audit.mjs | url | url |
| tools/import_tch.mjs | fs/promises | fs/promises |
| tools/import_tch.mjs | path | path |
| tools/normalize_threads.mjs | node:fs/promises | node:fs/promises |
| tools/validate_threads.mjs | node:fs/promises | node:fs/promises |

## Top file được tham chiếu nhiều
| File | Lần được tham chiếu |
|---|---:|
| worlds/threadcolor.html | 13 |
| worlds/palette.html | 6 |
| index.html | 5 |
| assets/spacecolors-logo-topbar.png | 5 |
| auth.js | 5 |
| data_normalize.js | 3 |
| i18n.js | 3 |
| worlds/threadvault.html | 2 |
| script.js | 2 |
| crowd.js | 1 |
| library.js | 1 |
| workers/thread_search.worker.js | 1 |
| stock.js | 1 |
| tools/validate_threads.mjs | 1 |
| .github/CODEOWNERS | 0 |
| .github/ISSUE_TEMPLATE/bug_report.yml | 0 |
| .github/ISSUE_TEMPLATE/feature_request.yml | 0 |
| .github/pull_request_template.md | 0 |
| account.html | 0 |
| assets/Logo SpaceColors.png | 0 |

## Gợi ý dọn rác an toàn
- Chuyển file nghi ngờ không dùng vào thư mục _graveyard/ trong 7 ngày trước khi xoá.
- Theo dõi lỗi runtime/404 rồi mới xoá vĩnh viễn.
