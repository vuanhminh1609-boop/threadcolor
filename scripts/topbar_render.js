(() => {
  let expectedPortalCount = 8;

  const ensureWorldRegistry = (callback) => {
    if (window.tcWorldRegistry?.getPortalWorlds) {
      callback();
      return;
    }

    if (!window.__tcWorldRegistryLoadPromise) {
      const currentSrc = document.currentScript?.src || "";
      const fallbackPath = window.location.pathname.includes("/worlds/") || window.location.pathname.includes("/spaces/")
        ? "../scripts/world_registry.js"
        : "./scripts/world_registry.js";
      const registryUrl = currentSrc ? new URL("./world_registry.js", currentSrc).href : fallbackPath;

      window.__tcWorldRegistryLoadPromise = new Promise((resolve) => {
        const done = () => resolve(window.tcWorldRegistry || null);
        const existing = document.querySelector('script[data-tc-world-registry="1"]');
        if (existing) {
          if (window.tcWorldRegistry) {
            done();
            return;
          }
          existing.addEventListener("load", done, { once: true });
          existing.addEventListener("error", done, { once: true });
          return;
        }
        const script = document.createElement("script");
        script.src = registryUrl;
        script.async = false;
        script.defer = false;
        script.dataset.tcWorldRegistry = "1";
        script.addEventListener("load", done, { once: true });
        script.addEventListener("error", done, { once: true });
        document.head.appendChild(script);
      });
    }

    window.__tcWorldRegistryLoadPromise.finally(callback);
  };

  const buildFallbackThemeConfig = () => {
    const tones = [
      { key: "nebula", label: "Tinh vân Neon", a1: "#7DD3FC", a2: "#8B7BFF", a3: "#F5A0C5" },
      { key: "ocean", label: "Đại dương Ngọc", a1: "#1AA7C8", a2: "#1F8FB6", a3: "#58D2E0" },
      { key: "ink", label: "Mực tàu Tối giản", a1: "#D7DDE6", a2: "#8B97AB", a3: "#5B6678" },
      { key: "origami", label: "Origami Kem", a1: "#C07A45", a2: "#DDA26A", a3: "#906A4B" },
      { key: "arcade", label: "Arcade Synthwave", a1: "#FF5EC9", a2: "#7A5CFF", a3: "#32E6B1" },
      { key: "dunes", label: "Đồi cát Hoàng hôn", a1: "#D39A50", a2: "#E4B575", a3: "#B47238" },
      { key: "chrome", label: "Chrome Sang", a1: "#4B8CFF", a2: "#9AA7BA", a3: "#121927" },
      { key: "circuit", label: "Pha lê Hologram", a1: "#28C76F", a2: "#1FAA57", a3: "#85F0B1" }
    ];
    const toneKeys = tones.map((tone) => tone.key);
    const normalizeToneKey = (key) => {
      const raw = typeof key === "string" ? key.trim().toLowerCase() : "";
      return toneKeys.includes(raw) ? raw : null;
    };
    return Object.freeze({
      TONES: Object.freeze(tones.map((tone) => Object.freeze({ ...tone }))),
      TONE_KEYS: Object.freeze([...toneKeys]),
      DEFAULT_TONE: "origami",
      STORAGE_KEY: "tc_tone",
      LEGACY_STORAGE_KEY: "tc_world",
      normalizeToneKey
    });
  };

  const ensureThemeConfig = () => {
    const config = window.tcThemeConfig || null;
    if (config && Array.isArray(config.TONES) && config.TONES.length) {
      return config;
    }
    const fallbackConfig = buildFallbackThemeConfig();
    window.tcThemeConfig = fallbackConfig;
    return fallbackConfig;
  };

  const hasAuthControl = (slot) => {
    if (!slot) return false;
    return !!slot.querySelector("#btnAccount, #accountMenuBtn, #userInfo");
  };

  const verifyTopbarInvariant = (stage) => {
    const bar = document.querySelector(".tc-topbar");
    const left = bar?.querySelector(".tc-topbar__left") || null;
    const center = bar?.querySelector(".tc-topbar__center") || null;
    const right = bar?.querySelector(".tc-topbar__right") || null;
    const portalSwitcher = center?.querySelector("#portalSwitcher") || null;
    const worldSwitcher = center?.querySelector("#worldSwitcher") || null;
    const authSlot = right?.querySelector("#topbarAuthSlot") || null;
    const authPresent = hasAuthControl(authSlot);
    const portalItems = portalSwitcher?.querySelectorAll("#portalMenu .tc-menu-item") || [];
    const hasPortalCount = expectedPortalCount > 0 ? portalItems.length === expectedPortalCount : true;

    const ok = !!(
      bar &&
      left &&
      center &&
      right &&
      portalSwitcher &&
      worldSwitcher &&
      authSlot &&
      authPresent &&
      hasPortalCount
    );
    if (ok) return true;

    console.warn("[topbar] Invariant violation", {
      stage,
      hasTopbar: !!bar,
      hasLeft: !!left,
      hasCenter: !!center,
      hasRight: !!right,
      hasPortalSwitcher: !!portalSwitcher,
      hasWorldSwitcher: !!worldSwitcher,
      hasAuthSlot: !!authSlot,
      hasAuthControl: authPresent,
      expectedPortalCount,
      portalItemCount: portalItems.length
    });
    return false;
  };

  const requestAuthDocking = () => {
    const authSlot = document.getElementById("topbarAuthSlot");
    if (!authSlot || hasAuthControl(authSlot)) return;
    try {
      window.dispatchEvent(new Event("firebase-auth-ready"));
    } catch (_err) {}
  };

  const hasHexInspectorMarker = (mount) => {
    const getFlag = (node) => {
      const raw = node?.getAttribute?.("data-enable-hex-inspector");
      return raw === "1" || raw === "true";
    };
    return getFlag(mount) || getFlag(document.body) || getFlag(document.documentElement);
  };

  const appendHexInspectorScript = (basePath) => {
    if (window.__tcHexInspectorLoaded) return;
    if (document.getElementById("tc-hex-inspector-loader")) {
      window.__tcHexInspectorLoaded = true;
      return;
    }
    const script = document.createElement("script");
    script.type = "module";
    script.id = "tc-hex-inspector-loader";
    script.src = `${basePath}scripts/hex_inspector.js`;
    script.addEventListener("load", () => {
      window.__tcHexInspectorLoaded = true;
    }, { once: true });
    document.head.appendChild(script);
  };

  const scheduleHexInspectorLoad = (basePath, mount) => {
    if (!hasHexInspectorMarker(mount)) return;
    if (window.__tcHexInspectorLoadScheduled) return;
    window.__tcHexInspectorLoadScheduled = true;

    const load = () => appendHexInspectorScript(basePath);
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(load, { timeout: 1600 });
      return;
    }
    window.setTimeout(load, 900);
  };

  const tr = (key, fallback = "") => {
    const fn = window.tcI18n?.t;
    if (typeof fn !== "function" || !key) return fallback;
    const value = fn(key, fallback);
    return typeof value === "string" && value ? value : fallback;
  };

  const initTopbarRender = () => {
    const mount = document.getElementById("tcTopbarMount");
    if (!mount) return;

    const isNested = window.location.pathname.includes("/worlds/") || window.location.pathname.includes("/spaces/");
    const basePath = isNested ? "../" : "./";
    const logoSvg = `${basePath}assets/spacecolors-mark.svg`;
    const logoPng1x = `${basePath}assets/spacecolors-mark-128.png`;
    const logoPng2x = `${basePath}assets/spacecolors-mark-256.png`;

    const themeConfig = ensureThemeConfig();
    const tones = Array.isArray(themeConfig.TONES) ? themeConfig.TONES : [];
    if (!tones.length) return;

    const normalizeToneKey = typeof themeConfig.normalizeToneKey === "function"
      ? themeConfig.normalizeToneKey
      : (key) => {
        const raw = typeof key === "string" ? key.trim().toLowerCase() : "";
        return tones.some((tone) => tone.key === raw) ? raw : null;
      };

    const registryApi = window.tcWorldRegistry || null;
    const portalWorlds = registryApi?.getPortalWorlds?.() || [];
    expectedPortalCount = typeof registryApi?.expectedWorldCount === "number"
      ? registryApi.expectedWorldCount
      : portalWorlds.length;

    const defaultToneKey = normalizeToneKey(themeConfig.DEFAULT_TONE) || tones[0].key;
    const defaultTone = tones.find((tone) => tone.key === defaultToneKey) || tones[0];
    const currentToneKey = normalizeToneKey(document.documentElement?.getAttribute("data-world")) || defaultTone.key;
    const currentTone = tones.find((tone) => tone.key === currentToneKey) || defaultTone;

    const toneMenu = tones.map((tone) => `
      <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="${tone.key}" role="menuitem">${tone.label}</button>
    `).join("");

    const portalMenu = portalWorlds.map((item) => {
      const label = tr(item.i18nKey, item.label || item.id);
      const href = registryApi?.resolveUrl
        ? registryApi.resolveUrl(item, basePath)
        : `${basePath}${String(item.url || "").replace(/^\.?\//, "")}`;
      return `<a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="${href}" role="menuitem">${label}</a>`;
    }).join("");

    if (window.tcI18n && typeof window.tcI18n.extendLocale === "function") {
      const worldPatch = tones.reduce((acc, tone) => {
        acc[tone.key] = { ...(acc[tone.key] || {}), label: tone.label };
        return acc;
      }, {});
      window.tcI18n.extendLocale("vi", { worlds: worldPatch });
      window.tcI18n.extendLocale("en", { worlds: worldPatch });
    }

    mount.innerHTML = `
      <header class="tc-topbar relative">
        <div class="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div class="flex items-center gap-3 min-w-0 flex-1 order-1 sm:order-none sm:flex-none md:justify-self-start tc-topbar__left">
            <a href="${basePath}index.html" class="flex items-center gap-3 min-w-0">
              <span class="h-11 w-11 md:h-12 md:w-12 rounded-xl shrink-0 flex items-center justify-center bg-white/5 ring-1 ring-white/10">
                <picture>
                  <source srcset="${logoSvg}" type="image/svg+xml">
                  <img
                    src="${logoPng1x}"
                    srcset="${logoPng1x} 1x, ${logoPng2x} 2x"
                    class="h-full w-full object-contain select-none"
                    alt="SpaceColors"
                    decoding="async"
                    loading="eager"
                  />
                </picture>
              </span>
              <span class="min-w-0 flex flex-col justify-center leading-tight">
                <span class="tc-brand text-base md:text-lg whitespace-nowrap" data-i18n="topbar.brand">SpaceColors</span>
                <span class="tc-muted text-[11px] md:text-xs truncate max-w-[240px] md:max-w-[360px] hidden sm:block" data-i18n="topbar.slogan">Một chạm mở không gian màu vô hạn</span>
              </span>
            </a>
          </div>
          <div class="order-3 w-full flex flex-wrap items-center justify-center gap-3 sm:order-none sm:w-auto sm:flex-1 sm:flex-nowrap md:justify-self-center tc-topbar__center">
            <div class="relative" id="portalSwitcher">
              <button id="portalBtn"
                class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[210px] justify-between"
                aria-expanded="false" aria-haspopup="menu" aria-controls="portalMenu" data-i18n="topbar.portal.placeholder">
                Chọn Thế giới
              </button>
              <div id="portalMenu" data-open="0" role="menu" class="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
                ${portalMenu}
              </div>
            </div>
            <div class="relative" id="worldSwitcher">
              <button id="worldBtn"
                class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[170px] justify-between"
                aria-expanded="false" aria-haspopup="menu" aria-controls="worldMenu" data-i18n-attr="aria-label:topbar.tones.label">
                <span class="flex items-center gap-2 min-w-0">
                  <span class="tc-dot" aria-hidden="true"></span>
                  <span id="worldLabel" class="truncate" data-prefix="">${currentTone.label}</span>
                </span>
                <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true" style="opacity:.7">
                  <path d="M5.25 7.5l4.75 5 4.75-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div id="worldMenu" data-open="0" hidden role="menu" class="absolute right-0 mt-2 w-56 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
                ${toneMenu}
              </div>
            </div>
          </div>
          <div class="flex items-center justify-end gap-3 order-2 ml-auto sm:order-none sm:ml-0 md:justify-self-end tc-topbar__right">
            <a class="tc-chip tc-btn px-3 py-2 text-sm font-semibold" href="${basePath}spaces/community.html">Cộng đồng</a>
            <div id="topbarAuthSlot" data-auth-slot="topbar" class="tc-auth-float flex items-center justify-end order-2 col-span-1 justify-self-end sm:order-none"></div>
          </div>
        </div>
      </header>
    `;

    scheduleHexInspectorLoad(basePath, mount);

    requestAuthDocking();
    window.setTimeout(requestAuthDocking, 48);
    window.setTimeout(() => verifyTopbarInvariant("after-mount"), 72);

    if (!window.__tcTopbarInvariantBound) {
      window.__tcTopbarInvariantBound = true;
      window.addEventListener("firebase-auth-ready", () => {
        window.setTimeout(() => verifyTopbarInvariant("after-firebase-auth-ready"), 72);
      });
      document.addEventListener("tc-auth-changed", () => {
        window.setTimeout(() => verifyTopbarInvariant("after-tc-auth-changed"), 48);
      });
    }
  };

  ensureWorldRegistry(initTopbarRender);
})();
