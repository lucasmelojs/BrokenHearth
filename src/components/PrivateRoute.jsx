import React from "react";
import { Navigate } from "react-router-dom";
import useRequireAuth from "../hooks/useRequireAuth";

const PrivateRoute = ({ children }) => {
    const user = useRequireAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;