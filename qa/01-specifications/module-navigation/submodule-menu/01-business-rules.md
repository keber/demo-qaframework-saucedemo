# Reglas de negocio - Navegación y menú: Menú lateral, encabezado y footer

### RN-NAV-001: Abrir y cerrar el menú lateral

- **Type**: State Machine
- **Trigger**: Clic en `#react-burger-menu-btn`; luego clic en `#react-burger-cross-btn` o tecla Escape
- **Behavior**: El panel `.bm-menu-wrap` pasa a `aria-hidden="false"` (visible) y vuelve a `aria-hidden="true"` al cerrar

### RN-NAV-002: Menú disponible en todas las vistas internas

- **Type**: Validation
- **Trigger**: Abrir cualquier vista con sesión (listado, detalle, carrito, 3 pasos de checkout, Dynamic Catalog)
- **Behavior**: Botón de menú, logo "Swag Labs", ícono del carrito y footer presentes

### RN-NAV-003: All Items

- **Type**: Integration
- **Trigger**: Clic en `inventory-sidebar-link` desde cualquier vista interna
- **Behavior**: Navega a `/inventory.html`

### RN-NAV-004: About

- **Type**: Integration
- **Trigger**: Clic en `about-sidebar-link`
- **Behavior**: Navega a `https://saucelabs.com/` en la misma pestaña (href fijo)

### RN-NAV-005: Logout

- **Type**: State Machine
- **Trigger**: Clic en `logout-sidebar-link`
- **Behavior**: Cierra la sesión y navega a `/` (detalle en RN-AUTH-009)

### RN-NAV-006: Reset App State vacía el carrito

- **Type**: State Machine
- **Trigger**: Clic en `reset-sidebar-link`
- **Behavior**: Se elimina `cart-contents`, el badge desaparece y el menú permanece abierto
- **Notes**: No reinicia el orden elegido en el listado (se observó "Name (Z to A)" tras el reset)

### RN-NAV-007: Reset App State actualiza los botones del catálogo

- **Type**: State Machine
- **Trigger**: Reset con productos agregados, estando en `/inventory.html`
- **Behavior esperado**: Los botones de los productos vuelven a "Add to cart" de inmediato, consistentes con el carrito vacío
- **Notes**: Observado: siguen mostrando "Remove" hasta recargar la página (ver desviaciones)

### RN-NAV-008: Enlaces sociales del footer

- **Type**: Integration
- **Trigger**: Clic en `social-x`, `social-facebook` o `social-linkedin`
- **Behavior**: Abren en una pestaña nueva (`target="_blank"`) `https://x.com/saucelabs`, `https://www.facebook.com/saucelabs` y `https://www.linkedin.com/company/sauce-labs/` respectivamente

### RN-NAV-009: Texto de copyright

- **Type**: Validation
- **Trigger**: Ver el footer
- **Behavior**: `footer-copy` muestra "© {año} Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy" (observado 2026)

### RN-NAV-010: Opciones del menú

- **Type**: Validation
- **Trigger**: Abrir el menú
- **Behavior**: Se muestran, en este orden, "All Items", "Dynamic Catalog", "About", "Logout" y "Reset App State"

## Desviaciones observadas (candidatos para la etapa 5)

| Usuario | Hallazgo | Regla violada | Clasificación propuesta |
|---|---|---|---|
| todos | Tras "Reset App State" el badge desaparece pero los botones del listado siguen en "Remove" hasta recargar | RN-NAV-007 | DEF |
| problem_user | "About" apunta a `https://saucelabs.com/error/404` | RN-NAV-004 | DEF |
| error_user | "Reset App State" lanza el error JS "wa.cesetRart is not a function" (consola); el badge quedó en 0 en la observación | RN-NAV-006 | A confirmar en la etapa 5 (comportamiento visible no concluyente) |
| todos | Reset no reinicia el orden del listado | - | REC (alcance de "Reset App State" no definido) |
| todos | "About" abre un sitio externo en la misma pestaña, sacando al usuario de la tienda | - | REC |
