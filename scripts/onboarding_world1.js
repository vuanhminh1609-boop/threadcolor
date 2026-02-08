(() => {
  const STORAGE_KEY = "tc_w1_tour_seen_v1";
  const steps = [
    {
      id: "brand",
      tour: "section-brand",
      title: "Chọn hãng chỉ",
      desc: "Bắt đầu nhanh: Chọn hãng → chọn cách tra → xem kết quả."
    },
    {
      id: "pick",
      tour: "section-pick",
      tab: "color",
      title: "Màu → Mã chỉ",
      desc: "Chọn màu nhanh bằng picker hoặc Kho HEX để tìm mã gần nhất."
    },
    {
      id: "grid",
      tour: "section-grid",
      tab: "color",
      title: "Lưới màu hãng",
      desc: "Quét nhanh bảng màu theo hãng, bấm swatch để tra mã ngay."
    },
    {
      id: "image",
      tour: "section-image",
      tab: "image",
      title: "Ảnh → Mã chỉ",
      desc: "Tải ảnh rồi bấm vào điểm màu để trích và tra mã."
    },
    {
      id: "delta",
      tour: "section-delta",
      title: "Độ tương đồng ΔE",
      desc: "Tinh chỉnh ngưỡng ΔE để lọc kết quả sát hơn."
    },
    {
      id: "result",
      tour: "section-result",
      title: "Kết quả tra cứu",
      desc: "Danh sách mã chỉ hiển thị tại đây, có thể ghim hoặc sao chép."
    }
  ];

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const getTopInset = () => {
    const cssVal = getComputedStyle(document.documentElement).getPropertyValue("--tc-topbar-h");
    const num = parseFloat(cssVal);
    return Number.isFinite(num) ? num + 8 : 72;
  };

  const isHidden = (el) => {
    if (!el) return true;
    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return true;
    const rect = el.getBoundingClientRect();
    return rect.width === 0 || rect.height === 0;
  };

  const getTarget = (step) => {
    if (!step) return null;
    const selector = step.tour ? `[data-tour="${step.tour}"]` : step.selector;
    if (!selector) return null;
    return document.querySelector(selector);
  };

  const ensureTab = (tab) => {
    if (!tab) return;
    if (typeof window.tcWorld1ActivateTab === "function") {
      window.tcWorld1ActivateTab(tab);
      return;
    }
    const btn = document.querySelector(`[data-tour="tab-${tab}"]`) || document.querySelector(`[data-tc-tab="${tab}"]`);
    btn?.click();
  };

  let activeTour = null;

  const shouldRun = (force) => {
    if (!document.querySelector("[data-tour=\"section-brand\"]")) return false;
    if (force) return true;
    try {
      return localStorage.getItem(STORAGE_KEY) !== "1";
    } catch (_err) {
      return true;
    }
  };

  const markDone = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (_err) {}
  };

  const createOverlay = () => {
    const overlay = document.createElement("div");
    overlay.className = "tc-tour-overlay";
    overlay.innerHTML = `
      <div class="tc-tour-spotlight" aria-hidden="true"></div>
      <div class="tc-tour-card" role="dialog" aria-live="polite" aria-label="Hướng dẫn nhanh">
        <div class="tc-tour-step"></div>
        <div class="tc-tour-title"></div>
        <div class="tc-tour-desc"></div>
        <div class="tc-tour-actions">
          <button class="tc-tour-btn tc-tour-prev" type="button">Quay lại</button>
          <button class="tc-tour-btn tc-tour-skip" type="button">Bỏ qua</button>
          <button class="tc-tour-btn tc-tour-next" type="button">Tiếp theo</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  };

  const positionCard = (card, rect) => {
    const margin = 16;
    const topInset = getTopInset();
    const cardRect = card.getBoundingClientRect();
    let top = rect.bottom + 12;
    if (top + cardRect.height > window.innerHeight - margin) {
      top = rect.top - cardRect.height - 12;
    }
    top = clamp(top, topInset, window.innerHeight - cardRect.height - margin);
    let left = rect.left;
    if (left + cardRect.width > window.innerWidth - margin) {
      left = window.innerWidth - cardRect.width - margin;
    }
    left = clamp(left, margin, window.innerWidth - cardRect.width - margin);
    card.style.top = `${top}px`;
    card.style.left = `${left}px`;
  };

  const startWorld1Tour = ({ force = false } = {}) => {
    if (!shouldRun(force)) return;
    if (activeTour && activeTour.finish) {
      activeTour.finish(false);
    }

    const overlay = createOverlay();
    const spotlight = overlay.querySelector(".tc-tour-spotlight");
    const card = overlay.querySelector(".tc-tour-card");
    const stepEl = overlay.querySelector(".tc-tour-step");
    const titleEl = overlay.querySelector(".tc-tour-title");
    const descEl = overlay.querySelector(".tc-tour-desc");
    const nextBtn = overlay.querySelector(".tc-tour-next");
    const skipBtn = overlay.querySelector(".tc-tour-skip");
    const prevBtn = overlay.querySelector(".tc-tour-prev");

    let index = 0;

    const findValidIndex = (start, direction) => {
      let idx = start;
      while (idx >= 0 && idx < steps.length) {
        const step = steps[idx];
        if (step?.tab) ensureTab(step.tab);
        const target = getTarget(step);
        if (target && !isHidden(target)) return idx;
        idx += direction;
      }
      return -1;
    };

    const position = () => {
      const step = steps[index];
      const target = getTarget(step);
      if (!target || isHidden(target)) return;
      const rect = target.getBoundingClientRect();
      const padding = 10;
      const topInset = getTopInset();
      const top = clamp(rect.top - padding, topInset, window.innerHeight - 16);
      const left = clamp(rect.left - padding, 8, window.innerWidth - 16);
      const width = clamp(rect.width + padding * 2, 40, window.innerWidth - 16);
      const height = clamp(rect.height + padding * 2, 40, window.innerHeight - 16);
      spotlight.style.width = `${width}px`;
      spotlight.style.height = `${height}px`;
      spotlight.style.transform = `translate(${left}px, ${top}px)`;
      positionCard(card, { top, left, width, height, bottom: top + height });
    };

    const update = (direction = 1) => {
      const nextIndex = findValidIndex(index, direction);
      if (nextIndex === -1) {
        finish(true);
        return;
      }
      index = nextIndex;
      const step = steps[index];
      if (step?.tab) ensureTab(step.tab);
      window.setTimeout(() => {
        const target = getTarget(step);
        if (!target || isHidden(target)) {
          index = index + direction;
          update(direction);
          return;
        }
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        window.setTimeout(position, 120);
        stepEl.textContent = `Bước ${index + 1}/${steps.length}`;
        titleEl.textContent = step.title;
        descEl.textContent = step.desc;
        prevBtn.disabled = index === 0;
        nextBtn.textContent = index === steps.length - 1 ? "Hoàn tất" : "Tiếp theo";
      }, 60);
    };

    const finish = (mark = true) => {
      if (mark) markDone();
      overlay.remove();
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position, true);
      activeTour = null;
    };

    activeTour = { finish };

    nextBtn.addEventListener("click", () => {
      if (index >= steps.length - 1) {
        finish(true);
        return;
      }
      index += 1;
      update(1);
    });

    prevBtn.addEventListener("click", () => {
      if (index <= 0) return;
      index -= 1;
      update(-1);
    });

    skipBtn.addEventListener("click", () => finish(true));

    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);

    update(1);
  };

  window.startWorld1Tour = startWorld1Tour;

  window.addEventListener("DOMContentLoaded", () => {
    startWorld1Tour();
    const guide = document.getElementById("w1GuideDetails");
    if (!guide) return;
    guide.addEventListener("toggle", () => {
      if (!guide.open) return;
      startWorld1Tour({ force: true });
      guide.open = false;
    });
  });
})();
