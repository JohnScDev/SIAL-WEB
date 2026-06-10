const SIAL = (() => {
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const vehicleData = {
    "TRK-421": { plate: "TRK-421", type: "TRACTOMULA", capacity: 32, company: "TRANSLOGISTICA SAS" },
    "CAM-101": { plate: "CAM-101", type: "CAMION", capacity: 18, company: "Transportes del Valle" },
    "TRK-422": { plate: "TRK-422", type: "TRACTOMULA", capacity: 32, company: "Flota Oriente S.A.S." },
    "CAM-102": { plate: "CAM-102", type: "CAMION RIGIDO", capacity: 22, company: "Carga Pesada Ltda." }
  };

  const driverData = {
    "DRV-001": { code: "DRV-001", name: "Carlos Mendez", license: "C2", licenseExp: "2026-12-15", arlExp: "2026-11-30", status: "Activo" },
    "DRV-003": { code: "DRV-003", name: "Ana Lucia Paz", license: "C3", licenseExp: "2026-10-20", arlExp: "2026-09-15", status: "Activo" },
    "DRV-005": { code: "DRV-005", name: "Pedro Rojas", license: "C2", licenseExp: "2027-01-10", arlExp: "2026-12-01", status: "Activo" }
  };

  const operationData = {
    "OP-001": { vehicle: "TRK-421", driver: "DRV-001", week: "SEM-24-2026", date: "2026-06-10T07:30", destType: "Puerto", dest: "Puerto ZE", obs: "Cargue de contenedor refrigerado." },
    "OP-002": { vehicle: "CAM-101", driver: "DRV-003", week: "SEM-24-2026", date: "2026-06-10T06:15", destType: "Finca", dest: "Finca El Rosario", obs: "" }
  };

  function getUrlParams() {
    const params = {};
    window.location.search.replace(/^\?/, "").split("&").forEach((pair) => {
      const [key, val] = pair.split("=");
      if (key) params[decodeURIComponent(key)] = val ? decodeURIComponent(val) : "";
    });
    return params;
  }

  function applyShell(activeKey) {
    const moduleId = "transporte";
    if (window.SIALCore?.initShell) {
      window.SIALCore.initShell({ area: "gestion", module: moduleId, view: activeKey || "gestion" });
      return;
    }
    window.SIALCore?.initThemeToggle?.();
    const nav = qs("[data-nav]");
    if (!nav) return;
    const items = [
      ["gestion", "gestion-conductores.html", "Gestion de conductores"],
      ["licencias", "gestion-categorias-licencia.html", "Gestion de licencias"],
      ["relacion", "relacion-conductor-licencia.html", "Conductor + licencia"],
      ["vehiculos", "gestion-vehiculos.html", "Gestion de vehiculos"],
      ["tiposVehiculo", "gestion-tipos-vehiculo.html", "Tipos de vehiculos"],
      ["dashboard", "dashboard-transporte.html", "Dashboard transporte"],
      ["documental", "matriz-documental-vehiculos.html", "Matriz documental"],
      ["disponibilidad", "disponibilidad-operativa.html", "Disponibilidad"],
      ["operaciones", "gestion-operaciones.html", "Gestion de operaciones"]
    ];
    nav.innerHTML = items.map(([key, href, label]) =>
      `<a class="nav-link ${key === activeKey ? "active" : ""}" href="${href}"><svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg><span>${label}</span></a>`
    ).join("");
  }

  function setFieldState(input, note, error, successText) {
    if (!input || !note) return;
    input.classList.toggle("is-error", Boolean(error));
    input.setAttribute("aria-invalid", error ? "true" : "false");
    note.classList.toggle("error", Boolean(error));
    note.classList.toggle("success", !error && Boolean(successText));
    note.textContent = error || successText || note.dataset.base || note.textContent;
  }

  function initOperationForm() {
    const form = qs("#operationForm");
    if (!form) return;
    const ok = qs("#formOk");
    const params = getUrlParams();
    const isEdit = params.modo === "editar";
    const opId = params.id || "";

    const vehicleSelect = qs("#vehicleSelect");
    const driverSelect = qs("#driverSelect");
    const weekSelect = qs("#weekSelect");
    const dateInput = qs("#dateOperative");
    const destType = qs("#destinationType");
    const destSelect = qs("#destinationSelect");

    const readonlyFields = {
      plate: qs("#plateDisplay"),
      vehType: qs("#vehicleTypeDisplay"),
      capacity: qs("#capacityDisplay"),
      company: qs("#companyDisplay"),
      license: qs("#licenseDisplay"),
      licenseExp: qs("#licenseExpDisplay"),
      arlExp: qs("#arlExpDisplay")
    };

    if (isEdit) {
      const op = operationData[opId];
      qs(".page-eyebrow").textContent = "Transporte / Operaciones / Editar operacion";
      qs(".page-title").textContent = "Editar operacion";
      qs(".page-subtitle").textContent = "Modifica los datos editables de la operacion. Solo conductor, destino y observaciones pueden cambiarse si el vehiculo no ha cambiado de estado posterior.";
      qs(".form-heading h2").textContent = "Edicion de operacion";
      qs(".form-heading p").textContent = "Campos editables: conductor, tipo de destino, destino y observaciones.";
      qs("#operationFormSubmit").textContent = "Guardar cambios";
      qs(".notice-info span").innerHTML = "Solo se permite editar la operacion si el vehiculo no ha cambiado de estado posterior. Campos editables: conductor, tipo de destino y observaciones.";

      if (op) {
        vehicleSelect.value = op.vehicle;
        vehicleSelect.disabled = true;
        const vd = vehicleData[op.vehicle];
        if (vd) {
          if (readonlyFields.plate) readonlyFields.plate.value = vd.plate;
          if (readonlyFields.vehType) readonlyFields.vehType.value = vd.type;
          if (readonlyFields.capacity) readonlyFields.capacity.value = vd.capacity;
          if (readonlyFields.company) readonlyFields.company.value = vd.company;
        }
        driverSelect.value = op.driver;
        const dd = driverData[op.driver];
        if (dd) {
          if (readonlyFields.license) readonlyFields.license.value = dd.license;
          if (readonlyFields.licenseExp) readonlyFields.licenseExp.value = dd.licenseExp;
          if (readonlyFields.arlExp) readonlyFields.arlExp.value = dd.arlExp;
        }
        weekSelect.value = op.week;
        weekSelect.disabled = true;
        dateInput.value = op.date;
        dateInput.disabled = true;
        destType.value = op.destType;
        destType.dispatchEvent(new Event("change"));
        setTimeout(() => { destSelect.value = op.dest; }, 50);
        qs("#operationObservations").value = op.obs || "";
      }
      qs(".form-actions .btn-secondary[type=reset]").style.display = "none";
    }

    const required = isEdit
      ? [
          ["driverSelect", "Selecciona un conductor activo.", v => Boolean(v)],
          ["destinationType", "Selecciona el tipo de destino.", v => Boolean(v)],
          ["destinationSelect", "Selecciona el destino.", v => Boolean(v)]
        ]
      : [
          ["vehicleSelect", "Selecciona un vehiculo disponible.", v => Boolean(v)],
          ["driverSelect", "Selecciona un conductor activo.", v => Boolean(v)],
          ["weekSelect", "Selecciona la semana operativa.", v => Boolean(v)],
          ["dateOperative", "La fecha operativa es obligatoria.", v => Boolean(v)],
          ["destinationType", "Selecciona el tipo de destino.", v => Boolean(v)],
          ["destinationSelect", "Selecciona el destino.", v => Boolean(v)]
        ];

    vehicleSelect?.addEventListener("change", () => {
      const data = vehicleData[vehicleSelect.value];
      if (readonlyFields.plate) readonlyFields.plate.value = data?.plate || "";
      if (readonlyFields.vehType) readonlyFields.vehType.value = data?.type || "";
      if (readonlyFields.capacity) readonlyFields.capacity.value = data?.capacity || "";
      if (readonlyFields.company) readonlyFields.company.value = data?.company || "";
    });

    driverSelect?.addEventListener("change", () => {
      const data = driverData[driverSelect.value];
      if (readonlyFields.license) readonlyFields.license.value = data?.license || "";
      if (readonlyFields.licenseExp) readonlyFields.licenseExp.value = data?.licenseExp || "";
      if (readonlyFields.arlExp) readonlyFields.arlExp.value = data?.arlExp || "";
    });

    destType?.addEventListener("change", () => {
      if (!destSelect) return;
      destSelect.innerHTML = '<option value="">Selecciona destino</option>';
      const options = destType.value === "Finca"
        ? ["Finca El Rosario", "Finca San Jose", "Finca La Aurora"]
        : ["Puerto ZE", "Puerto Cartagena", "Puerto Santa Marta"];
      options.forEach((opt) => {
        const o = document.createElement("option");
        o.value = opt;
        o.textContent = opt;
        destSelect.appendChild(o);
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let fail = false;
      required.forEach(([id, message, rule]) => {
        const input = qs(`#${id}`);
        const note = qs(`#${id}Note`);
        if (note && !note.dataset.base) note.dataset.base = note.textContent;
        const error = rule(input?.value || "") ? "" : message;
        setFieldState(input, note, error, "Dato validado.");
        if (error) fail = true;
      });
      ok?.classList.toggle("is-hidden", fail);
      if (!fail) {
        ok.classList.remove("is-hidden");
        ok.classList.remove("notice-success", "notice-error");
        if (isEdit) {
          ok.classList.add("notice-success");
          ok.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg><span>Operacion actualizada correctamente. Los cambios quedaron registrados en auditoria.</span>';
        } else {
          const veh = qs("#vehicleSelect").value;
          const drv = qs("#driverSelect").value;
          const dest = qs("#destinationType").value;
          const statusLabel = dest === "Finca" ? "EN TRÁNSITO A FINCA" : "EN TRÁNSITO A PUERTO";
          const statusClass = "status-warning";
          const resultMsg = qs("#formResultMessage");
          if (resultMsg) {
            resultMsg.innerHTML = `<strong>Operacion iniciada:</strong> Vehiculo <strong>${veh}</strong> asignado a <strong>${driverData[drv]?.name || drv}</strong>. Estado: <span class="status ${statusClass}">${statusLabel}</span>.`;
          }
          ok.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></svg><span>Operacion iniciada correctamente. El vehiculo queda marcado como OCUPADO.</span>';
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        qs("#operationFormSubmit")?.setAttribute("disabled", "disabled");
        qs("#operationFormSubmit").classList.add("is-loading");
      }
    });

    form.addEventListener("reset", () => {
      setTimeout(() => {
        qsa(".is-error", form).forEach((node) => node.classList.remove("is-error"));
        qsa(".field-note", form).forEach((note) => {
          note.classList.remove("error", "success");
          if (note.dataset.base) note.textContent = note.dataset.base;
        });
        ok?.classList.add("is-hidden");
        Object.values(readonlyFields).forEach((field) => { if (field) field.value = ""; });
        if (!isEdit) {
          if (destSelect) destSelect.innerHTML = '<option value="">Primero selecciona tipo de destino</option>';
          if (vehicleSelect) { vehicleSelect.value = ""; vehicleSelect.disabled = false; }
          if (weekSelect) { weekSelect.value = ""; weekSelect.disabled = false; }
          if (dateInput) { dateInput.value = ""; dateInput.disabled = false; }
        }
        qs("#operationFormSubmit")?.removeAttribute("disabled");
        qs("#operationFormSubmit")?.classList.remove("is-loading");
      }, 0);
    });
  }

  function initOperationDrawer() {
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
          const key = node.dataset.detailTarget;
          node.textContent = row.dataset[key] || "-";
        });
        const trace = qs("#detailTraceability");
        if (trace) {
          trace.innerHTML = (row.dataset.traceability || "").split(";").filter(Boolean).map((item) => {
            const [title, meta, statusClass] = item.split("|");
            return `<div class="license-item"><strong>${title || "-"}</strong><div class="muted">${meta || ""}</div>${statusClass ? `<span class="status ${statusClass}">${statusClass.replace("status-", "")}</span>` : ""}</div>`;
          }).join("");
        }
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

  function initTableFilters(config) {
    if (window.SIALCore?.initTableFilters) {
      window.SIALCore.initTableFilters(config);
      return;
    }
    const rows = qsa(config.rowSelector);
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
        const text = row.textContent.toLowerCase();
        const stateOk = state === "all" || row.dataset.status === state;
        const ctxOk = ctx === "all" || row.dataset.context === ctx;
        const show = (!term || text.includes(term)) && stateOk && ctxOk;
        row.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });
      if (empty) empty.classList.toggle("show", visible === 0);
      if (count) count.textContent = `${visible} registros visibles`;
    }
    [search, status, context].filter(Boolean).forEach((control) => {
      control.addEventListener(control.tagName === "INPUT" ? "input" : "change", filterRows);
    });
    filterRows();
  }

  return { applyShell, initOperationForm, initOperationDrawer, initTableFilters, setFieldState };
})();