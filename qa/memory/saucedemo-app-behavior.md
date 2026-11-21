# Comportamiento de saucedemo por usuario y patrones de DOM

> Fuente: exploración en vivo con Playwright (Node, chromium headless) durante la etapa 1, 2026-11-21.
> Cargar en: generación de specs, automatización y estabilización de cualquier módulo.

## Arquitectura relevante para la automatización

- SPA React: los clics que navegan cambian la URL antes de que el DOM nuevo esté listo. Tras un clic que navega, esperar `waitForURL` **y** un selector propio de la vista destino; leer el DOM justo después del clic devuelve datos de la vista anterior (pasó en la exploración: el "detalle" devolvía el listado).
- Sin API propia. Estado en el cliente: cookie `session-username` (expira ~10 min) y `localStorage.cart-contents` (arreglo JSON de ids, p. ej. `[4,0]`). La telemetría va a `backtrace.io` (ignorar en capturas de red).
- Atajo de setup: `localStorage.setItem('cart-contents', '[4,0]')` + recarga arma el carrito sin clics.
- El carrito **no** se borra con logout y se comparte entre usuarios del mismo navegador: un contexto por test.
- Ruta interna sin sesión: la SPA renderiza el login con "Epic sadface: You can only access '{ruta}' when you are logged in." (la URL puede quedar en la ruta pedida o en `/`; asertar el mensaje, no la URL).
- Todas las vistas tienen título de pestaña `Swag Labs`; usar `data-test="title"` para identificar la vista.
- El badge `shopping-cart-badge` no existe en el DOM con el carrito vacío (asertar `toHaveCount(0)`, no texto "0").
- Las filas quitadas del carrito dejan un nodo `.removed_cart_item`; contar `.cart_item`.
- Slug del producto rojo con caracteres especiales: `add-to-cart-test.allthethings()-t-shirt-(red)`; usar `getByTestId`.

## IDs y precios del catálogo

| id | Producto | Precio |
|---|---|---|
| 0 | Sauce Labs Bike Light | $9.99 |
| 1 | Sauce Labs Bolt T-Shirt | $15.99 |
| 2 | Sauce Labs Onesie | $7.99 |
| 3 | Test.allTheThings() T-Shirt (Red) | $15.99 |
| 4 | Sauce Labs Backpack | $29.99 |
| 5 | Sauce Labs Fleece Jacket | $49.99 |

Impuesto 8 % redondeado a centavos: [4,0] -> $39.98 / $3.20 / $43.18; [4] -> $29.99 / $2.40 / $32.39; 6 productos -> $129.94 / $10.40 / $140.34.

## Comportamiento intencional por usuario

| Usuario | Comportamiento observado |
|---|---|
| standard_user | Referencia, sin defectos funcionales salvo los comunes (abajo) |
| locked_out_user | Login rechazado: "Epic sadface: Sorry, this user has been locked out." |
| problem_user | Imágenes `sl-404` en todo el listado; ordenar no tiene efecto; agregar solo funciona en Backpack, Bike Light, Onesie; "Remove" del listado y del detalle no funciona; el enlace del producto abre id+1; en checkout, escribir en apellido escribe en nombre (no se puede avanzar); About -> `https://saucelabs.com/error/404`. Quitar desde `/cart.html` sí funciona |
| performance_glitch_user | Login tarda ~5.2 s; el resto medido es normal. Usar timeout explícito en el login, no subir el timeout global |
| error_user | Ordenar muestra `alert` "Sorting is broken! This error has been reported to Backtrace." (registrar `page.on('dialog')` o el test se bloquea); agregar falla en Bolt T-Shirt, Fleece Jacket, Test.allTheThings(); "Remove" falla en listado y detalle; apellido no admite texto pero el paso 1 avanza igual; `finish` no hace nada; Reset App State lanza "wa.cesetRart is not a function" en consola |
| visual_user | Precios del listado aleatorios en cada carga y a veces sin decimales; detalle/carrito/checkout usan el precio real; imagen Backpack `sl-404`; ícono del carrito desplazado (x=1034,y=39 vs 1220,10); botón del último producto con clase `btn_inventory_misaligned`; orden por precio usa el precio real |

## Defectos comunes a todos los usuarios (candidatos DEF)

- Checkout con carrito vacío permitido (total $0.00, "Item total: $0" sin decimales).
- Campos del paso 1 aceptan solo espacios.
- `/checkout-step-two.html` accesible sin pasar por el paso 1.
- Reset App State no actualiza los botones del listado hasta recargar.
- Carrito compartido entre usuarios del mismo navegador.

## Funcionalidad no listada en el config

- Menú "Dynamic Catalog" con submenú Lazy Load / Spinner / Slider (`/dynamic-catalog-*.html`). Documentado como submódulo INV-DYN.
- Botón "Generate PDF order" en la confirmación: descarga `swag-labs-order-YYYY-MM-DD_HH-MM-SS.pdf` generado en el cliente (requiere `acceptDownloads`).

## Credenciales en scripts

Leer `QA_USER_PASSWORD` y `QA_USER_*_USERNAME` con dotenv desde `qa/07-automation/e2e/.env`; no imprimir valores. La contraseña es pública en la página de login pero en documentación va como `<PLACEHOLDER>`.
