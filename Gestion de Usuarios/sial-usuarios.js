const SIAL = (() => {
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const rolesByCompany = {
    "SIAL Central": [
      ["admin-general", "Administrador general", "Acceso administrativo completo."],
      ["seguridad", "Seguridad y roles", "Gestiona usuarios, roles y permisos."],
      ["auditoria", "Consulta auditoria", "Consulta trazabilidad y eventos."]
    ],
    Banapalma: [
      ["supervisor-campo", "Supervisor campo", "Gestiona operacion regional."],
      ["gestor-documental", "Gestor documental", "Consulta y actualiza soportes."],
      ["consulta", "Consulta operativa", "Acceso de lectura operacional."]
    ],
    AgroCeiba: [
      ["consulta-historica", "Consulta historica", "Acceso limitado a informacion historica."]
    ]
  };

  function applyShell(activeKey) {
    if (window.SIALCore?.initNavigation) {
      window.SIALCore.initNavigation({ area: "gestion", module: "usuarios", view: activeKey || "usuarios" });
      return;
    }
    window.SIALCore?.initThemeToggle?.();
    const nav = qs("[data-nav]");
    if (!nav) return;
    const items = [
      ["usuarios", "gestion-usuarios.html", "Gestion de usuarios"],
      ["registro", "registro-usuario.html", "Registro de usuario"],
      ["edicion", "editar-usuario.html", "Editar usuario"]
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

    function setTheme(theme) {
      const normalizedTheme = theme === "dark" ? "dark" : "light";
      document.documentElement.dataset.theme = normalizedTheme;
      localStorage.setItem("sial-theme", normalizedTheme);
      const isDark = normalizedTheme === "dark";
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute("aria-label", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      toggle.setAttribute("title", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    }

    setTheme(storedTheme || (systemDark ? "dark" : "light"));
    toggle.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
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

  function initBasicFormValidation(formSelector = "[data-user-form]") {
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
      qsa("[type='email']", form).forEach((input) => {
        const note = qs(`#${input.getAttribute("aria-describedby")}`);
        if (input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          setFieldState(input, note, "Debe tener formato de correo valido.", "");
          fail = true;
        }
      });
      const password = qs("#password", form);
      const confirm = qs("#confirmPassword", form);
      if (password && confirm && password.value !== confirm.value) {
        setFieldState(confirm, qs("#confirmPasswordNote"), "Debe coincidir exactamente con la contrasena.", "");
        fail = true;
      }
      const assignments = qsa("[data-assignment-company]").length;
      const assignmentNote = qs("#assignmentNote");
      if (assignmentNote) {
        assignmentNote.classList.toggle("error", assignments < 1);
        assignmentNote.classList.toggle("success", assignments >= 1);
        assignmentNote.textContent = assignments < 1 ? "Agrega al menos una relacion empresa + roles antes de guardar." : "Relaciones empresa + roles listas para guardar.";
        if (assignments < 1) fail = true;
      }
      qs("#formOk")?.classList.toggle("is-hidden", fail);
    });
  }

  function initUserRoleAssignment() {
    const companySelect = qs("#company");
    const roleGrid = qs("#roleDraftGrid");
    const rolesNote = qs("#rolesNote");
    const companyNote = qs("#companyNote");
    const assignmentList = qs("#assignmentList");
    const addButton = qs("#addAssignment");
    let assignments = [];
    let editingCompany = "";

    const renderRoleDraft = (company, selected = []) => {
      if (!roleGrid) return;
      const roles = rolesByCompany[company] || [];
      if (!company || !roles.length) {
        roleGrid.innerHTML = `<div class="empty-state show">Selecciona una empresa activa para cargar roles disponibles.</div>`;
        return;
      }
      roleGrid.innerHTML = roles.map(([value, label, description]) => `
        <label class="role-option">
          <input type="checkbox" value="${value}" ${selected.includes(value) ? "checked" : ""}>
          <span><strong>${label}</strong><span>${description}</span></span>
        </label>
      `).join("");
    };

    const selectedRoles = () => qsa("input[type='checkbox']:checked", roleGrid).map((input) => input.value);
    const roleLabel = (company, roleValue) => (rolesByCompany[company] || []).find(([value]) => value === roleValue)?.[1] || roleValue;

    const renderAssignments = () => {
      if (!assignmentList) return;
      if (!assignments.length) {
        assignmentList.innerHTML = `<div class="empty-state show">Aun no hay relaciones empresa + roles agregadas.</div>`;
        return;
      }
      assignmentList.innerHTML = assignments.map((item) => `
        <div class="assignment-item" data-assignment-company="${item.company}">
          <div>
            <strong>${item.company}</strong>
            <div class="muted">${item.roles.map((role) => roleLabel(item.company, role)).join(", ")}</div>
          </div>
          <div class="assignment-actions">
            <button class="btn btn-secondary" type="button" data-edit-company="${item.company}">Editar</button>
            <button class="btn btn-secondary" type="button" data-remove-company="${item.company}">Quitar</button>
          </div>
        </div>
      `).join("");
      qsa("[data-edit-company]", assignmentList).forEach((button) => {
        button.addEventListener("click", () => {
          const company = button.dataset.editCompany;
          const current = assignments.find((item) => item.company === company);
          editingCompany = company;
          companySelect.value = company;
          renderRoleDraft(company, current?.roles || []);
          setFieldState(companySelect, companyNote, "", "Empresa cargada para editar roles.");
        });
      });
      qsa("[data-remove-company]", assignmentList).forEach((button) => {
        button.addEventListener("click", () => {
          assignments = assignments.filter((item) => item.company !== button.dataset.removeCompany);
          renderAssignments();
        });
      });
    };

    companySelect?.addEventListener("change", () => {
      const company = companySelect.value;
      const current = assignments.find((item) => item.company === company);
      editingCompany = current ? company : "";
      renderRoleDraft(company, current?.roles || []);
      setFieldState(companySelect, companyNote, company ? "" : "Selecciona una empresa.", company ? "Empresa lista para cargar roles." : "");
      if (rolesNote) rolesNote.textContent = "Selecciona uno o mas roles y agrega la asignacion.";
    });

    addButton?.addEventListener("click", () => {
      const company = companySelect.value;
      const roles = selectedRoles();
      if (!company) {
        setFieldState(companySelect, companyNote, "Selecciona una empresa antes de agregar la asignacion.", "");
        return;
      }
      if (!roles.length) {
        rolesNote?.classList.add("error");
        if (rolesNote) rolesNote.textContent = "Selecciona al menos un rol para la empresa actual.";
        return;
      }
      const index = assignments.findIndex((item) => item.company === company);
      const payload = { company, roles };
      if (index >= 0) assignments[index] = payload;
      else assignments.push(payload);
      editingCompany = "";
      companySelect.value = "";
      renderRoleDraft("");
      renderAssignments();
      rolesNote?.classList.remove("error");
      rolesNote?.classList.add("success");
      if (rolesNote) rolesNote.textContent = "Asignacion agregada al resumen inferior.";
    });

    renderRoleDraft("");
    renderAssignments();
  }

  return { applyShell, initTableFilters, initDrawer, initBasicFormValidation, initUserRoleAssignment };
})();
