import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackMetaPageView } from '@/lib/metaPixel';

// PageView fires only after cookie consent. The first view is sent on load
// when consent was already stored, and again on each client-side route change.
export default function MetaPixelPageView() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackMetaPageView();
  }, [pathname, search]);

  return null;
}
