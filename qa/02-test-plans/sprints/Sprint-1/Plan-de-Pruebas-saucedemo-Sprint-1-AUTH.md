# Plan de Pruebas - saucedemo - Sprint 1 - Autenticación

**Proyecto:** saucedemo (Swag Labs)
**Sprint:** 1
**Módulo:** Autenticación
**Código módulo:** AUTH
**Submódulos:** Login y sesión (LOG)
**Fecha planificación:** 2026-11-21
**Ventana QA:** por definir (`sprintCycle` deshabilitado en `qa/qa-framework.config.json`)
**ADO Test Plan:** No aplica (integración con Azure DevOps fuera de alcance; `integrations.azureDevOps.enabled: false`)
**Fuente:** `qa/01-specifications/module-auth/submodule-login/05-test-scenarios.md` (etapa 2)

---

## 1. Objetivo

Verificar que el inicio de sesión, los mensajes de error, el bloqueo de usuarios, la protección de rutas internas, el logout y la expiración de la sesión de Swag Labs cumplen las reglas RN-AUTH-001 a RN-AUTH-012 especificadas en la etapa 2, para los 6 usuarios de prueba publicados por el sitio.

## 2. Alcance

### En alcance

- Formulario de login: campos obligatorios, credenciales inválidas, sensibilidad a mayúsculas y espacios, cierre del mensaje de error, enmascarado de la contraseña
- Usuario bloqueado (`locked_out_user`) y login de los 5 usuarios habilitados
- Protección de rutas internas sin sesión y validación de la cookie `session-username`
- Logout, botón Atrás tras el logout y expiración absoluta de la sesión (600 s)
- Ayuda de credenciales visible en la página de login (sin afirmar el valor de la contraseña)

Total en alcance: **24 TC** (todos los TC de `05-test-scenarios.md` del submódulo).

### Fuera de alcance

- Robustez del campo usuario sin longitud máxima (registrado como REC, no como TC)
- Seguridad de la cookie forjada con `standard_user` (hallazgo REC: la app es una demo sin backend)
- Integración con Azure DevOps (Test Plans, Test Suites, Bugs): no aplica en este proyecto
- Pruebas de carga (k6) y track de API: la aplicación no expone API propia
- Navegadores distintos de Chromium (`integrations.playwright.browsers`)

## 3. Items del Sprint (normalizados)

Sin tareas ADO: los items del sprint son las reglas de negocio (RN) y los flujos (FL) especificados en la etapa 2. Los números de TC son el sufijo de `TC-{MODULO}-{SUB}-NNN`.

### Login y sesión (LOG)

| Item | Título | TC (spec) |
|---|---|---|
| RN-AUTH-001 | Usuario obligatorio | 003, 005, 012 |
| RN-AUTH-002 | Contraseña obligatoria | 004 |
| RN-AUTH-003 | Credenciales inválidas | 006, 007 |
| RN-AUTH-004 | Usuario sensible a mayúsculas y espacios | 008, 009 |
| RN-AUTH-005 | Usuario bloqueado | 010 |
| RN-AUTH-006 | Login exitoso | 001, 002, 016, 019, 020, 021 |
| RN-AUTH-007 | Rutas internas protegidas | 014, 015, 016, 022 |
| RN-AUTH-008 | Cierre del mensaje de error | 011 |
| RN-AUTH-009 | Logout termina la sesión | 017, 018 |
| RN-AUTH-010 | Contraseña enmascarada | 013 |
| RN-AUTH-011 | Expiración de la sesión | 023 |
| RN-AUTH-012 | Ayuda de credenciales en la página de login | 024 |
| FL-AUTH-001 | Login exitoso | 001, 002, 003, 004, 005, 006, 007, 008, 009, 010, 012, 013, 019, 020, 021, 024 |
| FL-AUTH-002 | Corrección tras un error de login | 011 |
| FL-AUTH-003 | Acceso directo a una ruta protegida sin sesión | 014, 015, 016, 022, 023 |
| FL-AUTH-004 | Logout | 017, 018 |

## 4. Priorización

