import React from 'react';
import {useState} from 'react';
import './popUp.css';
import {auth} from "../../../firebase";
import {  signInWithEmailAndPassword ,createUserWithEmailAndPassword  } from 'firebase/auth';
const PopUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let name = "";

    const onLogin = (e:any) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });

    }

    const SignUp = async (e: any) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
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
                                        <input type="email" placeholder="Email" name="email" className="flip-card__input" onChange={(e) => setEmail(e.target.value)}/>
                                        <input type="password" placeholder="Password" name="password"
                                               className="flip-card__input" onChange={(e) => setPassword(e.target.value)}/>
                                        <button className="flip-card__btn" onClick={onLogin} type='submit'>Log In</button>
                                    </form>
                                </div>
                                <div className="flip-card__back">
                                    <div className="title">Sign up</div>
                                    <form action="" className="flip-card__form">
                                        <input type="name" placeholder="Name" className="flip-card__input" onChange={(e) => name = e.target.value}/>
                                        <input type="email" placeholder="Email" name="email" className="flip-card__input" onChange={(e) => setEmail(e.target.value)}/>
                                        <input type="password" placeholder="Password" name="password"
                                               className="flip-card__input" onChange={(e) => setPassword(e.target.value)}/>
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
