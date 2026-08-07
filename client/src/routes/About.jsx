import ShopifyTrustSection from "../components/common/ShopifyTrustSection";

export default function About() {
  return (
    <main className="bg-white min-h-screen">
      {/* ... (First section) ... */}
      <section className="relative py-24 lg:py-32 overflow-hidden border-b border-black/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left side: Strategic Imagery - Hidden on Mobile */}
            <div className="hidden lg:block lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-primary-gold/5 rounded-sm -rotate-2 group-hover:rotate-0 transition-transform duration-700"></div>
              <div className="relative overflow-hidden rounded-sm shadow-2xl">
                <img
                  src="/images/web/transport-logistics-img.jpg"
                  alt="Global Logistics Excellence"
                  className="w-full h-[500px] lg:h-[650px] object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-8 -right-8 bg-primary-gold text-white p-8 rounded-sm shadow-2xl hidden lg:block animate-float">
                <p className="text-3xl font-display font-bold">12+</p>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80">Years of trust</p>
              </div>
            </div>

            {/* Right side: Manifesto */}
            <div className="w-full lg:w-1/2 space-y-12">
              <div className="space-y-6">
                <span className="text-[10px] font-bold tracking-[0.4em] text-primary-gold uppercase">Our Philosophy</span>
                <h1 className="font-display text-4xl lg:text-6xl text-deep-black leading-tight">
                  Bridging Markets, <br />
                  <span className="italic font-normal">Delivering Excellence.</span>
                </h1>
                <div className="w-20 h-1 bg-primary-gold"></div>
              </div>

              <div className="space-y-6 text-charcoal/70 font-body text-sm lg:text-base leading-relaxed">
                <p>
                  At <span className="text-deep-black font-bold">ChinaXports</span>, we specialize in sourcing high-quality products
                  directly from China and delivering them to customers across the
                  globe with a seamless door-to-door service. Our mission is to
                  simplify international trade by providing reliable, transparent,
                  and cost-effective solutions for businesses and individuals.
                </p>

                <p>
                  With strong networks and partnerships across China, we ensure
                  that every product is carefully sourced, inspected, and shipped
                  with the highest standards of quality control. From small
                  packages to bulk consignments, our dedicated team handles every
                  step of the process—including product sourcing, consolidation,
                  and last-mile delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-black/5">
                <div className="space-y-3">
                  <h4 className="text-[11px] font-bold tracking-widest uppercase text-deep-black">Wholesale Edge</h4>
                  <p className="text-[12px] text-charcoal/60 leading-relaxed italic">Competitive pricing through optimized supply chain networks.</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-[11px] font-bold tracking-widest uppercase text-deep-black">Quality First</h4>
                  <p className="text-[12px] text-charcoal/60 leading-relaxed italic">Every shipment undergoes rigorous multi-layer inspection protocols.</p>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href="https://wa.me/919747758555"
                  className="btn-gold group"
                >
                  <span>Connect with an expert</span>
                  <i className="bi bi-whatsapp transition-transform group-hover:scale-125"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Values Section */}
      <ShopifyTrustSection />
    </main>
  );
}
