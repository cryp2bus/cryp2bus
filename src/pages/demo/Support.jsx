import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormError, PageHeading } from '@/components/demo/DemoChrome';
import { Field, TextArea, TextInput } from '@/components/demo/Fields';
import { useDemo } from '@/components/demo/DemoProvider';
import { CONTACT_EMAIL } from '@/lib/demo/config';
import { formatWhen } from '@/lib/demo/format';
import { hasErrors, ticketFieldErrors } from '@/lib/demo/validate';

export default function Support() {
  const { user, createTicket } = useDemo();
  const [form, setForm] = useState({ subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [pending, setPending] = useState(false);

  if (!user) return null;

  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = ticketFieldErrors(form);
    setErrors(nextErrors);
    setFormError('');
    if (hasErrors(nextErrors)) return;
    setPending(true);
    const result = await createTicket(form);
    setPending(false);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    setForm({ subject: '', message: '' });
  };

  return (
    <div className="space-y-6">
      <PageHeading
        title="Support"
        subtitle="For a real enquiry, email the corporate desk. Messages typed here stay on this device and are not sent."
      />
      <section className="glass rounded-2xl p-6">
        <p className="text-sm text-muted-foreground">Corporate desk</p>
        <a className="mt-1 inline-block text-lg font-medium text-electric hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        <p className="mt-2 text-sm text-muted-foreground">Replies are sent on business days.</p>
      </section>
      <form className="glass rounded-2xl p-6 space-y-4" noValidate onSubmit={submit}>
        <h2 className="font-medium">Message draft</h2>
        <FormError message={formError} />
        <Field id="support-email" label="From">
          <TextInput id="support-email" value={user.email} disabled />
        </Field>
        <Field id="subject" label="Subject" error={errors.subject}>
          <TextInput id="subject" value={form.subject} error={errors.subject} onChange={set('subject')} />
        </Field>
        <Field id="message" label="Message" error={errors.message}>
          <TextArea id="message" value={form.message} error={errors.message} onChange={set('message')} />
        </Field>
        <Button type="submit" className="font-semibold" disabled={pending}>
          {pending ? 'Saving…' : 'Save draft'}
        </Button>
      </form>
      <section className="space-y-3">
        <h2 className="font-medium">Saved on this device</h2>
        {user.tickets.length === 0 ? (
          <p className="text-sm text-muted-foreground">No drafts yet.</p>
        ) : (
          <ul className="space-y-3">
            {user.tickets.map((ticket) => (
              <li key={ticket.id} className="glass rounded-2xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{ticket.subject}</p>
                  <span className="text-xs text-muted-foreground">Not sent · {formatWhen(ticket.createdAt)}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">{ticket.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
