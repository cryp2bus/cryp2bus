import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ACCOUNT_STATUS } from '@/lib/demo/config';
import { useDemo } from '@/components/demo/DemoProvider';

export function safeNextPath(value) {
  if (!value || !value.startsWith('/test')) return null;
  if (value.startsWith('//') || value.includes('://') || value.includes('\\')) return null;
  return value;
}

export function homeFor(user) {
  if (!user) return '/test/login';
  if (user.accountStatus === ACCOUNT_STATUS.pending_onboarding) return '/test/onboarding';
  return '/test/cabinet';
}

export function RequireAuth() {
  const { user } = useDemo();
  const location = useLocation();
  if (!user) {
    const next = encodeURIComponent(`${location.pathname}${location.search}`);
    return <Navigate to={`/test/login?next=${next}`} replace />;
  }
  return <Outlet />;
}

export function GuestOnly() {
  const { user } = useDemo();
  if (user) return <Navigate to={homeFor(user)} replace />;
  return <Outlet />;
}
