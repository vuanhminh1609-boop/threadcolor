(() => {
  if (window.tcThemeConfig) return;

  const TONES = [
    { key: "nebula", label: "Tinh vân Neon", a1: "#7DD3FC", a2: "#8B7BFF", a3: "#F5A0C5" },
    { key: "ocean", label: "Đại dương Ngọc", a1: "#1AA7C8", a2: "#1F8FB6", a3: "#58D2E0" },
    { key: "ink", label: "Mực tàu Tối giản", a1: "#D7DDE6", a2: "#8B97AB", a3: "#5B6678" },
    { key: "origami", label: "Origami Kem", a1: "#C07A45", a2: "#DDA26A", a3: "#906A4B" },
    { key: "arcade", label: "Arcade Synthwave", a1: "#FF5EC9", a2: "#7A5CFF", a3: "#32E6B1" },
    { key: "dunes", label: "Đồi cát Hoàng hôn", a1: "#D39A50", a2: "#E4B575", a3: "#B47238" },
    { key: "chrome", label: "Chrome Sang", a1: "#4B8CFF", a2: "#9AA7BA", a3: "#121927" },
    { key: "circuit", label: "Pha lê Hologram", a1: "#28C76F", a2: "#1FAA57", a3: "#85F0B1" }
  ];

  const DEFAULT_TONE = "origami";
  const STORAGE_KEY = "tc_tone";
  const LEGACY_STORAGE_KEY = "tc_world";
  const TONE_KEYS = TONES.map((tone) => tone.key);

  const normalizeToneKey = (key) => {
    const raw = typeof key === "string" ? key.trim().toLowerCase() : "";
    return TONE_KEYS.includes(raw) ? raw : null;
  };

  const frozenTones = Object.freeze(TONES.map((tone) => Object.freeze({ ...tone })));
  const frozenToneMap = Object.freeze(
    frozenTones.reduce((acc, tone) => {
      acc[tone.key] = tone;
      return acc;
    }, {})
  );

  window.tcThemeConfig = Object.freeze({
    TONES: frozenTones,
    TONE_KEYS: Object.freeze([...TONE_KEYS]),
    TONE_MAP: frozenToneMap,
    DEFAULT_TONE,
    STORAGE_KEY,
    LEGACY_STORAGE_KEY,
    normalizeToneKey
  });
})();
