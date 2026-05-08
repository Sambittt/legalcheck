import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Scale, Moon, Sun, Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Handle Scroll Lock
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenu]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenu(false);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="nav-logo" style={{ zIndex: 6000 }}>
          <Scale className="logo-icon" size={28} color="var(--accent)" />
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

          <button onClick={toggleTheme} className="btn btn-ghost" style={{ padding: '8px' }}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <Link to="/check" className="btn btn-primary" style={{ padding: '10px 24px' }}>Start Analysis</Link>
        </div>

        {/* Mobile Toggle - FORCE CLICKABLE */}
        <div 
          className="mobile-only" 
          onClick={() => {
            console.log('Mobile menu toggled');
            setMobileMenu(!mobileMenu);
          }}
          style={{ 
            display: 'none', 
            gap: '12px', 
            alignItems: 'center', 
            zIndex: 6000, 
            padding: '10px',
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <div style={{ color: 'var(--text)' }}>
            {mobileMenu ? <X size={32} /> : <Menu size={32} />}
          </div>
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
            
            <Link to="/check" className="btn btn-primary btn-lg" style={{ marginTop: '40px', width: '100%', justifyContent: 'center' }}>
              Start Free Analysis <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
