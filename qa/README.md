# QA - saucedemo

> Framework: `@keber/qa-framework` v1.14.0-rc.9
> Language: es | Base URL: `{{QA_BASE_URL}}`
> Azure DevOps: fuera de alcance en este proyecto

---

## Module Status

| Module | Submodule | TCs Total | TCs Automated | Plan | ADO Suite | Status | Last Run |
|---|---|---|---|---|---|---|---|
| Autenticación (AUTH) | Login y sesión (LOG) | 24 | 24 | ✅ | - | ✅ Sprint 1 cerrado (etapa 5b estable), tests: 31 pasan, 0 `test.fail` (DEF) | 2026-11-21 |
| Catálogo de productos (INV) | Listado y detalle (CAT) | 28 | 28 | ✅ | - | ✅ Sprint 1 cerrado (etapa 5b estable), tests: 20 pasan, 8 `test.fail` (DEF), 1 skip manual | 2026-11-21 |
| Catálogo de productos (INV) | Dynamic Catalog (DYN) | 13 | 13 | ✅ | - | ✅ Sprint 1 cerrado (etapa 5b estable), tests: 16 pasan, 0 `test.fail` (DEF) | 2026-11-21 |
| Carrito de compras (CART) | Carrito (CRT) | 19 | 19 | ✅ | - | ✅ Sprint 1 cerrado (etapa 5b estable), tests: 18 pasan, 2 `test.fail` (DEF) | 2026-11-21 |
| Checkout (CHK) | Flujo de compra (FLW) | 26 | 26 | ✅ | - | ✅ Sprint 1 cerrado (etapa 5b estable), tests: 23 pasan, 6 `test.fail` (DEF), 1 skip manual | 2026-11-21 |
| Navegación y menú (NAV) | Menú lateral, encabezado y footer (MENU) | 16 | 16 | ✅ | - | ✅ Sprint 1 cerrado (etapa 5b estable), tests: 14 pasan, 2 `test.fail` (DEF) | 2026-11-21 |

**Legend**: ✅ Done · ⚠️ Partial · 🔲 Not started · ⛔ Blocked

---

## Quick-Start Commands

```bash
# Run the whole suite (default project + opt-in login-flow)
cd qa/07-automation/e2e
npm run test:all

# Default suite only (no test types the real password) / login-flow only
npx playwright test
npm run test:login-flow

# Run a specific module
npx playwright test tests/{auth|inventory|cart|checkout|navigation}/

# Diagnose a test marked with expectOpenDefect (marker disabled)
DEFECTS_DIAG=1 npx playwright test tests/checkout/checkout-flow.spec.ts

# Versionable summary of the last run
node scripts/summarize-results.js results/results.json results/summary.json

# Run with UI (debug mode)
npx playwright test --ui

# Generate HTML report
npx playwright show-report

# Re-run only failed tests
npx playwright test --last-failed
```

> Credenciales en `qa/07-automation/e2e/.env` (no versionado; copiar desde `.env.example`). Contraseña: `QA_USER_PASSWORD` = `<PLACEHOLDER>`.

---

## Active Blockers

| ID | Description | Affects | Opened | Status |
|---|---|---|---|---|
| - | Sin bloqueos activos. 18 defectos abiertos (DEF-SD-001 a 018) documentados con `expectOpenDefect`; DEF-SD-019 retirado (reclasificado como REC-SD-012); 13 recomendaciones (REC-SD-001 a 013). Ver `qa/06-defects/` | - | 2026-11-21 | Abierto |

---

## Last Run

| Suite | Date | Pass | Fail | Skip | CI Link |
|---|---|---|---|---|---|
| E2E | 2026-11-21 | 122 (+ 18 `test.fail` con DEF) | 0 | 2 | `qa/05-test-execution/automated/2026-11-21_16-47-57_sprint-1-etapa-5b/execution-report.md` |
| API | - | - | - | - | - |

> Update this table after each significant run. The CI Link can be an ADO TestRun URL, a
> GitHub Actions run URL, or a path to a local report file.

## Last Execution

| Date | Suite | Pass | Skip | Fail | Duration | Report |
|---|---|---|---|---|---|---|
| 2026-11-21 | E2E Sprint 1, cierre etapa 5b (142 tests, 126 TC) | 122 + 18 DEF | 2 | 0 | 4m 25s | `qa/05-test-execution/automated/2026-11-21_16-47-57_sprint-1-etapa-5b/` |
| 2026-11-21 | E2E Sprint 1, etapa 5 (142 tests, 126 TC) | 121 + 19 DEF | 2 | 0 | 2m 26s | `qa/05-test-execution/automated/2026-11-21_15-58-09_sprint-1-etapa-5/` |

## Flaky Tests

> Mark known flaky tests with this inline annotation directly in the table or spec file.
> Format: `[flaky] <test-id-or-name> - <root cause> - last seen <YYYY-MM-DD>`
>
> Example:
> `[flaky] TC-MOD-012 - timing issue on slow CI agents - last seen 2026-01-15`
>
> Remove the annotation once the test has been stable for 2+ consecutive CI runs.

Sin tests flaky activos. Etapa 5b (2026-11-21): 2 fallos intermitentes corregidos (FLK-SD-06 en TC-INV-DYN-012, FLK-SD-08 en TC-INV-DYN-004) y 1 margen preventivo (FLK-SD-07, `performance_glitch_user`); estables en las ejecuciones posteriores (420/420). Detalle en `qa/memory/e2e-stabilization-patterns.md`.

