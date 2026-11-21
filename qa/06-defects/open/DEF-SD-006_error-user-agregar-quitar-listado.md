# Bug Report - DEF-SD-006: error_user no puede agregar 3 productos ni quitar desde el listado

| Field | Value |
|-------|-------|
| Bug ID | DEF-SD-006 |
| Title | error_user no puede agregar 3 productos ni quitar desde el listado |
| Severity | High |
| Priority | P1 |
| Status | Open |
| Assigned to | Unassigned |
| Module | INV - Catálogo de productos |
| Submodule | CAT - Listado y detalle |
| Environment | QA (`{QA_BASE_URL}` = https://www.saucedemo.com) |
| Browser | Chromium (Playwright 1.65.1) |
| Date reported | 2026-11-21 |
| ADO WI | N/A (Azure DevOps fuera de alcance) |
| Related TCs | TC-INV-CAT-024 |

---

## Known-issues check

| Field | Value |
|-------|-------|
| Source consulted | `qa/06-defects/` (open, resolved, disputed) y sección "Desviaciones observadas" de `01-business-rules.md` |
| Terms searched | síntoma descrito en "Actual Result" (usuario `error_user`) |
| Matches found | Ninguno en `qa/06-defects/`; registrado como candidato DEF en la etapa 1/2 |
| Classification | New defect |
| Rule violated | RN-INV-005, RN-INV-006, RN-INV-008: "Add to cart" agrega el producto y "Remove" lo quita, en el listado y en el detalle. |

---

## Description

Con el usuario `error_user` la aplicación incumple RN-INV-005, RN-INV-006, RN-INV-008. Confirmado en la ejecución automatizada de la etapa 5 (2026-11-21).

---

## Steps to Reproduce

| Step | Action |
|------|--------|
| 1 | Abrir `/inventory.html` con la sesión de `error_user` y el carrito vacío |
| 2 | Hacer clic en `add-to-cart-{slug}` de los 6 productos |
| 3 | Hacer clic en `remove-{slug}` de los productos que muestran "Remove" |

Credenciales: usuario desde `QA_USER_*_USERNAME` y contraseña `<PLACEHOLDER>` (`QA_USER_PASSWORD`); en la suite la sesión sale del storageState de `global-setup.ts`.

---

## Expected Result

Tras agregar: badge "6" y 6 botones "Remove". Tras quitar: sin badge y 6 botones "Add to cart".

---

## Actual Result

Falla agregar Bolt T-Shirt, Fleece Jacket y Test.allTheThings() (error JS "Failed to add item to the cart."); "Remove" falla en el listado ("Failed to remove item from cart.").

---

## Evidence

- Test: `qa/07-automation/e2e/tests/inventory/catalog.spec.ts` (TC-INV-CAT-024), marcado con `expectOpenDefect('DEF-SD-006', ...)`.
- Ejecución: `qa/05-test-execution/automated/` (resumen JSON y reporte de la etapa 5).
- Verificado con `DEFECTS_DIAG=1`: el test falla en la aserción de la regla, no por infraestructura.

---

## Root Cause Analysis

Comportamiento intencional del usuario de demostración `error_user` en saucedemo; causa interna no visible (frontend sin código fuente disponible).

---

## Fix Suggestion

Revisar los manejadores de agregar y quitar para `error_user`.

---

## Impact on Automation

| TC ID | Current test state | Impact |
|-------|-------------------|--------|
| TC-INV-CAT-024 | `expectOpenDefect()` (expected failure, `test.fail`) | La ejecución queda verde mientras el defecto se reproduce; pasa a rojo con "no longer reproduces" cuando se corrija |

---

## Reactivation Instructions

Cuando el defecto se corrija:
1. Verificar el nuevo comportamiento contra RN-INV-005, RN-INV-006, RN-INV-008.
2. Quitar `expectOpenDefect()` de TC-INV-CAT-024 en `tests/inventory/catalog.spec.ts` y dejar las aserciones como test normal.
3. Ejecutar el test al menos 2 veces para confirmar estabilidad.
4. Mover este archivo a `qa/06-defects/resolved/`.

---

## Changelog

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Defecto confirmado en la etapa 5 y reportado |
