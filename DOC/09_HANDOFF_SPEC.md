# Handoff Spec — Chuẩn nhận màu giữa các World

Mục tiêu: thống nhất quy ước truyền màu tối thiểu để mọi World hiểu nhau, không cần refactor lớn.

## 1) Quy ước đường dẫn tối thiểu
- **Thêu (ThreadColor)**: `?color=#RRGGBB`
- **Palette**: `#p=#RRGGBB,#RRGGBB,...`
- **Gradient**: `#g=#RRGGBB,#RRGGBB,...`
- **CMYK**: `#c=#RRGGBB,#RRGGBB,...`
- **Mã đệm (bufferId)**: `?bufferId=buf_xxx` để mang palette tạm giữa các World.

Ghi chú:
- Dùng dấu `#` trong hash, khi cần encode URL thì dùng `%23`.
- Có thể truyền 1 màu hoặc nhiều màu (mảng).
- Thứ tự màu được giữ nguyên.

## 2) Ví dụ URL
- `../worlds/threadcolor.html?color=%23F472B6`
- `../worlds/palette.html#p=%23F472B6,%230EA5A8,%23F59E0B`
- `../worlds/gradient.html#g=%23F472B6,%230EA5A8,%23F59E0B`
- `../worlds/printcolor.html#c=%23F472B6`
- `../worlds/palette.html?assetId=asset_1690000000000`
- `../worlds/gradient.html?bufferId=buf_1690000000000_abcd#p=%23F472B6,%230EA5A8`

## 3) Ưu tiên đọc dữ liệu
1. `?assetId=` (mở đúng asset trong Thư viện).
2. `?bufferId=` (mã đệm mang palette tạm).
3. Hash `#p/#g/#c` (nếu có).
4. Query `?color` (fallback).

## 4) CTA liên World — tiêu chuẩn nhãn
- “Mở ở Thêu”
- “Mở ở In”
- “Tạo Palette”
- “Tạo Gradient”
- “Lưu vào Thư viện”

## 5) Mẫu dữ liệu dùng trong CTA
Nên dùng 1–3 màu tiêu biểu:
- `#F472B6` (hồng),
- `#0EA5A8` (xanh ngọc),
- `#F59E0B` (vàng).

## 6) Quy tắc an toàn
- Không log màu nhạy cảm vào console.
- CTA không chặn luồng chính nếu lỗi.
- Topbar/ID/class hiện có giữ nguyên.
