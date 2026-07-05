import { type FormEvent, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { Logo } from '../components/shared/Logo';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { user, loading, isConfigured, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? '/app';

  if (!loading && user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    const result =
      mode === 'signup'
        ? await signUp(email, password, displayName)
        : await signIn(email, password);

    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (mode === 'signup') {
      setSuccess('Account created! Check your email to confirm, then sign in.');
      setMode('signin');
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen tech-bg flex flex-col">
      <header className="p-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground font-body text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="card-tech w-full max-w-md p-8">
          <div className="flex justify-center mb-6">
            <Logo variant="icon" className="h-14 w-14" />
          </div>

          <h1 className="font-heading text-2xl font-bold text-foreground text-center mb-1">
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="subtitle text-center mb-6">
            {mode === 'signup'
              ? 'Track your Security+ progress across every device'
              : 'Sign in to continue studying'}
          </p>

          {!isConfigured && (
            <div className="mb-4 p-3 rounded-lg bg-brand-warning/10 border border-brand-warning/30 text-brand-warning text-sm font-body">
              Supabase is not configured yet. Add environment variables in Vercel to enable sign-in.
            </div>
          )}

          <div className="flex rounded-lg bg-surface-muted p-1 mb-6">
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 rounded-md font-body text-sm font-medium transition-colors ${
                mode === 'signup' ? 'bg-surface-elevated text-foreground shadow-sm' : 'text-foreground-muted'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 py-2 rounded-md font-body text-sm font-medium transition-colors ${
                mode === 'signin' ? 'bg-surface-elevated text-foreground shadow-sm' : 'text-foreground-muted'
              }`}
            >
              Sign In
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="overline block mb-1.5">Display Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-subtle" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-foreground font-body text-sm focus:ring-2 focus:ring-brand-secondary/30 focus:border-brand-secondary"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="overline block mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-subtle" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-foreground font-body text-sm focus:ring-2 focus:ring-brand-secondary/30 focus:border-brand-secondary"
                />
              </div>
            </div>

            <div>
              <label className="overline block mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-subtle" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-surface text-foreground font-body text-sm focus:ring-2 focus:ring-brand-secondary/30 focus:border-brand-secondary"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-body">{error}</p>
            )}
            {success && (
              <p className="text-brand-accent text-sm font-body">{success}</p>
            )}

            <button
              type="submit"
              disabled={submitting || !isConfigured}
              className="w-full py-3 bg-brand-secondary text-white font-body font-semibold rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Please wait...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
