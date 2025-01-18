import Cookies from 'js-cookie';

export const COOKIE_KEYS = {
  ANALYTICS_CONSENT: 'analytics_consent',
  ADVERTISING_CONSENT: 'advertising_consent',
  PREFERENCES: 'user_preferences',
};

export const cookieService = {
  setAnalyticsConsent: (consent: boolean) => {
    Cookies.set(COOKIE_KEYS.ANALYTICS_CONSENT, String(consent), { expires: 365 });
  },

  setAdvertisingConsent: (consent: boolean) => {
    Cookies.set(COOKIE_KEYS.ADVERTISING_CONSENT, String(consent), { expires: 365 });
  },

  getAnalyticsConsent: (): boolean => {
    return Cookies.get(COOKIE_KEYS.ANALYTICS_CONSENT) === 'true';
  },

  getAdvertisingConsent: (): boolean => {
    return Cookies.get(COOKIE_KEYS.ADVERTISING_CONSENT) === 'true';
  },

  setPreferences: (preferences: Record<string, any>) => {
    Cookies.set(COOKIE_KEYS.PREFERENCES, JSON.stringify(preferences), { expires: 365 });
  },

  getPreferences: (): Record<string, any> => {
    const prefs = Cookies.get(COOKIE_KEYS.PREFERENCES);
    return prefs ? JSON.parse(prefs) : {};
  },

  clearAllCookies: () => {
    Object.values(COOKIE_KEYS).forEach(key => {
      Cookies.remove(key);
    });
  }
};
