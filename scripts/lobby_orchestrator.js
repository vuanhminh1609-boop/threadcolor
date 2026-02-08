(() => {
  const RECENT_KEY = "lastVisitedWorlds";
  const PIN_KEY = "pinnedWorlds";
  const MAX_RECENT = 5;
  const MAX_PINNED = 3;

  const WORLD_META = {
    threadcolor: {
      label: "Thế giới màu thêu",
      desc: "Tra mã chỉ từ ảnh/HEX",
      url: "./worlds/threadcolor.html"
    },
    palette: {
      label: "Bảng phối màu",
      desc: "Phối màu & tương phản",
      url: "./worlds/palette.html"
    },
    gradient: {
      label: "Dải chuyển màu",
      desc: "Token & xuất nhanh",
      url: "./worlds/gradient.html"
    },
    printcolor: {
      label: "CMYK & in ấn",
      desc: "Kiểm tra CMYK/TAC",
      url: "./worlds/printcolor.html"
    },
    library: {
      label: "Thư viện màu",
      desc: "Lưu & quản trị",
      url: "./worlds/library.html"
    }
  };

  const previewPresets = {
    ui: {
      label: "UI",
      title: "Bảng điều khiển sản phẩm",
      desc: "Độ tương phản vừa đủ để đọc nhanh và tập trung.",
      chip: "Trạng thái",
      pills: ["CTA", "Nhấn", "Nhẹ"],
      swatches: ["#0ea5e9", "#22c55e", "#f97316"],
      bg: "linear-gradient(135deg, #0f172a, #1e293b)",
      ink: "#f8fafc",
      muted: "rgba(248, 250, 252, 0.75)",
      chipBg: "rgba(255, 255, 255, 0.18)",
      pillBg: "rgba(255, 255, 255, 0.15)"
    },
    poster: {
      label: "Poster",
      title: "Poster cảm hứng",
      desc: "Gradient nổi bật để dẫn mắt vào thông điệp chính.",
      chip: "Trưng bày",
      pills: ["Tiêu đề", "CTA", "Sự kiện"],
      swatches: ["#f472b6", "#facc15", "#38bdf8"],
      bg: "linear-gradient(135deg, #be185d, #f97316)",
      ink: "#fff7ed",
      muted: "rgba(255, 247, 237, 0.8)",
      chipBg: "rgba(255, 255, 255, 0.2)",
      pillBg: "rgba(255, 255, 255, 0.18)"
    },
    thread: {
      label: "Thêu",
      title: "Bảng màu thêu",
      desc: "Tông dịu, dễ phối cho sản phẩm thủ công.",
      chip: "Chỉ thêu",
      pills: ["Nền", "Hoa văn", "Viền"],
      swatches: ["#c084fc", "#fda4af", "#34d399"],
      bg: "linear-gradient(135deg, #1f2937, #111827)",
      ink: "#f9fafb",
      muted: "rgba(249, 250, 251, 0.75)",
      chipBg: "rgba(255, 255, 255, 0.16)",
      pillBg: "rgba(255, 255, 255, 0.14)"
    }
  };

  const clampList = (list, max) => (Array.isArray(list) ? list.slice(0, max) : []);

  const readList = (key) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
    } catch (_err) {
      return [];
    }
  };

  const writeList = (key, list) => {
    try {
      localStorage.setItem(key, JSON.stringify(list));
    } catch (_err) {
      // ignore
    }
  };

  const ensureToast = () => {
    let toast = document.getElementById("tcLobbyToast");
    if (toast) return toast;
    toast = document.createElement("div");
    toast.id = "tcLobbyToast";
    toast.className = "tc-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
    return toast;
  };

  const showToast = (message) => {
    if (!message) return;
    const toast = ensureToast();
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 1400);
  };

  const pushRecent = (world) => {
    if (!world) return;
    const current = readList(RECENT_KEY).filter((id) => id !== world);
    current.unshift(world);
    writeList(RECENT_KEY, clampList(current, MAX_RECENT));
  };

  const togglePin = (world) => {
    if (!world) return;
    const pinned = readList(PIN_KEY);
    const index = pinned.indexOf(world);
    if (index >= 0) {
      pinned.splice(index, 1);
      writeList(PIN_KEY, pinned);
      showToast("Đã bỏ ghim.");
      return;
    }
    if (pinned.length >= MAX_PINNED) {
      showToast("Chỉ ghim tối đa 3 mục.");
      return;
    }
    pinned.unshift(world);
    writeList(PIN_KEY, pinned);
    showToast("Đã ghim mục này.");
  };

  const clearRecent = () => {
    writeList(RECENT_KEY, []);
    showToast("Đã xoá gần đây.");
  };

  const renderRecentList = (list, wrapper, emptyEl, pinnedList) => {
    if (!wrapper || !emptyEl) return;
    wrapper.innerHTML = "";
    if (!list.length) {
      emptyEl.classList.remove("hidden");
      return;
    }
    let rendered = 0;
    list.forEach((world) => {
      const meta = WORLD_META[world];
      if (!meta) return;
      const item = document.createElement("div");
      item.className = "tc-recent-item";
      const link = document.createElement("a");
      link.className = "tc-recent-link";
      link.href = meta.url;
      link.dataset.worldLink = "1";
      link.dataset.world = world;

      const dot = document.createElement("span");
      dot.className = "tc-recent-dot";
      const metaWrap = document.createElement("div");
      metaWrap.className = "tc-recent-meta";
      const name = document.createElement("div");
      name.className = "tc-recent-name";
      name.textContent = meta.label;
      const desc = document.createElement("div");
      desc.className = "tc-recent-desc";
      desc.textContent = meta.desc;

      metaWrap.appendChild(name);
      metaWrap.appendChild(desc);
      link.appendChild(dot);
      link.appendChild(metaWrap);

      const pinBtn = document.createElement("button");
      pinBtn.type = "button";
      pinBtn.className = "tc-icon-btn tc-recent-pin";
      pinBtn.dataset.action = "pin";
      pinBtn.dataset.world = world;
      pinBtn.setAttribute("aria-label", pinnedList.includes(world) ? "Bỏ ghim" : "Ghim");
      if (pinnedList.includes(world)) {
        pinBtn.classList.add("is-active");
      }
      pinBtn.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l2.9 5.9 6.6 1-4.8 4.6 1.1 6.5L12 17.9 6.2 21l1.1-6.5L2.5 9.9l6.6-1z" fill="currentColor"></path>
        </svg>
      `;

      item.appendChild(link);
      item.appendChild(pinBtn);
      wrapper.appendChild(item);
      rendered += 1;
    });
    if (rendered === 0) {
      emptyEl.classList.remove("hidden");
    } else {
      emptyEl.classList.add("hidden");
    }
  };

  const renderRecent = () => {
    const pinnedList = readList(PIN_KEY);
    const recentList = readList(RECENT_KEY).filter((id) => id && id !== "");
    const pinnedWrap = document.querySelector('[data-recent-list="pinned"]');
    const recentWrap = document.querySelector('[data-recent-list="recent"]');
    const pinnedEmpty = document.querySelector('[data-recent-empty="pinned"]');
    const recentEmpty = document.querySelector('[data-recent-empty="recent"]');

    renderRecentList(clampList(pinnedList, MAX_PINNED), pinnedWrap, pinnedEmpty, pinnedList);
    renderRecentList(clampList(recentList, MAX_RECENT), recentWrap, recentEmpty, pinnedList);
  };

  const initPreview = () => {
    const tabs = Array.from(document.querySelectorAll("[data-preview-tab]"));
    const frame = document.querySelector("[data-preview-frame]");
    if (!tabs.length || !frame) return;

    const label = frame.querySelector("[data-preview-label]");
    const title = frame.querySelector("[data-preview-title]");
    const desc = frame.querySelector("[data-preview-desc]");
    const chip = frame.querySelector("[data-preview-chip]");
    const swatches = Array.from(frame.querySelectorAll("[data-preview-swatch]"));
    const pills = Array.from(frame.querySelectorAll("[data-preview-pill]"));

    const applyPreset = (key) => {
      const preset = previewPresets[key] || previewPresets.ui;
      if (label) label.textContent = preset.label;
      if (title) title.textContent = preset.title;
      if (desc) desc.textContent = preset.desc;
      if (chip) chip.textContent = preset.chip;
      frame.style.setProperty("--preview-bg", preset.bg);
      frame.style.setProperty("--preview-ink", preset.ink);
      frame.style.setProperty("--preview-muted", preset.muted);
      frame.style.setProperty("--preview-chip", preset.chipBg);
      frame.style.setProperty("--preview-pill", preset.pillBg);

      swatches.forEach((swatch, idx) => {
        swatch.style.background = preset.swatches[idx % preset.swatches.length];
      });
      pills.forEach((pill, idx) => {
        pill.textContent = preset.pills[idx % preset.pills.length];
      });
    };

    const setActiveTab = (key) => {
      tabs.forEach((btn) => {
        const active = btn.dataset.previewTab === key;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
      });
      applyPreset(key);
    };

    tabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.previewTab || "ui";
        setActiveTab(key);
      });
    });

    setActiveTab("ui");
  };

  const bindRouteCards = () => {
    const cards = Array.from(document.querySelectorAll("[data-route-card]"));
    cards.forEach((card) => {
      const url = card.dataset.url;
      const world = card.dataset.world;
      const go = () => {
        if (world) pushRecent(world);
        if (url) window.location.href = url;
      };
      card.addEventListener("click", (event) => {
        if (event.target.closest("a,button")) return;
        go();
      });
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          go();
        }
      });
    });
  };

  const bindActions = () => {
    document.addEventListener("click", (event) => {
      const worldLink = event.target.closest("[data-world-link]");
      if (worldLink) {
        const world = worldLink.dataset.world;
        if (world) pushRecent(world);
      }
      const pinBtn = event.target.closest('[data-action="pin"]');
      if (pinBtn) {
        const world = pinBtn.dataset.world;
        togglePin(world);
        renderRecent();
      }
      const clearBtn = event.target.closest('[data-action="clear-recent"]');
      if (clearBtn) {
        clearRecent();
        renderRecent();
      }
    });
  };

  const recordReferrer = () => {
    const ref = document.referrer;
    if (!ref) return;
    let refPath = "";
    try {
      refPath = new URL(ref, window.location.href).pathname;
    } catch (_err) {
      return;
    }
    const match = Object.entries(WORLD_META).find(([, meta]) => {
      try {
        const path = new URL(meta.url, window.location.href).pathname;
        return refPath.endsWith(path);
      } catch (_err) {
        return false;
      }
    });
    if (match) pushRecent(match[0]);
  };

  recordReferrer();
  bindActions();
  bindRouteCards();
  renderRecent();
  initPreview();
})();
