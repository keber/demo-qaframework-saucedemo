# Bug Report - DEF-SD-019: El login rechazado de locked_out_user crea igualmente la cookie de sesión

| Field | Value |
|-------|-------|
| Bug ID | DEF-SD-019 |
| Title | El login rechazado de locked_out_user crea igualmente la cookie de sesión |
| Severity | Low |
| Priority | P2 |
| Status | Open |
| Assigned to | Unassigned |
| Module | AUTH - Autenticación |
| Submodule | LOG - Login y sesión |
| Environment | QA (`{QA_BASE_URL}` = https://www.saucedemo.com) |
| Browser | Chromium (Playwright 1.65.1) |
| Date reported | 2026-11-21 |
| ADO WI | N/A (Azure DevOps fuera de alcance) |
| Related TCs | TC-AUTH-LOG-010 |

---

## Known-issues check

| Field | Value |
|-------|-------|
| Source consulted | `qa/06-defects/` (open, resolved, disputed) y sección "Desviaciones observadas" de `01-business-rules.md` |
| Terms searched | síntoma descrito en "Actual Result" (usuario `locked_out_user`) |
| Matches found | Ninguno en `qa/06-defects/` ni en las desviaciones de las etapas 1 y 2: hallazgo nuevo de la etapa 5 |
| Classification | New defect |
| Rule violated | RN-AUTH-005: Login con `locked_out_user` y la contraseña correcta: se rechaza el acceso y el usuario permanece en `/` (el resultado esperado aprobado de TC-AUTH-LOG-010 exige además que no exista la cookie `session-username`). |

---

## Description

Con el usuario `locked_out_user` la aplicación incumple RN-AUTH-005. Confirmado en la ejecución automatizada de la etapa 5 (2026-11-21).

---

## Steps to Reproduce

| Step | Action |
|------|--------|
| 1 | Abrir un contexto nuevo sin cookies y navegar a `/` |
| 2 | Ingresar el usuario de `QA_USER_LOCKED_OUT_USER_USERNAME` y la contraseña `<PLACEHOLDER>` |
| 3 | Hacer clic en `login-button` y leer las cookies con `context.cookies()` |

Credenciales: usuario desde `QA_USER_*_USERNAME` y contraseña `<PLACEHOLDER>` (`QA_USER_PASSWORD`); en la suite la sesión sale del storageState de `global-setup.ts`.

---

## Expected Result

`error` = "Epic sadface: Sorry, this user has been locked out.", la URL sigue en `/`, `inventory-list` no existe y no existe la cookie `session-username`.

---

## Actual Result

Mensaje, URL y ausencia del listado son correctos, pero se crea la cookie `session-username` = `locked_out_user` (expira a los 600 s). La cookie no da acceso: TC-AUTH-LOG-022 confirma que `/inventory.html` la rechaza. Si el responsable de la especificación decide que la cookie inerte no incumple RN-AUTH-005, reclasificar como REC y ajustar el TC en la especificación (no en el test).

---

## Evidence

- Test: `qa/07-automation/e2e/tests/auth/login.login.spec.ts` (TC-AUTH-LOG-010), marcado con `expectOpenDefect('DEF-SD-019', ...)`.
- Ejecución: `qa/05-test-execution/automated/` (resumen JSON y reporte de la etapa 5).
- Verificado con `DEFECTS_DIAG=1`: el test falla en la aserción de la regla, no por infraestructura.

---

## Root Cause Analysis

La SPA escribe la cookie `session-username` antes de validar si el usuario está bloqueado; causa interna no visible (frontend sin código fuente disponible).

---

## Fix Suggestion

No crear la cookie de sesión cuando el login es rechazado.

---

## Impact on Automation

| TC ID | Current test state | Impact |
|-------|-------------------|--------|
| TC-AUTH-LOG-010 | `expectOpenDefect()` (expected failure, `test.fail`) | La ejecución queda verde mientras el defecto se reproduce; pasa a rojo con "no longer reproduces" cuando se corrija |

---

## Reactivation Instructions

Cuando el defecto se corrija:
1. Verificar el nuevo comportamiento contra RN-AUTH-005.
2. Quitar `expectOpenDefect()` de TC-AUTH-LOG-010 en `tests/auth/login.login.spec.ts` y dejar las aserciones como test normal.
3. Ejecutar el test al menos 2 veces para confirmar estabilidad.
4. Mover este archivo a `qa/06-defects/resolved/`.

---

## Changelog

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | 2026-11-21 | Defecto confirmado en la etapa 5 y reportado |
