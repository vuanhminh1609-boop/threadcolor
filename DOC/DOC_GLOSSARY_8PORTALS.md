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
| Nguồn sự thật (single source of truth) | Nguồn sự thật (single source of truth) | Nguồn dữ liệu thống nhất để tránh lệch số |
| Máy trạng thái (state machine) | Máy trạng thái (state machine) | Quy tắc chuyển đổi trạng thái loading/ok/warning/error |
| Data contract | Hợp đồng dữ liệu | Quy ước: file nào là gốc, file nào là sinh ra, schema, phiên bản, cách cập nhật. |
| JSON Schema | JSON Schema | Chuan mo ta cau truc JSON de kiem tra hop le |
| SemVer | SemVer | Chuan danh phien ban MAJOR.MINOR.PATCH |
| Manifest hop dong | Manifest hop dong | Tep ke khai: dataset nao dung schema nao + phien ban + checksum |
| Danh mục tệp (manifest) | Danh mục tệp (manifest) | Danh sách liệt kê tệp trong repo/snapshot để kiểm tra và đối chiếu. |
| JSONL | JSON Lines | Dinh dang JSON Lines: moi dong la 1 JSON, phu hop log/audit |
| Checksum | Checksum | Chuoi kiem chung toan ven du lieu |
| Báo cáo chênh lệch dữ liệu (Data diff report) | Báo cáo chênh lệch dữ liệu (Data diff report) | Báo cáo so sánh dữ liệu giữa hai phiên bản để thấy phần thay đổi tăng/giảm/khác biệt. |
| SHA-256 | SHA-256 | Ham bam tao dau van tay noi dung |
| Ajv | Ajv | Thu vien Node.js de kiem tra JSON Schema |
| CI gate | CI gate | Cong chan trong CI de ngan loi vao main |
| Quét bí mật (secret scan) | Quét bí mật (secret scan) | Quét tìm khoá/bí mật trong code và lịch sử để ngăn rò rỉ. |
| gitleaks:allow (chú thích để Gitleaks bỏ qua một phát hiện cụ thể ở đúng dòng code) | gitleaks:allow | Comment gắn ở đúng dòng nhằm bỏ qua một phát hiện cụ thể, không ảnh hưởng phạm vi khác. |
| Siết CI (harden CI) | Siết CI (harden CI) | Siết quy trình CI/CD để giảm rủi ro (thêm kiểm tra, chỉnh phân quyền). |
| additionalProperties | additionalProperties | Tuy chon cua JSON Schema cho phep field phat sinh |
| authResolved | authResolved | Trang thai da xac dinh dang nhap hay chua |
| Migration | Migration | Di tru du lieu khi doi schema |
| Dry run | Dry run | Chay thu khong ghi du lieu |
| Reproducible build | Reproducible build | Build tai lap nho lockfile |
| Lockfile | Lockfile | Tep khoa phien ban phu thuoc, vi du package-lock.json |
| Generated artifact | Tệp sinh ra | File do công cụ tạo (ví dụ: `threads.cleaned.json`) — thường không commit. |
| Raw sources | Dữ liệu thô | Nguồn thô đầu vào (ví dụ: `.tch`) dùng để tái tạo dữ liệu. |
| Validate | Kiểm tra hợp lệ | Kiểm tra cấu trúc/logic dữ liệu để phát hiện lỗi sớm. |
| Normalize | Chuẩn hoá | Biến dữ liệu về dạng thống nhất (tên, mã, format). |
| Conflicts | Mâu thuẫn dữ liệu | Các điểm dữ liệu xung đột cần xử lý. |
| Versioning | Đánh phiên bản | Gắn phiên bản dữ liệu để cache và truy vết thay đổi. |
| Taxonomy (hệ phân loại) | Hệ phân loại | Khung phân loại có cấu trúc để nhóm dữ liệu theo chủ đề/thuộc tính. |
| Seed dữ liệu (bộ mồi dữ liệu) | Seed dữ liệu | Bộ dữ liệu mồi ban đầu để khởi tạo hoặc bootstrap hệ thống. |
| Tuyển chọn (curation: chọn lọc chất lượng cao) | Tuyển chọn | Quá trình chọn lọc dữ liệu chất lượng cao theo tiêu chí rõ ràng. |

---

