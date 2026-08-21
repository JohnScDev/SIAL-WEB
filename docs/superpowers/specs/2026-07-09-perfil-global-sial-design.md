# Perfil global SIAL

## Objetivo

Actualizar el acceso de perfil compartido para ofrecer identidad y contexto operativo desde el header, con una vista completa sin navegar fuera de la vista activa.

## Estructura aprobada

- El avatar del header abre un popover compacto con identidad, empresa, rol, alcance y módulos disponibles; las acciones son `Ver mi perfil`, `Preferencias` y `Cerrar sesión`.
- `Ver mi perfil` abre el overlay compartido con identidad, contexto activo, fincas asignadas, relaciones empresa + roles, datos de contacto y sesión.
- Las fincas se muestran como lista de chips; no hay carruseles ni rotación automática.
- El documento completo no se prioriza en el popover. En la integración productiva debe llegar enmascarado cuando aplique.
- La implementacion usa los tokens, radios, iconos, foco y tema oscuro existentes en SIAL.

## Datos de propuesta

El avatar puede declarar `data-profile-name`, `data-profile-role`, `data-profile-company`, `data-profile-scope`, `data-profile-modules`, `data-profile-document`, `data-profile-phone`, `data-profile-email` y `data-profile-farms`. Las listas se separan con `|`.

Para integración, el contrato preferido es `window.SIALProfile` con `user`, `activeContext`, `memberships` y `session`. `activeContext` contiene empresa, rol, alcance, fincas y módulos; `memberships` conserva las relaciones empresa + roles. Si los datos no llegan, la UI muestra estados explícitos como `Empresa no seleccionada` o `Sin contexto operativo`, sin suplantar una identidad de ejemplo.

## Accesibilidad

- El popover conserva navegacion por flechas y cierre con `Escape`.
- El overlay mantiene trampa de foco y retorno al control de origen.
- El carrusel anuncia su pagina mediante `aria-live`, acepta flechas izquierda/derecha y respeta `prefers-reduced-motion`.

## Alcance

No se cambian rutas, permisos, backend ni contenido de las vistas. El ajuste se concentra en el componente global y su muestra de catalogo.
