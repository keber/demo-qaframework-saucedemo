# Naming Conventions

> Fill in per your project. See keber/qa-framework docs/spec-driven-philosophy.md.

## Registro de códigos de módulo y submódulo (saucedemo)

| Módulo | Código | Carpeta | Submódulo | Código | Carpeta |
|---|---|---|---|---|---|
| Autenticación | AUTH | `module-auth` | Login y sesión | LOG | `submodule-login` |
| Catálogo de productos | INV | `module-inventory` | Listado y detalle | CAT | `submodule-catalog` |
| Catálogo de productos | INV | `module-inventory` | Dynamic Catalog | DYN | `submodule-dynamic-catalog` |
| Carrito de compras | CART | `module-cart` | Carrito | CRT | `submodule-cart` |
| Checkout | CHK | `module-checkout` | Flujo de compra | FLW | `submodule-checkout-flow` |
| Navegación y menú | NAV | `module-navigation` | Menú lateral, encabezado y footer | MENU | `submodule-menu` |

IDs derivados: `TC-{MODULE}-{SUBMODULE}-{NNN}` (p. ej. `TC-CHK-FLW-012`), `RN-{MODULE}-{NNN}`, `FL-{MODULE}-{NNN}`, `DEF-{MODULE}-{NNN}`, `REC-{MODULE}-{NNN}`.
