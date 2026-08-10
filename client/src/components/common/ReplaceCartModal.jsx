import React from 'react';
import { useCart } from '../../context/CartContext';
import { getSafeImageUrl } from '../../utils/imageUtils';

const ReplaceCartModal = () => {
    const { showReplaceModal, setShowReplaceModal, confirmReplace, pendingItem, cart } = useCart();

    if (!showReplaceModal || !pendingItem) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 lg:p-6 bg-deep-black/95 backdrop-blur-xl animate-fade-in">
            <div
                className="relative w-full max-w-lg bg-white rounded-sm shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden animate-scale-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Visual Header - High Impact */}
                <div className="relative h-32 bg-deep-black overflow-hidden flex items-center px-10">
                    <div className="relative z-10 space-y-1">
                        <span className="text-[9px] font-bold tracking-[0.4em] text-primary-gold uppercase block">Logistics Restriction</span>
                        <h2 className="font-display text-2xl text-white tracking-widest leading-none">REPLACE <span className="italic font-normal">LIST?</span></h2>
                    </div>
                    {/* Background Texture/Pattern */}
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-primary-gold/10 -skew-x-12 translate-x-1/2"></div>
                </div>

                <div className="p-8 lg:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                        {/* Summary side */}
                        <div className="md:col-span-12 space-y-6">
                            <p className="text-[14px] text-charcoal/70 leading-relaxed font-body">
                                Your current bag contains items from a different collection. To maintain wholesale efficiency, you must select either <span className="text-deep-black font-semibold">18k Gold Plated & 316L Stainless Steel</span> or other main categories separately per order.
                            </p>

                            <div className="p-5 bg-off-white/80 border border-black/5 rounded-sm flex items-center gap-6 relative group/incoming shadow-sm">
                                <div className="w-20 h-20 bg-white border border-black/10 rounded-sm overflow-hidden flex-shrink-0 shadow-sm transition-all group-hover/incoming:border-primary-gold/40">
                                    <img 
                                        src={pendingItem.product.imageUrl ? getSafeImageUrl(pendingItem.product.imageUrl[0]) : ""} 
                                        alt="" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/incoming:scale-110" 
                                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1535633302703-9420414421ee?q=80&w=2070&auto=format&fit=crop"; }}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-primary-gold uppercase tracking-[0.4em] block mb-1">New Selection</span>
                                    <p className="text-sm font-display font-medium text-deep-black line-clamp-1 italic tracking-tight">{pendingItem.product.productName || "Selected Piece"}</p>
                                    <div className="flex gap-2">
                                        <span className="text-[8px] font-bold text-warm-gray px-2 py-0.5 bg-white border border-black/5 rounded-full uppercase tracking-tighter">Category Change</span>
                                    </div>
                                </div>
                                <div className="absolute -right-3 -top-3 w-8 h-8 bg-primary-gold text-white rounded-full flex items-center justify-center shadow-xl shadow-primary-gold/20 rotate-12 scale-90">
                                     <i className="bi bi-shuffle text-xs"></i>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/5">
                            <button
                                onClick={confirmReplace}
                                className="w-full py-5 bg-deep-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-primary-gold transition-all duration-700 shadow-2xl flex items-center justify-center gap-3 active:scale-95"
                            >
                                <i className="bi bi-arrow-repeat text-sm"></i>
                                <span>REPLACE LIST</span>
                            </button>
                            <button
                                onClick={() => setShowReplaceModal(false)}
                                className="w-full py-5 bg-white text-charcoal/40 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-charcoal transition-all border border-black/5 hover:border-black/20 flex items-center justify-center gap-3 active:scale-95"
                            >
                                <i className="bi bi-x-lg text-xs"></i>
                                <span>KEEP EXISTING</span>
                            </button>
                        </div>
                    </div>

                    <p className="text-center mt-8 text-[9px] text-warm-gray/40 uppercase tracking-[0.4em] italic">
                        * CURRENT {cart.length} ITEM(S) WILL BE REMOVED
                    </p>
                </div>

                {/* Bottom Border Accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-primary-gold to-transparent"></div>
            </div>
        </div>
    );
};

export default ReplaceCartModal;
