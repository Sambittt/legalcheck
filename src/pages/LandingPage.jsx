import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signInWithGoogle } from '../services/firebase';

const CATEGORIES = [
  { icon: '🏠', name: 'Landlord & Tenant', desc: 'Evictions, deposits, lease violations, entry rights', laws: 'US, UK, CA, EU Codes' },
  { icon: '💼', name: 'Employment Law', desc: 'Wrongful termination, wage theft, harassment, leave', laws: 'FLSA, Employment Act, ESA' },
  { icon: '🏥', name: 'Medical & Insurance', desc: 'Billing fraud, denied claims, surprise bills, privacy', laws: 'HIPAA, GDPR, Health Acts' },
  { icon: '🚗', name: 'Consumer Protection', desc: 'Fraud, lemon laws, warranty issues, returns', laws: 'FTC, Consumer Rights Act' },
  { icon: '👮', name: 'Civil Rights', desc: 'Discrimination, police conduct, voting, disability', laws: 'Civil Rights Act, Equality Act' },
  { icon: '💳', name: 'Debt & Banking', desc: 'Debt collectors, credit reports, illegal fees', laws: 'FDCPA, Banking Directives' },
  { icon: '📱', name: 'Privacy & Data', desc: 'Recording laws, data breaches, surveillance', laws: 'GDPR, CCPA, Privacy Acts' },
  { icon: '🏪', name: 'Business & Contracts', desc: 'Breach of contract, NDA violations, IP disputes', laws: 'UCC, Common Law, Civil Codes' }
];

const STATS = [
  { num: '4', label: 'Global regions supported' },
  { num: '5,000+', label: 'Statutes & acts indexed' },
  { num: '30s', label: 'Average analysis time' },
  { num: '98%', label: 'Format accuracy rate' }
];

const SOURCES = [
  { name: 'U.S. Code (USC)', url: 'https://uscode.house.gov/' },
  { name: 'UK Legislation', url: 'https://www.legislation.gov.uk/' },
  { name: 'Justice Canada', url: 'https://laws-lois.justice.gc.ca/' },
  { name: 'EUR-Lex (Europe)', url: 'https://eur-lex.europa.eu/' },
  { name: 'Cornell Law Institute', url: 'https://www.law.cornell.edu/' },
  { name: 'CanLII Database', url: 'https://www.canlii.org/' }
];

