#!/usr/bin/env node
/**
 * scripts/pdf-text.mjs
 *
 * Extracts the text and page count of a PDF with pdfjs-dist (legacy Node build) and
 * prints them as JSON: { "numpages": N, "text": "..." }. Run as a child process from
 * tests (TC-CHK-FLW-026) because pdfjs-dist is ESM-only.
 *
 *   node scripts/pdf-text.mjs <file.pdf>
 */
import { readFileSync } from 'node:fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const file = process.argv[2];
if (!file) {
  console.error('usage: node scripts/pdf-text.mjs <file.pdf>');
  process.exit(2);
}

try {
  const data = new Uint8Array(readFileSync(file));
  const doc = await getDocument({ data, useSystemFonts: true, isEvalSupported: false }).promise;
  const pages = [];
  for (let n = 1; n <= doc.numPages; n++) {
    const content = await (await doc.getPage(n)).getTextContent();
    pages.push(content.items.map((item) => ('str' in item ? item.str : '')).join(' '));
  }
  process.stdout.write(JSON.stringify({ numpages: doc.numPages, text: pages.join('\n') }));
} catch (error) {
  console.error(`[pdf-text] ${error && error.message}`);
  process.exit(1);
}
