# Articles / Newsroom — setup

The site ships fully built. To turn it on you just need a free Supabase
project (Postgres + Storage + Auth) and three env vars. Until then the
public pages show an empty state and `/admin` shows a setup notice — the
rest of the site is unaffected.

## 1. Create a Supabase project
Go to https://supabase.com → **New project** (free tier is enough).

## 2. Run the schema
Supabase dashboard → **SQL Editor** → paste all of `supabase/schema.sql`
→ **Run**. This creates the `articles` table, RLS policies, and the
`article-images` storage bucket.

## 3. Add environment variables
Copy `.env.example` to `.env.local` and fill in from
**Project Settings → API**:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...        # "anon public" key
SUPABASE_SERVICE_ROLE_KEY=...            # "service_role" key — server only
```

On Vercel, add the same three under **Project → Settings → Environment
Variables** and redeploy.

## 4. Create your team logins
Dashboard → **Authentication → Users → Add user** → enter each teammate's
email + password. Only these users can reach `/admin`.

## 5. Write articles
- Go to `/admin` → sign in.
- **+ New** → title, cover image (uploads to Supabase Storage), markdown
  body (with inline image upload + preview), tags, author.
- Tick **Published** and **Save**. It appears at `/articles/<slug>`, on
  `/articles`, and in the "Latest Articles" homepage section.
- Leave **Published** unticked to keep it as a private draft.

## Notes
- Images live in the public `article-images` bucket; `next.config.ts`
  already allows `*.supabase.co` for `next/image`.
- Public visitors (anon key + RLS) can only read **published** articles;
  drafts are visible only to signed-in team members.
- Writes go through the server with the service-role key, so the browser
  never sees it.
