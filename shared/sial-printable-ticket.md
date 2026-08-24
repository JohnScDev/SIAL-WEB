# Ticket imprimible SIAL

Componentes reutilizables para mostrar un comprobante dentro de un drawer e imprimirlo en formato térmico de 80 mm.

## Componentes

- `SIALPrintableTicket.createPreview(options)`: crea y renderiza el documento; `play()` anima la salida del ticket desde el cabezal de impresión.
- `SIALPrintableTicket.createDrawerActions(options)`: crea las acciones de generar, volver e imprimir, incluyendo estado no disponible con motivo visible.

Ambos componentes están en `sial-printable-ticket.js`; sus estilos y reglas de impresión en `sial-printable-ticket.css`.

## Uso mínimo

```js
const ticket = SIALPrintableTicket.createPreview({
  id: "deliveryTicket",
  brand: "SIAL",
  printShell: drawer,
  printDuration: 2400
});

ticket.render({
  ticketId: "TKT-OP-001",
  eyebrow: "OPERACIÓN DE TRANSPORTE",
  title: "Ticket de programación",
  meta: "Programación OP-001 · Versión 1",
  state: "PROGRAMADO",
  primaryFields: [{ label: "Vehículo", value: "TRK-421" }],
  secondaryFields: [{ label: "Destino", value: "Puerto ZE", wide: true }],
  verificationCode: "OP-001-TRK-421",
  footerNote: "Documento operativo."
});
```

El contenedor del drawer debe llevar `data-sial-ticket-shell` y el contenido que se oculta durante impresión `data-sial-ticket-detail`. El componente maneja `window.print()` y aplica el estado de impresión temporal sobre `body`.

Por defecto, la animación dura 2400 ms; `printDuration` permite ajustarla en cada uso. Durante la salida, el ticket se mueve desde detrás de la ranura a velocidad continua, mientras los pulsos del rodillo acompañan la alimentación. El botón de impresión permanece deshabilitado mientras termina. Si el sistema operativo solicita reducir movimiento, el ticket aparece sin animación y la impresión queda disponible inmediatamente.
