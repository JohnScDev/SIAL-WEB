# Baseline de Estabilizacion SIAL Web

Fecha: 2026-05-18  
Alcance: propuesta web SIAL, libreria compartida, login y modulos HTML.

## Objetivo

Congelar una referencia local antes de continuar centralizando componentes. Este baseline permite recuperar la propuesta si una publicacion o ajuste posterior degrada animaciones, isotipo, dark mode, navegacion o componentes compartidos.

## Respaldo creado

Ruta:

`C:\Users\johns\Documents\New project\_backups\2026-05-18-shared-stabilization`

Contenido respaldado:

- `shared`
- `sial-catalogo/shared`
- `sial-login-propuesta`
- `sial-catalogo`
- `sial-conductores-propuesta`
- `sial-fincas-propuesta`
- `sial-puerto-propuesta`
- `sial-aviso-corte-propuesta`
- `sial-usuarios-propuesta`
- `sial-empresas-propuesta`
- `sial-changelog-propuesta`

Total de archivos en respaldo: 101.

## Archivos criticos y hash SHA256

| Archivo | SHA256 |
| --- | --- |
| `shared/sial-core.css` | `FA19B1CBBFAD56A5741F54641416999B94E4D88A815AC1F721550766CD4D5E01` |
| `shared/sial-core.js` | `0D6C6ED72C3B9BD056F7AA958BBA519F408C0AF060CFC9C65DA3E36A4044DF79` |
| `shared/componentes.html` | `58C46987F55E3F0AC3B774E3B52197980CD1995EF198ACBB0DA9FB4684879D54` |
| `shared/brand/isotipo-sial.svg` | `265D35C933EF7556AF8D94A7D9A32B821297B6D23659A36FA02DC5AA9A425251` |
| `sial-login-propuesta/sial-login.css` | `31CA7BEC335E2693D426619E469F6F002099BDBE0FC065EF70DE6A8030A08FC4` |
| `sial-login-propuesta/sial-login.js` | `5C88EFA72A0B734C429B8383071C59DCB73499B6324FDA189C2CAACEEDA73128` |
| `sial-login-propuesta/sial-login-cover.js` | `8967B2BA51F9DAB448BF472A047F2EEE905F12521ED52804A2E58B2F523A686A` |

## Hallazgo corregido en login

Sintoma: las vistas de login y recuperacion mostraban una marca local con la letra `S`, no el isotipo SIAL compartido.

Causa raiz: `.brand-mark` estaba definido con fondo primario y texto local. No consumia `shared/brand/isotipo-sial.svg`.

Correccion aplicada: `.brand-mark` conserva dimensiones y jerarquia visual, pero ahora usa el isotipo compartido como fondo. No se modifico la estructura HTML del login ni de sus pasos.

## Validacion ejecutada

- `node --check sial-login-propuesta/sial-login.js`.
- `node --check sial-login-propuesta/sial-login-cover.js`.
- Escaneo `sial-login-propuesta`: 0 blocker, 0 high, 0 medium, 98 low.

Los hallazgos bajos corresponden a dimensiones especificas del login aprobado y deben tratarse como excepciones visuales o refinarse en una tarea separada.

## Riesgos restantes

- Validacion visual automatizada en Chrome/Edge headless no quedo disponible por fallo local de GPU del navegador.
- El workspace local no tiene commits; Git no permite revert selectivo confiable sobre esta propuesta.
- La publicacion en Drive sigue siendo manual porque se omitio crear un script de sincronizacion.
