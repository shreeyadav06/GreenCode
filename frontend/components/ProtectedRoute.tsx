"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isGuest } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && !isGuest) {
      router.push('/login');
    }
  }, [user, loading, isGuest, router]);

  if (loading || (!user && !isGuest)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-primary rounded-full animate-bounce"></div>
          <p className="mt-4 text-on-surface-variant font-headline">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
