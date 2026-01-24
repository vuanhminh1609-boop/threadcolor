# Lộ trình & Blueprint liên thông 8 World

Mục tiêu: tạo “vòng tròn hệ sinh thái thịnh vượng” để người dùng đi từ khám phá → chọn màu → chuyển đổi → lưu trữ → chia sẻ → remix → quay lại, không đứt mạch trải nghiệm.

## 1) Nguyên tắc lõi
- Nhỏ mà chất: thêm đúng điểm chạm, không refactor lớn.
- Chuẩn hoá nhận màu đầu vào giữa World: `?color=#RRGGBB`, `#p=`, `#g=`, `#c=`.
- CTA liên World đặt đúng ngữ cảnh, không ép điều hướng khi chưa có dữ liệu.
- Một vòng tròn khép kín: mỗi World tối thiểu 2 “đi/đến”.

## 2) Vòng tròn hệ sinh thái
1. **World1 (Màu thêu)** → tra mã chỉ theo màu/ảnh.
2. **World3 (Bảng phối màu)** → khám phá, chọn cụm màu.
3. **World2 (Dải chuyển màu)** → tinh chỉnh cảm xúc màu theo hướng/góc.
4. **World4 (Màu in/CMYK)** → kiểm tra TAC/gamut.
5. **World5 (Thư viện)** → lưu tài sản màu chuẩn.
6. **World7 (Ảnh → màu)** → trích palette từ ảnh.
7. **World8 (Chia sẻ/Remix)** → chia sẻ, remix về Thư viện.
8. **World6 (Sơn&Vải)** → mô phỏng vật liệu, trả về palette/gradient.

## 3) Tiêu chí “Đẹp + Mượt + Sang + Đã + Nghiện + Workflow mạnh”
- **Đẹp**: bảng màu, swatch, typography thống nhất; không lệch topbar.
- **Mượt**: thao tác tức thì; debounce search; không lag khi render nhiều swatch.
- **Sang**: UI tối giản, màu nền sang; CTA rõ ràng, không ồn.
- **Đã**: mỗi thao tác cho kết quả ngay tại chỗ.
- **Nghiện**: vòng lặp khám phá → lưu → remix → quay lại.
- **Workflow mạnh**: handoff rõ ràng, CTA đúng điểm, không mất trạng thái.

## 4) Blueprint CTA liên World (tối thiểu)
- **World1**: mở Palette / Gradient / In.
- **World2**: mở Palette / In.
- **World3**: mở Gradient / In.
- **World4**: mở Palette / Gradient.
- **World5**: mở Thêu / Palette / Gradient.
- **World6**: mở Palette / Gradient.
- **World7**: mở Palette / Gradient / Thêu.
- **World8**: mở Thư viện / Palette.

## 5) Roadmap triển khai nhỏ mà chất
### Giai đoạn 1 — Chuẩn hoá nhận màu (ngay)
- Đồng nhất link mẫu: `?color=#RRGGBB`, `#p=`, `#g=`, `#c=`.
- Thêm CTA liên World ở đúng điểm.

### Giai đoạn 2 — Handoff nâng cao
- Đọc `assetId/projectId` để mở asset trong World đích.
- Duy trì lịch sử chuyển đổi trong Library.

### Giai đoạn 3 — Sức mạnh cộng đồng
- Remix/Share làm giàu vòng tròn tài sản màu.
- Gắn điểm thưởng cho tài sản chất lượng.

## 6) Checklist kiểm thử
- [ ] CTA mỗi World ≥ 2 nút đi/đến đúng URL.
- [ ] Link mẫu đúng chuẩn `?color/#p/#g/#c`.
- [ ] Không lệch topbar, không phá layout.
- [ ] Không spam console.
