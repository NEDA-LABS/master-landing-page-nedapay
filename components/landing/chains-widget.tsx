'use client';

import Image from "next/image";

export default function ChainsWidget() {
  const chains = [
    { id: 1, name: "Base", image: "/chains/base.svg" },
    { id: 2, name: "Polygon", image: "/chains/polygon.svg" },
    { id: 3, name: "Scroll", image: "/chains/scroll.svg" },
    { id: 4, name: "Arbitrum", image: "/chains/arbitrum.svg" },
    { id: 5, name: "BNB Smart Chain", image: "/chains/bnb.svg" },
    { id: 6, name: "Celo", image: "/chains/celo.svg" },
    { id: 7, name: "Optimism", image: "/chains/optimism.svg" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex -space-x-3">
        {chains.map((chain, index) => (
          <div
            key={chain.id}
            className={`w-10 h-10 rounded-full border-2 border-black/50 flex items-center justify-center shadow-lg backdrop-blur-sm bg-white overflow-hidden relative`}
            style={{ zIndex: 10 - index }}
            title={chain.name}
          >
            <Image 
              src={chain.image} 
              alt={chain.name}
              fill
              className="object-contain p-1"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <span className="text-white font-bold text-lg leading-none">
          7+ Chains
        </span>
        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">
          Supported
        </span>
      </div>
    </div>
  );
}
