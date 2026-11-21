# REC-SD-011: La carga directa de una ruta interna responde HTTP 404

| Field | Value |
|-------|-------|
| ID | REC-SD-011 |
| Module | NAV |
| Category | Observabilidad / testabilidad |
| Related TCs | TC-NAV-MENU-015 |
| Date | 2026-11-21 |
| Status | Open |

## Hallazgo

Al cargar directamente `/inventory.html` (u otra ruta interna) el servidor responde con estado HTTP 404 y la SPA se renderiza igual como fallback. El navegador registra en consola "Failed to load resource: the server responded with a status of 404 ()" y, desde el bundle, "Permissions policy violation: unload is not allowed in this document.". Ocurre para todos los usuarios (también `standard_user`) y sin ninguna acción del usuario.

En la etapa 1 se había observado para `error_user` el error "wa.cesetRart is not a function" al ejecutar Reset App State. En la ejecución de la etapa 5 ese error no se reproduce: Reset App State de `error_user` vacía el carrito sin `pageerror` ni errores de consola (TC-NAV-MENU-015 en verde, no se abre un DEF).

## Por qué no es un defecto

Ninguna regla de negocio de `qa/01-specifications/` define el código de estado HTTP de las rutas ni la ausencia de mensajes de consola al cargar una vista. La página funciona correctamente.

## Recomendación

Configurar el hosting para servir el fallback de la SPA con estado 200. Mientras tanto, los tests que vigilan errores de consola registran los listeners después de cargar la vista (ver `tests/navigation/menu.spec.ts`).
