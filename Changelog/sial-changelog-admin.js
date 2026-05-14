const SIALChangelogAdmin = (() => {
  const moduleLabels = {
    catalogo: "Catalogo",
    autenticacion: "Autenticacion",
    transporte: "Transporte",
    planeacion: "Planeacion",
    puerto: "Puerto",
    fincas: "Fincas",
    usuarios: "Usuarios y empresas"
  };
  const audienceLabels = {
    externo: "Externo",
    interno: "Interno",
    ambos: "Ambos"
  };
  const statusLabels = {
    publicado: "Publicado",
    borrador: "Borrador",
    removido: "Removido"
  };
  const statusClasses = {
    publicado: "status-active",
    borrador: "status-warning",
    removido: "status-inactive"
  };

  let releases = [
    {
      id: "entry-090",
      version: "v0.9.0",
      date: "2026-05-05",
      audience: "ambos",
      module: "catalogo",
      type: "improvement",
      status: "publicado",
      title: "Libreria UI y modo oscuro extendido",
      summary: "Se consolida una base visual reutilizable para crecer nuevas vistas con mayor consistencia.",
      changes: "Nueva libreria UI con componentes base, estados, relaciones y patrones operativos.\nModo oscuro disponible en catalogo y modulos de gestion.\nAjustes de espaciado en componentes de relaciones y secciones analiticas.",
      technicalNotes: "Validar sincronizacion de shared entre catalogo y carpetas publicadas.",
      owner: "equipo.qa",
      modifiedBy: "admin.catalogo",
      modifiedAt: "05/05/2026 14:40"
    },
    {
      id: "entry-085",
      version: "v0.8.5",
      date: "2026-05-05",
      audience: "externo",
      module: "catalogo",
      type: "improvement",
      status: "publicado",
      title: "Changelog publico simplificado",
      summary: "Se ajusta el changelog externo para enfocarlo en versiones y cambios visibles.",
      changes: "Listado por versiones.\nFiltros por modulo y tipo.\nSin indicadores internos en la vista publica.",
      technicalNotes: "No exponer notas internas en la salida externa.",
      owner: "equipo.uiux",
      modifiedBy: "admin.catalogo",
      modifiedAt: "05/05/2026 15:10"
    },
    {
      id: "entry-070",
      version: "v0.7.0",
      date: "2026-04-29",
      audience: "interno",
      module: "planeacion",
      type: "feature",
      status: "borrador",
      title: "Planeacion Aviso de Corte",
      summary: "Vista de monitoreo anual para semanas, cintas y notas operativas.",
      changes: "Gestion de semanas productivas.\nValidacion de calendario.\nMonitoreo anual de cintas.",
      technicalNotes: "Requiere validacion de reglas de generacion de 52 semanas y secuencia oficial.",
      owner: "equipo.planeacion",
      modifiedBy: "lider.ti",
      modifiedAt: "30/04/2026 09:15"
    }
  ];

  let audit = [
    { action: "Editar", detail: "v0.9.0 actualizado para incluir libreria UI.", user: "admin.catalogo", date: "05/05/2026 14:40" },
    { action: "Crear", detail: "v0.8.5 creado como changelog externo simplificado.", user: "admin.catalogo", date: "05/05/2026 15:10" },
    { action: "Crear", detail: "v0.7.0 creado como entrada interna de planeacion.", user: "lider.ti", date: "30/04/2026 09:15" }
  ];

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const normalize = (value) => String(value || "").trim().toLowerCase();

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function displayDate(date) {
    const [year, month, day] = String(date || "").split("-");
    return year && month && day ? `${day}/${month}/${year}` : date;
  }

  function nowAuditDate() {
    return "05/05/2026 16:00";
  }

  function rowTemplate(entry) {
    const search = normalize(`${entry.version} ${entry.title} ${moduleLabels[entry.module]} ${entry.summary} ${entry.owner}`);
    const removeDisabled = entry.status === "removido" ? "disabled" : "";
    return `
      <tr data-id="${entry.id}" data-audience="${entry.audience}" data-status="${entry.status}" data-search="${escapeHtml(search)}">
        <td><strong>${escapeHtml(entry.version)}</strong><br><span class="muted">${displayDate(entry.date)}</span></td>
        <td>${escapeHtml(entry.title)}</td>
        <td>${audienceLabels[entry.audience]}</td>
        <td>${moduleLabels[entry.module]}</td>
        <td><span class="status ${statusClasses[entry.status]}">${statusLabels[entry.status]}</span></td>
        <td><span class="muted">${escapeHtml(entry.modifiedBy)}<br>${escapeHtml(entry.modifiedAt)}</span></td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" type="button" data-action="edit" data-id="${entry.id}" aria-label="Editar ${escapeHtml(entry.version)}" title="Editar">
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
            </button>
            <button class="icon-btn" type="button" data-action="remove" data-id="${entry.id}" aria-label="Remover ${escapeHtml(entry.version)}" title="Remover" ${removeDisabled}>
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }

  function auditTemplate(item) {
    return `
      <article class="audit-item">
        <strong>${escapeHtml(item.action)}</strong>
        <p class="muted">${escapeHtml(item.detail)}</p>
        <span class="detail-label">${escapeHtml(item.user)} - ${escapeHtml(item.date)}</span>
      </article>
    `;
  }

  function renderRows() {
    const tbody = qs("#adminRows");
    if (!tbody) return;
    tbody.innerHTML = releases.map(rowTemplate).join("");
    applyFilters();
  }

  function renderAudit() {
    const list = qs("#adminAuditList");
    if (!list) return;
    list.innerHTML = audit.slice(0, 5).map(auditTemplate).join("");
  }

  function applyFilters() {
    const term = normalize(qs("#adminSearch")?.value);
    const audience = qs("#adminAudience")?.value || "all";
    const status = qs("#adminStatus")?.value || "all";
    let visible = 0;

    qsa("#adminRows tr").forEach((row) => {
      const show = (!term || row.dataset.search.includes(term)) &&
        (audience === "all" || row.dataset.audience === audience) &&
        (status === "all" || row.dataset.status === status);
      row.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });

    qs("#adminEmpty")?.classList.toggle("show", visible === 0);
    const count = qs("#adminCount");
    if (count) count.textContent = `${visible} entradas visibles`;
  }

  function openForm(entry) {
    const panel = qs("#releaseFormPanel");
    const form = qs("#releaseForm");
    if (!panel || !form) return;
    form.reset();
    qsa(".is-error", form).forEach((field) => field.classList.remove("is-error"));

    if (entry) {
      qs("#formTitle").textContent = `Editar ${entry.version}`;
      qs("#releaseId").value = entry.id;
      ["version", "date", "audience", "module", "type", "status", "title", "summary", "changes", "technicalNotes", "owner"].forEach((key) => {
        const control = qs(`#${key}`);
        if (control) control.value = entry[key] || "";
      });
    } else {
      qs("#formTitle").textContent = "Nueva entrada";
      qs("#releaseId").value = "";
      qs("#status").value = "borrador";
      qs("#audience").value = "interno";
      qs("#date").value = "2026-05-05";
    }

    panel.classList.remove("is-hidden");
    qs("#version")?.focus();
  }

  function closeForm() {
    qs("#releaseFormPanel")?.classList.add("is-hidden");
  }

  function clearForm() {
    const id = qs("#releaseId")?.value;
    qs("#releaseForm")?.reset();
    if (qs("#releaseId")) qs("#releaseId").value = id || "";
    qs("#version")?.focus();
  }

  function readForm() {
    return {
      id: qs("#releaseId")?.value || `entry-${Date.now()}`,
      version: qs("#version")?.value.trim(),
      date: qs("#date")?.value,
      audience: qs("#audience")?.value,
      module: qs("#module")?.value,
      type: qs("#type")?.value,
      status: qs("#status")?.value,
      title: qs("#title")?.value.trim(),
      summary: qs("#summary")?.value.trim(),
      changes: qs("#changes")?.value.trim(),
      technicalNotes: qs("#technicalNotes")?.value.trim(),
      owner: qs("#owner")?.value.trim(),
      modifiedBy: "admin.changelog",
      modifiedAt: nowAuditDate()
    };
  }

  function validateForm(form) {
    let valid = true;
    qsa("[required]", form).forEach((field) => {
      const empty = !String(field.value || "").trim();
      field.classList.toggle("is-error", empty);
      if (empty) valid = false;
    });
    if (!valid) form.reportValidity();
    return valid;
  }

  function saveEntry(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!validateForm(form)) return;

    const entry = readForm();
    const existingIndex = releases.findIndex((item) => item.id === entry.id);
    const action = existingIndex >= 0 ? "Editar" : "Crear";
    if (existingIndex >= 0) {
      releases[existingIndex] = entry;
    } else {
      releases = [entry, ...releases];
    }

    audit = [{
      action,
      detail: `${entry.version} - ${entry.title}`,
      user: entry.modifiedBy,
      date: entry.modifiedAt
    }, ...audit];

    renderRows();
    renderAudit();
    closeForm();
  }

  function removeEntry(id) {
    const entry = releases.find((item) => item.id === id);
    if (!entry || entry.status === "removido") return;
    entry.status = "removido";
    entry.modifiedBy = "admin.changelog";
    entry.modifiedAt = nowAuditDate();
    audit = [{
      action: "Remover",
      detail: `${entry.version} despublicado de las vistas de consulta.`,
      user: entry.modifiedBy,
      date: entry.modifiedAt
    }, ...audit];
    renderRows();
    renderAudit();
  }

  function initEvents() {
    ["#adminSearch", "#adminAudience", "#adminStatus"].forEach((selector) => {
      const control = qs(selector);
      if (!control) return;
      control.addEventListener(control.tagName === "INPUT" ? "input" : "change", applyFilters);
    });

    qs("#newRelease")?.addEventListener("click", () => openForm());
    qs("#cancelForm")?.addEventListener("click", closeForm);
    qs("#clearForm")?.addEventListener("click", clearForm);
    qs("#releaseForm")?.addEventListener("submit", saveEntry);

    qs("#adminRows")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      const entry = releases.find((item) => item.id === button.dataset.id);
      if (button.dataset.action === "edit") openForm(entry);
      if (button.dataset.action === "remove") removeEntry(button.dataset.id);
    });
  }

  function init() {
    renderRows();
    renderAudit();
    initEvents();
    window.SIALCore?.initThemeToggle?.();
  }

  return { init };
})();

SIALChangelogAdmin.init();
