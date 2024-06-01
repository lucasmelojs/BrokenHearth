import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const useFetchProfile = (userId) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProfile(docSnap.data());
            } else {
                console.log("No such document!");
            }
            setLoading(false);
        };

        if (userId) {
            fetchProfile();
        }
    }, [userId]);

    return { profile, loading };
};

export default useFetchProfile;