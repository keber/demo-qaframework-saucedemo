# Test Scenarios - Checkout: Flujo de compra

**Module code**: CHK  
**Submodule code**: FLW  
**Last updated**: 2026-11-21

> Origen de cada TC según la sesión de exploración del 2026-11-21. Los TC marcados como "candidato DEF" describen el comportamiento que exige la regla; si la app no lo cumple, la etapa 5 usa `test.fail()` + archivo DEF (regla 10), nunca una aserción invertida.

## Summary

| Priority | Count | Automated | Manual |
|----------|-------|-----------|--------|
| P0 | 5 | 5 | 0 |
| P1 | 10 | 10 | 0 |
| P2 | 8 | 8 | 0 |
| P3 | 3 | 2 | 1 |
| **Total** | **26** | **25** | **1** |

Origen: UI-OBSERVED 25 · PENDING-BROWSER 1

## Cobertura obligatoria

- [x] Acceso: usuario no autenticado redirigido al login (TC-CHK-FLW-021)
- [ ] Acceso: rol sin permiso - no aplica
- [x] Happy path: compra completa (TC-CHK-FLW-001)
- [x] Negativo: campo obligatorio vacío (TC-CHK-FLW-003 a 007)
- [ ] Negativo: duplicado - no aplica
- [x] Negativo: formato inválido - solo espacios (TC-CHK-FLW-007)
- [x] Transición de estado: paso 1 -> 2 -> 3 y carrito vaciado (TC-CHK-FLW-017, 020)
- [x] Exportación/descarga: PDF de la orden (TC-CHK-FLW-019)
- [ ] Paginación/búsqueda - no aplica

---

### TC-CHK-FLW-001: Compra completa con standard_user

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | FL-CHK-001 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)

**Steps**:
1. Abrir `/cart.html` y clic en `checkout`
2. Completar `firstName`, `lastName`, `postalCode` con datos EXEC_IDX
3. Clic en `continue`
4. Clic en `finish`

**Expected result**: URL `/checkout-complete.html`, `complete-header` = "Thank you for your order!" y sin badge

### TC-CHK-FLW-002: Elementos del paso 1

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-001 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)

**Steps**:
1. Abrir `/checkout-step-one.html`

**Expected result**: Título "Checkout: Your Information"; inputs con placeholders "First Name", "Last Name", "Zip/Postal Code"; botones "Cancel" y "Continue"

### TC-CHK-FLW-003: Los tres campos vacíos

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Negative |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-001 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)
- En el paso 1

**Steps**:
1. Clic en `continue`

**Expected result**: "Error: First Name is required", 3 iconos `.error_icon` y la URL no cambia

### TC-CHK-FLW-004: Falta el apellido

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Negative |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-002 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)
- En el paso 1

**Steps**:
1. Completar solo `firstName`
2. Clic en `continue`

**Expected result**: "Error: Last Name is required"

### TC-CHK-FLW-005: Falta el código postal

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Negative |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-003 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)
- En el paso 1

**Steps**:
1. Completar `firstName` y `lastName`
2. Clic en `continue`

**Expected result**: "Error: Postal Code is required"

### TC-CHK-FLW-006: Falta el nombre con el resto informado

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Negative |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-001 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)
- En el paso 1

**Steps**:
1. Completar `lastName` y `postalCode`
2. Clic en `continue`

**Expected result**: "Error: First Name is required"

### TC-CHK-FLW-007: Campos con solo espacios son rechazados

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Negative |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-004 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)
- En el paso 1

**Steps**:
1. Escribir " " en los 3 campos
2. Clic en `continue`

**Expected result**: "Error: First Name is required" y la URL sigue en el paso 1

**Notes**: Candidato DEF: observado avance al paso 2

### TC-CHK-FLW-008: Cerrar el error del paso 1

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-005 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)
- Error visible en el paso 1

**Steps**:
1. Clic en `error-button`

**Expected result**: Desaparecen el mensaje y los iconos

### TC-CHK-FLW-009: Cancelar en el paso 1 vuelve al carrito

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-006 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)
- En el paso 1

**Steps**:
1. Clic en `cancel`

**Expected result**: URL `/cart.html` con las 2 filas

### TC-CHK-FLW-010: El resumen muestra productos, pago y envío

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-007 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)
- Paso 1 enviado

**Steps**:
1. Observar `/checkout-step-two.html`

**Expected result**: Título "Checkout: Overview"; 2 filas sin botón "Remove"; "SauceCard #31337"; "Free Pony Express Delivery!"

### TC-CHK-FLW-011: Subtotal igual a la suma de precios

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-008 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)
- En el paso 2

**Steps**:
1. Leer `subtotal-label`

**Expected result**: "Item total: $39.98"

### TC-CHK-FLW-012: Impuesto del 8 % redondeado a centavos

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-009 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)
- En el paso 2

**Steps**:
1. Leer `tax-label`

**Expected result**: "Tax: $3.20" (39.98 x 0.08 = 3.1984 -> 3.20)

### TC-CHK-FLW-013: Total igual a subtotal más impuesto

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-010 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)
- En el paso 2

**Steps**:
1. Leer `total-label`

**Expected result**: "Total: $43.18"

### TC-CHK-FLW-014: Totales con 1 y con 6 productos

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-008, RN-CHK-009, RN-CHK-010 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)

**Steps**:
1. Con `[4]` llegar al paso 2
2. Con los 6 productos llegar al paso 2

