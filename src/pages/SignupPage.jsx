import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AuthForm from "../components/AuthForm";

const SignupPage = () => {
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignup = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/profile-setup");
        }
        catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <AuthForm onSubmit={handleSignup} buttonText="Sign Up" error={error} />
        </div>
    );
};

export default SignupPage;
