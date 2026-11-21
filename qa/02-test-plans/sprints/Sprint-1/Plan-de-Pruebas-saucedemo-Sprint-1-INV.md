# Plan de Pruebas - saucedemo - Sprint 1 - Catálogo de productos

**Proyecto:** saucedemo (Swag Labs)
**Sprint:** 1
**Módulo:** Catálogo de productos
**Código módulo:** INV
**Submódulos:** Listado y detalle (CAT), Dynamic Catalog (DYN)
**Fecha planificación:** 2026-11-21
**Ventana QA:** por definir (`sprintCycle` deshabilitado en `qa/qa-framework.config.json`)
**ADO Test Plan:** No aplica (integración con Azure DevOps fuera de alcance; `integrations.azureDevOps.enabled: false`)
**Fuente:** `qa/01-specifications/module-inventory/submodule-catalog/05-test-scenarios.md`, `qa/01-specifications/module-inventory/submodule-dynamic-catalog/05-test-scenarios.md` (etapa 2)

---

## 1. Objetivo

Verificar que el listado de productos, el ordenamiento, el detalle de producto, las acciones de agregar y quitar del carrito desde el catálogo y las vistas del Dynamic Catalog (Lazy Load, Spinner y Slider) cumplen las reglas RN-INV-001 a RN-INV-021, y documentar las desviaciones intencionales de `problem_user`, `error_user` y `visual_user` como candidatos a defecto.

## 2. Alcance

### En alcance

- Listado de 6 productos, datos de referencia (nombre, descripción, precio, imagen) y consistencia de precios entre vistas
- Ordenamiento por nombre y precio, orden por defecto A-Z y opciones estáticas del selector
- Agregar y quitar desde el listado y desde el detalle; navegación al detalle por nombre e imagen; producto inexistente
- Dynamic Catalog: submenú, carga diferida con scroll, indicador de carga, slider, solo lectura, rutas protegidas
- Comportamiento por usuario: `problem_user`, `error_user`, `visual_user` y `performance_glitch_user` contra las mismas reglas

Total en alcance: **41 TC** (todos los TC de `05-test-scenarios.md` de los 2 submódulos).

### Fuera de alcance

- Manejo del producto inexistente con precio "$√-1" y botón operable (REC de manejo de error 404; TC-INV-CAT-017 valida solo la regla RN-INV-010)
- Duplicado de la variante "Test.allTheThings() T-Shirt (Red) (L)" y scroll sin fin en Lazy Load (REC de datos)
- Comparación visual por screenshot de `visual_user` como prueba automatizada (queda como verificación manual de TC-INV-CAT-026)
- Integración con Azure DevOps (Test Plans, Test Suites, Bugs): no aplica en este proyecto
- Pruebas de carga (k6) y track de API: la aplicación no expone API propia
- Navegadores distintos de Chromium (`integrations.playwright.browsers`)

## 3. Items del Sprint (normalizados)

Sin tareas ADO: los items del sprint son las reglas de negocio (RN) y los flujos (FL) especificados en la etapa 2. Los números de TC son el sufijo de `TC-{MODULO}-{SUB}-NNN`.

### Listado y detalle (CAT)

| Item | Título | TC (spec) |
|---|---|---|
| RN-INV-001 | Catálogo de 6 productos | 001, 002, 027 |
| RN-INV-002 | Orden por defecto A-Z | 003, 007 |
| RN-INV-003 | Ordenamiento por nombre | 004, 020, 023 |
| RN-INV-004 | Ordenamiento por precio | 005, 006, 020, 023 |
| RN-INV-005 | Agregar al carrito desde el listado | 008, 009, 021, 024 |
| RN-INV-006 | Quitar del carrito desde el listado | 010, 021, 024 |
| RN-INV-007 | Navegación al detalle | 011, 012, 013, 022 |
| RN-INV-008 | Estado del carrito reflejado en el detalle | 014, 015, 024 |
| RN-INV-009 | Volver al listado | 016 |
| RN-INV-010 | Producto inexistente | 017 |
| RN-INV-011 | Imagen correcta por producto | 019, 026 |
| RN-INV-012 | Precio consistente entre vistas | 002, 013, 025 |
| RN-INV-013 | Opciones de orden estáticas | 028 |
| FL-INV-001 | Explorar y ordenar el catálogo | 001, 002, 003, 004, 005, 006, 007, 019, 020, 023, 025, 026, 027, 028 |
| FL-INV-002 | Agregar y quitar desde el listado | 008, 009, 010, 021, 024 |
| FL-INV-003 | Consultar el detalle de un producto | 011, 012, 013, 014, 015, 016, 017, 022 |

### Dynamic Catalog (DYN)

| Item | Título | TC (spec) |
|---|---|---|
| RN-INV-014 | Submenú desplegable | 001, 013 |
| RN-INV-015 | Rutas del Dynamic Catalog protegidas | 009, 010 |
| RN-INV-016 | Carga diferida (Lazy Load) | 002, 003, 012 |
| RN-INV-017 | Indicador de carga (Spinner) | 005, 006, 012 |
| RN-INV-018 | Navegación del Slider | 007, 008, 012 |
| RN-INV-019 | Precios del Dynamic Catalog iguales al catálogo | 004, 012 |
| RN-INV-020 | Vistas de solo lectura | 011 |
| RN-INV-021 | Mismo comportamiento para todos los usuarios habilitados | 012 |
| FL-INV-004 | Abrir una vista del Dynamic Catalog | 001, 002, 005, 006, 011, 012, 013 |
| FL-INV-005 | Scroll con carga diferida | 003, 004 |
| FL-INV-006 | Recorrer el Slider | 007, 008 |

## 4. Priorización

| Prioridad | Criterio | TC | Automatizado | Ambos | Manual |
|---|---|---|---|---|---|
| P0 | Happy path o riesgo bloqueante | 3 | 3 | 0 | 0 |
| P1 | Negativo común, transición de estado, acceso, regresión por usuario relevante | 15 | 15 | 0 | 0 |
| P2 | Funcionalidad secundaria o regresión adyacente | 12 | 12 | 0 | 0 |
| P3 | Caso borde, cosmético o de baja frecuencia | 11 | 10 | 1 | 0 |
| **Total** | | **41** | **40** | **1** | **0** |

