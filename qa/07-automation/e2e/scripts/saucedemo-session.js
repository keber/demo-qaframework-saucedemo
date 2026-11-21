#!/usr/bin/env node
/**
 * scripts/saucedemo-session.js
 *
 * Creates and refreshes the storageState of each saucedemo user ("persona").
 *
 * Why this file exists:
 *   - saucedemo keeps its session in a client-side cookie (`session-username`) that
 *     expires 600 s after the login and is NOT renewed by activity. A suite that
 *     reuses one storageState for longer than that starts failing with "You can only
 *     access ... when you are logged in." (see qa/memory/saucedemo-app-behavior.md).
 *   - saucedemo users are behaviour personas (problem_user, error_user, visual_user,
 *     performance_glitch_user), not roles of one account, and the suite needs several
 *     of them side by side. Each persona gets its own storageState file.
 *
 * Login safety (rule 3 and references/session-and-opt-in-projects.md):
 *   - This module runs OUTSIDE the Playwright test runner: from global-setup.ts (a
 *     plain function) and, for a mid-run refresh, as a child process started by
 *     fixtures/base.ts. No trace, video or screenshot is ever recorded here.
 *   - The password is read from process.env (QA_USER_PASSWORD) and set through
 *     page.evaluate() with the native value setter (React controlled input), never
 *     with fill(), and it is never printed.
 *
 * CLI (used by fixtures/base.ts):
 *   node scripts/saucedemo-session.js <user> <stateFile>
 *   exits 0 after saving a verified session, 1 otherwise.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const E2E_ROOT = path.resolve(__dirname, '..');

/** Persona -> env var holding its username. The password is shared: QA_USER_PASSWORD. */
const USER_ENV = {
  standard_user: 'QA_USER_STANDARD_USER_USERNAME',
  problem_user: 'QA_USER_PROBLEM_USER_USERNAME',
  performance_glitch_user: 'QA_USER_PERFORMANCE_GLITCH_USER_USERNAME',
  error_user: 'QA_USER_ERROR_USER_USERNAME',
  visual_user: 'QA_USER_VISUAL_USER_USERNAME',
};

/** Seconds of remaining cookie life below which a storageState is renewed. */
const REFRESH_MARGIN_S = Number(process.env.QA_SESSION_REFRESH_MARGIN_S || 150);

function loadEnv() {
  // Only when called standalone (child process): global-setup.ts already ran dotenv.
  const envFile = path.join(E2E_ROOT, '.env');
  if (fs.existsSync(envFile)) {
    require('dotenv').config({ path: envFile });
  }
}

function credentialsFor(user) {
  const usernameKey = USER_ENV[user];
  if (!usernameKey) {
    throw new Error(`[saucedemo-session] unknown persona "${user}". Known: ${Object.keys(USER_ENV).join(', ')}`);
  }
  const username = process.env[usernameKey];
  const password = process.env.QA_USER_PASSWORD;
  if (!username) throw new Error(`[saucedemo-session] missing env:${usernameKey}`);
  if (!password) throw new Error('[saucedemo-session] missing env:QA_USER_PASSWORD');
  return { username, password };
}

/** Default storageState path of a persona, relative to the e2e root. */
function stateFileFor(user) {
  return `.auth/${user}.json`;
}

/**
 * Remaining life in seconds of the session cookie stored in a storageState file,
 * or -1 when the file or the cookie does not exist.
 */
function remainingSessionSeconds(stateFile) {
  const abs = path.resolve(E2E_ROOT, stateFile);
  try {
    const state = JSON.parse(fs.readFileSync(abs, 'utf8'));
    const cookie = (state.cookies || []).find((c) => c.name === 'session-username');
    if (!cookie || typeof cookie.expires !== 'number' || cookie.expires <= 0) return -1;
    return cookie.expires - Date.now() / 1000;
  } catch {
    return -1;
  }
}

function needsRefresh(stateFile) {
  return remainingSessionSeconds(stateFile) < REFRESH_MARGIN_S;
}

/**
 * Logs `user` in, verifies the catalog rendered and the session cookie exists, and
 * saves the storageState atomically (tmp file + rename) so a parallel worker never
 * reads a half-written file.
 */
async function loginAndSave(user, stateFile, baseURL) {
  const { chromium } = require('@playwright/test');
  const { username, password } = credentialsFor(user);
  const url = (baseURL || process.env.QA_BASE_URL || '').replace(/\/$/, '');
  if (!url) throw new Error('[saucedemo-session] QA_BASE_URL is not set');

  const abs = path.resolve(E2E_ROOT, stateFile);
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await page.goto(`${url}/`, { waitUntil: 'load', timeout: 60_000 });
        await page.locator('#user-name').fill(username);
        await page.locator('#password').waitFor({ state: 'visible', timeout: 30_000 });
        await page.evaluate((pwd) => {
          const input = document.querySelector('#password');
          if (!input) throw new Error('password input not found');
          const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
          setter.call(input, pwd);
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }, password);
        await page.locator('#login-button').click();
        // performance_glitch_user takes ~5 s to log in: explicit wait here only.
        await page.locator('[data-test="inventory-list"]').waitFor({ state: 'visible', timeout: 30_000 });
        const cookies = await context.cookies();
        if (!cookies.some((c) => c.name === 'session-username' && c.value === username)) {
          throw new Error('session-username cookie missing after login');
        }
        fs.mkdirSync(path.dirname(abs), { recursive: true });
        const tmp = `${abs}.${process.pid}.${Date.now()}.tmp`;
        await context.storageState({ path: tmp });
        fs.renameSync(tmp, abs);
        return;
      } catch (error) {
        lastError = error;
      }
    }
    throw new Error(`[saucedemo-session] login of ${user} failed after 3 attempts: ${lastError && lastError.message}`);
  } finally {
    await browser.close();
  }
}

module.exports = {
  USER_ENV,
  REFRESH_MARGIN_S,
  stateFileFor,
  remainingSessionSeconds,
  needsRefresh,
  loginAndSave,
};

if (require.main === module) {
  loadEnv();
  const [user, stateFile] = process.argv.slice(2);
  if (!user || !stateFile) {
    console.error('usage: node scripts/saucedemo-session.js <user> <stateFile>');
    process.exit(2);
  }
  loginAndSave(user, stateFile)
    .then(() => {
      console.log(`[saucedemo-session] storageState saved for ${user}: ${stateFile}`);
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}
