import React, { useState, useEffect } from 'react';
import { BookOpen, TrendingUp, ShieldCheck, ArrowRight, Clock, X, Scale, Shield, Database, ShoppingCart, UserX, Home } from 'lucide-react';

const CASE_STUDIES = [
  {
    id: 1,
    title: "Wrongful Termination at a Tech Giant",
    category: "Employment Law",
    icon: <UserX size={20} />,
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2959d43?q=80&w=2070&auto=format&fit=crop",
    excerpt: "How a senior engineer successfully challenged a retaliatory firing after whistleblowing on safety protocols.",
    content: `
      <div class="article-section">
        <h3>The Background</h3>
        <p>Marcus, a senior systems engineer at a prominent Silicon Valley firm, discovered critical vulnerabilities in the company's data encryption protocols. After repeatedly raising these concerns through internal channels, he was suddenly placed on a 'Performance Improvement Plan' (PIP) and terminated three weeks later.</p>
      </div>
      <div class="article-section">
        <h3>The Legal Challenge</h3>
        <p>The company claimed Marcus was fired for 'declining performance.' However, our analysis of the timeline showed a direct correlation between his internal whistleblower reports and the commencement of the PIP. Under the <strong>Sarbanes-Oxley Act (SOX)</strong> and various state whistleblower protection laws, retaliatory termination is strictly illegal.</p>
      </div>
      <div class="article-section">
        <h3>The Outcome</h3>
        <p>Marcus secured a settlement equivalent to 24 months of salary plus stock option acceleration, totaling over <strong>$450,000</strong>.</p>
      </div>
    `
  },
  {
    id: 2,
    title: "Medical Malpractice: The Hidden Error",
    category: "Personal Injury",
    icon: <ShieldCheck size={20} />,
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1505751172107-5739a00723a5?q=80&w=2070&auto=format&fit=crop",
    excerpt: "A standard procedure turned into a life-altering complication due to a failure in post-operative monitoring.",
    content: `
      <div class="article-section">
        <h3>The Incident</h3>
        <p>After a routine gallbladder removal, Sarah began experiencing severe abdominal pain and a spiking fever. Despite her complaints, the attending staff dismissed her symptoms as 'normal recovery pains' and discharged her prematurely.</p>
      </div>
      <div class="article-section">
        <h3>Establishing Liability</h3>
        <p>The core of this case was proving a 'Breach of the Standard of Care.' By reviewing the hospital's own post-op monitoring logs, we identified that Sarah's vital signs were already showing signs of distress 4 hours before her initial discharge.</p>
      </div>
      <div class="article-section">
        <h3>Final Verdict</h3>
        <p>The jury found the hospital negligent in its discharge protocols. Sarah was awarded <strong>$1.2 Million</strong> for medical expenses, lost wages, and pain and suffering.</p>
      </div>
    `
  },
  {
    id: 3,
    title: "Illegal Eviction and Deposit Fraud",
    category: "Tenant Rights",
    icon: <Home size={20} />,
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
    excerpt: "A landlord's attempt to 'self-help' evict a tenant during a renovation led to a massive statutory penalty.",
    content: `
      <div class="article-section">
        <h3>The Conflict</h3>
        <p>A landlord wanted to convert his rent-stabilized building into luxury condos. He cut off the water and electricity to the remaining tenants, claiming 'emergency repairs' were needed.</p>
      </div>
      <div class="article-section">
        <h3>The Legal Violation</h3>
        <p>This is a classic 'Constructive Eviction.' Landlords cannot interfere with essential services to force a tenant out. Furthermore, Henderson refused to return security deposits.</p>
      </div>
      <div class="article-section">
        <h3>The Settlement</h3>
        <p>Faced with treble damages under state law, the landlord settled. Each tenant received their full deposit back plus a <strong>$35,000 buyout</strong>.</p>
      </div>
    `
  },
  {
    id: 4,
    title: "Consumer Fraud: Online Subscription Trap",
    category: "Consumer Law",
    icon: <ShoppingCart size={20} />,
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
    excerpt: "How a retail site's 'dark patterns' led to a class-action settlement for 200,000 customers.",
    content: `
      <div class="article-section">
        <h3>The Scam</h3>
        <p>A popular fashion site used 'dark patterns' to trick users into a $49.99/month subscription during checkout, hidden under a 'Free Shipping' toggle.</p>
      </div>
      <div class="article-section">
        <h3>FTC Enforcement</h3>
        <p>Under the <strong>Restore Online Shoppers' Confidence Act (ROSCA)</strong>, companies must provide clear disclosure and a simple cancellation method. This site did neither.</p>
      </div>
      <div class="article-section">
        <h3>Resolution</h3>
        <p>The company was forced to refund $15 Million to affected customers. Individual settlements averaged <strong>$120 per user</strong>.</p>
      </div>
    `
  },
  {
    id: 5,
    title: "Debt Collection Harassment",
    category: "Financial Law",
    icon: <Scale size={20} />,
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    excerpt: "A collection agency's persistent calls to a debtor's workplace resulted in a significant FDCPA penalty.",
    content: `
      <div class="article-section">
        <h3>The Harassment</h3>
        <p>A collection agency called Robert at his workplace 15 times in a single day, despite being told that his employer prohibited personal calls.</p>
      </div>
      <div class="article-section">
        <h3>FDCPA Violation</h3>
        <p>The <strong>Fair Debt Collection Practices Act (FDCPA)</strong> prohibits calling a debtor at work if the agency knows the employer forbids it, and prohibits 'harassing' frequency.</p>
      </div>
      <div class="article-section">
        <h3>Outcome</h3>
        <p>Robert sued the agency and won the maximum <strong>$1,000 statutory damage</strong> plus $15,000 for emotional distress and all attorney fees.</p>
      </div>
    `
  },
  {
    id: 6,
    title: "Data Breach: Your Right to Privacy",
    category: "Privacy Law",
    icon: <Database size={20} />,
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Understanding compensation rights under GDPR and CCPA after a major retail data leak.",
    content: `
      <div class="article-section">
        <h3>The Breach</h3>
        <p>A global fashion retailer exposed the names and addresses of 5 million customers. Failure to patch a known vulnerability for 6 months was deemed gross negligence.</p>
      </div>
      <div class="article-section">
        <h3>The Result</h3>
        <p>The company was forced to pay out a class-action settlement. Affected users who filed a claim received between <strong>$150 and $750 each</strong>.</p>
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

        <div className="grid-3" style={{ gap: '32px' }}>
          {CASE_STUDIES.map((item) => (
            <div key={item.id} className="article-card glass fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
              <div style={{ height: '220px', overflow: 'hidden', background: 'var(--bg3)', position: 'relative' }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  className="article-img" 
                />
                <div style={{ position: 'absolute', top: '16px', left: '16px', padding: '8px 12px', background: 'rgba(255,255,255,0.9)', color: 'var(--accent)', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(4px)' }}>
                  {item.icon} {item.category}
                </div>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {item.readTime}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px', lineHeight: '1.4' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text3)', marginBottom: '24px', flex: 1, lineHeight: '1.6' }}>{item.excerpt}</p>
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
          <div className="modal glass" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', padding: '0', overflow: 'hidden' }}>
            <div style={{ height: '350px', position: 'relative' }}>
              <img src={selectedCase.image} alt={selectedCase.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button onClick={() => setSelectedCase(null)} style={{ position: 'absolute', top: '20px', right: '20px', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', zIndex: 10 }}>
                <X size={20} />
              </button>
              <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '40px', background: 'linear-gradient(to top, var(--bg), transparent)', zIndex: 5 }}>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.02em' }}>{selectedCase.title}</h2>
              </div>
            </div>
            <div style={{ padding: '40px', maxHeight: '55vh', overflowY: 'auto' }}>
              <div className="article-content-rich" dangerouslySetInnerHTML={{ __html: selectedCase.content }} />
              <div style={{ marginTop: '40px', padding: '32px', background: 'var(--bg2)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
                <h4 style={{ marginBottom: '8px', color: 'var(--text)', fontSize: '1.2rem', fontWeight: 800 }}>Similar Situation?</h4>
                <p style={{ fontSize: '0.95rem', marginBottom: '24px', color: 'var(--text3)' }}>Get your instant AI verdict in under 30 seconds.</p>
                <button onClick={() => window.location.href='/check'} className="btn btn-primary" style={{ padding: '12px 32px' }}>Start Free Analysis</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
