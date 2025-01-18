import React, { useState } from 'react';
import CookieConsentBanner from 'react-cookie-consent';
import { cookieService } from '../services/cookieService';

const CookieConsent: React.FC = () => {
  const [showPreferences, setShowPreferences] = useState(false);

  const handleAcceptAll = () => {
    cookieService.setAnalyticsConsent(true);
    cookieService.setAdvertisingConsent(true);
    // Initialize Google Analytics and AdSense here if consent given
    initializeTracking();
  };

  const handleCustomize = () => {
    setShowPreferences(true);
  };

  const handleSavePreferences = (analytics: boolean, advertising: boolean) => {
    cookieService.setAnalyticsConsent(analytics);
    cookieService.setAdvertisingConsent(advertising);
    setShowPreferences(false);
    
    if (analytics || advertising) {
      initializeTracking();
    }
  };

  const initializeTracking = () => {
    // Initialize Google Analytics
    if (cookieService.getAnalyticsConsent()) {
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted'
      });
      window.gtag?.('config', 'G-FZ7BWK14R4', {
        anonymize_ip: true
      });
    }

    // Initialize Google AdSense
    if (cookieService.getAdvertisingConsent()) {
      window.gtag?.('consent', 'update', {
        ad_storage: 'granted'
      });
    }
  };

  return (
    <>
      <CookieConsentBanner
        location="bottom"
        buttonText="Accept All"
        declineButtonText="Customize"
        cookieName="cookie_consent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ 
          background: "#4CAF50",
          color: "white",
          fontSize: "13px",
          borderRadius: "3px",
          padding: "5px 20px"
        }}
        declineButtonStyle={{
          background: "transparent",
          border: "1px solid white",
          color: "white",
          fontSize: "13px",
          borderRadius: "3px",
          padding: "5px 20px"
        }}
        expires={365}
        onAccept={handleAcceptAll}
        onDecline={handleCustomize}
      >
        This website uses cookies to enhance your experience. We also use cookies for advertising and analytics purposes.
      </CookieConsentBanner>

      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Cookie Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={cookieService.getAnalyticsConsent()}
                    onChange={(e) => handleSavePreferences(e.target.checked, cookieService.getAdvertisingConsent())}
                    className="form-checkbox"
                  />
                  <span>Analytics Cookies</span>
                </label>
                <p className="text-sm text-gray-500">Help us improve our website</p>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={cookieService.getAdvertisingConsent()}
                    onChange={(e) => handleSavePreferences(cookieService.getAnalyticsConsent(), e.target.checked)}
                    className="form-checkbox"
                  />
                  <span>Advertising Cookies</span>
                </label>
                <p className="text-sm text-gray-500">Show personalized ads</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSavePreferences(
                  cookieService.getAnalyticsConsent(),
                  cookieService.getAdvertisingConsent()
                )}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
