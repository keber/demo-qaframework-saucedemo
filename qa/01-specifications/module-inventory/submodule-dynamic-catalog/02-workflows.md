# Flujos - Catálogo de productos: Dynamic Catalog

### FL-INV-004: Abrir una vista del Dynamic Catalog

**Actor**: Usuario autenticado (`standard_user`)
**Trigger**: Necesidad de ver el catálogo en una vista dinámica
**Precondition**: Sesión activa, en cualquier vista interna

**Flow**:
```
[Clic #react-burger-menu-btn]
    │
    ▼
[Clic data-test="dynamic-catalog-sidebar-link"] ──► [aria-expanded="true", submenú visible]
    │
    ├─ [Lazy Load] ──► [/dynamic-catalog-lazy-load.html]
    ├─ [Spinner] ──► [/dynamic-catalog-spinner.html]
    ├─ [Slider] ──► [/dynamic-catalog-slider.html]
    │
    ▼
[Fin: título "Dynamic Catalog - {vista}"]
```

**Postcondition**: Vista de solo lectura abierta; el carrito no cambia.

### FL-INV-005: Scroll con carga diferida

**Actor**: Usuario autenticado
**Trigger**: Scroll hacia abajo en Lazy Load
**Precondition**: Vista Lazy Load abierta

**Flow**:
```
[12 tarjetas: 8 con datos + 4 "Loading..."]
    │
    ▼
[Scroll hasta dynamic-catalog-lazy-load-sentinel]
    │
    ▼
[Placeholders reemplazados + nuevas tarjetas al final]
    │
    └─ [Repetir scroll] ──► [La lista sigue creciendo]
```

**Postcondition**: Más tarjetas visibles, todas con nombre y precio.

### FL-INV-006: Recorrer el Slider

**Actor**: Usuario autenticado
**Trigger**: Clic en un punto del slider
**Precondition**: Vista Slider abierta

**Flow**:
```
[Tarjeta actual + 6 puntos]
    │
    ▼
[Clic dynamic-catalog-slider-dot-{n}]
    │
    ▼
[Tarjeta del producto n; punto n con aria-current="true"]
    │
    └─ [Sin interacción] ──► [Autoplay avanza al siguiente producto]
```

**Postcondition**: El producto mostrado corresponde al punto activo.
