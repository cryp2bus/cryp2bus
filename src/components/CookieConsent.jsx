import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { hasConsentChoice, storeCookieConsent } from '@/lib/cookieConsent';
import { META_PIXEL_ID, trackMetaPageView } from '@/lib/metaPixel';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasConsentChoice()) setVisible(true);
  }, []);

  const accept = () => {
    storeCookieConsent('accepted');
    setVisible(false);
    trackMetaPageView();
  };

  const decline = () => {
    storeCookieConsent('declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        padding: '1rem',
        background: '#0f172a',
        color: '#f8fafc',
        borderTop: '1px solid #1f2937',
        boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.35)',
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <p style={{ flex: '1 1 280px', margin: 0, fontSize: '0.9rem', lineHeight: 1.5, color: '#cbd5e1' }}>
          We store a cookie choice on this device so the site can remember it. If you accept, we
          also load Meta Pixel (ID {META_PIXEL_ID}) to measure advertising. If you decline, that
          pixel is not loaded.{' '}
          <Link to="/legal/cookies" style={{ color: '#93c5fd' }}>
            Cookie Policy
          </Link>
          .
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={decline}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              border: '1px solid #334155',
              borderRadius: '6px',
              background: 'transparent',
              color: '#f8fafc',
              cursor: 'pointer',
            }}
          >
            Decline
          </button>
          <Link
            to="/legal/cookies"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              border: '1px solid #334155',
              borderRadius: '6px',
              background: 'transparent',
              color: '#f8fafc',
              textDecoration: 'none',
            }}
          >
            Learn more
          </Link>
          <button
            type="button"
            onClick={accept}
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '6px',
              background: '#3b82f6',
              color: '#0a0e14',
              cursor: 'pointer',
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
