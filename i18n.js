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
            bug: "Báo lỗi",
            feature: "Đề xuất tính năng",
            start: "Hướng dẫn bắt đầu trong 60 giây"
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
          start: "Bắt đầu trong 60 giây",
          hex: "Tra mã chỉ từ HEX",
          image: "Tra mã chỉ từ ảnh",
          screen: "Khác màu giữa màn hình",
          save: "Lưu vào Thư viện",
          export: "Xuất bảng phối/dải chuyển",
          storage: "Dữ liệu lưu ở đâu",
          privacy: "Quyền riêng tư & telemetry",
          cmyk: "Khi nào dùng CMYK",
          remix: "Cộng đồng remix",
          pro: "Gói Pro",
          bug: "Báo lỗi hiệu quả"
        },
        q1: "Bắt đầu trong 60 giây",
        a1: "Đang cập nhật hướng dẫn nhanh theo từng công cụ.",
        q2: "Tra mã chỉ từ HEX hoạt động thế nào?",
        a2: "Hệ thống so khớp màu gần nhất theo không gian màu để gợi ý mã chỉ.",
        q3: "Tra mã chỉ từ ảnh hoạt động thế nào?",
        a3: "Ảnh được lấy mẫu màu chính, sau đó so khớp với kho mã chỉ.",
        q4: "Vì sao kết quả khác nhau giữa các màn hình?",
        a4: "Mỗi màn hình có profile màu khác nhau; hãy kiểm tra trên thiết bị chuẩn.",
        q5: "Cách lưu vào Thư viện màu",
        a5: "Chọn tài sản → Lưu vào Thư viện → đặt tên để lưu lại.",
        q6: "Cách xuất bảng phối / dải chuyển",
        a6: "Dùng nút Xuất trong công cụ tương ứng để lấy CSS hoặc token.",
        q7: "Dữ liệu lưu ở đâu?",
        a7: "Mặc định lưu localStorage; có thể đồng bộ khi đăng nhập.",
        q8: "Quyền riêng tư & telemetry",
        a8: "Telemetry chỉ dùng để đo lường, luôn fail-silent và có thể tắt khi local.",
        q9: "Khi nào nên dùng CMYK",
        a9: "Khi chuẩn bị in ấn, hãy chuyển sang CMYK để kiểm tra TAC và lệch màu.",
        q10: "Cộng đồng remix hoạt động ra sao?",
        a10: "Chia sẻ tài sản lên feed; người khác có thể remix và lưu lại.",
        q11: "Gói Pro gồm gì. Kích hoạt thế nào.",
        a11: "Đang cập nhật thông tin gói Pro và hướng dẫn kích hoạt.",
        q12: "Cách báo lỗi hiệu quả",
        a12: "Đính kèm ảnh, trình duyệt, bước tái hiện và kết quả mong đợi.",
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
            action: "Tra cứu"
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



