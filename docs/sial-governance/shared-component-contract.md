# Contrato de Componentes Compartidos SIAL Web

## Fuente principal

La carpeta `shared` es la fuente tecnica principal para componentes reutilizables de la propuesta web SIAL.

Copias permitidas:

- `sial-catalogo/shared`
- carpeta `shared` publicada en Google Drive

Estas copias no deben recibir cambios independientes. Si un ajuste aplica al sistema, se modifica primero en `shared` y luego se publica manualmente a los destinos necesarios.

## Responsabilidades de `shared/sial-core.css`

- Tokens de color, superficies, bordes, sombras, tipografia y espaciado base.
- Modo claro y oscuro mediante `:root` y `html[data-theme="dark"]`.
- Shell web: sidebar, header, marca, menu expandido/colapsado y estados activos.
- Componentes base: botones, icon buttons, cards, notices, tags, badges, chips.
- Formularios: inputs, selects, textarea, labels, ayuda, error, lectura y acciones.
- Tablas: toolbar, estados, paginacion 10/30/50, empty state y acciones por fila.
- Drawers, overlays, detalle lateral, confirmaciones y estados de auditoria visual.
- Componentes analiticos: indicadores, KPIs, gauges, riesgo, ranking, alertas y calendario.
- Changelog externo, interno y administracion.
- SIAL View Motion: barra superior, salida de vista y overlay `Cargando vista`.
- Marca compartida: `brand/isotipo-sial.svg`.

## Responsabilidades de `shared/sial-core.js`

- `initShell(config)`: entrada estable para inicializar menu, tema, sidebar y confirmaciones.
- `initNavigation(config)`: renderizado central del menu por familia, modulo y vista.
- `initThemeToggle()`: modo claro/oscuro con persistencia `sial-theme`.
- `initSidebarToggle()`: colapsado, overlay responsive y accesibilidad de menu.
- `initPageTransitions()`: transicion entre vistas con motion institucional.
- `initTableFilters(config)`: busqueda, filtros, conteo y paginacion.
- `initDrawer(config)`: detalle lateral y foco basico.
- `initStateActionConfirm(config)`: activar/inactivar sin eliminacion fisica.
- `initEmbeddedForm(config)`: formularios embebidos en vistas de gestion.
- `initReleaseChangelog(config)`: renderizado reutilizable de changelog.

## Responsabilidades de CSS local por modulo

Cada modulo puede conservar su CSS local, pero debe iniciar con:

```css
@import url("../shared/sial-core.css");
```

El CSS local solo debe contener:

- Ajustes de una vista especifica que no son reutilizables.
- Diagramas, mapas o visualizaciones particulares del modulo.
- Excepciones documentadas frente al sistema base.

No debe duplicar:

- Botones.
- Cards.
- Alerts.
- Tablas.
- Sidebar/header.
- Drawer.
- Paginacion.
- Dark mode.
- Marca SIAL.
- Transiciones entre vistas.

## Regla para login

Login conserva una composicion especial por ser autenticacion, pero debe consumir:

- Tokens desde `shared/sial-core.css`.
- Isotipo desde `../shared/brand/isotipo-sial.svg`.
- Estados de foco, error y botones compatibles con el sistema.

La seccion visual izquierda puede tener libertad controlada, pero no debe redefinir la identidad SIAL ni romper los pasos de recuperacion.

## Checklist antes de publicar

- `node --check shared/sial-core.js`.
- `node --check` de los JS de modulos modificados.
- `node .agents/skills/sial-web-ui/scripts/scan-sial-ui.mjs <modulo>`.
- Confirmar `shared/brand/isotipo-sial.svg`.
- Confirmar `SIALCore.initShell`.
- Confirmar `SIALCore.initPageTransitions`.
- Confirmar `view-motion-overlay`.
- Confirmar que login y pasos asociados mantienen `.brand-mark` con isotipo compartido.

## Criterio de cambio

Un componente se centraliza cuando:

- aparece en dos o mas modulos;
- pertenece a shell, formulario, tabla, drawer, feedback, indicador, changelog o marca;
- necesita dark mode;
- afecta accesibilidad, foco, responsive o estados.

Un componente permanece local cuando:

- es una visualizacion puntual de un modulo;
- no se repite;
- no tiene impacto global;
- su excepcion esta documentada.
