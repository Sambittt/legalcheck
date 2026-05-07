import { useState } from 'react';
import { validateGumroadLicense } from '../services/api';
import { saveUserPlan } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

const SINGLE_PERMALINK = import.meta.env.VITE_GUMROAD_SINGLE_PERMALINK || 'xbqtvn';
const YEARLY_PERMALINK = import.meta.env.VITE_GUMROAD_LIFETIME_PERMALINK || 'kussdz';
const SINGLE_LINK = import.meta.env.VITE_GUMROAD_SINGLE_LINK || 'https://sambitpathfinder.gumroad.com/l/xbqtvn';
const YEARLY_LINK = import.meta.env.VITE_GUMROAD_LIFETIME_LINK || 'https://sambitpathfinder.gumroad.com/l/kussdz';

export default function UnlockModal({ onClose, onSuccess, situation, verdictData }) {
  const { user, refreshPlan } = useAuth();
  const [tab, setTab] = useState('single'); // 'single' | 'yearly'
  const [licenseKey, setLicenseKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const openGumroad = () => {
    const link = tab === 'yearly' ? YEARLY_LINK : SINGLE_LINK;
    window.open(link, '_blank');
  };

  const handleValidate = async () => {
    if (!licenseKey.trim()) { setError('Please enter your license key'); return; }
    setLoading(true);
    setError('');

    const permalink = tab === 'yearly' ? YEARLY_PERMALINK : SINGLE_PERMALINK;
    const planType = tab === 'yearly' ? 'yearly' : 'single';

    try {
      await validateGumroadLicense(licenseKey.trim(), permalink);

      if (user) {
        await saveUserPlan(user.uid, user.email, planType, licenseKey.trim());
        await refreshPlan();
      }

      onSuccess(planType);
    } catch (e) {
      if (e.message === 'INVALID_KEY') {
        setError('Invalid license key. Please check and try again.');
      } else if (e.message === 'FIREBASE_SAVE_ERROR') {
        setError('Could not save your access. Please contact support.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header">
          <h2 className="modal-title">💡 Unlock the Full Report</h2>
          <p className="modal-sub">Get the legal blueprint and find out how much this case is worth.</p>
        </div>

        {/* Tab */}
        <div className="modal-tabs">
          <button className={`modal-tab ${tab === 'single' ? 'active' : ''}`} onClick={() => setTab('single')}>
            Single — $2.99
          </button>
          <button className={`modal-tab ${tab === 'yearly' ? 'active' : ''}`} onClick={() => setTab('yearly')}>
            Yearly — $24.99
          </button>
        </div>

        <div className="modal-plan-desc">
          {tab === 'single' ? (
            <ul className="modal-features">
              <li>✅ Legal alternative for this situation</li>
              <li>✅ Step-by-step legal method</li>
              <li>✅ Lawsuit Valuation Engine unlock</li>
              <li>✅ Potential settlement estimate</li>
              <li>✅ One-time payment</li>
            </ul>
          ) : (
            <ul className="modal-features">
              <li>✅ <strong>Unlimited</strong> reports & unlocks</li>
              <li>✅ Full Lawsuit Valuation Engine</li>
              <li>✅ Detailed damages & payout estimates</li>
              <li>✅ Priority feature access</li>
              <li>✅ Cancel anytime</li>
            </ul>
          )}
        </div>

        {/* Step 1 */}
        <div className="modal-step">
          <div className="step-badge">Step 1</div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={openGumroad}>
            Buy on Gumroad →
          </button>
          <p className="modal-hint">You'll receive a license key by email after purchase.</p>
        </div>

        {/* Step 2 */}
        <div className="modal-step">
          <div className="step-badge">Step 2</div>
          <input
            className="key-input"
            type="text"
            placeholder="Paste your license key here..."
            value={licenseKey}
            onChange={e => setLicenseKey(e.target.value)}
          />
          {error && <p className="error-msg">{error}</p>}
          <button
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
            onClick={handleValidate}
            disabled={loading || !licenseKey.trim()}
          >
            {loading ? 'Validating...' : 'Activate & Unlock →'}
          </button>
        </div>

        <p className="modal-disclaimer">
          🔒 Secure payment via Gumroad. Includes full Lawsuit Valuation Engine for your jurisdiction.
        </p>
      </div>
    </div>
  );
}
