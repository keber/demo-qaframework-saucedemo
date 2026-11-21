# Bug Report - DEF-SD-004: problem_user abre el detalle de otro producto (id+1)

| Field | Value |
|-------|-------|
| Bug ID | DEF-SD-004 |
| Title | problem_user abre el detalle de otro producto (id+1) |
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
| Related TCs | TC-INV-CAT-022 |

---

## Known-issues check

| Field | Value |
|-------|-------|
| Source consulted | `qa/06-defects/` (open, resolved, disputed) y sección "Desviaciones observadas" de `01-business-rules.md` |
| Terms searched | síntoma descrito en "Actual Result" (usuario `problem_user`) |
| Matches found | Ninguno en `qa/06-defects/`; registrado como candidato DEF en la etapa 1/2 |
| Classification | New defect |
| Rule violated | RN-INV-007: El nombre y la imagen de una tarjeta abren el detalle del mismo producto. |

---

## Description

Con el usuario `problem_user` la aplicación incumple RN-INV-007. Confirmado en la ejecución automatizada de la etapa 5 (2026-11-21).

---

## Steps to Reproduce

| Step | Action |
|------|--------|
| 1 | Abrir `/inventory.html` con la sesión de `problem_user` |
| 2 | Hacer clic en `item-4-title-link` (Sauce Labs Backpack) |
| 3 | Esperar `back-to-products` y leer la URL, el nombre y el precio |

Credenciales: usuario desde `QA_USER_*_USERNAME` y contraseña `<PLACEHOLDER>` (`QA_USER_PASSWORD`); en la suite la sesión sale del storageState de `global-setup.ts`.

---

## Expected Result

URL `/inventory-item.html?id=4`, `inventory-item-name` = "Sauce Labs Backpack" e `inventory-item-price` = "$29.99".

---

## Actual Result

Se abre `/inventory-item.html?id=5` (Sauce Labs Fleece Jacket, $49.99). Desde Fleece Jacket se abre `?id=6` con "ITEM NOT FOUND".

---

## Evidence

- Test: `qa/07-automation/e2e/tests/inventory/catalog.spec.ts` (TC-INV-CAT-022), marcado con `expectOpenDefect('DEF-SD-004', ...)`.
- Ejecución: `qa/05-test-execution/automated/` (resumen JSON y reporte de la etapa 5).
- Verificado con `DEFECTS_DIAG=1`: el test falla en la aserción de la regla, no por infraestructura.

---

## Root Cause Analysis

Comportamiento intencional del usuario de demostración `problem_user` en saucedemo; causa interna no visible (frontend sin código fuente disponible).

---

## Fix Suggestion

Corregir el cálculo del id del enlace (usa id+1 para `problem_user`).

---

## Impact on Automation

| TC ID | Current test state | Impact |
|-------|-------------------|--------|
| TC-INV-CAT-022 | `expectOpenDefect()` (expected failure, `test.fail`) | La ejecución queda verde mientras el defecto se reproduce; pasa a rojo con "no longer reproduces" cuando se corrija |

---

## Reactivation Instructions

Cuando el defecto se corrija:
1. Verificar el nuevo comportamiento contra RN-INV-007.
2. Quitar `expectOpenDefect()` de TC-INV-CAT-022 en `tests/inventory/catalog.spec.ts` y dejar las aserciones como test normal.
3. Ejecutar el test al menos 2 veces para confirmar estabilidad.
4. Mover este archivo a `qa/06-defects/resolved/`.

---

## Changelog

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Defecto confirmado en la etapa 5 y reportado |
