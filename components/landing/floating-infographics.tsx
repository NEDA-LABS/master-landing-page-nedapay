'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, RefreshCw, Send, Wallet } from 'lucide-react';
import Image from 'next/image';

const floatingElements = [
  {
    icon: <Send className="w-4 h-4 text-cyan-500 dark:text-emerald-400" />,
    text: "Send",
    className: "top-[15%] left-[10%] md:left-[25%]",
    delay: 0,
    lightGlow: "shadow-[0_0_20px_rgba(6,182,212,0.4)] border-cyan-200/50"
  },
  {
    icon: <div className="w-4 h-4 rounded-full bg-purple-500 dark:bg-blue-500" />,
    text: "Pay on Farcaster",
    className: "top-[25%] right-[10%] md:right-[15%]",
    delay: 1.5,
    hasAvatar: true,
    lightGlow: "shadow-[0_0_20px_rgba(168,85,247,0.4)] border-purple-200/50"
  },
  {
    icon: <RefreshCw className="w-4 h-4 text-cyan-500 dark:text-blue-400" />,
    text: "Swap",
    className: "bottom-[20%] left-[15%] md:left-[10%]",
    delay: 2.5,
    lightGlow: "shadow-[0_0_20px_rgba(6,182,212,0.4)] border-cyan-200/50"
  },
  {
    icon: <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-green-400" />,
    text: "Cash Out",
    className: "bottom-[15%] right-[20%] md:right-[25%]",
    delay: 1,
    lightGlow: "shadow-[0_0_20px_rgba(6,182,212,0.4)] border-cyan-200/50"
  },
  {
    icon: <Wallet className="w-4 h-4 text-purple-500 dark:text-purple-400" />,
    text: "Accept Stablecoins",
    className: "top-[60%] right-[5%] md:right-[8%]",
    delay: 3,
    lightGlow: "shadow-[0_0_20px_rgba(168,85,247,0.4)] border-purple-200/50"
  },
  {
    icon: <ArrowUpRight className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />,
    text: "Built on Base L2",
    className: "top-[40%] left-[5%] md:left-[8%]",
    delay: 0.5,
    lightGlow: "shadow-[0_0_20px_rgba(6,182,212,0.4)] border-cyan-200/50"
  },
];

export function FloatingInfographics() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mx-auto opacity-50">
      {floatingElements.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 0 }}
          animate={{ 
            y: [-15, 15],
            x: [-10, 10],
            opacity: 0.9,
          }}
          // transition={{
          //   y: {
          //     duration: 5 + (index * 0.5),
          //     repeat: Infinity,
          //     repeatType: "reverse",
          //     ease: "easeInOut",
          //     delay: item.delay,
          //   },
          //   x: {
          //     duration: 7 + (index * 0.8), // Different duration to de-sync axes
          //     repeat: Infinity,
          //     repeatType: "reverse",
          //     ease: "easeInOut",
          //     delay: item.delay * 1.5,
          //   },
          //   opacity: {
          //     duration: 1,
          //     delay: item.delay,
          //   }
          // }}
          className={`absolute ${item.className} hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-white/5 border ${item.lightGlow} dark:border-white/10 dark:shadow-lg backdrop-blur-md transition-all duration-300`}
        >
          {item.hasAvatar ? (
             <div className="relative w-5 h-5 rounded-full overflow-hidden border border-purple-200 dark:border-white/20">
               <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-cyan-500" />
             </div>
          ) : (
            item.icon
          )}
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
            {item.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
