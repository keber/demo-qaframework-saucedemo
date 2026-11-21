# Stabilization Report - saucedemo > Sprint 1 (todos los módulos)

**Date**: 2026-11-21  
**Sprint**: Sprint 1 - etapa 5b (`/qa-test-stabilization`)  
**Environment**: QA - `{QA_BASE_URL}` (https://www.saucedemo.com), Chromium (Playwright 1.65.1), Windows 11 local  
**Spec reference**: `qa/01-specifications/module-{auth,inventory,cart,checkout,navigation}/*/05-test-scenarios.md`  
**Ejecución oficial**: `qa/05-test-execution/automated/2026-11-21_16-47-57_sprint-1-etapa-5b/`

## Summary

| Metric | Value |
|--------|-------|
| Tests evaluated | 142 (126 TC) |
| Ejecuciones de la suite completa | 6 (R1-R6: 1540 ejecuciones de test, 1538 con el estado esperado) |
| Fallos intermitentes detectados | 2 (TC-INV-DYN-012 `visual_user`, TC-INV-DYN-004) + 1 riesgo de timeout sin fallo (`performance_glitch_user`) |
| Stabilized (✅ High confidence) | 122 en verde (incluye TC-AUTH-LOG-010 reclasificado) |
| Expected fail - App Bug (Category F, `test.fail` + DEF) | 18 (DEF-SD-001 a DEF-SD-018) |
| Skipped - Intentional (Category I, `PENDING-CODE`) | 2 (partes manuales de TC-INV-CAT-026 y TC-CHK-FLW-019) |
| Remaining low-confidence | 0 |
| Resultado oficial | 122 passed, 18 expected-fail, 0 failed, 2 skipped, 0 flaky |

## Test-by-Test Record

Solo los tests con cambios o hallazgos en esta etapa; el resto pasó 11/11 sin cambios (detalle por test en el `execution-report.md` de la ejecución oficial).

| TC-ID | Test title | Baseline | Final | Category | Changes made | Confidence |
|-------|-----------|----------|-------|----------|-------------|-----------|
| TC-INV-DYN-012 | Dynamic Catalog con usuarios no estándar (visual_user) | ⚠️ 2/3 en R1 | ✅ 8/8 | D - Fragile timing (origen: carrera de la app, REC-SD-013) | `HeaderMenu.open()` espera el panel cerrado asentado (`hidden`) antes del clic y verifica `not.toHaveAttribute('hidden')` tras abrir (FLK-SD-06) | ✅ High |
| TC-NAV-MENU-001 | Abrir y cerrar el menú lateral | ✅ pasa | ✅ pasa | D - preventivo | Misma espera antes del clic directo en el botón de menú; se agrega `expect(cross).toBeVisible()` | ✅ High |
| TC-INV-DYN-004 | Precios de Lazy Load iguales al catálogo | ⚠️ 1 fallo en R4 (24 nombres / 28 precios) | ✅ 3/3 + 5/5 dirigido | D - Fragile timing (lectura no atómica) | `DynamicCatalogPage.readLazyCards()` lee el par nombre/precio por tarjeta en un solo `evaluateAll` (FLK-SD-08) | ✅ High |
| TC-INV-CAT-027, TC-CHK-FLW-025, TC-INV-DYN-012 (`performance_glitch_user`) | Varios | ✅ pasa, hasta 26,6 s de 30 s con 4 workers | ✅ pasa con margen x3 | D - margen de tiempo | `testInfo.slow()` en `fixtures/base.ts` para `performance_glitch_user` (FLK-SD-07) | ✅ High |
| TC-AUTH-LOG-010 | Usuario bloqueado no puede iniciar sesión | 🐞 `test.fail` (DEF-SD-019) | ✅ pasa 11/11 | G - TC Mismatch | El resultado esperado exigía "sin cookie `session-username`", condición que RN-AUTH-005 no contiene. TC revisado `[REVISED - 2026-11-21]` en `05-test-scenarios.md` y en el plan AUTH; el test verifica la regla (mensaje, URL `/`, sin listado y `/inventory.html` sigue rechazado). DEF-SD-019 retirado -> REC-SD-012 | ✅ High |

## App Bugs Filed (Category F)

Sin defectos nuevos. Los 18 abiertos se re-verificaron con `DEFECTS_DIAG=1` en la suite oficial: todos fallan en la aserción de su regla de negocio, ninguno por infraestructura o selector.

| DEF-ID | TC-ID | Description | ADO WI |
|--------|-------|-------------|--------|
| DEF-SD-001 a DEF-SD-008 | TC-INV-CAT-019 a 026 | Comportamiento de `problem_user`, `error_user` y `visual_user` en el catálogo | N/A |
| DEF-SD-009, DEF-SD-010 | TC-CART-CRT-012, 013 | Carrito compartido entre usuarios; checkout con carrito vacío | N/A |
| DEF-SD-011 a DEF-SD-016 | TC-CHK-FLW-007, 015, 020, 022, 023, 024 | Validaciones y totales del checkout; `problem_user` / `error_user` | N/A |
| DEF-SD-017, DEF-SD-018 | TC-NAV-MENU-009, 014 | Reset App State no actualiza botones; About de `problem_user` | N/A |

## Spec Defects (Category G)

| TC-ID | Issue | Recommended 05-test-scenarios.md update |
|-------|-------|----------------------------------------|
| TC-AUTH-LOG-010 | El resultado esperado agregaba una condición (sin cookie) que ninguna regla respalda | Aplicado: `[REVISED - 2026-11-21]`; condición reemplazada por la verificación del rechazo del acceso |

## Recomendaciones nuevas

- REC-SD-012 (antes DEF-SD-019): el login rechazado de `locked_out_user` crea una cookie de sesión inerte.
- REC-SD-013: el menú lateral queda abierto pero invisible si se abre durante el primer medio segundo de la vista (carrera de react-burger-menu).

## Coverage Gaps (note only - do not fix in this stage)

- Ninguno: los 126 TC del Sprint 1 tienen test automatizado; las 2 partes manuales de los TC `Ambos` siguen como `test.skip()` con `PENDING-CODE` y procedimiento en `qa/03-test-cases/`.

## Decisions Log

- 2026-11-21: TC-INV-DYN-012 (`visual_user`) clasificado como Category D; causa confirmada con la traza (panel `aria-hidden="false"` + `hidden`) y con un script de diagnóstico (diagnóstico, no veredicto); heal verificado en la suite oficial.
- 2026-11-21: TC-INV-DYN-004 clasificado como Category D (lectura no atómica de una lista que sigue creciendo).
- 2026-11-21: tests de `performance_glitch_user` con `test.slow()` como margen preventivo; no se tocaron aserciones.
- 2026-11-21: DEF-SD-019 reclasificado como REC-SD-012 (regla 8: no incumple RN-AUTH-005); TC-AUTH-LOG-010 revisado.
- 2026-11-21: convención de IDs resuelta: `DEF-SD-NNN` / `REC-SD-NNN` (prefijo de proyecto, `defectIdPattern` = `DEF-{PREFIX}-{NUM}`); `qa/00-standards/naming-conventions.md` y los planes del Sprint 1 actualizados, sin renombrar archivos.
