# MODULE: Navegación y menú - Submodule: Menú lateral, encabezado y footer

| Field | Value |
|-------|-------|
| Module code | NAV |
| Submodule code | MENU |
| Primary URL | {{QA_BASE_URL}}/inventory.html (presente en todas las vistas internas) |
| Status | Active |
| Last updated | 2026-11-21 |

## Presencia por vista

| Vista | Menú (burger) | Ícono carrito | Footer |
|---|---|---|---|
| `/inventory.html` | ✅ | ✅ | ✅ |
| `/inventory-item.html?id={id}` | ✅ | ✅ | ✅ |
| `/cart.html` | ✅ | ✅ | ✅ |
| `/checkout-step-one.html`, `/checkout-step-two.html`, `/checkout-complete.html` | ✅ | ✅ | ✅ |
| `/dynamic-catalog-*.html` | ✅ | ✅ | ✅ |
| `/` (login) | ❌ | ❌ | ❌ |

## UI Elements - Encabezado

| Element | Selector | Type | Notes |
|---------|----------|------|-------|
| Abrir menú | `#react-burger-menu-btn` (imagen `data-test="open-menu"`) | button | |
| Logo | `.app_logo` | div | "Swag Labs" |
| Carrito | `data-test="shopping-cart-link"` | a | Ver módulo CART |

## UI Elements - Menú lateral

| Element | Selector (data-test) | id | Type | Notes |
|---------|----------------------|----|------|-------|
| Panel | `.bm-menu-wrap` | - | div | `aria-hidden="true"` cerrado, `"false"` abierto |
| Cerrar | `close-menu` (img) / `#react-burger-cross-btn` | `react-burger-cross-btn` | button | También cierra con la tecla Escape |
| All Items | `inventory-sidebar-link` | `inventory_sidebar_link` | a (href `#`) | Navega a `/inventory.html` |
| Dynamic Catalog | `dynamic-catalog-sidebar-link` | `dynamic_catalog_sidebar_link` | a | Despliega submenú (ver INV-DYN) |
| About | `about-sidebar-link` | `about_sidebar_link` | a (href `https://saucelabs.com/`) | Navega en la misma pestaña |
| Logout | `logout-sidebar-link` | `logout_sidebar_link` | a | Ver RN-AUTH-009 |
| Reset App State | `reset-sidebar-link` | `reset_sidebar_link` | a | Limpia el carrito; el menú queda abierto |

Orden visual de las opciones: All Items, Dynamic Catalog, About, Logout, Reset App State.

## UI Elements - Footer

| Element | Selector (data-test) | Type | Destino | Notes |
|---------|----------------------|------|---------|-------|
| Footer | `footer` | footer | - | |
| X | `social-x` | a "X" | `https://x.com/saucelabs` | `target="_blank"` |
| Facebook | `social-facebook` | a "Facebook" | `https://www.facebook.com/saucelabs` | `target="_blank"` |
| LinkedIn | `social-linkedin` | a "LinkedIn" | `https://www.linkedin.com/company/sauce-labs/` | `target="_blank"` |
| Copyright | `footer-copy` | div | - | "© 2026 Sauce Labs. All Rights Reserved. Terms of Service \| Privacy Policy" (el año cambia con el año en curso) |

## API Endpoints

Sin API. "About" y las redes sociales son enlaces externos.
