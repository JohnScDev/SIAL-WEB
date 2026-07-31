(function () {
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const draftStorageKey = "sial-cut-notice-drafts-v1";

  const farms = {
    "LA CEIBA": { group: "AGROS", sector: "SECTOR 01", certifications: ["CONVENCIONAL", "FAIRTRADE"] },
    "MARTE": { group: "AGROS", sector: "SECTOR 02", certifications: ["CONVENCIONAL", "FAIRTRADE"] },
    "VIJAGUAL": { group: "AGROS", sector: "SECTOR 04", certifications: ["CONVENCIONAL", "FAIRTRADE", "ORGANICA FAIRTRADE"] },
    "CATALINA": { group: "BANAPALMA", sector: "ZONA CENTRO", certifications: ["CONVENCIONAL"] },
    "TAMACARA": { group: "BANEX", sector: "ZONA NORTE", certifications: ["CONVENCIONAL", "FAIRTRADE"] }
  };

  const references = {
    AGSTDRA: { className: "CONVENCIONAL", boxes: 54, package: "STD-RA", sealFactor: 1 },
    "20LD7RA": { className: "CONVENCIONAL", boxes: 55, package: "20L-RA", sealFactor: 1 },
    "ALGFT18BD": { className: "FAIRTRADE", boxes: 54, package: "FT-18-BD", sealFactor: 1 },
    "MPBORG303": { className: "ORGANICA FAIRTRADE", boxes: 48, package: "ORG-303", sealFactor: 2 },
    STDSRA: { className: "CONVENCIONAL", boxes: 54, package: "STD-RA", sealFactor: 1 }
  };

  const clients = ["FYFFES", "DOLE", "CHIQUITA", "GLOBAL FRUIT EXPORT"];
  const lines = ["NORMAL", "STARCARE", "MAERSK", "HAPAG LLOYD"];
  const seedRows = [
    {
      id: "row-1", cutDate: "2026-08-03", farm: "LA CEIBA", group: "AGROS", sector: "SECTOR 01",
      client: "FYFFES", reference: "AGSTDRA", pallets: 18, boxes: 54, bunches: 820, direct: "No", line: "NORMAL"
    },
    {
      id: "row-2", cutDate: "2026-08-04", farm: "MARTE", group: "AGROS", sector: "SECTOR 02",
      client: "FYFFES", reference: "ALGFT18BD", pallets: 12, boxes: 54, bunches: 560, direct: "Sí", line: "STARCARE"
    },
    {
      id: "row-3", cutDate: "2026-08-05", farm: "VIJAGUAL", group: "AGROS", sector: "SECTOR 04",
      client: "DOLE", reference: "MPBORG303", pallets: 8, boxes: 48, bunches: 390, direct: "No", line: "NORMAL"
    }
  ];

  const seededDrafts = [
    {
      id: "draft-32-a", code: "BOR-2026-032-01", week: "SEM-2026-32", type: "Inicial",
      updated: "Hoy, 08:42", owner: "Planeación", rows: seedRows.slice(0, 2), missing: "1 referencia por confirmar"
    },
    {
      id: "draft-32-b", code: "BOR-2026-032-02", week: "SEM-2026-32", type: "Proyectado",
      updated: "Ayer, 16:20", owner: "Planeación", rows: seedRows.slice(1), missing: "Loading Plan sin conciliar"
    },
    {
      id: "draft-33-a", code: "BOR-2026-033-01", week: "SEM-2026-33", type: "Inicial",
      updated: "28/07/2026, 11:05", owner: "Planeación", rows: [], missing: "Sin asignaciones"
    }
  ];

  function initCutNoticeCreate() {
    const body = qs("[data-assignment-body]");
    if (!body) return;

    let rows = seedRows.map((row) => ({ ...row }));
    let rowSequence = rows.length;
    let sourceMode = "";
    let sourceStage = 1;
    let sourceFile = null;
    let fileProcessToken = 0;
    let importedRows = [];
    let loadingDemand = {};
    let validated = false;
    let published = false;
    let lastTrigger = null;

    const refs = {
      week: qs("#noticeWeek"),
      type: qs("#noticeType"),
      version: qs("#noticeVersion"),
      code: qs("[data-notice-code]"),
      state: qs("[data-draft-state]"),
      rowCount: qs("[data-row-count]"),
      validationSummary: qs("[data-validation-summary]"),
      publish: qs("[data-open-publish]"),
      success: qs("[data-create-success]"),
      backdrop: qs("[data-modal-backdrop]"),
      sourceDialog: qs("[data-source-dialog]"),
      draftsDialog: qs("[data-drafts-dialog]"),
      publishDialog: qs("[data-publish-dialog]"),
      sourceTitle: qs("[data-source-title]"),
      sourceDescription: qs("[data-source-description]"),
      sourceNext: qs("[data-source-next]"),
      sourceResult: qs("[data-source-result]"),
      loadingFile: qs("[data-loading-file]"),
      loadingZone: qs('[data-upload-zone="loading"]'),
      loadingSummary: qs("[data-loading-summary]"),
      loadingPreview: qs("[data-loading-preview]"),
      excelFile: qs("[data-excel-file]"),
      excelZone: qs('[data-upload-zone="excel"]'),
      excelSummary: qs("[data-excel-summary]"),
      excelMapping: qs("[data-excel-mapping]"),
      excelPreview: qs("[data-excel-preview]"),
      pasteInput: qs("[data-paste-input]"),
      draftsList: qs("[data-drafts-list]")
    };

    const route = new URLSearchParams(window.location.search);
    const routeMode = route.get("modo");
    const routeNotice = route.get("aviso");
    if (routeMode && routeNotice) {
      const title = qs("[data-create-title]");
      const eyebrow = qs("[data-create-eyebrow]");
      const subtitle = qs("[data-create-subtitle]");
      const isCorrection = routeMode === "corregir";
      const isReadOnly = routeMode === "consultar";
      if (title) title.textContent = isCorrection ? "Preparar corrección" : isReadOnly ? "Consultar aviso de corte" : "Continuar borrador";
      if (eyebrow) eyebrow.textContent = `Avisos de corte / ${isCorrection ? "Corrección" : isReadOnly ? "Consulta" : "Edición"}`;
      if (subtitle) {
        subtitle.textContent = isCorrection
          ? "Revisa la versión publicada y prepara únicamente los cambios que formarán una nueva versión."
          : isReadOnly
            ? "Consulta las asignaciones y el impacto de esta versión publicada."
            : "Completa la información pendiente, valida las asignaciones y conserva el avance del borrador.";
      }
      refs.code.textContent = routeNotice;
      refs.state.textContent = isCorrection ? "Nueva versión" : isReadOnly ? "Publicado" : "Borrador guardado";
      refs.state.className = `status ${isReadOnly ? "status-active" : "status-warning"}`;
      if (isReadOnly) published = true;
    }

    const esc = (value) => String(value ?? "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    const formatNumber = (value) => Number(value || 0).toLocaleString("es-CO");
    const totalBoxes = (row) => Number(row.pallets || 0) * Number(row.boxes || 0);
    const unique = (values) => [...new Set(values.filter(Boolean))];
    const options = (values, current, placeholder) => `${placeholder ? `<option value="">${esc(placeholder)}</option>` : ""}${values.map((value) => `<option value="${esc(value)}"${value === current ? " selected" : ""}>${esc(value)}</option>`).join("")}`;

    const getDrafts = () => {
      try {
        const stored = JSON.parse(localStorage.getItem(draftStorageKey) || "[]");
        return Array.isArray(stored) && stored.length ? stored : seededDrafts;
      } catch {
        return seededDrafts;
      }
    };

    const saveDrafts = (drafts) => {
      localStorage.setItem(draftStorageKey, JSON.stringify(drafts));
      qsa("[data-draft-count]").forEach((node) => { node.textContent = String(drafts.length); });
    };

    const markChanged = () => {
      if (published) return;
      validated = false;
      refs.publish.disabled = true;
      refs.state.textContent = "Borrador sin guardar";
      refs.state.className = "status status-warning";
      refs.success.classList.add("is-hidden");
      refs.validationSummary.classList.add("is-hidden");
    };

    function validateRows() {
      const results = new Map();
      rows.forEach((row) => results.set(row.id, { errors: [], warnings: [] }));

      rows.forEach((row) => {
        const result = results.get(row.id);
        const required = {
          cutDate: "día de corte", farm: "finca", group: "grupo", sector: "sector",
          client: "cliente", reference: "referencia", pallets: "palés", boxes: "cajas por palé", bunches: "racimos"
        };
        Object.entries(required).forEach(([field, label]) => {
          if (!String(row[field] ?? "").trim() || (["pallets", "boxes", "bunches"].includes(field) && Number(row[field]) <= 0)) {
            result.errors.push(`Falta ${label}.`);
          }
        });

        const farm = farms[row.farm];
        const reference = references[row.reference];
        if (row.farm && !farm) result.errors.push("La finca no está activa en el alcance disponible.");
        if (row.reference && !reference) result.errors.push("La referencia no está activa.");
        if (farm && reference && !farm.certifications.includes(reference.className)) {
          result.errors.push(`La finca no cuenta con certificación ${reference.className}.`);
        }
      });

      rows.forEach((row, index) => {
        const result = results.get(row.id);
        const duplicate = rows.find((candidate, candidateIndex) => candidateIndex !== index
          && candidate.cutDate === row.cutDate && candidate.farm === row.farm
          && candidate.client === row.client && candidate.reference === row.reference);
        if (duplicate) result.errors.push("Asignación duplicada para la misma fecha, finca, cliente y referencia.");

        const ref = references[row.reference];
        const mixRisk = rows.find((candidate, candidateIndex) => {
          const candidateRef = references[candidate.reference];
          return candidateIndex !== index && candidate.farm === row.farm && candidate.cutDate === row.cutDate
            && candidate.reference !== row.reference && ref && candidateRef && ref.package === candidateRef.package;
        });
        if (mixRisk) result.warnings.push(`Riesgo de mezcla con ${mixRisk.reference}: comparten diseño de empaque.`);
      });

      return results;
    }

    function rowStatus(result) {
      if (result.errors.length) return `<span class="status status-inactive">${result.errors.length} por corregir</span>`;
      if (result.warnings.length) return `<span class="status status-warning">${result.warnings.length} advertencia</span>`;
      return `<span class="status status-active">Lista</span>`;
    }

    function rowTemplate(row, index, results) {
      const reference = references[row.reference];
      const result = results.get(row.id);
      const locked = published ? " disabled" : "";
      const issueTitle = [...result.errors, ...result.warnings].join(" ");
      return `
        <tr data-assignment-row="${esc(row.id)}"${result.errors.length ? ' class="has-errors"' : result.warnings.length ? ' class="has-warnings"' : ""}>
          <td class="cut-create-sticky"><strong>${index + 1}</strong></td>
          <td><input class="input cut-cell-control" type="date" data-field="cutDate" value="${esc(row.cutDate)}"${locked} /></td>
          <td><select class="select cut-cell-control" data-field="farm"${locked}>${options(Object.keys(farms), row.farm, "Seleccionar")}</select></td>
          <td><input class="input cut-cell-control" data-field="group" value="${esc(row.group)}"${locked} /></td>
          <td><input class="input cut-cell-control" data-field="sector" value="${esc(row.sector)}"${locked} /></td>
          <td><select class="select cut-cell-control" data-field="client"${locked}>${options(clients, row.client, "Seleccionar")}</select></td>
          <td><select class="select cut-cell-control" data-field="reference"${locked}>${options(Object.keys(references), row.reference, "Seleccionar")}</select></td>
          <td><span class="cut-cell-value">${esc(reference?.className || "-")}</span></td>
          <td><input class="input cut-cell-control" type="number" min="1" data-field="pallets" value="${esc(row.pallets)}"${locked} /></td>
          <td><input class="input cut-cell-control" type="number" min="1" data-field="boxes" value="${esc(row.boxes)}"${locked} /></td>
          <td><span class="cut-cell-value is-calculated">${formatNumber(totalBoxes(row))}</span></td>
          <td><input class="input cut-cell-control" type="number" min="1" data-field="bunches" value="${esc(row.bunches)}"${locked} /></td>
          <td><select class="select cut-cell-control" data-field="direct"${locked}>${options(["No", "Sí"], row.direct)}</select></td>
          <td><select class="select cut-cell-control" data-field="line"${locked}>${options(lines, row.line)}</select></td>
          <td title="${esc(issueTitle)}">${rowStatus(result)}</td>
          <td>
            <div class="row-actions">
              <button class="icon-btn danger" type="button" data-remove-row aria-label="Eliminar fila ${index + 1}" title="Eliminar fila"${locked}>
                <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5m4-5v5"></path></svg>
              </button>
            </div>
          </td>
        </tr>`;
    }

    function renderImpact(results) {
      const pallets = rows.reduce((sum, row) => sum + Number(row.pallets || 0), 0);
      const boxes = rows.reduce((sum, row) => sum + totalBoxes(row), 0);
      const seals = rows.reduce((sum, row) => sum + totalBoxes(row) * Number(references[row.reference]?.sealFactor || 1), 0);
      const trips = Math.ceil(pallets / 20);
      const errors = [...results.values()].reduce((sum, result) => sum + result.errors.length, 0);
      const warnings = [...results.values()].reduce((sum, result) => sum + result.warnings.length, 0);
      const demand = Object.values(loadingDemand).reduce((sum, value) => sum + Number(value || 0), 0);
      const coverage = demand ? Math.round((boxes / demand) * 100) : 0;

      qs("[data-impact-boxes]").textContent = formatNumber(boxes);
      qs("[data-impact-pallets]").textContent = formatNumber(pallets);
      qs("[data-impact-cartons]").textContent = formatNumber(boxes);
      qs("[data-impact-seals]").textContent = formatNumber(seals);
      qs("[data-impact-trips]").textContent = formatNumber(trips);
      qs("[data-impact-coverage]").textContent = demand ? `${coverage}% del Loading Plan asignado` : "Sin Loading Plan cargado";

      const alerts = qs("[data-impact-alerts]");
      const items = [];
      if (errors) items.push(`<div class="cut-impact-warning is-blocking"><span>${errors}</span><p><strong>Bloqueos</strong><small>Deben resolverse antes de publicar.</small></p></div>`);
      if (warnings) items.push(`<div class="cut-impact-warning"><span>${warnings}</span><p><strong>Advertencias</strong><small>Revisa posibles mezclas de empaque.</small></p></div>`);
      if (demand && coverage < 100) items.push(`<div class="cut-impact-warning"><span>${100 - coverage}%</span><p><strong>Pendiente por asignar</strong><small>Comparado con el Loading Plan.</small></p></div>`);
      alerts.innerHTML = items.join("") || '<div class="cut-impact-ready"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg><span>Sin impactos pendientes por revisar.</span></div>';
    }

    function renderSummary(results) {
      const pallets = rows.reduce((sum, row) => sum + Number(row.pallets || 0), 0);
      const boxes = rows.reduce((sum, row) => sum + totalBoxes(row), 0);
      const blockers = [...results.values()].reduce((sum, result) => sum + result.errors.length, 0);
      refs.rowCount.textContent = `${rows.length} ${rows.length === 1 ? "fila" : "filas"}`;
      qs("[data-status-farms]").textContent = String(unique(rows.map((row) => row.farm)).length);
      qs("[data-status-pallets]").textContent = formatNumber(pallets);
      qs("[data-status-boxes]").textContent = formatNumber(boxes);
      qs("[data-status-blockers]").textContent = formatNumber(blockers);
      renderImpact(results);
    }

    function bindRowEvents() {
      qsa("[data-assignment-row]", body).forEach((tableRow) => {
        const row = rows.find((item) => item.id === tableRow.dataset.assignmentRow);
        if (!row) return;
        qsa("[data-field]", tableRow).forEach((control) => {
          const update = () => {
            const field = control.dataset.field;
            row[field] = control.type === "number" ? Number(control.value || 0) : control.value;
            if (field === "farm" && farms[row.farm]) {
              row.group = farms[row.farm].group;
              row.sector = farms[row.farm].sector;
            }
            if (field === "reference" && references[row.reference]) row.boxes = references[row.reference].boxes;
            markChanged();
            render();
          };
          control.addEventListener(control.tagName === "SELECT" ? "change" : "input", update);
          control.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") return;
            event.preventDefault();
            const controls = qsa("[data-field]", tableRow);
            controls[controls.indexOf(control) + 1]?.focus();
          });
        });
        qs("[data-remove-row]", tableRow)?.addEventListener("click", () => {
          rows = rows.filter((item) => item.id !== row.id);
          markChanged();
          render();
        });
      });
    }

    function render() {
      const results = validateRows();
      body.innerHTML = rows.length
        ? rows.map((row, index) => rowTemplate(row, index, results)).join("")
        : '<tr><td colspan="16"><div class="empty-state show">Aún no hay asignaciones. Agrega una fila o carga información existente.</div></td></tr>';
      bindRowEvents();
      renderSummary(results);
      qsa("[data-header-field]").forEach((control) => { control.disabled = published; });
      qsa("[data-add-assignment], [data-source], [data-save-draft], [data-validate-notice]").forEach((button) => { button.disabled = published; });
    }

    function newRow(defaults = {}) {
      rowSequence += 1;
      const farm = defaults.farm || "";
      const reference = defaults.reference || "";
      return {
        id: `row-${rowSequence}`, cutDate: defaults.cutDate || "", farm,
        group: defaults.group || farms[farm]?.group || "", sector: defaults.sector || farms[farm]?.sector || "",
        client: defaults.client || "", reference, pallets: Number(defaults.pallets || 0),
        boxes: Number(defaults.boxes || references[reference]?.boxes || 0), bunches: Number(defaults.bunches || 0),
        direct: defaults.direct || "No", line: defaults.line || "NORMAL"
      };
    }

    function parseDate(value) {
      const text = String(value || "").trim();
      const match = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
      return match ? `${match[3]}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}` : text;
    }

    function parsePastedRows(raw) {
      return String(raw || "").trim().split(/\r?\n/).filter(Boolean).map((line) => {
        const [cutDate, farm, group, sector, client, reference, pallets, boxes, bunches] = line.split("\t");
        return newRow({
          cutDate: parseDate(cutDate), farm: String(farm || "").trim().toUpperCase(),
          group: String(group || "").trim().toUpperCase(), sector: String(sector || "").trim().toUpperCase(),
          client: String(client || "").trim().toUpperCase(), reference: String(reference || "").trim().toUpperCase(),
          pallets, boxes, bunches
        });
      });
    }

    async function parseDelimitedFile(file, mode) {
      const text = await file.text();
      const delimiter = text.includes("\t") ? "\t" : ",";
      const lines = text.split(/\r?\n/).filter(Boolean);
      if (lines.length < 2) return [];
      const headers = lines[0].split(delimiter).map((header) => header.trim().toLowerCase());
      const find = (...aliases) => headers.findIndex((header) => aliases.includes(header));
      const columns = {
        date: find("día de corte", "dia de corte", "fecha", "fecha corte"),
        farm: find("finca", "farm"),
        group: find("grupo", "grupo_gral"),
        sector: find("sector", "zona"),
        client: find("cliente"),
        reference: find("referencia", "marca"),
        pallets: find("palés", "pales", "pallets", "cantidad pallets"),
        boxes: find("cajas por palé", "cajas por pale", "cajas_x_pallet"),
        bunches: find("racimos", "racimos estimados"),
        demand: find("pedido", "cantidad", "cajas solicitadas")
      };
      if (mode === "loading") {
        return lines.slice(1).map((line) => {
          const cells = line.split(delimiter);
          return { reference: cells[columns.reference] || "", demand: Number(cells[columns.demand] || 0), client: cells[columns.client] || "FYFFES" };
        }).filter((row) => row.reference);
      }
      return lines.slice(1).map((line) => {
        const cells = line.split(delimiter);
        return newRow({
          cutDate: parseDate(cells[columns.date]), farm: String(cells[columns.farm] || "").trim().toUpperCase(),
          group: String(cells[columns.group] || "").trim().toUpperCase(), sector: String(cells[columns.sector] || "").trim().toUpperCase(),
          client: String(cells[columns.client] || "").trim().toUpperCase(), reference: String(cells[columns.reference] || "").trim().toUpperCase(),
          pallets: cells[columns.pallets], boxes: cells[columns.boxes], bunches: cells[columns.bunches]
        });
      });
    }

    function sampleLoadingRows() {
      return [
        { reference: "AGSTDRA", demand: 12960, client: "FYFFES" },
        { reference: "ALGFT18BD", demand: 8100, client: "FYFFES" },
        { reference: "MPBORG303", demand: 4200, client: "DOLE" }
      ];
    }

    function sampleExcelRows() {
      return [
        newRow({ cutDate: "2026-08-03", farm: "CATALINA", group: "BANAPALMA", sector: "ZONA CENTRO", client: "FYFFES", reference: "20LD7RA", pallets: 10, boxes: 55, bunches: 490 }),
        newRow({ cutDate: "2026-08-04", farm: "TAMACARA", group: "BANEX", sector: "ZONA NORTE", client: "FYFFES", reference: "STDSRA", pallets: 16, boxes: 54, bunches: 730 }),
        newRow({ cutDate: "2026-08-05", farm: "VIJAGUAL", group: "AGROS", sector: "SECTOR 04", client: "DOLE", reference: "MPBORG303", pallets: 6, boxes: 48, bunches: 300 })
      ];
    }

    function mappingTemplate() {
      const pairs = [
        ["Día de corte", "Fecha de Corte"], ["Finca", "Finca"], ["Grupo", "Grupo_Gral"],
        ["Sector", "Zona"], ["Cliente", "Cliente"], ["Referencia", "Referencia"],
        ["Palés", "Cantidad Pallets"], ["Cajas / palé", "Cajas_x_Pallet"], ["Racimos", "Racimos estimados"]
      ];
      return pairs.map(([target, source]) => `<div><span>${esc(source)}</span><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"></path></svg><strong>${esc(target)}</strong></div>`).join("");
    }

    function previewTable(data, mode) {
      if (mode === "loading") {
        return `<div class="cut-preview-head"><strong>${data.length} referencias detectadas</strong><span>Pedido del cliente</span></div>
          <table><thead><tr><th>Cliente</th><th>Referencia</th><th>Cajas solicitadas</th><th>Estado</th></tr></thead>
          <tbody>${data.map((row) => `<tr><td>${esc(row.client)}</td><td>${esc(row.reference)}</td><td>${formatNumber(row.demand)}</td><td><span class="status status-active">Reconocida</span></td></tr>`).join("")}</tbody></table>`;
      }
      const results = validateRowsFor(data);
      return `<div class="cut-preview-head"><strong>${data.length} filas listas para importar</strong><span>Se agregarán al borrador</span></div>
        <table><thead><tr><th>Fecha</th><th>Finca</th><th>Referencia</th><th>Palés</th><th>Validación</th></tr></thead>
        <tbody>${data.map((row) => {
          const result = results.get(row.id);
          return `<tr><td>${esc(row.cutDate)}</td><td>${esc(row.farm)}</td><td>${esc(row.reference)}</td><td>${formatNumber(row.pallets)}</td><td>${rowStatus(result)}</td></tr>`;
        }).join("")}</tbody></table>`;
    }

    function validateRowsFor(candidateRows) {
      const previousRows = rows;
      rows = candidateRows;
      const results = validateRows();
      rows = previousRows;
      return results;
    }

    const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

    const fileNodes = (mode) => mode === "loading"
      ? { input: refs.loadingFile, zone: refs.loadingZone, summary: refs.loadingSummary, preview: refs.loadingPreview }
      : { input: refs.excelFile, zone: refs.excelZone, summary: refs.excelSummary, preview: refs.excelPreview };

    function clearFileUi(mode) {
      const nodes = fileNodes(mode);
      if (nodes.input) nodes.input.value = "";
      nodes.zone?.classList.remove("is-hidden", "is-error", "is-dragging");
      if (nodes.summary) {
        nodes.summary.className = "cut-file-summary is-hidden";
        nodes.summary.innerHTML = "";
      }
      nodes.preview?.classList.add("is-hidden");
      if (mode === "excel") refs.excelMapping?.classList.add("is-hidden");
    }

    function resetSourceDialog() {
      fileProcessToken += 1;
      sourceStage = 1;
      sourceFile = null;
      importedRows = [];
      clearFileUi("loading");
      clearFileUi("excel");
      if (refs.pasteInput) refs.pasteInput.value = "";
    }

    function removeSourceFile(mode) {
      fileProcessToken += 1;
      sourceStage = 1;
      sourceFile = null;
      importedRows = [];
      clearFileUi(mode);
      refs.sourceNext.disabled = true;
      refs.sourceNext.textContent = "Selecciona un archivo";
      window.setTimeout(() => fileNodes(mode).zone?.focus(), 0);
    }

    function renderFileState(mode, state, file, detail = "") {
      const { zone, summary } = fileNodes(mode);
      if (!summary) return;
      const states = {
        uploading: { title: "Cargando archivo", stage: "Preparando la carga…", badge: "Cargando", progress: 34, status: "chip" },
        analyzing: { title: "Analizando estructura", stage: "Reconociendo hojas, columnas y registros…", badge: "Analizando", progress: 76, status: "chip" },
        ready: { title: "Archivo listo", stage: "Puedes revisar los datos antes de agregarlos.", badge: "Listo", progress: 100, status: "status status-active" },
        error: { title: "Archivo no válido", stage: "Remuévelo y selecciona un archivo compatible.", badge: "Revisar", progress: 100, status: "status status-inactive" }
      };
      const current = states[state];
      const actionLabel = state === "uploading" || state === "analyzing" ? "Cancelar carga" : "Remover";
      const size = file?.size ? `${(file.size / 1024).toFixed(1)} KB` : "Archivo seleccionado";
      zone?.classList.add("is-hidden");
      summary.className = `cut-file-summary is-${state}`;
      summary.innerHTML = `
        <div class="cut-file-summary-main">
          <span class="cut-file-visual" aria-hidden="true">
            <svg class="icon" viewBox="0 0 24 24"><path d="M6 3h9l3 3v15H6z"></path><path d="M9 11h6M9 15h5"></path></svg>
          </span>
          <span class="cut-file-copy">
            <strong>${esc(file?.name || "Archivo")}</strong>
            <small>${esc(size)}${detail ? ` · ${esc(detail)}` : ""}</small>
          </span>
          <span class="${current.status}">${current.badge}</span>
          <button class="btn btn-ghost cut-file-remove" type="button" data-remove-source-file="${mode}">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m18 6-12 12"></path><path d="m6 6 12 12"></path></svg>
            ${actionLabel}
          </button>
        </div>
        <div class="cut-file-progress" aria-hidden="true"><span style="width:${current.progress}%"></span></div>
        <div class="cut-file-stage"><strong>${current.title}</strong><span>${current.stage}</span></div>`;
      qs("[data-remove-source-file]", summary)?.addEventListener("click", () => removeSourceFile(mode));
    }

    function openModal(dialog, trigger) {
      lastTrigger = trigger || document.activeElement;
      refs.backdrop.hidden = false;
      dialog.hidden = false;
      document.body.classList.add("modal-open");
      window.setTimeout(() => qs("button, input, select, textarea", dialog)?.focus(), 0);
    }

    function closeModals() {
      if (!refs.sourceDialog.hidden) fileProcessToken += 1;
      refs.backdrop.hidden = true;
      [refs.sourceDialog, refs.draftsDialog, refs.publishDialog].forEach((dialog) => { dialog.hidden = true; });
      document.body.classList.remove("modal-open");
      lastTrigger?.focus?.();
    }

    function openSource(mode, trigger) {
      sourceMode = mode;
      resetSourceDialog();
      qsa("[data-source-loading], [data-source-excel], [data-source-paste]", refs.sourceDialog).forEach((panel) => panel.classList.add("is-hidden"));
      qs(`[data-source-${mode}]`, refs.sourceDialog).classList.remove("is-hidden");
      const copy = {
        loading: ["Cargar Loading Plan", "Compara el pedido recibido con las asignaciones del borrador.", "Analizar archivo"],
        excel: ["Importar aviso desde Excel", "Mapea la estructura actual sin publicar el aviso automáticamente.", "Analizar archivo"],
        paste: ["Pegar filas desde Excel", "Las filas tabuladas se validarán antes de agregarlas.", "Agregar al borrador"]
      }[mode];
      refs.sourceTitle.textContent = copy[0];
      refs.sourceDescription.textContent = copy[1];
      refs.sourceNext.textContent = mode === "paste" ? copy[2] : "Selecciona un archivo";
      refs.sourceNext.disabled = mode !== "paste";
      openModal(refs.sourceDialog, trigger);
    }

    async function prepareFile(mode, file) {
      const token = ++fileProcessToken;
      const allowed = /\.(xlsx|xlsm|csv|tsv)$/i.test(file.name);
      if (!allowed || file.size > 10 * 1024 * 1024) {
        sourceFile = null;
        importedRows = [];
        renderFileState(mode, "error", file, allowed ? "supera el máximo de 10 MB" : "formato no compatible");
        refs.sourceNext.disabled = true;
        refs.sourceNext.textContent = "Selecciona otro archivo";
        return;
      }

      sourceFile = file;
      importedRows = [];
      sourceStage = 1;
      refs.sourceNext.disabled = true;
      refs.sourceNext.textContent = "Cargando…";
      renderFileState(mode, "uploading", file);
      const isDelimited = /\.(csv|tsv)$/i.test(file.name);
      const parse = Promise.resolve().then(() => {
        if (mode === "loading") return isDelimited ? parseDelimitedFile(file, "loading") : sampleLoadingRows();
        return isDelimited ? parseDelimitedFile(file, "excel") : sampleExcelRows();
      });

      try {
        await wait(420);
        if (token !== fileProcessToken) return;
        refs.sourceNext.textContent = "Analizando…";
        renderFileState(mode, "analyzing", file);
        const [parsed] = await Promise.all([parse, wait(680)]);
        if (token !== fileProcessToken) return;
        importedRows = parsed;
        const detail = mode === "loading"
          ? `${importedRows.length} referencias detectadas`
          : `${importedRows.length} filas detectadas`;
        renderFileState(mode, "ready", file, detail);
        refs.sourceNext.disabled = false;
        refs.sourceNext.textContent = "Revisar datos";
      } catch {
        if (token !== fileProcessToken) return;
        sourceFile = null;
        importedRows = [];
        renderFileState(mode, "error", file, "no fue posible leer su estructura");
        refs.sourceNext.disabled = true;
        refs.sourceNext.textContent = "Selecciona otro archivo";
      }
    }

    async function handleSourceNext() {
      if (sourceMode === "paste") {
        const parsed = parsePastedRows(refs.pasteInput.value);
        if (!parsed.length) {
          refs.pasteInput.classList.add("is-error");
          refs.pasteInput.focus();
          return;
        }
        rows.push(...parsed);
        markChanged();
        closeModals();
        showSourceResult(`${parsed.length} filas pegadas y agregadas al borrador.`);
        render();
        return;
      }

      if (!sourceFile) {
        const input = sourceMode === "loading" ? refs.loadingFile : refs.excelFile;
        input.focus();
        input.closest(".cut-upload-zone").classList.add("is-error");
        return;
      }

      if (sourceStage === 1) {
        sourceStage = 2;
        const preview = sourceMode === "loading" ? refs.loadingPreview : refs.excelPreview;
        preview.innerHTML = previewTable(importedRows, sourceMode);
        preview.classList.remove("is-hidden");
        if (sourceMode === "excel") {
          refs.excelMapping.classList.remove("is-hidden");
          qs("[data-mapping-grid]").innerHTML = mappingTemplate();
        }
        refs.sourceNext.textContent = sourceMode === "loading" ? "Usar Loading Plan" : "Importar al borrador";
        return;
      }

      if (sourceMode === "loading") {
        loadingDemand = importedRows.reduce((result, row) => {
          result[row.reference] = Number(row.demand || 0);
          return result;
        }, {});
        showSourceResult(`Loading Plan cargado: ${importedRows.length} referencias listas para comparar.`);
      } else {
        rows.push(...importedRows);
        markChanged();
        showSourceResult(`${importedRows.length} filas importadas desde Excel. Revisa las validaciones antes de publicar.`);
      }
      closeModals();
      render();
    }

    function showSourceResult(message) {
      refs.sourceResult.innerHTML = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg><span>${esc(message)}</span>`;
      refs.sourceResult.classList.remove("is-hidden");
    }

    function saveDraft() {
      const drafts = getDrafts();
      const current = {
        id: "draft-current", code: `BOR-${refs.week.value.replace("SEM-", "").replace("-", "-")}-UI`,
        week: refs.week.value, type: refs.type.value, updated: "Ahora", owner: "Planeación",
        rows: rows.map((row) => ({ ...row })), missing: `${[...validateRows().values()].reduce((sum, result) => sum + result.errors.length, 0)} campos por revisar`
      };
      const index = drafts.findIndex((draft) => draft.id === current.id);
      if (index >= 0) drafts[index] = current;
      else drafts.unshift(current);
      saveDrafts(drafts);
      refs.state.textContent = "Borrador guardado";
      refs.state.className = "status status-active";
      qs("[data-last-saved]").textContent = "Guardado ahora";
      refs.success.textContent = "Borrador guardado. Puedes continuar más tarde desde la bandeja.";
      refs.success.classList.remove("is-hidden");
    }

    function renderDrafts() {
      const drafts = getDrafts();
      saveDrafts(drafts);
      refs.draftsList.innerHTML = drafts.map((draft) => `
        <article class="cut-draft-item">
          <div class="cut-draft-icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6z"></path><path d="M9 11h6M9 15h5"></path></svg></div>
          <div class="cut-draft-content">
            <div><strong>${esc(draft.code)}</strong><span class="status status-warning">Incompleto</span></div>
            <p>${esc(draft.week)} · ${esc(draft.type)} · ${draft.rows.length} asignaciones</p>
            <small>${esc(draft.missing)} · Actualizado ${esc(draft.updated)}</small>
          </div>
          <button class="btn btn-secondary" type="button" data-resume-draft="${esc(draft.id)}">Retomar</button>
        </article>
      `).join("");
      qsa("[data-resume-draft]", refs.draftsList).forEach((button) => {
        button.addEventListener("click", () => {
          const draft = drafts.find((item) => item.id === button.dataset.resumeDraft);
          if (!draft) return;
          rows = draft.rows.map((row) => ({ ...row, id: `row-${++rowSequence}` }));
          refs.week.value = draft.week;
          refs.type.value = draft.type;
          refs.version.value = draft.type;
          markChanged();
          closeModals();
          render();
        });
      });
    }

    function runValidation() {
      const results = validateRows();
      const errors = [...results.values()].flatMap((result) => result.errors);
      const warnings = [...results.values()].flatMap((result) => result.warnings);
      validated = errors.length === 0 && rows.length > 0;
      refs.publish.disabled = !validated;
      refs.validationSummary.classList.remove("is-hidden", "is-success", "is-warning");
      refs.validationSummary.classList.add(validated ? (warnings.length ? "is-warning" : "is-success") : "is-warning");
      refs.validationSummary.innerHTML = validated
        ? `<div><strong>${warnings.length ? `Aviso válido con ${warnings.length} advertencias` : "Aviso listo para publicar"}</strong><span>${warnings.length ? "Revisa las advertencias de mezcla antes de confirmar." : "Fincas, referencias, certificaciones y cantidades fueron validadas."}</span></div><button class="btn btn-primary" type="button" data-summary-publish>Publicar aviso</button>`
        : `<div><strong>${errors.length || 1} bloqueos impiden publicar</strong><span>${rows.length ? "Revisa las filas marcadas y vuelve a validar." : "Agrega al menos una asignación."}</span></div>`;
      qs("[data-summary-publish]")?.addEventListener("click", openPublish);
      refs.validationSummary.focus();
      render();
    }

    function openPublish() {
      if (!validated || published) return;
      const pallets = rows.reduce((sum, row) => sum + Number(row.pallets || 0), 0);
      const boxes = rows.reduce((sum, row) => sum + totalBoxes(row), 0);
      const warnings = [...validateRows().values()].reduce((sum, result) => sum + result.warnings.length, 0);
      qs("[data-publish-message]").textContent =
        `${refs.code.textContent} para ${refs.week.value} se publicará como versión ${refs.version.value}. Después de publicarla, cualquier corrección deberá generar una nueva versión.`;
      qs("[data-publish-summary]").innerHTML = [
        ["Fincas", unique(rows.map((row) => row.farm)).length],
        ["Palés", formatNumber(pallets)],
        ["Cajas", formatNumber(boxes)]
      ].map(([label, value]) => `<span><strong>${esc(value)}</strong> ${esc(label.toLowerCase())}</span>`).join("");
      qs("[data-publish-validation]").className = `cut-publish-validation ${warnings ? "is-warning" : "is-success"}`;
      qs("[data-publish-validation]").innerHTML = warnings
        ? `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2 21h20L12 3Z"></path><path d="M12 9v5M12 17h.01"></path></svg><div><strong>${warnings} ${warnings === 1 ? "advertencia identificada" : "advertencias identificadas"}</strong><span>Confirma que fueron revisadas antes de publicar.</span></div>`
        : `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"></path></svg><div><strong>Validación completa</strong><span>Sin errores ni advertencias pendientes.</span></div>`;
      openModal(refs.publishDialog, document.activeElement);
    }

    function publishNotice() {
      published = true;
      closeModals();
      refs.state.textContent = "Publicado";
      refs.state.className = "status status-active";
      refs.publish.disabled = true;
      refs.validationSummary.classList.add("is-hidden");
      refs.success.innerHTML = `<strong>${esc(refs.code.textContent)} publicado.</strong> La versión quedó disponible para las áreas autorizadas.`;
      refs.success.classList.remove("is-hidden");
      qs("[data-last-saved]").textContent = "Publicado ahora";
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    qs("[data-add-assignment]")?.addEventListener("click", () => {
      rows.push(newRow());
      markChanged();
      render();
      window.setTimeout(() => qs(`[data-assignment-row="${rows.at(-1).id}"] [data-field]`)?.focus(), 0);
    });
    qsa("[data-source]").forEach((button) => button.addEventListener("click", () => openSource(button.dataset.source, button)));
    refs.loadingFile?.addEventListener("change", async () => {
      refs.loadingZone.classList.remove("is-error");
      if (refs.loadingFile.files[0]) await prepareFile("loading", refs.loadingFile.files[0]);
    });
    refs.excelFile?.addEventListener("change", async () => {
      refs.excelZone.classList.remove("is-error");
      if (refs.excelFile.files[0]) await prepareFile("excel", refs.excelFile.files[0]);
    });
    qsa("[data-upload-zone]").forEach((zone) => {
      const mode = zone.dataset.uploadZone;
      zone.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        fileNodes(mode).input?.click();
      });
      ["dragenter", "dragover"].forEach((eventName) => zone.addEventListener(eventName, (event) => {
        event.preventDefault();
        zone.classList.add("is-dragging");
      }));
      zone.addEventListener("dragleave", (event) => {
        if (!event.relatedTarget || !zone.contains(event.relatedTarget)) zone.classList.remove("is-dragging");
      });
      zone.addEventListener("drop", (event) => {
        event.preventDefault();
        zone.classList.remove("is-dragging", "is-error");
        const file = event.dataTransfer?.files?.[0];
        if (file) prepareFile(mode, file);
      });
    });
    refs.sourceNext?.addEventListener("click", handleSourceNext);
    qsa("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModals));
    refs.backdrop?.addEventListener("click", closeModals);
    qs("[data-save-draft]")?.addEventListener("click", saveDraft);
    qs("[data-open-drafts]")?.addEventListener("click", (event) => {
      renderDrafts();
      openModal(refs.draftsDialog, event.currentTarget);
    });
    qs("[data-validate-notice]")?.addEventListener("click", runValidation);
    refs.publish?.addEventListener("click", openPublish);
    qs("[data-confirm-publish]")?.addEventListener("click", publishNotice);
    [refs.week, refs.type].forEach((control) => control?.addEventListener("change", () => {
      refs.version.value = refs.type.value;
      refs.code.textContent = `AC-${refs.week.value.replace("SEM-", "")}`;
      markChanged();
    }));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !refs.backdrop.hidden) closeModals();
    });

    saveDrafts(getDrafts());
    render();
  }

  window.SIALCutNoticeCreate = { init: initCutNoticeCreate };
})();
