import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormError, PageHeading } from '@/components/demo/DemoChrome';
import { CountryOptions, Field, SelectInput, TextInput } from '@/components/demo/Fields';
import { useDemo } from '@/components/demo/DemoProvider';
import { BUSINESS_TYPES, MONTHLY_VOLUMES } from '@/lib/demo/config';
import { hasErrors, profileFieldErrors } from '@/lib/demo/validate';

export default function CompanyProfile() {
  const { user, updateCompany } = useDemo();
  const [form, setForm] = useState(() => ({
    companyName: user?.companyName || '',
    country: user?.country || '',
    registrationNumber: user?.company?.registrationNumber || '',
    address: user?.company?.address || '',
    website: user?.company?.website || '',
    businessType: user?.company?.businessType || '',
    monthlyVolume: user?.company?.monthlyVolume || '',
  }));
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');
  const [pending, setPending] = useState(false);

  if (!user) return null;

  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = profileFieldErrors(form);
    setErrors(nextErrors);
    setNotice('');
    setFormError('');
    if (hasErrors(nextErrors)) return;
    setPending(true);
    const result = await updateCompany(form);
    setPending(false);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    setNotice('Company profile saved on this device.');
  };

  return (
    <div className="space-y-6">
      <PageHeading
        title="Company"
        subtitle="Registration details for this cabinet. Changes stay in this browser."
      />
      <form className="glass rounded-2xl p-6 sm:p-8 space-y-4" noValidate onSubmit={submit}>
        <FormError message={formError} />
        {notice ? (
          <p role="status" className="rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-sm">
            {notice}
          </p>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="companyName" label="Company name" error={errors.companyName}>
            <TextInput id="companyName" value={form.companyName} error={errors.companyName} onChange={set('companyName')} />
          </Field>
          <Field id="country" label="Country of registration" error={errors.country}>
            <SelectInput id="country" value={form.country} error={errors.country} onChange={set('country')}>
              <option value="">Select a country</option>
              <CountryOptions />
            </SelectInput>
          </Field>
          <Field id="registrationNumber" label="Registration number" error={errors.registrationNumber}>
            <TextInput
              id="registrationNumber"
              value={form.registrationNumber}
              error={errors.registrationNumber}
              onChange={set('registrationNumber')}
            />
          </Field>
          <Field id="website" label="Website" error={errors.website}>
            <TextInput id="website" value={form.website} error={errors.website} onChange={set('website')} />
          </Field>
        </div>
        <Field id="address" label="Registered address" error={errors.address}>
          <TextInput id="address" value={form.address} error={errors.address} onChange={set('address')} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="businessType" label="Business type" error={errors.businessType}>
            <SelectInput id="businessType" value={form.businessType} error={errors.businessType} onChange={set('businessType')}>
              <option value="">Select a type</option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field id="monthlyVolume" label="Expected monthly volume" error={errors.monthlyVolume}>
            <SelectInput
              id="monthlyVolume"
              value={form.monthlyVolume}
              error={errors.monthlyVolume}
              onChange={set('monthlyVolume')}
            >
              <option value="">Select a range</option>
              {MONTHLY_VOLUMES.map((volume) => (
                <option key={volume} value={volume}>
                  {volume}
                </option>
              ))}
            </SelectInput>
          </Field>
        </div>
        <Field id="work-email" label="Work email">
          <TextInput id="work-email" value={user.email} disabled />
        </Field>
        <Button type="submit" className="font-semibold" disabled={pending}>
          {pending ? 'Saving…' : 'Save company'}
        </Button>
      </form>
    </div>
  );
}
