import React, {useState, useEffect,useRef} from 'react';
import './Login.css';
import Button from '../../reusable/Button/Button.tsx';
import PopUp from './PopUp/PopUp.tsx';
import {auth} from "../../../firebase";
import {onAuthStateChanged, signOut} from "firebase/auth";
import LoggedShow from "./LoggedShow/LoggedShow.tsx";


const Login = () => {
    const [dropdown, setDropdown] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [displayName, setDisplayName] = useState<string>("");//[name, setName] = useState(""
    const navBarLoginSectionRef = useRef<HTMLDivElement>(null);


    const [loggedInUser, setLoggedInUser] = useState(false);

    useEffect(()=>{
        onAuthStateChanged(auth, (user:any) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUser(user)
                setLoggedInUser(true)
                setDisplayName(user.displayName)
            } else {
                // User is signed out
                // ...
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

    const handleClickOutside = (event: MouseEvent) => {
        if (navBarLoginSectionRef.current && !navBarLoginSectionRef.current.contains(event.target as Node)) {
            setDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMouseEnter = () => {
        setDropdown(true);
    }
    const handleMouseLeave = () => {
        setDropdown(false);
    }
    const getCurrentDisplay = () => {
        if (!loggedInUser) {
            return <div className="navbarLogin">
                <Button text="Login" onClick={() => console.log("he")}/>
                {dropdown && <div className="navbarDrop">

                    <PopUp />

                </div>}
            </div>
        }

            return <div className="navbarLogout">
                <LoggedShow email={user.email} logOut={handleLogout} image={user.photoURL} name={displayName}/>
            </div>


    }
    return (
        <div>
            <div className="navBarLoginSection" onMouseEnter={handleMouseEnter}  ref={navBarLoginSectionRef}>
                {getCurrentDisplay()}



            </div>
        </div>
    );
};

export default Login;
