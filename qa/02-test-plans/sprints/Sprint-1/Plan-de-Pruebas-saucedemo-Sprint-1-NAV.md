# Plan de Pruebas - saucedemo - Sprint 1 - Navegación y menú

**Proyecto:** saucedemo (Swag Labs)
**Sprint:** 1
**Módulo:** Navegación y menú
**Código módulo:** NAV
**Submódulos:** Menú lateral, encabezado y footer (MENU)
**Fecha planificación:** 2026-11-21
**Ventana QA:** por definir (`sprintCycle` deshabilitado en `qa/qa-framework.config.json`)
**ADO Test Plan:** No aplica (integración con Azure DevOps fuera de alcance; `integrations.azureDevOps.enabled: false`)
**Fuente:** `qa/01-specifications/module-navigation/submodule-menu/05-test-scenarios.md` (etapa 2)

---

## 1. Objetivo

Verificar que el menú lateral (All Items, About, Logout, Reset App State), el encabezado y el footer cumplen las reglas RN-NAV-001 a RN-NAV-010 en todas las vistas internas.

## 2. Alcance

### En alcance

- Apertura y cierre del menú (botón y Escape), opciones y su orden
- Presencia de menú, carrito y footer en todas las vistas internas; logo del encabezado
- All Items, About (destino del enlace) y Logout desde el menú
- Reset App State: vaciado del carrito, botones del listado y estado del menú
- Enlaces sociales y copyright del footer; ausencia de menú en la página de login

Total en alcance: **16 TC** (todos los TC de `05-test-scenarios.md` del submódulo).

### Fuera de alcance

- Contenido del sitio externo de Sauce Labs (se asserta el `href`, no la página destino)
- Alcance no definido de Reset App State sobre el orden del listado (hallazgo REC)
- Apertura de About en la misma pestaña (hallazgo REC)
- Integración con Azure DevOps (Test Plans, Test Suites, Bugs): no aplica en este proyecto
- Pruebas de carga (k6) y track de API: la aplicación no expone API propia
- Navegadores distintos de Chromium (`integrations.playwright.browsers`)

## 3. Items del Sprint (normalizados)

Sin tareas ADO: los items del sprint son las reglas de negocio (RN) y los flujos (FL) especificados en la etapa 2. Los números de TC son el sufijo de `TC-{MODULO}-{SUB}-NNN`.

### Menú lateral, encabezado y footer (MENU)

| Item | Título | TC (spec) |
|---|---|---|
| RN-NAV-001 | Abrir y cerrar el menú lateral | 001, 002 |
| RN-NAV-002 | Menú disponible en todas las vistas internas | 004, 013, 016 |
| RN-NAV-003 | All Items | 005 |
| RN-NAV-004 | About | 006, 014 |
| RN-NAV-005 | Logout | 007 |
| RN-NAV-006 | Reset App State vacía el carrito | 008, 010, 015 |
| RN-NAV-007 | Reset App State actualiza los botones del catálogo | 009 |
| RN-NAV-008 | Enlaces sociales del footer | 011 |
| RN-NAV-009 | Texto de copyright | 012 |
| RN-NAV-010 | Opciones del menú | 003 |
| FL-NAV-001 | Navegar con el menú lateral | 001, 002, 003, 004, 005, 006, 007, 013, 014, 016 |
| FL-NAV-002 | Reiniciar el estado de la aplicación | 008, 009, 010, 015 |
| FL-NAV-003 | Enlaces del footer | 011, 012 |

## 4. Priorización

| Prioridad | Criterio | TC | Automatizado | Ambos | Manual |
|---|---|---|---|---|---|
| P0 | Happy path o riesgo bloqueante | 1 | 1 | 0 | 0 |
| P1 | Negativo común, transición de estado, acceso, regresión por usuario relevante | 3 | 3 | 0 | 0 |
| P2 | Funcionalidad secundaria o regresión adyacente | 5 | 5 | 0 | 0 |
| P3 | Caso borde, cosmético o de baja frecuencia | 7 | 7 | 0 | 0 |
| **Total** | | **16** | **16** | **0** | **0** |

