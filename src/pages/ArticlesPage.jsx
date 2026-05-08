import React, { useState, useEffect } from 'react';
import { BookOpen, TrendingUp, ShieldCheck, ArrowRight, Clock, X } from 'lucide-react';

const CASE_STUDIES = [
  {
    id: 1,
    title: "Wrongful Termination at a Tech Giant",
    category: "Employment Law",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2959d43?q=80&w=2070&auto=format&fit=crop",
    excerpt: "How a senior engineer successfully challenged a retaliatory firing after whistleblowing on safety protocols.",
    content: `
      <div style="margin-bottom: 24px;">
        <h3 style="color: var(--text); margin-bottom: 12px; font-weight: 800;">The Background</h3>
        <p>Marcus, a senior systems engineer at a prominent Silicon Valley firm, discovered critical vulnerabilities in the company's data encryption protocols. After repeatedly raising these concerns through internal channels, he was suddenly placed on a 'Performance Improvement Plan' (PIP) and terminated three weeks later.</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h3 style="color: var(--text); margin-bottom: 12px; font-weight: 800;">The Legal Challenge</h3>
        <p>The company claimed Marcus was fired for 'declining performance.' However, our analysis of the timeline showed a direct correlation between his internal whistleblower reports and the commencement of the PIP. Under the <strong>Sarbanes-Oxley Act (SOX)</strong> and various state whistleblower protection laws, retaliatory termination is strictly illegal.</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h3 style="color: var(--text); margin-bottom: 12px; font-weight: 800;">The Strategy</h3>
        <p>We advised Marcus to preserve all internal communications and performance reviews from the previous three years, which were consistently 'Exceeds Expectations.' This evidence dismantled the company's 'poor performance' narrative.</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h3 style="color: var(--text); margin-bottom: 12px; font-weight: 800;">The Outcome</h3>
        <p>Following a formal demand letter citing the specific whistleblower statutes, the company entered into private mediation. Marcus secured a settlement equivalent to 24 months of salary plus stock option acceleration, totaling over <strong>$450,000</strong>.</p>
      </div>
    `
  },
  {
    id: 2,
    title: "Medical Malpractice: The Hidden Error",
    category: "Personal Injury",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1505751172107-5739a00723a5?q=80&w=2070&auto=format&fit=crop",
    excerpt: "A standard procedure turned into a life-altering complication due to a failure in post-operative monitoring.",
    content: `
      <div style="margin-bottom: 24px;">
        <h3 style="color: var(--text); margin-bottom: 12px; font-weight: 800;">The Incident</h3>
        <p>After a routine gallbladder removal, Sarah began experiencing severe abdominal pain and a spiking fever. Despite her complaints, the attending staff dismissed her symptoms as 'normal recovery pains' and discharged her prematurely.</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h3 style="color: var(--text); margin-bottom: 12px; font-weight: 800;">The Discovery</h3>
        <p>Forty-eight hours later, Sarah was rushed to an emergency room where surgeons found a systemic infection caused by a nicked bile duct that went unnoticed. This required three corrective surgeries and a month-long hospital stay.</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h3 style="color: var(--text); margin-bottom: 12px; font-weight: 800;">Establishing Liability</h3>
        <p>The core of this case was proving a 'Breach of the Standard of Care.' By reviewing the hospital's own post-op monitoring logs, we identified that Sarah's vital signs were already showing signs of distress 4 hours before her initial discharge, yet the doctor never reviewed those specific charts.</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h3 style="color: var(--text); margin-bottom: 12px; font-weight: 800;">Final Verdict</h3>
        <p>The case went to trial. The jury found the hospital negligent in its discharge protocols. Sarah was awarded <strong>$1.2 Million</strong> for medical expenses, lost wages, and pain and suffering.</p>
      </div>
    `
  },
  {
    id: 3,
    title: "Illegal Eviction and Security Deposit Fraud",
    category: "Tenant Rights",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
    excerpt: "A landlord's attempt to 'self-help' evict a tenant during a renovation led to a massive statutory penalty.",
    content: `
      <div style="margin-bottom: 24px;">
        <h3 style="color: var(--text); margin-bottom: 12px; font-weight: 800;">The Conflict</h3>
        <p>Mr. Henderson, a landlord in New York, wanted to convert his rent-stabilized building into luxury condos. To speed up the process, he cut off the water and electricity to the remaining tenants, claiming 'emergency repairs' were needed.</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h3 style="color: var(--text); margin-bottom: 12px; font-weight: 800;">The Legal Violation</h3>
        <p>This is a classic 'Constructive Eviction.' In most jurisdictions, landlords cannot interfere with essential services to force a tenant out. Furthermore, Henderson refused to return security deposits, claiming the units were 'damaged' by the very utility shutoffs he caused.</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h3 style="color: var(--text); margin-bottom: 12px; font-weight: 800;">Taking Action</h3>
        <p>The tenants filed a joint lawsuit. We utilized local housing codes and the <strong>Warranty of Habitability</strong> statutes to show that the landlord had willfully made the premises unlivable.</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h3 style="color: var(--text); margin-bottom: 12px; font-weight: 800;">The Settlement</h3>
        <p>Faced with treble damages (triple the actual loss) under state law, the landlord settled. Each tenant received their full deposit back plus a <strong>$35,000 buyout</strong> to vacate the premises on an agreed timeline.</p>
      </div>
    `
  },
  {
    id: 4,
    title: "Corporate Data Breach: Your Right to Privacy",
    category: "Cyber Law",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Understanding compensation rights under GDPR and CCPA after a major retail data leak.",
    content: `
      <div style="margin-bottom: 24px;">
        <h3 style="color: var(--text); margin-bottom: 12px; font-weight: 800;">The Breach</h3>
        <p>A global fashion retailer suffered a sophisticated SQL injection attack, exposing the names, addresses, and encrypted credit card details of 5 million customers across Europe and California.</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h3 style="color: var(--text); margin-bottom: 12px; font-weight: 800;">Statutory Protections</h3>
        <p>Under the <strong>General Data Protection Regulation (GDPR)</strong> in Europe and the <strong>California Consumer Privacy Act (CCPA)</strong>, companies have a strict duty to implement 'reasonable security measures.' The retailer's failure to patch a known vulnerability for 6 months was deemed a 'gross negligence.'</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h3 style="color: var(--text); margin-bottom: 12px; font-weight: 800;">The Claim Process</h3>
        <p>Unlike personal injury cases, privacy breaches often involve 'Statutory Damages' where you don't have to prove a specific financial loss to receive a set amount of compensation.</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h3 style="color: var(--text); margin-bottom: 12px; font-weight: 800;">The Result</h3>
        <p>The company was fined €20 Million by regulators and was forced to pay out a class-action settlement. Affected users who filed a claim received between <strong>$150 and $750 each</strong>, depending on whether their identity was actually stolen.</p>
      </div>
    `
  }
];