Candidatos DEF conocidos de las etapas 1 y 2 en este módulo: **8** (TC-INV-CAT-019, TC-INV-CAT-020, TC-INV-CAT-021, TC-INV-CAT-022, TC-INV-CAT-023, TC-INV-CAT-024, TC-INV-CAT-025, TC-INV-CAT-026). Se ejecutan con la aserción de la regla; si la desviación se confirma, la etapa 5 los marca con `test.fail()` y crea el archivo `DEF-INV-NNN` (regla 10).

## 5. TestSuites (agrupación funcional)

Agrupación por área funcional. Sin ADO, cada suite se corresponde con un bloque `test.describe()` en la etapa 5.

| Suite | TC | P0 | P1 | P2 | P3 | N (tabla) |
|---|---|---|---|---|---|---|
| Listado y ordenamiento | 8 | 1 | 5 | 0 | 2 | 1-8 |
| Agregar y quitar desde el catálogo | 5 | 2 | 2 | 1 | 0 | 9-13 |
| Detalle de producto | 5 | 0 | 2 | 2 | 1 | 14-18 |
| Dynamic Catalog | 10 | 0 | 0 | 5 | 5 | 19-28 |
| Acceso sin sesión | 3 | 0 | 2 | 1 | 0 | 29-31 |
| Comportamiento por usuario | 10 | 0 | 4 | 3 | 3 | 32-41 |

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
| standard_user | `QA_USER_STANDARD_USER_USERNAME` | Referencia funcional: todas las reglas deben cumplirse | 30 (CAT-001, CAT-002, CAT-003, CAT-004, CAT-005, CAT-006, CAT-007, CAT-008, CAT-009, CAT-010, CAT-011, CAT-012, CAT-013, CAT-014, CAT-015, CAT-016, CAT-017, CAT-026, CAT-027, CAT-028, DYN-001, DYN-002, DYN-003, DYN-004, DYN-005, DYN-006, DYN-007, DYN-008, DYN-011, DYN-013) |
| locked_out_user | `QA_USER_LOCKED_OUT_USER_USERNAME` | El login debe ser rechazado con el mensaje de usuario bloqueado | - |
| problem_user | `QA_USER_PROBLEM_USER_USERNAME` | Defectos funcionales intencionales en catálogo, checkout y menú | 5 (CAT-019, CAT-020, CAT-021, CAT-022, DYN-012) |
| performance_glitch_user | `QA_USER_PERFORMANCE_GLITCH_USER_USERNAME` | Demora intencional de ~5 s en el login; resto funcional | 2 (CAT-027, DYN-012) |
| error_user | `QA_USER_ERROR_USER_USERNAME` | Errores JS intencionales al ordenar, agregar/quitar y finalizar | 3 (CAT-023, CAT-024, DYN-012) |
| visual_user | `QA_USER_VISUAL_USER_USERNAME` | Defectos visuales intencionales (precios del listado, imagen, posiciones) | 3 (CAT-025, CAT-026, DYN-012) |

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
| `visual_user` muestra precios aleatorios en cada carga: el resultado no es determinista | Alta | TC-INV-CAT-025 compara contra el catálogo de referencia y el formato de 2 decimales, nunca contra un valor observado |
| `error_user` dispara un `alert` al ordenar que bloquea la página si no se maneja | Media | Registrar un handler de `dialog` antes de ordenar (TC-INV-CAT-023) |
| El slider avanza solo (autoplay) y puede cambiar el producto visible antes del assert | Media | Verificar inmediatamente tras el clic (TC-INV-DYN-007); no asertar el intervalo exacto |
| Carga del Spinner entre ~0.9 y ~3.6 s | Baja | Esperar la grilla con timeout explícito de 10 s (TC-INV-DYN-005) |

## 9. Tabla de Pruebas

Etiquetas: `[SMOKE]` happy path P0, `[CONFIRMACION]` confirma una regla RN, `[REGRESION]` comportamiento por usuario o vista adyacente. `Confirma` = `N/A` en todas las filas (sin tareas ADO); la regla cubierta se indica en la descripción y en la sección 10.

**Etapa 4 - casos de prueba (2026-11-21):** steps expandidos para que la etapa 5 automatice sin reinterpretar. Convenciones: los identificadores entre backticks son valores de `data-test` (usar `page.getByTestId()`), salvo los que empiezan con `#` o `.` (selectores CSS) y las llamadas a la API de Playwright; `{VARIABLE}` se lee de `process.env` (la contraseña nunca se escribe en código ni evidencias, `<PLACEHOLDER>` en la documentación); `${EXEC_IDX}` es el sufijo único de la ejecución. Tras cada clic que navega se espera la URL y un elemento propio de la vista destino (SPA React). Los TC `Ambos` remiten a su documento en `qa/03-test-cases/`.

