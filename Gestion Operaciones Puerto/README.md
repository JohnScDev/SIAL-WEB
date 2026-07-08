# Gestion Operaciones Puerto - propuesta UI/UX SIAL

Propuesta estatica alineada al documento base SIAL y a los patrones aplicados en Gestion de Fincas, Conductores y Transporte.

## Vistas incluidas

- `gestion-contenedores.html`: maestra de contenedores con formulario embebido, validacion de formato ISO, tipo de contenedor obligatorio, filtros y drawer derecho de visualizacion.
- `programacion-contenedores.html`: programacion semanal de uno o varios contenedores activos y disponibles, con selector paginado tipo SearchSelectInput, etapa operativa visible en tabla y programaciones vigentes, futuras y finalizadas.
- `gestion-tipos-contenedor.html`: maestra corta con formulario embebido para codigo, descripcion y capacidad numerica mayor a cero.
- `gestion-etapas-contenedor.html`: maestra corta con formulario embebido para etapa unica en mayusculas sostenidas y estado obligatorio; el codigo autogenerado se conserva en el listado.
- `gestion-puertos.html`: maestra corta con formulario embebido para nombre unico en mayusculas sostenidas y estado obligatorio; el codigo autoincremental se conserva en el listado.

## Patrones aplicados

- La gestion queda como prioridad visual: tabla, filtros, auditoria y acciones son el nucleo de cada vista.
- Los formularios cortos se manejan embebidos dentro de la card de gestion.
- La accion de visualizar registro abre un drawer lateral derecho para no cubrir el menu.
- Las acciones son editar, activar o desactivar; no se propone eliminacion fisica.
- Los estados incluyen default, validacion, empty por filtros, error de campo, activo/inactivo y trazabilidad de auditoria.
- Se documentan controles de permisos administrativos en microcopy y estructura de acciones.

## Reglas funcionales representadas

- Validaciones de campos obligatorios antes de guardar.
- Prevencion de duplicidad en campos unicos.
- Mayusculas sostenidas para codigos, nombres y etapas cuando aplica.
- Los codigos generados por sistema se visualizan en listados, no como campos de captura.
- La programacion de contenedores no captura UUID; el UUID queda como identificador tecnico en el drawer y en el payload futuro.
- El selector de contenedor filtra registros activos en `container`, disponibles en `container_process` y sin programacion vigente en la misma semana operativa.
- La etapa de programacion no se captura en el formulario; se asigna desde el catalogo activo `container_stage` y se visualiza en tabla/detalle.
- Capacidad de tipo de contenedor mayor a cero.
- Formato ISO de numero de contenedor: 4 letras + 7 digitos.
- Estado obligatorio para todas las maestras.
- Auditoria por usuario, fecha/hora y accion.

## Contrato backend futuro

- Tabla conceptual: `container_schedule`.
- Campos minimos: `uuid` aut PK, `operationWeek` date, `containerId` o `containerCode`, `containerStageId` FK hacia `container_stage` y estado derivado para UI.
- Endpoints sugeridos:
  - `GET /containers/available?operationWeek=&search=&page=&pageSize=`
  - `GET /container-schedules?operationWeek=&status=&container=&stage=&page=&pageSize=`
  - `POST /container-schedules`
  - `GET /container-schedules/{uuid}`
- Validacion requerida: `container` activo, `container_process` disponible y ausencia de programacion vigente para el mismo contenedor y semana.

## Propuestas posteriores para vistas analiticas

- Tablero de operaciones puerto: KPIs de contenedores activos, por etapa, en inspeccion, en puerto, cerrados y exportados.
- Matriz de trazabilidad de contenedores: linea de tiempo por contenedor, etapa, puerto y responsable operativo.
- Control de capacidad y consolidacion: comparativo entre tipo de contenedor, capacidad configurada y ocupacion operacional.
- Alertas operativas: contenedores con formato invalido, tipos inactivos, etapas bloqueadas y registros sin auditoria reciente.
