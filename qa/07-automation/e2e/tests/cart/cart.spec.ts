/**
 * @module CART
 * @submodule CRT
 * @spec qa/01-specifications/module-cart/submodule-cart/05-test-scenarios.md
 * @plan qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-saucedemo-Sprint-1-CART.md
 *
 * The plan step "iniciar sesión" is satisfied by the persona storageState created in
 * global-setup.ts. TC-CART-CRT-011 and TC-CART-CRT-012 log out and log in again inside
 * the test, so they live in cart-session.login.spec.ts (opt-in 'login-flow' project).
 *
 * INSPECTION: 2026-11-21
 * Cart: title "Your Cart", cart-list, cart-quantity-label "QTY", cart-desc-label
 * "Description", rows `.cart_item` (count `.cart_item`, never children: a removed row
 * leaves `.removed_cart_item`), item-quantity, remove-{slug}, continue-shopping, checkout.
 * Badge shopping-cart-badge absent with an empty cart. State: localStorage cart-contents.
 */

import { test, expect } from '../../fixtures/base';
import type { Page } from '@playwright/test';
import { expectOpenDefect } from '../../fixtures/defects';
import { InventoryPage } from '../../page-objects/InventoryPage';
import { CartPage } from '../../page-objects/CartPage';
import { CheckoutPage } from '../../page-objects/CheckoutPage';
import type { SauceUser } from '../../fixtures/base';

async function openCatalog(page: Page): Promise<InventoryPage> {
  const inventory = new InventoryPage(page);
  await inventory.goto();
  await expect(inventory.header.title).toHaveText('Products');
  return inventory;
}

test.describe('CART-CRT - Badge del carrito', () => {
  test('[TC-CART-CRT-001] Sin badge con el carrito vacío @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    expect([null, '[]']).toContain(await inventory.cartContents());
    await expect(inventory.header.cartLink).toBeVisible();
    await expect(inventory.header.cartBadge).toHaveCount(0);
  });

  test('[TC-CART-CRT-002] El badge suma y resta al agregar y quitar @P0', async ({ page }) => {
    const inventory = await openCatalog(page);
    await expect(inventory.header.cartBadge).toHaveCount(0);
    for (const slug of ['sauce-labs-backpack', 'sauce-labs-bike-light', 'sauce-labs-onesie']) {
      await inventory.addButton(slug).click();
    }
    await expect(inventory.header.cartBadge).toHaveText('3');
    await inventory.removeButton('sauce-labs-onesie').click();
    await expect(inventory.header.cartBadge).toHaveText('2');
  });
});

