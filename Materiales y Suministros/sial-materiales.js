const SIALMaterials = (() => {
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const esc = (value) => SIALCore.escapeHtml(value ?? "");

  const icons = {
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path><circle cx="12" cy="12" r="3"></circle>',
    edit: '<path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path>',
    inactive: '<path d="m18 6-12 12"></path><path d="m6 6 12 12"></path>',
    active: '<path d="M20 6 9 17l-5-5"></path>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>'
  };

  const statusMap = {
    SUGERIDO: ["status-warning", "Sugerido"],
    CONSULTADO: ["status-active", "Consultado"],
    ADICIONAL: ["status-warning", "Adicional"],
    PENDIENTE_VALIDACION: ["status-warning", "Pendiente validacion"],
    VALIDADO: ["status-active", "Validado"],
    LISTO_DESPACHO: ["status-warning", "Listo despacho"],
    NOTIFICADO: ["status-active", "Notificado"],
    ASIGNADO: ["status-warning", "Asignado"],
    EN_TRANSITO: ["status-warning", "En transito"],
    ENTREGADA: ["status-active", "Entregada"],
    CERRADA: ["status-active", "Cerrada"],
    INACTIVO: ["status-inactive", "Inactivo"],
    ACTIVO: ["status-active", "Activo"],
    REVISION: ["status-warning", "Revision"],
    ERROR: ["status-inactive", "Error"]
  };

  const materials = [
    { id: "MAT-001", code: "MAT-CAR-001", name: "Caja carton corrugado", category: "Cartonera", unit: "unidad", status: "ACTIVO", supplier: "Cartonera Caribe", audit: "Crear - almacen.admin|12/06/2026 08:10" },
    { id: "MAT-002", code: "MAT-EST-001", name: "Estiba madera exportacion", category: "Estibado", unit: "unidad", status: "ACTIVO", supplier: "Estibas del Norte", audit: "Editar - almacen.admin|14/06/2026 10:35" },
    { id: "MAT-003", code: "MAT-SEP-001", name: "Separador de pallet", category: "Empaque", unit: "paquete", status: "REVISION", supplier: "Suministros Banasan", audit: "Revision - supervisor.ze|18/06/2026 15:20" },
    { id: "MAT-004", code: "MAT-ETQ-001", name: "Etiqueta trazabilidad", category: "Identificacion", unit: "rollo", status: "ACTIVO", supplier: "Etiquetas del Caribe", audit: "Crear - almacen.admin|20/06/2026 09:22" }
  ];

  const suppliers = [
    { id: "PRO-001", code: "PRV-CAR-01", name: "Cartonera Caribe", type: "Cartonera", contact: "operaciones@cartonera.example", status: "ACTIVO", audit: "Crear - compras.sial|08/06/2026 11:05" },
    { id: "PRO-002", code: "PRV-EST-01", name: "Estibas del Norte", type: "Estibadero", contact: "despachos@estibas.example", status: "ACTIVO", audit: "Crear - compras.sial|09/06/2026 12:18" },
    { id: "PRO-003", code: "PRV-ETQ-01", name: "Etiquetas del Caribe", type: "Proveedor material", contact: "coordinacion@etiquetas.example", status: "REVISION", audit: "Revision - compras.sial|21/06/2026 08:40" }
  ];

  const stock = [
    { id: "STK-001", finca: "Finca Santa Isabel", material: "Caja carton corrugado", available: 1280, unit: "unidad", updated: "28/06/2026 07:40", status: "ACTIVO", coverage: "2.4 dias", source: "HU662" },
    { id: "STK-002", finca: "Finca El Retiro", material: "Caja carton corrugado", available: 360, unit: "unidad", updated: "28/06/2026 07:50", status: "REVISION", coverage: "0.8 dias", source: "HU662" },
    { id: "STK-003", finca: "Finca Santa Isabel", material: "Estiba madera exportacion", available: 94, unit: "unidad", updated: "28/06/2026 06:58", status: "ACTIVO", coverage: "3.1 dias", source: "HU662" },
    { id: "STK-004", finca: "Finca Las Palmas", material: "Separador de pallet", available: 18, unit: "paquete", updated: "27/06/2026 18:12", status: "REVISION", coverage: "Stock bajo", source: "HU662" }
  ];

  const orders = [
    { id: "PED-071", type: "Sugerido", finca: "Finca Santa Isabel", week: "Semana 27 - 2026", material: "Caja carton corrugado", quantity: 1400, unit: "unidad", stock: "1280 unidad", document: "RPT", docState: "Auto clasificado", status: "SUGERIDO", destination: "Finca Santa Isabel", reason: "Calculado desde aviso de corte", source: "HU659", audit: "Generar - sistema|28/06/2026 06:00" },
    { id: "PED-072", type: "Adicional", finca: "Finca El Retiro", week: "Semana 27 - 2026", material: "Caja carton corrugado", quantity: 520, unit: "unidad", stock: "360 unidad", document: "Remision", docState: "Requiere confirmacion", status: "PENDIENTE_VALIDACION", destination: "Finca El Retiro", reason: "Incremento extraordinario por corte", source: "HU666", audit: "Crear - almacen.pedidos|28/06/2026 08:42" },
    { id: "PED-073", type: "Sugerido", finca: "Finca Las Palmas", week: "Semana 27 - 2026", material: "Separador de pallet", quantity: 35, unit: "paquete", stock: "18 paquete", document: "Reserva", docState: "Auto clasificado", status: "CONSULTADO", destination: "ZE Puerto Norte", reason: "Stock consultado por finca", source: "HU659/HU662", audit: "Consultar - productor.finca|28/06/2026 09:14" },
    { id: "PED-074", type: "Estandar", finca: "Finca Santa Isabel", week: "Semana 27 - 2026", material: "Estiba madera exportacion", quantity: 80, unit: "unidad", stock: "94 unidad", document: "RPT", docState: "Confirmado", status: "VALIDADO", destination: "ZE Puerto Norte", reason: "Pedido base semanal", source: "HU667", audit: "Validar - supervisor.almacen|28/06/2026 10:05" }
  ];

  const transportOrders = [
    { id: "OTI-546-001", document: "RPT-2026-0881", docType: "RPT", finca: "Finca Santa Isabel", vehicle: "TUL458", driver: "Carlos Mendoza", materials: "Caja carton corrugado, Estiba madera", quantity: "1480 unidades", status: "NOTIFICADO", notified: "Transporte 28/06 10:20; Conductor 28/06 10:25; Seguridad 28/06 10:28; Finca 28/06 10:30", source: "HU546/HU669/HU670/HU532", audit: "Notificar - sistema|28/06/2026 10:30" },
    { id: "OTI-546-002", document: "REM-2026-0184", docType: "Remision", finca: "Finca El Retiro", vehicle: "CAM-102", driver: "Ana Ramirez", materials: "Caja carton corrugado", quantity: "520 unidades", status: "LISTO_DESPACHO", notified: "Pendiente", source: "HU546/HU669", audit: "Crear - usuario.logistico|28/06/2026 11:05" },
    { id: "OTI-546-003", document: "RES-2026-0045", docType: "Reserva", finca: "Finca Las Palmas", vehicle: "Sin asignar", driver: "--", materials: "Separador de pallet", quantity: "35 paquetes", status: "ASIGNADO", notified: "Finca 28/06 12:12", source: "HU546/HU670", audit: "Asignar - almacen.pedidos|28/06/2026 12:12" }
  ];

  const supplierSummaries = [
    { id: "RES-668-001", provider: "Cartonera Caribe", period: "28/06/2026", ordersCount: 2, materials: "Caja carton corrugado", quantities: "1920 unidades", destination: "Santa Isabel / El Retiro", status: "NOTIFICADO", generated: "28/06/2026 13:00", sent: "28/06/2026 13:04", source: "HU668" },
    { id: "RES-668-002", provider: "Estibas del Norte", period: "Semana 27 - 2026", ordersCount: 1, materials: "Estiba madera exportacion", quantities: "80 unidades", destination: "Finca Santa Isabel", status: "LISTO_DESPACHO", generated: "28/06/2026 13:10", sent: "Pendiente", source: "HU668" },
    { id: "RES-668-003", provider: "Suministros Banasan", period: "Semana 27 - 2026", ordersCount: 1, materials: "Separador de pallet", quantities: "35 paquetes", destination: "Finca Las Palmas", status: "PENDIENTE_VALIDACION", generated: "Pendiente", sent: "Pendiente", source: "HU668" }
  ];

  const deliveries = [
    { id: "ENT-681-001", order: "OTI-546-001", document: "RPT-2026-0881", finca: "Finca Santa Isabel", driver: "Carlos Mendoza", receiver: "Laura Pineda", deliveredAt: "28/06/2026 15:40", status: "ENTREGADA", evidence: "Foto receptor + firma digital", pod: "POD-682-001", source: "HU681/HU682/HU547", audit: "Entregar - transportista.app|28/06/2026 15:40" },
    { id: "ENT-681-002", order: "OTI-546-002", document: "REM-2026-0184", finca: "Finca El Retiro", driver: "Ana Ramirez", receiver: "Pendiente", deliveredAt: "Pendiente", status: "EN_TRANSITO", evidence: "Requerida para cierre", pod: "Pendiente", source: "HU681/HU682", audit: "Salida - transporte|28/06/2026 13:20" },
    { id: "ENT-547-001", order: "OTI-546-003", document: "RES-2026-0045", finca: "Finca Las Palmas", driver: "Sin asignar", receiver: "Pendiente", deliveredAt: "Pendiente", status: "ASIGNADO", evidence: "Foto obligatoria", pod: "Pendiente", source: "HU547", audit: "Asignar - almacen.pedidos|28/06/2026 12:12" }
  ];

  const pallets = [
    { id: "PAL-559-001", reference: "BAN-REF-001", finca: "Finca Santa Isabel", pallets: 18, boxesLeft: 0, destination: "Contenedor SIALU1234567", status: "ACTIVO", type: "Completo", source: "HU559" },
    { id: "PAL-559-002", reference: "BAN-REF-004", finca: "Finca El Retiro", pallets: 9, boxesLeft: 0, destination: "ZE Puerto Norte", status: "ACTIVO", type: "Completo", source: "HU559" },
    { id: "PAL-560-001", reference: "BAN-REF-011", finca: "Finca Las Palmas", pallets: 1, boxesLeft: 14, destination: "Consolidacion posterior", status: "REVISION", type: "Mocho", source: "HU560" },
    { id: "PAL-560-002", reference: "BAN-REF-014", finca: "Finca Santa Isabel", pallets: 1, boxesLeft: 8, destination: "Consolidacion posterior", status: "REVISION", type: "Mocho", source: "HU560" }
  ];

  const rules = [
    { id: "REG-667-001", code: "DOC-RPT", name: "Pedido semanal validado", result: "RPT", condition: "Pedido base o sugerido con stock confirmado", status: "ACTIVO", audit: "Crear - admin.documental|25/06/2026 09:00" },
    { id: "REG-667-002", code: "DOC-REM", name: "Despacho adicional", result: "Remision", condition: "Pedido adicional validado para envio fisico", status: "ACTIVO", audit: "Crear - admin.documental|25/06/2026 09:12" },
    { id: "REG-667-003", code: "DOC-RES", name: "Material reservado", result: "Reserva", condition: "Stock apartado sin despacho inmediato", status: "REVISION", audit: "Editar - admin.documental|28/06/2026 08:00" }
  ];

  const viewConfig = {
    dashboard: { title: "Materiales y suministros", eyebrow: "Gestion / Materiales y suministros", subtitle: "Centro operativo para pedidos, stock, ordenes, proveedores, entregas y trazabilidad documental.", hu: "HU659, HU662, HU666, HU667, HU546, HU668, HU681, HU682" },
    pedidos: { title: "Gestion de pedidos de materiales", eyebrow: "Materiales / Pedidos", subtitle: "Pedidos sugeridos, adicionales y estandar vinculados a finca, semana, stock y documento logistico.", hu: "HU659, HU662, HU666, HU667" },
    inventario: { title: "Inventario por finca", eyebrow: "Materiales / Inventario", subtitle: "Consulta de stock disponible por finca y material antes de confirmar pedidos.", hu: "HU662" },
    pallets: { title: "Inventario de pallets", eyebrow: "Materiales / Pallets", subtitle: "Pallets completos y mochos para planificar cargues y consolidaciones.", hu: "HU559, HU560" },
    ordenes: { title: "Ordenes de transporte de insumos", eyebrow: "Materiales / Ordenes", subtitle: "Ordenes con documento logistico, vehiculo, finca destino y notificaciones operativas.", hu: "HU546, HU669, HU670, HU532" },
    proveedores: { title: "Resumen para proveedores externos", eyebrow: "Materiales / Proveedores externos", subtitle: "Generacion y envio digital de resumen para cartoneras y estibaderos.", hu: "HU668" },
    entregas: { title: "Seguimiento de entregas y POD", eyebrow: "Materiales / Entregas", subtitle: "Consulta de entrega efectiva, evidencia, firma digital y trazabilidad asociada.", hu: "HU681, HU682, HU547, HU607" },
    materiales: { title: "Gestion de materiales", eyebrow: "Materiales / Maestra", subtitle: "Catalogo minimo de materiales usados por pedidos, stock y ordenes.", hu: "Maestra soporte" },
    proveedoresMaster: { title: "Gestion de proveedores", eyebrow: "Materiales / Maestra", subtitle: "Proveedores externos para resumenes digitales y coordinacion de entregas.", hu: "HU668 soporte" },
    reglas: { title: "Reglas documentales", eyebrow: "Materiales / Documentos", subtitle: "Parametrizacion de clasificacion automatica para RPT, remision y reserva.", hu: "HU667" }
  };

  function status(value) {
    const meta = statusMap[value] || ["status-warning", value || "Revision"];
    return `<span class="status ${meta[0]}">${esc(meta[1])}</span>`;
  }

  function documentTag(value) {
    return `<span class="tag">${esc(value)}</span>`;
  }

  function iconButton(label, icon, attrs = "") {
    return `<button class="icon-btn" type="button" aria-label="${esc(label)}" title="${esc(label)}" ${attrs}><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons[icon]}</svg></button>`;
  }

  function detailButton(type, id) {
    return iconButton("Visualizar detalle", "eye", `data-material-detail="${esc(type)}" data-record-id="${esc(id)}"`);
  }

  function stateButton(label) {
    const icon = /^Activar/i.test(label) ? "active" : "inactive";
    return iconButton(label, icon);
  }

  function tableShell({ title, subtitle, countId, searchId, statusId, contextId, contextLabel, contextOptions, rows, headers, body, filename, primary = "", notice = "" }) {
    return `
      ${notice}
      <article class="card mt-24">
        <div class="card-header">
          <div><h2 class="card-title">${esc(title)}</h2><p class="card-subtitle">${esc(subtitle)}</p></div>
          <div class="card-actions">
            <span class="chip" id="${esc(countId)}">0 registros visibles</span>
            <button class="btn btn-secondary" type="button" data-export-table data-export-filename="${esc(filename)}" aria-label="Exportar ${esc(title)}"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h18v4H3zM7 7v13h10V7"></path></svg><span>Exportar</span></button>
            ${primary}
          </div>
        </div>
        <div class="card-body">
          <div class="toolbar materials-toolbar">
            <input class="input" id="${esc(searchId)}" type="search" aria-label="Buscar" placeholder="Buscar orden, finca, material o documento" />
            <select class="select" id="${esc(statusId)}" aria-label="Filtrar por estado">
              <option value="all">Todos los estados</option>
              <option value="active">Activos / cerrados</option>
              <option value="warning">Pendientes / revision</option>
              <option value="inactive">Inactivos / bloqueo</option>
            </select>
            <select class="select" id="${esc(contextId)}" aria-label="${esc(contextLabel)}">
              <option value="all">${esc(contextLabel)}</option>
              ${contextOptions.map((item) => `<option value="${esc(item.value)}">${esc(item.label)}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="table-wrap">
          <table class="materials-table" data-material-table="${esc(rows)}">
            <thead><tr>${headers.map((item) => `<th>${esc(item)}</th>`).join("")}<th>Acciones</th></tr></thead>
            <tbody>${body}</tbody>
          </table>
        </div>
        <div class="card-body"><div class="empty-state" id="${esc(rows)}Empty">No hay registros que coincidan con los filtros.</div></div>
      </article>
    `;
  }

  function rowDataset(item, context, state = item.status) {
    const stateClass = state === "ACTIVO" || state === "VALIDADO" || state === "ENTREGADA" || state === "CERRADA" || state === "CONSULTADO" || state === "NOTIFICADO" ? "active" : state === "INACTIVO" || state === "ERROR" ? "inactive" : "warning";
    return `data-status="${stateClass}" data-context="${esc(context)}" data-code="${esc(item.id || item.code)}" data-name="${esc(item.name || item.finca || item.provider || item.order || item.document || item.reference)}" data-state="${esc(state)}" data-audit="${esc(item.audit || "")}"`;
  }

  function orderRows() {
    return orders.map((item) => `
      <tr ${rowDataset(item, item.type.toLowerCase(), item.status)}>
        <td><div class="materials-record-main"><strong>${esc(item.id)}</strong><span>${esc(item.source)}</span></div></td>
        <td>${esc(item.type)}</td>
        <td>${esc(item.finca)}<br><span class="muted">${esc(item.week)}</span></td>
        <td>${esc(item.material)}<br><span class="muted">${esc(item.quantity)} ${esc(item.unit)}</span></td>
        <td>${esc(item.stock)}</td>
        <td>${documentTag(item.document)}<br><span class="muted">${esc(item.docState)}</span></td>
        <td>${status(item.status)}</td>
        <td class="muted">${esc(item.audit).replace("|", "<br>")}</td>
        <td><div class="row-actions">${detailButton("order", item.id)}${stateButton(item.status === "INACTIVO" ? "Activar pedido" : "Inactivar pedido")}</div></td>
      </tr>
    `).join("");
  }

  function stockRows() {
    return stock.map((item) => `
      <tr ${rowDataset(item, item.finca, item.status)}>
        <td><div class="materials-record-main"><strong>${esc(item.finca)}</strong><span>${esc(item.source)}</span></div></td>
        <td>${esc(item.material)}</td>
        <td>${esc(item.available)} ${esc(item.unit)}</td>
        <td>${esc(item.coverage)}</td>
        <td>${esc(item.updated)}</td>
        <td>${status(item.status)}</td>
        <td class="muted">Sincronizar - sistema<br>${esc(item.updated)}</td>
        <td><div class="row-actions">${detailButton("stock", item.id)}</div></td>
      </tr>
    `).join("");
  }

  function palletRows() {
    return pallets.map((item) => `
      <tr ${rowDataset(item, item.type.toLowerCase(), item.status)}>
        <td><div class="materials-record-main"><strong>${esc(item.reference)}</strong><span>${esc(item.source)}</span></div></td>
        <td>${esc(item.type)}</td>
        <td>${esc(item.finca)}</td>
        <td>${esc(item.pallets)}</td>
        <td>${esc(item.boxesLeft)}</td>
        <td>${esc(item.destination)}</td>
        <td>${status(item.status)}</td>
        <td class="muted">Actualizar - operacion.movilidad<br>28/06/2026 08:30</td>
        <td><div class="row-actions">${detailButton("pallet", item.id)}</div></td>
      </tr>
    `).join("");
  }

  function transportRows() {
    return transportOrders.map((item) => `
      <tr ${rowDataset(item, item.docType.toLowerCase(), item.status)}>
        <td><div class="materials-record-main"><strong>${esc(item.id)}</strong><span>${esc(item.source)}</span></div></td>
        <td>${documentTag(item.docType)}<br><span class="muted">${esc(item.document)}</span></td>
        <td>${esc(item.finca)}</td>
        <td>${esc(item.vehicle)}<br><span class="muted">${esc(item.driver)}</span></td>
        <td>${esc(item.materials)}<br><span class="muted">${esc(item.quantity)}</span></td>
        <td>${status(item.status)}</td>
        <td class="muted">${esc(item.audit).replace("|", "<br>")}</td>
        <td><div class="row-actions">${detailButton("transport", item.id)}${iconButton("Notificar orden", "send", `data-material-action="notify" data-record-id="${esc(item.id)}"`)}${stateButton("Inactivar orden")}</div></td>
      </tr>
    `).join("");
  }

  function summaryRows() {
    return supplierSummaries.map((item) => `
      <tr ${rowDataset(item, item.provider, item.status)}>
        <td><div class="materials-record-main"><strong>${esc(item.provider)}</strong><span>${esc(item.source)}</span></div></td>
        <td>${esc(item.period)}</td>
        <td>${esc(item.ordersCount)}</td>
        <td>${esc(item.materials)}<br><span class="muted">${esc(item.quantities)}</span></td>
        <td>${esc(item.destination)}</td>
        <td>${status(item.status)}</td>
        <td class="muted">Generado: ${esc(item.generated)}<br>Enviado: ${esc(item.sent)}</td>
        <td><div class="row-actions">${detailButton("summary", item.id)}${iconButton("Generar y compartir resumen", "send", `data-material-action="send-summary" data-record-id="${esc(item.id)}"`)}${stateButton("Inactivar resumen")}</div></td>
      </tr>
    `).join("");
  }

  function deliveryRows() {
    return deliveries.map((item) => `
      <tr ${rowDataset(item, item.finca, item.status)}>
        <td><div class="materials-record-main"><strong>${esc(item.order)}</strong><span>${esc(item.source)}</span></div></td>
        <td>${esc(item.document)}</td>
        <td>${esc(item.finca)}</td>
        <td>${esc(item.driver)}</td>
        <td>${esc(item.receiver)}<br><span class="muted">${esc(item.deliveredAt)}</span></td>
        <td>${esc(item.evidence)}<br><span class="muted">${esc(item.pod)}</span></td>
        <td>${status(item.status)}</td>
        <td class="muted">${esc(item.audit).replace("|", "<br>")}</td>
        <td><div class="row-actions">${detailButton("delivery", item.id)}<a class="icon-btn" href="../Trazabilidad/auditoria-operativa.html" aria-label="Ver auditoria operativa" title="Ver auditoria operativa"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons.eye}</svg></a></div></td>
      </tr>
    `).join("");
  }

  function materialRows() {
    return materials.map((item) => `
      <tr ${rowDataset(item, item.category, item.status)}>
        <td>${esc(item.code)}</td><td>${esc(item.name)}</td><td>${esc(item.category)}</td><td>${esc(item.unit)}</td><td>${esc(item.supplier)}</td><td>${status(item.status)}</td><td class="muted">${esc(item.audit).replace("|", "<br>")}</td>
        <td><div class="row-actions">${detailButton("material", item.id)}${iconButton("Editar material", "edit", "data-edit-inline")}${stateButton(item.status === "INACTIVO" ? "Activar material" : "Inactivar material")}</div></td>
      </tr>
    `).join("");
  }

  function supplierRows() {
    return suppliers.map((item) => `
      <tr ${rowDataset(item, item.type, item.status)}>
        <td>${esc(item.code)}</td><td>${esc(item.name)}</td><td>${esc(item.type)}</td><td>${esc(item.contact)}</td><td>${status(item.status)}</td><td class="muted">${esc(item.audit).replace("|", "<br>")}</td>
        <td><div class="row-actions">${detailButton("supplier", item.id)}${iconButton("Editar proveedor", "edit", "data-edit-inline")}${stateButton(item.status === "INACTIVO" ? "Activar proveedor" : "Inactivar proveedor")}</div></td>
      </tr>
    `).join("");
  }

  function ruleRows() {
    return rules.map((item) => `
      <tr ${rowDataset(item, item.result.toLowerCase(), item.status)}>
        <td>${esc(item.code)}</td><td>${esc(item.name)}</td><td>${documentTag(item.result)}</td><td>${esc(item.condition)}</td><td>${status(item.status)}</td><td class="muted">${esc(item.audit).replace("|", "<br>")}</td>
        <td><div class="row-actions">${detailButton("rule", item.id)}${iconButton("Editar regla", "edit", "data-edit-inline")}${stateButton(item.status === "INACTIVO" ? "Activar regla" : "Inactivar regla")}</div></td>
      </tr>
    `).join("");
  }

  function notice(text, type = "info") {
    return `<div class="notice notice-${type}"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v5"></path><path d="M12 16h.01"></path></svg><span>${esc(text)}</span></div>`;
  }

  function header(view) {
    const cfg = viewConfig[view] || viewConfig.dashboard;
    return `
      <p class="page-eyebrow">${esc(cfg.eyebrow)}</p>
      <div class="page-header">
        <div><h1 class="page-title">${esc(cfg.title)}</h1><p class="page-subtitle">${esc(cfg.subtitle)}</p></div>
      </div>
      ${notice(`Historias cubiertas: ${cfg.hu}. Esta propuesta es estatica y deja contratos listos para backend futuro.`)}
    `;
  }

  function dashboard() {
    return `
      ${header("dashboard")}
      <section class="materials-kpi-grid" aria-label="Resumen operativo de materiales">
        <article class="materials-kpi"><label>Pedidos activos</label><strong>${orders.length}</strong><span>Sugeridos, adicionales y validados.</span></article>
        <article class="materials-kpi"><label>Stock en revision</label><strong>${stock.filter((item) => item.status === "REVISION").length}</strong><span>Fincas con cobertura baja o pendiente.</span></article>
        <article class="materials-kpi"><label>Ordenes notificadas</label><strong>${transportOrders.filter((item) => item.status === "NOTIFICADO").length}</strong><span>Transporte, conductor, seguridad o finca.</span></article>
        <article class="materials-kpi"><label>Entregas con POD</label><strong>${deliveries.filter((item) => item.status === "ENTREGADA").length}</strong><span>Foto/firma vinculada a documento logistico.</span></article>
      </section>
      <section class="materials-command-grid">
        <article class="card">
          <div class="card-header"><div><h2 class="card-title">Secuencia funcional</h2><p class="card-subtitle">Relaciones entre HU sin duplicar modulos existentes.</p></div></div>
          <div class="card-body materials-flow">
            ${["Pedido sugerido desde aviso de corte", "Consulta stock finca/material", "Pedido adicional y validacion", "Clasificacion RPT / remision / reserva", "Orden de transporte y notificaciones", "Entrega movil + POD", "Auditoria operativa / evidencias"].map((label, index) => `<div class="materials-flow-step"><span class="materials-flow-index">${index + 1}</span><div><strong>${esc(label)}</strong><small>${esc(["HU659", "HU662", "HU666", "HU667", "HU546/HU669/HU670/HU532", "HU681/HU682/HU547", "HU607"][index])}</small></div>${status(index < 2 ? "CONSULTADO" : index < 5 ? "VALIDADO" : "EN_TRANSITO")}</div>`).join("")}
          </div>
        </article>
        <aside class="materials-action-panel">
          <span class="materials-mini-label">Accesos clave</span>
          <a class="btn btn-primary" href="gestion-pedidos-materiales.html">Revisar pedidos</a>
          <a class="btn btn-secondary" href="ordenes-transporte-insumos.html">Ordenes de transporte</a>
          <a class="btn btn-secondary" href="resumen-proveedores.html">Resumen proveedores</a>
          <a class="btn btn-secondary" href="seguimiento-entregas.html">Entregas y POD</a>
          <div class="notice notice-info"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15l3-4 3 2 5-7"></path></svg><span>El modulo opera como orquestador; Seguridad y Pallets conservan su responsabilidad funcional.</span></div>
        </aside>
      </section>
    `;
  }

  function inlineForm(kind) {
    const config = {
      pedido: ["Nuevo pedido adicional", "Guardar pedido adicional", [["Semana de corte", "Semana 27 - 2026"], ["Finca", "Finca El Retiro"], ["Pedido base", "PED-071"], ["Motivo", "Necesidad extraordinaria de corte"]]],
      material: ["Nuevo material", "Guardar material", [["Codigo", "MAT-CAR-002"], ["Nombre", "Bolsas protectoras"], ["Unidad", "unidad"], ["Proveedor", "Cartonera Caribe"]]],
      supplier: ["Nuevo proveedor", "Guardar proveedor", [["Codigo", "PRV-NUE-01"], ["Nombre proveedor", "Proveedor externo"], ["Tipo", "Cartonera"], ["Contacto", "contacto@proveedor.example"]]],
      rule: ["Nueva regla documental", "Guardar regla", [["Codigo", "DOC-NUE"], ["Nombre regla", "Regla de clasificacion"], ["Resultado", "RPT"], ["Condicion", "Pedido validado con stock disponible"]]]
    }[kind];
    return `
      <div class="inline-form-panel materials-inline-form is-hidden" id="materialInlineForm" data-inline-form-panel>
        <div class="form-heading"><h2 data-inline-form-title>${esc(config[0])}</h2><p>Formulario corto embebido para propuesta. No captura codigos autogenerados de sistema.</p></div>
        <div class="form-body">
          <div class="notice notice-success is-hidden" id="formOk">Registro listo para guardar.</div>
          <form data-material-form novalidate>
            <section class="section"><div class="grid">
              ${config[2].map(([label, placeholder]) => `<div class="field span-3"><label class="label">${esc(label)} <span class="required">*</span></label><input class="input" required placeholder="${esc(placeholder)}"><div class="field-note">Dato obligatorio para la propuesta.</div></div>`).join("")}
            </div></section>
            <div class="form-actions"><button class="btn btn-secondary" type="button" data-cancel-inline-form>Cancelar</button><button class="btn btn-primary" type="submit">${esc(config[1])}</button></div>
          </form>
        </div>
      </div>
    `;
  }

  const contextByView = {
    pedidos: [{ value: "sugerido", label: "Sugeridos" }, { value: "adicional", label: "Adicionales" }, { value: "estandar", label: "Estandar" }],
    inventario: [{ value: "Finca Santa Isabel", label: "Finca Santa Isabel" }, { value: "Finca El Retiro", label: "Finca El Retiro" }, { value: "Finca Las Palmas", label: "Finca Las Palmas" }],
    pallets: [{ value: "completo", label: "Completos" }, { value: "mocho", label: "Mochos" }],
    ordenes: [{ value: "rpt", label: "RPT" }, { value: "remision", label: "Remision" }, { value: "reserva", label: "Reserva" }],
    proveedores: suppliers.map((item) => ({ value: item.name, label: item.name })),
    entregas: [{ value: "Finca Santa Isabel", label: "Finca Santa Isabel" }, { value: "Finca El Retiro", label: "Finca El Retiro" }, { value: "Finca Las Palmas", label: "Finca Las Palmas" }],
    materiales: [{ value: "Cartonera", label: "Cartonera" }, { value: "Estibado", label: "Estibado" }, { value: "Empaque", label: "Empaque" }, { value: "Identificacion", label: "Identificacion" }],
    proveedoresMaster: [{ value: "Cartonera", label: "Cartonera" }, { value: "Estibadero", label: "Estibadero" }, { value: "Proveedor material", label: "Proveedor material" }],
    reglas: [{ value: "rpt", label: "RPT" }, { value: "remision", label: "Remision" }, { value: "reserva", label: "Reserva" }]
  };

  function renderView(view) {
    if (view === "dashboard") return dashboard();
    const map = {
      pedidos: ["Pedidos de materiales", "Listado operativo con stock consultado, origen del pedido y documento logistico.", "pedidoCount", "pedidoSearch", "pedidoStatus", "pedidoContext", "Todos los tipos", contextByView.pedidos, ["Pedido", "Tipo", "Finca / semana", "Material / cantidad", "Stock consultado", "Documento", "Estado", "Auditoria"], orderRows(), "pedidos-materiales", '<button class="btn btn-primary" type="button" data-open-inline-form>Pedido adicional</button>', notice("Un pedido adicional debe asociarse a semana de corte, finca y motivo antes de entrar a validacion.", "warning") + inlineForm("pedido")],
      inventario: ["Stock disponible en finca", "Inventario por finca y material con fecha de ultima actualizacion.", "stockCount", "stockSearch", "stockStatus", "stockContext", "Todas las fincas", contextByView.inventario, ["Finca", "Material", "Cantidad disponible", "Cobertura", "Ultima actualizacion", "Estado", "Auditoria"], stockRows(), "inventario-finca", "", ""],
      pallets: ["Pallets completos e incompletos", "Inventario ZE para planificar cargue de contenedores y consolidacion posterior.", "palletCount", "palletSearch", "palletStatus", "palletContext", "Todos los tipos", contextByView.pallets, ["Referencia", "Tipo", "Finca origen", "Pallets", "Cajas restantes", "Destino", "Estado", "Auditoria"], palletRows(), "inventario-pallets", '<a class="btn btn-secondary" href="../pallets/armar-pallet.html">Ver flujo movil</a>', ""],
      ordenes: ["Ordenes de transporte", "Ordenes de insumos con documento, vehiculo, finca destino y notificacion.", "transportCount", "transportSearch", "transportStatus", "transportContext", "Todos los documentos", contextByView.ordenes, ["Orden", "Documento", "Finca destino", "Vehiculo / conductor", "Materiales", "Estado", "Auditoria"], transportRows(), "ordenes-transporte-insumos", '<button class="btn btn-primary" type="button" data-material-action="notify-all">Notificar pendientes</button>', notice("La notificacion reemplaza archivos manuales y correos sueltos como mecanismo principal de coordinacion.", "info")],
      proveedores: ["Resumenes digitales", "Consolidacion por proveedor externo, periodo, materiales, destino y envio.", "summaryCount", "summarySearch", "summaryStatus", "summaryContext", "Todos los proveedores", contextByView.proveedores, ["Proveedor", "Periodo", "Ordenes", "Materiales / cantidades", "Destino", "Estado", "Generacion / envio"], summaryRows(), "resumen-proveedores", '<button class="btn btn-primary" type="button" data-material-action="generate-summary">Generar resumen</button>', ""],
      entregas: ["Entregas y evidencias POD", "Seguimiento read-only de entrega efectiva, responsable, foto/firma y auditoria.", "deliveryCount", "deliverySearch", "deliveryStatus", "deliveryContext", "Todas las fincas", contextByView.entregas, ["Orden", "Documento", "Finca", "Transportista", "Recepcion", "Evidencia", "Estado", "Auditoria"], deliveryRows(), "seguimiento-entregas", '<a class="btn btn-secondary" href="../Trazabilidad/auditoria-operativa.html">Ver auditoria</a>', notice("El historial completo de inspecciones del contenedor se consulta en Seguridad / Auditoria operativa.", "info")],
      materiales: ["Materiales registrados", "Maestra minima para pedidos, stock, resumenes y ordenes.", "materialCount", "materialSearch", "materialStatus", "materialContext", "Todas las categorias", contextByView.materiales, ["Codigo", "Material", "Categoria", "Unidad", "Proveedor", "Estado", "Auditoria"], materialRows(), "materiales", '<button class="btn btn-primary" type="button" data-open-inline-form>Nuevo material</button>', inlineForm("material")],
      proveedoresMaster: ["Proveedores registrados", "Maestra minima de proveedores externos para resumen digital.", "supplierCount", "supplierSearch", "supplierStatus", "supplierContext", "Todos los tipos", contextByView.proveedoresMaster, ["Codigo", "Proveedor", "Tipo", "Contacto", "Estado", "Auditoria"], supplierRows(), "proveedores", '<button class="btn btn-primary" type="button" data-open-inline-form>Nuevo proveedor</button>', inlineForm("supplier")],
      reglas: ["Reglas documentales", "Clasificacion automatica para RPT, remision y reserva.", "ruleCount", "ruleSearch", "ruleStatus", "ruleContext", "Todos los resultados", contextByView.reglas, ["Codigo", "Regla", "Resultado", "Condicion", "Estado", "Auditoria"], ruleRows(), "reglas-documentales", '<button class="btn btn-primary" type="button" data-open-inline-form>Nueva regla</button>', inlineForm("rule")]
    };
    const cfg = map[view];
    return header(view) + tableShell({
      title: cfg[0],
      subtitle: cfg[1],
      countId: cfg[2],
      searchId: cfg[3],
      statusId: cfg[4],
      contextId: cfg[5],
      contextLabel: cfg[6],
      contextOptions: cfg[7],
      headers: cfg[8],
      body: cfg[9],
      filename: cfg[10],
      rows: cfg[10],
      primary: cfg[11],
      notice: cfg[12]
    });
  }

  function findRecord(type, id) {
    const maps = { order: orders, stock, pallet: pallets, transport: transportOrders, summary: supplierSummaries, delivery: deliveries, material: materials, supplier: suppliers, rule: rules };
    return (maps[type] || []).find((item) => item.id === id);
  }

  function detailRows(record) {
    return Object.entries(record || {}).filter(([key]) => !["audit"].includes(key)).map(([key, value]) => `
      <div class="detail-group"><span class="detail-label">${esc(key.replace(/([A-Z])/g, " $1"))}</span><div class="detail-value">${esc(value)}</div></div>
    `).join("");
  }

  function openDetail(type, id) {
    const record = findRecord(type, id);
    const drawer = qs("#materialDetailDrawer");
    const backdrop = qs("#materialDetailBackdrop");
    if (!drawer || !record) return;
    drawer.hidden = false;
    drawer.setAttribute("aria-hidden", "false");
    if (backdrop) backdrop.hidden = false;
    qs("[data-material-detail-title]", drawer).textContent = record.id || record.code || "Detalle";
    qs("[data-material-detail-subtitle]", drawer).textContent = `Fuente funcional: ${record.source || "Propuesta Materiales y Suministros"}`;
    qs("[data-material-detail-body]", drawer).innerHTML = `
      ${detailRows(record)}
      <div class="detail-group"><span class="detail-label">Auditoria</span><div class="stack">${String(record.audit || "Sin auditoria registrada").split(";").map((item) => `<div class="audit-item"><strong>${esc(item.split("|")[0] || item)}</strong><div class="muted">${esc(item.split("|")[1] || "")}</div></div>`).join("")}</div></div>
    `;
    drawer.classList.add("show");
    backdrop?.classList.add("show");
    qs("[data-close-material-detail]", drawer)?.focus();
  }

  function closeDetail() {
    const drawer = qs("#materialDetailDrawer");
    const backdrop = qs("#materialDetailBackdrop");
    drawer?.classList.remove("show");
    backdrop?.classList.remove("show");
    if (drawer) {
      drawer.setAttribute("aria-hidden", "true");
      drawer.hidden = true;
    }
    if (backdrop) backdrop.hidden = true;
  }

  function initActions() {
    document.addEventListener("click", (event) => {
      if (!event.target.closest("a[href]")) return;
      if (qs("#materialDetailDrawer")?.classList.contains("show")) closeDetail();
    }, true);
    qsa("[data-material-detail]").forEach((button) => {
      button.addEventListener("click", () => openDetail(button.dataset.materialDetail, button.dataset.recordId));
    });
    qsa("[data-close-material-detail], #materialDetailBackdrop").forEach((node) => node.addEventListener("click", closeDetail));
    qsa("[data-material-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const table = button.closest(".card") || qs(".page");
        table?.classList.add("materials-generated");
        setTimeout(() => table?.classList.remove("materials-generated"), 1200);
        const msg = button.dataset.materialAction === "send-summary" || button.dataset.materialAction === "generate-summary"
          ? "Resumen digital generado/enviado y registrado en auditoria de propuesta."
          : "Notificacion simulada registrada para transporte, conductor, seguridad o finca.";
        const alert = qs("[data-material-runtime-alert]");
        if (alert) {
          const message = qs("[data-material-runtime-message]", alert);
          if (!message) return;
          message.textContent = msg;
          alert.hidden = false;
          window.clearTimeout(alert.runtimeTimer);
          alert.runtimeTimer = window.setTimeout(() => {
            alert.hidden = true;
            message.textContent = "";
          }, 3200);
        }
      });
    });
    qsa("[data-material-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        qs("#formOk")?.classList.remove("is-hidden");
      });
    });
  }

  function initFilters(view) {
    if (view === "dashboard") return;
    const cfg = {
      pedidos: ["#pedidoSearch", "#pedidoStatus", "#pedidoContext", "#pedidos-materialesEmpty", "#pedidoCount"],
      inventario: ["#stockSearch", "#stockStatus", "#stockContext", "#inventario-fincaEmpty", "#stockCount"],
      pallets: ["#palletSearch", "#palletStatus", "#palletContext", "#inventario-palletsEmpty", "#palletCount"],
      ordenes: ["#transportSearch", "#transportStatus", "#transportContext", "#ordenes-transporte-insumosEmpty", "#transportCount"],
      proveedores: ["#summarySearch", "#summaryStatus", "#summaryContext", "#resumen-proveedoresEmpty", "#summaryCount"],
      entregas: ["#deliverySearch", "#deliveryStatus", "#deliveryContext", "#seguimiento-entregasEmpty", "#deliveryCount"],
      materiales: ["#materialSearch", "#materialStatus", "#materialContext", "#materialesEmpty", "#materialCount"],
      proveedoresMaster: ["#supplierSearch", "#supplierStatus", "#supplierContext", "#proveedoresEmpty", "#supplierCount"],
      reglas: ["#ruleSearch", "#ruleStatus", "#ruleContext", "#reglas-documentalesEmpty", "#ruleCount"]
    }[view];
    if (!cfg) return;
    SIALCore.initTableFilters({ rowSelector: "tbody tr", search: cfg[0], status: cfg[1], context: cfg[2], empty: cfg[3], count: cfg[4] });
  }

  function detailShell() {
    return `
      <div class="drawer-backdrop" id="materialDetailBackdrop" hidden></div>
      <aside class="drawer" id="materialDetailDrawer" aria-label="Detalle materiales y suministros" aria-hidden="true" hidden>
        <div class="drawer-head">
          <div><h3 data-material-detail-title>Detalle</h3><p data-material-detail-subtitle>Consulta lateral del registro seleccionado.</p></div>
          <button class="icon-btn" type="button" data-close-material-detail aria-label="Cerrar detalle"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons.inactive}</svg></button>
        </div>
        <div class="drawer-body" data-material-detail-body></div>
      </aside>
    `;
  }

  function init(view = "dashboard") {
    SIALCore.initShell({ area: "gestion", module: "materiales", view });
    const root = qs("[data-material-root]");
    if (!root) return;
    root.innerHTML = `${renderView(view)}<div class="notice notice-success material-runtime-alert" data-material-runtime-alert hidden><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg><span data-material-runtime-message></span></div>${detailShell()}`;
    initFilters(view);
    SIALCore.initTableExport();
    SIALCore.initStateActionConfirm();
    if (["materiales", "proveedoresMaster", "reglas", "pedidos"].includes(view)) {
      SIALCore.initEmbeddedForm({ panel: "#materialInlineForm", openButton: "[data-open-inline-form]", cancelButton: "[data-cancel-inline-form]", title: "[data-inline-form-title]" });
    }
    initActions();
  }

  return { init };
})();
