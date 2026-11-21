/**
 * @module CART
 * @submodule CRT
 * @spec qa/01-specifications/module-cart/submodule-cart/05-test-scenarios.md
 * @plan qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-saucedemo-Sprint-1-CART.md
 *
 * Cart persistence across logout + login (same user and another user in the same
 * browser). These TCs type the real password, so they run only in the opt-in
 * 'login-flow' project, which records nothing (npm run test:login-flow).
 *
 * INSPECTION: 2026-11-21
 * cart-contents lives in localStorage and is NOT cleared by logout (shared by every
 * user of the same browser - DEF-SD-009).
 */

import { test, expect } from '@playwright/test';
import { expectOpenDefect } from '../../fixtures/defects';
import { LoginPage } from '../../page-objects/LoginPage';
import { InventoryPage } from '../../page-objects/InventoryPage';
import { CartPage } from '../../page-objects/CartPage';

async function loginToCatalog(page: import('@playwright/test').Page, envKey: string): Promise<InventoryPage> {
  const login = new LoginPage(page);
  await login.goto();
  await login.loginWithEnv(envKey);
  await page.waitForURL('**/inventory.html');
  const inventory = new InventoryPage(page);
  await expect(inventory.header.title).toHaveText('Products');
  return inventory;
}

test.describe('CART-CRT - Persistencia y aislamiento (logout y login)', () => {
  test('[TC-CART-CRT-011] El carrito se conserva tras logout y login del mismo usuario @P2', async ({ page }) => {
    let inventory = await loginToCatalog(page, 'QA_USER_STANDARD_USER_USERNAME');
    await inventory.addButton('sauce-labs-backpack').click();
    await inventory.addButton('sauce-labs-bike-light').click();
    await inventory.header.logoutViaMenu();
    inventory = await loginToCatalog(page, 'QA_USER_STANDARD_USER_USERNAME');
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventory.header.cartBadge).toHaveText('2');
    expect(await inventory.cartContents()).toBe('[4,0]');
  });

  test('[TC-CART-CRT-012] Otro usuario no ve el carrito del anterior @P1', async ({ page }) => {
    let inventory = await loginToCatalog(page, 'QA_USER_STANDARD_USER_USERNAME');
    await inventory.addButton('sauce-labs-backpack').click();
    await inventory.addButton('sauce-labs-bike-light').click();
    await inventory.header.logoutViaMenu();
    inventory = await loginToCatalog(page, 'QA_USER_VISUAL_USER_USERNAME');
    await inventory.header.goToCart();
    const badges = await inventory.header.cartBadge.count();
    const rows = await new CartPage(page).rows.count();
    await expectOpenDefect('DEF-SD-009', 'RN-CART-011: el carrito de un usuario es visible para el siguiente usuario del mismo navegador', () => {
      expect.soft(badges).toBe(0);
      expect.soft(rows).toBe(0);
    });
  });
});
