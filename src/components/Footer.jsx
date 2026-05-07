import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-wide footer-inner">
        <Link to="/" className="footer-logo">⚖️ LegalCheck</Link>
        <div className="footer-links">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/check" className="footer-link">Check</Link>
          <Link to="/pricing" className="footer-link">Pricing</Link>
          <Link to="/privacy" className="footer-link">Privacy</Link>
          <Link to="/terms" className="footer-link">Terms</Link>
        </div>
        <div className="footer-copy">
          <p>© {new Date().getFullYear()} LegalCheck. AI-powered legal awareness. Not legal advice. Built by <a href="https://sambit.page" className="footer-link" target="_blank" rel="noreferrer">Sambit</a>.</p>
        </div>
      </div>
    </footer>
  );
}
