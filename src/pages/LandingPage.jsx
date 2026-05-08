import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  Briefcase, 
  Hospital, 
  ShoppingCart, 
  ShieldCheck, 
  CreditCard, 
  Database, 
  Building2, 
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Search,
  BookOpen,
  Scale,
  MessageSquare,
  TrendingUp,
  Star,
  Globe,
  Users
} from 'lucide-react';

const CATEGORIES = [
  { icon: <Home size={20} />, name: 'Landlord & Tenant Rights', desc: 'Illegal evictions, security deposit disputes, lease violations.' },
  { icon: <Briefcase size={20} />, name: 'Employment & Labor Law', desc: 'Wrongful termination, unpaid wages, workplace harassment.' },
  { icon: <Hospital size={20} />, name: 'Medical & Healthcare Rights', desc: 'Medical billing fraud, surprise bills, HIPAA violations.' },
  { icon: <ShoppingCart size={20} />, name: 'Consumer Protection', desc: 'Consumer fraud, lemon laws, warranty disputes.' },
  { icon: <ShieldCheck size={20} />, name: 'Civil Rights & Privacy', desc: 'Police misconduct, ADA compliance, racial discrimination.' },
  { icon: <CreditCard size={20} />, name: 'Debt & Banking', desc: 'Illegal credit card fees, FDCPA violations, credit report errors.' },
  { icon: <Database size={20} />, name: 'Digital Data Law', desc: 'Data breaches, illegal recording, GDPR compliance.' },
  { icon: <Building2 size={20} />, name: 'Small Business', desc: 'Breach of contract, NDA disputes, trademark help.' }
];

const REVIEWS = [
  { name: "Sarah J.", role: "Tenant", text: "Got my $2,000 deposit back within 48 hours after citing the specific statute LegalCheck found.", stars: 5 },
  { name: "Marcus T.", role: "IT Consultant", text: "Won a 4-month severance package by identifying a wrongful dismissal clause I didn't know existed.", stars: 5 },
  { name: "Elena R.", role: "Small Business Owner", text: "Saved $3,500 in medical bills by identifying hospital coding errors. Life saver.", stars: 5 }
];

