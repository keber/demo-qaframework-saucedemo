# Módulo: Autenticación (AUTH)

> Especificación generada en la etapa 1 (análisis de módulo) el 2026-11-21 a partir de exploración en vivo de `{{QA_BASE_URL}}` con Playwright.

## Submódulos

| Submódulo | Código | Carpeta | TCs | Alcance |
|---|---|---|---|---|
| Login y sesión | LOG | `submodule-login/` | 24 | Login, errores, usuario bloqueado, rutas protegidas, logout, cookie de sesión |
| **Total** | | | **24** | |

## Flujo E2E

Login (/) -> /inventory.html; logout desde el menú (NAV) devuelve a /.

## Archivos por submódulo

`00-inventory.md` (UI y rutas), `01-business-rules.md` (RN-AUTH-NNN y desviaciones observadas), `02-workflows.md` (FL-AUTH-NNN), `03-roles-permissions.md` (matriz por usuario), `04-test-data.md`, `05-test-scenarios.md` (TC-AUTH-{SUB}-NNN).

## Estado

| Etapa | Estado |
|---|---|
| 1 - Análisis | ✅ 2026-11-21 |
| 2 - Especificación | 🔲 Pendiente |
