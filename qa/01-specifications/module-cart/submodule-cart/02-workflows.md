# Flujos - Carrito de compras: Carrito

### FL-CART-001: Revisar el carrito y continuar al checkout

**Actor**: Usuario autenticado (`standard_user`)
**Trigger**: Clic en el ícono del carrito
**Precondition**: Al menos 1 producto agregado

**Flow**:
```
[Cualquier vista interna, badge = N]
    │
    ▼
[Clic data-test="shopping-cart-link"]
    │
    ▼
[/cart.html "Your Cart": N filas con QTY 1, nombre, precio]
    │
    ├─ [Clic "Continue Shopping"] ──► [/inventory.html, carrito intacto]
    ├─ [Clic nombre] ──► [/inventory-item.html?id={id}]
    │
    ▼
[Clic data-test="checkout"]
    │
    ▼
[Fin: /checkout-step-one.html]
```

**Postcondition**: Checkout iniciado con el carrito actual.

### FL-CART-002: Quitar productos en el carrito

**Actor**: Usuario autenticado
**Trigger**: Clic en "Remove" de una fila
**Precondition**: Carrito con productos

**Flow**:
```
[/cart.html con N filas]
    │
    ▼
[Clic remove-{slug}]
    │
    ▼
[N-1 filas; badge N-1 (oculto si 0); cart-contents sin el id]
    │
    └─ [N-1 = 0] ──► [Carrito vacío; "Checkout" debería quedar bloqueado (RN-CART-008)]
```

**Postcondition**: Carrito actualizado y consistente con el listado.

### FL-CART-003: Persistencia entre sesiones

**Actor**: Usuario autenticado
**Trigger**: Logout y nuevo login
**Precondition**: Carrito con productos

**Flow**:
```
[Carrito con N productos]
    │
    ▼
[Logout] ──► [cart-contents sigue en localStorage]
    │
    ├─ [Login mismo usuario] ──► [Badge N] (RN-CART-005)
    └─ [Login otro usuario] ──► [Esperado: carrito vacío] (RN-CART-011)
```

**Postcondition**: El carrito pertenece al usuario que lo armó.
