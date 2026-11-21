# QA - saucedemo

> Framework: `@keber/qa-framework` v1.14.0-rc.9
> Language: es | Base URL: `{{QA_BASE_URL}}`
> Azure DevOps: fuera de alcance en este proyecto

---

## Module Status

| Module | Submodule | TCs Total | TCs Automated | Plan | ADO Suite | Status | Last Run |
|---|---|---|---|---|---|---|---|
| Autenticación (AUTH) | Login y sesión (LOG) | 24 | - | ✅ | - | ⚠️ Etapa 3 completada (plan de pruebas) | - |
| Catálogo de productos (INV) | Listado y detalle (CAT) | 28 | - | ✅ | - | ⚠️ Etapa 3 completada (plan de pruebas) | - |
| Catálogo de productos (INV) | Dynamic Catalog (DYN) | 13 | - | ✅ | - | ⚠️ Etapa 3 completada (plan de pruebas) | - |
| Carrito de compras (CART) | Carrito (CRT) | 19 | - | ✅ | - | ⚠️ Etapa 3 completada (plan de pruebas) | - |
| Checkout (CHK) | Flujo de compra (FLW) | 26 | - | ✅ | - | ⚠️ Etapa 3 completada (plan de pruebas) | - |
| Navegación y menú (NAV) | Menú lateral, encabezado y footer (MENU) | 16 | - | ✅ | - | ⚠️ Etapa 3 completada (plan de pruebas) | - |

**Legend**: ✅ Done · ⚠️ Partial · 🔲 Not started · ⛔ Blocked

---

## Quick-Start Commands

```bash
# Run all automated tests
cd qa/07-automation
npx playwright test

# Run a specific module
npx playwright test tests/{module-folder}/

# Run with UI (debug mode)
npx playwright test --ui

# Generate HTML report
npx playwright show-report

# Re-run only failed tests
npx playwright test --last-failed
```

> Set credentials in `qa/07-automation/.env` (copy from `.env.example`).

---

## Active Blockers

| ID | Description | Affects | Opened | Status |
|---|---|---|---|---|
| - | Sin bloqueos activos. Defectos candidatos de las etapas 1 y 2 en la sección "Desviaciones observadas" de cada `01-business-rules.md` | - | - | - |

---

## Last Run

| Suite | Date | Pass | Fail | Skip | CI Link |
|---|---|---|---|---|---|
| E2E | - | - | - | - | - |
| API | - | - | - | - | - |

> Update this table after each significant run. The CI Link can be an ADO TestRun URL, a
> GitHub Actions run URL, or a path to a local report file.

## Last Execution

| Date | Suite | Pass | Skip | Fail | Duration | Report |
|---|---|---|---|---|---|---|
| - | - | - | - | - | - | - |

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
| Automation Config | `qa/07-automation/playwright.config.ts` |