| Prioridad | Criterio | TC | Automatizado | Ambos | Manual |
|---|---|---|---|---|---|
| P0 | Happy path o riesgo bloqueante | 4 | 4 | 0 | 0 |
| P1 | Negativo común, transición de estado, acceso, regresión por usuario relevante | 8 | 8 | 0 | 0 |
| P2 | Funcionalidad secundaria o regresión adyacente | 8 | 8 | 0 | 0 |
| P3 | Caso borde, cosmético o de baja frecuencia | 4 | 4 | 0 | 0 |
| **Total** | | **24** | **24** | **0** | **0** |

Candidatos DEF conocidos de las etapas 1 y 2 en este módulo: **0**. Se ejecutan con la aserción de la regla; si la desviación se confirma, la etapa 5 los marca con `test.fail()` y crea el archivo `DEF-AUTH-NNN` (regla 10).

## 5. TestSuites (agrupación funcional)

Agrupación por área funcional. Sin ADO, cada suite se corresponde con un bloque `test.describe()` en la etapa 5.

| Suite | TC | P0 | P1 | P2 | P3 | N (tabla) |
|---|---|---|---|---|---|---|
| Login y acceso exitoso | 6 | 1 | 1 | 4 | 0 | 1-6 |
| Validaciones y mensajes de error | 11 | 0 | 5 | 3 | 3 | 7-17 |
| Usuario bloqueado y rutas protegidas | 4 | 2 | 1 | 1 | 0 | 18-21 |
| Logout y ciclo de vida de la sesión | 3 | 1 | 1 | 0 | 1 | 22-24 |

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
| standard_user | `QA_USER_STANDARD_USER_USERNAME` | Referencia funcional: todas las reglas deben cumplirse | 11 (LOG-001, LOG-002, LOG-004, LOG-007, LOG-008, LOG-009, LOG-016, LOG-017, LOG-018, LOG-021, LOG-023) |
| locked_out_user | `QA_USER_LOCKED_OUT_USER_USERNAME` | El login debe ser rechazado con el mensaje de usuario bloqueado | 2 (LOG-010, LOG-022) |
| problem_user | `QA_USER_PROBLEM_USER_USERNAME` | Defectos funcionales intencionales en catálogo, checkout y menú | 1 (LOG-019) |
| performance_glitch_user | `QA_USER_PERFORMANCE_GLITCH_USER_USERNAME` | Demora intencional de ~5 s en el login; resto funcional | 2 (LOG-019, LOG-020) |
| error_user | `QA_USER_ERROR_USER_USERNAME` | Errores JS intencionales al ordenar, agregar/quitar y finalizar | 1 (LOG-019) |
| visual_user | `QA_USER_VISUAL_USER_USERNAME` | Defectos visuales intencionales (precios del listado, imagen, posiciones) | 1 (LOG-019) |

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
| `performance_glitch_user` tarda ~5.2 s en el login y puede superar timeouts por defecto | Media | Timeout explícito de 15 s solo en esos tests (TC-AUTH-LOG-020); no subir el timeout global |
| La expiración real de la sesión exige esperar 10 minutos | Alta | TC-AUTH-LOG-023 valida el atributo `expires` y simula el vencimiento borrando la cookie |
| La contraseña publicada en la página de login podría filtrarse en asserts o evidencias | Media | Leer siempre `process.env.QA_USER_PASSWORD`; TC-AUTH-LOG-024 no afirma su valor (regla 3) |

## 9. Tabla de Pruebas

Etiquetas: `[SMOKE]` happy path P0, `[CONFIRMACION]` confirma una regla RN, `[REGRESION]` comportamiento por usuario o vista adyacente. `Confirma` = `N/A` en todas las filas (sin tareas ADO); la regla cubierta se indica en la descripción y en la sección 10.

