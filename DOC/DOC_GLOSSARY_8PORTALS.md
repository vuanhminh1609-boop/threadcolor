# Từ điển thuật ngữ 8Portals (Việt hoá 100%)

> Mục tiêu: thống nhất ngôn ngữ chung trong repo 8Portals để trao đổi nhanh – rõ – “sang & sạch”.
>
> **Quy ước bất biến (không đổi tên):**
> 1) **DSG- DigitalSpaceGroup** — *Tập đoàn phát triển kỹ thuật công nghệ và không gian số (Công ty mẹ)*  
> 2) **SpaceColors - 8Portals** — *Công ty con*

---

## 1) Thuật ngữ tổ chức & vận hành

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| CEO | Tổng giám đốc điều hành | Người chốt phương án tối ưu, ra quyết định ưu tiên, chịu trách nhiệm kết quả. |
| Thư ký tổng | Chánh văn phòng điều hành | Người tổng hợp – phân loại – nhắc nhịp, tạo “brief 1 trang” + lệnh đề xuất cho Chủ tịch. |
| Thiết lập Cơ cấu Vận hành | Thiết lập Cơ cấu Vận hành | Xác định vai trò–trách nhiệm–quyền hạn–đầu ra–nhịp điều hành để tổ chức chạy nhanh và không loạn. |
| Nhịp điều hành | Nhịp điều hành | Lịch lặp: hằng ngày/tuần/tháng (brief, cập nhật ưu tiên, review rủi ro). |
| Sổ quyết định | Nhật ký quyết định | Bảng ghi: ngày, quyết định, lý do, rủi ro, tiêu chí quay đầu. |
| Sổ rủi ro | Danh mục rủi ro | Bảng rủi ro: xác suất/tác động, chủ sở hữu, kế hoạch giảm rủi ro. |
| Hàng đợi hành động | Danh sách hành động | Bảng việc cần làm: mức độ, owner, hạn, trạng thái. |
| Chỉ số bắc cầu | Chỉ số dẫn dắt | Chỉ số báo trước thành công (ví dụ: tỉ lệ tìm thấy đúng màu, thời gian tìm kiếm). |
| Chỉ số kết quả | Chỉ số kết quả | Chỉ số “đích” (ví dụ: số người dùng hoạt động, số bộ dữ liệu được dùng). |

---

## 2) Thuật ngữ sản phẩm (Portal/World)

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Portal | Cổng | Điểm vào/điều hướng đến các “Thế giới”. |
| World | Thế giới | Một không gian chức năng độc lập trong 8Portals (ví dụ: Màu thêu, Kho chỉ). |
| ThreadColor | Thế giới Màu thêu (ThreadColor) | Thế giới tra cứu/gợi ý màu chỉ. |
| ThreadVault | Thế giới Kho chỉ (ThreadVault) | Thế giới quản lý/bộ sưu tập chỉ và dữ liệu liên quan. |
| Palette | Thế giới Dải màu (Palette) | Thế giới tạo/ghép/dùng dải màu; có thể là “Sắp ra mắt”. |
| Topbar | Thanh trên | Thanh điều hướng trên cùng; phải giữ **Đăng nhập** ở góc phải. |
| Slot đăng nhập | Vị trí Đăng nhập | Khu vực “neo” hiển thị đăng nhập/đăng xuất ở top-right (không được đổi tuỳ tiện). |
| Microcopy | Vi mô ngôn từ | Câu chữ ngắn trong UI (nhãn nút, mô tả) — phải “đắt và sạch”. |
| Trạng thái rỗng | Màn hình rỗng | UI khi chưa có dữ liệu (phải sang, không xin lỗi). |
| Trạng thái lỗi | Màn hình lỗi | UI khi có lỗi (gọn, rõ, không hoảng). |

---

