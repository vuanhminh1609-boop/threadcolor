# Hướng dẫn xuất repo để chia sẻ phân tích

Mục tiêu: tạo gói repo phục vụ phân tích mà **không lộ bí mật**. Script hỗ trợ 2 lựa chọn:
- Snapshot zip (không lịch sử Git): `repo_snapshot.zip`
- Git bundle (có lịch sử): `repo.bundle`

Snapshot ưu tiên đóng gói theo danh sách file tracked (`git ls-files`). Tùy chọn `IncludeDirty` cho phép kèm patch diff khi repo đang có thay đổi.

## Cách chạy

### macOS / Linux (Bash)

```bash
bash tools/export_repo_snapshot.sh --mode both
```

Kèm patch diff nếu repo có thay đổi:

```bash
bash tools/export_repo_snapshot.sh --mode both --include-dirty
```

### Windows (PowerShell)

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\tools\export_repo_snapshot.ps1 -Mode both
```

Kèm patch diff nếu repo có thay đổi:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\tools\export_repo_snapshot.ps1 -Mode both -IncludeDirty
```

## Kết quả sinh ra

Sau khi chạy, thư mục root sẽ có:
- `repo_snapshot.zip`
- `repo.bundle`
- `repo_manifest.txt`

Nếu bật `IncludeDirty` và repo có thay đổi, sẽ có thêm:
- `repo_dirty.patch`

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

- Nặng: vô tình đóng gói secret -> **bắt buộc kiểm tra cảnh báo** trước khi gửi.
- Vừa: thiếu file do submodule/LFS -> kiểm tra và bổ sung hướng dẫn.
- Nhẹ: thiếu dotfiles -> snapshot chỉ gồm file tracked, nên kiểm tra bằng `repo_manifest.txt`.

## Checklist tự test (PASS/FAIL)

- [ ] Tạo zip/bundle thành công
- [ ] `repo_manifest.txt` được sinh ra
- [ ] Snapshot chỉ gồm file tracked theo `git ls-files`
- [ ] Cảnh báo secret hoạt động nếu có file nhạy cảm
