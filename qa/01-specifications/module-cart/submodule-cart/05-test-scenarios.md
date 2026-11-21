# Test Scenarios - Carrito de compras: Carrito

**Module code**: CART  
**Submodule code**: CRT  
**Last updated**: 2026-11-21

> Origen de cada TC según la sesión de exploración del 2026-11-21. Los TC marcados como "candidato DEF" describen el comportamiento que exige la regla; si la app no lo cumple, la etapa 5 usa `test.fail()` + archivo DEF (regla 10), nunca una aserción invertida.

## Summary

| Priority | Count | Automated | Manual |
|----------|-------|-----------|--------|
| P0 | 4 | 4 | 0 |
| P1 | 9 | 9 | 0 |
| P2 | 4 | 4 | 0 |
| P3 | 2 | 2 | 0 |
| **Total** | **19** | **19** | **0** |

Origen: UI-OBSERVED 19

## Cobertura obligatoria

- [x] Acceso: usuario no autenticado redirigido al login (TC-CART-CRT-016)
- [x] Acceso: aislamiento del carrito entre usuarios (TC-CART-CRT-012)
- [x] Happy path: revisar y continuar al checkout (TC-CART-CRT-003, 009)
- [x] Negativo: checkout con carrito vacío (TC-CART-CRT-013)
- [x] Negativo: duplicado - cantidad siempre 1 (TC-CART-CRT-019)
- [ ] Negativo: formato inválido - no aplica
- [x] Transición de estado: agregar/quitar, vaciado tras compra (TC-CART-CRT-005, 015)
- [ ] Exportación/descarga - no aplica
- [ ] Paginación/búsqueda - no aplica

---

### TC-CART-CRT-001: Sin badge con el carrito vacío

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-001 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Carrito vacío

**Steps**:
1. Abrir `/inventory.html`

**Expected result**: `shopping-cart-badge` no existe en el DOM

### TC-CART-CRT-002: El badge suma y resta al agregar y quitar

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-001 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Carrito vacío

**Steps**:
1. Agregar Backpack, Bike Light y Onesie
2. Quitar Onesie

**Expected result**: Badge "3" tras agregar y "2" tras quitar

### TC-CART-CRT-003: El carrito lista los productos agregados

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-002 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Backpack y Bike Light agregados en ese orden

**Steps**:
1. Clic en `shopping-cart-link`

**Expected result**: URL `/cart.html`; 2 filas `.cart_item` en orden de agregado, cada una con `item-quantity` "1", nombre y precio ($29.99, $9.99)

### TC-CART-CRT-004: Encabezados de la página del carrito

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-002 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Abrir `/cart.html`

**Expected result**: `title` = "Your Cart", `cart-quantity-label` = "QTY", `cart-desc-label` = "Description"

### TC-CART-CRT-005: Quitar un producto desde el carrito

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-004 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Backpack y Bike Light en el carrito

**Steps**:
1. En `/cart.html`, clic en `remove-sauce-labs-bike-light`

**Expected result**: Queda 1 fila (Backpack), badge "1" y `cart-contents` = `[4]`

### TC-CART-CRT-006: Quitar el último producto deja el carrito vacío

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-004, RN-CART-001 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Solo Backpack en el carrito

**Steps**:
1. Clic en `remove-sauce-labs-backpack` en `/cart.html`

**Expected result**: Sin filas `.cart_item` y sin badge

### TC-CART-CRT-007: El producto quitado en el carrito vuelve a "Add to cart" en el listado

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-004 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Backpack en el carrito

**Steps**:
1. Quitar Backpack en `/cart.html`
2. Clic en `continue-shopping`

**Expected result**: En el listado, Backpack muestra `add-to-cart-sauce-labs-backpack`

### TC-CART-CRT-008: Continue Shopping vuelve al catálogo sin cambiar el carrito

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-006 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- 2 productos en el carrito

**Steps**:
1. En `/cart.html`, clic en `continue-shopping`

**Expected result**: URL `/inventory.html` y badge "2"

### TC-CART-CRT-009: Checkout abre el paso 1

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-007 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- 1 producto en el carrito

**Steps**:
1. Clic en `checkout`

**Expected result**: URL `/checkout-step-one.html` con título "Checkout: Your Information"

### TC-CART-CRT-010: El carrito se conserva al recargar

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-005 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- 2 productos en el carrito

**Steps**:
1. Recargar la página

**Expected result**: Badge "2" y mismas filas en `/cart.html`

### TC-CART-CRT-011: El carrito se conserva tras logout y login del mismo usuario

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-005 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- 2 productos en el carrito

**Steps**:
1. Logout
2. Login con el mismo usuario

**Expected result**: Badge "2"

### TC-CART-CRT-012: Otro usuario no ve el carrito del anterior

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Security |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-011 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- 2 productos en el carrito

**Steps**:
1. Logout
2. Login en el mismo contexto con `QA_USER_VISUAL_USER_USERNAME`

**Expected result**: El badge no existe y `/cart.html` no tiene filas

**Notes**: Candidato DEF: observado badge "2" (carrito compartido en localStorage)

### TC-CART-CRT-013: No se puede iniciar checkout con el carrito vacío

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Negative |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-008 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Carrito vacío

**Steps**:
1. Abrir `/cart.html`
2. Intentar clic en `checkout`

**Expected result**: El checkout no se inicia: botón deshabilitado/oculto o mensaje de error, y la URL sigue en `/cart.html`

**Notes**: Candidato DEF: el botón está habilitado y la orden se completa con total $0.00

### TC-CART-CRT-014: El nombre del producto en el carrito abre su detalle

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-010 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Backpack en el carrito

**Steps**:
1. En `/cart.html`, clic en `item-4-title-link`

**Expected result**: URL `/inventory-item.html?id=4` con botón "Remove"

### TC-CART-CRT-015: El carrito queda vacío al completar la compra

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-009 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- 2 productos en el carrito

**Steps**:
1. Completar el checkout hasta `finish`
2. Abrir `/cart.html`

**Expected result**: Sin badge, sin filas y sin `cart-contents` en localStorage

### TC-CART-CRT-016: Carrito sin sesión redirige al login

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
1. Navegar a `/cart.html`

**Expected result**: Login con "You can only access '/cart.html' when you are logged in."

### TC-CART-CRT-017: problem_user y error_user pueden quitar productos desde el carrito

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-004 |

**Preconditions**:
- Sesión con `QA_USER_PROBLEM_USER_USERNAME` (luego `QA_USER_ERROR_USER_USERNAME`)
- `cart-contents` = `[4,0]`

**Steps**:
1. En `/cart.html`, quitar Bike Light

**Expected result**: Queda solo Backpack y badge "1"

### TC-CART-CRT-018: visual_user ve en el carrito el precio real

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-012 |

**Preconditions**:
- Sesión iniciada con `QA_USER_VISUAL_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Agregar Backpack
2. Abrir `/cart.html`

**Expected result**: Precio "$29.99"

**Notes**: El listado de visual_user muestra otro precio (ver TC-INV-CAT-025)

### TC-CART-CRT-019: La cantidad por producto es siempre 1 y no es editable

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CART-003 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Backpack en el carrito

**Steps**:
1. Abrir `/cart.html`
2. Volver al listado e intentar agregar Backpack otra vez

**Expected result**: `item-quantity` = "1" sin control de edición; en el listado solo existe "Remove" para Backpack
