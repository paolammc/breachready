-- BreachReady Supabase schema
-- Run this in Supabase SQL Editor or through the Supabase CLI.

begin;

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  xp integer not null default 0 check (xp >= 0),
  current_streak integer not null default 0 check (current_streak >= 0),
  last_studied_date date,
  target_exam_date date,
  theme text not null default 'dark' check (theme in ('dark', 'light')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.flashcard_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null,
  seen integer not null default 0 check (seen >= 0),
  correct integer not null default 0 check (correct >= 0),
  last_seen timestamptz,
  mastered boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, card_id),
  check (correct <= seen)
);

create table if not exists public.pbq_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  pbq_id text not null,
  attempts integer not null default 0 check (attempts >= 0),
  passed boolean not null default false,
  last_score numeric(5,2) not null default 0 check (last_score between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, pbq_id)
);

create table if not exists public.console_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_id text not null,
  completed boolean not null default false,
  attempts integer not null default 0 check (attempts >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, exercise_id)
);

create table if not exists public.glossary_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  term_id text not null,
  reviewed boolean not null default false,
  quizzed integer not null default 0 check (quizzed >= 0),
  correct integer not null default 0 check (correct >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, term_id),
  check (correct <= quizzed)
);

create table if not exists public.weak_areas (
  user_id uuid not null references auth.users(id) on delete cascade,
  area text not null,
  rank smallint not null check (rank between 1 and 3),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, area),
  unique (user_id, rank)
);

create table if not exists public.activity_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  entity_type text,
  entity_id text,
  xp_delta integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists activity_events_user_created_idx
  on public.activity_events(user_id, created_at desc);

create index if not exists flashcard_progress_user_mastered_idx
  on public.flashcard_progress(user_id, mastered);

create index if not exists pbq_progress_user_passed_idx
  on public.pbq_progress(user_id, passed);

create index if not exists console_progress_user_completed_idx
  on public.console_progress(user_id, completed);

create index if not exists glossary_progress_user_reviewed_idx
  on public.glossary_progress(user_id, reviewed);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger user_progress_set_updated_at
before update on public.user_progress
for each row execute function public.set_updated_at();

create trigger flashcard_progress_set_updated_at
before update on public.flashcard_progress
for each row execute function public.set_updated_at();

create trigger pbq_progress_set_updated_at
before update on public.pbq_progress
for each row execute function public.set_updated_at();

create trigger console_progress_set_updated_at
before update on public.console_progress
for each row execute function public.set_updated_at();

create trigger glossary_progress_set_updated_at
before update on public.glossary_progress
for each row execute function public.set_updated_at();

create trigger weak_areas_set_updated_at
before update on public.weak_areas
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.flashcard_progress enable row level security;
alter table public.pbq_progress enable row level security;
alter table public.console_progress enable row level security;
alter table public.glossary_progress enable row level security;
alter table public.weak_areas enable row level security;
alter table public.activity_events enable row level security;

create policy "profiles_select_own"
on public.profiles for select to authenticated
using ((select auth.uid()) = id);

create policy "profiles_insert_own"
on public.profiles for insert to authenticated
with check ((select auth.uid()) = id);

create policy "profiles_update_own"
on public.profiles for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "user_progress_select_own"
on public.user_progress for select to authenticated
using ((select auth.uid()) = user_id);

create policy "user_progress_insert_own"
on public.user_progress for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "user_progress_update_own"
on public.user_progress for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "flashcard_progress_select_own"
on public.flashcard_progress for select to authenticated
using ((select auth.uid()) = user_id);

create policy "flashcard_progress_insert_own"
on public.flashcard_progress for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "flashcard_progress_update_own"
on public.flashcard_progress for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "flashcard_progress_delete_own"
on public.flashcard_progress for delete to authenticated
using ((select auth.uid()) = user_id);

create policy "pbq_progress_select_own"
on public.pbq_progress for select to authenticated
using ((select auth.uid()) = user_id);

create policy "pbq_progress_insert_own"
on public.pbq_progress for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "pbq_progress_update_own"
on public.pbq_progress for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "pbq_progress_delete_own"
on public.pbq_progress for delete to authenticated
using ((select auth.uid()) = user_id);

create policy "console_progress_select_own"
on public.console_progress for select to authenticated
using ((select auth.uid()) = user_id);

create policy "console_progress_insert_own"
on public.console_progress for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "console_progress_update_own"
on public.console_progress for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "console_progress_delete_own"
on public.console_progress for delete to authenticated
using ((select auth.uid()) = user_id);

create policy "glossary_progress_select_own"
on public.glossary_progress for select to authenticated
using ((select auth.uid()) = user_id);

create policy "glossary_progress_insert_own"
on public.glossary_progress for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "glossary_progress_update_own"
on public.glossary_progress for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "glossary_progress_delete_own"
on public.glossary_progress for delete to authenticated
using ((select auth.uid()) = user_id);

create policy "weak_areas_select_own"
on public.weak_areas for select to authenticated
using ((select auth.uid()) = user_id);

create policy "weak_areas_insert_own"
on public.weak_areas for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "weak_areas_update_own"
on public.weak_areas for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "weak_areas_delete_own"
on public.weak_areas for delete to authenticated
using ((select auth.uid()) = user_id);

create policy "activity_events_select_own"
on public.activity_events for select to authenticated
using ((select auth.uid()) = user_id);

create policy "activity_events_insert_own"
on public.activity_events for insert to authenticated
with check ((select auth.uid()) = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;

  insert into public.user_progress (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

commit;
