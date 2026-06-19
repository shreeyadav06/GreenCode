"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
  loginAsGuest: () => void;
  logoutGuest: () => void;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, isGuest: false, loginAsGuest: () => {}, logoutGuest: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Check if guest mode was previously set
    if (typeof window !== 'undefined' && sessionStorage.getItem('guestMode') === 'true') {
      setIsGuest(true);
    }

    // Handle redirect result from signInWithRedirect
    getRedirectResult(auth).then((result) => {
      if (result && result.user && window.location.pathname === '/login') {
        window.location.href = '/';
      }
    }).catch((err) => {
      console.error("Redirect Error:", err);
    });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginAsGuest = () => {
    setIsGuest(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('guestMode', 'true');
    }
  };

  const logoutGuest = () => {
    setIsGuest(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('guestMode');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isGuest, loginAsGuest, logoutGuest }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
