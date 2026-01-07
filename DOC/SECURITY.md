# Hướng dẫn bảo mật cho repo public

## Quy tắc không commit secrets

- Tuyệt đối không commit các dữ liệu bí mật: khóa API, token, mật khẩu, private key, chứng chỉ, file service account.
- Luôn dùng biến môi trường hoặc kho bí mật của CI/CD để lưu secrets.
- Kiểm tra lại trước khi push: `git status` + rà soát thay đổi mới.

## Quy trình xử lý khi lộ secrets

1) **Khoá/thu hồi ngay**: xoá hoặc vô hiệu hóa secret bị lộ.
2) **Luân phiên khoá (rotate keys)**: tạo khoá mới, cập nhật hệ thống sử dụng, thu hồi khoá cũ.
3) **Xoá khỏi lịch sử Git (history purge)**:
   - Dùng công cụ như `git filter-repo` để loại bỏ bí mật khỏi toàn bộ lịch sử.
   - Force push và thông báo cho toàn bộ thành viên reset lại clone.
4) **Rà soát hậu quả**: kiểm tra log truy cập, giới hạn quyền, cập nhật chính sách.

## Ghi chú

- Repo public luôn giả định “đã lộ”. Không lưu bất kỳ secrets nào trong mã nguồn.
- Nếu cần hỗ trợ gỡ lịch sử, hãy phối hợp với maintainer.
