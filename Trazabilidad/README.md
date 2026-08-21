# Seguridad - Propuesta UI/UX

La carpeta fisica se conserva como `Trazabilidad/` para evitar cambios de ruta en GitHub Pages, pero el modulo se muestra visualmente como Seguridad.

Archivos:

- `index.html`: entrada del modulo Seguridad.
- `generar-documento-poma.html`: vista principal de HU337; consolida una salida de finca confirmada, transporte, cargue, sellos, pallets/SSCC, inspecciones, evidencias y auditoría antes de generar el POMA. La acción abre un flujo visual de generación y luego un visor PDF superpuesto.
- `documento-poma.html`: referencia standalone del espacio reservado para insertar el POMA digitalizado; la interacción activa se resuelve en el visor superpuesto de la vista principal.
- `HU337-mapa-datos-poma.md`: trazabilidad de fuentes, reglas y contratos existentes/pendientes para la implementación de POMA.
- `auditoria-operativa.html`: mesa de revision operativa con bandeja por operacion, timeline, evidencias, aprobacion humana para inspecciones, puntos de control, comentarios, firmas, metadatos y tabla exportable.
- `gestion-tipos-inspeccion.html`: maestra de tipos de inspeccion.
- `gestion-tipos-evento-trazabilidad.html`: maestra de eventos de trazabilidad.
- `sial-trazabilidad.js`: navegacion, maestras, filtros y drawer de auditoria operativa.
- `sial-trazabilidad.css`: extension local minima sobre la libreria compartida.

Criterios aplicados:

- La auditoria operativa concentra revision, consulta, filtros, exportacion y detalle auditable por operacion/evento/evidencia. Las evidencias de eventos de inspeccion incluyen aprobacion humana visual del prototipo, pendiente de contrato backend.
- La vista cruza eventos de programacion y reprogramacion de transporte web con eventos moviles de recepcion, inspeccion externa/interna, responsabilidad, cierre y entrega.
- Las evidencias se representan como tarjetas referenciales de propuesta; la conexion real a archivos queda para backend.
- Se conserva la trazabilidad sin eliminacion fisica y con compatibilidad de rutas existentes.
