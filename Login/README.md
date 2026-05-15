# Login - Propuesta 1

Vista de autenticacion para SIAL con panel institucional rotativo a la izquierda y formulario operativo a la derecha.

## Archivos

- `index.html`: vista principal de login.
- `login-cover-flow.html`: segunda propuesta de login con panel izquierdo tipo cover flow.
- `recuperar-cover-flow.html`: paso 1 de recuperacion para la segunda propuesta.
- `verificar-cover-flow.html`: paso 2 OTP para la segunda propuesta.
- `restablecer-cover-flow.html`: paso 3 de nueva contrasena para la segunda propuesta.
- `recuperar-contrasena.html`: vista de recuperacion de contrasena desde el login.
- `verificar-codigo.html`: paso OTP con indicador de progreso, autoavance y reenvio controlado.
- `restablecer-contrasena.html`: paso final para crear nueva contrasena.
- `sial-login.css`: tokens, layout responsive y estados visuales.
- `sial-login.js`: carrusel accesible, pausa/reanudar, toggle de contrasena, OTP, loading de demostracion y variante auth de SIAL View Motion.
- `sial-login-cover.css` y `sial-login-cover.js`: estilos y comportamiento aislados para la propuesta 2, con variante cover de SIAL View Motion.

## Criterios aplicados

- Familia de vista: Autenticacion.
- Max-width: 1200px.
- Un CTA principal.
- Errores y notas junto al formulario.
- Flujo de recuperacion en tres pasos: usuario, codigo y contrasena.
- Carrusel con pausa y respeto por `prefers-reduced-motion`.
- SIAL View Motion identificado como bloque reversible en `sial-login.css`, `sial-login.js` y `sial-login-cover.js`.
- Variante cover flow sin modificar la propuesta institucional aprobada.
- Responsive desktop, tablet y viewport pequeno.

Las imagenes se referencian desde `../Imagenes SIAL`, incluyendo `Imagen 5.JPG` para la escena de puerto.
