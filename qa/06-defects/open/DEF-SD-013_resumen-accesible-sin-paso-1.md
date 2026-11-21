# Bug Report - DEF-SD-013: El resumen del checkout es accesible sin completar el paso 1

| Field | Value |
|-------|-------|
| Bug ID | DEF-SD-013 |
| Title | El resumen del checkout es accesible sin completar el paso 1 |
| Severity | Medium |
| Priority | P2 |
| Status | Open |
| Assigned to | Unassigned |
| Module | CHK - Checkout |
| Submodule | FLW - Flujo de compra |
| Environment | QA (`{QA_BASE_URL}` = https://www.saucedemo.com) |
| Browser | Chromium (Playwright 1.65.1) |
| Date reported | 2026-11-21 |
| ADO WI | N/A (Azure DevOps fuera de alcance) |
| Related TCs | TC-CHK-FLW-020 |

---

## Known-issues check

| Field | Value |
|-------|-------|
| Source consulted | `qa/06-defects/` (open, resolved, disputed) y sección "Desviaciones observadas" de `01-business-rules.md` |
| Terms searched | síntoma descrito en "Actual Result" (usuario `standard_user`) |
| Matches found | Ninguno en `qa/06-defects/`; registrado como candidato DEF en la etapa 1/2 |
| Classification | New defect |
| Rule violated | RN-CHK-016: El resumen (paso 2) requiere haber completado el paso 1. |

---

## Description

Con el usuario `standard_user` la aplicación incumple RN-CHK-016. Confirmado en la ejecución automatizada de la etapa 5 (2026-11-21).

---

## Steps to Reproduce

| Step | Action |
|------|--------|
| 1 | Con la sesión de `standard_user` y 2 productos en el carrito, navegar directamente a `/checkout-step-two.html` |

Credenciales: usuario desde `QA_USER_*_USERNAME` y contraseña `<PLACEHOLDER>` (`QA_USER_PASSWORD`); en la suite la sesión sale del storageState de `global-setup.ts`.

---

## Expected Result

`checkout-summary-container` no existe y la URL final es `/checkout-step-one.html` o `/cart.html`.

---

## Actual Result

Se muestra el resumen completo con `finish` operable, sin datos del cliente.

---

## Evidence

- Test: `qa/07-automation/e2e/tests/checkout/checkout-flow.spec.ts` (TC-CHK-FLW-020), marcado con `expectOpenDefect('DEF-SD-013', ...)`.
- Ejecución: `qa/05-test-execution/automated/` (resumen JSON y reporte de la etapa 5).
- Verificado con `DEFECTS_DIAG=1`: el test falla en la aserción de la regla, no por infraestructura.

---

## Root Cause Analysis

Comportamiento intencional del usuario de demostración `standard_user` en saucedemo; causa interna no visible (frontend sin código fuente disponible).

---

## Fix Suggestion

Redirigir al paso 1 cuando no hay datos del cliente.

---

## Impact on Automation

| TC ID | Current test state | Impact |
|-------|-------------------|--------|
| TC-CHK-FLW-020 | `expectOpenDefect()` (expected failure, `test.fail`) | La ejecución queda verde mientras el defecto se reproduce; pasa a rojo con "no longer reproduces" cuando se corrija |

---

## Reactivation Instructions

Cuando el defecto se corrija:
1. Verificar el nuevo comportamiento contra RN-CHK-016.
2. Quitar `expectOpenDefect()` de TC-CHK-FLW-020 en `tests/checkout/checkout-flow.spec.ts` y dejar las aserciones como test normal.
3. Ejecutar el test al menos 2 veces para confirmar estabilidad.
4. Mover este archivo a `qa/06-defects/resolved/`.

---

## Changelog

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Defecto confirmado en la etapa 5 y reportado |
