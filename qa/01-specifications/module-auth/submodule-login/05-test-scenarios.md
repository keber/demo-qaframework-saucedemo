# Test Scenarios - Autenticación: Login y sesión

**Module code**: AUTH  
**Submodule code**: LOG  
**Last updated**: 2026-11-21 (etapa 2)

> Origen de cada TC según las sesiones de exploración del 2026-11-21 (etapa 1 y etapa 2). Los TC marcados como "candidato DEF" describen el comportamiento que exige la regla; si la app no lo cumple, la etapa 5 usa `test.fail()` + archivo DEF (regla 10), nunca una aserción invertida.

## Summary

| Priority | Count | Automated | Manual |
|----------|-------|-----------|--------|
| P0 | 4 | 4 | 0 |
| P1 | 8 | 8 | 0 |
| P2 | 8 | 8 | 0 |
| P3 | 4 | 4 | 0 |
| **Total** | **24** | **24** | **0** |

Origen: UI-OBSERVED 24 (TC-AUTH-LOG-023 verificado en vivo en la etapa 2)

## Cobertura obligatoria

- [x] Acceso: usuario no autenticado redirigido al login (TC-AUTH-LOG-014, 015)
- [x] Acceso: usuario sin permiso recibe error (locked_out_user, TC-AUTH-LOG-010)
- [x] Happy path: login válido (TC-AUTH-LOG-001)
- [x] Negativo: campo obligatorio vacío (TC-AUTH-LOG-003, 004, 005)
- [ ] Negativo: registro duplicado - no aplica (no hay alta de registros)
- [x] Negativo: formato inválido (TC-AUTH-LOG-008, 009)
- [x] Transición de estado: login -> sesión -> logout (TC-AUTH-LOG-017)
- [ ] Exportación/descarga - no aplica
- [ ] Paginación/búsqueda - no aplica

## Matriz de trazabilidad

Generada en la etapa 2 a partir del campo Rule de cada TC (RN -> TC) y del recorrido de cada flujo (FL -> TC). Los números son el sufijo de `TC-AUTH-LOG-NNN`.

| Regla | Título | TC |
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

| Flujo | Título | TC |
|---|---|---|
| FL-AUTH-001 | Login exitoso | 001, 002, 003, 004, 005, 006, 007, 008, 009, 010, 012, 013, 019, 020, 021, 024 |
| FL-AUTH-002 | Corrección tras un error de login | 011 |
| FL-AUTH-003 | Acceso directo a una ruta protegida sin sesión | 014, 015, 016, 022, 023 |
| FL-AUTH-004 | Logout | 017, 018 |

---

### TC-AUTH-LOG-001: Login exitoso con standard_user

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-006 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Abrir `{{QA_BASE_URL}}/`
2. Escribir `QA_USER_STANDARD_USER_USERNAME` en `username`
3. Escribir `QA_USER_PASSWORD` en `password`
4. Clic en `login-button`

**Expected result**: La URL es `/inventory.html`, `data-test="title"` muestra "Products" y no hay `data-test="error"`

### TC-AUTH-LOG-002: Login enviando el formulario con la tecla Enter

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-006 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Completar usuario y contraseña válidos
2. Presionar Enter en el campo `password`

**Expected result**: Navega a `/inventory.html`

### TC-AUTH-LOG-003: Usuario y contraseña vacíos

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Negative |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-001 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Abrir el login
2. Clic en `login-button` sin completar campos

**Expected result**: Se muestra "Epic sadface: Username is required" y la URL sigue en `/`

### TC-AUTH-LOG-004: Contraseña vacía

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Negative |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-002 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Escribir un usuario válido
2. Dejar `password` vacío
3. Clic en `login-button`

**Expected result**: Se muestra "Epic sadface: Password is required"

### TC-AUTH-LOG-005: Usuario vacío con contraseña informada

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Negative |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-001 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Dejar `username` vacío
2. Escribir cualquier contraseña
3. Clic en `login-button`

**Expected result**: Se muestra "Epic sadface: Username is required"

### TC-AUTH-LOG-006: Usuario inexistente

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Negative |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-003 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Escribir `qa_user_${EXEC_IDX}` como usuario
2. Escribir `QA_USER_PASSWORD`
3. Clic en `login-button`

**Expected result**: Se muestra "Epic sadface: Username and password do not match any user in this service"

### TC-AUTH-LOG-007: Contraseña incorrecta para un usuario válido

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Negative |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-003 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Escribir `QA_USER_STANDARD_USER_USERNAME`
2. Escribir `invalid_${EXEC_IDX}` como contraseña
3. Clic en `login-button`

**Expected result**: Mismo mensaje genérico de RN-AUTH-003; no se indica cuál dato es incorrecto

### TC-AUTH-LOG-008: Usuario en mayúsculas es rechazado

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Negative |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-004 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Escribir el usuario estándar en mayúsculas
2. Escribir `QA_USER_PASSWORD`
3. Clic en `login-button`

**Expected result**: Se muestra el mensaje de RN-AUTH-003 y no se crea sesión

### TC-AUTH-LOG-009: Usuario con espacio inicial es rechazado

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Negative |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-004 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Escribir " " + usuario estándar
2. Escribir `QA_USER_PASSWORD`
3. Clic en `login-button`

**Expected result**: Se muestra el mensaje de RN-AUTH-003

### TC-AUTH-LOG-010: Usuario bloqueado no puede iniciar sesión

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Security |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-005 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Escribir `QA_USER_LOCKED_OUT_USER_USERNAME`
2. Escribir `QA_USER_PASSWORD`
3. Clic en `login-button`
4. Navegar directamente a `/inventory.html`

