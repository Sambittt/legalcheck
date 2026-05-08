import { useState, useEffect } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import VerdictCard from '../components/VerdictCard';
import UnlockModal from '../components/UnlockModal';
import FeedbackWidget from '../components/FeedbackWidget';
import { getLegalAlternative } from '../services/api';
import { saveCheck } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

export default function ResultPage() {
  const location = useLocation();
  const { verdictData, situation, region = 'USA' } = location.state || {};
  const { user, userPlan, isAdmin } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [legalAlt, setLegalAlt] = useState(null);
  const [loadingAlt, setLoadingAlt] = useState(false);
  const [altError, setAltError] = useState('');

  // Plan is premium if it's 'yearly', 'lifetime', or if the user is an admin
  const isPremium = userPlan?.plan === 'yearly' || userPlan?.plan === 'lifetime' || isAdmin;

  // Save check to Firebase
  useEffect(() => {
    if (verdictData) {
      saveCheck(situation, verdictData.verdict, verdictData.severity, user?.uid);
    }
  }, []);

  // Auto-unlock for premium users
  useEffect(() => {
    if (isPremium && verdictData?.legalAlternativeExists && !isUnlocked) {
      fetchLegalAlt();
    }
  }, [isPremium]);

  if (!verdictData) return <Navigate to="/check" replace />;

  const fetchLegalAlt = async () => {
    setLoadingAlt(true);
    setAltError('');
    try {
      const data = await getLegalAlternative(situation, verdictData.verdict, region);
      setLegalAlt(data);
      setIsUnlocked(true);
    } catch {
      setAltError('Could not fetch the legal alternative. Please try again.');
    } finally {
      setLoadingAlt(false);
    }
  };

  const handleUnlockSuccess = async (planType) => {
    setShowModal(false);
    await fetchLegalAlt();
  };

  return (
    <div className="result-page">
      <div className="container-wide">
        <div className="result-grid">
          {/* Main Results */}
          <div className="result-main fade-in-up">
            <div className="result-header">
              <h1 className="result-h1">AI Analysis Report</h1>
              <div style={{ display: 'flex', gap: '10px' }} className="no-print">
                <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>
                  Download PDF →
                </button>
                <span className="plan-badge" style={{ background: 'var(--accent)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center' }}>
                  {region} Law
                </span>
                <Link to="/check" className="btn btn-ghost btn-sm">New Analysis →</Link>
              </div>
            </div>

            {/* Verdict cards */}
            <VerdictCard verdictData={verdictData} />

            {/* Premium Sections - Teasers */}
            {!isUnlocked && verdictData.legalAlternativeExists && (
              <div className="premium-teaser-box">
                <div className="pt-header">
                  <span className="pt-badge">PREMIUM INTELLIGENCE</span>
                  <h3>Unlock Your Full Legal Strategy Report</h3>
                  <p style={{ color: 'var(--text3)', fontSize: '.85rem', marginTop: '8px' }}>Get the same quality analysis a $500/hr attorney would provide</p>
                </div>
                <div className="pt-grid">
                  <div className="pt-item">
                    <span className="pt-icon">📊</span>
                    <div>
                      <h4>Case Strength Score</h4>
                      <p>Rated 1-100 with detailed strength/weakness breakdown</p>
                    </div>
                  </div>
                  <div className="pt-item">
                    <span className="pt-icon">📈</span>
                    <div>
                      <h4>Win Probability</h4>
                      <p>Percentage chance of winning based on {region} precedents</p>
                    </div>
                  </div>
                  <div className="pt-item">
                    <span className="pt-icon">📝</span>
                    <div>
                      <h4>Ready-to-Send Demand Letter</h4>
                      <p>Professional letter you can copy, paste, and send today</p>
                    </div>
                  </div>
                  <div className="pt-item">
                    <span className="pt-icon">💰</span>
                    <div>
                      <h4>Settlement Valuation</h4>
                      <p>Exact LOW / MID / HIGH dollar ranges for your case</p>
                    </div>
                  </div>
                  <div className="pt-item">
                    <span className="pt-icon">🎯</span>
                    <div>
                      <h4>Negotiation Playbook</h4>
                      <p>5-step tactical guide to maximize your outcome</p>
                    </div>
                  </div>
                  <div className="pt-item">
                    <span className="pt-icon">📁</span>
                    <div>
                      <h4>Similar Cases & Outcomes</h4>
                      <p>Real precedents showing what others won in your situation</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Legal Alternative section */}
            {verdictData.legalAlternativeExists && (
              <div className="alt-section">
                <div className="alt-header">
                  <span className="alt-icon">⚡</span>
                  <div>
                    <h2 className="alt-title">Premium Legal Intelligence Report</h2>
                    {verdictData.legalAlternativeTeaser && (
                      <p className="alt-teaser">"{verdictData.legalAlternativeTeaser}"</p>
                    )}
                  </div>
                </div>

                {!isUnlocked && !loadingAlt && (
                  <div className="alt-locked">
                    {isPremium ? (
                      <button className="btn btn-primary" onClick={fetchLegalAlt}>
                        Generate Premium Report (Member Access) →
                      </button>
                    ) : (
                      <div className="alt-unlock-row">
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                          Unlock Full Report for $2.99 →
                        </button>
                        <button className="btn btn-secondary" onClick={() => setShowModal(true)}>
                          Yearly Membership $24.99/yr — Unlimited Reports
                        </button>
                      </div>
                    )}
                    <span className="alt-lock-note">12-section legal intelligence report · Demand letter draft · Settlement valuation · Negotiation playbook</span>
                  </div>
                )}

                {loadingAlt && (
                  <div className="alt-loading">
                    <div className="mini-spinner" />
                    <span>Generating premium intelligence report for {region}... This takes 15-30 seconds.</span>
                  </div>
                )}

                {altError && (
                  <div className="error-banner" style={{ marginTop: '12px' }}>
                    {altError}
                    <button className="btn btn-ghost btn-sm" style={{ marginLeft: '12px' }} onClick={fetchLegalAlt}>Retry</button>
                  </div>
                )}

                {isUnlocked && legalAlt && (
                  <div className="alt-content fade-in">

                    {/* Section 1: Case Strength Score */}
                    {legalAlt.caseStrength && (
                      <div className="premium-section" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.05))', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 'var(--r-lg)', padding: '24px' }}>
                        <h4 className="premium-section-title" style={{ color: 'var(--accent-l)' }}>📊 Case Strength Score</h4>
                        <p className="card-body" style={{ whiteSpace: 'pre-line' }}>{legalAlt.caseStrength}</p>
                      </div>
                    )}

                    {/* Section 2: Win Probability */}
                    {legalAlt.winProbability && (
                      <div className="premium-section" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(16,185,129,0.05))', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 'var(--r-lg)', padding: '24px' }}>
                        <h4 className="premium-section-title" style={{ color: 'var(--green)' }}>📈 Win Probability</h4>
                        <p className="card-body" style={{ whiteSpace: 'pre-line' }}>{legalAlt.winProbability}</p>
                      </div>
                    )}

                    {/* Section 3: Similar Cases */}
                    {legalAlt.similarCases && (
                      <div className="premium-section" style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '24px' }}>
                        <h4 className="premium-section-title" style={{ color: 'var(--text)' }}>📁 Similar Cases & Outcomes</h4>
                        <p className="card-body" style={{ whiteSpace: 'pre-line' }}>{legalAlt.similarCases}</p>
                      </div>
                    )}

                    <div className="divider" />

                    {/* Section 4: Demand Letter */}
                    {legalAlt.demandLetter && (
                      <div className="premium-section" style={{ background: 'var(--bg2)', border: '2px solid var(--accent)', borderRadius: 'var(--r-lg)', padding: '24px', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                          <h4 className="premium-section-title" style={{ color: 'var(--accent-l)', margin: 0 }}>📝 Demand Letter Draft</h4>
                          <button 
                            className="btn btn-ghost btn-sm" 
                            onClick={() => { navigator.clipboard.writeText(legalAlt.demandLetter); }}
                            style={{ fontSize: '0.75rem' }}
                          >
                            📋 Copy to Clipboard
                          </button>
                        </div>
                        <div style={{ background: 'var(--bg)', padding: '20px', borderRadius: 'var(--r)', border: '1px solid var(--border)', fontFamily: 'serif', fontSize: '0.9rem', lineHeight: '1.8', color: 'var(--text2)', whiteSpace: 'pre-line' }}>
                          {legalAlt.demandLetter}
                        </div>
                      </div>
                    )}

                    <div className="divider" />

                    {/* Section 5: Evidence Checklist */}
                    {legalAlt.evidenceChecklist && (
                      <div className="premium-section" style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '24px' }}>
                        <h4 className="premium-section-title" style={{ color: 'var(--orange)' }}>📋 Evidence Checklist</h4>
                        <p className="card-body" style={{ whiteSpace: 'pre-line' }}>{legalAlt.evidenceChecklist}</p>
                      </div>
                    )}

                    {/* Section 6: Negotiation Playbook */}
                    {legalAlt.negotiationPlaybook && (
                      <div className="premium-section" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.06), rgba(239,68,68,0.03))', border: '1px solid rgba(249,115,22,0.3)', borderRadius: 'var(--r-lg)', padding: '24px' }}>
                        <h4 className="premium-section-title" style={{ color: 'var(--orange)' }}>🎯 Negotiation Playbook</h4>
                        <p className="card-body" style={{ whiteSpace: 'pre-line' }}>{legalAlt.negotiationPlaybook}</p>
                      </div>
                    )}

                    <div className="divider" />

                    {/* Section 7: Risk Matrix */}
                    {legalAlt.riskMatrix && (
                      <div className="premium-section" style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '24px' }}>
                        <h4 className="premium-section-title" style={{ color: 'var(--red)' }}>⚖️ Risk Matrix</h4>
                        <p className="card-body" style={{ whiteSpace: 'pre-line' }}>{legalAlt.riskMatrix}</p>
                      </div>
                    )}

                    {/* Section 8: Deadlines */}
                    {legalAlt.deadlines && (
                      <div className="premium-section" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(249,115,22,0.05))', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--r-lg)', padding: '24px' }}>
                        <h4 className="premium-section-title" style={{ color: 'var(--red)' }}>⏰ Deadline Countdown</h4>
                        <p className="card-body" style={{ whiteSpace: 'pre-line' }}>{legalAlt.deadlines}</p>
                      </div>
                    )}

                    <div className="divider" />

                    {/* Section 9: Settlement Value */}
                    {legalAlt.settlementValue && (
                      <div className="premium-section" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(16,185,129,0.06))', border: '2px solid rgba(34,197,94,0.4)', borderRadius: 'var(--r-lg)', padding: '28px' }}>
                        <h4 className="premium-section-title" style={{ color: 'var(--green)', fontSize: '1rem' }}>💰 Estimated Settlement Value</h4>
                        <p className="card-body" style={{ whiteSpace: 'pre-line', fontSize: '1rem', fontWeight: '500' }}>{legalAlt.settlementValue}</p>
                      </div>
                    )}

                    {/* Section 10: Lawyer Cost */}
                    {legalAlt.lawyerCost && (
                      <div className="premium-section" style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '24px' }}>
                        <h4 className="premium-section-title" style={{ color: 'var(--text)' }}>💼 Lawyer Cost Estimator</h4>
                        <p className="card-body" style={{ whiteSpace: 'pre-line' }}>{legalAlt.lawyerCost}</p>
                      </div>
                    )}

                    <div className="divider" />

                    {/* Section 11: Step-by-Step Resolution */}
                    {legalAlt.theWay && (
                      <div className="premium-section" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(139,92,246,0.04))', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 'var(--r-lg)', padding: '24px' }}>
                        <h4 className="premium-section-title" style={{ color: 'var(--accent-l)' }}>🔓 Step-by-Step Legal Resolution</h4>
                        <p className="card-body" style={{ whiteSpace: 'pre-line' }}>{legalAlt.theWay}</p>
                      </div>
                    )}

                    {/* Section 12: Common Mistakes */}
                    {legalAlt.watchOut && (
                      <div className="premium-section" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--r-lg)', padding: '24px' }}>
                        <h4 className="premium-section-title" style={{ color: 'var(--red)' }}>⚠️ Common Mistakes to Avoid</h4>
                        <p className="card-body" style={{ whiteSpace: 'pre-line' }}>{legalAlt.watchOut}</p>
                      </div>
                    )}

                    <div className="divider" />
                    <FeedbackWidget situation={situation} verdictText={JSON.stringify(verdictData)} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Result Sidebar */}
          <div className="result-sidebar fade-in">
            <div className="sidebar-card">
              <h3>Legal References</h3>
              <p className="sidebar-p">Our analysis engine cited specific statutes from <strong>{region}</strong>. You can cross-verify them on official databases:</p>
              <ul className="sidebar-list">
                {region === 'USA' && (
                  <>
                    <li><a href="https://www.law.cornell.edu/uscode/text" target="_blank" rel="noreferrer">U.S. Code</a></li>
                    <li><a href="https://www.ecfr.gov/" target="_blank" rel="noreferrer">CFR (Federal)</a></li>
                  </>
                )}
                {region === 'CAN' && (
                  <>
                    <li><a href="https://laws-lois.justice.gc.ca/eng/acts/" target="_blank" rel="noreferrer">Justice Canada Acts</a></li>
                    <li><a href="https://www.canlii.org/en/" target="_blank" rel="noreferrer">CanLII Case Law</a></li>
                  </>
                )}
                {region === 'UK' && (
                  <>
                    <li><a href="https://www.legislation.gov.uk/" target="_blank" rel="noreferrer">UK Legislation</a></li>
                    <li><a href="https://www.bailii.org/" target="_blank" rel="noreferrer">BAILII Case Law</a></li>
                  </>
                )}
                {region === 'EU' && (
                  <>
                    <li><a href="https://eur-lex.europa.eu/homepage.html" target="_blank" rel="noreferrer">EUR-Lex</a></li>
                    <li><a href="https://curia.europa.eu/" target="_blank" rel="noreferrer">Court of Justice of EU</a></li>
                  </>
                )}
              </ul>
            </div>

            <div className="sidebar-card alt">
              <h3>Next Steps Checklist</h3>
              <ul className="sidebar-checklist">
                <li><span>Save/Print this report</span></li>
                <li><span>Gather relevant documents</span></li>
                <li><span>Contact local legal aid if needed</span></li>
                <li><span>Avoid public discussion of details</span></li>
              </ul>
            </div>

            <div className="report-id">
              <span>Report ID: <strong>LC-{Math.random().toString(36).substr(2, 9).toUpperCase()}</strong></span>
              <span>Timestamp: <strong>{new Date().toLocaleString()}</strong></span>
              <span>Jurisdiction: <strong>{region}</strong></span>
            </div>
          </div>
        </div>

        {/* Global Disclaimer */}
        <div className="disclaimer">
          ⚠️ DISCLAIMER: This analysis is provided for informational purposes only. It is not legal advice and does not create an attorney-client relationship. Laws vary by jurisdiction and are subject to change. Always consult a licensed attorney.
        </div>
      </div>

      {showModal && (
        <UnlockModal
          onClose={() => setShowModal(false)}
          onSuccess={handleUnlockSuccess}
          situation={situation}
          verdictData={verdictData}
        />
      )}
    </div>
  );
}
