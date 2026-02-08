(() => {
  const overlay = document.getElementById("cmdkOverlay");
  const input = document.getElementById("cmdkInput");
  const listEl = document.getElementById("cmdkList");
  const emptyEl = document.getElementById("cmdkEmpty");
  if (!overlay || !input || !listEl || !emptyEl) return;

  const RECENT_KEY = "lastVisitedWorlds";
  const PIN_KEY = "pinnedWorlds";
  const MAX_RECENT = 5;
  const MAX_RESULTS = 8;

  const actions = [
    {
      id: "world-threadcolor",
      kind: "world",
      world: "threadcolor",
      title: "Mở Thế giới màu thêu",
      subtitle: "Tra mã chỉ từ ảnh/HEX",
      url: "./worlds/threadcolor.html",
      keywords: ["thêu", "mã chỉ", "thread", "màu thêu", "ảnh", "hex"]
    },
    {
      id: "world-threadvault",
      kind: "world",
      world: "threadvault",
      title: "Mở Thế giới Kho chỉ",
      subtitle: "Quản lý kho chỉ và dữ liệu",
      url: "./worlds/threadvault.html",
      keywords: ["kho chỉ", "kho", "vault", "chỉ"]
    },
    {
      id: "world-palette",
      kind: "world",
      world: "palette",
      title: "Mở Thế giới Bảng phối",
      subtitle: "Phối màu & tương phản",
      url: "./worlds/palette.html",
      keywords: ["palette", "bảng phối", "tương phản", "contrast", "phối màu"]
    },
    {
      id: "world-gradient",
      kind: "world",
      world: "gradient",
      title: "Mở Thế giới Dải chuyển",
      subtitle: "Token & dải chuyển",
      url: "./worlds/gradient.html",
      keywords: ["gradient", "dải chuyển", "token"]
    },
    {
      id: "world-printcolor",
      kind: "world",
      world: "printcolor",
      title: "Mở Thế giới CMYK",
      subtitle: "Kiểm tra CMYK/TAC",
      url: "./worlds/printcolor.html",
      keywords: ["cmyk", "in", "print", "tac"]
    },
    {
      id: "world-library",
      kind: "world",
      world: "library",
      title: "Mở Thư viện màu",
      subtitle: "Lưu và quản trị tài sản",
      url: "./worlds/library.html",
      keywords: ["thư viện", "library", "lưu"]
    },
    {
      id: "route-threadcolor",
      kind: "route",
      world: "threadcolor",
      title: "Chạy route Ảnh/HEX → Mã chỉ → Lưu",
      subtitle: "Đi thẳng vào tra mã chỉ",
      url: "./worlds/threadcolor.html",
      keywords: ["route", "ảnh", "hex", "mã chỉ", "thêu"]
    },
    {
      id: "route-palette",
      kind: "route",
      world: "palette",
      title: "Chạy route Bảng phối → Tương phản → Preview → Xuất",
      subtitle: "Chốt bảng phối nhanh",
      url: "./worlds/palette.html",
      keywords: ["route", "palette", "bảng phối", "tương phản", "preview", "xuất"]
    },
    {
      id: "route-gradient",
      kind: "route",
      world: "gradient",
      title: "Chạy route Dải chuyển → Token → Lưu",
      subtitle: "Tạo dải và lưu token",
      url: "./worlds/gradient.html",
      keywords: ["route", "gradient", "dải chuyển", "token", "lưu"]
    },
    {
      id: "route-cmyk",
      kind: "route",
      world: "printcolor",
      title: "Chạy route CMYK → Lưu",
      subtitle: "Kiểm tra CMYK trước khi in",
      url: "./worlds/printcolor.html",
      keywords: ["route", "cmyk", "in", "lưu"]
    }
  ];

  let isOpen = false;
  let activeIndex = -1;
  let currentItems = [];

  const normalizeText = (value) =>
    String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9\s]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

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

  const pushRecent = (world) => {
    if (!world) return;
    const current = readList(RECENT_KEY).filter((id) => id !== world);
    current.unshift(world);
    writeList(RECENT_KEY, current.slice(0, MAX_RECENT));
  };

  const scoreAction = (action, query, pinnedList, recentList) => {
    const queryText = normalizeText(query);
    const keywords = (action.keywords || []).map(normalizeText);
    const title = normalizeText(action.title);
    const subtitle = normalizeText(action.subtitle);
    let matchScore = 0;
    let matched = false;

    if (queryText) {
      if (title.includes(queryText) || subtitle.includes(queryText)) {
        matchScore += 80;
        matched = true;
      }
      queryText.split(" ").forEach((word) => {
        if (!word) return;
        if (title.includes(word) || subtitle.includes(word) || keywords.some((key) => key.includes(word))) {
          matchScore += 30;
          matched = true;
        }
      });
    } else {
      matched = true;
    }

    if (!matched) return { matched: false, score: 0 };

    let score = matchScore;
    if (action.world && pinnedList.includes(action.world)) score += 40;
    if (action.world && recentList.includes(action.world)) score += 20;
    return { matched: true, score };
  };

  const buildList = () => {
    const query = input.value;
    const pinnedList = readList(PIN_KEY);
    const recentList = readList(RECENT_KEY);
    const ranked = actions
      .map((action) => {
        const result = scoreAction(action, query, pinnedList, recentList);
        return { action, ...result };
      })
      .filter((item) => item.matched)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS)
      .map((item) => item.action);

    currentItems = ranked;
    renderList();
  };

  const renderList = () => {
    listEl.innerHTML = "";
    if (!currentItems.length) {
      emptyEl.classList.remove("hidden");
      return;
    }
    emptyEl.classList.add("hidden");
    currentItems.forEach((action, index) => {
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tc-cmdk-item";
      button.dataset.index = String(index);
      button.setAttribute("role", "option");
      button.setAttribute("aria-selected", index === activeIndex ? "true" : "false");

      const meta = document.createElement("div");
      meta.className = "tc-cmdk-meta";
      const title = document.createElement("div");
      title.className = "tc-cmdk-title";
      title.textContent = action.title;
      const desc = document.createElement("div");
      desc.className = "tc-cmdk-desc";
      desc.textContent = action.subtitle || "";
      meta.appendChild(title);
      meta.appendChild(desc);

      const kindWrap = document.createElement("div");
      kindWrap.className = "tc-cmdk-kind";
      kindWrap.textContent = action.kind === "route" ? "Chạy route" : "Mở Thế giới";

      button.appendChild(meta);
      button.appendChild(kindWrap);

      if (index === activeIndex) {
        button.classList.add("is-active");
      }

      item.appendChild(button);
      listEl.appendChild(item);
    });
  };

  const setActiveIndex = (next) => {
    if (!currentItems.length) {
      activeIndex = -1;
      renderList();
      return;
    }
    const clamped = Math.max(0, Math.min(currentItems.length - 1, next));
    activeIndex = clamped;
    renderList();
    const activeButton = listEl.querySelector(`.tc-cmdk-item[data-index="${activeIndex}"]`);
    activeButton?.scrollIntoView({ block: "nearest" });
  };

  const runAction = (action) => {
    if (!action) return;
    if (action.world) pushRecent(action.world);
    closePalette();
    window.location.href = action.url;
  };

  const openPalette = () => {
    isOpen = true;
    overlay.classList.remove("hidden");
    overlay.setAttribute("aria-hidden", "false");
    input.value = "";
    activeIndex = -1;
    buildList();
    window.setTimeout(() => {
      input.focus();
      input.select();
    }, 10);
  };

  const closePalette = () => {
    isOpen = false;
    overlay.classList.add("hidden");
    overlay.setAttribute("aria-hidden", "true");
  };

  const isEditableTarget = (target) => {
    if (!target) return false;
    const tag = target.tagName ? target.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea" || tag === "select") return true;
    return Boolean(target.isContentEditable);
  };

  document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) return;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      if (!isOpen && isEditableTarget(event.target)) return;
      event.preventDefault();
      if (isOpen) {
        closePalette();
      } else {
        openPalette();
      }
      return;
    }

    if (!isOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
    }
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target.closest("[data-cmdk-close]")) {
      closePalette();
    }
  });

  input.addEventListener("input", () => {
    activeIndex = -1;
    buildList();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex(activeIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(activeIndex - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const action = currentItems[activeIndex] || currentItems[0];
      runAction(action);
    }
  });

  listEl.addEventListener("click", (event) => {
    const button = event.target.closest(".tc-cmdk-item");
    if (!button) return;
    const index = Number(button.dataset.index);
    if (Number.isNaN(index)) return;
    const action = currentItems[index];
    runAction(action);
  });
})();
