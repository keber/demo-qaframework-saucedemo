# REC-SD-013: El menú lateral queda invisible si se abre durante el primer medio segundo de la vista

| Field | Value |
|-------|-------|
| ID | REC-SD-013 |
| Module | NAV |
| Category | Robustez / condición de carrera |
| Related TCs | TC-INV-DYN-012 (falla intermitente observada), cualquier TC que abra el menú lateral |
| Date | 2026-11-21 |
| Status | Open |

## Hallazgo

El componente del menú lateral (react-burger-menu) agrega el atributo `hidden` al panel cerrado `.bm-menu-wrap` mediante un temporizador que se dispara entre 0,3 y 0,8 s después de renderizar la vista. Si el clic en el botón de menú (`#react-burger-menu-btn`) coincide con ese temporizador, el panel queda en un estado inconsistente: `aria-hidden="false"` y a la vez `hidden="true"`. El menú no se ve, sus enlaces no son visibles y el usuario debe cerrar y volver a abrir el menú.

Evidencia (etapa 5b, 2026-11-21): 1 de 426 ejecuciones de la ejecución con `--repeat-each=3` (TC-INV-DYN-012, `visual_user`, repetición 1). La traza de Playwright muestra el clic en el botón a los ~500 ms del render y el panel con `aria-hidden="false"` y `hidden="true"` hasta el final del test. Un script de diagnóstico confirmó que el panel cerrado no tiene `hidden` a los 0-300 ms del render y sí a los 800 ms, para `standard_user` y `visual_user`.

## Por qué no es un defecto

RN-NAV-001 (`qa/01-specifications/module-navigation/submodule-menu/01-business-rules.md`) exige que el botón abra el panel (`aria-hidden="false"`, visible), y eso se cumple de forma determinista en el flujo de usuario a velocidad humana (TC-NAV-MENU-001 en verde en todas las ejecuciones): la falla solo aparece si el clic cae en una ventana de milisegundos justo después de cargar la vista, algo que ninguna regla de negocio ni ningún TC define. Se registra como riesgo latente, no como incumplimiento.

## Recomendación

En la aplicación: no aplicar el atributo `hidden` con un temporizador que pueda ejecutarse después de abrir el menú (cancelar el temporizador al abrir). En la suite: `HeaderMenu.open()` espera a que el panel cerrado tenga `hidden` antes de hacer clic y verifica después que el panel abierto no lo tenga (patrón FLK-SD-06 en `qa/memory/e2e-stabilization-patterns.md`).
