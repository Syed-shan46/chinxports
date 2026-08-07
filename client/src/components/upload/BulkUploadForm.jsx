import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';

const BulkUploadForm = () => {
    const [items, setItems] = useState([]); // { id, file, preview, name, price, mainCategory, subCategory }
    const [mainCats, setMainCats] = useState([]);
    const [selectedMainCat, setSelectedMainCat] = useState('');
    const [selectedSubCat, setSelectedSubCat] = useState('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = React.useRef(null);

    useEffect(() => {
        // Fetch categories for selection
        axios.get(`${BASE_URL}/api/categories/get-maincategories?admin=true`)
            .then(res => {
                const filtered = (res.data.categories || []).filter(cat => {
                    const name = cat.name.toLowerCase();
                    return !name.includes("stainless steel") && !name.includes("xuping");
                });
                setMainCats(filtered);
                // Default to 18k PVD gold if found
                const defaultMain = filtered.find(cat => cat.name === "18k pvd gold coated and 316 L") || filtered[0];
                if (defaultMain) {
                    setSelectedMainCat(defaultMain._id);
                    const defaultSub = defaultMain.subCategories?.[0]?._id || "";
                    setSelectedSubCat(defaultSub);
                }
            })
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const newItems = selectedFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file: file,
            preview: URL.createObjectURL(file),
            name: "",
            price: "",
            mainCategory: selectedMainCat,
            subCategory: selectedSubCat
        }));
        setItems(prev => [...prev, ...newItems]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const updateItem = (id, field, value) => {
        setItems(prev => prev.map(item => {
            if (item.id === id) {
                const updated = { ...item, [field]: value };
                // If mainCategory changed, reset subCategory to the first available for that cat
                if (field === 'mainCategory') {
                    const cat = mainCats.find(c => c._id === value);
                    updated.subCategory = cat?.subCategories?.[0]?._id || "";
                }
                return updated;
            }
            return item;
        }));
    };

    const applyGlobalToAll = () => {
        if (!selectedMainCat) return;
        setItems(prev => prev.map(item => ({
            ...item,
            mainCategory: selectedMainCat,
            subCategory: selectedSubCat
        })));
    };

    const removeItem = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const handleUpload = async () => {
        if (!items.length) {
            alert("Please select images.");
            return;
        }

        // Validate that all items have categories
        const invalid = items.find(item => !item.mainCategory || !item.subCategory);
        if (invalid) {
            alert("Each product must have a Primary Department and Collection Segment selected.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        
        const productDetails = items.map(item => ({
            name: item.name || "",
            price: item.price || 0,
            mainCategory: item.mainCategory,
            subCategory: item.subCategory
        }));

        items.forEach(item => formData.append('images', item.file));
        formData.append('productDetails', JSON.stringify(productDetails));
        
        // We still send global ones for backward compatibility or as defaults
        formData.append('mainCategory', selectedMainCat || items[0].mainCategory);
        formData.append('subCategory', selectedSubCat || items[0].subCategory);

        try {
            const res = await axios.post(`${BASE_URL}/api/products/bulk-upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(`Success! Uploaded ${res.data.products.length} products with custom classification.`);
            setItems([]);
        } catch (err) {
            console.error(err);
            alert('Upload failed. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const getSubCatsForMain = (mainId) => {
        const cat = mainCats.find(c => c._id === mainId);
        return cat?.subCategories || [];
    };

    return (
        <div className="space-y-10 animate-fade-in">
            <div className="flex flex-col gap-10">
                {/* Controls Bar (Global Defaults) */}
                <div className="bg-white p-6 rounded-sm border border-black/5 shadow-sm flex flex-col md:flex-row items-end gap-6 justify-between">
                    <div className="flex flex-col md:flex-row gap-6 flex-1 w-full">
                        <div className="space-y-2 flex-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Default Department</label>
                            <select
                                className="w-full h-11 px-4 bg-off-white border border-black/5 rounded-sm text-sm focus:outline-none focus:border-primary-gold/30 transition-all font-body"
                                value={selectedMainCat}
                                onChange={(e) => {
                                    setSelectedMainCat(e.target.value);
                                    const cat = mainCats.find(c => c._id === e.target.value);
                                    setSelectedSubCat(cat?.subCategories?.[0]?._id || "");
                                }}
                            >
                                <option value="">Select Brand/Main Category</option>
                                {mainCats.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                            </select>
                        </div>

                        <div className={`space-y-2 flex-1 transition-all duration-500 ${!selectedMainCat ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Default Segment</label>
                            <select
                                className="w-full h-11 px-4 bg-off-white border border-black/5 rounded-sm text-sm focus:outline-none focus:border-primary-gold/30 transition-all font-body"
                                value={selectedSubCat}
                                onChange={(e) => setSelectedSubCat(e.target.value)}
                            >
                                <option value="">Select Sub Category</option>
                                {getSubCatsForMain(selectedMainCat).map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                            </select>
                        </div>

                        <div className="flex gap-2 items-end">
                            <button 
                                onClick={applyGlobalToAll}
                                title="Apply these defaults to all items below"
                                className="h-11 px-4 bg-off-white border border-black/5 rounded-sm hover:bg-black/5 transition-all flex items-center gap-2"
                            >
                                <i className="bi bi-check2-all text-primary-gold"></i>
                                <span className="text-[9px] font-bold uppercase tracking-widest">Apply to All</span>
                            </button>

                            <label className="cursor-pointer block flex-1 min-w-[150px]">
                                <div className="flex items-center justify-center h-11 border border-dashed border-primary-gold/30 rounded-sm hover:bg-primary-gold/5 transition-all bg-off-white/50 px-4 gap-2">
                                    <i className="bi bi-plus-lg text-primary-gold"></i>
                                    <span className="text-[10px] font-bold text-primary-gold uppercase" style={{ whiteSpace: 'nowrap' }}>Add Images</span>
                                    <input ref={fileInputRef} type="file" className="hidden" multiple accept="image/*" onChange={handleFileChange} />
                                </div>
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={handleUpload}
                        disabled={loading || !items.length}
                        className={`min-w-[200px] h-11 text-[10px] font-bold tracking-widest uppercase transition-all duration-700 rounded-sm shadow-xl shadow-primary-gold/10 ${loading || !items.length
                                ? 'bg-charcoal/5 text-charcoal/20 cursor-not-allowed'
                                : 'bg-deep-black text-white hover:bg-primary-gold'
                            }`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Syncing...</span>
                            </div>
                        ) : (
                            `Publish ${items.length} Products`
                        )}
                    </button>
                </div>

                {/* Preview Gallery Grid */}
                <div className="space-y-6">
                    {items.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {items.map((item) => (
                                <div key={item.id} className="bg-white border border-black/5 rounded-sm overflow-hidden flex flex-col group shadow-sm hover:shadow-xl transition-all duration-500">
                                    <div className="aspect-square relative overflow-hidden bg-off-white">
                                        <img src={item.preview} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <button 
                                            onClick={() => removeItem(item.id)}
                                            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                        >
                                            <i className="bi bi-trash text-sm"></i>
                                        </button>
                                    </div>
                                    <div className="p-5 space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-bold uppercase tracking-widest text-charcoal/40 ml-1">Model Number</label>
                                            <input 
                                                type="text" 
                                                placeholder="New Arrival"
                                                className="w-full bg-off-white border-none rounded-sm py-2 px-3 text-xs focus:ring-1 focus:ring-primary-gold/20 font-body placeholder:text-charcoal/20 placeholder:italic"
                                                value={item.name}
                                                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-bold uppercase tracking-widest text-charcoal/40 ml-1">Price (RMB)</label>
                                            <input 
                                                type="number" 
                                                placeholder="0.00"
                                                className="w-full bg-off-white border-none rounded-sm py-2 px-3 text-xs focus:ring-1 focus:ring-primary-gold/20 font-body"
                                                value={item.price}
                                                onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                                            />
                                        </div>

                                        {/* Classification Selectors Per Item */}
                                        <div className="pt-2 space-y-3 border-t border-black/5">
                                            <div className="space-y-1">
                                                <label className="text-[8px] font-bold uppercase tracking-widest text-charcoal/40 ml-1">Primary Dept</label>
                                                <select
                                                    className="w-full bg-off-white border-none rounded-sm py-2 px-3 text-[10px] focus:ring-1 focus:ring-primary-gold/20 font-body cursor-pointer"
                                                    value={item.mainCategory}
                                                    onChange={(e) => updateItem(item.id, 'mainCategory', e.target.value)}
                                                >
                                                    <option value="">Select Dept</option>
                                                    {mainCats.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[8px] font-bold uppercase tracking-widest text-charcoal/40 ml-1">Collection Seg</label>
                                                <select
                                                    className="w-full bg-off-white border-none rounded-sm py-2 px-3 text-[10px] focus:ring-1 focus:ring-primary-gold/20 font-body cursor-pointer"
                                                    value={item.subCategory}
                                                    onChange={(e) => updateItem(item.id, 'subCategory', e.target.value)}
                                                >
                                                    <option value="">Select Seg</option>
                                                    {getSubCatsForMain(item.mainCategory).map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-black/5 rounded-sm bg-white/50 space-y-4 cursor-pointer hover:border-primary-gold/30 hover:bg-white transition-all group"
                        >
                            <div className="w-20 h-20 bg-off-white rounded-full flex items-center justify-center border border-black/5 group-hover:scale-110 transition-transform">
                                <i className="bi bi-cloud-arrow-up text-3xl text-primary-gold"></i>
                            </div>
                            <div className="text-center">
                                <p className="text-[11px] font-bold text-deep-black uppercase tracking-[0.2em] mb-1">Queue is empty</p>
                                <p className="text-[10px] text-charcoal/40 italic">Click to select product images for bulk cataloging</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BulkUploadForm;
