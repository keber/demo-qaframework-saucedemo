# Test Scenarios - Catálogo de productos: Dynamic Catalog

**Module code**: INV  
**Submodule code**: DYN  
**Last updated**: 2026-11-21 (etapa 2)

> Origen de cada TC según las sesiones de exploración del 2026-11-21 (etapa 1 y etapa 2). Los TC marcados como "candidato DEF" describen el comportamiento que exige la regla; si la app no lo cumple, la etapa 5 usa `test.fail()` + archivo DEF (regla 10), nunca una aserción invertida.

## Summary

| Priority | Count | Automated | Manual |
|----------|-------|-----------|--------|
| P0 | 0 | 0 | 0 |
| P1 | 1 | 1 | 0 |
| P2 | 6 | 6 | 0 |
| P3 | 6 | 6 | 0 |
| **Total** | **13** | **13** | **0** |

Origen: UI-OBSERVED 13 (los 3 TC `PENDING-BROWSER` de la etapa 1 se verificaron en vivo en la etapa 2)

## Cobertura obligatoria

- [x] Acceso: usuario no autenticado redirigido al login (TC-INV-DYN-009, 010)
- [ ] Acceso: rol sin permiso - no aplica
- [x] Happy path: abrir las 3 vistas (TC-INV-DYN-002, 005, 007)
- [ ] Negativo: campo obligatorio - no aplica
- [ ] Negativo: duplicado - no aplica (vistas de solo lectura)
- [ ] Negativo: formato inválido - no aplica
- [x] Transición de estado: carga diferida, spinner, slider (TC-INV-DYN-003, 005, 007)
- [ ] Exportación/descarga - no aplica
- [x] Paginación: scroll infinito de Lazy Load (TC-INV-DYN-003)

## Matriz de trazabilidad

Generada en la etapa 2 a partir del campo Rule de cada TC (RN -> TC) y del recorrido de cada flujo (FL -> TC). Los números son el sufijo de `TC-INV-DYN-NNN`.

| Regla | Título | TC |
|---|---|---|
| RN-INV-014 | Submenú desplegable | 001, 013 |
| RN-INV-015 | Rutas del Dynamic Catalog protegidas | 009, 010 |
| RN-INV-016 | Carga diferida (Lazy Load) | 002, 003, 012 |
| RN-INV-017 | Indicador de carga (Spinner) | 005, 006, 012 |
| RN-INV-018 | Navegación del Slider | 007, 008, 012 |
| RN-INV-019 | Precios del Dynamic Catalog iguales al catálogo | 004, 012 |
| RN-INV-020 | Vistas de solo lectura | 011 |
| RN-INV-021 | Mismo comportamiento para todos los usuarios habilitados | 012 |

| Flujo | Título | TC |
|---|---|---|
| FL-INV-004 | Abrir una vista del Dynamic Catalog | 001, 002, 005, 006, 011, 012, 013 |
| FL-INV-005 | Scroll con carga diferida | 003, 004 |
| FL-INV-006 | Recorrer el Slider | 007, 008 |

TC sin flujo propio en este submódulo: TC-INV-DYN-009 y 010 (sin sesión) siguen la ruta de error de FL-INV-004 (RN-INV-015), equivalente a FL-AUTH-003.

---

### TC-INV-DYN-001: Desplegar el submenú Dynamic Catalog

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-014 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Menú lateral abierto

**Steps**:
1. Clic en `dynamic-catalog-sidebar-link`

**Expected result**: `aria-expanded="true"` y `dynamic-catalog-submenu` visible con "Lazy Load", "Spinner" y "Slider"; la URL no cambia

### TC-INV-DYN-002: Abrir Lazy Load

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-016 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Menú -> Dynamic Catalog -> `dynamic-catalog-lazy-load-link`

**Expected result**: URL `/dynamic-catalog-lazy-load.html`, título "Dynamic Catalog - Lazy Load" y 12 tarjetas `lazy-load-item-{n}` (4 con placeholder "Loading...")

### TC-INV-DYN-003: El scroll carga más productos

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-016 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- En Lazy Load

**Steps**:
1. Hacer scroll hasta `dynamic-catalog-lazy-load-sentinel`
2. Repetir

**Expected result**: La cantidad de tarjetas con nombre supera 12 y las tarjetas cargadas no tienen placeholder

### TC-INV-DYN-004: Precios de Lazy Load iguales al catálogo

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-019 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- En Lazy Load con productos cargados

**Steps**:
1. Leer nombre y precio de cada tarjeta

