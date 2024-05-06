// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCn28v-4skRr5DGsxY3A-PA_nbFIifpZso",
    authDomain: "ecommerce-1c576.firebaseapp.com",
    projectId: "ecommerce-1c576",
    storageBucket: "ecommerce-1c576.appspot.com",
    messagingSenderId: "627199414978",
    appId: "1:627199414978:web:bbfadd4ade5d0b278c615b",
    measurementId: "G-YNBXQBBHNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;