(() => {
  const rail = document.querySelector("[data-workflow-rail]");
  if (!rail) return;

  const tablist = rail.querySelector("[data-rail-tabs]");
  const panel = rail.querySelector("[data-rail-panel]");
  const titleEl = rail.querySelector("[data-rail-title]");
  const descEl = rail.querySelector("[data-rail-desc]");
  const stepEl = rail.querySelector("[data-rail-step]");
  const primaryBtn = rail.querySelector("[data-rail-primary]");
  const secondaryBtn = rail.querySelector("[data-rail-secondary]");
  if (!tablist || !panel || !titleEl || !descEl || !primaryBtn || !secondaryBtn) return;

  const STORAGE_KEY = "tc_lobby_workflow_step";
  const steps = [
    {
      key: "threadcolor",
      label: "W1 Màu thêu",
      title: "Màu thêu",
      desc: "Tra mã chỉ từ HEX/ảnh để bắt đầu chính xác.",
      primary: { label: "Mở ngay", href: "./worlds/threadcolor.html" },
      secondary: { label: "Đi tiếp", href: "./worlds/palette.html" }
    },
    {
      key: "palette",
      label: "W3 Bảng phối màu",
      title: "Bảng phối màu",
      desc: "Chọn cụm màu chủ đạo và kiểm tra tương phản nhanh.",
      primary: { label: "Mở ngay", href: "./worlds/palette.html" },
      secondary: { label: "Đi tiếp", href: "./worlds/gradient.html" }
    },
    {
      key: "gradient",
      label: "W2 Dải chuyển màu",
      title: "Dải chuyển màu",
      desc: "Tinh chỉnh cảm xúc màu theo hướng và độ mượt.",
      primary: { label: "Mở ngay", href: "./worlds/gradient.html" },
      secondary: { label: "Đi tiếp", href: "./worlds/printcolor.html" }
    },
    {
      key: "printcolor",
      label: "W4 Màu in (CMYK)",
      title: "Màu in (CMYK)",
      desc: "Kiểm tra TAC/gamut trước khi xuất hoặc lưu.",
      primary: { label: "Mở ngay", href: "./worlds/printcolor.html" },
      secondary: { label: "Gửi về Thư viện", href: "./worlds/library.html" }
    },
    {
      key: "library",
      label: "W5 Thư viện",
      title: "Thư viện",
      desc: "Lưu, ghim và dùng lại tài sản màu quan trọng.",
      primary: { label: "Mở ngay", href: "./worlds/library.html" },
      secondary: { label: "Đi tiếp", href: "./spaces/community.html" }
    },
    {
      key: "community",
      label: "Space Cộng đồng",
      title: "Không gian Cộng đồng",
      desc: "Chia sẻ, remix và nhận cảm hứng từ cộng đồng.",
      primary: { label: "Mở Bảng tin", href: "./spaces/community.html#feed" },
      secondary: { label: "Remix về Thư viện", href: "./worlds/library.html" }
    },
    {
      key: "colorplay",
      label: "W8 Trò chơi màu",
      title: "Trò chơi màu",
      desc: "Luyện cảm giác màu bằng mini game điểm số.",
      primary: { label: "Mở ngay", href: "./worlds/colorplay.html" },
      secondary: { label: "Đi tiếp", href: "./worlds/paintfabric.html" }
    },
    {
      key: "paintfabric",
      label: "W6 Sơn&Vải",
      title: "Sơn & Vải",
      desc: "Mô phỏng vật liệu và xuất profile nhanh.",
      primary: { label: "Mở ngay", href: "./worlds/paintfabric.html" },
      secondary: { label: "Gửi về Thư viện", href: "./worlds/library.html" }
    }
  ];

  const tabs = new Map();

  const buildTab = (step) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tc-rail-tab";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", "false");
    btn.setAttribute("tabindex", "-1");
    btn.setAttribute("aria-controls", panel.id || "workflowRailPanel");
    btn.dataset.step = step.key;
    btn.textContent = step.label;
    return btn;
  };

  const updatePanel = (step, index) => {
    titleEl.textContent = step.title;
    descEl.textContent = step.desc;
    if (stepEl) stepEl.textContent = `Bước ${index + 1}/${steps.length}`;
    primaryBtn.textContent = step.primary.label;
    primaryBtn.setAttribute("href", step.primary.href);
    primaryBtn.setAttribute("aria-label", step.primary.label);
    if (step.secondary) {
      secondaryBtn.textContent = step.secondary.label;
      secondaryBtn.setAttribute("href", step.secondary.href);
      secondaryBtn.setAttribute("aria-label", step.secondary.label);
      secondaryBtn.removeAttribute("hidden");
    } else {
      secondaryBtn.setAttribute("hidden", "true");
    }
  };

  const setActive = (key, opts = {}) => {
    const index = steps.findIndex((step) => step.key === key);
    const safeIndex = index >= 0 ? index : 0;
    const step = steps[safeIndex];
    updatePanel(step, safeIndex);
    steps.forEach((item) => {
      const tab = tabs.get(item.key);
      if (!tab) return;
      const isActive = item.key === step.key;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });
    if (opts.focus) {
      const tab = tabs.get(step.key);
      tab?.focus({ preventScroll: true });
    }
    const activeTab = tabs.get(step.key);
    activeTab?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    try {
      localStorage.setItem(STORAGE_KEY, step.key);
    } catch (_err) {}
  };

  steps.forEach((step) => {
    const tab = buildTab(step);
    tabs.set(step.key, tab);
    tablist.appendChild(tab);
  });

  let initialKey = steps[0].key;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && steps.some((step) => step.key === stored)) {
      initialKey = stored;
    }
  } catch (_err) {}
  setActive(initialKey);

  tablist.addEventListener("click", (event) => {
    const tab = event.target.closest(".tc-rail-tab");
    if (!tab) return;
    setActive(tab.dataset.step, { focus: true });
  });

  tablist.addEventListener("keydown", (event) => {
    const tab = event.target.closest(".tc-rail-tab");
    if (!tab) return;
    const currentKey = tab.dataset.step;
    const currentIndex = steps.findIndex((step) => step.key === currentKey);
    if (currentIndex < 0) return;

    let nextIndex = null;
    if (event.key === "ArrowRight") nextIndex = Math.min(steps.length - 1, currentIndex + 1);
    if (event.key === "ArrowLeft") nextIndex = Math.max(0, currentIndex - 1);
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = steps.length - 1;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActive(currentKey, { focus: true });
      return;
    }
    if (nextIndex == null) return;
    event.preventDefault();
    setActive(steps[nextIndex].key, { focus: true });
  });
})();
