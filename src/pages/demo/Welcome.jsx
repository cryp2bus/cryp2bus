import { Link } from 'react-router-dom';
import { BadgeCheck, Building2, MessagesSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DemoFooter, DemoLogo, usePageTitle } from '@/components/demo/DemoChrome';
import { CONTACT_EMAIL } from '@/lib/demo/config';

const STEPS = [
  {
    icon: Building2,
    title: 'Register the company',
    text: 'Company name, country of registration, and a work email.',
  },
  {
    icon: BadgeCheck,
    title: 'Complete onboarding',
    text: 'Directors, beneficial owners, and the document checklist.',
  },
  {
    icon: MessagesSquare,
    title: 'Use the cabinet',
    text: 'Request an OTC quote and review treasury screens. Live settlement stays off.',
  },
];

export default function Welcome() {
  usePageTitle('Client access');

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 px-4 sm:px-6 flex items-center justify-between">
        <DemoLogo />
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/test/login">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="font-semibold">
            <Link to="/test/signup">Create account</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-electric">Client access</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              The business cabinet for <span className="text-gradient">Cryp2bus</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed sm:text-lg">
              Open a company account, walk through onboarding, and use the cabinet. This demonstration
              stores every record in your browser. No money moves and no compliance check is sent.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-11 px-6 font-semibold">
                <Link to="/test/signup">Create account</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 px-6">
                <Link to="/test/login">Sign in</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Corporate enquiries:{' '}
              <a className="text-electric hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
          <ol className="glass rounded-2xl p-6 space-y-5">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-electric">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Step {index + 1}</p>
                    <p className="font-medium">{step.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </main>
      <DemoFooter />
    </div>
  );
}
