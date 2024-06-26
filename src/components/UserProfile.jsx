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

    // Debugging output
    console.log("Profile data:", profile);

    return (
        <div>
            <h1>{profile.name}</h1>
            {profile.avatarURL ? (
                <img src={profile.avatarURL} alt="Profile Avatar" onError={(e) => { e.target.onerror = null; e.target.src = "default-avatar-url"; }} />
            ) : (
                <div>No avatar available</div>
            )}
        </div>
    );
};

export default UserProfile;
