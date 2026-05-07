import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function AdminPage() {
  const { user, isAdmin, authLoading } = useAuth();
  const [stats, setStats] = useState({ totalChecks: 0, recent: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!isAdmin) return;
      try {
        const q = query(collection(db, 'checks'), orderBy('timestamp', 'desc'), limit(10));
        const snap = await getDocs(q);
        const recent = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        
        // Count total docs without fetching all if possible, but for now we'll just show recent
        setStats({ totalChecks: snap.size, recent });
      } catch (err) {
        console.error('Error fetching admin stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [isAdmin]);

  if (authLoading) {
    return (
      <div className="section page-center">
        <div className="mini-spinner" />
      </div>
    );
  }

  // Restrict access to Admins only
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-page section" style={{ minHeight: '80vh' }}>
      <div className="container-wide">
        <div className="section-header">
          <h1 className="section-h2" style={{ color: 'var(--accent-l)' }}>Admin Control Panel</h1>
          <p className="section-sub">
            Welcome back, {user.email}. As an admin, you have automatic, free access to all Premium features across the platform.
          </p>
        </div>

        <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '40px' }}>
          
          <div className="admin-card" style={{ background: 'var(--bg3)', padding: '32px', borderRadius: 'var(--r-lg)', border: '1px solid var(--accent)' }}>
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.5rem' }}>👑</span> Premium Unlocked
            </h3>
            <p style={{ color: 'var(--text2)', marginBottom: '24px', lineHeight: '1.6' }}>
              Your account has root access. Whenever you analyze a situation, the <strong>Lawsuit Valuation Engine</strong> and <strong>Step-by-Step Methods</strong> will automatically unlock without asking for payment.
            </p>
            <Link to="/check" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Run a Premium Check →
            </Link>
          </div>

          <div className="admin-card" style={{ background: 'var(--bg2)', padding: '32px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
            <h3 style={{ marginBottom: '16px' }}>Platform Activity</h3>
            {loading ? (
              <div className="mini-spinner" />
            ) : (
              <div>
                <p style={{ color: 'var(--text2)', marginBottom: '16px' }}>Showing {stats.recent.length} most recent checks:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {stats.recent.map(check => (
                    <div key={check.id} style={{ padding: '12px', background: 'var(--card)', borderRadius: 'var(--r)', border: '1px solid var(--border)', fontSize: '0.85rem' }}>
                      <strong style={{ color: 'var(--text)' }}>{check.verdict}</strong> ({check.severity})
                      <div style={{ color: 'var(--text3)', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {check.situation}
                      </div>
                    </div>
                  ))}
                  {stats.recent.length === 0 && (
                    <p style={{ color: 'var(--text3)' }}>No activity yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
