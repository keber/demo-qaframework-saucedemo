# QA - saucedemo

> Framework: `@keber/qa-framework` v1.14.0-rc.9
> Language: es | Base URL: `{{QA_BASE_URL}}`
> Azure DevOps: fuera de alcance en este proyecto

---

## Module Status

| Module | Submodule | TCs Total | TCs Automated | Plan | ADO Suite | Status | Last Run |
|---|---|---|---|---|---|---|---|
| Autenticación (AUTH) | Login y sesión (LOG) | 24 | 24 | ✅ | - | ✅ Etapa 5 completada (automatización), tests: 30 pasan, 1 `test.fail` (DEF) | 2026-11-21 |
| Catálogo de productos (INV) | Listado y detalle (CAT) | 28 | 28 | ✅ | - | ✅ Etapa 5 completada (automatización), tests: 20 pasan, 8 `test.fail` (DEF), 1 skip manual | 2026-11-21 |
| Catálogo de productos (INV) | Dynamic Catalog (DYN) | 13 | 13 | ✅ | - | ✅ Etapa 5 completada (automatización), tests: 16 pasan, 0 `test.fail` (DEF) | 2026-11-21 |
| Carrito de compras (CART) | Carrito (CRT) | 19 | 19 | ✅ | - | ✅ Etapa 5 completada (automatización), tests: 18 pasan, 2 `test.fail` (DEF) | 2026-11-21 |
| Checkout (CHK) | Flujo de compra (FLW) | 26 | 26 | ✅ | - | ✅ Etapa 5 completada (automatización), tests: 23 pasan, 6 `test.fail` (DEF), 1 skip manual | 2026-11-21 |
| Navegación y menú (NAV) | Menú lateral, encabezado y footer (MENU) | 16 | 16 | ✅ | - | ✅ Etapa 5 completada (automatización), tests: 14 pasan, 2 `test.fail` (DEF) | 2026-11-21 |

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
| - | Sin bloqueos activos. 19 defectos abiertos (DEF-SD-001 a 019) documentados con `expectOpenDefect`; 11 recomendaciones (REC-SD-001 a 011). Ver `qa/06-defects/` | - | 2026-11-21 | Abierto |

---

## Last Run

| Suite | Date | Pass | Fail | Skip | CI Link |
|---|---|---|---|---|---|
| E2E | 2026-11-21 | 121 (+ 19 `test.fail` con DEF) | 0 | 2 | `qa/05-test-execution/automated/2026-11-21_15-58-09_sprint-1-etapa-5/execution-report.md` |
| API | - | - | - | - | - |

> Update this table after each significant run. The CI Link can be an ADO TestRun URL, a
> GitHub Actions run URL, or a path to a local report file.

## Last Execution

| Date | Suite | Pass | Skip | Fail | Duration | Report |
|---|---|---|---|---|---|---|
| 2026-11-21 | E2E Sprint 1 (142 tests, 126 TC) | 121 + 19 DEF | 2 | 0 | 2m 26s | `qa/05-test-execution/automated/2026-11-21_15-58-09_sprint-1-etapa-5/` |

## Flaky Tests

> Mark known flaky tests with this inline annotation directly in the table or spec file.
> Format: `[flaky] <test-id-or-name> - <root cause> - last seen <YYYY-MM-DD>`
>
> Example:
> `[flaky] TC-MOD-012 - timing issue on slow CI agents - last seen 2026-01-15`
>
> Remove the annotation once the test has been stable for 2+ consecutive CI runs.

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

_No sprints completed yet._

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
