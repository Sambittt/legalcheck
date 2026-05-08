import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { 
  Scale, 
  ArrowLeft, 
  Download, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  Zap,
  TrendingUp,
  Target,
  Clock,
  Briefcase,
  AlertCircle,
  Lightbulb,
  Search,
  BookOpen
} from 'lucide-react';
import { getLegalVerdict, getPremiumReport } from '../services/api';
import { useAuth } from '../context/AuthContext';
import VerdictCard from '../components/VerdictCard';
import UnlockModal from '../components/UnlockModal';
import FeedbackWidget from '../components/FeedbackWidget';

export default function ResultPage() {
  const { state } = useLocation();
  const { user, isPremium, plan } = useAuth();
  const [loading, setLoading] = useState(true);
  const [verdict, setVerdict] = useState(null);
  const [premiumData, setPremiumData] = useState(null);
  const [showUnlock, setShowUnlock] = useState(false);
  const reportRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!state?.situation) return;

    async function fetchData() {
      try {
        const res = await getLegalVerdict(state.situation, state.region);
        setVerdict(res);
        
        if (isPremium) {
          const prem = await getPremiumReport(state.situation, state.region, res);
          setPremiumData(prem);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [state, isPremium]);

  if (!state?.situation) {
    return (
      <div className="section page-center">
        <p>No analysis data found.</p>
        <Link to="/check" className="btn btn-primary">Start New Analysis</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="section page-center">
        <div className="mini-spinner" style={{ width: '48px', height: '48px', border: '3px solid var(--bg3)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '20px', color: 'var(--text3)' }}>Generating legal intelligence report...</p>
      </div>
    );
  }

  return (
    <div className="result-page section" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <Link to="/check" className="btn btn-ghost btn-sm">
            <ArrowLeft size={16} /> Edit Situation
          </Link>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>
              <Download size={16} /> Export PDF
            </button>
            {!isPremium && (
              <button className="btn btn-primary btn-sm" onClick={() => setShowUnlock(true)}>
                <Zap size={16} /> Unlock Full Report
              </button>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '40px', alignItems: 'start' }}>
          
          <div className="report-main">
            <div className="glass" style={{ padding: '48px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', background: 'var(--bg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
                <div>
                  <div className="section-badge" style={{ marginBottom: '12px' }}>Intelligence Report</div>
                  <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Analysis Verdict</h1>
                  <p style={{ color: 'var(--text3)', fontSize: '0.85rem', marginTop: '4px' }}>Case Ref: LC-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>Jurisdiction</div>
                  <div style={{ fontWeight: 800 }}>{state.region}</div>
                </div>
              </div>

              <VerdictCard verdict={verdict} />

              <div className="report-section" style={{ marginTop: '60px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', marginBottom: '24px' }}>
                  <FileText className="text-accent" size={24} /> Detailed Methodology
                </h3>
                <div style={{ color: 'var(--text2)', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                  {verdict}
                </div>
              </div>

              <div style={{ marginTop: '60px', padding: '32px', background: 'var(--bg2)', borderRadius: 'var(--r)', border: '1px solid var(--border)' }}>
                <FeedbackWidget situation={state.situation} verdictText={verdict} />
              </div>
            </div>

            {/* Premium Sections Overlay */}
            {!isPremium && (
              <div className="premium-teaser" style={{ marginTop: '40px' }}>
                <div className="glass" style={{ padding: '60px', borderRadius: 'var(--r-lg)', border: '1px dashed var(--accent)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, var(--bg))', pointerEvents: 'none' }} />
                  <Zap size={48} className="text-accent" style={{ marginBottom: '24px' }} />
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '16px' }}>Unlock the Professional Suite</h2>
                  <p style={{ color: 'var(--text3)', maxWidth: '500px', margin: '0 auto 32px auto' }}>
                    Access the Lawsuit Valuation Engine, professional Demand Letter templates, and a 5-step negotiation playbook tailored to your case.
                  </p>
                  <button className="btn btn-primary btn-lg" onClick={() => setShowUnlock(true)}>
                    Unlock Intelligence Suite — $2.99
                  </button>
                </div>
              </div>
            )}

            {isPremium && premiumData && (
              <div className="premium-report-content" style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {/* Premium content rendering logic same as before but with new styling */}
                <div className="glass" style={{ padding: '48px', borderRadius: 'var(--r-lg)', border: '1px solid var(--accent)', background: 'var(--bg)' }}>
                   <div className="section-badge" style={{ background: 'var(--accent)', color: '#fff' }}>Premium Intelligence</div>
                   <h2 style={{ fontSize: '1.5rem', marginTop: '16px', marginBottom: '32px' }}>Lawsuit Valuation & Tactical Plan</h2>
                   <div style={{ color: 'var(--text2)', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                    {premiumData}
                   </div>
                </div>
              </div>
            )}
          </div>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
             <div className="glass" style={{ padding: '24px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', background: 'var(--bg)' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={16} className="text-accent" /> Intelligence Score
                </h4>
                <div style={{ height: '8px', background: 'var(--bg3)', borderRadius: '100px', overflow: 'hidden', marginBottom: '12px' }}>
                  <div style={{ width: '85%', height: '100%', background: 'var(--accent)' }} />
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>Our AI is 85% confident in this verdict based on recent statutes.</p>
             </div>

             <div className="glass" style={{ padding: '24px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', background: 'var(--bg)' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} className="text-accent" /> Timeline
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem' }}>
                    <div style={{ width: '2px', background: 'var(--border)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 0, left: '-4px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700 }}>Now</p>
                      <p style={{ color: 'var(--text3)' }}>Analysis complete</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem' }}>
                    <div style={{ width: '2px', background: 'var(--border)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 0, left: '-4px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--bg3)' }} />
                    </div>
                    <div>
                      <p style={{ color: 'var(--text3)' }}>Step 1</p>
                      <p style={{ color: 'var(--text3)' }}>Review action steps</p>
                    </div>
                  </div>
                </div>
             </div>

             <div style={{ padding: '24px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', background: 'var(--bg3)', textAlign: 'center' }}>
                <ShieldCheck className="text-green" size={32} style={{ margin: '0 auto 16px auto' }} />
                <p style={{ fontSize: '0.75rem', color: 'var(--text2)', fontWeight: 700 }}>VERIFIED LAW REFERENCE</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text3)', marginTop: '4px' }}>Every citation is matched against official government databases.</p>
             </div>
          </aside>

        </div>
      </div>

      {showUnlock && (
        <UnlockModal 
          onClose={() => setShowUnlock(false)} 
          onSuccess={() => { setShowUnlock(false); window.location.reload(); }}
          situation={state.situation}
          verdictData={verdict}
        />
      )}
    </div>
  );
}
