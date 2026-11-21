# Roles y permisos - Autenticación: Login y sesión

La aplicación no tiene roles de autorización: los 6 usuarios publicados comparten los mismos permisos funcionales. Lo que cambia es el **comportamiento intencional** asociado a cada usuario.

## Access Matrix

| Funcionalidad / Acción | standard_user | locked_out_user | problem_user | performance_glitch_user | error_user | visual_user |
|---|---|---|---|---|---|---|
| Iniciar sesión | ✅ | ❌ (RN-AUTH-005) | ✅ | ✅ con demora | ✅ | ✅ |
| Acceder a `/inventory.html` tras login | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Logout desde el menú | ✅ | - | ✅ | ✅ | ✅ | ✅ |
| Acceder a rutas internas sin sesión | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

## Comportamiento observado en el login (sesión 2026-11-21)

| Usuario | Tiempo login -> inventario (medido) | Observación |
|---|---|---|
| standard_user | ~130 ms | Referencia |
| locked_out_user | - | Error "Epic sadface: Sorry, this user has been locked out." |
| problem_user | inmediato | Login normal; los defectos aparecen en INV, CART y CHK |
| performance_glitch_user | ~5.2 s | Demora intencional; el resto de la navegación medida fue normal |
| error_user | inmediato | Login normal; los defectos aparecen en INV, CART y CHK |
| visual_user | ~110 ms | Login normal; defectos visuales en INV |

## Test User Reference

| Rol | Env var (usuario) | Env var (contraseña) |
|------|----------------|-------------------|
| standard_user | `QA_USER_STANDARD_USER_USERNAME` (alias `QA_USER_EMAIL`) | `QA_USER_PASSWORD` |
| locked_out_user | `QA_USER_LOCKED_OUT_USER_USERNAME` | `QA_USER_PASSWORD` |
| problem_user | `QA_USER_PROBLEM_USER_USERNAME` | `QA_USER_PASSWORD` |
| performance_glitch_user | `QA_USER_PERFORMANCE_GLITCH_USER_USERNAME` | `QA_USER_PASSWORD` |
| error_user | `QA_USER_ERROR_USER_USERNAME` | `QA_USER_PASSWORD` |
| visual_user | `QA_USER_VISUAL_USER_USERNAME` | `QA_USER_PASSWORD` |

**Notes**: La contraseña es la misma para todos (`<PLACEHOLDER>`). El sitio la publica en la página de login, pero en código se lee siempre de `process.env.QA_USER_PASSWORD` (regla 3). La URL base se lee de `QA_BASE_URL`.
