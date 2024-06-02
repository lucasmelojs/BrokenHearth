import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseConfig";
import { ref as dbRef, get } from "firebase/database";

const useFetchProfile = (userId) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const profileRef = dbRef(db, `users/${userId}`);

        const fetchProfile = async () => {
            try {
                const snapshot = await get(profileRef);
                const data = snapshot.val();
                if (data) {
                    // Fetch avatar URL from Firebase Storage if the path exists
                    const avatarURL = data.avatarPath ? await getDownloadURL(ref(storage, data.avatarPath)) : null;
                    setProfile({ ...data, avatarURL });
                } else {
                    setProfile(null);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    return { profile, loading };
};

export default useFetchProfile;
