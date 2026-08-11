const SIALPalletTrace = (() => {
  const qs = (selector, root = document) => root.querySelector(selector);
  const esc = (value) => window.SIALCore?.escapeHtml ? window.SIALCore.escapeHtml(value ?? "") : String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
  const params = new URLSearchParams(location.search);
  const eyeIcon = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
  const closeIcon = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m18 6-12 12"></path><path d="m6 6 12 12"></path></svg>';

  const records = [
    {
      sscc: "177012345678900073", farm: "La Bacota", farmCode: "0435", week: "SEM-2026-32", reference: "BAN-REF-001", type: "Completo", boxes: 48,
      status: "Cargado en contenedor", statusKey: "loaded", location: "Contenedor SIALU1234567", container: "SIALU1234567", operation: "EXP-2026-0418", dispatch: "DSP-2026-0832", updated: "Hoy, 10:24", next: "Cerrar el contenedor",
      events: [
        ["03/08/2026", "05:42", "Pallet creado", "Finca La Bacota · Línea 2 · operador.finca", "Etiqueta SSCC"],
        ["03/08/2026", "06:18", "Control de calidad aprobado", "Finca La Bacota · calidad.finca", "Registro de calidad"],
        ["03/08/2026", "07:06", "Despachado a ZE", "Portería La Bacota · vehículo TUL458", "Despacho DSP-2026-0832"],
        ["03/08/2026", "09:31", "Recibido en ZE", "ZE Puerto Norte · auxiliar.puerto", "Recepción confirmada"],
        ["03/08/2026", "10:24", "Cargado en contenedor", "Posición P-08 · SIALU1234567", "Lectura SSCC"]
      ]
    },
    {
      sscc: "177012345678900066", farm: "Santa Isabel", farmCode: "0527", week: "SEM-2026-32", reference: "BAN-REF-001", type: "Completo", boxes: 48,
      status: "Recibido en ZE", statusKey: "ze", location: "ZE Puerto Norte", container: "Pendiente de asignación", operation: "EXP-2026-0418", dispatch: "DSP-2026-0836", updated: "Hoy, 09:48", next: "Asignar a un contenedor",
      events: [
        ["03/08/2026", "05:58", "Pallet creado", "Finca Santa Isabel · Línea 1", "Etiqueta SSCC"],
        ["03/08/2026", "06:34", "Control de calidad aprobado", "Finca Santa Isabel · calidad.finca", "Registro de calidad"],
        ["03/08/2026", "07:42", "Despachado a ZE", "Portería Santa Isabel · vehículo CAM102", "Despacho DSP-2026-0836"],
        ["03/08/2026", "09:48", "Recibido en ZE", "ZE Puerto Norte · auxiliar.puerto", "Recepción confirmada"]
      ]
    },
    {
      sscc: "177012345678900059", farm: "El Retiro", farmCode: "0612", week: "SEM-2026-32", reference: "BAN-REF-004", type: "Completo", boxes: 54,
      status: "En tránsito a ZE", statusKey: "transit", location: "Ruta finca–ZE", container: "Sin asignar", operation: "EXP-2026-0421", dispatch: "DSP-2026-0840", updated: "Hoy, 08:16", next: "Confirmar recepción en ZE",
      events: [
        ["03/08/2026", "05:30", "Pallet creado", "Finca El Retiro · Línea 3", "Etiqueta SSCC"],
        ["03/08/2026", "06:11", "Control de calidad aprobado", "Finca El Retiro · calidad.finca", "Registro de calidad"],
        ["03/08/2026", "08:16", "Despachado a ZE", "Portería El Retiro · vehículo TRK771", "Despacho DSP-2026-0840"]
      ]
    },
    {
      sscc: "177012345678900042", farm: "Las Palmas", farmCode: "0774", week: "SEM-2026-32", reference: "BAN-REF-011", type: "Mocho", boxes: 14,
      status: "En finca", statusKey: "farm", location: "Finca Las Palmas", container: "No aplica", operation: "EXP-2026-0421", dispatch: "Pendiente", updated: "Hoy, 07:35", next: "Completar o consolidar el pallet",
      events: [["03/08/2026", "07:35", "Pallet parcial creado", "Finca Las Palmas · Línea 1", "14 cajas registradas"]]
    },
    {
      sscc: "177012345678900026", farm: "La Bacota", farmCode: "0435", week: "SEM-2026-31", reference: "BAN-REF-001", type: "Completo", boxes: 48,
      status: "Exportado", statusKey: "exported", location: "Terminal marítima", container: "MSCU1234567", operation: "EXP-2026-0398", dispatch: "DSP-2026-0792", updated: "01/08/2026, 18:40", next: "Ciclo completado",
      events: [
        ["31/07/2026", "05:14", "Pallet creado", "Finca La Bacota · Línea 2", "Etiqueta SSCC"],
        ["31/07/2026", "08:02", "Despachado a ZE", "Vehículo TUL458", "Despacho DSP-2026-0792"],
        ["31/07/2026", "10:22", "Recibido en ZE", "ZE Puerto Norte", "Recepción confirmada"],
        ["31/07/2026", "12:06", "Cargado en contenedor", "Posición P-04 · MSCU1234567", "Lectura SSCC"],
        ["01/08/2026", "18:40", "Exportado", "Terminal marítima · viaje VIAJE-7710", "Cierre de operación"]
      ]
    },
    {
      sscc: "177012345678900019", farm: "Santa Isabel", farmCode: "0527", week: "SEM-2026-31", reference: "BAN-REF-014", type: "Completo", boxes: 48,
      status: "Con novedad", statusKey: "warning", location: "ZE Puerto Norte", container: "Bloqueado", operation: "EXP-2026-0398", dispatch: "DSP-2026-0797", updated: "01/08/2026, 11:12", next: "Resolver la novedad de etiqueta",
      events: [
        ["01/08/2026", "06:20", "Pallet creado", "Finca Santa Isabel · Línea 1", "Etiqueta SSCC"],
        ["01/08/2026", "08:10", "Despachado a ZE", "Vehículo CAM102", "Despacho DSP-2026-0797"],
        ["01/08/2026", "10:46", "Recibido en ZE", "ZE Puerto Norte", "Recepción confirmada"],
        ["01/08/2026", "11:12", "Novedad de etiqueta", "SSCC ilegible durante validación", "Revisión pendiente", "warning"]
      ]
    }
  ];

  const requestedFarm = params.get("finca") || "all";
  const state = { farm: requestedFarm, search: "", status: "all", week: "all", page: 1, pageSize: 10, selected: null, selectedEvent: null };

  function eventPhase(event) {
    const name = String(event?.[2] || "").toLowerCase();
    if (name.includes("creado") || name.includes("calidad")) return "Finca";
    if (name.includes("despachado")) return "Transporte";
    if (name.includes("recibido") || name.includes("novedad")) return "Zona externa";
    if (name.includes("contenedor")) return "Contenedor";
    if (name.includes("exportado")) return "Puerto";
    return "Operación";
  }

  function eventState(event, index, total) {
    if (event?.[5] === "warning") return { key: "warning", label: "Requiere atención" };
    if (index === total - 1) return { key: "current", label: "Estado actual" };
    return { key: "complete", label: "Completado" };
  }

  function eventDetailMarkup(record, index) {
    const event = record.events[index] || record.events[record.events.length - 1];
    if (!event) return "";
    const position = record.events.indexOf(event);
    const status = eventState(event, position, record.events.length);
    return `
      <div class="trace-event-detail-head">
        <div><span class="trace-event-kicker">${esc(eventPhase(event))} · Evento ${position + 1} de ${record.events.length}</span><h4>${esc(event[2])}</h4></div>
        <span class="trace-node-state trace-node-state-${status.key}">${esc(status.label)}</span>
      </div>
      <dl class="trace-event-detail-list">
        <div><dt>Fecha y hora</dt><dd>${esc(event[0])}, ${esc(event[1])}</dd></div>
        <div><dt>Lugar y responsable</dt><dd>${esc(event[3])}</dd></div>
        <div><dt>Registro asociado</dt><dd>${esc(event[4])}</dd></div>
      </dl>`;
  }

  function renderEventSelection(record, index) {
    const detail = qs("[data-trace-detail]");
    if (!detail || !record.events[index]) return;
    state.selectedEvent = index;
    detail.querySelectorAll("[data-trace-event]").forEach((node) => {
      const selected = Number(node.dataset.traceEvent) === index;
      node.classList.toggle("is-selected", selected);
      node.setAttribute("aria-pressed", String(selected));
    });
    const panel = qs("[data-trace-event-detail]", detail);
    if (panel) panel.innerHTML = eventDetailMarkup(record, index);
  }

  function statusChip(record) {
    const statusClass = record.statusKey === "exported" ? "status-active" : record.statusKey === "warning" ? "status-warning" : record.statusKey === "farm" ? "status-neutral" : "status-info";
    return `<span class="status ${statusClass}">${esc(record.status)}</span>`;
  }

  function filteredRecords() {
    const term = state.search.trim().toLowerCase();
    return records.filter((record) => {
      const farmMatch = state.farm === "all" || record.farmCode === state.farm;
      const statusMatch = state.status === "all" || record.statusKey === state.status;
      const weekMatch = state.week === "all" || record.week === state.week;
      const searchMatch = !term || [record.sscc, record.farm, record.reference, record.container, record.operation, record.dispatch].join(" ").toLowerCase().includes(term);
      return farmMatch && statusMatch && weekMatch && searchMatch;
    });
  }

  function renderPagination(total) {
    const pagination = qs("[data-trace-pagination]");
    if (!pagination) return;
    const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
    state.page = Math.min(Math.max(state.page, 1), totalPages);
    const start = total ? ((state.page - 1) * state.pageSize) + 1 : 0;
    const end = Math.min(state.page * state.pageSize, total);
    pagination.innerHTML = `
      <div class="pagination-summary" aria-live="polite">Mostrando ${start}-${end} de ${total} registros</div>
      <label class="pagination-size"><span>Registros por página</span><select class="select" data-trace-page-size aria-label="Registros por página"><option value="10" ${state.pageSize === 10 ? "selected" : ""}>10</option><option value="30" ${state.pageSize === 30 ? "selected" : ""}>30</option><option value="50" ${state.pageSize === 50 ? "selected" : ""}>50</option></select></label>
      <div class="pagination-pages" aria-label="Cambiar página">
        <button class="pagination-btn" type="button" data-trace-page="${state.page - 1}" ${state.page <= 1 ? "disabled" : ""}>Anterior</button>
        <button class="pagination-btn active" type="button" aria-current="page">${state.page}</button>
        <button class="pagination-btn" type="button" data-trace-page="${state.page + 1}" ${state.page >= totalPages ? "disabled" : ""}>Siguiente</button>
      </div>`;
  }

  function renderRows() {
    const body = qs("[data-trace-rows]");
    const emptyBody = qs("[data-trace-empty-body]");
    const count = qs("#traceCount");
    if (!body) return;
    const filtered = filteredRecords();
    const start = (state.page - 1) * state.pageSize;
    const pageRecords = filtered.slice(start, start + state.pageSize);
    body.innerHTML = pageRecords.map((record) => `
      <tr data-trace-sscc="${esc(record.sscc)}" class="${state.selected === record.sscc ? "trace-row-selected" : ""}">
        <td><div class="trace-primary-cell"><strong class="trace-sscc">${esc(record.sscc)}</strong><span>${esc(record.reference)}</span></div></td>
        <td><div class="trace-primary-cell"><strong>${esc(record.farm)}</strong><span>${esc(record.week)}</span></div></td>
        <td><div class="trace-primary-cell"><strong>${esc(record.type)}</strong><span>${esc(record.boxes)} cajas</span></div></td>
        <td>${esc(record.location)}</td>
        <td>${statusChip(record)}</td>
        <td>${esc(record.updated)}</td>
        <td><div class="row-actions"><button class="icon-btn" type="button" data-consult-trace="${esc(record.sscc)}" aria-label="Consultar trazabilidad del pallet ${esc(record.sscc)}" title="Consultar trazabilidad">${eyeIcon}</button></div></td>
      </tr>`).join("");
    if (emptyBody) emptyBody.hidden = filtered.length !== 0;
    if (count) count.textContent = `${filtered.length} ${filtered.length === 1 ? "registro visible" : "registros visibles"}`;
    renderPagination(filtered.length);
  }

  function renderDetail(sscc) {
    const detail = qs("[data-trace-detail]");
    const record = records.find((item) => item.sscc === sscc);
    if (!detail || !record) return;
    state.selected = sscc;
    state.selectedEvent = Math.max(0, record.events.length - 1);
    renderRows();
    const warningMessage = record.statusKey === "warning" ? '<div class="notice notice-warning trace-detail-message" role="status"><span><strong>Este pallet no puede continuar.</strong><br />Resuelve la novedad de etiqueta antes de asignarlo o cargarlo.</span></div>' : "";
    detail.hidden = false;
    detail.innerHTML = `
      <div class="card-header">
        <div><h2 class="card-title">Trazabilidad del pallet</h2><p class="card-subtitle"><span class="trace-sscc">${esc(record.sscc)}</span> · ${esc(record.reference)} · ${esc(record.farm)} · ${esc(record.week)}</p></div>
        <div class="card-actions">${statusChip(record)}<button class="icon-btn" type="button" data-close-trace aria-label="Cerrar trazabilidad" title="Cerrar trazabilidad">${closeIcon}</button></div>
      </div>
      <div class="card-body">
        <dl class="trace-summary">
          <div><dt>Ubicación actual</dt><dd>${esc(record.location)}</dd></div>
          <div><dt>Operación</dt><dd>${esc(record.operation)}</dd></div>
          <div><dt>Despacho</dt><dd>${esc(record.dispatch)}</dd></div>
          <div><dt>Contenedor</dt><dd>${esc(record.container)}</dd></div>
          <div><dt>Siguiente paso</dt><dd>${esc(record.next)}</dd></div>
        </dl>
        ${warningMessage}
        <div class="trace-events-heading"><div><h3 class="section-title">Árbol de trazabilidad del pallet</h3><p>Selecciona un evento para consultar su registro y contexto.</p></div><span>${record.events.length} ${record.events.length === 1 ? "evento" : "eventos"}</span></div>
        <div class="trace-tree-layout">
          <section class="trace-tree-panel" aria-label="Recorrido del pallet">
            <div class="trace-tree-root"><span>PALLET</span><strong>${esc(record.sscc)}</strong><small>${esc(record.farm)} · ${esc(record.reference)}</small></div>
            <ol class="trace-tree" aria-label="Eventos de trazabilidad">
              ${record.events.map((event, index) => {
                const status = eventState(event, index, record.events.length);
                const selected = index === state.selectedEvent;
                return `<li class="trace-tree-item trace-tree-item-${status.key}"><button class="trace-tree-node ${selected ? "is-selected" : ""}" type="button" data-trace-event="${index}" aria-pressed="${selected}" aria-label="${esc(eventPhase(event))}: ${esc(event[2])}, ${esc(status.label)}"><span class="trace-tree-index">${index + 1}</span><span class="trace-tree-copy"><small>${esc(eventPhase(event))}</small><strong>${esc(event[2])}</strong><span>${esc(event[0])} · ${esc(event[1])}</span></span><span class="trace-node-state trace-node-state-${status.key}">${esc(status.label)}</span></button></li>`;
              }).join("")}
            </ol>
          </section>
          <aside class="trace-event-detail" data-trace-event-detail tabindex="-1" aria-label="Detalle del evento seleccionado" aria-live="polite">${eventDetailMarkup(record, state.selectedEvent)}</aside>
        </div>
      </div>`;
    qs("[data-close-trace]", detail)?.focus({ preventScroll: true });
    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    detail.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }

  function closeDetail(restoreFocus = true) {
    const detail = qs("[data-trace-detail]");
    const selected = state.selected;
    state.selected = null;
    state.selectedEvent = null;
    if (detail) { detail.hidden = true; detail.innerHTML = ""; }
    renderRows();
    if (restoreFocus && selected) qs(`[data-consult-trace="${selected}"]`)?.focus({ preventScroll: true });
  }

  function syncFarmQuery() {
    const nextParams = new URLSearchParams(location.search);
    nextParams.delete("vista");
    if (state.farm === "all") nextParams.delete("finca"); else nextParams.set("finca", state.farm);
    history.replaceState(null, "", `${location.pathname}${nextParams.toString() ? `?${nextParams}` : ""}`);
  }

  function denied() {
    const root = qs("[data-pallet-trace-root]");
    if (!root) return;
    root.innerHTML = '<p class="page-eyebrow">Operaciones puerto / Pallets</p><div class="page-header"><div><h1 class="page-title">Trazabilidad de pallets</h1><p class="page-subtitle">Consulta restringida a las fincas y operaciones autorizadas.</p></div></div><div class="notice notice-error" role="alert"><span><strong>Información no disponible</strong><br />No existen pallets visibles dentro de tu alcance.</span></div><a class="btn btn-secondary" href="index.html">Volver a Puerto</a>';
  }

  function resetAndRender() {
    state.page = 1;
    closeDetail(false);
  }

  function init() {
    SIAL.applyShell("trazabilidadPallets");
    if (params.get("access") === "denied") { denied(); return; }
    const farmSelect = qs("#traceFarm");
    const farms = [...new Map(records.map((record) => [record.farmCode, record.farm])).entries()];
    farmSelect?.insertAdjacentHTML("beforeend", farms.map(([code, name]) => `<option value="${esc(code)}">${esc(name)}</option>`).join(""));
    if (farms.some(([code]) => code === state.farm)) farmSelect.value = state.farm; else state.farm = "all";
    renderRows();

    qs("#traceSearch")?.addEventListener("input", (event) => { state.search = event.target.value; resetAndRender(); });
    farmSelect?.addEventListener("change", (event) => { state.farm = event.target.value; syncFarmQuery(); resetAndRender(); });
    qs("#traceStatus")?.addEventListener("change", (event) => { state.status = event.target.value; resetAndRender(); });
    qs("#traceWeek")?.addEventListener("change", (event) => { state.week = event.target.value; resetAndRender(); });
    qs("[data-trace-rows]")?.addEventListener("click", (event) => { const button = event.target.closest("[data-consult-trace]"); if (button) renderDetail(button.dataset.consultTrace); });
    qs("[data-trace-detail]")?.addEventListener("click", (event) => {
      if (event.target.closest("[data-close-trace]")) { closeDetail(); return; }
      const node = event.target.closest("[data-trace-event]");
      if (!node || !state.selected) return;
      const record = records.find((item) => item.sscc === state.selected);
      if (record) renderEventSelection(record, Number(node.dataset.traceEvent));
    });
    qs("[data-trace-pagination]")?.addEventListener("click", (event) => { const button = event.target.closest("[data-trace-page]"); if (!button || button.disabled) return; state.page = Number(button.dataset.tracePage); closeDetail(false); });
    qs("[data-trace-pagination]")?.addEventListener("change", (event) => { if (!event.target.matches("[data-trace-page-size]")) return; state.pageSize = Number(event.target.value); state.page = 1; closeDetail(false); });
  }

  return { init };
})();

SIALPalletTrace.init();