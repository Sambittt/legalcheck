import { createContext, useContext, useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { onAuthChange, db } from '../services/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userPlan, setUserPlan] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let unsubPlan;
    const unsubAuth = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Real-time listener for plan changes
        unsubPlan = onSnapshot(doc(db, 'users', firebaseUser.uid), (docSnap) => {
          if (docSnap.exists()) {
            setUserPlan(docSnap.data());
          } else {
            setUserPlan(null);
          }
          setAuthLoading(false);
        });
      } else {
        setUserPlan(null);
        setAuthLoading(false);
      }
    });
    
    return () => {
      unsubAuth();
      if (unsubPlan) unsubPlan();
    };
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
