import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function SortBottomSheet({ open, onClose, initialSort = "", onApply }) {
  const [value, setValue] = useState(initialSort || "");
  const ref = useRef(null);

  useEffect(() => setValue(initialSort || ""), [initialSort, open]);

  useEffect(() => {
    function outside(e) {
      if (open && ref.current && !ref.current.contains(e.target)) onClose();
    }
    window.addEventListener("mousedown", outside);
    return () => window.removeEventListener("mousedown", outside);
  }, [open, onClose]);

  if (!open) return null;

  const handleApply = () => {
    onApply(value);
    onClose();
  };

  const options = [
    { id: "latest", label: "Newly Sourced" },
    { id: "price_asc", label: "Price: Essential to Premium" },
    { id: "price_desc", label: "Price: Premium to Essential" },
  ];

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-4">
      <div
        className="absolute inset-0 bg-deep-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>

      <div
        ref={ref}
        className="relative w-full max-w-md bg-white rounded-t-2xl md:rounded-sm shadow-2xl overflow-hidden animate-slide-up"
      >
        <div className="h-1.5 w-12 bg-black/10 rounded-full mx-auto mt-3 md:hidden"></div>

        <div className="p-8 lg:p-10 space-y-10">
          <div className="text-center md:text-left space-y-2">
            <h3 className="font-display text-2xl lg:text-3xl text-deep-black italic">Sort <span className="font-normal not-italic">Order</span></h3>
            <p className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold">Organize your wholesale view</p>
          </div>

          <div className="space-y-4">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setValue(opt.id)}
                className={`w-full flex items-center justify-between p-6 rounded-sm border transition-all duration-300 ${value === opt.id
                    ? 'bg-deep-black border-deep-black text-white'
                    : 'bg-off-white border-transparent text-charcoal hover:border-black/10'
                  }`}
              >
                <span className="text-sm font-medium tracking-wide">{opt.label}</span>
                {value === opt.id && <i className="bi bi-check-lg text-primary-gold"></i>}
              </button>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-4 text-[11px] font-bold tracking-widest uppercase hover:text-primary-gold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex-[2] py-4 bg-primary-gold text-white text-[11px] font-bold tracking-widest uppercase hover:bg-deep-black shadow-xl shadow-primary-gold/10 transition-all duration-500"
            >
              Apply Order
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
