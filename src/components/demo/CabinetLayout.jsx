import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowUpFromLine,
  Building2,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  Receipt,
  Users,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DemoBanner, DemoFooter, DemoLogo, StatusBadge } from '@/components/demo/DemoChrome';
import DemoTools from '@/components/demo/DemoTools';
import { useDemo } from '@/components/demo/DemoProvider';
import { cn } from '@/lib/utils';

const NAV = [
  { to: '/test/cabinet', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/test/cabinet/quotes', label: 'OTC requests', icon: ArrowLeftRight },
  { to: '/test/cabinet/deposit', label: 'Deposit', icon: ArrowDownToLine },
  { to: '/test/cabinet/withdraw', label: 'Withdraw', icon: ArrowUpFromLine },
  { to: '/test/cabinet/transactions', label: 'Transactions', icon: Receipt },
  { to: '/test/cabinet/company', label: 'Company', icon: Building2 },
  { to: '/test/cabinet/team', label: 'Team', icon: Users },
  { to: '/test/cabinet/documents', label: 'Documents', icon: FileText },
  { to: '/test/cabinet/support', label: 'Support', icon: LifeBuoy },
];

function NavList({ onNavigate }) {
  return (
    <nav className="space-y-1">
      {NAV.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground',
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </NavLink>
        );
      })}
      <NavLink
        to="/test/onboarding"
        onClick={onNavigate}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            isActive
              ? 'bg-secondary text-foreground'
              : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground',
          )
        }
      >
        <ClipboardList className="h-4 w-4 shrink-0" />
        Onboarding
      </NavLink>
    </nav>
  );
}

export default function CabinetLayout() {
  const { user, signOut } = useDemo();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!user) return null;

  const logout = async () => {
    await signOut();
    navigate('/test/login', { replace: true });
  };

  const sidebar = (
    <div className="flex h-full flex-col gap-5">
      <DemoLogo />
      <div className="rounded-xl border border-border bg-background/40 px-3 py-3">
        <p className="truncate font-medium">{user.companyName}</p>
        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        <div className="mt-2">
          <StatusBadge status={user.accountStatus} />
        </div>
      </div>
      <NavList onNavigate={() => setOpen(false)} />
      <div className="mt-auto space-y-3">
        <DemoTools />
        <Button type="button" variant="ghost" className="w-full justify-start" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
        <Link to="/" className="block px-3 text-xs text-muted-foreground hover:text-foreground">
          Back to the website
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[270px_1fr]">
      <aside className="hidden lg:flex lg:flex-col lg:h-screen lg:sticky lg:top-0 border-r border-border bg-card/70 px-4 py-5 overflow-y-auto">
        {sidebar}
      </aside>

      {open ? (
        <div className="lg:hidden fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="relative h-full w-[min(100%,320px)] bg-card border-r border-border px-4 py-5 overflow-y-auto">
            {sidebar}
          </div>
        </div>
      ) : null}

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            className="rounded-md p-2 text-foreground"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <DemoLogo />
        </header>
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <DemoBanner />
          <Outlet />
          <DemoFooter />
        </div>
      </div>
    </div>
  );
}
