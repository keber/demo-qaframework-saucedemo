# TC-CHK-FLW-019: Generar el PDF de la orden

| Campo | Valor |
|-------|-------|
| TC ID | TC-CHK-FLW-019 |
| Módulo | Checkout (CHK) |
| Submódulo | Flujo de compra (FLW) |
| Prioridad | P2 |
| Tipo | Funcional |
| Origen | UI-OBSERVED |
| Fecha de observación | 2026-11-21 |
| Automatizable | Parcial (`Ambos`: descarga y nombre automatizados + revisión visual manual del PDF) |
| Archivo Playwright | (se completa en la etapa 5: `qa/07-automation/e2e/tests/checkout/`) |
| Estado | Draft |
| Plan de pruebas | `qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-saucedemo-Sprint-1-CHK.md` (fila 19) |

---

## Objetivo

Verificar que el botón "Generate PDF order" de la confirmación descarga un comprobante PDF con el nombre esperado y que el documento es legible (RN-CHK-015). El contenido textual del PDF lo valida en forma automática TC-CHK-FLW-026; este TC cubre la descarga y la revisión visual que no se puede asertar desde el DOM.

---

## Precondiciones

1. `{QA_BASE_URL}` accesible.
2. Variables definidas en `qa/07-automation/e2e/.env`: `QA_BASE_URL`, `QA_USER_PASSWORD` (`<PLACEHOLDER>`), `QA_USER_STANDARD_USER_USERNAME`.
3. Contexto de navegador nuevo creado con `acceptDownloads: true` (sin esta opción Playwright no entrega el archivo).

---

## Datos de prueba

| Campo | Valor |
|-------|-------|
| Usuario | `{QA_USER_STANDARD_USER_USERNAME}` |
| Contraseña | `{QA_USER_PASSWORD}` (`<PLACEHOLDER>`) |
| Carrito | `cart-contents` = `[4,0]` (Backpack $29.99 + Bike Light $9.99) |
| Nombre | `QA-${EXEC_IDX}` |
| Apellido | `Pérez` |
| Código postal | `8320000` |
| Patrón del archivo | `^swag-labs-order-\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.pdf$` |

---

## Pasos

| Paso | Acción | Resultado esperado |
|------|--------|-------------------|
| 1 | Crear el contexto con `acceptDownloads: true`, navegar a `{QA_BASE_URL}/`, ingresar `{QA_USER_STANDARD_USER_USERNAME}` en `username`, `{QA_USER_PASSWORD}` en `password` y hacer clic en `login-button` | URL `/inventory.html`, `title` = "Products" |
| 2 | Ejecutar `localStorage.setItem('cart-contents', '[4,0]')` y recargar | `shopping-cart-badge` = "2" |
| 3 | Hacer clic en `shopping-cart-link` y luego en `checkout` | URL `/checkout-step-one.html` |
| 4 | Ingresar `QA-${EXEC_IDX}` en `firstName`, `Pérez` en `lastName`, `8320000` en `postalCode` y hacer clic en `continue` | URL `/checkout-step-two.html`, `total-label` = "Total: $43.18" |
| 5 | Hacer clic en `finish` | URL `/checkout-complete.html`, `generate-pdf-order` visible con texto "Generate PDF order" |
| 6 | Hacer clic en `generate-pdf-order` esperando el evento `download` | Se recibe 1 descarga |
| 7 | Leer `download.suggestedFilename()` y guardar el archivo con `download.saveAs()` en `test-results/`; adjuntarlo al reporte | Nombre con el patrón esperado y tamaño mayor a 0 bytes |
| 8 | Manual: abrir el PDF adjunto en un visor | El PDF abre sin error, tiene 1 página y el texto se lee sin superposiciones ni cortes |

---

## Resultados esperados

**Estado final**: el comprobante PDF de la orden queda descargado y es legible.

**Puntos de verificación**:
- [ ] El nombre del archivo cumple `swag-labs-order-YYYY-MM-DD_HH-MM-SS.pdf`
- [ ] El archivo pesa más de 0 bytes (referencia observada: ~2.9 KB)
- [ ] El PDF abre en un visor estándar y tiene 1 página
- [ ] El texto se lee completo, sin superposiciones ni cortes

---

## Problemas conocidos / defectos relacionados

| Problema | ID | Estado | Impacto en este TC |
|-------|-------|--------|------------------|
| El nombre del archivo usa hora UTC y el campo "Order Date" del PDF usa la hora local del navegador | REC (a registrar en la etapa 5) | Hallazgo sin regla violada | Ninguno: no se asserta la hora del nombre contra la hora local |

---

## Notas de automatización

```typescript
const context = await browser.newContext({ acceptDownloads: true });
const page = await context.newPage();
// ... login con process.env.QA_USER_STANDARD_USER_USERNAME / QA_USER_PASSWORD (regla 3)
const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.getByTestId('generate-pdf-order').click(),
]);
expect(download.suggestedFilename())
  .toMatch(/^swag-labs-order-\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.pdf$/);
const file = testInfo.outputPath(download.suggestedFilename());
await download.saveAs(file);
expect(fs.statSync(file).size).toBeGreaterThan(0);
await testInfo.attach('order-pdf', { path: file, contentType: 'application/pdf' });
```

- La parte manual (paso 8) se registra en el reporte de ejecución de la etapa 5; la parte automatizada se ejecuta en cada corrida.

---

## Historial de cambios

| Versión | Fecha | Autor | Descripción |
|---------|------|--------|-------------|
| 1.0 | 2026-11-21 | QA (etapa 4) | Creación inicial |
