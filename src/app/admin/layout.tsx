'use client';

import { AdminProvider, useAdmin } from '@/contexts/AdminContext';
import { AdminThemeProvider } from '@/components/admin/AdminThemeProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const { state } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!state.isLoading && !state.isAuthenticated) {
      router.push('/admin/login');
    }
  }, [state.isAuthenticated, state.isLoading, router]);

  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!state.isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminThemeProvider>
      <AdminProvider>
        <AdminRouteGuard>
          {children}
        </AdminRouteGuard>
      </AdminProvider>
    </AdminThemeProvider>
  );
}