| N | TC-ID | Suite / Área Funcional | Título | Descripción | Steps | Resultado Esperado | Confirma | Tipo | Prioridad |
|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-INV-CAT-001 | Listado y ordenamiento | [SMOKE][P0] El listado muestra 6 productos completos | Valida RN-INV-001. Escenario: El listado muestra 6 productos completos. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Contar las tarjetas `inventory-item` dentro de `inventory-list`<br>3) Para cada tarjeta revisar nombre, descripción, precio, imagen y botón | Hay 6 `inventory-item`; cada una tiene `inventory-item-name` e `inventory-item-desc` no vacíos, `inventory-item-price`, una imagen con `alt` = nombre del producto y un botón `add-to-cart-{slug}` con texto "Add to cart" | N/A | Automatizado | P0 |
| 2 | TC-INV-CAT-002 | Listado y ordenamiento | [CONFIRMACION][P1] Nombres y precios coinciden con el catálogo de referencia | Valida RN-INV-001, RN-INV-012. Escenario: Nombres y precios coinciden con el catálogo de referencia. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Leer con `allTextContents()` los textos de `inventory-item-name` e `inventory-item-price`<br>3) Comparar cada par nombre-precio con el catálogo de referencia | Pares exactos: Sauce Labs Backpack $29.99, Sauce Labs Bike Light $9.99, Sauce Labs Bolt T-Shirt $15.99, Sauce Labs Fleece Jacket $49.99, Sauce Labs Onesie $7.99, Test.allTheThings() T-Shirt (Red) $15.99; cada precio cumple `^\$\d+\.\d{2}$` | N/A | Automatizado | P1 |
| 3 | TC-INV-CAT-003 | Listado y ordenamiento | [CONFIRMACION][P1] Orden por defecto A-Z | Valida RN-INV-002. Escenario: Orden por defecto A-Z. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Leer `active-option` y el valor de `product-sort-container`<br>3) Leer los nombres de `inventory-item-name` en orden | `active-option` = "Name (A to Z)", valor `az` y los nombres igualan su copia ordenada ascendente (primero "Sauce Labs Backpack", último "Test.allTheThings() T-Shirt (Red)") | N/A | Automatizado | P1 |
| 4 | TC-INV-CAT-004 | Listado y ordenamiento | [CONFIRMACION][P1] Ordenar por nombre Z-A | Valida RN-INV-003. Escenario: Ordenar por nombre Z-A. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Seleccionar `za` en `product-sort-container` (`selectOption('za')`)<br>3) Leer `active-option` y los nombres de `inventory-item-name` | `active-option` = "Name (Z to A)" y nombres en orden descendente: primero "Test.allTheThings() T-Shirt (Red)", último "Sauce Labs Backpack" | N/A | Automatizado | P1 |
| 5 | TC-INV-CAT-005 | Listado y ordenamiento | [CONFIRMACION][P1] Ordenar por precio de menor a mayor | Valida RN-INV-004. Escenario: Ordenar por precio de menor a mayor. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Seleccionar `lohi` en `product-sort-container`<br>3) Leer `active-option` y los precios de `inventory-item-price` convertidos a número | `active-option` = "Price (low to high)" y precios en orden no decreciente: primero $7.99 (Onesie), último $49.99 (Fleece Jacket) | N/A | Automatizado | P1 |
| 6 | TC-INV-CAT-006 | Listado y ordenamiento | [CONFIRMACION][P1] Ordenar por precio de mayor a menor | Valida RN-INV-004. Escenario: Ordenar por precio de mayor a menor. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Seleccionar `hilo` en `product-sort-container`<br>3) Leer `active-option` y los precios de `inventory-item-price` convertidos a número | `active-option` = "Price (high to low)" y precios en orden no creciente: primero $49.99 (Fleece Jacket), último $7.99 (Onesie) | N/A | Automatizado | P1 |
| 7 | TC-INV-CAT-007 | Listado y ordenamiento | [CONFIRMACION][P3] El orden vuelve a A-Z al recargar | Valida RN-INV-002. Escenario: El orden vuelve a A-Z al recargar. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Seleccionar `hilo` en `product-sort-container` y verificar `active-option` = "Price (high to low)"<br>3) Ejecutar `page.reload()` y esperar `inventory-list`<br>4) Leer `active-option` y el primer `inventory-item-name` | `active-option` = "Name (A to Z)", valor `az` y el primer producto es "Sauce Labs Backpack" | N/A | Automatizado | P3 |
| 8 | TC-INV-CAT-028 | Listado y ordenamiento | [CONFIRMACION][P3] El selector de orden ofrece las 4 opciones estáticas | Valida RN-INV-013. Escenario: El selector de orden ofrece las 4 opciones estáticas. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Leer `value` y texto de cada `option` de `product-sort-container` | Exactamente 4 opciones, en este orden: `az` "Name (A to Z)", `za` "Name (Z to A)", `lohi` "Price (low to high)", `hilo` "Price (high to low)" | N/A | Automatizado | P3 |
| 9 | TC-INV-CAT-008 | Agregar y quitar desde el catálogo | [SMOKE][P0] Agregar un producto desde el listado | Valida RN-INV-005. Escenario: Agregar un producto desde el listado. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Verificar que `shopping-cart-badge` no existe (`toHaveCount(0)`)<br>3) Hacer clic en `add-to-cart-sauce-labs-backpack` | `remove-sauce-labs-backpack` visible con texto "Remove", `add-to-cart-sauce-labs-backpack` no existe, `shopping-cart-badge` = "1" y `localStorage.getItem('cart-contents')` = "[4]" | N/A | Automatizado | P0 |
| 10 | TC-INV-CAT-009 | Agregar y quitar desde el catálogo | [CONFIRMACION][P1] Agregar los 6 productos | Valida RN-INV-005, RN-CART-001. Escenario: Agregar los 6 productos. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Verificar que `shopping-cart-badge` no existe (`toHaveCount(0)`)<br>3) Hacer clic en `add-to-cart-{slug}` para los 6 slugs: `sauce-labs-backpack`, `sauce-labs-bike-light`, `sauce-labs-bolt-t-shirt`, `sauce-labs-fleece-jacket`, `sauce-labs-onesie`, `test.allthethings()-t-shirt-(red)` (usar `getByTestId`) | `shopping-cart-badge` = "6", existen los 6 botones `remove-{slug}` con texto "Remove" y ningún botón "Add to cart" | N/A | Automatizado | P1 |
| 11 | TC-INV-CAT-010 | Agregar y quitar desde el catálogo | [SMOKE][P0] Quitar un producto desde el listado | Valida RN-INV-006. Escenario: Quitar un producto desde el listado. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Hacer clic en `add-to-cart-sauce-labs-backpack` y verificar `shopping-cart-badge` = "1"<br>3) Hacer clic en `remove-sauce-labs-backpack` | `add-to-cart-sauce-labs-backpack` visible con texto "Add to cart", `shopping-cart-badge` no existe y `cart-contents` no contiene el id 4 (arreglo vacío o clave ausente) | N/A | Automatizado | P0 |
| 12 | TC-INV-CAT-014 | Agregar y quitar desde el catálogo | [CONFIRMACION][P1] Agregar y quitar desde el detalle | Valida RN-INV-008. Escenario: Agregar y quitar desde el detalle. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Verificar que `shopping-cart-badge` no existe (`toHaveCount(0)`)<br>3) Navegar a `/inventory-item.html?id=4` y esperar `inventory-item-name` = "Sauce Labs Backpack"<br>4) Hacer clic en `add-to-cart` y verificar `remove` visible y `shopping-cart-badge` = "1"<br>5) Hacer clic en `remove` | Tras agregar: `remove` "Remove" y badge "1". Tras quitar: `add-to-cart` "Add to cart" visible y `shopping-cart-badge` no existe | N/A | Automatizado | P1 |
| 13 | TC-INV-CAT-015 | Agregar y quitar desde el catálogo | [CONFIRMACION][P2] El detalle refleja un producto que ya está en el carrito | Valida RN-INV-008. Escenario: El detalle refleja un producto que ya está en el carrito. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Hacer clic en `add-to-cart-sauce-labs-backpack` y verificar `shopping-cart-badge` = "1"<br>3) Hacer clic en `item-4-title-link` y esperar la URL `/inventory-item.html?id=4` y `back-to-products` | `remove` visible con texto "Remove", `add-to-cart` no existe y `shopping-cart-badge` = "1" | N/A | Automatizado | P2 |
| 14 | TC-INV-CAT-011 | Detalle de producto | [CONFIRMACION][P1] El nombre abre el detalle del mismo producto | Valida RN-INV-007. Escenario: El nombre abre el detalle del mismo producto. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Hacer clic en `item-4-title-link`<br>3) Esperar la URL y `back-to-products` (no leer el DOM antes: la SPA cambia la URL antes de renderizar) | URL `/inventory-item.html?id=4`, `inventory-item-name` = "Sauce Labs Backpack" e `inventory-item-price` = "$29.99" | N/A | Automatizado | P1 |
| 15 | TC-INV-CAT-012 | Detalle de producto | [CONFIRMACION][P2] La imagen abre el detalle del mismo producto | Valida RN-INV-007. Escenario: La imagen abre el detalle del mismo producto. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Hacer clic en `item-0-img-link`<br>3) Esperar la URL y `back-to-products` | URL `/inventory-item.html?id=0`, `inventory-item-name` = "Sauce Labs Bike Light" e `inventory-item-price` = "$9.99" | N/A | Automatizado | P2 |
| 16 | TC-INV-CAT-013 | Detalle de producto | [CONFIRMACION][P1] El detalle muestra los mismos datos que el listado para los 6 productos | Valida RN-INV-007, RN-INV-012. Escenario: El detalle muestra los mismos datos que el listado para los 6 productos. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Leer nombre (`inventory-item-name`), descripción (`inventory-item-desc`) y precio (`inventory-item-price`) de las 6 tarjetas del listado<br>3) Para cada id (4, 0, 1, 5, 2, 3): hacer clic en `item-{id}-title-link` y esperar la URL `?id={id}` y `back-to-products`<br>4) Leer los 3 campos en el detalle y hacer clic en `back-to-products` para volver al listado | Para los 6 productos, nombre, descripción y precio del detalle son idénticos a los del listado | N/A | Automatizado | P1 |
| 17 | TC-INV-CAT-016 | Detalle de producto | [CONFIRMACION][P2] Volver al listado desde el detalle | Valida RN-INV-009. Escenario: Volver al listado desde el detalle. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Navegar a `/inventory-item.html?id=4` y esperar `inventory-item-name` = "Sauce Labs Backpack"<br>3) Hacer clic en `back-to-products` | URL `/inventory.html`, `title` = "Products" y 6 `inventory-item` | N/A | Automatizado | P2 |
| 18 | TC-INV-CAT-017 | Detalle de producto | [CONFIRMACION][P3] Detalle de un producto inexistente | Valida RN-INV-010. Escenario: Detalle de un producto inexistente. Hallazgo REC asociado (no altera la aserción). | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Navegar a `/inventory-item.html?id=99`<br>3) Leer `inventory-item-name` | `inventory-item-name` = "ITEM NOT FOUND" (el precio anómalo y el botón operable son REC y no se asertan) | N/A | Automatizado | P3 |
| 19 | TC-INV-DYN-001 | Dynamic Catalog | [CONFIRMACION][P2] Desplegar el submenú Dynamic Catalog | Valida RN-INV-014. Escenario: Desplegar el submenú Dynamic Catalog. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Hacer clic en `#react-burger-menu-btn`; verificar `.bm-menu-wrap` con `aria-hidden="false"`<br>3) Verificar `dynamic-catalog-sidebar-link` con `aria-expanded="false"`<br>4) Hacer clic en `dynamic-catalog-sidebar-link` | `aria-expanded="true"`, `dynamic-catalog-submenu` visible con `dynamic-catalog-lazy-load-link` "Lazy Load", `dynamic-catalog-spinner-link` "Spinner" y `dynamic-catalog-slider-link` "Slider"; la URL sigue en `/inventory.html` | N/A | Automatizado | P2 |
| 20 | TC-INV-DYN-002 | Dynamic Catalog | [CONFIRMACION][P2] Abrir Lazy Load | Valida RN-INV-016. Escenario: Abrir Lazy Load. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Hacer clic en `#react-burger-menu-btn`; verificar `.bm-menu-wrap` con `aria-hidden="false"`<br>3) Si `dynamic-catalog-sidebar-link` tiene `aria-expanded="false"`, hacer clic en él; verificar `dynamic-catalog-submenu` visible<br>4) Hacer clic en `dynamic-catalog-lazy-load-link` | URL `/dynamic-catalog-lazy-load.html`, `title` = "Dynamic Catalog - Lazy Load" y 12 tarjetas `lazy-load-item-{n}` (sin contar los sufijos `-img`, `-name`, `-price`, `-placeholder`), de las cuales 4 tienen `-placeholder` con texto "Loading..." | N/A | Automatizado | P2 |
| 21 | TC-INV-DYN-003 | Dynamic Catalog | [CONFIRMACION][P2] El scroll carga más productos | Valida RN-INV-016. Escenario: El scroll carga más productos. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Navegar a `/dynamic-catalog-lazy-load.html` y esperar 12 tarjetas `lazy-load-item-{n}`<br>3) Hacer scroll hasta `dynamic-catalog-lazy-load-sentinel` (`scrollIntoViewIfNeeded()`) y esperar que aumente la cantidad de tarjetas<br>4) Repetir el paso 3 dos veces más (3 scrolls en total) | La cantidad de tarjetas con `-name` supera 12 (referencia: 28 tras 3 scrolls) y ninguna tarjeta con `-name` tiene `-placeholder` | N/A | Automatizado | P2 |
| 22 | TC-INV-DYN-004 | Dynamic Catalog | [CONFIRMACION][P3] Precios de Lazy Load iguales al catálogo | Valida RN-INV-019. Escenario: Precios de Lazy Load iguales al catálogo. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Navegar a `/dynamic-catalog-lazy-load.html` y hacer 3 scrolls hasta `dynamic-catalog-lazy-load-sentinel`<br>3) Leer `-name` y `-price` de cada tarjeta cargada<br>4) Quitar el sufijo de talla del nombre (p. ej. " (XS)") para obtener el producto base | Cada tarjeta tiene el precio de su producto base: Bike Light $9.99, Bolt T-Shirt $15.99, Onesie $7.99, Test.allTheThings() T-Shirt (Red) $15.99, Backpack $29.99, Fleece Jacket $49.99 | N/A | Automatizado | P3 |
| 23 | TC-INV-DYN-005 | Dynamic Catalog | [CONFIRMACION][P2] Spinner visible durante la carga | Valida RN-INV-017. Escenario: Spinner visible durante la carga. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Hacer clic en `#react-burger-menu-btn`; verificar `.bm-menu-wrap` con `aria-hidden="false"`<br>3) Si `dynamic-catalog-sidebar-link` tiene `aria-expanded="false"`, hacer clic en él; verificar `dynamic-catalog-submenu` visible<br>4) Hacer clic en `dynamic-catalog-spinner-link` | `dynamic-catalog-spinner` visible y luego `dynamic-catalog-spinner-grid` con 6 tarjetas `spinner-item-{0..5}` (esperar la grilla, nunca un tiempo fijo); `title` = "Dynamic Catalog - Spinner" | N/A | Automatizado | P2 |
| 24 | TC-INV-DYN-006 | Dynamic Catalog | [CONFIRMACION][P3] El spinner reaparece al recargar | Valida RN-INV-017. Escenario: El spinner reaparece al recargar. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Navegar a `/dynamic-catalog-spinner.html` y esperar `dynamic-catalog-spinner-grid`<br>3) Ejecutar `page.reload()`<br>4) Verificar `dynamic-catalog-spinner` visible y luego esperar la grilla | `dynamic-catalog-spinner` se muestra antes que `dynamic-catalog-spinner-grid` y la grilla vuelve con 6 `spinner-item-{n}` | N/A | Automatizado | P3 |
| 25 | TC-INV-DYN-007 | Dynamic Catalog | [CONFIRMACION][P2] El punto del slider muestra su producto | Valida RN-INV-018. Escenario: El punto del slider muestra su producto. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Navegar a `/dynamic-catalog-slider.html` y esperar `dynamic-catalog-slider-item`<br>3) Hacer clic en `dynamic-catalog-slider-dot-4` | `dynamic-catalog-slider-item-name` = "Sauce Labs Backpack", `dynamic-catalog-slider-item-price` = "$29.99" y `dynamic-catalog-slider-dot-4` tiene `aria-current="true"` | N/A | Automatizado | P2 |
| 26 | TC-INV-DYN-008 | Dynamic Catalog | [CONFIRMACION][P3] El slider avanza automáticamente | Valida RN-INV-018. Escenario: El slider avanza automáticamente. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Navegar a `/dynamic-catalog-slider.html` y esperar `dynamic-catalog-slider-item`<br>3) Leer `dynamic-catalog-slider-item-name`<br>4) Sin interactuar, esperar con `expect.poll` (hasta 8 s) que el nombre cambie | El nombre mostrado es distinto del leído en el paso 3 antes de 8 s | N/A | Automatizado | P3 |
| 27 | TC-INV-DYN-011 | Dynamic Catalog | [CONFIRMACION][P3] Las vistas del Dynamic Catalog son de solo lectura | Valida RN-INV-020. Escenario: Las vistas del Dynamic Catalog son de solo lectura. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Navegar a `/dynamic-catalog-lazy-load.html`, `/dynamic-catalog-spinner.html` y `/dynamic-catalog-slider.html`, esperando el contenido de cada vista<br>3) En cada vista contar los botones `[data-test^="add-to-cart"]`<br>4) En Lazy Load hacer clic en la tarjeta `lazy-load-item-0` | 0 botones `add-to-cart-*` en las 3 vistas; tras el clic la URL sigue en `/dynamic-catalog-lazy-load.html` y `shopping-cart-badge` no existe | N/A | Automatizado | P3 |
| 28 | TC-INV-DYN-013 | Dynamic Catalog | [CONFIRMACION][P3] Cerrar el submenú con un segundo clic | Valida RN-INV-014. Escenario: Cerrar el submenú con un segundo clic. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Hacer clic en `#react-burger-menu-btn`; verificar `.bm-menu-wrap` con `aria-hidden="false"`<br>3) Hacer clic en `dynamic-catalog-sidebar-link` y verificar `aria-expanded="true"` y `dynamic-catalog-submenu` visible<br>4) Hacer clic de nuevo en `dynamic-catalog-sidebar-link` | `aria-expanded="false"`, `dynamic-catalog-submenu` no existe (`toHaveCount(0)`) y la URL sigue en `/inventory.html` | N/A | Automatizado | P3 |
| 29 | TC-INV-CAT-018 | Acceso sin sesión | [CONFIRMACION][P1] Catálogo sin sesión redirige al login | Valida RN-AUTH-007. Escenario: Catálogo sin sesión redirige al login. | 1) Abrir un contexto de navegador nuevo sin `storageState` y verificar con `context.cookies()` que no existe `session-username`<br>2) Navegar directamente a `{QA_BASE_URL}/inventory.html` y leer `error`<br>3) Navegar directamente a `{QA_BASE_URL}/inventory-item.html?id=1` y leer `error` | Mensajes "Epic sadface: You can only access '/inventory.html' when you are logged in." y "Epic sadface: You can only access '/inventory-item.html' when you are logged in."; `login-button` visible en ambos casos | N/A | Automatizado | P1 |
| 30 | TC-INV-DYN-009 | Acceso sin sesión | [CONFIRMACION][P1] Slider sin sesión redirige al login | Valida RN-INV-015. Escenario: Slider sin sesión redirige al login. | 1) Abrir un contexto de navegador nuevo sin `storageState` y verificar con `context.cookies()` que no existe `session-username`<br>2) Navegar directamente a `{QA_BASE_URL}/dynamic-catalog-slider.html` | `error` = "Epic sadface: You can only access '/dynamic-catalog-slider.html' when you are logged in.", `login-button` visible y `dynamic-catalog-slider-container` no existe | N/A | Automatizado | P1 |
| 31 | TC-INV-DYN-010 | Acceso sin sesión | [CONFIRMACION][P2] Lazy Load y Spinner sin sesión redirigen al login | Valida RN-INV-015. Escenario: Lazy Load y Spinner sin sesión redirigen al login. | 1) Abrir un contexto de navegador nuevo sin `storageState` y verificar con `context.cookies()` que no existe `session-username`<br>2) Navegar directamente a `{QA_BASE_URL}/dynamic-catalog-lazy-load.html` y leer `error`<br>3) Navegar directamente a `{QA_BASE_URL}/dynamic-catalog-spinner.html` y leer `error` | Para cada ruta `error` = "Epic sadface: You can only access '{ruta}' when you are logged in." con `{ruta}` = ruta pedida, y `login-button` visible | N/A | Automatizado | P2 |
| 32 | TC-INV-CAT-019 | Comportamiento por usuario | [REGRESION][P2] problem_user ve la imagen propia de cada producto | Valida RN-INV-011. Escenario: problem_user ve la imagen propia de cada producto. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_PROBLEM_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Leer el atributo `src` de las 6 imágenes `inventory-item-{slug}-img` | Ningún `src` contiene `sl-404` y cada uno contiene el archivo de su producto: `sauce-backpack`, `bike-light`, `bolt-shirt`, `sauce-pullover`, `red-onesie`, `red-tatt` | N/A | Automatizado | P2 |
| 33 | TC-INV-CAT-020 | Comportamiento por usuario | [REGRESION][P2] problem_user puede ordenar el listado | Valida RN-INV-003, RN-INV-004. Escenario: problem_user puede ordenar el listado. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_PROBLEM_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Seleccionar `za` en `product-sort-container` y leer `active-option` y los nombres<br>3) Seleccionar `lohi` y leer `active-option` y los precios | Tras `za`: `active-option` = "Name (Z to A)" y primer producto "Test.allTheThings() T-Shirt (Red)". Tras `lohi`: `active-option` = "Price (low to high)" y precios en orden no decreciente | N/A | Automatizado | P2 |
| 34 | TC-INV-CAT-021 | Comportamiento por usuario | [REGRESION][P1] problem_user puede agregar y quitar los 6 productos | Valida RN-INV-005, RN-INV-006. Escenario: problem_user puede agregar y quitar los 6 productos. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_PROBLEM_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Verificar que `shopping-cart-badge` no existe (`toHaveCount(0)`)<br>3) Hacer clic en `add-to-cart-{slug}` de los 6 productos (slugs de TC-INV-CAT-009) y verificar el badge<br>4) Hacer clic en `remove-{slug}` de los 6 productos | Tras agregar: `shopping-cart-badge` = "6" y 6 botones "Remove". Tras quitar: `shopping-cart-badge` no existe y 6 botones "Add to cart" | N/A | Automatizado | P1 |
| 35 | TC-INV-CAT-022 | Comportamiento por usuario | [REGRESION][P1] problem_user abre el detalle del producto elegido | Valida RN-INV-007. Escenario: problem_user abre el detalle del producto elegido. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_PROBLEM_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Hacer clic en `item-4-title-link`<br>3) Esperar `back-to-products` y leer la URL y el nombre | URL `/inventory-item.html?id=4`, `inventory-item-name` = "Sauce Labs Backpack" e `inventory-item-price` = "$29.99" | N/A | Automatizado | P1 |
| 36 | TC-INV-CAT-023 | Comportamiento por usuario | [REGRESION][P2] error_user puede ordenar sin errores | Valida RN-INV-003, RN-INV-004. Escenario: error_user puede ordenar sin errores. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_ERROR_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Registrar `page.on('dialog')` que guarda el mensaje y ejecuta `dialog.accept()` (sin handler el test se bloquea)<br>3) Seleccionar `za` en `product-sort-container`<br>4) Leer `active-option` y los nombres | Nombres en orden Z-A (primero "Test.allTheThings() T-Shirt (Red)", último "Sauce Labs Backpack"), `active-option` = "Name (Z to A)" y 0 diálogos registrados | N/A | Automatizado | P2 |
| 37 | TC-INV-CAT-024 | Comportamiento por usuario | [REGRESION][P1] error_user puede agregar y quitar los 6 productos | Valida RN-INV-005, RN-INV-006, RN-INV-008. Escenario: error_user puede agregar y quitar los 6 productos. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_ERROR_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Verificar que `shopping-cart-badge` no existe (`toHaveCount(0)`)<br>3) Hacer clic en `add-to-cart-{slug}` de los 6 productos (slugs de TC-INV-CAT-009) y verificar el badge<br>4) Hacer clic en `remove-{slug}` de los 6 productos | Tras agregar: `shopping-cart-badge` = "6" y 6 botones "Remove". Tras quitar: `shopping-cart-badge` no existe y 6 botones "Add to cart" | N/A | Automatizado | P1 |
| 38 | TC-INV-CAT-025 | Comportamiento por usuario | [REGRESION][P1] visual_user ve precios reales y con 2 decimales | Valida RN-INV-012. Escenario: visual_user ve precios reales y con 2 decimales. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_VISUAL_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"<br>2) Leer los 6 pares `inventory-item-name` / `inventory-item-price` del listado<br>3) Hacer clic en `item-4-title-link`, esperar `back-to-products` y leer `inventory-item-price`<br>4) Volver con `back-to-products`, hacer clic en `add-to-cart-sauce-labs-backpack`, luego en `shopping-cart-link`, y leer el precio de la fila | Los precios del listado coinciden con el catálogo de referencia (Backpack $29.99, Bike Light $9.99, Bolt T-Shirt $15.99, Fleece Jacket $49.99, Onesie $7.99, Test.allTheThings() $15.99) con formato `^\$\d+\.\d{2}$`; Backpack muestra $29.99 en listado, detalle y carrito | N/A | Automatizado | P1 |
| 39 | TC-INV-CAT-026 | Comportamiento por usuario | [REGRESION][P3] visual_user ve imágenes y controles en su posición | Valida RN-INV-011. Escenario: visual_user ve imágenes y controles en su posición. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. Ver qa/03-test-cases/TC-INV-CAT-026-visual-user-imagenes-y-controles.md. | 1) Automatizado - contexto A: Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_STANDARD_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products"; guardar `boundingBox()` de `shopping-cart-link` y una captura de `inventory-list`<br>2) Automatizado - contexto B: iniciar sesión igual con {QA_USER_VISUAL_USER_USERNAME}<br>3) Leer `src` de `inventory-item-sauce-labs-backpack-img`, `boundingBox()` de `shopping-cart-link` y las clases de los 6 botones `add-to-cart-*`; guardar una captura de `inventory-list`<br>4) Manual: comparar lado a lado las 2 capturas (imágenes, alineación de botones y del ícono del carrito) | El `src` de Backpack no contiene `sl-404`; la posición de `shopping-cart-link` es igual a la de standard_user (+/- 2 px); ningún botón tiene la clase `btn_inventory_misaligned`; la revisión manual no encuentra diferencias visuales | N/A | Ambos | P3 |
| 40 | TC-INV-CAT-027 | Comportamiento por usuario | [REGRESION][P3] performance_glitch_user ve el mismo catálogo que standard_user | Valida RN-INV-001. Escenario: performance_glitch_user ve el mismo catálogo que standard_user. | 1) Navegar a `{QA_BASE_URL}/` e iniciar sesión: {QA_USER_PERFORMANCE_GLITCH_USER_USERNAME} en `username`, {QA_USER_PASSWORD} en `password`, clic en `login-button`; verificar URL `/inventory.html` y `title` = "Products" (timeout explícito de 15 s en la espera del login)<br>2) Leer los 6 pares nombre-precio y el `src` de las 6 imágenes<br>3) Seleccionar `lohi` en `product-sort-container` y leer los nombres | Los 6 pares nombre-precio coinciden con la referencia de standard_user (TC-INV-CAT-002), ninguna imagen usa `sl-404` y tras `lohi` el orden empieza en "Sauce Labs Onesie" y termina en "Sauce Labs Fleece Jacket" | N/A | Automatizado | P3 |
| 41 | TC-INV-DYN-012 | Comportamiento por usuario | [REGRESION][P3] Dynamic Catalog con usuarios no estándar | Valida RN-INV-021, RN-INV-016 a RN-INV-019. Escenario: Dynamic Catalog con usuarios no estándar. | 1) Test parametrizado por usuario: {QA_USER_PROBLEM_USER_USERNAME}, {QA_USER_ERROR_USER_USERNAME}, {QA_USER_VISUAL_USER_USERNAME} y {QA_USER_PERFORMANCE_GLITCH_USER_USERNAME}; un contexto nuevo por usuario e inicio de sesión con {QA_USER_PASSWORD} (timeout de 15 s para performance_glitch_user)<br>2) Registrar `page.on('dialog')` y `page.on('pageerror')` antes de navegar<br>3) Hacer clic en `#react-burger-menu-btn`; verificar `.bm-menu-wrap` con `aria-hidden="false"`; si `dynamic-catalog-sidebar-link` tiene `aria-expanded="false"`, hacer clic en él; verificar `dynamic-catalog-submenu` visible; hacer clic en `dynamic-catalog-lazy-load-link` y hacer 3 scrolls hasta `dynamic-catalog-lazy-load-sentinel`<br>4) Volver a abrir el menú y hacer clic en `dynamic-catalog-spinner-link`; esperar `dynamic-catalog-spinner-grid`<br>5) Volver a abrir el menú, hacer clic en `dynamic-catalog-slider-link` y luego en `dynamic-catalog-slider-dot-4` | Para cada usuario: Lazy Load con 12 tarjetas iniciales y más de 12 tras el scroll; Spinner con 6 `spinner-item-{n}` y precios $9.99, $15.99, $7.99, $15.99, $29.99, $49.99; Slider con "Sauce Labs Backpack" $29.99 y `dynamic-catalog-slider-dot-4` con `aria-current="true"`; ninguna imagen con `sl-404`; 0 `dialog` y 0 `pageerror` | N/A | Automatizado | P3 |

