import React, { useState, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";
import axios from "axios";
import { BASE_URL } from "../config";

export default function ProductUpload() {

    const [croppingImage, setCroppingImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropModal, setShowCropModal] = useState(false);

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




    const [loading, setLoading] = useState(false);

    const [mainCategories, setMainCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [selectedImages, setSelectedImages] = useState([]);
    const [images, setImages] = useState([]);

    const fileInputRef = useRef(null);

    const [form, setForm] = useState({
        productName: "",
        description: "",
        price: "",
        minQty: 6,
        tags: "",
        mainCategory: "",
        subCategory: "",
        imageUrl: [],
        trending: false,
        special: false
    });

    /* ============================
       FETCH MAIN CATEGORIES
    ============================ */
    useEffect(() => {
        axios.get(`${BASE_URL}/api/categories/get-maincategories`)
            .then(res => {
                if (res.data.success) {
                    setMainCategories(res.data.categories || []);
                }
            })
            .catch(err => console.error(err));
    }, []);

    /* ============================
       FETCH SUB CATEGORIES
    ============================ */
    useEffect(() => {
        if (form.mainCategory) {
            axios.get(`${BASE_URL}/api/categories/get-subcategories/${form.mainCategory}`)
                .then(res => {
                    if (res.data.success) {
                        setSubCategories(res.data.subcategories || []);
                    }
                })
                .catch(err => console.error(err));
        }
    }, [form.mainCategory]);

    /* ============================
       HANDLE INPUT CHANGES
    ============================ */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    /* ============================
       IMAGE CHOOSE
    ============================ */
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // only crop one at a time
        if (!file) return;

        const imageURL = URL.createObjectURL(file);

        setCroppingImage({ file, imageURL });
        setShowCropModal(true);
    };

    const handleCropSave = async () => {
        const croppedBlob = await getCroppedImg(
            croppingImage.imageURL,
            croppedAreaPixels
        );

        const croppedFile = new File([croppedBlob], croppingImage.file.name, {
            type: "image/jpeg",
        });

        // push to images array
        setImages(prev => [...prev, croppedFile]);
        setSelectedImages(prev => [...prev, croppedFile]);

        // close modal
        setShowCropModal(false);
        setCroppingImage(null);
    };



    /* ============================
       HANDLE SUBMIT
    ============================ */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (images.length === 0) {
                alert("Please select at least one image.");
                setLoading(false);
                return;
            }

            const formData = new FormData();

            // Append fields
            Object.keys(form).forEach(key => {
                if (key !== "imageUrl") {
                    formData.append(key, form[key]);
                }
            });

            // Append images
            images.forEach(img => {
                formData.append("imageUrl", img);
            });

            const res = await axios.post(
                `${BASE_URL}/api/products/upload-product`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );



            /* ----------------------------
               RESET EVERYTHING PROPERLY
            ----------------------------- */
            setForm({
                productName: "",
                description: "",
                price: "",
                minQty: 6,
                tags: "",
                mainCategory: "",
                subCategory: "",
                imageUrl: [],
                trending: false,
                special: false
            });

            setImages([]);
            setSelectedImages([]);

            // Clear file input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        } catch (error) {
            console.error("UPLOAD ERROR:", error);
            alert(error.response?.data?.error || "Upload failed - Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "700px", margin: "auto", padding: "20px", marginTop: "60px" }}>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>

                {/* Image Upload */}
                <label className="mt-3">Upload Images</label>
                <input
                    type="file"
                    className="form-control"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    required
                />

                {/* Preview */}
                {selectedImages.length > 0 && (
                    <div className="image-preview mt-3">
                        {selectedImages.map((img, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(img)}
                                alt={`Preview ${index}`}
                                style={{
                                    width: "100%",
                                    maxHeight: "400px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    marginTop: "10px",
                                    border: "1px solid #ccc"
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Description */}
                {/* <label className="mt-3">Description</label>
                <textarea
                    name="description"
                    className="form-control"
                    value={form.description}
                    onChange={handleChange}
                /> */}

                {/* Price */}
                <label className="mt-3">Price (RMB)</label>
                <input
                    type="number"
                    name="price"
                    step="0.01"
                    className="form-control"
                    value={form.price}
                    onChange={handleChange}
                />

                {/* Min Qty */}
                <label className="mt-3">Minimum Quantity</label>
                <input
                    type="number"
                    name="minQty"
                    className="form-control"
                    min="1"
                    value={form.minQty}
                    onChange={handleChange}
                    required
                />

                {/* Tags */}
                {/* <label className="mt-3">Tags</label>
                <input
                    type="text"
                    name="tags"
                    className="form-control"
                    value={form.tags}
                    onChange={handleChange}
                /> */}

                {/* Main Category */}
                <label className="mt-3">Main Category</label>
                <select
                    name="mainCategory"
                    className="form-control"
                    value={form.mainCategory}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Main Category</option>
                    {mainCategories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>

                {/* Sub Category */}
                <label className="mt-3">Sub Category</label>
                <select
                    name="subCategory"
                    className="form-control"
                    value={form.subCategory}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Sub Category</option>
                    {subCategories.map(sub => (
                        <option key={sub._id} value={sub._id}>{sub.name}</option>
                    ))}
                </select>

                {/* Trending */}
                {/* <div className="form-check mt-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="trending"
                        checked={form.trending}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Trending</label>
                </div> */}

                {/* Special */}
                {/* <div className="form-check mt-2">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="special"
                        checked={form.special}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Special Product</label>
                </div> */}

                {/* Submit */}
                <button
                    className="btn btn-primary mt-4 d-flex align-items-center justify-content-center"
                    type="submit"
                    disabled={loading}
                    style={{ minWidth: "140px" }}
                >
                    {loading ? (
                        <div className="spinner-border spinner-border-sm text-light"></div>
                    ) : (
                        "Upload Product"
                    )}
                </button>

            </form>

            {showCropModal && (
                <div className="crop-modal">
                    <div className="crop-content">
                        <div style={{ position: "relative", width: "100%", height: 400 }}>
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

                        <div className="crop-buttons">
                            <button className="btn btn-secondary" onClick={() => setShowCropModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleCropSave}>Save Crop</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}