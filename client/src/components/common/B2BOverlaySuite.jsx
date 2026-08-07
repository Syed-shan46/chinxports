import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ArrowRight, ShieldCheck, Globe, Clock, 
  MessageSquare, Sparkles, ChevronRight, 
  Crown, Package, Factory, MapPin 
} from 'lucide-react';
import { BASE_URL } from '../../config';

export default function B2BOverlaySuite() {
  // Unified states
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  
  // Catalog form state
  const [catalogForm, setCatalogForm] = useState({
    name: '',
    biz: '',
    country: '',
    type: 'Retailer',
    wa: '',
    purpose: ''
  });
  const [isCatalogSubmitting, setIsCatalogSubmitting] = useState(false);
  const [isCatalogSubmitted, setIsCatalogSubmitted] = useState(false);

  // Feature 11: Dynamic country routing
  const [detectedCountry, setDetectedCountry] = useState('UAE 🇦🇪');
  const globalLocations = ['UAE 🇦🇪', 'USA 🇺🇸', 'UK 🇬🇧', 'Qatar QA 🇶🇦', 'Saudi Arabia 🇸🇦', 'Kuwait 🇰🇼', 'Australia 🇦🇺', 'Canada 🇨🇦'];

  // Track triggers
  useEffect(() => {
    // Country Rotation effect (simulates smart routing if no geo-API available)
    let randCountry = globalLocations[Math.floor(Math.random() * globalLocations.length)];
    setDetectedCountry(randCountry);

    // Ensure we don't pop up if already interacted
    const hasSeenInvitation = localStorage.getItem('cx_invitation_seen');
    if (hasSeenInvitation) return;

    let triggered = false;
    const triggerInvitation = () => {
      if (triggered) return;
      triggered = true;
      setIsInvitationOpen(true);
      localStorage.setItem('cx_invitation_seen', 'true');
    };

    // 1. 8-12s Delay (DISABLED - uncomment to enable later)
    // const timer = setTimeout(() => {
    //   triggerInvitation();
    // }, 10000);

    // 2. Scroll 35-40% (DISABLED - uncomment to enable later)
    // const handleScroll = () => {
    //   const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    //   const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    //   const scrolled = (winScroll / height) * 100;
    //   if (scrolled > 35) {
    //     triggerInvitation();
    //   }
    // };
    // window.addEventListener('scroll', handleScroll);

    // 3. Multi product check (DISABLED - uncomment to enable later)
    // const views = parseInt(localStorage.getItem('cx_product_views') || '0', 10);
    // if (views >= 2) {
    //   triggerInvitation();
    // }

    return () => {
      // clearTimeout(timer);
      // window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCatalogSubmit = async (e) => {
    e.preventDefault();
    if (!catalogForm.name || !catalogForm.biz) return;
    
    setIsCatalogSubmitting(true);
    // Simulate luxury network lag
    await new Promise(r => setTimeout(r, 1200));
    
    try {
      // Send data to catalog-request endpoint
      await fetch(`${BASE_URL}/api/catalog-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catalogForm)
      });
    } catch (e) {
      // Silent fail for UI flow integrity
    }
    
    setIsCatalogSubmitting(false);
    setIsCatalogSubmitted(true);
  };

  const inputStyles = "w-full bg-[#181818]/50 border border-white/5 hover:border-white/10 focus:border-[#C6A769]/40 text-white placeholder-white/20 px-5 py-3.5 rounded-lg text-xs font-medium transition-all duration-300 outline-none";

  return (
    <>
      {/* FEATURE 11: Floating Global Trust Pill */}
      <div className="fixed top-24 right-4 z-[90] pointer-events-none hidden md:block">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="bg-[#0B0B0B]/80 backdrop-blur-xl border border-white/5 rounded-full px-4 py-2 flex items-center gap-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A769] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6A769]"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#D6BE8A] flex items-center gap-1.5">
            Serving retailers in <span className="text-white font-extrabold tracking-widest">{detectedCountry}</span>
          </span>
        </motion.div>
      </div>

      {/* FEATURE 2: STICKY SUPPORT BUTTON (Fixed Bottom-Right) */}
      {createPortal(
        <div className="fixed bottom-6 right-6 z-[9998] flex flex-col items-end gap-4 select-none pointer-events-none">
          
          {/* Support Panel Drawer */}
          <AnimatePresence>
            {isSupportOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25 }}
                className="bg-[#0B0B0B]/95 backdrop-blur-2xl w-80 border border-[#C6A769]/20 rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] p-6 space-y-5 pointer-events-auto"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-display text-lg text-white italic">Direct <span className="font-normal not-italic">Support</span></h3>
                  </div>
                  <button 
                    onClick={() => setIsSupportOpen(false)}
                    className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {/* WhatsApp Link */}
                  <a 
                    href="https://wa.me/919747758555?text=Hello%20CHINAXPORTS%2C%20I%20would%20like%20to%20inquire%20about%20wholesale%20collections." 
                    target="_blank" rel="noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#C6A769]/30 hover:bg-[#C6A769]/5 group transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#C6A769]/10 flex items-center justify-center text-[#C6A769] group-hover:scale-110 transition-transform">
                        <MessageSquare size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white tracking-wide">WhatsApp Trade Line</p>
                        <p className="text-[10px] text-white/40 font-medium">Direct account representative</p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-white/20 group-hover:text-[#C6A769] transition-colors" />
                  </a>


                </div>

                <div className="pt-2 text-center">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#C6A769]/60">Response Time: &lt; 30 Mins</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Trigger Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSupportOpen(!isSupportOpen)}
            className="pointer-events-auto w-14 h-14 rounded-full bg-[#0B0B0B]/80 backdrop-blur-xl border border-[#C6A769]/30 flex items-center justify-center text-[#C6A769] shadow-[0_15px_40px_rgba(198,167,105,0.2)] hover:bg-[#0B0B0B] hover:border-[#C6A769] hover:text-[#D6BE8A] transition-all duration-500 relative group"
          >
            <div className="absolute inset-0 rounded-full bg-[#C6A769] opacity-5 blur-md group-hover:opacity-20 transition-opacity" />
            <AnimatePresence mode="wait">
              {isSupportOpen ? <X size={20} key="c" /> : <MessageSquare size={20} key="o" />}
            </AnimatePresence>
          </motion.button>
        </div>,
        document.body
      )}

      {/* FEATURE 1: DELAYED PARTNER INVITATION MODAL */}
      {createPortal(
        <AnimatePresence>
          {isInvitationOpen && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsInvitationOpen(false)}
                className="absolute inset-0 bg-black/70 backdrop-blur-xl"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, delay: 0.1 }}
                className="relative bg-[#0B0B0B] border border-white/5 max-w-xl w-full rounded-2xl overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.9)] flex flex-col selection:bg-[#C6A769] selection:text-black"
              >
                {/* Top Golden Beam Accent */}
                <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C6A769] to-transparent opacity-75" />
                
                {/* Interactive Glow Overlay */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#C6A769]/5 blur-[100px] rounded-full pointer-events-none" />
                
                <button 
                  onClick={() => setIsInvitationOpen(false)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 border border-white/5 hover:border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
                >
                  <X size={16} />
                </button>

                <div className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <span className="text-[10px] font-bold text-[#C6A769] uppercase tracking-[0.5em] flex items-center gap-2 mb-1">
                      <Crown size={12} /> Global Wholesale Access
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl leading-tight text-white">
                      Partner With <span className="italic">CHINAXPORTS</span>
                    </h2>
                    <p className="text-xs md:text-sm text-white/50 max-w-sm leading-relaxed font-light pt-1">
                      Join major retail networks, bespoke boutiques, and online jewelers scaling with our export-grade 18K PVD manufacturing pipelines.
                    </p>
                  </div>

                  {/* Benefits Carousel/Grid */}
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {[
                      { icon: <ShieldCheck size={16} />, label: "Anti-Tarnish 18K", sub: "PVD Infusion" },
                      { icon: <Globe size={16} />, label: "Worldwide Shipping", sub: "Air Cargo Express" },
                      { icon: <Package size={16} />, label: "Low Scale MOQs", sub: "Startup Friendly" },
                      { icon: <Factory size={16} />, label: "Direct Manufactory", sub: "Zero Intermediaries" },
                    ].map((b, i) => (
                      <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex items-start gap-3 group hover:border-[#C6A769]/20 transition-colors">
                        <div className="text-[#C6A769] p-1 bg-[#C6A769]/5 rounded-lg group-hover:scale-105 transition-transform">
                          {b.icon}
                        </div>
                        <div className="text-left space-y-0.5">
                          <p className="text-[11px] font-bold text-white/90 tracking-wide">{b.label}</p>
                          <p className="text-[9px] text-white/30 font-medium uppercase tracking-wider">{b.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="w-full flex flex-col md:flex-row gap-3 pt-2">
                    <button 
                      onClick={() => {
                        setIsInvitationOpen(false);
                        // Emulate a trigger of standard Partner Modal if existing, 
                        // or redirect to corporate intake
                        setIsCatalogOpen(true); 
                      }}
                      className="flex-1 bg-[#C6A769] text-black py-4 px-8 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all hover:bg-[#D6BE8A] hover:shadow-[0_15px_35px_rgba(198,167,105,0.2)] active:scale-95 flex items-center justify-center gap-2.5"
                    >
                      Request Onboarding <ArrowRight size={14} />
                    </button>
                    <button 
                      onClick={() => setIsInvitationOpen(false)}
                      className="flex-1 border border-white/10 hover:border-white/20 hover:bg-white/5 py-4 px-8 rounded-full text-[11px] font-bold tracking-widest uppercase text-white transition-all duration-300"
                    >
                      Continue Exploring
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* FEATURE 5: REQUEST CATALOG MODAL */}
      {createPortal(
        <AnimatePresence>
          {isCatalogOpen && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCatalogOpen(false)}
                className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
              />

              <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                className="relative w-full max-w-md bg-[#0B0B0B] border border-white/5 rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
              >
                <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C6A769] to-transparent" />
                <button 
                  onClick={() => setIsCatalogOpen(false)}
                  className="absolute top-5 right-5 w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>

                {!isCatalogSubmitted ? (
                  <div className="p-8 space-y-6">
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold text-[#C6A769] uppercase tracking-[0.3em] flex items-center gap-1.5">
                        <Package size={12} /> Executive Resource
                      </span>
                      <h3 className="font-display text-2xl text-white italic leading-tight">
                        Access Interactive <span className="font-normal not-italic">Line Sheets</span>
                      </h3>
                      <p className="text-[11px] text-white/40 font-light leading-relaxed">
                        Authorized commercial entities will receive instant access to download active production catalogs.
                      </p>
                    </div>

                    <form onSubmit={handleCatalogSubmit} className="space-y-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase text-white/40 tracking-widest ml-1">Corporate Rep Name</label>
                        <input 
                          required 
                          placeholder="Jane Doe"
                          className={inputStyles}
                          value={catalogForm.name}
                          onChange={e => setCatalogForm({...catalogForm, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase text-white/40 tracking-widest ml-1">Company Name</label>
                          <input 
                            required 
                            placeholder="Luxury Jewelers Inc."
                            className={inputStyles}
                            value={catalogForm.biz}
                            onChange={e => setCatalogForm({...catalogForm, biz: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase text-white/40 tracking-widest ml-1">Region / Country</label>
                          <input 
                            required 
                            placeholder="e.g. United States"
                            className={inputStyles}
                            value={catalogForm.country}
                            onChange={e => setCatalogForm({...catalogForm, country: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase text-white/40 tracking-widest ml-1">Business Model</label>
                        <select 
                          className="w-full bg-[#181818]/50 border border-white/5 hover:border-white/10 focus:border-[#C6A769]/40 text-white px-5 py-3.5 rounded-lg text-xs font-medium transition-all outline-none appearance-none"
                          value={catalogForm.type}
                          onChange={e => setCatalogForm({...catalogForm, type: e.target.value})}
                        >
                          <option className="bg-[#0B0B0B]">Physical Boutique / Retailer</option>
                          <option className="bg-[#0B0B0B]">Online Store / E-commerce</option>
                          <option className="bg-[#0B0B0B]">Wholesale Distributor</option>
                          <option className="bg-[#0B0B0B]">Brand Startup</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase text-white/40 tracking-widest ml-1">WhatsApp Contact (Primary channel)</label>
                        <input 
                          required 
                          placeholder="+ Country Code & No."
                          className={inputStyles}
                          value={catalogForm.wa}
                          onChange={e => setCatalogForm({...catalogForm, wa: e.target.value})}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold uppercase text-white/40 tracking-widest ml-1">Partnership Purpose / Detailed Understanding</label>
                        <textarea 
                          placeholder="Briefly describe your business goals or specific interests..."
                          className={`${inputStyles} h-20 resize-none`}
                          value={catalogForm.purpose}
                          onChange={e => setCatalogForm({...catalogForm, purpose: e.target.value})}
                        />
                      </div>

                      <button 
                        type="submit"
                        disabled={isCatalogSubmitting}
                        className="w-full bg-white text-black py-4.5 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-all duration-500 hover:bg-[#C6A769] flex items-center justify-center gap-2.5 mt-2 shadow-xl disabled:opacity-50 disabled:cursor-wait"
                      >
                        {isCatalogSubmitting ? 'Verifying Dossier...' : 'Request Corporate Catalog'} 
                        {!isCatalogSubmitting && <ArrowRight size={14} />}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="p-10 flex flex-col items-center text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-[#C6A769]/10 border border-[#C6A769]/20 flex items-center justify-center text-[#C6A769]">
                      <ShieldCheck size={28} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl text-white italic">Transmission Complete</h3>
                      <p className="text-xs text-white/40 leading-relaxed max-w-xs mx-auto font-light">
                        Catalog access request submitted. We verify corporate credentials and share link sheets within immediate business hours.
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        setIsCatalogOpen(false);
                        // reset form
                        setTimeout(() => {
                          setIsCatalogSubmitted(false);
                          setCatalogForm({ name: '', biz: '', country: '', type: 'Retailer', wa: '', purpose: '' });
                        }, 500);
                      }}
                      className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-white text-[10px] uppercase font-bold tracking-[0.2em] py-3 px-8 rounded-full transition-all"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
