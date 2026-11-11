export const CONSENT_KEY = 'cryptobus_cookie_consent';

/** Earlier builds stored "true" for Accept. Treat that as accepted. */
export function readCookieConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent() {
  const value = readCookieConsent();
  return value === 'accepted' || value === 'true';
}

export function hasConsentChoice() {
  const value = readCookieConsent();
  return value === 'accepted' || value === 'true' || value === 'declined';
}

export function storeCookieConsent(choice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // ignore
  }
}