## 4) Thuật ngữ hiệu năng & trải nghiệm

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Modal (hộp thoại phủ) | Modal (hộp thoại phủ) | Hộp nổi chặn nền để hiển thị thông tin/tác vụ. |
| Ngữ cảnh chồng lớp (stacking context) | Ngữ cảnh chồng lớp (stacking context) | Cơ chế quyết định lớp trên/dưới khi có blur/transform. |
| Lớp phủ (overlay layer) | Lớp phủ (overlay layer) | Lớp nổi như menu/popup phải nằm trên nội dung. |
| Nâng lớp theo trạng thái (is-open z-index) | Nâng lớp theo trạng thái (is-open z-index) | Kỹ thuật tăng z-index cho row đang mở menu. |
| Mật độ UI | Mật độ UI | Độ thoáng giao diện (điều chỉnh khoảng cách/padding/gap). |
| Menu thả xuống | Menu thả xuống | Bảng chọn mở ra khi bấm nút (dropdown menu). |
| Chip lọc (thẻ lọc nhỏ) | Chip lọc | Thẻ lọc nhỏ dạng pill để bật/tắt tiêu chí lọc nhanh. |
| Logo mark (biểu tượng logo) | Logo mark (biểu tượng logo) | Biểu tượng rút gọn của logo, dùng đồng hành với tên thương hiệu. |
| Hình vector (SVG) | Hình vector (SVG) | Ảnh dạng vector, phóng to không vỡ và nhẹ cho UI. |
| Ảnh đa độ phân giải (srcset) | Ảnh đa độ phân giải (srcset) | Khai báo nhiều mức độ phân giải để trình duyệt tự chọn. |
| Fallback (phương án dự phòng) | Fallback (phương án dự phòng) | Phương án dự phòng khi tài nguyên chính không dùng được. |
| Lưu cục bộ | Lưu cục bộ | Lưu lựa chọn trên trình duyệt bằng localStorage. |
| Sự kiện tuỳ biến | Sự kiện tuỳ biến | CustomEvent để đồng bộ trạng thái giữa các khối UI. |
| Worker | Tiến trình phụ | Chạy tác vụ nặng (tìm kiếm, lập chỉ mục) ngoài luồng chính để UI mượt. |
| Main thread | Luồng chính | Luồng chạy UI; càng ít việc càng mượt. |
| Index | Lập chỉ mục | Chuẩn bị cấu trúc tra cứu nhanh (theo mã, hãng, màu). |
| Cache | Bộ nhớ đệm | Lưu tạm kết quả để tải nhanh hơn. |
| Debounce | Trễ có chủ đích | Chờ người dùng dừng gõ rồi mới tìm, tránh giật. |
| Virtual list | Danh sách ảo | Chỉ render phần đang nhìn thấy để khỏi lag. |
| Latency | Độ trễ | Thời gian chờ phản hồi. |
| CDN | CDN | Mạng phân phối nội dung để phân phối tài nguyên tĩnh nhanh và ổn định. |
| PostCSS | PostCSS | Công cụ xử lý CSS trong pipeline build (thêm prefix, tối ưu). |
| Tailwind CLI | Tailwind CLI | Công cụ dòng lệnh để build Tailwind CSS theo cấu hình. |
| DEV flag / Logger | Cờ DEV / Logger | Cơ chế bật/tắt log theo môi trường để giữ console sạch ở production. |

---

