(() => {
  const modal = document.getElementById("faqModal");
  const openBtn = document.getElementById("faqOpen");
  const closeBtn = document.getElementById("faqClose");
  const contactMeta = window.__SC_META__?.contact || {};

  const setContact = (key) => {
    const value = contactMeta[key] || "Đang cập nhật";
    const textNode = document.querySelector(`[data-sc-contact="${key}"]`);
    const linkNode = document.querySelector(`[data-sc-contact-link="${key}"]`);
    if (textNode) textNode.textContent = value;
    if (linkNode) {
      if (value === "Đang cập nhật") {
        linkNode.removeAttribute("href");
        linkNode.setAttribute("aria-disabled", "true");
      } else if (key === "email") {
        linkNode.setAttribute("href", `mailto:${value}`);
      } else if (key === "phone") {
        linkNode.setAttribute("href", `tel:${value}`);
      } else if (key === "zalo") {
        linkNode.setAttribute("href", value.startsWith("http") ? value : `https://zalo.me/${value}`);
      }
    }
  };

  const setYear = () => {
    const node = document.getElementById("footerCopyright");
    if (!node) return;
    const year = new Date().getFullYear();
    const text = node.textContent || "";
    node.textContent = text.replace(/\b20\d{2}\b/, String(year));
  };

  const setModalOpen = (open) => {
    if (!modal) return;
    modal.classList.toggle("hidden", !open);
    modal.setAttribute("aria-hidden", open ? "false" : "true");
  };

  openBtn?.addEventListener("click", () => setModalOpen(true));
  closeBtn?.addEventListener("click", () => setModalOpen(false));
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) setModalOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setModalOpen(false);
  });

  setContact("email");
  setContact("phone");
  setContact("zalo");
  setYear();
})();
