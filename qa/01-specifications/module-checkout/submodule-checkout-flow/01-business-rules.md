# Reglas de negocio - Checkout: Flujo de compra

> Mensajes copiados literalmente de la UI (inglés). Base: `standard_user`.

### RN-CHK-001: Nombre obligatorio

- **Type**: Validation
- **Trigger**: Clic en `continue` con `firstName` vacío
- **Behavior**: No avanza; muestra el error y marca los 3 campos con icono
- **Error message**: "Error: First Name is required"
- **Notes**: Se valida en orden nombre -> apellido -> código postal; solo se informa el primer campo faltante

### RN-CHK-002: Apellido obligatorio

- **Type**: Validation
- **Trigger**: `continue` con nombre informado y `lastName` vacío
- **Behavior**: No avanza
- **Error message**: "Error: Last Name is required"

### RN-CHK-003: Código postal obligatorio

- **Type**: Validation
- **Trigger**: `continue` con nombre y apellido informados y `postalCode` vacío
- **Behavior**: No avanza
- **Error message**: "Error: Postal Code is required"

### RN-CHK-004: Campos obligatorios no aceptan solo espacios

- **Type**: Validation
- **Trigger**: `continue` con los 3 campos rellenos solo con espacios
- **Behavior esperado**: Se trata como campo vacío y se muestra "Error: First Name is required"
- **Notes**: Observado: avanza al paso 2 (ver desviaciones)

### RN-CHK-005: Cierre del mensaje de error

- **Type**: Validation
- **Trigger**: Clic en `error-button`
- **Behavior**: Se ocultan el mensaje y los iconos de error

### RN-CHK-006: Cancelar en el paso 1

- **Type**: Integration
- **Trigger**: Clic en `cancel` en `/checkout-step-one.html`
- **Behavior**: Navega a `/cart.html` sin cambiar el carrito

### RN-CHK-007: Resumen con los productos del carrito

- **Type**: Validation
- **Trigger**: Llegar a `/checkout-step-two.html`
- **Behavior**: Se listan los productos del carrito (cantidad, nombre, descripción, precio real), sin botones para quitar, más la información fija de pago ("SauceCard #31337") y envío ("Free Pony Express Delivery!")

### RN-CHK-008: Cálculo del subtotal

- **Type**: Calculation
- **Trigger**: Render del paso 2
- **Behavior**: `subtotal-label` = "Item total: $" + suma de los precios del carrito

### RN-CHK-009: Cálculo del impuesto (8 %)

- **Type**: Calculation
- **Trigger**: Render del paso 2
- **Behavior**: `tax-label` = "Tax: $" + subtotal x 0.08 redondeado a 2 decimales (39.98 -> 3.20; 29.99 -> 2.40; 129.94 -> 10.40)

### RN-CHK-010: Cálculo del total

- **Type**: Calculation
- **Trigger**: Render del paso 2
- **Behavior**: `total-label` = "Total: $" + (subtotal + impuesto) con 2 decimales (39.98 + 3.20 = 43.18)

### RN-CHK-011: Formato monetario de los totales

- **Type**: Validation
- **Trigger**: Render del paso 2
- **Behavior esperado**: Los tres importes se muestran con 2 decimales
- **Notes**: Con carrito vacío se observó "Item total: $0" (sin decimales) junto a "Tax: $0.00"

### RN-CHK-012: Cancelar en el paso 2

- **Type**: Integration
- **Trigger**: Clic en `cancel` en `/checkout-step-two.html`
- **Behavior**: Navega a `/inventory.html` y el carrito se conserva (badge sin cambios)

### RN-CHK-013: Finalizar la compra

- **Type**: State Machine
- **Trigger**: Clic en `finish`
- **Behavior**: Navega a `/checkout-complete.html` con "Thank you for your order!" y el texto de despacho; el carrito queda vacío (RN-CART-009)

### RN-CHK-014: Volver al catálogo tras la compra

- **Type**: Integration
- **Trigger**: Clic en `back-to-products` ("Back Home")
- **Behavior**: Navega a `/inventory.html` con el carrito vacío

### RN-CHK-015: Comprobante PDF

- **Type**: Integration
- **Trigger**: Clic en `generate-pdf-order` en la confirmación
- **Behavior**: Se descarga un PDF llamado `swag-labs-order-{YYYY-MM-DD_HH-MM-SS}.pdf`; la URL no cambia
- **Contenido** (verificado en la etapa 2, 2026-11-21, extrayendo el texto del PDF de 1 página): "Swag Labs", "Order Receipt", "ORDER DETAILS" con "Order Date {Mes} {D}, {AAAA} at {h:mm} {AM|PM}", "SHIP TO" con nombre y apellido ingresados y el código postal, "ITEMS" con una fila "{producto} ${precio}" por producto comprado, "Item total ${subtotal}", "Tax ${impuesto}", "Total ${total}" y el texto "Thank you for your order! It has been dispatched, and will arrive just as fast as the pony can get there."
- **Notes**: Generado en el navegador (~3 KB). La hora del nombre del archivo está en UTC y la de "Order Date" en hora local del navegador (ver desviaciones)

### RN-CHK-016: El resumen requiere completar el paso 1

- **Type**: State Machine
- **Trigger**: Acceso directo a `/checkout-step-two.html` sin haber enviado el paso 1
- **Behavior esperado**: No debe mostrarse el resumen sin datos del cliente (redirigir al paso 1 o al carrito)
- **Notes**: Observado: el resumen se muestra y permite finalizar (ver desviaciones)

### RN-CHK-017: Checkout requiere sesión

- **Type**: Access Control
- **Trigger**: Acceso sin sesión a cualquiera de los 3 pasos
- **Behavior**: Login con el error de RN-AUTH-007

## Desviaciones observadas (candidatos para la etapa 5)

| Usuario | Hallazgo | Regla violada | Clasificación propuesta |
|---|---|---|---|
| todos | Nombre, apellido y código postal con solo espacios pasan la validación | RN-CHK-004 | DEF |
| todos | Con el carrito vacío se puede completar el checkout; subtotal mostrado "$0" sin decimales | RN-CART-008, RN-CHK-011 | DEF |
| todos | `/checkout-step-two.html` es accesible directamente sin pasar por el paso 1 | RN-CHK-016 | DEF |
| todos | `/checkout-complete.html` es accesible directamente sin una compra | RN-CHK-016 | REC |
| todos | El código postal acepta letras y símbolos (`abc!@#`) | - | REC (no hay regla de formato explícita) |
| problem_user | Al escribir en `lastName` el texto va a `firstName` (queda "Perez" en nombre y apellido vacío); el paso 1 falla con "Error: Last Name is required" y no se puede avanzar | RN-CHK-002 / FL-CHK-001 | DEF |
| error_user | `lastName` no admite texto (queda vacío) y aun así `continue` avanza al paso 2 sin error | RN-CHK-002 | DEF |
| error_user | `finish` no hace nada: permanece en `/checkout-step-two.html` | RN-CHK-013 | DEF |
| todos | El nombre del PDF usa la hora UTC (`swag-labs-order-2026-11-21_15-06-22.pdf`) y el campo "Order Date" del PDF la hora local del navegador ("12:06 PM" en America/Santiago) para la misma orden | RN-CHK-015 | REC (inconsistencia de zona horaria; no viola una regla explícita) |
| performance_glitch_user, visual_user | Flujo completo correcto, totales con precios reales ($39.98 / $3.20 / $43.18) | - | - |
