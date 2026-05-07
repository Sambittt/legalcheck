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
  const { user, userPlan } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [legalAlt, setLegalAlt] = useState(null);
  const [loadingAlt, setLoadingAlt] = useState(false);
  const [altError, setAltError] = useState('');

  // Plan is premium if it's 'yearly' (legacy 'lifetime' also counts as premium)
  const isPremium = userPlan?.plan === 'yearly' || userPlan?.plan === 'lifetime';

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
                  <span className="pt-badge">PREMIUM FEATURES</span>
                  <h3>Unlock the Full Legal Blueprint</h3>
                </div>
                <div className="pt-grid">
                  <div className="pt-item">
                    <span className="pt-icon">🔓</span>
                    <div>
                      <h4>The Step-by-Step Method</h4>
                      <p>Exact instructions on how to resolve this legally.</p>
                    </div>
                  </div>
                  <div className="pt-item">
                    <span className="pt-icon">🎁</span>
                    <div>
                      <h4>Benefit Analysis</h4>
                      <p>How this situation can turn into an advantage for you.</p>
                    </div>
                  </div>
                  <div className="pt-item">
                    <span className="pt-icon">💵</span>
                    <div>
                      <h4>Lawsuit Valuation</h4>
                      <p>Estimate of potential winnings/settlement in {region}.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Legal Alternative section */}
            {verdictData.legalAlternativeExists && (
              <div className="alt-section">
                <div className="alt-header">
                  <span className="alt-icon">💡</span>
                  <div>
                    <h2 className="alt-title">Found: Legal Alternative Method</h2>
                    {verdictData.legalAlternativeTeaser && (
                      <p className="alt-teaser">"{verdictData.legalAlternativeTeaser}"</p>
                    )}
                  </div>
                </div>

                {!isUnlocked && !loadingAlt && (
                  <div className="alt-locked">
                    {isPremium ? (
                      <button className="btn btn-primary" onClick={fetchLegalAlt}>
                        Unlock Premium Features (Member Access) →
                      </button>
                    ) : (
                      <div className="alt-unlock-row">
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                          Unlock Full Report for $2.99 →
                        </button>
                        <button className="btn btn-secondary" onClick={() => setShowModal(true)}>
                          Yearly Membership $24.99/yr
                        </button>
                      </div>
                    )}
                    <span className="alt-lock-note">One-time or membership. Includes Lawsuit Valuation Engine.</span>
                  </div>
                )}

                {loadingAlt && (
                  <div className="alt-loading">
                    <div className="mini-spinner" />
                    <span>Cross-referencing {region} legal codes & precedents...</span>
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
                    <div className="alt-block">
                      <h4 className="alt-block-title">🔓 The Legal Way To Do This</h4>
                      <p className="card-body">{legalAlt.theWay}</p>
                    </div>
                    
                    <div className="divider" />
                    
                    <div className="alt-grid">
                      <div className="alt-block">
                        <h4 className="alt-block-title">📝 What You'll Need</h4>
                        <p className="card-body">{legalAlt.whatYouNeed}</p>
                      </div>
                      <div className="alt-block">
                        <h4 className="alt-block-title">⏱️ How Long It Takes</h4>
                        <p className="card-body">{legalAlt.howLong}</p>
                      </div>
                    </div>

                    <div className="divider" />

                    <div className="alt-grid">
                      <div className="alt-block">
                        <h4 className="alt-block-title">💰 What It Might Cost</h4>
                        <p className="card-body">{legalAlt.cost}</p>
                      </div>
                      <div className="alt-block">
                        <h4 className="alt-block-title" style={{ color: 'var(--red)' }}>⚠️ Watch Out For</h4>
                        <p className="card-body">{legalAlt.watchOut}</p>
                      </div>
                    </div>

                    {/* New Premium Sections */}
                    <div className="divider" />
                    
                    <div className="premium-result-block">
                      <div className="alt-block">
                        <h4 className="alt-block-title" style={{ color: 'var(--accent-l)' }}>🎁 How You Can Benefit</h4>
                        <p className="card-body">{legalAlt.potentialBenefit}</p>
                      </div>
                    </div>

                    <div className="premium-result-block lawsuit-valuation">
                      <div className="alt-block">
                        <h4 className="alt-block-title" style={{ color: 'var(--green)' }}>💵 Estimated Lawsuit Winnings</h4>
                        <div className="valuation-card">
                          <p className="card-body" style={{ fontSize: '1.1rem', fontWeight: '500' }}>{legalAlt.lawsuitWinnings}</p>
                        </div>
                      </div>
                    </div>

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
