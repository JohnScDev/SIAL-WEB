const SIALAdditionalOrders = (() => {
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => SIALCore.escapeHtml(value ?? "");
  const format = (value) => new Intl.NumberFormat("es-CO").format(value);
  const params = new URLSearchParams(location.search);
  const baseOrder = { id: "PED-SUG-2026-32-014", notice: "AC-2026-032", farm: "La Ceiba", farmCode: "FIN-014", reference: "AGSTDRA", week: "SEM-2026-32", status: "Validado" };
  const saveKey = `sial-hu666-additional:${baseOrder.id}`;
  const draftKey = `sial-hu666-draft:${baseOrder.id}`;
  const icon = (path) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
  const icons = {
    add: '<path d="M12 5v14M5 12h14"></path>',
    arrow: '<path d="m15 18-6-6 6-6"></path>',
    check: '<path d="m20 6-11 11-5-5"></path>',
    alert: '<path d="M12 3 2 21h20L12 3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path><circle cx="12" cy="12" r="3"></circle>',
    trash: '<path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v5M14 11v5"></path>'
  };

  const materials = [
    { code: "MAT-CAR-001", name: "Caja de cartón corrugado", unit: "unidades", base: 790, stock: 1280 },
    { code: "MAT-TAP-001", name: "Tapa de cartón", unit: "unidades", base: 925, stock: 900 },
    { code: "MAT-ETQ-001", name: "Etiqueta de trazabilidad", unit: "rollos", base: 25, stock: 12 },
    { code: "MAT-EST-001", name: "Estiba de exportación", unit: "unidades", base: 28, stock: 12 }
  ];

  const seedRequests = [
    { id: "PAD-2026-32-002", base: baseOrder.id, notice: baseOrder.notice, farm: "La Ceiba", week: "SEM-2026-32", sequence: 2, lines: 2, quantity: "160 unidades", reason: "Incremento extraordinario del corte", status: "Pendiente de validación", updated: "Hoy, 10:42", document: "Pendiente de clasificación" },
    { id: "PAD-2026-32-001", base: baseOrder.id, notice: baseOrder.notice, farm: "La Ceiba", week: "SEM-2026-32", sequence: 1, lines: 1, quantity: "80 unidades", reason: "Diferencia de inventario", status: "Aprobado", updated: "Ayer, 16:10", document: "Remisión pendiente" },
    { id: "PAD-2026-31-004", base: "PED-SUG-2026-31-009", notice: "AC-2026-031", farm: "Vijagual", week: "SEM-2026-31", sequence: 4, lines: 2, quantity: "240 unidades", reason: "Entrega incompleta del proveedor", status: "En preparación", updated: "01/08/2026, 11:25", document: "REM-2026-0192" },
    { id: "PAD-2026-31-003", base: "PED-SUG-2026-31-006", notice: "AC-2026-031", farm: "Marte", week: "SEM-2026-31", sequence: 3, lines: 1, quantity: "40 unidades", reason: "Cambio operativo", status: "Entregado", updated: "31/07/2026, 17:40", document: "RPT-2026-0894" }
  ];

  const model = { lines: [{ material: materials[0].code, quantity: 0 }], reason: "", observation: "" };

  function savedRequest() {
    try { return JSON.parse(localStorage.getItem(saveKey)); } catch { return null; }
  }

  function requests() {
    const saved = savedRequest();
    return saved ? [saved, ...seedRequests.filter((item) => item.id !== saved.id)] : seedRequests;
  }

  function statusChip(value) {
    const key = String(value).toLowerCase();
    const cls = key.includes("entregado") || key === "aprobado" ? "status-active" : key.includes("rechaz") ? "status-inactive" : "status-warning";
    return `<span class="status ${cls}">${esc(value)}</span>`;
  }

  function header(title, subtitle, action = "") {
    return `<p class="page-eyebrow">Materiales / Pedidos adicionales</p><div class="page-header additional-page-header"><div><h1 class="page-title">${esc(title)}</h1><p class="page-subtitle">${esc(subtitle)}</p></div>${action}</div>`;
  }

  function deniedView() {
    return `${header("Pedidos adicionales", "Consulta restringida al alcance de tu usuario.")}<div class="notice notice-error additional-denied" role="alert"><div><strong>Información no disponible</strong><span>No existen pedidos visibles dentro de tu compañía y fincas autorizadas.</span></div></div><a class="btn btn-secondary mt-24" href="gestion-pedidos-materiales.html">Volver a Pedidos</a>`;
  }

  function listView() {
    return `
      ${header("Pedidos adicionales", "Consulta solicitudes excepcionales sin perder su relación con el pedido semanal.")}
      <article class="card additional-list-card">
        <div class="card-header">
          <div><h2 class="card-title">Gestión de solicitudes</h2><p class="card-subtitle">Cada adicional conserva el pedido base, su motivo y el estado del procesamiento.</p></div>
          <a class="btn btn-primary" href="pedidos-adicionales.html?nuevo=1&base=${esc(baseOrder.id)}">${icon(icons.add)} Nuevo pedido adicional</a>
        </div>
        <div class="additional-filter-bar">
          <label class="search additional-search">${icon('<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path>')}<input id="additionalSearch" aria-label="Buscar pedidos adicionales" placeholder="Buscar pedido, finca, aviso o motivo" /></label>
          <select class="select" id="additionalStatus" aria-label="Filtrar por estado"><option value="">Todos los estados</option><option>Pendiente de validación</option><option>Aprobado</option><option>En preparación</option><option>Entregado</option></select>
        </div>
        <div class="table-wrap"><table class="materials-table additional-list-table"><thead><tr><th>Pedido adicional</th><th>Origen</th><th>Solicitud</th><th>Motivo</th><th>Documento</th><th>Estado</th><th>Última actualización</th><th>Acciones</th></tr></thead><tbody data-additional-list></tbody></table></div>
        <div class="empty-state" data-additional-empty hidden><h3>Sin resultados</h3><p>Ajusta la búsqueda o el estado para consultar otras solicitudes.</p></div>
      </article>
      <div class="notice notice-info additional-scope-note" role="note"><div><strong>Continuidad del flujo</strong><span>La clasificación en RPT, remisión o reserva ocurre después de validar el pedido y pertenece a la HU667.</span></div></div>
    `;
  }

  function renderList() {
    const body = qs("[data-additional-list]");
    if (!body) return;
    const term = (qs("#additionalSearch")?.value || "").trim().toLowerCase();
    const selected = qs("#additionalStatus")?.value || "";
    const visible = requests().filter((item) => {
      const haystack = [item.id, item.base, item.notice, item.farm, item.reason].join(" ").toLowerCase();
      return (!term || haystack.includes(term)) && (!selected || item.status === selected);
    });
    body.innerHTML = visible.map((item) => `<tr>
      <td><div class="materials-record-main"><strong>${esc(item.id)}</strong><span>Adicional ${esc(item.sequence)} de ${esc(item.week)}</span></div></td>
      <td><div class="materials-record-main"><strong>${esc(item.base)}</strong><span>${esc(item.notice)} · ${esc(item.farm)}</span></div></td>
      <td><strong>${esc(item.lines)} ${item.lines === 1 ? "material" : "materiales"}</strong><br><span class="muted">${esc(item.quantity)}</span></td>
      <td>${esc(item.reason)}</td><td>${esc(item.document)}</td><td>${statusChip(item.status)}</td><td>${esc(item.updated)}</td>
      <td><a class="btn btn-secondary btn-small" href="pedidos-adicionales.html?pedido=${encodeURIComponent(item.id)}">${icon(icons.eye)} Consultar</a></td>
    </tr>`).join("");
    qs("[data-additional-empty]").hidden = visible.length > 0;
  }

  function sourceChain() {
    return `<div class="additional-chain" aria-label="Cadena de origen del pedido"><div><span>Aviso de corte</span><strong>${esc(baseOrder.notice)}</strong></div><i aria-hidden="true">→</i><div><span>Pedido base</span><strong>${esc(baseOrder.id)}</strong></div><i aria-hidden="true">→</i><div class="is-current"><span>Nueva solicitud</span><strong>Adicional 3 · ${esc(baseOrder.week)}</strong></div></div>`;
  }

  function materialOptions(selected, index) {
    return materials.map((item) => `<option value="${esc(item.code)}" ${item.code === selected ? "selected" : ""}>${esc(item.name)}</option>`).join("");
  }

  function lineResult(line) {
    const material = materials.find((item) => item.code === line.material);
    const quantity = Number(line.quantity);
    if (!material || !Number.isInteger(quantity) || quantity <= 0) return { type: "blocked", title: "Cantidad requerida", text: "Ingresa un entero mayor que cero." };
    if (quantity > material.stock) return { type: "warning", title: "Stock insuficiente", text: `Faltan ${format(quantity - material.stock)} ${material.unit}; requiere validación de abastecimiento.` };
    return { type: "ok", title: "Stock disponible", text: `Quedarían ${format(material.stock - quantity)} ${material.unit} visibles.` };
  }

  function resultMarkup(result) {
    const cls = result.type === "ok" ? "status-active" : result.type === "warning" ? "status-warning" : "status-inactive";
    return `<span class="status ${cls}">${esc(result.title)}</span><small>${esc(result.text)}</small>`;
  }

  function createView() {
    if (params.get("base") && params.get("base") !== baseOrder.id) return `${header("Nuevo pedido adicional", "La solicitud debe partir de un pedido válido.")}<div class="notice notice-error" role="alert"><div><strong>Pedido base no disponible</strong><span>No existe información para mostrar dentro de tu alcance autorizado.</span></div></div><a class="btn btn-secondary mt-24" href="pedidos-adicionales.html">Volver a la bandeja</a>`;
    loadDraft();
    return `
      <a class="additional-back" href="pedidos-adicionales.html">${icon(icons.arrow)} Volver a pedidos adicionales</a>
      ${header("Nuevo pedido adicional", "Registra solo la necesidad que no quedó cubierta por el pedido semanal.")}
      <div class="notice notice-info additional-create-note" role="note"><div><strong>Solicitud vinculada al corte actual</strong><span>Ya existe 1 pedido adicional esta semana. La frecuencia se muestra para revisión, pero la HU no define un máximo automático.</span></div></div>
      <form class="card additional-create-card" data-additional-form novalidate>
        ${sourceChain()}
        <div class="additional-context"><div><span>Finca</span><strong>${esc(baseOrder.farm)}</strong></div><div><span>Referencia</span><strong>${esc(baseOrder.reference)}</strong></div><div><span>Pedido base</span><strong>${esc(baseOrder.status)}</strong></div><div><span>Responsable</span><strong>QA Materiales · Web</strong></div></div>
        <div class="card-header additional-lines-head"><div><h2 class="card-title">Materiales adicionales</h2><p class="card-subtitle">La cantidad se contrasta con el stock visible; los faltantes no se aprueban automáticamente.</p></div><button class="btn btn-secondary" type="button" data-add-line ${model.lines.length >= materials.length ? "disabled" : ""}>${icon(icons.add)} Agregar material</button></div>
        <div class="table-wrap"><table class="materials-table additional-lines-table"><thead><tr><th>Material</th><th>Pedido base</th><th>Stock visible</th><th>Cantidad adicional</th><th>Validación</th><th></th></tr></thead><tbody data-additional-lines></tbody></table></div>
        <div class="additional-reason-grid">
          <div><h2 class="card-title">Motivo de la solicitud</h2><p class="card-subtitle">Explica por qué la necesidad no quedó cubierta en el pedido base.</p></div>
          <div class="field"><label class="label" for="additionalReason">Motivo</label><select class="select" id="additionalReason" required><option value="">Seleccionar motivo</option><option value="incremento-corte">Incremento extraordinario del corte</option><option value="inventario">Diferencia de inventario</option><option value="entrega-incompleta">Entrega incompleta del proveedor</option><option value="dano">Material dañado o no utilizable</option><option value="otro">Otra necesidad operativa</option></select><span class="field-error" data-reason-error hidden>Selecciona el motivo de la solicitud.</span></div>
          <div class="field"><label class="label" for="additionalObservation">Detalle <span class="adjust-optional">(opcional)</span></label><textarea class="input additional-textarea" id="additionalObservation" rows="3" placeholder="Agrega información útil para la validación."></textarea></div>
        </div>
        <div class="additional-review"><div data-additional-summary aria-live="polite"></div><div class="card-actions"><button class="btn btn-secondary" type="button" data-save-draft>Guardar borrador</button><button class="btn btn-primary" type="submit" data-submit-additional>Enviar a validación</button></div></div>
      </form>
      <div class="notice notice-success material-runtime-alert" data-additional-feedback hidden><span data-additional-feedback-message></span></div>
    `;
  }

  function loadDraft() {
    try {
      const draft = JSON.parse(localStorage.getItem(draftKey));
      if (!draft) return;
      if (Array.isArray(draft.lines) && draft.lines.length) model.lines = draft.lines;
      model.reason = draft.reason || "";
      model.observation = draft.observation || "";
    } catch { localStorage.removeItem(draftKey); }
  }

  function renderLines() {
    const body = qs("[data-additional-lines]");
    if (!body) return;
    body.innerHTML = model.lines.map((line, index) => {
      const material = materials.find((item) => item.code === line.material) || materials[0];
      return `<tr><td><label class="label additional-cell-label" for="lineMaterial${index}">Material</label><select class="select" id="lineMaterial${index}" data-line-material="${index}">${materialOptions(line.material, index)}</select><small>${esc(material.code)} · ${esc(material.unit)}</small></td><td class="additional-number"><strong>${format(material.base)}</strong><span>${esc(material.unit)}</span></td><td class="additional-number"><strong>${format(material.stock)}</strong><span>${esc(material.unit)}</span></td><td><input class="input additional-quantity" aria-label="Cantidad adicional de ${esc(material.name)}" type="number" min="1" step="1" inputmode="numeric" value="${line.quantity || ""}" data-line-quantity="${index}" /></td><td class="additional-line-result">${resultMarkup(lineResult(line))}</td><td><button class="icon-btn additional-remove" type="button" aria-label="Quitar ${esc(material.name)}" data-remove-line="${index}" ${model.lines.length === 1 ? "disabled" : ""}>${icon(icons.trash)}</button></td></tr>`;
    }).join("");
  }

  function formState() {
    const results = model.lines.map(lineResult);
    const blocked = results.filter((item) => item.type === "blocked").length;
    const shortages = results.filter((item) => item.type === "warning").length;
    return { blocked, shortages, valid: !blocked && Boolean(model.reason) };
  }

  function renderCreateState() {
    renderLines();
    const state = formState();
    const summary = qs("[data-additional-summary]");
    const submit = qs("[data-submit-additional]");
    const error = qs("[data-reason-error]");
    if (!summary || !submit) return;
    error.hidden = Boolean(model.reason) || model.lines.every((line) => !line.quantity);
    if (state.blocked) { summary.className = "additional-form-summary is-error"; summary.innerHTML = `${icon(icons.alert)}<div><strong>Completa las cantidades</strong><span>${state.blocked} ${state.blocked === 1 ? "línea necesita" : "líneas necesitan"} una cantidad válida.</span></div>`; }
    else if (!model.reason) { summary.className = "additional-form-summary is-warning"; summary.innerHTML = `${icon(icons.alert)}<div><strong>Falta el motivo</strong><span>Selecciona por qué necesitas este pedido adicional.</span></div>`; }
    else if (state.shortages) { summary.className = "additional-form-summary is-warning"; summary.innerHTML = `${icon(icons.alert)}<div><strong>${state.shortages} ${state.shortages === 1 ? "material supera" : "materiales superan"} el stock visible</strong><span>La solicitud quedará pendiente de validación de abastecimiento.</span></div>`; }
    else { summary.className = "additional-form-summary is-success"; summary.innerHTML = `${icon(icons.check)}<div><strong>Solicitud lista</strong><span>Las cantidades tienen stock visible y pasarán a validación.</span></div>`; }
    submit.disabled = !state.valid;
  }

  function draft() {
    localStorage.setItem(draftKey, JSON.stringify({ lines: model.lines, reason: model.reason, observation: model.observation }));
    feedback("El borrador quedó guardado en este dispositivo.");
  }

  function submit(event) {
    event.preventDefault();
    const state = formState();
    if (!state.valid) { renderCreateState(); qs(state.blocked ? "[data-line-quantity]" : "#additionalReason")?.focus(); return; }
    const existing = savedRequest();
    if (existing) { feedback(`El pedido ${existing.id} ya fue registrado. No se creó un duplicado.`); return; }
    const total = model.lines.reduce((sum, line) => sum + Number(line.quantity || 0), 0);
    const saved = { id: "PAD-2026-32-003", base: baseOrder.id, notice: baseOrder.notice, farm: baseOrder.farm, week: baseOrder.week, sequence: 3, lines: model.lines.length, quantity: `${format(total)} en unidades de cada material`, reason: qs("#additionalReason").selectedOptions[0].textContent, reasonCode: model.reason, observation: model.observation, status: "Pendiente de validación", updated: "Hoy, 11:35", document: "Pendiente de clasificación", shortages: state.shortages, detailLines: model.lines.map((line) => ({ ...line, ...materials.find((item) => item.code === line.material) })) };
    localStorage.setItem(saveKey, JSON.stringify(saved));
    localStorage.removeItem(draftKey);
    location.href = `pedidos-adicionales.html?pedido=${encodeURIComponent(saved.id)}&creado=1`;
  }

  function detailView(id) {
    const item = requests().find((request) => request.id === id);
    if (!item) return `${header("Consultar pedido adicional", "La solicitud debe estar dentro de tu alcance.")}<div class="notice notice-error" role="alert"><div><strong>Pedido no disponible</strong><span>No existe información para mostrar dentro de tu compañía y fincas autorizadas.</span></div></div><a class="btn btn-secondary mt-24" href="pedidos-adicionales.html">Volver a la bandeja</a>`;
    const created = params.get("creado") === "1";
    const steps = timeline(item.status);
    const lines = item.detailLines || [{ name: item.quantity, code: "Detalle consolidado", unit: "", quantity: "—", stock: "—" }];
    return `
      <a class="additional-back" href="pedidos-adicionales.html">${icon(icons.arrow)} Volver a pedidos adicionales</a>
      ${header(item.id, "Consulta el origen, la validación y los hitos posteriores de la solicitud.", statusChip(item.status))}
      ${created ? `<div class="notice notice-success additional-created" role="status">${icon(icons.check)}<div><strong>Pedido adicional registrado</strong><span>La solicitud se creó una sola vez y quedó pendiente de validación.</span></div></div>` : ""}
      <article class="card additional-detail-card">
        <div class="additional-chain" aria-label="Cadena de origen del pedido"><div><span>Aviso de corte</span><strong>${esc(item.notice)}</strong></div><i aria-hidden="true">→</i><div><span>Pedido base</span><strong>${esc(item.base)}</strong></div><i aria-hidden="true">→</i><div class="is-current"><span>Pedido adicional</span><strong>${esc(item.id)}</strong></div></div>
        <div class="additional-context"><div><span>Finca</span><strong>${esc(item.farm)}</strong></div><div><span>Semana</span><strong>${esc(item.week)}</strong></div><div><span>Motivo</span><strong>${esc(item.reason)}</strong></div><div><span>Documento</span><strong>${esc(item.document)}</strong></div></div>
        <div class="card-header"><div><h2 class="card-title">Materiales solicitados</h2><p class="card-subtitle">Valores registrados al crear la solicitud.</p></div></div>
        <div class="table-wrap"><table class="materials-table additional-detail-table"><thead><tr><th>Material</th><th>Cantidad adicional</th><th>Stock consultado</th><th>Resultado inicial</th></tr></thead><tbody>${lines.map((line) => `<tr><td><div class="materials-record-main"><strong>${esc(line.name)}</strong><span>${esc(line.code || "")}</span></div></td><td>${line.quantity === "—" ? esc(item.quantity) : `${format(Number(line.quantity))} ${esc(line.unit)}`}</td><td>${line.stock === "—" ? "No detallado" : `${format(Number(line.stock))} ${esc(line.unit)}`}</td><td>${line.quantity === "—" ? statusChip("Registrado") : resultMarkup(lineResult({ material: line.code, quantity: line.quantity }))}</td></tr>`).join("")}</tbody></table></div>
        <div class="additional-detail-grid"><section><h2 class="card-title">Seguimiento</h2><div class="additional-timeline">${steps}</div></section><aside><h2 class="card-title">Condiciones de continuidad</h2><div class="additional-conditions"><div>${icon(icons.check)}<span>Origen y responsable registrados</span></div><div>${icon(item.status === "Entregado" ? icons.check : icons.alert)}<span>${item.status === "Entregado" ? "Entrega finalizada con soporte" : "Documento logístico y entrega aún no finalizados"}</span></div><div>${icon(icons.alert)}<span>No puede cerrarse con devolución, novedad o soporte pendiente</span></div></div></aside></div>
      </article>
    `;
  }

  function timeline(status) {
    const order = ["Registrado", "Pendiente de validación", "Aprobado", "En preparación", "Entregado"];
    const current = Math.max(1, order.indexOf(status));
    return order.map((label, index) => `<div class="additional-timeline-item ${index < current ? "is-done" : index === current ? "is-current" : ""}"><span>${index < current ? icon(icons.check) : ""}</span><div><strong>${esc(label)}</strong><p>${index === 0 ? "Solicitud vinculada al pedido base." : index === 1 ? "Revisión de cantidades, stock y motivo." : index === 2 ? "Decisión registrada por el responsable autorizado." : index === 3 ? "Clasificación documental y preparación logística." : "Entrega y soportes disponibles."}</p></div></div>`).join("");
  }

  function feedback(message) {
    const box = qs("[data-additional-feedback]");
    const text = qs("[data-additional-feedback-message]", box);
    if (!box || !text) return;
    text.textContent = message; box.hidden = false;
    clearTimeout(box.timer); box.timer = setTimeout(() => { box.hidden = true; }, 4200);
  }

  function bindList() {
    qs("#additionalSearch")?.addEventListener("input", renderList);
    qs("#additionalStatus")?.addEventListener("change", renderList);
    renderList();
  }

  function bindCreate() {
    qs("#additionalReason").value = model.reason;
    qs("#additionalObservation").value = model.observation;
    qs("[data-additional-lines]")?.addEventListener("input", (event) => {
      const input = event.target.closest("[data-line-quantity]");
      if (!input) return;
      const index = Number(input.dataset.lineQuantity); model.lines[index].quantity = input.value === "" ? 0 : Number(input.value); renderCreateState(); qs(`[data-line-quantity="${index}"]`)?.focus({ preventScroll: true });
    });
    qs("[data-additional-lines]")?.addEventListener("change", (event) => {
      const select = event.target.closest("[data-line-material]"); if (!select) return;
      model.lines[Number(select.dataset.lineMaterial)].material = select.value; renderCreateState();
    });
    qs("[data-additional-lines]")?.addEventListener("click", (event) => {
      const remove = event.target.closest("[data-remove-line]"); if (!remove || model.lines.length === 1) return;
      model.lines.splice(Number(remove.dataset.removeLine), 1); renderCreateState();
    });
    qs("[data-add-line]")?.addEventListener("click", () => {
      const used = new Set(model.lines.map((line) => line.material));
      const next = materials.find((item) => !used.has(item.code)); if (!next) return;
      model.lines.push({ material: next.code, quantity: 0 }); renderCreateState();
    });
    qs("#additionalReason")?.addEventListener("change", (event) => { model.reason = event.target.value; renderCreateState(); });
    qs("#additionalObservation")?.addEventListener("input", (event) => { model.observation = event.target.value; });
    qs("[data-save-draft]")?.addEventListener("click", draft);
    qs("[data-additional-form]")?.addEventListener("submit", submit);
    renderCreateState();
  }

  function init() {
    SIALCore.initShell({ area: "gestion", module: "materiales", view: "pedidos" });
    const root = qs("[data-additional-root]"); if (!root) return;
    if (params.get("access") === "denied") { root.innerHTML = deniedView(); return; }
    const requested = params.get("pedido");
    if (requested) { root.innerHTML = detailView(requested); return; }
    if (params.get("nuevo") === "1") { root.innerHTML = createView(); if (qs("[data-additional-form]")) bindCreate(); return; }
    root.innerHTML = listView(); bindList();
  }

  return { init };
})();