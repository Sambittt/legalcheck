import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../components/LoadingAnimation';
import { getVerdict } from '../services/api';
import { Globe, Shield, Zap, BookOpen, AlertTriangle } from 'lucide-react';

const EXAMPLES = [
  'My landlord entered my apartment without 24-hour notice and threatened to raise my rent when I complained.',
  'My employer is making me work through lunch without pay and threatening to fire me if I report it.',
  'A debt collector called me at 11pm and threatened to garnish my wages without a court order.'
];

const REGIONS = [
  { id: 'USA', name: 'United States' },
  { id: 'CAN', name: 'Canada' },
  { id: 'UK', name: 'United Kingdom' },
  { id: 'EU', name: 'Europe (EU)' }
];

export default function CheckPage() {
  const [situation, setSituation] = useState('');
  const [region, setRegion] = useState('USA');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Analyze Your Situation — LegalCheck AI Assistant";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Describe your legal situation in plain English. Our AI analyzes US, UK, Canada, and EU statutes to give you a verdict and action steps instantly.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!situation.trim() || situation.trim().length < 20) return;

    setIsLoading(true);
    setError('');

    try {
      const data = await getVerdict(situation, region);
      navigate('/result', { state: { verdictData: data, situation, region } });
    } catch (err) {
      setIsLoading(false);
      if (err.message === 'INVALID_FORMAT') {
        setError('We had trouble analyzing this situation. Please rephrase and try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  const useExample = (ex) => setSituation(ex);

  if (isLoading) {
    return (
      <div className="page-center">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="check-page">
      <div className="container-wide">
        <div className="check-grid">
          {/* Main Form */}
          <div className="check-form-area fade-in-up">
            <div className="section-badge" style={{ marginBottom: '16px' }}>Secure Analysis Portal</div>
            <h1 className="check-h1">Describe what happened</h1>
            <p className="check-sub">
              Our AI will cross-reference your situation with {region === 'USA' ? 'federal and state' : 'national and regional'} law to identify potential violations.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Region Selector */}
              <div className="region-selector">
                <p className="region-label">Select Your Jurisdiction:</p>
                <div className="region-grid">
                  {REGIONS.map(r => (
                    <button
                      key={r.id}
                      type="button"
                      className={`region-btn ${region === r.id ? 'active' : ''}`}
                      onClick={() => setRegion(r.id)}
                    >
                      <Globe size={14} className="region-icon" />
                      <span className="region-name">{r.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="textarea-wrapper">
                <textarea
                  value={situation}
                  onChange={e => setSituation(e.target.value)}
                  placeholder={`Example: My landlord in ${REGIONS.find(r => r.id === region).name} entered my apartment without notice...`}
                  autoFocus
                  rows={10}
                />
                <div className="char-count">{situation.length} chars</div>
              </div>

              {error && <div className="error-banner">{error}</div>}

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}
                disabled={situation.trim().length < 20}
              >
                Analyze Situation Now — Free
              </button>

              <div className="check-trust-footer">
                <span className="trust-item"><Shield size={14} /> Encrypted</span>
                <span className="trust-item"><Zap size={14} /> Instant Result</span>
                <span className="trust-item"><BookOpen size={14} /> {region === 'USA' ? 'Statute' : 'Code'}-Backed</span>
              </div>
            </form>

            {/* Examples */}
            <div className="examples-section">
              <p className="examples-label">Or use an example:</p>
              <div className="examples-list">
                {EXAMPLES.map((ex, i) => (
                  <button key={i} className="example-chip" onClick={() => useExample(ex)}>
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Side Info */}
          <div className="check-sidebar fade-in">
            <div className="sidebar-card">
              <h3>Verified Databases</h3>
              <ul className="sidebar-list">
                {region === 'USA' && (
                  <>
                    <li><span>U.S. Code (Federal Law)</span></li>
                    <li><span>Code of Federal Regulations</span></li>
                    <li><span>State Civil & Labor Codes</span></li>
                  </>
                )}
                {region === 'CAN' && (
                  <>
                    <li><span>Criminal Code of Canada</span></li>
                    <li><span>Provincial Employment Standards</span></li>
                    <li><span>Residential Tenancies Acts</span></li>
                  </>
                )}
                {region === 'UK' && (
                  <>
                    <li><span>UK Statutory Instruments</span></li>
                    <li><span>Employment Rights Act 1996</span></li>
                    <li><span>Consumer Rights Act 2015</span></li>
                  </>
                )}
                {region === 'EU' && (
                  <>
                    <li><span>EU Charter of Fundamental Rights</span></li>
                    <li><span>GDPR & Consumer Directives</span></li>
                    <li><span>Member State National Codes</span></li>
                  </>
                )}
              </ul>
            </div>

            <div className="sidebar-card alt">
              <h3>Jurisdiction Awareness</h3>
              <p>The AI is currently set to analyze under <strong>{REGIONS.find(r => r.id === region).name}</strong> law. Please ensure your description matches this region for accurate results.</p>
            </div>

            <div className="security-status">
              <div className="status-dot green" />
              <span>AI Analysis Engine: <strong>Online</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
