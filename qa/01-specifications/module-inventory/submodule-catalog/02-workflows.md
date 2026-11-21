# Flujos - Catálogo de productos: Listado y detalle

### FL-INV-001: Explorar y ordenar el catálogo

**Actor**: Usuario autenticado (`standard_user`)
**Trigger**: Llegada a `/inventory.html`
**Precondition**: Sesión activa

**Flow**:
```
[/inventory.html - orden A-Z]
    │
    ▼
[Seleccionar opción en data-test="product-sort-container"]
    │
    ├─ [az] ──► [Nombre ascendente]
    ├─ [za] ──► [Nombre descendente]
    ├─ [lohi] ──► [Precio ascendente]
    ├─ [hilo] ──► [Precio descendente]
    │
    ▼
[active-option muestra el texto de la opción]
    │
    └─ [Recargar página] ──► [Vuelve a A-Z] (RN-INV-002)
```

**Postcondition**: Lista reordenada; el carrito no cambia.

### FL-INV-002: Agregar y quitar desde el listado

**Actor**: Usuario autenticado
**Trigger**: Clic en "Add to cart" de una tarjeta
**Precondition**: Producto no presente en el carrito

**Flow**:
```
[Tarjeta con add-to-cart-{slug}]
    │
    ▼
[Clic "Add to cart"]
    │
    ▼
[Botón -> remove-{slug} "Remove"; badge +1; cart-contents += id]
    │
    ▼
[Clic "Remove"]
    │
    ▼
[Botón -> "Add to cart"; badge -1 (oculto en 0); cart-contents -= id]
```

**Postcondition**: Estado del carrito consistente con los botones.

### FL-INV-003: Consultar el detalle de un producto

**Actor**: Usuario autenticado
**Trigger**: Clic en el nombre o la imagen de un producto
**Precondition**: Sesión activa

**Flow**:
```
[/inventory.html]
    │
    ▼
[Clic item-{id}-title-link o item-{id}-img-link]
    │
    ▼
[/inventory-item.html?id={id}: nombre, descripción, precio, imagen]
    │
    ├─ [Producto en carrito] ──► [Botón "Remove"]
    ├─ [Producto fuera del carrito] ──► [Botón "Add to cart"]
    │
    ▼
[Clic data-test="back-to-products"]
    │
    ▼
[Fin: /inventory.html]
```

**Postcondition**: Si se agregó o quitó en el detalle, el listado refleja el nuevo estado.
