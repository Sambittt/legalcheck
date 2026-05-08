import { useState, useEffect } from 'react';
import { Scale } from 'lucide-react';

const messages = [
  'Analyzing your situation...',
  'Checking applicable laws...',
  'Preparing your verdict...'
];

const LoadingAnimation = () => {
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => setIdx(p => (p + 1) % messages.length), 1800);
    const progTimer = setInterval(() => setProgress(p => Math.min(p + 2, 90)), 100);
    return () => { clearInterval(msgTimer); clearInterval(progTimer); };
  }, []);

  return (
    <div className="loading-wrap">
      <div className="loading-spinner">
        <div className="spinner-ring" />
        <div className="spinner-icon"><Scale size={48} /></div>
      </div>
      <p className="loading-msg">{messages[idx]}</p>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="loading-sub">Usually takes 5–10 seconds</p>
    </div>
  );
};

export default LoadingAnimation;