Candidatos DEF conocidos de las etapas 1 y 2 en este módulo: **2** (TC-NAV-MENU-009, TC-NAV-MENU-014). Se ejecutan con la aserción de la regla; si la desviación se confirma, la etapa 5 los marca con `test.fail()` y crea el archivo `DEF-NAV-NNN` (regla 10).

## 5. TestSuites (agrupación funcional)

Agrupación por área funcional. Sin ADO, cada suite se corresponde con un bloque `test.describe()` en la etapa 5.

| Suite | TC | P0 | P1 | P2 | P3 | N (tabla) |
|---|---|---|---|---|---|---|
| Menú lateral y encabezado | 8 | 1 | 2 | 3 | 2 | 1-8 |
| Reset App State | 4 | 0 | 1 | 1 | 2 | 9-12 |
| Footer | 2 | 0 | 0 | 0 | 2 | 13-14 |
| Acceso y usuarios no estándar | 2 | 0 | 0 | 1 | 1 | 15-16 |

## 6. Precondiciones generales

### 6.1 Ambiente

| Elemento | Valor |
|---|---|
| Aplicación | Swag Labs, SPA React pública de Sauce Labs, sin API propia; estado en cookie `session-username` y `localStorage` (`cart-contents`) |
| URL base | `{QA_BASE_URL}` (variable `QA_BASE_URL`) |
| Ambiente | Único ambiente público (no hay ambientes QA/UAT separados) |
| Navegador | Chromium (Playwright), viewport de escritorio por defecto |
| Herramienta | `@playwright/test` en `qa/07-automation/e2e` |
| Timeouts de referencia | test 30 s, navegación 60 s, acción 10 s; reintentos 0 local / 2 CI |
| Variables | `qa/07-automation/e2e/.env` (no versionado) |

### 6.2 Matriz de usuarios de prueba

La aplicación no tiene roles de autorización: los 6 usuarios comparten permisos y difieren en su comportamiento intencional. Todos usan la contraseña `QA_USER_PASSWORD` (`<PLACEHOLDER>` en la documentación).

| Usuario | Variable de usuario | Comportamiento esperado | TC de este módulo que lo usan |
|---|---|---|---|
| standard_user | `QA_USER_STANDARD_USER_USERNAME` | Referencia funcional: todas las reglas deben cumplirse | 13 (MENU-001, MENU-002, MENU-003, MENU-004, MENU-005, MENU-006, MENU-007, MENU-008, MENU-009, MENU-010, MENU-011, MENU-012, MENU-013) |
| locked_out_user | `QA_USER_LOCKED_OUT_USER_USERNAME` | El login debe ser rechazado con el mensaje de usuario bloqueado | - |
| problem_user | `QA_USER_PROBLEM_USER_USERNAME` | Defectos funcionales intencionales en catálogo, checkout y menú | 1 (MENU-014) |
| performance_glitch_user | `QA_USER_PERFORMANCE_GLITCH_USER_USERNAME` | Demora intencional de ~5 s en el login; resto funcional | - |
| error_user | `QA_USER_ERROR_USER_USERNAME` | Errores JS intencionales al ordenar, agregar/quitar y finalizar | 1 (MENU-015) |
| visual_user | `QA_USER_VISUAL_USER_USERNAME` | Defectos visuales intencionales (precios del listado, imagen, posiciones) | - |

Los TC sin usuario explícito parten de un contexto sin sesión (acceso sin login) o usan credenciales inválidas generadas con `EXEC_IDX`.

### 6.3 Datos base

- Catálogo fijo de 6 productos (ids 0 a 5) con precios de referencia documentados en `04-test-data.md` de cada submódulo
- Carrito preparado por test: por la UI o con `localStorage.setItem('cart-contents', '[4,0]')` cuando el TC no valida la acción de agregar
- Datos de cliente ficticios para el checkout: nombre `QA-${EXEC_IDX}`, apellido `Pérez`, código postal `8320000`

### 6.4 Estrategia de prueba

