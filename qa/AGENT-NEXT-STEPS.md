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
| 4 - Casos de prueba | `/qa-test-cases` | `feature/stage-4-*` | 🔲 Pendiente |
| 5 - Automatización E2E | `/qa-automation` | `feature/stage-5-*` | 🔲 Pendiente |
| 5b - Estabilización | `/qa-test-stabilization` | `feature/stage-5b-*` | 🔲 Pendiente |

### Checklist del sprint

- [x] Etapa 1: 6 archivos de especificación por submódulo en `qa/01-specifications/module-{auth,inventory,cart,checkout,navigation}/`
- [x] Etapa 2: especificaciones revisadas y aprobadas (sin `PENDING-CODE` en el alcance a automatizar). 126 TC en 6 submódulos, matriz de trazabilidad RN/FL -> TC en cada `05-test-scenarios.md`, 0 TC `PENDING-BROWSER` (los 5 de la etapa 1 verificados en vivo)
- [x] Etapa 3: plan de pruebas del Sprint 1 en `qa/02-test-plans/sprints/Sprint-1/` (5 planes, uno por módulo: AUTH 24, INV 41, CART 19, CHK 26, NAV 16 = 126 TC; P0 17, P1 45, P2 37, P3 27; 124 `Automatizado` + 2 `Ambos`)
- [ ] Etapa 4: casos de prueba en `qa/03-test-cases/`
- [ ] Etapa 5: suites Playwright en `qa/07-automation/e2e/tests/{auth,inventory,cart,checkout,navigation}/`
- [ ] Etapa 5: defectos `DEF-*` en `qa/06-defects/open/` para cada `test.fail()` y `REC-*` en `qa/06-defects/recommendations/`
- [ ] Etapa 5b: cada TC en estado válido (`test()` verde, `test.fail()` con DEF, o `test.skip()` con `PENDING-CODE`)
- [ ] Cierre: actualizar `qa/README.md` (estado de módulos y Sprint History) y recortar este archivo

### Entradas clave para la etapa 4

- Planes de pruebas: `qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-saucedemo-Sprint-1-{AUTH,INV,CART,CHK,NAV}.md` (sección 9 "Tabla de Pruebas" con steps, resultado esperado, tipo y prioridad)
- 2 TC `Ambos` (parte manual): TC-INV-CAT-026 (comparación visual por screenshot de visual_user) y TC-CHK-FLW-019 (revisión visual del PDF). Las tablas "Summary" de los `05-test-scenarios.md` de catálogo y checkout los cuentan como automatizados aunque su campo Automation es `Partial`
- 18 candidatos DEF marcados en las tablas (INV 8, CART 2, CHK 6, NAV 2), más TC-NAV-MENU-015 a confirmar: se automatizan con la aserción de la regla y `test.fail()` + DEF solo si se confirman en la etapa 5
- TC-CHK-FLW-026 necesita un parser de PDF como devDependency en la etapa 5

### Entradas de la etapa 2 (referencia)

- Hallazgos de comportamiento por usuario: `qa/memory/saucedemo-app-behavior.md`
- Candidatos a defecto detectados en la etapa 1 (a confirmar y documentar en la etapa 5): ver la sección "Desviaciones observadas" de cada `01-business-rules.md`
