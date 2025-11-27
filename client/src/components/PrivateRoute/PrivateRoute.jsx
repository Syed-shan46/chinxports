import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";

export default function PrivateRoute({ children }) {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/api/admin/check`, { withCredentials: true })
            .then((res) => setIsAuth(res.data.success))
            .catch(() => setIsAuth(false));
    }, []);

    if (isAuth === null) return <p>Loading...</p>; // while checking session
    return isAuth ? children : <Navigate to="/admin-login" />;
}
