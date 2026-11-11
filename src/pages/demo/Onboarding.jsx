import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DocumentChecklist from '@/components/demo/DocumentChecklist';
import { DemoFooter, DemoLogo, FormError, StatusBadge, usePageTitle } from '@/components/demo/DemoChrome';
import { CountryOptions, Field, SelectInput, TextInput } from '@/components/demo/Fields';
import { useDemo } from '@/components/demo/DemoProvider';
import { BUSINESS_TYPES, KYB_DOCUMENTS, MONTHLY_VOLUMES } from '@/lib/demo/config';
import {
  companyFieldErrors,
  documentError,
  hasErrors,
  peopleFieldErrors,
  peopleHaveErrors,
} from '@/lib/demo/validate';

const STEPS = [
  { id: 'company', label: 'Company' },
  { id: 'people', label: 'People' },
  { id: 'documents', label: 'Documents' },
  { id: 'review', label: 'Review' },
];

function blankPerson() {
  return {
    id: crypto.randomUUID(),
    role: 'director',
    name: '',
    ownership: '',
    residence: '',
  };
}

export default function Onboarding() {
  const { user, saveOnboarding, submitOnboarding, signOut } = useDemo();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const requested = params.get('step');
  const step = STEPS.some((item) => item.id === requested) ? requested : 'company';

  const [company, setCompany] = useState(() => ({ ...(user?.company || {}) }));
  const [people, setPeople] = useState(() => (user?.people?.length ? user.people : [blankPerson()]));
  const [documents, setDocuments] = useState(() => user?.documents || []);
  const [companyErrors, setCompanyErrors] = useState({});
  const [peopleErrors, setPeopleErrors] = useState({ form: '', rows: {} });
  const [docError, setDocError] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [pending, setPending] = useState(false);

  usePageTitle('Onboarding');

  const draft = useRef({ company, people, documents });
  draft.current = { company, people, documents };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      saveOnboarding(draft.current);
    }, 400);
    return () => window.clearTimeout(timer);
  }, [company, people, documents, saveOnboarding]);

  useEffect(() => {
    return () => {
      saveOnboarding(draft.current);
    };
  }, [saveOnboarding]);

  if (!user) return null;

  const go = (next) => {
    setFormError('');
    setParams({ step: next }, { replace: false });
  };

  const setCompanyField = (key) => (event) => {
    setCompany((current) => ({ ...current, [key]: event.target.value }));
  };

  const updatePerson = (id, patch) => {
    setPeople((rows) => rows.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  };

  const continueCompany = () => {
    const errors = companyFieldErrors(company);
    setCompanyErrors(errors);
    if (hasErrors(errors)) return;
    go('people');
  };

  const continuePeople = () => {
    const errors = peopleFieldErrors(people);
    setPeopleErrors(errors);
    if (peopleHaveErrors(errors)) return;
    go('documents');
  };

  const continueDocuments = () => {
    const message = documentError(documents);
    setDocError(message);
    if (message) return;
    go('review');
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!confirmed) {
      setFormError('Confirm the information before submitting.');
      return;
    }
    setPending(true);
    const result = await submitOnboarding({ company, people, documents });
    setPending(false);
    if (!result.ok) {
      setFormError(result.error);
      if (result.step) go(result.step);
      return;
    }
    navigate('/test/cabinet', { replace: true });
  };

  const stepIndex = STEPS.findIndex((item) => item.id === step);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 px-4 sm:px-6 flex items-center justify-between gap-3 border-b border-border">
        <DemoLogo />
        <div className="flex items-center gap-3 text-sm">
          <StatusBadge status={user.accountStatus} />
          <Link className="text-muted-foreground hover:text-foreground" to="/test/cabinet">
            Cabinet
          </Link>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground"
            onClick={async () => {
              await signOut();
              navigate('/test/login', { replace: true });
            }}
          >
            Log out
          </button>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-electric">Onboarding</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">Company profile</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Drafts stay on this device. Submitting moves the account to under review. It does not start a live KYB check.
        </p>
        <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {STEPS.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item.id)}
                className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${
                  item.id === step ? 'border-electric bg-electric/10' : 'border-border text-muted-foreground'
                }`}
              >
                <span className="block text-xs">{index + 1}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ol>

        <div className="glass rounded-2xl p-6 sm:p-8 mt-6">
          {step === 'company' ? (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="registered-name" label="Company name">
                  <TextInput id="registered-name" value={user.companyName} disabled />
                </Field>
                <Field id="registered-country" label="Country of registration">
                  <TextInput id="registered-country" value={user.country} disabled />
                </Field>
              </div>
              <Field id="registrationNumber" label="Registration number" error={companyErrors.registrationNumber}>
                <TextInput
                  id="registrationNumber"
                  value={company.registrationNumber || ''}
                  error={companyErrors.registrationNumber}
                  onChange={setCompanyField('registrationNumber')}
                />
              </Field>
              <Field id="address" label="Registered address" error={companyErrors.address}>
                <TextInput
                  id="address"
                  value={company.address || ''}
                  error={companyErrors.address}
                  onChange={setCompanyField('address')}
                />
              </Field>
              <Field id="website" label="Website" error={companyErrors.website} hint="Optional.">
                <TextInput
                  id="website"
                  inputMode="url"
                  placeholder="company.com"
                  value={company.website || ''}
                  error={companyErrors.website}
                  onChange={setCompanyField('website')}
                />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="businessType" label="Business type" error={companyErrors.businessType}>
                  <SelectInput
                    id="businessType"
                    value={company.businessType || ''}
                    error={companyErrors.businessType}
                    onChange={setCompanyField('businessType')}
                  >
                    <option value="">Select a type</option>
                    {BUSINESS_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </SelectInput>
                </Field>
                <Field id="monthlyVolume" label="Expected monthly volume" error={companyErrors.monthlyVolume}>
                  <SelectInput
                    id="monthlyVolume"
                    value={company.monthlyVolume || ''}
                    error={companyErrors.monthlyVolume}
                    onChange={setCompanyField('monthlyVolume')}
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
              <div className="flex justify-end">
                <Button type="button" className="font-semibold" onClick={continueCompany}>
                  Continue
                </Button>
              </div>
            </div>
          ) : null}

          {step === 'people' ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add each director and beneficial owner. One person can hold both roles.
              </p>
              {peopleErrors.form ? <FormError message={peopleErrors.form} /> : null}
              {people.map((person, index) => {
                const rowErrors = peopleErrors.rows[person.id] || {};
                const needsOwnership = person.role === 'ubo' || person.role === 'both';
                return (
                  <div key={person.id} className="rounded-xl border border-border p-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium">Person {index + 1}</p>
                      {people.length > 1 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setPeople((rows) => rows.filter((row) => row.id !== person.id))}
                        >
                          Remove
                        </Button>
                      ) : null}
                    </div>
                    <Field id={`role-${person.id}`} label="Role" error={rowErrors.role}>
                      <SelectInput
                        id={`role-${person.id}`}
                        value={person.role}
                        error={rowErrors.role}
                        onChange={(event) => updatePerson(person.id, { role: event.target.value })}
                      >
                        <option value="director">Director</option>
                        <option value="ubo">Beneficial owner</option>
                        <option value="both">Director and beneficial owner</option>
                      </SelectInput>
                    </Field>
                    <Field id={`name-${person.id}`} label="Legal name" error={rowErrors.name}>
                      <TextInput
                        id={`name-${person.id}`}
                        value={person.name}
                        error={rowErrors.name}
                        onChange={(event) => updatePerson(person.id, { name: event.target.value })}
                      />
                    </Field>
                    <Field id={`residence-${person.id}`} label="Country of residence" error={rowErrors.residence}>
                      <SelectInput
                        id={`residence-${person.id}`}
                        value={person.residence}
                        error={rowErrors.residence}
                        onChange={(event) => updatePerson(person.id, { residence: event.target.value })}
                      >
                        <option value="">Select a country</option>
                        <CountryOptions />
                      </SelectInput>
                    </Field>
                    {needsOwnership ? (
                      <Field id={`ownership-${person.id}`} label="Ownership %" error={rowErrors.ownership}>
                        <TextInput
                          id={`ownership-${person.id}`}
                          inputMode="decimal"
                          value={person.ownership}
                          error={rowErrors.ownership}
                          onChange={(event) => updatePerson(person.id, { ownership: event.target.value })}
                        />
                      </Field>
                    ) : null}
                  </div>
                );
              })}
              {people.length < 12 ? (
                <Button type="button" variant="outline" onClick={() => setPeople((rows) => [...rows, blankPerson()])}>
                  Add a person
                </Button>
              ) : null}
              <div className="flex justify-between gap-3">
                <Button type="button" variant="ghost" onClick={() => go('company')}>
                  Back
                </Button>
                <Button type="button" className="font-semibold" onClick={continuePeople}>
                  Continue
                </Button>
              </div>
            </div>
          ) : null}

          {step === 'documents' ? (
            <div className="space-y-4">
              {docError ? <FormError message={docError} /> : null}
              <DocumentChecklist documents={documents} onChange={setDocuments} />
              <div className="flex justify-between gap-3">
                <Button type="button" variant="ghost" onClick={() => go('people')}>
                  Back
                </Button>
                <Button type="button" className="font-semibold" onClick={continueDocuments}>
                  Review
                </Button>
              </div>
            </div>
          ) : null}

          {step === 'review' ? (
            <form className="space-y-5" noValidate onSubmit={submit}>
              <FormError message={formError} />
              <ReviewBlock title="Company">
                <ReviewRow label="Company" value={user.companyName} />
                <ReviewRow label="Country" value={user.country} />
                <ReviewRow label="Registration number" value={company.registrationNumber} />
                <ReviewRow label="Address" value={company.address} />
                <ReviewRow label="Website" value={company.website || 'Not provided'} />
                <ReviewRow label="Business type" value={company.businessType} />
                <ReviewRow label="Monthly volume" value={company.monthlyVolume} />
              </ReviewBlock>
              <ReviewBlock title="People">
                {people.map((person) => (
                  <ReviewRow
                    key={person.id}
                    label={roleLabel(person.role)}
                    value={[person.name, person.residence, person.role === 'director' ? '' : `${person.ownership}%`]
                      .filter(Boolean)
                      .join(' · ')}
                  />
                ))}
              </ReviewBlock>
              <ReviewBlock title="Documents">
                {documents.length === 0 ? <p className="text-sm text-muted-foreground">No documents attached.</p> : null}
                {documents.map((document) => (
                  <ReviewRow
                    key={document.id}
                    label={KYB_DOCUMENTS.find((item) => item.id === document.requirementId)?.label || 'Document'}
                    value={document.name}
                  />
                ))}
              </ReviewBlock>
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={confirmed}
                  onChange={(event) => setConfirmed(event.target.checked)}
                />
                <span>I confirm this information is ready to submit for review.</span>
              </label>
              <div className="flex justify-between gap-3">
                <Button type="button" variant="ghost" onClick={() => go('documents')}>
                  Back
                </Button>
                <Button type="submit" className="font-semibold" disabled={pending}>
                  {pending ? 'Submitting…' : 'Submit application'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Step {stepIndex + 1} of {STEPS.length}. After submit, open Demo tools in the cabinet to mark the account approved or rejected.
              </p>
            </form>
          ) : null}
        </div>
      </main>
      <DemoFooter />
    </div>
  );
}

function roleLabel(role) {
  if (role === 'ubo') return 'Beneficial owner';
  if (role === 'both') return 'Director and beneficial owner';
  return 'Director';
}

function ReviewBlock({ title, children }) {
  return (
    <section className="space-y-2">
      <h2 className="font-medium">{title}</h2>
      <div className="rounded-xl border border-border divide-y divide-border">{children}</div>
    </section>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="grid gap-1 px-3 py-2 text-sm sm:grid-cols-[180px_1fr]">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="break-words">{value || '—'}</dd>
    </div>
  );
}
