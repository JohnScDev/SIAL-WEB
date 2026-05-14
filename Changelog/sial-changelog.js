const SIALChangelog = (() => {
  const releases = [
    {
      id: "v090",
      version: "v0.9.0",
      date: "05/05/2026",
      title: "Catalogo de vistas y modo oscuro",
      module: "catalogo",
      moduleLabel: "Catalogo",
      type: "improvement",
      summary: "El catalogo queda preparado para socializar las propuestas por modulo, consultar avances y revisar las vistas en modo claro u oscuro.",
      changes: [
        "Se agrego cambio de tema claro/oscuro para revisar las propuestas en ambos escenarios de uso.",
        "Se organizo la navegacion por modulos, familias de vista y estado de avance.",
        "Se incorporo una libreria visual para mantener consistencia entre botones, alertas, formularios, tablas y estados."
      ]
    },
    {
      id: "v085",
      version: "v0.8.5",
      date: "05/05/2026",
      title: "Changelog para consulta de usuarios",
      module: "catalogo",
      moduleLabel: "Catalogo",
      type: "feature",
      summary: "Se habilita un historial de cambios para comunicar nuevas vistas, mejoras funcionales y ajustes visibles de forma ordenada.",
      changes: [
        "Los usuarios pueden consultar versiones publicadas por modulo y tipo de cambio.",
        "La busqueda permite ubicar rapidamente mejoras, correcciones o nuevas funcionalidades.",
        "Cada version resume el beneficio funcional sin exponer detalles tecnicos internos."
      ]
    },
    {
      id: "v080",
      version: "v0.8.0",
      date: "04/05/2026",
      title: "Ingreso y recuperacion de acceso",
      module: "autenticacion",
      moduleLabel: "Autenticacion",
      type: "feature",
      summary: "Se incorporan propuestas completas para ingreso al sistema, olvido de contrasena, verificacion por codigo y cambio de clave.",
      changes: [
        "El login presenta una experiencia institucional con imagenes de sectores operativos.",
        "La recuperacion de acceso guia al usuario por solicitud de codigo, verificacion OTP y creacion de nueva contrasena.",
        "Se agrego una segunda alternativa visual de login con cover flow manteniendo el mismo flujo funcional."
      ]
    },
    {
      id: "v070",
      version: "v0.7.0",
      date: "29/04/2026",
      title: "Planeacion de Aviso de Corte",
      module: "planeacion",
      moduleLabel: "Planeacion",
      type: "feature",
      summary: "Se habilitan vistas para gestionar semanas productivas, cintas oficiales y monitorear calendarios generados.",
      changes: [
        "La gestion de semanas permite consultar el calendario productivo con cinta asignada y trazabilidad.",
        "La gestion de cintas facilita administrar colores oficiales, orden de secuencia y estado.",
        "El monitoreo anual muestra semanas, meses, cintas y notas operativas en una vista tipo calendario."
      ]
    },
    {
      id: "v060",
      version: "v0.6.0",
      date: "28/04/2026",
      title: "Gestion de transporte ampliada",
      module: "transporte",
      moduleLabel: "Transporte",
      type: "feature",
      summary: "Se amplian las vistas para administrar conductores, licencias, vehiculos y disponibilidad operativa.",
      changes: [
        "La gestion de conductores incluye consulta, registro, edicion, inactivacion y visualizacion lateral del detalle.",
        "La gestion de vehiculos incorpora datos de flota, empresas asociadas, SOAT, tecnomecanica y disponibilidad.",
        "Las vistas analiticas apoyan seguimiento documental, vencimientos y restricciones operativas."
      ]
    },
    {
      id: "v050",
      version: "v0.5.0",
      date: "27/04/2026",
      title: "Gestion de fincas y referencias",
      module: "fincas",
      moduleLabel: "Fincas",
      type: "feature",
      summary: "Se aterrizan vistas para administrar fincas, grupos, sectores, referencias y clases de referencia.",
      changes: [
        "Las fincas y referencias usan formularios dedicados por su cantidad de campos y reglas de negocio.",
        "Las maestras cortas como grupos, sectores y clases usan registro embebido dentro de la vista de gestion.",
        "Las tablas permiten consultar, filtrar, editar, activar o inactivar registros con auditoria visible."
      ]
    },
    {
      id: "v040",
      version: "v0.4.0",
      date: "26/04/2026",
      title: "Operaciones Puerto",
      module: "puerto",
      moduleLabel: "Puerto",
      type: "feature",
      summary: "Se incorporan tablas maestras para configurar contenedores, tipos de contenedor, etapas operativas y puertos.",
      changes: [
        "La gestion de contenedores contempla numero de contenedor, tipo y estado.",
        "Los tipos de contenedor permiten registrar codigo, descripcion y capacidad.",
        "Las etapas y puertos quedan disponibles para soportar recepcion, inspeccion, consolidacion, despacho y exportacion."
      ]
    }
  ];

  function init() {
    window.SIALCore?.initReleaseChangelog?.({
      releases,
      copyButton: "#copyPublicLink",
      copyText: "Copiar enlace"
    });
  }

  return { init };
})();

SIALChangelog.init();
