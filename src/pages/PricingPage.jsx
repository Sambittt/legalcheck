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
  'Case Strength Score (1-100)',
  'Win Probability percentage',
  'Similar Cases & Outcomes',
  'Settlement value estimate',
  'Evidence checklist',
  'Step-by-step resolution plan'
];

const YEARLY_FEATURES = [
  'Everything above — unlimited',
  'Ready-to-send Demand Letter drafts',
  'Negotiation Playbook (5-step tactics)',
  'Risk Matrix (4 scenario comparison)',
  'Deadline Countdown with statute of limitations',
  'Lawyer Cost Estimator',
  'Common Mistakes to Avoid',
  'New features added monthly',
  '$24.99/year — less than $2.10/month'
];

import { useEffect } from 'react';
import { CreditCard, Star, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function PricingPage() {
  useEffect(() => {
    document.title = "Pricing & Premium Plans — LegalCheck AI";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Unlock 12-section premium legal intelligence reports, demand letters, settlement valuations, and negotiation playbooks. Affordable plans for every legal need.");
    }
  }, []);
  return (
    <div className="pricing-page">
      <div className="container" style={{ maxWidth: '1040px' }}>
        <div className="pricing-header">
          <div className="section-badge">Simple Pricing</div>
          <h1 className="pricing-h1">Know your rights for free.<br />Unlock the full legal strategy with Premium.</h1>
          <p className="pricing-sub">12-section intelligence reports · Demand letters · Settlement valuations · Negotiation playbooks</p>
        </div>

        <div className="pricing-grid">
          {/* Free */}
          <div className="pricing-card">
            <div className="pricing-tier">Free</div>
            <div className="pricing-price">$0</div>
            <div className="pricing-cycle">forever</div>
            <ul className="pricing-features">
              {FREE_FEATURES.map((f, i) => (
                <li key={i}><Check size={14} className="feat-icon green" />{f}</li>
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
                <li key={i}><Check size={14} className="feat-icon accent" />{f}</li>
              ))}
            </ul>
            <a href={SINGLE_LINK} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
              Get Single Unlock <ArrowRight size={18} />
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
                <li key={i}><Check size={14} className="feat-icon green" />{f}</li>
              ))}
            </ul>
            <a href={YEARLY_LINK} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
              Get Premium Yearly <ArrowRight size={18} />
            </a>
            <p className="pricing-note">Unlock everything. Best for professionals & active disputes.</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <h2 className="faq-title">FAQ</h2>
          <div className="faq-grid">
            {[
              { q: 'Is this real legal advice?', a: 'No — but our Premium reports deliver the same depth of analysis you\'d get in a $500 attorney consultation: case strength scoring, win probability, settlement valuations, and a ready-to-send demand letter.' },
              { q: 'What\'s in the Premium Report?', a: '12 sections: Case Strength Score, Win Probability, Similar Cases, Demand Letter Draft, Evidence Checklist, Negotiation Playbook, Risk Matrix, Deadline Countdown, Settlement Value, Lawyer Cost Estimator, Step-by-Step Resolution, and Common Mistakes to Avoid.' },
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
