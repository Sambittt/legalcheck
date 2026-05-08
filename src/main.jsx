import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/pages.css'
import App from './App.jsx'

// Simple Error Boundary for Diagnostics
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', background: '#020617', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <h1 style={{ color: '#10b981', marginBottom: '16px' }}>Diagnostic Mode Active</h1>
          <div style={{ background: '#0f172a', padding: '32px', borderRadius: '16px', border: '1px solid #1e293b', maxWidth: '600px' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#ef4444', marginBottom: '16px' }}>Runtime Error Caught</h2>
            <pre style={{ background: '#000', padding: '16px', borderRadius: '8px', overflow: 'auto', textAlign: 'left', fontSize: '0.8rem', color: '#94a3b8' }}>
              {this.state.error?.toString()}
            </pre>
            <button onClick={() => window.location.reload()} style={{ padding: '12px 24px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '24px', fontWeight: 'bold' }}>
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
      <script dangerouslySetInnerHTML={{ __html: "window.alert('LegalCheck v1.2.4 EMERALD is now LIVE! Force refresh (Ctrl+F5) if you see blue.')" }} />
    </ErrorBoundary>
  </StrictMode>,
)
