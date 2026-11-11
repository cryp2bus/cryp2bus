import ComplianceShell, { ComplianceSection } from '@/components/compliance/ComplianceShell';
import { AML_KYC_STATEMENT, COMPLIANCE_PATHS } from '@/lib/compliance-docs';

export default function AmlKycStatement() {
  return (
    <ComplianceShell
      title={AML_KYC_STATEMENT.title}
      subtitle={AML_KYC_STATEMENT.subtitle}
      backTo={COMPLIANCE_PATHS.hub}
      backLabel="Compliance"
    >
      <p className="text-xs text-muted-foreground">{AML_KYC_STATEMENT.sourceLabel}</p>
      <div className="space-y-3">
        {AML_KYC_STATEMENT.intro.map((paragraph) => (
          <p key={paragraph} className="text-sm text-muted-foreground leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      {AML_KYC_STATEMENT.sections.map((section) => (
        <ComplianceSection key={section.title} section={section} />
      ))}
    </ComplianceShell>
  );
}
