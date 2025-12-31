# Báo cáo dependency audit

- Tổng file: 39
- Reachable: 5
- Unreachable: 27
- Missing references: 68

## Entry points
```text
account.html
index.html
worlds/palette.html
worlds/threadcolor.html
worlds/threadvault.html
```

## File không dùng (unreachable)
| File |
|---|
| .github/ISSUE_TEMPLATE/bug_report.yml |
| .github/ISSUE_TEMPLATE/feature_request.yml |
| .github/pull_request_template.md |
| auth.js |
| CONTRIBUTING.md |
| crowd.js |
| data/threads.generated.json |
| data_normalize.js |
| DOC/00_TOAN_CANH.md |
| DOC/01_WORKFLOW.md |
| DOC/02_QUAN_TRI_GITHUB.md |
| DOC/REPO_SNAPSHOT.md |
| i18n.js |
| library.js |
| README.md |
| script.js |
| SECURITY.md |
| stock.js |
| style.css |
| themes.css |
| threads.json |
| tools/bootstrap_admin.mjs |
| tools/dependency_audit.mjs |
| tools/import_tch.mjs |
| tools/normalize_threads.mjs |
| tools/validate_threads.mjs |
| workers/thread_search.worker.js |

## File bị reference nhưng thiếu
| From | Ref |
|---|---|
| account.html | script |
| account.html | a |
| account.html | img |
| account.html | a |
| account.html | a |
| account.html | a |
| account.html | a |
| account.html | a |
| account.html | a |
| account.html | a |
| account.html | a |
| account.html | a |
| account.html | a |
| account.html | a |
| account.html | a |
| account.html | a |
| account.html | a |
| account.html | a |
| account.html | a |
| account.html | script |
| index.html | script |
| index.html | a |
| index.html | img |
| index.html | a |
| index.html | a |
| index.html | a |
| index.html | a |
| index.html | a |
| index.html | script |
| index.html | script |
| tools/bootstrap_admin.mjs | firebase-admin/app |
| tools/bootstrap_admin.mjs | firebase-admin/firestore |
| tools/bootstrap_admin.mjs | fs |
| tools/dependency_audit.mjs | fs |
| tools/dependency_audit.mjs | path |
| tools/dependency_audit.mjs | url |
| tools/import_tch.mjs | fs/promises |
| tools/import_tch.mjs | path |
| tools/normalize_threads.mjs | node:fs/promises |
| tools/validate_threads.mjs | node:fs/promises |
| worlds/palette.html | script |
| worlds/palette.html | a |
| worlds/palette.html | img |
| worlds/palette.html | a |
| worlds/palette.html | a |
| worlds/palette.html | a |
| worlds/palette.html | script |
| worlds/threadcolor.html | script |
| worlds/threadcolor.html | a |
| worlds/threadcolor.html | img |

## Top file được dùng nhiều (refs_in)
| File | Lần được tham chiếu |
|---|---:|
| data_normalize.js | 3 |
| crowd.js | 1 |
| library.js | 1 |
| workers/thread_search.worker.js | 1 |
| tools/validate_threads.mjs | 1 |
| .github/CODEOWNERS | 0 |
| .github/ISSUE_TEMPLATE/bug_report.yml | 0 |
| .github/ISSUE_TEMPLATE/feature_request.yml | 0 |
| .github/pull_request_template.md | 0 |
| account.html | 0 |
| assets/Logo SpaceColors.png | 0 |
| assets/spacecolors-logo-topbar.png | 0 |
| assets/spacecolors-mark-512.png | 0 |
| assets/spacecolors-mark-64.png | 0 |
| auth.js | 0 |
| CONTRIBUTING.md | 0 |
| data/raw_tch/Ackerman Isacord 30.tch | 0 |
| data/threads.generated.json | 0 |
| DOC/00_TOAN_CANH.md | 0 |
| DOC/01_WORKFLOW.md | 0 |

## Lưu ý
- Chỉ bắt path dạng string literal, không bắt dynamic template/concat.
- Asset tải qua CDN không nằm trong repo sẽ bị bỏ qua.
