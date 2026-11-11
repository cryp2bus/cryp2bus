import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/demo/DemoChrome';
import { useDemo } from '@/components/demo/DemoProvider';
import { SAMPLE_ACTIVITY } from '@/lib/demo/config';
import { formatWhen } from '@/lib/demo/format';

export default function Transactions() {
  const { user } = useDemo();
  const [sample, setSample] = useState(false);
  if (!user) return null;

  const empty = user.transactions.length === 0 && !sample;

  return (
    <div className="space-y-6">
      <PageHeading
        title="Transactions"
        subtitle="Live history is empty because no funds move in this demo."
        action={
          <Button type="button" variant="outline" size="sm" onClick={() => setSample((value) => !value)}>
            {sample ? 'Hide sample activity' : 'Preview sample activity'}
          </Button>
        }
      />
      {empty ? (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="font-medium">No transactions</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Deposit and withdrawal requests appear here after the account is approved. They stay marked as not sent.
          </p>
        </div>
      ) : (
        <div className="glass overflow-x-auto rounded-2xl">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Detail</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {sample
                ? SAMPLE_ACTIVITY.map((row) => (
                    <tr key={row.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 text-muted-foreground">Sample</td>
                      <td className="px-4 py-3">{row.kind}</td>
                      <td className="px-4 py-3">{row.detail}</td>
                      <td className="px-4 py-3 font-mono">{row.amount}</td>
                      <td className="px-4 py-3 text-muted-foreground">Sample</td>
                    </tr>
                  ))
                : null}
              {user.transactions.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-muted-foreground">{formatWhen(row.createdAt)}</td>
                  <td className="px-4 py-3">{row.direction === 'withdraw' ? 'Withdrawal' : 'Deposit'}</td>
                  <td className="px-4 py-3">
                    {row.reference} · {row.method}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {row.amount} {row.asset}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">Not sent · demo</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
