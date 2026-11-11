import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AuthFrame from '@/components/demo/AuthFrame';
import { Field, TextInput } from '@/components/demo/Fields';
import { FormError } from '@/components/demo/DemoChrome';
import { useDemo } from '@/components/demo/DemoProvider';

export default function ForgotPassword() {
  const { requestPasswordReset } = useDemo();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setPending(true);
    const result = await requestPasswordReset(email);
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setMessage(result.message);
  };

  return (
    <AuthFrame
      title="Forgot password"
      subtitle="Password reset email is not connected in this demo."
      footer={
        <p>
          <Link className="text-electric hover:underline" to="/test/login">
            Back to sign in
          </Link>
        </p>
      }
    >
      <form className="space-y-4" noValidate onSubmit={submit}>
        <FormError message={error} />
        {message ? (
          <div role="status" className="rounded-lg border border-electric/30 bg-electric/10 px-3 py-2 text-sm leading-relaxed">
            {message}
          </div>
        ) : null}
        <Field id="email" label="Work email">
          <TextInput
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Button type="submit" className="h-10 w-full font-semibold" disabled={pending}>
          {pending ? 'Checking…' : 'Send reset link'}
        </Button>
      </form>
    </AuthFrame>
  );
}
