import { useState } from 'react';
import { flagResponse } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

export default function FeedbackWidget({ situation, verdictText }) {
  const { user } = useAuth();
  const [state, setStage] = useState('idle'); // idle | negative | submitted
  const [submitting, setSubmitting] = useState(false);

  const handlePositive = () => setStage('positive');

  const handleNegative = () => setStage('negative');

  const handleSubmitFlag = async () => {
    setSubmitting(true);
    await flagResponse(situation, verdictText, user?.uid);
    setSubmitting(false);
    setStage('submitted');
  };

  if (state === 'positive') {
    return (
      <div className="feedback-box feedback-pos">
        ✅ Thank you for your feedback!
      </div>
    );
  }

  if (state === 'submitted') {
    return (
      <div className="feedback-box feedback-neg">
        📬 Submitted for review. We'll process your refund within 24 hours if the answer was incorrect.
      </div>
    );
  }

  if (state === 'negative') {
    return (
      <div className="feedback-box feedback-neg">
        <p style={{ marginBottom: '12px' }}>
          We'll review this and <strong>refund your $2.99 within 24 hours</strong> if the answer was incorrect.
        </p>
        <button className="btn btn-danger btn-sm" onClick={handleSubmitFlag} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit for Review'}
        </button>
        <button className="btn btn-ghost btn-sm" style={{ marginLeft: '8px' }} onClick={() => setStage('idle')}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="feedback-box">
      <span className="feedback-label">Was this helpful?</span>
      <button className="feedback-btn feedback-yes" onClick={handlePositive}>✅ Yes</button>
      <button className="feedback-btn feedback-no" onClick={handleNegative}>❌ No, this seems wrong</button>
    </div>
  );
}
