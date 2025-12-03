import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export default function CreateSubCategory() {
    const [name, setName] = useState("");
    const [mainCategoryId, setMainCategoryId] = useState("");
    const [mainCategories, setMainCategories] = useState([]);

    const [imageUrl, setImageUrl] = useState("");
    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Load main categories
    useEffect(() => {
        axios
            .get(`${BASE_URL}/api/categories/get-maincategories`)
            .then((res) => {
                setMainCategories(res.data.categories || []);
            })
            .catch((err) => {
                console.log("Error:", err);
            });
    }, []);


    // Handle image upload to Cloudinary or your server
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));   // show preview
        setImageUrl(file);                      // store file, not URL
    };


    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("mainCategoryId", mainCategoryId);
            formData.append("imageUrl", imageUrl);   // FILE (same as product upload)

            const res = await axios.post(
                `${BASE_URL}/api/categories/sub-category`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            setMessage("Subcategory Created Successfully ✨");
            setName("");
            setMainCategoryId("");
            setPreview(null);
            setImageUrl("");

        } catch (err) {
            console.log(err);
            setMessage("Error creating subcategory");
        }

        setLoading(false);
    };


    return (
        <div className="container mt-4" style={{ maxWidth: "600px" }}>
            <h3 className="fw-bold mb-3">Create SubCategory</h3>

            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleCreate} className="border p-4 rounded shadow-sm">

                {/* Name */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">SubCategory Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Eg: Bracelets"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Select Main Category */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Main Category</label>
                    <select
                        className="form-select"
                        value={mainCategoryId}
                        onChange={(e) => setMainCategoryId(e.target.value)}
                        required
                    >
                        <option value="">Select Main Category</option>
                        {mainCategories.map(cat => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Upload Image */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageUpload}
                    />
                </div>

                {/* Image Preview */}
                {preview && (
                    <div className="mb-3">
                        <img
                            src={preview}
                            alt="Preview"
                            className="img-fluid rounded"
                            style={{ maxHeight: "180px", objectFit: "cover" }}
                        />
                    </div>
                )}

                {/* Submit */}
                <button className="btn btn-dark w-100" disabled={loading}>
                    {loading ? "Creating..." : "Create SubCategory"}
                </button>

            </form>
        </div>
    );
}
