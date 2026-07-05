import { supabase } from './supabase';
import type { BreachReadyState } from '../types';

export async function loadUserProgress(userId: string): Promise<BreachReadyState> {
  if (!supabase) throw new Error('Supabase is not configured');

  const [
    userProgressRes,
    flashcardsRes,
    pbqsRes,
    consoleRes,
    glossaryRes,
    weakAreasRes,
  ] = await Promise.all([
    supabase.from('user_progress').select('*').eq('user_id', userId).maybeSingle(),
    supabase.from('flashcard_progress').select('*').eq('user_id', userId),
    supabase.from('pbq_progress').select('*').eq('user_id', userId),
    supabase.from('console_progress').select('*').eq('user_id', userId),
    supabase.from('glossary_progress').select('*').eq('user_id', userId),
    supabase.from('weak_areas').select('*').eq('user_id', userId).order('rank'),
  ]);

  if (userProgressRes.error) throw userProgressRes.error;
  if (flashcardsRes.error) throw flashcardsRes.error;
  if (pbqsRes.error) throw pbqsRes.error;
  if (consoleRes.error) throw consoleRes.error;
  if (glossaryRes.error) throw glossaryRes.error;
  if (weakAreasRes.error) throw weakAreasRes.error;

  const up = userProgressRes.data;

  const flashcards: BreachReadyState['flashcards'] = {};
  for (const row of flashcardsRes.data ?? []) {
    flashcards[row.card_id] = {
      seen: row.seen,
      correct: row.correct,
      lastSeen: row.last_seen ?? '',
      mastered: row.mastered,
    };
  }

  const pbqs: BreachReadyState['pbqs'] = {};
  for (const row of pbqsRes.data ?? []) {
    pbqs[row.pbq_id] = {
      attempts: row.attempts,
      passed: row.passed,
      lastScore: Number(row.last_score),
    };
  }

  const console: BreachReadyState['console'] = {};
  for (const row of consoleRes.data ?? []) {
    console[row.exercise_id] = {
      completed: row.completed,
      attempts: row.attempts,
    };
  }

  const glossary: BreachReadyState['glossary'] = {};
  for (const row of glossaryRes.data ?? []) {
    glossary[row.term_id] = {
      reviewed: row.reviewed,
      quizzed: row.quizzed,
      correct: row.correct,
    };
  }

  return {
    xp: up?.xp ?? 0,
    streak: {
      current: up?.current_streak ?? 0,
      lastStudied: up?.last_studied_date ?? '',
    },
    flashcards,
    pbqs,
    console,
    glossary,
    weakAreas: (weakAreasRes.data ?? []).map((row) => row.area),
    targetExamDate: up?.target_exam_date ?? null,
  };
}

export async function saveUserProgress(userId: string, state: BreachReadyState): Promise<void> {
  if (!supabase) throw new Error('Supabase is not configured');

  const { error: progressError } = await supabase.from('user_progress').upsert({
    user_id: userId,
    xp: state.xp,
    current_streak: state.streak.current,
    last_studied_date: state.streak.lastStudied ? state.streak.lastStudied.slice(0, 10) : null,
    target_exam_date: state.targetExamDate,
  });

  if (progressError) throw progressError;

  const flashcardRows = Object.entries(state.flashcards).map(([cardId, progress]) => ({
    user_id: userId,
    card_id: cardId,
    seen: progress.seen,
    correct: progress.correct,
    last_seen: progress.lastSeen || null,
    mastered: progress.mastered,
  }));

  if (flashcardRows.length > 0) {
    const { error } = await supabase.from('flashcard_progress').upsert(flashcardRows);
    if (error) throw error;
  }

  const pbqRows = Object.entries(state.pbqs).map(([pbqId, progress]) => ({
    user_id: userId,
    pbq_id: pbqId,
    attempts: progress.attempts,
    passed: progress.passed,
    last_score: progress.lastScore,
  }));

  if (pbqRows.length > 0) {
    const { error } = await supabase.from('pbq_progress').upsert(pbqRows);
    if (error) throw error;
  }

  const consoleRows = Object.entries(state.console).map(([exerciseId, progress]) => ({
    user_id: userId,
    exercise_id: exerciseId,
    completed: progress.completed,
    attempts: progress.attempts,
  }));

  if (consoleRows.length > 0) {
    const { error } = await supabase.from('console_progress').upsert(consoleRows);
    if (error) throw error;
  }

  const glossaryRows = Object.entries(state.glossary).map(([termId, progress]) => ({
    user_id: userId,
    term_id: termId,
    reviewed: progress.reviewed,
    quizzed: progress.quizzed,
    correct: progress.correct,
  }));

  if (glossaryRows.length > 0) {
    const { error } = await supabase.from('glossary_progress').upsert(glossaryRows);
    if (error) throw error;
  }

  await supabase.from('weak_areas').delete().eq('user_id', userId);

  if (state.weakAreas.length > 0) {
    const weakAreaRows = state.weakAreas.slice(0, 3).map((area, index) => ({
      user_id: userId,
      area,
      rank: index + 1,
    }));
    const { error } = await supabase.from('weak_areas').insert(weakAreaRows);
    if (error) throw error;
  }
}
