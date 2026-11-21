# AGENT-NEXT-STEPS - Sprint activo

> Este archivo contiene solo el sprint activo (regla 9 de `.claude/rules/qa-framework.md`).
> Al cerrar el sprint, mover el checklist a `## Sprint History` de `qa/README.md` y dejar aquí solo el siguiente.

## Estado de la instalación (completado)

- [x] Framework `@keber/qa-framework` instalado y estructura `qa/` generada
- [x] Módulos configurados en `qa/qa-framework.config.json` (AUTH, INV, CART, CHK, NAV)
- [x] `qa/07-automation/e2e/.env` creado (no versionado); credenciales solo por variables de entorno
- [x] Dependencias E2E instaladas (`npm install` + `npx playwright install chromium` en `qa/07-automation/e2e`)
- Fuera de alcance: Azure DevOps (`integrations.azureDevOps.enabled: false`), k6 y track de API
- No se crea `AGENTS.md` en este proyecto

## Sprint 1 - Cobertura inicial de saucedemo (etapas 1 a 5b)

Aplicación bajo prueba: `{{QA_BASE_URL}}` (Swag Labs). Un submódulo por módulo.

| Etapa | Comando | Rama | Estado |
|---|---|---|---|
| 1 - Análisis de módulos | `/qa-module-analysis` | `feature/stage-1-module-analysis` | ✅ Completada |
| 2 - Generación de especificaciones | `/qa-spec-generation` | `feature/stage-2-spec-generation` | ✅ Completada |
| 3 - Plan de pruebas | `/qa-test-plan` | `feature/stage-3-test-plan` | ✅ Completada |
| 4 - Casos de prueba | `/qa-test-cases` | `feature/stage-4-test-cases` | ✅ Completada |
| 5 - Automatización E2E | `/qa-automation` | `feature/stage-5-automation` | ✅ Completada |
| 5b - Estabilización | `/qa-test-stabilization` | `feature/stage-5b-*` | 🔲 Pendiente |

### Checklist del sprint

- [x] Etapa 1: 6 archivos de especificación por submódulo en `qa/01-specifications/module-{auth,inventory,cart,checkout,navigation}/`
- [x] Etapa 2: especificaciones revisadas y aprobadas (sin `PENDING-CODE` en el alcance a automatizar). 126 TC en 6 submódulos, matriz de trazabilidad RN/FL -> TC en cada `05-test-scenarios.md`, 0 TC `PENDING-BROWSER` (los 5 de la etapa 1 verificados en vivo)
- [x] Etapa 3: plan de pruebas del Sprint 1 en `qa/02-test-plans/sprints/Sprint-1/` (5 planes, uno por módulo: AUTH 24, INV 41, CART 19, CHK 26, NAV 16 = 126 TC; P0 17, P1 45, P2 37, P3 27; 124 `Automatizado` + 2 `Ambos`)
- [x] Etapa 4: steps de los 126 TC expandidos en la sección 9 de los 5 planes (acciones, datos, selectores `data-test` y resultados medibles; IDs sin cambios) + 2 TC independientes para el track `Ambos` en `qa/03-test-cases/` (TC-INV-CAT-026, TC-CHK-FLW-019)
- [x] Etapa 5: suites Playwright en `qa/07-automation/e2e/tests/{auth,inventory,cart,checkout,navigation}/` (126 TC -> 142 tests: 9 specs, 6 POM en `page-objects/`; `npx tsc --noEmit` limpio)
- [x] Etapa 5: defectos `DEF-*` en `qa/06-defects/open/` para cada `test.fail()` y `REC-*` en `qa/06-defects/recommendations/` (DEF-SD-001 a DEF-SD-019, REC-SD-001 a REC-SD-011)
- [ ] Etapa 5b: cada TC en estado válido (`test()` verde, `test.fail()` con DEF, o `test.skip()` con `PENDING-CODE`)
- [ ] Cierre: actualizar `qa/README.md` (estado de módulos y Sprint History) y recortar este archivo

### Resultado de la etapa 5 (entrada de la etapa 5b)

- Ejecución oficial: `qa/05-test-execution/automated/2026-11-21_15-58-09_sprint-1-etapa-5/` (`results-summary.json` + `execution-report.md`). Totales: 142 tests de 126 TC: 121 passed, 19 expected-fail (`test.fail` + DEF), 0 failed, 2 skipped (`PENDING-CODE`), 0 flaky; duración 2m 26s.
- Comando: `cd qa/07-automation/e2e && npm run test:all` (suite por defecto + proyecto opt-in `login-flow`; los `*.login.spec.ts` escriben la contraseña real y no graban trazas). Resumen: `node scripts/summarize-results.js results/results.json <salida>`.
- Sesiones: `global-setup.ts` guarda un storageState por persona (`.auth/user-default.json` = standard_user y `.auth/<persona>.json`); `fixtures/base.ts` lo renueva en un proceso hijo cuando a la cookie le quedan menos de 150 s (vence a los 600 s). Elegir persona con `test.use({ qaUser })`.
- 19 TC con `expectOpenDefect` (DEF-SD-001 a 019). Los 18 candidatos de las etapas 1 y 2 se confirmaron; TC-NAV-MENU-015 NO se confirmó (sin `pageerror` en Reset App State de error_user; queda como test normal y REC-SD-011 por el 404 de rutas profundas). DEF-SD-019 es nuevo: el login rechazado de `locked_out_user` crea la cookie `session-username` (TC-AUTH-LOG-010, RN-AUTH-005); revisar con el responsable de la especificación si se mantiene como DEF o se reclasifica a REC.
- 2 `test.skip()` con `PENDING-CODE`: las partes manuales de los TC `Ambos` (TC-INV-CAT-026 y TC-CHK-FLW-019); sus capturas y el PDF quedan adjuntos en el reporte HTML del test automatizado.
- Fallos de automatización corregidos durante la etapa 5 (detalle en `qa/memory/e2e-stabilization-patterns.md`, FLK-SD-01 a 05): espera del render de performance_glitch_user (TC-AUTH-LOG-019/020), elipsis U+2026 del placeholder (TC-INV-DYN-002), parser de PDF (TC-CHK-FLW-026, `pdf-parse` -> `pdfjs-dist`), errores de consola del deep link (TC-NAV-MENU-015).
- Pendientes para la etapa 5b: ninguno: 0 fallos inesperados en la ejecución oficial. La etapa 5b debe confirmar la estabilidad (2 ejecuciones consecutivas más) y cerrar el sprint.
- Desviación de nomenclatura: los defectos usan `DEF-SD-NNN` / `REC-SD-NNN` (instrucción de la etapa) y no `DEF-{MODULE}-NNN` como indica `qa/00-standards/naming-conventions.md`; decidir antes del cierre si se renombran.

### Entradas de la etapa 2 (referencia)

- Hallazgos de comportamiento por usuario: `qa/memory/saucedemo-app-behavior.md`
- Candidatos a defecto detectados en la etapa 1 (a confirmar y documentar en la etapa 5): ver la sección "Desviaciones observadas" de cada `01-business-rules.md`
