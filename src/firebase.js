// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXEdspKIStcSOoS9mgn_XeEYDqBSJv6dw",
    authDomain: "nutrition-navigator.firebaseapp.com",
    projectId: "nutrition-navigator",
    storageBucket: "nutrition-navigator.appspot.com",
    messagingSenderId: "81255821280",
    appId: "1:81255821280:web:efbe079558c884d52d4585"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;