const ArticlesPage = () => {
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    document.title = "Case Studies & Outcomes | LegalCheck";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="articles-page section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Success Stories</div>
          <h1 className="section-h2">Real Outcomes. Real Results.</h1>
          <p className="section-sub">Explore how LegalCheck AI has helped users navigate complex legal landscapes and secure the compensation they deserve.</p>
        </div>

        <div className="articles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
          {CASE_STUDIES.map((item) => (
            <div key={item.id} className="article-card glass" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="article-img" />
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge-sm" style={{ background: 'var(--bg3)', color: 'var(--accent)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>{item.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {item.readTime}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px', lineHeight: '1.4' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text3)', marginBottom: '20px', flex: 1 }}>{item.excerpt}</p>
                <button 
                  onClick={() => setSelectedCase(item)}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Read Full Case Study <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCase && (
        <div className="modal-overlay" onClick={() => setSelectedCase(null)}>
          <div className="modal glass" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', maxHeight: '95vh', overflowY: 'auto', padding: '0', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
            <div style={{ height: '350px', position: 'relative', overflow: 'hidden' }}>
              <img src={selectedCase.image} alt={selectedCase.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button onClick={() => setSelectedCase(null)} style={{ position: 'absolute', top: '20px', right: '20px', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', zIndex: 10 }}>
                <X size={20} />
              </button>
              <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '40px', background: 'linear-gradient(to top, var(--bg), transparent)', zIndex: 5 }}>
                <span className="badge-sm" style={{ background: 'var(--accent)', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800 }}>{selectedCase.category}</span>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 900, marginTop: '12px', color: 'var(--text)', letterSpacing: '-0.02em' }}>{selectedCase.title}</h2>
              </div>
            </div>
            <div style={{ padding: '40px', color: 'var(--text2)', lineHeight: '1.8' }}>
              <div className="article-content-rich" dangerouslySetInnerHTML={{ __html: selectedCase.content }} />
              <div style={{ marginTop: '40px', padding: '32px', background: 'var(--bg2)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
                <h4 style={{ marginBottom: '8px', color: 'var(--text)', fontSize: '1.2rem', fontWeight: 800 }}>Have a similar legal situation?</h4>
                <p style={{ fontSize: '0.95rem', marginBottom: '24px', color: 'var(--text3)' }}>Our AI engine can analyze your specific circumstances and provide a detailed verdict in under 30 seconds.</p>
                <button onClick={() => window.location.href='/check'} className="btn btn-primary btn-lg" style={{ width: '100%', maxWidth: '300px' }}>Start Free Analysis</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
