# Módulo: Checkout (CHK)

> Especificación generada en la etapa 1 (análisis de módulo) el 2026-11-21 a partir de exploración en vivo de `{{QA_BASE_URL}}` con Playwright.

## Submódulos

| Submódulo | Código | Carpeta | TCs | Alcance |
|---|---|---|---|---|
| Flujo de compra | FLW | `submodule-checkout-flow/` | 26 | Paso 1 (datos), paso 2 (resumen, impuesto 8 %), paso 3 (confirmación, PDF) |
| **Total** | | | **26** | |

## Flujo E2E

Carrito (CART) -> /checkout-step-one.html -> /checkout-step-two.html -> /checkout-complete.html -> Back Home (INV).

## Archivos por submódulo

`00-inventory.md` (UI y rutas), `01-business-rules.md` (RN-CHK-NNN y desviaciones observadas), `02-workflows.md` (FL-CHK-NNN), `03-roles-permissions.md` (matriz por usuario), `04-test-data.md`, `05-test-scenarios.md` (TC-CHK-{SUB}-NNN).

## Estado

| Etapa | Estado |
|---|---|
| 1 - Análisis | ✅ 2026-11-21 |
| 2 - Especificación | 🔲 Pendiente |
