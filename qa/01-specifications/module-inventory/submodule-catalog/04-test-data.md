# Datos de prueba - Catálogo de productos: Listado y detalle

## Prerequisites

| Item | Description | Source |
|------|-------------|--------|
| Sesión | Login con el usuario del escenario | `QA_USER_*_USERNAME` + `QA_USER_PASSWORD` |
| Catálogo | 6 productos fijos (tabla en `00-inventory.md`) | Embebido en la SPA (no se crea ni se modifica) |
| Carrito vacío | `localStorage.cart-contents` ausente | Limpiar en `beforeEach` (`localStorage.removeItem('cart-contents')`) o contexto nuevo |

## Upstream dependencies

No hay dependencias de otros módulos: el catálogo y las opciones de orden son estáticos (RN-INV-013). El estado de los botones depende del carrito (`cart-contents`), que se prepara directamente en localStorage.

## Data shapes for key scenarios

### Scenario: orden esperado por opción (precios reales)
- `az`: Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, Test.allTheThings() T-Shirt (Red)
- `za`: inverso del anterior
- `lohi`: Onesie $7.99, Bike Light $9.99, Bolt T-Shirt $15.99, Test.allTheThings() $15.99, Backpack $29.99, Fleece Jacket $49.99
- `hilo`: Fleece Jacket $49.99, Backpack $29.99, Bolt T-Shirt $15.99, Test.allTheThings() $15.99, Bike Light $9.99, Onesie $7.99
- Recomendación: en la automatización comparar contra el arreglo de precios leído y ordenado, no contra una lista fija, para tolerar empates

### Scenario: producto en carrito antes de abrir el detalle
- Precondición: `localStorage.setItem('cart-contents', '[4]')` y recarga
- Esperado: el detalle de id 4 muestra "Remove"

### Scenario: producto inexistente
- URL: `/inventory-item.html?id=99`
- Esperado actual: "ITEM NOT FOUND"

## Dynamic data generation (EXEC_IDX pattern)

No se generan datos: el catálogo es fijo. Si se necesita un id inválido, usar uno fuera de 0-5.

```typescript
const EXEC_IDX = process.env.EXEC_IDX ?? String(Math.floor(Date.now() / 60_000) % 100_000);
```

## Data isolation rules

1. Cada test parte con carrito vacío (contexto nuevo o limpieza de `cart-contents`)
2. Los tests por usuario (`problem_user`, `error_user`, `visual_user`) usan su propio contexto/storageState
3. No hay datos de servidor que limpiar
