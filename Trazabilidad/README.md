# Seguridad - Propuesta UI/UX

La carpeta fisica se conserva como `Trazabilidad/` para evitar cambios de ruta en GitHub Pages, pero el modulo se muestra visualmente como Seguridad.

Archivos:

- `index.html`: entrada del modulo Seguridad.
- `auditoria-operativa.html`: mesa read-only de revision operativa con bandeja por operacion, timeline, evidencias, puntos de control, comentarios, firmas, metadatos y tabla exportable.
- `gestion-tipos-inspeccion.html`: maestra de tipos de inspeccion.
- `gestion-tipos-evento-trazabilidad.html`: maestra de eventos de trazabilidad.
- `sial-trazabilidad.js`: navegacion, maestras, filtros y drawer de auditoria operativa.
- `sial-trazabilidad.css`: extension local minima sobre la libreria compartida.

Criterios aplicados:

- La auditoria operativa no modifica registros ni aprueba hallazgos; concentra revision, consulta, filtros, exportacion y detalle auditable por operacion/evento/evidencia.
- La vista cruza eventos de programacion y reprogramacion de transporte web con eventos moviles de recepcion, inspeccion externa/interna, responsabilidad, cierre y entrega.
- Las evidencias se representan como tarjetas referenciales de propuesta; la conexion real a archivos queda para backend.
- Se conserva la trazabilidad sin eliminacion fisica y con compatibilidad de rutas existentes.
