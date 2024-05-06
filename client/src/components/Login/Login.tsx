import React from 'react';
import './Login.css';
import Button from '../reusable/Button/Button.tsx';
const Login = () => {
    const handleLogin = () => {
        console.log("Login")
    }
    return (
        <div>
            <Button text="Login" onClick={handleLogin} />
        </div>
    );
};

export default Login;
