'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, RefreshCw, Send, Wallet } from 'lucide-react';
import Image from 'next/image';

const floatingElements = [
  {
    icon: <Send className="w-4 h-4 text-emerald-400" />,
    text: "Send",
    className: "top-[15%] left-[10%] md:left-[5%]",
    delay: 0,
  },
  {
    icon: <div className="w-4 h-4 rounded-full bg-blue-500" />,
    text: "Pay on Farcaster",
    className: "top-[25%] right-[10%] md:right-[15%]",
    delay: 1.5,
    hasAvatar: true,
  },
  {
    icon: <RefreshCw className="w-4 h-4 text-blue-400" />,
    text: "Swap",
    className: "bottom-[20%] left-[15%] md:left-[10%]",
    delay: 2.5,
  },
  {
    icon: <CheckCircle2 className="w-4 h-4 text-green-400" />,
    text: "Cash Out",
    className: "bottom-[15%] right-[20%] md:right-[25%]",
    delay: 1,
  },
  {
    icon: <Wallet className="w-4 h-4 text-purple-400" />,
    text: "Accept Stablecoins",
    className: "top-[60%] right-[5%] md:right-[8%]",
    delay: 3,
  },
  {
    icon: <ArrowUpRight className="w-4 h-4 text-cyan-400" />,
    text: "Built on Base L2",
    className: "top-[40%] left-[5%] md:left-[8%]",
    delay: 0.5,
  },
];

export function FloatingInfographics() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mx-auto">
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
          className={`absolute ${item.className} hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-lg`}
        >
          {item.hasAvatar ? (
             <div className="relative w-5 h-5 rounded-full overflow-hidden border border-white/20">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500" />
             </div>
          ) : (
            item.icon
          )}
          <span className="text-xs font-medium text-slate-200 whitespace-nowrap">
            {item.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
