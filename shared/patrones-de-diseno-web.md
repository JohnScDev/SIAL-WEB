# Mapa de patrones de diseño — SIAL Web

Fecha de auditoría: 2026-08-21.  
Alcance: todas las vistas HTML navegables de la propuesta, excluyendo `node_modules` y documentación interna.

## Regla de arquitectura visual

`shared/` es la fuente única de tokens, shell, controles, tablas, feedback, accesibilidad y composiciones aprobadas. Los CSS de módulo resuelven contenido y reglas del dominio; no recrean botones, campos, navegación, estados o paletas existentes.

| Estado | Qué significa | Cómo actuar |
| --- | --- | --- |
| **Canon** | Componente o API compartida aprobada | Consumir desde `shared/`. |
| **Composición aprobada** | Estructura repetible de decisión, consulta o gestión | Usar la clase compartida y adaptar contenido. |
| **Candidato visual** | Solución nueva para una necesidad que el canon no cubre | Puede nacer local; documentar y revisar antes de reutilizarla. |
| **Dominio** | Estructura inseparable de una HU o módulo | Mantener en el módulo y no copiar sin revisión. |
| **Base / migración** | Vista anterior válida con menos refinamiento | Mantener estable; adoptar el canon al cambiarla con alcance aprobado. |

## Brecha entre generaciones

| Generación | Características | Referencias | Decisión |
| --- | --- | --- | --- |
| Base | Shell, toolbar, tabla, formulario y estado compartidos; densidad correcta pero contexto de decisión más simple. | Maestras de usuarios, empresas, fincas, transporte y Puerto. | No crear variantes locales por cada módulo. |
| Madura | Contexto por rol, tareas priorizadas, importación/validación, impacto, trazabilidad, preparación para documentos y detalle verificable. | Inicio, Avisos de corte, trazabilidad de pallets y POMA. | Extraer solo anatomías repetibles; conservar reglas de negocio en su dominio. |

## Mapa completo de vistas

| Familia | Vistas | Patrón dominante | Adopción |
| --- | --- | --- | --- |
| Raíz y catálogo | `index.html`; `404.html`; `shared/componentes.html` | Descubrimiento, fallback y librería visual | Canon. `componentes.html` es evidencia visual de los componentes aprobados. |
| Autenticación | `Login/index.html`; `seleccionar-empresa.html`; `login-cover-flow.html`; `recuperar-contrasena.html`; `verificar-codigo.html`; `restablecer-contrasena.html`; `recuperar-cover-flow.html`; `verificar-cover-flow.html`; `restablecer-cover-flow.html` | Login, empresa activa, OTP, recuperación y fortaleza de clave | Canon de autenticación y formularios focalizados. |
| Inicio por rol | `Inicio/index.html`; `inicio-personalizado.html`; `centro-excepciones.html`; `jornada-operativa.html`; `torre-control.html`; `resumen-ejecutivo.html` | Inicio adaptable, prioridad, agenda, flujo y lectura ejecutiva según permisos | Referencia madura de contexto por responsabilidad; las métricas siguen siendo de dominio. |
| Errores | `Errores/401.html`; `403.html`; `404.html`; `500.html`; `503.html`; `mantenimiento.html` | Página completa de recuperación o mantenimiento | Canon de errores de página; para fallas internas de una gestión usar `error-state`. |
| Usuarios | `Gestion de Usuarios/index.html`; `gestion-usuarios.html`; `registro-usuario.html`; `editar-usuario.html`; `gestion-permisos-rol.html` | Maestra, formulario extenso, relación empresa/rol, matriz de permisos y detalle | Base sólida de gestión y formularios. |
| Empresas | `Gestion de Empresas/index.html`; `gestion-empresas.html`; `registro-empresa.html`; `gestion-clientes.html`; `gestion-contactos.html`; `registro-contacto.html`; `gestion-dependencias.html`; `roles-empresa.html`; `parametrizacion-roles.html` | Maestros, relaciones y transferencias | Canon de catálogos relacionales; reglas comerciales son de dominio. |
| Fincas y referencias | `Gestion de Fincas/index.html`; `gestion-fincas.html`; `registro-finca.html`; `gestion-grupos.html`; `gestion-sectores.html`; `gestion-referencias.html`; `registro-referencia.html`; `gestion-clases-referencia.html`; `gestion-productos.html`; `gestion-productos-finca.html`; `gestion-tipos-fruta.html` | Maestros, registro dedicado, versiones y relaciones | Base/migración: consumen shell, tabla, formulario y estados compartidos. |
| Planeación | `Gestion de Planeacion/index.html`; `gestion-avisos-corte.html`; `crear-aviso-corte.html`; `consultar-aviso-corte.html`; `gestion-semanas.html`; `generacion-semanas.html`; `gestion-cintas.html`; `validacion-calendario.html`; `monitoreo-calendarios.html` | Bandeja, matriz tipo Excel, importación, validación, publicación, impacto y calendario | Referencia madura. Matriz, importación y cálculo son dominio; toolbar, feedback, tabla y datos clave son canon. |
| Transporte | `Gestion de Transporte/index.html`; `gestion-conductores.html`; `registro-conductor.html`; `gestion-categorias-licencia.html`; `relacion-conductor-licencia.html`; `gestion-vehiculos.html`; `registro-vehiculo.html`; `gestion-tipos-vehiculo.html`; `gestion-tipos-empresa.html`; `relacion-empresa-tipo.html`; `dashboard-transporte.html`; `matriz-documental-vehiculos.html`; `disponibilidad-operativa.html`; `gestion-operaciones.html`; `inicio-operacion.html` | Catálogos, control documental, disponibilidad, dashboard y programación | Canon para maestras/analítica; restricciones documentales y programación son de dominio. |
| Puerto | `Gestion Operaciones Puerto/index.html`; `gestion-contenedores.html`; `gestion-tipos-contenedor.html`; `gestion-etapas-contenedor.html`; `gestion-puertos.html`; `programacion-contenedores.html`; `trazabilidad-pallets.html` | Configuración, programación y consulta trazable de pallets | Trazabilidad de pallets es referencia madura para consulta + detalle; estiba y transiciones físicas no son genéricas. |
| Materiales y suministros | `Materiales y Suministros/index.html`; `gestion-materiales.html`; `gestion-proveedores.html`; `resumen-proveedores.html`; `reglas-documentales.html`; `inventario-pallets.html`; `gestion-pedidos-materiales.html`; `ajustar-pedido-sugerido.html`; `pedidos-adicionales.html`; `ordenes-transporte-insumos.html`; `seguimiento-entregas.html`; `inventario-materiales-finca.html` | Gestión de maestros, pedidos, inventario, despacho y seguimiento | Reutiliza gestión densa; cálculos, pedido y ciclo de entrega son de dominio. |
| Trazabilidad | `Trazabilidad/index.html`; `gestion-tipos-evento-trazabilidad.html`; `gestion-tipos-inspeccion.html`; `auditoria-operativa.html`; `generar-documento-poma.html`; `documento-poma.html` | Tipos de evento, auditoría, evidencia y generación documental | Referencia madura. POMA usa composiciones aprobadas de preparación y datos clave. |
| Indicadores | `Indicadores/index.html` | KPI, proyección, riesgo, capacidad y gráficas | Canon de analítica desde `shared`; definiciones y fuentes son de dominio. |
| Changelog | `Changelog/index.html`; `changelog-interno.html`; `administracion-changelog.html` | Comunicación externa/interna y administración de publicaciones | Canon compartido de releases y auditoría. |

