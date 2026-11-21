# Plan de Pruebas - saucedemo - Sprint 1 - Checkout

**Proyecto:** saucedemo (Swag Labs)
**Sprint:** 1
**Módulo:** Checkout
**Código módulo:** CHK
**Submódulos:** Flujo de compra (FLW)
**Fecha planificación:** 2026-11-21
**Ventana QA:** por definir (`sprintCycle` deshabilitado en `qa/qa-framework.config.json`)
**ADO Test Plan:** No aplica (integración con Azure DevOps fuera de alcance; `integrations.azureDevOps.enabled: false`)
**Fuente:** `qa/01-specifications/module-checkout/submodule-checkout-flow/05-test-scenarios.md` (etapa 2)

---

## 1. Objetivo

Verificar que el flujo de compra en 3 pasos (información del cliente, resumen con totales e impuesto del 8 % y confirmación), la descarga del comprobante PDF y los controles de acceso al flujo cumplen las reglas RN-CHK-001 a RN-CHK-017.

## 2. Alcance

### En alcance

- Paso 1: campos obligatorios, rechazo de solo espacios, cierre del mensaje de error, Cancelar
- Paso 2: productos, pago y envío fijos, subtotal, impuesto del 8 % redondeado a centavos, total, formato monetario, Cancelar
- Paso 3: confirmación, vaciado del carrito, Back Home y comprobante PDF (nombre y contenido)
- Control de flujo: paso 2 sin completar el paso 1 y checkout sin sesión
- Comportamiento por usuario: `problem_user`, `error_user`, `visual_user` y `performance_glitch_user`

Total en alcance: **26 TC** (todos los TC de `05-test-scenarios.md` del submódulo).

### Fuera de alcance

- Validación de formato del código postal (no hay regla explícita; hallazgo REC)
- Acceso directo a `/checkout-complete.html` sin compra (hallazgo REC)
- Inconsistencia de zona horaria entre el nombre del PDF y "Order Date" (hallazgo REC; no se asserta la hora)
- Integración con Azure DevOps (Test Plans, Test Suites, Bugs): no aplica en este proyecto
- Pruebas de carga (k6) y track de API: la aplicación no expone API propia
- Navegadores distintos de Chromium (`integrations.playwright.browsers`)

## 3. Items del Sprint (normalizados)

Sin tareas ADO: los items del sprint son las reglas de negocio (RN) y los flujos (FL) especificados en la etapa 2. Los números de TC son el sufijo de `TC-{MODULO}-{SUB}-NNN`.

### Flujo de compra (FLW)

| Item | Título | TC (spec) |
|---|---|---|
| RN-CHK-001 | Nombre obligatorio | 001, 002, 003, 006 |
| RN-CHK-002 | Apellido obligatorio | 001, 004, 022, 023 |
| RN-CHK-003 | Código postal obligatorio | 001, 005 |
| RN-CHK-004 | Campos obligatorios no aceptan solo espacios | 007 |
| RN-CHK-005 | Cierre del mensaje de error | 008 |
| RN-CHK-006 | Cancelar en el paso 1 | 009 |
| RN-CHK-007 | Resumen con los productos del carrito | 001, 010 |
| RN-CHK-008 | Cálculo del subtotal | 011, 014, 025 |
| RN-CHK-009 | Cálculo del impuesto (8 %) | 012, 014, 025 |
| RN-CHK-010 | Cálculo del total | 001, 013, 014, 025 |
| RN-CHK-011 | Formato monetario de los totales | 015 |
| RN-CHK-012 | Cancelar en el paso 2 | 016 |
| RN-CHK-013 | Finalizar la compra | 001, 017, 024 |
| RN-CHK-014 | Volver al catálogo tras la compra | 018 |
| RN-CHK-015 | Comprobante PDF | 019, 026 |
| RN-CHK-016 | El resumen requiere completar el paso 1 | 020 |
| RN-CHK-017 | Checkout requiere sesión | 021 |
| FL-CHK-001 | Compra completa (happy path) | 001, 002, 009, 010, 011, 012, 013, 014, 015, 016, 017, 018, 019, 022, 024, 025, 026 |
| FL-CHK-002 | Corrección de datos en el paso 1 | 003, 004, 005, 006, 007, 008, 023 |

