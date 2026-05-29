const SIAL = (() => {
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const companyTypes = [
    ["transportadora", "Transportadora", "Opera flota, conductores o servicios logisticos."],
    ["productor", "Productor", "Asocia fincas, grupos o informacion productiva."],
    ["exportador", "Exportador", "Participa en procesos comerciales y de despacho."],
    ["cliente", "Cliente", "Recibe servicios o informacion administrativa."]
  ];

  function applyShell(activeKey) {
    if (window.SIALCore?.initShell) {
      window.SIALCore.initShell({ area: "gestion", module: "empresas", view: activeKey || "empresas" });
      return;
    }
    window.SIALCore?.initThemeToggle?.();
    const nav = qs("[data-nav]");
    if (!nav) return;
    const items = [
      ["empresas", "gestion-empresas.html", "Gestion de empresas"],
      ["roles", "roles-empresa.html", "Roles por empresas"],
      ["paramRoles", "parametrizacion-roles.html", "Creacion de roles"],
      ["tiposEmpresa", "../Gestion%20de%20Transporte/gestion-tipos-empresa.html", "Tipos de empresas"],
      ["empresaTipo", "../Gestion%20de%20Transporte/relacion-empresa-tipo.html", "Empresa + tipo"]
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
      const companyTypeNote = qs("#companyTypeAssignmentNote", form);
      if (companyTypeNote) {
        const assignments = qsa("[data-company-type-assignment]", form).length;
        companyTypeNote.classList.toggle("error", assignments < 1);
        companyTypeNote.classList.toggle("success", assignments >= 1);
        companyTypeNote.textContent = assignments < 1 ? "Agrega al menos un tipo de empresa antes de guardar." : "Tipos de empresa listos para guardar.";
        if (assignments < 1) fail = true;
      }
      qs("#formOk")?.classList.toggle("is-hidden", fail);
    });
  }

  function initCompanyTypeAssignment() {
    const form = qs("[data-company-form]");
    const typeGrid = qs("#companyTypeDraftGrid");
    const typeNote = qs("#companyTypeNote");
    const assignmentNote = qs("#companyTypeAssignmentNote");
    const assignmentList = qs("#companyTypeAssignmentList");
    const addButton = qs("#addCompanyTypeAssignment");
    if (!form || !typeGrid || !assignmentList) return;

    let assignments = [];

    const typeLabel = (value) => companyTypes.find(([typeValue]) => typeValue === value)?.[1] || value;
    const selectedTypes = () => qsa("input[type='checkbox']:checked", typeGrid).map((input) => input.value);

    const renderDraft = () => {
      typeGrid.innerHTML = companyTypes.map(([value, label, description]) => `
        <label class="role-option">
          <input type="checkbox" value="${value}">
          <span><strong>${label}</strong><span>${description}</span></span>
        </label>
      `).join("");
    };

    const renderAssignments = () => {
      if (!assignments.length) {
        assignmentList.innerHTML = `<div class="empty-state show">Aun no hay tipos de empresa asignados.</div>`;
        assignmentNote?.classList.remove("success");
        if (assignmentNote) assignmentNote.textContent = "Agrega al menos un tipo de empresa antes de guardar.";
        return;
      }
      assignmentList.innerHTML = assignments.map((value) => `
        <div class="assignment-item" data-company-type-assignment="${value}">
          <input type="hidden" name="companyTypes[]" value="${value}">
          <div>
            <strong>${typeLabel(value)}</strong>
            <div class="muted">Tipo de empresa agregado al registro.</div>
          </div>
          <div class="assignment-actions">
            <button class="btn btn-secondary" type="button" data-remove-company-type="${value}">Quitar</button>
          </div>
        </div>
      `).join("");
      assignmentNote?.classList.remove("error");
      assignmentNote?.classList.add("success");
      if (assignmentNote) assignmentNote.textContent = `${assignments.length} tipo${assignments.length === 1 ? "" : "s"} de empresa asignado${assignments.length === 1 ? "" : "s"}.`;
      qsa("[data-remove-company-type]", assignmentList).forEach((button) => {
        button.addEventListener("click", () => {
          assignments = assignments.filter((value) => value !== button.dataset.removeCompanyType);
          renderAssignments();
        });
      });
    };

    addButton?.addEventListener("click", () => {
      const selected = selectedTypes();
      if (!selected.length) {
        typeNote?.classList.add("error");
        if (typeNote) typeNote.textContent = "Selecciona al menos un tipo para agregarlo.";
        return;
      }
      assignments = Array.from(new Set([...assignments, ...selected]));
      qsa("input[type='checkbox']", typeGrid).forEach((input) => { input.checked = false; });
      typeNote?.classList.remove("error");
      typeNote?.classList.add("success");
      if (typeNote) typeNote.textContent = "Tipos agregados al resumen inferior.";
      renderAssignments();
    });

    form.addEventListener("reset", () => {
      assignments = [];
      window.setTimeout(() => {
        renderDraft();
        renderAssignments();
        typeNote?.classList.remove("error", "success");
        if (typeNote) typeNote.textContent = "Selecciona uno o mas tipos y agregalos a la asignacion.";
        assignmentNote?.classList.remove("error", "success");
        if (assignmentNote) assignmentNote.textContent = "Agrega al menos un tipo de empresa antes de guardar.";
      }, 0);
    });

    renderDraft();
    renderAssignments();
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

  function initRoleAdminPanel() {
    const form = qs("[data-role-admin-form]");
    const cards = qsa("[data-role-card]");
    const checkboxes = qsa("[data-permission-check]", form || document);
    const search = qs("#roleAdminSearch");
    const status = qs("#roleAdminStatus");
    const empty = qs("#roleAdminEmpty");
    const count = qs("#roleAdminCount");
    const newButton = qs("#newRoleMode");
    const permissionNote = qs("#permissionSummaryNote");
    const companySelect = qs("#roleCompanyAssignment");
    const roleName = qs("#roleName");
    const roleScope = qs("#roleScope");
    const roleRisk = qs("#roleRisk");
    const roleDescription = qs("#roleDescription");
    const summaryText = qs("#roleSummaryText");
    const formOk = qs("#formOk");
    if (!form || !cards.length) return;

    const companyLabel = () => companySelect?.selectedOptions?.[0]?.textContent || "";

    const updatePermissionSummary = () => {
      const total = checkboxes.filter((input) => input.checked).length;
      permissionNote?.classList.toggle("error", total === 0);
      permissionNote?.classList.toggle("success", total > 0);
      if (permissionNote) permissionNote.textContent = total === 0 ? "Selecciona al menos un permiso para guardar el rol." : `${total} permiso${total === 1 ? "" : "s"} seleccionado${total === 1 ? "" : "s"}.`;
      return total;
    };

    const updateAssignmentSummary = () => {
      const role = roleName?.value?.trim() || "Nuevo rol";
      const company = companySelect?.value ? companyLabel() : "empresa pendiente";
      const permissions = updatePermissionSummary();
      if (summaryText) summaryText.textContent = `${role} para ${company} - ${permissions} permiso${permissions === 1 ? "" : "s"}`;
    };

    const setDetail = (card) => {
      qs("#selectedRoleName").textContent = card.dataset.roleName || "Rol";
      qs("#selectedRoleSummary").textContent = card.dataset.summary || "-";
      qs("#selectedRoleCompany").textContent = card.dataset.companyName || "-";
      qs("#selectedRolePermissions").textContent = card.dataset.permissionsCount || "0";
      qs("#selectedRoleAudit").textContent = card.dataset.audit || "-";
    };

    const fillFormFromCard = (card) => {
      cards.forEach((item) => item.classList.toggle("is-selected", item === card));
      setDetail(card);
      if (roleName) roleName.value = card.dataset.roleName || "";
      if (roleScope) roleScope.value = card.dataset.roleType || "";
      if (roleRisk) roleRisk.value = card.dataset.roleRisk || "Baja";
      if (roleDescription) roleDescription.value = card.dataset.summary || "";
      if (companySelect) companySelect.value = card.dataset.companyCode || "";
      formOk?.classList.add("is-hidden");
      updateAssignmentSummary();
    };

    const setNewMode = () => {
      cards.forEach((item) => item.classList.remove("is-selected"));
      form.reset();
      qsa("[data-required]", form).forEach((input) => {
        const note = qs(`#${input.getAttribute("aria-describedby")}`);
        if (note?.dataset.base) note.textContent = note.dataset.base;
        input.classList.remove("is-error");
        input.setAttribute("aria-invalid", "false");
        note?.classList.remove("error", "success");
      });
      qs("#selectedRoleName").textContent = "Nuevo rol";
      qs("#selectedRoleSummary").textContent = "Completa datos, empresa y permisos para crear el rol.";
      qs("#selectedRoleCompany").textContent = "Pendiente";
      qs("#selectedRolePermissions").textContent = "0";
      qs("#selectedRoleAudit").textContent = "Sin auditoria";
      formOk?.classList.add("is-hidden");
      updateAssignmentSummary();
      roleName?.focus();
    };

    const filterCards = () => {
      const term = String(search?.value || "").trim().toLowerCase();
      const selectedStatus = status?.value || "all";
      let visible = 0;
      cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        const show = (!term || text.includes(term)) && (selectedStatus === "all" || card.dataset.status === selectedStatus);
        card.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });
      empty?.classList.toggle("show", visible === 0);
      if (count) count.textContent = `${visible} rol${visible === 1 ? "" : "es"} visibles`;
    };

    const validateForm = () => {
      let fail = false;
      qsa("[data-required]", form).forEach((input) => {
        const note = qs(`#${input.getAttribute("aria-describedby")}`);
        if (note && !note.dataset.base) note.dataset.base = note.textContent;
        const empty = !String(input.value || "").trim();
        setFieldState(input, note, empty ? "Este campo es obligatorio." : "");
        if (empty) fail = true;
      });
      if (updatePermissionSummary() === 0) fail = true;
      return !fail;
    };

    cards.forEach((card) => card.addEventListener("click", () => fillFormFromCard(card)));
    [search, status].filter(Boolean).forEach((control) => {
      control.addEventListener(control.tagName === "INPUT" ? "input" : "change", filterCards);
    });
    [roleName, roleScope, roleRisk, roleDescription, companySelect].filter(Boolean).forEach((control) => {
      control.addEventListener("input", updateAssignmentSummary);
      control.addEventListener("change", updateAssignmentSummary);
    });
    checkboxes.forEach((input) => input.addEventListener("change", updateAssignmentSummary));
    newButton?.addEventListener("click", setNewMode);
    form.addEventListener("reset", () => window.setTimeout(setNewMode, 0));
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      formOk?.classList.toggle("is-hidden", !validateForm());
      updateAssignmentSummary();
    });

    fillFormFromCard(cards[0]);
    filterCards();
  }

  const initRolePermissionMatrix = initRoleAdminPanel;

  return { applyShell, initTableFilters, initDrawer, initBasicFormValidation, initCompanyRoleTransfer, initCompanyTypeAssignment, initRolePermissionMatrix, initRoleAdminPanel };
})();
