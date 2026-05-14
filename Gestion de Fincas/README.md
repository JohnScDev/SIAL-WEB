# Propuesta UI/UX - Gestion de Fincas

Fuente normativa principal: `Documento_Base_Consolidado_UIUX_Web_SIAL.md`.

Archivos:

- `index.html`: entrada de navegacion.
- `gestion-fincas.html`: vista principal de gestion de fincas.
- `registro-finca.html`: formulario dedicado de registro/edicion de finca.
- `gestion-grupos.html`: tabla maestra y formulario de grupos.
- `gestion-sectores.html`: tabla maestra y formulario de sectores.
- `gestion-referencias.html`: vista principal de gestion de referencias de producto.
- `registro-referencia.html`: formulario dedicado para crear, copiar o versionar referencias.
- `gestion-clases-referencia.html`: tabla maestra y formulario de clases de referencia.
- `sial-fincas.css`: tokens, layout, componentes y responsive.
- `sial-fincas.js`: navegacion, filtros, validacion local y estados de prototipo.

Criterios aplicados:

- Fincas: `Listado Maestro` como prioridad + formulario administrativo extenso en vista dedicada.
- Grupos, sectores y clases: `Configuracion` con listado maestro como prioridad y formulario corto embebido dentro de la card de gestion.
- Referencias: `Listado Maestro` como prioridad + formulario dedicado por versionado, copia y datos tecnicos.
- No se modela eliminacion fisica; se usa activar/inactivar.
- Auditoria visible en listados.
- Las tablas de gestion con registros incluyen accion de visualizar que abre drawer lateral derecho con detalle y auditoria, sin cubrir el menu principal.
- Estados incluidos: default, vacio por filtro, error inline, exito de validacion y sin permisos.
- Formularios amplios y tablas se ubican en layout vertical para evitar compresion lateral.
- Maestras cortas de 3 a 5 campos usan formulario embebido: boton `Nuevo`, panel interno de alta/edicion, validacion inline y tabla siempre visible como foco principal.
- Maestras grandes o con reglas fuertes usan vista separada de registro/edicion: la gestion conserva filtros, auditoria y acciones; el formulario concentra validaciones, trazabilidad y retorno a gestion.

Nota: estos HTML son prototipos funcionales locales. Para produccion deben portarse a React/Next, API real, permisos administrativos y contratos DTO.
