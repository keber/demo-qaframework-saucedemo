# Plan de Pruebas - saucedemo - Sprint 1 - Carrito de compras

**Proyecto:** saucedemo (Swag Labs)
**Sprint:** 1
**Módulo:** Carrito de compras
**Código módulo:** CART
**Submódulos:** Carrito (CRT)
**Fecha planificación:** 2026-11-21
**Ventana QA:** por definir (`sprintCycle` deshabilitado en `qa/qa-framework.config.json`)
**ADO Test Plan:** No aplica (integración con Azure DevOps fuera de alcance; `integrations.azureDevOps.enabled: false`)
**Fuente:** `qa/01-specifications/module-cart/submodule-cart/05-test-scenarios.md` (etapa 2)

---

## 1. Objetivo

Verificar que el badge, el contenido de la página del carrito, la eliminación de productos, la persistencia, el aislamiento entre usuarios y las transiciones hacia el catálogo y el checkout cumplen las reglas RN-CART-001 a RN-CART-011.

## 2. Alcance

### En alcance

- Badge del carrito al agregar y quitar productos
- Contenido de `/cart.html`: filas, encabezados, cantidad unitaria no editable, enlace al detalle
- Quitar productos desde el carrito y sincronización con el listado
- Continue Shopping, Checkout y bloqueo del checkout con el carrito vacío
- Persistencia al recargar y tras logout/login, aislamiento entre usuarios, vaciado tras la compra
- Acceso sin sesión y comportamiento de `problem_user`, `error_user` y `visual_user` en el carrito

Total en alcance: **19 TC** (todos los TC de `05-test-scenarios.md` del submódulo).

### Fuera de alcance

- Edición de cantidades (la app no la ofrece; TC-CART-CRT-019 confirma que la cantidad es siempre 1)
- Nodo oculto `removed_cart_item` en el DOM (nota técnica para los selectores, no es defecto)
- Integración con Azure DevOps (Test Plans, Test Suites, Bugs): no aplica en este proyecto
- Pruebas de carga (k6) y track de API: la aplicación no expone API propia
- Navegadores distintos de Chromium (`integrations.playwright.browsers`)

## 3. Items del Sprint (normalizados)

Sin tareas ADO: los items del sprint son las reglas de negocio (RN) y los flujos (FL) especificados en la etapa 2. Los números de TC son el sufijo de `TC-{MODULO}-{SUB}-NNN`.

### Carrito (CRT)

| Item | Título | TC (spec) |
|---|---|---|
| RN-CART-001 | Badge refleja la cantidad de productos | 001, 002, 006 |
| RN-CART-002 | Contenido del carrito | 003, 004 |
| RN-CART-003 | Cantidad unitaria por producto | 019 |
| RN-CART-004 | Quitar desde el carrito | 005, 006, 007, 017 |
| RN-CART-005 | Persistencia del carrito en el navegador | 010, 011 |
| RN-CART-006 | Seguir comprando | 008 |
| RN-CART-007 | Ir a checkout | 009 |
| RN-CART-008 | No se puede iniciar checkout con el carrito vacío | 013 |
| RN-CART-009 | El carrito se vacía al completar la compra | 015 |
| RN-CART-010 | Enlace al detalle desde el carrito | 014 |
| RN-CART-011 | Carrito aislado por usuario | 012 |
| FL-CART-001 | Revisar el carrito y continuar al checkout | 003, 004, 008, 009, 014, 018, 019 |
| FL-CART-002 | Quitar productos en el carrito | 005, 006, 007, 013, 017 |
| FL-CART-003 | Persistencia entre sesiones | 010, 011, 012 |

## 4. Priorización

| Prioridad | Criterio | TC | Automatizado | Ambos | Manual |
|---|---|---|---|---|---|
| P0 | Happy path o riesgo bloqueante | 4 | 4 | 0 | 0 |
| P1 | Negativo común, transición de estado, acceso, regresión por usuario relevante | 9 | 9 | 0 | 0 |
| P2 | Funcionalidad secundaria o regresión adyacente | 4 | 4 | 0 | 0 |
| P3 | Caso borde, cosmético o de baja frecuencia | 2 | 2 | 0 | 0 |
| **Total** | | **19** | **19** | **0** | **0** |

