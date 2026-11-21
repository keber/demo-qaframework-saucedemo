/**
 * @module AUTH
 * @submodule LOG
 * @spec qa/01-specifications/module-auth/submodule-login/05-test-scenarios.md
 * @plan qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-saucedemo-Sprint-1-AUTH.md
 *
 * Protected routes and logout. The plan step "iniciar sesión" of TC-AUTH-LOG-017/018 is
 * satisfied by the standard_user storageState created in global-setup.ts (plan section
 * 11 allows login by UI or storageState); tests never type credentials.
 *
 * INSPECTION: 2026-11-21
 * Internal route without session: the SPA renders the login with
 * "Epic sadface: You can only access '{ruta}' when you are logged in." (URL may stay on
 * the route or go to `/`: the message is asserted, not the URL).
 */

import { test, expect, newPersonaContext } from '../../fixtures/base';
import type { BrowserContext } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HeaderMenu } from '../../page-objects/HeaderMenu';
import { EXEC_IDX, protectedRouteError } from '../../fixtures/catalog';

async function expectNoSession(context: BrowserContext): Promise<void> {
  expect((await context.cookies()).filter((c) => c.name === 'session-username')).toHaveLength(0);
}

test.describe('AUTH-LOG - Usuario bloqueado y rutas protegidas', () => {
  test.describe('sin sesión', () => {
    test.use({ qaUser: 'anonymous' });

    test('[TC-AUTH-LOG-014] Acceso sin sesión a /inventory.html @P0', async ({ page, context }) => {
      const login = new LoginPage(page);
      await expectNoSession(context);
      await page.goto('/inventory.html');
      await expect(login.error).toHaveText(protectedRouteError('/inventory.html'));
      await expect(login.loginButton).toBeVisible();
      await expect(page.getByTestId('inventory-list')).toHaveCount(0);
    });

    const ROUTES = [
      { path: '/cart.html', route: '/cart.html' },
      { path: '/checkout-step-one.html', route: '/checkout-step-one.html' },
      { path: '/checkout-step-two.html', route: '/checkout-step-two.html' },
      { path: '/checkout-complete.html', route: '/checkout-complete.html' },
      { path: '/inventory-item.html?id=4', route: '/inventory-item.html' },
    ];
    for (const { path, route } of ROUTES) {
      test(`[TC-AUTH-LOG-015] Acceso sin sesión al resto de rutas internas (${path}) @P1`, async ({ page, context }) => {
        const login = new LoginPage(page);
        await expectNoSession(context);
        await page.goto(path);
        await expect(login.error).toHaveText(protectedRouteError(route));
        await expect(login.loginButton).toBeVisible();
      });
    }
  });

  test('[TC-AUTH-LOG-022] Cookie de sesión con usuario bloqueado o inexistente es rechazada @P2', async ({ browser }) => {
    const values = [LoginPage.envValue('QA_USER_LOCKED_OUT_USER_USERNAME'), `qa_user_${EXEC_IDX}`];
    for (const value of values) {
      const context = await newPersonaContext(browser, 'anonymous');
      try {
        const page = await context.newPage();
        await expectNoSession(context);
        await page.goto('/');
        await context.addCookies([{ name: 'session-username', value, domain: 'www.saucedemo.com', path: '/' }]);
        await page.goto('/inventory.html');
        await expect(page.getByTestId('error')).toHaveText(protectedRouteError('/inventory.html'));
        await expect(page.getByTestId('inventory-list')).toHaveCount(0);
      } finally {
        await context.close();
      }
    }
  });
});

test.describe('AUTH-LOG - Logout y ciclo de vida de la sesión', () => {
  test('[TC-AUTH-LOG-017] Logout cierra la sesión @P0', async ({ page, context }) => {
    const header = new HeaderMenu(page);
    const login = new LoginPage(page);
    await page.goto('/inventory.html');
    await expect(header.title).toHaveText('Products');
    await header.open();
    await header.logout.click();
    await expect(page).toHaveURL(/\/$/);
    await expect(login.username).toHaveValue('');
    await expect(login.password).toHaveValue('');
    await expect(login.loginButton).toBeVisible();
    await expectNoSession(context);
  });

  test('[TC-AUTH-LOG-018] Atrás del navegador tras el logout no muestra contenido @P1', async ({ page }) => {
    const header = new HeaderMenu(page);
    await page.goto('/inventory.html');
    await expect(header.title).toHaveText('Products');
    await header.logoutViaMenu();
    await page.goBack();
    await expect(page.getByTestId('error')).toHaveText(protectedRouteError('/inventory.html'));
    await expect(page.getByTestId('inventory-list')).toHaveCount(0);
  });
});
