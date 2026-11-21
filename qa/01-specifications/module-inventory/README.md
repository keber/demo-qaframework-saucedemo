# Módulo: Catálogo de productos (INV)

> Especificación generada en la etapa 1 (análisis de módulo) el 2026-11-21 a partir de exploración en vivo de `{{QA_BASE_URL}}` con Playwright.

## Submódulos

| Submódulo | Código | Carpeta | TCs | Alcance |
|---|---|---|---|---|
| Listado y detalle | CAT | `submodule-catalog/` | 28 | Listado, ordenamiento, agregar/quitar, detalle de producto |
| Dynamic Catalog | DYN | `submodule-dynamic-catalog/` | 13 | Vistas Lazy Load, Spinner y Slider del menú (descubiertas en la exploración) |
| **Total** | | | **41** | |

## Flujo E2E

Login -> /inventory.html (ordenar, agregar) -> /inventory-item.html?id={id} -> carrito (CART).

## Archivos por submódulo

`00-inventory.md` (UI y rutas), `01-business-rules.md` (RN-INV-NNN y desviaciones observadas), `02-workflows.md` (FL-INV-NNN), `03-roles-permissions.md` (matriz por usuario), `04-test-data.md`, `05-test-scenarios.md` (TC-INV-{SUB}-NNN).

## Estado

| Etapa | Estado |
|---|---|
| 1 - Análisis | ✅ 2026-11-21 |
| 2 - Especificación | ✅ 2026-11-21 (trazabilidad RN/FL -> TC, gaps PENDING-BROWSER cerrados) |
