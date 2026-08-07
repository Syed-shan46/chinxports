import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';

const BulkEditProducts = () => {
    const [products, setProducts] = useState([]);
    const [mainCats, setMainCats] = useState([]);
    const [subCats, setSubCats] = useState([]);
    const [filters, setFilters] = useState({
        mainCategory: '',
        subCategory: '',
        search: '',
        page: 1
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(1);
    const [modifiedIds, setModifiedIds] = useState(new Set());
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [previewImage, setPreviewImage] = useState(null);
    const [batchMinQty, setBatchMinQty] = useState('');
    const [showZeroPriceOnly, setShowZeroPriceOnly] = useState(false);
    const [sortAsc, setSortAsc] = useState(false);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/categories/get-maincategories`)
            .then(res => {
                // Show all categories logically without hardcoded exclusions
                setMainCats(res.data.categories || []);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        // Reset to page 1 when filters change to ensure logical results
        setFilters(prev => ({ ...prev, page: 1 }));
        setShowZeroPriceOnly(false); // Reset price focus on filter change
        setSortAsc(false); // Reset sort on filter change
    }, [filters.mainCategory, filters.subCategory, filters.search]);

    useEffect(() => {
        fetchProducts();
    }, [filters.page, filters.mainCategory, filters.subCategory]); // Trigger fetch on filter change

    // Infinite Scroll Listener
    useEffect(() => {
        const handleScroll = () => {
            if (loading || filters.page >= pages) return;

            const scrollHeight = document.documentElement.scrollHeight;
            const currentScroll = window.innerHeight + document.documentElement.scrollTop;

            if (currentScroll + 300 >= scrollHeight) {
                setFilters(prev => ({ ...prev, page: prev.page + 1 }));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, filters.page, pages]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams(filters);
            // Ensure empty filters don't send 'undefined' strings
            if (!filters.mainCategory) params.delete('mainCategory');
            if (!filters.subCategory) params.delete('subCategory');

            const res = await axios.get(`${BASE_URL}/api/products/get-admin-products?${params.toString()}`, {
                withCredentials: true
            });
            if (res.data.success) {
                if (filters.page === 1) {
                    setProducts(res.data.products);
                    setSelectedIds(new Set());
                } else {
                    setProducts(prev => [...prev, ...res.data.products]);
                }
                setTotal(res.data.total);
                setPages(res.data.pages);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setFilters(prev => ({ ...prev, page: 1 }));
    };

    const updateProductLocal = (id, field, value) => {
        setProducts(prev => prev.map(p => {
            if (p._id === id) {
                const updated = { ...p, [field]: value };
                
                // Logic: If switching Brand (mainCategory), check if current subCategory exists in new brand
                if (field === 'mainCategory') {
                    const newCat = mainCats.find(c => c._id === value);
                    const currentSubId = typeof p.subCategory === 'object' ? p.subCategory?._id : p.subCategory;
                    
                    const subExists = newCat?.subCategories?.some(s => s._id === currentSubId);
                    if (!subExists) {
                        // If not shared, set to first available subcategory of new brand
                        updated.subCategory = newCat?.subCategories?.[0] || null;
                    }
                }
                return updated;
            }
            return p;
        }));
        setModifiedIds(prev => new Set(prev).add(id));
    };

    const handleSave = async () => {
        if (modifiedIds.size === 0) return;
        setSaving(true);
        try {
            const updates = products
                .filter(p => modifiedIds.has(p._id))
                .map(p => ({
                    id: p._id,
                    productName: p.productName,
                    price: p.price,
                    minQty: p.minQty,
                    // Robust ID extraction
                    mainCategory: p.mainCategory?._id || p.mainCategory,
                    subCategory: p.subCategory?._id || p.subCategory
                }));

            const res = await axios.post(`${BASE_URL}/api/products/bulk-update`, { updates }, {
                withCredentials: true
            });

            if (res.data.success) {
                alert(`Successfully updated ${modifiedIds.size} products.`);
                setModifiedIds(new Set());
                setFilters(prev => ({ ...prev, page: 1 }));
            }
        } catch (err) {
            console.error(err);
            alert("Update failed.");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.size === 0) return;
        if (!window.confirm(`Are you sure you want to delete ${selectedIds.size} products?`)) return;

        setLoading(true);
        try {
            const res = await axios.delete(`${BASE_URL}/api/products/delete-many`, {
                data: { ids: Array.from(selectedIds) },
                withCredentials: true
            });
            if (res.status === 200) {
                alert("Products deleted successfully.");
                setSelectedIds(new Set());
                fetchProducts();
            }
        } catch (err) {
            console.error(err);
            alert("Delete failed.");
        } finally {
            setLoading(false);
        }
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === products.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(products.map(p => p._id)));
        }
    };

    const toggleSelect = (id) => {
        const next = new Set(selectedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedIds(next);
    };

    const getSubCats = (mainId) => {
        if (!mainId) {
            return mainCats.flatMap(c => c.subCategories || []);
        }
        const targetId = typeof mainId === 'object' ? mainId?._id : mainId;
        if (!targetId) {
            return mainCats.flatMap(c => c.subCategories || []);
        }
        const cat = mainCats.find(c => c._id === targetId);
        return cat?.subCategories || [];
    };

    const applyBatchMinQty = () => {
        if (!batchMinQty) return;
        const qty = Number(batchMinQty);
        if (isNaN(qty)) return;

        setProducts(prev => prev.map(p => {
            setModifiedIds(m => new Set(m).add(p._id));
            return { ...p, minQty: qty };
        }));
        setBatchMinQty('');
        alert(`Applied MOQ ${qty} to all ${products.length} filtered products.`);
    };

    const syncGlobalMOQ = async () => {
        if (!batchMinQty) return;
        const qty = Number(batchMinQty);
        if (isNaN(qty)) return;

        if (!window.confirm(`Are you sure you want to update the MOQ to ${qty} for ALL ${total} products matching your active filters? This will bypass pagination and update the catalog immediately.`)) return;

        setSaving(true);
        try {
            const res = await axios.post(`${BASE_URL}/api/products/bulk-update-moq`, {
                ...filters,
                minQty: qty
            }, { withCredentials: true });

            if (res.data.success) {
                alert(`SUCCESS! Updated MOQ for ${res.data.modifiedCount} products matching your criteria.`);
                setFilters(prev => ({ ...prev, page: 1 })); // Refresh list
            }
        } catch (err) {
            console.error(err);
            alert("Global update failed.");
        } finally {
            setSaving(false);
        }
    };

    let displayedProducts = showZeroPriceOnly 
        ? products.filter(p => !p.price || Number(p.price) === 0 || modifiedIds.has(p._id))
        : [...products];

    if (sortAsc) {
        displayedProducts.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    }

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            {/* Filter Section */}
            <div className="bg-white p-6 rounded-sm border border-black/5 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-black/5 pb-4">
                    <div className="space-y-1">
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-deep-black">Live Inventory Control</h3>
                        <p className="text-[10px] text-warm-gray font-medium">Found <span className="text-primary-gold font-bold">{total}</span> items matching your metadata filter</p>
                    </div>
                    {modifiedIds.size > 0 && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-gold/10 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-gold animate-pulse"></span>
                            <span className="text-[9px] font-bold text-primary-gold uppercase tracking-widest">{modifiedIds.size} Pending Changes</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col lg:flex-row gap-6 items-end">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 w-full">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 ml-1">Filter by Brand</label>
                            <select
                                className="w-full h-11 px-4 bg-off-white border border-black/5 rounded-sm text-xs focus:outline-none focus:border-primary-gold/30 transition-all font-body"
                                value={filters.mainCategory}
                                onChange={(e) => setFilters(prev => ({ ...prev, mainCategory: e.target.value, subCategory: '', page: 1 }))}
                            >
                                <option value="">All Brands</option>
                                {mainCats.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 ml-1">Collection Segment</label>
                            <select
                                className="w-full h-11 px-4 bg-off-white border border-black/5 rounded-sm text-xs focus:outline-none focus:border-primary-gold/30 transition-all font-body"
                                value={filters.subCategory}
                                onChange={(e) => setFilters(prev => ({ ...prev, subCategory: e.target.value, page: 1 }))}
                            >
                                <option value="">All Segments</option>
                                {getSubCats(filters.mainCategory).map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 ml-1">Search Model</label>
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    placeholder="Enter model number..."
                                    className="w-full h-11 pl-4 pr-10 bg-off-white border border-black/5 rounded-sm text-xs focus:outline-none focus:border-primary-gold/30 transition-all font-body placeholder:italic"
                                    value={filters.search}
                                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                />
                                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-primary-gold">
                                    <i className="bi bi-search"></i>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="flex gap-4 flex-wrap justify-end">
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => setSortAsc(!sortAsc)}
                                className={`h-11 px-6 rounded-sm text-[10px] font-bold tracking-widest uppercase transition-all shadow-lg border ${
                                    sortAsc 
                                        ? 'bg-primary-gold text-white border-primary-gold' 
                                        : 'bg-white text-charcoal border-black/5 hover:border-primary-gold'
                                }`}
                            >
                                {sortAsc ? "Clear Sort" : "Sort Lowest Price"}
                            </button>
                            <button
                                onClick={() => setShowZeroPriceOnly(!showZeroPriceOnly)}
                                className={`h-11 px-6 rounded-sm text-[10px] font-bold tracking-widest uppercase transition-all shadow-lg border ${
                                    showZeroPriceOnly 
                                        ? 'bg-primary-gold text-white border-primary-gold' 
                                        : 'bg-white text-charcoal border-black/5 hover:border-primary-gold'
                                }`}
                            >
                                {showZeroPriceOnly ? "Show All Products" : "Filter 0 Price"}
                            </button>
                            {selectedIds.size > 0 && (
                                <button
                                    onClick={handleDeleteSelected}
                                    className="h-11 px-8 rounded-sm text-[10px] font-bold tracking-widest uppercase bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5 border border-red-500/20"
                                >
                                    Delete {selectedIds.size} Selected
                                </button>
                            )}
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving || modifiedIds.size === 0}
                            className={`h-11 px-10 rounded-sm text-[10px] font-bold tracking-widest uppercase transition-all duration-500 shadow-xl ${modifiedIds.size > 0
                                    ? 'bg-deep-black text-white hover:bg-primary-gold shadow-primary-gold/10'
                                    : 'bg-charcoal/5 text-charcoal/20 cursor-not-allowed'
                                }`}
                        >
                            {saving ? "Updating..." : `Save ${modifiedIds.size} Changes`}
                        </button>
                    </div>
                </div>

                {/* Batch Actions Row */}
                {products.length > 0 && (
                    <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between bg-off-white/30 -mx-6 px-6 py-4">
                        <div className="flex items-center gap-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-primary-gold block">Batch Update MOQ</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="number" 
                                        placeholder="Set global min qty (e.g. 12)"
                                        className="h-10 px-4 bg-white border border-black/5 rounded-sm text-xs focus:ring-1 focus:ring-primary-gold/20 w-48 font-body"
                                        value={batchMinQty}
                                        onChange={(e) => setBatchMinQty(e.target.value)}
                                    />
                                    <button 
                                        onClick={applyBatchMinQty}
                                        className="h-10 px-6 bg-off-white text-charcoal text-[9px] font-bold uppercase tracking-widest rounded-sm hover:bg-black/5 transition-all border border-black/5"
                                    >
                                        Set Locally
                                    </button>
                                    <button 
                                        onClick={syncGlobalMOQ}
                                        disabled={saving}
                                        className="h-10 px-6 bg-deep-black text-white text-[9px] font-bold uppercase tracking-widest rounded-sm hover:bg-primary-gold transition-all shadow-lg"
                                    >
                                        {saving ? "Syncing..." : `Sync to ALL ${total} Products`}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="text-[10px] text-warm-gray italic">"Sync to ALL" will update the entire matching collection in the database immediately.</p>
                    </div>
                )}
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-sm border border-black/5 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-off-white border-b border-black/5">
                                <th className="p-4 w-12 text-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300 text-primary-gold focus:ring-primary-gold/20 cursor-pointer"
                                        checked={displayedProducts.length > 0 && displayedProducts.every(p => selectedIds.has(p._id))}
                                        onChange={() => {
                                            if (displayedProducts.length > 0 && displayedProducts.every(p => selectedIds.has(p._id))) {
                                                // Unselect all currently displayed
                                                const next = new Set(selectedIds);
                                                displayedProducts.forEach(p => next.delete(p._id));
                                                setSelectedIds(next);
                                            } else {
                                                // Select all currently displayed
                                                const next = new Set(selectedIds);
                                                displayedProducts.forEach(p => next.add(p._id));
                                                setSelectedIds(next);
                                            }
                                        }}
                                    />
                                </th>
                                <th className="p-4 text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/60">Asset Preview</th>
                                <th className="p-4 text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/60">Model Number</th>
                                <th className="p-4 text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/60">Primary Dept</th>
                                <th className="p-4 text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/60">Collection Seg</th>
                                <th className="p-4 text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/60">Wholesale Price</th>
                                <th className="p-4 text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/60">MOQ (Volume)</th>
                                <th className="p-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/60">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/[0.03]">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="6" className="p-8 text-center text-[10px] text-charcoal/20 uppercase tracking-widest italic">Syncing Assets...</td>
                                    </tr>
                                ))
                            ) : displayedProducts.length > 0 ? (
                                displayedProducts.map(product => (
                                    <tr key={product._id} className={`hover:bg-off-white/40 transition-colors ${modifiedIds.has(product._id) ? 'bg-primary-gold/5' : ''} ${selectedIds.has(product._id) ? 'bg-black/[0.02]' : ''}`}>
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-gray-300 text-primary-gold focus:ring-primary-gold/20 cursor-pointer"
                                                checked={selectedIds.has(product._id)}
                                                onChange={() => toggleSelect(product._id)}
                                            />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-4 group">
                                                <div className="relative w-32 h-32 rounded-sm overflow-hidden bg-off-white border border-black/5 shadow-sm">
                                                    <img src={product.imageUrl?.[0]} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button
                                                            onClick={() => setPreviewImage(product.imageUrl?.[0])}
                                                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                                                        >
                                                            <i className="bi bi-arrows-fullscreen text-primary-gold text-sm"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <input
                                                type="text"
                                                placeholder=""
                                                className="bg-transparent border-none p-0 text-sm font-semibold text-deep-black focus:ring-0 w-full placeholder:text-charcoal/20 placeholder:font-normal placeholder:italic"
                                                value={product.productName}
                                                onChange={(e) => updateProductLocal(product._id, 'productName', e.target.value)}
                                            />
                                        </td>
                                        <td className="p-4">
                                            <select
                                                className="bg-transparent border-none p-0 text-xs font-medium text-charcoal focus:ring-0 w-full"
                                                value={typeof product.mainCategory === 'object' ? product.mainCategory?._id : product.mainCategory}
                                                onChange={(e) => updateProductLocal(product._id, 'mainCategory', e.target.value)}
                                            >
                                                {mainCats.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                                            </select>
                                        </td>
                                        <td className="p-4">
                                            <select
                                                className="bg-transparent border-none p-0 text-xs font-medium text-charcoal focus:ring-0 w-full"
                                                value={typeof product.subCategory === 'object' ? product.subCategory?._id : product.subCategory}
                                                onChange={(e) => updateProductLocal(product._id, 'subCategory', e.target.value)}
                                            >
                                                <option value="">Select Segment</option>
                                                {getSubCats(product.mainCategory).map(sub => (
                                                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-charcoal/40 font-bold">¥</span>
                                                <input
                                                    type="number"
                                                    className="bg-transparent border-none p-0 text-sm font-semibold text-deep-black focus:ring-0 w-24"
                                                    value={product.price}
                                                    onChange={(e) => updateProductLocal(product._id, 'price', e.target.value)}
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <input
                                                type="number"
                                                className="bg-transparent border-none p-0 text-sm font-semibold text-deep-black focus:ring-0 w-24 text-center"
                                                value={product.minQty || 12}
                                                onChange={(e) => updateProductLocal(product._id, 'minQty', e.target.value)}
                                            />
                                        </td>
                                        <td className="p-4 text-center">
                                            {modifiedIds.has(product._id) ? (
                                                <span className="inline-block px-3 py-1 bg-primary-gold text-white text-[8px] font-bold uppercase tracking-widest rounded-full">Modified</span>
                                            ) : (
                                                <span className="inline-block px-3 py-1 bg-black/5 text-charcoal/40 text-[8px] font-bold uppercase tracking-widest rounded-full">Synced</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-20 text-center">
                                        <p className="text-[11px] font-bold text-charcoal/20 uppercase tracking-[0.3em]">No products found matching your criteria</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Loading/End State Footer */}
            <div className="py-8 flex justify-center">
                {loading ? (
                    <div className="flex items-center gap-3 px-6 py-2 bg-white rounded-full border border-black/5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-gold animate-pulse"></span>
                        <p className="text-[10px] font-bold text-charcoal/40 uppercase tracking-[0.2em] italic">Syncing more assets...</p>
                    </div>
                ) : filters.page >= pages && products.length > 0 ? (
                    <p className="text-[10px] font-bold text-charcoal/20 uppercase tracking-[0.3em]">All products synced</p>
                ) : null}
            </div>

            {/* Image Preview Modal */}
            {previewImage && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-8 lg:p-20 bg-deep-black/95 backdrop-blur-sm animate-fade-in" onClick={() => setPreviewImage(null)}>
                    <div className="relative max-w-5xl max-h-full bg-white p-2 rounded-sm shadow-2xl animate-scale-up" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform text-red-500"
                        >
                            <i className="bi bi-x text-2xl"></i>
                        </button>
                        <img src={previewImage} alt="Full view" className="max-w-full max-h-[80vh] object-contain rounded-sm" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BulkEditProducts;
