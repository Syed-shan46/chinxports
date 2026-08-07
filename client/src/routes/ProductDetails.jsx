import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { createPortal } from "react-dom";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "../config";
import { useCart } from "../context/CartContext";
import ShopifyProductCard from "../components/product/ShopifyProductCard";
import ProductDetailsSkeleton from "../components/product/ProductDetailsSkeleton";
import { getSafeImageUrl } from "../utils/imageUtils";
import { convertToINR } from "../utils/priceUtils";
import { 
  Minus, Plus, ShieldCheck, Plane, ArrowLeft, ArrowRight,
  Sparkles, Clock, Globe, Share2, Heart, 
  MessageCircle, Briefcase, ChevronRight
} from "lucide-react";

const ProductDetails = () => {
  const { cart, add, setIsDrawerOpen } = useCart();
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(12);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("specs");
  const [isLoaded, setIsLoaded] = useState(false);

  const priceINR = product ? convertToINR(product.price) : 0;
  const isInCart = product ? cart.some(item => item.productId === product._id) : false;

  const handleAddToCart = () => {
    if (isInCart) {
      setIsDrawerOpen(true);
    } else {
      add(product, quantity, priceINR);
      setIsDrawerOpen(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(false);
  }, [productId]);

  useEffect(() => {
    if (!productId) return;

    axios.get(`${BASE_URL}/api/products/${productId}`)
      .then((res) => {
        const { product: productData } = res.data;
        const fullProduct = {
          ...productData,
          priceINR: convertToINR(productData?.price),
        };
        setProduct(fullProduct);
        setActiveImage(getSafeImageUrl(productData?.imageUrl));
        setImageIndex(0);
        setQuantity(productData?.minQty || 12);
        setTimeout(() => setIsLoaded(true), 100);

        // High-End B2B Suite Tracking (Feature 3 & Feature 1 trigger)
        try {
          const key = 'cx_recently_viewed';
          const stored = JSON.parse(localStorage.getItem(key) || '[]');
          const filtered = stored.filter(p => p._id !== productData._id);
          const newRecord = {
            _id: productData._id,
            productName: productData.productName,
            price: productData.price,
            imageUrl: productData.imageUrl,
            subCategory: productData.subCategory,
            minQty: productData.minQty,
            isTrending: productData.isTrending
          };
          localStorage.setItem(key, JSON.stringify([newRecord, ...filtered].slice(0, 8)));
          
          const viewsKey = 'cx_product_views';
          const currentViews = parseInt(localStorage.getItem(viewsKey) || '0', 10);
          localStorage.setItem(viewsKey, (currentViews + 1).toString());
        } catch (e) {
          console.error("Tracking exception:", e);
        }

        const targetCatId = productData.subCategory?._id || productData.mainCategory?._id;
        if (targetCatId) {
          axios.get(`${BASE_URL}/api/products?limit=100`)
            .then((res) => {
              const all = res.data.products || [];
              const filtered = all
                .filter(p => p._id !== productId && 
                  (p.subCategory?._id === targetCatId || p.mainCategory?._id === targetCatId))
                .slice(0, 4);
              setSimilarProducts(filtered);
            })
            .catch(console.error);
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError(true);
      });
  }, [productId]);

  const handleThumbnailClick = (img, idx) => {
    setActiveImage(getSafeImageUrl(img));
    setImageIndex(idx);
  };

  const tabContent = {
    specs: (
      <div className="space-y-4 animate-fade-in">
        <div className="grid grid-cols-2 py-3 border-b border-black/[0.05] text-sm">
          <span className="text-charcoal/60 font-medium">Material Grade</span>
          <span className="text-matte-black text-right font-medium">Export Premium 18K PVD</span>
        </div>
        <div className="grid grid-cols-2 py-3 border-b border-black/[0.05] text-sm">
          <span className="text-charcoal/60 font-medium">Certifications</span>
          <span className="text-matte-black text-right font-medium">Anti-Tarnish & Hypoallergenic</span>
        </div>
        <div className="grid grid-cols-2 py-3 border-b border-black/[0.05] text-sm">
          <span className="text-charcoal/60 font-medium">Origin</span>
          <span className="text-matte-black text-right font-medium">Factory Direct Sourcing</span>
        </div>
      </div>
    ),
    shipping: (
      <div className="space-y-4 animate-fade-in text-sm leading-relaxed text-charcoal/70">
        <p>Standard international processing time is 2-4 business days.</p>
        <ul className="space-y-2 list-disc list-inside text-charcoal/60">
          <li>Priority Air Freight Delivery</li>
          <li>Export Safe Secure Packing</li>
          <li>Door-to-Door Customs Support</li>
        </ul>
      </div>
    ),
    wholesale: (
      <div className="space-y-4 animate-fade-in">
        <div className="p-5 bg-matte-black/[0.02] border border-black/[0.05] rounded-2xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary-gold mb-2">Tiered Pricing Active</p>
          <p className="text-sm text-charcoal/70 leading-relaxed">Bulk order scaling guarantees larger margins. Contact accounts directly for volumes exceeding 500 units.</p>
        </div>
      </div>
    )
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-6 pt-24">
        <h2 className="font-display text-3xl text-matte-black italic">Collection Not Found</h2>
        <Link to="/store" className="px-8 py-3.5 bg-matte-black text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-primary-gold transition-all">
          Return To Vault
        </Link>
      </div>
    );
  }

  if (!product) return <ProductDetailsSkeleton />;

  return (
    <main className="min-h-screen bg-white text-matte-black overflow-x-hidden">
      
      {/* Subtle Ambient Accents suitable for Light Theme */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-gold/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-black/[0.01] blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-10 pt-24 pb-32 lg:pt-32">
        
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <Link to="/store" className="inline-flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center transition-all group-hover:border-black/30 group-hover:bg-black/5">
              <ArrowLeft size={14} className="text-charcoal/50 group-hover:text-matte-black" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal/40 group-hover:text-matte-black transition-colors">Return to Collections</span>
          </Link>
        </motion.div>

        {/* Main Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Luxury Product Gallery */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-6 sticky lg:top-32">
            
            {/* Thumbnails */}
            {product.imageUrl?.length > 1 && (
              <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-visible no-scrollbar py-2 md:py-0 min-w-[80px]">
                {product.imageUrl.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleThumbnailClick(img, idx)}
                    className={`relative aspect-square w-16 md:w-20 shrink-0 rounded-2xl overflow-hidden border-2 bg-[#F9F9F9] transition-all duration-500 
                      ${imageIndex === idx ? "border-primary-gold" : "border-transparent opacity-70 hover:opacity-100"}`}
                  >
                    <img src={getSafeImageUrl(img)} className="w-full h-full object-cover" alt="" />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Featured Stage */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2 relative flex-grow aspect-[4/5] lg:aspect-[5/6] bg-[#F7F7F7] rounded-[32px] overflow-hidden border border-black/[0.03] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] group"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  src={activeImage}
                  className="w-full h-full object-cover mix-blend-multiply transition-transform duration-1000 group-hover:scale-105"
                  alt={product.productName}
                />
              </AnimatePresence>

              {/* Floating Badge */}
              <div className="absolute top-6 left-6 z-20">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-md border border-black/[0.03] rounded-full flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-matte-black shadow-sm">
                  <Sparkles size={12} className="text-primary-gold" />
                  Anti-Tarnish 18K
                </span>
              </div>

              {/* Utility overlay */}
              <div className="absolute top-6 right-6 flex flex-col gap-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.05] flex items-center justify-center text-charcoal/70 hover:bg-matte-black hover:text-white transition-all shadow-md">
                  <Heart size={16} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.05] flex items-center justify-center text-charcoal/70 hover:bg-matte-black hover:text-white transition-all shadow-md">
                  <Share2 size={16} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Info Architecture */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Title Stack */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-primary-gold/40" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary-gold">
                  Premium Export Edition
                </span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-matte-black tracking-tight italic">
                {product.productName}
              </h1>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="px-3 py-1 bg-black/[0.03] text-charcoal/70 text-[9px] font-bold uppercase tracking-wider border border-black/[0.03] rounded-full">
                  {product.subCategory?.name || "Jewelry"}
                </span>
                <span className="text-charcoal/40 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  In Stock - Ready
                </span>
              </div>
            </motion.div>

            {/* Price Experience */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-[24px] bg-[#F9F9F9] border border-black/[0.02] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.04)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold/[0.04] blur-3xl rounded-full" />
              
              <div className="relative flex items-end justify-between mb-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.25em]">Wholesale Net Value</p>
                  <p className="text-4xl lg:text-5xl font-display font-medium text-matte-black tracking-tighter">
                    {product.price ? `₹${priceINR.toLocaleString()}` : "Price on Request"}
                  </p>
                </div>
                <div className="text-right pb-2">
                  <p className="text-[9px] font-bold text-primary-gold uppercase tracking-widest">Min Quantity</p>
                  <p className="text-lg text-matte-black font-medium tracking-wider">{product.minQty || 12} pcs</p>
                </div>
              </div>

              <div className="h-px w-full bg-black/[0.05] mb-6" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-charcoal/30" />
                  <span className="text-[10px] font-medium text-charcoal/50 tracking-widest uppercase">VAT Excluded</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={14} className="text-charcoal/30" />
                  <span className="text-[10px] font-medium text-charcoal/50 tracking-widest uppercase">B2B Pricing</span>
                </div>
              </div>
            </motion.div>

            {/* Action Dock */}
            <div className="space-y-6">
              
              {/* Qty */}
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-between p-1.5 bg-black/[0.02] border border-black/[0.05] rounded-full min-w-[150px] h-14">
                  <button 
                    onClick={() => setQuantity(Math.max(product?.minQty || 12, quantity - (product?.minQty || 12)))}
                    className="w-11 h-11 rounded-full flex items-center justify-center text-matte-black hover:bg-white hover:shadow-sm transition-all"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-base tracking-widest text-matte-black">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + (product?.minQty || 12))}
                    className="w-11 h-11 rounded-full flex items-center justify-center text-matte-black hover:bg-white hover:shadow-sm transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="text-xs text-charcoal/40 italic pl-1 leading-snug">
                  Tiered scaling auto-applied <br className="hidden sm:block"/> at secure final review.
                </div>
              </div>

              {/* Button Stack */}
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="group relative h-16 flex items-center justify-center bg-matte-black rounded-full overflow-hidden transition-all hover:bg-[#1F1F1F] hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-gold to-champagne-gold opacity-0 group-hover:opacity-10 group-hover:bg-primary-gold duration-500 transition-opacity" />
                  <span className="relative z-10 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                    {isInCart ? "Review Cart Ledger" : "Initialize Purchase Route"}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href={`https://wa.me/your-number?text=Inquiry about ${product.productName}`}
                    target="_blank"
                    rel="noreferrer"
                    className="h-14 flex items-center justify-center gap-3 rounded-full border border-black/[0.08] bg-transparent text-[10px] font-bold uppercase tracking-[0.15em] text-matte-black hover:bg-black/[0.02] transition-all"
                  >
                    <MessageCircle size={16} className="text-green-600" />
                    Chat Support
                  </a>
                  
                  <button 
                    className="h-14 flex items-center justify-center gap-3 rounded-full border border-primary-gold/30 bg-transparent text-[10px] font-bold uppercase tracking-[0.15em] text-primary-gold hover:bg-primary-gold/[0.03] transition-all"
                  >
                    Bulk Inquiry
                  </button>
                </div>
              </div>
            </div>

            {/* Light Mode Tabs */}
            <div className="pt-2">
              <div className="flex items-center border-b border-black/[0.05] mb-8">
                {[
                  { id: 'specs', label: 'Profile' },
                  { id: 'shipping', label: 'Transit' },
                  { id: 'wholesale', label: 'B2B Notes' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative pb-4 flex-1 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-300
                      ${activeTab === tab.id ? "text-matte-black" : "text-charcoal/30 hover:text-charcoal/60"}`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div layoutId="activeTabLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-gold" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="min-h-[120px]">
                {tabContent[activeTab]}
              </div>
            </div>

            {/* Trust Anchor */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/[0.05]">
              <div className="text-center space-y-2">
                <ShieldCheck className="mx-auto text-charcoal/30" size={20} />
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-charcoal/40">Quality Sealed</p>
              </div>
              <div className="text-center space-y-2">
                <Plane className="mx-auto text-charcoal/30" size={20} />
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-charcoal/40">Global Freight</p>
              </div>
              <div className="text-center space-y-2">
                <Clock className="mx-auto text-charcoal/30" size={20} />
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-charcoal/40">Fast Turnover</p>
              </div>
            </div>

          </div>
        </div>

        {/* Narrative Block */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 relative rounded-[32px] overflow-hidden bg-[#FBFBFB] border border-black/[0.03] py-20 px-8 md:px-20 text-center"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary-gold/[0.03] blur-[100px] rounded-full" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary-gold/50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary-gold">The Legacy</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary-gold/50" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl italic text-matte-black leading-[1.3]">
              "Engineered not just as adornment, but as a definitive asset for the modern retail portfolio."
            </h2>
            <p className="text-sm font-normal text-charcoal/60 leading-relaxed max-w-xl mx-auto">
              {product.description || "Masterful industrial precision meets architectural purity. Specifically structured with heavy PVD infusion for maximal inventory lifespan and unyielding buyer satisfaction."}
            </p>
          </div>
        </motion.div>

        {/* Related Collection */}
        {similarProducts.length > 0 && (
          <div className="mt-32 lg:mt-40 space-y-14">
            <div className="flex items-end justify-between border-b border-black/[0.05] pb-6">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-primary-gold uppercase tracking-[0.5em]">Synergistic Sets</span>
                <h2 className="font-display text-4xl text-matte-black tracking-tight">Similar Collections</h2>
              </div>
              <Link to="/store" className="hidden md:flex items-center gap-2 group">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40 group-hover:text-matte-black transition-colors">Browse All</span>
                <ChevronRight size={14} className="text-charcoal/30 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {similarProducts.map((p, idx) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                >
                  <ShopifyProductCard product={p} darkTheme={false} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Mobile Sticky Dock */}
      {createPortal(
        <div className="fixed bottom-0 left-0 right-0 z-[999] lg:hidden bg-white/95 backdrop-blur-xl border-t border-black/[0.05] px-6 py-4 pb-safe flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.08)] animate-slide-up">
          <div>
            <p className="text-[9px] font-bold text-charcoal/40 uppercase tracking-widest">Net Price</p>
            <p className="font-display text-xl font-bold text-matte-black">₹{priceINR.toLocaleString()}</p>
          </div>
          <button 
            onClick={handleAddToCart}
            className="px-8 py-3.5 bg-matte-black rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg active:scale-95 transition-all"
          >
            {isInCart ? "View Ledger" : "Secure Order"}
          </button>
        </div>,
        document.body
      )}
    </main>
  );
};

export default ProductDetails;
