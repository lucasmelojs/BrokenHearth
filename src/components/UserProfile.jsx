import React from "react";
import useFetchProfile from "../hooks/useFetchProfile";

const UserProfile = ({ userId }) => {
    const { profile, loading } = useFetchProfile(userId);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>No profile data found</div>;
    }

    return (
        <div>
            <h1>{profile.name}</h1>
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone}</p>
        </div>
    );
};

export default UserProfile;