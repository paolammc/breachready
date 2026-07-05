# BreachReady Supabase Setup

This folder contains the starting Supabase schema for BreachReady.

## 1. Create the Supabase Project

1. Go to https://supabase.com/dashboard.
2. Create a new project.
3. Save the project URL and anon public key from **Project Settings > API**.

## 2. Run the Schema

Use either option:

### Supabase Dashboard

1. Open **SQL Editor**.
2. Paste the contents of `migrations/20260624143000_initial_breachready_schema.sql`.
3. Run it.

### Supabase CLI

```sh
supabase link --project-ref <your-project-ref>
supabase db push
```

## 3. Enable Email Auth

1. Open **Authentication > Providers** and ensure **Email** is enabled.
2. For faster onboarding during development, you can disable **Confirm email** under **Authentication > Providers > Email**.
3. Set your site URL to your production domain (for example `https://getbreachready.com`) under **Authentication > URL Configuration**.

## 4. Environment Variables

Add these locally and in Vercel:

```sh
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## Security Model

All user-owned tables have Row Level Security enabled. Policies only allow authenticated users to read or write rows where their user id matches `auth.uid()`.

Protected tables:

- `profiles`
- `user_progress`
- `flashcard_progress`
- `pbq_progress`
- `console_progress`
- `glossary_progress`
- `weak_areas`
- `activity_events`

The `handle_new_user()` trigger creates a `profiles` row and a `user_progress` row when a user signs up.
