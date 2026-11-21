/**
 * @module AUTH
 * @submodule LOG
 * @spec qa/01-specifications/module-auth/submodule-login/05-test-scenarios.md
 * @plan qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-saucedemo-Sprint-1-AUTH.md
 *
 * Login form validations that never type the real password (empty fields or an
 * `invalid_${EXEC_IDX}` value), so they run in the default suite. TCs that type
 * QA_USER_PASSWORD live in login.login.spec.ts (opt-in 'login-flow' project).
 *
 * INSPECTION: 2026-11-21
 * Error state: error "Epic sadface: ...", error-button, 2 `.error_icon`, class
 * `input_error` on username/password. login-credentials lists the 6 users,
 * login-password shows "Password for all users:" (value never asserted - rule 3).
 */

import { test, expect } from '../../fixtures/base';
import type { BrowserContext } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { EXEC_IDX } from '../../fixtures/catalog';

test.use({ qaUser: 'anonymous' });

async function expectNoSession(context: BrowserContext): Promise<void> {
  expect((await context.cookies()).filter((c) => c.name === 'session-username')).toHaveLength(0);
}

test.describe('AUTH-LOG - Validaciones y mensajes de error', () => {
  test('[TC-AUTH-LOG-003] Usuario y contraseña vacíos @P1', async ({ page, context }) => {
    const login = new LoginPage(page);
    await expectNoSession(context);
    await login.goto();
    await expect(login.username).toHaveValue('');
    await expect(login.password).toHaveValue('');
    await login.loginButton.click();
    await expect(login.error).toHaveText('Epic sadface: Username is required');
    await expect(page).toHaveURL(/\/$/);
    await expectNoSession(context);
  });

  test('[TC-AUTH-LOG-004] Contraseña vacía @P1', async ({ page, context }) => {
    const login = new LoginPage(page);
    await expectNoSession(context);
    await login.goto();
    await login.username.fill(LoginPage.envValue('QA_USER_STANDARD_USER_USERNAME'));
    await login.loginButton.click();
    await expect(login.error).toHaveText('Epic sadface: Password is required');
    await expect(page).toHaveURL(/\/$/);
  });

  test('[TC-AUTH-LOG-005] Usuario vacío con contraseña informada @P1', async ({ page, context }) => {
    const login = new LoginPage(page);
    await expectNoSession(context);
    await login.goto();
    await login.password.fill(`invalid_${EXEC_IDX}`);
    await login.loginButton.click();
    await expect(login.error).toHaveText('Epic sadface: Username is required');
    await expect(page).toHaveURL(/\/$/);
  });

  test('[TC-AUTH-LOG-007] Contraseña incorrecta para un usuario válido @P1', async ({ page, context }) => {
    const login = new LoginPage(page);
    await expectNoSession(context);
    await login.goto();
    await login.username.fill(LoginPage.envValue('QA_USER_STANDARD_USER_USERNAME'));
    await login.password.fill(`invalid_${EXEC_IDX}`);
    await login.loginButton.click();
    await expect(login.error).toHaveText('Epic sadface: Username and password do not match any user in this service');
    await expect(page).toHaveURL(/\/$/);
    await expectNoSession(context);
  });

  test('[TC-AUTH-LOG-011] Cerrar el mensaje de error @P2', async ({ page, context }) => {
    const login = new LoginPage(page);
    await expectNoSession(context);
    await login.goto();
    await login.loginButton.click();
    await expect(login.error).toBeVisible();
    await expect(login.errorIcons).toHaveCount(2);
    await login.errorButton.click();
    await expect(login.error).toHaveCount(0);
    await expect(login.errorIcons).toHaveCount(0);
  });

  test('[TC-AUTH-LOG-012] Campos marcados visualmente ante un error @P3', async ({ page, context }) => {
    const login = new LoginPage(page);
    await expectNoSession(context);
    await login.goto();
    await login.loginButton.click();
    await expect(login.error).toBeVisible();
    await expect(login.errorIcons).toHaveCount(2);
    await expect(login.username).toHaveClass(/input_error/);
  });

  test('[TC-AUTH-LOG-013] La contraseña se muestra enmascarada @P2', async ({ page, context }) => {
    const login = new LoginPage(page);
    await expectNoSession(context);
    await login.goto();
    await login.password.fill(`invalid_${EXEC_IDX}`);
    await expect(login.password).toHaveAttribute('type', 'password');
  });

  test('[TC-AUTH-LOG-024] La página de login lista los usuarios aceptados @P3', async ({ page, context }) => {
    const login = new LoginPage(page);
    await expectNoSession(context);
    await login.goto();
    const credentials = (await login.credentials.textContent()) ?? '';
    expect(credentials).toContain('Accepted usernames are:');
    for (const user of ['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user']) {
      expect(credentials).toContain(user);
    }
    // Only the label is asserted; the password value is never read into an assertion (rule 3).
    await expect(login.passwordHint).toContainText('Password for all users:');
  });
});
