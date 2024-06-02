//UserProfile Component
import React from "react";
// import { useParams } from "react-router-dom";
import useFetchProfile from "../hooks/useFetchProfile";
import useAuthentication from "../hooks/useAuth";

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
            <h1>{user.userId}</h1>
            <h1>{profile.name}</h1>
            <p>{profile.lastName}</p>
            {profile.avatar && <img src={profile.avatar} alt="Profile Avatar" />}
        </div>
    );
};

export default UserProfile;
