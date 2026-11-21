# Reglas de negocio - Catálogo de productos: Listado y detalle

> La línea base de comportamiento es `standard_user`. Las variaciones por usuario se listan al final como desviaciones.

### RN-INV-001: Catálogo de 6 productos

- **Type**: Validation
- **Trigger**: Carga de `/inventory.html` con sesión activa
- **Behavior**: Se listan exactamente 6 productos, cada uno con imagen, nombre, descripción, precio y botón "Add to cart" (nombres y precios en `00-inventory.md`)

### RN-INV-002: Orden por defecto A-Z

- **Type**: Calculation
- **Trigger**: Primera carga del listado o recarga de la página
- **Behavior**: El listado se ordena por nombre ascendente y `active-option` muestra "Name (A to Z)"
- **Notes**: La selección de orden no persiste: tras recargar la página vuelve a A-Z

### RN-INV-003: Ordenamiento por nombre

- **Type**: Calculation
- **Trigger**: Selección de `az` o `za` en `product-sort-container`
- **Behavior**: Se reordena por nombre ascendente (A-Z) o descendente (Z-A). Z-A empieza en "Test.allTheThings() T-Shirt (Red)" y termina en "Sauce Labs Backpack"

### RN-INV-004: Ordenamiento por precio

- **Type**: Calculation
- **Trigger**: Selección de `lohi` o `hilo`
- **Behavior**: Se reordena por el precio mostrado, ascendente ($7.99 ... $49.99) o descendente ($49.99 ... $7.99). Con precios iguales ($15.99) el orden observado es Bolt T-Shirt antes que Test.allTheThings() T-Shirt (Red) en ambos sentidos
- **Notes**: El orden debe coincidir con el precio que ve el usuario

### RN-INV-005: Agregar al carrito desde el listado

- **Type**: State Machine
- **Trigger**: Clic en `add-to-cart-{slug}`
- **Behavior**: El botón cambia a `remove-{slug}` con texto "Remove", el badge del carrito suma 1 y el id del producto se agrega a `localStorage.cart-contents`

### RN-INV-006: Quitar del carrito desde el listado

- **Type**: State Machine
- **Trigger**: Clic en `remove-{slug}`
- **Behavior**: El botón vuelve a "Add to cart", el badge resta 1 (desaparece en 0) y el id se elimina de `cart-contents`

### RN-INV-007: Navegación al detalle

- **Type**: Integration
- **Trigger**: Clic en el nombre (`item-{id}-title-link`) o en la imagen (`item-{id}-img-link`)
- **Behavior**: Se navega a `/inventory-item.html?id={id}` del **mismo** producto, con el mismo nombre, descripción y precio que en el listado

### RN-INV-008: Estado del carrito reflejado en el detalle

- **Type**: State Machine
- **Trigger**: Abrir el detalle de un producto
- **Behavior**: Si el producto ya está en el carrito se muestra `remove` "Remove"; si no, `add-to-cart` "Add to cart". Los botones del detalle alternan el estado igual que en el listado (RN-INV-005/006)

### RN-INV-009: Volver al listado

- **Type**: Integration
- **Trigger**: Clic en `back-to-products`
- **Behavior**: Navega a `/inventory.html`

### RN-INV-010: Producto inexistente

- **Type**: Validation
- **Trigger**: Acceso a `/inventory-item.html?id=` con un id que no existe (p. ej. 6, 99)
- **Behavior**: Se muestra una tarjeta con nombre "ITEM NOT FOUND", precio "$√-1" y un botón "Add to cart"
- **Notes**: Comportamiento de la demo; ver recomendación en desviaciones

### RN-INV-011: Imagen correcta por producto

- **Type**: Validation
- **Trigger**: Carga del listado
- **Behavior**: Cada tarjeta muestra la imagen propia del producto (`alt` = nombre); ninguna usa la imagen genérica `sl-404`

### RN-INV-012: Precio consistente entre vistas

- **Type**: Calculation
- **Trigger**: Ver un producto en listado, detalle, carrito y resumen de checkout
- **Behavior**: El precio es el mismo en todas las vistas y tiene formato de dos decimales (`$NN.NN`)

### RN-INV-013: Opciones de orden estáticas

- **Type**: Dependency
- **Depends on**: Ninguna entidad externa: lista estática definida en la SPA
- **Scoping field**: No aplica
- **Upstream validity condition**: No aplica
- **Real endpoint observed**: Ninguno (no hay tráfico de red al abrir o cambiar el select)
- **Values tried**: `za`, `lohi`, `hilo`, `az` con `standard_user` (opciones enumeradas); `za`, `lohi`, `hilo` operados también con los otros 4 usuarios habilitados sin que cambie la lista de opciones
- **Notes**: Se documenta como Dependency para dejar constancia de que se verificó con varios valores y usuarios que el campo no es dinámico

## Desviaciones observadas por usuario (candidatos para la etapa 5)

| Usuario | Hallazgo observado | Regla violada | Clasificación propuesta |
|---|---|---|---|
| problem_user | Todas las imágenes del listado son `/assets/sl-404-*.jpg` | RN-INV-011 | DEF |
| problem_user | Cambiar el orden no tiene efecto: la lista y `active-option` quedan en A-Z | RN-INV-003, RN-INV-004 | DEF |
| problem_user | "Add to cart" solo funciona para Backpack, Bike Light y Onesie; Bolt T-Shirt, Fleece Jacket y Test.allTheThings() no cambian | RN-INV-005 | DEF |
| problem_user | "Remove" en el listado no quita el producto (badge y botón no cambian) | RN-INV-006 | DEF |
| problem_user | El enlace del nombre abre el producto con id+1 (Backpack id 4 -> id 5 Fleece Jacket; Fleece id 5 -> id 6 "ITEM NOT FOUND") | RN-INV-007 | DEF |
| problem_user | En el detalle, "Remove" no quita el producto | RN-INV-008 | DEF |
| error_user | Cambiar el orden muestra el alert "Sorting is broken! This error has been reported to Backtrace." y no reordena | RN-INV-003, RN-INV-004 | DEF |
| error_user | "Add to cart" falla para Bolt T-Shirt, Fleece Jacket y Test.allTheThings() (error JS "Failed to add item to the cart.") | RN-INV-005 | DEF |
| error_user | "Remove" falla en listado y detalle (error JS "Failed to remove item from cart.") | RN-INV-006, RN-INV-008 | DEF |
| visual_user | Los precios del listado son aleatorios en cada carga (p. ej. $2.73, $90.73) y no coinciden con detalle y carrito ($29.99 para Backpack) | RN-INV-012 | DEF |
| visual_user | Precios sin dos decimales (p. ej. "$42.8", "$3") | RN-INV-012 | DEF |
| visual_user | El orden por precio usa el precio real, no el mostrado | RN-INV-004 | DEF |
| visual_user | Imagen de Backpack es `sl-404`; el ícono del carrito está desplazado (x=1034,y=39 vs x=1220,y=10 en standard) y el botón del último producto tiene la clase `btn_inventory_misaligned` | RN-INV-011 | DEF (visual) |
| performance_glitch_user | Sin diferencias funcionales en el catálogo; solo demora en el login | - | - |
| todos | Producto inexistente muestra "ITEM NOT FOUND" con precio "$√-1" y botón "Add to cart" operable | - | REC (manejo de error 404) |