**Expected result**: Cada producto o variante de talla tiene el precio de su producto base

### TC-INV-DYN-005: Spinner visible durante la carga

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-017 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Menú -> Dynamic Catalog -> `dynamic-catalog-spinner-link`

**Expected result**: Se ve `dynamic-catalog-spinner` y luego `dynamic-catalog-spinner-grid` con 6 `spinner-item-{n}`; título "Dynamic Catalog - Spinner"

**Notes**: Carga medida entre ~0.9 y ~3.6 s; esperar la grilla con timeout de 10 s

### TC-INV-DYN-006: El spinner reaparece al recargar

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-017 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- En Spinner con productos cargados

**Steps**:
1. Recargar la página

**Expected result**: Se vuelve a ver `dynamic-catalog-spinner` antes de la grilla

### TC-INV-DYN-007: El punto del slider muestra su producto

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-018 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- En `/dynamic-catalog-slider.html`

**Steps**:
1. Clic en `dynamic-catalog-slider-dot-4`

**Expected result**: Se muestra "Sauce Labs Backpack" $29.99 y el punto 4 tiene `aria-current="true"`

**Notes**: Verificar inmediatamente tras el clic por el autoplay

### TC-INV-DYN-008: El slider avanza automáticamente

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-018 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- En Slider

**Steps**:
1. Leer el producto actual
2. Esperar 6 s sin interactuar

**Expected result**: El producto mostrado cambió

**Notes**: Intervalo exacto no medido

### TC-INV-DYN-009: Slider sin sesión redirige al login

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Security |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-015 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Navegar a `/dynamic-catalog-slider.html`

**Expected result**: Login con "Epic sadface: You can only access '/dynamic-catalog-slider.html' when you are logged in."

### TC-INV-DYN-010: Lazy Load y Spinner sin sesión redirigen al login

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Security |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-015 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Navegar a `/dynamic-catalog-lazy-load.html` y a `/dynamic-catalog-spinner.html`

**Expected result**: Para cada ruta se muestra el login con "Epic sadface: You can only access '{ruta}' when you are logged in.", donde `{ruta}` es la ruta pedida

**Notes**: Verificado en la etapa 2 para `/dynamic-catalog-lazy-load.html` y `/dynamic-catalog-spinner.html`; la URL termina en `/`, así que se asserta el mensaje y no la URL

### TC-INV-DYN-011: Las vistas del Dynamic Catalog son de solo lectura

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-020 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Abrir las 3 vistas
2. Clic en una tarjeta de Lazy Load

**Expected result**: No hay botones `add-to-cart-*`; el clic en la tarjeta no cambia la URL

### TC-INV-DYN-012: Dynamic Catalog con usuarios no estándar

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-021, RN-INV-016 a RN-INV-019 |

**Preconditions**:
- Un contexto por usuario, con sesión de `QA_USER_PROBLEM_USER_USERNAME`, `QA_USER_ERROR_USER_USERNAME`, `QA_USER_VISUAL_USER_USERNAME` y `QA_USER_PERFORMANCE_GLITCH_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Listener `page.on('dialog')` y `page.on('pageerror')` registrados

**Steps**:
1. Abrir Lazy Load desde el menú y hacer 3 scrolls hasta el centinela
2. Abrir Spinner y esperar la grilla
3. Abrir Slider y hacer clic en `dynamic-catalog-slider-dot-4`

**Expected result**: Para cada usuario: Lazy Load con 12 tarjetas iniciales y más de 12 tras el scroll; Spinner con los 6 productos y sus precios de referencia ($9.99, $15.99, $7.99, $15.99, $29.99, $49.99); Slider muestra "Sauce Labs Backpack" $29.99 con el punto 4 en `aria-current="true"`; ninguna imagen con `sl-404`; ningún `alert` ni `pageerror`

**Notes**: Verificado en la etapa 2 con los 4 usuarios: sin desviaciones. `performance_glitch_user` requiere timeout explícito en el login (~5.1 s). Parametrizar por usuario en lugar de 4 TC separados

### TC-INV-DYN-013: Cerrar el submenú con un segundo clic

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-014 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Submenú desplegado

**Steps**:
1. Clic de nuevo en `dynamic-catalog-sidebar-link`

**Expected result**: `aria-expanded="false"`, `dynamic-catalog-submenu` ya no está en el DOM (`toHaveCount(0)`) y la URL no cambia

**Notes**: Verificado en la etapa 2. El estado desplegado se conserva al cerrar y reabrir el menú lateral sin recargar: partir de un contexto nuevo
