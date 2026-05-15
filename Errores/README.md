# Estados de error SIAL

Vistas estaticas para estados de sistema y navegacion del catalogo SIAL.

## Vistas

- `401.html`: sesion no autenticada o vencida.
- `403.html`: usuario sin permisos para la operacion.
- `404.html`: vista o recurso no encontrado dentro del catalogo.
- `500.html`: error interno o falla de servicio.

La raiz del proyecto tambien incluye `404.html` para que GitHub Pages muestre el mismo patron visual cuando una ruta no existe.

## Regla de uso

Las paginas dedicadas cubren errores de navegacion o acceso completo. Para errores dentro de una tabla, consulta o modulo, se debe usar el componente compartido `error-state` definido en `shared/sial-core.css`.
