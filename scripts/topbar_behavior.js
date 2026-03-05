(() => {
  if (window.__topbarBehaviorBound) return;
  window.__topbarBehaviorBound = true;

  const ensureThemeConfig = (callback) => {
    if (window.tcThemeConfig) {
      callback();
      return;
    }

    if (!window.__tcThemeConfigLoadPromise) {
      const currentSrc = document.currentScript?.src || "";
      const fallbackBase = window.location.pathname.includes("/worlds/") || window.location.pathname.includes("/spaces/")
        ? "../scripts/theme_config.js"
        : "./scripts/theme_config.js";
      const themeConfigUrl = currentSrc ? new URL("./theme_config.js", currentSrc).href : fallbackBase;

      window.__tcThemeConfigLoadPromise = new Promise((resolve) => {
        const done = () => resolve(window.tcThemeConfig || null);
        const existing = document.querySelector('script[data-tc-theme-config="1"]');
        if (existing) {
          if (window.tcThemeConfig) {
            done();
            return;
          }
          existing.addEventListener("load", done, { once: true });
          existing.addEventListener("error", done, { once: true });
          return;
        }

        const script = document.createElement("script");
        script.src = themeConfigUrl;
        script.async = false;
        script.defer = false;
        script.dataset.tcThemeConfig = "1";
        script.addEventListener("load", done, { once: true });
        script.addEventListener("error", done, { once: true });
        document.head.appendChild(script);
      });
    }

    window.__tcThemeConfigLoadPromise.finally(callback);
  };

  const initTopbarBehavior = () => {
    const themeConfig = window.tcThemeConfig || {};
    const toneList = Array.isArray(themeConfig.TONES) ? themeConfig.TONES : [];
    let toneKeysFromConfig = Array.isArray(themeConfig.TONE_KEYS)
      ? themeConfig.TONE_KEYS
      : toneList
        .map((tone) => tone?.key)
        .filter((key) => typeof key === "string" && key.trim());
    if (!toneKeysFromConfig.length) {
      toneKeysFromConfig = Array.from(document.querySelectorAll("[data-world]"))
        .map((node) => node.getAttribute("data-world"))
        .filter((key) => typeof key === "string" && key.trim());
    }
    if (!toneKeysFromConfig.length) {
      const rootTone = document.documentElement?.getAttribute("data-world");
      if (typeof rootTone === "string" && rootTone.trim()) {
        toneKeysFromConfig = [rootTone];
      }
    }
    const TONE_KEYS = toneKeysFromConfig
      .map((key) => key.trim().toLowerCase())
      .filter((key, index, list) => key && list.indexOf(key) === index);
    const normalizeToneKey = typeof themeConfig.normalizeToneKey === "function"
      ? themeConfig.normalizeToneKey
      : (key) => {
        const raw = typeof key === "string" ? key.trim().toLowerCase() : "";
        return TONE_KEYS.includes(raw) ? raw : null;
      };
    const DEFAULT_TONE = normalizeToneKey(themeConfig.DEFAULT_TONE) || TONE_KEYS[0] || "origami";
    const TONE_STORAGE_KEY = typeof themeConfig.STORAGE_KEY === "string" ? themeConfig.STORAGE_KEY : "tc_tone";
    const LEGACY_TONE_STORAGE_KEY = typeof themeConfig.LEGACY_STORAGE_KEY === "string"
      ? themeConfig.LEGACY_STORAGE_KEY
      : "tc_world";

    const readStoredTone = () => {
      try {
        const storedTone = normalizeToneKey(localStorage.getItem(TONE_STORAGE_KEY));
        if (storedTone) {
          return storedTone;
        }
        const legacyTone = normalizeToneKey(localStorage.getItem(LEGACY_TONE_STORAGE_KEY));
        if (legacyTone) {
          localStorage.setItem(TONE_STORAGE_KEY, legacyTone);
          return legacyTone;
        }
      } catch (_err) {}
      return null;
    };

    const getCurrentTone = () => normalizeToneKey(document.documentElement?.getAttribute("data-world"));

    const dispatchWorldChanged = (tone, source) => {
      document.dispatchEvent(new CustomEvent("tc-world-changed", { detail: { world: tone, tone, source } }));
    };

    const setToneState = (key, options = {}) => {
      const source = typeof options.source === "string" ? options.source : "sync";
      const persist = options.persist !== false;
      let next = normalizeToneKey(key);
      if (!next) {
        next = readStoredTone() || getCurrentTone() || DEFAULT_TONE;
      }

      const prev = document.documentElement.getAttribute("data-world");
      document.documentElement.setAttribute("data-world", next);

      if (persist) {
        try {
          if (localStorage.getItem(TONE_STORAGE_KEY) !== next) {
            localStorage.setItem(TONE_STORAGE_KEY, next);
          }
        } catch (_err) {}
      }

      if (prev !== next || options.forceDispatch === true) {
        dispatchWorldChanged(next, source);
      }

      return next;
    };

    const syncToneState = (source = "init") => {
      const storedTone = readStoredTone();
      return setToneState(storedTone || getCurrentTone() || DEFAULT_TONE, { source, persist: true });
    };

    const bindToneStorageSync = () => {
      window.addEventListener("storage", (event) => {
        if (event.key !== TONE_STORAGE_KEY && event.key !== LEGACY_TONE_STORAGE_KEY) return;
        const shouldPersist = event.key === LEGACY_TONE_STORAGE_KEY;
        setToneState(event.newValue, { source: "storage", persist: shouldPersist });
      });
    };

    window.tcToneSync = {
      keys: [...TONE_KEYS],
      toneKeys: [...TONE_KEYS],
      storageKey: TONE_STORAGE_KEY,
      legacyStorageKey: LEGACY_TONE_STORAGE_KEY,
      getWorld: () => getCurrentTone() || readStoredTone() || DEFAULT_TONE,
      setWorld: (key) => setToneState(key, { source: "api-write", persist: true }),
      getTone: () => getCurrentTone() || readStoredTone() || DEFAULT_TONE,
      setTone: (key) => setToneState(key, { source: "api-write", persist: true })
    };

  const bindAdminLink = () => {
    const adminLink = document.getElementById("portalAdminLink");
    if (!adminLink) return;

    const setVisible = (visible) => {
      adminLink.classList.toggle("hidden", !visible);
      adminLink.setAttribute("aria-hidden", visible ? "false" : "true");
    };

    const checkAdmin = async (user) => {
      if (!user || typeof user.getIdToken !== "function") {
        setVisible(false);
        return;
      }
      try {
        const token = await user.getIdToken();
        const res = await fetch("/admin/ping", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setVisible(res.ok);
      } catch (_err) {
        setVisible(false);
      }
    };

    const bind = () => {
      const api = window.firebaseAuth || window.firebaseAuthApi || null;
      if (!api?.onAuthStateChanged) {
        setVisible(false);
        return;
      }
      api.onAuthStateChanged((user) => {
        checkAdmin(user);
      });
    };

    if (window.firebaseAuth) {
      bind();
    } else {
      window.addEventListener("firebase-auth-ready", bind, { once: true });
    }
  };

  const bindPortalMenu = () => {
    const portalBtn = document.getElementById("portalBtn");
    const portalMenu = document.getElementById("portalMenu");
    if (!portalBtn || !portalMenu) return;

    const setOpen = (open) => {
      portalMenu.dataset.open = open ? "1" : "0";
      portalMenu.hidden = !open;
      portalBtn.setAttribute("aria-expanded", open ? "true" : "false");
    };

    setOpen(portalMenu.dataset.open === "1");

    portalBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      setOpen(portalMenu.dataset.open !== "1");
    });

    portalMenu.addEventListener("click", (event) => {
      const item = event.target.closest(".tc-menu-item");
      if (!item || !portalMenu.contains(item)) return;
      const href = item.getAttribute("href") || "";
      const workbench = window.tcWorkbench || null;
      const context = workbench?.getContext?.();
      if (href && context?.hexes?.length && workbench?.ensureBufferFromHexes && workbench?.appendBufferToUrl) {
        const bufferId = workbench.ensureBufferFromHexes(context.hexes, { source: "topbar" });
        if (bufferId) {
          event.preventDefault();
          const nextUrl = workbench.appendBufferToUrl(href, bufferId);
          setOpen(false);
          window.location.href = nextUrl;
          return;
        }
      }
      setOpen(false);
    });

    document.addEventListener("click", (event) => {
      if (!portalMenu.contains(event.target) && !portalBtn.contains(event.target)) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  };

  const bindToneSwitcher = () => {
    const worldBtn = document.getElementById("worldBtn");
    const worldMenu = document.getElementById("worldMenu");
    const switcher = document.getElementById("worldSwitcher");
    const worldLabel = document.getElementById("worldLabel");
    if (!worldBtn || !worldMenu || !switcher) return;

    const getItems = () => Array.from(worldMenu.querySelectorAll("[data-world]"));

    const getLabelMap = () => {
      const map = new Map();
      getItems().forEach((item) => {
        const key = item.getAttribute("data-world");
        const label = item.textContent ? item.textContent.trim() : "";
        if (key && label) map.set(key, label);
      });
      return map;
    };

    const syncWorldLabel = () => {
      const current = getCurrentTone() || DEFAULT_TONE;
      const label = getLabelMap().get(current);
      if (worldLabel && label) {
        const prefix = worldLabel.dataset?.prefix || "";
        worldLabel.textContent = prefix ? `${prefix}${label}` : label;
      }
    };

    const setMenuOpen = (open) => {
      worldMenu.dataset.open = open ? "1" : "0";
      worldMenu.hidden = !open;
      worldBtn.setAttribute("aria-expanded", open ? "true" : "false");
    };

    setMenuOpen(false);
    worldMenu.dataset.open = "0";
    worldMenu.hidden = true;

    worldBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      setMenuOpen(worldMenu.dataset.open !== "1");
    });

    worldMenu.addEventListener("click", (event) => {
      const item = event.target.closest("[data-world]");
      if (!item || !worldMenu.contains(item)) return;
      event.preventDefault();
      setToneState(item.getAttribute("data-world"), { source: "switcher", persist: true });
      syncWorldLabel();
      setMenuOpen(false);
      worldBtn.focus();
    });

    const galleryGrid = document.querySelector('[data-world-grid="1"]');
    if (galleryGrid) {
      galleryGrid.addEventListener("click", (event) => {
        const card = event.target.closest('[data-world-card="1"]');
        if (!card || !galleryGrid.contains(card)) return;
        setToneState(card.dataset.world, { source: "gallery", persist: true });
        syncWorldLabel();
        if (worldMenu.dataset.open === "1") {
          setMenuOpen(false);
        }
      });
      galleryGrid.addEventListener("keydown", (event) => {
        const card = event.target.closest('[data-world-card="1"]');
        if (!card || !galleryGrid.contains(card) || document.activeElement !== card) return;
        if (event.key === "Enter" || event.key === " " || event.key === "Spacebar" || event.key === "Space") {
          event.preventDefault();
          setToneState(card.dataset.world, { source: "gallery", persist: true });
          syncWorldLabel();
          if (worldMenu.dataset.open === "1") {
            setMenuOpen(false);
          }
        }
      });
    }

    document.addEventListener("click", (event) => {
      if (!switcher.contains(event.target)) {
        setMenuOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      const items = getItems();
      const isOpen = worldMenu.dataset.open === "1";
      if (event.key === "Escape") {
        if (isOpen) {
          setMenuOpen(false);
          worldBtn.focus();
        }
        return;
      }
      if (event.key === "ArrowDown" && document.activeElement === worldBtn) {
        event.preventDefault();
        setMenuOpen(true);
        if (!items.length) return;
        items[0]?.focus();
        return;
      }
      if (!isOpen || (event.key !== "ArrowDown" && event.key !== "ArrowUp")) return;
      const currentIndex = items.indexOf(document.activeElement);
      if (currentIndex === -1) return;
      event.preventDefault();
      const nextIndex = event.key === "ArrowDown"
        ? (currentIndex + 1) % items.length
        : (currentIndex - 1 + items.length) % items.length;
      items[nextIndex]?.focus();
    });

    syncWorldLabel();
    setMenuOpen(false);
    worldMenu.dataset.open = "0";
    worldMenu.hidden = true;
    document.addEventListener("tc-world-changed", syncWorldLabel);
  };

  const bindCommunityMenus = () => {
    const pairs = [
      { btnId: "communityBtn", menuId: "communityMenu", mode: "navigate" },
      { btnId: "spacesBtn", menuId: "spacesMenu", mode: "navigate" },
      { btnId: "w1CommunityBtn", menuId: "w1CommunityMenu", mode: "dispatch" },
      { btnId: "w1SpacesBtn", menuId: "w1SpacesMenu", mode: "dispatch" }
    ];

    const menus = pairs
      .map(({ btnId, menuId, mode }) => ({
        btn: document.getElementById(btnId),
        menu: document.getElementById(menuId),
        mode
      }))
      .filter(({ btn, menu }) => btn && menu);

    if (!menus.length) return;

    const setMenuOpen = (btn, menu, open) => {
      menu.dataset.open = open ? "1" : "0";
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    };

    const closeAll = () => menus.forEach(({ btn, menu }) => setMenuOpen(btn, menu, false));

    const goTool = (action) => {
      const auth = window.tcAuth || null;
      const isLoggedIn = typeof auth?.isLoggedIn === "function" ? auth.isLoggedIn() : false;
      if (!isLoggedIn) {
        if (typeof auth?.openAuth === "function") {
          auth.openAuth();
          return;
        }
      }
      const target = action
        ? `./worlds/threadcolor.html?open=${encodeURIComponent(action)}`
        : "./worlds/threadcolor.html";
      window.location.href = target;
    };

    menus.forEach(({ btn, menu, mode }) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = menu.dataset.open === "1";
        closeAll();
        setMenuOpen(btn, menu, !isOpen);
      });

      menu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-menu-item");
        if (!item || !menu.contains(item)) return;
        const action = item.getAttribute("data-action");
        if (action) {
          if (mode === "dispatch") {
            document.dispatchEvent(new CustomEvent("tc-auth-action", { detail: { action } }));
          } else {
            goTool(action);
          }
        }
        closeAll();
      });
    });

    document.addEventListener("click", (event) => {
      if (menus.some(({ btn, menu }) => btn.contains(event.target) || menu.contains(event.target))) return;
      closeAll();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeAll();
    });
  };

  const bindQuickActions = () => {
    const contributeBtn = document.querySelector('[data-qa-action="contribute"]');
    const verifyBtn = document.querySelector('[data-qa-action="verify"]');
    if (!contributeBtn && !verifyBtn) return;

    const isLoggedIn = () => {
      if (window.tcAuth?.isLoggedIn?.()) return true;
      const api = (window.firebaseAuth || window.firebaseAuthApi || null);
      if (api?.auth?.currentUser) return true;
      if (api?.user?.uid || api?.user?.email) return true;
      const userInfo = document.getElementById("userInfo");
      return !!userInfo && !userInfo.classList.contains("hidden");
    };

    const openLoginOrGo = () => {
      const btnAccount = document.getElementById("btnAccount");
      if (btnAccount) {
        btnAccount.click();
        return;
      }
      window.location.href = "./worlds/threadcolor.html";
    };

    const goThreadcolor = () => {
      window.location.href = "./worlds/threadcolor.html";
    };

    const bindQuickAction = (button) => {
      if (!button) return;
      button.addEventListener("click", () => {
        if (isLoggedIn()) {
          goThreadcolor();
          return;
        }
        openLoginOrGo();
      });
    };

    bindQuickAction(contributeBtn);
    bindQuickAction(verifyBtn);
  };

  const bindScrollBehavior = () => {
    const bar = document.querySelector(".tc-topbar");
    if (!bar) return;

    let behavior = "shrink";
    try {
      behavior = localStorage.getItem("tc_topbar_behavior") || behavior;
    } catch (_err) {}
    behavior = (document.documentElement.getAttribute("data-topbar-behavior") || behavior).toLowerCase();

    let lastY = window.scrollY || 0;
    let ticking = false;

    const apply = () => {
      const y = window.scrollY || 0;
      bar.classList.toggle("is-scrolled", y > 8);
      if (behavior === "auto-hide") {
        const shouldHide = y > lastY && y > 72;
        bar.classList.toggle("is-hidden", shouldHide);
      } else {
        bar.classList.remove("is-hidden");
      }
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  };

    syncToneState("init");
    bindToneStorageSync();
    bindAdminLink();
    bindPortalMenu();
    bindToneSwitcher();
    bindCommunityMenus();
    bindQuickActions();
    bindScrollBehavior();
  };

  ensureThemeConfig(initTopbarBehavior);
})();
