import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/site/PageHeader';

const WHISTLEBLOWING_EMAIL = 'compliance@finteleport.org';

function Linkified({ text }) {
  const parts = text.split(WHISTLEBLOWING_EMAIL);
  if (parts.length === 1) return text;
  return parts.flatMap((part, index) => {
    const nodes = [<span key={`t-${index}`}>{part}</span>];
    if (index < parts.length - 1) {
      nodes.push(
        <a
          key={`e-${index}`}
          href={`mailto:${WHISTLEBLOWING_EMAIL}`}
          className="text-electric hover:underline"
        >
          {WHISTLEBLOWING_EMAIL}
        </a>,
      );
    }
    return nodes;
  });
}

function Paragraphs({ items }) {
  if (!items?.length) return null;
  return (
    <div className="space-y-3">
      {items.map((text) => (
        <p key={text} className="text-sm text-muted-foreground leading-relaxed">
          <Linkified text={text} />
        </p>
      ))}
    </div>
  );
}

export function ComplianceSection({ section }) {
  return (
    <section>
      <h2 className="font-display font-semibold text-lg text-foreground mb-2">{section.title}</h2>
      <Paragraphs items={section.paragraphs} />
      {section.bullets?.length > 0 && (
        <ul
          className={`list-disc pl-5 space-y-1.5 text-sm text-muted-foreground leading-relaxed ${
            section.paragraphs?.length ? 'mt-3' : ''
          }`}
        >
          {section.bullets.map((item) => (
            <li key={item}>
              <Linkified text={item} />
            </li>
          ))}
        </ul>
      )}
      {section.after?.length > 0 && (
        <div className={section.paragraphs?.length || section.bullets?.length ? 'mt-3' : ''}>
          <Paragraphs items={section.after} />
        </div>
      )}
    </section>
  );
}

export default function ComplianceShell({
  title,
  eyebrow = 'Compliance',
  subtitle,
  backTo = '/',
  backLabel = 'Back to home',
  children,
}) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} · Cryptobus`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {children}
        <Link to={backTo} className="inline-block text-sm text-electric hover:underline">
          ← {backLabel}
        </Link>
      </div>
    </>
  );
}
