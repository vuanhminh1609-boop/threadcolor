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

## Deploy Firebase Hosting (Production/Preview)
- Production: workflow chạy khi push/merge vào `main`.
- Preview: workflow chạy khi có pull request vào `main`, deploy preview channel `pr-<số>`.

### Thiết lập secrets trên GitHub
1) Vào **Settings → Secrets and variables → Actions → New repository secret**
2) Tạo **một trong hai**:
   - `FIREBASE_SERVICE_ACCOUNT` (khuyến nghị): nội dung JSON service account.
   - `FIREBASE_TOKEN` (fallback): token từ `firebase login:ci`.
Workflow sẽ ưu tiên `FIREBASE_SERVICE_ACCOUNT`, nếu không có sẽ dùng `FIREBASE_TOKEN`.