## 4. Priorización

| Prioridad | Criterio | TC | Automatizado | Ambos | Manual |
|---|---|---|---|---|---|
| P0 | Happy path o riesgo bloqueante | 5 | 5 | 0 | 0 |
| P1 | Negativo común, transición de estado, acceso, regresión por usuario relevante | 10 | 10 | 0 | 0 |
| P2 | Funcionalidad secundaria o regresión adyacente | 8 | 7 | 1 | 0 |
| P3 | Caso borde, cosmético o de baja frecuencia | 3 | 3 | 0 | 0 |
| **Total** | | **26** | **25** | **1** | **0** |

Candidatos DEF conocidos de las etapas 1 y 2 en este módulo: **6** (TC-CHK-FLW-007, TC-CHK-FLW-015, TC-CHK-FLW-020, TC-CHK-FLW-022, TC-CHK-FLW-023, TC-CHK-FLW-024). Se ejecutan con la aserción de la regla; si la desviación se confirma, la etapa 5 los marca con `test.fail()` y crea el archivo `DEF-SD-NNN` (regla 10).

## 5. TestSuites (agrupación funcional)

Agrupación por área funcional. Sin ADO, cada suite se corresponde con un bloque `test.describe()` en la etapa 5.

| Suite | TC | P0 | P1 | P2 | P3 | N (tabla) |
|---|---|---|---|---|---|---|
| Compra completa (happy path) | 3 | 2 | 0 | 1 | 0 | 1-3 |
| Paso 1 - Información del cliente | 8 | 0 | 4 | 3 | 1 | 4-11 |
| Paso 2 - Resumen y totales | 7 | 3 | 2 | 1 | 1 | 12-18 |
| Comprobante PDF | 2 | 0 | 0 | 1 | 1 | 19-20 |
| Acceso y control del flujo | 2 | 0 | 1 | 1 | 0 | 21-22 |
| Comportamiento por usuario | 4 | 0 | 3 | 1 | 0 | 23-26 |

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
| standard_user | `QA_USER_STANDARD_USER_USERNAME` | Referencia funcional: todas las reglas deben cumplirse | 21 (FLW-001, FLW-002, FLW-003, FLW-004, FLW-005, FLW-006, FLW-007, FLW-008, FLW-009, FLW-010, FLW-011, FLW-012, FLW-013, FLW-014, FLW-015, FLW-016, FLW-017, FLW-018, FLW-019, FLW-020, FLW-026) |
| locked_out_user | `QA_USER_LOCKED_OUT_USER_USERNAME` | El login debe ser rechazado con el mensaje de usuario bloqueado | - |
| problem_user | `QA_USER_PROBLEM_USER_USERNAME` | Defectos funcionales intencionales en catálogo, checkout y menú | 1 (FLW-022) |
| performance_glitch_user | `QA_USER_PERFORMANCE_GLITCH_USER_USERNAME` | Demora intencional de ~5 s en el login; resto funcional | 1 (FLW-025) |
| error_user | `QA_USER_ERROR_USER_USERNAME` | Errores JS intencionales al ordenar, agregar/quitar y finalizar | 2 (FLW-023, FLW-024) |
| visual_user | `QA_USER_VISUAL_USER_USERNAME` | Defectos visuales intencionales (precios del listado, imagen, posiciones) | 1 (FLW-025) |

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
- [ ] Elegir y agregar el parser de PDF como devDependency (TC-CHK-FLW-026)
- [ ] Definir la ventana QA del sprint (no hay ciclo de sprint configurado)

### Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Sitio público de terceros: caídas, latencia o cambios sin aviso | Alto | Reintentos solo en CI (2); diagnosticar con trazas antes de modificar asserts |
| Telemetría de terceros (`backtrace.io`) en la red | Bajo | No asertar tráfico de red de terceros |
| Cálculo monetario con redondeo: un esperado fijo oculta errores con otros carritos | Alta | TC-CHK-FLW-014 calcula el esperado con la fórmula de `04-test-data.md` (`Math.round(sub * 0.08 * 100) / 100`) |
| La extracción de texto del PDF requiere una dependencia nueva | Media | Agregar un parser de PDF como devDependency de `qa/07-automation/e2e` en la etapa 5 (TC-CHK-FLW-026) |
| `finish` vacía el carrito: tests encadenados pierden su estado | Media | Cada TC arma su propio carrito en un contexto nuevo |
| Validaciones del paso 1 débiles (solo espacios, paso 2 accesible directo): candidatos DEF | Alta | Aserción de la regla y `test.fail()` + DEF si se confirma (TC-CHK-FLW-007, 015, 020) |

