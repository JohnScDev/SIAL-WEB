(() => {
  "use strict";

  const qs = (selector, root = document) => root.querySelector(selector);
  const esc = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  const icon = (name) => {
    const paths = {
      alert: '<path d="M12 3 2 21h20L12 3Z"></path><path d="M12 9v5"></path><path d="M12 17h.01"></path>',
      clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
      flow: '<rect x="3" y="5" width="5" height="5" rx="1"></rect><rect x="16" y="14" width="5" height="5" rx="1"></rect><path d="M8 7.5h5a3 3 0 0 1 3 3V14"></path>',
      home: '<path d="m3 11 9-8 9 8"></path><path d="M5 10v10h14V10"></path><path d="M9 20v-6h6v6"></path>',
      chart: '<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15l3-4 3 2 5-7"></path>',
      box: '<path d="m21 8-9-5-9 5 9 5 9-5Z"></path><path d="M3 8v8l9 5 9-5V8"></path><path d="M12 13v8"></path>',
      truck: '<path d="M3 7h11v10H3z"></path><path d="M14 11h4l3 3v3h-7z"></path><circle cx="7" cy="18" r="2"></circle><circle cx="18" cy="18" r="2"></circle>',
      calendar: '<rect x="4" y="5" width="16" height="16" rx="2"></rect><path d="M8 3v4M16 3v4M4 11h16"></path>',
      shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path><path d="m9 12 2 2 4-5"></path>',
      port: '<path d="M4 20h16"></path><path d="M7 20V9l5-4 5 4v11"></path><path d="M9 13h6"></path>',
      arrow: '<path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path>',
      lock: '<rect x="5" y="10" width="14" height="11" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path>'
    };
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.home}</svg>`;
  };

  const modules = {
    planeacion: { label: "Planeación", icon: "calendar" },
    materiales: { label: "Materiales", icon: "box" },
    transporte: { label: "Transporte", icon: "truck" },
    puerto: { label: "Puerto", icon: "port" },
    trazabilidad: { label: "Trazabilidad", icon: "shield" }
  };

  const profiles = {
    materiales: {
      label: "Supervisor de materiales",
      scope: "Fincas asignadas",
      permissions: [
        "materiales:consultar", "materiales:validar", "materiales:aprobar",
        "trazabilidad:consultar"
      ]
    },
    logistico: {
      label: "Coordinador transporte y puerto",
      scope: "Transporte y puerto",
      permissions: [
        "transporte:consultar", "transporte:programar",
        "puerto:consultar", "puerto:gestionar",
        "trazabilidad:consultar", "trazabilidad:resolver"
      ]
    },
    planeacion: {
      label: "Planeador operativo",
      scope: "Semana 30 · Empresa activa",
      permissions: [
        "planeacion:consultar", "planeacion:editar",
        "materiales:consultar", "transporte:consultar"
      ]
    },
    auditor: {
      label: "Auditor de consulta",
      scope: "Empresa activa · Consulta",
      permissions: [
        "planeacion:consultar", "materiales:consultar",
        "transporte:consultar", "puerto:consultar",
        "trazabilidad:consultar"
      ]
    },
    administrador: {
      label: "Administrador operativo",
      scope: "Empresa activa · Todas las áreas",
      permissions: ["*"]
    }
  };

  const exceptions = [
    {
      module: "trazabilidad", permission: "trazabilidad:consultar", actionPermission: "trazabilidad:resolver",
      severity: "error", title: "Inspección NO APTO pendiente de resolución",
      detail: "Operación EXP-2026-0520 · Contenedor SIALB7654321",
      meta: "Hace 18 min · Zona Externa", action: "Resolver", href: "../Trazabilidad/auditoria-operativa.html"
    },
    {
      module: "materiales", permission: "materiales:consultar", actionPermission: "materiales:validar",
      severity: "error", title: "Stock insuficiente para pedido adicional",
      detail: "Finca El Retiro · 520 cajas solicitadas / 360 disponibles",
      meta: "Pedido PED-072 · Semana 30", action: "Validar pedido", href: "../Materiales%20y%20Suministros/gestion-pedidos-materiales.html"
    },
    {
      module: "transporte", permission: "transporte:consultar", actionPermission: "transporte:programar",
      severity: "warning", title: "Vehículo sin conductor asignado",
      detail: "CAM-102 · Programación hacia Finca Las Palmas",
      meta: "Salida prevista 10:30", action: "Programar", href: "../Gestion%20de%20Transporte/gestion-operaciones.html"
    },
    {
      module: "planeacion", permission: "planeacion:consultar", actionPermission: "planeacion:editar",
      severity: "warning", title: "Aviso requiere recalcular materiales",
      detail: "AC-2026-003 · Finca La Esperanza · 148 pallets",
      meta: "Modificado hoy 07:30", action: "Revisar aviso", href: "../Gestion%20de%20Planeacion/gestion-avisos-corte.html"
    },
    {
      module: "puerto", permission: "puerto:consultar", actionPermission: "puerto:gestionar",
      severity: "info", title: "Contenedor próximo a recepción",
      detail: "MSCU-481029-4 · Arribo estimado 11:20",
      meta: "Puerto ZE · Programado", action: "Ver programación", href: "../Gestion%20Operaciones%20Puerto/programacion-contenedores.html"
    }
  ];

  const agenda = [
    { time: "07:30", module: "planeacion", permission: "planeacion:consultar", severity: "warning", title: "Revisar aviso AC-2026-003", detail: "Cambio en pallets pendiente de recalcular materiales.", meta: "Finca La Esperanza" },
    { time: "08:40", module: "materiales", permission: "materiales:consultar", severity: "error", title: "Validación de pedido PED-072", detail: "Pedido adicional con cobertura de stock insuficiente.", meta: "Finca El Retiro" },
    { time: "09:15", module: "transporte", permission: "transporte:consultar", severity: "", title: "Salida programada TRK-421", detail: "Conductor Carlos Méndez · Destino Zona Externa.", meta: "Operación OP-001" },
    { time: "10:20", module: "puerto", permission: "puerto:consultar", severity: "", title: "Recepción de contenedor", detail: "MSCU-481029-4 inicia etapa de recepción.", meta: "Zona Externa" },
    { time: "11:00", module: "trazabilidad", permission: "trazabilidad:consultar", severity: "error", title: "Seguimiento de inspección bloqueada", detail: "Resultado NO APTO con evidencias pendientes.", meta: "EXP-2026-0520" }
  ];

  const tasks = [
    { module: "materiales", permission: "materiales:validar", title: "Validar 2 pedidos", detail: "Uno presenta stock insuficiente.", href: "../Materiales%20y%20Suministros/gestion-pedidos-materiales.html" },
    { module: "transporte", permission: "transporte:programar", title: "Asignar conductor", detail: "CAM-102 continúa sin responsable.", href: "../Gestion%20de%20Transporte/gestion-operaciones.html" },
    { module: "planeacion", permission: "planeacion:editar", title: "Confirmar recálculo", detail: "AC-2026-003 tiene cambios pendientes.", href: "../Gestion%20de%20Planeacion/gestion-avisos-corte.html" },
    { module: "trazabilidad", permission: "trazabilidad:resolver", title: "Resolver novedad", detail: "Inspección externa NO APTO.", href: "../Trazabilidad/auditoria-operativa.html" }
  ];

  const stages = [
    { module: "planeacion", permission: "planeacion:consultar", label: "Avisos de corte", value: 18, normal: 14, warning: 3, blocked: 1, detail: "Planeación semanal" },
    { module: "materiales", permission: "materiales:consultar", label: "Materiales", value: 12, normal: 8, warning: 3, blocked: 1, detail: "Pedidos vinculados" },
    { module: "transporte", permission: "transporte:consultar", label: "Transporte", value: 9, normal: 6, warning: 2, blocked: 1, detail: "Programaciones activas" },
    { module: "puerto", permission: "puerto:consultar", label: "Puerto", value: 7, normal: 5, warning: 1, blocked: 1, detail: "Contenedores en proceso" },
    { module: "trazabilidad", permission: "trazabilidad:consultar", label: "Cierre", value: 5, normal: 4, warning: 0, blocked: 1, detail: "Operaciones trazadas" }
  ];

  const contributions = [
    {
      module: "planeacion", permission: "planeacion:consultar",
      rows: [["Avisos activos", "18"], ["Cambios pendientes", "2"], ["En cargue", "3"]]
    },
    {
      module: "materiales", permission: "materiales:consultar",
      rows: [["Pedidos por validar", "2"], ["Stocks en revisión", "1"], ["Entregas sin comprobante", "2"]]
    },
    {
      module: "transporte", permission: "transporte:consultar",
      rows: [["Vehículos disponibles", "28"], ["Programaciones activas", "9"], ["Alertas documentales", "6"]]
    },
    {
      module: "puerto", permission: "puerto:consultar",
      rows: [["Contenedores esperados", "4"], ["En inspección", "2"], ["Bloqueados", "1"]]
    },
    {
      module: "trazabilidad", permission: "trazabilidad:consultar",
      rows: [["Eventos hoy", "31"], ["Novedades activas", "3"], ["Errores de sincronización", "1"]]
    }
  ];

  const quickActions = [
    { module: "planeacion", permission: "planeacion:editar", title: "Crear aviso de corte", detail: "Planeación", href: "../Gestion%20de%20Planeacion/gestion-avisos-corte.html" },
    { module: "materiales", permission: "materiales:validar", title: "Validar pedidos", detail: "Materiales", href: "../Materiales%20y%20Suministros/gestion-pedidos-materiales.html" },
    { module: "transporte", permission: "transporte:programar", title: "Programar vehículo", detail: "Transporte", href: "../Gestion%20de%20Transporte/inicio-operacion.html" },
    { module: "puerto", permission: "puerto:gestionar", title: "Gestionar recepción", detail: "Puerto", href: "../Gestion%20Operaciones%20Puerto/programacion-contenedores.html" },
    { module: "trazabilidad", permission: "trazabilidad:resolver", title: "Resolver novedades", detail: "Trazabilidad", href: "../Trazabilidad/auditoria-operativa.html" }
  ];

  const executiveMetrics = [
    { module: "planeacion", permission: "planeacion:consultar", label: "Pallets proyectados", value: "356", detail: "18 avisos activos", state: "success" },
    { module: "materiales", permission: "materiales:consultar", label: "Cobertura de materiales", value: "91%", detail: "1 stock en revisión", state: "warning" },
    { module: "transporte", permission: "transporte:consultar", label: "Disponibilidad de flota", value: "72%", detail: "28 de 39 vehículos", state: "success" },
    { module: "puerto", permission: "puerto:consultar", label: "Operaciones en tiempo", value: "86%", detail: "1 contenedor bloqueado", state: "warning" },
    { module: "trazabilidad", permission: "trazabilidad:consultar", label: "Eventos sincronizados", value: "97%", detail: "1 error pendiente", state: "warning" }
  ];

  const proposalMeta = {
    exceptions: {
      title: "Centro de control por excepciones",
      eyebrow: "Inicio / Propuesta 1",
      subtitle: "Muestra primero los pendientes que requieren atención o pueden detener la operación."
    },
    agenda: {
      title: "Mi jornada operativa",
      eyebrow: "Inicio / Propuesta 2",
      subtitle: "Organiza tus tareas y eventos del día en orden de atención."
    },
    tower: {
      title: "Torre de control logística",
      eyebrow: "Inicio / Propuesta 3",
      subtitle: "Muestra el avance de la operación en las etapas disponibles para ti."
    },
    personal: {
      title: "Mi inicio",
      eyebrow: "Inicio / Propuesta 4",
      subtitle: "Reúne tus accesos, pendientes y resultados en un solo lugar."
    },
    executive: {
      title: "Resumen ejecutivo",
      eyebrow: "Inicio / Propuesta 5",
      subtitle: "Resume los principales resultados y riesgos de las áreas que puedes consultar."
    }
  };

  let activeProfile = profiles[localStorage.getItem("sial-home-profile")] ? localStorage.getItem("sial-home-profile") : "materiales";

  function profile() {
    return profiles[activeProfile];
  }

  function can(permission) {
    return profile().permissions.includes("*") || profile().permissions.includes(permission);
  }

  function visibleModules() {
    return Object.keys(modules).filter((module) =>
      profile().permissions.some((permission) => permission === "*" || permission.startsWith(`${module}:`))
    );
  }

  const welcomeMessages = {
    materiales: "Pendientes y acciones de tus fincas asignadas.",
    logistico: "Movimientos y pendientes de transporte y puerto.",
    planeacion: "Planeación y pendientes de la semana 30.",
    auditor: "Información disponible de la empresa.",
    administrador: "Resumen de la operación de la empresa."
  };

  function renderWelcome() {
    const areaCount = visibleModules().length;
    return `
      <section class="home-welcome">
        <div>
          <h2>Buen día, ${esc(profile().label)}</h2>
          <p>${esc(welcomeMessages[activeProfile])}</p>
        </div>
        <span class="tag">${areaCount} ${areaCount === 1 ? "área disponible" : "áreas disponibles"}</span>
      </section>
    `;
  }
  function moduleTag(module) {
    return `<span class="tag">${esc(modules[module].label)}</span>`;
  }

  function emptyState() {
    return `
      <section class="home-empty" role="status">
        ${icon("lock")}
        <div>
          <h2>No hay información para mostrar</h2>
          <p>No tienes pendientes ni resultados disponibles en esta vista. Si esperabas ver otra área, consulta con el administrador.</p>
        </div>
      </section>
    `;
  }

  function renderKpis(items) {
    return `<div class="home-kpis" style="--metric-count:${items.length}">${items.map((item) => `
      <article class="home-kpi ${esc(item.state || "")}">
        <label>${esc(item.label)}</label>
        <strong>${esc(item.value)}</strong>
        <span>${esc(item.detail)}</span>
      </article>
    `).join("")}</div>`;
  }
  function renderExceptions() {
    const visible = exceptions.filter((item) => can(item.permission));
    if (!visible.length) return emptyState();
    const moduleRows = visibleModules().map((module) => {
      const count = visible.filter((item) => item.module === module).length;
      return `
        <div class="module-health-row">
          <div class="module-health-copy">
            <strong>${esc(modules[module].label)}</strong>
            <span>${count ? `${count} ${count === 1 ? "pendiente" : "pendientes"}` : "Sin pendientes"}</span>
          </div>
          <span class="status ${count ? "status-warning" : "status-active"}">${count ? "Atención" : "Estable"}</span>
        </div>
      `;
    }).join("");
    const critical = visible.filter((item) => item.severity === "error").length;
    return `
      ${renderKpis([
        { label: "Requieren atención", value: visible.length, detail: "Pendientes asignados", state: "warning" },
        { label: "Bloqueos", value: critical, detail: "Impedimentos operativos", state: critical ? "error" : "success" },
        { label: "Áreas con alertas", value: new Set(visible.map((item) => item.module)).size, detail: "Pendientes asignados", state: "warning" }
      ])}
      <section class="exception-layout">
        <div class="home-section">
          <div class="home-section-head"><div><h2>Requiere atención</h2><p>Ordenado por impacto operativo.</p></div><span class="chip home-count">${visible.length} pendientes</span></div>
          <div class="exception-list">${visible.map((item) => `
            <article class="exception-item ${esc(item.severity)}">
              <span class="exception-icon">${icon("alert")}</span>
              <div class="exception-copy">
                <div class="exception-head"><strong>${esc(item.title)}</strong>${moduleTag(item.module)}</div>
                <span>${esc(item.detail)}</span>
                <small>${esc(item.meta)}</small>
              </div>
              ${can(item.actionPermission)
                ? `<a class="btn btn-secondary exception-action" href="${esc(item.href)}">${esc(item.action)}</a>`
                : `<span class="status status-inactive exception-action">Solo consulta</span>`}
            </article>
          `).join("")}</div>
        </div>
        <aside class="module-health" aria-label="Estado por área">
          <div class="home-section-head"><div><h2>Estado por área</h2><p>Resumen de las áreas que puedes consultar.</p></div></div>
          ${moduleRows}
        </aside>
      </section>
    `;
  }

  function renderAgenda() {
    const visible = agenda.filter((item) => can(item.permission));
    const visibleTasks = tasks.filter((item) => can(item.permission));
    if (!visible.length && !visibleTasks.length) return emptyState();
    return `
      <section class="agenda-layout">
        <div class="home-section">
          <div class="home-section-head"><div><h2>Lunes, 27 de julio</h2><p>${visible.length} eventos programados · Próximo ${esc(visible[0]?.time || "sin programación")}</p></div><span class="chip">${visible.length} eventos</span></div>
          <div class="agenda-day">${visible.map((item) => `
            <article class="agenda-event ${esc(item.severity)}">
              <time class="agenda-time">${esc(item.time)}</time>
              <span class="agenda-dot" aria-hidden="true"></span>
              <div class="agenda-card">
                <strong>${esc(item.title)}</strong>
                <p>${esc(item.detail)}</p>
                <div class="agenda-meta">${moduleTag(item.module)}<span>${esc(item.meta)}</span></div>
              </div>
            </article>
          `).join("") || emptyState()}</div>
        </div>
        <aside class="task-stack" aria-label="Mis tareas">
          <div class="home-section-head"><div><h2>Mis tareas</h2><p>${visibleTasks.length} acciones disponibles.</p></div></div>
          ${visibleTasks.map((item) => `
            <div class="task-item">
              <div><strong>${esc(item.title)}</strong><span>${esc(item.detail)}</span></div>
              <a href="${esc(item.href)}">Abrir ${esc(modules[item.module].label)} ${icon("arrow")}</a>
            </div>
          `).join("") || '<p class="muted">No tienes tareas operativas asignadas.</p>'}
        </aside>
      </section>
    `;
  }
  function renderTower() {
    const visible = stages.filter((item) => can(item.permission));
    if (!visible.length) return emptyState();
    const blocked = visible.reduce((sum, item) => sum + item.blocked, 0);
    return `
      <div class="tower-summary">
        <span class="status status-active">${visible.length} etapas disponibles</span>
        <span class="tag tag-warning">${blocked} ${blocked === 1 ? "bloqueo" : "bloqueos"}</span>
        <span class="tower-context">Solo se muestran las etapas disponibles para ti.</span>
      </div>
      <section class="control-tower" style="--stage-count:${visible.length}" aria-label="Etapas de la operación">
        ${visible.map((item, index) => `
          <article class="tower-stage">
            <div class="stage-head"><span class="stage-index">${String(index + 1).padStart(2, "0")}</span>${moduleTag(item.module)}</div>
            <h2>${esc(item.label)}</h2>
            <p>${esc(item.detail)}</p>
            <div class="stage-value-line"><strong>${esc(item.value)}</strong><span>operaciones</span></div>
            <div class="stage-breakdown">
              <span>En curso <strong>${esc(item.normal)}</strong></span>
              <span>Con alerta <strong>${esc(item.warning)}</strong></span>
              ${item.blocked ? `<span class="blocked">Bloqueadas <strong>${esc(item.blocked)}</strong></span>` : ""}
            </div>
          </article>
        `).join("")}
      </section>
      <section class="tower-detail">
        <article class="card">
          <div class="card-header"><div><h2 class="card-title">Operaciones que requieren seguimiento</h2><p class="card-subtitle">Operaciones que necesitan revisión en estas etapas.</p></div></div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Operación</th><th>Etapa</th><th>Estado</th><th>Último evento</th></tr></thead>
              <tbody>
                ${visible.slice(0, 4).map((item, index) => `
                  <tr><td>OP-${String(index + 31).padStart(3, "0")}</td><td>${esc(item.label)}</td><td><span class="status ${item.blocked ? "status-inactive" : "status-warning"}">${item.blocked ? "Bloqueada" : "Seguimiento"}</span></td><td>Hoy ${8 + index}:2${index}</td></tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </article>
        <article class="module-health">
          <div class="home-section-head"><div><h2>Estado por etapa</h2><p>Resumen de la operación en cada etapa.</p></div></div>
          ${visible.map((item) => `<div class="module-health-row"><div class="module-health-copy"><strong>${esc(item.label)}</strong><span>${esc(item.normal)} en curso</span></div><span class="status ${item.blocked ? "status-warning" : "status-active"}">${item.blocked ? "Revisar" : "Estable"}</span></div>`).join("")}
        </article>
      </section>
    `;
  }
  function renderPersonal() {
    const visibleContributions = contributions.filter((item) => can(item.permission));
    const visibleActions = quickActions.filter((item) => can(item.permission));
    if (!visibleContributions.length && !visibleActions.length) return emptyState();
    return `
      ${visibleActions.length ? `
        <section class="home-section">
          <div class="home-section-head"><div><h2>Acciones disponibles</h2><p>Tareas que puedes realizar desde este inicio.</p></div></div>
          <div class="quick-actions">${visibleActions.map((item, index) => `
            <a class="quick-action ${index >= 3 ? "is-extra" : ""}" ${index >= 3 ? "hidden" : ""} href="${esc(item.href)}">
              <span class="quick-action-icon">${icon(modules[item.module].icon)}</span>
              <span><strong>${esc(item.title)}</strong><span>${esc(item.detail)}</span></span>
            </a>
          `).join("")}${visibleActions.length > 3 ? `<button class="btn btn-ghost quick-actions-more" type="button" data-toggle-actions aria-expanded="false">Ver ${visibleActions.length - 3} acciones más</button>` : ""}</div>
        </section>` : ""}
      <section class="personal-grid">
        <article class="module-summary">
          <div class="module-summary-head"><h2>Resumen por área</h2><p>Información de las áreas que puedes consultar.</p></div>
          ${visibleContributions.map((item) => `
            <div class="module-summary-row">
              <strong>${esc(modules[item.module].label)}</strong>
              ${item.rows.map(([label, value]) => `<span class="module-summary-value"><span>${esc(label)}</span><strong>${esc(value)}</strong></span>`).join("")}
            </div>
          `).join("")}
        </article>
        <article class="module-contribution recent-list">
          <div class="module-contribution-head"><h2>Actividad reciente</h2><p>Movimientos recientes de tus áreas.</p></div>
          ${visibleContributions.slice(0, 3).map((item, index) => `
            <div class="recent-row"><div><strong>${esc(modules[item.module].label)}</strong><span>Registro consultado o actualizado.</span></div><span>Hoy ${9 + index}:1${index}</span></div>
          `).join("")}
        </article>
      </section>
    `;
  }
  function renderExecutive() {
    const visible = executiveMetrics.filter((item) => can(item.permission));
    if (!visible.length) return emptyState();
    const charts = visible.map((item) => ({
      ...item,
      percent: [84, 91, 72, 86, 97][executiveMetrics.indexOf(item)],
      chartState: item.state
    }));
    const risks = exceptions.filter((item) => can(item.permission)).slice(0, 4);
    return `
      <section class="executive-strip" style="--metric-count:${visible.length}">
        ${visible.map((item) => `<article class="executive-metric"><label>${esc(item.label)}</label><strong>${esc(item.value)}</strong></article>`).join("")}
      </section>
      <section class="executive-grid">
        <article class="executive-panel">
          <h2>Cumplimiento por área</h2>
          <p>Comparación de las áreas que puedes consultar.</p>
          <div class="comparison-chart">${charts.map((item) => `
            <div class="comparison-row">
              <span>${esc(item.label)}</span>
              <div class="comparison-track" aria-label="${esc(item.label)} ${esc(item.percent)} por ciento"><div class="comparison-fill ${esc(item.chartState)}" style="width:${item.percent}%"></div></div>
              <strong>${item.percent}%</strong>
            </div>
          `).join("")}</div>
          <div class="permission-note executive-reading">${icon("chart")}<div><strong>${visible.length === Object.keys(modules).length ? "Resumen completo" : "Resumen disponible"}</strong><span>${visible.length === Object.keys(modules).length ? "Este resumen incluye todas las áreas de la operación." : `Este resumen incluye ${visible.length} de ${Object.keys(modules).length} áreas.`}</span></div></div>
        </article>
        <article class="executive-panel">
          <h2>Riesgos priorizados</h2>
          <p>Ordenados según la atención que requieren.</p>
          <div class="risk-ranking">${risks.map((item, index) => `
            <div class="risk-item"><span class="risk-rank">${index + 1}</span><div class="risk-copy"><strong>${esc(item.title)}</strong><span>${esc(modules[item.module].label)}</span></div><span class="status ${item.severity === "error" ? "status-inactive" : "status-warning"}">${item.severity === "error" ? "Alto" : "Medio"}</span></div>
          `).join("") || '<p class="muted">No hay riesgos para mostrar.</p>'}</div>
        </article>
      </section>
    `;
  }
  const renderers = {
    exceptions: renderExceptions,
    agenda: renderAgenda,
    tower: renderTower,
    personal: renderPersonal,
    executive: renderExecutive
  };

  function updateProfileUi() {
    const current = profile();
    const modulesVisible = visibleModules();
    qs("[data-profile-name]").textContent = current.label;
    qs("[data-profile-scope]").textContent = current.scope;
    qs("[data-access-summary]").textContent = modulesVisible.map((module) => modules[module].label).join(" · ");
    qs("[data-home-welcome]").innerHTML = renderWelcome();
    qs(".home-page > .permission-note")?.toggleAttribute("hidden", current.permissions.includes("*"));
    qs("[data-home-content]").innerHTML = renderers[document.body.dataset.homeProposal]?.() || emptyState();
  }

  function init() {
    const proposal = document.body.dataset.homeProposal || "exceptions";
    const meta = proposalMeta[proposal];
    qs("[data-page-eyebrow]").textContent = meta.eyebrow;
    qs("[data-page-title]").textContent = meta.title;
    qs("[data-page-subtitle]").textContent = meta.subtitle;

    const select = qs("[data-profile-select]");
    select.innerHTML = Object.entries(profiles).map(([value, item]) => `<option value="${esc(value)}">${esc(item.label)}</option>`).join("");
    select.value = activeProfile;
    select.addEventListener("change", () => {
      activeProfile = select.value;
      localStorage.setItem("sial-home-profile", activeProfile);
      updateProfileUi();
    });

    qs("[data-home-content]").addEventListener("click", (event) => {
      const toggle = event.target.closest("[data-toggle-actions]");
      if (!toggle) return;
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".quick-action.is-extra").forEach((action) => action.toggleAttribute("hidden", expanded));
      toggle.setAttribute("aria-expanded", String(!expanded));
      toggle.textContent = expanded ? `Ver ${document.querySelectorAll(".quick-action.is-extra").length} acciones más` : "Ver menos";
    });

    window.SIALCore?.initThemeToggle();
    window.SIALCore?.initSidebarToggle();
    updateProfileUi();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();





