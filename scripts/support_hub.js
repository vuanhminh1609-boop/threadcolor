(() => {
  const modal = document.getElementById("supportModal");
  const closeBtn = document.getElementById("supportClose");
  const scroll = document.getElementById("supportScroll");
  const toc = document.getElementById("supportToc");
  const typeSelect = document.getElementById("supportType");
  const emailInput = document.getElementById("supportEmail");
  const messageInput = document.getElementById("supportMessage");
  const sendBtn = document.getElementById("supportSend");
  const mailHelp = document.getElementById("supportMailHelp");

  const openModal = (targetId) => {
    if (!modal) return;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (targetId) {
      const section = document.getElementById(targetId);
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (targetId === "support-start" && typeSelect) typeSelect.value = "Hỏi đáp";
      if (targetId === "support-bug" && typeSelect) typeSelect.value = "Báo lỗi";
      if (targetId === "support-pro" && typeSelect) typeSelect.value = "Đề xuất tính năng";
    }
    window.setTimeout(() => {
      if (messageInput) messageInput.focus();
    }, 120);
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-action]");
    if (!trigger) return;
    const action = trigger.dataset.action;
    if (action === "open-support") openModal();
    if (action === "open-support-bug") openModal("support-bug");
    if (action === "open-support-feature") openModal("support-pro");
    if (action === "open-support-start") openModal("support-start");
  });

  toc?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-support-target]");
    if (!btn) return;
    const target = btn.dataset.supportTarget;
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  closeBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  sendBtn?.addEventListener("click", () => {
    const type = typeSelect?.value || "Hỏi đáp";
    const email = emailInput?.value || "";
    const message = messageInput?.value || "";
    if (!message.trim()) {
      if (messageInput) messageInput.focus();
      return;
    }
    const now = new Date().toLocaleString("vi-VN");
    const subject = `[SpaceColors] ${type}`;
    const body = [
      `Loại yêu cầu: ${type}`,
      `Email liên hệ: ${email || "Không cung cấp"}`,
      `URL: ${window.location.href}`,
      `Thời gian: ${now}`,
      "",
      message.trim()
    ].join("\n");
    const mailto = `mailto:spacecolor8portals@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const link = document.createElement("a");
    link.href = mailto;
    link.click();
    if (mailHelp) mailHelp.classList.remove("hidden");
  });
})();
