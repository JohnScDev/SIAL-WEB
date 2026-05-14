# Gestion Operaciones Puerto - propuesta UI/UX SIAL

Propuesta estatica alineada al documento base SIAL y a los patrones aplicados en Gestion de Fincas, Conductores y Transporte.

## Vistas incluidas

- `gestion-contenedores.html`: maestra de contenedores con formulario embebido, validacion de formato ISO, tipo de contenedor obligatorio, filtros y drawer derecho de visualizacion.
- `gestion-tipos-contenedor.html`: maestra corta con formulario embebido para codigo, descripcion y capacidad numerica mayor a cero.
- `gestion-etapas-contenedor.html`: maestra corta con codigo autogenerado, etapa unica en mayusculas sostenidas y estado obligatorio.
- `gestion-puertos.html`: maestra corta con codigo autoincremental, nombre unico en mayusculas sostenidas y estado obligatorio.

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
- Capacidad de tipo de contenedor mayor a cero.
- Formato ISO de numero de contenedor: 4 letras + 7 digitos.
- Estado obligatorio para todas las maestras.
- Auditoria por usuario, fecha/hora y accion.

## Propuestas posteriores para vistas analiticas

- Tablero de operaciones puerto: KPIs de contenedores activos, por etapa, en inspeccion, en puerto, cerrados y exportados.
- Matriz de trazabilidad de contenedores: linea de tiempo por contenedor, etapa, puerto y responsable operativo.
- Control de capacidad y consolidacion: comparativo entre tipo de contenedor, capacidad configurada y ocupacion operacional.
- Alertas operativas: contenedores con formato invalido, tipos inactivos, etapas bloqueadas y registros sin auditoria reciente.
