import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function FilterBottomSheet({
  open,
  onClose,
  mainCats = [],
  initialFilters = {},
  onApply
}) {
  const sheetRef = useRef(null);
  const [local, setLocal] = useState({
    mainCategory: initialFilters.category || "",
    subCategory: initialFilters.sub || "",
  });

  useEffect(() => {
    setLocal({
      mainCategory: initialFilters.category || "",
      subCategory: initialFilters.sub || "",
    });
  }, [initialFilters, open]);

  // Close when clicking outside
  useEffect(() => {
    function handleOutside(e) {
      if (open && sheetRef.current && !sheetRef.current.contains(e.target)) {
        onClose();
      }
    }
    window.addEventListener("mousedown", handleOutside);
    return () => window.removeEventListener("mousedown", handleOutside);
  }, [open, onClose]);

  const subcats = (mainCats.find(m => m._id === local.mainCategory)?.subCategories) || [];

  const handleApply = () => {
    onApply({
      category: local.mainCategory,
      sub: local.subCategory
    });
    onClose();
  };

  const handleReset = () => {
    setLocal({
      mainCategory: "",
      subCategory: "",
    });
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-4">
      <div
        className="absolute inset-0 bg-deep-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>

      <div
        ref={sheetRef}
        className="relative w-full max-w-lg bg-white rounded-t-2xl md:rounded-sm shadow-2xl overflow-hidden animate-slide-up"
      >
        {/* Handle for mobile */}
        <div className="h-1.5 w-12 bg-black/10 rounded-full mx-auto mt-3 md:hidden"></div>

        <div className="p-8 lg:p-10 space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl lg:text-3xl text-deep-black italic">Refine <span className="font-normal not-italic">Search</span></h3>
            <button
              onClick={handleReset}
              className="text-[10px] font-bold tracking-widest uppercase text-primary-gold hover:text-deep-black transition-colors"
            >
              Reset All
            </button>
          </div>

          <div className="space-y-8">
            {/* Category Select */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Main Category</label>
              <div className="relative group">
                <select
                  className="w-full h-14 px-6 bg-off-white border border-black/5 rounded-sm appearance-none focus:outline-none focus:border-primary-gold/30 text-sm font-medium transition-all"
                  value={local.mainCategory}
                  onChange={(e) => setLocal(prev => ({ ...prev, mainCategory: e.target.value, subCategory: "" }))}
                >

                  <option value="">All Main Categories</option>
                  {mainCats.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                </select>
                <i className="bi bi-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-[10px] text-charcoal/40 group-hover:text-primary-gold transition-colors"></i>
              </div>
            </div>

            {/* Sub Category Select */}
            <div className={`space-y-3 transition-all duration-500 ${!local.mainCategory ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
              <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Sub Category</label>
              <div className="relative group">
                <select
                  className="w-full h-14 px-6 bg-off-white border border-black/5 rounded-sm appearance-none focus:outline-none focus:border-primary-gold/30 text-sm font-medium transition-all"
                  value={local.subCategory}
                  onChange={(e) => setLocal(prev => ({ ...prev, subCategory: e.target.value }))}
                >
                  <option value="">All Specialties</option>
                  {subcats.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                </select>
                <i className="bi bi-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-[10px] text-charcoal/40 group-hover:text-primary-gold transition-colors"></i>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-4 border border-black/5 text-[11px] font-bold tracking-widest uppercase hover:bg-off-white transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex-[2] py-4 bg-primary-gold text-white text-[11px] font-bold tracking-widest uppercase hover:bg-deep-black shadow-xl shadow-primary-gold/10 transition-all duration-500"
            >
              Apply Selection
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
