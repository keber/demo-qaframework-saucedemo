# Memory Index - saucedemo

> The agent reads this file first before loading any memory file.
> Add a row here whenever you create or update a file in this directory.

| File | Topic | When to load |
|---|---|---|
| `ci-pipeline-findings.md` | CI pipeline issues, root causes, applied fixes, failure triage categories | Diagnosing CI failures; reviewing pipeline changes |
| `e2e-stabilization-patterns.md` | Flakiness patterns, crash-recovery techniques, strict-mode conflicts, reference timeouts; saucedemo: renovación de sesión por TTL, sesiones por persona, patrones FLK-SD-01 a 05 (etapa 5) y FLK-SD-06 a 08 (etapa 5b: carrera del menú lateral, test.slow() de performance_glitch_user, lectura atómica de Lazy Load) | Investigating intermittent failures; refactoring fragile specs |
| `data-volatility-strategies.md` | Strategies for handling volatile test data (filter values, row counts, search inputs) | Fixing hardcoded-data failures; choosing an assertion resilience approach |
| `saucedemo-app-behavior.md` | Comportamiento por usuario (problem, error, visual, performance_glitch, locked_out), patrones de DOM de la SPA, estado en cookie/localStorage, ids y precios, impuesto 8 %, defectos candidatos; etapa 2: Dynamic Catalog por usuario, submenú, contenido del PDF, expiración de sesión; etapa 5: defectos confirmados, NAV-015 no reproducido, 404 de rutas profundas; etapa 5b: DEF-SD-019 -> REC-SD-012, carrera del menú (REC-SD-013), convención DEF-SD/REC-SD | Cualquier tarea de specs, automatización o estabilización de saucedemo |
