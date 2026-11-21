# AGENT-NEXT-STEPS - Sprint activo

> Este archivo contiene solo el sprint activo (regla 9 de `.claude/rules/qa-framework.md`).
> Al cerrar el sprint, mover el checklist a `## Sprint History` de `qa/README.md` y dejar aquí solo el siguiente.

## Estado de la instalación (completado)

- [x] Framework `@keber/qa-framework` instalado y estructura `qa/` generada
- [x] Módulos configurados en `qa/qa-framework.config.json` (AUTH, INV, CART, CHK, NAV)
- [x] `qa/07-automation/e2e/.env` creado (no versionado); credenciales solo por variables de entorno
- Fuera de alcance: Azure DevOps (`integrations.azureDevOps.enabled: false`), k6 y track de API
- No se crea `AGENTS.md` en este proyecto

## Sprint 1 - cerrado (2026-11-21)

Checklist completo y resultados en `qa/README.md` (sección `## Sprint History`).

## Sprint 2 - Mantenimiento y seguimiento (sin iniciar)

Aplicación bajo prueba: `{{QA_BASE_URL}}` (Swag Labs). Prerrequisito de la etapa 6: un cambio entregado en la aplicación o en las reglas de negocio.

### Checklist del sprint

- [ ] Revisar con el responsable de la especificación las recomendaciones abiertas REC-SD-001 a REC-SD-013 (en especial REC-SD-012 y REC-SD-013); si alguna pasa a ser regla de negocio, moverla a `qa/06-defects/open/` como `DEF-SD-NNN` nuevo y actualizar el TC (etapa 6, `/qa-maintenance`)
- [ ] Ante cada cambio entregado en saucedemo: ejecutar `cd qa/07-automation/e2e && npm run test:all`; un test con `expectOpenDefect` que pase ("no longer reproduces") indica que el defecto se corrigió: verificar contra la regla, mover el `DEF-SD-NNN` a `qa/06-defects/resolved/` y quitar el marcador
- [ ] Mantener la estabilidad: cualquier fallo intermitente nuevo se clasifica con `/qa-test-stabilization` y se registra como patrón `FLK-SD-NN` en `qa/memory/e2e-stabilization-patterns.md`
- [ ] Cierre: actualizar `qa/README.md` (estado de módulos y Sprint History) y recortar este archivo

### Entradas (referencia)

- Última ejecución oficial: `qa/05-test-execution/automated/` (carpeta `*_sprint-1-etapa-5b`)
- Reporte de estabilización: `qa/07-automation/STABILIZATION-REPORT-2026-11-21.md`
- Defectos abiertos: `qa/06-defects/open/` (DEF-SD-001 a DEF-SD-018; DEF-SD-019 retirado -> REC-SD-012)
