import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Layers,
  Shield,
  Target,
  Terminal,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { Logo } from '../components/shared/Logo';
import { ThemeToggle } from '../components/shared/ThemeToggle';
import { useAuth } from '../contexts/AuthContext';

const features = [
  {
    icon: Layers,
    title: 'Smart Flashcards',
    description: 'Drill commands and port numbers with spaced repetition until they stick.',
    color: 'text-brand-warning',
    bg: 'bg-brand-warning/10',
  },
  {
    icon: Terminal,
    title: 'Console Simulator',
    description: 'Type real Security+ commands in a live terminal — the way PBQs actually test you.',
    color: 'text-brand-secondary',
    bg: 'bg-brand-secondary/10',
  },
  {
    icon: Target,
    title: 'PBQ Lab',
    description: 'Walk through performance-based scenarios with step-by-step grading.',
    color: 'text-brand-accent',
    bg: 'bg-brand-accent/10',
  },
  {
    icon: BookOpen,
    title: 'Glossary & Quizzes',
    description: 'Master 150+ exam terms and learn to distinguish easily confused concepts.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
];

const stats = [
  { value: '5', label: 'Exam Domains' },
  { value: '175+', label: 'Flashcards' },
  { value: 'SY0-701', label: 'Current Exam' },
  { value: '750', label: 'Passing Score' },
];

export function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (!loading && user) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="min-h-screen tech-bg">
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/">
            <Logo variant="full" theme="light" />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/login"
              className="hidden sm:inline-flex font-body text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary text-white font-body text-sm font-semibold rounded-lg hover:brightness-110 transition-all"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/90 via-brand-primary to-brand-secondary/30" />
        <div className="absolute inset-0 bg-tech-grid opacity-20 blur-sm scale-105" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="overline text-brand-accent mb-4">CompTIA Security+ SY0-701</p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Study smarter.{' '}
              <span className="text-brand-accent">Pass Security+.</span>
            </h1>
            <p className="text-lg text-white/70 font-body leading-relaxed mb-8 max-w-2xl">
              BreachReady is an interactive study platform built for the Security+ exam.
              Practice commands, ports, PBQs, and glossary terms — then track your progress
              across every domain until you're exam-ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-accent text-brand-primary font-body font-semibold rounded-xl hover:brightness-110 transition-all shadow-tech-lg"
              >
                Start Studying Free
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-body font-semibold rounded-xl hover:bg-white/5 transition-all"
              >
                See How It Works
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                <p className="font-heading text-2xl font-bold text-white">{value}</p>
                <p className="caption text-white/50 mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="overline text-brand-secondary mb-2">Interactive Study Tools</p>
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            Everything you need to pass
          </h2>
          <p className="subtitle max-w-2xl mx-auto">
            Not passive reading — active practice. BreachReady mirrors how the Security+ exam
            actually tests you: typing commands, identifying ports, and solving real scenarios.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, description, color, bg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-tech p-6 hover:shadow-tech-lg transition-shadow"
            >
              <div className={`inline-flex p-3 rounded-xl ${bg} mb-4`}>
                <Icon size={24} className={color} />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">{title}</h3>
              <p className="subtitle">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="card-tech p-8 lg:p-12 bg-gradient-to-br from-brand-primary to-brand-secondary/20 border-brand-secondary/20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="overline text-brand-accent mb-2">Track Your Progress</p>
              <h2 className="font-heading text-3xl font-bold text-white mb-4">
                Your progress, saved to the cloud
              </h2>
              <p className="text-white/70 font-body leading-relaxed mb-6">
                Create an account with your email and every flashcard mastered, command typed,
                and PBQ completed is tracked automatically. Pick up where you left off on any device.
              </p>
              <ul className="space-y-3">
                {[
                  { icon: TrendingUp, text: 'XP levels from Cadet to BreachReady' },
                  { icon: Zap, text: 'Daily streaks and study milestones' },
                  { icon: Shield, text: 'Secure, private progress with row-level security' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-white/80 font-body text-sm">
                    <Icon size={18} className="text-brand-accent flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 w-full max-w-sm">
                <div className="flex items-center justify-between mb-6">
                  <span className="caption text-white/50">Your Dashboard</span>
                  <span className="px-2 py-1 bg-brand-warning/20 text-brand-warning text-xs font-body font-semibold rounded-full">
                    1,240 XP
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Flashcards', pct: 68, color: 'bg-brand-warning' },
                    { label: 'Console', pct: 45, color: 'bg-brand-secondary' },
                    { label: 'PBQ Lab', pct: 30, color: 'bg-brand-accent' },
                    { label: 'Glossary', pct: 52, color: 'bg-purple-400' },
                  ].map(({ label, pct, color }) => (
                    <div key={label}>
                      <div className="flex justify-between mb-1">
                        <span className="caption text-white/60">{label}</span>
                        <span className="caption text-white/60">{pct}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
          Ready to get BreachReady?
        </h2>
        <p className="subtitle max-w-xl mx-auto mb-8">
          Know It. Type It. Pass It. Start your Security+ study journey today.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-secondary text-white font-body font-semibold rounded-xl hover:brightness-110 transition-all shadow-tech-lg"
        >
          Create Free Account
          <ArrowRight size={20} />
        </Link>
      </section>

      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo variant="icon" />
          <p className="caption">CompTIA Security+ SY0-701 · BreachReady</p>
        </div>
      </footer>
    </div>
  );
}