## 5) Thuật ngữ kiểm thử & “gác cổng chất lượng”

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Smoke test | Kiểm tra khói | Kiểm tra nhanh: trang có mở được, file có tải được, không 404. |
| Checklist PASS/FAIL | Danh sách đạt/không đạt | Danh sách test ngắn gọn để xác nhận thay đổi an toàn. |
| Gate | Cổng chặn | Quy tắc bắt buộc phải qua trước khi merge (ví dụ: không có BLOCK). |
| Telemetry (ghi log vận hành/hành vi để đo lường) | Telemetry | Ghi log sự kiện/hành vi để theo dõi vận hành và đo lường. |
| Fail-silent (thất bại im lặng: không làm gián đoạn luồng chính) | Fail-silent | Khi lỗi xảy ra, hệ thống im lặng bỏ qua để không ảnh hưởng chức năng chính. |
| Timeout/Abort request (huỷ request khi quá thời gian để không treo UI) | Timeout/Abort request | Giới hạn thời gian request; quá hạn thì huỷ để tránh treo giao diện. |
| Cổng kiểm tra mã hoá (Encoding gate) | Cổng kiểm tra mã hoá (Encoding gate) | Cổng CI chặn merge khi phát hiện chuỗi vỡ dấu hoặc mã hoá sai trong tài liệu. |
| Mojibake (lỗi vỡ dấu do sai mã hoá) | Mojibake | Hiện tượng chữ bị vỡ dấu do đọc sai mã hoá. Ví dụ ở khối code bên dưới. |
| Repo Doctor | Bác sĩ kho mã | Công cụ quét repo: lỗi gãy (BLOCK), cảnh báo (WARN), thông tin (INFO). |
| Health Score | Điểm sức khoẻ | Điểm 0–100 phản ánh tình trạng repo theo quy tắc đã thống nhất. |
| Trend 7 ngày | Xu hướng 7 ngày | Chuỗi điểm/đếm trong 7 ngày gần nhất để xem tiến hay lùi. |
| Gradient (dải chuyển màu liên tục) | Gradient | Dải màu chuyển liên tục giữa nhiều màu theo một hướng. |
| Điểm neo màu (color stop: điểm màu trên dải) | Điểm neo màu | Vị trí màu cụ thể trong gradient, xác định độ chuyển và tỉ lệ. |
| Token màu (biến màu dùng lại cho UI/thiết kế) | Token màu | Biến màu tái sử dụng trong thiết kế hoặc CSS, giúp thống nhất hệ màu. |
| Remix (tạo biến thể từ mẫu có sẵn) | Remix | Tạo biến thể màu mới bằng cách chỉnh sửa từ một dải gốc. |
| Palette Link (chia sẻ dải màu bằng URL) | Palette Link | Đường link chứa thông tin dải màu để chia sẻ hoặc tái sử dụng nhanh. |
| BLOCK | Chặn khẩn cấp | Lỗi mức P0: làm gãy chạy/thiếu file runtime/syntax… => không merge. |
| WARN | Cảnh báo | Vấn đề cần dọn/tối ưu nhưng chưa làm gãy hệ. |
| INFO | Ghi nhận | Thông tin thống kê, không phải lỗi. |
| Quarantine | Cách ly 7 ngày | Chuyển file “nghi thừa” vào `_graveyard/` trước khi xoá hẳn. |
| Graveyard | Nghĩa địa tạm | Thư mục `_graveyard/` chứa file cách ly. |

Ví dụ mojibake (minh hoạ lỗi mã hoá, chỉ nằm trong code block):

```text
Ví dụ chuỗi lỗi dạng escape: \u00e2\u20ac\u201d, \u00c3
Ví dụ hiển thị sai: ký tự bị vỡ dấu do đọc sai mã hoá
```

---

## 6) Thuật ngữ Git & quy trình làm việc

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Repo | Kho mã | Nơi chứa toàn bộ mã nguồn, dữ liệu, tài liệu. |
| Commit | Bản ghi thay đổi | Mốc thay đổi có mô tả rõ ràng. |
| Branch | Nhánh | Nhánh làm việc tách khỏi chính. |
| Nhánh snapshot (snapshot branch) | Nhánh snapshot (snapshot branch) | Nhánh chuyên dùng cho mục đích tạo/giữ bản chụp kho mã, không làm ảnh hưởng nhánh chính. |
| Pull request (PR) | Yêu cầu hợp nhất | Gửi thay đổi để review và hợp nhất vào nhánh chính. |
| Merge | Hợp nhất | Gộp thay đổi vào nhánh chính. |
| CI | Tự động kiểm tra | Hệ thống chạy kiểm tra khi PR/push/schedule. |
| Workflow | Quy trình tự động | Tập lệnh CI (ví dụ: GitHub Actions). |
| workflow_dispatch | Kích hoạt thủ công | Chạy workflow bằng tay từ giao diện. |
| Clone nông (shallow clone) | Clone nông (shallow clone) | Chỉ lấy một phần lịch sử commit để tăng tốc checkout. |
| Fetch depth (Độ sâu lấy lịch sử git khi checkout trong CI) | fetch-depth | Tham số checkout quy định số lượng commit được tải về trong CI, ảnh hưởng khả năng truy vết commit. |
| Commit range | Commit range | Khoảng commit (base..head) dùng để quét theo phạm vi thay đổi. |
| commit base/before (commit nền trước khi push) | commit base/before | Commit nền của ref trước khi push, dùng để tính phạm vi thay đổi. |
| commit trước (before commit) | commit trước (before commit) | Commit đứng trước trong lần push, thường dùng làm mốc so sánh thay đổi. |
| Tải bù commit theo SHA (fetch by SHA) | Tải bù commit theo SHA (fetch by SHA) | Tải thêm một commit cụ thể theo SHA khi bị thiếu trong shallow clone. |
| Chế độ dự phòng (fallback) | Chế độ dự phòng (fallback) | Phương án thay thế khi logic chính không áp dụng được. |
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
| Quét không dùng lịch sử Git (no-git scan) | Quét không dùng lịch sử Git (no-git scan) | Quét theo tree hiện tại, không duyệt lịch sử commit để tránh kết quả từ patch cũ. |
| ESM (ECMAScript Module: chuẩn module dùng import/export) | ESM | Chuẩn module hiện đại dùng `import`/`export` theo ES. |
| CJS (CommonJS: chuẩn module mặc định của Node với require/module.exports) | CJS | Chuẩn module truyền thống của Node dùng `require`/`module.exports`. |
| Giới hạn theo nguồn truy cập (HTTP referrer restriction) | Giới hạn theo nguồn truy cập (HTTP referrer restriction) | Chỉ cho phép khoá hoạt động từ các domain được phép. |
| Giới hạn theo dịch vụ (API restriction) | Giới hạn theo dịch vụ (API restriction) | Chỉ cho phép khoá dùng cho một số API được chỉ định. |
| Luân phiên khoá (rotate keys) | Luân phiên khoá (rotate keys) | Thu hồi/đổi khoá cũ sang khoá mới, cập nhật toàn bộ hệ thống dùng khoá. |
| Xoá khỏi lịch sử Git (history purge) | Xoá khỏi lịch sử Git (history purge) | Loại bỏ bí mật khỏi toàn bộ lịch sử commit bằng công cụ rewrite history. |

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