## 9. Tabla de Pruebas

Etiquetas: `[SMOKE]` happy path P0, `[CONFIRMACION]` confirma una regla RN, `[REGRESION]` comportamiento por usuario o vista adyacente. `Confirma` = `N/A` en todas las filas (sin tareas ADO); la regla cubierta se indica en la descripción y en la sección 10.

**Etapa 4 - casos de prueba (2026-11-21):** steps expandidos para que la etapa 5 automatice sin reinterpretar. Convenciones: los identificadores entre backticks son valores de `data-test` (usar `page.getByTestId()`), salvo los que empiezan con `#` o `.` (selectores CSS) y las llamadas a la API de Playwright; `{VARIABLE}` se lee de `process.env` (la contraseña nunca se escribe en código ni evidencias, `<PLACEHOLDER>` en la documentación); `${EXEC_IDX}` es el sufijo único de la ejecución. Tras cada clic que navega se espera la URL y un elemento propio de la vista destino (SPA React). Los TC `Ambos` remiten a su documento en `qa/03-test-cases/`.

| N | TC-ID | Suite / Área Funcional | Título | Descripción | Steps | Resultado Esperado | Confirma | Tipo | Prioridad |
|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-CHK-FLW-001 | Compra completa (happy path) | [SMOKE][P0] Compra completa con standard_user | Valida RN-CHK-001 a RN-CHK-003, RN-CHK-007, RN-CHK-010, RN-CHK-013. Escenario: Compra completa con standard_user. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Ingresar `QA-${EXEC_IDX}` en `firstName`, `Pérez` en `lastName` y `8320000` en `postalCode`<br>5) Hacer clic en `continue`; verificar URL `/checkout-step-two.html` y `title` = "Checkout: Overview"<br>6) Hacer clic en `finish` | URL `/checkout-complete.html`, `complete-header` = "Thank you for your order!" y `shopping-cart-badge` no existe | N/A | Automatizado | P0 |
| 2 | TC-CHK-FLW-017 | Compra completa (happy path) | [SMOKE][P0] Finalizar muestra la confirmación y vacía el carrito | Valida RN-CHK-013, RN-CART-009. Escenario: Finalizar muestra la confirmación y vacía el carrito. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Ingresar `QA-${EXEC_IDX}` en `firstName`, `Pérez` en `lastName` y `8320000` en `postalCode`; hacer clic en `continue`; verificar URL `/checkout-step-two.html` y `title` = "Checkout: Overview"<br>5) Hacer clic en `finish` | `title` = "Checkout: Complete!", `pony-express` visible, `complete-header` = "Thank you for your order!", `complete-text` = "Your order has been dispatched, and will arrive just as fast as the pony can get there!", `shopping-cart-badge` no existe y `cart-contents` es null | N/A | Automatizado | P0 |
| 3 | TC-CHK-FLW-018 | Compra completa (happy path) | [CONFIRMACION][P2] Back Home vuelve al catálogo | Valida RN-CHK-014. Escenario: Back Home vuelve al catálogo. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"; ingresar `QA-${EXEC_IDX}` en `firstName`, `Pérez` en `lastName` y `8320000` en `postalCode`; hacer clic en `continue`; verificar URL `/checkout-step-two.html` y `title` = "Checkout: Overview"<br>4) Hacer clic en `finish`; verificar URL `/checkout-complete.html`<br>5) Hacer clic en `back-to-products` | URL `/inventory.html`, `title` = "Products" y `shopping-cart-badge` no existe | N/A | Automatizado | P2 |
| 4 | TC-CHK-FLW-002 | Paso 1 - Información del cliente | [CONFIRMACION][P2] Elementos del paso 1 | Valida RN-CHK-001. Escenario: Elementos del paso 1. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Leer el atributo `placeholder` de `firstName`, `lastName` y `postalCode` y el texto o valor de `cancel` y `continue` | `title` = "Checkout: Your Information"; placeholders "First Name", "Last Name" y "Zip/Postal Code"; `cancel` con texto "Cancel" y `continue` con valor "Continue" | N/A | Automatizado | P2 |
| 5 | TC-CHK-FLW-003 | Paso 1 - Información del cliente | [CONFIRMACION][P1] Los tres campos vacíos | Valida RN-CHK-001. Escenario: Los tres campos vacíos. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Verificar que `firstName`, `lastName` y `postalCode` están vacíos y hacer clic en `continue` | `error` = "Error: First Name is required", hay 3 `.error_icon` y la URL sigue en `/checkout-step-one.html` | N/A | Automatizado | P1 |
| 6 | TC-CHK-FLW-004 | Paso 1 - Información del cliente | [CONFIRMACION][P1] Falta el apellido | Valida RN-CHK-002. Escenario: Falta el apellido. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Ingresar `QA-${EXEC_IDX}` en `firstName` y dejar `lastName` y `postalCode` vacíos<br>5) Hacer clic en `continue` | `error` = "Error: Last Name is required" y la URL sigue en `/checkout-step-one.html` | N/A | Automatizado | P1 |
| 7 | TC-CHK-FLW-005 | Paso 1 - Información del cliente | [CONFIRMACION][P1] Falta el código postal | Valida RN-CHK-003. Escenario: Falta el código postal. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Ingresar `QA-${EXEC_IDX}` en `firstName` y `Pérez` en `lastName`; dejar `postalCode` vacío<br>5) Hacer clic en `continue` | `error` = "Error: Postal Code is required" y la URL sigue en `/checkout-step-one.html` | N/A | Automatizado | P1 |
| 8 | TC-CHK-FLW-006 | Paso 1 - Información del cliente | [CONFIRMACION][P1] Falta el nombre con el resto informado | Valida RN-CHK-001. Escenario: Falta el nombre con el resto informado. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Dejar `firstName` vacío; ingresar `Pérez` en `lastName` y `8320000` en `postalCode`<br>5) Hacer clic en `continue` | `error` = "Error: First Name is required" y la URL sigue en `/checkout-step-one.html` | N/A | Automatizado | P1 |
| 9 | TC-CHK-FLW-007 | Paso 1 - Información del cliente | [CONFIRMACION][P2] Campos con solo espacios son rechazados | Valida RN-CHK-004. Escenario: Campos con solo espacios son rechazados. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Ingresar " " (un espacio) en `firstName`, `lastName` y `postalCode`<br>5) Hacer clic en `continue` | `error` = "Error: First Name is required" y la URL sigue en `/checkout-step-one.html` (no se avanza a `/checkout-step-two.html`) | N/A | Automatizado | P2 |
| 10 | TC-CHK-FLW-008 | Paso 1 - Información del cliente | [CONFIRMACION][P3] Cerrar el error del paso 1 | Valida RN-CHK-005. Escenario: Cerrar el error del paso 1. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Hacer clic en `continue` con los campos vacíos y verificar `error` visible y 3 `.error_icon`<br>5) Hacer clic en `error-button` | `error` y los `.error_icon` ya no existen (`toHaveCount(0)` en ambos) | N/A | Automatizado | P3 |
| 11 | TC-CHK-FLW-009 | Paso 1 - Información del cliente | [CONFIRMACION][P2] Cancelar en el paso 1 vuelve al carrito | Valida RN-CHK-006. Escenario: Cancelar en el paso 1 vuelve al carrito. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Hacer clic en `cancel` | URL `/cart.html` con 2 `.cart_item` ("Sauce Labs Backpack" y "Sauce Labs Bike Light") y `shopping-cart-badge` = "2" | N/A | Automatizado | P2 |
| 12 | TC-CHK-FLW-010 | Paso 2 - Resumen y totales | [CONFIRMACION][P1] El resumen muestra productos, pago y envío | Valida RN-CHK-007. Escenario: El resumen muestra productos, pago y envío. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Ingresar `QA-${EXEC_IDX}` en `firstName`, `Pérez` en `lastName` y `8320000` en `postalCode`; hacer clic en `continue`; verificar URL `/checkout-step-two.html` y `title` = "Checkout: Overview"<br>5) Leer filas, pago y envío de `checkout-summary-container` | `title` = "Checkout: Overview"; 2 `.cart_item` ("Sauce Labs Backpack" $29.99 y "Sauce Labs Bike Light" $9.99) con `item-quantity` = "1" y 0 botones `[data-test^="remove"]`; `payment-info-value` = "SauceCard #31337"; `shipping-info-value` = "Free Pony Express Delivery!" | N/A | Automatizado | P1 |
| 13 | TC-CHK-FLW-011 | Paso 2 - Resumen y totales | [SMOKE][P0] Subtotal igual a la suma de precios | Valida RN-CHK-008. Escenario: Subtotal igual a la suma de precios. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Ingresar `QA-${EXEC_IDX}` en `firstName`, `Pérez` en `lastName` y `8320000` en `postalCode`; hacer clic en `continue`; verificar URL `/checkout-step-two.html` y `title` = "Checkout: Overview"<br>5) Leer `subtotal-label` | `subtotal-label` = "Item total: $39.98" (29.99 + 9.99) | N/A | Automatizado | P0 |
| 14 | TC-CHK-FLW-012 | Paso 2 - Resumen y totales | [SMOKE][P0] Impuesto del 8 % redondeado a centavos | Valida RN-CHK-009. Escenario: Impuesto del 8 % redondeado a centavos. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Ingresar `QA-${EXEC_IDX}` en `firstName`, `Pérez` en `lastName` y `8320000` en `postalCode`; hacer clic en `continue`; verificar URL `/checkout-step-two.html` y `title` = "Checkout: Overview"<br>5) Leer `tax-label` | `tax-label` = "Tax: $3.20" (39.98 x 0.08 = 3.1984 -> 3.20) | N/A | Automatizado | P0 |
| 15 | TC-CHK-FLW-013 | Paso 2 - Resumen y totales | [SMOKE][P0] Total igual a subtotal más impuesto | Valida RN-CHK-010. Escenario: Total igual a subtotal más impuesto. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Ingresar `QA-${EXEC_IDX}` en `firstName`, `Pérez` en `lastName` y `8320000` en `postalCode`; hacer clic en `continue`; verificar URL `/checkout-step-two.html` y `title` = "Checkout: Overview"<br>5) Leer `total-label` | `total-label` = "Total: $43.18" (39.98 + 3.20) | N/A | Automatizado | P0 |
| 16 | TC-CHK-FLW-014 | Paso 2 - Resumen y totales | [CONFIRMACION][P1] Totales con 1 y con 6 productos | Valida RN-CHK-008, RN-CHK-009, RN-CHK-010. Escenario: Totales con 1 y con 6 productos. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4]')` y recargar; verificar `shopping-cart-badge` = "1"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"; ingresar `QA-${EXEC_IDX}` en `firstName`, `Pérez` en `lastName` y `8320000` en `postalCode`; hacer clic en `continue`; verificar URL `/checkout-step-two.html` y `title` = "Checkout: Overview"; leer `subtotal-label`, `tax-label` y `total-label`<br>4) En un contexto nuevo iniciar sesión igual y preparar `cart-contents` = `[0,1,2,3,4,5]`; recargar y verificar `shopping-cart-badge` = "6"<br>5) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"; ingresar `QA-${EXEC_IDX}` en `firstName`, `Pérez` en `lastName` y `8320000` en `postalCode`; hacer clic en `continue`; verificar URL `/checkout-step-two.html` y `title` = "Checkout: Overview"; leer los 3 importes | 1 producto: "Item total: $29.99", "Tax: $2.40", "Total: $32.39". 6 productos: "Item total: $129.94", "Tax: $10.40", "Total: $140.34" | N/A | Automatizado | P1 |
| 17 | TC-CHK-FLW-015 | Paso 2 - Resumen y totales | [CONFIRMACION][P3] Totales siempre con 2 decimales | Valida RN-CHK-011. Escenario: Totales siempre con 2 decimales. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Verificar que `shopping-cart-badge` no existe (`toHaveCount(0)`) y `cart-contents` es null<br>3) Navegar directamente a `/checkout-step-two.html`<br>4) Leer `subtotal-label`, `tax-label` y `total-label` | Los 3 importes terminan en `\$\d+\.\d{2}$`: "Item total: $0.00", "Tax: $0.00" y "Total: $0.00" | N/A | Automatizado | P3 |
| 18 | TC-CHK-FLW-016 | Paso 2 - Resumen y totales | [CONFIRMACION][P2] Cancelar en el paso 2 vuelve al catálogo con el carrito intacto | Valida RN-CHK-012. Escenario: Cancelar en el paso 2 vuelve al catálogo con el carrito intacto. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Ingresar `QA-${EXEC_IDX}` en `firstName`, `Pérez` en `lastName` y `8320000` en `postalCode`; hacer clic en `continue`; verificar URL `/checkout-step-two.html` y `title` = "Checkout: Overview"<br>5) Hacer clic en `cancel` | URL `/inventory.html`, `shopping-cart-badge` = "2" y `cart-contents` = "[4,0]" | N/A | Automatizado | P2 |
| 19 | TC-CHK-FLW-019 | Comprobante PDF | [CONFIRMACION][P2] Generar el PDF de la orden | Valida RN-CHK-015. Escenario: Generar el PDF de la orden. Ver qa/03-test-cases/TC-CHK-FLW-019-pdf-de-la-orden.md. | 1) Crear el contexto con `acceptDownloads: true`. Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"; ingresar `QA-${EXEC_IDX}` en `firstName`, `Pérez` en `lastName` y `8320000` en `postalCode`; hacer clic en `continue`; verificar URL `/checkout-step-two.html` y `title` = "Checkout: Overview"<br>4) Hacer clic en `finish`; verificar URL `/checkout-complete.html`<br>5) Hacer clic en `generate-pdf-order` dentro de `Promise.all([page.waitForEvent('download'), ...])` y guardar con `download.saveAs()` en `test-results/`<br>6) Manual: abrir el PDF guardado y revisarlo visualmente (ver documento del TC) | `download.suggestedFilename()` cumple `^swag-labs-order-\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.pdf$` y el archivo pesa más de 0 bytes; la revisión manual confirma un PDF legible de 1 página sin texto superpuesto ni cortado | N/A | Ambos | P2 |
| 20 | TC-CHK-FLW-026 | Comprobante PDF | [CONFIRMACION][P3] El PDF contiene los datos de la orden | Valida RN-CHK-015. Escenario: El PDF contiene los datos de la orden. Hallazgo REC asociado (no altera la aserción). | 1) Crear el contexto con `acceptDownloads: true`. Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"; ingresar `QA-${EXEC_IDX}` en `firstName`, `Pérez` en `lastName` y `8320000` en `postalCode`; hacer clic en `continue`; verificar URL `/checkout-step-two.html` y `title` = "Checkout: Overview"; hacer clic en `finish`; verificar URL `/checkout-complete.html`<br>4) Hacer clic en `generate-pdf-order`, capturar el evento `download` y guardar el archivo<br>5) Extraer el texto del PDF con el parser definido en la etapa 5 (devDependency) y contar las páginas | El PDF tiene 1 página y su texto contiene "Order Receipt", "QA-${EXEC_IDX} Pérez", "8320000", "Sauce Labs Backpack $29.99", "Sauce Labs Bike Light $9.99", "Item total $39.98", "Tax $3.20", "Total $43.18" y "Thank you for your order!" | N/A | Automatizado | P3 |
| 21 | TC-CHK-FLW-020 | Acceso y control del flujo | [CONFIRMACION][P2] El resumen no es accesible sin completar el paso 1 | Valida RN-CHK-016. Escenario: El resumen no es accesible sin completar el paso 1. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Navegar directamente a `/checkout-step-two.html` sin pasar por el paso 1 | No se muestra el resumen: `checkout-summary-container` no existe y la URL final es `/checkout-step-one.html` o `/cart.html` | N/A | Automatizado | P2 |
| 22 | TC-CHK-FLW-021 | Acceso y control del flujo | [CONFIRMACION][P1] Checkout sin sesión redirige al login | Valida RN-CHK-017. Escenario: Checkout sin sesión redirige al login. | 1) Test parametrizado por ruta: `/checkout-step-one.html`, `/checkout-step-two.html` y `/checkout-complete.html`; un contexto nuevo por ruta, sin cookie `session-username`<br>2) Navegar directamente a `{QA_BASE_URL}{ruta}`<br>3) Leer `error` | Para cada ruta `error` = "Epic sadface: You can only access '{ruta}' when you are logged in." y `login-button` visible | N/A | Automatizado | P1 |
| 23 | TC-CHK-FLW-022 | Comportamiento por usuario | [REGRESION][P1] problem_user puede completar el paso 1 | Valida RN-CHK-002, FL-CHK-001. Escenario: problem_user puede completar el paso 1. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_PROBLEM_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Ingresar `Ana` en `firstName`, `Pérez` en `lastName` y `8320000` en `postalCode`, verificando el valor de cada campo después de escribirlo<br>5) Hacer clic en `continue` | Antes del clic `firstName` = "Ana", `lastName` = "Pérez" y `postalCode` = "8320000" (`toHaveValue`); tras el clic URL `/checkout-step-two.html` y `error` no existe | N/A | Automatizado | P1 |
| 24 | TC-CHK-FLW-023 | Comportamiento por usuario | [REGRESION][P1] error_user no avanza sin apellido | Valida RN-CHK-002. Escenario: error_user no avanza sin apellido. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_ERROR_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Ingresar `QA-${EXEC_IDX}` en `firstName`, `Pérez` en `lastName` y `8320000` en `postalCode`<br>5) Leer el valor de `lastName` y hacer clic en `continue` | `lastName` conserva "Pérez" (`toHaveValue('Pérez')`); si quedara vacío, `error` = "Error: Last Name is required" y la URL sigue en `/checkout-step-one.html` | N/A | Automatizado | P1 |
| 25 | TC-CHK-FLW-024 | Comportamiento por usuario | [REGRESION][P1] error_user puede finalizar la compra | Valida RN-CHK-013. Escenario: error_user puede finalizar la compra. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_ERROR_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"<br>4) Ingresar `QA-${EXEC_IDX}` en `firstName`, `Pérez` en `lastName` y `8320000` en `postalCode`; hacer clic en `continue`; verificar URL `/checkout-step-two.html` y `title` = "Checkout: Overview"<br>5) Hacer clic en `finish` | URL `/checkout-complete.html` y `complete-header` = "Thank you for your order!" | N/A | Automatizado | P1 |
| 26 | TC-CHK-FLW-025 | Comportamiento por usuario | [REGRESION][P2] visual_user y performance_glitch_user calculan los totales con precios reales | Valida RN-CHK-008 a RN-CHK-010. Escenario: visual_user y performance_glitch_user calculan los totales con precios reales. | 1) Test parametrizado por usuario: {QA_USER_VISUAL_USER_USERNAME} y {QA_USER_PERFORMANCE_GLITCH_USER_USERNAME} (timeout de 15 s en el login); un contexto nuevo por usuario. Navegar a `{QA_BASE_URL}/` e iniciar sesión: el usuario del parámetro en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Preparar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` (vía `page.evaluate`) y recargar; verificar `shopping-cart-badge` = "2"<br>3) Hacer clic en `shopping-cart-link` y luego en `checkout`; verificar URL `/checkout-step-one.html` y `title` = "Checkout: Your Information"; ingresar `QA-${EXEC_IDX}` en `firstName`, `Pérez` en `lastName` y `8320000` en `postalCode`; hacer clic en `continue`; verificar URL `/checkout-step-two.html` y `title` = "Checkout: Overview"<br>4) Leer `subtotal-label`, `tax-label` y `total-label`<br>5) Hacer clic en `finish` | Para cada usuario: "Item total: $39.98", "Tax: $3.20", "Total: $43.18" y luego URL `/checkout-complete.html` con `complete-header` = "Thank you for your order!" | N/A | Automatizado | P2 |

## 10. Matriz de Trazabilidad

Sin tareas ADO: la matriz se construye con las reglas de negocio y flujos de la etapa 2 (sustituto indicado por el template).

| Regla / Flujo | N casos (tabla) | TC-ID |
|---|---|---|
| RN-CART-009 | 2 | FLW-017 |
| RN-CHK-001 | 1, 4, 5, 8 | FLW-001, FLW-002, FLW-003, FLW-006 |
| RN-CHK-002 | 1, 6, 23, 24 | FLW-001, FLW-004, FLW-022, FLW-023 |
| RN-CHK-003 | 1, 7 | FLW-001, FLW-005 |
| RN-CHK-004 | 9 | FLW-007 |
| RN-CHK-005 | 10 | FLW-008 |
| RN-CHK-006 | 11 | FLW-009 |
| RN-CHK-007 | 1, 12 | FLW-001, FLW-010 |
| RN-CHK-008 | 13, 16, 26 | FLW-011, FLW-014, FLW-025 |
| RN-CHK-009 | 14, 16, 26 | FLW-012, FLW-014, FLW-025 |
| RN-CHK-010 | 1, 15, 16, 26 | FLW-001, FLW-013, FLW-014, FLW-025 |
| RN-CHK-011 | 17 | FLW-015 |
| RN-CHK-012 | 18 | FLW-016 |
| RN-CHK-013 | 1, 2, 25 | FLW-001, FLW-017, FLW-024 |
| RN-CHK-014 | 3 | FLW-018 |
| RN-CHK-015 | 19, 20 | FLW-019, FLW-026 |
| RN-CHK-016 | 21 | FLW-020 |
| RN-CHK-017 | 22 | FLW-021 |
| FL-CHK-001 | 1, 2, 3, 4, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 23, 25, 26 | FLW-001, FLW-017, FLW-018, FLW-002, FLW-009, FLW-010, FLW-011, FLW-012, FLW-013, FLW-014, FLW-015, FLW-016, FLW-019, FLW-026, FLW-022, FLW-024, FLW-025 |
| FL-CHK-002 | 5, 6, 7, 8, 9, 10, 24 | FLW-003, FLW-004, FLW-005, FLW-006, FLW-007, FLW-008, FLW-023 |

La columna TC-ID muestra el código de submódulo y el número de cada TC (p. ej. `FLW-001` = `TC-CHK-FLW-001`).

## 11. Notas de automatización

- Suite destino: `qa/07-automation/e2e/tests/checkout/`.
- TC-CHK-FLW-019 y TC-CHK-FLW-026 requieren `acceptDownloads: true`; TC-CHK-FLW-019 es `Ambos` (la descarga y el nombre se automatizan; la revisión visual del documento es manual).
- No asertar la hora de "Order Date" del PDF: depende de la zona horaria del runner.
- TC-CHK-FLW-022 a 024 son candidatos DEF por usuario: `test.fail()` + `DEF-SD-NNN` en la etapa 5 si se confirman.
- Nombre de los tests: `[{TC-ID}] {título} @{prioridad}` (`conventions.testNamingPattern`).
- Credenciales y URL siempre desde `process.env` (regla 3); nunca escribir la contraseña en código, evidencias ni reportes.
- Los timeouts se amplían solo de forma local y explícita en los TC que lo indican; no se modifica el timeout global.

### Notas por TC (heredadas de la especificación)

| TC-ID | Nota |
|---|---|
| TC-CHK-FLW-007 | Candidato DEF: observado avance al paso 2 |
| TC-CHK-FLW-014 | Test parametrizado; calcular el esperado con la fórmula de 04-test-data.md |
| TC-CHK-FLW-015 | Candidato DEF: observado "Item total: $0". Depende también de RN-CART-008 |
| TC-CHK-FLW-019 | Contenido del PDF: ver TC-CHK-FLW-026 |
| TC-CHK-FLW-026 | Verificado en la etapa 2 con un parser de PDF. La etapa 5 debe agregar un parser como devDependency. No asertar la hora de "Order Date" (zona horaria del runner); ver REC de zona horaria en 01-business-rules.md |
| TC-CHK-FLW-020 | Candidato DEF: observado resumen completo con "Finish" operable |
| TC-CHK-FLW-022 | Candidato DEF: el texto del apellido va a `firstName`; error "Last Name is required" |
| TC-CHK-FLW-023 | Candidato DEF: `lastName` queda vacío y aun así avanza al paso 2 |
| TC-CHK-FLW-024 | Candidato DEF: permanece en el paso 2 |

## 12. Integración con Azure DevOps

No aplica: `integrations.azureDevOps.enabled` es `false` y la integración está fuera de alcance del proyecto. No se crean Test Plans, Test Suites ni Test Cases en ADO; la columna `Confirma` queda en `N/A` y la sección 10 usa reglas RN y flujos FL como sustituto de las tareas.
