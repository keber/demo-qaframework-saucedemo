import { Page, Locator } from '@playwright/test';

// AUTH-LOG: Login page (/)
// INSPECTION 2026-11-21: data-test username(#user-name), password(#password),
// login-button(#login-button), error, error-button, login-credentials, login-password.
// Error state: 2 `.error_icon` and class `input_error` on the inputs.
// Known defects affecting this submodule: none (REC-SD-001 cookie forging, REC-SD-002).
export class LoginPage {
  static readonly route = '/';
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly error: Locator;
  readonly errorButton: Locator;
  readonly errorIcons: Locator;
  readonly credentials: Locator;
  readonly passwordHint: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.error = page.getByTestId('error');
    this.errorButton = page.getByTestId('error-button');
    this.errorIcons = page.locator('.error_icon');
    this.credentials = page.getByTestId('login-credentials');
    this.passwordHint = page.getByTestId('login-password');
  }

  async goto(): Promise<void> {
    await this.page.goto(LoginPage.route);
    await this.loginButton.waitFor({ state: 'visible' });
  }

  /** Reads a username from an env var (rule 3). Throws naming the variable, never its value. */
  static envValue(key: string): string {
    const value = process.env[key];
    if (!value) throw new Error(`[LoginPage] missing env:${key}`);
    return value;
  }

  /**
   * Sets the real password (env QA_USER_PASSWORD) through evaluate() with the native
   * setter (React controlled input), so the value never appears as a fill() argument.
   */
  async fillSecretPassword(): Promise<void> {
    const pwd = LoginPage.envValue('QA_USER_PASSWORD');
    await this.password.waitFor({ state: 'visible' });
    await this.page.evaluate((value) => {
      const input = document.querySelector('#password') as HTMLInputElement | null;
      if (!input) throw new Error('password input not found');
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
      if (setter) setter.call(input, value);
      else input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }, pwd);
  }

  /** Types username (explicit value) + the real password from env, without submitting. */
  async fillCredentials(username: string): Promise<void> {
    await this.username.fill(username);
    await this.fillSecretPassword();
  }

  /** Full login with the username held in `usernameEnvKey` and the shared password. */
  async loginWithEnv(usernameEnvKey: string): Promise<void> {
    await this.fillCredentials(LoginPage.envValue(usernameEnvKey));
    await this.loginButton.click();
  }
}
