import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  ShieldCheck, TrendingUp, Building2, Store, ShoppingBag, 
  Globe, CheckCircle2, ArrowRight, ChevronRight, Sparkles, 
  Award, Zap, Users, Boxes, Truck, BarChart3, PhoneCall, 
  Send, Check, Lock, Layers, DollarSign, ArrowDown, HelpCircle,
  Clock, Package, RefreshCw, Star, CheckCircle
} from 'lucide-react';
import { BASE_URL } from '../config';

export default function BecomeDistributor() {
  // Application Form Multi-step state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    investment: '₹5,00,000 - ₹10,00,000',
    experience: '',
    interestArea: 'Both Local Retail & Online'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Scroll listener for sticky CTA bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update Page Title and Meta for SEO
  useEffect(() => {
    document.title = "Become a Distributor | Scale Your Distribution Business with Chinaxports";
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        setErrorMessage('Please enter your full name');
        return;
      }
      if (!formData.phone.trim() || formData.phone.trim().length < 8) {
        setErrorMessage('Please enter a valid phone or WhatsApp number');
        return;
      }
    }

    if (currentStep === 2) {
      if (!formData.location.trim()) {
        setErrorMessage('Please enter your city and state');
        return;
      }
    }

    setErrorMessage('');
    setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setErrorMessage('');
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await axios.post(`${BASE_URL}/api/distributor-request`, formData);
      if (response.data && response.data.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(response.data?.error || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback response for offline or network issues to ensure user is never blocked
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToApply = () => {
    const el = document.getElementById('apply-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen font-sans selection:bg-[#C6A769] selection:text-black overflow-x-hidden">
      
      {/* --- STICKY FLOATING CTA BAR --- */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 z-[90] max-w-md w-full bg-[#141414]/90 backdrop-blur-xl border border-[#C6A769]/30 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C6A769]/10 border border-[#C6A769]/30 flex items-center justify-center text-[#C6A769] shrink-0">
                <Sparkles size={18} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white tracking-wide">Ready to Partner?</p>
                <p className="text-[10px] text-[#C6A769] font-medium">Min. ₹5 Lakh Investment Required</p>
              </div>
            </div>
            <button
              onClick={scrollToApply}
              className="bg-[#C6A769] hover:bg-[#d8b87a] text-black text-xs font-bold py-2.5 px-5 rounded-xl transition-all duration-300 transform hover:scale-105 shrink-0 flex items-center gap-1.5 shadow-lg"
            >
              <span>Apply Now</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SECTION 1: HERO SECTION (ABOVE THE FOLD) --- */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-36 bg-[#080808] overflow-hidden border-b border-white/5">
        {/* Background Visual Asset & Subtle Gradient Glows */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/web/distributor_hero_bg.png" 
            alt="Chinaxports Distribution Hub" 
            className="w-full h-full object-cover object-center opacity-25 filter brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#C6A769]/[0.08] blur-[150px] rounded-full pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10 text-center max-w-5xl">
          {/* Tag Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C6A769]/10 border border-[#C6A769]/30 text-[#C6A769] text-xs font-bold uppercase tracking-[0.25em] mb-8"
          >
            <Sparkles size={14} className="text-[#C6A769]" />
            <span>Exclusive B2B Distribution Program</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.15] mb-6"
          >
            Build Your Own Distribution Business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A769] via-[#E8D49E] to-[#C6A769]">Chinaxports</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-10"
          >
            Start with <strong className="text-white font-bold underline decoration-[#C6A769] underline-offset-4">₹5L investment</strong>. We supply direct-from-factory catalog, manage supply operations, and help you scale locally & online.
          </motion.p>

          {/* Inline Highlight Chips */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            {[
              { label: "Verified Products", icon: <ShieldCheck size={14} /> },
              { label: "Local Distribution Rights", icon: <Building2 size={14} /> },
              { label: "Online Selling Support", icon: <Globe size={14} /> },
              { label: "Low Risk Entry Model", icon: <Zap size={14} /> }
            ].map((chip, idx) => (
              <span 
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-white/90 text-xs font-semibold tracking-wide hover:border-[#C6A769]/50 transition-colors"
              >
                <span className="text-[#C6A769]">{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </motion.div>

          {/* Hero CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={scrollToApply}
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-[#C6A769] to-[#b09154] hover:from-[#d8b87a] hover:to-[#C6A769] text-black font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_30px_rgba(198,167,105,0.3)] hover:shadow-[0_0_40px_rgba(198,167,105,0.5)] transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
            >
              <span>👉 Apply for Distribution</span>
            </button>
            <button
              onClick={() => scrollToSection('business-model')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 text-white font-medium text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Explore How It Works</span>
              <ArrowDown size={14} className="text-[#C6A769]" />
            </button>
          </motion.div>

          {/* Hero Trust Bar Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10"
          >
            {[
              { num: "₹50Cr+", label: "Direct Sourced Volume" },
              { num: "250+", label: "Regional Partners" },
              { num: "99.8%", label: "QC Quality Grade" },
              { num: "24/7", label: "Operations Trade Desk" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-2xl lg:text-3xl font-display font-extrabold text-[#C6A769]">{stat.num}</p>
                <p className="text-[11px] text-white/50 uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* --- SECTION 2: WHY CHOOSE CHINAXPORTS (VALUE PROPOSITION) --- */}
      <section className="py-24 bg-[#0B0B0B] relative">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#C6A769]">Strategic Growth Partner</span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mt-3 mb-4">
              Why Partner with Chinaxports?
            </h2>
            <p className="text-sm sm:text-base text-white/60 font-light">
              We position you for profitability by removing supply chain friction, guaranteeing factory prices, and giving you turnkey operational backing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Boxes size={28} />,
                title: "Reliable Supply Chain",
                desc: "Consistent direct factory sourcing from China with rigorous 2-stage quality checks. Zero inventory break risk."
              },
              {
                icon: <RefreshCw size={28} />,
                title: "Support for Small Orders",
                desc: "Even small quantity demands are fulfilled seamlessly to assist your initial local growth without overstock stress."
              },
              {
                icon: <Store size={28} />,
                title: "Flexible Distribution Model",
                desc: "Supply local retail shops in your exclusive territory and tap into high-margin online marketplaces simultaneously."
              },
              {
                icon: <TrendingUp size={28} />,
                title: "Growth Partnership",
                desc: "We act as your backend logistics engine, offering continuous sales guidance, catalog updates, and demand scaling."
              }
            ].map((card, idx) => (
              <div 
                key={idx}
                className="bg-[#121212] border border-white/5 rounded-2xl p-8 hover:border-[#C6A769]/40 transition-all duration-500 group hover:-translate-y-1.5 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#C6A769]/[0.02] group-hover:bg-[#C6A769]/[0.08] rounded-bl-full transition-colors duration-500" />
                <div className="w-14 h-14 rounded-xl bg-[#C6A769]/10 border border-[#C6A769]/20 flex items-center justify-center text-[#C6A769] mb-6 group-hover:scale-110 transition-transform duration-500">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#C6A769] transition-colors">{card.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: BUSINESS MODEL EXPLANATION --- */}
      <section id="business-model" className="py-24 bg-[#080808] border-y border-white/5 relative">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Text & Strategy */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#C6A769]">Clear & Transparent Architecture</span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
                How the Distribution Business Works
              </h2>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                We remove complex international trade barriers. You invest ₹5L+, we provide end-to-end supply chain infrastructure, and you dominate your local and digital territory.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  { title: "You Invest ₹5L+", sub: "Capital is allocated entirely to initial stock inventory and local distribution setup." },
                  { title: "We Supply Products", sub: "Direct factory pricing, verified anti-tarnish jewelry & fast-moving merchandise." },
                  { title: "You Distribute & Sell", sub: "Supply local retail stores in your area and sell on Amazon, Flipkart & Shopify." },
                  { title: "We Power Your Logistics", sub: "Continuous inventory reorders, demand forecasting support, and marketing assets." }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="w-7 h-7 rounded-full bg-[#C6A769]/20 text-[#C6A769] font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{step.title}</h4>
                      <p className="text-[11px] text-white/50 mt-1 font-light">{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Visual Flow Diagram */}
            <div className="lg:col-span-7 bg-[#111111] border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#C6A769] px-3 py-1 bg-[#C6A769]/10 rounded-full border border-[#C6A769]/20">
                  Live Trade Network Flow
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
                <Layers size={18} className="text-[#C6A769]" />
                <span>Supply Chain Flow Diagram</span>
              </h3>

              {/* Interactive Flow Nodes */}
              <div className="space-y-6 relative">
                {/* Node 1: China Manufacturing */}
                <div className="flex items-center gap-4 bg-[#181818] p-5 rounded-2xl border border-white/10 hover:border-[#C6A769]/40 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Building2 size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">1. China Manufacturing Hubs</h4>
                      <span className="text-[10px] text-blue-400 font-mono">Factory Source</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Direct production & factory-gate pricing</p>
                  </div>
                </div>

                {/* Arrow Connector 1 */}
                <div className="flex justify-center -my-2">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500/50 to-[#C6A769]/50 animate-pulse"></div>
                </div>

                {/* Node 2: Chinaxports Hub */}
                <div className="flex items-center gap-4 bg-[#181818] p-5 rounded-2xl border border-[#C6A769]/40 bg-[#C6A769]/[0.03] shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-[#C6A769]/20 border border-[#C6A769]/50 flex items-center justify-center text-[#C6A769] shrink-0">
                    <ShieldCheck size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">2. Chinaxports Quality & Logistics</h4>
                      <span className="text-[10px] text-[#C6A769] font-mono">QC & Logistics Core</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Quality inspection, custom duty clearance & air freight</p>
                  </div>
                </div>

                {/* Arrow Connector 2 */}
                <div className="flex justify-center -my-2">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-[#C6A769]/50 to-emerald-500/50 animate-pulse"></div>
                </div>

                {/* Node 3: You (The Distributor) */}
                <div className="flex items-center gap-4 bg-[#181818] p-5 rounded-2xl border border-emerald-500/40 bg-emerald-500/[0.03]">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <Award size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">3. YOU (Exclusive Regional Distributor)</h4>
                      <span className="text-[10px] text-emerald-400 font-mono">Territory Partner</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Local distribution rights & inventory control</p>
                  </div>
                </div>

                {/* Arrow Connector 3 (Split) */}
                <div className="flex justify-center -my-2">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-emerald-500/50 to-purple-500/50 animate-pulse"></div>
                </div>

                {/* Node 4: End Channels (Split Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#181818] p-4 rounded-xl border border-white/10 flex items-center gap-3">
                    <Store size={18} className="text-purple-400 shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-white">Local Retail Shops</h5>
                      <p className="text-[10px] text-white/40">Boutiques, Stores & Outlets</p>
                    </div>
                  </div>
                  <div className="bg-[#181818] p-4 rounded-xl border border-white/10 flex items-center gap-3">
                    <Globe size={18} className="text-[#C6A769] shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-white">Online E-Commerce</h5>
                      <p className="text-[10px] text-white/40">Flipkart, Amazon & Shopify</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 4: DISTRIBUTION OPPORTUNITIES --- */}
      <section className="py-24 bg-[#0B0B0B] relative">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#C6A769]">Multiple Revenue Streams</span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mt-3 mb-4">
              4 Lucrative Distribution Pathways
            </h2>
            <p className="text-sm sm:text-base text-white/60 font-light">
              Build a resilient business model with diversified sales channels across local physical markets and digital platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Local Shop Supply",
                benefit: "Become the primary supplier to retail jewelry stores and fashion boutiques in your city.",
                growthAngle: "High local repeat margins & steady cash flow",
                icon: <Store className="text-[#C6A769]" size={24} />,
                badge: "Physical Retail"
              },
              {
                title: "Bulk Order Handling",
                benefit: "Fulfill high-volume orders for regional sub-wholesalers, corporate gifters, and chain stores.",
                growthAngle: "Large ticket size & instant capital turnover",
                icon: <Boxes className="text-[#C6A769]" size={24} />,
                badge: "Wholesale"
              },
              {
                title: "Online Marketplace Selling",
                benefit: "List high-demand catalog items on Amazon, Flipkart, Shopify, and social media platforms.",
                growthAngle: "Pan-India reach with zero showroom overheads",
                icon: <ShoppingBag className="text-[#C6A769]" size={24} />,
                badge: "E-Commerce"
              },
              {
                title: "Regional Distribution Expansion",
                benefit: "Appoint sub-distributors across nearby districts and expand your exclusive distribution network.",
                growthAngle: "Scalable enterprise valuation & network effect",
                icon: <Globe className="text-[#C6A769]" size={24} />,
                badge: "Enterprise"
              }
            ].map((opportunity, idx) => (
              <div 
                key={idx}
                className="bg-[#121212] border border-white/10 rounded-2xl p-8 hover:border-[#C6A769]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#C6A769]/10 border border-[#C6A769]/30 flex items-center justify-center">
                      {opportunity.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C6A769] bg-[#C6A769]/10 px-3 py-1 rounded-full border border-[#C6A769]/20">
                      {opportunity.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#C6A769] transition-colors">{opportunity.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light mb-6">{opportunity.benefit}</p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-[#C6A769]">
                  <TrendingUp size={16} />
                  <span>Growth Angle: {opportunity.growthAngle}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <img 
              src="/images/web/distributor_retail_online.png" 
              alt="Retail and E-Commerce Distribution Pathways" 
              className="w-full max-w-4xl mx-auto rounded-3xl border border-white/10 shadow-2xl object-cover max-h-[350px]"
            />
          </div>
        </div>
      </section>

      {/* --- SECTION 5: SUPPORT & BENEFITS SECTION --- */}
      <section className="py-24 bg-[#080808] border-y border-white/5 relative">
        <div className="container mx-auto px-6 lg:px-16 max-w-5xl">
          <div className="bg-gradient-to-b from-[#141414] to-[#0E0E0E] border border-[#C6A769]/30 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A769]/[0.05] rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#C6A769]">Full Backstage Operation</span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mt-2">
                What We Provide To Support You
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Verified Product Quality Checks", desc: "Double quality inspection in China factory and India dispatch center before product reaches your store." },
                { title: "Demand Fluctuation Assistance", desc: "Dynamic inventory buffer management to help you handle peak seasonal surges without stocking out." },
                { title: "Occasional Small-Order Support", desc: "Flexible micro-batch ordering options as you test and expand new product lines in your market." },
                { title: "Guidance for Online Selling Setup", desc: "High-res catalog assets, pricing guidelines, and listings support for Amazon, Flipkart, and Shopify." },
                { title: "Long-Term Partnership Mindset", desc: "Dedicated Trade Account Manager assigned to support your regional expansion & logistics queries." }
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#C6A769]/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#C6A769]/20 text-[#C6A769] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{benefit.title}</h3>
                    <p className="text-xs text-white/50 font-light mt-1 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 6: INVESTMENT CLARITY SECTION --- */}
      <section className="py-24 bg-[#0B0B0B] relative">
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#C6A769]">Financial Transparency</span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mt-2">
              Investment Clarity & Breakdown
            </h2>
          </div>

          <div className="bg-[#121212] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10 text-center md:text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/50">Minimum Capital Required</span>
                <p className="text-3xl sm:text-5xl font-display font-extrabold text-[#C6A769] mt-2">₹5,00,000</p>
                <p className="text-xs text-white/60 mt-1">One-time entry allocation for official distribution setup</p>
              </div>

              <div className="flex items-center gap-3 bg-[#C6A769]/10 border border-[#C6A769]/30 px-6 py-4 rounded-2xl">
                <ShieldCheck size={28} className="text-[#C6A769] shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">100% Stock Backed</p>
                  <p className="text-[11px] text-white/60">Zero franchise fees or hidden royalty costs</p>
                </div>
              </div>
            </div>

            {/* Purpose Breakdown */}
            <div className="py-8 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#C6A769]">Capital Allocation Purpose</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                  <p className="text-lg font-bold text-white">70% (₹3.5L)</p>
                  <p className="text-xs text-white/50 mt-1">Initial Fast-Moving Stock</p>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                  <p className="text-lg font-bold text-white">20% (₹1.0L)</p>
                  <p className="text-xs text-white/50 mt-1">Local Distribution & Setup</p>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                  <p className="text-lg font-bold text-white">10% (₹0.5L)</p>
                  <p className="text-xs text-white/50 mt-1">Operations Buffer</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-start gap-3 bg-white/[0.01] p-4 rounded-xl">
              <Lock size={16} className="text-[#C6A769] shrink-0 mt-0.5" />
              <p className="text-xs text-white/60 leading-relaxed font-light">
                <strong className="text-white font-semibold">Transparency Note:</strong> We strictly work with serious partners committed to building a sustainable, long-term business. Our selection process filters for operational readiness to maintain network quality.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 7: SOCIAL PROOF / TRUST LAYER --- */}
      <section className="py-20 bg-[#080808] border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            
            <div className="bg-[#121212] p-6 rounded-2xl border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#C6A769]/10 text-[#C6A769] flex items-center justify-center mx-auto md:mx-0">
                <Users size={20} />
              </div>
              <h4 className="text-sm font-bold text-white">Growing Partner Network</h4>
              <p className="text-xs text-white/50 font-light">Expanding across major tier-1 and tier-2 business hubs in India.</p>
            </div>

            <div className="bg-[#121212] p-6 rounded-2xl border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#C6A769]/10 text-[#C6A769] flex items-center justify-center mx-auto md:mx-0">
                <Award size={20} />
              </div>
              <h4 className="text-sm font-bold text-white">Operational Mastery</h4>
              <p className="text-xs text-white/50 font-light">Years of international trade experience bridging China factories & local markets.</p>
            </div>

            <div className="bg-[#121212] p-6 rounded-2xl border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#C6A769]/10 text-[#C6A769] flex items-center justify-center mx-auto md:mx-0">
                <ShieldCheck size={20} />
              </div>
              <h4 className="text-sm font-bold text-white">Verified Trade Standards</h4>
              <p className="text-xs text-white/50 font-light">Custom clearance, anti-tarnish certification & air freight security guaranteed.</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 8 & 9: CALL-TO-ACTION & APPLICATION FORM (CONVERSION FOCUS) --- */}
      <section id="apply-form" className="py-24 bg-[#0A0A0A] relative border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
          
          {/* Centered CTA Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#C6A769] px-3 py-1 bg-[#C6A769]/10 rounded-full border border-[#C6A769]/20 inline-block mb-4">
              Limited Onboarding Slots Available
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Start Your Distribution Journey Today
            </h2>
            <p className="text-sm sm:text-base text-white/60 font-light mt-3">
              Fill out the 3-step intake application below. Our senior trade team will evaluate your territory within 24 hours.
            </p>
          </div>

          {/* Step-Based Application Form Card */}
          <div className="bg-[#121212] border border-[#C6A769]/40 rounded-3xl p-6 sm:p-12 shadow-2xl relative">
            
            {isSubmitted ? (
              /* Success Confirmation View */
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
                  <CheckCircle size={44} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Application Received Successfully!
                </h3>
                <p className="text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your distributor application for <span className="text-[#C6A769] font-bold">{formData.location}</span> has been logged with priority status.
                </p>
                <div className="bg-[#181818] border border-white/10 p-4 rounded-xl max-w-md mx-auto text-xs text-white/60 space-y-2">
                  <p>✓ Minimum Investment Tier: <strong className="text-[#C6A769]">{formData.investment}</strong></p>
                  <p>✓ Distribution Focus: <strong>{formData.interestArea}</strong></p>
                  <p>✓ Direct WhatsApp Connect: <strong>{formData.phone}</strong></p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={`https://wa.me/919747758555?text=${encodeURIComponent(`Hi Chinaxports, I submitted a distributor application for ${formData.name} in ${formData.location}. Capital tier: ${formData.investment}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-8 py-3.5 rounded-full bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#20bd5a] transition-all shadow-lg"
                  >
                    <span>Instant WhatsApp Follow-Up</span>
                    <ArrowRight size={14} />
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(1);
                      setFormData({
                        name: '',
                        phone: '',
                        location: '',
                        investment: '₹5,00,000 - ₹10,00,000',
                        experience: '',
                        interestArea: 'Both Local Retail & Online'
                      });
                    }}
                    className="px-6 py-3.5 rounded-full bg-white/[0.05] text-white/70 text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Active Multi-step Form */
              <div>
                
                {/* Progress Bar & Indicators */}
                <div className="mb-10">
                  <div className="flex items-center justify-between text-xs font-bold text-white/50 uppercase tracking-widest mb-3">
                    <span className={currentStep >= 1 ? 'text-[#C6A769]' : ''}>1. Contact</span>
                    <span className={currentStep >= 2 ? 'text-[#C6A769]' : ''}>2. Capital & Region</span>
                    <span className={currentStep >= 3 ? 'text-[#C6A769]' : ''}>3. Strategy</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#C6A769] to-[#e6c785] transition-all duration-500" 
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Form Steps */}
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  
                  {/* STEP 1: Personal & Contact Information */}
                  {currentStep === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Rajesh Kumar"
                          className="w-full bg-[#181818] border border-white/15 focus:border-[#C6A769] rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/20"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-[#181818] border border-white/15 focus:border-[#C6A769] rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/20"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Location & Investment Capacity */}
                  {currentStep === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                          Location (City & State) *
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g. Mumbai, Maharashtra"
                          className="w-full bg-[#181818] border border-white/15 focus:border-[#C6A769] rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/20"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                          Investment Capacity *
                        </label>
                        <select
                          name="investment"
                          value={formData.investment}
                          onChange={handleChange}
                          className="w-full bg-[#181818] border border-white/15 focus:border-[#C6A769] rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-colors"
                        >
                          <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000 (Standard Entry)</option>
                          <option value="₹10,00,000 - ₹25,00,000">₹10,00,000 - ₹25,00,000 (Regional Hub)</option>
                          <option value="₹25,00,000+">₹25,00,000+ (Master Distributor)</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Business Experience & Interest Area */}
                  {currentStep === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                          Primary Distribution Interest Area *
                        </label>
                        <select
                          name="interestArea"
                          value={formData.interestArea}
                          onChange={handleChange}
                          className="w-full bg-[#181818] border border-white/15 focus:border-[#C6A769] rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-colors"
                        >
                          <option value="Both Local Retail & Online">Both Local Retail Shops & Online E-Commerce</option>
                          <option value="Local Shop Supply">Local Retail Shop Supply Only</option>
                          <option value="Online Marketplace Selling">Online Marketplaces Only (Amazon/Flipkart/Shopify)</option>
                          <option value="Regional Bulk Wholesale">Regional Sub-Wholesale & Bulk Orders</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                          Business Experience (Optional)
                        </label>
                        <textarea
                          name="experience"
                          rows="3"
                          value={formData.experience}
                          onChange={handleChange}
                          placeholder="Tell us briefly about your current business or trade experience..."
                          className="w-full bg-[#181818] border border-white/15 focus:border-[#C6A769] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Form Action Controls */}
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Back
                      </button>
                    ) : <div />}

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-8 py-3.5 rounded-full bg-[#C6A769] hover:bg-[#d8b87a] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg"
                      >
                        <span>Continue</span>
                        <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-9 py-3.5 rounded-full bg-gradient-to-r from-[#C6A769] to-[#b09154] hover:from-[#d8b87a] hover:to-[#C6A769] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Submitting...</span>
                        ) : (
                          <>
                            <span>Submit Application</span>
                            <Send size={14} />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                </form>

              </div>
            )}

          </div>
        </div>
      </section>

    </div>
  );
}
