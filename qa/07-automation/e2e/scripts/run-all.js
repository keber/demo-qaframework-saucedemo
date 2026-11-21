#!/usr/bin/env node
/**
 * scripts/run-all.js
 *
 * Runs the WHOLE saucedemo suite: the default lane project plus the opt-in
 * 'login-flow' project (*.login.spec.ts), in one Playwright invocation, without a
 * shell (works the same on Windows and Linux). Extra arguments are forwarded.
 *
 *   npm run test:all
 *   npm run test:all -- --grep @P0
 */

'use strict';

const { spawnSync } = require('child_process');
const path = require('path');

const cli = require.resolve('@playwright/test/cli');
const args = [cli, 'test', ...process.argv.slice(2)];
const result = spawnSync(process.execPath, args, {
  cwd: path.resolve(__dirname, '..'),
  stdio: 'inherit',
  env: { ...process.env, QA_RUN_LOGIN_FLOW: '1' },
});
process.exit(result.status === null ? 1 : result.status);
