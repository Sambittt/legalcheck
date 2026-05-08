import React from 'react';
import { BookOpen, TrendingUp, ShieldCheck, ArrowRight, Clock } from 'lucide-react';

const CASE_STUDIES = [
  {
    id: 1,
    title: "How one tenant recovered a $5,200 security deposit",
    category: "Housing Law",
    readTime: "4 min",
    excerpt: "A San Francisco tenant used LegalCheck to identify specific CA Civil Code violations that forced a corporate landlord to settle without a trial.",
    outcome: "$5,200 Recovered",
    image: "/courtroom.png"
  },
  {
    id: 2,
    title: "Stopping a wrongful dismissal in London",
    category: "Employment",
    readTime: "6 min",
    excerpt: "After being fired without notice, an IT consultant cited the UK Employment Rights Act 1996 indexed by LegalCheck to win a 6-month severance package.",
    outcome: "6-Month Severance",
    image: "/consultation.png"
  },
  {
    id: 3,
    title: "Fighting medical billing fraud in Texas",
    category: "Healthcare",
    readTime: "5 min",
    excerpt: "A surprise $12,000 hospital bill was reduced to zero after identifying HIPAA and No Surprises Act violations using our AI analysis engine.",
    outcome: "$12,000 Saved",
    image: "/gavel.png"
  },
  {
    id: 4,
    title: "The GDPR breach that led to a €2,500 payout",
    category: "Data Privacy",
    readTime: "3 min",
    excerpt: "An EU citizen used LegalCheck to draft a formal complaint regarding illegal data harvesting, resulting in an out-of-court settlement from a tech firm.",
    outcome: "€2,500 Payout",
    image: "/consultation.png"
  }
];

export default function ArticlesPage() {
  return (
    <div className="articles-page">
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Case Studies & Research</div>
            <h1 className="section-h2">Real Outcomes, Real People</h1>
            <p className="section-sub">Research and case studies on how individuals have successfully used legal information to save money and win disputes.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
            {CASE_STUDIES.map(caseStudy => (
              <div key={caseStudy.id} className="glass" style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '200px', backgroundImage: `url(${caseStudy.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--accent)', color: '#fff', padding: '4px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700 }}>
                    {caseStudy.category}
                  </div>
                </div>
                <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '12px', color: 'var(--text3)', fontSize: '0.75rem', marginBottom: '16px', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {caseStudy.readTime}</span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={12} /> {caseStudy.outcome}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', lineHeight: '1.4' }}>{caseStudy.title}</h3>
                  <p style={{ color: 'var(--text2)', fontSize: '0.9rem', marginBottom: '24px', flex: 1 }}>{caseStudy.excerpt}</p>
                  <a href={`/articles/${caseStudy.id}`} className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
                    Read Case Study <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <div className="section-badge">Methodology</div>
              <h2 className="section-h2" style={{ textAlign: 'left', fontSize: '2rem' }}>How we conduct our research</h2>
              <p style={{ color: 'var(--text2)', marginBottom: '24px' }}>
                Our research team analyzes thousands of public case records and settlement reports to identify winning patterns. We focus on disputes that are often too small for big law firms but critical for individuals.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <ShieldCheck className="text-green" size={20} />
                  <span style={{ fontSize: '0.95rem' }}>Verified statutory citations for every case.</span>
                </li>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <ShieldCheck className="text-green" size={20} />
                  <span style={{ fontSize: '0.95rem' }}>Analysis of settlement vs. trial outcomes.</span>
                </li>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <ShieldCheck className="text-green" size={20} />
                  <span style={{ fontSize: '0.95rem' }}>Real-world negotiation playbooks derived from successful cases.</span>
                </li>
              </ul>
            </div>
            <div style={{ background: 'var(--bg)', padding: '48px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <BookOpen className="text-accent" size={48} style={{ marginBottom: '24px' }} />
              <h3 style={{ marginBottom: '16px' }}>Submit Your Story</h3>
              <p style={{ color: 'var(--text3)', marginBottom: '32px' }}>Did LegalCheck help you win a case or save money? Share your experience with our community.</p>
              <button className="btn btn-primary">Share My Experience</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
