import ComplianceShell, { ComplianceSection } from '@/components/compliance/ComplianceShell';
import { ABC_POLICY, ABC_PDF_PATH, COMPLIANCE_PATHS } from '@/lib/compliance-docs';

function pdfHref() {
  const meta = /** @type {{ env?: { BASE_URL?: string } }} */ (import.meta);
  const base = meta.env?.BASE_URL || '/';
  return `${base}${ABC_PDF_PATH}`;
}

export default function AbcPolicy() {
  return (
    <ComplianceShell
      title={ABC_POLICY.title}
      subtitle={ABC_POLICY.subtitle}
      backTo={COMPLIANCE_PATHS.hub}
      backLabel="Compliance"
    >
      <dl className="grid gap-3 sm:grid-cols-2 text-sm">
        {ABC_POLICY.meta.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
            <dd className="text-foreground mt-1">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="text-sm">
        <a href={pdfHref()} className="text-electric hover:underline" download>
          Download PDF
        </a>
      </p>
      {ABC_POLICY.sections.map((section) => (
        <ComplianceSection key={section.title} section={section} />
      ))}
    </ComplianceShell>
  );
}
