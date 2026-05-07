import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, getUserPlan } from '../services/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userPlan, setUserPlan] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const plan = await getUserPlan(firebaseUser.uid);
        setUserPlan(plan);
      } else {
        setUserPlan(null);
      }
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  const refreshPlan = async () => {
    if (user) {
      const plan = await getUserPlan(user.uid);
      setUserPlan(plan);
    }
  };

  const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());
  const isAdmin = user && user.email && adminEmails.includes(user.email.toLowerCase());

  return (
    <AuthContext.Provider value={{ user, userPlan, authLoading, refreshPlan, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
