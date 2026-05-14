# SIAL - Changelog

Vistas de comunicacion y administracion de cambios, integradas al catalogo de propuestas SIAL.

## Vistas

- `index.html`: changelog externo para usuarios de la empresa.
- `changelog-interno.html`: changelog interno para dev, TI y lideres tecnicos.
- `administracion-changelog.html`: gestion para crear, editar, publicar o remover entradas con auditoria.
- `sial-changelog.js` y `sial-changelog-interno.js`: datos y configuracion de la vista; el renderizado, filtros y copia de enlace viven en `shared/sial-core.js`.

## Objetivo

Publicar un historial claro de cambios visibles por version, modulo y tipo de cambio, separando la informacion interna de soporte tecnico.

## Reglas

- No publicar detalles internos de codigo, deuda tecnica o decisiones privadas.
- Cada entrada debe explicar beneficio, alcance y modulo afectado.
- Los tipos permitidos son `Nuevo`, `Mejora`, `Correccion` y `Documentacion`.
- El detalle tecnico debe mantenerse en documentacion interna separada.
- Remover una entrada despublica el registro y conserva la auditoria visual.
