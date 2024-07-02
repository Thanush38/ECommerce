import React from 'react';
import {useState} from 'react';
import './popUp.css';
import {auth, database} from "../../../../firebase";
import {  signInWithEmailAndPassword ,createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getAuth, updateProfile  } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
const PopUp = () => {
    const [name, setName] = useState("");//[name, setName] = useState(""
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onLogin = async (e:any) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                alert("Invalid credentials")


            });


    }

    const SignUp = async (e: any) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                updateProfile(user, {
                    displayName: name
                })
                let customId = user.uid;
            })
            .catch((error) => {
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                if(errorCode === "auth/email-already-in-use"){
                    alert("Email already in use")
                } else if(errorCode === "auth/weak-password"){
                    alert("Password should be at least 6 characters")
                } else if(errorCode === "auth/invalid-email"){
                    alert("Invalid email")
                } else {
                    alert(errorMessage)
                }

            });


    }
    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token: any = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("user", user)
                // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
    return (
        <div className="popUpContainer">
            <div className="popUpWrapper">
                <div className="popWrapper">
                    <div className="card-switch">
                        <label className="popUpSwitch">
                            <input className="toggle" type="checkbox"/>
                            <span className="slider"></span>
                            <span className="card-side"></span>
                            <div className="flip-card__inner">
                                <div className="flip-card__front">
                                    <div className="title">Log in</div>
                                    <form action="" className="flip-card__form">
                                        <input type="email" placeholder="Email" name="email"
                                               className="flip-card__input" onChange={(e) => setEmail(e.target.value)}/>
                                        <input type="password" placeholder="Password" name="password"
                                               className="flip-card__input"
                                               onChange={(e) => setPassword(e.target.value)}/>
                                        <button className="flip-card__btn" onClick={onLogin} type='submit'>Log In
                                        </button>
                                    </form>
                                    <div className="google-login-button" onClick={handleGoogleLogin}>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1"
                                             x="0px" y="0px" className="google-icon" viewBox="0 0 48 48" height="1em"
                                             width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                        </svg>
                                        <span>Log in with Google</span>
                                    </div>
                                </div>
                                <div className="flip-card__back">
                                    <div className="title">Sign up</div>
                                    <form action="" className="flip-card__form">
                                        <input type="name" placeholder="Name" className="flip-card__input"
                                               onChange={(e) => setName(e.target.value)}/>
                                        <input type="email" placeholder="Email" name="email"
                                               className="flip-card__input" onChange={(e) => setEmail(e.target.value)}/>
                                        <input type="password" placeholder="Password" name="password"
                                               className="flip-card__input"
                                               onChange={(e) => setPassword(e.target.value)}/>
                                        <button className="flip-card__btn" onClick={SignUp}>Sign Up</button>
                                    </form>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
