# SIAL - Catalogo UI/UX

Interfaz raiz para publicar en Netlify las propuestas HTML del entorno web SIAL.

## Archivos raiz

- `index.html`: catalogo principal con filtros por modulo, familia de vista y estado.
- `sial-catalogo.css`: estilos autonomos alineados al lenguaje visual usado en las propuestas.
- `sial-catalogo.js`: dataset de vistas, render de cards y filtros.
- `shared/componentes.html`: referencia visual de componentes compartidos, tokens, estados y dark mode.
- `Errores/`: vistas dedicadas para estados 401, 403, 404 y 500.
- `404.html`: fallback visual raiz para GitHub Pages.
- `shared/sial-core.css` y `shared/sial-core.js`: incluyen `SIAL View Motion`, capa reversible para transiciones entre paginas y vistas.

## Modulos enlazados

- `Login`
- `Changelog`
- `shared/componentes.html`
- `Errores`
- `Gestion de Transporte`
- `Gestion de Usuarios`
- `Gestion de Empresas`
- `Gestion de Fincas`
- `Gestion de Planeacion`
- `Gestion Operaciones Puerto`

## Regla de mantenimiento

Cuando se agregue una nueva vista, se debe incluir una entrada en el arreglo `views` de `sial-catalogo.js` con:

- `module`
- `moduleLabel`
- `title`
- `family`
- `status`
- `href`
- `description`
- `tags`

El catalogo no reemplaza el documento base SIAL. Solo centraliza las propuestas navegables para revision.
