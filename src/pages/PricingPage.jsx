const SINGLE_LINK = import.meta.env.VITE_GUMROAD_SINGLE_LINK || 'https://sambitpathfinder.gumroad.com/l/xbqtvn';
const YEARLY_LINK = import.meta.env.VITE_GUMROAD_LIFETIME_LINK || 'https://sambitpathfinder.gumroad.com/l/kussdz'; // Reusing the same env var but it's now Yearly

const FREE_FEATURES = [
  'Unlimited situation checks',
  'Full verdict + law cited',
  'Severity rating',
  'Clear action steps',
  'Lawyer recommendation'
];

const SINGLE_FEATURES = [
  'Everything in Free',
  'Legal alternative for one situation',
  'Step-by-step legal method',
  'Cost & timeline estimates',
  'Potential compensation summary'
];

const YEARLY_FEATURES = [
  'Everything above',
  'Unlimited legal alternative unlocks',
  'Lawsuit Valuation Engine',
  'Potential damages & payout estimates',
  'Priority feature access',
  'Yearly subscription'
];

export default function PricingPage() {
  return (
    <div className="pricing-page">
      <div className="container" style={{ maxWidth: '1040px' }}>
        <div className="pricing-header">
          <div className="section-badge">💰 Simple Pricing</div>
          <h1 className="pricing-h1">Know your rights for free.<br />Unlock the winnings with Premium.</h1>
          <p className="pricing-sub">Get the full legal blueprint and estimated settlement values.</p>
        </div>

        <div className="pricing-grid">
          {/* Free */}
          <div className="pricing-card">
            <div className="pricing-tier">Free</div>
            <div className="pricing-price">$0</div>
            <div className="pricing-cycle">forever</div>
            <ul className="pricing-features">
              {FREE_FEATURES.map((f, i) => (
                <li key={i}><span className="feat-check green">✓</span>{f}</li>
              ))}
            </ul>
            <a href="/check" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
              Start Checking Free
            </a>
          </div>

          {/* Single */}
          <div className="pricing-card">
            <div className="pricing-tier">Single Unlock</div>
            <div className="pricing-price">$2.99</div>
            <div className="pricing-cycle">per unlock</div>
            <ul className="pricing-features">
              {SINGLE_FEATURES.map((f, i) => (
                <li key={i}><span className="feat-check accent">✓</span>{f}</li>
              ))}
            </ul>
            <a href={SINGLE_LINK} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
              Get Single Unlock →
            </a>
            <p className="pricing-note">One-time. Instant access via Gumroad.</p>
          </div>

          {/* Yearly */}
          <div className="pricing-card pricing-featured">
            <div className="pricing-badge">BEST VALUE</div>
            <div className="pricing-tier">Premium Membership</div>
            <div className="pricing-price">$24.99</div>
            <div className="pricing-cycle">per year</div>
            <ul className="pricing-features">
              {YEARLY_FEATURES.map((f, i) => (
                <li key={i}><span className="feat-check green">✓</span>{f}</li>
              ))}
            </ul>
            <a href={YEARLY_LINK} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
              Get Premium Yearly →
            </a>
            <p className="pricing-note">Unlock everything. Best for professionals & active disputes.</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <h2 className="faq-title">FAQ</h2>
          <div className="faq-grid">
            {[
              { q: 'Is this real legal advice?', a: 'No — but it\'s the next best thing. It gives you the exact law that applies and clear steps, the same info you\'d get in a $300 consultation.' },
              { q: 'How does the Lawsuit valuation work?', a: 'Our AI analyzes case law precedents and statutory damages (like trebled damages in consumer fraud or FDCPA fixed penalties) to estimate what your case could be worth.' },
              { q: 'Is my situation private?', a: 'Your situation is sent to our AI for analysis. We do not sell or share your data. See our Privacy policy.' },
              { q: 'How do I get my license key?', a: 'After purchasing on Gumroad, you\'ll receive a license key by email immediately. Paste it on the result page to unlock.' }
            ].map((item, i) => (
              <div key={i} className="faq-card">
                <h3 className="faq-q">{item.q}</h3>
                <p className="faq-a">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
