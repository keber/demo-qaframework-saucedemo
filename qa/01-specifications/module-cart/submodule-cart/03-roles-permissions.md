# Roles y permisos - Carrito de compras: Carrito

## Access Matrix

| Funcionalidad / Acción | standard_user | problem_user | performance_glitch_user | error_user | visual_user | Sin sesión |
|---|---|---|---|---|---|---|
| Ver `/cart.html` | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ (RN-AUTH-007) |
| Badge correcto al agregar | ✅ | ⚠️ solo 3 de 6 productos se agregan (INV) | ✅ | ⚠️ 3 de 6 (INV) | ✅ | - |
| Quitar desde el carrito | ✅ | ✅ | ✅ | ✅ | ✅ | - |
| Precio en el carrito = precio real | ✅ | ✅ | ✅ | ✅ | ✅ ($29.99, distinto del precio aleatorio del listado) | - |
| Continue Shopping / Checkout | ✅ | ✅ | ✅ | ✅ | ✅ | - |

`locked_out_user` no llega al carrito.

## Test User Reference

| Rol | Env var (usuario) | Env var (contraseña) |
|------|----------------|-------------------|
| standard_user | `QA_USER_STANDARD_USER_USERNAME` | `QA_USER_PASSWORD` |
| problem_user | `QA_USER_PROBLEM_USER_USERNAME` | `QA_USER_PASSWORD` |
| performance_glitch_user | `QA_USER_PERFORMANCE_GLITCH_USER_USERNAME` | `QA_USER_PASSWORD` |
| error_user | `QA_USER_ERROR_USER_USERNAME` | `QA_USER_PASSWORD` |
| visual_user | `QA_USER_VISUAL_USER_USERNAME` | `QA_USER_PASSWORD` |

**Notes**: Contraseña `<PLACEHOLDER>` desde `process.env`. Como el carrito se comparte entre usuarios del mismo navegador (RN-CART-011), cada test debe usar un contexto propio.
