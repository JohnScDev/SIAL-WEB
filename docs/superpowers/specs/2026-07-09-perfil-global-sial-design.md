# Perfil global SIAL

## Objetivo

Actualizar el acceso de perfil compartido para ofrecer una consulta rapida desde el header y una vista flotante completa, sin navegar fuera de la vista activa.

## Estructura aprobada

- El avatar del header abre un popover compacto con identidad, documento, fincas asignadas y las acciones `Ver perfil` y `Cerrar sesion`.
- `Ver perfil` abre el overlay compartido con datos personales y un carrusel de fincas asignadas.
- El popover rota tres fincas automaticamente y permite avanzar o retroceder. El carrusel completo rota cada cinco segundos y admite anterior, siguiente, teclado y pausa por hover o foco.
- Cada pagina muestra hasta tres fincas para conservar una lectura agil.
- La implementacion usa los tokens, radios, iconos, foco y tema oscuro existentes en SIAL.

## Datos de propuesta

El avatar puede declarar `data-profile-name`, `data-profile-role`, `data-profile-document`, `data-profile-phone`, `data-profile-email` y `data-profile-farms`. Las fincas se separan con `|`. Si faltan datos, el componente usa valores estaticos seguros de propuesta.

## Accesibilidad

- El popover conserva navegacion por flechas y cierre con `Escape`.
- El overlay mantiene trampa de foco y retorno al control de origen.
- El carrusel anuncia su pagina mediante `aria-live`, acepta flechas izquierda/derecha y respeta `prefers-reduced-motion`.

## Alcance

No se cambian rutas, permisos, backend ni contenido de las vistas. El ajuste se concentra en el componente global y su muestra de catalogo.
