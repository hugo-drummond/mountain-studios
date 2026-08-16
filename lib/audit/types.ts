export type Bucket = 'red' | 'amber' | 'green';

export type CheckOk<T> = { status: 'ok' } & T;
export type CheckError = {
  status: 'error';
  reason: 'timeout' | 'rate_limit' | 'api_error' | 'unreachable' | 'blocked';
  detail: string;
  headline: string;
  body: string;
};

export type SslResult =
  | CheckOk<{ pass: boolean; code: string | null; headline: string; body: string }>
  | CheckError;

export const SECURITY_HEADERS = [
  'strict-transport-security',
  'x-content-type-options',
  'x-frame-options',
  'content-security-policy',
  'referrer-policy',
] as const;
export type SecurityHeader = (typeof SECURITY_HEADERS)[number];

export type HeadersResult =
  | CheckOk<{
      present: SecurityHeader[];
      missing: SecurityHeader[];
      bucket: Bucket;
      headline: string;
      body: string;
      missingDetail: string[];
    }>
  | CheckError;

export type PsiResult =
  | CheckOk<{
      score: number;            // 0-100
      bucket: Bucket;
      screenshot: string | null; // data URI, mobile only
      headline: string;
      body: string;
    }>
  | CheckError;

export type AccessibilityResult =
  | CheckOk<{
      score: number;
      bucket: Bucket;
      failures: string[];
      headline: string;
      body: string;
    }>
  | CheckError;

export type AuditReport = {
  version: 1;
  ranAt: string;
  url: string;
  checks: {
    ssl: SslResult;
    headers: HeadersResult;
    mobile: PsiResult;
    desktop: PsiResult;
    accessibility: AccessibilityResult;
  };
  summary: { completed: number; failed: number; overall: 'done' | 'partial' | 'failed' };
};