- Nivel: pruebas E2E de interfaz sobre la aplicación desplegada; no hay pruebas de API ni unitarias (sin backend propio)
- Técnicas: partición de equivalencia (credenciales y campos obligatorios), transición de estados (carrito, sesión, pasos del checkout), pruebas por usuario contra las mismas reglas y regresión de vistas adyacentes
- Orden de ejecución: suite SMOKE (P0) primero; si falla un P0 de login o catálogo se detiene la ejecución del resto del módulo; luego P1, P2 y P3
- Aislamiento: contexto de navegador nuevo por test; sin dependencias de orden entre TC
- Polaridad: cada test asserta lo que exige la regla RN, no lo que hace la app (regla 10); las desviaciones se documentan con `test.fail()` + DEF y los hallazgos sin regla violada como REC
- Clasificación automatizado/manual: `Automatizado` si es determinista y observable desde el navegador; `Ambos` si una parte requiere inspección humana; `Manual` si no es automatizable

### 6.5 Criterios de entrada

- Especificaciones de la etapa 2 aprobadas: 6 archivos por submódulo y matriz de trazabilidad en `05-test-scenarios.md`
- 0 TC `PENDING-CODE`, `PENDING-BROWSER` o `BLOCKED-PERMISSIONS` en el alcance
- `{QA_BASE_URL}` accesible desde la máquina o el agente de CI
- `qa/07-automation/e2e/.env` con `QA_BASE_URL`, `QA_USER_PASSWORD` y las 6 variables `QA_USER_*_USERNAME`
- Dependencias instaladas (`npm install` y `npx playwright install chromium` en `qa/07-automation/e2e`)

### 6.6 Criterios de salida

- 100 % de los TC P0 y P1 ejecutados; P2 y P3 ejecutados o justificados
- Cada TC en uno de los tres estados válidos (regla 8): `test()` en verde, `test.fail()` con archivo `DEF-*` en `qa/06-defects/open/`, o `test.skip()` con `PENDING-CODE` e issue vinculado
- 0 tests fallando sin clasificar y 0 `test.fail()` sin archivo DEF
- Hallazgos sin regla violada registrados como `REC-*` en `qa/06-defects/recommendations/`
- `qa/README.md` actualizado (estado del módulo y última ejecución)

## 7. Datos mínimos sugeridos

| Dato | Fuente / variable | Uso |
|---|---|---|
| URL base | `{QA_BASE_URL}` | Navegación inicial |
| Contraseña común | `{QA_USER_PASSWORD}` (`<PLACEHOLDER>`) | Login de los 6 usuarios |
| Usuario standard_user | `{QA_USER_STANDARD_USER_USERNAME}` | Ver matriz 6.2 |
| Usuario locked_out_user | `{QA_USER_LOCKED_OUT_USER_USERNAME}` | Ver matriz 6.2 |
| Usuario problem_user | `{QA_USER_PROBLEM_USER_USERNAME}` | Ver matriz 6.2 |
| Usuario performance_glitch_user | `{QA_USER_PERFORMANCE_GLITCH_USER_USERNAME}` | Ver matriz 6.2 |
| Usuario error_user | `{QA_USER_ERROR_USER_USERNAME}` | Ver matriz 6.2 |
| Usuario visual_user | `{QA_USER_VISUAL_USER_USERNAME}` | Ver matriz 6.2 |
| Sufijo de ejecución | `EXEC_IDX` | Usuarios o contraseñas inválidos únicos, datos de cliente |
| Carrito estándar | `cart-contents` = `[4,0]` (Backpack $29.99 + Bike Light $9.99) | Setup de carrito y checkout |

## 8. Supuestos, faltantes críticos y riesgos

### Supuestos

- El sitio público mantiene durante el sprint el comportamiento observado en las etapas 1 y 2 (2026-11-21)
- Los usuarios de prueba y la contraseña publicada no cambian; si cambian, solo se actualiza `.env`
- Los comportamientos intencionales de los usuarios no estándar se tratan como defectos frente a la regla (candidatos DEF), no como comportamiento aceptado

### Faltantes críticos (TODO antes de ejecutar)

