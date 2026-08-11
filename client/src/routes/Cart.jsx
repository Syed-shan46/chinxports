import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  ShieldCheck, 
  Upload, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Clock,
  HelpCircle,
  ArrowLeft,
  CreditCard,
  Building2,
  Apple,
  Globe,
  Trash2,
  Check,
  Plus,
  Minus,
  Smartphone,
  Bitcoin
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { getSafeImageUrl } from "../utils/imageUtils";
import { BASE_URL } from "../config";

const LuxuryWholesaleCheckout = () => {
  const { cart, removeItem, update, clear } = useCart();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form States
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    code: "+91",
    notes: ""
  });

  const fileInputRef = useRef(null);

  // Constraints
  const MIN_PURCHASE = 20000;
  const subtotal = cart.reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 1)), 0);
  const totalPriceINR = subtotal;

  const progressPercentage = Math.min((totalPriceINR / MIN_PURCHASE) * 100, 100);
  const remainingForMoq = Math.max(MIN_PURCHASE - totalPriceINR, 0);
  const isUnlocked = totalPriceINR >= MIN_PURCHASE;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, success]);


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
      setScreenshotPreview(URL.createObjectURL(file));
    }
  };

  const handleFinalSubmit = async () => {
    if (!userDetails.name || !userDetails.phone || !screenshot) return;
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("cart", JSON.stringify(cart));
      formData.append("userDetails", JSON.stringify(userDetails));
      formData.append("transactionId", transactionId || "");
      formData.append("screenshot", screenshot);

      const res = await fetch(`${BASE_URL}/api/email`, {
        method: "POST",
        body: formData
      });
      
      if (res.ok) {
        setSuccess(true);
      } else {
        setSuccess(true); 
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSuccess(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  if (cart.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-[#FCFBFA] flex items-center justify-center pt-20 text-black selection:bg-primary-gold selection:text-white">
        <div className="text-center space-y-8 max-w-md px-6">
          <div className="relative w-24 h-24 mx-auto bg-black/[0.03] rounded-full flex items-center justify-center border border-black/[0.05]">
            <ShoppingBag className="text-primary-gold" size={40} strokeWidth={1} />
          </div>
          <div className="space-y-3">
            <h2 className="font-display text-4xl text-black italic">Your Vault is Empty</h2>
            <p className="text-gray-500 text-sm font-light">Initialize your wholesale journey by selecting from our master collections.</p>
          </div>
          <button onClick={() => navigate("/store")} className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] transition-all hover:bg-primary-gold active:scale-95">
            Browse Collections
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFBFA] text-black pt-28 pb-24 selection:bg-primary-gold selection:text-white overflow-x-hidden relative">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-gold/5 blur-[150px] rounded-full opacity-60" />
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-black/[0.01] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-[1400px]">
        
        <AnimatePresence mode="wait">
          {!success ? (
            <div className="space-y-6 lg:space-y-8">
              
              {/* ==========================================
                  UNIFIED CONTINUOUS STEPPER
                  ========================================== */}
              <div className="max-w-3xl mx-auto relative">
                <div className="absolute top-5 left-[10%] right-[10%] h-[1px] bg-black/5 z-0 pointer-events-none">
                  <motion.div 
                    initial={false}
                    animate={{ width: `${(currentStep - 1) * 50}%` }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="h-full bg-primary-gold shadow-[0_0_10px_rgba(198,167,105,0.5)] relative"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary-gold rounded-full shadow-[0_0_8px_rgba(198,167,105,0.5)]" />
                  </motion.div>
                </div>

                <div className="flex items-center justify-between relative z-10">
                  {[
                    { id: 1, label: "Order Review" },
                    { id: 2, label: "Secure Payment" },
                    { id: 3, label: "Verification" }
                  ].map((step, idx) => (
                    <div key={step.id} className="flex flex-col items-center w-20 sm:w-32">
                      <div 
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 relative z-20 bg-[#FCFBFA]
                          ${currentStep === step.id ? 'border-primary-gold border-2 shadow-[0_0_20px_rgba(198,167,105,0.2)] scale-110' 
                            : currentStep > step.id ? 'bg-primary-gold border-primary-gold' 
                            : 'border-gray-200'}`}
                      >
                        {currentStep > step.id ? (
                          <Check size={16} className="text-white font-bold" />
                        ) : (
                          <span className={`text-[11px] font-bold tracking-widest ${currentStep === step.id ? 'text-primary-gold' : 'text-gray-400'}`}>
                            0{step.id}
                          </span>
                        )}
                        
                        {currentStep === step.id && (
                          <span className="absolute inset-[-4px] rounded-full border border-primary-gold/30 animate-ping" style={{ animationDuration: '3s' }}></span>
                        )}
                      </div>
                      
                      <div className="mt-4 text-center">
                        <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.3em] whitespace-nowrap transition-all duration-500
                          ${currentStep === step.id ? 'text-black opacity-100' : 'text-gray-400'}`}>
                          {step.label}
                        </span>
                        {currentStep === step.id && (
                          <motion.div layoutId="stepperLine" className="h-[1px] w-6 bg-primary-gold mx-auto mt-1.5" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* LEFT COLUMN: ACTIVE STEP CONTENT */}
                <div className="lg:col-span-8">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div 
                        key="step1" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-8"
                      >
                        <div className="space-y-1.5 mt-[-4px]">
                          <div className="flex items-center gap-2.5">
                            <div className="h-px w-6 bg-primary-gold/50" />
                            <span className="text-[9px] font-bold text-primary-gold uppercase tracking-[0.4em]">Wholesale Desk</span>
                          </div>
                          <h1 className="font-display text-3xl lg:text-4xl text-black italic">Review <span className="not-italic font-normal">Inventory</span></h1>
                        </div>

                        <div className="p-6 bg-white border border-black/[0.04] shadow-sm rounded-3xl relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold/[0.04] blur-[60px] rounded-full" />
                          <div className="relative space-y-4">
                            <div className="flex justify-between items-end">
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-1">Wholesale Target</p>
                                <h3 className="font-display text-2xl text-black">₹{totalPriceINR.toLocaleString()} <span className="text-gray-300 text-base font-sans">/ ₹{MIN_PURCHASE.toLocaleString()}</span></h3>
                              </div>
                              {isUnlocked ? (
                                <div className="flex items-center gap-2 text-green-600 text-[9px] font-bold uppercase tracking-widest">
                                  <ShieldCheck size={14} />
                                  Quota Met
                                </div>
                              ) : (
                                <p className="text-[9px] font-bold uppercase tracking-widest text-primary-gold">
                                  Add ₹{remainingForMoq.toLocaleString()} more
                                </p>
                              )}
                            </div>

                            <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden relative border border-gray-200/50">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-gold to-champagne-gold"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {cart.map((item) => (
                            <motion.div 
                              layout key={item.productId}
                              className="bg-white border border-black/[0.03] rounded-2xl p-3 flex items-center gap-4 relative group shadow-sm"
                            >
                              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-50 border border-black/[0.05] overflow-hidden shrink-0">
                                <img src={getSafeImageUrl(item.imageUrl)} alt={item.productName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                              </div>
                              
                              <div className="flex-grow space-y-1 min-w-0">
                                <h3 className="font-display text-lg text-black tracking-tight truncate pr-4">{item.productName}</h3>
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest font-medium">₹{item.price.toLocaleString()} /unit</p>
                              </div>

                              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 shrink-0">
                                <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 px-2 rounded-full h-9 sm:h-10 shrink-0">
                                  <button 
                                    onClick={() => update(item.productId, Math.max(item.minQty || 12, item.quantity - (item.minQty || 12)))}
                                    className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                                  >
                                    <Minus size={12} />
                                  </button>
                                  <span className="font-bold text-xs tracking-widest text-black w-6 text-center">{item.quantity}</span>
                                  <button 
                                    onClick={() => update(item.productId, item.quantity + (item.minQty || 12))}
                                    className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                                  >
                                    <Plus size={12} />
                                  </button>
                                </div>

                                <div className="text-right min-w-[80px] hidden sm:block">
                                  <p className="font-display text-lg text-black font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                              </div>

                              <button 
                                onClick={() => removeItem(item.productId)}
                                className="absolute top-2 right-2 p-1 text-gray-300 hover:text-red-500 transition-colors"
                              >
                                <X size={12} />
                              </button>
                            </motion.div>
                          ))}
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-6 justify-between pt-6 border-t border-gray-100">
                          <Link to="/store" className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors flex items-center gap-2">
                            <ArrowLeft size={14} /> Keep Shopping
                          </Link>
                          <button 
                            onClick={nextStep}
                            disabled={!isUnlocked}
                            className={`h-16 px-12 rounded-full font-bold uppercase text-[11px] tracking-[0.25em] flex items-center gap-3 transition-all duration-500 shadow-lg
                              ${isUnlocked ? 'bg-black text-white hover:bg-primary-gold hover:shadow-[0_15px_35px_rgba(198,167,105,0.25)] active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'}`}
                          >
                            Continue to Secure Payment
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
                        <div className="space-y-1.5 mt-[-4px]">
                          <div className="flex items-center gap-2.5">
                            <div className="h-px w-6 bg-primary-gold/50" />
                            <span className="text-[9px] font-bold text-primary-gold uppercase tracking-[0.4em]">Direct Treasury Channel</span>
                          </div>
                          <h1 className="font-display text-3xl lg:text-4xl text-black italic">Verified Wholesale <span className="not-italic font-normal">Payment</span></h1>
                          <p className="text-gray-500 text-xs font-light">Complete bulk order settlement through verified node.</p>
                        </div>

                        <div className="max-w-lg mx-auto w-full">
                          <div className="bg-white border border-black/[0.03] rounded-[40px] p-8 relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-gold/[0.03] blur-[80px] rounded-full" />
                            <div className="relative flex flex-col items-center text-center space-y-6">
                              <div className="w-full flex justify-between items-center">
                                <div className="flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1.5 rounded-full border border-green-100 text-[9px] font-bold uppercase tracking-widest">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                  Secure Line Active
                                </div>
                                <ShieldCheck className="text-primary-gold" size={20} />
                              </div>

                              <div className="flex flex-col items-center gap-3">
                                <div className="aspect-square bg-white p-6 rounded-[32px] border border-gray-100 relative group/qr overflow-hidden shadow-md">
                                  <img src="/images/web/payment_qr.png" alt="Payment QR" className="w-full h-full object-contain" />
                                </div>
                                <a 
                                  href="/images/web/payment_qr.png" 
                                  download="CHINAXPORTS_Payment_QR.png"
                                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-all text-[9px] font-bold uppercase tracking-widest text-gray-600 hover:text-black"
                                >
                                  <Upload size={12} className="rotate-180" />
                                  Download QR
                                </a>
                              </div>

                              <div className="w-full space-y-4">
                                <div className="pt-2">
                                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em] font-light">Open banking app to scan</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center gap-4 pt-6 border-t border-gray-100 w-full max-w-md mx-auto">
                          <button 
                            onClick={nextStep} 
                            className="group h-16 px-12 rounded-full bg-black text-white text-[11px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-3 hover:bg-primary-gold transition-all active:scale-95 shadow-xl w-full"
                          >
                            I've Completed Payment
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                          <button 
                            onClick={prevStep} 
                            className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors py-2"
                          >
                            Back to Review
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div key="step3" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
                        <div className="space-y-1.5 mt-[-4px]">
                          <div className="flex items-center gap-2.5">
                            <div className="h-px w-6 bg-primary-gold/50" />
                            <span className="text-[9px] font-bold text-primary-gold uppercase tracking-[0.4em]">Authentication Hub</span>
                          </div>
                          <h1 className="font-display text-3xl lg:text-4xl text-black italic">Submit <span className="not-italic font-normal">Verification</span></h1>
                          <p className="text-gray-500 text-xs font-light">Upload digital ledger screenshot for manual verification.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Uploader Card */}
                          <div 
                            onClick={() => fileInputRef.current.click()}
                            className={`relative aspect-[4/3] md:aspect-square rounded-[40px] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-700 group
                              ${screenshotPreview ? 'border-primary-gold/50 bg-gray-50' : 'border-gray-200 bg-white hover:border-primary-gold/40 hover:bg-gray-50'}
                              shadow-sm`}
                          >
                            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                            {screenshotPreview ? (
                              <div className="absolute inset-0 p-2">
                                <div className="relative w-full h-full rounded-[32px] overflow-hidden shadow-sm">
                                  <img src={screenshotPreview} className="w-full h-full object-contain bg-gray-50" alt="Preview" />
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                                    <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                      <Trash2 size={20} className="text-red-500" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="relative z-10 flex flex-col items-center gap-4 text-center p-8">
                                <div className="w-16 h-16 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-center text-primary-gold group-hover:scale-110 group-hover:bg-primary-gold group-hover:text-white transition-all duration-500 shadow-sm">
                                  <Upload size={28} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-1">
                                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-black group-hover:text-primary-gold transition-colors">Drop Confirmation</h4>
                                  <p className="text-[9px] text-gray-400 uppercase tracking-widest font-light">Supports PNG, JPG</p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Credential Fields */}
                          <div className="bg-white border border-black/[0.03] shadow-xl rounded-[40px] p-8 lg:p-10 flex flex-col justify-between relative">
                            <div className="space-y-6 relative">
                              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-2 flex items-center gap-2">
                                <ShieldCheck size={14} className="text-primary-gold" /> 
                                Declaration Ledger
                              </h3>
                              
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 ml-1">Contact Name</label>
                                  <input 
                                    type="text" placeholder="Principal buyer/business head"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-primary-gold/50 focus:bg-white transition-all duration-300"
                                    value={userDetails.name} onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 ml-1">WhatsApp Intelligence</label>
                                  <div className="flex gap-2 w-full overflow-hidden">
                                    <select className="w-16 bg-gray-50 border border-gray-200 rounded-xl px-2 text-xs font-bold text-black focus:outline-none focus:border-primary-gold/50 cursor-pointer shrink-0" value={userDetails.code} onChange={(e) => setUserDetails({...userDetails, code: e.target.value})}>
                                      <option value="+91">+91</option>
                                      <option value="+86">+86</option>
                                      <option value="+1">+1</option>
                                    </select>
                                    <input 
                                      type="tel" placeholder="WhatsApp number"
                                      className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-primary-gold/50 focus:bg-white transition-all"
                                      value={userDetails.phone} onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                                    />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 ml-1">Reference ID / Notes</label>
                                  <input 
                                    type="text" placeholder="Optional requirements"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-primary-gold/50 focus:bg-white transition-all"
                                    value={transactionId} onChange={(e) => setTransactionId(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="mt-10 space-y-4">
                              <button 
                                onClick={handleFinalSubmit}
                                disabled={isSubmitting || !userDetails.name || !userDetails.phone || !screenshot}
                                className={`group w-full h-16 rounded-full font-bold uppercase text-[11px] tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3 shadow-lg
                                  ${isSubmitting || !userDetails.name || !userDetails.phone || !screenshot 
                                    ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed' 
                                    : 'bg-black text-white hover:bg-primary-gold active:scale-[0.98]'}`}
                              >
                                {isSubmitting ? (
                                  <><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />Authenticating...</>
                                ) : (
                                  <>Submit for Verification<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                                )}
                              </button>
                              <p className="text-center text-[9px] uppercase tracking-widest text-gray-400 italic">By submitting, you authorize verification.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center pt-4">
                          <button onClick={prevStep} className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors">
                            Back to Payment Details
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* RIGHT COLUMN: STICKY FLOATING SUMMARY */}
                <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-32 pb-8">
                  <div className="bg-white border border-black/[0.03] rounded-[40px] p-8 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold/[0.03] blur-[60px] rounded-full" />
                    
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                      <h3 className="font-display text-2xl text-black italic tracking-tight">Statement <span className="not-italic font-normal text-gray-400">Summary</span></h3>
                      <span className="px-3 py-1 bg-gray-50 text-[9px] font-bold tracking-widest text-gray-500 rounded-full uppercase border border-gray-100">
                        {cart.reduce((a, b) => a + b.quantity, 0)} Units
                      </span>
                    </div>

                    <div className="space-y-5 max-h-[260px] overflow-y-auto pr-3 custom-scrollbar-light mb-6 relative">
                      {cart.map((item) => (
                        <div key={item.productId} className="flex gap-4 items-center group">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 shadow-sm">
                            <img src={getSafeImageUrl(item.imageUrl)} className="w-full h-full object-cover transition-all duration-500" alt="" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black truncate leading-relaxed">{item.productName}</p>
                            <p className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-widest font-medium">{item.quantity} × ₹{item.price.toLocaleString()}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-[11px] font-bold text-black tracking-wide">₹{(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 border-t border-gray-100 pt-6 relative z-10">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <span>Logistics Threshold</span>
                        <span className="text-green-600 font-medium">Complimentary</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <span>Tax Metric (Export)</span>
                        <span>0.00</span>
                      </div>
                      
                      <div className="pt-4 mt-2 flex justify-between items-end border-t border-gray-100 border-dashed">
                        <div className="space-y-1">
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">Net Amount Payable</p>
                          <p className="text-4xl font-display text-black font-semibold tracking-tight">₹{totalPriceINR.toLocaleString()}</p>
                        </div>
                        <div className="flex flex-col items-end text-primary-gold">
                           <Globe size={16} />
                           <span className="text-[7px] font-bold uppercase tracking-[0.2em] mt-1.5 text-gray-400">INR BASE</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-start gap-3">
                      <Lock className="mt-0.5 flex-shrink-0 text-primary-gold" size={14} />
                      <div>
                        <p className="text-[9px] font-bold text-black uppercase tracking-widest mb-0.5">Secured Vault Protocol</p>
                        <p className="text-[8px] font-light text-gray-400 uppercase tracking-widest leading-relaxed">Transactions monitored for anti-fraud parity.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto py-20 lg:py-28 text-center space-y-10 relative"
            >
              <div className="w-28 h-28 mx-auto relative group">
                <div className="absolute inset-0 bg-primary-gold/20 rounded-full blur-[20px]" />
                <div className="w-full h-full bg-white border border-primary-gold/30 rounded-full flex items-center justify-center relative z-10 shadow-xl">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}>
                    <CheckCircle2 className="text-primary-gold" size={48} strokeWidth={1} />
                  </motion.div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-8 bg-primary-gold/50" />
                  <span className="text-[10px] font-bold text-primary-gold uppercase tracking-[0.5em]">Queue Priority Locked</span>
                  <div className="h-px w-8 bg-primary-gold/50" />
                </div>
                <h2 className="font-display text-5xl md:text-6xl text-black italic tracking-tight leading-tight">Manifest <span className="not-italic font-normal">Submitted</span></h2>
                <p className="text-gray-500 text-sm max-w-md mx-auto font-light pt-2">Our teams are syncing to verify your payload. Normal threshold: **5–30 minutes**.</p>
              </div>
              
              <div className="flex justify-center items-center gap-8 max-w-sm mx-auto bg-white border border-gray-100 py-5 px-8 rounded-[30px] shadow-lg">
                 <div className="text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Validation</p>
                    <p className="text-[11px] font-bold text-black uppercase tracking-widest">T-Minus 30m</p>
                 </div>
                 <div className="w-px h-8 bg-gray-100" />
                 <div className="text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Dispatch Mode</p>
                    <p className="text-[11px] font-bold text-green-600 uppercase tracking-widest">A-Priority</p>
                 </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button onClick={() => navigate("/")} className="h-14 px-10 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-primary-gold shadow-lg w-full sm:w-auto transition-all">Back to Command</button>
                  <a href="https://wa.me/9747758555" target="_blank" rel="noreferrer" className="h-14 px-10 bg-white border border-gray-200 text-black text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-gray-50 transition-all flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm">Support Direct</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar-light::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar-light::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-light::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
        .custom-scrollbar-light::-webkit-scrollbar-thumb:hover { background: #D1D5DB; }
      `}} />
    </main>
  );
};

export default LuxuryWholesaleCheckout;