---

## Sprint History

<!-- Completed sprint checklists are moved here from AGENT-NEXT-STEPS.md -->
<!-- Format per sprint: -->
<!--
### Sprint N - {SPRINT_NAME} ({YYYY-MM-DD})

**Submodules**: {list}
**TCs automated**: {N} P0 + {M} P1
**Execution report**: `qa/05-test-execution/automated/{date-slug}.md`

Checklist (completed):
- [x] {Task 1}
- [x] {Task 2}
-->

### Sprint 1 - Cobertura inicial de saucedemo (2026-11-21)

**Submodules**: AUTH-LOG, INV-CAT, INV-DYN, CART-CRT, CHK-FLW, NAV-MENU
**TCs automated**: 126 TC (P0 17, P1 45, P2 37, P3 27) -> 142 tests Playwright
**Execution report**: `qa/05-test-execution/automated/2026-11-21_16-47-57_sprint-1-etapa-5b/execution-report.md`
**Stabilization report**: `qa/07-automation/STABILIZATION-REPORT-2026-11-21.md`
**Resultado final**: 122 passed, 18 `test.fail` con DEF (DEF-SD-001 a 018), 2 `test.skip` con `PENDING-CODE`, 0 fallos, 0 flaky. Estabilidad: 1538 de 1540 ejecuciones correctas en 6 ejecuciones completas (100 % tras los heals).

| Etapa | Comando | Rama | Estado |
|---|---|---|---|
| 1 - Análisis de módulos | `/qa-module-analysis` | `feature/stage-1-module-analysis` | ✅ Completada |
| 2 - Generación de especificaciones | `/qa-spec-generation` | `feature/stage-2-spec-generation` | ✅ Completada |
| 3 - Plan de pruebas | `/qa-test-plan` | `feature/stage-3-test-plan` | ✅ Completada |
| 4 - Casos de prueba | `/qa-test-cases` | `feature/stage-4-test-cases` | ✅ Completada |
| 5 - Automatización E2E | `/qa-automation` | `feature/stage-5-automation` | ✅ Completada |
| 5b - Estabilización | `/qa-test-stabilization` | `feature/stage-5b-healing` | ✅ Completada |

Checklist (completed):
- [x] Etapa 1: 6 archivos de especificación por submódulo en `qa/01-specifications/module-{auth,inventory,cart,checkout,navigation}/`
- [x] Etapa 2: especificaciones revisadas y aprobadas (sin `PENDING-CODE` en el alcance a automatizar). 126 TC en 6 submódulos, matriz de trazabilidad RN/FL -> TC en cada `05-test-scenarios.md`
- [x] Etapa 3: plan de pruebas del Sprint 1 en `qa/02-test-plans/sprints/Sprint-1/` (5 planes: AUTH 24, INV 41, CART 19, CHK 26, NAV 16 = 126 TC)
- [x] Etapa 4: steps de los 126 TC expandidos en los 5 planes + 2 TC independientes para el track `Ambos` en `qa/03-test-cases/`
- [x] Etapa 5: suites Playwright en `qa/07-automation/e2e/tests/` (126 TC -> 142 tests, 9 specs, 6 POM)
- [x] Etapa 5: defectos en `qa/06-defects/open/` para cada `test.fail()` y recomendaciones en `qa/06-defects/recommendations/`
- [x] Etapa 5b: 6 ejecuciones completas (repeat-each 3/2, 2 y 4 workers); 3 heals de automatización (FLK-SD-06, 07, 08) sin debilitar aserciones; REC-SD-013 nuevo
- [x] Etapa 5b: 18 DEF re-verificados con `DEFECTS_DIAG=1` (fallan por la regla); DEF-SD-019 reclasificado como REC-SD-012 y TC-AUTH-LOG-010 revisado (`[REVISED - 2026-11-21]`)
- [x] Etapa 5b: convención de IDs `DEF-SD-NNN` / `REC-SD-NNN` documentada en `qa/00-standards/naming-conventions.md`
- [x] Etapa 5b: cada TC en estado válido (regla 8): `test()` verde, `test.fail()` con DEF, o `test.skip()` con `PENDING-CODE`
- [x] Cierre: `qa/README.md` actualizado (estado de módulos y Sprint History) y `AGENT-NEXT-STEPS.md` recortado al Sprint 2

---

## Resources

| Resource | Link |
|---|---|
| QA Structure Guide | `qa/QA-STRUCTURE-GUIDE.md` |
| Naming Conventions | `qa/00-standards/naming-conventions.md` |
| Memory Index | `qa/memory/INDEX.md` |
| Agent Next Steps | `qa/AGENT-NEXT-STEPS.md` |
| Planes de pruebas Sprint 1 | `qa/02-test-plans/sprints/Sprint-1/` |
| Casos de prueba independientes (track `Ambos`) | `qa/03-test-cases/` |
| Automation Config | `qa/07-automation/e2e/playwright.config.ts` |
| Coverage Mapping | `qa/07-automation/e2e/tests/COVERAGE-MAPPING.md` |
| Defectos y recomendaciones | `qa/06-defects/open/`, `qa/06-defects/recommendations/` |
