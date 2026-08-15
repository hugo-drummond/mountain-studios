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

function getVerdictColour(bucket: 'red' | 'amber' | 'green'): string {
  switch (bucket) {
    case 'green': return '#2E6F5E';
    case 'amber': return '#B8791F';
    case 'red': return '#A8362F';
  }
}

function renderScoreBand(score: number): string {
  const filled = Math.round(score / 10);
  const cells = Array.from({ length: 10 }, (_, i) => {
    const bg = i < filled ? getVerdictColour('green') : '#E6E1EA';
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
    preheaderParts.push('SSL OK');
  } else if (sslCheck.status !== 'error') {
    preheaderParts.push('SSL Problem');
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

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    .preheader { display: none; font-size: 1px; color: #FBFAFC; max-height: 0; overflow: hidden; }
  </style>
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;margin:0;padding:0;background:#FBFAFC;">
  <span class="preheader">${escapeHtml(preheader)}</span>

  <div style="max-width:600px;margin:0 auto;background:#FBFAFC;">
    <!-- Header Block -->
    <div style="padding:32px 24px;background:#FBFAFC;">
      <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6B6570;margin:0 0 12px;">Website Audit</p>
      <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:28px;color:#14121A;margin:0 0 8px;font-weight:400;">${hostname}</h1>
      <p style="font-size:13px;color:#6B6570;margin:0;">Checked ${escapeHtml(dateFormatted)}</p>
    </div>

    <!-- Ledger -->
    ${ledgerHtml}

    <!-- Footer -->
    <div style="padding:32px 24px;border-top:1px solid #E6E1EA;">
      <p style="font-size:14px;color:#14121A;margin:0 0 12px;">Reply to this email and we'll walk you through any of it.</p>
      <p style="font-size:13px;color:#6B6570;margin:0;">Mountain Studios · mountainstudios.co.za</p>
    </div>
  </div>
</body>
</html>`;

  return {
    subject: `Your website audit — ${hostname}`,
    html,
  };
}

function buildCheckRow(check: any, label: string, verdictHtml: string): string {
  if (check.status === 'error') {
    return `<div style="padding:24px;border-top:1px solid #E6E1EA;">
      <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6B6570;margin:0 0 8px;">${label}</p>
      <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;color:#14121A;margin:0 0 8px;font-weight:400;">${escapeHtml(check.headline)}</h2>
      <p style="font-size:14px;line-height:1.6;color:#6B6570;margin:0 0 12px;">${escapeHtml(check.body)}</p>
      ${verdictHtml}
    </div>`;
  }

  return `<div style="padding:24px;border-top:1px solid #E6E1EA;">
    <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6B6570;margin:0 0 8px;">${label}</p>
    <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;color:#14121A;margin:0 0 8px;font-weight:400;">${escapeHtml(check.headline)}</h2>
    <p style="font-size:14px;line-height:1.6;color:#6B6570;margin:0 0 12px;">${escapeHtml(check.body)}</p>
    ${verdictHtml}
  </div>`;
}

function buildHeadersRow(check: any, label: string): string {
  let verdictChip = '';
  let missingList = '';

  if (check.status === 'ok') {
    const count = check.present.length;
    const bucket = check.bucket;
    const colour = getVerdictColour(bucket);
    verdictChip = `<span style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:white;background:${colour};border-radius:4px;padding:4px 10px;">${count} OF 5 PRESENT</span>`;

    if (check.missing.length > 0) {
      missingList = `<div style="margin-top:12px;">` +
        check.missingDetail.map((detail: string) =>
          `<div style="font-size:13px;color:#6B6570;margin:4px 0;">– ${escapeHtml(detail)}</div>`
        ).join('') +
        `</div>`;
    }
  } else {
    verdictChip = `<span style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:white;background:#8C8792;border-radius:4px;padding:4px 10px;">NOT CHECKED</span>`;
  }

  return `<div style="padding:24px;border-top:1px solid #E6E1EA;">
    <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6B6570;margin:0 0 8px;">${label}</p>
    <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;color:#14121A;margin:0 0 8px;font-weight:400;">${escapeHtml(check.headline)}</h2>
    <p style="font-size:14px;line-height:1.6;color:#6B6570;margin:0 0 12px;">${escapeHtml(check.body)}</p>
    ${verdictChip}
    ${missingList}
  </div>`;
}

function buildSpeedRow(check: any, label: string): string {
  let content = '';

  if (check.status === 'ok') {
    const score = check.score;
    const colour = getVerdictColour(check.bucket);
    const verdictChip = `<span style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:white;background:${colour};border-radius:4px;padding:4px 10px;">${score} / 100</span>`;
    const band = renderScoreBand(score);

    content = `<div style="padding:24px;border-top:1px solid #E6E1EA;">
      <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6B6570;margin:0 0 8px;">${label}</p>
      <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;color:#14121A;margin:0 0 16px;font-weight:400;">${escapeHtml(check.headline)}</h2>
      <p style="font-size:14px;line-height:1.6;color:#6B6570;margin:0 0 16px;">${escapeHtml(check.body)}</p>
      <div>
        ${band}
        <span style="display:inline-block;font-family:Georgia,'Times New Roman',serif;font-size:40px;color:${colour};vertical-align:middle;margin-right:4px;">${score}</span><span style="display:inline-block;font-size:13px;color:#6B6570;vertical-align:middle;">/100</span>
      </div>
      <div style="margin-top:12px;">
        ${verdictChip}
      </div>
    </div>`;
  } else {
    content = `<div style="padding:24px;border-top:1px solid #E6E1EA;">
      <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6B6570;margin:0 0 8px;">${label}</p>
      <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;color:#14121A;margin:0 0 8px;font-weight:400;">${escapeHtml(check.headline)}</h2>
      <p style="font-size:14px;line-height:1.6;color:#6B6570;margin:0 0 12px;">${escapeHtml(check.body)}</p>
      <span style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:white;background:#8C8792;border-radius:4px;padding:4px 10px;">NOT CHECKED</span>
    </div>`;
  }

  return content;
}

function getVerdictChip(check: any): string {
  if (check.status === 'error') {
    return `<span style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:white;background:#8C8792;border-radius:4px;padding:4px 10px;">NOT CHECKED</span>`;
  }

  if (check.pass !== undefined) {
    const colour = check.pass ? '#2E6F5E' : '#A8362F';
    const text = check.pass ? 'SECURE' : 'NOT SECURE';
    return `<span style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:white;background:${colour};border-radius:4px;padding:4px 10px;">${text}</span>`;
  }

  return '';
}
