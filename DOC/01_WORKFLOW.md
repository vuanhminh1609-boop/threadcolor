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
