// components/FilterBottomSheet.jsx
import React, { useEffect, useRef, useState } from "react";
import "./BottomSheets.css";

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
    priceMin: initialFilters.priceMin || "",
    priceMax: initialFilters.priceMax || "",
    moq: initialFilters.moq || "",
    trending: initialFilters.trending === "true" || false,
    special: initialFilters.special === "true" || false
  });

  useEffect(() => {
    setLocal({
      mainCategory: initialFilters.category || "",
      subCategory: initialFilters.sub || "",
      priceMin: initialFilters.priceMin || "",
      priceMax: initialFilters.priceMax || "",
      moq: initialFilters.moq || "",
      trending: initialFilters.trending === "true" || false,
      special: initialFilters.special === "true" || false
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

  // Swipe down to close (mobile)
  useEffect(() => {
    let startY = 0;
    let currentY = 0;
    function touchStart(e) { startY = e.touches[0].clientY; }
    function touchMove(e) { currentY = e.touches[0].clientY; }
    function touchEnd() {
      if (currentY - startY > 80) onClose();
      startY = currentY = 0;
    }
    const node = sheetRef.current;
    if (node) {
      node.addEventListener("touchstart", touchStart);
      node.addEventListener("touchmove", touchMove);
      node.addEventListener("touchend", touchEnd);
    }
    return () => {
      if (node) {
        node.removeEventListener("touchstart", touchStart);
        node.removeEventListener("touchmove", touchMove);
        node.removeEventListener("touchend", touchEnd);
      }
    };
  }, [onClose]);

  const subcats = (mainCats.find(m => m._id === local.mainCategory)?.subCategories) || [];

  const handleApply = () => {
    onApply({
      category: local.mainCategory,
      sub: local.subCategory,
      priceMin: local.priceMin,
      priceMax: local.priceMax,
      moq: local.moq,
      trending: local.trending,
      special: local.special
    });
    onClose();
  };

  const handleReset = () => {
    setLocal({
      mainCategory: "",
      subCategory: "",
      priceMin: "",
      priceMax: "",
      moq: "",
      trending: false,
      special: false
    });
  };

  if (!open) return null;

  return (
    <div className="sheet-backdrop">
      <div className="sheet-panel sheet-panel-full" ref={sheetRef} role="dialog" aria-modal="true">
        <div className="sheet-handle" onClick={onClose}></div>

        <div className="sheet-header">
          <h4>Filters</h4>
          <button className="btn btn-link" onClick={handleReset}>Reset</button>
        </div>

        <div className="sheet-body">

          <label className="sheet-label">Main Category</label>
          <select
            className="form-select"
            value={local.mainCategory}
            onChange={(e) => setLocal(prev => ({ ...prev, mainCategory: e.target.value, subCategory: "" }))}
          >
            <option value="">All</option>
            {mainCats.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
          </select>

          <label className="sheet-label mt-3">Sub Category</label>
          <select
            className="form-select"
            value={local.subCategory}
            onChange={(e) => setLocal(prev => ({ ...prev, subCategory: e.target.value }))}
            disabled={!local.mainCategory}
          >
            <option value="">All</option>
            {subcats.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
          </select>

          {/* <div className="d-flex gap-2 mt-3">
            <div style={{ flex: 1 }}>
              <label className="sheet-label">Min Price (RMB)</label>
              <input className="form-control" type="number" value={local.priceMin} onChange={(e)=>setLocal(prev=>({...prev, priceMin:e.target.value}))} />
            </div>
            <div style={{ flex: 1 }}>
              <label className="sheet-label">Max Price (RMB)</label>
              <input className="form-control" type="number" value={local.priceMax} onChange={(e)=>setLocal(prev=>({...prev, priceMax:e.target.value}))} />
            </div>
          </div> */}

          {/* <label className="sheet-label mt-3">MOQ</label>
          <input className="form-control" type="number" min="1" value={local.moq} onChange={(e)=>setLocal(prev=>({...prev, moq:e.target.value}))} /> */}

          {/* <div className="d-flex align-items-center justify-content-between mt-3">
            <div>
              <label className="form-check-label me-2">
                <input type="checkbox" checked={local.trending} onChange={(e)=>setLocal(prev=>({...prev, trending:e.target.checked}))} /> Trending
              </label>
            </div>
            <div>
              <label className="form-check-label me-2">
                <input type="checkbox" checked={local.special} onChange={(e)=>setLocal(prev=>({...prev, special:e.target.checked}))} /> Special
              </label>
            </div>
          </div> */}

        </div>

        <div className="sheet-footer">
          <button className="btn btn-light" onClick={onClose}>Close</button>
          <button className="btn btn-pink text-light" onClick={handleApply}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
}
