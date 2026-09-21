'use client';

import { useActionState, useRef, useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { saveArticle, uploadImage } from '@/app/admin/actions';
import type { Article } from '@/lib/articles';
import { normalizeParagraphs } from '@/lib/markdown';

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

export default function ArticleEditor({ article }: { article?: Article }) {
  const [state, action, pending] = useActionState(saveArticle, null);

  const [title, setTitle] = useState(article?.title ?? '');
  const [slug, setSlug] = useState(article?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(article?.slug));
  const [cover, setCover] = useState(article?.cover_image ?? '');
  const [body, setBody] = useState(article?.body ?? '');
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState<'cover' | 'inline' | null>(null);
  const [uploadErr, setUploadErr] = useState('');
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  async function upload(file: File, kind: 'cover' | 'inline') {
    setUploadErr('');
    setUploading(kind);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await uploadImage(fd);
      if (res.error) { setUploadErr(res.error); return; }
      if (res.url) {
        if (kind === 'cover') {
          setCover(res.url);
        } else {
          const caption = (window.prompt('Image caption (optional):') || '').trim();
          setBody((b) => `${b}${b && !b.endsWith('\n') ? '\n\n' : ''}![${caption}](${res.url})\n`);
        }
      }
    } finally {
      setUploading(null);
    }
  }

  const field = 'w-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 px-3 py-2.5 font-mono text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500/60';
  const label = 'block text-[10px] font-mono tracking-[0.15em] text-slate-500 dark:text-slate-500 uppercase mb-1.5';

  return (
    <form action={action} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {article && <input type="hidden" name="id" value={article.id} />}
      <input type="hidden" name="cover_image" value={cover} />
      <input type="hidden" name="body" value={body} />

      {/* ── Main column ── */}
      <div className="lg:col-span-2 space-y-5">
        <div>
          <label className={label}>Title</label>
          <input
            name="title" required value={title}
            onChange={(e) => { setTitle(e.target.value); if (!slugTouched) setSlug(slugify(e.target.value)); }}
            className={`${field} !text-lg`} placeholder="Article title"
          />
        </div>

        <div>
          <label className={label}>Slug</label>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-400 dark:text-slate-600">/articles/</span>
            <input
              name="slug" value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
              onBlur={(e) => setSlug(slugify(e.target.value))}
              className={field} placeholder="url-slug"
            />
          </div>
        </div>

        <div>
          <label className={label}>Excerpt</label>
          <textarea name="excerpt" defaultValue={article?.excerpt ?? ''} rows={2} className={field} placeholder="One or two sentences shown on cards." />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={`${label} mb-0`}>Body (Markdown)</label>
            <div className="flex items-center gap-3">
              <label className="text-[11px] font-mono text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                {uploading === 'inline' ? 'Uploading…' : '+ Insert image'}
                <input type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f, 'inline'); e.target.value = ''; }} />
              </label>
              <button type="button" onClick={() => setShowPreview((v) => !v)} className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hover:underline">
                {showPreview ? 'Edit' : 'Preview'}
              </button>
            </div>
          </div>
          {showPreview ? (
            <div className="min-h-[300px] bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 p-4 text-sm prose-preview">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: (pr) => <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300" {...pr} />,
                  img: ({ src, alt }) => (
                    <figure className="my-5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={typeof src === 'string' ? src : ''} alt={alt || ''} className="w-full rounded" />
                      {alt ? <figcaption className="mt-2 text-center text-[12px] font-mono text-slate-400">{alt}</figcaption> : null}
                    </figure>
                  ),
                }}
              >
                {body ? normalizeParagraphs(body) : '_Nothing to preview_'}
              </ReactMarkdown>
            </div>
          ) : (
            <textarea ref={bodyRef} value={body} onChange={(e) => setBody(e.target.value)} rows={16}
              className={`${field} leading-relaxed`} placeholder="Write in Markdown. Use the button above to upload inline images." />
          )}
          {uploadErr && <p className="text-[12px] font-mono text-red-600 dark:text-red-400 mt-1.5">{uploadErr}</p>}
        </div>
      </div>

      {/* ── Sidebar ── */}
      <div className="space-y-5">
        <div className="bg-slate-50 dark:bg-white/[0.03] p-4">
          <label className={label}>Cover image</label>
          <div className="relative aspect-[16/10] bg-slate-100 dark:bg-white/[0.06] overflow-hidden mb-2 flex items-center justify-center">
            {cover ? (
              <Image src={cover} alt="cover" fill sizes="300px" className="object-cover" />
            ) : (
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-600">No cover</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <label className="flex-1 text-center py-2 text-[11px] font-mono tracking-wider uppercase border border-slate-300 dark:border-white/15 cursor-pointer hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {uploading === 'cover' ? 'Uploading…' : cover ? 'Replace' : 'Upload'}
              <input type="file" accept="image/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f, 'cover'); e.target.value = ''; }} />
            </label>
            {cover && (
              <button type="button" onClick={() => setCover('')} className="py-2 px-3 text-[11px] font-mono uppercase text-slate-400 hover:text-red-500 transition-colors">
                Remove
              </button>
            )}
          </div>
        </div>

        <div>
          <label className={label}>Author</label>
          <input name="author" defaultValue={article?.author ?? ''} className={field} placeholder="e.g. NEDApay Team" />
        </div>

        <div>
          <label className={label}>Tags (comma-separated)</label>
          <input name="tags" defaultValue={article?.tags?.join(', ') ?? ''} className={field} placeholder="product, tanzania" />
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input type="checkbox" name="published" defaultChecked={article?.published ?? false} className="w-4 h-4 accent-blue-600" />
          <span className="text-sm font-mono text-slate-700 dark:text-slate-300">Published</span>
        </label>

        {state?.error && <p className="text-[12px] font-mono text-red-600 dark:text-red-400">{state.error}</p>}

        <button type="submit" disabled={pending} className="w-full py-3 font-mono text-sm tracking-widest uppercase bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors disabled:opacity-50">
          {pending ? 'Saving…' : 'Save article'}
        </button>
      </div>
    </form>
  );
}
