import MetaTags from '../components/MetaTags';

const CookiePolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <MetaTags
        title="Cookie Policy - EraseEaseBG"
        description="Learn about how we use cookies on EraseEaseBG to improve your experience."
      />
      
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
          <p className="mb-4">
            Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
            They are widely used to make websites work more efficiently and provide a better user experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
          <p className="mb-4">We use cookies to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Remember your preferences and settings</li>
            <li>Understand how you use our website</li>
            <li>Improve our services and user experience</li>
            <li>Provide you with relevant content and information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
              <p>These cookies are necessary for the website to function properly. They enable core functionality such as security and user preferences.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Analytics Cookies</h3>
              <p>We use analytics cookies to understand how visitors interact with our website, helping us improve our services.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Preference Cookies</h3>
              <p>These cookies remember your settings and preferences to enhance your experience on return visits.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
          <p className="mb-4">
            Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience of our website.
          </p>
          <p>
            You can modify your cookie preferences at any time using our cookie consent banner at the bottom of the page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us through our Contact page.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
