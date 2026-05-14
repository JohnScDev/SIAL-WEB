const SIALIndicadores = (() => {
  const state = {
    module: "transporte",
    period: "semana",
    scenario: "base",
    threshold: 12,
    selectedId: ""
  };

  const modules = {
    transporte: {
      label: "Transporte",
      unit: "operaciones",
      mainLabel: "Vehiculos disponibles",
      riskLabel: "Riesgo documental",
      throughputLabel: "Traslados programados",
      qualityLabel: "Documentacion valida",
      principalLabel: "Disponible",
      target: 95,
      current: 88,
      projection: 91,
      availability: 84,
      risk: 18,
      throughput: 128,
      quality: 86,
      capacity: 78,
      resources: 31,
      warnings: 9,
      series: [42, 55, 64, 58, 72, 69, 81, 76, 88, 94, 91, 102],
      wait: [5, 18, 25, 21, 20, 8, 8, 10, 14, 3, 1, 0],
      processed: [68, 105, 84, 93, 47, 34, 35, 36, 28],
      pending: [16, 23, 25, 27, 12, 8, 7, 6, 5],
      hold: [0, 0, 0, 3, 0, 0, 1, 16, 2, 0, 0, 0],
      distribution: [46, 18, 28, 8],
      compare: [73, 64, 52],
      pairedA: [56, 78, 44, 68],
      pairedB: [72, 58, 82, 64],
      ranking: ["Transp. Norte", "AgroCeiba", "Ruta Puerto"],
      alertSeed: ["SOAT proximo a vencer", "Conductor sin licencia activa", "Vehiculo no disponible"]
    },
    puerto: {
      label: "Operaciones puerto",
      unit: "contenedores",
      mainLabel: "Contenedores disponibles",
      riskLabel: "Riesgo de inspeccion",
      throughputLabel: "Movimientos portuarios",
      qualityLabel: "Estados trazables",
      principalLabel: "Disponible",
      target: 93,
      current: 81,
      projection: 88,
      availability: 79,
      risk: 24,
      throughput: 96,
      quality: 82,
      capacity: 84,
      resources: 18,
      warnings: 11,
      series: [30, 44, 39, 52, 60, 57, 66, 74, 70, 83, 79, 92],
      wait: [7, 12, 16, 19, 18, 11, 9, 13, 17, 6, 2, 1],
      processed: [42, 58, 61, 73, 66, 52, 49, 56, 43],
      pending: [10, 17, 15, 22, 21, 12, 14, 16, 11],
      hold: [0, 2, 0, 5, 0, 1, 4, 18, 7, 0, 2, 0],
      distribution: [38, 22, 31, 9],
      compare: [62, 58, 47],
      pairedA: [48, 62, 58, 71],
      pairedB: [54, 76, 64, 68],
      ranking: ["Puerto Norte", "Cartagena", "Santa Marta"],
      alertSeed: ["Contenedor en inspeccion extendida", "Tipo de contenedor inactivo", "Puerto con estado pendiente"]
    },
    planeacion: {
      label: "Planeacion",
      unit: "semanas",
      mainLabel: "Semanas validas",
      riskLabel: "Riesgo de calendario",
      throughputLabel: "Semanas monitoreadas",
      qualityLabel: "Secuencia correcta",
      principalLabel: "Valida",
      target: 100,
      current: 96,
      projection: 98,
      availability: 96,
      risk: 8,
      throughput: 52,
      quality: 94,
      capacity: 66,
      resources: 7,
      warnings: 3,
      series: [8, 12, 18, 22, 25, 29, 34, 38, 42, 46, 50, 52],
      wait: [1, 2, 3, 2, 5, 3, 2, 4, 3, 1, 1, 0],
      processed: [6, 8, 10, 12, 14, 18, 20, 22, 24],
      pending: [1, 1, 2, 2, 3, 2, 2, 1, 1],
      hold: [0, 0, 0, 1, 0, 0, 0, 2, 1, 0, 0, 0],
      distribution: [78, 11, 8, 3],
      compare: [94, 88, 76],
      pairedA: [76, 84, 91, 96],
      pairedB: [80, 82, 89, 98],
      ranking: ["Calendario 2026", "Cintas activas", "Semana 18"],
      alertSeed: ["Secuencia con observacion", "Semana con nota operativa", "Cinta inactiva no asignable"]
    },
    fincas: {
      label: "Fincas",
      unit: "registros",
      mainLabel: "Fincas activas",
      riskLabel: "Riesgo de geodatos",
      throughputLabel: "Registros auditados",
      qualityLabel: "Datos completos",
      principalLabel: "Activa",
      target: 92,
      current: 84,
      projection: 89,
      availability: 87,
      risk: 16,
      throughput: 74,
      quality: 81,
      capacity: 71,
      resources: 14,
      warnings: 7,
      series: [18, 24, 28, 33, 31, 38, 44, 42, 49, 53, 57, 61],
      wait: [2, 4, 8, 9, 7, 6, 6, 8, 9, 3, 1, 0],
      processed: [22, 36, 40, 45, 39, 34, 31, 28, 24],
      pending: [7, 8, 11, 13, 9, 8, 8, 6, 5],
      hold: [0, 1, 0, 2, 0, 0, 1, 8, 2, 0, 0, 0],
      distribution: [64, 14, 16, 6],
      compare: [71, 63, 57],
      pairedA: [54, 66, 62, 74],
      pairedB: [61, 68, 72, 78],
      ranking: ["Grupo Costa Norte", "Sector Oriente", "Clase Premium"],
      alertSeed: ["Finca sin geolocalizacion", "Referencia sin version vigente", "Sector inactivo asociado"]
    },
    usuarios: {
      label: "Usuarios y empresas",
      unit: "usuarios",
      mainLabel: "Usuarios activos",
      riskLabel: "Riesgo de permisos",
      throughputLabel: "Cambios auditados",
      qualityLabel: "Asignacion completa",
      principalLabel: "Activo",
      target: 94,
      current: 86,
      projection: 90,
      availability: 89,
      risk: 14,
      throughput: 112,
      quality: 84,
      capacity: 69,
      resources: 22,
      warnings: 6,
      series: [24, 30, 38, 44, 41, 48, 51, 59, 57, 63, 68, 72],
      wait: [3, 6, 8, 11, 10, 5, 5, 7, 9, 4, 1, 0],
      processed: [31, 44, 52, 63, 58, 49, 43, 39, 35],
      pending: [8, 13, 17, 19, 14, 11, 9, 8, 6],
      hold: [0, 0, 1, 2, 0, 0, 1, 7, 3, 0, 0, 0],
      distribution: [68, 12, 15, 5],
      compare: [76, 59, 48],
      pairedA: [48, 58, 65, 74],
      pairedB: [52, 61, 70, 79],
      ranking: ["SIAL Central", "Operaciones TI", "Admin fincas"],
      alertSeed: ["Usuario sin empresa activa", "Rol critico sin revision", "Empresa inactiva con asignacion"]
    }
  };

  const periods = {
    semana: { label: "Semana actual", factor: 1, targetShift: 0, capacityShift: 0 },
    mes: { label: "Mes operativo", factor: 4, targetShift: -1, capacityShift: 4 },
    trimestre: { label: "Trimestre", factor: 12, targetShift: -2, capacityShift: 7 }
  };

  const scenarios = {
    base: { label: "Base", availability: 0, risk: 0, volume: 1, quality: 0, projection: 0, capacity: 0, wait: 1, pending: 1, hold: 1 },
    riesgo: { label: "Riesgo documental", availability: -7, risk: 18, volume: .94, quality: -8, projection: -8, capacity: 6, wait: 1.35, pending: 1.55, hold: 1.6 },
    alta: { label: "Alta demanda", availability: -4, risk: 9, volume: 1.28, quality: -4, projection: -3, capacity: 16, wait: 1.2, pending: 1.3, hold: 1.25 }
  };

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
  const pct = (value) => `${clamp(value)}%`;
  const signed = (value) => `${value > 0 ? "+" : ""}${Math.round(value)}%`;
  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char]));
  const metricId = (...parts) => parts.map((part) => String(part).toLowerCase().replace(/[^a-z0-9]+/g, "-")).join("-");

  function metricAttrs(id, title, value, copy, action) {
    const label = `${title}. ${value}. ${action}`;
    return `tabindex="0" role="button" data-metric-id="${esc(id)}" data-metric-title="${esc(title)}" data-metric-value="${esc(value)}" data-metric-copy="${esc(copy)}" data-metric-action="${esc(action)}" aria-label="${esc(label)}"`;
  }

  function compute() {
    const base = modules[state.module];
    const period = periods[state.period];
    const scenario = scenarios[state.scenario];
    const thresholdEffect = Math.max(-6, Math.min(8, 12 - Number(state.threshold)));
    const target = clamp(base.target + period.targetShift);
    const availability = clamp(base.availability + scenario.availability - thresholdEffect * .4);
    const risk = clamp(base.risk + scenario.risk + thresholdEffect);
    const quality = clamp(base.quality + scenario.quality - thresholdEffect * .3);
    const capacity = clamp(base.capacity + scenario.capacity + period.capacityShift + risk * .08);
    const throughput = Math.round(base.throughput * period.factor * scenario.volume);
    const current = clamp((availability * .34) + (quality * .28) + ((100 - risk) * .22) + (Math.min(120, throughput / (base.throughput * period.factor) * 100) * .16));
    const projection = clamp(base.projection + scenario.projection + (current - base.current) * .55 - risk * .04 + (100 - capacity) * .03);
    const gap = Math.round((projection - target) * 10) / 10;
    const riskLevel = getRiskLevel(risk, gap, capacity);
    return {
      base,
      period,
      scenario,
      target,
      availability,
      risk,
      quality,
      capacity,
      throughput,
      current,
      projection,
      gap,
      riskLevel,
      resources: Math.max(1, Math.round(base.resources * period.factor * (scenario.volume > 1 ? 1.1 : 1))),
      warnings: Math.max(0, Math.round((base.warnings + risk / 9 + thresholdEffect) * (scenario.pending || 1))),
      series: scaleSeries(base.series, period.factor, scenario.volume, risk),
      wait: scaleSeries(base.wait, 1, scenario.wait, risk * .1),
      processed: scaleSeries(base.processed, period.factor, scenario.volume, 0),
      pending: scaleSeries(base.pending, period.factor, scenario.pending, risk * .08),
      hold: scaleSeries(base.hold, 1, scenario.hold, risk * .05),
      distribution: computeDistribution(base.distribution, risk, availability),
      compare: base.compare.map((item, index) => clamp(item + scenario.quality - thresholdEffect - index * 2)),
      pairedA: base.pairedA.map((item) => clamp(item + scenario.quality - thresholdEffect)),
      pairedB: base.pairedB.map((item) => clamp(item + scenario.projection + 3)),
      ranking: computeRanking(base, risk, throughput),
      alerts: computeAlerts(base, risk, capacity, quality),
      riskMatrix: computeRiskMatrix(risk, capacity, state.threshold)
    };
  }

  function scaleSeries(values, periodFactor, scenarioFactor, extra) {
    return values.map((value, index) => Math.max(0, Math.round((value * periodFactor * scenarioFactor) + extra + (index % 4 === 0 ? extra * .25 : 0))));
  }

  function computeDistribution(baseDistribution, risk, availability) {
    const blocked = clamp(baseDistribution[3] + risk * .08, 0, 35);
    const review = clamp(baseDistribution[1] + risk * .06, 0, 40);
    const transit = clamp(baseDistribution[2] + (100 - availability) * .04, 0, 45);
    const available = clamp(100 - review - transit - blocked, 0, 100);
    return [available, review, transit, blocked];
  }

  function computeRanking(base, risk, throughput) {
    return base.ranking.map((name, index) => ({
      name,
      value: Math.max(1, Math.round((throughput / (index + 2)) + risk * (index + 1)))
    }));
  }

  function computeAlerts(base, risk, capacity, quality) {
    const severity = risk >= 38 || capacity >= 86 ? "error" : risk >= 22 ? "warning" : "ok";
    return [
      { type: severity, title: base.alertSeed[0], copy: `${Math.round(risk)}% de riesgo requiere seguimiento.` },
      { type: capacity >= 82 ? "warning" : "ok", title: base.alertSeed[1], copy: `${Math.round(capacity)}% de capacidad usada.` },
      { type: quality < 82 ? "error" : "ok", title: base.alertSeed[2], copy: `${Math.round(quality)}% de calidad de dato.` }
    ];
  }

  function computeRiskMatrix(risk, capacity, threshold) {
    const base = Math.max(0, Math.round((risk + capacity - threshold) / 18));
    return [
      [base + 1, base + 3, base + 5],
      [Math.max(0, base - 1), base + 2, base + 4],
      [Math.max(0, base - 2), Math.max(0, base - 1), base + 1]
    ];
  }

  function getRiskLevel(risk, gap, capacity) {
    if (risk >= 38 || gap <= -8 || capacity >= 90) return "alto";
    if (risk >= 22 || gap <= -3 || capacity >= 78) return "medio";
    return "bajo";
  }

  function render() {
    const data = compute();
    renderHeader(data);
    renderInsights(data);
    renderKpis(data);
    renderHero(data);
    renderGauges(data);
    renderTargets(data);
    renderCapacity(data);
    renderLineChart(data);
    renderColumnChart(qs("[data-wait-chart]"), data.wait, "wait");
    renderStackedChart(data);
    renderColumnChart(qs("[data-hold-chart]"), data.hold, "hold");
    renderRiskMatrix(data);
    renderVisuals(data);
    renderRanking(data);
    renderAlerts(data);
    renderPaired(data);
    renderTable(data);
    applyStaticInteractivity(data);
    refreshSelectedMetric(data);
  }

  function renderHeader(data) {
    qs("[data-threshold-label]").textContent = String(state.threshold);
    qs("[data-period-label]").textContent = data.period.label;
    qs("[data-updated-at]").textContent = `Actualizado ${new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}`;
  }

  function renderInsights(data) {
    const moduleName = data.base.label;
    const riskText = data.riskLevel === "alto" ? "La operacion requiere intervencion prioritaria." :
      data.riskLevel === "medio" ? "La operacion esta controlada con alertas activas." :
        "La operacion se mantiene dentro del rango esperado.";
    const cause = `En ${moduleName}, la proyeccion queda en ${pct(data.projection)} frente a una meta de ${pct(data.target)} y capacidad de ${pct(data.capacity)}.`;
    const action = data.riskLevel === "alto" ? "Bloquear nuevas asignaciones sensibles y resolver alertas criticas." :
      data.riskLevel === "medio" ? "Revisar alertas antes del cierre y proteger recursos disponibles." :
        "Mantener monitoreo y validar trazabilidad del periodo.";
    const risk = data.riskLevel === "alto" ? "Puede generar incumplimiento o registros no asignables." :
      data.riskLevel === "medio" ? "Puede aumentar la brecha si sube la demanda." :
        "Riesgo bajo si se conserva la calidad de datos.";
    qs("[data-main-insight]").textContent = riskText;
    qs("[data-main-cause]").textContent = cause;
    qs("[data-main-action]").textContent = action;
    qs("[data-action-detail]").textContent = `Atiende primero ${data.alerts[0].title.toLowerCase()} y revisa la matriz de riesgo.`;
    qs("[data-main-risk]").textContent = risk;
    qs("[data-risk-detail]").textContent = `${data.warnings} alertas quedan priorizadas con umbral ${state.threshold}%.`;
  }

  function renderKpis(data) {
    const kpis = {
      availability: { label: data.base.mainLabel, value: pct(data.availability), delta: signed(data.availability - data.base.availability), copy: `${data.resources} recursos o registros disponibles para operar.`, foot: "vs. linea base", state: data.availability >= 85 ? "Operable" : "Revisar" },
      risk: { label: data.base.riskLabel, value: pct(data.risk), delta: `${data.warnings}`, copy: `${data.warnings} alertas priorizadas por umbral y escenario.`, foot: "alertas priorizadas", state: data.risk >= 35 ? "Alto" : data.risk >= 20 ? "Revision" : "Controlado" },
      throughput: { label: data.base.throughputLabel, value: String(data.throughput), delta: signed((data.throughput / (data.base.throughput * data.period.factor) - 1) * 100), copy: `${data.throughput} ${data.base.unit} en ${data.period.label.toLowerCase()}.`, foot: "tendencia del periodo", state: "Actividad" },
      quality: { label: data.base.qualityLabel, value: pct(data.quality), delta: signed(data.quality - data.base.quality), copy: "Evalua completitud, trazabilidad y reglas de negocio.", foot: "sin observacion QA", state: data.quality >= 86 ? "Valido" : "Observado" }
    };
    Object.entries(kpis).forEach(([key, item]) => {
      qs(`[data-kpi-label="${key}"]`).textContent = item.label;
      qs(`[data-kpi-value="${key}"]`).textContent = item.value;
      qs(`[data-kpi-copy="${key}"]`).textContent = item.copy;
      qs(`[data-kpi-foot="${key}"]`).textContent = item.foot;
      qs(`[data-kpi-state="${key}"]`).textContent = item.state;
      setDelta(qs(`[data-kpi-delta="${key}"]`), item.delta, key === "risk" ? -Number(item.delta) : Number.parseFloat(item.delta));
    });
  }

  function renderHero(data) {
    qs("[data-hero-projection]").textContent = pct(data.projection);
    qs("[data-hero-copy]").textContent = `${data.base.label}: proyeccion de cierre con escenario ${data.scenario.label.toLowerCase()}.`;
    qs("[data-hero-target]").textContent = pct(data.target);
    qs("[data-hero-current]").textContent = pct(data.current);
    qs("[data-hero-gap]").textContent = `${data.gap > 0 ? "+" : ""}${data.gap}%`;
    qs("[data-hero-status]").textContent = data.projection >= data.target ? "Cumple meta" : "Brecha activa";
    qs("[data-hero-risk]").textContent = data.riskLevel === "alto" ? "Riesgo alto" : data.riskLevel === "medio" ? "Riesgo medio" : "Riesgo bajo";
    qs("[data-hero-foot]").textContent = data.gap < 0 ? `Faltan ${Math.abs(data.gap)} puntos para cumplir la meta.` : `Supera la meta por ${data.gap} puntos.`;
    qs("[data-projection-fill]").style.width = pct(data.projection);
    const marker = qs("[data-projection-marker]");
    marker.style.left = pct(data.target);
    marker.textContent = `Meta ${pct(data.target)}`;
    setDelta(qs("[data-hero-risk]"), qs("[data-hero-risk]").textContent, data.riskLevel === "alto" ? -1 : data.riskLevel === "medio" ? 0 : 1);
  }

  function renderGauges(data) {
    const gauges = [
      { label: "Cumplimiento", value: data.projection, color: "var(--color-primary-500)", action: data.projection >= data.target ? "Conservar controles de cierre." : "Revisar brecha frente a meta." },
      { label: "Riesgo", value: data.risk, color: data.risk >= 35 ? "var(--color-error-main)" : "var(--color-warning-main)", action: data.risk >= 35 ? "Atender bloqueos antes de nuevas asignaciones." : "Mantener seguimiento de alertas." },
      { label: "Capacidad", value: data.capacity, color: data.capacity >= 86 ? "var(--color-error-main)" : "var(--color-success-main)", action: data.capacity >= 86 ? "Redistribuir carga operativa." : "Capacidad en rango monitoreable." }
    ];
    qs("[data-gauge-grid]").innerHTML = gauges.map((gauge) => `
      <div class="projection-gauge interactive-metric" style="--gauge-value: ${pct(gauge.value)}; --gauge-color: ${gauge.color};" ${metricAttrs(metricId("gauge", gauge.label), gauge.label, pct(gauge.value), `${data.base.label}: lectura de ${gauge.label.toLowerCase()} en ${data.period.label.toLowerCase()}.`, gauge.action)}>
        <span><strong>${pct(gauge.value)}</strong><small>${esc(gauge.label)}</small></span>
      </div>
    `).join("");
  }

  function renderTargets(data) {
    const rows = [
      ["Meta", data.target, "target"],
      ["Avance actual", data.current, "current"],
      ["Proyeccion cierre", data.projection, "projected"]
    ];
    qs("[data-target-comparison]").innerHTML = rows.map(([label, value, type]) => `
      <div class="target-row interactive-metric" ${metricAttrs(metricId("target", type), label, pct(value), `${data.base.label}: comparativo de meta y avance para ${data.period.label.toLowerCase()}.`, type === "target" ? "Usar como referencia de cumplimiento." : value >= data.target ? "Mantener controles del periodo." : "Revisar brecha y recursos disponibles.")}>
        <span>${label}</span>
        <div class="target-track"><span class="target-bar ${type}" style="width: ${pct(value)}"></span></div>
        <strong>${pct(value)}</strong>
      </div>
    `).join("");
    qs("[data-gap-note]").textContent = data.gap < 0
      ? `La brecha de ${Math.abs(data.gap)} puntos requiere accion antes del cierre.`
      : `La proyeccion supera la meta; conservar controles para evitar regresion.`;
  }

  function renderCapacity(data) {
    qs("[data-capacity-fill]").style.width = pct(data.capacity);
    const pointer = qs("[data-capacity-pointer]");
    pointer.style.left = pct(data.capacity);
    pointer.textContent = pct(data.capacity);
    const status = qs("[data-capacity-status]");
    status.textContent = data.capacity >= 90 ? "Critica" : data.capacity >= 78 ? "Alta" : "Operable";
    status.className = data.capacity >= 90 ? "status status-inactive" : "status status-active";
    qs("[data-capacity-summary]").innerHTML = `
      <div class="interactive-metric" ${metricAttrs("capacity-throughput", "Volumen del periodo", String(data.throughput), `${data.base.unit} calculados para ${data.period.label.toLowerCase()}.`, "Validar contra capacidad y responsables.")}><strong>${data.throughput}</strong><span>${data.base.unit} del periodo</span></div>
      <div class="interactive-metric" ${metricAttrs("capacity-resources", "Recursos por confirmar", String(data.resources), "Recursos disponibles o pendientes de confirmacion.", "Confirmar disponibilidad antes de nuevas asignaciones.")}><strong>${data.resources}</strong><span>recursos por confirmar</span></div>
      <div class="interactive-metric" ${metricAttrs("capacity-warnings", "Alertas de saturacion", String(data.warnings), "Alertas asociadas a capacidad, riesgo y umbral.", data.warnings > 0 ? "Priorizar alertas con impacto operativo." : "Mantener monitoreo sin accion correctiva.")}><strong>${data.warnings}</strong><span>alertas de saturacion</span></div>
    `;
  }

  function renderLineChart(data) {
    const values = data.series;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const points = values.map((value, index) => {
      const x = 20 + (index * (280 / (values.length - 1)));
      const y = 120 - ((value - min) / Math.max(1, max - min)) * 92;
      return [Math.round(x), Math.round(y), value];
    });
    const pointText = points.map(([x, y]) => `${x},${y}`).join(" ");
    const areaText = `${pointText} 300,120 20,120`;
    const peak = points.reduce((acc, point) => point[2] > acc[2] ? point : acc, points[0]);
    qs("[data-line-title]").textContent = `${data.base.throughputLabel} por fecha`;
    qs("[data-line-caption]").textContent = data.period.label;
    qs("[data-line-chart]").innerHTML = `
      <line class="chart-grid-line" x1="20" y1="120" x2="300" y2="120"></line>
      <line class="chart-grid-line" x1="20" y1="80" x2="300" y2="80"></line>
      <line class="chart-grid-line" x1="20" y1="40" x2="300" y2="40"></line>
      <line class="chart-focus-line" x1="${peak[0]}" y1="24" x2="${peak[0]}" y2="124"></line>
      <polygon class="chart-area-fill" points="${areaText}"></polygon>
      <polyline class="chart-line-primary" points="${pointText}"></polyline>
      <circle class="chart-dot-warning" cx="${peak[0]}" cy="${peak[1]}" r="5"></circle>
      <text class="chart-axis-label" x="${Math.max(20, peak[0] - 12)}" y="${Math.max(18, peak[1] - 10)}">${peak[2]}</text>
    `;
    qs("[data-line-reading]").textContent = `Pico de ${peak[2]} ${data.base.unit}.`;
    qs("[data-line-action]").textContent = peak[2] > data.throughput / data.series.length * 1.2
      ? "El pico requiere validar capacidad y responsables del turno."
      : "La serie no presenta picos fuera del comportamiento esperado.";
  }

  function renderColumnChart(container, values, type) {
    const max = Math.max(...values, 1);
    container.innerHTML = values.map((value, index) => {
      const height = Math.max(4, Math.round(value / max * 88));
      const hour = index + 6;
      const title = type === "wait" ? `Espera ${hour}:00` : `Retencion ${hour}:00`;
      const action = value > (type === "wait" ? 18 : 8)
        ? "Revisar causa operativa y responsable de turno."
        : "Mantener monitoreo de comportamiento horario.";
      return `<span class="interactive-bar interactive-metric" style="--h: ${height}%" data-value="${value}" data-label="${hour}:00" ${metricAttrs(metricId(type, hour), title, `${value} min`, `Lectura horaria para ${title.toLowerCase()}.`, action)}><strong>${value}</strong><em>${hour}</em></span>`;
    }).join("");
    const peak = values.reduce((acc, value, index) => value > acc.value ? { value, index } : acc, { value: values[0], index: 0 });
    const prefix = type === "wait" ? "wait" : "hold";
    qs(`[data-${prefix}-reading]`).textContent = `${type === "wait" ? "Mayor espera" : "Mayor retencion"} a las ${peak.index + 6}:00 con ${peak.value} min.`;
    qs(`[data-${prefix}-action]`).textContent = peak.value > (type === "wait" ? 18 : 8)
      ? "Requiere revisar causa operativa y responsable de turno."
      : "Se mantiene en rango de seguimiento.";
  }

  function renderStackedChart(data) {
    const processed = data.processed;
    const pending = data.pending;
    const max = Math.max(...processed.map((value, index) => value + pending[index]), 1);
    qs("[data-stacked-chart]").innerHTML = processed.map((value, index) => {
      const totalHeight = Math.round((value + pending[index]) / max * 92);
      const pendingRatio = Math.round(pending[index] / Math.max(1, value + pending[index]) * 100);
      const answeredRatio = Math.max(8, 100 - pendingRatio);
      const hour = index + 8;
      const total = value + pending[index];
      const action = pending[index] > value * .25 ? "Redistribuir atencion para reducir cola pendiente." : "Mantener ritmo de atencion.";
      return `<span class="interactive-bar interactive-metric" style="height: ${totalHeight}%; --answered: ${answeredRatio}%; --pending: ${pendingRatio}%" data-value="${total}" data-label="${hour}:00" ${metricAttrs(metricId("stacked", hour), `Atencion ${hour}:00`, `${total} registros`, `${value} procesadas y ${pending[index]} pendientes.`, action)}><strong>${value}</strong><em>${hour}</em></span>`;
    }).join("");
    const pendingTotal = pending.reduce((sum, item) => sum + item, 0);
    qs("[data-stacked-reading]").textContent = `${pendingTotal} pendientes acumulados.`;
    qs("[data-stacked-action]").textContent = pendingTotal > data.throughput * .15
      ? "La cola pendiente puede afectar cierre y requiere redistribucion."
      : "Pendientes dentro de tolerancia del periodo.";
  }

  function renderRiskMatrix(data) {
    const labels = ["Impacto alto", "Impacto medio", "Impacto bajo"];
    const probabilityLabels = ["Probabilidad baja", "Probabilidad media", "Probabilidad alta"];
    const matrix = qs("[data-risk-matrix]");
    matrix.classList.toggle("is-high", data.riskLevel === "alto");
    matrix.innerHTML = `
      <div class="risk-matrix-head" role="row">
        <span></span>
        <strong role="columnheader">Bajo</strong>
        <strong role="columnheader">Medio</strong>
        <strong role="columnheader">Alto</strong>
      </div>
      ${data.riskMatrix.map((row, rowIndex) => `
        <div class="risk-matrix-row" role="row">
          <strong role="rowheader">${labels[rowIndex]}</strong>
          ${row.map((value, colIndex) => {
            const title = `${labels[rowIndex]} / ${probabilityLabels[colIndex].toLowerCase()}`;
            const action = value >= 8 ? "Escalar revision y bloquear asignaciones sensibles." : value >= 4 ? "Programar seguimiento del responsable." : "Mantener control operativo.";
            return `<span class="risk-cell ${riskCellClass(rowIndex, colIndex, value)} interactive-metric" ${metricAttrs(metricId("risk", rowIndex, colIndex), title, `${value} eventos`, `Cruce de impacto y probabilidad para ${data.base.label}.`, action)}>${value}</span>`;
          }).join("")}
        </div>
      `).join("")}
    `;
  }

  function riskCellClass(rowIndex, colIndex, value) {
    if (rowIndex === 0 && colIndex >= 1) return "danger";
    if (value >= 5 || (rowIndex === 1 && colIndex === 2)) return "danger";
    if (value >= 3 || rowIndex + colIndex >= 2) return "warning";
    return "ok";
  }

  function renderVisuals(data) {
    const [main, review, transit, blocked] = data.distribution;
    const donut = qs("[data-donut]");
    const radial = qs("[data-radial]");
    donut.style.background = `conic-gradient(var(--color-primary-500) 0 ${main}%, var(--color-warning-main) ${main}% ${main + review}%, var(--color-info-main) ${main + review}% ${main + review + transit}%, var(--color-error-main) ${main + review + transit}% 100%)`;
    qs("[data-donut-value]").textContent = pct(main);
    qs("[data-donut-label]").textContent = data.base.principalLabel;
    radial.style.background = `conic-gradient(var(--color-primary-500) 0 ${data.projection}%, var(--color-error-main) ${data.projection}% ${Math.min(100, data.projection + data.risk / 2)}%, var(--color-bar-bg) ${Math.min(100, data.projection + data.risk / 2)}% 100%)`;
    qs("[data-radial-value]").textContent = pct(data.projection);
    setMetricMetadata(donut, {
      id: "distribution-main",
      title: "Distribucion principal",
      value: pct(main),
      copy: `${pct(review)} en revision, ${pct(transit)} en transito y ${pct(blocked)} bloqueado.`,
      action: blocked > 8 ? "Revisar bloqueos antes de asignar nuevos registros." : "Mantener seguimiento de estados."
    });
    setMetricMetadata(radial, {
      id: "radial-score",
      title: "Score operativo",
      value: pct(data.projection),
      copy: `Score calculado con proyeccion ${pct(data.projection)} y riesgo ${pct(data.risk)}.`,
      action: data.projection >= data.target ? "Conservar controles actuales." : "Aplicar acciones de cierre por brecha activa."
    });
    qs("[data-split-bars]").innerHTML = data.compare.map((value, index) => {
      const complement = clamp(100 - value);
      const title = `Comparativo linea ${index + 1}`;
      return `<span class="interactive-metric" style="--a: ${value}%; --b: ${complement}%" ${metricAttrs(metricId("split", index + 1), title, pct(value), `${pct(complement)} queda como brecha o pendiente de comparacion.`, value >= 75 ? "Mantener comportamiento de referencia." : "Revisar causa de la brecha.")}><strong>${value}%</strong></span>`;
    }).join("");
  }

  function renderRanking(data) {
    qs("[data-ranking-list]").innerHTML = data.ranking.map((item, index) => `
      <li class="interactive-metric" ${metricAttrs(metricId("ranking", index + 1), `Ranking ${index + 1}: ${item.name}`, String(item.value), "Entidad priorizada por volumen, riesgo o brecha.", index === 0 ? "Revisar primero en la reunion operativa." : "Mantener en seguimiento.")}>
        <span>${esc(item.name)}</span><strong>${item.value}</strong>
      </li>
    `).join("");
  }

  function renderAlerts(data) {
    qs("[data-alert-feed]").innerHTML = data.alerts.map((alert, index) => `
      <div class="alert-feed-item ${alert.type} interactive-metric" ${metricAttrs(metricId("alert", index + 1), alert.title, alert.type === "error" ? "Bloqueo" : alert.type === "warning" ? "Revision" : "Controlado", alert.copy, alert.type === "error" ? "Atender antes de continuar la operacion." : alert.type === "warning" ? "Programar revision responsable." : "Mantener monitoreo.")}>
        <strong>${esc(alert.title)}</strong>
        <span>${esc(alert.copy)}</span>
      </div>
    `).join("");
  }

  function renderPaired(data) {
    qs("[data-paired-bars]").innerHTML = data.pairedA.map((value, index) => {
      const reference = data.pairedB[index];
      return `<span class="interactive-metric" style="--a: ${value}%; --b: ${reference}%" ${metricAttrs(metricId("paired", index + 1), `Periodo ${index + 1}`, `${value}% / ${reference}%`, `Actual ${pct(value)} frente a referencia ${pct(reference)}.`, reference >= value ? "Revisar diferencia contra referencia." : "Conservar desempeno actual.")}></span>`;
    }).join("");
    const avgA = Math.round(data.pairedA.reduce((sum, item) => sum + item, 0) / data.pairedA.length);
    const avgB = Math.round(data.pairedB.reduce((sum, item) => sum + item, 0) / data.pairedB.length);
    qs("[data-paired-reading]").textContent = avgB >= avgA
      ? `La referencia supera al actual por ${avgB - avgA} puntos promedio.`
      : `El actual supera la referencia por ${avgA - avgB} puntos promedio.`;
  }

  function renderTable(data) {
    const rows = [
      ["Proyeccion", pct(data.projection), data.riskLevel, data.gap < 0 ? `Brecha de ${Math.abs(data.gap)} puntos frente a meta.` : "Meta cubierta en proyeccion.", data.gap < 0 ? "Ajustar recursos y resolver alertas." : "Mantener controles."],
      ["Riesgo", pct(data.risk), data.risk >= 35 ? "alto" : data.risk >= 20 ? "medio" : "bajo", `${data.warnings} alertas quedan dentro del umbral.`, "Priorizar matriz de impacto alto."],
      ["Capacidad", pct(data.capacity), data.capacity >= 90 ? "alto" : data.capacity >= 78 ? "medio" : "bajo", "Mide saturacion operativa proyectada.", data.capacity >= 78 ? "Redistribuir carga antes del cierre." : "Monitorear tendencia."],
      ["Calidad", pct(data.quality), data.quality >= 86 ? "bajo" : "medio", "Mide completitud y trazabilidad del dato.", data.quality < 86 ? "Corregir datos observados." : "Conservar validaciones."]
    ];
    qs("[data-detail-table]").innerHTML = rows.map(([name, value, status, meaning, action]) => `
      <tr class="interactive-metric" ${metricAttrs(metricId("detail", name), name, value, meaning, action)}>
        <td><strong>${name}</strong></td>
        <td>${value}</td>
        <td>${statusBadge(status)}</td>
        <td>${meaning}</td>
        <td>${action}</td>
      </tr>
    `).join("");
  }

  function setMetricMetadata(element, metric) {
    if (!element || !metric) return;
    element.classList.add("interactive-metric");
    element.tabIndex = 0;
    element.setAttribute("role", "button");
    element.dataset.metricId = metric.id;
    element.dataset.metricTitle = metric.title;
    element.dataset.metricValue = metric.value;
    element.dataset.metricCopy = metric.copy;
    element.dataset.metricAction = metric.action;
    element.setAttribute("aria-label", `${metric.title}. ${metric.value}. ${metric.action}`);
  }

  function applyStaticInteractivity(data) {
    const metricMap = {
      availability: {
        title: data.base.mainLabel,
        value: pct(data.availability),
        copy: `${data.resources} recursos o registros disponibles para operar en ${data.period.label.toLowerCase()}.`,
        action: data.availability >= 85 ? "Disponible para asignacion controlada." : "Revisar disponibilidad antes de asignar."
      },
      risk: {
        title: data.base.riskLabel,
        value: pct(data.risk),
        copy: `${data.warnings} alertas priorizadas con umbral ${state.threshold}%.`,
        action: data.risk >= 35 ? "Atender bloqueos y escalar responsables." : "Mantener seguimiento de alertas."
      },
      throughput: {
        title: data.base.throughputLabel,
        value: String(data.throughput),
        copy: `${data.throughput} ${data.base.unit} calculados para ${data.period.label.toLowerCase()}.`,
        action: "Cruzar volumen con capacidad y alertas antes del cierre."
      },
      quality: {
        title: data.base.qualityLabel,
        value: pct(data.quality),
        copy: "Evalua completitud, trazabilidad y reglas de negocio.",
        action: data.quality >= 86 ? "Conservar validaciones actuales." : "Corregir datos observados y validar auditoria."
      },
      projection: {
        title: "Indicador ejecutivo",
        value: pct(data.projection),
        copy: `Meta ${pct(data.target)}, avance ${pct(data.current)} y brecha ${data.gap > 0 ? "+" : ""}${data.gap} puntos.`,
        action: data.gap < 0 ? "Ajustar recursos y resolver alertas de mayor impacto." : "Mantener controles para evitar regresion."
      },
      capacity: {
        title: "Capacidad y saturacion",
        value: pct(data.capacity),
        copy: `${data.throughput} ${data.base.unit}, ${data.resources} recursos y ${data.warnings} alertas.`,
        action: data.capacity >= 78 ? "Redistribuir carga operativa antes del cierre." : "Capacidad en rango de seguimiento."
      },
      line: {
        title: qs("[data-line-title]")?.textContent || "Comportamiento por fecha",
        value: qs("[data-line-reading]")?.textContent || pct(data.projection),
        copy: qs("[data-line-action]")?.textContent || "Lectura de serie operativa.",
        action: "Usar el pico para definir responsables y capacidad."
      },
      wait: {
        title: "Tiempo de espera por hora",
        value: qs("[data-wait-reading]")?.textContent || "Sin pico",
        copy: qs("[data-wait-action]")?.textContent || "Lectura horaria de espera.",
        action: "Selecciona una barra para ver el detalle por hora."
      },
      stacked: {
        title: "Atencion por hora",
        value: qs("[data-stacked-reading]")?.textContent || "Sin acumulado",
        copy: qs("[data-stacked-action]")?.textContent || "Lectura de procesadas y pendientes.",
        action: "Selecciona una barra para revisar la cola horaria."
      },
      hold: {
        title: "Retencion por hora",
        value: qs("[data-hold-reading]")?.textContent || "Sin retencion",
        copy: qs("[data-hold-action]")?.textContent || "Lectura horaria de retencion.",
        action: "Selecciona una barra para ubicar el pico."
      }
    };

    qsa("[data-static-metric]").forEach((element) => {
      const key = element.dataset.staticMetric;
      if (metricMap[key]) setMetricMetadata(element, { id: key, ...metricMap[key] });
    });
  }

  function refreshSelectedMetric(data) {
    const selected = state.selectedId ? qsa(".interactive-metric").find((item) => item.dataset.metricId === state.selectedId) : null;
    if (selected) {
      updateSelectedPanel(selected);
      markSelected(selected);
      return;
    }
    updateSelectedPanel({
      dataset: {
        metricTitle: "Lectura del escenario",
        metricValue: `${data.base.label} / ${data.period.label}`,
        metricCopy: `Proyeccion ${pct(data.projection)}, riesgo ${pct(data.risk)} y capacidad ${pct(data.capacity)} con escenario ${data.scenario.label.toLowerCase()}.`,
        metricAction: data.riskLevel === "alto" ? "Atender bloqueos operativos." : "Monitorear indicadores accionables."
      }
    });
    markSelected(null);
  }

  function updateSelectedPanel(metricElement) {
    qs("[data-selected-title]").textContent = metricElement.dataset.metricTitle || "Indicador seleccionado";
    qs("[data-selected-copy]").textContent = metricElement.dataset.metricCopy || "Lectura contextual pendiente.";
    qs("[data-selected-value]").textContent = metricElement.dataset.metricValue || "Sin valor";
    qs("[data-selected-action]").textContent = metricElement.dataset.metricAction || "Sin accion";
  }

  function markSelected(metricElement) {
    qsa(".interactive-metric.is-selected").forEach((item) => item.classList.remove("is-selected"));
    metricElement?.classList.add("is-selected");
  }

  function selectMetric(metricElement, options = {}) {
    if (!metricElement?.dataset?.metricTitle) return;
    state.selectedId = metricElement.dataset.metricId || "";
    updateSelectedPanel(metricElement);
    markSelected(metricElement);
    if (options.silent) return;
    showToast(`${metricElement.dataset.metricTitle}: ${metricElement.dataset.metricValue}.`);
  }

  function statusBadge(status) {
    if (status === "alto") return `<span class="status status-inactive">Alto</span>`;
    if (status === "medio") return `<span class="tag tag-warning">Medio</span>`;
    return `<span class="tag tag-success">Bajo</span>`;
  }

  function setDelta(element, text, numeric) {
    element.textContent = text;
    element.classList.remove("is-positive", "is-warning", "is-negative");
    element.classList.add(numeric > 0 ? "is-positive" : numeric < 0 ? "is-negative" : "is-warning");
  }

  function showToast(message) {
    const toast = qs("[data-toast]");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function bindEvents() {
    qsa("[data-control]").forEach((control) => {
      control.addEventListener("input", () => {
        state[control.dataset.control] = control.type === "range" ? Number(control.value) : control.value;
        render();
      });
      control.addEventListener("change", () => {
        state[control.dataset.control] = control.type === "range" ? Number(control.value) : control.value;
        render();
      });
    });
    qs("[data-reset]")?.addEventListener("click", () => {
      Object.assign(state, { module: "transporte", period: "semana", scenario: "base", threshold: 12, selectedId: "" });
      qs('[data-control="module"]').value = state.module;
      qs('[data-control="period"]').value = state.period;
      qs('[data-control="scenario"]').value = state.scenario;
      qs('[data-control="threshold"]').value = state.threshold;
      render();
      showToast("Filtros restablecidos.");
    });
    qs("[data-export]")?.addEventListener("click", () => {
      const data = compute();
      showToast(`${data.base.label}: proyeccion ${pct(data.projection)}, riesgo ${pct(data.risk)}, capacidad ${pct(data.capacity)}.`);
    });
    document.addEventListener("click", (event) => {
      const target = event.target.closest(".interactive-metric");
      if (!target) return;
      selectMetric(target);
    });
    document.addEventListener("keydown", (event) => {
      if ((event.key !== "Enter" && event.key !== " ") || !event.target.classList.contains("interactive-metric")) return;
      event.preventDefault();
      selectMetric(event.target);
    });
  }

  function init() {
    window.SIALCore?.initThemeToggle?.();
    bindEvents();
    render();
  }

  return { init };
})();

SIALIndicadores.init();
