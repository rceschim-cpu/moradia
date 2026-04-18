import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

// ── Types ────────────────────────────────────────────────────
interface AuthContextData {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, whatsapp?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

interface UserProfile {
  name: string;
  email: string;
  whatsapp?: string;
  birthday?: string;        // "DD/MM"
  donationDay?: number;     // 1-28
  lastDonationMonth?: string; // "YYYY-MM"
  partnerSince: string;
  totalDonated: number;
  housesHelped: number;
}

// ── Context ──────────────────────────────────────────────────
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Observa mudanças de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await loadProfile(firebaseUser.uid);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function loadProfile(uid: string) {
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists()) setProfile(snap.data() as UserProfile);
    } catch (e) {
      console.warn('Erro ao carregar perfil:', e);
    }
  }

  async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(name: string, email: string, password: string, whatsapp = '') {
    const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);

    // Salva nome no Auth
    await updateProfile(newUser, { displayName: name });

    // Cria documento no Firestore
    const userProfile: UserProfile & { createdAt: any } = {
      name,
      email,
      whatsapp,
      partnerSince: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
      totalDonated: 0,
      housesHelped: 0,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', newUser.uid), userProfile);
    setProfile(userProfile);
  }

  async function logout() {
    await signOut(auth);
    setProfile(null);
  }

  async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
