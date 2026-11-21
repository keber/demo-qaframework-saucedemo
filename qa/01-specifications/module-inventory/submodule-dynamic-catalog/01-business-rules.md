# Reglas de negocio - Catálogo de productos: Dynamic Catalog

### RN-INV-014: Submenú desplegable

- **Type**: State Machine
- **Trigger**: Clic en `dynamic-catalog-sidebar-link` con el menú lateral abierto
- **Behavior**: Cambia `aria-expanded` de "false" a "true", el chevron recibe la clase `open` y se muestra `dynamic-catalog-submenu` con los enlaces Lazy Load, Spinner y Slider. No cambia la URL
- **Notes**: El cierre del submenú con un segundo clic no se ejercitó en esta sesión

### RN-INV-015: Rutas del Dynamic Catalog protegidas

- **Type**: Access Control
- **Trigger**: Acceso directo sin sesión a `/dynamic-catalog-lazy-load.html`, `/dynamic-catalog-spinner.html` o `/dynamic-catalog-slider.html`
- **Behavior**: Formulario de login con el error de RN-AUTH-007
- **Error message**: "Epic sadface: You can only access '/dynamic-catalog-slider.html' when you are logged in." (análogo para cada ruta)

### RN-INV-016: Carga diferida (Lazy Load)

- **Type**: State Machine
- **Trigger**: Abrir Lazy Load y hacer scroll hasta el centinela
- **Behavior**: La primera carga muestra 12 tarjetas (8 con datos y 4 placeholders "Loading..."). Cada vez que el centinela entra en pantalla se cargan más tarjetas y los placeholders se reemplazan por datos

### RN-INV-017: Indicador de carga (Spinner)

- **Type**: State Machine
- **Trigger**: Abrir Spinner o recargar la vista
- **Behavior**: Se muestra `dynamic-catalog-spinner` y, al terminar la carga (~2.5-3 s), la grilla con 6 productos

### RN-INV-018: Navegación del Slider

- **Type**: State Machine
- **Trigger**: Clic en `dynamic-catalog-slider-dot-{n}`
- **Behavior**: Se muestra el producto del punto (según su `aria-label`), y ese punto queda con `aria-current="true"` y clase `active`; el resto con `aria-current="false"`
- **Notes**: El slider avanza solo (autoplay); un test que verifique el punto activo debe hacerlo justo después del clic o tolerar el avance

### RN-INV-019: Precios del Dynamic Catalog iguales al catálogo

- **Type**: Calculation
- **Trigger**: Ver productos en cualquiera de las 3 vistas
- **Behavior**: Cada producto (y sus variantes de talla) muestra el mismo precio que en `/inventory.html` (Bike Light $9.99, Bolt T-Shirt $15.99, Onesie $7.99, Test.allTheThings() $15.99, Backpack $29.99, Fleece Jacket $49.99)

### RN-INV-020: Vistas de solo lectura

- **Type**: Validation
- **Trigger**: Abrir cualquier vista del Dynamic Catalog
- **Behavior**: No hay botones de carrito; las tarjetas no navegan al detalle. El badge del carrito sigue visible en el encabezado

## Desviaciones observadas (candidatos para la etapa 5)

| Hallazgo | Regla relacionada | Clasificación propuesta |
|---|---|---|
| En Lazy Load la variante "Test.allTheThings() T-Shirt (Red) (L)" aparece dos veces seguidas en cada ciclo y la secuencia completa se repite sin fin (no hay fin de lista) | RN-INV-016 | REC (datos duplicados / scroll infinito sin fin) |
| No se exploró el Dynamic Catalog con usuarios distintos de `standard_user` | - | Pendiente para la etapa 2 (TC con origen `PENDING-BROWSER`) |
