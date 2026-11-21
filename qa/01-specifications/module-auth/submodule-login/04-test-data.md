# Datos de prueba - Autenticación: Login y sesión

## Prerequisites

| Item | Description | Source |
|------|-------------|--------|
| Usuarios publicados | 6 usuarios fijos del sitio (ver `03-roles-permissions.md`) | Pre-existentes (no se crean ni se borran) |
| Contraseña | Común a todos los usuarios | `QA_USER_PASSWORD` (`<PLACEHOLDER>`) |
| URL base | `https://www.saucedemo.com` | `QA_BASE_URL` |

## Upstream dependencies

No aplica: el formulario de login no tiene campos dinámicos ni dependencias de otros módulos.

## Data shapes for key scenarios

### Scenario: login exitoso
- Usuario: `process.env.QA_USER_STANDARD_USER_USERNAME`
- Contraseña: `process.env.QA_USER_PASSWORD`
- Esperado: URL `/inventory.html`, cookie `session-username` con el nombre del usuario

### Scenario: usuario bloqueado
- Usuario: `process.env.QA_USER_LOCKED_OUT_USER_USERNAME`
- Contraseña: `process.env.QA_USER_PASSWORD`
- Esperado: "Epic sadface: Sorry, this user has been locked out."

### Scenario: credenciales inválidas
- Usuario inexistente generado: `qa_user_${EXEC_IDX}` + contraseña válida, o usuario válido + contraseña `invalid_${EXEC_IDX}`
- Variantes de formato: usuario en mayúsculas (`STANDARD_USER`), usuario con espacio inicial
- Esperado: "Epic sadface: Username and password do not match any user in this service"

### Scenario: campos vacíos
- Ambos vacíos / solo usuario / solo contraseña
- Esperado: "Username is required" o "Password is required" según RN-AUTH-001/002

### Scenario: rutas protegidas sin sesión
- Rutas: `/inventory.html`, `/inventory-item.html?id=4`, `/cart.html`, `/checkout-step-one.html`, `/checkout-step-two.html`, `/checkout-complete.html`
- Contexto de navegador nuevo (sin cookies ni storageState)

## Dynamic data generation (EXEC_IDX pattern)

```typescript
const EXEC_IDX = process.env.EXEC_IDX ?? String(Math.floor(Date.now() / 60_000) % 100_000);
const invalidUser = `qa_user_${EXEC_IDX}`;
const invalidPassword = `invalid_${EXEC_IDX}`;
```

## Data isolation rules

1. Cada test usa un contexto de navegador propio; los tests de login negativo no reutilizan storageState
2. El login no tiene efectos persistentes en servidor: no hay limpieza que hacer
3. Los tests de sesión deben limpiar `localStorage` si dependen del carrito (el carrito sobrevive al logout)
