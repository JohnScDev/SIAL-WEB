# Planeacion - Aviso de Corte

Propuesta UI/UX SIAL para registro de avisos de corte y tablas maestras de calendario.

## Vistas incluidas

- `gestion-avisos-corte.html`: vista independiente HU290 para registrar y consultar avisos de corte por finca, semana, fecha, referencia, cliente y estado.
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
- Un aviso de corte exige semana, dia de corte, finca, referencia, pallets, version AC, linea de contenedor, cajas por pallet, tipo de fruta/clase, grupo, zona y cliente.
- Cantidad de pallets y racimos estimados deben ser mayores a cero.
- La consulta de avisos debe filtrar por finca, fecha, semana productiva, producto y estado.

## Dependencias backend pendientes

- Contrato de `GET/POST` para avisos de corte.
- Persistencia backend de clientes/exportadores; lineas maritimas, versiones AC y configuracion de cajas por pallet siguen pendientes como maestros/contratos.
- Confirmacion de nombres finales para `Tipo_Fruta`, `Clase`, `Zonas` y `Cantidad estimada de racimos`.
