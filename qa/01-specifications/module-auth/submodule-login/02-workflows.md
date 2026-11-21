# Flujos - Autenticación: Login y sesión

### FL-AUTH-001: Login exitoso

**Actor**: Cualquier usuario habilitado (`standard_user` por defecto)
**Trigger**: El usuario abre `{{QA_BASE_URL}}/`
**Precondition**: Sin sesión activa (sin cookie `session-username`)

**Flow**:
```
[Inicio: {{QA_BASE_URL}}/]
    │
    ▼
[Escribir usuario en data-test="username"]
    │
    ▼
[Escribir contraseña (QA_USER_PASSWORD) en data-test="password"]
    │
    ▼
[Clic en data-test="login-button" o Enter]
    │
    ├─ [Usuario vacío] ──► [Error "Username is required"] (RN-AUTH-001)
    ├─ [Contraseña vacía] ──► [Error "Password is required"] (RN-AUTH-002)
    ├─ [Credenciales inválidas] ──► [Error "...do not match any user..."] (RN-AUTH-003/004)
    ├─ [locked_out_user] ──► [Error "...has been locked out."] (RN-AUTH-005)
    │
    ▼
[Cookie session-username creada]
    │
    ▼
[Fin: /inventory.html con título "Products"]
```

**Postcondition**: Sesión activa; el usuario ve el catálogo.

### FL-AUTH-002: Corrección tras un error de login

**Actor**: Cualquier usuario
**Trigger**: Un intento de login fallido
**Precondition**: Mensaje `data-test="error"` visible

**Flow**:
```
[Error visible + iconos en ambos campos]
    │
    ├─ [Clic en data-test="error-button"] ──► [Mensaje e iconos ocultos] (RN-AUTH-008)
    │
    ▼
[Corregir credenciales y reenviar]
    │
    ▼
[Fin: /inventory.html]
```

**Postcondition**: Sesión activa.

### FL-AUTH-003: Acceso directo a una ruta protegida sin sesión

**Actor**: Visitante no autenticado
**Trigger**: Navegación directa a una ruta interna (p. ej. `/cart.html`)
**Precondition**: Sin cookie de sesión

**Flow**:
```
[goto {{QA_BASE_URL}}/cart.html]
    │
    ▼
[La SPA no renderiza el contenido protegido]
    │
    ▼
[Fin: formulario de login + "You can only access '/cart.html' when you are logged in."]
```

**Postcondition**: Sigue sin sesión; tras un login válido se navega a `/inventory.html` (no a la ruta solicitada).

### FL-AUTH-004: Logout

**Actor**: Usuario autenticado
**Trigger**: Abrir el menú lateral y elegir "Logout"
**Precondition**: Sesión activa

**Flow**:
```
[Cualquier vista interna]
    │
    ▼
[Clic en #react-burger-menu-btn]
    │
    ▼
[Clic en data-test="logout-sidebar-link"]
    │
    ▼
[Cookie session-username eliminada]
    │
    ▼
[Fin: {{QA_BASE_URL}}/ con formulario de login vacío]
    │
    └─ [Atrás del navegador] ──► [Login + error de ruta protegida] (RN-AUTH-009)
```

**Postcondition**: Sin sesión. El carrito persiste en localStorage.
