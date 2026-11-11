import { useParams, Link } from 'react-router-dom';
import PageHeader from '@/components/site/PageHeader';
import { OPERATOR_STATEMENT } from '@/lib/company';
import { LEGAL_DOCS } from '@/lib/legal-docs';

export default function LegalPage() {
  const { slug } = useParams();
  const doc = LEGAL_DOCS[slug];

  if (!doc) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold mb-4">Document not found</h1>
        <Link to="/" className="text-electric hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={doc.title}
        subtitle={OPERATOR_STATEMENT}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <p className="text-xs text-muted-foreground">Last updated: {doc.updated}</p>
        {doc.sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-display font-semibold text-lg mb-2">{s.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
          </section>
        ))}
        <Link to="/" className="inline-block text-sm text-electric hover:underline">
          ← Back to home
        </Link>
      </div>
    </>
  );
}
