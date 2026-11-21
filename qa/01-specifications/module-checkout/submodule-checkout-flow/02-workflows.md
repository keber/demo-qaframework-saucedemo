# Flujos - Checkout: Flujo de compra

### FL-CHK-001: Compra completa (happy path)

**Actor**: Usuario autenticado (`standard_user`)
**Trigger**: Clic en "Checkout" en `/cart.html`
**Precondition**: Carrito con al menos 1 producto

**Flow**:
```
[/cart.html]
    │
    ▼
[Clic data-test="checkout"]
    │
    ▼
[Paso 1 /checkout-step-one.html: firstName, lastName, postalCode]
    │
    ├─ [Campo vacío] ──► [Error "...is required"] (RN-CHK-001/002/003)
    ├─ [Cancel] ──► [/cart.html] (RN-CHK-006)
    │
    ▼
[Clic data-test="continue"]
    │
    ▼
[Paso 2 /checkout-step-two.html: productos, pago, envío, Item total, Tax 8 %, Total]
    │
    ├─ [Cancel] ──► [/inventory.html con el carrito intacto] (RN-CHK-012)
    │
    ▼
[Clic data-test="finish"]
    │
    ▼
[Paso 3 /checkout-complete.html "Thank you for your order!"; carrito vacío]
    │
    ├─ [Generate PDF order] ──► [Descarga swag-labs-order-*.pdf] (RN-CHK-015)
    │
    ▼
[Clic data-test="back-to-products"]
    │
    ▼
[Fin: /inventory.html sin badge]
```

**Postcondition**: Orden confirmada; `cart-contents` eliminado.

### FL-CHK-002: Corrección de datos en el paso 1

**Actor**: Usuario autenticado
**Trigger**: `continue` con datos incompletos
**Precondition**: En el paso 1

**Flow**:
```
[Paso 1 con error visible + 3 iconos]
    │
    ├─ [Clic error-button] ──► [Error oculto] (RN-CHK-005)
    │
    ▼
[Completar el campo indicado]
    │
    ▼
[continue] ──► [Siguiente campo faltante o paso 2]
```

**Postcondition**: Se llega al paso 2 solo con los 3 campos informados.
