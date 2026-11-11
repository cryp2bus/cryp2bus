import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { demoClient } from '@/lib/demo/client';

const DemoContext = createContext(null);

export function DemoProvider({ children }) {
  const [user, setUser] = useState(() => demoClient.readSession());

  useEffect(() => demoClient.subscribe(() => setUser(demoClient.readSession())), []);

  const value = useMemo(() => ({ user, ...demoClient }), [user]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used inside DemoProvider');
  return context;
}
