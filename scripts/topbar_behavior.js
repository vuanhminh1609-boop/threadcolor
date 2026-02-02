(() => {
  if (window.__topbarBehaviorBound) return;
  window.__topbarBehaviorBound = true;

  const WORLD_KEYS = ["nebula", "ocean", "ink", "origami", "arcade", "dunes", "chrome", "circuit"];
  const STORAGE_KEY = "tc_world";

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

    const applyWorld = (key) => {
      const current = document.documentElement.dataset.world;
      const next = WORLD_KEYS.includes(key)
        ? key
        : (WORLD_KEYS.includes(current) ? current : "origami");
      const prev = document.documentElement.getAttribute("data-world");
      document.documentElement.setAttribute("data-world", next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (_err) {}
      if (prev !== next) {
        document.dispatchEvent(new CustomEvent("tc-world-changed", { detail: { world: next } }));
      }
      const label = getLabelMap().get(next);
      if (worldLabel && label) {
        const prefix = worldLabel.dataset?.prefix || "";
        worldLabel.textContent = prefix ? `${prefix}${label}` : label;
      }
    };

    const setMenuOpen = (open) => {
      worldMenu.dataset.open = open ? "1" : "0";
      worldBtn.setAttribute("aria-expanded", open ? "true" : "false");
    };

    worldBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      setMenuOpen(worldMenu.dataset.open !== "1");
    });

    worldMenu.addEventListener("click", (event) => {
      const item = event.target.closest("[data-world]");
      if (!item || !worldMenu.contains(item)) return;
      event.preventDefault();
      applyWorld(item.getAttribute("data-world"));
      setMenuOpen(false);
      worldBtn.focus();
    });

    const galleryGrid = document.querySelector('[data-world-grid="1"]');
    if (galleryGrid) {
      galleryGrid.addEventListener("click", (event) => {
        const card = event.target.closest('[data-world-card="1"]');
        if (!card || !galleryGrid.contains(card)) return;
        applyWorld(card.dataset.world);
        if (worldMenu.dataset.open === "1") {
          setMenuOpen(false);
        }
      });
      galleryGrid.addEventListener("keydown", (event) => {
        const card = event.target.closest('[data-world-card="1"]');
        if (!card || !galleryGrid.contains(card) || document.activeElement !== card) return;
        if (event.key === "Enter" || event.key === " " || event.key === "Spacebar" || event.key === "Space") {
          event.preventDefault();
          applyWorld(card.dataset.world);
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

    let storedWorld = null;
    try {
      storedWorld = localStorage.getItem(STORAGE_KEY);
    } catch (_err) {}
    if (WORLD_KEYS.includes(storedWorld)) {
      applyWorld(storedWorld);
    } else {
      applyWorld(document.documentElement.dataset.world);
    }
    setMenuOpen(false);

    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        applyWorld(event.newValue);
      }
    });
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

  bindAdminLink();
  bindPortalMenu();
  bindToneSwitcher();
  bindCommunityMenus();
  bindQuickActions();
  bindScrollBehavior();
})();
