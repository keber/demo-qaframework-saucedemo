# Roles y permisos - Catálogo de productos: Dynamic Catalog

## Access Matrix

| Funcionalidad / Acción | standard_user | problem_user | performance_glitch_user | error_user | visual_user | Sin sesión |
|---|---|---|---|---|---|---|
| Desplegar submenú | ✅ | no explorado | no explorado | no explorado | no explorado | - |
| Lazy Load | ✅ | no explorado | no explorado | no explorado | no explorado | ❌ (RN-INV-015) |
| Spinner | ✅ | no explorado | no explorado | no explorado | no explorado | ❌ |
| Slider | ✅ | no explorado | no explorado | no explorado | no explorado | ❌ (observado) |

La exploración del 2026-11-21 cubrió el Dynamic Catalog solo con `standard_user`. Los TC con otros usuarios quedan con origen `PENDING-BROWSER`.

## Test User Reference

| Rol | Env var (usuario) | Env var (contraseña) |
|------|----------------|-------------------|
| standard_user | `QA_USER_STANDARD_USER_USERNAME` | `QA_USER_PASSWORD` |

**Notes**: Contraseña `<PLACEHOLDER>` desde `process.env`.