## 10) Thuật ngữ Backend & Gói quyết định (Bảo mật)

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Cloud Functions (Hàm đám mây) | Cloud Functions | Hàm server-side chạy theo sự kiện/HTTP, xử lý logic nhạy cảm. |
| Firebase Hosting | Firebase Hosting | Hạ tầng phục vụ web tĩnh và rewrite đến Functions. |
| Cross-Origin-Opener-Policy (COOP) | Cross-Origin-Opener-Policy (COOP) | Chinh sach co lap cua so mo ra giua cac nguon |
| same-origin-allow-popups | same-origin-allow-popups | Che do COOP cho phep popup van hoat dong voi cua so mo no |
| signInWithRedirect | signInWithRedirect | Dang nhap bang chuyen huong thay vi popup |
| Express | Express | Bộ định tuyến HTTP nhẹ để tổ chức API admin. |
| rewrite (Ánh xạ đường dẫn) | rewrite | Chuyển hướng `/admin/**` từ Hosting sang Functions. |
| RBAC (Phân quyền theo vai trò) | RBAC | Cơ chế phân quyền admin/không admin theo vai trò. |
| ID token (mã chứng thực) | ID token | Token xác thực người dùng do Firebase Auth cấp. |
| no-store (cấm cache) | no-store | Header chống lưu đệm cho response nhạy cảm. |
| Audit log (nhật ký truy vết) | Audit log | Ghi lại GENERATE/VIEW, ai làm, lúc nào. |
| Redaction (che dữ liệu nhạy cảm) | Redaction | Che thông tin nhạy cảm trước khi lưu/hiển thị. |
| DecisionPack (Gói quyết định) | DecisionPack | Bản ghi gói quyết định nội bộ theo ngày. |
| Snapshot (bản chụp) | Snapshot | Bản chụp trạng thái để đối chiếu/ra quyết định. |
| Idempotency (chống chạy lặp) | Idempotency | Chạy lại không tạo trùng, giữ 1 “latest”. |
---

## 11) Thuật ngữ triển khai Functions & Hosting

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| functions.source | functions.source | Khai báo thư mục mã Functions để deploy đúng 100%. |
| predeploy | predeploy | Lệnh chạy tự động trước khi deploy (ví dụ build TypeScript). |
| emulator | emulator | Môi trường giả lập Functions/Hosting để test local. |
| Node LTS | Node LTS | Phiên bản Node ổn định dài hạn, khuyến nghị dùng trong Functions. |
---

## 12) Thuật ngữ quản trị & xác thực bổ sung

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Authorization Bearer token | Bearer token | Chuỗi token đặt trong header `Authorization: Bearer <token>` để gọi API quản trị. |
| Admin UI | Bảng điều phối quản trị | Giao diện nội bộ cho admin xem gói quyết định và nhật ký truy vết. |
| Audit logs | Nhật ký truy vết | Danh sách sự kiện truy cập/ghi nhận ở API admin, phục vụ kiểm tra bảo mật. |
---

