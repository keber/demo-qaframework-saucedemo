# Test Scenarios - Catálogo de productos: Listado y detalle

**Module code**: INV  
**Submodule code**: CAT  
**Last updated**: 2026-11-21

> Origen de cada TC según la sesión de exploración del 2026-11-21. Los TC marcados como "candidato DEF" describen el comportamiento que exige la regla; si la app no lo cumple, la etapa 5 usa `test.fail()` + archivo DEF (regla 10), nunca una aserción invertida.

## Summary

| Priority | Count | Automated | Manual |
|----------|-------|-----------|--------|
| P0 | 3 | 3 | 0 |
| P1 | 14 | 14 | 0 |
| P2 | 6 | 6 | 0 |
| P3 | 4 | 4 | 0 |
| **Total** | **27** | **27** | **0** |

Origen: UI-OBSERVED 27

## Cobertura obligatoria

- [x] Acceso: usuario no autenticado redirigido al login (TC-INV-CAT-018)
- [ ] Acceso: rol sin permiso - no aplica (sin roles de autorización)
- [x] Happy path: listar, ordenar, agregar (TC-INV-CAT-001, 004, 008)
- [ ] Negativo: campo obligatorio - no aplica (sin formularios)
- [x] Negativo: duplicado - un producto no se agrega dos veces (TC-INV-CAT-008)
- [x] Negativo: formato inválido - id de producto inexistente (TC-INV-CAT-017)
- [x] Transición de estado: Add to cart <-> Remove (TC-INV-CAT-008, 010, 014)
- [ ] Exportación/descarga - no aplica
- [x] Búsqueda/orden: ordenamiento (TC-INV-CAT-003 a 007)

---

### TC-INV-CAT-001: El listado muestra 6 productos completos

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-001 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Abrir `/inventory.html`

**Expected result**: Hay 6 `inventory-item`, cada uno con `inventory-item-name`, `inventory-item-desc`, `inventory-item-price`, imagen y botón "Add to cart"

### TC-INV-CAT-002: Nombres y precios coinciden con el catálogo de referencia

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-001, RN-INV-012 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Leer nombres y precios del listado

**Expected result**: Coinciden con la tabla de `00-inventory.md` (Backpack $29.99 ... Test.allTheThings() $15.99) y todos tienen formato `$NN.NN`

### TC-INV-CAT-003: Orden por defecto A-Z

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-002 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Abrir `/inventory.html`

**Expected result**: `active-option` = "Name (A to Z)" y los nombres están en orden alfabético ascendente

### TC-INV-CAT-004: Ordenar por nombre Z-A

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-003 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Seleccionar `za` en `product-sort-container`

**Expected result**: Nombres en orden descendente (primero "Test.allTheThings() T-Shirt (Red)", último "Sauce Labs Backpack"); `active-option` = "Name (Z to A)"

### TC-INV-CAT-005: Ordenar por precio de menor a mayor

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-004 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Seleccionar `lohi`

**Expected result**: Precios mostrados en orden no decreciente ($7.99 ... $49.99); `active-option` = "Price (low to high)"

### TC-INV-CAT-006: Ordenar por precio de mayor a menor

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-004 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Seleccionar `hilo`

**Expected result**: Precios mostrados en orden no creciente ($49.99 ... $7.99); `active-option` = "Price (high to low)"

### TC-INV-CAT-007: El orden vuelve a A-Z al recargar

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-002 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Seleccionar `hilo`
2. Recargar la página

**Expected result**: `active-option` = "Name (A to Z)"

### TC-INV-CAT-008: Agregar un producto desde el listado

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-005 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Carrito vacío

**Steps**:
1. Clic en `add-to-cart-sauce-labs-backpack`

**Expected result**: El botón pasa a `remove-sauce-labs-backpack` "Remove", el badge muestra "1" y `cart-contents` = `[4]`

### TC-INV-CAT-009: Agregar los 6 productos

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-005, RN-CART-001 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Carrito vacío

**Steps**:
1. Clic en "Add to cart" de los 6 productos

**Expected result**: El badge muestra "6" y los 6 botones dicen "Remove"

### TC-INV-CAT-010: Quitar un producto desde el listado

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-006 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Backpack en el carrito

**Steps**:
1. Clic en `remove-sauce-labs-backpack`

**Expected result**: El botón vuelve a "Add to cart", el badge desaparece y `cart-contents` queda vacío

### TC-INV-CAT-011: El nombre abre el detalle del mismo producto

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-007 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Clic en `item-4-title-link`

**Expected result**: URL `/inventory-item.html?id=4` con nombre "Sauce Labs Backpack" y precio "$29.99"

### TC-INV-CAT-012: La imagen abre el detalle del mismo producto

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-007 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Clic en `item-0-img-link`

**Expected result**: URL `/inventory-item.html?id=0` con nombre "Sauce Labs Bike Light"

### TC-INV-CAT-013: El detalle muestra los mismos datos que el listado para los 6 productos

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-007, RN-INV-012 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Para cada producto: leer nombre, descripción y precio en el listado
2. Abrir su detalle desde el nombre

**Expected result**: Nombre, descripción y precio del detalle son idénticos a los del listado

**Notes**: Test parametrizado por id (0-5)

### TC-INV-CAT-014: Agregar y quitar desde el detalle

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-008 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Carrito vacío

