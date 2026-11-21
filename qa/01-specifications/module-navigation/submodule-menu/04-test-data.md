# Datos de prueba - Navegación y menú: Menú lateral, encabezado y footer

## Prerequisites

| Item | Description | Source |
|------|-------------|--------|
| Sesión | Login con el usuario del escenario | `QA_USER_*_USERNAME` + `QA_USER_PASSWORD` |
| Carrito con productos (para Reset) | `cart-contents = [4,2]` o agregar desde el listado | Setup del test |

## Upstream dependencies

| Upstream entity (module) | Validity condition | Consumed by | Rule |
|---|---|---|---|
| Carrito (CART) | `cart-contents` con al menos 1 id | Reset App State | RN-NAV-006 |
| Sesión (AUTH) | Cookie válida | Logout | RN-NAV-005 |

## Data shapes for key scenarios

### Scenario: destinos externos esperados
- About: `https://saucelabs.com/`
- X: `https://x.com/saucelabs`
- Facebook: `https://www.facebook.com/saucelabs`
- LinkedIn: `https://www.linkedin.com/company/sauce-labs/`
- Recomendación: verificar `href` y `target` en lugar de navegar a sitios de terceros (evita dependencia de red externa y bloqueos anti-bot)

### Scenario: Reset App State
- Precondición: 2 productos en el carrito, en `/inventory.html`
- Esperado: badge ausente, `cart-contents` ausente, botones "Add to cart"

## Dynamic data generation (EXEC_IDX pattern)

No se generan datos.

```typescript
const EXEC_IDX = process.env.EXEC_IDX ?? String(Math.floor(Date.now() / 60_000) % 100_000);
```

## Data isolation rules

1. Reset y Logout modifican el estado: usar un contexto propio por test
2. No depender del año del copyright: construirlo con `new Date().getFullYear()`
