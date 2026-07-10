# Perfil Global SIAL Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar un perfil global compacto y una vista flotante con carrusel accesible de fincas.

**Architecture:** Extender `SIALCore.initProfileMenu` para leer un contrato de datos desde el avatar y renderizar ambas capas. Mantener estilos e interacciones en los archivos compartidos para que todas las vistas hereden el comportamiento.

**Tech Stack:** HTML estatico, CSS con tokens SIAL y JavaScript nativo.

## Global Constraints

- No cambiar rutas ni permisos.
- No crear colores, radios o sombras fuera de los tokens SIAL.
- Mantener tema claro/oscuro, responsive y navegacion por teclado.

---

### Task 1: Perfil compartido

**Files:**
- Modify: `shared/sial-core.js`
- Modify: `shared/sial-core.css`

**Interfaces:**
- Consumes: atributos `data-profile-*` del avatar.
- Produces: popover global y overlay de perfil con carrusel de fincas.

- [x] Leer y normalizar los datos del perfil desde el avatar.
- [x] Renderizar el resumen compacto con las acciones aprobadas.
- [x] Reemplazar el contenido de `Ver perfil` por identidad, contacto y fincas asignadas.
- [x] Implementar rotacion automatica, pausa, controles manuales y teclado.
- [x] Aplicar estilos responsive y de tema oscuro usando tokens SIAL.

### Task 2: Catalogo y documentacion

**Files:**
- Modify: `shared/componentes.html`
- Modify: `shared/README.md`

**Interfaces:**
- Consumes: `SIALCore.initProfileMenu`.
- Produces: muestra navegable y contrato documentado.

- [x] Agregar datos representativos al avatar del catalogo.
- [x] Documentar los atributos disponibles y el comportamiento del carrusel.

### Task 3: Verificacion

**Files:**
- Verify: `shared/sial-core.js`
- Verify: `shared/sial-core.css`
- Verify: `shared/componentes.html`

**Interfaces:**
- Consumes: componente implementado.
- Produces: evidencia de sintaxis e interaccion.

- [x] Ejecutar `node --check shared/sial-core.js`.
- [x] Ejecutar `git diff --check` sobre los archivos modificados.
- [x] Validar en navegador menu, overlay, carrusel, teclado, responsive y tema oscuro.
