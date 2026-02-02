(() => {
  const mount = document.getElementById("tcTopbarMount");
  if (!mount) return;

  const basePath = window.location.pathname.includes("/worlds/") ? "../" : "./";
  const logoSvg = `${basePath}assets/spacecolors-mark.svg`;
  const logoPng1x = `${basePath}assets/spacecolors-mark-128.png`;
  const logoPng2x = `${basePath}assets/spacecolors-mark-256.png`;

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
        <div class="order-3 w-full flex items-center justify-center gap-3 sm:order-none sm:w-auto sm:flex-1 md:justify-self-center tc-topbar__center">
          <div class="relative" id="portalSwitcher">
            <button id="portalBtn"
              class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[210px] justify-between"
              aria-expanded="false" aria-haspopup="menu" aria-controls="portalMenu" data-i18n="topbar.portal.placeholder">
              Chọn Thế giới
            </button>
            <div id="portalMenu" data-open="0" role="menu" class="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
              <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="${basePath}worlds/threadcolor.html" role="menuitem">Thế giới màu thêu</a>
              <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="${basePath}worlds/gradient.html" role="menuitem">Thế giới Dải chuyển màu</a>
              <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="${basePath}worlds/palette.html" role="menuitem">Thế giới Bảng phối màu</a>
              <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="${basePath}worlds/printcolor.html" role="menuitem">Thế giới Màu in (CMYK)</a>
              <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="${basePath}worlds/library.html" role="menuitem">Thế giới Thư viện Tài sản Màu</a>
              <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="${basePath}worlds/paintfabric.html" role="menuitem">Thế giới màu Sơn&Vải</a>
              <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="${basePath}worlds/imagecolor.html" role="menuitem">Thế giới Màu từ Ảnh</a>
              <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="${basePath}worlds/community.html" role="menuitem">Thế giới Chia sẻ + Remix</a>
            </div>
          </div>
          <div class="relative" id="worldSwitcher">
            <button id="worldBtn"
              class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[150px] justify-between"
              aria-expanded="false" aria-haspopup="menu" aria-controls="worldMenu" data-i18n-attr="aria-label:topbar.tones.label">
              <span class="flex items-center gap-2">
                <span class="tc-dot" aria-hidden="true"></span>
                <span id="worldLabel" data-prefix="Sắc thái: ">Sắc thái: Origami</span>
              </span>
              <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true" style="opacity:.7">
                <path d="M5.25 7.5l4.75 5 4.75-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div id="worldMenu" data-open="0" role="menu" class="absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
              <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="nebula" role="menuitem">Tinh vân</button>
              <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="ocean" role="menuitem">Đại dương</button>
              <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="ink" role="menuitem">Mực tàu</button>
              <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="origami" role="menuitem">Origami</button>
              <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="arcade" role="menuitem">Arcade</button>
              <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="dunes" role="menuitem">Đồi cát</button>
              <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="chrome" role="menuitem">Chrome</button>
              <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="circuit" role="menuitem">Mạch điện</button>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end gap-3 order-2 ml-auto sm:order-none sm:ml-0 md:justify-self-end tc-topbar__right">
          <div id="topbarAuthSlot" data-auth-slot="topbar" class="tc-auth-float flex items-center justify-end order-2 col-span-1 justify-self-end sm:order-none"></div>
        </div>
      </div>
    </header>
  `;
})();


