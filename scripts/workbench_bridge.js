import {
  appendBufferToUrl,
  ensureBufferFromHexes,
  getContext,
  setContext
} from "./workbench_context.js";

if (typeof window !== "undefined") {
  window.tcWorkbench = {
    getContext,
    setContext,
    ensureBufferFromHexes,
    appendBufferToUrl
  };

  window.addEventListener("tc:hex-apply", (event) => {
    const hexes = event?.detail?.hexes || [];
    setContext(hexes, { source: "hex-apply" });
  });
}
