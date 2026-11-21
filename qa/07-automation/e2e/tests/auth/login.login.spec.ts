/**
 * @module AUTH
 * @submodule LOG
 * @spec qa/01-specifications/module-auth/submodule-login/05-test-scenarios.md
 * @plan qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-saucedemo-Sprint-1-AUTH.md
 *
 * Login-flow tests: every TC here types the REAL password (QA_USER_PASSWORD), so the
 * file is a *.login.spec.ts and runs only in the opt-in 'login-flow' project, which
 * records no trace, video or screenshot and holds no session
 * (references/session-and-opt-in-projects.md). Run: npm run test:login-flow
 * The password is set through LoginPage.fillSecretPassword() (evaluate + native
 * setter), never through fill(), and is never asserted, printed or attached.
 *
 * INSPECTION: 2026-11-21
 * Login: data-test username(#user-name), password(#password), login-button(#login-button),
 * error, error-button. Cookie after login: session-username, domain www.saucedemo.com,
 * expires ~599 s after the login.
 */

import { test, expect } from '@playwright/test';
import type { BrowserContext } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { InventoryPage } from '../../page-objects/InventoryPage';
import { EXEC_IDX, protectedRouteError } from '../../fixtures/catalog';

const NO_MATCH = 'Epic sadface: Username and password do not match any user in this service';

async function sessionCookies(context: BrowserContext) {
  return (await context.cookies()).filter((c) => c.name === 'session-username');
}

async function expectNoSession(context: BrowserContext): Promise<void> {
  expect(await sessionCookies(context)).toHaveLength(0);
}

async function expectCatalog(inventory: InventoryPage): Promise<void> {
  await expect(inventory.page).toHaveURL(/\/inventory\.html$/);
  await expect(inventory.header.title).toHaveText('Products');
}

