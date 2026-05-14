# Planeacion - Aviso de Corte

Propuesta UI/UX SIAL para tablas maestras de aviso de corte.

## Vistas incluidas

- `gestion-semanas.html`: listado maestro de semanas productivas con detalle lateral, auditoria y acceso a generacion.
- `generacion-semanas.html`: formulario extenso dedicado para generar automaticamente 52 semanas por ano desde la semana 1.
- `gestion-cintas.html`: maestra corta de cintas oficiales con formulario embebido en la card de gestion.
- `validacion-calendario.html`: vista analitica de control operativo sobre reglas de Semanas y Cintas.
- `monitoreo-calendarios.html`: vista anual de monitoreo visual para calendarios generados.

## Reglas representadas

- Numero de semana + ano no se repite.
- Cada ano contiene 52 semanas.
- Semana inicia lunes y termina domingo.
- Mes se calcula desde la fecha fin de semana.
- No se permiten traslapes de fechas.
- Cintas activas sin orden repetido ni saltos.
- Secuencia oficial: BL, AZ, RO, CA, NE, NA, VE, AM.
- Todo cambio queda representado con auditoria y log.
