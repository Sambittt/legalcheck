import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Scale, Moon, Sun, Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Close mobile menu on route change or handle scroll lock
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenu]);

  useEffect(() => {
    setMobileMenu(false);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="nav-logo" onClick={() => setMobileMenu(false)} style={{ zIndex: 3000 }}>
          <Scale className="logo-icon" size={24} />
          <span>LegalCheck</span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/articles" className={`nav-link ${isActive('/articles') ? 'active' : ''}`}>Case Studies</Link>
          <Link to="/pricing" className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}>Pricing</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
          
          <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 8px' }} />

          <button onClick={toggleTheme} className="btn btn-ghost btn-sm" style={{ padding: '8px' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <Link to="/check" className="btn btn-primary btn-sm">Start Analysis</Link>
        </div>

        {/* Mobile Toggle Container */}
        <div className="mobile-only" style={{ gap: '8px', alignItems: 'center', zIndex: 3000 }}>
          <button onClick={toggleTheme} className="btn btn-ghost btn-sm" style={{ padding: '8px' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={() => setMobileMenu(!mobileMenu)} 
            className="btn btn-ghost" 
            style={{ padding: '8px', cursor: 'pointer' }}
            aria-label="Toggle Menu"
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenu && (
        <div className="mobile-menu-overlay fade-in">
          <div className="mobile-menu-links">
            <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
            <Link to="/articles" className={`mobile-nav-link ${isActive('/articles') ? 'active' : ''}`}>Case Studies</Link>
            <Link to="/pricing" className={`mobile-nav-link ${isActive('/pricing') ? 'active' : ''}`}>Pricing</Link>
            <Link to="/about" className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
            <Link to="/contact" className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
            
            <Link to="/check" className="btn btn-primary" style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }}>
              Start Free Analysis <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