**Steps**:
1. Abrir `/inventory-item.html?id=4`
2. Clic en `add-to-cart`
3. Clic en `remove`

**Expected result**: Tras agregar: botón `remove` y badge "1". Tras quitar: botón `add-to-cart` y badge ausente

### TC-INV-CAT-015: El detalle refleja un producto que ya está en el carrito

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-008 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Backpack agregado desde el listado

**Steps**:
1. Abrir el detalle de Backpack

**Expected result**: Se muestra el botón `remove` "Remove"

### TC-INV-CAT-016: Volver al listado desde el detalle

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-009 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- En `/inventory-item.html?id=4`

**Steps**:
1. Clic en `back-to-products`

**Expected result**: Navega a `/inventory.html`

### TC-INV-CAT-017: Detalle de un producto inexistente

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Negative |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-010 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Navegar a `/inventory-item.html?id=99`

**Expected result**: Se muestra "ITEM NOT FOUND"

**Notes**: Precio "$√-1" y botón operable: hallazgo REC

### TC-INV-CAT-018: Catálogo sin sesión redirige al login

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
1. Navegar a `/inventory.html` y a `/inventory-item.html?id=1`

**Expected result**: Login con el error de ruta protegida en ambos casos

### TC-INV-CAT-019: problem_user ve la imagen propia de cada producto

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-011 |

**Preconditions**:
- Sesión iniciada con `QA_USER_PROBLEM_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Leer el `src` de las 6 imágenes del listado

**Expected result**: Ninguna imagen usa `sl-404`; cada `src` corresponde a su producto

**Notes**: Candidato DEF: observado `sl-404` en las 6

### TC-INV-CAT-020: problem_user puede ordenar el listado

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-003, RN-INV-004 |

**Preconditions**:
- Sesión iniciada con `QA_USER_PROBLEM_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Seleccionar `za`, luego `lohi`

**Expected result**: El orden y `active-option` cambian según la opción

**Notes**: Candidato DEF: la lista y la opción quedan en A-Z

### TC-INV-CAT-021: problem_user puede agregar y quitar los 6 productos

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-005, RN-INV-006 |

**Preconditions**:
- Sesión iniciada con `QA_USER_PROBLEM_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Carrito vacío

**Steps**:
1. Clic en "Add to cart" de los 6 productos
2. Clic en "Remove" de los 6

**Expected result**: Badge "6" tras agregar y ausente tras quitar

**Notes**: Candidato DEF: solo se agregan Backpack, Bike Light y Onesie; "Remove" no tiene efecto

### TC-INV-CAT-022: problem_user abre el detalle del producto elegido

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-007 |

**Preconditions**:
- Sesión iniciada con `QA_USER_PROBLEM_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Clic en `item-4-title-link`

**Expected result**: URL `?id=4` y nombre "Sauce Labs Backpack"

**Notes**: Candidato DEF: abre `?id=5` (Fleece Jacket); desde Fleece abre `?id=6` "ITEM NOT FOUND"

### TC-INV-CAT-023: error_user puede ordenar sin errores

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-003, RN-INV-004 |

**Preconditions**:
- Sesión iniciada con `QA_USER_ERROR_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Handler de `dialog` registrado

**Steps**:
1. Seleccionar `za`

**Expected result**: La lista se ordena Z-A y no aparece ningún diálogo

**Notes**: Candidato DEF: alert "Sorting is broken! This error has been reported to Backtrace." y sin reorden

### TC-INV-CAT-024: error_user puede agregar y quitar los 6 productos

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-005, RN-INV-006, RN-INV-008 |

**Preconditions**:
- Sesión iniciada con `QA_USER_ERROR_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Carrito vacío

**Steps**:
1. Agregar los 6 productos desde el listado
2. Quitar los 6

**Expected result**: Badge "6" tras agregar y ausente tras quitar

**Notes**: Candidato DEF: fallan Bolt T-Shirt, Fleece Jacket y Test.allTheThings() ("Failed to add item to the cart."); "Remove" falla en listado y detalle

### TC-INV-CAT-025: visual_user ve precios reales y con 2 decimales

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-012 |

**Preconditions**:
- Sesión iniciada con `QA_USER_VISUAL_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Leer los precios del listado
2. Comparar con el detalle y el carrito

**Expected result**: Los precios coinciden con el catálogo ($29.99, $9.99, ...) y tienen formato `$NN.NN`

**Notes**: Candidato DEF: precios aleatorios en cada carga, algunos sin decimales ("$42.8", "$3")

### TC-INV-CAT-026: visual_user ve imágenes y controles en su posición

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Partial |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-011 |

**Preconditions**:
- Sesión iniciada con `QA_USER_VISUAL_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Comparar la imagen de Backpack, la posición de `shopping-cart-link` y las clases de los botones con standard_user

**Expected result**: Imagen propia de Backpack, carrito en la misma posición que standard_user y ningún botón con clase `btn_inventory_misaligned`

**Notes**: Candidato DEF visual. Automatizable por atributos/bounding box; la comparación por screenshot queda manual

### TC-INV-CAT-027: performance_glitch_user ve el mismo catálogo que standard_user

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-INV-001 |

**Preconditions**:
- Sesión iniciada con `QA_USER_PERFORMANCE_GLITCH_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Leer nombres, precios e imágenes; ordenar por `lohi`

**Expected result**: Idénticos a standard_user