test.describe('CART-CRT - Contenido y edición del carrito', () => {
  test('[TC-CART-CRT-003] El carrito lista los productos agregados @P0', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.addButton('sauce-labs-backpack').click();
    await inventory.addButton('sauce-labs-bike-light').click();
    await inventory.header.goToCart();
    const cart = new CartPage(page);
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(cart.rows).toHaveCount(2);
    await expect(cart.rowNames).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await expect(cart.rowPrices).toHaveText(['$29.99', '$9.99']);
    await expect(cart.quantities).toHaveText(['1', '1']);
  });

  test('[TC-CART-CRT-004] Encabezados de la página del carrito @P3', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.header.goToCart();
    const cart = new CartPage(page);
    await expect(cart.header.title).toHaveText('Your Cart');
    await expect(cart.quantityLabel).toHaveText('QTY');
    await expect(cart.descLabel).toHaveText('Description');
  });

  test('[TC-CART-CRT-005] Quitar un producto desde el carrito @P0', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.addButton('sauce-labs-backpack').click();
    await inventory.addButton('sauce-labs-bike-light').click();
    await inventory.header.goToCart();
    const cart = new CartPage(page);
    await expect(cart.rows).toHaveCount(2);
    await cart.removeButton('sauce-labs-bike-light').click();
    await expect(cart.rows).toHaveCount(1);
    await expect(cart.rowNames).toHaveText(['Sauce Labs Backpack']);
    await expect(cart.header.cartBadge).toHaveText('1');
    expect(await inventory.cartContents()).toBe('[4]');
  });

  test('[TC-CART-CRT-006] Quitar el último producto deja el carrito vacío @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.addButton('sauce-labs-backpack').click();
    await inventory.header.goToCart();
    const cart = new CartPage(page);
    await expect(cart.rows).toHaveCount(1);
    await cart.removeButton('sauce-labs-backpack').click();
    await expect(cart.rows).toHaveCount(0);
    await expect(cart.header.cartBadge).toHaveCount(0);
  });

  test('[TC-CART-CRT-007] El producto quitado en el carrito vuelve a "Add to cart" en el listado @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.addButton('sauce-labs-backpack').click();
    await inventory.header.goToCart();
    const cart = new CartPage(page);
    await cart.removeButton('sauce-labs-backpack').click();
    await expect(cart.rows).toHaveCount(0);
    await cart.backToCatalog();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventory.addButton('sauce-labs-backpack')).toHaveText('Add to cart');
    await expect(inventory.removeButton('sauce-labs-backpack')).toHaveCount(0);
  });

  test('[TC-CART-CRT-014] El nombre del producto en el carrito abre su detalle @P2', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.addButton('sauce-labs-backpack').click();
    await inventory.header.goToCart();
    await inventory.openDetailBy(page.getByTestId('item-4-title-link'));
    await expect(page).toHaveURL(/inventory-item\.html\?id=4$/);
    await expect(inventory.names).toHaveText('Sauce Labs Backpack');
    await expect(inventory.detailRemove).toHaveText('Remove');
  });

  test('[TC-CART-CRT-019] La cantidad por producto es siempre 1 y no es editable @P3', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.addButton('sauce-labs-backpack').click();
    await inventory.header.goToCart();
    const cart = new CartPage(page);
    await expect(cart.quantities).toHaveText(['1']);
    await expect(cart.rows.locator('input, select')).toHaveCount(0);
    await cart.backToCatalog();
    await expect(inventory.addButton('sauce-labs-backpack')).toHaveCount(0);
    await expect(inventory.removeButton('sauce-labs-backpack')).toBeVisible();
    await expect(inventory.header.cartBadge).toHaveText('1');
  });
});

test.describe('CART-CRT - Navegación desde el carrito', () => {
  test('[TC-CART-CRT-008] Continue Shopping vuelve al catálogo sin cambiar el carrito @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.addButton('sauce-labs-backpack').click();
    await inventory.addButton('sauce-labs-bike-light').click();
    await inventory.header.goToCart();
    const cart = new CartPage(page);
    await expect(cart.rows).toHaveCount(2);
    await cart.backToCatalog();
    await expect(inventory.header.title).toHaveText('Products');
    await expect(inventory.header.cartBadge).toHaveText('2');
    expect(await inventory.cartContents()).toBe('[4,0]');
  });

  test('[TC-CART-CRT-009] Checkout abre el paso 1 @P0', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.addButton('sauce-labs-backpack').click();
    await inventory.header.goToCart();
    await new CartPage(page).startCheckout();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(inventory.header.title).toHaveText('Checkout: Your Information');
    await expect(page.getByTestId('firstName')).toBeVisible();
  });

  test('[TC-CART-CRT-013] No se puede iniciar checkout con el carrito vacío @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await expect(inventory.header.cartBadge).toHaveCount(0);
    await inventory.header.goToCart();
    const cart = new CartPage(page);
    await expect(cart.rows).toHaveCount(0);
    // Observation: try to start the checkout only when the button is visible and enabled.
    const operable = (await cart.checkout.isVisible()) && (await cart.checkout.isEnabled());
    if (operable) {
      await cart.checkout.click();
      // Bounded wait for a navigation that the spec says must NOT happen.
      await page.waitForURL('**/checkout-step-one.html', { timeout: 5_000 }).catch(() => undefined);
    }
    const url = page.url();
    const infoContainers = await new CheckoutPage(page).infoContainer.count();
    await expectOpenDefect('DEF-SD-010', 'RN-CART-008: con el carrito vacío el botón checkout está habilitado e inicia el checkout', () => {
      expect.soft(url).toMatch(/\/cart\.html$/);
      expect.soft(infoContainers).toBe(0);
    });
  });
});

