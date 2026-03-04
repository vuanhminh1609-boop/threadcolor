(() => {
  const RECENT_KEY = "lastVisitedWorlds";
  const PIN_KEY = "pinnedWorlds";
  const MAX_RECENT = 5;
  const MAX_PINNED = 3;

  const t = (key, fallback = "", params) => {
    const fn = window.tcI18n?.t;
    if (typeof fn !== "function") return fallback;
    const value = fn(key, fallback, params);
    return typeof value === "string" && value ? value : fallback;
  };

  const WORLD_META = {
    threadcolor: {
      labelKey: "lobby.recent.worlds.threadcolor.label",
      labelFallback: "Thế giới màu thêu",
      descKey: "lobby.recent.worlds.threadcolor.desc",
      descFallback: "Tra mã chỉ từ ảnh/HEX",
      url: "./worlds/threadcolor.html"
    },
    palette: {
      labelKey: "lobby.recent.worlds.palette.label",
      labelFallback: "Bảng phối màu",
      descKey: "lobby.recent.worlds.palette.desc",
      descFallback: "Phối màu và kiểm tra tương phản",
      url: "./worlds/palette.html"
    },
    gradient: {
      labelKey: "lobby.recent.worlds.gradient.label",
      labelFallback: "Dải chuyển màu",
      descKey: "lobby.recent.worlds.gradient.desc",
      descFallback: "Tạo dải chuyển và xuất token nhanh",
      url: "./worlds/gradient.html"
    },
    printcolor: {
      labelKey: "lobby.recent.worlds.printcolor.label",
      labelFallback: "CMYK và in ấn",
      descKey: "lobby.recent.worlds.printcolor.desc",
      descFallback: "Kiểm tra CMYK/TAC trước khi in",
      url: "./worlds/printcolor.html"
    },
    library: {
      labelKey: "lobby.recent.worlds.library.label",
      labelFallback: "Thư viện màu",
      descKey: "lobby.recent.worlds.library.desc",
      descFallback: "Lưu và quản lý tài sản màu",
      url: "./worlds/library.html"
    }
  };

  const previewPresets = {
    ui: {
      labelKey: "lobby.preview.tabs.ui",
      labelFallback: "Giao diện",
      titleKey: "lobby.preview.frame.ui.title",
      titleFallback: "Bảng điều khiển sản phẩm",
      descKey: "lobby.preview.frame.ui.desc",
      descFallback: "Độ tương phản vừa đủ để đọc nhanh và tập trung.",
      chipKey: "lobby.preview.frame.ui.chip",
      chipFallback: "Mẫu bối cảnh",
      pillKeys: [
        "lobby.preview.frame.ui.pill1",
        "lobby.preview.frame.ui.pill2",
        "lobby.preview.frame.ui.pill3"
      ],
      pillFallbacks: ["Nút kêu gọi (CTA)", "Nhấn", "Nhẹ"],
      bg: "linear-gradient(135deg, #0f172a, #1e293b)",
      ink: "#f8fafc",
      muted: "rgba(248, 250, 252, 0.75)",
      chipBg: "rgba(255, 255, 255, 0.18)",
      pillBg: "rgba(255, 255, 255, 0.15)"
    },
    poster: {
      labelKey: "lobby.preview.tabs.poster",
      labelFallback: "Áp phích",
      titleKey: "lobby.preview.frame.poster.title",
      titleFallback: "Áp phích chiến dịch",
      descKey: "lobby.preview.frame.poster.desc",
      descFallback: "Màu nổi bật để dẫn mắt vào thông điệp chính.",
      chipKey: "lobby.preview.frame.poster.chip",
      chipFallback: "Bố cục nổi bật",
      pillKeys: [
        "lobby.preview.frame.poster.pill1",
        "lobby.preview.frame.poster.pill2",
        "lobby.preview.frame.poster.pill3"
      ],
      pillFallbacks: ["Tiêu đề", "Nút kêu gọi (CTA)", "Sự kiện"],
      bg: "linear-gradient(135deg, #be185d, #f97316)",
      ink: "#fff7ed",
      muted: "rgba(255, 247, 237, 0.82)",
      chipBg: "rgba(255, 255, 255, 0.2)",
      pillBg: "rgba(255, 255, 255, 0.18)"
    },
    thread: {
      labelKey: "lobby.preview.tabs.thread",
      labelFallback: "Thêu",
      titleKey: "lobby.preview.frame.thread.title",
      titleFallback: "Bảng màu thêu",
      descKey: "lobby.preview.frame.thread.desc",
      descFallback: "Tông dịu, dễ phối cho sản phẩm thủ công.",
      chipKey: "lobby.preview.frame.thread.chip",
      chipFallback: "Mẫu vải thêu",
      pillKeys: [
        "lobby.preview.frame.thread.pill1",
        "lobby.preview.frame.thread.pill2",
        "lobby.preview.frame.thread.pill3"
      ],
      pillFallbacks: ["Nền", "Hoa văn", "Viền"],
      bg: "linear-gradient(135deg, #1f2937, #111827)",
      ink: "#f9fafb",
      muted: "rgba(249, 250, 251, 0.78)",
      chipBg: "rgba(255, 255, 255, 0.16)",
      pillBg: "rgba(255, 255, 255, 0.14)"
    }
  };

  const clampList = (list, max) => (Array.isArray(list) ? list.slice(0, max) : []);

  const normalizeHex = (value) => {
    if (!value) return null;
    const raw = String(value).trim().replace(/^#/, "");
    if (/^[\da-fA-F]{3}$/.test(raw)) {
      return `#${raw.split("").map((char) => char + char).join("").toUpperCase()}`;
    }
    if (/^[\da-fA-F]{6}$/.test(raw)) {
      return `#${raw.toUpperCase()}`;
    }
    return null;
  };

  const parseRgbToHex = (value) => {
    const match = String(value || "").replace(/\s+/g, "").match(/^rgba?\((\d+),(\d+),(\d+)/i);
    if (!match) return null;
    const rgb = [Number(match[1]), Number(match[2]), Number(match[3])];
    if (rgb.some((item) => Number.isNaN(item) || item < 0 || item > 255)) return null;
    return `#${rgb.map((item) => item.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
  };

  const toHex = (value) => {
    const normalized = normalizeHex(value);
    if (normalized) return normalized;
    return parseRgbToHex(value);
  };

  const getAccentSwatches = () => {
    const styles = getComputedStyle(document.documentElement);
    const swatches = ["--a1", "--a2", "--a3"]
      .map((token) => toHex(styles.getPropertyValue(token)))
      .filter(Boolean);
    if (swatches.length === 3) return swatches;
    return ["#C07A45", "#DDA26A", "#906A4B"];
  };

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

  const copyToClipboard = (text) => {
    const value = String(text || "").trim();
    if (!value) return Promise.resolve(false);
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value).then(() => true);
    }
    return new Promise((resolve) => {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.style.pointerEvents = "none";
      document.body.appendChild(textarea);
      textarea.select();
      let copied = false;
      try {
        copied = document.execCommand("copy");
      } catch (_err) {
        copied = false;
      }
      textarea.remove();
      resolve(copied);
    });
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
      showToast(t("lobby.toast.unpinned", "Đã bỏ ghim."));
      return;
    }
    if (pinned.length >= MAX_PINNED) {
      showToast(t("lobby.toast.pinLimit", "Chỉ ghim tối đa 3 mục."));
      return;
    }
    pinned.unshift(world);
    writeList(PIN_KEY, pinned);
    showToast(t("lobby.toast.pinned", "Đã ghim mục này."));
  };

  const clearRecent = () => {
    writeList(RECENT_KEY, []);
    showToast(t("lobby.toast.clearedRecent", "Đã xoá gần đây."));
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
      name.textContent = t(meta.labelKey, meta.labelFallback);
      const desc = document.createElement("div");
      desc.className = "tc-recent-desc";
      desc.textContent = t(meta.descKey, meta.descFallback);

      metaWrap.appendChild(name);
      metaWrap.appendChild(desc);
      link.appendChild(dot);
      link.appendChild(metaWrap);

      const pinBtn = document.createElement("button");
      pinBtn.type = "button";
      pinBtn.className = "tc-icon-btn tc-recent-pin";
      pinBtn.dataset.action = "pin";
      pinBtn.dataset.world = world;
      const isPinned = pinnedList.includes(world);
      const pinLabel = isPinned
        ? t("lobby.recent.pinRemoveAria", "Bỏ ghim")
        : t("lobby.recent.pinAddAria", "Ghim");
      pinBtn.setAttribute("aria-label", pinLabel);
      pinBtn.setAttribute("title", pinLabel);
      if (isPinned) {
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
    const ctaBtn = frame.querySelector("[data-preview-cta]");
    const ctaTargets = {
      ui: "./worlds/palette.html",
      poster: "./worlds/gradient.html",
      thread: "./worlds/threadcolor.html"
    };
    let activeTab = "ui";

    const getWorkbenchSwatches = () => {
      const ctx = window.tcWorkbench?.getContext?.();
      const list = Array.isArray(ctx?.hexes) ? ctx.hexes.map((hex) => normalizeHex(hex)).filter(Boolean) : [];
      if (!list.length) return null;
      const swatchList = list.slice(0, 3);
      while (swatchList.length < 3) {
        swatchList.push(swatchList[swatchList.length - 1] || list[0]);
      }
      return swatchList;
    };

    const getActiveSwatches = () => getWorkbenchSwatches() || getAccentSwatches();

    const buildBufferUrl = (url) => {
      const ctx = window.tcWorkbench?.getContext?.();
      const hexes = Array.isArray(ctx?.hexes) ? ctx.hexes : [];
      if (!hexes.length) return url;
      const ensure = window.tcWorkbench?.ensureBufferFromHexes;
      const append = window.tcWorkbench?.appendBufferToUrl;
      if (typeof ensure !== "function" || typeof append !== "function") return url;
      const bufferId = ensure(hexes, { source: "lobby-preview" });
      if (!bufferId) return url;
      return append(url, bufferId);
    };

    const applyPreset = (key) => {
      const preset = previewPresets[key] || previewPresets.ui;
      if (label) label.textContent = t(preset.labelKey, preset.labelFallback);
      if (title) title.textContent = t(preset.titleKey, preset.titleFallback);
      if (desc) desc.textContent = t(preset.descKey, preset.descFallback);
      if (chip) chip.textContent = t(preset.chipKey, preset.chipFallback);
      frame.style.setProperty("--preview-bg", preset.bg);
      frame.style.setProperty("--preview-ink", preset.ink);
      frame.style.setProperty("--preview-muted", preset.muted);
      frame.style.setProperty("--preview-chip", preset.chipBg);
      frame.style.setProperty("--preview-pill", preset.pillBg);

      const activeSwatches = getActiveSwatches();
      swatches.forEach((swatch, idx) => {
        const hex = (activeSwatches[idx % activeSwatches.length] || "#000000").toUpperCase();
        swatch.style.background = hex;
        swatch.dataset.hex = hex;
        swatch.dataset.hexInspect = "click";
        swatch.setAttribute("title", hex);
      });
      pills.forEach((pill, idx) => {
        const keyName = preset.pillKeys[idx % preset.pillKeys.length];
        const fallback = preset.pillFallbacks[idx % preset.pillFallbacks.length];
        pill.textContent = t(keyName, fallback);
      });

      if (ctaBtn) {
        ctaBtn.dataset.previewTarget = ctaTargets[key] || ctaTargets.ui;
      }
    };

    const setActiveTab = (key) => {
      activeTab = previewPresets[key] ? key : "ui";
      tabs.forEach((btn) => {
        const active = btn.dataset.previewTab === activeTab;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-selected", active ? "true" : "false");
      });
      applyPreset(activeTab);
    };

    tabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.previewTab || "ui";
        setActiveTab(key);
      });
    });

    swatches.forEach((swatch) => {
      swatch.addEventListener("click", () => {
        const hex = normalizeHex(swatch.dataset.hex || "");
        if (!hex) return;
        copyToClipboard(hex).finally(() => {
          showToast(t("lobby.toast.copied", "Đã sao chép!"));
        });
      });
    });

    if (ctaBtn) {
      ctaBtn.addEventListener("click", () => {
        const target = ctaBtn.dataset.previewTarget || ctaTargets.ui;
        const nextUrl = buildBufferUrl(target);
        window.location.href = nextUrl;
      });
    }

    const refreshPreview = () => {
      applyPreset(activeTab);
    };
    window.addEventListener("tc:hex-apply", refreshPreview);
    window.addEventListener("focus", refreshPreview);
    window.addEventListener("storage", (event) => {
      if (event?.key && event.key !== "tc_workbench_context_v1") return;
      refreshPreview();
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
