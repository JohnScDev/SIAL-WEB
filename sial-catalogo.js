const SIALCatalog = (() => {
  const views = [
    {
      module: "libreria",
      moduleLabel: "Libreria UI",
      title: "Componentes compartidos SIAL",
      family: "documentacion",
      status: "base",
      href: "shared/componentes.html",
      description: "Guia visual navegable de tokens, botones, alertas, formularios, tablas, estados, analitica y modo oscuro.",
      tags: ["Componentes", "Dark mode", "Tokens"]
    },
    {
      module: "sistema",
      moduleLabel: "Estados del sistema",
      title: "Error 401 - Sesion no autenticada",
      family: "sistema",
      status: "implementada",
      href: "Errores/401.html",
      description: "Pagina institucional para sesion vencida, no autenticada o acceso que requiere volver al login.",
      tags: ["401", "Autenticacion", "Sesion"]
    },
    {
      module: "sistema",
      moduleLabel: "Estados del sistema",
      title: "Error 403 - Acceso restringido",
      family: "sistema",
      status: "implementada",
      href: "Errores/403.html",
      description: "Pagina para usuarios sin permisos funcionales sobre una vista, modulo u operacion protegida.",
      tags: ["403", "Permisos", "Seguridad"]
    },
    {
      module: "sistema",
      moduleLabel: "Estados del sistema",
      title: "Error 404 - Vista no encontrada",
      family: "sistema",
      status: "implementada",
      href: "Errores/404.html",
      description: "Pagina para rutas inexistentes o vistas no publicadas; incluye fallback raiz para GitHub Pages.",
      tags: ["404", "Ruta", "GitHub Pages"]
    },
    {
      module: "sistema",
      moduleLabel: "Estados del sistema",
      title: "Error 500 - Falla de servicio",
      family: "sistema",
      status: "implementada",
      href: "Errores/500.html",
      description: "Pagina para errores internos o fallas de servicio, con accion de reintento y retorno seguro.",
      tags: ["500", "Servicio", "Reintentar"]
    },
    {
      module: "indicadores",
      moduleLabel: "Indicadores y KPIs",
      title: "Catalogo funcional de indicadores",
      family: "analitica",
      status: "implementada",
      href: "Indicadores/index.html",
      description: "Vista funcional con filtros, escenarios, proyeccion, riesgo, capacidad, graficas analiticas y lectura operativa accionable.",
      tags: ["KPIs", "Proyeccion", "Graficas", "Riesgo"]
    },
    {
      module: "changelog",
      moduleLabel: "Changelog",
      title: "Changelog externo SIAL",
      family: "comunicacion",
      status: "implementada",
      href: "Changelog/index.html",
      description: "Historial consumible por usuarios para versiones, mejoras, correcciones y cambios visibles de la propuesta.",
      tags: ["Comunicacion", "Versiones", "Usuarios"]
    },
    {
      module: "changelog",
      moduleLabel: "Changelog",
      title: "Changelog interno TI",
      family: "documentacion",
      status: "implementada",
      href: "Changelog/changelog-interno.html",
      description: "Registro tecnico para dev, TI y lideres tecnicos con riesgos, dependencias, validaciones QA y notas internas.",
      tags: ["Interno", "TI", "QA"]
    },
    {
      module: "changelog",
      moduleLabel: "Changelog",
      title: "Administracion de changelog",
      family: "gestion",
      status: "implementada",
      href: "Changelog/administracion-changelog.html",
      description: "Vista de gestion para crear, editar, publicar o remover entradas conservando auditoria de cambios.",
      tags: ["Gestion", "Auditoria", "Publicacion"]
    },
    {
      module: "autenticacion",
      moduleLabel: "Login y Autenticacion",
      title: "Login institucional",
      family: "autenticacion",
      status: "implementada",
      href: "Login/index.html",
      description: "Propuesta de login con panel visual rotativo de sectores operativos y formulario alineado a la familia Autenticacion.",
      tags: ["Autenticacion", "Carrusel", "Responsive"]
    },
    {
      module: "autenticacion",
      moduleLabel: "Login y Autenticacion",
      title: "Login propuesta 2 - Cover flow",
      family: "autenticacion",
      status: "implementada",
      href: "Login/login-cover-flow.html",
      description: "Segunda propuesta de login con cover flow institucional en el panel izquierdo y formulario funcional conservado.",
      tags: ["Autenticacion", "Cover flow", "Responsive"]
    },
    {
      module: "autenticacion",
      moduleLabel: "Login y Autenticacion",
      title: "Cover flow - Paso 1 solicitar codigo",
      family: "autenticacion",
      status: "implementada",
      href: "Login/recuperar-cover-flow.html",
      description: "Primer paso de recuperacion para la propuesta cover flow: captura de usuario y envio del codigo OTP.",
      tags: ["Autenticacion", "Cover flow", "OTP"]
    },
    {
      module: "autenticacion",
      moduleLabel: "Login y Autenticacion",
      title: "Cover flow - Paso 2 verificar OTP",
      family: "autenticacion",
      status: "implementada",
      href: "Login/verificar-cover-flow.html",
      description: "Verificacion OTP de seis digitos para la propuesta cover flow, con reenvio controlado y accesibilidad basica.",
      tags: ["Autenticacion", "Cover flow", "OTP"]
    },
    {
      module: "autenticacion",
      moduleLabel: "Login y Autenticacion",
      title: "Cover flow - Paso 3 nueva contrasena",
      family: "autenticacion",
      status: "implementada",
      href: "Login/restablecer-cover-flow.html",
      description: "Paso final de restablecimiento de contrasena para la propuesta cover flow.",
      tags: ["Autenticacion", "Cover flow", "Contrasena"]
    },
    {
      module: "autenticacion",
      moduleLabel: "Login y Autenticacion",
      title: "Paso 1 - Solicitar codigo",
      family: "autenticacion",
      status: "implementada",
      href: "Login/recuperar-contrasena.html",
      description: "Primer paso del flujo de recuperacion: captura de usuario y envio del codigo OTP al correo registrado.",
      tags: ["Autenticacion", "Recuperacion", "OTP"]
    },
    {
      module: "autenticacion",
      moduleLabel: "Login y Autenticacion",
      title: "Paso 2 - Verificar codigo OTP",
      family: "autenticacion",
      status: "implementada",
      href: "Login/verificar-codigo.html",
      description: "Paso de verificacion con indicador de progreso, entrada OTP de seis digitos, reenvio controlado y continuidad al cambio de contrasena.",
      tags: ["Autenticacion", "OTP", "Stepper"]
    },
    {
      module: "autenticacion",
      moduleLabel: "Login y Autenticacion",
      title: "Paso 3 - Restablecer contrasena",
      family: "autenticacion",
      status: "implementada",
      href: "Login/restablecer-contrasena.html",
      description: "Paso final del flujo de recuperacion para definir nueva contrasena manteniendo la familia visual del login.",
      tags: ["Autenticacion", "Contrasena", "Stepper"]
    },
    {
      module: "usuarios",
      moduleLabel: "Gestion de Usuarios",
      title: "Gestion de usuarios",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20de%20Usuarios/gestion-usuarios.html",
      description: "Listado maestro con filtros, estado, auditoria, acciones y detalle lateral de empresas y roles.",
      tags: ["Usuarios", "Drawer derecho"]
    },
    {
      module: "usuarios",
      moduleLabel: "Gestion de Usuarios",
      title: "Registro de usuario",
      family: "registro",
      status: "implementada",
      href: "Gestion%20de%20Usuarios/registro-usuario.html",
      description: "Formulario extenso con datos personales, acceso y relacion acumulativa empresa + roles.",
      tags: ["Formulario extenso", "Empresa + roles"]
    },
    {
      module: "usuarios",
      moduleLabel: "Gestion de Usuarios",
      title: "Editar usuario",
      family: "registro",
      status: "implementada",
      href: "Gestion%20de%20Usuarios/editar-usuario.html",
      description: "Edicion separada de datos basicos y roles por empresa para evitar cambios acoplados.",
      tags: ["Edicion", "Roles"]
    },
    {
      module: "empresas",
      moduleLabel: "Gestion de Empresas",
      title: "Gestion de empresas",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20de%20Empresas/gestion-empresas.html",
      description: "Listado maestro de empresas con NIT, roles asociados, alcance, estado y auditoria.",
      tags: ["Empresas", "Maestra"]
    },
    {
      module: "empresas",
      moduleLabel: "Gestion de Empresas",
      title: "Registro de empresa",
      family: "registro",
      status: "implementada",
      href: "Gestion%20de%20Empresas/registro-empresa.html",
      description: "Formulario administrativo para datos base, NIT, tipo principal, alcance y estado.",
      tags: ["Formulario", "NIT"]
    },
    {
      module: "empresas",
      moduleLabel: "Gestion de Empresas",
      title: "Roles por empresa",
      family: "relacion",
      status: "implementada",
      href: "Gestion%20de%20Empresas/roles-empresa.html",
      description: "Gestion relacional tipo transfer para roles disponibles por empresa.",
      tags: ["Relacion", "Transfer"]
    },
    {
      module: "transporte",
      moduleLabel: "Gestion de Transporte",
      title: "Gestion de conductores",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20de%20Transporte/gestion-conductores.html",
      description: "Tabla maestra de conductores con registro dedicado, auditoria, estados y visualizacion lateral.",
      tags: ["Conductores", "Maestra grande", "Drawer derecho"]
    },
    {
      module: "transporte",
      moduleLabel: "Gestion de Transporte",
      title: "Registro de conductor",
      family: "registro",
      status: "implementada",
      href: "Gestion%20de%20Transporte/registro-conductor.html",
      description: "Formulario dedicado para conductor por cantidad de campos, FK y reglas de negocio.",
      tags: ["Formulario grande", "Validaciones", "Licencias"]
    },
    {
      module: "transporte",
      moduleLabel: "Gestion de Transporte",
      title: "Categorias de licencia",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20de%20Transporte/gestion-categorias-licencia.html",
      description: "Maestra corta con formulario embebido y acciones de activar o inactivar.",
      tags: ["Maestra corta", "Formulario embebido"]
    },
    {
      module: "transporte",
      moduleLabel: "Gestion de Transporte",
      title: "Relacion conductor licencia",
      family: "relacion",
      status: "implementada",
      href: "Gestion%20de%20Transporte/relacion-conductor-licencia.html",
      description: "Vista de relacion para categorias activas por conductor y fecha de vencimiento.",
      tags: ["Relacion", "Clave compuesta"]
    },
    {
      module: "transporte",
      moduleLabel: "Gestion de Transporte",
      title: "Gestion de vehiculos",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20de%20Transporte/gestion-vehiculos.html",
      description: "Gestion principal de vehiculos con acceso a registro dedicado por reglas documentales.",
      tags: ["Vehiculos", "Maestra grande", "SOAT"]
    },
    {
      module: "transporte",
      moduleLabel: "Gestion de Transporte",
      title: "Registro de vehiculo",
      family: "registro",
      status: "implementada",
      href: "Gestion%20de%20Transporte/registro-vehiculo.html",
      description: "Formulario dedicado para documentos, empresas, fechas y disponibilidad del vehiculo.",
      tags: ["Formulario grande", "Fechas", "Empresas"]
    },
    {
      module: "transporte",
      moduleLabel: "Gestion de Transporte",
      title: "Tipos de vehiculo",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20de%20Transporte/gestion-tipos-vehiculo.html",
      description: "Catalogo corto para tipos de vehiculo con nombre unico y estado.",
      tags: ["Maestra corta", "Transporte"]
    },
    {
      module: "transporte",
      moduleLabel: "Gestion de Transporte",
      title: "Tipos de empresa",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20de%20Transporte/gestion-tipos-empresa.html",
      description: "Catalogo de clasificacion de empresas para flujos comerciales y logisticos.",
      tags: ["Maestra corta", "Empresa"]
    },
    {
      module: "transporte",
      moduleLabel: "Gestion de Transporte",
      title: "Relacion empresa tipo",
      family: "relacion",
      status: "implementada",
      href: "Gestion%20de%20Transporte/relacion-empresa-tipo.html",
      description: "Relacion de empresas con uno o varios tipos activos.",
      tags: ["Relacion", "Clave compuesta"]
    },
    {
      module: "transporte",
      moduleLabel: "Gestion de Transporte",
      title: "Dashboard transporte",
      family: "analitica",
      status: "implementada",
      href: "Gestion%20de%20Transporte/dashboard-transporte.html",
      description: "Resumen analitico para seguimiento operativo de transporte.",
      tags: ["Analitica", "KPIs"]
    },
    {
      module: "transporte",
      moduleLabel: "Gestion de Transporte",
      title: "Matriz documental vehiculos",
      family: "analitica",
      status: "implementada",
      href: "Gestion%20de%20Transporte/matriz-documental-vehiculos.html",
      description: "Control documental de SOAT, tecnomecanica, alertas y vencimientos.",
      tags: ["Analitica", "Documentos"]
    },
    {
      module: "transporte",
      moduleLabel: "Gestion de Transporte",
      title: "Disponibilidad operativa",
      family: "analitica",
      status: "implementada",
      href: "Gestion%20de%20Transporte/disponibilidad-operativa.html",
      description: "Vista de disponibilidad y restricciones operativas de flota.",
      tags: ["Analitica", "Disponibilidad"]
    },
    {
      module: "fincas",
      moduleLabel: "Gestion de Fincas",
      title: "Gestion de fincas",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20de%20Fincas/gestion-fincas.html",
      description: "Gestion principal de fincas con acceso a registro dedicado por estructura grande.",
      tags: ["Fincas", "Maestra grande", "FK"]
    },
    {
      module: "fincas",
      moduleLabel: "Gestion de Fincas",
      title: "Registro de finca",
      family: "registro",
      status: "implementada",
      href: "Gestion%20de%20Fincas/registro-finca.html",
      description: "Formulario dedicado para datos de finca, productor, grupo, sector y geolocalizacion.",
      tags: ["Formulario grande", "Productor"]
    },
    {
      module: "fincas",
      moduleLabel: "Gestion de Fincas",
      title: "Gestion de referencias",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20de%20Fincas/gestion-referencias.html",
      description: "Gestion de referencias con versionamiento y acceso a registro dedicado.",
      tags: ["Referencias", "Versionamiento"]
    },
    {
      module: "fincas",
      moduleLabel: "Gestion de Fincas",
      title: "Registro de referencia",
      family: "registro",
      status: "implementada",
      href: "Gestion%20de%20Fincas/registro-referencia.html",
      description: "Formulario dedicado para pesos, clase, fruta, conversion y version de referencia.",
      tags: ["Formulario grande", "Pesos"]
    },
    {
      module: "fincas",
      moduleLabel: "Gestion de Fincas",
      title: "Gestion de grupos",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20de%20Fincas/gestion-grupos.html",
      description: "Maestra corta con formulario embebido para grupos de fincas.",
      tags: ["Maestra corta", "Formulario embebido"]
    },
    {
      module: "fincas",
      moduleLabel: "Gestion de Fincas",
      title: "Gestion de sectores",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20de%20Fincas/gestion-sectores.html",
      description: "Maestra corta para sectores asociados a ubicacion de fincas.",
      tags: ["Maestra corta", "Sectores"]
    },
    {
      module: "fincas",
      moduleLabel: "Gestion de Fincas",
      title: "Clases de referencia",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20de%20Fincas/gestion-clases-referencia.html",
      description: "Maestra corta con formulario embebido y validacion de nombre mas tamano.",
      tags: ["Maestra corta", "Clase"]
    },
    {
      module: "puerto",
      moduleLabel: "Gestion Operaciones Puerto",
      title: "Gestion de contenedores",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20Operaciones%20Puerto/gestion-contenedores.html",
      description: "Maestra de contenedores con validacion de formato ISO, tipo existente y estado.",
      tags: ["Contenedores", "Formato ISO"]
    },
    {
      module: "puerto",
      moduleLabel: "Gestion Operaciones Puerto",
      title: "Tipos de contenedor",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20Operaciones%20Puerto/gestion-tipos-contenedor.html",
      description: "Catalogo de tipos de contenedor con codigo definido por usuario y capacidad mayor a cero.",
      tags: ["Maestra corta", "Capacidad"]
    },
    {
      module: "puerto",
      moduleLabel: "Gestion Operaciones Puerto",
      title: "Etapas de contenedor",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20Operaciones%20Puerto/gestion-etapas-contenedor.html",
      description: "Catalogo de etapas operativas para recepcion, inspeccion, consolidacion y exportacion.",
      tags: ["Maestra corta", "Etapas"]
    },
    {
      module: "puerto",
      moduleLabel: "Gestion Operaciones Puerto",
      title: "Gestion de puertos",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20Operaciones%20Puerto/gestion-puertos.html",
      description: "Catalogo de puertos con codigo autoincremental, nombre obligatorio y estado.",
      tags: ["Maestra corta", "Puertos"]
    },
    {
      module: "aviso-corte",
      moduleLabel: "Planeacion Aviso de Corte",
      title: "Gestion de semanas",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20de%20Planeacion/gestion-semanas.html",
      description: "Consulta de semanas productivas con rango lunes a domingo, cinta asignada, mes calculado y auditoria.",
      tags: ["Semanas", "52 semanas", "Drawer derecho"]
    },
    {
      module: "aviso-corte",
      moduleLabel: "Planeacion Aviso de Corte",
      title: "Generacion de semanas",
      family: "registro",
      status: "implementada",
      href: "Gestion%20de%20Planeacion/generacion-semanas.html",
      description: "Formulario dedicado para generar automaticamente 52 semanas desde la semana 1 y una cinta inicial.",
      tags: ["Formulario grande", "Secuencia", "Validacion fechas"]
    },
    {
      module: "aviso-corte",
      moduleLabel: "Planeacion Aviso de Corte",
      title: "Gestion de cintas",
      family: "gestion",
      status: "implementada",
      href: "Gestion%20de%20Planeacion/gestion-cintas.html",
      description: "Maestra corta con formulario embebido para el calendario oficial de cintas y orden sin saltos.",
      tags: ["Cintas", "Maestra corta", "Calendario oficial"]
    },
    {
      module: "aviso-corte",
      moduleLabel: "Planeacion Aviso de Corte",
      title: "Validacion calendario",
      family: "analitica",
      status: "implementada",
      href: "Gestion%20de%20Planeacion/validacion-calendario.html",
      description: "Vista de control operativo para validar 52 semanas, traslapes, secuencia de cintas, auditoria y hallazgos.",
      tags: ["Analitica", "QA operativo", "Reglas HU"]
    },
    {
      module: "aviso-corte",
      moduleLabel: "Planeacion Aviso de Corte",
      title: "Monitoreo calendario",
      family: "analitica",
      status: "implementada",
      href: "Gestion%20de%20Planeacion/monitoreo-calendarios.html",
      description: "Vista anual tipo calendario para monitorear semanas generadas, cintas, notas operativas y trazabilidad.",
      tags: ["Analitica", "Calendario", "Operacion"]
    }
  ];

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function cardTemplate(view) {
    const familyLabel = view.family.charAt(0).toUpperCase() + view.family.slice(1);
    const tags = view.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
    return `
      <article class="module-card" data-module="${view.module}" data-family="${view.family}" data-status="${view.status}" data-search="${normalize(`${view.moduleLabel} ${view.title} ${view.description} ${view.tags.join(" ")}`)}">
        <div class="module-card-header">
          <div>
            <p class="section-kicker">${view.moduleLabel}</p>
            <h3 class="module-title">${view.title}</h3>
          </div>
          <span class="tag tag-success">${familyLabel}</span>
        </div>
        <p class="module-description">${view.description}</p>
        <div class="tag-row">
          <span class="tag tag-warning">${view.status === "implementada" ? "Implementada" : "Base"}</span>
          ${tags}
        </div>
        <div class="module-actions">
          <a href="${view.href}">Abrir vista</a>
          <a class="btn btn-secondary" href="${view.href}" aria-label="Abrir ${view.title}">Ver propuesta</a>
        </div>
      </article>
    `;
  }

  function render() {
    ["libreria", "sistema", "indicadores", "changelog", "autenticacion", "usuarios", "empresas", "transporte", "fincas", "puerto", "aviso-corte"].forEach((module) => {
      const group = qs(`[data-module-group="${module}"]`);
      if (!group) return;
      group.innerHTML = views.filter((view) => view.module === module).map(cardTemplate).join("");
    });
  }

  function applyFilters() {
    const term = normalize(qs("#globalSearch")?.value);
    const moduleFilter = qs("#moduleFilter")?.value || "all";
    const familyFilter = qs("#familyFilter")?.value || "all";
    const statusFilter = qs("#statusFilter")?.value || "all";
    let visible = 0;

    qsa(".module-card").forEach((card) => {
      const show = (!term || card.dataset.search.includes(term)) &&
        (moduleFilter === "all" || card.dataset.module === moduleFilter) &&
        (familyFilter === "all" || card.dataset.family === familyFilter) &&
        (statusFilter === "all" || card.dataset.status === statusFilter);
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });

    const visibleCount = qs("#visibleCount");
    if (visibleCount) visibleCount.textContent = String(visible);
    qs("#emptyState")?.classList.toggle("show", visible === 0);
  }

  function initFilters() {
    ["#globalSearch", "#moduleFilter", "#familyFilter", "#statusFilter"].forEach((selector) => {
      const control = qs(selector);
      if (!control) return;
      control.addEventListener(control.tagName === "INPUT" ? "input" : "change", applyFilters);
    });
    qs("#clearFilters")?.addEventListener("click", () => {
      qs("#globalSearch").value = "";
      qs("#moduleFilter").value = "all";
      qs("#familyFilter").value = "all";
      qs("#statusFilter").value = "all";
      applyFilters();
      qs("#globalSearch").focus();
    });
  }

  function initSectionLinks() {
    qsa("[data-section-link]").forEach((link) => {
      link.addEventListener("click", () => {
        qsa("[data-section-link]").forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }

  function initThemeToggle() {
    const toggle = qs("[data-theme-toggle]");
    if (!toggle) return;

    const storedTheme = localStorage.getItem("sial-theme");
    const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    function setTheme(theme) {
      const normalizedTheme = theme === "dark" ? "dark" : "light";
      document.documentElement.dataset.theme = normalizedTheme;
      localStorage.setItem("sial-theme", normalizedTheme);
      const isDark = normalizedTheme === "dark";
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute("aria-label", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      toggle.setAttribute("title", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    }

    setTheme(storedTheme || (systemDark ? "dark" : "light"));

    toggle.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
    });
  }

  function init() {
    render();
    initFilters();
    initSectionLinks();
    window.SIALCore?.initThemeToggle?.();
    applyFilters();
  }

  return { init };
})();

SIALCatalog.init();
