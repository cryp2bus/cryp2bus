import { Link } from 'react-router-dom';
import { DemoFooter, DemoLogo, usePageTitle } from '@/components/demo/DemoChrome';

export default function AuthFrame({ title, subtitle, children, footer }) {
  usePageTitle(title);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
        <DemoLogo />
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          Website
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-electric">Client access</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">{title}</h1>
          {subtitle ? <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{subtitle}</p> : null}
          <div className="glass rounded-2xl p-6 sm:p-8 mt-6">{children}</div>
          {footer ? <div className="mt-5 text-sm text-muted-foreground">{footer}</div> : null}
        </div>
      </main>
      <DemoFooter />
    </div>
  );
}