Candidatos DEF conocidos de las etapas 1 y 2 en este módulo: **2** (TC-CART-CRT-013, TC-CART-CRT-012). Se ejecutan con la aserción de la regla; si la desviación se confirma, la etapa 5 los marca con `test.fail()` y crea el archivo `DEF-CART-NNN` (regla 10).

## 5. TestSuites (agrupación funcional)

Agrupación por área funcional. Sin ADO, cada suite se corresponde con un bloque `test.describe()` en la etapa 5.

| Suite | TC | P0 | P1 | P2 | P3 | N (tabla) |
|---|---|---|---|---|---|---|
| Badge del carrito | 2 | 1 | 1 | 0 | 0 | 1-2 |
| Contenido y edición del carrito | 7 | 2 | 2 | 1 | 2 | 3-9 |
| Navegación desde el carrito | 3 | 1 | 2 | 0 | 0 | 10-12 |
| Persistencia y aislamiento | 4 | 0 | 3 | 1 | 0 | 13-16 |
| Acceso y usuarios no estándar | 3 | 0 | 1 | 2 | 0 | 17-19 |

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
| standard_user | `QA_USER_STANDARD_USER_USERNAME` | Referencia funcional: todas las reglas deben cumplirse | 16 (CRT-001, CRT-002, CRT-003, CRT-004, CRT-005, CRT-006, CRT-007, CRT-008, CRT-009, CRT-010, CRT-011, CRT-012, CRT-013, CRT-014, CRT-015, CRT-019) |
| locked_out_user | `QA_USER_LOCKED_OUT_USER_USERNAME` | El login debe ser rechazado con el mensaje de usuario bloqueado | - |
| problem_user | `QA_USER_PROBLEM_USER_USERNAME` | Defectos funcionales intencionales en catálogo, checkout y menú | 1 (CRT-017) |
| performance_glitch_user | `QA_USER_PERFORMANCE_GLITCH_USER_USERNAME` | Demora intencional de ~5 s en el login; resto funcional | - |
| error_user | `QA_USER_ERROR_USER_USERNAME` | Errores JS intencionales al ordenar, agregar/quitar y finalizar | 1 (CRT-017) |
| visual_user | `QA_USER_VISUAL_USER_USERNAME` | Defectos visuales intencionales (precios del listado, imagen, posiciones) | 2 (CRT-012, CRT-018) |

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
- [ ] Definir la ventana QA del sprint (no hay ciclo de sprint configurado)

### Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Sitio público de terceros: caídas, latencia o cambios sin aviso | Alto | Reintentos solo en CI (2); diagnosticar con trazas antes de modificar asserts |
| Telemetría de terceros (`backtrace.io`) en la red | Bajo | No asertar tráfico de red de terceros |
| El carrito vive en `localStorage` (`cart-contents`) y sobrevive al logout: un test puede heredar el carrito de otro | Alta | Contexto de navegador nuevo por test; preparar el carrito explícitamente en cada TC |
| Checkout habilitado con el carrito vacío (candidato DEF de RN-CART-008) | Alta | TC-CART-CRT-013 con aserción de la regla y `test.fail()` + DEF si se confirma |
| Carrito compartido entre usuarios en el mismo navegador (candidato DEF de RN-CART-011) | Alta | TC-CART-CRT-012 usa el mismo contexto a propósito; el resto de los TC usa contextos aislados |

## 9. Tabla de Pruebas

Etiquetas: `[SMOKE]` happy path P0, `[CONFIRMACION]` confirma una regla RN, `[REGRESION]` comportamiento por usuario o vista adyacente. `Confirma` = `N/A` en todas las filas (sin tareas ADO); la regla cubierta se indica en la descripción y en la sección 10.

