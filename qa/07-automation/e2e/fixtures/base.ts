/**
 * fixtures/base.ts - saucedemo
 *
 * Playwright test wrapper with:
 *   - `qaUser` option: which saucedemo persona the test starts as. Default
 *     'standard_user'; 'anonymous' starts without any session (empty storageState).
 *       test.use({ qaUser: 'problem_user' });
 *   - TTL-aware storageState: the `session-username` cookie lives 600 s from the
 *     login and is not renewed by activity. Before each test the persona's
 *     storageState is checked and, when the cookie has less than
 *     QA_SESSION_REFRESH_MARGIN_S (default 150 s) left, it is renewed by running
 *     scripts/saucedemo-session.js as a CHILD PROCESS. The login therefore never runs
 *     inside the test runner, where trace/video/screenshot could record it.
 *   - performance_glitch_user tests run with test.slow() (triple timeout, FLK-SD-07).
 *   - `newPersonaContext(browser, user)` for the few TCs that need a second context
 *     (another persona side by side, or "a new context" step of the plan).
 *
 * Tests never log in themselves (references/session-and-opt-in-projects.md). The
 * login-flow tests live in *.login.spec.ts and import @playwright/test directly.
 */

import { test as base, expect } from '@playwright/test';
import type { Browser, BrowserContext } from '@playwright/test';
import { spawnSync } from 'child_process';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const session = require('../scripts/saucedemo-session.js');

export type SauceUser =
  | 'standard_user'
  | 'problem_user'
  | 'performance_glitch_user'
  | 'error_user'
  | 'visual_user';

export type QaUser = SauceUser | 'anonymous';

export const EMPTY_STATE = { cookies: [], origins: [] };

const E2E_ROOT = path.resolve(__dirname, '..');

/** Returns the path of a fresh storageState for `user`, renewing it when needed. */
export function ensureSession(user: SauceUser, stateFile: string = session.stateFileFor(user)): string {
  if (session.needsRefresh(stateFile)) {
    const result = spawnSync(process.execPath, [path.join(E2E_ROOT, 'scripts/saucedemo-session.js'), user, stateFile], {
      cwd: E2E_ROOT,
      encoding: 'utf8',
      timeout: 120_000,
    });
    if (result.status !== 0) {
      // Never echo stdout/stderr blindly: the script prints only names, but be strict.
      throw new Error(`[session-refresh] could not renew the session of ${user} (exit ${result.status}).`);
    }
  }
  return path.resolve(E2E_ROOT, stateFile);
}

/** A new browser context authenticated as `user` (or anonymous), with the suite baseURL. */
export async function newPersonaContext(
  browser: Browser,
  user: QaUser,
  options: Parameters<Browser['newContext']>[0] = {}
): Promise<BrowserContext> {
  return browser.newContext({
    baseURL: process.env.QA_BASE_URL,
    ...options,
    storageState: user === 'anonymous' ? EMPTY_STATE : ensureSession(user),
  });
}

export const test = base.extend<{ qaUser: QaUser }>({
  qaUser: ['standard_user', { option: true }],

  storageState: async ({ qaUser }, use, testInfo) => {
    // performance_glitch_user delays every view by design (~5 s per render). Its multi-view
    // tests reached 23-27 s of the 30 s budget under load in stage 5b (FLK-SD-07), so they
    // get the triple timeout of test.slow(). Assertions and waits are unchanged.
    if (qaUser === 'performance_glitch_user') testInfo.slow();
    if (qaUser === 'anonymous') {
      await use(EMPTY_STATE);
      return;
    }
    // standard_user reuses the default lane storageState of the project (lane table).
    const projectState = testInfo.project.use.storageState;
    const stateFile =
      qaUser === 'standard_user' && typeof projectState === 'string' ? projectState : session.stateFileFor(qaUser);
    await use(ensureSession(qaUser, stateFile));
  },
});

export { expect };
export type { Page, Browser, BrowserContext, Locator } from '@playwright/test';
