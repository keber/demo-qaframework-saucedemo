# Bug Report - DEF-SD-007: visual_user ve precios aleatorios y sin 2 decimales en el listado

| Field | Value |
|-------|-------|
| Bug ID | DEF-SD-007 |
| Title | visual_user ve precios aleatorios y sin 2 decimales en el listado |
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
| Related TCs | TC-INV-CAT-025 |

---

## Known-issues check

| Field | Value |
|-------|-------|
| Source consulted | `qa/06-defects/` (open, resolved, disputed) y sección "Desviaciones observadas" de `01-business-rules.md` |
| Terms searched | síntoma descrito en "Actual Result" (usuario `visual_user`) |
| Matches found | Ninguno en `qa/06-defects/`; registrado como candidato DEF en la etapa 1/2 |
| Classification | New defect |
| Rule violated | RN-INV-012: El precio de un producto es el del catálogo de referencia, con formato `$N.NN`, y es el mismo en listado, detalle y carrito. |

---

## Description

Con el usuario `visual_user` la aplicación incumple RN-INV-012. Confirmado en la ejecución automatizada de la etapa 5 (2026-11-21).

---

## Steps to Reproduce

| Step | Action |
|------|--------|
| 1 | Abrir `/inventory.html` con la sesión de `visual_user` y leer los 6 pares nombre-precio |
| 2 | Abrir el detalle de Backpack y leer el precio |
| 3 | Agregar Backpack, abrir el carrito y leer el precio de la fila |

Credenciales: usuario desde `QA_USER_*_USERNAME` y contraseña `<PLACEHOLDER>` (`QA_USER_PASSWORD`); en la suite la sesión sale del storageState de `global-setup.ts`.

---

## Expected Result

Precios del listado iguales al catálogo de referencia (Backpack $29.99, Bike Light $9.99, Bolt T-Shirt $15.99, Fleece Jacket $49.99, Onesie $7.99, Test.allTheThings() $15.99) con formato `^\$\d+\.\d{2}$`; Backpack $29.99 en las 3 vistas.

---

## Actual Result

Los precios del listado cambian en cada carga y no coinciden con el catálogo; algunos no tienen 2 decimales (p. ej. "$42.8", "$3"). En la ejecución de la etapa 5 Backpack mostró "$77.56". Detalle y carrito sí muestran $29.99.

---

## Evidence

- Test: `qa/07-automation/e2e/tests/inventory/catalog.spec.ts` (TC-INV-CAT-025), marcado con `expectOpenDefect('DEF-SD-007', ...)`.
- Ejecución: `qa/05-test-execution/automated/` (resumen JSON y reporte de la etapa 5).
- Verificado con `DEFECTS_DIAG=1`: el test falla en la aserción de la regla, no por infraestructura.

---

## Root Cause Analysis

Comportamiento intencional del usuario de demostración `visual_user` en saucedemo; causa interna no visible (frontend sin código fuente disponible).

---

## Fix Suggestion

Leer el precio del listado desde el mismo origen de datos que el detalle y el carrito.

---

## Impact on Automation

| TC ID | Current test state | Impact |
|-------|-------------------|--------|
| TC-INV-CAT-025 | `expectOpenDefect()` (expected failure, `test.fail`) | La ejecución queda verde mientras el defecto se reproduce; pasa a rojo con "no longer reproduces" cuando se corrija |

---

## Reactivation Instructions

Cuando el defecto se corrija:
1. Verificar el nuevo comportamiento contra RN-INV-012.
2. Quitar `expectOpenDefect()` de TC-INV-CAT-025 en `tests/inventory/catalog.spec.ts` y dejar las aserciones como test normal.
3. Ejecutar el test al menos 2 veces para confirmar estabilidad.
4. Mover este archivo a `qa/06-defects/resolved/`.

---

## Changelog

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Defecto confirmado en la etapa 5 y reportado |
