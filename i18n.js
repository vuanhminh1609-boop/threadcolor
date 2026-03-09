(() => {
  const storageKey = "tc_lang";
  const defaultLang = "vi";
  const locales = {
    vi: {
      common: {
        open: "Mở",
        soon: "Sắp ra mắt",
        copy: "Sao chép",
        close: "Đóng",
        or: "Hoặc"
      },
        topbar: {
          brand: "SpaceColors",
          slogan: "Một chạm mở không gian màu vô hạn",
          nav: {
            hexHub: "Kho HEX",
            community: "Cộng đồng",
            spaces: "Không gian"
          },
          tones: {
            label: "Chọn Sắc thái"
          },
                    portal: {
            placeholder: "Chọn Thế giới",
            threadcolor: "Thế giới màu thêu",
            palette: "Thế giới Dải chuyển màu",
            soon: "Sắp ra mắt"
          },
          communityContribute: "Đóng góp dữ liệu",
          communityVerify: "Xác minh",
          spaceVault: "Kho chỉ",
        spaceLibrary: "Kết quả đã lưu"
        },
        vault: {
          title: "Kho chỉ",
          desc: "Lưu & quản lý các mã chỉ bạn đã chọn theo Dự án. Mở lại kết quả, ghim, xuất CSV và đồng bộ theo tài khoản.",
          tabSaved: "Kết quả đã lưu",
          tabStock: "Tồn kho",
          stockPlaceholder: "Tồn kho đang được chuẩn bị.",
          stock: {
            ctaTitle: "Đăng nhập để dùng Tồn kho",
            ctaDesc: "Quản lý tồn kho cá nhân theo tài khoản.",
            ctaAction: "Đăng nhập",
            search: "Tìm theo hãng/mã/tên/hex",
            add: "Thêm",
            import: "Nhập CSV",
            export: "Xuất CSV",
            summaryItems: "Tổng mã",
            summaryQty: "Tổng số lượng",
            summaryLow: "Sắp hết",
            table: {
              swatch: "Màu",
              brand: "Hãng",
              code: "Mã",
              name: "Tên",
              qty: "SL",
              unit: "Đơn vị",
              location: "Vị trí",
              updated: "Cập nhật",
              actions: "Thao tác"
            },
            empty: "Chưa có dữ liệu tồn kho.",
            modalAdd: "Thêm tồn kho",
            modalEdit: "Sửa tồn kho",
            modalSave: "Lưu",
            modalCancel: "Huỷ",
            fields: {
              brand: "Hãng",
              code: "Mã",
              name: "Tên",
              hex: "Hex",
              qty: "Số lượng",
              unit: "Đơn vị",
              location: "Vị trí",
              minQty: "Tồn tối thiểu",
              note: "Ghi chú"
            },
            actionEdit: "Sửa",
            actionDelete: "Xoá",
            confirmDelete: "Xoá mục này?"
          }
        },
      paintfabric: {
        hero: {
          tagline: "Ưu tiên chất liệu · Lưu nhanh"
        },
        labels: {
          scene: "Bối cảnh",
          object: "Vật thể",
          textureScale: "Tỷ lệ texture",
          compare: "So sánh trước/sau"
        }
      },
      hero: {
        title: "Không gian chuẩn hóa màu số.",
        desc: "8 Thế giới màu đã sẵn sàng — mỗi Thế giới là một không gian màu sắc chuyên biệt — tạo, chuyển đổi, chuẩn hoá, lưu và áp dụng màu theo nhu cầu của bạn, và nhiều hơn thế nữa...\nTừ Hex/ảnh → tra mã chỉ → bảng phối (Palette) → dải chuyển (Gradient) → màu in (CMYK) → Chia sẻ + Remix\nKhám phá 8 Thế giới ở thanh “Chọn Thế giới” hoặc lướt xuống để xem sơ đồ 8 cổng — chọn 1 cổng để bước vào Thế giới bạn cần.",
        journey: "Hành trình 1–2–3: Chọn Thế giới → Tạo/Chuẩn hoá → Lưu & Áp dụng.",
        ctaPrimary: "Bắt đầu với Thư viện màu",
        ctaSecondary: "Mở công cụ tra mã chỉ",
        ctaHex: "Kho HEX",
        ctaJump: "Đi đến 8 cổng ngay"
      },
      lobby: {
        meta: {
          title: "8Portal v4"
        },
        hero: {
          kicker: "Sảnh điều phối",
          lines: "Không gian|chuẩn hóa màu số",
          line1: "Không gian",
          line2: "chuẩn hóa màu số",
          jumpLabel: "Đi nhanh",
          jump: {
            portals: "Sơ đồ 8 cổng",
            roulette: "Vòng quay bảng phối màu",
            forge: "Lò rèn dải màu",
            gallery: "Bộ sưu tập sắc thái"
          }
        },
        quick: {
          title: "Trạm thao tác nhanh",
          subtitle: "Làm nhanh ngay tại sảnh, sau đó mới mở chi tiết.",
          live: "LIVE",
          liveAria: "Đang hoạt động",
          openDetail: "Mở chi tiết",
          tabs: {
            paste: "Dán màu",
            thread: "Tra mã chỉ từ màu",
            image: "Tra mã chỉ từ ảnh"
          },
          aurora: {
            title: "Bảng phối nhanh",
            copyColor1: "Sao chép màu 1",
            copyColor2: "Sao chép màu 2",
            copyColor3: "Sao chép màu 3",
            copyColor4: "Sao chép màu 4",
            copyColor5: "Sao chép màu 5",
            copyColor6: "Sao chép màu 6",
            chip: {
              threadMap: "Bản đồ mã chỉ",
              deltaE: "So khớp ΔE",
              brandFilter: "Bộ lọc hãng"
            },
            suggestions: {
              one: {
                title: "Gợi ý #1",
                desc: "Điểm nhấn mạnh"
              },
              two: {
                title: "Gợi ý #2",
                desc: "Hài hoà nền phụ"
              },
              three: {
                title: "Gợi ý #3",
                desc: "Tương phản chữ"
              }
            }
          },
          token: {
            summary: "Token CSS (từ gợi ý phối)",
            preset: "Preset",
            tonePlaceholder: "Tên sắc thái tuỳ chỉnh…",
            copyCss: "Sao chép CSS",
            preview: "Xem trước sắc thái",
            reset: "Hoàn tác",
            previewBadge: "Đang xem trước",
            saveLibrary: "Lưu vào Thư viện",
            openLibrary: "Mở Thư viện",
            copyToast: "Đã sao chép token CSS",
            option: {
              auto: "Tự động (khuyến nghị)",
              complementary: "Bù 180°",
              analogous: "Tương tự ±30°",
              accent: "Nhấn tương phản"
            }
          },
          paste: {
            hexList: "Danh sách HEX",
            placeholder: "#FFAA00, #123456\n#0F766E",
            apply: "Áp dụng",
            advancedSummary: "Mở tác vụ nhanh nâng cao",
            actionRun: "Thực hiện",
            cmyk: {
              title: "Đổi CMYK ngay"
            },
            gradient: {
              title: "Tạo dải ngay"
            },
            export: {
              title: "Xuất token ngay"
            }
          },
          thread: {
            inputLabel: "Nhập HEX",
            placeholder: "#FFAA00",
            search: "Tra ngay",
            open: "Mở chi tiết (Thêu)"
          },
          image: {
            label: "Chọn ảnh",
            pick: "Chọn ảnh",
            analyze: "Phân tích",
            previewAlt: "Xem trước ảnh đã chọn"
          }
        },
        recent: {
          title: "Gần đây / Ghim",
          desc: "Theo dõi các Thế giới bạn vừa dùng hoặc ghim lại.",
          clear: "Xoá gần đây",
          pinnedTitle: "Mục ghim",
          recentTitle: "Gần đây",
          emptyPinned: "Chưa có mục ghim. Bấm ghim để giữ lại tối đa 3 mục.",
          emptyRecent: "Chưa có lịch sử. Hãy chọn một tuyến mục tiêu để bắt đầu.",
          pinAddAria: "Ghim",
          pinRemoveAria: "Bỏ ghim",
          worlds: {
            threadcolor: {
              label: "Thế giới màu thêu",
              desc: "Tra mã chỉ từ ảnh/HEX"
            },
            palette: {
              label: "Bảng phối màu",
              desc: "Phối màu và kiểm tra tương phản"
            },
            gradient: {
              label: "Dải chuyển màu",
              desc: "Tạo dải chuyển và xuất token nhanh"
            },
            printcolor: {
              label: "CMYK và in ấn",
              desc: "Kiểm tra CMYK/TAC trước khi in"
            },
            library: {
              label: "Thư viện màu",
              desc: "Lưu và quản lý tài sản màu"
            },
            paintfabric: {
              label: "Sơn&Vải",
              desc: "Mô phỏng màu trên sơn/vải"
            },
            imagecolor: {
              label: "Màu từ Ảnh",
              desc: "Lấy màu chủ đạo từ ảnh"
            },
            colorplay: {
              label: "Trò chơi màu",
              desc: "Trò chơi luyện mắt màu"
            },
            threadvault: {
              label: "Kho chỉ",
              desc: "Quản lý kho chỉ và dữ liệu"
            }
          }
        },
        preview: {
          title: "Xem thử nhanh",
          desc: "Nhìn nhanh cách bảng phối lên Giao diện/Áp phích/Thêu.",
          cta: "Mở chi tiết",
          copyHexAria: "Sao chép mã HEX",
          tabs: {
            ui: "Giao diện",
            poster: "Áp phích",
            thread: "Thêu"
          },
          frame: {
            ui: {
              chip: "Mẫu bối cảnh",
              title: "Bảng điều khiển sản phẩm",
              desc: "Độ tương phản vừa đủ để đọc nhanh và tập trung.",
              pill1: "Nút kêu gọi (CTA)",
              pill2: "Nhấn",
              pill3: "Nhẹ"
            },
            poster: {
              chip: "Bố cục nổi bật",
              title: "Áp phích chiến dịch",
              desc: "Màu nổi bật để dẫn mắt vào thông điệp chính.",
              pill1: "Tiêu đề",
              pill2: "Nút kêu gọi (CTA)",
              pill3: "Sự kiện"
            },
            thread: {
              chip: "Mẫu vải thêu",
              title: "Bảng màu thêu",
              desc: "Tông dịu, dễ phối cho sản phẩm thủ công.",
              pill1: "Nền",
              pill2: "Hoa văn",
              pill3: "Viền"
            }
          },
          help: {
            summary: "Vì sao có khối này trong Sảnh?",
            effect: "Tác dụng: xem thử cảm giác bảng phối màu lên bối cảnh thực tế để quyết định nhanh trước khi vào Thế giới chi tiết.",
            why: "Lý do đặt ở Sảnh: giúp người dùng chốt hướng phối màu ngay điểm vào trung tâm, giảm vòng lặp thử sai.",
            routeUi: "Giao diện → mở Thế giới Bảng phối màu.",
            routePoster: "Áp phích → mở Thế giới Dải chuyển màu.",
            routeThread: "Thêu → mở Thế giới màu thêu."
          }
        },
        portals: {
          title: "8 Cổng SpaceColors",
          desc: "Chọn cổng để bước vào một Thế giới sắc màu khác.",
          cards: {
            threadcolor: {
              title: "Thế giới màu thêu (Thêu)",
              desc: "Tra mã chỉ từ ảnh/HEX, so màu gần nhất, quản lý kho chỉ và đặt mua.",
              cta: "Mở"
            },
            gradient: {
              title: "Thế giới Dải chuyển màu (Gradient)",
              desc: "Tạo dải chuyển màu, chỉnh góc và điểm neo, xuất CSS/Token nhanh.",
              cta: "Mở"
            },
            palette: {
              title: "Thế giới Bảng phối màu (Palette)",
              desc: "Khám phá phối màu theo cảm xúc, lưu bộ sưu tập, xuất token/HEX.",
              cta: "Mở"
            },
            printcolor: {
              title: "Thế giới Màu in (CMYK)",
              desc: "Đổi HEX → CMYK, theo dõi TAC, cảnh báo lệch in và xuất bảng cho nhà in.",
              cta: "Mở"
            },
            library: {
              title: "Thế giới Thư viện Tài sản Màu",
              desc: "Lưu tài sản màu, lọc nhanh, xem nhanh và áp dụng sang Palette/Gradient.",
              cta: "Mở"
            },
            paintfabric: {
              title: "Thế giới màu Sơn&Vải",
              desc: "Mô phỏng màu trên sơn/vải, điều chỉnh ánh sáng, lưu tài sản vật liệu.",
              cta: "Mở"
            },
            imagecolor: {
              title: "Thế giới Màu từ Ảnh",
              desc: "Lấy màu chủ đạo từ ảnh, tạo palette/gradient và lưu nhanh.",
              cta: "Mở"
            },
            colorplay: {
              title: "Thế giới trò chơi màu",
              desc: "Chơi Line 98, luyện mắt màu và tối ưu điểm số theo combo.",
              cta: "Mở"
            }
          }
        },
        cmdk: {
          label: "Bảng lệnh",
          sub: "Tìm nhanh Thế giới và tuyến mục tiêu.",
          hint: "Ctrl/⌘ + K",
          searchLabel: "Tìm lệnh",
          placeholder: "Gõ: thêu, gradient, palette, cmyk, thư viện…",
          listAria: "Gợi ý bảng lệnh",
          empty: "Không có gợi ý phù hợp."
        },
        toast: {
          unpinned: "Đã bỏ ghim.",
          pinLimit: "Chỉ ghim tối đa 3 mục.",
          pinned: "Đã ghim mục này.",
          clearedRecent: "Đã xoá gần đây.",
          copied: "Đã sao chép!"
        }
      },
      portalHub: {
        title: "8 Cổng SpaceColors",
        desc: "Chọn cổng để bước vào một Thế giới sắc màu khác.",
        gates: {
          threadcolor: {
            title: "Thế giới màu chỉ",
            desc: "Tra cứu mã chỉ theo ảnh, màu và mã.",
            cta: "Mở"
          },
          palette: {
            title: "Thế giới dải màu",
            desc: "Khám phá bảng màu theo dải và cảm xúc.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          gem: {
            title: "Thế giới ngọc",
            desc: "Tông màu quý, ánh kim và chiều sâu.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          silk: {
            title: "Thế giới tơ lụa",
            desc: "Bảng màu mềm, mịn và mơ màng.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          craft: {
            title: "Thế giới thủ công",
            desc: "Sắc màu truyền thống, ấm và gần gũi.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          light: {
            title: "Thế giới ánh sáng",
            desc: "Dải màu rực rỡ, phản quang và sáng bừng.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          minimal: {
            title: "Thế giới tối giản",
            desc: "Bảng màu tối giản, tinh gọn và sang.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          memory: {
            title: "Thế giới ký ức",
            desc: "Màu sắc hoài niệm và chất liệu xưa.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          }
        }
      },
      footer: {
        columns: {
          tools: {
            title: "Công cụ",
            threadcolor: "Tra mã chỉ (HEX/Ảnh)",
            threadvault: "Kho chỉ",
            library: "Thư viện màu",
            palette: "Tạo bảng phối",
            gradient: "Tạo dải chuyển",
            imagecolor: "Lấy màu từ ảnh",
            printcolor: "Đổi màu in CMYK",
            paintfabric: "Phối màu Sơn & Vải"
          },
          discover: {
            title: "Khám phá",
            portalHub: "8 Cổng SpaceColors",
            quickHub: "Trạm thao tác nhanh",
            rouletteHub: "Vòng quay màu nhấn (A1→A3)",
            forgeHub: "Lò rèn màu nhấn (A1→A3)",
            community: "Cộng đồng"
          },
          support: {
            title: "Hỗ trợ",
            help: "Hỗ trợ giải đáp",
            helpDesc: "Dành cho cách dùng, chọn Thế giới phù hợp, dữ liệu màu, lưu/xuất/đồng bộ và sai lệch màu.",
            helpCta: "Xem hướng dẫn theo luồng",
            bug: "Báo lỗi",
            bugDesc: "Dùng khi có lỗi thao tác hoặc lỗi hiển thị. Ưu tiên gửi trang gặp lỗi, bước tái hiện, thiết bị/trình duyệt và ảnh chụp.",
            bugCta: "Mở luồng báo lỗi",
            feature: "Đề xuất tính năng",
            featureDesc: "Dành cho đề xuất tính năng mới, cải tiến workflow, UI/layout hoặc nâng cấp các Thế giới/Không gian hiện có.",
            featureCta: "Gửi đề xuất",
            start: "Chọn thế giới phù hợp trong 3 bước"
          },
            contact: {
              title: "Liên hệ",
              email: "Email",
              phone: "Điện thoại",
              call: "Gọi ngay",
              zalo: "Hỗ trợ trực tuyến 24/7",
              hours: "Hỗ trợ 24/7"
            }
        },
        bottom: {
          copyright: "© 2026 SpaceColors · 8Portals",
          terms: "Điều khoản",
          privacy: "Quyền riêng tư",
          cookies: "Cookie"
        }
      },
      support: {
        title: "Hỗ trợ giải đáp",
        toc: {
          title: "Mục lục câu hỏi",
          start: "Chọn thế giới phù hợp trong 3 bước",
          hex: "Tra mã chỉ từ HEX",
          image: "Tra mã chỉ từ ảnh",
          screen: "Khác màu giữa màn hình",
          save: "Lưu vào Thư viện",
          export: "Xuất bảng phối/dải chuyển",
          storage: "Dữ liệu lưu ở đâu",
          privacy: "Quyền riêng tư & telemetry",
          cmyk: "Khi nào dùng CMYK",
          remix: "Cộng đồng remix",
          pro: "Đề xuất tính năng",
          beginner: "Không làm ngành thêu bắt đầu ở đâu",
          imageOnly: "Chỉ có ảnh thì vào đâu",
          hexOnly: "Chỉ có HEX thì vào đâu",
          syncMode: "Lưu cục bộ khác gì đồng bộ",
          publicData: "Dữ liệu có tự công khai không",
          deleteData: "Yêu cầu xoá dữ liệu",
          bug: "Báo lỗi hiệu quả"
        },
        q1: "Chọn thế giới phù hợp trong 3 bước",
        a1: "Bước 1: Xác định bạn đang có gì (ý tưởng, ảnh, mã màu hoặc nhu cầu hỏi cộng đồng).\nBước 2: Xác định bạn muốn làm gì (khám phá, phối, tra, lưu hay chia sẻ).\nBước 3: Mở card Thế giới hoặc Không gian Cộng đồng tương ứng ở cụm điều phối.",
        q2: "Tra mã chỉ từ HEX hoạt động thế nào?",
        a2: "Khi nào dùng: Khi bạn đã có mã HEX và cần tìm mã chỉ gần nhất.\nCách hoạt động: Hệ thống chuẩn hoá HEX, so khớp theo không gian màu và trả về các phương án gần nhất theo độ lệch.\nGiới hạn cần biết: Kết quả là so khớp số, vẫn có thể chênh nhẹ với chỉ thực tế theo chất liệu và ánh sáng.\nCách đạt kết quả tốt hơn: Giữ ngưỡng ΔE phù hợp, lọc theo hãng chỉ mục tiêu và kiểm tra thêm bằng mẫu thật khi sản xuất.",
        q3: "Tra mã chỉ từ ảnh hoạt động thế nào?",
        a3: "Khi nào dùng: Khi bạn chỉ có ảnh tham chiếu, chưa có HEX cụ thể.\nCách hoạt động: Ảnh được lấy mẫu màu chính, sau đó từng màu được so khớp với kho mã chỉ.\nGiới hạn cần biết: Ảnh có thể bị lệch do ánh sáng, cân bằng trắng hoặc nén ảnh.\nCách đạt kết quả tốt hơn: Dùng ảnh đủ sáng, tránh ám màu mạnh và chọn vùng mẫu rõ trước khi tra.",
        q4: "Vì sao kết quả khác nhau giữa các màn hình?",
        a4: "Khi nào dùng: Khi bạn thấy cùng một mã màu nhưng hiển thị khác giữa thiết bị.\nCách hoạt động: Mỗi màn hình có profile, độ sáng và nhiệt màu riêng nên màu hiển thị không tuyệt đối giống nhau.\nGiới hạn cần biết: Màn hình không thể thay thế hoàn toàn việc duyệt mẫu thật.\nCách đạt kết quả tốt hơn: Giảm độ sáng quá cao, dùng thiết bị đã cân chỉnh và chốt bằng mẫu vật lý trước khi in/sản xuất.",
        q5: "Cách lưu vào Thư viện màu",
        a5: "Khi nào dùng: Khi bạn muốn tái sử dụng bảng phối, dải màu hoặc kết quả tra cứu.\nCách hoạt động: Tại từng Thế giới, chọn tài sản và bấm Lưu vào Thư viện để ghi lại metadata cần thiết.\nGiới hạn cần biết: Nếu chưa đăng nhập, dữ liệu thường chỉ tồn tại trên thiết bị hiện tại.\nCách đạt kết quả tốt hơn: Đặt tên theo ngữ cảnh dự án và gắn ghi chú ngắn để tìm lại nhanh.",
        q6: "Cách xuất bảng phối / dải chuyển",
        a6: "Khi nào dùng: Khi bạn cần chuyển kết quả sang UI, branding hoặc tài liệu bàn giao.\nCách hoạt động: Dùng nút Xuất ở World tương ứng để lấy CSS, token hoặc định dạng dùng tiếp.\nGiới hạn cần biết: Mỗi định dạng phục vụ mục tiêu khác nhau, không phải bản nào cũng phù hợp in ấn.\nCách đạt kết quả tốt hơn: Chốt bối cảnh sử dụng trước, rồi chọn đúng định dạng xuất ngay từ đầu.",
        q7: "Dữ liệu lưu ở đâu?",
        a7: "Khi nào dùng: Khi bạn cần biết dữ liệu đang ở máy hay đã đồng bộ tài khoản.\nCách hoạt động: Mặc định hệ ưu tiên lưu cục bộ trên trình duyệt; một số dữ liệu có thể đồng bộ khi đăng nhập.\nGiới hạn cần biết: Xoá dữ liệu trình duyệt có thể làm mất phần lưu cục bộ chưa đồng bộ.\nCách đạt kết quả tốt hơn: Với tài sản quan trọng, hãy đăng nhập và định kỳ xuất bản sao dự phòng.",
        q8: "Quyền riêng tư & telemetry",
        a8: "Khi nào dùng: Khi bạn muốn hiểu hệ đo lường thu gì và dùng vào đâu.\nCách hoạt động: Telemetry vận hành chỉ phục vụ cải thiện ổn định, hiệu năng và trải nghiệm sản phẩm.\nGiới hạn cần biết: Telemetry không thay thế cơ chế sao lưu dữ liệu cá nhân của bạn.\nCách đạt kết quả tốt hơn: Đọc kỹ trang Quyền riêng tư và gửi yêu cầu hỗ trợ khi cần kiểm tra hoặc xoá dữ liệu.",
        q9: "Khi nào nên dùng CMYK",
        a9: "Khi nào dùng: Khi đầu ra là in ấn và cần kiểm soát rủi ro lệch màu.\nCách hoạt động: World Màu in chuyển đổi RGB/HEX sang CMYK, kèm cảnh báo TAC và mức lệch dự kiến.\nGiới hạn cần biết: Kết quả vẫn phụ thuộc vật liệu in, mực và profile thiết bị thực tế.\nCách đạt kết quả tốt hơn: Làm preflight, dùng profile phù hợp nhà in và duyệt proof trước khi in số lượng lớn.",
        q10: "Cộng đồng remix hoạt động ra sao?",
        a10: "Khi nào dùng: Khi bạn muốn học nhanh từ case thật hoặc tái dùng asset có sẵn.\nCách hoạt động: Bạn chia sẻ asset lên feed, người khác có thể remix và tiếp tục phát triển từ bản gốc.\nGiới hạn cần biết: Chất lượng remix phụ thuộc dữ liệu nguồn và mức độ mô tả bối cảnh.\nCách đạt kết quả tốt hơn: Ghi rõ mục tiêu, chất liệu và đầu ra để cộng đồng remix đúng hướng.",
        q11: "Đề xuất tính năng thế nào để dễ triển khai?",
        a11: "Khi nào dùng: Khi bạn muốn đề xuất công cụ mới hoặc cải tiến luồng làm việc hiện có.\nCách hoạt động: Mô tả mục tiêu, bối cảnh sử dụng và kết quả mong muốn theo đầu ra cụ thể.\nGiới hạn cần biết: Đề xuất quá chung sẽ khó ưu tiên trong lộ trình.\nCách đạt kết quả tốt hơn: Gửi kèm ví dụ trước/sau hoặc pain point rõ ràng theo từng Thế giới.",
        q12: "Cách báo lỗi hiệu quả",
        a12: "Khi nào dùng: Khi lỗi lặp lại hoặc ảnh hưởng tới tiến độ công việc.\nCách hoạt động: Gửi báo lỗi kèm trang đang ở, thao tác gây lỗi và kết quả thực tế.\nGiới hạn cần biết: Thiếu bối cảnh sẽ làm chậm quá trình xác minh.\nCách đạt kết quả tốt hơn: Bổ sung thiết bị/trình duyệt, ảnh chụp màn hình và bước tái hiện theo thứ tự.",
        q13: "Tôi không làm ngành thêu thì bắt đầu ở đâu?",
        a13: "Khi nào dùng: Khi bạn làm web/UI, branding, nội thất hoặc sản phẩm số.\nCách hoạt động: Bắt đầu từ cổng hành trình theo mục tiêu, không bắt buộc đi qua World Màu thêu.\nGiới hạn cần biết: Mỗi World tối ưu cho một bài toán khác nhau nên không có một tuyến duy nhất cho mọi trường hợp.\nCách đạt kết quả tốt hơn: Chọn theo đầu ra cuối cùng của bạn: palette, gradient, print hoặc thư viện asset.",
        q14: "Chỉ có ảnh thì nên vào Thế giới nào?",
        a14: "Khi nào dùng: Khi đầu vào duy nhất là ảnh tham chiếu.\nCách hoạt động: Vào Màu từ Ảnh để trích palette, rồi chuyển tiếp sang Palette/Gradient/PrintColor theo nhu cầu.\nGiới hạn cần biết: Ảnh mờ hoặc ánh sáng lệch sẽ làm kết quả kém ổn định.\nCách đạt kết quả tốt hơn: Chọn ảnh rõ chủ thể, lấy mẫu đúng vùng màu chính và lưu asset ngay sau khi trích.",
        q15: "Chỉ có HEX thì nên vào Thế giới nào?",
        a15: "Khi nào dùng: Khi bạn đã có mã màu cụ thể từ brand kit hoặc tài liệu kỹ thuật.\nCách hoạt động: Vào ThreadColor nếu cần mã chỉ, vào Palette nếu cần phối bộ, vào Gradient nếu cần dải chuyển.\nGiới hạn cần biết: Một HEX có thể cần tinh chỉnh theo nền, chất liệu và mục tiêu hiển thị.\nCách đạt kết quả tốt hơn: Chốt bối cảnh áp dụng trước rồi mới xuất dữ liệu để tránh làm lại nhiều vòng.",
        q16: "Lưu cục bộ khác gì đăng nhập đồng bộ?",
        a16: "Khi nào dùng: Khi bạn phân vân giữa làm nhanh trên máy hiện tại và làm việc đa thiết bị.\nCách hoạt động: Lưu cục bộ giữ dữ liệu trong trình duyệt hiện tại; đăng nhập giúp đồng bộ theo tài khoản khi tính năng hỗ trợ.\nGiới hạn cần biết: Dọn cache hoặc đổi trình duyệt có thể mất dữ liệu cục bộ chưa đồng bộ.\nCách đạt kết quả tốt hơn: Với dự án quan trọng, vừa đăng nhập vừa xuất bản sao định kỳ.",
        q17: "Dữ liệu của tôi có tự công khai lên Cộng đồng không?",
        a17: "Khi nào dùng: Khi bạn muốn chắc chắn asset nội bộ không tự xuất hiện công khai.\nCách hoạt động: Dữ liệu chỉ được đưa lên Cộng đồng khi bạn chủ động chọn chia sẻ/remix.\nGiới hạn cần biết: Các thao tác chia sẻ công khai sẽ tạo dấu vết hiển thị theo ngữ cảnh cộng đồng.\nCách đạt kết quả tốt hơn: Kiểm tra lại trạng thái chia sẻ trước khi bấm xác nhận.",
        q18: "Tôi có thể yêu cầu xoá dữ liệu như thế nào?",
        a18: "Khi nào dùng: Khi bạn cần xoá dữ liệu cá nhân hoặc asset đã đồng bộ.\nCách hoạt động: Gửi yêu cầu hỗ trợ kèm email đăng nhập, phạm vi dữ liệu và mốc thời gian gần đúng.\nGiới hạn cần biết: Yêu cầu thiếu thông tin định danh có thể cần xác minh bổ sung.\nCách đạt kết quả tốt hơn: Nêu rõ loại dữ liệu cần xoá và gửi từ email đã dùng đăng nhập để xử lý nhanh.",
        form: {
          title: "Gửi yêu cầu hỗ trợ",
          type: "Loại yêu cầu",
          email: "Email liên hệ (tuỳ chọn)",
          message: "Nội dung",
          emailPlaceholder: "you@email.com",
          messagePlaceholder: "Mô tả chi tiết, bước tái hiện...",
          send: "Gửi yêu cầu",
          fallback: "Không mở được mail, hãy sao chép nội dung và gửi tới spacecolor8portals@gmail.com.",
          type: {
            ask: "Hỏi đáp",
            bug: "Báo lỗi",
            feature: "Đề xuất tính năng"
          }
        }
      },
      quick: {
        title: "Hành động nhanh",
        desc: "Truy cập nhanh các tác vụ chính của 8Portal.",
        items: {
          threadcolor: {
            title: "Tra mã chỉ",
            desc: "Tra cứu màu chỉ theo ảnh, mã hoặc màu chọn.",
            cta: "Mở công cụ"
          },
          library: {
            title: "Thư viện",
            desc: "Lưu và xem lại các lần tra cứu của bạn.",
            cta: "Sắp ra mắt"
          },
          contribute: {
            title: "Đóng góp dữ liệu",
            desc: "Gửi màu và mã chỉ mới cho cộng đồng.",
            cta: "Bắt đầu"
          },
          verify: {
            title: "Xác minh",
            desc: "Dành cho admin duyệt dữ liệu cộng đồng.",
            cta: "Đi tới"
          }
        }
      },
      roulette: {
        title: "Vòng quay bảng phối màu",
        desc: "Chọn ngẫu nhiên một bộ màu nhấn để khám phá nhanh.",
        spin: "Quay màu",
        reset: "Đặt lại"
      },
      forge: {
        title: "Lò rèn dải màu",
        desc: "Tuỳ chỉnh bộ màu nhấn để phù hợp với gu của bạn.",
        a1: { label: "Màu nhấn 1" },
        a2: { label: "Màu nhấn 2" },
        a3: { label: "Màu nhấn 3" },
        preview: "Xem trước gradient",
        copy: "Sao chép CSS"
      },
      gradient: {
        openHexHub: "Mở Kho HEX",
        presets: {
          title: "Preset dải chuyển",
          hint: "Chọn nhanh mẫu dải chuyển để áp ngay.",
          items: {
            neon: "Neon",
            ocean: "Đại dương",
            ink: "Mực tàu",
            sunset: "Hoàng hôn",
            chrome: "Chrome",
            crystal: "Pha lê",
            forest: "Lá non",
            ember: "Hổ phách"
          }
        },
        myPresets: {
          title: "Preset của tôi",
          hint: "Lưu dải chuyển hiện tại để dùng lại nhanh ở lần sau.",
          save: "Lưu thành preset",
          empty: "Chưa có preset của bạn. Hãy lưu dải chuyển hiện tại để dùng lại nhanh.",
          defaultName: "Preset {index}",
          meta: "{count} điểm neo · cập nhật {updated}",
          renamePrompt: "Nhập tên preset mới",
          copyName: "{name} (bản sao)",
          confirmDelete: "Bạn có chắc muốn xoá?",
          actions: {
            apply: "Áp dụng",
            rename: "Đổi tên",
            duplicate: "Nhân bản",
            delete: "Xoá"
          },
          toast: {
            saved: "Đã lưu thành preset.",
            applied: "Đã áp dụng preset cá nhân.",
            renamed: "Đã đổi tên preset.",
            duplicated: "Đã nhân bản preset.",
            deleted: "Đã xoá preset.",
            renameEmpty: "Tên preset không được để trống.",
            limitReached: "Đã đạt giới hạn {limit} preset.",
            invalid: "Không thể lưu preset hiện tại.",
            saveFailed: "Không thể lưu preset vào trình duyệt."
          }
        },
        contextPreview: {
          title: "Xem thử theo bối cảnh",
          hint: "Áp dải chuyển hiện tại lên tình huống thật để chốt nhanh trước khi xuất.",
          tabs: {
            ui: "Giao diện",
            poster: "Áp phích",
            thread: "Thêu"
          },
          ui: {
            badge: "Mẫu giao diện",
            surface: "Bề mặt chính",
            title: "Bảng điều khiển sản phẩm",
            desc: "Xem nhanh độ nổi của dải chuyển trên card nội dung và thành phần thao tác.",
            cta: "Nút kêu gọi",
            badgeTag: "Nhãn nổi bật"
          },
          poster: {
            badge: "Mẫu áp phích",
            headline: "Bùng nổ cảm hứng sắc màu",
            subhead: "Đánh giá nhanh mức tương phản giữa tiêu đề, mô tả và nút hành động trên nền dải chuyển.",
            cta: "Đặt chỗ ngay"
          },
          thread: {
            badge: "Mẫu thêu",
            title: "Mảng chỉ trên nền vải",
            desc: "Mô phỏng vải và đường chỉ nhẹ để quan sát cảm giác chuyển màu trong bối cảnh thủ công.",
            cta: "Xem bảng chỉ"
          }
        },
        banding: {
          title: "Chấm banding",
          hint: "Đánh giá nhanh nguy cơ vệt phân tầng trên dải chuyển hiện tại.",
          scoreLabel: "Điểm mượt",
          tooltipLabel: "Giải thích banding",
          tooltipText: "Banding là vệt phân tầng màu khi dải chuyển không mượt.",
          meta: "Đứng màu: {flatPct}% · Biến thiên thấp: {lowPct}%",
          suggestion: "Gợi ý: thêm điểm neo quanh {pos}% ({color}).",
          suggestionNone: "Hiện chưa cần thêm điểm neo giữa.",
          suggestionMax: "Đã đủ số điểm neo tối đa, hãy chỉnh vị trí hoặc màu trước khi thêm mới.",
          status: {
            smooth: "Mượt",
            risk: "Có nguy cơ banding",
            high: "Dễ banding"
          },
          actions: {
            addMidStop: "Thêm điểm neo giữa",
            addDither: "Thêm hạt mịn (dither)",
            removeDither: "Tắt hạt mịn (dither)"
          },
          toast: {
            midStopAdded: "Đã thêm điểm neo giữa tại {pos}% ({color}).",
            ditherOn: "Đã bật hạt mịn cho preview.",
            ditherOff: "Đã tắt hạt mịn cho preview."
          }
        },
        shareState: {
          copyLink: "Sao chép link chia sẻ",
          toast: {
            copied: "Đã sao chép link!",
            invalidLink: "Link chia sẻ không hợp lệ."
          }
        },
        history: {
          undo: "Hoàn tác",
          redo: "Làm lại"
        },
        copy: {
          menu: "Tùy chọn sao chép",
          css: "Sao chép CSS",
          token: "Sao chép token",
          tailwind: "Sao chép Tailwind"
        },
        import: {
          open: "Nhập từ CSS",
          title: "Nhập từ CSS",
          hint: "Dán chuỗi linear-gradient(...) để phân tích và áp dụng nhanh.",
          inputLabel: "Dán CSS dải chuyển",
          placeholder: "linear-gradient(90deg, #ff6b6b 0%, #ffd93d 50%, #6ee7b7 100%)",
          apply: "Phân tích & áp dụng",
          unsupported: "Không hỗ trợ cú pháp này. Hãy dùng linear-gradient(...) hợp lệ.",
          applied: "Đã phân tích và áp dụng dải chuyển từ CSS."
        },
        exportMulti: {
          title: "Xuất đa định dạng",
          tabs: {
            css: "CSS",
            cssVars: "Biến CSS",
            token: "Token",
            tailwind: "Tailwind"
          }
        },
        toast: {
          copiedCss: "Đã sao chép CSS.",
          copiedToken: "Đã sao chép token.",
          copiedTokenPercent: "Đã sao chép token có %.",
          copiedTailwind: "Đã sao chép Tailwind.",
          copiedSvg: "Đã sao chép SVG gradient.",
          copiedFallback: "Đã sao chép.",
          copyFailed: "Không thể sao chép.",
          svgFailed: "Không thể tạo SVG.",
          svgCopyFailed: "Không thể sao chép SVG.",
          undo: "Đã hoàn tác.",
          redo: "Đã làm lại.",
          presetApplied: "Đã áp dụng preset dải chuyển.",
          savedLibrary: "Đã lưu vào Thư viện.",
          saveFailed: "Không thể lưu tài sản.",
          pasteCss: "Hãy dán CSS gradient trước khi nhập."
        }
      },
      paletteTool: {
        roles: {
          title: "Phân vai màu",
          hint: "Gán vai màu theo nền/chữ/nhấn để kiểm tra workflow thực tế.",
          items: {
            bg: "Nền",
            surface: "Nền phụ",
            text: "Chữ chính",
            muted: "Chữ phụ",
            accent: "Nhấn (CTA)"
          },
          option: "Màu {index} · {hex}",
          reset: "Đặt lại"
        },
        matrix: {
          title: "Ma trận tương phản",
          hint: "Tỷ lệ tương phản càng cao càng dễ đọc.",
          tooltip: "Tỷ lệ tương phản càng cao càng dễ đọc.",
          tabs: {
            checks: "Kiểm tra",
            suggest: "Đề xuất"
          },
          rows: {
            textBg: "Chữ chính / Nền",
            mutedBg: "Chữ phụ / Nền",
            textSurface: "Chữ chính / Nền phụ",
            mutedSurface: "Chữ phụ / Nền phụ",
            ctaAccent: "Chữ trên Nhấn (CTA)"
          },
          badge: {
            aaa: "Đạt AAA",
            aa: "Đạt AA",
            fail: "Chưa đạt",
            guideline: "Đạt theo Hướng dẫn Team"
          },
          actions: {
            pickBW: "Ưu tiên chữ {color}",
            pickBest: "Chọn màu palette dễ đọc nhất"
          },
          black: "Đen",
          white: "Trắng",
          guideline: {
            title: "Hướng dẫn Team",
            summary: "Hướng dẫn Team: {level} · chữ {size} · khóa vai: {locked} · tối đa {steps} bước",
            noneLocked: "không khóa",
            textSize: {
              normal: "thường",
              large: "lớn"
            },
            fields: {
              targetLevel: "Mức chuẩn",
              textSize: "Cỡ chữ",
              maxAdjustSteps: "Số bước chỉnh tối đa",
              preferKeepHue: "Giữ sắc độ (ưu tiên giữ hue)",
              lockedRoles: "Khóa vai"
            },
            actions: {
              resetDraft: "Đặt lại mặc định",
              save: "Lưu Hướng dẫn Team"
            },
            hint: {
              noTeam: "Chuyển sang phạm vi Team để dùng Hướng dẫn Team cho Ma trận tương phản.",
              activeTeam: "Đang áp dụng chuẩn tương phản của Team hiện tại."
            },
            state: {
              personal: "Đang dùng bộ mặc định cục bộ.",
              editable: "Bạn có thể chỉnh và lưu Hướng dẫn Team.",
              readonly: "Bạn chỉ có quyền xem Hướng dẫn Team."
            },
            toast: {
              loadFailed: "Không thể tải Hướng dẫn Team.",
              saveFailed: "Không thể lưu Hướng dẫn Team.",
              saved: "Đã lưu Hướng dẫn Team.",
              readonly: "Bạn chỉ có quyền xem Hướng dẫn Team.",
              needTeam: "Hãy chọn Team trước khi lưu Hướng dẫn Team."
            }
          },
          suggest: {
            state: "Có {count} đề xuất tự động.",
            allPass: "Palette hiện tại đã đạt Hướng dẫn Team.",
            none: "Chưa tạo được đề xuất phù hợp với Hướng dẫn Team hiện tại.",
            itemTitle: "Phương án {index} · {title}",
            itemMeta: "{desc} · Giảm {fixed} cặp lỗi · Mức thay đổi {score}",
            options: {
              bwTitle: "Ưu tiên chữ đen/trắng",
              bwDesc: "Đổi chữ sang đen hoặc trắng để đạt ngưỡng nhanh nhất.",
              textLightTitle: "Tinh chỉnh chữ theo độ sáng",
              textLightDesc: "Giữ nhận diện, chỉ chỉnh sáng/tối ở vai chữ để vượt ngưỡng.",
              bgLightTitle: "Tinh chỉnh nền theo độ sáng",
              bgLightDesc: "Điều chỉnh vai nền để giữ đọc tốt mà ít thay đổi nhất."
            },
            actions: {
              preview: "Xem trước",
              previewing: "Đang xem trước",
              apply: "Áp dụng"
            },
            applyRevisionLabel: "Áp dụng đề xuất tương phản",
            toast: {
              noChange: "Không có thay đổi nào để áp dụng.",
              applyRoomFailed: "Không thể đồng bộ đề xuất vào phòng.",
              applied: "Đã áp dụng đề xuất tự động."
            }
          }
        },
        preview: {
          title: "Xem thử theo bối cảnh",
          tabs: {
            ui: "Giao diện",
            poster: "Áp phích"
          },
          cvd: {
            label: "Mô phỏng mù màu",
            modes: {
              normal: "Bình thường",
              deuteranopia: "Mù đỏ–lục",
              protanopia: "Mù đỏ",
              tritanopia: "Mù xanh",
              grayscale: "Đơn sắc"
            }
          },
          ui: {
            header: "Khung giao diện sản phẩm",
            title: "Tiêu đề nội dung",
            body: "Mô phỏng card thật để nhìn rõ độ đọc của chữ và nút hành động.",
            cta: "Nút kêu gọi",
            badge: "Nhãn"
          },
          poster: {
            title: "Áp phích giới thiệu bộ sưu tập",
            body: "Kiểm tra mức nổi bật của tiêu đề, mô tả và CTA trong bối cảnh áp phích.",
            cta: "Đăng ký ngay"
          }
        },
        extract: {
          title: "Trích xuất từ ảnh",
          desc: "Chọn hoặc kéo thả ảnh để lấy bảng phối màu nhanh.",
          cta: "Mở ảnh",
          drop: {
            text: "Thả ảnh vào đây hoặc bấm để chọn ảnh",
            hint: "Hỗ trợ JPG, PNG, WebP. Ảnh sẽ được giảm kích thước tối đa 512px."
          },
          count: "Số màu trích xuất",
          priority: {
            label: "Ưu tiên",
            vivid: "Ưu tiên màu rực",
            soft: "Ưu tiên màu dịu"
          },
          extractAction: "Trích xuất palette",
          resultTitle: "Palette đề xuất",
          useAction: "Dùng palette này",
          paletteName: "Palette từ ảnh",
          meta: {
            empty: "Chưa chọn ảnh.",
            loading: "Đang chuẩn bị ảnh...",
            ready: "Ảnh gốc {srcW}×{srcH} → xử lý {dstW}×{dstH}."
          },
          toast: {
            invalidFile: "Vui lòng chọn tệp ảnh hợp lệ.",
            needImage: "Hãy chọn ảnh trước khi trích xuất.",
            failed: "Không thể trích xuất màu từ ảnh này.",
            extracted: "Đã trích xuất {count} màu.",
            emptyResult: "Chưa có palette để áp dụng.",
            applied: "Đã áp dụng palette từ ảnh.",
            tooSmall: "Ảnh quá nhỏ để trích xuất màu."
          }
        },
        token: {
          copy: "Sao chép token vai màu",
          copied: "Đã sao chép token vai màu.",
          copyFail: "Không thể sao chép token vai màu."
        },
        library: {
          saveButton: "Lưu vào Thư viện",
          useButton: "Dùng từ Thư viện",
          fallbackName: "Preset bảng phối",
          sectionTitle: "Từ Thư viện",
          sectionDesc: "Preset bảng phối đã lưu theo tài khoản.",
          refresh: "Tải lại",
          openPage: "Mở trang Thư viện",
          loading: "Đang tải preset từ Thư viện...",
          needLogin: "Đăng nhập để xem preset từ Thư viện.",
          empty: "Chưa có preset nào trong Thư viện.",
          apply: "Áp dụng",
          copyToken: "Sao chép token vai màu",
          team: {
            saveButton: "Lưu vào Thư viện Team",
            scope: {
              personal: "Cá nhân",
              team: "Team"
            },
            noTeamOption: "Chưa có team",
            current: "Đang xem team {team} · quyền {role}.",
            needSelect: "Hãy chọn team để xem Thư viện Team.",
            personalHint: "Đang xem thư viện cá nhân.",
            empty: "Chưa có preset nào trong Thư viện Team.",
            locked: "Đang khoá",
            unlocked: "Đang mở",
            roles: {
              owner: "Chủ sở hữu",
              approver: "Người phê duyệt",
              editor: "Biên tập",
              viewer: "Chỉ xem"
            },
            actions: {
              update: "Cập nhật",
              delete: "Xoá",
              lock: "Khoá",
              unlock: "Mở khoá"
            },
            confirmDelete: "Bạn có chắc muốn xoá preset team này?"
          },
          approval: {
            status: {
              draft: "Bản nháp",
              in_review: "Chờ phê duyệt",
              approved: "Đã phê duyệt",
              published: "Đã phát hành",
              changes_requested: "Yêu cầu chỉnh sửa",
              rejected: "Từ chối"
            },
            actions: {
              history: "Lịch sử phê duyệt",
              submit: "Gửi phê duyệt",
              approve: "Duyệt",
              requestChanges: "Yêu cầu chỉnh sửa",
              changes_requested: "Yêu cầu chỉnh sửa",
              reject: "Từ chối",
              publish: "Phát hành",
              comment: "Bình luận",
              update: "Cập nhật"
            },
            prompt: {
              submit: "Nhập ghi chú gửi phê duyệt (tuỳ chọn):",
              approve: "Nhập ghi chú duyệt (tuỳ chọn):",
              requestChanges: "Nhập yêu cầu chỉnh sửa:",
              reject: "Nhập lý do từ chối:"
            },
            modal: {
              title: "Lịch sử phê duyệt · {name}",
              loading: "Đang tải lịch sử phê duyệt...",
              empty: "Chưa có lịch sử phê duyệt cho preset này.",
              count: "Có {count} bản ghi phê duyệt.",
              currentStatus: "Trạng thái hiện tại: {status}",
              itemTitle: "{action} · {from} → {to}",
              itemMeta: "{time} · {uid}",
              commentLabel: "Bình luận phê duyệt",
              commentPlaceholder: "Nhập bình luận cho vòng phê duyệt...",
              readonlyComment: "Bạn đang ở chế độ chỉ xem.",
              addComment: "Gửi bình luận"
            },
            toast: {
              transitionDenied: "Bạn không có quyền thực hiện bước chuyển trạng thái này.",
              updateFailed: "Không thể cập nhật trạng thái phê duyệt.",
              readonly: "Bạn không có quyền ghi nhận xét phê duyệt.",
              commentRequired: "Hãy nhập bình luận trước khi gửi.",
              commentSent: "Đã gửi bình luận phê duyệt.",
              statusChanged: "Đã chuyển trạng thái sang {status}.",
              status: {
                draft: "Bản nháp",
                in_review: "Chờ phê duyệt",
                approved: "Đã phê duyệt",
                published: "Đã phát hành",
                changes_requested: "Yêu cầu chỉnh sửa",
                rejected: "Từ chối"
              }
            }
          },
          release: {
            actions: {
              viewSignature: "Xem chữ ký phát hành",
              downloadBundle: "Tải gói tokens",
              copyCssVars: "Sao chép CSS variables",
              copySignature: "Sao chép mã băm chữ ký",
              copyPolicyHash: "Sao chép mã băm chính sách"
            },
            modal: {
              title: "Chữ ký phát hành · {name}",
              loading: "Đang tải chữ ký phát hành...",
              missing: "Chưa có dữ liệu chữ ký phát hành.",
              status: "Bản phát hành đã ký đang có hiệu lực.",
              releaseId: "Mã phát hành",
              version: "Phiên bản",
              signedBy: "Ký bởi",
              signedAt: "Thời điểm ký",
              signatureHash: "Mã băm chữ ký",
              policyHash: "Mã băm chính sách"
            },
            toast: {
              missing: "Preset này chưa có bản phát hành.",
              loadFailed: "Không thể tải chữ ký phát hành.",
              signFailed: "Không thể tạo chữ ký phát hành.",
              releaseCreated: "Đã tạo bản phát hành có chữ ký.",
              bundleMissing: "Không tìm thấy gói tokens cho bản phát hành này.",
              copyCssOk: "Đã sao chép CSS variables.",
              copyCssFail: "Không thể sao chép CSS variables.",
              downloadBundleOk: "Đã tải gói tokens.",
              downloadBundleFail: "Không thể tải gói tokens.",
              copySignatureOk: "Đã sao chép mã băm chữ ký.",
              copySignatureFail: "Không thể sao chép mã băm chữ ký.",
              copyPolicyOk: "Đã sao chép mã băm chính sách.",
              copyPolicyFail: "Không thể sao chép mã băm chính sách."
            }
          },
          meta: {
            noTag: "Không có tag",
            updated: "Cập nhật: {time}",
            updatedUnknown: "Chưa có thời gian cập nhật."
          },
          modal: {
            title: "Lưu preset bảng phối",
            titleUpdate: "Cập nhật preset bảng phối",
            close: "Đóng",
            name: "Tên preset",
            namePlaceholder: "Ví dụ: Bộ màu landing tháng 3",
            tags: "Nhãn",
            tagsPlaceholder: "ui, thương hiệu, chiến dịch",
            notes: "Ghi chú (tuỳ chọn)",
            notesPlaceholder: "Mục tiêu sử dụng, bối cảnh...",
            cancel: "Huỷ",
            save: "Lưu preset"
          },
          toast: {
            missingPalette: "Hãy chọn một bảng phối màu.",
            loginToSave: "Cần đăng nhập để lưu vào Thư viện.",
            loginToLoad: "Cần đăng nhập để tải preset từ Thư viện.",
            nameRequired: "Hãy nhập tên preset.",
            saved: "Đã lưu preset vào Thư viện.",
            saveFailed: "Không thể lưu preset vào Thư viện.",
            loadFailed: "Không thể tải preset từ Thư viện.",
            loaded: "Đã áp dụng preset từ Thư viện.",
            invalidPreset: "Preset trong Thư viện không hợp lệ.",
            tokenCopied: "Đã sao chép token vai màu.",
            tokenCopyFail: "Không thể sao chép token vai màu.",
            noTeam: "Bạn chưa thuộc team nào.",
            teamLoadFailed: "Không thể tải danh sách team.",
            viewerReadOnly: "Bạn chỉ có quyền xem trong team này.",
            teamSaved: "Đã lưu preset vào Thư viện Team.",
            teamUpdated: "Đã cập nhật preset team.",
            teamSaveFailed: "Không thể lưu preset vào Thư viện Team.",
            teamDeleted: "Đã xoá preset team.",
            teamDeleteFailed: "Không thể xoá preset team.",
            teamLocked: "Đã khoá preset team.",
            teamUnlocked: "Đã mở khoá preset team.",
            teamLockFailed: "Không thể cập nhật trạng thái khoá."
          }
        },
        shareState: {
          copyLink: "Sao chép link chia sẻ",
          copyShortLink: "Sao chép link rút gọn",
          linkPaletteName: "Bảng phối màu từ link chia sẻ",
          linkPaletteTag: "từ link chia sẻ",
          toast: {
            copied: "Đã sao chép link!",
            copyFail: "Không thể sao chép link chia sẻ.",
            invalidLink: "Link chia sẻ không hợp lệ.",
            shortCopied: "Đã sao chép link rút gọn!",
            shortCreateFail: "Không thể tạo link rút gọn.",
            shortNotFound: "Không tìm thấy link rút gọn.",
            shortInvalid: "Link rút gọn không hợp lệ.",
            shortLoadFail: "Không thể tải link rút gọn."
          }
        },
        room: {
          barLabel: "Phòng chỉnh sửa",
          fallbackName: "Phòng {id}",
          roomPaletteName: "Bảng phối màu từ Phòng chỉnh sửa",
          roomPaletteTag: "từ phòng chỉnh sửa",
          presence: {
            fallbackUser: "Thành viên",
            empty: "Chưa có ai online",
            onlineCount: "{count} online",
            more: "Thêm {count} người đang online",
            editingBy: "đang chỉnh bởi {name}"
          },
          revisions: {
            title: "Lịch sử phiên bản",
            desc: "Timeline các phiên bản để xem và khôi phục.",
            create: "Tạo mốc phiên bản",
            unknownTime: "Không rõ thời gian",
            you: "Bạn",
            restoredLabel: "Khôi phục từ rev {rev}",
            confirmRestore: "Khôi phục phiên bản rev {rev}?",
            state: {
              idle: "Kết nối phòng để xem lịch sử phiên bản.",
              loading: "Đang tải lịch sử phiên bản...",
              saving: "Đang lưu mốc phiên bản...",
              ready: "Danh sách phiên bản đã sẵn sàng.",
              empty: "Chưa có mốc phiên bản.",
              rateLimited: "Bạn vừa tạo mốc, thử lại sau vài giây.",
              error: "Không thể tải lịch sử phiên bản."
            },
            item: {
              title: "Rev {rev}",
              titleWithLabel: "Rev {rev} · {label}",
              meta: "{time} · bởi {uid}"
            },
            preview: {
              title: "Rev {rev}",
              titleWithLabel: "Rev {rev} · {label}",
              meta: "{time} · bởi {uid}"
            },
            actions: {
              view: "Xem",
              restore: "Khôi phục"
            },
            toast: {
              invalidState: "Trạng thái hiện tại chưa sẵn sàng để tạo mốc phiên bản.",
              created: "Đã tạo mốc phiên bản.",
              rateLimited: "Bạn vừa tạo mốc, thử lại sau vài giây.",
              createFailed: "Không thể tạo mốc phiên bản.",
              invalidSnapshot: "Phiên bản này không hợp lệ.",
              restored: "Đã khôi phục phiên bản.",
              restoreFailed: "Không thể khôi phục phiên bản."
            }
          },
          comments: {
            title: "Bình luận theo vai màu",
            desc: "Mỗi bình luận gắn vào một vai màu để trao đổi chính xác.",
            filterLabel: "Lọc theo vai",
            filterAll: "Tất cả vai màu",
            unresolved: "{count} chưa xử lý",
            inputPlaceholder: "Nhập bình luận cho vai màu này...",
            readonlyHint: "Bạn đang ở chế độ chỉ xem, không thể bình luận.",
            submit: "Gửi bình luận",
            cancelReply: "Huỷ trả lời",
            replyingTo: "Đang trả lời: {role}",
            emptyList: "Chưa có bình luận cho vai màu đang lọc.",
            openForRole: "Bình luận",
            openRoleTooltip: "Mở bình luận cho vai màu này",
            needRoomHint: "Kết nối Phòng chỉnh sửa để bình luận.",
            you: "Bạn",
            meta: "{time} · bởi {name}",
            resolvedMeta: "Đã xử lý bởi {name}",
            state: {
              idle: "Kết nối phòng để xem bình luận.",
              loading: "Đang tải bình luận...",
              posting: "Đang gửi bình luận...",
              ready: "Đang hiển thị bình luận theo vai màu.",
              empty: "Chưa có bình luận nào.",
              error: "Không thể tải bình luận."
            },
            actions: {
              reply: "Trả lời",
              resolve: "Đã xử lý",
              unresolve: "Mở lại"
            },
            toast: {
              needRoom: "Hãy kết nối Phòng chỉnh sửa để dùng bình luận.",
              readonly: "Bạn đang ở chế độ chỉ xem, không thể bình luận.",
              empty: "Hãy nhập nội dung bình luận.",
              pickRole: "Hãy chọn vai màu để bình luận.",
              failed: "Không thể gửi bình luận.",
              created: "Đã gửi bình luận.",
              replied: "Đã gửi trả lời.",
              resolved: "Đã đánh dấu xử lý.",
              unresolved: "Đã mở lại bình luận.",
              resolveFailed: "Không thể cập nhật trạng thái xử lý."
            }
          },
          status: {
            idle: "Chưa kết nối phòng.",
            connecting: "Đang kết nối phòng...",
            needLogin: "Cần đăng nhập để vào phòng.",
            notFound: "Không tìm thấy phòng.",
            inviteOnly: "Phòng chỉ cho người được mời.",
            syncFail: "Mất kết nối đồng bộ phòng.",
            waitingState: "Đang chờ trạng thái phòng...",
            invalidState: "Trạng thái phòng không hợp lệ.",
            viewer: "Đang đồng bộ thời gian thực (chỉ xem).",
            editor: "Đang đồng bộ thời gian thực."
          },
          toast: {
            invalidRoom: "Mã phòng không hợp lệ.",
            needLogin: "Cần đăng nhập để vào Phòng chỉnh sửa.",
            notFound: "Không tìm thấy Phòng chỉnh sửa.",
            inviteOnly: "Phòng này chỉ cho người được mời.",
            joinFailed: "Không thể tham gia phòng.",
            syncFail: "Mất kết nối đồng bộ Phòng chỉnh sửa.",
            syncUnavailable: "Không thể kết nối đồng bộ phòng.",
            invalidState: "Trạng thái phòng không hợp lệ.",
            viewerReadOnly: "Bạn đang ở chế độ chỉ xem của phòng.",
            conflict: "Đã có thay đổi từ người khác..."
          }
        }
      },
      gallery: {
        title: "Bộ sưu tập sắc thái",
        desc: "8 sắc thái cảm giác.",
        activate: "Kích hoạt",
        aria: {
          nebula: "Kích hoạt Thế giới: Tinh vân",
          ocean: "Kích hoạt Thế giới: Đại dương",
          ink: "Kích hoạt Thế giới: Mực tàu",
          origami: "Kích hoạt Thế giới: Origami",
          arcade: "Kích hoạt Thế giới: Arcade",
          dunes: "Kích hoạt Thế giới: Đồi cát",
          chrome: "Kích hoạt Thế giới: Chrome",
          circuit: "Kích hoạt Thế giới: Mạch điện"
        }
      },
      footer: {
        left: "8Portal v4 · Khung A1→A3",
        right: "Token Thế giới đã sẵn sàng"
      },
      toast: {
        copied: "Đã sao chép!"
      },
      worlds: {
        nebula: {
          label: "Tinh vân",
          desc: "Tinh vân huyền ảo, ánh tím xanh sâu thẳm."
        },
        ocean: {
          label: "Đại dương",
          desc: "Đại dương mát lạnh, cảm giác trong trẻo."
        },
        ink: {
          label: "Mực tàu",
          desc: "Tối giản, mực tàu và độ sâu."
        },
        origami: {
          label: "Origami",
          desc: "Giấy gấp, ấm áp và nhẹ nhàng."
        },
        arcade: {
          label: "Arcade",
          desc: "Neon năng lượng, nhịp nhanh."
        },
        dunes: {
          label: "Đồi cát",
          desc: "Sa mạc, nắng vàng, yên tĩnh."
        },
        chrome: {
          label: "Chrome",
          desc: "Kim loại sáng, chuẩn xác, sạch."
        },
        circuit: {
          label: "Mạch điện",
          desc: "Mạch điện, xanh lục kỹ thuật."
        }
      },
      tc: {
        title: "Tra mã chỉ thêu theo màu",
        status: {
          loading: "Đang chuẩn bị dữ liệu...",
          ready: "Xong. Dữ liệu đã sẵn sàng.",
          empty: "Chưa chọn màu — hãy chọn màu trực tiếp hoặc từ ảnh.",
          noResults: "Không tìm thấy kết quả trong ngưỡng ΔE hiện tại. Thử tăng ΔE hoặc chọn thêm hãng.",
          error: "Lỗi tải dữ liệu. Vui lòng thử lại.",
          retry: "Thử lại"
        },
        result: {
          chosen: "Màu đã chọn",
          group: "Nhóm {index}",
          colors: "{count} màu",
          save: "Lưu",
          saved: "Đã lưu",
          saving: "Đang lưu...",
          noDataSave: "Không có dữ liệu để lưu.",
          loadMore: "Xem thêm ({count})",
          copyCode: "Sao chép mã",
          copyFull: "Sao chép đầy đủ"
        },
        pin: {
          pin: "Ghim",
          unpin: "Bỏ ghim",
          limit: "Chỉ ghim tối đa {count} kết quả.",
          panelTitle: "So sánh đã ghim",
          clear: "Xoá tất cả ghim",
          remove: "Bỏ ghim",
          copyCode: "Sao chép mã"
        },
        project: {
          label: "Dự án",
          placeholder: "Nhập tên dự án",
          recent: "Gần đây"
        },
        library: {
          title: "Kết quả đã lưu",
          loading: "Đang tải...",
          empty: "Chưa có bản lưu",
          open: "Mở",
          export: "Xuất CSV",
          exported: "Đã xuất CSV",
          error: "Không tải được thư viện",
          loadedFrom: "Đã tải từ Kết quả đã lưu {stamp}"
        },
        inspector: {
          copyAllLabel: "Tất cả"
        },
        toast: {
          copied: "Đã sao chép!",
          copiedWith: "Đã sao chép {label}."
        },
        action: {
          close: "Đóng"
        },
        auth: {
          needLogin: "Cần đăng nhập để tiếp tục.",
          needLoginSave: "Cần đăng nhập để lưu.",
          needLoginLibrary: "Cần đăng nhập để xem Đã lưu.",
          needLoginOpen: "Cần đăng nhập để mở.",
          needLoginContribute: "Cần đăng nhập để đóng góp dữ liệu.",
          needLoginVerify: "Cần đăng nhập để xác minh."
        },
        verify: {
          submitted: "Đã gửi, chờ xác minh"
        },
        section: {
          brand: {
            title: "Chọn hãng chỉ",
            verified: "Chỉ đã xác minh"
          },
          delta: {
            title: "Độ tương đồng màu (ΔE)",
            method: "Phương pháp ΔE",
            method76: "Cơ bản (ΔE76)",
            method2000: "Chuẩn hơn (CIEDE2000)",
            low: "Rất giống",
            high: "Khác hẳn"
          },
          pick: {
            title: "Chọn màu trực tiếp",
            nearest: "Tìm mã chỉ gần nhất",
            pick: "Chọn màu",
            hint: "Bấm vào bất kỳ đâu để chọn màu (Esc để hủy)",
            fallback: "Trình duyệt chưa hỗ trợ chọn màu toàn màn hình. Dùng input màu bên dưới."
          },
          image: {
            title: "Chọn màu từ ảnh",
            helper: "Chọn ảnh và bấm vào bất kỳ điểm nào để lấy màu"
          },
          code: {
            title: "Tra ngược theo mã chỉ",
            placeholder: "Nhập mã (VD: DMC 310)",
            action: "Tra cứu",
            empty: "Nhập mã chỉ để tra cứu.",
            catalogNotReady: "Dữ liệu màu chưa sẵn sàng.",
            notFound: "Không tìm thấy mã chỉ {query}.",
            multipleTitle: "Mã {code} xuất hiện ở nhiều hãng. Hãy chọn một hãng để tra cứu.",
            multipleHelper: "Chọn một hãng bên dưới để xem kết quả chính xác.",
            chooseBrand: "Chọn hãng"
          }
        },
        inspector: {
          title: "Bảng thông tin màu",
          light: "Nền sáng",
          dark: "Nền tối",
          brand: "Hãng",
          code: "Mã chỉ",
          name: "Tên màu",
          delta: "Độ lệch (ΔE)",
          values: "Giá trị màu",
          copyAll: "Sao chép tất cả",
          rgbString: "Chuỗi RGB",
          close: "Đóng"
        },
        auth: {
          login: "Đăng nhập",
          register: "Đăng ký",
          email: "Địa chỉ email",
          password: "Mật khẩu",
          confirm: "Xác nhận mật khẩu",
          forgot: "Quên mật khẩu?",
          create: "Tạo tài khoản",
          google: "Tiếp tục với Google",
          facebook: "Tiếp tục với Facebook",
          close: "Đóng"
        },
        account: {
          library: "Bảng điều khiển",
          contribute: "Đóng góp dữ liệu",
          verify: "Xác minh",
          manage: "Quản lý tài khoản (sắp ra mắt)",
          logout: "Đăng xuất",
          login: "Đăng nhập"
        },
        library: {
          title: "Kết quả đã lưu",
          loading: "Đang tải..."
        },
        contribute: {
          title: "Đóng góp dữ liệu",
          brand: "Hãng",
          brandSelect: "Chọn hãng",
          brandCustom: "Hoặc nhập hãng mới",
          code: "Mã chỉ",
          name: "Tên màu (tuỳ chọn)",
          hex: "Hex",
          useCurrent: "Dùng màu hiện tại",
          cancel: "Huỷ",
          submit: "Gửi"
        },
        verify: {
          title: "Xác minh dữ liệu",
          loading: "Đang tải..."
        },
        buttons: {
          copy: "Sao chép"
        }
      }
    }
  };

  const state = {
    lang: defaultLang
  };

  const getByPath = (obj, path) => {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
  };

  const formatParams = (text, params) => {
    if (!params) return text;
    return Object.keys(params).reduce((acc, key) => {
      return acc.replace(new RegExp(`\\{${key}\\}`, "g"), params[key]);
    }, text);
  };

  const normalizeText = (value) => {
    if (typeof value !== "string") return value;
    return value.normalize("NFC");
  };

  const getLocale = (lang) => locales[lang] || locales[defaultLang];

  const t = (key, fallback = "", params) => {
    const dict = getLocale(state.lang);
    const value = getByPath(dict, key);
    if (value === null || value === undefined) return fallback;
    if (typeof value !== "string") return fallback;
    return formatParams(value, params);
  };

  const apply = (lang) => {
    if (lang) state.lang = lang;
    document.documentElement.setAttribute("lang", state.lang || defaultLang);
    const dict = getLocale(state.lang);
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const value = getByPath(dict, node.getAttribute("data-i18n"));
      if (value) node.textContent = normalizeText(value);
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
      const raw = node.getAttribute("data-i18n-attr") || "";
      raw.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((item) => item.trim()).filter(Boolean);
        if (!attr || !key) return;
        const value = getByPath(dict, key);
        if (value) node.setAttribute(attr, normalizeText(value));
      });
    });
    document.querySelectorAll("[data-world-label]").forEach((node) => {
      const key = node.getAttribute("data-world-label");
      const label = dict.worlds?.[key]?.label;
      if (label) node.textContent = normalizeText(label);
    });
    document.querySelectorAll("[data-world-desc]").forEach((node) => {
      const key = node.getAttribute("data-world-desc");
      const desc = dict.worlds?.[key]?.desc;
      if (desc) node.textContent = normalizeText(desc);
    });
    document.querySelectorAll("#worldMenu [data-world]").forEach((node) => {
      const key = node.getAttribute("data-world");
      const label = dict.worlds?.[key]?.label;
      if (label) node.textContent = normalizeText(label);
    });
    const currentWorld = document.documentElement?.dataset?.world;
    if (currentWorld) {
      const label = dict.worlds?.[currentWorld]?.label;
      const worldLabel = document.getElementById("worldLabel");
      if (label && worldLabel) worldLabel.textContent = normalizeText(label);
    }
  };

  const setLang = (lang) => {
    state.lang = lang || defaultLang;
    try {
      localStorage.setItem(storageKey, state.lang);
    } catch (err) {}
    apply();
  };

  const extendLocale = (lang, patch) => {
    if (!lang || !patch) return;
    locales[lang] = { ...(locales[lang] || {}), ...patch };
    if (state.lang === lang) apply();
  };

  const init = () => {
    let stored = null;
    try {
      stored = localStorage.getItem(storageKey);
    } catch (err) {}
    state.lang = stored || defaultLang;
    apply();
  };

  window.tcI18n = {
    t,
    apply,
    setLang,
    extendLocale
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  document.addEventListener("tc-world-changed", () => {
    apply();
  });
})();



