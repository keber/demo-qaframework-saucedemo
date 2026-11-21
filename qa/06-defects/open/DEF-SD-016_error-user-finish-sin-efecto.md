# Bug Report - DEF-SD-016: error_user no puede finalizar la compra: finish no hace nada

| Field | Value |
|-------|-------|
| Bug ID | DEF-SD-016 |
| Title | error_user no puede finalizar la compra: finish no hace nada |
| Severity | Critical |
| Priority | P1 |
| Status | Open |
| Assigned to | Unassigned |
| Module | CHK - Checkout |
| Submodule | FLW - Flujo de compra |
| Environment | QA (`{QA_BASE_URL}` = https://www.saucedemo.com) |
| Browser | Chromium (Playwright 1.65.1) |
| Date reported | 2026-11-21 |
| ADO WI | N/A (Azure DevOps fuera de alcance) |
| Related TCs | TC-CHK-FLW-024 |

---

## Known-issues check

| Field | Value |
|-------|-------|
| Source consulted | `qa/06-defects/` (open, resolved, disputed) y sección "Desviaciones observadas" de `01-business-rules.md` |
| Terms searched | síntoma descrito en "Actual Result" (usuario `error_user`) |
| Matches found | Ninguno en `qa/06-defects/`; registrado como candidato DEF en la etapa 1/2 |
| Classification | New defect |
| Rule violated | RN-CHK-013: `finish` completa la compra: navega a `/checkout-complete.html` con "Thank you for your order!". |

---

## Description

Con el usuario `error_user` la aplicación incumple RN-CHK-013. Confirmado en la ejecución automatizada de la etapa 5 (2026-11-21).

---

## Steps to Reproduce

| Step | Action |
|------|--------|
| 1 | Llegar a `/checkout-step-two.html` con la sesión de `error_user` y 2 productos |
| 2 | Hacer clic en `finish` |

Credenciales: usuario desde `QA_USER_*_USERNAME` y contraseña `<PLACEHOLDER>` (`QA_USER_PASSWORD`); en la suite la sesión sale del storageState de `global-setup.ts`.

---

## Expected Result

URL `/checkout-complete.html` y `complete-header` = "Thank you for your order!".

---

## Actual Result

La página permanece en `/checkout-step-two.html`; la compra no se completa.

---

## Evidence

- Test: `qa/07-automation/e2e/tests/checkout/checkout-flow.spec.ts` (TC-CHK-FLW-024), marcado con `expectOpenDefect('DEF-SD-016', ...)`.
- Ejecución: `qa/05-test-execution/automated/` (resumen JSON y reporte de la etapa 5).
- Verificado con `DEFECTS_DIAG=1`: el test falla en la aserción de la regla, no por infraestructura.

---

## Root Cause Analysis

Comportamiento intencional del usuario de demostración `error_user` en saucedemo; causa interna no visible (frontend sin código fuente disponible).

---

## Fix Suggestion

Revisar el manejador de `finish` para `error_user`.

---

## Impact on Automation

| TC ID | Current test state | Impact |
|-------|-------------------|--------|
| TC-CHK-FLW-024 | `expectOpenDefect()` (expected failure, `test.fail`) | La ejecución queda verde mientras el defecto se reproduce; pasa a rojo con "no longer reproduces" cuando se corrija |

---

## Reactivation Instructions

Cuando el defecto se corrija:
1. Verificar el nuevo comportamiento contra RN-CHK-013.
2. Quitar `expectOpenDefect()` de TC-CHK-FLW-024 en `tests/checkout/checkout-flow.spec.ts` y dejar las aserciones como test normal.
3. Ejecutar el test al menos 2 veces para confirmar estabilidad.
4. Mover este archivo a `qa/06-defects/resolved/`.

---

## Changelog

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Defecto confirmado en la etapa 5 y reportado |
