import { Link } from 'react-router-dom';
import ComplianceShell from '@/components/compliance/ComplianceShell';
import { COMPLIANCE_PATHS, OPERATOR_STATEMENT } from '@/lib/compliance-docs';

const DOCUMENTS = [
  {
    to: COMPLIANCE_PATHS.amlKyc,
    title: 'AML/KYC Statement',
    text: 'A short public summary of the legal basis, customer due diligence for individuals and companies, beneficial owners, enhanced due diligence, sanctions screening, transaction monitoring, prohibited sectors, record keeping, and reporting to the authorities.',
  },
  {
    to: COMPLIANCE_PATHS.abc,
    title: 'Anti-Bribery & Corruption Policy',
    text: 'The full Anti-Bribery & Corruption Policy of TELEPORT FINANCIAL SERVICES s.r.o., including how to report a concern.',
  },
];

export default function Compliance() {
  return (
    <ComplianceShell
      title="Compliance"
      subtitle="Who operates the service, and the public compliance documents that apply."
    >
      <section className="glass rounded-2xl p-6 sm:p-8">
        <h2 className="font-display text-lg font-semibold mb-3">Who operates the service</h2>
        <p className="text-sm sm:text-base text-foreground leading-relaxed">{OPERATOR_STATEMENT}</p>
      </section>

      <section>
        <h2 className="font-display text-lg font-semibold mb-4">Documents</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {DOCUMENTS.map((doc) => (
            <Link
              key={doc.to}
              to={doc.to}
              className="glass rounded-2xl p-6 block transition-colors hover:border-electric/40"
            >
              <h3 className="font-display font-semibold text-base mb-2">{doc.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{doc.text}</p>
              <span className="inline-block mt-4 text-sm text-electric">Read</span>
            </Link>
          ))}
        </div>
      </section>
    </ComplianceShell>
  );
}