**Expected result**: Se muestra "Epic sadface: Sorry, this user has been locked out.", la URL sigue en `/` y no se muestra el listado; al navegar a `/inventory.html` el acceso sigue rechazado: "Epic sadface: You can only access '/inventory.html' when you are logged in." y no existe `inventory-list`

> [REVISED - 2026-11-21] Etapa 5b: se quitó del resultado esperado la condición "no existe la cookie `session-username`", que ninguna regla de negocio respalda (RN-AUTH-005 solo exige rechazar el acceso). Se agregó el paso 4, que verifica el rechazo del acceso. La cookie inerte creada por la app queda registrada como REC-SD-012 (antes DEF-SD-019, número retirado).

### TC-AUTH-LOG-011: Cerrar el mensaje de error

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-008 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`
- Error de login visible

**Steps**:
1. Clic en `error-button`

**Expected result**: Desaparecen `data-test="error"` y los iconos `.error_icon`

### TC-AUTH-LOG-012: Campos marcados visualmente ante un error

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-001 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Clic en `login-button` con campos vacíos

**Expected result**: Se muestran 2 iconos `.error_icon` y `username` tiene la clase `input_error`

### TC-AUTH-LOG-013: La contraseña se muestra enmascarada

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Security |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-010 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Escribir texto en `password`

**Expected result**: El input tiene `type="password"`

### TC-AUTH-LOG-014: Acceso sin sesión a /inventory.html

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Security |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-007 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Navegar directamente a `{{QA_BASE_URL}}/inventory.html`

**Expected result**: No se muestra el catálogo; se ve el formulario de login con "Epic sadface: You can only access '/inventory.html' when you are logged in."

### TC-AUTH-LOG-015: Acceso sin sesión al resto de rutas internas

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Security |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-007 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Para cada ruta `/cart.html`, `/checkout-step-one.html`, `/checkout-step-two.html`, `/checkout-complete.html`, `/inventory-item.html?id=4`: navegar directamente

**Expected result**: En cada caso se muestra el login con "You can only access '{ruta}' when you are logged in." (sin query string para el detalle)

**Notes**: Test parametrizado por ruta

### TC-AUTH-LOG-016: Login después de intentar acceder a una ruta protegida

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-006, RN-AUTH-007 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Navegar a `/cart.html`
2. Iniciar sesión con credenciales válidas en el formulario mostrado

**Expected result**: Navega a `/inventory.html` (no a la ruta solicitada)

### TC-AUTH-LOG-017: Logout cierra la sesión

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-009 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Abrir el menú (`#react-burger-menu-btn`)
2. Clic en `logout-sidebar-link`

**Expected result**: La URL es `/`, el formulario está vacío y la cookie `session-username` ya no existe

### TC-AUTH-LOG-018: Atrás del navegador tras el logout no muestra contenido

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Security |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-009 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Logout realizado desde `/inventory.html`

**Steps**:
1. Presionar Atrás en el navegador

**Expected result**: Se muestra el login con el error de ruta protegida para `/inventory.html`

### TC-AUTH-LOG-019: Login de los usuarios habilitados no estándar

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-006 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Para `problem_user`, `performance_glitch_user`, `error_user` y `visual_user` (env vars `QA_USER_*_USERNAME`): iniciar sesión

**Expected result**: Cada usuario llega a `/inventory.html` con "Products"

**Notes**: Test parametrizado por usuario

### TC-AUTH-LOG-020: performance_glitch_user inicia sesión pese a la demora

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-006 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Iniciar sesión con `QA_USER_PERFORMANCE_GLITCH_USER_USERNAME`
2. Esperar la navegación con timeout de 15 s

**Expected result**: Llega a `/inventory.html` dentro del timeout

**Notes**: Demora medida ~5.2 s; usar timeout explícito, no aumentar el timeout global

### TC-AUTH-LOG-021: Cookie de sesión creada con el nombre del usuario

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-006 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Iniciar sesión con standard_user
2. Leer las cookies del contexto

**Expected result**: Existe `session-username` con valor igual al usuario logueado

### TC-AUTH-LOG-022: Cookie de sesión con usuario bloqueado o inexistente es rechazada

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Security |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-007 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Crear la cookie `session-username=locked_out_user`
2. Navegar a `/inventory.html`
3. Repetir con un usuario inexistente

**Expected result**: En ambos casos se muestra el login con el error de ruta protegida

**Notes**: Una cookie con `standard_user` sí da acceso: hallazgo REC de seguridad (ver 01-business-rules.md)

### TC-AUTH-LOG-023: Expiración de la sesión a los 10 minutos

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-011 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Leer la cookie `session-username` con `context.cookies()` y verificar que `expires` está entre 590 y 610 s después del login
2. Simular el vencimiento: `context.clearCookies({ name: 'session-username' })` (equivale a lo que hace el navegador al vencer el plazo)
3. Navegar a `/cart.html`

**Expected result**: La cookie expira 600 s (+/- 10 s) después del login y, sin ella, se muestra el login con "Epic sadface: You can only access '/cart.html' when you are logged in."

**Notes**: Verificado en la etapa 2 con la espera real completa (~620 s): la cookie desaparece y la ruta interna muestra el error. La expiración es absoluta, no se renueva con la actividad. El test automatizado no espera 10 minutos: valida el atributo `expires` y simula el vencimiento borrando la cookie. `page.clock` no sirve porque la expiración de la cookie la gestiona el navegador, no el JavaScript de la página

### TC-AUTH-LOG-024: La página de login lista los usuarios aceptados

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-AUTH-012 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Abrir el login

**Expected result**: `login-credentials` contiene "Accepted usernames are:" y los 6 usuarios; `login-password` contiene "Password for all users:"

**Notes**: No afirmar el valor de la contraseña en el test (regla 3)
