import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useRequireAuth = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return user;
};

export default useRequireAuth;