## 13) Thuật ngữ Git hygiene

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Kỷ luật sạch kho mã (repo hygiene) | Kỷ luật sạch kho mã (repo hygiene) | Thói quen giữ repo gọn, không rò rỉ file nhạy cảm, tuân thủ quy ước. |
| .gitignore | .gitignore | Danh sách file/thư mục bị Git bỏ qua, không đưa vào commit. |
| Tệp CODEOWNERS | Tệp CODEOWNERS | Tệp quy định người chịu trách nhiệm review cho các đường dẫn quan trọng. |
| Tệp đệm (stub file) | Tệp đệm (stub file) | Tệp tạm thời dùng để thỏa tham chiếu nội bộ khi chưa có nội dung thật. |
| node_modules | node_modules | Thư mục chứa thư viện cài đặt từ npm; không commit. |
| Tracked | Tracked | File đang được Git theo dõi (đã add). |
| Untracked | Untracked | File chưa được Git theo dõi. |
| Build artifact | Build artifact | Kết quả sinh ra khi build (ví dụ `functions/lib/`), không commit. |
---

## 14) Thuật ngữ xuất repo & chia sẻ

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Git bundle | Git bundle | Gói Git có lịch sử đầy đủ, dùng để chia sẻ repo mà không cần remote. |
| Git archive | Git archive | Gói snapshot không lịch sử (zip/tar) để chia sẻ mã nguồn hiện tại. |
| Submodule | Submodule | Repo con gắn vào repo cha; cần tải riêng khi chia sẻ. |
| Git LFS | Git LFS | Cơ chế lưu file lớn ngoài Git; cần pull riêng để đủ dữ liệu. |
| Include dirty | Kèm thay đổi chưa commit (include dirty) | Tùy chọn kèm patch diff của các thay đổi chưa commit để chia sẻ nhanh trạng thái hiện tại. |
| Full dump | Bản đổ đầy đủ (full dump) | Bản ghi toàn bộ nội dung text của repo để tra cứu/đối chiếu. |
| Index dump | Bản đổ chỉ mục (index dump) | Bản tóm tắt liệt kê file đã dump/đã bỏ qua kèm lý do và thống kê. |
---

## 15) Thuật ngữ PowerShell

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| ExecutionPolicy | ExecutionPolicy | Chính sách cho phép chạy script PowerShell trong phiên hiện tại. |
| Scope Process | Scope Process | Phạm vi áp dụng của ExecutionPolicy chỉ trong phiên PowerShell đang chạy. |
| Động từ được phê duyệt (approved verbs) | Động từ được phê duyệt (approved verbs) | Danh sách động từ PowerShell chuẩn dùng để đặt tên cmdlet/function, giúp nhất quán và qua PSScriptAnalyzer. |
---

## 16) Thuật ngữ đo lường & sự kiện

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| North Star Metric (NSM) | NSM | Chỉ số định hướng chính, đo hiệu quả cốt lõi của sản phẩm. |
| TMTC-7 | TMTC-7 | Tỷ lệ Màu Thêu Chuẩn trong 7 ngày. |
| TTGP | TTGP | Tỷ lệ Tra cứu Gần đúng thành công. |
| TLC | TLC | Tỷ lệ Lưu vào Kho chỉ. |
| TLK | TLK | Tỷ lệ Lựa chọn kết quả. |
| Event map | Bản đồ sự kiện | Danh sách sự kiện tối thiểu + thuộc tính để đo lường. |
---

## 17) Thuật ngữ Emulator & triển khai

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Blaze plan (gói trả phí pay-as-you-go) | Blaze plan | Gói trả phí theo mức dùng, cần để dùng một số tính năng nâng cao. |
| Spark plan (gói miễn phí) | Spark plan | Gói miễn phí với giới hạn tài nguyên cơ bản. |
| Smoke test (kiểm thử nhanh tuyến chính) | Smoke test | Kiểm tra nhanh các luồng chính để phát hiện lỗi lớn. |


## 18) Quy tắc thêm thuật ngữ mới

- Bước 1: search từ khoá trước khi thêm.
- Bước 2: nếu có rồi thì cập nhật dòng cũ, không thêm dòng mới.
- Bước 3: thêm đúng section, giữ định nghĩa 1–2 câu, không lặp.
- Bước 4: chạy npm run check:glossary trước khi commit.
