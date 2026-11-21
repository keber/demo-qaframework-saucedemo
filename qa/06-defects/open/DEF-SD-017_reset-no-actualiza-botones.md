# Bug Report - DEF-SD-017: Reset App State no actualiza los botones del listado hasta recargar

| Field | Value |
|-------|-------|
| Bug ID | DEF-SD-017 |
| Title | Reset App State no actualiza los botones del listado hasta recargar |
| Severity | Low |
| Priority | P2 |
| Status | Open |
| Assigned to | Unassigned |
| Module | NAV - Navegación y menú |
| Submodule | MENU - Menú lateral, encabezado y footer |
| Environment | QA (`{QA_BASE_URL}` = https://www.saucedemo.com) |
| Browser | Chromium (Playwright 1.65.1) |
| Date reported | 2026-11-21 |
| ADO WI | N/A (Azure DevOps fuera de alcance) |
| Related TCs | TC-NAV-MENU-009 |

---

## Known-issues check

| Field | Value |
|-------|-------|
| Source consulted | `qa/06-defects/` (open, resolved, disputed) y sección "Desviaciones observadas" de `01-business-rules.md` |
| Terms searched | síntoma descrito en "Actual Result" (usuario `standard_user`) |
| Matches found | Ninguno en `qa/06-defects/`; registrado como candidato DEF en la etapa 1/2 |
| Classification | New defect |
| Rule violated | RN-NAV-007: Tras Reset App State los botones del listado vuelven de inmediato a "Add to cart", consistentes con el carrito vacío. |

---

## Description

Con el usuario `standard_user` la aplicación incumple RN-NAV-007. Confirmado en la ejecución automatizada de la etapa 5 (2026-11-21).

---

## Steps to Reproduce

| Step | Action |
|------|--------|
| 1 | Abrir `/inventory.html` con `standard_user` y agregar Onesie |
| 2 | Abrir el menú y hacer clic en `reset-sidebar-link` |
| 3 | Sin recargar, leer el botón de Onesie |

Credenciales: usuario desde `QA_USER_*_USERNAME` y contraseña `<PLACEHOLDER>` (`QA_USER_PASSWORD`); en la suite la sesión sale del storageState de `global-setup.ts`.

---

## Expected Result

`add-to-cart-sauce-labs-onesie` visible con "Add to cart" y `remove-sauce-labs-onesie` no existe.

---

## Actual Result

El badge desaparece pero el botón de Onesie sigue en "Remove" hasta recargar la página.

---

## Evidence

- Test: `qa/07-automation/e2e/tests/navigation/menu.spec.ts` (TC-NAV-MENU-009), marcado con `expectOpenDefect('DEF-SD-017', ...)`.
- Ejecución: `qa/05-test-execution/automated/` (resumen JSON y reporte de la etapa 5).
- Verificado con `DEFECTS_DIAG=1`: el test falla en la aserción de la regla, no por infraestructura.

---

## Root Cause Analysis

Comportamiento intencional del usuario de demostración `standard_user` en saucedemo; causa interna no visible (frontend sin código fuente disponible).

---

## Fix Suggestion

Actualizar el estado de los botones del listado al ejecutar el reset.

---

## Impact on Automation

| TC ID | Current test state | Impact |
|-------|-------------------|--------|
| TC-NAV-MENU-009 | `expectOpenDefect()` (expected failure, `test.fail`) | La ejecución queda verde mientras el defecto se reproduce; pasa a rojo con "no longer reproduces" cuando se corrija |

---

## Reactivation Instructions

Cuando el defecto se corrija:
1. Verificar el nuevo comportamiento contra RN-NAV-007.
2. Quitar `expectOpenDefect()` de TC-NAV-MENU-009 en `tests/navigation/menu.spec.ts` y dejar las aserciones como test normal.
3. Ejecutar el test al menos 2 veces para confirmar estabilidad.
4. Mover este archivo a `qa/06-defects/resolved/`.

---

## Changelog

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Defecto confirmado en la etapa 5 y reportado |
