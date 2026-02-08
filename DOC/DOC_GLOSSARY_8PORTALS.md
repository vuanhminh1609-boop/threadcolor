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
| Tone/Sắc thái | Sắc thái | Bộ theme giao diện: nền/màu nhấn/chữ không phải “Thế giới” chức năng. |
| Token nền (biến CSS đại diện nền theo sắc thái) | Token nền | Biến CSS đại diện nền của một sắc thái, dùng lại đồng bộ giữa card và nền trang. |
| Canvas nền (lớp nền chính theo sắc thái) | Canvas nền | Lớp nền chính theo từng sắc thái, thường là gradient để tạo chiều sâu tổng thể. |
| Token tương phản (bộ biến màu chữ theo sắc thái) | Token tương phản | Bộ biến màu chữ chính/phụ theo từng sắc thái để bảo đảm độ đọc rõ. |
| Overlay nền (lớp hoạ tiết/ánh phủ trên nền chính) | Overlay nền | Lớp hoạ tiết/ánh phủ mỏng đặt trên nền chính để tạo chiều sâu nhưng vẫn nhẹ. |
| Custom Tone (sắc thái tuỳ chỉnh do người dùng tạo) | Sắc thái tuỳ chỉnh | Sắc thái do người dùng tự lưu lại từ công cụ, có thể áp dụng/preview lại nhanh. |
| Preset (thiết lập sẵn) | Preset | Gói thiết lập sẵn/mẫu có sẵn giúp chọn nhanh một cấu hình mà không phải chỉnh tay lại. |
| Preset theo mục tiêu | Preset theo mục tiêu | Gói preset dựng theo bối cảnh/mục tiêu (ví dụ phòng ngủ, streetwear) để áp nhanh nhiều tham số. |
| Màu đi kèm (Companion colors) | Màu đi kèm | Bộ màu phụ trợ đi kèm màu chính (viền/nhấn) để phối nhanh và giữ cân bằng. |
| So sánh A/B | So sánh A/B | Chế độ đặt hai phương án màu cạnh nhau để so sánh nhanh. |
| Triptych (bộ ba so sánh) | Triptych | Chế độ so sánh ba phương án màu song song A/B/C. |
| Mặt nạ (Mask) | Mặt nạ | Lớp alpha dùng để giới hạn vùng tác động khi chỉnh màu/hiệu ứng. |
| Cọ vẽ (Brush) | Cọ vẽ | Công cụ vẽ vùng chọn bằng nét cọ trên canvas/mask. |
| Chế độ hoà trộn (Blend mode) | Chế độ hoà trộn | Cách trộn lớp màu phủ với ảnh nền (ví dụ Multiply, Screen). |
| Before/After (trước/sau) | Before/After | So sánh ảnh trước và sau chỉnh sửa bằng slider hoặc toggle. |
| Kính lúp màu | Kính lúp màu | Hiển thị phóng to điểm ảnh dưới con trỏ để chọn màu chính xác. |
| Màu chủ đạo | Màu chủ đạo | Màu chiếm tỷ trọng lớn trong ảnh/palette, dùng làm màu chính. |
| Màu nhấn | Màu nhấn | Màu dùng để tạo điểm nhấn, thường dùng cho nút/chi tiết nổi bật. |
| Multi-lock | Giữ nhiều màu | Chế độ giữ cùng lúc nhiều màu để tránh bị thay khi lấy mẫu. |
| SVG chevron | Mũi tên SVG | Biểu tượng mũi tên dựng bằng SVG để tránh lỗi ký tự hiển thị trên nhiều môi trường. |
| component | Thành phần giao diện | Khối UI tái sử dụng, có thể render lại ở nhiều trang nhưng giữ cùng cấu trúc. |
| basePath | Tiền tố đường dẫn | Chuỗi tiền tố để tạo đường dẫn tương đối đúng giữa trang gốc và thư mục con. |
| ThreadColor | Thế giới Màu thêu (ThreadColor) | Thế giới tra cứu/gợi ý màu chỉ. |
| Lưới màu hãng | Lưới màu hãng | Lưới swatch theo từng hãng chỉ, sắp theo hue để chọn nhanh màu mục tiêu. |
| Chuyển hãng theo mã | Chuyển hãng theo mã | Tìm mã tương đương ở hãng khác từ một mã chỉ gốc, kèm ΔE để so sánh. |
| Trích bảng màu tự động | Trích bảng màu tự động | Chức năng tự phân tích ảnh để lấy các màu chủ đạo và tỷ lệ xuất hiện. |
| K-means (thuật toán gom cụm tìm màu chủ đạo) | K-means | Thuật toán gom cụm dữ liệu màu thành các nhóm để tìm màu trung tâm đại diện. |
| Clustering | Gom cụm | Kỹ thuật nhóm các điểm màu tương tự thành cụm để chọn màu đại diện. |
| Histogram màu | Histogram màu | Bảng tần suất xuất hiện của màu (hoặc bin màu) trong ảnh. |
| Chọn vùng | Chọn vùng | Thao tác khoanh vùng ảnh để chỉ trích màu trong khu vực cần thiết. |
| ThreadVault | Thế giới Kho chỉ (ThreadVault) | Thế giới quản lý/bộ sưu tập chỉ và dữ liệu liên quan. |
| Palette | Thế giới Bảng phối màu (Palette) | Thế giới phối nhiều màu rời thành một bảng màu dùng lại. |
| Line 98 (trò chơi xếp bi theo hàng) | Line 98 | Trò chơi xếp bi theo hàng để tạo chuỗi màu liên tiếp và ghi điểm. |
| Thử thách mỗi ngày | Thử thách mỗi ngày | Chế độ chơi có đề/seed theo ngày để mọi người cùng chơi chung một thử thách. |
| Seed (hạt giống ngẫu nhiên) | Seed | Giá trị khởi tạo ngẫu nhiên để tái lập cùng một kết quả khi cần. |
| Bàn cờ 9×9 (lưới 9 hàng 9 cột) | Bàn cờ 9×9 | Lưới 9 hàng 9 cột dùng làm mặt chơi tiêu chuẩn. |
| BFS (thuật toán tìm đường theo lớp) | BFS | Thuật toán tìm đường theo lớp, đảm bảo tìm ra đường đi ngắn nhất trong lưới ô. |
| Ô trống (cell trống trên bàn) | Ô trống | Ô trên bàn cờ không có bi, dùng làm điểm di chuyển hợp lệ. |
| Dải thẳng (linear gradient) | Dải thẳng | Dải chuyển màu theo một hướng thẳng, thường dùng góc để xác định hướng. |
| Dải tròn (radial gradient) | Dải tròn | Dải chuyển màu loang tròn từ tâm ra ngoài theo bán kính. |
| Dải nón (conic gradient) | Dải nón | Dải chuyển màu theo vòng xoay quanh tâm, giống mặt đồng hồ. |
| Nội suy (interpolation) | Nội suy | Cách pha trộn màu giữa các điểm neo để tạo chuyển màu mượt. |
| Hue (tông màu: góc màu trên vòng màu 0–360) | Hue | Tông màu biểu diễn góc trên vòng màu 0–360, dùng để nhóm và so sánh màu. |
| Sort theo hue (sắp xếp theo tông màu) | Sort theo hue | Cách sắp xếp màu theo tông màu (hue) để các dải xanh/vàng/đỏ liền mạch, dễ quan sát. |
| line-height (độ cao dòng) | line-height | Độ cao dòng chữ; dùng để tránh cắt phần đuôi chữ khi dòng quá thấp. |
| chân chữ (phần nét chữ thò xuống dưới như g/y/p) | Chân chữ | Phần nét chữ thò xuống dưới dòng cơ sở (baseline), dễ bị cắt nếu line-height quá thấp. |
| Tỷ lệ tương phản (contrast ratio) | Tỷ lệ tương phản | Mức chênh lệch sáng tối giữa 2 màu (chữ/nền); càng cao càng dễ đọc. |
| Quy tắc hài hoà màu (harmony rules) | Quy tắc hài hoà màu | Nguyên tắc phối màu trên vòng màu để tạo cảm giác cân bằng, dễ chịu. |
| Phối bù (complementary: phối lệch 180°) | Phối bù | Phối màu lệch 180° trên vòng màu để tạo tương phản mạnh. |
| Phối tương tự (analogous: phối lệch ±30°) | Phối tương tự | Phối màu kề nhau trên vòng màu (±30°) để tạo cảm giác hài hoà. |
| Sắc độ (tint/shade) | Sắc độ | Biến thể sáng hơn (tint) hoặc tối hơn (shade) của một màu gốc. |
| Dải sắc độ (tone ramp) | Dải sắc độ | Chuỗi nhiều bước sáng–tối của một màu gốc để kiểm tra độ chuyển sắc. |
| Màu tương tự (analogous) | Màu tương tự | Nhóm màu gần nhau trên vòng màu (±20° đến ±40°) để phối hài hoà. |
| Tiêu chuẩn WCAG | Tiêu chuẩn WCAG | Chuẩn khả năng tiếp cận web, có khuyến nghị về tương phản màu. |
| Vai trò màu (color roles) | Vai trò màu | Cách phân vai màu trong palette: nền/bề mặt/chữ/primary/accent để dùng nhất quán. |
| Chấm điểm (scoring) | Chấm điểm | Cách đánh giá điểm số để xếp hạng gợi ý palette theo tiêu chí. |
| Thuật toán kinh nghiệm (heuristic) | Thuật toán kinh nghiệm | Phép suy đoán dựa trên quy tắc kinh nghiệm để phân loại gần đúng, không cần ML. |
| Heuristic (quy tắc chấm điểm nhanh) | Heuristic | Quy tắc chấm điểm nhanh để chọn phương án tốt nhất mà không cần tính toán nặng. |
| Brief 1 dòng | Brief 1 dòng | Mô tả ngắn một câu về mục tiêu, cảm xúc và bối cảnh dùng màu. |
| Kho tri thức | Kho tri thức | Bộ dữ liệu quy tắc/keywords dùng để suy luận nhanh theo mục tiêu và cảm xúc. |
| Chốt chặn chất lượng | Chốt chặn chất lượng | Bước kiểm tra tối thiểu (ví dụ tương phản) để bảo đảm đầu ra đạt chuẩn. |
| Sửa tự động | Sửa tự động | Cơ chế tự điều chỉnh màu để đạt tiêu chí tối thiểu khi đầu vào chưa đạt. |
| Mẫu gợi ý | Mẫu gợi ý | Bộ câu brief mẫu để chọn nhanh theo ngành hoặc mục tiêu. |
| Ngăn kéo dưới | Ngăn kéo dưới | Hộp trượt từ cạnh dưới màn hình để chọn nội dung trên mobile. |
| Giữ chạm (long-press) | Giữ chạm | Thao tác nhấn giữ ~300–500ms trên mobile để gọi hành động phụ. |
| Độ chói tương đối (relative luminance) | Độ chói tương đối | Thước đo độ sáng chuẩn hoá của màu để phân loại và tính tương phản theo WCAG. |
| Kho HEX | Kho HEX | Kho tra cứu tập trung cho mọi mã màu dạng #RRGGBB trong hệ sinh thái. |
| Hồ sơ màu | Hồ sơ màu | Màn hiển thị chi tiết một màu: mã, chuyển đổi, gợi ý sử dụng và hành động liên quan. |
| Hex swatch | Hex swatch | Một mẫu màu dạng ô màu dùng để chọn/copy nhanh mã #RRGGBB. |
| Báo cáo QC | Báo cáo QC | Báo cáo kiểm soát chất lượng, tổng hợp kết quả CMYK/TAC/gamut để gửi nhà in. |
| Mã báo cáo | Mã báo cáo | Mã băm đối chiếu (reportId) để nhận diện duy nhất một báo cáo QC. |
| Xuất CSV | Xuất CSV | Xuất dữ liệu dạng bảng CSV để dùng trong Excel hoặc hệ thống nhà in. |
| Xuất JSON | Xuất JSON | Xuất dữ liệu JSON cho workflow nội bộ hoặc tích hợp hệ thống. |
| Chế độ in | Chế độ in | Cách hiển thị báo cáo tối ưu cho in ấn/PDF, loại bỏ UI không cần thiết. |
| Lưu PDF từ trình duyệt | Lưu PDF từ trình duyệt | Dùng chức năng Print/Save as PDF của trình duyệt để xuất báo cáo. |
| Hồ sơ HEX | Hồ sơ HEX | Màn chi tiết 1 mã HEX, hiển thị chuyển đổi màu, gợi ý và thao tác nhanh. |
| Bảng thông tin HEX (HEX Inspector) | Bảng thông tin HEX | Bảng tra cứu nhanh cho một mã HEX: chuyển đổi màu, gợi ý gần nhất và hành động áp dụng. |
| LCh | LCh | Biểu diễn Lab theo L* (độ sáng), C (độ rực), h (góc màu) để dễ so sánh trực quan. |
| Contrast | Độ tương phản chữ/nền | Mức chênh sáng giữa chữ và nền; giúp chọn màu chữ dễ đọc. |
| Carousel | Dải lướt ngang | Danh sách cuộn ngang để duyệt nhanh các gợi ý màu. |
| ΔE (độ chênh lệch màu) | ΔE | Thước đo mức khác biệt giữa hai màu trong không gian Lab; càng nhỏ càng giống. |
| CMYK | CMYK | Hệ màu in 4 kênh: Cyan, Magenta, Yellow, Key (đen). |
| In lưới (in lụa) | In lưới (in lụa) | Phương pháp in xuyên lưới, dùng khuôn và lớp mực dày; màu cần kiểm soát thủ công. |
| Màu spot | Màu spot | Màu pha riêng theo mã mực chuẩn, không pha từ CMYK, dùng cho in lưới/offset. |
| Lớp trắng lót (underbase) | Lớp trắng lót (underbase) | Lớp mực trắng in trước trên nền vải tối để màu nổi và đúng tông. |
| Thu lớp lót (choke) | Thu lớp lót (choke) | Giảm nhẹ kích thước lớp underbase để tránh viền trắng lộ ra. |
| Tram (halftone) | Tram (halftone) | Kỹ thuật in ảnh bằng chấm mực, tạo độ chuyển sắc từ nhiều chấm nhỏ. |
| LPI | LPI | Lines Per Inch – mật độ đường tram trên mỗi inch, ảnh hưởng độ mịn. |
| Góc tram | Góc tram | Góc xoay của chấm/đường tram cho từng kênh CMYK để giảm moiré. |
| Tăng tram (dot gain) | Tăng tram (dot gain) | Hiện tượng chấm mực nở to khi in, làm tối/đậm hơn bản gốc. |
| Mật độ lưới (mesh count) | Mật độ lưới (mesh count) | Số sợi lưới trên một inch, quyết định độ mịn và lượng mực đi qua. |
| Chuyển đổi CMYK xấp xỉ | Chuyển đổi CMYK xấp xỉ | Quy đổi RGB/HEX sang CMYK theo công thức gần đúng, chưa hiệu chỉnh ICC. |
| ICC profile | Hồ sơ ICC | Hồ sơ màu mô tả thiết bị in/hiển thị để chuyển đổi màu chính xác. |
| TAC | Tổng lượng mực (TAC) | Tổng % mực C+M+Y+K; vượt ngưỡng gây lem/đậm. |
| Dải màu (gamut) | Dải màu | Phạm vi màu thiết bị in có thể tái tạo; ngoài gamut sẽ bị lệch. |
| Ý đồ chuyển đổi (intent) | Ý đồ chuyển đổi | Cách ưu tiên giữ màu/độ tương phản khi chuyển đổi giữa các profile màu. |
| Topbar | Thanh trên | Thanh điều hướng trên cùng; phải giữ **Đăng nhập** ở góc phải. |
| Thanh trên dính | Thanh trên dính | Topbar bám trên cùng khi cuộn để truy cập nhanh chức năng chính. |
| Thu gọn theo cuộn | Thu gọn theo cuộn | Cơ chế giảm chiều cao/đệm của topbar khi người dùng cuộn xuống. |
| Thanh trên thông minh | Thanh trên thông minh | Topbar tự ẩn khi cuộn xuống và hiện lại khi cuộn lên để tiết kiệm không gian. |
| Slot đăng nhập | Vị trí Đăng nhập | Khu vực “neo” hiển thị đăng nhập/đăng xuất ở top-right (không được đổi tuỳ tiện). |
| Microcopy | Vi mô ngôn từ | Câu chữ ngắn trong UI (nhãn nút, mô tả) — phải “đắt và sạch”. |
| Trạng thái rỗng | Màn hình rỗng | UI khi chưa có dữ liệu (phải sang, không xin lỗi). |
| Trạng thái lỗi | Màn hình lỗi | UI khi có lỗi (gọn, rõ, không hoảng). |

