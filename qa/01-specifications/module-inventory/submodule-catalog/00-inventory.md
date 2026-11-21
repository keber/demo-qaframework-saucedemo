# MODULE: Catálogo de productos - Submodule: Listado y detalle

| Field | Value |
|-------|-------|
| Module code | INV |
| Submodule code | CAT |
| Primary URL | {{QA_BASE_URL}}/inventory.html |
| Status | Active |
| Last updated | 2026-11-21 |

## Navegación

| Vista | URL | Título visible (`data-test="title"`) | Notas |
|---|---|---|---|
| Listado | `/inventory.html` | "Products" | Destino tras el login y de "All Items" / "Back Home" |
| Detalle | `/inventory-item.html?id={id}` | (sin título; botón "Back to products") | `id` de 0 a 5; un id inexistente muestra "ITEM NOT FOUND" |

Título de pestaña en ambas vistas: `Swag Labs`.

## UI Elements - Listado

| Element | Selector (data-test) | Type | Required | Notes |
|---------|----------------------|------|----------|-------|
| Título | `title` | span | - | "Products" |
| Ordenamiento | `product-sort-container` | select | - | Opciones estáticas (ver tabla siguiente). Valor por defecto `az` |
| Opción activa | `active-option` | span | - | Texto de la opción seleccionada |
| Lista | `inventory-list` | div | - | 6 tarjetas `inventory-item` |
| Imagen (enlace) | `item-{id}-img-link` | a | - | Navega al detalle |
| Imagen | `inventory-item-{slug}-img` | img | - | `alt` = nombre del producto |
| Nombre (enlace) | `item-{id}-title-link` | a | - | Navega al detalle; contiene `inventory-item-name` |
| Descripción | `inventory-item-desc` | div | - | |
| Precio | `inventory-item-price` | div | - | Formato `$NN.NN` |
| Agregar al carrito | `add-to-cart-{slug}` | button "Add to cart" | - | Se reemplaza por `remove-{slug}` "Remove" al agregar |
| Badge del carrito | `shopping-cart-badge` dentro de `shopping-cart-link` | span | - | Ver módulo CART |

### Opciones de ordenamiento (estáticas)

| value | Texto |
|---|---|
| `az` | Name (A to Z) |
| `za` | Name (Z to A) |
| `lohi` | Price (low to high) |
| `hilo` | Price (high to low) |

### Catálogo observado (orden por defecto A-Z)

| id | Nombre | Precio | slug (para `add-to-cart-` / `remove-`) | Imagen |
|---|---|---|---|---|
| 4 | Sauce Labs Backpack | $29.99 | `sauce-labs-backpack` | `/assets/sauce-backpack-1200x1500-*.jpg` |
| 0 | Sauce Labs Bike Light | $9.99 | `sauce-labs-bike-light` | `/assets/bike-light-1200x1500-*.jpg` |
| 1 | Sauce Labs Bolt T-Shirt | $15.99 | `sauce-labs-bolt-t-shirt` | `/assets/bolt-shirt-1200x1500-*.jpg` |
| 5 | Sauce Labs Fleece Jacket | $49.99 | `sauce-labs-fleece-jacket` | `/assets/sauce-pullover-1200x1500-*.jpg` |
| 2 | Sauce Labs Onesie | $7.99 | `sauce-labs-onesie` | `/assets/red-onesie-1200x1500-*.jpg` |
| 3 | Test.allTheThings() T-Shirt (Red) | $15.99 | `test.allthethings()-t-shirt-(red)` | `/assets/red-tatt-1200x1500-*.jpg` |

Nota: el slug del último producto contiene `.` y paréntesis; en selectores CSS usar comillas dentro del atributo (`[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]`) o `getByTestId`.

## UI Elements - Detalle

| Element | Selector (data-test) | Type | Notes |
|---------|----------------------|------|-------|
| Volver | `back-to-products` | button "Back to products" | Navega a `/inventory.html` |
| Imagen | `item-{slug}-img` | img | |
| Nombre | `inventory-item-name` | div | Clase `inventory_details_name` |
| Descripción | `inventory-item-desc` | div | |
| Precio | `inventory-item-price` | div | |
| Agregar / quitar | `add-to-cart` / `remove` | button | Sin slug en el detalle |
| Producto inexistente | `item-item-not-found-img`, nombre "ITEM NOT FOUND", precio "$√-1" | - | Con `id` fuera de rango (p. ej. 6 o 99) |

## API Endpoints

Sin API: el catálogo está embebido en el bundle de la SPA. Solo se observan GET de assets (`/assets/*.jpg`) y el fallback `GET /?/inventory-item.html&id={id}` en navegación directa.
