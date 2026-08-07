import React from "react";

export default function PrivateRoute({ children }) {
    // TEMPORARILY DISABLED FOR TESTING
    return children;

    /*
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/api/admin/check`, { withCredentials: true })
            .then((res) => setIsAuth(res.data.success))
            .catch(() => setIsAuth(false));
    }, []);

    if (isAuth === null) return <p>Loading...</p>; // while checking session
    return isAuth ? children : <Navigate to="/admin-login" />;
    */
}
