export default function ProductCardSkeleton() {
  return (
    <div className="group relative flex flex-col h-full space-y-4 animate-pulse selection:none pointer-events-none">
      {/* Cinematic Aspect Stage */}
      <div className="relative aspect-square w-full bg-[#F7F7F7] rounded-[20px] overflow-hidden border border-black/[0.02]">
        {/* Glinting Gold Overlay Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-150%] animate-[shimmer_2.2s_cubic-bezier(0.4,0,0.2,1)_infinite]"></div>
        
        {/* Top Minimal Pill Skeleton */}
        <div className="absolute top-4 left-4 w-14 h-4 bg-black/[0.03] rounded-full"></div>
      </div>

      {/* Content Stack */}
      <div className="space-y-2 px-1 flex-grow flex flex-col">
        <div className="flex justify-between gap-2">
          <div className="w-16 h-3 bg-black/[0.03] rounded-full"></div>
          <div className="w-10 h-3 bg-primary-gold/5 rounded-full"></div>
        </div>
        
        <div className="w-3/4 h-4.5 bg-black/[0.04] rounded-md mt-2"></div>
        
        <div className="mt-auto pt-4 flex justify-between items-center border-t border-black/[0.02]">
          <div className="space-y-1">
            <div className="w-14 h-4 bg-black/[0.05] rounded-md"></div>
            <div className="w-20 h-2 bg-black/[0.02] rounded-full"></div>
          </div>
          <div className="w-20 h-7 bg-black/[0.03] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
