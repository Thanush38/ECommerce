import React, {useState} from 'react';
import './Login.css';
import Button from '../reusable/Button/Button';
import PopUp from './PopUp/PopUp';

const Login = () => {
    const [dropdown, setDropdown] = useState(false);
    const handleLogin = () => {

        console.log("Login")
    }

    const handleMouseEnter = () => {
        setDropdown(true);
    }
    const handleMouseLeave = () => {
        setDropdown(false);
    }
    return (
        <div>
            <div className="navBarLoginSection" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Button text="Login" onClick={handleLogin}/>
                {/*{dropdown && <div className="navbarDrop">*/}

                {/*        <PopUp />*/}

                {/*</div>}*/}
                <div className="navbarDrop">

                    <PopUp/>

                </div>


            </div>
        </div>
    );
};

export default Login;
