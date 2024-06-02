import { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const useAuthentication = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(mapFirebaseError(err.code));
        }
    };

    const logout = async () => {
        try {
            setError(null);
            await signOut(auth);
        } catch (err) {
            setError(err.message);
        }
    };

    return { user, login, logout, loading, error };
};

const mapFirebaseError = (errorCode) => {
    switch (errorCode) {
        case 'auth/user-not-found':
            return 'No user found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        case 'auth/invalid-email':
            return 'Invalid email address.';
        case 'auth/user-disabled':
            return 'User account is disabled.';
        default:
            return `An unexpected error occurred: ${errorCode}`;
    }
};

export default useAuthentication;