test.describe('CART-CRT - Persistencia y aislamiento', () => {
  test('[TC-CART-CRT-010] El carrito se conserva al recargar @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.addButton('sauce-labs-backpack').click();
    await inventory.addButton('sauce-labs-bike-light').click();
    await expect(inventory.header.cartBadge).toHaveText('2');
    await page.reload();
    await inventory.list.waitFor({ state: 'visible' });
    await expect(inventory.header.cartBadge).toHaveText('2');
    await inventory.header.goToCart();
    await expect(new CartPage(page).rowNames).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
  });

  test('[TC-CART-CRT-015] El carrito queda vacío al completar la compra @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.addButton('sauce-labs-backpack').click();
    await inventory.addButton('sauce-labs-bike-light').click();
    await inventory.header.goToCart();
    await new CartPage(page).startCheckout();
    await expect(inventory.header.title).toHaveText('Checkout: Your Information');
    const checkout = new CheckoutPage(page);
    await checkout.continueToOverview();
    await expect(inventory.header.title).toHaveText('Checkout: Overview');
    await checkout.finishOrder();
    await inventory.header.goToCart();
    await expect(inventory.header.cartBadge).toHaveCount(0);
    await expect(new CartPage(page).rows).toHaveCount(0);
    expect(await inventory.cartContents()).toBeNull();
  });
});

test.describe('CART-CRT - Acceso y usuarios no estándar', () => {
  test.describe('sin sesión', () => {
    test.use({ qaUser: 'anonymous' });

    test('[TC-CART-CRT-016] Carrito sin sesión redirige al login @P1', async ({ page, context }) => {
      expect((await context.cookies()).filter((c) => c.name === 'session-username')).toHaveLength(0);
      await page.goto('/cart.html');
      await expect(page.getByTestId('error')).toHaveText("Epic sadface: You can only access '/cart.html' when you are logged in.");
      await expect(page.getByTestId('login-button')).toBeVisible();
      await expect(page.getByTestId('cart-list')).toHaveCount(0);
    });
  });

  for (const user of ['problem_user', 'error_user'] as SauceUser[]) {
    test.describe(`${user}`, () => {
      test.use({ qaUser: user });

      test(`[TC-CART-CRT-017] problem_user y error_user pueden quitar productos desde el carrito (${user}) @P2`, async ({ page }) => {
        const inventory = await openCatalog(page);
        await inventory.seedCart([4, 0]);
        await expect(inventory.header.cartBadge).toHaveText('2');
        await inventory.header.goToCart();
        const cart = new CartPage(page);
        await expect(cart.rows).toHaveCount(2);
        await cart.removeButton('sauce-labs-bike-light').click();
        await expect(cart.rows).toHaveCount(1);
        await expect(cart.rowNames).toHaveText(['Sauce Labs Backpack']);
        await expect(cart.header.cartBadge).toHaveText('1');
        expect(await inventory.cartContents()).toBe('[4]');
      });
    });
  }

  test.describe('visual_user', () => {
    test.use({ qaUser: 'visual_user' });

    test('[TC-CART-CRT-018] visual_user ve en el carrito el precio real @P2', async ({ page }) => {
      const inventory = await openCatalog(page);
      await inventory.addButton('sauce-labs-backpack').click();
      await inventory.header.goToCart();
      const cart = new CartPage(page);
      await expect(cart.rows.filter({ hasText: 'Sauce Labs Backpack' }).getByTestId('inventory-item-price')).toHaveText('$29.99');
    });
  });
});
