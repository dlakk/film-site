import React, { useEffect, useState } from 'react';
import { getAuth,onAuthStateChanged, updateProfile } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import './UserProfile.css'
import Navbar from '../../components/Navbar/Navbar';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);

    const auth = getAuth();

    useEffect(() => {
        const fetchUserProfile = async (user) => {
            try {
                const userDoc = await getDoc(doc(db, "user", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setName(userData.name);
                    setEmail(userData.email);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Error fetching user data");
            }
            setLoading(false);
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                fetchUserProfile(user);
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const handleUpdateProfile = async () => {
        if (user) {
            try {
                await updateProfile(user, { displayName: name });
                await updateDoc(doc(db, "user", user.uid), {
                    name: name,
                    email: email,
                });
                toast.success("Profile updated successfully");
            } catch (error) {
                console.error("Error updating profile:", error);
                toast.error("Error updating profile");
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Navbar/>
        <div>
            <h1>User Profile</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }}>
                <div>
                    <label>Name: </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
        </>
    );
};

export default UserProfile;
