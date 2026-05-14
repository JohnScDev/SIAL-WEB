const SIAL = (() => {
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function applyShell(activeKey) {
    if (window.SIALCore?.initNavigation) {
      window.SIALCore.initNavigation({ area: "gestion", module: "empresas", view: activeKey || "empresas" });
      return;
    }
    window.SIALCore?.initThemeToggle?.();
    const nav = qs("[data-nav]");
    if (!nav) return;
    const items = [
      ["empresas", "gestion-empresas.html", "Gestion de empresas"],
      ["registro", "registro-empresa.html", "Registro de empresa"],
      ["roles", "roles-empresa.html", "Roles por empresa"]
    ];
    nav.innerHTML = items.map(([key, href, label]) =>
      `<a class="nav-link ${key === activeKey ? "active" : ""}" href="${href}"><svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg><span>${label}</span></a>`
    ).join("");
  }

  function initThemeToggle() {
    const toggle = qs("[data-theme-toggle]");
    if (!toggle || toggle.dataset.themeReady === "true") return;
    toggle.dataset.themeReady = "true";
    const storedTheme = localStorage.getItem("sial-theme");
    const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme || (systemDark ? "dark" : "light");

    const setTheme = (theme) => {
      const normalizedTheme = theme === "dark" ? "dark" : "light";
      document.documentElement.dataset.theme = normalizedTheme;
      localStorage.setItem("sial-theme", normalizedTheme);
      const isDark = normalizedTheme === "dark";
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute("aria-label", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      toggle.setAttribute("title", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    };

    setTheme(initialTheme);
    toggle.addEventListener("click", () => {
      setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  function setFieldState(input, note, error, successText = "Dato validado.") {
    if (!input || !note) return;
    input.classList.toggle("is-error", Boolean(error));
    input.setAttribute("aria-invalid", error ? "true" : "false");
    note.classList.toggle("error", Boolean(error));
    note.classList.toggle("success", !error && Boolean(successText));
    note.textContent = error || successText || note.dataset.base || note.textContent;
  }

  function initTableFilters(config) {
    if (window.SIALCore?.initTableFilters) {
      window.SIALCore.initTableFilters(config);
      return;
    }
    const rows = qsa(config.rowSelector || "tbody tr");
    const search = qs(config.search);
    const status = qs(config.status);
    const context = qs(config.context);
    const empty = qs(config.empty);
    const count = qs(config.count);
    function filterRows() {
      const term = (search?.value || "").trim().toLowerCase();
      const state = status?.value || "all";
      const ctx = context?.value || "all";
      let visible = 0;
      rows.forEach((row) => {
        const show = (!term || row.textContent.toLowerCase().includes(term)) &&
          (state === "all" || row.dataset.status === state) &&
          (ctx === "all" || row.dataset.context === ctx);
        row.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });
      empty?.classList.toggle("show", visible === 0);
      if (count) count.textContent = `${visible} registros visibles`;
    }
    [search, status, context].filter(Boolean).forEach((control) => {
      control.addEventListener(control.tagName === "INPUT" ? "input" : "change", filterRows);
    });
    filterRows();
  }

  function initDrawer() {
    const drawer = qs("#detailDrawer");
    const backdrop = qs("#detailBackdrop");
    if (!drawer || !backdrop) return;
    const close = () => {
      drawer.classList.remove("show");
      backdrop.classList.remove("show");
    };
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
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  }

  function initBasicFormValidation(formSelector = "[data-company-form]") {
    const form = qs(formSelector);
    if (!form) return;
    qsa("[data-uppercase]", form).forEach((input) => {
      input.addEventListener("input", (event) => { event.target.value = event.target.value.toUpperCase(); });
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let fail = false;
      qsa("[data-required]", form).forEach((input) => {
        const note = qs(`#${input.getAttribute("aria-describedby")}`);
        if (note && !note.dataset.base) note.dataset.base = note.textContent;
        const empty = !String(input.value || "").trim();
        setFieldState(input, note, empty ? "Este campo es obligatorio." : "");
        if (empty) fail = true;
      });
      qsa("[data-nit]", form).forEach((input) => {
        const note = qs(`#${input.getAttribute("aria-describedby")}`);
        if (input.value && !/^[0-9]{6,12}-?[0-9]?$/.test(input.value)) {
          setFieldState(input, note, "El NIT debe tener formato numerico valido.", "");
          fail = true;
        }
      });
      qs("#formOk")?.classList.toggle("is-hidden", fail);
    });
  }

  function initCompanyRoleTransfer() {
    const included = qs("#rolesIncluded");
    const excluded = qs("#rolesExcluded");
    const save = qs("#saveRoles");
    const note = qs("#rolesTransferNote");
    if (!included || !excluded) return;
    const move = (from, to) => {
      qsa("input:checked", from).forEach((input) => {
        const option = input.closest(".role-option");
        input.checked = false;
        to.appendChild(option);
      });
      if (note) {
        note.classList.remove("error");
        note.classList.add("success");
        note.textContent = "Cambios pendientes por guardar.";
      }
      save?.removeAttribute("disabled");
    };
    qs("#includeRole")?.addEventListener("click", () => move(excluded, included));
    qs("#excludeRole")?.addEventListener("click", () => move(included, excluded));
    save?.addEventListener("click", () => {
      const total = qsa(".role-option", included).length;
      if (total < 1) {
        note?.classList.add("error");
        if (note) note.textContent = "Debe seleccionar al menos un rol para la empresa.";
        return;
      }
      note?.classList.remove("error");
      note?.classList.add("success");
      if (note) note.textContent = "Roles actualizados correctamente.";
      save.setAttribute("disabled", "disabled");
    });
  }

  return { applyShell, initTableFilters, initDrawer, initBasicFormValidation, initCompanyRoleTransfer };
})();
