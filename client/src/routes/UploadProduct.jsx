import React, { useState, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { BASE_URL } from "../config";
import BulkUploadForm from "../components/upload/BulkUploadForm";
import BulkEditProducts from "../components/upload/BulkEditProducts";

export default function ProductUpload() {
    const [mode, setMode] = useState("single"); // "single", "bulk", or "edit"
    const [croppingImage, setCroppingImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropModal, setShowCropModal] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const dragCounter = useRef(0);
    const fileInputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [mainCategories, setMainCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [images, setImages] = useState([]);

    const [form, setForm] = useState({
        productName: "",
        description: "",
        price: "",
        minQty: 12,
        tags: "",
        mainCategory: "",
        subCategory: "",
        imageUrl: [],
        ceramics: false,
        special: false,
        handpicked: false
    });

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    async function getCroppedImg(imageSrc, cropPixels) {
        const image = await new Promise((resolve) => {
            const img = new Image();
            img.src = imageSrc;
            img.onload = () => resolve(img);
        });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = cropPixels.width;
        canvas.height = cropPixels.height;

        ctx.drawImage(
            image,
            cropPixels.x,
            cropPixels.y,
            cropPixels.width,
            cropPixels.height,
            0,
            0,
            cropPixels.width,
            cropPixels.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, "image/jpeg");
        });
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/api/categories/get-maincategories`)
            .then(res => {
                if (res.data.success) {
                    const categories = (res.data.categories || []).filter(cat => {
                        const name = cat.name.toLowerCase();
                        return !name.includes("stainless steel") && !name.includes("xuping");
                    });
                    setMainCategories(categories);
                    const defaultMain = categories.find(cat => cat.name === "18k pvd gold coated and 316 L") || categories[0];
                    if (defaultMain && !form.mainCategory) {
                        setForm(prev => ({ ...prev, mainCategory: defaultMain._id }));
                    }
                }
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (form.mainCategory) {
            axios.get(`${BASE_URL}/api/categories/get-subcategories/${form.mainCategory}`)
                .then(res => {
                    if (res.data.success) {
                        const subs = res.data.subcategories || [];
                        setSubCategories(subs);
                        const defaultSub = subs.find(s => s.name.toLowerCase() === 'bracelets') || subs[0];
                        if (defaultSub) {
                            setForm(prev => ({ ...prev, subCategory: defaultSub._id }));
                        }
                    }
                })
                .catch(err => console.error(err));
        }
    }, [form.mainCategory]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const processFile = (file) => {
        if (!file) return;
        const imageURL = URL.createObjectURL(file);
        setCroppingImage({ file, imageURL });
        setShowCropModal(true);
    };

    const compressImageHelper = async (file) => {
        const options = { maxSizeMB: 0.8, maxWidthOrHeight: 1440, useWebWorker: true, initialQuality: 0.7 };
        try { return await imageCompression(file, options); }
        catch (error) { return file; }
    };

    const handleFiles = async (files) => {
        if (!files || files.length === 0) return;
        if (files.length === 1) {
            processFile(files[0]);
        } else {
            const newFiles = Array.from(files);
            try {
                const compressedFiles = await Promise.all(newFiles.map(file => compressImageHelper(file)));
                setImages(prev => [...prev, ...compressedFiles]);
                setSelectedImages(prev => [...prev, ...compressedFiles]);
            } catch (err) {
                setImages(prev => [...prev, ...newFiles]);
                setSelectedImages(prev => [...prev, ...newFiles]);
            }
        }
    };

    const handleImageChange = (e) => handleFiles(e.target.files);

    useEffect(() => {
        const handleWindowDragEnter = (e) => {
            e.preventDefault(); e.stopPropagation();
            dragCounter.current += 1;
            if (e.dataTransfer.items?.length > 0) setIsDragging(true);
        };
        const handleWindowDragLeave = (e) => {
            e.preventDefault(); e.stopPropagation();
            dragCounter.current -= 1;
            if (dragCounter.current === 0) setIsDragging(false);
        };
        const handleWindowDrop = (e) => {
            e.preventDefault(); e.stopPropagation();
            setIsDragging(false); dragCounter.current = 0;
            handleFiles(e.dataTransfer.files);
        };
        window.addEventListener('dragenter', handleWindowDragEnter);
        window.addEventListener('dragleave', handleWindowDragLeave);
        window.addEventListener('dragover', e => e.preventDefault());
        window.addEventListener('drop', handleWindowDrop);
        return () => {
            window.removeEventListener('dragenter', handleWindowDragEnter);
            window.removeEventListener('dragleave', handleWindowDragLeave);
            window.removeEventListener('dragover', e => e.preventDefault());
            window.removeEventListener('drop', handleWindowDrop);
        };
    });

    const handleCropSave = async () => {
        const croppedBlob = await getCroppedImg(croppingImage.imageURL, croppedAreaPixels);
        const croppedFile = new File([croppedBlob], croppingImage.file.name, { type: "image/jpeg" });
        const compressed = await compressImageHelper(croppedFile);
        setImages(prev => [...prev, compressed]);
        setSelectedImages(prev => [...prev, compressed]);
        setShowCropModal(false); setCroppingImage(null);
    };

    const handleNoCrop = async () => {
        const compressed = await compressImageHelper(croppingImage.file);
        setImages(prev => [...prev, compressed]);
        setSelectedImages(prev => [...prev, compressed]);
        setShowCropModal(false); setCroppingImage(null);
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (images.length === 0) {
                alert("Please add at least one product image.");
                setLoading(false); return;
            }
            const formData = new FormData();
            Object.keys(form).forEach(key => key !== "imageUrl" && formData.append(key, form[key]));
            images.forEach(img => formData.append("imageUrl", img));

            await axios.post(`${BASE_URL}/api/products/upload-product`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            alert("Product published successfully!");
            setForm(prev => ({
                ...prev,
                productName: "", description: "", price: "", tags: "",
                ceramics: false, special: false, handpicked: false
            }));
            setImages([]); setSelectedImages([]);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            alert(error.response?.data?.error || "Publishing failed.");
        } finally { setLoading(false); }
    };

    return (
        <main className="min-h-screen bg-off-white/30 pt-28 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black/5 pb-10">
                    <div className="space-y-2 text-center md:text-left">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-primary-gold uppercase">Inventory Management</span>
                        <h1 className="font-display text-4xl lg:text-5xl text-deep-black leading-tight">
                            Publish <span className="italic font-normal">Catalog</span>
                        </h1>
                    </div>

                    {/* Mode Switcher */}
                    <div className="flex bg-white p-1 rounded-sm border border-black/5 shadow-sm self-center md:self-end">
                        <button 
                            onClick={() => setMode("single")}
                            className={`px-6 py-3 text-[10px] font-bold tracking-widest uppercase transition-all duration-500 rounded-sm ${
                                mode === "single" ? 'bg-deep-black text-white shadow-lg' : 'text-charcoal/40 hover:text-charcoal'
                            }`}
                        >
                            Single Unit
                        </button>
                        <button 
                            onClick={() => setMode("bulk")}
                            className={`px-6 py-3 text-[10px] font-bold tracking-widest uppercase transition-all duration-500 rounded-sm ${
                                mode === "bulk" ? 'bg-deep-black text-white shadow-lg' : 'text-charcoal/40 hover:text-charcoal'
                            }`}
                        >
                            Bulk Collection
                        </button>
                        <button 
                            onClick={() => setMode("edit")}
                            className={`px-6 py-3 text-[10px] font-bold tracking-widest uppercase transition-all duration-500 rounded-sm ${
                                mode === "edit" ? 'bg-deep-black text-white shadow-lg' : 'text-charcoal/40 hover:text-charcoal'
                            }`}
                        >
                            Bulk Edit
                        </button>
                    </div>
                </header>

                {mode === "single" ? (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
                        
                        {/* Left Column: Media & Primary Info */}
                        <div className="lg:col-span-8 space-y-8">
                            
                            {/* Image Upload Section */}
                            <section className="bg-white p-8 rounded-sm border border-black/[0.03] shadow-sm">
                                <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal/40 mb-6 font-display">Product Imagery</h3>
                                
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`relative aspect-video rounded-sm border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center cursor-pointer group ${
                                        isDragging ? 'border-primary-gold bg-primary-gold/5' : 'border-black/5 bg-off-white hover:border-primary-gold/40'
                                    }`}
                                >
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                                            <i className="bi bi-cloud-upload text-2xl text-primary-gold"></i>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold text-deep-black">Drag & Drop visual assets</p>
                                            <p className="text-xs text-warm-gray italic">or click to browse local files</p>
                                        </div>
                                    </div>
                                    <input ref={fileInputRef} type="file" multiple className="hidden" accept="image/*" onChange={handleImageChange} />
                                </div>

                                {/* Previews */}
                                {selectedImages.length > 0 && (
                                    <div className="mt-8 grid grid-cols-3 md:grid-cols-4 gap-4">
                                        {selectedImages.map((img, idx) => (
                                            <div key={idx} className="relative aspect-square group rounded-sm overflow-hidden border border-black/5">
                                                <img src={URL.createObjectURL(img)} className="w-full h-full object-cover" alt="" />
                                                <button 
                                                    type="button"
                                                    onClick={() => removeImage(idx)}
                                                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg"
                                                >
                                                    <i className="bi bi-x text-lg"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* Core Details Section */}
                            <section className="bg-white p-8 rounded-sm border border-black/[0.03] shadow-sm space-y-6">
                                <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal/40 mb-2 font-display">Product Information</h3>
                                
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-widest uppercase text-charcoal/60 ml-1">Product Model</label>
                                    <input 
                                        type="text" name="productName" value={form.productName} onChange={handleChange}
                                        placeholder="e.g. Model# 12345"
                                        className="w-full bg-off-white border-none focus:ring-2 focus:ring-primary-gold/20 rounded-sm py-4 px-6 font-body text-sm placeholder:italic"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-widest uppercase text-charcoal/60 ml-1">Wholesale Price (RMB)</label>
                                    <input 
                                        type="number" step="0.01" name="price" value={form.price} onChange={handleChange}
                                        className="w-full bg-off-white border-none focus:ring-2 focus:ring-primary-gold/20 rounded-sm py-4 px-6 font-body text-sm"
                                    />
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Classification & Options */}
                        <div className="lg:col-span-4 space-y-8">
                            
                            <section className="bg-white p-8 rounded-sm border border-black/[0.03] shadow-sm space-y-6">
                                <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal/40 mb-2 font-display">Classification</h3>
                                
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-widest uppercase text-charcoal/60 ml-1">Primary Department</label>
                                    <select 
                                        name="mainCategory" value={form.mainCategory} onChange={handleChange}
                                        className="w-full bg-off-white border-none focus:ring-2 focus:ring-primary-gold/20 rounded-sm py-4 px-6 font-body text-sm"
                                    >
                                        {mainCategories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-widest uppercase text-charcoal/60 ml-1">Collection Segment</label>
                                    <select 
                                        name="subCategory" value={form.subCategory} onChange={handleChange}
                                        className="w-full bg-off-white border-none focus:ring-2 focus:ring-primary-gold/20 rounded-sm py-4 px-6 font-body text-sm"
                                    >
                                        {subCategories.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                                    </select>
                                </div>
                            </section>

                            {/* Submit Button */}
                            <button 
                                type="submit" disabled={loading}
                                className={`w-full py-6 px-10 rounded-sm text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-500 shadow-2xl ${
                                    loading ? 'bg-charcoal/20 text-charcoal/40 cursor-wait' : 'bg-deep-black text-white hover:bg-primary-gold hover:-translate-y-1 shadow-black/10'
                                }`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        <span>Syncing Assets...</span>
                                    </div>
                                ) : (
                                    "Publish Masterpiece"
                                )}
                            </button>
                        </div>
                    </form>
                ) : mode === "bulk" ? (
                    <BulkUploadForm />
                ) : (
                    <BulkEditProducts />
                )}
            </div>

            {/* Draggable Full Screen Overlay */}
            {isDragging && (
                <div className="fixed inset-0 z-[100] bg-deep-black/60 backdrop-blur-md flex items-center justify-center pointer-events-none animate-fade-in">
                    <div className="text-center p-12 bg-white rounded-sm border-2 border-primary-gold shadow-2xl scale-110">
                        <i className="bi bi-cloud-arrow-up text-6xl text-primary-gold mb-6 inline-block animate-bounce"></i>
                        <h2 className="text-2xl font-display text-deep-black uppercase tracking-widest">Drop Visual Assets Here</h2>
                    </div>
                </div>
            )}

            {/* Cropping Modal Overlay */}
            {showCropModal && (
                <div className="fixed inset-0 z-[200] bg-deep-black/90 backdrop-blur-sm flex items-center justify-center p-4 lg:p-12 animate-fade-in">
                    <div className="w-full max-w-2xl bg-white rounded-sm overflow-hidden flex flex-col shadow-2xl">
                        <header className="p-6 border-b border-black/5 flex items-center justify-between">
                            <h4 className="text-xs font-bold tracking-widest uppercase text-charcoal">Precision Crop</h4>
                            <span className="text-[10px] text-warm-gray italic">Standardized 1:1 Aspect Ratio</span>
                        </header>
                        
                        <div className="relative w-full aspect-square bg-off-white">
                            <Cropper
                                image={croppingImage.imageURL}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>

                        <footer className="p-6 bg-off-white flex flex-wrap gap-4 items-center justify-between">
                            <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                                <i className="bi bi-zoom-in text-warm-gray"></i>
                                <input 
                                    type="range" value={zoom} min={1} max={3} step={0.1} 
                                    onChange={(e) => setZoom(e.target.value)}
                                    className="w-full accent-primary-gold"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button type="button" onClick={() => setShowCropModal(false)} className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-warm-gray">Cancel</button>
                                <button type="button" onClick={handleNoCrop} className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-charcoal border border-black/10 hover:bg-black/5">Skip Crop</button>
                                <button type="button" onClick={handleCropSave} className="bg-deep-black text-white px-8 py-3 rounded-sm text-[10px] font-bold uppercase tracking-widest shadow-xl hover:bg-primary-gold transition-colors">Apply & Save</button>
                            </div>
                        </footer>
                    </div>
                </div>
            )}
        </main>
    );
}