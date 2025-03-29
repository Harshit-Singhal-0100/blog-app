import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEvn } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: getEvn('VITE_FIREBASE_API'),
    authDomain: "blog-app-3e137.firebaseapp.com",
    projectId: "blog-app-3e137",
    storageBucket: "blog-app-3e137.firebasestorage.app",
    messagingSenderId: "792613530719",
    appId: "1:792613530719:web:a1867636b1148968517fea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }
