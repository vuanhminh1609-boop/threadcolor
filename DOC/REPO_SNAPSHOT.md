# REPO SNAPSHOT

- Th&#7901;i &#273;i&#7875;m t&#7841;o: 2025-12-31T05:14:28.320Z
- Commit hash: e64b8e4fed69d5cfe60957bdf02039fd154a0405
- Quy t&#7855;c: ch&#7881; dump file text, b&#7887; qua binary; file &gt; 200KB ch&#7881; l&#7845;y 200 d&#242;ng &#273;&#7847;u/cu&#7889;i.
- Gi&#7899;i h&#7841;n snapshot: ~3145728 bytes.

## C&#226;y th&#432; m&#7909;c
```text
- .github
  - CODEOWNERS
  - ISSUE_TEMPLATE
    - bug_report.yml
    - feature_request.yml
  - pull_request_template.md
- CONTRIBUTING.md
- DOC
  - 00_TOAN_CANH.md
  - 01_WORKFLOW.md
  - 02_QUAN_TRI_GITHUB.md
- README.md
- SECURITY.md
- account.html
- assets
  - Logo SpaceColors.png
  - spacecolors-logo-topbar.png
  - spacecolors-mark-512.png
  - spacecolors-mark-64.png
- auth.js
- crowd.js
- data
  - raw_tch
    - Ackerman Isacord 30.tch
  - threads.generated.json
- data_normalize.js
- firestore.rules
- i18n.js
- index.html
- library.js
- script.js
- stock.js
- style.css
- themes.css
- threads.json
- tools
  - bootstrap_admin.mjs
  - import_tch.mjs
  - normalize_threads.mjs
  - validate_threads.mjs
- workers
  - thread_search.worker.js
- worlds
  - threadcolor.html
  - threadvault.html
```

## T&#7893;ng s&#7889; file theo ph&#7847;n m&#7903; r&#7897;ng
```text
(noext): 1
.css: 2
.html: 4
.js: 8
.json: 2
.md: 7
.mjs: 4
.png: 4
.rules: 1
.tch: 1
.yml: 2
```

## FILE: index.html (size: 52854)
```html
<!DOCTYPE html>
<html lang="vi" data-world="origami">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>8Portal v4</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --bg: #f6f1e9;
      --text: #201a14;
      --muted: #6b5d4b;
      --glass: rgba(255, 255, 255, 0.72);
      --stroke: rgba(32, 26, 20, 0.08);
      --a1: #c27b4b;
      --a2: #d59e6d;
      --a3: #8c6d54;
    }
    html[data-world="nebula"] {
      --bg:
        radial-gradient(circle, rgba(255,255,255,.26) 0 1px, transparent 1.2px) 0 0/ 160px 160px repeat,
        radial-gradient(circle, rgba(255,255,255,.14) 0 1px, transparent 1.2px) 60px 90px/ 260px 260px repeat,
        repeating-linear-gradient(135deg, rgba(110,231,255,.045) 0 1px, transparent 1px 10px) 0 0/ 420px 420px repeat,
        radial-gradient(1200px circle at 18% 12%, rgba(110,231,255,.26), transparent 60%) 50% 50%/ cover no-repeat,
        radial-gradient(1100px circle at 86% 22%, rgba(139,92,246,.26), transparent 62%) 50% 50%/ cover no-repeat,
        radial-gradient(900px circle at 62% 88%, rgba(244,114,182,.20), transparent 62%) 50% 50%/ cover no-repeat,
        conic-gradient(from 220deg at 60% 35%, rgba(139,92,246,.18), transparent 30%, rgba(110,231,255,.14), transparent 62%, rgba(244,114,182,.16)) 50% 50%/ cover no-repeat,
        radial-gradient(1600px circle at 50% 55%, rgba(0,0,0,0) 0 55%, rgba(0,0,0,.55) 100%) 50% 50%/ cover no-repeat,
        #040512;
      --text: #eef2ff;
      --muted: #b8c2ff;
      --glass: rgba(12, 16, 34, 0.72);
      --stroke: rgba(255, 255, 255, 0.14);
      --a1: #6ee7ff;
      --a2: #8b5cf6;
      --a3: #f472b6;
    }
    html[data-world="ocean"] {
      --bg:
        radial-gradient(circle, rgba(255,255,255,.22) 0 2px, transparent 2.6px) 0 0/ 220px 220px repeat,
        repeating-linear-gradient(160deg, rgba(255,255,255,.10) 0 2px, transparent 2px 14px) 0 0/ 520px 520px repeat,
        radial-gradient(1100px circle at 18% 14%, rgba(31,182,255,.24), transparent 62%) 50% 50%/ cover no-repeat,
        radial-gradient(1000px circle at 86% 28%, rgba(14,165,168,.20), transparent 64%) 50% 50%/ cover no-repeat,
        radial-gradient(900px circle at 52% 90%, rgba(77,212,255,.18), transparent 64%) 50% 50%/ cover no-repeat,
        linear-gradient(180deg, rgba(255,255,255,.68), rgba(255,255,255,0) 45%) 50% 50%/ cover no-repeat,
        conic-gradient(from 200deg at 50% 10%, rgba(77,212,255,.22), transparent 35%, rgba(31,182,255,.14), transparent 70%, rgba(14,165,168,.14)) 50% 50%/ cover no-repeat,
        radial-gradient(1600px circle at 50% 0%, rgba(255,255,255,.55), transparent 55%) 50% 50%/ cover no-repeat,
        #dff6ff;
      --text: #062a3a;
      --muted: #3f6b7f;
      --glass: rgba(255, 255, 255, 0.76);
      --stroke: rgba(6, 42, 58, 0.12);
      --a1: #1fb6ff;
      --a2: #0ea5a8;
      --a3: #4dd4ff;
    }
    html[data-world="ink"] {
      --bg:
        repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 1px, transparent 1px 6px) 0 0/ 100% 100% repeat,
        repeating-linear-gradient(90deg, rgba(255,255,255,.018) 0 1px, transparent 1px 10px) 0 0/ 100% 100% repeat,
        radial-gradient(1200px circle at 20% 20%, rgba(226,232,240,.10), transparent 62%) 50% 50%/ cover no-repeat,
        radial-gradient(1000px circle at 82% 26%, rgba(148,163,184,.10), transparent 66%) 50% 50%/ cover no-repeat,
        radial-gradient(850px circle at 52% 92%, rgba(100,116,139,.12), transparent 66%) 50% 50%/ cover no-repeat,
        radial-gradient(1400px circle at 50% 55%, rgba(0,0,0,0) 0 52%, rgba(0,0,0,.62) 100%) 50% 50%/ cover no-repeat,
        linear-gradient(180deg, #0b0d12, #07080c) 50% 50%/ cover no-repeat;
      --text: #f4f6fb;
      --muted: #a6afbd;
      --glass: rgba(16, 18, 24, 0.76);
      --stroke: rgba(255, 255, 255, 0.12);
      --a1: #e2e8f0;
      --a2: #94a3b8;
      --a3: #64748b;
    }
    html[data-world="origami"] {
      --bg:
        repeating-linear-gradient(0deg, rgba(32,26,20,.025) 0 1px, transparent 1px 7px) 0 0/ 100% 100% repeat,
        repeating-linear-gradient(90deg, rgba(32,26,20,.018) 0 1px, transparent 1px 11px) 0 0/ 100% 100% repeat,
        linear-gradient(135deg, rgba(255,255,255,.62), rgba(255,255,255,0) 48%) 50% 50%/ cover no-repeat,
        linear-gradient(315deg, rgba(140,109,84,.10), transparent 55%) 50% 50%/ cover no-repeat,
        radial-gradient(1000px circle at 22% 16%, rgba(194,123,75,.18), transparent 64%) 50% 50%/ cover no-repeat,
        radial-gradient(950px circle at 84% 26%, rgba(213,158,109,.16), transparent 66%) 50% 50%/ cover no-repeat,
        radial-gradient(900px circle at 52% 92%, rgba(140,109,84,.12), transparent 66%) 50% 50%/ cover no-repeat,
        linear-gradient(180deg, #f7f2ea, #f1e6d6) 50% 50%/ cover no-repeat;
      --text: #201a14;
      --muted: #6b5d4b;
      --glass: rgba(255, 255, 255, 0.74);
      --stroke: rgba(32, 26, 20, 0.10);
      --a1: #c27b4b;
      --a2: #d59e6d;
      --a3: #8c6d54;
    }
    html[data-world="arcade"] {
      --bg:
        radial-gradient(circle, rgba(255,255,255,.18) 0 1px, transparent 1.2px) 0 0/ 180px 180px repeat,
        repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 4px) 0 0/ 100% 100% repeat,
        repeating-linear-gradient(90deg, rgba(255,61,205,.05) 0 1px, transparent 1px 18px) 0 0/ 520px 520px repeat,
        radial-gradient(1100px circle at 18% 14%, rgba(255,61,205,.26), transparent 62%) 50% 50%/ cover no-repeat,
        radial-gradient(1050px circle at 86% 18%, rgba(124,58,237,.26), transparent 64%) 50% 50%/ cover no-repeat,
        radial-gradient(950px circle at 52% 92%, rgba(32,227,178,.18), transparent 66%) 50% 50%/ cover no-repeat,
        conic-gradient(from 210deg at 56% 30%, rgba(255,61,205,.18), transparent 28%, rgba(124,58,237,.16), transparent 60%, rgba(32,227,178,.16)) 50% 50%/ cover no-repeat,
        radial-gradient(1600px circle at 50% 55%, rgba(0,0,0,0) 0 54%, rgba(0,0,0,.60) 100%) 50% 50%/ cover no-repeat,
        #05040f;
      --text: #fff7ff;
      --muted: #d8c9f6;
      --glass: rgba(14, 12, 28, 0.80);
      --stroke: rgba(255, 255, 255, 0.16);
      --a1: #ff3dcd;
      --a2: #7c3aed;
      --a3: #20e3b2;
    }
    html[data-world="dunes"] {
      --bg:
        radial-gradient(circle, rgba(255,255,255,.18) 0 2px, transparent 2.6px) 0 0/ 260px 260px repeat,
        repeating-linear-gradient(165deg, rgba(179,116,61,.06) 0 2px, transparent 2px 16px) 0 0/ 680px 680px repeat,
        radial-gradient(1200px circle at 78% 10%, rgba(255,245,215,.75), transparent 60%) 50% 50%/ cover no-repeat,
        radial-gradient(1050px circle at 20% 22%, rgba(211,155,84,.18), transparent 66%) 50% 50%/ cover no-repeat,
        radial-gradient(950px circle at 86% 36%, rgba(227,184,123,.16), transparent 68%) 50% 50%/ cover no-repeat,
        radial-gradient(900px circle at 52% 92%, rgba(179,116,61,.14), transparent 70%) 50% 50%/ cover no-repeat,
        linear-gradient(180deg, #f8f2e3, #f2e4c7) 50% 50%/ cover no-repeat;
      --text: #3a2d1a;
      --muted: #7a644a;
      --glass: rgba(255, 255, 255, 0.74);
      --stroke: rgba(58, 45, 26, 0.12);
      --a1: #d39b54;
      --a2: #e3b87b;
      --a3: #b3743d;
    }
    html[data-world="chrome"] {
      --bg:
        radial-gradient(circle, rgba(255,255,255,.20) 0 2px, transparent 2.6px) 0 0/ 280px 280px repeat,
        repeating-linear-gradient(135deg, rgba(15,23,42,.03) 0 1px, transparent 1px 12px) 0 0/ 720px 720px repeat,
        radial-gradient(1100px circle at 22% 14%, rgba(59,130,246,.14), transparent 66%) 50% 50%/ cover no-repeat,
        radial-gradient(900px circle at 82% 26%, rgba(148,163,184,.16), transparent 68%) 50% 50%/ cover no-repeat,
        linear-gradient(120deg, rgba(255,255,255,.75), rgba(255,255,255,0) 42%) 50% 50%/ cover no-repeat,
        linear-gradient(300deg, rgba(15,23,42,.08), transparent 55%) 50% 50%/ cover no-repeat,
        linear-gradient(180deg, #f6f9ff, #eef3f8) 50% 50%/ cover no-repeat;
      --text: #1c232b;
      --muted: #5f6b79;
      --glass: rgba(255, 255, 255, 0.72);
      --stroke: rgba(28, 35, 43, 0.12);
      --a1: #3b82f6;
      --a2: #94a3b8;
      --a3: #0f172a;
    }
    html[data-world="circuit"] {
      --bg:
        repeating-linear-gradient(0deg, rgba(134,239,172,.06) 0 1px, transparent 1px 18px) 0 0/ 100% 100% repeat,
        repeating-linear-gradient(90deg, rgba(34,197,94,.05) 0 1px, transparent 1px 22px) 0 0/ 100% 100% repeat,
        radial-gradient(circle, rgba(255,255,255,.12) 0 1px, transparent 1.2px) 0 0/ 200px 200px repeat,
        radial-gradient(1100px circle at 20% 14%, rgba(34,197,94,.22), transparent 64%) 50% 50%/ cover no-repeat,
        radial-gradient(1000px circle at 86% 22%, rgba(22,163,74,.20), transparent 66%) 50% 50%/ cover no-repeat,
        radial-gradient(900px circle at 52% 92%, rgba(134,239,172,.16), transparent 68%) 50% 50%/ cover no-repeat,
        conic-gradient(from 220deg at 56% 30%, rgba(34,197,94,.16), transparent 30%, rgba(134,239,172,.12), transparent 62%, rgba(22,163,74,.14)) 50% 50%/ cover no-repeat,
        radial-gradient(1600px circle at 50% 55%, rgba(0,0,0,0) 0 54%, rgba(0,0,0,.58) 100%) 50% 50%/ cover no-repeat,
        #04110a;
      --text: #eafff2;
      --muted: #a6d6bb;
      --glass: rgba(8, 20, 14, 0.76);
      --stroke: rgba(255, 255, 255, 0.12);
      --a1: #22c55e;
      --a2: #16a34a;
      --a3: #86efac;
    }
    body {
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .tc-topbar {
      background: var(--glass);
      border-bottom: 1px solid var(--stroke);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
      position: sticky;
      top: 0;
      z-index: var(--z-topbar, 2000) !important;
      overflow: visible;
    }
    .tc-topbar::after{
      content:"";
      position:absolute; left:0; right:0; bottom:-1px; height:1px;
      background: linear-gradient(90deg, var(--a1), var(--a2), var(--a3));
      opacity: .35;
    }
    #portalMenu,
    #worldMenu{
      z-index: var(--z-topbar-menu, 4000) !important;
    }
    .tc-brand {
      font-weight: 700;
      letter-spacing: -0.01em;
      color: var(--text);
      text-shadow: 0 1px 0 rgba(255,255,255,.15);
    }
    .tc-chip{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
    }
    .tc-chip:hover{ filter: brightness(1.03); }
    .tc-btn{
      border-radius: 0.75rem;
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      font-weight: 650;
      letter-spacing: -0.005em;
      line-height: 1;
      transition: filter .15s ease, transform .05s ease, box-shadow .15s ease;
    }
    .tc-btn:hover{ filter: brightness(1.03); }
    .tc-btn:active{ transform: translateY(1px); }
    .tc-btn:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    .tc-btn-primary{
      background: linear-gradient(135deg, var(--a1), var(--a2));
      color: #fff;
      border: 1px solid rgba(255,255,255,.18);
    }
    .tc-btn-primary:hover{ filter: brightness(1.06); }
    .tc-dot{
      width: 10px; height: 10px; border-radius: 999px;
      background: linear-gradient(135deg, var(--a1), var(--a2), var(--a3));
      box-shadow: 0 0 0 2px rgba(255,255,255,.5);
    }
    .tc-muted{ color: var(--muted); }
    .tc-card{
      background: var(--glass);
      border: 1px solid var(--stroke);
      border-radius: 1rem;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
    }
    .tc-color-input{
      background: var(--glass);
      border: 1px solid var(--stroke);
      border-radius: 0.75rem;
      width: 3rem;
      height: 2.25rem;
      padding: 0.15rem;
    }
    .tc-preview-swatch{
      width: 3rem;
      height: 3rem;
      border-radius: 0.9rem;
      border: 1px solid var(--stroke);
      background: var(--glass);
    }
    .tc-gradient-preview{
      border-radius: 0.9rem;
      border: 1px solid var(--stroke);
      background: linear-gradient(135deg, var(--a1), var(--a2), var(--a3));
      height: 70px;
    }
    .tc-toast{
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 80;
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: 0.9rem;
      padding: 0.6rem 0.9rem;
      box-shadow: 0 16px 40px rgba(0,0,0,.18);
      opacity: 0;
      transform: translateY(6px);
      pointer-events: none;
      transition: opacity .18s ease, transform .18s ease;
    }
    .tc-toast.is-visible{
      opacity: 1;
      transform: translateY(0);
    }
    [data-world-card="1"]{
      cursor: pointer;
      transition: transform .12s ease, box-shadow .18s ease, filter .18s ease;
    }
    [data-world-card="1"]:hover{
      transform: translateY(-1px);
      box-shadow: 0 18px 50px rgba(0,0,0,.16);
      filter: brightness(1.02);
    }
    [data-world-card="1"]:active{
      transform: translateY(1px);
    }
    [data-world-card="1"]:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1), 0 18px 50px rgba(0,0,0,.16);
    }
    #worldMenu[data-open="0"] { display: none; }
    #worldMenu[data-open="1"] { display: block; }
    #worldMenu .tc-world-item{
      color: var(--text);
      transition: background-color .15s ease;
    }
    #worldMenu .tc-world-item:hover{ background: rgba(255,255,255,.10); }
    #worldMenu .tc-world-item:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
      background: rgba(255,255,255,.08);
    }
    .tc-menu[data-open="0"] { display: none; }
    .tc-menu[data-open="1"] { display: block; }
    .tc-menu{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
    }
    .tc-menu-item{
      color: var(--text);
      transition: background-color .15s ease, transform .05s ease;
    }
    .tc-menu-item:hover{ background: rgba(255,255,255,.10); }
    .tc-menu-item:active{ transform: translateY(1px); }
    .tc-menu-item:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
      background: rgba(255,255,255,.08);
    }
    @media (prefers-reduced-motion: reduce){
      .tc-btn,
      #worldMenu .tc-world-item,
      .tc-menu-item{
        transition: none;
      }
      [data-world-card="1"]{
        transition: none;
      }
      [data-world-card="1"]:hover,
      [data-world-card="1"]:active{
        transform: none;
      }
      .tc-toast{
        transition: none;
        transform: none;
      }
      .tc-toast.is-visible{
        transform: none;
      }
    }
  </style>
</head>
<body class="font-sans">
  <!-- TOPBAR -->
  <header class="tc-topbar relative">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
      <div class="flex items-center gap-3">
        <a href="./index.html" class="flex items-center gap-3 min-w-0">
          <img
            src="./assets/spacecolors-logo-topbar.png"
            alt="SpaceColors"
            class="h-10 w-10 rounded-xl select-none"
            loading="eager"
            decoding="async"
          />
          <span class="min-w-0 flex flex-col justify-center leading-tight">
            <span class="tc-brand text-base md:text-lg whitespace-nowrap" data-i18n="topbar.brand">SpaceColors · 8Portal</span>
            <span class="tc-muted text-[11px] md:text-xs truncate max-w-[240px] md:max-w-[360px] hidden sm:block" data-i18n="topbar.slogan">
              Một chạm mở không gian màu vô hạn
            </span>
          </span>
        </a>
      </div>


      <div class="flex-1 flex items-center justify-center">
        <div class="relative" id="portalSwitcher">
          <button id="portalBtn"
            class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[210px] justify-between"
            aria-expanded="false" aria-haspopup="menu" aria-controls="portalMenu">
            Ch&#7885;n Th&#7871; gi&#7899;i
          </button>
          <div id="portalMenu" data-open="0" role="menu" class="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./worlds/threadcolor.html" role="menuitem">Th&#7871; gi&#7899;i m&#224;u th&#234;u</a>
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./worlds/palette.html" role="menuitem">Th&#7871; gi&#7899;i d&#7843;i m&#224;u</a>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end gap-3 min-w-[210px]">
        <div class="relative" id="worldSwitcher">
          <button id="worldBtn"
            class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[150px] justify-between"
            aria-expanded="false" aria-haspopup="menu" aria-controls="worldMenu">
            <span class="flex items-center gap-2">
              <span class="tc-dot" aria-hidden="true"></span>
              <span id="worldLabel">Origami</span>
            </span>
            <span aria-hidden="true">&#9662;</span>
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
        <div id="topbarAuthSlot" data-auth-slot="topbar" class="tc-auth-float flex items-center justify-end min-w-[210px]"></div>
      </div>
    </div>
  </header>

  <main>
    <!-- HERO -->
    <section class="max-w-6xl mx-auto px-4 pt-14 pb-12">
      <div class="tc-card p-8 md:p-10">
        <p class="text-xs uppercase tracking-[0.3em] tc-muted">8Portal v4</p>
        <h1 class="text-4xl md:text-5xl font-bold mt-3" data-i18n="hero.title">Không gian màu vô hạn.</h1>
        <p class="mt-4 tc-muted max-w-2xl whitespace-pre-line" data-i18n="hero.desc">Chuyển Thế giới để cảm nhận sắc thái mới, khám phá các công cụ và thư viện màu đa dạng(màu chỉ,palette,HEX).</p>
        <div class="mt-6 flex flex-wrap gap-3">
          <a class="tc-btn tc-btn-primary px-5 py-3" href="./worlds/threadcolor.html" data-i18n="hero.ctaPrimary">Mở công cụ</a>
          <button class="tc-btn tc-chip px-5 py-3" data-i18n="hero.ctaSecondary">Khám phá Thế giới</button>
        </div>
      </div>
    </section>

    <!-- PORTAL HUB -->
    <section class="max-w-6xl mx-auto px-4 pb-12">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h2 class="text-2xl font-semibold">8 Cổng SpaceColors</h2>
          <p class="tc-muted text-sm mt-1">Chọn cổng để bước vào một Thế giới sắc màu khác.</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="tc-card p-5 flex flex-col gap-4">
          <div>
            <h3 class="font-semibold">Thế giới màu thêu</h3>
            <p class="tc-muted text-sm mt-2">Tra cứu mã chỉ theo ảnh, màu và mã HEX.Tra ngược màu theo mã chỉ.Hỗ trợ nhiều hãng chỉ phổ biến. Kiểm soát tồn dư kho chỉ.Đặt mua chỉ trực tiếp.</p>
          </div>
          <a class="tc-btn tc-btn-primary px-4 py-2 inline-flex w-max" href="./worlds/threadcolor.html">Mở</a>
        </div>
        <div class="tc-card p-5 flex flex-col gap-4">
          <div>
            <div class="inline-flex items-center gap-2 tc-chip px-2.5 py-1 rounded-full text-xs">Sắp ra mắt</div>
            <h3 class="font-semibold mt-3">Thế giới dải màu</h3>
            <p class="tc-muted text-sm mt-2">Khám phá bảng màu theo dải và cảm xúc.</p>
          </div>
          <button class="tc-btn tc-chip px-4 py-2 inline-flex w-max opacity-60 cursor-not-allowed" disabled>Sắp ra mắt</button>
        </div>
        <div class="tc-card p-5 flex flex-col gap-4">
          <div>
            <div class="inline-flex items-center gap-2 tc-chip px-2.5 py-1 rounded-full text-xs">Sắp ra mắt</div>
            <h3 class="font-semibold mt-3">Thế giới ngọc</h3>
            <p class="tc-muted text-sm mt-2">Tông màu quý, ánh kim và chiều sâu.</p>
          </div>
          <button class="tc-btn tc-chip px-4 py-2 inline-flex w-max opacity-60 cursor-not-allowed" disabled>Sắp ra mắt</button>
        </div>
        <div class="tc-card p-5 flex flex-col gap-4">
          <div>
            <div class="inline-flex items-center gap-2 tc-chip px-2.5 py-1 rounded-full text-xs">Sắp ra mắt</div>
            <h3 class="font-semibold mt-3">Thế giới tơ lụa</h3>
            <p class="tc-muted text-sm mt-2">Bảng màu mềm, mịn và mơ màng.</p>
          </div>
          <button class="tc-btn tc-chip px-4 py-2 inline-flex w-max opacity-60 cursor-not-allowed" disabled>Sắp ra mắt</button>
        </div>
        <div class="tc-card p-5 flex flex-col gap-4">
          <div>
            <div class="inline-flex items-center gap-2 tc-chip px-2.5 py-1 rounded-full text-xs">Sắp ra mắt</div>
            <h3 class="font-semibold mt-3">Thế giới thủ công</h3>
            <p class="tc-muted text-sm mt-2">Sắc màu truyền thống, ấm và gần gũi.</p>
          </div>
          <button class="tc-btn tc-chip px-4 py-2 inline-flex w-max opacity-60 cursor-not-allowed" disabled>Sắp ra mắt</button>
        </div>
        <div class="tc-card p-5 flex flex-col gap-4">
          <div>
            <div class="inline-flex items-center gap-2 tc-chip px-2.5 py-1 rounded-full text-xs">Sắp ra mắt</div>
            <h3 class="font-semibold mt-3">Thế giới ánh sáng</h3>
            <p class="tc-muted text-sm mt-2">Dải màu rực rỡ, phản quang và sáng bừng.</p>
          </div>
          <button class="tc-btn tc-chip px-4 py-2 inline-flex w-max opacity-60 cursor-not-allowed" disabled>Sắp ra mắt</button>
        </div>
        <div class="tc-card p-5 flex flex-col gap-4">
          <div>
            <div class="inline-flex items-center gap-2 tc-chip px-2.5 py-1 rounded-full text-xs">Sắp ra mắt</div>
            <h3 class="font-semibold mt-3">Thế giới tối giản</h3>
            <p class="tc-muted text-sm mt-2">Bảng màu tối giản, tinh gọn và sang.</p>
          </div>
          <button class="tc-btn tc-chip px-4 py-2 inline-flex w-max opacity-60 cursor-not-allowed" disabled>Sắp ra mắt</button>
        </div>
        <div class="tc-card p-5 flex flex-col gap-4">
          <div>
            <div class="inline-flex items-center gap-2 tc-chip px-2.5 py-1 rounded-full text-xs">Sắp ra mắt</div>
            <h3 class="font-semibold mt-3">Thế giới ký ức</h3>
            <p class="tc-muted text-sm mt-2">Màu sắc hoài niệm và chất liệu xưa.</p>
          </div>
          <button class="tc-btn tc-chip px-4 py-2 inline-flex w-max opacity-60 cursor-not-allowed" disabled>Sắp ra mắt</button>
        </div>
      </div>
    </section>

    <!-- QUICK ACTIONS -->
    <section class="max-w-6xl mx-auto px-4 pb-12">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h2 class="text-2xl font-semibold" data-i18n="quick.title">Hành động nhanh</h2>
          <p class="tc-muted text-sm mt-1" data-i18n="quick.desc">Truy cập nhanh các tác vụ chính của 8Portal.</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="tc-card p-5">
          <h3 class="font-semibold" data-i18n="quick.items.threadcolor.title">Tra mã chỉ</h3>
          <p class="tc-muted text-sm mt-2" data-i18n="quick.items.threadcolor.desc">Tra cứu màu chỉ theo ảnh, mã hoặc màu chọn.</p>
          <a class="tc-btn tc-btn-primary px-4 py-2 mt-4 inline-flex" href="./worlds/threadcolor.html" data-i18n="quick.items.threadcolor.cta">Mở công cụ</a>
        </div>
        <div class="tc-card p-5">
          <h3 class="font-semibold" data-i18n="quick.items.library.title">Thư viện</h3>
          <p class="tc-muted text-sm mt-2" data-i18n="quick.items.library.desc">Lưu và xem lại các lần tra cứu của bạn.</p>
          <button class="tc-btn tc-chip px-4 py-2 mt-4 inline-flex opacity-60 cursor-not-allowed" disabled data-i18n="quick.items.library.cta">Sắp ra mắt</button>
        </div>
        <div class="tc-card p-5">
          <h3 class="font-semibold" data-i18n="quick.items.contribute.title">Đóng góp dữ liệu</h3>
          <p class="tc-muted text-sm mt-2" data-i18n="quick.items.contribute.desc">Gửi màu và mã chỉ mới cho cộng đồng.</p>
          <button class="tc-btn tc-chip px-4 py-2 mt-4 inline-flex" data-qa-action="contribute" data-i18n="quick.items.contribute.cta">Bắt đầu</button>
        </div>
        <div class="tc-card p-5">
          <h3 class="font-semibold" data-i18n="quick.items.verify.title">Xác minh</h3>
          <p class="tc-muted text-sm mt-2" data-i18n="quick.items.verify.desc">Dành cho admin duyệt dữ liệu cộng đồng.</p>
          <button class="tc-btn tc-chip px-4 py-2 mt-4 inline-flex" data-qa-action="verify" data-i18n="quick.items.verify.cta">Đi tới</button>
        </div>
      </div>
    </section>

    <!-- ROULETTE -->
    <section class="max-w-6xl mx-auto px-4 pb-12">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h2 class="text-2xl font-semibold" data-i18n="roulette.title">Vòng quay dải màu</h2>
          <p class="tc-muted text-sm mt-1" data-i18n="roulette.desc">Chọn ngẫu nhiên một bộ màu nhấn để khám phá nhanh.</p>
        </div>
      </div>
      <div class="tc-card p-6 md:p-8">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-3">
            <div class="tc-preview-swatch" style="background: var(--a1);"></div>
            <div class="tc-preview-swatch" style="background: var(--a2);"></div>
            <div class="tc-preview-swatch" style="background: var(--a3);"></div>
          </div>
          <div class="flex flex-wrap gap-3">
            <button id="rouletteSpin" class="tc-btn tc-btn-primary px-4 py-2" data-i18n="roulette.spin">Quay màu</button>
            <button id="rouletteReset" class="tc-btn tc-chip px-4 py-2" data-i18n="roulette.reset">Đặt lại</button>
          </div>
        </div>
      </div>
    </section>

    <!-- FORGE -->
    <section class="max-w-6xl mx-auto px-4 pb-16">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h2 class="text-2xl font-semibold" data-i18n="forge.title">Lò rèn bảng màu</h2>
          <p class="tc-muted text-sm mt-1" data-i18n="forge.desc">Tuỳ chỉnh bộ màu nhấn để phù hợp với gu của bạn.</p>
        </div>
      </div>
      <div class="tc-card p-6 md:p-8 space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="flex items-center justify-between gap-3">
            <div>
              <div class="text-sm font-semibold" data-i18n="forge.a1.label">Màu nhấn 1</div>
              <div class="tc-muted text-xs mt-1" data-accent-value="a1">--</div>
            </div>
            <input id="forgeA1" type="color" class="tc-color-input" value="#000000" aria-label="Màu nhấn 1">
          </div>
          <div class="flex items-center justify-between gap-3">
            <div>
              <div class="text-sm font-semibold" data-i18n="forge.a2.label">Màu nhấn 2</div>
              <div class="tc-muted text-xs mt-1" data-accent-value="a2">--</div>
            </div>
            <input id="forgeA2" type="color" class="tc-color-input" value="#000000" aria-label="Màu nhấn 2">
          </div>
          <div class="flex items-center justify-between gap-3">
            <div>
              <div class="text-sm font-semibold" data-i18n="forge.a3.label">Màu nhấn 3</div>
              <div class="tc-muted text-xs mt-1" data-accent-value="a3">--</div>
            </div>
            <input id="forgeA3" type="color" class="tc-color-input" value="#000000" aria-label="Màu nhấn 3">
          </div>
        </div>
        <div>
          <div class="text-sm font-semibold mb-2" data-i18n="forge.preview">Xem trước gradient</div>
          <div id="forgePreview" class="tc-gradient-preview"></div>
        </div>
        <div class="flex flex-wrap gap-3">
          <button id="forgeCopy" class="tc-btn tc-chip px-4 py-2" data-i18n="forge.copy">Sao chép CSS</button>
        </div>
      </div>
    </section>

    <!-- GALLERY -->
    <section class="max-w-6xl mx-auto px-4 pb-16">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h2 class="text-2xl font-semibold" data-i18n="gallery.title">B&#7897; s&#432;u t&#7853;p s&#7855;c th&#225;i</h2>
          <p class="tc-muted text-sm mt-1" data-i18n="gallery.desc">8 s&#7855;c th&#225;i c&#7843;m gi&#225;c.</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-world-grid="1">
        <div class="tc-card p-5" data-world-card="1" data-world="nebula" role="button" tabindex="0" aria-label="Kích hoạt Thế giới: Tinh vân">
          <div class="flex items-center gap-2">
            <span class="tc-dot"></span>
            <h3 class="font-semibold" data-world-label="nebula">Tinh vân</h3>
          </div>
          <p class="tc-muted text-sm mt-2" data-world-desc="nebula">Tinh vân huyền ảo, ánh tím xanh sâu thẳm.</p>
          <span class="text-xs mt-4 inline-block tc-muted" data-i18n="gallery.activate">Kích hoạt</span>
        </div>
        <div class="tc-card p-5" data-world-card="1" data-world="ocean" role="button" tabindex="0" aria-label="Kích hoạt Thế giới: Đại dương">
          <div class="flex items-center gap-2">
            <span class="tc-dot"></span>
            <h3 class="font-semibold" data-world-label="ocean">Đại dương</h3>
          </div>
          <p class="tc-muted text-sm mt-2" data-world-desc="ocean">Đại dương mát lành, cảm giác sáng sạch.</p>
          <span class="text-xs mt-4 inline-block tc-muted" data-i18n="gallery.activate">Kích hoạt</span>
        </div>
        <div class="tc-card p-5" data-world-card="1" data-world="ink" role="button" tabindex="0" aria-label="Kích hoạt Thế giới: Mực tàu">
          <div class="flex items-center gap-2">
            <span class="tc-dot"></span>
            <h3 class="font-semibold" data-world-label="ink">Mực tàu</h3>
          </div>
          <p class="tc-muted text-sm mt-2" data-world-desc="ink">Tối giản, mực tàu và độ sâu.</p>
          <span class="text-xs mt-4 inline-block tc-muted" data-i18n="gallery.activate">Kích hoạt</span>
        </div>
        <div class="tc-card p-5" data-world-card="1" data-world="origami" role="button" tabindex="0" aria-label="Kích hoạt Thế giới: Origami">
          <div class="flex items-center gap-2">
            <span class="tc-dot"></span>
            <h3 class="font-semibold" data-world-label="origami">Origami</h3>
          </div>
          <p class="tc-muted text-sm mt-2" data-world-desc="origami">Giấy gấp, ấm áp và nhẹ nhàng.</p>
          <span class="text-xs mt-4 inline-block tc-muted" data-i18n="gallery.activate">Kích hoạt</span>
        </div>
        <div class="tc-card p-5" data-world-card="1" data-world="arcade" role="button" tabindex="0" aria-label="Kích hoạt Thế giới: Arcade">
          <div class="flex items-center gap-2">
            <span class="tc-dot"></span>
            <h3 class="font-semibold" data-world-label="arcade">Arcade</h3>
          </div>
          <p class="tc-muted text-sm mt-2" data-world-desc="arcade">Nê-on năng lượng, nhịp nhanh.</p>
          <span class="text-xs mt-4 inline-block tc-muted" data-i18n="gallery.activate">Kích hoạt</span>
        </div>
        <div class="tc-card p-5" data-world-card="1" data-world="dunes" role="button" tabindex="0" aria-label="Kích hoạt Thế giới: Đồi cát">
          <div class="flex items-center gap-2">
            <span class="tc-dot"></span>
            <h3 class="font-semibold" data-world-label="dunes">Đồi cát</h3>
          </div>
          <p class="tc-muted text-sm mt-2" data-world-desc="dunes">Sa mạc, nắng vàng, yên tĩnh.</p>
          <span class="text-xs mt-4 inline-block tc-muted" data-i18n="gallery.activate">Kích hoạt</span>
        </div>
        <div class="tc-card p-5" data-world-card="1" data-world="chrome" role="button" tabindex="0" aria-label="Kích hoạt Thế giới: Chrome">
          <div class="flex items-center gap-2">
            <span class="tc-dot"></span>
            <h3 class="font-semibold" data-world-label="chrome">Chrome</h3>
          </div>
          <p class="tc-muted text-sm mt-2" data-world-desc="chrome">Kim loại sáng, chuẩn xác, sạch.</p>
          <span class="text-xs mt-4 inline-block tc-muted" data-i18n="gallery.activate">Kích hoạt</span>
        </div>
        <div class="tc-card p-5" data-world-card="1" data-world="circuit" role="button" tabindex="0" aria-label="Kích hoạt Thế giới: Mạch điện">
          <div class="flex items-center gap-2">
            <span class="tc-dot"></span>
            <h3 class="font-semibold" data-world-label="circuit">Mạch điện</h3>
          </div>
          <p class="tc-muted text-sm mt-2" data-world-desc="circuit">Mạch điện, xanh lục kỹ thuật.</p>
          <span class="text-xs mt-4 inline-block tc-muted" data-i18n="gallery.activate">Kích hoạt</span>
        </div>
      </div>
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="max-w-6xl mx-auto px-4 pb-10">
    <div class="tc-card p-4 text-sm tc-muted flex items-center justify-between">
      <span data-i18n="footer.left">8Portal v4 — Khung A1→A3</span>
      <span data-i18n="footer.right">Token thế giới đã sẵn sàng</span>
    </div>
  </footer>

  <script src="./i18n.js"></script>
  <script type="module" src="./auth.js"></script>
  <script>
    (() => {
      if (window.__portalSwitcherBound) return;
      window.__portalSwitcherBound = true;
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
    })();
  </script>
  <script>
    (() => {
      const worldBtn = document.getElementById("worldBtn");
      const worldMenu = document.getElementById("worldMenu");
      const switcher = document.getElementById("worldSwitcher");
      if (!worldBtn || !worldMenu || !switcher) return;
      const storageKey = "tc_world";
      const worlds = ["nebula", "ocean", "ink", "origami", "arcade", "dunes", "chrome", "circuit"];
      const getItems = () => Array.from(worldMenu.querySelectorAll(".tc-world-item"));
      const applyWorld = (key) => {
        const current = document.documentElement.dataset.world;
        const next = worlds.includes(key)
          ? key
          : (worlds.includes(current) ? current : "origami");
        const prev = document.documentElement.getAttribute("data-world");
        document.documentElement.setAttribute("data-world", next);
        try {
          localStorage.setItem(storageKey, next);
        } catch (err) {}
        if (prev !== next) {
          document.dispatchEvent(new CustomEvent("tc-world-changed", { detail: { world: next } }));
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
        const item = event.target.closest(".tc-world-item");
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
        storedWorld = localStorage.getItem(storageKey);
      } catch (err) {}
      if (worlds.includes(storedWorld)) {
        applyWorld(storedWorld);
      } else {
        applyWorld(document.documentElement.dataset.world);
      }
      setMenuOpen(false);
    })();
  </script>
  <script>
    (() => {
      const communityBtn = document.getElementById("communityBtn");
      const communityMenu = document.getElementById("communityMenu");
      const spacesBtn = document.getElementById("spacesBtn");
      const spacesMenu = document.getElementById("spacesMenu");
      if (!communityBtn || !communityMenu || !spacesBtn || !spacesMenu) return;
      const menus = [
        { btn: communityBtn, menu: communityMenu },
        { btn: spacesBtn, menu: spacesMenu }
      ];
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
        const target = action ? `./worlds/threadcolor.html?open=${encodeURIComponent(action)}` : "./worlds/threadcolor.html";
        window.location.href = target;
      };
      communityBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = communityMenu.dataset.open === "1";
        closeAll();
        setMenuOpen(communityBtn, communityMenu, !isOpen);
      });
      spacesBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = spacesMenu.dataset.open === "1";
        closeAll();
        setMenuOpen(spacesBtn, spacesMenu, !isOpen);
      });
      communityMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-menu-item");
        if (!item || !communityMenu.contains(item)) return;
        const action = item.getAttribute("data-action");
        if (action) goTool(action);
        closeAll();
      });
      spacesMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-menu-item");
        if (!item || !spacesMenu.contains(item)) return;
        const action = item.getAttribute("data-action");
        if (action) goTool(action);
        closeAll();
      });
      document.addEventListener("click", (event) => {
        if (menus.some(({ btn, menu }) => btn.contains(event.target) || menu.contains(event.target))) return;
        closeAll();
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeAll();
      });
    })();
  </script>
  <script>
    (() => {
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
    })();
  </script>
  <script>
    (() => {
      const root = document.documentElement;
      const spinBtn = document.getElementById("rouletteSpin");
      const resetBtn = document.getElementById("rouletteReset");
      const inputA1 = document.getElementById("forgeA1");
      const inputA2 = document.getElementById("forgeA2");
      const inputA3 = document.getElementById("forgeA3");
      const copyBtn = document.getElementById("forgeCopy");
      const valueEls = {
        a1: document.querySelector('[data-accent-value="a1"]'),
        a2: document.querySelector('[data-accent-value="a2"]'),
        a3: document.querySelector('[data-accent-value="a3"]')
      };
      if (!spinBtn || !resetBtn || !inputA1 || !inputA2 || !inputA3 || !copyBtn) return;

      const presets = [
        ["#ff6b6b", "#ffd166", "#6ee7b7"],
        ["#60a5fa", "#a78bfa", "#f472b6"],
        ["#22c55e", "#84cc16", "#14b8a6"],
        ["#f97316", "#facc15", "#fb7185"],
        ["#38bdf8", "#0ea5e9", "#6366f1"],
        ["#f59e0b", "#ef4444", "#fb7185"],
        ["#2dd4bf", "#60a5fa", "#a78bfa"]
      ];

      const setAccent = (a1, a2, a3) => {
        root.style.setProperty("--a1", a1);
        root.style.setProperty("--a2", a2);
        root.style.setProperty("--a3", a3);
      };

      const resetAccent = () => {
        root.style.removeProperty("--a1");
        root.style.removeProperty("--a2");
        root.style.removeProperty("--a3");
      };

      const parseRgb = (value) => {
        const match = value.replace(/\s+/g, "").match(/^rgba?\((\d+),(\d+),(\d+)/i);
        if (!match) return null;
        const r = Number(match[1]);
        const g = Number(match[2]);
        const b = Number(match[3]);
        if ([r, g, b].some((v) => Number.isNaN(v))) return null;
        return [r, g, b];
      };

      const toHex = (value) => {
        if (!value) return "#000000";
        const raw = value.trim();
        if (raw.startsWith("#")) {
          if (raw.length === 4) {
            return "#" + raw.slice(1).split("").map((c) => c + c).join("");
          }
          if (raw.length === 7) return raw;
        }
        const rgb = parseRgb(raw);
        if (!rgb) return "#000000";
        return "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("");
      };

      const getAccent = () => {
        const styles = getComputedStyle(root);
        return {
          a1: toHex(styles.getPropertyValue("--a1")),
          a2: toHex(styles.getPropertyValue("--a2")),
          a3: toHex(styles.getPropertyValue("--a3"))
        };
      };

      const refreshForgeUI = () => {
        const current = getAccent();
        inputA1.value = current.a1;
        inputA2.value = current.a2;
        inputA3.value = current.a3;
        if (valueEls.a1) valueEls.a1.textContent = current.a1.toUpperCase();
        if (valueEls.a2) valueEls.a2.textContent = current.a2.toUpperCase();
        if (valueEls.a3) valueEls.a3.textContent = current.a3.toUpperCase();
      };

      const ensureToast = () => {
        let toast = document.getElementById("tcToast");
        if (toast) return toast;
        toast = document.createElement("div");
        toast.id = "tcToast";
        toast.className = "tc-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
        return toast;
      };

      const showToast = (message) => {
        const toast = ensureToast();
        toast.textContent = "";
        window.clearTimeout(showToast._t);
        const raf = window.requestAnimationFrame || ((fn) => setTimeout(fn, 0));
        raf(() => {
          toast.textContent = message;
          toast.classList.add("is-visible");
          showToast._t = window.setTimeout(() => {
            toast.classList.remove("is-visible");
          }, 1400);
        });
      };

      const getCopyText = () => {
        const current = getAccent();
        return `--a1: ${current.a1};\n--a2: ${current.a2};\n--a3: ${current.a3};`;
      };

      const copyToClipboard = (text) => {
        if (navigator.clipboard && window.isSecureContext) {
          return navigator.clipboard.writeText(text);
        }
        return new Promise((resolve) => {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand("copy");
          } catch (err) {}
          ta.remove();
          resolve();
        });
      };

      spinBtn.addEventListener("click", () => {
        const preset = presets[Math.floor(Math.random() * presets.length)];
        if (!preset) return;
        setAccent(preset[0], preset[1], preset[2]);
        refreshForgeUI();
      });

      resetBtn.addEventListener("click", () => {
        resetAccent();
        refreshForgeUI();
      });

      const onForgeInput = () => {
        setAccent(inputA1.value, inputA2.value, inputA3.value);
        refreshForgeUI();
      };
      inputA1.addEventListener("input", onForgeInput);
      inputA2.addEventListener("input", onForgeInput);
      inputA3.addEventListener("input", onForgeInput);

      copyBtn.addEventListener("click", () => {
        const messageNode = document.querySelector('[data-i18n="toast.copied"]');
        const message = messageNode ? messageNode.textContent : "Đã sao chép!";
        copyToClipboard(getCopyText()).then(() => showToast(message));
      });

      refreshForgeUI();
    })();
  </script>
  <span class="sr-only" data-i18n="toast.copied">Đã sao chép!</span>
</body>
</html>

```

## FILE: account.html (size: 27216)
```html
<!DOCTYPE html>
<html lang="vi" data-world="origami">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Trung tâm t&#224;i kho&#7843;n</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root{
      --z-topbar: 2000;
      --z-topbar-menu: 4000;
      --bg: #f6f1e9;
      --text: #201a14;
      --muted: #6b5d4b;
      --glass: rgba(255, 255, 255, 0.72);
      --stroke: rgba(32, 26, 20, 0.10);
      --a1: #c27b4b;
      --a2: #d59e6d;
      --a3: #8c6d54;
    }
    html[data-world="nebula"]{
      --bg:#040512;
      --text:#eef2ff;
      --muted:#b8c2ff;
      --glass:rgba(12,16,34,0.72);
      --stroke:rgba(255,255,255,0.14);
      --a1:#6ee7ff;
      --a2:#8b5cf6;
      --a3:#f472b6;
    }
    html[data-world="ocean"]{
      --bg:#dff6ff;
      --text:#062a3a;
      --muted:#3f6b7f;
      --glass:rgba(255,255,255,0.76);
      --stroke:rgba(6,42,58,0.12);
      --a1:#1fb6ff;
      --a2:#0ea5a8;
      --a3:#4dd4ff;
    }
    html[data-world="ink"]{
      --bg:#0b0d12;
      --text:#f4f6fb;
      --muted:#a6afbd;
      --glass:rgba(16,18,24,0.76);
      --stroke:rgba(255,255,255,0.12);
      --a1:#e2e8f0;
      --a2:#94a3b8;
      --a3:#64748b;
    }
    html[data-world="origami"]{
      --bg:#f6f1e9;
      --text:#201a14;
      --muted:#6b5d4b;
      --glass:rgba(255,255,255,0.74);
      --stroke:rgba(32,26,20,0.10);
      --a1:#c27b4b;
      --a2:#d59e6d;
      --a3:#8c6d54;
    }
    html[data-world="arcade"]{
      --bg:#05040f;
      --text:#fff7ff;
      --muted:#d8c9f6;
      --glass:rgba(14,12,28,0.80);
      --stroke:rgba(255,255,255,0.16);
      --a1:#ff3dcd;
      --a2:#7c3aed;
      --a3:#20e3b2;
    }
    html[data-world="dunes"]{
      --bg:#f7f0e1;
      --text:#3a2d1a;
      --muted:#7a644a;
      --glass:rgba(255,255,255,0.74);
      --stroke:rgba(58,45,26,0.12);
      --a1:#d39b54;
      --a2:#e3b87b;
      --a3:#b3743d;
    }
    html[data-world="chrome"]{
      --bg:#f1f4f8;
      --text:#1c232b;
      --muted:#5f6b79;
      --glass:rgba(255,255,255,0.72);
      --stroke:rgba(28,35,43,0.12);
      --a1:#3b82f6;
      --a2:#94a3b8;
      --a3:#0f172a;
    }
    html[data-world="circuit"]{
      --bg:#04110a;
      --text:#eafff2;
      --muted:#a6d6bb;
      --glass:rgba(8,20,14,0.76);
      --stroke:rgba(255,255,255,0.12);
      --a1:#22c55e;
      --a2:#16a34a;
      --a3:#86efac;
    }
    body{
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .tc-topbar{
      background: var(--glass);
      border-bottom: 1px solid var(--stroke);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.08);
      position: sticky;
      top: 0;
      z-index: var(--z-topbar);
      overflow: visible;
    }
    .tc-topbar::after{
      content:"";
      position:absolute; left:0; right:0; bottom:-1px; height:1px;
      background: linear-gradient(90deg, var(--a1), var(--a2), var(--a3));
      opacity: .35;
    }
    .tc-chip{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
    }
    .tc-btn{
      border-radius: 0.75rem;
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      font-weight: 600;
      letter-spacing: -0.005em;
      line-height: 1;
    }
    .tc-btn:hover{ filter: brightness(1.03); }
    .tc-btn:active{ transform: translateY(1px); }
    .tc-btn:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    .tc-btn-primary{
      background: linear-gradient(135deg, var(--a1), var(--a2));
      color: #fff;
      border: 1px solid rgba(255,255,255,.18);
    }
    .tc-btn-primary:hover{ filter: brightness(1.06); }
    .tc-dot{
      width: 10px; height: 10px; border-radius: 999px;
      background: linear-gradient(135deg, var(--a1), var(--a2), var(--a3));
      box-shadow: 0 0 0 2px rgba(255,255,255,.5);
    }
    .tc-card{
      background: var(--glass);
      border: 1px solid var(--stroke);
      border-radius: 1.25rem;
      box-shadow: 0 24px 60px rgba(0,0,0,0.12);
    }
    .tc-muted{ color: var(--muted); }
    #portalMenu[data-open="0"],
    #worldMenu[data-open="0"]{ display: none; }
    .tc-menu-item{
      color: var(--text);
      transition: background-color .15s ease, transform .05s ease;
    }
    .tc-menu-item:hover{ background: rgba(255,255,255,.10); }
    .tc-menu-item:active{ transform: translateY(1px); }
    .tc-menu-item:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
      background: rgba(255,255,255,.08);
    }
    #worldMenu .tc-world-item{
      color: var(--text);
      transition: background-color .15s ease, transform .05s ease;
    }
    #worldMenu .tc-world-item:hover{ background: rgba(255,255,255,.10); }
    #worldMenu .tc-world-item:active{ transform: translateY(1px); }
    #portalMenu,
    #worldMenu{
      z-index: var(--z-topbar-menu);
    }
    .account-nav-link{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: .5rem;
      padding: .55rem .75rem;
      border-radius: .8rem;
      color: var(--text);
    }
    .account-nav-link:hover{ background: rgba(255,255,255,.08); }
    .account-nav-link.is-active{
      background: linear-gradient(135deg, rgba(255,255,255,.24), rgba(255,255,255,.08));
      border: 1px solid var(--stroke);
    }
    .account-rail{
      position: sticky;
      top: 96px;
    }
  </style>
</head>
<body class="font-sans">
  <header class="tc-topbar relative">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
      <div class="flex items-center gap-3 min-w-0">
        <a href="./index.html" class="flex items-center gap-3 min-w-0">
          <img src="./assets/spacecolors-logo-topbar.png" alt="SpaceColors" class="h-10 w-10 rounded-xl select-none" loading="eager" decoding="async">
          <span class="min-w-0 flex flex-col justify-center leading-tight">
            <span class="tc-brand text-base md:text-lg whitespace-nowrap">SpaceColors &#183; 8Portal</span>
            <span class="tc-muted text-[11px] md:text-xs truncate max-w-[240px] md:max-w-[360px]">M&#7897;t ch&#7841;m m&#7903; kh&#244;ng gian m&#224;u v&#244; h&#7841;n</span>
          </span>
        </a>
      </div>
      <div class="flex-1 flex items-center justify-center">
        <div class="relative" id="portalSwitcher">
          <button id="portalBtn" class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[210px] justify-between" aria-expanded="false" aria-haspopup="menu" aria-controls="portalMenu">
            Ch&#7885;n Th&#7871; gi&#7899;i
          </button>
          <div id="portalMenu" data-open="0" role="menu" class="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./worlds/threadcolor.html" role="menuitem">Th&#7871; gi&#7899;i m&#224;u th&#234;u</a>
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./worlds/palette.html" role="menuitem">Th&#7871; gi&#7899;i d&#7843;i m&#224;u</a>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="relative" id="worldSwitcher">
          <button id="worldBtn" class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[150px] justify-between" aria-expanded="false" aria-haspopup="menu" aria-controls="worldMenu">
            <span class="flex items-center gap-2">
              <span class="tc-dot" aria-hidden="true"></span>
              <span id="worldLabel">Origami</span>
            </span>
            <span aria-hidden="true">&#9662;</span>
          </button>
          <div id="worldMenu" data-open="0" role="menu" class="absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="nebula" role="menuitem">Tinh v&#226;n</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="ocean" role="menuitem">&#272;&#7841;i d&#432;&#417;ng</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="ink" role="menuitem">M&#7921;c t&#224;u</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="origami" role="menuitem">Origami</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="arcade" role="menuitem">Arcade</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="dunes" role="menuitem">&#272;&#7891;i c&#225;t</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="chrome" role="menuitem">Chrome</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="circuit" role="menuitem">M&#7841;ch &#273;i&#7879;n</button>
          </div>
        </div>
        <div id="topbarAuthSlot" data-auth-slot="topbar" class="flex items-center justify-end min-w-[210px]"></div>
      </div>
    </div>
  </header>

  <main class="mx-auto max-w-6xl px-4 pt-8 pb-16">
    <div class="flex flex-col gap-6 lg:flex-row">
      <aside class="lg:w-60">
        <div class="tc-card p-4 space-y-4">
          <a id="returnLink" class="tc-btn tc-chip w-full justify-center text-sm font-semibold hidden" href="#">&larr; Quay l&#7841;i</a>
          <div>
            <div class="text-xs uppercase tracking-wide tc-muted">T&#224;i kho&#7843;n</div>
            <nav class="mt-2 space-y-1">
              <a class="account-nav-link" href="#section-overview">T&#7893;ng quan</a>
              <a class="account-nav-link" href="#section-profile">H&#7891; s&#417;</a>
              <a class="account-nav-link" href="#section-security">B&#7843;o m&#7853;t</a>
            </nav>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wide tc-muted">Tu&#7927; bi&#7871;n</div>
            <nav class="mt-2 space-y-1">
              <a class="account-nav-link" href="#section-preferences">Tu&#7927; bi&#7871;n</a>
            </nav>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wide tc-muted">D&#7919; li&#7879;u &amp; &#273;&#7891;ng b&#7897;</div>
            <nav class="mt-2 space-y-1">
              <a class="account-nav-link" href="#section-data">D&#7919; li&#7879;u &amp; &#273;&#7891;ng b&#7897;</a>
              <a class="account-nav-link" href="#section-privacy">Quy&#7873;n ri&#234;ng t&#432;</a>
            </nav>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wide tc-muted">H&#7879; sinh th&#225;i</div>
            <nav class="mt-2 space-y-1">
              <a class="account-nav-link opacity-60 cursor-not-allowed" href="#section-plan" aria-disabled="true">G&#243;i d&#7883;ch v&#7909; (s&#7855;p ra m&#7855;t)</a>
              <a class="account-nav-link opacity-60 cursor-not-allowed" href="#section-team" aria-disabled="true">Workspace/Team (s&#7855;p ra m&#7855;t)</a>
            </nav>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wide tc-muted">H&#7895; tr&#7907;</div>
            <nav class="mt-2 space-y-1">
              <a class="account-nav-link" href="#section-support">H&#7895; tr&#7907; &amp; ph&#7843;n h&#7891;i</a>
              <a class="account-nav-link" href="#section-logout">&#272;&#259;ng xu&#7845;t</a>
            </nav>
          </div>
        </div>
      </aside>

      <section class="flex-1 space-y-6">
        <div id="section-overview" class="tc-card p-6">
          <h2 class="text-xl font-semibold">T&#7893;ng quan</h2>
          <div class="mt-4 grid gap-4 md:grid-cols-2">
            <div class="tc-card p-4">
              <div class="text-sm tc-muted">Tr&#7841;ng th&#225;i t&#224;i kho&#7843;n</div>
              <div class="text-lg font-semibold mt-2">&#272;ang k&#7871;t n&#7889;i</div>
            </div>
            <div class="tc-card p-4">
              <div class="text-sm tc-muted">D&#7919; li&#7879;u</div>
              <div class="text-lg font-semibold mt-2">12 b&#7843;n l&#432;u &#183; 3 d&#7921; &#225;n</div>
            </div>
            <div class="tc-card p-4">
              <div class="text-sm tc-muted">&#272;&#7891;ng b&#7897;</div>
              <div class="text-lg font-semibold mt-2">&#272;ang b&#7853;t</div>
            </div>
            <div class="tc-card p-4">
              <div class="text-sm tc-muted">Ho&#7841;t &#273;&#7897;ng g&#7847;n &#273;&#226;y</div>
              <div class="text-lg font-semibold mt-2">3 thao t&#225;c h&#244;m nay</div>
            </div>
          </div>
        </div>

        <div id="section-profile" class="tc-card p-6">
          <h2 class="text-xl font-semibold">H&#7891; s&#417;</h2>
          <div class="mt-4 grid gap-4 md:grid-cols-2">
            <div class="tc-card p-4">
              <div class="text-sm tc-muted">T&#234;n hi&#7875;n th&#7883;</div>
              <div class="text-lg font-semibold mt-2">SpaceColors Studio</div>
            </div>
            <div class="tc-card p-4">
              <div class="text-sm tc-muted">&#272;&#417;n v&#7883; / Nh&#243;m</div>
              <div class="text-lg font-semibold mt-2">X&#432;&#7903;ng Th&#234;u 01</div>
            </div>
            <div class="tc-card p-4 md:col-span-2">
              <div class="text-sm tc-muted">M&#7909;c ti&#234;u</div>
              <div class="text-lg font-semibold mt-2">T&#432;&#417;ng th&#237;ch m&#224;u ch&#237;nh x&#225;c, l&#432;u b&#7897; s&#432;u t&#7853;p</div>
            </div>
          </div>
        </div>

        <div id="section-security" class="tc-card p-6">
          <h2 class="text-xl font-semibold">B&#7843;o m&#7853;t</h2>
          <div class="mt-4 grid gap-4 md:grid-cols-2">
            <div class="tc-card p-4">
              <div class="text-sm tc-muted">&#272;&#7893;i m&#7853;t kh&#7849;u</div>
              <button class="mt-3 tc-btn tc-chip px-3 py-2 text-sm font-semibold">C&#7853;p nh&#7853;t</button>
            </div>
            <div class="tc-card p-4">
              <div class="text-sm tc-muted">Phi&#234;n &#273;&#259;ng nh&#7853;p</div>
              <button class="mt-3 tc-btn tc-chip px-3 py-2 text-sm font-semibold">&#272;&#259;ng xu&#7845;t m&#7885;i thi&#7871;t b&#7883;</button>
            </div>
          </div>
        </div>

        <div id="section-preferences" class="tc-card p-6">
          <h2 class="text-xl font-semibold">Tu&#7927; bi&#7871;n</h2>
          <div class="mt-4 grid gap-4 md:grid-cols-2">
            <div class="tc-card p-4">
              <div class="text-sm tc-muted">S&#7855;c th&#225;i m&#7863;c &#273;&#7883;nh</div>
              <div class="text-lg font-semibold mt-2">Origami</div>
            </div>
            <div class="tc-card p-4">
              <div class="text-sm tc-muted">Ng&#244;n ng&#7919;</div>
              <div class="text-lg font-semibold mt-2">Ti&#7871;ng Vi&#7879;t</div>
            </div>
            <div class="tc-card p-4">
              <div class="text-sm tc-muted">M&#7853;t &#273;&#7897; UI</div>
              <div class="text-lg font-semibold mt-2">Chu&#7849;n</div>
            </div>
            <div class="tc-card p-4">
              <div class="text-sm tc-muted">Ph&#237;m t&#7855;t</div>
              <div class="text-lg font-semibold mt-2">&#272;ang b&#7853;t</div>
            </div>
          </div>
        </div>

        <div id="section-data" class="tc-card p-6">
          <h2 class="text-xl font-semibold">D&#7919; li&#7879;u &amp; &#273;&#7891;ng b&#7897;</h2>
          <div class="mt-4 grid gap-4 md:grid-cols-2">
            <div class="tc-card p-4">
              <div class="text-sm tc-muted">Xu&#7845;t d&#7919; li&#7879;u</div>
              <div class="mt-3 flex flex-wrap gap-2">
                <button class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">Xu&#7845;t JSON</button>
                <button class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">Xu&#7845;t CSV</button>
              </div>
            </div>
            <div class="tc-card p-4">
              <div class="text-sm tc-muted">Nh&#7853;p d&#7919; li&#7879;u</div>
              <button class="mt-3 tc-btn tc-chip px-3 py-2 text-sm font-semibold">Nh&#7853;p t&#7879;p</button>
            </div>
            <div class="tc-card p-4 md:col-span-2">
              <div class="text-sm tc-muted">Sao l&#432;u / Kh&#244;i ph&#7909;c</div>
              <div class="mt-3 flex flex-wrap gap-2">
                <button class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">T&#7841;o sao l&#432;u</button>
                <button class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">Kh&#244;i ph&#7909;c</button>
                <button class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">B&#7853;t &#273;&#7891;ng b&#7897;</button>
              </div>
            </div>
          </div>
        </div>

        <div id="section-privacy" class="tc-card p-6">
          <h2 class="text-xl font-semibold">Quy&#7873;n ri&#234;ng t&#432;</h2>
          <div class="mt-4 grid gap-4 md:grid-cols-2">
            <div class="tc-card p-4">
              <div class="text-sm tc-muted">&#272;&#243;ng g&#243;p d&#7919; li&#7879;u</div>
              <div class="text-lg font-semibold mt-2">&#272;ang b&#7853;t</div>
            </div>
            <div class="tc-card p-4">
              <div class="text-sm tc-muted">Chia s&#7867; read-only</div>
              <div class="text-lg font-semibold mt-2">&#272;ang t&#7855;t</div>
            </div>
            <div class="tc-card p-4 md:col-span-2">
              <div class="text-sm tc-muted">Ch&#7871; &#273;&#7897; &#7849;n danh</div>
              <div class="text-lg font-semibold mt-2">Kh&#244;ng k&#237;ch ho&#7841;t</div>
            </div>
          </div>
        </div>

        <div id="section-plan" class="tc-card p-6">
          <h2 class="text-xl font-semibold">G&#243;i d&#7883;ch v&#7909; (s&#7855;p ra m&#7855;t)</h2>
          <p class="mt-2 tc-muted">Chu&#7849;n b&#7883; ra m&#7855;t g&#243;i c&#225; nh&#226;n v&#224; doanh nghi&#7879;p.</p>
        </div>

        <div id="section-team" class="tc-card p-6">
          <h2 class="text-xl font-semibold">Workspace/Team (s&#7855;p ra m&#7855;t)</h2>
          <p class="mt-2 tc-muted">T&#7893; ch&#7913;c nh&#243;m, quy tr&#236;nh v&#224; ph&#226;n quy&#7873;n s&#7869; &#273;&#432;&#7907;c m&#7903; sau.</p>
        </div>

        <div id="section-support" class="tc-card p-6">
          <h2 class="text-xl font-semibold">H&#7895; tr&#7907; &amp; ph&#7843;n h&#7891;i</h2>
          <div class="mt-4 flex flex-wrap gap-2">
            <button class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">G&#7917;i ph&#7843;n h&#7891;i</button>
            <button class="tc-btn tc-chip px-3 py-2 text-sm font-semibold">Li&#234;n h&#7879; h&#7895; tr&#7907;</button>
          </div>
        </div>

        <div id="section-logout" class="tc-card p-6">
          <h2 class="text-xl font-semibold">&#272;&#259;ng xu&#7845;t</h2>
          <p class="mt-2 tc-muted">Tho&#225;t kh&#7887;i t&#7845;t c&#7843; thi&#7871;t b&#7883; ho&#7841;t &#273;&#7897; trong h&#7879; sinh th&#225;i.</p>
          <button class="mt-4 tc-btn tc-btn-primary px-4 py-2 text-sm font-semibold">Tho&#225;t t&#224;i kho&#7843;n</button>
        </div>
      </section>

      <aside class="lg:w-72">
        <div class="account-rail tc-card p-5 space-y-4">
          <div>
            <div class="text-xs uppercase tracking-wide tc-muted">H&#224;nh &#273;&#7897;ng nhanh</div>
            <div class="mt-2 flex flex-col gap-2">
              <a class="tc-btn tc-btn-primary px-4 py-2 text-sm font-semibold text-center" href="./worlds/threadvault.html?tab=saved">M&#7903; Kho ch&#7881;</a>
              <a class="tc-btn tc-chip px-4 py-2 text-sm font-semibold text-center" href="./worlds/threadcolor.html">V&#224;o Th&#7871; gi&#7899;i m&#224;u th&#234;u</a>
              <a class="tc-btn tc-chip px-4 py-2 text-sm font-semibold text-center" href="./worlds/palette.html">V&#224;o Th&#7871; gi&#7899;i d&#7843;i m&#224;u</a>
              <button class="tc-btn tc-chip px-4 py-2 text-sm font-semibold">Xu&#7845;t d&#7919; li&#7879;u</button>
              <button class="tc-btn tc-chip px-4 py-2 text-sm font-semibold">Nh&#7853;p d&#7919; li&#7879;u</button>
            </div>
          </div>
          <div class="tc-card p-4">
            <div class="text-sm tc-muted">Tr&#7841;ng th&#225;i</div>
            <div class="mt-2 text-sm font-semibold">2/8 Th&#7871; gi&#7899;i s&#7855;n s&#224;ng</div>
            <div class="mt-1 text-sm tc-muted">S&#7855;c th&#225;i &#273;ang d&#249;ng: Origami</div>
            <div class="mt-1 text-sm tc-muted">&#272;&#7891;ng b&#7897;: &#272;ang b&#7853;t</div>
          </div>
        </div>
      </aside>
    </div>
  </main>

  <script type="module" src="./auth.js"></script>
  <script>
    (() => {
      const portalSwitcher = document.getElementById("portalSwitcher");
      const portalBtn = document.getElementById("portalBtn");
      const portalMenu = document.getElementById("portalMenu");
      if (portalSwitcher && portalBtn && portalMenu) {
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
      }
    })();
  </script>
  <script>
    (() => {
      const worldBtn = document.getElementById("worldBtn");
      const worldMenu = document.getElementById("worldMenu");
      const switcher = document.getElementById("worldSwitcher");
      if (!worldBtn || !worldMenu || !switcher) return;
      const worlds = ["nebula","ocean","ink","origami","arcade","dunes","chrome","circuit"];
      const labels = {
        nebula: "Tinh v\u00e2n",
        ocean: "\u0110\u1ea1i d\u01b0\u01a1ng",
        ink: "M\u1ef1c t\u00e0u",
        origami: "Origami",
        arcade: "Arcade",
        dunes: "\u0110\u1ed3i c\u00e1t",
        chrome: "Chrome",
        circuit: "M\u1ea1ch \u0111i\u1ec7n"
      };
      const storageKey = "tc_world";
      const defaultWorld = "origami";
      const labelEl = document.getElementById("worldLabel");
      const setMenuOpen = (open) => {
        worldMenu.dataset.open = open ? "1" : "0";
        worldMenu.hidden = !open;
        worldBtn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      const applyWorld = (nextKey) => {
        const next = worlds.includes(nextKey) ? nextKey : defaultWorld;
        document.documentElement.setAttribute("data-world", next);
        try { localStorage.setItem(storageKey, next); } catch (e) {}
        if (labelEl) labelEl.textContent = labels[next] || "Origami";
      };
      try {
        const stored = localStorage.getItem(storageKey);
        applyWorld(stored || document.documentElement.dataset.world || defaultWorld);
      } catch (e) {
        applyWorld(document.documentElement.dataset.world || defaultWorld);
      }
      setMenuOpen(false);
      worldBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        setMenuOpen(worldMenu.dataset.open !== "1");
      });
      worldMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-world-item");
        if (!item || !worldMenu.contains(item)) return;
        applyWorld(item.getAttribute("data-world"));
        setMenuOpen(false);
        worldBtn.focus();
      });
      document.addEventListener("click", (event) => {
        if (!switcher.contains(event.target)) setMenuOpen(false);
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          setMenuOpen(false);
          worldBtn.focus();
        }
      });
    })();
  </script>
  <script>
    (() => {
      const returnLink = document.getElementById("returnLink");
      const params = new URLSearchParams(window.location.search);
      const ret = params.get("return");
      if (returnLink) {
        if (ret) {
          returnLink.href = ret;
          returnLink.classList.remove("hidden");
        }
      }
      const links = Array.from(document.querySelectorAll(".account-nav-link"));
      const sections = links
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);
      if (!sections.length) return;
      const setActive = (id) => {
        links.forEach(link => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, { rootMargin: "-30% 0px -55% 0px" });
      sections.forEach(section => observer.observe(section));
    })();
  </script>
</body>
</html>

```

## FILE: script.js (size: 81321)
```js
import { saveSearch, getSavedSearch, listSavedSearches } from "./library.js";
import { normalizeAndDedupeThreads } from "./data_normalize.js";
import {
  submitThread,
  listPendingSubmissions,
  voteOnSubmission,
  getVoteSummary,
  isAdmin,
  promoteSubmissionToVerified
} from "./crowd.js";
//======================= UTILITIES =======================
function normalizeHex(hex) {
  if (!hex || typeof hex !== "string") return null;
  let v = hex.trim().toLowerCase().replace(/^##/, "#");
  if (!v.startsWith("#")) v = "#" + v;
  return /^#[0-9a-f]{6}$/.test(v) ? v : null;
}

function hexToRgbArray(hex) {
  const num = parseInt(hex.slice(1), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToLab([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  let y = (r * 0.2126 + g * 0.7152 + b * 0.0722);
  let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.cbrt(x) : (7.787 * x + 16 / 116);
  y = y > 0.008856 ? Math.cbrt(y) : (7.787 * y + 16 / 116);
  z = z > 0.008856 ? Math.cbrt(z) : (7.787 * z + 16 / 116);

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

const labCache = new Map();

function getLabForHex(hex) {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  const cached = labCache.get(normalized);
  if (cached) return cached;
  const lab = rgbToLab(hexToRgbArray(normalized));
  labCache.set(normalized, lab);
  return lab;
}

function t(key, fallback, params) {
  if (window.tcI18n?.t) return window.tcI18n.t(key, fallback, params);
  return fallback || "";
}

function ensureLab(thread) {
  if (!thread) return null;
  if (!Array.isArray(thread.lab) || thread.lab.length !== 3) {
    thread.lab = getLabForHex(thread.hex);
  }
  return thread.lab;
}

function normalizeBrandKey(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function normalizeCodeKey(code) {
  return String(code || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, " ");
}

function isVerifiedThread(thread) {
  const conf = typeof thread?.confidence === "number" ? thread.confidence : 0;
  return conf >= 0.85 || thread?.source?.type === "CROWD_VERIFIED";
}

function rebuildIndexes(list = threads) {
  const byBrand = new Map();
  const byCode = new Map();
  const byCanonical = new Map();
  const brandKeyMap = new Map();

  list.forEach((thread) => {
    if (!thread) return;
    const brandName = (thread.brand || "").trim();
    const codeValue = (thread.code || "").trim();
    if (!brandName || !codeValue) return;
    const brandKey = normalizeBrandKey(brandName);
    const codeKey = normalizeCodeKey(codeValue);
    if (!brandKey || !codeKey) return;
    const canonicalKey = `${brandKey}::${codeKey}`;

    if (!byBrand.has(brandName)) byBrand.set(brandName, []);
    byBrand.get(brandName).push(thread);

    if (!byCode.has(codeKey)) byCode.set(codeKey, []);
    byCode.get(codeKey).push(thread);

    if (!byCanonical.has(canonicalKey)) {
      byCanonical.set(canonicalKey, thread);
    }

    if (!brandKeyMap.has(brandKey) || brandName.length > brandKeyMap.get(brandKey).length) {
      brandKeyMap.set(brandKey, brandName);
    }
  });

  threadsByBrand = byBrand;
  threadsByCode = byCode;
  threadsByCanonicalKey = byCanonical;
  brandKeyToName = brandKeyMap;
  brandNamesSorted = Array.from(brandKeyMap.entries())
    .map(([key, name]) => ({ key, name }))
    .sort((a, b) => b.name.length - a.name.length);
}

function deltaE76(lab1, lab2) {
  return Math.sqrt(
    (lab1[0] - lab2[0]) ** 2 +
    (lab1[1] - lab2[1]) ** 2 +
    (lab1[2] - lab2[2]) ** 2
  );
}

function deltaE2000(lab1, lab2) {
  const [L1, a1, b1] = lab1;
  const [L2, a2, b2] = lab2;
  const avgLp = (L1 + L2) / 2;
  const C1 = Math.sqrt(a1 * a1 + b1 * b1);
  const C2 = Math.sqrt(a2 * a2 + b2 * b2);
  const avgC = (C1 + C2) / 2;
  const avgC7 = Math.pow(avgC, 7);
  const G = 0.5 * (1 - Math.sqrt(avgC7 / (avgC7 + Math.pow(25, 7))));
  const a1p = (1 + G) * a1;
  const a2p = (1 + G) * a2;
  const C1p = Math.sqrt(a1p * a1p + b1 * b1);
  const C2p = Math.sqrt(a2p * a2p + b2 * b2);
  const avgCp = (C1p + C2p) / 2;
  const h1p = Math.atan2(b1, a1p);
  const h2p = Math.atan2(b2, a2p);
  const h1pDeg = ((h1p * 180) / Math.PI + 360) % 360;
  const h2pDeg = ((h2p * 180) / Math.PI + 360) % 360;
  let deltahp = h2pDeg - h1pDeg;
  if (C1p * C2p === 0) {
    deltahp = 0;
  } else if (deltahp > 180) {
    deltahp -= 360;
  } else if (deltahp < -180) {
    deltahp += 360;
  }
  const deltaLp = L2 - L1;
  const deltaCp = C2p - C1p;
  const deltaHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((deltahp * Math.PI) / 360);
  const avgHp = (() => {
    if (C1p * C2p === 0) return h1pDeg + h2pDeg;
    const sum = h1pDeg + h2pDeg;
    if (Math.abs(h1pDeg - h2pDeg) > 180) {
      return sum < 360 ? (sum + 360) / 2 : (sum - 360) / 2;
    }
    return sum / 2;
  })();
  const T = 1
    - 0.17 * Math.cos(((avgHp - 30) * Math.PI) / 180)
    + 0.24 * Math.cos(((2 * avgHp) * Math.PI) / 180)
    + 0.32 * Math.cos(((3 * avgHp + 6) * Math.PI) / 180)
    - 0.20 * Math.cos(((4 * avgHp - 63) * Math.PI) / 180);
  const deltaTheta = 30 * Math.exp(-(((avgHp - 275) / 25) ** 2));
  const Rc = 2 * Math.sqrt(Math.pow(avgCp, 7) / (Math.pow(avgCp, 7) + Math.pow(25, 7)));
  const Sl = 1 + (0.015 * ((avgLp - 50) ** 2)) / Math.sqrt(20 + ((avgLp - 50) ** 2));
  const Sc = 1 + 0.045 * avgCp;
  const Sh = 1 + 0.015 * avgCp * T;
  const Rt = -Math.sin((2 * deltaTheta * Math.PI) / 180) * Rc;
  return Math.sqrt(
    (deltaLp / Sl) ** 2 +
    (deltaCp / Sc) ** 2 +
    (deltaHp / Sh) ** 2 +
    Rt * (deltaCp / Sc) * (deltaHp / Sh)
  );
}

function getDelta(lab1, lab2, method) {
  return method === "2000" ? deltaE2000(lab1, lab2) : deltaE76(lab1, lab2);
}

function formatLab(lab) {
  return lab.map(v => v.toFixed(2));
}

function hexToRgbString(hex) {
  const [r, g, b] = hexToRgbArray(hex);
  return { rgbArray: [r, g, b], rgbString: `rgb(${r}, ${g}, ${b})` };
}

function hexToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [
    Math.round(h * 360),
    Math.round(s * 100),
    Math.round(l * 100)
  ];
}

//======================= GLOBAL STATE =======================
let threads = [];
let isDataReady = false;
let lastResults = null;
let lastChosenHex = null;
let currentDeltaThreshold = 3.0;
let currentDeltaMethod = "76";
let selectedItemEl = null;
let lastFocusedItem = null;
let currentUser = null;
let currentRendered = [];
let isAdminUser = false;
let useVerifiedOnly = false;
let verifiedThreads = [];
let pendingSubmissions = [];
let threadsByBrand = new Map();
let threadsByCode = new Map();
let threadsByCanonicalKey = new Map();
let brandNamesSorted = [];
let brandKeyToName = new Map();
const matchCache = new Map();
const MATCH_CACHE_LIMIT = 60;
const MATCH_DEBOUNCE_MS = 160;
let matchDebounceTimer = null;
const RESULT_PAGE_SIZE = 60;
let resultRenderLimit = RESULT_PAGE_SIZE;
let lastGroupedResults = null;
let searchWorker = null;
let searchWorkerReady = false;
let searchWorkerSeq = 0;
const searchWorkerRequests = new Map();
const PIN_STORAGE_KEY = "tc_pins_v1";
let pinnedItems = [];
const PROJECT_STORAGE_KEY = "tc_project_current";
const PROJECT_RECENT_KEY = "tc_projects_recent";
let currentProject = "";
let recentProjects = [];
let libraryItemsCache = [];

function renderBrandFilters(brands) {
  if (!brandFilters) return;
  brandFilters.innerHTML = "";
  brands.forEach(rawBrand => {
    const brandName = (rawBrand || "").trim();
    if (!brandName) return;
    const label = document.createElement("label");
    label.className = "cursor-pointer";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "brand-filter peer sr-only";
    input.value = brandName;
    input.checked = true;

    const pill = document.createElement("span");
    pill.className = "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white/70 text-gray-700 shadow-sm transition duration-200 hover:shadow-md hover:-translate-y-px peer-checked:bg-indigo-50 peer-checked:border-indigo-500 peer-checked:text-indigo-700 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-400 peer-focus-visible:ring-offset-2";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "w-4 h-4 text-indigo-600 opacity-0 transition-opacity duration-150 peer-checked:opacity-100");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute("d", "M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0l-3.25-3.25a1 1 0 011.42-1.42l2.54 2.54 6.54-6.54a1 1 0 011.42 0z");
    path.setAttribute("clip-rule", "evenodd");
    svg.appendChild(path);

    const text = document.createElement("span");
    text.textContent = brandName;

    pill.appendChild(svg);
    pill.appendChild(text);
    label.appendChild(input);
    label.appendChild(pill);
    brandFilters.appendChild(label);
  });
}

function getUniqueBrands(list) {
  const brands = [];
  list.forEach(t => {
    const name = (t.brand || "").trim();
    if (!name || brands.includes(name)) return;
    brands.push(name);
  });
  return brands;
}

function formatFirestoreError(err, fallback = "Có lỗi Firestore") {
  const msg = (err && (err.message || err.code)) || "";
  const lower = msg.toLowerCase();
  if (lower.includes("permission-denied")) {
    return "Bạn chưa cấp quyền / rules đang chặn. Kiểm tra Firestore rules và đăng nhập.";
  }
  if (lower.includes("has not been used") || lower.includes("api not enabled")) {
    return "Firestore chưa bật API. Bật Cloud Firestore và thử lại.";
  }
  return msg || fallback;
}

function populateContributeBrands(brands = getUniqueBrands(threads)) {
  if (!contributeBrandSelect) return;
  contributeBrandSelect.innerHTML = '<option value="">Chọn hãng chỉ</option>';
  brands.forEach(b => {
    const opt = document.createElement("option");
    opt.value = b;
    opt.textContent = b;
    contributeBrandSelect.appendChild(opt);
  });
}

function openContributeModal() {
  populateContributeBrands();
  contributeOverlay?.classList.remove("hidden");
  if (contributeModal) {
    contributeModal.classList.remove("hidden");
    contributeModal.classList.add("flex");
  }
}

function closeContributeModal() {
  contributeOverlay?.classList.add("hidden");
  if (contributeModal) {
    contributeModal.classList.add("hidden");
    contributeModal.classList.remove("flex");
  }
  if (contributeBrandSelect) contributeBrandSelect.value = "";
  if (contributeBrandCustom) contributeBrandCustom.value = "";
  if (contributeCode) contributeCode.value = "";
  if (contributeName) contributeName.value = "";
  if (contributeHex) contributeHex.value = "";
}

async function loadPendingSubmissionsUI() {
  if (!verifyList) return;
  verifyList.innerHTML = "<div class='text-gray-500'>Đang tải...</div>";

  if (!ensureAuthReady() || !authApi?.db || !currentUser) {
    verifyList.innerHTML = "<div class='text-gray-500'>Cần đăng nhập.</div>";
    return;
  }
  try {
    await refreshAdmin(true);
    if (!isAdminUser) {
      verifyList.innerHTML = "<div class='text-red-600'>Bạn không có quyền xác minh (cần admin).</div>";
      return;
    }
    const subs = await listPendingSubmissions(authApi.db, 50);
    const withVotes = await Promise.all(
      subs.map(async (s) => {
        try {
          const summary = await getVoteSummary(authApi.db, s.id);
          return { ...s, summary };
        } catch (err) {
          if (isPermissionDenied(err)) {
            return { ...s, summary: { confirmCount: 0, rejectCount: 0 } };
          }
          throw err;
        }
      })
    );
    pendingSubmissions = withVotes;
    renderVerifyList();
  } catch (err) {
    if (isPermissionDenied(err)) {
      console.info("[verify] permission denied", { code: err?.code, msg: err?.message });
      verifyList.innerHTML = "<div class='text-red-600'>Bạn không có quyền xác minh (cần admin).</div>";
      return;
    }
    const friendly = typeof formatFirestoreError === "function" ? formatFirestoreError(err, "Lỗi tải submissions") : (err?.message || "Lỗi tải submissions");
    console.error(err);
    verifyList.innerHTML = `<div class='text-red-600'>${friendly}</div>`;
  }
}

function renderVerifyList() {
  if (!verifyList) return;
  if (!pendingSubmissions.length) {
    verifyList.innerHTML = "<div class='text-gray-500'>Không có submissions chờ.</div>";
    return;
  }
  verifyList.innerHTML = pendingSubmissions.map(item => {
    const summary = item.summary || { confirmCount: 0, rejectCount: 0 };
    const canApprove = isAdminUser;
    const createdAt = item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : "";
    return `
      <div class="border border-gray-200 rounded-xl p-3 shadow-sm">
        <div class="flex items-start gap-3 justify-between">
          <div class="space-y-1">
            <div class="font-semibold">${item.brand || ""} ${item.code || ""}</div>
            <div class="text-gray-600 text-sm">${item.name || ""}</div>
            <div class="flex items-center gap-2 text-sm">
              <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg border bg-gray-50">
                <span class="w-4 h-4 rounded border" style="background:${item.hex || "#fff"}"></span>
                <span>${item.hex || ""}</span>
              </span>
              <span class="text-gray-500">by ${item.createdByName || item.createdByUid || "?"}</span>
              ${createdAt ? `<span class="text-gray-400 text-xs">${createdAt}</span>` : ""}
            </div>
            <div class="text-xs text-gray-600">Xác nhận: ${summary.confirmCount} | Từ chối: ${summary.rejectCount}</div>
          </div>
          <div class="flex flex-col gap-2">
            <button data-action="vote-confirm" data-id="${item.id}" class="px-3 py-1 rounded-lg border text-emerald-700 border-emerald-200 hover:bg-emerald-50">Xác nhận</button>
            <button data-action="vote-reject" data-id="${item.id}" class="px-3 py-1 rounded-lg border text-rose-700 border-rose-200 hover:bg-rose-50">Từ chối</button>
            ${canApprove ? `<button data-action="approve" data-id="${item.id}" class="px-3 py-1 rounded-lg bg-amber-600 text-white hover:bg-amber-700">Duyệt</button>` : ""}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function openVerifyModal() {
  verifyOverlay?.classList.remove("hidden");
  if (verifyModal) {
    verifyModal.classList.remove("hidden");
    verifyModal.classList.add("flex");
  }
  loadPendingSubmissionsUI();
}

function closeVerifyModal() {
  verifyOverlay?.classList.add("hidden");
  if (verifyModal) {
    verifyModal.classList.add("hidden");
    verifyModal.classList.remove("flex");
  }
}

async function fetchVerifiedThreads() {
  if (!authApi?.db || typeof authApi.getDocs !== "function") return [];
  try {
    const ref = authApi.collection(authApi.db, "verifiedThreads");
    console.info("[fetchVerifiedThreads] path", ref.path || "verifiedThreads");
    const snap = await authApi.getDocs(ref);
    const raws = [];
    snap.forEach(d => {
      const data = d.data();
      if (!data) return;
      raws.push({
        ...data,
        source: { ...(data.source || {}), type: "CROWD_VERIFIED", provider: "firestore" },
        confidence: typeof data.confidence === "number" ? data.confidence : 0.85
      });
    });
    return normalizeAndDedupeThreads(raws, { source: { type: "CROWD_VERIFIED" }, confidence: 0.85 });
  } catch (err) {
    if (isPermissionDenied(err)) {
      console.info("[fetchVerifiedThreads] permission denied, skip verified threads");
      return [];
    }
    console.error(err);
    return [];
  }
}

function mergeVerifiedThreads(list) {
  if (!Array.isArray(list) || !list.length) return;
  const map = new Map();
  threads.forEach(t => {
    const key = t.canonicalKey || `${(t.brand || "").toLowerCase()}::${t.code}`;
    if (key) map.set(key, t);
  });
  list.forEach(v => {
    const key = v.canonicalKey || `${(v.brand || "").toLowerCase()}::${v.code}`;
    if (!key) return;
    const existing = map.get(key);
    if (existing) {
      const currentConf = typeof existing.confidence === "number" ? existing.confidence : 0;
      const verifiedConf = typeof v.confidence === "number" ? v.confidence : 0;
        if (verifiedConf > currentConf) {
        const altEntry = existing.hex ? {
          hex: existing.hex,
          rgb: existing.rgb,
          source: existing.source,
          confidence: existing.confidence
        } : null;
        const mergedAlt = [];
        if (v.alternates) mergedAlt.push(...v.alternates);
        if (altEntry) mergedAlt.push(altEntry);
          const updated = { ...existing, ...v, alternates: mergedAlt };
          updated.lab = getLabForHex(updated.hex);
          map.set(key, updated);
        } else {
        const altEntry = {
          hex: v.hex,
          rgb: v.rgb,
          source: v.source,
          confidence: v.confidence
        };
        const mergedAlt = existing.alternates ? [...existing.alternates] : [];
        mergedAlt.push(altEntry);
        existing.alternates = mergedAlt;
        map.set(key, existing);
      }
    } else {
      map.set(key, { ...v, lab: getLabForHex(v.hex) });
    }
  });
  threads = Array.from(map.values());
  matchCache.clear();
  rebuildIndexes(threads);
  const brands = getUniqueBrands(threads);
  renderBrandFilters(brands);
  populateContributeBrands(brands);
  if (lastChosenHex) {
    runSearch(lastChosenHex);
  }
}

const resultBox = document.getElementById("result");
const deltaSlider = document.getElementById("deltaSlider");
const deltaValueEls = document.querySelectorAll("#deltaValue, #deltaValueText");
const deltaMethodSelect = document.getElementById("deltaMethod");
const pinPanel = document.getElementById("pinPanel");
const pinList = document.getElementById("pinList");
const pinClear = document.getElementById("pinClear");
const brandFilters = document.getElementById("brandFilters");
const verifiedOnlyToggle = document.getElementById("verifiedOnlyToggle");
const btnFindNearest = document.getElementById("btnFindNearest");
const colorPicker = document.getElementById("colorPicker");
const codeInput = document.getElementById("codeInput");
const btnFindByCode = document.getElementById("btnFindByCode");
const imgInput = document.getElementById("imgInput");
const canvas = document.getElementById("canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

// Inspector elements
const drawer = document.getElementById("colorInspector");
const drawerOverlay = document.getElementById("inspectorOverlay");
const drawerCloseBtn = document.getElementById("inspectorClose");
const drawerTitle = document.getElementById("inspectorTitle");
const inspectorBrand = document.getElementById("inspectorBrand");
const inspectorCode = document.getElementById("inspectorCode");
const inspectorName = document.getElementById("inspectorName");
const inspectorDelta = document.getElementById("inspectorDelta");
const inspectorHex = document.getElementById("inspectorHex");
const inspectorRgb = document.getElementById("inspectorRgb");
const inspectorRgbString = document.getElementById("inspectorRgbString");
const inspectorLab = document.getElementById("inspectorLab");
const inspectorHsl = document.getElementById("inspectorHsl");
const previewMain = document.getElementById("previewMain");
const previewLight = document.getElementById("previewLight");
const previewDark = document.getElementById("previewDark");
const copyButtons = document.querySelectorAll("[data-copy]");
const copyAllBtn = document.getElementById("copyAll");
const toastContainer = document.getElementById("toastContainer");
const btnPickScreen = document.getElementById("btnPickScreen");
const eyedropperHint = document.getElementById("eyedropperHint");
const eyedropperFallback = document.getElementById("eyedropperFallback");
const fallbackColorPicker = document.getElementById("fallbackColorPicker");
const portalCtaWrap = document.getElementById("portalCtaWrap");
const portalCta = document.getElementById("portalCta");
function getAuthApi() {
  return window.firebaseAuth || null;
}
const authApi = new Proxy({}, {
  get: (_target, prop) => {
    const api = getAuthApi();
    return api ? api[prop] : undefined;
  }
});
function getAuthInitError() {
  return getAuthApi()?.initError || null;
}
function isPermissionDenied(err) {
  const msg = String(err?.message || "");
  return err?.code === "permission-denied" || msg.includes("Missing or insufficient permissions");
}
let hasBoundAuth = false;
function bindAuth() {
  const err = getAuthInitError();
  if (err) {
    console.error("Auth init error", err);
    return;
  }
  const api = getAuthApi();
  if (!api || typeof api.onAuthStateChanged !== "function") return;
  if (hasBoundAuth) return;
  api.onAuthStateChanged(updateUserUI);
  hasBoundAuth = true;
}
const libraryOverlay = document.getElementById("libraryOverlay");
const libraryModal = document.getElementById("libraryModal");
const libraryClose = document.getElementById("libraryClose");
let btnExportCsv = document.getElementById("btnExportCsv");
const libraryList = document.getElementById("libraryList");
const contributeOverlay = document.getElementById("contributeOverlay");
const contributeModal = document.getElementById("contributeModal");
const contributeClose = document.getElementById("contributeClose");
const contributeCancel = document.getElementById("contributeCancel");
const contributeBrandSelect = document.getElementById("contributeBrandSelect");
const contributeBrandCustom = document.getElementById("contributeBrandCustom");
const contributeCode = document.getElementById("contributeCode");
const contributeName = document.getElementById("contributeName");
const contributeHex = document.getElementById("contributeHex");
const contributeSubmit = document.getElementById("contributeSubmit");
const btnUseCurrentColor = document.getElementById("btnUseCurrentColor");
const verifyOverlay = document.getElementById("verifyOverlay");
const verifyModal = document.getElementById("verifyModal");
const verifyClose = document.getElementById("verifyClose");
const verifyList = document.getElementById("verifyList");
const hasToolUI = !!resultBox;

function loadThreads() {
  if (!hasToolUI) return;
  renderResultState("loading");
  const threadsUrl = new URL("./threads.json", import.meta.url);
  fetch(threadsUrl)
  .then(res => res.json())
  .then(data => {
    const normalized = normalizeAndDedupeThreads(data, {
      source: { type: "runtime_json" }
    });
    matchCache.clear();
    labCache.clear();
    threads = normalized.map(t => ({ ...t }));
    rebuildIndexes(threads);
    initSearchWorker(threads);
    const brands = getUniqueBrands(threads);
    renderBrandFilters(brands);
    populateContributeBrands(brands);
    fetchVerifiedThreads().then(list => {
      verifiedThreads = list;
      mergeVerifiedThreads(list);
    });
    isDataReady = true;

    renderResultState("ready");

    restoreInspectorFromUrl();
  })
  .catch(() => {
    renderResultState("error");
  });
}

if (hasToolUI) {
  loadThreads();
}


//======================= DATA LOADING =======================

//======================= CORE LOGIC =======================
function getSelectedBrands() {
  return [...document.querySelectorAll(".brand-filter:checked")].map(cb => cb.value);
}

function addTopK(list, item, limit) {
  if (list.length < limit) {
    list.push(item);
    return;
  }
  let worstIndex = 0;
  let worst = list[0].delta;
  for (let i = 1; i < list.length; i += 1) {
    if (list[i].delta > worst) {
      worst = list[i].delta;
      worstIndex = i;
    }
  }
  if (item.delta < worst) list[worstIndex] = item;
}

function findNearestColors(chosenHex, limit = 100, method = "76") {
  const normalized = normalizeHex(chosenHex);
  if (!normalized) return [];
  const chosenLab = getLabForHex(normalized);
  if (!chosenLab) return [];
  const brands = getSelectedBrands();
  if (!brands.length) return [];
  const requireVerified = useVerifiedOnly;
  const lists = brands.map(brand => threadsByBrand.get(brand) || []);
  if (!lists.length) return [];

  if (method === "2000") {
    const candidateCount = Math.max(limit * 20, 200);
    const candidates = [];
    for (const list of lists) {
      for (const thread of list) {
        if (requireVerified && !isVerifiedThread(thread)) continue;
        const lab = ensureLab(thread);
        if (!lab) continue;
        const deltaFast = deltaE76(chosenLab, lab);
        addTopK(candidates, { thread, lab, delta: deltaFast }, candidateCount);
      }
    }
    const results = [];
    for (const candidate of candidates) {
      const delta = deltaE2000(chosenLab, candidate.lab);
      addTopK(results, { ...candidate.thread, lab: candidate.lab, delta }, limit);
    }
    return results.sort((a, b) => a.delta - b.delta);
  }

  const results = [];
  for (const list of lists) {
    for (const thread of list) {
      if (requireVerified && !isVerifiedThread(thread)) continue;
      const lab = ensureLab(thread);
      if (!lab) continue;
      const delta = deltaE76(chosenLab, lab);
      addTopK(results, { ...thread, lab, delta }, limit);
    }
  }
  return results.sort((a, b) => a.delta - b.delta);
}

function parseCodeQuery(raw) {
  const trimmed = String(raw || "").trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();

  for (const entry of brandNamesSorted) {
    if (!entry?.name) continue;
    const nameLower = entry.name.toLowerCase();
    if (lower.startsWith(nameLower + " ")) {
      const codePart = trimmed.slice(entry.name.length).trim();
      const codeKey = normalizeCodeKey(codePart);
      if (codeKey) {
        return { mode: "brand", brand: entry.name, brandKey: entry.key, codeKey };
      }
    }
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    const possibleBrand = parts.slice(0, -1).join(" ");
    const brandKey = normalizeBrandKey(possibleBrand);
    const mappedBrand = brandKeyToName.get(brandKey);
    const codeKey = normalizeCodeKey(parts[parts.length - 1]);
    if (mappedBrand && codeKey) {
      return { mode: "brand", brand: mappedBrand, brandKey, codeKey };
    }
  }

  const codeKey = normalizeCodeKey(trimmed);
  if (codeKey) return { mode: "code", codeKey };
  return null;
}

function renderCodeLookupResults(codeLabel, items) {
  if (!resultBox) return;
  const count = items.length;
  const title = count
    ? t("tc.code.found", "Tìm thấy {count} kết quả cho mã {code}.", { count, code: codeLabel })
    : t("tc.code.notFound", "Không tìm thấy kết quả cho mã {code}.", { code: codeLabel });
  const header = `<div class="mb-4 text-sm tc-muted">${title}</div>`;
  if (!count) {
    resultBox.innerHTML = header;
    return;
  }
  const cards = items.map(item => renderColorCard(item, item.hex)).join("");
  resultBox.innerHTML = `${header}<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">${cards}</div>`;
}

function initSearchWorker(payloadThreads) {
  if (searchWorkerReady || typeof Worker === "undefined") return;
  try {
    searchWorker = new Worker(new URL("./workers/thread_search.worker.js", import.meta.url), { type: "module" });
  } catch (err) {
    searchWorker = null;
    return;
  }
  searchWorker.onmessage = (event) => {
    const data = event.data || {};
    if (data.type === "ready") {
      searchWorkerReady = true;
      return;
    }
    const entry = searchWorkerRequests.get(data.id);
    if (!entry) return;
    searchWorkerRequests.delete(data.id);
    if (data.error) {
      entry.reject(new Error(data.error));
      return;
    }
    entry.resolve(data.results || []);
  };
  searchWorker.postMessage({ type: "init", threads: payloadThreads || [] });
}

function searchNearestAsync(chosenHex, limit, method) {
  if (!searchWorker || !searchWorkerReady) {
    return Promise.resolve(findNearestColors(chosenHex, limit, method));
  }
  const normalized = normalizeHex(chosenHex);
  if (!normalized) return Promise.resolve([]);
  const brands = getSelectedBrands();
  const payload = {
    targetHex: normalized,
    brands,
    verifiedOnly: useVerifiedOnly,
    method,
    limit
  };
  return new Promise((resolve, reject) => {
    const id = ++searchWorkerSeq;
    searchWorkerRequests.set(id, { resolve, reject });
    searchWorker.postMessage({ type: "search", id, payload });
  }).catch(() => findNearestColors(chosenHex, limit, method));
}

function groupByColorSimilarity(colors, threshold = 2.5, method = "76") {
  const groups = [];
  colors.forEach(c => {
    const g = groups.find(gr => getDelta(c.lab, gr.leader.lab, method) <= threshold);
    g ? g.items.push(c) : groups.push({ leader: c, items: [c] });
  });
  return groups;
}

function buildMatchCacheKey(hex, threshold, method) {
  const normalized = normalizeHex(hex);
  const brands = getSelectedBrands().slice().sort();
  return [
    normalized || "",
    useVerifiedOnly ? "1" : "0",
    method,
    threshold.toFixed(2),
    brands.join("|")
  ].join("::");
}

function setMatchCache(key, value) {
  if (matchCache.has(key)) {
    matchCache.delete(key);
  }
  matchCache.set(key, value);
  if (matchCache.size > MATCH_CACHE_LIMIT) {
    const oldest = matchCache.keys().next().value;
    if (oldest) matchCache.delete(oldest);
  }
}

async function runSearch(hex) {
  const normalized = normalizeHex(hex);
  if (!normalized) return;
  lastChosenHex = normalized;
  const method = currentDeltaMethod;
  const key = buildMatchCacheKey(normalized, currentDeltaThreshold, method);
  const cached = matchCache.get(key);
  if (cached) {
    lastResults = cached.base;
    showGroupedResults(cached.grouped, normalized);
    return;
  }
  renderResultState("loading");
  const base = await searchNearestAsync(normalized, 100, method);
  const filtered = base.filter(t => t.delta <= currentDeltaThreshold);
  if (!filtered.length) {
    lastResults = base;
    lastGroupedResults = null;
    currentRendered = [];
    resultRenderLimit = RESULT_PAGE_SIZE;
    renderResultState("no-results");
    return;
  }
  const grouped = groupByColorSimilarity(filtered, currentDeltaThreshold, method);
  lastResults = base;
  setMatchCache(key, { base, grouped });
  showGroupedResults(grouped, normalized);
}

function scheduleSearch(hex) {
  if (matchDebounceTimer) window.clearTimeout(matchDebounceTimer);
  matchDebounceTimer = window.setTimeout(() => {
    runSearch(hex);
  }, MATCH_DEBOUNCE_MS);
}

function renderResultState(type) {
  if (!resultBox) return;
  if (type === "loading") {
    resultBox.innerHTML = `<p class='text-gray-500 text-center'>${t("tc.status.loading", "Đang chuẩn bị dữ liệu...")}</p>`;
    return;
  }
  if (type === "ready") {
    const readyText = t("tc.status.ready", "Xong. Dữ liệu đã sẵn sàng.");
    const emptyText = t("tc.status.empty", "Chưa chọn màu — hãy chọn màu trực tiếp hoặc từ ảnh.");
    resultBox.innerHTML = `<div class='text-center space-y-1'>
      <p class='text-gray-500'>${readyText}</p>
      <p class='text-gray-500'>${emptyText}</p>
    </div>`;
    return;
  }
  if (type === "no-results") {
    const noResults = t("tc.status.noResults", "Không tìm thấy kết quả trong ngưỡng ΔE hiện tại. Thử tăng ΔE hoặc chọn thêm hãng.");
    resultBox.innerHTML = `<p class='text-gray-500 text-center'>${noResults}</p>`;
    return;
  }
  if (type === "error") {
    const errText = t("tc.status.error", "Lỗi tải dữ liệu. Vui lòng thử lại.");
    const retryText = t("tc.status.retry", "Thử lại");
    resultBox.innerHTML = `<div class='text-center space-y-3'>
      <p class='text-red-600'>${errText}</p>
      <button class="tc-btn tc-chip px-4 py-2" data-action="retry-load">${retryText}</button>
    </div>`;
  }
}

function loadPins() {
  try {
    const raw = localStorage.getItem(PIN_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    pinnedItems = Array.isArray(parsed) ? parsed.slice(0, 3) : [];
  } catch (err) {
    pinnedItems = [];
  }
  renderPinPanel();
  syncPinButtons();
}

function savePins() {
  try {
    localStorage.setItem(PIN_STORAGE_KEY, JSON.stringify(pinnedItems));
  } catch (err) {}
}

function isPinned(hex) {
  const normalized = normalizeHex(hex);
  return pinnedItems.some(item => item.hex === normalized);
}

function renderPinPanel() {
  if (!pinPanel || !pinList) return;
  if (!pinnedItems.length) {
    pinPanel.classList.add("hidden");
    pinList.innerHTML = "";
    return;
  }
  pinPanel.classList.remove("hidden");
  pinList.innerHTML = pinnedItems.map(item => {
    const deltaText = typeof item.delta === "number" ? item.delta.toFixed(2) : item.delta || "";
    return `
      <div class="pin-item flex items-center gap-3" data-hex="${item.hex}">
        <div class="pin-swatch" style="background:${item.hex}"></div>
        <div class="flex-1 min-w-0">
          <div class="font-semibold truncate">${item.brand || ""} ${item.code || ""}</div>
          <div class="tc-muted text-xs">ΔE ${deltaText}</div>
        </div>
        <div class="pin-actions flex items-center gap-2">
          <button data-action="pin-copy" data-hex="${item.hex}">${t("tc.pin.copyCode", "Sao chép mã")}</button>
          <button data-action="pin-remove" data-hex="${item.hex}">${t("tc.pin.remove", "Bỏ ghim")}</button>
        </div>
      </div>
    `;
  }).join("");
}

function addPin(item) {
  if (pinnedItems.length >= 3) {
    showToast(t("tc.pin.limit", "Chỉ ghim tối đa {count} kết quả.", { count: 3 }));
    return false;
  }
  pinnedItems.push(item);
  savePins();
  renderPinPanel();
  syncPinButtons();
  return true;
}

function removePin(hex) {
  const normalized = normalizeHex(hex);
  pinnedItems = pinnedItems.filter(item => item.hex !== normalized);
  savePins();
  renderPinPanel();
  syncPinButtons();
}

function updatePinButton(btn, pinned) {
  if (!btn) return;
  btn.dataset.pinned = pinned ? "1" : "0";
  btn.textContent = pinned ? t("tc.pin.unpin", "Bỏ ghim") : t("tc.pin.pin", "Ghim");
}

function syncPinButtons() {
  document.querySelectorAll('[data-action="pin-toggle"]').forEach((btn) => {
    const hex = btn.dataset.hex;
    updatePinButton(btn, isPinned(hex));
  });
}

function loadProjectPrefs() {
  try {
    currentProject = localStorage.getItem(PROJECT_STORAGE_KEY) || "";
  } catch (err) {
    currentProject = "";
  }
  try {
    const raw = localStorage.getItem(PROJECT_RECENT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    recentProjects = Array.isArray(parsed) ? parsed.slice(0, 10) : [];
  } catch (err) {
    recentProjects = [];
  }
}

function saveProjectPrefs(name) {
  const trimmed = (name || "").trim();
  currentProject = trimmed;
  if (trimmed) {
    recentProjects = [trimmed, ...recentProjects.filter(p => p !== trimmed)].slice(0, 10);
  }
  try {
    localStorage.setItem(PROJECT_STORAGE_KEY, currentProject);
    localStorage.setItem(PROJECT_RECENT_KEY, JSON.stringify(recentProjects));
  } catch (err) {}
}

function bindProjectInput() {
  const input = document.getElementById("projectInput");
  const list = document.getElementById("projectList");
  if (!input || !list) return;
  input.placeholder = t("tc.project.placeholder", "Nhập tên dự án");
  input.setAttribute("aria-label", t("tc.project.label", "Dự án"));
  input.value = currentProject || "";
  list.innerHTML = recentProjects.map(item => `<option value="${item}"></option>`).join("");
  if (input.dataset.bound === "1") return;
  input.dataset.bound = "1";
  input.addEventListener("input", () => {
    saveProjectPrefs(input.value);
  });
}

//======================= RENDERING =======================


// Không dùng tên biến/param `t` cho item vì `t()` là hàm i18n.
function renderColorCard(item, chosenHex) {
  const deltaText = typeof item.delta === "number" ? item.delta.toFixed(2) : "";
  const labAttr = item.lab ? item.lab.join(",") : "";
  const pinned = isPinned(item.hex);
  const saveLabel = t("tc.result.save", "Lưu");
  const pinLabel = pinned ? t("tc.pin.unpin", "Bỏ ghim") : t("tc.pin.pin", "Ghim");
  const copyCodeLabel = t("tc.result.copyCode", "Sao chép mã");
  const copyFullLabel = t("tc.result.copyFull", "Sao chép đầy đủ");
  return `
    <div class="result-item rounded-xl shadow-md bg-white p-3 hover:scale-[1.02] transition border border-transparent data-[selected=true]:border-indigo-400 data-[selected=true]:shadow-lg cursor-pointer"
         data-hex="${item.hex}" data-brand="${item.brand || ""}" data-code="${item.code || ""}" data-name="${item.name || ""}" data-delta="${deltaText}" data-lab="${labAttr}">
      <div class="flex gap-3 items-center">
        <div class="w-12 h-12 rounded-lg border" style="background:${item.hex}"></div>
        <div class="flex-1 text-sm">
          <div class="font-semibold">${item.brand || ""} ${item.code || ""}</div>
          <div class="text-gray-600">${item.name || ""}</div>

          <div class="text-xs text-gray-500">ΔE ${deltaText}</div>

        </div>
      </div>
      <div class="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <div class="w-4 h-4 rounded border" style="background:${chosenHex}"></div>
        <span>so với</span>
        <div class="w-4 h-4 rounded border" style="background:${item.hex}"></div>
      </div>
      <div class="mt-3 flex justify-end">
        <button class="btn-save px-3 py-1 text-xs rounded-lg border text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                data-action="save-search" data-save-hex="${item.hex}">
          ${saveLabel}
        </button>
        <button class="btn-pin ml-2 px-3 py-1 text-xs rounded-lg border"
                data-action="pin-toggle" data-hex="${item.hex}" data-pinned="${pinned ? "1" : "0"}">
          ${pinLabel}
        </button>
        <button class="btn-copy-code ml-2 px-3 py-1 text-xs rounded-lg border"
                data-action="copy-code">
          ${copyCodeLabel}
        </button>
        <button class="btn-copy-full ml-2 px-3 py-1 text-xs rounded-lg border"
                data-action="copy-full">
          ${copyFullLabel}
        </button>
      </div>
    </div>
  `;
}

function renderGroupedResults(groups, chosenHex, limit) {
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  const chosenLabel = t("tc.result.chosen", "Màu đã chọn");
  const projectLabel = t("tc.project.label", "Dự án");
  const projectPlaceholder = t("tc.project.placeholder", "Nhập tên dự án");
  const projectBlock = `
    <div class="flex flex-wrap items-center gap-3 mb-4">
      <label for="projectInput" class="text-sm tc-muted">${projectLabel}</label>
      <input id="projectInput" class="tc-field text-sm" list="projectList" data-i18n-attr="placeholder:tc.project.placeholder" placeholder="${projectPlaceholder}">
      <datalist id="projectList"></datalist>
    </div>
  `;
  let remaining = limit;
  const sections = groups.map((group, i) => {
    if (remaining <= 0) return "";
    const items = group.items.slice(0, remaining);
    remaining -= items.length;
    if (!items.length) return "";
    const groupLabel = t("tc.result.group", "Nhóm {index}", { index: i + 1 });
    const colorsLabel = t("tc.result.colors", "{count} màu", { count: group.items.length });
    return `
      <section class="mb-8">
        <h3 class="font-semibold mb-3 text-gray-700 flex items-center gap-2">
  <span>${groupLabel}</span>
  <span class="inline-block w-3 h-3 rounded-sm border" style="background:${chosenHex}"></span>
  <span>${colorsLabel}</span>
</h3>


        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          ${items.map(item => renderColorCard(item, chosenHex)).join("")}
        </div>
      </section>
    `;
  }).join("");
  const moreLabel = t("tc.result.loadMore", `Xem thêm (${total - limit})`, { count: total - limit });
  const moreButton = total > limit
    ? `<div class="mt-6 flex justify-center">
        <button class="tc-btn tc-chip px-4 py-2" data-action="load-more-results">${moreLabel}</button>
      </div>`
    : "";
  resultBox.innerHTML = `
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-lg border" style="background:${chosenHex}"></div>
      <div class="font-semibold">${chosenLabel}</div>
    </div>
    ${projectBlock}
    ${sections}
    ${moreButton}
  `;
}

function showGroupedResults(groups, chosenHex) {
  currentRendered = groups.flatMap(g => g.items);
  lastGroupedResults = groups;
  const total = currentRendered.length;
  resultRenderLimit = Math.min(RESULT_PAGE_SIZE, total);
  renderGroupedResults(groups, chosenHex, resultRenderLimit);
  bindProjectInput();
}

function loadMoreResults() {
  if (!lastGroupedResults || !lastChosenHex) return;
  const total = lastGroupedResults.reduce((sum, group) => sum + group.items.length, 0);
  resultRenderLimit = Math.min(resultRenderLimit + RESULT_PAGE_SIZE, total);
  renderGroupedResults(lastGroupedResults, lastChosenHex, resultRenderLimit);
}

//======================= INSPECTOR =======================
function setSelectedItem(el) {
  if (selectedItemEl === el) return;
  if (selectedItemEl) selectedItemEl.dataset.selected = "false";
  selectedItemEl = el;
  if (selectedItemEl) selectedItemEl.dataset.selected = "true";
}

function showToast(text) {
  if (!toastContainer) {
    if (text) console.info("[toast]", text);
    return;
  }
  const item = document.createElement("div");
  item.className = "bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg animate-fade-in-up";
  item.textContent = text;
  toastContainer.appendChild(item);
  setTimeout(() => {
    item.classList.add("opacity-0", "translate-y-1");
    setTimeout(() => item.remove(), 400);
  }, 1500);
}

function copyToClipboard(text, label) {
  if (!text) return;
  const message = label
    ? t("tc.toast.copiedWith", "Đã sao chép {label}.", { label })
    : t("tc.toast.copied", "Đã sao chép!");
  const fallbackCopy = () => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();

    try { document.execCommand("copy"); showToast(message); } catch (e) {}

    ta.remove();
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {

      showToast(message);

    }).catch(() => fallbackCopy());
  } else {
    fallbackCopy();
  }
}

function populateInspector(data) {
  const { hex, brand, code, name, delta, lab } = data;
  const normalizedHex = normalizeHex(hex);
  if (!normalizedHex) return;
  const { rgbArray, rgbString } = hexToRgbString(normalizedHex);
  const labValues = lab && lab.length === 3 ? lab : rgbToLab(rgbArray);
  const hsl = hexToHsl(rgbArray);

  previewMain.style.background = normalizedHex;
  previewLight.style.background = normalizedHex;
  previewDark.style.background = normalizedHex;

  inspectorHex.textContent = normalizedHex;
  inspectorRgb.textContent = rgbArray.join(", ");
  inspectorRgbString.textContent = rgbString;
  inspectorLab.textContent = formatLab(labValues).join(", ");
  inspectorHsl.textContent = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;


  inspectorBrand.textContent = brand || "—";
  inspectorCode.textContent = code || "—";
  inspectorName.textContent = name || "—";
  inspectorDelta.textContent = delta ? `ΔE ${delta}` : "—";
  drawerTitle.textContent = "Bảng thông tin màu";
  drawer.dataset.hex = normalizedHex;
}

function openInspector(data, triggerEl) {
  populateInspector(data);
  lastFocusedItem = triggerEl || null;
  drawer.classList.remove("translate-x-full", "md:translate-x-full", "translate-y-full");
  drawer.classList.add("open");
  drawerOverlay.classList.remove("pointer-events-none", "opacity-0");
  drawerOverlay.classList.add("opacity-50");
  (drawerCloseBtn || drawer).focus();
  updateUrlWithColor(data.hex);
}

function closeInspector() {
  drawer.classList.add("translate-x-full", "md:translate-x-full", "translate-y-full");
  drawer.classList.remove("open");
  drawerOverlay.classList.add("pointer-events-none", "opacity-0");
  drawerOverlay.classList.remove("opacity-50");
  if (selectedItemEl) selectedItemEl.dataset.selected = "false";
  selectedItemEl = null;
  clearUrlColor();
  if (lastFocusedItem) lastFocusedItem.focus();
}

function handleResultClick(e) {
  const card = e.target.closest(".result-item");
  if (!card) return;
  const hex = card.dataset.hex;
  if (!hex) return;
  const labData = card.dataset.lab ? card.dataset.lab.split(",").map(Number) : null;
  setSelectedItem(card);
  openInspector({
    hex,
    brand: card.dataset.brand,
    code: card.dataset.code,
    name: card.dataset.name,
    delta: card.dataset.delta,
    lab: labData
  }, card);
}

function handleResultContainerClick(e) {
  const retryBtn = e.target.closest('[data-action="retry-load"]');
  if (retryBtn) {
    e.preventDefault();
    if (typeof loadThreads === "function") loadThreads();
    return;
  }
  const loadMoreBtn = e.target.closest('[data-action="load-more-results"]');
  if (loadMoreBtn) {
    e.preventDefault();
    loadMoreResults();
    return;
  }
  const pinBtn = e.target.closest('[data-action="pin-toggle"]');
  if (pinBtn) {
    e.preventDefault();
    e.stopPropagation();
    const card = pinBtn.closest(".result-item");
    const hex = pinBtn.dataset.hex || card?.dataset?.hex;
    if (!hex) return;
    if (isPinned(hex)) {
      removePin(hex);
      updatePinButton(pinBtn, false);
      return;
    }
    const pinnedItem = {
      hex: normalizeHex(hex),
      brand: card?.dataset?.brand || "",
      code: card?.dataset?.code || "",
      delta: card?.dataset?.delta || ""
    };
    if (addPin(pinnedItem)) {
      updatePinButton(pinBtn, true);
    }
    return;
  }
  const copyCodeBtn = e.target.closest('[data-action="copy-code"]');
  if (copyCodeBtn) {
    e.preventDefault();
    e.stopPropagation();
    const card = copyCodeBtn.closest(".result-item");
    if (!card) return;
    const brand = (card.dataset.brand || "").trim();
    const code = (card.dataset.code || "").trim();
    const label = t("tc.result.copyCode", "Sao chép mã");
    const text = [brand, code].filter(Boolean).join(" ");
    if (text) copyToClipboard(text, label);
    return;
  }
  const copyFullBtn = e.target.closest('[data-action="copy-full"]');
  if (copyFullBtn) {
    e.preventDefault();
    e.stopPropagation();
    const card = copyFullBtn.closest(".result-item");
    if (!card) return;
    const brand = (card.dataset.brand || "").trim();
    const code = (card.dataset.code || "").trim();
    const name = (card.dataset.name || "").trim();
    const hex = (card.dataset.hex || "").trim();
    const label = t("tc.result.copyFull", "Sao chép đầy đủ");
    const text = [brand, code, name, hex].filter(Boolean).join(" | ");
    if (text) copyToClipboard(text, label);
    return;
  }
  const saveBtn = e.target.closest("[data-action=\"save-search\"]");
  if (saveBtn) {
    e.preventDefault();
    e.stopPropagation();
    handleSaveCurrentEnhanced(saveBtn);
    return;
  }
  handleResultClick(e);
}

async function handleSaveCurrentEnhanced(saveBtn) {
  const initErr = getAuthInitError();
  if (initErr) {
    const msg = `${initErr?.name || "Firebase"}: ${initErr?.message || "Loi khoi tao"}`;
    console.error(initErr);
    showToast(msg);
    return false;
  }
  if (!ensureAuthReady()) return;
  const api = getAuthApi();
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth(t("tc.auth.needLoginSave", "Cần đăng nhập để lưu."));
    return;
  }
  const card = saveBtn?.closest(".result-item");
  const cardHex = normalizeHex(card?.dataset?.hex || lastChosenHex);
  const cardBrand = card?.dataset?.brand || "";
  const cardCode = card?.dataset?.code || "";
  const cardName = card?.dataset?.name || "";
  if (!currentRendered.length || !cardHex) {
    showToast(t("tc.result.noDataSave", "Không có dữ liệu để lưu."));
    return;
  }
  console.info("[save] card data", { hex: cardHex, brand: cardBrand, code: cardCode, name: cardName });
  showToast(t("tc.result.saving", "Đang lưu..."));
  const resetSaveBtn = (text = t("tc.result.save", "Lưu")) => {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = text;
    }
  };
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.textContent = t("tc.result.saving", "Đang lưu...");
  }
  try {
    const payload = {
      inputHex: cardHex,
      project: currentProject || "",
      selectedBrands: getSelectedBrands(),
      deltaThreshold: currentDeltaThreshold,
      results: currentRendered.slice(0, 20).map(t => ({
        brand: t.brand,
        code: t.code,
        name: t.name,
        hex: t.hex,
        delta: t.delta
      }))
    };
    const docRef = await saveSearch(api.db, user.uid, payload);
    console.info("[save] saved doc id", docRef?.id);
    if (saveBtn) {
      saveBtn.textContent = t("tc.result.saved", "Đã lưu");
      setTimeout(() => resetSaveBtn(t("tc.result.save", "Lưu")), 1500);
    }
    showToast(t("tc.result.saved", "Đã lưu"));
    if (libraryModal && !libraryModal.classList.contains("hidden")) {
        await loadLibraryListV2();
    }
  } catch (err) {
    console.error("[save] failed", err);
    const friendly = formatFirestoreError(err, "Luu that bai");
    showToast(friendly);
    resetSaveBtn("Lưu");
  }
}

function updateUrlWithColor(hex) {
  const url = new URL(window.location.href);
  url.hash = `color=${encodeURIComponent(hex)}`;
  history.replaceState(null, "", url.toString());
}

function clearUrlColor() {
  const url = new URL(window.location.href);
  if (url.hash.startsWith("#color=")) {
    url.hash = "";
    history.replaceState(null, "", url.toString());
  }
}

function getColorFromUrl() {
  const url = new URL(window.location.href);
  if (url.searchParams.get("color")) return url.searchParams.get("color");
  if (url.hash && url.hash.startsWith("#color=")) return decodeURIComponent(url.hash.replace("#color=", ""));
  if (url.hash) return decodeURIComponent(url.hash.slice(1));
  return null;
}

function restoreInspectorFromUrl() {
  const colorFromUrl = getColorFromUrl();
  const normalized = normalizeHex(colorFromUrl);
  if (!normalized) return;
  const card = document.querySelector(`.result-item[data-hex="${normalized}"]`);
  if (card) {
    handleResultClick({ target: card });
    return;
  }
  const thread = threads.find(t => t.hex.toLowerCase() === normalized.toLowerCase());
  const labData = thread ? ensureLab(thread) : getLabForHex(normalized);
  openInspector({
    hex: normalized,
    brand: thread?.brand || "",
    code: thread?.code || "",
    name: thread?.name || "",
    delta: "",
    lab: labData
  }, null);
}

//==================== AUTH GATE / AUTH STATE ====================
const openAuth = (message) => {
  const fallback = t("tc.auth.needLogin", "Cần đăng nhập để tiếp tục.");
  const resolved = typeof message === "string" && message.trim() ? message : fallback;
  const cleaned = /[ÃÂÄÆáº]/.test(resolved) ? fallback : resolved;
  showToast(cleaned);
  window.tcAuth?.openAuth?.();
};

let lastAdminUid = null;
let lastAdminValue = null;
async function updateUserUI(user) {
  currentUser = user || null;
  if (user && authApi?.db) {
    if (hasToolUI) {
      if (lastAdminUid === user.uid && lastAdminValue === true) {
        isAdminUser = true;
      } else {
        await refreshAdmin(true);
      }
    }
    return;
  }
  isAdminUser = false;
  lastAdminUid = null;
  lastAdminValue = null;
}

async function refreshAdmin(force = false) {
  const user = authApi?.auth?.currentUser || currentUser;
  if (!authApi?.db || !user?.uid) {
    isAdminUser = false;
    lastAdminUid = user?.uid || null;
    lastAdminValue = null;
    return false;
  }
  if (!force && lastAdminUid === user.uid && lastAdminValue === true) {
    isAdminUser = true;
    return true;
  }
  try {
    if (typeof user.getIdToken === "function") {
      await user.getIdToken();
    }
    const val = await isAdmin(authApi.db, user.uid);
    isAdminUser = !!val;
    lastAdminUid = user.uid;
    lastAdminValue = isAdminUser;
    return isAdminUser;
  } catch (err) {
    if (isPermissionDenied(err)) {
      console.info("[isAdmin] permission denied -> treat as non-admin");
      isAdminUser = false;
      lastAdminUid = user.uid;
      lastAdminValue = false;
      return false;
    }
    console.error(err);
    isAdminUser = false;
    lastAdminUid = user.uid;
    lastAdminValue = false;
    return false;
  }
}

function ensureAuthReady() {
  const initErr = getAuthInitError();
  if (initErr) {
    console.error(initErr);
    showToast(`${initErr?.name || "Firebase"}: ${initErr?.message || "Lỗi khởi tạo"}`);
    return false;
  }
  const api = getAuthApi();
  if (!api || typeof api.onAuthStateChanged !== "function") {
    showToast("Firebase init error: missing firebaseConfig");
    return false;
  }
  return true;
}
async function loadLibraryList() {
  if (!libraryList) return;
  const api = getAuthApi();
  if (!ensureAuthReady()) return;
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth("Cần đăng nhập để xem thư viện.");
    return;
  }
  libraryList.innerHTML = "<div class='text-gray-500'>Đang tải...</div>";
  try {
    const { items } = await listSavedSearches(api.db, user.uid, 50);
    if (!items.length) {
      libraryList.innerHTML = "<div class='text-gray-500'>Chưa có bản lưu</div>";
      return;
    }
    libraryList.innerHTML = items.map(it => {
      const ts = it.createdAt && typeof it.createdAt.toDate === "function" ? it.createdAt.toDate().toLocaleString() : "";
      return `
        <div class="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
          <div>
            <div class="font-semibold text-gray-800">${it.inputHex || ""}</div>
            <div class="text-xs text-gray-500">${ts}</div>
          </div>
          <button data-action="open-saved" data-id="${it.id}" class="px-3 py-1 rounded-lg border bg-white hover:bg-gray-50 text-indigo-700">Mở</button>
        </div>
      `;
    }).join("");
  } catch (err) {
    console.error("Tải thư viện thất bại", err);
    const friendly = formatFirestoreError(err, "Không tải được Library");
    libraryList.innerHTML = `<div class='text-red-600'>${friendly}</div>`;
  }
}

function ensureLibraryControls() {
  const header = document.querySelector("#libraryModal .border-b");
  if (!header) return;
  const title = header.querySelector("h3");
  if (title) title.textContent = t("tc.library.title", "Thư viện của tôi");
  let actions = header.querySelector("[data-library-actions]");
  if (!actions) {
    actions = document.createElement("div");
    actions.className = "flex items-center gap-2";
    actions.dataset.libraryActions = "1";
    const closeBtn = document.getElementById("libraryClose");
    if (closeBtn) actions.appendChild(closeBtn);
    header.appendChild(actions);
  }
  if (!document.getElementById("btnExportCsv")) {
    const exportBtn = document.createElement("button");
    exportBtn.id = "btnExportCsv";
    exportBtn.className = "tc-btn tc-chip px-3 py-1 text-xs";
    actions.insertBefore(exportBtn, actions.firstChild);
  }
  btnExportCsv = document.getElementById("btnExportCsv");
  if (btnExportCsv) {
    btnExportCsv.textContent = t("tc.library.export", "Xuất CSV");
    if (btnExportCsv.dataset.bound !== "1") {
      btnExportCsv.dataset.bound = "1";
      btnExportCsv.addEventListener("click", exportLibraryCsv);
    }
  }
  const closeBtn = document.getElementById("libraryClose");
  if (closeBtn) {
    closeBtn.setAttribute("aria-label", t("tc.action.close", "Đóng"));
  }
}

async function loadLibraryListV2() {
  if (!libraryList) return;
  ensureLibraryControls();
  const api = getAuthApi();
  if (!ensureAuthReady()) return;
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth(t("tc.auth.needLoginLibrary", "Cần đăng nhập để xem thư viện."));
    return;
  }
  libraryList.innerHTML = `<div class='text-gray-500'>${t("tc.library.loading", "Đang tải...")}</div>`;
  try {
    const { items } = await listSavedSearches(api.db, user.uid, 50);
    libraryItemsCache = items || [];
    if (!items.length) {
      libraryList.innerHTML = `<div class='text-gray-500'>${t("tc.library.empty", "Chưa có bản lưu")}</div>`;
      return;
    }
    const fromItems = items.map(it => (it.project || "").trim()).filter(Boolean);
    if (fromItems.length) {
      recentProjects = [...new Set([...fromItems, ...recentProjects])].slice(0, 10);
      saveProjectPrefs(currentProject);
    }
    libraryList.innerHTML = items.map(it => {
      const ts = it.createdAt && typeof it.createdAt.toDate === "function" ? it.createdAt.toDate().toLocaleString() : "";
      const projectLine = it.project ? `<div class="text-xs tc-muted">${t("tc.project.label", "Dự án")}: ${it.project}</div>` : "";
      return `
        <div class="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
          <div>
            <div class="font-semibold text-gray-800">${it.inputHex || ""}</div>
            ${projectLine}
            <div class="text-xs text-gray-500">${ts}</div>
          </div>
          <button data-action="open-saved" data-id="${it.id}" class="px-3 py-1 rounded-lg border bg-white hover:bg-gray-50 text-indigo-700">${t("tc.library.open", "Mở")}</button>
        </div>
      `;
    }).join("");
  } catch (err) {
    console.error("Tải thư viện thất bại", err);
    const friendly = formatFirestoreError(err, t("tc.library.error", "Không tải được thư viện"));
    libraryItemsCache = [];
    libraryList.innerHTML = `<div class='text-red-600'>${friendly}</div>`;
  }
}

function exportLibraryCsv() {
  if (!libraryItemsCache.length) {
    showToast(t("tc.library.empty", "Chưa có bản lưu"));
    return;
  }
  const header = ["project", "brand", "code", "hex", "deltaE", "note", "createdAt"];
  const rows = libraryItemsCache.map(item => {
    const top = item.topMatch || (item.results || [])[0] || {};
    const createdAt = item.createdAt && typeof item.createdAt.toDate === "function"
      ? item.createdAt.toDate().toISOString()
      : "";
    return [
      item.project || "",
      top.brand || "",
      top.code || "",
      top.hex || "",
      typeof top.delta === "number" ? top.delta.toFixed(2) : (top.delta || ""),
      "",
      createdAt
    ];
  });
  const escapeCsv = (value) => {
    const str = String(value ?? "");
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, "\"\"")}"` : str;
  };
  const csv = [header.join(","), ...rows.map(row => row.map(escapeCsv).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "threadcolor-library.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast(t("tc.library.exported", "Đã xuất CSV"));
}

//======================= SAVE CURRENT =======================
async function handleSaveCurrent(saveBtn) {
  const initErr = getAuthInitError();
  if (initErr) {
    const msg = `${initErr?.name || "Firebase"}: ${initErr?.message || "Lỗi khởi tạo"}`;
    console.error(initErr);
    showToast(msg);
    return false;
  }
  if (!ensureAuthReady()) return;
  const api = getAuthApi();
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth(t("tc.auth.needLoginSave", "Cần đăng nhập để lưu."));
    return;
  }
const card = saveBtn?.closest(".result-item");
const cardHex = normalizeHex(card?.dataset?.hex || lastChosenHex);
const cardBrand = card?.dataset?.brand || "";
const cardCode = card?.dataset?.code || "";
const cardName = card?.dataset?.name || "";

if (!currentRendered.length || !cardHex) {
  showToast("Không có dữ liệu để lưu");
  return;
}

  console.info("[save] card data", { hex: cardHex, brand: cardBrand, code: cardCode, name: cardName });
  try {
    const payload = {
      inputHex: cardHex,
      project: currentProject || "",
      selectedBrands: getSelectedBrands(),
      deltaThreshold: currentDeltaThreshold,
      results: currentRendered.slice(0, 20).map(t => ({
        brand: t.brand,
        code: t.code,
        name: t.name,
        hex: t.hex,
        delta: t.delta
      }))
    };
    await saveSearch(api.db, user.uid, payload);
    showToast(t("tc.result.saved", "Đã lưu"));
  } catch (err) {
    console.error("Lưu thất bại", err);
    const friendly = formatFirestoreError(err, "Luu that bai");
    showToast(friendly);
  }
}

//======================= OPEN SAVED =======================
async function handleOpenSaved(id) {
  const initErr = getAuthInitError();
  if (initErr) {
    console.error(initErr);
    showToast(`${initErr.name || "Firebase"}: ${initErr.message || "Loi"}`);
    return;
  }
  if (!ensureAuthReady()) return;
  const api = getAuthApi();
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth(t("tc.auth.needLoginOpen", "Cần đăng nhập để mở."));
    return;
  }
  try {
    const data = await getSavedSearch(api.db, user.uid, id);
    if (!data) {
      showToast("Khong tim thay ban luu");
      return;
    }
    const deltaVal = parseFloat(data.deltaThreshold) || currentDeltaThreshold;
    currentDeltaThreshold = deltaVal;
    if (deltaSlider) deltaSlider.value = deltaVal;

 deltaValueEls.forEach(el => el.textContent = `≈ ${currentDeltaThreshold.toFixed(1)}`);
    const brands = Array.isArray(data.selectedBrands) ? data.selectedBrands : [];
    document.querySelectorAll(".brand-filter").forEach(cb => {
      if (!brands.length) return;
      cb.checked = brands.includes(cb.value);
    });

    if (colorPicker && data.inputHex) {
      colorPicker.value = data.inputHex;
    }
    lastChosenHex = data.inputHex || lastChosenHex;

    const results = Array.isArray(data.results) ? data.results : [];
    if (!results.length) {
      resultBox.innerHTML = "<div class='text-sm text-gray-600'>Ban luu nay khong co ket qua.</div>";
      return;
    }
    const mapped = results.map(r => {
      const hex = normalizeHex(r.hex);
      if (!hex) return null;
      return {
        brand: r.brand,
        code: r.code,
        name: r.name,
        hex,
        delta: r.delta,
        lab: rgbToLab(hexToRgbArray(hex))
      };
    }).filter(Boolean);

    const grouped = groupByColorSimilarity(mapped, currentDeltaThreshold, currentDeltaMethod);
    showGroupedResults(grouped, data.inputHex || lastChosenHex || "#000000");
    const ts = data.createdAt && typeof data.createdAt.toDate === "function" ? data.createdAt.toDate() : null;
    const stamp = ts ? ts.toLocaleString() : "";
    const loadedFrom = t("tc.library.loadedFrom", "Đã tải từ Thư viện của tôi {stamp}", {
      stamp: stamp ? `- ${stamp}` : ""
    });
    resultBox.innerHTML = `<div class='mb-3 text-sm text-gray-600'>${loadedFrom}</div>` + resultBox.innerHTML;
    if (libraryOverlay) libraryOverlay.classList.add("hidden");
    if (libraryModal) {
      libraryModal.classList.add("hidden");
      libraryModal.classList.remove("flex");
    }
  }   catch (err) {
    console.error("Mở bản lưu thất bại", err);
    const friendly = formatFirestoreError(err, "Mo ban luu that bai");
    showToast(friendly);
  }
}

//======================= EYEDROPPER =======================
function startEyeDropper() {
  if (!btnPickScreen) return;
  if (!("EyeDropper" in window)) {
    if (eyedropperFallback) eyedropperFallback.classList.remove("hidden");
    if (fallbackColorPicker) fallbackColorPicker.classList.remove("hidden");
    if (fallbackColorPicker) fallbackColorPicker.focus();
    return;
  }
  if (eyedropperFallback) eyedropperFallback.classList.add("hidden");
  if (fallbackColorPicker) fallbackColorPicker.classList.add("hidden");
  if (eyedropperHint) eyedropperHint.classList.remove("hidden");
  const picker = new window.EyeDropper();
  picker.open().then(result => {
    if (eyedropperHint) eyedropperHint.classList.add("hidden");
    const hex = normalizeHex(result.sRGBHex);
    if (!hex) return;
    if (colorPicker) colorPicker.value = hex;
    copyToClipboard(hex, hex);
  }).catch(err => {
    if (eyedropperHint) eyedropperHint.classList.add("hidden");
    if (err && err.name === "AbortError") return;

    showToast("Không pick được ");
  });
}

//======================= EVENTS =======================
window.addEventListener("firebase-auth-ready", bindAuth);
bindAuth();


if (libraryClose) libraryClose.addEventListener("click", () => {
  libraryOverlay?.classList.add("hidden");
  if (libraryModal) {
    libraryModal.classList.add("hidden");
    libraryModal.classList.remove("flex");
  }
});

if (libraryOverlay) {
  libraryOverlay.addEventListener("click", () => {
    libraryOverlay.classList.add("hidden");
    if (libraryModal) {
      libraryModal.classList.add("hidden");
      libraryModal.classList.remove("flex");
    }
  });
}

const openLibraryModal = () => {
  if (!ensureAuthReady()) return;
  const api = getAuthApi();
  const user = api?.auth?.currentUser || currentUser;
  if (!user) {
    openAuth(t("tc.auth.needLoginLibrary", "Cần đăng nhập để xem thư viện."));
    return;
  }
  libraryOverlay?.classList.remove("hidden");
  if (libraryModal) {
    libraryModal.classList.remove("hidden");
    libraryModal.classList.add("flex");
  }
  loadLibraryListV2();
};

const handleAuthAction = (action) => {
  if (action === "library") {
    openLibraryModal();
    return;
  }
  if (action === "contribute") {
    if (!currentUser) {
      openAuth(t("tc.auth.needLoginContribute", "Cần đăng nhập để đóng góp dữ liệu."));
      return;
    }
    if (!ensureAuthReady()) return;
    openContributeModal();
    return;
  }
  if (action === "verify") {
    if (!currentUser) {
      openAuth(t("tc.auth.needLoginVerify", "Cần đăng nhập để xác minh."));
      return;
    }
    if (!ensureAuthReady()) return;
    openVerifyModal();
  }
};

document.addEventListener("tc-auth-action", (event) => {
  const action = event?.detail?.action;
  if (!action) return;
  handleAuthAction(action);
});

(() => {
  let openAction = null;
  try {
    openAction = new URLSearchParams(window.location.search).get("open");
  } catch (err) {
    openAction = null;
  }
  const allowed = ["library", "contribute", "verify"];
  if (!openAction || !allowed.includes(openAction)) return;
  const auth = window.tcAuth || null;
  const isLoggedIn = typeof auth?.isLoggedIn === "function" ? auth.isLoggedIn() : false;
  if (openAction === "library") {
    if (String(window.location.pathname || "").includes("/worlds/threadcolor.html")) {
      window.location.href = "threadvault.html?tab=saved";
      return;
    }
    handleAuthAction(openAction);
    return;
  }
  if (!isLoggedIn) {
    handleAuthAction(openAction);
    return;
  }
  if (currentUser) {
    handleAuthAction(openAction);
    return;
  }
  const onAuth = (event) => {
    if (!event?.detail?.user) return;
    document.removeEventListener("tc-auth-changed", onAuth);
    handleAuthAction(openAction);
  };
  document.addEventListener("tc-auth-changed", onAuth);
})();


if (libraryList) {
  libraryList.addEventListener("click", e => {
    const openBtn = e.target.closest("[data-action=\"open-saved\"]");
    if (openBtn) {
      e.preventDefault();
      handleOpenSaved(openBtn.dataset.id, openBtn);
      return;
    }
  });
}
if (btnExportCsv && btnExportCsv.dataset.bound !== "1") {
  btnExportCsv.dataset.bound = "1";
  btnExportCsv.addEventListener("click", exportLibraryCsv);
}

if (verifiedOnlyToggle) {
  verifiedOnlyToggle.addEventListener("change", () => {
    useVerifiedOnly = verifiedOnlyToggle.checked;
    if (!lastChosenHex) return;
    scheduleSearch(lastChosenHex);
  });
}

if (btnUseCurrentColor) {
  btnUseCurrentColor.addEventListener("click", () => {
    const hex = normalizeHex(lastChosenHex || colorPicker?.value);
    if (hex && contributeHex) contributeHex.value = hex.toUpperCase();
  });
}

if (contributeSubmit) {
  contributeSubmit.addEventListener("click", async () => {
    const initErr = getAuthInitError();
    if (initErr) {
      console.error(initErr);
      showToast(`${initErr.name || "Firebase"}: ${initErr.message || "Loi"}`);
      return;
    }
    if (!ensureAuthReady()) return;
    if (!currentUser) {
      openAuth(t("tc.auth.needLoginContribute", "Cần đăng nhập để đóng góp dữ liệu."));
      return;
    }
    const brand = (contributeBrandCustom?.value || contributeBrandSelect?.value || "").trim();
    const code = (contributeCode?.value || "").trim();
    const name = (contributeName?.value || "").trim();
    const hexRaw = (contributeHex?.value || "").trim();
    const hex = normalizeHex(hexRaw);
    if (!brand || !code || !hex) {

      showToast("Brand, Code, Hex là bắt buộc");
      return;
    }

    if (!/^#[0-9a-f]{6}$/i.test(hex)) {
      showToast("Hex không hợp lệ");

      return;
    }
    try {
      await submitThread(authApi.db, currentUser, { brand, code, name, hex: hex.toUpperCase() });


      showToast(t("tc.verify.submitted", "Đã gửi, chờ xác minh"));


      closeContributeModal();
    } catch (err) {
      console.error(err);
      showToast(err?.message || "G?i th?t b?i");
    }
  });
}

if (contributeClose) contributeClose.addEventListener("click", closeContributeModal);
if (contributeCancel) contributeCancel.addEventListener("click", closeContributeModal);
if (contributeOverlay) contributeOverlay.addEventListener("click", closeContributeModal);

if (verifyClose) verifyClose.addEventListener("click", closeVerifyModal);
if (verifyOverlay) verifyOverlay.addEventListener("click", closeVerifyModal);

if (verifyList) {
  verifyList.addEventListener("click", async e => {
    const actionBtn = e.target.closest("[data-action]");
    if (!actionBtn) return;
    const id = actionBtn.dataset.id;
    const action = actionBtn.dataset.action;
    const targetItem = pendingSubmissions.find(p => p.id === id);
    if (!currentUser) {
      openAuth(t("tc.auth.needLoginVerify", "Cần đăng nhập để xác minh."));
      return;
    }
    if (!ensureAuthReady()) return;
    try {
      if (action === "vote-confirm" || action === "vote-reject") {
        const vote = action === "vote-confirm" ? "confirm" : "reject";
        await voteOnSubmission(authApi.db, id, currentUser, vote);
        let summary;
        try {
          summary = await getVoteSummary(authApi.db, id);
        } catch (err) {
          if (isPermissionDenied(err)) {
            const old = targetItem?.summary || { confirmCount: 0, rejectCount: 0 };
            summary = {
              confirmCount: old.confirmCount + (vote === "confirm" ? 1 : 0),
              rejectCount: old.rejectCount + (vote === "reject" ? 1 : 0)
            };
          } else {
            throw err;
          }
        }
        if (targetItem) targetItem.summary = summary;
        renderVerifyList();
      }
      if (action === "approve") {
        if (!isAdminUser) {
          showToast("Chỉ admin mới duyệt được");
          return;
        }
        if (!targetItem) {

          showToast("Không tìm thấy submission");

          return;
        }
        const summary = targetItem?.summary || await getVoteSummary(authApi.db, id);
        await promoteSubmissionToVerified(authApi.db, targetItem, summary, currentUser);
        pendingSubmissions = pendingSubmissions.filter(p => p.id !== id);
        renderVerifyList();
        fetchVerifiedThreads().then(list => {
          verifiedThreads = list;
          mergeVerifiedThreads(list);
        });
      }
    } catch (err) {
      console.error(err);

      showToast(err?.message || "Lỗi thao tác");

    }
  });
}

if (deltaMethodSelect) {
  currentDeltaMethod = deltaMethodSelect.value === "2000" ? "2000" : "76";
  deltaMethodSelect.addEventListener("change", () => {
    currentDeltaMethod = deltaMethodSelect.value === "2000" ? "2000" : "76";
    matchCache.clear();
    if (lastChosenHex) scheduleSearch(lastChosenHex);
  });
}
loadProjectPrefs();
loadPins();

btnFindNearest?.addEventListener("click", () => {

  if (!isDataReady) return alert("Dữ liệu chưa sẵn sàng");

  const hex = colorPicker.value;
  runSearch(hex);
});

deltaSlider?.addEventListener("input", () => {
  currentDeltaThreshold = parseFloat(deltaSlider.value);
  deltaValueEls.forEach(el => el.textContent = `≈ ${currentDeltaThreshold.toFixed(1)}`);
  if (!lastResults || !lastChosenHex) return;
  scheduleSearch(lastChosenHex);
});

resultBox?.addEventListener("click", handleResultContainerClick);
if (pinPanel && !pinPanel.dataset.bound) {
  pinPanel.dataset.bound = "1";
  pinPanel.addEventListener("click", (e) => {
    const actionBtn = e.target.closest("[data-action]");
    if (!actionBtn) return;
    const action = actionBtn.dataset.action;
    const hex = actionBtn.dataset.hex;
    if (action === "pin-remove" && hex) {
      removePin(hex);
      return;
    }
    if (action === "pin-copy" && hex) {
      const item = pinnedItems.find(p => p.hex === normalizeHex(hex));
      const text = item?.code || item?.hex || "";
      copyToClipboard(text, t("tc.pin.copyCode", "Sao chép mã"));
      return;
    }
    if (action === "pin-clear") {
      pinnedItems = [];
      savePins();
      renderPinPanel();
      syncPinButtons();
    }
  });
}
pinClear?.addEventListener("click", () => {
  pinnedItems = [];
  savePins();
  renderPinPanel();
  syncPinButtons();
});
drawerOverlay?.addEventListener("click", closeInspector);
drawerCloseBtn?.addEventListener("click", closeInspector);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (hasToolUI) closeInspector();
  }
  if (!hasToolUI) return;
  const targetTag = (e.target.tagName || "").toLowerCase();
  const isTyping = targetTag === "input" || targetTag === "textarea";
  const key = (e.key || "").toLowerCase();
  if (!isTyping && key === "i") startEyeDropper();
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && key === "p") {
    e.preventDefault();
    startEyeDropper();
  }
});

copyButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.copy;
    const value = document.getElementById(`inspector${type}`).textContent;
    copyToClipboard(value, type.toUpperCase());
  });
});

copyAllBtn?.addEventListener("click", () => {
  const hex = inspectorHex.textContent;
  const rgb = inspectorRgb.textContent;
  const lab = inspectorLab.textContent;
  const hsl = inspectorHsl.textContent;
  const block = `HEX: ${hex}\nRGB: ${rgb}\nLAB: ${lab}\nHSL: ${hsl}`;
  copyToClipboard(block, t("tc.inspector.copyAllLabel", "Tất cả"));
});

// Canvas pick
imgInput?.addEventListener("change", e => {
  if (!canvas || !ctx) return;
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  const url = URL.createObjectURL(file);
  img.onload = () => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
  };
  img.src = url;
});

canvas?.addEventListener("click", e => {
  if (!ctx) return;


  if (!isDataReady) return alert("Dữ liệu chưa sẵn sàng");


  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = Math.floor((e.clientX - rect.left) * scaleX);
  const y = Math.floor((e.clientY - rect.top) * scaleY);
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  const hex = `#${[pixel[0], pixel[1], pixel[2]].map(v => v.toString(16).padStart(2, "0")).join("")}`;
  runSearch(hex);
});

// Find by code
btnFindByCode?.addEventListener("click", () => {
  if (!isDataReady) {
    showToast(t("tc.status.loading", "Đang chuẩn bị dữ liệu..."));
    return;
  }
  const rawQuery = codeInput.value.trim();
  if (!rawQuery) {
    showToast(t("tc.code.empty", "Vui lòng nhập mã."));
    return;
  }
  const parsed = parseCodeQuery(rawQuery);
  if (!parsed) {
    showToast(t("tc.code.invalid", "Mã không hợp lệ."));
    return;
  }

  const selectedBrands = getSelectedBrands();
  const requireVerified = useVerifiedOnly;
  let results = [];

  if (parsed.mode === "brand") {
    if (selectedBrands.length && !selectedBrands.includes(parsed.brand)) {
      showToast(t("tc.code.brandNotSelected", "Hãng này chưa được chọn."));
      renderCodeLookupResults(rawQuery, []);
      return;
    }
    const list = threadsByBrand.get(parsed.brand) || [];
    results = list.filter(t => normalizeCodeKey(t.code) === parsed.codeKey)
      .filter(t => !requireVerified || isVerifiedThread(t));
  } else {
    const list = threadsByCode.get(parsed.codeKey) || [];
    results = list.filter(t => selectedBrands.includes(t.brand))
      .filter(t => !requireVerified || isVerifiedThread(t));
  }

  if (!results.length) {
    showToast(t("tc.code.notFoundToast", "Không tìm thấy mã này."));
    renderCodeLookupResults(rawQuery, []);
    return;
  }
  if (results.length === 1) {
    const item = results[0];
    openInspector({
      hex: item.hex,
      brand: item.brand || "",
      code: item.code || "",
      name: item.name || "",
      delta: "",
      lab: ensureLab(item)
    }, null);
    runSearch(item.hex);
    return;
  }
  results.sort((a, b) => a.brand.localeCompare(b.brand) || String(a.code).localeCompare(String(b.code)));
  renderCodeLookupResults(rawQuery, results);
});

if (btnPickScreen) {
  btnPickScreen.addEventListener("click", () => {
    startEyeDropper();
  });
}

if (fallbackColorPicker) {
  fallbackColorPicker.addEventListener("input", () => {
    const hex = normalizeHex(fallbackColorPicker.value);
    if (!hex) return;
    if (colorPicker) colorPicker.value = hex;
    copyToClipboard(hex, hex);
  });
}







```

## FILE: auth.js (size: 29021)
(&#272;&#227; che th&#244;ng tin nh&#7841;y c&#7843;m: apiKey, key-value)
```js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// TODO: Điền cấu hình Firebase của bạn tại đây
const firebaseConfig = {
  apiKey: "REDACTED",
  authDomain: "thread-colors-for-community.firebaseapp.com",
  projectId: "thread-colors-for-community",
  storageBucket: "thread-colors-for-community.firebasestorage.app",
  messagingSenderId: "980305784078",
  appId: "1:980305784078:web:455bfff119e25a77913b5f",
  measurementId: "G-SZ8R6VTFRY"
};

function validateConfig(cfg) {
  const required = ["apiKey", "authDomain", "projectId", "appId"];
  required.forEach(k => {
    const v = cfg[k];
    if (!v || String(v).includes("TODO")) {
      throw new Error("Thiếu firebaseConfig");
    }
  });
}

try {
  validateConfig(firebaseConfig);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  async function upsertUser(user, providerId) {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const now = serverTimestamp();
    await setDoc(ref, {
      uid: user.uid,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      provider: providerId || (user.providerData[0]?.providerId ?? "password"),
      createdAt: now,
      lastLoginAt: now
    }, { merge: true });
  }

  function defaultDisplayName(email) {
    if (!email) return "";
    return email.split("@")[0];
  }

  async function signInEmail(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await upsertUser(cred.user, "password");
    return cred;
  }

  async function registerEmail(email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (!cred.user.displayName) {
      await updateProfile(cred.user, { displayName: defaultDisplayName(email) });
    }
    await upsertUser(cred.user, "password");
    return cred;
  }

  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  }

  async function signInGoogle() {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    await upsertUser(cred.user, "google.com");
    return cred;
  }

  async function signInFacebook() {
    const provider = new FacebookAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    await upsertUser(cred.user, "facebook.com");
    return cred;
  }

  async function signOutUser() {
    await signOut(auth);
  }

  window.firebaseAuth = {
    auth,
    db,
    initError: null,
    onAuthStateChanged: (cb) => onAuthStateChanged(auth, cb),
    signInEmail,
    registerEmail,
    resetPassword,
    signInGoogle,
    signInFacebook,
    signOutUser,
    addDoc,
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    deleteDoc,
  };
  window.dispatchEvent(new Event("firebase-auth-ready"));
} catch (err) {
  console.error("Firebase init error", err);
  window.firebaseAuth = { initError: err };
}

function getAuthApi() {
  return window.firebaseAuth || window.firebaseAuthApi || null;
}

function resolveToolUrl() {
  const path = window.location.pathname || "";
  return path.includes("/worlds/") ? "threadcolor.html" : "./worlds/threadcolor.html";
}

async function safeSignOut() {
  const api = getAuthApi();
  if (!api) return;
  try {
    if (typeof api?.signOut === "function") {
      await api.signOut();
      return;
    }
    if (typeof api?.auth?.signOut === "function") {
      await api.auth.signOut();
    }
  } catch (err) {
    console.error("Sign out failed", err);
  }
}

function exposeAuthPublicApi() {
  if (window.tcAuth?.version === "v1") return;
  const getApi = () => window.firebaseAuth || window.firebaseAuthApi || null;
  window.tcAuth = {
    version: "v1",
    getApi,
    getUser: () => {
      const api = getApi();
      return api?.auth?.currentUser || api?.user || null;
    },
    isLoggedIn: () => {
      const user = window.tcAuth.getUser();
      return !!(user?.uid || user?.email);
    },
    openAuth: () => {
      const btnAccount = document.getElementById("btnAccount");
      if (btnAccount) {
        btnAccount.click();
        return;
      }
      window.location.href = resolveToolUrl();
    },
    openRegister: () => {
      if (typeof openAuthModal === "function") {
        openAuthModal("register");
        return;
      }
      window.tcAuth?.openAuth?.();
    },
    goTool: () => {
      window.location.href = resolveToolUrl();
    }
  };
}

function ensureAuthFallbackStyle() {
  if (document.getElementById("tc-auth-fallback-style")) return;
  const style = document.createElement("style");
  style.id = "tc-auth-fallback-style";
  style.textContent = `
#authOverlay{
  background: rgba(0,0,0,.45);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}
#authModal{
  background: var(--glass, rgba(255,255,255,.75));
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  color: var(--text, #111827);
  border-radius: 1.25rem;
  box-shadow: 0 22px 70px rgba(0,0,0,.28);
}
#authClose{
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  background: var(--glass, rgba(255,255,255,.75));
  color: var(--text, #111827);
  border-radius: .75rem;
}
#authModal input{
  background: var(--glass, rgba(255,255,255,.75));
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  color: var(--text, #111827);
  border-radius: .9rem;
}
#authModal input::placeholder{ color: var(--muted, rgba(17,24,39,.7)); opacity: .85; }
#authModal input:focus-visible,
#authClose:focus-visible,
#tabLogin:focus-visible, #tabRegister:focus-visible,
#btnLogin:focus-visible, #btnRegister:focus-visible,
#btnGoogle:focus-visible, #btnFacebook:focus-visible{
  outline: none;
  box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1, #6366f1);
}
#tabLogin, #tabRegister{
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  background: var(--glass, rgba(255,255,255,.75));
  color: var(--text, #111827);
  border-radius: .9rem;
}
#tabLogin.bg-indigo-50, #tabRegister.bg-indigo-50{
  background: linear-gradient(135deg, var(--a1, #6366f1), var(--a2, #8b5cf6));
  border-color: rgba(255,255,255,.18);
}
#tabLogin.text-indigo-700, #tabRegister.text-indigo-700{
  color: #fff !important;
}
#btnLogin, #btnRegister{
  background: linear-gradient(135deg, var(--a1, #6366f1), var(--a2, #8b5cf6));
  color: #fff;
  border: 1px solid rgba(255,255,255,.18);
  border-radius: .9rem;
}
#btnGoogle, #btnFacebook{
  background: var(--glass, rgba(255,255,255,.75));
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  color: var(--text, #111827);
  border-radius: .9rem;
}
#btnForgot{
  color: var(--muted, rgba(17,24,39,.7));
}
#authError{
  color: #ef4444;
  background: rgba(239,68,68,.10);
  border: 1px solid rgba(239,68,68,.22);
  border-radius: .9rem;
}
#topbarAuthSlot[data-auth-float="1"]{
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 70;
}
#topbarAuthSlot .tc-chip{
  background: var(--glass, rgba(255,255,255,.75));
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  color: var(--text, #111827);
}
#topbarAuthSlot .tc-btn{
  border-radius: 0.75rem;
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  background: var(--glass, rgba(255,255,255,.75));
  color: var(--text, #111827);
  font-weight: 650;
  letter-spacing: -0.005em;
  line-height: 1;
  transition: filter .15s ease, transform .05s ease, box-shadow .15s ease;
}
#topbarAuthSlot .tc-btn-primary{
  background: linear-gradient(135deg, var(--a1, #6366f1), var(--a2, #8b5cf6));
  color: #fff;
  border: 1px solid rgba(255,255,255,.18);
}
#topbarAuthSlot .tc-dot{
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--a1, #6366f1), var(--a2, #8b5cf6), var(--a3, #ec4899));
  box-shadow: 0 0 0 2px rgba(255,255,255,.5);
}
#topbarAuthSlot .tc-btn:hover,
#topbarAuthSlot .tc-chip:hover{ filter: brightness(1.03); }
#topbarAuthSlot .tc-btn:active{ transform: translateY(1px); }
#topbarAuthSlot .tc-btn:focus-visible,
#topbarAuthSlot #accountMenu button:focus-visible{
  outline: none;
  box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1, #6366f1);
}
#topbarAuthSlot #accountMenu{
  background: var(--glass, rgba(255,255,255,.75));
  border: 1px solid var(--stroke, rgba(0,0,0,.12));
  color: var(--text, #111827);
}
#topbarAuthSlot #accountMenu .tc-account-header{
  border-bottom: 1px solid var(--stroke, rgba(0,0,0,.12));
}
#topbarAuthSlot #accountMenu .tc-account-email{
  color: var(--muted, rgba(17,24,39,.7));
}
#topbarAuthSlot #accountMenu .tc-account-actions{
  display: flex;
  flex-direction: column;
  gap: .25rem;
}
#topbarAuthSlot #accountMenu button{
  padding: .6rem .75rem;
  line-height: 1.1;
}
#topbarAuthSlot #accountMenu button:hover{
  background: rgba(255,255,255,.10);
}
#topbarAuthSlot #accountMenu button + button{
  border-top: 1px solid var(--stroke, rgba(0,0,0,.12));
  opacity: 1;
}
#topbarAuthSlot #accountMenu #btnLogout{
  color: rgba(239,68,68,.95);
}
#topbarAuthSlot #accountMenu #btnLogout:hover{
  background: rgba(239,68,68,.08);
}
@media (prefers-reduced-motion: reduce){
  #topbarAuthSlot .tc-btn,
  #topbarAuthSlot .tc-chip{
    transition: none !important;
  }
}
@media (prefers-reduced-motion: reduce){
  #authModal *{ transition: none !important; }
}
  `;
  document.head.appendChild(style);
}

function ensureTopbarAuthDock() {
  const slot = document.getElementById("topbarAuthSlot");
  if (!slot) return false;
  if (slot.dataset.authDocked === "1") return false;

  const userInfo = document.getElementById("userInfo");
  const btnAccount = document.getElementById("btnAccount");
  const accountMenuBtn = document.getElementById("accountMenuBtn");
  const accountMenu = document.getElementById("accountMenu");
  const isSlotInBody = slot.parentElement === document.body;
  let changed = false;

  if (userInfo || btnAccount || accountMenuBtn || accountMenu) {
    let container = userInfo?.parentElement || null;
    if (container && btnAccount && !container.contains(btnAccount)) {
      container = btnAccount.parentElement;
    }
    if (container && userInfo && !container.contains(userInfo)) {
      container = null;
    }
    if (container) {
      if (container.parentElement !== slot) {
        slot.appendChild(container);
        changed = true;
      }
    } else {
      if (userInfo && userInfo.parentElement !== slot) {
        slot.appendChild(userInfo);
        changed = true;
      }
      if (btnAccount && btnAccount.parentElement !== slot) {
        slot.appendChild(btnAccount);
        changed = true;
      }
    }
  } else {
    slot.innerHTML = `
      <div class="flex items-center gap-3 min-w-[210px] justify-end">
        <div id="userInfo" class="hidden relative text-sm">
          <button id="accountMenuBtn" class="flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm tc-chip tc-btn">
            <img id="userAvatar" class="w-8 h-8 rounded-full border border-gray-200 object-cover" alt="">
            <span id="userName" class="font-semibold max-w-[110px] truncate"></span>
            <span class="opacity-70">&#9662;</span>
          </button>
          <div id="accountMenu" class="hidden absolute right-0 mt-3 w-64 rounded-lg shadow-lg overflow-hidden origin-top-right tc-chip">
            <div class="tc-account-header px-3 py-3">
              <div class="flex items-center gap-3">
                <img class="tc-account-avatar w-10 h-10 rounded-full border border-white/30 object-cover" alt="" data-auth-avatar>
                <div class="min-w-0">
                  <div class="tc-account-name font-semibold truncate" data-auth-name></div>
                  <div class="tc-account-email text-xs tc-muted truncate" data-auth-email></div>
                </div>
              </div>
            </div>
            <div class="tc-account-actions px-2 pb-2">
              <button id="btnManageAccount" class="w-full text-left px-3 py-2 hover:bg-white/10" data-i18n="tc.account.manage">Quản lý tài khoản</button>
              <button id="btnLogout" class="w-full text-left px-3 py-2 hover:bg-white/10" data-i18n="tc.account.logout">Đăng xuất</button>
            </div>
          </div>
        </div>
        <button id="btnAccount" class="tc-btn tc-btn-primary px-4 py-2" data-i18n="tc.account.login">Đăng nhập</button>
      </div>
    `;
    changed = true;
    if (isSlotInBody) {
      slot.dataset.authFloat = "1";
    } else {
      delete slot.dataset.authFloat;
    }
    slot.dataset.authDocked = "1";
    return true;
  }
  if (isSlotInBody) {
    slot.dataset.authFloat = "1";
  } else {
    delete slot.dataset.authFloat;
  }
  slot.dataset.authDocked = "1";
  return changed;
}

function bindTopbarAuthDelegation() {
  const slot = document.getElementById("topbarAuthSlot");
  if (!slot || slot.dataset.authDelegationBound === "1") return;
  slot.dataset.authDelegationBound = "1";

  const closeMenu = () => {
    const menu = document.getElementById("accountMenu");
    if (menu) menu.classList.add("hidden");
  };

  slot.addEventListener("click", async (event) => {
    const accountBtn = event.target.closest("#accountMenuBtn");
    if (accountBtn) {
      event.stopPropagation();
      const menu = document.getElementById("accountMenu");
      menu?.classList.toggle("hidden");
      return;
    }
    const logoutBtn = event.target.closest("#btnLogout");
    if (logoutBtn) {
      event.stopPropagation();
      await safeSignOut();
      closeMenu();
      return;
    }
    const manageBtn = event.target.closest("#btnManageAccount");
    if (manageBtn) {
      event.stopPropagation();
      closeMenu();
      const returnUrl = encodeURIComponent(window.location.href);
      const accountPath = window.location.pathname.includes("/worlds/") ? "../account.html" : "./account.html";
      window.location.href = `${accountPath}?return=${returnUrl}`;
      return;
    }
    const menuActionBtn = event.target.closest("#btnLibrary, #btnContribute, #btnVerify");
    if (menuActionBtn && slot.contains(menuActionBtn)) {
      event.stopPropagation();
      closeMenu();
      const inToolWorld = !!(
        document.getElementById("libraryModal") ||
        document.getElementById("contributeModal") ||
        document.getElementById("verifyModal")
      );
      if (inToolWorld) {
        const actionMap = {
          btnLibrary: "library",
          btnContribute: "contribute",
          btnVerify: "verify"
        };
        const action = actionMap[menuActionBtn.id];
        if (action) {
          document.dispatchEvent(new CustomEvent("tc-auth-action", { detail: { action } }));
        }
        return;
      }
      window.location.href = resolveToolUrl();
    }
  });

  document.addEventListener("click", (event) => {
    if (!slot.contains(event.target)) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function ensureAuthModalExists() {
  const overlay = document.getElementById("authOverlay");
  const modal = document.getElementById("authModal");
  if (overlay && modal) return false;
  document.body.insertAdjacentHTML("beforeend", `
    <div id="authOverlay" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 hidden"></div>
    <div id="authModal" class="fixed inset-0 z-50 hidden items-center justify-center px-4">
      <div class="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div class="flex gap-2">
            <button id="tabLogin" class="px-3 py-1 rounded-lg text-sm font-semibold bg-indigo-50 text-indigo-700" data-i18n="tc.auth.login">Đăng nhập</button>
            <button id="tabRegister" class="px-3 py-1 rounded-lg text-sm text-gray-600 hover:bg-gray-100" data-i18n="tc.auth.register">Đăng ký</button>
          </div>
          <button id="authClose" class="p-2 rounded-full hover:bg-gray-100 text-gray-500" data-i18n-attr="aria-label:tc.auth.close">&times;</button>
        </div>
        <div class="p-5 space-y-4">
          <div id="authError" class="text-sm text-red-600 hidden"></div>
          <div id="loginPanel" class="space-y-3">
          <input id="loginEmail" type="email" class="w-full border rounded-lg px-3 py-2" data-i18n-attr="placeholder:tc.auth.email">
          <input id="loginPassword" type="password" class="w-full border rounded-lg px-3 py-2" data-i18n-attr="placeholder:tc.auth.password">
          <button id="btnLogin" class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700" data-i18n="tc.auth.login">Đăng nhập</button>
          <button id="btnForgot" class="text-sm text-indigo-600 hover:underline" data-i18n="tc.auth.forgot">Quên mật khẩu?</button>
          </div>
          <div id="registerPanel" class="space-y-3 hidden">
          <input id="registerEmail" type="email" class="w-full border rounded-lg px-3 py-2" data-i18n-attr="placeholder:tc.auth.email">
          <input id="registerPassword" type="password" class="w-full border rounded-lg px-3 py-2" data-i18n-attr="placeholder:tc.auth.password">
          <input id="registerConfirm" type="password" class="w-full border rounded-lg px-3 py-2" data-i18n-attr="placeholder:tc.auth.confirm">
          <button id="btnRegister" class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700" data-i18n="tc.auth.create">Tạo tài khoản</button>
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <span class="h-px flex-1 bg-gray-200"></span>
          <span data-i18n="common.or">Hoặc</span>
            <span class="h-px flex-1 bg-gray-200"></span>
          </div>
        <button id="btnGoogle" class="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50">
          <span>G</span><span data-i18n="tc.auth.google">Tiếp tục với Google</span>
        </button>
        <button id="btnFacebook" class="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50">
          <span>f</span><span data-i18n="tc.auth.facebook">Tiếp tục với Facebook</span>
        </button>
        </div>
      </div>
    </div>
  `);
  return true;
}

function showAuthError(message) {
  const authError = document.getElementById("authError");
  if (!authError) return;
  if (!message) {
    authError.classList.add("hidden");
    authError.textContent = "";
    return;
  }
  authError.textContent = message;
  authError.classList.remove("hidden");
}

function setAuthTab(tab) {
  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");
  const loginPanel = document.getElementById("loginPanel");
  const registerPanel = document.getElementById("registerPanel");
  if (!tabLogin || !tabRegister || !loginPanel || !registerPanel) return;
  const isLogin = tab === "login";
  loginPanel.classList.toggle("hidden", !isLogin);
  registerPanel.classList.toggle("hidden", isLogin);
  tabLogin.classList.toggle("bg-indigo-50", isLogin);
  tabLogin.classList.toggle("text-indigo-700", isLogin);
  tabRegister.classList.toggle("bg-indigo-50", !isLogin);
  tabRegister.classList.toggle("text-indigo-700", !isLogin);
  showAuthError("");
}

function openAuthModal(tab = "login") {
  const authOverlay = document.getElementById("authOverlay");
  const authModal = document.getElementById("authModal");
  if (!authOverlay || !authModal) return;
  authOverlay.classList.remove("hidden");
  authModal.classList.remove("hidden");
  authModal.classList.add("flex");
  setAuthTab(tab);
  const loginEmail = document.getElementById("loginEmail");
  const registerEmail = document.getElementById("registerEmail");
  (tab === "login" ? loginEmail : registerEmail)?.focus();
}

function closeAuthModal() {
  const authOverlay = document.getElementById("authOverlay");
  const authModal = document.getElementById("authModal");
  if (!authOverlay || !authModal) return;
  authOverlay.classList.add("hidden");
  authModal.classList.add("hidden");
  authModal.classList.remove("flex");
  showAuthError("");
}

let lastAuthSignature = null;
function emitAuthChanged(user) {
  const payload = user ? {
    uid: user.uid || null,
    email: user.email || null,
    displayName: user.displayName || null,
    photoURL: user.photoURL || null
  } : null;
  const signature = payload ? `${payload.uid || ""}|${payload.email || ""}` : "guest";
  if (signature === lastAuthSignature) return;
  lastAuthSignature = signature;
  document.dispatchEvent(new CustomEvent("tc-auth-changed", { detail: { user: payload } }));
}

function updateAuthUI(user) {
  const api = getAuthApi();
  if (api) {
    api.user = user || null;
  }
  const userInfo = document.getElementById("userInfo");
  const btnAccount = document.getElementById("btnAccount");
  const btnLogout = document.getElementById("btnLogout");
  const userAvatar = document.getElementById("userAvatar");
  const userName = document.getElementById("userName");
  const menuAvatar = document.querySelector("#accountMenu [data-auth-avatar]");
  const menuName = document.querySelector("#accountMenu [data-auth-name]");
  const menuEmail = document.querySelector("#accountMenu [data-auth-email]");
  const loggedIn = !!user;
  userInfo?.classList.toggle("hidden", !loggedIn);
  btnAccount?.classList.toggle("hidden", loggedIn);
  btnLogout?.classList.toggle("hidden", !loggedIn);
  if (loggedIn && userName) userName.textContent = user.displayName || user.email || "User";
  if (loggedIn && userAvatar) {
    userAvatar.src = user.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.displayName || user.email || "U");
  }
  if (loggedIn) {
    const displayName = user.displayName || user.email || "User";
    const email = user.email || "";
    if (menuName) menuName.textContent = displayName;
    if (menuEmail) menuEmail.textContent = email;
    if (menuAvatar) {
      menuAvatar.src = user.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(displayName || "U");
    }
  } else {
    if (menuName) menuName.textContent = "";
    if (menuEmail) menuEmail.textContent = "";
    if (menuAvatar) menuAvatar.removeAttribute("src");
  }
  if (loggedIn) closeAuthModal();
  emitAuthChanged(user || null);
}

function bindAuthUiEvents() {
  const authModal = document.getElementById("authModal");
  if (!authModal || authModal.dataset.bound === "1") return;

  authModal.dataset.bound = "1";
  const btnAccount = document.getElementById("btnAccount");
  const authOverlay = document.getElementById("authOverlay");
  const authClose = document.getElementById("authClose");
  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const registerEmail = document.getElementById("registerEmail");
  const registerPassword = document.getElementById("registerPassword");
  const registerConfirm = document.getElementById("registerConfirm");
  const btnLogin = document.getElementById("btnLogin");
  const btnRegister = document.getElementById("btnRegister");
  const btnGoogle = document.getElementById("btnGoogle");
  const btnFacebook = document.getElementById("btnFacebook");
  const btnForgot = document.getElementById("btnForgot");
  const accountMenuBtn = document.getElementById("accountMenuBtn");
  const accountMenu = document.getElementById("accountMenu");
  const btnLibrary = document.getElementById("btnLibrary");
  const btnContribute = document.getElementById("btnContribute");
  const btnVerify = document.getElementById("btnVerify");
  const isToolWorld = () => !!(
    document.getElementById("libraryModal") ||
    document.getElementById("contributeModal") ||
    document.getElementById("verifyModal")
  );

  btnAccount?.addEventListener("click", () => openAuthModal("login"));
  authClose?.addEventListener("click", closeAuthModal);
  authOverlay?.addEventListener("click", closeAuthModal);
  tabLogin?.addEventListener("click", () => setAuthTab("login"));
  tabRegister?.addEventListener("click", () => setAuthTab("register"));

  const api = getAuthApi();
  btnLogin?.addEventListener("click", async () => {
    const email = loginEmail?.value.trim();
    const pass = loginPassword?.value;
    if (!email || !pass) return showAuthError("Vui l&#242;ng nh&#7853;p Email v&#224; m&#7853;t kh&#7849;u");
    try {
      await api?.signInEmail?.(email, pass);
    } catch (err) {
      showAuthError(err?.message || "&#272;&#259;ng nh&#7853;p th&#7845;t b&#7841;i");
    }
  });

  btnRegister?.addEventListener("click", async () => {
    const email = registerEmail?.value.trim();
    const pass = registerPassword?.value;
    const confirm = registerConfirm?.value;
    if (!email || !pass || !confirm) return showAuthError("&#272;i&#7873;n &#273;&#7847;y &#273;&#7911; th&#244;ng tin");
    if (pass !== confirm) return showAuthError("M&#7853;t kh&#7849;u kh&#244;ng tr&#249;ng kh&#7899;p");
    try {
      await api?.registerEmail?.(email, pass);
    } catch (err) {
      showAuthError(err?.message || "T&#7841;o t&#224;i kho&#7843;n th&#7845;t b&#7841;i");
    }
  });

  btnForgot?.addEventListener("click", async () => {
    const email = loginEmail?.value.trim();
    if (!email) return showAuthError("Nh&#7853;p email &#273;&#7875; &#273;&#7863;t l&#7841;i m&#7853;t kh&#7849;u");
    try {
      await api?.resetPassword?.(email);
    } catch (err) {
      showAuthError(err?.message || "Kh&#244;ng g&#7917;i &#273;&#432;&#7907;c email");
    }
  });

  btnGoogle?.addEventListener("click", async () => {
    try {
      await api?.signInGoogle?.();
    } catch (err) {
      showAuthError(err?.message || "Google login th&#7845;t b&#7841;i");
    }
  });

  btnFacebook?.addEventListener("click", async () => {
    try {
      await api?.signInFacebook?.();
    } catch (err) {
      showAuthError(err?.message || "Facebook login th&#7845;t b&#7841;i");
    }
  });

  if (accountMenuBtn) {
    accountMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      accountMenu?.classList.toggle("hidden");
    });
    document.addEventListener("click", () => accountMenu?.classList.add("hidden"));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        accountMenu?.classList.add("hidden");
        closeAuthModal();
      }
    });
  }

  const fallbackToTool = () => {
    if (isToolWorld()) return;
    window.location.href = "worlds/threadcolor.html";
  };
  btnLibrary?.addEventListener("click", () => fallbackToTool());
  btnContribute?.addEventListener("click", () => fallbackToTool());
  btnVerify?.addEventListener("click", () => fallbackToTool());
}

let hasBoundAuthState = false;
function bindAuthState() {
  if (hasBoundAuthState) return;
  const api = getAuthApi();
  if (!api?.onAuthStateChanged) return;
  hasBoundAuthState = true;
  api.onAuthStateChanged((user) => updateAuthUI(user));
  updateAuthUI(api.auth?.currentUser || null);
}

function initAuthDocking() {
  exposeAuthPublicApi();
  ensureAuthFallbackStyle();
  const injectedModal = ensureAuthModalExists();
  const injectedAccount = ensureTopbarAuthDock();
  if (injectedModal || injectedAccount) {
    bindAuthUiEvents();
  }
  bindTopbarAuthDelegation();
  bindAuthState();
}

document.addEventListener("DOMContentLoaded", initAuthDocking);
window.addEventListener("firebase-auth-ready", () => {
  exposeAuthPublicApi();
  const injectedAccount = ensureTopbarAuthDock();
  if (injectedAccount) {
    bindAuthUiEvents();
  }
  bindTopbarAuthDelegation();
  bindAuthState();
});

```

## FILE: library.js (size: 3612)
```js
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  limit as fsLimit,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

export async function saveSearch(db, uid, payload) {
  if (!db || !uid || !payload) throw new Error("Missing db/uid/payload");
  console.info("[saveSearch] projectId", db?.app?.options?.projectId);
  console.info("[saveSearch] uid", uid, "path", collection(db, "users", uid, "savedSearches").path);
  const ref = collection(db, "users", uid, "savedSearches");
  const docRef = await addDoc(ref, { ...payload, createdAt: serverTimestamp() });
  console.info("[saveSearch] saved doc id", docRef.id);
  return docRef;
}

export async function listSavedSearches(db, uid, limitN = 50) {
  if (!db || !uid) throw new Error("Missing db/uid");
  console.info("[listSavedSearches] uid", uid, "path", collection(db, "users", uid, "savedSearches").path);
  const ref = collection(db, "users", uid, "savedSearches");
  let docs = [];
  try {
    const q = query(ref, orderBy("createdAt", "desc"), fsLimit(limitN));
    const snap = await getDocs(q);
    docs = snap.docs;
    console.info("[listSavedSearches] count", snap.size);
  } catch (err) {
    console.error("listSavedSearches orderBy fallback", err);
    const snap = await getDocs(ref);
    docs = snap.docs;
    docs.sort((a, b) => {
      const ta = a.data()?.createdAt?.toMillis ? a.data().createdAt.toMillis() : 0;
      const tb = b.data()?.createdAt?.toMillis ? b.data().createdAt.toMillis() : 0;
      return tb - ta;
    });
    console.info("[listSavedSearches] count (fallback)", docs.length);
  }

  const items = [];
  let migrated = 0;

  for (const d of docs.slice(0, limitN)) {
    const data = d.data() || {};
    const results = Array.isArray(data.results) ? data.results : [];
    const selectedBrands = Array.isArray(data.selectedBrands) ? data.selectedBrands : [];
    let topMatch = data.topMatch || (results.length ? results[0] : null);
    let label = data.label;
    if (!label) {
      if (topMatch) {
        label = `${topMatch.brand || ""} ${topMatch.code || ""}`.trim();
      } else if (results.length) {
        label = `${results[0].brand || ""} ${results[0].code || ""}`.trim();
        topMatch = topMatch || results[0];
      } else {
        label = data.inputHex || "";
      }
      try {
        await setDoc(d.ref, { label, topMatch }, { merge: true });
        migrated += 1;
      } catch (e) {
        console.error("listSavedSearches migrate label failed", e);
      }
    }
    items.push({
      id: d.id,
      inputHex: data.inputHex || "",
      project: data.project || "",
      createdAt: data.createdAt || null,
      deltaThreshold: data.deltaThreshold,
      selectedBrands: selectedBrands,
      selectedBrandsCount: selectedBrands.length || 0,
      resultsCount: results.length || 0,
      label,
      topMatch,
      results
    });
  }
  return { items, migrated };
}

export async function deleteSavedSearch(db, uid, docId) {
  if (!db || !uid || !docId) throw new Error("Missing db/uid/docId");
  const ref = doc(db, "users", uid, "savedSearches", docId);
  return deleteDoc(ref);
}

export async function getSavedSearch(db, uid, docId) {
  if (!db || !uid || !docId) throw new Error("Missing db/uid/docId");
  const ref = doc(db, "users", uid, "savedSearches", docId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

```

## FILE: i18n.js (size: 17548)
```js
(() => {
  const storageKey = "tc_lang";
  const defaultLang = "vi";
  const locales = {
    vi: {
      common: {
        open: "Mở",
        soon: "Sắp ra mắt",
        copy: "Sao chép",
        close: "Đóng",
        or: "Hoặc"
      },
        topbar: {
          brand: "SpaceColors · 8Portal",
          slogan: "Một chạm mở không gian màu vô hạn",
          nav: {
            community: "Cộng đồng",
            spaces: "Không gian"
          },
                    portal: {
            placeholder: "Ch?n Th? gi?i",
            threadcolor: "Th? gi?i m?u th?u",
            palette: "Th? gi?i d?i m?u",
            soon: "S?p ra m?t"
          },
          communityContribute: "Đóng góp dữ liệu",
          communityVerify: "Xác minh",
          spaceVault: "Kho chỉ",
        spaceLibrary: "Kết quả đã lưu"
        },
        vault: {
          title: "Kho chỉ",
          desc: "Không gian này đang được hoàn thiện. Quay lại sau nhé.",
          tabSaved: "Kết quả đã lưu",
          tabStock: "Tồn kho",
          stockPlaceholder: "Tồn kho đang được chuẩn bị.",
          stock: {
            ctaTitle: "Đăng nhập để dùng Tồn kho",
            ctaDesc: "Quản lý tồn kho cá nhân theo tài khoản.",
            ctaAction: "Đăng nhập",
            search: "Tìm theo hãng/mã/tên/hex",
            add: "Thêm",
            import: "Nhập CSV",
            export: "Xuất CSV",
            summaryItems: "Tổng mã",
            summaryQty: "Tổng số lượng",
            summaryLow: "Sắp hết",
            table: {
              swatch: "Màu",
              brand: "Hãng",
              code: "Mã",
              name: "Tên",
              qty: "SL",
              unit: "Đơn vị",
              location: "Vị trí",
              updated: "Cập nhật",
              actions: "Thao tác"
            },
            empty: "Chưa có dữ liệu tồn kho.",
            modalAdd: "Thêm tồn kho",
            modalEdit: "Sửa tồn kho",
            modalSave: "Lưu",
            modalCancel: "Huỷ",
            fields: {
              brand: "Hãng",
              code: "Mã",
              name: "Tên",
              hex: "Hex",
              qty: "Số lượng",
              unit: "Đơn vị",
              location: "Vị trí",
              minQty: "Tồn tối thiểu",
              note: "Ghi chú"
            },
            actionEdit: "Sửa",
            actionDelete: "Xoá",
            confirmDelete: "Xoá mục này?"
          }
        },
      hero: {
        title: "Không gian chuẩn hóa màu của bạn",
        desc: "8 cổng tính năng dẫn bạn đến 8 Thế giới sắc màu — mỗi Thế giới là một công cụ riêng.\nThế giới màu chỉ: Chọn màu/HEX/ảnh → Mã chỉ đa hãng → Dùng ngay cho sản xuất.\nThế giới dải màu (sắp ra mắt): Tạo dải màu → Lưu bộ sưu tập → Xuất dữ liệu theo nhu cầu.\n6 Thế giới còn lại đang chuẩn bị. Khám phá cảm hứng và tạo không gian màu mang bản sắc của bạn.",
        ctaPrimary: "Mở công cụ",
        ctaSecondary: "Khám phá Thế giới"
      },
      portalHub: {
        title: "8 Cổng SpaceColors",
        desc: "Chọn cổng để bước vào một Thế giới sắc màu khác.",
        gates: {
          threadcolor: {
            title: "Thế giới màu chỉ",
            desc: "Tra cứu mã chỉ theo ảnh, màu và mã.",
            cta: "Mở"
          },
          palette: {
            title: "Thế giới dải màu",
            desc: "Khám phá bảng màu theo dải và cảm xúc.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          gem: {
            title: "Thế giới ngọc",
            desc: "Tông màu quý, ánh kim và chiều sâu.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          silk: {
            title: "Thế giới tơ lụa",
            desc: "Bảng màu mềm, mịn và mơ màng.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          craft: {
            title: "Thế giới thủ công",
            desc: "Sắc màu truyền thống, ấm và gần gũi.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          light: {
            title: "Thế giới ánh sáng",
            desc: "Dải màu rực rỡ, phản quang và sáng bừng.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          minimal: {
            title: "Thế giới tối giản",
            desc: "Bảng màu tối giản, tinh gọn và sang.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          },
          memory: {
            title: "Thế giới ký ức",
            desc: "Màu sắc hoài niệm và chất liệu xưa.",
            badge: "Sắp ra mắt",
            cta: "Sắp ra mắt"
          }
        }
      },
      quick: {
        title: "Hành động nhanh",
        desc: "Truy cập nhanh các tác vụ chính của 8Portal.",
        items: {
          threadcolor: {
            title: "Tra mã chỉ",
            desc: "Tra cứu màu chỉ theo ảnh, mã hoặc màu chọn.",
            cta: "Mở công cụ"
          },
          library: {
            title: "Thư viện",
            desc: "Lưu và xem lại các lần tra cứu của bạn.",
            cta: "Sắp ra mắt"
          },
          contribute: {
            title: "Đóng góp dữ liệu",
            desc: "Gửi màu và mã chỉ mới cho cộng đồng.",
            cta: "Bắt đầu"
          },
          verify: {
            title: "Xác minh",
            desc: "Dành cho admin duyệt dữ liệu cộng đồng.",
            cta: "Đi tới"
          }
        }
      },
      roulette: {
        title: "Vòng quay dải màu",
        desc: "Chọn ngẫu nhiên một bộ màu nhấn để khám phá nhanh.",
        spin: "Quay màu",
        reset: "Đặt lại"
      },
      forge: {
        title: "Lò rèn bảng màu",
        desc: "Tuỳ chỉnh bộ màu nhấn để phù hợp với gu của bạn.",
        a1: { label: "Màu nhấn 1" },
        a2: { label: "Màu nhấn 2" },
        a3: { label: "Màu nhấn 3" },
        preview: "Xem trước gradient",
        copy: "Sao chép CSS"
      },
      gallery: {
        title: "Bộ sưu tập sắc thái",
        desc: "8 sắc thái cảm giác.",
        activate: "Kích hoạt",
        aria: {
          nebula: "Kích hoạt Thế giới: Tinh vân",
          ocean: "Kích hoạt Thế giới: Đại dương",
          ink: "Kích hoạt Thế giới: Mực tàu",
          origami: "Kích hoạt Thế giới: Origami",
          arcade: "Kích hoạt Thế giới: Arcade",
          dunes: "Kích hoạt Thế giới: Đồi cát",
          chrome: "Kích hoạt Thế giới: Chrome",
          circuit: "Kích hoạt Thế giới: Mạch điện"
        }
      },
      footer: {
        left: "8Portal v4 · Khung A1→A3",
        right: "Token Thế giới đã sẵn sàng"
      },
      toast: {
        copied: "Đã sao chép!"
      },
      worlds: {
        nebula: {
          label: "Tinh vân",
          desc: "Tinh vân huyền ảo, ánh tím xanh sâu thẳm."
        },
        ocean: {
          label: "Đại dương",
          desc: "Đại dương mát lạnh, cảm giác trong trẻo."
        },
        ink: {
          label: "Mực tàu",
          desc: "Tối giản, mực tàu và độ sâu."
        },
        origami: {
          label: "Origami",
          desc: "Giấy gấp, ấm áp và nhẹ nhàng."
        },
        arcade: {
          label: "Arcade",
          desc: "Neon năng lượng, nhịp nhanh."
        },
        dunes: {
          label: "Đồi cát",
          desc: "Sa mạc, nắng vàng, yên tĩnh."
        },
        chrome: {
          label: "Chrome",
          desc: "Kim loại sáng, chuẩn xác, sạch."
        },
        circuit: {
          label: "Mạch điện",
          desc: "Mạch điện, xanh lục kỹ thuật."
        }
      },
      tc: {
        title: "Tra mã chỉ thêu theo màu",
        status: {
          loading: "Đang chuẩn bị dữ liệu...",
          ready: "Xong. Dữ liệu đã sẵn sàng.",
          empty: "Chưa chọn màu — hãy chọn màu trực tiếp hoặc từ ảnh.",
          noResults: "Không tìm thấy kết quả trong ngưỡng ΔE hiện tại. Thử tăng ΔE hoặc chọn thêm hãng.",
          error: "Lỗi tải dữ liệu. Vui lòng thử lại.",
          retry: "Thử lại"
        },
        result: {
          chosen: "Màu đã chọn",
          group: "Nhóm {index}",
          colors: "{count} màu",
          save: "Lưu",
          saved: "Đã lưu",
          saving: "Đang lưu...",
          noDataSave: "Không có dữ liệu để lưu.",
          loadMore: "Xem thêm ({count})",
          copyCode: "Sao chép mã",
          copyFull: "Sao chép đầy đủ"
        },
        pin: {
          pin: "Ghim",
          unpin: "Bỏ ghim",
          limit: "Chỉ ghim tối đa {count} kết quả.",
          panelTitle: "So sánh đã ghim",
          clear: "Xoá tất cả ghim",
          remove: "Bỏ ghim",
          copyCode: "Sao chép mã"
        },
        project: {
          label: "Dự án",
          placeholder: "Nhập tên dự án",
          recent: "Gần đây"
        },
        library: {
          title: "Kết quả đã lưu",
          loading: "Đang tải...",
          empty: "Chưa có bản lưu",
          open: "Mở",
          export: "Xuất CSV",
          exported: "Đã xuất CSV",
          error: "Không tải được thư viện",
          loadedFrom: "Đã tải từ Kết quả đã lưu {stamp}"
        },
        inspector: {
          copyAllLabel: "Tất cả"
        },
        toast: {
          copied: "Đã sao chép!",
          copiedWith: "Đã sao chép {label}."
        },
        action: {
          close: "Đóng"
        },
        auth: {
          needLogin: "Cần đăng nhập để tiếp tục.",
          needLoginSave: "Cần đăng nhập để lưu.",
          needLoginLibrary: "Cần đăng nhập để xem Đã lưu.",
          needLoginOpen: "Cần đăng nhập để mở.",
          needLoginContribute: "Cần đăng nhập để đóng góp dữ liệu.",
          needLoginVerify: "Cần đăng nhập để xác minh."
        },
        verify: {
          submitted: "Đã gửi, chờ xác minh"
        },
        section: {
          brand: {
            title: "Chọn hãng chỉ",
            verified: "Chỉ đã xác minh"
          },
          delta: {
            title: "Độ tương đồng màu (ΔE)",
            method: "Phương pháp ΔE",
            method76: "Cơ bản (ΔE76)",
            method2000: "Chuẩn hơn (CIEDE2000)",
            low: "Rất giống",
            high: "Khác hẳn"
          },
          pick: {
            title: "Chọn màu trực tiếp",
            nearest: "Tìm mã chỉ gần nhất",
            pick: "Chọn màu",
            hint: "Bấm vào bất kỳ đâu để chọn màu (Esc để hủy)",
            fallback: "Trình duyệt chưa hỗ trợ chọn màu toàn màn hình. Dùng input màu bên dưới."
          },
          image: {
            title: "Chọn màu từ ảnh",
            helper: "Chọn ảnh và bấm vào bất kỳ điểm nào để lấy màu"
          },
          code: {
            title: "Tra ngược theo mã chỉ",
            placeholder: "Nhập mã (VD: DMC 310)",
            action: "Tra cứu"
          }
        },
        inspector: {
          title: "Bảng thông tin màu",
          light: "Nền sáng",
          dark: "Nền tối",
          brand: "Hãng",
          code: "Mã chỉ",
          name: "Tên màu",
          delta: "Độ lệch (ΔE)",
          values: "Giá trị màu",
          copyAll: "Sao chép tất cả",
          rgbString: "Chuỗi RGB",
          close: "Đóng"
        },
        auth: {
          login: "Đăng nhập",
          register: "Đăng ký",
          email: "Địa chỉ email",
          password: "Mật khẩu",
          confirm: "Xác nhận mật khẩu",
          forgot: "Quên mật khẩu?",
          create: "Tạo tài khoản",
          google: "Tiếp tục với Google",
          facebook: "Tiếp tục với Facebook",
          close: "Đóng"
        },
        account: {
          library: "Bảng điều khiển",
          contribute: "Đóng góp dữ liệu",
          verify: "Xác minh",
          manage: "Quản lý tài khoản (sắp ra mắt)",
          logout: "Đăng xuất",
          login: "Đăng nhập"
        },
        library: {
          title: "Kết quả đã lưu",
          loading: "Đang tải..."
        },
        contribute: {
          title: "Đóng góp dữ liệu",
          brand: "Hãng",
          brandSelect: "Chọn hãng",
          brandCustom: "Hoặc nhập hãng mới",
          code: "Mã chỉ",
          name: "Tên màu (tuỳ chọn)",
          hex: "Hex",
          useCurrent: "Dùng màu hiện tại",
          cancel: "Huỷ",
          submit: "Gửi"
        },
        verify: {
          title: "Xác minh dữ liệu",
          loading: "Đang tải..."
        },
        buttons: {
          copy: "Sao chép"
        }
      }
    }
  };

  const state = {
    lang: defaultLang
  };

  const getByPath = (obj, path) => {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
  };

  const formatParams = (text, params) => {
    if (!params) return text;
    return Object.keys(params).reduce((acc, key) => {
      return acc.replace(new RegExp(`\\{${key}\\}`, "g"), params[key]);
    }, text);
  };

  const getLocale = (lang) => locales[lang] || locales[defaultLang];

  const t = (key, fallback = "", params) => {
    const dict = getLocale(state.lang);
    const value = getByPath(dict, key);
    if (value === null || value === undefined) return fallback;
    if (typeof value !== "string") return fallback;
    return formatParams(value, params);
  };

  const apply = (lang) => {
    if (lang) state.lang = lang;
    document.documentElement.setAttribute("lang", state.lang || defaultLang);
    const dict = getLocale(state.lang);
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const value = getByPath(dict, node.getAttribute("data-i18n"));
      if (value) node.textContent = value;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
      const raw = node.getAttribute("data-i18n-attr") || "";
      raw.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((item) => item.trim()).filter(Boolean);
        if (!attr || !key) return;
        const value = getByPath(dict, key);
        if (value) node.setAttribute(attr, value);
      });
    });
    document.querySelectorAll("[data-world-label]").forEach((node) => {
      const key = node.getAttribute("data-world-label");
      const label = dict.worlds?.[key]?.label;
      if (label) node.textContent = label;
    });
    document.querySelectorAll("[data-world-desc]").forEach((node) => {
      const key = node.getAttribute("data-world-desc");
      const desc = dict.worlds?.[key]?.desc;
      if (desc) node.textContent = desc;
    });
    document.querySelectorAll("#worldMenu [data-world]").forEach((node) => {
      const key = node.getAttribute("data-world");
      const label = dict.worlds?.[key]?.label;
      if (label) node.textContent = label;
    });
    const currentWorld = document.documentElement?.dataset?.world;
    if (currentWorld) {
      const label = dict.worlds?.[currentWorld]?.label;
      const worldLabel = document.getElementById("worldLabel");
      if (label && worldLabel) worldLabel.textContent = label;
    }
  };

  const setLang = (lang) => {
    state.lang = lang || defaultLang;
    try {
      localStorage.setItem(storageKey, state.lang);
    } catch (err) {}
    apply();
  };

  const extendLocale = (lang, patch) => {
    if (!lang || !patch) return;
    locales[lang] = { ...(locales[lang] || {}), ...patch };
    if (state.lang === lang) apply();
  };

  const init = () => {
    let stored = null;
    try {
      stored = localStorage.getItem(storageKey);
    } catch (err) {}
    state.lang = stored || defaultLang;
    apply();
  };

  window.tcI18n = {
    t,
    apply,
    setLang,
    extendLocale
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  document.addEventListener("tc-world-changed", () => {
    apply();
  });
})();

```

## FILE: data_normalize.js (size: 5378)
```js
const SPACE_REGEX = /\s+/g;
const HEX_REGEX = /^#[0-9A-F]{6}$/;
const CONFIDENCE_MAP = {
  TCH: 0.9,
  OFFICIAL_CHART: 0.95,
  USER_SUBMISSION: 0.5,
  MANUAL: 0.6,
  LEGACY_JSON: 0.9,
  RUNTIME_JSON: 0.86
};

function normalizeWhitespace(value) {
  return typeof value === "string" ? value.replace(SPACE_REGEX, " ").trim() : "";
}

function normalizeHexValue(hex) {
  if (!hex || typeof hex !== "string") return null;
  let v = hex.trim();
  if (v.startsWith("##")) v = v.slice(1);
  if (!v.startsWith("#")) v = "#" + v;
  v = v.toUpperCase();
  return HEX_REGEX.test(v) ? v : null;
}

function normalizeRgbValue(rgb) {
  if (!rgb || typeof rgb !== "object") return null;
  const r = Number.isInteger(rgb.r) ? rgb.r : null;
  const g = Number.isInteger(rgb.g) ? rgb.g : null;
  const b = Number.isInteger(rgb.b) ? rgb.b : null;
  if ([r, g, b].some(v => v === null)) return null;
  if ([r, g, b].some(v => v < 0 || v > 255)) return null;
  return { r, g, b };
}

function hexToRgb(hex) {
  const num = parseInt(hex.slice(1), 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function normalizeSource(src) {
  if (!src || typeof src !== "object") return { type: "unknown" };
  return {
    type: src.type || "unknown",
    file: src.file,
    line: src.line,
    provider: src.provider,
    uid: src.uid
  };
}

function formatSourceForLog(source) {
  if (!source) return "";
  const parts = [source.type || "unknown"];
  if (source.file) parts.push(source.file);
  if (source.line) parts.push(`line ${source.line}`);
  if (source.provider) parts.push(`provider ${source.provider}`);
  if (source.uid) parts.push(`uid ${source.uid}`);
  return parts.join(" | ");
}

function resolveConfidence(rawConfidence, sourceType) {
  if (typeof rawConfidence === "number") return rawConfidence;
  const mapped = CONFIDENCE_MAP[(sourceType || "").toUpperCase()];
  return typeof mapped === "number" ? mapped : 0.5;
}

function applyTimestamps(meta = {}, options = {}) {
  if (!options.addTimestamps) return meta;
  const stamp = options.timestamp || new Date().toISOString();
  const nextMeta = { ...meta };
  if (!nextMeta.createdAt) nextMeta.createdAt = stamp;
  if (!nextMeta.updatedAt) nextMeta.updatedAt = stamp;
  return nextMeta;
}

export function normalizeThreadRecord(raw, ctx = {}) {
  const source = normalizeSource(raw?.source || ctx.source);
  const brand = normalizeWhitespace(raw?.brand);
  const code = normalizeWhitespace(
    raw?.code !== undefined && raw?.code !== null ? String(raw.code) : ""
  );
  const name = normalizeWhitespace(raw?.name || "");
  const hex = normalizeHexValue(raw?.hex);
  const rgbFromRaw =
    normalizeRgbValue(raw?.rgb) || normalizeRgbValue({ r: raw?.r, g: raw?.g, b: raw?.b });
  const rgb = rgbFromRaw || (hex ? hexToRgb(hex) : null);

  if (!brand || !code || !hex || !rgb) {
    console.warn(
      `[normalize] Skip invalid record (${formatSourceForLog(source)}): ` +
        JSON.stringify({ brand, code, name, hex, rgb })
    );
    return null;
  }

  const brandKey = brand.toLowerCase();
  const canonicalKey = `${brandKey}::${code}`;
  const confidence = resolveConfidence(raw?.confidence ?? ctx.confidence, source.type);
  const meta = applyTimestamps(raw?.meta, ctx);

  return {
    brand,
    brandKey,
    code,
    name,
    hex,
    rgb,
    thickness: raw?.thickness,
    source,
    confidence,
    meta,
    canonicalKey
  };
}

export function dedupeThreads(records = []) {
  const byKey = new Map();

  records.forEach(rec => {
    if (!rec || !rec.canonicalKey) return;
    const existing = byKey.get(rec.canonicalKey);
    if (!existing) {
      byKey.set(rec.canonicalKey, { ...rec });
      return;
    }

    if (existing.hex === rec.hex) {
      const mergedSources = existing.sources || [existing.source];
      const incomingSource = rec.source;
      if (incomingSource && !mergedSources.some(s => JSON.stringify(s) === JSON.stringify(incomingSource))) {
        mergedSources.push(incomingSource);
      }
      existing.sources = mergedSources;
      existing.meta = { ...rec.meta, ...existing.meta };
      byKey.set(rec.canonicalKey, existing);
      return;
    }

    const existingConf = typeof existing.confidence === "number" ? existing.confidence : 0;
    const incomingConf = typeof rec.confidence === "number" ? rec.confidence : 0;
    const keepIncoming = incomingConf > existingConf;
    const keep = keepIncoming ? rec : existing;
    const alt = keepIncoming ? existing : rec;

    const alternates = keep.alternates ? [...keep.alternates] : [];
    if (alt.alternates && Array.isArray(alt.alternates)) {
      alternates.push(...alt.alternates);
    }
    alternates.push({
      hex: alt.hex,
      rgb: alt.rgb,
      source: alt.source,
      confidence: alt.confidence
    });
    keep.alternates = alternates;

    byKey.set(rec.canonicalKey, keep);
    console.warn(
      `[dedupe] Conflict on ${rec.canonicalKey} (${formatSourceForLog(rec.source)}): ` +
        `${existing.hex} vs ${rec.hex} -> keeping ${keepIncoming ? rec.hex : existing.hex}`
    );
  });

  return Array.from(byKey.values());
}

export function normalizeAndDedupeThreads(records = [], ctx = {}) {
  const normalized = [];
  records.forEach(raw => {
    const n = normalizeThreadRecord(raw, ctx);
    if (n) normalized.push(n);
  });
  return dedupeThreads(normalized);
}

```

## FILE: stock.js (size: 12546)
```js
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  deleteDoc,
  increment
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const $ = (sel) => document.querySelector(sel);
const t = (key, fallback, params) => window.tcI18n?.t?.(key, fallback, params) ?? fallback;

const state = {
  user: null,
  items: [],
  filtered: [],
  activeTab: "saved",
  editingId: null,
  isLoading: false
};

const els = {
  cta: $("#stockCta"),
  ctaBtn: $("#stockLoginBtn"),
  panel: $("#stockPanel"),
  search: $("#stockSearch"),
  addBtn: $("#stockAddBtn"),
  importBtn: $("#stockImportBtn"),
  exportBtn: $("#stockExportBtn"),
  fileInput: $("#stockFileInput"),
  summaryItems: $("#stockSummaryItems"),
  summaryQty: $("#stockSummaryQty"),
  summaryLow: $("#stockSummaryLow"),
  body: $("#stockBody"),
  empty: $("#stockEmpty"),
  overlay: $("#stockOverlay"),
  modal: $("#stockModal"),
  modalTitle: $("#stockModalTitle"),
  modalClose: $("#stockModalClose"),
  form: $("#stockForm"),
  cancel: $("#stockCancel"),
  brand: $("#stockBrand"),
  code: $("#stockCode"),
  name: $("#stockName"),
  hex: $("#stockHex"),
  qty: $("#stockQty"),
  unit: $("#stockUnit"),
  location: $("#stockLocation"),
  note: $("#stockNote"),
  minQty: $("#stockMinQty")
};

const normalizeKey = (value) => {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
};

const normalizeCode = (value) => {
  return (value || "")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, " ");
};

const normalizeHex = (hex) => {
  if (!hex || typeof hex !== "string") return "";
  let v = hex.trim().toUpperCase();
  if (!v.startsWith("#")) v = `#${v}`;
  return /^#[0-9A-F]{6}$/.test(v) ? v : "";
};

const getApi = () => window.firebaseAuth || window.firebaseAuthApi || null;
const getDb = () => getApi()?.db || null;

const setVisibility = (loggedIn) => {
  if (els.cta) els.cta.classList.toggle("hidden", loggedIn);
  if (els.panel) els.panel.classList.toggle("hidden", !loggedIn);
};

const setActiveTab = (tab) => {
  state.activeTab = tab;
  if (tab === "stock") {
    refresh();
  }
};

const refresh = () => {
  if (!state.user || state.activeTab !== "stock") {
    setVisibility(false);
    return;
  }
  setVisibility(true);
  if (!state.isLoading) loadItems();
};

const buildDocId = (brand, code) => `${normalizeKey(brand)}__${normalizeCode(code)}`;

const applyFilter = () => {
  const q = (els.search?.value || "").trim().toLowerCase();
  if (!q) {
    state.filtered = [...state.items];
  } else {
    state.filtered = state.items.filter((item) => {
      return [item.brand, item.code, item.name, item.hex].some((v) => (v || "").toLowerCase().includes(q));
    });
  }
  renderTable();
};

const updateSummary = () => {
  const totalItems = state.filtered.length;
  const totalQty = state.filtered.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  const low = state.filtered.filter((item) => {
    const qty = Number(item.qty) || 0;
    const min = Number(item.minQty) || 0;
    return qty <= min;
  }).length;
  if (els.summaryItems) els.summaryItems.textContent = `${totalItems}`;
  if (els.summaryQty) els.summaryQty.textContent = `${totalQty}`;
  if (els.summaryLow) els.summaryLow.textContent = `${low}`;
};

const renderTable = () => {
  if (!els.body) return;
  els.body.innerHTML = state.filtered.map((item) => {
    const updated = item.updatedAt?.toDate ? item.updatedAt.toDate().toLocaleString() : "";
    const qty = Number(item.qty) || 0;
    const min = Number(item.minQty) || 0;
    const warn = qty <= min ? "text-amber-600" : "";
    return `
      <tr class="border-b border-black/5">
        <td class="px-4 py-3">
          <span class="inline-block w-6 h-6 rounded border" style="background:${item.hex || "#fff"}"></span>
        </td>
        <td class="px-4 py-3">${item.brand || ""}</td>
        <td class="px-4 py-3">${item.code || ""}</td>
        <td class="px-4 py-3">${item.name || ""}</td>
        <td class="px-4 py-3 ${warn}">${qty}</td>
        <td class="px-4 py-3">${item.unit || ""}</td>
        <td class="px-4 py-3">${item.location || ""}</td>
        <td class="px-4 py-3 text-xs tc-muted">${updated}</td>
        <td class="px-4 py-3 text-right">
          <button class="tc-btn tc-chip px-2 py-1 text-xs" data-action="qty-plus" data-id="${item.id}">+</button>
          <button class="tc-btn tc-chip px-2 py-1 text-xs" data-action="qty-minus" data-id="${item.id}">-</button>
          <button class="tc-btn tc-chip px-2 py-1 text-xs" data-action="edit" data-id="${item.id}">${t("vault.stock.actionEdit", "Sửa")}</button>
          <button class="tc-btn tc-chip px-2 py-1 text-xs" data-action="delete" data-id="${item.id}">${t("vault.stock.actionDelete", "Xoá")}</button>
        </td>
      </tr>
    `;
  }).join("");
  const hasItems = state.filtered.length > 0;
  if (els.empty) els.empty.classList.toggle("hidden", hasItems);
  updateSummary();
};

const loadItems = async () => {
  if (!state.user || !getDb()) return;
  state.isLoading = true;
  try {
    const ref = collection(getDb(), "users", state.user.uid, "stockItems");
    const q = query(ref, orderBy("updatedAt", "desc"));
    const snap = await getDocs(q);
    state.items = snap.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    }));
    applyFilter();
  } catch (err) {
    console.error("[stock] load failed", err);
  } finally {
    state.isLoading = false;
  }
};

const openModal = (item) => {
  state.editingId = item?.id || null;
  if (els.modalTitle) {
    els.modalTitle.textContent = state.editingId
      ? t("vault.stock.modalEdit", "Sửa tồn kho")
      : t("vault.stock.modalAdd", "Thêm tồn kho");
  }
  els.brand.value = item?.brand || "";
  els.code.value = item?.code || "";
  els.name.value = item?.name || "";
  els.hex.value = item?.hex || "";
  els.qty.value = item?.qty ?? 0;
  els.unit.value = item?.unit || "";
  els.location.value = item?.location || "";
  els.note.value = item?.note || "";
  els.minQty.value = item?.minQty ?? 0;
  if (els.overlay) els.overlay.classList.remove("hidden");
  if (els.modal) {
    els.modal.classList.remove("hidden");
    els.modal.classList.add("flex");
  }
};

const closeModal = () => {
  if (els.overlay) els.overlay.classList.add("hidden");
  if (els.modal) {
    els.modal.classList.add("hidden");
    els.modal.classList.remove("flex");
  }
  state.editingId = null;
};

const saveItem = async () => {
  const brand = els.brand.value.trim();
  const code = els.code.value.trim();
  const qty = Number(els.qty.value);
  if (!brand || !code || Number.isNaN(qty)) return;
  const id = buildDocId(brand, code);
  const payload = {
    brand,
    brandKey: normalizeKey(brand),
    code,
    codeKey: normalizeCode(code),
    name: els.name.value.trim(),
    hex: normalizeHex(els.hex.value),
    qty: Number(els.qty.value) || 0,
    unit: els.unit.value.trim(),
    location: els.location.value.trim(),
    note: els.note.value.trim(),
    minQty: Number(els.minQty.value) || 0,
    updatedAt: serverTimestamp()
  };
  if (!state.editingId) payload.createdAt = serverTimestamp();
  if (!getDb()) return;
  if (state.editingId && state.editingId !== id) {
    await deleteDoc(doc(getDb(), "users", state.user.uid, "stockItems", state.editingId));
  }
  await setDoc(doc(getDb(), "users", state.user.uid, "stockItems", id), payload, { merge: true });
  closeModal();
  loadItems();
};

const updateQty = async (id, delta) => {
  if (!getDb()) return;
  const ref = doc(getDb(), "users", state.user.uid, "stockItems", id);
  await updateDoc(ref, { qty: increment(delta), updatedAt: serverTimestamp() });
  loadItems();
};

const deleteItem = async (id) => {
  const ok = confirm(t("vault.stock.confirmDelete", "Xoá mục này?"));
  if (!ok || !getDb()) return;
  await deleteDoc(doc(getDb(), "users", state.user.uid, "stockItems", id));
  loadItems();
};

const parseCsvRows = (text) => {
  const rows = [];
  const lines = text.split(/\r?\n/).filter(Boolean);
  for (const line of lines) {
    const cols = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i];
      if (ch === "\"") {
        inQuotes = !inQuotes;
        continue;
      }
      if (ch === "," && !inQuotes) {
        cols.push(current.trim());
        current = "";
        continue;
      }
      current += ch;
    }
    cols.push(current.trim());
    rows.push(cols);
  }
  return rows;
};

const importCsv = async (file) => {
  const text = await file.text();
  const rows = parseCsvRows(text);
  if (!rows.length) return;
  const header = rows[0].map((h) => h.toLowerCase());
  const get = (row, key, fallback = "") => {
    const idx = header.indexOf(key);
    return idx >= 0 ? row[idx] : fallback;
  };
  const dataRows = header.includes("brand") ? rows.slice(1) : rows;
  for (const row of dataRows) {
    const brand = get(row, "brand", row[0] || "").trim();
    const code = get(row, "code", row[1] || "").trim();
    if (!brand || !code) continue;
    const id = buildDocId(brand, code);
    const payload = {
      brand,
      brandKey: normalizeKey(brand),
      code,
      codeKey: normalizeCode(code),
      name: get(row, "name", row[2] || "").trim(),
      hex: normalizeHex(get(row, "hex", row[3] || "")),
      qty: Number(get(row, "qty", row[4] || "0")) || 0,
      unit: get(row, "unit", row[5] || "").trim(),
      location: get(row, "location", row[6] || "").trim(),
      note: get(row, "note", row[7] || "").trim(),
      minQty: Number(get(row, "minqty", row[8] || "0")) || 0,
      updatedAt: serverTimestamp()
    };
    await setDoc(doc(getDb(), "users", state.user.uid, "stockItems", id), payload, { merge: true });
  }
  loadItems();
};

const exportCsv = () => {
  const header = ["brand", "code", "name", "hex", "qty", "unit", "location", "note", "minQty"];
  const rows = state.items.map((item) => ([
    item.brand || "",
    item.code || "",
    item.name || "",
    item.hex || "",
    item.qty ?? 0,
    item.unit || "",
    item.location || "",
    item.note || "",
    item.minQty ?? 0
  ]));
  const csv = [header.join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/\"/g, '""')}"`).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "stock-items.csv";
  link.click();
  URL.revokeObjectURL(link.href);
};

const bindEvents = () => {
  els.ctaBtn?.addEventListener("click", () => window.tcAuth?.openAuth?.());
  els.search?.addEventListener("input", applyFilter);
  els.addBtn?.addEventListener("click", () => openModal());
  els.importBtn?.addEventListener("click", () => els.fileInput?.click());
  els.exportBtn?.addEventListener("click", () => exportCsv());
  els.fileInput?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (file) await importCsv(file);
    event.target.value = "";
  });
  els.modalClose?.addEventListener("click", closeModal);
  els.cancel?.addEventListener("click", closeModal);
  els.overlay?.addEventListener("click", closeModal);
  els.form?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveItem();
  });
  els.body?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-action]");
    if (!btn) return;
    const id = btn.getAttribute("data-id");
    if (!id) return;
    const action = btn.getAttribute("data-action");
    if (action === "edit") {
      const item = state.items.find((i) => i.id === id);
      if (item) openModal(item);
      return;
    }
    if (action === "delete") {
      deleteItem(id);
      return;
    }
    if (action === "qty-plus") {
      updateQty(id, 1);
      return;
    }
    if (action === "qty-minus") {
      updateQty(id, -1);
    }
  });
};

const onAuthChanged = (user) => {
  state.user = user || null;
  refresh();
};

const boot = () => {
  bindEvents();
  document.addEventListener("tc-vault-tab-changed", (event) => {
    const tab = event?.detail?.tab || "saved";
    setActiveTab(tab);
  });
  const api = getApi();
  if (api?.onAuthStateChanged) {
    api.onAuthStateChanged(onAuthChanged);
  }
};

window.addEventListener("firebase-auth-ready", boot, { once: true });
if (window.firebaseAuth?.onAuthStateChanged || window.firebaseAuthApi?.onAuthStateChanged) {
  boot();
}

```

## FILE: crowd.js (size: 5028)
```js
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit as fsLimit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { normalizeThreadRecord } from "./data_normalize.js";

export function normalizeBrandKey(brand) {
  if (!brand) return "";
  return brand.replace(/\s+/g, " ").trim().toLowerCase();
}

function ensureAuthUser(user) {
  if (!user || !user.uid) {
    throw new Error("User required");
  }
}

function cleanUndefined(value) {
  if (Array.isArray(value)) {
    return value
      .map(v => cleanUndefined(v))
      .filter(v => v !== undefined);
  }
  if (value && typeof value === "object") {
    const out = {};
    Object.entries(value).forEach(([k, v]) => {
      const cleaned = cleanUndefined(v);
      if (cleaned !== undefined) out[k] = cleaned;
    });
    return out;
  }
  return value === undefined ? undefined : value;
}

export async function submitThread(db, user, payload) {
  if (!db) throw new Error("Missing db");
  ensureAuthUser(user);
  if (!payload?.brand || !payload?.code || !payload?.hex) {
    throw new Error("Missing brand/code/hex");
  }
  const brandKey = normalizeBrandKey(payload.brand);
  const data = {
    brand: payload.brand.trim(),
    brandKey,
    code: String(payload.code).trim(),
    name: (payload.name || "").trim(),
    hex: payload.hex.trim(),
    rgb: payload.rgb || undefined,
    thickness: payload.thickness || undefined,
    status: "pending",
    createdByUid: user.uid,
    createdByName: user.displayName || "",
    createdByPhotoURL: user.photoURL || "",
    createdAt: serverTimestamp()
  };
  if (!data.rgb) {
    console.warn("[submitThread] missing rgb, omitting field", { hex: data.hex });
    delete data.rgb;
  }
  const cleaned = cleanUndefined(data);
  const ref = collection(db, "submissions");
  return addDoc(ref, cleaned);
}

export async function listPendingSubmissions(db, limitN = 50) {
  if (!db) throw new Error("Missing db");
  const ref = collection(db, "submissions");
  const q = query(
    ref,
    where("status", "==", "pending"),
    orderBy("createdAt", "desc"),
    fsLimit(limitN)
  );
  console.info("[listPendingSubmissions] query", {
    path: ref.path || "submissions",
    limit: limitN,
    orderBy: "createdAt desc",
    where: "status == pending"
  });
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function voteOnSubmission(db, submissionId, user, vote) {
  if (!db) throw new Error("Missing db");
  ensureAuthUser(user);
  if (!submissionId || !vote) throw new Error("Missing submissionId/vote");
  const ref = doc(db, "submissions", submissionId, "votes", user.uid);
  console.info("[voteOnSubmission] doc path =", ref.path);
  await setDoc(ref, { vote, createdAt: serverTimestamp() }, { merge: true });
}

export async function getVoteSummary(db, submissionId) {
  if (!db) throw new Error("Missing db");
  if (!submissionId) throw new Error("Missing submissionId");
  const ref = collection(db, "submissions", submissionId, "votes");
  console.info("[getVoteSummary] query", { path: ref.path });
  const snap = await getDocs(ref);
  let confirmCount = 0;
  let rejectCount = 0;
  snap.forEach(docSnap => {
    const vote = docSnap.data()?.vote;
    if (vote === "confirm") confirmCount += 1;
    if (vote === "reject") rejectCount += 1;
  });
  return { confirmCount, rejectCount };
}

export async function isAdmin(db, uid) {
  if (!db || !uid) return false;
  const snap = await getDoc(doc(db, "admins", uid));
  return snap.exists() && snap.data()?.enabled === true;
}


export async function promoteSubmissionToVerified(db, submissionDoc, summary, adminUser) {
  if (!db) throw new Error("Missing db");
  ensureAuthUser(adminUser);
  if (!submissionDoc?.id) throw new Error("Missing submission doc");
  const adminOk = await isAdmin(db, adminUser.uid);
  if (!adminOk) throw new Error("Admin required");

  const brandKey = normalizeBrandKey(submissionDoc.brand);
  const key = `${brandKey}__${submissionDoc.code}`;
  const baseRecord = {
    brand: submissionDoc.brand,
    code: submissionDoc.code,
    name: submissionDoc.name,
    hex: submissionDoc.hex,
    rgb: submissionDoc.rgb,
    thickness: submissionDoc.thickness,
    confidence: 0.85,
    source: { type: "CROWD_VERIFIED", uid: adminUser.uid, provider: "crowd" },
    meta: { updatedAt: serverTimestamp() }
  };
  const normalized = normalizeThreadRecord(baseRecord, { source: baseRecord.source, confidence: 0.85 });
  if (!normalized) throw new Error("Invalid submission payload");

  const verifiedRef = doc(db, "verifiedThreads", key);
  await setDoc(verifiedRef, cleanUndefined(normalized), { merge: true });

  const submissionRef = doc(db, "submissions", submissionDoc.id);
  await setDoc(
    submissionRef,
    {
      status: "approved",
      approvedAt: serverTimestamp(),
      approvedBy: adminUser.uid,
      voteSummary: summary || null
    },
    { merge: true }
  );
}

```

## FILE: style.css (size: 1677)
```css
/* Định dạng chung cho toàn trang */
body {
  font-family: Arial, sans-serif;   /* Font chữ dễ đọc */
  margin: 20px;                     /* Khoảng cách lề */
  line-height: 1.5;                 /* Độ cao dòng */
  background-color: #f5f5f5;        /* Màu nền nhẹ nhàng */
}

/* Tiêu đề chính */
h1 {
  color: #333;                      /* Màu chữ xám đậm */
  margin-bottom: 20px;
}

/* Các khối nội dung (section) */
section {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;           /* Viền mảnh */
  border-radius: 8px;               /* Bo góc */
  background: #fff;                 /* Nền trắng */
}

/* Nhãn và input */
label {
  margin-right: 10px;
  font-weight: bold;
}

input, button {
  margin-top: 5px;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Nút bấm */
button {
  background-color: #007BFF;        /* Xanh dương */
  color: white;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;        /* Xanh đậm khi hover */
}

/* Canvas hiển thị ảnh */
#canvas {
  display: block;
  border: 1px solid #ccc;
  max-width: 480px;
  margin-top: 10px;
}

/* Kết quả hiển thị */
#result {
  margin-top: 20px;
  padding: 10px;
  background: #eef;
  border: 1px solid #99c;
  border-radius: 6px;
}

/* Mỗi dòng kết quả */
#result .item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-bottom: 1px dashed #ccc;
}

/* Ô màu mẫu */
.swatch {
  width: 40px;
  height: 24px;
  border: 1px solid #aaa;
  border-radius: 4px;
}
```

## FILE: themes.css (size: 6301)
```css
:root {
  --z-topbar: 2000;
  --z-topbar-menu: 4000;
  --z-actionbar: 1500;
  --z-actionbar-menu: 3000;
  --bg0: radial-gradient(circle at 20% 20%, rgba(96, 223, 255, 0.18), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255, 140, 255, 0.2), transparent 40%), #060713;
  --panel: rgba(255, 255, 255, 0.06);
  --border: rgba(255, 255, 255, 0.12);
  --text: #e9f2ff;
  --muted: #b9c4dd;
  --accent: #7ae0ff;
  --portal-glow: 0 15px 50px rgba(122, 224, 255, 0.35);
  --radius-sm: 0.6rem;
  --radius-md: 0.9rem;
  --radius-lg: 1.25rem;
  --shadow-1: 0 12px 30px rgba(0,0,0,.12);
  --shadow-2: 0 18px 50px rgba(0,0,0,.18);
  --aurora-swatch: linear-gradient(135deg, #7ae0ff, #c189ff);
  --neon-swatch: linear-gradient(135deg, #00ffd1, #ff00ea);
  --zen-swatch: linear-gradient(135deg, #9ad4c8, #3f6d6c);
  --ocean-swatch: linear-gradient(135deg, #4ec2ff, #214b8f);
  --botanical-swatch: linear-gradient(135deg, #7bff9b, #2c7a44);
  --desert-swatch: linear-gradient(135deg, #ffc86b, #c06022);
  --retro-swatch: linear-gradient(135deg, #ff6bb5, #6b9bff);
  --royal-swatch: linear-gradient(135deg, #b08cff, #243b8b);
}

.theme-body {
  background: var(--bg0);
  color: var(--text);
}

.glass-card {
  background: var(--panel);
  border-color: var(--border);
  backdrop-filter: blur(14px);
}

[data-theme="neon"] {
  --bg0: radial-gradient(circle at 25% 20%, rgba(0, 255, 209, 0.18), transparent 35%), radial-gradient(circle at 80% 10%, rgba(255, 0, 234, 0.2), transparent 40%), #05030d;
  --panel: rgba(0, 0, 0, 0.35);
  --border: rgba(0, 255, 209, 0.25);
  --text: #f0f5ff;
  --muted: #9ad6d3;
  --accent: #00ffd1;
  --portal-glow: 0 15px 50px rgba(0, 255, 209, 0.35);
}

[data-theme="aurora"] {
  --bg0: radial-gradient(circle at 20% 20%, rgba(122, 224, 255, 0.15), transparent 35%), radial-gradient(circle at 70% 40%, rgba(193, 137, 255, 0.18), transparent 45%), #060713;
  --panel: rgba(255, 255, 255, 0.06);
  --border: rgba(255, 255, 255, 0.12);
  --text: #e9f2ff;
  --muted: #b9c4dd;
  --accent: #7ae0ff;
  --portal-glow: 0 15px 50px rgba(122, 224, 255, 0.35);
}

[data-theme="zen"] {
  --bg0: linear-gradient(135deg, #0c1a1a, #0f2a2a);
  --panel: rgba(255, 255, 255, 0.04);
  --border: rgba(124, 192, 180, 0.3);
  --text: #d9f2ec;
  --muted: #9cc8bc;
  --accent: #9ad4c8;
  --portal-glow: 0 15px 50px rgba(154, 212, 200, 0.35);
}

[data-theme="ocean"] {
  --bg0: radial-gradient(circle at 30% 15%, rgba(78, 194, 255, 0.18), transparent 35%), radial-gradient(circle at 80% 70%, rgba(33, 75, 143, 0.3), transparent 50%), #041021;
  --panel: rgba(255, 255, 255, 0.05);
  --border: rgba(78, 194, 255, 0.25);
  --text: #dff2ff;
  --muted: #9bc0e0;
  --accent: #4ec2ff;
  --portal-glow: 0 15px 50px rgba(78, 194, 255, 0.35);
}

[data-theme="botanical"] {
  --bg0: linear-gradient(145deg, #07140f, #0f2d1b);
  --panel: rgba(255, 255, 255, 0.04);
  --border: rgba(123, 255, 155, 0.25);
  --text: #e7ffe8;
  --muted: #a3d8b0;
  --accent: #7bff9b;
  --portal-glow: 0 15px 50px rgba(123, 255, 155, 0.35);
}

[data-theme="desert"] {
  --bg0: linear-gradient(160deg, #1f1206, #2d1b0a 50%, #5a3211 100%);
  --panel: rgba(255, 255, 255, 0.05);
  --border: rgba(255, 200, 107, 0.25);
  --text: #ffeede;
  --muted: #e4caa7;
  --accent: #ffc86b;
  --portal-glow: 0 15px 50px rgba(255, 200, 107, 0.35);
}

[data-theme="retro"] {
  --bg0: radial-gradient(circle at 20% 20%, rgba(255, 107, 181, 0.16), transparent 35%), radial-gradient(circle at 80% 20%, rgba(107, 155, 255, 0.18), transparent 40%), #0b0a16;
  --panel: rgba(255, 255, 255, 0.04);
  --border: rgba(255, 107, 181, 0.25);
  --text: #f0e8ff;
  --muted: #cbb7e6;
  --accent: #ff6bb5;
  --portal-glow: 0 15px 50px rgba(255, 107, 181, 0.35);
}

[data-theme="royal"] {
  --bg0: linear-gradient(150deg, #0b0e2a, #141a3f 50%, #1d2e63 100%);
  --panel: rgba(255, 255, 255, 0.05);
  --border: rgba(176, 140, 255, 0.3);
  --text: #e9e6ff;
  --muted: #bfc5ec;
  --accent: #b08cff;
  --portal-glow: 0 15px 50px rgba(176, 140, 255, 0.35);
}

.text-text { color: var(--text); }
.text-muted { color: var(--muted); }
.text-accent { color: var(--accent); }
.bg-panel { background: var(--panel); }
.border-border { border-color: var(--border); }
.bg-accent { background: var(--accent); }

.card {
  background: var(--glass, var(--panel));
  border: 1px solid var(--stroke, var(--border));
  color: var(--text);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-1);
}

.badge {
  background: var(--glass, var(--panel));
  border: 1px solid var(--stroke, var(--border));
  color: var(--text);
  border-radius: 999px;
}

.input,
.select {
  background: var(--glass, var(--panel));
  border: 1px solid var(--stroke, var(--border));
  color: var(--text);
  border-radius: var(--radius-md);
}

.input::placeholder { color: var(--muted); }
.input:focus-visible,
.select:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1, var(--accent));
}

.btn {
  border-radius: var(--radius-md);
  border: 1px solid var(--stroke, var(--border));
  background: var(--glass, var(--panel));
  color: var(--text);
  font-weight: 600;
  letter-spacing: -0.005em;
}
.btn:hover { filter: brightness(1.03); }
.btn:active { transform: translateY(1px); }
.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1, var(--accent));
}

.btn-primary {
  background: linear-gradient(135deg, var(--a1, var(--accent)), var(--a2, #8b5cf6));
  color: #fff;
  border: 1px solid rgba(255,255,255,.18);
}
.btn-primary:hover { filter: brightness(1.06); }

.btn-ghost {
  background: transparent;
  border: 1px solid transparent;
  color: var(--text);
}

.panel {
  background: var(--glass, var(--panel));
  border: 1px solid var(--stroke, var(--border));
  color: var(--text);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-2);
}

.toast {
  background: var(--glass, var(--panel));
  border: 1px solid var(--stroke, var(--border));
  color: var(--text);
  border-radius: var(--radius-md);
}

@media (prefers-reduced-motion: reduce) {
  .btn,
  .panel,
  .card,
  .toast {
    transition: none;
  }
}

```

## FILE: firestore.rules (size: 1153)
```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    match /verifiedThreads/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /submissions/{id} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.createdByUid == request.auth.uid;
      allow update: if isAdmin() || (request.auth != null && request.resource.data.createdByUid == request.auth.uid && request.resource.data.status == "pending");
      allow delete: if isAdmin() || (request.auth != null && request.resource.data.createdByUid == request.auth.uid);

      match /votes/{uid} {
        allow read: if request.auth != null;
        allow write: if request.auth != null && request.auth.uid == uid;
        allow delete: if request.auth != null && request.auth.uid == uid;
      }
    }

    match /admins/{uid} {
      allow read: if isAdmin();
      allow write: if false;
    }
  }
}

```

## FILE: threads.json (size: 486593)
```json
(B&#7886; QUA DO QU&#193; L&#7898;N) size=486593 bytes
--- HEAD (200 d&#242;ng) ---
[
  {
    "brand": "Anchor",
    "code": "001",
    "name": "White",
    "hex": "#FFFFFF",
    "lab": [
      100.0,
      0.0053,
      -0.0104
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "Anchor",
    "code": "403",
    "name": "Dark Red",
    "hex": "#A00030",
    "lab": [
      33.3223,
      57.7895,
      21.5207
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "Ming Shyang",
    "code": "700",
    "name": "Đỏ tươi",
    "hex": "#FF0000",
    "lab": [
      53.2329,
      80.1093,
      67.2201
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "Ming Shyang",
    "code": "735",
    "name": "Nâu tan",
    "hex": "#C49C67",
    "lab": [
      66.8941,
      8.1142,
      33.3175
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "Ming Shyang",
    "code": "483",
    "name": "Ghi sáng",
    "hex": "#C4C4C4",
    "lab": [
      79.157,
      0.0043,
      -0.0085
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "Ming Shyang",
    "code": "484",
    "name": "Ghi sẫm",
    "hex": "#808080",
    "lab": [
      53.585,
      0.0032,
      -0.0062
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "Ming Shyang",
    "code": "371",
    "name": "Xanh thiên thanh sáng",
    "hex": "#33CCFF",
    "lab": [
      76.7453,
      -21.9482,
      -35.9869
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "Ming Shyang",
    "code": "372",
    "name": "Xanh thiên thanh",
    "hex": "#00BFFF",
    "lab": [
      72.5492,
      -17.648,
      -42.5483
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "Ming Shyang",
    "code": "305",
    "name": "Xanh lam đậm",
    "hex": "#005991",
    "lab": [
      36.3458,
      -0.4378,
      -37.089
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "Ming Shyang",
    "code": "366",
    "name": "Xanh bích nhạt",
    "hex": "#3445DB",
    "lab": [
      38.0227,
      45.1086,
      -77.901
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
--- TAIL (200 d&#242;ng) ---
    "brand": "DMC",
    "code": "310-15",
    "name": "Black Var 15",
    "hex": "#000000",
    "lab": [
      0.0,
      0.0,
      0.0
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "DMC",
    "code": "B5200-15",
    "name": "Snow White Var 15",
    "hex": "#FFFFFF",
    "lab": [
      100.0,
      0.0053,
      -0.0104
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "DMC",
    "code": "3865-15",
    "name": "Winter White Var 15",
    "hex": "#F5F5F5",
    "lab": [
      96.5375,
      0.0051,
      -0.0101
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "DMC",
    "code": "Ecru-15",
    "name": "Ecru Var 15",
    "hex": "#E7D6C1",
    "lab": [
      86.4705,
      2.4784,
      12.4813
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "DMC",
    "code": "318-15",
    "name": "Steel Gray Var 15",
    "hex": "#ABABAB",
    "lab": [
      69.9821,
      0.0039,
      -0.0077
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "DMC",
    "code": "415-15",
    "name": "Pearl Gray Var 15",
    "hex": "#B8B8B8",
    "lab": [
      74.782,
      0.0041,
      -0.0081
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "DMC",
    "code": "3799-15",
    "name": "Pewter Gray Var 15",
    "hex": "#6F6F6F",
    "lab": [
      46.8379,
      0.0028,
      -0.0056
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "DMC",
    "code": "321-15",
    "name": "Red Var 15",
    "hex": "#C80000",
    "lab": [
      41.6567,
      66.7145,
      55.9805
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "DMC",
    "code": "666-15",
    "name": "Bright Red Var 15",
    "hex": "#E4002B",
    "lab": [
      47.8395,
      74.2198,
      44.7464
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  },
  {
    "brand": "DMC",
    "code": "815-15",
    "name": "Garnet Var 15",
    "hex": "#6A1B1B",
    "lab": [
      23.4292,
      34.8679,
      20.5692
    ],
    "source": {
      "type": "legacy_json",
      "file": "77a33705-a316-4888-bbd3-5716e25c671d.json",
      "imported_at": "2025-12-18"
    },
    "rating": {
      "score": null,
      "votes": 0
    }
  }
]
```

## FILE: README.md (size: 931)
```markdown
# ThreadColor

Thuộc hệ sinh thái 8Portals / SpaceColors.

## Bản chạy
- GitHub Pages: https://vuanhminh1609-boop.github.io/threadcolor/

## Sản phẩm làm gì
- Tra mã chỉ theo màu từ dữ liệu nhiều hãng.
- Cho phép chọn màu trực tiếp, từ ảnh, hoặc tra theo mã chỉ.
- Hỗ trợ lọc theo hãng và chỉ hiển thị dữ liệu đã xác minh.
- Hiển thị thông tin màu chi tiết (HEX/RGB/LAB/HSL).
- Đồng bộ theme (8 thế giới) và trải nghiệm đăng nhập chung.

## Bản đồ nhanh
- Sơ đồ tổng quan, module map, luồng dữ liệu: `DOC/00_TOAN_CANH.md`

## Vận hành
- Quy trình issue → PR → deploy: `DOC/01_WORKFLOW.md`

## Quản trị GitHub
- Labels/Project board chuẩn: `DOC/02_QUAN_TRI_GITHUB.md`

## Đóng góp & bảo mật
- Đóng góp: `CONTRIBUTING.md`
- Bảo mật: `SECURITY.md`

## Ownership
- CODEOWNERS: `.github/CODEOWNERS`

```

## FILE: .github\ISSUE_TEMPLATE\bug_report.yml (size: 1197)
```yaml
name: "Báo lỗi"
description: "Báo lỗi để đội ngũ xử lý"
title: "[Bug] "
labels: ["Bug", "P1-Quan trọng"]
body:
  - type: markdown
    attributes:
      value: "Vui lòng điền đầy đủ thông tin để tái hiện lỗi."
  - type: textarea
    id: summary
    attributes:
      label: "Mô tả lỗi"
      description: "Lỗi xảy ra như thế nào?"
      placeholder: "VD: Khi bấm tìm mã chỉ gần nhất thì không ra kết quả."
    validations:
      required: true
  - type: textarea
    id: steps
    attributes:
      label: "Các bước tái hiện"
      description: "Liệt kê từng bước"
      placeholder: "1) ...\n2) ..."
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: "Kỳ vọng"
      placeholder: "VD: Kết quả phải hiển thị danh sách mã chỉ."
    validations:
      required: true
  - type: input
    id: environment
    attributes:
      label: "Môi trường"
      placeholder: "Chrome 123 / Windows 11"
  - type: textarea
    id: attachments
    attributes:
      label: "Ảnh/Screenshot (nếu có)"
      placeholder: "Kéo thả ảnh hoặc dán link."

```

## FILE: .github\ISSUE_TEMPLATE\feature_request.yml (size: 740)
```yaml
name: "Đề xuất tính năng"
description: "Đề xuất tính năng hoặc cải tiến"
title: "[Feature] "
labels: ["Tính năng", "P2-Nâng cấp"]
body:
  - type: markdown
    attributes:
      value: "Mô tả ngắn gọn nhu cầu và giá trị."
  - type: textarea
    id: problem
    attributes:
      label: "Vấn đề / Nhu cầu"
      placeholder: "VD: Cần thêm bộ lọc theo nhóm màu."
    validations:
      required: true
  - type: textarea
    id: solution
    attributes:
      label: "Giải pháp đề xuất"
      placeholder: "VD: Thêm dropdown nhóm màu ở khu lọc."
  - type: textarea
    id: done
    attributes:
      label: "Tiêu chí hoàn thành"
      placeholder: "- [ ] ...\n- [ ] ..."

```

## FILE: .github\pull_request_template.md (size: 326)
```markdown
## Mục tiêu
- 

## Thay đổi chính
- 

## Ảnh hưởng / rủi ro
- 

## Checklist test
- [ ] Không lỗi console
- [ ] Dòng “Xong. Dữ liệu đã sẵn sàng.” còn xuất hiện
- [ ] “Tìm mã chỉ gần nhất” trả kết quả
- [ ] Login top-right hoạt động

## Ảnh/Screenshot (nếu UI)
- 

```

## FILE: CONTRIBUTING.md (size: 565)
```markdown
# Đóng góp cho ThreadColor

## Chạy local (web tĩnh)
Ví dụ:
```bash
python -m http.server 5173
```
Mở: `http://localhost:5173/worlds/threadcolor.html`

## Quy tắc PR
- PR nhỏ, rõ ràng, đúng phạm vi.
- Không sửa file ngoài phạm vi được giao.
- Không phá login top-right và luồng auth.
- Giữ tiếng Việt cho text hiển thị.

## Definition of Done (tối thiểu)
- Không lỗi console.
- Dòng “Xong. Dữ liệu đã sẵn sàng.” vẫn xuất hiện khi ready.
- “Tìm mã chỉ gần nhất” trả kết quả.

```

## FILE: SECURITY.md (size: 398)
```markdown
# Bảo mật

Nếu bạn phát hiện lỗ hổng bảo mật:
- Vui lòng dùng tính năng “Report a vulnerability” trên GitHub để gửi báo cáo riêng tư.
- Không báo lỗ hổng nghiêm trọng qua Issues public.

Phạm vi:
- Ứng dụng web ThreadColor và các World liên quan.

Thời gian phản hồi dự kiến:
- Phản hồi ban đầu trong 3–7 ngày làm việc.

```

## FILE: data\threads.generated.json (size: 8155)
```json
[
  {
    "brand": "Isacord 30",
    "code": "0010",
    "name": "Parchment",
    "hex": "#FFFFFA",
    "rgb": {
      "r": 255,
      "g": 255,
      "b": 250
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 2
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0015",
    "name": "White",
    "hex": "#FFFFFF",
    "rgb": {
      "r": 255,
      "g": 255,
      "b": 255
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 1
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0020",
    "name": "Black",
    "hex": "#000000",
    "rgb": {
      "r": 0,
      "g": 0,
      "b": 0
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 28
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0111",
    "name": "Dark Grey",
    "hex": "#7F7F7F",
    "rgb": {
      "r": 127,
      "g": 127,
      "b": 127
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 26
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0124",
    "name": "Light Grey Brown",
    "hex": "#CCCCB9",
    "rgb": {
      "r": 204,
      "g": 204,
      "b": 185
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 25
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0142",
    "name": "Silver Grey",
    "hex": "#B2B2B2",
    "rgb": {
      "r": 178,
      "g": 178,
      "b": 178
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 27
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0600",
    "name": "Yellow",
    "hex": "#FFFF00",
    "rgb": {
      "r": 255,
      "g": 255,
      "b": 0
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 3
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0702",
    "name": "Mid Gold",
    "hex": "#FFE64B",
    "rgb": {
      "r": 255,
      "g": 230,
      "b": 75
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 4
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0704",
    "name": "Darker Gold",
    "hex": "#F5F066",
    "rgb": {
      "r": 245,
      "g": 240,
      "b": 102
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 5
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0761",
    "name": "Light Grey Brown",
    "hex": "#F5EBCC",
    "rgb": {
      "r": 245,
      "g": 235,
      "b": 204
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 22
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0800",
    "name": "Orange Gold",
    "hex": "#FFF500",
    "rgb": {
      "r": 255,
      "g": 245,
      "b": 0
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 6
    }
  },
  {
    "brand": "Isacord 30",
    "code": "0851",
    "name": "Gold",
    "hex": "#F0CC91",
    "rgb": {
      "r": 240,
      "g": 204,
      "b": 145
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 24
    }
  },
  {
    "brand": "Isacord 30",
    "code": "1304",
    "name": "Orange",
    "hex": "#FF7D00",
    "rgb": {
      "r": 255,
      "g": 125,
      "b": 0
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 9
    }
  },
  {
    "brand": "Isacord 30",
    "code": "1346",
    "name": "Night Brown",
    "hex": "#875A2D",
    "rgb": {
      "r": 135,
      "g": 90,
      "b": 45
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 8
    }
  },
  {
    "brand": "Isacord 30",
    "code": "1355",
    "name": "Dark Brown",
    "hex": "#996633",
    "rgb": {
      "r": 153,
      "g": 102,
      "b": 51
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 7
    }
  },
  {
    "brand": "Isacord 30",
    "code": "1703",
    "name": "Red",
    "hex": "#FF0000",
    "rgb": {
      "r": 255,
      "g": 0,
      "b": 0
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 10
    }
  },
  {
    "brand": "Isacord 30",
    "code": "1876",
    "name": "Brownish Green",
    "hex": "#7D5A32",
    "rgb": {
      "r": 125,
      "g": 90,
      "b": 50
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 23
    }
  },
  {
    "brand": "Isacord 30",
    "code": "1902",
    "name": "Dark Red",
    "hex": "#CC0000",
    "rgb": {
      "r": 204,
      "g": 0,
      "b": 0
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 11
    }
  },
  {
    "brand": "Isacord 30",
    "code": "1912",
    "name": "Plum",
    "hex": "#AF004B",
    "rgb": {
      "r": 175,
      "g": 0,
      "b": 75
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 13
    }
  },
  {
    "brand": "Isacord 30",
    "code": "1913",
    "name": "Brown Fox",
    "hex": "#CC3300",
    "rgb": {
      "r": 204,
      "g": 51,
      "b": 0
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 12
    }
  },
  {
    "brand": "Isacord 30",
    "code": "2123",
    "name": "Dark Plum",
    "hex": "#870033",
    "rgb": {
      "r": 135,
      "g": 0,
      "b": 51
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 14
    }
  },
  {
    "brand": "Isacord 30",
    "code": "2241",
    "name": "Plum Pink",
    "hex": "#CC8C96",
    "rgb": {
      "r": 204,
      "g": 140,
      "b": 150
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 15
    }
  },
  {
    "brand": "Isacord 30",
    "code": "2250",
    "name": "Mauve Pink",
    "hex": "#FFCCD7",
    "rgb": {
      "r": 255,
      "g": 204,
      "b": 215
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 16
    }
  },
  {
    "brand": "Isacord 30",
    "code": "3355",
    "name": "Navy",
    "hex": "#000066",
    "rgb": {
      "r": 0,
      "g": 0,
      "b": 102
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 18
    }
  },
  {
    "brand": "Isacord 30",
    "code": "3543",
    "name": "Marine Blue",
    "hex": "#3300CC",
    "rgb": {
      "r": 51,
      "g": 0,
      "b": 204
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 17
    }
  },
  {
    "brand": "Isacord 30",
    "code": "3820",
    "name": "Medium Blue",
    "hex": "#96BEE6",
    "rgb": {
      "r": 150,
      "g": 190,
      "b": 230
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 19
    }
  },
  {
    "brand": "Isacord 30",
    "code": "5326",
    "name": "Dark Leaf Green",
    "hex": "#007350",
    "rgb": {
      "r": 0,
      "g": 115,
      "b": 80
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 21
    }
  },
  {
    "brand": "Isacord 30",
    "code": "5422",
    "name": "Teal Green",
    "hex": "#3CAF78",
    "rgb": {
      "r": 60,
      "g": 175,
      "b": 120
    },
    "thickness": "B",
    "source": {
      "type": "TCH",
      "file": "Ackerman Isacord 30.tch",
      "line": 20
    }
  }
]

```

## FILE: tools\bootstrap_admin.mjs (size: 1090)
```js
#!/usr/bin/env node
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import fs from "fs";

const ADMIN_UID = "Enx4e7xn8Rfv5uY3i4qeMDkoGPh2";

function loadCredential() {
  const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (keyPath && fs.existsSync(keyPath)) {
    const keyJson = JSON.parse(fs.readFileSync(keyPath, "utf8"));
    return cert(keyJson);
  }
  // Fallback to ADC (gcloud auth application-default login)
  return applicationDefault();
}

async function main() {
  const cred = loadCredential();
  const app = initializeApp({ credential: cred });
  const db = getFirestore(app);

  const docRef = db.collection("admins").doc(ADMIN_UID);
  await docRef.set(
    {
      uid: ADMIN_UID,
      role: "admin",
      note: "bootstrap",
      createdAt: FieldValue.serverTimestamp()
    },
    { merge: true }
  );
  console.log(`Admin doc written at admins/${ADMIN_UID}`);
}

main().catch(err => {
  console.error("Bootstrap admin failed:", err);
  process.exit(1);
});

```

## FILE: tools\import_tch.mjs (size: 3423)
```js
#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { normalizeAndDedupeThreads } from "../data_normalize.js";

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag, fallback) => {
    const i = args.indexOf(flag);
    return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
  };
  return {
    inDir: get("--in", "data/raw_tch"),
    outFile: get("--out", "data/threads.generated.json")
  };
}

function hexFromRgb(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map(v => {
        const n = Number(v);
        return Number.isInteger(n) && n >= 0 && n <= 255
          ? n.toString(16).padStart(2, "0")
          : null;
      })
      .join("")
  ).toUpperCase();
}

function parseLine(line, file, lineNumber) {
  const parts = line.split(",").map(p => p.trim());
  if (parts.length === 6 || parts.length === 7) {
    const [code, brand, name, maybeThickness, rRaw, gRaw, bRaw] =
      parts.length === 7
        ? parts
        : [parts[0], parts[1], parts[2], null, parts[3], parts[4], parts[5]];
    const r = Number(rRaw);
    const g = Number(gRaw);
    const b = Number(bRaw);
    if (![r, g, b].every(v => Number.isInteger(v) && v >= 0 && v <= 255)) {
      console.warn(`Skip invalid RGB at ${file}:${lineNumber} -> ${line}`);
      return null;
    }
    const hex = hexFromRgb(r, g, b);
    if (!hex || hex.includes("null")) {
      console.warn(`Skip invalid hex at ${file}:${lineNumber} -> ${line}`);
      return null;
    }
    return {
      brand,
      code,
      name,
      hex,
      rgb: { r, g, b },
      thickness: maybeThickness || undefined,
      source: { type: "TCH", file: path.basename(file), line: lineNumber },
      confidence: 0.9
    };
  }
  console.warn(`Skip invalid column count at ${file}:${lineNumber} -> ${line}`);
  return null;
}

async function readTchFile(filePath, results) {
  const data = await fs.readFile(filePath, "utf8");
  const lines = data.split(/\r?\n/);
  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();
    if (!line) return;
    const parsed = parseLine(line, path.basename(filePath), idx + 1);
    if (!parsed) return;
    results.push(parsed);
  });
}

async function main() {
  const { inDir, outFile } = parseArgs();
  await fs.mkdir(inDir, { recursive: true });
  const outDir = path.dirname(outFile);
  await fs.mkdir(outDir, { recursive: true });

  const entries = await fs.readdir(inDir, { withFileTypes: true });
  const tchFiles = entries
    .filter(e => e.isFile() && e.name.toLowerCase().endsWith(".tch"))
    .map(e => path.join(inDir, e.name));

  if (!tchFiles.length) {
    console.warn(`No .tch files found in ${inDir}`);
    await fs.writeFile(outFile, "[]\n", "utf8");
    return;
  }

  const results = [];

  for (const file of tchFiles) {
    await readTchFile(file, results);
  }

  const normalized = normalizeAndDedupeThreads(results, {
    addTimestamps: true,
    timestamp: new Date().toISOString()
  });

  normalized.sort((a, b) => {
    const brandCmp = (a.brand || "").localeCompare(b.brand || "");
    if (brandCmp !== 0) return brandCmp;
    return (a.code || "").localeCompare(b.code || "");
  });

  await fs.writeFile(outFile, JSON.stringify(normalized, null, 2) + "\n", "utf8");
  console.log(`Written ${normalized.length} records to ${outFile}`);
}

main().catch(err => {
  console.error("Import failed", err);
  process.exit(1);
});

```

## FILE: tools\normalize_threads.mjs (size: 711)
```js
import { writeFile } from "node:fs/promises";
import { runValidation } from "./validate_threads.mjs";

const threadsPath = new URL("../threads.json", import.meta.url);

const main = async () => {
  const { cleaned, conflicts } = await runValidation();
  if (conflicts.length) {
    console.error(`[normalize_threads] Có ${conflicts.length} xung đột. Vui lòng xử lý threads.conflicts.json trước.`);
    process.exit(1);
  }
  await writeFile(threadsPath, JSON.stringify(cleaned, null, 2), "utf8");
  console.info(`[normalize_threads] Ghi threads.json thành công (${cleaned.length} bản ghi).`);
};

main().catch((err) => {
  console.error("[normalize_threads] failed", err);
  process.exit(1);
});

```

## FILE: tools\validate_threads.mjs (size: 4948)
```js
import { readFile, writeFile } from "node:fs/promises";

const threadsPath = new URL("../threads.json", import.meta.url);
const cleanedPath = new URL("../threads.cleaned.json", import.meta.url);
const conflictsPath = new URL("../threads.conflicts.json", import.meta.url);

const normalizeKey = (value) => {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
};

const normalizeCode = (value) => {
  return (value || "")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, " ");
};

const normalizeHex = (hex) => {
  if (!hex || typeof hex !== "string") return null;
  let v = hex.trim().toLowerCase().replace(/^##/, "#");
  if (!v.startsWith("#")) v = "#" + v;
  return /^#[0-9a-f]{6}$/.test(v) ? v : null;
};

const hexToRgbArray = (hex) => {
  const num = parseInt(hex.slice(1), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const rgbToLab = ([r, g, b]) => {
  r /= 255; g /= 255; b /= 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  let y = (r * 0.2126 + g * 0.7152 + b * 0.0722);
  let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.cbrt(x) : (7.787 * x + 16 / 116);
  y = y > 0.008856 ? Math.cbrt(y) : (7.787 * y + 16 / 116);
  z = z > 0.008856 ? Math.cbrt(z) : (7.787 * z + 16 / 116);

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
};

const getScore = (record) => {
  const ratingScore = typeof record?.rating?.score === "number" ? record.rating.score : null;
  const voteScore = typeof record?.votes === "number" ? record.votes : null;
  const voteCount = typeof record?.voteCount === "number" ? record.voteCount : null;
  const confidence = typeof record?.confidence === "number" ? record.confidence : null;
  const base = ratingScore ?? voteScore ?? voteCount ?? confidence ?? 0;
  const verified = record?.source?.verified === true || record?.verified === true;
  return (verified ? 1000 : 0) + base;
};

export async function runValidation() {
  const raw = await readFile(threadsPath, "utf8");
  const data = JSON.parse(raw);
  const items = Array.isArray(data) ? data : [];
  const map = new Map();
  const conflicts = [];
  const cleaned = [];
  let deduped = 0;
  let computedLab = 0;
  let invalid = 0;

  for (const record of items) {
    const brand = typeof record?.brand === "string" ? record.brand.trim() : "";
    const code = typeof record?.code === "string" ? record.code.trim() : "";
    const hex = normalizeHex(record?.hex || "");
    if (!brand || !code || !hex) {
      invalid += 1;
      continue;
    }
    const brandKey = normalizeKey(brand);
    const codeKey = normalizeCode(code);
    const id = `${brandKey}:${codeKey}`;
    const existing = map.get(id);
    const withLab = Array.isArray(record?.lab) && record.lab.length === 3
      ? record.lab
      : rgbToLab(hexToRgbArray(hex));
    if (!record.lab || record.lab.length !== 3) computedLab += 1;
    const next = {
      ...record,
      brand,
      code,
      hex,
      lab: withLab,
      brandKey,
      codeKey,
      id
    };
    if (!existing) {
      map.set(id, { items: [next], hex });
      continue;
    }
    if (existing.hex !== hex) {
      existing.items.push(next);
      continue;
    }
    deduped += 1;
    existing.items.push(next);
  }

  for (const [id, group] of map.entries()) {
    const records = group.items;
    if (records.length === 1) {
      cleaned.push(records[0]);
      continue;
    }
    const uniqueHex = new Set(records.map(r => r.hex));
    if (uniqueHex.size > 1) {
      conflicts.push({ id, records });
      const sorted = [...records].sort((a, b) => getScore(b) - getScore(a));
      const picked = { ...sorted[0], needsReview: true };
      cleaned.push(picked);
      continue;
    }
    const sorted = [...records].sort((a, b) => getScore(b) - getScore(a));
    cleaned.push(sorted[0]);
    deduped += records.length - 1;
  }

  await writeFile(cleanedPath, JSON.stringify(cleaned, null, 2), "utf8");
  await writeFile(conflictsPath, JSON.stringify(conflicts, null, 2), "utf8");

  console.info("[validate_threads] total", items.length);
  console.info("[validate_threads] cleaned", cleaned.length);
  console.info("[validate_threads] invalid", invalid);
  console.info("[validate_threads] deduped", deduped);
  console.info("[validate_threads] conflicts", conflicts.length);
  console.info("[validate_threads] labComputed", computedLab);

  return { cleaned, conflicts, stats: { total: items.length, invalid, deduped, computedLab } };
}

if (import.meta.url === new URL(process.argv[1], "file:").href) {
  runValidation().catch((err) => {
    console.error("[validate_threads] failed", err);
    process.exit(1);
  });
}

```

## FILE: workers\thread_search.worker.js (size: 7321)
```js
let threads = [];
let labCache = new Map();
let threadsByBrand = new Map();

function isVerifiedThread(thread) {
  const conf = typeof thread?.confidence === "number" ? thread.confidence : 0;
  return conf >= 0.85 || thread?.source?.type === "CROWD_VERIFIED";
}

function buildIndexes(list) {
  const byBrand = new Map();
  list.forEach((thread) => {
    if (!thread || !thread.brand) return;
    if (!byBrand.has(thread.brand)) byBrand.set(thread.brand, []);
    byBrand.get(thread.brand).push(thread);
  });
  threadsByBrand = byBrand;
}

function addTopK(list, item, limit) {
  if (list.length < limit) {
    list.push(item);
    return;
  }
  let worstIndex = 0;
  let worst = list[0].delta;
  for (let i = 1; i < list.length; i += 1) {
    if (list[i].delta > worst) {
      worst = list[i].delta;
      worstIndex = i;
    }
  }
  if (item.delta < worst) list[worstIndex] = item;
}

function normalizeHex(hex) {
  if (!hex || typeof hex !== "string") return null;
  let v = hex.trim().toLowerCase().replace(/^##/, "#");
  if (!v.startsWith("#")) v = "#" + v;
  return /^#[0-9a-f]{6}$/.test(v) ? v : null;
}

function hexToRgbArray(hex) {
  const num = parseInt(hex.slice(1), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToLab([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  let y = (r * 0.2126 + g * 0.7152 + b * 0.0722);
  let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.cbrt(x) : (7.787 * x + 16 / 116);
  y = y > 0.008856 ? Math.cbrt(y) : (7.787 * y + 16 / 116);
  z = z > 0.008856 ? Math.cbrt(z) : (7.787 * z + 16 / 116);

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

function getLabForHex(hex) {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  const cached = labCache.get(normalized);
  if (cached) return cached;
  const lab = rgbToLab(hexToRgbArray(normalized));
  labCache.set(normalized, lab);
  return lab;
}

function deltaE76(lab1, lab2) {
  return Math.sqrt(
    (lab1[0] - lab2[0]) ** 2 +
    (lab1[1] - lab2[1]) ** 2 +
    (lab1[2] - lab2[2]) ** 2
  );
}

function deltaE2000(lab1, lab2) {
  const [l1, a1, b1] = lab1;
  const [l2, a2, b2] = lab2;
  const avgL = (l1 + l2) / 2;
  const c1 = Math.sqrt(a1 * a1 + b1 * b1);
  const c2 = Math.sqrt(a2 * a2 + b2 * b2);
  const avgC = (c1 + c2) / 2;
  const g = 0.5 * (1 - Math.sqrt(Math.pow(avgC, 7) / (Math.pow(avgC, 7) + Math.pow(25, 7))));
  const a1p = (1 + g) * a1;
  const a2p = (1 + g) * a2;
  const c1p = Math.sqrt(a1p * a1p + b1 * b1);
  const c2p = Math.sqrt(a2p * a2p + b2 * b2);
  const avgCp = (c1p + c2p) / 2;
  const h1p = Math.atan2(b1, a1p) >= 0 ? Math.atan2(b1, a1p) : Math.atan2(b1, a1p) + 2 * Math.PI;
  const h2p = Math.atan2(b2, a2p) >= 0 ? Math.atan2(b2, a2p) : Math.atan2(b2, a2p) + 2 * Math.PI;
  let deltahp = h2p - h1p;
  if (Math.abs(deltahp) > Math.PI) {
    deltahp -= Math.sign(deltahp) * 2 * Math.PI;
  }
  const deltaLp = l2 - l1;
  const deltaCp = c2p - c1p;
  const deltaHp = 2 * Math.sqrt(c1p * c2p) * Math.sin(deltahp / 2);
  const avgLp = (l1 + l2) / 2;
  let avghp = h1p + h2p;
  if (Math.abs(h1p - h2p) > Math.PI) {
    avghp += 2 * Math.PI;
  }
  avghp /= 2;
  const t = 1
    - 0.17 * Math.cos(avghp - Math.PI / 6)
    + 0.24 * Math.cos(2 * avghp)
    + 0.32 * Math.cos(3 * avghp + Math.PI / 30)
    - 0.20 * Math.cos(4 * avghp - 7 * Math.PI / 18);
  const deltaTheta = (30 * Math.PI / 180) * Math.exp(-(((avghp * 180 / Math.PI) - 275) / 25) ** 2);
  const rc = 2 * Math.sqrt(Math.pow(avgCp, 7) / (Math.pow(avgCp, 7) + Math.pow(25, 7)));
  const sl = 1 + (0.015 * ((avgLp - 50) ** 2)) / Math.sqrt(20 + ((avgLp - 50) ** 2));
  const sc = 1 + 0.045 * avgCp;
  const sh = 1 + 0.015 * avgCp * t;
  const rt = -Math.sin(2 * deltaTheta) * rc;
  return Math.sqrt(
    (deltaLp / sl) ** 2 +
    (deltaCp / sc) ** 2 +
    (deltaHp / sh) ** 2 +
    rt * (deltaCp / sc) * (deltaHp / sh)
  );
}

function getDelta(lab1, lab2, method) {
  return method === "2000" ? deltaE2000(lab1, lab2) : deltaE76(lab1, lab2);
}

self.onmessage = (event) => {
  const data = event.data || {};
  if (data.type === "init") {
    threads = Array.isArray(data.threads) ? data.threads : [];
    labCache = new Map();
    buildIndexes(threads);
    self.postMessage({ type: "ready" });
    return;
  }
  if (data.type !== "search") return;
  const { id, payload } = data;
  try {
    const start = Date.now();
    const targetHex = normalizeHex(payload.targetHex);
    const targetLab = payload.targetLab || (targetHex ? getLabForHex(targetHex) : null);
    if (!targetLab) {
      self.postMessage({ id, results: [], stats: { ms: 0 } });
      return;
    }
    const brands = Array.isArray(payload.brands) ? payload.brands : [];
    const requireVerified = !!payload.verifiedOnly;
    const method = payload.method === "2000" ? "2000" : "76";
    const limit = typeof payload.limit === "number" ? payload.limit : 100;
    const lists = brands.length ? brands.map(brand => threadsByBrand.get(brand) || []) : [threads];
    if (method === "2000") {
      const candidateCount = Math.max(limit * 20, 200);
      const candidates = [];
      for (const list of lists) {
        for (const t of list) {
          if (requireVerified && !isVerifiedThread(t)) continue;
          const lab = t.lab && Array.isArray(t.lab) && t.lab.length === 3 ? t.lab : getLabForHex(t.hex);
          if (!lab) continue;
          const deltaFast = deltaE76(targetLab, lab);
          addTopK(candidates, { thread: t, lab, delta: deltaFast }, candidateCount);
        }
      }
      const results = [];
      for (const candidate of candidates) {
        const delta = deltaE2000(targetLab, candidate.lab);
        addTopK(results, {
          hex: candidate.thread.hex,
          brand: candidate.thread.brand,
          code: candidate.thread.code,
          name: candidate.thread.name,
          source: candidate.thread.source,
          confidence: candidate.thread.confidence,
          lab: candidate.lab,
          delta
        }, limit);
      }
      results.sort((a, b) => a.delta - b.delta);
      const stats = { ms: Date.now() - start, total: candidates.length };
      self.postMessage({ id, results, stats });
      return;
    }

    const results = [];
    for (const list of lists) {
      for (const t of list) {
        if (requireVerified && !isVerifiedThread(t)) continue;
        const lab = t.lab && Array.isArray(t.lab) && t.lab.length === 3 ? t.lab : getLabForHex(t.hex);
        if (!lab) continue;
        const delta = deltaE76(targetLab, lab);
        addTopK(results, {
          hex: t.hex,
          brand: t.brand,
          code: t.code,
          name: t.name,
          source: t.source,
          confidence: t.confidence,
          lab,
          delta
        }, limit);
      }
    }
    results.sort((a, b) => a.delta - b.delta);
    const stats = { ms: Date.now() - start, total: results.length };
    self.postMessage({ id, results, stats });
  } catch (err) {
    self.postMessage({ id, error: err?.message || "worker-search-failed" });
  }
};

```

## FILE: worlds\threadcolor.html (size: 46770)
```html
<!DOCTYPE html>
<html lang="vi" data-world="origami">
<head>
  <meta charset="utf-8">
  <title>Tra mã chỉ thêu theo màu</title>
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --bg: #f6f1e9;
      --text: #201a14;
      --muted: #6b5d4b;
      --glass: rgba(255, 255, 255, 0.72);
      --stroke: rgba(32, 26, 20, 0.08);
      --a1: #c27b4b;
      --a2: #d59e6d;
      --a3: #8c6d54;
    }
    html[data-world="nebula"] {
      --bg: #0c1123;
      --text: #eef2ff;
      --muted: #b6bfe3;
      --glass: rgba(18, 26, 48, 0.72);
      --stroke: rgba(255, 255, 255, 0.12);
      --a1: #6ee7ff;
      --a2: #8b5cf6;
      --a3: #f472b6;
    }
    html[data-world="ocean"] {
      --bg: #e7f6ff;
      --text: #0b2b3a;
      --muted: #4b6b7b;
      --glass: rgba(255, 255, 255, 0.7);
      --stroke: rgba(11, 43, 58, 0.12);
      --a1: #1fb6ff;
      --a2: #0ea5a8;
      --a3: #4dd4ff;
    }
    html[data-world="ink"] {
      --bg: #0f1115;
      --text: #f4f4f6;
      --muted: #9aa0a9;
      --glass: rgba(24, 26, 31, 0.72);
      --stroke: rgba(255, 255, 255, 0.1);
      --a1: #e2e8f0;
      --a2: #94a3b8;
      --a3: #64748b;
    }
    html[data-world="origami"] {
      --bg: #f6f1e9;
      --text: #201a14;
      --muted: #6b5d4b;
      --glass: rgba(255, 255, 255, 0.72);
      --stroke: rgba(32, 26, 20, 0.08);
      --a1: #c27b4b;
      --a2: #d59e6d;
      --a3: #8c6d54;
    }
    html[data-world="arcade"] {
      --bg: #0b0b14;
      --text: #fef7ff;
      --muted: #c9b9e8;
      --glass: rgba(20, 18, 36, 0.78);
      --stroke: rgba(255, 255, 255, 0.14);
      --a1: #ff3dcd;
      --a2: #7c3aed;
      --a3: #20e3b2;
    }
    html[data-world="dunes"] {
      --bg: #f7f0e1;
      --text: #3a2d1a;
      --muted: #7a644a;
      --glass: rgba(255, 255, 255, 0.7);
      --stroke: rgba(58, 45, 26, 0.12);
      --a1: #d39b54;
      --a2: #e3b87b;
      --a3: #b3743d;
    }
    html[data-world="chrome"] {
      --bg: #f1f4f8;
      --text: #1c232b;
      --muted: #5f6b79;
      --glass: rgba(255, 255, 255, 0.68);
      --stroke: rgba(28, 35, 43, 0.12);
      --a1: #3b82f6;
      --a2: #94a3b8;
      --a3: #0f172a;
    }
    html[data-world="circuit"] {
      --bg: #0b1410;
      --text: #e9fff3;
      --muted: #9ec4ad;
      --glass: rgba(12, 24, 18, 0.72);
      --stroke: rgba(255, 255, 255, 0.12);
      --a1: #22c55e;
      --a2: #16a34a;
      --a3: #86efac;
    }
    body {
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .animate-fade-in-up {
      animation: fade-in-up 0.25s ease forwards;
    }
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .tc-topbar {
      background: var(--glass);
      border-bottom: 1px solid var(--stroke);
      backdrop-filter: blur(14px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
      transition: box-shadow .2s ease, backdrop-filter .2s ease, background-color .2s ease;
      will-change: box-shadow, backdrop-filter;
      z-index: var(--z-topbar, 2000) !important;
      overflow: visible;
    }
    .tc-brand {
      font-weight: 700;
      letter-spacing: 0.04em;
      color: var(--text);
    }
    .tc-topbar .tc-brand {
      letter-spacing: -0.01em;
      text-shadow: 0 1px 0 rgba(255,255,255,.15);
    }
    .tc-nav a {
      color: var(--muted);
    }
    .tc-nav a:hover {
      color: var(--text);
    }
    .tc-card {
      background: var(--glass);
      border: 1px solid var(--stroke);
      backdrop-filter: blur(16px);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
    }
    #worldMenu[data-open="0"] {
      display: none;
    }
    #worldMenu[data-open="1"] {
      display: block;
    }
    .tc-menu[data-open="0"] {
      display: none;
    }
    .tc-menu[data-open="1"] {
      display: block;
    }
    .tc-menu {
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
    }
    .tc-menu-item {
      color: var(--text);
      transition: background-color .15s ease, transform .05s ease;
    }
    .tc-menu-item:hover {
      background: rgba(255,255,255,.10);
    }
    .tc-menu-item:active {
      transform: translateY(1px);
    }
    .tc-menu-item:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
      background: rgba(255,255,255,.08);
    }
    .tc-world-item.is-active {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
      color: var(--text);
    }
    #worldMenu .tc-world-item {
      position: relative;
      color: var(--text);
      padding-top: 0.6rem;
      padding-bottom: 0.6rem;
      transition: background-color .15s ease, transform .05s ease;
    }
    #worldMenu {
      border: 1px solid var(--stroke);
    }
    #worldMenu .tc-world-item.is-active::before {
      content: "";
      position: absolute;
      left: 8px;
      top: 8px;
      bottom: 8px;
      width: 3px;
      border-radius: 999px;
      background: linear-gradient(180deg, var(--a1), var(--a2), var(--a3));
      opacity: .95;
    }
    #worldMenu .tc-world-item.is-active::after {
      content: "\2713";
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-weight: 800;
      font-size: 12px;
      color: var(--text);
      opacity: .85;
    }
    #worldMenu .tc-world-item.is-active {
      padding-left: 1.1rem;
      padding-right: 1.6rem;
    }
    #worldMenu .tc-world-item:hover {
      background: rgba(255,255,255,.10);
    }
    #worldMenu .tc-world-item:active {
      transform: translateY(1px);
    }
    #worldMenu .tc-world-item:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
      background: rgba(255,255,255,.08);
    }
    #worldMenu .tc-world-item + .tc-world-item {
      border-top: 1px solid var(--stroke);
    }
    #accountMenu {
      border: 1px solid var(--stroke);
    }
    #accountMenu .tc-account-header {
      border-bottom: 1px solid var(--stroke);
    }
    #accountMenu .tc-account-email {
      color: var(--muted);
    }
    #accountMenu .tc-account-actions {
      display: flex;
      flex-direction: column;
      gap: .25rem;
    }
    #accountMenu button {
      color: var(--text);
      padding: 0.6rem 0.75rem;
      line-height: 1.1;
      transition: background-color .15s ease, transform .05s ease;
    }
    #accountMenu button:hover {
      background: rgba(255,255,255,.10);
    }
    #accountMenu button:active {
      transform: translateY(1px);
    }
    #accountMenu button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
      background: rgba(255,255,255,.08);
    }
    #accountMenu button + button {
      border-top: 1px solid var(--stroke);
      opacity: 1;
    }
    #pinPanel .pin-item{
      background: var(--glass);
      border: 1px solid var(--stroke);
      border-radius: 0.9rem;
      padding: 0.6rem;
    }
    #pinPanel .pin-swatch{
      width: 32px;
      height: 32px;
      border-radius: 0.6rem;
      border: 1px solid var(--stroke);
    }
    #pinPanel .pin-actions button{
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      border-radius: 0.75rem;
      padding: 0.25rem 0.5rem;
      font-size: 12px;
    }
    #pinPanel .pin-actions button:hover{ filter: brightness(1.03); }
    #pinPanel .pin-actions button:active{ transform: translateY(1px); }
    #pinPanel .pin-actions button:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    /* --- Topbar UI tokens (8portal-ready) --- */
    .tc-topbar { position: sticky; top: 0; }
    .tc-topbar::after{
      content:"";
      position:absolute; left:0; right:0; bottom:-1px; height:1px;
      background: linear-gradient(90deg, var(--a1), var(--a2), var(--a3));
      opacity: .35;
    }
    .tc-topbar.is-scrolled {
      box-shadow: 0 18px 50px rgba(0,0,0,.18);
    }
    .tc-topbar.is-scrolled::after{
      opacity: .55;
    }
    @media (prefers-reduced-motion: reduce) {
      .tc-topbar {
        transition: none;
      }
    }
    .tc-chip{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
    }
    .tc-chip:hover{ filter: brightness(1.03); }
    .tc-btn{
      border-radius: 0.75rem;
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      font-weight: 650;
      letter-spacing: -0.005em;
      line-height: 1;
    }
    .tc-btn:hover{ filter: brightness(1.03); }
    .tc-btn:active{ transform: translateY(1px); }
    .tc-btn:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    .tc-btn-primary{
      background: linear-gradient(135deg, var(--a1), var(--a2));
      color: #fff;
      border: 1px solid rgba(255,255,255,.18);
    }
    .tc-btn-primary:hover{ filter: brightness(1.06); }
    .tc-dot{
      width: 10px; height: 10px; border-radius: 999px;
      background: linear-gradient(135deg, var(--a1), var(--a2), var(--a3));
      box-shadow: 0 0 0 2px rgba(255,255,255,.5);
    }
    .tc-muted { color: var(--muted); }
    .tc-gradient-text{
      background: linear-gradient(135deg, var(--a1), var(--a2), var(--a3));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .tc-field{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: 0.9rem;
      padding: 0.6rem 0.75rem;
      outline: none;
    }
    .tc-field:focus-visible{
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    .tc-color{
      background: var(--glass);
      border: 1px solid var(--stroke);
      border-radius: 0.9rem;
      padding: 0.15rem;
      width: 4rem;
      height: 2.5rem;
    }
    .tc-check{
      accent-color: var(--a1);
    }
    .tc-range{
      accent-color: var(--a1);
    }
    main h3 { color: var(--text); }
    main .tc-helper { color: var(--muted); }
    #result {
      border: 1px solid var(--stroke);
    }
    #brandFilters label{
      display: inline-flex;
      align-items: center;
      gap: .5rem;
      cursor: pointer;
      user-select: none;
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: 999px;
      padding: 0.45rem 0.7rem;
    }
    #brandFilters label:hover{ filter: brightness(1.03); }
    #brandFilters input[type="checkbox"] { accent-color: var(--a1); }
    /* --- Result UI (tokenized, premium) --- */
    #result .result-item{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      box-shadow: 0 12px 30px rgba(0,0,0,.08);
      transition: transform .12s ease, box-shadow .18s ease, border-color .18s ease, filter .18s ease;
    }
    #result .result-item:hover{
      transform: translateY(-1px) !important;
      box-shadow: 0 18px 50px rgba(0,0,0,.16);
      filter: brightness(1.02);
    }
    #result .result-item:active{
      transform: translateY(1px) !important;
    }
    #result .result-item[data-selected="true"]{
      border-color: var(--a1);
      box-shadow: 0 18px 55px rgba(0,0,0,.20);
    }
    #result .result-item:focus-visible{
      outline: none;
      box-shadow:
        0 0 0 3px rgba(0,0,0,.12),
        0 0 0 6px var(--a1),
        0 18px 55px rgba(0,0,0,.18);
    }
    #result .text-gray-700{ color: var(--text); }
    #result .text-gray-600,
    #result .text-gray-500,
    #result .text-gray-400{ color: var(--muted); }
    #result .result-item .border{
      border-color: var(--stroke);
    }
    /* Save button inside result cards */
    #result .btn-save{
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      border-radius: 0.75rem;
      font-weight: 650;
      letter-spacing: -0.005em;
      transition: filter .15s ease, transform .05s ease, box-shadow .15s ease;
    }
    #result .btn-save:hover{ filter: brightness(1.03); }
    #result .btn-save:active{ transform: translateY(1px); }
    #result .btn-save:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    #result .btn-save:disabled{
      opacity: .6;
      cursor: not-allowed;
      filter: none;
      transform: none;
    }
    /* Reduce motion */
    @media (prefers-reduced-motion: reduce){
      #result .result-item,
      #result .btn-save { transition: none; }
    }
    /* --- Auth modal (tokenized) --- */
    #authOverlay{
      background: rgba(0,0,0,.45);
      -webkit-backdrop-filter: blur(2px);
      backdrop-filter: blur(2px);
    }
    #authModal{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: 1.25rem;
      box-shadow: 0 22px 70px rgba(0,0,0,.28);
    }
    #authClose{
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      border-radius: .75rem;
    }
    #authClose:hover{ filter: brightness(1.03); }
    #authClose:active{ transform: translateY(1px); }
    #authClose:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    #authModal input{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: .9rem;
    }
    #authModal input::placeholder{ color: var(--muted); opacity: .85; }
    #authModal input:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    #tabLogin, #tabRegister{
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      border-radius: .9rem;
    }
    #tabLogin:hover, #tabRegister:hover{ filter: brightness(1.03); }
    #tabLogin.bg-indigo-50, #tabRegister.bg-indigo-50{
      background: linear-gradient(135deg, var(--a1), var(--a2));
      border-color: rgba(255,255,255,.18);
    }
    #tabLogin.text-indigo-700, #tabRegister.text-indigo-700{
      color: #fff !important;
    }
    #btnLogin, #btnRegister{
      background: linear-gradient(135deg, var(--a1), var(--a2));
      color: #fff;
      border: 1px solid rgba(255,255,255,.18);
      border-radius: .9rem;
    }
    #btnLogin:hover, #btnRegister:hover{ filter: brightness(1.06); }
    #btnLogin:active, #btnRegister:active{ transform: translateY(1px); }
    #btnLogin:focus-visible, #btnRegister:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    #btnGoogle, #btnFacebook{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: .9rem;
    }
    #btnGoogle:hover, #btnFacebook:hover{ filter: brightness(1.03); }
    #btnGoogle:active, #btnFacebook:active{ transform: translateY(1px); }
    #btnGoogle:focus-visible, #btnFacebook:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    #btnForgot{
      color: var(--muted);
    }
    #btnForgot:hover{ filter: brightness(1.08); }
    #authError{
      color: #ef4444;
      background: rgba(239,68,68,.10);
      border: 1px solid rgba(239,68,68,.22);
      border-radius: .9rem;
    }
    @media (prefers-reduced-motion: reduce){
      #authModal *{ transition: none !important; }
    }
    /* --- Library modal (tokenized) --- */
    #libraryOverlay{
      background: rgba(0,0,0,.45);
      -webkit-backdrop-filter: blur(2px);
      backdrop-filter: blur(2px);
    }
    #libraryModal > div{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: 1.25rem;
      box-shadow: 0 22px 70px rgba(0,0,0,.28);
    }
    #libraryClose{
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      border-radius: .75rem;
    }
    #libraryClose:hover{ filter: brightness(1.03); }
    #libraryClose:active{ transform: translateY(1px); }
    #libraryClose:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    #libraryList > div{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
      border-radius: 0.9rem;
      box-shadow: 0 12px 30px rgba(0,0,0,.08);
      transition: transform .12s ease, box-shadow .18s ease, border-color .18s ease, filter .18s ease;
    }
    #libraryList > div:hover{
      transform: translateY(-1px);
      box-shadow: 0 18px 50px rgba(0,0,0,.16);
      filter: brightness(1.02);
    }
    #libraryList .text-gray-500{ color: var(--muted); }
    #libraryList .text-gray-800{ color: var(--text); }
    #libraryList .text-gray-500.text-xs{ color: var(--muted); }
    #libraryList button{
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
      border-radius: 0.75rem;
      font-weight: 650;
      letter-spacing: -0.005em;
      transition: filter .15s ease, transform .05s ease, box-shadow .15s ease;
    }
    #libraryList button:hover{ filter: brightness(1.03); }
    #libraryList button:active{ transform: translateY(1px); }
    #libraryList button:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
    }
    #libraryList .text-red-600{
      color: #ef4444;
      background: rgba(239,68,68,.10);
      border: 1px solid rgba(239,68,68,.22);
      border-radius: .9rem;
      padding: .75rem;
    }
    @media (prefers-reduced-motion: reduce){
      #libraryModal *{ transition: none !important; }
    }
    #accountMenu button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
      background: rgba(255,255,255,.08);
    }
    .w1-actionbar {
      position: sticky;
      top: var(--tc-topbar-h, 64px);
      overflow: visible;
      z-index: var(--z-actionbar, 1500) !important;
    }
    .w1-actionbar > div {
      overflow: visible;
    }
    .w1-actionbar .tc-menu {
      position: absolute;
      z-index: var(--z-actionbar-menu, 3000) !important;
      top: calc(100% + 8px);
    }
    #portalMenu,
    #worldMenu {
      z-index: var(--z-topbar-menu, 4000) !important;
    }
  </style>
</head>
<body class="font-sans">
  <header class="tc-topbar sticky top-0 z-30 relative">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
      <a href="../index.html" class="flex items-center gap-3 min-w-0">
        <img src="../assets/spacecolors-logo-topbar.png" alt="SpaceColors" class="h-10 w-10 rounded-xl select-none" loading="eager" decoding="async">
        <span class="min-w-0 flex flex-col justify-center leading-tight">
          <span class="tc-brand text-base md:text-lg whitespace-nowrap" data-i18n="topbar.brand">SpaceColors &#183; 8Portal</span>
          <span class="tc-muted text-[11px] md:text-xs truncate max-w-[240px] md:max-w-[360px] hidden sm:block" data-i18n="topbar.slogan">M&#7897;t ch&#7841;m m&#7903; kh&#244;ng gian m&#224;u v&#244; h&#7841;n</span>
        </span>
      </a>
      <div class="flex-1 flex items-center justify-center">
        <div class="relative" id="portalSwitcher">
          <button id="portalBtn"
            class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[210px] justify-between"
            aria-expanded="false" aria-haspopup="menu" aria-controls="portalMenu">
            Ch&#7885;n Th&#7871; gi&#7899;i
          </button>
          <div id="portalMenu" data-open="0" role="menu" class="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./threadcolor.html" role="menuitem">Th&#7871; gi&#7899;i m&#224;u th&#234;u</a>
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./palette.html" role="menuitem">Th&#7871; gi&#7899;i d&#7843;i m&#224;u</a>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end gap-3 min-w-[210px]">
        <div class="relative" id="worldSwitcher">
          <button id="worldBtn"
            class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[150px] justify-between"
            aria-expanded="false" aria-haspopup="menu" aria-controls="worldMenu">
            <span class="flex items-center gap-2">
              <span class="tc-dot" aria-hidden="true"></span>
              <span id="worldLabel">Origami</span>
            </span>
            <span aria-hidden="true">&#9662;</span>
          </button>
          <div id="worldMenu" data-open="0" class="absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md hover:bg-white/10" data-world="nebula">Tinh v&#226;n</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md hover:bg-white/10" data-world="ocean">&#272;&#7841;i d&#432;&#417;ng</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md hover:bg-white/10" data-world="ink">M&#7921;c t&#224;u</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md hover:bg-white/10" data-world="origami">Origami</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md hover:bg-white/10" data-world="arcade">Arcade</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md hover:bg-white/10" data-world="dunes">&#272;&#7891;i c&#225;t</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md hover:bg-white/10" data-world="chrome">Chrome</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md hover:bg-white/10" data-world="circuit">M&#7841;ch &#273;i&#7879;n</button>
          </div>
        </div>
        <div id="topbarAuthSlot" data-auth-slot="topbar" class="flex items-center justify-end min-w-[210px]"></div>
      </div>
    </div>
  </header>
  <div class="w1-actionbar border-b border-black/5">
    <div class="max-w-6xl mx-auto px-4 py-2 flex items-center justify-end gap-3">
      <div class="relative">
        <button id="w1CommunityBtn" class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold" aria-expanded="false" aria-haspopup="menu" aria-controls="w1CommunityMenu" data-i18n="topbar.nav.community">C&#7897;ng &#273;&#7891;ng</button>
        <div id="w1CommunityMenu" data-open="0" role="menu" class="tc-menu absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm">
          <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md" data-action="contribute" data-i18n="topbar.communityContribute" role="menuitem">&#272;&#243;ng g&#243;p d&#7919; li&#7879;u</button>
          <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md" data-action="verify" data-i18n="topbar.communityVerify" role="menuitem">X&#225;c minh</button>
        </div>
      </div>
      <div class="relative">
        <button id="w1SpacesBtn" class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold" aria-expanded="false" aria-haspopup="menu" aria-controls="w1SpacesMenu" data-i18n="topbar.nav.spaces">Kh&#244;ng gian</button>
        <div id="w1SpacesMenu" data-open="0" role="menu" class="tc-menu absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm">
          <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./threadvault.html?tab=saved" data-i18n="topbar.spaceVault" role="menuitem">Kho ch&#7881;</a>
        </div>
      </div>
    </div>
  </div>

  <main class="mx-auto max-w-4xl px-4 pt-6 pb-10">
    <div class="tc-card rounded-2xl p-6 md:p-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold tc-gradient-text text-center md:text-left" data-i18n="tc.title">Tra mã chỉ thêu theo màu</h1>
      </div>

      <section class="mb-6">
        <h3 class="text-lg font-semibold mb-2" data-i18n="tc.section.brand.title">Chọn hãng chỉ</h3>
        <div id="brandFilters" class="flex flex-wrap gap-3"></div>
        <label class="mt-3 inline-flex items-center gap-2 text-sm tc-muted">
          <input id="verifiedOnlyToggle" type="checkbox" class="tc-check">
          <span data-i18n="tc.section.brand.verified">Chỉ đã xác minh</span>
        </label>
      </section>
      <section class="mb-6">
        <h3 class="text-lg font-semibold mb-2">
          <span data-i18n="tc.section.delta.title">Độ tương đồng màu (ΔE)</span>
          <span id="deltaValue" class="text-sm tc-muted">(ΔE 3.0)</span>
        </h3>

        <input
          type="range"
          id="deltaSlider"
          min="0.5"
          max="30"
          step="0.5"
          value="3"
          class="tc-range w-full"
        />
        <div class="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <label for="deltaMethod" class="tc-muted" data-i18n="tc.section.delta.method">Phương pháp ΔE</label>
          <select id="deltaMethod" class="tc-field text-sm py-2">
            <option value="76" data-i18n="tc.section.delta.method76">Cơ bản (ΔE76)</option>
            <option value="2000" data-i18n="tc.section.delta.method2000">Chuẩn hơn (CIEDE2000)</option>
          </select>
        </div>
        <span id="deltaValueText" class="tc-muted">ΔE 3.0</span>
        <div class="flex justify-between text-xs tc-muted mt-1">
          <span data-i18n="tc.section.delta.low">Rất giống</span>
          <span data-i18n="tc.section.delta.high">Khác hẳn</span>
        </div>
      </section>

      <section class="mb-6">
        <h3 class="text-lg font-semibold mb-2" data-i18n="tc.section.pick.title">Chọn màu trực tiếp</h3>
        <div class="flex items-center gap-4">
          <input type="color" id="colorPicker" class="tc-color">
          <button id="btnFindNearest" class="tc-btn tc-btn-primary px-4 py-2 rounded-lg shadow-md" data-i18n="tc.section.pick.nearest">
            Tìm mã chỉ gần nhất
          </button>
          <button id="btnPickScreen" class="tc-chip tc-btn flex items-center gap-2 px-4 py-2 rounded-lg shadow-md">
            <span>o</span>
            <span data-i18n="tc.section.pick.pick">Chọn màu</span>
          </button>
        </div>
        <div class="mt-2 text-xs tc-muted hidden" id="eyedropperHint" data-i18n="tc.section.pick.hint">Bấm vào bất kỳ đâu để chọn màu (Esc để hủy)</div>
        <div class="mt-2 text-sm text-amber-700 hidden" id="eyedropperFallback">
          <span data-i18n="tc.section.pick.fallback">Trình duyệt chưa hỗ trợ chọn màu toàn màn hình. Dùng input màu bên dưới.</span>
        </div>
        <input type="color" id="fallbackColorPicker" class="mt-2 hidden tc-field p-1 w-16 h-10">
      </section>

      <section class="mb-6">
        <h3 class="text-lg font-semibold mb-2" data-i18n="tc.section.image.title">Chọn màu từ ảnh</h3>
        <input type="file" id="imgInput" accept="image/*" class="mb-2">
        <canvas
          id="canvas"
          class="border rounded-lg max-w-full min-h-[200px] bg-gray-100">
        </canvas>
        <p class="text-sm tc-muted mb-1" data-i18n="tc.section.image.helper">Chọn ảnh và bấm vào bất kỳ điểm nào để lấy màu</p>
      </section>

      <section class="mb-6">
        <h3 class="text-lg font-semibold mb-2" data-i18n="tc.section.code.title">Tra ngược theo mã chỉ</h3>
        <div class="flex items-center gap-4">
          <input type="text" id="codeInput" placeholder="Nhập mã (VD: DMC 310)" class="tc-field flex-1" data-i18n-attr="placeholder:tc.section.code.placeholder">
          <button id="btnFindByCode" class="tc-btn tc-btn-primary px-4 py-2 rounded-lg shadow-md" data-i18n="tc.section.code.action">
            Tra cứu
          </button>
        </div>
      </section>

      <section id="result" class="p-4 tc-chip rounded-lg shadow-inner"></section>
    </div>
  </main>

  <div id="inspectorOverlay" class="fixed inset-0 bg-black opacity-0 pointer-events-none transition-opacity duration-200 z-40"></div>

  <div id="colorInspector" class="fixed z-50 inset-x-0 bottom-0 translate-y-full md:inset-y-0 md:right-0 md:w-[380px] md:translate-x-full transition-transform duration-300">
    <div class="bg-white shadow-2xl rounded-t-2xl md:rounded-none border border-gray-200 h-[75vh] md:h-full flex flex-col">
      <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h2 id="inspectorTitle" class="text-lg font-semibold text-gray-800">Bảng thông tin màu</h2>
        <button id="inspectorClose" class="p-2 rounded-full hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400" aria-label="Đóng">
          &times;
        </button>
      </div>
      <div class="p-4 space-y-4 overflow-y-auto">
        <div class="flex gap-3 items-center">
          <div id="previewMain" class="w-16 h-16 rounded-xl border shadow-inner"></div>
          <div class="flex-1 grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div class="p-2 rounded-lg border bg-gray-50">
              <div class="text-[11px] uppercase tracking-wide text-gray-500">Nền sáng</div>
              <div id="previewLight" class="mt-2 w-full h-10 rounded-md border bg-white"></div>
            </div>
            <div class="p-2 rounded-lg border bg-gray-900 text-white">
              <div class="text-[11px] uppercase tracking-wide">Nền tối</div>
              <div id="previewDark" class="mt-2 w-full h-10 rounded-md border border-gray-700 bg-gray-800"></div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="space-y-1">
            <div class="text-xs text-gray-500">Hãng</div>
            <div id="inspectorBrand" class="font-medium text-gray-800">--</div>
          </div>
          <div class="space-y-1">
            <div class="text-xs text-gray-500">Mã chỉ</div>
            <div id="inspectorCode" class="font-medium text-gray-800">--</div>
          </div>
          <div class="space-y-1 col-span-2">
            <div class="text-xs text-gray-500">Tên màu</div>
            <div id="inspectorName" class="font-medium text-gray-800">--</div>
          </div>
          <div class="space-y-1 col-span-2">
            <div class="text-xs text-gray-500">Độ lệch (ΔE)</div>
            <div id="inspectorDelta" class="font-medium text-gray-800">--</div>
          </div>
        </div>

        <div class="rounded-xl border border-gray-200 bg-gray-50 p-3 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-gray-800">Giá trị màu</span>
            <button id="copyAll" class="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Sao chép tất cả</button>
          </div>
          <div class="grid grid-cols-1 gap-2 text-sm text-gray-800">
            <div class="flex items-center justify-between gap-2">
              <div><span class="text-xs uppercase text-gray-500">HEX</span> <span id="inspectorHex" class="font-semibold">--</span></div>
              <button data-copy="Hex" class="text-xs px-2 py-1 rounded-full bg-white border hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Sao chép</button>
            </div>
            <div class="flex items-center justify-between gap-2">
              <div><span class="text-xs uppercase text-gray-500">RGB</span> <span id="inspectorRgb" class="font-semibold">--</span></div>
              <button data-copy="Rgb" class="text-xs px-2 py-1 rounded-full bg-white border hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Sao chép</button>
            </div>
            <div class="flex items-center justify-between gap-2">
              <div><span class="text-xs uppercase text-gray-500">Chuỗi RGB</span> <span id="inspectorRgbString" class="font-semibold">--</span></div>
              <button data-copy="RgbString" class="text-xs px-2 py-1 rounded-full bg-white border hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Sao chép</button>
            </div>
            <div class="flex items-center justify-between gap-2">
              <div><span class="text-xs uppercase text-gray-500">LAB</span> <span id="inspectorLab" class="font-semibold">--</span></div>
              <button data-copy="Lab" class="text-xs px-2 py-1 rounded-full bg-white border hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Sao chép</button>
            </div>
            <div class="flex items-center justify-between gap-2">
              <div><span class="text-xs uppercase text-gray-500">HSL</span> <span id="inspectorHsl" class="font-semibold">--</span></div>
              <button data-copy="Hsl" class="text-xs px-2 py-1 rounded-full bg-white border hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">Sao chép</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="toastContainer" class="fixed bottom-4 right-4 space-y-2 z-50"></div>
  <div id="pinPanel" class="fixed bottom-4 left-4 right-4 md:right-auto md:w-[360px] z-40 hidden">
    <div class="tc-card p-4 space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-semibold" data-i18n="tc.pin.panelTitle">So sánh đã ghim</h3>
        <button id="pinClear" class="tc-btn tc-chip px-3 py-1 text-xs" data-i18n="tc.pin.clear">Xoá tất cả ghim</button>
      </div>
      <div id="pinList" class="space-y-2 text-sm"></div>
    </div>
  </div>

  <div id="libraryOverlay" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden"></div>
  <div id="libraryModal" class="fixed inset-0 z-50 hidden items-center justify-center px-4">
    <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800" data-i18n="tc.library.title">Kết quả đã lưu</h3>
        <button id="libraryClose" class="p-2 rounded-full hover:bg-gray-100 text-gray-500">&times;</button>
      </div>
      <div class="p-4">
        <div id="libraryList" class="space-y-3 text-sm text-gray-800">
          <div class="text-gray-500">Đang tải...</div>
        </div>
      </div>
    </div>
  </div>

  <div id="contributeOverlay" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden"></div>
  <div id="contributeModal" class="fixed inset-0 z-50 hidden items-center justify-center px-4">
    <div class="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800">Đóng góp dữ liệu</h3>
        <button id="contributeClose" class="p-2 rounded-full hover:bg-gray-100 text-gray-500">&times;</button>
      </div>
      <div class="p-5 space-y-4 text-sm text-gray-800">
        <div class="space-y-1">
          <label class="font-medium">Hãng</label>
          <select id="contributeBrandSelect" class="w-full border rounded-lg px-3 py-2">
            <option value="">Chọn hãng</option>
          </select>
          <input id="contributeBrandCustom" type="text" placeholder="Hoặc nhập hãng mới" class="w-full border rounded-lg px-3 py-2 mt-2">
        </div>
        <div class="space-y-1">
          <label class="font-medium">Mã chỉ</label>
          <input id="contributeCode" type="text" class="w-full border rounded-lg px-3 py-2" placeholder="Mã chỉ">
        </div>
        <div class="space-y-1">
          <label class="font-medium">Tên màu (tuỳ chọn)</label>
          <input id="contributeName" type="text" class="w-full border rounded-lg px-3 py-2" placeholder="Tên màu">
        </div>
        <div class="space-y-2">
          <label class="font-medium">Hex</label>
          <div class="flex gap-2">
            <input id="contributeHex" type="text" class="flex-1 border rounded-lg px-3 py-2" placeholder="#RRGGBB">
            <button id="btnUseCurrentColor" class="px-3 py-2 rounded-lg border bg-gray-50 hover:bg-gray-100 text-gray-700">Dùng màu hiện tại</button>
          </div>
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button id="contributeCancel" class="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 text-gray-700">Huỷ</button>
          <button id="contributeSubmit" class="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Gửi</button>
        </div>
      </div>
    </div>
  </div>

  <div id="verifyOverlay" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden"></div>
  <div id="verifyModal" class="fixed inset-0 z-50 hidden items-center justify-center px-4">
    <div class="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800">Xác minh dữ liệu</h3>
        <button id="verifyClose" class="p-2 rounded-full hover:bg-gray-100 text-gray-500">&times;</button>
      </div>
      <div class="p-5 space-y-3 text-sm text-gray-800">
        <div id="verifyList" class="space-y-3">
          <div class="text-gray-500">Đang tải...</div>
        </div>
      </div>
    </div>
  </div>


  <script>
    (function () {
      var worlds = ["nebula", "ocean", "ink", "origami", "arcade", "dunes", "chrome", "circuit"];
      var labels = {
        nebula: "Tinh vân",
        ocean: "Đại dương",
        ink: "Mực tàu",
        origami: "Origami",
        arcade: "Arcade",
        dunes: "Đồi cát",
        chrome: "Chrome",
        circuit: "Mạch điện"
      };
      var storageKey = "tc_world";
      var defaultWorld = "origami";
      var worldBtn = document.getElementById("worldBtn");
      var worldMenu = document.getElementById("worldMenu");
      var worldLabel = document.getElementById("worldLabel");
      var switcher = document.getElementById("worldSwitcher");

      function applyWorld(next) {
        var world = worlds.indexOf(next) !== -1 ? next : defaultWorld;
        document.documentElement.setAttribute("data-world", world);
        localStorage.setItem(storageKey, world);
        if (worldLabel) {
          worldLabel.textContent = labels[world] || world;
        }
        if (worldMenu) {
          worldMenu.querySelectorAll("[data-world]").forEach(function (btn) {
            btn.classList.toggle("is-active", btn.getAttribute("data-world") === world);
          });
        }
      }

      function setMenuOpen(open) {
        if (!worldMenu) return;
        worldMenu.dataset.open = open ? "1" : "0";
        if (worldBtn) {
          worldBtn.setAttribute("aria-expanded", open ? "true" : "false");
        }
      }

      if (worldBtn && worldMenu) {
        worldBtn.addEventListener("click", function (event) {
          event.stopPropagation();
          setMenuOpen(worldMenu.dataset.open !== "1");
        });

        worldMenu.querySelectorAll("[data-world]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            applyWorld(btn.getAttribute("data-world"));
            setMenuOpen(false);
          });
        });
      }

      document.addEventListener("click", function (event) {
        if (!switcher) return;
        if (!switcher.contains(event.target)) {
          setMenuOpen(false);
        }
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          setMenuOpen(false);
        }
      });

      window.addEventListener("storage", function (event) {
        if (event.key === storageKey && event.newValue) {
          applyWorld(event.newValue);
        }
      });

      var initial = localStorage.getItem(storageKey) || defaultWorld;
      applyWorld(initial);
      setMenuOpen(false);
    })();
  </script>
  <script>
    (() => {
      if (window.__portalSwitcherBound) return;
      window.__portalSwitcherBound = true;
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
    })();
  </script>
  <script>
    (() => {
      const menus = [
        { btn: document.getElementById("w1CommunityBtn"), menu: document.getElementById("w1CommunityMenu") },
        { btn: document.getElementById("w1SpacesBtn"), menu: document.getElementById("w1SpacesMenu") }
      ];
      const setMenuOpen = (btn, menu, open) => {
        if (!btn || !menu) return;
        menu.dataset.open = open ? "1" : "0";
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      const closeAll = () => {
        menus.forEach(({ btn, menu }) => setMenuOpen(btn, menu, false));
      };
      menus.forEach(({ btn, menu }) => {
        if (!btn || !menu) return;
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
            document.dispatchEvent(new CustomEvent("tc-auth-action", { detail: { action } }));
          }
          closeAll();
        });
      });
      document.addEventListener("click", (event) => {
        if (menus.some(({ btn, menu }) => btn?.contains(event.target) || menu?.contains(event.target))) return;
        closeAll();
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeAll();
      });
    })();
  </script>
  <script src="../i18n.js"></script>
  <script type="module" src="../auth.js"></script>
  <script type="module" src="../script.js"></script>
  <script>
    (() => {
      const bar = document.querySelector('.tc-topbar');
      if (!bar) return;
      let ticking = false;
      const update = () => {
        bar.classList.toggle('is-scrolled', window.scrollY > 8);
        ticking = false;
      };
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      update();
    })();
  </script>
</body>
</html>

```

## FILE: worlds\threadvault.html (size: 27821)
```html
<!DOCTYPE html>
<html lang="vi" data-world="origami">
<head>
  <meta charset="utf-8">
  <title>Kho chỉ</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --bg: #f6f1e9;
      --text: #201a14;
      --muted: #6b5d4b;
      --glass: rgba(255, 255, 255, 0.72);
      --stroke: rgba(32, 26, 20, 0.08);
      --a1: #c27b4b;
      --a2: #d59e6d;
      --a3: #8c6d54;
    }
    html[data-world="nebula"] {
      --bg: #0c1123;
      --text: #eef2ff;
      --muted: #b6bfe3;
      --glass: rgba(18, 26, 48, 0.72);
      --stroke: rgba(255, 255, 255, 0.12);
      --a1: #6ee7ff;
      --a2: #8b5cf6;
      --a3: #f472b6;
    }
    html[data-world="ocean"] {
      --bg: #e7f6ff;
      --text: #0b2b3a;
      --muted: #4b6b7b;
      --glass: rgba(255, 255, 255, 0.7);
      --stroke: rgba(11, 43, 58, 0.12);
      --a1: #1fb6ff;
      --a2: #0ea5a8;
      --a3: #4dd4ff;
    }
    html[data-world="ink"] {
      --bg: #0f1115;
      --text: #f4f4f6;
      --muted: #9aa0a9;
      --glass: rgba(24, 26, 31, 0.72);
      --stroke: rgba(255, 255, 255, 0.1);
      --a1: #e2e8f0;
      --a2: #94a3b8;
      --a3: #64748b;
    }
    html[data-world="origami"] {
      --bg: #f6f1e9;
      --text: #201a14;
      --muted: #6b5d4b;
      --glass: rgba(255, 255, 255, 0.72);
      --stroke: rgba(32, 26, 20, 0.08);
      --a1: #c27b4b;
      --a2: #d59e6d;
      --a3: #8c6d54;
    }
    html[data-world="arcade"] {
      --bg: #0b0b14;
      --text: #fef7ff;
      --muted: #c9b9e8;
      --glass: rgba(20, 18, 36, 0.78);
      --stroke: rgba(255, 255, 255, 0.14);
      --a1: #ff3dcd;
      --a2: #7c3aed;
      --a3: #20e3b2;
    }
    html[data-world="dunes"] {
      --bg: #f7f0e1;
      --text: #3a2d1a;
      --muted: #7a644a;
      --glass: rgba(255, 255, 255, 0.7);
      --stroke: rgba(58, 45, 26, 0.12);
      --a1: #d39b54;
      --a2: #e3b87b;
      --a3: #b3743d;
    }
    html[data-world="chrome"] {
      --bg: #f1f4f8;
      --text: #1c232b;
      --muted: #5f6b79;
      --glass: rgba(255, 255, 255, 0.68);
      --stroke: rgba(28, 35, 43, 0.12);
      --a1: #3b82f6;
      --a2: #94a3b8;
      --a3: #0f172a;
    }
    html[data-world="circuit"] {
      --bg: #0b1410;
      --text: #e9fff3;
      --muted: #9ec4ad;
      --glass: rgba(12, 24, 18, 0.72);
      --stroke: rgba(255, 255, 255, 0.12);
      --a1: #22c55e;
      --a2: #16a34a;
      --a3: #86efac;
    }
    body {
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
    }
    .tc-topbar {
      background: var(--glass);
      border-bottom: 1px solid var(--stroke);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
      z-index: var(--z-topbar, 2000) !important;
      overflow: visible;
    }
    .tc-topbar::after{
      content:"";
      position:absolute; left:0; right:0; bottom:-1px; height:1px;
      background: linear-gradient(90deg, var(--a1), var(--a2), var(--a3));
      opacity: .35;
    }
    .tc-chip{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
    }
    .tc-btn{
      border-radius: 0.75rem;
      border: 1px solid var(--stroke);
      background: var(--glass);
      color: var(--text);
    }
    .tc-btn-primary{
      background: linear-gradient(135deg, var(--a1), var(--a2));
      color: #fff;
      border: 1px solid rgba(255,255,255,.18);
    }
    .tc-dot{
      width: 10px; height: 10px; border-radius: 999px;
      background: linear-gradient(135deg, var(--a1), var(--a2), var(--a3));
      box-shadow: 0 0 0 2px rgba(255,255,255,.5);
    }
    .tc-card{
      background: var(--glass);
      border: 1px solid var(--stroke);
      backdrop-filter: blur(16px);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
    }
    #worldMenu[data-open="0"] { display: none; }
    #worldMenu[data-open="1"] { display: block; }
    .tc-menu[data-open="0"] { display: none; }
    .tc-menu[data-open="1"] { display: block; }
    .tc-menu{
      background: var(--glass);
      border: 1px solid var(--stroke);
      color: var(--text);
    }
    .tc-menu-item{
      color: var(--text);
    }
    .tc-menu-item:hover{ background: rgba(255,255,255,.10); }
    .tc-menu-item:focus-visible{
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,.12), 0 0 0 6px var(--a1);
      border-radius: 0.6rem;
    }
    .w1-actionbar {
      position: sticky;
      top: var(--tc-topbar-h, 64px);
      overflow: visible;
      z-index: var(--z-actionbar, 1500) !important;
    }
    .w1-actionbar > div {
      overflow: visible;
    }
    .w1-actionbar .tc-menu {
      position: absolute;
      z-index: var(--z-actionbar-menu, 3000) !important;
      top: calc(100% + 8px);
    }
    #portalMenu,
    #worldMenu {
      z-index: var(--z-topbar-menu, 4000) !important;
    }
  </style>
</head>
<body class="font-sans">
  <header class="tc-topbar sticky top-0 z-30 relative">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
      <a href="../index.html" class="flex items-center gap-3 min-w-0">
        <img src="../assets/spacecolors-logo-topbar.png" alt="SpaceColors" class="h-10 w-10 rounded-xl select-none" loading="eager" decoding="async">
        <span class="min-w-0 flex flex-col justify-center leading-tight">
          <span class="tc-brand text-base md:text-lg whitespace-nowrap" data-i18n="topbar.brand">SpaceColors &#183; 8Portal</span>
          <span class="tc-muted text-[11px] md:text-xs truncate max-w-[240px] md:max-w-[360px] hidden sm:block" data-i18n="topbar.slogan">M&#7897;t ch&#7841;m m&#7903; kh&#244;ng gian m&#224;u v&#244; h&#7841;n</span>
        </span>
      </a>
      <div class="flex-1 flex items-center justify-center">
        <div class="relative" id="portalSwitcher">
          <button id="portalBtn"
            class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[210px] justify-between"
            aria-expanded="false" aria-haspopup="menu" aria-controls="portalMenu">
            Ch&#7885;n Th&#7871; gi&#7899;i
          </button>
          <div id="portalMenu" data-open="0" role="menu" class="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./threadcolor.html" role="menuitem">Th&#7871; gi&#7899;i m&#224;u th&#234;u</a>
            <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./palette.html" role="menuitem">Th&#7871; gi&#7899;i d&#7843;i m&#224;u</a>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
            <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" role="menuitem" aria-disabled="true" disabled>S&#7855;p ra m&#7855;t</button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end gap-3 min-w-[210px]">
        <div class="relative" id="worldSwitcher">
          <button id="worldBtn"
            class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold w-[150px] justify-between"
            aria-expanded="false" aria-haspopup="menu" aria-controls="worldMenu">
            <span class="flex items-center gap-2">
              <span class="tc-dot" aria-hidden="true"></span>
              <span id="worldLabel">Origami</span>
            </span>
            <span aria-hidden="true">&#9662;</span>
          </button>
          <div id="worldMenu" data-open="0" role="menu" class="absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm tc-chip">
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="nebula" role="menuitem">Tinh v&#226;n</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="ocean" role="menuitem">&#272;&#7841;i d&#432;&#417;ng</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="ink" role="menuitem">M&#7921;c t&#224;u</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="origami" role="menuitem">Origami</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="arcade" role="menuitem">Arcade</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="dunes" role="menuitem">&#272;&#7891;i c&#225;t</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="chrome" role="menuitem">Chrome</button>
            <button class="tc-world-item w-full text-left px-3 py-2 rounded-md" data-world="circuit" role="menuitem">M&#7841;ch &#273;i&#7879;n</button>
          </div>
        </div>
        <div id="topbarAuthSlot" data-auth-slot="topbar" class="flex items-center justify-end min-w-[210px]"></div>
      </div>
    </div>
  </header>
  <div class="w1-actionbar border-b border-black/5">
    <div class="max-w-6xl mx-auto px-4 py-2 flex items-center justify-end gap-3">
      <div class="relative">
        <button id="w1CommunityBtn" class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold" aria-expanded="false" aria-haspopup="menu" aria-controls="w1CommunityMenu" data-i18n="topbar.nav.community">C&#7897;ng &#273;&#7891;ng</button>
        <div id="w1CommunityMenu" data-open="0" role="menu" class="tc-menu absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm">
          <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./threadcolor.html?open=contribute" data-i18n="topbar.communityContribute" role="menuitem">&#272;&#243;ng g&#243;p d&#7919; li&#7879;u</a>
          <a class="tc-menu-item block w-full text-left px-3 py-2 rounded-md" href="./threadcolor.html?open=verify" data-i18n="topbar.communityVerify" role="menuitem">X&#225;c minh</a>
        </div>
      </div>
      <div class="relative">
        <button id="w1SpacesBtn" class="tc-chip tc-btn flex items-center gap-2 px-3 py-2 text-sm font-semibold" aria-expanded="false" aria-haspopup="menu" aria-controls="w1SpacesMenu" data-i18n="topbar.nav.spaces">Kh&#244;ng gian</button>
        <div id="w1SpacesMenu" data-open="0" role="menu" class="tc-menu absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md shadow-xl p-1 text-sm">
          <button class="tc-menu-item w-full text-left px-3 py-2 rounded-md opacity-60 cursor-not-allowed" aria-disabled="true" disabled data-i18n="topbar.spaceVault">Kho ch&#7881;</button>
        </div>
      </div>
    </div>
  </div>

  <main class="mx-auto max-w-4xl px-4 pt-10 pb-16">
    <a class="tc-btn tc-chip inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold" href="./threadcolor.html">
      &#8592; V&#7873; Th&#7871; gi&#7899;i m&#224;u th&#234;u
    </a>
    <div class="tc-card rounded-2xl p-6 md:p-10">
      <h1 class="text-3xl font-bold" data-i18n="vault.title">Kho chỉ</h1>
      <p class="mt-3 tc-muted" data-i18n="vault.desc">Không gian này đang được hoàn thiện. Quay lại sau nhé.</p>
      <div class="mt-6 flex flex-wrap gap-2" role="tablist">
        <button class="tc-chip tc-btn px-3 py-2 text-sm font-semibold" data-tab="saved" data-i18n="vault.tabSaved" aria-selected="true">Kết quả đã lưu</button>
        <button class="tc-chip tc-btn px-3 py-2 text-sm font-semibold" data-tab="stock" data-i18n="vault.tabStock" aria-selected="false">Tồn kho</button>
      </div>
      <div class="mt-6">
        <section id="vaultTabSaved" data-tab-panel="saved">
          <div id="libraryOverlay" class="hidden"></div>
          <div id="libraryModal" class="hidden tc-card rounded-2xl border border-black/5 overflow-hidden">
            <div class="flex items-center justify-between px-5 py-4 border-b border-black/5">
              <h3 class="text-lg font-semibold" data-i18n="tc.library.title">Kết quả đã lưu</h3>
              <button id="libraryClose" class="tc-btn tc-chip px-3 py-2 text-sm" data-i18n="common.close">Đóng</button>
            </div>
            <div class="p-4">
              <div id="libraryList" class="space-y-3 text-sm"></div>
            </div>
          </div>
        </section>
        <section id="vaultTabStock" data-tab-panel="stock" class="hidden">
          <div id="stockCta" class="tc-card rounded-2xl p-6 hidden">
            <h2 class="text-lg font-semibold" data-i18n="vault.stock.ctaTitle">Đăng nhập để dùng Tồn kho</h2>
            <p class="tc-muted mt-1" data-i18n="vault.stock.ctaDesc">Quản lý tồn kho cá nhân theo tài khoản.</p>
            <button id="stockLoginBtn" class="tc-btn tc-btn-primary px-4 py-2 mt-4" data-i18n="vault.stock.ctaAction">Đăng nhập</button>
          </div>
          <div id="stockPanel" class="space-y-4">
            <div class="flex flex-wrap items-center gap-2">
              <input id="stockSearch" class="tc-field text-sm flex-1 min-w-[200px]" data-i18n-attr="placeholder:vault.stock.search" placeholder="Tìm theo hãng/mã/tên/hex">
              <div class="flex flex-wrap gap-2">
                <button id="stockAddBtn" class="tc-btn tc-btn-primary px-3 py-2 text-sm" data-i18n="vault.stock.add">Thêm</button>
                <button id="stockImportBtn" class="tc-btn tc-chip px-3 py-2 text-sm" data-i18n="vault.stock.import">Nhập CSV</button>
                <button id="stockExportBtn" class="tc-btn tc-chip px-3 py-2 text-sm" data-i18n="vault.stock.export">Xuất CSV</button>
              </div>
            </div>
            <div class="tc-card rounded-2xl p-4 flex flex-wrap gap-6 text-sm">
              <div><span class="tc-muted" data-i18n="vault.stock.summaryItems">Tổng mã</span> <strong id="stockSummaryItems">0</strong></div>
              <div><span class="tc-muted" data-i18n="vault.stock.summaryQty">Tổng số lượng</span> <strong id="stockSummaryQty">0</strong></div>
              <div><span class="tc-muted" data-i18n="vault.stock.summaryLow">Sắp hết</span> <strong id="stockSummaryLow">0</strong></div>
            </div>
            <div class="tc-card rounded-2xl overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead class="text-left">
                    <tr class="border-b border-black/5">
                      <th class="px-4 py-3" data-i18n="vault.stock.table.swatch">Màu</th>
                      <th class="px-4 py-3" data-i18n="vault.stock.table.brand">Hãng</th>
                      <th class="px-4 py-3" data-i18n="vault.stock.table.code">Mã</th>
                      <th class="px-4 py-3" data-i18n="vault.stock.table.name">Tên</th>
                      <th class="px-4 py-3" data-i18n="vault.stock.table.qty">SL</th>
                      <th class="px-4 py-3" data-i18n="vault.stock.table.unit">Đơn vị</th>
                      <th class="px-4 py-3" data-i18n="vault.stock.table.location">Vị trí</th>
                      <th class="px-4 py-3" data-i18n="vault.stock.table.updated">Cập nhật</th>
                      <th class="px-4 py-3 text-right" data-i18n="vault.stock.table.actions">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody id="stockBody"></tbody>
                </table>
              </div>
              <div id="stockEmpty" class="p-4 tc-muted hidden" data-i18n="vault.stock.empty">Chưa có dữ liệu tồn kho.</div>
            </div>
          </div>
          <input type="file" id="stockFileInput" class="hidden" accept=".csv,text/csv">
          <div id="stockOverlay" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden"></div>
          <div id="stockModal" class="fixed inset-0 z-50 hidden items-center justify-center px-4">
            <div class="tc-card w-full max-w-xl rounded-2xl shadow-2xl border border-black/5 overflow-hidden">
              <div class="flex items-center justify-between px-5 py-4 border-b border-black/5">
                <h3 id="stockModalTitle" class="text-lg font-semibold" data-i18n="vault.stock.modalAdd">Thêm tồn kho</h3>
                <button id="stockModalClose" class="tc-btn tc-chip px-3 py-2 text-sm" data-i18n="common.close">Đóng</button>
              </div>
              <form id="stockForm" class="p-5 space-y-4 text-sm">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="space-y-1">
                    <label class="font-medium" data-i18n="vault.stock.fields.brand">Hãng</label>
                    <input id="stockBrand" class="tc-field w-full" required>
                  </div>
                  <div class="space-y-1">
                    <label class="font-medium" data-i18n="vault.stock.fields.code">Mã</label>
                    <input id="stockCode" class="tc-field w-full" required>
                  </div>
                  <div class="space-y-1">
                    <label class="font-medium" data-i18n="vault.stock.fields.name">Tên</label>
                    <input id="stockName" class="tc-field w-full">
                  </div>
                  <div class="space-y-1">
                    <label class="font-medium" data-i18n="vault.stock.fields.hex">Hex</label>
                    <input id="stockHex" class="tc-field w-full" placeholder="#RRGGBB">
                  </div>
                  <div class="space-y-1">
                    <label class="font-medium" data-i18n="vault.stock.fields.qty">Số lượng</label>
                    <input id="stockQty" type="number" class="tc-field w-full" min="0" step="1" required>
                  </div>
                  <div class="space-y-1">
                    <label class="font-medium" data-i18n="vault.stock.fields.unit">Đơn vị</label>
                    <input id="stockUnit" class="tc-field w-full">
                  </div>
                  <div class="space-y-1">
                    <label class="font-medium" data-i18n="vault.stock.fields.location">Vị trí</label>
                    <input id="stockLocation" class="tc-field w-full">
                  </div>
                  <div class="space-y-1">
                    <label class="font-medium" data-i18n="vault.stock.fields.minQty">Tồn tối thiểu</label>
                    <input id="stockMinQty" type="number" class="tc-field w-full" min="0" step="1">
                  </div>
                </div>
                <div class="space-y-1">
                  <label class="font-medium" data-i18n="vault.stock.fields.note">Ghi chú</label>
                  <textarea id="stockNote" class="tc-field w-full min-h-[80px]"></textarea>
                </div>
                <div class="flex justify-end gap-2 pt-2">
                  <button type="button" id="stockCancel" class="tc-btn tc-chip px-4 py-2" data-i18n="vault.stock.modalCancel">Huỷ</button>
                  <button type="submit" id="stockSave" class="tc-btn tc-btn-primary px-4 py-2" data-i18n="vault.stock.modalSave">Lưu</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>

  <script>
    (function () {
      var worlds = ["nebula", "ocean", "ink", "origami", "arcade", "dunes", "chrome", "circuit"];
      var labels = {
        nebula: "Tinh vân",
        ocean: "Đại dương",
        ink: "Mực tàu",
        origami: "Origami",
        arcade: "Arcade",
        dunes: "Đồi cát",
        chrome: "Chrome",
        circuit: "Mạch điện"
      };
      var storageKey = "tc_world";
      var defaultWorld = "origami";
      var worldBtn = document.getElementById("worldBtn");
      var worldMenu = document.getElementById("worldMenu");
      var worldLabel = document.getElementById("worldLabel");
      var switcher = document.getElementById("worldSwitcher");

      function applyWorld(next) {
        var world = worlds.indexOf(next) !== -1 ? next : defaultWorld;
        document.documentElement.setAttribute("data-world", world);
        try { localStorage.setItem(storageKey, world); } catch (err) {}
        if (worldLabel) {
          worldLabel.textContent = labels[world] || world;
        }
      }

      function setMenuOpen(open) {
        if (!worldMenu) return;
        worldMenu.dataset.open = open ? "1" : "0";
        if (worldBtn) {
          worldBtn.setAttribute("aria-expanded", open ? "true" : "false");
        }
      }

      if (worldBtn && worldMenu) {
        worldBtn.addEventListener("click", function (event) {
          event.stopPropagation();
          setMenuOpen(worldMenu.dataset.open !== "1");
        });
        worldMenu.querySelectorAll("[data-world]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            applyWorld(btn.getAttribute("data-world"));
            setMenuOpen(false);
          });
        });
      }

      document.addEventListener("click", function (event) {
        if (!switcher) return;
        if (!switcher.contains(event.target)) {
          setMenuOpen(false);
        }
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          setMenuOpen(false);
        }
      });

      var initial = defaultWorld;
      try {
        initial = localStorage.getItem(storageKey) || defaultWorld;
      } catch (err) {}
      applyWorld(initial);
      setMenuOpen(false);
    })();
  </script>
  <script>
    (() => {
      if (window.__portalSwitcherBound) return;
      window.__portalSwitcherBound = true;
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
    })();
  </script>
  <script>
    (() => {
      const communityBtn = document.getElementById("w1CommunityBtn");
      const communityMenu = document.getElementById("w1CommunityMenu");
      const spacesBtn = document.getElementById("w1SpacesBtn");
      const spacesMenu = document.getElementById("w1SpacesMenu");
      if (!communityBtn || !communityMenu || !spacesBtn || !spacesMenu) return;
      const menus = [
        { btn: communityBtn, menu: communityMenu },
        { btn: spacesBtn, menu: spacesMenu }
      ];
      const setMenuOpen = (btn, menu, open) => {
        menu.dataset.open = open ? "1" : "0";
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      const closeAll = () => menus.forEach(({ btn, menu }) => setMenuOpen(btn, menu, false));
      communityBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = communityMenu.dataset.open === "1";
        closeAll();
        setMenuOpen(communityBtn, communityMenu, !isOpen);
      });
      spacesBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = spacesMenu.dataset.open === "1";
        closeAll();
        setMenuOpen(spacesBtn, spacesMenu, !isOpen);
      });
      communityMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-menu-item");
        if (!item || !communityMenu.contains(item)) return;
        closeAll();
      });
      spacesMenu.addEventListener("click", (event) => {
        const item = event.target.closest(".tc-menu-item");
        if (!item || !spacesMenu.contains(item)) return;
        closeAll();
      });
      document.addEventListener("click", (event) => {
        if (menus.some(({ btn, menu }) => btn.contains(event.target) || menu.contains(event.target))) return;
        closeAll();
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeAll();
      });
    })();
  </script>
  <script src="../i18n.js"></script>
  <script type="module" src="../auth.js"></script>
  <script type="module" src="../script.js"></script>
  <script type="module" src="../stock.js"></script>
  <script>
    (() => {
      const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
      const panels = Array.from(document.querySelectorAll("[data-tab-panel]"));
      let activeTab = "saved";
      const fireSaved = () => {
        if (activeTab !== "saved") return;
        document.dispatchEvent(new CustomEvent("tc-auth-action", { detail: { action: "library" } }));
      };
      const setActive = (tab) => {
        activeTab = tab;
        tabButtons.forEach((btn) => {
          const isActive = btn.getAttribute("data-tab") === tab;
          btn.setAttribute("aria-selected", isActive ? "true" : "false");
        });
        panels.forEach((panel) => {
          const isActive = panel.getAttribute("data-tab-panel") === tab;
          panel.classList.toggle("hidden", !isActive);
        });
        document.dispatchEvent(new CustomEvent("tc-vault-tab-changed", { detail: { tab } }));
        fireSaved();
      };
      const params = new URLSearchParams(window.location.search);
      const hashTab = window.location.hash.replace("#", "");
      const initial = params.get("tab") || hashTab || "saved";
      setActive(initial === "stock" ? "stock" : "saved");
      tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => setActive(btn.getAttribute("data-tab")));
      });
      document.addEventListener("tc-auth-changed", (event) => {
        if (!event?.detail?.user) return;
        fireSaved();
      });
    })();
  </script>
</body>
</html>

```

## FILE B&#7882; B&#7886; QUA
| File | L&#253; do |
|---|---|
| .github\CODEOWNERS | kh&#244;ng thu&#7897;c nh&#243;m text |
| assets\Logo SpaceColors.png | binary |
| assets\spacecolors-logo-topbar.png | binary |
| assets\spacecolors-mark-512.png | binary |
| assets\spacecolors-mark-64.png | binary |
| data\raw_tch\Ackerman Isacord 30.tch | kh&#244;ng thu&#7897;c nh&#243;m text |

## G&#7907;i &#253; snapshot chia nh&#7887;
- N&#7871;u c&#7847;n, t&#7841;o DOC/REPO_SNAPSHOT_PART_1.md, PART_2... v&#224; chia theo th&#432; m&#7909;c.
