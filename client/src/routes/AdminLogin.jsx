import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { AdminContext } from "../context/AdminContext";

export default function AdminLogin() {
    const { loginAdmin } = useContext(AdminContext);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${BASE_URL}/api/admin`,
                { password },
                { withCredentials: true }
            );

            if (res.data.success) {
                loginAdmin();          // <<< IMPORTANT
                navigate("/upload-product");
            }
        } catch (err) {
            setError("Incorrect password");
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
