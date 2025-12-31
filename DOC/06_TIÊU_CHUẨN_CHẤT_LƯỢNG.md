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

