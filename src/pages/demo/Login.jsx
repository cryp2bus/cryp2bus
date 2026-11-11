import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AuthFrame from '@/components/demo/AuthFrame';
import { Field, TextInput } from '@/components/demo/Fields';
import { FormError } from '@/components/demo/DemoChrome';
import { useDemo } from '@/components/demo/DemoProvider';
import { homeFor, safeNextPath } from '@/components/demo/guards';

export default function Login() {
  const { signIn } = useDemo();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Enter the work email and password.');
      return;
    }
    setPending(true);
    const result = await signIn({ email, password });
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    const next = safeNextPath(params.get('next'));
    navigate(next || homeFor(result.user), { replace: true });
  };

  return (
    <AuthFrame
      title="Sign in"
      subtitle="Use the work email and password from registration. They stay on this device."
      footer={
        <p>
          New company?{' '}
          <Link className="text-electric hover:underline" to="/test/signup">
            Create an account
          </Link>
        </p>
      }
    >
      <form className="space-y-4" noValidate onSubmit={submit}>
        <FormError message={error} />
        <Field id="email" label="Work email">
          <TextInput
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Field id="password" label="Password">
          <TextInput
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>
        <div className="text-sm">
          <Link className="text-electric hover:underline" to="/test/forgot-password">
            Forgot password
          </Link>
        </div>
        <Button type="submit" className="h-10 w-full font-semibold" disabled={pending}>
          {pending ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthFrame>
  );
}
