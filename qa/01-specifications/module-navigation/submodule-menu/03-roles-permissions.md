# Roles y permisos - Navegación y menú: Menú lateral, encabezado y footer

## Access Matrix

| Funcionalidad / Acción | standard_user | problem_user | performance_glitch_user | error_user | visual_user | Sin sesión |
|---|---|---|---|---|---|---|
| Abrir / cerrar menú | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ (no hay menú en el login) |
| All Items | ✅ | no explorado | no explorado | no explorado | no explorado | - |
| About -> saucelabs.com | ✅ | ❌ href `/error/404` | no explorado | ✅ (href) | no explorado | - |
| Logout | ✅ | ✅ | ✅ (~15 ms) | ✅ | ✅ | - |
| Reset App State | ⚠️ botones no se actualizan | ✅ badge 0 | no explorado | ⚠️ error JS en consola | no explorado | - |
| Footer y enlaces sociales | ✅ | no explorado | no explorado | no explorado | no explorado | - |

Posición del menú: idéntica en `standard_user` y `visual_user` (x=20, y=20). En `visual_user` el ícono del carrito está desplazado (ver INV).

## Test User Reference

| Rol | Env var (usuario) | Env var (contraseña) |
|------|----------------|-------------------|
| standard_user | `QA_USER_STANDARD_USER_USERNAME` | `QA_USER_PASSWORD` |
| problem_user | `QA_USER_PROBLEM_USER_USERNAME` | `QA_USER_PASSWORD` |
| performance_glitch_user | `QA_USER_PERFORMANCE_GLITCH_USER_USERNAME` | `QA_USER_PASSWORD` |
| error_user | `QA_USER_ERROR_USER_USERNAME` | `QA_USER_PASSWORD` |
| visual_user | `QA_USER_VISUAL_USER_USERNAME` | `QA_USER_PASSWORD` |

**Notes**: Contraseña `<PLACEHOLDER>` desde `process.env`.
