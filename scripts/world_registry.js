(() => {
  if (window.tcWorldRegistry) return;

  const ITEMS = [
    {
      id: "threadcolor",
      type: "world",
      label: "Thế giới màu thêu",
      i18nKey: "lobby.portals.cards.threadcolor.title",
      url: "worlds/threadcolor.html",
      desc: "Tra mã chỉ từ ảnh/HEX",
      descI18nKey: "lobby.recent.worlds.threadcolor.desc",
      recentLabel: "Thế giới màu thêu",
      recentLabelI18nKey: "lobby.recent.worlds.threadcolor.label",
      order: 10,
      status: "active",
      keywords: ["thêu", "mã chỉ", "ảnh", "hex", "threadcolor"]
    },
    {
      id: "gradient",
      type: "world",
      label: "Thế giới Dải chuyển màu",
      i18nKey: "lobby.portals.cards.gradient.title",
      url: "worlds/gradient.html",
      desc: "Tạo dải chuyển màu và xuất token nhanh",
      descI18nKey: "lobby.recent.worlds.gradient.desc",
      recentLabel: "Dải chuyển màu",
      recentLabelI18nKey: "lobby.recent.worlds.gradient.label",
      order: 20,
      status: "active",
      keywords: ["gradient", "dải chuyển", "token"]
    },
    {
      id: "palette",
      type: "world",
      label: "Thế giới Bảng phối màu",
      i18nKey: "lobby.portals.cards.palette.title",
      url: "worlds/palette.html",
      desc: "Phối màu và kiểm tra tương phản",
      descI18nKey: "lobby.recent.worlds.palette.desc",
      recentLabel: "Bảng phối màu",
      recentLabelI18nKey: "lobby.recent.worlds.palette.label",
      order: 30,
      status: "active",
      keywords: ["palette", "bảng phối", "tương phản"]
    },
    {
      id: "printcolor",
      type: "world",
      label: "Thế giới Màu in (CMYK)",
      i18nKey: "lobby.portals.cards.printcolor.title",
      url: "worlds/printcolor.html",
      desc: "Kiểm tra CMYK/TAC trước khi in",
      descI18nKey: "lobby.recent.worlds.printcolor.desc",
      recentLabel: "CMYK và in ấn",
      recentLabelI18nKey: "lobby.recent.worlds.printcolor.label",
      order: 40,
      status: "active",
      keywords: ["cmyk", "in", "print", "tac"]
    },
    {
      id: "library",
      type: "world",
      label: "Thế giới Thư viện Tài sản Màu",
      i18nKey: "lobby.portals.cards.library.title",
      url: "worlds/library.html",
      desc: "Lưu và quản lý tài sản màu",
      descI18nKey: "lobby.recent.worlds.library.desc",
      recentLabel: "Thư viện màu",
      recentLabelI18nKey: "lobby.recent.worlds.library.label",
      order: 50,
      status: "active",
      keywords: ["thư viện", "library", "asset", "lưu"]
    },
    {
      id: "paintfabric",
      type: "world",
      label: "Thế giới màu Sơn&Vải",
      i18nKey: "lobby.portals.cards.paintfabric.title",
      url: "worlds/paintfabric.html",
      desc: "Mô phỏng màu trên sơn/vải",
      descI18nKey: "lobby.recent.worlds.paintfabric.desc",
      recentLabel: "Sơn&Vải",
      recentLabelI18nKey: "lobby.recent.worlds.paintfabric.label",
      order: 60,
      status: "active",
      keywords: ["sơn", "vải", "paint", "fabric", "material"]
    },
    {
      id: "imagecolor",
      type: "world",
      label: "Thế giới Màu từ Ảnh",
      i18nKey: "lobby.portals.cards.imagecolor.title",
      url: "worlds/imagecolor.html",
      desc: "Lấy màu chủ đạo từ ảnh",
      descI18nKey: "lobby.recent.worlds.imagecolor.desc",
      recentLabel: "Màu từ Ảnh",
      recentLabelI18nKey: "lobby.recent.worlds.imagecolor.label",
      order: 70,
      status: "active",
      keywords: ["ảnh", "image", "color extraction", "extract"]
    },
    {
      id: "colorplay",
      type: "world",
      label: "Thế giới trò chơi màu",
      i18nKey: "lobby.portals.cards.colorplay.title",
      url: "worlds/colorplay.html",
      desc: "Trò chơi luyện mắt màu",
      descI18nKey: "lobby.recent.worlds.colorplay.desc",
      recentLabel: "Trò chơi màu",
      recentLabelI18nKey: "lobby.recent.worlds.colorplay.label",
      order: 80,
      status: "active",
      keywords: ["game", "colorplay", "line", "sudoku"]
    },
    {
      id: "threadvault",
      type: "utility",
      label: "Kho chỉ",
      i18nKey: "footer.columns.tools.threadvault",
      url: "worlds/threadvault.html",
      desc: "Quản lý kho chỉ và dữ liệu",
      descI18nKey: "lobby.recent.worlds.threadvault.desc",
      recentLabel: "Kho chỉ",
      recentLabelI18nKey: "lobby.recent.worlds.threadvault.label",
      order: 90,
      status: "active",
      keywords: ["kho chỉ", "vault", "utility", "world1"]
    }
  ];

  const normalizeId = (id) => (typeof id === "string" ? id.trim().toLowerCase() : "");

  const sortedItems = Object.freeze(
    ITEMS
      .map((item) => Object.freeze({ ...item }))
      .sort((a, b) => (a.order || 0) - (b.order || 0))
  );

  const itemMap = Object.freeze(
    sortedItems.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {})
  );

  const resolveUrl = (itemOrId, basePath = "./") => {
    const item = typeof itemOrId === "string" ? itemMap[normalizeId(itemOrId)] : itemOrId;
    if (!item || typeof item.url !== "string") return "";
    const url = item.url.trim();
    if (!url) return "";
    if (/^(?:https?:)?\/\//i.test(url)) return url;
    if (url.startsWith("/")) return url;
    const normalizedBase = typeof basePath === "string" && basePath ? basePath : "./";
    const trimmedBase = normalizedBase.endsWith("/") ? normalizedBase : `${normalizedBase}/`;
    return `${trimmedBase}${url.replace(/^\.?\//, "")}`;
  };

  const getAllItems = () => [...sortedItems];
  const getWorlds = () => sortedItems.filter((item) => item.type === "world");
  const getUtilities = () => sortedItems.filter((item) => item.type === "utility");
  const getPortalWorlds = () =>
    getWorlds().filter((item) => item.status === "active" || item.status === "soon");
  const getById = (id) => itemMap[normalizeId(id)] || null;

  window.tcWorldRegistry = Object.freeze({
    version: "2026-03-05",
    expectedWorldCount: 8,
    items: sortedItems,
    getAllItems,
    getWorlds,
    getUtilities,
    getPortalWorlds,
    getById,
    resolveUrl
  });
})();
