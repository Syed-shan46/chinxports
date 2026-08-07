import React from 'react';
import { ShieldCheck, Plane, Scale, Sparkles, Package, Crown } from 'lucide-react';

export default function WholesaleTrustBar() {
  const trustItems = [
    { icon: <ShieldCheck size={12} />, text: "Verified Global Manufacturer" },
    { icon: <Plane size={12} />, text: "Worldwide Priority Air Logistics" },
    { icon: <Scale size={12} />, text: "Startup-Friendly MOQs" },
    { icon: <Sparkles size={12} />, text: "Export-Grade 18K PVD Coating" },
    { icon: <Package size={12} />, text: "Secured Retail Export Packaging" },
    { icon: <Crown size={12} />, text: "B2B Pricing Scalability Active" }
  ];

  // Double the items to allow seamless marquee looping
  const loopedItems = [...trustItems, ...trustItems, ...trustItems, ...trustItems];

  return (
    <div className="w-full relative bg-deep-black/95 overflow-hidden border-y border-white/5 py-4 select-none">
      {/* Ambient Gold Background Lighting */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-gold/[0.02] to-transparent pointer-events-none" />
      
      {/* Fade-out gradients on both sides for extreme luxury blending */}
      <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-deep-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-deep-black to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee whitespace-nowrap items-center">
        {loopedItems.map((item, i) => (
          <div key={i} className="inline-flex items-center gap-4 px-8">
            <span className="text-primary-gold opacity-80 bg-primary-gold/10 p-1.5 rounded-full scale-90">
              {item.icon}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 font-display italic">
              {item.text}
            </span>
            {/* Subtle Gold Dots as Separators */}
            <div className="w-1 h-1 rounded-full bg-primary-gold/30 ml-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
