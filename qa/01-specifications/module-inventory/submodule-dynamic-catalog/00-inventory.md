# MODULE: Catálogo de productos - Submodule: Dynamic Catalog

| Field | Value |
|-------|-------|
| Module code | INV |
| Submodule code | DYN |
| Primary URL | {{QA_BASE_URL}}/dynamic-catalog-lazy-load.html |
| Status | Active |
| Last updated | 2026-11-21 |

> Funcionalidad descubierta en la exploración: no figura en la descripción del módulo en `qa-framework.config.json`. Se accede desde el menú lateral "Dynamic Catalog", que despliega un submenú con tres vistas de solo lectura (sin botones de carrito). Se separa en un submódulo propio porque tiene rutas, selectores y reglas de carga distintas al listado principal.

## Navegación

| Vista | Acceso | URL | Título (`data-test="title"`) |
|---|---|---|---|
| Lazy Load | Menú -> Dynamic Catalog -> `dynamic-catalog-lazy-load-link` | `/dynamic-catalog-lazy-load.html` | "Dynamic Catalog - Lazy Load" |
| Spinner | Menú -> Dynamic Catalog -> `dynamic-catalog-spinner-link` | `/dynamic-catalog-spinner.html` | "Dynamic Catalog - Spinner" |
| Slider | Menú -> Dynamic Catalog -> `dynamic-catalog-slider-link` | `/dynamic-catalog-slider.html` | "Dynamic Catalog - Slider" |

## UI Elements - Menú

| Element | Selector (data-test) | Type | Notes |
|---------|----------------------|------|-------|
| Entrada del menú | `dynamic-catalog-sidebar-link` | a (role=button) | `aria-expanded` false/true, `aria-controls="dynamic_catalog_submenu"`; no navega, solo despliega |
| Submenú | `dynamic-catalog-submenu` | div | Visible solo con `aria-expanded="true"` |
| Lazy Load | `dynamic-catalog-lazy-load-link` | a | |
| Spinner | `dynamic-catalog-spinner-link` | a | |
| Slider | `dynamic-catalog-slider-link` | a | |

## UI Elements - Lazy Load

| Element | Selector (data-test) | Notes |
|---|---|---|
| Contenedor | `dynamic-catalog-lazy-load-container` | |
| Tarjeta | `lazy-load-item-{n}` | Con `-img`, `-name`, `-price`; las aún no cargadas tienen `-placeholder` con texto "Loading..." |
| Centinela de scroll | `dynamic-catalog-lazy-load-sentinel` | Dispara la carga de la siguiente página |

Carga inicial: 12 tarjetas (8 con datos y 4 placeholders "Loading..."). Al hacer scroll se agregan más tarjetas de forma continua (48 tras 6 scrolls). Los productos incluyen variantes de talla, p. ej. "Sauce Labs Fleece Jacket (XS)" ... "(XXL)", y la secuencia se repite. Las tarjetas no son navegables (clic sin efecto).

## UI Elements - Spinner

| Element | Selector (data-test) | Notes |
|---|---|---|
| Contenedor | `dynamic-catalog-spinner-container` | |
| Spinner | `dynamic-catalog-spinner` | Visible durante ~2.4-2.9 s (medido) |
| Grilla | `dynamic-catalog-spinner-grid` | Aparece al terminar la carga |
| Tarjeta | `spinner-item-{0..5}` con `-img`, `-name`, `-price` | 6 productos: Bike Light, Bolt T-Shirt, Onesie, Test.allTheThings() T-Shirt (Red), Backpack, Fleece Jacket |

## UI Elements - Slider

| Element | Selector (data-test) | Notes |
|---|---|---|
| Contenedor | `dynamic-catalog-slider-container` | |
| Tarjeta actual | `dynamic-catalog-slider-item` con `-img`, `-name`, `-price` | Una tarjeta a la vez |
| Puntos | `dynamic-catalog-slider-dots` / `dynamic-catalog-slider-dot-{0..5}` | button con `aria-label="Show {producto}"`, `aria-current` true en el activo y clase `active` |

Orden de los puntos: 0 Bike Light, 1 Bolt T-Shirt, 2 Onesie, 3 Test.allTheThings() T-Shirt (Red), 4 Backpack, 5 Fleece Jacket. El slider avanza solo (autoplay; en 6 s pasó de Fleece Jacket a Onesie).

## API Endpoints

Sin API. Datos embebidos en la SPA; solo GET de imágenes.