## 3) Thuật ngữ dữ liệu & chất lượng dữ liệu

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Source of truth | Nguồn dữ liệu gốc | Nguồn chính thức, mọi thứ khác sinh ra từ đây (ví dụ: `threads.json`). |
| Ngu&#7891;n s&#7921; th&#7853;t (single source of truth) | Ngu&#7891;n s&#7921; th&#7853;t (single source of truth) | Ngu&#7891;n d&#7919; li&#7879;u th&#7889;ng nh&#7845;t &#273;&#7875; tr&#225;nh l&#7879;ch s&#7889; (ngu&#7891;n d&#7919; li&#7879;u th&#7889;ng nh&#7845;t &#273;&#7875; tr&#225;nh l&#7879;ch s&#7889;). |
| M&#225;y tr&#7841;ng th&#225;i (state machine) | M&#225;y tr&#7841;ng th&#225;i (state machine) | Quy t&#7855;c chuy&#7875;n &#273;&#7893;i tr&#7841;ng th&#225;i loading/ok/warning/error (quy t&#7855;c chuy&#7875;n &#273;&#7893;i tr&#7841;ng th&#225;i loading/ok/warning/error). |
| Data contract | Hợp đồng dữ liệu | Quy ước: file nào là gốc, file nào là sinh ra, schema, phiên bản, cách cập nhật. |
| JSON Schema | JSON Schema | Chuan mo ta cau truc JSON de kiem tra hop le (chuan mo ta cau truc JSON de kiem tra hop le). |
| SemVer | SemVer | Chuan danh phien ban MAJOR.MINOR.PATCH (chuan danh phien ban MAJOR.MINOR.PATCH). |
| Manifest hop dong | Manifest hop dong | Tep ke khai: dataset nao dung schema nao + phien ban + checksum (tep ke khai: dataset nao dung schema nao + phien ban + checksum). |
| Danh m&#7909;c t&#7879;p (manifest) | Danh m&#7909;c t&#7879;p (manifest) | Danh s&#225;ch li&#7879;t k&#234; t&#7879;p trong repo/snapshot &#273;&#7875; ki&#7875;m tra v&#224; &#273;&#7889;i chi&#7871;u. |
| JSONL | JSON Lines | Dinh dang JSON Lines: moi dong la 1 JSON, phu hop log/audit (dinh dang JSON Lines: moi dong la 1 JSON, phu hop log/audit). |
| Checksum | Checksum | Chuoi kiem chung toan ven du lieu (chuoi kiem chung toan ven du lieu). |
| Báo cáo chênh lệch dữ liệu (Data diff report) | Báo cáo chênh lệch dữ liệu (Data diff report) | Báo cáo so sánh dữ liệu giữa hai phiên bản để thấy phần thay đổi tăng/giảm/khác biệt. |
| SHA-256 | SHA-256 | Ham bam tao dau van tay noi dung (ham bam tao dau van tay noi dung). |
| Ajv | Ajv | Thu vien Node.js de kiem tra JSON Schema (thu vien Node.js de kiem tra JSON Schema). |
| CI gate | CI gate | Cong chan trong CI de ngan loi vao main (cong chan trong CI de ngan loi vao main). |
| Qu&#233;t b&#237; m&#7853;t (secret scan) | Qu&#233;t b&#237; m&#7853;t (secret scan) | Qu&#233;t t&#236;m kho&#225;/b&#237; m&#7853;t trong code v&#224; l&#7883;ch s&#7917; &#273;&#7875; ng&#259;n r&#242; r&#7881;. |
| gitleaks:allow (ch&#250; th&#237;ch &#273;&#7875; Gitleaks b&#7887; qua m&#7897;t ph&#225;t hi&#7879;n c&#7909; th&#7875; &#7903; &#273;&#250;ng d&#242;ng code) | gitleaks:allow | Comment g&#7855;n &#7903; &#273;&#250;ng d&#242;ng nh&#7857;m b&#7887; qua m&#7897;t ph&#225;t hi&#7879;n c&#7909; th&#7875;, kh&#244;ng &#7843;nh h&#432;&#7903;ng ph&#7841;m vi kh&#225;c. |
| Si&#7871;t CI (harden CI) | Si&#7871;t CI (harden CI) | Si&#7871;t quy tr&#236;nh CI/CD &#273;&#7875; gi&#7843;m r&#7911;i ro (th&#234;m ki&#7875;m tra, ch&#7881;nh ph&#226;n quy&#7873;n). |
| additionalProperties | additionalProperties | Tuy chon cua JSON Schema cho phep field phat sinh (tuy chon cua JSON Schema cho phep field phat sinh). |
| authResolved | authResolved | Trang thai da xac dinh dang nhap hay chua (trang thai da xac dinh dang nhap hay chua). |
| Migration | Migration | Di tru du lieu khi doi schema (di tru du lieu khi doi schema). |
| Dry run | Dry run | Chay thu khong ghi du lieu (chay thu khong ghi du lieu). |
| Reproducible build | Reproducible build | Build tai lap nho lockfile (build tai lap nho lockfile). |
| Lockfile | Lockfile | Tep khoa phien ban phu thuoc, vi du package-lock.json (tep khoa phien ban phu thuoc, vi du package-lock.json). |
| Generated artifact | Tệp sinh ra | File do công cụ tạo (ví dụ: `threads.cleaned.json`) — thường không commit. |
| Raw sources | Dữ liệu thô | Nguồn thô đầu vào (ví dụ: `.tch`) dùng để tái tạo dữ liệu. |
| Validate | Kiểm tra hợp lệ | Kiểm tra cấu trúc/logic dữ liệu để phát hiện lỗi sớm. |
| Normalize | Chuẩn hoá | Biến dữ liệu về dạng thống nhất (tên, mã, format). |
| Conflicts | Mâu thuẫn dữ liệu | Các điểm dữ liệu xung đột cần xử lý. |
| Versioning | Đánh phiên bản | Gắn phiên bản dữ liệu để cache và truy vết thay đổi. |

---

## 4) Thuật ngữ hiệu năng & trải nghiệm

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Modal (h&#7897;p tho&#7841;i ph&#7911;) | Modal (h&#7897;p tho&#7841;i ph&#7911;) | H&#7897;p n&#7893;i ch&#7863;n n&#7873;n &#273;&#7875; hi&#7875;n th&#7883; th&#244;ng tin/t&#225;c v&#7909;. |
| Ng&#7919; c&#7843;nh ch&#7891;ng l&#7899;p (stacking context) | Ng&#7919; c&#7843;nh ch&#7891;ng l&#7899;p (stacking context) | C&#417; ch&#7871; quy&#7871;t &#273;&#7883;nh l&#7899;p tr&#234;n/d&#432;&#7899;i khi c&#243; blur/transform. |
| L&#7899;p ph&#7911; (overlay layer) | L&#7899;p ph&#7911; (overlay layer) | L&#7899;p n&#7893;i nh&#432; menu/popup ph&#7843;i n&#7857;m tr&#234;n n&#7897;i dung. |
| N&#226;ng l&#7899;p theo tr&#7841;ng th&#225;i (is-open z-index) | N&#226;ng l&#7899;p theo tr&#7841;ng th&#225;i (is-open z-index) | K&#7929; thu&#7853;t t&#259;ng z-index cho row &#273;ang m&#7903; menu. |
| M&#7853;t &#273;&#7897; UI | M&#7853;t &#273;&#7897; UI | &#272;&#7897; tho&#225;ng giao di&#7879;n (&#273;i&#7873;u ch&#7881;nh kho&#7843;ng c&#225;ch/padding/gap). |
| Menu th&#7843; xu&#7889;ng | Menu th&#7843; xu&#7889;ng | B&#7843;ng ch&#7885;n m&#7903; ra khi b&#7845;m n&#250;t (dropdown menu). |
| Logo mark (bi&#7875;u t&#432;&#7907;ng logo) | Logo mark (bi&#7875;u t&#432;&#7907;ng logo) | Bi&#7875;u t&#432;&#7907;ng r&#250;t g&#7885;n c&#7911;a logo, d&#249;ng &#273;&#7891;ng h&#224;nh v&#7899;i t&#234;n th&#432;&#417;ng hi&#7879;u. |
| H&#236;nh vector (SVG) | H&#236;nh vector (SVG) | &#7842;nh d&#7841;ng vector, ph&#243;ng to kh&#244;ng v&#7905; v&#224; nh&#7865; cho UI. |
| &#7842;nh &#273;a &#273;&#7897; ph&#226;n gi&#7843;i (srcset) | &#7842;nh &#273;a &#273;&#7897; ph&#226;n gi&#7843;i (srcset) | Khai b&#225;o nhi&#7873;u m&#7913;c &#273;&#7897; ph&#226;n gi&#7843;i &#273;&#7875; tr&#236;nh duy&#7879;t t&#7921; ch&#7885;n. |
| Fallback (ph&#432;&#417;ng &#225;n d&#7921; ph&#242;ng) | Fallback (ph&#432;&#417;ng &#225;n d&#7921; ph&#242;ng) | Ph&#432;&#417;ng &#225;n d&#7921; ph&#242;ng khi t&#224;i nguy&#234;n ch&#237;nh kh&#244;ng d&#249;ng &#273;&#432;&#7907;c. |
| L&#432;u c&#7909;c b&#7897; | L&#432;u c&#7909;c b&#7897; | L&#432;u l&#7921;a ch&#7885;n tr&#234;n tr&#236;nh duy&#7879;t b&#7857;ng localStorage. |
| S&#7921; ki&#7879;n tu&#7923; bi&#7871;n | S&#7921; ki&#7879;n tu&#7923; bi&#7871;n | CustomEvent &#273;&#7875; &#273;&#7891;ng b&#7897; tr&#7841;ng th&#225;i gi&#7919;a c&#225;c kh&#7889;i UI. |
| Worker | Tiến trình phụ | Chạy tác vụ nặng (tìm kiếm, lập chỉ mục) ngoài luồng chính để UI mượt. |
| Main thread | Luồng chính | Luồng chạy UI; càng ít việc càng mượt. |
| Index | Lập chỉ mục | Chuẩn bị cấu trúc tra cứu nhanh (theo mã, hãng, màu). |
| Cache | Bộ nhớ đệm | Lưu tạm kết quả để tải nhanh hơn. |
| Debounce | Trễ có chủ đích | Chờ người dùng dừng gõ rồi mới tìm, tránh giật. |
| Virtual list | Danh sách ảo | Chỉ render phần đang nhìn thấy để khỏi lag. |
| Latency | Độ trễ | Thời gian chờ phản hồi. |

---

## 5) Thuật ngữ kiểm thử & “gác cổng chất lượng”

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Smoke test | Kiểm tra khói | Kiểm tra nhanh: trang có mở được, file có tải được, không 404. |
| Checklist PASS/FAIL | Danh sách đạt/không đạt | Danh sách test ngắn gọn để xác nhận thay đổi an toàn. |
| Gate | Cổng chặn | Quy tắc bắt buộc phải qua trước khi merge (ví dụ: không có BLOCK). |
| Cổng kiểm tra mã hoá (Encoding gate) | Cổng kiểm tra mã hoá (Encoding gate) | Cổng CI chặn merge khi phát hiện chuỗi vỡ dấu hoặc mã hoá sai trong tài liệu. |
| Mojibake (lỗi vỡ dấu do sai mã hoá) | Mojibake | Hiện tượng chữ bị vỡ dấu do đọc sai mã hoá. Ví dụ ở khối code bên dưới. |
| Repo Doctor | Bác sĩ kho mã | Công cụ quét repo: lỗi gãy (BLOCK), cảnh báo (WARN), thông tin (INFO). |
| Health Score | Điểm sức khoẻ | Điểm 0–100 phản ánh tình trạng repo theo quy tắc đã thống nhất. |
| Trend 7 ngày | Xu hướng 7 ngày | Chuỗi điểm/đếm trong 7 ngày gần nhất để xem tiến hay lùi. |
| BLOCK | Chặn khẩn cấp | Lỗi mức P0: làm gãy chạy/thiếu file runtime/syntax… => không merge. |
| WARN | Cảnh báo | Vấn đề cần dọn/tối ưu nhưng chưa làm gãy hệ. |
| INFO | Ghi nhận | Thông tin thống kê, không phải lỗi. |
| Quarantine | Cách ly 7 ngày | Chuyển file “nghi thừa” vào `_graveyard/` trước khi xoá hẳn. |
| Graveyard | Nghĩa địa tạm | Thư mục `_graveyard/` chứa file cách ly. |

Ví dụ mojibake (minh hoạ lỗi mã hoá, chỉ nằm trong code block):

```text
8Portal v4 â€” Khung A1â†’A3
Chuỗi lỗi: Ã¢â‚¬â€, Ã
```

---

## 6) Thuật ngữ Git & quy trình làm việc

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Repo | Kho mã | Nơi chứa toàn bộ mã nguồn, dữ liệu, tài liệu. |
| Commit | Bản ghi thay đổi | Mốc thay đổi có mô tả rõ ràng. |
| Branch | Nhánh | Nhánh làm việc tách khỏi chính. |
| Nh&#225;nh snapshot (snapshot branch) | Nh&#225;nh snapshot (snapshot branch) | Nh&#225;nh chuy&#234;n d&#249;ng cho m&#7909;c &#273;&#237;ch t&#7841;o/gi&#7919; b&#7843;n ch&#7909;p kho m&#227;, kh&#244;ng l&#224;m &#7843;nh h&#432;&#7903;ng nh&#225;nh ch&#237;nh. |
| Pull request (PR) | Yêu cầu hợp nhất | Gửi thay đổi để review và hợp nhất vào nhánh chính. |
| Merge | Hợp nhất | Gộp thay đổi vào nhánh chính. |
| CI | Tự động kiểm tra | Hệ thống chạy kiểm tra khi PR/push/schedule. |
| Workflow | Quy trình tự động | Tập lệnh CI (ví dụ: GitHub Actions). |
| workflow_dispatch | Kích hoạt thủ công | Chạy workflow bằng tay từ giao diện. |
| Clone nông (shallow clone) | Clone nông (shallow clone) | Ch&#7881; l&#7845;y m&#7897;t ph&#7847;n l&#7883;ch s&#7917; commit &#273;&#7875; t&#259;ng t&#7889;c checkout. |
| Fetch depth (Độ sâu lấy lịch sử git khi checkout trong CI) | fetch-depth | Tham số checkout quy định số lượng commit được tải về trong CI, ảnh hưởng khả năng truy vết commit. |
| Commit range | Commit range | Khoảng commit (base..head) dùng để quét theo phạm vi thay đổi. |
| commit base/before (commit nền trước khi push) | commit base/before | Commit nền của ref trước khi push, dùng để tính phạm vi thay đổi. |
| commit trước (before commit) | commit trước (before commit) | Commit đứng trước trong lần push, thường dùng làm mốc so sánh thay đổi. |
| T&#7843;i b&#249; commit theo SHA (fetch by SHA) | T&#7843;i b&#249; commit theo SHA (fetch by SHA) | T&#7843;i th&#234;m m&#7897;t commit c&#7909; th&#7875; theo SHA khi b&#7883; thi&#7871;u trong shallow clone. |
| Ch&#7871; &#273;&#7897; d&#7921; ph&#242;ng (fallback) | Ch&#7871; &#273;&#7897; d&#7921; ph&#242;ng (fallback) | Ph&#432;&#417;ng &#225;n thay th&#7871; khi logic ch&#237;nh kh&#244;ng &#225;p d&#7909;ng &#273;&#432;&#7907;c. |
| schedule | Lịch chạy | Workflow chạy theo cron (hằng ngày). |
| Artifact | G&#243;i &#273;&#237;nh k&#232;m CI | File b&#225;o c&#225;o l&#432;u trong CI &#273;&#7875; t&#7843;i v&#7873; (kh&#244;ng nh&#7845;t thi&#7871;t commit). |

---

## 7) Thuật ngữ hạ tầng & bảo mật

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Firestore rules | Quy tắc Firestore | Quy tắc truy cập dữ liệu: ai được đọc/ghi gì. |
| Least privilege | Tối thiểu quyền | Mỗi người chỉ có đúng quyền cần thiết. |
| Auth | Xác thực | Định danh người dùng (đăng nhập/đăng xuất). |
| Custom claims | Quyền đặc biệt | “Cờ” phân quyền nâng cao (admin/mod). |
| Qu&#233;t kh&#244;ng d&#249;ng l&#7883;ch s&#7917; Git (no-git scan) | Qu&#233;t kh&#244;ng d&#249;ng l&#7883;ch s&#7917; Git (no-git scan) | Qu&#233;t theo tree hi&#7879;n t&#7841;i, kh&#244;ng duy&#7879;t l&#7883;ch s&#7917; commit &#273;&#7875; tr&#225;nh k&#7871;t qu&#7843; t&#7915; patch c&#361;. |
| ESM (ECMAScript Module: chu&#7849;n module d&#249;ng import/export) | ESM | Chu&#7849;n module hi&#7879;n &#273;&#7841;i d&#249;ng `import`/`export` theo ES. |
| CJS (CommonJS: chu&#7849;n module m&#7863;c &#273;&#7883;nh c&#7911;a Node v&#7899;i require/module.exports) | CJS | Chu&#7849;n module truy&#7873;n th&#7889;ng c&#7911;a Node d&#249;ng `require`/`module.exports`. |
| Gi&#7899;i h&#7841;n theo ngu&#7891;n truy c&#7853;p (HTTP referrer restriction) | Gi&#7899;i h&#7841;n theo ngu&#7891;n truy c&#7853;p (HTTP referrer restriction) | Ch&#7881; cho ph&#233;p kho&#225; ho&#7841;t &#273;&#7897;ng t&#7915; c&#225;c domain &#273;&#432;&#7907;c ph&#233;p. |
| Gi&#7899;i h&#7841;n theo d&#7883;ch v&#7909; (API restriction) | Gi&#7899;i h&#7841;n theo d&#7883;ch v&#7909; (API restriction) | Ch&#7881; cho ph&#233;p kho&#225; d&#249;ng cho m&#7897;t s&#7889; API &#273;&#432;&#7907;c ch&#7881; &#273;&#7883;nh. |
| Lu&#226;n phi&#234;n kho&#225; (rotate keys) | Lu&#226;n phi&#234;n kho&#225; (rotate keys) | Thu h&#7891;i/&#273;&#7893;i kho&#225; c&#361; sang kho&#225; m&#7899;i, c&#7853;p nh&#7853;t to&#224;n b&#7897; h&#7879; th&#7889;ng d&#249;ng kho&#225;. |
| Xo&#225; kh&#7887;i l&#7883;ch s&#7917; Git (history purge) | Xo&#225; kh&#7887;i l&#7883;ch s&#7917; Git (history purge) | Lo&#7841;i b&#7887; b&#237; m&#7853;t kh&#7887;i to&#224;n b&#7897; l&#7883;ch s&#7917; commit b&#7857;ng c&#244;ng c&#7909; rewrite history. |

---

## 8) Thuật ngữ ra quyết định kiểu “ông lớn”

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| One-way door | Cửa một chiều | Quyết định khó quay đầu (phải cân nhắc kỹ). |
| Two-way door | Cửa hai chiều | Quyết định có thể thử nhanh và quay lại. |
| Trade-off | Đánh đổi | Chọn A thì mất B; phải ghi rõ. |
| North Star Metric | Chỉ số Bắc cực | Chỉ số cốt lõi dẫn toàn bộ đội. |
| KPI | Chỉ số hiệu suất | Chỉ số đo tiến độ/kết quả. |
| OKR | Mục tiêu & kết quả then chốt | Hệ mục tiêu theo quý/tháng. |

---

## 9) Quy tắc đặt thuật ngữ mới (để Việt hoá 100%)
1) Ưu tiên từ **ngắn – dễ hiểu – sang** (ví dụ: “Cổng”, “Thế giới”, “Cách ly 7 ngày”).  
2) Nếu bắt buộc giữ tên riêng (ví dụ: ThreadColor) → luôn kèm **bí danh tiếng Việt**: “Thế giới Màu thêu (ThreadColor)”.  
3) Thuật ngữ kỹ thuật vẫn Việt hoá, nhưng có thể giữ trong ngoặc nếu cần đối chiếu: “Bộ nhớ đệm (cache)”.  
4) Hai tên **không đổi**: **DSG- DigitalSpaceGroup**, **SpaceColors - 8Portals**.

---

*File này là “nguồn ngôn ngữ gốc”. Mọi tài liệu/brief nên bám theo để thống nhất giọng điệu.*
---

## 9) Thuật ngữ Backend & Gói quyết định (Bảo mật)

| Thuật ngữ | Viết hoá dạng trong repo | Định nghĩa ngắn |
|---|---|---|
| Cloud Functions (Hàm đám mây) | Cloud Functions | Hàm server-side chạy theo sự kiện/HTTP, xử lý logic nhạy cảm. |
| Firebase Hosting | Firebase Hosting | Hạ tầng phục vụ web tĩnh và rewrite đến Functions. |
| Cross-Origin-Opener-Policy (COOP) | Cross-Origin-Opener-Policy (COOP) | Chinh sach co lap cua so mo ra giua cac nguon (chinh sach co lap cua so mo ra giua cac nguon). |
| same-origin-allow-popups | same-origin-allow-popups | Che do COOP cho phep popup van hoat dong voi cua so mo no (che do COOP cho phep popup van hoat dong voi cua so mo no). |
| signInWithRedirect | signInWithRedirect | Dang nhap bang chuyen huong thay vi popup (dang nhap bang chuyen huong thay vi popup). |
| Express | Express | Bộ định tuyến HTTP nhẹ để tổ chức API admin. |
| rewrite (Ánh xạ đường dẫn) | rewrite | Chuyển hướng `/admin/**` từ Hosting sang Functions. |
| RBAC (Phân quyền theo vai trò) | RBAC | Cơ chế phân quyền admin/không admin theo vai trò. |
| ID token (mã chứng thực) | ID token | Token xác thực người dùng do Firebase Auth cấp. |
| no-store (cấm cache) | no-store | Header chống lưu đệm cho response nhạy cảm. |
| Audit log (nhật ký truy vết) | Audit log | Ghi lại GENERATE/VIEW, ai làm, lúc nào. |
| Redaction (che dữ liệu nhạy cảm) | Redaction | Che thông tin nhạy cảm trước khi lưu/hiển thị. |
| DecisionPack (Gói quyết định) | DecisionPack | Bản ghi gói quyết định nội bộ theo ngày. |
| Snapshot (bản chụp) | Snapshot | Bản chụp trạng thái để đối chiếu/ra quyết định. |
| Idempotency (chống chạy lặp) | Idempotency | Chạy lại không tạo trùng, giữ 1 ?latest?. |
---

## 10) Thu?t ng? tri?n khai Functions & Hosting

| Thu?t ng? | Vi?t ho? d?ng trong repo | ??nh ngh?a ng?n |
|---|---|---|
| functions.source | functions.source | Khai b?o th? m?c m? Functions ?? deploy ??ng 100%. |
| predeploy | predeploy | L?nh ch?y t? ??ng tr??c khi deploy (v? d? build TypeScript). |
| emulator | emulator | M?i tr??ng gi? l?p Functions/Hosting ?? test local. |
| Node LTS | Node LTS | Phi?n b?n Node ?n ??nh d?i h?n, khuy?n ngh? d?ng trong Functions. |
---

## 11) Thuật ngữ quản trị & xác thực bổ sung

| Thuật ngữ | Viết hoá dạng trong repo | Định nghĩa ngắn |
|---|---|---|
| Authorization Bearer token | Bearer token | Chuỗi token đặt trong header `Authorization: Bearer <token>` để gọi API quản trị. |
| Admin UI | Bảng điều phối quản trị | Giao diện nội bộ cho admin xem gói quyết định và nhật ký truy vết. |
| Audit logs | Nhật ký truy vết | Danh sách sự kiện truy cập/ghi nhận ở API admin, phục vụ kiểm tra bảo mật. |
---

## 12) Thuật ngữ Git hygiene

| Thuật ngữ | Viết hoá dạng trong repo | Định nghĩa ngắn |
|---|---|---|
| K&#7927; lu&#7853;t s&#7841;ch kho m&#227; (repo hygiene) | K&#7927; lu&#7853;t s&#7841;ch kho m&#227; (repo hygiene) | Th&#243;i quen gi&#7919; repo g&#7885;n, kh&#244;ng r&#242; r&#7881; file nh&#7841;y c&#7843;m, tu&#226;n th&#7911; quy &#432;&#7899;c. |
| .gitignore | .gitignore | Danh sách file/thư mục bị Git bỏ qua, không đưa vào commit. |
| T&#7879;p CODEOWNERS | T&#7879;p CODEOWNERS | T&#7879;p quy &#273;&#7883;nh ng&#432;&#7901;i ch&#7883;u tr&#225;ch nhi&#7879;m review cho c&#225;c &#273;&#432;&#7901;ng d&#7851;n quan tr&#7885;ng. |
| T&#7879;p &#273;&#7879;m (stub file) | T&#7879;p &#273;&#7879;m (stub file) | T&#7879;p t&#7841;m th&#7901;i d&#249;ng &#273;&#7875; th&#7887;a tham chi&#7871;u n&#7897;i b&#7897; khi ch&#432;a c&#243; n&#7897;i dung th&#7853;t. |
| node_modules | node_modules | Thư mục chứa thư viện cài đặt từ npm; không commit. |
| Tracked | Tracked | File đang được Git theo dõi (đã add). |
| Untracked | Untracked | File chưa được Git theo dõi. |
| Build artifact | Build artifact | Kết quả sinh ra khi build (ví dụ `functions/lib/`), không commit. |
---

## 13) Thuật ngữ xuất repo & chia sẻ

| Thuật ngữ | Viết hoá dạng trong repo | Định nghĩa ngắn |
|---|---|---|
| Git bundle | Git bundle | Gói Git có lịch sử đầy đủ, dùng để chia sẻ repo mà không cần remote. |
| Git archive | Git archive | Gói snapshot không lịch sử (zip/tar) để chia sẻ mã nguồn hiện tại. |
| Submodule | Submodule | Repo con gắn vào repo cha; cần tải riêng khi chia sẻ. |
| Git LFS | Git LFS | Cơ chế lưu file lớn ngoài Git; cần pull riêng để đủ dữ liệu. |
| Include dirty | K&#232;m thay &#273;&#7893;i ch&#432;a commit (include dirty) | T&#249;y ch&#7885;n k&#232;m patch diff c&#7911;a c&#225;c thay &#273;&#7893;i ch&#432;a commit &#273;&#7875; chia s&#7867; nhanh tr&#7841;ng th&#225;i hi&#7879;n t&#7841;i. |
| Full dump | B&#7843;n &#273;&#7893; &#273;&#7847;y &#273;&#7911; (full dump) | B&#7843;n ghi to&#224;n b&#7897; n&#7897;i dung text c&#7911;a repo &#273;&#7875; tra c&#7913;u/&#273;&#7889;i chi&#7871;u. |
| Index dump | B&#7843;n &#273;&#7893; ch&#7881; m&#7909;c (index dump) | B&#7843;n t&#243;m t&#7855;t li&#7879;t k&#234; file &#273;&#227; dump/&#273;&#227; b&#7887; qua k&#232;m l&#253; do v&#224; th&#7889;ng k&#234;. |
---

## 14) Thuật ngữ PowerShell

| Thuật ngữ | Viết hoá dạng trong repo | Định nghĩa ngắn |
|---|---|---|
| ExecutionPolicy | ExecutionPolicy | Chính sách cho phép chạy script PowerShell trong phiên hiện tại. |
| Scope Process | Scope Process | Phạm vi áp dụng của ExecutionPolicy chỉ trong phiên PowerShell đang chạy. |
| &#272;&#7897;ng t&#7915; &#273;&#432;&#7907;c ph&#234; duy&#7879;t (approved verbs) | &#272;&#7897;ng t&#7915; &#273;&#432;&#7907;c ph&#234; duy&#7879;t (approved verbs) | Danh s&#225;ch &#273;&#7897;ng t&#7915; PowerShell chu&#7849;n d&#249;ng &#273;&#7875; &#273;&#7863;t t&#234;n cmdlet/function, gi&#250;p nh&#7845;t qu&#225;n v&#224; qua PSScriptAnalyzer. |
---

## 15) Thuật ngữ đo lường & sự kiện

| Thuật ngữ | Viết hoá dạng trong repo | Định nghĩa ngắn |
|---|---|---|
| North Star Metric (NSM) | NSM | Chỉ số định hướng chính, đo hiệu quả cốt lõi của sản phẩm. |
| Leading indicator | Chỉ số dẫn dắt | Chỉ số sớm dự báo xu hướng của NSM. |
| TMTC-7 | TMTC-7 | Tỷ lệ Màu Thêu Chuẩn trong 7 ngày. |
| TTGP | TTGP | Tỷ lệ Tra cứu Gần đúng thành công. |
| TLC | TLC | Tỷ lệ Lưu vào Kho chỉ. |
| TLK | TLK | Tỷ lệ Lựa chọn kết quả. |
| Event map | Bản đồ sự kiện | Danh sách sự kiện tối thiểu + thuộc tính để đo lường. |
---

## 16) Thuật ngữ Emulator & triển khai

| Thuật ngữ | Viết hoá dạng trong repo | Định nghĩa ngắn |
|---|---|---|
| Emulator (mô phỏng dịch vụ chạy local) | Emulator | Bộ giả lập dịch vụ Firebase chạy trên máy local để test nhanh. |
| Blaze plan (gói trả phí pay-as-you-go) | Blaze plan | Gói trả phí theo mức dùng, cần để dùng một số tính năng nâng cao. |
| Spark plan (gói miễn phí) | Spark plan | Gói miễn phí với giới hạn tài nguyên cơ bản. |
| Rewrite (điều hướng route trên hosting) | Rewrite | Cấu hình chuyển hướng route tĩnh sang Functions/API. |
| Smoke test (kiểm thử nhanh tuyến chính) | Smoke test | Kiểm tra nhanh các luồng chính để phát hiện lỗi lớn. |

