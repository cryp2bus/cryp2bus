import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormError, PageHeading } from '@/components/demo/DemoChrome';
import { Field, SelectInput, TextInput } from '@/components/demo/Fields';
import { useDemo } from '@/components/demo/DemoProvider';
import { TEAM_ROLES } from '@/lib/demo/config';
import { hasErrors, teamMemberErrors } from '@/lib/demo/validate';

const EMPTY = { name: '', email: '', role: 'Viewer' };

export default function Team() {
  const { user, addTeamMember, removeTeamMember } = useDemo();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [pending, setPending] = useState(false);

  if (!user) return null;

  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = teamMemberErrors(form);
    setErrors(nextErrors);
    setFormError('');
    if (hasErrors(nextErrors)) return;
    setPending(true);
    const result = await addTeamMember(form);
    setPending(false);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    setForm(EMPTY);
  };

  return (
    <div className="space-y-6">
      <PageHeading
        title="Team"
        subtitle="People who can use this cabinet. Invitations are not emailed. Members are stored on this device only."
      />
      <div className="glass overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-border text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Work email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {user.team.map((member) => (
              <tr key={member.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">{member.name}</td>
                <td className="px-4 py-3 break-all">{member.email}</td>
                <td className="px-4 py-3">{member.role}</td>
                <td className="px-4 py-3 text-right">
                  {member.owner ? (
                    <span className="text-xs text-muted-foreground">Account owner</span>
                  ) : (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeTeamMember(member.id)}>
                      Remove
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form className="glass rounded-2xl p-6 space-y-4" noValidate onSubmit={submit}>
        <h2 className="font-medium">Add a team member</h2>
        <FormError message={formError} />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field id="member-name" label="Name" error={errors.name}>
            <TextInput id="member-name" value={form.name} error={errors.name} onChange={set('name')} />
          </Field>
          <Field id="member-email" label="Work email" error={errors.email}>
            <TextInput
              id="member-email"
              type="email"
              value={form.email}
              error={errors.email}
              onChange={set('email')}
            />
          </Field>
          <Field id="member-role" label="Role" error={errors.role}>
            <SelectInput id="member-role" value={form.role} error={errors.role} onChange={set('role')}>
              {TEAM_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </SelectInput>
          </Field>
        </div>
        <Button type="submit" className="font-semibold" disabled={pending}>
          {pending ? 'Adding…' : 'Add member'}
        </Button>
      </form>
    </div>
  );
}
