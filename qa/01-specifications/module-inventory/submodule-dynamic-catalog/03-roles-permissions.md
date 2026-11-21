# Roles y permisos - Catálogo de productos: Dynamic Catalog

## Access Matrix

| Funcionalidad / Acción | standard_user | problem_user | performance_glitch_user | error_user | visual_user | Sin sesión |
|---|---|---|---|---|---|---|
| Desplegar y plegar submenú | ✅ | ✅ | ✅ | ✅ | ✅ | - |
| Lazy Load | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ (RN-INV-015) |
| Spinner | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ (RN-INV-015) |
| Slider | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ (RN-INV-015) |

`locked_out_user` no aplica (no puede iniciar sesión). Etapa 1: exploración con `standard_user`; etapa 2 (2026-11-21): mismas vistas con los otros 4 usuarios habilitados, sin diferencias de contenido ni de comportamiento (RN-INV-021). `performance_glitch_user` solo muestra la demora de login (~5.1 s) ya conocida.

## Test User Reference

| Rol | Env var (usuario) | Env var (contraseña) |
|------|----------------|-------------------|
| standard_user | `QA_USER_STANDARD_USER_USERNAME` | `QA_USER_PASSWORD` |
| problem_user | `QA_USER_PROBLEM_USER_USERNAME` | `QA_USER_PASSWORD` |
| error_user | `QA_USER_ERROR_USER_USERNAME` | `QA_USER_PASSWORD` |
| visual_user | `QA_USER_VISUAL_USER_USERNAME` | `QA_USER_PASSWORD` |
| performance_glitch_user | `QA_USER_PERFORMANCE_GLITCH_USER_USERNAME` | `QA_USER_PASSWORD` |

**Notes**: Contraseña `<PLACEHOLDER>` desde `process.env`.
