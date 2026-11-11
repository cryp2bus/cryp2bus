import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SelectInput } from '@/components/demo/Fields';
import { useDemo } from '@/components/demo/DemoProvider';
import { ACCOUNT_STATUS, STATUS_META } from '@/lib/demo/config';

const OPTIONS = [
  ACCOUNT_STATUS.pending_onboarding,
  ACCOUNT_STATUS.under_review,
  ACCOUNT_STATUS.approved,
  ACCOUNT_STATUS.rejected,
];

export default function DemoTools() {
  const { user, setAccountStatus, resetDemo } = useDemo();
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState('');

  if (!user) return null;

  const onStatus = async (event) => {
    setError('');
    const result = await setAccountStatus(event.target.value);
    if (!result.ok) setError(result.error);
  };

  const onReset = async () => {
    await resetDemo();
    navigate('/test', { replace: true });
  };

  return (
    <details className="rounded-xl border border-dashed border-border px-3 py-2">
      <summary className="cursor-pointer text-sm text-muted-foreground">Demo tools</summary>
      <div className="mt-3 space-y-3">
        <label className="block text-xs text-muted-foreground" htmlFor="demo-account-status">
          Account status
          <SelectInput
            id="demo-account-status"
            className="mt-1"
            value={user.accountStatus}
            onChange={onStatus}
          >
            {OPTIONS.map((status) => (
              <option key={status} value={status}>
                {STATUS_META[status].label}
              </option>
            ))}
          </SelectInput>
        </label>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Changes the story on this browser only. It does not contact a reviewer.
        </p>
        {error ? <p className="text-xs text-destructive">{error}</p> : null}
        {confirming ? (
          <div className="flex gap-2">
            <Button type="button" variant="destructive" size="sm" onClick={onReset}>
              Confirm reset
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button type="button" variant="outline" size="sm" onClick={() => setConfirming(true)}>
            Reset demo data
          </Button>
        )}
      </div>
    </details>
  );
}
