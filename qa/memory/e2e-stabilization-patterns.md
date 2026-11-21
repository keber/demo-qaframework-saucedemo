# E2E Stabilization Patterns

> A running log of flakiness patterns found in this project and the techniques used to fix them.
> Load this file when investigating intermittent test failures or refactoring fragile specs.

## Crash-Recovery Pattern

When the application server crashes intermittently (e.g. unhandled error page with a Reload link),
a bare `waitFor` will timeout. Use `Promise.race` to detect the error state and recover:

```typescript
const outcome = await Promise.race([
  targetElement.waitFor({ state: 'visible', timeout: 60_000 }).then(() => 'ready' as const),
  page.getByText('An unhandled error has occurred.').waitFor({ state: 'visible', timeout: 60_000 }).then(() => 'crash' as const),
]).catch(() => 'timeout' as const);

if (outcome === 'crash') {
  await page.getByRole('link', { name: 'Reload' }).click();
  await targetElement.waitFor({ state: 'visible', timeout: 60_000 });
}
```

> Document which spec files use this pattern and under what conditions it fires.

## Persona sessions (saucedemo, etapa 5)

- Una sesión por persona: `global-setup.ts` guarda `.auth/user-default.json` (lane, standard_user) y `.auth/<persona>.json` (problem, performance_glitch, error, visual). Los tests eligen con `test.use({ qaUser: '<persona>' })`; `'anonymous'` arranca sin sesión.
- Un segundo login del mismo usuario no invalida otras sesiones (no hay sesión de servidor): `fullyParallel: true` con 2 workers locales es seguro.
- Los tests que escriben la contraseña real van en `*.login.spec.ts` (proyecto opt-in `login-flow`, sin trazas). `npm run test:all` corre todo junto (`QA_RUN_LOGIN_FLOW=1`).

## Strict-Mode Selector Conflicts

`getByText()` and similar matchers can match multiple elements, triggering strict-mode violations.
Scope selectors to the most specific container available.

> Document conflicts found in this project here.
> Example: a pagination counter regex that also matches a card element.
> Fix: use a scoped `locator('.specific-class')` instead of a broad text match.

## Known Flaky Failure Types

Document categories of instability specific to this project. A row per pattern is enough.

| ID | Root cause | Fix | Affected tests |
|---|---|---|---|
| FLK-SD-01 | La cookie `session-username` vence 600 s después del login y no se renueva: un storageState reutilizado más de 10 min deja de autenticar | `fixtures/base.ts` revisa el `expires` de la cookie antes de cada test y, si quedan menos de `QA_SESSION_REFRESH_MARGIN_S` (150 s), renueva el storageState con `scripts/saucedemo-session.js` en un proceso hijo (fuera del runner, sin trazas) | Toda la suite por defecto |
| FLK-SD-02 | `page.goto()` directo a una ruta interna devuelve HTTP 404 (fallback de la SPA) y deja 2 errores de consola ajenos al TC (REC-SD-011) | Registrar `page.on('console')` después de cargar la vista | TC-NAV-MENU-015 |
| FLK-SD-03 | El placeholder de Lazy Load usa U+2026 ("Loading" + elipsis) y el plan lo escribe "Loading..." por la regla 11 | Regex `/^Loading(\.\.\.\|\u2026)$/` escrita con escape ASCII | TC-INV-DYN-002 |
| FLK-SD-04 | `pdf-parse` 1.1.1 (pdf.js antiguo) falla con "bad XRef entry" en algunos PDF de la orden (intermitente según el contenido); además cada extractor une o separa los fragmentos de texto de forma distinta ("Sauce Labs Backpack   $ 29.99", "O R D E R") | Extraer con `pdfjs-dist` 4.10.38 en un proceso hijo (`scripts/pdf-text.mjs`, ESM) y comparar sin espacios en ambos lados (`replace(/\s+/g, '')`); se exige cada token. Un fallo del parser es `InfraError` | TC-CHK-FLW-026 |
| FLK-SD-05 | Clic que navega en la SPA: la URL cambia antes que el DOM | Esperar `waitForURL` y un elemento propio de la vista (`back-to-products`, `cart-list`, `firstName`) en los POM | Todos los POM |

> Examples: framework hydration delays, input binding issues requiring `pressSequentially`,
> elements that are in the DOM but not yet rendered, session expiry during long runs.

## Reference Timeouts

Fill in the timeout values used in this project once they are stabilized.

| Setting | Value | Location |
|---|---|---|
| Default test timeout | 30 s | `playwright.config.ts` |
| `actionTimeout` | 10 s | `playwright.config.ts` |
| `navigationTimeout` | 60 s | `playwright.config.ts` |
| Long-running spec timeout | no usado | - |
| Login de performance_glitch_user | 15 s explícito (solo en esa espera) | `login.login.spec.ts`, `scripts/saucedemo-session.js` |
| Grilla del Spinner | 10 s explícito | `DynamicCatalogPage.gotoSpinner()` |
| Observación de un "no navega" (defectos) | 5 s acotado con `.catch()` | `cart.spec.ts` (CRT-013), `checkout-flow.spec.ts` (FLW-007/022/023/024) |
