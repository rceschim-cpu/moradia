import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getAuth, inMemoryPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAP0RXwEhaY6NwpTN6YCboS_KVgeOpua4w',
  authDomain: 'moradia-be86e.firebaseapp.com',
  projectId: 'moradia-be86e',
  storageBucket: 'moradia-be86e.firebasestorage.app',
  messagingSenderId: '105112233934',
  appId: '1:105112233934:web:b15853fbc71314e22cad9f',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

function createAuth() {
  try {
    return initializeAuth(app, { persistence: inMemoryPersistence });
  } catch {
    return getAuth(app);
  }
}

export const auth = createAuth();
export const db = getFirestore(app);
export default app;
