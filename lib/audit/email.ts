import type { AuditReport } from './types';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getHostname(url: string): string {
  try {
    const parsed = new URL(url);
    let hostname = parsed.hostname || '';
    if (hostname.startsWith('www.')) {
      hostname = hostname.slice(4);
    }
    return hostname;
  } catch {
    return url;
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getUTCDate();
  const month = date.toLocaleString('en-ZA', { month: 'long', timeZone: 'UTC' });
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

function renderScoreBand(score: number): string {
  const filled = Math.round(score / 10);
  const cells = Array.from({ length: 10 }, (_, i) => {
    const bg = i < filled ? '#000000' : '#DDDDDD';
    return `<td style="height:8px;width:24px;border-radius:2px;background:${bg};"></td>`;
  });

  return `<table cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:3px 0;display:inline-block;margin-right:16px;vertical-align:middle;">
    <tr>${cells.join('')}</tr>
  </table>`;
}

export function renderAuditEmail(report: AuditReport): { subject: string; html: string } {
  const hostname = escapeHtml(getHostname(report.url));
  const dateFormatted = formatDate(report.ranAt);

  // Build preheader
  let preheaderParts: string[] = [];

  const sslCheck = report.checks.ssl;
  if (sslCheck.status === 'ok') {
    preheaderParts.push((sslCheck as any).pass ? 'SSL OK' : 'SSL problem');
  }

  const headersCheck = report.checks.headers;
  if (headersCheck.status === 'ok') {
    preheaderParts.push(`${(headersCheck as any).present.length} of 5 headers`);
  }

  const mobileCheck = report.checks.mobile;
  if (mobileCheck.status === 'ok') {
    preheaderParts.push(`Mobile ${(mobileCheck as any).score}`);
  }

  const desktopCheck = report.checks.desktop;
  if (desktopCheck.status === 'ok') {
    preheaderParts.push(`Desktop ${(desktopCheck as any).score}`);
  }

  const preheader = preheaderParts.join(' · ');

  // Build the ledger rows
  let ledgerHtml = '';

  // SSL Row
  ledgerHtml += buildCheckRow(sslCheck, 'ENCRYPTION', getVerdictChip(sslCheck));

  // Headers Row
  ledgerHtml += buildHeadersRow(headersCheck as any, 'BROWSER PROTECTION');

  // Mobile Row
  ledgerHtml += buildSpeedRow(mobileCheck as any, 'SPEED — MOBILE');

  // Desktop Row
  ledgerHtml += buildSpeedRow(desktopCheck as any, 'SPEED — DESKTOP');

  // Accessibility Row
  ledgerHtml += buildAccessibilityRow(report.checks.accessibility as any, 'ACCESSIBILITY');

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;margin:0;padding:0;background:#FFFFFF;">
  <span style="display:none;font-size:1px;color:#FFFFFF;max-height:0;overflow:hidden;">${escapeHtml(preheader)}</span>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#FFFFFF;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:600px;background:#FFFFFF;">
          <!-- Header Block -->
          <tr>
            <td style="padding:32px 24px;background:#FFFFFF;">
              <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#666666;margin:0 0 12px;">Website Audit</p>
              <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:28px;color:#000000;margin:0 0 8px;font-weight:400;">${hostname}</h1>
              <p style="font-size:13px;color:#666666;margin:0;">Checked ${escapeHtml(dateFormatted)}</p>
            </td>
          </tr>

          <!-- Ledger -->
          <tr>
            <td style="padding:0;">
              ${ledgerHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 24px;border-top:1px solid #DDDDDD;">
              <p style="font-size:14px;color:#000000;margin:0 0 12px;">Reply to this email and we'll walk you through any of it.</p>
              <p style="font-size:13px;color:#666666;margin:0;">Mountain Studios · mountainstudios.co.za</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return {
    subject: `Your website audit — ${hostname}`,
    html,
  };
}

function buildCheckRow(check: any, label: string, verdictHtml: string): string {
  if (check.status === 'error') {
    return `<div style="padding:24px;border-top:1px solid #DDDDDD;">
      <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#666666;margin:0 0 8px;">${label}</p>
      <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;color:#000000;margin:0 0 8px;font-weight:400;">${escapeHtml(check.headline)}</h2>
      <p style="font-size:14px;line-height:1.6;color:#666666;margin:0 0 12px;">${escapeHtml(check.body)}</p>
      ${verdictHtml}
    </div>`;
  }

  return `<div style="padding:24px;border-top:1px solid #DDDDDD;">
    <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#666666;margin:0 0 8px;">${label}</p>
    <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;color:#000000;margin:0 0 8px;font-weight:400;">${escapeHtml(check.headline)}</h2>
    <p style="font-size:14px;line-height:1.6;color:#666666;margin:0 0 12px;">${escapeHtml(check.body)}</p>
    ${verdictHtml}
  </div>`;
}

function buildHeadersRow(check: any, label: string): string {
  let verdictChip = '';
  let missingList = '';

  if (check.status === 'ok') {
    const count = check.present.length;
    verdictChip = `<p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#000000;margin:12px 0 0;">${count} OF 5 PRESENT</p>`;

    if (check.missing.length > 0) {
      missingList = `<div style="margin-top:12px;">` +
        check.missingDetail.map((detail: string) =>
          `<div style="font-size:13px;color:#666666;margin:4px 0;">– ${escapeHtml(detail)}</div>`
        ).join('') +
        `</div>`;
    }
  } else {
    verdictChip = `<p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#666666;margin:12px 0 0;">NOT CHECKED</p>`;
  }

  return `<div style="padding:24px;border-top:1px solid #DDDDDD;">
    <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#666666;margin:0 0 8px;">${label}</p>
    <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;color:#000000;margin:0 0 8px;font-weight:400;">${escapeHtml(check.headline)}</h2>
    <p style="font-size:14px;line-height:1.6;color:#666666;margin:0 0 12px;">${escapeHtml(check.body)}</p>
    ${verdictChip}
    ${missingList}
  </div>`;
}

function buildSpeedRow(check: any, label: string): string {
  let content = '';

  if (check.status === 'ok') {
    const score = check.score;
    const band = renderScoreBand(score);

    content = `<div style="padding:24px;border-top:1px solid #DDDDDD;">
      <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#666666;margin:0 0 8px;">${label}</p>
      <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;color:#000000;margin:0 0 16px;font-weight:400;">${escapeHtml(check.headline)}</h2>
      <p style="font-size:14px;line-height:1.6;color:#666666;margin:0 0 16px;">${escapeHtml(check.body)}</p>
      <div>
        ${band}
        <span style="display:inline-block;font-family:Georgia,'Times New Roman',serif;font-size:40px;color:#000000;vertical-align:middle;margin-right:4px;">${score}</span><span style="display:inline-block;font-size:13px;color:#666666;vertical-align:middle;">/100</span>
      </div>
    </div>`;
  } else {
    content = `<div style="padding:24px;border-top:1px solid #DDDDDD;">
      <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#666666;margin:0 0 8px;">${label}</p>
      <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;color:#000000;margin:0 0 8px;font-weight:400;">${escapeHtml(check.headline)}</h2>
      <p style="font-size:14px;line-height:1.6;color:#666666;margin:0 0 12px;">${escapeHtml(check.body)}</p>
      <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#666666;margin:12px 0 0;">NOT CHECKED</p>
    </div>`;
  }

  return content;
}

function getVerdictChip(check: any): string {
  if (check.status === 'error') {
    return `<p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#666666;margin:12px 0 0;">NOT CHECKED</p>`;
  }

  if (check.pass !== undefined) {
    const text = check.pass ? 'SECURE' : 'NOT SECURE';
    return `<p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#000000;margin:12px 0 0;">${text}</p>`;
  }

  return '';
}

function buildAccessibilityRow(check: any, label: string): string {
  let content = '';

  if (check.status === 'ok') {
    const score = check.score;
    const band = renderScoreBand(score);
    let failuresList = '';

    if (check.failures && check.failures.length > 0) {
      failuresList = `<div style="margin-top:12px;">` +
        check.failures.map((failure: string) =>
          `<div style="font-size:13px;color:#666666;margin:4px 0;">– ${escapeHtml(failure)}</div>`
        ).join('') +
        `</div>`;
    }

    content = `<div style="padding:24px;border-top:1px solid #DDDDDD;">
      <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#666666;margin:0 0 8px;">${label}</p>
      <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;color:#000000;margin:0 0 16px;font-weight:400;">${escapeHtml(check.headline)}</h2>
      <p style="font-size:14px;line-height:1.6;color:#666666;margin:0 0 16px;">${escapeHtml(check.body)}</p>
      <div>
        ${band}
        <span style="display:inline-block;font-family:Georgia,'Times New Roman',serif;font-size:40px;color:#000000;vertical-align:middle;margin-right:4px;">${score}</span><span style="display:inline-block;font-size:13px;color:#666666;vertical-align:middle;">/100</span>
      </div>
      ${failuresList}
    </div>`;
  } else {
    content = `<div style="padding:24px;border-top:1px solid #DDDDDD;">
      <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#666666;margin:0 0 8px;">${label}</p>
      <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;color:#000000;margin:0 0 8px;font-weight:400;">${escapeHtml(check.headline)}</h2>
      <p style="font-size:14px;line-height:1.6;color:#666666;margin:0 0 12px;">${escapeHtml(check.body)}</p>
      <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#666666;margin:12px 0 0;">NOT CHECKED</p>
    </div>`;
  }

  return content;
}

// ---------------------------------------------------------------------------
// The covering note that carries the PDF.
//
// When the report renders, the PDF *is* the deliverable — repeating every score
// in the email body gives the reader the same thing twice and makes the
// attachment look redundant. renderAuditEmail() above stays as the fallback for
// when the render fails: in that case the written version is all they get, so
// it must still stand on its own.
// ---------------------------------------------------------------------------
export function renderAuditCoverEmail(
  report: AuditReport,
  businessName: string,
): { subject: string; html: string } {
  const hostname = getHostname(report.url);
  const name = escapeHtml(businessName || hostname);

  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#F4F2FA;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your website audit for ${escapeHtml(hostname)} is attached.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F2FA;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border-radius:12px;overflow:hidden;">
        <tr><td style="padding:32px 32px 8px;">
          <p style="font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7d3d4f;margin:0 0 12px;">Your free website audit</p>
          <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:400;color:#20263a;margin:0 0 16px;">${name}</h1>
          <p style="font-size:15px;line-height:1.65;color:#3a3f4d;margin:0 0 16px;">
            Your report is attached as a PDF. It covers five checks — page speed on mobile and desktop, encryption, browser protection, and how easy your site is to use for people with poor eyesight or colour blindness.
          </p>
          <p style="font-size:15px;line-height:1.65;color:#3a3f4d;margin:0 0 24px;">
            Everything in it is measured, not guessed. If anything needs explaining, reply to this email and a person will answer.
          </p>
          <a href="${escapeHtml(process.env.CALENDLY_URL || 'https://calendly.com/hugodrum6/30min')}" style="display:inline-block;background:#7d3d4f;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;padding:14px 28px;border-radius:999px;">Book a free 15-min call</a>
        </td></tr>
        <tr><td style="padding:24px 32px 32px;">
          <p style="font-size:12px;line-height:1.6;color:#8a90a0;margin:0;">
            Mountain Studios &middot; ${escapeHtml(formatDate(report.ranAt))}
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject: `Your website audit — ${hostname}`, html };
}
