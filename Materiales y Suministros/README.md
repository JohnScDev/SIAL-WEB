# Materiales y Suministros - Propuesta UI/UX SIAL

Modulo orquestador para pedidos de materiales, inventario en finca, pallets, ordenes de transporte de insumos, proveedores externos, entregas y POD.

## Historias cubiertas

- `HU659`: pedido sugerido por finca desde aviso de corte.
- `HU662`: consulta de stock por finca y material.
- `HU666`: pedidos adicionales asociados a semana, finca y pedido base.
- `HU667`: segmentacion documental en RPT, remision o reserva.
- `HU546`, `HU669`, `HU670`, `HU532`: ordenes de transporte y notificaciones.
- `HU668`: resumen digital para proveedores externos.
- `HU681`, `HU682`, `HU547`: entrega movil, POD, foto/firma y recepcion.
- `HU559`, `HU560`: pallets completos e incompletos.
- `HU607`: enlace contextual hacia Seguridad / Auditoria Operativa.

## Vistas

- `index.html`: tablero operativo del modulo.
- `gestion-pedidos-materiales.html`: pedidos sugeridos, adicionales y estandar.
- `inventario-materiales-finca.html`: stock por finca y material.
- `inventario-pallets.html`: pallets completos y mochos.
- `ordenes-transporte-insumos.html`: ordenes de transporte y notificaciones.
- `resumen-proveedores.html`: generacion y envio digital a proveedores externos.
- `seguimiento-entregas.html`: entrega, POD y evidencia consultable.
- `gestion-materiales.html`: maestra minima de materiales.
- `gestion-proveedores.html`: maestra minima de proveedores.
- `reglas-documentales.html`: reglas para clasificacion documental.

## Reglas de propuesta

- El modulo no reemplaza Seguridad, Transporte ni Pallets; los orquesta y enlaza cuando corresponde.
- Los archivos manuales externos no son el mecanismo principal de coordinacion; se simula envio digital con auditoria.
- Las maestras cortas usan formulario embebido.
- Los listados conservan busqueda, filtros, contador, exportacion, paginacion y drawer lateral.
- La conexion backend queda pendiente; los payloads conceptuales deben derivarse de las HU.
