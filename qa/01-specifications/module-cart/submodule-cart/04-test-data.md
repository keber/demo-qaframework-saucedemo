# Datos de prueba - Carrito de compras: Carrito

## Prerequisites

| Item | Description | Source |
|------|-------------|--------|
| Sesión | Login con el usuario del escenario | `QA_USER_*_USERNAME` + `QA_USER_PASSWORD` |
| Productos | Catálogo fijo (ids 0-5, ver INV `00-inventory.md`) | Pre-existente |
| Carrito precargado | `localStorage.setItem('cart-contents', '[4,0]')` + recarga | Atajo de setup; la UI lo lee al renderizar |

## Upstream dependencies

| Upstream entity (module) | Validity condition | Consumed by | Rule |
|---|---|---|---|
| Producto (INV) | id existente entre 0 y 5 | Filas de `/cart.html` y badge | RN-CART-002 |
| Sesión (AUTH) | cookie `session-username` válida | Acceso a `/cart.html` | RN-AUTH-007 |

## Data shapes for key scenarios

### Scenario: carrito con 2 productos
- `cart-contents = [4,0]` -> Backpack $29.99 + Bike Light $9.99; badge "2"

### Scenario: carrito con los 6 productos
- Agregar todos desde el listado; badge "6"; `cart-contents = [4,0,1,5,2,3]` (orden A-Z de agregado)

### Scenario: carrito vacío
- Sin `cart-contents`; `/cart.html` sin filas `.cart_item`; badge ausente

### Scenario: aislamiento entre usuarios
- Usuario A (`QA_USER_STANDARD_USER_USERNAME`) agrega 2 productos y hace logout
- Usuario B (`QA_USER_VISUAL_USER_USERNAME`) entra en el mismo contexto
- Esperado: badge ausente

## Dynamic data generation (EXEC_IDX pattern)

No se generan datos: el carrito se arma con ids fijos.

```typescript
const EXEC_IDX = process.env.EXEC_IDX ?? String(Math.floor(Date.now() / 60_000) % 100_000);
```

## Data isolation rules

1. Un contexto de navegador por test; nunca compartir storageState con `cart-contents` entre tests
2. Limpiar `cart-contents` en `beforeEach` cuando se reutiliza un storageState autenticado
3. Contar filas con `.cart_item` (las filas quitadas dejan un nodo `.removed_cart_item`)
