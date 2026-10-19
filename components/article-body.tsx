import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { normalizeParagraphs } from '@/lib/markdown';

/** Renders article markdown with the site's typography. Server component. */
export default function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (p) => <h2 className="mt-14 mb-5 text-[clamp(28px,3vw,40px)] font-medium leading-tight tracking-tight text-np-ink" {...p} />,
          h2: (p) => <h2 className="mt-12 mb-4 text-[clamp(24px,2.4vw,34px)] font-medium leading-tight tracking-tight text-np-ink" {...p} />,
          h3: (p) => <h3 className="mt-8 mb-3 text-xl font-semibold text-np-ink" {...p} />,
          // Unwrap paragraphs that hold only an image, so the <figure> below
          // isn't nested inside a <p> (invalid HTML → hydration warnings).
          p: ({ node, children, ...rest }) => {
            const kids = node?.children ?? [];
            if (kids.length === 1 && (kids[0] as { tagName?: string }).tagName === 'img') {
              return <>{children}</>;
            }
            return <p className="np-body mb-6 text-np-ink/80" {...rest}>{children}</p>;
          },
          a: (p) => <a className="font-semibold text-np-blue underline underline-offset-4 transition-colors hover:text-np-ink" target="_blank" rel="noopener noreferrer" {...p} />,
          ul: (p) => <ul className="np-body mb-6 list-disc space-y-2 pl-6 text-np-ink/80 marker:text-np-blue" {...p} />,
          ol: (p) => <ol className="np-body mb-6 list-decimal space-y-2 pl-6 text-np-ink/80 marker:font-np-mono marker:text-np-blue" {...p} />,
          li: (p) => <li className="leading-relaxed" {...p} />,
          blockquote: (p) => <blockquote className="my-10 border-l-4 border-np-blue pl-6 text-[clamp(20px,1.8vw,26px)] font-medium leading-snug tracking-tight text-np-ink" {...p} />,
          code: (p) => <code className="rounded bg-np-paper px-1.5 py-0.5 font-np-mono text-[0.85em] text-np-ink" {...p} />,
          pre: (p) => <pre className="my-8 overflow-x-auto rounded-2xl bg-np-ink p-6 font-np-mono text-[13px] leading-relaxed text-np-bone [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-np-bone" {...p} />,
          hr: () => <hr className="my-12 border-np-rule" />,
          img: ({ src, alt }) => (
            <figure className="my-7">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={typeof src === 'string' ? src : ''} alt={alt || ''} className="w-full rounded-2xl" />
              {alt ? (
                <figcaption className="np-label mt-3 text-np-label">
                  {alt}
                </figcaption>
              ) : null}
            </figure>
          ),
          table: (p) => <div className="overflow-x-auto my-6"><table className="w-full border-collapse text-[15px]" {...p} /></div>,
          th: (p) => <th className="np-label border-b-2 border-np-ink px-3 py-3 text-left" {...p} />,
          td: (p) => <td className="border-b border-np-rule px-3 py-3" {...p} />,
        }}
      >
        {normalizeParagraphs(markdown)}
      </ReactMarkdown>
    </div>
  );
}
