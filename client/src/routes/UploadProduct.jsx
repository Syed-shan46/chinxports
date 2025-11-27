import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";


export default function ProductUpload() {
    const [loading, setLoading] = useState(false);

    const [mainCategories, setMainCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [form, setForm] = useState({
        productName: "",
        description: "",
        price: "",
        minQty: 1,
        tags: "",
        mainCategory: "",
        subCategory: "",
        imageUrl: [],
        trending: false,
        special: false
    });

    const [images, setImages] = useState([]);

    // ⬇️ Fetch Main Categories
    useEffect(() => {
        axios.get(`${BASE_URL}/api/categories/get-maincategories`)
            .then(res => {
                if (res.data.success) {
                    setMainCategories(res.data.categories || []);
                }
            })
            .catch(err => console.error(err));
    }, []);


    // ⬇️ Fetch Sub Categories based on selected main category
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


    // ⬇️ Handle Input Change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    // ⬇️ Handle Image Selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    // ⬇️ Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();

            Object.keys(form).forEach(key => {
                if (key !== "imageUrl") {
                    formData.append(key, form[key]);
                }
            });

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

            alert("Product Created Successfully");
            console.log(res.data);

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.error || "Upload failed");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>

                {/* Product Name */}
                <label>Product Name</label>
                <input
                    type="text"
                    name="productName"
                    className="form-control"
                    onChange={handleChange}
                    required
                />

                {/* Description */}
                <label className="mt-3">Description</label>
                <textarea
                    name="description"
                    className="form-control"
                    onChange={handleChange}
                />

                {/* Price */}
                <label className="mt-3">Price</label>
                <input
                    type="number"
                    name="price"
                    className="form-control"
                    onChange={handleChange}
                    required
                />

                {/* Min Qty */}
                <label className="mt-3">Minimum Quantity</label>
                <input
                    type="number"
                    name="minQty"
                    className="form-control"
                    min="1"
                    onChange={handleChange}
                    required
                />

                {/* Tags */}
                <label className="mt-3">Tags (comma separated)</label>
                <input
                    type="text"
                    name="tags"
                    className="form-control"
                    placeholder="example: test, sample, offer"
                    onChange={handleChange}
                />

                {/* Main Category */}
                <label className="mt-3">Main Category</label>
                <select
                    name="mainCategory"
                    className="form-control"
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
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Sub Category</option>
                    {subCategories.map(sub => (
                        <option key={sub._id} value={sub._id}>{sub.name}</option>
                    ))}
                </select>

                {/* Images */}
                <label className="mt-3">Upload Images</label>
                <input
                    type="file"
                    className="form-control"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />

                {/* Trending */}
                <div className="form-check mt-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="trending"
                        checked={form.trending}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">
                        Trending
                    </label>
                </div>

                {/* Special */}
                <div className="form-check mt-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="special"
                        checked={form.special}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">
                        Special Product
                    </label>
                </div>


                {/* Submit */}
                <button
                    className="btn btn-primary mt-4 d-flex align-items-center justify-content-center"
                    type="submit"
                    disabled={loading}
                    style={{ minWidth: "140px" }}
                >
                    {loading ? (
                        <div className="spinner-border spinner-border-sm text-light" role="status"></div>
                    ) : (
                        "Upload Product"
                    )}
                </button>

            </form>
        </div>
    );
}
