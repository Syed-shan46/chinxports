import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Clock, Award, Package, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Wholesale = () => {
  const { setIsPartnerModalOpen } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Sourcing Hub",
      desc: "Direct access to high-efficiency international distribution lines delivering door-to-door anywhere."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "18K PVD Certification",
      desc: "Every single product undergoes vacuum-plating protocols to secure permanent tarnish-free lifetime."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Express Fulfillment",
      desc: "Expedited supply chain handling tailored specifically for high-volume merchant cycles."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "High Profit Margin",
      desc: "Engineered pricing tiers that provide enterprise-level ROI for bulk purchase accounts."
    }
  ];

  const steps = [
    { number: "01", title: "Submit Intake", desc: "Complete our secure wholesale vetting profile." },
    { number: "02", title: "Dossier Review", desc: "Wait for senior account assignment and logic setup." },
    { number: "03", title: "Unlock Inventory", desc: "Gain tier-level access to direct factory-tier volume." }
  ];

  return (
    <div className="bg-white text-matte-black font-sans overflow-x-hidden">
      
      {/* --- CINEMA HERO --- */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-matte-black">
        {/* Dynamic Overlay Mesh */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/50 to-matte-black pointer-events-none"></div>
        
        {/* Ambience BG Image */}
        <img 
          src="https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8be?q=80&w=2000&auto=format&fit=crop" 
          alt="Wholesale Background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
        />

        {/* Content Core */}
        <div className="relative z-20 max-w-[1200px] mx-auto px-6 text-center mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
             <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary-gold/30 bg-primary-gold/5 text-primary-gold font-bold tracking-[0.3em] text-[10px] uppercase">
               <Award size={12} /> Exclusive Distributor Program
             </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-8xl text-white italic leading-[0.9] tracking-tighter mb-8"
          >
            Global Supply.<br />
            <span className="not-italic font-normal text-white/90">Local Delivery.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-soft-white/60 max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed mb-12"
          >
            Connect your enterprise to Asia's premium accessories manufacturing engine. High-fidelity standards, verified volume infrastructure, and worldwide logistics mastery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <button 
              onClick={() => setIsPartnerModalOpen(true)}
              className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-primary-gold bg-primary-gold px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-matte-black shadow-2xl transition-all hover:bg-transparent hover:text-white duration-500"
            >
              <span>Begin Onboarding</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>


      {/* --- PILLARS SECTION --- */}
      <section className="py-24 lg:py-32 bg-[#fafaf9]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Sticky Left Content */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <p className="text-[10px] font-bold text-primary-gold uppercase tracking-[0.4em] mb-4">Core Advantages</p>
              <h2 className="text-4xl md:text-5xl font-display italic leading-[1.1] tracking-tight text-matte-black mb-8">
                Engineered for <br/> Enterprise Commerce.
              </h2>
              <p className="text-charcoal/60 text-sm leading-relaxed mb-10">
                We eliminate the noise between manufacturing outputs and commercial retailing. Your operational pipeline becomes leaner, faster, and infinitely scalable.
              </p>

              {/* Micro-Stats Grid */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-black/10">
                <div>
                   <h4 className="text-3xl font-display text-matte-black mb-1">3-5 Days</h4>
                   <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Avg Int'l Delivery</p>
                </div>
                <div>
                   <h4 className="text-3xl font-display text-matte-black mb-1">18K PVD</h4>
                   <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Plating Standard</p>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-8 rounded-3xl border border-black/[0.03] shadow-sm hover:shadow-xl transition-all duration-500 group hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center text-matte-black mb-6 group-hover:bg-primary-gold group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-matte-black mb-3">{item.title}</h3>
                    <p className="text-xs text-charcoal/50 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* --- WORKFLOW TIMELINE --- */}
      <section className="py-24 bg-matte-black text-white relative overflow-hidden">
        
        {/* Graphic Blur */}
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary-gold/10 blur-[120px] rounded-full" />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[10px] font-bold text-primary-gold/60 tracking-[0.5em] uppercase">Access Logic</span>
            <h2 className="font-display text-4xl italic mt-4 tracking-tight">Operational Flow</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative group"
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-6xl md:text-8xl font-display font-bold text-white/5 group-hover:text-primary-gold/10 transition-colors duration-500 select-none">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold mt-[-30px] mb-4 text-white z-10">{step.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed max-w-[250px]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* --- PREMIUM FINAL CTA --- */}
      <section className="py-32 bg-white relative">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-[#080808] rounded-[40px] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl group">
             {/* Shimmer BG */}
             <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_100%)]" />
             <div className="absolute -inset-[100%] opacity-0 group-hover:opacity-20 group-hover:animate-[spin_10s_linear_infinite] transition-opacity duration-1000 pointer-events-none bg-[conic-gradient(from_90deg_at_50%_50%,#C6A769_0%,#000_50%,#C6A769_100%)]" />

             <div className="relative z-10 flex flex-col items-center">
               <div className="w-16 h-16 rounded-full bg-primary-gold/10 border border-primary-gold/30 flex items-center justify-center text-primary-gold mb-8">
                  <Package size={28} />
               </div>
               <h2 className="font-display text-3xl md:text-6xl text-white italic leading-none tracking-tighter mb-6">
                 Secure Wholesale <br /> Access Today.
               </h2>
               <p className="text-white/50 text-sm md:text-base font-light max-w-lg leading-relaxed mb-12">
                 Apply immediately to unlock our global inventory hub and high-tier bulk discounts automatically.
               </p>
               
               <button 
                 onClick={() => setIsPartnerModalOpen(true)}
                 className="px-12 py-5 bg-white text-matte-black rounded-full font-bold text-[12px] uppercase tracking-widest shadow-xl hover:bg-primary-gold transition-all duration-500 scale-100 hover:scale-105"
               >
                 Initiate Request
               </button>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Wholesale;