**Expected result**: 1 producto: $29.99 / $2.40 / $32.39. 6 productos: $129.94 / $10.40 / $140.34

**Notes**: Test parametrizado; calcular el esperado con la fórmula de 04-test-data.md

### TC-CHK-FLW-015: Totales siempre con 2 decimales

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-011 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Carrito vacío

**Steps**:
1. Navegar a `/checkout-step-two.html`

**Expected result**: Los tres importes con formato `$N.NN` ("Item total: $0.00")

**Notes**: Candidato DEF: observado "Item total: $0". Depende también de RN-CART-008

### TC-CHK-FLW-016: Cancelar en el paso 2 vuelve al catálogo con el carrito intacto

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-012 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)
- En el paso 2

**Steps**:
1. Clic en `cancel`

**Expected result**: URL `/inventory.html` y badge "2"

### TC-CHK-FLW-017: Finalizar muestra la confirmación y vacía el carrito

| Field | Value |
|-------|-------|
| Priority | P0 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-013, RN-CART-009 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)
- En el paso 2

**Steps**:
1. Clic en `finish`

**Expected result**: Título "Checkout: Complete!", imagen `pony-express`, "Thank you for your order!", texto "Your order has been dispatched, and will arrive just as fast as the pony can get there!", sin badge y sin `cart-contents`

### TC-CHK-FLW-018: Back Home vuelve al catálogo

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-014 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- En `/checkout-complete.html` tras una compra

**Steps**:
1. Clic en `back-to-products`

**Expected result**: URL `/inventory.html` sin badge

### TC-CHK-FLW-019: Generar el PDF de la orden

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Functional |
| Origin | UI-OBSERVED |
| Automation | Partial |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-015 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- Contexto con `acceptDownloads: true`
- En la confirmación tras una compra

**Steps**:
1. Clic en `generate-pdf-order`

**Expected result**: Se descarga un archivo cuyo nombre cumple `swag-labs-order-\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.pdf` y tamaño mayor a 0

**Notes**: Contenido del PDF: ver TC-CHK-FLW-026

### TC-CHK-FLW-020: El resumen no es accesible sin completar el paso 1

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Negative |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-016 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)

**Steps**:
1. Navegar directamente a `/checkout-step-two.html`

**Expected result**: No se muestra el resumen: redirige al paso 1 o al carrito

**Notes**: Candidato DEF: observado resumen completo con "Finish" operable

### TC-CHK-FLW-021: Checkout sin sesión redirige al login

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Security |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-017 |

**Preconditions**:
- Contexto de navegador nuevo, sin cookie `session-username`

**Steps**:
1. Navegar a los 3 pasos

**Expected result**: Login con el error de ruta protegida para cada paso

### TC-CHK-FLW-022: problem_user puede completar el paso 1

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-002, FL-CHK-001 |

**Preconditions**:
- Sesión iniciada con `QA_USER_PROBLEM_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)
- En el paso 1

**Steps**:
1. Completar `firstName` "Ana", `lastName` "Pérez", `postalCode`
2. Clic en `continue`

**Expected result**: Cada input conserva su valor y se avanza al paso 2

**Notes**: Candidato DEF: el texto del apellido va a `firstName`; error "Last Name is required"

### TC-CHK-FLW-023: error_user no avanza sin apellido

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-002 |

**Preconditions**:
- Sesión iniciada con `QA_USER_ERROR_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)
- En el paso 1

**Steps**:
1. Completar los 3 campos
2. Clic en `continue`

**Expected result**: `lastName` conserva el texto escrito; si queda vacío, se muestra "Error: Last Name is required" y no se avanza

**Notes**: Candidato DEF: `lastName` queda vacío y aun así avanza al paso 2

### TC-CHK-FLW-024: error_user puede finalizar la compra

| Field | Value |
|-------|-------|
| Priority | P1 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-013 |

**Preconditions**:
- Sesión iniciada con `QA_USER_ERROR_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)
- En el paso 2

**Steps**:
1. Clic en `finish`

**Expected result**: URL `/checkout-complete.html` con "Thank you for your order!"

**Notes**: Candidato DEF: permanece en el paso 2

### TC-CHK-FLW-025: visual_user y performance_glitch_user calculan los totales con precios reales

| Field | Value |
|-------|-------|
| Priority | P2 |
| Type | Regression |
| Origin | UI-OBSERVED |
| Automation | Yes |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-008 a RN-CHK-010 |

**Preconditions**:
- Sesión con `QA_USER_VISUAL_USER_USERNAME` (luego `QA_USER_PERFORMANCE_GLITCH_USER_USERNAME`)
- `cart-contents` = `[4,0]` (Backpack + Bike Light)

**Steps**:
1. Completar el checkout hasta la confirmación

**Expected result**: $39.98 / $3.20 / $43.18 y confirmación "Thank you for your order!"

### TC-CHK-FLW-026: El PDF contiene los datos de la orden

| Field | Value |
|-------|-------|
| Priority | P3 |
| Type | Functional |
| Origin | PENDING-BROWSER |
| Automation | No |
| Playwright | (completar tras la automatización) |
| Rule | RN-CHK-015 |

**Preconditions**:
- Sesión iniciada con `QA_USER_STANDARD_USER_USERNAME` / `QA_USER_PASSWORD` (`<PLACEHOLDER>`)
- PDF descargado

**Steps**:
1. Abrir el PDF

**Expected result**: Incluye los productos comprados y los totales de la orden

**Notes**: Contenido no validado en la etapa 1; requiere parser de PDF o revisión manual