## 10. Matriz de Trazabilidad

Sin tareas ADO: la matriz se construye con las reglas de negocio y flujos de la etapa 2 (sustituto indicado por el template).

| Regla / Flujo | N casos (tabla) | TC-ID |
|---|---|---|
| RN-AUTH-007 | 29 | CAT-018 |
| RN-CART-001 | 10 | CAT-009 |
| RN-INV-001 | 1, 2, 40 | CAT-001, CAT-002, CAT-027 |
| RN-INV-002 | 3, 7 | CAT-003, CAT-007 |
| RN-INV-003 | 4, 33, 36 | CAT-004, CAT-020, CAT-023 |
| RN-INV-004 | 5, 6, 33, 36 | CAT-005, CAT-006, CAT-020, CAT-023 |
| RN-INV-005 | 9, 10, 34, 37 | CAT-008, CAT-009, CAT-021, CAT-024 |
| RN-INV-006 | 11, 34, 37 | CAT-010, CAT-021, CAT-024 |
| RN-INV-007 | 14, 15, 16, 35 | CAT-011, CAT-012, CAT-013, CAT-022 |
| RN-INV-008 | 12, 13, 37 | CAT-014, CAT-015, CAT-024 |
| RN-INV-009 | 17 | CAT-016 |
| RN-INV-010 | 18 | CAT-017 |
| RN-INV-011 | 32, 39 | CAT-019, CAT-026 |
| RN-INV-012 | 2, 16, 38 | CAT-002, CAT-013, CAT-025 |
| RN-INV-013 | 8 | CAT-028 |
| RN-INV-014 | 19, 28 | DYN-001, DYN-013 |
| RN-INV-015 | 30, 31 | DYN-009, DYN-010 |
| RN-INV-016 | 20, 21, 41 | DYN-002, DYN-003, DYN-012 |
| RN-INV-017 | 23, 24, 41 | DYN-005, DYN-006, DYN-012 |
| RN-INV-018 | 25, 26, 41 | DYN-007, DYN-008, DYN-012 |
| RN-INV-019 | 22, 41 | DYN-004, DYN-012 |
| RN-INV-020 | 27 | DYN-011 |
| RN-INV-021 | 41 | DYN-012 |
| FL-INV-001 | 1, 2, 3, 4, 5, 6, 7, 8, 32, 33, 36, 38, 39, 40 | CAT-001, CAT-002, CAT-003, CAT-004, CAT-005, CAT-006, CAT-007, CAT-028, CAT-019, CAT-020, CAT-023, CAT-025, CAT-026, CAT-027 |
| FL-INV-002 | 9, 10, 11, 34, 37 | CAT-008, CAT-009, CAT-010, CAT-021, CAT-024 |
| FL-INV-003 | 12, 13, 14, 15, 16, 17, 18, 35 | CAT-014, CAT-015, CAT-011, CAT-012, CAT-013, CAT-016, CAT-017, CAT-022 |
| FL-INV-004 | 19, 20, 23, 24, 27, 28, 41 | DYN-001, DYN-002, DYN-005, DYN-006, DYN-011, DYN-013, DYN-012 |
| FL-INV-005 | 21, 22 | DYN-003, DYN-004 |
| FL-INV-006 | 25, 26 | DYN-007, DYN-008 |

