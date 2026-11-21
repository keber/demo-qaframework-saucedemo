# Reporte de ejecución - saucedemo Sprint 1 (etapa 5)

**Report ID**: EXEC-SD-20261121-001
**Sprint / Release**: Sprint 1
**Execution type**: Automated
**Executor**: agente de la etapa 5 (`/qa-automation`)
**Environment**: QA - `{QA_BASE_URL}` (https://www.saucedemo.com)
**Date**: 2026-11-21 15:58 UTC
**Playwright version**: 1.65.1 (chromium, 2 workers)
**ADO Test Plan**: N/A (Azure DevOps fuera de alcance)

Comando: `cd qa/07-automation/e2e && npm run test:all` (suite por defecto + proyecto opt-in `login-flow`). Credenciales por variables de entorno (`QA_USER_PASSWORD` = `<PLACEHOLDER>`).

---

## Summary

| Metric | Value |
|--------|-------|
| TCs distintos | 126 |
| Tests ejecutados | 142 |
| Passed | 121 |
| Expected fail (`test.fail` + DEF) | 19 |
| Failed (inesperado) | 0 |
| Skipped | 2 |
| Flaky | 0 |
| Execution time | 2m 26s |

### Overall Result: ✅ PASS

`passed` + `expected-fail` + `skipped` (con `PENDING-CODE`) son estados válidos según la regla 8; `failed` queda para la etapa 5b.

---

## Results by Submodule

| Submodule | Tests | Pass | Expected fail | Fail | Skip |
|---|---|---|---|---|---|
| Autenticación - Login y sesión (AUTH-LOG) | 31 | 30 | 1 | 0 | 0 |
| Catálogo - Listado y detalle (INV-CAT) | 29 | 20 | 8 | 0 | 1 |
| Catálogo - Dynamic Catalog (INV-DYN) | 16 | 16 | 0 | 0 | 0 |
| Carrito (CART-CRT) | 20 | 18 | 2 | 0 | 0 |
| Checkout - Flujo de compra (CHK-FLW) | 30 | 23 | 6 | 0 | 1 |
| Navegación - Menú, encabezado y footer (NAV-MENU) | 16 | 14 | 2 | 0 | 0 |

---

## Detailed Results

| TC-ID | Test | Prioridad | Resultado | Duración | Notas |
|---|---|---|---|---|---|
| TC-AUTH-LOG-001 | Login exitoso con standard_user | P0 | ✅ Pasa | 0.8 s |  |
| TC-AUTH-LOG-002 | Login enviando el formulario con la tecla Enter | P2 | ✅ Pasa | 0.8 s |  |
| TC-AUTH-LOG-003 | Usuario y contraseña vacíos | P1 | ✅ Pasa | 1.3 s |  |
| TC-AUTH-LOG-004 | Contraseña vacía | P1 | ✅ Pasa | 1.3 s |  |
| TC-AUTH-LOG-005 | Usuario vacío con contraseña informada | P1 | ✅ Pasa | 0.7 s |  |
| TC-AUTH-LOG-006 | Usuario inexistente | P1 | ✅ Pasa | 0.4 s |  |
| TC-AUTH-LOG-007 | Contraseña incorrecta para un usuario válido | P1 | ✅ Pasa | 0.8 s |  |
| TC-AUTH-LOG-008 | Usuario en mayúsculas es rechazado | P2 | ✅ Pasa | 0.4 s |  |
| TC-AUTH-LOG-009 | Usuario con espacio inicial es rechazado | P3 | ✅ Pasa | 0.5 s |  |
| TC-AUTH-LOG-010 | Usuario bloqueado no puede iniciar sesión | P0 | 🐞 test.fail (DEF) | 0.6 s | DEF-SD-019 |
| TC-AUTH-LOG-011 | Cerrar el mensaje de error | P2 | ✅ Pasa | 0.9 s |  |
| TC-AUTH-LOG-012 | Campos marcados visualmente ante un error | P3 | ✅ Pasa | 0.8 s |  |
| TC-AUTH-LOG-013 | La contraseña se muestra enmascarada | P2 | ✅ Pasa | 0.7 s |  |
| TC-AUTH-LOG-014 | Acceso sin sesión a /inventory.html | P0 | ✅ Pasa | 0.8 s |  |
| TC-AUTH-LOG-015 | Acceso sin sesión al resto de rutas internas (/cart.html) | P1 | ✅ Pasa | 0.8 s |  |
| TC-AUTH-LOG-015 | Acceso sin sesión al resto de rutas internas (/checkout-complete.html) | P1 | ✅ Pasa | 0.7 s |  |
| TC-AUTH-LOG-015 | Acceso sin sesión al resto de rutas internas (/checkout-step-one.html) | P1 | ✅ Pasa | 0.7 s |  |
| TC-AUTH-LOG-015 | Acceso sin sesión al resto de rutas internas (/checkout-step-two.html) | P1 | ✅ Pasa | 0.7 s |  |
| TC-AUTH-LOG-015 | Acceso sin sesión al resto de rutas internas (/inventory-item.html?id=4) | P1 | ✅ Pasa | 0.8 s |  |
| TC-AUTH-LOG-016 | Login después de intentar acceder a una ruta protegida | P2 | ✅ Pasa | 0.7 s |  |
| TC-AUTH-LOG-017 | Logout cierra la sesión | P0 | ✅ Pasa | 2.2 s |  |
| TC-AUTH-LOG-018 | Atrás del navegador tras el logout no muestra contenido | P1 | ✅ Pasa | 2.0 s |  |
| TC-AUTH-LOG-019 | Login de los usuarios habilitados no estándar (error_user) | P1 | ✅ Pasa | 0.6 s |  |
| TC-AUTH-LOG-019 | Login de los usuarios habilitados no estándar (performance_glitch_user) | P1 | ✅ Pasa | 5.6 s |  |
| TC-AUTH-LOG-019 | Login de los usuarios habilitados no estándar (problem_user) | P1 | ✅ Pasa | 0.6 s |  |
| TC-AUTH-LOG-019 | Login de los usuarios habilitados no estándar (visual_user) | P1 | ✅ Pasa | 0.5 s |  |
| TC-AUTH-LOG-020 | performance_glitch_user inicia sesión pese a la demora | P2 | ✅ Pasa | 5.6 s |  |
| TC-AUTH-LOG-021 | Cookie de sesión creada con el nombre del usuario | P2 | ✅ Pasa | 0.4 s |  |
| TC-AUTH-LOG-022 | Cookie de sesión con usuario bloqueado o inexistente es rechazada | P2 | ✅ Pasa | 1.7 s |  |
| TC-AUTH-LOG-023 | Expiración de la sesión a los 10 minutos | P3 | ✅ Pasa | 0.7 s |  |
| TC-AUTH-LOG-024 | La página de login lista los usuarios aceptados | P3 | ✅ Pasa | 0.7 s |  |
| TC-CART-CRT-001 | Sin badge con el carrito vacío | P1 | ✅ Pasa | 1.0 s |  |
| TC-CART-CRT-002 | El badge suma y resta al agregar y quitar | P0 | ✅ Pasa | 1.2 s |  |
| TC-CART-CRT-003 | El carrito lista los productos agregados | P0 | ✅ Pasa | 1.1 s |  |
| TC-CART-CRT-004 | Encabezados de la página del carrito | P3 | ✅ Pasa | 1.0 s |  |
| TC-CART-CRT-005 | Quitar un producto desde el carrito | P0 | ✅ Pasa | 1.2 s |  |
| TC-CART-CRT-006 | Quitar el último producto deja el carrito vacío | P1 | ✅ Pasa | 1.3 s |  |
| TC-CART-CRT-007 | El producto quitado en el carrito vuelve a "Add to cart" en el listado | P1 | ✅ Pasa | 1.6 s |  |
| TC-CART-CRT-008 | Continue Shopping vuelve al catálogo sin cambiar el carrito | P1 | ✅ Pasa | 1.8 s |  |
| TC-CART-CRT-009 | Checkout abre el paso 1 | P0 | ✅ Pasa | 1.2 s |  |
| TC-CART-CRT-010 | El carrito se conserva al recargar | P1 | ✅ Pasa | 1.1 s |  |
| TC-CART-CRT-011 | El carrito se conserva tras logout y login del mismo usuario | P2 | ✅ Pasa | 1.7 s |  |
| TC-CART-CRT-012 | Otro usuario no ve el carrito del anterior | P1 | 🐞 test.fail (DEF) | 1.7 s | DEF-SD-009 |
| TC-CART-CRT-013 | No se puede iniciar checkout con el carrito vacío | P1 | 🐞 test.fail (DEF) | 1.0 s | DEF-SD-010 |
| TC-CART-CRT-014 | El nombre del producto en el carrito abre su detalle | P2 | ✅ Pasa | 1.8 s |  |
| TC-CART-CRT-015 | El carrito queda vacío al completar la compra | P1 | ✅ Pasa | 1.4 s |  |
| TC-CART-CRT-016 | Carrito sin sesión redirige al login | P1 | ✅ Pasa | 0.6 s |  |
| TC-CART-CRT-017 | problem_user y error_user pueden quitar productos desde el carrito (error_user) | P2 | ✅ Pasa | 1.3 s |  |
| TC-CART-CRT-017 | problem_user y error_user pueden quitar productos desde el carrito (problem_user) | P2 | ✅ Pasa | 1.3 s |  |
| TC-CART-CRT-018 | visual_user ve en el carrito el precio real | P2 | ✅ Pasa | 0.9 s |  |
| TC-CART-CRT-019 | La cantidad por producto es siempre 1 y no es editable | P3 | ✅ Pasa | 2.2 s |  |
| TC-CHK-FLW-001 | Compra completa con standard_user | P0 | ✅ Pasa | 1.4 s |  |
| TC-CHK-FLW-002 | Elementos del paso 1 | P2 | ✅ Pasa | 1.3 s |  |
| TC-CHK-FLW-003 | Los tres campos vacíos | P1 | ✅ Pasa | 1.6 s |  |
| TC-CHK-FLW-004 | Falta el apellido | P1 | ✅ Pasa | 1.7 s |  |
| TC-CHK-FLW-005 | Falta el código postal | P1 | ✅ Pasa | 1.7 s |  |
| TC-CHK-FLW-006 | Falta el nombre con el resto informado | P1 | ✅ Pasa | 1.3 s |  |
| TC-CHK-FLW-007 | Campos con solo espacios son rechazados | P2 | 🐞 test.fail (DEF) | 1.3 s | DEF-SD-011 |
| TC-CHK-FLW-008 | Cerrar el error del paso 1 | P3 | ✅ Pasa | 1.3 s |  |
| TC-CHK-FLW-009 | Cancelar en el paso 1 vuelve al carrito | P2 | ✅ Pasa | 1.8 s |  |
| TC-CHK-FLW-010 | El resumen muestra productos, pago y envío | P1 | ✅ Pasa | 2.5 s |  |
| TC-CHK-FLW-011 | Subtotal igual a la suma de precios | P0 | ✅ Pasa | 2.1 s |  |
| TC-CHK-FLW-012 | Impuesto del 8 % redondeado a centavos | P0 | ✅ Pasa | 2.3 s |  |
| TC-CHK-FLW-013 | Total igual a subtotal más impuesto | P0 | ✅ Pasa | 2.2 s |  |
| TC-CHK-FLW-014 | Totales con 1 y con 6 productos | P1 | ✅ Pasa | 4.5 s |  |
| TC-CHK-FLW-015 | Totales siempre con 2 decimales | P3 | 🐞 test.fail (DEF) | 2.0 s | DEF-SD-012 |
| TC-CHK-FLW-016 | Cancelar en el paso 2 vuelve al catálogo con el carrito intacto | P2 | ✅ Pasa | 1.9 s |  |
| TC-CHK-FLW-017 | Finalizar muestra la confirmación y vacía el carrito | P0 | ✅ Pasa | 1.5 s |  |
| TC-CHK-FLW-018 | Back Home vuelve al catálogo | P2 | ✅ Pasa | 1.5 s |  |
| TC-CHK-FLW-019 | Generar el PDF de la orden - revisión manual | P2 | ⏭️ Omitido | 0.0 s | PENDING-CODE: parte manual del TC "Ambos" (revisión visual del PDF: legible, 1 página, sin... |
| TC-CHK-FLW-019 | Generar el PDF de la orden | P2 | ✅ Pasa | 2.3 s |  |
| TC-CHK-FLW-020 | El resumen no es accesible sin completar el paso 1 | P2 | 🐞 test.fail (DEF) | 1.1 s | DEF-SD-013 |
| TC-CHK-FLW-021 | Checkout sin sesión redirige al login (/checkout-complete.html) | P1 | ✅ Pasa | 0.6 s |  |
| TC-CHK-FLW-021 | Checkout sin sesión redirige al login (/checkout-step-one.html) | P1 | ✅ Pasa | 0.8 s |  |
| TC-CHK-FLW-021 | Checkout sin sesión redirige al login (/checkout-step-two.html) | P1 | ✅ Pasa | 0.6 s |  |
| TC-CHK-FLW-022 | problem_user puede completar el paso 1 | P1 | 🐞 test.fail (DEF) | 1.5 s | DEF-SD-014 |
| TC-CHK-FLW-023 | error_user no avanza sin apellido | P1 | 🐞 test.fail (DEF) | 1.5 s | DEF-SD-015 |
| TC-CHK-FLW-024 | error_user puede finalizar la compra | P1 | 🐞 test.fail (DEF) | 7.6 s | DEF-SD-016 |
| TC-CHK-FLW-025 | visual_user y performance_glitch_user calculan los totales con precios reales (performance_glitch_user) | P2 | ✅ Pasa | 12.3 s |  |
| TC-CHK-FLW-025 | visual_user y performance_glitch_user calculan los totales con precios reales (visual_user) | P2 | ✅ Pasa | 2.3 s |  |
| TC-CHK-FLW-026 | El PDF contiene los datos de la orden | P3 | ✅ Pasa | 2.7 s |  |
| TC-INV-CAT-001 | El listado muestra 6 productos completos | P0 | ✅ Pasa | 2.1 s |  |
| TC-INV-CAT-002 | Nombres y precios coinciden con el catálogo de referencia | P1 | ✅ Pasa | 1.1 s |  |
| TC-INV-CAT-003 | Orden por defecto A-Z | P1 | ✅ Pasa | 1.0 s |  |
| TC-INV-CAT-004 | Ordenar por nombre Z-A | P1 | ✅ Pasa | 1.4 s |  |
| TC-INV-CAT-005 | Ordenar por precio de menor a mayor | P1 | ✅ Pasa | 1.4 s |  |
| TC-INV-CAT-006 | Ordenar por precio de mayor a menor | P1 | ✅ Pasa | 1.1 s |  |
| TC-INV-CAT-007 | El orden vuelve a A-Z al recargar | P3 | ✅ Pasa | 1.2 s |  |
| TC-INV-CAT-008 | Agregar un producto desde el listado | P0 | ✅ Pasa | 1.5 s |  |
| TC-INV-CAT-009 | Agregar los 6 productos | P1 | ✅ Pasa | 1.7 s |  |
| TC-INV-CAT-010 | Quitar un producto desde el listado | P0 | ✅ Pasa | 1.3 s |  |
| TC-INV-CAT-011 | El nombre abre el detalle del mismo producto | P1 | ✅ Pasa | 1.1 s |  |
| TC-INV-CAT-012 | La imagen abre el detalle del mismo producto | P2 | ✅ Pasa | 1.2 s |  |
| TC-INV-CAT-013 | El detalle muestra los mismos datos que el listado para los 6 productos | P1 | ✅ Pasa | 2.5 s |  |
| TC-INV-CAT-014 | Agregar y quitar desde el detalle | P1 | ✅ Pasa | 1.4 s |  |
| TC-INV-CAT-015 | El detalle refleja un producto que ya está en el carrito | P2 | ✅ Pasa | 1.2 s |  |
| TC-INV-CAT-016 | Volver al listado desde el detalle | P2 | ✅ Pasa | 1.3 s |  |
| TC-INV-CAT-017 | Detalle de un producto inexistente | P3 | ✅ Pasa | 1.1 s |  |
| TC-INV-CAT-018 | Catálogo sin sesión redirige al login | P1 | ✅ Pasa | 1.1 s |  |
| TC-INV-CAT-019 | problem_user ve la imagen propia de cada producto | P2 | 🐞 test.fail (DEF) | 1.4 s | DEF-SD-001 |
| TC-INV-CAT-020 | problem_user puede ordenar el listado | P2 | 🐞 test.fail (DEF) | 1.3 s | DEF-SD-002 |
| TC-INV-CAT-021 | problem_user puede agregar y quitar los 6 productos | P1 | 🐞 test.fail (DEF) | 1.7 s | DEF-SD-003 |
| TC-INV-CAT-022 | problem_user abre el detalle del producto elegido | P1 | 🐞 test.fail (DEF) | 1.0 s | DEF-SD-004 |
| TC-INV-CAT-023 | error_user puede ordenar sin errores | P2 | 🐞 test.fail (DEF) | 1.0 s | DEF-SD-005 |
| TC-INV-CAT-024 | error_user puede agregar y quitar los 6 productos | P1 | 🐞 test.fail (DEF) | 1.6 s | DEF-SD-006 |
| TC-INV-CAT-025 | visual_user ve precios reales y con 2 decimales | P1 | 🐞 test.fail (DEF) | 1.2 s | DEF-SD-007 |
| TC-INV-CAT-026 | visual_user ve imágenes y controles en su posición - revisión manual | P3 | ⏭️ Omitido | 0.0 s | PENDING-CODE: parte manual del TC "Ambos" (comparación visual de capturas), no automatizab... |
| TC-INV-CAT-026 | visual_user ve imágenes y controles en su posición | P3 | 🐞 test.fail (DEF) | 2.2 s | DEF-SD-008 |
| TC-INV-CAT-027 | performance_glitch_user ve el mismo catálogo que standard_user | P3 | ✅ Pasa | 11.4 s |  |
| TC-INV-CAT-028 | El selector de orden ofrece las 4 opciones estáticas | P3 | ✅ Pasa | 1.3 s |  |
| TC-INV-DYN-001 | Desplegar el submenú Dynamic Catalog | P2 | ✅ Pasa | 2.3 s |  |
| TC-INV-DYN-002 | Abrir Lazy Load | P2 | ✅ Pasa | 2.1 s |  |
| TC-INV-DYN-003 | El scroll carga más productos | P2 | ✅ Pasa | 2.0 s |  |
| TC-INV-DYN-004 | Precios de Lazy Load iguales al catálogo | P3 | ✅ Pasa | 1.9 s |  |
| TC-INV-DYN-005 | Spinner visible durante la carga | P2 | ✅ Pasa | 4.9 s |  |
| TC-INV-DYN-006 | El spinner reaparece al recargar | P3 | ✅ Pasa | 7.0 s |  |
| TC-INV-DYN-007 | El punto del slider muestra su producto | P2 | ✅ Pasa | 1.0 s |  |
| TC-INV-DYN-008 | El slider avanza automáticamente | P3 | ✅ Pasa | 3.6 s |  |
| TC-INV-DYN-009 | Slider sin sesión redirige al login | P1 | ✅ Pasa | 0.8 s |  |
| TC-INV-DYN-010 | Lazy Load y Spinner sin sesión redirigen al login | P2 | ✅ Pasa | 1.2 s |  |
| TC-INV-DYN-011 | Las vistas del Dynamic Catalog son de solo lectura | P3 | ✅ Pasa | 5.8 s |  |
| TC-INV-DYN-012 | Dynamic Catalog con usuarios no estándar (error_user) | P3 | ✅ Pasa | 8.6 s |  |
| TC-INV-DYN-012 | Dynamic Catalog con usuarios no estándar (performance_glitch_user) | P3 | ✅ Pasa | 12.6 s |  |
| TC-INV-DYN-012 | Dynamic Catalog con usuarios no estándar (problem_user) | P3 | ✅ Pasa | 5.9 s |  |
| TC-INV-DYN-012 | Dynamic Catalog con usuarios no estándar (visual_user) | P3 | ✅ Pasa | 6.3 s |  |
| TC-INV-DYN-013 | Cerrar el submenú con un segundo clic | P3 | ✅ Pasa | 2.5 s |  |
| TC-NAV-MENU-001 | Abrir y cerrar el menú lateral | P1 | ✅ Pasa | 1.8 s |  |
| TC-NAV-MENU-002 | Cerrar el menú con Escape | P3 | ✅ Pasa | 1.0 s |  |
| TC-NAV-MENU-003 | Opciones del menú y su orden | P2 | ✅ Pasa | 1.0 s |  |
| TC-NAV-MENU-004 | Menú, carrito y footer en todas las vistas internas | P2 | ✅ Pasa | 2.3 s |  |
| TC-NAV-MENU-005 | All Items desde el carrito | P1 | ✅ Pasa | 2.0 s |  |
| TC-NAV-MENU-006 | About lleva al sitio de Sauce Labs | P2 | ✅ Pasa | 3.2 s |  |
| TC-NAV-MENU-007 | Logout desde el menú | P0 | ✅ Pasa | 2.6 s |  |
| TC-NAV-MENU-008 | Reset App State vacía el carrito | P1 | ✅ Pasa | 3.3 s |  |
| TC-NAV-MENU-009 | Reset App State actualiza los botones del listado | P2 | 🐞 test.fail (DEF) | 3.1 s | DEF-SD-017 |
| TC-NAV-MENU-010 | El menú queda abierto tras Reset App State | P3 | ✅ Pasa | 3.0 s |  |
| TC-NAV-MENU-011 | Enlaces sociales del footer | P3 | ✅ Pasa | 1.3 s |  |
| TC-NAV-MENU-012 | Texto de copyright del footer | P3 | ✅ Pasa | 1.1 s |  |
| TC-NAV-MENU-013 | Logo del encabezado | P3 | ✅ Pasa | 1.4 s |  |
| TC-NAV-MENU-014 | problem_user: About apunta al sitio correcto | P2 | 🐞 test.fail (DEF) | 1.1 s | DEF-SD-018 |
| TC-NAV-MENU-015 | error_user: Reset App State sin errores | P3 | ✅ Pasa | 2.6 s |  |
| TC-NAV-MENU-016 | La página de login no muestra menú ni carrito | P3 | ✅ Pasa | 0.7 s |  |

---

## Failures Detail

Sin fallos inesperados.

---

## Defectos y recomendaciones

Defectos abiertos (cada uno con su `expectOpenDefect`): DEF-SD-001, DEF-SD-002, DEF-SD-003, DEF-SD-004, DEF-SD-005, DEF-SD-006, DEF-SD-007, DEF-SD-008, DEF-SD-009, DEF-SD-010, DEF-SD-011, DEF-SD-012, DEF-SD-013, DEF-SD-014, DEF-SD-015, DEF-SD-016, DEF-SD-017, DEF-SD-018, DEF-SD-019 - archivos en `qa/06-defects/open/`.

Recomendaciones (sin `test.fail`): REC-SD-001 a REC-SD-011 en `qa/06-defects/recommendations/`.

