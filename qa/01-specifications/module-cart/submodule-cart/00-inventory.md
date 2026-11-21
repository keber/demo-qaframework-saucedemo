# MODULE: Carrito de compras - Submodule: Carrito

| Field | Value |
|-------|-------|
| Module code | CART |
| Submodule code | CRT |
| Primary URL | {{QA_BASE_URL}}/cart.html |
| Status | Active |
| Last updated | 2026-11-21 |

## Navegación

| Vista | Acceso | URL | Título (`data-test="title"`) |
|---|---|---|---|
| Carrito | Ícono `shopping-cart-link` en el encabezado (todas las vistas internas) | `/cart.html` | "Your Cart" |

## UI Elements - Encabezado (todas las vistas internas)

| Element | Selector (data-test) | Type | Notes |
|---------|----------------------|------|-------|
| Ícono del carrito | `shopping-cart-link` | a | Navega a `/cart.html` |
| Badge | `shopping-cart-badge` | span | Cantidad de productos distintos; **no existe en el DOM** cuando el carrito está vacío |

## UI Elements - Página del carrito

| Element | Selector (data-test) | Type | Notes |
|---------|----------------------|------|-------|
| Contenedor | `cart-contents-container` / `cart-list` | div | |
| Encabezados | `cart-quantity-label` "QTY", `cart-desc-label` "Description" | div | |
| Fila de producto | `inventory-item` (clase `cart_item`) | div | Una por producto en el carrito, en orden de agregado |
| Cantidad | `item-quantity` | div | Siempre "1" (no editable) |
| Nombre (enlace) | `item-{id}-title-link` > `inventory-item-name` | a | Navega al detalle `/inventory-item.html?id={id}` |
| Descripción | `inventory-item-desc` | div | |
| Precio | `inventory-item-price` | div | Precio real del producto |
| Quitar | `remove-{slug}` | button "Remove" | Quita la fila y resta 1 al badge |
| Seguir comprando | `continue-shopping` | button "Continue Shopping" | Navega a `/inventory.html` |
| Checkout | `checkout` | button "Checkout" | Navega a `/checkout-step-one.html`. Visible y habilitado incluso con el carrito vacío |

## Estado (cliente)

| Clave localStorage | Formato | Ejemplo | Notas |
|---|---|---|---|
| `cart-contents` | arreglo JSON de ids en orden de agregado | `[4,0,2]` | Se elimina al terminar una compra (Finish) y con "Reset App State". **No** se elimina con logout |

## API Endpoints

Sin API: el carrito vive solo en `localStorage`.
