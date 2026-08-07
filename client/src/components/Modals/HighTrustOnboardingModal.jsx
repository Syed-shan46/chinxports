import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ArrowRight, ArrowLeft, Check, Globe, ShieldCheck, 
  Truck, Users, Star, MessageCircle, Mail, ChevronDown, Clock
} from 'lucide-react';

const HighTrustOnboardingModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1 & 2 Form States
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    country: '',
    whatsapp: '',
    email: '',
    businessType: '',
    categories: [],
    quantity: '',
    priceRange: '',
    notes: ''
  });

  const businessTypes = ["Retail Store", "Online Store", "Distributor", "Boutique", "Reseller", "Importer", "Other"];
  const categoryOptions = ["Necklaces", "Earrings", "Bangles", "Rings", "Full Collection"];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset form on exit if needed, but keeping data gives better UX if accidentally closed
    }
  }, [isOpen]);

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleCategoryToggle = (cat) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Artificial delay for "exclusive authorization" premium feeling
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setSuccess(true);
  };

  // Framer Motion Variants
  const backdropVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVars = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, scale: 1, y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 300, delay: 0.1 }
    },
    exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } }
  };

  const stepVars = {
    enter: (direction) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
    },
    exit: (direction) => ({
      x: direction < 0 ? 30 : -30,
      opacity: 0,
      transition: { duration: 0.3 }
    })
  };

  if (!isOpen && !success) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto p-4 sm:p-6 selection:bg-primary-gold selection:text-black">
          
          {/* 1. DECOUPLED BACKDROP MOTION LAYER */}
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-[12px] z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          
          {/* 2. DECOUPLED MODAL ENGINE */}
          <motion.div 
            className="relative z-10 w-full max-w-[1000px] min-h-[600px] bg-[#0B0B0B] rounded-[32px] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col lg:flex-row"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250, delay: 0.05 }}
            onClick={e => e.stopPropagation()}
          >
            
            {/* Subtle ambient glow background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(198,167,105,0.05)_0%,transparent_50%)] pointer-events-none" />

            {/* LEFT SIDEBAR - Desktop Trust & Branding */}
            <div className="hidden lg:flex w-[340px] bg-[#070707] p-10 flex-col justify-between border-r border-white/[0.05] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />
              
              <div className="relative z-10">
                <div className="text-2xl font-display italic text-white mb-12">CHINAXPORTS</div>
                
                <div className="space-y-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-primary-gold group-hover:bg-primary-gold/10 transition-all">
                        <Globe size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-1">Global Logistics</h4>
                        <p className="text-[10px] leading-relaxed text-white/40">Door-to-door delivery pipelines engineered for speed.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-primary-gold group-hover:bg-primary-gold/10 transition-all">
                        <ShieldCheck size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-1">Premium 18K PVD</h4>
                        <p className="text-[10px] leading-relaxed text-white/40">Export-grade finishing with anti-tarnish longevity.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-primary-gold group-hover:bg-primary-gold/10 transition-all">
                        <Truck size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-1">Low MOQ Friendly</h4>
                        <p className="text-[10px] leading-relaxed text-white/40">Scalable starting limits to test high-turnover styles.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_,i) => <Star key={i} size={10} className="fill-primary-gold text-primary-gold" />)}
                  </div>
                  <p className="text-[10px] italic leading-relaxed text-white/60">
                    "Transformative partnership. Catalog speed and quality control are world-class."
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Main Content Form Area */}
            <div className="flex-1 flex flex-col h-full relative">
              
              {/* Close Trigger */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300 z-50"
              >
                <X size={18} />
              </button>

              {!success ? (
                <>
                  {/* Flow Header */}
                  <div className="p-8 lg:p-12 pb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-[1px] w-6 bg-primary-gold/60" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary-gold">Global Wholesale Partnership</span>
                    </div>
                    <h2 className="font-display text-3xl lg:text-4xl text-white italic leading-tight">Start Your Wholesale <span className="not-italic font-normal text-white/90">Journey</span></h2>
                    <p className="text-white/40 text-sm mt-2 font-light">Join premium retailers sourcing world-class jewelry through CHINAXPORTS.</p>
                    
                    {/* Stepper Progress */}
                    <div className="flex items-center gap-2 mt-8">
                      {[1, 2, 3].map((num) => (
                        <div key={num} className="flex-1 flex flex-col gap-1.5">
                          <div className={`h-[2px] rounded-full transition-all duration-500 ${currentStep >= num ? 'bg-primary-gold shadow-[0_0_8px_rgba(198,167,105,0.5)]' : 'bg-white/10'}`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scrolling Content Area */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar-dark p-8 lg:px-12 lg:pb-12 pt-0 relative">
                    <AnimatePresence mode="wait" custom={currentStep}>
                      
                      {/* STEP 1: BUSINESS INFORMATION */}
                      {currentStep === 1 && (
                        <motion.div 
                          key="step1" custom={1} variants={stepVars} initial="enter" animate="center" exit="exit"
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-2">
                              <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                              <input 
                                type="text" placeholder="Representative Name"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary-gold/50 focus:bg-white/[0.05] transition-all duration-300 shadow-inner"
                                value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1">Business Name</label>
                              <input 
                                type="text" placeholder="Legal Entity or Store Name"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary-gold/50 focus:bg-white/[0.05] transition-all duration-300 shadow-inner"
                                value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1">Region / Country</label>
                              <input 
                                type="text" placeholder="Operation Base"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary-gold/50 focus:bg-white/[0.05] transition-all duration-300 shadow-inner"
                                value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2 relative">
                              <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1">Business Type</label>
                              <div className="relative">
                                <select 
                                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-primary-gold/50 focus:bg-white/[0.05] transition-all shadow-inner"
                                  value={formData.businessType} onChange={e => setFormData({...formData, businessType: e.target.value})}
                                >
                                  <option value="" className="bg-[#111] text-white/40">Select Business Entity</option>
                                  {businessTypes.map(t => <option key={t} value={t} className="bg-[#111]">{t}</option>)}
                                </select>
                                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={16} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                              <input 
                                type="email" placeholder="Corporate Email"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary-gold/50 focus:bg-white/[0.05] transition-all shadow-inner"
                                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1">WhatsApp Number</label>
                              <input 
                                type="tel" placeholder="+ country code number"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary-gold/50 focus:bg-white/[0.05] transition-all shadow-inner"
                                value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2: WHOLESALE REQUIREMENTS */}
                      {currentStep === 2 && (
                        <motion.div 
                          key="step2" custom={1} variants={stepVars} initial="enter" animate="center" exit="exit"
                          className="space-y-8"
                        >
                          <div className="space-y-3">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1">Categories of Interest</label>
                            <div className="flex flex-wrap gap-3">
                              {categoryOptions.map(opt => {
                                const isSel = formData.categories.includes(opt);
                                return (
                                  <button 
                                    key={opt} type="button" onClick={() => handleCategoryToggle(opt)}
                                    className={`px-5 py-3 rounded-full text-xs font-medium border transition-all duration-300 ${
                                      isSel ? 'bg-primary-gold border-primary-gold text-black shadow-[0_8px_20px_rgba(198,167,105,0.3)]' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2 relative">
                              <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1">Expected Monthly Quantity</label>
                              <div className="relative">
                                <select 
                                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-primary-gold/50 transition-all"
                                  value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})}
                                >
                                  <option value="" className="bg-[#111]">Select Monthly Tier</option>
                                  <option value="1-100" className="bg-[#111]">1 - 100 Units</option>
                                  <option value="100-500" className="bg-[#111]">100 - 500 Units</option>
                                  <option value="500-1000" className="bg-[#111]">500 - 1000 Units</option>
                                  <option value="1000+" className="bg-[#111]">1000+ Enterprise</option>
                                </select>
                                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={16} />
                              </div>
                            </div>
                            <div className="space-y-2 relative">
                              <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1">Avg Range per Piece</label>
                              <div className="relative">
                                <select 
                                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-primary-gold/50 transition-all"
                                  value={formData.priceRange} onChange={e => setFormData({...formData, priceRange: e.target.value})}
                                >
                                  <option value="" className="bg-[#111]">Select Target Band</option>
                                  <option value="Budget" className="bg-[#111]">Budget (High Volume)</option>
                                  <option value="Mid" className="bg-[#111]">Mid-Luxury</option>
                                  <option value="Premium" className="bg-[#111]">Ultra Premium / High End</option>
                                </select>
                                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={16} />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ml-1">Additional Brief / Notes</label>
                            <textarea 
                              placeholder="List specific product requirements, timeline, or sourcing goals..."
                              rows={3}
                              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary-gold/50 transition-all resize-none"
                              value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 3: REVIEW & SUBMIT */}
                      {currentStep === 3 && (
                        <motion.div 
                          key="step3" custom={1} variants={stepVars} initial="enter" animate="center" exit="exit"
                          className="space-y-6"
                        >
                          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-6 relative">
                            <div className="absolute top-0 right-0 p-4 flex gap-2 items-center">
                               <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                               <span className="text-[8px] font-bold tracking-widest uppercase text-white/40">Ready to Dispatch</span>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pb-6 border-b border-white/5">
                              <div>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-1">Business Profile</p>
                                <p className="text-white font-medium text-sm">{formData.businessName || 'Not Provided'}</p>
                                <p className="text-white/50 text-xs mt-0.5">{formData.fullName}</p>
                              </div>
                              <div>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-1">Contact Channels</p>
                                <p className="text-white font-medium text-sm truncate">{formData.email || 'N/A'}</p>
                                <p className="text-white/50 text-xs mt-0.5">{formData.whatsapp || 'N/A'}</p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-2">Intent Outline</p>
                              <div className="flex flex-wrap gap-2">
                                {formData.categories.map(c => <span key={c} className="text-[10px] bg-white/5 text-white/70 px-3 py-1 rounded-full border border-white/5">{c}</span>)}
                                {formData.categories.length === 0 && <span className="text-[10px] italic text-white/30">No categories specified.</span>}
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 bg-black/30 p-4 rounded-xl border border-white/5 mt-4">
                                <div>
                                  <p className="text-[8px] font-bold uppercase tracking-widest text-white/30">Monthly Payload</p>
                                  <p className="text-xs text-white mt-0.5 font-medium">{formData.quantity || "Not Declared"}</p>
                                </div>
                                <div>
                                  <p className="text-[8px] font-bold uppercase tracking-widest text-white/30">Price Stratum</p>
                                  <p className="text-xs text-white mt-0.5 font-medium">{formData.priceRange || "Not Declared"}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Process Timeline Flow */}

                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>

                  {/* Action Footer Container */}
                  <div className="p-6 lg:px-12 lg:pb-10 border-t border-white/[0.05] bg-gradient-to-t from-black to-transparent flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
                    {currentStep > 1 ? (
                      <button 
                        onClick={handlePrev}
                        className="w-full sm:w-auto px-6 h-12 rounded-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                      >
                        <ArrowLeft size={14} /> Back
                      </button>
                    ) : <div />}

                    {currentStep < 3 ? (
                      <button 
                        onClick={handleNext}
                        className="group w-full sm:w-auto px-10 h-14 rounded-full bg-white text-black font-bold uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-primary-gold transition-all active:scale-[0.98] shadow-xl"
                      >
                        Continue Protocol
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`group w-full sm:w-auto px-12 h-16 rounded-full font-bold uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-500 shadow-[0_15px_40px_-10px_rgba(198,167,105,0.3)] 
                          ${isSubmitting ? 'bg-primary-gold/50 cursor-wait text-black' : 'bg-primary-gold hover:bg-[#d6be8a] text-black active:scale-[0.98]'}`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            Processing Entry...
                          </>
                        ) : (
                          <>
                            Submit Secure Inquiry
                            <ShieldCheck size={16} className="group-hover:rotate-12 transition-transform" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* SUCCESS VIEW */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full p-10 text-center space-y-8"
                >
                  <div className="w-24 h-24 rounded-full bg-primary-gold/10 flex items-center justify-center relative mb-4">
                    <div className="absolute inset-0 bg-primary-gold/20 blur-[20px] rounded-full animate-pulse" />
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
                      <Check className="text-primary-gold" size={40} strokeWidth={2.5} />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-3 max-w-sm">
                     <h3 className="font-display text-3xl text-white italic leading-tight">Inquiry <span className="not-italic font-normal">Registered</span></h3>
                     <p className="text-white/50 text-sm leading-relaxed font-light">
                       Authorization processing has initialized. Expect direct executive transmission within the standard timeframe.
                     </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    <a 
                      href="https://wa.me/your-number" target="_blank" rel="noreferrer"
                      className="flex-1 h-12 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all"
                    >
                      <MessageCircle size={14} className="text-green-400" /> WhatsApp
                    </a>
                    <button 
                      onClick={onClose}
                      className="flex-1 h-12 flex items-center justify-center rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-primary-gold transition-all shadow-xl"
                    >
                      Return to Deck
                    </button>
                  </div>

                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 pt-6 border-t border-white/5 w-full max-w-xs">
                    Wholesale Catalog Key Unlocking Upon Audit
                  </p>
                </motion.div>
              )}
            </div>

          </motion.div>

          {/* Dark custom scrollbar style */}
          <style dangerouslySetInnerHTML={{ __html: `
            .custom-scrollbar-dark::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar-dark::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar-dark::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
            .custom-scrollbar-dark::-webkit-scrollbar-thumb:hover { background: rgba(198, 167, 105, 0.3); }
          `}} />

        </div>
      )}
    </AnimatePresence>
  );
};

export default HighTrustOnboardingModal;
