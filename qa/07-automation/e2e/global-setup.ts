/**
 * global-setup.ts - saucedemo (Swag Labs)
 *
 * Runs ONCE before all test files. Logs in every saucedemo persona the suite uses
 * and saves one storageState per persona, so no test of the default suite ever
 * types a credential.
 *
 * THIS IS THE ONLY PLACE A LOGIN HAPPENS for the default suite (the login-flow tests
 * in *.login.spec.ts are the documented exception, in a project that records nothing).
 * The login runs in its own browser, outside the test runner, through
 * scripts/saucedemo-session.js: the `use` options of playwright.config.ts do not apply
 * and nothing is recorded. Never start tracing, record video or HAR, or take
 * screenshots in this file.
 *
 * saucedemo specifics:
 *   - login form: `#user-name` / `#password` / `#login-button` (data-test username,
 *     password, login-button); success = `[data-test="inventory-list"]` visible.
 *   - the session is the client cookie `session-username`, valid 600 s from the login
 *     and NOT renewed by activity. fixtures/base.ts renews a storageState whose cookie
 *     is about to expire (child process, same script), so long runs keep working.
 *   - personas (standard, problem, performance_glitch, error, visual) are behaviour
 *     profiles, not roles of one account: they get persona storageStates
 *     (.auth/<user>.json) instead of extra lanes, because a lane would duplicate the
 *     whole suite as another project. The default lane (QA_USER, .auth/user-default.json)
 *     is standard_user.
 *   - a second login of the same saucedemo user does not invalidate another session
 *     (there is no server session), so the cold-setup guard of the lane scaffold only
 *     applies when parallelLanes.enabled is true in qa-framework.config.json.
 *
 * Environment variables (names only, never values - rule 3):
 *   QA_BASE_URL                                   optional, defaults to project.qaBaseUrl
 *   QA_USER_EMAIL / QA_USER_PASSWORD              default lane (standard_user)
 *   QA_USER_<PERSONA>_USERNAME                    one per persona
 */

import { FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const laneLock = require('./scripts/lane-lock.js');
const guards = require('./scripts/global-setup-guards.js');
const laneConfig = require('./scripts/lane-config.js');
const session = require('./scripts/saucedemo-session.js');

type LaneInfo = {
  account: string;
  storageState: string;
  mcpNamespace: string | null;
  runnerProject: string | null;
  capabilities: string[];
};
const LANE_INFO: Record<string, LaneInfo> = laneLock.LANE_INFO;

/** Personas whose storageState the default suite consumes. locked_out_user cannot log in. */
const PERSONAS = ['standard_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];

function lanesEnabled(): boolean {
  try {
    const cfgPath = path.resolve(__dirname, '../../qa-framework.config.json');
    const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
    return Boolean(cfg.parallelLanes && cfg.parallelLanes.enabled);
  } catch {
    return true; // unknown -> keep the strict guard
  }
}

export default async function globalSetup(config: FullConfig): Promise<void> {
  const baseURL: string = laneConfig.loadQaBaseUrl(process.env, __dirname).url;

  if (lanesEnabled()) {
    guards.assertColdSetupIsIntentional(process.env);
    const laneOnly = process.env.QA_LANE_ONLY;
    if (laneOnly) {
      guards.assertLaneIsLocked(laneOnly, process.env, laneLock);
      guards.assertProjectsMatchLane(laneOnly, config.projects, process.argv, laneLock);
    }
  }

  // Default lane: the account named by the lane table (QA_USER -> QA_USER_EMAIL), which
  // is standard_user. Its storageState path comes from the lane table, never hardcoded.
  for (const [laneId, lane] of Object.entries(LANE_INFO)) {
    const { emailKey, passwordKey } = guards.laneCredentials(laneId, lane, process.env);
    console.log(`[global-setup] lane ${laneId} (${lane.account}) credentials from env:${emailKey} / env:${passwordKey}`);
    if (session.needsRefresh(lane.storageState)) {
      await session.loginAndSave('standard_user', lane.storageState, baseURL);
      console.log(`[global-setup] storageState saved: ${lane.storageState}`);
    }
  }

  // Persona storageStates. Sequential on purpose (one browser at a time).
  for (const user of PERSONAS) {
    const stateFile = session.stateFileFor(user);
    if (!session.needsRefresh(stateFile)) continue;
    await session.loginAndSave(user, stateFile, baseURL);
    console.log(`[global-setup] storageState saved: ${stateFile} (persona ${user})`);
  }
}