- [ ] Confirmar en la etapa 5 cada candidato DEF con evidencia antes de crear el archivo `DEF-*`
- [ ] Confirmar el efecto visible de Reset App State con `error_user` (TC-NAV-MENU-015)
- [ ] Definir la ventana QA del sprint (no hay ciclo de sprint configurado)

### Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Sitio público de terceros: caídas, latencia o cambios sin aviso | Alto | Reintentos solo en CI (2); diagnosticar con trazas antes de modificar asserts |
| Telemetría de terceros (`backtrace.io`) en la red | Bajo | No asertar tráfico de red de terceros |
| About y los enlaces sociales apuntan a sitios externos fuera de control del proyecto | Media | Asertar el `href` en lugar de navegar al sitio externo (TC-NAV-MENU-006, 011, 014) |
| Animación del menú lateral: clics antes de que termine la transición | Baja | Esperar la visibilidad de los enlaces del menú antes de interactuar |
| Efecto visible de Reset App State con `error_user` no concluyente en la etapa 1 | Media | TC-NAV-MENU-015 registra los errores de consola y confirma el efecto en la etapa 5 |

## 9. Tabla de Pruebas

Etiquetas: `[SMOKE]` happy path P0, `[CONFIRMACION]` confirma una regla RN, `[REGRESION]` comportamiento por usuario o vista adyacente. `Confirma` = `N/A` en todas las filas (sin tareas ADO); la regla cubierta se indica en la descripción y en la sección 10.

