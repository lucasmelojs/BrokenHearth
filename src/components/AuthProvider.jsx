import React, { createContext, useContext } from "react";
import useAuthentication from "../hooks/useAuthentication";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useAuthentication();

    return (
        <AuthContext.Provider value={auth}>
            {auth.loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);