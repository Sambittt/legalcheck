import { useEffect } from 'react';
import { CreditCard, Star, ArrowRight, ShieldCheck, Check, Zap, Crown } from 'lucide-react';

const FREE_FEATURES = [
  'Basic legal analysis',
  'Statute citation',
  'Severity rating',
  'Action steps',
  'US, UK, CA, EU support'
];

const SINGLE_FEATURES = [
  'All Free features',
  'Lawsuit Valuation Engine',
  'Demand Letter Draft',
  'Negotiation Playbook',
  'Risk Matrix analysis'
];

const YEARLY_FEATURES = [
  'Unlimited premium reports',
  'Priority support',
  'Case history tracking',
  'Early access features',
  'Download as PDF'
];

const SINGLE_LINK = import.meta.env.VITE_GUMROAD_SINGLE_LINK || 'https://sambitpathfinder.gumroad.com/l/xbqtvn';
const YEARLY_LINK = import.meta.env.VITE_GUMROAD_LIFETIME_LINK || 'https://sambitpathfinder.gumroad.com/l/kussdz';

export default function PricingPage() {
  useEffect(() => {
    document.title = "Pricing — Professional Legal Intelligence";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pricing-page section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Pricing Plans</div>
          <h1 className="section-h2">Transparent Legal Intelligence</h1>
          <p className="section-sub">Choose the level of analysis you need. From free basic checks to comprehensive premium reports.</p>
        </div>

        <div className="grid-3" style={{ gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Free Plan */}
          <div className="glass" style={{ padding: '48px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '8px' }}>Basic</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900 }}>$0</span>
                <span style={{ color: 'var(--text3)' }}>/forever</span>
              </div>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', flex: 1 }}>
              {FREE_FEATURES.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text2)' }}>
                  <Check size={16} className="text-green" /> {f}
                </li>
              ))}
            </ul>
            <a href="/check" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Get Started</a>
          </div>

          {/* Premium Plan */}
          <div className="glass" style={{ padding: '48px', borderRadius: 'var(--r-lg)', border: '2px solid var(--accent)', display: 'flex', flexDirection: 'column', position: 'relative', background: 'var(--bg)' }}>
            <div style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#fff', padding: '4px 16px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800 }}>MOST POPULAR</div>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={20} className="text-accent" /> Premium
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900 }}>$2.99</span>
                <span style={{ color: 'var(--text3)' }}>/per report</span>
              </div>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', flex: 1 }}>
              {SINGLE_FEATURES.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text2)' }}>
                  <Check size={16} className="text-accent" /> {f}
                </li>
              ))}
            </ul>
            <a href={SINGLE_LINK} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Unlock Now <ArrowRight size={18} /></a>
          </div>

          {/* Yearly Plan */}
          <div className="glass" style={{ padding: '48px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Crown size={20} className="text-orange" /> Unlimited
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900 }}>$24.99</span>
                <span style={{ color: 'var(--text3)' }}>/year</span>
              </div>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', flex: 1 }}>
              {YEARLY_FEATURES.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text2)' }}>
                  <Check size={16} className="text-green" /> {f}
                </li>
              ))}
            </ul>
            <a href={YEARLY_LINK} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Go Unlimited</a>
          </div>

        </div>
      </div>
    </div>
  );
}