| N | TC-ID | Suite / Área Funcional | Título | Descripción | Steps | Resultado Esperado | Confirma | Tipo | Prioridad |
|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-NAV-MENU-001 | Menú lateral y encabezado | [CONFIRMACION][P1] Abrir y cerrar el menú lateral | Valida RN-NAV-001. Escenario: Abrir y cerrar el menú lateral. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Hacer clic en `#react-burger-menu-btn`<br>3) Hacer clic en `#react-burger-cross-btn` | `.bm-menu-wrap` pasa a `aria-hidden="false"` y luego a `"true"` | N/A | Automatizado | P1 |
| 2 | TC-NAV-MENU-002 | Menú lateral y encabezado | [CONFIRMACION][P3] Cerrar el menú con Escape | Valida RN-NAV-001. Escenario: Cerrar el menú con Escape. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Hacer clic en `#react-burger-menu-btn` para abrir el menú lateral<br>3) Presionar Escape | `.bm-menu-wrap` con `aria-hidden="true"` | N/A | Automatizado | P3 |
| 3 | TC-NAV-MENU-003 | Menú lateral y encabezado | [CONFIRMACION][P2] Opciones del menú y su orden | Valida RN-NAV-010. Escenario: Opciones del menú y su orden. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Hacer clic en `#react-burger-menu-btn` para abrir el menú lateral<br>3) Leer los enlaces del menú | "All Items", "Dynamic Catalog", "About", "Logout", "Reset App State" en ese orden | N/A | Automatizado | P2 |
| 4 | TC-NAV-MENU-004 | Menú lateral y encabezado | [CONFIRMACION][P2] Menú, carrito y footer en todas las vistas internas | Valida RN-NAV-002. Escenario: Menú, carrito y footer en todas las vistas internas. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Navegar a listado, detalle, carrito y los 3 pasos de checkout | En cada vista existen `#react-burger-menu-btn`, `shopping-cart-link` y `footer` | N/A | Automatizado | P2 |
| 5 | TC-NAV-MENU-005 | Menú lateral y encabezado | [CONFIRMACION][P1] All Items desde el carrito | Valida RN-NAV-003. Escenario: All Items desde el carrito. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Navegar a `/cart.html`<br>3) Abrir el menú<br>4) Hacer clic en `inventory-sidebar-link` | URL `/inventory.html` | N/A | Automatizado | P1 |
| 6 | TC-NAV-MENU-006 | Menú lateral y encabezado | [CONFIRMACION][P2] About lleva al sitio de Sauce Labs | Valida RN-NAV-004. Escenario: About lleva al sitio de Sauce Labs. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Hacer clic en `#react-burger-menu-btn` para abrir el menú lateral<br>3) Verificar `href` de `about-sidebar-link`<br>4) Hacer clic en About | `href` = `https://saucelabs.com/` y la pestaña navega a saucelabs.com | N/A | Automatizado | P2 |
| 7 | TC-NAV-MENU-007 | Menú lateral y encabezado | [SMOKE][P0] Logout desde el menú | Valida RN-NAV-005, RN-AUTH-009. Escenario: Logout desde el menú. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Abrir el menú<br>3) Hacer clic en `logout-sidebar-link` | URL `/` con el formulario de login | N/A | Automatizado | P0 |
| 8 | TC-NAV-MENU-013 | Menú lateral y encabezado | [CONFIRMACION][P3] Logo del encabezado | Valida RN-NAV-002. Escenario: Logo del encabezado. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Leer `.app_logo` | Texto "Swag Labs" | N/A | Automatizado | P3 |
| 9 | TC-NAV-MENU-008 | Reset App State | [CONFIRMACION][P1] Reset App State vacía el carrito | Valida RN-NAV-006. Escenario: Reset App State vacía el carrito. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar 2 productos al carrito desde el listado (Backpack y Bike Light)<br>3) Abrir el menú<br>4) Hacer clic en `reset-sidebar-link` | Badge ausente y `cart-contents` eliminado | N/A | Automatizado | P1 |
| 10 | TC-NAV-MENU-009 | Reset App State | [REGRESION][P2] Reset App State actualiza los botones del listado | Valida RN-NAV-007. Escenario: Reset App State actualiza los botones del listado. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar Onesie al carrito desde `/inventory.html`<br>3) Abrir el menú<br>4) Hacer clic en `reset-sidebar-link`<br>5) Sin recargar, leer el botón de Onesie | El botón es `add-to-cart-sauce-labs-onesie` "Add to cart" | N/A | Automatizado | P2 |
| 11 | TC-NAV-MENU-010 | Reset App State | [CONFIRMACION][P3] El menú queda abierto tras Reset App State | Valida RN-NAV-006. Escenario: El menú queda abierto tras Reset App State. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Hacer clic en `#react-burger-menu-btn` para abrir el menú lateral<br>3) Hacer clic en `reset-sidebar-link` | `.bm-menu-wrap` sigue con `aria-hidden="false"` | N/A | Automatizado | P3 |
| 12 | TC-NAV-MENU-015 | Reset App State | [REGRESION][P3] error_user: Reset App State sin errores | Valida RN-NAV-006. Escenario: error_user: Reset App State sin errores. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_ERROR_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar 1 producto al carrito desde el listado (Backpack)<br>3) Registrar listener de `pageerror` y `console`<br>4) Abrir el menú<br>5) Hacer clic en `reset-sidebar-link` | Badge ausente, `cart-contents` eliminado y sin errores JS | N/A | Automatizado | P3 |
| 13 | TC-NAV-MENU-011 | Footer | [CONFIRMACION][P3] Enlaces sociales del footer | Valida RN-NAV-008. Escenario: Enlaces sociales del footer. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Leer `href` y `target` de `social-x`, `social-facebook`, `social-linkedin` | https://x.com/saucelabs, https://www.facebook.com/saucelabs, https://www.linkedin.com/company/sauce-labs/ y `target="_blank"` en los tres | N/A | Automatizado | P3 |
| 14 | TC-NAV-MENU-012 | Footer | [CONFIRMACION][P3] Texto de copyright del footer | Valida RN-NAV-009. Escenario: Texto de copyright del footer. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Leer `footer-copy` | "© {año en curso} Sauce Labs. All Rights Reserved. Terms of Service \| Privacy Policy" | N/A | Automatizado | P3 |
| 15 | TC-NAV-MENU-014 | Acceso y usuarios no estándar | [REGRESION][P2] problem_user: About apunta al sitio correcto | Valida RN-NAV-004. Escenario: problem_user: About apunta al sitio correcto. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_PROBLEM_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Hacer clic en `#react-burger-menu-btn` para abrir el menú lateral<br>3) Leer `href` de `about-sidebar-link` | `href` = `https://saucelabs.com/` | N/A | Automatizado | P2 |
| 16 | TC-NAV-MENU-016 | Acceso y usuarios no estándar | [CONFIRMACION][P3] La página de login no muestra menú ni carrito | Valida RN-NAV-002. Escenario: La página de login no muestra menú ni carrito. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Abrir `{QA_BASE_URL}/` | No existen `#react-burger-menu-btn` ni `shopping-cart-link` | N/A | Automatizado | P3 |

