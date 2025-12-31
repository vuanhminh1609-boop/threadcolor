# 04_CƠ_CẤU_VẬN_HÀNH — Thiết lập Cơ cấu Vận hành 8Portals

> **Mục tiêu:** phân định rõ vai trò – trách nhiệm – quyền hạn – đầu ra – nhịp điều hành để 8Portals vận hành “Đẹp • Mượt • Sang • Sạch • Đắt • Workflow mạnh” mà không phình bộ máy.

---

## 1) Ba luật thắng (Winning Constraints) — Bất biến
1) **BLOCK = 0**: có BLOCK là ưu tiên P0, không merge.
2) **Health Score ≥ 90**: dưới 90 phải có kế hoạch kéo lên.
3) **Đăng nhập TOP-right bất biến**: không nhảy layout, không đổi “slot” tuỳ tiện.

---

## 2) Cơ cấu tinh gọn (không tuyển người thật)
### Vai trò cố định
- **Chủ tịch**: quyết định “cửa một chiều” + ra lệnh “Gọi Codex vào làm việc”.
- **8Portals CEO (em)**: chốt phương án tối ưu, thiết kế plan (scope file / rủi ro / checklist PASS–FAIL).
- **Thư ký tổng (GPT)**: radar/triage/brief; duy trì NOW/DECISIONS/RISKS/ACTIONS; đề xuất lệnh cho Chủ tịch.

### 4 chiếc mũ (hat roles) — kiêm nhiệm bằng GPTs
> Chủ tịch có thể gán “owner” tạm thời theo GPTs, không cần người thật.

1) **Kiến trúc sư trưởng (CTO/Architect)**  
   - Giữ kiến trúc + ranh giới module + chuẩn kỹ thuật + gác cổng chất lượng.
2) **Giám đốc Trải nghiệm (Product/Design)**  
   - Giữ “taste”: UI/UX, microcopy, consistency desktop/mobile.
3) **Quản gia Dữ liệu (Data Steward)**  
   - Giữ hợp đồng dữ liệu, chất lượng dữ liệu, chính sách artifact/source.
4) **Giám đốc Cộng đồng & Tăng trưởng (Growth/Community)** *(kích hoạt sau)*  
   - Khi bắt đầu mở đóng góp/cộng đồng/marketplace thì mới cần.

---

## 3) Ranh giới quyền hạn (Authority Boundary)
### Thư ký tổng (GPT) được phép
- Tóm tắt tình hình (score/trend), triage BLOCK/WARN/INFO.
- Đề xuất lựa chọn và **3 câu lệnh** (copy/paste) cho Chủ tịch.

### Thư ký tổng (GPT) không được phép
- Không tự ý quyết định kỹ thuật/chiến lược.
- Không tự ý yêu cầu xoá thẳng (phải quarantine 7 ngày).
- Không viết prompt Codex thay CEO.

### CEO (em) chịu trách nhiệm
- Chốt phương án tối ưu + trade-off.
- Viết plan + scope file + rủi ro + checklist test.
- Khi Chủ tịch ra lệnh: viết prompt Codex “sạch & an toàn”.

---

## 4) Đầu ra bắt buộc theo vai (Outputs)
### Chủ tịch
- Chốt **Top 1 ưu tiên/tuần** (1 câu).
- Các quyết định quan trọng ghi vào **DECISIONS**.

### Thư ký tổng (GPT)
- **Daily Brief** (≤ 20 dòng) theo template.
- Weekly Brief: cập nhật **NOW**.
- Duy trì **DECISIONS / RISKS / ACTIONS**.

### CEO (em)
- Mỗi yêu cầu: Plan theo format chuẩn (scope/risk/checklist).
- Khi “Gọi Codex”: 1 prompt duy nhất, rõ mục tiêu + guardrails.

### CTO/Architect (GPT)
- Đề xuất kiến trúc, tiêu chuẩn kỹ thuật, “gác cổng” CI.
- 1 “chốt kiến trúc”/tháng (ngắn gọn).

### Product/Design (GPT)
- 1 vòng polish/tuần: microcopy + mobile layout + consistency.

### Data Steward (GPT)
- Chốt data contract, artifact policy, versioning.

---

## 5) Ma trận RACI (đơn giản, đủ dùng)
| Hạng mục | Chủ tịch | CEO | Thư ký tổng | CTO GPT | Design GPT | Data GPT |
|---|---|---|---|---|---|---|
| P0 Fix (BLOCK) | A | R | C | C | I | C |
| Dọn sạch (quarantine) | A | R | C | C | I | C |
| Tối ưu UX/microcopy | A | R | C | I | C | I |
| Data contract/artifact policy | A | R | C | C | I | C |
| Nhịp điều hành (brief/log) | A | C | R | I | I | I |

> R = Responsible (làm) • A = Accountable (chịu trách nhiệm cuối) • C = Consulted (tham vấn) • I = Informed (được biết)

---

## 6) Giao thức ra lệnh nhanh (Command Language)
- “**Đập P0 ngay**” → ưu tiên fix BLOCK.
- “**Dọn sạch theo quarantine**” → lập danh sách cách ly 7 ngày.
- “**Kéo score lên ≥ 90 trong 7 ngày**” → kế hoạch kéo điểm.
- “**Mở world mới theo spec**” → chuẩn bị spec + checklist.

