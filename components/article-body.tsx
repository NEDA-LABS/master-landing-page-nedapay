import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/** Renders article markdown with the site's typography. Server component. */
export default function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (p) => <h2 className="font-display text-3xl sm:text-4xl text-slate-900 dark:text-white mt-10 mb-4 leading-[0.95]" {...p} />,
          h2: (p) => <h2 className="font-display text-2xl sm:text-3xl text-slate-900 dark:text-white mt-10 mb-4 leading-[0.95]" {...p} />,
          h3: (p) => <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-8 mb-3" {...p} />,
          p: (p) => <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300 font-light mb-5" {...p} />,
          a: (p) => <a className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-cyan-500 transition-colors" target="_blank" rel="noopener noreferrer" {...p} />,
          ul: (p) => <ul className="list-disc pl-5 mb-5 space-y-1.5 text-[15px] text-slate-700 dark:text-slate-300 font-light" {...p} />,
          ol: (p) => <ol className="list-decimal pl-5 mb-5 space-y-1.5 text-[15px] text-slate-700 dark:text-slate-300 font-light" {...p} />,
          li: (p) => <li className="leading-relaxed" {...p} />,
          blockquote: (p) => <blockquote className="border-l-2 border-blue-500/50 pl-4 my-6 italic text-slate-600 dark:text-slate-400" {...p} />,
          code: (p) => <code className="font-mono text-[13px] bg-slate-100 dark:bg-white/[0.06] px-1.5 py-0.5 rounded text-blue-700 dark:text-cyan-300" {...p} />,
          pre: (p) => <pre className="font-mono text-[13px] bg-slate-900 dark:bg-black text-slate-100 p-4 rounded-md overflow-x-auto my-6" {...p} />,
          hr: () => <hr className="my-8 border-slate-200 dark:border-white/10" />,
          // eslint-disable-next-line @next/next/no-img-element
          img: (p) => <img className="w-full rounded-md my-6" alt={p.alt || ''} {...p} />,
          table: (p) => <div className="overflow-x-auto my-6"><table className="w-full text-sm font-mono border-collapse" {...p} /></div>,
          th: (p) => <th className="border border-slate-200 dark:border-white/10 px-3 py-2 text-left bg-slate-50 dark:bg-white/[0.04]" {...p} />,
          td: (p) => <td className="border border-slate-200 dark:border-white/10 px-3 py-2" {...p} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
