import React, { useState } from 'react';
import { BookOpen, TrendingUp, ShieldCheck, ArrowRight, Clock, X } from 'lucide-react';

const CASE_STUDIES = [
  {
    id: 1,
    title: "How Sarah J. Recovered a $5,200 Security Deposit",
    category: "Housing Law",
    readTime: "4 min",
    summary: "A San Francisco tenant used LegalCheck to identify specific CA Civil Code violations that forced a corporate landlord to settle without a trial.",
    outcome: "$5,200 Recovered",
    content: "Sarah was facing an illegal deduction from her security deposit for 'painting' and 'cleaning' that should have been wear and tear. Our AI identified CA Civil Code § 1950.5 violations. She sent a formal demand citing the code, and the landlord returned the full amount within 48 hours to avoid the mandatory treble damages (3x penalty) she was entitled to under state law."
  },
  {
    id: 2,
    title: "Stopping a Wrongful Dismissal in London",
    category: "Employment",
    readTime: "6 min",
    summary: "After being fired without notice, an IT consultant cited the UK Employment Rights Act 1996 to win a 6-month severance package.",
    outcome: "6-Month Severance",
    content: "Marcus was terminated after flagging security vulnerabilities in his company's software. LegalCheck identified this as 'Whistleblowing' protected under the Public Interest Disclosure Act (PIDA). By using the specific legal language provided by our tool, Marcus successfully negotiated a comprehensive severance package that covered 6 months of pay, far exceeding the initial 'no-notice' termination offer."
  },
  {
    id: 3,
    title: "Fighting Medical Billing Fraud in Texas",
    category: "Healthcare",
    readTime: "5 min",
    summary: "A surprise $12,000 hospital bill was reduced to zero after identifying HIPAA and No Surprises Act violations.",
    outcome: "$12,000 Saved",
    content: "Elena received an 'out-of-network' bill for emergency anesthesia services. LegalCheck flagged this as a direct violation of the federal No Surprises Act which prohibits balance billing for emergency care. Armed with the specific act section, Elena disputed the charges with the hospital's billing department. After three days of review, the hospital admitted the error and canceled the entire $12,000 balance."
  }
];

export default function ArticlesPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="articles-page">
      <section className="section" style={{ background: 'var(--bg2)', paddingBottom: '120px' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Success Stories</div>
            <h1 className="section-h2">Real Results. Real Impact.</h1>
            <p className="section-sub">Read how everyday people are using AI to defend their rights and recover money that belongs to them.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {CASE_STUDIES.map((study) => (
              <div key={study.id} className="glass card" style={{ padding: '40px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', background: 'var(--bg3)', padding: '4px 12px', borderRadius: '100px' }}>{study.category}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--green)' }}>{study.outcome}</span>
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', lineHeight: '1.3' }}>{study.title}</h3>
                <p style={{ color: 'var(--text3)', fontSize: '0.95rem', marginBottom: '24px', flex: 1 }}>{study.summary}</p>
                <button 
                  onClick={() => setSelected(study)}
                  className="btn btn-secondary btn-sm" 
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Read Full Story <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Full Story */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" style={{ maxWidth: '700px' }} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}><X size={20} /></button>
            <div className="section-badge">{selected.category} Case Study</div>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '24px', fontWeight: 800 }}>{selected.title}</h2>
            <div style={{ background: 'var(--green-bg)', color: 'var(--green)', padding: '16px 24px', borderRadius: 'var(--r)', fontWeight: 800, marginBottom: '32px', display: 'inline-block' }}>
              Final Outcome: {selected.outcome}
            </div>
            <div style={{ color: 'var(--text2)', lineHeight: '1.8', fontSize: '1.1rem' }}>
              {selected.content}
            </div>
            <div style={{ marginTop: '40px', padding: '32px', background: 'var(--bg2)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>How LegalCheck Helped:</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text3)', lineHeight: '1.6' }}>By identifying the specific statute and providing the exact legal language for the dispute, we gave the user the authority needed to force a settlement without expensive litigation.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
