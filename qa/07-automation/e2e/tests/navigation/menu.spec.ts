/**
 * @module NAV
 * @submodule MENU
 * @spec qa/01-specifications/module-navigation/submodule-menu/05-test-scenarios.md
 * @plan qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-saucedemo-Sprint-1-NAV.md
 *
 * The plan step "iniciar sesión" is satisfied by the persona storageState created in
 * global-setup.ts; tests never type credentials.
 *
 * INSPECTION: 2026-11-21
 * Menu: #react-burger-menu-btn / #react-burger-cross-btn, `.bm-menu-wrap` aria-hidden,
 * 5 sidebar links in DOM order: All Items, Dynamic Catalog, About (href
 * https://saucelabs.com/), Logout, Reset App State. Header: `.app_logo` "Swag Labs",
 * shopping-cart-link. Footer: social-x/facebook/linkedin (target _blank), footer-copy
 * "© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy".
 */

import { test, expect } from '../../fixtures/base';
import type { Page } from '@playwright/test';
import { expectOpenDefect } from '../../fixtures/defects';
import { InventoryPage } from '../../page-objects/InventoryPage';
import { CartPage } from '../../page-objects/CartPage';
import { CheckoutPage } from '../../page-objects/CheckoutPage';
import { HeaderMenu } from '../../page-objects/HeaderMenu';

async function openCatalog(page: Page): Promise<InventoryPage> {
  const inventory = new InventoryPage(page);
  await inventory.goto();
  await expect(inventory.header.title).toHaveText('Products');
  return inventory;
}

async function expectChrome(header: HeaderMenu, view: string): Promise<void> {
  await test.step(`encabezado y footer en ${view}`, async () => {
    await expect(header.burger).toBeVisible();
    await expect(header.cartLink).toBeVisible();
    await expect(header.footer).toBeVisible();
  });
}

test.describe('NAV-MENU - Menú lateral y encabezado', () => {
  test('[TC-NAV-MENU-001] Abrir y cerrar el menú lateral @P1', async ({ page }) => {
    const { header } = await openCatalog(page);
    await expect(header.wrap).toHaveAttribute('aria-hidden', 'true');
    await header.burger.click();
    await expect(header.wrap).toHaveAttribute('aria-hidden', 'false');
    await header.cross.click();
    await expect(header.wrap).toHaveAttribute('aria-hidden', 'true');
  });

  test('[TC-NAV-MENU-002] Cerrar el menú con Escape @P3', async ({ page }) => {
    const { header } = await openCatalog(page);
    await header.open();
    await page.keyboard.press('Escape');
    await expect(header.wrap).toHaveAttribute('aria-hidden', 'true');
  });

  test('[TC-NAV-MENU-003] Opciones del menú y su orden @P2', async ({ page }) => {
    const { header } = await openCatalog(page);
    await header.open();
    await expect(header.sidebarLinks).toHaveText(['All Items', 'Dynamic Catalog', 'About', 'Logout', 'Reset App State']);
  });

  test('[TC-NAV-MENU-004] Menú, carrito y footer en todas las vistas internas @P2', async ({ page }) => {
    const inventory = await openCatalog(page);
    const header = inventory.header;
    await inventory.seedCart([4, 0]);
    await expect(header.cartBadge).toHaveText('2');
    await inventory.goto();
    await expectChrome(header, '/inventory.html');
    await inventory.gotoDetail(4);
    await expectChrome(header, '/inventory-item.html?id=4');
    const cart = new CartPage(page);
    await cart.goto();
    await expectChrome(header, '/cart.html');
    await cart.startCheckout();
    await expect(header.title).toHaveText('Checkout: Your Information');
    await expectChrome(header, '/checkout-step-one.html');
    const checkout = new CheckoutPage(page);
    await checkout.continueToOverview();
    await expect(header.title).toHaveText('Checkout: Overview');
    await expectChrome(header, '/checkout-step-two.html');
    await checkout.finishOrder();
    await expectChrome(header, '/checkout-complete.html');
  });

  test('[TC-NAV-MENU-005] All Items desde el carrito @P1', async ({ page }) => {
    const { header } = await openCatalog(page);
    await header.goToCart();
    await header.open();
    await header.allItems.click();
    await page.waitForURL('**/inventory.html');
    await expect(header.title).toHaveText('Products');
  });

  test('[TC-NAV-MENU-006] About lleva al sitio de Sauce Labs @P2', async ({ page }) => {
    const { header } = await openCatalog(page);
    await header.open();
    await expect(header.about).toHaveAttribute('href', 'https://saucelabs.com/');
    await header.about.click();
    await page.waitForURL(/saucelabs\.com/, { waitUntil: 'commit' });
    expect(page.url()).toMatch(/^https:\/\/saucelabs\.com\//);
  });

  test('[TC-NAV-MENU-007] Logout desde el menú @P0', async ({ page }) => {
    const { header } = await openCatalog(page);
    await header.open();
    await header.logout.click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId('username')).toBeVisible();
    await expect(page.getByTestId('password')).toBeVisible();
    await expect(page.getByTestId('login-button')).toBeVisible();
    await expect(header.burger).toHaveCount(0);
  });

  test('[TC-NAV-MENU-013] Logo del encabezado @P3', async ({ page }) => {
    const { header } = await openCatalog(page);
    await expect(header.logo).toHaveText('Swag Labs');
  });
});

