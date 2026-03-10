(() => {
  const DEFAULT_LABELS = Object.freeze({
    dialog: "Hướng dẫn nhanh",
    prev: "Quay lại",
    skip: "Bỏ qua",
    dontShow: "Đừng hiện lại",
    next: "Tiếp",
    done: "Hoàn tất",
    step: "Bước {current}/{total}"
  });

  const TOUR_NS = "tc_onboarding_tour";
  let activeTour = null;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const format = (template, params) => {
    const source = typeof template === "string" ? template : "";
    if (!params) return source;
    return Object.keys(params).reduce((acc, key) => {
      return acc.replace(new RegExp(`\\{${key}\\}`, "g"), String(params[key]));
    }, source);
  };

  const readStorage = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (_err) {
      return null;
    }
  };

  const writeStorage = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (_err) {}
  };

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
    return rect.width <= 0 || rect.height <= 0;
  };

  const resolveTarget = (step) => {
    if (!step?.selector) return null;
    return document.querySelector(step.selector);
  };

  const createOverlay = (labels) => {
    const overlay = document.createElement("div");
    overlay.className = "tc-tour-overlay";
    overlay.innerHTML = `
      <div class="tc-tour-spotlight" aria-hidden="true"></div>
      <div class="tc-tour-card" role="dialog" aria-live="polite" aria-label="${labels.dialog}">
        <div class="tc-tour-step"></div>
        <div class="tc-tour-title"></div>
        <div class="tc-tour-desc"></div>
        <div class="tc-tour-actions">
          <button class="tc-tour-btn tc-tour-prev" type="button">${labels.prev}</button>
          <button class="tc-tour-btn tc-tour-skip" type="button">${labels.skip}</button>
          <button class="tc-tour-btn tc-tour-dont" type="button">${labels.dontShow}</button>
          <button class="tc-tour-btn tc-tour-next" type="button">${labels.next}</button>
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

  const startTour = (config = {}) => {
    const steps = Array.isArray(config.steps) ? config.steps.filter((step) => step && step.selector) : [];
    if (!steps.length) return null;

    const id = String(config.id || "default").trim() || "default";
    const seenKey = config.storageSeenKey || `${TOUR_NS}_${id}_seen_v1`;
    const neverKey = config.storageNeverKey || `${TOUR_NS}_${id}_never_v1`;
    const force = Boolean(config.force);

    if (!force) {
      if (readStorage(neverKey) === "1") return null;
      if (readStorage(seenKey) === "1") return null;
    }

    if (activeTour?.finish) {
      activeTour.finish({ markSeen: false, markNever: false });
    }

    const labels = { ...DEFAULT_LABELS, ...(config.labels || {}) };
    const overlay = createOverlay(labels);
    const spotlight = overlay.querySelector(".tc-tour-spotlight");
    const card = overlay.querySelector(".tc-tour-card");
    const stepEl = overlay.querySelector(".tc-tour-step");
    const titleEl = overlay.querySelector(".tc-tour-title");
    const descEl = overlay.querySelector(".tc-tour-desc");
    const prevBtn = overlay.querySelector(".tc-tour-prev");
    const skipBtn = overlay.querySelector(".tc-tour-skip");
    const dontBtn = overlay.querySelector(".tc-tour-dont");
    const nextBtn = overlay.querySelector(".tc-tour-next");

    let index = 0;
    let disposed = false;

    const findValidIndex = (start, direction) => {
      let idx = start;
      while (idx >= 0 && idx < steps.length) {
        const target = resolveTarget(steps[idx]);
        if (target && !isHidden(target)) return idx;
        idx += direction;
      }
      return -1;
    };

    const position = () => {
      const step = steps[index];
      const target = resolveTarget(step);
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
        finish({ markSeen: true, markNever: false });
        return;
      }
      index = nextIndex;
      const step = steps[index];
      const target = resolveTarget(step);
      if (!target || isHidden(target)) return;
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(position, 120);
      stepEl.textContent = format(labels.step, { current: index + 1, total: steps.length });
      titleEl.textContent = step.title || "";
      descEl.textContent = step.desc || "";
      prevBtn.disabled = index === 0;
      nextBtn.textContent = index === steps.length - 1 ? labels.done : labels.next;
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        finish({ markSeen: true, markNever: false });
      }
    };

    const finish = ({ markSeen = true, markNever = false } = {}) => {
      if (disposed) return;
      disposed = true;
      if (markSeen) writeStorage(seenKey, "1");
      if (markNever) writeStorage(neverKey, "1");
      overlay.remove();
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position, true);
      window.removeEventListener("keydown", onKeyDown, true);
      if (activeTour?.overlay === overlay) {
        activeTour = null;
      }
    };

    nextBtn.addEventListener("click", () => {
      if (index >= steps.length - 1) {
        finish({ markSeen: true, markNever: false });
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

    skipBtn.addEventListener("click", () => {
      finish({ markSeen: true, markNever: false });
    });

    dontBtn.addEventListener("click", () => {
      finish({ markSeen: true, markNever: true });
    });

    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);
    window.addEventListener("keydown", onKeyDown, true);

    activeTour = { overlay, finish };
    update(1);
    return activeTour;
  };

  const bindReviewButton = (button, configOrFactory) => {
    const node = typeof button === "string" ? document.querySelector(button) : button;
    if (!node) return;
    node.addEventListener("click", () => {
      const config = typeof configOrFactory === "function" ? configOrFactory() : (configOrFactory || {});
      startTour({ ...config, force: true });
    });
  };

  window.tcOnboardingTour = {
    startTour,
    bindReviewButton
  };
})();
