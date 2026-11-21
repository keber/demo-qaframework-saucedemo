# Flujos - Navegación y menú: Menú lateral, encabezado y footer

### FL-NAV-001: Navegar con el menú lateral

**Actor**: Usuario autenticado (`standard_user`)
**Trigger**: Clic en el botón de menú
**Precondition**: Sesión activa, en cualquier vista interna

**Flow**:
```
[Vista interna]
    │
    ▼
[Clic #react-burger-menu-btn] ──► [.bm-menu-wrap aria-hidden="false"]
    │
    ├─ [All Items] ──► [/inventory.html]
    ├─ [Dynamic Catalog] ──► [Submenú Lazy Load / Spinner / Slider] (INV-DYN)
    ├─ [About] ──► [https://saucelabs.com/]
    ├─ [Logout] ──► [/ sin sesión] (FL-AUTH-004)
    ├─ [Reset App State] ──► [Carrito vacío, menú abierto] (FL-NAV-002)
    │
    └─ [X o Escape] ──► [Menú cerrado, misma vista]
```

**Postcondition**: El usuario llega al destino elegido o el menú queda cerrado.

### FL-NAV-002: Reiniciar el estado de la aplicación

**Actor**: Usuario autenticado
**Trigger**: Clic en "Reset App State"
**Precondition**: Carrito con productos

**Flow**:
```
[/inventory.html, badge N, botones "Remove"]
    │
    ▼
[Abrir menú -> Clic data-test="reset-sidebar-link"]
    │
    ▼
[cart-contents eliminado; badge oculto]
    │
    ▼
[Esperado: botones "Add to cart"] (RN-NAV-007)
```

**Postcondition**: Carrito vacío y UI consistente.

### FL-NAV-003: Enlaces del footer

**Actor**: Usuario autenticado
**Trigger**: Clic en un ícono social
**Precondition**: Footer visible

**Flow**:
```
[Footer]
    │
    ├─ [X] ──► [Nueva pestaña https://x.com/saucelabs]
    ├─ [Facebook] ──► [Nueva pestaña https://www.facebook.com/saucelabs]
    └─ [LinkedIn] ──► [Nueva pestaña https://www.linkedin.com/company/sauce-labs/]
```

**Postcondition**: La tienda sigue abierta en la pestaña original.