| N | TC-ID | Suite / Área Funcional | Título | Descripción | Steps | Resultado Esperado | Confirma | Tipo | Prioridad |
|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-AUTH-LOG-001 | Login y acceso exitoso | [SMOKE][P0] Login exitoso con standard_user | Valida RN-AUTH-006. Escenario: Login exitoso con standard_user. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Abrir `{QA_BASE_URL}/`<br>3) Ingresar {QA_USER_STANDARD_USER_USERNAME} en `username`<br>4) Ingresar {QA_USER_PASSWORD} en `password`<br>5) Hacer clic en `login-button` | La URL es `/inventory.html`, `data-test="title"` muestra "Products" y no hay `data-test="error"` | N/A | Automatizado | P0 |
| 2 | TC-AUTH-LOG-002 | Login y acceso exitoso | [CONFIRMACION][P2] Login enviando el formulario con la tecla Enter | Valida RN-AUTH-006. Escenario: Login enviando el formulario con la tecla Enter. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Completar usuario y contraseña válidos<br>3) Presionar Enter en el campo `password` | Navega a `/inventory.html` | N/A | Automatizado | P2 |
| 3 | TC-AUTH-LOG-016 | Login y acceso exitoso | [CONFIRMACION][P2] Login después de intentar acceder a una ruta protegida | Valida RN-AUTH-006, RN-AUTH-007. Escenario: Login después de intentar acceder a una ruta protegida. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Navegar a `/cart.html`<br>3) Iniciar sesión con credenciales válidas en el formulario mostrado | Navega a `/inventory.html` (no a la ruta solicitada) | N/A | Automatizado | P2 |
| 4 | TC-AUTH-LOG-019 | Login y acceso exitoso | [CONFIRMACION][P1] Login de los usuarios habilitados no estándar | Valida RN-AUTH-006. Escenario: Login de los usuarios habilitados no estándar. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Para `problem_user`, `performance_glitch_user`, `error_user` y `visual_user` (env vars {QA_USER_*_USERNAME}): iniciar sesión | Cada usuario llega a `/inventory.html` con "Products" | N/A | Automatizado | P1 |
| 5 | TC-AUTH-LOG-020 | Login y acceso exitoso | [REGRESION][P2] performance_glitch_user inicia sesión pese a la demora | Valida RN-AUTH-006. Escenario: performance_glitch_user inicia sesión pese a la demora. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Iniciar sesión con {QA_USER_PERFORMANCE_GLITCH_USER_USERNAME}<br>3) Esperar la navegación con timeout de 15 s | Llega a `/inventory.html` dentro del timeout | N/A | Automatizado | P2 |
| 6 | TC-AUTH-LOG-021 | Login y acceso exitoso | [CONFIRMACION][P2] Cookie de sesión creada con el nombre del usuario | Valida RN-AUTH-006. Escenario: Cookie de sesión creada con el nombre del usuario. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Iniciar sesión con standard_user<br>3) Leer las cookies del contexto | Existe `session-username` con valor igual al usuario logueado | N/A | Automatizado | P2 |
| 7 | TC-AUTH-LOG-003 | Validaciones y mensajes de error | [CONFIRMACION][P1] Usuario y contraseña vacíos | Valida RN-AUTH-001. Escenario: Usuario y contraseña vacíos. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Abrir el login<br>3) Hacer clic en `login-button` sin completar campos | Se muestra "Epic sadface: Username is required" y la URL sigue en `/` | N/A | Automatizado | P1 |
| 8 | TC-AUTH-LOG-004 | Validaciones y mensajes de error | [CONFIRMACION][P1] Contraseña vacía | Valida RN-AUTH-002. Escenario: Contraseña vacía. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Ingresar un usuario válido<br>3) Dejar `password` vacío<br>4) Hacer clic en `login-button` | Se muestra "Epic sadface: Password is required" | N/A | Automatizado | P1 |
| 9 | TC-AUTH-LOG-005 | Validaciones y mensajes de error | [CONFIRMACION][P1] Usuario vacío con contraseña informada | Valida RN-AUTH-001. Escenario: Usuario vacío con contraseña informada. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Dejar `username` vacío<br>3) Ingresar cualquier contraseña<br>4) Hacer clic en `login-button` | Se muestra "Epic sadface: Username is required" | N/A | Automatizado | P1 |
| 10 | TC-AUTH-LOG-006 | Validaciones y mensajes de error | [CONFIRMACION][P1] Usuario inexistente | Valida RN-AUTH-003. Escenario: Usuario inexistente. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Ingresar `qa_user_${EXEC_IDX}` como usuario<br>3) Ingresar {QA_USER_PASSWORD}<br>4) Hacer clic en `login-button` | Se muestra "Epic sadface: Username and password do not match any user in this service" | N/A | Automatizado | P1 |
| 11 | TC-AUTH-LOG-007 | Validaciones y mensajes de error | [CONFIRMACION][P1] Contraseña incorrecta para un usuario válido | Valida RN-AUTH-003. Escenario: Contraseña incorrecta para un usuario válido. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Ingresar {QA_USER_STANDARD_USER_USERNAME}<br>3) Ingresar `invalid_${EXEC_IDX}` como contraseña<br>4) Hacer clic en `login-button` | Mismo mensaje genérico de RN-AUTH-003; no se indica cuál dato es incorrecto | N/A | Automatizado | P1 |
| 12 | TC-AUTH-LOG-008 | Validaciones y mensajes de error | [CONFIRMACION][P2] Usuario en mayúsculas es rechazado | Valida RN-AUTH-004. Escenario: Usuario en mayúsculas es rechazado. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Ingresar el usuario estándar en mayúsculas<br>3) Ingresar {QA_USER_PASSWORD}<br>4) Hacer clic en `login-button` | Se muestra el mensaje de RN-AUTH-003 y no se crea sesión | N/A | Automatizado | P2 |
| 13 | TC-AUTH-LOG-009 | Validaciones y mensajes de error | [CONFIRMACION][P3] Usuario con espacio inicial es rechazado | Valida RN-AUTH-004. Escenario: Usuario con espacio inicial es rechazado. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Ingresar " " + usuario estándar<br>3) Ingresar {QA_USER_PASSWORD}<br>4) Hacer clic en `login-button` | Se muestra el mensaje de RN-AUTH-003 | N/A | Automatizado | P3 |
| 14 | TC-AUTH-LOG-011 | Validaciones y mensajes de error | [CONFIRMACION][P2] Cerrar el mensaje de error | Valida RN-AUTH-008. Escenario: Cerrar el mensaje de error. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Hacer clic en `login-button` con los campos vacíos para mostrar el error<br>3) Hacer clic en `error-button` | Desaparecen `data-test="error"` y los iconos `.error_icon` | N/A | Automatizado | P2 |
| 15 | TC-AUTH-LOG-012 | Validaciones y mensajes de error | [CONFIRMACION][P3] Campos marcados visualmente ante un error | Valida RN-AUTH-001. Escenario: Campos marcados visualmente ante un error. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Hacer clic en `login-button` con campos vacíos | Se muestran 2 iconos `.error_icon` y `username` tiene la clase `input_error` | N/A | Automatizado | P3 |
| 16 | TC-AUTH-LOG-013 | Validaciones y mensajes de error | [CONFIRMACION][P2] La contraseña se muestra enmascarada | Valida RN-AUTH-010. Escenario: La contraseña se muestra enmascarada. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Ingresar texto en `password` | El input tiene `type="password"` | N/A | Automatizado | P2 |
| 17 | TC-AUTH-LOG-024 | Validaciones y mensajes de error | [CONFIRMACION][P3] La página de login lista los usuarios aceptados | Valida RN-AUTH-012. Escenario: La página de login lista los usuarios aceptados. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Abrir el login | `login-credentials` contiene "Accepted usernames are:" y los 6 usuarios; `login-password` contiene "Password for all users:" | N/A | Automatizado | P3 |
| 18 | TC-AUTH-LOG-010 | Usuario bloqueado y rutas protegidas | [SMOKE][P0] Usuario bloqueado no puede iniciar sesión | Valida RN-AUTH-005. Escenario: Usuario bloqueado no puede iniciar sesión. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Ingresar {QA_USER_LOCKED_OUT_USER_USERNAME}<br>3) Ingresar {QA_USER_PASSWORD}<br>4) Hacer clic en `login-button` | Se muestra "Epic sadface: Sorry, this user has been locked out.", la URL sigue en `/` y no existe la cookie `session-username` | N/A | Automatizado | P0 |
| 19 | TC-AUTH-LOG-014 | Usuario bloqueado y rutas protegidas | [SMOKE][P0] Acceso sin sesión a /inventory.html | Valida RN-AUTH-007. Escenario: Acceso sin sesión a /inventory.html. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Navegar directamente a `{QA_BASE_URL}/inventory.html` | No se muestra el catálogo; se ve el formulario de login con "Epic sadface: You can only access '/inventory.html' when you are logged in." | N/A | Automatizado | P0 |
| 20 | TC-AUTH-LOG-015 | Usuario bloqueado y rutas protegidas | [CONFIRMACION][P1] Acceso sin sesión al resto de rutas internas | Valida RN-AUTH-007. Escenario: Acceso sin sesión al resto de rutas internas. | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Para cada ruta `/cart.html`, `/checkout-step-one.html`, `/checkout-step-two.html`, `/checkout-complete.html`, `/inventory-item.html?id=4`: navegar directamente | En cada caso se muestra el login con "You can only access '{ruta}' when you are logged in." (sin query string para el detalle) | N/A | Automatizado | P1 |
| 21 | TC-AUTH-LOG-022 | Usuario bloqueado y rutas protegidas | [CONFIRMACION][P2] Cookie de sesión con usuario bloqueado o inexistente es rechazada | Valida RN-AUTH-007. Escenario: Cookie de sesión con usuario bloqueado o inexistente es rechazada. Hallazgo REC asociado (no altera la aserción). | 1) Abrir un contexto de navegador nuevo, sin cookie `session-username`<br>2) Crear la cookie `session-username=locked_out_user`<br>3) Navegar a `/inventory.html`<br>4) Repetir con un usuario inexistente | En ambos casos se muestra el login con el error de ruta protegida | N/A | Automatizado | P2 |
| 22 | TC-AUTH-LOG-017 | Logout y ciclo de vida de la sesión | [SMOKE][P0] Logout cierra la sesión | Valida RN-AUTH-009. Escenario: Logout cierra la sesión. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Abrir el menú (`#react-burger-menu-btn`)<br>3) Hacer clic en `logout-sidebar-link` | La URL es `/`, el formulario está vacío y la cookie `session-username` ya no existe | N/A | Automatizado | P0 |
| 23 | TC-AUTH-LOG-018 | Logout y ciclo de vida de la sesión | [CONFIRMACION][P1] Atrás del navegador tras el logout no muestra contenido | Valida RN-AUTH-009. Escenario: Atrás del navegador tras el logout no muestra contenido. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Hacer logout desde el menú lateral estando en `/inventory.html`<br>3) Presionar Atrás en el navegador | Se muestra el login con el error de ruta protegida para `/inventory.html` | N/A | Automatizado | P1 |
| 24 | TC-AUTH-LOG-023 | Logout y ciclo de vida de la sesión | [CONFIRMACION][P3] Expiración de la sesión a los 10 minutos | Valida RN-AUTH-011. Escenario: Expiración de la sesión a los 10 minutos. | 1) Iniciar sesión en {QA_BASE_URL}/ con usuario {QA_USER_STANDARD_USER_USERNAME} y contraseña {QA_USER_PASSWORD}<br>2) Leer la cookie `session-username` con `context.cookies()` y verificar que `expires` está entre 590 y 610 s después del login<br>3) Simular el vencimiento: `context.clearCookies({ name: 'session-username' })` (equivale a lo que hace el navegador al vencer el plazo)<br>4) Navegar a `/cart.html` | La cookie expira 600 s (+/- 10 s) después del login y, sin ella, se muestra el login con "Epic sadface: You can only access '/cart.html' when you are logged in." | N/A | Automatizado | P3 |

