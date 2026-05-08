import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function AdminPage() {
  const { user, isAdmin, authLoading } = useAuth();
  const [stats, setStats] = useState({ totalChecks: 0, recent: [] });
  const [flagged, setFlagged] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    async function fetchAll() {
      if (!isAdmin) return;
      setError('');
      try {
        // Fetch recent checks (try with orderBy, fallback without)
        let recentChecks = [];
        try {
          const checksQ = query(collection(db, 'checks'), orderBy('createdAt', 'desc'), limit(20));
          const checksSnap = await getDocs(checksQ);
          recentChecks = checksSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch {
          // Fallback: fetch without ordering (index might not exist yet)
          const checksSnap = await getDocs(collection(db, 'checks'));
          recentChecks = checksSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        }

        // Fetch flagged reviews (try with orderBy, fallback without)
        let flaggedItems = [];
        try {
          const flaggedQ = query(collection(db, 'flagged_responses'), orderBy('flaggedAt', 'desc'), limit(20));
          const flaggedSnap = await getDocs(flaggedQ);
          flaggedItems = flaggedSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        } catch {
          const flaggedSnap = await getDocs(collection(db, 'flagged_responses'));
          flaggedItems = flaggedSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        }

        // Fetch users
        const usersSnap = await getDocs(collection(db, 'users'));
        const userItems = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        setStats({ totalChecks: recentChecks.length, recent: recentChecks });
        setFlagged(flaggedItems);
        setUsers(userItems);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError(err.message || 'Failed to load admin data. Check Firestore rules.');
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
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

  const tabStyle = (tab) => ({
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font)',
    fontWeight: 600,
    fontSize: '0.85rem',
    background: activeTab === tab ? 'var(--accent)' : 'var(--card)',
    color: activeTab === tab ? '#fff' : 'var(--text2)',
    transition: 'all 0.2s'
  });

  const cardStyle = {
    background: 'var(--bg2)',
    padding: '32px',
    borderRadius: 'var(--r-lg)',
    border: '1px solid var(--border)'
  };

  const itemStyle = {
    padding: '14px',
    background: 'var(--card)',
    borderRadius: 'var(--r)',
    border: '1px solid var(--border)',
    fontSize: '0.85rem'
  };

  return (
    <div className="admin-page section" style={{ minHeight: '80vh' }}>
      <div className="container-wide">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">👑 ADMIN</span>
          <h1 className="section-h2" style={{ color: 'var(--accent-l)' }}>Control Panel</h1>
          <p className="section-sub">
            Welcome back, <strong>{user.displayName || user.email}</strong>. Full premium access is active.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="error-banner" style={{ marginBottom: '24px' }}>
            ⚠️ {error}
          </div>
        )}

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          <div style={{ ...cardStyle, textAlign: 'center', borderColor: 'var(--accent)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-l)' }}>{stats.recent.length}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text3)', marginTop: '4px' }}>Recent Checks</div>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center', borderColor: 'var(--orange)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--orange)' }}>{flagged.length}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text3)', marginTop: '4px' }}>Flagged Reviews</div>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center', borderColor: 'var(--green)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--green)' }}>{users.length}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text3)', marginTop: '4px' }}>Registered Users</div>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center' }}>
            <Link to="/check" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
              Run Premium Check →
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button style={tabStyle('overview')} onClick={() => setActiveTab('overview')}>📊 Activity</button>
          <button style={tabStyle('flagged')} onClick={() => setActiveTab('flagged')}>🚩 Flagged Reviews ({flagged.length})</button>
          <button style={tabStyle('users')} onClick={() => setActiveTab('users')}>👥 Users ({users.length})</button>
        </div>

        {/* Tab Content */}
        {loading ? (
          <div className="page-center"><div className="mini-spinner" /></div>
        ) : (
          <>
            {/* Activity Tab */}
            {activeTab === 'overview' && (
              <div style={cardStyle}>
                <h3 style={{ marginBottom: '16px' }}>Recent Legal Checks</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {stats.recent.map(check => (
                    <div key={check.id} style={itemStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        <strong style={{ color: 'var(--text)' }}>{check.verdict || 'N/A'}</strong>
                        <span style={{
                          fontSize: '0.7rem',
                          padding: '2px 8px',
                          borderRadius: '100px',
                          fontWeight: 700,
                          background: check.severity === 'Urgent' || check.severity === 'High' ? 'var(--red-bg)' : 'var(--green-bg)',
                          color: check.severity === 'Urgent' || check.severity === 'High' ? 'var(--red)' : 'var(--green)',
                          border: `1px solid ${check.severity === 'Urgent' || check.severity === 'High' ? 'var(--red-border)' : 'var(--green-border)'}`
                        }}>
                          {check.severity || '—'}
                        </span>
                      </div>
                      <div style={{ color: 'var(--text3)', marginTop: '6px', lineHeight: '1.5' }}>
                        {check.situation ? (check.situation.length > 200 ? check.situation.slice(0, 200) + '…' : check.situation) : 'No situation text'}
                      </div>
                      <div style={{ color: 'var(--text3)', marginTop: '6px', fontSize: '0.72rem' }}>
                        User: {check.userUid || 'anonymous'} • {check.createdAt?.toDate?.()?.toLocaleString() || '—'}
                      </div>
                    </div>
                  ))}
                  {stats.recent.length === 0 && (
                    <p style={{ color: 'var(--text3)' }}>No checks recorded yet.</p>
                  )}
                </div>
              </div>
            )}

            {/* Flagged Reviews Tab */}
            {activeTab === 'flagged' && (
              <div style={cardStyle}>
                <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🚩 Flagged Reviews
                </h3>
                <p style={{ color: 'var(--text3)', marginBottom: '16px', fontSize: '0.85rem' }}>
                  These are responses that users flagged as inaccurate or unhelpful.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {flagged.map(item => (
                    <div key={item.id} style={{ ...itemStyle, borderColor: 'var(--orange)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          padding: '2px 10px',
                          borderRadius: '100px',
                          fontWeight: 700,
                          background: 'rgba(249,115,22,.12)',
                          color: 'var(--orange)',
                          border: '1px solid rgba(249,115,22,.3)',
                          textTransform: 'uppercase'
                        }}>
                          {item.status || 'pending_review'}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>
                          {item.flaggedAt?.toDate?.()?.toLocaleString() || '—'}
                        </span>
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <strong style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>Situation:</strong>
                        <div style={{ color: 'var(--text3)', marginTop: '4px', lineHeight: '1.5' }}>
                          {item.situation ? (item.situation.length > 300 ? item.situation.slice(0, 300) + '…' : item.situation) : 'N/A'}
                        </div>
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <strong style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>Verdict Given:</strong>
                        <div style={{ color: 'var(--text3)', marginTop: '4px', lineHeight: '1.5', maxHeight: '100px', overflow: 'hidden' }}>
                          {item.verdictText ? (item.verdictText.length > 300 ? item.verdictText.slice(0, 300) + '…' : item.verdictText) : 'N/A'}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: '6px' }}>
                        User: {item.userUid || 'anonymous'}
                      </div>
                    </div>
                  ))}
                  {flagged.length === 0 && (
                    <p style={{ color: 'var(--text3)' }}>No flagged reviews yet. 🎉</p>
                  )}
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div style={cardStyle}>
                <h3 style={{ marginBottom: '16px' }}>Registered Users</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {users.map(u => (
                    <div key={u.id} style={itemStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        <strong style={{ color: 'var(--text)' }}>{u.email || u.id}</strong>
                        <span style={{
                          fontSize: '0.7rem',
                          padding: '2px 10px',
                          borderRadius: '100px',
                          fontWeight: 700,
                          background: u.plan === 'yearly' || u.plan === 'lifetime' ? 'var(--green-bg)' : 'var(--bg)',
                          color: u.plan === 'yearly' || u.plan === 'lifetime' ? 'var(--green)' : 'var(--text3)',
                          border: `1px solid ${u.plan === 'yearly' || u.plan === 'lifetime' ? 'var(--green-border)' : 'var(--border)'}`,
                          textTransform: 'uppercase'
                        }}>
                          {u.plan || 'free'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: '6px' }}>
                        Checks remaining: {u.checksRemaining ?? '—'} • Unlocked: {u.unlockedAt?.toDate?.()?.toLocaleString() || '—'}
                      </div>
                    </div>
                  ))}
                  {users.length === 0 && (
                    <p style={{ color: 'var(--text3)' }}>No registered users yet.</p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
