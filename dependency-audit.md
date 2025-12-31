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