## 10. Matriz de Trazabilidad

Sin tareas ADO: la matriz se construye con las reglas de negocio y flujos de la etapa 2 (sustituto indicado por el template).

| Regla / Flujo | N casos (tabla) | TC-ID |
|---|---|---|
| RN-AUTH-001 | 7, 9, 15 | LOG-003, LOG-005, LOG-012 |
| RN-AUTH-002 | 8 | LOG-004 |
| RN-AUTH-003 | 10, 11 | LOG-006, LOG-007 |
| RN-AUTH-004 | 12, 13 | LOG-008, LOG-009 |
| RN-AUTH-005 | 18 | LOG-010 |
| RN-AUTH-006 | 1, 2, 3, 4, 5, 6 | LOG-001, LOG-002, LOG-016, LOG-019, LOG-020, LOG-021 |
| RN-AUTH-007 | 3, 19, 20, 21 | LOG-016, LOG-014, LOG-015, LOG-022 |
| RN-AUTH-008 | 14 | LOG-011 |
| RN-AUTH-009 | 22, 23 | LOG-017, LOG-018 |
| RN-AUTH-010 | 16 | LOG-013 |
| RN-AUTH-011 | 24 | LOG-023 |
| RN-AUTH-012 | 17 | LOG-024 |
| FL-AUTH-001 | 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18 | LOG-001, LOG-002, LOG-019, LOG-020, LOG-021, LOG-003, LOG-004, LOG-005, LOG-006, LOG-007, LOG-008, LOG-009, LOG-012, LOG-013, LOG-024, LOG-010 |
| FL-AUTH-002 | 14 | LOG-011 |
| FL-AUTH-003 | 3, 19, 20, 21, 24 | LOG-016, LOG-014, LOG-015, LOG-022, LOG-023 |
| FL-AUTH-004 | 22, 23 | LOG-017, LOG-018 |

