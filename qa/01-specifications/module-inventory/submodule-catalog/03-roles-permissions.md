# Roles y permisos - Catálogo de productos: Listado y detalle

Sin roles de autorización: todos los usuarios habilitados acceden al catálogo. La matriz refleja el comportamiento observado el 2026-11-21 (✅ funciona según RN, ⚠️ funciona con defecto, ❌ no funciona).

## Access Matrix

| Funcionalidad / Acción | standard_user | problem_user | performance_glitch_user | error_user | visual_user |
|---|---|---|---|---|---|
| Ver listado | ✅ | ⚠️ imágenes `sl-404` | ✅ | ✅ | ⚠️ precios aleatorios, imagen Backpack `sl-404` |
| Ordenar por nombre / precio | ✅ | ❌ sin efecto | ✅ | ❌ alert "Sorting is broken!" | ⚠️ orden por precio real, no el mostrado |
| Agregar desde el listado | ✅ 6/6 | ⚠️ 3/6 | ✅ 6/6 | ⚠️ 3/6 | ✅ 6/6 |
| Quitar desde el listado | ✅ | ❌ | ✅ | ❌ | ✅ |
| Abrir detalle correcto | ✅ | ❌ abre id+1 | ✅ | ✅ | ✅ |
| Agregar / quitar en el detalle | ✅ / ✅ | ✅ / ❌ | ✅ / ✅ | ✅ / ❌ | ✅ / ✅ |
| Acceso sin sesión | ❌ (RN-AUTH-007) | ❌ | ❌ | ❌ | ❌ |

`locked_out_user` no llega al catálogo (RN-AUTH-005).

## Test User Reference

| Rol | Env var (usuario) | Env var (contraseña) |
|------|----------------|-------------------|
| standard_user | `QA_USER_STANDARD_USER_USERNAME` | `QA_USER_PASSWORD` |
| problem_user | `QA_USER_PROBLEM_USER_USERNAME` | `QA_USER_PASSWORD` |
| performance_glitch_user | `QA_USER_PERFORMANCE_GLITCH_USER_USERNAME` | `QA_USER_PASSWORD` |
| error_user | `QA_USER_ERROR_USER_USERNAME` | `QA_USER_PASSWORD` |
| visual_user | `QA_USER_VISUAL_USER_USERNAME` | `QA_USER_PASSWORD` |

**Notes**: Contraseña común `<PLACEHOLDER>`, leída siempre desde `process.env`. Con `error_user` hay que aceptar el diálogo `alert` al ordenar (`page.on('dialog')`), o el test queda bloqueado.
