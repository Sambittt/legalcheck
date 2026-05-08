import React from 'react';
import { Shield, Users, Target, Scale } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="section" style={{ paddingBottom: '0' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Our Story</div>
            <h1 className="section-h2">Democratizing Legal Intelligence</h1>
            <p className="section-sub">We believe that knowing your rights shouldn't cost $500 an hour. LegalCheck was built to bridge the gap between complex law and everyday clarity.</p>
          </div>
          
          <div className="hero-img-bg" style={{ position: 'relative', height: '400px', width: '100%', opacity: '0.8', borderRadius: 'var(--r-lg)', overflow: 'hidden', maskImage: 'none', WebkitMaskImage: 'none', backgroundImage: 'url("/consultation.png")' }}>
            <div className="hero-gradient" style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h2 className="section-h2" style={{ textAlign: 'left', fontSize: '2rem' }}>Our Mission</h2>
              <p style={{ color: 'var(--text2)', fontSize: '1.1rem', marginBottom: '24px' }}>
                Every day, millions of people face illegal evictions, workplace harassment, and consumer fraud. Most never take action because they don't know the specific law that protects them or they fear the cost of a lawyer.
              </p>
              <p style={{ color: 'var(--text2)', fontSize: '1.1rem' }}>
                LegalCheck uses state-of-the-art AI to identify potential violations instantly. We provide the exact statutes, action steps, and settlement estimates needed to level the playing field.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ background: 'var(--bg2)', padding: '32px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
                <Shield className="text-accent" size={32} style={{ marginBottom: '16px' }} />
                <h4 style={{ marginBottom: '8px' }}>Security First</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>Your data is encrypted and never sold to third parties.</p>
              </div>
              <div style={{ background: 'var(--bg2)', padding: '32px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
                <Scale className="text-accent" size={32} style={{ marginBottom: '16px' }} />
                <h4 style={{ marginBottom: '8px' }}>Global Reach</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>Support for US, UK, Canada, and EU jurisdictions.</p>
              </div>
              <div style={{ background: 'var(--bg2)', padding: '32px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
                <Users className="text-accent" size={32} style={{ marginBottom: '16px' }} />
                <h4 style={{ marginBottom: '8px' }}>Human Centered</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>Designed to empower people, not replace expert counsel.</p>
              </div>
              <div style={{ background: 'var(--bg2)', padding: '32px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
                <Target className="text-accent" size={32} style={{ marginBottom: '16px' }} />
                <h4 style={{ marginBottom: '8px' }}>High Precision</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>Trained on actual government statutes and case law.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
