# Test Scenarios - Navegación y menú: Menú lateral, encabezado y footer

**Module code**: NAV  
**Submodule code**: MENU  
**Last updated**: 2026-11-21

> Origen de cada TC según la sesión de exploración del 2026-11-21. Los TC marcados como "candidato DEF" describen el comportamiento que exige la regla; si la app no lo cumple, la etapa 5 usa `test.fail()` + archivo DEF (regla 10), nunca una aserción invertida.

## Summary

| Priority | Count | Automated | Manual |
|----------|-------|-----------|--------|
| P0 | 1 | 1 | 0 |
| P1 | 3 | 3 | 0 |
| P2 | 5 | 5 | 0 |
| P3 | 7 | 7 | 0 |
| **Total** | **16** | **16** | **0** |

Origen: UI-OBSERVED 16

## Cobertura obligatoria

- [x] Acceso: sin sesión no hay menú (TC-NAV-MENU-016)
- [ ] Acceso: rol sin permiso - no aplica
- [x] Happy path: navegar con el menú (TC-NAV-MENU-001, 005)
- [ ] Negativo: campo obligatorio - no aplica
- [ ] Negativo: duplicado - no aplica
- [ ] Negativo: formato inválido - no aplica
- [x] Transición de estado: Reset App State, logout (TC-NAV-MENU-007, 008)
- [ ] Exportación/descarga - no aplica
- [ ] Paginación/búsqueda - no aplica

---

### TC-NAV-MENU-001: Abrir y cerrar el menú lateral

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-NAV-001 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Clic en `#react-burger-menu-btn`
2. Clic en `#react-burger-cross-btn`

**Expected result**: `.bm-menu-wrap` pasa a `aria-hidden="false"` y luego a `"true"`

### TC-NAV-MENU-002: Cerrar el menú con Escape

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-NAV-001 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Menú abierto

**Steps**:
1. Presionar Escape

**Expected result**: `.bm-menu-wrap` con `aria-hidden="true"`

### TC-NAV-MENU-003: Opciones del menú y su orden

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-NAV-010 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Menú abierto

**Steps**:
1. Leer los enlaces del menú

**Expected result**: "All Items", "Dynamic Catalog", "About", "Logout", "Reset App State" en ese orden

### TC-NAV-MENU-004: Menú, carrito y footer en todas las vistas internas

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-NAV-002 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Visitar listado, detalle, carrito y los 3 pasos de checkout

**Expected result**: En cada vista existen `#react-burger-menu-btn`, `shopping-cart-link` y `footer`

**Notes**: Test parametrizado por vista

### TC-NAV-MENU-005: All Items desde el carrito

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-NAV-003 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- En `/cart.html`

**Steps**:
1. Abrir el menú
2. Clic en `inventory-sidebar-link`

**Expected result**: URL `/inventory.html`

### TC-NAV-MENU-006: About lleva al sitio de Sauce Labs

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-NAV-004 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Menú abierto

**Steps**:
1. Verificar `href` de `about-sidebar-link`
2. Clic en About

**Expected result**: `href` = `https://saucelabs.com/` y la pestaña navega a saucelabs.com

**Notes**: Preferir asertar el href para no depender del sitio externo

### TC-NAV-MENU-007: Logout desde el menú

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-NAV-005, RN-AUTH-009 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Abrir el menú
2. Clic en `logout-sidebar-link`

**Expected result**: URL `/` con el formulario de login

**Notes**: Detalle de sesión cubierto por TC-AUTH-LOG-017

### TC-NAV-MENU-008: Reset App State vacía el carrito

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-NAV-006 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- 2 productos en el carrito

**Steps**:
1. Abrir el menú
2. Clic en `reset-sidebar-link`

**Expected result**: Badge ausente y `cart-contents` eliminado

### TC-NAV-MENU-009: Reset App State actualiza los botones del listado

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-NAV-007 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Onesie en el carrito, en `/inventory.html`

**Steps**:
1. Abrir el menú
2. Clic en `reset-sidebar-link`
3. Sin recargar, leer el botón de Onesie

**Expected result**: El botón es `add-to-cart-sauce-labs-onesie` "Add to cart"

**Notes**: Candidato DEF: sigue en "Remove" hasta recargar

### TC-NAV-MENU-010: El menú queda abierto tras Reset App State

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-NAV-006 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Menú abierto

**Steps**:
1. Clic en `reset-sidebar-link`

**Expected result**: `.bm-menu-wrap` sigue con `aria-hidden="false"`

### TC-NAV-MENU-011: Enlaces sociales del footer

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-NAV-008 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Leer `href` y `target` de `social-x`, `social-facebook`, `social-linkedin`

**Expected result**: https://x.com/saucelabs, https://www.facebook.com/saucelabs, https://www.linkedin.com/company/sauce-labs/ y `target="_blank"` en los tres

### TC-NAV-MENU-012: Texto de copyright del footer

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-NAV-009 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Leer `footer-copy`

**Expected result**: "© {año en curso} Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy"

### TC-NAV-MENU-013: Logo del encabezado

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-NAV-002 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Leer `.app_logo`

**Expected result**: Texto "Swag Labs"

### TC-NAV-MENU-014: problem_user: About apunta al sitio correcto

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-NAV-004 |

**Preconditions**:
- Sesión iniciada con `QA_USER_PROBLEM_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Menú abierto

**Steps**:
1. Leer `href` de `about-sidebar-link`

**Expected result**: `href` = `https://saucelabs.com/`

**Notes**: Candidato DEF: `https://saucelabs.com/error/404`

### TC-NAV-MENU-015: error_user: Reset App State sin errores

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-NAV-006 |

**Preconditions**:
- Sesión iniciada con `QA_USER_ERROR_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- 1 producto en el carrito
- Listener de `pageerror` y `console`

**Steps**:
1. Abrir el menú
2. Clic en `reset-sidebar-link`

**Expected result**: Badge ausente, `cart-contents` eliminado y sin errores JS

**Notes**: Observado error de consola "wa.cesetRart is not a function"; confirmar efecto visible en la etapa 5

### TC-NAV-MENU-016: La página de login no muestra menú ni carrito

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Security |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-NAV-002 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Abrir `{{QA_BASE_URL}}/`

**Expected result**: No existen `#react-burger-menu-btn` ni `shopping-cart-link`