## Superficie visual aprobada

| Patrón | Clase/API | Uso | Referencias |
| --- | --- | --- | --- |
| Shell y navegación | `SIALCore.initNavigation`, sidebar, header, tema y perfil | Toda vista interna | Transversal. |
| Gestión densa | `toolbar`, `table-wrap`, tabla, paginación, `empty-state`, `error-state` | Catálogos y bandejas comparables | Usuarios, empresas, fincas, transporte, materiales y avisos. |
| Formularios | `field`, `input`, `select`, `textarea`, validación inline y acciones | Captura y edición con propósito claro | Registro, transporte, planeación y configuración. |
| Estados y decisiones | `notice-*`, `status`, modal, drawer, `initStateActionConfirm` | Feedback persistente, transición o detalle contextual | Transversal. |
| Trazabilidad | `timeline`, auditoría y detalle lateral | Histórico de solo lectura | Puerto, auditoría y POMA. |
| Preparación | `.sial-readiness-grid` | Condiciones verificables antes de una acción/documento | POMA; reutilizable en publicación o validación. |
| Datos clave | `.sial-key-value-grid` | Pares etiqueta/valor consolidados de solo lectura | POMA, perfiles y detalles de gestión. |
| Analítica | métricas, barras, riesgo, capacidad, gráficos y calendario | Interpretar/actuar con datos de fuente conocida | Indicadores, planeación y transporte. |

## Patrones de dominio

| Patrón | Propietario | Por qué no se generaliza |
| --- | --- | --- |
| Matriz de asignaciones e importación | Planeación / Aviso de corte | Estructura tabular, validación y publicación de la HU. |
| Proyección de impacto | Planeación | Fórmulas, alertas y significado operativo propios. |
| Documento POMA y su PDF | Trazabilidad | Fuente documental, campos legales y reglas de generación. |
| Programación, disponibilidad y matriz documental | Transporte | Restricciones de vehículo, conductor y documentación. |
| Estiba, contenedores y movimiento de pallets | Puerto | Modelo físico y estados de operación. |
| Pedido, inventario y entrega | Materiales | Ciclo de abastecimiento y reglas de cantidad/entrega. |
| KPIs y gráficos | Indicadores | Definición, fuente y cálculo de cada indicador. |

## Evolución controlada

1. Buscar primero en `shared/sial-core.css`, `shared/sial-core.js`, `shared/componentes.html` y esta matriz.
2. Si no cubren la necesidad, crear un **candidato visual** está permitido. Registrar vista origen, propósito, anatomía, estados, accesibilidad, responsive y por qué no se reutilizó el canon.
3. Antes de reutilizarlo fuera de su módulo, Diseño/Producto y revisión técnica validan marca/tokens, utilidad transversal, claro/oscuro, teclado, zoom, movimiento y estados reales.
4. Un candidato aprobado se incorpora a `shared`, se representa en `componentes.html`, se actualizan `DESIGN.md` y esta matriz, y pasa a ser una base visual preferida. Tres usos equivalentes obligan a solicitar la revisión; no son requisito para una aprobación temprana.
5. Un candidato no aprobado se ajusta, permanece local o se retira. Nunca se convierte en precedente por copia.
6. Las vistas base no se rediseñan en masa: adoptan el canon cuando una HU aprobada las modifique.
