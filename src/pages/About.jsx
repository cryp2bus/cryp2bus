import { Button } from '@/components/ui/button';
import PageHeader from '@/components/site/PageHeader';
import { Target, Server, ShieldCheck, Globe2, Users, Mail, Building2 } from 'lucide-react';
import { useLeadModal } from '@/components/LeadModal';
import { COMPANY } from '@/lib/company';
import { ABOUT_PAGE } from '@/lib/about-page';

const ICONS = [Target, Server, ShieldCheck, Globe2, Mail];

export default function About() {
  const { openLeadModal } = useLeadModal();

  return (
    <>
      <PageHeader
        eyebrow="About Cryptobus"
        title={ABOUT_PAGE.title}
        subtitle={ABOUT_PAGE.subtitle}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 sm:space-y-16">
        <div className="glass rounded-2xl p-6 sm:p-8 lg:p-10">
          <h2 className="font-display text-2xl font-bold mb-4">{ABOUT_PAGE.problemTitle}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {ABOUT_PAGE.problem.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-11 w-11 rounded-xl bg-electric/10 border border-electric/20 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-electric" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">{ABOUT_PAGE.licensingTitle}</h2>
              <p className="text-sm text-muted-foreground">{ABOUT_PAGE.licensingIntro}</p>
            </div>
          </div>
          <dl className="grid sm:grid-cols-2 gap-4 text-sm">
            <Item label="Legal name" value={COMPANY.legalName} />
            <Item label="Legal form" value={COMPANY.legalForm} />
            <Item label="Registration number (IČO)" value={COMPANY.ico} />
            <Item label="License" value={COMPANY.license} />
            <Item label="Country" value={COMPANY.country} />
            <Item label="Court registry" value={COMPANY.courtRegistry} />
            <Item label="Registered address" value={COMPANY.address} className="sm:col-span-2" />
            <Item
              label="Email"
              value={
                <a href={`mailto:${COMPANY.email}`} className="text-electric hover:underline">
                  {COMPANY.email}
                </a>
              }
            />
            <Item
              label="Phone"
              value={
                <a href={`tel:${COMPANY.phone}`} className="text-electric hover:underline">
                  {COMPANY.phoneDisplay}
                </a>
              }
            />
          </dl>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ABOUT_PAGE.sections.map((s, index) => {
            const Icon = ICONS[index] || Mail;
            return (
              <div key={s.title} className="glass rounded-2xl p-6">
                <div className="h-11 w-11 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-teal" />
                </div>
                <h3 className="font-display text-base font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.body}</p>
              </div>
            );
          })}
        </div>

        <div className="glass rounded-2xl p-8 lg:p-10 border border-dashed border-border">
          <div className="flex items-center gap-3 mb-3">
            <Users className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-display text-xl font-bold">{ABOUT_PAGE.leadershipTitle}</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">{ABOUT_PAGE.leadership}</p>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-electric text-graphite font-semibold"
            onClick={() =>
              openLeadModal({ source: 'about-open-account', title: 'Open Business Account' })
            }
          >
            Open Business Account
          </Button>
        </div>
      </div>
    </>
  );
}

function Item({ label, value, className = '' }) {
  return (
    <div className={`rounded-xl border border-border bg-card/40 p-4 ${className}`}>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</dt>
      <dd className="text-foreground font-medium leading-relaxed">{value}</dd>
    </div>
  );
}
