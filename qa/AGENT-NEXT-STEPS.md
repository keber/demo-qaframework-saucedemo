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
| 3 - Plan de pruebas | `/qa-test-plan` | `feature/stage-3-*` | 🔲 Pendiente |
| 4 - Casos de prueba | `/qa-test-cases` | `feature/stage-4-*` | 🔲 Pendiente |
| 5 - Automatización E2E | `/qa-automation` | `feature/stage-5-*` | 🔲 Pendiente |
| 5b - Estabilización | `/qa-test-stabilization` | `feature/stage-5b-*` | 🔲 Pendiente |

### Checklist del sprint

- [x] Etapa 1: 6 archivos de especificación por submódulo en `qa/01-specifications/module-{auth,inventory,cart,checkout,navigation}/`
- [x] Etapa 2: especificaciones revisadas y aprobadas (sin `PENDING-CODE` en el alcance a automatizar). 126 TC en 6 submódulos, matriz de trazabilidad RN/FL -> TC en cada `05-test-scenarios.md`, 0 TC `PENDING-BROWSER` (los 5 de la etapa 1 verificados en vivo)
- [ ] Etapa 3: plan de pruebas del Sprint 1 en `qa/02-test-plans/`
- [ ] Etapa 4: casos de prueba en `qa/03-test-cases/`
- [ ] Etapa 5: suites Playwright en `qa/07-automation/e2e/tests/{auth,inventory,cart,checkout,navigation}/`
- [ ] Etapa 5: defectos `DEF-*` en `qa/06-defects/open/` para cada `test.fail()` y `REC-*` en `qa/06-defects/recommendations/`
- [ ] Etapa 5b: cada TC en estado válido (`test()` verde, `test.fail()` con DEF, o `test.skip()` con `PENDING-CODE`)
- [ ] Cierre: actualizar `qa/README.md` (estado de módulos y Sprint History) y recortar este archivo

### Entradas clave para la etapa 3

- Matriz de trazabilidad y resumen por prioridad: sección "Matriz de trazabilidad" y "Summary" de cada `05-test-scenarios.md`
- TC nuevos o cambiados en la etapa 2: TC-INV-CAT-028 (nuevo, RN-INV-013), TC-AUTH-LOG-023, TC-CHK-FLW-026, TC-INV-DYN-010, 012, 013 (ahora `UI-OBSERVED`)
- Reglas nuevas en la etapa 2: RN-AUTH-012 (ayuda de credenciales), RN-INV-021 (Dynamic Catalog igual para todos los usuarios)
- TC-CHK-FLW-026 necesita un parser de PDF como devDependency en la etapa 5

### Entradas de la etapa 2 (referencia)

- Hallazgos de comportamiento por usuario: `qa/memory/saucedemo-app-behavior.md`
- Candidatos a defecto detectados en la etapa 1 (a confirmar y documentar en la etapa 5): ver la sección "Desviaciones observadas" de cada `01-business-rules.md`
