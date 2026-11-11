import { useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { BRAND, CONTACT_EMAIL, LEGAL, STATUS_META } from '@/lib/demo/config';

const SITE_TITLE = 'Cryptobus — The B2B Crypto Exchange';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} · ${BRAND}`;
  }, [title]);
}

export function DemoNoIndex() {
  useLayoutEffect(() => {
    const existing = document.querySelector('meta[name="robots"]');
    const previous = existing?.getAttribute('content') ?? 'index,follow';
    let element = existing;
    let created = false;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('name', 'robots');
      document.head.appendChild(element);
      created = true;
    }
    element.setAttribute('content', 'noindex');
    return () => {
      if (created) element.remove();
      else element.setAttribute('content', previous);
      if (document.title.includes(BRAND)) document.title = SITE_TITLE;
    };
  }, []);

  return null;
}

export function DemoLogo({ to = '/test' }) {
  return (
    <Link to={to} className="flex items-center gap-2.5 min-w-0">
      <span className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-electric to-teal flex items-center justify-center shrink-0">
        <span className="absolute inset-0.5 rounded-md bg-graphite flex items-center justify-center font-display font-bold text-sm text-electric">
          C
        </span>
      </span>
      <span className="font-display text-lg font-bold tracking-tight truncate">{BRAND}</span>
    </Link>
  );
}

export function DemoFooter() {
  return (
    <footer className="px-4 py-6 text-center text-xs text-muted-foreground space-y-2">
      <p>Demo mode. Data stays in this browser. No payments or compliance checks are performed.</p>
      <p>
        <a className="text-electric hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="mx-auto max-w-3xl leading-relaxed">{LEGAL.disclosure}</p>
    </footer>
  );
}

export function DemoBanner() {
  return (
    <div className="rounded-xl border border-electric/30 bg-electric/10 px-4 py-3 text-sm leading-relaxed">
      <span className="font-semibold">Demo mode.</span> Accounts, documents, and requests stay in this
      browser. KYB checks, deposits, withdrawals, and trades are not connected.
    </div>
  );
}

const STATUS_CLASS = {
  pending_onboarding: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
  under_review: 'border-electric/40 bg-electric/10 text-electric',
  approved: 'border-success/40 bg-success/10 text-success',
  rejected: 'border-destructive/40 bg-destructive/10 text-destructive',
};

export function StatusBadge({ status }) {
  const meta = STATUS_META[status] || { label: status };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
        STATUS_CLASS[status] || 'border-border text-muted-foreground'
      }`}
    >
      {meta.label}
    </span>
  );
}

export function PageHeading({ title, subtitle, action }) {
  usePageTitle(title);
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-1 max-w-2xl text-sm text-muted-foreground leading-relaxed">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function FormError({ message }) {
  if (!message) return null;
  return (
    <div role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
      {message}
    </div>
  );
}
