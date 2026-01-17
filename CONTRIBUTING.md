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

## Cổng kiểm tra mã hoá (Encoding gate)
Cổng kiểm tra mã hoá là lớp kiểm soát phát hiện chuỗi vỡ dấu hoặc mã hoá sai trong tài liệu và cấu hình, để tránh lỗi hiển thị tiếng Việt trên UI/CI.

Cách chạy local:
```bash
npm run check:encoding
```

Sửa nhanh:
```bash
node scripts/fix-mojibake.mjs <file...>
```

Checklist khi CI fail:
1) Chạy `npm run check:encoding` để xem file/line bị báo.
2) Chạy `node scripts/fix-mojibake.mjs <file...>` hoặc sửa tay đúng ký tự.
3) Chạy lại `npm run check:encoding` và đảm bảo không còn findings.

## Definition of Done (tối thiểu)
- Không lỗi console.
- Dòng “Xong. Dữ liệu đã sẵn sàng.” vẫn xuất hiện khi ready.
- “Tìm mã chỉ gần nhất” trả kết quả.
