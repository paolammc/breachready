import { Layers, Terminal, FlaskConical, BookOpen } from 'lucide-react';
import { useBreachReadyStore } from '../store/useBreachReadyStore';
import { HeroBanner } from '../components/dashboard/HeroBanner';
import { ProgressRing } from '../components/dashboard/ProgressRing';
import { QuickLaunchCard } from '../components/dashboard/QuickLaunchCard';
import { DailyChallenge } from '../components/dashboard/DailyChallenge';
import { WeakAreas } from '../components/dashboard/WeakAreas';
import { useNavigate } from 'react-router-dom';

// Placeholder counts - these will come from actual data later
const TOTAL_FLASHCARDS = 175;
const TOTAL_PBQS = 10;
const TOTAL_CONSOLE_EXERCISES = 15;
const TOTAL_GLOSSARY_TERMS = 150;

export function Dashboard() {
  const navigate = useNavigate();
  const { flashcards, pbqs, console: consoleProgress, glossary, streak, weakAreas } = useBreachReadyStore();

  // Calculate progress percentages
  const flashcardsMastered = Object.values(flashcards).filter((f) => f.mastered).length;
  const flashcardsProgress = (flashcardsMastered / TOTAL_FLASHCARDS) * 100;

  const pbqsCompleted = Object.values(pbqs).filter((p) => p.passed).length;
  const pbqsProgress = (pbqsCompleted / TOTAL_PBQS) * 100;

  const consoleCompleted = Object.values(consoleProgress).filter((c) => c.completed).length;
  const consoleExercisesProgress = (consoleCompleted / TOTAL_CONSOLE_EXERCISES) * 100;

  const glossaryReviewed = Object.values(glossary).filter((g) => g.reviewed).length;
  const glossaryProgress = (glossaryReviewed / TOTAL_GLOSSARY_TERMS) * 100;

  // Overall progress
  const overallProgress =
    (flashcardsProgress + pbqsProgress + consoleExercisesProgress + glossaryProgress) / 4;

  // Daily challenge - for now, show a placeholder
  const dailyChallengeType = 'flashcard';
  const dailyChallengeTitle = 'What port does SSH use?';

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <HeroBanner overallProgress={overallProgress} />

      {/* Progress Rings */}
      <section>
        <h2 className="font-display text-xl font-bold text-pale-gray mb-4">
          Your Progress
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <ProgressRing
            progress={flashcardsProgress}
            label="Flashcards"
            onClick={() => navigate('/flashcards')}
          />
          <ProgressRing
            progress={pbqsProgress}
            label="PBQs"
            onClick={() => navigate('/pbq')}
          />
          <ProgressRing
            progress={consoleExercisesProgress}
            label="Console"
            onClick={() => navigate('/console')}
          />
          <ProgressRing
            progress={glossaryProgress}
            label="Glossary"
            onClick={() => navigate('/glossary')}
          />
        </div>
      </section>

      {/* Quick Launch Cards */}
      <section>
        <h2 className="font-display text-xl font-bold text-pale-gray mb-4">
          Quick Launch
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <QuickLaunchCard
            to="/flashcards"
            icon={Layers}
            title="Flashcards"
            description="Commands & port numbers"
            lastScore={Math.round(flashcardsProgress)}
            accentColor="amber"
          />
          <QuickLaunchCard
            to="/console"
            icon={Terminal}
            title="Console Simulator"
            description="Practice typing commands"
            lastScore={Math.round(consoleExercisesProgress)}
            accentColor="crimson"
          />
          <QuickLaunchCard
            to="/pbq"
            icon={FlaskConical}
            title="PBQ Lab"
            description="10 exam scenarios"
            lastScore={Math.round(pbqsProgress)}
            accentColor="green"
          />
          <QuickLaunchCard
            to="/glossary"
            icon={BookOpen}
            title="Glossary"
            description="150+ security terms"
            lastScore={Math.round(glossaryProgress)}
            accentColor="blue"
          />
        </div>
      </section>

      {/* Daily Challenge & Weak Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailyChallenge
          challengeType={dailyChallengeType}
          challengeTitle={dailyChallengeTitle}
          streak={streak.current}
        />
        <WeakAreas areas={weakAreas} />
      </div>
    </div>
  );
}
