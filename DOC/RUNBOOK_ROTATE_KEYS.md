# Runbook luân phiên khoá (Rotate Keys) - SpaceColors

Mục tiêu: thay khoá an toàn, giảm rủi ro lộ bí mật, không gián đoạn dịch vụ.

## Danh mục khoá cần rotate

1) **GitHub**
   - Personal Access Token (PAT)
   - GitHub App private key
   - Deploy key
2) **Firebase / GCP**
   - Service account key (JSON)
   - Firebase Admin SDK key
3) **API trả phí**
   - Khoá truy cập của các dịch vụ trả phí (email, SMS, AI, maps, v.v.)
4) **JWT / Session**
   - JWT signing secret
   - Session secret

## Thứ tự ưu tiên

1) **Khoá có rủi ro cao nhất**: khoá có quyền admin, quyền ghi, hoặc phạm vi rộng.
2) **Khoá dùng cho production**: ảnh hưởng trực tiếp người dùng.
3) **Khoá chia sẻ nhiều dịch vụ**: tránh lan truyền rủi ro.
4) **Khoá cho môi trường dev/test**: ít rủi ro hơn, nhưng vẫn cần rotate.

## Quy trình thực hiện (không ghi secret)

1) Tạo khoá mới trong hệ thống nguồn (GitHub/GCP/API).
2) Cập nhật khoá mới vào nơi lưu secrets (CI/CD, secret manager).
3) Triển khai/cập nhật dịch vụ sử dụng khoá mới.
4) Xác nhận hệ thống hoạt động bình thường.
5) Thu hồi/xoá khoá cũ.

## Checklist sau rotate

- [ ] Deploy thành công (CI/CD không lỗi)
- [ ] Đăng nhập hoạt động bình thường
- [ ] Functions/Backend gọi API không lỗi
- [ ] Không còn cảnh báo secret scan mới
- [ ] Ghi nhận thời điểm rotate + người thực hiện

## Lưu ý an toàn

- Không lưu hoặc chia sẻ khoá qua kênh không an toàn.
- Không commit khoá vào repo.
- Nếu nghi ngờ lộ khoá, ưu tiên rotate ngay.
