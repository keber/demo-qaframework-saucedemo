# Módulo: Navegación y menú (NAV)

> Especificación generada en la etapa 1 (análisis de módulo) el 2026-11-21 a partir de exploración en vivo de `{{QA_BASE_URL}}` con Playwright.

## Submódulos

| Submódulo | Código | Carpeta | TCs | Alcance |
|---|---|---|---|---|
| Menú lateral, encabezado y footer | MENU | `submodule-menu/` | 16 | All Items, Dynamic Catalog, About, Logout, Reset App State, footer social |
| **Total** | | | **16** | |

## Flujo E2E

Menú lateral disponible en todas las vistas internas; enlaza con INV, AUTH (logout) y CART (reset).

## Archivos por submódulo

`00-inventory.md` (UI y rutas), `01-business-rules.md` (RN-NAV-NNN y desviaciones observadas), `02-workflows.md` (FL-NAV-NNN), `03-roles-permissions.md` (matriz por usuario), `04-test-data.md`, `05-test-scenarios.md` (TC-NAV-{SUB}-NNN).

## Estado

| Etapa | Estado |
|---|---|
| 1 - Análisis | ✅ 2026-11-21 |
| 2 - Especificación | ✅ 2026-11-21 (trazabilidad RN/FL -> TC, gaps PENDING-BROWSER cerrados) |
