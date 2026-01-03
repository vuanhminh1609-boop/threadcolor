# NORTH STAR — TMTC-7

## 1) North Star Metric (NSM)

**NSM:** TMTC-7  
**Tên đầy đủ:** Tỷ lệ Màu Thêu Chuẩn trong 7 ngày

### Định nghĩa thành công
Một người dùng đạt “thành công” nếu trong 7 ngày gần nhất:
- Thực hiện tra cứu màu chỉ hợp lệ, và
- Có ít nhất 1 kết quả phù hợp (trong ngưỡng ΔE hiện tại), và
- Có hành động sử dụng kết quả (lưu vào kho chỉ, mở inspector, hoặc copy mã).

### Công thức gợi ý
```
TMTC-7 = (Số người dùng đạt “thành công” trong 7 ngày) / (Tổng số người dùng hoạt động trong 7 ngày)
```

> Ghi chú: “người dùng hoạt động” = có ít nhất 1 hành động tra cứu hoặc chọn màu trong 7 ngày.

## 2) 3 Leading Indicators (dẫn dắt)

1) **TTGP** — Tỷ lệ Tra cứu Gần đúng thành công  
   - Công thức: số tra cứu có kết quả / tổng số tra cứu
2) **TLC** — Tỷ lệ Lưu vào Kho chỉ  
   - Công thức: số lượt lưu / số lượt xem kết quả
3) **TLK** — Tỷ lệ Lựa chọn kết quả  
   - Công thức: số lượt mở inspector hoặc copy mã / số lượt xem kết quả

## 3) Guardrail đề xuất

- **P0 ổn định:** “Tìm mã chỉ gần nhất” phải luôn trả kết quả khi dữ liệu sẵn sàng.  
- **Không làm chậm UI:** tra cứu phải mượt, không giật khi kéo ΔE hoặc đổi hãng.  
- **Không rỗng dữ liệu:** bật “Chỉ đã xác minh” không được trống khó hiểu.  
- **Bảo mật & riêng tư:** dữ liệu người dùng không bị lộ qua logs hoặc UI.  

## 4) Ghi chú triển khai

- TMTC-7 ưu tiên phản ánh hiệu quả sản phẩm thay vì số lượng thao tác.  
- 3 chỉ số dẫn dắt giúp tối ưu hành vi trước khi tối ưu NSM.  
