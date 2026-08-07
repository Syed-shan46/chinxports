import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ChevronRight } from 'lucide-react';
import { getSafeImageUrl } from '../../utils/imageUtils';
import { convertToINR } from '../../utils/priceUtils';

export default function RecentlyExplored() {
  const [items, setItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    try {
      const key = 'cx_recently_viewed';
      const stored = JSON.parse(localStorage.getItem(key) || '[]');
      
      // Filter out current product if on its detail page to avoid redundancy
      const pathParts = location.pathname.split('/');
      const currentId = pathParts[pathParts.length - 1];
      const filtered = stored.filter(p => p._id !== currentId);
      
      setItems(filtered.slice(0, 6)); // show up to 6
    } catch (e) {
      // Silent fail
    }
  }, [location.pathname]);

  if (items.length === 0) return null;

  return (
    <div className="w-full bg-white pt-24 pb-16 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 space-y-10">
        
        {/* Luxury Header Stack */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-black/[0.05] pb-6">
          <div className="space-y-2">
            <span className="text-[9px] font-bold text-primary-gold uppercase tracking-[0.5em] flex items-center gap-2">
              <Eye size={12} /> Navigation Ledger
            </span>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight italic text-matte-black">
              Recently <span className="font-normal not-italic">Explored</span>
            </h2>
          </div>
          
          <Link 
            to="/store" 
            className="group flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-charcoal/40 hover:text-matte-black transition-colors"
          >
            Return To Collections <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Horizontal Scroll / Carousel Grid */}
        <div className="flex gap-6 overflow-x-auto pb-10 pt-4 no-scrollbar -mx-6 px-6 lg:-mx-16 lg:px-16">
          {items.map((product, idx) => {
            const priceINR = convertToINR(product.price);
            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.6 }}
                className="w-[240px] md:w-[280px] shrink-0 group relative"
              >
                <Link 
                  to={`/products/product-details/${product._id}`}
                  className="block relative aspect-square rounded-[24px] overflow-hidden bg-off-white shadow-[0_15px_35px_rgba(0,0,0,0.02)] border border-black/[0.02] group-hover:shadow-[0_30px_60px_rgba(198,167,105,0.12)] transition-all duration-700"
                >
                  {/* Top Luxury Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2.5 py-1 bg-white/80 backdrop-blur-md border border-black/[0.03] text-[7px] font-bold text-charcoal/60 rounded-full tracking-widest uppercase">
                      MOQ {product.minQty || 12}
                    </span>
                  </div>

                  <img 
                    src={getSafeImageUrl(product.imageUrl)} 
                    alt={product.productName}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.04] mix-blend-multiply"
                  />

                  {/* Subtle Gold Corner Reflection Accent on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#C6A769]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </Link>

                <div className="pt-5 flex flex-col space-y-1">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-charcoal/30">
                    {product.subCategory?.name || 'Premium Series'}
                  </span>
                  
                  <Link to={`/products/product-details/${product._id}`}>
                    <h4 className="font-display text-base text-matte-black font-medium truncate group-hover:text-primary-gold transition-colors duration-300">
                      {product.productName}
                    </h4>
                  </Link>

                  <div className="flex items-center justify-between pt-1.5">
                    <span className="text-xs font-bold text-matte-black">
                      {!product.price ? 'Inquiry' : `₹${priceINR.toLocaleString()}`}
                    </span>
                    <span className="text-[8px] font-bold text-[#C6A769] uppercase tracking-[0.15em]">
                      Ready to dispatch
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
