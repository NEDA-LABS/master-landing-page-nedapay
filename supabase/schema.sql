-- ══════════════════════════════════════════════════════════════
--  NEDApay — Articles / CMS schema
--  Run this in the Supabase dashboard → SQL Editor (one time).
-- ══════════════════════════════════════════════════════════════

-- 1. Articles table ─────────────────────────────────────────────
create table if not exists public.articles (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  excerpt      text,
  cover_image  text,
  body         text not null default '',      -- markdown
  author       text,
  tags         text[] default '{}',
  published    boolean not null default false,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists articles_published_idx
  on public.articles (published, published_at desc);

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

-- 2. Row Level Security ─────────────────────────────────────────
alter table public.articles enable row level security;

-- Anyone (anon) can read PUBLISHED articles only.
drop policy if exists "public reads published" on public.articles;
create policy "public reads published"
  on public.articles for select
  using (published = true);

-- Authenticated team members can read everything (drafts included).
drop policy if exists "authed reads all" on public.articles;
create policy "authed reads all"
  on public.articles for select
  to authenticated
  using (true);

-- Writes happen through the server using the service-role key, which
-- bypasses RLS — so no insert/update/delete policy is needed here.

-- 3. Storage bucket for images ──────────────────────────────────
insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do nothing;

-- Public read of images in that bucket.
drop policy if exists "public read article-images" on storage.objects;
create policy "public read article-images"
  on storage.objects for select
  using (bucket_id = 'article-images');

-- (Uploads are done server-side with the service-role key.)

-- ── After running this: create your team logins in
--    Authentication → Users → "Add user" (email + password). ──────
