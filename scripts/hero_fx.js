(() => {
  let observerBound = false;

  const normalizeText = (value) => String(value || "").replace(/\u00A0/g, " ").trim();

  const getHeroLines = (hero) => {
    const rawLines = hero.dataset.heroLines;
    if (rawLines) {
      return rawLines.split("|").map((line) => normalizeText(line)).filter(Boolean);
    }
    const rawText = normalizeText(hero.dataset.heroText || hero.getAttribute("aria-label") || hero.textContent);
    return rawText ? [rawText] : [];
  };

  const buildLetters = (hero, lines) => {
    const label = lines.join(" ");
    hero.setAttribute("aria-label", label);
    hero.dataset.heroText = label;
    hero.dataset.heroLinesKey = lines.join(" | ");
    hero.dataset.heroSplit = "1";
    hero.textContent = "";
    const fragment = document.createDocumentFragment();
    let index = 0;
    lines.forEach((line, lineIndex) => {
      const lineWrap = document.createElement("span");
      lineWrap.className = lineIndex === 0 ? "heroLine heroLine1" : "heroLine heroLine2";
      for (const char of line) {
        const span = document.createElement("span");
        span.className = "hero-letter";
        span.setAttribute("aria-hidden", "true");
        span.style.setProperty("--i", index);
        if (char === " ") {
          span.classList.add("hero-space");
          span.textContent = "\u00A0";
        } else {
          span.textContent = char;
        }
        lineWrap.appendChild(span);
        index += 1;
      }
      fragment.appendChild(lineWrap);
    });
    hero.appendChild(fragment);
  };

  const initHeroLetters = () => {
    const hero = document.querySelector(".tc-hero-title");
    if (!hero) return;
    const lines = getHeroLines(hero);
    if (!lines.length) return;
    const currentText = normalizeText(hero.textContent);
    const hasLetters = hero.querySelector(".hero-letter");
    const linesKey = lines.join(" | ");
    if (hasLetters && hero.dataset.heroSplit === "1" && hero.dataset.heroLinesKey === linesKey && currentText) {
      hero.setAttribute("aria-label", lines.join(" "));
      return;
    }
    buildLetters(hero, lines);
  };

  const bindToneListeners = () => {
    if (observerBound) return;
    observerBound = true;
    document.addEventListener("tc:tone-changed", initHeroLetters);
    window.addEventListener("tc:tone-changed", initHeroLetters);
    if (typeof MutationObserver !== "undefined" && document.documentElement) {
      const observer = new MutationObserver((mutations) => {
        const changed = mutations.some((m) => m.type === "attributes" && m.attributeName === "data-world");
        if (changed) initHeroLetters();
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-world"] });
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    initHeroLetters();
    bindToneListeners();
  });
})();
