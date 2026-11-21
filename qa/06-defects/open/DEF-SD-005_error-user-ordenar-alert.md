# Bug Report - DEF-SD-005: error_user: ordenar muestra un alert de error y no reordena

| Field | Value |
|-------|-------|
| Bug ID | DEF-SD-005 |
| Title | error_user: ordenar muestra un alert de error y no reordena |
| Severity | Medium |
| Priority | P2 |
| Status | Open |
| Assigned to | Unassigned |
| Module | INV - Catálogo de productos |
| Submodule | CAT - Listado y detalle |
| Environment | QA (`{QA_BASE_URL}` = https://www.saucedemo.com) |
| Browser | Chromium (Playwright 1.65.1) |
| Date reported | 2026-11-21 |
| ADO WI | N/A (Azure DevOps fuera de alcance) |
| Related TCs | TC-INV-CAT-023 |

---

## Known-issues check

| Field | Value |
|-------|-------|
| Source consulted | `qa/06-defects/` (open, resolved, disputed) y sección "Desviaciones observadas" de `01-business-rules.md` |
| Terms searched | síntoma descrito en "Actual Result" (usuario `error_user`) |
| Matches found | Ninguno en `qa/06-defects/`; registrado como candidato DEF en la etapa 1/2 |
| Classification | New defect |
| Rule violated | RN-INV-003, RN-INV-004: Elegir Z-A ordena por nombre descendente sin errores. |

---

## Description

Con el usuario `error_user` la aplicación incumple RN-INV-003, RN-INV-004. Confirmado en la ejecución automatizada de la etapa 5 (2026-11-21).

---

## Steps to Reproduce

| Step | Action |
|------|--------|
| 1 | Abrir `/inventory.html` con la sesión de `error_user` y registrar `page.on('dialog')` |
| 2 | Seleccionar `za` en `product-sort-container` |
| 3 | Leer `active-option`, los nombres y los diálogos registrados |

Credenciales: usuario desde `QA_USER_*_USERNAME` y contraseña `<PLACEHOLDER>` (`QA_USER_PASSWORD`); en la suite la sesión sale del storageState de `global-setup.ts`.

---

## Expected Result

Nombres en orden Z-A, `active-option` = "Name (Z to A)" y 0 diálogos.

---

## Actual Result

Aparece el alert "Sorting is broken! This error has been reported to Backtrace." y la lista no se reordena.

---

## Evidence

- Test: `qa/07-automation/e2e/tests/inventory/catalog.spec.ts` (TC-INV-CAT-023), marcado con `expectOpenDefect('DEF-SD-005', ...)`.
- Ejecución: `qa/05-test-execution/automated/` (resumen JSON y reporte de la etapa 5).
- Verificado con `DEFECTS_DIAG=1`: el test falla en la aserción de la regla, no por infraestructura.

---

## Root Cause Analysis

Comportamiento intencional del usuario de demostración `error_user` en saucedemo; causa interna no visible (frontend sin código fuente disponible).

---

## Fix Suggestion

Revisar el ordenamiento para `error_user` (lanza una excepción reportada a Backtrace).

---

## Impact on Automation

| TC ID | Current test state | Impact |
|-------|-------------------|--------|
| TC-INV-CAT-023 | `expectOpenDefect()` (expected failure, `test.fail`) | La ejecución queda verde mientras el defecto se reproduce; pasa a rojo con "no longer reproduces" cuando se corrija |

---

## Reactivation Instructions

Cuando el defecto se corrija:
1. Verificar el nuevo comportamiento contra RN-INV-003, RN-INV-004.
2. Quitar `expectOpenDefect()` de TC-INV-CAT-023 en `tests/inventory/catalog.spec.ts` y dejar las aserciones como test normal.
3. Ejecutar el test al menos 2 veces para confirmar estabilidad.
4. Mover este archivo a `qa/06-defects/resolved/`.

---

## Changelog

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Defecto confirmado en la etapa 5 y reportado |
