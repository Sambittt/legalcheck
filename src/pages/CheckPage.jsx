import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Globe, 
  ArrowRight, 
  ShieldCheck, 
  Info, 
  AlertCircle,
  HelpCircle,
  Clock,
  Briefcase,
  Home,
  Shield
} from 'lucide-react';
import LoadingAnimation from "../components/LoadingAnimation";

const JURISDICTIONS = [
  { id: 'USA', name: 'United States', code: 'Federal & State Law' },
  { id: 'UK', name: 'United Kingdom', code: 'Acts & Common Law' },
  { id: 'Canada', name: 'Canada', code: 'Federal & Provincial' },
  { id: 'Europe', name: 'European Union', code: 'Directives & Regulations' }
];

export default function CheckPage() {
  const [situation, setSituation] = useState('');
  const [region, setRegion] = useState('USA');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Start Legal Analysis | LegalCheck";
    window.scrollTo(0, 0);
  }, []);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!situation.trim()) return;
    setLoading(true);
    setTimeout(() => {
      navigate('/result', { state: { situation, region } });
    }, 4500);
  };

  if (loading) return <LoadingAnimation />;

  return (
    <div className="check-page section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '60px', alignItems: 'start' }}>
          
          <div className="fade-in-up">
            <div className="section-header" style={{ textAlign: 'left', margin: '0 0 40px 0' }}>
              <div className="section-badge">Legal Situation Portal</div>
              <h1 className="section-h2" style={{ fontSize: '2.5rem' }}>Describe What Happened</h1>
              <p className="section-sub">Be as detailed as possible. Include dates, specific parties, and any financial losses involved.</p>
            </div>

            <form onSubmit={handleCheck} className="glass" style={{ padding: '40px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: 700, fontSize: '0.9rem' }}>
                  <Globe size={18} className="text-accent" /> Select Your Jurisdiction
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  {JURISDICTIONS.map(j => (
                    <div 
                      key={j.id}
                      onClick={() => setRegion(j.id)}
                      style={{
                        padding: '16px',
                        borderRadius: 'var(--r)',
                        border: '2px solid',
                        borderColor: region === j.id ? 'var(--accent)' : 'var(--border)',
                        background: region === j.id ? 'var(--bg2)' : 'var(--bg)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: region === j.id ? 'var(--accent)' : 'var(--text)' }}>{j.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text3)', marginTop: '4px' }}>{j.code}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: 700, fontSize: '0.9rem' }}>
                  <Info size={18} className="text-accent" /> Your Situation
                </label>
                <textarea
                  className="glass"
                  placeholder="Example: My landlord in London kept my £2,000 deposit without providing an itemized list of damages within 10 days of my move-out date..."
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  style={{
                    width: '100%',
                    height: '220px',
                    padding: '24px',
                    borderRadius: 'var(--r)',
                    border: '1px solid var(--border)',
                    fontSize: '1rem',
                    color: 'var(--text)',
                    resize: 'none',
                    lineHeight: '1.6'
                  }}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text3)', fontSize: '0.8rem' }}>
                  <Shield size={14} /> 256-bit Encryption Active
                </div>
                <button type="submit" className="btn btn-primary btn-lg">
                  Analyze Situation <ArrowRight size={20} />
                </button>
              </div>
            </form>
          </div>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass" style={{ padding: '32px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={18} className="text-accent" /> Tips for accuracy
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--text2)' }}>
                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={14} className="text-green" /> Mention specific dates (e.g. Jan 12th).</li>
                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={14} className="text-green" /> Include amounts (e.g. £1,200).</li>
                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={14} className="text-green" /> Name your role (e.g. Employee, Tenant).</li>
                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={14} className="text-green" /> State what you want to achieve.</li>
              </ul>
            </div>

            <div style={{ padding: '32px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', background: 'var(--bg2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Briefcase size={20} className="text-accent" />
                <h3 style={{ fontSize: '1rem' }}>Premium Analysis</h3>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text3)', marginBottom: '20px' }}>Unlock the Lawsuit Valuation Engine to see how much your case could be worth in your jurisdiction.</p>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)' }}>UPGRADE AT THE END →</div>
            </div>

            <div style={{ padding: '24px', border: '1px solid var(--orange-border)', background: 'var(--orange-bg)', borderRadius: 'var(--r)', display: 'flex', gap: '12px' }}>
              <AlertCircle size={20} className="text-orange" />
              <div style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>
                <strong>Important:</strong> This tool provides information, not legal advice. Always consult a professional lawyer for court filings.
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
