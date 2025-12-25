(function(){
  var portal = document.getElementById("tcPortal");
  if (!portal) return;

  var allowed = ["nebula","ocean","ink","origami","arcade","dunes","chrome","crystal"];
  var KEY = "tc_world";
  var demoMap = {
    nebula: {
      hex: "#7c3aed",
      nearest: { brand: "Gingko", code: "N108", de: "1.3" },
      runner: { brand: "MS", code: "P402", de: "1.8" },
      alt: { brand: "Anchor", code: "149", de: "2.2" }
    },
    ocean: {
      hex: "#22d3ee",
      nearest: { brand: "Coats", code: "A927", de: "1.1" },
      runner: { brand: "MS", code: "471", de: "1.6" },
      alt: { brand: "Gingko", code: "M233", de: "2.0" }
    },
    ink: {
      hex: "#0f172a",
      nearest: { brand: "Anchor", code: "403", de: "0.9" },
      runner: { brand: "DMC", code: "310", de: "1.4" },
      alt: { brand: "MS", code: "777", de: "2.1" }
    },
    origami: {
      hex: "#f97316",
      nearest: { brand: "Gingko", code: "S511", de: "1.0" },
      runner: { brand: "Coats", code: "G219", de: "1.5" },
      alt: { brand: "Anchor", code: "822", de: "2.1" }
    },
    arcade: {
      hex: "#f43f5e",
      nearest: { brand: "MS", code: "241", de: "1.2" },
      runner: { brand: "Gingko", code: "R707", de: "1.7" },
      alt: { brand: "Anchor", code: "123", de: "2.0" }
    },
    dunes: {
      hex: "#f59e0b",
      nearest: { brand: "Coats", code: "E317", de: "1.1" },
      runner: { brand: "MS", code: "682", de: "1.6" },
      alt: { brand: "Gingko", code: "D204", de: "2.2" }
    },
    chrome: {
      hex: "#cbd5f5",
      nearest: { brand: "Anchor", code: "031", de: "1.4" },
      runner: { brand: "Coats", code: "B004", de: "1.9" },
      alt: { brand: "MS", code: "022", de: "2.3" }
    },
    crystal: {
      hex: "#22ffb4",
      nearest: { brand: "Gingko", code: "X909", de: "1.1" },
      runner: { brand: "MS", code: "318", de: "1.5" },
      alt: { brand: "Anchor", code: "279", de: "2.0" }
    }
  };

  function setText(id, value){
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function updateDemo(world){
    var data = demoMap[world] || demoMap.origami;
    if (!data) return;
    var swatch = document.getElementById("tcDemoSwatch");
    if (swatch) {
      swatch.style.background = "linear-gradient(135deg, " + data.hex + ", rgba(var(--a2),.45), rgba(var(--a3),.45))";
    }
    setText("tcDemoHex", data.hex);
    setText("tcDemoNearestBrand", data.nearest.brand);
    setText("tcDemoNearestCode", data.nearest.code);
    setText("tcDemoNearestDe", data.nearest.de);
    setText("tcDemoRunnerBrand", data.runner.brand);
    setText("tcDemoRunnerCode", data.runner.code);
    setText("tcDemoRunnerDe", data.runner.de);
    setText("tcDemoAltBrand", data.alt.brand);
    setText("tcDemoAltCode", data.alt.code);
    setText("tcDemoAltDe", data.alt.de);
  }

  function isAllowed(world){
    return allowed.indexOf(world) !== -1;
  }

  function getWorld(){
    var saved = localStorage.getItem(KEY);
    return isAllowed(saved) ? saved : "origami";
  }

  function setWorld(world){
    var next = isAllowed(world) ? world : "origami";
    localStorage.setItem(KEY, next);
    portal.dataset.world = next;
    updateDemo(next);
    return next;
  }

  function applyWorld(){
    return setWorld(getWorld());
  }

  function setOpen(elOrId, open){
    var el = typeof elOrId === "string" ? document.getElementById(elOrId) : elOrId;
    if (!el) return;
    el.setAttribute("data-open", open ? "1" : "0");
    el.setAttribute("aria-hidden", open ? "false" : "true");
  }

  function closeAllModals(){
    setOpen("tcGalleryModal", false);
    setOpen("tcRouletteModal", false);
    setOpen("tcForgeModal", false);
  }

  applyWorld();
  updateDemo(portal.dataset.world);

  var openGallery = document.getElementById("tcOpenGallery");
  var openRoulette = document.getElementById("tcOpenRoulette");
  var openForge = document.getElementById("tcOpenForge");
  var openRouletteInline = document.getElementById("tcOpenRouletteInline");
  var openForgeInline = document.getElementById("tcOpenForgeInline");
  var closeGallery = document.getElementById("tcGalleryClose");
  var closeRoulette = document.getElementById("tcRouletteClose");
  var closeForge = document.getElementById("tcForgeClose");

  if (openGallery) openGallery.addEventListener("click", function(){ setOpen("tcGalleryModal", true); });
  if (openRoulette) openRoulette.addEventListener("click", function(){ setOpen("tcRouletteModal", true); });
  if (openForge) openForge.addEventListener("click", function(){ setOpen("tcForgeModal", true); });
  if (openRouletteInline) openRouletteInline.addEventListener("click", function(){ setOpen("tcRouletteModal", true); });
  if (openForgeInline) openForgeInline.addEventListener("click", function(){ setOpen("tcForgeModal", true); });
  if (closeGallery) closeGallery.addEventListener("click", function(){ setOpen("tcGalleryModal", false); });
  if (closeRoulette) closeRoulette.addEventListener("click", function(){ setOpen("tcRouletteModal", false); });
  if (closeForge) closeForge.addEventListener("click", function(){ setOpen("tcForgeModal", false); });

  portal.addEventListener("click", function(e){
    var target = e.target;
    if (!target) return;
    if (target.matches("[data-close=\"1\"]")) {
      closeAllModals();
      return;
    }
    var card = target.closest("[data-world]");
    if (card && portal.contains(card)) {
      var world = card.getAttribute("data-world");
      setWorld(world);
      if (card.closest(".tc-modal")) {
        closeAllModals();
      }
    }
  });

  document.addEventListener("keydown", function(e){
    if (e.key === "Escape") closeAllModals();
  });

  var roulettePreview = document.getElementById("tcRoulettePreview");
  var roulettePreviewModal = document.getElementById("tcRoulettePreviewModal");
  var rouletteCss = document.getElementById("tcRouletteCss");
  var rouletteSpin = document.getElementById("tcRouletteSpin");
  var rouletteSpinModal = document.getElementById("tcRouletteSpinModal");
  var rouletteCopy = document.getElementById("tcRouletteCopy");

  var forgeSwatches = document.getElementById("tcForgeSwatches");
  var forgeSwatchesModal = document.getElementById("tcForgeSwatchesModal");
  var forgeGenerate = document.getElementById("tcForgeGenerate");
  var forgeGenerateModal = document.getElementById("tcForgeGenerateModal");
  var forgeCopy = document.getElementById("tcForgeCopy");

  var lastGradient = "";
  var lastPalette = [];

  function hslToHex(h, s, l){
    s /= 100; l /= 100;
    var k = function(n){ return (n + h / 30) % 12; };
    var a = s * Math.min(l, 1 - l);
    var f = function(n){
      return l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    };
    var toHex = function(x){
      return Math.round(255 * x).toString(16).padStart(2, "0");
    };
    return "#" + toHex(f(0)) + toHex(f(8)) + toHex(f(4));
  }

  function spinGradient(){
    var base = Math.floor(Math.random() * 360);
    var c1 = hslToHex(base, 80, 60);
    var c2 = hslToHex((base + 60) % 360, 80, 58);
    var c3 = hslToHex((base + 120) % 360, 75, 55);
    lastGradient = "linear-gradient(135deg, " + c1 + ", " + c2 + ", " + c3 + ")";
    if (roulettePreview) roulettePreview.style.background = lastGradient;
    if (roulettePreviewModal) roulettePreviewModal.style.background = lastGradient;
    if (rouletteCss) rouletteCss.textContent = lastGradient;
    lastPalette = [c1, c2, c3, hslToHex((base + 180) % 360, 70, 54), hslToHex((base + 240) % 360, 70, 56)];
    return lastGradient;
  }

  function renderPalette(){
    var nodes = [];
    if (forgeSwatches) nodes = nodes.concat([].slice.call(forgeSwatches.querySelectorAll(".tc-swatch")));
    if (forgeSwatchesModal) nodes = nodes.concat([].slice.call(forgeSwatchesModal.querySelectorAll(".tc-swatch")));
    for (var i = 0; i < nodes.length; i++) {
      var color = lastPalette[i % lastPalette.length];
      nodes[i].style.background = color;
    }
  }

  function ensurePalette(){
    if (!lastPalette.length) spinGradient();
    renderPalette();
  }

  if (rouletteSpin) rouletteSpin.addEventListener("click", function(){ spinGradient(); });
  if (rouletteSpinModal) rouletteSpinModal.addEventListener("click", function(){ spinGradient(); });
  if (forgeGenerate) forgeGenerate.addEventListener("click", function(){ ensurePalette(); });
  if (forgeGenerateModal) forgeGenerateModal.addEventListener("click", function(){ ensurePalette(); });

  if (rouletteCopy) {
    rouletteCopy.addEventListener("click", function(){
      if (!lastGradient) spinGradient();
      try { navigator.clipboard.writeText(lastGradient); } catch (e) {}
    });
  }
  if (forgeCopy) {
    forgeCopy.addEventListener("click", function(){
      if (!lastPalette.length) ensurePalette();
      try { navigator.clipboard.writeText(lastPalette.join("\n")); } catch (e) {}
    });
  }

  spinGradient();
  ensurePalette();
})();
