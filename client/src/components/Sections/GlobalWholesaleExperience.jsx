import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Truck, BarChart3, Users, Clock, ArrowRight, MessageCircle, Mail } from 'lucide-react';

const GlobalWholesaleExperience = ({ onBecomePartnerClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const trustCards = [
    {
      icon: <Globe className="text-primary-gold" size={20} />,
      title: "Global Logistics",
      desc: "Seamless express shipping pipelines engineered for international speed.",
    },
    {
      icon: <ShieldCheck className="text-primary-gold" size={20} />,
      title: "Quality Controlled",
      desc: "Export-grade 18K PVD plating with rigorous multi-layer anti-tarnish certs.",
    },
    {
      icon: <BarChart3 className="text-primary-gold" size={20} />,
      title: "Scale Ready",
      desc: "Flexible wholesale MOQ tiering tailored to support both boutiques and empires.",
    },
    {
      icon: <Users className="text-primary-gold" size={20} />,
      title: "Dedicated Support",
      desc: "Personal trade account management ensuring your fulfillment never sleeps.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-20 lg:pt-28 lg:pb-28 selection:bg-primary-gold/20 selection:text-matte-black border-t border-black/[0.02]">
      {/* Luxury Atmospheric Gold Soft Glows for Light Mode */}
      <div className="pointer-events-none absolute -left-20 top-20 h-[600px] w-[600px] rounded-full bg-primary-gold/[0.04] blur-[150px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#C6A769]/[0.03] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-16">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-20 text-center"
        >
          <motion.div variants={itemVariants} className="mb-6 flex items-center justify-center gap-4">
            <div className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-primary-gold/60" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.45em] text-primary-gold">
              GLOBAL WHOLESALE NETWORK
            </span>
            <div className="h-[0.5px] w-12 bg-gradient-to-l from-transparent to-primary-gold/60" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-display text-4xl leading-[1.1] tracking-tight text-matte-black sm:text-5xl lg:text-7xl"
          >
            Built For Modern <br className="hidden lg:block" />
            <span className="italic font-light text-matte-black/90">Global Retailers</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-sm lg:text-base text-charcoal/60 leading-relaxed"
          >
            From high-street luxury boutiques to multi-regional distributors, CHINAXPORTS executes the manufacturing precision demanded by international commerce.
          </motion.p>
        </motion.div>

        {/* Main Layout Split */}
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24 items-center">
          
          {/* LEFT: Immersive Global Visual Experience */}
          <div className="relative lg:col-span-7 h-[300px] lg:h-[400px] flex items-center justify-center overflow-visible order-2 lg:order-1">
            
            {/* Abstract Cinematic Map (SVG in charcoal for Light Theme) */}
            <div className="absolute inset-0 opacity-[0.08] scale-110 flex items-center justify-center">
              <svg viewBox="0 0 800 400" className="w-full h-full text-matte-black fill-current">
                {/* Simplified dots map representation */}
                <circle cx="150" cy="120" r="1.5" /><circle cx="180" cy="130" r="1.5" /><circle cx="220" cy="110" r="2" /><circle cx="250" cy="140" r="1.5" />
                <circle cx="400" cy="100" r="1.5" /><circle cx="420" cy="120" r="1.5" /><circle cx="450" cy="110" r="2" />
                <circle cx="600" cy="150" r="2" /><circle cx="620" cy="180" r="1.5" /><circle cx="650" cy="140" r="1.5" />
                
                {/* Golden Connection Arcs */}
                <motion.path
                  d="M220,110 Q410,50 600,150"
                  fill="none"
                  stroke="url(#goldGradientLight)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.path
                  d="M220,110 Q410,200 600,150"
                  fill="none"
                  stroke="url(#goldGradientLight)"
                  strokeWidth="0.5"
                  strokeDasharray="4,4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
                
                <defs>
                  <linearGradient id="goldGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C6A769" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#C6A769" stopOpacity="1" />
                    <stop offset="100%" stopColor="#C6A769" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Central Glow Hub */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-48 w-48 rounded-full bg-primary-gold/10 blur-[60px] animate-pulse" />
            </div>

            {/* Floating Floating Stat Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute -top-4 right-0 z-20 rounded-2xl border border-black/[0.03] bg-white/95 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-gold/10 text-primary-gold">
                  <Globe size={14} />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-charcoal/40 font-bold">Global Scope</p>
                  <p className="text-base font-extrabold text-matte-black">25+ Countries</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-4 right-0 z-20 rounded-2xl border border-black/[0.03] bg-white/95 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                  <Truck size={14} />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-charcoal/40 font-bold">Logistics</p>
                  <p className="text-base font-extrabold text-matte-black">Priority Air</p>
                </div>
              </div>
            </motion.div>

            {/* Featured Testimonial Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="absolute center z-10 max-w-[260px] rounded-3xl border border-[#C6A769]/20 bg-white/98 p-6 text-center shadow-[0_25px_60px_rgba(198,167,105,0.08)]"
            >
              <div className="mx-auto mb-3 h-[1px] w-10 bg-primary-gold/40" />
              <p className="text-[13px] italic leading-relaxed text-charcoal/80 font-light">
                "CHINAXPORTS architectural level scaling allowed us to fulfill high-demand retailer orders in under 7 days."
              </p>
              <p className="mt-3 text-[9px] font-extrabold uppercase tracking-widest text-primary-gold">
                — International Buyer
              </p>
            </motion.div>
          </div>

          {/* RIGHT: Value Propositions & Trust Content */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="grid grid-cols-1 gap-6">
              {trustCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="group flex items-start gap-6 rounded-3xl border border-black/[0.02] bg-off-white p-6 transition-all duration-500 hover:border-[#C6A769]/30 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-black/[0.03] group-hover:bg-primary-gold/10 group-hover:border-transparent transition-all duration-500">
                    {card.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-matte-black group-hover:text-primary-gold transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-[13px] font-medium leading-relaxed text-charcoal/50 group-hover:text-charcoal/70 transition-colors">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Global Verification Mark */}
            <div className="mt-10 flex items-center gap-3 pl-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-charcoal/40">
                    Active Wholesale Intake Open
                </span>
            </div>
          </div>
        </div>

        {/* CONVERSION HUB */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-20 rounded-[36px] border border-[#C6A769]/20 bg-gradient-to-b from-primary-gold/[0.03] to-transparent p-8 text-center lg:p-16 shadow-inner"
        >
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-3">
              <h3 className="font-display text-3xl text-matte-black lg:text-4xl tracking-tight">
                Accelerate Your Retail <span className="italic font-light">Venture</span>
              </h3>
              <p className="text-sm text-charcoal/60 font-medium">
                Secure your corporate positioning with direct sourcing channels and streamlined invoicing.
              </p>
            </div>

            {/* Multi-Channel Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              
              {/* Main Inquire */}
              <button 
                onClick={onBecomePartnerClick}
                className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-matte-black px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-2xl transition-all duration-300 hover:bg-primary-gold hover:text-matte-black hover:scale-[1.02]"
              >
                <span>Become a Partner</span>
                <ArrowRight size={14} className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* WhatsApp Direct */}
              <a 
                href="https://wa.me/your-number" 
                target="_blank" 
                rel="noreferrer"
                className="flex h-14 items-center justify-center gap-3 rounded-full border border-black/10 bg-transparent px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-matte-black transition-all duration-300 hover:bg-black/5 hover:border-black/20"
              >
                <MessageCircle size={16} className="text-green-600 fill-green-600/10" />
                <span>WhatsApp Trade Line</span>
              </a>

              {/* Email */}
              <a 
                href="mailto:chinaxports012@gmail.com"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-transparent text-matte-black transition-all duration-300 hover:bg-black/5 hover:border-black/20"
                aria-label="Email support"
              >
                <Mail size={16} />
              </a>
            </div>

            {/* Disclaimer Trust Seal */}

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default GlobalWholesaleExperience;
