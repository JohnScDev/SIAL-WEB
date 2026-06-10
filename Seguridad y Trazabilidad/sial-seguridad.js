const SIAL = (() => {
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function applyShell(activeKey) {
    if (window.SIALCore?.initShell) {
      window.SIALCore.initShell({ area: "gestion", module: "seguridad", view: activeKey || "tiposInspeccion" });
      return;
    }
    window.SIALCore?.initThemeToggle?.();
    const nav = qs("[data-nav]");
    if (!nav) return;
    const items = [
      ["tiposInspeccion", "gestion-tipos-inspeccion.html", "Tipos de inspeccion"],
      ["tiposEvento", "gestion-tipos-evento-trazabilidad.html", "Tipos de evento trazabilidad"]
    ];
    nav.innerHTML = items.map(([key, href, label]) =>
      `<a class="nav-link ${key === activeKey ? "active" : ""}" href="${href}"><svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg><span>${label}</span></a>`
    ).join("");
  }

  function setFieldState(input, note, error, successText) {
    if (!input || !note) return;
    input.classList.toggle("is-error", Boolean(error));
    input.setAttribute("aria-invalid", error ? "true" : "false");
    note.classList.toggle("error", Boolean(error));
    note.classList.toggle("success", !error && Boolean(successText));
    note.textContent = error || successText || note.dataset.base || note.textContent;
  }

  function initTableFilters(config) {
    if (window.SIALCore?.initTableFilters) { window.SIALCore.initTableFilters(config); return; }
    const rows = qsa(config.rowSelector);
    const search = qs(config.search);
    const status = qs(config.status);
    const empty = qs(config.empty);
    const count = qs(config.count);
    function filterRows() {
      const term = (search?.value || "").trim().toLowerCase();
      const state = status?.value || "all";
      let visible = 0;
      rows.forEach((row) => {
        const show = (!term || row.textContent.toLowerCase().includes(term)) && (state === "all" || row.dataset.status === state);
        row.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });
      empty?.classList.toggle("show", visible === 0);
      if (count) count.textContent = `${visible} registros visibles`;
    }
    [search, status].filter(Boolean).forEach((control) => {
      control.addEventListener(control.tagName === "INPUT" ? "input" : "change", filterRows);
    });
    filterRows();
  }

  function initDrawer() {
    const drawer = qs("#detailDrawer");
    const backdrop = qs("#detailBackdrop");
    if (!drawer || !backdrop) return;
    const close = () => { drawer.classList.remove("show"); backdrop.classList.remove("show"); };
    qsa("[data-open-detail]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const row = event.target.closest("tr");
        if (!row) return;
        qsa("[data-detail-target]").forEach((node) => {
          node.textContent = row.dataset[node.dataset.detailTarget] || "-";
        });
        const audit = qs("#detailAudit");
        if (audit) {
          audit.innerHTML = (row.dataset.audit || "").split(";").filter(Boolean).map((item) => {
            const [title, meta] = item.split("|");
            return `<div class="audit-item"><strong>${title || "-"}</strong><div class="muted">${meta || ""}</div></div>`;
          }).join("");
        }
        drawer.classList.add("show");
        backdrop.classList.add("show");
        qs("#closeDetail")?.focus();
      });
    });
    qs("#closeDetail")?.addEventListener("click", close);
    backdrop.addEventListener("click", close);
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
  }

  function initEmbeddedForm(config = {}) {
    const panel = qs(config.panel || "[data-inline-form-panel]");
    const openButton = qs(config.openButton || "[data-open-inline-form]");
    const cancelButton = qs(config.cancelButton || "[data-cancel-inline-form]");
    const title = qs(config.title || "[data-inline-form-title]");
    const form = panel?.querySelector("form");
    if (!panel || !openButton) return;
    const open = (mode = "new") => {
      panel.classList.remove("is-hidden");
      openButton.setAttribute("aria-expanded", "true");
      if (title) title.textContent = mode === "edit" ? config.editTitle || "Editar registro" : config.newTitle || "Nuevo registro";
      panel.querySelector("input:not([readonly]), select, textarea")?.focus();
    };
    const close = () => {
      panel.classList.add("is-hidden");
      openButton.setAttribute("aria-expanded", "false");
      form?.reset();
      openButton.focus();
    };
    openButton.addEventListener("click", () => open("new"));
    cancelButton?.addEventListener("click", close);
    qsa(config.editButtons || "[data-edit-inline]").forEach((button) => button.addEventListener("click", () => open("edit")));
  }

  function initCatalogForm(config = {}) {
    const form = qs(config.form || "[data-catalog-form]");
    if (!form) return;
    const ok = qs("#formOk");
    const existingNames = (config.existingNames || "").split("|").map((item) => item.trim().toUpperCase()).filter(Boolean);
    qsa("[data-uppercase]", form).forEach((input) => input.addEventListener("input", (event) => { event.target.value = event.target.value.toUpperCase(); }));
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let fail = false;
      qsa("[data-required]", form).forEach((input) => {
        const note = qs(`#${input.getAttribute("aria-describedby")}`);
        if (note && !note.dataset.base) note.dataset.base = note.textContent;
        const empty = !String(input.value || "").trim();
        setFieldState(input, note, empty ? "Este campo es obligatorio." : "", "Dato validado.");
        if (empty) fail = true;
      });
      qsa("[data-unique-name]", form).forEach((input) => {
        const note = qs(`#${input.getAttribute("aria-describedby")}`);
        const value = input.value.trim().toUpperCase();
        if (value && existingNames.includes(value)) {
          setFieldState(input, note, "El nombre ya existe en la tabla maestra.", "");
          fail = true;
        }
      });
      qsa("[data-positive-number]", form).forEach((input) => {
        const note = qs(`#${input.getAttribute("aria-describedby")}`);
        if (input.value && Number(input.value) <= 0) {
          setFieldState(input, note, "Debe ser un valor numerico mayor a cero.", "");
          fail = true;
        }
      });
      ok?.classList.toggle("is-hidden", fail);
    });
  }

  return { applyShell, initTableFilters, initDrawer, initEmbeddedForm, initCatalogForm };
})();