| N | TC-ID | Suite / Área Funcional | Título | Descripción | Steps | Resultado Esperado | Confirma | Tipo | Prioridad |
|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-CART-CRT-001 | Badge del carrito | [CONFIRMACION][P1] Sin badge con el carrito vacío | Valida RN-CART-001. Escenario: Sin badge con el carrito vacío. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Verificar que el carrito está vacío (sin `shopping-cart-badge`)<br>3) Abrir `/inventory.html` | `shopping-cart-badge` no existe en el DOM | N/A | Automatizado | P1 |
| 2 | TC-CART-CRT-002 | Badge del carrito | [SMOKE][P0] El badge suma y resta al agregar y quitar | Valida RN-CART-001. Escenario: El badge suma y resta al agregar y quitar. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Verificar que el carrito está vacío (sin `shopping-cart-badge`)<br>3) Agregar Backpack, Bike Light y Onesie<br>4) Quitar Onesie | Badge "3" tras agregar y "2" tras quitar | N/A | Automatizado | P0 |
| 3 | TC-CART-CRT-003 | Contenido y edición del carrito | [SMOKE][P0] El carrito lista los productos agregados | Valida RN-CART-002. Escenario: El carrito lista los productos agregados. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar Backpack y luego Bike Light al carrito desde el listado<br>3) Hacer clic en `shopping-cart-link` | URL `/cart.html`; 2 filas `.cart_item` en orden de agregado, cada una con `item-quantity` "1", nombre y precio ($29.99, $9.99) | N/A | Automatizado | P0 |
| 4 | TC-CART-CRT-004 | Contenido y edición del carrito | [CONFIRMACION][P3] Encabezados de la página del carrito | Valida RN-CART-002. Escenario: Encabezados de la página del carrito. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Abrir `/cart.html` | `title` = "Your Cart", `cart-quantity-label` = "QTY", `cart-desc-label` = "Description" | N/A | Automatizado | P3 |
| 5 | TC-CART-CRT-005 | Contenido y edición del carrito | [SMOKE][P0] Quitar un producto desde el carrito | Valida RN-CART-004. Escenario: Quitar un producto desde el carrito. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar Backpack y Bike Light al carrito desde el listado<br>3) En `/cart.html`, hacer clic en `remove-sauce-labs-bike-light` | Queda 1 fila (Backpack), badge "1" y `cart-contents` = `[4]` | N/A | Automatizado | P0 |
| 6 | TC-CART-CRT-006 | Contenido y edición del carrito | [CONFIRMACION][P1] Quitar el último producto deja el carrito vacío | Valida RN-CART-004, RN-CART-001. Escenario: Quitar el último producto deja el carrito vacío. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar solo Backpack al carrito desde el listado<br>3) Hacer clic en `remove-sauce-labs-backpack` en `/cart.html` | Sin filas `.cart_item` y sin badge | N/A | Automatizado | P1 |
| 7 | TC-CART-CRT-007 | Contenido y edición del carrito | [CONFIRMACION][P1] El producto quitado en el carrito vuelve a "Add to cart" en el listado | Valida RN-CART-004. Escenario: El producto quitado en el carrito vuelve a "Add to cart" en el listado. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar Backpack al carrito desde el listado<br>3) Quitar Backpack en `/cart.html`<br>4) Hacer clic en `continue-shopping` | En el listado, Backpack muestra `add-to-cart-sauce-labs-backpack` | N/A | Automatizado | P1 |
| 8 | TC-CART-CRT-014 | Contenido y edición del carrito | [CONFIRMACION][P2] El nombre del producto en el carrito abre su detalle | Valida RN-CART-010. Escenario: El nombre del producto en el carrito abre su detalle. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar Backpack al carrito desde el listado<br>3) En `/cart.html`, hacer clic en `item-4-title-link` | URL `/inventory-item.html?id=4` con botón "Remove" | N/A | Automatizado | P2 |
| 9 | TC-CART-CRT-019 | Contenido y edición del carrito | [CONFIRMACION][P3] La cantidad por producto es siempre 1 y no es editable | Valida RN-CART-003. Escenario: La cantidad por producto es siempre 1 y no es editable. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar Backpack al carrito desde el listado<br>3) Abrir `/cart.html`<br>4) Volver al listado e intentar agregar Backpack otra vez | `item-quantity` = "1" sin control de edición; en el listado solo existe "Remove" para Backpack | N/A | Automatizado | P3 |
| 10 | TC-CART-CRT-008 | Navegación desde el carrito | [CONFIRMACION][P1] Continue Shopping vuelve al catálogo sin cambiar el carrito | Valida RN-CART-006. Escenario: Continue Shopping vuelve al catálogo sin cambiar el carrito. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar 2 productos al carrito desde el listado (Backpack y Bike Light)<br>3) En `/cart.html`, hacer clic en `continue-shopping` | URL `/inventory.html` y badge "2" | N/A | Automatizado | P1 |
| 11 | TC-CART-CRT-009 | Navegación desde el carrito | [SMOKE][P0] Checkout abre el paso 1 | Valida RN-CART-007. Escenario: Checkout abre el paso 1. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar 1 producto al carrito desde el listado (Backpack)<br>3) Hacer clic en `checkout` | URL `/checkout-step-one.html` con título "Checkout: Your Information" | N/A | Automatizado | P0 |
| 12 | TC-CART-CRT-013 | Navegación desde el carrito | [CONFIRMACION][P1] No se puede iniciar checkout con el carrito vacío | Valida RN-CART-008. Escenario: No se puede iniciar checkout con el carrito vacío. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Verificar que el carrito está vacío (sin `shopping-cart-badge`)<br>3) Abrir `/cart.html`<br>4) Intentar clic en `checkout` | El checkout no se inicia: botón deshabilitado/oculto o mensaje de error, y la URL sigue en `/cart.html` | N/A | Automatizado | P1 |
| 13 | TC-CART-CRT-010 | Persistencia y aislamiento | [CONFIRMACION][P1] El carrito se conserva al recargar | Valida RN-CART-005. Escenario: El carrito se conserva al recargar. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar 2 productos al carrito desde el listado (Backpack y Bike Light)<br>3) Recargar la página | Badge "2" y mismas filas en `/cart.html` | N/A | Automatizado | P1 |
| 14 | TC-CART-CRT-011 | Persistencia y aislamiento | [CONFIRMACION][P2] El carrito se conserva tras logout y login del mismo usuario | Valida RN-CART-005. Escenario: El carrito se conserva tras logout y login del mismo usuario. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar 2 productos al carrito desde el listado (Backpack y Bike Light)<br>3) Hacer logout<br>4) Iniciar sesión con el mismo usuario | Badge "2" | N/A | Automatizado | P2 |
| 15 | TC-CART-CRT-012 | Persistencia y aislamiento | [CONFIRMACION][P1] Otro usuario no ve el carrito del anterior | Valida RN-CART-011. Escenario: Otro usuario no ve el carrito del anterior. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar 2 productos al carrito desde el listado (Backpack y Bike Light)<br>3) Hacer logout<br>4) Iniciar sesión en el mismo contexto con {QA_USER_VISUAL_USER_USERNAME} | El badge no existe y `/cart.html` no tiene filas | N/A | Automatizado | P1 |
| 16 | TC-CART-CRT-015 | Persistencia y aislamiento | [CONFIRMACION][P1] El carrito queda vacío al completar la compra | Valida RN-CART-009. Escenario: El carrito queda vacío al completar la compra. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar 2 productos al carrito desde el listado (Backpack y Bike Light)<br>3) Completar el checkout hasta `finish`<br>4) Abrir `/cart.html` | Sin badge, sin filas y sin `cart-contents` en localStorage | N/A | Automatizado | P1 |
| 17 | TC-CART-CRT-016 | Acceso y usuarios no estándar | [CONFIRMACION][P1] Carrito sin sesión redirige al login | Valida RN-AUTH-007. Escenario: Carrito sin sesión redirige al login. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Navegar a `/cart.html` | Login con "You can only access '/cart.html' when you are logged in." | N/A | Automatizado | P1 |
| 18 | TC-CART-CRT-017 | Acceso y usuarios no estándar | [REGRESION][P2] problem_user y error_user pueden quitar productos desde el carrito | Valida RN-CART-004. Escenario: problem_user y error_user pueden quitar productos desde el carrito. | 1) Iniciar sesión con {QA_USER_PROBLEM_USER_USERNAME} (repetir luego con {QA_USER_ERROR_USER_USERNAME}) y contraseña {QA_USER_PASSWORD}<br>2) Preparar el carrito con Backpack y Bike Light (`cart-contents` = `[4,0]`)<br>3) En `/cart.html`, quitar Bike Light | Queda solo Backpack y badge "1" | N/A | Automatizado | P2 |
| 19 | TC-CART-CRT-018 | Acceso y usuarios no estándar | [REGRESION][P2] visual_user ve en el carrito el precio real | Valida RN-INV-012. Escenario: visual_user ve en el carrito el precio real. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_VISUAL_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar Backpack<br>3) Abrir `/cart.html` | Precio "$29.99" | N/A | Automatizado | P2 |

