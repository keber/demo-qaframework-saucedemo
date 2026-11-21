# Reglas de negocio - Autenticación: Login y sesión

> Mensajes de error copiados literalmente desde la UI (sesión de exploración 2026-11-21, en inglés porque la aplicación no está localizada).

### RN-AUTH-001: Usuario obligatorio

- **Type**: Validation
- **Trigger**: Clic en `login-button` (o Enter) con el campo `username` vacío, tenga o no contraseña
- **Behavior**: Se bloquea el envío, se muestra el mensaje de error y ambos campos quedan marcados con icono de error. La URL no cambia
- **Error message**: "Epic sadface: Username is required"
- **Notes**: El usuario se valida antes que la contraseña: con ambos campos vacíos solo se informa el usuario

### RN-AUTH-002: Contraseña obligatoria

- **Type**: Validation
- **Trigger**: Envío con `username` informado y `password` vacío
- **Behavior**: Se bloquea el envío y se muestra el error
- **Error message**: "Epic sadface: Password is required"

### RN-AUTH-003: Credenciales inválidas

- **Type**: Validation
- **Trigger**: Envío con un usuario inexistente, o con un usuario válido y contraseña incorrecta
- **Behavior**: Se rechaza el login con un mensaje genérico que no revela cuál de los dos datos es incorrecto
- **Error message**: "Epic sadface: Username and password do not match any user in this service"

### RN-AUTH-004: Usuario sensible a mayúsculas y espacios

- **Type**: Validation
- **Trigger**: Envío con `STANDARD_USER` o con un espacio inicial (` standard_user`) y la contraseña correcta
- **Behavior**: Se rechaza como credencial inválida (no se normaliza el texto)
- **Error message**: "Epic sadface: Username and password do not match any user in this service"

### RN-AUTH-005: Usuario bloqueado

- **Type**: Access Control
- **Trigger**: Login con `locked_out_user` y la contraseña correcta
- **Behavior**: Se rechaza el acceso y el usuario permanece en `/`
- **Error message**: "Epic sadface: Sorry, this user has been locked out."

### RN-AUTH-006: Login exitoso

- **Type**: State Machine
- **Trigger**: Credenciales válidas de un usuario no bloqueado
- **Behavior**: Se crea la cookie `session-username` con el nombre del usuario y se navega a `/inventory.html`
- **Notes**: Usuarios habilitados: `standard_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user`. `performance_glitch_user` tiene una demora intencional (ver `03-roles-permissions.md`)

### RN-AUTH-007: Rutas internas protegidas

- **Type**: Access Control
- **Trigger**: Acceso directo sin cookie de sesión válida a `/inventory.html`, `/inventory-item.html`, `/cart.html`, `/checkout-step-one.html`, `/checkout-step-two.html` o `/checkout-complete.html`
- **Behavior**: No se muestra el contenido; se presenta el formulario de login con el error
- **Error message**: "Epic sadface: You can only access '{ruta}' when you are logged in." (por ejemplo `'/inventory.html'`; para el detalle se informa `'/inventory-item.html'` sin query string)
- **Notes**: Una cookie `session-username` con un usuario bloqueado o inexistente también es rechazada con este mensaje

### RN-AUTH-008: Cierre del mensaje de error

- **Type**: Validation
- **Trigger**: Clic en `error-button` mientras hay un error visible
- **Behavior**: Desaparecen el mensaje y los iconos de error de ambos campos

### RN-AUTH-009: Logout termina la sesión

- **Type**: State Machine
- **Trigger**: Clic en `logout-sidebar-link` del menú lateral (ver NAV)
- **Behavior**: Se elimina la cookie `session-username`, se navega a `/` y un "Atrás" del navegador o un acceso directo a una ruta interna muestra el error de RN-AUTH-007
- **Notes**: El carrito (`cart-contents` en localStorage) no se limpia al hacer logout (ver RN-CART correspondiente)

### RN-AUTH-010: Contraseña enmascarada

- **Type**: Validation
- **Trigger**: Escritura en el campo `password`
- **Behavior**: El input es `type="password"`; el texto no se muestra en claro

### RN-AUTH-011: Expiración de la sesión

- **Type**: State Machine
- **Trigger**: Paso del tiempo tras el login
- **Behavior**: La cookie `session-username` se crea con una expiración de aproximadamente 10 minutos (observado en los atributos de la cookie). No se ejercitó la espera completa en esta sesión
- **Notes**: Origen `PENDING-BROWSER` para el TC que la cubre

## Desviaciones observadas (candidatos para la etapa 5)

| Hallazgo | Regla relacionada | Clasificación propuesta |
|---|---|---|
| La sesión se valida solo con la cookie `session-username` del cliente: una cookie creada a mano con `standard_user` da acceso a `/inventory.html` sin pasar por el login | RN-AUTH-007 | REC (seguridad): la app es una demo sin backend; no viola una regla de negocio explícita |
| El campo usuario no tiene longitud máxima | - | REC (robustez) |
