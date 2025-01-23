import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD_aNfchlSc0OE5E0E-lgSM-abtsH9Z4GU",
  authDomain: "snapreal.firebaseapp.com",
  projectId: "snapreal",
  storageBucket: "snapreal.appspot.com",
  messagingSenderId: "796353647940",
  appId: "1:796353647940:web:d8d4ef2eb46afe7edbb311",
  measurementId: "G-VP2JZQ2XZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app); // initialize the authentication
const db = getFirestore(app); // initialize the database

const signup = async (name, email, password) => {
    try {
        // Create user
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;

        // Optionally, update user profile with display name
        await user.updateProfile({
            displayName: name,
        });

        // Store user details in database
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authprovider: "local",
            email,
        });

    } catch (error) {
        console.error("Error signing up:", error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log("Error logging in:", error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const logout = () => {
    signOut(auth);
};

export { auth, db, login, signup, logout };
