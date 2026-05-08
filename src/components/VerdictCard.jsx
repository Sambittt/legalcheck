import { ClipboardList, Scale, CheckSquare, Briefcase } from 'lucide-react';

export default function VerdictCard({ verdictData }) {
  if (!verdictData) return null;

  const isIllegal = verdictData.verdict.includes('Illegal') || verdictData.verdict.includes('🔴');
  const isGray    = verdictData.verdict.includes('Gray')    || verdictData.verdict.includes('🟡');
  const isLegal   = verdictData.verdict.includes('Legal')   || verdictData.verdict.includes('🟢');

  const verdictColor = isIllegal ? 'var(--red)' : isGray ? 'var(--yellow)' : 'var(--green)';
  const verdictBg    = isIllegal ? 'var(--red-bg)' : isGray ? 'var(--yellow-bg)' : 'var(--green-bg)';
  const verdictBorder = isIllegal ? 'var(--red-border)' : isGray ? 'var(--yellow-border)' : 'var(--green-border)';

  const sevColor = {
    low: 'var(--green)', medium: 'var(--yellow)',
    high: 'var(--orange)', urgent: 'var(--red)'
  }[verdictData.severity?.toLowerCase()] || 'var(--text-secondary)';

  return (
    <div className="verdict-stack">
      {/* Verdict banner */}
      <div className="verdict-banner" style={{ background: verdictBg, border: `1px solid ${verdictBorder}`, borderLeft: `4px solid ${verdictColor}` }}>
        <div className="verdict-banner-main">
          <div>
            <div className="verdict-label">VERDICT</div>
            <div className="verdict-text" style={{ color: verdictColor }}>{verdictData.verdict}</div>
          </div>
          <div className="verdict-sev">
            <div className="verdict-label">SEVERITY</div>
            <div className="sev-badge" style={{ color: sevColor, borderColor: sevColor }}>
              {verdictData.severity}
            </div>
          </div>
        </div>
      </div>

      {/* What's happening */}
      <div className="result-card">
        <h3 className="card-section-title"><ClipboardList size={18} /> What's Happening</h3>
        <p className="card-body">{verdictData.whatsHappening}</p>
        <div className="divider" />
        <h3 className="card-section-title"><Scale size={18} /> The Law Says</h3>
        <p className="card-body law-text">{verdictData.theLawSays}</p>
      </div>

      {/* Action steps */}
      <div className="result-card">
        <h3 className="card-section-title"><CheckSquare size={18} /> Your Action Steps</h3>
        <div className="steps-list">
          {verdictData.actionSteps.map((step, i) => (
            <div key={i} className="step-item">
              <div className="step-num">{i + 1}</div>
              <p className="step-text">{step}</p>
            </div>
          ))}
        </div>

        <div className="divider" />
        <h3 className="card-section-title"><Briefcase size={18} /> Do You Need a Lawyer?</h3>
        <p className="card-body">{verdictData.needLawyer}</p>
      </div>
    </div>
  );
}
