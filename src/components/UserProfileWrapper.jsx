import React from "react";
import { useAuth } from "./AuthProvider";
import UserProfile from "./UserProfile";

const UserProfileWrapper = () => {
    const { user, logout } = useAuth();

    return (
        <>
            <button onClick={logout}>Logout</button>
            <UserProfile userId={user.uid} />
        </>
    );
};

export default UserProfileWrapper;