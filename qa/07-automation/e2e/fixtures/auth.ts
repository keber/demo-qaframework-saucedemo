/**
 * fixtures/auth.ts
 *
 * TESTS NEVER LOG IN. global-setup.ts logs each lane in once and saves storageState;
 * every lane project in playwright.config.ts starts its tests from that storageState.
 * A login inside a test would store the typed credentials and the login request,
 * password included, in the trace, the video and the screenshots of every failed run.
 *
 * loginAs(page, role) exists for ONE purpose: tests of the login flow itself. Those
 * live in a *.login.spec.ts file and run only in the opt-in 'login-flow' project
 * (npm run test:login-flow), where trace, video and screenshot are off:
 *
 *   // tests/auth/sign-in.login.spec.ts
 *   import { test, expect } from '@playwright/test';
 *   import { loginAs } from '../../fixtures/auth';
 *   test('a valid user reaches the dashboard', async ({ page }) => {
 *     await loginAs(page, 'default');
 *   });
 *
 * loginAs() refuses to run - before touching the page - in a project that records any
 * of them, and outside a running test. It checks the project's options, so do not turn
 * capture back on with test.use() inside a login spec.
 *
 * To act as another role, use a lane whose account has that role (parallelLanes in
 * qa-framework.config.json), not a login inside the test.
 *
 * Supported roles are driven by env vars - see .env.example. saucedemo: 'default'
 * (QA_USER_EMAIL) or a persona name (QA_USER_<PERSONA>_USERNAME), password QA_USER_PASSWORD.
 */

import type { Page } from '@playwright/test';
import { test } from '@playwright/test';

export type QARole = 'default' | 'standard_user' | 'problem_user' | 'performance_glitch_user' | 'error_user' | 'visual_user' | 'locked_out_user' | string;

interface LoginConfig {
  email:     string;
  password:  string;
}

/**
 * Map role name -> credentials from environment variables. saucedemo: 'default' is the
 * lane account (QA_USER_EMAIL = standard_user); any persona name resolves
 * QA_USER_<PERSONA>_USERNAME. All personas share QA_USER_PASSWORD.
 */
function getCredentials(role: QARole): LoginConfig {
  const password = process.env.QA_USER_PASSWORD ?? '';
  if (role === 'default') {
    return { email: process.env.QA_USER_EMAIL ?? '', password };
  }
  return { email: process.env[`QA_USER_${role.toUpperCase()}_USERNAME`] ?? '', password };
}

export type ArtifactKind = 'trace' | 'video' | 'screenshot';

/**
 * Which of trace, video and screenshot a project's `use` options record. Each accepts a
 * mode string or an object with a `mode`; anything other than 'off' (or unset, whose
 * default is off) counts as recorded, including a shape this helper does not know.
 */
export function capturedArtifacts(use: Record<string, unknown> | undefined): ArtifactKind[] {
  const kinds: ArtifactKind[] = ['trace', 'video', 'screenshot'];
  return kinds.filter((kind) => {
    const value = use ? use[kind] : undefined;
    const mode = value !== null && typeof value === 'object' ? (value as { mode?: unknown }).mode : value;
    return mode !== undefined && mode !== 'off';
  });
}

/** Throws unless the running test's project records no trace, video or screenshot. */
function assertLoginIsNotRecorded(role: QARole): void {
  let info: { project: { name: string; use: Record<string, unknown> } };
  try {
    info = test.info() as unknown as typeof info;
  } catch {
    throw new Error(
      `[qa-framework/auth] loginAs(page, "${role}") runs only inside a test of the opt-in "login-flow" project. ` +
      'A session for the suite is created by global-setup.ts and saved as storageState, never by a helper.'
    );
  }
  const captured = capturedArtifacts(info.project.use);
  if (captured.length) {
    throw new Error(
      `[qa-framework/auth] loginAs(page, "${role}") refused: project "${info.project.name}" records ${captured.join(', ')}, ` +
      'which would store the typed credentials and the login request in test artifacts. Tests never log in: ' +
      'they start from the storageState saved by global-setup.ts. A test of the login flow itself goes in a ' +
      '*.login.spec.ts file and runs in the opt-in "login-flow" project (npm run test:login-flow), which records nothing.'
    );
  }
}

/**
 * Navigate to the login page and authenticate as the given role.
 * Only for tests of the login flow itself (see the header).
 * Waits for the post-login success selector before resolving.
 */
export async function loginAs(page: Page, role: QARole = 'default'): Promise<void> {
  assertLoginIsNotRecorded(role);
  const { email, password } = getCredentials(role);

  if (!email || !password) {
    throw new Error(
      `[qa-framework/auth] Missing credentials for role "${role}". ` +
      `Check your .env file - expected QA_USER_EMAIL or QA_USER_${role.toUpperCase()}_USERNAME, and QA_USER_PASSWORD.`
    );
  }

  // saucedemo defaults; `||` so an empty value in .env also falls back.
  const loginPath        = process.env.QA_LOGIN_PATH               || '/';
  const emailSelector    = process.env.QA_LOGIN_EMAIL_SELECTOR      || '#user-name';
  const passwordSelector = process.env.QA_LOGIN_PASSWORD_SELECTOR   || '#password';
  const submitSelector   = process.env.QA_LOGIN_SUBMIT_SELECTOR     || '#login-button';
  const successSelector  = process.env.QA_LOGIN_SUCCESS_SELECTOR    || '.inventory_list';
  const baseURL          = process.env.QA_BASE_URL                  ?? '';

  await page.goto(`${baseURL}${loginPath}`, { waitUntil: 'domcontentloaded' });
  await page.locator(emailSelector).fill(email);
  // Trace safety, second layer: the guard above already refuses a project that records
  // a trace, but Playwright records fill() argument values in traces, so the password is
  // still set through evaluate() in case capture is switched on for a single test.
  // Do not "simplify" this back to fill().
  // The input/change events are required because assigning .value directly does
  // not notify SPA frameworks (Blazor/Radzen bind on those events).
  // evaluate() has no auto-wait, so the explicit waitFor replaces the one that
  // locator().fill() performed implicitly.
  await page.locator(passwordSelector).waitFor({ state: 'visible', timeout: 30_000 });
  await page.evaluate(
    ([selector, pwd]) => {
      const input = document.querySelector(selector) as HTMLInputElement | null;
      if (!input) {
        throw new Error(`[qa-framework] Password input not found for selector: ${selector}`);
      }
      // React controlled input: use the native setter so React sees the change.
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
      if (setter) setter.call(input, pwd); else input.value = pwd;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    },
    [passwordSelector, password] as const
  );
  await page.locator(submitSelector).click();
  // 15 s covers performance_glitch_user (~5 s login); the global timeout is untouched.
  await page.waitForSelector(successSelector, { timeout: 15_000 });
}
