'use client';

import Link from 'next/link';

const team = [
  {
    tag: '01',
    name: 'Victor Muhagachi',
    role: 'Co-founder & CTO',
    // TODO: replace with Victor's LinkedIn profile URL
    linkedin: 'https://www.linkedin.com/in/victor-muhagachi',
    initials: 'VM',
  },
  {
    tag: '02',
    name: 'David Machuche',
    role: 'Co-founder, BD & Partnerships',
    // TODO: replace with David's LinkedIn profile URL
    linkedin: 'https://www.linkedin.com/in/david-machuche',
    initials: 'DM',
  },
  {
    tag: '03',
    name: 'Baraka Mangesho',
    role: 'Engineering Lead',
    // TODO: replace with Baraka's LinkedIn profile URL
    linkedin: 'https://www.linkedin.com/in/baraka-mangesho',
    initials: 'BM',
  },
];

// LinkedIn icon SVG
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="relative py-24 bg-white dark:bg-black overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 dark:bg-blue-500/8 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="text-[11px] font-mono tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">
              Core Team
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-blue-500/40 to-transparent" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-3">
            Built by Founders
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
              Who Know the Problem.
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-500 text-base max-w-xl font-light">
            A lean team from Tanzania, solving cross-border payments for Africa using stablecoins and on-chain infrastructure.
          </p>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member.tag}
              className="group relative bg-slate-50 dark:bg-white/[0.025] hover:bg-blue-50/30 dark:hover:bg-blue-500/[0.05] transition-all duration-300 overflow-hidden"
            >
              {/* Top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 dark:via-blue-400/20 to-transparent group-hover:via-blue-500/60 dark:group-hover:via-cyan-400/50 transition-all duration-300" />

              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-blue-500/20 dark:border-blue-400/15 group-hover:border-blue-500/70 dark:group-hover:border-cyan-400/60 transition-colors duration-300" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-blue-500/20 dark:border-blue-400/15 group-hover:border-blue-500/70 dark:group-hover:border-cyan-400/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-blue-500/20 dark:border-blue-400/15 group-hover:border-blue-500/70 dark:group-hover:border-cyan-400/60 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blue-500/20 dark:border-blue-400/15 group-hover:border-blue-500/70 dark:group-hover:border-cyan-400/60 transition-colors duration-300" />

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-b from-blue-500/[0.04] to-transparent" />

              <div className="relative p-6 md:p-8">
                {/* Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono text-slate-300 dark:text-slate-700 tracking-widest">
                    {member.tag}
                  </span>
                  <span className="text-[10px] font-mono tracking-[0.15em] text-blue-600 dark:text-blue-400 px-2 py-0.5 bg-blue-50 dark:bg-blue-500/10">
                    FOUNDER
                  </span>
                </div>

                {/* Avatar */}
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 flex items-center justify-center">
                    <span className="text-white dark:text-black font-bold text-lg tracking-wide font-mono">
                      {member.initials}
                    </span>
                  </div>
                </div>

                {/* Name & role */}
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1 leading-snug">
                  {member.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-500 text-sm font-light mb-6">
                  {member.role}
                </p>

                {/* LinkedIn link */}
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.12em] text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link"
                >
                  <LinkedInIcon className="w-3.5 h-3.5 text-blue-500/60 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors" />
                  VIEW PROFILE
                  <span className="text-slate-300 dark:text-slate-700 group-hover/link:text-blue-400 transition-colors">→</span>
                </Link>

                {/* Bottom accent */}
                <div className="mt-6 h-px bg-gradient-to-r from-blue-500/30 via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
