#!/usr/bin/env tsx

import { resolve } from 'path';
import { writeFileSync, statSync } from 'fs';
import { fillTemplate, renderReportPdf } from '../lib/audit-report/render';

async function main() {
  // Create a realistic fake audit report with mixed results
  const fakeReport = {
    version: 1 as const,
    ranAt: new Date().toISOString(),
    url: 'https://example-business.co.za',
    checks: {
      ssl: {
        status: 'ok' as const,
        pass: true,
        code: 'VALID_CERT',
        headline: 'SSL certificate valid',
        body: 'Your site is served over HTTPS with a valid certificate.',
      },
      mobile: {
        status: 'ok' as const,
        score: 65,
        bucket: 'amber' as const,
        screenshot: null,
        headline: 'Mobile speed needs work',
        body: 'Your site is slower than it should be on a phone.',
      },
      desktop: {
        status: 'ok' as const,
        score: 78,
        bucket: 'green' as const,
        screenshot: null,
        headline: 'Desktop speed is strong',
        body: 'Your site loads fast on desktop.',
      },
      headers: {
        status: 'ok' as const,
        present: ['strict-transport-security', 'x-content-type-options', 'x-frame-options'] as any,
        missing: ['content-security-policy', 'referrer-policy'] as any,
        bucket: 'amber' as const,
        headline: 'Some browser protections missing',
        body: 'Your server sends some of the recommended browser protections but not all.',
        missingDetail: ['Content-Security-Policy', 'Referrer-Policy'],
      },
      accessibility: {
        status: 'ok' as const,
        score: 72,
        bucket: 'amber' as const,
        failures: [
          'Text colours are too close to the background to read comfortably',
          'Images have no text description, so screen readers skip them',
          "Visitors can't zoom in to enlarge the text",
        ],
        headline: 'Some accessibility issues found',
        body: 'Your site has accessibility problems that lock out visitors with disabilities. Each one is usually fixable — usually by adding text descriptions or adjusting colours.',
      },
    },
    summary: { completed: 5, failed: 0, overall: 'done' as const },
  };

  console.log('Building fake audit report...');
  console.log('Report checks:');
  console.log('  SSL:', fakeReport.checks.ssl.status, fakeReport.checks.ssl.pass ? 'PASS' : 'FAIL');
  console.log('  Mobile:', fakeReport.checks.mobile.status, fakeReport.checks.mobile.bucket, fakeReport.checks.mobile.score);
  console.log('  Desktop:', fakeReport.checks.desktop.status, fakeReport.checks.desktop.bucket, fakeReport.checks.desktop.score);
  console.log('  Headers:', fakeReport.checks.headers.status, fakeReport.checks.headers.bucket, `${fakeReport.checks.headers.present.length}/5 present`);
  console.log('  Accessibility:', fakeReport.checks.accessibility.status, fakeReport.checks.accessibility.bucket, fakeReport.checks.accessibility.score);

  const businessName = 'Example Business Co.';

  // Step 1: Fill template and write HTML
  console.log('\nStep 1: Filling template with report data...');
  const html = fillTemplate(fakeReport, { businessName });

  const outputHtmlPath = resolve(process.env.HOME || '~', 'Desktop/audit-report-preview.html');
  writeFileSync(outputHtmlPath, html, 'utf-8');
  const htmlSize = statSync(outputHtmlPath).size;
  console.log(`✓ HTML written to: ${outputHtmlPath}`);
  console.log(`  File size: ${(htmlSize / 1024).toFixed(1)}KB`);

  // Step 2: Render PDF
  console.log('\nStep 2: Rendering PDF...');
  const pdfBuffer = await renderReportPdf(fakeReport, { businessName });

  const outputPdfPath = resolve(process.env.HOME || '~', 'Desktop/audit-report-preview.pdf');
  writeFileSync(outputPdfPath, pdfBuffer);
  const pdfSize = statSync(outputPdfPath).size;
  console.log(`✓ PDF written to: ${outputPdfPath}`);
  console.log(`  File size: ${(pdfSize / 1024).toFixed(1)}KB`);

  // Step 3: Verify PDF structure
  console.log('\nStep 3: Verifying PDF...');

  // Use file command to get page count
  const { execSync } = await import('child_process');
  try {
    const fileOutput = execSync(`file "${outputPdfPath}"`, { encoding: 'utf-8' });
    const pageMatch = fileOutput.match(/(\d+)\s+page/);
    const pageCount = pageMatch ? parseInt(pageMatch[1], 10) : 0;
    console.log(`✓ PDF pages: ${pageCount}`);
  } catch {
    console.log(`✓ PDF pages: could not determine (file command failed)`);
  }

  // Check for font and image embedding by reading the file directly (more reliable)
  const { readFileSync: fsReadFileSync } = await import('fs');
  const pdfFileBuffer = fsReadFileSync(outputPdfPath);
  const pdfTextLatin1 = pdfFileBuffer.toString('latin1');

  // Check for fonts
  const hasFontEmbedding = pdfTextLatin1.includes('/Font') || pdfTextLatin1.includes('Playfair');
  console.log(`✓ Fonts embedded: ${hasFontEmbedding ? 'Yes' : 'No'}`);

  // Check for images
  const hasImageData = pdfTextLatin1.includes('/Image') || pdfTextLatin1.includes('/XObject');
  console.log(`✓ Images embedded: ${hasImageData ? 'Yes' : 'No'}`);

  console.log('\n✅ Preview complete!');
  console.log(`\nOpen the files to inspect:`);
  console.log(`  open "${outputHtmlPath}"`);
  console.log(`  open "${outputPdfPath}"`);

  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  if (err.stack) {
    console.error(err.stack);
  }
  process.exit(1);
});