---

## 3) Thuật ngữ dữ liệu & chất lượng dữ liệu

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Source of truth | Nguồn dữ liệu gốc | Nguồn chính thức, mọi thứ khác sinh ra từ đây (ví dụ: `threads.json`). |
| Single source of truth | Nguồn chuẩn duy nhất | Nguồn sự thật duy nhất để tránh lệch; nơi định nghĩa chuẩn để mọi nơi dùng chung, tránh copy-paste lệch. |
| LocalStorage (bộ nhớ cục bộ của trình duyệt) | LocalStorage | Bộ nhớ lưu cục bộ theo domain, giữ dữ liệu ngay cả khi tải lại trang. |
| Máy trạng thái (state machine) | Máy trạng thái (state machine) | Quy tắc chuyển đổi trạng thái loading/ok/warning/error |
| Data contract | Hợp đồng dữ liệu | Quy ước: file nào là gốc, file nào là sinh ra, schema, phiên bản, cách cập nhật. |
| Schema (khung dữ liệu chuẩn) | Schema (khung dữ liệu chuẩn) | Khung định nghĩa cấu trúc dữ liệu chuẩn để kiểm tra/đồng nhất. |
| JSON Schema | JSON Schema | Chuan mo ta cau truc JSON de kiem tra hop le |
| SemVer | SemVer | Chuan danh phien ban MAJOR.MINOR.PATCH |
| Manifest hop dong | Manifest hop dong | Tep ke khai: dataset nao dung schema nao + phien ban + checksum |
| Danh mục tệp (manifest) | Danh mục tệp (manifest) | Danh sách liệt kê tệp trong repo/snapshot để kiểm tra và đối chiếu. |
| JSONL | JSON Lines | Dinh dang JSON Lines: moi dong la 1 JSON, phu hop log/audit |
| overflow (cơ chế xử lý phần tràn) | overflow | Cơ chế CSS quyết định phần nội dung vượt khung bị ẩn, cuộn hay hiển thị. |
| Checksum | Checksum | Chuoi kiem chung toan ven du lieu |
| Báo cáo chênh lệch dữ liệu (Data diff report) | Báo cáo chênh lệch dữ liệu (Data diff report) | Báo cáo so sánh dữ liệu giữa hai phiên bản để thấy phần thay đổi tăng/giảm/khác biệt. |
| SHA-256 | SHA-256 | Ham bam tao dau van tay noi dung |
| Ajv | Ajv | Thu vien Node.js de kiem tra JSON Schema |
| CI gate | CI gate | Cong chan trong CI de ngan loi vao main |
| Feature Flag | Cờ tính năng | Cơ chế bật/tắt tính năng theo điều kiện như query param, user role… |
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
| Versioning (phiên bản hoá) | Đánh phiên bản | Gắn phiên bản dữ liệu để cache và truy vết thay đổi. |
| Taxonomy (hệ phân loại) | Hệ phân loại | Khung phân loại có cấu trúc để nhóm dữ liệu theo chủ đề/thuộc tính. |
| Asset (tài sản số) | Tài sản số | Mục dữ liệu đã chuẩn hoá để tái sử dụng (ví dụ: palette/gradient). |
| Tài sản | Tài sản | Tên gọi ngắn cho asset; một mục dữ liệu chuẩn dùng lại trong các World. |
| Bản thông số | Bản thông số | Tập thông tin mô tả ngắn gọn kèm JSON để chia sẻ/áp dụng nhanh. |
| Đặc tả tài sản màu (asset spec) | Đặc tả tài sản màu | Bộ quy tắc/schema để tạo, đọc và xác thực tài sản màu thống nhất toàn hệ. |
| Lấy mẫu màu (color sampling) | Lấy mẫu màu | Trích xuất các màu tiêu biểu từ ảnh/dữ liệu để tạo bảng phối màu. |
| Chia sẻ (share) | Chia sẻ | Xuất bản tài sản lên feed cộng đồng để người khác xem và remix. |
| Remix | Remix | Tạo phiên bản mới từ tài sản có sẵn, lưu về Thư viện cá nhân. |
| Naming convention (quy tắc đặt tên) | Quy tắc đặt tên | Chuẩn thống nhất để đặt tên tài sản dễ hiểu, nhất quán và dễ tìm. |
| Material profile (hồ sơ chất liệu) | Hồ sơ chất liệu | Nhóm thuộc tính mô tả bề mặt/vật liệu (loại chất liệu, độ bóng, ánh sáng, vân bề mặt). |
| Finish (độ bóng) | Độ bóng | Mức phản xạ bề mặt (mờ/bóng) ảnh hưởng cảm giác màu và ánh sáng. |
| Texture (vân bề mặt) | Vân bề mặt | Mô tả độ vân/mịn của bề mặt để giả lập chất liệu. |
| Tính lượng sơn | Tính lượng sơn | Ước tính số lít sơn cần dùng dựa trên diện tích, độ phủ, số lớp và hao hụt. |
| Độ phủ (m²/lít) | Độ phủ | Số mét vuông có thể sơn được với 1 lít sơn trong điều kiện chuẩn. |
| Hao hụt | Hao hụt | Tỷ lệ thất thoát do bề mặt hút sơn, rơi vãi hoặc thi công không đều. |
| Số lớp sơn | Số lớp sơn | Số lần sơn phủ lên bề mặt để đạt độ che phủ và màu chuẩn. |
| Combo thùng | Combo thùng | Tổ hợp thùng sơn 18L/5L/1L để đạt đủ lượng với dư ít nhất. |
| Adapter (lớp chuyển đổi dữ liệu) | Adapter | Bộ chuyển đổi dữ liệu chung sang logic riêng giữa các hệ/format khác nhau. |
| Payload (gói dữ liệu) | Payload | Gói dữ liệu mang thông tin chính để xử lý/áp dụng. |
| Handoff (hợp đồng chuyển giao) | Hợp đồng chuyển giao | Quy ước truyền tham số giữa các World (assetId, projectId, from, intent, shade). |
| intent (ý định hành động) | intent | Tham số cho biết mục đích khi mở World (dùng, chia sẻ, v.v.). |
| shade (sắc độ) | shade | Tham số mô tả sắc độ/biểu hiện màu khi chuyển giao. |
| Seed dữ liệu (bộ mồi dữ liệu) | Seed dữ liệu | Bộ dữ liệu mồi ban đầu để khởi tạo hoặc bootstrap hệ thống. |
| Tuyển chọn (curation: chọn lọc chất lượng cao) | Tuyển chọn | Quá trình chọn lọc dữ liệu chất lượng cao theo tiêu chí rõ ràng. |
| checksum SHA-256 (mã kiểm tra toàn vẹn tệp bằng thuật toán SHA-256) | checksum SHA-256 | Mã băm SHA-256 dùng để kiểm tra tính toàn vẹn nội dung tệp. |
| eol=lf (chuẩn xuống dòng LF để ổn định checksum trên CI) | eol=lf | Quy ước xuống dòng LF để tránh lệch checksum do khác hệ điều hành. |
| BOM | BOM | Dấu thứ tự byte ở đầu tệp; dễ gây lỗi/hiển thị sai nếu xử lý mã hoá không chuẩn. |
| HTML Entity | Thực thể HTML | Dạng mã thay thế ký tự đặc biệt; dễ làm diff bẩn và khó đọc nếu lạm dụng. |
| Thuộc tính trần (attribute không có giá trị) | Thuộc tính trần | Thuộc tính HTML/SVG được khai báo nhưng thiếu giá trị, dễ gây lỗi parse XML. |
| Cache-bust (ép tải bản mới) | Cache-bust | Thêm tham số phiên bản vào URL để trình duyệt tải lại tài nguyên mới, tránh dùng cache cũ. |
| Bộ làm sạch SVG | Bộ làm sạch SVG | Quy trình xử lý và sửa markup SVG để tránh lỗi parse khi render. |
| Parsererror | Lỗi parsererror | Lỗi do trình phân tích XML trả về khi SVG sai chuẩn. |
| Bộ lập lịch khung hình | Bộ lập lịch khung hình | Cơ chế dùng requestAnimationFrame để gom nhiều thay đổi UI vào cùng một khung hình. |
| Chốt phương án A/B/C | Chốt phương án A/B/C | Cơ chế ghim – chọn lại – xoá để so sánh nhanh nhiều phương án. |
| Ngăn kéo | Ngăn kéo | Khu vực trượt ra/vào để hiển thị thông tin hoặc tuỳ chọn bổ sung. |
| Nút nổi | Nút nổi | Nút hành động nổi trên giao diện, thường cố định ở góc để dễ truy cập. |
| Bộ chống dội | Bộ chống dội | Kỹ thuật debounce để trì hoãn xử lý cho đến khi người dùng dừng thao tác. |
| Hướng dẫn theo tầng | Hướng dẫn theo tầng | Cách tổ chức hướng dẫn 2 cấp: nhanh ở tầng 1 và chi tiết ở tầng 2. |

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
| Thanh điều khiển ghim | Thanh điều khiển ghim | Thanh control bám trên đầu khi cuộn để tìm kiếm/lọc nhanh. |
| Cuộn tải | Cuộn tải | Cơ chế nạp thêm dữ liệu khi cuộn xuống (infinite scroll). |
| Chế độ xem gọn | Chế độ xem gọn | Cách hiển thị rút gọn để quét nhanh nhiều mục. |
| Menu ba chấm | Menu ba chấm | Nút mở hành động phụ dạng “⋯” để tiết kiệm không gian. |
| Lưới ô màu | Lưới ô màu | Cách hiển thị màu dạng các ô vuông xếp lưới để quét nhanh. |
| Menu tác vụ gọn | Menu tác vụ gọn | Gom nhiều chức năng vào một nút nhỏ để tiết kiệm diện tích. |
| Menu ngữ cảnh | Menu ngữ cảnh | Menu thao tác gắn với từng mục để thao tác đúng ngữ cảnh. |
| Object URL (URL đối tượng: đường dẫn tạm để hiển thị file local) | Object URL | Đường dẫn tạm do trình duyệt tạo để xem trước file local (ảnh/âm thanh) mà không cần upload. |
| Hover từng ký tự (hiệu ứng tương tác trên từng chữ/ký tự) | Hover từng ký tự | Hiệu ứng hover áp lên từng chữ/ký tự riêng lẻ để tạo cảm giác sống động. |
| Container chuẩn (khung bề rộng thống nhất cho layout) | Container chuẩn | Khung bề rộng thống nhất cho các section để giữ nhịp và căn lề nhất quán. |
| SVG inline (nhúng SVG trực tiếp trong HTML) | SVG inline | Nhúng SVG trực tiếp trong HTML để dễ style theo CSS và tránh phụ thuộc file ngoài. |
| Scrim (lớp phủ mờ tăng tương phản chữ) | Scrim | Lớp phủ mờ đặt sau chữ để tăng tương phản và cải thiện khả năng đọc. |
| Ink token (token màu chữ theo sắc thái) | Ink token | Biến màu chữ theo sắc thái để giữ tương phản đồng đều giữa các theme. |
| Glass (nền kính mờ: nền trong suốt có blur nhẹ) | Glass | Nền trong suốt kèm blur nhẹ tạo cảm giác kính mờ. |
| Bảng nổi (popover) | Bảng nổi (popover) | Menu nổi neo theo nút để thao tác nhanh mà không rời mục. |
| Độ chồng lớp (z-index) | Độ chồng lớp (z-index) | Thứ tự lớp hiển thị của phần tử, lớp cao sẽ nổi lên trên. |
| Nhóm màu | Nhóm màu | Gom theo tông màu để dễ quét và tìm nhanh trong lưới màu. |
| Độ chói (luminance) | Độ chói (luminance) | Độ sáng cảm nhận của màu để chọn màu chữ tương phản. |
| prefers-reduced-motion (tuỳ chọn hệ thống giảm chuyển động) | prefers-reduced-motion | Media query tôn trọng cài đặt hệ thống giảm chuyển động để hạn chế animation. |
| Phổ màu chuẩn | Phổ màu chuẩn | Tập màu sinh tự động theo phổ RGB để tham khảo nhanh. |
| Chọn nhiều | Chọn nhiều | Chế độ chọn nhiều mục để thao tác hàng loạt. |
| Thanh hành động | Thanh hành động | Thanh thao tác xuất hiện khi có chọn để làm nhanh các lệnh chung. |
| Sắp xếp theo tông (Hue) | Sắp xếp theo tông (Hue) | Gom màu theo dải Hue để các màu gần tông nằm cạnh nhau. |
| content-visibility | content-visibility | Thuộc tính CSS giúp trình duyệt bỏ qua render phần chưa thấy để tối ưu hiệu năng. |
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
| Shared Asset | Tài nguyên dùng chung | CSS/JS dùng chung cho nhiều trang để cache tốt và giảm trùng lặp. |
| Defer Script | Nạp script trì hoãn | Dùng thuộc tính defer để chạy sau khi HTML parse, tránh chặn render. |
| Debounce | Trễ có chủ đích | Chờ người dùng dừng gõ rồi mới tìm, tránh giật. |
| Virtual list | Danh sách ảo | Chỉ render phần đang nhìn thấy để khỏi lag. |
| Latency | Độ trễ | Thời gian chờ phản hồi. |
| FAB | Nút nổi cố định (FAB) | Nút nổi cố định ở góc màn hình để mở nhanh tác vụ chính. |
| Ô bẫy Password Manager | Ô bẫy Password Manager | Cặp ô nhập ẩn để trình quản lý mật khẩu bám vào, tránh bật popup trên ô tìm kiếm thật. |
| Hash routing | Điều hướng bằng hash | Dùng phần sau dấu # trong URL để chuyển tab/trạng thái mà không tải lại trang. |
| Vùng cuộn trong flex (min-h-0) | Vùng cuộn trong flex (min-h-0) | Thiết lập min-height: 0 cho phần tử flex để vùng cuộn hoạt động đúng và không bị đẩy ra ngoài. |
| Bottom Sheet | Tấm trượt đáy | Tấm trượt từ dưới lên trên trên mobile để hiển thị tác vụ nhanh. |
| FOUC | Nháy nội dung không đồng bộ | Hiện tượng nội dung/kiểu chữ nháy sai trong tích tắc khi JS/CSS/i18n chưa kịp áp dụng. |
| CDN | CDN | Mạng phân phối nội dung để phân phối tài nguyên tĩnh nhanh và ổn định. |
| PostCSS | PostCSS | Công cụ xử lý CSS trong pipeline build (thêm prefix, tối ưu). |
| Tailwind CLI | Tailwind CLI | Công cụ dòng lệnh để build Tailwind CSS theo cấu hình. |
| DEV flag / Logger | Cờ DEV / Logger | Cơ chế bật/tắt log theo môi trường để giữ console sạch ở production. |
| Trạm thao tác nhanh | Trạm thao tác nhanh | Khu làm nhanh ngay tại sảnh, cho ra kết quả trước khi vào chi tiết. |
| action-first / navigate-second | action-first / navigate-second | Ưu tiên làm ra kết quả trước, điều hướng sâu sau khi cần. |
| lazy-load | lazy-load | Chỉ tải tài nguyên khi cần để trang chính nhẹ và nhanh. |
| Giả lập in | Giả lập in | Mô phỏng màu in ra từ CMYK để ước lượng hiển thị trên màn hình. |
| Hồ sơ in | Hồ sơ in | Preset thông số in (đặc biệt ngưỡng TAC) cho từng chất liệu. |
| Độ lệch màu | Độ lệch màu | Mức chênh giữa màu gốc và màu giả lập in (thấp/vừa/cao). |
| Rich black (đen giàu) | Đen giàu | Công thức đen có thêm C/M/Y để đen sâu hơn cho mảng lớn. |
| Misregistration (lệch chồng bản) | Lệch chồng bản | Sai lệch chồng giữa các bản in màu khiến viền lem hoặc lệch. |
| GCR/UCR | GCR/UCR | Kỹ thuật thay màu xám bằng K (GCR) hoặc giảm CMY ở vùng tối (UCR). |
| Rendering intent | Rendering intent | Cách ưu tiên khi chuyển đổi màu (giữ cảm giác, giữ tuyệt đối, bão hoà...). |
| BPC (Black Point Compensation) | BPC (bù điểm đen) | Bù điểm đen để map vùng tối giữa profile nguồn/đích. |
| Soft proof | Giả lập in trên màn hình (soft proof) | Mô phỏng màu in ra trên màn hình theo ICC. |
| PCS (Profile Connection Space) | Không gian nối profile (PCS) | Không gian trung gian (thường Lab/XYZ) để chuyển đổi giữa các profile. |
| Lab | Lab | Không gian màu độc lập thiết bị, dùng cho PCS và đo sai khác. |
| DeltaE | DeltaE | Chỉ số đo độ lệch màu giữa hai màu trong không gian Lab. |

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
| Repo Doctor (công cụ kiểm tra “sức khoẻ repo”, dò lỗi tham chiếu nội bộ) | Repo Doctor | Công cụ kiểm tra sức khoẻ repo và dò lỗi tham chiếu nội bộ. |
| SKIP_DIRS (danh sách thư mục bị bỏ qua khi quét) | SKIP_DIRS | Danh sách thư mục được bỏ qua khi quét để giảm nhiễu. |
| Repo Doctor | Bác sĩ kho mã | Công cụ quét repo: lỗi gãy (BLOCK), cảnh báo (WARN), thông tin (INFO). |
| Health Score | Điểm sức khoẻ | Điểm 0–100 phản ánh tình trạng repo theo quy tắc đã thống nhất. |
| Trend 7 ngày | Xu hướng 7 ngày | Chuỗi điểm/đếm trong 7 ngày gần nhất để xem tiến hay lùi. |
| Dải chuyển màu (gradient: chuyển màu liên tục) | Dải chuyển màu | Dải màu chuyển liên tục giữa nhiều màu theo một hướng. |
| Điểm neo màu (color stop: điểm màu trên dải) | Điểm neo màu | Vị trí màu cụ thể trong gradient, xác định độ chuyển và tỉ lệ. |
| Token màu (biến màu dùng lại cho UI/thiết kế) | Token màu | Biến màu tái sử dụng trong thiết kế hoặc CSS, giúp thống nhất hệ màu. |
| Token CSS (biến CSS dùng lại) | Token CSS | Biến CSS dùng lại để định nghĩa màu/thiết kế, dễ copy và áp dụng nhất quán. |
| Remix (tạo biến thể từ mẫu có sẵn) | Tạo biến thể | Tạo biến thể màu mới bằng cách chỉnh sửa từ một dải gốc. |
| Palette Link (chia sẻ dải màu bằng URL) | Palette Link | Đường link chứa thông tin dải màu để chia sẻ hoặc tái sử dụng nhanh. |
| Bảng phối màu (palette: bộ phối màu gồm nhiều màu rời) | Bảng phối màu | Bộ phối màu gồm nhiều màu rời dùng để thiết kế nhất quán. |
| Ô màu (swatch: ô hiển thị một màu) | Ô màu | Ô hiển thị một màu cụ thể trong bảng phối. |
| Dải xem nhanh (strip: thanh mảnh hiển thị dải) | Dải xem nhanh | Thanh mảnh hiển thị dải màu để tham chiếu nhanh. |
| Chế độ hiển thị (view mode: cách trình bày dữ liệu) | Chế độ hiển thị | Cách sắp xếp và trình bày dữ liệu theo nhu cầu sử dụng. |
| Góc dải (angle: hướng dải trong CSS) | Góc dải | Góc xác định hướng dải chuyển màu trong CSS (ví dụ 90deg). |
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
| GitHub Secrets | Kho bí mật GitHub | Kho biến bí mật của repo dùng trong GitHub Actions. |
| Service account | Tài khoản dịch vụ | Tài khoản máy phục vụ tác vụ tự động, không gắn người dùng. |
| CI token | Mã đăng nhập tự động | Mã dùng trong CI để xác thực với dịch vụ bên ngoài. |
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
| Snapshot (bản chụp) | Snapshot | Bản chụp trạng thái để đối chiếu/ra quyết định hoặc lưu tạm giá trị để hoàn tác nhanh. |
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


