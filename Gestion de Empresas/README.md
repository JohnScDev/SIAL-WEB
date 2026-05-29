# Gestion de Empresas - propuesta UI/UX SIAL

Vistas incluidas:

- `gestion-empresas.html`: listado maestro con filtros, auditoria, acciones y drawer derecho.
- `registro-empresa.html`: formulario administrativo para datos base de empresa y asignacion multiple de tipos. No incluye alcance operativo ni estado.
- `roles-empresa.html`: gestion relacional de roles disponibles por empresa, alineada al transfer usado en el frontend principal.
- `parametrizacion-roles.html`: creacion y administracion de roles mediante panel. Todo rol nuevo debe quedar asignado a una empresa activa y guardar permisos en la misma operacion.
- `../Gestion de Transporte/gestion-tipos-empresa.html`: gestion de tipos de empresa. Se conserva fisicamente en Transporte por continuidad del prototipo, pero el menu lo expone en Empresa.
- `../Gestion de Transporte/relacion-empresa-tipo.html`: relacion empresa + tipo de empresa. Se conserva fisicamente en Transporte por continuidad del prototipo, pero el menu lo expone en Empresa.

Este modulo alimenta la asignacion de empresa + roles dentro de Gestion de Usuarios. La creacion de roles debe persistir `roles`, `rol_permiso` y la relacion inicial `empresa_rol` como una transaccion auditable.
