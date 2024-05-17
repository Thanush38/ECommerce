import React, {useState, useEffect} from 'react';
import './Login.css';
import Button from '../reusable/Button/Button';
import PopUp from './PopUp/PopUp';
import {auth} from "../../firebase";
import {onAuthStateChanged, signOut} from "firebase/auth";
import LoggedShow from "./LoggedShow/LoggedShow";


const Login = () => {
    const [dropdown, setDropdown] = useState(false);
    const [user, setUser] = useState<any>(null);

    const [loggedInUser, setLoggedInUser] = useState(false);

    useEffect(()=>{
        onAuthStateChanged(auth, (user:any) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUser(user)
                console.log("displayName", user.displayName)
                console.log("email", user.email)
                setLoggedInUser(true)
            } else {
                // User is signed out
                // ...
                console.log("user is logged out")
                setLoggedInUser(false)
            }
        });

    }, [])

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }

    const handleLogin = () => {

        console.log("Login")
    }

    const handleMouseEnter = () => {
        setDropdown(true);
    }
    const handleMouseLeave = () => {
        setDropdown(false);
    }
    const getCurrentDisplay = () => {
        if (!loggedInUser) {
            return <div className="navbarLogin">
                <Button text="Login" onClick={handleLogin}/>
                {dropdown && <div className="navbarDrop">

                    <PopUp />

                </div>}
            </div>
        }

            return <div className="navbarLogout">
                <LoggedShow email={user.email} logOut={handleLogout}/>
            </div>


    }
    return (
        <div>
            <div className="navBarLoginSection" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {getCurrentDisplay()}



            </div>
        </div>
    );
};

export default Login;
