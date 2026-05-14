# SIAL UI Core Library

Libreria compartida para las propuestas HTML del entorno SIAL.

## Archivos

- `sial-core.css`: tokens, dark mode, layout, shell, cards, botones, formularios, tablas, drawers, estados y patrones comunes.
- `sial-core.js`: utilidades reutilizables para tema, filtros, drawers, formularios embebidos, estados de campo y changelog.
- `componentes.html`: inventario visual para QA de tokens, componentes, indicadores, estados y modo oscuro.

## Regla de uso

Cada modulo debe conservar su archivo local, por ejemplo `sial-fincas.css`, pero ese archivo debe importar la libreria:

```css
@import url("../shared/sial-core.css");
```

Las reglas locales solo deben agregarse si el modulo necesita una variante especifica no cubierta por la libreria.

## Componentes centralizados

La base actual concentra:

- Shell, sidebar expandido/colapsado, navegacion por area/modulo/vista, vistas de modulo contraibles, header, busqueda, avatar y boton de tema.
- Botones primary, secondary, ghost, destructive e icon-only.
- Cards, headers de card, stats, grids y layouts responsivos.
- Alertas `notice-info`, `notice-warning`, `notice-error`, `notice-success` con fondo, texto y borde semantico.
- Inputs, selects, textarea, field-note, validacion error/success y read-only.
- Componentes de autenticacion: stepper OTP, campo de contrasena con accion embebida y acceso a novedades.
- Tablas, toolbar, paginacion 10/30/50, empty state, badges, chips y estados.
- Drawers, backdrop, detalle, auditoria y contenedores relacionales.
- Patrones de transfer, roles, licencias, metricas, indicadores ejecutivos, KPIs, medidores de proyeccion, capacidad, riesgo, visualizaciones analiticas, timeline y calendario.
- Patrones de changelog externo, changelog interno y administracion de publicaciones.
- Topbar publico sin menu para vistas externas que conservan marca y modo claro/oscuro.
- Renderizado reutilizable de changelog mediante `SIALCore.initReleaseChangelog`.
- Renderizado reutilizable de menu mediante `SIALCore.initNavigation({ area, module, view })`.

No se deben duplicar definiciones de estos componentes en los CSS locales.

## Dark mode

El modo oscuro se controla desde `data-theme` en `document.documentElement` y se persiste en `localStorage` con la llave `sial-theme`.

Cada vista debe incluir el script temprano en el `<head>` para evitar parpadeo visual y el boton `[data-theme-toggle]` en el header, antes de notificaciones.

## Creacion de nuevos modulos

1. Crear carpeta del modulo.
2. Crear HTML con shell estándar.
3. Crear CSS local con import a `../shared/sial-core.css`.
4. Crear JS local solo con reglas de negocio del modulo.
5. Incluir `../shared/sial-core.js` antes del JS local.
