import React from "react";
import { useAuth } from "../components/AuthProvider";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        try {
            await login(email, password);
            navigate("/profile");
        } catch (err) {
            console.error("Login error:", err);
        }
    };


    return (
        <div>
            <h2>Login</h2>
            <AuthForm onSubmit={handleLogin} buttonText="Login" error={error} />
        </div>
    );
};

export default LoginPage;
