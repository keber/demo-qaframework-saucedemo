/**
 * @module CHK
 * @submodule FLW
 * @spec qa/01-specifications/module-checkout/submodule-checkout-flow/05-test-scenarios.md
 * @plan qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-saucedemo-Sprint-1-CHK.md
 *
 * The plan step "iniciar sesión" is satisfied by the persona storageState created in
 * global-setup.ts; the cart is seeded with localStorage cart-contents (setup shortcut
 * allowed by the plan). Test data: CHECKOUT_DATA (QA-${EXEC_IDX} / Pérez / 8320000).
 *
 * INSPECTION: 2026-11-21
 * Step 1: checkout-info-container, firstName, lastName, postalCode, cancel, continue
 * (INPUT value "Continue"), error, error-button, 3 `.error_icon`.
 * Step 2: checkout-summary-container, `.cart_item`, payment-info-value, shipping-info-value,
 * subtotal-label, tax-label, total-label, cancel, finish.
 * Complete: pony-express, complete-header, complete-text, back-to-products,
 * generate-pdf-order (client-side PDF download swag-labs-order-YYYY-MM-DD_HH-MM-SS.pdf).
 * Tax 8 % rounded to cents: [4,0] -> $39.98 / $3.20 / $43.18.
 */

import { test, expect, newPersonaContext } from '../../fixtures/base';
import type { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { spawnSync } from 'child_process';
import { expectOpenDefect, InfraError } from '../../fixtures/defects';
import { InventoryPage } from '../../page-objects/InventoryPage';
import { CartPage } from '../../page-objects/CartPage';
import { CheckoutPage } from '../../page-objects/CheckoutPage';
import { CHECKOUT_DATA, protectedRouteError } from '../../fixtures/catalog';
import type { SauceUser } from '../../fixtures/base';

/**
 * PDF text via scripts/pdf-text.mjs (pdfjs-dist, ESM-only, so it runs as a child
 * process). pdf-parse 1.1.1 was discarded: its bundled pdf.js fails with "bad XRef entry"
 * on some of the PDFs the app generates. A parser failure is infrastructure, never the TC.
 */
function readPdf(file: string): { numpages: number; text: string } {
  const result = spawnSync(process.execPath, [path.resolve(__dirname, '../../scripts/pdf-text.mjs'), file], {
    encoding: 'utf8',
    timeout: 60_000,
  });
  if (result.status !== 0) throw new InfraError('other', `PDF parser failed: ${(result.stderr || '').trim()}`);
  return JSON.parse(result.stdout);
}

/** Login state -> seeded cart -> cart -> checkout step 1 (plan steps 1-3). */
async function toStepOne(page: Page, ids: number[] = [4, 0]): Promise<CheckoutPage> {
  const inventory = new InventoryPage(page);
  await inventory.goto();
  await expect(inventory.header.title).toHaveText('Products');
  await inventory.seedCart(ids);
  await expect(inventory.header.cartBadge).toHaveText(String(ids.length));
  await inventory.header.goToCart();
  await new CartPage(page).startCheckout();
  await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  await expect(inventory.header.title).toHaveText('Checkout: Your Information');
  return new CheckoutPage(page);
}

async function toOverview(page: Page, ids: number[] = [4, 0]): Promise<CheckoutPage> {
  const checkout = await toStepOne(page, ids);
  await checkout.continueToOverview();
  await expect(checkout.header.title).toHaveText('Checkout: Overview');
  return checkout;
}

/** Waits until a continue click either shows an error or reaches step 2 (whichever happens). */
async function settleAfterContinue(page: Page, checkout: CheckoutPage): Promise<void> {
  await Promise.race([
    checkout.error.waitFor({ state: 'visible', timeout: 5_000 }),
    page.waitForURL('**/checkout-step-two.html', { timeout: 5_000 }),
  ]).catch(() => undefined);
}

test.describe('CHK-FLW - Compra completa (happy path)', () => {
  test('[TC-CHK-FLW-001] Compra completa con standard_user @P0', async ({ page }) => {
    const checkout = await toOverview(page);
    await checkout.finishOrder();
    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkout.header.cartBadge).toHaveCount(0);
  });

  test('[TC-CHK-FLW-017] Finalizar muestra la confirmación y vacía el carrito @P0', async ({ page }) => {
    const checkout = await toOverview(page);
    await checkout.finishOrder();
    await expect(checkout.header.title).toHaveText('Checkout: Complete!');
    await expect(checkout.pony).toBeVisible();
    await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkout.completeText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    await expect(checkout.header.cartBadge).toHaveCount(0);
    expect(await page.evaluate(() => localStorage.getItem('cart-contents'))).toBeNull();
  });

  test('[TC-CHK-FLW-018] Back Home vuelve al catálogo @P2', async ({ page }) => {
    const checkout = await toOverview(page);
    await checkout.finishOrder();
    await checkout.backHome.click();
    await page.waitForURL('**/inventory.html');
    await expect(checkout.header.title).toHaveText('Products');
    await expect(checkout.header.cartBadge).toHaveCount(0);
  });
});

