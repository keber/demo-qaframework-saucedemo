# Reporte de ejecución - saucedemo Sprint 1 (etapa 5b, estabilización)

**Report ID**: EXEC-SD-20261121-002
**Sprint / Release**: Sprint 1
**Execution type**: Automated
**Executor**: agente de la etapa 5b (`/qa-test-stabilization`)
**Environment**: QA - `{QA_BASE_URL}` (https://www.saucedemo.com)
**Date**: 2026-11-21 16:47 UTC
**Playwright version**: 1.65.1 (chromium, 2 workers)
**ADO Test Plan**: N/A (Azure DevOps fuera de alcance)

Ejecución oficial de cierre del sprint. Comando: `cd qa/07-automation/e2e && npm run test:all` (suite por defecto + proyecto opt-in `login-flow`). Credenciales por variables de entorno (`QA_USER_PASSWORD` = `<PLACEHOLDER>`).

---

## Summary

| Metric | Value |
|--------|-------|
| TCs distintos | 126 |
| Tests ejecutados | 142 |
| Passed | 122 |
| Expected fail (`test.fail` + DEF) | 18 |
| Failed (inesperado) | 0 |
| Skipped (`PENDING-CODE`) | 2 |
| Flaky | 0 |
| Tests en estado válido (regla 8) | 142 de 142 (100 %) |
| Execution time | 4m 25s |

### Overall Result: ✅ PASS

`passed` + `expected-fail` + `skipped` (con `PENDING-CODE`) son los estados válidos de la regla 8. Cambio respecto de la etapa 5: TC-AUTH-LOG-010 pasa de `test.fail` (DEF-SD-019) a `test()` en verde, porque el hallazgo se reclasificó como REC-SD-012.

---

## Results by Submodule

| Submodule | Tests | Pass | Expected fail | Fail | Skip |
|---|---|---|---|---|---|
| Autenticación - Login y sesión (AUTH-LOG) | 31 | 31 | 0 | 0 | 0 |
| Catálogo - Listado y detalle (INV-CAT) | 29 | 20 | 8 | 0 | 1 |
| Catálogo - Dynamic Catalog (INV-DYN) | 16 | 16 | 0 | 0 | 0 |
| Carrito (CART-CRT) | 20 | 18 | 2 | 0 | 0 |
| Checkout - Flujo de compra (CHK-FLW) | 30 | 23 | 6 | 0 | 1 |
| Navegación - Menú, encabezado y footer (NAV-MENU) | 16 | 14 | 2 | 0 | 0 |

---

## Estabilidad (flakiness) - etapa 5b

Se ejecutó la suite completa (`npm run test:all`, 142 tests) seis veces, con repeticiones y con más paralelismo para provocar condiciones de carrera. "Ejecución correcta" = el test terminó con su estado esperado (`passed`, o `failed` en un `test.fail()` con DEF). Los 2 tests `PENDING-CODE` no se ejecutan y no cuentan.

| Ejecución | Comando | Workers | Código | Ejecuciones | Correctas | Fallos inesperados | Duración |
|---|---|---|---|---|---|---|---|
| R1 | `npm run test:all -- --repeat-each=3` | 2 | antes de los heals | 420 | 419 | 1 (TC-INV-DYN-012 `visual_user`, repetición 1) | 10m 32s |
| R2 | `npm run test:all -- --repeat-each=3 --workers=4` | 4 | con FLK-SD-06 | 420 | 420 | 0 | 7m 29s |
| R3 | `npm run test:all` | 2 | con FLK-SD-06 | 140 | 140 | 0 | 3m 13s |
| R4 | `npm run test:all` | 2 | con FLK-SD-06 | 140 | 139 | 1 (TC-INV-DYN-004) | 3m 37s |
| R5 | `npm run test:all -- --repeat-each=2 --workers=4` | 4 | con FLK-SD-06, 07 y 08 | 280 | 280 | 0 | 3m 45s |
| R6 | `npm run test:all` (ejecución oficial de este reporte) | 2 | con FLK-SD-06, 07 y 08 | 140 | 140 | 0 | 4m 25s |
| **Total** | | | | **1540** | **1538 (99,87 %)** | **2** | |

Tras el último heal (R5 + R6): 420 de 420 ejecuciones correctas (100 %). Verificaciones dirigidas adicionales: `menu.spec.ts` + `dynamic-catalog.spec.ts` + `session.spec.ts` con `--repeat-each=4` (164/164) y TC-INV-DYN-004 + tests de `performance_glitch_user` con `--repeat-each=5 --workers=4` (35/35 ejecutados, 5 skip `PENDING-CODE`).

### Tasa de éxito por test

- 140 de 142 tests: 100 % en todas sus ejecuciones (11 por test: 3 + 3 + 1 + 1 + 2 + 1). La columna "Estabilidad (R1-R6)" de "Detailed Results" muestra el valor de cada test.
- TC-INV-DYN-012 (`visual_user`): 10/11 (90,9 %); único fallo en R1, antes del heal FLK-SD-06; 0 fallos en las 8 ejecuciones posteriores.
- TC-INV-DYN-004: 10/11 (90,9 %); único fallo en R4, antes del heal FLK-SD-08; 0 fallos en las 3 ejecuciones posteriores y 5/5 en la verificación dirigida con 4 workers.

### Clasificación y heals aplicados

| ID | Test | Categoría (classification-protocol) | Causa raíz | Heal | Confianza |
|---|---|---|---|---|---|
| FLK-SD-06 | TC-INV-DYN-012 (`visual_user`), afecta a todo test que abre el menú | D - Fragile timing (automatización); origen en una carrera de la app registrada como REC-SD-013 | react-burger-menu agrega `hidden` al panel cerrado con un temporizador ~0,3-0,8 s tras el render; el clic en el botón coincidió con el temporizador y el panel quedó con `aria-hidden="false"` y `hidden` (traza del fallo + script de diagnóstico) | `HeaderMenu.waitForClosedMenuSettled()` antes del clic y `not.toHaveAttribute('hidden')` tras abrir; aplicado también en TC-NAV-MENU-001. Sin `waitForTimeout` | Alta (100: pasa x3+, causa entendida, sin timeout fijo, regla RN-NAV-001 confirmada) |
| FLK-SD-07 | TC-INV-CAT-027, TC-CHK-FLW-025 y TC-INV-DYN-012 (`performance_glitch_user`) | D - Fragile timing (margen de tiempo, sin fallo observado) | La persona demora cada vista ~5 s por diseño; con 4 workers llegaron a 26,6 s y 23,2 s del límite de 30 s | `testInfo.slow()` en `fixtures/base.ts` para `performance_glitch_user` (timeout x3); aserciones y esperas sin cambios | Alta (90: pasa x3+, causa entendida, sin timeout fijo) |
| FLK-SD-08 | TC-INV-DYN-004 | D - Fragile timing (lectura no atómica) | Lazy Load sigue cargando tras `scrollMore()`; nombres y precios se leían con dos locators y las listas quedaron desfasadas (24 frente a 28) | `DynamicCatalogPage.readLazyCards()`: par {name, price} por tarjeta en un solo `evaluateAll`; una tarjeta sin precio sigue fallando | Alta (100: pasa x3+, causa entendida, sin timeout fijo, regla de precios sin cambios) |

Ningún heal debilitó una aserción de la especificación (regla 10). No se usó `retries` ni `waitForTimeout`.

### Re-verificación de defectos

Los 18 tests con `expectOpenDefect` se ejecutaron con `DEFECTS_DIAG=1` (marcador desactivado) en la suite oficial: los 18 fallan en la aserción de su regla de negocio (p. ej. DEF-SD-012 `Expected pattern: /\$\d+\.\d{2}$/`, DEF-SD-016 `Expected pattern: /\/checkout-complete\.html$/`), ninguno por infraestructura (`InfraError`) ni por un selector. En R1-R6 los 18 quedaron como `expected-fail` en todas sus ejecuciones.

DEF-SD-019 (TC-AUTH-LOG-010) se reclasificó como REC-SD-012: RN-AUTH-005 solo exige rechazar el acceso y la cookie creada es inerte. El TC se revisó (`[REVISED - 2026-11-21]`) y ahora verifica la regla como `test()` normal: pasa 11/11.

---

## Detailed Results

| TC-ID | Test | Prioridad | Resultado | Duración | Estabilidad (R1-R6) | Notas |
|---|---|---|---|---|---|---|
| TC-AUTH-LOG-001 | Login exitoso con standard_user | P0 | ✅ Pasa | 0.8 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-002 | Login enviando el formulario con la tecla Enter | P2 | ✅ Pasa | 0.9 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-003 | Usuario y contraseña vacíos | P1 | ✅ Pasa | 1.7 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-004 | Contraseña vacía | P1 | ✅ Pasa | 1.7 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-005 | Usuario vacío con contraseña informada | P1 | ✅ Pasa | 1.0 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-006 | Usuario inexistente | P1 | ✅ Pasa | 1.0 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-007 | Contraseña incorrecta para un usuario válido | P1 | ✅ Pasa | 1.0 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-008 | Usuario en mayúsculas es rechazado | P2 | ✅ Pasa | 1.0 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-009 | Usuario con espacio inicial es rechazado | P3 | ✅ Pasa | 1.1 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-010 | Usuario bloqueado no puede iniciar sesión | P0 | ✅ Pasa | 1.3 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-011 | Cerrar el mensaje de error | P2 | ✅ Pasa | 1.0 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-012 | Campos marcados visualmente ante un error | P3 | ✅ Pasa | 0.9 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-013 | La contraseña se muestra enmascarada | P2 | ✅ Pasa | 1.1 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-014 | Acceso sin sesión a /inventory.html | P0 | ✅ Pasa | 0.8 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-015 | Acceso sin sesión al resto de rutas internas (/cart.html) | P1 | ✅ Pasa | 0.8 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-015 | Acceso sin sesión al resto de rutas internas (/checkout-complete.html) | P1 | ✅ Pasa | 0.9 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-015 | Acceso sin sesión al resto de rutas internas (/checkout-step-one.html) | P1 | ✅ Pasa | 0.7 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-015 | Acceso sin sesión al resto de rutas internas (/checkout-step-two.html) | P1 | ✅ Pasa | 0.8 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-015 | Acceso sin sesión al resto de rutas internas (/inventory-item.html?id=4) | P1 | ✅ Pasa | 0.8 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-016 | Login después de intentar acceder a una ruta protegida | P2 | ✅ Pasa | 0.5 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-017 | Logout cierra la sesión | P0 | ✅ Pasa | 3.7 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-018 | Atrás del navegador tras el logout no muestra contenido | P1 | ✅ Pasa | 2.8 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-019 | Login de los usuarios habilitados no estándar (error_user) | P1 | ✅ Pasa | 0.5 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-019 | Login de los usuarios habilitados no estándar (performance_glitch_user) | P1 | ✅ Pasa | 5.6 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-019 | Login de los usuarios habilitados no estándar (problem_user) | P1 | ✅ Pasa | 0.5 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-019 | Login de los usuarios habilitados no estándar (visual_user) | P1 | ✅ Pasa | 0.5 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-020 | performance_glitch_user inicia sesión pese a la demora | P2 | ✅ Pasa | 5.6 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-021 | Cookie de sesión creada con el nombre del usuario | P2 | ✅ Pasa | 0.9 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-022 | Cookie de sesión con usuario bloqueado o inexistente es rechazada | P2 | ✅ Pasa | 2.3 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-023 | Expiración de la sesión a los 10 minutos | P3 | ✅ Pasa | 1.9 s | 11/11 (100 %) |  |
| TC-AUTH-LOG-024 | La página de login lista los usuarios aceptados | P3 | ✅ Pasa | 1.1 s | 11/11 (100 %) |  |
| TC-CART-CRT-001 | Sin badge con el carrito vacío | P1 | ✅ Pasa | 1.4 s | 11/11 (100 %) |  |
| TC-CART-CRT-002 | El badge suma y resta al agregar y quitar | P0 | ✅ Pasa | 2.0 s | 11/11 (100 %) |  |
| TC-CART-CRT-003 | El carrito lista los productos agregados | P0 | ✅ Pasa | 1.9 s | 11/11 (100 %) |  |
| TC-CART-CRT-004 | Encabezados de la página del carrito | P3 | ✅ Pasa | 1.9 s | 11/11 (100 %) |  |
| TC-CART-CRT-005 | Quitar un producto desde el carrito | P0 | ✅ Pasa | 2.3 s | 11/11 (100 %) |  |
| TC-CART-CRT-006 | Quitar el último producto deja el carrito vacío | P1 | ✅ Pasa | 2.2 s | 11/11 (100 %) |  |
| TC-CART-CRT-007 | El producto quitado en el carrito vuelve a "Add to cart" en el listado | P1 | ✅ Pasa | 2.4 s | 11/11 (100 %) |  |
| TC-CART-CRT-008 | Continue Shopping vuelve al catálogo sin cambiar el carrito | P1 | ✅ Pasa | 1.5 s | 11/11 (100 %) |  |
| TC-CART-CRT-009 | Checkout abre el paso 1 | P0 | ✅ Pasa | 1.3 s | 11/11 (100 %) |  |
| TC-CART-CRT-010 | El carrito se conserva al recargar | P1 | ✅ Pasa | 1.8 s | 11/11 (100 %) |  |
| TC-CART-CRT-011 | El carrito se conserva tras logout y login del mismo usuario | P2 | ✅ Pasa | 3.5 s | 11/11 (100 %) |  |
| TC-CART-CRT-012 | Otro usuario no ve el carrito del anterior | P1 | 🐞 test.fail (DEF) | 4.6 s | 11/11 (100 %) | DEF-SD-009 |
| TC-CART-CRT-013 | No se puede iniciar checkout con el carrito vacío | P1 | 🐞 test.fail (DEF) | 1.5 s | 11/11 (100 %) | DEF-SD-010 |
| TC-CART-CRT-014 | El nombre del producto en el carrito abre su detalle | P2 | ✅ Pasa | 1.7 s | 11/11 (100 %) |  |
| TC-CART-CRT-015 | El carrito queda vacío al completar la compra | P1 | ✅ Pasa | 2.4 s | 11/11 (100 %) |  |
| TC-CART-CRT-016 | Carrito sin sesión redirige al login | P1 | ✅ Pasa | 1.4 s | 11/11 (100 %) |  |
| TC-CART-CRT-017 | problem_user y error_user pueden quitar productos desde el carrito (error_user) | P2 | ✅ Pasa | 1.7 s | 11/11 (100 %) |  |
| TC-CART-CRT-017 | problem_user y error_user pueden quitar productos desde el carrito (problem_user) | P2 | ✅ Pasa | 1.7 s | 11/11 (100 %) |  |
| TC-CART-CRT-018 | visual_user ve en el carrito el precio real | P2 | ✅ Pasa | 1.5 s | 11/11 (100 %) |  |
| TC-CART-CRT-019 | La cantidad por producto es siempre 1 y no es editable | P3 | ✅ Pasa | 1.6 s | 11/11 (100 %) |  |
| TC-CHK-FLW-001 | Compra completa con standard_user | P0 | ✅ Pasa | 2.4 s | 11/11 (100 %) |  |
| TC-CHK-FLW-002 | Elementos del paso 1 | P2 | ✅ Pasa | 2.5 s | 11/11 (100 %) |  |
| TC-CHK-FLW-003 | Los tres campos vacíos | P1 | ✅ Pasa | 2.3 s | 11/11 (100 %) |  |
| TC-CHK-FLW-004 | Falta el apellido | P1 | ✅ Pasa | 3.7 s | 11/11 (100 %) |  |
| TC-CHK-FLW-005 | Falta el código postal | P1 | ✅ Pasa | 3.2 s | 11/11 (100 %) |  |
| TC-CHK-FLW-006 | Falta el nombre con el resto informado | P1 | ✅ Pasa | 2.3 s | 11/11 (100 %) |  |
| TC-CHK-FLW-007 | Campos con solo espacios son rechazados | P2 | 🐞 test.fail (DEF) | 2.4 s | 11/11 (100 %) | DEF-SD-011 |
| TC-CHK-FLW-008 | Cerrar el error del paso 1 | P3 | ✅ Pasa | 2.9 s | 11/11 (100 %) |  |
| TC-CHK-FLW-009 | Cancelar en el paso 1 vuelve al carrito | P2 | ✅ Pasa | 2.4 s | 11/11 (100 %) |  |
| TC-CHK-FLW-010 | El resumen muestra productos, pago y envío | P1 | ✅ Pasa | 3.5 s | 11/11 (100 %) |  |
| TC-CHK-FLW-011 | Subtotal igual a la suma de precios | P0 | ✅ Pasa | 3.1 s | 11/11 (100 %) |  |
| TC-CHK-FLW-012 | Impuesto del 8 % redondeado a centavos | P0 | ✅ Pasa | 2.9 s | 11/11 (100 %) |  |
| TC-CHK-FLW-013 | Total igual a subtotal más impuesto | P0 | ✅ Pasa | 2.7 s | 11/11 (100 %) |  |
| TC-CHK-FLW-014 | Totales con 1 y con 6 productos | P1 | ✅ Pasa | 11.6 s | 11/11 (100 %) |  |
| TC-CHK-FLW-015 | Totales siempre con 2 decimales | P3 | 🐞 test.fail (DEF) | 3.4 s | 11/11 (100 %) | DEF-SD-012 |
| TC-CHK-FLW-016 | Cancelar en el paso 2 vuelve al catálogo con el carrito intacto | P2 | ✅ Pasa | 6.0 s | 11/11 (100 %) |  |
| TC-CHK-FLW-017 | Finalizar muestra la confirmación y vacía el carrito | P0 | ✅ Pasa | 3.1 s | 11/11 (100 %) |  |
| TC-CHK-FLW-018 | Back Home vuelve al catálogo | P2 | ✅ Pasa | 3.1 s | 11/11 (100 %) |  |
| TC-CHK-FLW-019 | Generar el PDF de la orden - revisión manual | P2 | ⏭️ Omitido | 0.0 s | - | PENDING-CODE: parte manual del TC "Ambos" (revisión visual del PDF: legible, 1 página, sin... |
| TC-CHK-FLW-019 | Generar el PDF de la orden | P2 | ✅ Pasa | 9.1 s | 11/11 (100 %) |  |
| TC-CHK-FLW-020 | El resumen no es accesible sin completar el paso 1 | P2 | 🐞 test.fail (DEF) | 2.4 s | 11/11 (100 %) | DEF-SD-013 |
| TC-CHK-FLW-021 | Checkout sin sesión redirige al login (/checkout-complete.html) | P1 | ✅ Pasa | 2.6 s | 11/11 (100 %) |  |
| TC-CHK-FLW-021 | Checkout sin sesión redirige al login (/checkout-step-one.html) | P1 | ✅ Pasa | 1.5 s | 11/11 (100 %) |  |
| TC-CHK-FLW-021 | Checkout sin sesión redirige al login (/checkout-step-two.html) | P1 | ✅ Pasa | 2.0 s | 11/11 (100 %) |  |
| TC-CHK-FLW-022 | problem_user puede completar el paso 1 | P1 | 🐞 test.fail (DEF) | 4.9 s | 11/11 (100 %) | DEF-SD-014 |
| TC-CHK-FLW-023 | error_user no avanza sin apellido | P1 | 🐞 test.fail (DEF) | 4.5 s | 11/11 (100 %) | DEF-SD-015 |
| TC-CHK-FLW-024 | error_user puede finalizar la compra | P1 | 🐞 test.fail (DEF) | 9.9 s | 11/11 (100 %) | DEF-SD-016 |
| TC-CHK-FLW-025 | visual_user y performance_glitch_user calculan los totales con precios reales (performance_glitch_user) | P2 | ✅ Pasa | 13.4 s | 11/11 (100 %) |  |
| TC-CHK-FLW-025 | visual_user y performance_glitch_user calculan los totales con precios reales (visual_user) | P2 | ✅ Pasa | 4.5 s | 11/11 (100 %) |  |
| TC-CHK-FLW-026 | El PDF contiene los datos de la orden | P3 | ✅ Pasa | 10.1 s | 11/11 (100 %) |  |
| TC-INV-CAT-001 | El listado muestra 6 productos completos | P0 | ✅ Pasa | 10.0 s | 11/11 (100 %) |  |
| TC-INV-CAT-002 | Nombres y precios coinciden con el catálogo de referencia | P1 | ✅ Pasa | 3.0 s | 11/11 (100 %) |  |
| TC-INV-CAT-003 | Orden por defecto A-Z | P1 | ✅ Pasa | 2.8 s | 11/11 (100 %) |  |
| TC-INV-CAT-004 | Ordenar por nombre Z-A | P1 | ✅ Pasa | 3.0 s | 11/11 (100 %) |  |
| TC-INV-CAT-005 | Ordenar por precio de menor a mayor | P1 | ✅ Pasa | 4.5 s | 11/11 (100 %) |  |
| TC-INV-CAT-006 | Ordenar por precio de mayor a menor | P1 | ✅ Pasa | 5.6 s | 11/11 (100 %) |  |
| TC-INV-CAT-007 | El orden vuelve a A-Z al recargar | P3 | ✅ Pasa | 4.1 s | 11/11 (100 %) |  |
| TC-INV-CAT-008 | Agregar un producto desde el listado | P0 | ✅ Pasa | 2.8 s | 11/11 (100 %) |  |
| TC-INV-CAT-009 | Agregar los 6 productos | P1 | ✅ Pasa | 3.3 s | 11/11 (100 %) |  |
| TC-INV-CAT-010 | Quitar un producto desde el listado | P0 | ✅ Pasa | 2.8 s | 11/11 (100 %) |  |
| TC-INV-CAT-011 | El nombre abre el detalle del mismo producto | P1 | ✅ Pasa | 1.7 s | 11/11 (100 %) |  |
| TC-INV-CAT-012 | La imagen abre el detalle del mismo producto | P2 | ✅ Pasa | 3.4 s | 11/11 (100 %) |  |
| TC-INV-CAT-013 | El detalle muestra los mismos datos que el listado para los 6 productos | P1 | ✅ Pasa | 7.2 s | 11/11 (100 %) |  |
| TC-INV-CAT-014 | Agregar y quitar desde el detalle | P1 | ✅ Pasa | 4.6 s | 11/11 (100 %) |  |
| TC-INV-CAT-015 | El detalle refleja un producto que ya está en el carrito | P2 | ✅ Pasa | 4.4 s | 11/11 (100 %) |  |
| TC-INV-CAT-016 | Volver al listado desde el detalle | P2 | ✅ Pasa | 4.0 s | 11/11 (100 %) |  |
| TC-INV-CAT-017 | Detalle de un producto inexistente | P3 | ✅ Pasa | 3.2 s | 11/11 (100 %) |  |
| TC-INV-CAT-018 | Catálogo sin sesión redirige al login | P1 | ✅ Pasa | 2.1 s | 11/11 (100 %) |  |
| TC-INV-CAT-019 | problem_user ve la imagen propia de cada producto | P2 | 🐞 test.fail (DEF) | 2.6 s | 11/11 (100 %) | DEF-SD-001 |
| TC-INV-CAT-020 | problem_user puede ordenar el listado | P2 | 🐞 test.fail (DEF) | 3.0 s | 11/11 (100 %) | DEF-SD-002 |
| TC-INV-CAT-021 | problem_user puede agregar y quitar los 6 productos | P1 | 🐞 test.fail (DEF) | 3.9 s | 11/11 (100 %) | DEF-SD-003 |
| TC-INV-CAT-022 | problem_user abre el detalle del producto elegido | P1 | 🐞 test.fail (DEF) | 2.8 s | 11/11 (100 %) | DEF-SD-004 |
| TC-INV-CAT-023 | error_user puede ordenar sin errores | P2 | 🐞 test.fail (DEF) | 2.4 s | 11/11 (100 %) | DEF-SD-005 |
| TC-INV-CAT-024 | error_user puede agregar y quitar los 6 productos | P1 | 🐞 test.fail (DEF) | 3.1 s | 11/11 (100 %) | DEF-SD-006 |
| TC-INV-CAT-025 | visual_user ve precios reales y con 2 decimales | P1 | 🐞 test.fail (DEF) | 13.4 s | 11/11 (100 %) | DEF-SD-007 |
| TC-INV-CAT-026 | visual_user ve imágenes y controles en su posición - revisión manual | P3 | ⏭️ Omitido | 0.0 s | - | PENDING-CODE: parte manual del TC "Ambos" (comparación visual de capturas), no automatizab... |
| TC-INV-CAT-026 | visual_user ve imágenes y controles en su posición | P3 | 🐞 test.fail (DEF) | 17.5 s | 11/11 (100 %) | DEF-SD-008 |
| TC-INV-CAT-027 | performance_glitch_user ve el mismo catálogo que standard_user | P3 | ✅ Pasa | 22.9 s | 11/11 (100 %) |  |
| TC-INV-CAT-028 | El selector de orden ofrece las 4 opciones estáticas | P3 | ✅ Pasa | 2.0 s | 11/11 (100 %) |  |
| TC-INV-DYN-001 | Desplegar el submenú Dynamic Catalog | P2 | ✅ Pasa | 3.5 s | 11/11 (100 %) |  |
| TC-INV-DYN-002 | Abrir Lazy Load | P2 | ✅ Pasa | 4.2 s | 11/11 (100 %) |  |
| TC-INV-DYN-003 | El scroll carga más productos | P2 | ✅ Pasa | 2.3 s | 11/11 (100 %) |  |
| TC-INV-DYN-004 | Precios de Lazy Load iguales al catálogo | P3 | ✅ Pasa | 2.7 s | 10/11 (90.9 %) |  |
| TC-INV-DYN-005 | Spinner visible durante la carga | P2 | ✅ Pasa | 5.1 s | 11/11 (100 %) |  |
| TC-INV-DYN-006 | El spinner reaparece al recargar | P3 | ✅ Pasa | 5.9 s | 11/11 (100 %) |  |
| TC-INV-DYN-007 | El punto del slider muestra su producto | P2 | ✅ Pasa | 3.4 s | 11/11 (100 %) |  |
| TC-INV-DYN-008 | El slider avanza automáticamente | P3 | ✅ Pasa | 5.4 s | 11/11 (100 %) |  |
| TC-INV-DYN-009 | Slider sin sesión redirige al login | P1 | ✅ Pasa | 3.0 s | 11/11 (100 %) |  |
| TC-INV-DYN-010 | Lazy Load y Spinner sin sesión redirigen al login | P2 | ✅ Pasa | 2.0 s | 11/11 (100 %) |  |
| TC-INV-DYN-011 | Las vistas del Dynamic Catalog son de solo lectura | P3 | ✅ Pasa | 5.1 s | 11/11 (100 %) |  |
| TC-INV-DYN-012 | Dynamic Catalog con usuarios no estándar (error_user) | P3 | ✅ Pasa | 8.0 s | 11/11 (100 %) |  |
| TC-INV-DYN-012 | Dynamic Catalog con usuarios no estándar (performance_glitch_user) | P3 | ✅ Pasa | 14.0 s | 11/11 (100 %) |  |
| TC-INV-DYN-012 | Dynamic Catalog con usuarios no estándar (problem_user) | P3 | ✅ Pasa | 10.3 s | 11/11 (100 %) |  |
| TC-INV-DYN-012 | Dynamic Catalog con usuarios no estándar (visual_user) | P3 | ✅ Pasa | 9.4 s | 10/11 (90.9 %) |  |
| TC-INV-DYN-013 | Cerrar el submenú con un segundo clic | P3 | ✅ Pasa | 4.2 s | 11/11 (100 %) |  |
| TC-NAV-MENU-001 | Abrir y cerrar el menú lateral | P1 | ✅ Pasa | 3.9 s | 11/11 (100 %) |  |
| TC-NAV-MENU-002 | Cerrar el menú con Escape | P3 | ✅ Pasa | 1.9 s | 11/11 (100 %) |  |
| TC-NAV-MENU-003 | Opciones del menú y su orden | P2 | ✅ Pasa | 3.4 s | 11/11 (100 %) |  |
| TC-NAV-MENU-004 | Menú, carrito y footer en todas las vistas internas | P2 | ✅ Pasa | 3.9 s | 11/11 (100 %) |  |
| TC-NAV-MENU-005 | All Items desde el carrito | P1 | ✅ Pasa | 2.8 s | 11/11 (100 %) |  |
| TC-NAV-MENU-006 | About lleva al sitio de Sauce Labs | P2 | ✅ Pasa | 4.4 s | 11/11 (100 %) |  |
| TC-NAV-MENU-007 | Logout desde el menú | P0 | ✅ Pasa | 3.4 s | 11/11 (100 %) |  |
| TC-NAV-MENU-008 | Reset App State vacía el carrito | P1 | ✅ Pasa | 3.2 s | 11/11 (100 %) |  |
| TC-NAV-MENU-009 | Reset App State actualiza los botones del listado | P2 | 🐞 test.fail (DEF) | 3.3 s | 11/11 (100 %) | DEF-SD-017 |
| TC-NAV-MENU-010 | El menú queda abierto tras Reset App State | P3 | ✅ Pasa | 3.1 s | 11/11 (100 %) |  |
| TC-NAV-MENU-011 | Enlaces sociales del footer | P3 | ✅ Pasa | 1.3 s | 11/11 (100 %) |  |
| TC-NAV-MENU-012 | Texto de copyright del footer | P3 | ✅ Pasa | 1.4 s | 11/11 (100 %) |  |
| TC-NAV-MENU-013 | Logo del encabezado | P3 | ✅ Pasa | 1.5 s | 11/11 (100 %) |  |
| TC-NAV-MENU-014 | problem_user: About apunta al sitio correcto | P2 | 🐞 test.fail (DEF) | 6.3 s | 11/11 (100 %) | DEF-SD-018 |
| TC-NAV-MENU-015 | error_user: Reset App State sin errores | P3 | ✅ Pasa | 5.3 s | 11/11 (100 %) |  |
| TC-NAV-MENU-016 | La página de login no muestra menú ni carrito | P3 | ✅ Pasa | 1.2 s | 11/11 (100 %) |  |

---

## Failures Detail

Sin fallos inesperados ni tests flaky.

---

## Open Defects

| DEF-ID | Linked TC | Status |
|---|---|---|
| DEF-SD-001 | TC-INV-CAT-019 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-002 | TC-INV-CAT-020 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-003 | TC-INV-CAT-021 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-004 | TC-INV-CAT-022 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-005 | TC-INV-CAT-023 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-006 | TC-INV-CAT-024 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-007 | TC-INV-CAT-025 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-008 | TC-INV-CAT-026 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-009 | TC-CART-CRT-012 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-010 | TC-CART-CRT-013 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-011 | TC-CHK-FLW-007 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-012 | TC-CHK-FLW-015 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-013 | TC-CHK-FLW-020 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-014 | TC-CHK-FLW-022 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-015 | TC-CHK-FLW-023 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-016 | TC-CHK-FLW-024 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-017 | TC-NAV-MENU-009 | Open (reproduce: `expectOpenDefect`) |
| DEF-SD-018 | TC-NAV-MENU-014 | Open (reproduce: `expectOpenDefect`) |

Archivos en `qa/06-defects/open/`. DEF-SD-019 queda retirado: reclasificado como REC-SD-012 (RN-AUTH-005 no se incumple). Recomendaciones (sin `test.fail`): REC-SD-001 a REC-SD-012 en `qa/06-defects/recommendations/`.

---

## Skipped Tests

| TC-ID | Reason |
|---|---|
| TC-CHK-FLW-019 | PENDING-CODE: parte manual del TC "Ambos" (revisión visual del PDF: legible, 1 página, sin texto superpuesto ni cortado). Procedimiento: qa/03-test-cases/TC-CHK-FLW-019-pdf-de-la-orden.md |
| TC-INV-CAT-026 | PENDING-CODE: parte manual del TC "Ambos" (comparación visual de capturas), no automatizable por diseño. Procedimiento: qa/03-test-cases/TC-INV-CAT-026-visual-user-imagenes-y-controles.md |

---

## Environment Used

```
QA_BASE_URL={QA_BASE_URL}
Browser: Chromium (Playwright 1.65.1), Desktop Chrome
Viewport: 1280x720
Workers: 2 (fullyParallel; sesiones por persona de solo lectura)
Auth state: .auth/user-default.json y .auth/<persona>.json (no versionados; renovados por fixtures/base.ts)
```

> Credentials and tokens are NEVER logged in execution reports.

---

## Recommendations

1. Los 18 defectos abiertos dependen del comportamiento intencional de los usuarios de demostración de Sauce Labs (`problem_user`, `error_user`, `visual_user`) y de reglas de carrito/checkout; no bloquean ningún TC P0 de `standard_user`.
2. Mantener `workers: 2` por defecto: la suite también es estable con 4 workers (ver sección de estabilidad), pero el margen de tiempo de los tests de `performance_glitch_user` se reduce con más paralelismo.
3. Revisar con el responsable de la especificación REC-SD-012 (cookie inerte tras login rechazado) por si se desea elevar a regla de negocio.

---

## Artifacts

| Artifact | Location |
|----------|----------|
| Resumen versionado | `results-summary.json` (esta carpeta) |
| Playwright HTML report | `qa/07-automation/e2e/playwright-report/index.html` (no versionado) |
| Test results JSON | `qa/07-automation/e2e/results/results.json` (no versionado) |
| Spec files | `qa/07-automation/e2e/tests/{auth,inventory,cart,checkout,navigation}/` |
| Reporte de estabilización | `qa/07-automation/STABILIZATION-REPORT-2026-11-21.md` |

---

## Sign-off

| Role | Name | Date |
|------|------|------|
| QA Analyst | | |
| Tech Lead | | |
