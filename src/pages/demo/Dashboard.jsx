import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PageHeading, StatusBadge } from '@/components/demo/DemoChrome';
import { useDemo } from '@/components/demo/DemoProvider';
import { ACCOUNT_STATUS, QUOTE_STATUSES, SAMPLE_BALANCES, STATUS_META, ZERO_BALANCES } from '@/lib/demo/config';
import { formatWhen } from '@/lib/demo/format';

export default function Dashboard() {
  const { user } = useDemo();
  const [sample, setSample] = useState(false);
  if (!user) return null;

  const balances = sample ? SAMPLE_BALANCES : ZERO_BALANCES;
  const recent = user.quotes.slice(0, 3);
  const profileDone = Boolean(user.onboardingSubmittedAt) || user.accountStatus !== ACCOUNT_STATUS.pending_onboarding;
  const decided = user.accountStatus === ACCOUNT_STATUS.approved || user.accountStatus === ACCOUNT_STATUS.rejected;

  const steps = [
    { label: 'Account created', detail: formatWhen(user.createdAt), done: true },
    {
      label: 'Company profile',
      detail: profileDone ? 'Submitted' : 'Still to complete',
      done: profileDone,
    },
    {
      label: 'Review',
      detail:
        user.accountStatus === ACCOUNT_STATUS.under_review
          ? 'In progress'
          : decided
            ? 'Finished'
            : profileDone
              ? 'Queued after submit'
              : 'Waiting for the profile',
      done: decided,
      current: user.accountStatus === ACCOUNT_STATUS.under_review,
    },
    {
      label: 'Decision',
      detail: decided ? STATUS_META[user.accountStatus].label : 'Not decided',
      done: decided,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeading
        title="Overview"
        subtitle={STATUS_META[user.accountStatus]?.summary}
        action={
          <Button asChild className="font-semibold">
            <Link to="/test/cabinet/quotes/new">Request a quote</Link>
          </Button>
        }
      />

      <section className="glass rounded-2xl p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-medium">Account status</h2>
          <StatusBadge status={user.accountStatus} />
        </div>
        {user.accountStatus === ACCOUNT_STATUS.rejected && user.rejectionNote ? (
          <p className="mt-3 text-sm text-destructive">{user.rejectionNote}</p>
        ) : null}
        {user.accountStatus === ACCOUNT_STATUS.under_review ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Demo tools in the sidebar can mark this account approved or rejected.
          </p>
        ) : null}
        <ol className="mt-5 space-y-3">
          {steps.map((step, index) => (
            <li key={step.label} className="flex gap-3">
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  step.done
                    ? 'bg-success text-graphite'
                    : step.current
                      ? 'bg-electric text-graphite'
                      : 'border border-border text-muted-foreground'
                }`}
              >
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-medium">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        {user.accountStatus === ACCOUNT_STATUS.pending_onboarding ? (
          <Button asChild className="mt-5 font-semibold">
            <Link to="/test/onboarding">Continue onboarding</Link>
          </Button>
        ) : null}
        {user.accountStatus === ACCOUNT_STATUS.rejected ? (
          <Button asChild variant="outline" className="mt-5">
            <Link to="/test/onboarding">Update the application</Link>
          </Button>
        ) : null}
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-medium">Balances</h2>
          <Button type="button" variant="outline" size="sm" onClick={() => setSample((value) => !value)}>
            {sample ? 'Show zero balances' : 'Show sample balances'}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {sample
            ? 'Sample figures for layout only. They are not this account and no funds are held.'
            : 'Demo balances. No funds are held.'}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {balances.map((item) => (
            <div key={item.asset} className="glass rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.asset}</p>
              <p className="mt-2 font-mono text-xl">{item.value}</p>
              {sample ? <p className="mt-2 text-[11px] uppercase tracking-wide text-muted-foreground">Sample</p> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="glass rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-medium">Recent OTC requests</h2>
          <Link className="text-sm text-electric hover:underline" to="/test/cabinet/quotes">
            View all
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No requests yet. A quote is saved on this device only.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {recent.map((quote) => (
              <li key={quote.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                <div>
                  <p className="font-medium">{quote.reference}</p>
                  <p className="text-muted-foreground">
                    {quote.side === 'buy' ? 'Buy' : 'Sell'} {quote.amount} {quote.asset}
                  </p>
                </div>
                <span className="text-muted-foreground">{QUOTE_STATUSES[quote.status] || quote.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