## 10. Matriz de Trazabilidad

Sin tareas ADO: la matriz se construye con las reglas de negocio y flujos de la etapa 2 (sustituto indicado por el template).

| Regla / Flujo | N casos (tabla) | TC-ID |
|---|---|---|
| RN-AUTH-009 | 7 | MENU-007 |
| RN-NAV-001 | 1, 2 | MENU-001, MENU-002 |
| RN-NAV-002 | 4, 8, 16 | MENU-004, MENU-013, MENU-016 |
| RN-NAV-003 | 5 | MENU-005 |
| RN-NAV-004 | 6, 15 | MENU-006, MENU-014 |
| RN-NAV-005 | 7 | MENU-007 |
| RN-NAV-006 | 9, 11, 12 | MENU-008, MENU-010, MENU-015 |
| RN-NAV-007 | 10 | MENU-009 |
| RN-NAV-008 | 13 | MENU-011 |
| RN-NAV-009 | 14 | MENU-012 |
| RN-NAV-010 | 3 | MENU-003 |
| FL-NAV-001 | 1, 2, 3, 4, 5, 6, 7, 8, 15, 16 | MENU-001, MENU-002, MENU-003, MENU-004, MENU-005, MENU-006, MENU-007, MENU-013, MENU-014, MENU-016 |
| FL-NAV-002 | 9, 10, 11, 12 | MENU-008, MENU-009, MENU-010, MENU-015 |
| FL-NAV-003 | 13, 14 | MENU-011, MENU-012 |

La columna TC-ID muestra el código de submódulo y el número de cada TC (p. ej. `MENU-001` = `TC-NAV-MENU-001`).

## 11. Notas de automatización

- Suite destino: `qa/07-automation/e2e/tests/navigation/`.
- TC-NAV-MENU-004 se implementa parametrizado por vista. El detalle de sesión del logout se cubre en TC-AUTH-LOG-017; TC-NAV-MENU-007 valida el camino desde el menú.
- TC-NAV-MENU-009 y TC-NAV-MENU-014 son candidatos DEF: `test.fail()` + `DEF-NAV-NNN` en la etapa 5 si se confirman.
- Nombre de los tests: `[{TC-ID}] {título} @{prioridad}` (`conventions.testNamingPattern`).
- Credenciales y URL siempre desde `process.env` (regla 3); nunca escribir la contraseña en código, evidencias ni reportes.
- Los timeouts se amplían solo de forma local y explícita en los TC que lo indican; no se modifica el timeout global.

### Notas por TC (heredadas de la especificación)

| TC-ID | Nota |
|---|---|
| TC-NAV-MENU-004 | Test parametrizado por vista |
| TC-NAV-MENU-006 | Preferir asertar el href para no depender del sitio externo |
| TC-NAV-MENU-007 | Detalle de sesión cubierto por TC-AUTH-LOG-017 |
| TC-NAV-MENU-009 | Candidato DEF: sigue en "Remove" hasta recargar |
| TC-NAV-MENU-015 | Observado error de consola "wa.cesetRart is not a function"; confirmar efecto visible en la etapa 5 |
| TC-NAV-MENU-014 | Candidato DEF: `https://saucelabs.com/error/404` |

## 12. Integración con Azure DevOps

No aplica: `integrations.azureDevOps.enabled` es `false` y la integración está fuera de alcance del proyecto. No se crean Test Plans, Test Suites ni Test Cases en ADO; la columna `Confirma` queda en `N/A` y la sección 10 usa reglas RN y flujos FL como sustituto de las tareas.
