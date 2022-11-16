// import firebase functions
import { initializeApp } from "firebase/app";

// establish firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCXEdspKIStcSOoS9mgn_XeEYDqBSJv6dw",
    authDomain: "nutrition-navigator.firebaseapp.com",
    projectId: "nutrition-navigator",
    storageBucket: "nutrition-navigator.appspot.com",
    messagingSenderId: "81255821280",
    appId: "1:81255821280:web:efbe079558c884d52d4585"
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// export firebase
export default app;