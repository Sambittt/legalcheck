import React, { useEffect } from 'react';
import { Scale, ArrowRight, Shield, Globe, Clock, CheckCircle2, Zap, Crown, UserCheck, Gavel, FileText, Lock } from 'lucide-react';

const CATEGORIES = [
  { icon: <Shield size={24} />, name: "Housing & Tenant", desc: "Security deposits, illegal evictions, and maintenance disputes." },
  { icon: <Scale size={24} />, name: "Employment Law", desc: "Wrongful termination, unpaid wages, and workplace harassment." },
  { icon: <Globe size={24} />, name: "Consumer Rights", desc: "Product liability, misleading advertising, and refund fraud." },
];

const LandingPage = () => {
  useEffect(() => {
    document.title = "LegalCheck | Professional AI Legal Analysis";
  }, []);

  return (
    <div className="landing-page">
      {/* ═══ Hero ═══ */}
      <section className="hero" style={{ background: 'var(--bg2)', overflow: 'hidden' }}>
        <div className="hero-mesh" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(var(--accent-rgb), 0.25), transparent 40%), radial-gradient(circle at 30% 70%, rgba(var(--accent-rgb), 0.1), transparent 50%)', zIndex: 0 }} />
        <div className="hero-img-bg" style={{ backgroundImage: 'url("/courtroom.png")', opacity: 0.15, filter: 'grayscale(100%) brightness(0.5)' }} />
        <div className="hero-gradient" style={{ background: 'linear-gradient(to right, var(--bg2) 30%, transparent 100%)' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div className="fade-in-up">
              <div className="section-badge" style={{ background: 'rgba(var(--accent-rgb), 0.1)', borderColor: 'rgba(var(--accent-rgb), 0.2)', color: 'var(--accent)' }}>
                <Scale size={14} /> Global AI Legal Standard
              </div>
              <h1 className="hero-h1">
                Legal Intelligence <br />
                <span className="hero-accent">Redefined.</span>
              </h1>
              <p className="hero-sub" style={{ fontSize: '1.25rem', color: 'var(--text2)', maxWidth: '600px' }}>
                The world's most advanced AI engine for immediate statutory analysis. Get a clear verdict and settlement valuation in under 30 seconds.
              </p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <button onClick={() => window.location.href='/check'} className="btn btn-primary btn-lg">
                  Analyze Case <ArrowRight size={22} />
                </button>
                <button onClick={() => window.location.href='/articles'} className="btn btn-secondary btn-lg">
                  View Outcomes
                </button>
              </div>
            </div>

            {/* Analysis Card */}
            <div className="hero-card-container fade-in" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="glass" style={{ padding: '32px', borderRadius: 'var(--r-lg)', border: '1px solid var(--glass-border)', width: '100%', maxWidth: '400px', boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>Current Analysis</span>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2s infinite' }} />
                </div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Wrongful Termination Case</h4>
                <div style={{ width: '100%', height: '4px', background: 'var(--bg3)', borderRadius: '2px', marginBottom: '24px', overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', background: 'var(--accent)', borderRadius: '2px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '4px' }}>Est. Payout</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)' }}>$8,500</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '4px' }}>Verdict</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--green)' }}>Likely Illegal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Core Categories ═══ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Coverage</div>
            <h2 className="section-h2">What Can We Check?</h2>
            <p className="section-sub">From housing disputes to employment law, our AI covers the most critical legal situations you face daily.</p>
          </div>
          <div className="grid-3">
            {CATEGORIES.map((cat, i) => (
              <div key={i} className="glass" style={{ padding: '32px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', transition: 'all 0.3s' }}>
                <div style={{ color: 'var(--accent)', marginBottom: '20px' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>{cat.name}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text3)' }}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Problem/Solution (Process) ═══ */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="section-badge">How it works</div>
              <h2 className="section-h2" style={{ textAlign: 'left' }}>Three Steps to Clarity</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '40px' }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'var(--accent)', color: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800 }}>1</div>
                  <div>
                    <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Describe Your Situation</h4>
                    <p style={{ color: 'var(--text3)', fontSize: '0.95rem' }}>Enter what happened in plain English. No legal jargon required. Tell us who, what, and where.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'var(--accent)', color: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800 }}>2</div>
                  <div>
                    <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>AI Cross-References the Law</h4>
                    <p style={{ color: 'var(--text3)', fontSize: '0.95rem' }}>Our system analyzes your story against thousands of indexed government statutes and acts for your specific region.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'var(--accent)', color: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800 }}>3</div>
                  <div>
                    <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Get Your Legal Blueprint</h4>
                    <p style={{ color: 'var(--text3)', fontSize: '0.95rem' }}>Receive an instant verdict, estimated payout range, and a step-by-step action plan to win your case.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fade-in" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="glass" style={{ padding: '40px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', maxWidth: '440px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', padding: '12px 24px', background: 'var(--accent)', color: '#fff', borderRadius: '12px', fontWeight: 800, fontSize: '1.25rem', boxShadow: 'var(--shadow-lg)' }}>$8,400</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UserCheck /></div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Success Story</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>Tenant Dispute • London</div>
                  </div>
                </div>
                <p style={{ fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--text2)', lineHeight: '1.6' }}>"I was about to give up on my deposit, but LegalCheck gave me the exact statute to cite. My landlord paid in 24 hours."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Trust Banner ═══ */}
      <section className="section" style={{ padding: '60px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '40px', opacity: 0.6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}><Lock size={20} /> 256-Bit Encrypted</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}><CheckCircle2 size={20} /> GDPR Compliant</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}><Gavel size={20} /> Statutory Logic</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}><FileText size={20} /> Instant Reports</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
