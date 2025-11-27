import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");

    const loginAdmin = () => {
        setIsAdmin(true);
        localStorage.setItem("isAdmin", "true");
    };

    const logoutAdmin = () => {
        setIsAdmin(false);
        localStorage.removeItem("isAdmin");
    };

    return (
        <AdminContext.Provider value={{ isAdmin, loginAdmin, logoutAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};
