import React, { createContext, useContext } from "react";
import useAuthentication from "../hooks/useAuthentication";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useAuthentication();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);