export default function LandingPage() {
  useEffect(() => {
    document.title = "LegalCheck — Professional AI Legal Intelligence";
  }, []);

  return (
    <div className="landing-page">
      {/* ═══ Hero ═══ */}
      <section className="hero" style={{ paddingTop: '200px', paddingBottom: '140px' }}>
        <div className="hero-mesh" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(var(--accent-rgb), 0.15), transparent 50%), radial-gradient(circle at 30% 70%, rgba(var(--green-rgb), 0.05), transparent 50%)', zIndex: -1 }} />
        <div className="hero-img-bg" style={{ backgroundImage: 'url("/courtroom.png")', opacity: 0.2 }} />
        <div className="hero-gradient" />
        
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div className="fade-in-up">
              <div className="section-badge" style={{ background: 'rgba(var(--accent-rgb), 0.1)', borderColor: 'rgba(var(--accent-rgb), 0.2)', color: 'var(--accent)' }}>
                <Scale size={14} /> Global AI Legal Standard
              </div>
              <h1 className="hero-h1" style={{ fontSize: '5.5rem', marginBottom: '32px' }}>
                Legal Intelligence <br />
                <span className="hero-accent">Redefined.</span>
              </h1>
              <p className="hero-sub" style={{ fontSize: '1.4rem', lineHeight: '1.6', marginBottom: '48px', color: 'var(--text2)' }}>
                The world's most advanced AI engine for immediate statutory analysis. Get a clear verdict and settlement valuation in under 30 seconds.
              </p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Link to="/check" className="btn btn-primary btn-lg" style={{ padding: '20px 48px', borderRadius: '100px' }}>Analyze Case <ArrowRight size={20} /></Link>
                <Link to="/articles" className="btn btn-secondary btn-lg" style={{ padding: '20px 48px', borderRadius: '100px' }}>View Outcomes</Link>
              </div>
              
              <div style={{ display: 'flex', gap: '32px', marginTop: '60px', color: 'var(--text3)', fontSize: '0.9rem', fontWeight: 600 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={18} className="text-green" /> US, UK, CA, EU Support</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Shield size={18} className="text-accent" /> Privacy Guaranteed</div>
              </div>
            </div>

            <div className="hero-visual" style={{ position: 'relative' }}>
              <div className="glass" style={{ padding: '40px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', transform: 'rotate(2deg)', boxShadow: 'var(--shadow-lg)', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{ fontWeight: 800, color: 'var(--text3)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Current Analysis</div>
                  <div className="status-dot green" />
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px' }}>Wrongful Termination Case</div>
                <div style={{ height: '8px', background: 'var(--bg3)', borderRadius: '100px', overflow: 'hidden', marginBottom: '24px' }}>
                  <div className="progress-fill" style={{ width: '85%' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ background: 'var(--bg2)', padding: '16px', borderRadius: 'var(--r)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text3)', marginBottom: '4px' }}>EST. PAYOUT</div>
                    <div style={{ fontWeight: 800, color: 'var(--green)' }}>$8,500</div>
                  </div>
                  <div style={{ background: 'var(--bg2)', padding: '16px', borderRadius: 'var(--r)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text3)', marginBottom: '4px' }}>VERDICT</div>
                    <div style={{ fontWeight: 800, color: 'var(--accent)' }}>Likely Illegal</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div style={{ position: 'absolute', top: '-40px', right: '-20px', width: '200px', height: '200px', background: 'var(--accent)', filter: 'blur(100px)', opacity: 0.1, zIndex: 1 }} />
              <div style={{ position: 'absolute', bottom: '-40px', left: '-20px', width: '200px', height: '200px', background: 'var(--green)', filter: 'blur(100px)', opacity: 0.1, zIndex: 1 }} />
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
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
                    <p style={{ color: 'var(--text3)', fontSize: '0.95rem' }}>Receive a structured report with a verdict, specific law citations, action steps, and an estimated lawsuit valuation.</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img src="/gavel.png" alt="Legal Process" style={{ width: '100%', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-lg)' }} />
              <div className="glass" style={{ position: 'absolute', bottom: '-30px', left: '-30px', padding: '24px', borderRadius: 'var(--r-lg)', maxWidth: '280px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <TrendingUp className="text-green" size={24} />
                  <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>$8,400</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>Average identified payout for wrongful termination cases in the UK.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Stats/Trust Section (Relocated) ═══ */}
      <section style={{ padding: '100px 0', background: 'var(--bg)', borderY: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Global Impact</div>
            <h2 className="section-h2">Trust Verified by Numbers</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
            <div className="glass" style={{ padding: '40px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <Globe size={24} className="text-accent" style={{ marginBottom: '16px' }} />
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text)' }}>4</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Regions</div>
            </div>
            <div className="glass" style={{ padding: '40px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <TrendingUp size={24} className="text-green" style={{ marginBottom: '16px' }} />
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text)' }}>$15M</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Payouts Identified</div>
            </div>
            <div className="glass" style={{ padding: '40px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <Users size={24} className="text-accent" style={{ marginBottom: '16px' }} />
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text)' }}>300k</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Users Helped</div>
            </div>
            <div className="glass" style={{ padding: '40px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <CheckCircle2 size={24} className="text-accent" style={{ marginBottom: '16px' }} />
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text)' }}>98%</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Precision</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Reviews/Social Proof ═══ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Success Stories</div>
            <h2 className="section-h2">User Experiences</h2>
            <p className="section-sub">People who successfully identified their rights and took action.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '60px' }}>
            {REVIEWS.map((rev, i) => (
              <div key={i} style={{ background: 'var(--bg2)', padding: '40px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', color: 'var(--orange)' }}>
                  {[...Array(rev.stars)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p style={{ fontSize: '1rem', color: 'var(--text2)', fontStyle: 'italic', marginBottom: '24px', lineHeight: '1.7' }}>"{rev.text}"</p>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1rem' }}>{rev.name}</div>
                  <div style={{ color: 'var(--text3)', fontSize: '0.85rem' }}>{rev.role} Case Study</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-secondary">
              <MessageSquare size={18} /> Share Your Experience
            </button>
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="section" style={{ background: 'var(--accent)', color: '#fff', borderRadius: '32px', margin: '0 40px 100px 40px', overflow: 'hidden', position: 'relative' }}>
        <div className="hero-gradient" style={{ opacity: 0.2 }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="section-h2" style={{ color: '#fff', marginBottom: '24px' }}>Stop Guessing. Start Knowing.</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            Free legal intelligence at your fingertips. No fees, no lawyers, just the facts.
          </p>
          <Link to="/check" className="btn btn-secondary btn-lg" style={{ background: '#fff', color: 'var(--accent)', border: 'none' }}>
            Check My Situation Now <ArrowRight size={20} />
          </Link>
          <p style={{ marginTop: '32px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
            Supporting US Federal/State, UK Acts, Canadian Provincial, and EU Directives.
          </p>
        </div>
      </section>
    </div>
  );
}
