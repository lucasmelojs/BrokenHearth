import React, { useState } from "react";

const AuthForm = ({ onSubmit, buttonText, error }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validationError, setValidationError] = useState("");

    const validatePassword = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            return "Passwords do not match";
        }
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/[!@#$%^&*]/.test(password)) {
            return "Password must contain at least one special character";
        }
        return null;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationError = validatePassword(password, confirmPassword);
        if (validationError) {
            setValidationError(validationError);
            return;
        }
        onSubmit(email, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>E-mail:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            {validationError && <p>{validationError}</p>}
            {error && <p>{error}</p>}
            <button type="submit">{buttonText}</button>
        </form>
    );
};

export default AuthForm;
