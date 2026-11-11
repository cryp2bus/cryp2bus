import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import AuthFrame from '@/components/demo/AuthFrame';
import { CountryOptions, Field, SelectInput, TextInput } from '@/components/demo/Fields';
import { FormError } from '@/components/demo/DemoChrome';
import { useDemo } from '@/components/demo/DemoProvider';
import { LEGAL } from '@/lib/demo/config';
import { hasErrors, signUpFieldErrors } from '@/lib/demo/validate';

const EMPTY = {
  companyName: '',
  country: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false,
};

export default function Signup() {
  const { signUp } = useDemo();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [pending, setPending] = useState(false);

  const set = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = signUpFieldErrors(form);
    setErrors(nextErrors);
    setFormError('');
    if (hasErrors(nextErrors)) return;
    setPending(true);
    const result = await signUp(form);
    setPending(false);
    if (!result.ok) {
      setFormError(result.error);
      if (result.field) setErrors((current) => ({ ...current, [result.field]: result.error }));
      return;
    }
    navigate('/test/onboarding', { replace: true });
  };

  return (
    <AuthFrame
      title="Create account"
      subtitle="Register the company. The password is hashed in this browser and is never stored in plain text."
      footer={
        <p>
          Already registered?{' '}
          <Link className="text-electric hover:underline" to="/test/login">
            Sign in
          </Link>
        </p>
      }
    >
      <form className="space-y-4" noValidate onSubmit={submit}>
        <FormError message={formError} />
        <Field id="companyName" label="Company name" error={errors.companyName}>
          <TextInput
            id="companyName"
            autoComplete="organization"
            value={form.companyName}
            error={errors.companyName}
            onChange={set('companyName')}
          />
        </Field>
        <Field id="country" label="Country of registration" error={errors.country}>
          <SelectInput id="country" value={form.country} error={errors.country} onChange={set('country')}>
            <option value="">Select a country</option>
            <CountryOptions />
          </SelectInput>
        </Field>
        <Field id="email" label="Work email" error={errors.email}>
          <TextInput
            id="email"
            type="email"
            autoComplete="email"
            placeholder="finance@company.com"
            value={form.email}
            error={errors.email}
            onChange={set('email')}
          />
        </Field>
        <Field id="password" label="Password" error={errors.password} hint="At least 8 characters.">
          <TextInput
            id="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            error={errors.password}
            onChange={set('password')}
          />
        </Field>
        <Field id="confirmPassword" label="Confirm password" error={errors.confirmPassword}>
          <TextInput
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            error={errors.confirmPassword}
            onChange={set('confirmPassword')}
          />
        </Field>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground leading-relaxed">{LEGAL.disclosure}</p>
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={form.acceptedTerms}
              onCheckedChange={(value) => setForm((current) => ({ ...current, acceptedTerms: value === true }))}
              className="mt-0.5"
            />
            <label htmlFor="terms" className="text-sm leading-relaxed">
              I agree to the terms on behalf of the company.
            </label>
          </div>
          <p className="text-sm text-muted-foreground pl-7">
            <Link className="text-electric hover:underline" to="/legal/terms">
              Terms of Service
            </Link>
            {' · '}
            <Link className="text-electric hover:underline" to="/legal/privacy">
              Privacy Policy
            </Link>
          </p>
          {errors.acceptedTerms ? <p className="text-sm text-destructive">{errors.acceptedTerms}</p> : null}
        </div>
        <Button type="submit" className="h-10 w-full font-semibold" disabled={pending}>
          {pending ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
    </AuthFrame>
  );
}
