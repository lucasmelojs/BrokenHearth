import React, { useState } from "react";
import { useAuth } from "../components/AuthProvider";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleLogin = async (email, password) => {
        try {
            await login(email, password);
        } catch (error) {
            setError(error.message);
        }
        navigate("/profile")
    };

    return (
        <div>
            <h2>Login</h2>
            <AuthForm onSubmit={handleLogin} buttonText="Login" error={error} />
        </div>
    );
};

export default LoginPage;