## 10. Matriz de Trazabilidad

Sin tareas ADO: la matriz se construye con las reglas de negocio y flujos de la etapa 2 (sustituto indicado por el template).

| Regla / Flujo | N casos (tabla) | TC-ID |
|---|---|---|
| RN-AUTH-007 | 17 | CRT-016 |
| RN-CART-001 | 1, 2, 6 | CRT-001, CRT-002, CRT-006 |
| RN-CART-002 | 3, 4 | CRT-003, CRT-004 |
| RN-CART-003 | 9 | CRT-019 |
| RN-CART-004 | 5, 6, 7, 18 | CRT-005, CRT-006, CRT-007, CRT-017 |
| RN-CART-005 | 13, 14 | CRT-010, CRT-011 |
| RN-CART-006 | 10 | CRT-008 |
| RN-CART-007 | 11 | CRT-009 |
| RN-CART-008 | 12 | CRT-013 |
| RN-CART-009 | 16 | CRT-015 |
| RN-CART-010 | 8 | CRT-014 |
| RN-CART-011 | 15 | CRT-012 |
| RN-INV-012 | 19 | CRT-018 |
| FL-CART-001 | 3, 4, 8, 9, 10, 11, 19 | CRT-003, CRT-004, CRT-014, CRT-019, CRT-008, CRT-009, CRT-018 |
| FL-CART-002 | 5, 6, 7, 12, 18 | CRT-005, CRT-006, CRT-007, CRT-013, CRT-017 |
| FL-CART-003 | 13, 14, 15 | CRT-010, CRT-011, CRT-012 |

