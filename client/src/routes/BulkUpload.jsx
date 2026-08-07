import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';

const BulkUpload = () => {
    const [items, setItems] = useState([]); // { id, file, preview, name, price }
    const [mainCats, setMainCats] = useState([]);
    const [subCats, setSubCats] = useState([]);
    const [selectedMainCat, setSelectedMainCat] = useState('');
    const [selectedSubCat, setSelectedSubCat] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
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
                if (defaultMain) setSelectedMainCat(defaultMain._id);
            })
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    useEffect(() => {
        if (!selectedMainCat) {
            setSubCats([]);
            return;
        }
        const cat = mainCats.find(c => c._id === selectedMainCat);
        setSubCats(cat?.subCategories || []);
    }, [selectedMainCat, mainCats]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const newItems = selectedFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file: file,
            preview: URL.createObjectURL(file),
            name: "",
            price: ""
        }));
        setItems(prev => [...prev, ...newItems]);
    };

    const updateItem = (id, field, value) => {
        setItems(prev => prev.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const removeItem = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const handleUpload = async () => {
        if (!items.length || !selectedMainCat || !selectedSubCat) {
            alert("Please select images and both categories.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        
        const productDetails = items.map(item => ({
            name: item.name || "New Arrival",
            price: item.price || 0
        }));

        items.forEach(item => formData.append('images', item.file));
        formData.append('productDetails', JSON.stringify(productDetails));
        formData.append('mainCategory', selectedMainCat);
        formData.append('subCategory', selectedSubCat);

        try {
            const res = await axios.post(`${BASE_URL}/api/products/bulk-upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResults(res.data.products || []);
            alert(`Success! Uploaded ${res.data.products.length} products to ${mainCats.find(c => c._id === selectedMainCat)?.name}.`);
            // Clean up
            setItems([]);
        } catch (err) {
            console.error(err);
            alert('Upload failed. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-off-white pt-24 pb-20 px-4">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-primary-gold uppercase">Efficiency First</span>
                    <h1 className="font-display text-4xl lg:text-5xl text-deep-black">
                        Mass <span className="italic font-normal">Cataloging</span>
                    </h1>
                    <p className="text-charcoal/40 text-sm max-w-xl mx-auto italic">
                        Select multiple images and define their models and prices in one go.
                    </p>
                </div>

                <div className="flex flex-col gap-10">
                    {/* Controls Bar */}
                    <div className="bg-white p-6 rounded-sm border border-black/5 shadow-sm flex flex-col md:flex-row items-end gap-6 justify-between">
                        <div className="flex flex-col md:flex-row gap-6 flex-1 w-full">
                            <div className="space-y-2 flex-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Primary Department</label>
                                <select
                                    className="w-full h-11 px-4 bg-off-white border border-black/5 rounded-sm text-sm focus:outline-none focus:border-primary-gold/30 transition-all font-body"
                                    value={selectedMainCat}
                                    onChange={(e) => setSelectedMainCat(e.target.value)}
                                >
                                    <option value="">Select Brand/Main Category</option>
                                    {mainCats.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                                </select>
                            </div>

                            <div className={`space-y-2 flex-1 transition-all duration-500 ${!selectedMainCat ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Collection Segment</label>
                                <select
                                    className="w-full h-11 px-4 bg-off-white border border-black/5 rounded-sm text-sm focus:outline-none focus:border-primary-gold/30 transition-all font-body"
                                    value={selectedSubCat}
                                    onChange={(e) => setSelectedSubCat(e.target.value)}
                                >
                                    <option value="">Select Sub Category</option>
                                    {subCats.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2 flex-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Add More Images</label>
                                <label className="cursor-pointer block">
                                    <div className="flex items-center justify-center h-11 border border-dashed border-primary-gold/30 rounded-sm hover:bg-primary-gold/5 transition-all bg-off-white/50 px-4 gap-2">
                                        <i className="bi bi-plus-lg text-primary-gold"></i>
                                        <span className="text-[10px] font-bold text-primary-gold uppercase">Add Visual Assets</span>
                                        <input ref={fileInputRef} type="file" className="hidden" multiple accept="image/*" onChange={handleFileChange} />
                                    </div>
                                </label>
                            </div>
                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={loading || !items.length || !selectedSubCat}
                            className={`min-w-[200px] h-11 text-[10px] font-bold tracking-widest uppercase transition-all duration-700 rounded-sm shadow-xl shadow-primary-gold/10 ${loading || !items.length || !selectedSubCat
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
                                                    placeholder="e.g. CX-2024"
                                                    className="w-full bg-off-white border-none rounded-sm py-2 px-3 text-xs focus:ring-1 focus:ring-primary-gold/20 font-body"
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
        </div>
    );
};

export default BulkUpload;