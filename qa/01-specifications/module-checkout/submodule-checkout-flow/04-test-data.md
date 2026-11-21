# Datos de prueba - Checkout: Flujo de compra

## Prerequisites

| Item | Description | Source |
|------|-------------|--------|
| Sesión | Login con el usuario del escenario | `QA_USER_*_USERNAME` + `QA_USER_PASSWORD` |
| Carrito con productos | `localStorage.setItem('cart-contents', '[4,0]')` o agregar desde el listado | Setup del test |
| Datos del cliente | Nombre, apellido y código postal ficticios | Generados con EXEC_IDX |

## Upstream dependencies

| Upstream entity (module) | Validity condition | Consumed by | Rule |
|---|---|---|---|
| Carrito (CART) | `cart-contents` con al menos 1 id válido (0-5) | Paso 2 (filas y totales) | RN-CHK-007, RN-CART-008 |
| Producto (INV) | Precio real del catálogo | Item total, Tax, Total | RN-CHK-008/009/010 |
| Sesión (AUTH) | Cookie `session-username` válida | Acceso a los 3 pasos | RN-CHK-017 |

## Data shapes for key scenarios

### Scenario: happy path
- Carrito `[4,0]`
- firstName `QA-${EXEC_IDX}`, lastName `Pérez`, postalCode `8320000`
- Esperado: "Item total: $39.98", "Tax: $3.20", "Total: $43.18"

### Scenario: cálculo con 1 y con 6 productos
- `[4]` -> $29.99 / $2.40 / $32.39
- `[4,0,1,5,2,3]` -> $129.94 / $10.40 / $140.34
- Fórmula para asserts dinámicos: `tax = Math.round(sub * 0.08 * 100) / 100`, `total = sub + tax`, formatear con `toFixed(2)`

### Scenario: obligatorios
- Vacíos -> "Error: First Name is required"
- Solo nombre -> "Error: Last Name is required"
- Nombre + apellido -> "Error: Postal Code is required"
- Solo espacios en los 3 -> esperado "Error: First Name is required"

### Scenario: contenido del PDF (TC-CHK-FLW-026)
- Carrito `[4,0]`, cliente con nombre y apellido conocidos y postalCode `8320000`
- Texto esperado tras extraerlo del PDF: "Order Receipt", "{firstName} {lastName}", "8320000", "Sauce Labs Backpack $29.99", "Sauce Labs Bike Light $9.99", "Item total $39.98", "Tax $3.20", "Total $43.18", "Thank you for your order!"
- Extracción de texto: requiere un parser de PDF como devDependency de `qa/07-automation/e2e` (decisión de la etapa 5); no asertar la hora de "Order Date" (depende de la zona horaria del runner)

### Scenario: carrito vacío
- Sin `cart-contents`; esperado: no poder iniciar checkout (RN-CART-008)

## Dynamic data generation (EXEC_IDX pattern)

```typescript
const EXEC_IDX = process.env.EXEC_IDX ?? String(Math.floor(Date.now() / 60_000) % 100_000);
const customer = { firstName: `QA-${EXEC_IDX}`, lastName: 'Pérez', postalCode: '8320000' };
```

## Data isolation rules

1. Cada test arma su propio carrito en un contexto nuevo
2. `finish` vacía el carrito: no encadenar tests que dependan del carrito tras una compra
3. La descarga del PDF requiere `acceptDownloads: true` en el contexto; el archivo se guarda en el directorio temporal del test
