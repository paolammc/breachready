import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isConfigured } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen tech-bg flex items-center justify-center">
        <div className="card-tech px-8 py-6 text-center">
          <div className="w-8 h-8 border-2 border-brand-secondary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="subtitle">Loading your study progress...</p>
        </div>
      </div>
    );
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen tech-bg flex items-center justify-center p-4">
        <div className="card-tech max-w-md px-8 py-6 text-center">
          <h1 className="font-heading text-xl font-bold text-foreground mb-2">Database not connected</h1>
          <p className="subtitle mb-4">
            Add <code className="text-brand-secondary">VITE_SUPABASE_URL</code> and{' '}
            <code className="text-brand-secondary">VITE_SUPABASE_ANON_KEY</code> in Vercel, then redeploy.
          </p>
          <a href="/" className="text-brand-secondary font-body text-sm hover:underline">
            Back to home
          </a>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
