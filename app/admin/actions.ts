'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { slugify } from '@/lib/articles';

/** Ensure the caller is a signed-in team member; returns their user. */
async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  return user;
}

// ── Auth ────────────────────────────────────────────────────────
export async function signIn(_prev: unknown, formData: FormData) {
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  const next = String(formData.get('next') || '/admin');

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect(next.startsWith('/admin') ? next : '/admin');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

// ── Image upload (to Supabase Storage) ──────────────────────────
export async function uploadImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  try {
    await requireUser();
    const file = formData.get('file') as File | null;
    if (!file || file.size === 0) return { error: 'No file provided' };
    if (file.size > 8 * 1024 * 1024) return { error: 'Image must be under 8MB' };

    const admin = createAdminClient();
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error } = await admin.storage
      .from('article-images')
      .upload(path, bytes, { contentType: file.type || 'image/jpeg', upsert: false });
    if (error) return { error: error.message };

    const { data } = admin.storage.from('article-images').getPublicUrl(path);
    return { url: data.publicUrl };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Upload failed' };
  }
}

// ── Article CRUD ────────────────────────────────────────────────
type ArticleInput = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  body: string;
  author: string;
  tags: string[];
  published: boolean;
};

function parseForm(formData: FormData): ArticleInput {
  const title = String(formData.get('title') || '').trim();
  const slugRaw = String(formData.get('slug') || '').trim();
  return {
    id: (formData.get('id') as string) || undefined,
    title,
    slug: slugify(slugRaw || title),
    excerpt: String(formData.get('excerpt') || '').trim(),
    cover_image: String(formData.get('cover_image') || '').trim(),
    body: String(formData.get('body') || ''),
    author: String(formData.get('author') || '').trim(),
    tags: String(formData.get('tags') || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    published: formData.get('published') === 'on' || formData.get('published') === 'true',
  };
}

export async function saveArticle(_prev: unknown, formData: FormData) {
  try {
    await requireUser();
    const input = parseForm(formData);
    if (!input.title) return { error: 'Title is required' };
    if (!input.slug) return { error: 'Slug is required' };

    const admin = createAdminClient();
    const row = {
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt || null,
      cover_image: input.cover_image || null,
      body: input.body,
      author: input.author || null,
      tags: input.tags,
      published: input.published,
      published_at: input.published ? new Date().toISOString() : null,
    };

    if (input.id) {
      // preserve original published_at if it was already set
      const { data: existing } = await admin
        .from('articles')
        .select('published_at')
        .eq('id', input.id)
        .maybeSingle();
      if (input.published && existing?.published_at) row.published_at = existing.published_at;

      const { error } = await admin.from('articles').update(row).eq('id', input.id);
      if (error) return { error: error.message };
    } else {
      const { error } = await admin.from('articles').insert(row);
      if (error) return { error: error.message };
    }

    revalidatePath('/admin');
    revalidatePath('/articles');
    revalidatePath(`/articles/${input.slug}`);
    revalidatePath('/');
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Save failed' };
  }
  redirect('/admin');
}

export async function deleteArticle(id: string) {
  await requireUser();
  const admin = createAdminClient();
  const { error } = await admin.from('articles').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  revalidatePath('/articles');
  revalidatePath('/');
}