La columna TC-ID muestra el código de submódulo y el número de cada TC (p. ej. `LOG-001` = `TC-AUTH-LOG-001`).

## 11. Notas de automatización

- Suite destino: `qa/07-automation/e2e/tests/auth/`. TC-AUTH-LOG-015 y TC-AUTH-LOG-019 se implementan como tests parametrizados (por ruta y por usuario).
- Los TC sin sesión parten de un contexto nuevo sin `storageState`; los que requieren sesión pueden usar login por UI o el `storageState` de `standard_user`.
- TC-AUTH-LOG-022 manipula cookies con `context.addCookies()`; TC-AUTH-LOG-023 usa `context.cookies()` y `context.clearCookies({ name: 'session-username' })`.
- Nombre de los tests: `[{TC-ID}] {título} @{prioridad}` (`conventions.testNamingPattern`).
- Credenciales y URL siempre desde `process.env` (regla 3); nunca escribir la contraseña en código, evidencias ni reportes.
- Los timeouts se amplían solo de forma local y explícita en los TC que lo indican; no se modifica el timeout global.

### Notas por TC (heredadas de la especificación)

| TC-ID | Nota |
|---|---|
| TC-AUTH-LOG-019 | Test parametrizado por usuario |
| TC-AUTH-LOG-020 | Demora medida ~5.2 s; usar timeout explícito, no aumentar el timeout global |
| TC-AUTH-LOG-024 | No afirmar el valor de la contraseña en el test (regla 3) |
| TC-AUTH-LOG-015 | Test parametrizado por ruta |
| TC-AUTH-LOG-022 | Una cookie con `standard_user` sí da acceso: hallazgo REC de seguridad (ver 01-business-rules.md) |
| TC-AUTH-LOG-023 | Verificado en la etapa 2 con la espera real completa (~620 s): la cookie desaparece y la ruta interna muestra el error. La expiración es absoluta, no se renueva con la actividad. El test automatizado no espera 10 minutos: valida el atributo `expires` y simula el vencimiento borrando la cookie. `page.clock` no sirve porque la expiración de la cookie la gestiona el navegador, no el JavaScript de la página |

## 12. Integración con Azure DevOps

No aplica: `integrations.azureDevOps.enabled` es `false` y la integración está fuera de alcance del proyecto. No se crean Test Plans, Test Suites ni Test Cases en ADO; la columna `Confirma` queda en `N/A` y la sección 10 usa reglas RN y flujos FL como sustituto de las tareas.
