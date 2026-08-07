import { useState } from "react";

export default function ShopifyNewsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus("success");
        setEmail("");

        setTimeout(() => setStatus(null), 5000);
    };

    return (
        <section className="relative py-24 lg:py-32 overflow-hidden">
            {/* Visual Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary-gold/5 blur-[120px] rounded-full -z-10"></div>

            <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                <div className="text-center space-y-8">
                    <div className="space-y-4">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-primary-gold uppercase">The Inner Circle</span>
                        <h2 className="font-display text-4xl lg:text-6xl text-deep-black tracking-tight leading-[1.1]">
                            Join Our Universe
                        </h2>
                        <p className="font-body text-charcoal/60 text-sm lg:text-base max-w-xl mx-auto leading-relaxed">
                            Be the first to discover exclusive collections, private sales, and
                            luxury jewelry insights delivered straight to your inbox.
                        </p>
                    </div>

                    <div className="max-w-md mx-auto pt-4 relative">
                        {status === "success" ? (
                            <div className="p-6 bg-deep-black text-white rounded-sm shadow-2xl animate-scale-up flex items-center justify-center gap-4">
                                <i className="bi bi-check2-circle text-primary-gold text-2xl"></i>
                                <div className="text-left">
                                    <p className="text-xs font-bold tracking-widest uppercase">Subscription Confirmed</p>
                                    <p className="text-[11px] text-white/50 lowercase italic">Welcome to the inner circle.</p>
                                </div>
                            </div>
                        ) : (
                            <form
                                className="flex flex-col sm:flex-row items-stretch gap-0 bg-off-white rounded-sm border border-black/5 p-1 shadow-sm focus-within:shadow-xl focus-within:border-primary-gold/30 transition-all duration-500"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="email"
                                    className="bg-transparent border-none focus:ring-0 px-6 py-4 flex-grow text-sm font-body text-deep-black placeholder:text-charcoal/30"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button
                                    className="bg-deep-black text-white text-[11px] font-bold tracking-[0.2em] uppercase px-10 py-4 hover:bg-primary-gold transition-colors duration-500 rounded-sm"
                                    type="submit"
                                >
                                    Subscribe
                                </button>
                            </form>
                        )}

                        <div className="mt-8 flex items-center justify-center gap-4 opacity-30 grayscale hover:opacity-60 transition-opacity">
                            <span className="text-[9px] font-bold tracking-widest uppercase">Privacy Secured</span>
                            <span className="w-1 h-1 rounded-full bg-charcoal"></span>
                            <span className="text-[9px] font-bold tracking-widest uppercase">No Spam Policy</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