test.describe('NAV-MENU - Reset App State', () => {
  test('[TC-NAV-MENU-008] Reset App State vacía el carrito @P1', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.addButton('sauce-labs-backpack').click();
    await inventory.addButton('sauce-labs-bike-light').click();
    await expect(inventory.header.cartBadge).toHaveText('2');
    await inventory.header.resetAppState();
    await expect(inventory.header.cartBadge).toHaveCount(0);
    expect(await inventory.cartContents()).toBeNull();
  });

  test('[TC-NAV-MENU-009] Reset App State actualiza los botones del listado @P2', async ({ page }) => {
    const inventory = await openCatalog(page);
    await inventory.addButton('sauce-labs-onesie').click();
    await expect(inventory.removeButton('sauce-labs-onesie')).toBeVisible();
    await inventory.header.resetAppState();
    await expect(inventory.header.cartBadge).toHaveCount(0);
    // Observation without reloading the page.
    const addCount = await inventory.addButton('sauce-labs-onesie').count();
    const addText = addCount ? ((await inventory.addButton('sauce-labs-onesie').textContent()) ?? '').trim() : null;
    const removeCount = await inventory.removeButton('sauce-labs-onesie').count();
    await expectOpenDefect('DEF-SD-017', 'RN-NAV-007: tras Reset App State los botones del listado siguen en "Remove" hasta recargar', () => {
      expect.soft(addText).toBe('Add to cart');
      expect.soft(removeCount).toBe(0);
    });
  });

  test('[TC-NAV-MENU-010] El menú queda abierto tras Reset App State @P3', async ({ page }) => {
    const { header } = await openCatalog(page);
    await header.resetAppState();
    await expect(header.wrap).toHaveAttribute('aria-hidden', 'false');
    await expect(header.reset).toBeVisible();
  });

  test.describe('error_user', () => {
    test.use({ qaUser: 'error_user' });

    test('[TC-NAV-MENU-015] error_user: Reset App State sin errores @P3', async ({ page }) => {
      // Listeners are registered once the catalog is rendered (plan step 2 comes after
      // the login). The direct page.goto('/inventory.html') of a storageState test logs a
      // host 404 for the deep link and an "unload" permissions-policy message for every
      // user (also standard_user, without any reset): not part of this TC.
      const inventory = await openCatalog(page);
      const pageErrors: string[] = [];
      const consoleErrors: string[] = [];
      page.on('pageerror', (e) => pageErrors.push(e.message));
      page.on('console', (msg) => {
        if (msg.type() === 'error' && !msg.text().includes('backtrace.io') && !(msg.location().url ?? '').includes('backtrace.io')) {
          consoleErrors.push(msg.text());
        }
      });
      await inventory.addButton('sauce-labs-backpack').click();
      await expect(inventory.header.cartBadge).toHaveText('1');
      await inventory.header.resetAppState();
      await expect(inventory.header.wrap).toHaveAttribute('aria-hidden', 'false');
      await expect(inventory.header.cartBadge).toHaveCount(0);
      expect(await inventory.cartContents()).toBeNull();
      expect(pageErrors, 'pageerror').toHaveLength(0);
      expect(consoleErrors, 'console errors').toHaveLength(0);
    });
  });
});

test.describe('NAV-MENU - Footer', () => {
  test('[TC-NAV-MENU-011] Enlaces sociales del footer @P3', async ({ page }) => {
    await openCatalog(page);
    const links: Record<string, string> = {
      'social-x': 'https://x.com/saucelabs',
      'social-facebook': 'https://www.facebook.com/saucelabs',
      'social-linkedin': 'https://www.linkedin.com/company/sauce-labs/',
    };
    for (const [testId, href] of Object.entries(links)) {
      await expect(page.getByTestId(testId)).toHaveAttribute('href', href);
      await expect(page.getByTestId(testId)).toHaveAttribute('target', '_blank');
    }
  });

  test('[TC-NAV-MENU-012] Texto de copyright del footer @P3', async ({ page }) => {
    const { header } = await openCatalog(page);
    await expect(header.footerCopy).toHaveText(
      `© ${new Date().getFullYear()} Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy`
    );
  });
});

test.describe('NAV-MENU - Acceso y usuarios no estándar', () => {
  test.describe('problem_user', () => {
    test.use({ qaUser: 'problem_user' });

    test('[TC-NAV-MENU-014] problem_user: About apunta al sitio correcto @P2', async ({ page }) => {
      const { header } = await openCatalog(page);
      await header.open();
      const href = await header.about.getAttribute('href');
      await expectOpenDefect('DEF-SD-018', 'RN-NAV-004: para problem_user About apunta a https://saucelabs.com/error/404', () => {
        expect(href).toBe('https://saucelabs.com/');
      });
    });
  });

  test.describe('sin sesión', () => {
    test.use({ qaUser: 'anonymous' });

    test('[TC-NAV-MENU-016] La página de login no muestra menú ni carrito @P3', async ({ page, context }) => {
      expect((await context.cookies()).filter((c) => c.name === 'session-username')).toHaveLength(0);
      await page.goto('/');
      await expect(page.getByTestId('login-button')).toBeVisible();
      await expect(page.locator('#react-burger-menu-btn')).toHaveCount(0);
      await expect(page.getByTestId('shopping-cart-link')).toHaveCount(0);
    });
  });
});
