(function () {
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const notices = [
    {
      id: "AC-2026-032", week: "SEM-2026-32", type: "Inicial", version: "Inicial",
      status: "Publicado", group: "published", farms: 3, pallets: 38, boxes: 2004,
      updated: "Hoy, 10:24", owner: "Laura Gómez", note: "Sin novedades pendientes.",
      history: ["Publicado hoy a las 10:24", "Validado hoy a las 10:18", "Creado ayer a las 16:42"]
    },
    {
      id: "BOR-2026-033-01", week: "SEM-2026-32", type: "Inicial", version: "Borrador",
      status: "Borrador incompleto", group: "draft", farms: 2, pallets: 20, boxes: 1040,
      updated: "Hoy, 08:42", owner: "Carlos Mejía", note: "Falta confirmar una referencia antes de validar.",
      history: ["Guardado hoy a las 08:42", "Loading Plan cargado hoy a las 08:36"]
    },
    {
      id: "AC-2026-031-02", week: "SEM-2026-31", type: "Proyectado", version: "Versión 2",
      status: "Publicado", group: "published", farms: 5, pallets: 86, boxes: 4572,
      updated: "Ayer, 16:20", owner: "Laura Gómez", note: "Versión proyectada distribuida sin novedades.",
      history: ["Publicado ayer a las 16:20", "Validado ayer a las 16:12"]
    },
    {
      id: "AC-2026-031-01", week: "SEM-2026-31", type: "Corrección", version: "Versión 2",
      status: "Requiere corrección", group: "attention", farms: 4, pallets: 64, boxes: 3456,
      updated: "Ayer, 14:05", owner: "Mónica Salas", note: "Una referencia quedó inactiva después de la publicación.",
      history: ["Bloqueo detectado ayer a las 14:05", "Publicado el 28/07/2026 a las 11:30"]
    },
    {
      id: "BOR-2026-032-02", week: "SEM-2026-32", type: "Proyectado", version: "Borrador",
      status: "Por conciliar", group: "attention", farms: 3, pallets: 31, boxes: 1674,
      updated: "28/07/2026, 15:48", owner: "Carlos Mejía", note: "El Loading Plan tiene 420 cajas pendientes por asignar.",
      history: ["Comparación actualizada el 28/07/2026", "Borrador creado el 28/07/2026"]
    },
    {
      id: "AC-2026-030-01", week: "SEM-2026-30", type: "Inicial", version: "Inicial",
      status: "Cerrado", group: "published", farms: 6, pallets: 102, boxes: 5508,
      updated: "24/07/2026, 17:10", owner: "Laura Gómez", note: "Semana cerrada. Consulta disponible para trazabilidad.",
      history: ["Semana cerrada el 24/07/2026", "Publicado el 20/07/2026"]
    }
  ];

  const esc = (value) => String(value ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  const number = (value) => Number(value || 0).toLocaleString("es-CO");
  const statusClass = (group, status) => {
    if (group === "attention") return "status-inactive";
    if (group === "draft") return "status-warning";
    return status === "Cerrado" ? "status-inactive" : "status-active";
  };

  function init() {
    const refs = {
      body: qs("[data-hub-body]"),
      search: qs("[data-hub-search]"),
      view: qs("[data-hub-view]"),
      week: qs("[data-hub-week]"),
      type: qs("[data-hub-type]"),
      clear: qs("[data-hub-clear]"),
      empty: qs("[data-hub-empty]"),
      resultCount: qs("[data-hub-result-count]"),
      backdrop: qs("[data-hub-backdrop]"),
      dialog: qs("[data-hub-detail]"),
      detailTitle: qs("[data-hub-detail-title]"),
      detailDescription: qs("[data-hub-detail-description]"),
      detailState: qs("[data-hub-detail-state]"),
      detailGrid: qs("[data-hub-detail-grid]"),
      detailNote: qs("[data-hub-detail-note]"),
      detailHistory: qs("[data-hub-detail-history]"),
      detailAction: qs("[data-hub-detail-action]")
    };
    if (!refs.body) return;

    let returnFocus = null;

    const actionFor = (item) => {
      if (item.group === "draft") return { label: "Continuar", mode: "editar" };
      if (item.group === "attention") return { label: "Revisar", mode: "corregir" };
      return { label: "Consultar", mode: "consultar" };
    };

    const filtered = () => {
      const term = refs.search.value.trim().toLowerCase();
      const activeView = refs.view.value;
      return notices.filter((item) => {
        const matchesView = activeView === "all"
          || (activeView === "draft" ? item.version === "Borrador" : item.group === activeView);
        const matchesWeek = refs.week.value === "all" || item.week === refs.week.value;
        const matchesType = refs.type.value === "all" || item.type === refs.type.value;
        const haystack = [item.id, item.week, item.owner, item.status, item.type].join(" ").toLowerCase();
        return matchesView && matchesWeek && matchesType && (!term || haystack.includes(term));
      });
    };

    const rowHtml = (item) => {
      const action = actionFor(item);
      const actionUrl = `crear-aviso-corte.html?modo=${encodeURIComponent(action.mode)}&aviso=${encodeURIComponent(item.id)}`;
      const editAction = action.mode === "consultar" ? "" : `
              <a class="icon-btn" href="${actionUrl}" aria-label="${esc(action.label)} ${esc(item.id)}" title="${esc(action.label)}">
                <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
              </a>`;
      return `
        <tr data-hub-row="${esc(item.id)}">
          <td>
            <button class="cut-hub-code" type="button" data-hub-detail-open="${esc(item.id)}">${esc(item.id)}</button>
            <span class="cut-hub-meta">${esc(item.owner)}</span>
          </td>
          <td><strong>${esc(item.week)}</strong></td>
          <td><strong>${esc(item.type)}</strong><span class="cut-hub-meta">${esc(item.version)}</span></td>
          <td>
            <div class="cut-hub-scope">
              <span><strong>${number(item.farms)}</strong> fincas</span>
              <span><strong>${number(item.pallets)}</strong> palés</span>
              <span><strong>${number(item.boxes)}</strong> cajas</span>
            </div>
          </td>
          <td><span class="status ${statusClass(item.group, item.status)}">${esc(item.status)}</span></td>
          <td><strong>${esc(item.updated)}</strong><span class="cut-hub-meta">${esc(item.note)}</span></td>
          <td>
            <div class="row-actions cut-hub-row-actions">
              <button class="icon-btn" type="button" data-hub-detail-open="${esc(item.id)}" aria-label="Ver detalle de ${esc(item.id)}" title="Ver detalle">
                <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
              ${editAction}
            </div>
          </td>
        </tr>`;
    };

    function render() {
      const visible = filtered();
      refs.body.innerHTML = visible.map(rowHtml).join("");
      refs.empty.classList.toggle("is-hidden", visible.length > 0);
      qs(".cut-hub-table-wrap").classList.toggle("is-hidden", visible.length === 0);
      refs.resultCount.textContent = `${visible.length} ${visible.length === 1 ? "aviso visible" : "avisos visibles"}`;
      refs.clear.classList.toggle("is-hidden", !refs.search.value && refs.view.value === "all" && refs.week.value === "all" && refs.type.value === "all");
      qsa("[data-hub-detail-open]", refs.body).forEach((button) => {
        button.addEventListener("click", () => openDetail(button.dataset.hubDetailOpen, button));
      });
    }

    function openDetail(id, trigger) {
      const item = notices.find((notice) => notice.id === id);
      if (!item) return;
      const action = actionFor(item);
      returnFocus = trigger;
      refs.detailTitle.textContent = item.id;
      refs.detailDescription.textContent = `${item.week} · ${item.type} · ${item.version}`;
      refs.detailState.className = `cut-hub-detail-state is-${item.group}`;
      refs.detailState.innerHTML = `<span class="status ${statusClass(item.group, item.status)}">${esc(item.status)}</span><p>${esc(item.note)}</p>`;
      refs.detailGrid.innerHTML = [
        ["Fincas", number(item.farms)], ["Palés", number(item.pallets)], ["Cajas", number(item.boxes)],
        ["Responsable", item.owner], ["Actualizado", item.updated], ["Tipo", item.type]
      ].map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join("");
      refs.detailNote.innerHTML = item.group === "published"
        ? `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M3 12h18"></path></svg><span>Esta versión es de consulta. Cualquier cambio debe generar una nueva versión.</span>`
        : `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg><span>El aviso puede abrirse para completar o corregir la información pendiente.</span>`;
      refs.detailHistory.innerHTML = item.history.map((entry) => `<p><span></span>${esc(entry)}</p>`).join("");
      refs.detailAction.textContent = action.mode === "editar" ? "Continuar borrador" : action.mode === "corregir" ? "Preparar corrección" : "Consultar aviso";
      refs.detailAction.href = `crear-aviso-corte.html?modo=${encodeURIComponent(action.mode)}&aviso=${encodeURIComponent(item.id)}`;
      refs.backdrop.hidden = false;
      refs.dialog.hidden = false;
      document.body.classList.add("modal-open");
      qs("[data-hub-close]", refs.dialog)?.focus();
    }

    function closeDetail() {
      if (refs.dialog.hidden) return;
      refs.backdrop.hidden = true;
      refs.dialog.hidden = true;
      document.body.classList.remove("modal-open");
      returnFocus?.focus();
    }

    function clearFilters() {
      refs.search.value = "";
      refs.view.value = "all";
      refs.week.value = "all";
      refs.type.value = "all";
      render();
    }

    [refs.search, refs.view, refs.week, refs.type].forEach((control) => control.addEventListener("input", render));
    refs.clear.addEventListener("click", clearFilters);
    qs("[data-hub-empty-clear]")?.addEventListener("click", clearFilters);
    qsa("[data-hub-close]").forEach((button) => button.addEventListener("click", closeDetail));
    refs.backdrop.addEventListener("click", closeDetail);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDetail();
    });

    render();
  }

  window.SIALCutNoticeList = { init };
})();
