const SIALCore = (() => {
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const normalize = (value) => String(value || "").trim().toLowerCase();
  const defaultTypeLabels = {
    feature: "Nuevo",
    improvement: "Mejora",
    fix: "Correccion",
    docs: "Documentacion"
  };
  const navigationIcons = {
    catalogo: '<path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path>',
    usuarios: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>',
    empresas: '<path d="M3 21h18"></path><path d="M5 21V7l8-4v18"></path><path d="M19 21V11l-6-4"></path>',
    transporte: '<path d="M3 7h11v10H3z"></path><path d="M14 11h4l3 3v3h-7z"></path><circle cx="7" cy="18" r="2"></circle><circle cx="18" cy="18" r="2"></circle>',
    fincas: '<path d="M4 20V9l8-5 8 5v11"></path><path d="M8 20v-7h8v7"></path>',
    planeacion: '<rect x="4" y="5" width="16" height="16" rx="2"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M4 11h16"></path>',
    puerto: '<path d="M4 20h16"></path><path d="M7 20V9l5-4 5 4v11"></path><path d="M9 13h6"></path>',
    indicadores: '<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="M8 15l3-4 3 2 5-7"></path>',
    changelog: '<rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M8 8h8"></path><path d="M8 12h8"></path><path d="M8 16h5"></path>',
    libreria: '<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>',
    default: '<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>'
  };
  const navigationRegistry = {
    gestion: {
      label: "Gestion",
      modules: [
        {
          id: "usuarios",
          label: "Usuarios",
          icon: "usuarios",
          folder: "Gestion de Usuarios",
          localFolder: "sial-usuarios-propuesta",
          views: [
            { id: "usuarios", label: "Gestion de usuarios", href: "gestion-usuarios.html" },
            { id: "registro", label: "Registro de usuario", href: "registro-usuario.html" },
            { id: "edicion", label: "Editar usuario", href: "editar-usuario.html" }
          ]
        },
        {
          id: "empresas",
          label: "Empresas",
          icon: "empresas",
          folder: "Gestion de Empresas",
          localFolder: "sial-empresas-propuesta",
          views: [
            { id: "empresas", label: "Gestion de empresas", href: "gestion-empresas.html" },
            { id: "registro", label: "Registro de empresa", href: "registro-empresa.html" },
            { id: "roles", label: "Roles por empresa", href: "roles-empresa.html" }
          ]
        },
        {
          id: "transporte",
          label: "Transporte",
          icon: "transporte",
          folder: "Gestion de Transporte",
          localFolder: "sial-conductores-propuesta",
          views: [
            { id: "gestion", label: "Gestion de conductores", href: "gestion-conductores.html" },
            { id: "licencias", label: "Categorias de licencia", href: "gestion-categorias-licencia.html" },
            { id: "relacion", label: "Conductor + licencia", href: "relacion-conductor-licencia.html" },
            { id: "vehiculos", label: "Gestion de vehiculos", href: "gestion-vehiculos.html" },
            { id: "tiposVehiculo", label: "Tipos de vehiculo", href: "gestion-tipos-vehiculo.html" },
            { id: "tiposEmpresa", label: "Tipos de empresa", href: "gestion-tipos-empresa.html" },
            { id: "empresaTipo", label: "Empresa + tipo", href: "relacion-empresa-tipo.html" },
            { id: "dashboard", label: "Dashboard transporte", href: "dashboard-transporte.html" },
            { id: "documental", label: "Matriz documental", href: "matriz-documental-vehiculos.html" },
            { id: "disponibilidad", label: "Disponibilidad", href: "disponibilidad-operativa.html" }
          ]
        },
        {
          id: "fincas",
          label: "Fincas",
          icon: "fincas",
          folder: "Gestion de Fincas",
          localFolder: "sial-fincas-propuesta",
          views: [
            { id: "fincas", label: "Gestion de fincas", href: "gestion-fincas.html" },
            { id: "grupos", label: "Gestion de grupos", href: "gestion-grupos.html" },
            { id: "sectores", label: "Gestion de sectores", href: "gestion-sectores.html" },
            { id: "referencias", label: "Gestion de referencias", href: "gestion-referencias.html" },
            { id: "clases", label: "Clases de referencia", href: "gestion-clases-referencia.html" }
          ]
        },
        {
          id: "planeacion",
          label: "Planeacion",
          icon: "planeacion",
          folder: "Gestion de Planeacion",
          localFolder: "sial-aviso-corte-propuesta",
          views: [
            { id: "semanas", label: "Gestion de semanas", href: "gestion-semanas.html" },
            { id: "generacion", label: "Generar semanas", href: "generacion-semanas.html" },
            { id: "cintas", label: "Gestion de cintas", href: "gestion-cintas.html" },
            { id: "validacion", label: "Validacion calendario", href: "validacion-calendario.html" },
            { id: "monitoreo", label: "Monitoreo calendario", href: "monitoreo-calendarios.html" }
          ]
        },
        {
          id: "puerto",
          label: "Puerto",
          icon: "puerto",
          folder: "Gestion Operaciones Puerto",
          localFolder: "sial-puerto-propuesta",
          views: [
            { id: "contenedores", label: "Gestion de contenedores", href: "gestion-contenedores.html" },
            { id: "tipos", label: "Tipos de contenedor", href: "gestion-tipos-contenedor.html" },
            { id: "etapas", label: "Etapas de contenedor", href: "gestion-etapas-contenedor.html" },
            { id: "puertos", label: "Gestion de puertos", href: "gestion-puertos.html" }
          ]
        }
      ]
    }
  };

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;");
  }

  function iconTemplate(name) {
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${navigationIcons[name] || navigationIcons.default}</svg>`;
  }

  function isLocalPrototypePath() {
    const path = window.location.pathname.toLowerCase();
    return path.includes("/sial-") || path.includes("\\sial-");
  }

  function resolveNavigationHref(targetModule, href, activeModuleId) {
    if (!href) return "#";
    if (href.startsWith("#") || /^https?:\/\//i.test(href)) return href;
    if (targetModule.id === activeModuleId) return href;
    const folder = isLocalPrototypePath() ? targetModule.localFolder : targetModule.folder;
    return `../${encodeURI(folder)}/${href}`;
  }

  function initSidebarToggle() {
    const sidebar = qs(".sidebar");
    if (!sidebar || sidebar.dataset.sidebarToggleReady === "true") return;
    sidebar.dataset.sidebarToggleReady = "true";

    const toggles = qsa("[data-sidebar-toggle], .header [aria-label='Abrir menu']");
    if (!toggles.length) return;

    let backdrop = qs("[data-sidebar-backdrop]");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "sidebar-backdrop";
      backdrop.dataset.sidebarBackdrop = "true";
      backdrop.hidden = true;
      document.body.appendChild(backdrop);
    }

    const isSmallViewport = () => window.matchMedia && window.matchMedia("(max-width: 900px)").matches;
    const storedState = localStorage.getItem("sial-sidebar-state") === "collapsed" ? "collapsed" : "expanded";

    function syncToggleLabels(expanded, overlayOpen = false) {
      toggles.forEach((toggle) => {
        toggle.dataset.sidebarToggle = "true";
        toggle.setAttribute("aria-expanded", String(expanded));
        toggle.setAttribute("aria-label", overlayOpen ? "Cerrar menu" : expanded ? "Contraer menu" : "Expandir menu");
        toggle.setAttribute("title", overlayOpen ? "Cerrar menu" : expanded ? "Contraer menu" : "Expandir menu");
      });
    }

    function setSidebarState(state) {
      const normalizedState = state === "collapsed" ? "collapsed" : "expanded";
      document.documentElement.dataset.sidebarState = normalizedState;
      localStorage.setItem("sial-sidebar-state", normalizedState);
      syncToggleLabels(normalizedState !== "collapsed");
    }

    function openOverlay() {
      document.documentElement.dataset.sidebarOverlay = "open";
      backdrop.hidden = false;
      syncToggleLabels(true, true);
      const firstLink = qs("a, button", sidebar);
      firstLink?.focus();
    }

    function closeOverlay() {
      if (document.documentElement.dataset.sidebarOverlay !== "open") return;
      document.documentElement.dataset.sidebarOverlay = "closed";
      backdrop.hidden = true;
      syncToggleLabels(false, false);
    }

    setSidebarState(storedState);

    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        if (isSmallViewport()) {
          if (document.documentElement.dataset.sidebarOverlay === "open") {
            closeOverlay();
          } else {
            openOverlay();
          }
          return;
        }
        const nextState = document.documentElement.dataset.sidebarState === "collapsed" ? "expanded" : "collapsed";
        setSidebarState(nextState);
      });
    });

    backdrop.addEventListener("click", closeOverlay);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeOverlay();
    });
    window.addEventListener("resize", () => {
      if (!isSmallViewport()) closeOverlay();
    });
  }

  function initNavigation(config = {}) {
    const areaId = config.area || "gestion";
    const group = navigationRegistry[areaId];
    const nav = qs(config.nav || "[data-nav]");
    if (!group || !nav) {
      initThemeToggle();
      initSidebarToggle();
      return;
    }

    const activeModuleId = config.module || group.modules[0]?.id;
    const activeModule = group.modules.find((module) => module.id === activeModuleId) || group.modules[0];
    const activeViewId = config.view || activeModule?.views?.[0]?.id;
    const activeViewsStateKey = `sial-nav-views:${areaId}:${activeModule.id}`;
    const activeViewsExpanded = localStorage.getItem(activeViewsStateKey) !== "collapsed";
    const caption = nav.closest(".sidebar")?.querySelector(".menu-caption");
    if (caption) caption.textContent = group.label;

    nav.classList.add("sidebar-nav");
    nav.setAttribute("aria-label", `${group.label}: modulos y vistas`);
    nav.innerHTML = group.modules.map((module) => {
      const isActiveModule = module.id === activeModule.id;
      const firstView = module.views[0];
      const moduleHref = resolveNavigationHref(module, firstView?.href, activeModule.id);
      const sublistId = `nav-${areaId}-${module.id}-views`;
      const sublist = isActiveModule ? `
        <div class="nav-sublist" id="${escapeHtml(sublistId)}" aria-label="Vistas de ${escapeHtml(module.label)}" ${activeViewsExpanded ? "" : "hidden"}>
          ${module.views.map((view) => {
            const isActiveView = view.id === activeViewId;
            return `<a class="nav-link nav-sub-link ${isActiveView ? "active" : ""}" href="${escapeHtml(resolveNavigationHref(module, view.href, activeModule.id))}" ${isActiveView ? 'aria-current="page"' : ""}><span>${escapeHtml(view.label)}</span></a>`;
          }).join("")}
        </div>
      ` : "";
      const moduleToggle = isActiveModule ? `
        <button class="nav-module-toggle" type="button" data-nav-module-toggle data-storage-key="${escapeHtml(activeViewsStateKey)}" aria-controls="${escapeHtml(sublistId)}" aria-expanded="${String(activeViewsExpanded)}" aria-label="${activeViewsExpanded ? "Contraer vistas de" : "Expandir vistas de"} ${escapeHtml(module.label)}" title="${activeViewsExpanded ? "Contraer vistas" : "Expandir vistas"}">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
        </button>
      ` : "";

      return `
        <div class="nav-module ${isActiveModule ? "is-active" : ""}">
          <div class="nav-module-head">
            <a class="nav-link nav-module-link ${isActiveModule ? "active" : ""}" href="${escapeHtml(moduleHref)}" title="${escapeHtml(module.label)}">
              ${iconTemplate(module.icon)}
              <span class="nav-text">${escapeHtml(module.label)}</span>
            </a>
            ${moduleToggle}
          </div>
          ${sublist}
        </div>
      `;
    }).join("");

    qsa("[data-nav-module-toggle]", nav).forEach((button) => {
      button.addEventListener("click", () => {
        const sublist = qs(`#${button.getAttribute("aria-controls")}`, nav);
        if (!sublist) return;
        const willExpand = sublist.hasAttribute("hidden");
        sublist.toggleAttribute("hidden", !willExpand);
        button.setAttribute("aria-expanded", String(willExpand));
        button.setAttribute("aria-label", `${willExpand ? "Contraer" : "Expandir"} vistas de ${activeModule.label}`);
        button.setAttribute("title", willExpand ? "Contraer vistas" : "Expandir vistas");
        localStorage.setItem(button.dataset.storageKey, willExpand ? "expanded" : "collapsed");
      });
    });

    initThemeToggle();
    initSidebarToggle();
  }

  function initThemeToggle() {
    const toggles = qsa("[data-theme-toggle]").filter((toggle) => toggle.dataset.themeReady !== "true");
    if (!toggles.length) return;
    toggles.forEach((toggle) => {
      toggle.dataset.themeReady = "true";
    });
    const storedTheme = localStorage.getItem("sial-theme");
    const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme || (systemDark ? "dark" : "light");

    const setTheme = (theme) => {
      const normalizedTheme = theme === "dark" ? "dark" : "light";
      document.documentElement.dataset.theme = normalizedTheme;
      localStorage.setItem("sial-theme", normalizedTheme);
      const isDark = normalizedTheme === "dark";
      qsa("[data-theme-toggle]").forEach((toggle) => {
        toggle.setAttribute("aria-pressed", String(isDark));
        toggle.setAttribute("aria-label", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
        toggle.setAttribute("title", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      });
    };

    setTheme(initialTheme);
    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
      });
    });
    initSidebarToggle();
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
    const rows = qsa(config.rowSelector || "tbody tr");
    const search = qs(config.search);
    const status = qs(config.status);
    const context = qs(config.context);
    const empty = qs(config.empty);
    const count = qs(config.count);
    let page = 1;
    let pageSize = Number(config.pageSize) || 10;
    const pageSizeOptions = (config.pageSizeOptions || [10, 30, 50]).filter((option) => [10, 30, 50].includes(Number(option))).map(Number);
    let pagination = config.pagination ? qs(config.pagination) : null;

    if (config.pagination !== false && !pagination && rows[0]) {
      const tableWrap = rows[0].closest(".table-wrap");
      if (tableWrap) {
        pagination = document.createElement("div");
        pagination.className = "table-pagination";
        pagination.setAttribute("aria-label", config.paginationLabel || "Paginacion de registros");
        tableWrap.insertAdjacentElement("afterend", pagination);
      }
    }

    function pageButton(label, targetPage, disabled = false, active = false) {
      return `<button class="pagination-btn ${active ? "active" : ""}" type="button" data-page="${targetPage}" ${disabled ? "disabled" : ""} ${active ? 'aria-current="page"' : ""}>${escapeHtml(label)}</button>`;
    }

    function renderPagination(total) {
      if (!pagination) return;
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      page = Math.min(Math.max(page, 1), totalPages);
      const start = total === 0 ? 0 : ((page - 1) * pageSize) + 1;
      const end = Math.min(page * pageSize, total);
      const currentOptions = pageSizeOptions.includes(pageSize) ? pageSizeOptions : [10, 30, 50];
      const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1)
        .filter((item) => totalPages <= 5 || Math.abs(item - page) <= 2 || item === 1 || item === totalPages);
      const pages = visiblePages.reduce((items, item, index) => {
        if (index > 0 && item - visiblePages[index - 1] > 1) items.push('<span class="pagination-gap" aria-hidden="true">...</span>');
        items.push(pageButton(String(item), item, false, item === page));
        return items;
      }, []).join("");

      pagination.innerHTML = `
        <div class="pagination-summary" aria-live="polite">Mostrando ${start}-${end} de ${total} registros</div>
        <label class="pagination-size">
          <span>Registros por pagina</span>
          <select class="select" data-page-size aria-label="Registros por pagina">
            ${currentOptions.map((option) => `<option value="${option}" ${option === pageSize ? "selected" : ""}>${option}</option>`).join("")}
          </select>
        </label>
        <div class="pagination-pages" aria-label="Cambiar pagina">
          ${pageButton("Anterior", page - 1, page <= 1)}
          ${pages}
          ${pageButton("Siguiente", page + 1, page >= totalPages)}
        </div>
      `;
    }

    function filterRows() {
      const term = (search?.value || "").trim().toLowerCase();
      const state = status?.value || "all";
      const ctx = context?.value || "all";
      const filteredRows = rows.filter((row) => {
        const show = (!term || row.textContent.toLowerCase().includes(term)) &&
          (state === "all" || row.dataset.status === state) &&
          (ctx === "all" || row.dataset.context === ctx);
        row.dataset.filterMatch = show ? "true" : "false";
        return show;
      });
      const visible = filteredRows.length;
      const totalPages = Math.max(1, Math.ceil(visible / pageSize));
      page = Math.min(Math.max(page, 1), totalPages);
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      rows.forEach((row) => {
        const filteredIndex = filteredRows.indexOf(row);
        const show = filteredIndex >= startIndex && filteredIndex < endIndex;
        row.classList.toggle("is-hidden", !show);
      });
      empty?.classList.toggle("show", visible === 0);
      if (count) {
        const start = visible === 0 ? 0 : startIndex + 1;
        const end = Math.min(endIndex, visible);
        count.textContent = `${start}-${end} de ${visible} registros`;
      }
      renderPagination(visible);
    }

    [search, status, context].filter(Boolean).forEach((control) => {
      control.addEventListener(control.tagName === "INPUT" ? "input" : "change", () => {
        page = 1;
        filterRows();
      });
    });

    pagination?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-page]");
      if (!button || button.disabled) return;
      page = Number(button.dataset.page) || 1;
      filterRows();
    });

    pagination?.addEventListener("change", (event) => {
      const selector = event.target.closest("[data-page-size]");
      if (!selector) return;
      pageSize = Number(selector.value) || 10;
      page = 1;
      filterRows();
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
      drawer.setAttribute("aria-hidden", "true");
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
        drawer.setAttribute("aria-hidden", "false");
        qs("#closeDetail")?.focus();
      });
    });

    qs("#closeDetail")?.addEventListener("click", close);
    backdrop.addEventListener("click", close);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  }

  function initEmbeddedForm(config = {}) {
    const panel = qs(config.panel || "[data-inline-form-panel]");
    const openButton = qs(config.openButton || "[data-open-inline-form]");
    const cancelButton = qs(config.cancelButton || "[data-cancel-inline-form]");
    const title = qs(config.title || "[data-inline-form-title]");
    const form = panel?.querySelector("form");
    if (!panel || !openButton) return;

    const open = (mode = "new") => {
      panel.classList.remove("is-hidden");
      openButton.setAttribute("aria-expanded", "true");
      if (title) title.textContent = mode === "edit" ? config.editTitle || "Editar registro" : config.newTitle || "Nuevo registro";
      panel.querySelector("input:not([readonly]), select, textarea")?.focus();
    };

    const close = () => {
      panel.classList.add("is-hidden");
      openButton.setAttribute("aria-expanded", "false");
      form?.reset();
      openButton.focus();
    };

    openButton.addEventListener("click", () => open("new"));
    cancelButton?.addEventListener("click", close);
    qsa(config.editButtons || "[data-edit-inline]").forEach((button) => {
      button.addEventListener("click", () => open("edit"));
    });
  }

  function initReleaseChangelog(config = {}) {
    const releases = Array.isArray(config.releases) ? config.releases : [];
    const list = qs(config.list || "#releaseList");
    const search = qs(config.search || "#releaseSearch");
    const moduleFilter = qs(config.moduleFilter || "#moduleFilter");
    const typeFilter = qs(config.typeFilter || "#typeFilter");
    const empty = qs(config.empty || "#releaseEmpty");
    const count = qs(config.count || "#releaseCount");
    const copyButton = config.copyButton ? qs(config.copyButton) : null;
    const cardClass = config.cardClass || "public-release-card";
    const typeLabels = { ...defaultTypeLabels, ...(config.typeLabels || {}) };
    const countLabel = config.countLabel || "versiones visibles";
    const copyText = config.copyText || "Copiar enlace";
    if (!list) return;

    function releaseTemplate(release) {
      const changes = (release.changes || []).map((change) => `<li>${escapeHtml(change)}</li>`).join("");
      const searchValue = normalize(`${release.version} ${release.title} ${release.moduleLabel} ${release.summary} ${(release.changes || []).join(" ")}`);
      return `
        <article class="release-card ${cardClass}" id="${escapeHtml(release.id)}" data-module="${escapeHtml(release.module)}" data-type="${escapeHtml(release.type)}" data-search="${escapeHtml(searchValue)}">
          <div class="release-date">
            <span>${escapeHtml(release.date)}</span>
            <strong>${escapeHtml(release.version)}</strong>
          </div>
          <div class="release-content">
            <div class="release-head">
              <div>
                <p class="section-kicker">${escapeHtml(release.moduleLabel)}</p>
                <h2>${escapeHtml(release.title)}</h2>
              </div>
              <span class="tag tag-success">${escapeHtml(typeLabels[release.type] || release.type)}</span>
            </div>
            <p>${escapeHtml(release.summary)}</p>
            <ul>${changes}</ul>
          </div>
        </article>
      `;
    }

    function applyFilters() {
      const term = normalize(search?.value);
      const module = moduleFilter?.value || "all";
      const type = typeFilter?.value || "all";
      let visible = 0;

      qsa(".release-card", list).forEach((card) => {
        const show = (!term || card.dataset.search.includes(term)) &&
          (module === "all" || card.dataset.module === module) &&
          (type === "all" || card.dataset.type === type);
        card.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });

      empty?.classList.toggle("show", visible === 0);
      if (count) count.textContent = `${visible} ${countLabel}`;
    }

    list.innerHTML = releases.map(releaseTemplate).join("");
    [search, moduleFilter, typeFilter].filter(Boolean).forEach((control) => {
      control.addEventListener(control.tagName === "INPUT" ? "input" : "change", applyFilters);
    });

    copyButton?.addEventListener("click", async () => {
      const url = window.location.href.split("#")[0];
      try {
        await navigator.clipboard.writeText(url);
        copyButton.textContent = "Enlace copiado";
      } catch {
        copyButton.textContent = "Copia no disponible";
      }
      setTimeout(() => {
        copyButton.textContent = copyText;
      }, 1800);
    });

    initThemeToggle();
    applyFilters();
  }

  return {
    qs,
    qsa,
    escapeHtml,
    normalize,
    initThemeToggle,
    initSidebarToggle,
    initNavigation,
    navigationRegistry,
    setFieldState,
    initTableFilters,
    initDrawer,
    initEmbeddedForm,
    initReleaseChangelog
  };
})();

window.SIALCore = SIALCore;