La columna TC-ID muestra el código de submódulo y el número de cada TC (p. ej. `CAT-001` = `TC-INV-CAT-001`).

## 11. Notas de automatización

- Suite destino: `qa/07-automation/e2e/tests/inventory/` (un archivo por submódulo: catálogo y Dynamic Catalog).
- TC-INV-CAT-013 y TC-INV-DYN-012 se implementan como tests parametrizados (por id de producto y por usuario).
- Los TC de `problem_user`, `error_user` y `visual_user` (TC-INV-CAT-019 a 026) son candidatos DEF: se espera `test.fail()` con aserción correcta y archivo `DEF-INV-NNN` en la etapa 5 (regla 10).
- TC-INV-CAT-026 es `Ambos`: la parte por atributos y bounding box se automatiza; la comparación por screenshot es manual.
- Nombre de los tests: `[{TC-ID}] {título} @{prioridad}` (`conventions.testNamingPattern`).
- Credenciales y URL siempre desde `process.env` (regla 3); nunca escribir la contraseña en código, evidencias ni reportes.
- Los timeouts se amplían solo de forma local y explícita en los TC que lo indican; no se modifica el timeout global.

### Notas por TC (heredadas de la especificación)

| TC-ID | Nota |
|---|---|
| TC-INV-CAT-028 | Verificado en vivo en la etapa 2. Lista estática: no depende de otro registro ni genera tráfico de red (RN-INV-013, Type Dependency sin dependencia) |
| TC-INV-CAT-013 | Test parametrizado por id (0-5) |
| TC-INV-CAT-017 | Precio "$√-1" y botón operable: hallazgo REC |
| TC-INV-DYN-005 | Carga medida entre ~0.9 y ~3.6 s; esperar la grilla con timeout de 10 s |
| TC-INV-DYN-007 | Verificar inmediatamente tras el clic por el autoplay |
| TC-INV-DYN-008 | Intervalo exacto no medido |
| TC-INV-DYN-013 | Verificado en la etapa 2. El estado desplegado se conserva al cerrar y reabrir el menú lateral sin recargar: partir de un contexto nuevo |
| TC-INV-DYN-010 | Verificado en la etapa 2 para `/dynamic-catalog-lazy-load.html` y `/dynamic-catalog-spinner.html`; la URL termina en `/`, así que se asserta el mensaje y no la URL |
| TC-INV-CAT-019 | Candidato DEF: observado `sl-404` en las 6 |
| TC-INV-CAT-020 | Candidato DEF: la lista y la opción quedan en A-Z |
| TC-INV-CAT-021 | Candidato DEF: solo se agregan Backpack, Bike Light y Onesie; "Remove" no tiene efecto |
| TC-INV-CAT-022 | Candidato DEF: abre `?id=5` (Fleece Jacket); desde Fleece abre `?id=6` "ITEM NOT FOUND" |
| TC-INV-CAT-023 | Candidato DEF: alert "Sorting is broken! This error has been reported to Backtrace." y sin reorden |
| TC-INV-CAT-024 | Candidato DEF: fallan Bolt T-Shirt, Fleece Jacket y Test.allTheThings() ("Failed to add item to the cart."); "Remove" falla en listado y detalle |
| TC-INV-CAT-025 | Candidato DEF: precios aleatorios en cada carga, algunos sin decimales ("$42.8", "$3") |
| TC-INV-CAT-026 | Candidato DEF visual. Automatizable por atributos/bounding box; la comparación por screenshot queda manual |
| TC-INV-DYN-012 | Verificado en la etapa 2 con los 4 usuarios: sin desviaciones. `performance_glitch_user` requiere timeout explícito en el login (~5.1 s). Parametrizar por usuario en lugar de 4 TC separados |

## 12. Integración con Azure DevOps

No aplica: `integrations.azureDevOps.enabled` es `false` y la integración está fuera de alcance del proyecto. No se crean Test Plans, Test Suites ni Test Cases en ADO; la columna `Confirma` queda en `N/A` y la sección 10 usa reglas RN y flujos FL como sustituto de las tareas.
