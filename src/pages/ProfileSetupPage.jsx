import React, { useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { ref as dbRef, set as dbSet } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const ProfileSetupPage = () => {
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAvatarChange = (e) => {
        if (e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!user) {
            setError("User is not logged in");
            return;
        }
        if (!name || !lastName) {
            setError("Please provide all the information");
            return;
        }

        try {
            let avatarURL = null;

            if (avatar) {
                const avatarRef = storageRef(storage, `avatars/${user.uid}`);
                await uploadBytes(avatarRef, avatar);
                avatarURL = await getDownloadURL(avatarRef);
            }

            const userProfile = {
                name,
                lastName,
                avatar: avatarURL,
            };

            await dbSet(dbRef(db, `users/${user.uid}`), userProfile);
            console.log("Profile successfully written!");
            navigate("/profile");
        } catch (error) {
            console.error("Error writing profile: ", error);
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Complete Your Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Profile Picture:</label>
                    <input
                        type="file"
                        onChange={handleAvatarChange}
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Let's Go</button>
            </form>
        </div>
    );
};

export default ProfileSetupPage;