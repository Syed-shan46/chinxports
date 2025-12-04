// components/SortBottomSheet.jsx
import React, { useEffect, useRef, useState } from "react";
import "./BottomSheets.css";

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

  return (
    <div className="sheet-backdrop">
      <div className="sheet-panel sheet-panel-compact" ref={ref} role="dialog" aria-modal="true">
        <div className="sheet-handle" onClick={onClose}></div>
        <div className="sheet-header"><h5>Sort By</h5></div>

        <div className="sheet-body">
          <div className="form-check">
            <input id="sort-latest" className="form-check-input" type="radio" name="sort" checked={value === "latest"} onChange={()=>setValue("latest")} />
            <label className="form-check-label" htmlFor="sort-latest">Latest Added</label>
          </div>
          <div className="form-check mt-2">
            <input id="sort-price-asc" className="form-check-input" type="radio" name="sort" checked={value === "price_asc"} onChange={()=>setValue("price_asc")} />
            <label className="form-check-label" htmlFor="sort-price-asc">Price: Low to High</label>
          </div>
          <div className="form-check mt-2">
            <input id="sort-price-desc" className="form-check-input" type="radio" name="sort" checked={value === "price_desc"} onChange={()=>setValue("price_desc")} />
            <label className="form-check-label" htmlFor="sort-price-desc">Price: High to Low</label>
          </div>
        </div>

        <div className="sheet-footer">
          <button className="btn btn-light" onClick={onClose}>Cancel</button>
          <button className="btn btn-pink text-light" onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
}
