import { Link } from "react-router-dom";

export default function Account() {
  return (
    <main className="bg-white min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">

        {/* Header section */}
        <div className="text-center space-y-6 mb-16">
          <div className="relative inline-block">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-off-white flex items-center justify-center rounded-full border border-black/5 mx-auto overflow-hidden">
              <i className="bi bi-person-fill text-4xl lg:text-5xl text-primary-gold/40"></i>
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 lg:w-10 lg:h-10 bg-deep-black text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg">
              <i className="bi bi-gear-fill text-xs lg:text-sm"></i>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="font-display text-4xl lg:text-5xl text-deep-black">My <span className="italic font-normal">Account</span></h1>
            <div className="flex flex-col items-center gap-4">
              <div className="px-6 py-4 bg-off-white/80 border border-black/5 rounded-sm max-w-sm mx-auto backdrop-blur-sm animate-pulse-slow">
                <div className="flex items-start gap-4 text-left">
                  <div className="mt-1 w-2 h-2 bg-primary-gold rounded-full shrink-0"></div>
                  <p className="text-[10px] lg:text-[11px] font-medium leading-relaxed tracking-wide text-charcoal/70 uppercase">
                    Our digital engineering team is presently <span className="text-primary-gold font-bold">enhancing</span> this space with advanced <span className="italic">professional</span> procurement tools. A superior global trade experience is launching soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Simplified Account Space - Roadmap Focus */}
        <div className="py-20 lg:py-24 flex flex-col items-center">
            <div className="w-[1px] h-24 bg-gradient-to-b from-primary-gold/40 to-transparent mb-12"></div>
            <p className="text-[9px] font-bold tracking-[0.6em] text-charcoal/20 uppercase">
                Digital Architecture Evolution
            </p>
        </div>

        {/* Logout / Secondary actions */}
        <div className="mt-16 pt-10 border-t border-black/5 flex flex-col items-center gap-6">
          <button className="text-[10px] font-bold tracking-widest uppercase text-red-500/60 hover:text-red-600 transition-colors flex items-center gap-2">
            <i className="bi bi-box-arrow-right"></i>
            Sign Out of Account
          </button>
          <p className="text-[10px] text-charcoal/20 uppercase tracking-widest">Global Partner ID: #CX-88912</p>
        </div>

      </div>
    </main>
  );
}
