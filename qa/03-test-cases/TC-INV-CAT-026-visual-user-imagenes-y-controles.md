# TC-INV-CAT-026: visual_user ve imágenes y controles en su posición

| Campo | Valor |
|-------|-------|
| TC ID | TC-INV-CAT-026 |
| Módulo | Catálogo de productos (INV) |
| Submódulo | Listado y detalle (CAT) |
| Prioridad | P3 |
| Tipo | Regresión (comportamiento por usuario) |
| Origen | UI-OBSERVED |
| Fecha de observación | 2026-11-21 |
| Automatizable | Parcial (`Ambos`: verificaciones de DOM automatizadas + revisión visual manual) |
| Archivo Playwright | (se completa en la etapa 5: `qa/07-automation/e2e/tests/inventory/`) |
| Estado | Draft |
| Plan de pruebas | `qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-saucedemo-Sprint-1-INV.md` (fila 39) |

---

## Objetivo

Verificar que `visual_user` ve el listado de productos con la misma imagen por producto y la misma disposición de controles que `standard_user` (RN-INV-011). Es un candidato DEF conocido: la etapa 1 observó la imagen de Backpack con `sl-404`, el ícono del carrito desplazado y un botón con la clase `btn_inventory_misaligned`.

Se documenta como TC independiente porque combina dos usuarios en contextos separados y una parte de inspección humana que no cabe en una fila de la tabla.

---

## Precondiciones

1. `{QA_BASE_URL}` accesible.
2. Variables definidas en `qa/07-automation/e2e/.env`: `QA_BASE_URL`, `QA_USER_PASSWORD` (`<PLACEHOLDER>`), `QA_USER_STANDARD_USER_USERNAME`, `QA_USER_VISUAL_USER_USERNAME`.
3. Dos contextos de navegador nuevos e independientes (el carrito y la cookie se comparten dentro de un mismo navegador), con el mismo viewport de escritorio.

---

## Datos de prueba

| Campo | Valor |
|-------|-------|
| Usuario de referencia | `{QA_USER_STANDARD_USER_USERNAME}` |
| Usuario bajo prueba | `{QA_USER_VISUAL_USER_USERNAME}` |
| Contraseña | `{QA_USER_PASSWORD}` (`<PLACEHOLDER>`) |
| Imagen esperada de Backpack | `src` contiene `sauce-backpack` y no contiene `sl-404` |
| Tolerancia de posición | +/- 2 px en `x` e `y` del `boundingBox()` de `shopping-cart-link` |

---

## Pasos

| Paso | Acción | Resultado esperado |
|------|--------|-------------------|
| 1 | Automatizado - contexto A: navegar a `{QA_BASE_URL}/`, ingresar `{QA_USER_STANDARD_USER_USERNAME}` en `username`, `{QA_USER_PASSWORD}` en `password` y hacer clic en `login-button` | URL `/inventory.html`, `title` = "Products" |
| 2 | Automatizado - contexto A: guardar el `boundingBox()` de `shopping-cart-link` y una captura de `inventory-list` | Valores de referencia guardados |
| 3 | Automatizado - contexto B: iniciar sesión igual con `{QA_USER_VISUAL_USER_USERNAME}` | URL `/inventory.html`, `title` = "Products" |
| 4 | Automatizado - contexto B: leer el `src` de `inventory-item-sauce-labs-backpack-img` | El `src` contiene `sauce-backpack` y no contiene `sl-404` |
| 5 | Automatizado - contexto B: leer el `boundingBox()` de `shopping-cart-link` | `x` e `y` iguales a los del paso 2 (+/- 2 px) |
| 6 | Automatizado - contexto B: leer el atributo `class` de los 6 botones `add-to-cart-*` | Ningún botón contiene la clase `btn_inventory_misaligned` |
| 7 | Automatizado - contexto B: guardar una captura de `inventory-list` y adjuntar ambas capturas al reporte (`testInfo.attach`) | Capturas disponibles en el reporte HTML |
| 8 | Manual: comparar lado a lado las capturas de los pasos 2 y 7 | Mismas imágenes por producto, botones alineados en la misma posición y el ícono del carrito en el mismo lugar |

---

## Resultados esperados

**Estado final**: `visual_user` ve el mismo listado que `standard_user` en imágenes y disposición.

**Puntos de verificación**:
- [ ] La imagen de Backpack es la propia del producto (sin `sl-404`)
- [ ] `shopping-cart-link` está en la misma posición que con `standard_user` (+/- 2 px)
- [ ] Ningún botón del listado tiene la clase `btn_inventory_misaligned`
- [ ] La revisión manual de las capturas no encuentra diferencias visuales

La parte automatizada asserta la regla (regla 10). Si la etapa 5 confirma la desviación, el test se marca con `test.fail()` y se crea `qa/06-defects/open/DEF-SD-NNN_*.md`. Los precios aleatorios del listado de `visual_user` los cubre TC-INV-CAT-025, no este TC.

---

## Problemas conocidos / defectos relacionados

| Problema | DEF-ID | Estado | Impacto en este TC |
|-------|-------|--------|------------------|
| Imagen de Backpack `sl-404`, ícono del carrito desplazado (x=1034, y=39 frente a x=1220, y=10) y botón con `btn_inventory_misaligned` (observado en la etapa 1) | DEF-SD-008 | Abierto (confirmado en la etapa 5) | `test.fail()` con la aserción de la regla |

---

## Notas de automatización

```typescript
// Credenciales siempre desde process.env (regla 3)
const ref = await pageA.getByTestId('shopping-cart-link').boundingBox();
const box = await pageB.getByTestId('shopping-cart-link').boundingBox();
expect(Math.abs(box!.x - ref!.x)).toBeLessThanOrEqual(2);
expect(Math.abs(box!.y - ref!.y)).toBeLessThanOrEqual(2);

await expect(pageB.getByTestId('inventory-item-sauce-labs-backpack-img'))
  .not.toHaveAttribute('src', /sl-404/);
await expect(pageB.locator('.btn_inventory_misaligned')).toHaveCount(0);
```

- No usar `toHaveScreenshot()` como aserción automática: el listado de `visual_user` cambia precios en cada carga y produciría falsos positivos; la comparación visual queda en el paso manual.

---

## Historial de cambios

| Versión | Fecha | Autor | Descripción |
|---------|------|--------|-------------|
| 1.0 | 2026-11-21 | QA (etapa 4) | Creación inicial |
