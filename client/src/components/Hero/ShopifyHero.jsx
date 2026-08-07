import { Link } from "react-router-dom";

export default function ShopifyHero() {
    return (
        <section className="relative w-full h-[80vh] min-h-[600px] lg:h-[90vh] overflow-hidden bg-[#0a0a0a]">
            {/* Video Background Layer */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                >
                    <source src="/images/hero/hero2_video.mp4" type="video/mp4" />
                </video>
                {/* Refined Cinematic Overlays for Clarity */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/20 to-black/60"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(178,142,68,0.1),_transparent_70%)]"></div>
                {/* Noise texture to hide compression artifacts */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            </div>

            {/* Prestige Watermark (18K) */}
            <div className="absolute -top-20 -left-20 pointer-events-none select-none opacity-[0.03] transform -rotate-12">
                <span className="text-[40rem] font-serif font-bold text-primary-gold leading-none italic">18K</span>
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 flex items-start pt-24 lg:pt-40">
                <div className="container mx-auto px-3 lg:px-12 relative z-10">
                    {/* Elegant Frame Accents */}
                    <div className="absolute -top-12 -left-4 w-24 h-24 border-t border-l border-primary-gold/20 pointer-events-none hidden lg:block"></div>
                    <div className="absolute -bottom-12 -right-4 w-24 h-24 border-b border-r border-primary-gold/20 pointer-events-none hidden lg:block"></div>

                    <div className="max-w-4xl space-y-8 lg:space-y-12">
                        {/* Premium Branding Badge */}
                        <div className="animate-fade-in-down">
                            <div className="inline-flex items-center gap-3 px-6 py-2 border-b border-primary-gold/30 backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-gold shadow-[0_0_8px_rgba(178,142,68,0.8)]"></span>
                                <span className="text-[10px] font-bold tracking-[0.4em] text-primary-gold uppercase">
                                    Anti-Tarnish | Waterproof | Premium 18k Gold
                                </span>
                            </div>
                        </div>

                        {/* High-Impact Title */}
                        <div className="space-y-4">
                            <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-medium leading-[1.05] text-white animate-slide-up">
                                <span className="block text-white/90">Curated</span>
                                <span className="italic font-normal text-primary-gold/80">Prestige</span>
                            </h1>
                            <div className="w-32 h-[1px] bg-gradient-to-r from-primary-gold to-transparent animate-scale-x origin-left"></div>
                        </div>

                        {/* Descriptive Text */}
                        <p className="font-body text-base md:text-lg lg:text-2xl text-white/40 max-w-2xl leading-relaxed animate-fade-in-long delay-300">
                            The ultimate source for high-performance 18K PVD gold jewelry. Engineered with a Premium 18k Gold core for the modern wholesale buyer.
                        </p>

                        {/* CTA Section - Minimalist Brand Version */}

                    </div>
                </div>
            </div>

            {/* Hero Exclusive Features Bar - Transparent Ghost Units */}
            <div className="absolute bottom-0 left-0 w-full z-20 backdrop-blur-md border-t border-white/5 bg-transparent">
                <div className="container mx-auto px-2 lg:px-12 py-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8 items-center">
                        {[
                            { icon: "bi-globe", label: "Global Source" },
                            { icon: "bi-patch-check", label: "Premium Gold" },
                            { icon: "bi-lightning-charge", label: "Express Logistics" },
                            { icon: "bi-shield-lock", label: "Verified Trade" }
                        ].map((f, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-center lg:justify-start gap-3 p-2 lg:p-3 bg-transparent border border-white/[0.05] rounded-sm group hover:bg-white/[0.03] hover:border-primary-gold/30 transition-all duration-500"
                            >
                                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-primary-gold/10 text-primary-gold group-hover:bg-primary-gold group-hover:text-white transition-all">
                                    <i className={`bi ${f.icon} text-[10px]`}></i>
                                </div>
                                <span className="text-[8px] lg:text-[10px] font-bold tracking-[0.3em] text-white/50 group-hover:text-white uppercase whitespace-nowrap">{f.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Shifted up to clear features bar */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0 hidden lg:block">
                <div className="flex flex-col items-center lg:items-start gap-4">
                    <div className="w-[1px] h-20 bg-gradient-to-b from-primary-gold/50 to-transparent relative">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 animate-scroll-line"></div>
                    </div>
                </div>
            </div>

            {/* Visual Flair: Elegant soft orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-gold/[0.03] rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-gold/[0.02] rounded-full blur-[150px] pointer-events-none"></div>
        </section>
    );
}
