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
| Data contract | Hợp đồng dữ liệu | Quy ước: file nào là gốc, file nào là sinh ra, schema, phiên bản, cách cập nhật. |
| JSON Schema | JSON Schema | Chuan mo ta cau truc JSON de kiem tra hop le (chuan mo ta cau truc JSON de kiem tra hop le). |
| SemVer | SemVer | Chuan danh phien ban MAJOR.MINOR.PATCH (chuan danh phien ban MAJOR.MINOR.PATCH). |
| Manifest hop dong | Manifest hop dong | Tep ke khai: dataset nao dung schema nao + phien ban + checksum (tep ke khai: dataset nao dung schema nao + phien ban + checksum). |
| JSONL | JSON Lines | Dinh dang JSON Lines: moi dong la 1 JSON, phu hop log/audit (dinh dang JSON Lines: moi dong la 1 JSON, phu hop log/audit). |
| Checksum | Checksum | Chuoi kiem chung toan ven du lieu (chuoi kiem chung toan ven du lieu). |
| SHA-256 | SHA-256 | Ham bam tao dau van tay noi dung (ham bam tao dau van tay noi dung). |
| Ajv | Ajv | Thu vien Node.js de kiem tra JSON Schema (thu vien Node.js de kiem tra JSON Schema). |
| CI gate | CI gate | Cong chan trong CI de ngan loi vao main (cong chan trong CI de ngan loi vao main). |
| additionalProperties | additionalProperties | Tuy chon cua JSON Schema cho phep field phat sinh (tuy chon cua JSON Schema cho phep field phat sinh). |
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
| Repo Doctor | Bác sĩ kho mã | Công cụ quét repo: lỗi gãy (BLOCK), cảnh báo (WARN), thông tin (INFO). |
| Health Score | Điểm sức khoẻ | Điểm 0–100 phản ánh tình trạng repo theo quy tắc đã thống nhất. |
| Trend 7 ngày | Xu hướng 7 ngày | Chuỗi điểm/đếm trong 7 ngày gần nhất để xem tiến hay lùi. |
| BLOCK | Chặn khẩn cấp | Lỗi mức P0: làm gãy chạy/thiếu file runtime/syntax… => không merge. |
| WARN | Cảnh báo | Vấn đề cần dọn/tối ưu nhưng chưa làm gãy hệ. |
| INFO | Ghi nhận | Thông tin thống kê, không phải lỗi. |
| Quarantine | Cách ly 7 ngày | Chuyển file “nghi thừa” vào `_graveyard/` trước khi xoá hẳn. |
| Graveyard | Nghĩa địa tạm | Thư mục `_graveyard/` chứa file cách ly. |

---

## 6) Thuật ngữ Git & quy trình làm việc

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Repo | Kho mã | Nơi chứa toàn bộ mã nguồn, dữ liệu, tài liệu. |
| Commit | Bản ghi thay đổi | Mốc thay đổi có mô tả rõ ràng. |
| Branch | Nhánh | Nhánh làm việc tách khỏi chính. |
| Pull request (PR) | Yêu cầu hợp nhất | Gửi thay đổi để review và hợp nhất vào nhánh chính. |
| Merge | Hợp nhất | Gộp thay đổi vào nhánh chính. |
| CI | Tự động kiểm tra | Hệ thống chạy kiểm tra khi PR/push/schedule. |
| Workflow | Quy trình tự động | Tập lệnh CI (ví dụ: GitHub Actions). |
| workflow_dispatch | Kích hoạt thủ công | Chạy workflow bằng tay từ giao diện. |
| schedule | Lịch chạy | Workflow chạy theo cron (hằng ngày). |
| Artifact | Gói đính kèm CI | File báo cáo lưu trong CI để tải về (không nhất thiết commit). |

---

## 7) Thuật ngữ hạ tầng & bảo mật

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Firestore rules | Quy tắc Firestore | Quy tắc truy cập dữ liệu: ai được đọc/ghi gì. |
| Least privilege | Tối thiểu quyền | Mỗi người chỉ có đúng quyền cần thiết. |
| Auth | Xác thực | Định danh người dùng (đăng nhập/đăng xuất). |
| Custom claims | Quyền đặc biệt | “Cờ” phân quyền nâng cao (admin/mod). |

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
| .gitignore | .gitignore | Danh sách file/thư mục bị Git bỏ qua, không đưa vào commit. |
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
---

## 14) Thuật ngữ PowerShell

| Thuật ngữ | Viết hoá dạng trong repo | Định nghĩa ngắn |
|---|---|---|
| ExecutionPolicy | ExecutionPolicy | Chính sách cho phép chạy script PowerShell trong phiên hiện tại. |
| Scope Process | Scope Process | Phạm vi áp dụng của ExecutionPolicy chỉ trong phiên PowerShell đang chạy. |
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
