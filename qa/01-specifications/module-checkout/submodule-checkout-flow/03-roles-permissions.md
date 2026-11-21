# Roles y permisos - Checkout: Flujo de compra

## Access Matrix

| Funcionalidad / Acción | standard_user | problem_user | performance_glitch_user | error_user | visual_user | Sin sesión |
|---|---|---|---|---|---|---|
| Paso 1 - escribir los 3 campos | ✅ | ❌ apellido se escribe en nombre | ✅ | ❌ apellido no admite texto | ✅ | ❌ (RN-CHK-017) |
| Paso 1 - validación de obligatorios | ✅ | ✅ (bloquea por apellido vacío) | ✅ | ❌ avanza sin apellido | ✅ | - |
| Paso 2 - resumen y totales | ✅ | no alcanzado | ✅ | ✅ | ✅ | ❌ |
| Paso 2 - Finish | ✅ | no alcanzado | ✅ | ❌ sin efecto | ✅ | - |
| Paso 3 - confirmación y PDF | ✅ (PDF solo probado aquí) | no alcanzado | ✅ | no alcanzado | ✅ | ❌ |

`locked_out_user` no llega al checkout.

## Test User Reference

| Rol | Env var (usuario) | Env var (contraseña) |
|------|----------------|-------------------|
| standard_user | `QA_USER_STANDARD_USER_USERNAME` | `QA_USER_PASSWORD` |
| problem_user | `QA_USER_PROBLEM_USER_USERNAME` | `QA_USER_PASSWORD` |
| performance_glitch_user | `QA_USER_PERFORMANCE_GLITCH_USER_USERNAME` | `QA_USER_PASSWORD` |
| error_user | `QA_USER_ERROR_USER_USERNAME` | `QA_USER_PASSWORD` |
| visual_user | `QA_USER_VISUAL_USER_USERNAME` | `QA_USER_PASSWORD` |

**Notes**: Contraseña `<PLACEHOLDER>` desde `process.env`. Los datos del cliente del checkout son ficticios (no son datos personales reales).
