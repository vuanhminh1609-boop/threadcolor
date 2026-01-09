# Hướng dẫn test nhanh (P0)

## 1) Test không có token (bị chặn)
```bash
curl -i https://<your-host>/admin/ping
```
Kỳ vọng: HTTP 401 hoặc 403, message tiếng Việt.

## 2) Test token giả (bị chặn)
```bash
curl -i \
  -H "X-Auth-Token: <TOKEN_GIẢ_LẬP>" \
  https://<your-host>/admin/ping
```
Kỳ vọng: HTTP 401 hoặc 403, message tiếng Việt.

## 3) Test token thật (P1)
Hiện client chưa có firebaseConfig ở môi trường production.  
P1 sẽ bổ sung luồng lấy ID token thật từ client admin.