test.describe('CHK-FLW - Paso 1 - Información del cliente', () => {
  test('[TC-CHK-FLW-002] Elementos del paso 1 @P2', async ({ page }) => {
    const checkout = await toStepOne(page);
    await expect(checkout.header.title).toHaveText('Checkout: Your Information');
    await expect(checkout.firstName).toHaveAttribute('placeholder', 'First Name');
    await expect(checkout.lastName).toHaveAttribute('placeholder', 'Last Name');
    await expect(checkout.postalCode).toHaveAttribute('placeholder', 'Zip/Postal Code');
    await expect(checkout.cancel).toHaveText('Cancel');
    await expect(checkout.continueBtn).toHaveValue('Continue');
  });

  test('[TC-CHK-FLW-003] Los tres campos vacíos @P1', async ({ page }) => {
    const checkout = await toStepOne(page);
    for (const field of [checkout.firstName, checkout.lastName, checkout.postalCode]) await expect(field).toHaveValue('');
    await checkout.continueBtn.click();
    await expect(checkout.error).toHaveText('Error: First Name is required');
    await expect(checkout.errorIcons).toHaveCount(3);
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

  test('[TC-CHK-FLW-004] Falta el apellido @P1', async ({ page }) => {
    const checkout = await toStepOne(page);
    await checkout.fillInfo({ firstName: CHECKOUT_DATA.firstName });
    await checkout.continueBtn.click();
    await expect(checkout.error).toHaveText('Error: Last Name is required');
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

  test('[TC-CHK-FLW-005] Falta el código postal @P1', async ({ page }) => {
    const checkout = await toStepOne(page);
    await checkout.fillInfo({ firstName: CHECKOUT_DATA.firstName, lastName: CHECKOUT_DATA.lastName });
    await checkout.continueBtn.click();
    await expect(checkout.error).toHaveText('Error: Postal Code is required');
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

  test('[TC-CHK-FLW-006] Falta el nombre con el resto informado @P1', async ({ page }) => {
    const checkout = await toStepOne(page);
    await checkout.fillInfo({ lastName: CHECKOUT_DATA.lastName, postalCode: CHECKOUT_DATA.postalCode });
    await checkout.continueBtn.click();
    await expect(checkout.error).toHaveText('Error: First Name is required');
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

  test('[TC-CHK-FLW-007] Campos con solo espacios son rechazados @P2', async ({ page }) => {
    const checkout = await toStepOne(page);
    await checkout.fillInfo({ firstName: ' ', lastName: ' ', postalCode: ' ' });
    await checkout.continueBtn.click();
    await settleAfterContinue(page, checkout);
    const url = page.url();
    const error = (await checkout.error.count()) ? ((await checkout.error.textContent()) ?? '').trim() : null;
    await expectOpenDefect('DEF-SD-011', 'RN-CHK-004: el paso 1 acepta nombre, apellido y código postal con solo espacios', () => {
      expect.soft(error).toBe('Error: First Name is required');
      expect.soft(url).toMatch(/\/checkout-step-one\.html$/);
    });
  });

  test('[TC-CHK-FLW-008] Cerrar el error del paso 1 @P3', async ({ page }) => {
    const checkout = await toStepOne(page);
    await checkout.continueBtn.click();
    await expect(checkout.error).toBeVisible();
    await expect(checkout.errorIcons).toHaveCount(3);
    await checkout.errorButton.click();
    await expect(checkout.error).toHaveCount(0);
    await expect(checkout.errorIcons).toHaveCount(0);
  });

  test('[TC-CHK-FLW-009] Cancelar en el paso 1 vuelve al carrito @P2', async ({ page }) => {
    const checkout = await toStepOne(page);
    await checkout.cancel.click();
    await page.waitForURL('**/cart.html');
    const cart = new CartPage(page);
    await expect(cart.rowNames).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await expect(cart.header.cartBadge).toHaveText('2');
  });
});

test.describe('CHK-FLW - Paso 2 - Resumen y totales', () => {
  test('[TC-CHK-FLW-010] El resumen muestra productos, pago y envío @P1', async ({ page }) => {
    const checkout = await toOverview(page);
    await expect(checkout.summaryRows).toHaveCount(2);
    await expect(checkout.summaryRows.getByTestId('inventory-item-name')).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await expect(checkout.summaryRows.getByTestId('inventory-item-price')).toHaveText(['$29.99', '$9.99']);
    await expect(checkout.summaryRows.getByTestId('item-quantity')).toHaveText(['1', '1']);
    await expect(page.locator('[data-test^="remove"]')).toHaveCount(0);
    await expect(checkout.payment).toHaveText('SauceCard #31337');
    await expect(checkout.shipping).toHaveText('Free Pony Express Delivery!');
  });

  test('[TC-CHK-FLW-011] Subtotal igual a la suma de precios @P0', async ({ page }) => {
    const checkout = await toOverview(page);
    await expect(checkout.subtotal).toHaveText('Item total: $39.98');
  });

  test('[TC-CHK-FLW-012] Impuesto del 8 % redondeado a centavos @P0', async ({ page }) => {
    const checkout = await toOverview(page);
    await expect(checkout.tax).toHaveText('Tax: $3.20');
  });

  test('[TC-CHK-FLW-013] Total igual a subtotal más impuesto @P0', async ({ page }) => {
    const checkout = await toOverview(page);
    await expect(checkout.total).toHaveText('Total: $43.18');
  });

  test('[TC-CHK-FLW-014] Totales con 1 y con 6 productos @P1', async ({ page, browser }) => {
    await test.step('1 producto', async () => {
      const checkout = await toOverview(page, [4]);
      expect(await checkout.totals()).toEqual({ subtotal: 'Item total: $29.99', tax: 'Tax: $2.40', total: 'Total: $32.39' });
    });
    await test.step('6 productos (contexto nuevo)', async () => {
      const context = await newPersonaContext(browser, 'standard_user');
      try {
        const checkout = await toOverview(await context.newPage(), [0, 1, 2, 3, 4, 5]);
        expect(await checkout.totals()).toEqual({ subtotal: 'Item total: $129.94', tax: 'Tax: $10.40', total: 'Total: $140.34' });
      } finally {
        await context.close();
      }
    });
  });

  test('[TC-CHK-FLW-015] Totales siempre con 2 decimales @P3', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.goto();
    await expect(inventory.header.cartBadge).toHaveCount(0);
    expect(await inventory.cartContents()).toBeNull();
    await page.goto('/checkout-step-two.html');
    const checkout = new CheckoutPage(page);
    await checkout.summary.waitFor({ state: 'visible' });
    const totals = await checkout.totals();
    await expectOpenDefect('DEF-SD-012', 'RN-CHK-011: con el carrito vacío el subtotal se muestra "$0" sin 2 decimales', () => {
      for (const value of Object.values(totals)) expect.soft(value).toMatch(/\$\d+\.\d{2}$/);
      expect.soft(totals).toEqual({ subtotal: 'Item total: $0.00', tax: 'Tax: $0.00', total: 'Total: $0.00' });
    });
  });

  test('[TC-CHK-FLW-016] Cancelar en el paso 2 vuelve al catálogo con el carrito intacto @P2', async ({ page }) => {
    const checkout = await toOverview(page);
    await checkout.cancel.click();
    await page.waitForURL('**/inventory.html');
    await expect(checkout.header.cartBadge).toHaveText('2');
    expect(await page.evaluate(() => localStorage.getItem('cart-contents'))).toBe('[4,0]');
  });
});

test.describe('CHK-FLW - Comprobante PDF', () => {
  test.use({ acceptDownloads: true });

  async function downloadPdf(page: Page, savePath: string) {
    const checkout = await toOverview(page);
    await checkout.finishOrder();
    const [download] = await Promise.all([page.waitForEvent('download'), checkout.pdfButton.click()]);
    await download.saveAs(savePath);
    return download;
  }

  test('[TC-CHK-FLW-019] Generar el PDF de la orden @P2', async ({ page }, testInfo) => {
    const savePath = testInfo.outputPath('order.pdf');
    const download = await downloadPdf(page, savePath);
    expect(download.suggestedFilename()).toMatch(/^swag-labs-order-\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.pdf$/);
    expect(fs.statSync(savePath).size).toBeGreaterThan(0);
    await testInfo.attach('order-pdf', { path: savePath, contentType: 'application/pdf' });
    testInfo.annotations.push({
      type: 'manual-review',
      description: 'Revisión visual del PDF adjunto: ver qa/03-test-cases/TC-CHK-FLW-019-pdf-de-la-orden.md',
    });
  });

  test('[TC-CHK-FLW-019] Generar el PDF de la orden - revisión manual @P2', async () => {
    test.skip(
      true,
      'PENDING-CODE: parte manual del TC "Ambos" (revisión visual del PDF: legible, 1 página, sin texto superpuesto ni cortado). ' +
        'Procedimiento: qa/03-test-cases/TC-CHK-FLW-019-pdf-de-la-orden.md'
    );
  });

  test('[TC-CHK-FLW-026] El PDF contiene los datos de la orden @P3', async ({ page }, testInfo) => {
    const savePath = testInfo.outputPath('order.pdf');
    await downloadPdf(page, savePath);
    const parsed = readPdf(savePath);
    // Whitespace-insensitive comparison: a text extractor joins or splits PDF text runs
    // differently from a PDF viewer ("Sauce Labs Backpack   $ 29.99", "O R D E R"), so all
    // whitespace is removed from both sides. Every expected token is still required.
    const text = parsed.text.replace(/\s+/g, '');
    const squash = (s: string) => s.replace(/\s+/g, '');
    expect(parsed.numpages).toBe(1);
    for (const expected of [
      'Order Receipt',
      `${CHECKOUT_DATA.firstName} ${CHECKOUT_DATA.lastName}`,
      CHECKOUT_DATA.postalCode,
      'Sauce Labs Backpack $29.99',
      'Sauce Labs Bike Light $9.99',
      'Item total $39.98',
      'Tax $3.20',
      'Total $43.18',
      'Thank you for your order!',
    ]) {
      expect.soft(text, `PDF contains "${expected}"`).toContain(squash(expected));
    }
  });
});

test.describe('CHK-FLW - Acceso y control del flujo', () => {
  test('[TC-CHK-FLW-020] El resumen no es accesible sin completar el paso 1 @P2', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.goto();
    await inventory.seedCart([4, 0]);
    await expect(inventory.header.cartBadge).toHaveText('2');
    await page.goto('/checkout-step-two.html');
    await inventory.header.title.waitFor({ state: 'visible' });
    const summaries = await new CheckoutPage(page).summary.count();
    const url = page.url();
    await expectOpenDefect('DEF-SD-013', 'RN-CHK-016: /checkout-step-two.html muestra el resumen sin haber completado el paso 1', () => {
      expect.soft(summaries).toBe(0);
      expect.soft(url).toMatch(/\/(checkout-step-one|cart)\.html$/);
    });
  });

  test.describe('sin sesión', () => {
    test.use({ qaUser: 'anonymous' });
    for (const route of ['/checkout-step-one.html', '/checkout-step-two.html', '/checkout-complete.html']) {
      test(`[TC-CHK-FLW-021] Checkout sin sesión redirige al login (${route}) @P1`, async ({ page, context }) => {
        expect((await context.cookies()).filter((c) => c.name === 'session-username')).toHaveLength(0);
        await page.goto(route);
        await expect(page.getByTestId('error')).toHaveText(protectedRouteError(route));
        await expect(page.getByTestId('login-button')).toBeVisible();
      });
    }
  });
});

test.describe('CHK-FLW - Comportamiento por usuario', () => {
  test.describe('problem_user', () => {
    test.use({ qaUser: 'problem_user' });

    test('[TC-CHK-FLW-022] problem_user puede completar el paso 1 @P1', async ({ page }) => {
      const checkout = await toStepOne(page);
      const values: Record<string, string> = {};
      await checkout.firstName.fill('Ana');
      values.firstNameAfterFirst = await checkout.firstName.inputValue();
      await checkout.lastName.fill('Pérez');
      values.lastNameAfterLast = await checkout.lastName.inputValue();
      await checkout.postalCode.fill('8320000');
      values.firstName = await checkout.firstName.inputValue();
      values.lastName = await checkout.lastName.inputValue();
      values.postalCode = await checkout.postalCode.inputValue();
      await checkout.continueBtn.click();
      await settleAfterContinue(page, checkout);
      const url = page.url();
      const errors = await checkout.error.count();
      await expectOpenDefect('DEF-SD-014', 'RN-CHK-002/FL-CHK-001: para problem_user el texto del apellido se escribe en el nombre y el paso 1 no avanza', () => {
        expect.soft(values.firstName).toBe('Ana');
        expect.soft(values.lastName).toBe('Pérez');
        expect.soft(values.postalCode).toBe('8320000');
        expect.soft(url).toMatch(/\/checkout-step-two\.html$/);
        expect.soft(errors).toBe(0);
      });
    });
  });

  test.describe('error_user', () => {
    test.use({ qaUser: 'error_user' });

    test('[TC-CHK-FLW-023] error_user no avanza sin apellido @P1', async ({ page }) => {
      const checkout = await toStepOne(page);
      await checkout.fillInfo();
      const lastName = await checkout.lastName.inputValue();
      await checkout.continueBtn.click();
      await settleAfterContinue(page, checkout);
      const url = page.url();
      const error = (await checkout.error.count()) ? ((await checkout.error.textContent()) ?? '').trim() : null;
      await expectOpenDefect('DEF-SD-015', 'RN-CHK-002: error_user no puede escribir el apellido y aun así el paso 1 avanza sin error', () => {
        expect.soft(lastName).toBe(CHECKOUT_DATA.lastName);
        // RN-CHK-002: with an empty last name the step must stop with the required error.
        const advancedWithoutLastName = lastName === '' && /checkout-step-two\.html$/.test(url);
        expect.soft(advancedWithoutLastName, `avanzó con apellido vacío (error=${error})`).toBe(false);
      });
    });

    test('[TC-CHK-FLW-024] error_user puede finalizar la compra @P1', async ({ page }) => {
      const checkout = await toStepOne(page);
      await checkout.fillInfo();
      await checkout.continueBtn.click();
      await page.waitForURL('**/checkout-step-two.html');
      await expect(checkout.header.title).toHaveText('Checkout: Overview');
      await checkout.finish.click();
      await page.waitForURL('**/checkout-complete.html', { timeout: 5_000 }).catch(() => undefined);
      const url = page.url();
      const header = (await checkout.completeHeader.count()) ? ((await checkout.completeHeader.textContent()) ?? '').trim() : null;
      await expectOpenDefect('DEF-SD-016', 'RN-CHK-013: para error_user el botón finish no hace nada y la compra no se completa', () => {
        expect.soft(url).toMatch(/\/checkout-complete\.html$/);
        expect.soft(header).toBe('Thank you for your order!');
      });
    });
  });

  for (const user of ['visual_user', 'performance_glitch_user'] as SauceUser[]) {
    test.describe(user, () => {
      test.use({ qaUser: user });

      test(`[TC-CHK-FLW-025] visual_user y performance_glitch_user calculan los totales con precios reales (${user}) @P2`, async ({ page }) => {
        const checkout = await toOverview(page);
        expect(await checkout.totals()).toEqual({ subtotal: 'Item total: $39.98', tax: 'Tax: $3.20', total: 'Total: $43.18' });
        await checkout.finishOrder();
        await expect(page).toHaveURL(/\/checkout-complete\.html$/);
        await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
      });
    });
  }
});
