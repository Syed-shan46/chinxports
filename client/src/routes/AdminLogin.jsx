import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${BASE_URL}/api/admin`,
                { password },
                { withCredentials: true } // Important!
            );
            console.log("Login response:", res.data);

            if (res.data.success) {
                navigate("/upload-product"); // redirect after login
            }
        } catch (err) {
            console.log("Error response:", err.response?.data);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", marginTop: "80px" }}>
            <h3>Admin Login</h3>
            <form onSubmit={handleSubmit}>
                <label>Enter Admin Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="btn btn-primary mt-3" type="submit">
                    Login
                </button>
                {error && <p className="text-danger mt-2">{error}</p>}
            </form>
        </div>
    );
}
