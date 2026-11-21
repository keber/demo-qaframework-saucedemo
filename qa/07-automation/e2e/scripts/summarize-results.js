#!/usr/bin/env node
/**
 * scripts/summarize-results.js
 *
 * Turns the Playwright JSON report (results/results.json, gitignored) into a compact,
 * versionable summary: totals (passed / failed / expected-fail / skipped / flaky) and
 * one row per test with TC id, title, project, status, duration and open-defect id.
 *
 *   node scripts/summarize-results.js [input.json] [output.json]
 *
 * Status mapping (per test, last attempt):
 *   passed         expected passed, actual passed
 *   expected-fail  test.fail() (annotation "fail") and it failed: the open defect reproduces
 *   failed         unexpected failure (includes a test.fail() that passed)
 *   skipped        test.skip()
 *   flaky          failed first, passed on retry
 *
 * The summary never contains credentials: titles and error first lines only.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const input = path.resolve(process.argv[2] || 'results/results.json');
const output = path.resolve(process.argv[3] || 'results/summary.json');

const report = JSON.parse(fs.readFileSync(input, 'utf8'));
const rows = [];

function walk(suite, file) {
  const specFile = suite.file || file;
  for (const spec of suite.specs || []) {
    for (const t of spec.tests || []) {
      const last = t.results[t.results.length - 1] || {};
      const expectedFail = t.expectedStatus === 'failed';
      let status;
      if (t.status === 'skipped') status = 'skipped';
      else if (t.status === 'flaky') status = 'flaky';
      else if (t.status === 'expected') status = expectedFail ? 'expected-fail' : 'passed';
      else status = 'failed';
      const defect = (t.annotations || []).find((a) => a.type === 'open-defect');
      const skip = (t.annotations || []).find((a) => a.type === 'skip');
      const tc = (spec.title.match(/\[(TC-[A-Z]+-[A-Z]+-\d{3})\]/) || [])[1] || null;
      const priority = (spec.title.match(/@(P\d)/) || [])[1] || null;
      const error = last.error && last.error.message ? last.error.message.split('\n')[0].replace(/\u001b\[[0-9;]*m/g, '').slice(0, 300) : null;
      rows.push({
        tc,
        title: spec.title,
        priority,
        file: specFile,
        project: t.projectName,
        status,
        durationMs: last.duration || 0,
        retries: Math.max(0, t.results.length - 1),
        openDefect: defect ? defect.description.split(':')[0] : null,
        skipReason: skip ? skip.description || null : null,
        error: status === 'failed' ? error : null,
      });
    }
  }
  for (const child of suite.suites || []) walk(child, specFile);
}
for (const suite of report.suites || []) walk(suite, suite.file);

const totals = rows.reduce(
  (acc, r) => {
    acc.tests += 1;
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  },
  { tests: 0, passed: 0, failed: 0, 'expected-fail': 0, skipped: 0, flaky: 0 }
);
const tcIds = new Set(rows.filter((r) => r.tc).map((r) => r.tc));

const summary = {
  generatedAt: new Date().toISOString(),
  playwrightVersion: report.config && report.config.version,
  startTime: report.stats && report.stats.startTime,
  durationMs: report.stats && Math.round(report.stats.duration),
  workers: report.config && report.config.workers,
  projects: [...new Set(rows.map((r) => r.project))],
  totals: { ...totals, distinctTCs: tcIds.size },
  defects: [...new Set(rows.filter((r) => r.openDefect).map((r) => r.openDefect))].sort(),
  tests: rows,
};

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(summary, null, 2) + '\n', 'utf8');
console.log(`[summarize] ${output}`);
console.log(JSON.stringify(summary.totals));
