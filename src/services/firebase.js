import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const isConfigured = !!import.meta.env.VITE_FIREBASE_API_KEY;

let app, auth, db, googleProvider;

if (isConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
}

// ── Auth ──────────────────────────────────────────────────
export const signInWithGoogle = async () => {
  if (!isConfigured) return null;
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const signOutUser = async () => {
  if (!isConfigured) return;
  await signOut(auth);
};

export const onAuthChange = (callback) => {
  if (!isConfigured) { callback(null); return () => {}; }
  return onAuthStateChanged(auth, callback);
};

// ── User Plan ─────────────────────────────────────────────
export const getUserPlan = async (uid) => {
  if (!isConfigured || !uid) return null;
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    return snap.exists() ? snap.data() : null;
  } catch { return null; }
};

export const saveUserPlan = async (uid, email, plan, licenseKey) => {
  if (!isConfigured || !uid) return;
  try {
    await setDoc(doc(db, 'users', uid), {
      email,
      plan,
      licenseKey,
      unlockedAt: serverTimestamp(),
      checksRemaining: (plan === 'lifetime' || plan === 'yearly') ? 999999 : 1
    }, { merge: true });
  } catch (e) { throw new Error('FIREBASE_SAVE_ERROR'); }
};

export const decrementCheck = async (uid) => {
  if (!isConfigured || !uid) return;
  try {
    const ref = doc(db, 'users', uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const remaining = snap.data().checksRemaining || 0;
      if (remaining > 0) {
        await setDoc(ref, { checksRemaining: remaining - 1 }, { merge: true });
      }
    }
  } catch {}
};

// ── Flagged Responses ─────────────────────────────────────
export const flagResponse = async (situation, verdictText, userUid) => {
  if (!isConfigured) return;
  try {
    await addDoc(collection(db, 'flagged_responses'), {
      situation,
      verdictText,
      userUid: userUid || 'anonymous',
      flaggedAt: serverTimestamp(),
      status: 'pending_review'
    });
  } catch {}
};

// ── Save Check ────────────────────────────────────────────
export const saveCheck = async (situation, verdict, severity, userUid) => {
  if (!isConfigured) return;
  try {
    await addDoc(collection(db, 'checks'), {
      situation,
      verdict,
      severity,
      userUid: userUid || 'anonymous',
      createdAt: serverTimestamp()
    });
  } catch {}
};

export { auth, db };
