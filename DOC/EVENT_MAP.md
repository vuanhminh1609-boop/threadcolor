# EVENT MAP — Sự kiện tối thiểu

## 1) Mục tiêu
Đảm bảo theo dõi đủ hành vi để tính TMTC-7 và 3 chỉ số dẫn dắt (TTGP/TLC/TLK).

## 2) Danh sách sự kiện tối thiểu

### A. Tra cứu & kết quả
- `tc.search.nearest`
  - `hex` (string)
  - `method` (string: DE76/DE2000)
  - `brands` (array)
  - `verifiedOnly` (boolean)
  - `resultCount` (number)

- `tc.search.by_code`
  - `query` (string)
  - `brandMatched` (boolean)
  - `resultCount` (number)

### B. Hành vi sử dụng kết quả
- `tc.result.open_inspector`
  - `brand` (string)
  - `code` (string)
  - `hex` (string)
  - `delta` (number | null)

- `tc.result.copy_code`
  - `brand` (string)
  - `code` (string)

- `tc.result.copy_full`
  - `brand` (string)
  - `code` (string)
  - `name` (string | null)
  - `hex` (string)

### C. Kho chỉ (lưu)
- `tc.vault.save_session`
  - `hex` (string)
  - `brandCount` (number)
  - `resultCount` (number)

- `tc.vault.save_item`
  - `brand` (string)
  - `code` (string)
  - `hex` (string)

## 3) Thuộc tính chuẩn (chuẩn hoá)
- `userId` (string | null)
- `ts` (ISO timestamp)
- `world` (string)
- `page` (string)
- `sessionId` (string)

> Ghi chú: danh sách sự kiện là tối thiểu, có thể mở rộng theo nhu cầu.
