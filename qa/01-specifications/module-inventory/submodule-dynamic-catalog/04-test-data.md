# Datos de prueba - Catálogo de productos: Dynamic Catalog

## Prerequisites

| Item | Description | Source |
|------|-------------|--------|
| Sesión | Login con `standard_user` | `QA_USER_STANDARD_USER_USERNAME` + `QA_USER_PASSWORD` |
| Sesión por usuario no estándar (TC-INV-DYN-012) | Login con `problem_user`, `error_user`, `visual_user` y `performance_glitch_user`, un contexto por usuario | `QA_USER_{ROL}_USERNAME` + `QA_USER_PASSWORD` |
| Contexto sin sesión (TC-INV-DYN-009, 010) | Contexto de navegador nuevo, sin cookie `session-username` | - |
| Catálogo | Productos fijos embebidos en la SPA | Pre-existente |

## Upstream dependencies

No aplica: las vistas no tienen campos dinámicos que dependan de otro registro o módulo.

## Data shapes for key scenarios

### Scenario: precios esperados por producto (incluye variantes de talla)
- Bike Light $9.99 · Bolt T-Shirt $15.99 · Onesie $7.99 · Test.allTheThings() T-Shirt (Red) $15.99 · Backpack $29.99 · Fleece Jacket $49.99
- Una variante "{producto} ({talla})" tiene el precio del producto base

### Scenario: Lazy Load
- Carga inicial esperada: 12 tarjetas, 4 de ellas con `-placeholder`
- Tras scroll: más de 12 tarjetas y ningún placeholder en las ya cargadas (28 tarjetas con nombre tras 3 scrolls)
- Primeras 8 tarjetas: Bike Light $9.99, Bolt T-Shirt (XS) $15.99, Onesie $7.99, Test.allTheThings() T-Shirt (Red) (XS) $15.99, Backpack $29.99, Fleece Jacket (XS) $49.99, Fleece Jacket (S) $49.99, Fleece Jacket (M) $49.99

### Scenario: Spinner
- Esperar `dynamic-catalog-spinner` visible y luego `spinner-item-5-name` (timeout sugerido 10 s, medido entre ~0.9 y ~3.6 s)

### Scenario: Slider
- Punto -> producto: 0 Bike Light, 1 Bolt T-Shirt, 2 Onesie, 3 Test.allTheThings() T-Shirt (Red), 4 Backpack, 5 Fleece Jacket

## Dynamic data generation (EXEC_IDX pattern)

No se generan datos.

```typescript
const EXEC_IDX = process.env.EXEC_IDX ?? String(Math.floor(Date.now() / 60_000) % 100_000);
```

## Data isolation rules

1. Vistas de solo lectura: no alteran el carrito ni otro estado
2. El autoplay del slider es una fuente de flakiness: verificar inmediatamente tras el clic
3. El estado del submenú se conserva al reabrir el menú lateral: leer `aria-expanded` antes de hacer clic en `dynamic-catalog-sidebar-link`, o usar un contexto nuevo por test
4. `performance_glitch_user` requiere timeout explícito en el login (~5.1 s medido); no subir el timeout global
