import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FormError, PageHeading } from '@/components/demo/DemoChrome';
import { Field, SelectInput, TextArea, TextInput } from '@/components/demo/Fields';
import { useDemo } from '@/components/demo/DemoProvider';
import { ASSETS, FIAT, QUOTE_STATUSES, SETTLEMENTS } from '@/lib/demo/config';
import { formatWhen } from '@/lib/demo/format';
import { hasErrors, quoteFieldErrors } from '@/lib/demo/validate';

const EMPTY = {
  side: 'buy',
  asset: 'BTC',
  amount: '',
  currency: 'EUR',
  settlement: 'SEPA',
  notes: '',
};

export function Quotes() {
  const { user, setQuoteStatus } = useDemo();
  if (!user) return null;

  return (
    <div className="space-y-6">
      <PageHeading
        title="OTC requests"
        subtitle="Requests are saved on this device. They are not sent to a trading desk."
        action={
          <Button asChild className="font-semibold">
            <Link to="/test/cabinet/quotes/new">New request</Link>
          </Button>
        }
      />
      {user.quotes.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="font-medium">No OTC requests yet</p>
          <p className="mt-2 text-sm text-muted-foreground">Ask for a buy or sell quote. The record stays in this browser.</p>
          <Button asChild className="mt-5 font-semibold">
            <Link to="/test/cabinet/quotes/new">Request a quote</Link>
          </Button>
        </div>
      ) : (
        <ul className="space-y-3">
          {user.quotes.map((quote) => (
            <li key={quote.id} className="glass rounded-2xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{quote.reference}</p>
                  <p className="text-sm text-muted-foreground">{formatWhen(quote.createdAt)}</p>
                </div>
                <span className="rounded-full border border-border px-2.5 py-0.5 text-xs">
                  {QUOTE_STATUSES[quote.status] || quote.status}
                </span>
              </div>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <dt className="text-muted-foreground">Side</dt>
                  <dd>{quote.side === 'buy' ? 'Buy' : 'Sell'}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Amount</dt>
                  <dd>
                    {quote.amount} {quote.asset}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Against</dt>
                  <dd>{quote.currency}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Settlement</dt>
                  <dd>{quote.settlement}</dd>
                </div>
              </dl>
              {quote.notes ? <p className="mt-3 text-sm text-muted-foreground">{quote.notes}</p> : null}
              <details className="mt-4 rounded-lg border border-dashed border-border px-3 py-2">
                <summary className="cursor-pointer text-sm text-muted-foreground">Demo: set status</summary>
                <label className="mt-3 block text-xs text-muted-foreground" htmlFor={`quote-status-${quote.id}`}>
                  Status on this device
                  <SelectInput
                    id={`quote-status-${quote.id}`}
                    className="mt-1"
                    value={quote.status}
                    onChange={(event) => setQuoteStatus(quote.id, event.target.value)}
                  >
                    {Object.entries(QUOTE_STATUSES).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </SelectInput>
                </label>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function NewQuote() {
  const { createQuote } = useDemo();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [pending, setPending] = useState(false);

  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = quoteFieldErrors(form);
    setErrors(nextErrors);
    setFormError('');
    if (hasErrors(nextErrors)) return;
    setPending(true);
    const result = await createQuote(form);
    setPending(false);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    navigate('/test/cabinet/quotes');
  };

  return (
    <div className="space-y-6">
      <PageHeading
        title="Request a quote"
        subtitle="Tell the desk what you want to buy or sell. This demo stores the request locally and does not price it."
      />
      <form className="glass rounded-2xl p-6 sm:p-8 space-y-4" noValidate onSubmit={submit}>
        <FormError message={formError} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="side" label="Side" error={errors.side}>
            <SelectInput id="side" value={form.side} error={errors.side} onChange={set('side')}>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </SelectInput>
          </Field>
          <Field id="asset" label="Asset" error={errors.asset}>
            <SelectInput id="asset" value={form.asset} error={errors.asset} onChange={set('asset')}>
              {ASSETS.map((asset) => (
                <option key={asset} value={asset}>
                  {asset}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field id="amount" label="Amount" error={errors.amount}>
            <TextInput id="amount" inputMode="decimal" value={form.amount} error={errors.amount} onChange={set('amount')} />
          </Field>
          <Field id="currency" label="Against" error={errors.currency}>
            <SelectInput id="currency" value={form.currency} error={errors.currency} onChange={set('currency')}>
              {FIAT.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field id="settlement" label="Settlement" error={errors.settlement}>
            <SelectInput id="settlement" value={form.settlement} error={errors.settlement} onChange={set('settlement')}>
              {SETTLEMENTS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </SelectInput>
          </Field>
        </div>
        <Field id="notes" label="Notes" hint="Optional. For example a preferred value date.">
          <TextArea id="notes" value={form.notes} onChange={set('notes')} />
        </Field>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" className="font-semibold" disabled={pending}>
            {pending ? 'Saving…' : 'Save request'}
          </Button>
          <Button asChild variant="ghost">
            <Link to="/test/cabinet/quotes">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
