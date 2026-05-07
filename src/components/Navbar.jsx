import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { signInWithGoogle, signOutUser } from '../services/firebase';

export default function Navbar() {
  const { user, userPlan } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAuth = async () => {
    if (user) {
      await signOutUser();
    } else {
      await signInWithGoogle();
    }
    setMenuOpen(false);
  };

  const isPlanLifetime = userPlan?.plan === 'lifetime';

  return (
    <nav className="navbar">
      <div className="container-wide navbar-inner">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">⚖️</span>
          LegalCheck
        </Link>

        <div className="nav-links">
          <Link to="/check" className={`nav-link ${location.pathname === '/check' ? 'active' : ''}`}>Check</Link>
          <Link to="/pricing" className={`nav-link ${location.pathname === '/pricing' ? 'active' : ''}`}>Pricing</Link>

          {user ? (
            <div className="nav-user">
              {isPlanLifetime && <span className="plan-badge">Lifetime</span>}
              <button className="btn btn-ghost btn-sm" onClick={handleAuth}>Sign Out</button>
            </div>
          ) : (
            <button className="btn btn-secondary btn-sm" onClick={handleAuth}>Sign In</button>
          )}

          <Link to="/check" className="nav-cta btn btn-primary btn-sm">Check Free →</Link>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/check" className="mobile-link" onClick={() => setMenuOpen(false)}>Check My Situation</Link>
          <Link to="/pricing" className="mobile-link" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <button className="mobile-link" onClick={handleAuth}>
            {user ? 'Sign Out' : 'Sign In with Google'}
          </button>
        </div>
      )}
    </nav>
  );
}
