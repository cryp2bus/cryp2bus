import { hasAnalyticsConsent } from '@/lib/cookieConsent';

export const META_PIXEL_ID = '1490653782880679';

const PIXEL_SRC = 'https://connect.facebook.net/en_US/fbevents.js';

let lastTrack = { key: '', at: 0 };

function page() {
  return /** @type {any} */ (window);
}

function installSnippet() {
  const w = page();
  if (w.fbq) return;
  /** @type {any} */
  const fbq = function () {
    if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
    else fbq.queue.push(arguments);
  };
  w.fbq = fbq;
  if (!w._fbq) w._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  const script = document.createElement('script');
  script.async = true;
  script.src = PIXEL_SRC;
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);
  w.fbq('init', META_PIXEL_ID);
}

/**
 * Lead conversion. Runs only after a successful submit, and only when the
 * visitor already accepted cookies and the pixel stub is on the page.
 */
export function trackMetaLead(params) {
  try {
    if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;
    const w = page();
    if (typeof w.fbq !== 'function') return;
    if (params) w.fbq('track', 'Lead', params);
    else w.fbq('track', 'Lead');
  } catch {
    // A pixel error must not turn a successful submit into a failed one.
  }
}

/** Load Meta Pixel and send PageView only after the visitor has accepted cookies. */
export function trackMetaPageView() {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;
  installSnippet();
  const key = `${window.location.pathname}${window.location.search}`;
  const now = Date.now();
  if (lastTrack.key === key && now - lastTrack.at < 1000) return;
  lastTrack = { key, at: now };
  page().fbq('track', 'PageView');
}