const HOW_STEPS = [
  {
    num: '01',
    title: 'Describe Your Situation',
    desc: 'Write what happened in your own words. Select your region (US, UK, Canada, or Europe) for localized analysis.',
    detail: 'Include dates, parties involved, and what outcome you want.'
  },
  {
    num: '02',
    title: 'AI Cross-References Law',
    desc: 'Your situation is analyzed against national and regional statutes, case law precedents, and regulatory standards.',
    detail: 'We cite specific laws like the UK Employment Act or Canada Criminal Code.'
  },
  {
    num: '03',
    title: 'Get Your Legal Verdict',
    desc: 'Receive a structured analysis: verdict, applicable law, severity rating, and concrete action steps.',
    detail: 'Every response includes the exact statute so you can verify it yourself.'
  }
];

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <>
      {/* ═══ Hero ═══ */}
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-gradient" />
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot" />
              <span>Multi-Region AI • Now with Lawsuit Valuation Engine 💵</span>
            </div>
            <h1 className="hero-h1">
              Know If What Happened<br />To You Is <span className="hero-accent">Illegal</span>
            </h1>
            <p className="hero-sub">
              Describe any situation in plain English. Our AI cross-references global law to deliver a clear verdict, the exact statute, and <strong>estimated settlement winnings</strong> — in under 30 seconds.
            </p>
            <div className="hero-actions">
              <Link to="/check" className="btn btn-primary btn-lg hero-cta">
                Analyze My Situation — Free
                <span className="cta-arrow">→</span>
              </Link>
              <div className="hero-trust">
                <div className="trust-checks">
                  <span>✓ No signup</span>
                  <span>✓ No credit card</span>
                  <span>✓ Supports US, UK, CA, EU</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-preview">
            <div className="preview-card">
              <div className="preview-header">
                <span className="preview-dot red" />
                <span className="preview-dot yellow" />
                <span className="preview-dot green" />
                <span className="preview-title">LegalCheck Analysis (UK)</span>
              </div>
              <div className="preview-body">
                <div className="preview-verdict">
                  <span className="pv-emoji">🔴</span>
                  <span className="pv-text">VERDICT: Likely Illegal</span>
                </div>
                <div className="preview-law">
                  <span className="pl-label">⚖️ LAW:</span>
                  <span className="pl-text">Employment Rights Act 1996, Section 1</span>
                </div>
                <div className="preview-sev">
                  <span className="ps-label">🚨 SEVERITY:</span>
                  <span className="ps-badge">High</span>
                </div>
                <div className="preview-steps">
                  <div className="ps-step"><span className="ps-num">1</span> Request written particulars</div>
                  <div className="ps-step"><span className="ps-num">2</span> Contact ACAS for early conciliation</div>
                  <div className="ps-step"><span className="ps-num">3</span> Document all lost earnings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Stats bar ═══ */}
      <section className="stats-bar">
        <div className="container-wide">
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="stat-item">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Coverage areas ═══ */}
      <section className="section" id="coverage">
        <div className="container-wide">
          <div className="section-header">
            <div className="section-badge">📚 Global Legal Coverage</div>
            <h2 className="section-h2">What We Analyze</h2>
            <p className="section-sub">Now supporting US, UK, Canada, and European Union jurisdictions with region-specific citations.</p>
          </div>
          <div className="coverage-grid">
            {CATEGORIES.map((cat, i) => (
              <Link to="/check" key={i} className="coverage-card">
                <div className="cc-top">
                  <span className="cc-icon">{cat.icon}</span>
                  <h3 className="cc-name">{cat.name}</h3>
                </div>
                <p className="cc-desc">{cat.desc}</p>
                <div className="cc-laws">
                  <span className="cc-laws-label">Regions:</span> {cat.laws}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ How it works ═══ */}
      <section className="section section-alt" id="how">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">⚙️ Process</div>
            <h2 className="section-h2">How LegalCheck Works</h2>
            <p className="section-sub">Three steps from confusion to clarity. Every analysis cites specific statutes you can verify in your jurisdiction.</p>
          </div>
          <div className="how-timeline">
            {HOW_STEPS.map((step, i) => (
              <div key={i} className="how-step">
                <div className="how-num-wrap">
                  <div className="how-num">{step.num}</div>
                  {i < HOW_STEPS.length - 1 && <div className="how-line" />}
                </div>
                <div className="how-content">
                  <h3 className="how-title">{step.title}</h3>
                  <p className="how-desc">{step.desc}</p>
                  <p className="how-detail">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Methodology / Accuracy ═══ */}
      <section className="section">
        <div className="container-wide">
          <div className="accuracy-box">
            <div className="accuracy-content">
              <div className="section-badge">🛡️ Methodology</div>
              <h2 className="section-h2">Multi-Region Accuracy</h2>
              <p className="section-sub" style={{ textAlign: 'left', margin: '0 0 24px 0' }}>
                LegalCheck uses localized knowledge layers to ensure the AI identifies the correct laws for your jurisdiction. We don't mix up US statutes with UK acts.
              </p>
              <div className="accuracy-grid">
                <div className="acc-item">
                  <div className="acc-icon">🌍</div>
                  <h4>Jurisdiction Awareness</h4>
                  <p>When you select a region, the AI is constrained to cite only laws valid within that specific territory (e.g. GDPR for EU).</p>
                </div>
                <div className="acc-item">
                  <div className="acc-icon">⚖️</div>
                  <h4>Specific Statute Matching</h4>
                  <p>We target the exact act or code section (e.g. 42 U.S.C. § 3604 or Section 1 of the Employment Rights Act).</p>
                </div>
                <div className="acc-item">
                  <div className="acc-icon">🔍</div>
                  <h4>Zero-Hallucination Guardrails</h4>
                  <p>Strict temperature settings prevent the AI from "inventing" laws. If it's not in the database, it's not cited.</p>
                </div>
              </div>
            </div>
            <div className="accuracy-image">
              <div className="security-seal">
                <div className="seal-icon">🔒</div>
                <div className="seal-text">
                  <strong>SECURE & PRIVATE</strong>
                  <span>Global Privacy Standards</span>
                </div>
              </div>
              <div className="seal-list">
                <div className="seal-badge">GDPR COMPLIANT</div>
                <div className="seal-badge">CCPA READY</div>
                <div className="seal-badge">UK DPA 2018</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Legal sources ═══ */}
      <section className="section" id="sources">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">🔍 Verified Sources</div>
            <h2 className="section-h2">Global Legal References</h2>
            <p className="section-sub">Our AI is trained on authoritative government databases across multiple continents.</p>
          </div>
          <div className="sources-grid">
            {SOURCES.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noreferrer" className="source-card">
                <div className="sc-icon">📖</div>
                <div className="sc-name">{s.name}</div>
                <div className="sc-link">View source ↗</div>
              </a>
            ))}
          </div>
          <div className="sources-note">
            <strong>Transparency commitment:</strong> Every verdict includes the specific statute or act section so you can independently verify it on government websites like <a href="https://www.legislation.gov.uk/" target="_blank" rel="noreferrer">Legislation.gov.uk</a> or <a href="https://uscode.house.gov/" target="_blank" rel="noreferrer">USCode.gov</a>.
          </div>
        </div>
      </section>

      {/* ═══ Testimonial ═══ */}
      <section className="section section-alt">
        <div className="container">
          <div className="testimonials-wrap">
            <div className="testimonial-card-v2">
              <div className="tc-stars">★★★★★</div>
              <p className="tc-quote">"I was about to give up on my landlord situation. LegalCheck cited Cal. Civ. Code § 1954 — the exact law he was violating. I printed the result and showed it to him. Problem solved in 24 hours."</p>
              <div className="tc-author">
                <div className="tc-avatar">T</div>
                <div>
                  <div className="tc-name">Tenant in California</div>
                  <div className="tc-source">via r/legaladvice</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card-v2">
              <div className="tc-stars">★★★★★</div>
              <p className="tc-quote">"My employer in London was docking my pay for breaks. LegalCheck identified it violated the Employment Rights Act 1996 and gave me the exact steps to contact ACAS."</p>
              <div className="tc-author">
                <div className="tc-avatar">J</div>
                <div>
                  <div className="tc-name">Office Worker, London</div>
                  <div className="tc-source">UK User</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section">
        <div className="container">
          <div className="final-cta">
            <div className="fcta-badge">⚖️</div>
            <h2 className="fcta-h2">Don't wonder if it's illegal.<br />Find out in 30 seconds.</h2>
            <p className="fcta-sub">Free, unlimited checks for US, UK, Canada & EU. No signup required.</p>
            <Link to="/check" className="btn btn-primary btn-lg">Analyze My Situation →</Link>
            <div className="fcta-legal">
              ⚠️ LegalCheck provides legal information, not legal advice. Always consult a licensed attorney for your specific situation.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
