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

| N | TC-ID | Suite / Área Funcional | Título | Descripción | Steps | Resultado Esperado | Confirma | Tipo | Prioridad |
|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-INV-CAT-001 | Listado y ordenamiento | [SMOKE][P0] El listado muestra 6 productos completos | Valida RN-INV-001. Escenario: El listado muestra 6 productos completos. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Abrir `/inventory.html` | Hay 6 `inventory-item`, cada uno con `inventory-item-name`, `inventory-item-desc`, `inventory-item-price`, imagen y botón "Add to cart" | N/A | Automatizado | P0 |
| 2 | TC-INV-CAT-002 | Listado y ordenamiento | [CONFIRMACION][P1] Nombres y precios coinciden con el catálogo de referencia | Valida RN-INV-001, RN-INV-012. Escenario: Nombres y precios coinciden con el catálogo de referencia. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Leer nombres y precios del listado | Coinciden con la tabla de `00-inventory.md` (Backpack $29.99 ... Test.allTheThings() $15.99) y todos tienen formato `$NN.NN` | N/A | Automatizado | P1 |
| 3 | TC-INV-CAT-003 | Listado y ordenamiento | [CONFIRMACION][P1] Orden por defecto A-Z | Valida RN-INV-002. Escenario: Orden por defecto A-Z. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Abrir `/inventory.html` | `active-option` = "Name (A to Z)" y los nombres están en orden alfabético ascendente | N/A | Automatizado | P1 |
| 4 | TC-INV-CAT-004 | Listado y ordenamiento | [CONFIRMACION][P1] Ordenar por nombre Z-A | Valida RN-INV-003. Escenario: Ordenar por nombre Z-A. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Seleccionar `za` en `product-sort-container` | Nombres en orden descendente (primero "Test.allTheThings() T-Shirt (Red)", último "Sauce Labs Backpack"); `active-option` = "Name (Z to A)" | N/A | Automatizado | P1 |
| 5 | TC-INV-CAT-005 | Listado y ordenamiento | [CONFIRMACION][P1] Ordenar por precio de menor a mayor | Valida RN-INV-004. Escenario: Ordenar por precio de menor a mayor. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Seleccionar `lohi` | Precios mostrados en orden no decreciente ($7.99 ... $49.99); `active-option` = "Price (low to high)" | N/A | Automatizado | P1 |
| 6 | TC-INV-CAT-006 | Listado y ordenamiento | [CONFIRMACION][P1] Ordenar por precio de mayor a menor | Valida RN-INV-004. Escenario: Ordenar por precio de mayor a menor. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Seleccionar `hilo` | Precios mostrados en orden no creciente ($49.99 ... $7.99); `active-option` = "Price (high to low)" | N/A | Automatizado | P1 |
| 7 | TC-INV-CAT-007 | Listado y ordenamiento | [CONFIRMACION][P3] El orden vuelve a A-Z al recargar | Valida RN-INV-002. Escenario: El orden vuelve a A-Z al recargar. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Seleccionar `hilo`<br>3) Recargar la página | `active-option` = "Name (A to Z)" | N/A | Automatizado | P3 |
| 8 | TC-INV-CAT-028 | Listado y ordenamiento | [CONFIRMACION][P3] El selector de orden ofrece las 4 opciones estáticas | Valida RN-INV-013. Escenario: El selector de orden ofrece las 4 opciones estáticas. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Abrir `/inventory.html`<br>3) Leer las opciones de `product-sort-container` | Exactamente 4 opciones, en este orden: `az` "Name (A to Z)", `za` "Name (Z to A)", `lohi` "Price (low to high)", `hilo` "Price (high to low)" | N/A | Automatizado | P3 |
| 9 | TC-INV-CAT-008 | Agregar y quitar desde el catálogo | [SMOKE][P0] Agregar un producto desde el listado | Valida RN-INV-005. Escenario: Agregar un producto desde el listado. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Verificar que el carrito está vacío (sin `shopping-cart-badge`)<br>3) Hacer clic en `add-to-cart-sauce-labs-backpack` | El botón pasa a `remove-sauce-labs-backpack` "Remove", el badge muestra "1" y `cart-contents` = `[4]` | N/A | Automatizado | P0 |
| 10 | TC-INV-CAT-009 | Agregar y quitar desde el catálogo | [CONFIRMACION][P1] Agregar los 6 productos | Valida RN-INV-005, RN-CART-001. Escenario: Agregar los 6 productos. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Verificar que el carrito está vacío (sin `shopping-cart-badge`)<br>3) Hacer clic en "Add to cart" de los 6 productos | El badge muestra "6" y los 6 botones dicen "Remove" | N/A | Automatizado | P1 |
| 11 | TC-INV-CAT-010 | Agregar y quitar desde el catálogo | [SMOKE][P0] Quitar un producto desde el listado | Valida RN-INV-006. Escenario: Quitar un producto desde el listado. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar Backpack al carrito desde el listado<br>3) Hacer clic en `remove-sauce-labs-backpack` | El botón vuelve a "Add to cart", el badge desaparece y `cart-contents` queda vacío | N/A | Automatizado | P0 |
| 12 | TC-INV-CAT-014 | Agregar y quitar desde el catálogo | [CONFIRMACION][P1] Agregar y quitar desde el detalle | Valida RN-INV-008. Escenario: Agregar y quitar desde el detalle. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Verificar que el carrito está vacío (sin `shopping-cart-badge`)<br>3) Abrir `/inventory-item.html?id=4`<br>4) Hacer clic en `add-to-cart`<br>5) Hacer clic en `remove` | Tras agregar: botón `remove` y badge "1". Tras quitar: botón `add-to-cart` y badge ausente | N/A | Automatizado | P1 |
| 13 | TC-INV-CAT-015 | Agregar y quitar desde el catálogo | [CONFIRMACION][P2] El detalle refleja un producto que ya está en el carrito | Valida RN-INV-008. Escenario: El detalle refleja un producto que ya está en el carrito. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Agregar Backpack al carrito desde el listado<br>3) Abrir el detalle de Backpack | Se muestra el botón `remove` "Remove" | N/A | Automatizado | P2 |
| 14 | TC-INV-CAT-011 | Detalle de producto | [CONFIRMACION][P1] El nombre abre el detalle del mismo producto | Valida RN-INV-007. Escenario: El nombre abre el detalle del mismo producto. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Hacer clic en `item-4-title-link` | URL `/inventory-item.html?id=4` con nombre "Sauce Labs Backpack" y precio "$29.99" | N/A | Automatizado | P1 |
| 15 | TC-INV-CAT-012 | Detalle de producto | [CONFIRMACION][P2] La imagen abre el detalle del mismo producto | Valida RN-INV-007. Escenario: La imagen abre el detalle del mismo producto. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Hacer clic en `item-0-img-link` | URL `/inventory-item.html?id=0` con nombre "Sauce Labs Bike Light" | N/A | Automatizado | P2 |
| 16 | TC-INV-CAT-013 | Detalle de producto | [CONFIRMACION][P1] El detalle muestra los mismos datos que el listado para los 6 productos | Valida RN-INV-007, RN-INV-012. Escenario: El detalle muestra los mismos datos que el listado para los 6 productos. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Para cada producto: leer nombre, descripción y precio en el listado<br>3) Abrir su detalle desde el nombre | Nombre, descripción y precio del detalle son idénticos a los del listado | N/A | Automatizado | P1 |
| 17 | TC-INV-CAT-016 | Detalle de producto | [CONFIRMACION][P2] Volver al listado desde el detalle | Valida RN-INV-009. Escenario: Volver al listado desde el detalle. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Navegar a `/inventory-item.html?id=4`<br>3) Hacer clic en `back-to-products` | Navega a `/inventory.html` | N/A | Automatizado | P2 |
| 18 | TC-INV-CAT-017 | Detalle de producto | [CONFIRMACION][P3] Detalle de un producto inexistente | Valida RN-INV-010. Escenario: Detalle de un producto inexistente. Hallazgo REC asociado (no altera la aserción). | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Navegar a `/inventory-item.html?id=99` | Se muestra "ITEM NOT FOUND" | N/A | Automatizado | P3 |
| 19 | TC-INV-DYN-001 | Dynamic Catalog | [CONFIRMACION][P2] Desplegar el submenú Dynamic Catalog | Valida RN-INV-014. Escenario: Desplegar el submenú Dynamic Catalog. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Hacer clic en `#react-burger-menu-btn` para abrir el menú lateral<br>3) Hacer clic en `dynamic-catalog-sidebar-link` | `aria-expanded="true"` y `dynamic-catalog-submenu` visible con "Lazy Load", "Spinner" y "Slider"; la URL no cambia | N/A | Automatizado | P2 |
| 20 | TC-INV-DYN-002 | Dynamic Catalog | [CONFIRMACION][P2] Abrir Lazy Load | Valida RN-INV-016. Escenario: Abrir Lazy Load. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Abrir el menú lateral, desplegar "Dynamic Catalog" y hacer clic en `dynamic-catalog-lazy-load-link` | URL `/dynamic-catalog-lazy-load.html`, título "Dynamic Catalog - Lazy Load" y 12 tarjetas `lazy-load-item-{n}` (4 con placeholder "Loading...") | N/A | Automatizado | P2 |
| 21 | TC-INV-DYN-003 | Dynamic Catalog | [CONFIRMACION][P2] El scroll carga más productos | Valida RN-INV-016. Escenario: El scroll carga más productos. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Navegar a la vista Lazy Load (`/dynamic-catalog-lazy-load.html`)<br>3) Hacer scroll hasta `dynamic-catalog-lazy-load-sentinel`<br>4) Repetir | La cantidad de tarjetas con nombre supera 12 y las tarjetas cargadas no tienen placeholder | N/A | Automatizado | P2 |
| 22 | TC-INV-DYN-004 | Dynamic Catalog | [CONFIRMACION][P3] Precios de Lazy Load iguales al catálogo | Valida RN-INV-019. Escenario: Precios de Lazy Load iguales al catálogo. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Navegar a la vista Lazy Load y esperar que carguen los productos<br>3) Leer nombre y precio de cada tarjeta | Cada producto o variante de talla tiene el precio de su producto base | N/A | Automatizado | P3 |
| 23 | TC-INV-DYN-005 | Dynamic Catalog | [CONFIRMACION][P2] Spinner visible durante la carga | Valida RN-INV-017. Escenario: Spinner visible durante la carga. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Abrir el menú lateral, desplegar "Dynamic Catalog" y hacer clic en `dynamic-catalog-spinner-link` | Se ve `dynamic-catalog-spinner` y luego `dynamic-catalog-spinner-grid` con 6 `spinner-item-{n}`; título "Dynamic Catalog - Spinner" | N/A | Automatizado | P2 |
| 24 | TC-INV-DYN-006 | Dynamic Catalog | [CONFIRMACION][P3] El spinner reaparece al recargar | Valida RN-INV-017. Escenario: El spinner reaparece al recargar. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Navegar a la vista Spinner y esperar que carguen los productos<br>3) Recargar la página | Se vuelve a ver `dynamic-catalog-spinner` antes de la grilla | N/A | Automatizado | P3 |
| 25 | TC-INV-DYN-007 | Dynamic Catalog | [CONFIRMACION][P2] El punto del slider muestra su producto | Valida RN-INV-018. Escenario: El punto del slider muestra su producto. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Navegar a `/dynamic-catalog-slider.html`<br>3) Hacer clic en `dynamic-catalog-slider-dot-4` | Se muestra "Sauce Labs Backpack" $29.99 y el punto 4 tiene `aria-current="true"` | N/A | Automatizado | P2 |
| 26 | TC-INV-DYN-008 | Dynamic Catalog | [CONFIRMACION][P3] El slider avanza automáticamente | Valida RN-INV-018. Escenario: El slider avanza automáticamente. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Navegar a la vista Slider (`/dynamic-catalog-slider.html`)<br>3) Leer el producto actual<br>4) Esperar 6 s sin interactuar | El producto mostrado cambió | N/A | Automatizado | P3 |
| 27 | TC-INV-DYN-011 | Dynamic Catalog | [CONFIRMACION][P3] Las vistas del Dynamic Catalog son de solo lectura | Valida RN-INV-020. Escenario: Las vistas del Dynamic Catalog son de solo lectura. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Abrir las 3 vistas<br>3) Hacer clic en una tarjeta de Lazy Load | No hay botones `add-to-cart-*`; el clic en la tarjeta no cambia la URL | N/A | Automatizado | P3 |
| 28 | TC-INV-DYN-013 | Dynamic Catalog | [CONFIRMACION][P3] Cerrar el submenú con un segundo clic | Valida RN-INV-014. Escenario: Cerrar el submenú con un segundo clic. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Abrir el menú lateral y hacer clic en "Dynamic Catalog" para desplegar el submenú<br>3) Clic de nuevo en `dynamic-catalog-sidebar-link` | `aria-expanded="false"`, `dynamic-catalog-submenu` ya no está en el DOM (`toHaveCount(0)`) y la URL no cambia | N/A | Automatizado | P3 |
| 29 | TC-INV-CAT-018 | Acceso sin sesión | [CONFIRMACION][P1] Catálogo sin sesión redirige al login | Valida RN-AUTH-007. Escenario: Catálogo sin sesión redirige al login. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Navegar a `/inventory.html` y a `/inventory-item.html?id=1` | Login con el error de ruta protegida en ambos casos | N/A | Automatizado | P1 |
| 30 | TC-INV-DYN-009 | Acceso sin sesión | [CONFIRMACION][P1] Slider sin sesión redirige al login | Valida RN-INV-015. Escenario: Slider sin sesión redirige al login. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Navegar a `/dynamic-catalog-slider.html` | Login con "Epic sadface: You can only access '/dynamic-catalog-slider.html' when you are logged in." | N/A | Automatizado | P1 |
| 31 | TC-INV-DYN-010 | Acceso sin sesión | [CONFIRMACION][P2] Lazy Load y Spinner sin sesión redirigen al login | Valida RN-INV-015. Escenario: Lazy Load y Spinner sin sesión redirigen al login. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Navegar a `/dynamic-catalog-lazy-load.html` y a `/dynamic-catalog-spinner.html` | Para cada ruta se muestra el login con "Epic sadface: You can only access '{ruta}' when you are logged in.", donde `{ruta}` es la ruta pedida | N/A | Automatizado | P2 |
| 32 | TC-INV-CAT-019 | Comportamiento por usuario | [REGRESION][P2] problem_user ve la imagen propia de cada producto | Valida RN-INV-011. Escenario: problem_user ve la imagen propia de cada producto. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_PROBLEM_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Leer el `src` de las 6 imágenes del listado | Ninguna imagen usa `sl-404`; cada `src` corresponde a su producto | N/A | Automatizado | P2 |
| 33 | TC-INV-CAT-020 | Comportamiento por usuario | [REGRESION][P2] problem_user puede ordenar el listado | Valida RN-INV-003, RN-INV-004. Escenario: problem_user puede ordenar el listado. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_PROBLEM_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Seleccionar `za`, luego `lohi` | El orden y `active-option` cambian según la opción | N/A | Automatizado | P2 |
| 34 | TC-INV-CAT-021 | Comportamiento por usuario | [REGRESION][P1] problem_user puede agregar y quitar los 6 productos | Valida RN-INV-005, RN-INV-006. Escenario: problem_user puede agregar y quitar los 6 productos. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_PROBLEM_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Verificar que el carrito está vacío (sin `shopping-cart-badge`)<br>3) Hacer clic en "Add to cart" de los 6 productos<br>4) Hacer clic en "Remove" de los 6 | Badge "6" tras agregar y ausente tras quitar | N/A | Automatizado | P1 |
| 35 | TC-INV-CAT-022 | Comportamiento por usuario | [REGRESION][P1] problem_user abre el detalle del producto elegido | Valida RN-INV-007. Escenario: problem_user abre el detalle del producto elegido. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_PROBLEM_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Hacer clic en `item-4-title-link` | URL `?id=4` y nombre "Sauce Labs Backpack" | N/A | Automatizado | P1 |
| 36 | TC-INV-CAT-023 | Comportamiento por usuario | [REGRESION][P2] error_user puede ordenar sin errores | Valida RN-INV-003, RN-INV-004. Escenario: error_user puede ordenar sin errores. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_ERROR_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Registrar handler de `dialog`<br>3) Seleccionar `za` | La lista se ordena Z-A y no aparece ningún diálogo | N/A | Automatizado | P2 |
| 37 | TC-INV-CAT-024 | Comportamiento por usuario | [REGRESION][P1] error_user puede agregar y quitar los 6 productos | Valida RN-INV-005, RN-INV-006, RN-INV-008. Escenario: error_user puede agregar y quitar los 6 productos. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_ERROR_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Verificar que el carrito está vacío (sin `shopping-cart-badge`)<br>3) Agregar los 6 productos desde el listado<br>4) Quitar los 6 | Badge "6" tras agregar y ausente tras quitar | N/A | Automatizado | P1 |
| 38 | TC-INV-CAT-025 | Comportamiento por usuario | [REGRESION][P1] visual_user ve precios reales y con 2 decimales | Valida RN-INV-012. Escenario: visual_user ve precios reales y con 2 decimales. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_VISUAL_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Leer los precios del listado<br>3) Comparar con el detalle y el carrito | Los precios coinciden con el catálogo ($29.99, $9.99, ...) y tienen formato `$NN.NN` | N/A | Automatizado | P1 |
| 39 | TC-INV-CAT-026 | Comportamiento por usuario | [REGRESION][P3] visual_user ve imágenes y controles en su posición | Valida RN-INV-011. Escenario: visual_user ve imágenes y controles en su posición. Candidato DEF conocido: se espera `test.fail()` con aserción de la regla y archivo DEF en la etapa 5. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_VISUAL_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Comparar la imagen de Backpack, la posición de `shopping-cart-link` y las clases de los botones con standard_user | Imagen propia de Backpack, carrito en la misma posición que standard_user y ningún botón con clase `btn_inventory_misaligned` | N/A | Ambos | P3 |
| 40 | TC-INV-CAT-027 | Comportamiento por usuario | [REGRESION][P3] performance_glitch_user ve el mismo catálogo que standard_user | Valida RN-INV-001. Escenario: performance_glitch_user ve el mismo catálogo que standard_user. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_PERFORMANCE_GLITCH_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Leer nombres, precios e imágenes; ordenar por `lohi` | Idénticos a standard_user | N/A | Automatizado | P3 |
| 41 | TC-INV-DYN-012 | Comportamiento por usuario | [REGRESION][P3] Dynamic Catalog con usuarios no estándar | Valida RN-INV-021, RN-INV-016 a RN-INV-019. Escenario: Dynamic Catalog con usuarios no estándar. | 1) Abrir un contexto por usuario e iniciar sesión con {QA_USER_PROBLEM_USER_USERNAME}, {QA_USER_ERROR_USER_USERNAME}, {QA_USER_VISUAL_USER_USERNAME} y {QA_USER_PERFORMANCE_GLITCH_USER_USERNAME} (contraseña {QA_USER_PASSWORD})<br>2) Registrar listener `page.on('dialog')` y `page.on('pageerror')`<br>3) Abrir Lazy Load desde el menú y hacer 3 scrolls hasta el centinela<br>4) Abrir Spinner y esperar la grilla<br>5) Abrir Slider y hacer clic en `dynamic-catalog-slider-dot-4` | Para cada usuario: Lazy Load con 12 tarjetas iniciales y más de 12 tras el scroll; Spinner con los 6 productos y sus precios de referencia ($9.99, $15.99, $7.99, $15.99, $29.99, $49.99); Slider muestra "Sauce Labs Backpack" $29.99 con el punto 4 en `aria-current="true"`; ninguna imagen con `sl-404`; ningún `alert` ni `pageerror` | N/A | Automatizado | P3 |

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
