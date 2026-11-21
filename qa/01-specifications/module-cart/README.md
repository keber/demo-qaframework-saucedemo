# Módulo: Carrito de compras (CART)

> Especificación generada en la etapa 1 (análisis de módulo) el 2026-11-21 a partir de exploración en vivo de `{{QA_BASE_URL}}` con Playwright.

## Submódulos

| Submódulo | Código | Carpeta | TCs | Alcance |
|---|---|---|---|---|
| Carrito | CRT | `submodule-cart/` | 19 | Badge, página del carrito, quitar, persistencia, aislamiento entre usuarios |
| **Total** | | | **19** | |

## Flujo E2E

Listado (INV) -> /cart.html -> Checkout (CHK) o Continue Shopping (INV).

## Archivos por submódulo

`00-inventory.md` (UI y rutas), `01-business-rules.md` (RN-CART-NNN y desviaciones observadas), `02-workflows.md` (FL-CART-NNN), `03-roles-permissions.md` (matriz por usuario), `04-test-data.md`, `05-test-scenarios.md` (TC-CART-{SUB}-NNN).

## Estado

| Etapa | Estado |
|---|---|
| 1 - Análisis | ✅ 2026-11-21 |
| 2 - Especificación | 🔲 Pendiente |
