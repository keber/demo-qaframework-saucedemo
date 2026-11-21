# Especificaciones funcionales - saucedemo

| Módulo | Código | Carpeta | Submódulos | TCs | Etapa |
|---|---|---|---|---|---|
| Autenticación | AUTH | `module-auth/` | LOG | 24 | 2 - Especificación ✅ |
| Catálogo de productos | INV | `module-inventory/` | CAT, DYN | 41 | 2 - Especificación ✅ |
| Carrito de compras | CART | `module-cart/` | CRT | 19 | 2 - Especificación ✅ |
| Checkout | CHK | `module-checkout/` | FLW | 26 | 2 - Especificación ✅ |
| Navegación y menú | NAV | `module-navigation/` | MENU | 16 | 2 - Especificación ✅ |
| **Total** | | | 6 | **126** | |

Etapa 2 (2026-11-21): cada `05-test-scenarios.md` incluye una matriz de trazabilidad RN -> TC y FL -> TC; los 5 TC `PENDING-BROWSER` de la etapa 1 se verificaron en vivo y no queda ningún TC `PENDING-BROWSER` ni `PENDING-CODE`.

Usuarios de prueba y su comportamiento: ver `03-roles-permissions.md` de cada submódulo y `qa/memory/saucedemo-app-behavior.md`.
