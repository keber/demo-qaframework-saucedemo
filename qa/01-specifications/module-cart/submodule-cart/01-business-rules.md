# Reglas de negocio - Carrito de compras: Carrito

### RN-CART-001: Badge refleja la cantidad de productos

- **Type**: Calculation
- **Trigger**: Agregar o quitar un producto (listado, detalle o carrito)
- **Behavior**: `shopping-cart-badge` muestra la cantidad de productos distintos en el carrito (1 a 6). Con 0 productos el badge no se renderiza

### RN-CART-002: Contenido del carrito

- **Type**: Validation
- **Trigger**: Abrir `/cart.html`
- **Behavior**: Se muestra una fila por producto agregado, en orden de agregado, con cantidad "1", nombre, descripción y precio igual al del catálogo

### RN-CART-003: Cantidad unitaria por producto

- **Type**: Validation
- **Trigger**: Agregar un producto
- **Behavior**: Cada producto se agrega una sola vez (el botón pasa a "Remove"); la cantidad no es editable y siempre es 1

### RN-CART-004: Quitar desde el carrito

- **Type**: State Machine
- **Trigger**: Clic en `remove-{slug}` en `/cart.html`
- **Behavior**: La fila desaparece de la lista, el badge resta 1 (se oculta en 0) y el id se elimina de `cart-contents`. Al volver al listado, el producto muestra "Add to cart"

### RN-CART-005: Persistencia del carrito en el navegador

- **Type**: State Machine
- **Trigger**: Recargar la página, o hacer logout y volver a entrar con el mismo usuario
- **Behavior**: El carrito se conserva (`localStorage.cart-contents`)

### RN-CART-006: Seguir comprando

- **Type**: Integration
- **Trigger**: Clic en `continue-shopping`
- **Behavior**: Navega a `/inventory.html` sin modificar el carrito

### RN-CART-007: Ir a checkout

- **Type**: Integration
- **Trigger**: Clic en `checkout`
- **Behavior**: Navega a `/checkout-step-one.html` (ver módulo CHK)

### RN-CART-008: No se puede iniciar checkout con el carrito vacío

- **Type**: Validation
- **Trigger**: Carrito sin productos y clic en `checkout`
- **Behavior esperado**: El checkout no debe poder iniciarse sin productos (botón deshabilitado, oculto o mensaje de error)
- **Notes**: Regla de negocio estándar de e-commerce, no observada en la app. Ver desviaciones

### RN-CART-009: El carrito se vacía al completar la compra

- **Type**: State Machine
- **Trigger**: Clic en `finish` en `/checkout-step-two.html`
- **Behavior**: Se elimina `cart-contents`, el badge desaparece y `/cart.html` queda sin filas

### RN-CART-010: Enlace al detalle desde el carrito

- **Type**: Integration
- **Trigger**: Clic en el nombre de un producto del carrito
- **Behavior**: Navega a `/inventory-item.html?id={id}` del mismo producto, con el botón "Remove"

### RN-CART-011: Carrito aislado por usuario

- **Type**: Access Control
- **Trigger**: Logout de un usuario y login de otro usuario en el mismo navegador
- **Behavior esperado**: El segundo usuario no debe ver el carrito del primero
- **Notes**: Observado: el carrito se comparte (ver desviaciones)

## Desviaciones observadas (candidatos para la etapa 5)

| Hallazgo | Regla violada | Clasificación propuesta |
|---|---|---|
| Con el carrito vacío, `checkout` está habilitado y permite completar una orden con "Item total: $0", "Tax: $0.00", "Total: $0.00" | RN-CART-008 | DEF |
| Tras logout de `standard_user` con 2 productos, `visual_user` entra en el mismo navegador y ve el badge "2" | RN-CART-011 | DEF |
| `problem_user` y `error_user` sí pueden quitar productos desde `/cart.html` (a diferencia del listado) | - | Comportamiento observado, sin desviación en este submódulo |
| La fila quitada deja un nodo oculto con clase `removed_cart_item` en el DOM | - | Nota técnica: contar filas con `.cart_item`, no con nodos hijos |
