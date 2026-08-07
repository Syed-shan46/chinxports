import React from "react";

export default function ShopifyTrustSection() {
    return (
        <section className="py-24 lg:py-32 bg-[#0a0a0a] text-white overflow-hidden relative">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                </svg>
            </div>

            <div className="px-6 lg:px-16 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-16">
                    <div className="space-y-6">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-primary-gold uppercase">Why Partners Trust Us</span>
                        <h2 className="font-display text-4xl lg:text-7xl">The ChinaXports <span className="italic font-normal">Standard</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                        <div className="space-y-6 group p-8 border border-white/5 bg-white/[0.02] rounded-sm hover:border-primary-gold/30 transition-all duration-700">
                            <i className="bi bi-lightning-charge text-3xl text-primary-gold"></i>
                            <h3 className="text-[11px] font-bold tracking-widest uppercase">Unmatched Speed</h3>
                            <p className="text-xs text-white/40 leading-relaxed italic">Proprietary logistics channels ensuring 30% faster turnaround than industry averages.</p>
                        </div>
                        <div className="space-y-6 group p-8 border border-white/5 bg-white/[0.02] rounded-sm hover:border-primary-gold/30 transition-all duration-700 shadow-2xl">
                            <i className="bi bi-shield-check text-3xl text-primary-gold"></i>
                            <h3 className="text-[11px] font-bold tracking-widest uppercase">Total Transparency</h3>
                            <p className="text-xs text-white/40 leading-relaxed italic">Real-time tracking and verified supplier certification for absolute peace of mind.</p>
                        </div>
                        <div className="space-y-6 group p-8 border border-white/5 bg-white/[0.02] rounded-sm hover:border-primary-gold/30 transition-all duration-700">
                            <i className="bi bi-people text-3xl text-primary-gold"></i>
                            <h3 className="text-[11px] font-bold tracking-widest uppercase">Global Network</h3>
                            <p className="text-xs text-white/40 leading-relaxed italic">Direct access to 500+ premium factories and artisanal clusters across mainland China.</p>
                        </div>
                    </div>

                    <div className="pt-12">
                        <p className="text-xl font-display italic text-white/60">"Your products. Our responsibility. Delivered worldwide."</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
