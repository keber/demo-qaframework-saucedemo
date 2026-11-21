# Bug Report - DEF-SD-001: problem_user ve la imagen sl-404 en los 6 productos

| Field | Value |
|-------|-------|
| Bug ID | DEF-SD-001 |
| Title | problem_user ve la imagen sl-404 en los 6 productos |
| Severity | Low |
| Priority | P2 |
| Status | Open |
| Assigned to | Unassigned |
| Module | INV - Catálogo de productos |
| Submodule | CAT - Listado y detalle |
| Environment | QA (`{QA_BASE_URL}` = https://www.saucedemo.com) |
| Browser | Chromium (Playwright 1.65.1) |
| Date reported | 2026-11-21 |
| ADO WI | N/A (Azure DevOps fuera de alcance) |
| Related TCs | TC-INV-CAT-019 |

---

## Known-issues check

| Field | Value |
|-------|-------|
| Source consulted | `qa/06-defects/` (open, resolved, disputed) y sección "Desviaciones observadas" de `01-business-rules.md` |
| Terms searched | síntoma descrito en "Actual Result" (usuario `problem_user`) |
| Matches found | Ninguno en `qa/06-defects/`; registrado como candidato DEF en la etapa 1/2 |
| Classification | New defect |
| Rule violated | RN-INV-011: Cada producto muestra su propia imagen. |

---

## Description

Con el usuario `problem_user` la aplicación incumple RN-INV-011. Confirmado en la ejecución automatizada de la etapa 5 (2026-11-21).

---

## Steps to Reproduce

| Step | Action |
|------|--------|
| 1 | Abrir `/inventory.html` con la sesión de `problem_user` |
| 2 | Leer el atributo `src` de las 6 imágenes `inventory-item-{slug}-img` |

Credenciales: usuario desde `QA_USER_*_USERNAME` y contraseña `<PLACEHOLDER>` (`QA_USER_PASSWORD`); en la suite la sesión sale del storageState de `global-setup.ts`.

---

## Expected Result

Ningún `src` contiene `sl-404` y cada uno contiene el archivo de su producto (`sauce-backpack`, `bike-light`, `bolt-shirt`, `sauce-pullover`, `red-onesie`, `red-tatt`).

---

## Actual Result

Las 6 imágenes apuntan a `/assets/sl-404-*.jpg` (observado `/assets/sl-404-Cq1a9k9X.jpg`) (la misma imagen genérica para todos los productos).

---

## Evidence

- Test: `qa/07-automation/e2e/tests/inventory/catalog.spec.ts` (TC-INV-CAT-019), marcado con `expectOpenDefect('DEF-SD-001', ...)`.
- Ejecución: `qa/05-test-execution/automated/` (resumen JSON y reporte de la etapa 5).
- Verificado con `DEFECTS_DIAG=1`: el test falla en la aserción de la regla, no por infraestructura.

---

## Root Cause Analysis

Comportamiento intencional del usuario de demostración `problem_user` en saucedemo; causa interna no visible (frontend sin código fuente disponible).

---

## Fix Suggestion

Usar para `problem_user` la misma tabla de imágenes que para `standard_user`.

---

## Impact on Automation

| TC ID | Current test state | Impact |
|-------|-------------------|--------|
| TC-INV-CAT-019 | `expectOpenDefect()` (expected failure, `test.fail`) | La ejecución queda verde mientras el defecto se reproduce; pasa a rojo con "no longer reproduces" cuando se corrija |

---

## Reactivation Instructions

Cuando el defecto se corrija:
1. Verificar el nuevo comportamiento contra RN-INV-011.
2. Quitar `expectOpenDefect()` de TC-INV-CAT-019 en `tests/inventory/catalog.spec.ts` y dejar las aserciones como test normal.
3. Ejecutar el test al menos 2 veces para confirmar estabilidad.
4. Mover este archivo a `qa/06-defects/resolved/`.

---

## Changelog

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Defecto confirmado en la etapa 5 y reportado |
