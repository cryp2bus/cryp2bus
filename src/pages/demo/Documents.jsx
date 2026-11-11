import { useState } from 'react';
import { Link } from 'react-router-dom';
import DocumentChecklist from '@/components/demo/DocumentChecklist';
import { FormError, PageHeading } from '@/components/demo/DemoChrome';
import { useDemo } from '@/components/demo/DemoProvider';

export default function Documents() {
  const { user, saveOnboarding } = useDemo();
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  if (!user) return null;

  const onChange = async (documents) => {
    setError('');
    const result = await saveOnboarding({
      company: user.company,
      people: user.people,
      documents,
    });
    if (!result.ok) {
      setNotice('');
      setError(result.error);
      return;
    }
    setNotice('Document list saved on this device.');
  };

  return (
    <div className="space-y-6">
      <PageHeading
        title="Documents"
        subtitle="The checklist used for onboarding. Files are recorded by name only and are not uploaded."
        action={
          <Link className="text-sm text-electric hover:underline" to="/test/onboarding?step=documents">
            Open onboarding
          </Link>
        }
      />
      <div className="glass rounded-2xl p-6 sm:p-8 space-y-4">
        <FormError message={error} />
        {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}
        <DocumentChecklist documents={user.documents} onChange={onChange} />
      </div>
    </div>
  );
}
