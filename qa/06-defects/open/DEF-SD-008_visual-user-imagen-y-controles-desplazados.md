# Bug Report - DEF-SD-008: visual_user ve la imagen sl-404 de Backpack, el carrito desplazado y un botón desalineado

| Field | Value |
|-------|-------|
| Bug ID | DEF-SD-008 |
| Title | visual_user ve la imagen sl-404 de Backpack, el carrito desplazado y un botón desalineado |
| Severity | Low |
| Priority | P3 |
| Status | Open |
| Assigned to | Unassigned |
| Module | INV - Catálogo de productos |
| Submodule | CAT - Listado y detalle |
| Environment | QA (`{QA_BASE_URL}` = https://www.saucedemo.com) |
| Browser | Chromium (Playwright 1.65.1) |
| Date reported | 2026-11-21 |
| ADO WI | N/A (Azure DevOps fuera de alcance) |
| Related TCs | TC-INV-CAT-026 |

---

## Known-issues check

| Field | Value |
|-------|-------|
| Source consulted | `qa/06-defects/` (open, resolved, disputed) y sección "Desviaciones observadas" de `01-business-rules.md` |
| Terms searched | síntoma descrito en "Actual Result" (usuario `visual_user`) |
| Matches found | Ninguno en `qa/06-defects/`; registrado como candidato DEF en la etapa 1/2 |
| Classification | New defect |
| Rule violated | RN-INV-011: Cada producto muestra su propia imagen y los controles se ven igual que para `standard_user`. |

---

## Description

Con el usuario `visual_user` la aplicación incumple RN-INV-011. Confirmado en la ejecución automatizada de la etapa 5 (2026-11-21).

---

## Steps to Reproduce

| Step | Action |
|------|--------|
| 1 | Abrir `/inventory.html` con `standard_user` (contexto A) y guardar `boundingBox()` de `shopping-cart-link` |
| 2 | Abrir `/inventory.html` con `visual_user` (contexto B) |
| 3 | Leer el `src` de la imagen de Backpack, `boundingBox()` de `shopping-cart-link` y las clases de los 6 botones `add-to-cart-*` |

Credenciales: usuario desde `QA_USER_*_USERNAME` y contraseña `<PLACEHOLDER>` (`QA_USER_PASSWORD`); en la suite la sesión sale del storageState de `global-setup.ts`.

---

## Expected Result

El `src` de Backpack no contiene `sl-404`; la posición de `shopping-cart-link` es igual a la de `standard_user` (+/- 2 px); ningún botón tiene la clase `btn_inventory_misaligned`.

---

## Actual Result

La imagen de Backpack es `sl-404`; el ícono del carrito está desplazado respecto de `standard_user`; el botón del último producto tiene la clase `btn_inventory_misaligned`.

---

## Evidence

- Test: `qa/07-automation/e2e/tests/inventory/catalog.spec.ts` (TC-INV-CAT-026), marcado con `expectOpenDefect('DEF-SD-008', ...)`.
- Ejecución: `qa/05-test-execution/automated/` (resumen JSON y reporte de la etapa 5).
- Verificado con `DEFECTS_DIAG=1`: el test falla en la aserción de la regla, no por infraestructura.

---

## Root Cause Analysis

Comportamiento intencional del usuario de demostración `visual_user` en saucedemo; causa interna no visible (frontend sin código fuente disponible).

---

## Fix Suggestion

Quitar las variaciones visuales de `visual_user`.

---

## Impact on Automation

| TC ID | Current test state | Impact |
|-------|-------------------|--------|
| TC-INV-CAT-026 | `expectOpenDefect()` (expected failure, `test.fail`) | La ejecución queda verde mientras el defecto se reproduce; pasa a rojo con "no longer reproduces" cuando se corrija |

---

## Reactivation Instructions

Cuando el defecto se corrija:
1. Verificar el nuevo comportamiento contra RN-INV-011.
2. Quitar `expectOpenDefect()` de TC-INV-CAT-026 en `tests/inventory/catalog.spec.ts` y dejar las aserciones como test normal.
3. Ejecutar el test al menos 2 veces para confirmar estabilidad.
4. Mover este archivo a `qa/06-defects/resolved/`.

---

## Changelog

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Defecto confirmado en la etapa 5 y reportado |