---

## 19) Thuật ngữ UI tương tác

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| kebab menu | Menu ba chấm (kebab) | Menu dạng dấu ba chấm dùng để gom thao tác phụ gọn hơn. |
| Clipboard API (API sao chép vào bộ nhớ tạm) | Clipboard API | API trình duyệt cho phép ghi/đọc văn bản vào bộ nhớ tạm (clipboard). |
| URL fragment (phần sau dấu #) | URL fragment | Phần sau dấu `#` trong URL, dùng để lưu trạng thái hoặc tham số trên client. |
| Encode JSON (mã hóa JSON để nhúng vào link) | Encode JSON | Chuyển JSON thành chuỗi an toàn (encode) để nhúng vào URL hoặc fragment. |
| Toast (thông báo nhỏ tự biến mất) | Toast | Thông báo ngắn xuất hiện tạm thời rồi tự ẩn để phản hồi thao tác. |
| Tooltip (chú giải khi rê chuột) | Tooltip | Nhãn chú giải nhỏ xuất hiện khi rê chuột lên nút/biểu tượng để mô tả chức năng. |
| Icon-only (nút chỉ có biểu tượng) | Icon-only | Kiểu nút chỉ hiển thị biểu tượng, không kèm chữ để tiết kiệm diện tích. |
| Handle (tay nắm kéo) | Handle | Phần tử nhỏ để nắm kéo, giúp thay đổi vị trí hoặc giá trị trên thanh chỉnh. |
| Stop gradient (điểm neo màu trong dải chuyển) | Stop gradient | Điểm neo màu trong dải chuyển, xác định vị trí % của màu trên gradient. |
| Micro-interaction (hiệu ứng nhỏ tăng cảm giác “đã”) | Micro-interaction | Hiệu ứng nhỏ phản hồi thao tác (ví dụ nhấn/pulse) giúp UI sống động và rõ trạng thái. |
| Hint engine (bộ gợi ý nước đi) | Hint engine | Bộ logic gợi ý nước đi tốt dựa trên trạng thái bàn cờ để hỗ trợ người chơi. |
| Accordion (khối mở/thu gọn) | Accordion | Cơ chế mở/thu gọn từng khối nội dung để giữ giao diện gọn. |
| Mount/Unmount (gắn/gỡ khối UI và sự kiện) | Mount/Unmount | Gắn hoặc gỡ một khối UI cùng các sự kiện đi kèm để tránh xung đột. |
| Long-press (nhấn giữ trên điện thoại) | Long-press | Cử chỉ nhấn giữ trong một khoảng thời gian để mở thao tác phụ trên mobile. |
| Thumbnail (hình xem trước) | Thumbnail | Hình thu nhỏ đại diện nội dung để người dùng quét nhanh trước khi mở. |
| Mobile controls (nút điều khiển trên điện thoại) | Mobile controls | Cụm nút điều khiển tối giản hiển thị trên điện thoại để thao tác nhanh. |
| Bảng lệnh (command palette) | Bảng lệnh | Bảng tìm kiếm nhanh để mở Thế giới, chạy route hoặc gọi lệnh tức thì. |
| Handoff dữ liệu (bàn giao dữ liệu) | Handoff dữ liệu | Cơ chế chuyển hoặc bàn giao dữ liệu giữa các bước/Thế giới để tiếp tục xử lý liền mạch. |
| Bàn làm việc (workbench) | Bàn làm việc | Trạng thái làm việc tạm thời chứa palette đang dùng để mang qua Thế giới khác. |
| Mã đệm (bufferId) | Mã đệm | Mã tham chiếu tới một buffer lưu tạm palette để mở lại đúng màu trong World khác. |
| Liên kết mở đúng trạng thái (deep-link) | Liên kết mở đúng trạng thái | Link chứa đủ tham số để mở đúng màu/trạng thái như người dùng đang thấy. |
| Safe-area (vùng an toàn tránh tai thỏ/thanh hệ thống) | Safe-area | Vùng an toàn tránh tai thỏ hoặc thanh hệ thống che nội dung quan trọng. |
| Color picker (bảng chọn màu) | Color picker | Bảng chọn màu cho phép chọn màu trực quan và trả về mã HEX/RGB. |
| Bottom sheet (bảng trượt từ dưới lên) | Bottom sheet | Bảng nội dung trượt từ dưới lên, thường dùng cho chi tiết trên mobile. |
| modal | Hộp thoại nổi | Hộp thoại bật lên để nhập thông tin hoặc xác nhận thao tác. |
| scroll-into-view | Tự cuộn tới phần liên quan | Hành vi tự cuộn trang để đưa phần nội dung cần xem vào tầm nhìn. |
| Tour hướng dẫn (onboarding tour) | Tour hướng dẫn | Chuỗi hướng dẫn theo từng bước giúp người dùng mới hiểu luồng thao tác nhanh. |
| Chế độ mặc định (default) | Chế độ mặc định | Trạng thái/tuỳ chọn được áp dụng khi người dùng chưa chọn gì, làm giá trị khởi tạo an toàn. |
| Toàn màn hình (fullscreen) | Toàn màn hình | Chế độ hiển thị toàn màn hình để tập trung nội dung và thao tác. |
| Bảng màu 5 cột (five-column palette) | Bảng màu 5 cột | Bố cục 5 dải màu đứng cạnh nhau để xem nhanh một palette. |
| Phím Space (phím cách) | Phím Space | Phím cách trên bàn phím, thường dùng làm thao tác nhanh (ví dụ đổi palette). |
| Hue shift (dịch tông màu) | Hue shift | Thao tác xoay tông màu trên trục hue để dịch sắc thái toàn bảng màu. |
| Undo/Redo (hoàn tác/làm lại) | Undo/Redo | Cặp thao tác hoàn tác bước trước và làm lại bước vừa hoàn tác trong lịch sử. |
| Autosave | Autosave | Cơ chế tự lưu tiến trình/thiết lập theo nhịp để có thể tiếp tục khi quay lại. |
| Chế độ hỗ trợ mù màu | Chế độ hỗ trợ mù màu | Chế độ hiển thị thêm hoa văn/ký hiệu để phân biệt màu khi thị lực màu bị hạn chế. |
| Juicy (phản hồi đã tay) | Juicy | Hiệu ứng phản hồi “đã tay” (nhịp/âm/hiệu ứng) làm thao tác thấy sướng hơn. |
| Soft drop (rơi nhanh) | Soft drop | Thao tác tăng tốc rơi tạm thời (thường giữ phím xuống) để điều khiển rơi nhanh hơn. |
| Hard drop (thả nhanh) | Hard drop | Thao tác thả rơi tức thì xuống vị trí thấp nhất hợp lệ để khoá khối nhanh. |
| Rotate (xoay) | Rotate | Thao tác xoay khối/viên để đổi hướng trước khi rơi hoặc khi đang rơi. |
| Gravity (rơi xuống sau khi xóa) | Gravity | Cơ chế khối còn lại rơi xuống lấp chỗ trống sau khi xoá. |
| Sticky (dính nhẹ theo khung nhìn) | Sticky | Cơ chế bám nhẹ theo khung nhìn khi cuộn, giúp giữ HUD/khung thao tác trong tầm nhìn. |
| HUD (thanh điều khiển nổi gọn) | HUD | Thanh điều khiển nổi gọn trên màn hình, chứa thao tác nhanh mà không chiếm nhiều diện tích. |
| Lock cột (khóa cột để không đổi màu) | Lock cột | Cơ chế khóa một cột màu để giữ nguyên khi đổi/random các cột còn lại. |
| Fullscreen API (API toàn màn hình của trình duyệt) | Fullscreen API | API trình duyệt cho phép vào/thoát toàn màn hình cho một phần tử khi cần. |
| focus-guard | Chặn focus | Cơ chế kiểm soát focus để ngăn trình quản lý mật khẩu bật gợi ý không mong muốn. |
| event bubble | Lan truyền sự kiện | Hiện tượng sự kiện nổi lên từ phần tử con lên phần tử cha trong DOM. |
| stopPropagation | Chặn lan truyền sự kiện | Lệnh dừng lan truyền sự kiện để tránh click ảnh hưởng phần tử cha. |
| dropdown menu | Trình đơn thả xuống | Menu mở ra theo chiều dọc để hiển thị các lựa chọn/tác vụ. |
| offscreen trap inputs | Ô bẫy ngoài màn hình | Trường nhập ẩn ngoài màn hình để chặn autofill/password manager tự điền vào ô chính. |
| TOC | Mục lục | Danh sách câu hỏi/mục nội dung giúp nhảy nhanh trong modal. |
| Focus | Focus | Đưa con trỏ nhập liệu vào đúng ô để người dùng thao tác nhanh. |
| Live binding (liên kết sống: UI tự cập nhật theo dữ liệu) | Live binding | Cơ chế UI tự cập nhật theo dữ liệu mới mà không cần tải lại hay bấm làm mới. |
| Bẫy tự điền (Autofill trap) | Bẫy tự điền | Kỹ thuật ngăn trình duyệt tự điền email vào ô tìm kiếm không liên quan, tránh nhiễu dữ liệu. |
| Thẻ chọn hãng (Brand Tile) | Thẻ chọn hãng | Thẻ UI dạng tile dùng để chọn hãng chỉ, hiển thị tên + badge và trạng thái chọn rõ ràng. |
| Preset dự án | Preset dự án | Bộ thiết lập in lưu lại (TAC/ICC/intent/ΔE…) để dùng lại nhanh và nhất quán. |
| Màu mô phỏng in (Proof color) | Màu mô phỏng in | Màu mô phỏng sau chuyển đổi/ICC để so sánh và đồng bộ khi màu ngoài gamut. |
| TAC (Tổng diện tích mực) | TAC | Tổng % C+M+Y+K của một màu; vượt ngưỡng dễ lem hoặc bệt. |
| Preflight (kiểm tra trước in) | Preflight | Bước kiểm tra nhanh trước in để phát hiện rủi ro như vượt TAC hoặc sai cấu hình. |
| Bản đồ nhiệt TAC (Heatmap TAC) | Bản đồ nhiệt TAC | Lớp màu trực quan tô vùng pixel vượt ngưỡng TAC để dễ nhận biết khu vực rủi ro. |
| Web Worker (luồng xử lý nền trong trình duyệt) | Web Worker | Luồng xử lý nền tách khỏi UI, giúp chạy tác vụ nặng mà không làm giật giao diện. |
| Thao tác hàng loạt (Bulk actions) | Thao tác hàng loạt | Nhóm thao tác áp dụng cho nhiều mục cùng lúc để tiết kiệm thời gian. |
| Tô sáng phần khớp | Tô sáng phần khớp | Cách làm nổi bật đoạn chữ khớp với từ khoá tìm kiếm để dễ quét nhanh. |
| Micro-hint (gợi ý vi mô) | Micro-hint | Gợi ý nhỏ trong UI (placeholder/nhãn mờ) giúp người dùng nhớ phím tắt hoặc cách dùng. |
| Gói đồng bộ (Sync pack) | Gói đồng bộ | Gói JSON chứa dữ liệu thư viện để xuất/nhập thủ công giữa thiết bị mà không cần server. |
| Gói chia sẻ | Gói chia sẻ | Chuỗi dữ liệu ngắn đại diện cho một tài sản, cho phép copy/paste nhanh giữa người dùng. |
| Phiên bản hoá (Versioning) | Phiên bản hoá | Cơ chế lưu phiên bản khi chỉnh sửa để theo dõi thay đổi và phục hồi khi cần. |
| Hoàn tác (Revert) | Hoàn tác | Thao tác khôi phục lại trạng thái/phiên bản trước đó của một tài sản. |
| Preview theme (xem trước sắc thái: áp dụng tạm thời không lưu) | Preview theme | Cơ chế áp dụng tạm thời bộ màu lên UI để xem trước, không lưu vĩnh viễn. |
| MutationObserver (bộ quan sát thay đổi DOM: theo dõi đổi thuộc tính) | MutationObserver | API theo dõi thay đổi DOM (thuộc tính/nút) để phản ứng khi trạng thái giao diện đổi. |
| Phần đuôi chữ (descender) | Phần đuôi chữ | Phần nét của ký tự kéo xuống dưới baseline (như chữ g, y, p), cần đủ line-height để không bị cắt. |
| Scope theo data-page (khoanh vùng CSS theo trang) | Scope theo data-page | Cách giới hạn CSS theo từng trang bằng thuộc tính `data-page` để tránh ảnh hưởng toàn site. |
| Nền đa tầng (multi-layer background) | Nền đa tầng | Nền gồm nhiều lớp gradient chồng nhau để tạo chiều sâu thị giác. |
| Chữ Neon (neon text) | Chữ Neon | Chữ dùng gradient và glow nhẹ để nổi bật nhưng vẫn giữ độ đọc rõ. |
| Mini card (thẻ thông tin nhỏ) | Mini card | Thẻ thông tin nhỏ hiển thị gợi ý ngắn, giúp quét nhanh nội dung trong một cụm lớn. |
| Spotlight (ánh sáng bám con trỏ khi hover) | Spotlight | Hiệu ứng vùng sáng bám điểm hover nhằm nhấn mạnh phần tử đang tương tác. |
| user-data-dir (thư mục hồ sơ Chrome để lưu cache/history) | user-data-dir | Tham số dòng lệnh Chrome chỉ định thư mục hồ sơ riêng để lưu cache, cookie và lịch sử khi chạy tự động. |
| dvh (đơn vị chiều cao viewport động) | dvh | Đơn vị chiều cao viewport động, phản ánh vùng hiển thị thực tế khi thanh trình duyệt co/giãn. |
| overscroll-behavior (hành vi cuộn vượt) | overscroll-behavior | Thuộc tính CSS kiểm soát cuộn vượt và chặn lan cuộn sang vùng cha. |
| Khối thu gọn (vùng mở/đóng để tiết kiệm chiều cao) | Khối thu gọn | Khối nội dung mặc định đóng và chỉ mở khi cần, giúp giao diện gọn hơn mà vẫn giữ đủ chức năng. |
| Cuộn nội bộ (scroll bên trong card) | Cuộn nội bộ | Cơ chế giới hạn chiều cao phần tử và cho phép cuộn trong chính khối đó thay vì cuộn toàn trang. |
| Scroll-margin-top (khoảng chừa khi cuộn đến mục) | Scroll-margin-top | Thuộc tính CSS đặt khoảng chừa phía trên khi cuộn tới một phần tử, giúp tránh bị topbar che. |
| Card (thẻ UI) | Card | Khối UI dạng thẻ có tiêu đề/nội dung/CTA, dùng để nhóm thông tin gọn và dễ quét. |
| Progressive disclosure (hiển thị dần để tránh rối) | Progressive disclosure | Cách hiển thị dần nội dung, chỉ mở phần chi tiết khi cần để giảm rối mắt. |


---

## 20) Thuật ngữ cấu trúc trang

| Thuật ngữ | Việt hoá dùng trong repo | Định nghĩa ngắn |
|---|---|---|
| Footer đa cột | Footer đa cột | Chân trang gồm nhiều cột liên kết để điều hướng nhanh và chuyên nghiệp. |
| Sitemap | Sitemap | Bản đồ liên kết tổng quan giúp người dùng định vị trang cần tìm. |

| Mailto | Mailto | Liên kết mở email soạn sẵn trong ứng dụng mail mặc định. |
| Neo cuộn (anchor) | Neo cuộn | Liên kết cuộn đến một vị trí trong trang. |
| Hộp thoại | Hộp thoại | Vùng nổi hiển thị nội dung hoặc câu hỏi cần xác nhận. |
| Liên kết pháp lý | Liên kết pháp lý | Các liên kết điều khoản, quyền riêng tư, cookie và thông tin tuân thủ. |

