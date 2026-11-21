# Bug Report - DEF-SD-009: El carrito de un usuario es visible para el siguiente usuario del mismo navegador

| Field | Value |
|-------|-------|
| Bug ID | DEF-SD-009 |
| Title | El carrito de un usuario es visible para el siguiente usuario del mismo navegador |
| Severity | High |
| Priority | P1 |
| Status | Open |
| Assigned to | Unassigned |
| Module | CART - Carrito de compras |
| Submodule | CRT - Carrito |
| Environment | QA (`{QA_BASE_URL}` = https://www.saucedemo.com) |
| Browser | Chromium (Playwright 1.65.1) |
| Date reported | 2026-11-21 |
| ADO WI | N/A (Azure DevOps fuera de alcance) |
| Related TCs | TC-CART-CRT-012 |

---

## Known-issues check

| Field | Value |
|-------|-------|
| Source consulted | `qa/06-defects/` (open, resolved, disputed) y sección "Desviaciones observadas" de `01-business-rules.md` |
| Terms searched | síntoma descrito en "Actual Result" (usuario `standard_user -> visual_user`) |
| Matches found | Ninguno en `qa/06-defects/`; registrado como candidato DEF en la etapa 1/2 |
| Classification | New defect |
| Rule violated | RN-CART-011: El carrito está aislado por usuario: otro usuario que inicia sesión en el mismo navegador no ve el carrito del anterior. |

---

## Description

Con el usuario `standard_user -> visual_user` la aplicación incumple RN-CART-011. Confirmado en la ejecución automatizada de la etapa 5 (2026-11-21).

---

## Steps to Reproduce

| Step | Action |
|------|--------|
| 1 | Iniciar sesión con `standard_user` y agregar Backpack y Bike Light |
| 2 | Cerrar sesión desde el menú |
| 3 | En el mismo contexto iniciar sesión con `visual_user` y abrir el carrito |

Credenciales: usuario desde `QA_USER_*_USERNAME` y contraseña `<PLACEHOLDER>` (`QA_USER_PASSWORD`); en la suite la sesión sale del storageState de `global-setup.ts`.

---

## Expected Result

`shopping-cart-badge` no existe y `/cart.html` tiene 0 `.cart_item`.

---

## Actual Result

`visual_user` ve el badge "2" y los 2 productos de `standard_user`: `cart-contents` vive en `localStorage` sin asociarse al usuario y el logout no lo borra.

---

## Evidence

- Test: `qa/07-automation/e2e/tests/cart/cart-session.login.spec.ts` (TC-CART-CRT-012), marcado con `expectOpenDefect('DEF-SD-009', ...)`.
- Ejecución: `qa/05-test-execution/automated/` (resumen JSON y reporte de la etapa 5).
- Verificado con `DEFECTS_DIAG=1`: el test falla en la aserción de la regla, no por infraestructura.

---

## Root Cause Analysis

Comportamiento intencional del usuario de demostración `standard_user -> visual_user` en saucedemo; causa interna no visible (frontend sin código fuente disponible).

---

## Fix Suggestion

Asociar el carrito al usuario (clave por usuario) o borrarlo en el logout.

---

## Impact on Automation

| TC ID | Current test state | Impact |
|-------|-------------------|--------|
| TC-CART-CRT-012 | `expectOpenDefect()` (expected failure, `test.fail`) | La ejecución queda verde mientras el defecto se reproduce; pasa a rojo con "no longer reproduces" cuando se corrija |

---

## Reactivation Instructions

Cuando el defecto se corrija:
1. Verificar el nuevo comportamiento contra RN-CART-011.
2. Quitar `expectOpenDefect()` de TC-CART-CRT-012 en `tests/cart/cart-session.login.spec.ts` y dejar las aserciones como test normal.
3. Ejecutar el test al menos 2 veces para confirmar estabilidad.
4. Mover este archivo a `qa/06-defects/resolved/`.

---

## Changelog

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Defecto confirmado en la etapa 5 y reportado |
