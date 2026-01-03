# DEV_EMULATORS — Hướng dẫn chạy Firebase Emulator Suite

## 1) Mục tiêu
Chạy local: Hosting + Functions + Firestore (không cần deploy).

## 2) Chuẩn bị
### Cài dependencies cho Functions
```bash
cd functions
npm install
```

### (Tuỳ chọn) Build TypeScript trước khi chạy
```bash
npm run build
```

## 3) Chạy Emulator Suite
Từ repo root:
```bash
firebase emulators:start
```

Các cổng mặc định (đã cấu hình):
- Hosting: http://localhost:5000
- Functions: http://localhost:5001
- Firestore: http://localhost:8080
- Emulator UI: http://localhost:4000

## 4) Smoke test telemetry
1) Mở trang ThreadColor qua Hosting emulator:
   - http://localhost:5000/worlds/threadcolor.html
2) Thực hiện các thao tác:
   - Tra màu, có kết quả
   - Ghim / Copy / Lưu kho chỉ
3) DevTools → Network:
   - Xác nhận request POST tới `/telemetry/ingest` trả 200.
4) Firestore emulator:
   - Kiểm tra collection `metrics_daily/{YYYY-MM-DD}`
   - Thấy các trường đếm (`search_start`, `search_result`, `pin`, `copy`, `save`) tăng.

## 5) Lưu ý quan trọng
- Emulator không ảnh hưởng production.
- Nếu thiếu `firebaseConfig` ở client, cần cấu hình phù hợp để test auth.
- Nếu Functions không build, hãy chạy `npm run build` trong `functions/`.
