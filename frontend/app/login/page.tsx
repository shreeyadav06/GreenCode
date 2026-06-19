"use client";

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getRedirectResult } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, loginAsGuest } = useAuth();

  useEffect(() => {
    if (user) {
      window.location.href = '/';
    }
  }, [user]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-surface-container-lowest dark:bg-surface-container p-8 rounded-2xl shadow-lg dark:shadow-black/30 border border-outline-variant/20 dark:border-outline-variant/10">
        <div className="text-center mb-8">
          <Link href="/" className="font-headline text-3xl font-extrabold text-primary tracking-tight">
            Greencode.
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-on-surface">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant/60 mb-2">Email address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-surface-container-low dark:bg-surface-container-high border border-outline-variant/20 dark:border-outline-variant/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-on-surface placeholder:text-on-surface-variant/30"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant/60 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-surface-container-low dark:bg-surface-container-high border border-outline-variant/20 dark:border-outline-variant/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-on-surface placeholder:text-on-surface-variant/30"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/20 dark:border-outline-variant/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-surface-container-lowest dark:bg-surface-container text-on-surface-variant/50 text-xs uppercase tracking-wider">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-5 flex flex-col gap-3">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-surface-container-low dark:bg-surface-container-high border border-outline-variant/20 dark:border-outline-variant/10 text-on-surface py-3.5 rounded-xl font-bold hover:border-primary/30 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>

            <button
              onClick={handleGuestLogin}
              className="w-full flex items-center justify-center gap-2 bg-surface-container dark:bg-surface-container-high/50 border border-dashed border-outline-variant/30 dark:border-outline-variant/15 text-on-surface-variant py-3.5 rounded-xl font-medium hover:border-primary/30 hover:text-primary transition-all text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              Continue as Guest
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary text-sm hover:underline font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
