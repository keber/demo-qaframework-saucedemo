# Bug Report - DEF-SD-012: Con el carrito vacío el subtotal se muestra "$0" sin 2 decimales

| Field | Value |
|-------|-------|
| Bug ID | DEF-SD-012 |
| Title | Con el carrito vacío el subtotal se muestra "$0" sin 2 decimales |
| Severity | Low |
| Priority | P3 |
| Status | Open |
| Assigned to | Unassigned |
| Module | CHK - Checkout |
| Submodule | FLW - Flujo de compra |
| Environment | QA (`{QA_BASE_URL}` = https://www.saucedemo.com) |
| Browser | Chromium (Playwright 1.65.1) |
| Date reported | 2026-11-21 |
| ADO WI | N/A (Azure DevOps fuera de alcance) |
| Related TCs | TC-CHK-FLW-015 |

---

## Known-issues check

| Field | Value |
|-------|-------|
| Source consulted | `qa/06-defects/` (open, resolved, disputed) y sección "Desviaciones observadas" de `01-business-rules.md` |
| Terms searched | síntoma descrito en "Actual Result" (usuario `standard_user`) |
| Matches found | Ninguno en `qa/06-defects/`; registrado como candidato DEF en la etapa 1/2 |
| Classification | New defect |
| Rule violated | RN-CHK-011: Los importes del resumen se muestran siempre con 2 decimales. |

---

## Description

Con el usuario `standard_user` la aplicación incumple RN-CHK-011. Confirmado en la ejecución automatizada de la etapa 5 (2026-11-21).

---

## Steps to Reproduce

| Step | Action |
|------|--------|
| 1 | Con la sesión de `standard_user` y el carrito vacío, navegar a `/checkout-step-two.html` |
| 2 | Leer `subtotal-label`, `tax-label` y `total-label` |

Credenciales: usuario desde `QA_USER_*_USERNAME` y contraseña `<PLACEHOLDER>` (`QA_USER_PASSWORD`); en la suite la sesión sale del storageState de `global-setup.ts`.

---

## Expected Result

"Item total: $0.00", "Tax: $0.00" y "Total: $0.00".

---

## Actual Result

`subtotal-label` = "Item total: $0" (sin decimales); impuesto y total sí muestran $0.00.

---

## Evidence

- Test: `qa/07-automation/e2e/tests/checkout/checkout-flow.spec.ts` (TC-CHK-FLW-015), marcado con `expectOpenDefect('DEF-SD-012', ...)`.
- Ejecución: `qa/05-test-execution/automated/` (resumen JSON y reporte de la etapa 5).
- Verificado con `DEFECTS_DIAG=1`: el test falla en la aserción de la regla, no por infraestructura.

---

## Root Cause Analysis

Comportamiento intencional del usuario de demostración `standard_user` en saucedemo; causa interna no visible (frontend sin código fuente disponible).

---

## Fix Suggestion

Formatear el subtotal con 2 decimales igual que el impuesto y el total.

---

## Impact on Automation

| TC ID | Current test state | Impact |
|-------|-------------------|--------|
| TC-CHK-FLW-015 | `expectOpenDefect()` (expected failure, `test.fail`) | La ejecución queda verde mientras el defecto se reproduce; pasa a rojo con "no longer reproduces" cuando se corrija |

---

## Reactivation Instructions

Cuando el defecto se corrija:
1. Verificar el nuevo comportamiento contra RN-CHK-011.
2. Quitar `expectOpenDefect()` de TC-CHK-FLW-015 en `tests/checkout/checkout-flow.spec.ts` y dejar las aserciones como test normal.
3. Ejecutar el test al menos 2 veces para confirmar estabilidad.
4. Mover este archivo a `qa/06-defects/resolved/`.

---

## Changelog

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Defecto confirmado en la etapa 5 y reportado |
