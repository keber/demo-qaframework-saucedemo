# Test Scenarios - Catálogo de productos: Dynamic Catalog

**Module code**: INV  
**Submodule code**: DYN  
**Last updated**: 2026-11-21

> Origen de cada TC según la sesión de exploración del 2026-11-21. Los TC marcados como "candidato DEF" describen el comportamiento que exige la regla; si la app no lo cumple, la etapa 5 usa `test.fail()` + archivo DEF (regla 10), nunca una aserción invertida.

## Summary

| Priority | Count | Automated | Manual |
|----------|-------|-----------|--------|
| P0 | 0 | 0 | 0 |
| P1 | 1 | 1 | 0 |
| P2 | 6 | 6 | 0 |
| P3 | 6 | 6 | 0 |
| **Total** | **13** | **13** | **0** |

Origen: UI-OBSERVED 10 · PENDING-BROWSER 3

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

**Notes**: Carga medida ~2.5-3 s

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
| Origin | PENDING-BROWSER |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-015 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Navegar a `/dynamic-catalog-lazy-load.html` y a `/dynamic-catalog-spinner.html`

**Expected result**: Login con el error de ruta protegida para cada ruta

**Notes**: Comportamiento inferido de la ruta Slider; no ejercitado para estas dos rutas

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
| Origin | PENDING-BROWSER |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-016 a RN-INV-019 |

**Preconditions**:
- Sesión con `problem_user`, `error_user`, `visual_user` y `performance_glitch_user`

**Steps**:
1. Abrir las 3 vistas con cada usuario

**Expected result**: Mismo contenido y comportamiento que standard_user

**Notes**: No explorado en la etapa 1

### TC-INV-DYN-013: Cerrar el submenú con un segundo clic

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | PENDING-BROWSER |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-014 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Submenú desplegado

**Steps**:
1. Clic de nuevo en `dynamic-catalog-sidebar-link`

**Expected result**: `aria-expanded="false"` y submenú oculto

**Notes**: No ejercitado en la etapa 1