La columna TC-ID muestra el código de submódulo y el número de cada TC (p. ej. `CRT-001` = `TC-CART-CRT-001`).

## 11. Notas de automatización

- Suite destino: `qa/07-automation/e2e/tests/cart/`.
- Contar filas con el selector `.cart_item`, no con los nodos hijos del contenedor (el producto quitado deja un nodo oculto `removed_cart_item`).
- Sembrar el carrito con `localStorage.setItem('cart-contents', '[4,0]')` es válido como setup; los TC que validan la acción de agregar deben usar la UI.
- Nombre de los tests: `[{TC-ID}] {título} @{prioridad}` (`conventions.testNamingPattern`).
- Credenciales y URL siempre desde `process.env` (regla 3); nunca escribir la contraseña en código, evidencias ni reportes.
- Los timeouts se amplían solo de forma local y explícita en los TC que lo indican; no se modifica el timeout global.

### Notas por TC (heredadas de la especificación)

| TC-ID | Nota |
|---|---|
| TC-CART-CRT-013 | Candidato DEF: el botón está habilitado y la orden se completa con total $0.00 |
| TC-CART-CRT-012 | Candidato DEF: observado badge "2" (carrito compartido en localStorage) |
| TC-CART-CRT-018 | El listado de visual_user muestra otro precio (ver TC-INV-CAT-025) |

## 12. Integración con Azure DevOps

No aplica: `integrations.azureDevOps.enabled` es `false` y la integración está fuera de alcance del proyecto. No se crean Test Plans, Test Suites ni Test Cases en ADO; la columna `Confirma` queda en `N/A` y la sección 10 usa reglas RN y flujos FL como sustituto de las tareas.
