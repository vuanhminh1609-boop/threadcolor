(() => {
  const STORAGE_KEY = "tc_onboarding_threadcolor_v1";
  const steps = [
    {
      id: "brand",
      selector: "#sectionBrand",
      title: "Chọn hãng chỉ",
      desc: "Chọn 1-3 hãng để kết quả sát thực tế bạn dùng."
    },
    {
      id: "pick",
      selector: "#sectionPick",
      title: "Chọn màu hoặc mở Kho HEX",
      desc: "Dán HEX hoặc mở Kho HEX để lấy màu nhanh."
    },
    {
      id: "image",
      selector: "#sectionImage",
      title: "Chọn từ ảnh",
      desc: "Tải ảnh và bấm vào điểm màu để trích mã."
    },
    {
      id: "result",
      selector: "#result",
      title: "Xem kết quả",
      desc: "Danh sách mã chỉ tương ứng hiển thị tại đây."
    },
    {
      id: "done",
      selector: "main .tc-card",
      title: "Sẵn sàng bắt đầu",
      desc: "Bạn đã nắm được luồng chính. Hãy thử ngay."
    }
  ];

  const shouldRun = () => {
    if (!document.getElementById("sectionBrand")) return false;
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
          <button class="tc-tour-btn tc-tour-skip" type="button">Bỏ qua</button>
          <button class="tc-tour-btn tc-tour-next" type="button">Bước tiếp theo</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const positionCard = (card, rect) => {
    const margin = 16;
    const cardRect = card.getBoundingClientRect();
    let top = rect.bottom + 12;
    if (top + cardRect.height > window.innerHeight - margin) {
      top = rect.top - cardRect.height - 12;
    }
    top = clamp(top, margin, window.innerHeight - cardRect.height - margin);
    let left = rect.left;
    if (left + cardRect.width > window.innerWidth - margin) {
      left = window.innerWidth - cardRect.width - margin;
    }
    left = clamp(left, margin, window.innerWidth - cardRect.width - margin);
    card.style.top = `${top}px`;
    card.style.left = `${left}px`;
  };

  const runTour = () => {
    if (!shouldRun()) return;
    const overlay = createOverlay();
    const spotlight = overlay.querySelector(".tc-tour-spotlight");
    const card = overlay.querySelector(".tc-tour-card");
    const stepEl = overlay.querySelector(".tc-tour-step");
    const titleEl = overlay.querySelector(".tc-tour-title");
    const descEl = overlay.querySelector(".tc-tour-desc");
    const nextBtn = overlay.querySelector(".tc-tour-next");
    const skipBtn = overlay.querySelector(".tc-tour-skip");

    let index = 0;

    const position = () => {
      const step = steps[index];
      if (!step) return;
      const target = document.querySelector(step.selector);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const padding = 8;
      const top = clamp(rect.top - padding, 8, window.innerHeight - 16);
      const left = clamp(rect.left - padding, 8, window.innerWidth - 16);
      const width = clamp(rect.width + padding * 2, 40, window.innerWidth - 16);
      const height = clamp(rect.height + padding * 2, 40, window.innerHeight - 16);
      spotlight.style.width = `${width}px`;
      spotlight.style.height = `${height}px`;
      spotlight.style.transform = `translate(${left}px, ${top}px)`;
      positionCard(card, { top, left, width, height, bottom: top + height });
    };

    const update = () => {
      const step = steps[index];
      if (!step) return;
      const target = document.querySelector(step.selector);
      if (!target) {
        if (index >= steps.length - 1) return;
        index = Math.min(index + 1, steps.length - 1);
        return update();
      }
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => {
        position();
      }, 120);
      stepEl.textContent = `Bước ${index + 1}/${steps.length}`;
      titleEl.textContent = step.title;
      descEl.textContent = step.desc;
      nextBtn.textContent = index === steps.length - 1
        ? "Tôi đã hiểu, bắt đầu ngay thôi"
        : "Bước tiếp theo";
    };

    const finish = () => {
      markDone();
      overlay.remove();
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position, true);
    };

    nextBtn.addEventListener("click", () => {
      if (index >= steps.length - 1) {
        finish();
        return;
      }
      index += 1;
      update();
    });

    skipBtn.addEventListener("click", finish);

    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);

    update();
  };

  window.addEventListener("DOMContentLoaded", () => {
    runTour();
  });
})();
