# Gestion de Usuarios - propuesta UI/UX SIAL

Vistas incluidas:

- `gestion-usuarios.html`: listado maestro con filtros, auditoria, acciones y drawer derecho.
- `registro-usuario.html`: formulario administrativo extenso con asignacion acumulativa empresa + roles.
- `editar-usuario.html`: edicion separada de datos basicos y roles por empresa.
- `gestion-permisos-rol.html`: administracion agil de permisos por rol con selector de rol, filtros basicos, matriz editable por modulo y guardado de cambios.

La seccion empresa + roles del registro toma como guia funcional `propuesta-registro-usuarios.html`: seleccionar empresa, cargar roles disponibles, agregar la relacion al resumen inferior, editar o quitar la relacion y validar al menos una asignacion antes de finalizar.

La administracion de permisos opera sobre roles existentes. En backend debe persistir cambios en `rol_permiso`, registrar auditoria transaccional y aplicar el resultado a usuarios asociados al rol por empresa.
