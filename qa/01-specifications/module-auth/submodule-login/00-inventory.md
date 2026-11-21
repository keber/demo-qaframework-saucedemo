# MODULE: Autenticación - Submodule: Login y sesión

| Field | Value |
|-------|-------|
| Module code | AUTH |
| Submodule code | LOG |
| Primary URL | {{QA_BASE_URL}}/ |
| Status | Active |
| Last updated | 2026-11-21 |

## Navegación

| Vista | URL | Título de pestaña | Notas |
|---|---|---|---|
| Login | `{{QA_BASE_URL}}/` | `Swag Labs` | Logo de texto `.login_logo` = "Swag Labs" |
| Destino tras login exitoso | `{{QA_BASE_URL}}/inventory.html` | `Swag Labs` | Ver módulo INV |
| Ruta protegida sin sesión | cualquier ruta interna | `Swag Labs` | Se renderiza el formulario de login con mensaje de error (ver RN-AUTH-007) |

La aplicación es una SPA React. Todas las vistas comparten el título de pestaña `Swag Labs`.

## UI Elements

| Element | Selector (data-test) | Type | Required | Notes |
|---------|----------------------|------|----------|-------|
| Contenedor del formulario | `login-container` | div | - | |
| Usuario | `username` (id `user-name`) | input text, placeholder "Username" | Sí | Sin `maxlength` (acepta 300+ caracteres). Sensible a mayúsculas y espacios |
| Contraseña | `password` (id `password`) | input password, placeholder "Password" | Sí | `type="password"`: el valor se enmascara |
| Botón Login | `login-button` (id `login-button`) | input submit, valor "Login" | - | También se envía con Enter desde el campo contraseña |
| Mensaje de error | `error` | h3 dentro de `.error-message-container` | - | Prefijo "Epic sadface: " |
| Cerrar error | `error-button` | button (X) | - | Oculta el mensaje y los iconos de error |
| Iconos de error | `.error_icon` (sin data-test) | svg | - | Uno por campo (2) mientras hay error; los inputs reciben clase `input_error error` |
| Lista de usuarios aceptados | `login-credentials` | div | - | Texto "Accepted usernames are:" + 6 usuarios |
| Contraseña pública | `login-password` | div | - | Texto "Password for all users:" + valor publicado por el sitio (documentar como `<PLACEHOLDER>`) |

## Estado de sesión (cliente)

| Mecanismo | Clave | Valor | Notas |
|---|---|---|---|
| Cookie | `session-username` | nombre del usuario logueado | Dominio `www.saucedemo.com`, expira a los ~10 minutos. Se elimina al hacer logout |
| localStorage | `cart-contents` | arreglo JSON de ids de producto, p. ej. `[4,0,2]` | No se elimina al hacer logout (ver módulo CART) |
| localStorage | `backtrace-guid`, `backtrace-last-active` | telemetría | Ajeno a la lógica de negocio |

## API Endpoints

La aplicación no expone API propia: la autenticación se resuelve en el cliente (bundle `assets/index-*.js`). En la captura de red solo se observaron:

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/`, `/assets/index-*.js` | Carga de la SPA |
| GET | `/?/{ruta}` | Fallback de rutas de la SPA tras un `goto` directo a una ruta interna |
| POST | `https://events.backtrace.io/api/...`, `https://submit.backtrace.io/...` | Telemetría de errores (terceros), sin relación con el login |
