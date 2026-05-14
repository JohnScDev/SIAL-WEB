const SIALChangelogInterno = (() => {
  const releases = [
    {
      id: "v090",
      version: "v0.9.0",
      date: "05/05/2026",
      title: "Centralizacion de libreria UI y dark mode",
      module: "catalogo",
      moduleLabel: "Catalogo",
      type: "improvement",
      summary: "Se estabiliza la base compartida para que las propuestas crezcan con menos duplicidad y mayor control de temas.",
      changes: [
        "Cambio tecnico: los modulos deben consumir `shared/sial-core.css` y `shared/sial-core.js` como fuente visual principal.",
        "Validacion QA: revisar persistencia de `sial-theme`, contraste de alertas y comportamiento del boton de tema en cada modulo.",
        "Riesgo: carpetas publicadas con copias antiguas de `shared` pueden generar diferencias entre catalogo y vistas finales."
      ]
    },
    {
      id: "v085",
      version: "v0.8.5",
      date: "05/05/2026",
      title: "Separacion de changelog externo e interno",
      module: "catalogo",
      moduleLabel: "Catalogo",
      type: "feature",
      summary: "Se define una separacion de audiencia para publicar cambios funcionales a usuarios y conservar notas tecnicas para TI.",
      changes: [
        "Cambio tecnico: el externo mantiene contenido funcional; el interno conserva impacto tecnico, validaciones, riesgos y dependencias.",
        "Validacion QA: verificar que ambas vistas compartan estructura visual, filtros y comportamiento de enlace copiable.",
        "Riesgo: publicar notas internas en el changelog externo puede exponer decisiones tecnicas o informacion operativa no destinada a usuarios."
      ]
    },
    {
      id: "v080",
      version: "v0.8.0",
      date: "04/05/2026",
      title: "Flujos de autenticacion y recuperacion",
      module: "autenticacion",
      moduleLabel: "Autenticacion",
      type: "feature",
      summary: "Se definen vistas completas de login, recuperacion por OTP y cambio de contrasena para posterior integracion con backend.",
      changes: [
        "Cambio tecnico: las vistas son funcionales a nivel de propuesta, pero no ejecutan autenticacion real ni consumo de API.",
        "Validacion QA: probar foco visible, navegacion por teclado, errores de credenciales, reenvio de OTP y consistencia dimensional entre pasos.",
        "Dependencia: antes de produccion se requieren endpoints de login, recuperacion, verificacion OTP, politicas de expiracion y bloqueo por intentos."
      ]
    },
    {
      id: "v070",
      version: "v0.7.0",
      date: "29/04/2026",
      title: "Reglas de calendario para Aviso de Corte",
      module: "planeacion",
      moduleLabel: "Planeacion",
      type: "feature",
      summary: "Se modelan vistas para semanas productivas y cintas, con reglas que requieren validacion estricta antes de implementacion productiva.",
      changes: [
        "Cambio tecnico: la generacion de 52 semanas debe controlar rango lunes-domingo, mes calculado por domingo y ausencia de traslapes.",
        "Validacion QA: probar anio completo, secuencia de cintas sin saltos, duplicidad por semana/anio y notas operativas.",
        "Riesgo: una generacion incorrecta de calendario puede impactar planeacion agricola, trazabilidad y reportes operativos."
      ]
    },
    {
      id: "v060",
      version: "v0.6.0",
      date: "28/04/2026",
      title: "Transporte, vehiculos y control documental",
      module: "transporte",
      moduleLabel: "Transporte",
      type: "feature",
      summary: "Se estructuran vistas de transporte con formularios grandes, tablas maestras, relaciones y monitoreo documental.",
      changes: [
        "Cambio tecnico: conductores y vehiculos requieren formularios dedicados por volumen de campos, FK y reglas de negocio.",
        "Validacion QA: validar unicidad, inactivacion sin eliminacion, fechas de vigencia, empresas activas y no asignacion de registros inactivos.",
        "Dependencia: la implementacion real debe integrarse con empresas, tipos, operaciones, auditoria y reglas de disponibilidad."
      ]
    },
    {
      id: "v050",
      version: "v0.5.0",
      date: "27/04/2026",
      title: "Fincas, referencias y maestras cortas",
      module: "fincas",
      moduleLabel: "Fincas",
      type: "feature",
      summary: "Se aplican patrones diferenciados para formularios grandes, medianos y cortos dentro del modulo de fincas.",
      changes: [
        "Cambio tecnico: fincas y referencias van en vista dedicada; grupos, sectores y clases usan formulario embebido en gestion.",
        "Validacion QA: revisar mayusculas sostenidas, unicidad, versionamiento de referencias, estados y relaciones con registros asociados.",
        "Riesgo: modificar referencias sin control de version puede afectar procesos de siembra, cosecha, produccion y exportacion."
      ]
    },
    {
      id: "v040",
      version: "v0.4.0",
      date: "26/04/2026",
      title: "Maestras base para Operaciones Puerto",
      module: "puerto",
      moduleLabel: "Puerto",
      type: "feature",
      summary: "Se estructuran las vistas base de puerto para soportar configuracion previa a operaciones logisticas.",
      changes: [
        "Cambio tecnico: contenedores deben validar formato ISO y depender de tipos de contenedor existentes.",
        "Validacion QA: probar capacidad mayor a cero, codigos unicos, estados obligatorios y acciones de activar o inactivar.",
        "Dependencia: estas maestras deben integrarse luego con recepcion, inspeccion, consolidacion, despacho y exportacion."
      ]
    }
  ];

  function init() {
    window.SIALCore?.initReleaseChangelog?.({
      releases,
      copyButton: "#copyInternalLink",
      copyText: "Copiar enlace"
    });
  }

  return { init };
})();

SIALChangelogInterno.init();
