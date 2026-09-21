import { createClient, supabaseConfigured } from '@/lib/supabase/server';

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  body: string;
  author: string | null;
  tags: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

/** Published articles, newest first — for the public site. Never throws. */
export async function getPublishedArticles(limit?: number): Promise<Article[]> {
  if (!supabaseConfigured()) return [];
  try {
    const supabase = await createClient();
    let query = supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) return [];
    return (data as Article[]) ?? [];
  } catch {
    return [];
  }
}

/** A single published article by slug (or null). Never throws. */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!supabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();
    if (error) return null;
    return (data as Article) ?? null;
  } catch {
    return null;
  }
}

/** ALL articles incl. drafts — admin only (RLS requires an authed session). */
export async function getAllArticlesForAdmin(): Promise<Article[]> {
  if (!supabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data as Article[]) ?? [];
}

/** One article by id — admin edit view. */
export async function getArticleById(id: string): Promise<Article | null> {
  if (!supabaseConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as Article) ?? null;
}

/** URL-safe slug from a title. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
