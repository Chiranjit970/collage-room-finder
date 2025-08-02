'use client';

import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User } from '@/types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser({ id: firebaseUser.uid, ...userDoc.data() } as User);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (
    email: string,
    password: string,
    userData: Omit<User, 'id'>
  ) => {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      ...userData,
      email
    });
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);

  return {
    user,
    loading,
    signup,
    login,
    logout
  };
};
