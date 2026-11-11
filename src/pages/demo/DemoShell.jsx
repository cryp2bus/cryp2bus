import { Link, Route, Routes } from 'react-router-dom';
import { DemoNoIndex, DemoLogo, usePageTitle } from '@/components/demo/DemoChrome';
import { DemoProvider } from '@/components/demo/DemoProvider';
import { GuestOnly, RequireAuth } from '@/components/demo/guards';
import CabinetLayout from '@/components/demo/CabinetLayout';
import Welcome from '@/pages/demo/Welcome';
import Login from '@/pages/demo/Login';
import Signup from '@/pages/demo/Signup';
import ForgotPassword from '@/pages/demo/ForgotPassword';
import Onboarding from '@/pages/demo/Onboarding';
import Dashboard from '@/pages/demo/Dashboard';
import { NewQuote, Quotes } from '@/pages/demo/Quotes';
import { DepositPage, WithdrawPage } from '@/pages/demo/CashMovement';
import Transactions from '@/pages/demo/Transactions';
import CompanyProfile from '@/pages/demo/CompanyProfile';
import Team from '@/pages/demo/Team';
import Documents from '@/pages/demo/Documents';
import Support from '@/pages/demo/Support';

function DemoNotFound() {
  usePageTitle('Page not found');
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
      <DemoLogo />
      <h1 className="font-display text-2xl font-semibold">This demo page does not exist</h1>
      <Link className="text-electric hover:underline" to="/test">
        Back to client access
      </Link>
    </div>
  );
}

/**
 * Client cabinet demo.
 * Deep links such as /test/login survive refresh on GitHub Pages because
 * the deploy workflow copies dist/index.html to dist/404.html.
 */
export default function DemoShell() {
  return (
    <DemoProvider>
      <DemoNoIndex />
      <Routes>
        <Route element={<GuestOnly />}>
          <Route index element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="cabinet" element={<CabinetLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="quotes" element={<Quotes />} />
            <Route path="quotes/new" element={<NewQuote />} />
            <Route path="deposit" element={<DepositPage />} />
            <Route path="withdraw" element={<WithdrawPage />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="company" element={<CompanyProfile />} />
            <Route path="team" element={<Team />} />
            <Route path="documents" element={<Documents />} />
            <Route path="support" element={<Support />} />
          </Route>
        </Route>
        <Route path="*" element={<DemoNotFound />} />
      </Routes>
    </DemoProvider>
  );
}
