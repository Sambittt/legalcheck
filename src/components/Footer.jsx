import { Link } from 'react-router-dom';
import { Scale, Mail, Globe, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <Link to="/" className="footer-logo">
            <Scale className="logo-icon" size={24} />
            <span>LegalCheck</span>
          </Link>
          <p className="footer-desc">
            Professional AI legal intelligence for individuals and small businesses. Citing actual statutes across US, UK, Canada, and EU.
          </p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
            <a href="#" className="footer-link"><Mail size={20} /></a>
            <a href="#" className="footer-link"><Globe size={20} /></a>
            <a href="#" className="footer-link"><MessageSquare size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-h4">Platform</h4>
          <ul className="footer-list">
            <li><Link to="/check" className="footer-link">AI Checker</Link></li>
            <li><Link to="/pricing" className="footer-link">Pricing</Link></li>
            <li><Link to="/articles" className="footer-link">Case Studies</Link></li>
            <li><Link to="/admin" className="footer-link">Admin Dashboard</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-h4">Company</h4>
          <ul className="footer-list">
            <li><Link to="/about" className="footer-link">About Us</Link></li>
            <li><Link to="/contact" className="footer-link">Contact Support</Link></li>
            <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
            <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-h4">Stay Informed</h4>
          <p className="footer-desc" style={{ marginBottom: '16px' }}>Get the latest legal research and outcomes delivered to your inbox.</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="email" 
              placeholder="Email address" 
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '10px 16px', borderRadius: 'var(--r)', width: '100%', color: 'var(--text)', fontSize: '0.85rem' }} 
            />
            <button className="btn btn-primary btn-sm">Join</button>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} LegalCheck AI. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <span>Powered by Groq Cloud</span>
          <span>SSL Secure</span>
        </div>
      </div>
    </footer>
  );
}
