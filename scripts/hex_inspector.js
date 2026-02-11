import { buildPremiumHeaderModel } from "./color_naming.js";
import { computeContextTags } from "./color_context_tags.js";

const STYLE_ID = "tc-hexinspector-style";
const OVERLAY_ID = "tc-hexinspector-overlay";
const PANEL_ID = "tc-hexinspector-panel";
const CACHE_KEY = "tc_threads_cache_v1";
const CACHE_VERSION = 1;
const LONG_PRESS_MS = 350;

if (!window.__tcHexInspectorMounted) {
  window.__tcHexInspectorMounted = true;

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const padHex = (v) => v.toString(16).padStart(2, "0");
  const normalizeHex = (value) => {
    if (!value) return null;
    const raw = String(value).trim().replace(/^0x/i, "").replace(/[^0-9a-fA-F]/g, "");
    if (raw.length === 3) {
      const expanded = raw.split("").map((c) => c + c).join("");
      return `#${expanded.toUpperCase()}`;
    }
    if (raw.length === 6) return `#${raw.toUpperCase()}`;
    return null;
  };

  const hexToRgb = (hex) => {
    const normalized = normalizeHex(hex);
    if (!normalized) return null;
    const int = parseInt(normalized.slice(1), 16);
    return {
      r: (int >> 16) & 255,
      g: (int >> 8) & 255,
      b: int & 255
    };
  };

  const rgbToHex = (r, g, b) => {
    return `#${padHex(clamp(Math.round(r), 0, 255))}${padHex(clamp(Math.round(g), 0, 255))}${padHex(clamp(Math.round(b), 0, 255))}`.toUpperCase();
  };

  const rgbToHsl = (r, g, b) => {
    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const delta = max - min;
    let h = 0;
    if (delta !== 0) {
      if (max === rn) h = ((gn - bn) / delta) % 6;
      if (max === gn) h = (bn - rn) / delta + 2;
      if (max === bn) h = (rn - gn) / delta + 4;
    }
    h = Math.round((h * 60 + 360) % 360);
    const l = (max + min) / 2;
    const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const rgbToHsv = (r, g, b) => {
    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const delta = max - min;
    let h = 0;
    if (delta !== 0) {
      if (max === rn) h = ((gn - bn) / delta) % 6;
      if (max === gn) h = (bn - rn) / delta + 2;
      if (max === bn) h = (rn - gn) / delta + 4;
    }
    h = Math.round((h * 60 + 360) % 360);
    const s = max === 0 ? 0 : delta / max;
    return { h, s: Math.round(s * 100), v: Math.round(max * 100) };
  };

  const rgbToXyz = (r, g, b) => {
    let rn = r / 255;
    let gn = g / 255;
    let bn = b / 255;
    rn = rn > 0.04045 ? Math.pow((rn + 0.055) / 1.055, 2.4) : rn / 12.92;
    gn = gn > 0.04045 ? Math.pow((gn + 0.055) / 1.055, 2.4) : gn / 12.92;
    bn = bn > 0.04045 ? Math.pow((bn + 0.055) / 1.055, 2.4) : bn / 12.92;
    const x = rn * 0.4124 + gn * 0.3576 + bn * 0.1805;
    const y = rn * 0.2126 + gn * 0.7152 + bn * 0.0722;
    const z = rn * 0.0193 + gn * 0.1192 + bn * 0.9505;
    return { x: x * 100, y: y * 100, z: z * 100 };
  };

  const xyzToLab = (x, y, z) => {
    let xn = x / 95.047;
    let yn = y / 100;
    let zn = z / 108.883;
    xn = xn > 0.008856 ? Math.cbrt(xn) : (7.787 * xn + 16 / 116);
    yn = yn > 0.008856 ? Math.cbrt(yn) : (7.787 * yn + 16 / 116);
    zn = zn > 0.008856 ? Math.cbrt(zn) : (7.787 * zn + 16 / 116);
    return {
      l: Math.round(116 * yn - 16),
      a: Math.round(500 * (xn - yn)),
      b: Math.round(200 * (yn - zn))
    };
  };

  const rgbToLab = (r, g, b) => {
    const xyz = rgbToXyz(r, g, b);
    return xyzToLab(xyz.x, xyz.y, xyz.z);
  };

  const rgbToCmyk = (r, g, b) => {
    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;
    const k = 1 - Math.max(rn, gn, bn);
    if (k >= 1) {
      return { c: 0, m: 0, y: 0, k: 100 };
    }
    const c = (1 - rn - k) / (1 - k);
    const m = (1 - gn - k) / (1 - k);
    const y = (1 - bn - k) / (1 - k);
    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  const relativeLuminance = (rgb) => {
    if (!rgb) return 0;
    const toLinear = (v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    };
    const r = toLinear(rgb.r);
    const g = toLinear(rgb.g);
    const b = toLinear(rgb.b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const contrastRatio = (rgb1, rgb2) => {
    const l1 = relativeLuminance(rgb1);
    const l2 = relativeLuminance(rgb2);
    const bright = Math.max(l1, l2);
    const dark = Math.min(l1, l2);
    return (bright + 0.05) / (dark + 0.05);
  };

  const deltaE76 = (lab1, lab2) => {
    if (!lab1 || !lab2) return 0;
    const dl = lab1.l - lab2.l;
    const da = lab1.a - lab2.a;
    const db = lab1.b - lab2.b;
    return Math.sqrt(dl * dl + da * da + db * db);
  };

  const mixHex = (hex, target, t) => {
    const a = hexToRgb(hex);
    const b = hexToRgb(target);
    if (!a || !b) return hex;
    const r = a.r + (b.r - a.r) * t;
    const g = a.g + (b.g - a.g) * t;
    const bl = a.b + (b.b - a.b) * t;
    return rgbToHex(r, g, bl);
  };

  const hslToRgb = (h, s, l) => {
    const sN = clamp(s, 0, 100) / 100;
    const lN = clamp(l, 0, 100) / 100;
    const c = (1 - Math.abs(2 * lN - 1)) * sN;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = lN - c / 2;
    let r = 0, g = 0, b = 0;
    if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  };

  const shiftHue = (hex, delta) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const nextHue = (hsl.h + delta + 360) % 360;
    const rgbShifted = hslToRgb(nextHue, hsl.s, hsl.l);
    return rgbToHex(rgbShifted.r, rgbShifted.g, rgbShifted.b);
  };

  const guessHueName = (h, s, l) => {
    if (l >= 92 && s < 12) return "Trắng";
    if (l <= 10) return "Đen";
    if (s < 12) return "Xám";
    const ranges = [
      { name: "Đỏ", from: 345, to: 360 },
      { name: "Đỏ", from: 0, to: 15 },
      { name: "Cam", from: 15, to: 35 },
      { name: "Vàng", from: 35, to: 60 },
      { name: "Vàng lục", from: 60, to: 90 },
      { name: "Lục", from: 90, to: 150 },
      { name: "Lục lam", from: 150, to: 190 },
      { name: "Lam", from: 190, to: 230 },
      { name: "Xanh dương", from: 230, to: 255 },
      { name: "Chàm", from: 255, to: 285 },
      { name: "Tím", from: 285, to: 320 },
      { name: "Hồng", from: 320, to: 345 }
    ];
    const hit = ranges.find((r) => h >= r.from && h < r.to);
    const tone = l >= 70 ? "sáng" : l <= 35 ? "đậm" : "trung";
    return hit ? `${hit.name} ${tone}` : "Màu trung tính";
  };

  const parseRgbString = (value) => {
    const match = String(value || "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i);
    if (!match) return null;
    const alpha = match[4] ? parseFloat(match[4]) : 1;
    if (alpha <= 0.05) return null;
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10)
    };
  };

  const isSwatchLike = (el) => {
    if (!el || el === document.body || el === document.documentElement) return false;
    const className = (el.className || "").toString().toLowerCase();
    if (className.includes("swatch")) return true;
    if (el.dataset?.hexInspect) return true;
    const rect = el.getBoundingClientRect();
    const maxSize = 140;
    const minSize = 8;
    return rect.width >= minSize && rect.height >= minSize && rect.width <= maxSize && rect.height <= maxSize;
  };

  const extractHex = (target) => {
    if (!target || !(target instanceof Element)) return null;
    const dataHexEl = target.closest("[data-hex]");
    if (dataHexEl?.dataset?.hex) {
      const fromData = normalizeHex(dataHexEl.dataset.hex);
      if (fromData) return fromData;
    }
    const inputEl = target.closest("input[type='color']");
    if (inputEl?.value) {
      const fromInput = normalizeHex(inputEl.value);
      if (fromInput) return fromInput;
    }
    const text = target.textContent || "";
    const match = text.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/);
    if (match) {
      const fromText = normalizeHex(match[0]);
      if (fromText) return fromText;
    }
    const inspectEl = target.closest("[data-hex-inspect]");
    const swatchEl = inspectEl || target;
    if (swatchEl && isSwatchLike(swatchEl)) {
      const style = window.getComputedStyle(swatchEl);
      const rgb = parseRgbString(style.backgroundColor);
      if (rgb) return rgbToHex(rgb.r, rgb.g, rgb.b);
    }
    return null;
  };

  const uniqueHexes = (list) => {
    const seen = new Set();
    const out = [];
    (list || []).forEach((value) => {
      const hex = normalizeHex(value);
      if (!hex || seen.has(hex)) return;
      seen.add(hex);
      out.push(hex);
    });
    return out;
  };

  const normalizeContextMode = (value) => {
    const raw = String(value || "").trim().toLowerCase();
    if (!raw) return "";
    if (raw.includes("ui")) return "UI";
    if (raw.includes("poster")) return "Poster";
    if (raw.includes("thêu") || raw.includes("theu") || raw.includes("thread")) return "Thêu";
    return "";
  };

  const ensureStyle = () => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .tc-hexinspector-overlay{position:fixed;inset:0;background:rgba(10,10,12,.55);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:3900;}
      .tc-hexinspector-panel{width:min(720px,94vw);max-height:88vh;background:linear-gradient(180deg,#0f172a,#0b1222);color:#f8fafc;border-radius:20px;border:1px solid rgba(148,163,184,.25);box-shadow:0 35px 80px rgba(0,0,0,.45);display:flex;flex-direction:column;overflow:hidden;}
      .tc-hexinspector-header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px;border-bottom:1px solid rgba(148,163,184,.18);}
      .tc-hexinspector-title{font-weight:700;font-size:15px;}
      .tc-hexinspector-sub{font-size:12px;color:rgba(226,232,240,.72);}
      .tc-hexinspector-close{border:none;background:rgba(148,163,184,.14);color:#f8fafc;width:32px;height:32px;border-radius:999px;font-size:18px;cursor:pointer;}
      .tc-hexinspector-body{padding:16px 18px;overflow:auto;display:flex;flex-direction:column;gap:16px;}
      .tc-hexinspector-hero{display:flex;flex-wrap:wrap;gap:14px;align-items:center;}
      .tc-hexinspector-swatch{width:72px;height:72px;border-radius:16px;border:1px solid rgba(148,163,184,.28);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08);}
      .tc-hexinspector-hero-info{display:flex;flex-direction:column;gap:4px;min-width:0;}
      .tc-hexinspector-hex{font-weight:700;font-size:20px;}
      .tc-hexinspector-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;}
      .tc-hexinspector-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:2px;}
      .tc-hexinspector-chip{padding:3px 8px;border-radius:999px;border:1px solid rgba(148,163,184,.22);font-size:10px;line-height:1.2;background:rgba(15,23,42,.6);color:#e2e8f0;}
      .tc-hexinspector-actions{display:flex;flex-wrap:wrap;gap:8px;margin-left:auto;}
      .tc-hexinspector-btn{border-radius:12px;border:1px solid rgba(148,163,184,.22);background:rgba(15,23,42,.8);color:#f8fafc;padding:8px 12px;font-size:12px;font-weight:600;cursor:pointer;}
      .tc-hexinspector-btn.primary{background:linear-gradient(135deg,#38bdf8,#6366f1);border-color:transparent;}
      .tc-hexinspector-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;}
      .tc-hexinspector-metric{padding:10px 12px;border-radius:12px;border:1px solid rgba(148,163,184,.18);background:rgba(15,23,42,.5);display:flex;flex-direction:column;gap:4px;font-size:12px;}
      .tc-hexinspector-metric span{color:rgba(226,232,240,.7);}
      .tc-hexinspector-section{display:flex;flex-direction:column;gap:10px;}
      .tc-hexinspector-section-title{font-size:13px;font-weight:600;}
      .tc-hexinspector-swatches{display:flex;flex-wrap:wrap;gap:6px;}
      .tc-hexinspector-swatch-btn{width:36px;height:36px;border-radius:10px;border:1px solid rgba(148,163,184,.28);cursor:pointer;padding:0;}
      .tc-hexinspector-harmony{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;}
      .tc-hexinspector-harmony-group{padding:10px;border-radius:12px;border:1px solid rgba(148,163,184,.18);background:rgba(15,23,42,.45);display:flex;flex-direction:column;gap:8px;}
      .tc-hexinspector-list{display:flex;flex-direction:column;gap:8px;}
      .tc-hexinspector-nearest{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;border:1px solid rgba(148,163,184,.16);background:rgba(15,23,42,.4);cursor:pointer;text-align:left;}
      .tc-hexinspector-nearest .swatch{width:36px;height:36px;border-radius:10px;border:1px solid rgba(148,163,184,.24);}
      .tc-hexinspector-nearest .meta{display:flex;flex-direction:column;gap:2px;font-size:12px;}
      .tc-hexinspector-nearest .meta strong{font-size:12px;font-weight:600;}
      .tc-hexinspector-copy{position:relative;display:inline-flex;align-items:center;}
      .tc-hexinspector-menu{position:absolute;right:0;top:calc(100% + 6px);min-width:190px;background:rgba(15,23,42,.98);border:1px solid rgba(148,163,184,.22);border-radius:12px;box-shadow:0 14px 32px rgba(0,0,0,.4);display:flex;flex-direction:column;gap:2px;padding:6px;z-index:12;}
      .tc-hexinspector-menu.is-flyout{position:fixed;right:auto;top:auto;z-index:4005;}
      .tc-hexinspector-menu button{border:none;background:transparent;color:#e2e8f0;text-align:left;padding:6px 8px;border-radius:8px;font-size:12px;cursor:pointer;}
      .tc-hexinspector-menu button:hover{background:rgba(148,163,184,.18);}
      .tc-hexinspector-details{padding:10px 12px;border-radius:14px;border:1px solid rgba(148,163,184,.18);background:rgba(15,23,42,.4);display:flex;flex-direction:column;gap:10px;}
      .tc-hexinspector-summary{list-style:none;cursor:pointer;font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px;color:#f8fafc;}
      .tc-hexinspector-summary::-webkit-details-marker{display:none;}
      .tc-hexinspector-contrast{padding:10px 12px;border-radius:14px;border:1px solid rgba(148,163,184,.18);background:rgba(15,23,42,.45);display:flex;flex-direction:column;gap:8px;}
      .tc-hexinspector-contrast-row{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:12px;}
      .tc-hexinspector-badges{display:flex;flex-wrap:wrap;gap:4px;}
      .tc-hexinspector-badge{padding:2px 6px;border-radius:999px;border:1px solid rgba(148,163,184,.25);font-size:10px;line-height:1.2;}
      .tc-hexinspector-badge.pass{border-color:rgba(34,197,94,.5);color:#bbf7d0;background:rgba(34,197,94,.12);}
      .tc-hexinspector-badge.fail{border-color:rgba(248,113,113,.45);color:#fecaca;background:rgba(248,113,113,.12);}
      @media (max-width: 640px){
        .tc-hexinspector-overlay{align-items:flex-end;}
        .tc-hexinspector-panel{width:100%;border-radius:18px 18px 0 0;max-height:90vh;}
        .tc-hexinspector-hero{flex-direction:column;align-items:flex-start;}
        .tc-hexinspector-actions{width:100%;justify-content:flex-start;}
      }
    `;
    document.head.appendChild(style);
  };

  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.className = "tc-hexinspector-overlay";
  overlay.hidden = true;
  overlay.innerHTML = `
    <div id="${PANEL_ID}" class="tc-hexinspector-panel" role="dialog" aria-modal="true" aria-label="Bảng thông tin HEX">
      <div class="tc-hexinspector-header">
        <div>
          <div class="tc-hexinspector-title">Bảng thông tin HEX</div>
          <div class="tc-hexinspector-sub" data-hexinspector-note>Chuột phải hoặc giữ chạm để mở.</div>
        </div>
        <button class="tc-hexinspector-close" type="button" data-action="close" aria-label="Đóng">×</button>
      </div>
      <div class="tc-hexinspector-body">
        <div class="tc-hexinspector-hero">
          <div class="tc-hexinspector-swatch" data-hexinspector-swatch></div>
          <div class="tc-hexinspector-hero-info">
            <div class="tc-hexinspector-hex" data-hexinspector-hex>#000000</div>
            <div class="tc-hexinspector-sub tc-hexinspector-line" data-hexinspector-name>Tên gợi ý: --</div>
            <div class="tc-hexinspector-sub tc-hexinspector-line" data-hexinspector-hint>Gần nhất: --</div>
            <div class="tc-hexinspector-chips" data-hexinspector-chips></div>
          </div>
          <div class="tc-hexinspector-actions">
            <div class="tc-hexinspector-copy" data-hexinspector-copy>
              <button class="tc-hexinspector-btn" type="button" data-action="copy-toggle" aria-haspopup="menu" aria-expanded="false">Sao chép</button>
              <div class="tc-hexinspector-menu" data-hexinspector-copy-menu hidden>
                <button type="button" data-copy="hex">HEX</button>
                <button type="button" data-copy="rgb">RGB</button>
                <button type="button" data-copy="hsl">HSL</button>
                <button type="button" data-copy="hsv">HSV</button>
                <button type="button" data-copy="lab">Lab</button>
                <button type="button" data-copy="css">CSS token</button>
                <button type="button" data-copy="tailwind">Tailwind</button>
                <button type="button" data-copy="full">Khối đầy đủ</button>
              </div>
            </div>
            <button class="tc-hexinspector-btn primary" type="button" data-action="apply">Áp dụng</button>
          </div>
        </div>
        <div class="tc-hexinspector-contrast" data-hexinspector-contrast>
          <div class="tc-hexinspector-section-title">Độ tương phản chữ</div>
          <div class="tc-hexinspector-contrast-row">
            <span class="tc-hexinspector-sub">Nền trắng</span>
            <strong data-hexinspector-contrast-white>--</strong>
            <div class="tc-hexinspector-badges" data-hexinspector-contrast-white-badges></div>
          </div>
          <div class="tc-hexinspector-contrast-row">
            <span class="tc-hexinspector-sub">Nền đen</span>
            <strong data-hexinspector-contrast-black>--</strong>
            <div class="tc-hexinspector-badges" data-hexinspector-contrast-black-badges></div>
          </div>
        </div>
        <div class="tc-hexinspector-section">
          <div class="tc-hexinspector-section-title">Dải sắc độ</div>
          <div class="tc-hexinspector-swatches" data-hexinspector-tone></div>
        </div>
        <div class="tc-hexinspector-section">
          <div class="tc-hexinspector-section-title">Hòa sắc gợi ý</div>
          <div class="tc-hexinspector-harmony">
            <div class="tc-hexinspector-harmony-group">
              <div class="tc-hexinspector-sub">Tương tự</div>
              <div class="tc-hexinspector-swatches" data-hexinspector-analogous></div>
            </div>
            <div class="tc-hexinspector-harmony-group">
              <div class="tc-hexinspector-sub">Bổ túc</div>
              <div class="tc-hexinspector-swatches" data-hexinspector-complementary></div>
            </div>
            <div class="tc-hexinspector-harmony-group">
              <div class="tc-hexinspector-sub">Tam giác</div>
              <div class="tc-hexinspector-swatches" data-hexinspector-triadic></div>
            </div>
          </div>
        </div>
        <div class="tc-hexinspector-section">
          <div class="tc-hexinspector-section-title">Gợi ý gần nhất (ΔE)</div>
          <div class="tc-hexinspector-sub" data-hexinspector-nearest-status>Đang tải dữ liệu...</div>
          <div class="tc-hexinspector-list" data-hexinspector-nearest></div>
        </div>
        <details class="tc-hexinspector-details" data-hexinspector-details>
          <summary class="tc-hexinspector-summary">Chuyển đổi chi tiết</summary>
          <div class="tc-hexinspector-grid">
            <div class="tc-hexinspector-metric"><span>RGB</span><strong data-hexinspector-rgb>rgb(0,0,0)</strong></div>
            <div class="tc-hexinspector-metric"><span>HSL</span><strong data-hexinspector-hsl>HSL</strong></div>
            <div class="tc-hexinspector-metric"><span>HSV</span><strong data-hexinspector-hsv>HSV</strong></div>
            <div class="tc-hexinspector-metric"><span>Lab</span><strong data-hexinspector-lab>Lab</strong></div>
            <div class="tc-hexinspector-metric"><span>CMYK</span><strong data-hexinspector-cmyk>CMYK</strong></div>
          </div>
        </details>
      </div>
    </div>
  `;

  const panel = overlay.querySelector(`#${PANEL_ID}`);
  const mainSwatch = overlay.querySelector("[data-hexinspector-swatch]");
  const hexLabel = overlay.querySelector("[data-hexinspector-hex]");
  const nameLabel = overlay.querySelector("[data-hexinspector-name]");
  const hintLabel = overlay.querySelector("[data-hexinspector-hint]");
  const chipsWrap = overlay.querySelector("[data-hexinspector-chips]");
  const copyWrap = overlay.querySelector("[data-hexinspector-copy]");
  const copyToggle = overlay.querySelector("[data-action='copy-toggle']");
  const copyMenu = overlay.querySelector("[data-hexinspector-copy-menu]");
  const rgbLabel = overlay.querySelector("[data-hexinspector-rgb]");
  const hslLabel = overlay.querySelector("[data-hexinspector-hsl]");
  const hsvLabel = overlay.querySelector("[data-hexinspector-hsv]");
  const labLabel = overlay.querySelector("[data-hexinspector-lab]");
  const cmykLabel = overlay.querySelector("[data-hexinspector-cmyk]");
  const contrastWhiteLabel = overlay.querySelector("[data-hexinspector-contrast-white]");
  const contrastBlackLabel = overlay.querySelector("[data-hexinspector-contrast-black]");
  const contrastWhiteBadges = overlay.querySelector("[data-hexinspector-contrast-white-badges]");
  const contrastBlackBadges = overlay.querySelector("[data-hexinspector-contrast-black-badges]");
  const toneWrap = overlay.querySelector("[data-hexinspector-tone]");
  const analogousWrap = overlay.querySelector("[data-hexinspector-analogous]");
  const complementaryWrap = overlay.querySelector("[data-hexinspector-complementary]");
  const triadicWrap = overlay.querySelector("[data-hexinspector-triadic]");
  const nearestWrap = overlay.querySelector("[data-hexinspector-nearest]");
  const nearestStatus = overlay.querySelector("[data-hexinspector-nearest-status]");

  let currentHex = null;
  let currentMetrics = null;
  let currentContextMode = "";
  let lastNearestLine = "Gần nhất: Chưa có dữ liệu để đối chiếu";
  let threadsPromise = null;
  let longPressTimer = null;
  let suppressClickUntil = 0;
  let swatchMenu = null;
  let swatchLongPressTimer = null;
  let suppressSwatchClickUntil = 0;

  const readThreadCache = () => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== CACHE_VERSION || !Array.isArray(parsed.threads)) return null;
      return parsed.threads;
    } catch (_err) {
      return null;
    }
  };

  const saveThreadCache = (threads) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        version: CACHE_VERSION,
        savedAt: new Date().toISOString(),
        threads
      }));
    } catch (_err) {}
  };

  const loadThreads = async () => {
    if (threadsPromise) return threadsPromise;
    threadsPromise = (async () => {
      const cached = readThreadCache();
      if (cached) return cached;
      try {
        const url = new URL("../threads.json", import.meta.url);
        const res = await fetch(url);
        const data = await res.json();
        const threads = Array.isArray(data) ? data.map((item) => {
          const lab = Array.isArray(item.lab) && item.lab.length >= 3
            ? { l: Number(item.lab[0]), a: Number(item.lab[1]), b: Number(item.lab[2]) }
            : null;
          return {
            brand: item.brand || "",
            code: item.code || "",
            name: item.name || "",
            hex: normalizeHex(item.hex) || "",
            lab: lab && Number.isFinite(lab.l) && Number.isFinite(lab.a) && Number.isFinite(lab.b) ? lab : null
          };
        }).filter((item) => item.hex) : [];
        saveThreadCache(threads);
        return threads;
      } catch (_err) {
        return [];
      }
    })();
    return threadsPromise;
  };

  const findNearestThreads = async (hex, limit = 5) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return [];
    const lab = rgbToLab(rgb.r, rgb.g, rgb.b);
    const threads = await loadThreads();
    if (!threads.length) return [];
    const best = [];
    threads.forEach((item) => {
      const rgbItem = item.hex ? hexToRgb(item.hex) : null;
      const itemLab = item.lab || (rgbItem ? rgbToLab(rgbItem.r, rgbItem.g, rgbItem.b) : null);
      if (!itemLab) return;
      const delta = deltaE76(lab, itemLab);
      const payload = { ...item, delta };
      if (best.length < limit) {
        best.push(payload);
        best.sort((a, b) => a.delta - b.delta);
      } else if (delta < best[best.length - 1].delta) {
        best[best.length - 1] = payload;
        best.sort((a, b) => a.delta - b.delta);
      }
    });
    return best;
  };

  const clearChildren = (el) => {
    if (!el) return;
    while (el.firstChild) el.removeChild(el.firstChild);
  };

  const createSwatchButton = (hex) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tc-hexinspector-swatch-btn";
    btn.style.background = hex;
    btn.dataset.hex = hex;
    btn.dataset.hexinspectorSwatch = "1";
    btn.setAttribute("aria-label", hex);
    return btn;
  };

  const renderSwatches = (wrap, hexes) => {
    if (!wrap) return;
    clearChildren(wrap);
    hexes.forEach((hex) => {
      wrap.appendChild(createSwatchButton(hex));
    });
  };

  const renderChips = (wrap, chips) => {
    if (!wrap) return;
    clearChildren(wrap);
    (chips || []).slice(0, 2).forEach((label) => {
      const chip = document.createElement("span");
      chip.className = "tc-hexinspector-chip";
      chip.textContent = label;
      wrap.appendChild(chip);
    });
  };

  const renderNearest = (items) => {
    clearChildren(nearestWrap);
    if (!items.length) return;
    items.forEach((item) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "tc-hexinspector-nearest";
      row.dataset.hex = item.hex;

      const swatch = document.createElement("span");
      swatch.className = "swatch";
      swatch.style.background = item.hex;

      const meta = document.createElement("span");
      meta.className = "meta";

      const title = document.createElement("strong");
      title.textContent = `${item.brand} ${item.code}`.trim();
      const name = document.createElement("span");
      name.textContent = item.name || "Không tên";
      const delta = document.createElement("span");
      delta.textContent = `ΔE ${item.delta.toFixed(2)}`;

      meta.appendChild(title);
      meta.appendChild(name);
      meta.appendChild(delta);

      row.appendChild(swatch);
      row.appendChild(meta);
      nearestWrap.appendChild(row);
    });
  };

  const setCopyMenuOpen = (open) => {
    if (!copyMenu || !copyToggle) return;
    copyMenu.hidden = !open;
    copyToggle.setAttribute("aria-expanded", open ? "true" : "false");
  };

  const renderContrastBadges = (target, ratio) => {
    if (!target) return;
    clearChildren(target);
    const items = [
      { label: "AA thường", pass: ratio >= 4.5 },
      { label: "AA lớn", pass: ratio >= 3 },
      { label: "AAA thường", pass: ratio >= 7 },
      { label: "AAA lớn", pass: ratio >= 4.5 }
    ];
    items.forEach((item) => {
      const badge = document.createElement("span");
      badge.className = `tc-hexinspector-badge ${item.pass ? "pass" : "fail"}`;
      badge.textContent = item.label;
      target.appendChild(badge);
    });
  };

  const getMetrics = () => {
    if (currentMetrics && currentMetrics.hex === currentHex) return currentMetrics;
    if (!currentHex) return null;
    const rgb = hexToRgb(currentHex);
    if (!rgb) return null;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    const lab = rgbToLab(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    return { hex: currentHex, rgb, hsl, hsv, lab, cmyk };
  };

  const buildCopyPayload = (type) => {
    const metrics = getMetrics();
    if (!metrics) return "";
    const { hex, rgb, hsl, hsv, lab } = metrics;
    const rgbText = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    const hslText = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    const hsvText = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
    const labText = `${lab.l}, ${lab.a}, ${lab.b}`;
    switch (type) {
      case "hex":
        return hex;
      case "rgb":
        return rgbText;
      case "hsl":
        return hslText;
      case "hsv":
        return hsvText;
      case "lab":
        return labText;
      case "css":
        return `--sc-mau: ${hex};`;
      case "tailwind":
        return `bg-[${hex}] text-[${hex}] border-[${hex}]`;
      case "full":
        return [
          `HEX: ${hex}`,
          `RGB: ${rgbText}`,
          `HSL: ${hslText}`,
          `HSV: ${hsvText}`,
          `Lab: ${labText}`,
          lastNearestLine || "Gần nhất: Chưa có dữ liệu để đối chiếu"
        ].join("\n");
      default:
        return hex;
    }
  };

  const appendHexToBuffer = (hex) => {
    const normalized = normalizeHex(hex);
    if (!normalized) return;
    const contextHexes = window.tcWorkbench?.getContext?.().hexes;
    const base = Array.isArray(contextHexes) && contextHexes.length ? contextHexes : (currentHex ? [currentHex] : []);
    const next = uniqueHexes([...base, normalized]).slice(0, 12);
    window.dispatchEvent(new CustomEvent("tc:hex-apply", { detail: { hexes: next, mode: "append" } }));
    if (window.tcWorkbench?.ensureBufferFromHexes && window.tcWorkbench?.appendBufferToUrl) {
      const bufferId = window.tcWorkbench.ensureBufferFromHexes(next, { source: "hex-inspector" });
      if (bufferId) {
        const nextUrl = window.tcWorkbench.appendBufferToUrl(window.location.href, bufferId);
        if (nextUrl) window.history.replaceState(null, "", nextUrl);
      }
    }
  };

  const getBasePath = () => {
    const path = window.location.pathname || "";
    return path.includes("/worlds/") || path.includes("/spaces/") ? "../" : "./";
  };

  const buildBufferUrl = (path, hexes, fallbackKey) => {
    const cleaned = uniqueHexes(hexes);
    const baseUrl = new URL(path, window.location.href).toString();
    if (window.tcWorkbench?.ensureBufferFromHexes && window.tcWorkbench?.appendBufferToUrl) {
      const bufferId = window.tcWorkbench.ensureBufferFromHexes(cleaned, { source: "hex-inspector" });
      if (bufferId) {
        return window.tcWorkbench.appendBufferToUrl(baseUrl, bufferId);
      }
    }
    if (!cleaned.length) return baseUrl;
    return `${baseUrl}${fallbackKey}${cleaned.join(",")}`;
  };

  const ensureSwatchMenu = () => {
    if (swatchMenu) return swatchMenu;
    swatchMenu = document.createElement("div");
    swatchMenu.className = "tc-hexinspector-menu is-flyout";
    swatchMenu.hidden = true;
    swatchMenu.innerHTML = `
      <button type="button" data-swatch-action="palette">Tạo palette nhanh</button>
      <button type="button" data-swatch-action="gradient">Mở W2 Dải chuyển</button>
    `;
    swatchMenu.addEventListener("click", (event) => {
      const action = event.target.closest("[data-swatch-action]")?.dataset.swatchAction;
      if (!action) return;
      const hex = swatchMenu?.dataset?.hex;
      if (!hex) return;
      const base = currentHex ? [currentHex, hex] : [hex];
      const basePath = getBasePath();
      const targetPath = action === "palette" ? `${basePath}worlds/palette.html` : `${basePath}worlds/gradient.html`;
      const fallbackKey = action === "palette" ? "#p=" : "#g=";
      const url = buildBufferUrl(targetPath, base, fallbackKey);
      swatchMenu.hidden = true;
      window.location.href = url;
    });
    document.body.appendChild(swatchMenu);
    return swatchMenu;
  };

  const closeSwatchMenu = () => {
    if (!swatchMenu) return;
    swatchMenu.hidden = true;
    swatchMenu.removeAttribute("data-hex");
  };

  const openSwatchMenu = (hex, x, y) => {
    const menu = ensureSwatchMenu();
    menu.dataset.hex = hex;
    menu.hidden = false;
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
    const rect = menu.getBoundingClientRect();
    const nextX = Math.min(x, window.innerWidth - rect.width - 8);
    const nextY = Math.min(y, window.innerHeight - rect.height - 8);
    menu.style.left = `${Math.max(8, nextX)}px`;
    menu.style.top = `${Math.max(8, nextY)}px`;
  };

  const updateInspector = async (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    const lab = rgbToLab(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

    currentMetrics = { hex, rgb, hsl, hsv, lab, cmyk };

    if (mainSwatch) mainSwatch.style.background = hex;
    if (hexLabel) hexLabel.textContent = hex;
    if (rgbLabel) rgbLabel.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    if (hslLabel) hslLabel.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    if (hsvLabel) hsvLabel.textContent = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
    if (labLabel) labLabel.textContent = `Lab ${lab.l}, ${lab.a}, ${lab.b}`;
    if (cmykLabel) cmykLabel.textContent = `C${cmyk.c}% M${cmyk.m}% Y${cmyk.y}% K${cmyk.k}%`;
    const headerModel = buildPremiumHeaderModel({ hex, rgb, hsl, hsv, lab, nearest: null });
    if (nameLabel) nameLabel.textContent = headerModel.toneLine;
    lastNearestLine = headerModel.nearestLine;
    if (hintLabel) hintLabel.textContent = lastNearestLine;
    renderChips(chipsWrap, computeContextTags({ hex, rgb, hsl, hsv, lab, nearest: null, mode: currentContextMode }));

    const ratioWhite = contrastRatio(rgb, { r: 255, g: 255, b: 255 });
    const ratioBlack = contrastRatio(rgb, { r: 0, g: 0, b: 0 });
    if (contrastWhiteLabel) contrastWhiteLabel.textContent = `${ratioWhite.toFixed(2)}:1`;
    if (contrastBlackLabel) contrastBlackLabel.textContent = `${ratioBlack.toFixed(2)}:1`;
    renderContrastBadges(contrastWhiteBadges, ratioWhite);
    renderContrastBadges(contrastBlackBadges, ratioBlack);

    const darkSteps = [0.7, 0.55, 0.4, 0.25, 0.1].map((t) => mixHex(hex, "#000000", t));
    const lightSteps = [0.1, 0.25, 0.4, 0.55, 0.7].map((t) => mixHex(hex, "#FFFFFF", t));
    renderSwatches(toneWrap, [...darkSteps, ...lightSteps]);

    const analogous = [-40, -20, 20, 40].map((d) => shiftHue(hex, d));
    renderSwatches(analogousWrap, analogous);
    renderSwatches(complementaryWrap, [shiftHue(hex, 180)]);
    renderSwatches(triadicWrap, [shiftHue(hex, 120), shiftHue(hex, -120)]);

    if (nearestStatus) nearestStatus.textContent = "Đang tìm gợi ý gần nhất...";
    const activeHex = hex;
    const nearest = await findNearestThreads(hex, 5);
    if (currentHex !== activeHex) return;
    if (!nearest.length) {
      if (nearestStatus) nearestStatus.textContent = "Chưa có dữ liệu gợi ý.";
      clearChildren(nearestWrap);
      const fallbackModel = buildPremiumHeaderModel({ hex, rgb, hsl, hsv, lab, nearest: null });
      lastNearestLine = fallbackModel.nearestLine;
      if (hintLabel) hintLabel.textContent = lastNearestLine;
      renderChips(chipsWrap, computeContextTags({ hex, rgb, hsl, hsv, lab, nearest: null, mode: currentContextMode }));
      return;
    }
    if (nearestStatus) nearestStatus.textContent = "";
    renderNearest(nearest);
    const top = nearest[0];
    const nearestModel = buildPremiumHeaderModel({ hex, rgb, hsl, hsv, lab, nearest: top });
    if (nameLabel) nameLabel.textContent = nearestModel.toneLine;
    lastNearestLine = nearestModel.nearestLine;
    if (hintLabel) hintLabel.textContent = lastNearestLine;
    renderChips(chipsWrap, computeContextTags({ hex, rgb, hsl, hsv, lab, nearest: top, mode: currentContextMode }));
  };

  const open = (hex, _meta) => {
    const normalized = normalizeHex(hex);
    if (!normalized) return;
    ensureStyle();
    if (!overlay.isConnected) document.body.appendChild(overlay);
    currentHex = normalized;
    currentContextMode = normalizeContextMode(_meta?.mode || _meta?.context || _meta?.world || _meta?.source || "");
    setCopyMenuOpen(false);
    closeSwatchMenu();
    overlay.hidden = false;
    updateInspector(normalized);
  };

  const close = () => {
    overlay.hidden = true;
    setCopyMenuOpen(false);
    closeSwatchMenu();
  };

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });

  overlay.addEventListener("click", (event) => {
    if (!panel.contains(event.target)) return;

    if (copyMenu && !copyMenu.hidden && !event.target.closest("[data-hexinspector-copy]")) {
      setCopyMenuOpen(false);
    }
    if (swatchMenu && !swatchMenu.hidden && !event.target.closest(".tc-hexinspector-menu")) {
      closeSwatchMenu();
    }

    const copyItem = event.target.closest("[data-copy]");
    if (copyItem) {
      const payload = buildCopyPayload(copyItem.dataset.copy);
      if (payload) copyText(payload);
      setCopyMenuOpen(false);
      return;
    }

    const btn = event.target.closest("[data-action]");
    if (btn) {
      const action = btn.dataset.action;
      if (action === "close") {
        close();
        return;
      }
      if (action === "copy-toggle") {
        setCopyMenuOpen(copyMenu?.hidden ?? true);
        return;
      }
      if (!currentHex) return;
      if (action === "apply") {
        window.dispatchEvent(new CustomEvent("tc:hex-apply", { detail: { hexes: [currentHex], mode: "replace" } }));
      }
      return;
    }

    const swatch = event.target.closest("[data-hexinspector-swatch]");
    if (swatch) {
      if (Date.now() < suppressSwatchClickUntil) return;
      const hex = normalizeHex(swatch.dataset.hex);
      if (hex) appendHexToBuffer(hex);
      return;
    }

    const nearestRow = event.target.closest(".tc-hexinspector-nearest");
    if (nearestRow) {
      const hex = normalizeHex(nearestRow.dataset.hex);
      if (hex) open(hex);
    }
  });

  panel.addEventListener("contextmenu", (event) => {
    const swatch = event.target.closest("[data-hexinspector-swatch]");
    if (!swatch) return;
    const hex = normalizeHex(swatch.dataset.hex);
    if (!hex) return;
    event.preventDefault();
    event.stopPropagation();
    suppressSwatchClickUntil = Date.now() + 400;
    openSwatchMenu(hex, event.clientX, event.clientY);
  });

  panel.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse") return;
    const swatch = event.target.closest("[data-hexinspector-swatch]");
    if (!swatch) return;
    const hex = normalizeHex(swatch.dataset.hex);
    if (!hex) return;
    if (swatchLongPressTimer) clearTimeout(swatchLongPressTimer);
    swatchLongPressTimer = setTimeout(() => {
      suppressSwatchClickUntil = Date.now() + 400;
      openSwatchMenu(hex, event.clientX, event.clientY);
    }, LONG_PRESS_MS);
  });

  panel.addEventListener("pointerup", () => {
    if (swatchLongPressTimer) {
      clearTimeout(swatchLongPressTimer);
      swatchLongPressTimer = null;
    }
  });

  panel.addEventListener("pointercancel", () => {
    if (swatchLongPressTimer) {
      clearTimeout(swatchLongPressTimer);
      swatchLongPressTimer = null;
    }
  });

  const copyText = (text) => {
    if (!text) return;
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (_err) {}
      ta.remove();
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(fallback);
    } else {
      fallback();
    }
  };

  const isInsideInspector = (target) => {
    if (overlay.hidden) return false;
    if (panel && panel.contains(target)) return true;
    if (swatchMenu && !swatchMenu.hidden && swatchMenu.contains(target)) return true;
    return false;
  };

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || overlay.hidden) return;
    if (copyMenu && !copyMenu.hidden) {
      setCopyMenuOpen(false);
      return;
    }
    if (swatchMenu && !swatchMenu.hidden) {
      closeSwatchMenu();
      return;
    }
    close();
  });

  document.addEventListener("contextmenu", (event) => {
    if (isInsideInspector(event.target)) return;
    const hex = extractHex(event.target);
    if (!hex) return;
    event.preventDefault();
    open(hex);
  });

  document.addEventListener("click", (event) => {
    if (copyMenu && !copyMenu.hidden && !event.target.closest("[data-hexinspector-copy]")) {
      setCopyMenuOpen(false);
    }
    if (swatchMenu && !swatchMenu.hidden && !event.target.closest(".tc-hexinspector-menu")) {
      closeSwatchMenu();
    }
    if (Date.now() < suppressClickUntil) return;
    if (isInsideInspector(event.target)) return;
    const trigger = event.target.closest('[data-hex-inspect="click"]');
    if (!trigger) return;
    const hex = extractHex(trigger);
    if (!hex) return;
    event.preventDefault();
    open(hex);
  });

  document.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse") return;
    if (isInsideInspector(event.target)) return;
    const hex = extractHex(event.target);
    if (!hex) return;
    if (longPressTimer) clearTimeout(longPressTimer);
    longPressTimer = setTimeout(() => {
      suppressClickUntil = Date.now() + 400;
      open(hex);
    }, LONG_PRESS_MS);
  });

  document.addEventListener("pointerup", () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  });

  document.addEventListener("pointercancel", () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  });

  window.addEventListener("tc:hex-inspect", (event) => {
    const hex = event?.detail?.hex;
    if (!hex) return;
    open(hex, event?.detail?.meta);
  });

  window.tcHexInspector = { open, close };
}
