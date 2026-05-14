# Propuesta UI/UX - HU Conductores

Fuente normativa principal: `Documento_Base_Consolidado_UIUX_Web_SIAL.md`.

Archivos:

- `index.html`: entrada de navegacion.
- `gestion-conductores.html`: listado maestro de conductores con toolbar, tabla, estados y drawer de detalle.
- `registro-conductor.html`: formulario administrativo extenso para alta/edicion de conductor.
- `gestion-categorias-licencia.html`: gestion de categorias con listado prioritario y formulario corto embebido.
- `relacion-conductor-licencia.html`: gestion relacional conductor + categoria de licencia con formulario embebido.
- `gestion-vehiculos.html`: vista principal de gestion de vehiculos, documentos y disponibilidad.
- `registro-vehiculo.html`: formulario administrativo extenso de vehiculo.
- `gestion-tipos-vehiculo.html`: gestion de tipos de vehiculo con formulario corto embebido.
- `gestion-tipos-empresa.html`: gestion de tipos de empresa con formulario corto embebido.
- `relacion-empresa-tipo.html`: gestion relacional empresa + tipo de empresa.
- `dashboard-transporte.html`: vista analitica ejecutiva de flota, capacidad y alertas.
- `matriz-documental-vehiculos.html`: vista operativa de control SOAT y tecnomecanica.
- `disponibilidad-operativa.html`: vista de monitoreo para elegibilidad y asignacion operativa.
- `sial-conductores.css`: tokens, layout, componentes y responsive.
- `sial-conductores.js`: interacciones locales, filtros, drawer y validaciones de prototipo.

Criterios aplicados:

- Conductores: `Listado Maestro` como prioridad + formulario administrativo extenso en vista dedicada. El alta se accede desde la card de tabla con `Registrar conductor`.
- Categorias de licencia: maestra corta con listado maestro como prioridad y formulario embebido dentro de la card de gestion.
- Conductor + licencia: `Gestion Relacional` compacta con listado como prioridad y formulario embebido.
- Vehiculos: `Listado Maestro` como prioridad + formulario administrativo extenso en vista dedicada. Incluye SOAT, tecnomecanica, empresas activas, flota propia y disponibilidad.
- Tipos de vehiculo: maestra corta con formulario embebido, codigo autoincremental, nombre unico en mayusculas y activar/inactivar.
- Tipos de empresa: maestra corta con formulario embebido, nombre unico en mayusculas y control de tipos como transportadora, aseguradora y CDA.
- Empresa + tipo: relacion compacta con formulario embebido y llave compuesta codigo empresa + codigo tipo empresa.
- Dashboard transporte: vista analitica sin formulario, orientada a KPIs, distribucion de flota, alertas y capacidad por empresa.
- Matriz documental: vista de control operativo con filtros, semaforos de vigencia y acceso a edicion del vehiculo.
- Disponibilidad operativa: vista de monitoreo para identificar vehiculos elegibles, condicionados o bloqueados antes de asignarlos.
- No se modela eliminacion fisica; se usa activar/inactivar.
- Auditoria visible en detalle/listados y accion de visualizar mediante drawer lateral derecho.
- Estados incluidos: default, vacio por filtro, error inline, sin permisos, exito de validacion.
- Responsive: sidebar oculto en viewport estrecho, formularios apilados, botones full width.
- Regla de formularios adoptada: maestras cortas usan formulario embebido; maestras grandes o con reglas fuertes usan vista separada de registro/edicion.

Nota: estos HTML son prototipos funcionales locales. Para produccion deben portarse a React/Next, conectarse a API real, permisos administrativos y contratos DTO.
