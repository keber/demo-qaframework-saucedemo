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

IDs derivados: `TC-{MODULE}-{SUBMODULE}-{NNN}` (p. ej. `TC-CHK-FLW-012`), `RN-{MODULE}-{NNN}`, `FL-{MODULE}-{NNN}`.

## Defectos y recomendaciones

Los defectos y las recomendaciones usan el prefijo de proyecto `SD` (saucedemo), no el código de módulo, según `conventions.defectIdPattern` = `DEF-{PREFIX}-{NUM}` de `qa/qa-framework.config.json`:

| Tipo | Patrón | Carpeta | Ejemplo |
|---|---|---|---|
| Defecto (incumple una regla de negocio) | `DEF-SD-{NNN}` | `qa/06-defects/open/` (luego `resolved/` o `disputed/`) | `DEF-SD-012_total-vacio-sin-decimales.md` |
| Recomendación (no incumple ninguna regla) | `REC-SD-{NNN}` | `qa/06-defects/recommendations/` | `REC-SD-006_pdf-zona-horaria-inconsistente.md` |

- Numeración secuencial única para todo el proyecto, independiente del módulo; el módulo y el TC afectados se registran dentro del archivo (campos `Module` y `Related TCs`).
- Nombre de archivo: `{ID}_{slug-en-minúsculas}.md`.
- Un número retirado no se reutiliza: si un `DEF-SD-NNN` se reclasifica como recomendación, recibe un `REC-SD-NNN` nuevo y el número DEF queda retirado con una nota que apunta al REC.
