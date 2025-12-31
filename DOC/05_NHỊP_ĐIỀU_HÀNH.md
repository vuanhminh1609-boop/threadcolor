# 05_NHỊP_ĐIỀU_HÀNH — Cadence 8Portals

> Mục tiêu: vận hành như “ông lớn” nhưng gọn. Ít họp, nhiều đầu ra.

---

## 1) Nhịp hằng ngày (5–10 phút)
**Người gửi:** Thư ký tổng (GPT)  
**Đầu vào:** CEO_COCKPIT + health-trend + NOW + repo_health (artifact)  
**Đầu ra:** Daily Brief (≤ 20 dòng) gồm:
1) Radar: Score/BLOCK/WARN + trend 7 ngày  
2) Top 3 P0 (nếu có)  
3) Top 3 P1 (dọn sạch/tối ưu)  
4) Rủi ro (≤ 2 dòng)  
5) Quyết định cần gật (1–2)  
6) 3 câu lệnh đề xuất (copy/paste)

---

## 2) Nhịp hằng tuần (30 phút)
**Thời điểm gợi ý:** Chủ nhật 20:00  
**Mục tiêu:** chốt “tuần này làm gì” (Top 3) và “không làm gì” (anti-goals)

**Agenda:**
- 10’ xem trend (score/WARN)  
- 10’ chốt Top 3 + anti-goals  
- 10’ chốt 1 quyết định quan trọng (ghi DECISIONS)

**Đầu ra:**
- Cập nhật `DOC/01_NOW.md`
- Cập nhật `DOC/ACTIONS.md` (Top 3 tuần)

---

## 3) Nhịp hằng tháng (60 phút) — chỉ khi nền ổn
**Mục tiêu:** review kiến trúc + roadmap hệ sinh thái (world/data/community)

**Đầu ra:**
- 1 “chốt kiến trúc” ngắn (ADR/ghi chú) nếu có thay đổi lớn
- 1 “gói tối ưu” (perf/UX/data) cho tháng tiếp theo

---

## 4) Quy tắc báo cáo (để luôn “sang & sạch”)
- Mỗi mục tối đa 3 bullet.
- Có BLOCK → đưa lên đầu, không bàn chuyện đẹp.
- Quarantine 7 ngày trước khi xoá hẳn.

