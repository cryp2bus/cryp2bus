import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormError, PageHeading } from '@/components/demo/DemoChrome';
import { Field, SelectInput, TextInput } from '@/components/demo/Fields';
import { useDemo } from '@/components/demo/DemoProvider';
import { ACCOUNT_STATUS, MOVEMENT_ASSETS, SETTLEMENTS } from '@/lib/demo/config';
import { formatWhen } from '@/lib/demo/format';
import { hasErrors, movementFieldErrors } from '@/lib/demo/validate';

const COPY = {
  deposit: {
    title: 'Deposit',
    subtitle: 'Tell the cabinet how funds would arrive. Nothing is credited.',
    action: 'Request deposit',
    destination: false,
  },
  withdraw: {
    title: 'Withdraw',
    subtitle: 'Tell the cabinet where funds would be sent. Nothing is paid out.',
    action: 'Request withdrawal',
    destination: true,
  },
};

function MovementForm({ direction }) {
  const { user, createMovement } = useDemo();
  const copy = COPY[direction];
  const approved = user?.accountStatus === ACCOUNT_STATUS.approved;
  const [form, setForm] = useState({
    asset: 'EUR',
    amount: '',
    method: 'SEPA',
    destination: '',
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');
  const [pending, setPending] = useState(false);

  if (!user) return null;

  const rows = user.transactions.filter((item) => item.direction === direction);
  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setNotice('');
    if (!approved) {
      setFormError('Available after account approval.');
      return;
    }
    const nextErrors = movementFieldErrors({ ...form, direction });
    setErrors(nextErrors);
    setFormError('');
    if (hasErrors(nextErrors)) return;
    setPending(true);
    const result = await createMovement({ ...form, direction });
    setPending(false);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    setNotice('Saved on this device. No funds moved.');
    setForm({ asset: 'EUR', amount: '', method: 'SEPA', destination: '' });
  };

  return (
    <div className="space-y-6">
      <PageHeading title={copy.title} subtitle={copy.subtitle} />
      <form className="glass rounded-2xl p-6 sm:p-8 space-y-4" noValidate onSubmit={submit}>
        <FormError message={formError} />
        {notice ? (
          <p role="status" className="rounded-lg border border-electric/30 bg-electric/10 px-3 py-2 text-sm">
            {notice}
          </p>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id={`${direction}-asset`} label="Asset" error={errors.asset}>
            <SelectInput
              id={`${direction}-asset`}
              value={form.asset}
              error={errors.asset}
              disabled={!approved}
              onChange={set('asset')}
            >
              {MOVEMENT_ASSETS.map((asset) => (
                <option key={asset} value={asset}>
                  {asset}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field id={`${direction}-amount`} label="Amount" error={errors.amount}>
            <TextInput
              id={`${direction}-amount`}
              inputMode="decimal"
              value={form.amount}
              error={errors.amount}
              disabled={!approved}
              onChange={set('amount')}
            />
          </Field>
          <Field id={`${direction}-method`} label="Method" error={errors.method}>
            <SelectInput
              id={`${direction}-method`}
              value={form.method}
              error={errors.method}
              disabled={!approved}
              onChange={set('method')}
            >
              {SETTLEMENTS.map((method) => (
                <option key={method} value={method}>
                  {method === 'Crypto' ? 'Crypto transfer' : method}
                </option>
              ))}
            </SelectInput>
          </Field>
          {copy.destination ? (
            <Field id={`${direction}-destination`} label="Destination" error={errors.destination} hint="IBAN or wallet address.">
              <TextInput
                id={`${direction}-destination`}
                value={form.destination}
                error={errors.destination}
                disabled={!approved}
                onChange={set('destination')}
              />
            </Field>
          ) : null}
        </div>
        <div className="flex flex-col items-start gap-2">
          <Button type="submit" className="font-semibold" disabled={!approved || pending}>
            {copy.action}
          </Button>
          {approved ? (
            <p className="text-sm text-muted-foreground">Demo only. This request stays on this device and no funds move.</p>
          ) : (
            <p className="text-sm text-muted-foreground">Available after account approval.</p>
          )}
        </div>
      </form>

      <section className="space-y-3">
        <h2 className="font-medium">Requests on this device</h2>
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">None yet.</p>
        ) : (
          <ul className="glass divide-y divide-border rounded-2xl">
            {rows.map((row) => (
              <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
                <div>
                  <p className="font-medium">
                    {row.reference} · {row.amount} {row.asset}
                  </p>
                  <p className="text-muted-foreground">
                    {row.method}
                    {row.destination ? ` · ${row.destination}` : ''} · {formatWhen(row.createdAt)}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">Not sent · demo</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export function DepositPage() {
  return <MovementForm direction="deposit" />;
}

export function WithdrawPage() {
  return <MovementForm direction="withdraw" />;
}
