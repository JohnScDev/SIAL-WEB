# HU337 · Mapa de datos para POMA

## Momento del flujo

La POMA se genera bajo demanda después de confirmar la salida de finca. Es aplicable a camiones y a tractocamiones con contenedor; en camión no se muestra la sección de contenedor.

## Fuentes que consolida la vista

| Bloque visible | Fuente real | Datos principales |
| --- | --- | --- |
| Salida y transporte | `VehicleTransportOperations` y movimiento de vehículo | Radicación, finca, salida, vehículo, conductor, transportadora y firma. |
| Contenedor | `ContainerTransportOperations` y `ContainerMovements` | Código, tipo, estado, secuencia y ubicación. |
| Cargue | `ContainerLoading` | Cierre, posiciones, pallets activos, cajas, precinto final y evidencias finales. |
| Pallets y referencias | `Pallet`, movimientos y referencias de `ms-sial` | SSCC, posición, referencias, cajas y peso estimado. |
| Inspecciones | `Inspection` | Resultado externo/interno, observaciones y evidencias. |
| Evidencias | `Evidence` / uploads | Evidencia por pallet, precinto y puertas cerradas. |
| Emisión | Nueva capacidad de HU337 en `ms-track` | PDF bajo demanda, versión de plantilla, fecha, usuario y contador de generaciones. |

## Reglas visibles

- Solo una salida confirmada en `DESPACHADO_DESDE_FINCA` puede habilitar la generación.
- El cargue debe estar cerrado, con precinto final, puertas cerradas, pallets y evidencias obligatorias.
- Un resultado `NO_APTO`, evidencia faltante, novedad bloqueante, firma ausente o inconsistencia de carga bloquea la generación.
- La consulta está restringida por permisos, compañía y finca.
- El PDF no se almacena; se registra su generación y la versión de plantilla.

## Contratos existentes reutilizables

- `GET /transport-operations/container-movements?viewMode=extended`: trazabilidad, procesos, inspecciones y evidencias para consulta web.
- `GET /container-loadings/:loadingId`: detalle de cargue, posiciones, pallets, cajas, precinto y evidencias finales.
- `GET /container-loadings/context`: contexto de cargue elegible.
- `GET /transport-operations/vehicles/:id`: operación de vehículo y conductor asociado.

## Contrato pendiente de HU337

No existe aún un endpoint de vista previa/generación de POMA. El backend debe exponer una consulta compuesta y una generación idempotente que consoliden estas fuentes sin duplicar persistencia.
