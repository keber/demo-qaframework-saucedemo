# MODULE: Checkout - Submodule: Flujo de compra

| Field | Value |
|-------|-------|
| Module code | CHK |
| Submodule code | FLW |
| Primary URL | {{QA_BASE_URL}}/checkout-step-one.html |
| Status | Active |
| Last updated | 2026-11-21 |

## Navegación

| Paso | URL | Título (`data-test="title"`) | Acceso |
|---|---|---|---|
| 1 - Información del cliente | `/checkout-step-one.html` | "Checkout: Your Information" | Botón `checkout` del carrito |
| 2 - Resumen de la orden | `/checkout-step-two.html` | "Checkout: Overview" | Botón `continue` del paso 1 |
| 3 - Confirmación | `/checkout-complete.html` | "Checkout: Complete!" | Botón `finish` del paso 2 |

Título de pestaña: `Swag Labs` en los tres pasos.

## UI Elements - Paso 1

| Element | Selector (data-test) | Type | Required | Notes |
|---------|----------------------|------|----------|-------|
| Contenedor | `checkout-info-container` | div | - | |
| Nombre | `firstName` (id `first-name`) | input text, placeholder "First Name" | Sí | Sin validación de formato |
| Apellido | `lastName` (id `last-name`) | input text, placeholder "Last Name" | Sí | |
| Código postal | `postalCode` (id `postal-code`) | input text, placeholder "Zip/Postal Code" | Sí | Acepta letras y símbolos |
| Mensaje de error | `error` | h3 | - | Prefijo "Error: " |
| Cerrar error | `error-button` | button | - | Oculta mensaje e iconos |
| Iconos de error | `.error_icon` | svg | - | 3 (uno por campo) mientras hay error; inputs con clase `input_error error` |
| Cancelar | `cancel` | button "Cancel" | - | Vuelve a `/cart.html` |
| Continuar | `continue` | input submit "Continue" | - | Valida y avanza al paso 2 |

## UI Elements - Paso 2

| Element | Selector (data-test) | Type | Notes |
|---------|----------------------|------|-------|
| Contenedor | `checkout-summary-container` | div | |
| Encabezados | `cart-quantity-label` "QTY", `cart-desc-label` "Description" | div | |
| Fila de producto | `inventory-item` (clase `cart_item`) con `item-quantity`, `item-{id}-title-link`, `inventory-item-name`, `inventory-item-desc`, `inventory-item-price` | div | Sin botones "Remove" |
| Pago | `payment-info-label` "Payment Information:" / `payment-info-value` "SauceCard #31337" | div | Fijo |
| Envío | `shipping-info-label` "Shipping Information:" / `shipping-info-value` "Free Pony Express Delivery!" | div | Fijo |
| Totales | `total-info-label` "Price Total" | div | |
| Subtotal | `subtotal-label` | div | "Item total: $39.98" (Backpack + Bike Light) |
| Impuesto | `tax-label` | div | "Tax: $3.20" (8 %) |
| Total | `total-label` | div | "Total: $43.18" |
| Cancelar | `cancel` | button "Cancel" | Vuelve a `/inventory.html` conservando el carrito |
| Finalizar | `finish` | button "Finish" | Completa la orden |

## UI Elements - Paso 3

| Element | Selector (data-test) | Type | Notes |
|---------|----------------------|------|-------|
| Contenedor | `checkout-complete-container` | div | |
| Imagen | `pony-express` | img | `alt="Pony Express"`, `/assets/checkmark-*.png` |
| Encabezado | `complete-header` | h2 | "Thank you for your order!" |
| Texto | `complete-text` | div | "Your order has been dispatched, and will arrive just as fast as the pony can get there!" |
| Volver | `back-to-products` | button "Back Home" | Navega a `/inventory.html` |
| PDF | `generate-pdf-order` | button "Generate PDF order" | Descarga `swag-labs-order-YYYY-MM-DD_HH-MM-SS.pdf` (~2.9 KB) generado en el cliente |

## Totales verificados en la sesión

| Carrito | Item total | Tax | Total |
|---|---|---|---|
| Backpack | $29.99 | $2.40 | $32.39 |
| Backpack + Bike Light | $39.98 | $3.20 | $43.18 |
| 6 productos | $129.94 | $10.40 | $140.34 |
| Vacío | $0 | $0.00 | $0.00 |

## API Endpoints

Sin API de negocio. Al pulsar "Generate PDF order" se cargan bajo demanda `GET /assets/OrderReceipt-*.js` y `GET /assets/react-pdf.browser-*.js`; el PDF se genera en el navegador.