test.describe('AUTH-LOG - Login y acceso exitoso', () => {
  test('[TC-AUTH-LOG-001] Login exitoso con standard_user @P0', async ({ page, context }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    await expectNoSession(context);
    await login.goto();
    await expect(login.loginButton).toBeVisible();
    await login.loginWithEnv('QA_USER_STANDARD_USER_USERNAME');
    await expectCatalog(inventory);
    await expect(inventory.items).toHaveCount(6);
    await expect(login.error).toHaveCount(0);
  });

  test('[TC-AUTH-LOG-002] Login enviando el formulario con la tecla Enter @P2', async ({ page, context }) => {
    const login = new LoginPage(page);
    await expectNoSession(context);
    await login.goto();
    await login.fillCredentials(LoginPage.envValue('QA_USER_STANDARD_USER_USERNAME'));
    await login.password.press('Enter');
    await expectCatalog(new InventoryPage(page));
  });

  test('[TC-AUTH-LOG-016] Login después de intentar acceder a una ruta protegida @P2', async ({ page, context }) => {
    const login = new LoginPage(page);
    await expectNoSession(context);
    await page.goto('/cart.html');
    await expect(login.error).toContainText("You can only access '/cart.html' when you are logged in.");
    await login.loginWithEnv('QA_USER_STANDARD_USER_USERNAME');
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page).not.toHaveURL(/cart\.html/);
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  const NON_STANDARD = [
    { user: 'problem_user', env: 'QA_USER_PROBLEM_USER_USERNAME' },
    { user: 'performance_glitch_user', env: 'QA_USER_PERFORMANCE_GLITCH_USER_USERNAME' },
    { user: 'error_user', env: 'QA_USER_ERROR_USER_USERNAME' },
    { user: 'visual_user', env: 'QA_USER_VISUAL_USER_USERNAME' },
  ];
  for (const { user, env } of NON_STANDARD) {
    test(`[TC-AUTH-LOG-019] Login de los usuarios habilitados no estándar (${user}) @P1`, async ({ page, context }) => {
      const login = new LoginPage(page);
      await expectNoSession(context);
      await login.goto();
      await login.loginWithEnv(env);
      // Explicit 15 s only for performance_glitch_user (~5 s login); global timeout untouched.
      const loginWait = user === 'performance_glitch_user' ? 15_000 : undefined;
      await page.waitForURL('**/inventory.html', { timeout: loginWait });
      // The URL changes before the delayed render: the same explicit wait covers the view.
      await expect(page.getByTestId('title')).toHaveText('Products', { timeout: loginWait });
      await expect(login.error).toHaveCount(0);
      const cookies = await sessionCookies(context);
      expect(cookies.map((c) => c.value)).toEqual([LoginPage.envValue(env)]);
    });
  }

  test('[TC-AUTH-LOG-020] performance_glitch_user inicia sesión pese a la demora @P2', async ({ page, context }) => {
    const login = new LoginPage(page);
    await expectNoSession(context);
    await login.goto();
    await login.loginWithEnv('QA_USER_PERFORMANCE_GLITCH_USER_USERNAME');
    await page.waitForURL('**/inventory.html', { timeout: 15_000 });
    // The URL changes before the delayed render: the same explicit wait covers the view.
    await expect(page.getByTestId('title')).toHaveText('Products', { timeout: 15_000 });
    await expect(login.error).toHaveCount(0);
  });

  test('[TC-AUTH-LOG-021] Cookie de sesión creada con el nombre del usuario @P2', async ({ page, context }) => {
    const login = new LoginPage(page);
    await expectNoSession(context);
    await login.goto();
    await login.loginWithEnv('QA_USER_STANDARD_USER_USERNAME');
    await expect(page).toHaveURL(/\/inventory\.html$/);
    const cookies = await sessionCookies(context);
    expect(cookies).toHaveLength(1);
    expect(cookies[0].value).toBe(LoginPage.envValue('QA_USER_STANDARD_USER_USERNAME'));
    expect(cookies[0].domain).toBe('www.saucedemo.com');
  });
});

test.describe('AUTH-LOG - Validaciones y mensajes de error (contraseña real)', () => {
  test('[TC-AUTH-LOG-006] Usuario inexistente @P1', async ({ page, context }) => {
    const login = new LoginPage(page);
    await expectNoSession(context);
    await login.goto();
    await login.fillCredentials(`qa_user_${EXEC_IDX}`);
    await login.loginButton.click();
    await expect(login.error).toHaveText(NO_MATCH);
    await expect(page).toHaveURL(/\/$/);
    await expectNoSession(context);
  });

  test('[TC-AUTH-LOG-008] Usuario en mayúsculas es rechazado @P2', async ({ page, context }) => {
    const login = new LoginPage(page);
    await expectNoSession(context);
    await login.goto();
    await login.fillCredentials(LoginPage.envValue('QA_USER_STANDARD_USER_USERNAME').toUpperCase());
    await login.loginButton.click();
    await expect(login.error).toHaveText(NO_MATCH);
    await expect(page).toHaveURL(/\/$/);
    await expectNoSession(context);
  });

  test('[TC-AUTH-LOG-009] Usuario con espacio inicial es rechazado @P3', async ({ page, context }) => {
    const login = new LoginPage(page);
    await expectNoSession(context);
    await login.goto();
    await login.fillCredentials(` ${LoginPage.envValue('QA_USER_STANDARD_USER_USERNAME')}`);
    await login.loginButton.click();
    await expect(login.error).toHaveText(NO_MATCH);
    await expect(page).toHaveURL(/\/$/);
  });

  test('[TC-AUTH-LOG-010] Usuario bloqueado no puede iniciar sesión @P0', async ({ page, context }) => {
    const login = new LoginPage(page);
    await expectNoSession(context);
    await login.goto();
    await login.loginWithEnv('QA_USER_LOCKED_OUT_USER_USERNAME');
    await expect(login.error).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId('inventory-list')).toHaveCount(0);
    // RN-AUTH-005 requires the access to be rejected: a protected route stays closed.
    // [REVISED - 2026-11-21] No assertion on the session-username cookie: the app writes an
    // inert cookie, which violates no business rule (REC-SD-012, formerly DEF-SD-019).
    await page.goto('/inventory.html');
    await expect(login.error).toHaveText(protectedRouteError('/inventory.html'));
    await expect(page.getByTestId('inventory-list')).toHaveCount(0);
  });
});

test.describe('AUTH-LOG - Ciclo de vida de la sesión', () => {
  test('[TC-AUTH-LOG-023] Expiración de la sesión a los 10 minutos @P3', async ({ page, context }) => {
    const login = new LoginPage(page);
    await login.goto();
    const loginAt = Date.now() / 1000;
    await login.loginWithEnv('QA_USER_STANDARD_USER_USERNAME');
    await expectCatalog(new InventoryPage(page));
    const [cookie] = await sessionCookies(context);
    expect(cookie, 'session-username cookie after login').toBeTruthy();
    const ttl = cookie.expires - loginAt;
    expect(ttl).toBeGreaterThanOrEqual(590);
    expect(ttl).toBeLessThanOrEqual(610);
    // Simulates the browser dropping the expired cookie (page.clock does not affect cookies).
    await context.clearCookies({ name: 'session-username' });
    await page.goto('/cart.html');
    await expect(login.error).toHaveText(protectedRouteError('/cart.html'));
    await expect(page.getByTestId('cart-list')).toHaveCount(0);
  });
});
