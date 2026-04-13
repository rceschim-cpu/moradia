import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ─────────────────────────────────────────────────────────────
// 🔥 Cole aqui o config do seu projeto Firebase
// Project Settings → General → Your apps → SDK setup & config
// ─────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: 'AIzaSyAP0RXwEhaY6NwpTN6YCboS_KVgeOpua4w',
  authDomain: 'moradia-be86e.firebaseapp.com',
  projectId: 'moradia-be86e',
  storageBucket: 'moradia-be86e.firebasestorage.app',
  messagingSenderId: '105112233934',
  appId: '1:105112233934:web:b15853fbc71314e22cad9f',
};

// Evita reinicializar em hot-reload
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
