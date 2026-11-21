# Bug Report - DEF-SD-003: problem_user no puede agregar 3 productos ni quitar desde el listado

| Field | Value |
|-------|-------|
| Bug ID | DEF-SD-003 |
| Title | problem_user no puede agregar 3 productos ni quitar desde el listado |
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
| Related TCs | TC-INV-CAT-021 |

---

## Known-issues check

| Field | Value |
|-------|-------|
| Source consulted | `qa/06-defects/` (open, resolved, disputed) y sección "Desviaciones observadas" de `01-business-rules.md` |
| Terms searched | síntoma descrito en "Actual Result" (usuario `problem_user`) |
| Matches found | Ninguno en `qa/06-defects/`; registrado como candidato DEF en la etapa 1/2 |
| Classification | New defect |
| Rule violated | RN-INV-005, RN-INV-006: "Add to cart" agrega el producto (botón "Remove", badge +1) y "Remove" lo quita (botón "Add to cart", badge -1). |

---

## Description

Con el usuario `problem_user` la aplicación incumple RN-INV-005, RN-INV-006. Confirmado en la ejecución automatizada de la etapa 5 (2026-11-21).

---

## Steps to Reproduce

| Step | Action |
|------|--------|
| 1 | Abrir `/inventory.html` con la sesión de `problem_user` y el carrito vacío |
| 2 | Hacer clic en `add-to-cart-{slug}` de los 6 productos |
| 3 | Hacer clic en `remove-{slug}` de los productos que muestran "Remove" |

Credenciales: usuario desde `QA_USER_*_USERNAME` y contraseña `<PLACEHOLDER>` (`QA_USER_PASSWORD`); en la suite la sesión sale del storageState de `global-setup.ts`.

---

## Expected Result

Tras agregar: `shopping-cart-badge` = "6" y 6 botones "Remove". Tras quitar: sin badge y 6 botones "Add to cart".

---

## Actual Result

Solo se agregan Backpack, Bike Light y Onesie (badge "3"); Bolt T-Shirt, Fleece Jacket y Test.allTheThings() no cambian. "Remove" no quita el producto: el badge y los botones no cambian.

---

## Evidence

- Test: `qa/07-automation/e2e/tests/inventory/catalog.spec.ts` (TC-INV-CAT-021), marcado con `expectOpenDefect('DEF-SD-003', ...)`.
- Ejecución: `qa/05-test-execution/automated/` (resumen JSON y reporte de la etapa 5).
- Verificado con `DEFECTS_DIAG=1`: el test falla en la aserción de la regla, no por infraestructura.

---

## Root Cause Analysis

Comportamiento intencional del usuario de demostración `problem_user` en saucedemo; causa interna no visible (frontend sin código fuente disponible).

---

## Fix Suggestion

Revisar los manejadores de agregar y quitar del listado para `problem_user`.

---

## Impact on Automation

| TC ID | Current test state | Impact |
|-------|-------------------|--------|
| TC-INV-CAT-021 | `expectOpenDefect()` (expected failure, `test.fail`) | La ejecución queda verde mientras el defecto se reproduce; pasa a rojo con "no longer reproduces" cuando se corrija |

---

## Reactivation Instructions

Cuando el defecto se corrija:
1. Verificar el nuevo comportamiento contra RN-INV-005, RN-INV-006.
2. Quitar `expectOpenDefect()` de TC-INV-CAT-021 en `tests/inventory/catalog.spec.ts` y dejar las aserciones como test normal.
3. Ejecutar el test al menos 2 veces para confirmar estabilidad.
4. Mover este archivo a `qa/06-defects/resolved/`.

---

## Changelog

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Defecto confirmado en la etapa 5 y reportado |
